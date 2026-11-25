const MD_DIRS = [[-1, -1], [-1, 1], [1, -1], [1, 1]];
const MD_MATE = 30000;
const MD_INF = 32000;
const MD_MAX_PLY = 80;

let mdSemente = 0x1b873593;
function mdAleatorio() {
  mdSemente ^= mdSemente << 13; mdSemente ^= mdSemente >>> 17; mdSemente ^= mdSemente << 5;
  return mdSemente | 0;
}
const MD_Z = [];
for (let p = 0; p < 5; p += 1) { MD_Z[p] = new Int32Array(64); for (let s = 0; s < 64; s += 1) MD_Z[p][s] = mdAleatorio(); }
const MD_Z_VEZ = mdAleatorio();
function mdIndice(p) { return p + 2; }

const MD_TT_TAM = 1 << 19;
const MD_TT_MASC = MD_TT_TAM - 1;
const mdTtChave = new Int32Array(MD_TT_TAM);
const mdTtVal = new Int16Array(MD_TT_TAM);
const mdTtProf = new Int8Array(MD_TT_TAM);
const mdTtTipo = new Int8Array(MD_TT_TAM);
const mdTtMov = new Int32Array(MD_TT_TAM);

const md = {
  tab: new Int8Array(64), vez: 1, sem: 0, livre: false, hash: 0,
  hist: new Int32Array(1024), nHist: 0, jogo: new Set(),
  nos: 0, limite: 0, parou: false, ruido: null, melhorDaRaiz: null,
  matadores: new Int32Array(MD_MAX_PLY * 2), historia: new Int32Array(64 * 64),
};

function mdCor(p) { return p > 0 ? 1 : p < 0 ? -1 : 0; }

function mdCalcularHash() {
  let h = 0;
  for (let s = 0; s < 64; s += 1) if (md.tab[s]) h ^= MD_Z[mdIndice(md.tab[s])][s];
  if (md.vez === -1) h ^= MD_Z_VEZ;
  md.hash = h;
}

const MD_RAIOS = [];
for (let s = 0; s < 64; s += 1) {
  MD_RAIOS[s] = [];
  for (let d = 0; d < 4; d += 1) {
    const raio = [];
    let x = (s >> 3) + MD_DIRS[d][0]; let y = (s & 7) + MD_DIRS[d][1];
    while (x >= 0 && x < 8 && y >= 0 && y < 8) { raio.push(x * 8 + y); x += MD_DIRS[d][0]; y += MD_DIRS[d][1]; }
    MD_RAIOS[s][d] = raio;
  }
}
const mdMarcadas = new Uint8Array(64);
const mdPilhaCap = [];

function mdCapturasDe(de, lista) {
  const t = md.tab;
  const peca = t[de];
  const cor = peca > 0 ? 1 : -1;
  const dama = peca === 2 || peca === -2;
  const livreOuOrigem = (q) => !t[q] || q === de;
  const buscar = (casa) => {
    let achou = false;
    for (let d = 0; d < 4; d += 1) {
      const raio = MD_RAIOS[casa][d];
      if (dama) {
        let k = 0;
        while (k < raio.length && livreOuOrigem(raio[k])) k += 1;
        if (k >= raio.length) continue;
        const alvo = raio[k];
        const q = t[alvo];
        if (!(q && (q > 0 ? 1 : -1) === -cor) || mdMarcadas[alvo]) continue;
        k += 1;
        while (k < raio.length && livreOuOrigem(raio[k])) {
          achou = true;
          mdMarcadas[alvo] = 1; mdPilhaCap.push(alvo);
          buscar(raio[k]);
          mdPilhaCap.pop(); mdMarcadas[alvo] = 0;
          k += 1;
        }
      } else {
        if (raio.length < 2) continue;
        const alvo = raio[0]; const pouso = raio[1];
        const q = t[alvo];
        if (!(q && (q > 0 ? 1 : -1) === -cor) || mdMarcadas[alvo]) continue;
        if (t[pouso] && pouso !== de) continue;
        achou = true;
        mdMarcadas[alvo] = 1; mdPilhaCap.push(alvo);
        buscar(pouso);
        mdPilhaCap.pop(); mdMarcadas[alvo] = 0;
      }
    }
    if (!achou && mdPilhaCap.length) lista.push({ de, para: casa, cap: mdPilhaCap.slice() });
  };
  buscar(de);
}

