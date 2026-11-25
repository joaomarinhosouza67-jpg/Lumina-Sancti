const DAMAS_DIRECOES = [[-1, -1], [-1, 1], [1, -1], [1, 1]];

function damasInicial() {
  const tab = Array(64).fill('');
  for (let i = 0; i < 64; i += 1) {
    const l = Math.floor(i / 8); const c = i % 8;
    if ((l + c) % 2 !== 1) continue;
    if (l <= 2) tab[i] = 'b';
    else if (l >= 5) tab[i] = 'w';
  }
  return { tab, vez: 'w', semCaptura: 0 };
}

function damasCor(p) { return p ? p.toLowerCase() : ''; }
function damasEhDama(p) { return !!p && p === p.toUpperCase(); }

function damasCapturas(tab, de, peca, cor) {
  const resultados = [];
  const dama = damasEhDama(peca);
  const inimiga = cor === 'w' ? 'b' : 'w';
  const buscar = (casa, capturadas, caminho, viuUltima) => {
    let achou = false;
    const l = Math.floor(casa / 8); const c = casa % 8;
    for (const [dl, dc] of DAMAS_DIRECOES) {
      if (dama) {
        let x = l + dl; let y = c + dc;
        while (x >= 0 && x < 8 && y >= 0 && y < 8 && (!tab[x * 8 + y] || x * 8 + y === de)) { x += dl; y += dc; }
        if (!(x >= 0 && x < 8 && y >= 0 && y < 8)) continue;
        const alvo = x * 8 + y;
        if (damasCor(tab[alvo]) !== inimiga || capturadas.includes(alvo)) continue;
        x += dl; y += dc;
        while (x >= 0 && x < 8 && y >= 0 && y < 8 && (!tab[x * 8 + y] || x * 8 + y === de)) {
          const pouso = x * 8 + y;
          achou = true;
          buscar(pouso, capturadas.concat(alvo), caminho.concat(pouso), true);
          x += dl; y += dc;
        }
      } else {
        const x = l + dl; const y = c + dc; const x2 = l + 2 * dl; const y2 = c + 2 * dc;
        if (x2 < 0 || x2 > 7 || y2 < 0 || y2 > 7) continue;
        const alvo = x * 8 + y; const pouso = x2 * 8 + y2;
        if (damasCor(tab[alvo]) !== inimiga || capturadas.includes(alvo)) continue;
        if (tab[pouso] && pouso !== de) continue;
        achou = true;
        buscar(pouso, capturadas.concat(alvo), caminho.concat(pouso), true);
      }
    }
    if (!achou && viuUltima) resultados.push({ de, para: casa, caminho, capturadas });
  };
  buscar(de, [], [], false);
  return resultados;
}

function damasJogadas(est) {
  const { tab, vez } = est;
  const livre = !!est.capturaLivre;
  let capturas = [];
  const simples = [];
  for (let i = 0; i < 64; i += 1) {
    const p = tab[i];
    if (damasCor(p) !== vez) continue;
    capturas = capturas.concat(damasCapturas(tab, i, p, vez));
    if (capturas.length && !livre) continue;
    const l = Math.floor(i / 8); const c = i % 8;
    if (damasEhDama(p)) {
      for (const [dl, dc] of DAMAS_DIRECOES) {
        let x = l + dl; let y = c + dc;
        while (x >= 0 && x < 8 && y >= 0 && y < 8 && !tab[x * 8 + y]) { simples.push({ de: i, para: x * 8 + y, caminho: [x * 8 + y], capturadas: [] }); x += dl; y += dc; }
      }
    } else {
      const dl = vez === 'w' ? -1 : 1;
      for (const dc of [-1, 1]) {
        const x = l + dl; const y = c + dc;
        if (x >= 0 && x < 8 && y >= 0 && y < 8 && !tab[x * 8 + y]) simples.push({ de: i, para: x * 8 + y, caminho: [x * 8 + y], capturadas: [] });
      }
    }
  }
  if (capturas.length && livre) return capturas.concat(simples);
  if (capturas.length) {
    const maior = Math.max(...capturas.map((m) => m.capturadas.length));
    return capturas.filter((m) => m.capturadas.length === maior);
  }
  return simples;
}

function damasAplicar(est, m) {
  const tab = est.tab.slice();
  let p = tab[m.de];
  tab[m.de] = '';
  m.capturadas.forEach((c) => { tab[c] = ''; });
  const linha = Math.floor(m.para / 8);
  if (!damasEhDama(p) && ((p === 'w' && linha === 0) || (p === 'b' && linha === 7))) p = p.toUpperCase();
  tab[m.para] = p;
  const virouDama = p !== est.tab[m.de];
  return { tab, vez: est.vez === 'w' ? 'b' : 'w', semCaptura: m.capturadas.length || !damasEhDama(est.tab[m.de]) || virouDama ? 0 : est.semCaptura + 1, capturaLivre: !!est.capturaLivre };
}

