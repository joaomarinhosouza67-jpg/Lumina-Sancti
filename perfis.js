const CHAVE_MEMBRO_ATIVO = 'lumina-sancti-membro-ativo';
const CHAVE_TIPO_DO_MEMBRO = 'lumina-sancti-membro-tipo';
const MAXIMO_DE_PERFIS = 3;
const TAMANHO_MAXIMO_DO_NOME = 24;
const PASTA_DE_FOTOS = 'avatars';

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
let destinoAposEscolherPerfil = 'inicio';
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
  if (typeof atualizarInterfaceDeConta === 'function') atualizarInterfaceDeConta();
  if (eraCrianca !== ehCrianca || ehCrianca) avisarLumiDaTrocaDePerfil();
}

function modoInfantilAtivo() {
  return !!(membroAtivo && membroAtivo.tipo === 'crianca');
}

const DIGITOS_DO_PIN = 4;
const TENTATIVAS_ANTES_DE_ESPERAR = 5;
const ESPERA_APOS_ERROS_MS = 60 * 1000;
let portao = null;

function pinDosPaisSalvo() {
  const usuario = typeof sessaoAtual !== 'undefined' && sessaoAtual ? sessaoAtual.user : null;
  const pin = usuario && usuario.user_metadata ? usuario.user_metadata.pin_pais : null;
  return pin && pin.hash && pin.sal ? pin : null;
}

function paraBase64(bytes) {
  return btoa(String.fromCharCode(...new Uint8Array(bytes)));
}

function deBase64(texto) {
  return Uint8Array.from(atob(texto), (c) => c.charCodeAt(0));
}

async function resumoDoPin(pin, sal) {
  const chave = await crypto.subtle.importKey('raw', new TextEncoder().encode(pin), 'PBKDF2', false, ['deriveBits']);
  const bits = await crypto.subtle.deriveBits({ name: 'PBKDF2', hash: 'SHA-256', salt: deBase64(sal), iterations: 150000 }, chave, 256);
  return paraBase64(bits);
}

async function registroDoPin(pin) {
  const sal = paraBase64(crypto.getRandomValues(new Uint8Array(16)));
  return { sal, hash: await resumoDoPin(pin, sal), versao: 1 };
}

function pinsDosPerfis() {
  const usuario = typeof sessaoAtual !== 'undefined' && sessaoAtual ? sessaoAtual.user : null;
  const pins = usuario && usuario.user_metadata ? usuario.user_metadata.pins_perfis : null;
  return pins && typeof pins === 'object' ? pins : {};
}

function pinDoPerfil(idDoPerfil) {
  const pin = pinsDosPerfis()[idDoPerfil];
  return pin && pin.hash && pin.sal ? pin : null;
}

function perfilTrancado(membro) {
  return !!membro && membro.tipo === 'adulto' && !!pinDoPerfil(membro.id);
}

async function salvarPinDoPerfil(idDoPerfil, pin) {
  const pins = Object.assign({}, pinsDosPerfis());
  if (pin === null) delete pins[idDoPerfil];
  else pins[idDoPerfil] = await registroDoPin(pin);
  const { error } = await supabaseCliente.auth.updateUser({ data: { pins_perfis: pins } });
  if (error) throw error;
  if (sessaoAtual && sessaoAtual.user) {
    sessaoAtual.user.user_metadata = Object.assign({}, sessaoAtual.user.user_metadata, { pins_perfis: pins });
  }
}

function textosDoPinDoPerfil(nome) {
  return {
    entrar: [`Perfil de ${nome}`, 'Digite o PIN deste perfil.'],
    verificar: [`PIN do perfil de ${nome}`, 'Digite o PIN atual deste perfil.'],
    criar: [`PIN do perfil de ${nome}`, 'Escolha 4 números. Eles serão pedidos sempre que alguém escolher este perfil.'],
    confirmar: [`PIN do perfil de ${nome}`, 'Digite o mesmo PIN de novo, para confirmar.'],
  };
}

function pinSalvoDoPortao() {
  return portao && portao.alvo ? pinDoPerfil(portao.alvo) : pinDosPaisSalvo();
}

async function salvarPinDosPais(pin) {
  const pinPais = await registroDoPin(pin);
  const { error } = await supabaseCliente.auth.updateUser({ data: { pin_pais: pinPais } });
  if (error) throw error;
  if (sessaoAtual && sessaoAtual.user) {
    sessaoAtual.user.user_metadata = Object.assign({}, sessaoAtual.user.user_metadata, { pin_pais: pinPais });
  }
  atualizarSecaoDoPin();
}

async function pinConfere(pin) {
  const salvo = pinSalvoDoPortao();
  if (!salvo) return false;
  return (await resumoDoPin(pin, salvo.sal)) === salvo.hash;
}

