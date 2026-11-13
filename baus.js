const FRASCOS_DE_AZEITE = {
  fe_dobro: { nome: 'Fé em dobro', texto: 'Por 15 minutos, as missões dão o dobro de Fé.', cor: '#f6c445', escura: '#a8650f', simbolo: 'dobro' },
  santidade: { nome: 'Santidade cheia', texto: 'Enche a sua Santidade na hora.', cor: '#9fe0ff', escura: '#2f7fb8', simbolo: 'aureola' },
  protecao: { nome: 'Protetor da ofensiva', texto: 'Se você passar um dia sem missão, a ofensiva continua.', cor: '#ff9a4d', escura: '#b8401a', simbolo: 'chama' },
};
const CORES_DOS_BAUS = {
  madeira: { corpo: ['#a8682f', '#6b3a17'], tampa: ['#c07a3a', '#7a4419'], faixa: ['#d9b77a', '#8f6c35'], luz: '#ffd08a' },
  prata: { corpo: ['#5f6f93', '#323c58'], tampa: ['#73839f', '#3c4766'], faixa: ['#f2f6ff', '#9eabc6'], luz: '#dfe9ff' },
  ouro: { corpo: ['#8a2f1d', '#521709'], tampa: ['#a13a24', '#5e1b0b'], faixa: ['#fff3c4', '#d4a43a'], luz: '#ffe28a' },
};
const DESAFIOS_DO_DIA = {
  missoes1: { texto: 'Faça 1 missão', icone: 'trilha', ir: 'trilhas' },
  missoes2: { texto: 'Faça 2 missões', icone: 'trilha', ir: 'trilhas' },
  fe20: { texto: 'Ganhe 20 de Fé', icone: 'estrela', ir: 'trilhas' },
  fe40: { texto: 'Ganhe 40 de Fé', icone: 'estrela', ir: 'trilhas' },
  perfeita: { texto: 'Faça uma missão sem errar', icone: 'medalha', ir: 'trilhas' },
  terco: { texto: 'Reze o terço', icone: 'terco', ir: 'terco' },
  quiz: { texto: 'Jogue o Quiz dos Santos', icone: 'lampada', ir: 'quiz' },
  oracao: { texto: 'Reze uma oração', icone: 'cruz', ir: 'oracoes' },
  jogo: { texto: 'Jogue um joguinho', icone: 'estrela', ir: 'jogos' },
};

let contadorDosDesenhosDeBau = 0;
let caixasDoDia = { desafios: null, mochila: null };
const desafiosJaAvisados = new Set();
let reloginhoDoFrasco = null;

function trDoBau(texto, valores) {
  return typeof tr === 'function' ? tr(texto, valores) : String(texto).replace(/\{(\w+)\}/g, (_, k) => (valores && valores[k] !== undefined ? valores[k] : ''));
}

function iconeDoBau(nome) {
  return typeof icone === 'function' ? icone(nome) : '';
}

function perfilDosBaus() {
  if (typeof contaLogada === 'function' && !contaLogada()) return null;
  const membro = typeof obterMembroAtivo === 'function' ? obterMembroAtivo() : null;
  return membro && membro.id && typeof supabaseCliente !== 'undefined' && supabaseCliente ? membro : null;
}

