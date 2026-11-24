const XADREZ_VALORES = { p: 100, n: 320, b: 330, r: 500, q: 900, k: 0 };
const XADREZ_TABELAS = {
  p: [0, 0, 0, 0, 0, 0, 0, 0, 50, 50, 50, 50, 50, 50, 50, 50, 10, 10, 20, 30, 30, 20, 10, 10, 5, 5, 10, 25, 25, 10, 5, 5, 0, 0, 0, 20, 20, 0, 0, 0, 5, -5, -10, 0, 0, -10, -5, 5, 5, 10, 10, -20, -20, 10, 10, 5, 0, 0, 0, 0, 0, 0, 0, 0],
  n: [-50, -40, -30, -30, -30, -30, -40, -50, -40, -20, 0, 0, 0, 0, -20, -40, -30, 0, 10, 15, 15, 10, 0, -30, -30, 5, 15, 20, 20, 15, 5, -30, -30, 0, 15, 20, 20, 15, 0, -30, -30, 5, 10, 15, 15, 10, 5, -30, -40, -20, 0, 5, 5, 0, -20, -40, -50, -40, -30, -30, -30, -30, -40, -50],
  b: [-20, -10, -10, -10, -10, -10, -10, -20, -10, 0, 0, 0, 0, 0, 0, -10, -10, 0, 5, 10, 10, 5, 0, -10, -10, 5, 5, 10, 10, 5, 5, -10, -10, 0, 10, 10, 10, 10, 0, -10, -10, 10, 10, 10, 10, 10, 10, -10, -10, 5, 0, 0, 0, 0, 5, -10, -20, -10, -10, -10, -10, -10, -10, -20],
  r: [0, 0, 0, 0, 0, 0, 0, 0, 5, 10, 10, 10, 10, 10, 10, 5, -5, 0, 0, 0, 0, 0, 0, -5, -5, 0, 0, 0, 0, 0, 0, -5, -5, 0, 0, 0, 0, 0, 0, -5, -5, 0, 0, 0, 0, 0, 0, -5, -5, 0, 0, 0, 0, 0, 0, -5, 0, 0, 0, 5, 5, 0, 0, 0],
  q: [-20, -10, -10, -5, -5, -10, -10, -20, -10, 0, 0, 0, 0, 0, 0, -10, -10, 0, 5, 5, 5, 5, 0, -10, -5, 0, 5, 5, 5, 5, 0, -5, 0, 0, 5, 5, 5, 5, 0, -5, -10, 5, 5, 5, 5, 5, 0, -10, -10, 0, 5, 0, 0, 0, 0, -10, -20, -10, -10, -5, -5, -10, -10, -20],
  k: [-30, -40, -40, -50, -50, -40, -40, -30, -30, -40, -40, -50, -50, -40, -40, -30, -30, -40, -40, -50, -50, -40, -40, -30, -30, -40, -40, -50, -50, -40, -40, -30, -20, -30, -30, -40, -40, -30, -30, -20, -10, -20, -20, -20, -20, -20, -20, -10, 20, 20, 0, 0, 0, 0, 20, 20, 20, 30, 10, 0, 0, 10, 30, 20],
  kFim: [-50, -40, -30, -20, -20, -30, -40, -50, -30, -20, -10, 0, 0, -10, -20, -30, -30, -10, 20, 30, 30, 20, -10, -30, -30, -10, 30, 40, 40, 30, -10, -30, -30, -10, 30, 40, 40, 30, -10, -30, -30, -10, 20, 30, 30, 20, -10, -30, -30, -30, 0, 0, 0, 0, -30, -30, -50, -30, -30, -30, -30, -30, -30, -50],
};
const XADREZ_CAVALO = [[-2, -1], [-2, 1], [-1, -2], [-1, 2], [1, -2], [1, 2], [2, -1], [2, 1]];
const XADREZ_REI = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
const XADREZ_DIAGONAIS = [[-1, -1], [-1, 1], [1, -1], [1, 1]];
const XADREZ_RETAS = [[-1, 0], [1, 0], [0, -1], [0, 1]];

function xadrezCorDe(peca) { return !peca ? '' : peca === peca.toUpperCase() ? 'w' : 'b'; }
function xadrezNome(casa) { return 'abcdefgh'[casa % 8] + (8 - Math.floor(casa / 8)); }

function xadrezInicial() {
  const linha = ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'];
  const tab = Array(64).fill('');
  for (let c = 0; c < 8; c += 1) { tab[c] = linha[c]; tab[8 + c] = 'p'; tab[48 + c] = 'P'; tab[56 + c] = linha[c].toUpperCase(); }
  return { tab, vez: 'w', roque: { K: true, Q: true, k: true, q: true }, ep: -1, meio: 0, jogada: 1, posicoes: {} };
}

function xadrezChave(est) {
  return `${est.tab.map((p) => p || '.').join('')}${est.vez}${est.roque.K ? 'K' : ''}${est.roque.Q ? 'Q' : ''}${est.roque.k ? 'k' : ''}${est.roque.q ? 'q' : ''}${est.ep}`;
}

function xadrezAtacada(tab, casa, por) {
  const l = Math.floor(casa / 8); const c = casa % 8;
  const dentro = (a, b) => a >= 0 && a < 8 && b >= 0 && b < 8;
  const peao = por === 'w' ? 'P' : 'p';
  const dl = por === 'w' ? 1 : -1;
  for (const dc of [-1, 1]) { const a = l + dl; const b = c + dc; if (dentro(a, b) && tab[a * 8 + b] === peao) return true; }
  const cavalo = por === 'w' ? 'N' : 'n';
  for (const [a, b] of XADREZ_CAVALO) { if (dentro(l + a, c + b) && tab[(l + a) * 8 + c + b] === cavalo) return true; }
  const rei = por === 'w' ? 'K' : 'k';
  for (const [a, b] of XADREZ_REI) { if (dentro(l + a, c + b) && tab[(l + a) * 8 + c + b] === rei) return true; }
  const deslizar = (direcoes, tipos) => {
    for (const [a, b] of direcoes) {
      let x = l + a; let y = c + b;
      while (dentro(x, y)) {
        const p = tab[x * 8 + y];
        if (p) { if (xadrezCorDe(p) === por && tipos.includes(p.toLowerCase())) return true; break; }
        x += a; y += b;
      }
    }
    return false;
  };
  return deslizar(XADREZ_DIAGONAIS, ['b', 'q']) || deslizar(XADREZ_RETAS, ['r', 'q']);
}

function xadrezReiDe(tab, cor) { return tab.indexOf(cor === 'w' ? 'K' : 'k'); }
function xadrezEmXeque(est, cor) { const r = xadrezReiDe(est.tab, cor); return r >= 0 && xadrezAtacada(est.tab, r, cor === 'w' ? 'b' : 'w'); }

