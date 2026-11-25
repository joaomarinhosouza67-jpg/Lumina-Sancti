const MX_P = 1, MX_N = 2, MX_B = 3, MX_R = 4, MX_Q = 5, MX_K = 6;
const MX_MATE = 30000;
const MX_INF = 32000;
const MX_MAX_PLY = 96;

const MX_CAIXA = new Int8Array(120).fill(-1);
const MX_CAIXA64 = new Int16Array(64);
for (let i = 0; i < 64; i += 1) {
  MX_CAIXA64[i] = 21 + (i >> 3) * 10 + (i & 7);
  MX_CAIXA[MX_CAIXA64[i]] = i;
}
const MX_CAVALO = [-21, -19, -12, -8, 8, 12, 19, 21];
const MX_DIAG = [-11, -9, 9, 11];
const MX_RETA = [-10, -1, 1, 10];
const MX_TODAS = [-11, -10, -9, -1, 1, 9, 10, 11];
const MX_MASCARA_ROQUE = new Int8Array(64).fill(15);
MX_MASCARA_ROQUE[60] = 12; MX_MASCARA_ROQUE[63] = 14; MX_MASCARA_ROQUE[56] = 13;
MX_MASCARA_ROQUE[4] = 3; MX_MASCARA_ROQUE[7] = 11; MX_MASCARA_ROQUE[0] = 7;

const MX_VALOR_MG = [0, 82, 337, 365, 477, 1025, 0];
const MX_VALOR_EG = [0, 94, 281, 297, 512, 936, 0];
const MX_FASE = [0, 0, 1, 1, 2, 4, 0];
const MX_TAB_MG = [null,
  [0, 0, 0, 0, 0, 0, 0, 0, 98, 134, 61, 95, 68, 126, 34, -11, -6, 7, 26, 31, 65, 56, 25, -20, -14, 13, 6, 21, 23, 12, 17, -23, -27, -2, -5, 12, 17, 6, 10, -25, -26, -4, -4, -10, 3, 3, 33, -12, -35, -1, -20, -23, -15, 24, 38, -22, 0, 0, 0, 0, 0, 0, 0, 0],
  [-167, -89, -34, -49, 61, -97, -15, -107, -73, -41, 72, 36, 23, 62, 7, -17, -47, 60, 37, 65, 84, 129, 73, 44, -9, 17, 19, 53, 37, 69, 18, 22, -13, 4, 16, 13, 28, 19, 21, -8, -23, -9, 12, 10, 19, 17, 25, -16, -29, -53, -12, -3, -1, 18, -14, -19, -105, -21, -58, -33, -17, -28, -19, -23],
  [-29, 4, -82, -37, -25, -42, 7, -8, -26, 16, -18, -13, 30, 59, 18, -47, -16, 37, 43, 40, 35, 50, 37, -2, -4, 5, 19, 50, 37, 37, 7, -2, -6, 13, 13, 26, 34, 12, 10, 4, 0, 15, 15, 15, 14, 27, 18, 10, 4, 15, 16, 0, 7, 21, 33, 1, -33, -3, -14, -21, -13, -12, -39, -21],
  [32, 42, 32, 51, 63, 9, 31, 43, 27, 32, 58, 62, 80, 67, 26, 44, -5, 19, 26, 36, 17, 45, 61, 16, -24, -11, 7, 26, 24, 35, -8, -20, -36, -26, -12, -1, 9, -7, 6, -23, -45, -25, -16, -17, 3, 0, -5, -33, -44, -16, -20, -9, -1, 11, -6, -71, -19, -13, 1, 17, 16, 7, -37, -26],
  [-28, 0, 29, 12, 59, 44, 43, 45, -24, -39, -5, 1, -16, 57, 28, 54, -13, -17, 7, 8, 29, 56, 47, 57, -27, -27, -16, -16, -1, 17, -2, 1, -9, -26, -9, -10, -2, -4, 3, -3, -14, 2, -11, -2, -5, 2, 14, 5, -35, -8, 11, 2, 8, 15, -3, 1, -1, -18, -9, 10, -15, -25, -31, -50],
  [-65, 23, 16, -15, -56, -34, 2, 13, 29, -1, -20, -7, -8, -4, -38, -29, -9, 24, 2, -16, -20, 6, 22, -22, -17, -20, -12, -27, -30, -25, -14, -36, -49, -1, -27, -39, -46, -44, -33, -51, -14, -14, -22, -46, -44, -30, -15, -27, 1, 7, -8, -64, -43, -16, 9, 8, -15, 36, 12, -54, 8, -28, 24, 14],
];
const MX_TAB_EG = [null,
  [0, 0, 0, 0, 0, 0, 0, 0, 178, 173, 158, 134, 147, 132, 165, 187, 94, 100, 85, 67, 56, 53, 82, 84, 32, 24, 13, 5, -2, 4, 17, 17, 13, 9, -3, -7, -7, -8, 3, -1, 4, 7, -6, 1, 0, -5, -1, -8, 13, 8, 8, 10, 13, 0, 2, -7, 0, 0, 0, 0, 0, 0, 0, 0],
  [-58, -38, -13, -28, -31, -27, -63, -99, -25, -8, -25, -2, -9, -25, -24, -52, -24, -20, 10, 9, -1, -9, -19, -41, -17, 3, 22, 22, 22, 11, 8, -18, -18, -6, 16, 25, 16, 17, 4, -18, -23, -3, -1, 15, 10, -3, -20, -22, -42, -20, -10, -5, -2, -20, -23, -44, -29, -51, -23, -15, -22, -18, -50, -64],
  [-14, -21, -11, -8, -7, -9, -17, -24, -8, -4, 7, -12, -3, -13, -4, -14, 2, -8, 0, -1, -2, 6, 0, 4, -3, 9, 12, 9, 14, 10, 3, 2, -6, 3, 13, 19, 7, 10, -3, -9, -12, -3, 8, 10, 13, 3, -7, -15, -14, -18, -7, -1, 4, -9, -15, -27, -23, -9, -23, -5, -9, -16, -5, -17],
  [13, 10, 18, 15, 12, 12, 8, 5, 11, 13, 13, 11, -3, 3, 8, 3, 7, 7, 7, 5, 4, -3, -5, -3, 4, 3, 13, 1, 2, 1, -1, 2, 3, 5, 8, 4, -5, -6, -8, -11, -4, 0, -5, -1, -7, -12, -8, -16, -6, -6, 0, 2, -9, -9, -11, -3, -9, 2, 3, -1, -5, -13, 4, -20],
  [-9, 22, 22, 27, 27, 19, 10, 20, -17, 20, 32, 41, 58, 25, 30, 0, -20, 6, 9, 49, 47, 35, 19, 9, 3, 22, 24, 45, 57, 40, 57, 36, -18, 28, 19, 47, 31, 34, 39, 23, -16, -27, 15, 6, 9, 17, 10, 5, -22, -23, -30, -16, -16, -23, -36, -32, -33, -28, -22, -43, -5, -32, -20, -41],
  [-74, -35, -18, -18, -11, 15, 4, -17, -12, 17, 14, 17, 17, 38, 23, 11, 10, 17, 23, 15, 20, 45, 44, 13, -8, 22, 24, 27, 26, 33, 26, 3, -18, -4, 21, 24, 27, 23, 9, -11, -19, -3, 11, 21, 23, 16, 7, -9, -27, -11, 4, 13, 14, 4, -5, -17, -53, -34, -21, -11, -28, -14, -24, -43],
];
const MX_MG = [];
const MX_EG = [];
for (let t = 1; t <= 6; t += 1) {
  MX_MG[t] = new Int16Array(64); MX_EG[t] = new Int16Array(64);
  MX_MG[t + 6] = new Int16Array(64); MX_EG[t + 6] = new Int16Array(64);
  for (let s = 0; s < 64; s += 1) {
    MX_MG[t][s] = MX_VALOR_MG[t] + MX_TAB_MG[t][s];
    MX_EG[t][s] = MX_VALOR_EG[t] + MX_TAB_EG[t][s];
    MX_MG[t + 6][s] = MX_VALOR_MG[t] + MX_TAB_MG[t][s ^ 56];
    MX_EG[t + 6][s] = MX_VALOR_EG[t] + MX_TAB_EG[t][s ^ 56];
  }
}

