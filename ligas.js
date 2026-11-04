const CHAVE_DAS_LIGAS = 'lumina-sancti-liga';
const LIGAS_DA_FE = [
  { id: 'centelha', nome: 'Centelha', minimo: 0, claro: '#f3c9a0', cor: '#c4834f', escuro: '#6e3d1c', forma: 'medalha' },
  { id: 'chama', nome: 'Chama', minimo: 50, claro: '#ffd2a0', cor: '#e8803a', escuro: '#7a3510', forma: 'medalha' },
  { id: 'lamparina', nome: 'Lamparina', minimo: 150, claro: '#ffffff', cor: '#c8d0dc', escuro: '#5d6676', forma: 'medalha' },
  { id: 'vela', nome: 'Vela', minimo: 300, claro: '#ffffff', cor: '#dfe6ef', escuro: '#7a8597', forma: 'escudo' },
  { id: 'tocha', nome: 'Tocha', minimo: 600, claro: '#fff4c8', cor: '#e2b552', escuro: '#7a5212', forma: 'escudo' },
  { id: 'farol', nome: 'Farol', minimo: 1000, claro: '#fffbe0', cor: '#f6cf55', escuro: '#8a5a14', forma: 'escudo' },
  { id: 'estrela', nome: 'Estrela', minimo: 1600, claro: '#eaffff', cor: '#9fe3ef', escuro: '#2f7484', forma: 'asas' },
  { id: 'constelacao', nome: 'Constelação', minimo: 2500, claro: '#d8e6ff', cor: '#6f96ff', escuro: '#1f357f', forma: 'asas' },
  { id: 'aurora', nome: 'Aurora', minimo: 4000, claro: '#ffe1f4', cor: '#d985d6', escuro: '#5c2a6e', forma: 'asas' },
  { id: 'lumen', nome: 'Lumen', minimo: 6000, claro: '#ffffff', cor: '#fff1c2', escuro: '#d9a93f', forma: 'coroa' },
];
let contadorDeEmblemas = 0;

function textoDaLiga(texto, valores) {
  return typeof tr === 'function' ? tr(texto, valores) : String(texto).replace(/\{(\w+)\}/g, (_, chave) => (valores && valores[chave] !== undefined ? valores[chave] : ''));
}

function indiceDaLiga(fe) {
  const valor = Math.max(0, Number(fe) || 0);
  let indice = 0;
  LIGAS_DA_FE.forEach((liga, i) => { if (valor >= liga.minimo) indice = i; });
  return indice;
}

function emblemaDaLiga(indice, classe) {
  const liga = LIGAS_DA_FE[indice] || LIGAS_DA_FE[0];
  contadorDeEmblemas += 1;
  const g = `liga-${contadorDeEmblemas}`;
  const pontas = indice + 1;
  const estrela = (cx, cy, r) => {
    let d = '';
    for (let i = 0; i < 8; i += 1) {
      const a = (Math.PI / 4) * i - Math.PI / 2;
      const raio = i % 2 === 0 ? r : r * 0.42;
      d += `${i === 0 ? 'M' : 'L'}${(cx + Math.cos(a) * raio).toFixed(1)} ${(cy + Math.sin(a) * raio).toFixed(1)}`;
    }
    return `${d}Z`;
  };
  const fundo = {
    medalha: '<circle cx="60" cy="62" r="44"/>',
    escudo: '<path d="M60 14 L100 28 V62 C100 88 82 104 60 112 C38 104 20 88 20 62 V28 Z"/>',
    asas: '<path d="M60 12 L98 34 V78 L60 108 L22 78 V34 Z"/>',
    coroa: '<path d="M60 10 L100 32 V80 L60 110 L20 80 V32 Z"/>',
  }[liga.forma];
  const asas = liga.forma === 'asas' || liga.forma === 'coroa'
    ? `<g class="liga-asas" fill="url(#${g}-b)" stroke="${liga.escuro}" stroke-width="1.2"><path d="M22 52 C6 46 0 34 2 22 C12 30 18 32 24 34 Z"/><path d="M22 66 C4 64 -4 52 -2 40 C10 48 16 50 22 50 Z"/><path d="M98 52 C114 46 120 34 118 22 C108 30 102 32 96 34 Z"/><path d="M98 66 C116 64 124 52 122 40 C110 48 104 50 98 50 Z"/></g>`
    : '';
  const coroa = liga.forma === 'coroa' ? `<path d="M40 14 L46 2 L53 11 L60 -2 L67 11 L74 2 L80 14 Z" fill="url(#${g}-b)" stroke="${liga.escuro}" stroke-width="1.2"/>` : '';
  const pontinhos = Array.from({ length: Math.min(pontas, 5) }, (_, i) => `<circle cx="${60 + (i - (Math.min(pontas, 5) - 1) / 2) * 9}" cy="98" r="2.6" fill="${liga.claro}"/>`).join('');
  return `<svg class="liga-emblema ${classe || ''}" viewBox="-6 -6 132 128" aria-hidden="true">
    <defs>
      <linearGradient id="${g}-b" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${liga.claro}"/><stop offset=".5" stop-color="${liga.cor}"/><stop offset="1" stop-color="${liga.escuro}"/></linearGradient>
      <radialGradient id="${g}-c" cx="45%" cy="35%" r="70%"><stop offset="0" stop-color="${liga.claro}"/><stop offset=".55" stop-color="${liga.cor}"/><stop offset="1" stop-color="${liga.escuro}"/></radialGradient>
    </defs>
    ${asas}
    <g fill="url(#${g}-c)" stroke="${liga.escuro}" stroke-width="3">${fundo}</g>
    <g fill="none" stroke="${liga.claro}" stroke-width="1.5" opacity=".7" transform="translate(60 62) scale(.82) translate(-60 -62)">${fundo}</g>
    ${coroa}
    <path d="${estrela(60, 58, 26)}" fill="${liga.claro}" stroke="${liga.escuro}" stroke-width="1.5"/>
    <path d="${estrela(60, 58, 12)}" fill="${liga.cor}" opacity=".85"/>
    ${pontinhos}
    <path class="liga-brilho" d="M34 34 C42 26 52 22 62 21" fill="none" stroke="#fff" stroke-width="3.5" stroke-linecap="round" opacity=".6"/>
  </svg>`;
}

