// ============================================================
//  LUMINA SANCTI — PERFIS (estilo streaming), PROGRESSO SALVO
//  NA CONTA E RANKINGS
// ============================================================
// Tudo aqui usa o MESMO banco do app (Supabase), pelas funções que o
// próprio app usa: uma conta só vale no site e no celular.
// Uma conta pode ter até 6 perfis, de adultos e de crianças. Cada
// perfil tem nome, avatar (ou foto da galeria), Fé, Santidade e
// ofensiva — quem calcula e guarda esses números é o banco.
//
// Regras (definidas no banco do app):
//   - A Santidade vale para todos os perfis, inclusive os de criança.
//   - O tipo do perfil (adulto ou criança) não muda depois de criado.
//   - Ranking da Família: todos os perfis da conta.
//   - Ranking Global: só adultos, só com o primeiro nome e sem fotos.
//
// Este arquivo precisa ser carregado DEPOIS do script.js e do
// trilhas.js — ele usa funções e variáveis de lá.

const CHAVE_MEMBRO_ATIVO = 'lumina-sancti-membro-ativo';
const MAXIMO_DE_PERFIS = 6;       // limite do banco do app
const TAMANHO_MAXIMO_DO_NOME = 24; // limite do banco do app
const PASTA_DE_FOTOS = 'avatars';  // pasta de fotos do app (cada conta só vê a sua)

// Avatares desenhados: elegantes para adultos e coloridos para crianças.
const AVATARES = [
  { id: 'adulto-estrela', grupo: 'adulto', icone: 'estrela', fundo: 'linear-gradient(145deg, #243149, #0f172a)', cor: '#d4af37' },
  { id: 'adulto-pomba', grupo: 'adulto', icone: 'pomba', fundo: 'linear-gradient(145deg, #243149, #0f172a)', cor: '#e0f2fe' },
  { id: 'adulto-livro', grupo: 'adulto', icone: 'livro', fundo: 'linear-gradient(145deg, #3b2f14, #1a1408)', cor: '#f5d77a' },
  { id: 'adulto-terco', grupo: 'adulto', icone: 'terco', fundo: 'linear-gradient(145deg, #2d1f3d, #150d20)', cor: '#d4af37' },
  { id: 'adulto-medalha', grupo: 'adulto', icone: 'medalha', fundo: 'linear-gradient(145deg, #1f3a33, #0b1c18)', cor: '#d4af37' },
  { id: 'adulto-chama', grupo: 'adulto', icone: 'chama', fundo: 'linear-gradient(145deg, #3d1f1f, #1c0c0c)', cor: '#fbbf24' },
  { id: 'kids-estrela', grupo: 'kids', icone: 'estrela', fundo: 'linear-gradient(145deg, #facc15, #f59e0b)', cor: '#ffffff' },
  { id: 'kids-coracao', grupo: 'kids', icone: 'coracao', fundo: 'linear-gradient(145deg, #f472b6, #db2777)', cor: '#ffffff' },
  { id: 'kids-pomba', grupo: 'kids', icone: 'pomba', fundo: 'linear-gradient(145deg, #38bdf8, #0284c7)', cor: '#ffffff' },
  { id: 'kids-chama', grupo: 'kids', icone: 'chama', fundo: 'linear-gradient(145deg, #fb923c, #ea580c)', cor: '#ffffff' },
  { id: 'kids-livro', grupo: 'kids', icone: 'livro', fundo: 'linear-gradient(145deg, #4ade80, #16a34a)', cor: '#ffffff' },
  { id: 'kids-medalha', grupo: 'kids', icone: 'medalha', fundo: 'linear-gradient(145deg, #a78bfa, #7c3aed)', cor: '#ffffff' },
];

let membroAtivo = null;
let membrosDaConta = [];
let perfisEmModoEdicao = false;
let destinoAposEscolherPerfil = 'trilhas';
let slugPendenteDasTrilhas = null;
let abaDoRanking = 'familia';
let periodoDoRanking = 'week';
let editorEstado = null;

function obterMembroAtivo() {
  return membroAtivo;
}

function contaLogada() {
  return typeof supabaseCliente !== 'undefined' && !!supabaseCliente
    && typeof sessaoAtual !== 'undefined' && !!sessaoAtual;
}

// Nomes vêm do que a pessoa digitou: sempre "limpos" antes de ir para a tela.
function escaparTexto(texto) {
  return String(texto == null ? '' : texto).replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  }[c]));
}