const TEXTOS_DO_PORTAO = {
  sair: ['Sair do modo infantil', 'Chame um adulto para digitar o PIN dos pais.'],
  verificar: ['Mudar o PIN dos pais', 'Digite o PIN atual.'],
  criar: ['Criar o PIN dos pais', 'Escolha 4 números que só os adultos da casa sabem. Eles serão pedidos para sair de um perfil infantil.'],
  confirmar: ['Criar o PIN dos pais', 'Digite o mesmo PIN de novo, para confirmar.'],
};

function avisoDoPortao(texto, tipo) {
  const feedback = document.getElementById('portao-feedback');
  if (!feedback) return;
  feedback.textContent = texto || '';
  feedback.classList.toggle('erro', tipo === 'erro');
  feedback.classList.toggle('certo', tipo === 'certo');
}

function desenharPontosDoPortao() {
  const pontos = document.querySelectorAll('#portao-pontos span');
  pontos.forEach((ponto, i) => ponto.classList.toggle('cheio', !!portao && i < portao.digitos.length));
}

function mostrarTecladoDoPortao(modo, texto) {
  portao.modo = modo;
  portao.digitos = '';
  const [titulo, textoPadrao] = (portao.textos && portao.textos[modo]) || TEXTOS_DO_PORTAO[modo];
  document.getElementById('portao-titulo').textContent = portao.titulo || titulo;
  document.getElementById('portao-texto').textContent = texto || textoPadrao;
  document.getElementById('portao-pin').hidden = false;
  document.getElementById('portao-senha').hidden = true;
  document.getElementById('portao-esqueci').hidden = !['sair', 'verificar', 'entrar'].includes(modo);
  document.getElementById('portao-sair-conta').hidden = true;
  desenharPontosDoPortao();
}

function mostrarSenhaNoPortao(texto) {
  document.getElementById('portao-texto').textContent = texto;
  document.getElementById('portao-pin').hidden = true;
  document.getElementById('portao-senha').hidden = false;
  document.getElementById('portao-esqueci').hidden = true;
  document.getElementById('portao-sair-conta').hidden = false;
  const campo = document.getElementById('portao-senha-campo');
  campo.value = '';
  if (typeof carregarCaptcha === 'function') carregarCaptcha();
  setTimeout(() => campo.focus(), 50);
}

function abrirPortao(opcoes) {
  const modal = document.getElementById('portao-modal');
  if (!modal || !contaLogada()) return;
  portao = {
    modo: opcoes.modo,
    titulo: opcoes.titulo || null,
    aoConcluir: opcoes.aoConcluir || null,
    alvo: opcoes.alvo || null,
    textos: opcoes.textos || null,
    digitos: '',
    primeiro: null,
    erros: 0,
    esperarAte: 0,
    ocupado: false,
  };
  avisoDoPortao('');
  if (opcoes.modo === 'entrar' && !pinSalvoDoPortao()) {
    const depois = portao.aoConcluir;
    portao = null;
    if (depois) depois();
    return;
  }
  if ((opcoes.modo === 'sair' || opcoes.modo === 'verificar') && !pinSalvoDoPortao()) {
    document.getElementById('portao-titulo').textContent = opcoes.titulo || ((portao.textos && portao.textos[opcoes.modo]) || TEXTOS_DO_PORTAO[opcoes.modo])[0];
    mostrarSenhaNoPortao('Ainda não existe um PIN dos pais. Para continuar, um adulto precisa digitar a senha da conta.');
  } else {
    mostrarTecladoDoPortao(opcoes.modo, opcoes.texto);
  }
  modal.classList.add('active');
}

function fecharPortao() {
  const modal = document.getElementById('portao-modal');
  if (modal) modal.classList.remove('active');
  portao = null;
}

function concluirPortao() {
  const depois = portao && portao.aoConcluir;
  fecharPortao();
  if (depois) depois();
}

