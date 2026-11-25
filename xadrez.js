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

const NIVEIS_DOS_TABULEIROS = [
  { id: 0, rotulo: 'Fácil' },
  { id: 1, rotulo: 'Médio' },
  { id: 2, rotulo: 'Difícil' },
  { id: 3, rotulo: 'Muito difícil' },
  { id: 4, rotulo: 'Impossível' },
  { id: 5, rotulo: 'Gênio' },
];
const CONFIG_DOS_MOTORES = { 2: { tempo: 450, profundidade: 4, ruido: 40 }, 3: { tempo: 1000, profundidade: 7, ruido: 12 }, 4: { tempo: 3000, ruido: 0 }, 5: { tempo: 7000, ruido: 0 } };
const motoresDosTabuleiros = {};

function pedirAoMotor(arquivo, pedido) {
  return new Promise((resolver) => {
    if (typeof Worker === 'undefined') { resolver(null); return; }
    let item = motoresDosTabuleiros[arquivo];
    if (item && item.ocupado) { try { item.w.terminate(); } catch (e) {
    } item = null; delete motoresDosTabuleiros[arquivo]; }
    if (!item) {
      try { item = { w: new Worker(arquivo), ocupado: false, id: 0 }; } catch (e) { resolver(null); return; }
      motoresDosTabuleiros[arquivo] = item;
    }
    item.id += 1;
    const id = item.id;
    item.ocupado = true;
    const desistir = () => { item.ocupado = false; try { item.w.terminate(); } catch (e) {
    } if (motoresDosTabuleiros[arquivo] === item) delete motoresDosTabuleiros[arquivo]; resolver(null); };
    const limite = setTimeout(desistir, (pedido.tempo || 1000) + 8000);
    item.w.onmessage = (e) => {
      const r = e.data || {};
      if (r.id !== id) return;
      clearTimeout(limite);
      item.ocupado = false;
      resolver(r.erro || r.nada ? null : r);
    };
    item.w.onerror = () => { clearTimeout(limite); desistir(); };
    try { item.w.postMessage(Object.assign({}, pedido, { id })); } catch (e) { clearTimeout(limite); desistir(); }
  });
}

