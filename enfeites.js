const ENFEITES = {
  moldura: [
    { id: 'aureola', nome: 'Auréola', texto: 'A luz dourada dos santos', gratis: true, criancas: true },
    { id: 'estrelas-de-maria', nome: '12 estrelas de Maria', texto: 'A coroa da Mulher do Apocalipse', criancas: true },
    { id: 'terco', nome: 'Terço', texto: 'Uma luz reza conta por conta' },
    { id: 'pentecostes', nome: 'Chamas de Pentecostes', texto: 'O fogo do Espírito Santo' },
    { id: 'rosas', nome: 'Rosas de Santa Teresinha', texto: 'Uma chuva de rosas' },
    { id: 'lirios', nome: 'Lírios de São José', texto: 'A pureza do guarda da Sagrada Família' },
    { id: 'asas-de-anjo', nome: 'Asas de anjo', texto: 'O anjo da guarda abre as asas', criancas: true },
    { id: 'sagrado-coracao', nome: 'Sagrado Coração', texto: 'O Coração de Jesus em chamas de amor' },
    { id: 'ramos-de-oliveira', nome: 'Ramos de oliveira', texto: 'A paz que vem de Deus', criancas: true },
    { id: 'rosacea', nome: 'Rosácea de vitral', texto: 'Os vidros coloridos da catedral' },
  ],
  efeito: [
    { id: 'estrelas-cadentes', nome: 'Estrelas cadentes', texto: 'Uma chuva de estrelas douradas', gratis: true, criancas: true },
    { id: 'pombas', nome: 'Pombas do Espírito Santo', texto: 'A pomba desce num facho de luz', },
    { id: 'vitral', nome: 'Vitral', texto: 'A rosácea da catedral se acende' },
    { id: 'petalas', nome: 'Pétalas de rosa', texto: 'Pétalas caindo devagar', criancas: true },
    { id: 'sinos', nome: 'Sinos da igreja', texto: 'Os sinos tocam de alegria' },
    { id: 'linguas-de-fogo', nome: 'Línguas de fogo', texto: 'O Espírito Santo desce em chamas' },
    { id: 'incenso', nome: 'Incenso', texto: 'A fumaça sobe como uma oração' },
    { id: 'custodia', nome: 'Custódia do Santíssimo', texto: 'A luz da adoração' },
    { id: 'estrela-de-belem', nome: 'Estrela de Belém', texto: 'A estrela que guiou os Magos', criancas: true },
    { id: 'penas-de-anjo', nome: 'Penas de anjo', texto: 'Penas brancas caindo do céu', criancas: true },
    { id: 'arco-iris', nome: 'Arco-íris da Aliança', texto: 'A promessa de Deus a Noé', criancas: true },
    { id: 'coracoes', nome: 'Corações subindo', texto: 'Muito amor para o céu', criancas: true },
    { id: 'luz-do-ceu', nome: 'Luz do céu', texto: 'Raios de luz descem do alto' },
  ],
  faixa: [
    { id: 'ceu-estrelado', nome: 'Céu estrelado', texto: 'Estrelas e a lua', gratis: true, criancas: true },
    { id: 'cruz-na-colina', nome: 'Cruz na colina', texto: 'O sol nasce atrás da cruz' },
    { id: 'pombas-passando', nome: 'Pombas passando', texto: 'Pombas brancas no céu da manhã', criancas: true },
    { id: 'velas', nome: 'Velas acesas', texto: 'A luz das velas da igreja' },
    { id: 'raios-de-gloria', nome: 'Raios de glória', texto: 'A cruz entre nuvens e luz' },
    { id: 'catedral', nome: 'Catedral à noite', texto: 'A rosácea acesa sob as estrelas' },
    { id: 'mar-da-galileia', nome: 'Mar da Galileia', texto: 'O barco dos apóstolos ao nascer do sol' },
    { id: 'campo-de-lirios', nome: 'Campo de lírios', texto: 'Olhai os lírios do campo', criancas: true },
    { id: 'chuva-de-rosas', nome: 'Chuva de rosas', texto: 'A promessa de Santa Teresinha', criancas: true },
  ],
};
const TIPOS_DE_ENFEITE = [
  { tipo: 'moldura', nome: 'Moldura da foto' },
  { tipo: 'efeito', nome: 'Efeito ao abrir' },
  { tipo: 'faixa', nome: 'Faixa do nome' },
];
const DURACAO_DO_EFEITO = 3800;