function xadrezPseudo(est) {
  const { tab, vez } = est;
  const lista = [];
  const dentro = (a, b) => a >= 0 && a < 8 && b >= 0 && b < 8;
  const inimiga = vez === 'w' ? 'b' : 'w';
  for (let de = 0; de < 64; de += 1) {
    const p = tab[de];
    if (!p || xadrezCorDe(p) !== vez) continue;
    const t = p.toLowerCase(); const l = Math.floor(de / 8); const c = de % 8;
    const add = (para, extra) => lista.push(Object.assign({ de, para, peca: p, captura: tab[para] || '' }, extra || {}));
    if (t === 'p') {
      const dl = vez === 'w' ? -1 : 1;
      const inicio = vez === 'w' ? 6 : 1;
      const ultima = vez === 'w' ? 0 : 7;
      const frente = (l + dl) * 8 + c;
      const promover = (para, cap) => { for (const pr of ['q', 'r', 'b', 'n']) add(para, { promocao: vez === 'w' ? pr.toUpperCase() : pr, captura: cap || '' }); };
      if (dentro(l + dl, c) && !tab[frente]) {
        if (l + dl === ultima) promover(frente); else add(frente);
        const dois = (l + 2 * dl) * 8 + c;
        if (l === inicio && !tab[dois]) add(dois, { duplo: true });
      }
      for (const dc of [-1, 1]) {
        if (!dentro(l + dl, c + dc)) continue;
        const alvo = (l + dl) * 8 + c + dc;
        if (tab[alvo] && xadrezCorDe(tab[alvo]) === inimiga) { if (l + dl === ultima) promover(alvo, tab[alvo]); else add(alvo); }
        else if (alvo === est.ep) add(alvo, { enPassant: true, captura: vez === 'w' ? 'p' : 'P' });
      }
    } else if (t === 'n' || t === 'k') {
      for (const [a, b] of t === 'n' ? XADREZ_CAVALO : XADREZ_REI) {
        if (!dentro(l + a, c + b)) continue;
        const para = (l + a) * 8 + c + b;
        if (!tab[para] || xadrezCorDe(tab[para]) === inimiga) add(para);
      }
      if (t === 'k') {
        const base = vez === 'w' ? 60 : 4;
        if (de === base && !xadrezAtacada(tab, base, inimiga)) {
          const [curto, longo] = vez === 'w' ? ['K', 'Q'] : ['k', 'q'];
          if (est.roque[curto] && !tab[base + 1] && !tab[base + 2] && tab[base + 3] === (vez === 'w' ? 'R' : 'r') && !xadrezAtacada(tab, base + 1, inimiga) && !xadrezAtacada(tab, base + 2, inimiga)) add(base + 2, { roque: 'curto' });
          if (est.roque[longo] && !tab[base - 1] && !tab[base - 2] && !tab[base - 3] && tab[base - 4] === (vez === 'w' ? 'R' : 'r') && !xadrezAtacada(tab, base - 1, inimiga) && !xadrezAtacada(tab, base - 2, inimiga)) add(base - 2, { roque: 'longo' });
        }
      }
    } else {
      const direcoes = t === 'b' ? XADREZ_DIAGONAIS : t === 'r' ? XADREZ_RETAS : XADREZ_DIAGONAIS.concat(XADREZ_RETAS);
      for (const [a, b] of direcoes) {
        let x = l + a; let y = c + b;
        while (dentro(x, y)) {
          const para = x * 8 + y;
          if (!tab[para]) add(para);
          else { if (xadrezCorDe(tab[para]) === inimiga) add(para); break; }
          x += a; y += b;
        }
      }
    }
  }
  return lista;
}

function xadrezAplicar(est, m) {
  const tab = est.tab.slice();
  const roque = Object.assign({}, est.roque);
  tab[m.para] = m.promocao || m.peca;
  tab[m.de] = '';
  if (m.enPassant) tab[m.para + (est.vez === 'w' ? 8 : -8)] = '';
  if (m.roque === 'curto') { tab[m.para - 1] = tab[m.para + 1]; tab[m.para + 1] = ''; }
  if (m.roque === 'longo') { tab[m.para + 1] = tab[m.para - 2]; tab[m.para - 2] = ''; }
  if (m.peca === 'K') { roque.K = false; roque.Q = false; }
  if (m.peca === 'k') { roque.k = false; roque.q = false; }
  for (const [casa, chave] of [[63, 'K'], [56, 'Q'], [7, 'k'], [0, 'q']]) if (m.de === casa || m.para === casa) roque[chave] = false;
  const novo = { tab, vez: est.vez === 'w' ? 'b' : 'w', roque, ep: m.duplo ? (m.de + m.para) / 2 : -1, meio: m.peca.toLowerCase() === 'p' || m.captura ? 0 : est.meio + 1, jogada: est.jogada + (est.vez === 'b' ? 1 : 0), posicoes: est.posicoes };
  return novo;
}

function xadrezLegais(est) {
  return xadrezPseudo(est).filter((m) => !xadrezEmXeque(xadrezAplicar(est, m), est.vez));
}

function xadrezMaterialInsuficiente(tab) {
  const pecas = tab.filter((p) => p && p.toLowerCase() !== 'k');
  if (!pecas.length) return true;
  if (pecas.length === 1 && ['n', 'b'].includes(pecas[0].toLowerCase())) return true;
  if (pecas.length === 2 && pecas.every((p) => p.toLowerCase() === 'b')) {
    const cores = tab.map((p, i) => (p && p.toLowerCase() === 'b' ? (Math.floor(i / 8) + (i % 8)) % 2 : -1)).filter((x) => x >= 0);
    return cores[0] === cores[1];
  }
  return false;
}

function xadrezSituacao(est) {
  const legais = xadrezLegais(est);
  const xeque = xadrezEmXeque(est, est.vez);
  if (!legais.length) return { fim: true, motivo: xeque ? 'mate' : 'afogado', vencedor: xeque ? (est.vez === 'w' ? 'b' : 'w') : '', legais, xeque };
  if (est.meio >= 100) return { fim: true, motivo: 'cinquenta', vencedor: '', legais, xeque };
  if (xadrezMaterialInsuficiente(est.tab)) return { fim: true, motivo: 'material', vencedor: '', legais, xeque };
  if ((est.posicoes[xadrezChave(est)] || 0) >= 3) return { fim: true, motivo: 'repeticao', vencedor: '', legais, xeque };
  return { fim: false, legais, xeque };
}

function xadrezAvaliar(est) {
  const tab = est.tab;
  let material = 0;
  for (const p of tab) if (p && p.toLowerCase() !== 'p' && p.toLowerCase() !== 'k') material += XADREZ_VALORES[p.toLowerCase()];
  const final = material <= 1600;
  let total = 0;
  for (let i = 0; i < 64; i += 1) {
    const p = tab[i];
    if (!p) continue;
    const t = p.toLowerCase();
    const branca = p !== t;
    const indice = branca ? i : (7 - Math.floor(i / 8)) * 8 + (i % 8);
    const tabela = t === 'k' && final ? XADREZ_TABELAS.kFim : XADREZ_TABELAS[t];
    const valor = XADREZ_VALORES[t] + tabela[indice];
    total += branca ? valor : -valor;
  }
  return est.vez === 'w' ? total : -total;
}

function xadrezOrdenar(lista) {
  return lista.sort((a, b) => {
    const va = (a.captura ? XADREZ_VALORES[a.captura.toLowerCase()] * 10 - XADREZ_VALORES[a.peca.toLowerCase()] : 0) + (a.promocao ? 800 : 0);
    const vb = (b.captura ? XADREZ_VALORES[b.captura.toLowerCase()] * 10 - XADREZ_VALORES[b.peca.toLowerCase()] : 0) + (b.promocao ? 800 : 0);
    return vb - va;
  });
}

function xadrezQuieto(est, alfa, beta, profundidade, contador) {
  contador.nos += 1;
  if ((contador.nos & 511) === 0 && Date.now() > contador.fim) contador.parou = true;
  if (contador.parou) return 0;
  const parado = xadrezAvaliar(est);
  if (parado >= beta) return beta;
  if (alfa < parado) alfa = parado;
  if (profundidade <= 0) return alfa;
  const capturas = xadrezOrdenar(xadrezPseudo(est).filter((m) => m.captura || m.promocao === 'Q' || m.promocao === 'q'));
  for (const m of capturas) {
    const novo = xadrezAplicar(est, m);
    if (xadrezEmXeque(novo, est.vez)) continue;
    const v = -xadrezQuieto(novo, -beta, -alfa, profundidade - 1, contador);
    if (v >= beta) return beta;
    if (v > alfa) alfa = v;
  }
  return alfa;
}

function xadrezBuscar(est, profundidade, alfa, beta, contador, distancia) {
  contador.nos += 1;
  if ((contador.nos & 511) === 0 && Date.now() > contador.fim) contador.parou = true;
  if (contador.parou) return 0;
  const legais = xadrezOrdenar(xadrezLegais(est));
  if (!legais.length) return xadrezEmXeque(est, est.vez) ? -100000 + distancia : 0;
  if (est.meio >= 100) return 0;
  if (profundidade <= 0) return xadrezQuieto(est, alfa, beta, contador.quieto, contador);
  for (const m of legais) {
    const v = -xadrezBuscar(xadrezAplicar(est, m), profundidade - 1, -beta, -alfa, contador, distancia + 1);
    if (contador.parou) return 0;
    if (v >= beta) return beta;
    if (v > alfa) alfa = v;
  }
  return alfa;
}

const XADREZ_NIVEIS = [
  { prof: 1, quieto: 0, ruido: 180, tempo: 250 },
  { prof: 2, quieto: 2, ruido: 35, tempo: 700 },
  { prof: 5, quieto: 3, ruido: 0, tempo: 1400 },
];