async function processarPinDoPortao() {
  if (!portao || portao.ocupado) return;
  portao.ocupado = true;
  const digitado = portao.digitos;
  try {
    if (['sair', 'verificar', 'entrar'].includes(portao.modo)) {
      if (await pinConfere(digitado)) {
        concluirPortao();
        return;
      }
      portao.erros += 1;
      portao.digitos = '';
      desenharPontosDoPortao();
      document.getElementById('portao-pontos').classList.add('tremendo');
      setTimeout(() => document.getElementById('portao-pontos').classList.remove('tremendo'), 450);
      if (portao.erros >= TENTATIVAS_ANTES_DE_ESPERAR) {
        portao.esperarAte = Date.now() + ESPERA_APOS_ERROS_MS;
        portao.erros = 0;
        avisoDoPortao('Muitas tentativas. Espere 1 minuto ou use a senha da conta em "Esqueci o PIN".', 'erro');
      } else {
        avisoDoPortao('PIN errado. Tente de novo.', 'erro');
      }
      return;
    }
    if (portao.modo === 'criar') {
      portao.primeiro = digitado;
      mostrarTecladoDoPortao('confirmar');
      avisoDoPortao('');
      return;
    }
    if (portao.modo === 'confirmar') {
      if (digitado !== portao.primeiro) {
        portao.primeiro = null;
        mostrarTecladoDoPortao('criar');
        avisoDoPortao('Os dois PINs ficaram diferentes. Comece de novo.', 'erro');
        return;
      }
      avisoDoPortao('Salvando...');
      if (portao.alvo) await salvarPinDoPerfil(portao.alvo, digitado);
      else await salvarPinDosPais(digitado);
      avisoDoPortao(portao.alvo ? 'PIN do perfil criado!' : 'PIN dos pais criado!', 'certo');
      setTimeout(concluirPortao, 700);
    }
  } catch (e) {
    avisoDoPortao('Não foi possível agora. Tente de novo.', 'erro');
    if (portao) {
      portao.digitos = '';
      desenharPontosDoPortao();
    }
  } finally {
    if (portao) portao.ocupado = false;
  }
}

function teclaDoPortao(tecla) {
  if (!portao || portao.ocupado) return;
  if (Date.now() < portao.esperarAte) {
    avisoDoPortao('Espere 1 minuto ou use a senha da conta em "Esqueci o PIN".', 'erro');
    return;
  }
  if (tecla === 'apagar') {
    portao.digitos = portao.digitos.slice(0, -1);
    desenharPontosDoPortao();
    return;
  }
  if (!/^[0-9]$/.test(tecla) || portao.digitos.length >= DIGITOS_DO_PIN) return;
  portao.digitos += tecla;
  desenharPontosDoPortao();
  if (portao.digitos.length === DIGITOS_DO_PIN) processarPinDoPortao();
}

async function confirmarSenhaNoPortao(evento) {
  evento.preventDefault();
  if (!portao || !sessaoAtual || !sessaoAtual.user) return;
  const senha = document.getElementById('portao-senha-campo').value;
  if (!senha) return;
  const captchaToken = typeof tokenDoCaptcha === 'function' ? tokenDoCaptcha('portao') : undefined;
  if (captchaToken === null) { avisoDoPortao('Confirme que você não é um robô.', 'erro'); return; }
  avisoDoPortao('Conferindo...');
  const { error } = await supabaseCliente.auth.signInWithPassword({ email: sessaoAtual.user.email, password: senha, options: { captchaToken } });
  if (typeof renovarCaptcha === 'function') renovarCaptcha('portao');
  if (error) {
    avisoDoPortao('Senha incorreta.', 'erro');
    return;
  }
  const modo = portao.modo;
  const depois = portao.aoConcluir;
  const alvo = portao.alvo;
  const textos = portao.textos;
  fecharPortao();
  if (modo === 'verificar') {
    if (depois) depois();
    return;
  }
  if (depois) depois();
  setTimeout(() => abrirPortao({ modo: 'criar', titulo: 'Criar um PIN novo', alvo, textos }), 400);
}

function sairDoModoInfantil(destino) {
  abrirPortao({
    modo: 'sair',
    aoConcluir: () => {
      limparPerfilAtivo();
      if (typeof atualizarInterfaceDeConta === 'function') atualizarInterfaceDeConta();
      abrirSelecaoDePerfis(destino || 'inicio', true);
    },
  });
}

function atualizarSecaoDoPin() {
  const estado = document.getElementById('perfil-pin-estado');
  const botao = document.getElementById('perfil-pin-botao');
  if (!estado || !botao) return;
  const existe = !!pinDosPaisSalvo();
  estado.textContent = existe
    ? 'O PIN dos pais está criado. Ele é pedido para sair de um perfil infantil.'
    : 'Ainda não existe. Ele será pedido para sair de um perfil infantil.';
  botao.textContent = existe ? 'Mudar PIN' : 'Criar PIN';
}

function abrirPinPelaPaginaDaConta() {
  if (pinDosPaisSalvo()) abrirPortao({ modo: 'verificar', aoConcluir: () => abrirPortao({ modo: 'criar' }) });
  else abrirPortao({ modo: 'criar' });
}

function avisarLumiDaTrocaDePerfil() {
  if (typeof mascoteReage === 'function') mascoteReage('perfil');
}

function limparPerfilAtivo() {
  membroAtivo = null;
  estadoEmMemoriaDaConta = null;
  try {
    localStorage.removeItem(CHAVE_MEMBRO_ATIVO);
    localStorage.removeItem(CHAVE_TIPO_DO_MEMBRO);
  } catch (e) {  }
  document.body.classList.remove('modo-kids');
  avisarLumiDaTrocaDePerfil();
}

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