function htmlDosNiveisDosTabuleiros() {
  return NIVEIS_DOS_TABULEIROS.map((n) => `<button type="button" class="jogo-nivel nivel-${n.id}" data-nivel="${n.id}"><span>${'<i></i>'.repeat(n.id + 1)}</span>${textoDoJogo(n.rotulo)}</button>`).join('');
}

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
    <linearGradient id="xz-vidro-b" x1=".1" y1="0" x2=".9" y2="1"><stop offset="0" stop-color="#ffffff" stop-opacity="0.88"/><stop offset="0.4" stop-color="#eef8ff" stop-opacity="0.4"/><stop offset="0.75" stop-color="#d6edfb" stop-opacity="0.55"/><stop offset="1" stop-color="#bde0f5" stop-opacity="0.8"/></linearGradient>
    <linearGradient id="xz-vidro-p" x1=".1" y1="0" x2=".9" y2="1"><stop offset="0" stop-color="#5d6678" stop-opacity="0.88"/><stop offset="0.45" stop-color="#1b2130" stop-opacity="0.72"/><stop offset="1" stop-color="#04060c" stop-opacity="0.92"/></linearGradient>
    <linearGradient id="xz-esmeralda-b" x1=".1" y1="0" x2=".9" y2="1"><stop offset="0" stop-color="#f4fff9" stop-opacity="0.96"/><stop offset="0.45" stop-color="#a8f0cb" stop-opacity="0.72"/><stop offset="1" stop-color="#45c48a" stop-opacity="0.9"/></linearGradient>
    <linearGradient id="xz-esmeralda-p" x1=".1" y1="0" x2=".9" y2="1"><stop offset="0" stop-color="#1f8a57" stop-opacity="0.96"/><stop offset="0.4" stop-color="#05482a" stop-opacity="0.88"/><stop offset="1" stop-color="#001a0d" stop-opacity="0.98"/></linearGradient>
    <linearGradient id="xz-ouro-b" x1=".1" y1="0" x2=".9" y2="1"><stop offset="0" stop-color="#fffbe6" stop-opacity="0.98"/><stop offset="0.45" stop-color="#ffe08a" stop-opacity="0.82"/><stop offset="1" stop-color="#e0ac2e" stop-opacity="0.94"/></linearGradient>
    <linearGradient id="xz-ouro-p" x1=".1" y1="0" x2=".9" y2="1"><stop offset="0" stop-color="#a8741a" stop-opacity="0.96"/><stop offset="0.45" stop-color="#4a2e05" stop-opacity="0.92"/><stop offset="1" stop-color="#140b01" stop-opacity="0.98"/></linearGradient>
    <linearGradient id="xz-rubi-b" x1=".1" y1="0" x2=".9" y2="1"><stop offset="0" stop-color="#fff2f5" stop-opacity="0.96"/><stop offset="0.45" stop-color="#ffb3c4" stop-opacity="0.72"/><stop offset="1" stop-color="#f04d72" stop-opacity="0.9"/></linearGradient>
    <linearGradient id="xz-rubi-p" x1=".1" y1="0" x2=".9" y2="1"><stop offset="0" stop-color="#b0173c" stop-opacity="0.96"/><stop offset="0.45" stop-color="#5a0618" stop-opacity="0.9"/><stop offset="1" stop-color="#1a0006" stop-opacity="0.98"/></linearGradient>
    <linearGradient id="xz-perola" x1=".1" y1="0" x2=".9" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset="0.3" stop-color="#fdeef6"/><stop offset="0.6" stop-color="#e8f6f4"/><stop offset="1" stop-color="#d6c6ee"/></linearGradient>
    <linearGradient id="xz-obsidiana" x1=".1" y1="0" x2=".9" y2="1"><stop offset="0" stop-color="#4a3f6b" stop-opacity="0.96"/><stop offset="0.3" stop-color="#0b0910" stop-opacity="0.92"/><stop offset="0.65" stop-color="#1c1630" stop-opacity="0.94"/><stop offset="1" stop-color="#000000" stop-opacity="0.99"/></linearGradient>
    <linearGradient id="xz-celestial-b" x1=".1" y1="0" x2=".9" y2="1"><stop offset="0" stop-color="#fff3fa" stop-opacity="0.96"/><stop offset="0.25" stop-color="#dcf3ff" stop-opacity="0.8"/><stop offset="0.5" stop-color="#eaffe8" stop-opacity="0.76"/><stop offset="0.75" stop-color="#fff6d8" stop-opacity="0.8"/><stop offset="1" stop-color="#efdcff" stop-opacity="0.94"/></linearGradient>
    <linearGradient id="xz-celestial-p" x1=".1" y1="0" x2=".9" y2="1"><stop offset="0" stop-color="#5a3fd0" stop-opacity="0.96"/><stop offset="0.35" stop-color="#1a0f4d" stop-opacity="0.92"/><stop offset="0.7" stop-color="#062a45" stop-opacity="0.92"/><stop offset="1" stop-color="#3a0a5a" stop-opacity="0.97"/></linearGradient>
    <linearGradient id="xz-reflexo" x1="0" y1="0" x2=".8" y2=".8"><stop offset="0" stop-color="#ffffff" stop-opacity="0.7"/><stop offset="0.3" stop-color="#ffffff" stop-opacity="0.18"/><stop offset="0.5" stop-color="#ffffff" stop-opacity="0"/></linearGradient>
    <radialGradient id="dm-vidro-b" cx=".38" cy=".32" r=".8"><stop offset="0" stop-color="#ffffff" stop-opacity="0.92"/><stop offset="0.55" stop-color="#e6f4fd" stop-opacity="0.45"/><stop offset="1" stop-color="#a9d2ee" stop-opacity="0.82"/></radialGradient>
    <radialGradient id="dm-vidro-p" cx=".38" cy=".32" r=".8"><stop offset="0" stop-color="#6a7385" stop-opacity="0.9"/><stop offset="0.55" stop-color="#1b2130" stop-opacity="0.75"/><stop offset="1" stop-color="#04060c" stop-opacity="0.94"/></radialGradient>
    <radialGradient id="dm-esmeralda-b" cx=".38" cy=".32" r=".8"><stop offset="0" stop-color="#f6fffa" stop-opacity="0.96"/><stop offset="0.55" stop-color="#a1ecc5" stop-opacity="0.72"/><stop offset="1" stop-color="#38b57c" stop-opacity="0.92"/></radialGradient>
    <radialGradient id="dm-esmeralda-p" cx=".38" cy=".32" r=".8"><stop offset="0" stop-color="#2a9a63" stop-opacity="0.96"/><stop offset="0.55" stop-color="#05482a" stop-opacity="0.9"/><stop offset="1" stop-color="#001008" stop-opacity="0.98"/></radialGradient>
    <radialGradient id="dm-ouro-b" cx=".38" cy=".32" r=".8"><stop offset="0" stop-color="#fffdf0" stop-opacity="0.98"/><stop offset="0.55" stop-color="#ffe08a" stop-opacity="0.84"/><stop offset="1" stop-color="#d9a326" stop-opacity="0.95"/></radialGradient>
    <radialGradient id="dm-ouro-p" cx=".38" cy=".32" r=".8"><stop offset="0" stop-color="#b88524" stop-opacity="0.96"/><stop offset="0.55" stop-color="#4a2e05" stop-opacity="0.92"/><stop offset="1" stop-color="#100800" stop-opacity="0.98"/></radialGradient>
    <radialGradient id="dm-rubi-b" cx=".38" cy=".32" r=".8"><stop offset="0" stop-color="#fff5f7" stop-opacity="0.96"/><stop offset="0.55" stop-color="#ffadc0" stop-opacity="0.74"/><stop offset="1" stop-color="#e8466c" stop-opacity="0.92"/></radialGradient>
    <radialGradient id="dm-rubi-p" cx=".38" cy=".32" r=".8"><stop offset="0" stop-color="#c41f48" stop-opacity="0.96"/><stop offset="0.55" stop-color="#5a0618" stop-opacity="0.9"/><stop offset="1" stop-color="#120004" stop-opacity="0.98"/></radialGradient>
    <radialGradient id="dm-perola" cx=".38" cy=".32" r=".8"><stop offset="0" stop-color="#ffffff"/><stop offset="0.5" stop-color="#fbeef7"/><stop offset="0.8" stop-color="#e3f3f0"/><stop offset="1" stop-color="#c9b9e6"/></radialGradient>
    <radialGradient id="dm-obsidiana" cx=".38" cy=".32" r=".8"><stop offset="0" stop-color="#5a4f80" stop-opacity="0.96"/><stop offset="0.5" stop-color="#0b0910" stop-opacity="0.92"/><stop offset="1" stop-color="#000000" stop-opacity="0.99"/></radialGradient>
    <radialGradient id="dm-celestial-b" cx=".38" cy=".32" r=".8"><stop offset="0" stop-color="#ffffff" stop-opacity="0.96"/><stop offset="0.3" stop-color="#ffe6f4" stop-opacity="0.82"/><stop offset="0.55" stop-color="#d9f2ff" stop-opacity="0.75"/><stop offset="0.8" stop-color="#e6ffe2" stop-opacity="0.8"/><stop offset="1" stop-color="#e6d2ff" stop-opacity="0.94"/></radialGradient>
    <radialGradient id="dm-celestial-p" cx=".38" cy=".32" r=".8"><stop offset="0" stop-color="#7a5cf0" stop-opacity="0.96"/><stop offset="0.45" stop-color="#1f1260" stop-opacity="0.9"/><stop offset="0.75" stop-color="#073050" stop-opacity="0.9"/><stop offset="1" stop-color="#4a0f78" stop-opacity="0.97"/></radialGradient>
    <linearGradient id="xz-cristal-b" x1=".1" y1="0" x2=".9" y2="1"><stop offset="0" stop-color="#ffffff" stop-opacity="0.6"/><stop offset="0.45" stop-color="#f2f9ff" stop-opacity="0.14"/><stop offset="0.8" stop-color="#ffffff" stop-opacity="0.26"/><stop offset="1" stop-color="#e6f3ff" stop-opacity="0.5"/></linearGradient>
    <linearGradient id="xz-cristal-p" x1=".1" y1="0" x2=".9" y2="1"><stop offset="0" stop-color="#4a5266" stop-opacity="0.6"/><stop offset="0.45" stop-color="#0c101c" stop-opacity="0.32"/><stop offset="1" stop-color="#000000" stop-opacity="0.6"/></linearGradient>
    <linearGradient id="xz-safira-b" x1=".1" y1="0" x2=".9" y2="1"><stop offset="0" stop-color="#f3f8ff" stop-opacity="0.96"/><stop offset="0.45" stop-color="#b3ceff" stop-opacity="0.72"/><stop offset="1" stop-color="#5a8ef0" stop-opacity="0.9"/></linearGradient>
    <linearGradient id="xz-safira-p" x1=".1" y1="0" x2=".9" y2="1"><stop offset="0" stop-color="#2a5bd0" stop-opacity="0.96"/><stop offset="0.45" stop-color="#0b2470" stop-opacity="0.9"/><stop offset="1" stop-color="#020a24" stop-opacity="0.98"/></linearGradient>
    <linearGradient id="xz-ambar-b" x1=".1" y1="0" x2=".9" y2="1"><stop offset="0" stop-color="#fff8e0" stop-opacity="0.96"/><stop offset="0.45" stop-color="#ffd27a" stop-opacity="0.76"/><stop offset="1" stop-color="#e8952a" stop-opacity="0.9"/></linearGradient>
    <linearGradient id="xz-ambar-p" x1=".1" y1="0" x2=".9" y2="1"><stop offset="0" stop-color="#c06a10" stop-opacity="0.96"/><stop offset="0.45" stop-color="#5a2a02" stop-opacity="0.9"/><stop offset="1" stop-color="#1c0b00" stop-opacity="0.98"/></linearGradient>
    <linearGradient id="xz-ametista-b" x1=".1" y1="0" x2=".9" y2="1"><stop offset="0" stop-color="#fbf4ff" stop-opacity="0.96"/><stop offset="0.45" stop-color="#dcb8ff" stop-opacity="0.72"/><stop offset="1" stop-color="#a66be8" stop-opacity="0.9"/></linearGradient>
    <linearGradient id="xz-ametista-p" x1=".1" y1="0" x2=".9" y2="1"><stop offset="0" stop-color="#7a3fd0" stop-opacity="0.96"/><stop offset="0.45" stop-color="#341070" stop-opacity="0.9"/><stop offset="1" stop-color="#0d0224" stop-opacity="0.98"/></linearGradient>
    <linearGradient id="xz-gotico-b" x1=".1" y1="0" x2=".9" y2="1"><stop offset="0" stop-color="#fbf6ea"/><stop offset="0.5" stop-color="#ddd2bb"/><stop offset="1" stop-color="#aa9c80"/></linearGradient>
    <linearGradient id="xz-gotico-p" x1=".1" y1="0" x2=".9" y2="1"><stop offset="0" stop-color="#565c6e"/><stop offset="0.5" stop-color="#262a36"/><stop offset="1" stop-color="#08090e"/></linearGradient>
    <linearGradient id="xz-sagrada-b" x1=".1" y1="0" x2=".9" y2="1"><stop offset="0" stop-color="#fdeed6"/><stop offset="0.5" stop-color="#e8c79c"/><stop offset="1" stop-color="#b98a58"/></linearGradient>
    <linearGradient id="xz-sagrada-p" x1=".1" y1="0" x2=".9" y2="1"><stop offset="0" stop-color="#8a4a2a"/><stop offset="0.5" stop-color="#45200f"/><stop offset="1" stop-color="#160803"/></linearGradient>
    <radialGradient id="dm-cristal-b" cx=".38" cy=".32" r=".8"><stop offset="0" stop-color="#ffffff" stop-opacity="0.7"/><stop offset="0.55" stop-color="#f2f9ff" stop-opacity="0.16"/><stop offset="1" stop-color="#e6f3ff" stop-opacity="0.55"/></radialGradient>
    <radialGradient id="dm-cristal-p" cx=".38" cy=".32" r=".8"><stop offset="0" stop-color="#5a6276" stop-opacity="0.62"/><stop offset="0.55" stop-color="#0c101c" stop-opacity="0.34"/><stop offset="1" stop-color="#000000" stop-opacity="0.62"/></radialGradient>
    <radialGradient id="dm-safira-b" cx=".38" cy=".32" r=".8"><stop offset="0" stop-color="#f6faff" stop-opacity="0.96"/><stop offset="0.55" stop-color="#aac7ff" stop-opacity="0.72"/><stop offset="1" stop-color="#4f84e8" stop-opacity="0.92"/></radialGradient>
    <radialGradient id="dm-safira-p" cx=".38" cy=".32" r=".8"><stop offset="0" stop-color="#3a6be0" stop-opacity="0.96"/><stop offset="0.55" stop-color="#0b2470" stop-opacity="0.9"/><stop offset="1" stop-color="#01061a" stop-opacity="0.98"/></radialGradient>
    <radialGradient id="dm-ambar-b" cx=".38" cy=".32" r=".8"><stop offset="0" stop-color="#fffaea" stop-opacity="0.96"/><stop offset="0.55" stop-color="#ffcf70" stop-opacity="0.78"/><stop offset="1" stop-color="#e08a20" stop-opacity="0.92"/></radialGradient>
    <radialGradient id="dm-ambar-p" cx=".38" cy=".32" r=".8"><stop offset="0" stop-color="#d07818" stop-opacity="0.96"/><stop offset="0.55" stop-color="#5a2a02" stop-opacity="0.9"/><stop offset="1" stop-color="#140700" stop-opacity="0.98"/></radialGradient>
    <radialGradient id="dm-ametista-b" cx=".38" cy=".32" r=".8"><stop offset="0" stop-color="#fcf7ff" stop-opacity="0.96"/><stop offset="0.55" stop-color="#d8b2ff" stop-opacity="0.72"/><stop offset="1" stop-color="#9c60e0" stop-opacity="0.92"/></radialGradient>
    <radialGradient id="dm-ametista-p" cx=".38" cy=".32" r=".8"><stop offset="0" stop-color="#8a4fe0" stop-opacity="0.96"/><stop offset="0.55" stop-color="#341070" stop-opacity="0.9"/><stop offset="1" stop-color="#08011a" stop-opacity="0.98"/></radialGradient>
    <radialGradient id="dm-gotico-b" cx=".38" cy=".32" r=".8"><stop offset="0" stop-color="#fffaf0"/><stop offset="0.6" stop-color="#dccfb4"/><stop offset="1" stop-color="#a2937a"/></radialGradient>
    <radialGradient id="dm-gotico-p" cx=".38" cy=".32" r=".8"><stop offset="0" stop-color="#646a7e"/><stop offset="0.6" stop-color="#262a36"/><stop offset="1" stop-color="#06070b"/></radialGradient>
    <radialGradient id="dm-sagrada-b" cx=".38" cy=".32" r=".8"><stop offset="0" stop-color="#fff3e0"/><stop offset="0.6" stop-color="#e6c294"/><stop offset="1" stop-color="#ae7e4c"/></radialGradient>
    <radialGradient id="dm-sagrada-p" cx=".38" cy=".32" r=".8"><stop offset="0" stop-color="#9a5634"/><stop offset="0.6" stop-color="#45200f"/><stop offset="1" stop-color="#120602"/></radialGradient>
  </defs>`;
  document.body.appendChild(svg);
}

let tabuleiroArrastadoEm = 0;
let limparArrasteAtual = null;

function limparPecasArrastadas() {
  if (typeof limparArrasteAtual === 'function') {
    const limpar = limparArrasteAtual;
    limparArrasteAtual = null;
    try { limpar(); } catch (e) {
    }
  }
  if (typeof document === 'undefined' || !document.querySelectorAll) return;
  document.querySelectorAll('.xadrez-peca-arrastada').forEach((el) => el.remove());
  document.querySelectorAll('.xadrez-tabuleiro.arrastando').forEach((el) => el.classList.remove('arrastando'));
}

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
  limparPecasArrastadas();
  const inicio = { x: evento.clientX, y: evento.clientY };
  const destinos = new Set(opcoes.destinos(indice));
  let fantasma = null;
  let alvo = null;
  const limpar = () => {
    window.removeEventListener('pointermove', mover);
    window.removeEventListener('pointerup', soltar);
    window.removeEventListener('pointercancel', cancelar);
    window.removeEventListener('blur', cancelar);
    if (alvo) alvo.classList.remove('arraste-sobre');
    if (fantasma) fantasma.remove();
    fantasma = null;
    peca.classList.remove('sendo-arrastada');
    tabuleiro.classList.remove('arrastando');
    tabuleiro.querySelectorAll('.destino-do-arraste').forEach((c) => c.classList.remove('destino-do-arraste'));
    if (limparArrasteAtual === limpar) limparArrasteAtual = null;
  };
  limparArrasteAtual = limpar;
  const mover = (e) => {
    if (!tabuleiro.isConnected) { cancelar(); return; }
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
    if (!tabuleiro.isConnected) { limpar(); return; }
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
    if (arrastou && tabuleiro.isConnected) {
      tabuleiroArrastadoEm = Date.now();
      opcoes.cancelar();
    }
  };
  window.addEventListener('pointermove', mover, { passive: false });
  window.addEventListener('pointerup', soltar);
  window.addEventListener('pointercancel', cancelar);
  window.addEventListener('blur', cancelar);
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
  if (typeof somDosJogosLigado === 'function' && !somDosJogosLigado()) return;
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
  diamante: { formas: 'facetada', brilho: true, reflexo: true, b: { corpo: 'url(#xz-diamante)', linha: '#3f6ea8', detalhe: '#2a5a96' }, p: { corpo: 'url(#xz-onix)', linha: '#000000', detalhe: '#8fd0ff' } },
  vidro: { formas: 'moderna', reflexo: true, b: { corpo: 'url(#xz-vidro-b)', linha: '#7fa6c4', detalhe: '#5d86a6' }, p: { corpo: 'url(#xz-vidro-p)', linha: '#020308', detalhe: '#9fb4c9' } },
  cristal: { formas: 'facetada', reflexo: true, b: { corpo: 'url(#xz-cristal-b)', linha: '#d8ecff', detalhe: '#ffffff' }, p: { corpo: 'url(#xz-cristal-p)', linha: '#1a2030', detalhe: '#d8ecff' } },
  esmeralda: { formas: 'facetada', reflexo: true, b: { corpo: 'url(#xz-esmeralda-b)', linha: '#1f7a4f', detalhe: '#167044' }, p: { corpo: 'url(#xz-esmeralda-p)', linha: '#000805', detalhe: '#8ff0bf' } },
  safira: { formas: 'facetada', reflexo: true, b: { corpo: 'url(#xz-safira-b)', linha: '#2c5bb8', detalhe: '#244da0' }, p: { corpo: 'url(#xz-safira-p)', linha: '#00030f', detalhe: '#a9c8ff' } },
  ouro: { formas: 'catedral', reflexo: true, b: { corpo: 'url(#xz-ouro-b)', linha: '#8a6410', detalhe: '#8a6410' }, p: { corpo: 'url(#xz-ouro-p)', linha: '#0c0600', detalhe: '#ffd46b' } },
  ambar: { formas: 'moderna', reflexo: true, b: { corpo: 'url(#xz-ambar-b)', linha: '#a4600e', detalhe: '#a4600e' }, p: { corpo: 'url(#xz-ambar-p)', linha: '#0c0400', detalhe: '#ffc46b' } },
  rubi: { formas: 'facetada', reflexo: true, b: { corpo: 'url(#xz-rubi-b)', linha: '#b0173c', detalhe: '#9c1534' }, p: { corpo: 'url(#xz-rubi-p)', linha: '#0c0003', detalhe: '#ff9fb5' } },
  ametista: { formas: 'facetada', reflexo: true, b: { corpo: 'url(#xz-ametista-b)', linha: '#7a3fc0', detalhe: '#6a32b0' }, p: { corpo: 'url(#xz-ametista-p)', linha: '#05000f', detalhe: '#d8b2ff' } },
  obsidiana: { formas: 'moderna', reflexo: true, b: { corpo: 'url(#xz-perola)', linha: '#9a86b8', detalhe: '#8a72aa' }, p: { corpo: 'url(#xz-obsidiana)', linha: '#000000', detalhe: '#b9a3ff' } },
  gotico: { formas: 'gotica', b: { corpo: 'url(#xz-gotico-b)', linha: '#5a4a30', detalhe: '#3a5aa8' }, p: { corpo: 'url(#xz-gotico-p)', linha: '#000000', detalhe: '#e0b84a' } },
  sagrada: { formas: 'sagrada', b: { corpo: 'url(#xz-sagrada-b)', linha: '#6a4420', detalhe: '#5a3412' }, p: { corpo: 'url(#xz-sagrada-p)', linha: '#0a0301', detalhe: '#f2c230' } },
  celestial: { formas: 'facetada', brilho: true, reflexo: true, b: { corpo: 'url(#xz-celestial-b)', linha: '#a07ad6', detalhe: '#8a5cc9' }, p: { corpo: 'url(#xz-celestial-p)', linha: '#060218', detalhe: '#ffe9a8' } },
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
  if (estilo === 'facetada') {
        const base = `<path d="M20 92 L27 82 H73 L80 92 Z"/>`;
    return {
      p: `<path d="M50 16 L59 20 L63 29 L59 38 L50 42 L41 38 L37 29 L41 20 Z"/><path d="M38 46 H62 L58 52 H42 Z"/><path d="M42 52 H58 L66 82 H34 Z"/>${base}`,
      r: `<path d="M28 14 H38 V22 H45 V14 H55 V22 H62 V14 H72 V30 L66 38 H34 L28 30 Z"/><path d="M35 38 H65 L62 74 L68 82 H32 L38 74 Z"/>${base}`,
      n: `<path d="M68 82 H30 L34 68 L44 58 L36 60 L27 58 L23 52 L28 44 L40 32 L44 22 L52 14 L56 22 L66 30 L72 44 L72 62 Z"/><path d="M44 30 L49 27 L49 33 Z" fill="${detalhe}" stroke="none"/>${base}`,
      b: `<path d="M50 3 L54 9 L50 14 L46 9 Z"/><path d="M50 14 L63 30 L58 52 H42 L37 30 Z"/><path d="M56 23 L47 37" fill="none" stroke="${detalhe}" stroke-width="3" stroke-linecap="round"/><path d="M36 55 H64 L60 60 H40 Z"/><path d="M41 60 H59 L67 82 H33 Z"/>${base}`,
      q: `<path d="M26 52 L23 26 L36 38 L42 16 L50 30 L58 16 L64 38 L77 26 L74 52 Z"/><path d="M23 18 L26 23 L23 28 L20 23 Z M42 8 L45 13 L42 18 L39 13 Z M58 8 L61 13 L58 18 L55 13 Z M77 18 L80 23 L77 28 L74 23 Z"/><path d="M28 52 H72 V58 H28 Z"/><path d="M33 58 H67 L72 82 H28 Z"/>${base}`,
      k: `<path d="M46 2 H54 V10 H62 V18 H54 V28 H46 V18 H38 V10 H46 Z"/><path d="M30 46 L36 32 H64 L70 46 L64 54 H36 Z"/><path d="M33 54 H67 V60 H33 Z"/><path d="M36 60 H64 L72 82 H28 Z"/>${base}`,
    };
  }
  if (estilo === 'moderna') {
    const base = '<rect x="22" y="83" width="56" height="9" rx="4.5"/>';
    return {
      p: `<circle cx="50" cy="30" r="12"/><path d="M38 83 C40 62 46 50 50 44 C54 50 60 62 62 83 Z"/>${base}`,
      r: `<path d="M32 83 V30 Q32 18 44 18 H56 Q68 18 68 30 V83 Z"/><rect x="44" y="18" width="12" height="10" rx="3" fill="${detalhe}" stroke="none"/><path d="M38 70 H62" fill="none" stroke="${detalhe}" stroke-width="2.5" stroke-linecap="round"/>${base}`,
      n: `<path d="M65 83 H32 C32 67 40 59 46 55 C38 55 30 57 27 51 C26 43 37 30 45 24 C50 17 56 13 62 15 C71 25 73 46 69 62 C67 72 65 78 65 83 Z"/><circle cx="47" cy="30" r="2.8" fill="${detalhe}" stroke="none"/><path d="M58 20 C64 30 66 42 64 52" fill="none" stroke="${detalhe}" stroke-width="2.5" stroke-linecap="round"/>${base}`,
      b: `<path d="M50 10 C65 21 67 40 60 52 H40 C33 40 35 21 50 10 Z"/><path d="M57 24 L44 40" fill="none" stroke="${detalhe}" stroke-width="3.5" stroke-linecap="round"/><ellipse cx="50" cy="55" rx="13" ry="4"/><path d="M40 59 C42 70 38 78 33 83 H67 C62 78 58 70 60 59 Z"/>${base}`,
      q: `<circle cx="50" cy="11" r="5"/><path d="M33 52 C29 39 32 26 50 19 C68 26 71 39 67 52 Z"/><circle cx="39" cy="34" r="2.6" fill="${detalhe}" stroke="none"/><circle cx="50" cy="30" r="2.8" fill="${detalhe}" stroke="none"/><circle cx="61" cy="34" r="2.6" fill="${detalhe}" stroke="none"/><ellipse cx="50" cy="56" rx="17" ry="4.5"/><path d="M36 60 C40 70 36 78 30 83 H70 C64 78 60 70 64 60 Z"/>${base}`,
      k: `<rect x="46" y="3" width="8" height="24" rx="3"/><rect x="39" y="9" width="22" height="8" rx="3"/><path d="M33 54 C30 42 36 31 50 29 C64 31 70 42 67 54 Z"/><ellipse cx="50" cy="57" rx="18" ry="4.5"/><path d="M36 61 C40 71 35 79 30 83 H70 C65 79 60 71 64 61 Z"/>${base}`,
    };
  }
  if (estilo === 'gotica') {
    const base = '<path d="M20 92 V86 H26 V81 H74 V86 H80 V92 Z"/>';
    const lanceta = (x, y, l, a) => `<path d="M${x - l} ${y + a} V${y + 5} Q${x - l} ${y} ${x} ${y - 4} Q${x + l} ${y} ${x + l} ${y + 5} V${y + a}" fill="none" stroke="${detalhe}" stroke-width="2.2"/>`;
    return {
      p: `<path d="M50 6 L54 17 L50 28 L46 17 Z"/><path d="M38 81 V48 Q38 40 50 30 Q62 40 62 48 V81 Z"/>${lanceta(50, 56, 5, 25)}${base}`,
      r: `<path d="M26 81 V36 L31 21 L36 36 V44 H64 V36 L69 21 L74 36 V81 Z"/><circle cx="50" cy="56" r="7.5" fill="none" stroke="${detalhe}" stroke-width="2.4"/><path d="M50 48.5 V63.5 M42.5 56 H57.5 M44.7 50.7 L55.3 61.3 M55.3 50.7 L44.7 61.3" fill="none" stroke="${detalhe}" stroke-width="1.3"/><path d="M44 81 V72 Q44 66 50 64 Q56 66 56 72 V81 Z" fill="${detalhe}" stroke="none" opacity=".85"/><path d="M29 50 V43 L31 39 L33 43 V50 M67 50 V43 L69 39 L71 43 V50" fill="none" stroke="${detalhe}" stroke-width="1.6"/>${base}`,
      n: `<path d="M66 81 H30 C29 70 35 62 45 56 C40 54 34 56 30 59 C26 61 21 58 23 53 C27 45 34 37 40 31 C40 25 44 19 50 17 L53 10 L57 18 C68 23 73 38 73 54 C73 66 70 74 66 81 Z"/><path d="M55 16 L59 9 L60 17 L64 12 L64 20 L68 17 L67 26" fill="none" stroke="${linha}" stroke-width="2.4" stroke-linejoin="round"/><circle cx="47" cy="29" r="2.6" fill="${detalhe}" stroke="none"/><path d="M58 30 Q65 40 64 52" fill="none" stroke="${detalhe}" stroke-width="2.2"/>${base}`,
      b: `<path d="M50 3 Q67 22 62 53 H38 Q33 22 50 3 Z"/><path d="M45 46 V33 Q45 27 50 22 Q55 27 55 33 V46 Z" fill="${detalhe}" stroke="none" opacity=".85"/><path d="M36 53 H64 L60 61 H40 Z"/><path d="M40 61 C42 71 36 78 30 81 H70 C64 78 58 71 60 61 Z"/>${base}`,
      q: `<path d="M28 55 V35 L32 23 L36 35 V41 H42 V29 L46 17 L50 5 L54 17 L58 29 V41 H64 V35 L68 23 L72 35 V55 Z"/><circle cx="50" cy="45" r="5" fill="none" stroke="${detalhe}" stroke-width="2"/><path d="M31 55 H69 L73 81 H27 Z"/>${lanceta(40, 64, 3.5, 17)}${lanceta(60, 64, 3.5, 17)}${base}`,
      k: `<path d="M48 1 H52 V7 H57 V11 H52 V15 H48 V11 H43 V7 H48 Z"/><path d="M42 40 L50 15 L58 40 Z"/><path d="M33 56 V42 L37 33 L41 42 V40 H59 V42 L63 33 L67 42 V56 Z"/><path d="M33 56 H67 L72 81 H28 Z"/>${lanceta(50, 66, 5, 15)}${base}`,
    };
  }
  if (estilo === 'sagrada') {
    const cores = ['#e0412f', '#f2c230', '#3aa35a', '#2f6fd0'];
    const bola = (x, y, r, i) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${cores[i % 4]}" stroke="${linha}" stroke-width="1.6"/><circle cx="${x - r * 0.35}" cy="${y - r * 0.35}" r="${r * 0.32}" fill="${cores[(i + 1) % 4]}" stroke="none"/><circle cx="${x + r * 0.4}" cy="${y + r * 0.3}" r="${r * 0.28}" fill="${cores[(i + 2) % 4]}" stroke="none"/>`;
    const furos = (x, ys) => ys.map((y) => `<ellipse cx="${x}" cy="${y}" rx="2.2" ry="3.6" fill="${detalhe}" stroke="none"/>`).join('');
    const base = '<path d="M21 92 C23 84 32 81 50 81 C68 81 77 84 79 92 Z"/>';
    return {
      p: `<path d="M40 81 C40 66 45 45 50 35 C55 45 60 66 60 81 Z"/>${furos(50, [58, 70])}${bola(50, 29, 7, 0)}${base}`,
      r: `<path d="M27 81 C27 60 31 38 35 26 C39 38 43 60 43 81 Z"/><path d="M57 81 C57 60 61 38 65 26 C69 38 73 60 73 81 Z"/><path d="M31 81 V64 H69 V81 Z"/>${furos(35, [46, 58])}${furos(65, [46, 58])}${bola(35, 21, 6, 1)}${bola(65, 21, 6, 3)}${base}`,
      n: `<path d="M66 81 H30 C29 70 35 62 45 56 C40 54 34 56 30 59 C26 61 21 58 23 53 C27 45 34 37 40 31 C40 25 44 19 50 17 L53 10 L57 18 C68 23 73 38 73 54 C73 66 70 74 66 81 Z"/><circle cx="47" cy="29" r="2.6" fill="${detalhe}" stroke="none"/><circle cx="60" cy="24" r="3" fill="${cores[0]}" stroke="none"/><circle cx="64" cy="32" r="3" fill="${cores[1]}" stroke="none"/><circle cx="66" cy="41" r="3" fill="${cores[2]}" stroke="none"/><circle cx="66" cy="50" r="3" fill="${cores[3]}" stroke="none"/>${base}`,
      b: `<path d="M37 81 C37 56 44 24 50 11 C56 24 63 56 63 81 Z"/><path d="M45 72 C53 68 57 62 53 56 C49 50 55 44 56 38" fill="none" stroke="${detalhe}" stroke-width="2.4" stroke-linecap="round"/><path d="M50 1 L55 7 L50 13 L45 7 Z" fill="${cores[3]}" stroke="${linha}" stroke-width="1.6"/>${base}`,
      q: `<path d="M28 81 C28 64 31 46 35 37 C39 46 42 64 42 81 Z"/><path d="M58 81 C58 64 61 46 65 37 C69 46 72 64 72 81 Z"/><path d="M41 81 C41 56 45 28 50 16 C55 28 59 56 59 81 Z"/>${furos(50, [44, 56, 68])}${bola(35, 32, 5, 2)}${bola(65, 32, 5, 0)}${bola(50, 10, 6, 1)}${base}`,
      k: `<path d="M38 81 C38 56 44 32 50 21 C56 32 62 56 62 81 Z"/>${furos(50, [46, 58, 70])}<path d="M50 5 V21 M42 12 H58" fill="none" stroke="${linha}" stroke-width="4" stroke-linecap="round"/>${bola(50, 5, 3.6, 0)}${bola(42, 12, 3.6, 1)}${bola(58, 12, 3.6, 2)}${base}`,
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
  return `<svg class="xadrez-peca-svg conjunto-${nomeDoConjunto} lado-${branca ? 'claro' : 'escuro'}" viewBox="0 0 100 100" aria-hidden="true"><g fill="${cores.corpo}" stroke="${cores.linha}" stroke-width="3" stroke-linejoin="round">${formas[peca.toLowerCase()]}</g>${estilo.reflexo ? `<g fill="url(#xz-reflexo)" stroke="none" pointer-events="none">${formas[peca.toLowerCase()].replace(/<path d="M50 10 C56[^>]*>|<path d="M50 17 C53[^>]*>/g, '')}</g>` : ''}${estilo.brilho ? '<path class="xadrez-brilho" d="M40 20 l3 6 l6 3 l-6 3 l-3 6 l-3 -6 l-6 -3 l6 -3 z" fill="#ffffff" opacity=".85"/>' : ''}</svg>`;
}


