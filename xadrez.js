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

function xadrezPecaSvg(peca) {
  const branca = peca === peca.toUpperCase();
  const t = peca.toLowerCase();
  const corpo = branca ? '#fffaf0' : '#2b2340';
  const linha = branca ? '#2b1d0e' : '#0c0915';
  const detalhe = branca ? '#2b1d0e' : '#e9d6a8';
  const base = '<path d="M24 84 H76 A4 4 0 0 1 80 88 V92 H20 V88 A4 4 0 0 1 24 84 Z"/>';
  const formas = {
    p: `<circle cx="50" cy="31" r="12"/><ellipse cx="50" cy="47" rx="15" ry="4.5"/><path d="M39 50 C41 62 35 75 29 84 H71 C65 75 59 62 61 50 Z"/>${base}`,
    r: `<path d="M28 16 H38 V25 H45 V16 H55 V25 H62 V16 H72 V38 H28 Z"/><path d="M33 38 H67 L64 74 L70 84 H30 L36 74 Z"/><path d="M34 74 H66" fill="none" stroke="${detalhe}" stroke-width="2.5"/>${base}`,
    b: `<circle cx="50" cy="11" r="4.5"/><path d="M50 16 C64 27 66 43 58 53 H42 C34 43 36 27 50 16 Z"/><path d="M55 27 L46 39" fill="none" stroke="${detalhe}" stroke-width="3" stroke-linecap="round"/><ellipse cx="50" cy="56" rx="14" ry="4"/><path d="M40 59 C42 69 36 78 30 84 H70 C64 78 58 69 60 59 Z"/>${base}`,
    q: `<path d="M27 31 L34 56 H66 L73 31 L62 45 L60 23 L54 41 L50 18 L46 41 L40 23 L38 45 Z"/><circle cx="27" cy="29" r="4"/><circle cx="40" cy="21" r="4"/><circle cx="50" cy="15" r="4.5"/><circle cx="60" cy="21" r="4"/><circle cx="73" cy="29" r="4"/><path d="M32 56 H68 V61 H32 Z"/><path d="M35 61 C37 70 33 78 28 84 H72 C67 78 63 70 65 61 Z"/>${base}`,
    k: `<path d="M46.5 6 H53.5 V13 H60 V20 H53.5 V29 H46.5 V20 H40 V13 H46.5 Z"/><path d="M30 42 C29 32 40 28 50 35 C60 28 71 32 70 42 C69 49 64 54 64 54 H36 C36 54 31 49 30 42 Z"/><path d="M33 54 H67 V60 H33 Z"/><path d="M36 60 C38 70 33 78 28 84 H72 C67 78 62 70 64 60 Z"/>${base}`,
    n: `<path d="M66 84 H30 C29 73 35 64 45 58 C40 56 34 58 30 61 C26 63 21 60 23 55 C27 47 34 39 40 33 C40 27 44 21 50 19 L53 12 L57 20 C68 25 73 40 73 56 C73 68 70 76 66 84 Z"/><circle cx="47" cy="31" r="2.6" fill="${detalhe}" stroke="none"/><path d="M57 22 C63 30 66 40 66 50" fill="none" stroke="${detalhe}" stroke-width="2.5" stroke-linecap="round"/><path d="M27 56 L31 55" stroke="${detalhe}" stroke-width="2.5" stroke-linecap="round"/>${base}`,
  };
  return `<svg class="xadrez-peca-svg" viewBox="0 0 100 100" aria-hidden="true"><g fill="${corpo}" stroke="${linha}" stroke-width="3" stroke-linejoin="round">${formas[t]}</g></svg>`;
}

function xadrezDescreverPeca(peca) {
  return `${textoDoJogo(XADREZ_NOMES[peca.toLowerCase()])} ${textoDoJogo(peca === peca.toUpperCase() ? 'branco' : 'preto')}`;
}

function jogoDeXadrez(area) {
  const partida = { modo: null, nivel: 1, est: xadrezInicial(), historico: [], selecionada: -1, ultima: null, pensando: false, capturadas: { w: [], b: [] } };
  const nomeDaVez = (vez) => (partida.modo === 'lumina' ? (vez === 'w' ? textoDoJogo('Você') : 'Lumina') : textoDoJogo(vez === 'w' ? 'Brancas' : 'Pretas'));

  const escolherModo = () => {
    placarDoJogo('');
    falarNoJogo(textoDoJogo('Quer jogar contra a Lumina ou com outra pessoa?'));
    area.innerHTML = `
      <div class="xadrez-modos">
        <button type="button" class="xadrez-modo" data-modo="lumina"><span class="xadrez-modo-arte">${xadrezPecaSvg('q')}</span><strong>${textoDoJogo('Contra a Lumina')}</strong><small>${textoDoJogo('Você joga com as brancas.')}</small></button>
        <button type="button" class="xadrez-modo" data-modo="dois"><span class="xadrez-modo-arte">${xadrezPecaSvg('N')}${xadrezPecaSvg('n')}</span><strong>${textoDoJogo('Duas pessoas')}</strong><small>${textoDoJogo('No mesmo aparelho, cada um na sua vez.')}</small></button>
      </div>`;
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
    const tiras = (cor) => partida.capturadas[cor].slice().sort((a, b) => XADREZ_VALORES[b.toLowerCase()] - XADREZ_VALORES[a.toLowerCase()]).map((p) => `<span class="xadrez-capturada">${xadrezPecaSvg(p)}</span>`).join('');
    area.innerHTML = `
      <div class="xadrez">
        <div class="xadrez-lado ${est.vez === 'b' ? 'vez' : ''}"><b>${nomeDaVez('b')}</b><span class="xadrez-tira">${tiras('w')}</span></div>
        <div class="xadrez-tabuleiro" role="grid" aria-label="${textoDoJogo('Tabuleiro de xadrez')}">${casas}</div>
        <div class="xadrez-lado ${est.vez === 'w' ? 'vez' : ''}"><b>${nomeDaVez('w')}</b><span class="xadrez-tira">${tiras('b')}</span></div>
        <div class="xadrez-acoes">
          <button type="button" class="jogo-botao jogo-botao-claro" id="xadrez-desfazer" ${partida.historico.length && !partida.pensando ? '' : 'disabled'}>${textoDoJogo('Desfazer')}</button>
          <button type="button" class="jogo-botao jogo-botao-claro" id="xadrez-novo">${textoDoJogo('Nova partida')}</button>
        </div>
      </div>`;
    placarDoJogo(`${textoDoJogo('Jogada')} ${est.jogada}`);
    area.querySelectorAll('.xadrez-casa').forEach((b) => b.addEventListener('click', () => tocar(Number(b.dataset.casa))));
    area.querySelector('#xadrez-desfazer').addEventListener('click', desfazer);
    area.querySelector('#xadrez-novo').addEventListener('click', () => { if (!partida.historico.length || window.confirm(textoDoJogo('Começar uma nova partida?'))) escolherModo(); });
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
    tocarNotaDoJogo(m.captura ? 392 : 659);
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
}