let mxSemente = 0x2545f491;
function mxAleatorio() {
  mxSemente ^= mxSemente << 13; mxSemente ^= mxSemente >>> 17; mxSemente ^= mxSemente << 5;
  return mxSemente | 0;
}
const MX_Z_LO = []; const MX_Z_HI = [];
for (let p = 0; p < 13; p += 1) {
  MX_Z_LO[p] = new Int32Array(64); MX_Z_HI[p] = new Int32Array(64);
  for (let s = 0; s < 64; s += 1) { MX_Z_LO[p][s] = mxAleatorio(); MX_Z_HI[p][s] = mxAleatorio(); }
}
const MX_Z_VEZ_LO = mxAleatorio(); const MX_Z_VEZ_HI = mxAleatorio();
const MX_Z_ROQUE_LO = new Int32Array(16); const MX_Z_ROQUE_HI = new Int32Array(16);
for (let i = 0; i < 16; i += 1) { MX_Z_ROQUE_LO[i] = mxAleatorio(); MX_Z_ROQUE_HI[i] = mxAleatorio(); }
const MX_Z_EP_LO = new Int32Array(8); const MX_Z_EP_HI = new Int32Array(8);
for (let i = 0; i < 8; i += 1) { MX_Z_EP_LO[i] = mxAleatorio(); MX_Z_EP_HI[i] = mxAleatorio(); }

function mxIndice(p) { return p > 0 ? p : 6 - p; }

