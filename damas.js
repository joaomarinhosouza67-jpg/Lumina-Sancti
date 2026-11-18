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
  let capturas = [];
  const simples = [];
  for (let i = 0; i < 64; i += 1) {
    const p = tab[i];
    if (damasCor(p) !== vez) continue;
    capturas = capturas.concat(damasCapturas(tab, i, p, vez));
    if (capturas.length) continue;
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
  return { tab, vez: est.vez === 'w' ? 'b' : 'w', semCaptura: m.capturadas.length || !damasEhDama(est.tab[m.de]) || virouDama ? 0 : est.semCaptura + 1 };
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

function damasPecaSvg(p) {
  const branca = damasCor(p) === 'w';
  const corpo = branca ? '#fff6e2' : '#2b2340';
  const borda = branca ? '#b08a3e' : '#0c0915';
  const anel = branca ? '#d8b56a' : '#6e5a9e';
  const coroa = damasEhDama(p) ? `<path d="M34 56 L37 40 L44 48 L50 34 L56 48 L63 40 L66 56 Z" fill="#f2c94c" stroke="#8a6414" stroke-width="2" stroke-linejoin="round"/>` : '';
  return `<svg class="xadrez-peca-svg" viewBox="0 0 100 100" aria-hidden="true"><ellipse cx="50" cy="56" rx="38" ry="34" fill="${borda}"/><ellipse cx="50" cy="50" rx="38" ry="34" fill="${corpo}" stroke="${borda}" stroke-width="3"/><ellipse cx="50" cy="50" rx="26" ry="23" fill="none" stroke="${anel}" stroke-width="3"/>${coroa}</svg>`;
}

function jogoDeDamas(area) {
  const partida = { modo: null, nivel: 1, est: damasInicial(), historico: [], selecionada: -1, ultima: null, pensando: false };
  const nomeDaVez = (vez) => (partida.modo === 'lumina' ? (vez === 'w' ? textoDoJogo('Você') : 'Lumina') : textoDoJogo(vez === 'w' ? 'Claras' : 'Escuras'));
  const contar = (cor) => partida.est.tab.filter((p) => damasCor(p) === cor).length;

  const escolherModo = () => {
    placarDoJogo('');
    falarNoJogo(textoDoJogo('Quer jogar contra a Lumina ou com outra pessoa?'));
    area.innerHTML = `
      <div class="xadrez-modos">
        <button type="button" class="xadrez-modo" data-modo="lumina"><span class="xadrez-modo-arte">${damasPecaSvg('W')}</span><strong>${textoDoJogo('Contra a Lumina')}</strong><small>${textoDoJogo('Você joga com as claras.')}</small></button>
        <button type="button" class="xadrez-modo" data-modo="dois"><span class="xadrez-modo-arte">${damasPecaSvg('w')}${damasPecaSvg('b')}</span><strong>${textoDoJogo('Duas pessoas')}</strong><small>${textoDoJogo('No mesmo aparelho, cada um na sua vez.')}</small></button>
      </div>`;
    area.querySelectorAll('.xadrez-modo').forEach((b) => b.addEventListener('click', () => {
      if (b.dataset.modo === 'dois') { partida.modo = 'dois'; comecar(); return; }
      falarNoJogo(textoDoJogo('Escolha o nível. Quanto mais difícil, mais a Lumina pensa.'));
      area.innerHTML = `<div class="xadrez-modos">${NIVEIS_DA_IA.map((n) => `<button type="button" class="jogo-nivel nivel-${n.id}" data-nivel="${n.id}"><span>${'<i></i>'.repeat(n.id + 1)}</span>${textoDoJogo(n.rotulo)}</button>`).join('')}</div>`;
      area.querySelectorAll('.jogo-nivel').forEach((n) => n.addEventListener('click', () => { partida.modo = 'lumina'; partida.nivel = Number(n.dataset.nivel); jogoAtual.nivel = partida.nivel; comecar(); }));
    }));
  };

  const comecar = () => {
    partida.est = damasInicial(); partida.historico = []; partida.selecionada = -1; partida.ultima = null;
    desenhar();
    falarNoJogo(textoDoJogo(partida.modo === 'lumina' ? 'Boa partida! Você começa.' : 'As claras começam.'));
  };

  const desenhar = () => {
    const est = partida.est;
    const jogadas = damasJogadas(est);
    const obrigatoria = jogadas.length && jogadas[0].capturadas.length;
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
        <div class="xadrez-lado ${est.vez === 'b' ? 'vez' : ''}"><b>${nomeDaVez('b')}</b><span>${contar('b')}</span></div>
        <div class="xadrez-tabuleiro damas-tabuleiro" role="grid" aria-label="${textoDoJogo('Tabuleiro de damas')}">${casas}</div>
        <div class="xadrez-lado ${est.vez === 'w' ? 'vez' : ''}"><b>${nomeDaVez('w')}</b><span>${contar('w')}</span></div>
        <div class="xadrez-acoes">
          <button type="button" class="jogo-botao jogo-botao-claro" id="damas-desfazer" ${partida.historico.length && !partida.pensando ? '' : 'disabled'}>${textoDoJogo('Desfazer')}</button>
          <button type="button" class="jogo-botao jogo-botao-claro" id="damas-novo">${textoDoJogo('Nova partida')}</button>
        </div>
      </div>`;
    area.querySelectorAll('.xadrez-casa').forEach((b) => b.addEventListener('click', () => tocar(Number(b.dataset.casa))));
    area.querySelector('#damas-desfazer').addEventListener('click', desfazer);
    area.querySelector('#damas-novo').addEventListener('click', () => { if (!partida.historico.length || window.confirm(textoDoJogo('Começar uma nova partida?'))) escolherModo(); });
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
        falarNoJogo(textoDoJogo(jogadas.length && jogadas[0].capturadas.length ? 'Capturar é obrigatório! Use a peça que brilha.' : 'Essa peça não tem para onde ir agora.'), 'ops');
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
    tocarNotaDoJogo(m.capturadas.length ? 392 : 659);
    desenhar();
    const proximas = damasJogadas(partida.est);
    if (!proximas.length) { fimDaPartida(antes.vez); return; }
    if (partida.est.semCaptura >= 40) { terminarJogo(2, textoDoJogo('Empate: 20 lances seguidos só com damas, sem captura.')); return; }
    const virou = damasEhDama(partida.est.tab[m.para]) && !damasEhDama(antes.tab[m.de]);
    if (virou) falarNoJogo(textoDoJogo('Virou dama!'), 'feliz');
    else if (m.capturadas.length > 1) falarNoJogo(textoDoJogo('Que captura!'), 'feliz');
    else if (partida.modo === 'dois') falarNoJogo(textoDoJogo('Vez das {cor}.', { cor: textoDoJogo(partida.est.vez === 'w' ? 'claras' : 'escuras') }));
    else if (partida.est.vez === 'w') falarNoJogo(textoDoJogo(proximas[0].capturadas.length ? 'Você tem captura obrigatória!' : 'Sua vez.'));
    if (partida.modo === 'lumina' && partida.est.vez === 'b') vezDaLumina();
  };

  const vezDaLumina = () => {
    partida.pensando = true;
    falarNoJogo(textoDoJogo('A Lumina está pensando...'));
    desenhar();
    agendarNoJogo(() => {
      if (!jogoAtual || jogoAtual.fim) return;
      const m = damasMelhorJogada(partida.est, partida.nivel);
      partida.pensando = false;
      if (m) jogar(m);
    }, 450);
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
}