function limiteDePerfis() {
  return typeof maximoDePerfisDoPlano === 'function' ? maximoDePerfisDoPlano(MAXIMO_DE_PERFIS) : MAXIMO_DE_PERFIS;
}

function perfilGuardadoPeloPlano(membro) {
  return !!membro && typeof perfilPrecisaDePlano === 'function' && perfilPrecisaDePlano(membro.id);
}

function mensagemDoLimiteDePerfis() {
  const limite = limiteDePerfis();
  if (typeof cobrancaLigadaNoSite === 'function' && cobrancaLigadaNoSite() && limite < 6) {
    return `O plano da conta permite ${limite === 1 ? '1 perfil' : `${limite} perfis`}. Para ter mais, veja os planos Duo e Família.`;
  }
  return `Esta conta já tem o máximo de ${limite} perfis.`;
}

async function carregarMembrosDaConta() {
  const assinatura = typeof carregarAssinaturaSemFalhar === 'function' ? carregarAssinaturaSemFalhar() : null;
  const { data, error } = await supabaseCliente.rpc('list_profiles');
  if (error) throw error;
  membrosDaConta = (data || []).map(membroDoPerfil);
  await Promise.all([anexarFotos(membrosDaConta), assinatura]);
  return membrosDaConta;
}

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
  }
}

function abrirSelecaoDePerfis(destino, liberado) {
  if (!contaLogada()) {
    if (typeof irParaLogin === 'function') irParaLogin();
    return;
  }
  if (modoInfantilAtivo() && !liberado) {
    sairDoModoInfantil(destino);
    return;
  }
  destinoAposEscolherPerfil = destino || 'inicio';
  perfisEmModoEdicao = false;
  if (typeof closeSidebar === 'function') closeSidebar();
  mudarDeView('view-perfis');
  renderizarSelecaoDePerfis();
}

async function renderizarSelecaoDePerfis(jaCarregados) {
  const grade = document.getElementById('perfis-grade');
  const gerenciar = document.getElementById('perfis-gerenciar');
  const titulo = document.querySelector('#view-perfis .perfis-titulo');
  if (!grade) return;
  if (titulo) titulo.textContent = perfisEmModoEdicao ? 'Gerencie os perfis' : 'Quem vai aprender agora?';
  grade.classList.toggle('editando', perfisEmModoEdicao);

  if (!jaCarregados) grade.innerHTML = '<p class="perfis-carregando">Carregando perfis...</p>';
  try {
    if (!jaCarregados) await carregarMembrosDaConta();
  } catch (e) {
    grade.innerHTML = '<p class="not-found-msg">Não foi possível carregar os perfis agora. Tente de novo em instantes.</p>';
    return;
  }

  const cartoes = membrosDaConta.map((m) => `
    <button class="perfil-cartao${perfisEmModoEdicao ? ' editando' : ''}${perfilGuardadoPeloPlano(m) ? ' guardado' : ''}" data-membro="${m.id}">
      <span class="perfil-avatar-wrap">
        ${desenharAvatar(m.avatar, m.fotoUrl, 'grande')}
        ${perfisEmModoEdicao ? `<span class="perfil-editar-selo">${icone('lapis')}</span>` : ''}
      </span>
      <span class="perfil-nome">${escaparTexto(m.nome)}</span>
      ${m.tipo === 'crianca' ? '<span class="perfil-tag">Kids</span>' : ''}
      ${perfilGuardadoPeloPlano(m) ? '<span class="perfil-tag perfil-tag-plano">Assine para usar</span>' : ''}
      ${perfilTrancado(m) ? `<span class="perfil-cadeado" title="Perfil com PIN" aria-label="Perfil com PIN">${icone('cadeado')}</span>` : ''}
    </button>`).join('');

  let adicionar = membrosDaConta.length < limiteDePerfis() ? `
    <button class="perfil-cartao perfil-adicionar" id="perfil-adicionar">
      <span class="perfil-avatar-wrap"><span class="avatar avatar-grande avatar-adicionar">${icone('mais')}</span></span>
      <span class="perfil-nome">Adicionar perfil</span>
    </button>` : '';
  if (!adicionar && typeof podeOferecerMaisPerfis === 'function' && podeOferecerMaisPerfis(membrosDaConta.length)) {
    adicionar = `
    <button class="perfil-cartao perfil-adicionar perfil-mais" id="perfil-mais">
      <span class="perfil-avatar-wrap"><span class="avatar avatar-grande avatar-adicionar">${icone('cadeado')}</span></span>
      <span class="perfil-nome">Mais perfis</span>
      <span class="perfil-tag perfil-tag-plano">Ver planos</span>
    </button>`;
  }

  grade.innerHTML = cartoes + adicionar;

  grade.querySelectorAll('.perfil-cartao').forEach((cartao) => {
    if (!cartao.dataset.membro) return;
    cartao.addEventListener('click', () => {
      const membro = membrosDaConta.find((m) => m.id === cartao.dataset.membro);
      if (!membro) return;
      const seguir = () => (perfisEmModoEdicao ? abrirEditorDePerfil(membro) : escolherPerfil(membro));
      if (!perfisEmModoEdicao && perfilGuardadoPeloPlano(membro)) {
        if (typeof avisarPerfilSemPlano === 'function') avisarPerfilSemPlano(membro);
        return;
      }
      if (perfilTrancado(membro)) {
        abrirPortao({ modo: 'entrar', alvo: membro.id, textos: textosDoPinDoPerfil(membro.nome), aoConcluir: seguir });
      } else {
        seguir();
      }
    });
  });
  const botaoAdicionar = document.getElementById('perfil-adicionar');
  if (botaoAdicionar) botaoAdicionar.addEventListener('click', () => abrirEditorDePerfil(null));
  const botaoMais = document.getElementById('perfil-mais');
  if (botaoMais) botaoMais.addEventListener('click', () => { if (typeof abrirPlanos === 'function') abrirPlanos(); });

  if (gerenciar) {
    gerenciar.textContent = perfisEmModoEdicao ? 'Concluído' : 'Gerenciar perfis';
    gerenciar.style.display = membrosDaConta.length ? '' : 'none';
  }

  if (membrosDaConta.length === 0) abrirEditorDePerfil(null);
}

