const CHAVE_CONVITE_PENDENTE = 'lumina-sancti-convite-cenaculo';
const REGEX_LINK_DO_MEET = /^https:\/\/meet\.google\.com\/[a-z]{3}-[a-z]{4}-[a-z]{3}$/;
const PAGINAS_BLOQUEADAS_NA_SUSPENSAO = ['view-trilhas', 'view-licao', 'view-ranking', 'view-cenaculos', 'view-cenaculo', 'view-comunidade'];
const MOTIVOS_DE_DENUNCIA = ['Ofensa ou xingamento', 'Conteúdo impróprio', 'Spam ou propaganda', 'Mentira ou golpe', 'Outro motivo'];
const CHAVE_DO_GIPHY = '';
const PASTA_DOS_AUDIOS = 'cenaculo-audios';
const SEGUNDOS_MAXIMOS_DE_AUDIO = 120;
const VERSAO_DO_SELETOR_DE_EMOJIS = '1.29.1';
const VERSAO_DOS_DADOS_DE_EMOJIS = '1.8.0';
const MINUTOS_PARA_JUNTAR_MENSAGENS = 5;
const BARRAS_DA_ONDA = 36;
const BARRAS_AO_VIVO = 40;
const CHAVE_DAS_ONDAS = 'lumina-sancti-ondas-dos-audios';
const DISTANCIA_PARA_CANCELAR = 110;
const DISTANCIA_PARA_TRAVAR = 80;
const FUNDOS_DA_CONVERSA = [
  { id: 'padrao', nome: 'Padrão' },
  { id: 'estrelas', nome: 'Noite estrelada' },
  { id: 'dourado', nome: 'Dourado' },
  { id: 'ceu', nome: 'Manto azul' },
  { id: 'rosas', nome: 'Rosas' },
  { id: 'oliveiras', nome: 'Oliveiras' },
  { id: 'vinho', nome: 'Vinho' },
  { id: 'vitral', nome: 'Vitral' },
];

const REGRAS_DOS_CENACULOS = `
  <ol class="cenaculo-regras">
    <li>Os Cenáculos são só para adultos (18 anos ou mais). Perfis infantis não têm acesso.</li>
    <li>Trate todos com respeito e caridade. Não é permitido xingar, ofender, discriminar, espalhar mentiras, fazer propaganda, pedir dinheiro ou enviar conteúdo impróprio.</li>
    <li>As conversas não são secretas: a equipe do Lumina Sancti (criadores e programadores) pode ler as mensagens e ouvir os áudios dos cenáculos, para proteger os participantes e investigar denúncias.</li>
    <li>Se alguém desrespeitar as regras, denuncie a mensagem ou bloqueie a pessoa. A equipe pode apagar mensagens e suspender contas, por um tempo ou por tempo indeterminado, enquanto investiga.</li>
    <li>Uma conta suspensa não pode escrever nos cenáculos nem usar as trilhas, mas nada dela é apagado.</li>
    <li>As reuniões por vídeo acontecem no Google Meet, fora do Lumina Sancti. O Lumina Sancti não grava, não guarda e não se responsabiliza pelo que acontece nas chamadas do Meet.</li>
    <li>Não compartilhe dados pessoais seus ou de outras pessoas (endereço, documentos, telefone), principalmente de crianças.</li>
  </ol>`;

const ERROS_DO_CENACULO = {
  account_suspended: 'Sua conta está suspensa. Enquanto isso, os Cenáculos e as trilhas ficam parados, mas nada é apagado.',
  somente_adultos: 'Os Cenáculos são só para perfis de adultos.',
  regras_nao_aceitas: 'Para continuar, marque que você aceita as regras.',
  convite_invalido: 'Este convite não vale mais. Peça um link novo a quem organiza o cenáculo.',
  removido_do_cenaculo: 'Você foi removido deste cenáculo e não pode entrar de novo.',
  cenaculo_cheio: 'Este cenáculo já está cheio (200 pessoas).',
  muitas_mensagens: 'Você mandou muitas mensagens seguidas. Espere um minutinho.',
  link_meet_invalido: 'Cole o link do Google Meet, parecido com https://meet.google.com/abc-defg-hij',
  data_no_passado: 'Escolha uma data e hora que ainda não passaram.',
  limite_de_cenaculos: 'Você já criou 10 cenáculos, que é o máximo.',
  cenaculo_nao_encontrado: 'Este cenáculo não existe mais ou você não participa dele.',
  mensagem_vazia: 'Escreva alguma coisa antes de enviar.',
  sem_permissao: 'Só quem organiza o cenáculo pode fazer isso.',
  somente_equipe: 'Só a equipe do Lumina Sancti pode ver isso.',
  cenaculos_nome_check: 'O nome precisa ter de 2 a 60 letras.',
  audio_invalido: 'Não foi possível enviar o áudio. Tente gravar de novo.',
  gif_invalido: 'Não foi possível enviar esse GIF.',
  codigo_invalido: 'Não encontramos ninguém com esse código. Confira se copiou o código inteiro.',
  codigo_proprio: 'Esse é o seu próprio código. Mande ele para quem você quer adicionar.',
  muitos_contatos: 'Você já adicionou muitas pessoas hoje. Tente de novo amanhã.',
  perfil_nao_encontrado: 'Não é possível ver este perfil.',
  fundo_invalido: 'Esse fundo não existe.',
  foto_invalida: 'Não foi possível usar essa foto. Tente outra.',
};

let suspensaoAtual = null;
let contaEhDaEquipe = false;
let cenaculoAberto = null;
let mensagensDoCenaculo = [];
let canalDoCenaculo = null;
let temporizadorDoCenaculo = null;
let haMensagensMaisAntigas = false;
let fotosDosMembros = {};
let gravacaoDeAudio = null;
let audioTocando = null;
let velocidadeDosAudios = 1;
let ondasEmMemoria = null;
const ondasEmCalculo = new Set();
const ondasQueFalharam = new Set();
let toqueNoMicrofone = null;
let gravacaoIniciando = false;
const enderecosDosAudios = {};
let abaDoGiphy = 'gifs';
let temporizadorDoGiphy = null;
let seletorDeEmojisPronto = null;
let temporizadorDoNome = null;
let fotoDoGrupoUrl = '';
let ultimaListaDeCenaculos = null;
let fotosDaUltimaLista = {};
let filtroDaLista = 'tudo';
let buscaDaLista = '';
let temporizadorDaLista = null;
const TELA_GRANDE = window.matchMedia('(min-width: 900px)');
const aceitesDosPerfis = {};
const enderecosDasFotosDosGrupos = {};

function mensagemDoCenaculo(erro) {
  const texto = String((erro && erro.message) || erro || '');
  const chave = Object.keys(ERROS_DO_CENACULO).find((k) => texto.includes(k));
  return chave ? ERROS_DO_CENACULO[chave] : 'Não foi possível fazer isso agora. Tente de novo em instantes.';
}

function avisoDoCenaculo(texto) {
  if (typeof mostrarAvisoTrilhas === 'function') mostrarAvisoTrilhas(texto);
}

let ultimaConferenciaDeSuspensao = 0;

async function chamarCenaculo(nome, argumentos) {
  const { data, error } = await supabaseCliente.rpc(nome, argumentos || {});
  if (error) {
    if (String(error.message || '').includes('account_suspended') && Date.now() - ultimaConferenciaDeSuspensao > 5000) {
      ultimaConferenciaDeSuspensao = Date.now();
      atualizarSituacaoDaConta();
    }
    throw error;
  }
  return data;
}

function perfilAdultoAtivo() {
  return (typeof membroAtivo !== 'undefined' && membroAtivo && membroAtivo.tipo === 'adulto') ? membroAtivo : null;
}

function iconeDoCenaculo(nome) {
  return typeof icone === 'function' ? icone(nome) : '';
}

function avatarDoCenaculo(avatar, fotoUrl, tamanho) {
  return typeof desenharAvatar === 'function' ? desenharAvatar(avatar, fotoUrl, tamanho) : '';
}

function formatarHora(iso) {
  const data = new Date(iso);
  return data.toLocaleTimeString(localDoIdioma(), { hour: '2-digit', minute: '2-digit' });
}

function formatarDia(iso) {
  const data = new Date(iso);
  const hoje = new Date();
  const ontem = new Date(Date.now() - 86400000);
  if (data.toDateString() === hoje.toDateString()) return 'Hoje';
  if (data.toDateString() === ontem.toDateString()) return 'Ontem';
  return data.toLocaleDateString(localDoIdioma(), { day: '2-digit', month: '2-digit', year: 'numeric' });
}

function formatarEncontro(iso) {
  const data = new Date(iso);
  const dia = data.toLocaleDateString(localDoIdioma(), { weekday: 'long', day: '2-digit', month: '2-digit' });
  return tr('{dia} às {hora}', { dia, hora: formatarHora(iso) });
}

function formatarDuracao(segundos) {
  const total = Math.max(0, Math.round(segundos || 0));
  return `${Math.floor(total / 60)}:${String(total % 60).padStart(2, '0')}`;
}

function enderecoDoGif(id) {
  return `https://media.giphy.com/media/${encodeURIComponent(id)}/200w.webp`;
}

function janelaDoCenaculo(titulo, corpo) {
  let modal = document.getElementById('cenaculo-janela');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'cenaculo-janela';
    modal.className = 'search-modal';
    modal.innerHTML = `
      <div class="search-modal-content cenaculo-janela-conteudo" role="dialog" aria-modal="true">
        <div class="search-header">
          <h3 id="cenaculo-janela-titulo"></h3>
          <button type="button" class="icon-btn" id="cenaculo-janela-fechar" aria-label="Fechar"><svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg></button>
        </div>
        <div id="cenaculo-janela-corpo"></div>
      </div>`;
    document.body.appendChild(modal);
    modal.querySelector('#cenaculo-janela-fechar').addEventListener('click', fecharJanelaDoCenaculo);
    modal.addEventListener('click', (evento) => { if (evento.target === modal) fecharJanelaDoCenaculo(); });
  }
  modal.querySelector('#cenaculo-janela-titulo').textContent = titulo;
  const lugar = modal.querySelector('#cenaculo-janela-corpo');
  lugar.innerHTML = corpo;
  modal.classList.add('active');
  return lugar;
}

function fecharJanelaDoCenaculo() {
  const modal = document.getElementById('cenaculo-janela');
  if (modal) modal.classList.remove('active');
}

async function atualizarSituacaoDaConta() {
  if (typeof contaLogada !== 'function' || !contaLogada()) {
    suspensaoAtual = null;
    contaEhDaEquipe = false;
    return;
  }
  try {
    const [suspensao, equipe] = await Promise.all([
      supabaseCliente.rpc('minha_suspensao'),
      supabaseCliente.rpc('equipe_membro'),
    ]);
    suspensaoAtual = suspensao && !suspensao.error && suspensao.data ? suspensao.data : null;
    contaEhDaEquipe = !!(equipe && !equipe.error && equipe.data === true);
  } catch (e) {
  }
  if (suspensaoAtual) {
    if (typeof pedidosRecebidos !== 'undefined') pedidosRecebidos = [];
    if (typeof atualizarSelosDePedidos === 'function') atualizarSelosDePedidos();
    return;
  }
  if (perfilAdultoAtivo() && typeof carregarPedidosRecebidos === 'function') {
    carregarPedidosRecebidos().then(() => { if (typeof atualizarSelosDePedidos === 'function') atualizarSelosDePedidos(); });
  }
}

function textoDaSuspensao() {
  if (!suspensaoAtual) return '';
  return suspensaoAtual.fim
    ? tr('até {dia} às {hora}', { dia: new Date(suspensaoAtual.fim).toLocaleDateString(localDoIdioma()), hora: formatarHora(suspensaoAtual.fim) })
    : tr('por tempo indeterminado, enquanto a equipe analisa');
}

function mostrarAvisoDeSuspensao() {
  const motivo = suspensaoAtual && suspensaoAtual.motivo ? `<p class="cenaculo-suspensao-motivo">${tr('Motivo:')} <span translate="no">${escaparTexto(suspensaoAtual.motivo)}</span></p>` : '';
  const corpo = janelaDoCenaculo('Sua conta está suspensa', `
    <div class="cenaculo-suspensao">
      <p>${tr('Sua conta está suspensa {quando}.', { quando: textoDaSuspensao() })}</p>
      ${motivo}
      <p>Enquanto isso, os Cenáculos e as trilhas ficam parados. Você pode continuar vendo a vida dos santos, as orações e o terço.</p>
      <p>Nada foi apagado: suas trilhas, medalhas e sequência continuam guardadas e voltam quando a suspensão acabar.</p>
      <p class="cenaculo-suspensao-contato">Dúvidas? <a href="mailto:suporte@luminasancti.com">suporte@luminasancti.com</a></p>
      <button type="button" class="licao-botao" id="cenaculo-suspensao-ok">Entendi</button>
    </div>`);
  corpo.querySelector('#cenaculo-suspensao-ok').addEventListener('click', fecharJanelaDoCenaculo);
}

function paginaBloqueadaPelaSuspensao(idDaPagina) {
  if (!suspensaoAtual || !PAGINAS_BLOQUEADAS_NA_SUSPENSAO.includes(idDaPagina)) return false;
  mostrarAvisoDeSuspensao();
  return true;
}

async function perfilJaAceitou() {
  const perfil = perfilAdultoAtivo();
  if (!perfil) return false;
  if (aceitesDosPerfis[perfil.id]) return true;
  try {
    aceitesDosPerfis[perfil.id] = (await chamarCenaculo('cenaculo_aceite', { _pid: perfil.id })) === true;
  } catch (e) {
    return false;
  }
  return aceitesDosPerfis[perfil.id];
}