function xadrezMelhorJogada(est, nivel) {
  const config = XADREZ_NIVEIS[nivel] || XADREZ_NIVEIS[1];
  let legais = xadrezOrdenar(xadrezLegais(est)).filter((m) => !m.promocao || m.promocao.toLowerCase() === 'q');
  if (!legais.length) return null;
  const contador = { nos: 0, quieto: config.quieto, fim: Date.now() + config.tempo, parou: false };
  let melhor = legais[0];
  for (let prof = 1; prof <= config.prof; prof += 1) {
    let melhorDaVez = null; let valorDaVez = -Infinity; let alfa = -Infinity;
    for (const m of legais) {
      const novo = xadrezAplicar(est, m);
      const limite = config.ruido ? Infinity : -alfa;
      let v = -xadrezBuscar(novo, prof - 1, -Infinity, limite, contador, 1);
      if (contador.parou) break;
      if ((est.posicoes[xadrezChave(novo)] || 0) >= 2 && v > -50) v -= 60;
      if (config.ruido) v += (Math.random() - 0.5) * config.ruido;
      if (v > valorDaVez) { valorDaVez = v; melhorDaVez = m; }
      if (v > alfa) alfa = v;
    }
    if (contador.parou && prof > 1) break;
    if (melhorDaVez) melhor = melhorDaVez;
    if (valorDaVez > 90000) break;
    legais = [melhor].concat(legais.filter((m) => m !== melhor));
    if (contador.parou) break;
  }
  return melhor;
}

const XADREZ_NOMES = { p: 'peão', n: 'cavalo', b: 'bispo', r: 'torre', q: 'dama', k: 'rei' };

const ID_DOS_GRADIENTES_DO_TABULEIRO = 'gradientes-do-tabuleiro';
let contextoDaBatidaDePeca = null;