function svgDoFrasco(tipo, tamanho) {
  const f = FRASCOS_DE_AZEITE[tipo] || FRASCOS_DE_AZEITE.fe_dobro;
  const id = `frasco-${tipo}-${(contadorDosDesenhosDeBau += 1)}`;
  const simbolos = {
    dobro: '<text x="32" y="58" text-anchor="middle" font-family="Georgia, serif" font-size="13" font-weight="700" fill="#5a3203" opacity=".75">2×</text>',
    aureola: '<ellipse cx="32" cy="52" rx="8" ry="3" fill="none" stroke="#ffffff" stroke-width="2" opacity=".85"/><path d="M32 54 v8 M28 58 h8" stroke="#ffffff" stroke-width="2" stroke-linecap="round" opacity=".85"/>',
    chama: '<path d="M32 46 c4 5 7 8 6 12 c-1 4 -4 6 -6 6 c-3 0 -6 -2 -6 -6 c0 -3 2 -5 3 -7 c1 2 2 3 3 3 c0 -3 -1 -5 0 -8z" fill="#fff4d6" opacity=".9"/>',
  };
  return `<svg class="frasco-svg" viewBox="0 0 64 80" width="${tamanho || 48}" height="${Math.round((tamanho || 48) * 1.25)}" aria-hidden="true">
    <defs>
      <linearGradient id="${id}-l" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fffbe8"/><stop offset=".3" stop-color="${f.cor}"/><stop offset="1" stop-color="${f.escura}"/></linearGradient>
      <radialGradient id="${id}-v" cx=".32" cy=".3" r=".75"><stop offset="0" stop-color="#ffffff" stop-opacity=".55"/><stop offset=".45" stop-color="#ffffff" stop-opacity=".08"/><stop offset="1" stop-color="#ffffff" stop-opacity="0"/></radialGradient>
      <radialGradient id="${id}-b"><stop offset="0" stop-color="${f.cor}" stop-opacity=".55"/><stop offset="1" stop-color="${f.cor}" stop-opacity="0"/></radialGradient>
    </defs>
    <circle cx="32" cy="50" r="30" fill="url(#${id}-b)"/>
    <ellipse cx="32" cy="76" rx="17" ry="3.2" fill="#000" opacity=".28"/>
    <path d="M25 6 h14 l-1.5 9 h-11z" fill="#9b6a35"/><path d="M25 6 h14" stroke="#c99a5e" stroke-width="2" stroke-linecap="round"/>
    <path d="M26.5 15 h11 v8 c11 4.5 17 13.5 17 25 a22.5 22.5 0 0 1 -45 0 c0 -11.5 6 -20.5 17 -25z" fill="rgba(210,230,255,.16)"/>
    <path d="M11.2 44 c6 2.6 12.4 -1.8 20.8 .4 c8 2.1 14 -1.6 20.8 -.6 c.5 1.3 .7 2.9 .7 4.2 a21.5 21.5 0 0 1 -43 0 c0 -1.4 .2 -2.7 .7 -4z" fill="url(#${id}-l)"/>
    ${simbolos[f.simbolo] || ''}
    <path d="M26.5 15 h11 v8 c11 4.5 17 13.5 17 25 a22.5 22.5 0 0 1 -45 0 c0 -11.5 6 -20.5 17 -25z" fill="url(#${id}-v)" stroke="rgba(255,255,255,.6)" stroke-width="1.4"/>
    <path d="M17 37 q-4 8 -1 17" stroke="#ffffff" stroke-opacity=".65" stroke-width="2.6" fill="none" stroke-linecap="round"/>
  </svg>`;
}

function svgDoBau(tipo, tamanho) {
  const c = CORES_DOS_BAUS[tipo] || CORES_DOS_BAUS.madeira;
  const id = `bau-${tipo}-${(contadorDosDesenhosDeBau += 1)}`;
  return `<svg class="bau-svg bau-${tipo}" viewBox="0 0 120 112" width="${tamanho || 64}" height="${Math.round((tamanho || 64) * 0.93)}" aria-hidden="true">
    <defs>
      <linearGradient id="${id}-c" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${c.corpo[0]}"/><stop offset="1" stop-color="${c.corpo[1]}"/></linearGradient>
      <linearGradient id="${id}-t" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${c.tampa[0]}"/><stop offset="1" stop-color="${c.tampa[1]}"/></linearGradient>
      <linearGradient id="${id}-f" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${c.faixa[0]}"/><stop offset=".55" stop-color="${c.faixa[1]}"/><stop offset="1" stop-color="${c.faixa[0]}"/></linearGradient>
      <radialGradient id="${id}-l" cx=".5" cy="1" r=".9"><stop offset="0" stop-color="${c.luz}" stop-opacity=".95"/><stop offset="1" stop-color="${c.luz}" stop-opacity="0"/></radialGradient>
    </defs>
    <ellipse cx="60" cy="106" rx="46" ry="5" fill="#000" opacity=".3"/>
    <g class="bau-luz"><path d="M22 52 h76 l-8 -30 h-60z" fill="url(#${id}-l)"/></g>
    <g class="bau-corpo">
      <rect x="14" y="50" width="92" height="52" rx="7" fill="url(#${id}-c)"/>
      <path d="M14 62 h92" stroke="#000" stroke-opacity=".18" stroke-width="2"/>
      <path d="M14 80 h92" stroke="#000" stroke-opacity=".12" stroke-width="2"/>
      <rect x="24" y="50" width="10" height="52" fill="url(#${id}-f)"/>
      <rect x="86" y="50" width="10" height="52" fill="url(#${id}-f)"/>
      <rect x="14" y="94" width="92" height="8" rx="3" fill="url(#${id}-f)"/>
      <rect x="49" y="56" width="22" height="24" rx="4" fill="url(#${id}-f)"/>
      <path d="M60 63 a4 4 0 0 1 4 4 c0 2 -1.5 3 -2.5 3.6 l1 6.4 h-5 l1 -6.4 c-1 -.6 -2.5 -1.6 -2.5 -3.6 a4 4 0 0 1 4 -4z" fill="#2a1606" opacity=".8"/>
    </g>
    <g class="bau-tampa">
      <path d="M14 52 v-12 c0 -16 20 -26 46 -26 s46 10 46 26 v12z" fill="url(#${id}-t)"/>
      <path d="M20 40 c4 -10 20 -18 40 -18" stroke="#ffffff" stroke-opacity=".22" stroke-width="3" fill="none" stroke-linecap="round"/>
      <path d="M24 52 v-13 c0 -9 4 -15 10 -19 v32z" fill="url(#${id}-f)"/>
      <path d="M96 52 v-13 c0 -9 -4 -15 -10 -19 v32z" fill="url(#${id}-f)"/>
      <rect x="12" y="46" width="96" height="8" rx="3" fill="url(#${id}-f)"/>
      <path d="M52 46 h16 v8 a8 8 0 0 1 -16 0z" fill="url(#${id}-f)"/>
    </g>
  </svg>`;
}