function escolherPerfil(membro) {
  membroAtivo = membro;
  estadoEmMemoriaDaConta = null;
  guardarPerfilEscolhido(membro);
  aplicarModoKids();
  if (destinoAposEscolherPerfil === 'inicio') mudarDeView('view-home');
  else if (destinoAposEscolherPerfil === 'ranking') abrirRanking();
  else if (destinoAposEscolherPerfil === 'cenaculos' && typeof abrirCenaculos === 'function') abrirCenaculos();
  else if (destinoAposEscolherPerfil === 'comunidade' && typeof abrirComunidade === 'function') {
    if (membro.tipo === 'adulto') abrirComunidade();
    else mudarDeView('view-home');
  }
  else abrirTrilhas(slugPendenteDasTrilhas);
  if (typeof aposEscolherPerfil === 'function') aposEscolherPerfil(membro);
}

function guardarPerfilEscolhido(membro) {
  try {
    localStorage.setItem(CHAVE_MEMBRO_ATIVO, membro.id);
    localStorage.setItem(CHAVE_TIPO_DO_MEMBRO, membro.tipo);
  } catch (e) {  }
}

function temSessaoGuardada() {
  try {
    for (let i = 0; i < localStorage.length; i++) {
      if (/^sb-.+-auth-token$/.test(localStorage.key(i) || '')) return true;
    }
  } catch (e) {  }
  return false;
}

function ultimoPerfilEraCrianca() {
  try { return localStorage.getItem(CHAVE_TIPO_DO_MEMBRO) === 'crianca'; } catch (e) { return false; }
}

function telaDePerfisAberta() {
  const tela = document.getElementById('view-perfis');
  return !!tela && tela.classList.contains('active');
}

function abrirPerfisJaNaEntrada() {
  if (!temSessaoGuardada() || ultimoPerfilEraCrianca() || !aindaNaTelaInicial()) return;
  destinoAposEscolherPerfil = 'inicio';
  perfisEmModoEdicao = false;
  document.querySelectorAll('.view').forEach((v) => {
    v.classList.remove('active');
    v.style.display = 'none';
  });
  document.body.classList.remove('catalogo-interno');
  if (typeof aplicarTemaDaPagina === 'function') aplicarTemaDaPagina('view-perfis');
  const tela = document.getElementById('view-perfis');
  tela.style.display = 'block';
  tela.classList.add('active');
  const titulo = tela.querySelector('.perfis-titulo');
  if (titulo) titulo.textContent = 'Quem vai aprender agora?';
  const grade = document.getElementById('perfis-grade');
  if (grade) grade.innerHTML = '<p class="perfis-carregando">Carregando perfis...</p>';
  const gerenciar = document.getElementById('perfis-gerenciar');
  if (gerenciar) gerenciar.style.display = 'none';
}

function aindaNaTelaInicial() {
  const inicio = document.getElementById('view-home');
  return !!inicio && inicio.classList.contains('active') && !document.body.classList.contains('catalogo-interno');
}

