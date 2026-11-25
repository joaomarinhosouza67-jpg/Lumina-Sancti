const ACORDES_DAS_PARTITURAS = {
  C: ['C3', 'G3', 'C4', 'E4', 'G4'],
  D: ['D3', 'A3', 'D4', 'F#4', 'A4'],
  D7: ['D3', 'A3', 'C4', 'F#4', 'A4'],
  E: ['E2', 'B2', 'E3', 'G#3', 'B3'],
  Em: ['E2', 'B2', 'E3', 'G3', 'B3'],
  F: ['F2', 'C3', 'F3', 'A3', 'C4'],
  G: ['G2', 'D3', 'G3', 'B3', 'D4'],
  G7: ['G2', 'D3', 'F3', 'B3', 'D4'],
  A: ['A2', 'E3', 'A3', 'C#4', 'E4'],
  A7: ['A2', 'E3', 'G3', 'C#4', 'E4'],
  Am: ['A2', 'E3', 'A3', 'C4', 'E4'],
  B7: ['B2', 'F#3', 'A3', 'D#4', 'F#4'],
  Bm: ['B2', 'F#3', 'B3', 'D4', 'F#4'],
  'F#m': ['F#2', 'C#3', 'F#3', 'A3', 'C#4'],
};

const ALBERTI_DAS_PARTITURAS = {
  C: ['C3', 'G3', 'E3', 'G3'],
  F: ['C3', 'A3', 'F3', 'A3'],
  G7: ['B2', 'F3', 'D3', 'F3'],
};

function cifrasDaPartitura(texto) { return texto.trim().split(/\s+/); }

function acompanharPartitura(cifras, padrao, passo, tabela) {
  const t = tabela || ACORDES_DAS_PARTITURAS;
  return cifrasDaPartitura(cifras).map((c) => padrao.map((i) => (Array.isArray(i) ? i.map((k) => t[c][k]).join('+') : t[c][i]) + ':' + passo).join(' ')).join(' ');
}

function blocosDaPartitura(cifras, indices, dur) { return acompanharPartitura(cifras, [indices], dur); }

function baixosDaPartitura(cifras, dur) { return acompanharPartitura(cifras, [0], dur); }

function repetirPartitura(texto, vezes) { return Array.from({ length: vezes }, () => texto).join(' '); }

function tercinasDaPartitura(notas, vezes) { return repetirPartitura(notas.split(' ').map((n) => n + ':1').join(' '), vezes); }

const ACORDES_DO_PRELUDIO = [
  'C4 E4 G4 C5 E5', 'C4 D4 A4 D5 F5', 'B3 D4 G4 D5 F5', 'C4 E4 G4 C5 E5',
  'C4 E4 A4 E5 A5', 'C4 D4 F#4 A4 D5', 'B3 D4 G4 D5 G5', 'B3 C4 E4 G4 C5',
  'A3 C4 E4 G4 C5', 'D3 A3 D4 F#4 C5', 'G3 B3 D4 G4 B4', 'G3 Bb3 E4 G4 C#5',
  'F3 A3 D4 A4 D5', 'F3 Ab3 D4 F4 B4', 'E3 G3 C4 G4 C5', 'E3 F3 A3 C4 F4',
  'D3 F3 A3 C4 F4', 'G2 D3 G3 B3 F4', 'C3 E3 G3 C4 E4', 'C3 G3 Bb3 C4 E4',
  'F2 F3 A3 C4 E4', 'F#2 C3 A3 C4 Eb4', 'Ab2 F3 B3 C4 D4', 'G2 F3 G3 B3 D4',
  'G2 E3 G3 C4 E4', 'G2 D3 G3 C4 F4', 'G2 D3 G3 B3 F4', 'G2 Eb3 A3 C4 F#4',
  'G2 E3 G3 C4 G4', 'G2 D3 G3 C4 F4', 'G2 D3 G3 B3 F4', 'C2 C3 G3 Bb3 E4',
];

function preludioDeBach() {
  const compassos = ACORDES_DO_PRELUDIO.map((a) => {
    const n = a.split(' ');
    const meia = [n[0], n[1], n[2], n[3], n[4], n[2], n[3], n[4]].map((x) => x + ':1').join(' ');
    return meia + ' ' + meia;
  });
  return compassos.join(' ') + ' C2+C3+G3+C4+E4:16';
}