function nomeDoBau(tipo) {
  return trDoBau({ ouro: 'Baú de ouro', prata: 'Baú de prata', madeira: 'Baú de madeira' }[tipo] || 'Baú');
}

async function chamarDosBaus(funcao, parametros) {
  const perfil = perfilDosBaus();
  if (!perfil) return null;
  const { data, error } = await supabaseCliente.rpc(funcao, Object.assign({ _pid: perfil.id }, parametros || {}));
  if (error) throw error;
  return data;
}

function desenharCaixaDeDesafios() {
  const lugar = document.getElementById('desafios-cartao');
  const dados = caixasDoDia.desafios;
  if (!lugar) return;
  if (!dados || !Array.isArray(dados.itens)) { lugar.hidden = true; return; }
  const feitos = dados.itens.filter((i) => i.feito).length;
  const bauFechado = dados.bau_id && caixasDoDia.mochila && (caixasDoDia.mochila.baus || []).some((b) => b.id === dados.bau_id);
  lugar.hidden = false;
  lugar.innerHTML = `
    <div class="desafios-topo">
      <strong>${trDoBau('Desafios do dia')}</strong>
      <span class="desafios-conta">${feitos}/${dados.itens.length}</span>
    </div>
    <ul class="desafios-lista">
      ${dados.itens.map((item) => {
        const info = DESAFIOS_DO_DIA[item.id] || { texto: item.id, icone: 'estrela' };
        const parte = Math.min(100, Math.round((Number(item.progresso) / Math.max(1, Number(item.meta))) * 100));
        return `<li><button type="button" class="desafio${item.feito ? ' feito' : ''}" data-ir="${info.ir}">
          <span class="desafio-icone">${iconeDoBau(item.feito ? 'check' : info.icone)}</span>
          <span class="desafio-textos"><strong>${trDoBau(info.texto)}</strong><span class="desafio-barra"><i style="width:${parte}%"></i></span></span>
          <span class="desafio-numero">${Math.min(item.progresso, item.meta)}/${item.meta}</span>
        </button></li>`;
      }).join('')}
    </ul>
    <div class="desafios-premio${dados.completo ? ' pronto' : ''}">
      <span class="desafios-premio-bau">${svgDoBau(dados.bau_tipo || 'madeira', 52)}</span>
      ${dados.completo && bauFechado
        ? `<button type="button" class="desafios-abrir" data-abrir-bau="${dados.bau_id}" data-tipo="${dados.bau_tipo}">${trDoBau('Abrir baú')}</button>`
        : `<span class="desafios-premio-texto">${dados.completo ? trDoBau('Baú aberto') : trDoBau('Complete os 3 para ganhar um baú')}</span>`}
    </div>`;
  lugar.querySelectorAll('[data-ir]').forEach((botao) => botao.addEventListener('click', () => irParaDesafio(botao.dataset.ir)));
  lugar.querySelectorAll('[data-abrir-bau]').forEach((botao) => botao.addEventListener('click', () => abrirBau(Number(botao.dataset.abrirBau), botao.dataset.tipo)));
}

