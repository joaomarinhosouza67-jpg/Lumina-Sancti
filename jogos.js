const CHAVE_DOS_JOGOS = 'lumina-sancti-jogos';
const CHAVE_DA_TRILHA_DOS_PEQUENINOS = 'lumina-sancti-trilha-pequeninos';
const IDADES_DOS_JOGOS = [
  { id: 'pequeninos', rotulo: '3 a 5 anos' },
  { id: 'ate7', rotulo: '6 e 7 anos' },
  { id: '8a12', rotulo: '8 a 12 anos' },
  { id: '13a17', rotulo: '13 a 17 anos' },
  { id: 'adultos', rotulo: 'Adultos' },
];
const JOGOS = [
  { id: 'quizia', nome: 'Quiz dos Santos', texto: 'A Lumina cria perguntas sobre o santo que você quiser.', idades: ['13a17', 'adultos'], personagem: 'lumi', icone: 'lampada', cor: '#c9b8ff', comIa: true },
  { id: 'estrelas', nome: 'Acenda as estrelas', texto: 'Toque nas estrelinhas para encher o céu de luz.', idades: ['pequeninos', 'ate7'], personagem: 'lumi', icone: 'estrela', cor: '#f0cf7a' },
  { id: 'bolhas', nome: 'Bolhas de luz', texto: 'Estoure as bolhas antes que elas voem embora.', idades: ['pequeninos', 'ate7'], personagem: 'mel', icone: 'coracao', cor: '#8fd3ff' },
  { id: 'sombras', nome: 'Qual é a sombra?', texto: 'Ajude a Mel a achar a sombra certa de cada amigo.', idades: ['pequeninos', 'ate7'], personagem: 'mel', icone: 'pessoa', cor: '#c9b8ff' },
  { id: 'contar', nome: 'Vamos contar', texto: 'Conte as velinhas, as ovelhas e as estrelas.', idades: ['pequeninos', 'ate7'], personagem: 'clara', icone: 'vela', cor: '#ffb86b' },
  { id: 'ovelhas', nome: 'O Bom Pastor', texto: 'Leve as ovelhas para o curral, ache a perdida e espante o lobo.', idades: ['pequeninos', 'ate7', '8a12', '13a17', 'adultos'], personagem: 'mel', icone: 'igreja', cor: '#9be3a6', modos: true },
  { id: 'vitral', nome: 'Pinte o vitral', texto: 'Escolha as cores e deixe o vitral brilhando.', idades: ['pequeninos', 'ate7', '8a12'], personagem: 'clara', icone: 'paleta', cor: '#ff9db0' },
  { id: 'diferente', nome: 'Qual é o diferente?', texto: 'Encontre o amigo que não é igual aos outros.', idades: ['pequeninos', 'ate7'], personagem: 'dom', icone: 'lupa', cor: '#ffd36b' },
  { id: 'sinos', nome: 'Sinos que cantam', texto: 'Toque os sininhos e faça uma música.', idades: ['pequeninos', 'ate7'], personagem: 'dom', icone: 'som', cor: '#f6c76b' },
  { id: 'girar', nome: 'Gire as pecinhas', texto: 'Gire cada pedaço até o desenho ficar certinho.', idades: ['pequeninos', 'ate7', '8a12', '13a17'], personagem: 'lumi', icone: 'escanear', cor: '#9fd9ff' },
  { id: 'memoria', nome: 'Jogo da memória', texto: 'Vire as cartas e encontre os pares iguais.', idades: ['pequeninos', 'ate7', '8a12'], personagem: 'clara', icone: 'figurinha', cor: '#f0cf7a' },
  { id: 'simon', nome: 'Siga a luz', texto: 'Veja a ordem em que os amigos brilham e repita.', idades: ['ate7', '8a12', '13a17'], personagem: 'lumi', icone: 'lampada', cor: '#ffe28a' },
  { id: 'velha', nome: 'Jogo da velha da fé', texto: 'Cruz contra estrela. Ganhe da Lumi!', idades: ['ate7', '8a12', '13a17', 'adultos'], personagem: 'lumi', icone: 'cruz', cor: '#f0cf7a', contraIa: true },
  { id: 'simbolos', nome: 'Símbolos dos santos', texto: 'Descubra o que aparece nas imagens de cada santo.', idades: ['8a12', '13a17'], personagem: 'dom', icone: 'coroa', cor: '#ffcf87' },
  { id: 'historia', nome: 'Ordene a história', texto: 'Coloque a vida do santo na ordem certa.', idades: ['8a12', '13a17', 'adultos'], personagem: 'lumi', icone: 'livro', cor: '#cfe6ff' },
  { id: 'palavras', nome: 'Caça-palavras da fé', texto: 'Encontre as palavras escondidas no quadro.', idades: ['8a12', '13a17', 'adultos'], personagem: 'clara', icone: 'lupa', cor: '#d6c4ff' },
  { id: 'quemsou', nome: 'Quem sou eu?', texto: 'Leia a pista e descubra qual é o santo.', idades: ['8a12', '13a17', 'adultos'], personagem: 'dom', icone: 'pessoa', cor: '#ffd6a0' },
  { id: 'oracao', nome: 'Complete a oração', texto: 'Escolha a palavra que falta na oração.', idades: ['8a12', '13a17', 'adultos'], personagem: 'clara', icone: 'livro', cor: '#f7e3a1' },
  { id: 'anagrama', nome: 'Letras embaralhadas', texto: 'Monte a palavra da fé com as letras certas.', idades: ['8a12', '13a17', 'adultos'], personagem: 'dom', icone: 'lapis', cor: '#bfe3c6' },
  { id: 'quiz', nome: 'Desafio contra a Lumi', texto: 'Responda mais rápido e melhor que a Lumi.', idades: ['8a12', '13a17', 'adultos'], personagem: 'lumi', icone: 'trofeu', cor: '#ffd36b', contraIa: true },
  { id: 'duelo', nome: 'Memória contra a Lumi', texto: 'Cada um na sua vez. Quem achar mais pares vence.', idades: ['13a17', 'adultos'], personagem: 'lumi', icone: 'figurinha', cor: '#e8c6ff', contraIa: true },
];
const NIVEIS_DA_IA = [
  { id: 0, rotulo: 'Fácil' },
  { id: 1, rotulo: 'Médio' },
  { id: 2, rotulo: 'Difícil' },
];
const SIMBOLOS_DOS_SANTOS = [
  { santo: 'pedro-paulo-apostolos', nome: 'São Pedro', simbolo: 'As chaves do céu' },
  { santo: 'francisco-assis', nome: 'São Francisco de Assis', simbolo: 'Os passarinhos e os animais' },
  { santo: 'teresinha', nome: 'Santa Teresinha', simbolo: 'Um buquê de rosas' },
  { santo: 'miguel', nome: 'São Miguel Arcanjo', simbolo: 'Uma espada e uma balança' },
  { santo: 'jose', nome: 'São José', simbolo: 'As ferramentas de carpinteiro' },
  { santo: 'antonio-padua', nome: 'Santo Antônio', simbolo: 'O Menino Jesus nos braços' },
  { santo: 'santa-luzia', nome: 'Santa Luzia', simbolo: 'Uma lamparina acesa' },
  { santo: 'catarina-alexandria', nome: 'Santa Catarina de Alexandria', simbolo: 'Uma roda' },
];
const HISTORIAS_DOS_JOGOS = [
  { santo: 'francisco-assis', nome: 'São Francisco de Assis', passos: ['Nasceu em Assis, na Itália, filho de um rico comerciante.', 'Foi preso numa guerra, ficou doente e começou a mudar de vida.', 'Devolveu tudo ao pai e decidiu viver pobre, por amor a Jesus.', 'Fundou os frades franciscanos.', 'Morreu em 1226 e logo foi declarado santo.'] },
  { santo: 'teresinha', nome: 'Santa Teresinha', passos: ['Nasceu em Alençon, na França, em 1873.', 'Entrou no Carmelo com apenas 15 anos.', 'Escreveu a História de uma Alma, sobre o seu pequeno caminho.', 'Morreu em 1897, com 24 anos.', 'Em 1997 foi declarada doutora da Igreja.'] },
  { santo: 'carlo-acutis', nome: 'São Carlo Acutis', passos: ['Nasceu em 1991 e cresceu em Milão, na Itália.', 'Fez a Primeira Comunhão aos 7 anos e passou a ir à Missa todos os dias.', 'Montou uma exposição na internet sobre milagres eucarísticos.', 'Morreu em 2006, com 15 anos.', 'Foi canonizado em 2025.'] },
];
const PALAVRAS_DOS_JOGOS = ['JESUS', 'MARIA', 'CRUZ', 'ANJO', 'SANTO', 'IGREJA', 'BIBLIA', 'AMOR', 'PAZ', 'LUZ', 'TERCO', 'FE', 'CEU', 'GRACA', 'ALTAR', 'MISSA', 'CALICE', 'APOSTOLO', 'PROFETA', 'EVANGELHO', 'ORACAO', 'CARIDADE', 'ESPERANCA', 'PERDAO'];
const FIGURAS_DA_MEMORIA = ['cruz', 'coracao', 'estrela', 'pomba', 'vela', 'calice', 'igreja', 'coroa', 'terco', 'sino', 'livro', 'chave'];
const TIPOS_DA_TRILHA_DOS_PEQUENINOS = ['estrelas', 'sombras', 'contar', 'bolhas', 'memoria', 'ovelhas', 'vitral', 'diferente', 'sinos', 'girar'];
const NIVEIS_DA_TRILHA_DOS_PEQUENINOS = [0, 1, 2].flatMap((nivel) => TIPOS_DA_TRILHA_DOS_PEQUENINOS.map((jogo) => ({ jogo, nivel })));
const AMIGOS_DOS_JOGOS = ['lumi', 'mel', 'clara', 'dom'];

let idadeDosJogos = null;
let jogoAtual = null;
let contadorDePersonagens = 0;
let contextoDeSomDosJogos = null;

function textoDoJogo(texto, valores) {
  return typeof tr === 'function' ? tr(texto, valores) : String(texto).replace(/\{(\w+)\}/g, (_, chave) => (valores && valores[chave] !== undefined ? valores[chave] : ''));
}

