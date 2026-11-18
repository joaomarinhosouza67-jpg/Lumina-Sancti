const PALAVRAS_SECRETAS = [
  ['EUCARISTIA', 'O sacramento do Corpo e Sangue de Jesus'],
  ['ROSARIO', 'Oração com contas e mistérios'],
  ['ASSIS', 'Cidade de São Francisco'],
  ['BELEM', 'Cidade onde Jesus nasceu'],
  ['NAZARE', 'Cidade onde Jesus cresceu'],
  ['JERUSALEM', 'Cidade onde Jesus morreu e ressuscitou'],
  ['PENTECOSTES', 'Festa da vinda do Espírito Santo'],
  ['BATISMO', 'O primeiro sacramento'],
  ['CONFISSAO', 'O sacramento do perdão'],
  ['MAGNIFICAT', 'O cântico de Nossa Senhora'],
  ['ANUNCIACAO', 'Quando o anjo visitou Maria'],
  ['GABRIEL', 'O anjo que levou a notícia a Maria'],
  ['MIGUEL', 'O arcanjo que vence o dragão'],
  ['RAFAEL', 'O arcanjo que acompanhou Tobias'],
  ['PEDRO', 'O primeiro Papa'],
  ['PAULO', 'O apóstolo que escreveu muitas cartas'],
  ['TERESINHA', 'A santa do Pequeno Caminho'],
  ['AGOSTINHO', 'O santo que escreveu as Confissões'],
  ['FATIMA', 'Onde Nossa Senhora apareceu a três pastorinhos'],
  ['APARECIDA', 'A padroeira do Brasil'],
  ['GUADALUPE', 'Nossa Senhora que apareceu a Juan Diego'],
  ['QUARESMA', 'Os quarenta dias antes da Páscoa'],
  ['ADVENTO', 'O tempo de espera pelo Natal'],
  ['PASCOA', 'A festa da Ressurreição'],
  ['MANJEDOURA', 'Onde o Menino Jesus foi deitado'],
  ['CRISMA', 'O sacramento que confirma o Batismo'],
  ['ALELUIA', 'O louvor cantado na Páscoa'],
  ['CATECISMO', 'O livro que explica a fé da Igreja'],
  ['EVANGELHO', 'A Boa Notícia de Jesus'],
  ['MISERICORDIA', 'O amor de Deus que perdoa'],
  ['JOSE', 'O pai adotivo de Jesus'],
  ['EMAUS', 'Caminho onde Jesus explicou as Escrituras a dois discípulos'],
];
const VIDAS_DA_PALAVRA = 6;

function velaDaPalavra(vidas) {
  const altura = 22 + vidas * 9;
  const topo = 112 - altura;
  return `<svg class="palavra-vela" viewBox="0 0 80 124" aria-hidden="true">
    <ellipse cx="40" cy="116" rx="30" ry="6" fill="#b88a2e"/>
    <rect x="25" y="${topo}" width="30" height="${altura}" rx="6" fill="#fff6e2" stroke="#d8b36a" stroke-width="2"/>
    <path d="M25 ${topo + 10} C29 ${topo + 10} 29 ${topo + 18} 33 ${topo + 18} C37 ${topo + 18} 36 ${topo + 8} 40 ${topo + 8} C45 ${topo + 8} 44 ${topo + 15} 48 ${topo + 15} C52 ${topo + 15} 55 ${topo + 10} 55 ${topo + 10} V${topo + 6} C55 ${topo + 2} 52 ${topo} 49 ${topo} H31 C28 ${topo} 25 ${topo + 2} 25 ${topo + 6} Z" fill="#fffdf6"/>
    <path d="M40 ${topo} V${topo - 6}" stroke="#3a2a14" stroke-width="2.4" stroke-linecap="round"/>
    ${vidas > 0 ? `<g class="palavra-chama" style="transform-origin: 40px ${topo - 6}px"><path d="M40 ${topo - 30} C46 ${topo - 22} 50 ${topo - 17} 50 ${topo - 11} C50 ${topo - 5} 45 ${topo - 2} 40 ${topo - 2} C35 ${topo - 2} 30 ${topo - 5} 30 ${topo - 11} C30 ${topo - 17} 34 ${topo - 22} 40 ${topo - 30} Z" fill="#ffb02e"/><path d="M40 ${topo - 18} C43 ${topo - 14} 44 ${topo - 11} 44 ${topo - 8} C44 ${topo - 5} 42 ${topo - 3} 40 ${topo - 3} C38 ${topo - 3} 36 ${topo - 5} 36 ${topo - 8} C36 ${topo - 11} 37 ${topo - 14} 40 ${topo - 18} Z" fill="#fff6c2"/></g>` : `<path class="palavra-fumaca" d="M40 ${topo - 8} C36 ${topo - 16} 44 ${topo - 22} 40 ${topo - 32}" fill="none" stroke="#9aa3b5" stroke-width="2.4" stroke-linecap="round" opacity=".7"/>`}
  </svg>`;
}