async function restaurarPerfilSalvo() {
  if (typeof supabaseCliente === 'undefined' || !supabaseCliente || membroAtivo) return;
  const voltarAoInicio = () => { if (telaDePerfisAberta()) mudarDeView('view-home'); };
  const { data } = await supabaseCliente.auth.getSession();
  if (!data || !data.session) { voltarAoInicio(); return; }
  if (typeof cadastroCompleto === 'function' && !cadastroCompleto(data.session.user)) return;
  let id = null;
  try { id = localStorage.getItem(CHAVE_MEMBRO_ATIVO); } catch (e) {  }
  try {
    await carregarMembrosDaConta();
  } catch (e) {
    if (telaDePerfisAberta()) renderizarSelecaoDePerfis();
    return;
  }
  if (membroAtivo) return;
  const membro = id ? membrosDaConta.find((m) => m.id === id) : null;
  if (membro && membro.tipo === 'crianca') {
    membroAtivo = membro;
    guardarPerfilEscolhido(membro);
    aplicarModoKids();
    voltarAoInicio();
    return;
  }
  if (telaDePerfisAberta()) renderizarSelecaoDePerfis(true);
  else if (aindaNaTelaInicial()) abrirSelecaoDePerfis('inicio');
}

function aposEntrarNaConta() {
  membroAtivo = null;
  estadoEmMemoriaDaConta = null;
  abrirSelecaoDePerfis('inicio');
}

