const CHAVE_DOS_JOGOS = 'lumina-sancti-jogos';
const IDADES_DOS_JOGOS = [
  { id: 'ate7', rotulo: 'Até 7 anos' },
  { id: '8a12', rotulo: '8 a 12 anos' },
  { id: '13a17', rotulo: '13 a 17 anos' },
];
const JOGOS = [
  { id: 'estrelas', nome: 'Acenda as estrelas', texto: 'Toque nas estrelinhas para encher o céu de luz.', idades: ['ate7'], personagem: 'lumi' },
  { id: 'sombras', nome: 'Qual é a sombra?', texto: 'Ajude a Mel a achar a sombra certa de cada amigo.', idades: ['ate7'], personagem: 'mel' },
  { id: 'memoria', nome: 'Jogo da memória', texto: 'Vire as cartas e encontre os pares iguais.', idades: ['ate7', '8a12', '13a17'], personagem: 'clara' },
  { id: 'simbolos', nome: 'Símbolos dos santos', texto: 'Descubra o que aparece nas imagens de cada santo.', idades: ['8a12', '13a17'], personagem: 'dom' },
  { id: 'historia', nome: 'Ordene a história', texto: 'Coloque a vida do santo na ordem certa.', idades: ['8a12', '13a17'], personagem: 'lumi' },
  { id: 'palavras', nome: 'Caça-palavras da fé', texto: 'Encontre as palavras escondidas no quadro.', idades: ['8a12', '13a17'], personagem: 'clara' },
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
const PALAVRAS_DOS_JOGOS = ['JESUS', 'MARIA', 'CRUZ', 'ANJO', 'SANTO', 'IGREJA', 'BIBLIA', 'AMOR', 'PAZ', 'LUZ', 'TERCO', 'FE', 'CEU', 'GRACA'];
const FIGURAS_DA_MEMORIA = ['cruz', 'coracao', 'estrela', 'pomba', 'vela', 'calice', 'igreja', 'coroa', 'terco', 'sino', 'livro', 'chave'];

let idadeDosJogos = null;
let jogoAtual = null;

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

function iconeDoJogo(nome) {
  return `<svg class="icone" viewBox="0 0 24 24" aria-hidden="true"><use href="#icone-${nome}"></use></svg>`;
}

function recordesDosJogos() {
  try { return JSON.parse(localStorage.getItem(CHAVE_DOS_JOGOS) || '{}') || {}; } catch (e) { return {}; }
}

function guardarRecordeDoJogo(id, estrelas) {
  const recordes = recordesDosJogos();
  if ((recordes[id] || 0) >= estrelas) return;
  recordes[id] = estrelas;
  try { localStorage.setItem(CHAVE_DOS_JOGOS, JSON.stringify(recordes)); } catch (e) {}
}

function desenhoDaMel() {
  const la = [[60, 62, 34], [33, 58, 18], [87, 58, 18], [42, 38, 16], [78, 38, 16], [60, 32, 17], [34, 80, 16], [86, 80, 16], [60, 90, 19]];
  return `<svg class="personagem-svg" viewBox="0 0 120 130" aria-hidden="true">
    <g class="personagem-corpo">
      <g fill="#6b5543">${[40, 52, 62, 74].map((x) => `<rect x="${x}" y="96" width="7" height="22" rx="3.5"/>`).join('')}</g>
      <g fill="#fffaf0" stroke="#e6d6b8" stroke-width="1.5">${la.map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}"/>`).join('')}</g>
      <g class="personagem-rosto">
        <ellipse cx="37" cy="64" rx="11" ry="5" fill="#f3d2b3" transform="rotate(-22 37 64)"/>
        <ellipse cx="83" cy="64" rx="11" ry="5" fill="#f3d2b3" transform="rotate(22 83 64)"/>
        <ellipse cx="60" cy="68" rx="19" ry="21" fill="#f6dcc3" stroke="#e2bf9c" stroke-width="1.2"/>
        <circle cx="60" cy="48" r="10" fill="#fffaf0"/><circle cx="51" cy="51" r="7" fill="#fffaf0"/><circle cx="69" cy="51" r="7" fill="#fffaf0"/>
        <g class="personagem-olhos"><ellipse cx="53" cy="67" rx="3.2" ry="4.2" fill="#2b1d05"/><ellipse cx="67" cy="67" rx="3.2" ry="4.2" fill="#2b1d05"/><circle cx="54.2" cy="65.4" r="1.1" fill="#fff"/><circle cx="68.2" cy="65.4" r="1.1" fill="#fff"/></g>
        <ellipse cx="48" cy="75" rx="4" ry="2.4" fill="#f4978e" opacity=".6"/><ellipse cx="72" cy="75" rx="4" ry="2.4" fill="#f4978e" opacity=".6"/>
        <path d="M55 78 Q60 83 65 78" fill="none" stroke="#2b1d05" stroke-width="2" stroke-linecap="round"/>
      </g>
    </g>
  </svg>`;
}

function desenhoDaClara() {
  return `<svg class="personagem-svg" viewBox="0 0 120 140" aria-hidden="true">
    <defs><linearGradient id="clara-cera" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#f3e2bf"/><stop offset=".45" stop-color="#fffaf0"/><stop offset="1" stop-color="#e9d2a6"/></linearGradient><radialGradient id="clara-fogo" cx="50%" cy="70%" r="60%"><stop offset="0" stop-color="#fffbe0"/><stop offset=".5" stop-color="#ffd66b"/><stop offset="1" stop-color="#f08a1c"/></radialGradient></defs>
    <g class="personagem-corpo">
      <circle class="personagem-aura" cx="60" cy="22" r="22" fill="#ffd66b" opacity=".18"/>
      <path class="personagem-chama" d="M60 4 C66 14 72 20 72 28 C72 36 66 42 60 42 C54 42 48 36 48 28 C48 20 54 14 60 4 Z" fill="url(#clara-fogo)"/>
      <path d="M60 36 V44" stroke="#3a2a14" stroke-width="2.4" stroke-linecap="round"/>
      <path d="M22 92 L34 84 M98 92 L86 84" stroke="#e2c38c" stroke-width="5" stroke-linecap="round"/>
      <rect x="34" y="44" width="52" height="82" rx="16" fill="url(#clara-cera)" stroke="#dcc08c" stroke-width="1.5"/>
      <path d="M34 58 C40 58 40 68 45 68 C50 68 50 56 56 56 C62 56 62 72 68 72 C74 72 74 58 80 58 C84 58 86 56 86 56 V50 C86 47 84 44 80 44 H40 C36 44 34 47 34 50 Z" fill="#fffdf6"/>
      <g class="personagem-rosto">
        <g class="personagem-olhos"><ellipse cx="51" cy="84" rx="3.2" ry="4.2" fill="#2b1d05"/><ellipse cx="69" cy="84" rx="3.2" ry="4.2" fill="#2b1d05"/><circle cx="52.2" cy="82.4" r="1.1" fill="#fff"/><circle cx="70.2" cy="82.4" r="1.1" fill="#fff"/></g>
        <ellipse cx="45" cy="92" rx="4" ry="2.4" fill="#f4978e" opacity=".6"/><ellipse cx="75" cy="92" rx="4" ry="2.4" fill="#f4978e" opacity=".6"/>
        <path d="M54 95 Q60 101 66 95" fill="none" stroke="#2b1d05" stroke-width="2" stroke-linecap="round"/>
      </g>
      <ellipse cx="60" cy="128" rx="34" ry="7" fill="#d9a93f" stroke="#a8741f" stroke-width="1.5"/>
    </g>
  </svg>`;
}

function desenhoDoDom() {
  return `<svg class="personagem-svg" viewBox="0 0 120 132" aria-hidden="true">
    <defs><linearGradient id="dom-bronze" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#b8862b"/><stop offset=".4" stop-color="#f6d27a"/><stop offset="1" stop-color="#a8741f"/></linearGradient></defs>
    <g class="personagem-corpo">
      <path d="M60 14 C50 4 40 8 44 16 C47 22 56 18 60 14 C64 18 73 22 76 16 C80 8 70 4 60 14 Z" fill="#c0392b" stroke="#8e2a20" stroke-width="1.2"/>
      <circle class="personagem-badalo" cx="60" cy="112" r="8" fill="#8a5a14" stroke="#5e3d0d" stroke-width="1.5"/>
      <path d="M60 18 C38 18 30 40 30 62 L28 90 C28 97 22 100 16 104 L104 104 C98 100 92 97 92 90 L90 62 C90 40 82 18 60 18 Z" fill="url(#dom-bronze)" stroke="#8a5a14" stroke-width="1.5"/>
      <rect x="14" y="100" width="92" height="9" rx="4.5" fill="#d9a93f" stroke="#8a5a14" stroke-width="1.2"/>
      <path d="M40 40 C44 30 50 26 56 25" fill="none" stroke="#fff6d6" stroke-width="3" stroke-linecap="round" opacity=".7"/>
      <g class="personagem-rosto">
        <g class="personagem-olhos"><ellipse cx="51" cy="64" rx="3.4" ry="4.4" fill="#2b1d05"/><ellipse cx="69" cy="64" rx="3.4" ry="4.4" fill="#2b1d05"/><circle cx="52.3" cy="62.3" r="1.2" fill="#fff"/><circle cx="70.3" cy="62.3" r="1.2" fill="#fff"/></g>
        <ellipse cx="45" cy="72" rx="4" ry="2.4" fill="#f4978e" opacity=".6"/><ellipse cx="75" cy="72" rx="4" ry="2.4" fill="#f4978e" opacity=".6"/>
        <path d="M53 76 Q60 83 67 76" fill="none" stroke="#2b1d05" stroke-width="2" stroke-linecap="round"/>
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