function jogoDaPalavraSecreta(area) {
  const tamanho = { '8a12': [4, 8], '13a17': [5, 10], adultos: [6, 12] }[idadeDosJogos] || [4, 12];
  const lista = embaralharDoJogo(PALAVRAS_SECRETAS.filter(([p]) => p.length >= tamanho[0] && p.length <= tamanho[1])).slice(0, 3);
  let indice = 0;
  let acertadas = 0;
  const proxima = () => {
    if (indice >= lista.length) {
      terminarJogo(acertadas === lista.length ? estrelasPelosErros(jogoAtual.erros, [3, 8]) : acertadas ? 1 : 0, textoDoJogo('Você descobriu {n} de {total} palavras.', { n: acertadas, total: lista.length }));
      return;
    }
    const [palavra, dica] = lista[indice];
    const certas = new Set();
    const usadas = new Set();
    let vidas = VIDAS_DA_PALAVRA;
    placarDoJogo(`${indice + 1}/${lista.length}`);
    falarNoJogo(textoDoJogo(dica));
    const desenhar = () => {
      area.innerHTML = `
        <div class="palavra-secreta">
          <div class="palavra-topo">${velaDaPalavra(vidas)}<p class="palavra-dica"><b>${textoDoJogo('Dica')}:</b> ${textoDoJogo(dica)}</p></div>
          <div class="palavra-vagas" aria-label="${textoDoJogo('Palavra secreta')}">${[...palavra].map((l) => `<span class="palavra-vaga${certas.has(l) ? ' cheia' : ''}">${certas.has(l) ? l : ''}</span>`).join('')}</div>
          <div class="palavra-teclado">${'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map((l) => `<button type="button" class="palavra-tecla${usadas.has(l) ? (palavra.includes(l) ? ' certa' : ' errada') : ''}" data-letra="${l}" ${usadas.has(l) ? 'disabled' : ''}>${l}</button>`).join('')}</div>
        </div>`;
      area.querySelectorAll('.palavra-tecla').forEach((b) => b.addEventListener('click', () => chutar(b.dataset.letra)));
    };
    const chutar = (letra) => {
      if (!jogoAtual || jogoAtual.fim || usadas.has(letra) || vidas <= 0) return;
      usadas.add(letra);
      if (palavra.includes(letra)) {
        certas.add(letra);
        tocarNotaDoJogo(659);
        const completa = [...palavra].every((l) => certas.has(l));
        desenhar();
        if (completa) {
          acertadas += 1;
          acertouNoJogo(textoDoJogo('Isso! A palavra é {p}.', { p: palavra }), area.querySelector('.palavra-vagas'));
          indice += 1;
          agendarNoJogo(proxima, 1500);
        }
        return;
      }
      vidas -= 1;
      desenhar();
      if (vidas <= 0) {
        errouNoJogo(textoDoJogo('A vela apagou! A palavra era {p}.', { p: palavra }));
        palavra.split('').forEach((l) => certas.add(l));
        agendarNoJogo(() => { desenhar(); }, 300);
        indice += 1;
        agendarNoJogo(proxima, 2200);
      } else {
        errouNoJogo(textoDoJogo('Essa letra não tem. A vela diminuiu.'));
      }
    };
    desenhar();
  };
  proxima();
}