function melodiaDoCanone() {
  return [
    'r:16',
    'F#5:2 E5 D5 C#5 B4 A4 B4 C#5',
    'D5:2 C#5 B4 A4 G4 F#4 G4 E4',
    'D4:1 F#4 A4 G4 F#4 D4 F#4 E4 D4 B3 D4 A4 G4 B4 A4 G4',
    'D5:0.5 F#5 A5 F#5 C#5 E5 A5 E5 B4 D5 F#5 D5 A4 C#5 F#5 C#5 B4 D5 G5 D5 A4 D5 F#5 D5 B4 D5 G5 D5 C#5 E5 A5 E5',
    'F#5+D5:2 E5+C#5 D5+B4 C#5+A4 B4+G4 A4+F#4 B4+G4 C#5+A4',
    'D5:1 F#5 A5 G5 F#5 D5 F#5 E5 D5 B4 D5 A5 G5 B5 A5 G5',
    'F#5:2 E5 D5 C#5 B4 A4 B4 C#5',
  ].join(' ');
}

const ELISA_A_DIREITA = ['E5:1 D#5 E5 B4 D5 C5', 'A4:2 r:1 C4:1 E4 A4', 'B4:2 r:1 E4:1 G#4 B4', 'C5:2 r:1 E4:1 E5 D#5', 'E5:1 D#5 E5 B4 D5 C5', 'A4:2 r:1 C4:1 E4 A4', 'B4:2 r:1 E4:1 C5 B4'];
const ELISA_A_ESQUERDA = ['r:6', 'A2:1 E3 A3 r:3', 'E2:1 E3 G#3 r:3', 'A2:1 E3 A3 r:3', 'r:6', 'A2:1 E3 A3 r:3', 'E2:1 E3 G#3 r:3'];

function paraElisaDireita() {
  const a = ELISA_A_DIREITA.join(' ');
  return ['E5:1 D#5:1', a, 'A4:2 r:2 E5:1 D#5:1', a, 'A4:2 r:1 B4:1 C5 D5', 'E5:3 G4:1 F5 E5', 'D5:3 F4:1 E5 D5', 'C5:3 E4:1 D5 C5', 'B4:2 r:1 E4:1 E5 D#5', a, 'A4:6', 'r:4'].join(' ');
}

function paraElisaEsquerda() {
  const a = ELISA_A_ESQUERDA.join(' ');
  const la = 'A2:1 E3 A3 r:3';
  return ['r:2', a, la, a, la, 'C3:1 G3 C4 r:3', 'G2:1 G3 B3 r:3', la, 'E2:1 E3 G#3 r:3', a, la, 'r:4'].join(' ');
}

const LUAR_COMPASSO_4 = 'G#3:1 C4 F#4 G#3 C#4 E4 G#3 C#4 D#4 F#3 C4 D#4';

function luarTercinas() {
  const dom = tercinasDaPartitura('G#3 C#4 E4', 4);
  const la = tercinasDaPartitura('A3 C#4 E4', 2) + ' ' + tercinasDaPartitura('A3 D4 F#4', 2);
  return [dom, dom, la, LUAR_COMPASSO_4, dom, dom, la, LUAR_COMPASSO_4, dom, tercinasDaPartitura('G#3 B3 E4', 4), tercinasDaPartitura('A3 C#4 F#4', 4), LUAR_COMPASSO_4].join(' ');
}

function variacaoDoTema(notas) {
  const nomes = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
  const vizinha = (nome, passo) => {
    const letra = nome[0]; const oit = Number(nome.slice(-1));
    let i = nomes.indexOf(letra) + passo; let o = oit;
    if (i > 6) { i -= 7; o += 1; } if (i < 0) { i += 7; o -= 1; }
    return nomes[i] + o;
  };
  return notas.map(([n, d]) => {
    const grupo = [n, vizinha(n, 1), n, vizinha(n, -1)];
    const vezes = d / 4;
    return repetirPartitura(grupo.map((x) => x + ':1').join(' '), vezes);
  }).join(' ');
}

const TEMA_DA_ESTRELINHA = (() => {
  const a = [['C5', 4], ['C5', 4], ['G5', 4], ['G5', 4], ['A5', 4], ['A5', 4], ['G5', 8]];
  const b = [['F5', 4], ['F5', 4], ['E5', 4], ['E5', 4], ['D5', 4], ['D5', 4], ['C5', 8]];
  const c = [['G5', 4], ['G5', 4], ['F5', 4], ['F5', 4], ['E5', 4], ['E5', 4], ['D5', 8]];
  return [...a, ...b, ...c, ...c, ...a, ...b];
})();
const CIFRAS_DA_ESTRELINHA = 'C C C C F F C C F F C C G7 G7 C C C C G7 G7 C C G7 G7 C C G7 G7 C C G7 G7 C C C C F F C C F F C C G7 G7 C C';