function garantirGradientesDoTabuleiro() {
  if (typeof document === 'undefined' || !document.body || document.getElementById(ID_DOS_GRADIENTES_DO_TABULEIRO)) return;
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('id', ID_DOS_GRADIENTES_DO_TABULEIRO);
  svg.setAttribute('width', '0');
  svg.setAttribute('height', '0');
  svg.setAttribute('aria-hidden', 'true');
  svg.style.position = 'absolute';
  svg.style.overflow = 'hidden';
  svg.innerHTML = `<defs>
    <linearGradient id="xz-branca" x1=".15" y1="0" x2=".85" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset=".5" stop-color="#f6eacf"/><stop offset="1" stop-color="#d6ba82"/></linearGradient>
    <linearGradient id="xz-preta" x1=".15" y1="0" x2=".85" y2="1"><stop offset="0" stop-color="#76649e"/><stop offset=".45" stop-color="#3a2e5a"/><stop offset="1" stop-color="#140f24"/></linearGradient>
    <radialGradient id="dm-branca" cx=".38" cy=".32" r=".78"><stop offset="0" stop-color="#ffffff"/><stop offset=".55" stop-color="#f5e6c2"/><stop offset="1" stop-color="#c9a660"/></radialGradient>
    <radialGradient id="dm-preta" cx=".38" cy=".32" r=".78"><stop offset="0" stop-color="#8573b3"/><stop offset=".55" stop-color="#3c2f60"/><stop offset="1" stop-color="#150f27"/></radialGradient>
    <linearGradient id="dm-ouro" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff3b8"/><stop offset=".5" stop-color="#f2c94c"/><stop offset="1" stop-color="#a87714"/></linearGradient>
    <linearGradient id="xz-madeira-clara" x1=".15" y1="0" x2=".85" y2="1"><stop offset="0" stop-color="#f6dcb0"/><stop offset=".55" stop-color="#dcae72"/><stop offset="1" stop-color="#b07a3f"/></linearGradient>
    <linearGradient id="xz-madeira-escura" x1=".15" y1="0" x2=".85" y2="1"><stop offset="0" stop-color="#9a6a3a"/><stop offset=".5" stop-color="#5e3a1a"/><stop offset="1" stop-color="#2e190a"/></linearGradient>
    <linearGradient id="xz-marmore" x1=".1" y1="0" x2=".9" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset=".45" stop-color="#f1ebdf"/><stop offset=".7" stop-color="#ffffff"/><stop offset="1" stop-color="#d8cdb6"/></linearGradient>
    <linearGradient id="xz-vinho" x1=".15" y1="0" x2=".85" y2="1"><stop offset="0" stop-color="#b8344c"/><stop offset=".5" stop-color="#6b1325"/><stop offset="1" stop-color="#2a0710"/></linearGradient>
    <linearGradient id="xz-ouro" x1=".15" y1="0" x2=".85" y2="1"><stop offset="0" stop-color="#fff6c8"/><stop offset=".45" stop-color="#f2c94c"/><stop offset="1" stop-color="#a8741a"/></linearGradient>
    <linearGradient id="xz-prata" x1=".15" y1="0" x2=".85" y2="1"><stop offset="0" stop-color="#d6dde6"/><stop offset=".45" stop-color="#7d8896"/><stop offset="1" stop-color="#2c333d"/></linearGradient>
    <linearGradient id="xz-diamante" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset=".3" stop-color="#dff4ff"/><stop offset=".55" stop-color="#a9d8ff"/><stop offset=".75" stop-color="#f3fbff"/><stop offset="1" stop-color="#8cc4f2"/></linearGradient>
    <linearGradient id="xz-onix" x1=".15" y1="0" x2=".85" y2="1"><stop offset="0" stop-color="#5b5b6a"/><stop offset=".35" stop-color="#1c1c25"/><stop offset=".7" stop-color="#3a3a48"/><stop offset="1" stop-color="#050507"/></linearGradient>
    <radialGradient id="dm-madeira-clara" cx=".38" cy=".32" r=".78"><stop offset="0" stop-color="#fbe5c0"/><stop offset=".6" stop-color="#d9a76a"/><stop offset="1" stop-color="#a46d33"/></radialGradient>
    <radialGradient id="dm-madeira-escura" cx=".38" cy=".32" r=".78"><stop offset="0" stop-color="#a87442"/><stop offset=".6" stop-color="#5e3a1a"/><stop offset="1" stop-color="#2a1608"/></radialGradient>
    <radialGradient id="dm-prata" cx=".38" cy=".32" r=".78"><stop offset="0" stop-color="#eef2f7"/><stop offset=".55" stop-color="#8f9aa8"/><stop offset="1" stop-color="#3a424d"/></radialGradient>
    <radialGradient id="dm-ouro-claro" cx=".38" cy=".32" r=".78"><stop offset="0" stop-color="#fffbe0"/><stop offset=".55" stop-color="#f2c94c"/><stop offset="1" stop-color="#9c6a12"/></radialGradient>
    <radialGradient id="dm-bronze" cx=".38" cy=".32" r=".78"><stop offset="0" stop-color="#f4c8a0"/><stop offset=".55" stop-color="#b06a35"/><stop offset="1" stop-color="#5a2c0e"/></radialGradient>
    <radialGradient id="dm-diamante" cx=".38" cy=".32" r=".8"><stop offset="0" stop-color="#ffffff"/><stop offset=".4" stop-color="#dff4ff"/><stop offset=".75" stop-color="#9fd2ff"/><stop offset="1" stop-color="#6aa6e0"/></radialGradient>
    <radialGradient id="dm-onix" cx=".38" cy=".32" r=".8"><stop offset="0" stop-color="#6a6a78"/><stop offset=".5" stop-color="#1c1c25"/><stop offset="1" stop-color="#050507"/></radialGradient>
    <linearGradient id="xz-vidro-b" x1=".1" y1="0" x2=".9" y2="1"><stop offset="0" stop-color="#ffffff" stop-opacity="0.85"/><stop offset="0.4" stop-color="#eaf6ff" stop-opacity="0.35"/><stop offset="0.75" stop-color="#d4ecfb" stop-opacity="0.5"/><stop offset="1" stop-color="#b9dcf2" stop-opacity="0.75"/></linearGradient>
    <linearGradient id="xz-vidro-p" x1=".1" y1="0" x2=".9" y2="1"><stop offset="0" stop-color="#a3adbf" stop-opacity="0.8"/><stop offset="0.45" stop-color="#4a5366" stop-opacity="0.5"/><stop offset="1" stop-color="#1b2030" stop-opacity="0.8"/></linearGradient>
    <linearGradient id="xz-esmeralda-b" x1=".1" y1="0" x2=".9" y2="1"><stop offset="0" stop-color="#ecfff5" stop-opacity="0.9"/><stop offset="0.45" stop-color="#86e8b8" stop-opacity="0.6"/><stop offset="1" stop-color="#2a9e68" stop-opacity="0.85"/></linearGradient>
    <linearGradient id="xz-esmeralda-p" x1=".1" y1="0" x2=".9" y2="1"><stop offset="0" stop-color="#5ee0a0" stop-opacity="0.9"/><stop offset="0.45" stop-color="#0f7d4c" stop-opacity="0.72"/><stop offset="1" stop-color="#022e1a" stop-opacity="0.92"/></linearGradient>
    <linearGradient id="xz-ouro-b" x1=".1" y1="0" x2=".9" y2="1"><stop offset="0" stop-color="#fff8d2" stop-opacity="0.95"/><stop offset="0.45" stop-color="#f5cf55" stop-opacity="0.72"/><stop offset="1" stop-color="#b8860b" stop-opacity="0.9"/></linearGradient>
    <linearGradient id="xz-ouro-p" x1=".1" y1="0" x2=".9" y2="1"><stop offset="0" stop-color="#e6b04a" stop-opacity="0.92"/><stop offset="0.45" stop-color="#8f5e0e" stop-opacity="0.78"/><stop offset="1" stop-color="#3a2505" stop-opacity="0.94"/></linearGradient>
    <linearGradient id="xz-rubi-b" x1=".1" y1="0" x2=".9" y2="1"><stop offset="0" stop-color="#ffe4ea" stop-opacity="0.92"/><stop offset="0.45" stop-color="#ff859f" stop-opacity="0.62"/><stop offset="1" stop-color="#d3214a" stop-opacity="0.86"/></linearGradient>
    <linearGradient id="xz-rubi-p" x1=".1" y1="0" x2=".9" y2="1"><stop offset="0" stop-color="#ff5675" stop-opacity="0.9"/><stop offset="0.45" stop-color="#a50e2d" stop-opacity="0.76"/><stop offset="1" stop-color="#3a020f" stop-opacity="0.94"/></linearGradient>
    <linearGradient id="xz-perola" x1=".1" y1="0" x2=".9" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset="0.35" stop-color="#f6f0fa"/><stop offset="0.65" stop-color="#eaf5f3"/><stop offset="1" stop-color="#d6cbe0"/></linearGradient>
    <linearGradient id="xz-obsidiana" x1=".1" y1="0" x2=".9" y2="1"><stop offset="0" stop-color="#77778f" stop-opacity="0.92"/><stop offset="0.35" stop-color="#16151d" stop-opacity="0.82"/><stop offset="0.7" stop-color="#2e2b3d" stop-opacity="0.86"/><stop offset="1" stop-color="#000000" stop-opacity="0.96"/></linearGradient>
    <linearGradient id="xz-celestial-b" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff0f8" stop-opacity="0.92"/><stop offset="0.25" stop-color="#d9f2ff" stop-opacity="0.75"/><stop offset="0.5" stop-color="#e6ffe4" stop-opacity="0.7"/><stop offset="0.75" stop-color="#fff6d4" stop-opacity="0.75"/><stop offset="1" stop-color="#efdcff" stop-opacity="0.92"/></linearGradient>
    <linearGradient id="xz-celestial-p" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#8f6bff" stop-opacity="0.92"/><stop offset="0.35" stop-color="#2b1b72" stop-opacity="0.82"/><stop offset="0.65" stop-color="#0c6390" stop-opacity="0.82"/><stop offset="1" stop-color="#c43cff" stop-opacity="0.92"/></linearGradient>
    <linearGradient id="xz-reflexo" x1="0" y1="0" x2=".8" y2=".8"><stop offset="0" stop-color="#ffffff" stop-opacity="0.7"/><stop offset="0.3" stop-color="#ffffff" stop-opacity="0.18"/><stop offset="0.5" stop-color="#ffffff" stop-opacity="0"/></linearGradient>
    <radialGradient id="dm-vidro-b" cx=".38" cy=".32" r=".8"><stop offset="0" stop-color="#ffffff" stop-opacity="0.9"/><stop offset="0.55" stop-color="#e2f2fd" stop-opacity="0.4"/><stop offset="1" stop-color="#a9d2ee" stop-opacity="0.8"/></radialGradient>
    <radialGradient id="dm-vidro-p" cx=".38" cy=".32" r=".8"><stop offset="0" stop-color="#b3bccb" stop-opacity="0.85"/><stop offset="0.55" stop-color="#4a5366" stop-opacity="0.55"/><stop offset="1" stop-color="#141824" stop-opacity="0.85"/></radialGradient>
    <radialGradient id="dm-esmeralda-b" cx=".38" cy=".32" r=".8"><stop offset="0" stop-color="#f0fff7" stop-opacity="0.92"/><stop offset="0.55" stop-color="#7fe3b2" stop-opacity="0.62"/><stop offset="1" stop-color="#23925f" stop-opacity="0.88"/></radialGradient>
    <radialGradient id="dm-esmeralda-p" cx=".38" cy=".32" r=".8"><stop offset="0" stop-color="#6fe8ab" stop-opacity="0.9"/><stop offset="0.55" stop-color="#0f7d4c" stop-opacity="0.75"/><stop offset="1" stop-color="#012614" stop-opacity="0.94"/></radialGradient>
    <radialGradient id="dm-ouro-b" cx=".38" cy=".32" r=".8"><stop offset="0" stop-color="#fffbe2" stop-opacity="0.96"/><stop offset="0.55" stop-color="#f5cf55" stop-opacity="0.75"/><stop offset="1" stop-color="#a87a0a" stop-opacity="0.92"/></radialGradient>
    <radialGradient id="dm-ouro-p" cx=".38" cy=".32" r=".8"><stop offset="0" stop-color="#efbb55" stop-opacity="0.94"/><stop offset="0.55" stop-color="#8f5e0e" stop-opacity="0.8"/><stop offset="1" stop-color="#2e1d03" stop-opacity="0.95"/></radialGradient>
    <radialGradient id="dm-rubi-b" cx=".38" cy=".32" r=".8"><stop offset="0" stop-color="#ffeef2" stop-opacity="0.94"/><stop offset="0.55" stop-color="#ff859f" stop-opacity="0.65"/><stop offset="1" stop-color="#c81c43" stop-opacity="0.9"/></radialGradient>
    <radialGradient id="dm-rubi-p" cx=".38" cy=".32" r=".8"><stop offset="0" stop-color="#ff6a86" stop-opacity="0.92"/><stop offset="0.55" stop-color="#a50e2d" stop-opacity="0.8"/><stop offset="1" stop-color="#2e010b" stop-opacity="0.95"/></radialGradient>
    <radialGradient id="dm-perola" cx=".38" cy=".32" r=".8"><stop offset="0" stop-color="#ffffff"/><stop offset="0.5" stop-color="#f4eef9"/><stop offset="0.8" stop-color="#e3f1ee"/><stop offset="1" stop-color="#cbbfd8"/></radialGradient>
    <radialGradient id="dm-obsidiana" cx=".38" cy=".32" r=".8"><stop offset="0" stop-color="#80809a" stop-opacity="0.94"/><stop offset="0.5" stop-color="#17161f" stop-opacity="0.86"/><stop offset="1" stop-color="#000000" stop-opacity="0.97"/></radialGradient>
    <radialGradient id="dm-celestial-b" cx=".38" cy=".32" r=".8"><stop offset="0" stop-color="#ffffff" stop-opacity="0.95"/><stop offset="0.3" stop-color="#ffe3f3" stop-opacity="0.8"/><stop offset="0.55" stop-color="#d6f1ff" stop-opacity="0.72"/><stop offset="0.8" stop-color="#e4ffe0" stop-opacity="0.78"/><stop offset="1" stop-color="#e8d4ff" stop-opacity="0.92"/></radialGradient>
    <radialGradient id="dm-celestial-p" cx=".38" cy=".32" r=".8"><stop offset="0" stop-color="#a98bff" stop-opacity="0.94"/><stop offset="0.45" stop-color="#3a1f8c" stop-opacity="0.84"/><stop offset="0.75" stop-color="#0d5d88" stop-opacity="0.84"/><stop offset="1" stop-color="#b02ef0" stop-opacity="0.94"/></radialGradient>
  </defs>`;
  document.body.appendChild(svg);
}