function mdJogadas(soCapturas) {
  const t = md.tab; const v = md.vez;
  let capturas = [];
  const simples = [];
  for (let s = 0; s < 64; s += 1) {
    const p = t[s];
    if (!p || (p > 0 ? 1 : -1) !== v) continue;
    mdCapturasDe(s, capturas);
    if (soCapturas || (capturas.length && !md.livre)) continue;
    if (p === 2 || p === -2) {
      for (let d = 0; d < 4; d += 1) {
        const raio = MD_RAIOS[s][d];
        for (let k = 0; k < raio.length && !t[raio[k]]; k += 1) simples.push({ de: s, para: raio[k], cap: [] });
      }
    } else {
      const d1 = v === 1 ? 0 : 2;
      for (let d = d1; d < d1 + 2; d += 1) {
        const raio = MD_RAIOS[s][d];
        if (raio.length && !t[raio[0]]) simples.push({ de: s, para: raio[0], cap: [] });
      }
    }
  }
  if (capturas.length && !md.livre) {
    let maior = 0;
    for (const m of capturas) if (m.cap.length > maior) maior = m.cap.length;
    if (capturas.some((m) => m.cap.length !== maior)) capturas = capturas.filter((m) => m.cap.length === maior);
    return capturas;
  }
  if (soCapturas) return capturas;
  return capturas.length ? capturas.concat(simples) : simples;
}

function mdFazer(m) {
  const t = md.tab;
  const p = t[m.de];
  const desfazer = { m, p, tirados: m.cap.map((c) => t[c]), sem: md.sem, hash: md.hash, virou: false };
  md.hash ^= MD_Z[mdIndice(p)][m.de];
  t[m.de] = 0;
  for (const c of m.cap) { md.hash ^= MD_Z[mdIndice(t[c])][c]; t[c] = 0; }
  let nova = p;
  const linha = m.para >> 3;
  if ((p === 1 && linha === 0) || (p === -1 && linha === 7)) { nova = p * 2; desfazer.virou = true; }
  t[m.para] = nova;
  md.hash ^= MD_Z[mdIndice(nova)][m.para];
  md.sem = m.cap.length || (p === 1 || p === -1) ? 0 : md.sem + 1;
  md.vez = -md.vez; md.hash ^= MD_Z_VEZ;
  md.hist[md.nHist] = md.hash; md.nHist += 1;
  return desfazer;
}

function mdDesfazer(d) {
  const t = md.tab; const m = d.m;
  md.vez = -md.vez; md.nHist -= 1;
  t[m.para] = 0;
  t[m.de] = d.p;
  m.cap.forEach((c, i) => { t[c] = d.tirados[i]; });
  md.sem = d.sem; md.hash = d.hash;
}

function mdAvaliar() {
  const t = md.tab;
  let total = 0; let materialB = 0; let materialP = 0; let damasB = 0; let damasP = 0; let pecas = 0;
  for (let s = 0; s < 64; s += 1) {
    const p = t[s];
    if (!p) continue;
    pecas += 1;
    if (p === 2 || p === -2) { if (p > 0) damasB += 1; else damasP += 1; }
  }
  for (let s = 0; s < 64; s += 1) {
    const p = t[s];
    if (!p) continue;
    const l = s >> 3; const c = s & 7;
    const cor = p > 0 ? 1 : -1;
    let v;
    if (p === 2 || p === -2) {
      v = 310;
      if ((l === c) || (l + c === 7)) v += 14;
      if (l >= 2 && l <= 5 && c >= 2 && c <= 5) v += 6;
    } else {
      const avanco = cor === 1 ? 7 - l : l;
      v = 100 + avanco * 5 + (avanco >= 5 ? 12 : 0);
      if (avanco === 0 && pecas > 12 && (cor === 1 ? damasP : damasB) === 0) v += 10;
      if (c >= 2 && c <= 5 && l >= 2 && l <= 5) v += 5;
      if (c === 0 || c === 7) v -= 4;
      const atras = cor === 1 ? l + 1 : l - 1;
      if (atras >= 0 && atras < 8) {
        if (c > 0 && mdCor(t[atras * 8 + c - 1]) === cor) v += 3;
        if (c < 7 && mdCor(t[atras * 8 + c + 1]) === cor) v += 3;
      }
    }
    if (cor === 1) { total += v; materialB += v; } else { total -= v; materialP += v; }
  }
  const soma = materialB + materialP;
  if (soma > 0 && materialB !== materialP) total += Math.round((materialB - materialP) * 600 / soma) - Math.round((materialB - materialP) * 600 / 2400);
  return md.vez === 1 ? total : -total;
}