function desenharAvatar(avatarId, fotoUrl, tamanho) {
  const classe = `avatar avatar-${tamanho || 'medio'}`;
  if (fotoUrl) return `<span class="${classe}"><img src="${escaparTexto(fotoUrl)}" alt=""></span>`;
  const avatar = AVATARES.find((a) => a.id === avatarId) || AVATARES[0];
  return `<span class="${classe}" style="background:${avatar.fundo};color:${avatar.cor}">${icone(avatar.icone)}</span>`;
}

function aplicarModoKids() {
  const eraCrianca = document.body.classList.contains('modo-kids');
  const ehCrianca = !!(membroAtivo && membroAtivo.tipo === 'crianca');
  document.body.classList.toggle('modo-kids', ehCrianca);
  // A Lumi (mascote.js) aparece só para crianças: ao trocar de perfil,
  // ela para de falar e some se o perfil novo for de adulto.
  if (eraCrianca !== ehCrianca || ehCrianca) avisarLumiDaTrocaDePerfil();
}

function avisarLumiDaTrocaDePerfil() {
  if (typeof mascoteReage === 'function') mascoteReage('perfil');
}

function limparPerfilAtivo() {
  membroAtivo = null;
  estadoEmMemoriaDaConta = null;
  try { localStorage.removeItem(CHAVE_MEMBRO_ATIVO); } catch (e) { /* sem problema */ }
  document.body.classList.remove('modo-kids');
  avisarLumiDaTrocaDePerfil();
}

// ============================================================
//  PERFIS DA CONTA
// ============================================================
// O banco do app usa nomes em inglês; aqui eles viram os nomes do site
function membroDoPerfil(perfil) {
  return {
    id: perfil.id,
    nome: perfil.name,
    tipo: perfil.kind === 'kid' ? 'crianca' : 'adulto',
    avatar: perfil.avatar_key,
    foto_path: perfil.avatar_path || null,
    fe: perfil.faith || 0,
    santidade: typeof perfil.santidade === 'number' ? perfil.santidade : SANTIDADE_MAXIMA,
    proximaSantidadeEm: perfil.next_regen_at || null,
    ofensiva: perfil.streak || 0,
    melhorOfensiva: perfil.best_streak || 0,
  };
}

async function carregarMembrosDaConta() {
  const { data, error } = await supabaseCliente.rpc('list_profiles');
  if (error) throw error;
  membrosDaConta = (data || []).map(membroDoPerfil);
  await anexarFotos(membrosDaConta);
  return membrosDaConta;
}

// As fotos ficam numa pasta privada: o banco gera um link temporário.
async function anexarFotos(lista) {
  const comFoto = lista.filter((m) => m.foto_path);
  if (comFoto.length === 0) return;
  try {
    const { data } = await supabaseCliente.storage
      .from(PASTA_DE_FOTOS)
      .createSignedUrls(comFoto.map((m) => m.foto_path), 60 * 60);
    (data || []).forEach((item) => {
      const membro = comFoto.find((m) => m.foto_path === item.path);
      if (membro && item.signedUrl) membro.fotoUrl = item.signedUrl;
    });
  } catch (e) {
    // sem foto, fica o avatar
  }
}

// ============================================================
//  "QUEM VAI APRENDER AGORA?"
// ============================================================
function abrirSelecaoDePerfis(destino) {
  if (!contaLogada()) {
    if (typeof irParaLogin === 'function') irParaLogin();
    return;
  }
  destinoAposEscolherPerfil = destino || 'trilhas';
  perfisEmModoEdicao = false;
  if (typeof closeSidebar === 'function') closeSidebar();
  mudarDeView('view-perfis');
  renderizarSelecaoDePerfis();
}