const MX_TT_BITS = 20;
const MX_TT_TAM = 1 << MX_TT_BITS;
const MX_TT_MASC = MX_TT_TAM - 1;
const mxTtLo = new Int32Array(MX_TT_TAM);
const mxTtHi = new Int32Array(MX_TT_TAM);
const mxTtMov = new Int32Array(MX_TT_TAM);
const mxTtVal = new Int16Array(MX_TT_TAM);
const mxTtProf = new Int8Array(MX_TT_TAM);
const mxTtTipo = new Int8Array(MX_TT_TAM);

const mx = {
  tab: new Int8Array(64), vez: 1, roque: 0, ep: -1, meio: 0, rei: [0, 0, 0],
  lo: 0, hi: 0,
  pilha: 0,
  uCap: new Int8Array(1024), uRoque: new Int8Array(1024), uEp: new Int8Array(1024), uMeio: new Int16Array(1024), uLo: new Int32Array(1024), uHi: new Int32Array(1024),
  hist: new Int32Array(2048), nHist: 0, inicioDaBusca: 0, jogo: new Set(),
  movs: new Int32Array(MX_MAX_PLY * 256), notas: new Int32Array(MX_MAX_PLY * 256),
  matadores: new Int32Array(MX_MAX_PLY * 2), historia: new Int32Array(13 * 64),
  nos: 0, limite: 0, parou: false, ruido: null,
};

function mxReiIdx(cor) { return cor === 1 ? 1 : 2; }

function mxCalcularHash() {
  let lo = 0; let hi = 0;
  for (let s = 0; s < 64; s += 1) { const p = mx.tab[s]; if (p) { lo ^= MX_Z_LO[mxIndice(p)][s]; hi ^= MX_Z_HI[mxIndice(p)][s]; } }
  if (mx.vez === -1) { lo ^= MX_Z_VEZ_LO; hi ^= MX_Z_VEZ_HI; }
  lo ^= MX_Z_ROQUE_LO[mx.roque]; hi ^= MX_Z_ROQUE_HI[mx.roque];
  if (mx.ep >= 0) { lo ^= MX_Z_EP_LO[mx.ep & 7]; hi ^= MX_Z_EP_HI[mx.ep & 7]; }
  mx.lo = lo; mx.hi = hi;
}

function mxAtacada(s, por) {
  const t = mx.tab;
  const c = MX_CAIXA64[s];
  let a;
  if (por === 1) {
    a = MX_CAIXA[c + 9]; if (a >= 0 && t[a] === MX_P) return true;
    a = MX_CAIXA[c + 11]; if (a >= 0 && t[a] === MX_P) return true;
  } else {
    a = MX_CAIXA[c - 9]; if (a >= 0 && t[a] === -MX_P) return true;
    a = MX_CAIXA[c - 11]; if (a >= 0 && t[a] === -MX_P) return true;
  }
  for (let i = 0; i < 8; i += 1) { a = MX_CAIXA[c + MX_CAVALO[i]]; if (a >= 0 && t[a] === MX_N * por) return true; }
  for (let i = 0; i < 8; i += 1) { a = MX_CAIXA[c + MX_TODAS[i]]; if (a >= 0 && t[a] === MX_K * por) return true; }
  for (let i = 0; i < 4; i += 1) {
    const d = MX_DIAG[i]; let x = c + d;
    for (;;) { a = MX_CAIXA[x]; if (a < 0) break; const p = t[a]; if (p) { if (p === MX_B * por || p === MX_Q * por) return true; break; } x += d; }
  }
  for (let i = 0; i < 4; i += 1) {
    const d = MX_RETA[i]; let x = c + d;
    for (;;) { a = MX_CAIXA[x]; if (a < 0) break; const p = t[a]; if (p) { if (p === MX_R * por || p === MX_Q * por) return true; break; } x += d; }
  }
  return false;
}

function mxEmXeque(cor) { return mxAtacada(mx.rei[mxReiIdx(cor)], -cor); }

function mxCodificar(de, para, promo, marca) { return de | (para << 6) | (promo << 12) | (marca << 16); }