function damasAvaliar(est) {
  let total = 0;
  for (let i = 0; i < 64; i += 1) {
    const p = est.tab[i];
    if (!p) continue;
    const l = Math.floor(i / 8); const c = i % 8;
    const cor = damasCor(p);
    let v = damasEhDama(p) ? 330 : 100 + (cor === 'w' ? 7 - l : l) * 4;
    if (c >= 2 && c <= 5 && l >= 2 && l <= 5) v += 6;
    if (!damasEhDama(p) && ((cor === 'w' && l === 7) || (cor === 'b' && l === 0))) v += 8;
    total += cor === 'w' ? v : -v;
  }
  return est.vez === 'w' ? total : -total;
}

function damasBuscar(est, prof, alfa, beta, contador, distancia) {
  contador.nos += 1;
  if ((contador.nos & 511) === 0 && Date.now() > contador.fim) contador.parou = true;
  if (contador.parou) return 0;
  const jogadas = damasJogadas(est);
  if (!jogadas.length) return -100000 + distancia;
  if (est.semCaptura >= 40) return 0;
  if (prof <= 0 && !jogadas[0].capturadas.length) return damasAvaliar(est);
  if (prof <= -4) return damasAvaliar(est);
  for (const m of jogadas) {
    const v = -damasBuscar(damasAplicar(est, m), prof - 1, -beta, -alfa, contador, distancia + 1);
    if (contador.parou) return 0;
    if (v >= beta) return beta;
    if (v > alfa) alfa = v;
  }
  return alfa;
}

const DAMAS_NIVEIS = [{ prof: 2, ruido: 120, tempo: 250 }, { prof: 4, ruido: 25, tempo: 700 }, { prof: 9, ruido: 0, tempo: 1400 }];

function damasMelhorJogada(est, nivel) {
  const config = DAMAS_NIVEIS[nivel] || DAMAS_NIVEIS[1];
  let jogadas = damasJogadas(est);
  if (!jogadas.length) return null;
  if (jogadas.length === 1) return jogadas[0];
  const contador = { nos: 0, fim: Date.now() + config.tempo, parou: false };
  let melhor = jogadas[0];
  for (let prof = 1; prof <= config.prof; prof += 1) {
    let melhorDaVez = null; let valorDaVez = -Infinity; let alfa = -Infinity;
    for (const m of jogadas) {
      let v = -damasBuscar(damasAplicar(est, m), prof - 1, -Infinity, config.ruido ? Infinity : -alfa, contador, 1);
      if (contador.parou) break;
      if (config.ruido) v += (Math.random() - 0.5) * config.ruido;
      if (v > valorDaVez) { valorDaVez = v; melhorDaVez = m; }
      if (v > alfa) alfa = v;
    }
    if (contador.parou && prof > 1) break;
    if (melhorDaVez) melhor = melhorDaVez;
    if (valorDaVez > 90000) break;
    jogadas = [melhor].concat(jogadas.filter((m) => m !== melhor));
    if (contador.parou) break;
  }
  return melhor;
}

