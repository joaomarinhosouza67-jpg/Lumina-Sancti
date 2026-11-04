const CHAVE_DAS_LIGAS = 'lumina-sancti-liga-v4';
const CHAVE_DOS_CARGOS = 'lumina-sancti-cargo-visto';
const DIVISOES_DAS_LIGAS = ['V', 'IV', 'III', 'II', 'I'];
const INDICE_CELESTIAL = 100;
const INDICE_ARQUITETO = 101;
const INDICE_FUNDADOR = 102;
const METAIS_DAS_LIGAS = {
  bronze: ['#ffe2c6', '#d38d55', '#7a4220', '#f6c193'],
  prata: ['#ffffff', '#cdd5e0', '#6b7686', '#f1f4f8'],
  ouro: ['#fff7d6', '#f2c75c', '#8f5d12', '#ffe39a'],
  real: ['#fffdf2', '#ffe08a', '#b07a1e', '#fff3c4'],
  platina: ['#ffffff', '#e4ecf5', '#8a97a8', '#f7fbff'],
};
const CORES_DA_LIGA = (liga) => Object.assign(liga, {
  cor: `hsl(${liga.matiz}, ${liga.saturacao}%, ${liga.luz}%)`,
  claro: `hsl(${liga.matiz}, ${liga.saturacao}%, ${Math.min(92, liga.luz + 30)}%)`,
  escuro: `hsl(${liga.matiz}, ${liga.saturacao}%, ${Math.max(10, liga.luz - 32)}%)`,
});
const LIGAS_DA_FE = [
  { id: 'peregrino', nome: 'Peregrino', minimo: 0, matiz: 26, saturacao: 74, luz: 48, metal: 'bronze', forma: 'hexagono', simbolo: 'concha' },
  { id: 'discipulo', nome: 'Discípulo', minimo: 300, matiz: 204, saturacao: 42, luz: 64, metal: 'prata', forma: 'escudo', simbolo: 'peixe' },
  { id: 'missionario', nome: 'Missionário', minimo: 1000, matiz: 40, saturacao: 92, luz: 52, metal: 'ouro', forma: 'escudo', simbolo: 'chama', joias: true },
  { id: 'guardiao', nome: 'Guardião', minimo: 2500, matiz: 152, saturacao: 70, luz: 40, metal: 'ouro', forma: 'ogiva', simbolo: 'escudo', joias: true },
  { id: 'arauto', nome: 'Arauto', minimo: 5000, matiz: 214, saturacao: 86, luz: 52, metal: 'ouro', forma: 'ogiva', simbolo: 'trombeta', joias: true, asinhas: true },
  { id: 'luzeiro', nome: 'Luzeiro', minimo: 10000, matiz: 268, saturacao: 72, luz: 56, metal: 'ouro', forma: 'losango', simbolo: 'estrela', joias: true, ramos: true },
  { id: 'paladino', nome: 'Paladino', minimo: 18000, matiz: 182, saturacao: 58, luz: 42, metal: 'platina', forma: 'escudo', simbolo: 'espada', joias: true, ramos: true, asinhas: true },
  { id: 'glorioso', nome: 'Glorioso', minimo: 30000, matiz: 352, saturacao: 82, luz: 46, metal: 'ouro', forma: 'ogiva', simbolo: 'coroa', joias: true, ramos: true, coroa: true },
  { id: 'serafico', nome: 'Seráfico', minimo: 50000, matiz: 192, saturacao: 64, luz: 74, metal: 'real', forma: 'losango', simbolo: 'serafim', joias: true, ramos: true, asas: true, seisAsas: true },
  { id: 'arcanjo', nome: 'Arcanjo', minimo: 85000, matiz: 14, saturacao: 90, luz: 50, metal: 'real', forma: 'ogiva', simbolo: 'espadaDeFogo', joias: true, ramos: true, asas: true, coroa: true },
  { id: 'radiante', nome: 'Radiante', minimo: 140000, matiz: 48, saturacao: 100, luz: 56, metal: 'real', forma: 'losango', simbolo: 'sol', joias: true, ramos: true, asas: true, aureola: true },
  { id: 'triunfante', nome: 'Triunfante', minimo: 230000, matiz: 322, saturacao: 70, luz: 54, metal: 'real', forma: 'ogiva', simbolo: 'louros', joias: true, ramos: true, asas: true, aureola: true, coroa: true },
  { id: 'eterno', nome: 'Eterno', minimo: 400000, matiz: 238, saturacao: 72, luz: 54, metal: 'platina', forma: 'losango', simbolo: 'infinito', joias: true, ramos: true, asas: true, seisAsas: true, aureola: true },
  { id: 'soberano', nome: 'Soberano', minimo: 650000, matiz: 44, saturacao: 78, luz: 46, metal: 'real', forma: 'ogiva', simbolo: 'orbe', joias: true, ramos: true, asas: true, aureola: true, coroa: true, escuroDourado: true },
  { id: 'empireo', nome: 'Empíreo', minimo: 1000000, matiz: 236, saturacao: 80, luz: 58, metal: 'platina', forma: 'catedral', simbolo: 'empireo', joias: true, ramos: true, asas: true, seisAsas: true, aureola: true, coroa: true, cosmos: true, raiosAtras: true, secreto: true, semDivisoes: true, tema: 'empireo' },
].map(CORES_DA_LIGA);
const RANKS_ESPECIAIS = {
  [INDICE_CELESTIAL]: CORES_DA_LIGA({ id: 'celestial', nome: 'Celestial', matiz: 46, saturacao: 100, luz: 72, metal: 'real', forma: 'ogiva', simbolo: 'cruz', joias: true, ramos: true, asas: true, seisAsas: true, aureola: true, coroa: true, prisma: true, raiosAtras: true, especial: true, impossivel: true, semDivisoes: true, tema: 'celestial' }),
  [INDICE_ARQUITETO]: CORES_DA_LIGA({ id: 'arquiteto', nome: 'Arquiteto da Luz', matiz: 188, saturacao: 100, luz: 58, metal: 'real', forma: 'catedral', simbolo: 'rosacea', joias: true, ramos: true, asas: true, aureola: true, obsidiana: true, especial: true, semDivisoes: true, tema: 'arquiteto' }),
  [INDICE_FUNDADOR]: CORES_DA_LIGA({ id: 'fundador', nome: 'Fundador', matiz: 352, saturacao: 72, luz: 42, metal: 'real', forma: 'escudo', simbolo: 'coroaReal', joias: true, ramos: true, asas: true, seisAsas: true, aureola: true, coroa: true, raiosAtras: true, especial: true, semDivisoes: true, tema: 'fundador' }),
};
const FORMAS_DAS_LIGAS = {
  hexagono: [[100, 14], [166, 50], [166, 132], [100, 180], [34, 132], [34, 50]],
  escudo: [[100, 12], [140, 16], [166, 26], [166, 94], [156, 132], [130, 162], [100, 184], [70, 162], [44, 132], [34, 94], [34, 26], [60, 16]],
  ogiva: [[100, 8], [126, 20], [148, 42], [161, 68], [166, 96], [166, 180], [100, 180], [34, 180], [34, 96], [39, 68], [52, 42], [74, 20]],
  losango: [[100, 8], [136, 52], [172, 96], [136, 140], [100, 186], [64, 140], [28, 96], [64, 52]],
  catedral: [[100, 2], [110, 16], [118, 6], [124, 24], [142, 34], [158, 56], [166, 84], [166, 180], [100, 180], [34, 180], [34, 84], [42, 56], [58, 34], [76, 24], [82, 6], [90, 16]],
};
const PENAS_DAS_ASAS_DA_LIGA = ['M38 62 C16 54 4 38 0 16 C14 28 26 34 42 40Z', 'M36 90 C10 88 -6 72 -12 48 C4 60 18 64 38 66Z', 'M36 118 C10 122 -8 108 -18 86 C2 96 18 98 38 96Z', 'M40 144 C18 152 0 146 -12 128 C6 134 22 132 40 124Z'];
const COROA_DA_LIGA = 'M74 16 L80 -8 L91 6 L100 -14 L109 6 L120 -8 L126 16Z';
let contadorDeEmblemas = 0;
let modulo3dDaLiga = null;
let feDaLigaAtual = 0;
let temporizadoresDaTela = [];
let cargoNaLigaAtual = null;
let cargoPedidoPara = null;
let porcentagensDasLigas = null;
let pedidoDasPorcentagens = null;
let contextoDoSomDaLiga = null;
let saidaDoSomDaLiga = null;
let ruidoGuardadoDaLiga = null;

function textoDaLiga(texto, valores) {
  return typeof tr === 'function' ? tr(texto, valores) : String(texto).replace(/\{(\w+)\}/g, (_, chave) => (valores && valores[chave] !== undefined ? valores[chave] : ''));
}