function mxGerar(base, soCapturas) {
  const t = mx.tab; const v = mx.vez; let n = base;
  const add = (de, para, promo, marca) => { mx.movs[n] = mxCodificar(de, para, promo, marca); n += 1; };
  for (let s = 0; s < 64; s += 1) {
    const p = t[s];
    if (!p || (p > 0) !== (v === 1)) continue;
    const tipo = p > 0 ? p : -p;
    const c = MX_CAIXA64[s];
    if (tipo === MX_P) {
      const frente = v === 1 ? -10 : 10;
      const ultima = v === 1 ? 0 : 7;
      const inicial = v === 1 ? 6 : 1;
      const um = MX_CAIXA[c + frente];
      if (um >= 0 && !t[um]) {
        if ((um >> 3) === ultima) { add(s, um, MX_Q, 16); if (!soCapturas) { add(s, um, MX_N, 16); add(s, um, MX_R, 16); add(s, um, MX_B, 16); } }
        else if (!soCapturas) {
          add(s, um, 0, 0);
          if ((s >> 3) === inicial) { const dois = MX_CAIXA[c + 2 * frente]; if (dois >= 0 && !t[dois]) add(s, dois, 0, 8); }
        }
      }
      for (const lado of v === 1 ? [-11, -9] : [9, 11]) {
        const a = MX_CAIXA[c + lado];
        if (a < 0) continue;
        if (t[a] && (t[a] > 0) !== (v === 1)) {
          if ((a >> 3) === ultima) { add(s, a, MX_Q, 17); add(s, a, MX_N, 17); add(s, a, MX_R, 17); add(s, a, MX_B, 17); }
          else add(s, a, 0, 1);
        } else if (a === mx.ep) add(s, a, 0, 3);
      }
      continue;
    }
    if (tipo === MX_N || tipo === MX_K) {
      const lista = tipo === MX_N ? MX_CAVALO : MX_TODAS;
      for (let i = 0; i < 8; i += 1) {
        const a = MX_CAIXA[c + lista[i]];
        if (a < 0) continue;
        const q = t[a];
        if (!q) { if (!soCapturas) add(s, a, 0, 0); }
        else if ((q > 0) !== (v === 1)) add(s, a, 0, 1);
      }
      continue;
    }
    const dirs = tipo === MX_B ? MX_DIAG : tipo === MX_R ? MX_RETA : MX_TODAS;
    for (let i = 0; i < dirs.length; i += 1) {
      const d = dirs[i]; let x = c + d;
      for (;;) {
        const a = MX_CAIXA[x]; if (a < 0) break;
        const q = t[a];
        if (!q) { if (!soCapturas) add(s, a, 0, 0); }
        else { if ((q > 0) !== (v === 1)) add(s, a, 0, 1); break; }
        x += d;
      }
    }
  }
  if (!soCapturas) {
    if (v === 1 && t[60] === MX_K) {
      if ((mx.roque & 1) && t[63] === MX_R && !t[61] && !t[62] && !mxAtacada(60, -1) && !mxAtacada(61, -1) && !mxAtacada(62, -1)) add(60, 62, 0, 4);
      if ((mx.roque & 2) && t[56] === MX_R && !t[59] && !t[58] && !t[57] && !mxAtacada(60, -1) && !mxAtacada(59, -1) && !mxAtacada(58, -1)) add(60, 58, 0, 4);
    } else if (v === -1 && t[4] === -MX_K) {
      if ((mx.roque & 4) && t[7] === -MX_R && !t[5] && !t[6] && !mxAtacada(4, 1) && !mxAtacada(5, 1) && !mxAtacada(6, 1)) add(4, 6, 0, 4);
      if ((mx.roque & 8) && t[0] === -MX_R && !t[3] && !t[2] && !t[1] && !mxAtacada(4, 1) && !mxAtacada(3, 1) && !mxAtacada(2, 1)) add(4, 2, 0, 4);
    }
  }
  return n - base;
}

function mxXorPeca(p, s) { const i = mxIndice(p); mx.lo ^= MX_Z_LO[i][s]; mx.hi ^= MX_Z_HI[i][s]; }

function mxFazer(m) {
  const de = m & 63; const para = (m >> 6) & 63; const promo = (m >> 12) & 15; const marca = m >> 16;
  const t = mx.tab; const v = mx.vez;
  const peca = t[de];
  const k = mx.pilha;
  let capturada = t[para];
  mx.uRoque[k] = mx.roque; mx.uEp[k] = mx.ep; mx.uMeio[k] = mx.meio; mx.uLo[k] = mx.lo; mx.uHi[k] = mx.hi;
  mxXorPeca(peca, de);
  if (marca & 2) {
    const casa = para + (v === 1 ? 8 : -8);
    capturada = t[casa]; t[casa] = 0; mxXorPeca(capturada, casa);
  } else if (capturada) mxXorPeca(capturada, para);
  mx.uCap[k] = capturada;
  const nova = promo ? promo * v : peca;
  t[para] = nova; t[de] = 0; mxXorPeca(nova, para);
  if (marca & 4) {
    let rDe; let rPara;
    if (para === 62) { rDe = 63; rPara = 61; } else if (para === 58) { rDe = 56; rPara = 59; } else if (para === 6) { rDe = 7; rPara = 5; } else { rDe = 0; rPara = 3; }
    const torre = t[rDe]; t[rPara] = torre; t[rDe] = 0; mxXorPeca(torre, rDe); mxXorPeca(torre, rPara);
  }
  if (mx.ep >= 0) { mx.lo ^= MX_Z_EP_LO[mx.ep & 7]; mx.hi ^= MX_Z_EP_HI[mx.ep & 7]; }
  mx.ep = (marca & 8) ? (de + para) >> 1 : -1;
  if (mx.ep >= 0) { mx.lo ^= MX_Z_EP_LO[mx.ep & 7]; mx.hi ^= MX_Z_EP_HI[mx.ep & 7]; }
  mx.lo ^= MX_Z_ROQUE_LO[mx.roque]; mx.hi ^= MX_Z_ROQUE_HI[mx.roque];
  mx.roque &= MX_MASCARA_ROQUE[de] & MX_MASCARA_ROQUE[para];
  mx.lo ^= MX_Z_ROQUE_LO[mx.roque]; mx.hi ^= MX_Z_ROQUE_HI[mx.roque];
  mx.meio = (peca === MX_P || peca === -MX_P || capturada) ? 0 : mx.meio + 1;
  if (peca === MX_K * v) mx.rei[mxReiIdx(v)] = para;
  mx.vez = -v; mx.lo ^= MX_Z_VEZ_LO; mx.hi ^= MX_Z_VEZ_HI;
  mx.pilha = k + 1;
  mx.hist[mx.nHist] = mx.lo; mx.nHist += 1;
  if (mxAtacada(mx.rei[mxReiIdx(v)], -v)) { mxDesfazer(m); return false; }
  return true;
}