function prepararTrilhasDaConta(slug) {
  if (!contaLogada()) {
    estadoEmMemoriaDaConta = null;
    return false;
  }
  slugPendenteDasTrilhas = slug || null;
  carregarTrilhasDaConta();
  return true;
}

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
  if (!membroAtivo) {
    let idSalvo = null;
    try { idSalvo = localStorage.getItem(CHAVE_MEMBRO_ATIVO); } catch (e) {  }
    try { await carregarMembrosDaConta(); } catch (e) { membrosDaConta = []; }
    membroAtivo = membrosDaConta.find((m) => m.id === idSalvo) || null;
    if (membroAtivo && (perfilTrancado(membroAtivo) || (membroAtivo.tipo === 'adulto' && perfilGuardadoPeloPlano(membroAtivo)))) membroAtivo = null;
    if (!membroAtivo) {
      abrirSelecaoDePerfis('trilhas');
      return;
    }
  }

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
        <button class="trilhas-acao" id="trilhas-trocar-perfil">${icone('usuarios')}<span>${modoInfantilAtivo() ? tt('faixa_sair_kids') : tt('faixa_trocar')}</span></button>
      </div>`;
    document.getElementById('trilhas-perfil-atual').addEventListener('click', () => abrirPainelDoPerfil(membroAtivo.id));
    document.getElementById('trilhas-abrir-ranking').addEventListener('click', () => abrirRanking());
    document.getElementById('trilhas-trocar-perfil').addEventListener('click', () => abrirSelecaoDePerfis('inicio'));
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
  document.getElementById('perfil-editor-autorizo').checked = false;
  document.getElementById('perfil-editor-excluir').hidden = !membro;
  document.getElementById('perfil-editor-extra').hidden = !!membro || membrosDaConta.length === 0 || (typeof cobrancaLigadaNoSite === 'function' && cobrancaLigadaNoSite());
  atualizarPinNoEditor(membro);
  document.getElementById('perfil-editor-foto').value = '';
  document.getElementById('perfil-editor-salvar').disabled = false;
  renderizarEditor();
  modal.classList.add('active');

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
    b.classList.toggle('travado', !!e.membro);
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

  document.getElementById('perfil-editor-consentimento').hidden = !(!e.membro && e.tipo === 'crianca');
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
  if (!e.membro && membrosDaConta.length >= limiteDePerfis()) {
    feedback.textContent = mensagemDoLimiteDePerfis();
    return;
  }
  const novoInfantil = !e.membro && e.tipo === 'crianca';
  if (novoInfantil && !document.getElementById('perfil-editor-autorizo').checked) {
    feedback.textContent = 'Para criar um perfil infantil, marque a autorização do responsável.';
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
    if (novoInfantil && !pinDosPaisSalvo()) {
      abrirPortao({
        modo: 'criar',
        titulo: 'Crie o PIN dos pais',
        texto: 'Ele será pedido quando alguém quiser sair do perfil infantil. Escolha 4 números que só os adultos da casa sabem.',
      });
    }
    if (membroAtivo) {
      const atualizado = membrosDaConta.find((m) => m.id === membroAtivo.id);
      if (atualizado) {
        membroAtivo = atualizado;
        aplicarModoKids();
      }
    }
    const paginaDoPerfil = document.getElementById('view-perfil');
    if (paginaDoPerfil && paginaDoPerfil.classList.contains('active') && typeof renderizarMeuPerfil === 'function') renderizarMeuPerfil();
  } catch (erro) {
    const texto = String((erro && erro.message) || '');
    const mensagem = texto.includes('profile_limit_reached')
      ? mensagemDoLimiteDePerfis()
      : 'Não foi possível salvar agora. Tente de novo.';
    feedback.textContent = mensagem;
    botao.disabled = false;
  }
}

function atualizarPinNoEditor(membro) {
  const bloco = document.getElementById('perfil-editor-pin');
  if (!bloco) return;
  const mostrar = !!membro && membro.tipo === 'adulto';
  bloco.hidden = !mostrar;
  if (!mostrar) return;
  const tem = !!pinDoPerfil(membro.id);
  document.getElementById('perfil-editor-pin-estado').textContent = tem
    ? 'Este perfil está trancado. O PIN é pedido sempre que alguém escolhe este perfil.'
    : 'Tranque este perfil com um PIN de 4 números. Assim ninguém entra nele sem saber o PIN, nem as crianças.';
  document.getElementById('perfil-editor-pin-criar').textContent = tem ? 'Mudar PIN' : 'Criar PIN do perfil';
  document.getElementById('perfil-editor-pin-tirar').hidden = !tem;
}

function depoisDeMudarPinDoPerfil(membro, aviso) {
  atualizarPinNoEditor(membro);
  if (document.getElementById('perfis-grade')) renderizarSelecaoDePerfis(true);
  if (aviso && typeof mostrarAvisoTrilhas === 'function') mostrarAvisoTrilhas(aviso);
}

function criarOuMudarPinDoPerfil() {
  const membro = editorEstado && editorEstado.membro;
  if (!membro || membro.tipo !== 'adulto') return;
  const textos = textosDoPinDoPerfil(membro.nome);
  const criar = () => abrirPortao({ modo: 'criar', alvo: membro.id, textos, aoConcluir: () => depoisDeMudarPinDoPerfil(membro) });
  if (pinDoPerfil(membro.id)) abrirPortao({ modo: 'verificar', alvo: membro.id, textos, aoConcluir: criar });
  else criar();
}

function tirarPinDoPerfil() {
  const membro = editorEstado && editorEstado.membro;
  if (!membro || !pinDoPerfil(membro.id)) return;
  const textos = textosDoPinDoPerfil(membro.nome);
  textos.verificar = [`Tirar o PIN de ${membro.nome}`, 'Digite o PIN atual para destrancar este perfil.'];
  abrirPortao({
    modo: 'verificar',
    alvo: membro.id,
    textos,
    aoConcluir: async () => {
      try {
        await salvarPinDoPerfil(membro.id, null);
        depoisDeMudarPinDoPerfil(membro, 'Pronto! Este perfil não pede mais PIN.');
      } catch (e) {
        if (typeof mostrarAvisoTrilhas === 'function') mostrarAvisoTrilhas('Não foi possível tirar o PIN agora. Tente de novo.');
      }
    },
  });
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
    if (pinDoPerfil(e.membro.id)) {
      try { await salvarPinDoPerfil(e.membro.id, null); } catch (erroDoPin) {  }
    }
    fecharEditorDePerfil();
    renderizarSelecaoDePerfis();
  } catch (erro) {
    feedback.textContent = 'Não foi possível excluir agora. Tente de novo.';
  }
}

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
    if (typeof aplicarEnfeitesNoPainel === 'function') aplicarEnfeitesNoPainel(conteudo, membroId);
  } catch (e) {
    conteudo.innerHTML = '<p class="not-found-msg">Não foi possível carregar este perfil agora.</p>';
  }
}

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
  const aviso = document.getElementById('ranking-aviso-assinantes');
  const cobrando = typeof cobrancaLigadaNoSite === 'function' && cobrancaLigadaNoSite();
  if (aviso) aviso.hidden = abaDoRanking !== 'familia' || cobrando;
  document.querySelectorAll('.ranking-aba').forEach((b) => b.classList.toggle('active', b.dataset.aba === abaDoRanking));
  document.querySelectorAll('.ranking-periodo').forEach((b) => b.classList.toggle('active', b.dataset.periodo === periodoDoRanking));
}

function linhaDoRanking(item) {
  const clicavel = !!(item.membroId || item.publicoId);
  const tag = clicavel ? 'button' : 'div';
  const dados = item.membroId ? ` data-membro="${item.membroId}"` : (item.publicoId ? ` data-publico="${escaparTexto(item.publicoId)}"` : '');
  const perfil = item.perfilId ? ` data-perfil="${escaparTexto(item.perfilId)}"` : '';
  return `
    <${tag} class="ranking-linha${item.destaque ? ' destaque' : ''}"${perfil}${clicavel ? `${dados} type="button"` : ''}>
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
      const podeAbrirPerfil = typeof abrirPerfilPublico === 'function';
      const linhas = (data || []).map((l) => linhaDoRanking({
        posicao: l.rank, nome: l.display_name, avatar: l.avatar_key, fe: l.faith, destaque: l.is_me,
        publicoId: podeAbrirPerfil ? l.profile_id : null, perfilId: l.profile_id,
      })).join('');
      lista.innerHTML = linhas || '<p class="painel-vazio">Ainda não há ninguém no ranking global.</p>';
      lista.querySelectorAll('.ranking-linha[data-publico]').forEach((linha) => {
        linha.addEventListener('click', () => abrirPerfilPublico(linha.dataset.publico));
      });
      if (typeof enfeitarLinhasDoRanking === 'function') enfeitarLinhasDoRanking(lista, false);
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
          ofensiva: membro ? membro.ofensiva : undefined, destaque: l.is_me, membroId: l.profile_id, perfilId: l.profile_id,
        });
      }).join('');
      lista.querySelectorAll('.ranking-linha').forEach((linha) => {
        if (linha.dataset.membro) linha.addEventListener('click', () => abrirPainelDoPerfil(linha.dataset.membro));
      });
      if (typeof enfeitarLinhasDoRanking === 'function') enfeitarLinhasDoRanking(lista, true);
    }
  } catch (e) {
    if (String((e && e.message) || '').includes('recurso_de_assinante')) {
      mostrarRankingDaFamiliaTrancado(lista);
      return;
    }
    lista.innerHTML = '<p class="not-found-msg">Não foi possível carregar o ranking agora.</p>';
  }
}