function embaralharDoJogo(lista) {
  const copia = lista.slice();
  for (let i = copia.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
}

function sortearDoJogo(lista) {
  return lista[Math.floor(Math.random() * lista.length)];
}

function iconeDoJogo(nome) {
  return `<svg class="icone" viewBox="0 0 24 24" aria-hidden="true"><use href="#icone-${nome}"></use></svg>`;
}

function lerDoAparelho(chave) {
  try { return JSON.parse(localStorage.getItem(chave) || '{}') || {}; } catch (e) { return {}; }
}

function gravarNoAparelho(chave, valor) {
  try { localStorage.setItem(chave, JSON.stringify(valor)); } catch (e) {}
}

function recordesDosJogos() {
  return lerDoAparelho(CHAVE_DOS_JOGOS);
}

function guardarRecordeDoJogo(id, estrelas) {
  const recordes = recordesDosJogos();
  if ((recordes[id] || 0) >= estrelas) return;
  recordes[id] = estrelas;
  gravarNoAparelho(CHAVE_DOS_JOGOS, recordes);
}

function progressoDaTrilhaDosPequeninos() {
  return lerDoAparelho(CHAVE_DA_TRILHA_DOS_PEQUENINOS);
}

function agendarNoJogo(funcao, ms) {
  const id = setTimeout(funcao, ms);
  if (jogoAtual) jogoAtual.timers.push(id);
  return id;
}

function repetirNoJogo(funcao, ms) {
  const id = setInterval(funcao, ms);
  if (jogoAtual) jogoAtual.intervalos.push(id);
  return id;
}

function pararJogoAtual() {
  if (!jogoAtual) return;
  jogoAtual.timers.forEach(clearTimeout);
  jogoAtual.intervalos.forEach(clearInterval);
  (jogoAtual.limpezas || []).forEach((limpar) => limpar());
  jogoAtual.fim = true;
  jogoAtual = null;
}

function idDoPersonagem(prefixo) {
  contadorDePersonagens += 1;
  return `${prefixo}-${contadorDePersonagens}`;
}

function desenhoDaMel() {
  const la = idDoPersonagem('mel-la');
  const rosto = idDoPersonagem('mel-rosto');
  const cachos = [[60, 64, 33], [32, 60, 18], [88, 60, 18], [41, 40, 17], [79, 40, 17], [60, 31, 18], [33, 82, 17], [87, 82, 17], [60, 92, 19], [47, 92, 15], [73, 92, 15]];
  return `<svg class="personagem-svg" viewBox="0 0 120 132" aria-hidden="true">
    <defs><radialGradient id="${la}" cx="40%" cy="32%" r="70%"><stop offset="0" stop-color="#ffffff"/><stop offset=".7" stop-color="#fbf4e6"/><stop offset="1" stop-color="#e7d8bc"/></radialGradient><radialGradient id="${rosto}" cx="45%" cy="35%" r="70%"><stop offset="0" stop-color="#fde8d4"/><stop offset="1" stop-color="#e9c09b"/></radialGradient></defs>
    <ellipse class="personagem-sombra" cx="60" cy="125" rx="34" ry="5"/>
    <g class="personagem-corpo">
      <g fill="#6b5543">${[40, 51, 63, 74].map((x) => `<rect x="${x}" y="96" width="7" height="24" rx="3.5"/><rect x="${x - 0.5}" y="115" width="8" height="6" rx="2" fill="#3e2f22"/>`).join('')}</g>
      <circle class="mel-rabo" cx="18" cy="76" r="9" fill="url(#${la})" stroke="#e2d2b2" stroke-width="1.2"/>
      <g fill="url(#${la})" stroke="#e2d2b2" stroke-width="1.2">${cachos.map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}"/>`).join('')}</g>
      <g class="personagem-rosto">
        <g class="mel-orelha mel-orelha-esq"><ellipse cx="36" cy="64" rx="12" ry="5.6" fill="url(#${rosto})" transform="rotate(-24 36 64)"/><ellipse cx="37" cy="64" rx="7" ry="2.6" fill="#f6a8a0" opacity=".7" transform="rotate(-24 37 64)"/></g>
        <g class="mel-orelha mel-orelha-dir"><ellipse cx="84" cy="64" rx="12" ry="5.6" fill="url(#${rosto})" transform="rotate(24 84 64)"/><ellipse cx="83" cy="64" rx="7" ry="2.6" fill="#f6a8a0" opacity=".7" transform="rotate(24 83 64)"/></g>
        <ellipse cx="60" cy="69" rx="19" ry="21" fill="url(#${rosto})" stroke="#dcae86" stroke-width="1"/>
        <circle cx="60" cy="48" r="10" fill="url(#${la})"/><circle cx="51" cy="51" r="7" fill="url(#${la})"/><circle cx="69" cy="51" r="7" fill="url(#${la})"/>
        <g class="personagem-olhos"><ellipse cx="52.5" cy="67" rx="4" ry="5" fill="#241a10"/><ellipse cx="67.5" cy="67" rx="4" ry="5" fill="#241a10"/><circle cx="54" cy="65" r="1.6" fill="#fff"/><circle cx="69" cy="65" r="1.6" fill="#fff"/><circle cx="51.6" cy="69.2" r=".8" fill="#fff"/><circle cx="66.6" cy="69.2" r=".8" fill="#fff"/></g>
        <ellipse cx="47" cy="76" rx="4.2" ry="2.5" fill="#f4978e" opacity=".6"/><ellipse cx="73" cy="76" rx="4.2" ry="2.5" fill="#f4978e" opacity=".6"/>
        <path d="M57.6 75.5 Q60 77.4 62.4 75.5" fill="#c97b6c"/>
        <path d="M55.5 79 Q60 83.5 64.5 79" fill="none" stroke="#5a3b28" stroke-width="1.8" stroke-linecap="round"/>
      </g>
    </g>
  </svg>`;
}

function desenhoDaClara() {
  const cera = idDoPersonagem('clara-cera');
  const fogo = idDoPersonagem('clara-fogo');
  const brilho = idDoPersonagem('clara-brilho');
  const base = idDoPersonagem('clara-base');
  return `<svg class="personagem-svg" viewBox="0 0 120 140" aria-hidden="true">
    <defs>
      <linearGradient id="${cera}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#ead2a2"/><stop offset=".35" stop-color="#fffaf0"/><stop offset=".6" stop-color="#fff4dc"/><stop offset="1" stop-color="#dcc08c"/></linearGradient>
      <radialGradient id="${fogo}" cx="50%" cy="72%" r="62%"><stop offset="0" stop-color="#ffffff"/><stop offset=".28" stop-color="#fff3b0"/><stop offset=".62" stop-color="#ffc44d"/><stop offset="1" stop-color="#f07a12"/></radialGradient>
      <radialGradient id="${brilho}"><stop offset="0" stop-color="#ffe9a0" stop-opacity=".75"/><stop offset="1" stop-color="#ffd66b" stop-opacity="0"/></radialGradient>
      <linearGradient id="${base}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#a8741f"/><stop offset=".5" stop-color="#f6dc8a"/><stop offset="1" stop-color="#8a5a14"/></linearGradient>
    </defs>
    <ellipse class="personagem-sombra" cx="60" cy="134" rx="36" ry="5"/>
    <g class="personagem-corpo">
      <g class="clara-luz"><circle cx="60" cy="24" r="26" fill="url(#${brilho})"/></g>
      <g class="clara-chama"><path d="M60 3 C67 13 74 20 74 29 C74 38 67 44 60 44 C53 44 46 38 46 29 C46 20 53 13 60 3 Z" fill="url(#${fogo})"/><path d="M60 22 C63 27 65 30 65 34 C65 38 62.6 41 60 41 C57.4 41 55 38 55 34 C55 30 57 27 60 22 Z" fill="#cfe9ff" opacity=".55"/></g>
      <g class="clara-faiscas">${[[36, 18], [84, 14], [30, 38], [90, 36]].map(([x, y], i) => `<path style="--i:${i}" d="M${x} ${y - 5} L${x + 1.4} ${y - 1.4} L${x + 5} ${y} L${x + 1.4} ${y + 1.4} L${x} ${y + 5} L${x - 1.4} ${y + 1.4} L${x - 5} ${y} L${x - 1.4} ${y - 1.4} Z" fill="#ffe9a8"/>`).join('')}</g>
      <path d="M60 37 V46" stroke="#3a2a14" stroke-width="2.6" stroke-linecap="round"/>
      <path class="clara-braco clara-braco-esq" d="M36 90 Q26 92 22 84" fill="none" stroke="#e2c38c" stroke-width="5.5" stroke-linecap="round"/>
      <path class="clara-braco clara-braco-dir" d="M84 90 Q94 92 98 84" fill="none" stroke="#e2c38c" stroke-width="5.5" stroke-linecap="round"/>
      <rect x="34" y="46" width="52" height="80" rx="17" fill="url(#${cera})" stroke="#d8bb85" stroke-width="1.4"/>
      <path d="M34 60 C40 60 40 71 45 71 C50 71 50 58 56 58 C62 58 62 76 68 76 C74 76 74 60 80 60 C84 60 86 58 86 58 V52 C86 49 83 46 80 46 H40 C37 46 34 49 34 52 Z" fill="#fffdf6"/>
      <path d="M42 64 V112" stroke="#ffffff" stroke-width="4" stroke-linecap="round" opacity=".55"/>
      <g class="personagem-rosto">
        <g class="personagem-olhos"><ellipse cx="51" cy="86" rx="4" ry="5" fill="#241a10"/><ellipse cx="69" cy="86" rx="4" ry="5" fill="#241a10"/><circle cx="52.5" cy="84" r="1.6" fill="#fff"/><circle cx="70.5" cy="84" r="1.6" fill="#fff"/><circle cx="50.2" cy="88.2" r=".8" fill="#fff"/><circle cx="68.2" cy="88.2" r=".8" fill="#fff"/></g>
        <ellipse cx="45" cy="95" rx="4.2" ry="2.5" fill="#f4978e" opacity=".6"/><ellipse cx="75" cy="95" rx="4.2" ry="2.5" fill="#f4978e" opacity=".6"/>
        <path d="M54 98 Q60 104 66 98" fill="none" stroke="#5a3b28" stroke-width="2" stroke-linecap="round"/>
      </g>
      <ellipse cx="60" cy="127" rx="35" ry="7.5" fill="url(#${base})" stroke="#7a5212" stroke-width="1.2"/>
      <ellipse cx="60" cy="125" rx="27" ry="3" fill="#fff1c2" opacity=".45"/>
    </g>
  </svg>`;
}

function desenhoDoDom() {
  const bronze = idDoPersonagem('dom-bronze');
  const aro = idDoPersonagem('dom-aro');
  return `<svg class="personagem-svg" viewBox="0 0 120 134" aria-hidden="true">
    <defs>
      <linearGradient id="${bronze}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#8a5a14"/><stop offset=".28" stop-color="#e2b552"/><stop offset=".45" stop-color="#fff1c2"/><stop offset=".62" stop-color="#e2b552"/><stop offset="1" stop-color="#7a4f12"/></linearGradient>
      <linearGradient id="${aro}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f6dc8a"/><stop offset="1" stop-color="#9a6a1c"/></linearGradient>
    </defs>
    <ellipse class="personagem-sombra" cx="60" cy="128" rx="36" ry="5"/>
    <g class="personagem-corpo">
      <g class="dom-notas">${[[22, 34], [96, 28], [100, 56]].map(([x, y], i) => `<path style="--i:${i}" d="M${x} ${y} v-12 l8 -2 v12" fill="none" stroke="#f6dc8a" stroke-width="2"/><circle style="--i:${i}" cx="${x - 2}" cy="${y}" r="3" fill="#f6dc8a"/>`).join('')}</g>
      <g class="dom-balanco">
        <path d="M60 15 C50 4 39 8 43 17 C46 23 56 19 60 15 C64 19 74 23 77 17 C81 8 70 4 60 15 Z" fill="#c93a2c" stroke="#8e2a20" stroke-width="1.2"/>
        <circle cx="60" cy="15" r="3.6" fill="#e0574a"/>
        <circle class="personagem-badalo" cx="60" cy="113" r="8.5" fill="#8a5a14" stroke="#5e3d0d" stroke-width="1.5"/>
        <path d="M60 19 C38 19 30 41 30 63 L28 90 C28 97 22 100 16 104 L104 104 C98 100 92 97 92 90 L90 63 C90 41 82 19 60 19 Z" fill="url(#${bronze})" stroke="#7a4f12" stroke-width="1.5"/>
        <rect x="13" y="100" width="94" height="10" rx="5" fill="url(#${aro})" stroke="#7a4f12" stroke-width="1.2"/>
        <path d="M44 34 C47 27 52 24 57 23" fill="none" stroke="#ffffff" stroke-width="3.4" stroke-linecap="round" opacity=".7"/>
        <g class="personagem-rosto">
          <g class="personagem-olhos"><ellipse cx="51" cy="64" rx="4.2" ry="5.2" fill="#241a10"/><ellipse cx="69" cy="64" rx="4.2" ry="5.2" fill="#241a10"/><circle cx="52.6" cy="62" r="1.7" fill="#fff"/><circle cx="70.6" cy="62" r="1.7" fill="#fff"/><circle cx="50.2" cy="66.4" r=".8" fill="#fff"/><circle cx="68.2" cy="66.4" r=".8" fill="#fff"/></g>
          <ellipse cx="44.5" cy="73" rx="4.2" ry="2.5" fill="#f4978e" opacity=".6"/><ellipse cx="75.5" cy="73" rx="4.2" ry="2.5" fill="#f4978e" opacity=".6"/>
          <path d="M53 77 Q60 84 67 77" fill="none" stroke="#3a2608" stroke-width="2" stroke-linecap="round"/>
        </g>
      </g>
    </g>
  </svg>`;
}

const PERSONAGENS_DOS_JOGOS = {
  lumi: { nome: 'Lumi', desenho: () => (typeof desenhoDaLumi === 'function' ? desenhoDaLumi() : '') },
  mel: { nome: 'Mel', desenho: desenhoDaMel },
  clara: { nome: 'Clara', desenho: desenhoDaClara },
  dom: { nome: 'Dom', desenho: desenhoDoDom },
};

function htmlDoPersonagem(id, classeExtra) {
  const personagem = PERSONAGENS_DOS_JOGOS[id] || PERSONAGENS_DOS_JOGOS.lumi;
  if (id === 'lumi') return `<span class="lumi personagem personagem-lumi ${classeExtra || ''}" data-estado="parada" data-rosto="sorriso" data-bracos="baixo">${personagem.desenho()}</span>`;
  return `<span class="personagem personagem-${id} ${classeExtra || ''}" data-estado="parada">${personagem.desenho()}</span>`;
}

function reagirOutroPersonagem(lugar, estado) {
  if (!lugar) return;
  clearTimeout(lugar.temporizador);
  if (lugar.classList.contains('lumi')) {
    lugar.dataset.estado = 'parada';
    void lugar.getBoundingClientRect();
    lugar.dataset.estado = estado === 'ops' ? 'errou' : 'acertou';
    lugar.dataset.variante = String(1 + Math.floor(Math.random() * 3));
    lugar.dataset.rosto = estado === 'ops' ? 'quase' : 'feliz';
    lugar.dataset.bracos = estado === 'ops' ? 'baixo' : 'cima';
    lugar.temporizador = setTimeout(() => { lugar.dataset.estado = 'parada'; lugar.dataset.rosto = 'sorriso'; lugar.dataset.bracos = 'baixo'; }, 1800);
    return;
  }
  lugar.dataset.estado = 'parada';
  void lugar.getBoundingClientRect();
  lugar.dataset.estado = estado;
  lugar.temporizador = setTimeout(() => { lugar.dataset.estado = 'parada'; }, estado === 'vitoria' ? 2200 : 1300);
}

function reagirPersonagem(estado) {
  reagirOutroPersonagem(document.querySelector('#jogo-personagem .personagem'), estado);
}

function falarNoJogo(texto, estado) {
  const balao = document.getElementById('jogo-balao');
  if (balao) {
    balao.textContent = texto;
    balao.classList.remove('aparecendo');
    void balao.offsetWidth;
    balao.classList.add('aparecendo');
  }
  if (estado) reagirPersonagem(estado);
  if (typeof modoInfantilAtivo === 'function' && modoInfantilAtivo() && typeof falarParaCrianca === 'function') falarParaCrianca([texto]);
}

function somDoJogo(tipo) {
  if (typeof somDaLicao === 'function') somDaLicao(tipo);
}

function tocarNotaDoJogo(frequencia) {
  try {
    const Classe = window.AudioContext || window.webkitAudioContext;
    if (!Classe) return;
    if (!contextoDeSomDosJogos) contextoDeSomDosJogos = new Classe();
    const ctx = contextoDeSomDosJogos;
    const agora = ctx.currentTime;
    [1, 2.01, 3.02].forEach((multiplo, i) => {
      const osc = ctx.createOscillator();
      const ganho = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.value = frequencia * multiplo;
      ganho.gain.setValueAtTime(0, agora);
      ganho.gain.linearRampToValueAtTime(0.09 / (i + 1), agora + 0.01);
      ganho.gain.exponentialRampToValueAtTime(0.0001, agora + 1.4 / (i + 1));
      osc.connect(ganho);
      ganho.connect(ctx.destination);
      osc.start(agora);
      osc.stop(agora + 1.5);
    });
  } catch (e) {
  }
}

function festaNoJogo(alvo, quantas) {
  if (!alvo || !alvo.getBoundingClientRect || (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches)) return;
  const caixa = alvo.getBoundingClientRect();
  for (let i = 0; i < (quantas || 10); i += 1) {
    const grao = document.createElement('i');
    const angulo = Math.random() * Math.PI * 2;
    const forca = 40 + Math.random() * 70;
    grao.className = `jogo-festa${i % 3 === 0 ? ' redonda' : ''}`;
    grao.style.cssText = `left:${caixa.left + caixa.width / 2}px;top:${caixa.top + caixa.height / 2}px;--dx:${(Math.cos(angulo) * forca).toFixed(0)}px;--dy:${(Math.sin(angulo) * forca).toFixed(0)}px;--cor:${sortearDoJogo(['#ffe9a8', '#f0cf7a', '#fff', '#ffc4d6', '#bfe3ff'])}`;
    document.body.appendChild(grao);
    setTimeout(() => grao.remove(), 900);
  }
}

function idadeInicialDosJogos() {
  const membro = typeof obterMembroAtivo === 'function' ? obterMembroAtivo() : null;
  if (membro && membro.tipo === 'crianca') return { ate7: 'pequeninos', '8a12': '8a12', '13a17': '13a17' }[membro.faixa] || 'pequeninos';
  return 'pequeninos';
}

function idadesVisiveisDosJogos() {
  const infantil = typeof modoInfantilAtivo === 'function' && modoInfantilAtivo();
  return IDADES_DOS_JOGOS.filter((idade) => !(infantil && idade.id === 'adultos'));
}

function abrirJogos() {
  if (typeof closeSidebar === 'function') closeSidebar();
  if (!idadeDosJogos || !idadesVisiveisDosJogos().some((i) => i.id === idadeDosJogos)) idadeDosJogos = idadeInicialDosJogos();
  mudarDeView('view-jogos');
  mostrarListaDeJogos();
  window.scrollTo({ top: 0, behavior: 'auto' });
}

function htmlDaTrilhaDosPequeninos() {
  const progresso = progressoDaTrilhaDosPequeninos();
  const proximo = NIVEIS_DA_TRILHA_DOS_PEQUENINOS.findIndex((_, i) => !progresso[i]);
  const deslocamentos = ['desloc-0', 'desloc-d', 'desloc-dd', 'desloc-d', 'desloc-0', 'desloc-e', 'desloc-ee', 'desloc-e'];
  const guias = { 2: 'mel', 7: 'clara', 12: 'dom', 17: 'lumi', 22: 'mel', 27: 'clara' };
  return `
    <section class="pequeninos-trilha">
      <header class="pequeninos-topo"><strong>${textoDoJogo('Trilha dos Pequeninos')}</strong><small>${textoDoJogo('{n} de {total} fases', { n: Object.keys(progresso).length, total: NIVEIS_DA_TRILHA_DOS_PEQUENINOS.length })}</small></header>
      <div class="pequeninos-caminho" id="pequeninos-caminho">
        ${NIVEIS_DA_TRILHA_DOS_PEQUENINOS.map((fase, i) => {
          const jogo = JOGOS.find((j) => j.id === fase.jogo);
          const estrelas = progresso[i] || 0;
          const estado = estrelas ? 'feita' : (i === proximo ? 'atual' : (proximo === -1 || i < proximo ? 'feita' : 'trancada'));
          const lado = /desloc-d/.test(deslocamentos[i % deslocamentos.length]) ? 'a-esquerda' : 'a-direita';
          const guia = guias[i] ? `<span class="pequeninos-guia ${lado}">${htmlDoPersonagem(guias[i])}</span>` : '';
          return `<div class="pequeninos-no-lugar ${deslocamentos[i % deslocamentos.length]}" style="--i:${i}">
            ${guia}
            <button type="button" class="pequeninos-no ${estado}" data-fase="${i}" style="--cor:${jogo.cor}" aria-label="${textoDoJogo('Fase {n}: {nome}', { n: i + 1, nome: textoDoJogo(jogo.nome) })}"${estado === 'trancada' ? ' disabled' : ''}>
              ${estado === 'atual' ? `<span class="pequeninos-balao">${textoDoJogo('Começar')}</span>` : ''}
              <span class="pequeninos-moeda">${iconeDoJogo(estado === 'trancada' ? 'cadeado' : jogo.icone)}</span>
              ${estrelas ? `<span class="pequeninos-estrelas">${[1, 2, 3].map((n) => `<i class="${estrelas >= n ? 'ganha' : ''}"></i>`).join('')}</span>` : ''}
            </button>
          </div>`;
        }).join('')}
        <div class="pequeninos-no-lugar desloc-0"><span class="pequeninos-final">${iconeDoJogo('igreja')}</span></div>
      </div>
    </section>`;
}

function desenharLinhaDosPequeninos() {
  const caminho = document.getElementById('pequeninos-caminho');
  if (!caminho || !caminho.getBoundingClientRect) return;
  const antiga = caminho.querySelector('.pequeninos-linha');
  if (antiga) antiga.remove();
  const base = caminho.getBoundingClientRect();
  const pontos = Array.from(caminho.querySelectorAll('.pequeninos-moeda, .pequeninos-final')).map((el) => {
    const c = el.getBoundingClientRect();
    return { x: c.left + c.width / 2 - base.left, y: c.top + c.height / 2 - base.top };
  });
  if (pontos.length < 2) return;
  const feitas = caminho.querySelectorAll('.pequeninos-no.feita').length;
  const rota = (lista) => lista.reduce((d, p, i) => (i === 0 ? `M${p.x.toFixed(1)} ${p.y.toFixed(1)}` : `${d} C${lista[i - 1].x.toFixed(1)} ${((lista[i - 1].y + p.y) / 2).toFixed(1)}, ${p.x.toFixed(1)} ${((lista[i - 1].y + p.y) / 2).toFixed(1)}, ${p.x.toFixed(1)} ${p.y.toFixed(1)}`), '');
  caminho.insertAdjacentHTML('afterbegin', `<svg class="pequeninos-linha" width="${base.width}" height="${base.height}" aria-hidden="true"><path class="falta" d="${rota(pontos)}"/>${feitas ? `<path class="feita" d="${rota(pontos.slice(0, feitas + 1))}"/>` : ''}</svg>`);
}

function mostrarListaDeJogos(opcoes) {
  const lugar = document.getElementById('jogos-container');
  if (!lugar) return;
  pararJogoAtual();
  const recordes = recordesDosJogos();
  const jogos = JOGOS.filter((jogo) => jogo.idades.includes(idadeDosJogos));
  lugar.innerHTML = `
    <button type="button" class="btn-back" id="btn-back-jogos"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg><span>${textoDoJogo('Voltar para o início')}</span></button>
    <header class="jogos-topo">
      <span class="jogos-sol" aria-hidden="true"></span>
      <span class="jogos-nuvem n1" aria-hidden="true"></span><span class="jogos-nuvem n2" aria-hidden="true"></span>
      <div class="jogos-turma">${['mel', 'lumi', 'clara', 'dom'].map((id, i) => `<button type="button" class="jogos-amigo" data-amigo="${id}" style="--i:${i}" aria-label="${PERSONAGENS_DOS_JOGOS[id].nome}">${htmlDoPersonagem(id)}<small>${PERSONAGENS_DOS_JOGOS[id].nome}</small></button>`).join('')}</div>
      <span class="jogos-morro" aria-hidden="true"></span>
      <h2 class="jogos-titulo">${textoDoJogo('Joguinhos')}</h2>
      <p class="jogos-sub">${textoDoJogo('Brinque e aprenda com a Lumi e os amigos dela.')}</p>
    </header>
    <div class="jogos-idades" role="tablist" aria-label="${textoDoJogo('Idade')}">${idadesVisiveisDosJogos().map((idade) => `<button type="button" class="jogos-idade${idade.id === idadeDosJogos ? ' ativa' : ''}" role="tab" aria-selected="${idade.id === idadeDosJogos}" data-idade="${idade.id}">${textoDoJogo(idade.rotulo)}</button>`).join('')}</div>
    ${idadeDosJogos === 'pequeninos' ? htmlDaTrilhaDosPequeninos() : ''}
    ${idadeDosJogos === 'pequeninos' ? `<h3 class="jogos-secao">${textoDoJogo('Brincar à vontade')}</h3>` : ''}
    <div class="jogos-grade">${jogos.map((jogo, i) => `
      <button type="button" class="jogo-cartao" data-jogo="${jogo.id}" style="--i:${i};--cor:${jogo.cor}">
        <span class="jogo-cartao-arte">${htmlDoPersonagem(jogo.personagem)}<span class="jogo-cartao-selo">${iconeDoJogo(jogo.icone)}</span></span>
        <span class="jogo-cartao-textos">
          <strong>${textoDoJogo(jogo.nome)}</strong>
          <small>${textoDoJogo(jogo.texto)}</small>
          <span class="jogo-cartao-rodape">
            <span class="jogo-cartao-estrelas" aria-label="${textoDoJogo('{n} de 3 estrelas', { n: recordes[jogo.id] || 0 })}">${[1, 2, 3].map((n) => `<i class="${(recordes[jogo.id] || 0) >= n ? 'ganha' : ''}"></i>`).join('')}</span>
            ${jogo.contraIa ? `<span class="jogo-cartao-ia">${textoDoJogo('Contra a Lumi')}</span>` : ''}
            ${jogo.comIa ? `<span class="jogo-cartao-ia">${textoDoJogo('Com a Lumina')}</span>` : ''}
          </span>
        </span>
        <span class="jogo-cartao-jogar">${textoDoJogo('Jogar')}</span>
      </button>`).join('')}</div>`;
  document.getElementById('btn-back-jogos').addEventListener('click', () => mudarDeView('view-home'));
  lugar.querySelectorAll('.jogos-idade').forEach((botao) => {
    botao.addEventListener('click', () => { idadeDosJogos = botao.dataset.idade; mostrarListaDeJogos(); });
  });
  lugar.querySelectorAll('.jogos-amigo').forEach((botao) => {
    botao.addEventListener('click', () => {
      reagirOutroPersonagem(botao.querySelector('.personagem'), 'feliz');
      festaNoJogo(botao, 8);
    });
  });
  lugar.querySelectorAll('.jogo-cartao').forEach((botao) => {
    botao.addEventListener('click', () => comecarJogo(botao.dataset.jogo));
  });
  lugar.querySelectorAll('.pequeninos-no:not([disabled])').forEach((botao) => {
    botao.addEventListener('click', () => {
      const fase = NIVEIS_DA_TRILHA_DOS_PEQUENINOS[Number(botao.dataset.fase)];
      comecarJogo(fase.jogo, { nivel: fase.nivel, fase: Number(botao.dataset.fase) });
    });
  });
  if (idadeDosJogos === 'pequeninos') {
    requestAnimationFrame(desenharLinhaDosPequeninos);
    setTimeout(desenharLinhaDosPequeninos, 700);
    if (opcoes && opcoes.faseAberta !== undefined) {
      setTimeout(() => {
        const nova = document.querySelector(`.pequeninos-no[data-fase="${opcoes.faseAberta}"]`);
        if (nova) {
          nova.classList.add('acabou-de-abrir');
          if (nova.scrollIntoView) nova.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 300);
    }
  }
}

function nivelPadraoDoJogo() {
  return { pequeninos: 0, ate7: 1, '8a12': 1, '13a17': 2, adultos: 2 }[idadeDosJogos] || 0;
}

function comecarJogo(id, opcoes) {
  const jogo = JOGOS.find((j) => j.id === id);
  const lugar = document.getElementById('jogos-container');
  if (!jogo || !lugar) return;
  pararJogoAtual();
  let configuracao = opcoes || {};
  if (jogo.modos && configuracao.nivel === undefined) {
    if (idadeDosModosDoPastor() && !configuracao.direto) {
      mostrarModosDoBomPastor(jogo);
      return;
    }
    configuracao = Object.assign({}, configuracao, { nivel: 0 });
  }
  if (jogo.comIa && !configuracao.santo) {
    mostrarEscolhaDoQuizDaLumina(jogo);
    return;
  }
  if (jogo.contraIa && configuracao.nivel === undefined && !configuracao.direto) {
    mostrarEscolhaDeNivel(jogo);
    return;
  }
  jogoAtual = { jogo, erros: 0, fim: false, timers: [], intervalos: [], limpezas: [], nivel: configuracao.nivel !== undefined ? configuracao.nivel : nivelPadraoDoJogo(), fase: configuracao.fase, santo: configuracao.santo, nivelSanto: !!configuracao.nivelSanto };
  lugar.innerHTML = `
    <div class="jogo-tela" data-jogo="${jogo.id}" style="--cor:${jogo.cor}">
      <div class="jogo-cabecalho">
        <button type="button" class="jogo-voltar" id="jogo-voltar"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg><span>${textoDoJogo(jogoAtual.fase !== undefined ? 'Trilha' : 'Outros jogos')}</span></button>
        <strong class="jogo-nome">${textoDoJogo(jogo.nome)}</strong>
        <span class="jogo-placar" id="jogo-placar"></span>
      </div>
      <div class="jogo-guia"><span class="jogo-personagem" id="jogo-personagem">${htmlDoPersonagem(jogo.personagem)}</span><p class="jogo-balao" id="jogo-balao" aria-live="polite"></p></div>
      <div class="jogo-area" id="jogo-area"></div>
    </div>`;
  const fase = jogoAtual.fase;
  document.getElementById('jogo-voltar').addEventListener('click', () => {
    if (typeof pararVozInfantil === 'function') pararVozInfantil(false);
    mostrarListaDeJogos();
    if (fase !== undefined) setTimeout(() => { const no = document.querySelector(`.pequeninos-no[data-fase="${fase}"]`); if (no && no.scrollIntoView) no.scrollIntoView({ block: 'center' }); }, 200);
  });
  window.scrollTo({ top: 0, behavior: 'auto' });
  const comecar = {
    estrelas: jogoDasEstrelas, bolhas: jogoDasBolhas, sombras: jogoDasSombras, contar: jogoDeContar, ovelhas: jogoDasOvelhas, vitral: jogoDoVitral,
    diferente: jogoDoDiferente, sinos: jogoDosSinos, girar: jogoDeGirar, memoria: jogoDaMemoria, simon: jogoSigaALuz, velha: jogoDaVelha,
    simbolos: jogoDosSimbolos, historia: jogoDaHistoria, palavras: jogoDasPalavras, quemsou: jogoQuemSouEu, oracao: jogoDaOracao,
    anagrama: jogoDoAnagrama, quiz: jogoDoQuiz, duelo: jogoDoDuelo, quizia: jogoDoQuizDaLumina,
  }[id];
  comecar(document.getElementById('jogo-area'));
}

function mostrarEscolhaDeNivel(jogo) {
  const lugar = document.getElementById('jogos-container');
  lugar.innerHTML = `
    <div class="jogo-tela" style="--cor:${jogo.cor}">
      <div class="jogo-cabecalho"><button type="button" class="jogo-voltar" id="jogo-voltar"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg><span>${textoDoJogo('Outros jogos')}</span></button><strong class="jogo-nome">${textoDoJogo(jogo.nome)}</strong></div>
      <div class="jogo-niveis">
        <span class="jogo-niveis-arte">${htmlDoPersonagem('lumi')}</span>
        <strong>${textoDoJogo('Escolha o nível')}</strong>
        <small>${textoDoJogo('A Lumi joga contra você. Quanto mais difícil, mais esperta ela fica.')}</small>
        ${NIVEIS_DA_IA.map((nivel) => `<button type="button" class="jogo-nivel nivel-${nivel.id}" data-nivel="${nivel.id}"><span>${'<i></i>'.repeat(nivel.id + 1)}</span>${textoDoJogo(nivel.rotulo)}</button>`).join('')}
      </div>
    </div>`;
  document.getElementById('jogo-voltar').addEventListener('click', () => mostrarListaDeJogos());
  lugar.querySelectorAll('.jogo-nivel').forEach((botao) => {
    botao.addEventListener('click', () => comecarJogo(jogo.id, { nivel: Number(botao.dataset.nivel) }));
  });
}

function placarDoJogo(texto) {
  const placar = document.getElementById('jogo-placar');
  if (placar) {
    placar.textContent = texto;
    placar.classList.remove('mudou');
    void placar.offsetWidth;
    placar.classList.add('mudou');
  }
}

function terminarJogo(estrelas, mensagem) {
  if (!jogoAtual || jogoAtual.fim) return;
  jogoAtual.fim = true;
  const { jogo, fase } = jogoAtual;
  guardarRecordeDoJogo(jogo.id, estrelas);
  if (typeof registrarDesafio === 'function') registrarDesafio(jogo.id === 'quizia' ? 'quiz' : 'jogo');
  let proximaFase;
  if (fase !== undefined) {
    const progresso = progressoDaTrilhaDosPequeninos();
    progresso[fase] = Math.max(progresso[fase] || 0, estrelas);
    gravarNoAparelho(CHAVE_DA_TRILHA_DOS_PEQUENINOS, progresso);
    proximaFase = fase + 1 < NIVEIS_DA_TRILHA_DOS_PEQUENINOS.length ? fase + 1 : undefined;
  }
  somDoJogo('fim');
  const frases = { 3: 'Perfeito! Você foi incrível!', 2: 'Muito bem! Você conseguiu!', 1: 'Você conseguiu! Vamos de novo?' };
  falarNoJogo(mensagem || textoDoJogo(frases[estrelas]), estrelas > 0 ? 'vitoria' : 'ops');
  const area = document.getElementById('jogo-area');
  if (!area) return;
  area.insertAdjacentHTML('beforeend', `
    <div class="jogo-fim">
      <div class="jogo-fim-caixa">
        <span class="jogo-fim-raios" aria-hidden="true"></span>
        <span class="jogo-fim-estrelas">${[1, 2, 3].map((n) => `<i class="${estrelas >= n ? 'ganha' : ''}" style="--i:${n}"></i>`).join('')}</span>
        <strong>${textoDoJogo(estrelas >= 2 ? 'Parabéns!' : 'Boa tentativa!')}</strong>
        ${mensagem ? `<small>${mensagem}</small>` : ''}
        <div class="jogo-fim-botoes">
          ${fase !== undefined ? `<button type="button" class="jogo-botao" id="jogo-continuar">${textoDoJogo('Continuar a trilha')}</button>` : ''}
          <button type="button" class="jogo-botao${fase !== undefined ? ' jogo-botao-claro' : ''}" id="jogo-de-novo">${textoDoJogo('Jogar de novo')}</button>
          ${fase === undefined && jogo.modos && idadeDosModosDoPastor() ? `<button type="button" class="jogo-botao jogo-botao-claro" id="jogo-outro-modo">${textoDoJogo('Outro modo')}</button>` : ''}
          ${fase === undefined ? `<button type="button" class="jogo-botao jogo-botao-claro" id="jogo-outros">${textoDoJogo('Outros jogos')}</button>` : ''}
        </div>
      </div>
    </div>`);
  festaNoJogo(area.querySelector('.jogo-fim-estrelas'), 18);
  const nivel = jogoAtual.nivel;
  document.getElementById('jogo-de-novo').addEventListener('click', () => comecarJogo(jogo.id, { nivel, fase }));
  const continuar = document.getElementById('jogo-continuar');
  if (continuar) continuar.addEventListener('click', () => mostrarListaDeJogos({ faseAberta: proximaFase }));
  const outroModo = document.getElementById('jogo-outro-modo');
  if (outroModo) outroModo.addEventListener('click', () => mostrarModosDoBomPastor(jogo));
  const outros = document.getElementById('jogo-outros');
  if (outros) outros.addEventListener('click', () => mostrarListaDeJogos());
}

function estrelasPelosErros(erros, limites) {
  if (erros <= limites[0]) return 3;
  if (erros <= limites[1]) return 2;
  return 1;
}

function acertouNoJogo(texto, alvo) {
  somDoJogo('certo');
  if (texto) falarNoJogo(texto, 'feliz');
  else reagirPersonagem('feliz');
  if (alvo) festaNoJogo(alvo, 8);
}

function errouNoJogo(texto, alvo) {
  if (jogoAtual) jogoAtual.erros += 1;
  somDoJogo('errado');
  falarNoJogo(texto || textoDoJogo('Quase! Tente outra.'), 'ops');
  if (alvo) {
    alvo.classList.remove('errada');
    void alvo.offsetWidth;
    alvo.classList.add('errada');
  }
}

const ESTRELA_DO_JOGO = '<svg viewBox="0 0 100 100" aria-hidden="true"><path d="M50 0C52 35 65 48 100 50C65 52 52 65 50 100C48 65 35 52 0 50C35 48 48 35 50 0Z"/></svg>';

function jogoDasEstrelas(area) {
  const meta = [5, 8, 10][jogoAtual.nivel] || 8;
  let acesas = 0;
  area.innerHTML = '<div class="jogo-ceu" id="jogo-ceu"><span class="jogo-lua"></span></div>';
  const ceu = document.getElementById('jogo-ceu');
  placarDoJogo(`0/${meta}`);
  falarNoJogo(textoDoJogo('Toque nas estrelinhas para acender o céu!'));
  const nova = () => {
    if (!jogoAtual || jogoAtual.fim || acesas + ceu.querySelectorAll('.jogo-estrela:not(.acesa)').length >= meta) return;
    const estrela = document.createElement('button');
    estrela.type = 'button';
    estrela.className = 'jogo-estrela';
    estrela.setAttribute('aria-label', textoDoJogo('Estrela'));
    estrela.style.left = `${10 + Math.random() * 78}%`;
    estrela.style.top = `${12 + Math.random() * 70}%`;
    estrela.innerHTML = ESTRELA_DO_JOGO;
    estrela.addEventListener('click', () => {
      if (estrela.classList.contains('acesa')) return;
      estrela.classList.add('acesa');
      acesas += 1;
      placarDoJogo(`${acesas}/${meta}`);
      acertouNoJogo(acesas % 3 === 0 && acesas < meta ? textoDoJogo('Que lindo! Continue!') : '', estrela);
      tocarNotaDoJogo([523, 587, 659, 784, 880][acesas % 5]);
      if (acesas >= meta) agendarNoJogo(() => terminarJogo(3), 600);
      else agendarNoJogo(nova, 250);
    });
    ceu.appendChild(estrela);
  };
  nova();
  nova();
  nova();
}

function jogoDasBolhas(area) {
  const meta = [6, 10, 14][jogoAtual.nivel] || 8;
  const velocidade = [7, 5.5, 4.2][jogoAtual.nivel] || 6;
  let estouradas = 0;
  area.innerHTML = '<div class="jogo-ceu jogo-ceu-dia" id="jogo-ceu"></div>';
  const ceu = document.getElementById('jogo-ceu');
  placarDoJogo(`0/${meta}`);
  falarNoJogo(textoDoJogo('Estoure as bolhas de luz!'));
  const figuras = ['estrela', 'coracao', 'pomba', 'cruz'];
  const soltar = () => {
    if (!jogoAtual || jogoAtual.fim) return;
    const bolha = document.createElement('button');
    bolha.type = 'button';
    bolha.className = 'jogo-bolha';
    bolha.setAttribute('aria-label', textoDoJogo('Bolha'));
    bolha.style.left = `${8 + Math.random() * 76}%`;
    bolha.style.animationDuration = `${velocidade + Math.random() * 1.5}s`;
    bolha.innerHTML = iconeDoJogo(sortearDoJogo(figuras));
    bolha.addEventListener('animationend', (evento) => { if (evento.animationName === 'bolhaSobe') bolha.remove(); });
    bolha.addEventListener('click', () => {
      if (bolha.classList.contains('estourou')) return;
      bolha.classList.add('estourou');
      estouradas += 1;
      placarDoJogo(`${estouradas}/${meta}`);
      tocarNotaDoJogo(660 + Math.random() * 300);
      acertouNoJogo('', bolha);
      setTimeout(() => bolha.remove(), 300);
      if (estouradas >= meta) agendarNoJogo(() => terminarJogo(3), 500);
    });
    ceu.appendChild(bolha);
  };
  soltar();
  repetirNoJogo(soltar, [1300, 950, 700][jogoAtual.nivel] || 1000);
}

function jogoDasSombras(area) {
  const opcoesPorRodada = [2, 3, 4][jogoAtual.nivel] || 3;
  const rodadas = embaralharDoJogo(AMIGOS_DOS_JOGOS.concat(embaralharDoJogo(AMIGOS_DOS_JOGOS))).slice(0, [3, 5, 6][jogoAtual.nivel] || 5);
  let rodada = 0;
  const mostrar = () => {
    if (rodada >= rodadas.length) { terminarJogo(estrelasPelosErros(jogoAtual.erros, [0, 2])); return; }
    const certo = rodadas[rodada];
    const opcoes = embaralharDoJogo([certo].concat(embaralharDoJogo(AMIGOS_DOS_JOGOS.filter((a) => a !== certo)).slice(0, opcoesPorRodada - 1)));
    placarDoJogo(`${rodada + 1}/${rodadas.length}`);
    area.innerHTML = `
      <div class="jogo-sombras">
        <div class="jogo-sombra-modelo">${htmlDoPersonagem(certo)}</div>
        <div class="jogo-sombra-opcoes" style="--n:${opcoes.length}">${opcoes.map((id) => `<button type="button" class="jogo-sombra" data-amigo="${id}" aria-label="${textoDoJogo('Sombra')}">${htmlDoPersonagem(id)}</button>`).join('')}</div>
      </div>`;
    falarNoJogo(textoDoJogo('Qual é a sombra de {nome}?', { nome: PERSONAGENS_DOS_JOGOS[certo].nome }));
    area.querySelectorAll('.jogo-sombra').forEach((botao) => {
      botao.addEventListener('click', () => {
        if (area.querySelector('.jogo-sombra.certa')) return;
        if (botao.dataset.amigo === certo) {
          botao.classList.add('certa');
          acertouNoJogo(textoDoJogo('Isso mesmo!'), botao);
          rodada += 1;
          agendarNoJogo(mostrar, 1000);
        } else {
          errouNoJogo(textoDoJogo('Quase! Tente outra.'), botao);
        }
      });
    });
  };
  mostrar();
}

function desenhoDaVelinha() {
  return '<svg viewBox="0 0 40 70" aria-hidden="true"><path class="mini-chama" d="M20 2 C24 9 27 13 27 18 C27 23 24 26 20 26 C16 26 13 23 13 18 C13 13 16 9 20 2Z" fill="#ffc44d"/><path d="M20 12 C22 15 23 17 23 19 C23 21.5 21.6 23 20 23 C18.4 23 17 21.5 17 19 C17 17 18 15 20 12Z" fill="#fff6c8"/><rect x="11" y="27" width="18" height="38" rx="6" fill="#fff4dc" stroke="#d8bb85"/><rect x="8" y="62" width="24" height="6" rx="3" fill="#d9a93f"/></svg>';
}

function desenhoDaOvelhinha() {
  return '<svg viewBox="0 0 60 50" aria-hidden="true"><g fill="#5c4632"><rect x="17" y="34" width="4" height="13" rx="2"/><rect x="27" y="34" width="4" height="13" rx="2"/><rect x="37" y="34" width="4" height="13" rx="2"/></g><g fill="#fffaf0" stroke="#e2d2b2"><circle cx="30" cy="26" r="15"/><circle cx="18" cy="24" r="9"/><circle cx="42" cy="24" r="9"/><circle cx="24" cy="14" r="8"/><circle cx="36" cy="14" r="8"/></g><ellipse cx="46" cy="28" rx="8" ry="9" fill="#f6dcc3"/><circle cx="44" cy="27" r="1.6" fill="#241a10"/><circle cx="49" cy="27" r="1.6" fill="#241a10"/></svg>';
}

function jogoDeContar(area) {
  const maximo = [3, 5, 9][jogoAtual.nivel] || 5;
  const tipos = [
    { desenho: desenhoDaVelinha, pergunta: 'Quantas velinhas você vê?' },
    { desenho: desenhoDaOvelhinha, pergunta: 'Quantas ovelhinhas você vê?' },
    { desenho: () => ESTRELA_DO_JOGO, pergunta: 'Quantas estrelas você vê?' },
  ];
  const rodadas = 4;
  let rodada = 0;
  const mostrar = () => {
    if (rodada >= rodadas) { terminarJogo(estrelasPelosErros(jogoAtual.erros, [0, 2])); return; }
    const tipo = tipos[rodada % tipos.length];
    const quantos = 1 + Math.floor(Math.random() * maximo);
    const numeros = new Set([quantos]);
    while (numeros.size < 3) numeros.add(1 + Math.floor(Math.random() * Math.max(maximo, 4)));
    placarDoJogo(`${rodada + 1}/${rodadas}`);
    area.innerHTML = `
      <div class="jogo-contar">
        <div class="jogo-contar-mesa">${Array.from({ length: quantos }, (_, i) => `<span class="jogo-contar-item" style="--i:${i}">${tipo.desenho()}</span>`).join('')}</div>
        <div class="jogo-contar-opcoes">${embaralharDoJogo([...numeros]).map((n) => `<button type="button" class="jogo-numero" data-numero="${n}"><strong>${n}</strong><span>${'<i></i>'.repeat(n)}</span></button>`).join('')}</div>
      </div>`;
    falarNoJogo(textoDoJogo(tipo.pergunta));
    area.querySelectorAll('.jogo-numero').forEach((botao) => {
      botao.addEventListener('click', () => {
        if (area.querySelector('.jogo-numero.certa')) return;
        if (Number(botao.dataset.numero) === quantos) {
          botao.classList.add('certa');
          area.querySelectorAll('.jogo-contar-item').forEach((item, i) => setTimeout(() => item.classList.add('contado'), i * 160));
          acertouNoJogo(textoDoJogo('Isso! São {n}!', { n: quantos }), botao);
          rodada += 1;
          agendarNoJogo(mostrar, 1200 + quantos * 160);
        } else {
          errouNoJogo(textoDoJogo('Vamos contar de novo, devagar.'), botao);
        }
      });
    });
  };
  mostrar();
}

const MODOS_DO_BOM_PASTOR = [
  { id: 0, rotulo: 'Fácil', texto: 'Toque na ovelhinha e ela vai sozinha para o curral.', ovelhas: 5, tempo: 0, coracoes: 0, lobos: 0, arbustos: 0, passo: 26 },
  { id: 1, rotulo: 'Médio', texto: 'Arraste as ovelhas até o curral e encontre a ovelha perdida.', ovelhas: 7, tempo: 80, coracoes: 0, lobos: 0, arbustos: 3, passo: 36 },
  { id: 2, rotulo: 'Difícil', texto: 'O lobo aparece! Toque nele para espantar antes que ele assuste as ovelhas.', ovelhas: 8, tempo: 90, coracoes: 3, lobos: 1, intervaloDoLobo: 6500, passoDoLobo: 36, toquesNoLobo: 1, arbustos: 4, passo: 42 },
  { id: 3, rotulo: 'Hard', texto: 'Dois lobos, a noite cai e a porteira abre e fecha sozinha.', ovelhas: 10, tempo: 105, coracoes: 3, lobos: 2, intervaloDoLobo: 4500, passoDoLobo: 46, toquesNoLobo: 2, arbustos: 5, passo: 50, noite: true, porteira: true },
];
const LUGARES_DOS_ARBUSTOS = [[0.16, 0.6], [0.46, 0.5], [0.3, 0.9], [0.54, 0.8], [0.1, 0.8]];

function desenhoDaOvelhaDoPastor(preta) {
  const la = idDoPersonagem('ov-la');
  const rosto = idDoPersonagem('ov-rosto');
  const cores = preta ? ['#8a8692', '#5b5864', '#3a3842', '#2a2830'] : ['#ffffff', '#f7f0e2', '#dccdb0', '#d6c6a6'];
  const tufos = [[42, 40, 17], [58, 37, 15], [29, 44, 12], [67, 45, 11], [47, 55, 13], [32, 55, 11], [61, 55, 11], [49, 25, 11], [35, 29, 10], [63, 28, 9], [22, 36, 8]];
  const perna = (classe, x, cor) => `<g class="ov-perna ${classe}"><rect x="${x}" y="54" width="7" height="22" rx="3.5" fill="${cor}"/><rect x="${x - 0.6}" y="72" width="8.2" height="6.5" rx="2.6" fill="#2b2119"/></g>`;
  return `<svg class="ov-svg" viewBox="0 0 100 84" aria-hidden="true">
    <defs><radialGradient id="${la}" cx="38%" cy="26%" r="78%"><stop offset="0" stop-color="${cores[0]}"/><stop offset=".55" stop-color="${cores[1]}"/><stop offset="1" stop-color="${cores[2]}"/></radialGradient><radialGradient id="${rosto}" cx="38%" cy="32%" r="72%"><stop offset="0" stop-color="#fdebd6"/><stop offset="1" stop-color="#d9a882"/></radialGradient></defs>
    ${perna('ov-perna-b', 27, '#4d3b2f')}${perna('ov-perna-a', 59, '#4d3b2f')}
    <circle class="ov-rabo" cx="15" cy="42" r="7" fill="url(#${la})" stroke="${cores[3]}" stroke-width="1.1"/>
    <g class="ov-la" fill="url(#${la})" stroke="${cores[3]}" stroke-width="1.1">${tufos.map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}"/>`).join('')}</g>
    <path d="M30 30 C36 22 46 19 54 21" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity="${preta ? 0.25 : 0.8}"/>
    ${perna('ov-perna-a', 36, '#6b5444')}${perna('ov-perna-b', 67, '#6b5444')}
    <g class="ov-cabeca">
      <ellipse cx="71" cy="30" rx="8.5" ry="3.8" fill="url(#${rosto})" stroke="#c99671" stroke-width=".8" transform="rotate(-32 71 30)"/>
      <ellipse cx="80" cy="37" rx="12.5" ry="11.5" fill="url(#${rosto})" stroke="#c99671" stroke-width="1"/>
      <circle cx="75" cy="27" r="6.2" fill="url(#${la})" stroke="${cores[3]}" stroke-width=".8"/><circle cx="82.5" cy="25.5" r="5.2" fill="url(#${la})" stroke="${cores[3]}" stroke-width=".8"/>
      <ellipse class="ov-orelha" cx="89.5" cy="31" rx="7.5" ry="3.3" fill="url(#${rosto})" stroke="#c99671" stroke-width=".8" transform="rotate(26 89.5 31)"/>
      <ellipse cx="89" cy="31.5" rx="4" ry="1.5" fill="#f4a49a" opacity=".7" transform="rotate(26 89 31.5)"/>
      <g class="ov-olho"><ellipse cx="84.5" cy="36" rx="2.6" ry="3.3" fill="#221a12"/><circle cx="85.4" cy="34.8" r="1" fill="#fff"/></g>
      <ellipse cx="85" cy="42.5" rx="3.2" ry="1.9" fill="#f2988e" opacity=".55"/>
      <ellipse cx="91.3" cy="39.2" rx="1.5" ry="1.1" fill="#8a5a44"/>
      <path d="M88.6 43.4 Q90.6 45 92.4 43.2" fill="none" stroke="#6a4632" stroke-width="1.3" stroke-linecap="round"/>
    </g>
  </svg>`;
}

function desenhoDoLobo() {
  const pelo = idDoPersonagem('lobo-pelo');
  const perna = (classe, x, cor) => `<g class="ov-perna ${classe}"><rect x="${x}" y="50" width="8" height="25" rx="4" fill="${cor}"/><rect x="${x - 1}" y="71" width="10" height="6" rx="3" fill="#2c3038"/></g>`;
  return `<svg class="lobo-svg" viewBox="0 0 132 84" aria-hidden="true">
    <defs><linearGradient id="${pelo}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#b3bcc7"/><stop offset=".55" stop-color="#7f8894"/><stop offset="1" stop-color="#565e6a"/></linearGradient></defs>
    ${perna('ov-perna-b', 34, '#545b66')}${perna('ov-perna-a', 78, '#545b66')}
    <path class="lobo-rabo" d="M30 40 C14 36 4 24 6 8 C14 18 22 22 34 30 Z" fill="url(#${pelo})" stroke="#3a4049" stroke-width="1.3"/>
    <path d="M24 44 C24 30 42 25 62 26 C82 27 94 30 98 40 C100 51 89 58 70 58 C48 59 28 58 24 44 Z" fill="url(#${pelo})" stroke="#3a4049" stroke-width="1.4"/>
    <path d="M40 54 C52 58 72 58 86 53" fill="none" stroke="#d2d8df" stroke-width="5" stroke-linecap="round" opacity=".75"/>
    <path d="M44 31 C54 28 66 28 76 30" fill="none" stroke="#5d6571" stroke-width="2" stroke-linecap="round" opacity=".6"/>
    ${perna('ov-perna-a', 46, '#6a727e')}${perna('ov-perna-b', 88, '#6a727e')}
    <g class="lobo-cabeca">
      <path d="M95 24 L99 5 L109 21 Z" fill="url(#${pelo})" stroke="#3a4049" stroke-width="1.2"/><path d="M98 20 L100 10 L105 19 Z" fill="#e7a3a8"/>
      <path d="M106 21 L115 5 L118 25 Z" fill="url(#${pelo})" stroke="#3a4049" stroke-width="1.2"/>
      <path d="M90 33 C90 21 104 16 115 22 C121 26 123 30 129 34 C131 39 127 43 120 43 C111 45 97 47 92 41 Z" fill="url(#${pelo})" stroke="#3a4049" stroke-width="1.4"/>
      <path d="M106 37 C113 42 122 42 128 38 C126 42 118 45 110 43 Z" fill="#e3e7ec"/>
      <ellipse cx="128.5" cy="34.6" rx="2.8" ry="2.1" fill="#1d2026"/>
      <g class="lobo-olho"><ellipse cx="111" cy="28.5" rx="3.2" ry="2.5" fill="#ffd24a"/><ellipse cx="111.8" cy="28.5" rx="1.1" ry="2" fill="#1d2026"/></g>
      <path d="M106.5 24.6 L115 26.4" stroke="#3a4049" stroke-width="1.8" stroke-linecap="round"/>
      <path d="M115 41.5 Q119.5 43.5 124 41.2" fill="none" stroke="#3a4049" stroke-width="1.2" stroke-linecap="round"/>
    </g>
  </svg>`;
}

function desenhoDoArbusto() {
  const folha = idDoPersonagem('arbusto');
  return `<svg viewBox="0 0 100 72" aria-hidden="true">
    <defs><radialGradient id="${folha}" cx="40%" cy="28%" r="78%"><stop offset="0" stop-color="#9be38a"/><stop offset=".55" stop-color="#4fab55"/><stop offset="1" stop-color="#2a7638"/></radialGradient></defs>
    <ellipse cx="50" cy="67" rx="42" ry="5.5" fill="rgba(10, 40, 15, .22)"/>
    <g fill="url(#${folha})" stroke="#24672f" stroke-width="1.3"><circle cx="27" cy="46" r="20"/><circle cx="73" cy="46" r="20"/><circle cx="50" cy="33" r="25"/><circle cx="50" cy="52" r="18"/></g>
    <path d="M34 20 C41 13 52 11 59 13" fill="none" stroke="#d6f8c6" stroke-width="3" stroke-linecap="round" opacity=".75"/>
    <g><circle cx="37" cy="31" r="2.8" fill="#ff8fa3"/><circle cx="62" cy="40" r="2.8" fill="#fff1a6"/><circle cx="24" cy="50" r="2.5" fill="#ff8fa3"/><circle cx="76" cy="53" r="2.5" fill="#fff1a6"/><circle cx="52" cy="22" r="2.4" fill="#ffffff"/></g>
  </svg>`;
}

function desenhoDaArvoreDoPastor() {
  return '<svg viewBox="0 0 60 100" aria-hidden="true"><rect x="26" y="70" width="8" height="26" rx="3" fill="#5a3a1c"/><path d="M30 4 L52 44 H38 L56 74 H4 L22 44 H8 Z" fill="#2f6b3c" stroke="#1f4d2b" stroke-width="2" stroke-linejoin="round"/><path d="M30 12 L22 30" stroke="#5aa168" stroke-width="3" stroke-linecap="round" opacity=".7"/></svg>';
}

function tocarSomDoPastor(tipo) {
  try {
    const Classe = window.AudioContext || window.webkitAudioContext;
    if (!Classe) return;
    if (!contextoDeSomDosJogos) contextoDeSomDosJogos = new Classe();
    const ctx = contextoDeSomDosJogos;
    const agora = ctx.currentTime;
    const ganho = ctx.createGain();
    ganho.connect(ctx.destination);
    const osc = ctx.createOscillator();
    if (tipo === 'bee' || tipo === 'bee-feliz') {
      const filtro = ctx.createBiquadFilter();
      const lfo = ctx.createOscillator();
      const profundidade = ctx.createGain();
      const base = (tipo === 'bee-feliz' ? 540 : 400) + Math.random() * 60;
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(base, agora);
      osc.frequency.linearRampToValueAtTime(base * 0.9, agora + 0.6);
      lfo.frequency.value = 9;
      profundidade.gain.value = base * 0.06;
      lfo.connect(profundidade);
      profundidade.connect(osc.frequency);
      filtro.type = 'bandpass';
      filtro.frequency.value = 1300;
      filtro.Q.value = 1.4;
      osc.connect(filtro);
      filtro.connect(ganho);
      ganho.gain.setValueAtTime(0, agora);
      ganho.gain.linearRampToValueAtTime(0.12, agora + 0.04);
      ganho.gain.linearRampToValueAtTime(0.03, agora + 0.22);
      ganho.gain.linearRampToValueAtTime(0.1, agora + 0.3);
      ganho.gain.exponentialRampToValueAtTime(0.0001, agora + 0.72);
      lfo.start(agora);
      lfo.stop(agora + 0.75);
      osc.start(agora);
      osc.stop(agora + 0.75);
      return;
    }
    osc.connect(ganho);
    if (tipo === 'uivo') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(260, agora);
      osc.frequency.linearRampToValueAtTime(560, agora + 0.5);
      osc.frequency.linearRampToValueAtTime(430, agora + 1.3);
      ganho.gain.setValueAtTime(0, agora);
      ganho.gain.linearRampToValueAtTime(0.07, agora + 0.3);
      ganho.gain.exponentialRampToValueAtTime(0.0001, agora + 1.4);
      osc.start(agora);
      osc.stop(agora + 1.45);
      return;
    }
    osc.type = 'square';
    osc.frequency.setValueAtTime(tipo === 'porteira' ? 150 : 320, agora);
    osc.frequency.exponentialRampToValueAtTime(tipo === 'porteira' ? 90 : 70, agora + 0.22);
    ganho.gain.setValueAtTime(0.05, agora);
    ganho.gain.exponentialRampToValueAtTime(0.0001, agora + 0.25);
    osc.start(agora);
    osc.stop(agora + 0.26);
  } catch (e) {
  }
}

function idadeDosModosDoPastor() {
  return !['pequeninos', 'ate7'].includes(idadeDosJogos);
}

function detalhesDoModoDoPastor(modo) {
  return [
    textoDoJogo('{n} ovelhas', { n: modo.ovelhas + (modo.arbustos ? 1 : 0) }),
    modo.tempo ? textoDoJogo('{n} segundos', { n: modo.tempo }) : textoDoJogo('Sem pressa'),
    modo.arbustos ? textoDoJogo('Ovelha perdida') : '',
    modo.lobos ? textoDoJogo(modo.lobos > 1 ? 'Dois lobos' : 'Lobo') : '',
    modo.noite ? textoDoJogo('Noite') : '',
    modo.porteira ? textoDoJogo('Porteira') : '',
  ].filter(Boolean);
}

function arteDoModoDoPastor(id) {
  if (id === 0) return `<span class="pm-ovelha">${desenhoDaOvelhaDoPastor()}</span><span class="pm-ovelha pm-pequena">${desenhoDaOvelhaDoPastor()}</span>`;
  if (id === 1) return `<span class="pm-arbusto">${desenhoDoArbusto()}</span><span class="pm-ovelha">${desenhoDaOvelhaDoPastor()}</span><span class="pm-ovelha pm-pequena">${desenhoDaOvelhaDoPastor(true)}</span>`;
  if (id === 2) return `<span class="pm-lobo">${desenhoDoLobo()}</span><span class="pm-ovelha pm-assustada">${desenhoDaOvelhaDoPastor()}</span>`;
  return `<span class="pm-lua"></span><span class="pm-lobo pm-noite">${desenhoDoLobo()}</span><span class="pm-lobo pm-noite pm-segundo">${desenhoDoLobo()}</span>`;
}

function mostrarModosDoBomPastor(jogo) {
  const lugar = document.getElementById('jogos-container');
  const recordes = recordesDosJogos();
  lugar.innerHTML = `
    <div class="jogo-tela" style="--cor:${jogo.cor}">
      <div class="jogo-cabecalho"><button type="button" class="jogo-voltar" id="jogo-voltar"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg><span>${textoDoJogo('Outros jogos')}</span></button><strong class="jogo-nome">${textoDoJogo(jogo.nome)}</strong></div>
      <div class="pastor-escolha">
        <div class="pastor-escolha-topo">
          <span class="pastor-escolha-mel">${htmlDoPersonagem('mel')}</span>
          <span class="pastor-escolha-textos"><strong>${textoDoJogo('Escolha o modo')}</strong><small>${textoDoJogo('Do mais tranquilo ao mais desafiador. Você consegue cuidar de todas as ovelhas?')}</small></span>
        </div>
        <div class="pastor-modos">${MODOS_DO_BOM_PASTOR.map((modo) => `
          <button type="button" class="pastor-modo modo-${modo.id}" data-modo="${modo.id}" style="--i:${modo.id}">
            ${modo.id === 3 ? `<span class="pastor-modo-faixa">${textoDoJogo('Desafio')}</span>` : ''}
            <span class="pastor-modo-arte">${arteDoModoDoPastor(modo.id)}</span>
            <strong>${textoDoJogo(modo.rotulo)}</strong>
            <small>${textoDoJogo(modo.texto)}</small>
            <span class="pastor-modo-detalhes">${detalhesDoModoDoPastor(modo).map((d) => `<i>${d}</i>`).join('')}</span>
            <span class="pastor-modo-estrelas">${[1, 2, 3].map((n) => `<i class="${(recordes[`ovelhas-${modo.id}`] || 0) >= n ? 'ganha' : ''}"></i>`).join('')}</span>
          </button>`).join('')}</div>
      </div>
    </div>`;
  document.getElementById('jogo-voltar').addEventListener('click', () => mostrarListaDeJogos());
  lugar.querySelectorAll('.pastor-modo').forEach((botao) => {
    botao.addEventListener('click', () => comecarJogo(jogo.id, { nivel: Number(botao.dataset.modo) }));
  });
  window.scrollTo({ top: 0, behavior: 'auto' });
}

function jogoDasOvelhas(area) {
  const sessao = jogoAtual;
  const naTrilha = sessao.fase !== undefined;
  const modo = MODOS_DO_BOM_PASTOR[naTrilha ? 0 : Math.min(3, Math.max(0, sessao.nivel || 0))];
  const arrastar = modo.id > 0;
  const visiveis = naTrilha ? [3, 4, 5][sessao.nivel] || 3 : modo.ovelhas;
  const temPerdida = modo.arbustos > 0;
  const total = visiveis + (temPerdida ? 1 : 0);
  const estado = { fase: 'pastoreio', arbustoCerto: -1, porteiraAberta: true, coracoes: modo.coracoes, tempo: modo.tempo, guardadas: 0, errosNoArbusto: 0, lobosEspantados: 0 };
  sessao.pastor = estado;
  const coracaoSvg = '<svg viewBox="0 0 24 22" aria-hidden="true"><path d="M12 21 C5 15 1 11 1 6.5 C1 3.4 3.4 1 6.4 1 C8.6 1 10.6 2.3 12 4.3 C13.4 2.3 15.4 1 17.6 1 C20.6 1 23 3.4 23 6.5 C23 11 19 15 12 21 Z"/></svg>';
  const flores = Array.from({ length: 16 }, (_, i) => `<span class="pastor-flor" style="left:${(3 + Math.random() * 58).toFixed(1)}%;top:${(36 + Math.random() * 60).toFixed(1)}%;--cor:${['#ffffff', '#ffe066', '#ff9ec4', '#c9a8ff'][i % 4]};--d:${(Math.random() * 3).toFixed(2)}s"></span>`).join('');
  const vagalumes = Array.from({ length: 10 }, () => `<i style="left:${(4 + Math.random() * 90).toFixed(1)}%;top:${(36 + Math.random() * 58).toFixed(1)}%;--d:${(Math.random() * 4).toFixed(2)}s"></i>`).join('');
  area.innerHTML = `
    <div class="pastor-pasto modo-${modo.id}${arrastar ? ' arrastar' : ''}" id="pastor-pasto">
      <div class="pastor-ceu"><span class="pastor-estrelas"></span><span class="pastor-sol"></span><span class="pastor-lua"></span><span class="pastor-nuvem n1"></span><span class="pastor-nuvem n2"></span><span class="pastor-nuvem n3"></span>
        <svg class="pastor-morros" viewBox="0 0 400 80" preserveAspectRatio="none" aria-hidden="true"><path d="M0 52 C60 20 120 24 180 46 C230 62 270 30 330 26 C360 24 385 34 400 40 V80 H0 Z" fill="#9fd7a0"/><g class="pastor-igrejinha" fill="#f5efe1" stroke="#b8a888" stroke-width="1"><rect x="318" y="14" width="16" height="14"/><path d="M316 15 L326 6 L336 15 Z" fill="#c9705a"/><rect x="323" y="-2" width="6" height="10"/><path d="M326 -8 V-2 M323.5 -5.5 H328.5" stroke="#b8902f" stroke-width="1.4"/><rect x="324" y="20" width="4" height="8" fill="#8a5a3a" stroke="none"/></g><path d="M0 64 C70 44 150 50 220 62 C290 74 340 52 400 56 V80 H0 Z" fill="#7cc77e"/></svg>
      </div>
      <div class="pastor-grama"></div>
      ${flores}
      <span class="pastor-arvore" style="left:-3%;top:22%;--t:1.05">${desenhoDaArvoreDoPastor()}</span>
      <span class="pastor-arvore" style="left:-6%;top:44%;--t:1.2">${desenhoDaArvoreDoPastor()}</span>
      <span class="pastor-arvore" style="left:-4%;top:66%;--t:1.35">${desenhoDaArvoreDoPastor()}</span>
      <div class="pastor-curral${modo.porteira ? ' com-porteira' : ''}" id="pastor-curral">
        <span class="pastor-curral-chao"></span>
        <svg class="pastor-cerca" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <g fill="none" stroke-linecap="round" vector-effect="non-scaling-stroke">
            <path d="M3 4 H97 M3 10 H97 M97 4 V96 M3 4 V34 M3 74 V96 M3 90 H97 M3 96 H97" stroke="#7a4b18" stroke-width="5" vector-effect="non-scaling-stroke"/>
            <path d="M3 3 H97 M3 89 H97" stroke="#c88f4a" stroke-width="1.6" vector-effect="non-scaling-stroke"/>
          </g>
          <g stroke="#5e3810" stroke-width="7" stroke-linecap="round">${[3, 27, 51, 75, 97].map((x) => `<path d="M${x} 0 V12 M${x} 84 V100" vector-effect="non-scaling-stroke"/>`).join('')}<path d="M3 34 V36 M3 72 V74 M97 50 V52" vector-effect="non-scaling-stroke"/></g>
        </svg>
        <span class="pastor-porteira"></span>
        <span class="pastor-porteira-luz"></span>
        <span class="pastor-lampiao"><i></i></span>
      </div>
      <div class="pastor-mundo" id="pastor-mundo"></div>
      <div class="pastor-noite"></div>
      <div class="pastor-vagalumes">${vagalumes}</div>
      <div class="pastor-hud">
        <span class="pastor-selo">${textoDoJogo(modo.rotulo)}</span>
        ${modo.coracoes ? `<span class="pastor-coracoes" id="pastor-coracoes">${Array.from({ length: modo.coracoes }, () => `<i>${coracaoSvg}</i>`).join('')}</span>` : ''}
        ${modo.tempo ? '<span class="pastor-tempo" id="pastor-tempo"><i></i></span>' : ''}
      </div>
      <span class="pastor-mao" id="pastor-mao"><svg viewBox="0 0 40 46" aria-hidden="true"><path d="M14 4 C14 1 19 1 19 4 V20 L21 19 C21 16 26 16 26 19 V21 C26 18 31 18 31 21 V23 C31 21 36 21 36 24 V32 C36 40 31 45 23 45 C17 45 13 42 10 37 L4 27 C2 24 6 21 9 24 L14 29 Z" fill="#fff" stroke="#3a2a1a" stroke-width="2" stroke-linejoin="round"/></svg></span>
    </div>`;
  const pasto = area.querySelector('#pastor-pasto');
  const mundo = area.querySelector('#pastor-mundo');
  const curralEl = area.querySelector('#pastor-curral');
  const tempoEl = area.querySelector('#pastor-tempo');
  const coracoesEl = area.querySelector('#pastor-coracoes');
  const maoEl = area.querySelector('#pastor-mao');
  const ovelhas = [];
  const lobos = [];
  const arbustos = [];
  let largura = 0;
  let altura = 0;
  let tamanho = 60;
  let escala = 1;
  let curral = { x0: 0, y0: 0, x1: 0, y1: 0 };
  let proximaVaga = 0;
  let arrasto = null;
  let luz = { x: 0, y: 0 };
  let avisouLobo = false;
  let mostrouMao = false;
  let fimEm = 0;

  const limitar = (valor, minimo, maximo) => Math.max(minimo, Math.min(maximo, valor));
  const area0 = () => ({ x0: tamanho * 0.95, x1: Math.max(tamanho, curral.x0 - tamanho * 0.75), y0: altura * 0.36 + tamanho * 0.7, y1: altura - 6 });
  const pontoLivre = () => { const r = area0(); return { x: r.x0 + Math.random() * (r.x1 - r.x0), y: r.y0 + Math.random() * (r.y1 - r.y0) }; };
  const portaY = () => curral.y0 + (curral.y1 - curral.y0) * 0.56 + tamanho * 0.3;
  const vaga = (i) => {
    const larg = curral.x1 - curral.x0;
    const alt = curral.y1 - curral.y0;
    const colunas = Math.max(2, Math.floor(larg / (tamanho * 0.7)));
    const linhas = Math.max(1, Math.ceil(total / colunas));
    const linha = Math.floor(i / colunas);
    const topo = curral.y0 + tamanho * 0.62;
    const fundo = curral.y1 - tamanho * 0.3;
    return { x: curral.x0 + larg * ((i % colunas) + 0.5) / colunas + (linha % 2 ? tamanho * 0.12 : -tamanho * 0.05), y: linhas > 1 ? topo + (fundo - topo) * (linha / (linhas - 1)) : (topo + fundo) / 2 };
  };
  const medir = () => {
    const caixa = pasto.getBoundingClientRect();
    if (!caixa.width) return;
    const antes = { w: largura, h: altura };
    largura = caixa.width;
    altura = caixa.height;
    tamanho = arrastar ? limitar(largura * 0.12, 46, 74) : limitar(largura * 0.15, 54, 84);
    escala = limitar(largura / 420, 0.85, 1.5);
    pasto.style.setProperty('--s', `${tamanho.toFixed(1)}px`);
    const c = curralEl.getBoundingClientRect();
    curral = { x0: c.left - caixa.left, y0: c.top - caixa.top, x1: c.right - caixa.left, y1: c.bottom - caixa.top };
    pasto.style.setProperty('--cx', `${((curral.x0 + curral.x1) / 2).toFixed(0)}px`);
    pasto.style.setProperty('--cy', `${((curral.y0 + curral.y1) / 2).toFixed(0)}px`);
    if (antes.w && (antes.w !== largura || antes.h !== altura)) {
      const fx = largura / antes.w;
      const fy = altura / antes.h;
      ovelhas.concat(lobos, arbustos).forEach((ente) => { ente.x *= fx; ente.y *= fy; if (ente.alvo && ente.alvo.x !== undefined && !ente.alvo.el) { ente.alvo = { x: ente.alvo.x * fx, y: ente.alvo.y * fy }; } });
      ovelhas.forEach((o) => { if (o.estado === 'guardada' && o.vaga >= 0) Object.assign(o, vaga(o.vaga)); });
    }
    if (!luz.x) luz = { x: largura * 0.3, y: altura * 0.65 };
  };
  medir();

  const virar = (ente, lado) => { if (ente.lado !== lado) { ente.lado = lado; ente.el.dataset.lado = lado; } };
  const mudar = (ente, novo) => { if (ente.estado !== novo) { ente.estado = novo; ente.el.dataset.estado = novo; } };
  const andarAte = (ente, alvo, velocidade, dt) => {
    const dx = alvo.x - ente.x;
    const dy = alvo.y - ente.y;
    const distancia = Math.hypot(dx, dy);
    if (distancia < 2) { ente.x = alvo.x; ente.y = alvo.y; return true; }
    const passo = Math.min(distancia, velocidade * dt);
    ente.x += (dx / distancia) * passo;
    ente.y += (dy / distancia) * passo;
    if (Math.abs(dx) > 1.5) virar(ente, dx > 0 ? 'd' : 'e');
    return false;
  };
  const desenhar = (ente, w, h, z) => {
    ente.el.style.transform = `translate3d(${(ente.x - w / 2).toFixed(1)}px, ${(ente.y - h).toFixed(1)}px, 0)`;
    ente.el.style.zIndex = String(z !== undefined ? z : Math.round(ente.y) + 10);
  };
  const falaNoPasto = (x, y, texto, classe) => {
    const fala = document.createElement('span');
    fala.className = `pastor-fala ${classe || ''}`;
    fala.textContent = texto;
    fala.style.left = `${x.toFixed(0)}px`;
    fala.style.top = `${y.toFixed(0)}px`;
    pasto.appendChild(fala);
    setTimeout(() => fala.remove(), 1500);
  };
  const coracoesQueSobem = (x, y, quantos) => {
    for (let i = 0; i < quantos; i += 1) {
      const c = document.createElement('span');
      c.className = 'pastor-coracaozinho';
      c.innerHTML = coracaoSvg;
      c.style.cssText = `left:${(x + (Math.random() - 0.5) * tamanho * 0.7).toFixed(0)}px;top:${(y - tamanho * 0.6).toFixed(0)}px;--x:${((Math.random() - 0.5) * 40).toFixed(0)}px;animation-delay:${(i * 0.12).toFixed(2)}s`;
      pasto.appendChild(c);
      setTimeout(() => c.remove(), 1700);
    }
  };
  const pontoDoPonteiro = (evento) => {
    const caixa = pasto.getBoundingClientRect();
    return { x: evento.clientX - caixa.left, y: evento.clientY - caixa.top };
  };
  const dentroDoCurral = (p) => p.x >= curral.x0 - 8 && p.x <= curral.x1 + 8 && p.y >= curral.y0 - 12 && p.y <= curral.y1 + 8;
  const livre = (o) => ['pastando', 'andando', 'correndo'].includes(o.estado);
  const atualizarLuz = (p) => {
    luz = p;
    pasto.style.setProperty('--lx', `${p.x.toFixed(0)}px`);
    pasto.style.setProperty('--ly', `${p.y.toFixed(0)}px`);
  };
  atualizarLuz(luz);

  const contarGuardada = (o) => {
    if (o.vaga < 0) { o.vaga = proximaVaga; proximaVaga += 1; }
    o.el.classList.add('guardada');
    mudar(o, 'entrando');
    estado.guardadas += 1;
    placarDoJogo(`${estado.guardadas}/${total}`);
    tocarNotaDoJogo(440 + estado.guardadas * 45);
    tocarSomDoPastor('bee-feliz');
    coracoesQueSobem(o.x, o.y, 3);
    falaNoPasto(o.x, o.y - tamanho * 0.9, textoDoJogo('Béé!'));
    if (estado.guardadas < visiveis) {
      if (estado.guardadas % 3 === 0) falarNoJogo(textoDoJogo(sortearDoJogo(['Mais uma em casa!', 'Muito bem, pastor!', 'Isso! Continue assim!'])), 'feliz');
      else reagirPersonagem('feliz');
    }
    if (estado.guardadas === visiveis && temPerdida) comecarProcura();
    else if (estado.guardadas >= total) vencer();
  };

  const criarOvelha = (x, y, opcoes) => {
    const el = document.createElement('button');
    el.type = 'button';
    el.className = `pastor-ovelha${opcoes && opcoes.perdida ? ' perdida' : ''}`;
    el.setAttribute('aria-label', textoDoJogo('Ovelhinha'));
    el.innerHTML = `<span class="pastor-sombra"></span><span class="pastor-corpo">${desenhoDaOvelhaDoPastor(opcoes && opcoes.preta)}</span>`;
    el.style.setProperty('--piscar', `${(Math.random() * 4).toFixed(2)}s`);
    const o = { el, x, y, estado: '', ate: Math.random() * 2, alvo: null, lado: '', vaga: -1, caminho: [], perdida: !!(opcoes && opcoes.perdida) };
    mudar(o, 'pastando');
    virar(o, Math.random() < 0.5 ? 'd' : 'e');
    el.addEventListener('click', (evento) => {
      if (sessao.fim || estado.fase === 'fim' || !livre(o)) return;
      if (arrastar && evento.detail !== 0) return;
      o.vaga = proximaVaga;
      proximaVaga += 1;
      o.caminho = [{ x: curral.x0 - tamanho * 0.45, y: portaY() }, { x: curral.x0 + tamanho * 0.5, y: portaY() }];
      mudar(o, 'indo');
      tocarSomDoPastor('bee');
      falaNoPasto(o.x, o.y - tamanho * 0.9, textoDoJogo('Béé!'));
      reagirPersonagem('feliz');
    });
    el.addEventListener('pointerdown', (evento) => {
      if (!arrastar || sessao.fim || estado.fase === 'fim' || !livre(o) || arrasto) return;
      evento.preventDefault();
      const p = pontoDoPonteiro(evento);
      arrasto = { o, id: evento.pointerId, x0: p.x, y0: p.y, moveu: false };
      mudar(o, 'segurada');
      atualizarLuz(p);
      tocarSomDoPastor('bee');
      maoEl.classList.remove('mostrando');
      mostrouMao = true;
    });
    mundo.appendChild(el);
    ovelhas.push(o);
    return o;
  };

  const criarArbusto = (x, y, i) => {
    const el = document.createElement('button');
    el.type = 'button';
    el.className = 'pastor-arbusto';
    el.dataset.arbusto = String(i);
    el.setAttribute('aria-label', textoDoJogo('Arbusto'));
    el.innerHTML = desenhoDoArbusto();
    const a = { el, x, y, estado: 'parado' };
    el.addEventListener('click', () => {
      if (sessao.fim) return;
      el.classList.remove('mexendo', 'errado');
      void el.offsetWidth;
      if (estado.fase !== 'perdida') { el.classList.add('mexendo'); return; }
      if (i === estado.arbustoCerto) { acharPerdida(a); return; }
      estado.errosNoArbusto += 1;
      el.classList.add('errado');
      errouNoJogo(textoDoJogo('Não está aqui. Escute o béé de novo!'), null);
      const passaro = document.createElement('span');
      passaro.className = 'pastor-passaro';
      passaro.innerHTML = '<svg viewBox="0 0 40 20" aria-hidden="true"><path d="M2 12 C8 4 14 4 20 11 C26 4 32 4 38 12" fill="none" stroke="#3a3a4a" stroke-width="3" stroke-linecap="round"/></svg>';
      passaro.style.left = `${a.x.toFixed(0)}px`;
      passaro.style.top = `${(a.y - tamanho * 0.7).toFixed(0)}px`;
      pasto.appendChild(passaro);
      setTimeout(() => passaro.remove(), 1300);
    });
    mundo.appendChild(el);
    arbustos.push(a);
  };

  const comecarProcura = () => {
    estado.fase = 'perdida';
    estado.arbustoCerto = Math.floor(Math.random() * arbustos.length);
    pasto.classList.add('procurando');
    falarNoJogo(textoDoJogo('Falta uma! A ovelhinha perdida está escondida num arbusto. Escute o béé e toque no arbusto certo.'));
    const chamar = () => {
      if (sessao.fim || estado.fase !== 'perdida') return;
      const a = arbustos[estado.arbustoCerto];
      a.el.classList.remove('mexendo');
      void a.el.offsetWidth;
      a.el.classList.add('mexendo');
      tocarSomDoPastor('bee');
      falaNoPasto(a.x, a.y - tamanho * 0.75, textoDoJogo('Béé!'), modo.id >= 3 ? 'fraca' : '');
      if (modo.id >= 2 && arbustos.length > 1) {
        const outro = arbustos.filter((b) => b !== a)[Math.floor(Math.random() * (arbustos.length - 1))];
        agendarNoJogo(() => { outro.el.classList.remove('mexendo'); void outro.el.offsetWidth; outro.el.classList.add('mexendo'); }, 700);
      }
      agendarNoJogo(chamar, modo.id >= 3 ? 3000 : 2300);
    };
    agendarNoJogo(chamar, 1200);
  };

  const acharPerdida = (a) => {
    estado.fase = 'achou';
    pasto.classList.remove('procurando');
    a.el.classList.add('mexendo');
    const o = criarOvelha(a.x + tamanho * 0.1, a.y + 2, { perdida: true });
    o.el.classList.add('saindo');
    mudar(o, 'achada');
    tocarSomDoPastor('bee-feliz');
    coracoesQueSobem(o.x, o.y, 6);
    festaNoJogo(a.el, 14);
    acertouNoJogo(textoDoJogo('Alegrem-se comigo! Encontrei a minha ovelha perdida!'), null);
    agendarNoJogo(() => {
      o.el.classList.remove('saindo');
      o.vaga = proximaVaga;
      proximaVaga += 1;
      o.caminho = [{ x: curral.x0 - tamanho * 0.45, y: portaY() }, { x: curral.x0 + tamanho * 0.5, y: portaY() }];
      mudar(o, 'indo');
    }, 1100);
  };

  const vencer = () => {
    estado.fase = 'fim';
    fimEm = performance.now();
    let estrelas = 3;
    if (!naTrilha && modo.id > 0) {
      estrelas -= modo.coracoes - estado.coracoes;
      if (estado.errosNoArbusto > 1) estrelas -= 1;
      if (modo.tempo && estado.tempo / modo.tempo < 0.15) estrelas -= 1;
      estrelas = Math.max(1, estrelas);
    }
    lobos.forEach((l) => { mudar(l, 'fugindo'); l.alvo = { x: -tamanho * 2.5, y: l.y }; });
    agendarNoJogo(() => {
      ovelhas.forEach((o, i) => { o.el.style.setProperty('--atraso', `${(i * 0.08).toFixed(2)}s`); o.el.classList.add('festa'); });
      festaNoJogo(curralEl, 20);
      tocarSomDoPastor('bee-feliz');
    }, 500);
    if (!naTrilha) guardarRecordeDoJogo(`ovelhas-${modo.id}`, estrelas);
    const mensagem = temPerdida ? textoDoJogo('Nenhuma ficou para trás. O Bom Pastor cuida de cada ovelha!') : textoDoJogo('O Bom Pastor cuida de cada ovelha.');
    agendarNoJogo(() => terminarJogo(estrelas, mensagem), 1900);
  };

  const perder = (motivo) => {
    if (estado.fase === 'fim') return;
    estado.fase = 'fim';
    fimEm = performance.now();
    if (arrasto) { mudar(arrasto.o, 'pastando'); arrasto = null; }
    lobos.forEach((l) => { mudar(l, 'fugindo'); l.alvo = { x: -tamanho * 2.5, y: l.y }; });
    const mensagem = motivo === 'tempo' ? textoDoJogo('O tempo acabou antes de todas voltarem. Tente de novo!') : textoDoJogo('O lobo assustou ovelhas demais. Tente de novo!');
    agendarNoJogo(() => terminarJogo(0, mensagem), 1300);
  };

  const espantar = (l) => {
    if (sessao.fim || l.estado !== 'cacando') return;
    l.toques += 1;
    l.el.classList.remove('tremeu');
    void l.el.offsetWidth;
    l.el.classList.add('tremeu');
    if (l.toques < (modo.toquesNoLobo || 1)) {
      l.x -= tamanho * 0.4;
      tocarSomDoPastor('toque');
      falaNoPasto(l.x, l.y - tamanho, textoDoJogo('Mais um!'), 'alerta');
      return;
    }
    mudar(l, 'fugindo');
    l.alvo = { x: -tamanho * 2.5, y: l.y + (Math.random() - 0.5) * tamanho };
    estado.lobosEspantados += 1;
    tocarSomDoPastor('espantou');
    festaNoJogo(l.el, 8);
    falaNoPasto(l.x, l.y - tamanho, textoDoJogo('Xô, lobo!'));
    acertouNoJogo(estado.lobosEspantados === 1 ? textoDoJogo('Isso! O lobo fugiu!') : '', null);
  };

  const criarLobo = (y) => {
    if (sessao.fim || estado.fase !== 'pastoreio') return;
    const el = document.createElement('button');
    el.type = 'button';
    el.className = 'pastor-lobo';
    el.setAttribute('aria-label', textoDoJogo('Lobo'));
    el.innerHTML = `<span class="pastor-sombra"></span><span class="pastor-corpo">${desenhoDoLobo()}</span><span class="lobo-brilho"><i></i></span>`;
    const l = { el, x: -tamanho * 1.4, y, estado: '', toques: 0, alvo: null, lado: '' };
    mudar(l, 'cacando');
    virar(l, 'd');
    el.addEventListener('pointerdown', (evento) => { evento.preventDefault(); evento.stopPropagation(); espantar(l); });
    el.addEventListener('click', (evento) => { if (evento.detail === 0) espantar(l); });
    mundo.appendChild(el);
    lobos.push(l);
  };

  const soltarLobo = () => {
    if (sessao.fim || estado.fase !== 'pastoreio') return;
    if (lobos.filter((l) => l.estado === 'cacando').length >= modo.lobos) return;
    if (!ovelhas.some(livre)) return;
    const r = area0();
    const y = r.y0 + Math.random() * (r.y1 - r.y0);
    tocarSomDoPastor('uivo');
    const aviso = document.createElement('span');
    aviso.className = 'pastor-aviso';
    aviso.textContent = '!';
    aviso.style.top = `${(y - tamanho * 0.5).toFixed(0)}px`;
    pasto.appendChild(aviso);
    setTimeout(() => aviso.remove(), 1300);
    if (!avisouLobo) { avisouLobo = true; falarNoJogo(textoDoJogo(modo.toquesNoLobo > 1 ? 'O lobo vem aí! Toque nele duas vezes para espantar.' : 'O lobo vem aí! Toque nele para espantar.'), 'ops'); }
    agendarNoJogo(() => criarLobo(y), 1150);
  };

  const pegou = (l, o) => {
    mudar(o, 'correndo');
    const r = area0();
    o.alvo = { x: limitar(o.x + (o.x - l.x) * 2.5 + (Math.random() - 0.5) * tamanho, r.x0, r.x1), y: r.y0 + Math.random() * (r.y1 - r.y0) };
    falaNoPasto(o.x, o.y - tamanho * 0.9, '!', 'alerta');
    tocarSomDoPastor('bee');
    mudar(l, 'fugindo');
    l.alvo = { x: -tamanho * 2.5, y: l.y };
    estado.coracoes -= 1;
    if (coracoesEl) {
      const perdido = coracoesEl.querySelectorAll('i:not(.perdido)');
      if (perdido.length) perdido[perdido.length - 1].classList.add('perdido');
    }
    pasto.classList.remove('susto');
    void pasto.offsetWidth;
    pasto.classList.add('susto');
    errouNoJogo(textoDoJogo('O lobo assustou uma ovelha! Proteja as outras.'), null);
    if (estado.coracoes <= 0) perder('lobo');
  };

  const mover = (evento) => {
    if (sessao.fim) return;
    const p = pontoDoPonteiro(evento);
    if (modo.noite) atualizarLuz(p);
    if (!arrasto || evento.pointerId !== arrasto.id) return;
    if (Math.hypot(p.x - arrasto.x0, p.y - arrasto.y0) > 8) arrasto.moveu = true;
    arrasto.o.x = limitar(p.x, tamanho * 0.45, largura - tamanho * 0.45);
    arrasto.o.y = limitar(p.y + tamanho * 0.42, altura * 0.3 + tamanho * 0.6, altura - 4);
    if (arrasto.o.x > arrasto.x0 + 2) virar(arrasto.o, 'd');
  };
  const soltar = (evento) => {
    if (!arrasto || evento.pointerId !== arrasto.id) return;
    const { o, moveu } = arrasto;
    arrasto = null;
    if (sessao.fim || estado.fase === 'fim') { mudar(o, 'pastando'); return; }
    const p = pontoDoPonteiro(evento);
    if (dentroDoCurral(p)) {
      if (modo.porteira && !estado.porteiraAberta) {
        o.x = curral.x0 - tamanho * 0.6;
        o.y = limitar(o.y, area0().y0, altura - 6);
        mudar(o, 'pastando');
        o.ate = 0.8;
        o.el.classList.remove('bateu');
        void o.el.offsetWidth;
        o.el.classList.add('bateu');
        somDoJogo('errado');
        falarNoJogo(textoDoJogo('A porteira está fechada! Espere ficar verde.'), 'ops');
        return;
      }
      contarGuardada(o);
      return;
    }
    const r = area0();
    o.x = limitar(o.x, r.x0, r.x1 + tamanho * 0.3);
    o.y = limitar(o.y, r.y0, r.y1);
    mudar(o, 'pastando');
    o.ate = 0.5 + Math.random();
    if (!moveu) {
      falarNoJogo(textoDoJogo('Segure a ovelhinha e arraste até o curral.'));
      mostrarMao(o);
    }
  };
  const mostrarMao = (o) => {
    if (!o) return;
    pasto.style.setProperty('--mx0', `${(o.x - 10).toFixed(0)}px`);
    pasto.style.setProperty('--my0', `${(o.y - tamanho * 0.5).toFixed(0)}px`);
    pasto.style.setProperty('--mx1', `${((curral.x0 + curral.x1) / 2 - 10).toFixed(0)}px`);
    pasto.style.setProperty('--my1', `${((curral.y0 + curral.y1) / 2).toFixed(0)}px`);
    maoEl.classList.remove('mostrando');
    void maoEl.offsetWidth;
    maoEl.classList.add('mostrando');
  };
  const luzDoPasto = (evento) => { if (modo.noite && !sessao.fim) atualizarLuz(pontoDoPonteiro(evento)); };
  window.addEventListener('pointermove', mover);
  window.addEventListener('pointerup', soltar);
  window.addEventListener('pointercancel', soltar);
  pasto.addEventListener('pointerdown', luzDoPasto);
  const observador = typeof ResizeObserver === 'function' ? new ResizeObserver(() => medir()) : null;
  if (observador) observador.observe(pasto);
  sessao.limpezas.push(() => {
    window.removeEventListener('pointermove', mover);
    window.removeEventListener('pointerup', soltar);
    window.removeEventListener('pointercancel', soltar);
    if (observador) observador.disconnect();
  });

  LUGARES_DOS_ARBUSTOS.slice(0, modo.arbustos).forEach(([fx, fy], i) => {
    const r = area0();
    criarArbusto(r.x0 + (r.x1 - r.x0) * fx, r.y0 + (r.y1 - r.y0) * fy, i);
  });
  const espalhadas = [];
  for (let i = 0; i < visiveis; i += 1) {
    let ponto = pontoLivre();
    for (let tentativa = 0; tentativa < 12; tentativa += 1) {
      const longe = espalhadas.concat(arbustos).every((q) => Math.hypot(q.x - ponto.x, q.y - ponto.y) > tamanho * 0.8);
      if (longe) break;
      ponto = pontoLivre();
    }
    espalhadas.push(ponto);
    criarOvelha(ponto.x, ponto.y, { preta: modo.id > 0 && i === 1 });
  }
  placarDoJogo(`0/${total}`);
  if (!arrastar) falarNoJogo(textoDoJogo('Toque nas ovelhinhas e elas vão sozinhas para o curral!'));
  else {
    falarNoJogo(textoDoJogo(temPerdida ? 'Arraste as ovelhas até o curral. E fique atento: uma delas está perdida!' : 'Arraste as ovelhas até o curral!'));
    agendarNoJogo(() => { if (!mostrouMao) mostrarMao(ovelhas[0]); }, 900);
  }
  if (modo.lobos) {
    agendarNoJogo(soltarLobo, modo.id >= 3 ? 5000 : 6000);
    repetirNoJogo(soltarLobo, modo.intervaloDoLobo);
  }
  if (modo.porteira) {
    const alternar = () => {
      if (sessao.fim || estado.fase === 'fim') return;
      estado.porteiraAberta = !estado.porteiraAberta;
      curralEl.classList.toggle('fechada', !estado.porteiraAberta);
      if (estado.porteiraAberta) tocarNotaDoJogo(660);
      else tocarSomDoPastor('porteira');
      agendarNoJogo(alternar, estado.porteiraAberta ? 4200 : 2600);
    };
    agendarNoJogo(() => {
      if (estado.fase !== 'pastoreio') return;
      falarNoJogo(textoDoJogo('Atenção: a porteira vai abrir e fechar. Só dá para entrar com a luz verde!'));
      alternar();
    }, 7000);
  }
  if (modo.noite) {
    agendarNoJogo(() => {
      if (sessao.fim) return;
      pasto.classList.add('noite');
      falarNoJogo(textoDoJogo('A noite chegou! A luz segue o seu dedo. Procure as ovelhas no escuro.'));
    }, 22000);
  }
  repetirNoJogo(() => {
    const soltas = ovelhas.filter(livre);
    if (!soltas.length || estado.fase !== 'pastoreio') return;
    const o = sortearDoJogo(soltas);
    falaNoPasto(o.x, o.y - tamanho * 0.9, textoDoJogo('Béé!'), 'pequena');
    if (Math.random() < 0.35) tocarSomDoPastor('bee');
  }, 3600);

  let ultimo = performance.now();
  let ultimoTempo = -1;
  const quadro = (agora) => {
    if (jogoAtual !== sessao || !pasto.isConnected) {
      sessao.limpezas.forEach((f) => f());
      sessao.limpezas = [];
      return;
    }
    if (fimEm && agora - fimEm > 6000) return;
    const dt = Math.min(0.05, Math.max(0, (agora - ultimo) / 1000));
    ultimo = agora;
    const velocidade = modo.passo * escala;
    if (modo.tempo && estado.fase !== 'fim' && !sessao.fim) {
      estado.tempo = Math.max(0, estado.tempo - dt);
      const porcento = Math.round((estado.tempo / modo.tempo) * 1000) / 10;
      if (tempoEl && porcento !== ultimoTempo) {
        ultimoTempo = porcento;
        tempoEl.firstElementChild.style.width = `${porcento}%`;
        tempoEl.classList.toggle('acabando', porcento < 20);
      }
      if (estado.tempo <= 0) perder('tempo');
    }
    ovelhas.forEach((o) => {
      if (o.estado === 'pastando') {
        o.ate -= dt;
        if (o.ate <= 0 && estado.fase !== 'fim') { o.alvo = pontoLivre(); o.ate = 2 + Math.random() * 3; mudar(o, 'andando'); }
      } else if (o.estado === 'andando') {
        o.ate -= dt;
        if (andarAte(o, o.alvo, velocidade, dt) || o.ate <= 0) {
          if (modo.id >= 3 && Math.random() < 0.25) { o.alvo = pontoLivre(); mudar(o, 'correndo'); } else { mudar(o, 'pastando'); o.ate = (modo.id >= 3 ? 0.5 : 1.3) + Math.random() * 2.2; }
        }
      } else if (o.estado === 'correndo') {
        if (andarAte(o, o.alvo, velocidade * 2.6, dt)) { mudar(o, 'pastando'); o.ate = 0.8; }
      } else if (o.estado === 'indo') {
        if (andarAte(o, o.caminho[0], 125 * escala, dt)) {
          o.caminho.shift();
          if (!o.caminho.length) contarGuardada(o);
        }
      } else if (o.estado === 'entrando') {
        if (andarAte(o, vaga(o.vaga), 170 * escala, dt)) { mudar(o, 'guardada'); virar(o, Math.random() < 0.5 ? 'd' : 'e'); }
      }
    });
    const soltas = ovelhas.filter(livre);
    for (let i = 0; i < soltas.length; i += 1) {
      for (let j = i + 1; j < soltas.length; j += 1) {
        const a = soltas[i];
        const b = soltas[j];
        const dx = b.x - a.x;
        const dy = (b.y - a.y) * 1.6;
        const d = Math.hypot(dx, dy) || 0.01;
        const minimo = tamanho * 0.62;
        if (d < minimo) {
          const empurrao = ((minimo - d) / d) * 0.5;
          a.x -= dx * empurrao * 0.5; a.y -= (dy / 1.6) * empurrao * 0.5;
          b.x += dx * empurrao * 0.5; b.y += (dy / 1.6) * empurrao * 0.5;
        }
      }
    }
    const r = area0();
    soltas.forEach((o) => { o.x = limitar(o.x, r.x0 * 0.6, r.x1 + tamanho * 0.3); o.y = limitar(o.y, r.y0 - tamanho * 0.2, r.y1); });
    for (let i = lobos.length - 1; i >= 0; i -= 1) {
      const l = lobos[i];
      if (l.estado === 'cacando') {
        if (!l.alvo || !livre(l.alvo)) {
          const candidatas = ovelhas.filter(livre);
          l.alvo = candidatas.sort((a, b) => Math.hypot(a.x - l.x, a.y - l.y) - Math.hypot(b.x - l.x, b.y - l.y))[0] || null;
        }
        if (!l.alvo) { mudar(l, 'fugindo'); l.alvo = { x: -tamanho * 2.5, y: l.y }; } else {
          andarAte(l, l.alvo, modo.passoDoLobo * escala, dt);
          if (Math.hypot(l.alvo.x - l.x, l.alvo.y - l.y) < tamanho * 0.55) pegou(l, l.alvo);
        }
      } else if (l.estado === 'fugindo') {
        if (andarAte(l, l.alvo, modo.passoDoLobo * escala * 2.6, dt) || l.x < -tamanho * 2) { l.el.remove(); lobos.splice(i, 1); continue; }
      }
      if (modo.noite) l.el.classList.toggle('iluminado', Math.hypot(l.x - luz.x, l.y - tamanho * 0.4 - luz.y) < tamanho * 1.7);
    }
    arbustos.forEach((a) => desenhar(a, tamanho * 1.25, tamanho * 0.9));
    ovelhas.forEach((o) => desenhar(o, tamanho, tamanho * 0.84, o.estado === 'segurada' ? 950 : undefined));
    lobos.forEach((l) => desenhar(l, tamanho * 1.5, tamanho * 0.95, pasto.classList.contains('noite') ? 1001 : undefined));
    requestAnimationFrame(quadro);
  };
  requestAnimationFrame(quadro);
}

function jogoDoVitral(area) {
  const cores = ['#e8443a', '#2f7de1', '#f2c230', '#36b37e', '#9b59d0'];
  const pedacos = [
    'M60 8 C80 18 94 34 98 54 H22 C26 34 40 18 60 8 Z',
    'M22 58 H58 V96 H22 Z', 'M62 58 H98 V96 H62 Z',
    'M22 100 H58 V140 H22 Z', 'M62 100 H98 V140 H62 Z',
    'M22 144 H98 V170 H22 Z',
  ];
  let cor = cores[0];
  let pintados = 0;
  area.innerHTML = `
    <div class="jogo-vitral">
      <svg class="jogo-vitral-janela" viewBox="0 0 120 178" aria-label="${textoDoJogo('Vitral')}">
        <path d="M14 176 V54 C14 30 34 10 60 2 C86 10 106 30 106 54 V176 Z" fill="#1a1e44" stroke="#d9a93f" stroke-width="4"/>
        ${pedacos.map((d, i) => `<path class="jogo-vitral-pedaco" data-pedaco="${i}" d="${d}" fill="#2a2f5a" stroke="#0e1028" stroke-width="3"/>`).join('')}
        <circle cx="60" cy="38" r="9" fill="none" stroke="#0e1028" stroke-width="3"/>
      </svg>
      <div class="jogo-paleta">${cores.map((c, i) => `<button type="button" class="jogo-cor${i === 0 ? ' ativa' : ''}" data-cor="${c}" style="--c:${c}" aria-label="${textoDoJogo('Cor')}"></button>`).join('')}</div>
    </div>`;
  placarDoJogo(`0/${pedacos.length}`);
  falarNoJogo(textoDoJogo('Escolha uma cor e toque no vitral!'));
  area.querySelectorAll('.jogo-cor').forEach((botao) => {
    botao.addEventListener('click', () => {
      cor = botao.dataset.cor;
      area.querySelectorAll('.jogo-cor').forEach((b) => b.classList.toggle('ativa', b === botao));
    });
  });
  area.querySelectorAll('.jogo-vitral-pedaco').forEach((pedaco) => {
    pedaco.addEventListener('click', () => {
      const novo = !pedaco.classList.contains('pintado');
      pedaco.setAttribute('fill', cor);
      pedaco.classList.remove('pintou');
      void pedaco.getBoundingClientRect();
      pedaco.classList.add('pintado', 'pintou');
      tocarNotaDoJogo(520 + Number(pedaco.dataset.pedaco) * 70);
      if (!novo) return;
      pintados += 1;
      placarDoJogo(`${pintados}/${pedacos.length}`);
      if (pintados >= pedacos.length) {
        area.querySelector('.jogo-vitral').classList.add('brilhando');
        acertouNoJogo('', area.querySelector('.jogo-vitral-janela'));
        agendarNoJogo(() => terminarJogo(3, textoDoJogo('Que vitral lindo! A luz passou por ele.')), 1400);
      } else {
        reagirPersonagem('feliz');
      }
    });
  });
}

function jogoDoDiferente(area) {
  const quantos = [3, 4, 6][jogoAtual.nivel] || 4;
  const rodadas = [3, 4, 5][jogoAtual.nivel] || 4;
  let rodada = 0;
  const mostrar = () => {
    if (rodada >= rodadas) { terminarJogo(estrelasPelosErros(jogoAtual.erros, [0, 2])); return; }
    const [igual, diferente] = embaralharDoJogo(AMIGOS_DOS_JOGOS);
    const posicao = Math.floor(Math.random() * quantos);
    placarDoJogo(`${rodada + 1}/${rodadas}`);
    area.innerHTML = `<div class="jogo-diferente" style="--n:${quantos}">${Array.from({ length: quantos }, (_, i) => `<button type="button" class="jogo-diferente-item" data-certo="${i === posicao}">${htmlDoPersonagem(i === posicao ? diferente : igual)}</button>`).join('')}</div>`;
    falarNoJogo(textoDoJogo('Qual é o diferente?'));
    area.querySelectorAll('.jogo-diferente-item').forEach((botao) => {
      botao.addEventListener('click', () => {
        if (area.querySelector('.jogo-diferente-item.certa')) return;
        if (botao.dataset.certo === 'true') {
          botao.classList.add('certa');
          reagirOutroPersonagem(botao.querySelector('.personagem'), 'feliz');
          acertouNoJogo(textoDoJogo('Achou!'), botao);
          rodada += 1;
          agendarNoJogo(mostrar, 1100);
        } else {
          errouNoJogo(textoDoJogo('Esse é igual aos outros.'), botao);
        }
      });
    });
  };
  mostrar();
}

function jogoDosSinos(area) {
  const notas = [523, 587, 659, 784, 880];
  const cores = ['#f6c76b', '#ff9db0', '#8fd3ff', '#9be3a6', '#c9b8ff'];
  const tons = [0, 300, 170, 80, 230];
  const meta = [10, 14, 18][jogoAtual.nivel] || 12;
  let toques = 0;
  area.innerHTML = `<div class="jogo-sinos">${notas.map((nota, i) => `<button type="button" class="jogo-sino" data-nota="${nota}" style="--c:${cores[i]};--h:${tons[i]}deg;--i:${i}" aria-label="${textoDoJogo('Sino')}"><span class="jogo-sino-corpo">${desenhoDoDom()}</span></button>`).join('')}</div>`;
  placarDoJogo(`0/${meta}`);
  falarNoJogo(textoDoJogo('Toque os sininhos e faça uma música!'));
  area.querySelectorAll('.jogo-sino').forEach((sino) => {
    sino.addEventListener('click', () => {
      tocarNotaDoJogo(Number(sino.dataset.nota));
      sino.classList.remove('tocando');
      void sino.offsetWidth;
      sino.classList.add('tocando');
      const nota = document.createElement('span');
      nota.className = 'jogo-nota-voando';
      nota.innerHTML = '<svg viewBox="0 0 20 24" aria-hidden="true"><path d="M7 20 V4 l10 -3 v15" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="4.5" cy="20" r="3.2" fill="currentColor"/><circle cx="14.5" cy="16" r="3.2" fill="currentColor"/></svg>';
      nota.style.color = sino.style.getPropertyValue('--c');
      sino.appendChild(nota);
      setTimeout(() => nota.remove(), 1100);
      toques += 1;
      placarDoJogo(`${Math.min(toques, meta)}/${meta}`);
      if (toques % 4 === 0) reagirPersonagem('feliz');
      if (toques === meta) agendarNoJogo(() => terminarJogo(3, textoDoJogo('Que música bonita!')), 800);
    });
  });
}

function jogoDeGirar(area) {
  const lado = jogoAtual.nivel >= 2 ? 3 : 2;
  const amigo = sortearDoJogo(AMIGOS_DOS_JOGOS);
  const desenho = htmlDoPersonagem(amigo);
  const giros = Array.from({ length: lado * lado }, () => [90, 180, 270][Math.floor(Math.random() * 3)]);
  area.innerHTML = `
    <div class="jogo-girar">
      <div class="jogo-girar-modelo">${htmlDoPersonagem(amigo)}</div>
      <div class="jogo-girar-quadro" style="--lado:${lado}">${giros.map((giro, i) => `<button type="button" class="jogo-girar-peca" data-peca="${i}" data-giro="${giro}" style="--giro:${giro}deg" aria-label="${textoDoJogo('Pecinha')}"><span class="jogo-girar-dentro" style="--x:${i % lado};--y:${Math.floor(i / lado)}">${desenho}</span></button>`).join('')}</div>
    </div>`;
  const certas = () => area.querySelectorAll('.jogo-girar-peca[data-giro="0"]').length;
  placarDoJogo(`${certas()}/${giros.length}`);
  falarNoJogo(textoDoJogo('Toque nas pecinhas para girar até o desenho ficar certo!'));
  area.querySelectorAll('.jogo-girar-peca').forEach((peca) => {
    let total = Number(peca.dataset.giro);
    peca.addEventListener('click', () => {
      if (area.querySelector('.jogo-girar.pronto')) return;
      total += 90;
      peca.style.setProperty('--giro', `${total}deg`);
      peca.dataset.giro = String(total % 360);
      tocarNotaDoJogo(600);
      placarDoJogo(`${certas()}/${giros.length}`);
      if (certas() === giros.length) {
        area.querySelector('.jogo-girar').classList.add('pronto');
        acertouNoJogo(textoDoJogo('Ficou perfeito!'), area.querySelector('.jogo-girar-quadro'));
        agendarNoJogo(() => terminarJogo(3), 1100);
      }
    });
  });
}

function jogoDaMemoria(area) {
  const pares = jogoAtual.fase !== undefined ? [2, 3, 4][jogoAtual.nivel] : ({ pequeninos: 3, ate7: 4, '8a12': 6 }[idadeDosJogos] || 8);
  const figuras = embaralharDoJogo(FIGURAS_DA_MEMORIA).slice(0, pares);
  const cartas = embaralharDoJogo(figuras.concat(figuras));
  let viradas = [];
  let achados = 0;
  let jogadas = 0;
  area.innerHTML = `<div class="jogo-memoria" style="--colunas:${pares <= 3 ? Math.min(3, pares * 2) : 4}">${cartas.map((figura, i) => `
    <button type="button" class="jogo-carta" data-figura="${figura}" data-i="${i}" aria-label="${textoDoJogo('Carta')}">
      <span class="jogo-carta-dentro"><span class="jogo-carta-costas"></span><span class="jogo-carta-frente">${iconeDoJogo(figura)}</span></span>
    </button>`).join('')}</div>`;
  placarDoJogo(textoDoJogo('{n} jogadas', { n: 0 }));
  falarNoJogo(textoDoJogo('Vire duas cartas e encontre os pares!'));
  area.querySelectorAll('.jogo-carta').forEach((carta) => {
    carta.addEventListener('click', () => {
      if (carta.classList.contains('virada') || viradas.length >= 2) return;
      carta.classList.add('virada');
      viradas.push(carta);
      if (viradas.length < 2) return;
      jogadas += 1;
      placarDoJogo(textoDoJogo('{n} jogadas', { n: jogadas }));
      const [a, b] = viradas;
      if (a.dataset.figura === b.dataset.figura) {
        a.classList.add('par');
        b.classList.add('par');
        viradas = [];
        achados += 1;
        acertouNoJogo(achados < pares ? textoDoJogo('Achou um par!') : '', b);
        if (achados >= pares) agendarNoJogo(() => terminarJogo(estrelasPelosErros(jogadas - pares, [Math.ceil(pares / 2), pares + 2])), 700);
      } else {
        agendarNoJogo(() => {
          a.classList.remove('virada');
          b.classList.remove('virada');
          viradas = [];
        }, 850);
      }
    });
  });
}

function jogoSigaALuz(area) {
  const alvo = { ate7: 3, '8a12': 5, '13a17': 6, adultos: 7 }[idadeDosJogos] || 4;
  const sequencia = [];
  let posicao = 0;
  let mostrando = false;
  area.innerHTML = `<div class="jogo-simon">${AMIGOS_DOS_JOGOS.map((id, i) => `<button type="button" class="jogo-simon-amigo" data-i="${i}" style="--i:${i}">${htmlDoPersonagem(id)}</button>`).join('')}</div>`;
  const amigos = Array.from(area.querySelectorAll('.jogo-simon-amigo'));
  const notas = [523, 659, 784, 988];
  const acender = (i) => {
    const amigo = amigos[i];
    amigo.classList.add('aceso');
    reagirOutroPersonagem(amigo.querySelector('.personagem'), 'feliz');
    tocarNotaDoJogo(notas[i]);
    agendarNoJogo(() => amigo.classList.remove('aceso'), 450);
  };
  const mostrar = () => {
    mostrando = true;
    posicao = 0;
    falarNoJogo(textoDoJogo('Olhe com atenção...'));
    sequencia.forEach((i, n) => agendarNoJogo(() => acender(i), 700 + n * 700));
    agendarNoJogo(() => { mostrando = false; falarNoJogo(textoDoJogo('Agora é a sua vez!')); }, 700 + sequencia.length * 700);
  };
  const crescer = () => {
    sequencia.push(Math.floor(Math.random() * 4));
    placarDoJogo(`${sequencia.length - 1}/${alvo}`);
    mostrar();
  };
  amigos.forEach((amigo, i) => {
    amigo.addEventListener('click', () => {
      if (mostrando || !jogoAtual || jogoAtual.fim) return;
      acender(i);
      if (sequencia[posicao] !== i) {
        errouNoJogo(textoDoJogo('Ops! Vou mostrar de novo.'), amigo);
        agendarNoJogo(mostrar, 900);
        return;
      }
      posicao += 1;
      if (posicao < sequencia.length) return;
      if (sequencia.length >= alvo) {
        placarDoJogo(`${alvo}/${alvo}`);
        agendarNoJogo(() => terminarJogo(estrelasPelosErros(jogoAtual.erros, [0, 2])), 700);
      } else {
        acertouNoJogo(textoDoJogo('Muito bem!'), null);
        agendarNoJogo(crescer, 900);
      }
    });
  });
  crescer();
}

function vencedorDaVelha(casas) {
  const linhas = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
  for (const [a, b, c] of linhas) if (casas[a] && casas[a] === casas[b] && casas[a] === casas[c]) return { quem: casas[a], linha: [a, b, c] };
  return casas.every(Boolean) ? { quem: 'empate' } : null;
}

function melhorJogadaDaVelha(casas, quem) {
  const outro = quem === 'ia' ? 'eu' : 'ia';
  const resultado = vencedorDaVelha(casas);
  if (resultado) return { nota: resultado.quem === 'ia' ? 10 : resultado.quem === 'eu' ? -10 : 0 };
  let melhor = null;
  casas.forEach((casa, i) => {
    if (casa) return;
    casas[i] = quem;
    const nota = melhorJogadaDaVelha(casas, outro).nota;
    casas[i] = '';
    if (!melhor || (quem === 'ia' ? nota > melhor.nota : nota < melhor.nota)) melhor = { nota, casa: i };
  });
  return melhor;
}

function jogadaDaIaNaVelha(casas, nivel) {
  const livres = casas.map((c, i) => (c ? null : i)).filter((i) => i !== null);
  const chance = [0.25, 0.65, 1][nivel];
  if (Math.random() < chance) return melhorJogadaDaVelha(casas.slice(), 'ia').casa;
  return sortearDoJogo(livres);
}

function jogoDaVelha(area) {
  const nivel = jogoAtual.nivel;
  const placar = { eu: 0, ia: 0 };
  let rodada = 0;
  const rodadas = 3;
  const novaRodada = () => {
    const casas = Array(9).fill('');
    let vez = rodada % 2 === 0 ? 'eu' : 'ia';
    area.innerHTML = `
      <div class="jogo-velha">
        <div class="jogo-duelo-placar"><span class="eu"><b>${textoDoJogo('Você')}</b><strong>${placar.eu}</strong></span><span class="ia"><b>Lumi</b><strong>${placar.ia}</strong></span></div>
        <div class="jogo-velha-tabuleiro">${casas.map((_, i) => `<button type="button" class="jogo-velha-casa" data-casa="${i}" aria-label="${textoDoJogo('Casa {n}', { n: i + 1 })}"></button>`).join('')}</div>
      </div>`;
    placarDoJogo(`${rodada + 1}/${rodadas}`);
    const botoes = Array.from(area.querySelectorAll('.jogo-velha-casa'));
    const marcar = (i, quem) => {
      casas[i] = quem;
      botoes[i].classList.add(quem === 'eu' ? 'cruz' : 'estrela');
      botoes[i].innerHTML = quem === 'eu' ? iconeDoJogo('cruz') : ESTRELA_DO_JOGO;
      tocarNotaDoJogo(quem === 'eu' ? 587 : 784);
    };
    const fim = () => {
      const resultado = vencedorDaVelha(casas);
      if (!resultado) return false;
      if (resultado.linha) resultado.linha.forEach((i) => botoes[i].classList.add('vitoria'));
      if (resultado.quem === 'eu') { placar.eu += 1; acertouNoJogo(textoDoJogo('Você ganhou esta!'), area.querySelector('.jogo-velha-tabuleiro')); }
      else if (resultado.quem === 'ia') { placar.ia += 1; falarNoJogo(textoDoJogo('A Lumi ganhou esta!'), 'feliz'); }
      else falarNoJogo(textoDoJogo('Deu velha! Empate.'));
      rodada += 1;
      agendarNoJogo(() => {
        if (rodada >= rodadas) {
          const estrelas = placar.eu > placar.ia ? 3 : placar.eu === placar.ia ? 2 : 1;
          terminarJogo(estrelas, textoDoJogo('Você {eu} x {ia} Lumi', { eu: placar.eu, ia: placar.ia }));
        } else novaRodada();
      }, 1500);
      return true;
    };
    const vezDaIa = () => {
      vez = 'ia';
      falarNoJogo(textoDoJogo('Deixa eu pensar...'));
      agendarNoJogo(() => {
        marcar(jogadaDaIaNaVelha(casas, nivel), 'ia');
        if (!fim()) { vez = 'eu'; falarNoJogo(textoDoJogo('Sua vez!')); }
      }, 700);
    };
    botoes.forEach((botao, i) => {
      botao.addEventListener('click', () => {
        if (vez !== 'eu' || casas[i] || !jogoAtual || jogoAtual.fim) return;
        marcar(i, 'eu');
        if (!fim()) vezDaIa();
      });
    });
    if (vez === 'ia') vezDaIa();
    else falarNoJogo(textoDoJogo('Você é a cruz. Comece!'));
  };
  novaRodada();
}

function jogoDosSimbolos(area) {
  const perguntas = embaralharDoJogo(SIMBOLOS_DOS_SANTOS).slice(0, idadeDosJogos === '8a12' ? 6 : 8);
  const opcoesPorPergunta = idadeDosJogos === '8a12' ? 3 : 4;
  let indice = 0;
  const mostrar = () => {
    if (indice >= perguntas.length) { terminarJogo(estrelasPelosErros(jogoAtual.erros, [0, 2])); return; }
    const pergunta = perguntas[indice];
    const opcoes = embaralharDoJogo([pergunta].concat(embaralharDoJogo(SIMBOLOS_DOS_SANTOS.filter((s) => s !== pergunta)).slice(0, opcoesPorPergunta - 1)));
    placarDoJogo(`${indice + 1}/${perguntas.length}`);
    area.innerHTML = `
      <div class="jogo-simbolos">
        <div class="jogo-simbolo-santo"><span class="jogo-simbolo-foto" id="jogo-simbolo-foto">${iconeDoJogo('estrela')}</span><strong>${textoDoJogo(pergunta.nome)}</strong></div>
        <div class="jogo-opcoes">${opcoes.map((opcao) => `<button type="button" class="jogo-opcao" data-santo="${opcao.santo}">${textoDoJogo(opcao.simbolo)}</button>`).join('')}</div>
      </div>`;
    falarNoJogo(textoDoJogo('O que aparece nas imagens de {nome}?', { nome: textoDoJogo(pergunta.nome) }));
    colocarFotoDoSantoNoJogo(pergunta.santo, 'jogo-simbolo-foto');
    area.querySelectorAll('.jogo-opcao').forEach((botao) => {
      botao.addEventListener('click', () => {
        if (area.querySelector('.jogo-opcao.certa')) return;
        if (botao.dataset.santo === pergunta.santo) {
          botao.classList.add('certa');
          acertouNoJogo(textoDoJogo('Isso mesmo!'), botao);
          indice += 1;
          agendarNoJogo(mostrar, 1000);
        } else {
          botao.disabled = true;
          errouNoJogo(textoDoJogo('Quase! Tente outra.'), botao);
        }
      });
    });
  };
  mostrar();
}

function colocarFotoDoSantoNoJogo(id, lugarId) {
  const santo = typeof santosData !== 'undefined' ? santosData.find((s) => s.id === id) : null;
  if (!santo || typeof buscarImagemSanto !== 'function') return;
  buscarImagemSanto(santo).then((url) => {
    const foto = document.getElementById(lugarId);
    if (url && foto) foto.innerHTML = `<img src="${url}" alt="">`;
  });
}

function jogoDaHistoria(area) {
  const historia = sortearDoJogo(HISTORIAS_DOS_JOGOS);
  const passos = idadeDosJogos === '8a12' ? historia.passos.slice(0, 4) : historia.passos;
  const embaralhados = embaralharDoJogo(passos.map((texto, ordem) => ({ texto, ordem })));
  let proximo = 0;
  area.innerHTML = `
    <div class="jogo-historia">
      <strong class="jogo-historia-santo">${textoDoJogo(historia.nome)}</strong>
      <ol class="jogo-linha" id="jogo-linha">${passos.map((_, i) => `<li class="jogo-linha-vaga" data-vaga="${i}"><span>${i + 1}</span></li>`).join('')}</ol>
      <div class="jogo-pecas">${embaralhados.map((peca) => `<button type="button" class="jogo-peca" data-ordem="${peca.ordem}">${textoDoJogo(peca.texto)}</button>`).join('')}</div>
    </div>`;
  placarDoJogo(`0/${passos.length}`);
  falarNoJogo(textoDoJogo('Toque no que aconteceu primeiro na vida de {nome}.', { nome: textoDoJogo(historia.nome) }));
  area.querySelectorAll('.jogo-peca').forEach((peca) => {
    peca.addEventListener('click', () => {
      if (Number(peca.dataset.ordem) === proximo) {
        const vaga = area.querySelector(`.jogo-linha-vaga[data-vaga="${proximo}"]`);
        vaga.classList.add('cheia');
        vaga.insertAdjacentHTML('beforeend', `<p>${peca.innerHTML}</p>`);
        peca.remove();
        proximo += 1;
        placarDoJogo(`${proximo}/${passos.length}`);
        acertouNoJogo(proximo < passos.length ? textoDoJogo('Certo! E depois?') : '', vaga);
        if (proximo >= passos.length) agendarNoJogo(() => terminarJogo(estrelasPelosErros(jogoAtual.erros, [0, 2])), 600);
      } else {
        errouNoJogo(textoDoJogo('Ainda não. Isso veio depois.'), peca);
      }
    });
  });
}

function montarCacaPalavras(palavras, lado, direcoes) {
  const grade = Array.from({ length: lado }, () => Array(lado).fill(''));
  const colocadas = [];
  palavras.forEach((palavra) => {
    for (let tentativa = 0; tentativa < 300; tentativa += 1) {
      const [dl, dc] = direcoes[Math.floor(Math.random() * direcoes.length)];
      const linhaInicial = dl < 0 ? palavra.length - 1 : 0;
      const colunaInicial = dc < 0 ? palavra.length - 1 : 0;
      const linha = linhaInicial + Math.floor(Math.random() * (lado - Math.abs(dl) * (palavra.length - 1)));
      const coluna = colunaInicial + Math.floor(Math.random() * (lado - Math.abs(dc) * (palavra.length - 1)));
      const cabe = [...palavra].every((letra, i) => {
        const atual = grade[linha + dl * i][coluna + dc * i];
        return !atual || atual === letra;
      });
      if (!cabe) continue;
      [...palavra].forEach((letra, i) => { grade[linha + dl * i][coluna + dc * i] = letra; });
      colocadas.push({ palavra, celulas: [...palavra].map((_, i) => `${linha + dl * i}-${coluna + dc * i}`) });
      return;
    }
  });
  const letras = 'ABCDEFGHIJLMNOPRSTUVZ';
  grade.forEach((linha) => linha.forEach((_, c) => { if (!linha[c]) linha[c] = letras[Math.floor(Math.random() * letras.length)]; }));
  return { grade, colocadas };
}

function jogoDasPalavras(area) {
  const config = { '8a12': { lado: 8, quantas: 5, direcoes: [[0, 1], [1, 0]] }, '13a17': { lado: 10, quantas: 7, direcoes: [[0, 1], [1, 0], [1, 1]] }, adultos: { lado: 12, quantas: 9, direcoes: [[0, 1], [1, 0], [1, 1], [0, -1], [-1, 0], [1, -1]] } }[idadeDosJogos] || { lado: 8, quantas: 5, direcoes: [[0, 1], [1, 0]] };
  const escolhidas = embaralharDoJogo(PALAVRAS_DOS_JOGOS.filter((p) => p.length <= config.lado && p.length >= 3)).slice(0, config.quantas);
  const { grade, colocadas } = montarCacaPalavras(escolhidas, config.lado, config.direcoes);
  let inicio = null;
  let achadas = 0;
  area.innerHTML = `
    <div class="jogo-palavras">
      <div class="jogo-grade-letras" style="--lado:${config.lado}">${grade.map((linha, l) => linha.map((letra, c) => `<button type="button" class="jogo-letra" data-celula="${l}-${c}">${letra}</button>`).join('')).join('')}</div>
      <ul class="jogo-lista-palavras">${colocadas.map((item) => `<li data-palavra="${item.palavra}">${item.palavra}</li>`).join('')}</ul>
    </div>`;
  placarDoJogo(`0/${colocadas.length}`);
  falarNoJogo(textoDoJogo('Toque na primeira e na última letra de cada palavra.'));
  const limpar = () => area.querySelectorAll('.jogo-letra.marcada').forEach((b) => b.classList.remove('marcada'));
  area.querySelectorAll('.jogo-letra').forEach((botao) => {
    botao.addEventListener('click', () => {
      if (!inicio) {
        inicio = botao.dataset.celula;
        botao.classList.add('marcada');
        return;
      }
      const fim = botao.dataset.celula;
      const achada = colocadas.find((item) => !item.achada && ((item.celulas[0] === inicio && item.celulas[item.celulas.length - 1] === fim) || (item.celulas[0] === fim && item.celulas[item.celulas.length - 1] === inicio)));
      inicio = null;
      limpar();
      if (!achada) { errouNoJogo(textoDoJogo('Não é essa. Tente de novo!')); return; }
      achada.achada = true;
      achadas += 1;
      achada.celulas.forEach((celula, i) => setTimeout(() => { const letra = area.querySelector(`[data-celula="${celula}"]`); if (letra) letra.classList.add('achada'); }, i * 50));
      area.querySelector(`[data-palavra="${achada.palavra}"]`).classList.add('achada');
      placarDoJogo(`${achadas}/${colocadas.length}`);
      acertouNoJogo(achadas < colocadas.length ? textoDoJogo('Achou: {palavra}!', { palavra: achada.palavra }) : '', botao);
      if (achadas >= colocadas.length) agendarNoJogo(() => terminarJogo(estrelasPelosErros(jogoAtual.erros, [1, 4])), 600);
    });
  });
}

function santosParaOsJogos() {
  return typeof santosData !== 'undefined' ? santosData.filter((s) => s.resumo && s.nome) : [];
}

function jogoQuemSouEu(area) {
  const opcoesPorPergunta = idadeDosJogos === '8a12' ? 3 : 4;
  const santos = embaralharDoJogo(santosParaOsJogos());
  const perguntas = santos.slice(0, idadeDosJogos === 'adultos' ? 8 : 6);
  let indice = 0;
  const nomeDe = (santo) => (typeof textoDoSanto === 'function' ? textoDoSanto(santo).nome : santo.nome);
  const resumoDe = (santo) => (typeof textoDoSanto === 'function' ? textoDoSanto(santo).resumo : santo.resumo);
  const mostrar = () => {
    if (indice >= perguntas.length) { terminarJogo(estrelasPelosErros(jogoAtual.erros, [0, 2])); return; }
    const santo = perguntas[indice];
    const opcoes = embaralharDoJogo([santo].concat(embaralharDoJogo(santos.filter((s) => s !== santo)).slice(0, opcoesPorPergunta - 1)));
    placarDoJogo(`${indice + 1}/${perguntas.length}`);
    area.innerHTML = `
      <div class="jogo-quemsou">
        <div class="jogo-pista"><span class="jogo-simbolo-foto escondida" id="jogo-quemsou-foto">?</span><p>${resumoDe(santo)}</p></div>
        <div class="jogo-opcoes">${opcoes.map((opcao) => `<button type="button" class="jogo-opcao" data-santo="${opcao.id}">${nomeDe(opcao)}</button>`).join('')}</div>
      </div>`;
    falarNoJogo(textoDoJogo('Quem sou eu?'));
    area.querySelectorAll('.jogo-opcao').forEach((botao) => {
      botao.addEventListener('click', () => {
        if (area.querySelector('.jogo-opcao.certa')) return;
        if (botao.dataset.santo === santo.id) {
          botao.classList.add('certa');
          const foto = document.getElementById('jogo-quemsou-foto');
          if (foto) { foto.classList.remove('escondida'); foto.innerHTML = iconeDoJogo('estrela'); }
          colocarFotoDoSantoNoJogo(santo.id, 'jogo-quemsou-foto');
          acertouNoJogo(textoDoJogo('Isso mesmo!'), botao);
          indice += 1;
          agendarNoJogo(mostrar, 1500);
        } else {
          botao.disabled = true;
          errouNoJogo(textoDoJogo('Não sou eu. Tente outra.'), botao);
        }
      });
    });
  };
  mostrar();
}

function oracoesParaOJogo() {
  if (typeof BIBLIOTECA_DE_ORACOES === 'undefined') return [];
  const ids = idadeDosJogos === 'adultos' ? ['pai-nosso', 'ave-maria', 'gloria', 'credo', 'ato-de-contricao', 'ato-de-caridade'] : ['pai-nosso', 'ave-maria', 'gloria', 'sinal-da-cruz', 'ato-de-caridade'];
  const pos = typeof noIdioma === 'function' ? noIdioma : (lista) => lista[0];
  return BIBLIOTECA_DE_ORACOES.filter((o) => ids.includes(o.id)).map((o) => ({ titulo: pos(o.t), linhas: pos(o.x).split('\n').map((l) => l.trim()).filter((l) => l.split(' ').length >= 4) }));
}

function jogoDaOracao(area) {
  const oracoes = oracoesParaOJogo();
  const rodadas = 5;
  let rodada = 0;
  const mostrar = () => {
    if (rodada >= rodadas || !oracoes.length) { terminarJogo(estrelasPelosErros(jogoAtual.erros, [0, 2])); return; }
    const oracao = sortearDoJogo(oracoes);
    const linha = sortearDoJogo(oracao.linhas);
    const palavras = linha.split(' ');
    const candidatas = palavras.map((p, i) => ({ p, i })).filter(({ p }) => p.replace(/[^\p{L}]/gu, '').length >= 4);
    const escolhida = sortearDoJogo(candidatas);
    const limpa = escolhida.p.replace(/[^\p{L}-]/gu, '');
    const outras = embaralharDoJogo(oracao.linhas.join(' ').split(' ').map((p) => p.replace(/[^\p{L}-]/gu, '')).filter((p) => p.length >= 4 && p.toLowerCase() !== limpa.toLowerCase()));
    const opcoes = embaralharDoJogo([limpa].concat([...new Set(outras)].slice(0, 2)));
    const frase = palavras.map((p, i) => (i === escolhida.i ? p.replace(limpa, '<span class="jogo-lacuna">____</span>') : p)).join(' ');
    placarDoJogo(`${rodada + 1}/${rodadas}`);
    area.innerHTML = `
      <div class="jogo-oracao">
        <small class="jogo-oracao-titulo">${oracao.titulo}</small>
        <p class="jogo-oracao-frase">${frase}</p>
        <div class="jogo-opcoes">${opcoes.map((opcao) => `<button type="button" class="jogo-opcao" data-palavra="${opcao}">${opcao}</button>`).join('')}</div>
      </div>`;
    falarNoJogo(textoDoJogo('Qual palavra completa a oração?'));
    area.querySelectorAll('.jogo-opcao').forEach((botao) => {
      botao.addEventListener('click', () => {
        if (area.querySelector('.jogo-opcao.certa')) return;
        if (botao.dataset.palavra === limpa) {
          botao.classList.add('certa');
          const lacuna = area.querySelector('.jogo-lacuna');
          if (lacuna) { lacuna.textContent = limpa; lacuna.classList.add('preenchida'); }
          acertouNoJogo(textoDoJogo('Amém!'), botao);
          rodada += 1;
          agendarNoJogo(mostrar, 1300);
        } else {
          botao.disabled = true;
          errouNoJogo(textoDoJogo('Quase! Tente outra.'), botao);
        }
      });
    });
  };
  mostrar();
}

function jogoDoAnagrama(area) {
  const tamanho = { '8a12': [3, 6], '13a17': [5, 8], adultos: [7, 12] }[idadeDosJogos] || [3, 6];
  const palavras = embaralharDoJogo(PALAVRAS_DOS_JOGOS.filter((p) => p.length >= tamanho[0] && p.length <= tamanho[1])).slice(0, 5);
  let indice = 0;
  const mostrar = () => {
    if (indice >= palavras.length) { terminarJogo(estrelasPelosErros(jogoAtual.erros, [1, 4])); return; }
    const palavra = palavras[indice];
    let letras = embaralharDoJogo([...palavra].map((letra, i) => ({ letra, i })));
    if (letras.map((l) => l.letra).join('') === palavra) letras = letras.reverse();
    let montada = '';
    placarDoJogo(`${indice + 1}/${palavras.length}`);
    area.innerHTML = `
      <div class="jogo-anagrama">
        <div class="jogo-anagrama-resposta">${[...palavra].map(() => '<span class="jogo-anagrama-vaga"></span>').join('')}</div>
        <div class="jogo-anagrama-letras">${letras.map((item, n) => `<button type="button" class="jogo-anagrama-letra" data-n="${n}" data-letra="${item.letra}">${item.letra}</button>`).join('')}</div>
      </div>`;
    falarNoJogo(textoDoJogo('Toque nas letras na ordem certa.'));
    const vagas = Array.from(area.querySelectorAll('.jogo-anagrama-vaga'));
    area.querySelectorAll('.jogo-anagrama-letra').forEach((botao) => {
      botao.addEventListener('click', () => {
        if (botao.disabled) return;
        if (palavra[montada.length] !== botao.dataset.letra) { errouNoJogo(textoDoJogo('Essa letra vem depois.'), botao); return; }
        vagas[montada.length].textContent = botao.dataset.letra;
        vagas[montada.length].classList.add('cheia');
        montada += botao.dataset.letra;
        botao.disabled = true;
        tocarNotaDoJogo(500 + montada.length * 40);
        if (montada === palavra) {
          acertouNoJogo(textoDoJogo('{palavra}!', { palavra }), area.querySelector('.jogo-anagrama-resposta'));
          indice += 1;
          agendarNoJogo(mostrar, 1100);
        }
      });
    });
  };
  mostrar();
}

function perguntasDoQuiz(quantas) {
  const santos = embaralharDoJogo(santosParaOsJogos());
  const nomeDe = (santo) => (typeof textoDoSanto === 'function' ? textoDoSanto(santo).nome : santo.nome);
  const resumoDe = (santo) => (typeof textoDoSanto === 'function' ? textoDoSanto(santo).resumo : santo.resumo);
  const perguntas = [];
  santos.forEach((santo, i) => {
    if (perguntas.length >= quantas) return;
    const outros = embaralharDoJogo(santos.filter((s) => s !== santo)).slice(0, 8);
    if (i % 2 === 0 && /^\d{2}-\d{2}$/.test(santo.festa || '') && typeof festaPorExtenso === 'function') {
      const datas = [...new Set(outros.map((s) => s.festa).filter((f) => /^\d{2}-\d{2}$/.test(f || '') && f !== santo.festa))].slice(0, 3);
      if (datas.length === 3) {
        perguntas.push({ texto: textoDoJogo('Quando é a festa de {nome}?', { nome: nomeDe(santo) }), certa: festaPorExtenso(santo.festa), opcoes: embaralharDoJogo([santo.festa].concat(datas)).map(festaPorExtenso) });
        return;
      }
    }
    perguntas.push({ texto: resumoDe(santo), pergunta: textoDoJogo('Quem é?'), certa: nomeDe(santo), opcoes: embaralharDoJogo([santo].concat(outros.slice(0, 3))).map(nomeDe) });
  });
  return perguntas;
}

function jogoDoQuiz(area) {
  const nivel = jogoAtual.nivel;
  const perguntas = perguntasDoQuiz(7);
  const acertoDaIa = [0.45, 0.7, 0.9][nivel];
  const tempoDaIa = [6500, 4800, 3200][nivel];
  const placar = { eu: 0, ia: 0 };
  let indice = 0;
  const mostrar = () => {
    if (indice >= perguntas.length) {
      const estrelas = placar.eu > placar.ia ? 3 : placar.eu === placar.ia ? 2 : 1;
      terminarJogo(estrelas, textoDoJogo('Você {eu} x {ia} Lumi', { eu: placar.eu, ia: placar.ia }));
      return;
    }
    const pergunta = perguntas[indice];
    let respondeu = false;
    placarDoJogo(`${indice + 1}/${perguntas.length}`);
    area.innerHTML = `
      <div class="jogo-quiz">
        <div class="jogo-duelo-placar"><span class="eu"><b>${textoDoJogo('Você')}</b><strong>${placar.eu}</strong></span><span class="ia"><b>Lumi</b><strong>${placar.ia}</strong></span></div>
        <div class="jogo-quiz-tempo"><span style="animation-duration:${tempoDaIa}ms"></span></div>
        <p class="jogo-quiz-pergunta">${pergunta.texto}${pergunta.pergunta ? `<b>${pergunta.pergunta}</b>` : ''}</p>
        <div class="jogo-opcoes">${pergunta.opcoes.map((opcao) => `<button type="button" class="jogo-opcao" data-opcao="${opcao}">${opcao}</button>`).join('')}</div>
      </div>`;
    falarNoJogo(textoDoJogo('Rápido! A Lumi também está pensando.'));
    const encerrar = (quem, acertou) => {
      if (respondeu) return;
      respondeu = true;
      area.querySelectorAll('.jogo-opcao').forEach((b) => { b.disabled = true; if (b.dataset.opcao === pergunta.certa) b.classList.add('certa'); });
      if (quem === 'eu' && acertou) { placar.eu += 1; acertouNoJogo(textoDoJogo('Ponto seu!'), area.querySelector('.jogo-duelo-placar .eu')); }
      else if (quem === 'eu') { placar.ia += 1; errouNoJogo(textoDoJogo('Errou! Ponto da Lumi.')); }
      else if (acertou) { placar.ia += 1; falarNoJogo(textoDoJogo('A Lumi respondeu primeiro!'), 'feliz'); }
      else { placar.eu += 1; falarNoJogo(textoDoJogo('A Lumi errou! Ponto seu.'), 'ops'); }
      indice += 1;
      agendarNoJogo(mostrar, 1500);
    };
    area.querySelectorAll('.jogo-opcao').forEach((botao) => {
      botao.addEventListener('click', () => encerrar('eu', botao.dataset.opcao === pergunta.certa));
    });
    agendarNoJogo(() => encerrar('ia', Math.random() < acertoDaIa), tempoDaIa);
  };
  mostrar();
}

function jogoDoDuelo(area) {
  const nivel = jogoAtual.nivel;
  const pares = idadeDosJogos === 'adultos' ? 10 : 8;
  const memoriaDaIa = [0.3, 0.6, 0.9][nivel];
  const figuras = embaralharDoJogo(FIGURAS_DA_MEMORIA.concat(['pessoa', 'trilha'])).slice(0, pares);
  const cartas = embaralharDoJogo(figuras.concat(figuras));
  const vistas = new Map();
  const placar = { eu: 0, ia: 0 };
  let vez = 'eu';
  let viradas = [];
  area.innerHTML = `
    <div class="jogo-duelo-placar"><span class="eu ativo"><b>${textoDoJogo('Você')}</b><strong>0</strong></span><span class="ia"><b>Lumi</b><strong>0</strong></span></div>
    <div class="jogo-memoria" style="--colunas:${pares > 8 ? 5 : 4}">${cartas.map((figura, i) => `
      <button type="button" class="jogo-carta" data-figura="${figura}" data-i="${i}" aria-label="${textoDoJogo('Carta')}">
        <span class="jogo-carta-dentro"><span class="jogo-carta-costas"></span><span class="jogo-carta-frente">${iconeDoJogo(figura)}</span></span>
      </button>`).join('')}</div>`;
  const botoes = Array.from(area.querySelectorAll('.jogo-carta'));
  const atualizar = () => {
    area.querySelector('.jogo-duelo-placar .eu strong').textContent = placar.eu;
    area.querySelector('.jogo-duelo-placar .ia strong').textContent = placar.ia;
    area.querySelector('.jogo-duelo-placar .eu').classList.toggle('ativo', vez === 'eu');
    area.querySelector('.jogo-duelo-placar .ia').classList.toggle('ativo', vez === 'ia');
    placarDoJogo(`${placar.eu + placar.ia}/${pares}`);
  };
  const lembrar = (i) => { if (Math.random() < memoriaDaIa) vistas.set(i, cartas[i]); };
  const acabou = () => placar.eu + placar.ia >= pares;
  const finalizar = () => {
    const estrelas = placar.eu > placar.ia ? 3 : placar.eu === placar.ia ? 2 : 1;
    terminarJogo(estrelas, textoDoJogo('Você {eu} x {ia} Lumi', { eu: placar.eu, ia: placar.ia }));
  };
  const virar = (i) => { botoes[i].classList.add('virada'); viradas.push(i); };
  const conferir = (quem) => {
    const [a, b] = viradas;
    viradas = [];
    if (cartas[a] === cartas[b]) {
      botoes[a].classList.add('par', quem);
      botoes[b].classList.add('par', quem);
      vistas.delete(a);
      vistas.delete(b);
      placar[quem] += 1;
      if (quem === 'eu') acertouNoJogo(textoDoJogo('Par seu! Jogue de novo.'), botoes[b]);
      else falarNoJogo(textoDoJogo('A Lumi achou um par!'), 'feliz');
      atualizar();
      if (acabou()) { agendarNoJogo(finalizar, 800); return; }
      if (quem === 'ia') agendarNoJogo(jogadaDaIa, 900);
      return;
    }
    lembrar(a);
    lembrar(b);
    agendarNoJogo(() => {
      botoes[a].classList.remove('virada');
      botoes[b].classList.remove('virada');
      vez = quem === 'eu' ? 'ia' : 'eu';
      atualizar();
      if (vez === 'ia') jogadaDaIa();
      else falarNoJogo(textoDoJogo('Sua vez!'));
    }, 900);
  };
  const livres = () => botoes.map((b, i) => (b.classList.contains('par') ? null : i)).filter((i) => i !== null);
  const jogadaDaIa = () => {
    if (!jogoAtual || jogoAtual.fim) return;
    falarNoJogo(textoDoJogo('Vez da Lumi...'));
    const conhecidas = [...vistas.entries()].filter(([i]) => !botoes[i].classList.contains('par'));
    let primeira = null;
    let segunda = null;
    for (const [i, figura] of conhecidas) {
      const outra = conhecidas.find(([j, f]) => j !== i && f === figura);
      if (outra) { primeira = i; segunda = outra[0]; break; }
    }
    if (primeira === null) primeira = sortearDoJogo(livres());
    agendarNoJogo(() => {
      virar(primeira);
      lembrar(primeira);
      if (segunda === null) {
        const par = conhecidas.find(([j, f]) => j !== primeira && f === cartas[primeira]);
        segunda = par ? par[0] : sortearDoJogo(livres().filter((i) => i !== primeira));
      }
      agendarNoJogo(() => { virar(segunda); agendarNoJogo(() => conferir('ia'), 700); }, 650);
    }, 700);
  };
  botoes.forEach((botao, i) => {
    botao.addEventListener('click', () => {
      if (vez !== 'eu' || botao.classList.contains('virada') || viradas.length >= 2 || !jogoAtual || jogoAtual.fim) return;
      virar(i);
      if (viradas.length === 2) agendarNoJogo(() => conferir('eu'), 500);
    });
  });
  atualizar();
  falarNoJogo(textoDoJogo('Você começa! Quem achar mais pares vence.'));
}

const QUIZ_DA_LUMINA_URL = 'https://lumina-ia.5dh6gl58df5c.workers.dev/quiz';
const PALAVRAS_SEM_PESO_NO_QUIZ = ['o', 'a', 'os', 'as', 'um', 'uma', 'de', 'do', 'da', 'dos', 'das', 'em', 'no', 'na', 'the', 'an', 'of', 'el', 'la', 'los', 'las', 'del', 'en', 'un', 'una'];
let ultimosSantosDoQuiz = [];
const NIVEIS_DO_QUIZ_DA_LUMINA = [['facil', 'Fácil'], ['medio', 'Médio'], ['dificil', 'Difícil'], ['santo', 'Nível Santo']];
const CHAVE_DO_NIVEL_DO_QUIZ = 'lumina-sancti-quiz-nivel';

function nivelDoQuizDaLumina() {
  try {
    const salvo = localStorage.getItem(CHAVE_DO_NIVEL_DO_QUIZ);
    return NIVEIS_DO_QUIZ_DA_LUMINA.some(([id]) => id === salvo) ? salvo : 'medio';
  } catch (e) {
    return 'medio';
  }
}

function guardarNivelDoQuiz(nivel) {
  try { localStorage.setItem(CHAVE_DO_NIVEL_DO_QUIZ, nivel); } catch (e) {
  }
}

function escaparNoJogo(texto) {
  return String(texto === undefined || texto === null ? '' : texto).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

function semAcentoNoJogo(texto) {
  return String(texto || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
}

function nomeDoSantoNoJogo(santo) {
  return typeof textoDoSanto === 'function' ? textoDoSanto(santo).nome : santo.nome;
}

function apoioDoSantoNoQuiz(santo) {
  const textos = typeof textoDoSanto === 'function' ? textoDoSanto(santo) : santo;
  return `${textos.resumo || ''} ${textos.texto || ''}`.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 1600);
}

function nomeDoQuizSemTitulo(nome) {
  return semAcentoNoJogo(nome).replace(/^(sao|santo|santa|san|saint|st|beato|beata|beatified|blessed)\s+/, '');
}

function santoDoAppPeloNome(nome) {
  const procurado = nomeDoQuizSemTitulo(nome);
  if (procurado.length < 3) return null;
  return santosParaOsJogos().find((santo) => [santo.nome, nomeDoSantoNoJogo(santo)].some((outro) => {
    const limpo = nomeDoQuizSemTitulo(outro);
    return limpo === procurado || (procurado.length >= 6 && limpo.startsWith(`${procurado} `));
  })) || null;
}

function santoParaOQuiz(santo, modo) {
  return { id: santo.id, nome: nomeDoSantoNoJogo(santo), sobre: apoioDoSantoNoQuiz(santo), modo };
}

function sortearSantoDoQuiz() {
  const santos = santosParaOsJogos();
  const livres = santos.filter((santo) => !ultimosSantosDoQuiz.includes(santo.id));
  return sortearDoJogo(livres.length ? livres : santos);
}

function distanciaEntre(a, b) {
  const linha = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i += 1) {
    let anterior = linha[0];
    linha[0] = i;
    for (let j = 1; j <= b.length; j += 1) {
      const guardado = linha[j];
      linha[j] = Math.min(linha[j] + 1, linha[j - 1] + 1, anterior + (a[i - 1] === b[j - 1] ? 0 : 1));
      anterior = guardado;
    }
  }
  return linha[b.length];
}

function respostaAbertaCerta(digitado, aceitas) {
  const limpar = (texto) => semAcentoNoJogo(texto).split(' ').filter((palavra) => palavra && !PALAVRAS_SEM_PESO_NO_QUIZ.includes(palavra)).join(' ');
  const resposta = limpar(digitado);
  if (!resposta) return false;
  return (aceitas || []).some((aceita) => {
    const certa = limpar(aceita);
    if (!certa) return false;
    if (resposta === certa) return true;
    if (certa.length >= 4 && ` ${resposta} `.includes(` ${certa} `)) return true;
    const limite = certa.length <= 4 ? 0 : certa.length <= 8 ? 1 : 2;
    return distanciaEntre(resposta, certa) <= limite;
  });
}

function abrirQuizDaLumina(opcoes) {
  const pedido = opcoes && typeof opcoes === 'object' && !(typeof Event !== 'undefined' && opcoes instanceof Event) ? opcoes : {};
  abrirJogos();
  const jogo = JOGOS.find((j) => j.id === 'quizia');
  const visiveis = idadesVisiveisDosJogos().map((idade) => idade.id);
  if (jogo && !jogo.idades.includes(idadeDosJogos)) {
    const idade = jogo.idades.slice().reverse().find((id) => visiveis.includes(id));
    if (idade) idadeDosJogos = idade;
  }
  if (pedido.santoId) {
    const santo = santosParaOsJogos().find((s) => s.id === pedido.santoId);
    if (santo && (typeof sessaoAtual === 'undefined' || sessaoAtual)) {
      ultimosSantosDoQuiz = [santo.id].concat(ultimosSantosDoQuiz.filter((id) => id !== santo.id)).slice(0, 12);
      comecarJogo('quizia', { santo: santoParaOQuiz(santo, 'lista') });
      return;
    }
  }
  if (pedido.digitado && jogo) {
    mostrarEscolhaDoQuizDaLumina(jogo, { modo: 'digitar', digitado: pedido.digitado });
    return;
  }
  comecarJogo('quizia');
}

function mostrarEscolhaDoQuizDaLumina(jogo, opcoes) {
  const lugar = document.getElementById('jogos-container');
  if (!lugar) return;
  pararJogoAtual();
  const config = opcoes || {};
  const logado = typeof sessaoAtual === 'undefined' || !!sessaoAtual;
  lugar.innerHTML = `
    <div class="jogo-tela" data-jogo="${jogo.id}" style="--cor:${jogo.cor}">
      <div class="jogo-cabecalho"><button type="button" class="jogo-voltar" id="jogo-voltar"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg><span>${textoDoJogo('Outros jogos')}</span></button><strong class="jogo-nome">${textoDoJogo(jogo.nome)}</strong><span class="jogo-placar"></span></div>
      <div class="quizia-escolha">
        <span class="quizia-arte">${htmlDoPersonagem('lumi')}</span>
        ${logado ? `
        <div class="quizia-niveis" role="radiogroup" aria-label="${escaparNoJogo(textoDoJogo('Nível'))}">${NIVEIS_DO_QUIZ_DA_LUMINA.map(([id, rotulo]) => `<button type="button" class="quizia-nivel${id === 'santo' ? ' quizia-nivel-santo' : ''}${nivelDoQuizDaLumina() === id ? ' ativo' : ''}" data-nivel="${id}" role="radio" aria-checked="${nivelDoQuizDaLumina() === id}">${id === 'santo' ? iconeDoJogo('coroa') : ''}${textoDoJogo(rotulo)}</button>`).join('')}</div>
        ${nivelDoQuizDaLumina() === 'santo' ? `
        <div class="quizia-santo-intro">
          <strong class="quizia-titulo">${textoDoJogo('Nível Santo')}</strong>
          <ul class="quizia-santo-regras">
            <li>${iconeDoJogo('lapis')}${textoDoJogo('20 perguntas abertas')}</li>
            <li>${iconeDoJogo('pessoa')}${textoDoJogo('Santos sorteados')}</li>
            <li>${iconeDoJogo('estrela')}${textoDoJogo('3 de Fé por acerto, 20 a mais se acertar tudo')}</li>
          </ul>
          <button type="button" class="jogo-botao" id="quizia-santo-comecar">${textoDoJogo('Começar')}</button>
        </div>` : `
        <strong class="quizia-titulo">${textoDoJogo('Sobre qual santo?')}</strong>
        <div class="quizia-modos">
          <button type="button" class="quizia-modo" data-modo="surpresa"><span class="quizia-modo-icone">${iconeDoJogo('estrela')}</span><span>${textoDoJogo('Santo surpresa')}</span></button>
          <button type="button" class="quizia-modo" data-modo="lista"><span class="quizia-modo-icone">${iconeDoJogo('livro')}</span><span>${textoDoJogo('Escolher da lista')}</span></button>
          <button type="button" class="quizia-modo" data-modo="digitar"><span class="quizia-modo-icone">${iconeDoJogo('lapis')}</span><span>${textoDoJogo('Digitar o nome')}</span></button>
        </div>
        <div class="quizia-painel" id="quizia-painel"></div>`}` : `
        <strong class="quizia-titulo">${textoDoJogo('Entre na sua conta para jogar o quiz com a Lumina.')}</strong>
        <button type="button" class="jogo-botao" id="quizia-entrar">${textoDoJogo('Entrar / Criar conta')}</button>`}
        <p class="quizia-aviso" id="quizia-aviso" aria-live="polite">${escaparNoJogo(config.aviso || '')}</p>
        ${config.precisaLogin && logado ? `<button type="button" class="jogo-botao" id="quizia-entrar">${textoDoJogo('Entrar / Criar conta')}</button>` : ''}
      </div>
    </div>`;
  document.getElementById('jogo-voltar').addEventListener('click', () => mostrarListaDeJogos());
  const entrar = document.getElementById('quizia-entrar');
  if (entrar) entrar.addEventListener('click', () => { if (typeof irParaLogin === 'function') irParaLogin(); });
  if (!logado) return;
  lugar.querySelectorAll('.quizia-nivel').forEach((botao) => botao.addEventListener('click', () => {
    if (botao.dataset.nivel === nivelDoQuizDaLumina()) return;
    guardarNivelDoQuiz(botao.dataset.nivel);
    mostrarEscolhaDoQuizDaLumina(jogo, { modo: config.modo, digitado: config.digitado });
  }));
  const comecarSanto = document.getElementById('quizia-santo-comecar');
  if (comecarSanto) comecarSanto.addEventListener('click', () => comecarJogo(jogo.id, { santo: { id: '', nome: textoDoJogo('Nível Santo'), modo: 'santo' }, nivelSanto: true }));
  const painel = document.getElementById('quizia-painel');
  if (!painel) return;
  const comecar = (santo) => {
    ultimosSantosDoQuiz = [santo.id].concat(ultimosSantosDoQuiz.filter((id) => id && id !== santo.id)).slice(0, 12);
    comecarJogo(jogo.id, { santo });
  };
  const marcarModo = (modo) => lugar.querySelectorAll('.quizia-modo').forEach((botao) => botao.classList.toggle('ativo', botao.dataset.modo === modo));
  const abrirLista = () => {
    marcarModo('lista');
    const santos = santosParaOsJogos().slice().sort((a, b) => nomeDoQuizSemTitulo(nomeDoSantoNoJogo(a)).localeCompare(nomeDoQuizSemTitulo(nomeDoSantoNoJogo(b))));
    painel.innerHTML = `
      <input type="search" class="quizia-campo" id="quizia-busca" placeholder="${escaparNoJogo(textoDoJogo('Procurar santo'))}" autocomplete="off">
      <div class="quizia-lista" id="quizia-lista">${santos.map((santo) => `<button type="button" class="quizia-santo" data-santo="${santo.id}" data-busca="${escaparNoJogo(`${semAcentoNoJogo(santo.nome)} ${semAcentoNoJogo(nomeDoSantoNoJogo(santo))}`)}">${escaparNoJogo(nomeDoSantoNoJogo(santo))}</button>`).join('')}</div>`;
    const busca = document.getElementById('quizia-busca');
    busca.addEventListener('input', () => {
      const termo = semAcentoNoJogo(busca.value);
      painel.querySelectorAll('.quizia-santo').forEach((botao) => { botao.hidden = !!termo && !botao.dataset.busca.includes(termo); });
    });
    painel.querySelectorAll('.quizia-santo').forEach((botao) => {
      botao.addEventListener('click', () => {
        const santo = santosParaOsJogos().find((s) => s.id === botao.dataset.santo);
        if (santo) comecar(santoParaOQuiz(santo, 'lista'));
      });
    });
  };
  const abrirDigitar = (nome) => {
    marcarModo('digitar');
    painel.innerHTML = `
      <form class="quizia-digitar" id="quizia-form">
        <input type="text" class="quizia-campo" id="quizia-nome" maxlength="80" autocomplete="off" placeholder="${escaparNoJogo(textoDoJogo('Ex.: Santa Rita de Cássia'))}" value="${escaparNoJogo(nome || '')}">
        <button type="submit" class="jogo-botao">${textoDoJogo('Criar quiz')}</button>
      </form>`;
    const campo = document.getElementById('quizia-nome');
    document.getElementById('quizia-form').addEventListener('submit', (evento) => {
      evento.preventDefault();
      const digitado = campo.value.replace(/\s+/g, ' ').trim();
      if (digitado.length < 2) { campo.focus(); return; }
      const doApp = santoDoAppPeloNome(digitado);
      comecar(doApp ? Object.assign(santoParaOQuiz(doApp, 'digitar'), { digitado }) : { id: '', nome: digitado, sobre: '', modo: 'digitar', digitado });
    });
    if (!(typeof window.matchMedia === 'function' && window.matchMedia('(pointer: coarse)').matches)) campo.focus();
  };
  lugar.querySelectorAll('.quizia-modo').forEach((botao) => {
    botao.addEventListener('click', () => {
      document.getElementById('quizia-aviso').textContent = '';
      if (botao.dataset.modo === 'surpresa') {
        const santo = sortearSantoDoQuiz();
        if (santo) comecar(santoParaOQuiz(santo, 'surpresa'));
      } else if (botao.dataset.modo === 'lista') abrirLista();
      else abrirDigitar();
    });
  });
  if (config.modo === 'lista') abrirLista();
  if (config.modo === 'digitar') abrirDigitar(config.digitado);
}

async function pedirQuizDaLumina(santo) {
  let token = '';
  try {
    const sessao = await supabaseCliente.auth.getSession();
    token = sessao.data.session ? sessao.data.session.access_token : '';
  } catch (e) {
    token = '';
  }
  const perfil = typeof perfilAdultoAtivo === 'function' ? perfilAdultoAtivo() : null;
  const resposta = await fetch(QUIZ_DA_LUMINA_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify({ santo: santo.nome, sobre: santo.sobre || '', idioma: typeof idiomaAtual === 'string' ? idiomaAtual : 'pt', perfil: perfil ? perfil.id : null, nivel: nivelDoQuizDaLumina() === 'santo' ? 'medio' : nivelDoQuizDaLumina() }),
  });
  const dados = await resposta.json().catch(() => null);
  return { ok: resposta.ok && !!dados && Array.isArray(dados.perguntas) && dados.perguntas.length > 0, dados: dados || {} };
}

async function jogoDoQuizDaLumina(area) {
  if (jogoAtual && jogoAtual.nivelSanto) return jogoDoNivelSanto(area);
  const partida = jogoAtual;
  const santo = partida.santo;
  area.innerHTML = '<div class="quizia-carregando" aria-hidden="true"><span></span><span></span><span></span></div>';
  falarNoJogo(textoDoJogo('Preparando as perguntas sobre {nome}...', { nome: santo.nome }));
  let pedido = { ok: false, dados: {} };
  try {
    pedido = await pedirQuizDaLumina(santo);
  } catch (e) {
    pedido = { ok: false, dados: {} };
  }
  if (jogoAtual !== partida) return;
  if (!pedido.ok) {
    let semLogin = !!pedido.dados.precisaLogin;
    if (semLogin && typeof loginAindaValeNoAparelho === 'function' && await loginAindaValeNoAparelho()) semLogin = false;
    if (jogoAtual !== partida) return;
    mostrarEscolhaDoQuizDaLumina(partida.jogo, {
      aviso: (semLogin && pedido.dados.erro) || (!pedido.dados.precisaLogin && pedido.dados.erro) || textoDoJogo('Não consegui falar com a Lumina agora. Tente de novo em instantes.'),
      precisaLogin: semLogin,
      modo: santo.modo === 'surpresa' ? '' : santo.modo,
      digitado: santo.digitado || santo.nome,
    });
    return;
  }
  const perguntas = pedido.dados.perguntas;
  const nomeDoSanto = pedido.dados.santo || santo.nome;
  const restantes = pedido.dados.quizzesRestantes;
  const periodo = pedido.dados.periodo;
  let indice = 0;
  let acertos = 0;
  const mostrar = () => {
    if (jogoAtual !== partida) return;
    if (indice >= perguntas.length) {
      let mensagem = textoDoJogo('Você acertou {n} de {total} sobre {santo}.', { n: acertos, total: perguntas.length, santo: nomeDoSanto });
      if (typeof restantes === 'number') mensagem += ` ${textoDoJogo(periodo === 'dia' ? 'Quizzes restantes hoje: {n}' : 'Quizzes restantes nesta semana: {n}', { n: restantes })}`;
      terminarJogo(estrelasPelosErros(partida.erros, [0, 2]), mensagem.replace(/[<>&]/g, ''));
      return;
    }
    const pergunta = perguntas[indice];
    const aberta = pergunta.tipo === 'aberta';
    let respondida = false;
    placarDoJogo(`${indice + 1}/${perguntas.length}`);
    area.innerHTML = `
      <div class="jogo-quiz quizia-quiz">
        <p class="jogo-quiz-pergunta">${escaparNoJogo(pergunta.pergunta)}</p>
        ${aberta ? `
        <form class="quizia-digitar" id="quizia-aberta">
          <input type="text" class="quizia-campo" id="quizia-resposta" maxlength="80" autocomplete="off" placeholder="${escaparNoJogo(textoDoJogo('Sua resposta'))}">
          <button type="submit" class="jogo-botao">${textoDoJogo('Responder')}</button>
        </form>` : `<div class="jogo-opcoes">${pergunta.opcoes.map((opcao, i) => `<button type="button" class="jogo-opcao" data-opcao="${i}">${escaparNoJogo(opcao)}</button>`).join('')}</div>`}
        <div class="quizia-resultado" id="quizia-resultado" hidden></div>
      </div>`;
    falarNoJogo(nomeDoSanto);
    const fechar = (acertou, alvo, certaParaMostrar) => {
      if (respondida) return;
      respondida = true;
      if (acertou) { acertos += 1; acertouNoJogo(textoDoJogo('Isso mesmo!'), alvo); }
      else errouNoJogo(textoDoJogo('Não foi dessa vez.'), alvo);
      const resultado = document.getElementById('quizia-resultado');
      if (!resultado) return;
      resultado.innerHTML = `
        ${!acertou && certaParaMostrar ? `<strong>${textoDoJogo('Resposta: {resposta}', { resposta: escaparNoJogo(certaParaMostrar) })}</strong>` : ''}
        ${pergunta.explicacao ? `<p>${escaparNoJogo(pergunta.explicacao)}</p>` : ''}
        <button type="button" class="jogo-botao" id="quizia-proxima">${textoDoJogo(indice + 1 < perguntas.length ? 'Próxima' : 'Ver resultado')}</button>`;
      resultado.hidden = false;
      const proxima = document.getElementById('quizia-proxima');
      proxima.addEventListener('click', () => { indice += 1; mostrar(); });
      if (proxima.focus) proxima.focus({ preventScroll: true });
      if (resultado.scrollIntoView) resultado.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    };
    if (aberta) {
      const campo = document.getElementById('quizia-resposta');
      document.getElementById('quizia-aberta').addEventListener('submit', (evento) => {
        evento.preventDefault();
        if (respondida) return;
        if (!campo.value.trim()) { campo.focus(); return; }
        const acertou = respostaAbertaCerta(campo.value, pergunta.aceitas || [pergunta.resposta]);
        campo.disabled = true;
        campo.classList.add(acertou ? 'certa' : 'errada');
        const botao = area.querySelector('#quizia-aberta .jogo-botao');
        if (botao) botao.disabled = true;
        fechar(acertou, campo, pergunta.resposta);
      });
      if (!(typeof window.matchMedia === 'function' && window.matchMedia('(pointer: coarse)').matches)) campo.focus();
    } else {
      area.querySelectorAll('.jogo-opcao').forEach((botao) => {
        botao.addEventListener('click', () => {
          if (respondida) return;
          const acertou = Number(botao.dataset.opcao) === pergunta.certa;
          area.querySelectorAll('.jogo-opcao').forEach((outro) => {
            outro.disabled = true;
            if (Number(outro.dataset.opcao) === pergunta.certa) outro.classList.add('certa');
          });
          if (!acertou) botao.classList.add('errada');
          fechar(acertou, botao, '');
        });
      });
    }
  };
  mostrar();
}

async function chamarNivelSanto(funcao, parametros) {
  const perfil = typeof perfilAdultoAtivo === 'function' ? perfilAdultoAtivo() : null;
  if (!perfil || typeof supabaseCliente === 'undefined' || !supabaseCliente) throw new Error('sem_perfil');
  const { data, error } = await supabaseCliente.rpc(funcao, Object.assign({ _pid: perfil.id }, parametros || {}));
  if (error) throw error;
  return data;
}

async function jogoDoNivelSanto(area) {
  const partida = jogoAtual;
  area.innerHTML = '<div class="quizia-carregando" aria-hidden="true"><span></span><span></span><span></span></div>';
  falarNoJogo(textoDoJogo('Sorteando os santos...'));
  let dados = null;
  try {
    dados = await chamarNivelSanto('quiz_santo_comecar', { _idioma: typeof idiomaAtual === 'string' ? idiomaAtual : 'pt' });
  } catch (e) {
    dados = null;
  }
  if (jogoAtual !== partida) return;
  if (!dados || !Array.isArray(dados.perguntas) || !dados.perguntas.length) {
    mostrarEscolhaDoQuizDaLumina(partida.jogo, { aviso: textoDoJogo('Não deu para começar o Nível Santo agora. Tente de novo.') });
    return;
  }
  const perguntas = dados.perguntas;
  let indice = 0;
  let acertos = 0;
  const mostrar = async () => {
    if (jogoAtual !== partida) return;
    if (indice >= perguntas.length) {
      area.innerHTML = '<div class="quizia-carregando" aria-hidden="true"><span></span><span></span><span></span></div>';
      let fim = null;
      try { fim = await chamarNivelSanto('quiz_santo_terminar', { _partida: dados.partida }); } catch (e) { fim = null; }
      if (jogoAtual !== partida) return;
      const certos = fim ? Number(fim.acertos) : acertos;
      const fe = fim ? Number(fim.fe) || 0 : 0;
      const membro = typeof obterMembroAtivo === 'function' ? obterMembroAtivo() : null;
      if (membro && fe && typeof membro.fe === 'number') membro.fe += fe;
      const estrelas = certos >= 18 ? 3 : certos >= 12 ? 2 : 1;
      let mensagem = textoDoJogo('Você acertou {n} de {total}.', { n: certos, total: perguntas.length });
      if (fe) mensagem += ` ${textoDoJogo('+{n} de Fé', { n: fe })}`;
      area.innerHTML = '';
      terminarJogo(estrelas, mensagem);
      return;
    }
    const pergunta = perguntas[indice];
    let respondida = false;
    placarDoJogo(`${indice + 1}/${perguntas.length}`);
    area.innerHTML = `
      <div class="jogo-quiz quizia-quiz quizia-santo">
        <div class="quizia-santo-placar"><span>${iconeDoJogo('check')}<b>${acertos}</b></span><span class="quizia-santo-barra"><i style="width:${Math.round((indice / perguntas.length) * 100)}%"></i></span></div>
        <p class="jogo-quiz-pergunta">${escaparNoJogo(pergunta.texto)}</p>
        <form class="quizia-digitar" id="quizia-aberta">
          <input type="text" class="quizia-campo" id="quizia-resposta" maxlength="80" autocomplete="off" placeholder="${escaparNoJogo(textoDoJogo('Nome do santo'))}">
          <button type="submit" class="jogo-botao">${textoDoJogo('Responder')}</button>
        </form>
        <div class="quizia-resultado" id="quizia-resultado" hidden></div>
      </div>`;
    falarNoJogo(textoDoJogo('Pergunta {n}', { n: indice + 1 }));
    const campo = document.getElementById('quizia-resposta');
    const botao = area.querySelector('#quizia-aberta .jogo-botao');
    document.getElementById('quizia-aberta').addEventListener('submit', async (evento) => {
      evento.preventDefault();
      if (respondida) return;
      if (!campo.value.trim()) { campo.focus(); return; }
      respondida = true;
      campo.disabled = true;
      botao.disabled = true;
      let r = null;
      try { r = await chamarNivelSanto('quiz_santo_responder', { _partida: dados.partida, _n: pergunta.n, _resposta: campo.value.trim().slice(0, 80) }); } catch (e) { r = null; }
      if (jogoAtual !== partida) return;
      const certa = !!(r && r.certa);
      campo.classList.add(certa ? 'certa' : 'errada');
      if (certa) { acertos += 1; acertouNoJogo(textoDoJogo('Isso mesmo!'), campo); } else errouNoJogo(textoDoJogo('Não foi dessa vez.'), campo);
      const resultado = document.getElementById('quizia-resultado');
      resultado.innerHTML = `
        ${r && r.resposta ? `<strong>${certa ? escaparNoJogo(r.resposta) : textoDoJogo('Resposta: {resposta}', { resposta: escaparNoJogo(r.resposta) })}</strong>` : ''}
        <button type="button" class="jogo-botao" id="quizia-proxima">${textoDoJogo(indice + 1 < perguntas.length ? 'Próxima' : 'Ver resultado')}</button>`;
      resultado.hidden = false;
      const proxima = document.getElementById('quizia-proxima');
      proxima.addEventListener('click', () => { indice += 1; mostrar(); });
      if (proxima.focus) proxima.focus({ preventScroll: true });
    });
    if (!(typeof window.matchMedia === 'function' && window.matchMedia('(pointer: coarse)').matches)) campo.focus();
  };
  mostrar();
}

function iniciarJogos() {
  const nav = document.getElementById('nav-jogos');
  if (nav) nav.addEventListener('click', abrirJogos);
  const atalhoDoQuiz = document.getElementById('lumina-quiz');
  if (atalhoDoQuiz) atalhoDoQuiz.addEventListener('click', () => abrirQuizDaLumina());
  const cartaoDoQuiz = document.getElementById('quiz-inicio-cartao');
  if (cartaoDoQuiz) cartaoDoQuiz.addEventListener('click', () => abrirQuizDaLumina());
  const arteDoQuiz = document.getElementById('quiz-inicio-arte');
  if (arteDoQuiz) arteDoQuiz.innerHTML = htmlDoPersonagem('lumi');
  const menuDoQuiz = document.getElementById('nav-quiz');
  if (menuDoQuiz) menuDoQuiz.addEventListener('click', () => { if (typeof closeSidebar === 'function') closeSidebar(); abrirQuizDaLumina(); });
  window.addEventListener('resize', () => { if (idadeDosJogos === 'pequeninos' && document.getElementById('pequeninos-caminho')) desenharLinhaDosPequeninos(); });
}

document.addEventListener('DOMContentLoaded', () => {
  if (typeof rodarComSeguranca === 'function') rodarComSeguranca('joguinhos', iniciarJogos);
  else iniciarJogos();
});