function mdRelogio() {
  md.nos += 1;
  if ((md.nos & 1023) === 0 && Date.now() > md.limite) md.parou = true;
  return md.parou;
}

function mdChaveDoMov(m) { return m.de | (m.para << 6) | ((m.cap.length ? m.cap[0] : 63) << 12); }

function mdOrdenar(lista, movTT, ply) {
  for (const m of lista) {
    const k = mdChaveDoMov(m);
    let n;
    if (k === movTT) n = 3000000;
    else if (m.cap.length) n = 1000000 + m.cap.length * 1000;
    else if (k === md.matadores[ply * 2]) n = 900000;
    else if (k === md.matadores[ply * 2 + 1]) n = 800000;
    else n = md.historia[m.de * 64 + m.para];
    m.nota = n;
  }
  lista.sort((a, b) => b.nota - a.nota);
}

function mdRepeticao() {
  for (let i = md.nHist - 3; i >= 0 && i >= md.nHist - 1 - md.sem; i -= 2) if (md.hist[i] === md.hash) return true;
  return md.jogo.has(md.hash);
}

function mdQuieto(alfa, beta, ply) {
  if (mdRelogio()) return 0;
  if (ply >= MD_MAX_PLY - 1) return mdAvaliar();
  const capturas = mdJogadas(true);
  const obrigado = capturas.length && !md.livre;
  let melhor = -MD_INF;
  if (!obrigado) {
    const parado = mdAvaliar();
    if (parado >= beta) return parado;
    if (parado > alfa) alfa = parado;
    melhor = parado;
  }
  if (obrigado) {
    let maior = 0;
    for (const m of capturas) if (m.cap.length > maior) maior = m.cap.length;
    for (let i = capturas.length - 1; i >= 0; i -= 1) if (capturas[i].cap.length !== maior) capturas.splice(i, 1);
  }
  capturas.sort((a, b) => b.cap.length - a.cap.length);
  for (const m of capturas) {
    const d = mdFazer(m);
    const v = -mdQuieto(-beta, -alfa, ply + 1);
    mdDesfazer(d);
    if (md.parou) return 0;
    if (v > melhor) { melhor = v; if (v > alfa) { alfa = v; if (v >= beta) return v; } }
  }
  if (melhor === -MD_INF) {
    if (!mdJogadas(false).length) return -MD_MATE + ply;
    return mdAvaliar();
  }
  return melhor;
}

function mdGuardar(prof, valor, tipo, mov, ply) {
  const i = md.hash & MD_TT_MASC;
  let v = valor;
  if (v > MD_MATE - 200) v += ply; else if (v < -MD_MATE + 200) v -= ply;
  mdTtChave[i] = md.hash; mdTtProf[i] = prof; mdTtVal[i] = v; mdTtTipo[i] = tipo; mdTtMov[i] = mov;
}

function mdBuscar(prof, alfa, beta, ply) {
  if (mdRelogio()) return 0;
  const raiz = ply === 0;
  if (!raiz) {
    if (md.sem >= 40 || mdRepeticao()) return 0;
    if (ply >= MD_MAX_PLY - 2) return mdAvaliar();
  }
  const lista = mdJogadas(false);
  if (!lista.length) return -MD_MATE + ply;
  const forcado = lista[0].cap.length > 0 && !md.livre;
  if (prof <= 0 && !forcado) return mdQuieto(alfa, beta, ply);
  if (prof <= -6) return mdAvaliar();
  if (lista.length === 1 && !raiz) prof += 1;
  const pv = beta - alfa > 1;
  const i = md.hash & MD_TT_MASC;
  let movTT = -1;
  if (mdTtChave[i] === md.hash) {
    movTT = mdTtMov[i];
    if (!raiz && !pv && mdTtProf[i] >= prof) {
      let v = mdTtVal[i];
      if (v > MD_MATE - 200) v -= ply; else if (v < -MD_MATE + 200) v += ply;
      const tipo = mdTtTipo[i];
      if (tipo === 0) return v;
      if (tipo === 1 && v >= beta) return v;
      if (tipo === 2 && v <= alfa) return v;
    }
  }
  mdOrdenar(lista, movTT, ply);
  const alfaOriginal = alfa;
  let melhor = -MD_INF; let melhorK = 0; let n = 0;
  for (const m of lista) {
    const d = mdFazer(m);
    n += 1;
    let v;
    if (n === 1) v = -mdBuscar(prof - 1, -beta, -alfa, ply + 1);
    else {
      const r = md.livre && prof >= 4 && n > 6 && !m.cap.length ? 1 : 0;
      v = -mdBuscar(prof - 1 - r, -alfa - 1, -alfa, ply + 1);
      if (v > alfa && r) v = -mdBuscar(prof - 1, -alfa - 1, -alfa, ply + 1);
      if (v > alfa && v < beta) v = -mdBuscar(prof - 1, -beta, -alfa, ply + 1);
    }
    mdDesfazer(d);
    if (md.parou) return 0;
    if (raiz && md.ruido) v += md.ruido.get(mdChaveDoMov(m)) || 0;
    if (v > melhor) {
      melhor = v; melhorK = mdChaveDoMov(m);
      if (raiz) md.melhorDaRaiz = m;
      if (v > alfa) {
        alfa = v;
        if (v >= beta) {
          if (!m.cap.length) {
            if (md.matadores[ply * 2] !== melhorK) { md.matadores[ply * 2 + 1] = md.matadores[ply * 2]; md.matadores[ply * 2] = melhorK; }
            md.historia[m.de * 64 + m.para] += prof * prof;
          }
          mdGuardar(prof, v, 1, melhorK, ply);
          return v;
        }
      }
    }
  }
  mdGuardar(prof, melhor, melhor > alfaOriginal ? 0 : 2, melhorK, ply);
  return melhor;
}