function escaparDaLiga(texto) {
  return String(texto || '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

function numeroDaLiga(n) {
  return Number(n || 0).toLocaleString('pt-BR');
}

function ligaDoIndice(indice) {
  return RANKS_ESPECIAIS[indice] || LIGAS_DA_FE[indice] || LIGAS_DA_FE[0];
}

function temaDaLiga(liga) {
  return liga.tema || 'normal';
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

function posicaoEspecial(indice, fe) {
  const valor = Math.max(0, Math.floor(Number(fe) || 0));
  return { indice, divisao: 4, nivel: 10000 + indice, inicio: valor, fim: Infinity, progresso: 1, fe: valor, liga: ligaDoIndice(indice), especial: true };
}

function posicaoDoNivel(nivel) {
  const indice = Math.max(0, Math.min(LIGAS_DA_FE.length - 1, Math.floor(nivel / 5)));
  return posicaoNaLiga(limitesDaLiga(indice)[Math.max(0, Math.min(4, nivel % 5))]);
}

function posicoesDaPessoa(fe, cargo) {
  const daFe = posicaoNaLiga(fe);
  if (cargo === 'fundador') return [posicaoEspecial(INDICE_FUNDADOR, fe), posicaoEspecial(INDICE_ARQUITETO, fe), posicaoEspecial(INDICE_CELESTIAL, fe)];
  if (cargo === 'arquiteto') return [posicaoEspecial(INDICE_ARQUITETO, fe), daFe];
  return [daFe];
}

function nomeDaDivisao(pos) {
  return pos.liga.semDivisoes ? textoDaLiga(pos.liga.nome) : `${textoDaLiga(pos.liga.nome)} ${DIVISOES_DAS_LIGAS[pos.divisao]}`;
}

function proximoPassoDaLiga(pos) {
  if (pos.liga.id === 'celestial') return textoDaLiga('Rank impossível de conseguir.');
  if (pos.liga.id === 'arquiteto') return textoDaLiga('Rank dos desenvolvedores do Lumina Sancti.');
  if (pos.liga.id === 'fundador') return textoDaLiga('Rank do fundador do Lumina Sancti.');
  if (pos.fim === Infinity) return textoDaLiga('Você chegou ao rank mais alto que se pode conquistar!');
  const seguinte = posicaoNaLiga(pos.fim);
  if (seguinte.liga.secreto) return textoDaLiga('Faltam {n} de Fé para um rank secreto...', { n: numeroDaLiga(pos.fim - pos.fe) });
  return textoDaLiga('Faltam {n} de Fé para {liga}', { n: numeroDaLiga(pos.fim - pos.fe), liga: nomeDaDivisao(seguinte) });
}

function clienteDaLiga() {
  if (typeof supabaseCliente !== 'undefined' && supabaseCliente) return supabaseCliente;
  if (typeof cliente !== 'undefined' && cliente && typeof cliente.rpc === 'function') return cliente;
  return null;
}

function carregarPorcentagensDasLigas() {
  if (pedidoDasPorcentagens) return pedidoDasPorcentagens;
  const banco = clienteDaLiga();
  if (!banco) return Promise.resolve(null);
  pedidoDasPorcentagens = Promise.resolve(banco.rpc('ligas_porcentagens', { _limites: LIGAS_DA_FE.map((l) => l.minimo) }))
    .then((resposta) => {
      const dados = resposta && !resposta.error ? resposta.data : null;
      if (dados && Number(dados.total) > 0 && Array.isArray(dados.contagens)) porcentagensDasLigas = { total: Number(dados.total), contagens: dados.contagens.map(Number) };
      return porcentagensDasLigas;
    })
    .catch(() => { pedidoDasPorcentagens = null; return null; });
  return pedidoDasPorcentagens;
}

function textoDaPorcentagem(pos) {
  if (pos.liga.id === 'celestial') return textoDaLiga('Impossível de conseguir');
  if (pos.liga.id === 'arquiteto') return textoDaLiga('Só para os desenvolvedores');
  if (pos.liga.id === 'fundador') return textoDaLiga('Só para o fundador');
  if (!porcentagensDasLigas) return '';
  const n = porcentagensDasLigas.contagens[pos.indice];
  if (n === undefined) return '';
  if (n === 0) return textoDaLiga('Ninguém chegou aqui ainda');
  const p = (n / porcentagensDasLigas.total) * 100;
  if (p < 1) return textoDaLiga('Menos de 1% das pessoas chegou aqui');
  return textoDaLiga('{n}% das pessoas chegaram aqui', { n: p >= 10 ? Math.round(p) : p.toFixed(1).replace('.', ',') });
}

function meuCargoNaLiga() {
  if (typeof membroAtivo === 'undefined' || !membroAtivo || membroAtivo.tipo === 'crianca') return null;
  return cargoNaLigaAtual;
}

function carregarMeuCargoNaLiga() {
  const banco = clienteDaLiga();
  const logado = typeof contaLogada === 'function' && contaLogada();
  const quem = logado && typeof membroAtivo !== 'undefined' && membroAtivo ? membroAtivo.id : null;
  if (!banco || !quem) return Promise.resolve(null);
  if (cargoPedidoPara === quem) return Promise.resolve(cargoNaLigaAtual);
  cargoPedidoPara = quem;
  return Promise.resolve(banco.rpc('meu_cargo_na_liga'))
    .then((resposta) => {
      const valor = resposta && !resposta.error ? resposta.data : null;
      cargoNaLigaAtual = valor === 'fundador' || valor === 'arquiteto' ? valor : null;
      return cargoNaLigaAtual;
    })
    .catch(() => null);
}

function cargosDosPerfis(ids) {
  const banco = clienteDaLiga();
  const lista = (ids || []).filter(Boolean);
  if (!banco || !lista.length) return Promise.resolve({});
  return Promise.resolve(banco.rpc('cargos_dos_perfis', { _ids: lista.slice(0, 200) }))
    .then((resposta) => {
      const mapa = {};
      if (resposta && !resposta.error && Array.isArray(resposta.data)) resposta.data.forEach((l) => { mapa[l.profile_id] = l.cargo; });
      return mapa;
    })
    .catch(() => ({}));
}

function ruidoDaLiga(n, semente) {
  const x = Math.sin(n * 12.9898 + semente * 78.233) * 43758.5453;
  return x - Math.floor(x);
}

function facetasDaLiga(indice) {
  const liga = ligaDoIndice(indice);
  const pontos = FORMAS_DAS_LIGAS[liga.forma];
  const centro = [100, 98];
  const n = pontos.length;
  const semente = indice % 37;
  const internos = pontos.map(([x, y], i) => {
    const f = 0.48 + ruidoDaLiga(i, semente) * 0.14;
    return [centro[0] + (x - centro[0]) * f + (ruidoDaLiga(i + 20, semente) - 0.5) * 8, centro[1] + (y - centro[1]) * f + (ruidoDaLiga(i + 40, semente) - 0.5) * 8];
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
    let matiz = liga.matiz;
    let saturacao = liga.saturacao;
    let base = liga.luz;
    let aresta = null;
    if (liga.prisma) { matiz = ((angulo * 180) / Math.PI + 360 + faceta.anel * 40) % 360; saturacao = 90; base = 62; }
    if (liga.obsidiana) { matiz = 226; saturacao = 34; base = 18; aresta = 'hsl(186, 100%, 70%)'; }
    if (liga.escuroDourado) { matiz = 30; saturacao = 30; base = 16; aresta = 'hsl(44, 100%, 66%)'; }
    if (liga.cosmos) { matiz = (232 + faceta.anel * 22 + ruidoDaLiga(k, 9) * 30) % 360; saturacao = 76; base = 34; }
    const l = Math.max(6, Math.min(94, base + luz * (liga.obsidiana || liga.escuroDourado ? 7 : 14) + extra + (ruidoDaLiga(k + 60, semente) - 0.5) * 12));
    const estrelaNoCosmos = liga.cosmos && ruidoDaLiga(k + 7, 3) > 0.82;
    const cinza = Math.max(10, Math.min(46, 24 + luz * 10 + (ruidoDaLiga(k + 80, semente) - 0.5) * 10));
    return Object.assign(faceta, {
      pontos: faceta.pts.map((p) => `${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' '),
      cor: estrelaNoCosmos ? `hsl(${matiz.toFixed(0)}, 90%, 80%)` : `hsl(${matiz.toFixed(0)}, ${saturacao}%, ${l.toFixed(0)}%)`,
      aresta: aresta || `hsl(${matiz.toFixed(0)}, ${Math.min(100, saturacao + 10)}%, ${Math.min(97, l + 26).toFixed(0)}%)`,
      larguraDaAresta: aresta ? 1.4 : 0.8,
      metal: `hsl(222, 9%, ${cinza.toFixed(0)}%)`,
      atraso: ((cx + cy) / 380) * 0.9 + ruidoDaLiga(k + 100, semente) * 0.18,
      dx: (cx - centro[0]) * 1.8 + (ruidoDaLiga(k + 120, semente) - 0.5) * 40,
      dy: (cy - centro[1]) * 1.8 + (ruidoDaLiga(k + 140, semente) - 0.5) * 40,
      giro: (ruidoDaLiga(k + 160, semente) - 0.5) * 220,
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

function circuloDaLiga(cx, cy, r) {
  return `M${cx - r} ${cy} a${r} ${r} 0 1 0 ${2 * r} 0 a${r} ${r} 0 1 0 ${-2 * r} 0`;
}

function folhaDaLiga(x, y, graus) {
  const a = (graus * Math.PI) / 180;
  const dx = Math.cos(a) * 7;
  const dy = Math.sin(a) * 7;
  return `M${(x - dx).toFixed(1)} ${(y - dy).toFixed(1)} a7 2.8 ${graus} 1 0 ${(2 * dx).toFixed(1)} ${(2 * dy).toFixed(1)} a7 2.8 ${graus} 1 0 ${(-2 * dx).toFixed(1)} ${(-2 * dy).toFixed(1)}`;
}

function simboloDaLiga(nome) {
  const raios = (cx, cy, r1, r2, de, ate, passos) => Array.from({ length: passos }, (_, i) => {
    const a = (de + ((ate - de) * i) / (passos - 1)) * (Math.PI / 180);
    return `M${(cx + Math.cos(a) * r1).toFixed(1)} ${(cy + Math.sin(a) * r1).toFixed(1)} L${(cx + Math.cos(a) * r2).toFixed(1)} ${(cy + Math.sin(a) * r2).toFixed(1)}`;
  }).join(' ');
  const petalas = Array.from({ length: 8 }, (_, k) => {
    const a = (k * Math.PI) / 4;
    const gira = ([x, y]) => [100 + (x - 100) * Math.cos(a) - (y - 94) * Math.sin(a), 94 + (x - 100) * Math.sin(a) + (y - 94) * Math.cos(a)].map((v) => v.toFixed(1)).join(' ');
    const p = [[100, 84], [94, 76], [94, 68], [100, 62], [106, 68], [106, 76], [100, 84]].map(gira);
    return `M${p[0]} C${p[1]} ${p[2]} ${p[3]} C${p[4]} ${p[5]} ${p[6]}Z`;
  });
  const guarda = 'M80 110 H120 V118 H80Z';
  const cabo = 'M97 118 H103 V134 H97Z';
  return {
    concha: { cheio: ['M100 130 C88 124 72 112 66 98 C60 82 70 62 100 58 C130 62 140 82 134 98 C128 112 112 124 100 130Z', 'M88 122 L78 134 H96Z', 'M112 122 L122 134 H104Z'], sulco: ['M100 126 L72 96 M100 126 L80 78 M100 126 L92 64 M100 126 L108 64 M100 126 L120 78 M100 126 L128 96'] },
    peixe: { cheio: ['M56 96 C76 70 112 70 128 92 L146 76 L141 96 L146 116 L128 100 C112 122 76 122 56 96Z'], escuro: [circuloDaLiga(74, 93, 3.5)], sulco: ['M92 84 C98 92 98 100 92 108'] },
    chama: { cheio: ['M100 50 C116 68 130 82 130 104 C130 122 116 134 100 134 C84 134 70 122 70 104 C70 90 80 80 86 72 C89 84 93 91 100 94 C97 80 95 66 100 50Z'], escuro: ['M100 100 C106 108 110 113 110 119 C110 126 105 130 100 130 C95 130 90 126 90 119 C90 113 94 108 100 100Z'] },
    escudo: { cheio: ['M100 54 L134 64 V96 C134 116 120 128 100 138 C80 128 66 116 66 96 V64 Z'], escuro: ['M96 70 H104 V88 H120 V96 H104 V122 H96 V96 H80 V88 H96Z'] },
    trombeta: { cheio: ['M60 118 L116 80 L122 88 L66 126Z', 'M112 76 C124 66 138 56 150 54 C150 66 142 80 128 92Z', 'M54 120 L64 114 L68 124 L58 128Z'], linha: ['M138 44 L144 34 M152 62 L164 58 M150 76 L162 80'] },
    estrela: { cheio: [estrelaDaLigaSvg(100, 95, 42, 14, 8)], escuro: [estrelaDaLigaSvg(100, 95, 12, 5, 4)] },
    espada: { cheio: ['M97 48 H103 L104 108 L100 116 L96 108Z', guarda, cabo, circuloDaLiga(100, 139, 5)], sulco: ['M100 56 V104'] },
    coroa: { cheio: ['M62 118 L58 72 L80 92 L100 62 L120 92 L142 72 L138 118Z', 'M62 120 H138 V132 H62Z'], escuro: [circuloDaLiga(80, 126, 4), circuloDaLiga(100, 126, 4), circuloDaLiga(120, 126, 4)] },
    serafim: { cheio: ['M100 60 C110 74 116 84 116 96 C116 108 108 116 100 116 C92 116 84 108 84 96 C84 84 90 74 100 60Z', 'M92 82 C78 68 66 62 56 64 C64 74 74 82 90 90Z', 'M108 82 C122 68 134 62 144 64 C136 74 126 82 110 90Z', 'M86 98 C70 96 58 100 50 110 C62 112 74 110 88 104Z', 'M114 98 C130 96 142 100 150 110 C138 112 126 110 112 104Z', 'M92 112 C82 122 72 130 62 130 C68 120 80 114 92 108Z', 'M108 112 C118 122 128 130 138 130 C132 120 120 114 108 108Z'] },
    espadaDeFogo: { cheio: ['M100 44 C110 54 96 62 105 72 C112 81 98 90 105 100 L104 108 L96 108 L95 100 C88 90 103 81 95 72 C86 62 102 54 100 44Z', guarda, cabo, circuloDaLiga(100, 139, 5)] },
    sol: { cheio: [circuloDaLiga(100, 94, 20)], linha: [raios(100, 94, 27, 44, 0, 337.5, 16)], escuro: [circuloDaLiga(100, 94, 8)] },
    louros: { linha: ['M86 128 C62 112 60 84 78 62', 'M114 128 C138 112 140 84 122 62'], cheio: [folhaDaLiga(74, 116, -40), folhaDaLiga(66, 100, -70), folhaDaLiga(68, 84, -95), folhaDaLiga(76, 70, -120), folhaDaLiga(126, 116, 40), folhaDaLiga(134, 100, 70), folhaDaLiga(132, 84, 95), folhaDaLiga(124, 70, 120), estrelaDaLigaSvg(100, 92, 14, 5, 5)] },
    infinito: { linha: ['M100 94 C88 76 64 76 64 94 C64 112 88 112 100 94 C112 76 136 76 136 94 C136 112 112 112 100 94Z'], cheio: [estrelaDaLigaSvg(100, 60, 9, 3, 4)] },
    orbe: { cheio: [circuloDaLiga(100, 108, 24), 'M97 60 H103 V70 H110 V76 H103 V84 H97 V76 H90 V70 H97Z'], escuro: ['M76 105 H124 V111 H76Z', 'M97 84 H103 V132 H97Z'] },
    empireo: { cheio: [estrelaDaLigaSvg(100, 94, 46, 18, 12)], escuro: [circuloDaLiga(100, 94, 15)], linha: [circuloDaLiga(100, 94, 9)] },
    rosacea: { linha: [circuloDaLiga(100, 94, 36)], cheio: petalas, escuro: [estrelaDaLigaSvg(100, 94, 8, 3, 4)] },
    coroaReal: { cheio: ['M60 122 L56 82 L78 100 L100 72 L122 100 L144 82 L140 122Z', 'M60 124 H140 V136 H60Z', 'M97 44 H103 V54 H110 V60 H103 V70 H97 V60 H90 V54 H97Z'], escuro: [circuloDaLiga(80, 130, 4), circuloDaLiga(100, 130, 4), circuloDaLiga(120, 130, 4)] },
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
  const liga = ligaDoIndice(indice);
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
  const raiosAtras = liga.raiosAtras ? `<g class="liga-raios-atras" opacity=".85">${Array.from({ length: 18 }, (_, i) => { const a = (i * 20 * Math.PI) / 180; const r2 = i % 2 ? 128 : 142; return `<path d="M${(100 + Math.cos(a - 0.05) * 60).toFixed(1)} ${(96 + Math.sin(a - 0.05) * 60).toFixed(1)} L${(100 + Math.cos(a) * r2).toFixed(1)} ${(96 + Math.sin(a) * r2).toFixed(1)} L${(100 + Math.cos(a + 0.05) * 60).toFixed(1)} ${(96 + Math.sin(a + 0.05) * 60).toFixed(1)}Z" fill="url(#${g}-m)" opacity="${i % 2 ? 0.55 : 0.9}"/>`; }).join('')}</g>` : '';
  const divisao = o.divisao !== undefined && !liga.semDivisoes;
  return `<svg class="liga-emblema ${liga.prisma ? 'prisma' : ''} ${o.classe || ''}" viewBox="${pedestal ? '-30 -40 260 280' : '-30 -40 260 244'}" aria-hidden="true">
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
    ${raiosAtras}
    ${liga.aureola ? `<circle cx="100" cy="96" r="116" fill="url(#${g}-h)"/><circle cx="100" cy="96" r="104" fill="none" stroke="url(#${g}-m)" stroke-width="3.4"/><path d="${Array.from({ length: 32 }, (_, i) => { const a = (i * 11.25 * Math.PI) / 180; const r2 = i % 2 ? 112 : 122; return `M${(100 + Math.cos(a) * 106).toFixed(1)} ${(96 + Math.sin(a) * 106).toFixed(1)} L${(100 + Math.cos(a) * r2).toFixed(1)} ${(96 + Math.sin(a) * r2).toFixed(1)}`; }).join(' ')}" stroke="url(#${g}-m)" stroke-width="3" stroke-linecap="round"/>` : ''}
    ${umLado ? `${umLado}<g transform="translate(200 0) scale(-1 1)">${umLado}</g>` : ''}
    ${pedestal ? `<g class="liga-pedestal"><path d="M88 182 L93 200 H107 L112 182Z" fill="url(#${g}-m)" stroke="#2a1a06" stroke-width="1"/><path d="M68 200 H132 L142 218 H58Z" fill="#1d2233" stroke="url(#${g}-m)" stroke-width="2.6" stroke-linejoin="round"/><path d="M50 218 H150 L156 232 H44Z" fill="#141826" stroke="url(#${g}-m)" stroke-width="2.6" stroke-linejoin="round"/><path d="${estrelaDaLigaSvg(100, 209, 6.5, 2.4, 4)}" fill="url(#${g}-m)"/></g>` : ''}
    ${liga.ramos ? `${folhasDoRamo(`url(#${g}-m)`)}<g transform="translate(200 0) scale(-1 1)">${folhasDoRamo(`url(#${g}-m)`)}</g>` : ''}
    <path d="${contorno}" fill="none" stroke="${liga.cor}" stroke-width="22" stroke-linejoin="round" opacity=".35" filter="url(#${g}-f)"/>
    <g clip-path="url(#${g}-c)">
      <rect x="20" y="0" width="160" height="200" fill="${liga.escuro}"/>
      ${o.cinema ? `<g class="liga-metal">${facetas.map((f) => `<polygon points="${f.pontos}" fill="${f.metal}" stroke="#596173" stroke-width=".7"/>`).join('')}</g>` : ''}
      <g class="liga-cristal">${facetas.map((f) => `<polygon class="liga-faceta" points="${f.pontos}" fill="${f.cor}" stroke="${f.aresta}" stroke-width="${f.larguraDaAresta}" stroke-opacity="${f.larguraDaAresta > 1 ? 0.95 : 0.6}"${o.cinema ? ` data-estilo="--d:${f.atraso.toFixed(2)}s;--dx:${f.dx.toFixed(0)}px;--dy:${f.dy.toFixed(0)}px;--r:${f.giro.toFixed(0)}deg"` : ''}/>`).join('')}</g>
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
  const tracado = liga.obsidiana ? '#5ff3ff' : '#d9b45a';
  let desenho = '';
  for (let i = 0; i < petalas; i += 1) {
    const matiz = liga.prisma ? (liga.matiz + i * 30) % 360 : liga.matiz;
    const saturacao = liga.prisma ? 80 : liga.saturacao;
    const luz = liga.obsidiana ? 16 + (i % 2) * 8 : 30 + (i % 2) * 16;
    desenho += `<g transform="rotate(${i * (360 / petalas)} 100 100)"><path d="M100 98 L91 38 C91 24 109 24 109 38 Z" fill="hsl(${matiz}, ${saturacao}%, ${luz}%)" stroke="${tracado}" stroke-width="1.6"/><circle cx="100" cy="17" r="7" fill="hsl(${matiz}, ${saturacao}%, ${liga.obsidiana ? 30 : 58}%)" stroke="${tracado}" stroke-width="1.4"/></g>`;
  }
  return `<svg ${completa ? 'xmlns="http://www.w3.org/2000/svg" width="512" height="512" ' : ''}viewBox="0 0 200 200" aria-hidden="true"><circle cx="100" cy="100" r="97" fill="#0a0c20" stroke="${tracado}" stroke-width="3"/>${desenho}<circle cx="100" cy="100" r="78" fill="none" stroke="${tracado}" stroke-width="1.2" opacity=".7"/><circle cx="100" cy="100" r="16" fill="hsl(${liga.matiz}, ${liga.saturacao}%, 62%)" stroke="${tracado}" stroke-width="2"/><path d="${estrelaDaLigaSvg(100, 100, 10, 3.5, 4)}" fill="#fff6d8"/></svg>`;
}

function svgDoSimboloDaLiga(indice, divisao) {
  const liga = ligaDoIndice(indice);
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
    asas: liga.asas || liga.asinhas ? PENAS_DAS_ASAS_DA_LIGA : null, escalaDasAsas: liga.asinhas && !liga.asas ? 0.7 : 1, coroa: liga.coroa ? COROA_DA_LIGA : null, ramos: !!liga.ramos, aureola: !!liga.aureola, prisma: !!liga.prisma,
    arestas: liga.obsidiana ? '#5ff3ff' : (liga.escuroDourado ? '#ffd76a' : ''), tema: temaDaLiga(liga), duracao: duracaoDoCinema(liga) / 1000, impacto: momentoDoImpacto(liga) / 1000,
    svgDoSimbolo: svgDoSimboloDaLiga(pos.indice, pos.divisao), svgDaRosacea: rosaceaDaLiga(liga, true),
  };
}

function cinemaLongo(liga) {
  return ['celestial', 'arquiteto', 'fundador'].includes(temaDaLiga(liga));
}

function duracaoDoCinema(liga) {
  return cinemaLongo(liga) ? 6400 : 3900;
}

function momentoDoImpacto(liga) {
  return cinemaLongo(liga) ? 4350 : 2450;
}

function audioDaLiga() {
  try {
    const Classe = window.AudioContext || window.webkitAudioContext;
    if (!Classe) return null;
    if (!contextoDoSomDaLiga) {
      const ctx = new Classe();
      const mestre = ctx.createGain();
      mestre.gain.value = 0.6;
      const compressor = ctx.createDynamicsCompressor();
      mestre.connect(compressor);
      compressor.connect(ctx.destination);
      const eco = ctx.createConvolver();
      const tamanho = Math.floor(ctx.sampleRate * 2.6);
      const impulso = ctx.createBuffer(2, tamanho, ctx.sampleRate);
      for (let c = 0; c < 2; c += 1) {
        const dados = impulso.getChannelData(c);
        for (let i = 0; i < tamanho; i += 1) dados[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / tamanho, 3);
      }
      eco.buffer = impulso;
      const molhado = ctx.createGain();
      molhado.gain.value = 0.35;
      eco.connect(molhado);
      molhado.connect(mestre);
      contextoDoSomDaLiga = ctx;
      saidaDoSomDaLiga = { seco: mestre, eco };
    }
    if (contextoDoSomDaLiga.state === 'suspended') contextoDoSomDaLiga.resume().catch(() => {});
    return contextoDoSomDaLiga;
  } catch (e) {
    return null;
  }
}

function somDaLiga(tipo, atraso, duracao) {
  const ctx = audioDaLiga();
  if (!ctx) return;
  try {
    const t0 = ctx.currentTime + (atraso || 0);
    const ligar = (no, eco) => {
      no.connect(saidaDoSomDaLiga.seco);
      if (eco) {
        const g = ctx.createGain();
        g.gain.value = eco;
        no.connect(g);
        g.connect(saidaDoSomDaLiga.eco);
      }
    };
    if (!ruidoGuardadoDaLiga) {
      ruidoGuardadoDaLiga = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate);
      const d = ruidoGuardadoDaLiga.getChannelData(0);
      for (let i = 0; i < d.length; i += 1) d[i] = Math.random() * 2 - 1;
    }
    const tom = (freq, onda, ini, dur, vol, eco, ate) => {
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.type = onda;
      osc.frequency.setValueAtTime(freq, ini);
      if (ate) osc.frequency.exponentialRampToValueAtTime(ate, ini + dur);
      g.gain.setValueAtTime(0.0001, ini);
      g.gain.exponentialRampToValueAtTime(vol, ini + Math.min(0.03, dur / 4));
      g.gain.exponentialRampToValueAtTime(0.0001, ini + dur);
      osc.connect(g);
      ligar(g, eco);
      osc.start(ini);
      osc.stop(ini + dur + 0.05);
    };
    const ruido = (ini, dur, vol, filtroTipo, f1, f2, q, eco) => {
      const fonte = ctx.createBufferSource();
      fonte.buffer = ruidoGuardadoDaLiga;
      const filtro = ctx.createBiquadFilter();
      filtro.type = filtroTipo;
      filtro.Q.value = q || 1;
      filtro.frequency.setValueAtTime(f1, ini);
      if (f2) filtro.frequency.exponentialRampToValueAtTime(f2, ini + dur);
      const g = ctx.createGain();
      g.gain.setValueAtTime(0.0001, ini);
      g.gain.exponentialRampToValueAtTime(vol, ini + dur * 0.3);
      g.gain.exponentialRampToValueAtTime(0.0001, ini + dur);
      fonte.connect(filtro);
      filtro.connect(g);
      ligar(g, eco);
      fonte.start(ini);
      fonte.stop(ini + dur + 0.05);
    };
    const longo = (freqs, onda, ini, dur, vol, eco, filtro) => {
      freqs.forEach((f, i) => {
        [-6, 6].forEach((cents) => {
          const osc = ctx.createOscillator();
          osc.type = onda;
          osc.frequency.value = f;
          osc.detune.value = cents;
          const vib = ctx.createOscillator();
          const prof = ctx.createGain();
          vib.frequency.value = 5 + i * 0.3;
          prof.gain.value = f * 0.006;
          vib.connect(prof);
          prof.connect(osc.frequency);
          const passa = ctx.createBiquadFilter();
          passa.type = filtro ? 'bandpass' : 'lowpass';
          passa.frequency.value = filtro || 1800;
          passa.Q.value = filtro ? 1.2 : 0.7;
          const g = ctx.createGain();
          g.gain.setValueAtTime(0.0001, ini);
          g.gain.exponentialRampToValueAtTime(vol, ini + Math.min(1.1, dur * 0.35));
          g.gain.setValueAtTime(vol, ini + dur * 0.7);
          g.gain.exponentialRampToValueAtTime(0.0001, ini + dur);
          osc.connect(passa);
          passa.connect(g);
          ligar(g, eco);
          osc.start(ini);
          vib.start(ini);
          osc.stop(ini + dur + 0.05);
          vib.stop(ini + dur + 0.05);
        });
      });
    };
    const metal = (freq, ini, dur, vol) => {
      [0, 7].forEach((cents) => {
        const osc = ctx.createOscillator();
        osc.type = 'sawtooth';
        osc.frequency.value = freq;
        osc.detune.value = cents;
        const filtro = ctx.createBiquadFilter();
        filtro.type = 'lowpass';
        filtro.frequency.setValueAtTime(500, ini);
        filtro.frequency.exponentialRampToValueAtTime(3200, ini + 0.08);
        filtro.frequency.exponentialRampToValueAtTime(1300, ini + dur);
        const g = ctx.createGain();
        g.gain.setValueAtTime(0.0001, ini);
        g.gain.exponentialRampToValueAtTime(vol, ini + 0.04);
        g.gain.setValueAtTime(vol * 0.8, ini + dur * 0.6);
        g.gain.exponentialRampToValueAtTime(0.0001, ini + dur);
        osc.connect(filtro);
        filtro.connect(g);
        ligar(g, 0.3);
        osc.start(ini);
        osc.stop(ini + dur + 0.05);
      });
    };
    if (tipo === 'barra') tom(392, 'triangle', t0, 0.6, 0.06, 0.2, 784);
    else if (tipo === 'estrela') { tom(1319, 'sine', t0, 0.3, 0.12, 0.4); tom(1976, 'sine', t0 + 0.03, 0.25, 0.06, 0.4); }
    else if (tipo === 'varrida') ruido(t0, 0.9, 0.22, 'bandpass', 300, 3400, 1.2, 0.3);
    else if (tipo === 'subida') [523, 659, 784, 1047, 1319].forEach((f, i) => tom(f, 'triangle', t0 + i * 0.07, 0.6, 0.08, 0.35));
    else if (tipo === 'troca') {
      tom(220, 'sine', t0, 0.5, 0.25, 0.2, 90);
      ruido(t0, 0.35, 0.15, 'lowpass', 2400, 400, 0.7, 0.2);
      [784, 988, 1175, 1568].forEach((f, i) => tom(f, 'sine', t0 + 0.05 + i * 0.04, 1.5, 0.07, 0.6));
    } else if (tipo === 'rasgo') {
      for (let i = 0; i < 7; i += 1) ruido(t0 + i * 0.045, 0.1 + Math.random() * 0.1, 0.2, 'bandpass', 1600 + Math.random() * 2600, 0, 2.5, 0.1);
      ruido(t0, 0.55, 0.12, 'highpass', 3000, 0, 0.7, 0.15);
    } else if (tipo === 'zumbido') {
      longo([55, 82.5, 110], 'sine', t0, duracao || 3.6, 0.09, 0.2);
      ruido(t0, duracao || 3.6, 0.05, 'lowpass', 240, 0, 0.7, 0.2);
    } else if (tipo === 'cristais') {
      const notas = [1568, 1760, 2093, 2349, 2637, 3136];
      for (let i = 0; i < 24; i += 1) {
        const f = notas[i % notas.length] * (i % 3 === 0 ? 1 : 0.5);
        const ini = t0 + i * 0.065 + Math.random() * 0.03;
        tom(f, 'sine', ini, 0.4, 0.05, 0.5);
        tom(f * 2.76, 'sine', ini, 0.2, 0.015, 0.5);
      }
    } else if (tipo === 'impacto') {
      tom(150, 'sine', t0, 1.1, 0.5, 0.25, 36);
      ruido(t0, 0.7, 0.35, 'lowpass', 1400, 120, 0.8, 0.3);
      ruido(t0, 1.6, 0.08, 'highpass', 5000, 0, 0.7, 0.6);
    } else if (tipo === 'brilho') {
      for (let i = 0; i < 9; i += 1) tom(2000 + Math.random() * 2600, 'sine', t0 + i * 0.06, 1, 0.025, 0.7);
    } else if (tipo === 'fanfarra') {
      [[392, 0], [523, 0.13], [659, 0.26], [784, 0.39]].forEach(([f, d]) => metal(f, t0 + d, 0.32, 0.05));
      [523, 659, 784, 1047].forEach((f) => metal(f, t0 + 0.6, 1.9, 0.045));
      metal(262, t0 + 0.6, 1.9, 0.05);
    } else if (tipo === 'fanfarraReal') {
      [[392, 0], [392, 0.16], [523, 0.32], [659, 0.48], [784, 0.64]].forEach(([f, d]) => metal(f, t0 + d, 0.3, 0.055));
      [523, 659, 784, 1047, 1319].forEach((f) => metal(f, t0 + 0.9, 2.6, 0.04));
      metal(131, t0 + 0.9, 2.6, 0.05);
      tom(65, 'sine', t0 + 0.9, 2, 0.25, 0.3);
    } else if (tipo === 'sinos') {
      [880, 1318.5].forEach((base, k) => [1, 2.76, 5.4, 8.93].forEach((p, i) => tom(base * p, 'sine', t0 + k * 0.35, 2.6 / (1 + i * 0.4), 0.07 / (i + 1), 0.7)));
    } else if (tipo === 'coro') {
      longo([220, 277.2, 329.6, 440, 554.4], 'sawtooth', t0, duracao || 5, 0.018, 0.6, 900);
      longo([440, 554.4, 659.3], 'sawtooth', t0 + 0.4, (duracao || 5) - 0.4, 0.012, 0.7, 1300);
    } else if (tipo === 'digital') {
      [523, 784, 1047, 1568, 2093, 1568, 1047, 1568, 2093, 2637, 3136, 2637, 2093, 2637, 3136, 4186].forEach((f, i) => tom(f, 'square', t0 + i * 0.045, 0.12, 0.018, 0.25));
    }
  } catch (e) {
  }
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
  const cargo = meuCargoNaLiga();
  const pos = posicaoNaLiga(fe);
  const antes = lerDaLiga(CHAVE_DAS_LIGAS)[chave];
  const cargoNovo = cargo && !lerDaLiga(CHAVE_DOS_CARGOS)[`${chave}:${cargo}`];
  const registrar = () => {
    const guardadas = lerDaLiga(CHAVE_DAS_LIGAS);
    guardadas[chave] = pos.nivel;
    gravarNaLiga(CHAVE_DAS_LIGAS, guardadas);
    if (cargo) {
      const vistos = lerDaLiga(CHAVE_DOS_CARGOS);
      vistos[`${chave}:${cargo}`] = true;
      gravarNaLiga(CHAVE_DOS_CARGOS, vistos);
    }
  };
  const subiu = cargo !== 'fundador' && typeof antes === 'number' && pos.nivel > antes;
  if (!subiu && !cargoNovo) { registrar(); return false; }
  const mudouDeLiga = subiu && Math.floor(pos.nivel / 5) > Math.floor(antes / 5);
  setTimeout(() => esperarOVooDaLumi(() => {
    if (!trilhasNaFrente() || document.getElementById('liga-tela')) return;
    registrar();
    if (menosMovimentoNaLiga()) {
      const mostrado = cargoNovo ? posicoesDaPessoa(fe, cargo)[0] : pos;
      if (typeof mostrarAvisoTrilhas === 'function') mostrarAvisoTrilhas(textoDaLiga(mudouDeLiga || cargoNovo ? 'Nova liga: {liga}!' : 'Você subiu para {liga}!', { liga: nomeDaDivisao(mostrado) }));
      return;
    }
    if (cargoNovo) mostrarParabensDoCargo(fe, cargo);
    else if (mudouDeLiga) mostrarSubidaDeLiga(antes, pos.nivel, fe);
    else mostrarSubidaDeDivisao(antes, pos.nivel, fe);
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

function classesDaLiga(liga) {
  return [liga.secreto || liga.impossivel ? 'celestial' : '', liga.especial ? `especial ${liga.id}` : ''].filter(Boolean).join(' ');
}

function htmlDaLigaAtual(fe) {
  const posicoes = posicoesDaPessoa(fe, meuCargoNaLiga());
  const pos = posicoes[0];
  const outros = posicoes.slice(1).map((p) => `<span class="liga-cartao-outro" title="${escaparDaLiga(nomeDaDivisao(p))}">${emblemaDaLiga(p.indice, { pedestal: false })}</span>`).join('');
  return `
    <button type="button" class="liga-cartao ${classesDaLiga(pos.liga)}" id="liga-cartao" style="${estiloDaLiga(pos.liga)}">
      <span class="liga-cartao-emblema">${emblemaDaLiga(pos.indice, { pedestal: false })}</span>
      <span class="liga-cartao-textos">
        <small>${textoDaLiga(pos.especial ? 'Seu rank especial' : (pos.liga.secreto ? 'Rank secreto' : 'Sua liga'))}</small>
        <strong>${nomeDaDivisao(pos)}</strong>
        <span class="liga-cartao-barra"><span style="width:${Math.max(4, Math.round(pos.progresso * 100))}%"></span></span>
        <small>${proximoPassoDaLiga(pos)}</small>
      </span>
      ${outros ? `<span class="liga-cartao-outros">${outros}</span>` : ''}
    </button>`;
}

function cartaoDaLigaNoPerfil(fe, dono, cargo) {
  const pos = posicoesDaPessoa(fe, cargo || null)[0];
  return `
    <button type="button" class="liga-perfil ${classesDaLiga(pos.liga)}" data-liga-fe="${pos.fe}" data-liga-dono="${escaparDaLiga(dono || '')}" data-liga-cargo="${escaparDaLiga(cargo || '')}" style="${estiloDaLiga(pos.liga)}">
      <span class="liga-perfil-emblema">${emblemaDaLiga(pos.indice, { pedestal: false })}</span>
      <span class="liga-perfil-textos"><small>${textoDaLiga(pos.especial ? 'Rank especial' : (pos.liga.secreto ? 'Rank secreto' : 'Liga'))}</small><strong>${nomeDaDivisao(pos)}</strong><small>${textoDaLiga('{n} de Fé no total', { n: numeroDaLiga(pos.fe) })}</small></span>
      <span class="liga-perfil-ver">${textoDaLiga('Ver liga')}</span>
    </button>`;
}

function atualizarLigaNoPerfil(lugar, perfilId, fe, dono, ehEu) {
  if (!lugar) return;
  const trocar = (cargo) => {
    const atual = lugar.querySelector('.liga-perfil');
    if (!cargo || !atual) return;
    atual.outerHTML = cartaoDaLigaNoPerfil(fe, dono, cargo);
  };
  if (ehEu) { carregarMeuCargoNaLiga().then(() => trocar(meuCargoNaLiga())); return; }
  cargosDosPerfis([perfilId]).then((mapa) => trocar(mapa[perfilId]));
}

function enfeitarRankingComCargos(lista) {
  if (!lista) return;
  const linhas = Array.from(lista.querySelectorAll('[data-perfil]'));
  const ids = linhas.map((l) => l.dataset.perfil);
  if (!ids.length) return;
  cargosDosPerfis(ids).then((mapa) => {
    linhas.forEach((linha) => {
      const cargo = mapa[linha.dataset.perfil];
      const selo = linha.querySelector('.ranking-liga');
      if (!cargo) return;
      const html = seloDaLigaNoRanking(0, cargo);
      if (selo) selo.outerHTML = html;
      else {
        const fe = linha.querySelector('.ranking-fe, .podio-fe');
        if (fe) fe.insertAdjacentHTML('afterend', html);
      }
    });
  });
}

function abrirListaDeLigas(fe) {
  if (typeof janelaDoCenaculo !== 'function') return;
  const atual = posicaoNaLiga(fe !== undefined ? fe : feDaLigaAtual);
  const meu = meuCargoNaLiga();
  const itens = () => {
    const daFe = LIGAS_DA_FE.map((liga, i) => {
      const pos = posicaoNaLiga(liga.minimo);
      const escondida = liga.secreto && i > atual.indice;
      const porcentagem = textoDaPorcentagem(pos);
      return `
      <div class="liga-item${i === atual.indice && meu !== 'fundador' ? ' atual' : ''}${i > atual.indice ? ' futura' : ''}${escondida ? ' secreta' : ''}" style="--liga:${liga.cor}">
        <span class="liga-item-emblema">${escondida ? '<span class="liga-item-segredo">?</span>' : emblemaDaLiga(i, { pedestal: false })}</span>
        <span class="liga-item-textos"><strong>${escondida ? '???' : textoDaLiga(liga.nome)}</strong><small>${escondida ? textoDaLiga('Rank secreto') : textoDaLiga('A partir de {n} de Fé', { n: numeroDaLiga(liga.minimo) })}</small>${porcentagem ? `<em>${porcentagem}</em>` : ''}</span>
        ${i === atual.indice && meu !== 'fundador' ? `<span class="liga-item-voce">${liga.semDivisoes ? textoDaLiga('Você') : DIVISOES_DAS_LIGAS[atual.divisao]}</span>` : ''}
      </div>`;
    }).join('');
    const celestial = RANKS_ESPECIAIS[INDICE_CELESTIAL];
    return `${daFe}
      <div class="liga-item impossivel" style="--liga:${celestial.cor}">
        <span class="liga-item-emblema">${emblemaDaLiga(INDICE_CELESTIAL, { pedestal: false, classe: 'grande' })}</span>
        <span class="liga-item-textos"><strong>${textoDaLiga(celestial.nome)}</strong><small>${textoDaLiga('Rank impossível de conseguir.')}</small></span>
        ${meu === 'fundador' ? `<span class="liga-item-voce">${textoDaLiga('Você')}</span>` : ''}
      </div>`;
  };
  const corpo = janelaDoCenaculo(textoDaLiga('Ligas da Fé'), `
    <p class="cenaculo-explica">${textoDaLiga('Cada missão dá Fé, que é o seu XP. Junte Fé para subir de divisão e de liga. Cada liga tem 5 divisões: V, IV, III, II e I.')}</p>
    <div class="ligas-lista">${itens()}</div>`);
  if (!porcentagensDasLigas && corpo) carregarPorcentagensDasLigas().then((p) => { if (p && corpo.isConnected && corpo.querySelector('.ligas-lista')) corpo.querySelector('.ligas-lista').innerHTML = itens(); });
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
  const desenhar = () => {
    lugar.innerHTML = htmlDaLigaAtual(feDaLigaAtual);
    lugar.querySelector('#liga-cartao').addEventListener('click', () => abrirTelaDaLiga(feDaLigaAtual, { cargo: meuCargoNaLiga() }));
  };
  desenhar();
  const quem = typeof membroAtivo !== 'undefined' && membroAtivo ? membroAtivo.id : null;
  if (quem && cargoPedidoPara !== quem) {
    carregarMeuCargoNaLiga().then(() => {
      if (!lugar.isConnected) return;
      desenhar();
      verificarSubidaDeLiga(feDaLigaAtual, 700);
    });
  } else {
    verificarSubidaDeLiga(feDaLigaAtual, 700);
  }
  carregarPorcentagensDasLigas();
  const pos = posicaoNaLiga(feDaLigaAtual);
  if ((pos.divisao === 4 || meuCargoNaLiga()) && !menosMovimentoNaLiga()) setTimeout(carregar3dDaLiga, 2500);
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
  if (pos.fim === Infinity) return textoDaLiga('{n} de Fé', { n: numeroDaLiga(pos.fe) });
  return `${numeroDaLiga(Math.round(progresso * (pos.fim - pos.inicio)))} / ${numeroDaLiga(pos.fim - pos.inicio)}`;
}

function preencherTelaDaLiga(tela, pos, opcoes) {
  const o = opcoes || {};
  pintarComALiga(tela, pos.liga);
  ['celestial', 'especial', 'arquiteto', 'fundador', 'empireo'].forEach((c) => tela.classList.remove(c));
  classesDaLiga(pos.liga).split(' ').filter(Boolean).forEach((c) => tela.classList.add(c));
  if (pos.liga.id === 'empireo') tela.classList.add('empireo');
  const nome = tela.querySelector('.liga-tela-nome');
  nome.innerHTML = `<span>${escaparDaLiga(textoDaLiga(pos.liga.nome))}</span>${pos.liga.semDivisoes ? '' : ` <b>${DIVISOES_DAS_LIGAS[pos.divisao]}</b>`}`;
  nome.classList.toggle('longo', textoDaLiga(pos.liga.nome).length > 9);
  nome.classList.toggle('muito-longo', textoDaLiga(pos.liga.nome).length > 13);
  const pips = tela.querySelector('.liga-tela-pips');
  pips.classList.remove('cheias');
  pips.hidden = !!pos.liga.semDivisoes;
  pips.innerHTML = [0, 1, 2, 3, 4].map((d) => `<i class="${d <= pos.divisao ? 'acesa' : ''}${o.pipNovo === d ? ' nova' : ''}"></i>`).join('');
  tela.querySelector('.liga-tela-porcentagem').textContent = textoDaPorcentagem(pos);
  tela.querySelector('.liga-tela-rosacea').innerHTML = rosaceaDaLiga(pos.liga);
  if (!o.manterEmblema) tela.querySelector('.liga-tela-emblema').innerHTML = `<div class="liga-tela-emblema-um">${emblemaDaLiga(pos.indice, { divisao: pos.divisao, classe: 'grande' })}</div>`;
  const progresso = o.progresso !== undefined ? o.progresso : pos.progresso;
  tela.querySelector('.liga-tela-barra-cheia').style.width = `${Math.round(progresso * 100)}%`;
  tela.querySelector('.liga-tela-numeros').textContent = numerosDaLiga(pos, progresso);
  tela.querySelector('.liga-tela-texto').textContent = o.texto || proximoPassoDaLiga(pos);
  const outros = tela.querySelector('.liga-tela-outros');
  const posicoes = tela.posicoesDaLiga || [pos];
  outros.hidden = posicoes.length < 2;
  outros.innerHTML = posicoes.length < 2 ? '' : posicoes.map((p, i) => `<button type="button" class="liga-tela-outro${p.indice === pos.indice ? ' ativo' : ''}" data-qual="${i}" aria-label="${escaparDaLiga(nomeDaDivisao(p))}" title="${escaparDaLiga(nomeDaDivisao(p))}">${emblemaDaLiga(p.indice, { pedestal: false })}<small>${escaparDaLiga(textoDaLiga(p.liga.nome))}</small></button>`).join('');
  outros.querySelectorAll('.liga-tela-outro').forEach((botao) => botao.addEventListener('click', () => {
    if (!tela.classList.contains('pronta')) return;
    const qual = Number(botao.dataset.qual) || 0;
    if (menosMovimentoNaLiga()) abrirTelaDaLiga(Number(tela.dataset.fe) || 0, { posicoes, qual, dono: tela.dataset.dono });
    else reverAnimacaoDaLiga(Number(tela.dataset.fe) || 0, tela.dataset.dono, posicoes, qual);
  }));
}

function faiscasDaLiga() {
  return Array.from({ length: 22 }, (_, i) => `<i data-estilo="--a:${((i * 360) / 22 + ruidoDaLiga(i, 2) * 10).toFixed(0)}deg;--d:${(70 + ruidoDaLiga(i, 4) * 90).toFixed(0)}px;--t:${(0.5 + ruidoDaLiga(i, 6) * 0.5).toFixed(2)}s"></i>`).join('');
}

function abrirTelaDaLiga(fe, opcoes) {
  const o = opcoes || {};
  fecharTelaDaLiga(true);
  const posicoes = o.posicoes || posicoesDaPessoa(fe, o.cargo || null);
  const qual = Math.max(0, Math.min(posicoes.length - 1, o.qual || 0));
  const pos = o.posicao || posicoes[qual];
  const tela = document.createElement('div');
  tela.id = 'liga-tela';
  tela.className = `liga-tela${o.animando ? ' animando' : ''}`;
  tela.dataset.fe = String(pos.fe);
  tela.dataset.dono = o.dono || '';
  tela.posicoesDaLiga = posicoes;
  const poeira = Array.from({ length: 26 }, (_, i) => `<i data-estilo="left:${(ruidoDaLiga(i, 7) * 100).toFixed(1)}%;--d:${(ruidoDaLiga(i, 9) * 9).toFixed(1)}s;--t:${(7 + ruidoDaLiga(i, 11) * 8).toFixed(1)}s;--s:${(1 + ruidoDaLiga(i, 13) * 2.5).toFixed(1)}px"></i>`).join('');
  const colunas = `<svg viewBox="0 0 400 700" preserveAspectRatio="xMidYMax slice"><defs><linearGradient id="liga-coluna" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#0d1130"/><stop offset=".45" stop-color="#2a2f55"/><stop offset="1" stop-color="#0a0d26"/></linearGradient><linearGradient id="liga-chao" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1a1f48" stop-opacity="0"/><stop offset="1" stop-color="#1a1f48"/></linearGradient></defs>${[[8, 1], [62, 0.82], [338, 0.82], [392, 1]].map(([x, s]) => `<g transform="translate(${x} 700) scale(${x < 200 ? s : -s} ${s}) translate(0 -700)"><rect x="-18" y="120" width="36" height="580" fill="url(#liga-coluna)"/><path d="M-18 120 C-18 60 40 20 90 0" fill="none" stroke="#2a2f55" stroke-width="10"/><rect x="-24" y="660" width="48" height="40" fill="#151a3d"/></g>`).join('')}<path d="M0 700 L120 520 H280 L400 700Z" fill="url(#liga-chao)" opacity=".7"/></svg>`;
  const planta = '<svg viewBox="0 0 400 600" preserveAspectRatio="xMidYMid slice"><g fill="none" stroke="currentColor" stroke-width="1.2"><path d="M80 560 V260 L130 180 L180 260 V560 M220 560 V260 L270 180 L320 260 V560 M130 180 V110 M270 180 V110 M120 110 L130 70 L140 110 M260 110 L270 70 L280 110"/><path d="M180 560 V300 C180 230 220 230 220 300 V560"/><circle cx="200" cy="250" r="36"/><circle cx="200" cy="250" r="22"/><path d="M164 250 H236 M200 214 V286 M175 225 L225 275 M225 225 L175 275"/><path d="M40 560 H360 M60 520 H340"/><path d="M100 300 V520 M160 300 V520 M240 300 V520 M300 300 V520" stroke-dasharray="6 6"/></g></svg>';
  const setas = Array.from({ length: 5 }, (_, i) => `<i data-estilo="--i:${i}"></i>`).join('');
  tela.innerHTML = `
    <div class="liga-tela-fundo" aria-hidden="true"><span class="liga-tela-colunas">${colunas}</span><span class="liga-tela-planta">${planta}</span><span class="liga-tela-feixe"></span><span class="liga-tela-feixe dois"></span><span class="liga-tela-nevoa"></span><span class="liga-tela-poeira">${poeira}</span></div>
    <span class="liga-tela-clarao" aria-hidden="true"></span>
    <div class="liga-tela-conteudo" role="dialog" aria-modal="true" aria-label="${escaparDaLiga(textoDaLiga('Ligas da Fé'))}">
      <small class="liga-tela-dono">${o.dono ? escaparDaLiga(textoDaLiga('Liga de {nome}', { nome: o.dono })) : escaparDaLiga(textoDaLiga('Sua liga'))}</small>
      <small class="liga-tela-rotulo"></small>
      <h2 class="liga-tela-nome"></h2>
      <div class="liga-tela-pips"></div>
      <small class="liga-tela-porcentagem"></small>
      <div class="liga-tela-palco">
        <span class="liga-tela-rosacea"></span>
        <span class="liga-tela-raios"></span>
        <span class="liga-tela-brilho"></span>
        <span class="liga-tela-setas">${setas}</span>
        <span class="liga-tela-anel"></span><span class="liga-tela-anel segundo"></span>
        <span class="liga-tela-faiscas">${faiscasDaLiga()}</span>
        <button type="button" class="liga-tela-emblema" aria-label="${escaparDaLiga(textoDaLiga('Ver a animação da liga'))}"></button>
      </div>
      <small class="liga-tela-dica">${escaparDaLiga(textoDaLiga('Toque no emblema para ver a animação'))}</small>
      <div class="liga-tela-barra"><span class="liga-tela-barra-fundo"><span class="liga-tela-barra-cheia"></span><span class="liga-tela-barra-clarao"></span></span><small class="liga-tela-numeros"></small></div>
      <p class="liga-tela-texto"></p>
      <div class="liga-tela-outros" hidden></div>
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
  tela.querySelector('[data-acao="lista"]').addEventListener('click', () => { fecharTelaDaLiga(true); abrirListaDeLigas(pos.especial ? feDaLigaAtual : pos.fe); });
  tela.querySelector('.liga-tela-fundo').addEventListener('click', () => { if (tela.classList.contains('pronta')) fecharTelaDaLiga(); });
  tela.querySelector('.liga-tela-emblema').addEventListener('click', () => {
    if (!tela.classList.contains('pronta') || menosMovimentoNaLiga()) return;
    const atual = (tela.posicoesDaLiga || []).findIndex((p) => p.indice === tela.indiceDaLiga);
    reverAnimacaoDaLiga(Number(tela.dataset.fe) || 0, tela.dataset.dono, tela.posicoesDaLiga, Math.max(0, atual));
  });
  tela.indiceDaLiga = pos.indice;
  document.addEventListener('keydown', teclaDaTelaDaLiga);
  if (!o.animando) {
    requestAnimationFrame(() => tela.classList.add('pronta'));
    somDaLiga('estrela');
  }
  if (!porcentagensDasLigas) carregarPorcentagensDasLigas().then(() => { if (tela.isConnected) tela.querySelector('.liga-tela-porcentagem').textContent = textoDaPorcentagem(pos); });
  return tela;
}

function soltarLuzesDaLiga(tela, quantas) {
  if (!tela.isConnected || menosMovimentoNaLiga()) return;
  const estilo = getComputedStyle(tela);
  let cores = [estilo.getPropertyValue('--liga'), estilo.getPropertyValue('--liga-clara'), '#fff1c2', '#ffffff'];
  if (tela.classList.contains('celestial')) cores = ['#ffd1f0', '#fff1a8', '#b8f3ff', '#d9c2ff', '#ffffff'];
  if (tela.classList.contains('arquiteto')) cores = ['#5ff3ff', '#ffe08a', '#ffffff', '#a5f7ff'];
  if (tela.classList.contains('fundador')) cores = ['#ff5a6e', '#ffe08a', '#ffffff', '#fff3c4'];
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
  const tela = abrirTelaDaLiga(fe, { animando: true, posicao: depois });
  tela.classList.add('divisao');
  preencherTelaDaLiga(tela, antes, { progresso: 0.62 });
  agendarNaTela(() => { tela.querySelector('.liga-tela-barra-cheia').style.width = '100%'; somDaLiga('barra'); }, 250);
  agendarNaTela(() => { tela.classList.add('subindo'); somDaLiga('varrida'); somDaLiga('subida', 0.15); }, 1000);
  agendarNaTela(() => {
    const lugar = tela.querySelector('.liga-tela-emblema');
    const velho = lugar.firstElementChild;
    if (velho) velho.classList.add('sai');
    lugar.insertAdjacentHTML('beforeend', `<div class="liga-tela-emblema-um entra">${emblemaDaLiga(depois.indice, { divisao: depois.divisao, classe: 'grande' })}</div>`);
    setTimeout(() => { if (velho) velho.remove(); }, 700);
    preencherTelaDaLiga(tela, depois, { manterEmblema: true, progresso: 1, pipNovo: depois.divisao, texto: ' ' });
    tela.classList.add('trocou');
    tela.querySelector('.liga-tela-nome').classList.add('trocando');
    tela.querySelector('.liga-tela-rotulo').textContent = textoDaLiga('Subiu de divisão!');
    somDaLiga('troca');
    somDaLiga('estrela', 0.3);
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
    somDaLiga('barra');
  }, 2150);
  agendarNaTela(() => tela.classList.add('pronta'), 2600);
}

function htmlDoCinemaDaLiga(pos) {
  const cacos = Array.from({ length: 16 }, (_, i) => {
    const angulo = (i / 16) * Math.PI * 2 + ruidoDaLiga(i, 3);
    const distancia = 55 + ruidoDaLiga(i, 5) * 45;
    return `<i data-estilo="--x:${(Math.cos(angulo) * distancia).toFixed(0)}vmax;--y:${(Math.sin(angulo) * distancia).toFixed(0)}vmax;--d:${(1 + ruidoDaLiga(i, 8) * 1.4).toFixed(2)}s;--g:${(ruidoDaLiga(i, 4) * 360).toFixed(0)}deg;--t:${(10 + ruidoDaLiga(i, 6) * 26).toFixed(0)}px"></i>`;
  }).join('');
  const tema = temaDaLiga(pos.liga);
  const penas = tema === 'celestial' || tema === 'fundador' ? `<div class="liga-cinema-penas">${Array.from({ length: 14 }, (_, i) => `<i data-estilo="left:${(ruidoDaLiga(i, 21) * 100).toFixed(1)}%;--d:${(2.6 + ruidoDaLiga(i, 22) * 2).toFixed(2)}s;--t:${(2.6 + ruidoDaLiga(i, 23) * 1.6).toFixed(2)}s;--x:${((ruidoDaLiga(i, 24) - 0.5) * 140).toFixed(0)}px"></i>`).join('')}</div>` : '';
  const planta = tema === 'arquiteto' ? '<svg class="liga-cinema-planta" viewBox="0 0 400 600" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><g fill="none" stroke="#5ff3ff" stroke-width="1.6" stroke-linecap="round"><path pathLength="1" d="M60 560 H340 M80 560 V260 L130 180 L180 260 V560 M220 560 V260 L270 180 L320 260 V560"/><path pathLength="1" d="M130 180 V100 L120 100 L130 60 L140 100 L130 100 M270 180 V100 L260 100 L270 60 L280 100 L270 100"/><path pathLength="1" d="M180 560 V300 C180 220 220 220 220 300 V560"/><path pathLength="1" d="M164 250 a36 36 0 1 0 72 0 a36 36 0 1 0 -72 0 M178 250 a22 22 0 1 0 44 0 a22 22 0 1 0 -44 0 M164 250 H236 M200 214 V286"/><path pathLength="1" d="M20 40 H380 M20 120 H380 M20 200 H380 M20 280 H380 M20 360 H380 M20 440 H380 M20 520 H380" stroke-opacity=".25"/></g></svg>' : '';
  return `
    <div class="liga-cinema-fundo"></div>
    ${planta}
    <div class="liga-cinema-feixe um"></div><div class="liga-cinema-feixe dois"></div>
    <div class="liga-cinema-palco3d"></div>
    <div class="liga-cinema-camera"><div class="liga-cinema-objeto">${emblemaDaLiga(pos.indice, { cinema: true, divisao: pos.divisao, classe: 'cinema' })}</div></div>
    <div class="liga-cinema-cacos">${cacos}</div>
    ${penas}
    <div class="liga-cinema-reflexos"><i data-estilo="left:38%;top:34%;--d:1.7s"></i><i data-estilo="left:62%;top:58%;--d:2.4s"></i><i data-estilo="left:47%;top:46%;--d:3.05s"></i></div>
    <div class="liga-cinema-clarao"></div>
    <div class="liga-cinema-escuro"></div>
    <span class="liga-cinema-pular">${escaparDaLiga(textoDaLiga('Toque para pular'))}</span>`;
}

function sonsDoCinema(liga, inicio) {
  const s = (tipo, ms, dur) => agendarNaTela(() => somDaLiga(tipo, 0, dur), inicio + ms);
  const tema = temaDaLiga(liga);
  if (tema === 'celestial') {
    s('coro', 100, 6.2); s('varrida', 300); s('sinos', 1700); s('varrida', 2000); s('cristais', 2400); s('brilho', 3800); s('impacto', 4350); s('sinos', 4400);
  } else if (tema === 'arquiteto') {
    s('digital', 100); s('zumbido', 0, 6); s('varrida', 500); s('digital', 1300); s('cristais', 2400); s('brilho', 3600); s('impacto', 4350); s('digital', 4500);
  } else if (tema === 'fundador') {
    s('zumbido', 0, 6); s('coro', 200, 6); s('varrida', 600); s('sinos', 1800); s('cristais', 2400); s('brilho', 3800); s('impacto', 4350); s('sinos', 4450);
  } else {
    s('zumbido', 0, tema === 'empireo' ? 3.8 : 3.4); s('varrida', 150); s('cristais', 950); s('brilho', 2200); s('impacto', 2450);
    if (tema === 'empireo') { s('coro', 300, 3.6); s('sinos', 2500); }
  }
}

function mostrarSubidaDeLiga(de, para, fe, opcoes) {
  const o = opcoes || {};
  const depois = o.posicao || posicaoNaLiga(fe);
  const antes = o.repetir ? depois : posicaoDoNivel(de);
  const tela = abrirTelaDaLiga(fe, { animando: true, dono: o.dono, posicoes: o.posicoes || [depois], posicao: depois });
  tela.classList.add('nova-liga');
  if (!o.repetir) preencherTelaDaLiga(tela, antes, { progresso: 0.66 });
  const cinema = tela.querySelector('.liga-cinema');
  cinema.innerHTML = htmlDoCinemaDaLiga(depois);
  aplicarEstilosDaLiga(cinema);
  pintarComALiga(cinema, depois.liga);
  cinema.classList.add(`tema-${temaDaLiga(depois.liga)}`);
  const duracao = duracaoDoCinema(depois.liga);
  cinema.style.setProperty('--fim-cinema', `${((duracao - 300) / 1000).toFixed(2)}s`);
  cinema.style.setProperty('--impacto', `${(momentoDoImpacto(depois.liga) / 1000).toFixed(2)}s`);
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
    const nome = textoDaLiga(depois.liga.nome);
    let texto = textoDaLiga('Você subiu da liga {de} para a liga {para} com {n} de Fé.', { de: textoDaLiga(antes.liga.nome), para: nome, n: numeroDaLiga(depois.fe) });
    if (o.repetir) texto = proximoPassoDaLiga(depois);
    if (o.dono) {
      if (depois.liga.id === 'celestial') texto = textoDaLiga('{nome} tem o rank Celestial. Ele é impossível de conseguir.', { nome: o.dono });
      else if (depois.especial) texto = textoDaLiga('{nome} tem o rank especial {liga}.', { nome: o.dono, liga: nome });
      else texto = textoDaLiga('{nome} está na liga {liga}, com {n} de Fé.', { nome: o.dono, liga: nomeDaDivisao(depois), n: numeroDaLiga(depois.fe) });
    }
    preencherTelaDaLiga(tela, depois, { progresso: o.repetir ? depois.progresso : 0, pipNovo: o.repetir ? undefined : depois.divisao, texto });
    tela.indiceDaLiga = depois.indice;
    let rotuloFinal = o.repetir ? '' : textoDaLiga('Nova liga!');
    if (o.dono) rotuloFinal = textoDaLiga('Rank de {nome}', { nome: o.dono });
    if (depois.especial) rotuloFinal = depois.liga.id === 'celestial' ? textoDaLiga('Rank impossível') : textoDaLiga('Rank especial');
    else if (depois.liga.secreto) rotuloFinal = textoDaLiga('Rank secreto');
    tela.querySelector('.liga-tela-rotulo').textContent = rotuloFinal;
    somDaLiga(depois.liga.id === 'fundador' ? 'fanfarraReal' : 'fanfarra');
    if (depois.especial || depois.liga.secreto) somDaLiga('sinos', 0.4);
    if (depois.liga.id === 'arquiteto') somDaLiga('digital', 0.2);
    agendarNaTela(() => {
      tela.querySelector('.liga-tela-barra-cheia').style.width = `${Math.round(depois.progresso * 100)}%`;
      tela.querySelector('.liga-tela-numeros').textContent = numerosDaLiga(depois, depois.progresso);
    }, 700);
    agendarNaTela(() => soltarLuzesDaLiga(tela, depois.especial || depois.liga.secreto ? 90 : 46), 500);
    agendarNaTela(() => tela.classList.add('pronta'), 1300);
  };
  tela.addEventListener('click', () => { if (tela.classList.contains('rasgando') || tela.classList.contains('em-cinema')) final(); });
  const inicioDoRasgo = o.repetir ? 150 : 1100;
  if (!o.repetir) {
    agendarNaTela(() => { tela.querySelector('.liga-tela-barra-cheia').style.width = '100%'; somDaLiga('barra'); }, 250);
    agendarNaTela(() => { tela.querySelector('.liga-tela-pips').classList.add('cheias'); [0, 0.08, 0.16, 0.24, 0.32].forEach((d) => somDaLiga('estrela', d)); }, 750);
  }
  agendarNaTela(() => { tela.classList.add('rasgando'); somDaLiga('rasgo'); }, inicioDoRasgo);
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
  sonsDoCinema(depois.liga, inicioDoRasgo + 250);
  agendarNaTela(final, inicioDoRasgo + 250 + duracao);
}

function reverAnimacaoDaLiga(fe, dono, posicoes, qual) {
  const lista = posicoes && posicoes.length ? posicoes : [posicaoNaLiga(fe)];
  const pos = lista[Math.max(0, Math.min(lista.length - 1, qual || 0))];
  audioDaLiga();
  carregar3dDaLiga().then(() => mostrarSubidaDeLiga(pos.nivel, pos.nivel, fe, { repetir: true, dono, posicao: pos, posicoes: lista }));
}

function mostrarParabensDoCargo(fe, cargo) {
  const posicoes = posicoesDaPessoa(fe, cargo);
  const tela = abrirTelaDaLiga(fe, { posicoes });
  tela.classList.add('parabens');
  tela.querySelector('.liga-tela-rotulo').textContent = textoDaLiga('Parabéns!');
  tela.querySelector('.liga-tela-texto').textContent = cargo === 'fundador'
    ? textoDaLiga('Você é o Fundador do Lumina Sancti e tem três ranks: Fundador, Arquiteto da Luz e Celestial. Toque no emblema para ver a animação.')
    : textoDaLiga('Você é um Arquiteto da Luz, um dos desenvolvedores do Lumina Sancti. Toque no emblema para ver a animação.');
  somDaLiga('sinos');
  somDaLiga(cargo === 'fundador' ? 'fanfarraReal' : 'fanfarra', 0.3);
  setTimeout(() => soltarLuzesDaLiga(tela, 80), 300);
  carregar3dDaLiga();
}

document.addEventListener('click', (evento) => {
  const botao = evento.target.closest && evento.target.closest('[data-liga-fe]');
  if (!botao) return;
  const fe = Number(botao.dataset.ligaFe) || 0;
  const dono = botao.dataset.ligaDono || '';
  const cargo = botao.dataset.ligaCargo || null;
  const posicoes = posicoesDaPessoa(fe, cargo);
  if (dono && !menosMovimentoNaLiga()) reverAnimacaoDaLiga(fe, dono, posicoes, 0);
  else abrirTelaDaLiga(fe, { dono, posicoes });
});

function seloDaLigaNoRanking(fe, cargo) {
  const pos = posicoesDaPessoa(fe, cargo || null)[0];
  return `<span class="ranking-liga${pos.especial ? ' especial' : ''}" title="${escaparDaLiga(nomeDaDivisao(pos))}">${emblemaDaLiga(pos.indice, { pedestal: false })}</span>`;
}

function htmlDoTopoDaLiga(indice) {
  const liga = LIGAS_DA_FE[indice] || LIGAS_DA_FE[0];
  return `<div class="ranking-liga-topo" style="--liga:${liga.cor}">${seloDaLigaNoRanking(liga.minimo)}<span><strong>${textoDaLiga('Liga {nome}', { nome: textoDaLiga(liga.nome) })}</strong><small>${textoDaLiga('Quem está na mesma liga que você.')}</small></span></div>`;
}