let tabuleiroArrastadoEm = 0;

function ligarArrasteNoTabuleiro(tabuleiro, opcoes) {
  if (!tabuleiro || !opcoes) return;
  tabuleiro.querySelectorAll('.xadrez-casa').forEach((casa) => {
    const indice = Number(casa.dataset.casa);
    if (!casa.querySelector('.xadrez-peca') || !opcoes.podeArrastar(indice)) return;
    casa.classList.add('pode-arrastar');
    casa.addEventListener('pointerdown', (evento) => comecarArraste(evento, casa, indice, tabuleiro, opcoes));
  });
}

function comecarArraste(evento, casa, indice, tabuleiro, opcoes) {
  if (evento.button !== undefined && evento.button !== 0) return;
  const peca = casa.querySelector('.xadrez-peca');
  if (!peca) return;
  const inicio = { x: evento.clientX, y: evento.clientY };
  const destinos = new Set(opcoes.destinos(indice));
  let fantasma = null;
  let alvo = null;
  const limpar = () => {
    casa.removeEventListener('pointermove', mover);
    casa.removeEventListener('pointerup', soltar);
    casa.removeEventListener('pointercancel', cancelar);
    if (alvo) alvo.classList.remove('arraste-sobre');
    if (fantasma) fantasma.remove();
    tabuleiro.classList.remove('arrastando');
  };
  const mover = (e) => {
    if (!fantasma) {
      if (Math.hypot(e.clientX - inicio.x, e.clientY - inicio.y) < 6) return;
      const caixa = peca.getBoundingClientRect();
      fantasma = peca.cloneNode(true);
      fantasma.classList.add('xadrez-peca-arrastada');
      fantasma.style.width = `${caixa.width}px`;
      fantasma.style.height = `${caixa.height}px`;
      document.body.appendChild(fantasma);
      peca.classList.add('sendo-arrastada');
      tabuleiro.classList.add('arrastando');
      tabuleiro.querySelectorAll('.xadrez-casa').forEach((c) => { if (destinos.has(Number(c.dataset.casa))) c.classList.add('destino-do-arraste'); });
      try { casa.setPointerCapture(e.pointerId); } catch (erro) {
      }
    }
    e.preventDefault();
    fantasma.style.left = `${e.clientX - fantasma.offsetWidth / 2}px`;
    fantasma.style.top = `${e.clientY - fantasma.offsetHeight / 2}px`;
    const debaixo = document.elementFromPoint(e.clientX, e.clientY);
    const nova = debaixo && debaixo.closest ? debaixo.closest('.xadrez-casa') : null;
    const valida = nova && tabuleiro.contains(nova) ? nova : null;
    if (valida !== alvo) {
      if (alvo) alvo.classList.remove('arraste-sobre');
      alvo = valida;
      if (alvo) alvo.classList.add('arraste-sobre');
    }
  };
  const soltar = () => {
    const arrastou = !!fantasma;
    const para = alvo ? Number(alvo.dataset.casa) : -1;
    limpar();
    if (!arrastou) return;
    tabuleiroArrastadoEm = Date.now();
    if (para >= 0 && para !== indice && destinos.has(para)) opcoes.soltar(indice, para);
    else opcoes.cancelar();
  };
  const cancelar = () => {
    const arrastou = !!fantasma;
    limpar();
    if (arrastou) {
      tabuleiroArrastadoEm = Date.now();
      opcoes.cancelar();
    }
  };
  casa.addEventListener('pointermove', mover);
  casa.addEventListener('pointerup', soltar);
  casa.addEventListener('pointercancel', cancelar);
}

function cliqueLogoDepoisDoArraste() {
  return Date.now() - tabuleiroArrastadoEm < 350;
}

function animarJogadaNoTabuleiro(tabuleiro, caminho, fantasmas) {
  if (!tabuleiro || !Array.isArray(caminho) || caminho.length < 2) return;
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const fim = caminho[caminho.length - 1];
  const casaDoFim = tabuleiro.querySelector(`[data-casa="${fim}"]`);
  const peca = casaDoFim ? casaDoFim.querySelector('.xadrez-peca') : null;
  const porCasa = 260;
  const total = porCasa * (caminho.length - 1);
  (fantasmas || []).forEach(({ casa, svg, quando }) => {
    const alvo = tabuleiro.querySelector(`[data-casa="${casa}"]`);
    if (!alvo || !svg) return;
    const fantasma = document.createElement('span');
    fantasma.className = 'xadrez-peca xadrez-fantasma';
    fantasma.innerHTML = svg;
    alvo.appendChild(fantasma);
    if (!fantasma.animate) { fantasma.remove(); return; }
    const sumir = fantasma.animate([{ opacity: 1, transform: 'scale(1)' }, { opacity: 0, transform: 'scale(0.35) rotate(-25deg)' }], { duration: 240, delay: typeof quando === 'number' ? quando : total - 40, easing: 'ease-in', fill: 'forwards' });
    sumir.onfinish = () => fantasma.remove();
  });
  if (!peca || !peca.animate || cliqueLogoDepoisDoArraste()) return;
  peca.classList.remove('chegou');
  peca.classList.add('voando');
  const linha = (c) => Math.floor(c / 8);
  const coluna = (c) => c % 8;
  const passo = 100 / 0.9;
  const quadros = [];
  caminho.forEach((c, i) => {
    const dx = (coluna(c) - coluna(fim)) * passo;
    const dy = (linha(c) - linha(fim)) * passo;
    if (i > 0) {
      const anterior = caminho[i - 1];
      const mx = ((coluna(anterior) + coluna(c)) / 2 - coluna(fim)) * passo;
      const my = ((linha(anterior) + linha(c)) / 2 - linha(fim)) * passo;
      quadros.push({ transform: `translate(${mx}%, ${my}%) scale(1.14)`, offset: (i - 0.5) / (caminho.length - 1) });
    }
    quadros.push({ transform: i === caminho.length - 1 ? 'translate(0%, 0%) scale(1)' : `translate(${dx}%, ${dy}%) scale(1)`, offset: i / (caminho.length - 1) });
  });
  const voo = peca.animate(quadros, { duration: total, easing: 'ease-in-out' });
  voo.onfinish = () => {
    peca.classList.remove('voando');
    peca.animate([{ transform: 'scale(1.08, 0.92)' }, { transform: 'scale(1)' }], { duration: 160, easing: 'ease-out' });
  };
}

function tocarBatidaDePeca(captura, atraso) {
  try {
    const Classe = window.AudioContext || window.webkitAudioContext;
    if (!Classe) return;
    if (typeof contextoDeSomDosJogos !== 'undefined' && contextoDeSomDosJogos) contextoDaBatidaDePeca = contextoDeSomDosJogos;
    if (!contextoDaBatidaDePeca) contextoDaBatidaDePeca = new Classe();
    const ctx = contextoDaBatidaDePeca;
    const quando = ctx.currentTime + (atraso || 0);
    const tamanho = Math.floor(ctx.sampleRate * 0.12);
    const buffer = ctx.createBuffer(1, tamanho, ctx.sampleRate);
    const dados = buffer.getChannelData(0);
    for (let i = 0; i < tamanho; i += 1) dados[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / tamanho, 3);
    const ruido = ctx.createBufferSource();
    ruido.buffer = buffer;
    const filtro = ctx.createBiquadFilter();
    filtro.type = 'bandpass';
    filtro.frequency.value = captura ? 700 : 1100;
    filtro.Q.value = 1.4;
    const volume = ctx.createGain();
    volume.gain.setValueAtTime(captura ? 0.9 : 0.6, quando);
    volume.gain.exponentialRampToValueAtTime(0.001, quando + 0.12);
    ruido.connect(filtro);
    filtro.connect(volume);
    volume.connect(ctx.destination);
    ruido.start(quando);
    const grave = ctx.createOscillator();
    const ganho = ctx.createGain();
    grave.type = 'sine';
    grave.frequency.setValueAtTime(captura ? 150 : 210, quando);
    grave.frequency.exponentialRampToValueAtTime(70, quando + 0.1);
    ganho.gain.setValueAtTime(captura ? 0.35 : 0.22, quando);
    ganho.gain.exponentialRampToValueAtTime(0.001, quando + 0.12);
    grave.connect(ganho);
    ganho.connect(ctx.destination);
    grave.start(quando);
    grave.stop(quando + 0.14);
  } catch (e) {
  }
}