let sequenciaDosEnfeites = 0;
let enfeitesDaFamilia = {};

function idDoEnfeite(nome) {
  sequenciaDosEnfeites += 1;
  return `enf-${nome}-${sequenciaDosEnfeites}`;
}

function n1(valor) {
  return Math.round(valor * 10) / 10;
}

function pontoNoCirculo(raio, graus, cx = 68, cy = 68) {
  const a = (graus * Math.PI) / 180;
  return [cx + raio * Math.cos(a), cy + raio * Math.sin(a)];
}

function sorteioFixo(semente) {
  let s = semente >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function movimentoReduzido() {
  try {
    return !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  } catch (e) {
    return false;
  }
}

function faisca(x, y, tamanho, cor, atraso, duracao) {
  return `<g transform="translate(${n1(x)} ${n1(y)}) scale(${tamanho})"><path class="enf-pisca" style="--a:${atraso}s;--d:${duracao || 2.6}s" fill="${cor}" d="M0 -1C.12 -.24 .24 -.12 1 0C.24 .12 .12 .24 0 1C-.12 .24 -.24 .12 -1 0C-.24 -.12 -.12 -.24 0 -1Z"/></g>`;
}

function caminhoDeEstrela(cx, cy, externo, interno, pontas) {
  const total = pontas || 5;
  let d = '';
  for (let i = 0; i < total * 2; i += 1) {
    const raio = i % 2 === 0 ? externo : interno;
    const a = -Math.PI / 2 + (i * Math.PI) / total;
    d += `${i === 0 ? 'M' : 'L'}${n1(cx + raio * Math.cos(a))} ${n1(cy + raio * Math.sin(a))}`;
  }
  return `${d}Z`;
}

const MOLDURAS = {};

function svgDaMoldura(id) {
  const desenho = MOLDURAS[id];
  if (!desenho) return '';
  return `<svg class="enfeite-moldura" viewBox="0 0 136 136" aria-hidden="true" focusable="false">${desenho()}</svg>`;
}

function nuvem(x, y, escala, cor, opacidade) {
  return `<g transform="translate(${x} ${y}) scale(${escala})" fill="${cor}" opacity="${opacidade}"><ellipse cx="0" cy="0" rx="16" ry="5"/><ellipse cx="-7" cy="-3" rx="8" ry="5.5"/><ellipse cx="4" cy="-5" rx="9" ry="7"/><ellipse cx="12" cy="-1.5" rx="7" ry="4.5"/></g>`;
}

const FAIXAS = {};

function borboleta(x, y, cor, duracao, atraso) {
  return `<g transform="translate(330 ${y})"><g class="enf-voa" style="--d:${duracao}s;--a:${atraso}s"><g class="enf-borboleta" style="--a:${atraso}s">
    <g transform="translate(${x - 330} 0)"><g class="enf-asa-v" style="--d:.28s"><path d="M0 0C-4 -6 -9 -5 -8 -1C-7 2 -3 2 0 0ZM0 0C-3 4 -7 5 -7 2C-7 0 -3 0 0 0Z" fill="${cor}"/><path d="M0 0C4 -6 9 -5 8 -1C7 2 3 2 0 0ZM0 0C3 4 7 5 7 2C7 0 3 0 0 0Z" fill="${cor}"/></g><path d="M0 -3V3" stroke="#1f2937" stroke-width="1"/></g>
  </g></g></g>`;
}

function svgDaFaixa(id) {
  const desenho = FAIXAS[id];
  if (!desenho) return '';
  return `<svg class="enfeite-faixa-svg" viewBox="0 0 320 80" preserveAspectRatio="xMaxYMid slice" aria-hidden="true" focusable="false">${desenho()}</svg>`;
}

function suave(t) {
  const x = Math.min(1, Math.max(0, t));
  return x * x * (3 - 2 * x);
}

function desenharFaisca(ctx, x, y, raio, cor, alfa) {
  if (alfa <= 0) return;
  ctx.save();
  ctx.globalAlpha *= alfa;
  ctx.translate(x, y);
  ctx.fillStyle = cor;
  ctx.beginPath();
  ctx.moveTo(0, -raio);
  ctx.quadraticCurveTo(raio * 0.18, -raio * 0.18, raio, 0);
  ctx.quadraticCurveTo(raio * 0.18, raio * 0.18, 0, raio);
  ctx.quadraticCurveTo(-raio * 0.18, raio * 0.18, -raio, 0);
  ctx.quadraticCurveTo(-raio * 0.18, -raio * 0.18, 0, -raio);
  ctx.fill();
  ctx.restore();
}

function desenharLuz(ctx, x, y, raio, cor, alfa) {
  if (alfa <= 0 || raio <= 0) return;
  const g = ctx.createRadialGradient(x, y, 0, x, y, raio);
  g.addColorStop(0, `rgba(${cor}, ${alfa})`);
  g.addColorStop(1, `rgba(${cor}, 0)`);
  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.arc(x, y, raio, 0, Math.PI * 2);
  ctx.fill();
}

const EFEITOS_DO_PERFIL = {};

function margemDoEfeito(alvo) {
  let corte = alvo.parentElement;
  while (corte && corte !== document.body && getComputedStyle(corte).overflow === 'visible') corte = corte.parentElement;
  const a = alvo.getBoundingClientRect();
  if (!corte || corte === document.body) {
    return { e: Math.floor(Math.max(0, Math.min(60, a.left))), d: Math.floor(Math.max(0, Math.min(60, document.documentElement.clientWidth - a.right))), t: Math.floor(Math.max(0, Math.min(60, a.top - 70))) };
  }
  const c = corte.getBoundingClientRect();
  const esquerda = c.left + corte.clientLeft;
  const topo = c.top + corte.clientTop;
  const direita = esquerda + corte.clientWidth;
  return { e: Math.floor(Math.max(0, Math.min(140, a.left - esquerda))), d: Math.floor(Math.max(0, Math.min(140, direita - a.right))), t: Math.floor(Math.max(0, Math.min(140, a.top - topo))) };
}

function tocarEfeitoDoPerfil(alvo, id) {
  const criar = EFEITOS_DO_PERFIL[id];
  if (!alvo || !criar || movimentoReduzido()) return null;
  alvo.querySelectorAll(':scope > .enfeite-efeito').forEach((antigo) => antigo.remove());
  if (getComputedStyle(alvo).position === 'static') alvo.style.position = 'relative';
  const m = criar.usaMargem ? margemDoEfeito(alvo) : { e: 0, d: 0, t: 0 };
  const w = Math.max(1, Math.round(alvo.clientWidth) + m.e + m.d);
  const h = Math.max(1, Math.round(Math.min(alvo.scrollHeight || alvo.clientHeight, 720)) + m.t);
  const tela = document.createElement('canvas');
  tela.className = 'enfeite-efeito';
  tela.setAttribute('aria-hidden', 'true');
  const escala = Math.min(window.devicePixelRatio || 1, 2);
  tela.width = Math.round(w * escala);
  tela.height = Math.round(h * escala);
  tela.style.width = `${w}px`;
  tela.style.height = `${h}px`;
  if (m.e || m.t) {
    tela.style.left = `${-m.e}px`;
    tela.style.top = `${-m.t}px`;
  }
  const ctx = tela.getContext && tela.getContext('2d');
  if (!ctx) return null;
  alvo.appendChild(tela);
  ctx.scale(escala, escala);
  let foco = null;
  const foto = alvo.querySelector('.perfil-publico-foto, .enfeite-lugar-da-foto, .painel-topo .avatar');
  if (foto) {
    const caixa = alvo.getBoundingClientRect();
    const dela = foto.getBoundingClientRect();
    if (dela.width > 0) foco = { x: dela.left - caixa.left + dela.width / 2 + m.e, y: dela.top - caixa.top + alvo.scrollTop + dela.height / 2 + m.t, r: dela.width / 2 };
  }
  const desenhar = criar(w, h, foco);
  const inicio = performance.now();
  const quadro = (agora) => {
    if (!tela.isConnected) return;
    const t = agora - inicio;
    ctx.clearRect(0, 0, w, h);
    ctx.save();
    ctx.globalAlpha = t > DURACAO_DO_EFEITO - 450 ? Math.max(0, (DURACAO_DO_EFEITO - t) / 450) : 1;
    try {
      desenhar(ctx, t / 1000);
    } catch (e) {
      tela.remove();
      return;
    }
    ctx.restore();
    if (t < DURACAO_DO_EFEITO) requestAnimationFrame(quadro);
    else tela.remove();
  };
  requestAnimationFrame(quadro);
  return tela;
}

const MINIS_DE_EFEITO = {};

function svgDoEfeito(id) {
  const desenho = MINIS_DE_EFEITO[id];
  if (!desenho) return '';
  return `<svg class="enfeite-mini-efeito-svg" viewBox="0 0 64 40" aria-hidden="true" focusable="false">${desenho(idDoEnfeite('mini'))}</svg>`;
}

function itemDoEnfeite(tipo, id) {
  return (ENFEITES[tipo] || []).find((item) => item.id === id) || null;
}

function perfilEhCrianca(perfil) {
  return !!perfil && perfil.tipo === 'crianca';
}

function enfeitesDaFamiliaLiberados() {
  return typeof contaComEnfeitesExclusivos === 'function' && contaComEnfeitesExclusivos();
}

function enfeiteLiberado(item, perfil) {
  if (!item) return true;
  if (perfilEhCrianca(perfil) && !item.criancas) return false;
  if (item.exclusivo) return enfeitesDaFamiliaLiberados();
  if (item.gratis) return true;
  if (typeof cobrancaLigadaNoSite !== 'function' || !cobrancaLigadaNoSite()) return true;
  const plano = typeof estadoDaAssinatura !== 'undefined' && estadoDaAssinatura && estadoDaAssinatura.plano ? estadoDaAssinatura.plano.id : 'free';
  return plano !== 'free';
}

function itensVisiveis(tipo, perfil) {
  const crianca = perfilEhCrianca(perfil);
  return (ENFEITES[tipo] || []).filter((item) => (!item.exclusivo || enfeitesDaFamiliaLiberados()) && (!crianca || (item.criancas && enfeiteLiberado(item, perfil))));
}

async function carregarEnfeitesDaFamilia() {
  if (typeof supabaseCliente === 'undefined' || !supabaseCliente || typeof contaLogada !== 'function' || !contaLogada()) return enfeitesDaFamilia;
  try {
    const { data, error } = await supabaseCliente.rpc('enfeites_da_familia');
    if (!error && data && typeof data === 'object') enfeitesDaFamilia = data;
  } catch (e) {
    return enfeitesDaFamilia;
  }
  return enfeitesDaFamilia;
}

function colocarMoldura(lugar, id) {
  if (!lugar) return;
  lugar.querySelectorAll(':scope > .enfeite-moldura').forEach((antiga) => antiga.remove());
  const tem = !!MOLDURAS[id];
  lugar.classList.toggle('com-moldura', tem);
  if (tem) lugar.insertAdjacentHTML('beforeend', svgDaMoldura(id));
}

function colocarFaixa(lugar, id, classe) {
  if (!lugar) return;
  lugar.querySelectorAll(':scope > .enfeite-faixa').forEach((antiga) => antiga.remove());
  const tem = !!FAIXAS[id];
  lugar.classList.toggle('com-faixa', tem);
  if (tem) lugar.insertAdjacentHTML('afterbegin', `<span class="enfeite-faixa ${classe || ''}" aria-hidden="true">${svgDaFaixa(id)}</span>`);
}

function aplicarEnfeitesNoCartao(cartao, enfeites, tocar) {
  if (!cartao) return;
  const escolha = enfeites || {};
  colocarFaixa(cartao.querySelector('.perfil-publico-capa'), escolha.faixa, 'enfeite-faixa-capa');
  colocarMoldura(cartao.querySelector('.perfil-publico-foto'), escolha.moldura);
  if (tocar !== false && escolha.efeito) tocarEfeitoDoPerfil(cartao, escolha.efeito);
}

async function aplicarEnfeitesNoPainel(conteudo, membroId) {
  if (!conteudo) return;
  await carregarEnfeitesDaFamilia();
  const topo = conteudo.querySelector('.painel-topo');
  if (!topo || !conteudo.isConnected) return;
  const escolha = enfeitesDaFamilia[membroId] || {};
  const avatar = topo.querySelector(':scope > .avatar');
  if (avatar && escolha.moldura) {
    const lugar = document.createElement('span');
    lugar.className = 'enfeite-lugar-da-foto';
    avatar.replaceWith(lugar);
    lugar.appendChild(avatar);
    colocarMoldura(lugar, escolha.moldura);
  }
  colocarFaixa(topo, escolha.faixa, 'enfeite-faixa-painel');
  if (escolha.efeito) tocarEfeitoDoPerfil(conteudo.closest('.perfil-painel') || conteudo, escolha.efeito);
}

function faixaDaLinhaDaConversa(outro) {
  if (!outro || !FAIXAS[outro.faixa]) return '';
  return `<span class="enfeite-faixa enfeite-faixa-linha" aria-hidden="true">${svgDaFaixa(outro.faixa)}</span>`;
}

function aplicarEnfeitesNoMeuPerfil(tocar) {
  const cartao = document.querySelector('#meu-perfil-cabecalho .meu-perfil');
  const perfil = typeof membroAtivo !== 'undefined' ? membroAtivo : null;
  if (!cartao || !perfil) return;
  const escolha = enfeitesDaFamilia[perfil.id] || {};
  colocarFaixa(cartao.querySelector('.perfil-publico-capa'), escolha.faixa, 'enfeite-faixa-capa');
  colocarMoldura(cartao.querySelector('.perfil-publico-foto'), escolha.moldura);
  if (tocar && escolha.efeito) tocarEfeitoDoPerfil(cartao, escolha.efeito);
}

async function enfeitarMeuPerfil() {
  const perfil = typeof membroAtivo !== 'undefined' ? membroAtivo : null;
  if (!perfil) return;
  await carregarEnfeitesDaFamilia();
  aplicarEnfeitesNoMeuPerfil(true);
}

async function carregarEnfeitesPublicos(ids) {
  const perfil = typeof membroAtivo !== 'undefined' ? membroAtivo : null;
  const lista = Array.from(new Set((ids || []).filter(Boolean))).slice(0, 100);
  if (!perfil || !lista.length || typeof supabaseCliente === 'undefined' || !supabaseCliente) return {};
  try {
    const { data, error } = await supabaseCliente.rpc('enfeites_publicos', { _pid: perfil.id, _ids: lista });
    if (error || !data || typeof data !== 'object') return {};
    return data;
  } catch (e) {
    return {};
  }
}

function enfeitarLinha(linha, escolha) {
  if (!linha || !escolha) return;
  if (linha.classList.contains('podio-lugar')) {
    if (FAIXAS[escolha.faixa]) colocarFaixa(linha, escolha.faixa, 'enfeite-faixa-podio');
    if (MOLDURAS[escolha.moldura]) colocarMoldura(linha.querySelector('.podio-foto'), escolha.moldura);
    return;
  }
  if (FAIXAS[escolha.faixa]) colocarFaixa(linha, escolha.faixa, 'enfeite-faixa-linha');
  const avatar = linha.querySelector(':scope > .avatar');
  if (avatar && MOLDURAS[escolha.moldura]) {
    const lugar = document.createElement('span');
    lugar.className = 'enfeite-lugar-da-foto enfeite-lugar-pequeno';
    avatar.replaceWith(lugar);
    lugar.appendChild(avatar);
    colocarMoldura(lugar, escolha.moldura);
  }
}

async function enfeitarLinhasDoRanking(lista, familia) {
  if (!lista) return;
  const linhas = Array.from(lista.querySelectorAll('.ranking-linha[data-perfil], .podio-lugar[data-perfil]'));
  if (!linhas.length) return;
  let mapa = {};
  if (familia) {
    await carregarEnfeitesDaFamilia();
    mapa = enfeitesDaFamilia;
  } else {
    mapa = await carregarEnfeitesPublicos(linhas.map((l) => l.dataset.perfil));
  }
  if (!lista.isConnected) return;
  linhas.forEach((linha) => {
    if (linha.isConnected) enfeitarLinha(linha, mapa[linha.dataset.perfil]);
  });
}

let escolhaDeEnfeites = null;

function perfilDaEscolha() {
  return escolhaDeEnfeites ? escolhaDeEnfeites.perfil : null;
}

function seloDoEnfeite(item, perfil) {
  if (!item) return '';
  if (item.exclusivo) return '<span class="enfeite-selo exclusivo">Família</span>';
  if (perfilEhCrianca(perfil)) return '';
  if (item.gratis) return '<span class="enfeite-selo gratis">Grátis</span>';
  if (enfeiteLiberado(item, perfil)) return '<span class="enfeite-selo">Assinantes</span>';
  return `<span class="enfeite-selo trancado">${icone('cadeado')}Assinantes</span>`;
}

function opcaoDeEnfeite(tipo, item, perfil) {
  const valor = escolhaDeEnfeites.valores[tipo] || '';
  const id = item ? item.id : '';
  const escolhido = valor === id;
  const liberado = enfeiteLiberado(item, perfil);
  let previa = '';
  if (tipo === 'moldura') previa = `<span class="enfeite-mini-foto">${desenharAvatar(perfil.avatar, perfil.fotoUrl, 'medio')}${item ? svgDaMoldura(item.id) : ''}</span>`;
  else if (tipo === 'faixa') previa = `<span class="enfeite-mini-faixa">${item ? svgDaFaixa(item.id) : ''}</span>`;
  else previa = `<span class="enfeite-mini-efeito">${item ? svgDoEfeito(item.id) : ''}</span>`;
  return `<button type="button" class="enfeite-opcao${escolhido ? ' escolhido' : ''}${liberado ? '' : ' trancado'}" data-id="${id}" aria-pressed="${escolhido ? 'true' : 'false'}">
    ${previa}
    <strong>${item ? escaparTexto(item.nome) : 'Nenhum'}</strong>
    ${seloDoEnfeite(item, perfil)}
  </button>`;
}

function atualizarPreviaDosEnfeites(tocar) {
  const previa = document.getElementById('enfeites-previa');
  if (!previa || !escolhaDeEnfeites) return;
  aplicarEnfeitesNoCartao(previa, escolhaDeEnfeites.valores, tocar);
}

function escolhaTrancada() {
  const perfil = perfilDaEscolha();
  return TIPOS_DE_ENFEITE.some(({ tipo }) => {
    const item = itemDoEnfeite(tipo, escolhaDeEnfeites.valores[tipo]);
    return !!item && !enfeiteLiberado(item, perfil);
  });
}

function atualizarBotaoDosEnfeites() {
  const botao = document.getElementById('enfeites-salvar');
  const aviso = document.getElementById('enfeites-aviso');
  if (!botao || !escolhaDeEnfeites) return;
  if (escolhaTrancada()) {
    botao.textContent = 'Ver os planos';
    botao.dataset.acao = 'planos';
    if (aviso) {
      aviso.textContent = 'Os enfeites com cadeado são dos assinantes. Escolha outro ou assine um plano para usar.';
      aviso.classList.remove('certo');
    }
  } else {
    botao.textContent = 'Salvar';
    botao.dataset.acao = 'salvar';
  }
}

function renderizarEscolhaDeEnfeites() {
  const grade = document.getElementById('enfeites-grade');
  if (!grade || !escolhaDeEnfeites) return;
  const perfil = perfilDaEscolha();
  const tipo = escolhaDeEnfeites.aba;
  document.querySelectorAll('.enfeites-aba').forEach((aba) => {
    const ativa = aba.dataset.tipo === tipo;
    aba.classList.toggle('ativa', ativa);
    aba.setAttribute('aria-selected', ativa ? 'true' : 'false');
  });
  grade.className = `enfeites-grade enfeites-grade-${tipo}`;
  grade.innerHTML = [null, ...itensVisiveis(tipo, perfil)].map((item) => opcaoDeEnfeite(tipo, item, perfil)).join('');
  grade.querySelectorAll('.enfeite-opcao').forEach((botao) => {
    botao.addEventListener('click', () => {
      escolhaDeEnfeites.valores[tipo] = botao.dataset.id || null;
      const aviso = document.getElementById('enfeites-aviso');
      if (aviso) {
        aviso.textContent = '';
        aviso.classList.remove('certo');
      }
      renderizarEscolhaDeEnfeites();
      atualizarPreviaDosEnfeites(tipo === 'efeito');
    });
  });
  atualizarBotaoDosEnfeites();
}

function mensagemDosEnfeites(erro) {
  const texto = String((erro && erro.message) || '');
  if (texto.includes('enfeite_de_assinante')) return 'Esse enfeite é só para assinantes. Escolha outro ou assine um plano.';
  if (texto.includes('enfeite_invalido')) return 'Esse enfeite não está disponível para este perfil.';
  return 'Não foi possível salvar agora. Tente de novo em instantes.';
}

async function salvarEnfeitesDoPerfil() {
  const botao = document.getElementById('enfeites-salvar');
  const aviso = document.getElementById('enfeites-aviso');
  const perfil = perfilDaEscolha();
  if (!botao || !perfil) return;
  if (botao.dataset.acao === 'planos') {
    if (typeof fecharJanelaDoCenaculo === 'function') fecharJanelaDoCenaculo();
    if (typeof abrirPlanos === 'function') abrirPlanos();
    return;
  }
  botao.disabled = true;
  botao.textContent = 'Salvando...';
  let salvou = false;
  try {
    const valores = escolhaDeEnfeites.valores;
    const { data, error } = await supabaseCliente.rpc('perfil_mudar_enfeites', {
      _pid: perfil.id,
      _moldura: valores.moldura || null,
      _efeito: valores.efeito || null,
      _faixa: valores.faixa || null,
    });
    if (error) throw error;
    enfeitesDaFamilia[perfil.id] = data || {};
    salvou = true;
    if (aviso) {
      aviso.textContent = 'Pronto! Os enfeites foram salvos e já aparecem no seu perfil.';
      aviso.classList.add('certo');
    }
  } catch (erro) {
    if (aviso) {
      aviso.textContent = mensagemDosEnfeites(erro);
      aviso.classList.remove('certo');
    }
  }
  botao.disabled = false;
  atualizarBotaoDosEnfeites();
  const meuPerfil = document.querySelector('#meu-perfil-cabecalho .meu-perfil');
  if (salvou && meuPerfil && meuPerfil.offsetParent !== null) {
    if (typeof fecharJanelaDoCenaculo === 'function') fecharJanelaDoCenaculo();
    aplicarEnfeitesNoMeuPerfil(true);
    if (typeof mostrarAvisoTrilhas === 'function') mostrarAvisoTrilhas('Enfeites salvos! Agora é assim que os outros veem o seu perfil.');
  } else if (salvou) {
    aplicarEnfeitesNoMeuPerfil(false);
  }
}

async function abrirEnfeitesDoPerfil() {
  const perfil = typeof membroAtivo !== 'undefined' ? membroAtivo : null;
  if (!perfil || typeof janelaDoCenaculo !== 'function') return;
  const corpo = janelaDoCenaculo('Enfeites do perfil', '<p class="perfis-carregando">Carregando...</p>');
  await Promise.all([
    carregarEnfeitesDaFamilia(),
    typeof carregarAssinaturaSemFalhar === 'function' ? carregarAssinaturaSemFalhar() : null,
  ]);
  const atuais = enfeitesDaFamilia[perfil.id] || {};
  escolhaDeEnfeites = {
    perfil,
    aba: 'moldura',
    valores: { moldura: atuais.moldura || null, efeito: atuais.efeito || null, faixa: atuais.faixa || null },
  };
  corpo.innerHTML = `
    <div class="enfeites-escolha">
      <div class="perfil-publico enfeites-previa" id="enfeites-previa">
        <div class="perfil-publico-capa">
          <span class="perfil-publico-foto">${desenharAvatar(perfil.avatar, perfil.fotoUrl, 'grande')}</span>
        </div>
        <div class="perfil-publico-topo">
          <strong class="perfil-publico-nome">${escaparTexto(perfil.nome)}</strong>
          <button type="button" class="perfil-link" id="enfeites-ver-efeito">Ver o efeito ao abrir</button>
        </div>
      </div>
      <div class="enfeites-abas" role="tablist">
        ${TIPOS_DE_ENFEITE.map((t) => `<button type="button" role="tab" class="enfeites-aba" data-tipo="${t.tipo}">${t.nome}</button>`).join('')}
      </div>
      <div class="enfeites-grade" id="enfeites-grade"></div>
      <p class="enfeites-aviso" id="enfeites-aviso" aria-live="polite"></p>
      <button type="button" class="licao-botao" id="enfeites-salvar">Salvar</button>
    </div>`;
  corpo.querySelectorAll('.enfeites-aba').forEach((aba) => {
    aba.addEventListener('click', () => {
      escolhaDeEnfeites.aba = aba.dataset.tipo;
      renderizarEscolhaDeEnfeites();
    });
  });
  const verEfeito = corpo.querySelector('#enfeites-ver-efeito');
  if (verEfeito) {
    verEfeito.addEventListener('click', () => {
      const efeito = escolhaDeEnfeites.valores.efeito;
      const aviso = document.getElementById('enfeites-aviso');
      if (!efeito) {
        if (aviso) aviso.textContent = 'Escolha um efeito na aba "Efeito ao abrir".';
        return;
      }
      tocarEfeitoDoPerfil(document.getElementById('enfeites-previa'), efeito);
    });
  }
  corpo.querySelector('#enfeites-salvar').addEventListener('click', salvarEnfeitesDoPerfil);
  renderizarEscolhaDeEnfeites();
  atualizarPreviaDosEnfeites(false);
}