async function renderizarSelecaoDePerfis() {
  const grade = document.getElementById('perfis-grade');
  const gerenciar = document.getElementById('perfis-gerenciar');
  if (!grade) return;

  grade.innerHTML = '<p class="perfis-carregando">Carregando perfis...</p>';
  try {
    await carregarMembrosDaConta();
  } catch (e) {
    grade.innerHTML = '<p class="not-found-msg">Não foi possível carregar os perfis agora. Tente de novo em instantes.</p>';
    return;
  }

  const cartoes = membrosDaConta.map((m) => `
    <button class="perfil-cartao${perfisEmModoEdicao ? ' editando' : ''}" data-membro="${m.id}">
      <span class="perfil-avatar-wrap">
        ${desenharAvatar(m.avatar, m.fotoUrl, 'grande')}
        ${perfisEmModoEdicao ? `<span class="perfil-editar-selo">${icone('lapis')}</span>` : ''}
      </span>
      <span class="perfil-nome">${escaparTexto(m.nome)}</span>
      ${m.tipo === 'crianca' ? '<span class="perfil-tag">Kids</span>' : ''}
    </button>`).join('');

  const adicionar = membrosDaConta.length < MAXIMO_DE_PERFIS ? `
    <button class="perfil-cartao perfil-adicionar" id="perfil-adicionar">
      <span class="perfil-avatar-wrap"><span class="avatar avatar-grande avatar-adicionar">${icone('mais')}</span></span>
      <span class="perfil-nome">Adicionar perfil</span>
    </button>` : '';

  grade.innerHTML = cartoes + adicionar;

  grade.querySelectorAll('.perfil-cartao').forEach((cartao) => {
    if (!cartao.dataset.membro) return;
    cartao.addEventListener('click', () => {
      const membro = membrosDaConta.find((m) => m.id === cartao.dataset.membro);
      if (!membro) return;
      if (perfisEmModoEdicao) abrirEditorDePerfil(membro);
      else escolherPerfil(membro);
    });
  });
  const botaoAdicionar = document.getElementById('perfil-adicionar');
  if (botaoAdicionar) botaoAdicionar.addEventListener('click', () => abrirEditorDePerfil(null));

  if (gerenciar) {
    gerenciar.textContent = perfisEmModoEdicao ? 'Concluir' : 'Gerenciar perfis';
    gerenciar.style.display = membrosDaConta.length ? '' : 'none';
  }

  // Conta nova: já abre o editor para criar o primeiro perfil
  if (membrosDaConta.length === 0) abrirEditorDePerfil(null);
}

function escolherPerfil(membro) {
  membroAtivo = membro;
  estadoEmMemoriaDaConta = null; // carrega o progresso deste perfil
  try { localStorage.setItem(CHAVE_MEMBRO_ATIVO, membro.id); } catch (e) { /* sem problema */ }
  aplicarModoKids();
  if (destinoAposEscolherPerfil === 'inicio') mudarDeView('view-home');
  else if (destinoAposEscolherPerfil === 'ranking') abrirRanking();
  else abrirTrilhas(slugPendenteDasTrilhas);
}

// Chamado pelo script.js logo depois de entrar na conta
function aposEntrarNaConta() {
  membroAtivo = null;
  estadoEmMemoriaDaConta = null;
  abrirSelecaoDePerfis('inicio');
}

// ============================================================
//  TRILHAS COM A CONTA
// ============================================================
// Chamado pelo trilhas.js. Devolve true quando a conta assume
// (carregamento assíncrono) e false no modo visitante.
function prepararTrilhasDaConta(slug) {
  if (!contaLogada()) {
    estadoEmMemoriaDaConta = null; // visitante: progresso no aparelho
    return false;
  }
  slugPendenteDasTrilhas = slug || null;
  carregarTrilhasDaConta();
  return true;
}

// Monta o estado das trilhas com os números oficiais do banco
function estadoDoServidor(membro, progresso, trilhas) {
  const passo = MINUTOS_PARA_RENOVAR_SANTIDADE * 60 * 1000;
  const proxima = Date.parse(membro.proximaSantidadeEm);
  const licoes = {};
  (progresso || []).forEach((linha) => {
    if (linha.times_completed > 0) licoes[linha.lesson_id] = { estrelas: linha.stars || 0 };
  });
  const estado = {
    fe: membro.fe,
    santidade: membro.santidade,
    // o banco devolve quando chega a próxima; daqui a tela conta sozinha
    santidadeMarcadaEm: Number.isFinite(proxima) ? proxima - passo : Date.now(),
    ofensiva: membro.ofensiva,
    ultimoAcesso: dataLocalISO(),
    licoes,
    insignias: {},
    servidor: true,
  };
  (trilhas || []).forEach((trilha) => {
    if (trilhaConcluida(trilha, estado)) estado.insignias[trilha.slug] = true;
  });
  return estado;
}