function reagirPersonagem(estado) {
  const lugar = document.querySelector('#jogo-personagem .personagem');
  if (!lugar) return;
  clearTimeout(lugar.temporizador);
  if (lugar.classList.contains('lumi')) {
    lugar.dataset.estado = 'parada';
    void lugar.getBoundingClientRect();
    lugar.dataset.estado = estado === 'ops' ? 'errou' : 'acertou';
    lugar.dataset.rosto = estado === 'ops' ? 'quase' : 'feliz';
    lugar.dataset.bracos = estado === 'ops' ? 'baixo' : 'cima';
    lugar.temporizador = setTimeout(() => { lugar.dataset.estado = 'parada'; lugar.dataset.rosto = 'sorriso'; lugar.dataset.bracos = 'baixo'; }, 1700);
    return;
  }
  lugar.dataset.estado = 'parada';
  void lugar.getBoundingClientRect();
  lugar.dataset.estado = estado;
  lugar.temporizador = setTimeout(() => { lugar.dataset.estado = 'parada'; }, 1200);
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

function idadeInicialDosJogos() {
  const membro = typeof obterMembroAtivo === 'function' ? obterMembroAtivo() : null;
  if (membro && membro.tipo === 'crianca' && IDADES_DOS_JOGOS.some((i) => i.id === membro.faixa)) return membro.faixa;
  return 'ate7';
}

function abrirJogos() {
  if (typeof closeSidebar === 'function') closeSidebar();
  if (!idadeDosJogos) idadeDosJogos = idadeInicialDosJogos();
  mudarDeView('view-jogos');
  mostrarListaDeJogos();
  window.scrollTo({ top: 0, behavior: 'auto' });
}

function mostrarListaDeJogos() {
  const lugar = document.getElementById('jogos-container');
  if (!lugar) return;
  jogoAtual = null;
  const recordes = recordesDosJogos();
  const jogos = JOGOS.filter((jogo) => jogo.idades.includes(idadeDosJogos));
  lugar.innerHTML = `
    <button type="button" class="btn-back" id="btn-back-jogos"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg><span>${textoDoJogo('Voltar para o início')}</span></button>
    <header class="jogos-topo">
      <div class="jogos-turma">${['mel', 'lumi', 'clara', 'dom'].map((id, i) => `<span class="jogos-amigo" style="--i:${i}">${htmlDoPersonagem(id)}<small>${PERSONAGENS_DOS_JOGOS[id].nome}</small></span>`).join('')}</div>
      <h2 class="jogos-titulo">${textoDoJogo('Joguinhos')}</h2>
      <p class="jogos-sub">${textoDoJogo('Brinque e aprenda com a Lumi e os amigos dela.')}</p>
    </header>
    <div class="jogos-idades" role="tablist" aria-label="${textoDoJogo('Idade')}">${IDADES_DOS_JOGOS.map((idade) => `<button type="button" class="jogos-idade${idade.id === idadeDosJogos ? ' ativa' : ''}" role="tab" aria-selected="${idade.id === idadeDosJogos}" data-idade="${idade.id}">${textoDoJogo(idade.rotulo)}</button>`).join('')}</div>
    <div class="jogos-grade">${jogos.map((jogo, i) => `
      <button type="button" class="jogo-cartao" data-jogo="${jogo.id}" style="--i:${i}">
        <span class="jogo-cartao-arte">${htmlDoPersonagem(jogo.personagem)}</span>
        <span class="jogo-cartao-textos">
          <strong>${textoDoJogo(jogo.nome)}</strong>
          <small>${textoDoJogo(jogo.texto)}</small>
          <span class="jogo-cartao-estrelas" aria-label="${textoDoJogo('{n} de 3 estrelas', { n: recordes[jogo.id] || 0 })}">${[1, 2, 3].map((n) => `<i class="${(recordes[jogo.id] || 0) >= n ? 'ganha' : ''}"></i>`).join('')}</span>
        </span>
        <span class="jogo-cartao-jogar">${textoDoJogo('Jogar')}</span>
      </button>`).join('')}</div>`;
  document.getElementById('btn-back-jogos').addEventListener('click', () => mudarDeView('view-home'));
  lugar.querySelectorAll('.jogos-idade').forEach((botao) => {
    botao.addEventListener('click', () => { idadeDosJogos = botao.dataset.idade; mostrarListaDeJogos(); });
  });
  lugar.querySelectorAll('.jogo-cartao').forEach((botao) => {
    botao.addEventListener('click', () => comecarJogo(botao.dataset.jogo));
  });
}

function comecarJogo(id) {
  const jogo = JOGOS.find((j) => j.id === id);
  const lugar = document.getElementById('jogos-container');
  if (!jogo || !lugar) return;
  jogoAtual = { jogo, erros: 0, fim: false };
  lugar.innerHTML = `
    <div class="jogo-tela" data-jogo="${jogo.id}">
      <div class="jogo-cabecalho">
        <button type="button" class="jogo-voltar" id="jogo-voltar"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg><span>${textoDoJogo('Outros jogos')}</span></button>
        <strong class="jogo-nome">${textoDoJogo(jogo.nome)}</strong>
        <span class="jogo-placar" id="jogo-placar"></span>
      </div>
      <div class="jogo-guia"><span class="jogo-personagem" id="jogo-personagem">${htmlDoPersonagem(jogo.personagem)}</span><p class="jogo-balao" id="jogo-balao" aria-live="polite"></p></div>
      <div class="jogo-area" id="jogo-area"></div>
    </div>`;
  document.getElementById('jogo-voltar').addEventListener('click', () => {
    if (typeof pararVozInfantil === 'function') pararVozInfantil(false);
    mostrarListaDeJogos();
  });
  window.scrollTo({ top: 0, behavior: 'auto' });
  const comecar = { estrelas: jogoDasEstrelas, sombras: jogoDasSombras, memoria: jogoDaMemoria, simbolos: jogoDosSimbolos, historia: jogoDaHistoria, palavras: jogoDasPalavras }[id];
  comecar(document.getElementById('jogo-area'));
}

function placarDoJogo(texto) {
  const placar = document.getElementById('jogo-placar');
  if (placar) placar.textContent = texto;
}

function terminarJogo(estrelas) {
  if (!jogoAtual || jogoAtual.fim) return;
  jogoAtual.fim = true;
  guardarRecordeDoJogo(jogoAtual.jogo.id, estrelas);
  somDoJogo('fim');
  const frases = { 3: 'Perfeito! Você foi incrível!', 2: 'Muito bem! Você conseguiu!', 1: 'Você conseguiu! Vamos de novo?' };
  falarNoJogo(textoDoJogo(frases[estrelas]), 'vitoria');
  const area = document.getElementById('jogo-area');
  if (!area) return;
  area.insertAdjacentHTML('beforeend', `
    <div class="jogo-fim">
      <div class="jogo-fim-caixa">
        <span class="jogo-fim-estrelas">${[1, 2, 3].map((n) => `<i class="${estrelas >= n ? 'ganha' : ''}" style="--i:${n}"></i>`).join('')}</span>
        <strong>${textoDoJogo('Parabéns!')}</strong>
        <div class="jogo-fim-botoes">
          <button type="button" class="jogo-botao" id="jogo-de-novo">${textoDoJogo('Jogar de novo')}</button>
          <button type="button" class="jogo-botao jogo-botao-claro" id="jogo-outros">${textoDoJogo('Outros jogos')}</button>
        </div>
      </div>
    </div>`);
  const id = jogoAtual.jogo.id;
  document.getElementById('jogo-de-novo').addEventListener('click', () => comecarJogo(id));
  document.getElementById('jogo-outros').addEventListener('click', mostrarListaDeJogos);
}

function estrelasPelosErros(erros, limites) {
  if (erros <= limites[0]) return 3;
  if (erros <= limites[1]) return 2;
  return 1;
}

function jogoDasEstrelas(area) {
  const meta = 10;
  let acesas = 0;
  area.innerHTML = '<div class="jogo-ceu" id="jogo-ceu"></div>';
  const ceu = document.getElementById('jogo-ceu');
  placarDoJogo(`0/${meta}`);
  falarNoJogo(textoDoJogo('Toque nas estrelinhas para acender o céu!'));
  const nova = () => {
    if (acesas + ceu.querySelectorAll('.jogo-estrela:not(.acesa)').length >= meta) return;
    const estrela = document.createElement('button');
    estrela.type = 'button';
    estrela.className = 'jogo-estrela';
    estrela.setAttribute('aria-label', textoDoJogo('Estrela'));
    estrela.style.left = `${10 + Math.random() * 78}%`;
    estrela.style.top = `${10 + Math.random() * 72}%`;
    estrela.innerHTML = '<svg viewBox="0 0 100 100" aria-hidden="true"><path d="M50 0C52 35 65 48 100 50C65 52 52 65 50 100C48 65 35 52 0 50C35 48 48 35 50 0Z"/></svg>';
    estrela.addEventListener('click', () => {
      if (estrela.classList.contains('acesa')) return;
      estrela.classList.add('acesa');
      acesas += 1;
      placarDoJogo(`${acesas}/${meta}`);
      somDoJogo('certo');
      if (acesas % 3 === 0 && acesas < meta) falarNoJogo(textoDoJogo('Que lindo! Continue!'), 'feliz');
      else reagirPersonagem('feliz');
      if (acesas >= meta) setTimeout(() => terminarJogo(3), 500);
      else setTimeout(nova, 250);
    });
    ceu.appendChild(estrela);
  };
  nova();
  nova();
  nova();
}

function jogoDasSombras(area) {
  const amigos = ['lumi', 'mel', 'clara', 'dom'];
  const rodadas = embaralharDoJogo(amigos.concat(embaralharDoJogo(amigos).slice(0, 1)));
  let rodada = 0;
  const mostrar = () => {
    if (rodada >= rodadas.length) { terminarJogo(estrelasPelosErros(jogoAtual.erros, [0, 2])); return; }
    const certo = rodadas[rodada];
    const opcoes = embaralharDoJogo([certo].concat(embaralharDoJogo(amigos.filter((a) => a !== certo)).slice(0, 2)));
    placarDoJogo(`${rodada + 1}/${rodadas.length}`);
    area.innerHTML = `
      <div class="jogo-sombras">
        <div class="jogo-sombra-modelo">${htmlDoPersonagem(certo)}</div>
        <div class="jogo-sombra-opcoes">${opcoes.map((id) => `<button type="button" class="jogo-sombra" data-amigo="${id}" aria-label="${textoDoJogo('Sombra')}">${htmlDoPersonagem(id)}</button>`).join('')}</div>
      </div>`;
    falarNoJogo(textoDoJogo('Qual é a sombra de {nome}?', { nome: PERSONAGENS_DOS_JOGOS[certo].nome }));
    area.querySelectorAll('.jogo-sombra').forEach((botao) => {
      botao.addEventListener('click', () => {
        if (botao.dataset.amigo === certo) {
          botao.classList.add('certa');
          somDoJogo('certo');
          falarNoJogo(textoDoJogo('Isso mesmo!'), 'feliz');
          rodada += 1;
          setTimeout(mostrar, 900);
        } else {
          jogoAtual.erros += 1;
          botao.classList.remove('errada');
          void botao.offsetWidth;
          botao.classList.add('errada');
          somDoJogo('errado');
          falarNoJogo(textoDoJogo('Quase! Tente outra.'), 'ops');
        }
      });
    });
  };
  mostrar();
}

function jogoDaMemoria(area) {
  const pares = { ate7: 3, '8a12': 6, '13a17': 8 }[idadeDosJogos] || 3;
  const figuras = embaralharDoJogo(FIGURAS_DA_MEMORIA).slice(0, pares);
  const cartas = embaralharDoJogo(figuras.concat(figuras));
  let viradas = [];
  let achados = 0;
  let jogadas = 0;
  area.innerHTML = `<div class="jogo-memoria" style="--colunas:${pares <= 3 ? 3 : 4}">${cartas.map((figura, i) => `
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
        somDoJogo('certo');
        if (achados >= pares) setTimeout(() => terminarJogo(estrelasPelosErros(jogadas - pares, [Math.ceil(pares / 2), pares + 2])), 600);
        else falarNoJogo(textoDoJogo('Achou um par!'), 'feliz');
      } else {
        setTimeout(() => {
          a.classList.remove('virada');
          b.classList.remove('virada');
          viradas = [];
        }, 850);
      }
    });
  });
}