function mostrarRankingDaFamiliaTrancado(lista) {
  marcarAbaDoRanking();
  if (membroAtivo && membroAtivo.tipo === 'crianca') {
    lista.innerHTML = '<p class="painel-vazio">O ranking da família está descansando. Continue aprendendo nas trilhas!</p>';
    return;
  }
  lista.innerHTML = `
    <div class="ranking-plano">
      ${icone('trofeu')}
      <p>O ranking da família faz parte dos planos Duo e Família. Com ele, vocês acompanham juntos quem juntou mais Fé na semana.</p>
      <button type="button" class="licao-botao" id="ranking-ver-planos">Ver planos</button>
    </div>`;
  const botao = document.getElementById('ranking-ver-planos');
  if (botao) botao.addEventListener('click', () => { if (typeof abrirPlanos === 'function') abrirPlanos(); });
}

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
  if (trocarPerfil) trocarPerfil.addEventListener('click', () => abrirSelecaoDePerfis('inicio'));
  const sairKids = document.getElementById('conta-menu-sair-kids');
  if (sairKids) sairKids.addEventListener('click', () => sairDoModoInfantil('inicio'));

  ligarFechamentoDeJanela('portao-modal', 'portao-fechar', fecharPortao);
  const teclado = document.getElementById('portao-teclado');
  if (teclado) teclado.addEventListener('click', (evento) => {
    const botao = evento.target.closest('[data-tecla]');
    if (botao) teclaDoPortao(botao.dataset.tecla);
  });
  document.addEventListener('keydown', (evento) => {
    const modal = document.getElementById('portao-modal');
    if (!portao || !modal || !modal.classList.contains('active') || document.getElementById('portao-pin').hidden) return;
    if (/^[0-9]$/.test(evento.key)) teclaDoPortao(evento.key);
    else if (evento.key === 'Backspace') teclaDoPortao('apagar');
  });
  const esqueci = document.getElementById('portao-esqueci');
  if (esqueci) esqueci.addEventListener('click', () => {
    if (!portao) return;
    avisoDoPortao('');
    mostrarSenhaNoPortao('Um adulto pode digitar a senha da conta para continuar.');
  });
  const formSenha = document.getElementById('portao-senha');
  if (formSenha) formSenha.addEventListener('submit', confirmarSenhaNoPortao);
  const sairDaConta = document.getElementById('portao-sair-conta');
  if (sairDaConta) sairDaConta.addEventListener('click', async () => {
    fecharPortao();
    limparPerfilAtivo();
    await supabaseCliente.auth.signOut();
    if (typeof irParaLogin === 'function') irParaLogin();
  });
  const botaoPin = document.getElementById('perfil-pin-botao');
  if (botaoPin) botaoPin.addEventListener('click', abrirPinPelaPaginaDaConta);
  const criarPinDoPerfil = document.getElementById('perfil-editor-pin-criar');
  if (criarPinDoPerfil) criarPinDoPerfil.addEventListener('click', criarOuMudarPinDoPerfil);
  const tirarPin = document.getElementById('perfil-editor-pin-tirar');
  if (tirarPin) tirarPin.addEventListener('click', tirarPinDoPerfil);

  if (typeof supabaseCliente !== 'undefined' && supabaseCliente) {
    supabaseCliente.auth.onAuthStateChange((_evento, sessao) => {
      if (!sessao) limparPerfilAtivo();
    });
    abrirPerfisJaNaEntrada();
    restaurarPerfilSalvo();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  if (typeof rodarComSeguranca === 'function') rodarComSeguranca('perfis e rankings', iniciarPerfis);
  else iniciarPerfis();
});