async function carregarTrilhasDaConta() {
  // 1) Garante um perfil escolhido
  if (!membroAtivo) {
    let idSalvo = null;
    try { idSalvo = localStorage.getItem(CHAVE_MEMBRO_ATIVO); } catch (e) { /* sem problema */ }
    try { await carregarMembrosDaConta(); } catch (e) { membrosDaConta = []; }
    membroAtivo = membrosDaConta.find((m) => m.id === idSalvo) || null;
    if (!membroAtivo) {
      abrirSelecaoDePerfis('trilhas');
      return;
    }
  }

  // 2) Carrega as trilhas publicadas e o progresso desse perfil
  try {
    const trilhas = await carregarConteudoDoServidor();
    const [resPerfil, resProgresso] = await Promise.all([
      supabaseCliente.rpc('get_profile', { _pid: membroAtivo.id }),
      supabaseCliente.from('lesson_progress').select('lesson_id, stars, times_completed').eq('profile_id', membroAtivo.id),
    ]);
    if (resPerfil.error) throw resPerfil.error;
    if (resProgresso.error) throw resProgresso.error;
    Object.assign(membroAtivo, membroDoPerfil(resPerfil.data));
    estadoEmMemoriaDaConta = estadoDoServidor(membroAtivo, resProgresso.data, trilhas);
    aplicarModoKids();
  } catch (e) {
    limparPerfilAtivo();
    mostrarAvisoTrilhas('Não foi possível carregar este perfil. Escolha um perfil de novo.');
    abrirSelecaoDePerfis('trilhas');
    return;
  }

  const slug = slugPendenteDasTrilhas;
  slugPendenteDasTrilhas = null;
  exibirTrilhas(slug);
}

// Faixa no topo das trilhas: o perfil escolhido (ou o convite pra entrar)
function renderizarFaixaDaConta() {
  const faixa = document.getElementById('trilhas-conta');
  const nota = document.getElementById('trilhas-nota');
  if (!faixa) return;

  if (modoConta() && membroAtivo) {
    faixa.innerHTML = `
      <button class="trilhas-perfil" id="trilhas-perfil-atual" aria-label="${tt('faixa_ver_perfil')}">
        ${desenharAvatar(membroAtivo.avatar, membroAtivo.fotoUrl, 'pequeno')}
        <span>${escaparTexto(membroAtivo.nome)}</span>
      </button>
      <div class="trilhas-conta-acoes">
        <button class="trilhas-acao" id="trilhas-abrir-ranking">${icone('trofeu')}<span>${tt('faixa_ranking')}</span></button>
        <button class="trilhas-acao" id="trilhas-trocar-perfil">${icone('usuarios')}<span>${tt('faixa_trocar')}</span></button>
      </div>`;
    document.getElementById('trilhas-perfil-atual').addEventListener('click', () => abrirPainelDoPerfil(membroAtivo.id));
    document.getElementById('trilhas-abrir-ranking').addEventListener('click', () => abrirRanking());
    document.getElementById('trilhas-trocar-perfil').addEventListener('click', () => abrirSelecaoDePerfis('trilhas'));
    if (nota) nota.textContent = tt('nota_conta');
  } else if (typeof supabaseCliente !== 'undefined' && supabaseCliente) {
    faixa.innerHTML = `
      <div class="trilhas-convite">
        <p>${tt('convite_conta')}</p>
        <button class="filter-btn active" id="trilhas-entrar">${tt('entrar_ou_criar')}</button>
      </div>`;
    document.getElementById('trilhas-entrar').addEventListener('click', () => irParaLogin());
    if (nota) nota.textContent = tt('nota_sem_conta');
  } else {
    faixa.innerHTML = '';
    if (nota) nota.textContent = tt('nota_aparelho');
  }
}

// ============================================================
//  EDITOR DE PERFIL (criar / editar / excluir)
// ============================================================
async function abrirEditorDePerfil(membro) {
  const modal = document.getElementById('perfil-editor-modal');
  if (!modal) return;
  editorEstado = {
    membro,
    tipo: membro ? membro.tipo : 'adulto',
    avatar: membro ? membro.avatar : 'adulto-estrela',
    fotoBlob: null,
    fotoPrevia: membro ? (membro.fotoUrl || null) : null,
    removerFoto: false,
  };
  const campoNome = document.getElementById('perfil-editor-nome');
  document.getElementById('perfil-editor-titulo').textContent = membro
    ? 'Editar perfil'
    : (membrosDaConta.length === 0 ? 'Crie o primeiro perfil' : 'Novo perfil');
  campoNome.value = membro ? membro.nome : '';
  document.getElementById('perfil-editor-feedback').textContent = '';
  document.getElementById('perfil-editor-excluir').hidden = !membro;
  document.getElementById('perfil-editor-foto').value = '';
  document.getElementById('perfil-editor-salvar').disabled = false;
  renderizarEditor();
  modal.classList.add('active');

  // No primeiro perfil, sugere o nome usado no cadastro
  if (!membro && membrosDaConta.length === 0 && contaLogada()) {
    const dados = (sessaoAtual.user && sessaoAtual.user.user_metadata) || {};
    const sugestao = dados.nome || dados.full_name || '';
    if (sugestao && !campoNome.value) campoNome.value = String(sugestao).slice(0, TAMANHO_MAXIMO_DO_NOME);
  }
}