function jogoDosSimbolos(area) {
  const perguntas = embaralharDoJogo(SIMBOLOS_DOS_SANTOS).slice(0, idadeDosJogos === '13a17' ? 8 : 6);
  let indice = 0;
  const mostrar = () => {
    if (indice >= perguntas.length) { terminarJogo(estrelasPelosErros(jogoAtual.erros, [0, 2])); return; }
    const pergunta = perguntas[indice];
    const opcoes = embaralharDoJogo([pergunta].concat(embaralharDoJogo(SIMBOLOS_DOS_SANTOS.filter((s) => s !== pergunta)).slice(0, idadeDosJogos === '13a17' ? 3 : 2)));
    placarDoJogo(`${indice + 1}/${perguntas.length}`);
    area.innerHTML = `
      <div class="jogo-simbolos">
        <div class="jogo-simbolo-santo"><span class="jogo-simbolo-foto" id="jogo-simbolo-foto">${iconeDoJogo('estrela')}</span><strong>${textoDoJogo(pergunta.nome)}</strong></div>
        <div class="jogo-opcoes">${opcoes.map((opcao) => `<button type="button" class="jogo-opcao" data-santo="${opcao.santo}">${textoDoJogo(opcao.simbolo)}</button>`).join('')}</div>
      </div>`;
    falarNoJogo(textoDoJogo('O que aparece nas imagens de {nome}?', { nome: textoDoJogo(pergunta.nome) }));
    const santo = typeof santosData !== 'undefined' ? santosData.find((s) => s.id === pergunta.santo) : null;
    if (santo && typeof buscarImagemSanto === 'function') {
      buscarImagemSanto(santo).then((url) => {
        const foto = document.getElementById('jogo-simbolo-foto');
        if (url && foto) foto.innerHTML = `<img src="${url}" alt="">`;
      });
    }
    area.querySelectorAll('.jogo-opcao').forEach((botao) => {
      botao.addEventListener('click', () => {
        if (area.querySelector('.jogo-opcao.certa')) return;
        if (botao.dataset.santo === pergunta.santo) {
          botao.classList.add('certa');
          somDoJogo('certo');
          falarNoJogo(textoDoJogo('Isso mesmo!'), 'feliz');
          indice += 1;
          setTimeout(mostrar, 1000);
        } else {
          jogoAtual.erros += 1;
          botao.classList.add('errada');
          botao.disabled = true;
          somDoJogo('errado');
          falarNoJogo(textoDoJogo('Quase! Tente outra.'), 'ops');
        }
      });
    });
  };
  mostrar();
}