function mxDesfazer(m) {
  const de = m & 63; const para = (m >> 6) & 63; const promo = (m >> 12) & 15; const marca = m >> 16;
  const t = mx.tab;
  mx.vez = -mx.vez;
  const v = mx.vez;
  mx.pilha -= 1; mx.nHist -= 1;
  const k = mx.pilha;
  const capturada = mx.uCap[k];
  const peca = promo ? MX_P * v : t[para];
  t[de] = peca;
  if (marca & 2) { t[para] = 0; t[para + (v === 1 ? 8 : -8)] = capturada; } else t[para] = capturada;
  if (marca & 4) {
    let rDe; let rPara;
    if (para === 62) { rDe = 63; rPara = 61; } else if (para === 58) { rDe = 56; rPara = 59; } else if (para === 6) { rDe = 7; rPara = 5; } else { rDe = 0; rPara = 3; }
    t[rDe] = t[rPara]; t[rPara] = 0;
  }
  if (peca === MX_K * v) mx.rei[mxReiIdx(v)] = de;
  mx.roque = mx.uRoque[k]; mx.ep = mx.uEp[k]; mx.meio = mx.uMeio[k]; mx.lo = mx.uLo[k]; mx.hi = mx.uHi[k];
}

function mxFazerNulo() {
  const k = mx.pilha;
  mx.uRoque[k] = mx.roque; mx.uEp[k] = mx.ep; mx.uMeio[k] = mx.meio; mx.uLo[k] = mx.lo; mx.uHi[k] = mx.hi; mx.uCap[k] = 0;
  if (mx.ep >= 0) { mx.lo ^= MX_Z_EP_LO[mx.ep & 7]; mx.hi ^= MX_Z_EP_HI[mx.ep & 7]; }
  mx.ep = -1; mx.meio += 1;
  mx.vez = -mx.vez; mx.lo ^= MX_Z_VEZ_LO; mx.hi ^= MX_Z_VEZ_HI;
  mx.pilha = k + 1;
  mx.hist[mx.nHist] = mx.lo; mx.nHist += 1;
}

function mxDesfazerNulo() {
  mx.vez = -mx.vez; mx.pilha -= 1; mx.nHist -= 1;
  const k = mx.pilha;
  mx.roque = mx.uRoque[k]; mx.ep = mx.uEp[k]; mx.meio = mx.uMeio[k]; mx.lo = mx.uLo[k]; mx.hi = mx.uHi[k];
}

function mxAvaliar() {
  const t = mx.tab;
  let mg = 0; let eg = 0; let fase = 0;
  let bispoB = 0; let bispoP = 0; let materialB = 0; let materialP = 0;
  for (let s = 0; s < 64; s += 1) {
    const p = t[s];
    if (!p) continue;
    if (p > 0) {
      mg += MX_MG[p][s]; eg += MX_EG[p][s]; fase += MX_FASE[p];
      if (p === MX_B) bispoB += 1;
      if (p !== MX_K) materialB += MX_VALOR_EG[p];
    } else {
      const q = -p;
      mg -= MX_MG[q + 6][s]; eg -= MX_EG[q + 6][s]; fase += MX_FASE[q];
      if (q === MX_B) bispoP += 1;
      if (q !== MX_K) materialP += MX_VALOR_EG[q];
    }
  }
  if (bispoB >= 2) { mg += 30; eg += 50; }
  if (bispoP >= 2) { mg -= 30; eg -= 50; }
  const f = fase > 24 ? 24 : fase;
  let total = ((mg * f) + (eg * (24 - f))) / 24;
  const diferenca = materialB - materialP;
  if (f <= 6 && (diferenca > 300 || diferenca < -300)) {
    const forte = diferenca > 0 ? 1 : -1;
    const reiFraco = mx.rei[mxReiIdx(-forte)];
    const reiForte = mx.rei[mxReiIdx(forte)];
    const lf = reiFraco >> 3; const cf = reiFraco & 7;
    const centro = Math.max(3 - lf, lf - 4) + Math.max(3 - cf, cf - 4);
    const perto = Math.abs(lf - (reiForte >> 3)) + Math.abs(cf - (reiForte & 7));
    total += forte * (centro * 12 + (14 - perto) * 5);
  }
  total += mx.vez * 10;
  return (mx.vez === 1 ? total : -total) | 0;
}