function renderizarEditor() {
  const e = editorEstado;
  if (!e) return;
  document.querySelectorAll('.perfil-tipo').forEach((b) => {
    b.classList.toggle('active', b.dataset.tipo === e.tipo);
    b.classList.toggle('travado', !!e.membro); // regra do app: o tipo não muda depois de criado
  });

  const grupo = e.tipo === 'crianca' ? 'kids' : 'adulto';
  if (!AVATARES.some((a) => a.id === e.avatar && a.grupo === grupo)) {
    e.avatar = AVATARES.find((a) => a.grupo === grupo).id;
  }

  const grade = document.getElementById('perfil-avatares');
  grade.innerHTML = AVATARES.filter((a) => a.grupo === grupo).map((a) => `
    <button type="button" class="perfil-avatar-opcao${!e.fotoPrevia && a.id === e.avatar ? ' selecionado' : ''}" data-avatar="${a.id}" aria-label="Escolher este avatar">
      ${desenharAvatar(a.id, null, 'medio')}
    </button>`).join('');
  grade.querySelectorAll('.perfil-avatar-opcao').forEach((botao) => {
    botao.addEventListener('click', () => {
      e.avatar = botao.dataset.avatar;
      e.fotoBlob = null;
      if (e.fotoPrevia) e.removerFoto = !!(e.membro && e.membro.foto_path);
      e.fotoPrevia = null;
      renderizarEditor();
    });
  });

  document.getElementById('perfil-editor-previa').innerHTML = desenharAvatar(e.avatar, e.fotoPrevia, 'grande');
  document.getElementById('perfil-editor-remover-foto').hidden = !e.fotoPrevia;
}

function fecharEditorDePerfil() {
  const modal = document.getElementById('perfil-editor-modal');
  if (modal) modal.classList.remove('active');
  if (editorEstado && editorEstado.fotoPrevia && editorEstado.fotoPrevia.startsWith('blob:')) {
    URL.revokeObjectURL(editorEstado.fotoPrevia);
  }
  editorEstado = null;
}

// A foto é cortada em quadrado e reduzida antes de enviar
// (fica leve e carrega rápido).
function reduzirFoto(arquivo, lado) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(arquivo);
    img.onload = () => {
      const menor = Math.min(img.width, img.height);
      const canvas = document.createElement('canvas');
      canvas.width = lado;
      canvas.height = lado;
      canvas.getContext('2d').drawImage(img, (img.width - menor) / 2, (img.height - menor) / 2, menor, menor, 0, 0, lado, lado);
      URL.revokeObjectURL(url);
      canvas.toBlob((blob) => (blob ? resolve(blob) : reject(new Error('falha'))), 'image/jpeg', 0.85);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('falha'));
    };
    img.src = url;
  });
}

async function aoEscolherFoto(evento) {
  const arquivo = evento.target.files && evento.target.files[0];
  if (!arquivo || !editorEstado) return;
  const feedback = document.getElementById('perfil-editor-feedback');
  if (!arquivo.type || !arquivo.type.startsWith('image/')) {
    feedback.textContent = 'Escolha um arquivo de imagem.';
    return;
  }
  try {
    const blob = await reduzirFoto(arquivo, 320);
    if (editorEstado.fotoPrevia && editorEstado.fotoPrevia.startsWith('blob:')) URL.revokeObjectURL(editorEstado.fotoPrevia);
    editorEstado.fotoBlob = blob;
    editorEstado.removerFoto = false;
    editorEstado.fotoPrevia = URL.createObjectURL(blob);
    feedback.textContent = '';
    renderizarEditor();
  } catch (e) {
    feedback.textContent = 'Não foi possível usar esta foto. Tente outra.';
  }
}