function irParaDesafio(destino) {
  if (destino === 'terco') { if (typeof mudarDeView === 'function') mudarDeView('view-terco'); return; }
  if (destino === 'quiz') { if (typeof abrirQuizDaLumina === 'function') abrirQuizDaLumina(); return; }
  if (destino === 'oracoes') { if (typeof mudarDeView === 'function') mudarDeView('view-oracoes'); return; }
  if (destino === 'jogos') { if (typeof abrirJogos === 'function') abrirJogos(); return; }
  const continuar = document.querySelector('#trilhas-continuar button, #trilhas-continuar [role="button"]');
  if (continuar) continuar.click();
}

function minutosQueFaltam(ate) {
  const falta = new Date(ate).getTime() - Date.now();
  return falta > 0 ? Math.ceil(falta / 60000) : 0;
}

function desenharMochila() {
  const lugar = document.getElementById('mochila-cartao');
  const dados = caixasDoDia.mochila;
  if (!lugar) return;
  if (!dados) { lugar.hidden = true; return; }
  const baus = Array.isArray(dados.baus) ? dados.baus : [];
  const frascos = dados.frascos || {};
  const efeitos = dados.efeitos || {};
  const dobro = efeitos.fe_dobro ? minutosQueFaltam(efeitos.fe_dobro) : 0;
  lugar.hidden = false;
  lugar.innerHTML = `
    ${dobro ? `<p class="mochila-efeito">${svgDoFrasco('fe_dobro', 20)}<span>${trDoBau('Fé em dobro: {n} min', { n: dobro })}</span></p>` : ''}
    <div class="mochila-linha">
      <div class="mochila-baus">
        ${baus.length ? baus.slice(0, 4).map((b) => `<button type="button" class="mochila-bau" data-abrir-bau="${b.id}" data-tipo="${b.tipo}" aria-label="${escaparDoBau(nomeDoBau(b.tipo))}">${svgDoBau(b.tipo, 46)}</button>`).join('')
          : `<span class="mochila-vazio">${svgDoBau('madeira', 40)}</span>`}
        ${baus.length > 4 ? `<span class="mochila-mais">+${baus.length - 4}</span>` : ''}
      </div>
      <div class="mochila-frascos">
        ${Object.keys(FRASCOS_DE_AZEITE).map((tipo) => {
          const qtd = Number(frascos[tipo] || 0);
          return `<button type="button" class="mochila-frasco${qtd ? '' : ' vazio'}" data-frasco="${tipo}" aria-label="${escaparDoBau(trDoBau(FRASCOS_DE_AZEITE[tipo].nome))}">${svgDoFrasco(tipo, 34)}<b>${qtd}</b></button>`;
        }).join('')}
      </div>
    </div>`;
  lugar.querySelectorAll('[data-abrir-bau]').forEach((botao) => botao.addEventListener('click', () => abrirBau(Number(botao.dataset.abrirBau), botao.dataset.tipo)));
  lugar.querySelectorAll('[data-frasco]').forEach((botao) => botao.addEventListener('click', () => mostrarFrasco(botao.dataset.frasco)));
  clearTimeout(reloginhoDoFrasco);
  if (dobro) reloginhoDoFrasco = setTimeout(desenharMochila, 30000);
}