function mxTemPecas(cor) {
  const t = mx.tab;
  for (let s = 0; s < 64; s += 1) { const p = t[s] * cor; if (p > MX_P && p < MX_K) return true; }
  return false;
}

function mxRepeticao() {
  const lo = mx.lo;
  const limite = Math.max(mx.inicioDaBusca, mx.nHist - 1 - mx.meio);
  for (let i = mx.nHist - 3; i >= limite; i -= 2) if (mx.hist[i] === lo) return true;
  return mx.jogo.has(lo);
}

function mxNotas(base, n, ply, movTT) {
  const t = mx.tab;
  for (let i = 0; i < n; i += 1) {
    const m = mx.movs[base + i];
    let nota = 0;
    if (m === movTT) nota = 2000000;
    else {
      const de = m & 63; const para = (m >> 6) & 63; const marca = m >> 16;
      if (marca & 1) {
        const vit = (marca & 2) ? MX_P : Math.abs(t[para]);
        nota = 1000000 + vit * 10 - Math.abs(t[de]);
      } else if (marca & 16) nota = 950000;
      else if (m === mx.matadores[ply * 2]) nota = 900000;
      else if (m === mx.matadores[ply * 2 + 1]) nota = 800000;
      else nota = mx.historia[mxIndice(t[de]) * 64 + para];
    }
    mx.notas[base + i] = nota;
  }
}

function mxEscolher(base, i, n) {
  let melhor = i;
  for (let j = i + 1; j < n; j += 1) if (mx.notas[base + j] > mx.notas[base + melhor]) melhor = j;
  if (melhor !== i) {
    const m = mx.movs[base + i]; mx.movs[base + i] = mx.movs[base + melhor]; mx.movs[base + melhor] = m;
    const x = mx.notas[base + i]; mx.notas[base + i] = mx.notas[base + melhor]; mx.notas[base + melhor] = x;
  }
  return mx.movs[base + i];
}

function mxRelogio() {
  mx.nos += 1;
  if ((mx.nos & 2047) === 0 && Date.now() > mx.limite) mx.parou = true;
  return mx.parou;
}

function mxQuieto(alfa, beta, ply) {
  if (mxRelogio()) return 0;
  const parado = mxAvaliar();
  if (ply >= MX_MAX_PLY - 1) return parado;
  if (parado >= beta) return parado;
  if (parado > alfa) alfa = parado;
  const base = ply * 256;
  const n = mxGerar(base, true);
  mxNotas(base, n, ply, 0);
  let melhor = parado;
  for (let i = 0; i < n; i += 1) {
    const m = mxEscolher(base, i, n);
    const marca = m >> 16;
    if (!(marca & 16)) {
      const para = (m >> 6) & 63;
      const ganho = (marca & 2) ? MX_VALOR_MG[MX_P] : MX_VALOR_MG[Math.abs(mx.tab[para])];
      if (parado + ganho + 200 < alfa) continue;
    }
    if (!mxFazer(m)) continue;
    const v = -mxQuieto(-beta, -alfa, ply + 1);
    mxDesfazer(m);
    if (mx.parou) return 0;
    if (v > melhor) {
      melhor = v;
      if (v > alfa) { alfa = v; if (v >= beta) return v; }
    }
  }
  return melhor;
}

function mxGuardar(prof, valor, tipo, mov, ply) {
  const i = mx.lo & MX_TT_MASC;
  if (mxTtProf[i] > prof && mxTtLo[i] === mx.lo && mxTtHi[i] === mx.hi && tipo !== 0) return;
  let v = valor;
  if (v > MX_MATE - 200) v += ply; else if (v < -MX_MATE + 200) v -= ply;
  mxTtLo[i] = mx.lo; mxTtHi[i] = mx.hi; mxTtProf[i] = prof; mxTtVal[i] = v; mxTtTipo[i] = tipo; mxTtMov[i] = mov;
}