async function salvarPerfilDoEditor() {
  const e = editorEstado;
  if (!e) return;
  const feedback = document.getElementById('perfil-editor-feedback');
  const botao = document.getElementById('perfil-editor-salvar');
  const nome = document.getElementById('perfil-editor-nome').value.trim();
  if (!nome) {
    feedback.textContent = 'Escreva um nome para o perfil.';
    return;
  }
  if (!contaLogada()) {
    feedback.textContent = 'Entre na sua conta para salvar perfis.';
    return;
  }

  botao.disabled = true;
  feedback.textContent = 'Salvando...';
  try {
    const nomeFinal = nome.slice(0, TAMANHO_MAXIMO_DO_NOME);
    let id = e.membro ? e.membro.id : null;
    if (id) {
      const { error } = await supabaseCliente.rpc('update_profile', { _pid: id, _name: nomeFinal, _avatar_key: e.avatar });
      if (error) throw error;
    } else {
      const { data, error } = await supabaseCliente.rpc('create_profile', {
        _name: nomeFinal,
        _kind: e.tipo === 'crianca' ? 'kid' : 'adult',
        _avatar_key: e.avatar,
      });
      if (error) throw error;
      id = data.id;
    }

    const fotoAntiga = e.membro ? e.membro.foto_path : null;
    if (e.fotoBlob) {
      // Nome novo a cada troca, para a foto nova aparecer na hora
      const caminho = `${sessaoAtual.user.id}/${id}-${Date.now()}.jpg`;
      const { error } = await supabaseCliente.storage
        .from(PASTA_DE_FOTOS)
        .upload(caminho, e.fotoBlob, { upsert: true, contentType: 'image/jpeg' });
      if (error) throw error;
      const { error: erroFoto } = await supabaseCliente.rpc('update_profile', { _pid: id, _avatar_path: caminho });
      if (erroFoto) throw erroFoto;
      if (fotoAntiga && fotoAntiga !== caminho) await supabaseCliente.storage.from(PASTA_DE_FOTOS).remove([fotoAntiga]);
    } else if (e.removerFoto && fotoAntiga) {
      const { error } = await supabaseCliente.rpc('update_profile', { _pid: id, _clear_photo: true });
      if (error) throw error;
      await supabaseCliente.storage.from(PASTA_DE_FOTOS).remove([fotoAntiga]);
    }

    fecharEditorDePerfil();
    await renderizarSelecaoDePerfis();
    if (membroAtivo) {
      const atualizado = membrosDaConta.find((m) => m.id === membroAtivo.id);
      if (atualizado) {
        membroAtivo = atualizado;
        aplicarModoKids();
      }
    }
  } catch (erro) {
    const texto = String((erro && erro.message) || '');
    const mensagem = texto.includes('profile_limit_reached')
      ? `Esta conta já tem o máximo de ${MAXIMO_DE_PERFIS} perfis.`
      : 'Não foi possível salvar agora. Tente de novo.';
    feedback.textContent = mensagem;
    botao.disabled = false;
  }
}

async function excluirPerfilDoEditor() {
  const e = editorEstado;
  if (!e || !e.membro) return;
  const confirmou = confirm(`Excluir o perfil "${e.membro.nome}"? A Fé, a ofensiva e as insígnias dele serão apagadas para sempre.`);
  if (!confirmou) return;
  const feedback = document.getElementById('perfil-editor-feedback');
  try {
    const { error } = await supabaseCliente.rpc('delete_profile', { _pid: e.membro.id });
    if (error) throw error;
    if (e.membro.foto_path) await supabaseCliente.storage.from(PASTA_DE_FOTOS).remove([e.membro.foto_path]);
    if (membroAtivo && membroAtivo.id === e.membro.id) limparPerfilAtivo();
    fecharEditorDePerfil();
    renderizarSelecaoDePerfis();
  } catch (erro) {
    feedback.textContent = 'Não foi possível excluir agora. Tente de novo.';
  }
}