function escaparDoBau(texto) {
  return String(texto || '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

async function atualizarCaixasDoDia() {
  if (!perfilDosBaus()) {
    caixasDoDia = { desafios: null, mochila: null };
    desenharCaixaDeDesafios();
    desenharMochila();
    return;
  }
  try {
    const [desafios, mochila] = await Promise.all([chamarDosBaus('desafios_hoje'), chamarDosBaus('baus_meus')]);
    caixasDoDia = { desafios, mochila };
    if (desafios && desafios.bau_novo) {
      const atualizada = await chamarDosBaus('baus_meus');
      if (atualizada) caixasDoDia.mochila = atualizada;
      avisarDesafiosCompletos(desafios);
    }
  } catch (e) {
    caixasDoDia = { desafios: null, mochila: null };
  }
  desenharCaixaDeDesafios();
  desenharMochila();
}

function avisarDesafiosCompletos(dados) {
  const chave = `${dados.dia}:${dados.bau_id}`;
  if (desafiosJaAvisados.has(chave)) return;
  desafiosJaAvisados.add(chave);
  if (typeof mostrarAvisoTrilhas === 'function') mostrarAvisoTrilhas(trDoBau('Desafios do dia completos! Você ganhou um {bau}.', { bau: nomeDoBau(dados.bau_tipo).toLowerCase() }));
}

async function registrarDesafio(tipo) {
  if (!perfilDosBaus()) return;
  try {
    const desafios = await chamarDosBaus('desafio_registrar', { _tipo: tipo });
    if (!desafios) return;
    caixasDoDia.desafios = desafios;
    if (desafios.bau_novo) {
      caixasDoDia.mochila = await chamarDosBaus('baus_meus');
      avisarDesafiosCompletos(desafios);
    }
    desenharCaixaDeDesafios();
    desenharMochila();
  } catch (e) {
    return;
  }
}

function janelaDoBau(conteudo, classe) {
  fecharJanelaDoBau();
  const fundo = document.createElement('div');
  fundo.className = `bau-janela ${classe || ''}`;
  fundo.id = 'bau-janela';
  fundo.setAttribute('role', 'dialog');
  fundo.setAttribute('aria-modal', 'true');
  fundo.innerHTML = `<div class="bau-janela-caixa">${conteudo}</div>`;
  document.body.appendChild(fundo);
  requestAnimationFrame(() => fundo.classList.add('aberta'));
  fundo.addEventListener('click', (evento) => { if (evento.target === fundo && fundo.dataset.travada !== 'sim') fecharJanelaDoBau(); });
  return fundo;
}

let redesenharDepoisDoBau = false;

function fecharJanelaDoBau() {
  const atual = document.getElementById('bau-janela');
  if (atual) atual.remove();
  if (!redesenharDepoisDoBau) return;
  redesenharDepoisDoBau = false;
  atualizarCaixasDoDia();
  const trilhas = document.getElementById('view-trilhas');
  if (typeof renderizarTrilhas === 'function' && trilhas && trilhas.classList.contains('active')) renderizarTrilhas();
}

function tocarSomDoBau(tipo) {
  if (typeof somDaLiga !== 'function') return;
  try {
    if (tipo === 'abrir') somDaLiga('encaixe', 0, undefined, 0.6, 1.4);
    else somDaLiga('encaixe', 0, undefined, 0.35, 0.8);
  } catch (e) {
    return;
  }
}

async function abrirBau(id, tipo) {
  if (!id) return;
  const fundo = janelaDoBau(`
    <div class="bau-palco bau-${escaparDoBau(tipo)}">
      <span class="bau-raios" aria-hidden="true"></span>
      <div class="bau-desenho">${svgDoBau(tipo, 180)}</div>
      <div class="bau-premios" id="bau-premios"></div>
    </div>
    <strong class="bau-titulo">${escaparDoBau(nomeDoBau(tipo))}</strong>
    <button type="button" class="bau-botao" id="bau-botao" disabled>${trDoBau('Abrindo...')}</button>`, 'abrindo');
  fundo.dataset.travada = 'sim';
  const inicio = Date.now();
  let resultado = null;
  try {
    resultado = await chamarDosBaus('bau_abrir', { _id: id });
  } catch (e) {
    resultado = null;
  }
  const espera = Math.max(0, 1500 - (Date.now() - inicio));
  setTimeout(() => {
    if (!document.body.contains(fundo)) return;
    const botao = fundo.querySelector('#bau-botao');
    fundo.dataset.travada = 'nao';
    if (!resultado) {
      fundo.classList.remove('abrindo');
      if (botao) { botao.disabled = false; botao.textContent = trDoBau('Fechar'); botao.addEventListener('click', fecharJanelaDoBau); }
      const premios = fundo.querySelector('#bau-premios');
      if (premios) premios.innerHTML = `<p class="bau-erro">${trDoBau('Não deu para abrir agora. Tente de novo.')}</p>`;
      return;
    }
    tocarSomDoBau('abrir');
    fundo.classList.remove('abrindo');
    fundo.classList.add('aberto');
    const premios = fundo.querySelector('#bau-premios');
    const itens = [`<span class="bau-premio bau-premio-fe" style="--i:0">${typeof estrelaDaFe === 'function' ? estrelaDaFe('fe-grande') : iconeDoBau('estrela')}<b>+${Number(resultado.fe) || 0}</b><small>${trDoBau('de Fé')}</small></span>`]
      .concat((resultado.frascos || []).map((t, i) => `<span class="bau-premio" style="--i:${i + 1}">${svgDoFrasco(t, 46)}<small>${escaparDoBau(trDoBau((FRASCOS_DE_AZEITE[t] || {}).nome || t))}</small></span>`));
    if (premios) premios.innerHTML = itens.join('');
    if (botao) { botao.disabled = false; botao.textContent = trDoBau('Guardar'); botao.addEventListener('click', fecharJanelaDoBau); botao.focus({ preventScroll: true }); }
    const membro = typeof obterMembroAtivo === 'function' ? obterMembroAtivo() : null;
    if (membro && typeof membro.fe === 'number') membro.fe += Number(resultado.fe) || 0;
    if (typeof estadoEmMemoriaDaConta !== 'undefined' && estadoEmMemoriaDaConta && typeof estadoEmMemoriaDaConta.fe === 'number') estadoEmMemoriaDaConta.fe += Number(resultado.fe) || 0;
    redesenharDepoisDoBau = true;
  }, espera);
}

function mostrarFrasco(tipo) {
  const f = FRASCOS_DE_AZEITE[tipo];
  if (!f) return;
  const qtd = Number(((caixasDoDia.mochila || {}).frascos || {})[tipo] || 0);
  const passivo = tipo === 'protecao';
  const fundo = janelaDoBau(`
    <div class="frasco-detalhe">${svgDoFrasco(tipo, 96)}</div>
    <strong class="bau-titulo">${escaparDoBau(trDoBau('Frasco de azeite'))}: ${escaparDoBau(trDoBau(f.nome))}</strong>
    <p class="frasco-texto">${escaparDoBau(trDoBau(f.texto))}</p>
    <p class="frasco-quantos">${escaparDoBau(trDoBau(qtd === 1 ? 'Você tem 1' : 'Você tem {n}', { n: qtd }))}</p>
    <p class="frasco-aviso" id="frasco-aviso" aria-live="polite"></p>
    <div class="bau-botoes">
      ${!passivo && qtd > 0 ? `<button type="button" class="bau-botao" id="frasco-usar">${trDoBau('Usar agora')}</button>` : ''}
      <button type="button" class="bau-botao bau-botao-claro" id="frasco-fechar">${trDoBau('Fechar')}</button>
    </div>`, 'janela-frasco');
  fundo.querySelector('#frasco-fechar').addEventListener('click', fecharJanelaDoBau);
  const usar = fundo.querySelector('#frasco-usar');
  if (usar) usar.addEventListener('click', async () => {
    usar.disabled = true;
    const aviso = fundo.querySelector('#frasco-aviso');
    try {
      const mochila = await chamarDosBaus('frasco_usar', { _tipo: tipo });
      if (mochila) caixasDoDia.mochila = mochila;
      fundo.querySelector('.frasco-detalhe').classList.add('usado');
      tocarSomDoBau('abrir');
      if (tipo === 'santidade') {
        const membro = typeof obterMembroAtivo === 'function' ? obterMembroAtivo() : null;
        if (membro) membro.santidade = 15;
        if (typeof estadoEmMemoriaDaConta !== 'undefined' && estadoEmMemoriaDaConta) estadoEmMemoriaDaConta.santidade = 15;
        if (typeof renderizarTrilhas === 'function') renderizarTrilhas();
      }
      desenharMochila();
      setTimeout(fecharJanelaDoBau, 900);
    } catch (erro) {
      const texto = String((erro && erro.message) || '');
      if (aviso) aviso.textContent = texto.includes('santidade_cheia') ? trDoBau('Sua Santidade já está cheia.') : trDoBau('Não deu para usar agora. Tente de novo.');
      usar.disabled = false;
    }
  });
}

function iniciarBaus() {
  document.addEventListener('keydown', (evento) => {
    const janela = document.getElementById('bau-janela');
    if (evento.key === 'Escape' && janela && janela.dataset.travada !== 'sim') fecharJanelaDoBau();
  });
}

document.addEventListener('DOMContentLoaded', () => {
  if (typeof rodarComSeguranca === 'function') rodarComSeguranca('baus', iniciarBaus);
  else iniciarBaus();
});