const CONJUNTOS_DAS_DAMAS = {
  classico: { b: { corpo: 'url(#dm-branca)', lado: '#a8823a', borda: '#8f6d2c', anel: 'rgba(168, 130, 58, 0.55)', luz: 0.55 }, p: { corpo: 'url(#dm-preta)', lado: '#0e0a1a', borda: '#07050e', anel: 'rgba(150, 128, 210, 0.45)', luz: 0.18 } },
  madeira: { b: { corpo: 'url(#dm-madeira-clara)', lado: '#8a5a26', borda: '#6e4318', anel: 'rgba(110, 67, 24, 0.5)', luz: 0.35 }, p: { corpo: 'url(#dm-madeira-escura)', lado: '#1e1006', borda: '#120903', anel: 'rgba(232, 199, 154, 0.35)', luz: 0.15 } },
  medalha: { cruz: true, b: { corpo: 'url(#dm-ouro-claro)', lado: '#8a5f0e', borda: '#6b4a0a', anel: 'rgba(107, 74, 10, 0.6)', luz: 0.5, cruz: '#7a520f' }, p: { corpo: 'url(#dm-bronze)', lado: '#3e1d08', borda: '#2a1205', anel: 'rgba(255, 220, 180, 0.4)', luz: 0.25, cruz: '#3e1d08' } },
  'ouro-prata': { b: { corpo: 'url(#dm-ouro-claro)', lado: '#8a5f0e', borda: '#6b4a0a', anel: 'rgba(107, 74, 10, 0.55)', luz: 0.5 }, p: { corpo: 'url(#dm-prata)', lado: '#262d36', borda: '#161b21', anel: 'rgba(240, 244, 248, 0.45)', luz: 0.3 } },
  diamante: { formas: 'facetada', brilho: true, b: { corpo: 'url(#dm-diamante)', lado: '#4f86c4', borda: '#3f6ea8', anel: 'rgba(63, 110, 168, 0.5)', luz: 0.7 }, p: { corpo: 'url(#dm-onix)', lado: '#000000', borda: '#000000', anel: 'rgba(143, 208, 255, 0.45)', luz: 0.3 } },
  vidro: { formas: 'moderna', b: { corpo: 'url(#dm-vidro-b)', lado: 'rgba(120, 160, 190, 0.55)', borda: '#7fa6c4', anel: 'rgba(255, 255, 255, 0.7)', luz: 0.75 }, p: { corpo: 'url(#dm-vidro-p)', lado: 'rgba(2, 3, 8, 0.85)', borda: '#020308', anel: 'rgba(159, 180, 201, 0.5)', luz: 0.4 } },
  cristal: { formas: 'facetada', b: { corpo: 'url(#dm-cristal-b)', lado: 'rgba(216, 236, 255, 0.35)', borda: 'rgba(216, 236, 255, 0.9)', anel: 'rgba(255, 255, 255, 0.75)', luz: 0.8 }, p: { corpo: 'url(#dm-cristal-p)', lado: 'rgba(0, 0, 0, 0.45)', borda: 'rgba(26, 32, 48, 0.95)', anel: 'rgba(216, 236, 255, 0.55)', luz: 0.45 } },
  esmeralda: { formas: 'facetada', b: { corpo: 'url(#dm-esmeralda-b)', lado: 'rgba(22, 112, 68, 0.75)', borda: '#1f7a4f', anel: 'rgba(255, 255, 255, 0.6)', luz: 0.72 }, p: { corpo: 'url(#dm-esmeralda-p)', lado: 'rgba(0, 8, 5, 0.92)', borda: '#000805', anel: 'rgba(143, 240, 191, 0.45)', luz: 0.35 } },
  safira: { formas: 'facetada', b: { corpo: 'url(#dm-safira-b)', lado: 'rgba(36, 77, 160, 0.75)', borda: '#2c5bb8', anel: 'rgba(255, 255, 255, 0.6)', luz: 0.72 }, p: { corpo: 'url(#dm-safira-p)', lado: 'rgba(0, 3, 15, 0.92)', borda: '#00030f', anel: 'rgba(169, 200, 255, 0.45)', luz: 0.35 } },
  ouro: { cruz: true, b: { corpo: 'url(#dm-ouro-b)', lado: 'rgba(138, 100, 16, 0.85)', borda: '#8a6410', anel: 'rgba(255, 248, 210, 0.7)', luz: 0.72, cruz: '#8a6410' }, p: { corpo: 'url(#dm-ouro-p)', lado: 'rgba(12, 6, 0, 0.92)', borda: '#0c0600', anel: 'rgba(255, 212, 107, 0.55)', luz: 0.35, cruz: '#ffd46b' } },
  ambar: { formas: 'moderna', b: { corpo: 'url(#dm-ambar-b)', lado: 'rgba(164, 96, 14, 0.8)', borda: '#a4600e', anel: 'rgba(255, 250, 234, 0.7)', luz: 0.72 }, p: { corpo: 'url(#dm-ambar-p)', lado: 'rgba(12, 4, 0, 0.92)', borda: '#0c0400', anel: 'rgba(255, 196, 107, 0.5)', luz: 0.35 } },
  rubi: { formas: 'facetada', b: { corpo: 'url(#dm-rubi-b)', lado: 'rgba(156, 21, 52, 0.75)', borda: '#b0173c', anel: 'rgba(255, 255, 255, 0.6)', luz: 0.72 }, p: { corpo: 'url(#dm-rubi-p)', lado: 'rgba(12, 0, 3, 0.92)', borda: '#0c0003', anel: 'rgba(255, 159, 181, 0.45)', luz: 0.35 } },
  ametista: { formas: 'facetada', b: { corpo: 'url(#dm-ametista-b)', lado: 'rgba(106, 50, 176, 0.75)', borda: '#7a3fc0', anel: 'rgba(255, 255, 255, 0.6)', luz: 0.72 }, p: { corpo: 'url(#dm-ametista-p)', lado: 'rgba(5, 0, 15, 0.92)', borda: '#05000f', anel: 'rgba(216, 178, 255, 0.45)', luz: 0.35 } },
  obsidiana: { formas: 'moderna', b: { corpo: 'url(#dm-perola)', lado: '#9a86b8', borda: '#9a86b8', anel: 'rgba(160, 140, 200, 0.5)', luz: 0.85 }, p: { corpo: 'url(#dm-obsidiana)', lado: 'rgba(0, 0, 0, 0.95)', borda: '#000000', anel: 'rgba(185, 163, 255, 0.5)', luz: 0.45 } },
  gotico: { formas: 'gotica', b: { corpo: 'url(#dm-gotico-b)', lado: '#7a6a50', borda: '#5a4a30', anel: '#3a5aa8', luz: 0.45 }, p: { corpo: 'url(#dm-gotico-p)', lado: '#000000', borda: '#000000', anel: '#e0b84a', luz: 0.2 } },
  sagrada: { formas: 'sagrada', b: { corpo: 'url(#dm-sagrada-b)', lado: '#8a5a2a', borda: '#6a4420', anel: 'rgba(106, 68, 32, 0.6)', luz: 0.45 }, p: { corpo: 'url(#dm-sagrada-p)', lado: '#0a0301', borda: '#0a0301', anel: 'rgba(242, 194, 48, 0.55)', luz: 0.2 } },
  celestial: { formas: 'facetada', brilho: true, b: { corpo: 'url(#dm-celestial-b)', lado: 'rgba(160, 122, 214, 0.7)', borda: '#a07ad6', anel: 'rgba(255, 255, 255, 0.75)', luz: 0.8 }, p: { corpo: 'url(#dm-celestial-p)', lado: 'rgba(6, 2, 24, 0.92)', borda: '#060218', anel: 'rgba(255, 233, 168, 0.55)', luz: 0.4 } },
};