const CONJUNTOS_DO_XADREZ = {
  classico: { b: { corpo: 'url(#xz-branca)', linha: '#2b1d0e', detalhe: '#2b1d0e' }, p: { corpo: 'url(#xz-preta)', linha: '#0c0915', detalhe: '#e9d6a8' } },
  madeira: { b: { corpo: 'url(#xz-madeira-clara)', linha: '#5a3a17', detalhe: '#5a3a17' }, p: { corpo: 'url(#xz-madeira-escura)', linha: '#1f1108', detalhe: '#e8c79a' } },
  catedral: { formas: 'catedral', b: { corpo: 'url(#xz-marmore)', linha: '#7a5a14', detalhe: '#b8892b' }, p: { corpo: 'url(#xz-vinho)', linha: '#2a0710', detalhe: '#f2c94c' } },
  'ouro-prata': { b: { corpo: 'url(#xz-ouro)', linha: '#6b4a0a', detalhe: '#6b4a0a' }, p: { corpo: 'url(#xz-prata)', linha: '#1e252e', detalhe: '#f1f4f8' } },
  diamante: { brilho: true, reflexo: true, b: { corpo: 'url(#xz-diamante)', linha: '#3f6ea8', detalhe: '#2a5a96' }, p: { corpo: 'url(#xz-onix)', linha: '#000000', detalhe: '#8fd0ff' } },
  vidro: { reflexo: true, b: { corpo: 'url(#xz-vidro-b)', linha: '#7fa6c4', detalhe: '#5d86a6' }, p: { corpo: 'url(#xz-vidro-p)', linha: '#141824', detalhe: '#d9e6f2' } },
  esmeralda: { reflexo: true, b: { corpo: 'url(#xz-esmeralda-b)', linha: '#1f7a4f', detalhe: '#167044' }, p: { corpo: 'url(#xz-esmeralda-p)', linha: '#012012', detalhe: '#b8ffd9' } },
  ouro: { reflexo: true, b: { corpo: 'url(#xz-ouro-b)', linha: '#7a560e', detalhe: '#7a560e' }, p: { corpo: 'url(#xz-ouro-p)', linha: '#241603', detalhe: '#ffe7a3' } },
  rubi: { reflexo: true, b: { corpo: 'url(#xz-rubi-b)', linha: '#9c1534', detalhe: '#9c1534' }, p: { corpo: 'url(#xz-rubi-p)', linha: '#2a010a', detalhe: '#ffc2cf' } },
  obsidiana: { reflexo: true, b: { corpo: 'url(#xz-perola)', linha: '#8f8199', detalhe: '#7a6a86' }, p: { corpo: 'url(#xz-obsidiana)', linha: '#000000', detalhe: '#c9b8ff' } },
  celestial: { brilho: true, reflexo: true, b: { corpo: 'url(#xz-celestial-b)', linha: '#a07ad6', detalhe: '#8a5cc9' }, p: { corpo: 'url(#xz-celestial-p)', linha: '#12083a', detalhe: '#ffe9a8' } },
};

function formasDoXadrez(estilo, detalhe, linha) {
  const base = '<path d="M24 84 H76 A4 4 0 0 1 80 88 V92 H20 V88 A4 4 0 0 1 24 84 Z"/>';
  const cavalo = `<path d="M66 84 H30 C29 73 35 64 45 58 C40 56 34 58 30 61 C26 63 21 60 23 55 C27 47 34 39 40 33 C40 27 44 21 50 19 L53 12 L57 20 C68 25 73 40 73 56 C73 68 70 76 66 84 Z"/><circle cx="47" cy="31" r="2.6" fill="${detalhe}" stroke="none"/><path d="M57 22 C63 30 66 40 66 50" fill="none" stroke="${detalhe}" stroke-width="2.5" stroke-linecap="round"/><path d="M27 56 L31 55" stroke="${detalhe}" stroke-width="2.5" stroke-linecap="round"/>${base}`;
  if (estilo === 'catedral') {
    return {
      p: `<rect x="40" y="34" width="20" height="44" rx="3"/><path d="M50 32 v-5" fill="none" stroke="${linha}" stroke-width="2"/><path d="M50 10 C56 18 58 24 50 29 C42 24 44 18 50 10 Z" fill="#ffb02e" stroke="#c2570c" stroke-width="1.6"/><path d="M50 17 C53 21 53 24 50 26 C47 24 47 21 50 17 Z" fill="#fff3b0" stroke="none"/><path d="M44 42 v28" fill="none" stroke="${detalhe}" stroke-width="2" opacity=".6"/><path d="M34 78 H66 L70 84 H30 Z"/>${base}`,
      r: `<path d="M32 84 V42 L50 22 L68 42 V84 Z"/><path d="M50 22 V8 M44 13 H56" fill="none" stroke="${linha}" stroke-width="3.2" stroke-linecap="round"/><path d="M42 84 V64 a8 8 0 0 1 16 0 V84" fill="none" stroke="${detalhe}" stroke-width="2.5"/><path d="M45 54 a5 6 0 0 1 10 0 v4 h-10 z" fill="${detalhe}" stroke="none"/><circle cx="50" cy="60" r="1.6" fill="${detalhe}" stroke="none"/>${base}`,
      n: cavalo,
      b: `<path d="M50 8 C62 18 68 30 66 52 L60 58 H40 L34 52 C32 30 38 18 50 8 Z"/><path d="M50 8 L50 56" fill="none" stroke="${linha}" stroke-width="1.6" opacity=".5"/><path d="M50 22 V46 M42 31 H58" fill="none" stroke="${detalhe}" stroke-width="3.2" stroke-linecap="round"/><path d="M36 58 H64 L60 66 H40 Z"/><path d="M40 66 C42 74 36 80 30 84 H70 C64 80 58 74 60 66 Z"/>${base}`,
      q: `<path d="M27 50 L31 22 L42 35 L50 15 L58 35 L69 22 L73 50 Z"/><circle cx="31" cy="20" r="3.6"/><circle cx="50" cy="12" r="4.2"/><circle cx="69" cy="20" r="3.6"/><path d="M29 50 H71 V57 H29 Z"/><path d="M34 57 C36 68 32 77 28 84 H72 C68 77 64 68 66 57 Z"/><path d="M50 60 V76 M43 66 H57" fill="none" stroke="${detalhe}" stroke-width="2.6" stroke-linecap="round"/>${base}`,
      k: `<path d="M46.5 3 H53.5 V11 H60 V17 H53.5 V24 H46.5 V17 H40 V11 H46.5 Z"/><circle cx="50" cy="38" r="14"/><path d="M36 38 H64 M50 24 V52" fill="none" stroke="${detalhe}" stroke-width="2.2"/><path d="M35 52 H65 V58 H35 Z"/><path d="M38 58 C40 70 34 78 29 84 H71 C66 78 60 70 62 58 Z"/>${base}`,
    };
  }
  return {
    p: `<circle cx="50" cy="31" r="12"/><ellipse cx="50" cy="47" rx="15" ry="4.5"/><path d="M39 50 C41 62 35 75 29 84 H71 C65 75 59 62 61 50 Z"/>${base}`,
    r: `<path d="M28 16 H38 V25 H45 V16 H55 V25 H62 V16 H72 V38 H28 Z"/><path d="M33 38 H67 L64 74 L70 84 H30 L36 74 Z"/><path d="M34 74 H66" fill="none" stroke="${detalhe}" stroke-width="2.5"/>${base}`,
    b: `<circle cx="50" cy="11" r="4.5"/><path d="M50 16 C64 27 66 43 58 53 H42 C34 43 36 27 50 16 Z"/><path d="M55 27 L46 39" fill="none" stroke="${detalhe}" stroke-width="3" stroke-linecap="round"/><ellipse cx="50" cy="56" rx="14" ry="4"/><path d="M40 59 C42 69 36 78 30 84 H70 C64 78 58 69 60 59 Z"/>${base}`,
    q: `<path d="M27 31 L34 56 H66 L73 31 L62 45 L60 23 L54 41 L50 18 L46 41 L40 23 L38 45 Z"/><circle cx="27" cy="29" r="4"/><circle cx="40" cy="21" r="4"/><circle cx="50" cy="15" r="4.5"/><circle cx="60" cy="21" r="4"/><circle cx="73" cy="29" r="4"/><path d="M32 56 H68 V61 H32 Z"/><path d="M35 61 C37 70 33 78 28 84 H72 C67 78 63 70 65 61 Z"/>${base}`,
    k: `<path d="M46.5 6 H53.5 V13 H60 V20 H53.5 V29 H46.5 V20 H40 V13 H46.5 Z"/><path d="M30 42 C29 32 40 28 50 35 C60 28 71 32 70 42 C69 49 64 54 64 54 H36 C36 54 31 49 30 42 Z"/><path d="M33 54 H67 V60 H33 Z"/><path d="M36 60 C38 70 33 78 28 84 H72 C67 78 62 70 64 60 Z"/>${base}`,
    n: cavalo,
  };
}