let feDaLigaAtual = 0;

function chaveDaLiga() {
  return typeof membroAtivo !== 'undefined' && membroAtivo && membroAtivo.id ? membroAtivo.id : 'aparelho';
}

function ligasGuardadas() {
  try { return JSON.parse(localStorage.getItem(CHAVE_DAS_LIGAS) || '{}') || {}; } catch (e) { return {}; }
}

function verificarSubidaDeLiga(fe, atraso) {
  const chave = chaveDaLiga();
  const agora = indiceDaLiga(fe);
  const guardadas = ligasGuardadas();
  const antes = guardadas[chave];
  guardadas[chave] = agora;
  try { localStorage.setItem(CHAVE_DAS_LIGAS, JSON.stringify(guardadas)); } catch (e) {}
  if (typeof antes !== 'number' || agora <= antes) return false;
  setTimeout(() => mostrarSubidaDeLiga(antes, agora, fe), atraso || 0);
  return true;
}

function htmlDaLigaAtual(fe) {
  const indice = indiceDaLiga(fe);
  const liga = LIGAS_DA_FE[indice];
  const proxima = LIGAS_DA_FE[indice + 1];
  const porcento = proxima ? Math.round(((fe - liga.minimo) / (proxima.minimo - liga.minimo)) * 100) : 100;
  return `
    <button type="button" class="liga-cartao" id="liga-cartao" style="--liga:${liga.cor};--liga-escura:${liga.escuro}">
      <span class="liga-cartao-emblema">${emblemaDaLiga(indice)}</span>
      <span class="liga-cartao-textos">
        <small>${textoDaLiga('Sua liga')}</small>
        <strong>${textoDaLiga(liga.nome)}</strong>
        <span class="liga-cartao-barra"><span style="width:${Math.max(4, Math.min(100, porcento))}%"></span></span>
        <small>${proxima ? textoDaLiga('Faltam {n} de Fé para {liga}', { n: proxima.minimo - fe, liga: textoDaLiga(proxima.nome) }) : textoDaLiga('Você está na liga mais alta!')}</small>
      </span>
    </button>`;
}

function abrirListaDeLigas() {
  if (typeof janelaDoCenaculo !== 'function') return;
  const atual = indiceDaLiga(feDaLigaAtual);
  janelaDoCenaculo(textoDaLiga('Ligas da Fé'), `
    <p class="cenaculo-explica">${textoDaLiga('Cada missão dá Fé. Junte Fé para subir de liga, da Centelha até o Lumen.')}</p>
    <div class="ligas-lista">${LIGAS_DA_FE.map((liga, i) => `
      <div class="liga-item${i === atual ? ' atual' : ''}${i > atual ? ' futura' : ''}" style="--liga:${liga.cor}">
        <span class="liga-item-emblema">${emblemaDaLiga(i)}</span>
        <span class="liga-item-textos"><strong>${textoDaLiga(liga.nome)}</strong><small>${textoDaLiga('A partir de {n} de Fé', { n: liga.minimo })}</small></span>
        ${i === atual ? `<span class="liga-item-voce">${textoDaLiga('Você')}</span>` : ''}
      </div>`).join('')}</div>`);
}