function damasOctogono(cy, rx, ry) {
  const pontos = [];
  for (let i = 0; i < 8; i += 1) {
    const a = (Math.PI / 8) + (i * Math.PI) / 4;
    pontos.push(`${(50 + rx * Math.cos(a)).toFixed(1)} ${(cy + ry * Math.sin(a)).toFixed(1)}`);
  }
  return pontos;
}

function tocarCoroacao(atraso) {
  if (typeof somDosJogosLigado === 'function' && !somDosJogosLigado()) return;
  try {
    const Classe = window.AudioContext || window.webkitAudioContext;
    if (!Classe) return;
    if (typeof contextoDeSomDosJogos !== 'undefined' && !contextoDeSomDosJogos) contextoDeSomDosJogos = new Classe();
    const ctx = typeof contextoDeSomDosJogos !== 'undefined' && contextoDeSomDosJogos ? contextoDeSomDosJogos : new Classe();
    const agora = ctx.currentTime + (atraso || 0) / 1000;
    [784, 988, 1175, 1568].forEach((f, i) => {
      const o = ctx.createOscillator(); o.type = 'triangle'; o.frequency.value = f;
      const g = ctx.createGain(); const t = agora + i * 0.09;
      g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.18, t + 0.01); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.7);
      o.connect(g); g.connect(ctx.destination); o.start(t); o.stop(t + 0.75);
    });
  } catch (e) {
  }
}

function coroarNoTabuleiro(area, casa, atraso) {
  setTimeout(() => {
    const alvo = area && area.querySelector(`.xadrez-casa[data-casa="${casa}"]`);
    if (!alvo) return;
    const efeito = document.createElement('span');
    efeito.className = 'damas-coroacao';
    efeito.setAttribute('aria-hidden', 'true');
    efeito.innerHTML = '<svg viewBox="0 0 100 100" class="damas-coroa-desce"><path d="M20 72 L26 34 L42 52 L50 22 L58 52 L74 34 L80 72 Z" fill="url(#dm-ouro)" stroke="#7a560e" stroke-width="3" stroke-linejoin="round"/><circle cx="50" cy="56" r="5" fill="#e8455a"/><circle cx="26" cy="32" r="4" fill="url(#dm-ouro)"/><circle cx="50" cy="19" r="4.5" fill="url(#dm-ouro)"/><circle cx="74" cy="32" r="4" fill="url(#dm-ouro)"/></svg><span class="damas-coroacao-onda"></span>' + Array.from({ length: 10 }, (_, i) => `<i style="--a:${i * 36}deg"></i>`).join('');
    alvo.appendChild(efeito);
    tocarCoroacao(450);
    setTimeout(() => efeito.remove(), 1700);
  }, atraso || 0);
}