// ============================================================
//  PAINEL DE UM PERFIL (Fé, ofensiva e insígnias)
// ============================================================
async function abrirPainelDoPerfil(membroId) {
  const modal = document.getElementById('perfil-painel-modal');
  const conteudo = document.getElementById('perfil-painel-conteudo');
  if (!modal || !conteudo || !contaLogada()) return;

  const conhecido = membrosDaConta.find((m) => m.id === membroId)
    || (membroAtivo && membroAtivo.id === membroId ? membroAtivo : null);
  conteudo.innerHTML = '<p class="perfis-carregando">Carregando...</p>';
  modal.classList.add('active');

  try {
    const trilhas = await carregarConteudoDoServidor();
    const [resPerfil, resProgresso] = await Promise.all([
      supabaseCliente.rpc('get_profile', { _pid: membroId }),
      supabaseCliente.from('lesson_progress').select('lesson_id, times_completed').eq('profile_id', membroId),
    ]);
    if (resPerfil.error || resProgresso.error) throw (resPerfil.error || resProgresso.error);
    const m = membroDoPerfil(resPerfil.data);
    const feitas = new Set((resProgresso.data || []).filter((l) => l.times_completed > 0).map((l) => l.lesson_id));
    const insignias = trilhas.filter((t) => t.licoes.length > 0 && t.licoes.every((l) => feitas.has(l.id)));
    const itens = insignias.map((trilha) => (
      `<li class="painel-insignia">${icone('medalha')}<span><b>${trilha.santo}</b> · ${escaparTexto(nomeDaMedalha(trilha))}</span></li>`
    )).join('');

    conteudo.innerHTML = `
      <div class="painel-topo">
        ${desenharAvatar(m.avatar, conhecido && conhecido.fotoUrl, 'grande')}
        <h4 class="painel-nome">${escaparTexto(m.nome)}</h4>
        ${m.tipo === 'crianca' ? '<span class="perfil-tag">Kids</span>' : ''}
      </div>
      <div class="painel-numeros">
        <div><strong>${icone('estrela')}${m.fe}</strong><span>Fé</span></div>
        <div><strong>${icone('chama')}${m.ofensiva}</strong><span>Ofensiva</span></div>
        <div><strong>${icone('medalha')}${insignias.length}</strong><span>Insígnias</span></div>
      </div>
      <h5 class="painel-subtitulo">Insígnias conquistadas</h5>
      ${itens
        ? `<ul class="painel-insignias">${itens}</ul>`
        : '<p class="painel-vazio">Ainda nenhuma. Complete uma trilha inteira para ganhar a primeira.</p>'}`;
  } catch (e) {
    conteudo.innerHTML = '<p class="not-found-msg">Não foi possível carregar este perfil agora.</p>';
  }
}

// ============================================================
//  RANKING (Família e Global)
// ============================================================
function abrirRanking() {
  if (!contaLogada() || !membroAtivo) {
    abrirSelecaoDePerfis('ranking');
    return;
  }
  const ehCrianca = membroAtivo.tipo === 'crianca';
  const abaGlobal = document.getElementById('ranking-aba-global');
  if (abaGlobal) abaGlobal.style.display = ehCrianca ? 'none' : '';
  if (ehCrianca) abaDoRanking = 'familia';
  mudarDeView('view-ranking');
  marcarAbaDoRanking();
  renderizarRanking();
}

function marcarAbaDoRanking() {
  document.querySelectorAll('.ranking-aba').forEach((b) => b.classList.toggle('active', b.dataset.aba === abaDoRanking));
  document.querySelectorAll('.ranking-periodo').forEach((b) => b.classList.toggle('active', b.dataset.periodo === periodoDoRanking));
}

function linhaDoRanking(item) {
  const clicavel = !!item.membroId;
  const tag = clicavel ? 'button' : 'div';
  return `
    <${tag} class="ranking-linha${item.destaque ? ' destaque' : ''}"${clicavel ? ` data-membro="${item.membroId}"` : ''}>
      <span class="ranking-posicao">${item.posicao}</span>
      ${desenharAvatar(item.avatar, item.fotoUrl, 'pequeno')}
      <span class="ranking-nome">${escaparTexto(item.nome)}${item.destaque ? ' <small>você</small>' : ''}</span>
      <span class="ranking-numero ranking-fe">${icone('estrela')}${item.fe}</span>
      ${typeof item.ofensiva === 'number' ? `<span class="ranking-numero ranking-ofensiva">${icone('chama')}${item.ofensiva}</span>` : ''}
    </${tag}>`;
}

async function renderizarRanking() {
  const lista = document.getElementById('ranking-lista');
  if (!lista) return;
  lista.innerHTML = '<p class="perfis-carregando">Carregando...</p>';
  try {
    if (abaDoRanking === 'global' && membroAtivo.tipo === 'adulto') {
      const { data, error } = await supabaseCliente.rpc('leaderboard_global', {
        _pid: membroAtivo.id, _period: periodoDoRanking, _limit: 50,
      });
      if (error) throw error;
      const linhas = (data || []).map((l) => linhaDoRanking({
        posicao: l.rank, nome: l.display_name, avatar: l.avatar_key, fe: l.faith, destaque: l.is_me,
      })).join('');
      lista.innerHTML = linhas || '<p class="painel-vazio">Ainda não há ninguém no ranking global.</p>';
    } else {
      const [{ data, error }] = await Promise.all([
        supabaseCliente.rpc('leaderboard_family', { _pid: membroAtivo.id, _period: periodoDoRanking }),
        carregarMembrosDaConta(),
      ]);
      if (error) throw error;
      lista.innerHTML = (data || []).map((l) => {
        const membro = membrosDaConta.find((m) => m.id === l.profile_id);
        return linhaDoRanking({
          posicao: l.rank, nome: l.name, avatar: l.avatar_key, fotoUrl: membro && membro.fotoUrl, fe: l.faith,
          ofensiva: membro ? membro.ofensiva : undefined, destaque: l.is_me, membroId: l.profile_id,
        });
      }).join('');
      lista.querySelectorAll('.ranking-linha').forEach((linha) => {
        if (linha.dataset.membro) linha.addEventListener('click', () => abrirPainelDoPerfil(linha.dataset.membro));
      });
    }
  } catch (e) {
    lista.innerHTML = '<p class="not-found-msg">Não foi possível carregar o ranking agora.</p>';
  }
}