function tocarRachadura() {
  try {
    const Classe = window.AudioContext || window.webkitAudioContext;
    if (!Classe) return;
    if (typeof contextoDeSomDosJogos !== 'undefined' && contextoDeSomDosJogos) contextoDaBatidaDePeca = contextoDeSomDosJogos;
    if (!contextoDaBatidaDePeca) contextoDaBatidaDePeca = new Classe();
    const ctx = contextoDaBatidaDePeca;
    if (typeof somDosJogosLigado === 'function' && !somDosJogosLigado()) return;
    const agora = ctx.currentTime + 0.05;
    [0, 0.07, 0.15, 0.2].forEach((atraso, i) => {
      const tamanho = Math.floor(ctx.sampleRate * 0.05);
      const buffer = ctx.createBuffer(1, tamanho, ctx.sampleRate);
      const dados = buffer.getChannelData(0);
      for (let k = 0; k < tamanho; k += 1) dados[k] = (Math.random() * 2 - 1) * Math.pow(1 - k / tamanho, 5);
      const fonte = ctx.createBufferSource();
      fonte.buffer = buffer;
      const filtro = ctx.createBiquadFilter();
      filtro.type = 'highpass';
      filtro.frequency.value = 1800 + i * 700;
      const ganho = ctx.createGain();
      ganho.gain.value = 0.5 - i * 0.08;
      fonte.connect(filtro); filtro.connect(ganho); ganho.connect(ctx.destination);
      fonte.start(agora + atraso);
    });
  } catch (e) {
  }
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
        <button type="button" class="xadrez-modo" data-modo="lumina"><span class="xadrez-modo-arte">${xadrezPecaSvg('q')}</span><strong>${textoDoJogo('Contra a Lumina')}</strong></button>
        <button type="button" class="xadrez-modo" data-modo="dois"><span class="xadrez-modo-arte">${xadrezPecaSvg('N')}${xadrezPecaSvg('n')}</span><strong>${textoDoJogo('Duas pessoas')}</strong></button>
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
    falarNoJogo(textoDoJogo('Escolha o nível.'));
    area.innerHTML = `
      <div class="xadrez-modos">
        ${htmlDosNiveisDosTabuleiros()}
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
      return `<button type="button" class="${classes.join(' ')}" data-casa="${i}" aria-label="${rotulo}">${coluna}${linhaDeBaixo}${p ? `<span class="xadrez-peca${partida.ultima && partida.ultima.para === i ? ' chegou' : ''}${i === rei ? ' soltando' : ''}">${i === rei ? [1, 2, 3, 4].map((n) => `<span class="lasca lasca-${n}">${xadrezPecaSvg(p)}</span>`).join('') : xadrezPecaSvg(p)}</span>` : ''}</button>`;
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
    if (sit.xeque) { falarNoJogo(textoDoJogo('Xeque!'), partida.modo === 'lumina' && novo.vez === 'w' ? 'feliz' : 'ops'); tocarRachadura(); }
    else if (partida.modo === 'dois') falarNoJogo(textoDoJogo('Vez das {cor}.', { cor: textoDoJogo(novo.vez === 'w' ? 'brancas' : 'pretas') }));
    else if (novo.vez === 'w') falarNoJogo(textoDoJogo(m.captura ? 'Peguei uma peça! Sua vez.' : 'Sua vez.'));
    if (partida.modo === 'lumina' && novo.vez === 'b') vezDaLumina();
  };

  const vezDaLumina = () => {
    partida.pensando = true;
    falarNoJogo(textoDoJogo(partida.nivel >= 4 ? 'A Lumina está pensando bem fundo...' : 'A Lumina está pensando...'));
    desenhar();
    const estado = partida.est;
    const jogoDaVez = jogoAtual;
    const inicio = Date.now();
    const concluir = (m) => {
      if (!jogoAtual || jogoAtual !== jogoDaVez || jogoAtual.fim || partida.est !== estado) return;
      agendarNoJogo(() => {
        if (!jogoAtual || jogoAtual !== jogoDaVez || jogoAtual.fim || partida.est !== estado) return;
        partida.pensando = false;
        if (m) jogar(m);
      }, Math.max(0, 450 - (Date.now() - inicio)));
    };
    const config = CONFIG_DOS_MOTORES[partida.nivel];
    if (!config) { agendarNoJogo(() => concluir(xadrezMelhorJogada(estado, partida.nivel)), 40); return; }
    pedirAoMotor('motor-xadrez.js', { tab: estado.tab, vez: estado.vez, roque: estado.roque, ep: estado.ep, meio: estado.meio, tempo: config.tempo, profundidade: config.profundidade, ruido: config.ruido || (estado.jogada <= 6 ? 10 : 0), anteriores: Object.keys(estado.posicoes || {}) }).then((r) => {
      const legais = xadrezLegais(estado);
      let m = r ? legais.find((x) => x.de === r.de && x.para === r.para && (!r.promocao || (x.promocao || '').toLowerCase() === r.promocao)) : null;
      if (!m) m = xadrezMelhorJogada(estado, 2);
      concluir(m);
    });
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