function mxBuscar(prof, alfa, beta, ply, podeNulo) {
  if (mxRelogio()) return 0;
  const raiz = ply === 0;
  if (!raiz) {
    if (mx.meio >= 100 || mxRepeticao()) return 0;
    if (ply >= MX_MAX_PLY - 2) return mxAvaliar();
    const piso = -MX_MATE + ply; const teto = MX_MATE - ply - 1;
    if (alfa < piso) alfa = piso;
    if (beta > teto) beta = teto;
    if (alfa >= beta) return alfa;
  }
  const xeque = mxEmXeque(mx.vez);
  if (xeque) prof += 1;
  if (prof <= 0) return mxQuieto(alfa, beta, ply);
  const pv = beta - alfa > 1;
  const i = mx.lo & MX_TT_MASC;
  let movTT = 0;
  if (mxTtLo[i] === mx.lo && mxTtHi[i] === mx.hi) {
    movTT = mxTtMov[i];
    if (!raiz && !pv && mxTtProf[i] >= prof) {
      let v = mxTtVal[i];
      if (v > MX_MATE - 200) v -= ply; else if (v < -MX_MATE + 200) v += ply;
      const tipo = mxTtTipo[i];
      if (tipo === 0) return v;
      if (tipo === 1 && v >= beta) return v;
      if (tipo === 2 && v <= alfa) return v;
    }
  }
  if (!raiz && !pv && !xeque) {
    const parado = mxAvaliar();
    if (prof <= 3 && parado - 110 * prof >= beta && Math.abs(beta) < MX_MATE - 200) return parado;
    if (podeNulo && prof >= 3 && parado >= beta && mxTemPecas(mx.vez)) {
      const r = prof >= 7 ? 3 : 2;
      mxFazerNulo();
      const v = -mxBuscar(prof - 1 - r, -beta, -beta + 1, ply + 1, false);
      mxDesfazerNulo();
      if (mx.parou) return 0;
      if (v >= beta) return Math.abs(v) > MX_MATE - 200 ? beta : v;
    }
  }
  const base = ply * 256;
  const n = mxGerar(base, false);
  mxNotas(base, n, ply, movTT);
  const alfaOriginal = alfa;
  let melhor = -MX_INF; let melhorMov = 0; let legais = 0;
  for (let k = 0; k < n; k += 1) {
    const m = mxEscolher(base, k, n);
    const marca = m >> 16;
    const peca = mx.tab[m & 63];
    if (!mxFazer(m)) continue;
    legais += 1;
    let v;
    const quieto = !(marca & 17);
    const daXeque = mxEmXeque(mx.vez);
    let extra = 0;
    if (raiz && mx.ruido) extra = mx.ruido.get(m) || 0;
    if (legais === 1) v = -mxBuscar(prof - 1, -beta, -alfa, ply + 1, true);
    else {
      let r = 0;
      if (prof >= 3 && legais > 3 && quieto && !xeque && !daXeque) r = legais > 10 && prof >= 6 ? 2 : 1;
      v = -mxBuscar(prof - 1 - r, -alfa - 1, -alfa, ply + 1, true);
      if (v > alfa && r) v = -mxBuscar(prof - 1, -alfa - 1, -alfa, ply + 1, true);
      if (v > alfa && v < beta) v = -mxBuscar(prof - 1, -beta, -alfa, ply + 1, true);
    }
    mxDesfazer(m);
    if (mx.parou) return 0;
    v += extra;
    if (v > melhor) {
      melhor = v; melhorMov = m;
      if (raiz) mx.melhorDaRaiz = m;
      if (v > alfa) {
        alfa = v;
        if (v >= beta) {
          if (quieto) {
            if (mx.matadores[ply * 2] !== m) { mx.matadores[ply * 2 + 1] = mx.matadores[ply * 2]; mx.matadores[ply * 2] = m; }
            const h = mxIndice(peca) * 64 + ((m >> 6) & 63);
            mx.historia[h] += prof * prof;
            if (mx.historia[h] > 700000) for (let x = 0; x < mx.historia.length; x += 1) mx.historia[x] >>= 1;
          }
          mxGuardar(prof, v, 1, m, ply);
          return v;
        }
      }
    }
  }
  if (!legais) return xeque ? -MX_MATE + ply : 0;
  mxGuardar(prof, melhor, melhor > alfaOriginal ? 0 : 2, melhorMov, ply);
  return melhor;
}

const MX_LETRAS = { p: MX_P, n: MX_N, b: MX_B, r: MX_R, q: MX_Q, k: MX_K };

function mxCarregar(pedido) {
  for (let s = 0; s < 64; s += 1) {
    const l = pedido.tab[s] || '';
    if (!l) { mx.tab[s] = 0; continue; }
    const tipo = MX_LETRAS[l.toLowerCase()];
    mx.tab[s] = l === l.toUpperCase() ? tipo : -tipo;
    if (tipo === MX_K) mx.rei[mxReiIdx(l === l.toUpperCase() ? 1 : -1)] = s;
  }
  mx.vez = pedido.vez === 'b' ? -1 : 1;
  const r = pedido.roque || {};
  mx.roque = (r.K ? 1 : 0) | (r.Q ? 2 : 0) | (r.k ? 4 : 0) | (r.q ? 8 : 0);
  mx.ep = typeof pedido.ep === 'number' && pedido.ep >= 0 ? pedido.ep : -1;
  mx.meio = pedido.meio || 0;
  mx.pilha = 0; mx.nHist = 0;
  mxCalcularHash();
  mx.jogo = new Set();
  (pedido.anteriores || []).forEach((chave) => {
    const salvo = { tab: mx.tab.slice(), vez: mx.vez, roque: mx.roque, ep: mx.ep, rei: mx.rei.slice(), lo: mx.lo, hi: mx.hi };
    if (mxCarregarChave(chave)) { mxCalcularHash(); if (mx.lo !== salvo.lo || mx.hi !== salvo.hi) mx.jogo.add(mx.lo); }
    mx.tab.set(salvo.tab); mx.vez = salvo.vez; mx.roque = salvo.roque; mx.ep = salvo.ep; mx.rei = salvo.rei; mx.lo = salvo.lo; mx.hi = salvo.hi;
  });
  mx.hist[0] = mx.lo; mx.nHist = 1; mx.inicioDaBusca = 0;
}