const FAIXAS_CLASSICAS_DOS_JOGOS = [
  {
    id: 'preludio', ganho: 0.55, nome: 'Prelúdio em Dó', autor: 'Bach', bpm: 66, divisao: 4,
    vozes: [{ instrumento: 'piano', vol: 0.3, pedal: 8, eco: 0.35, texto: preludioDeBach() }],
  },
  {
    id: 'canone', ganho: 1.3, nome: 'Cânone em Ré', autor: 'Pachelbel', bpm: 54, divisao: 2,
    vozes: [
      { instrumento: 'cordas', vol: 0.13, eco: 0.4, texto: repetirPartitura('D3:2 A2 B2 F#2 G2 D2 G2 A2', 8) },
      { instrumento: 'cordas', vol: 0.1, eco: 0.5, texto: repetirPartitura(blocosDaPartitura('D A Bm F#m G D G A', [2, 3, 4], 2), 8) },
      { instrumento: 'piano', vol: 0.3, pedal: 2, eco: 0.35, texto: melodiaDoCanone() },
    ],
  },
  {
    id: 'elisa', ganho: 0.62, nome: 'Para Elisa', autor: 'Beethoven', bpm: 84, divisao: 4,
    vozes: [
      { instrumento: 'piano', vol: 0.3, eco: 0.3, texto: paraElisaDireita() },
      { instrumento: 'piano', vol: 0.2, pedal: 4, eco: 0.3, texto: paraElisaEsquerda() },
    ],
  },
  {
    id: 'alegria', ganho: 0.85, nome: 'Hino à Alegria', autor: 'Beethoven', bpm: 104, divisao: 2,
    vozes: [
      { instrumento: 'piano', vol: 0.3, transpor: 12, eco: 0.3, texto: [
        'F#4:2 F#4 G4 A4 A4 G4 F#4 E4 D4 D4 E4 F#4 F#4:3 E4:1 E4:4',
        'F#4:2 F#4 G4 A4 A4 G4 F#4 E4 D4 D4 E4 F#4 E4:3 D4:1 D4:4',
        'E4:2 E4 F#4 D4 E4 F#4:1 G4:1 F#4:2 D4 E4 F#4:1 G4:1 F#4:2 E4 D4 E4 A3:4',
        'F#4:2 F#4 G4 A4 A4 G4 F#4 E4 D4 D4 E4 F#4 E4:3 D4:1 D4:4',
      ].join(' ') },
      { instrumento: 'harpa', vol: 0.08, eco: 0.3, texto: acompanharPartitura('D D D A D D A A D D D A D D A D A D A D A D G A D D D A D D A D', [0, 2, 3, 4], 1) },
      { instrumento: 'cordas', vol: 0.06, eco: 0.4, texto: blocosDaPartitura('D D D A D D A A D D D A D D A D A D A D A D G A D D D A D D A D', [1, 2, 3], 4) },
    ],
  },
  {
    id: 'gymnopedie', ganho: 1.3, nome: 'Gymnopédie nº 1', autor: 'Satie', bpm: 72, divisao: 1,
    vozes: [
      { instrumento: 'piano', vol: 0.16, pedal: 3, eco: 0.45, texto: repetirPartitura('G2:1 B3+D4+F#4:2 D2:1 A3+C#4+F#4:2', 12) },
      { instrumento: 'piano', vol: 0.3, eco: 0.45, texto: 'r:12 r:1 F#5:1 A5 G5 F#5 C#5 B4 C#5 D5 A4:3 F#4:12 r:1 F#5:1 A5 G5 F#5 C#5 B4 C#5 D5 A4:3 C#5:3 F#5:3 E5:12 r:6' },
    ],
  },
  {
    id: 'luar', ganho: 1.05, nome: 'Sonata ao Luar', autor: 'Beethoven', bpm: 52, divisao: 3,
    vozes: [
      { instrumento: 'piano', vol: 0.13, pedal: 3, eco: 0.45, texto: luarTercinas() },
      { instrumento: 'piano', vol: 0.18, pedal: 6, eco: 0.45, texto: 'C#2+C#3:12 B1+B2:12 A1+A2:6 F#1+F#2:6 G#1+G#2:12 C#2+C#3:12 C#2+C#3:12 A1+A2:6 F#1+F#2:6 G#1+G#2:12 C#2+C#3:12 E2+E3:12 F#1+F#2:12 G#1+G#2:12' },
      { instrumento: 'piano', vol: 0.3, eco: 0.45, texto: 'r:48 r:9 G#4:2.25 G#4:0.75 G#4:9 G#4:2.25 G#4:0.75 A4:9 A4:2.25 A4:0.75 G#4:6 F#4:6 E4:12 G#4:9 G#4:2.25 G#4:0.75 A4:9 A4:2.25 A4:0.75 G#4:6 F#4:6' },
    ],
  },
  {
    id: 'ninar', ganho: 1.05, nome: 'Canção de Ninar', autor: 'Brahms', bpm: 76, divisao: 2,
    vozes: [
      { instrumento: 'sino', vol: 0.14, transpor: 12, eco: 0.5, texto: 'r:4 E4:1 E4:1 G4:4 E4:1 E4:1 G4:4 E4:1 G4:1 C5:2 B4:3 A4:1 A4:2 G4:2 D4:1 E4:1 F4:2 D4:2 D4:1 E4:1 F4:4 D4:1 F4:1 B4:1 A4:1 G4:2 B4:2 C5:4 C4:1 C4:1 C5:4 A4:1 F4:1 G4:4 E4:1 C4:1 F4:2 G4:2 A4:2 G4:4 C4:1 C4:1 C5:4 A4:1 F4:1 G4:4 E4:1 C4:1 F4:2 E4:2 D4:2 C4:6' },
      { instrumento: 'piano', vol: 0.11, pedal: 6, eco: 0.45, texto: acompanharPartitura('C C C F C G7 G7 G7 C F C F C F C G7 C', [0, 1, 2, 3, 2, 1], 1) },
    ],
  },
  {
    id: 'noite', ganho: 1.05, nome: 'Noite Feliz', autor: 'Gruber', bpm: 48, divisao: 3,
    vozes: [
      { instrumento: 'piano', vol: 0.3, eco: 0.45, transpor: 12, texto: 'G4:3 A4:1 G4:2 E4:6 G4:3 A4:1 G4:2 E4:6 D5:4 D5:2 B4:6 C5:4 C5:2 G4:6 A4:4 A4:2 C5:3 B4:1 A4:2 G4:3 A4:1 G4:2 E4:6 A4:4 A4:2 C5:3 B4:1 A4:2 G4:3 A4:1 G4:2 E4:6 D5:4 D5:2 F5:3 D5:1 B4:2 C5:6 E5:6 C5:3 G4:1 E4:2 G4:3 F4:1 D4:2 C4:12' },
      { instrumento: 'harpa', vol: 0.09, eco: 0.4, texto: acompanharPartitura('C C C C G7 G7 C C F F C C F F C C G7 G7 C C C G7 C C', [0, 2, 3, 4, 3, 2], 1) },
      { instrumento: 'cordas', vol: 0.05, eco: 0.5, texto: blocosDaPartitura('C C C C G7 G7 C C F F C C F F C C G7 G7 C C C G7 C C', [1, 2, 3], 6) },
    ],
  },
  {
    id: 'graca', ganho: 0.75, nome: 'Amazing Grace', autor: 'Tradicional', bpm: 84, divisao: 2,
    vozes: [
      { instrumento: 'flauta', vol: 0.16, transpor: 12, eco: 0.45, texto: 'r:4 D4:2 G4:4 B4:1 G4:1 B4:4 A4:2 G4:4 E4:2 D4:4 D4:2 G4:4 B4:1 G4:1 B4:4 A4:2 D5:6 D5:4 B4:1 D5:1 B4:4 G4:2 D4:4 E4:2 G4:4 E4:2 D4:4 D4:2 G4:4 B4:1 G4:1 B4:4 A4:2 G4:6' },
      { instrumento: 'orgao', vol: 0.07, eco: 0.55, texto: blocosDaPartitura('G G G C G G G D G G G C G G D7 G', [1, 2, 3], 6) },
      { instrumento: 'piano', vol: 0.14, pedal: 6, eco: 0.4, texto: acompanharPartitura('G G G C G G G D G G G C G G D7 G', [0, 2, 3], 2) },
    ],
  },
  {
    id: 'greensleeves', ganho: 0.85, nome: 'Greensleeves', autor: 'Tradicional', bpm: 52, divisao: 3,
    vozes: [
      { instrumento: 'flauta', vol: 0.15, eco: 0.45, texto: 'C5:2 D5:1 E5:1.5 F5:0.5 E5:1 D5:2 B4:1 G4:1.5 A4:0.5 B4:1 C5:2 A4:1 A4:1.5 G#4:0.5 A4:1 B4:2 G#4:1 E4:2 A4:1 C5:2 D5:1 E5:1.5 F5:0.5 E5:1 D5:2 B4:1 G4:1.5 A4:0.5 B4:1 C5:1.5 B4:0.5 A4:1 G#4:1.5 F#4:0.5 G#4:1 A4:6 G5:3 G5:1.5 F#5:0.5 E5:1 D5:2 B4:1 G4:1.5 A4:0.5 B4:1 C5:2 A4:1 A4:1.5 G#4:0.5 A4:1 B4:2 G#4:1 E4:3 G5:3 G5:1.5 F#5:0.5 E5:1 D5:2 B4:1 G4:1.5 A4:0.5 B4:1 C5:1.5 B4:0.5 A4:1 G#4:1.5 F#4:0.5 G#4:1 A4:5 A4:1' },
      { instrumento: 'harpa', vol: 0.11, eco: 0.4, texto: acompanharPartitura('Am Am G G Am Am E E Am Am G G Am E Am Am C C G G Am Am E E C C G G Am E Am Am', [0, 2, 3], 1) },
    ],
  },
  {
    id: 'jesus', ganho: 0.75, nome: 'Jesus, Alegria dos Homens', autor: 'Bach', bpm: 60, divisao: 3,
    vozes: [
      { instrumento: 'piano', vol: 0.28, eco: 0.4, texto: [
        'G4:1 A4 B4 D5 C5 C5 E5 D5 D5 G5 F#5 G5 D5 B4 G4 A4 B4 C5 D5 E5 D5 C5 B4 A4 B4 G4 F#4 G4 A4 D4 F#4 A4 C5 B4 A4 B4',
        'G4:1 A4 B4 D5 C5 C5 E5 D5 D5 G5 F#5 G5 D5 B4 G4 A4 B4 C5 D5 E5 D5 C5 B4 A4 B4 G4 E4 D4 G4 F#4 G4:3 r:3',
      ].join(' ') },
      { instrumento: 'orgao', vol: 0.07, eco: 0.55, texto: blocosDaPartitura('G C G Em G D7 G Am D G D7 G G C G Em G D7 G Am D Em D G', [1, 2, 3], 3) },
      { instrumento: 'baixo', vol: 0.16, texto: baixosDaPartitura('G C G Em G D7 G Am D G D7 G G C G Em G D7 G Am D Em D G', 3) },
    ],
  },
  {
    id: 'minueto', ganho: 1.9, nome: 'Minueto em Sol', autor: 'Petzold', bpm: 120, divisao: 2,
    vozes: [
      { instrumento: 'cravo', vol: 0.32, eco: 0.3, texto: 'D5:2 G4:1 A4 B4 C5 D5:2 G4 G4 E5:2 C5:1 D5 E5 F#5 G5:2 G4 G4 C5:2 D5:1 C5 B4 A4 B4:2 C5:1 B4 A4 G4 F#4:2 G4:1 A4 B4 G4 A4:6 D5:2 G4:1 A4 B4 C5 D5:2 G4 G4 E5:2 C5:1 D5 E5 F#5 G5:2 G4 G4 C5:2 D5:1 C5 B4 A4 B4:2 C5:1 B4 A4 G4 A4:2 B4:1 A4 G4 F#4 G4:6' },
      { instrumento: 'cravo', vol: 0.24, eco: 0.3, texto: 'G3:4 A3:2 B3:6 C4:6 B3:6 A3:6 G3:6 D4:2 B3:2 G3:2 D4:2 D3:1 C4:1 B3:1 A3:1 G3:4 A3:2 B3:6 C4:6 B3:6 A3:6 G3:6 C4:2 D4:2 D3:2 G3:4 G2:2' },
    ],
  },
  {
    id: 'manha', ganho: 0.85, nome: 'Manhã', autor: 'Grieg', bpm: 46, divisao: 3,
    vozes: [
      { instrumento: 'flauta', vol: 0.16, eco: 0.5, texto: 'B5:1 G#5 F#5 E5 F#5 G#5 B5 G#5 F#5 E5 F#5 G#5 F#5 G#5 B5 G#5 B5 C#6 G#5 C#6 B5 G#5 F#5 E5:13 r:36 B5:1 G#5 F#5 E5 F#5 G#5 B5 G#5 F#5 E5 F#5 G#5 F#5 G#5 B5 G#5 B5 C#6 G#5 C#6 B5 G#5 F#5 E5:13' },
      { instrumento: 'oboe', vol: 0.12, eco: 0.5, transpor: -12, texto: 'r:36 B5:1 G#5 F#5 E5 F#5 G#5 B5 G#5 F#5 E5 F#5 G#5 F#5 G#5 B5 G#5 B5 C#6 G#5 C#6 B5 G#5 F#5 E5:13 r:36' },
      { instrumento: 'cordas', vol: 0.07, eco: 0.5, texto: blocosDaPartitura('E E E E E E E E E E E E E E A B7 E E', [1, 2, 3, 4], 6) },
      { instrumento: 'baixo', vol: 0.12, texto: baixosDaPartitura('E E E E E E E E E E E E E E A B7 E E', 6) },
    ],
  },
  {
    id: 'largo', ganho: 1.0, nome: 'Largo do Novo Mundo', autor: 'Dvořák', bpm: 48, divisao: 2,
    vozes: [
      { instrumento: 'oboe', vol: 0.14, eco: 0.5, texto: 'F#4:3 A4:1 A4:4 F#4:3 E4:1 D4:4 E4:2 F#4:2 A4:2 F#4:2 E4:8 F#4:3 A4:1 A4:4 F#4:3 E4:1 D4:4 E4:2 F#4:2 E4:2 D4:2 D4:8 r:64' },
      { instrumento: 'piano', vol: 0.28, transpor: 12, eco: 0.45, texto: 'r:64 F#4:3 A4:1 A4:4 F#4:3 E4:1 D4:4 E4:2 F#4:2 A4:2 F#4:2 E4:8 F#4:3 A4:1 A4:4 F#4:3 E4:1 D4:4 E4:2 F#4:2 E4:2 D4:2 D4:8' },
      { instrumento: 'cordas', vol: 0.08, eco: 0.5, texto: repetirPartitura(blocosDaPartitura('D D D G A D A A D D D G A A7 D D', [0, 1, 2], 4), 2) },
    ],
  },
  {
    id: 'montanha', ganho: 1.6, nome: 'Na Gruta do Rei da Montanha', autor: 'Grieg', bpm: 120, divisao: 2, acelerar: true,
    vozes: (() => {
      const a = 'B3:1 C#4 D4 E4 F#4 D4 F#4:2 F4:1 C#4 F4:2 E4:1 C4 E4:2 B3:1 C#4 D4 E4 F#4 D4 F#4 B4 A4:1 F#4 D4 F#4 A4:4';
      const b = 'F#4:1 G#4 A4 B4 C#5 A4 C#5:2 C5:1 G#4 C5:2 B4:1 G4 B4:2 F#4:1 G#4 A4 B4 C#5 A4 C#5 F#5 E5:1 C#5 A4 C#5 E5:4';
      const baixoA = repetirPartitura('B2:1 r:1 F#2:1 r:1', 8);
      const baixoB = repetirPartitura('F#2:1 r:1 C#3:1 r:1', 8);
      return [
        { instrumento: 'pizz', vol: 0.34, transpor: 12, eco: 0.2, texto: [a, a, b, a].join(' ') },
        { instrumento: 'pizz', vol: 0.24, eco: 0.15, texto: [baixoA, baixoA, baixoB, baixoA].join(' ') },
      ];
    })(),
  },
  {
    id: 'estrelinha', ganho: 0.72, nome: 'Brilha, Brilha, Estrelinha', autor: 'Mozart', bpm: 96, divisao: 4,
    vozes: [
      { instrumento: 'piano', vol: 0.28, eco: 0.3, texto: TEMA_DA_ESTRELINHA.map(([n, d]) => `${n}:${d}`).join(' ') + ' ' + variacaoDoTema(TEMA_DA_ESTRELINHA) },
      { instrumento: 'piano', vol: 0.12, pedal: 2, eco: 0.3, texto: repetirPartitura(acompanharPartitura(CIFRAS_DA_ESTRELINHA, [0, 1, 2, 3], 1, ALBERTI_DAS_PARTITURAS), 2) },
    ],
  },
];