function pedirAceite() {
  return new Promise((resolver) => {
    let respondeu = false;
    const corpo = janelaDoCenaculo('Antes de começar', `
      ${blocoDoParticipante()}
      <p class="cenaculo-explica">Nos Cenáculos você conversa com o seu grupo e com os amigos que adicionar. Leia as regras com atenção: esta mensagem aparece só uma vez.</p>
      ${blocoDeAceite('cenaculo-aceite-unico')}
      <label class="perfil-consentimento cenaculo-aceite">
        <input type="checkbox" id="cenaculo-aceite-leitura">
        <span>Entendo que a equipe do Lumina Sancti pode ler as mensagens e ouvir os áudios de todos, para proteger quem participa.</span>
      </label>
      <button type="button" class="licao-botao" id="cenaculo-aceite-continuar">Concordo e quero participar</button>
      <p class="auth-feedback" id="cenaculo-aceite-aviso" aria-live="polite"></p>`);
    ligarLinkDaPrivacidade(corpo);
    const modal = document.getElementById('cenaculo-janela');
    const aoFechar = new MutationObserver(() => {
      if (!modal.classList.contains('active') && !respondeu) {
        respondeu = true;
        aoFechar.disconnect();
        resolver(false);
      }
    });
    aoFechar.observe(modal, { attributes: true, attributeFilter: ['class'] });
    corpo.querySelector('#cenaculo-aceite-continuar').addEventListener('click', async () => {
      const aviso = corpo.querySelector('#cenaculo-aceite-aviso');
      if (!corpo.querySelector('#cenaculo-aceite-unico').checked || !corpo.querySelector('#cenaculo-aceite-leitura').checked) {
        aviso.textContent = 'Para participar, marque as duas caixinhas.';
        return;
      }
      const perfil = perfilAdultoAtivo();
      try {
        await chamarCenaculo('cenaculo_aceitar_regras', { _pid: perfil.id });
        aceitesDosPerfis[perfil.id] = true;
        respondeu = true;
        aoFechar.disconnect();
        fecharJanelaDoCenaculo();
        resolver(true);
      } catch (erro) {
        aviso.textContent = mensagemDoCenaculo(erro);
      }
    });
  });
}

async function garantirAceite() {
  if (await perfilJaAceitou()) return true;
  return pedirAceite();
}

function abrirCenaculos() {
  if (typeof contaLogada !== 'function' || !contaLogada()) {
    avisoDoCenaculo('Entre na sua conta para participar dos Cenáculos.');
    if (typeof irParaLogin === 'function') irParaLogin();
    return;
  }
  if (typeof modoInfantilAtivo === 'function' && modoInfantilAtivo()) {
    if (typeof paginaSoParaAdultos === 'function') paginaSoParaAdultos('view-cenaculos');
    return;
  }
  if (!perfilAdultoAtivo()) {
    if (typeof abrirSelecaoDePerfis === 'function') abrirSelecaoDePerfis('cenaculos');
    return;
  }
  if (paginaBloqueadaPelaSuspensao('view-cenaculos')) return;
  pararConversa();
  if (typeof closeSidebar === 'function') closeSidebar();
  mostrarListaDeCenaculos();
  garantirAceite();
}

function telaGrande() {
  return TELA_GRANDE.matches;
}

function posicionarPainelDaLista() {
  const painel = document.getElementById('cenaculos-painel');
  const destino = document.getElementById(telaGrande() ? 'cenaculo-lateral' : 'cenaculos-casa');
  if (painel && destino && painel.parentElement !== destino) destino.appendChild(painel);
}

function marcarSemConversa(semConversa) {
  const tela = document.getElementById('cenaculo-tela');
  if (tela) tela.classList.toggle('sem-conversa', semConversa);
}

function mostrarListaDeCenaculos() {
  posicionarPainelDaLista();
  if (telaGrande()) {
    pararConversa();
    cenaculoAberto = null;
    marcarSemConversa(true);
    mudarDeView('view-cenaculo');
  } else {
    cenaculoAberto = null;
    mudarDeView('view-cenaculos');
  }
  carregarListaDeCenaculos();
  if (typeof mostrarPedidosNosCenaculos === 'function') mostrarPedidosNosCenaculos();
}

function aoMudarTamanhoDaTela() {
  posicionarPainelDaLista();
  const ativa = document.querySelector('.view.active');
  const idAtiva = ativa ? ativa.id : '';
  if (telaGrande() && idAtiva === 'view-cenaculos') {
    mostrarListaDeCenaculos();
  } else if (!telaGrande() && idAtiva === 'view-cenaculo' && !cenaculoAberto) {
    mudarDeView('view-cenaculos');
  }
}

function agendarAtualizacaoDaLista() {
  if (!telaGrande()) return;
  clearTimeout(temporizadorDaLista);
  temporizadorDaLista = setTimeout(() => carregarListaDeCenaculos(true), 1200);
}

async function carregarListaDeCenaculos(semAvisoDeCarregando) {
  const lista = document.getElementById('cenaculos-lista');
  const perfil = perfilAdultoAtivo();
  if (!lista || !perfil) return;
  if (!semAvisoDeCarregando || !ultimaListaDeCenaculos) lista.innerHTML = '<p class="perfis-carregando">Carregando suas conversas...</p>';
  try {
    const cenaculos = await chamarCenaculo('cenaculo_meus', { _pid: perfil.id });
    const fotos = await enderecosDasFotosDaLista(cenaculos || []);
    renderizarListaDeCenaculos(cenaculos || [], fotos);
  } catch (erro) {
    lista.innerHTML = `<p class="not-found-msg">${mensagemDoCenaculo(erro)}</p>`;
  }
}

async function enderecosAssinados(pasta, caminhos) {
  const unicos = Array.from(new Set(caminhos.filter(Boolean)));
  const resultado = {};
  if (unicos.length === 0) return resultado;
  try {
    const { data } = await supabaseCliente.storage.from(pasta).createSignedUrls(unicos, 60 * 60);
    (data || []).forEach((item) => {
      if (item && item.path && item.signedUrl) resultado[item.path] = item.signedUrl;
    });
  } catch (e) {
  }
  return resultado;
}

async function enderecosDasFotosDaLista(cenaculos) {
  const [pessoas, grupos] = await Promise.all([
    enderecosAssinados('avatars', cenaculos.map((c) => c.outro && c.outro.foto)),
    enderecosAssinados('cenaculo-fotos', cenaculos.map((c) => c.tipo !== 'conversa' && c.foto)),
  ]);
  Object.assign(enderecosDasFotosDosGrupos, grupos);
  return Object.assign({}, pessoas, grupos);
}

function nomeDaConversa(c) {
  return c.tipo === 'conversa' && c.outro ? c.outro.nome : c.nome;
}

function resumoDaUltimaMensagem(ultima, ehConversa) {
  if (!ultima) return ehConversa ? 'Diga olá!' : 'Nenhuma mensagem ainda.';
  const perfil = perfilAdultoAtivo();
  const minha = perfil && ultima.perfil_id === perfil.id;
  const prefixo = minha ? `${tr('Você:')} ` : (ehConversa ? '' : `<span translate="no">${escaparTexto(ultima.autor)}:</span> `);
  if (ultima.apagada) return `${prefixo}${tr('mensagem apagada')}`;
  if (ultima.tipo === 'gif') return `${prefixo}GIF`;
  if (ultima.tipo === 'figurinha') return `${prefixo}${tr('figurinha')}`;
  if (ultima.tipo === 'audio') return `${prefixo}${tr('áudio')}`;
  return `${prefixo}<span translate="no">${escaparTexto(ultima.texto || '')}</span>`;
}

function iconeDaLista(c, fotos) {
  if (c.tipo === 'conversa' && c.outro) return avatarDoCenaculo(c.outro.avatar, fotos[c.outro.foto], 'medio');
  if (c.foto && fotos[c.foto]) return `<span class="avatar avatar-medio"><img src="${escaparTexto(fotos[c.foto])}" alt=""></span>`;
  return `<span class="cenaculo-cartao-icone">${iconeDoCenaculo('usuarios')}</span>`;
}

function horaNaLista(iso) {
  if (!iso) return '';
  const data = new Date(iso);
  if (Number.isNaN(data.getTime())) return '';
  const hoje = new Date();
  if (data.toDateString() === hoje.toDateString()) return formatarHora(iso);
  if (data.toDateString() === new Date(Date.now() - 86400000).toDateString()) return 'Ontem';
  if (Date.now() - data.getTime() < 6 * 86400000) {
    const dia = data.toLocaleDateString(localDoIdioma(), { weekday: 'long' });
    return dia.charAt(0).toUpperCase() + dia.slice(1);
  }
  return data.toLocaleDateString(localDoIdioma(), { day: '2-digit', month: '2-digit', year: 'numeric' });
}