function xadrezPecaSvg(peca, conjunto) {
  garantirGradientesDoTabuleiro();
  const nomeDoConjunto = conjunto || (typeof conjuntoDoXadrez === 'function' ? conjuntoDoXadrez() : 'classico');
  const estilo = CONJUNTOS_DO_XADREZ[nomeDoConjunto] || CONJUNTOS_DO_XADREZ.classico;
  const branca = peca === peca.toUpperCase();
  const cores = branca ? estilo.b : estilo.p;
  const formas = formasDoXadrez(estilo.formas, cores.detalhe, cores.linha);
  return `<svg class="xadrez-peca-svg conjunto-${nomeDoConjunto}" viewBox="0 0 100 100" aria-hidden="true"><g fill="${cores.corpo}" stroke="${cores.linha}" stroke-width="3" stroke-linejoin="round">${formas[peca.toLowerCase()]}</g>${estilo.reflexo ? `<g fill="url(#xz-reflexo)" stroke="none" pointer-events="none">${formas[peca.toLowerCase()].replace(/<path d="M50 10 C56[^>]*>|<path d="M50 17 C53[^>]*>/g, '')}</g>` : ''}${estilo.brilho ? '<path class="xadrez-brilho" d="M40 20 l3 6 l6 3 l-6 3 l-3 6 l-3 -6 l-6 -3 l6 -3 z" fill="#ffffff" opacity=".85"/>' : ''}</svg>`;
}

function xadrezDescreverPeca(peca) {
  return `${textoDoJogo(XADREZ_NOMES[peca.toLowerCase()])} ${textoDoJogo(peca === peca.toUpperCase() ? 'branco' : 'preto')}`;
}