function mdLer(tab) {
  for (let s = 0; s < 64; s += 1) {
    const l = tab[s] || '';
    md.tab[s] = l === 'w' ? 1 : l === 'W' ? 2 : l === 'b' ? -1 : l === 'B' ? -2 : 0;
  }
}

function mdPensar(pedido) {
  md.livre = !!pedido.capturaLivre;
  md.jogo = new Set();
  (pedido.anteriores || []).forEach((chave) => {
    if (typeof chave !== 'string' || chave.length < 65) return;
    mdLer(chave.slice(0, 64).split('').map((x) => (x === '.' ? '' : x)));
    md.vez = chave[64] === 'b' ? -1 : 1;
    mdCalcularHash();
    md.jogo.add(md.hash);
  });
  mdLer(pedido.tab);
  md.vez = pedido.vez === 'b' ? -1 : 1;
  md.sem = pedido.semCaptura || 0;
  mdCalcularHash();
  md.jogo.delete(md.hash);
  md.nHist = 0; md.hist[0] = md.hash; md.nHist = 1;
  const tempo = Math.max(50, Math.min(20000, pedido.tempo || 1000));
  const profMax = Math.max(1, Math.min(60, pedido.profundidade || 60));
  md.nos = 0; md.parou = false; md.limite = Date.now() + tempo;
  md.matadores.fill(0);
  for (let x = 0; x < md.historia.length; x += 1) md.historia[x] >>= 2;
  const lista = mdJogadas(false);
  if (!lista.length) return null;
  if (lista.length === 1) return { mov: lista[0], valor: 0, prof: 0 };
  md.ruido = null;
  if (pedido.ruido > 0) { md.ruido = new Map(); lista.forEach((m) => md.ruido.set(mdChaveDoMov(m), Math.round((Math.random() - 0.5) * pedido.ruido))); }
  let melhor = lista[0]; let valor = 0; let feita = 0;
  for (let prof = 1; prof <= profMax; prof += 1) {
    md.melhorDaRaiz = null;
    const v = mdBuscar(prof, -MD_INF, MD_INF, 0);
    if (md.parou) { if (md.melhorDaRaiz && feita >= 1) melhor = md.melhorDaRaiz; break; }
    if (md.melhorDaRaiz) melhor = md.melhorDaRaiz;
    valor = v; feita = prof;
    if (Math.abs(v) > MD_MATE - 200 && prof >= 4) break;
    if (Date.now() > md.limite - tempo * 0.45 && prof >= 6) break;
  }
  return { mov: melhor, valor, prof: feita };
}

function mdResposta(pedido) {
  const r = mdPensar(pedido);
  if (!r) return { id: pedido.id, nada: true };
  return { id: pedido.id, de: r.mov.de, para: r.mov.para, capturadas: r.mov.cap.slice().sort((a, b) => a - b), valor: r.valor, prof: r.prof, nos: md.nos };
}

if (typeof module !== 'undefined' && module.exports) module.exports = { mdResposta };
else if (typeof self !== 'undefined' && typeof document === 'undefined') {
  self.onmessage = (e) => {
    const pedido = e.data || {};
    try { self.postMessage(mdResposta(pedido)); } catch (erro) { self.postMessage({ id: pedido.id, erro: String(erro && erro.message || erro) }); }
  };
}