function vitralDoQuebraCabeca() {
  const cores = ['#2f6fd6', '#d63a4a', '#f2b632', '#3aa66b', '#8a4fd6', '#f07a2e', '#29a8c9', '#c94f9a'];
  let raios = '';
  for (let i = 0; i < 16; i += 1) {
    const a1 = (i / 16) * Math.PI * 2; const a2 = ((i + 1) / 16) * Math.PI * 2;
    const p = (a, r) => `${(150 + Math.cos(a) * r).toFixed(1)} ${(150 + Math.sin(a) * r).toFixed(1)}`;
    raios += `<path d="M${p(a1, 60)} L${p(a1, 230)} L${p(a2, 230)} L${p(a2, 60)} Z" fill="${cores[i % cores.length]}" stroke="#1a1430" stroke-width="5"/>`;
  }
  let aneis = '';
  for (let i = 0; i < 12; i += 1) {
    const a = (i / 12) * Math.PI * 2;
    aneis += `<circle cx="${(150 + Math.cos(a) * 95).toFixed(1)}" cy="${(150 + Math.sin(a) * 95).toFixed(1)}" r="13" fill="${cores[(i + 3) % cores.length]}" stroke="#1a1430" stroke-width="4"/>`;
  }
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300"><rect width="300" height="300" fill="#1a1430"/>${raios}${aneis}<circle cx="150" cy="150" r="62" fill="#ffe7a0" stroke="#1a1430" stroke-width="6"/><path d="M140 96 H160 V138 H198 V158 H160 V214 H140 V158 H102 V138 H140 Z" fill="#fff6e2" stroke="#b8862a" stroke-width="4"/><rect x="4" y="4" width="292" height="292" fill="none" stroke="#d4af37" stroke-width="8"/></svg>`;
  return `url('data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}')`;
}

function jogoDoQuebraCabeca(area) {
  const lado = { '8a12': 3, '13a17': 4, adultos: 4 }[idadeDosJogos] || 3;
  const total = lado * lado;
  const imagem = vitralDoQuebraCabeca();
  let pecas = [...Array(total).keys()];
  const vazia = () => pecas.indexOf(total - 1);
  const vizinhas = (pos) => {
    const l = Math.floor(pos / lado); const c = pos % lado;
    return [[l - 1, c], [l + 1, c], [l, c - 1], [l, c + 1]].filter(([a, b]) => a >= 0 && a < lado && b >= 0 && b < lado).map(([a, b]) => a * lado + b);
  };
  let anterior = -1;
  for (let i = 0; i < total * 30; i += 1) {
    const v = vazia();
    const opcoes = vizinhas(v).filter((p) => p !== anterior);
    const escolha = opcoes[Math.floor(Math.random() * opcoes.length)];
    [pecas[v], pecas[escolha]] = [pecas[escolha], pecas[v]];
    anterior = v;
  }
  if (pecas.every((p, i) => p === i)) [pecas[0], pecas[1]] = [pecas[1], pecas[0]];
  let movimentos = 0;
  falarNoJogo(textoDoJogo('Deslize as peças até montar o vitral.'));
  const desenhar = () => {
    placarDoJogo(`${movimentos}`);
    area.innerHTML = `
      <div class="quebra">
        <div class="quebra-tabuleiro" style="--lado:${lado}">${pecas.map((p, pos) => (p === total - 1 ? '<span class="quebra-vazia"></span>' : `<button type="button" class="quebra-peca${vizinhas(vazia()).includes(pos) ? ' pode' : ''}" data-pos="${pos}" aria-label="${textoDoJogo('Peça {n}', { n: p + 1 })}" style="background-image:${imagem};background-size:${lado * 100}% ${lado * 100}%;background-position:${((p % lado) / (lado - 1)) * 100}% ${(Math.floor(p / lado) / (lado - 1)) * 100}%"></button>`)).join('')}</div>
        <div class="quebra-modelo" style="background-image:${imagem}" aria-hidden="true"></div>
      </div>`;
    area.querySelectorAll('.quebra-peca').forEach((b) => b.addEventListener('click', () => mover(Number(b.dataset.pos))));
  };
  const mover = (pos) => {
    if (!jogoAtual || jogoAtual.fim) return;
    const v = vazia();
    if (!vizinhas(v).includes(pos)) { tocarNotaDoJogo(330); return; }
    [pecas[v], pecas[pos]] = [pecas[pos], pecas[v]];
    movimentos += 1;
    tocarNotaDoJogo(523 + (movimentos % 4) * 40);
    desenhar();
    if (pecas.every((p, i) => p === i)) {
      const limite = lado === 3 ? [40, 80] : [120, 220];
      terminarJogo(movimentos <= limite[0] ? 3 : movimentos <= limite[1] ? 2 : 1, textoDoJogo('Vitral montado em {n} movimentos!', { n: movimentos }));
    }
  };
  desenhar();
}