function jogoDeXadrez(area) {
  const partida = { modo: null, nivel: 1, est: xadrezInicial(), historico: [], selecionada: -1, ultima: null, pensando: false, capturadas: { w: [], b: [] }, animar: null };
  const nomeDaVez = (vez) => (partida.modo === 'lumina' ? (vez === 'w' ? textoDoJogo('Você') : 'Lumina') : textoDoJogo(vez === 'w' ? 'Brancas' : 'Pretas'));

  const escolherModo = () => {
    placarDoJogo('');
    falarNoJogo(textoDoJogo('Quer jogar contra a Lumina ou com outra pessoa?'));
    area.innerHTML = `
      <div class="xadrez-modos">
        <button type="button" class="xadrez-modo" data-modo="lumina"><span class="xadrez-modo-arte">${xadrezPecaSvg('q')}</span><strong>${textoDoJogo('Contra a Lumina')}</strong><small>${textoDoJogo('Você joga com as brancas.')}</small></button>
        <button type="button" class="xadrez-modo" data-modo="dois"><span class="xadrez-modo-arte">${xadrezPecaSvg('N')}${xadrezPecaSvg('n')}</span><strong>${textoDoJogo('Duas pessoas')}</strong><small>${textoDoJogo('No mesmo aparelho, cada um na sua vez.')}</small></button>
      </div>
      <button type="button" class="xadrez-personalizar" id="xadrez-personalizar">${textoDoJogo('Personalizar peças e tabuleiro')}</button>`;
    const personalizar = area.querySelector('#xadrez-personalizar');
    if (personalizar) personalizar.addEventListener('click', () => { if (typeof abrirColecaoDeItens === 'function') abrirColecaoDeItens('xadrez', escolherModo); });
    area.querySelectorAll('.xadrez-modo').forEach((b) => b.addEventListener('click', () => {
      if (b.dataset.modo === 'dois') { partida.modo = 'dois'; comecar(); return; }
      escolherNivel();
    }));
  };

  const escolherNivel = () => {
    falarNoJogo(textoDoJogo('Escolha o nível. Quanto mais difícil, mais a Lumina pensa.'));
    area.innerHTML = `
      <div class="xadrez-modos">
        ${NIVEIS_DA_IA.map((n) => `<button type="button" class="jogo-nivel nivel-${n.id}" data-nivel="${n.id}"><span>${'<i></i>'.repeat(n.id + 1)}</span>${textoDoJogo(n.rotulo)}</button>`).join('')}
      </div>`;
    area.querySelectorAll('.jogo-nivel').forEach((b) => b.addEventListener('click', () => { partida.modo = 'lumina'; partida.nivel = Number(b.dataset.nivel); jogoAtual.nivel = partida.nivel; comecar(); }));
  };

  const comecar = () => {
    partida.est = xadrezInicial();
    partida.est.posicoes = { [xadrezChave(partida.est)]: 1 };
    partida.historico = []; partida.selecionada = -1; partida.ultima = null; partida.capturadas = { w: [], b: [] };
    desenhar();
    falarNoJogo(partida.modo === 'lumina' ? textoDoJogo('Boa partida! Você começa.') : textoDoJogo('Brancas começam.'));
  };

  const situacao = () => xadrezSituacao(partida.est);

  const desenhar = () => {
    const est = partida.est;
    const sit = situacao();
    const rei = sit.xeque ? xadrezReiDe(est.tab, est.vez) : -1;
    const destinos = partida.selecionada >= 0 ? sit.legais.filter((m) => m.de === partida.selecionada) : [];
    const casas = est.tab.map((p, i) => {
      const escura = (Math.floor(i / 8) + (i % 8)) % 2 === 1;
      const destino = destinos.find((m) => m.para === i);
      const classes = ['xadrez-casa', escura ? 'escura' : 'clara'];
      if (i === partida.selecionada) classes.push('selecionada');
      if (partida.ultima && (i === partida.ultima.de || i === partida.ultima.para)) classes.push('ultima');
      if (destino) classes.push(destino.captura ? 'alvo-captura' : 'alvo');
      if (i === rei) classes.push('xeque');
      const rotulo = `${xadrezNome(i)}${p ? `, ${xadrezDescreverPeca(p)}` : ''}`;
      const coluna = i % 8 === 0 ? `<i class="xadrez-coord linha">${8 - Math.floor(i / 8)}</i>` : '';
      const linhaDeBaixo = i >= 56 ? `<i class="xadrez-coord coluna">${'abcdefgh'[i % 8]}</i>` : '';
      return `<button type="button" class="${classes.join(' ')}" data-casa="${i}" aria-label="${rotulo}">${coluna}${linhaDeBaixo}${p ? `<span class="xadrez-peca${partida.ultima && partida.ultima.para === i ? ' chegou' : ''}">${xadrezPecaSvg(p)}</span>` : ''}</button>`;
    }).join('');
    const pontos = (cor) => partida.capturadas[cor].reduce((s, p) => s + (XADREZ_VALORES[p.toLowerCase()] || 0), 0);
    const vantagem = (cor) => { const d = pontos(cor) - pontos(cor === 'w' ? 'b' : 'w'); return d > 0 ? `<em class="xadrez-vantagem">+${d >= 100 ? Math.round(d / 100) : d}</em>` : ''; };
    const tiras = (cor) => partida.capturadas[cor].slice().sort((a, b) => XADREZ_VALORES[b.toLowerCase()] - XADREZ_VALORES[a.toLowerCase()]).map((p) => `<span class="xadrez-capturada">${xadrezPecaSvg(p)}</span>`).join('');
    area.innerHTML = `
      <div class="xadrez">
        <div class="xadrez-lado ${est.vez === 'b' ? 'vez' : ''}${partida.pensando ? ' pensando' : ''}"><b>${nomeDaVez('b')}</b><span class="xadrez-pensando" aria-hidden="true"><i></i><i></i><i></i></span><span class="xadrez-tira">${tiras('w')}</span>${vantagem('w')}</div>
        <div class="xadrez-tabuleiro ${typeof classesDoTabuleiro === 'function' ? classesDoTabuleiro() : ''}" role="grid" aria-label="${textoDoJogo('Tabuleiro de xadrez')}">${casas}</div>
        <div class="xadrez-lado ${est.vez === 'w' ? 'vez' : ''}"><b>${nomeDaVez('w')}</b><span class="xadrez-tira">${tiras('b')}</span>${vantagem('b')}</div>
        <div class="xadrez-acoes">
          <button type="button" class="jogo-botao jogo-botao-claro" id="xadrez-desfazer" ${partida.historico.length && !partida.pensando ? '' : 'disabled'}>${textoDoJogo('Desfazer')}</button>
          <button type="button" class="jogo-botao jogo-botao-claro" id="xadrez-novo">${textoDoJogo('Nova partida')}</button>
          <button type="button" class="jogo-botao jogo-botao-claro" id="xadrez-visual">${textoDoJogo('Personalizar')}</button>
        </div>
      </div>`;
    placarDoJogo(`${textoDoJogo('Jogada')} ${est.jogada}`);
    area.querySelectorAll('.xadrez-casa').forEach((b) => b.addEventListener('click', () => { if (!cliqueLogoDepoisDoArraste()) tocar(Number(b.dataset.casa)); }));
    ligarArrasteNoTabuleiro(area.querySelector('.xadrez-tabuleiro'), {
      podeArrastar: (casa) => vezDoJogador() && !!jogoAtual && !jogoAtual.fim && xadrezCorDe(est.tab[casa]) === est.vez && sit.legais.some((m) => m.de === casa),
      destinos: (casa) => sit.legais.filter((m) => m.de === casa).map((m) => m.para),
      soltar: (de, para) => { partida.selecionada = de; tocar(para); },
      cancelar: () => desenhar(),
    });
    area.querySelector('#xadrez-desfazer').addEventListener('click', desfazer);
    area.querySelector('#xadrez-visual').addEventListener('click', () => { if (typeof abrirColecaoDeItens === 'function') abrirColecaoDeItens('xadrez', desenhar); });
    area.querySelector('#xadrez-novo').addEventListener('click', () => { if (!partida.historico.length || window.confirm(textoDoJogo('Começar uma nova partida?'))) escolherModo(); });
    if (partida.animar) {
      animarJogadaNoTabuleiro(area.querySelector('.xadrez-tabuleiro'), partida.animar.caminho, partida.animar.fantasmas);
      partida.animar = null;
    }
  };

  const vezDoJogador = () => !partida.pensando && !(partida.modo === 'lumina' && partida.est.vez === 'b');

  const tocar = (casa) => {
    if (!jogoAtual || jogoAtual.fim || !vezDoJogador()) return;
    const est = partida.est;
    const p = est.tab[casa];
    const sit = situacao();
    if (partida.selecionada >= 0) {
      const opcoes = sit.legais.filter((m) => m.de === partida.selecionada && m.para === casa);
      if (opcoes.length) {
        if (opcoes.length > 1) { escolherPromocao(opcoes); return; }
        jogar(opcoes[0]);
        return;
      }
    }
    if (p && xadrezCorDe(p) === est.vez) {
      partida.selecionada = partida.selecionada === casa ? -1 : casa;
      if (partida.selecionada >= 0 && !sit.legais.some((m) => m.de === casa)) falarNoJogo(textoDoJogo('Essa peça não tem para onde ir agora.'));
      tocarNotaDoJogo(523);
    } else {
      partida.selecionada = -1;
    }
    desenhar();
  };

  const escolherPromocao = (opcoes) => {
    const cor = partida.est.vez;
    const tipos = ['q', 'r', 'b', 'n'].map((t) => (cor === 'w' ? t.toUpperCase() : t));
    area.querySelector('.xadrez').insertAdjacentHTML('beforeend', `
      <div class="xadrez-promocao" role="dialog" aria-label="${textoDoJogo('Escolha a peça')}">
        <strong>${textoDoJogo('O peão chegou ao fim! Escolha a peça:')}</strong>
        <div>${tipos.map((t) => `<button type="button" data-peca="${t}" aria-label="${xadrezDescreverPeca(t)}">${xadrezPecaSvg(t)}</button>`).join('')}</div>
      </div>`);
    area.querySelectorAll('.xadrez-promocao button').forEach((b) => b.addEventListener('click', () => jogar(opcoes.find((m) => m.promocao === b.dataset.peca))));
  };

  const jogar = (m) => {
    const antes = partida.est;
    partida.historico.push({ est: antes, ultima: partida.ultima, capturadas: { w: partida.capturadas.w.slice(), b: partida.capturadas.b.slice() } });
    const novo = xadrezAplicar(antes, m);
    novo.posicoes = Object.assign({}, antes.posicoes);
    const chave = xadrezChave(novo);
    novo.posicoes[chave] = (novo.posicoes[chave] || 0) + 1;
    if (m.captura) partida.capturadas[antes.vez].push(m.captura);
    partida.est = novo; partida.selecionada = -1; partida.ultima = { de: m.de, para: m.para };
    const casaDaCaptura = m.captura ? (antes.tab[m.para] ? m.para : m.para + (antes.vez === 'w' ? 8 : -8)) : -1;
    partida.animar = { caminho: [m.de, m.para], fantasmas: m.captura ? [{ casa: casaDaCaptura, svg: xadrezPecaSvg(m.captura) }] : [] };
    tocarBatidaDePeca(!!m.captura, 0.24);
    desenhar();
    const sit = situacao();
    if (sit.fim) { fimDaPartida(sit); return; }
    if (sit.xeque) falarNoJogo(textoDoJogo('Xeque!'), partida.modo === 'lumina' && novo.vez === 'w' ? 'feliz' : 'ops');
    else if (partida.modo === 'dois') falarNoJogo(textoDoJogo('Vez das {cor}.', { cor: textoDoJogo(novo.vez === 'w' ? 'brancas' : 'pretas') }));
    else if (novo.vez === 'w') falarNoJogo(textoDoJogo(m.captura ? 'Peguei uma peça! Sua vez.' : 'Sua vez.'));
    if (partida.modo === 'lumina' && novo.vez === 'b') vezDaLumina();
  };

  const vezDaLumina = () => {
    partida.pensando = true;
    falarNoJogo(textoDoJogo('A Lumina está pensando...'));
    desenhar();
    agendarNoJogo(() => {
      if (!jogoAtual || jogoAtual.fim) return;
      const m = xadrezMelhorJogada(partida.est, partida.nivel);
      partida.pensando = false;
      if (m) jogar(m);
    }, 450);
  };

  const desfazer = () => {
    if (!partida.historico.length || partida.pensando) return;
    let volta = partida.historico.pop();
    if (partida.modo === 'lumina' && volta.est.vez === 'b' && partida.historico.length) volta = partida.historico.pop();
    partida.est = volta.est; partida.ultima = volta.ultima; partida.capturadas = volta.capturadas; partida.selecionada = -1;
    desenhar();
    falarNoJogo(textoDoJogo('Jogada desfeita.'));
  };

  const fimDaPartida = (sit) => {
    const motivos = { afogado: 'Afogado! Ninguém pode se mexer, então é empate.', cinquenta: 'Empate pela regra das 50 jogadas.', material: 'Empate: não sobrou peça para dar xeque-mate.', repeticao: 'Empate: a mesma posição apareceu três vezes.' };
    if (sit.motivo !== 'mate') { terminarJogo(2, textoDoJogo(motivos[sit.motivo])); return; }
    if (partida.modo === 'dois') { terminarJogo(3, textoDoJogo('Xeque-mate! As {cor} venceram.', { cor: textoDoJogo(sit.vencedor === 'w' ? 'brancas' : 'pretas') })); return; }
    if (sit.vencedor === 'w') terminarJogo(3, textoDoJogo('Xeque-mate! Você venceu a Lumina.'));
    else terminarJogo(1, textoDoJogo('Xeque-mate! A Lumina venceu desta vez.'));
  };

  escolherModo();
  if (typeof carregarItensDoPerfil === 'function') carregarItensDoPerfil().then(() => { if (!jogoAtual || jogoAtual.fim || !area.isConnected) return; if (partida.modo) desenhar(); else if (area.querySelector('.xadrez-modos .xadrez-modo')) escolherModo(); }).catch(() => {});
}