function colocarLigaNasTrilhas(fe) {
  const painel = document.getElementById('trilhas-stats');
  if (!painel || !painel.parentNode) return;
  let lugar = document.getElementById('trilhas-liga');
  if (!lugar) {
    lugar = document.createElement('div');
    lugar.id = 'trilhas-liga';
    painel.parentNode.insertBefore(lugar, painel.nextSibling);
  }
  feDaLigaAtual = Math.max(0, Number(fe) || 0);
  lugar.innerHTML = htmlDaLigaAtual(feDaLigaAtual);
  lugar.querySelector('#liga-cartao').addEventListener('click', abrirListaDeLigas);
  verificarSubidaDeLiga(feDaLigaAtual, 700);
}

function mostrarSubidaDeLiga(de, para, fe) {
  const antiga = LIGAS_DA_FE[de];
  const nova = LIGAS_DA_FE[para];
  if (!nova) return;
  const anterior = document.getElementById('liga-subida');
  if (anterior) anterior.remove();
  const tela = document.createElement('div');
  tela.id = 'liga-subida';
  tela.className = 'liga-subida';
  tela.style.setProperty('--liga', nova.cor);
  tela.style.setProperty('--liga-clara', nova.claro);
  tela.style.setProperty('--liga-escura', nova.escuro);
  const cacos = Array.from({ length: 14 }, (_, i) => `<i style="--a:${(i * 360) / 14}deg;--d:${80 + (i % 4) * 40}px"></i>`).join('');
  tela.innerHTML = `
    <div class="liga-subida-fundo"></div>
    <div class="liga-subida-feixes"></div>
    <div class="liga-subida-palco">
      <div class="liga-subida-antiga">${emblemaDaLiga(de)}</div>
      <span class="liga-subida-cacos">${cacos}</span>
      <div class="liga-subida-anel"></div><div class="liga-subida-anel segundo"></div>
      <div class="liga-subida-raios"></div>
      <div class="liga-subida-nova">${emblemaDaLiga(para)}</div>
    </div>
    <div class="liga-subida-textos">
      <small>${textoDaLiga('Nova liga!')}</small>
      <strong>${textoDaLiga(nova.nome)}</strong>
      <span>${textoDaLiga('Você subiu da liga {de} para a liga {para} com {n} de Fé.', { de: textoDaLiga(antiga.nome), para: textoDaLiga(nova.nome), n: fe })}</span>
      <button type="button" class="liga-subida-botao" id="liga-subida-continuar">${textoDaLiga('Continuar')}</button>
    </div>`;
  document.body.appendChild(tela);
  const fechar = () => { tela.classList.add('saindo'); setTimeout(() => tela.remove(), 400); };
  tela.querySelector('#liga-subida-continuar').addEventListener('click', fechar);
  setTimeout(() => { if (tela.isConnected && typeof tocarNotaDoJogo === 'function') [330, 392, 494].forEach((nota, i) => setTimeout(() => tocarNotaDoJogo(nota), i * 360)); }, 300);
  setTimeout(() => { if (tela.isConnected && typeof somDaLicao === 'function') somDaLicao('fim'); }, 1800);
  setTimeout(() => {
    if (!tela.isConnected || (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches)) return;
    for (let i = 0; i < 40; i += 1) {
      const papel = document.createElement('i');
      papel.className = 'liga-confete';
      papel.style.cssText = `left:${Math.random() * 100}%;--cor:${[nova.cor, nova.claro, '#fff1c2', '#f0cf7a'][i % 4]};--x:${(Math.random() - 0.5) * 160}px;--giro:${Math.random() * 720}deg;animation-delay:${Math.random() * 0.6}s;animation-duration:${2 + Math.random() * 1.5}s`;
      tela.appendChild(papel);
    }
  }, 2100);
}

function seloDaLigaNoRanking(fe) {
  const indice = indiceDaLiga(fe);
  return `<span class="ranking-liga" title="${textoDaLiga(LIGAS_DA_FE[indice].nome)}">${emblemaDaLiga(indice)}</span>`;
}

function htmlDoTopoDaLiga(indice) {
  const liga = LIGAS_DA_FE[indice] || LIGAS_DA_FE[0];
  return `<div class="ranking-liga-topo" style="--liga:${liga.cor}">${seloDaLigaNoRanking(liga.minimo)}<span><strong>${textoDaLiga('Liga {nome}', { nome: textoDaLiga(liga.nome) })}</strong><small>${textoDaLiga('Quem está na mesma liga que você.')}</small></span></div>`;
}