function jogoDaHistoria(area) {
  const historia = HISTORIAS_DOS_JOGOS[Math.floor(Math.random() * HISTORIAS_DOS_JOGOS.length)];
  const passos = idadeDosJogos === '13a17' ? historia.passos : historia.passos.slice(0, 4);
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
        somDoJogo('certo');
        if (proximo >= passos.length) setTimeout(() => terminarJogo(estrelasPelosErros(jogoAtual.erros, [0, 2])), 500);
        else falarNoJogo(textoDoJogo('Certo! E depois?'), 'feliz');
      } else {
        jogoAtual.erros += 1;
        peca.classList.remove('errada');
        void peca.offsetWidth;
        peca.classList.add('errada');
        somDoJogo('errado');
        falarNoJogo(textoDoJogo('Ainda não. Isso veio depois.'), 'ops');
      }
    });
  });
}

function montarCacaPalavras(palavras, lado, diagonal) {
  const grade = Array.from({ length: lado }, () => Array(lado).fill(''));
  const direcoes = [[0, 1], [1, 0]].concat(diagonal ? [[1, 1]] : []);
  const colocadas = [];
  palavras.forEach((palavra) => {
    for (let tentativa = 0; tentativa < 200; tentativa += 1) {
      const [dl, dc] = direcoes[Math.floor(Math.random() * direcoes.length)];
      const linha = Math.floor(Math.random() * (lado - dl * (palavra.length - 1)));
      const coluna = Math.floor(Math.random() * (lado - dc * (palavra.length - 1)));
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
  const maior = idadeDosJogos === '13a17';
  const lado = maior ? 10 : 8;
  const escolhidas = embaralharDoJogo(PALAVRAS_DOS_JOGOS.filter((p) => p.length <= lado)).slice(0, maior ? 7 : 5);
  const { grade, colocadas } = montarCacaPalavras(escolhidas, lado, maior);
  let inicio = null;
  let achadas = 0;
  area.innerHTML = `
    <div class="jogo-palavras">
      <div class="jogo-grade-letras" style="--lado:${lado}">${grade.map((linha, l) => linha.map((letra, c) => `<button type="button" class="jogo-letra" data-celula="${l}-${c}">${letra}</button>`).join('')).join('')}</div>
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
      if (!achada) {
        jogoAtual.erros += 1;
        somDoJogo('errado');
        falarNoJogo(textoDoJogo('Não é essa. Tente de novo!'), 'ops');
        return;
      }
      achada.achada = true;
      achadas += 1;
      achada.celulas.forEach((celula) => area.querySelector(`[data-celula="${celula}"]`).classList.add('achada'));
      area.querySelector(`[data-palavra="${achada.palavra}"]`).classList.add('achada');
      placarDoJogo(`${achadas}/${colocadas.length}`);
      somDoJogo('certo');
      if (achadas >= colocadas.length) setTimeout(() => terminarJogo(estrelasPelosErros(jogoAtual.erros, [1, 4])), 500);
      else falarNoJogo(textoDoJogo('Achou: {palavra}!', { palavra: achada.palavra }), 'feliz');
    });
  });
}

function iniciarJogos() {
  const nav = document.getElementById('nav-jogos');
  if (nav) nav.addEventListener('click', abrirJogos);
}

document.addEventListener('DOMContentLoaded', () => {
  if (typeof rodarComSeguranca === 'function') rodarComSeguranca('joguinhos', iniciarJogos);
  else iniciarJogos();
});