function damasPecaSvg(p, conjunto) {
  if (typeof garantirGradientesDoTabuleiro === 'function') garantirGradientesDoTabuleiro();
  const nome = conjunto || (typeof conjuntoDasDamas === 'function' ? conjuntoDasDamas() : 'classico');
  const estilo = CONJUNTOS_DAS_DAMAS[nome] || CONJUNTOS_DAS_DAMAS.classico;
  const branca = damasCor(p) === 'w';
  const c = branca ? estilo.b : estilo.p;
  const dama = damasEhDama(p);
  const coroa = dama ? `<path d="M32 58 L35 39 L44 48 L50 31 L56 48 L65 39 L68 58 Z" fill="url(#dm-ouro)" stroke="#7a560e" stroke-width="2" stroke-linejoin="round"/><circle cx="50" cy="47" r="3.2" fill="#e8455a" stroke="#7a1020" stroke-width="1"/><circle cx="35" cy="38" r="2.4" fill="url(#dm-ouro)"/><circle cx="50" cy="30" r="2.6" fill="url(#dm-ouro)"/><circle cx="65" cy="38" r="2.4" fill="url(#dm-ouro)"/>` : '';
  const cruz = !dama && estilo.cruz ? `<path d="M50 37 V63 M40 46 H60" stroke="${c.cruz}" stroke-width="4.5" stroke-linecap="round" fill="none"/>` : '';
  const faisca = estilo.brilho ? '<path class="xadrez-brilho" d="M64 30 l2.4 5 l5 2.4 l-5 2.4 l-2.4 5 l-2.4 -5 l-5 -2.4 l5 -2.4 z" fill="#ffffff" opacity=".9"/>' : '';
  let corpo;
  if (estilo.formas === 'facetada') {
    const fora = damasOctogono(50, 38, 33);
    const dentro = damasOctogono(50, 22, 19);
    const lados = damasOctogono(58, 38, 33);
    const linhas = fora.map((pt, i) => `M${pt} L${dentro[i]}`).join(' ');
    corpo = `<path d="M${lados.join(' L')} Z" fill="${c.lado}"/><path d="M${fora.join(' L')} Z" fill="${c.corpo}" stroke="${c.borda}" stroke-width="2.5" stroke-linejoin="round"/><path d="M${dentro.join(' L')} Z" fill="#ffffff" fill-opacity=".12" stroke="none"/><path d="M34 38 L44 34" stroke="#ffffff" stroke-opacity="${c.luz}" stroke-width="3" stroke-linecap="round"/>`;
  } else {
    corpo = `<ellipse cx="50" cy="58" rx="38" ry="33" fill="${c.lado}"/><ellipse cx="50" cy="50" rx="38" ry="33" fill="${c.corpo}" stroke="${c.borda}" stroke-width="2.5"/>`;
    if (estilo.formas === 'gotica') {
      const petalas = [];
      for (let i = 0; i < 8; i += 1) { const a = (i * Math.PI) / 4; petalas.push(`<circle cx="${(50 + 13 * Math.cos(a)).toFixed(1)}" cy="${(50 + 11 * Math.sin(a)).toFixed(1)}" r="4.6" fill="none" stroke="${c.anel}" stroke-width="1.6"/>`); }
      corpo += `<ellipse cx="50" cy="50" rx="29" ry="25" fill="none" stroke="${c.anel}" stroke-width="2.4"/>${petalas.join('')}<circle cx="50" cy="50" r="3.4" fill="${c.anel}"/>`;
    } else if (estilo.formas === 'sagrada') {
      const cores = ['#e0412f', '#f2c230', '#3aa35a', '#2f6fd0'];
      const pedras = [];
      for (let i = 0; i < 14; i += 1) { const a = (i * 2 * Math.PI) / 14; const cx = 50 + 27 * Math.cos(a); const cy = 50 + 23 * Math.sin(a); pedras.push(`<path d="M${(cx - 3.4).toFixed(1)} ${(cy - 1.5).toFixed(1)} L${(cx + 0.5).toFixed(1)} ${(cy - 3.6).toFixed(1)} L${(cx + 3.6).toFixed(1)} ${(cy + 0.6).toFixed(1)} L${(cx - 0.8).toFixed(1)} ${(cy + 3.4).toFixed(1)} Z" fill="${cores[i % 4]}"/>`); }
      corpo += `${pedras.join('')}<ellipse cx="50" cy="50" rx="17" ry="14" fill="none" stroke="${c.anel}" stroke-width="2"/>`;
    } else if (estilo.formas === 'moderna') {
      corpo += `<ellipse cx="50" cy="50" rx="24" ry="20" fill="none" stroke="${c.anel}" stroke-width="2"/>`;
    } else {
      corpo += `<ellipse cx="50" cy="50" rx="27" ry="23" fill="none" stroke="${c.anel}" stroke-width="3"/><ellipse cx="50" cy="50" rx="19" ry="16" fill="none" stroke="${c.anel}" stroke-width="1.5"/>`;
    }
    corpo += `<ellipse cx="40" cy="36" rx="12" ry="5" fill="#ffffff" opacity="${c.luz}"/>`;
  }
  return `<svg class="xadrez-peca-svg conjunto-${nome} lado-${branca ? 'claro' : 'escuro'}" viewBox="0 0 100 100" aria-hidden="true">${corpo}${cruz}${coroa}${faisca}</svg>`;
}