// ============================================================
//  INICIALIZAÇÃO
// ============================================================
function ligarFechamentoDeJanela(idJanela, idBotao, aoFechar) {
  const janela = document.getElementById(idJanela);
  const botao = document.getElementById(idBotao);
  const fechar = () => {
    if (aoFechar) aoFechar();
    else if (janela) janela.classList.remove('active');
  };
  if (botao) botao.addEventListener('click', fechar);
  if (janela) janela.addEventListener('click', (evento) => { if (evento.target === janela) fechar(); });
}

function iniciarPerfis() {
  ligarFechamentoDeJanela('perfil-editor-modal', 'perfil-editor-fechar', fecharEditorDePerfil);
  ligarFechamentoDeJanela('perfil-painel-modal', 'perfil-painel-fechar');

  document.querySelectorAll('.perfil-tipo').forEach((botao) => {
    botao.addEventListener('click', () => {
      if (!editorEstado) return;
      if (editorEstado.membro) {
        document.getElementById('perfil-editor-feedback').textContent = 'O tipo do perfil (adulto ou criança) não pode ser mudado depois de criado.';
        return;
      }
      editorEstado.tipo = botao.dataset.tipo;
      renderizarEditor();
    });
  });

  const campoFoto = document.getElementById('perfil-editor-foto');
  if (campoFoto) campoFoto.addEventListener('change', aoEscolherFoto);

  const removerFoto = document.getElementById('perfil-editor-remover-foto');
  if (removerFoto) removerFoto.addEventListener('click', () => {
    if (!editorEstado) return;
    editorEstado.removerFoto = !!(editorEstado.membro && editorEstado.membro.foto_path);
    editorEstado.fotoBlob = null;
    editorEstado.fotoPrevia = null;
    renderizarEditor();
  });

  const salvar = document.getElementById('perfil-editor-salvar');
  if (salvar) salvar.addEventListener('click', salvarPerfilDoEditor);
  const excluir = document.getElementById('perfil-editor-excluir');
  if (excluir) excluir.addEventListener('click', excluirPerfilDoEditor);

  const gerenciar = document.getElementById('perfis-gerenciar');
  if (gerenciar) gerenciar.addEventListener('click', () => {
    perfisEmModoEdicao = !perfisEmModoEdicao;
    renderizarSelecaoDePerfis();
  });

  const voltarRanking = document.getElementById('btn-back-ranking');
  if (voltarRanking) voltarRanking.addEventListener('click', () => abrirTrilhas());

  document.querySelectorAll('.ranking-aba').forEach((aba) => {
    aba.addEventListener('click', () => {
      abaDoRanking = aba.dataset.aba;
      marcarAbaDoRanking();
      renderizarRanking();
    });
  });
  document.querySelectorAll('.ranking-periodo').forEach((botao) => {
    botao.addEventListener('click', () => {
      periodoDoRanking = botao.dataset.periodo;
      marcarAbaDoRanking();
      renderizarRanking();
    });
  });

  const trocarPerfil = document.getElementById('conta-menu-perfis');
  if (trocarPerfil) trocarPerfil.addEventListener('click', () => abrirSelecaoDePerfis('trilhas'));

  // Saiu da conta: esquece o perfil escolhido
  if (typeof supabaseCliente !== 'undefined' && supabaseCliente) {
    supabaseCliente.auth.onAuthStateChange((_evento, sessao) => {
      if (!sessao) limparPerfilAtivo();
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  if (typeof rodarComSeguranca === 'function') rodarComSeguranca('perfis e rankings', iniciarPerfis);
  else iniciarPerfis();
});
