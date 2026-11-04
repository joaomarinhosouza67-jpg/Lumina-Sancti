const CHAVE_DAS_LIGAS = 'lumina-sancti-liga-v3';
const CHAVE_DO_CELESTIAL = 'lumina-sancti-celestial';
const DIVISOES_DAS_LIGAS = ['V', 'IV', 'III', 'II', 'I'];
const METAIS_DAS_LIGAS = {
  bronze: ['#ffe2c6', '#d38d55', '#7a4220', '#f6c193'],
  prata: ['#ffffff', '#cdd5e0', '#6b7686', '#f1f4f8'],
  ouro: ['#fff7d6', '#f2c75c', '#8f5d12', '#ffe39a'],
  real: ['#fffdf2', '#ffe08a', '#b07a1e', '#fff3c4'],
};
const LIGAS_DA_FE = [
  { id: 'peregrino', nome: 'Peregrino', minimo: 0, matiz: 26, saturacao: 74, luz: 48, metal: 'bronze', forma: 'hexagono', simbolo: 'concha' },
  { id: 'discipulo', nome: 'Discípulo', minimo: 300, matiz: 204, saturacao: 42, luz: 64, metal: 'prata', forma: 'escudo', simbolo: 'peixe' },
  { id: 'missionario', nome: 'Missionário', minimo: 1000, matiz: 40, saturacao: 92, luz: 52, metal: 'ouro', forma: 'escudo', simbolo: 'chama', joias: true },
  { id: 'guardiao', nome: 'Guardião', minimo: 2500, matiz: 152, saturacao: 70, luz: 40, metal: 'ouro', forma: 'ogiva', simbolo: 'escudo', joias: true },
  { id: 'arauto', nome: 'Arauto', minimo: 5000, matiz: 214, saturacao: 86, luz: 52, metal: 'ouro', forma: 'ogiva', simbolo: 'trombeta', joias: true, asinhas: true },
  { id: 'luzeiro', nome: 'Luzeiro', minimo: 10000, matiz: 268, saturacao: 72, luz: 56, metal: 'ouro', forma: 'losango', simbolo: 'estrela', joias: true, ramos: true },
  { id: 'glorioso', nome: 'Glorioso', minimo: 18000, matiz: 352, saturacao: 82, luz: 46, metal: 'ouro', forma: 'ogiva', simbolo: 'coroa', joias: true, ramos: true, coroa: true },
  { id: 'serafico', nome: 'Seráfico', minimo: 30000, matiz: 192, saturacao: 64, luz: 74, metal: 'real', forma: 'losango', simbolo: 'serafim', joias: true, ramos: true, asas: true, seisAsas: true },
  { id: 'celestial', nome: 'Celestial', minimo: 50000, matiz: 46, saturacao: 100, luz: 72, metal: 'real', forma: 'ogiva', simbolo: 'cruz', joias: true, ramos: true, asas: true, aureola: true, coroa: true, prisma: true, secreto: true, semDivisoes: true },
].map((liga) => Object.assign(liga, {
  cor: `hsl(${liga.matiz}, ${liga.saturacao}%, ${liga.luz}%)`,
  claro: `hsl(${liga.matiz}, ${liga.saturacao}%, ${Math.min(92, liga.luz + 30)}%)`,
  escuro: `hsl(${liga.matiz}, ${liga.saturacao}%, ${Math.max(12, liga.luz - 32)}%)`,
}));
const FORMAS_DAS_LIGAS = {
  hexagono: [[100, 14], [166, 50], [166, 132], [100, 180], [34, 132], [34, 50]],
  escudo: [[100, 12], [140, 16], [166, 26], [166, 94], [156, 132], [130, 162], [100, 184], [70, 162], [44, 132], [34, 94], [34, 26], [60, 16]],
  ogiva: [[100, 8], [126, 20], [148, 42], [161, 68], [166, 96], [166, 180], [100, 180], [34, 180], [34, 96], [39, 68], [52, 42], [74, 20]],
  losango: [[100, 8], [136, 52], [172, 96], [136, 140], [100, 186], [64, 140], [28, 96], [64, 52]],
};
const PENAS_DAS_ASAS_DA_LIGA = ['M38 62 C16 54 4 38 0 16 C14 28 26 34 42 40Z', 'M36 90 C10 88 -6 72 -12 48 C4 60 18 64 38 66Z', 'M36 118 C10 122 -8 108 -18 86 C2 96 18 98 38 96Z', 'M40 144 C18 152 0 146 -12 128 C6 134 22 132 40 124Z'];
const COROA_DA_LIGA = 'M74 16 L80 -8 L91 6 L100 -14 L109 6 L120 -8 L126 16Z';
let contadorDeEmblemas = 0;
let modulo3dDaLiga = null;
let feDaLigaAtual = 0;
let temporizadoresDaTela = [];

function textoDaLiga(texto, valores) {
  return typeof tr === 'function' ? tr(texto, valores) : String(texto).replace(/\{(\w+)\}/g, (_, chave) => (valores && valores[chave] !== undefined ? valores[chave] : ''));
}