const CHAVE_DA_CAPTURA_DAS_DAMAS = 'lumina-sancti-damas-captura-obrigatoria';

function capturaObrigatoriaNasDamas() {
  try { return localStorage.getItem(CHAVE_DA_CAPTURA_DAS_DAMAS) === '1'; } catch (e) { return false; }
}

function jogoDeDamas(area) {
  const partida = { modo: null, nivel: 1, est: damasInicial(), historico: [], selecionada: -1, ultima: null, pensando: false, animar: null };
  const nomeDaVez = (vez) => (partida.modo === 'lumina' ? (vez === 'w' ? textoDoJogo('Você') : 'Lumina') : textoDoJogo(vez === 'w' ? 'Claras' : 'Escuras'));
  const contar = (cor) => partida.est.tab.filter((p) => damasCor(p) === cor).length;

  const escolherModo = () => {
    placarDoJogo('');
    falarNoJogo(textoDoJogo('Quer jogar contra a Lumina ou com outra pessoa?'));
    area.innerHTML = `
      <div class="xadrez-modos">
        <button type="button" class="xadrez-modo" data-modo="lumina"><span class="xadrez-modo-arte">${damasPecaSvg('W')}</span><strong>${textoDoJogo('Contra a Lumina')}</strong></button>
        <button type="button" class="xadrez-modo" data-modo="dois"><span class="xadrez-modo-arte">${damasPecaSvg('w')}${damasPecaSvg('b')}</span><strong>${textoDoJogo('Duas pessoas')}</strong></button>
      </div>
      <label class="damas-regra"><input type="checkbox" id="damas-obrigatoria"${capturaObrigatoriaNasDamas() ? ' checked' : ''}><span>${textoDoJogo('Comer é obrigatório (regra oficial)')}</span></label>
      <button type="button" class="xadrez-personalizar" id="damas-personalizar">${textoDoJogo('Personalizar peças e tabuleiro')}</button>`;
    const regra = area.querySelector('#damas-obrigatoria');
    if (regra) regra.addEventListener('change', () => { try { localStorage.setItem(CHAVE_DA_CAPTURA_DAS_DAMAS, regra.checked ? '1' : '0'); } catch (e) { } });
    const personalizar = area.querySelector('#damas-personalizar');
    if (personalizar) personalizar.addEventListener('click', () => { if (typeof abrirColecaoDeItens === 'function') abrirColecaoDeItens('damas', escolherModo); });
    area.querySelectorAll('.xadrez-modo').forEach((b) => b.addEventListener('click', () => {
      if (b.dataset.modo === 'dois') { partida.modo = 'dois'; comecar(); return; }
      falarNoJogo(textoDoJogo('Escolha o nível.'));
      area.innerHTML = `<div class="xadrez-modos">${htmlDosNiveisDosTabuleiros()}</div>`;
      area.querySelectorAll('.jogo-nivel').forEach((n) => n.addEventListener('click', () => { partida.modo = 'lumina'; partida.nivel = Number(n.dataset.nivel); jogoAtual.nivel = partida.nivel; comecar(); }));
    }));
  };

  const comecar = () => {
    partida.est = damasInicial(); partida.est.capturaLivre = !capturaObrigatoriaNasDamas(); partida.historico = []; partida.selecionada = -1; partida.ultima = null;
    desenhar();
    falarNoJogo(textoDoJogo(partida.modo === 'lumina' ? 'Boa partida! Você começa.' : 'As claras começam.'));
  };

  const desenhar = () => {
    const est = partida.est;
    const jogadas = damasJogadas(est);
    const obrigatoria = !est.capturaLivre && jogadas.length && jogadas[0].capturadas.length;
    const podemMexer = new Set(jogadas.map((m) => m.de));
    const destinos = partida.selecionada >= 0 ? jogadas.filter((m) => m.de === partida.selecionada) : [];
    const casas = est.tab.map((p, i) => {
      const escura = (Math.floor(i / 8) + (i % 8)) % 2 === 1;
      const destino = destinos.find((m) => m.para === i);
      const classes = ['xadrez-casa', escura ? 'escura' : 'clara'];
      if (i === partida.selecionada) classes.push('selecionada');
      if (partida.ultima && partida.ultima.includes(i)) classes.push('ultima');
      if (destino) classes.push('alvo');
      if (obrigatoria && podemMexer.has(i) && vezDoJogador()) classes.push('obrigatoria');
      return `<button type="button" class="${classes.join(' ')}" data-casa="${i}" aria-label="${xadrezNome(i)}${p ? `, ${textoDoJogo(damasEhDama(p) ? 'dama' : 'pedra')} ${textoDoJogo(damasCor(p) === 'w' ? 'clara' : 'escura')}` : ''}" ${escura ? '' : 'tabindex="-1"'}>${p ? `<span class="xadrez-peca${partida.ultima && partida.ultima[partida.ultima.length - 1] === i ? ' chegou' : ''}">${damasPecaSvg(p)}</span>` : ''}</button>`;
    }).join('');
    area.innerHTML = `
      <div class="xadrez">
        <div class="xadrez-lado ${est.vez === 'b' ? 'vez' : ''}${partida.pensando ? ' pensando' : ''}"><b>${nomeDaVez('b')}</b><span class="xadrez-pensando" aria-hidden="true"><i></i><i></i><i></i></span><span class="damas-conta">${damasPecaSvg('b')}${contar('b')}</span></div>
        <div class="xadrez-tabuleiro damas-tabuleiro ${typeof classesDoTabuleiro === 'function' ? classesDoTabuleiro() : ''}" role="grid" aria-label="${textoDoJogo('Tabuleiro de damas')}">${casas}</div>
        <div class="xadrez-lado ${est.vez === 'w' ? 'vez' : ''}"><b>${nomeDaVez('w')}</b><span class="damas-conta">${damasPecaSvg('w')}${contar('w')}</span></div>
        <div class="xadrez-acoes">
          <button type="button" class="jogo-botao jogo-botao-claro" id="damas-desfazer" ${partida.historico.length && !partida.pensando ? '' : 'disabled'}>${textoDoJogo('Desfazer')}</button>
          <button type="button" class="jogo-botao jogo-botao-claro" id="damas-novo">${textoDoJogo('Nova partida')}</button>
          <button type="button" class="jogo-botao jogo-botao-claro" id="damas-visual">${textoDoJogo('Personalizar')}</button>
        </div>
      </div>`;
    area.querySelectorAll('.xadrez-casa').forEach((b) => b.addEventListener('click', () => { if (typeof cliqueLogoDepoisDoArraste === 'function' && cliqueLogoDepoisDoArraste()) return; tocar(Number(b.dataset.casa)); }));
    if (typeof ligarArrasteNoTabuleiro === 'function') ligarArrasteNoTabuleiro(area.querySelector('.xadrez-tabuleiro'), {
      podeArrastar: (casa) => vezDoJogador() && !!jogoAtual && !jogoAtual.fim && damasCor(est.tab[casa]) === est.vez && jogadas.some((m) => m.de === casa),
      destinos: (casa) => jogadas.filter((m) => m.de === casa).map((m) => m.para),
      soltar: (de, para) => { partida.selecionada = de; tocar(para); },
      cancelar: () => desenhar(),
    });
    area.querySelector('#damas-desfazer').addEventListener('click', desfazer);
    area.querySelector('#damas-visual').addEventListener('click', () => { if (typeof abrirColecaoDeItens === 'function') abrirColecaoDeItens('damas', desenhar); });
    area.querySelector('#damas-novo').addEventListener('click', () => { if (!partida.historico.length || window.confirm(textoDoJogo('Começar uma nova partida?'))) escolherModo(); });
    if (partida.animar && typeof animarJogadaNoTabuleiro === 'function') {
      animarJogadaNoTabuleiro(area.querySelector('.xadrez-tabuleiro'), partida.animar.caminho, partida.animar.fantasmas);
      partida.animar = null;
    }
  };

  const vezDoJogador = () => !partida.pensando && !(partida.modo === 'lumina' && partida.est.vez === 'b');

  const tocar = (casa) => {
    if (!jogoAtual || jogoAtual.fim || !vezDoJogador()) return;
    const jogadas = damasJogadas(partida.est);
    if (partida.selecionada >= 0) {
      const m = jogadas.find((j) => j.de === partida.selecionada && j.para === casa);
      if (m) { jogar(m); return; }
    }
    const p = partida.est.tab[casa];
    if (damasCor(p) === partida.est.vez) {
      if (!jogadas.some((j) => j.de === casa)) {
        partida.selecionada = -1;
        falarNoJogo(textoDoJogo(!partida.est.capturaLivre && jogadas.length && jogadas[0].capturadas.length ? 'Capturar é obrigatório! Use a peça que brilha.' : 'Essa peça não tem para onde ir agora.'), 'ops');
      } else {
        partida.selecionada = partida.selecionada === casa ? -1 : casa;
        tocarNotaDoJogo(523);
      }
    } else {
      partida.selecionada = -1;
    }
    desenhar();
  };

  const jogar = (m) => {
    partida.historico.push({ est: partida.est, ultima: partida.ultima });
    const antes = partida.est;
    partida.est = damasAplicar(antes, m);
    partida.selecionada = -1;
    partida.ultima = [m.de].concat(m.caminho);
    partida.animar = { caminho: partida.ultima.slice(), fantasmas: m.capturadas.map((c, i) => ({ casa: c, svg: damasPecaSvg(antes.tab[c]), quando: 260 * i + 130 })) };
    if (typeof tocarBatidaDePeca === 'function') {
      for (let i = 0; i < Math.max(1, m.capturadas.length); i += 1) tocarBatidaDePeca(m.capturadas.length > 0, 0.24 + i * 0.26);
    } else tocarNotaDoJogo(m.capturadas.length ? 392 : 659);
    desenhar();
    const proximas = damasJogadas(partida.est);
    if (!proximas.length) { fimDaPartida(antes.vez); return; }
    if (partida.est.semCaptura >= 40) { terminarJogo(2, textoDoJogo('Empate: 20 lances seguidos só com damas, sem captura.')); return; }
    const virou = damasEhDama(partida.est.tab[m.para]) && !damasEhDama(antes.tab[m.de]);
    if (virou) { falarNoJogo(textoDoJogo('Virou dama!'), 'feliz'); coroarNoTabuleiro(area, m.para, 260 * Math.max(1, m.caminho.length)); }
    else if (m.capturadas.length > 1) falarNoJogo(textoDoJogo('Que captura!'), 'feliz');
    else if (partida.modo === 'dois') falarNoJogo(textoDoJogo('Vez das {cor}.', { cor: textoDoJogo(partida.est.vez === 'w' ? 'claras' : 'escuras') }));
    else if (partida.est.vez === 'w') falarNoJogo(textoDoJogo(!partida.est.capturaLivre && proximas[0].capturadas.length ? 'Você tem captura obrigatória!' : 'Sua vez.'));
    if (partida.modo === 'lumina' && partida.est.vez === 'b') vezDaLumina();
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
    const config = typeof CONFIG_DOS_MOTORES !== 'undefined' ? CONFIG_DOS_MOTORES[partida.nivel] : null;
    if (!config || typeof pedirAoMotor !== 'function') { agendarNoJogo(() => concluir(damasMelhorJogada(estado, Math.min(partida.nivel, 2))), 40); return; }
    const chave = (e) => e.tab.map((p) => p || '.').join('') + e.vez;
    const anteriores = (partida.historico || []).map((h) => (h && h.est ? chave(h.est) : null)).filter(Boolean);
    pedirAoMotor('motor-damas.js', { tab: estado.tab, vez: estado.vez, semCaptura: estado.semCaptura, capturaLivre: !!estado.capturaLivre, tempo: config.tempo, profundidade: config.profundidade ? config.profundidade + 3 : 0, ruido: config.ruido || (partida.historico.length <= 6 ? 10 : 0), anteriores }).then((r) => {
      const lista = damasJogadas(estado);
      let m = r ? lista.find((x) => x.de === r.de && x.para === r.para && x.capturadas.slice().sort((a, b) => a - b).join() === (r.capturadas || []).join()) : null;
      if (!m) m = damasMelhorJogada(estado, 2);
      concluir(m);
    });
  };

  const desfazer = () => {
    if (!partida.historico.length || partida.pensando) return;
    let volta = partida.historico.pop();
    if (partida.modo === 'lumina' && volta.est.vez === 'b' && partida.historico.length) volta = partida.historico.pop();
    partida.est = volta.est; partida.ultima = volta.ultima; partida.selecionada = -1;
    desenhar();
    falarNoJogo(textoDoJogo('Jogada desfeita.'));
  };

  const fimDaPartida = (vencedor) => {
    if (partida.modo === 'dois') { terminarJogo(3, textoDoJogo('Fim de jogo! As {cor} venceram.', { cor: textoDoJogo(vencedor === 'w' ? 'claras' : 'escuras') })); return; }
    if (vencedor === 'w') terminarJogo(3, textoDoJogo('Você venceu a Lumina nas damas!'));
    else terminarJogo(1, textoDoJogo('A Lumina venceu desta vez.'));
  };

  escolherModo();
  if (typeof carregarItensDoPerfil === 'function') carregarItensDoPerfil().then(() => { if (!jogoAtual || jogoAtual.fim || !area.isConnected) return; if (partida.modo) desenhar(); else if (area.querySelector('.xadrez-modos .xadrez-modo')) escolherModo(); }).catch(() => {});
}