function mxCarregarChave(chave) {
  if (typeof chave !== 'string' || chave.length < 65) return false;
  for (let s = 0; s < 64; s += 1) {
    const l = chave[s];
    if (l === '.') { mx.tab[s] = 0; continue; }
    const tipo = MX_LETRAS[l.toLowerCase()];
    if (!tipo) return false;
    mx.tab[s] = l === l.toUpperCase() ? tipo : -tipo;
  }
  mx.vez = chave[64] === 'b' ? -1 : 1;
  const resto = chave.slice(65);
  const m = resto.match(/^([KQkq]*)(-?\d+)$/);
  if (!m) return false;
  mx.roque = (m[1].includes('K') ? 1 : 0) | (m[1].includes('Q') ? 2 : 0) | (m[1].includes('k') ? 4 : 0) | (m[1].includes('q') ? 8 : 0);
  mx.ep = Number(m[2]);
  return true;
}

function mxPensar(pedido) {
  mxCarregar(pedido);
  const tempo = Math.max(50, Math.min(20000, pedido.tempo || 1000));
  const profMax = Math.max(1, Math.min(60, pedido.profundidade || 60));
  mx.nos = 0; mx.parou = false; mx.limite = Date.now() + tempo;
  mx.matadores.fill(0);
  for (let x = 0; x < mx.historia.length; x += 1) mx.historia[x] >>= 2;
  const base = 0;
  const n = mxGerar(base, false);
  const legais = [];
  for (let i = 0; i < n; i += 1) { const m = mx.movs[base + i]; if (mxFazer(m)) { legais.push(m); mxDesfazer(m); } }
  if (!legais.length) return null;
  mx.ruido = null;
  if (pedido.ruido > 0) {
    mx.ruido = new Map();
    legais.forEach((m) => mx.ruido.set(m, Math.round((Math.random() - 0.5) * pedido.ruido)));
  }
  let melhor = legais[0]; let valor = 0; let profFeita = 0;
  if (legais.length === 1) return { mov: melhor, valor: 0, prof: 0, nos: 0 };
  for (let prof = 1; prof <= profMax; prof += 1) {
    mx.melhorDaRaiz = 0;
    let janela = 40;
    let alfa = prof >= 4 ? valor - janela : -MX_INF;
    let beta = prof >= 4 ? valor + janela : MX_INF;
    let v;
    for (;;) {
      v = mxBuscar(prof, alfa, beta, 0, false);
      if (mx.parou) break;
      if (v <= alfa) { alfa = Math.max(-MX_INF, alfa - janela * 4); janela *= 4; continue; }
      if (v >= beta) { beta = Math.min(MX_INF, beta + janela * 4); janela *= 4; continue; }
      break;
    }
    if (mx.parou) { if (mx.melhorDaRaiz && profFeita >= 1 && legais.includes(mx.melhorDaRaiz)) melhor = mx.melhorDaRaiz; break; }
    if (mx.melhorDaRaiz) melhor = mx.melhorDaRaiz;
    valor = v; profFeita = prof;
    if (Math.abs(v) > MX_MATE - 200 && prof >= 3) break;
    if (Date.now() > mx.limite - tempo * 0.45 && prof >= 4) break;
  }
  return { mov: melhor, valor, prof: profFeita, nos: mx.nos };
}

function mxResposta(pedido) {
  const r = mxPensar(pedido);
  if (!r) return { id: pedido.id, nada: true };
  const m = r.mov;
  const promo = (m >> 12) & 15;
  return { id: pedido.id, de: m & 63, para: (m >> 6) & 63, promocao: promo ? 'pnbrqk'[promo - 1] : '', valor: r.valor, prof: r.prof, nos: r.nos };
}

if (typeof module !== 'undefined' && module.exports) module.exports = { mxResposta, mxPensar };
else if (typeof self !== 'undefined' && typeof document === 'undefined') {
  self.onmessage = (e) => {
    const pedido = e.data || {};
    try { self.postMessage(mxResposta(pedido)); } catch (erro) { self.postMessage({ id: pedido.id, erro: String(erro && erro.message || erro) }); }
  };
}