function textoParaBusca(texto) {
  return String(texto || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}

function passaNoFiltro(c) {
  if (filtroDaLista === 'conversas' && c.tipo !== 'conversa') return false;
  if (filtroDaLista === 'grupos' && c.tipo === 'conversa') return false;
  const busca = textoParaBusca(buscaDaLista).trim();
  return !busca || textoParaBusca(nomeDaConversa(c)).includes(busca);
}

function marcarConversaAtivaNaLista() {
  document.querySelectorAll('.cenaculo-cartao').forEach((botao) => {
    botao.classList.toggle('ativa', !!cenaculoAberto && botao.dataset.cenaculo === cenaculoAberto.id);
  });
}

function renderizarListaDeCenaculos(cenaculos, fotos) {
  const lista = document.getElementById('cenaculos-lista');
  if (!lista) return;
  if (cenaculos) {
    ultimaListaDeCenaculos = cenaculos;
    fotosDaUltimaLista = fotos || {};
  }
  const todos = ultimaListaDeCenaculos || [];
  const enderecos = fotosDaUltimaLista;
  document.querySelectorAll('.cenaculos-filtro').forEach((b) => b.classList.toggle('ativo', b.dataset.filtro === filtroDaLista));
  if (todos.length === 0) {
    lista.innerHTML = `
      <div class="cenaculos-vazio">
        <p><strong>Você ainda não tem conversas nem cenáculos.</strong></p>
        <p>Toque em "Nova conversa" para colar o código de um amigo ou escanear o QR Code dele. No menu, você também pode criar um cenáculo para o seu grupo de oração ou entrar com um convite.</p>
      </div>`;
    return;
  }
  const visiveis = todos.filter(passaNoFiltro);
  if (visiveis.length === 0) {
    lista.innerHTML = '<p class="cenaculos-nada">Nenhuma conversa encontrada.</p>';
    return;
  }
  lista.innerHTML = visiveis.map((c) => {
    const conversa = c.tipo === 'conversa';
    const faixa = conversa && typeof faixaDaLinhaDaConversa === 'function' ? faixaDaLinhaDaConversa(c.outro) : '';
    return `
    <button type="button" class="cenaculo-cartao${conversa ? ' conversa' : ''}${faixa ? ' com-faixa' : ''}" data-cenaculo="${c.id}">
      ${faixa}
      ${iconeDaLista(c, enderecos)}
      <span class="cenaculo-cartao-textos">
        <span class="cenaculo-cartao-linha">
          <strong translate="no">${escaparTexto(nomeDaConversa(c))}</strong>
          <span class="cenaculo-cartao-hora">${horaNaLista(c.ultima ? c.ultima.quando : c.atividade)}</span>
        </span>
        <small>${resumoDaUltimaMensagem(c.ultima, conversa)}</small>
        ${c.encontro ? `<small class="cenaculo-cartao-encontro">${iconeDoCenaculo('video')} <span translate="no">${escaparTexto(c.encontro.titulo)}:</span> ${formatarEncontro(c.encontro.quando)}</small>` : ''}
      </span>
    </button>`;
  }).join('');
  lista.querySelectorAll('.cenaculo-cartao').forEach((botao) => {
    botao.addEventListener('click', () => abrirConversa(botao.dataset.cenaculo));
  });
  marcarConversaAtivaNaLista();
}

function alternarMenuDaLista(abrir) {
  const menu = document.getElementById('cenaculos-menu');
  const botao = document.getElementById('cenaculos-menu-btn');
  if (!menu || !botao) return;
  const vaiAbrir = typeof abrir === 'boolean' ? abrir : menu.hidden;
  menu.hidden = !vaiAbrir;
  botao.setAttribute('aria-expanded', vaiAbrir ? 'true' : 'false');
}

function blocoDoParticipante() {
  const perfil = perfilAdultoAtivo();
  if (!perfil) return '';
  return `
    <div class="cenaculo-participante">
      ${avatarDoCenaculo(perfil.avatar, perfil.fotoUrl, 'medio')}
      <span>Você vai participar como <strong>${escaparTexto(perfil.nome)}</strong>, o nome do seu perfil.</span>
    </div>`;
}

function blocoDeAceite(idDoCampo) {
  return `
    <div class="cenaculo-regras-caixa">
      <p class="cenaculo-regras-titulo">Regras dos Cenáculos</p>
      ${REGRAS_DOS_CENACULOS}
    </div>
    <label class="perfil-consentimento cenaculo-aceite">
      <input type="checkbox" id="${idDoCampo}">
      <span>Declaro que tenho 18 anos ou mais e aceito as Regras dos Cenáculos e a <button type="button" class="cenaculo-link-privacidade">Política de Privacidade</button>.</span>
    </label>`;
}

function ligarLinkDaPrivacidade(lugar) {
  lugar.querySelectorAll('.cenaculo-link-privacidade').forEach((botao) => {
    botao.addEventListener('click', (evento) => {
      evento.preventDefault();
      fecharJanelaDoCenaculo();
      if (typeof abrirPrivacidade === 'function') abrirPrivacidade();
    });
  });
}

async function abrirCriacaoDeCenaculo() {
  const perfil = perfilAdultoAtivo();
  if (!perfil || !(await garantirAceite())) return;
  const corpo = janelaDoCenaculo('Criar cenáculo', `
    ${blocoDoParticipante()}
    <label class="perfil-editor-rotulo" for="cenaculo-novo-nome">Nome do cenáculo</label>
    <input type="text" id="cenaculo-novo-nome" class="perfil-editor-campo" maxlength="60" placeholder="Ex.: Grupo de oração da paróquia" autocomplete="off">
    <label class="perfil-editor-rotulo" for="cenaculo-novo-descricao">Sobre o grupo (opcional)</label>
    <textarea id="cenaculo-novo-descricao" class="perfil-editor-campo cenaculo-area" maxlength="300" rows="2" placeholder="Ex.: Terço toda quinta, às 20h"></textarea>
    <button type="button" class="licao-botao" id="cenaculo-novo-salvar">Criar cenáculo</button>
    <p class="auth-feedback" id="cenaculo-novo-aviso" aria-live="polite"></p>`);
  ligarLinkDaPrivacidade(corpo);
  corpo.querySelector('#cenaculo-novo-salvar').addEventListener('click', async () => {
    const aviso = corpo.querySelector('#cenaculo-novo-aviso');
    const nome = corpo.querySelector('#cenaculo-novo-nome').value.trim();
    const descricao = corpo.querySelector('#cenaculo-novo-descricao').value.trim();
    if (nome.length < 2) { aviso.textContent = 'Escreva um nome com pelo menos 2 letras.'; return; }
    const botao = corpo.querySelector('#cenaculo-novo-salvar');
    botao.disabled = true;
    aviso.textContent = 'Criando...';
    try {
      const criado = await chamarCenaculo('cenaculo_criar', { _pid: perfil.id, _nome: nome, _descricao: descricao, _aceito: true });
      fecharJanelaDoCenaculo();
      await abrirConversa(criado.id);
      mostrarConvite(criado.codigo, true);
    } catch (erro) {
      aviso.textContent = mensagemDoCenaculo(erro);
      botao.disabled = false;
    }
  });
}

function codigoDoConvite(texto) {
  const valor = String(texto || '').trim();
  const doLink = valor.match(/[?&]cenaculo=([a-z0-9]+)/i);
  if (doLink) return doLink[1].toLowerCase();
  return /^[a-z0-9]{6,20}$/i.test(valor) ? valor.toLowerCase() : '';
}

async function abrirEntradaPorConvite(codigoInicial) {
  const perfil = perfilAdultoAtivo();
  if (!perfil || !(await garantirAceite())) return;
  const corpo = janelaDoCenaculo('Entrar com convite', `
    <div id="cenaculo-convite-passo1">
      <label class="perfil-editor-rotulo" for="cenaculo-convite-campo">Cole aqui o link ou o código do convite</label>
      <input type="text" id="cenaculo-convite-campo" class="perfil-editor-campo" autocomplete="off" placeholder="https://luminasancti.com/?cenaculo=...">
      <button type="button" class="licao-botao" id="cenaculo-convite-continuar">Continuar</button>
    </div>
    <div id="cenaculo-convite-passo2" hidden></div>
    <p class="auth-feedback" id="cenaculo-convite-aviso" aria-live="polite"></p>`);
  const aviso = corpo.querySelector('#cenaculo-convite-aviso');
  const campo = corpo.querySelector('#cenaculo-convite-campo');

  const mostrarPrevia = async (codigo) => {
    aviso.textContent = 'Procurando o cenáculo...';
    try {
      const previa = await chamarCenaculo('cenaculo_previa', { _codigo: codigo });
      if (!previa) { aviso.textContent = ERROS_DO_CENACULO.convite_invalido; return; }
      aviso.textContent = '';
      corpo.querySelector('#cenaculo-convite-passo1').hidden = true;
      const passo2 = corpo.querySelector('#cenaculo-convite-passo2');
      passo2.hidden = false;
      passo2.innerHTML = `
        <div class="cenaculo-previa">
          <span class="cenaculo-cartao-icone">${iconeDoCenaculo('usuarios')}</span>
          <div>
            <strong>${escaparTexto(previa.nome)}</strong>
            ${previa.descricao ? `<p>${escaparTexto(previa.descricao)}</p>` : ''}
            <small>${previa.membros} ${previa.membros === 1 ? 'pessoa participa' : 'pessoas participam'}</small>
          </div>
        </div>
        ${blocoDoParticipante()}
        <button type="button" class="licao-botao" id="cenaculo-convite-entrar">Entrar no cenáculo</button>`;
      passo2.querySelector('#cenaculo-convite-entrar').addEventListener('click', async () => {
        const botao = passo2.querySelector('#cenaculo-convite-entrar');
        botao.disabled = true;
        aviso.textContent = 'Entrando...';
        try {
          const entrou = await chamarCenaculo('cenaculo_entrar', { _pid: perfil.id, _codigo: codigo, _aceito: true });
          fecharJanelaDoCenaculo();
          abrirConversa(entrou.id);
        } catch (erro) {
          aviso.textContent = mensagemDoCenaculo(erro);
          botao.disabled = false;
        }
      });
    } catch (erro) {
      aviso.textContent = mensagemDoCenaculo(erro);
    }
  };

  corpo.querySelector('#cenaculo-convite-continuar').addEventListener('click', () => {
    const codigo = codigoDoConvite(campo.value);
    if (!codigo) { aviso.textContent = 'Esse link ou código não parece um convite de cenáculo.'; return; }
    mostrarPrevia(codigo);
  });
  if (codigoInicial) {
    campo.value = codigoInicial;
    mostrarPrevia(codigoInicial);
  }
}

function linkDoConvite(codigo) {
  return `${window.location.origin}/?cenaculo=${codigo}`;
}

function mostrarConvite(codigo, acabouDeCriar) {
  if (!codigo) return;
  const link = linkDoConvite(codigo);
  const corpo = janelaDoCenaculo(acabouDeCriar ? 'Cenáculo criado!' : 'Convidar pessoas', `
    <p class="cenaculo-explica">Mande este link para quem você quer no cenáculo. Quem tiver o link pode pedir para entrar, então mande só para quem você conhece.</p>
    <input type="text" class="perfil-editor-campo" id="cenaculo-convite-link" readonly value="${escaparTexto(link)}">
    <div class="cenaculo-botoes">
      <button type="button" class="licao-botao" id="cenaculo-convite-copiar">Copiar link</button>
      ${navigator.share ? '<button type="button" class="filter-btn" id="cenaculo-convite-compartilhar">Compartilhar</button>' : ''}
    </div>
    <button type="button" class="perfil-link" id="cenaculo-convite-novo">Gerar um link novo (o antigo para de funcionar)</button>
    <p class="auth-feedback" id="cenaculo-convite-feito" aria-live="polite"></p>`);
  const feito = corpo.querySelector('#cenaculo-convite-feito');
  corpo.querySelector('#cenaculo-convite-copiar').addEventListener('click', async () => {
    const campo = corpo.querySelector('#cenaculo-convite-link');
    try {
      await navigator.clipboard.writeText(campo.value);
    } catch (e) {
      campo.select();
      try { document.execCommand('copy'); } catch (e2) {  }
    }
    feito.textContent = 'Link copiado!';
  });
  const compartilhar = corpo.querySelector('#cenaculo-convite-compartilhar');
  if (compartilhar) {
    compartilhar.addEventListener('click', () => {
      navigator.share({ title: 'Cenáculo no Lumina Sancti', text: 'Venha participar do nosso cenáculo no Lumina Sancti:', url: corpo.querySelector('#cenaculo-convite-link').value }).catch(() => {});
    });
  }
  corpo.querySelector('#cenaculo-convite-novo').addEventListener('click', async () => {
    if (!cenaculoAberto || !perfilAdultoAtivo()) return;
    try {
      const novo = await chamarCenaculo('cenaculo_novo_convite', { _pid: perfilAdultoAtivo().id, _cid: cenaculoAberto.id });
      cenaculoAberto.codigo = novo;
      corpo.querySelector('#cenaculo-convite-link').value = linkDoConvite(novo);
      feito.textContent = 'Pronto! Só o link novo funciona agora.';
    } catch (erro) {
      feito.textContent = mensagemDoCenaculo(erro);
    }
  });
}

async function carregarFotosDosMembros() {
  fotosDosMembros = {};
  fotoDoGrupoUrl = '';
  const caminhoDoGrupo = cenaculoAberto && cenaculoAberto.tipo !== 'conversa' ? cenaculoAberto.foto : '';
  if (caminhoDoGrupo) {
    const enderecos = await enderecosAssinados('cenaculo-fotos', [caminhoDoGrupo]);
    fotoDoGrupoUrl = enderecos[caminhoDoGrupo] || '';
  }
  const comFoto = ((cenaculoAberto && cenaculoAberto.membros) || []).filter((m) => m.foto);
  if (comFoto.length === 0) return;
  try {
    const { data } = await supabaseCliente.storage.from('avatars').createSignedUrls(comFoto.map((m) => m.foto), 60 * 60);
    (data || []).forEach((item) => {
      const membro = comFoto.find((m) => m.foto === item.path);
      if (membro && item.signedUrl) fotosDosMembros[membro.perfil_id] = item.signedUrl;
    });
  } catch (e) {
  }
}

function membroDoCenaculo(idDoPerfil) {
  return ((cenaculoAberto && cenaculoAberto.membros) || []).find((m) => m.perfil_id === idDoPerfil) || null;
}

async function abrirConversa(idDoCenaculo) {
  const perfil = perfilAdultoAtivo();
  if (!perfil) return;
  if (paginaBloqueadaPelaSuspensao('view-cenaculo')) return;
  pararConversa();
  mensagensDoCenaculo = [];
  fotosDosMembros = {};
  cenaculoAberto = { id: idDoCenaculo, nome: '', membros: [], bloqueados: [] };
  fotoDoGrupoUrl = '';
  posicionarPainelDaLista();
  marcarSemConversa(false);
  marcarConversaAtivaNaLista();
  mudarDeView('view-cenaculo');
  if (telaGrande() && !ultimaListaDeCenaculos) carregarListaDeCenaculos();
  document.getElementById('cenaculo-nome').textContent = 'Carregando...';
  document.getElementById('cenaculo-membros-contagem').textContent = '';
  const fotoDoTopo = document.getElementById('cenaculo-topo-foto');
  if (fotoDoTopo) fotoDoTopo.innerHTML = '';
  document.getElementById('cenaculo-mensagens').innerHTML = '';
  aplicarFundo('padrao');
  atualizarBotaoDeEnviar();
  try {
    const [detalhes, mensagens] = await Promise.all([
      chamarCenaculo('cenaculo_detalhes', { _pid: perfil.id, _cid: idDoCenaculo }),
      chamarCenaculo('cenaculo_mensagens_lista', { _pid: perfil.id, _cid: idDoCenaculo, _antes: null, _limite: 50 }),
    ]);
    cenaculoAberto = detalhes;
    await carregarFotosDosMembros();
    mensagensDoCenaculo = (mensagens || []).map(normalizarMensagem);
    haMensagensMaisAntigas = mensagensDoCenaculo.length >= 50;
    renderizarCabecalhoDaConversa();
    renderizarMensagens(true);
    ouvirMensagensNovas();
  } catch (erro) {
    document.getElementById('cenaculo-nome').textContent = 'Cenáculo';
    document.getElementById('cenaculo-mensagens').innerHTML = `<p class="not-found-msg">${mensagemDoCenaculo(erro)}</p>`;
  }
}

function normalizarMensagem(m) {
  return {
    id: m.id,
    perfil_id: m.perfil_id,
    autor_nome: m.autor_nome,
    autor_avatar: m.autor_avatar,
    tipo: m.tipo,
    texto: m.texto,
    figurinha: m.figurinha,
    gif_id: m.gif_id || null,
    gif_figurinha: m.gif_figurinha === true,
    audio_caminho: m.audio_caminho || null,
    audio_segundos: m.audio_segundos || 0,
    criada_em: m.criada_em,
    apagada: m.apagada === true || !!m.apagada_em,
  };
}

function nomesParaOCabecalho() {
  const perfil = perfilAdultoAtivo();
  const nomes = ((cenaculoAberto && cenaculoAberto.membros) || [])
    .map((m) => (perfil && m.perfil_id === perfil.id ? tr('Você') : m.nome))
    .filter(Boolean);
  if (nomes.length <= 3) return nomes.join(', ');
  return tr('{nomes} e mais {n}', { nomes: nomes.slice(0, 3).join(', '), n: nomes.length - 3 });
}

function ehConversaADois() {
  return !!cenaculoAberto && cenaculoAberto.tipo === 'conversa';
}

function aplicarFundo(nome) {
  const lugar = document.getElementById('cenaculo-mensagens');
  if (!lugar) return;
  FUNDOS_DA_CONVERSA.forEach((f) => lugar.classList.remove(`fundo-${f.id}`));
  lugar.classList.remove('fundo-foto');
  lugar.style.removeProperty('--fundo-foto');
  const pessoal = typeof fundoPessoal === 'function' ? fundoPessoal() : null;
  if (pessoal && pessoal.foto && typeof enderecoDoFundoPessoal === 'function') {
    lugar.classList.add('fundo-foto');
    enderecoDoFundoPessoal(pessoal.foto).then((url) => {
      if (url && lugar.classList.contains('fundo-foto')) lugar.style.setProperty('--fundo-foto', `url("${url}")`);
    });
    return;
  }
  const preferido = pessoal && pessoal.pronto ? pessoal.pronto : nome;
  const escolhido = FUNDOS_DA_CONVERSA.some((f) => f.id === preferido) ? preferido : 'padrao';
  lugar.classList.add(`fundo-${escolhido}`);
}

function fotoDoTopoDaConversa() {
  if (ehConversaADois()) {
    const outro = cenaculoAberto.outro;
    return outro ? avatarDoCenaculo(outro.avatar, fotosDosMembros[outro.perfil_id], 'pequeno') : '';
  }
  if (fotoDoGrupoUrl) return `<span class="avatar avatar-pequeno"><img src="${escaparTexto(fotoDoGrupoUrl)}" alt=""></span>`;
  return `<span class="cenaculo-topo-icone">${iconeDoCenaculo('usuarios')}</span>`;
}

function renderizarCabecalhoDaConversa() {
  if (!cenaculoAberto) return;
  const conversa = ehConversaADois();
  document.getElementById('cenaculo-nome').textContent = conversa
    ? ((cenaculoAberto.outro && cenaculoAberto.outro.nome) || tr('Conversa'))
    : (cenaculoAberto.nome || tr('Cenáculo'));
  document.getElementById('cenaculo-membros-contagem').textContent = conversa ? 'toque aqui para ver o perfil' : nomesParaOCabecalho();
  const fotoDoTopo = document.getElementById('cenaculo-topo-foto');
  if (fotoDoTopo) fotoDoTopo.innerHTML = fotoDoTopoDaConversa();
  aplicarFundo(cenaculoAberto.fundo);
  const encontro = document.getElementById('cenaculo-encontro');
  if (cenaculoAberto.encontro) {
    encontro.hidden = false;
    encontro.innerHTML = `
      <span class="cenaculo-encontro-icone">${iconeDoCenaculo('video')}</span>
      <span class="cenaculo-encontro-textos">
        <strong translate="no">${escaparTexto(cenaculoAberto.encontro.titulo)}</strong>
        <small>${tr('{quando}, pelo Google Meet', { quando: formatarEncontro(cenaculoAberto.encontro.quando) })}</small>
      </span>
      <a class="cenaculo-encontro-entrar" href="${escaparTexto(cenaculoAberto.encontro.link)}" target="_blank" rel="noopener noreferrer">Entrar no Meet</a>`;
  } else {
    encontro.hidden = true;
    encontro.innerHTML = '';
  }
}

function mensagemVisivel(m) {
  return !(cenaculoAberto && (cenaculoAberto.bloqueados || []).includes(m.perfil_id));
}

function htmlDoAudio(m) {
  if (!m.audio_caminho) return '<em class="cenaculo-apagada">Áudio expirado (os áudios ficam guardados por 90 dias)</em>';
  const guardada = ondaGuardada(m.audio_caminho);
  const niveis = guardada || ondaProvisoria(m.audio_caminho);
  const perfil = perfilAdultoAtivo();
  const minha = !!perfil && m.perfil_id === perfil.id;
  const membro = membroDoCenaculo(m.perfil_id);
  const avatar = minha
    ? avatarDoCenaculo(perfil.avatar, perfil.fotoUrl, 'pequeno')
    : avatarDoCenaculo((membro && membro.avatar) || m.autor_avatar, fotosDosMembros[m.perfil_id], 'pequeno');
  return `
    <span class="cenaculo-audio${guardada ? ' onda-real' : ''}" data-caminho="${escaparTexto(m.audio_caminho)}" data-segundos="${m.audio_segundos}">
      <button type="button" class="cenaculo-audio-tocar" aria-label="Tocar ou pausar o áudio">${iconeDoCenaculo('tocar')}${iconeDoCenaculo('pausar')}</button>
      <span class="cenaculo-audio-meio">
        <span class="cenaculo-onda" role="slider" tabindex="0" aria-label="Posição do áudio" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0">${niveis.map((n) => `<i style="height:${alturaDaBarra(n)}%"></i>`).join('')}</span>
        <span class="cenaculo-audio-rodape">
          <span class="cenaculo-audio-tempo">${formatarDuracao(m.audio_segundos)}</span>
          <button type="button" class="cenaculo-audio-velocidade" aria-label="Mudar a velocidade do áudio">${textoDaVelocidade()}</button>
        </span>
      </span>
      <span class="cenaculo-audio-quem">${avatar}<span class="cenaculo-audio-selo">${iconeDoCenaculo('microfone')}</span></span>
    </span>`;
}

function corpoDaMensagem(m) {
  if (m.apagada) return '<em class="cenaculo-apagada">Mensagem apagada</em>';
  if (m.tipo === 'gif' && m.gif_id) return `<img class="cenaculo-gif${m.gif_figurinha ? ' figurinha' : ''}" src="${enderecoDoGif(m.gif_id)}" alt="${m.gif_figurinha ? 'Figurinha' : 'GIF'}" loading="lazy">`;
  if (m.tipo === 'audio') return htmlDoAudio(m);
  if (m.tipo === 'figurinha') return '<em class="cenaculo-apagada">Figurinha</em>';
  return `<span class="cenaculo-texto-msg" translate="no">${escaparTexto(m.texto)}</span>`;
}

function htmlDaMensagem(m, comecoDoGrupo) {
  const perfil = perfilAdultoAtivo();
  const minha = !!perfil && m.perfil_id === perfil.id;
  const semBalao = !m.apagada && m.tipo === 'gif' && m.gif_figurinha;
  const membro = membroDoCenaculo(m.perfil_id);
  const avatar = minha || ehConversaADois() ? '' : (comecoDoGrupo
    ? `<button type="button" class="cenaculo-msg-avatar" data-perfil="${escaparTexto(m.perfil_id || '')}" data-nome="${escaparTexto((membro && membro.nome) || m.autor_nome)}" aria-label="Ver quem mandou">${avatarDoCenaculo((membro && membro.avatar) || m.autor_avatar, fotosDosMembros[m.perfil_id], 'pequeno')}</button>`
    : '<span class="cenaculo-msg-avatar-vazio"></span>');
  return `
    <div class="cenaculo-msg${minha ? ' minha' : ''}${comecoDoGrupo ? ' comeco' : ''}${semBalao ? ' sem-balao' : ''}${m.tipo === 'gif' && !m.apagada ? ' com-gif' : ''}" data-id="${m.id}">
      ${avatar}
      <div class="cenaculo-balao${m.apagada ? ' apagada' : ''}"${m.apagada ? '' : ' role="button" tabindex="0"'}>
        ${corpoDaMensagem(m)}
        <span class="cenaculo-hora">${formatarHora(m.criada_em)}</span>
      </div>
    </div>`;
}

function renderizarMensagens(rolarParaOFim) {
  const lugar = document.getElementById('cenaculo-mensagens');
  if (!lugar) return;
  const pertoDoFim = lugar.scrollHeight - lugar.scrollTop - lugar.clientHeight < 120;
  const visiveis = mensagensDoCenaculo.filter(mensagemVisivel);
  let diaAnterior = '';
  let anterior = null;
  let html = haMensagensMaisAntigas ? '<button type="button" class="perfil-link cenaculo-mais-antigas" id="cenaculo-mais-antigas">Ver mensagens anteriores</button>' : '';
  if (visiveis.length === 0) {
    html += '<p class="cenaculo-sem-mensagens">Ainda não há mensagens. Que tal começar com uma saudação?</p>';
  }
  visiveis.forEach((m) => {
    const dia = formatarDia(m.criada_em);
    let comeco = true;
    if (dia !== diaAnterior) {
      html += `<p class="cenaculo-dia"><span>${dia}</span></p>`;
      diaAnterior = dia;
    } else if (anterior && anterior.perfil_id === m.perfil_id
      && (new Date(m.criada_em) - new Date(anterior.criada_em)) < MINUTOS_PARA_JUNTAR_MENSAGENS * 60000) {
      comeco = false;
    }
    html += htmlDaMensagem(m, comeco);
    anterior = m;
  });
  lugar.innerHTML = html;
  lugar.querySelectorAll('.cenaculo-msg').forEach((linha) => {
    const balao = linha.querySelector('.cenaculo-balao');
    if (balao && !balao.classList.contains('apagada')) {
      balao.addEventListener('click', (evento) => {
        if (evento.target.closest('.cenaculo-audio')) return;
        abrirAcoesDaMensagem(linha.dataset.id);
      });
      balao.addEventListener('keydown', (evento) => {
        if (evento.key === 'Enter') abrirAcoesDaMensagem(linha.dataset.id);
      });
    }
    const avatar = linha.querySelector('.cenaculo-msg-avatar');
    if (avatar) avatar.addEventListener('click', () => mostrarNomeDoAutor(avatar));
  });
  ligarPlayersDeAudio(lugar);
  const antigas = document.getElementById('cenaculo-mais-antigas');
  if (antigas) antigas.addEventListener('click', carregarMensagensAntigas);
  if (rolarParaOFim || pertoDoFim) lugar.scrollTop = lugar.scrollHeight;
}

function mostrarNomeDoAutor(botao) {
  document.querySelectorAll('.cenaculo-nome-flutuante').forEach((e) => e.remove());
  clearTimeout(temporizadorDoNome);
  const etiqueta = document.createElement('button');
  etiqueta.type = 'button';
  etiqueta.className = 'cenaculo-nome-flutuante';
  etiqueta.textContent = botao.dataset.nome || '';
  etiqueta.setAttribute('aria-label', tr('Ver o perfil de {nome}', { nome: botao.dataset.nome || '' }));
  const idDoPerfil = botao.dataset.perfil;
  etiqueta.addEventListener('click', (evento) => {
    evento.stopPropagation();
    etiqueta.remove();
    if (idDoPerfil && typeof abrirPerfilPublico === 'function') abrirPerfilPublico(idDoPerfil);
  });
  botao.parentElement.appendChild(etiqueta);
  temporizadorDoNome = setTimeout(() => etiqueta.remove(), 4000);
}

function tocarNoTituloDaConversa() {
  if (ehConversaADois()) {
    if (cenaculoAberto.outro && typeof abrirPerfilPublico === 'function') abrirPerfilPublico(cenaculoAberto.outro.perfil_id);
    return;
  }
  abrirMembros();
}

function enderecoGuardado(caminho) {
  const guardado = enderecosDosAudios[caminho];
  return guardado && guardado.vale > Date.now() ? guardado.url : '';
}

function guardarEndereco(caminho, url) {
  enderecosDosAudios[caminho] = { url, vale: Date.now() + 50 * 60 * 1000 };
}

async function enderecoDoAudio(caminho) {
  const guardado = enderecoGuardado(caminho);
  if (guardado) return guardado;
  const { data, error } = await supabaseCliente.storage.from(PASTA_DOS_AUDIOS).createSignedUrl(caminho, 60 * 60);
  if (error || !data || !data.signedUrl) throw error || new Error('sem_endereco');
  guardarEndereco(caminho, data.signedUrl);
  return data.signedUrl;
}

async function prepararEnderecosDosAudios(lugar) {
  const caminhos = Array.from(new Set(Array.from(lugar.querySelectorAll('.cenaculo-audio[data-caminho]'))
    .map((caixa) => caixa.dataset.caminho)
    .filter((caminho) => caminho && !enderecoGuardado(caminho))));
  if (caminhos.length === 0) return;
  try {
    const { data } = await supabaseCliente.storage.from(PASTA_DOS_AUDIOS).createSignedUrls(caminhos, 60 * 60);
    (data || []).forEach((item) => {
      if (item && item.path && item.signedUrl) guardarEndereco(item.path, item.signedUrl);
    });
  } catch (e) {
  }
}

function pararAudioTocando() {
  if (!audioTocando) return;
  audioTocando.elemento.pause();
  reiniciarVisualDoAudio(audioTocando.caixa);
  audioTocando = null;
}

function reiniciarVisualDoAudio(caixa) {
  if (!caixa) return;
  caixa.classList.remove('tocando', 'pausado');
  caixa.querySelectorAll('.cenaculo-onda i').forEach((barra) => barra.classList.remove('tocada'));
  const onda = caixa.querySelector('.cenaculo-onda');
  if (onda) onda.setAttribute('aria-valuenow', '0');
  const tempo = caixa.querySelector('.cenaculo-audio-tempo');
  if (tempo) tempo.textContent = formatarDuracao(Number(caixa.dataset.segundos) || 0);
}

function falhaAoTocar(caixa) {
  reiniciarVisualDoAudio(caixa);
  if (audioTocando && audioTocando.caixa === caixa) audioTocando = null;
  avisoDoCenaculo('Não foi possível tocar este áudio neste aparelho.');
}

function pintarProgressoDoAudio(caixa, proporcao) {
  const barras = caixa.querySelectorAll('.cenaculo-onda i');
  const limite = Math.round(Math.max(0, Math.min(1, proporcao)) * barras.length);
  barras.forEach((barra, indice) => barra.classList.toggle('tocada', indice < limite));
  const onda = caixa.querySelector('.cenaculo-onda');
  if (onda) onda.setAttribute('aria-valuenow', String(Math.round(proporcao * 100)));
}

function comecarAudio(caixa, url, proporcaoInicial) {
  const segundos = Number(caixa.dataset.segundos) || 0;
  const tempo = caixa.querySelector('.cenaculo-audio-tempo');
  const elemento = new Audio(url);
  elemento.playbackRate = velocidadeDosAudios;
  audioTocando = { elemento, caixa };
  caixa.classList.add('tocando');
  caixa.classList.remove('pausado');
  const duracao = () => (Number.isFinite(elemento.duration) && elemento.duration > 0 ? elemento.duration : segundos);
  if (proporcaoInicial > 0) {
    const pular = () => { try { elemento.currentTime = proporcaoInicial * duracao(); } catch (e) {  } };
    if (elemento.readyState >= 1) pular(); else elemento.addEventListener('loadedmetadata', pular, { once: true });
  }
  elemento.addEventListener('timeupdate', () => {
    const total = duracao();
    if (total > 0) pintarProgressoDoAudio(caixa, elemento.currentTime / total);
    tempo.textContent = formatarDuracao(elemento.currentTime);
  });
  elemento.addEventListener('ended', () => {
    if (audioTocando && audioTocando.caixa === caixa) audioTocando = null;
    reiniciarVisualDoAudio(caixa);
  });
  const tocando = elemento.play();
  if (tocando && tocando.catch) tocando.catch(() => falhaAoTocar(caixa));
}

function tocarOuPausarAudio(caixa, proporcao) {
  if (audioTocando && audioTocando.caixa === caixa) {
    const elemento = audioTocando.elemento;
    if (typeof proporcao === 'number') {
      const total = Number.isFinite(elemento.duration) && elemento.duration > 0 ? elemento.duration : Number(caixa.dataset.segundos) || 0;
      try { elemento.currentTime = proporcao * total; } catch (e) {  }
      pintarProgressoDoAudio(caixa, proporcao);
      if (!elemento.paused) return;
    }
    if (elemento.paused) {
      caixa.classList.add('tocando');
      caixa.classList.remove('pausado');
      const tocando = elemento.play();
      if (tocando && tocando.catch) tocando.catch(() => falhaAoTocar(caixa));
    } else {
      elemento.pause();
      caixa.classList.remove('tocando');
      caixa.classList.add('pausado');
    }
    return;
  }
  pararAudioTocando();
  const caminho = caixa.dataset.caminho;
  const inicio = typeof proporcao === 'number' ? proporcao : 0;
  const guardado = enderecoGuardado(caminho);
  if (guardado) {
    comecarAudio(caixa, guardado, inicio);
    return;
  }
  caixa.classList.add('tocando');
  enderecoDoAudio(caminho)
    .then((url) => comecarAudio(caixa, url, inicio))
    .catch(() => falhaAoTocar(caixa));
}

function trocarVelocidadeDosAudios() {
  const ordem = [1, 1.5, 2];
  velocidadeDosAudios = ordem[(ordem.indexOf(velocidadeDosAudios) + 1) % ordem.length];
  document.querySelectorAll('.cenaculo-audio-velocidade').forEach((botao) => {
    botao.textContent = textoDaVelocidade();
  });
  if (audioTocando) audioTocando.elemento.playbackRate = velocidadeDosAudios;
}

function textoDaVelocidade() {
  return `${String(velocidadeDosAudios).replace('.', ',')}x`;
}

function ligarPlayersDeAudio(lugar) {
  lugar.querySelectorAll('.cenaculo-audio').forEach((caixa) => {
    const tocar = caixa.querySelector('.cenaculo-audio-tocar');
    if (tocar) {
      tocar.addEventListener('click', (evento) => {
        evento.stopPropagation();
        tocarOuPausarAudio(caixa);
      });
    }
    const onda = caixa.querySelector('.cenaculo-onda');
    if (onda) {
      onda.addEventListener('click', (evento) => {
        evento.stopPropagation();
        const retangulo = onda.getBoundingClientRect();
        if (!retangulo.width) return;
        tocarOuPausarAudio(caixa, Math.max(0, Math.min(1, (evento.clientX - retangulo.left) / retangulo.width)));
      });
    }
    const velocidade = caixa.querySelector('.cenaculo-audio-velocidade');
    if (velocidade) {
      velocidade.textContent = textoDaVelocidade();
      velocidade.addEventListener('click', (evento) => {
        evento.stopPropagation();
        trocarVelocidadeDosAudios();
      });
    }
  });
  prepararEnderecosDosAudios(lugar).then(() => desenharOndasReais(lugar));
}

function ondasGuardadas() {
  if (ondasEmMemoria) return ondasEmMemoria;
  try { ondasEmMemoria = JSON.parse(localStorage.getItem(CHAVE_DAS_ONDAS) || '{}') || {}; } catch (e) { ondasEmMemoria = {}; }
  return ondasEmMemoria;
}

function guardarOnda(caminho, niveis) {
  const todas = ondasGuardadas();
  todas[caminho] = niveis.map((n) => String.fromCharCode(97 + Math.round(Math.max(0, Math.min(1, n)) * 25))).join('');
  const chaves = Object.keys(todas);
  if (chaves.length > 400) chaves.slice(0, chaves.length - 400).forEach((c) => { delete todas[c]; });
  try { localStorage.setItem(CHAVE_DAS_ONDAS, JSON.stringify(todas)); } catch (e) {  }
}

function ondaGuardada(caminho) {
  const texto = ondasGuardadas()[caminho];
  if (!texto || texto.length !== BARRAS_DA_ONDA) return null;
  return Array.from(texto).map((letra) => (letra.charCodeAt(0) - 97) / 25);
}

function ondaProvisoria(caminho) {
  let semente = 0;
  for (let i = 0; i < caminho.length; i += 1) semente = (semente * 31 + caminho.charCodeAt(i)) >>> 0;
  const niveis = [];
  for (let i = 0; i < BARRAS_DA_ONDA; i += 1) {
    semente = (semente * 1103515245 + 12345) >>> 0;
    const aleatorio = (semente >>> 8) / 16777216;
    const curva = 0.45 + 0.35 * Math.sin((i / BARRAS_DA_ONDA) * Math.PI * 3 + (semente % 7));
    niveis.push(Math.max(0.12, Math.min(1, curva * 0.7 + aleatorio * 0.45)));
  }
  return niveis;
}

function reduzirNiveis(valores, quantidade) {
  if (!valores.length) return new Array(quantidade).fill(0);
  if (valores.length < quantidade) {
    const esticados = [];
    for (let i = 0; i < quantidade; i += 1) {
      const posicao = valores.length === 1 ? 0 : (i * (valores.length - 1)) / (quantidade - 1);
      const antes = Math.floor(posicao);
      const depois = Math.min(valores.length - 1, antes + 1);
      const fracao = posicao - antes;
      esticados.push(valores[antes] * (1 - fracao) + valores[depois] * fracao);
    }
    const maiorEsticado = Math.max(...esticados);
    return esticados.map((v) => (maiorEsticado > 0 ? Math.sqrt(v / maiorEsticado) : 0));
  }
  const resultado = [];
  for (let i = 0; i < quantidade; i += 1) {
    const inicio = Math.floor((i * valores.length) / quantidade);
    const fim = Math.max(inicio + 1, Math.floor(((i + 1) * valores.length) / quantidade));
    let soma = 0;
    for (let j = inicio; j < fim; j += 1) soma += valores[Math.min(j, valores.length - 1)];
    resultado.push(soma / (fim - inicio));
  }
  const maior = Math.max(...resultado);
  return resultado.map((v) => (maior > 0 ? Math.sqrt(v / maior) : 0));
}

function alturaDaBarra(nivel) {
  return Math.round(14 + Math.max(0, Math.min(1, nivel)) * 86);
}

function aplicarOndaNaTela(caminho, niveis) {
  document.querySelectorAll('.cenaculo-audio').forEach((caixa) => {
    if (caixa.dataset.caminho !== caminho) return;
    caixa.querySelectorAll('.cenaculo-onda i').forEach((barra, indice) => {
      barra.style.height = `${alturaDaBarra(niveis[indice] || 0)}%`;
    });
    caixa.classList.add('onda-real');
  });
}

async function calcularOndaReal(caminho) {
  const Contexto = window.OfflineAudioContext || window.webkitOfflineAudioContext;
  if (!Contexto) return null;
  const url = await enderecoDoAudio(caminho);
  const resposta = await fetch(url);
  if (!resposta.ok) return null;
  const dados = await resposta.arrayBuffer();
  const contexto = new Contexto(1, 1, 44100);
  const som = await new Promise((resolver, rejeitar) => {
    const promessa = contexto.decodeAudioData(dados, resolver, rejeitar);
    if (promessa && promessa.then) promessa.then(resolver, rejeitar);
  });
  const canal = som.getChannelData(0);
  const pedacos = BARRAS_DA_ONDA * 4;
  const tamanho = Math.max(1, Math.floor(canal.length / pedacos));
  const forcas = [];
  for (let p = 0; p < pedacos; p += 1) {
    let soma = 0;
    const inicio = p * tamanho;
    for (let i = inicio; i < Math.min(canal.length, inicio + tamanho); i += 1) soma += canal[i] * canal[i];
    forcas.push(Math.sqrt(soma / tamanho));
  }
  return reduzirNiveis(forcas, BARRAS_DA_ONDA);
}

async function desenharOndasReais(lugar) {
  const caminhos = Array.from(new Set(Array.from(lugar.querySelectorAll('.cenaculo-audio:not(.onda-real)[data-caminho]')).map((c) => c.dataset.caminho)));
  for (const caminho of caminhos) {
    if (ondasEmCalculo.has(caminho) || ondasQueFalharam.has(caminho)) continue;
    ondasEmCalculo.add(caminho);
    try {
      const niveis = await calcularOndaReal(caminho);
      if (niveis) {
        guardarOnda(caminho, niveis);
        aplicarOndaNaTela(caminho, niveis);
      } else {
        ondasQueFalharam.add(caminho);
      }
    } catch (e) {
      ondasQueFalharam.add(caminho);
    }
    ondasEmCalculo.delete(caminho);
  }
}

async function carregarMensagensAntigas() {
  const perfil = perfilAdultoAtivo();
  if (!perfil || !cenaculoAberto || mensagensDoCenaculo.length === 0) return;
  const lugar = document.getElementById('cenaculo-mensagens');
  const alturaAntes = lugar.scrollHeight;
  try {
    const antigas = await chamarCenaculo('cenaculo_mensagens_lista', { _pid: perfil.id, _cid: cenaculoAberto.id, _antes: mensagensDoCenaculo[0].criada_em, _limite: 50 });
    const novas = (antigas || []).map(normalizarMensagem).filter((m) => !mensagensDoCenaculo.some((x) => x.id === m.id));
    haMensagensMaisAntigas = (antigas || []).length >= 50;
    mensagensDoCenaculo = novas.concat(mensagensDoCenaculo);
    renderizarMensagens(false);
    lugar.scrollTop = lugar.scrollHeight - alturaAntes;
  } catch (erro) {
    avisoDoCenaculo(mensagemDoCenaculo(erro));
  }
}

function juntarMensagem(bruta) {
  const m = normalizarMensagem(bruta);
  const indice = mensagensDoCenaculo.findIndex((x) => x.id === m.id);
  if (indice >= 0) mensagensDoCenaculo[indice] = Object.assign(mensagensDoCenaculo[indice], m);
  else {
    mensagensDoCenaculo.push(m);
    mensagensDoCenaculo.sort((a, b) => String(a.criada_em).localeCompare(String(b.criada_em)));
  }
}

function ouvirMensagensNovas() {
  const idDoCenaculo = cenaculoAberto && cenaculoAberto.id;
  if (!idDoCenaculo) return;
  try {
    if (supabaseCliente.channel) {
      canalDoCenaculo = supabaseCliente
        .channel(`cenaculo-${idDoCenaculo}`)
        .on('postgres_changes', { event: '*', schema: 'public', table: 'cenaculo_mensagens', filter: `cenaculo_id=eq.${idDoCenaculo}` }, (mudanca) => {
          if (!cenaculoAberto || cenaculoAberto.id !== idDoCenaculo || !mudanca.new || !mudanca.new.id) return;
          const nova = !mensagensDoCenaculo.some((m) => m.id === mudanca.new.id);
          juntarMensagem(mudanca.new);
          agendarAtualizacaoDaLista();
          renderizarMensagens(false);
          if (nova && !membroDoCenaculo(mudanca.new.perfil_id)) recarregarMembros();
        })
        .subscribe();
    }
  } catch (e) {
    canalDoCenaculo = null;
  }
  temporizadorDoCenaculo = setInterval(() => {
    if (!document.hidden) buscarMensagensRecentes();
  }, 20000);
}

async function recarregarMembros() {
  const perfil = perfilAdultoAtivo();
  if (!perfil || !cenaculoAberto) return;
  try {
    const detalhes = await chamarCenaculo('cenaculo_detalhes', { _pid: perfil.id, _cid: cenaculoAberto.id });
    cenaculoAberto = Object.assign(cenaculoAberto, detalhes);
    await carregarFotosDosMembros();
    renderizarCabecalhoDaConversa();
    renderizarMensagens(false);
  } catch (e) {
  }
}

async function buscarMensagensRecentes() {
  const perfil = perfilAdultoAtivo();
  const tela = document.getElementById('view-cenaculo');
  if (!perfil || !cenaculoAberto || !tela || !tela.classList.contains('active')) return;
  try {
    const recentes = await chamarCenaculo('cenaculo_mensagens_lista', { _pid: perfil.id, _cid: cenaculoAberto.id, _antes: null, _limite: 50 });
    const antes = JSON.stringify(mensagensDoCenaculo);
    (recentes || []).forEach(juntarMensagem);
    if (JSON.stringify(mensagensDoCenaculo) !== antes) {
      renderizarMensagens(false);
      agendarAtualizacaoDaLista();
    }
  } catch (e) {
  }
}

function pararConversa() {
  if (canalDoCenaculo && supabaseCliente && supabaseCliente.removeChannel) {
    try { supabaseCliente.removeChannel(canalDoCenaculo); } catch (e) {  }
  }
  canalDoCenaculo = null;
  clearInterval(temporizadorDoCenaculo);
  temporizadorDoCenaculo = null;
  pararAudioTocando();
  if (gravacaoDeAudio) pararGravacao(false);
  fecharPaineisDoCenaculo();
}

async function enviarAoCenaculo(tipo, conteudo) {
  const perfil = perfilAdultoAtivo();
  if (!perfil || !cenaculoAberto) return false;
  const argumentos = { _pid: perfil.id, _cid: cenaculoAberto.id, _tipo: tipo };
  const local = { perfil_id: perfil.id, autor_nome: perfil.nome, autor_avatar: perfil.avatar, tipo, apagada: false };
  if (tipo === 'texto') {
    argumentos._texto = conteudo;
    local.texto = conteudo;
  } else if (tipo === 'gif') {
    argumentos._gif_id = conteudo.id;
    argumentos._gif_figurinha = !!conteudo.figurinha;
    local.gif_id = conteudo.id;
    local.gif_figurinha = !!conteudo.figurinha;
  } else if (tipo === 'audio') {
    argumentos._audio_caminho = conteudo.caminho;
    argumentos._audio_segundos = conteudo.segundos;
    local.audio_caminho = conteudo.caminho;
    local.audio_segundos = conteudo.segundos;
  }
  try {
    const enviada = await chamarCenaculo('cenaculo_enviar', argumentos);
    juntarMensagem(Object.assign(local, { id: enviada.id, criada_em: enviada.criada_em }));
    renderizarMensagens(true);
    agendarAtualizacaoDaLista();
    return true;
  } catch (erro) {
    avisoDoCenaculo(mensagemDoCenaculo(erro));
    return false;
  }
}

function fecharPaineisDoCenaculo() {
  ['cenaculo-painel-emojis', 'cenaculo-painel-gifs'].forEach((id) => {
    const painel = document.getElementById(id);
    if (painel) painel.hidden = true;
  });
}

function alternarPainel(id) {
  const painel = document.getElementById(id);
  if (!painel) return false;
  const abrir = painel.hidden;
  fecharPaineisDoCenaculo();
  painel.hidden = !abrir;
  return abrir;
}

function inserirNoCampo(texto) {
  const campo = document.getElementById('cenaculo-texto');
  if (!campo) return;
  const inicio = campo.selectionStart != null ? campo.selectionStart : campo.value.length;
  const fim = campo.selectionEnd != null ? campo.selectionEnd : campo.value.length;
  campo.value = campo.value.slice(0, inicio) + texto + campo.value.slice(fim);
  const posicao = inicio + texto.length;
  try { campo.setSelectionRange(posicao, posicao); } catch (e) {  }
  ajustarAlturaDoCampo();
  atualizarBotaoDeEnviar();
}

function prepararSeletorDeEmojis() {
  if (seletorDeEmojisPronto) return seletorDeEmojisPronto;
  const painel = document.getElementById('cenaculo-painel-emojis');
  const base = `https://cdn.jsdelivr.net/npm/emoji-picker-element@${VERSAO_DO_SELETOR_DE_EMOJIS}`;
  painel.innerHTML = '<p class="cenaculo-painel-aviso">Carregando emojis...</p>';
  seletorDeEmojisPronto = Promise.all([import(`${base}/index.js`), import(`${base}/i18n/pt_BR.js`)])
    .then(([modulo, traducao]) => {
      const seletor = new modulo.Picker({
        locale: 'pt',
        dataSource: `https://cdn.jsdelivr.net/npm/emoji-picker-element-data@${VERSAO_DOS_DADOS_DE_EMOJIS}/pt/cldr-native/data.json`,
        i18n: traducao.default,
      });
      seletor.classList.add('dark');
      seletor.addEventListener('emoji-click', (evento) => {
        if (evento.detail && evento.detail.unicode) inserirNoCampo(evento.detail.unicode);
      });
      painel.innerHTML = '';
      painel.appendChild(seletor);
    })
    .catch(() => {
      seletorDeEmojisPronto = null;
      painel.innerHTML = '<p class="cenaculo-painel-aviso">Não foi possível carregar os emojis agora. Use os emojis do teclado do seu celular.</p>';
    });
  return seletorDeEmojisPronto;
}

function abrirPainelDeEmojis() {
  if (alternarPainel('cenaculo-painel-emojis')) prepararSeletorDeEmojis();
}

function abrirPainelDeGifs() {
  if (alternarPainel('cenaculo-painel-gifs')) buscarNoGiphy();
}

async function buscarNoGiphy() {
  const grade = document.getElementById('cenaculo-gifs-grade');
  if (!grade) return;
  if (!CHAVE_DO_GIPHY) {
    grade.innerHTML = '<p class="cenaculo-painel-aviso">Os GIFs e as figurinhas chegam em breve.</p>';
    return;
  }
  const campo = document.getElementById('cenaculo-gifs-busca');
  const termo = campo ? campo.value.trim() : '';
  const tipo = abaDoGiphy === 'figurinhas' ? 'stickers' : 'gifs';
  const parametros = new URLSearchParams({ api_key: CHAVE_DO_GIPHY, limit: '24', rating: 'g' });
  if (termo) {
    parametros.set('q', termo);
    parametros.set('lang', 'pt');
  }
  grade.innerHTML = '<p class="cenaculo-painel-aviso">Carregando...</p>';
  try {
    const resposta = await fetch(`https://api.giphy.com/v1/${tipo}/${termo ? 'search' : 'trending'}?${parametros}`);
    if (!resposta.ok) throw new Error('giphy');
    const dados = await resposta.json();
    const itens = (dados && dados.data) || [];
    if (itens.length === 0) {
      grade.innerHTML = '<p class="cenaculo-painel-aviso">Nada encontrado. Tente outra palavra.</p>';
      return;
    }
    grade.innerHTML = itens.map((item) => {
      const imagens = item.images || {};
      const previa = (imagens.fixed_width_small && (imagens.fixed_width_small.webp || imagens.fixed_width_small.url))
        || (imagens.fixed_width && (imagens.fixed_width.webp || imagens.fixed_width.url)) || '';
      if (!/^[A-Za-z0-9]{3,60}$/.test(String(item.id || '')) || !/^https:\/\/[a-z0-9.-]*giphy\.com\//.test(previa)) return '';
      return `<button type="button" class="cenaculo-gif-opcao${tipo === 'stickers' ? ' figurinha' : ''}" data-gif="${item.id}" aria-label="${escaparTexto(item.title || 'GIF')}"><img src="${escaparTexto(previa)}" alt="" loading="lazy"></button>`;
    }).join('');
    grade.querySelectorAll('.cenaculo-gif-opcao').forEach((botao) => {
      botao.addEventListener('click', async () => {
        fecharPaineisDoCenaculo();
        await enviarAoCenaculo('gif', { id: botao.dataset.gif, figurinha: abaDoGiphy === 'figurinhas' });
      });
    });
  } catch (e) {
    grade.innerHTML = '<p class="cenaculo-painel-aviso">Não foi possível buscar agora. Tente de novo em instantes.</p>';
  }
}

function ajustarAlturaDoCampo() {
  const campo = document.getElementById('cenaculo-texto');
  if (!campo) return;
  campo.style.height = 'auto';
  campo.style.height = `${Math.min(campo.scrollHeight, 140)}px`;
}

function atualizarBotaoDeEnviar() {
  const campo = document.getElementById('cenaculo-texto');
  const enviar = document.getElementById('cenaculo-enviar-btn');
  const microfone = document.getElementById('cenaculo-microfone-btn');
  if (!campo || !enviar || !microfone) return;
  const temTexto = campo.value.trim().length > 0;
  enviar.hidden = !temTexto;
  microfone.hidden = temTexto;
}

async function enviarTextoDoCampo() {
  const campo = document.getElementById('cenaculo-texto');
  const texto = campo.value.trim();
  if (!texto) return;
  const botao = document.getElementById('cenaculo-enviar-btn');
  botao.disabled = true;
  const foi = await enviarAoCenaculo('texto', texto);
  botao.disabled = false;
  if (foi) {
    campo.value = '';
    ajustarAlturaDoCampo();
    atualizarBotaoDeEnviar();
    fecharPaineisDoCenaculo();
  }
  campo.focus();
}

function formatoDeGravacao() {
  if (typeof MediaRecorder === 'undefined') return null;
  const opcoes = ['audio/mp4;codecs=mp4a.40.2', 'audio/webm;codecs=opus', 'audio/webm', 'audio/mp4', 'audio/ogg;codecs=opus'];
  const suporta = (tipo) => { try { return MediaRecorder.isTypeSupported(tipo); } catch (e) { return false; } };
  return opcoes.find(suporta) || '';
}

function extensaoDoAudio(tipo) {
  if (tipo.includes('mp4')) return 'm4a';
  if (tipo.includes('ogg')) return 'ogg';
  return 'webm';
}

function mostrarBarraDeGravacao(mostrar) {
  const barra = document.getElementById('cenaculo-gravando');
  const formulario = document.getElementById('cenaculo-escrever');
  if (barra) barra.hidden = !mostrar;
  if (formulario) formulario.hidden = mostrar;
}

function mostrarGravacaoSegurando(mostrar) {
  const faixa = document.getElementById('cenaculo-segurando');
  const caixa = document.querySelector('#cenaculo-escrever .cenaculo-caixa');
  const trava = document.getElementById('cenaculo-trava');
  const microfone = document.getElementById('cenaculo-microfone-btn');
  const deslize = document.getElementById('cenaculo-deslize');
  if (faixa) faixa.hidden = !mostrar;
  if (caixa) caixa.hidden = mostrar;
  if (trava) {
    trava.hidden = !mostrar;
    trava.style.transform = '';
  }
  if (microfone) {
    microfone.classList.toggle('segurando', mostrar);
    microfone.style.transform = '';
  }
  if (deslize) {
    deslize.style.transform = '';
    deslize.style.opacity = '';
  }
}

function esconderTodaGravacao() {
  mostrarGravacaoSegurando(false);
  mostrarBarraDeGravacao(false);
  const onda = document.getElementById('cenaculo-gravando-onda');
  if (onda) onda.innerHTML = '';
}

function vibrar(ms) {
  try { if (navigator.vibrate) navigator.vibrate(ms); } catch (e) {  }
}

function medirNivelDaVoz(gravacao) {
  if (gravacao.analisador) {
    const amostras = new Uint8Array(gravacao.analisador.fftSize);
    gravacao.analisador.getByteTimeDomainData(amostras);
    let soma = 0;
    for (let i = 0; i < amostras.length; i += 1) {
      const v = (amostras[i] - 128) / 128;
      soma += v * v;
    }
    return Math.min(1, Math.sqrt(soma / amostras.length) * 3.2);
  }
  const t = (Date.now() - gravacao.inicio) / 1000;
  return Math.max(0.08, Math.min(1, 0.35 + 0.3 * Math.sin(t * 5.3) * Math.sin(t * 1.7) + Math.random() * 0.3));
}

function desenharOndaAoVivo(gravacao) {
  const onda = document.getElementById('cenaculo-gravando-onda');
  if (!onda || onda.offsetParent === null) return;
  const ultimos = gravacao.niveis.slice(-BARRAS_AO_VIVO);
  while (ultimos.length < BARRAS_AO_VIVO) ultimos.unshift(0);
  onda.innerHTML = ultimos.map((n) => `<i style="height:${alturaDaBarra(n)}%"></i>`).join('');
}

function prepararAnalisador(gravacao) {
  try {
    const Contexto = window.AudioContext || window.webkitAudioContext;
    if (!Contexto) return;
    gravacao.contexto = new Contexto();
    const fonte = gravacao.contexto.createMediaStreamSource(gravacao.fluxo);
    gravacao.analisador = gravacao.contexto.createAnalyser();
    gravacao.analisador.fftSize = 1024;
    fonte.connect(gravacao.analisador);
  } catch (e) {
    gravacao.analisador = null;
    if (gravacao.contexto) { try { gravacao.contexto.close(); } catch (e2) {  } }
    gravacao.contexto = null;
  }
}

async function comecarGravacao(modo) {
  const jeito = modo === 'segurando' ? 'segurando' : 'travado';
  if (gravacaoDeAudio || gravacaoIniciando || !cenaculoAberto) return;
  const formato = formatoDeGravacao();
  if (formato === null || !navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    avisoDoCenaculo('Este aparelho não consegue gravar áudio pelo site.');
    return;
  }
  const toque = toqueNoMicrofone;
  gravacaoIniciando = true;
  let fluxo;
  try {
    fluxo = await navigator.mediaDevices.getUserMedia({ audio: true });
  } catch (e) {
    gravacaoIniciando = false;
    avisoDoCenaculo('Para gravar, permita que o site use o microfone.');
    return;
  }
  gravacaoIniciando = false;
  if (jeito === 'segurando' && (!toqueNoMicrofone || toqueNoMicrofone !== toque)) {
    fluxo.getTracks().forEach((t) => t.stop());
    avisoDoCenaculo('Pronto! Agora toque e segure o microfone para gravar.');
    return;
  }
  let gravador;
  try {
    gravador = formato
      ? new MediaRecorder(fluxo, { mimeType: formato, audioBitsPerSecond: 64000 })
      : new MediaRecorder(fluxo, { audioBitsPerSecond: 64000 });
  } catch (e) {
    fluxo.getTracks().forEach((t) => t.stop());
    avisoDoCenaculo('Este aparelho não consegue gravar áudio pelo site.');
    return;
  }
  fecharPaineisDoCenaculo();
  pararAudioTocando();
  const gravacao = { gravador, fluxo, partes: [], inicio: Date.now(), enviar: false, temporizador: null, modo: jeito, niveis: [], analisador: null, contexto: null };
  gravacaoDeAudio = gravacao;
  prepararAnalisador(gravacao);
  gravador.addEventListener('dataavailable', (evento) => {
    if (evento.data && evento.data.size) gravacao.partes.push(evento.data);
  });
  gravador.addEventListener('stop', () => terminarGravacao(gravacao));
  gravador.start(250);
  ['cenaculo-gravando-tempo', 'cenaculo-segurando-tempo'].forEach((id) => {
    const tempo = document.getElementById(id);
    if (tempo) tempo.textContent = '0:00';
  });
  if (jeito === 'segurando') mostrarGravacaoSegurando(true);
  else mostrarBarraDeGravacao(true);
  vibrar(20);
  gravacao.temporizador = setInterval(() => {
    if (gravacaoDeAudio !== gravacao) return;
    const segundos = (Date.now() - gravacao.inicio) / 1000;
    ['cenaculo-gravando-tempo', 'cenaculo-segurando-tempo'].forEach((id) => {
      const tempo = document.getElementById(id);
      if (tempo) tempo.textContent = formatarDuracao(segundos);
    });
    gravacao.niveis.push(medirNivelDaVoz(gravacao));
    if (gravacao.modo === 'travado') desenharOndaAoVivo(gravacao);
    if (segundos >= SEGUNDOS_MAXIMOS_DE_AUDIO) pararGravacao(true);
  }, 100);
}

function travarGravacao() {
  if (!gravacaoDeAudio || gravacaoDeAudio.modo !== 'segurando') return;
  gravacaoDeAudio.modo = 'travado';
  toqueNoMicrofone = null;
  mostrarGravacaoSegurando(false);
  mostrarBarraDeGravacao(true);
  desenharOndaAoVivo(gravacaoDeAudio);
  vibrar(15);
}

function pararGravacao(enviar) {
  const gravacao = gravacaoDeAudio;
  if (!gravacao) return;
  gravacaoDeAudio = null;
  gravacao.enviar = enviar;
  clearInterval(gravacao.temporizador);
  esconderTodaGravacao();
  try {
    if (gravacao.gravador.state !== 'inactive') gravacao.gravador.stop();
    else terminarGravacao(gravacao);
  } catch (e) {
    terminarGravacao(gravacao);
  }
}

async function terminarGravacao(gravacao) {
  if (!gravacao || gravacao.terminada) return;
  gravacao.terminada = true;
  if (gravacaoDeAudio === gravacao) gravacaoDeAudio = null;
  esconderTodaGravacao();
  gravacao.fluxo.getTracks().forEach((t) => t.stop());
  if (gravacao.contexto) { try { gravacao.contexto.close(); } catch (e) {  } }
  const segundos = Math.min(SEGUNDOS_MAXIMOS_DE_AUDIO, Math.round((Date.now() - gravacao.inicio) / 1000));
  if (!gravacao.enviar) return;
  if (segundos < 1 || gravacao.partes.length === 0) {
    avisoDoCenaculo('O áudio ficou curto demais.');
    return;
  }
  if (!cenaculoAberto) return;
  const formato = (gravacao.gravador.mimeType || gravacao.partes[0].type || 'audio/webm').split(';')[0];
  const arquivo = new Blob(gravacao.partes, { type: formato });
  const nome = typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}`;
  const caminho = `${cenaculoAberto.id}/${nome}.${extensaoDoAudio(formato)}`;
  avisoDoCenaculo('Enviando áudio...');
  try {
    const { error } = await supabaseCliente.storage.from(PASTA_DOS_AUDIOS).upload(caminho, arquivo, { contentType: formato, upsert: false });
    if (error) throw error;
    guardarOnda(caminho, reduzirNiveis(gravacao.niveis, BARRAS_DA_ONDA));
    await enviarAoCenaculo('audio', { caminho, segundos: Math.max(1, segundos) });
  } catch (erro) {
    avisoDoCenaculo(ERROS_DO_CENACULO.audio_invalido);
  }
}

function ligarMicrofone() {
  const microfone = document.getElementById('cenaculo-microfone-btn');
  if (!microfone) return;
  let ultimoFoiDedo = false;
  microfone.addEventListener('pointerdown', (evento) => {
    if (evento.pointerType === 'mouse') { ultimoFoiDedo = false; return; }
    ultimoFoiDedo = true;
    evento.preventDefault();
    try { microfone.setPointerCapture(evento.pointerId); } catch (e) {  }
    toqueNoMicrofone = { id: evento.pointerId, x: evento.clientX, y: evento.clientY, quando: Date.now() };
    comecarGravacao('segurando');
  });
  microfone.addEventListener('pointermove', (evento) => {
    const toque = toqueNoMicrofone;
    if (!toque || evento.pointerId !== toque.id || !gravacaoDeAudio || gravacaoDeAudio.modo !== 'segurando') return;
    const paraOLado = Math.min(0, evento.clientX - toque.x);
    const paraCima = Math.max(0, toque.y - evento.clientY);
    const deslize = document.getElementById('cenaculo-deslize');
    const trava = document.getElementById('cenaculo-trava');
    if (deslize) {
      deslize.style.transform = `translateX(${Math.max(-DISTANCIA_PARA_CANCELAR, paraOLado)}px)`;
      deslize.style.opacity = String(Math.max(0.2, 1 + paraOLado / DISTANCIA_PARA_CANCELAR));
    }
    if (trava) trava.style.transform = `translateY(${-Math.min(DISTANCIA_PARA_TRAVAR, paraCima) * 0.5}px)`;
    microfone.style.transform = paraCima > Math.abs(paraOLado) ? `translateY(${-Math.min(DISTANCIA_PARA_TRAVAR, paraCima)}px)` : `translateX(${Math.max(-DISTANCIA_PARA_CANCELAR, paraOLado)}px)`;
    if (paraOLado <= -DISTANCIA_PARA_CANCELAR) {
      toqueNoMicrofone = null;
      vibrar(30);
      pararGravacao(false);
      avisoDoCenaculo('Áudio cancelado.');
    } else if (paraCima >= DISTANCIA_PARA_TRAVAR) {
      travarGravacao();
    }
  });
  const soltar = (evento) => {
    const toque = toqueNoMicrofone;
    if (!toque || evento.pointerId !== toque.id) return;
    toqueNoMicrofone = null;
    if (!gravacaoDeAudio || gravacaoDeAudio.modo !== 'segurando') return;
    if (Date.now() - gravacaoDeAudio.inicio < 700) {
      pararGravacao(false);
      avisoDoCenaculo('Segure o microfone para gravar e solte para enviar.');
      return;
    }
    pararGravacao(true);
  };
  microfone.addEventListener('pointerup', soltar);
  microfone.addEventListener('pointercancel', (evento) => {
    const toque = toqueNoMicrofone;
    if (!toque || evento.pointerId !== toque.id) return;
    if (gravacaoDeAudio && gravacaoDeAudio.modo === 'segurando') travarGravacao();
    toqueNoMicrofone = null;
  });
  microfone.addEventListener('contextmenu', (evento) => evento.preventDefault());
  microfone.addEventListener('click', (evento) => {
    if (ultimoFoiDedo) { ultimoFoiDedo = false; evento.preventDefault(); return; }
    comecarGravacao('travado');
  });
}

function abrirAcoesDaMensagem(idDaMensagem) {
  const perfil = perfilAdultoAtivo();
  const m = mensagensDoCenaculo.find((x) => x.id === idDaMensagem);
  if (!perfil || !m || m.apagada) return;
  const minha = m.perfil_id === perfil.id;
  const organizador = cenaculoAberto && cenaculoAberto.papel === 'organizador';
  const opcoes = [];
  if (minha || organizador) opcoes.push('<button type="button" class="cenaculo-opcao" data-acao="apagar">Apagar mensagem</button>');
  if (!minha) {
    opcoes.push('<button type="button" class="cenaculo-opcao" data-acao="denunciar">Denunciar mensagem</button>');
    opcoes.push(`<button type="button" class="cenaculo-opcao" data-acao="bloquear">${tr('Bloquear {nome}', { nome: escaparTexto(m.autor_nome) })}</button>`);
  }
  if (opcoes.length === 0) return;
  const corpo = janelaDoCenaculo(minha ? 'Sua mensagem' : tr('Mensagem de {nome}', { nome: m.autor_nome }), `<div class="cenaculo-opcoes">${opcoes.join('')}</div>`);
  corpo.querySelectorAll('.cenaculo-opcao').forEach((botao) => {
    botao.addEventListener('click', () => {
      const acao = botao.dataset.acao;
      if (acao === 'apagar') apagarMensagem(m);
      else if (acao === 'denunciar') abrirDenuncia(m);
      else if (acao === 'bloquear') confirmarBloqueio(m.perfil_id, m.autor_nome);
    });
  });
}

async function apagarMensagem(m) {
  const perfil = perfilAdultoAtivo();
  try {
    await chamarCenaculo('cenaculo_apagar_mensagem', { _pid: perfil.id, _mid: m.id });
    m.apagada = true;
    m.texto = null;
    m.gif_id = null;
    m.audio_caminho = null;
    fecharJanelaDoCenaculo();
    renderizarMensagens(false);
  } catch (erro) {
    avisoDoCenaculo(mensagemDoCenaculo(erro));
  }
}

function abrirDenuncia(m) {
  const corpo = janelaDoCenaculo('Denunciar mensagem', `
    <p class="cenaculo-explica">A equipe do Lumina Sancti vai analisar. A pessoa não fica sabendo quem denunciou.</p>
    <div class="cenaculo-motivos">
      ${MOTIVOS_DE_DENUNCIA.map((motivo, i) => `<label class="cenaculo-motivo"><input type="radio" name="cenaculo-motivo" value="${motivo}"${i === 0 ? ' checked' : ''}><span>${motivo}</span></label>`).join('')}
    </div>
    <textarea id="cenaculo-denuncia-detalhe" class="perfil-editor-campo cenaculo-area" maxlength="200" rows="2" placeholder="Quer contar mais alguma coisa? (opcional)"></textarea>
    <button type="button" class="licao-botao" id="cenaculo-denuncia-enviar">Enviar denúncia</button>
    <p class="auth-feedback" id="cenaculo-denuncia-aviso" aria-live="polite"></p>`);
  corpo.querySelector('#cenaculo-denuncia-enviar').addEventListener('click', async () => {
    const escolhido = corpo.querySelector('input[name="cenaculo-motivo"]:checked');
    const detalhe = corpo.querySelector('#cenaculo-denuncia-detalhe').value.trim();
    const motivo = `${escolhido ? escolhido.value : 'Outro motivo'}${detalhe ? ': ' + detalhe : ''}`;
    const aviso = corpo.querySelector('#cenaculo-denuncia-aviso');
    try {
      await chamarCenaculo('cenaculo_denunciar', { _pid: perfilAdultoAtivo().id, _mid: m.id, _motivo: motivo });
      corpo.innerHTML = `
        <p class="cenaculo-explica">Obrigado. A denúncia foi enviada para a equipe do Lumina Sancti.</p>
        <p class="cenaculo-explica">Se quiser parar de ver as mensagens dessa pessoa, você também pode bloqueá-la.</p>
        <div class="cenaculo-botoes">
          <button type="button" class="filter-btn" id="cenaculo-denuncia-bloquear">${tr('Bloquear {nome}', { nome: escaparTexto(m.autor_nome) })}</button>
          <button type="button" class="licao-botao" id="cenaculo-denuncia-ok">Pronto</button>
        </div>`;
      corpo.querySelector('#cenaculo-denuncia-ok').addEventListener('click', fecharJanelaDoCenaculo);
      corpo.querySelector('#cenaculo-denuncia-bloquear').addEventListener('click', () => confirmarBloqueio(m.perfil_id, m.autor_nome));
    } catch (erro) {
      aviso.textContent = mensagemDoCenaculo(erro);
    }
  });
}

function confirmarBloqueio(idDoPerfil, nome) {
  const corpo = janelaDoCenaculo(tr('Bloquear {nome}?', { nome }), `
    <p class="cenaculo-explica">${tr('Você não vai mais ver as mensagens de {nome} nos cenáculos. Dá para desbloquear depois, na lista de pessoas do cenáculo.', { nome: escaparTexto(nome) })}</p>
    <div class="cenaculo-botoes">
      <button type="button" class="filter-btn" id="cenaculo-bloqueio-cancelar">Cancelar</button>
      <button type="button" class="licao-botao" id="cenaculo-bloqueio-confirmar">Bloquear</button>
    </div>`);
  corpo.querySelector('#cenaculo-bloqueio-cancelar').addEventListener('click', fecharJanelaDoCenaculo);
  corpo.querySelector('#cenaculo-bloqueio-confirmar').addEventListener('click', () => mudarBloqueio(idDoPerfil, true));
}

async function mudarBloqueio(idDoPerfil, bloquear) {
  try {
    await chamarCenaculo('cenaculo_bloquear', { _pid: perfilAdultoAtivo().id, _alvo: idDoPerfil, _bloquear: bloquear });
    const lista = new Set(cenaculoAberto.bloqueados || []);
    if (bloquear) lista.add(idDoPerfil); else lista.delete(idDoPerfil);
    cenaculoAberto.bloqueados = Array.from(lista);
    fecharJanelaDoCenaculo();
    if (!bloquear) await buscarMensagensRecentes();
    renderizarMensagens(false);
  } catch (erro) {
    avisoDoCenaculo(mensagemDoCenaculo(erro));
  }
}

function abrirMenuDoCenaculo() {
  if (!cenaculoAberto) return;
  const conversa = ehConversaADois();
  const organizador = !conversa && cenaculoAberto.papel === 'organizador';
  const outro = conversa ? cenaculoAberto.outro : null;
  const bloqueado = !!outro && (cenaculoAberto.bloqueados || []).includes(outro.perfil_id);
  const opcoes = conversa ? [
    outro ? '<button type="button" class="cenaculo-opcao" data-acao="perfil">Ver perfil</button>' : '',
    '<button type="button" class="cenaculo-opcao" data-acao="fundo">Papel de parede</button>',
    outro ? `<button type="button" class="cenaculo-opcao" data-acao="${bloqueado ? 'desbloquear' : 'bloquear'}">${tr(bloqueado ? 'Desbloquear {nome}' : 'Bloquear {nome}', { nome: escaparTexto(outro.nome) })}</button>` : '',
    '<button type="button" class="cenaculo-opcao" data-acao="regras">Regras dos Cenáculos</button>',
    '<button type="button" class="cenaculo-opcao cenaculo-opcao-perigo" data-acao="sair">Apagar esta conversa da lista</button>',
  ] : [
    organizador ? '<button type="button" class="cenaculo-opcao" data-acao="convidar">Convidar pessoas</button>' : '',
    organizador ? '<button type="button" class="cenaculo-opcao" data-acao="encontro">Marcar encontro no Google Meet</button>' : '',
    organizador ? '<button type="button" class="cenaculo-opcao" data-acao="foto">Foto do grupo</button>' : '',
    '<button type="button" class="cenaculo-opcao" data-acao="fundo">Papel de parede</button>',
    '<button type="button" class="cenaculo-opcao" data-acao="membros">Pessoas do cenáculo</button>',
    '<button type="button" class="cenaculo-opcao" data-acao="regras">Regras dos Cenáculos</button>',
    '<button type="button" class="cenaculo-opcao cenaculo-opcao-perigo" data-acao="sair">Sair do cenáculo</button>',
  ];
  const titulo = conversa ? ((outro && outro.nome) || 'Conversa') : (cenaculoAberto.nome || 'Cenáculo');
  const corpo = janelaDoCenaculo(titulo, `
    ${!conversa && cenaculoAberto.descricao ? `<p class="cenaculo-explica">${escaparTexto(cenaculoAberto.descricao)}</p>` : ''}
    <div class="cenaculo-opcoes">${opcoes.join('')}</div>`);
  corpo.querySelectorAll('.cenaculo-opcao').forEach((botao) => {
    botao.addEventListener('click', () => {
      const acao = botao.dataset.acao;
      if (acao === 'convidar') mostrarConvite(cenaculoAberto.codigo, false);
      else if (acao === 'encontro') abrirMarcacaoDeEncontro();
      else if (acao === 'foto' && typeof abrirFotoDoGrupo === 'function') abrirFotoDoGrupo();
      else if (acao === 'fundo' && typeof abrirEscolhaDeFundo === 'function') abrirEscolhaDeFundo();
      else if (acao === 'perfil' && typeof abrirPerfilPublico === 'function') abrirPerfilPublico(outro.perfil_id);
      else if (acao === 'bloquear') confirmarBloqueio(outro.perfil_id, outro.nome);
      else if (acao === 'desbloquear') mudarBloqueio(outro.perfil_id, false);
      else if (acao === 'membros') abrirMembros();
      else if (acao === 'regras') janelaDoCenaculo('Regras dos Cenáculos', REGRAS_DOS_CENACULOS);
      else if (acao === 'sair') confirmarSaida();
    });
  });
}

function abrirMarcacaoDeEncontro() {
  const atual = cenaculoAberto.encontro;
  const amanha = new Date(Date.now() + 86400000);
  const dataPadrao = `${amanha.getFullYear()}-${String(amanha.getMonth() + 1).padStart(2, '0')}-${String(amanha.getDate()).padStart(2, '0')}`;
  const corpo = janelaDoCenaculo('Encontro no Google Meet', `
    ${atual ? `<p class="cenaculo-explica">${tr('Encontro marcado: <strong>{titulo}</strong>, {quando}. Marcar outro substitui este.', { titulo: `<span translate="no">${escaparTexto(atual.titulo)}</span>`, quando: formatarEncontro(atual.quando) })}</p>` : ''}
    <p class="cenaculo-explica">Crie a reunião no Google Meet (meet.google.com), copie o link e cole aqui. A chamada acontece toda no Google.</p>
    <label class="perfil-editor-rotulo" for="cenaculo-encontro-titulo">Nome do encontro</label>
    <input type="text" id="cenaculo-encontro-titulo" class="perfil-editor-campo" maxlength="80" value="Encontro do cenáculo">
    <div class="cenaculo-data-hora">
      <div>
        <label class="perfil-editor-rotulo" for="cenaculo-encontro-data">Dia</label>
        <input type="date" id="cenaculo-encontro-data" class="perfil-editor-campo" value="${dataPadrao}">
      </div>
      <div>
        <label class="perfil-editor-rotulo" for="cenaculo-encontro-hora">Hora</label>
        <input type="time" id="cenaculo-encontro-hora" class="perfil-editor-campo" value="20:00">
      </div>
    </div>
    <label class="perfil-editor-rotulo" for="cenaculo-encontro-link">Link do Google Meet</label>
    <input type="url" id="cenaculo-encontro-link" class="perfil-editor-campo" placeholder="https://meet.google.com/abc-defg-hij" autocomplete="off">
    <button type="button" class="licao-botao" id="cenaculo-encontro-salvar">Marcar encontro</button>
    ${atual ? '<button type="button" class="perfil-link perfil-link-perigo" id="cenaculo-encontro-cancelar">Cancelar o encontro marcado</button>' : ''}
    <p class="auth-feedback" id="cenaculo-encontro-aviso" aria-live="polite"></p>`);
  const aviso = corpo.querySelector('#cenaculo-encontro-aviso');
  corpo.querySelector('#cenaculo-encontro-salvar').addEventListener('click', async () => {
    const titulo = corpo.querySelector('#cenaculo-encontro-titulo').value.trim() || 'Encontro do cenáculo';
    const data = corpo.querySelector('#cenaculo-encontro-data').value;
    const hora = corpo.querySelector('#cenaculo-encontro-hora').value;
    const link = corpo.querySelector('#cenaculo-encontro-link').value.trim();
    if (!REGEX_LINK_DO_MEET.test(link)) { aviso.textContent = ERROS_DO_CENACULO.link_meet_invalido; return; }
    if (!data || !hora) { aviso.textContent = 'Escolha o dia e a hora do encontro.'; return; }
    const quando = new Date(`${data}T${hora}`);
    if (Number.isNaN(quando.getTime()) || quando.getTime() < Date.now() - 3600000) { aviso.textContent = ERROS_DO_CENACULO.data_no_passado; return; }
    try {
      const encontro = await chamarCenaculo('cenaculo_marcar_encontro', { _pid: perfilAdultoAtivo().id, _cid: cenaculoAberto.id, _titulo: titulo, _quando: quando.toISOString(), _link: link });
      cenaculoAberto.encontro = encontro;
      renderizarCabecalhoDaConversa();
      fecharJanelaDoCenaculo();
    } catch (erro) {
      aviso.textContent = mensagemDoCenaculo(erro);
    }
  });
  const cancelar = corpo.querySelector('#cenaculo-encontro-cancelar');
  if (cancelar) {
    cancelar.addEventListener('click', async () => {
      try {
        await chamarCenaculo('cenaculo_cancelar_encontro', { _pid: perfilAdultoAtivo().id, _cid: cenaculoAberto.id });
        cenaculoAberto.encontro = null;
        renderizarCabecalhoDaConversa();
        fecharJanelaDoCenaculo();
      } catch (erro) {
        aviso.textContent = mensagemDoCenaculo(erro);
      }
    });
  }
}

function abrirMembros() {
  const perfil = perfilAdultoAtivo();
  if (!perfil || !cenaculoAberto) return;
  const organizador = cenaculoAberto.papel === 'organizador';
  const bloqueados = cenaculoAberto.bloqueados || [];
  const linhas = (cenaculoAberto.membros || []).map((membro) => {
    const eu = membro.perfil_id === perfil.id;
    const bloqueado = bloqueados.includes(membro.perfil_id);
    const acoes = eu ? '<small class="cenaculo-membro-eu">você</small>' : `
      <button type="button" class="perfil-link" data-acao="${bloqueado ? 'desbloquear' : 'bloquear'}" data-perfil="${membro.perfil_id}" data-nome="${escaparTexto(membro.nome)}">${bloqueado ? 'Desbloquear' : 'Bloquear'}</button>
      ${organizador ? `<button type="button" class="perfil-link perfil-link-perigo" data-acao="remover" data-perfil="${membro.perfil_id}" data-nome="${escaparTexto(membro.nome)}">Remover</button>` : ''}`;
    return `
      <div class="cenaculo-membro">
        ${avatarDoCenaculo(membro.avatar, fotosDosMembros[membro.perfil_id], 'pequeno')}
        <button type="button" class="cenaculo-membro-nome" data-acao="perfil" data-perfil="${membro.perfil_id}">${escaparTexto(membro.nome)}${membro.papel === 'organizador' ? ' <small>organiza</small>' : ''}</button>
        <span class="cenaculo-membro-acoes">${acoes}</span>
      </div>`;
  }).join('');
  const corpo = janelaDoCenaculo('Pessoas do cenáculo', `<div class="cenaculo-membros">${linhas}</div><p class="auth-feedback" id="cenaculo-membros-aviso" aria-live="polite"></p>`);
  corpo.querySelectorAll('[data-acao]').forEach((botao) => {
    botao.addEventListener('click', async () => {
      const acao = botao.dataset.acao;
      const alvo = botao.dataset.perfil;
      if (acao === 'perfil') { if (typeof abrirPerfilPublico === 'function') abrirPerfilPublico(alvo); }
      else if (acao === 'bloquear') confirmarBloqueio(alvo, botao.dataset.nome);
      else if (acao === 'desbloquear') mudarBloqueio(alvo, false);
      else if (acao === 'remover') {
        try {
          await chamarCenaculo('cenaculo_remover_membro', { _pid: perfil.id, _cid: cenaculoAberto.id, _alvo: alvo });
          cenaculoAberto.membros = cenaculoAberto.membros.filter((m) => m.perfil_id !== alvo);
          renderizarCabecalhoDaConversa();
          abrirMembros();
        } catch (erro) {
          corpo.querySelector('#cenaculo-membros-aviso').textContent = mensagemDoCenaculo(erro);
        }
      }
    });
  });
}

function confirmarSaida() {
  const conversa = ehConversaADois();
  const corpo = janelaDoCenaculo(conversa ? 'Apagar esta conversa?' : 'Sair do cenáculo?', `
    <p class="cenaculo-explica">${conversa
      ? 'A conversa sai da sua lista. Se vocês voltarem a conversar, ela aparece de novo.'
      : 'Você deixa de ver as mensagens deste cenáculo. Para voltar, vai precisar de um convite novo.'}</p>
    <div class="cenaculo-botoes">
      <button type="button" class="filter-btn" id="cenaculo-sair-cancelar">Ficar</button>
      <button type="button" class="licao-botao" id="cenaculo-sair-confirmar">Sair</button>
    </div>`);
  corpo.querySelector('#cenaculo-sair-cancelar').addEventListener('click', fecharJanelaDoCenaculo);
  corpo.querySelector('#cenaculo-sair-confirmar').addEventListener('click', async () => {
    try {
      await chamarCenaculo('cenaculo_sair', { _pid: perfilAdultoAtivo().id, _cid: cenaculoAberto.id });
      fecharJanelaDoCenaculo();
      abrirCenaculos();
    } catch (erro) {
      avisoDoCenaculo(mensagemDoCenaculo(erro));
    }
  });
}

function guardarConvitePendente() {
  let codigo = '';
  try {
    const parametros = new URLSearchParams(window.location.search);
    codigo = codigoDoConvite(`?cenaculo=${parametros.get('cenaculo') || ''}`);
  } catch (e) {
    return;
  }
  if (!codigo) return;
  try { sessionStorage.setItem(CHAVE_CONVITE_PENDENTE, codigo); } catch (e) {  }
  try {
    const url = new URL(window.location.href);
    url.searchParams.delete('cenaculo');
    history.replaceState(null, '', url.pathname + (url.search || '') + url.hash);
  } catch (e) {
  }
}

function convitePendente() {
  try { return sessionStorage.getItem(CHAVE_CONVITE_PENDENTE) || ''; } catch (e) { return ''; }
}

function verificarConvitePendente() {
  const codigo = convitePendente();
  if (!codigo) return;
  if (typeof contaLogada !== 'function' || !contaLogada()) {
    avisoDoCenaculo('Você recebeu um convite para um cenáculo. Entre na sua conta para participar.');
    return;
  }
  if (!perfilAdultoAtivo()) return;
  try { sessionStorage.removeItem(CHAVE_CONVITE_PENDENTE); } catch (e) {  }
  if (paginaBloqueadaPelaSuspensao('view-cenaculos')) return;
  mostrarListaDeCenaculos();
  abrirEntradaPorConvite(codigo);
}

function aposEscolherPerfil() {
  if (typeof verificarAdvertencia === 'function') setTimeout(verificarAdvertencia, 600);
  atualizarSituacaoDaConta().then(() => {
    verificarConvitePendente();
    if (typeof verificarAmigoPendente === 'function') verificarAmigoPendente();
  });
}

const DESTINOS_DA_BARRA = {
  'view-home': 'inicio', 'view-detail': 'inicio',
  'view-trilhas': 'trilhas', 'view-licao': 'trilhas', 'view-ranking': 'trilhas',
  'view-cenaculos': 'cenaculos', 'view-cenaculo': 'cenaculos',
  'view-comunidade': 'comunidade',
  'view-oracoes': 'oracoes', 'view-terco': 'oracoes', 'view-padroeiro': 'oracoes', 'view-leitura': 'oracoes',
  'view-perfil': 'conta', 'view-auth': 'conta',
};
const PAGINAS_SEM_BARRA = ['view-perfis', 'view-licao', 'view-cenaculo', 'view-completar'];

function atualizarBarraDoApp(idDaPagina) {
  const barra = document.getElementById('barra-app');
  if (!barra) return;
  const destino = DESTINOS_DA_BARRA[idDaPagina] || '';
  barra.querySelectorAll('.barra-app-botao').forEach((botao) => {
    botao.classList.toggle('ativo', botao.dataset.destino === destino);
  });
  document.body.classList.toggle('sem-barra-app', PAGINAS_SEM_BARRA.includes(idDaPagina));
  if (idDaPagina !== 'view-cenaculo') pararConversa();
}

function irPelaBarra(destino) {
  if (typeof closeSidebar === 'function') closeSidebar();
  if (destino === 'inicio') mudarDeView('view-home');
  else if (destino === 'trilhas' && typeof abrirTrilhas === 'function') abrirTrilhas();
  else if (destino === 'cenaculos') abrirCenaculos();
  else if (destino === 'comunidade' && typeof abrirComunidade === 'function') abrirComunidade();
  else if (destino === 'oracoes') mudarDeView('view-oracoes');
  else if (destino === 'conta') {
    if (typeof contaLogada !== 'function' || !contaLogada()) { if (typeof irParaLogin === 'function') irParaLogin(); }
    else if (typeof modoInfantilAtivo === 'function' && modoInfantilAtivo()) { if (typeof sairDoModoInfantil === 'function') sairDoModoInfantil('inicio'); }
    else {
      mudarDeView('view-perfil');
      if (typeof carregarPaginaDePerfil === 'function') carregarPaginaDePerfil();
    }
  }
}

function iniciarCenaculos() {
  guardarConvitePendente();

  document.querySelectorAll('[data-destino]').forEach((botao) => {
    if (botao.closest('#barra-app') || botao.closest('#atalhos-app')) {
      botao.addEventListener('click', () => irPelaBarra(botao.dataset.destino));
    }
  });
  const navCenaculos = document.getElementById('nav-cenaculos');
  if (navCenaculos) navCenaculos.addEventListener('click', abrirCenaculos);

  const ligar = (id, funcao) => {
    const elemento = document.getElementById(id);
    if (elemento) elemento.addEventListener('click', funcao);
  };
  ligar('btn-back-cenaculos', () => mudarDeView('view-home'));
  const doMenu = (funcao) => () => { alternarMenuDaLista(false); funcao(); };
  ligar('cenaculo-criar-btn', doMenu(abrirCriacaoDeCenaculo));
  ligar('cenaculo-entrar-btn', doMenu(() => abrirEntradaPorConvite('')));
  ligar('cenaculo-regras-btn', doMenu(() => janelaDoCenaculo('Regras dos Cenáculos', REGRAS_DOS_CENACULOS)));
  ligar('cenaculos-menu-btn', (evento) => { evento.stopPropagation(); alternarMenuDaLista(); });
  document.addEventListener('click', (evento) => {
    if (!evento.target.closest('.cenaculos-menu-caixa')) alternarMenuDaLista(false);
  });
  ligar('cenaculo-nova-btn', () => { if (typeof abrirAdicionarPessoa === 'function') abrirAdicionarPessoa(''); });
  ligar('cenaculo-escanear-btn', () => { if (typeof abrirEscanearCodigo === 'function') abrirEscanearCodigo(); });
  document.querySelectorAll('.cenaculos-filtro').forEach((botao) => {
    botao.addEventListener('click', () => {
      filtroDaLista = botao.dataset.filtro;
      renderizarListaDeCenaculos();
    });
  });
  const buscaDaListaCampo = document.getElementById('cenaculos-busca');
  if (buscaDaListaCampo) {
    buscaDaListaCampo.addEventListener('input', () => {
      buscaDaLista = buscaDaListaCampo.value;
      renderizarListaDeCenaculos();
    });
  }
  ligar('cenaculo-voltar', abrirCenaculos);
  ligar('cenaculo-menu-btn', abrirMenuDoCenaculo);
  ligar('cenaculo-titulo-btn', tocarNoTituloDaConversa);
  ligar('cenaculo-conversa-btn', () => { if (typeof abrirAdicionarPessoa === 'function') abrirAdicionarPessoa(''); });
  ligar('cenaculo-meu-codigo-btn', doMenu(() => { if (typeof abrirMeuCodigo === 'function') abrirMeuCodigo(); }));
  ligar('cenaculo-emoji-btn', abrirPainelDeEmojis);
  ligar('cenaculo-gif-btn', abrirPainelDeGifs);
  const botaoDeGifs = document.getElementById('cenaculo-gif-btn');
  if (botaoDeGifs) botaoDeGifs.hidden = !CHAVE_DO_GIPHY;
  ligarMicrofone();
  ligar('cenaculo-gravando-cancelar', () => pararGravacao(false));
  ligar('cenaculo-gravando-enviar', () => pararGravacao(true));

  document.querySelectorAll('.cenaculo-gifs-aba').forEach((aba) => {
    aba.addEventListener('click', () => {
      abaDoGiphy = aba.dataset.aba;
      document.querySelectorAll('.cenaculo-gifs-aba').forEach((a) => a.classList.toggle('ativa', a === aba));
      buscarNoGiphy();
    });
  });
  const buscaDeGifs = document.getElementById('cenaculo-gifs-busca');
  if (buscaDeGifs) {
    buscaDeGifs.addEventListener('input', () => {
      clearTimeout(temporizadorDoGiphy);
      temporizadorDoGiphy = setTimeout(buscarNoGiphy, 450);
    });
  }

  const formulario = document.getElementById('cenaculo-escrever');
  if (formulario) {
    formulario.addEventListener('submit', (evento) => {
      evento.preventDefault();
      enviarTextoDoCampo();
    });
  }
  const campo = document.getElementById('cenaculo-texto');
  if (campo) {
    campo.addEventListener('input', () => {
      ajustarAlturaDoCampo();
      atualizarBotaoDeEnviar();
    });
    campo.addEventListener('keydown', (evento) => {
      if (evento.key === 'Enter' && !evento.shiftKey && !evento.isComposing) {
        evento.preventDefault();
        enviarTextoDoCampo();
      }
    });
  }
  atualizarBotaoDeEnviar();

  if (typeof supabaseCliente !== 'undefined' && supabaseCliente) {
    supabaseCliente.auth.onAuthStateChange(() => {
      setTimeout(atualizarSituacaoDaConta, 0);
    });
    setTimeout(async () => {
      await atualizarSituacaoDaConta();
      if (convitePendente() && !(typeof contaLogada === 'function' && contaLogada())) verificarConvitePendente();
    }, 300);
    setInterval(() => { if (!document.hidden) atualizarSituacaoDaConta(); }, 5 * 60 * 1000);
  }
  posicionarPainelDaLista();
  marcarSemConversa(true);
  if (TELA_GRANDE.addEventListener) TELA_GRANDE.addEventListener('change', aoMudarTamanhoDaTela);
  else if (TELA_GRANDE.addListener) TELA_GRANDE.addListener(aoMudarTamanhoDaTela);
  const ativa = document.querySelector('.view.active');
  atualizarBarraDoApp(ativa ? ativa.id : 'view-home');
}

document.addEventListener('DOMContentLoaded', () => {
  if (typeof rodarComSeguranca === 'function') rodarComSeguranca('cenáculos', iniciarCenaculos);
  else iniciarCenaculos();
});