function escaparDaLiga(texto) {
  return String(texto || '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

function indiceDaLiga(fe) {
  const valor = Math.max(0, Number(fe) || 0);
  let indice = 0;
  LIGAS_DA_FE.forEach((liga, i) => { if (valor >= liga.minimo) indice = i; });
  return indice;
}

function limitesDaLiga(indice) {
  const liga = LIGAS_DA_FE[indice];
  const proxima = LIGAS_DA_FE[indice + 1];
  if (!proxima) return [0, 1, 2, 3, 4].map(() => liga.minimo).concat(Infinity);
  const passo = (proxima.minimo - liga.minimo) / 5;
  return [0, 1, 2, 3, 4].map((d) => Math.round(liga.minimo + passo * d)).concat(proxima.minimo);
}

function posicaoNaLiga(fe) {
  const valor = Math.max(0, Math.floor(Number(fe) || 0));
  const indice = indiceDaLiga(valor);
  const liga = LIGAS_DA_FE[indice];
  const limites = limitesDaLiga(indice);
  let divisao = 0;
  for (let d = 1; d < 5; d += 1) if (valor >= limites[d]) divisao = d;
  if (liga.semDivisoes) divisao = 4;
  const inicio = limites[divisao];
  const fim = limites[divisao + 1];
  const progresso = fim === Infinity ? 1 : (valor - inicio) / (fim - inicio);
  return { indice, divisao, nivel: indice * 5 + divisao, inicio, fim, progresso: Math.max(0, Math.min(1, progresso)), fe: valor, liga };
}

function posicaoDoNivel(nivel) {
  const indice = Math.max(0, Math.min(LIGAS_DA_FE.length - 1, Math.floor(nivel / 5)));
  return posicaoNaLiga(limitesDaLiga(indice)[Math.max(0, Math.min(4, nivel % 5))]);
}

function nomeDaDivisao(pos) {
  return pos.liga.semDivisoes ? textoDaLiga(pos.liga.nome) : `${textoDaLiga(pos.liga.nome)} ${DIVISOES_DAS_LIGAS[pos.divisao]}`;
}

function proximoPassoDaLiga(pos) {
  if (pos.fim === Infinity) return textoDaLiga('Você chegou ao rank mais alto de todos!');
  const seguinte = posicaoNaLiga(pos.fim);
  if (seguinte.liga.secreto) return textoDaLiga('Faltam {n} de Fé para um rank secreto...', { n: pos.fim - pos.fe });
  return textoDaLiga('Faltam {n} de Fé para {liga}', { n: pos.fim - pos.fe, liga: nomeDaDivisao(seguinte) });
}

function ruidoDaLiga(n, semente) {
  const x = Math.sin(n * 12.9898 + semente * 78.233) * 43758.5453;
  return x - Math.floor(x);
}

function facetasDaLiga(indice) {
  const liga = LIGAS_DA_FE[indice];
  const pontos = FORMAS_DAS_LIGAS[liga.forma];
  const centro = [100, 98];
  const n = pontos.length;
  const internos = pontos.map(([x, y], i) => {
    const f = 0.48 + ruidoDaLiga(i, indice) * 0.14;
    return [centro[0] + (x - centro[0]) * f + (ruidoDaLiga(i + 20, indice) - 0.5) * 8, centro[1] + (y - centro[1]) * f + (ruidoDaLiga(i + 40, indice) - 0.5) * 8];
  });
  const lista = [];
  pontos.forEach((p, i) => {
    const q = pontos[(i + 1) % n];
    const a = internos[i];
    const b = internos[(i + 1) % n];
    lista.push({ pts: [p, q, b], anel: 0 }, { pts: [p, b, a], anel: 1 }, { pts: [centro, a, b], anel: 2 });
  });
  return lista.map((faceta, k) => {
    const cx = faceta.pts.reduce((s, p) => s + p[0], 0) / 3;
    const cy = faceta.pts.reduce((s, p) => s + p[1], 0) / 3;
    const angulo = Math.atan2(cy - centro[1], cx - centro[0]);
    const luz = Math.cos(angulo + 2.2);
    const extra = faceta.anel === 2 ? 9 : (faceta.anel === 1 ? -5 : 0);
    const matiz = liga.prisma ? (((angulo * 180) / Math.PI + 360 + faceta.anel * 40) % 360) : liga.matiz;
    const saturacao = liga.prisma ? 78 : liga.saturacao;
    const base = liga.prisma ? 70 : liga.luz;
    const l = Math.max(8, Math.min(94, base + luz * 14 + extra + (ruidoDaLiga(k + 60, indice) - 0.5) * 12));
    const cinza = Math.max(10, Math.min(46, 24 + luz * 10 + (ruidoDaLiga(k + 80, indice) - 0.5) * 10));
    return Object.assign(faceta, {
      pontos: faceta.pts.map((p) => `${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' '),
      cor: `hsl(${matiz.toFixed(0)}, ${saturacao}%, ${l.toFixed(0)}%)`,
      aresta: `hsl(${matiz.toFixed(0)}, ${Math.min(100, saturacao + 10)}%, ${Math.min(97, l + 26).toFixed(0)}%)`,
      metal: `hsl(222, 9%, ${cinza.toFixed(0)}%)`,
      atraso: ((cx + cy) / 380) * 0.9 + ruidoDaLiga(k + 100, indice) * 0.18,
      dx: (cx - centro[0]) * 1.8 + (ruidoDaLiga(k + 120, indice) - 0.5) * 40,
      dy: (cy - centro[1]) * 1.8 + (ruidoDaLiga(k + 140, indice) - 0.5) * 40,
      giro: (ruidoDaLiga(k + 160, indice) - 0.5) * 220,
    });
  });
}

function estrelaDaLigaSvg(cx, cy, raio, miolo, pontas) {
  let d = '';
  for (let i = 0; i < pontas * 2; i += 1) {
    const a = (Math.PI / pontas) * i - Math.PI / 2;
    const r = i % 2 === 0 ? raio : miolo;
    d += `${i === 0 ? 'M' : 'L'}${(cx + Math.cos(a) * r).toFixed(1)} ${(cy + Math.sin(a) * r).toFixed(1)}`;
  }
  return `${d}Z`;
}

function simboloDaLiga(nome) {
  const raios = (cx, cy, r1, r2, de, ate, passos) => Array.from({ length: passos }, (_, i) => {
    const a = (de + ((ate - de) * i) / (passos - 1)) * (Math.PI / 180);
    return `M${(cx + Math.cos(a) * r1).toFixed(1)} ${(cy + Math.sin(a) * r1).toFixed(1)} L${(cx + Math.cos(a) * r2).toFixed(1)} ${(cy + Math.sin(a) * r2).toFixed(1)}`;
  }).join(' ');
  return {
    concha: { cheio: ['M100 130 C88 124 72 112 66 98 C60 82 70 62 100 58 C130 62 140 82 134 98 C128 112 112 124 100 130Z', 'M88 122 L78 134 H96Z', 'M112 122 L122 134 H104Z'], sulco: ['M100 126 L72 96 M100 126 L80 78 M100 126 L92 64 M100 126 L108 64 M100 126 L120 78 M100 126 L128 96'] },
    peixe: { cheio: ['M56 96 C76 70 112 70 128 92 L146 76 L141 96 L146 116 L128 100 C112 122 76 122 56 96Z'], escuro: ['M74 93 m-3.5 0 a3.5 3.5 0 1 0 7 0 a3.5 3.5 0 1 0 -7 0'], sulco: ['M92 84 C98 92 98 100 92 108'] },
    chama: { cheio: ['M100 50 C116 68 130 82 130 104 C130 122 116 134 100 134 C84 134 70 122 70 104 C70 90 80 80 86 72 C89 84 93 91 100 94 C97 80 95 66 100 50Z'], escuro: ['M100 100 C106 108 110 113 110 119 C110 126 105 130 100 130 C95 130 90 126 90 119 C90 113 94 108 100 100Z'] },
    escudo: { cheio: ['M100 54 L134 64 V96 C134 116 120 128 100 138 C80 128 66 116 66 96 V64 Z'], escuro: ['M96 70 H104 V88 H120 V96 H104 V122 H96 V96 H80 V88 H96Z'] },
    trombeta: { cheio: ['M60 118 L116 80 L122 88 L66 126Z', 'M112 76 C124 66 138 56 150 54 C150 66 142 80 128 92Z', 'M54 120 L64 114 L68 124 L58 128Z'], linha: ['M138 44 L144 34 M152 62 L164 58 M150 76 L162 80'] },
    estrela: { cheio: [estrelaDaLigaSvg(100, 95, 42, 14, 8)], escuro: [estrelaDaLigaSvg(100, 95, 12, 5, 4)] },
    coroa: { cheio: ['M62 118 L58 72 L80 92 L100 62 L120 92 L142 72 L138 118Z', 'M62 120 H138 V132 H62Z'], escuro: ['M80 126 m-4 0 a4 4 0 1 0 8 0 a4 4 0 1 0 -8 0', 'M100 126 m-4 0 a4 4 0 1 0 8 0 a4 4 0 1 0 -8 0', 'M120 126 m-4 0 a4 4 0 1 0 8 0 a4 4 0 1 0 -8 0'] },
    serafim: { cheio: ['M100 60 C110 74 116 84 116 96 C116 108 108 116 100 116 C92 116 84 108 84 96 C84 84 90 74 100 60Z', 'M92 82 C78 68 66 62 56 64 C64 74 74 82 90 90Z', 'M108 82 C122 68 134 62 144 64 C136 74 126 82 110 90Z', 'M86 98 C70 96 58 100 50 110 C62 112 74 110 88 104Z', 'M114 98 C130 96 142 100 150 110 C138 112 126 110 112 104Z', 'M92 112 C82 122 72 130 62 130 C68 120 80 114 92 108Z', 'M108 112 C118 122 128 130 138 130 C132 120 120 114 108 108Z'] },
    cruz: { cheio: ['M94 52 H106 V80 H128 V92 H106 V138 H94 V92 H72 V80 H94Z'], linha: [raios(100, 86, 32, 44, -180, 150, 12)] },
  }[nome] || { cheio: [] };
}

function folhasDoRamo(metal) {
  const ponto = (t) => {
    const p0 = [92, 198];
    const p1 = [58, 196];
    const p2 = [22, 176];
    const p3 = [14, 124];
    const u = 1 - t;
    return [u * u * u * p0[0] + 3 * u * u * t * p1[0] + 3 * u * t * t * p2[0] + t * t * t * p3[0], u * u * u * p0[1] + 3 * u * u * t * p1[1] + 3 * u * t * t * p2[1] + t * t * t * p3[1]];
  };
  let folhas = '';
  for (let i = 1; i <= 7; i += 1) {
    const t = i / 7.4;
    const [x, y] = ponto(t);
    const [x2, y2] = ponto(Math.min(1, t + 0.02));
    const angulo = (Math.atan2(y2 - y, x2 - x) * 180) / Math.PI;
    folhas += `<ellipse cx="${(x - 7).toFixed(1)}" cy="${(y - 2).toFixed(1)}" rx="9" ry="3.4" transform="rotate(${(angulo - 40).toFixed(0)} ${x.toFixed(1)} ${y.toFixed(1)})"/><ellipse cx="${(x + 7).toFixed(1)}" cy="${(y + 1).toFixed(1)}" rx="9" ry="3.4" transform="rotate(${(angulo + 40).toFixed(0)} ${x.toFixed(1)} ${y.toFixed(1)})"/>`;
  }
  return `<g fill="${metal}" stroke="#5a3a0c" stroke-width=".9"><path d="M92 198 C58 196 22 176 14 124" fill="none" stroke="${metal}" stroke-width="3"/>${folhas}</g>`;
}

function corpoDoSimboloDaLiga(liga, idDoBrilho) {
  const simbolo = simboloDaLiga(liga.simbolo);
  return [
    (simbolo.linha || []).map((d) => `<path d="${d}" fill="none" stroke="url(#${idDoBrilho})" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>`).join(''),
    (simbolo.cheio || []).map((d) => `<path d="${d}" fill="url(#${idDoBrilho})" stroke="${liga.escuro}" stroke-width="1.3" stroke-linejoin="round"/>`).join(''),
    (simbolo.sulco || []).map((d) => `<path d="${d}" fill="none" stroke="${liga.escuro}" stroke-width="2" stroke-linecap="round" opacity=".75"/>`).join(''),
    (simbolo.escuro || []).map((d) => `<path d="${d}" fill="${liga.escuro}" opacity=".85"/>`).join(''),
  ].join('');
}

function emblemaDaLiga(indice, opcoes) {
  const o = opcoes || {};
  const liga = LIGAS_DA_FE[indice] || LIGAS_DA_FE[0];
  contadorDeEmblemas += 1;
  const g = `liga-${contadorDeEmblemas}`;
  const metal = METAIS_DAS_LIGAS[liga.metal];
  const pontos = FORMAS_DAS_LIGAS[liga.forma];
  const contorno = `M${pontos.map((p) => p.join(' ')).join(' L')} Z`;
  const facetas = facetasDaLiga(indice);
  const pedestal = o.pedestal !== false;
  const simbolo = simboloDaLiga(liga.simbolo);
  const asa = `<g fill="url(#${g}-m)" stroke="#5a3a0c" stroke-width="1.2">${PENAS_DAS_ASAS_DA_LIGA.map((d) => `<path d="${d}"/>`).join('')}</g>`;
  const asaDeCima = `<g transform="translate(46 30) rotate(-38) scale(.62) translate(-38 -60)">${asa}</g>`;
  const umLado = [liga.asas ? asa : '', liga.seisAsas ? asaDeCima : '', liga.asinhas ? `<g transform="translate(36 92) scale(.7) translate(-36 -92)">${asa}</g>` : ''].join('');
  const brilhoDoSimbolo = [
    (simbolo.linha || []).map((d) => `<path d="${d}" fill="none" stroke="${liga.claro}" stroke-width="10" stroke-linecap="round"/>`).join(''),
    (simbolo.cheio || []).map((d) => `<path d="${d}" fill="${liga.claro}" stroke="${liga.claro}" stroke-width="8" stroke-linejoin="round"/>`).join(''),
  ].join('');
  const joias = liga.joias ? pontos.filter((_, i) => i % 2 === 0).map(([x, y]) => `<circle cx="${x}" cy="${y}" r="6" fill="url(#${g}-j)" stroke="url(#${g}-m)" stroke-width="1.8"/><circle cx="${x - 1.8}" cy="${y - 2}" r="1.6" fill="#fff" opacity=".85"/>`).join('') : '';
  const divisao = o.divisao !== undefined && !liga.semDivisoes;
  return `<svg class="liga-emblema ${liga.prisma ? 'prisma' : ''} ${o.classe || ''}" viewBox="${pedestal ? '-22 -26 244 266' : '-22 -26 244 230'}" aria-hidden="true">
    <defs>
      <linearGradient id="${g}-m" x1="0" y1="0" x2=".6" y2="1"><stop offset="0" stop-color="${metal[0]}"/><stop offset=".35" stop-color="${metal[1]}"/><stop offset=".7" stop-color="${metal[2]}"/><stop offset="1" stop-color="${metal[3]}"/></linearGradient>
      <linearGradient id="${g}-s" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="${liga.claro}"/></linearGradient>
      <linearGradient id="${g}-b" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".5"/><stop offset=".42" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".25"/></linearGradient>
      <linearGradient id="${g}-v" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".5" stop-color="#fff" stop-opacity=".75"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>
      <radialGradient id="${g}-j" cx="35%" cy="35%" r="70%"><stop offset="0" stop-color="#ffffff"/><stop offset=".35" stop-color="${liga.claro}"/><stop offset="1" stop-color="${liga.escuro}"/></radialGradient>
      <radialGradient id="${g}-h" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="${liga.claro}" stop-opacity=".75"/><stop offset="1" stop-color="${liga.claro}" stop-opacity="0"/></radialGradient>
      <filter id="${g}-f" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="4"/></filter>
      <clipPath id="${g}-c"><path d="${contorno}"/></clipPath>
    </defs>
    ${liga.aureola ? `<circle cx="100" cy="96" r="116" fill="url(#${g}-h)"/><circle cx="100" cy="96" r="104" fill="none" stroke="url(#${g}-m)" stroke-width="3.4"/><path d="${Array.from({ length: 32 }, (_, i) => { const a = (i * 11.25 * Math.PI) / 180; const r2 = i % 2 ? 112 : 122; return `M${(100 + Math.cos(a) * 106).toFixed(1)} ${(96 + Math.sin(a) * 106).toFixed(1)} L${(100 + Math.cos(a) * r2).toFixed(1)} ${(96 + Math.sin(a) * r2).toFixed(1)}`; }).join(' ')}" stroke="url(#${g}-m)" stroke-width="3" stroke-linecap="round"/>` : ''}
    ${umLado ? `${umLado}<g transform="translate(200 0) scale(-1 1)">${umLado}</g>` : ''}
    ${pedestal ? `<g class="liga-pedestal"><path d="M88 182 L93 200 H107 L112 182Z" fill="url(#${g}-m)" stroke="#2a1a06" stroke-width="1"/><path d="M68 200 H132 L142 218 H58Z" fill="#1d2233" stroke="url(#${g}-m)" stroke-width="2.6" stroke-linejoin="round"/><path d="M50 218 H150 L156 232 H44Z" fill="#141826" stroke="url(#${g}-m)" stroke-width="2.6" stroke-linejoin="round"/><path d="${estrelaDaLigaSvg(100, 209, 6.5, 2.4, 4)}" fill="url(#${g}-m)"/></g>` : ''}
    ${liga.ramos ? `${folhasDoRamo(`url(#${g}-m)`)}<g transform="translate(200 0) scale(-1 1)">${folhasDoRamo(`url(#${g}-m)`)}</g>` : ''}
    <path d="${contorno}" fill="none" stroke="${liga.cor}" stroke-width="22" stroke-linejoin="round" opacity=".35" filter="url(#${g}-f)"/>
    <g clip-path="url(#${g}-c)">
      <rect x="20" y="0" width="160" height="200" fill="${liga.escuro}"/>
      ${o.cinema ? `<g class="liga-metal">${facetas.map((f) => `<polygon points="${f.pontos}" fill="${f.metal}" stroke="#596173" stroke-width=".7"/>`).join('')}</g>` : ''}
      <g class="liga-cristal">${facetas.map((f) => `<polygon class="liga-faceta" points="${f.pontos}" fill="${f.cor}" stroke="${f.aresta}" stroke-width=".8" stroke-opacity=".6"${o.cinema ? ` data-estilo="--d:${f.atraso.toFixed(2)}s;--dx:${f.dx.toFixed(0)}px;--dy:${f.dy.toFixed(0)}px;--r:${f.giro.toFixed(0)}deg"` : ''}/>`).join('')}</g>
      <path class="liga-brilho-vidro" d="${contorno}" fill="url(#${g}-b)"/>
      <g transform="skewX(-18)"><rect class="liga-varredura" x="-90" y="-20" width="46" height="260" fill="url(#${g}-v)"/></g>
    </g>
    <path d="${contorno}" fill="none" stroke="#1b1206" stroke-width="13" stroke-linejoin="round" opacity=".55"/>
    <path d="${contorno}" fill="none" stroke="url(#${g}-m)" stroke-width="9" stroke-linejoin="round"/>
    <path d="${contorno}" fill="none" stroke="${metal[0]}" stroke-width="1.4" stroke-linejoin="round" opacity=".85" transform="translate(100 98) scale(.952) translate(-100 -98)"/>
    ${joias}
    ${o.cinema ? `<path class="liga-energia liga-energia-larga" d="${contorno}" pathLength="100" fill="none" stroke="${liga.claro}" stroke-width="12" stroke-linecap="round" stroke-linejoin="round" filter="url(#${g}-f)"/><path class="liga-energia" d="${contorno}" pathLength="100" fill="none" stroke="#fff" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/>` : ''}
    ${liga.coroa ? `<path d="${COROA_DA_LIGA}" fill="url(#${g}-m)" stroke="#5a3a0c" stroke-width="1.3" stroke-linejoin="round"/><circle cx="100" cy="4" r="3.6" fill="url(#${g}-j)"/><circle cx="84" cy="8" r="2.6" fill="url(#${g}-j)"/><circle cx="116" cy="8" r="2.6" fill="url(#${g}-j)"/>` : ''}
    <g class="liga-simbolo"><g opacity=".55" filter="url(#${g}-f)">${brilhoDoSimbolo}</g>${corpoDoSimboloDaLiga(liga, `${g}-s`)}</g>
    ${divisao ? `<g class="liga-placa"><path d="M74 146 H126 L133 157 L126 168 H74 L67 157Z" fill="url(#${g}-m)" stroke="#3a2608" stroke-width="1.4" stroke-linejoin="round"/><text x="100" y="163.5" text-anchor="middle" font-family="Cinzel, Georgia, serif" font-weight="700" font-size="16" fill="#2e1d05">${DIVISOES_DAS_LIGAS[o.divisao]}</text></g>` : ''}
    ${liga.semDivisoes && o.divisao !== undefined ? `<path d="${estrelaDaLigaSvg(100, 158, 11, 4, 4)}" fill="url(#${g}-m)" stroke="#3a2608" stroke-width="1"/>` : ''}
  </svg>`;
}

function rosaceaDaLiga(liga, completa) {
  const petalas = 12;
  let desenho = '';
  for (let i = 0; i < petalas; i += 1) {
    const matiz = liga.prisma ? (liga.matiz + i * 30) % 360 : liga.matiz;
    desenho += `<g transform="rotate(${i * (360 / petalas)} 100 100)"><path d="M100 98 L91 38 C91 24 109 24 109 38 Z" fill="hsl(${matiz}, ${liga.prisma ? 80 : liga.saturacao}%, ${30 + (i % 2) * 16}%)" stroke="#d9b45a" stroke-width="1.6"/><circle cx="100" cy="17" r="7" fill="hsl(${matiz}, ${liga.prisma ? 80 : liga.saturacao}%, 58%)" stroke="#d9b45a" stroke-width="1.4"/></g>`;
  }
  return `<svg ${completa ? 'xmlns="http://www.w3.org/2000/svg" width="512" height="512" ' : ''}viewBox="0 0 200 200" aria-hidden="true"><circle cx="100" cy="100" r="97" fill="#0a0c20" stroke="#d9b45a" stroke-width="3"/>${desenho}<circle cx="100" cy="100" r="78" fill="none" stroke="#d9b45a" stroke-width="1.2" opacity=".7"/><circle cx="100" cy="100" r="16" fill="hsl(${liga.matiz}, ${liga.saturacao}%, 62%)" stroke="#d9b45a" stroke-width="2"/><path d="${estrelaDaLigaSvg(100, 100, 10, 3.5, 4)}" fill="#fff6d8"/></svg>`;
}

function svgDoSimboloDaLiga(indice, divisao) {
  const liga = LIGAS_DA_FE[indice] || LIGAS_DA_FE[0];
  const metal = METAIS_DAS_LIGAS[liga.metal];
  const placa = liga.semDivisoes
    ? `<path d="${estrelaDaLigaSvg(100, 158, 11, 4, 4)}" fill="url(#m)" stroke="#3a2608" stroke-width="1"/>`
    : `<path d="M74 146 H126 L133 157 L126 168 H74 L67 157Z" fill="url(#m)" stroke="#3a2608" stroke-width="1.4" stroke-linejoin="round"/><text x="100" y="163.5" text-anchor="middle" font-family="Georgia, serif" font-weight="700" font-size="16" fill="#2e1d05">${DIVISOES_DAS_LIGAS[divisao]}</text>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="512" height="512"><defs><linearGradient id="s" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="${liga.claro}"/></linearGradient><linearGradient id="m" x1="0" y1="0" x2=".6" y2="1"><stop offset="0" stop-color="${metal[0]}"/><stop offset=".35" stop-color="${metal[1]}"/><stop offset=".7" stop-color="${metal[2]}"/><stop offset="1" stop-color="${metal[3]}"/></linearGradient></defs>${corpoDoSimboloDaLiga(liga, 's')}${placa}</svg>`;
}

function carregar3dDaLiga() {
  if (!modulo3dDaLiga) modulo3dDaLiga = import('./ligas-3d.js').catch(() => { modulo3dDaLiga = null; return null; });
  return modulo3dDaLiga;
}

function dadosDoCinema3d(pos) {
  const liga = pos.liga;
  return {
    pontos: FORMAS_DAS_LIGAS[liga.forma], facetas: facetasDaLiga(pos.indice), cor: liga.cor, claro: liga.claro, escuro: liga.escuro, metal: liga.metal, pedestal: true,
    asas: liga.asas || liga.asinhas ? PENAS_DAS_ASAS_DA_LIGA : null, escalaDasAsas: liga.asinhas ? 0.7 : 1, coroa: liga.coroa ? COROA_DA_LIGA : null, ramos: !!liga.ramos, aureola: !!liga.aureola, prisma: !!liga.prisma,
    svgDoSimbolo: svgDoSimboloDaLiga(pos.indice, pos.divisao), svgDaRosacea: rosaceaDaLiga(liga, true),
  };
}

function chaveDaLiga() {
  return typeof membroAtivo !== 'undefined' && membroAtivo && membroAtivo.id ? membroAtivo.id : 'aparelho';
}

function lerDaLiga(chave) {
  try { return JSON.parse(localStorage.getItem(chave) || '{}') || {}; } catch (e) { return {}; }
}

function gravarNaLiga(chave, valor) {
  try { localStorage.setItem(chave, JSON.stringify(valor)); } catch (e) {}
}

function menosMovimentoNaLiga() {
  return !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
}

function esperarOVooDaLumi(funcao) {
  let tentativas = 0;
  const tentar = () => {
    if (document.getElementById('lumi-voo') && tentativas < 30) { tentativas += 1; setTimeout(tentar, 300); return; }
    funcao();
  };
  tentar();
}

function trilhasNaFrente() {
  const vista = document.getElementById('view-trilhas');
  return !vista || vista.classList.contains('active');
}

function verificarSubidaDeLiga(fe, atraso) {
  const chave = chaveDaLiga();
  const pos = posicaoNaLiga(fe);
  const antes = lerDaLiga(CHAVE_DAS_LIGAS)[chave];
  const primeiraVezNoCelestial = pos.liga.secreto && !lerDaLiga(CHAVE_DO_CELESTIAL)[chave];
  const registrar = () => {
    const guardadas = lerDaLiga(CHAVE_DAS_LIGAS);
    guardadas[chave] = pos.nivel;
    gravarNaLiga(CHAVE_DAS_LIGAS, guardadas);
    if (pos.liga.secreto) {
      const celestiais = lerDaLiga(CHAVE_DO_CELESTIAL);
      celestiais[chave] = true;
      gravarNaLiga(CHAVE_DO_CELESTIAL, celestiais);
    }
  };
  const subiu = typeof antes === 'number' && pos.nivel > antes;
  if (!subiu && !primeiraVezNoCelestial) { registrar(); return false; }
  const mudouDeLiga = subiu && Math.floor(pos.nivel / 5) > Math.floor(antes / 5);
  setTimeout(() => esperarOVooDaLumi(() => {
    if (!trilhasNaFrente() || document.getElementById('liga-tela')) return;
    registrar();
    if (menosMovimentoNaLiga()) {
      if (typeof mostrarAvisoTrilhas === 'function') mostrarAvisoTrilhas(textoDaLiga(mudouDeLiga || primeiraVezNoCelestial ? 'Nova liga: {liga}!' : 'Você subiu para {liga}!', { liga: nomeDaDivisao(pos) }));
      return;
    }
    if (mudouDeLiga) mostrarSubidaDeLiga(antes, pos.nivel, fe);
    else if (subiu) mostrarSubidaDeDivisao(antes, pos.nivel, fe);
    else mostrarParabensDoCelestial(fe);
  }), atraso || 0);
  return true;
}

function aplicarEstilosDaLiga(raiz) {
  raiz.querySelectorAll('[data-estilo]').forEach((el) => {
    if (el.style) el.style.cssText += `;${el.dataset.estilo}`;
    el.removeAttribute('data-estilo');
  });
}

function pintarComALiga(el, liga) {
  el.style.setProperty('--liga', liga.cor);
  el.style.setProperty('--liga-clara', liga.claro);
  el.style.setProperty('--liga-escura', liga.escuro);
}

function estiloDaLiga(liga) {
  return `--liga:${liga.cor};--liga-clara:${liga.claro};--liga-escura:${liga.escuro}`;
}

function htmlDaLigaAtual(fe) {
  const pos = posicaoNaLiga(fe);
  return `
    <button type="button" class="liga-cartao${pos.liga.secreto ? ' celestial' : ''}" id="liga-cartao" style="${estiloDaLiga(pos.liga)}">
      <span class="liga-cartao-emblema">${emblemaDaLiga(pos.indice, { pedestal: false })}</span>
      <span class="liga-cartao-textos">
        <small>${textoDaLiga(pos.liga.secreto ? 'Rank secreto' : 'Sua liga')}</small>
        <strong>${nomeDaDivisao(pos)}</strong>
        <span class="liga-cartao-barra"><span style="width:${Math.max(4, Math.round(pos.progresso * 100))}%"></span></span>
        <small>${proximoPassoDaLiga(pos)}</small>
      </span>
    </button>`;
}

function cartaoDaLigaNoPerfil(fe, dono) {
  const pos = posicaoNaLiga(fe);
  return `
    <button type="button" class="liga-perfil${pos.liga.secreto ? ' celestial' : ''}" data-liga-fe="${pos.fe}" data-liga-dono="${escaparDaLiga(dono || '')}" style="${estiloDaLiga(pos.liga)}">
      <span class="liga-perfil-emblema">${emblemaDaLiga(pos.indice, { pedestal: false })}</span>
      <span class="liga-perfil-textos"><small>${textoDaLiga(pos.liga.secreto ? 'Rank secreto' : 'Liga')}</small><strong>${nomeDaDivisao(pos)}</strong><small>${textoDaLiga('{n} de Fé no total', { n: pos.fe })}</small></span>
      <span class="liga-perfil-ver">${textoDaLiga('Ver liga')}</span>
    </button>`;
}

function abrirListaDeLigas(fe) {
  if (typeof janelaDoCenaculo !== 'function') return;
  const atual = posicaoNaLiga(fe !== undefined ? fe : feDaLigaAtual);
  janelaDoCenaculo(textoDaLiga('Ligas da Fé'), `
    <p class="cenaculo-explica">${textoDaLiga('Cada missão dá Fé, que é o seu XP. Junte Fé para subir de divisão e de liga. Cada liga tem 5 divisões: V, IV, III, II e I.')}</p>
    <div class="ligas-lista">${LIGAS_DA_FE.map((liga, i) => {
      const escondida = liga.secreto && i > atual.indice;
      return `
      <div class="liga-item${i === atual.indice ? ' atual' : ''}${i > atual.indice ? ' futura' : ''}${escondida ? ' secreta' : ''}" style="--liga:${liga.cor}">
        <span class="liga-item-emblema">${escondida ? '<span class="liga-item-segredo">?</span>' : emblemaDaLiga(i, { pedestal: false })}</span>
        <span class="liga-item-textos"><strong>${escondida ? '???' : textoDaLiga(liga.nome)}</strong><small>${escondida ? textoDaLiga('Rank secreto') : textoDaLiga('A partir de {n} de Fé', { n: liga.minimo.toLocaleString('pt-BR') })}</small></span>
        ${i === atual.indice ? `<span class="liga-item-voce">${liga.semDivisoes ? textoDaLiga('Você') : DIVISOES_DAS_LIGAS[atual.divisao]}</span>` : ''}
      </div>`;
    }).join('')}</div>`);
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
  lugar.querySelector('#liga-cartao').addEventListener('click', () => abrirTelaDaLiga(feDaLigaAtual));
  verificarSubidaDeLiga(feDaLigaAtual, 700);
  const pos = posicaoNaLiga(feDaLigaAtual);
  if ((pos.divisao === 4 || pos.liga.secreto) && !menosMovimentoNaLiga()) setTimeout(carregar3dDaLiga, 2500);
}

function agendarNaTela(funcao, ms) {
  temporizadoresDaTela.push(setTimeout(funcao, ms));
}

function fecharTelaDaLiga(imediato) {
  temporizadoresDaTela.forEach(clearTimeout);
  temporizadoresDaTela = [];
  const tela = document.getElementById('liga-tela');
  if (!tela) return;
  if (tela.pararCena3d) tela.pararCena3d();
  document.removeEventListener('keydown', teclaDaTelaDaLiga);
  if (imediato) { tela.remove(); return; }
  tela.classList.add('saindo');
  setTimeout(() => tela.remove(), 380);
}

function teclaDaTelaDaLiga(evento) {
  if (evento.key === 'Escape') fecharTelaDaLiga();
}

function numerosDaLiga(pos, progresso) {
  if (pos.fim === Infinity) return textoDaLiga('{n} de Fé', { n: pos.fe.toLocaleString('pt-BR') });
  return `${Math.round(progresso * (pos.fim - pos.inicio))} / ${pos.fim - pos.inicio}`;
}

function preencherTelaDaLiga(tela, pos, opcoes) {
  const o = opcoes || {};
  pintarComALiga(tela, pos.liga);
  tela.classList.toggle('celestial', !!pos.liga.secreto);
  const nome = tela.querySelector('.liga-tela-nome');
  nome.innerHTML = `<span>${escaparDaLiga(textoDaLiga(pos.liga.nome))}</span>${pos.liga.semDivisoes ? '' : ` <b>${DIVISOES_DAS_LIGAS[pos.divisao]}</b>`}`;
  nome.classList.toggle('longo', textoDaLiga(pos.liga.nome).length > 9);
  const pips = tela.querySelector('.liga-tela-pips');
  pips.classList.remove('cheias');
  pips.hidden = !!pos.liga.semDivisoes;
  pips.innerHTML = [0, 1, 2, 3, 4].map((d) => `<i class="${d <= pos.divisao ? 'acesa' : ''}${o.pipNovo === d ? ' nova' : ''}"></i>`).join('');
  tela.querySelector('.liga-tela-rosacea').innerHTML = rosaceaDaLiga(pos.liga);
  if (!o.manterEmblema) tela.querySelector('.liga-tela-emblema').innerHTML = `<div class="liga-tela-emblema-um">${emblemaDaLiga(pos.indice, { divisao: pos.divisao, classe: 'grande' })}</div>`;
  const progresso = o.progresso !== undefined ? o.progresso : pos.progresso;
  tela.querySelector('.liga-tela-barra-cheia').style.width = `${Math.round(progresso * 100)}%`;
  tela.querySelector('.liga-tela-numeros').textContent = numerosDaLiga(pos, progresso);
  tela.querySelector('.liga-tela-texto').textContent = o.texto || proximoPassoDaLiga(pos);
}

function abrirTelaDaLiga(fe, opcoes) {
  const o = opcoes || {};
  fecharTelaDaLiga(true);
  const pos = posicaoNaLiga(fe);
  const tela = document.createElement('div');
  tela.id = 'liga-tela';
  tela.className = `liga-tela${o.animando ? ' animando' : ''}`;
  tela.dataset.fe = String(pos.fe);
  tela.dataset.dono = o.dono || '';
  const poeira = Array.from({ length: 26 }, (_, i) => `<i data-estilo="left:${(ruidoDaLiga(i, 7) * 100).toFixed(1)}%;--d:${(ruidoDaLiga(i, 9) * 9).toFixed(1)}s;--t:${(7 + ruidoDaLiga(i, 11) * 8).toFixed(1)}s;--s:${(1 + ruidoDaLiga(i, 13) * 2.5).toFixed(1)}px"></i>`).join('');
  const colunas = `<svg viewBox="0 0 400 700" preserveAspectRatio="xMidYMax slice"><defs><linearGradient id="liga-coluna" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#0d1130"/><stop offset=".45" stop-color="#2a2f55"/><stop offset="1" stop-color="#0a0d26"/></linearGradient></defs>${[[8, 1], [62, 0.82], [338, 0.82], [392, 1]].map(([x, s]) => `<g transform="translate(${x} 700) scale(${x < 200 ? s : -s} ${s}) translate(${x < 200 ? 0 : 0} -700)"><rect x="-18" y="120" width="36" height="580" fill="url(#liga-coluna)"/><path d="M-18 120 C-18 60 40 20 90 0" fill="none" stroke="#2a2f55" stroke-width="10"/><rect x="-24" y="660" width="48" height="40" fill="#151a3d"/></g>`).join('')}<path d="M0 700 L120 520 H280 L400 700Z" fill="url(#liga-chao)" opacity=".7"/><defs><linearGradient id="liga-chao" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1a1f48" stop-opacity="0"/><stop offset="1" stop-color="#1a1f48"/></linearGradient></defs></svg>`;
  const setas = Array.from({ length: 4 }, (_, i) => `<i data-estilo="--i:${i}"></i>`).join('');
  tela.innerHTML = `
    <div class="liga-tela-fundo" aria-hidden="true"><span class="liga-tela-colunas">${colunas}</span><span class="liga-tela-feixe"></span><span class="liga-tela-feixe dois"></span><span class="liga-tela-nevoa"></span><span class="liga-tela-poeira">${poeira}</span></div>
    <div class="liga-tela-conteudo" role="dialog" aria-modal="true" aria-label="${escaparDaLiga(textoDaLiga('Ligas da Fé'))}">
      <small class="liga-tela-dono">${o.dono ? escaparDaLiga(textoDaLiga('Liga de {nome}', { nome: o.dono })) : escaparDaLiga(textoDaLiga('Sua liga'))}</small>
      <small class="liga-tela-rotulo"></small>
      <h2 class="liga-tela-nome"></h2>
      <div class="liga-tela-pips"></div>
      <div class="liga-tela-palco">
        <span class="liga-tela-rosacea"></span>
        <span class="liga-tela-raios"></span>
        <span class="liga-tela-brilho"></span>
        <span class="liga-tela-setas">${setas}</span>
        <span class="liga-tela-anel"></span><span class="liga-tela-anel segundo"></span>
        <button type="button" class="liga-tela-emblema" aria-label="${escaparDaLiga(textoDaLiga('Ver a animação da liga'))}"></button>
      </div>
      <small class="liga-tela-dica">${escaparDaLiga(textoDaLiga('Toque no emblema para ver a animação'))}</small>
      <div class="liga-tela-barra"><span class="liga-tela-barra-fundo"><span class="liga-tela-barra-cheia"></span><span class="liga-tela-barra-clarao"></span></span><small class="liga-tela-numeros"></small></div>
      <p class="liga-tela-texto"></p>
      <div class="liga-tela-botoes">
        <button type="button" class="liga-tela-botao" data-acao="fechar">${escaparDaLiga(textoDaLiga('Continuar'))}</button>
        <button type="button" class="liga-tela-link" data-acao="lista">${escaparDaLiga(textoDaLiga('Ver todas as ligas'))}</button>
      </div>
    </div>
    <div class="liga-cinema" aria-hidden="true"></div>
    <span class="liga-rasgo" aria-hidden="true"></span>`;
  aplicarEstilosDaLiga(tela);
  document.body.appendChild(tela);
  preencherTelaDaLiga(tela, pos);
  tela.querySelector('[data-acao="fechar"]').addEventListener('click', () => fecharTelaDaLiga());
  tela.querySelector('[data-acao="lista"]').addEventListener('click', () => { fecharTelaDaLiga(true); abrirListaDeLigas(pos.fe); });
  tela.querySelector('.liga-tela-fundo').addEventListener('click', () => { if (tela.classList.contains('pronta')) fecharTelaDaLiga(); });
  tela.querySelector('.liga-tela-emblema').addEventListener('click', () => {
    if (!tela.classList.contains('pronta') || menosMovimentoNaLiga()) return;
    reverAnimacaoDaLiga(Number(tela.dataset.fe) || 0, tela.dataset.dono);
  });
  document.addEventListener('keydown', teclaDaTelaDaLiga);
  if (!o.animando) requestAnimationFrame(() => tela.classList.add('pronta'));
  return tela;
}

function tocarSubidaDaLiga(notas, espaco) {
  if (typeof tocarNotaDoJogo !== 'function') return;
  notas.forEach((nota, i) => agendarNaTela(() => tocarNotaDoJogo(nota), i * (espaco || 140)));
}

function soltarLuzesDaLiga(tela, quantas) {
  if (!tela.isConnected || menosMovimentoNaLiga()) return;
  const estilo = getComputedStyle(tela);
  const cores = tela.classList.contains('celestial') ? ['#ffd1f0', '#fff1a8', '#b8f3ff', '#d9c2ff', '#ffffff'] : [estilo.getPropertyValue('--liga'), estilo.getPropertyValue('--liga-clara'), '#fff1c2', '#ffffff'];
  for (let i = 0; i < quantas; i += 1) {
    const luz = document.createElement('i');
    luz.className = 'liga-confete';
    luz.style.cssText = `left:${(Math.random() * 100).toFixed(1)}%;--cor:${cores[i % cores.length]};--x:${((Math.random() - 0.5) * 160).toFixed(0)}px;--giro:${(Math.random() * 720).toFixed(0)}deg;animation-delay:${(Math.random() * 0.6).toFixed(2)}s;animation-duration:${(2.2 + Math.random() * 1.6).toFixed(2)}s`;
    tela.appendChild(luz);
  }
}

function mostrarSubidaDeDivisao(de, para, fe) {
  const antes = posicaoDoNivel(de);
  const depois = posicaoNaLiga(fe);
  const tela = abrirTelaDaLiga(fe, { animando: true });
  tela.classList.add('divisao');
  preencherTelaDaLiga(tela, antes, { progresso: 0.62 });
  agendarNaTela(() => { tela.querySelector('.liga-tela-barra-cheia').style.width = '100%'; tocarSubidaDaLiga([523, 659]); }, 250);
  agendarNaTela(() => { tela.classList.add('subindo'); tocarSubidaDaLiga([392, 523, 659, 784], 110); }, 1000);
  agendarNaTela(() => {
    const lugar = tela.querySelector('.liga-tela-emblema');
    const velho = lugar.firstElementChild;
    if (velho) velho.classList.add('sai');
    lugar.insertAdjacentHTML('beforeend', `<div class="liga-tela-emblema-um entra">${emblemaDaLiga(depois.indice, { divisao: depois.divisao, classe: 'grande' })}</div>`);
    setTimeout(() => { if (velho) velho.remove(); }, 700);
    preencherTelaDaLiga(tela, depois, { manterEmblema: true, progresso: 1, pipNovo: depois.divisao, texto: ' ' });
    tela.querySelector('.liga-tela-nome').classList.add('trocando');
    tela.querySelector('.liga-tela-rotulo').textContent = textoDaLiga('Subiu de divisão!');
  }, 1350);
  agendarNaTela(() => {
    const barra = tela.querySelector('.liga-tela-barra-cheia');
    barra.style.transition = 'none';
    barra.style.width = '0%';
    void barra.offsetWidth;
    barra.style.transition = '';
    barra.style.width = `${Math.round(depois.progresso * 100)}%`;
    tela.classList.add('barra-nova');
    tela.querySelector('.liga-tela-numeros').textContent = numerosDaLiga(depois, depois.progresso);
    tela.querySelector('.liga-tela-texto').textContent = proximoPassoDaLiga(depois);
  }, 2150);
  agendarNaTela(() => tela.classList.add('pronta'), 2600);
}

function htmlDoCinemaDaLiga(pos) {
  const cacos = Array.from({ length: 16 }, (_, i) => {
    const angulo = (i / 16) * Math.PI * 2 + ruidoDaLiga(i, 3);
    const distancia = 55 + ruidoDaLiga(i, 5) * 45;
    return `<i data-estilo="--x:${(Math.cos(angulo) * distancia).toFixed(0)}vmax;--y:${(Math.sin(angulo) * distancia).toFixed(0)}vmax;--d:${(1 + ruidoDaLiga(i, 8) * 1.4).toFixed(2)}s;--g:${(ruidoDaLiga(i, 4) * 360).toFixed(0)}deg;--t:${(10 + ruidoDaLiga(i, 6) * 26).toFixed(0)}px"></i>`;
  }).join('');
  return `
    <div class="liga-cinema-fundo"></div>
    <div class="liga-cinema-feixe um"></div><div class="liga-cinema-feixe dois"></div>
    <div class="liga-cinema-palco3d"></div>
    <div class="liga-cinema-camera"><div class="liga-cinema-objeto">${emblemaDaLiga(pos.indice, { cinema: true, divisao: pos.divisao, classe: 'cinema' })}</div></div>
    <div class="liga-cinema-cacos">${cacos}</div>
    <div class="liga-cinema-reflexos"><i data-estilo="left:38%;top:34%;--d:1.7s"></i><i data-estilo="left:62%;top:58%;--d:2.4s"></i><i data-estilo="left:47%;top:46%;--d:3.05s"></i></div>
    <div class="liga-cinema-escuro"></div>
    <span class="liga-cinema-pular">${escaparDaLiga(textoDaLiga('Toque para pular'))}</span>`;
}

function mostrarSubidaDeLiga(de, para, fe, opcoes) {
  const o = opcoes || {};
  const antes = posicaoDoNivel(de);
  const depois = posicaoNaLiga(fe);
  const tela = abrirTelaDaLiga(fe, { animando: true, dono: o.dono });
  tela.classList.add('nova-liga');
  if (!o.repetir) preencherTelaDaLiga(tela, antes, { progresso: 0.66 });
  const cinema = tela.querySelector('.liga-cinema');
  cinema.innerHTML = htmlDoCinemaDaLiga(depois);
  aplicarEstilosDaLiga(cinema);
  pintarComALiga(cinema, depois.liga);
  let terminou = false;
  let modulo = null;
  let cena3d = null;
  tela.pararCena3d = () => { if (cena3d) cena3d.parar(); };
  if (!menosMovimentoNaLiga()) carregar3dDaLiga().then((m) => { modulo = m; });
  const final = () => {
    if (terminou || !tela.isConnected) return;
    terminou = true;
    if (cena3d) cena3d.parar();
    temporizadoresDaTela.forEach(clearTimeout);
    temporizadoresDaTela = [];
    cinema.classList.remove('ativo');
    tela.classList.remove('rasgando', 'em-cinema');
    tela.classList.add('revelando');
    let texto = textoDaLiga('Você subiu da liga {de} para a liga {para} com {n} de Fé.', { de: textoDaLiga(antes.liga.nome), para: textoDaLiga(depois.liga.nome), n: depois.fe.toLocaleString('pt-BR') });
    if (o.repetir) texto = proximoPassoDaLiga(depois);
    if (depois.liga.secreto && !o.dono) texto = textoDaLiga('Parabéns! Você está no rank secreto Celestial. Pouquíssimas pessoas chegam até aqui.');
    if (o.dono) texto = depois.liga.secreto ? textoDaLiga('{nome} está no rank secreto Celestial. Pouquíssimas pessoas chegam até aqui.', { nome: o.dono }) : textoDaLiga('{nome} está na liga {liga}, com {n} de Fé.', { nome: o.dono, liga: nomeDaDivisao(depois), n: depois.fe.toLocaleString('pt-BR') });
    preencherTelaDaLiga(tela, depois, { progresso: o.repetir ? depois.progresso : 0, pipNovo: o.repetir ? undefined : depois.divisao, texto });
    let rotuloFinal = o.repetir ? '' : textoDaLiga('Nova liga!');
    if (o.dono) rotuloFinal = textoDaLiga('Rank de {nome}', { nome: o.dono });
    if (depois.liga.secreto) rotuloFinal = textoDaLiga('Rank secreto');
    tela.querySelector('.liga-tela-rotulo').textContent = rotuloFinal;
    if (typeof somDaLicao === 'function') somDaLicao('fim');
    agendarNaTela(() => {
      tela.querySelector('.liga-tela-barra-cheia').style.width = `${Math.round(depois.progresso * 100)}%`;
      tela.querySelector('.liga-tela-numeros').textContent = numerosDaLiga(depois, depois.progresso);
    }, 700);
    agendarNaTela(() => soltarLuzesDaLiga(tela, depois.liga.secreto ? 80 : 46), 500);
    agendarNaTela(() => tela.classList.add('pronta'), 1300);
  };
  tela.addEventListener('click', () => { if (tela.classList.contains('rasgando') || tela.classList.contains('em-cinema')) final(); });
  const inicioDoRasgo = o.repetir ? 150 : 1100;
  if (!o.repetir) {
    agendarNaTela(() => { tela.querySelector('.liga-tela-barra-cheia').style.width = '100%'; tocarSubidaDaLiga([523, 659]); }, 250);
    agendarNaTela(() => tela.querySelector('.liga-tela-pips').classList.add('cheias'), 750);
  }
  agendarNaTela(() => { tela.classList.add('rasgando'); tocarSubidaDaLiga([330, 440], 90); }, inicioDoRasgo);
  agendarNaTela(() => {
    tela.classList.add('em-cinema');
    cinema.classList.add('ativo');
    if (!modulo || typeof modulo.cinema3dDaLiga !== 'function') return;
    cinema.classList.add('em-3d');
    modulo.cinema3dDaLiga(cinema.querySelector('.liga-cinema-palco3d'), dadosDoCinema3d(depois)).then((c) => {
      if (terminou) c.parar();
      else cena3d = c;
    }).catch(() => cinema.classList.remove('em-3d'));
  }, inicioDoRasgo + 250);
  agendarNaTela(() => tocarSubidaDaLiga([392, 494, 587, 784, 988], 120), inicioDoRasgo + 1200);
  agendarNaTela(final, inicioDoRasgo + 4150);
}

function reverAnimacaoDaLiga(fe, dono) {
  const pos = posicaoNaLiga(fe);
  carregar3dDaLiga().then(() => mostrarSubidaDeLiga(pos.nivel, pos.nivel, fe, { repetir: true, dono }));
}

function mostrarParabensDoCelestial(fe) {
  const tela = abrirTelaDaLiga(fe);
  tela.classList.add('parabens');
  tela.querySelector('.liga-tela-rotulo').textContent = textoDaLiga('Parabéns!');
  tela.querySelector('.liga-tela-texto').textContent = textoDaLiga('Você está no rank secreto Celestial. Pouquíssimas pessoas chegam até aqui. Toque no emblema para ver a animação.');
  if (typeof somDaLicao === 'function') somDaLicao('fim');
  setTimeout(() => soltarLuzesDaLiga(tela, 70), 300);
  carregar3dDaLiga();
}

document.addEventListener('click', (evento) => {
  const botao = evento.target.closest && evento.target.closest('[data-liga-fe]');
  if (!botao) return;
  const fe = Number(botao.dataset.ligaFe) || 0;
  const dono = botao.dataset.ligaDono || '';
  if (dono && !menosMovimentoNaLiga()) reverAnimacaoDaLiga(fe, dono);
  else abrirTelaDaLiga(fe, { dono });
});

function seloDaLigaNoRanking(fe) {
  const pos = posicaoNaLiga(fe);
  return `<span class="ranking-liga" title="${escaparDaLiga(nomeDaDivisao(pos))}">${emblemaDaLiga(pos.indice, { pedestal: false })}</span>`;
}

function htmlDoTopoDaLiga(indice) {
  const liga = LIGAS_DA_FE[indice] || LIGAS_DA_FE[0];
  return `<div class="ranking-liga-topo" style="--liga:${liga.cor}">${seloDaLigaNoRanking(liga.minimo)}<span><strong>${textoDaLiga('Liga {nome}', { nome: textoDaLiga(liga.nome) })}</strong><small>${textoDaLiga('Quem está na mesma liga que você.')}</small></span></div>`;
}
