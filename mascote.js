const NOME_DO_MASCOTE = 'Lumi';
const CHAVE_VOZ_INFANTIL = 'lumina-sancti-voz-kids';

const FALAS_DA_LUMI = {
  pt: {
    ola: 'Oi! Eu sou a {nome}. Vamos aprender juntos?',
    pergunta: ['Vamos lá!', 'Escute comigo.', 'Pense com calma.', 'Você consegue!'],
    acertou: ['Muito bem!', 'Isso mesmo!', 'Que lindo!', 'Você acertou!', 'Parabéns!'],
    errou: ['Quase! Vamos de novo.', 'Tudo bem! Vamos tentar de novo.', 'Quase lá! Você vai conseguir.'],
    errouSemRepetir: ['Quase! Agora você já sabe.', 'Tudo bem! É assim que a gente aprende.', 'Quase! Vamos para a próxima.'],
    respostaCerta: 'A resposta certa é: {r}.',
    verdadeiroOuFalso: 'Verdadeiro ou falso?',
    concluiu: ['Você conseguiu!', 'Missão cumprida! Que alegria!'],
    medalha: 'Você ganhou uma medalha! Estou tão feliz!',
    cansada: 'Vamos descansar um pouquinho. Já, já a gente volta!',
    historia: 'Vamos ouvir uma historinha?',
    mapa: 'Oi! Eu sou a {nome}. Escolha uma missão!',
    mapaCansada: 'Estou descansando um pouquinho. Logo a gente volta a brincar!',
    tocarParaOuvir: '{nome}. Toque para ouvir de novo.',
    ligarVoz: 'Ligar a voz',
    desligarVoz: 'Desligar a voz',
    areaDosAdultos: 'Desculpa! Você é criança, e essa parte do site é só para os adultos. Que tal continuar a sua trilha dos santos?',
    areaDosAdultosBotao: 'Tudo bem!',
  },
  en: {
    ola: "Hi! I'm {nome}. Shall we learn together?",
    pergunta: ["Let's go!", 'Listen with me.', 'Take your time.', 'You can do it!'],
    acertou: ['Well done!', "That's right!", 'How lovely!', 'You got it!', 'Great job!'],
    errou: ["Almost! Let's try again.", "That's okay! Let's try again.", 'So close! You can do it.'],
    errouSemRepetir: ['Almost! Now you know.', "That's okay! That's how we learn.", 'Almost! On to the next one.'],
    respostaCerta: 'The right answer is: {r}.',
    verdadeiroOuFalso: 'True or false?',
    concluiu: ['You did it!', 'Mission complete! What a joy!'],
    medalha: 'You won a medal! I am so happy!',
    cansada: "Let's rest a little. We'll be back very soon!",
    historia: 'Shall we listen to a little story?',
    mapa: "Hi! I'm {nome}. Pick a mission!",
    mapaCansada: "I'm resting a little. We'll play again soon!",
    tocarParaOuvir: '{nome}. Tap to hear it again.',
    ligarVoz: 'Turn the voice on',
    desligarVoz: 'Turn the voice off',
    areaDosAdultos: 'Sorry! You are a kid, and this part of the site is only for grown-ups. How about continuing your saints trail?',
    areaDosAdultosBotao: 'Okay!',
  },
  es: {
    ola: '¡Hola! Soy {nome}. ¿Aprendemos juntos?',
    pergunta: ['¡Vamos!', 'Escucha conmigo.', 'Piensa con calma.', '¡Tú puedes!'],
    acertou: ['¡Muy bien!', '¡Eso es!', '¡Qué lindo!', '¡Acertaste!', '¡Felicidades!'],
    errou: ['¡Casi! Vamos otra vez.', '¡Está bien! Intentémoslo otra vez.', '¡Ya casi! Tú puedes.'],
    errouSemRepetir: ['¡Casi! Ahora ya lo sabes.', '¡Está bien! Así se aprende.', '¡Casi! Vamos a la siguiente.'],
    respostaCerta: 'La respuesta correcta es: {r}.',
    verdadeiroOuFalso: '¿Verdadero o falso?',
    concluiu: ['¡Lo lograste!', '¡Misión cumplida! ¡Qué alegría!'],
    medalha: '¡Ganaste una medalla! ¡Estoy muy feliz!',
    cansada: 'Descansemos un poquito. ¡Muy pronto volvemos!',
    historia: '¿Escuchamos una historia cortita?',
    mapa: '¡Hola! Soy {nome}. ¡Elige una misión!',
    mapaCansada: 'Estoy descansando un poquito. ¡Pronto volvemos a jugar!',
    tocarParaOuvir: '{nome}. Toca para escuchar otra vez.',
    ligarVoz: 'Encender la voz',
    desligarVoz: 'Apagar la voz',
    areaDosAdultos: '¡Perdón! Eres un niño, y esta parte del sitio es solo para los adultos. ¿Qué tal seguir tu sendero de los santos?',
    areaDosAdultosBotao: '¡Está bien!',
  },
};

function falasDaLumi() {
  const idioma = typeof idiomaAtual !== 'undefined' && FALAS_DA_LUMI[idiomaAtual] ? idiomaAtual : 'pt';
  return FALAS_DA_LUMI[idioma];
}

function sortearFala(lista) {
  return Array.isArray(lista) ? lista[Math.floor(Math.random() * lista.length)] : lista;
}

function comNomeDaLumi(texto) {
  return String(texto).replace('{nome}', NOME_DO_MASCOTE);
}

function modoInfantilAtivo() {
  return !!(document.body && document.body.classList.contains('modo-kids'));
}

const vozInfantil = {
  liberada: false,
  pendente: null,
  falando: false,
  vez: 0,
  escolhidas: {},
};

function vozInfantilDisponivel() {
  return typeof window !== 'undefined' && 'speechSynthesis' in window && typeof SpeechSynthesisUtterance !== 'undefined';
}

function vozInfantilLigada() {
  try {
    return localStorage.getItem(CHAVE_VOZ_INFANTIL) !== 'desligada';
  } catch (e) {
    return true;
  }
}

function guardarVozInfantil(ligada) {
  try {
    localStorage.setItem(CHAVE_VOZ_INFANTIL, ligada ? 'ligada' : 'desligada');
  } catch (e) {
  }
}

const VOZES_FEMININAS = {
  pt: ['francisca', 'thalita', 'luciana', 'fernanda', 'maria', 'leila', 'leticia', 'letícia', 'manuela', 'brenda', 'elza', 'giovanna', 'yara', 'vitoria', 'vitória', 'google português', 'joana', 'catarina', 'raquel', 'female', 'feminina'],
  en: ['aria', 'jenny', 'samantha', 'ava', 'allison', 'susan', 'zira', 'michelle', 'emma', 'karen', 'moira', 'tessa', 'serena', 'fiona', 'victoria', 'libby', 'sonia', 'hazel', 'natasha', 'google us english', 'google uk english female', 'female'],
  es: ['paulina', 'dalia', 'elvira', 'helena', 'laura', 'sabina', 'monica', 'mónica', 'marisol', 'soledad', 'paloma', 'elena', 'ximena', 'larissa', 'triana', 'google español', 'female', 'femenina'],
};
const VOZES_MASCULINAS = ['daniel', 'antonio', 'antônio', 'felipe', 'diego', 'jorge', 'juan', 'pablo', 'raul', 'david', 'mark', 'alex', 'fred', 'guy', 'ryan', 'george', 'james', 'thomas', 'paul', 'luciano', 'julio', 'ricardo', 'fabio', 'humberto', 'nicolau', 'duarte', 'cristiano', 'alvaro', 'enrique', 'carlos', 'gonzalo', 'tomas', 'jorge', 'male', 'masculina', 'masculino'];

function idiomaDaVozInfantil() {
  const idioma = typeof idiomaAtual !== 'undefined' ? idiomaAtual : 'pt';
  return idioma === 'en' || idioma === 'es' ? idioma : 'pt';
}

function codigoDaVozInfantil() {
  return { pt: 'pt-BR', en: 'en-US', es: 'es-ES' }[idiomaDaVozInfantil()];
}

function escolherVozFeminina() {
  const idioma = idiomaDaVozInfantil();
  if (vozInfantil.escolhidas[idioma]) return vozInfantil.escolhidas[idioma];
  const todas = window.speechSynthesis.getVoices() || [];
  const normal = (v) => String(v.lang || '').toLowerCase().replace('_', '-');
  const doIdioma = todas.filter((v) => normal(v).startsWith(idioma));
  if (doIdioma.length === 0) return null;
  const regiao = codigoDaVozInfantil().toLowerCase();
  const grupos = [doIdioma.filter((v) => normal(v) === regiao), doIdioma.filter((v) => normal(v) !== regiao)];
  const nome = (v) => String(v.name || '').toLowerCase();
  let escolhida = null;
  for (const grupo of grupos) {
    for (const feminina of VOZES_FEMININAS[idioma]) {
      escolhida = grupo.find((v) => nome(v).includes(feminina) && !VOZES_MASCULINAS.some((m) => nome(v).includes(m)));
      if (escolhida) break;
    }
    if (escolhida) break;
  }
  if (!escolhida) {
    escolhida = grupos[0].concat(grupos[1]).find((v) => !VOZES_MASCULINAS.some((m) => nome(v).includes(m))) || doIdioma[0];
  }
  vozInfantil.escolhidas[idioma] = escolhida;
  return escolhida;
}

function textoParaFalar(texto) {
  const semTags = String(texto == null ? '' : texto).replace(/<[^>]+>/g, ' ');
  let limpo = semTags;
  try {
    const caixa = document.createElement('textarea');
    caixa.innerHTML = semTags;
    if (typeof caixa.value === 'string') limpo = caixa.value;
  } catch (e) {
  }
  return limpo.replace(/\s+/g, ' ').trim();
}

function navegadorJaFoiTocado() {
  return vozInfantil.liberada;
}

function dizerEmVoz(textos) {
  const sintese = window.speechSynthesis;
  sintese.cancel();
  const voz = escolherVozFeminina();
  const minhaVez = ++vozInfantil.vez;
  vozInfantil.falando = true;
  textos.forEach((texto, i) => {
    const fala = new SpeechSynthesisUtterance(texto);
    fala.lang = voz ? voz.lang : codigoDaVozInfantil();
    if (voz) fala.voice = voz;
    fala.rate = 0.88;
    fala.pitch = 1.3;
    if (i === textos.length - 1) {
      const terminou = () => { if (vozInfantil.vez === minhaVez) vozInfantil.falando = false; };
      fala.onend = terminou;
      fala.onerror = terminou;
    }
    sintese.speak(fala);
  });
}

function falarParaCrianca(partes) {
  if (!modoInfantilAtivo() || !vozInfantilDisponivel() || !vozInfantilLigada()) return;
  const textos = (partes || []).map(textoParaFalar).filter(Boolean);
  if (textos.length === 0) return;
  if (!navegadorJaFoiTocado()) {
    vozInfantil.pendente = textos;
    return;
  }
  dizerEmVoz(textos);
}

function pararVozInfantil(mesmoSemFalar) {
  vozInfantil.pendente = null;
  if (!vozInfantilDisponivel()) return;
  if (mesmoSemFalar || vozInfantil.falando) {
    vozInfantil.vez += 1;
    vozInfantil.falando = false;
    window.speechSynthesis.cancel();
  }
}

function liberarVozNoPrimeiroToque() {
  const eventos = ['pointerdown', 'touchstart', 'keydown', 'click'];
  const liberar = () => {
    if (vozInfantil.liberada) return;
    vozInfantil.liberada = true;
    eventos.forEach((tipo) => document.removeEventListener(tipo, liberar, true));
    const pendente = vozInfantil.pendente;
    vozInfantil.pendente = null;
    if (pendente && modoInfantilAtivo() && vozInfantilLigada() && vozInfantilDisponivel()) dizerEmVoz(pendente);
  };
  eventos.forEach((tipo) => document.addEventListener(tipo, liberar, true));
}

let contadorDeLumis = 0;

function desenhoDaLumi() {
  contadorDeLumis += 1;
  const id = `lumi-${contadorDeLumis}`;
  const faisca = (dx, dy, atraso) => `<path class="lumi-faisca" style="--dx:${dx}px;--dy:${dy}px;--atraso:${atraso}s" transform="translate(60 64)" d="M0 -7 C1 -2 2 -1 7 0 C2 1 1 2 0 7 C-1 2 -2 1 -7 0 C-2 -1 -1 -2 0 -7 Z"/>`;
  return `
    <svg class="lumi-svg" viewBox="0 0 120 140" aria-hidden="true" focusable="false">
      <defs>
        <radialGradient id="${id}-corpo" cx="42%" cy="36%" r="72%">
          <stop offset="0%" stop-color="#fff6d5"/>
          <stop offset="45%" stop-color="#f5d77a"/>
          <stop offset="100%" stop-color="#d4af37"/>
        </radialGradient>
        <radialGradient id="${id}-aura" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#f5d77a" stop-opacity="0.45"/>
          <stop offset="100%" stop-color="#f5d77a" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <ellipse class="lumi-sombra" cx="60" cy="128" rx="27" ry="4.5"/>
      <g class="lumi-faiscas">
        ${faisca(-46, -40, 0)}${faisca(48, -38, 0.08)}${faisca(-54, 8, 0.16)}${faisca(54, 12, 0.05)}${faisca(-30, 46, 0.12)}${faisca(34, 44, 0.2)}
      </g>
      <g class="lumi-corpo-todo">
        <circle class="lumi-aura" cx="60" cy="64" r="58" fill="url(#${id}-aura)"/>
        <g class="lumi-giro">
        <g class="lumi-perna lumi-perna-esq">
          <path d="M52 96 L47 118"/>
          <ellipse cx="44" cy="120.5" rx="7" ry="4"/>
        </g>
        <g class="lumi-perna lumi-perna-dir">
          <path d="M68 96 L73 118"/>
          <ellipse cx="76" cy="120.5" rx="7" ry="4"/>
        </g>
        <g class="lumi-braco lumi-braco-esq">
          <path d="M20 70 Q13 77 13 87"/>
          <circle cx="13" cy="89.5" r="5"/>
        </g>
        <g class="lumi-braco lumi-braco-dir">
          <path d="M100 70 Q107 77 107 87"/>
          <circle cx="107" cy="89.5" r="5"/>
        </g>
        <g class="lumi-tronco">
        <path class="lumi-corpo" fill="url(#${id}-corpo)" d="M60 6 C68 36 86 56 114 64 C86 72 68 88 60 114 C52 88 34 72 6 64 C34 56 52 36 60 6 Z"/>
        <g class="lumi-rosto">
          <ellipse class="lumi-bochecha" cx="41.5" cy="70" rx="5.5" ry="3.2"/>
          <ellipse class="lumi-bochecha" cx="78.5" cy="70" rx="5.5" ry="3.2"/>
          <g class="lumi-olhos lumi-olhos-abertos">
            <ellipse cx="50" cy="59.5" rx="4.4" ry="5.9"/>
            <ellipse cx="70" cy="59.5" rx="4.4" ry="5.9"/>
            <circle class="lumi-brilho-olho" cx="51.7" cy="57" r="1.7"/>
            <circle class="lumi-brilho-olho" cx="71.7" cy="57" r="1.7"/>
          </g>
          <g class="lumi-olhos lumi-olhos-felizes">
            <path d="M45.3 61 Q50 54 54.7 61"/>
            <path d="M65.3 61 Q70 54 74.7 61"/>
          </g>
          <g class="lumi-olhos lumi-olhos-fechados">
            <path d="M45.3 59 Q50 64 54.7 59"/>
            <path d="M65.3 59 Q70 64 74.7 59"/>
          </g>
          <path class="lumi-boca lumi-boca-sorriso" d="M53.5 71 Q60 77.5 66.5 71"/>
          <g class="lumi-boca lumi-boca-grande">
            <path d="M51 69.5 Q60 84 69 69.5 Z"/>
            <ellipse cx="60" cy="77" rx="4.2" ry="2.4"/>
          </g>
          <path class="lumi-boca lumi-boca-quase" d="M53.5 74.5 Q56.75 71.5 60 74.5 Q63.25 77.5 66.5 74.5"/>
          <ellipse class="lumi-boca lumi-boca-sono" cx="60" cy="74" rx="2.5" ry="3"/>
          <g class="lumi-olhos lumi-olhos-tristes">
            <path class="lumi-sobrancelha" d="M44 53.5 Q49 52.5 54.5 49.5"/>
            <path class="lumi-sobrancelha" d="M65.5 49.5 Q71 52.5 76 53.5"/>
            <ellipse cx="50" cy="61" rx="4.1" ry="5"/>
            <ellipse cx="70" cy="61" rx="4.1" ry="5"/>
            <circle class="lumi-brilho-olho" cx="51.4" cy="59" r="1.5"/>
            <circle class="lumi-brilho-olho" cx="71.4" cy="59" r="1.5"/>
          </g>
          <path class="lumi-boca lumi-boca-triste" d="M53.5 76.5 Q60 70.5 66.5 76.5"/>
          <path class="lumi-lagrima" d="M46.5 66.5 C44.8 69.4 43.8 71.1 43.8 72.4 A2.7 2.7 0 0 0 49.2 72.4 C49.2 71.1 48.2 69.4 46.5 66.5 Z"/>
        </g>
        </g>
        </g>
      </g>
      <g class="lumi-zzz">
        <text x="86" y="32">z</text>
        <text x="95" y="21">z</text>
        <text x="104" y="9">Z</text>
      </g>
    </svg>`;
}

function criarPalcoDaLumi(id) {
  const palco = document.createElement('div');
  palco.id = id;
  palco.className = 'lumi-palco lumi-chegando';
  palco.innerHTML = `
    <button type="button" class="lumi" data-estado="parada" data-rosto="sorriso" data-bracos="baixo">${desenhoDaLumi()}</button>
    <p class="lumi-balao" role="status" aria-live="polite"></p>`;
  const botao = palco.querySelector('.lumi');
  botao.setAttribute('aria-label', comNomeDaLumi(falasDaLumi().tocarParaOuvir));
  botao.addEventListener('click', () => {
    const rostoDeAntes = botao.dataset.rosto;
    mudarLumi(palco, 'cutucada', rostoDeAntes === 'sorriso' ? 'feliz' : rostoDeAntes);
    if (rostoDeAntes === 'sorriso') {
      setTimeout(() => { if (botao.dataset.estado === 'parada') botao.dataset.rosto = 'sorriso'; }, DURACAO_DOS_MOVIMENTOS.cutucada + 40);
    }
    if (palco.falaParaRepetir) falarParaCrianca(palco.falaParaRepetir);
  });
  palco.addEventListener('animationend', (evento) => {
    if (evento.animationName === 'lumiChega') palco.classList.remove('lumi-chegando');
  });
  ligarGestosDaLumi();
  return palco;
}

function lumiDaLicao() {
  let palco = document.getElementById('lumi-licao');
  if (!palco) {
    const cabecalho = document.getElementById('licao-santo');
    if (!cabecalho || !cabecalho.parentNode) return null;
    palco = criarPalcoDaLumi('lumi-licao');
    cabecalho.parentNode.insertBefore(palco, cabecalho.nextSibling);
  }
  garantirBotaoDeSom();
  return palco;
}

function lumiDoMapa() {
  let palco = document.getElementById('lumi-mapa');
  if (!palco) {
    const placar = document.getElementById('trilhas-stats');
    if (!placar || !placar.parentNode) return null;
    palco = criarPalcoDaLumi('lumi-mapa');
    placar.parentNode.insertBefore(palco, placar.nextSibling);
  }
  return palco;
}

function garantirBotaoDeSom() {
  if (!vozInfantilDisponivel()) return;
  let botao = document.getElementById('lumi-som');
  if (!botao) {
    const topo = document.querySelector('.licao-topo');
    const santidade = topo ? topo.querySelector('.licao-santidade') : null;
    if (!topo) return;
    botao = document.createElement('button');
    botao.type = 'button';
    botao.id = 'lumi-som';
    botao.className = 'icon-btn lumi-som';
    botao.addEventListener('click', () => {
      const ligar = !vozInfantilLigada();
      guardarVozInfantil(ligar);
      atualizarBotaoDeSom();
      if (!ligar) {
        pararVozInfantil(true);
        return;
      }
      const palco = document.getElementById('lumi-licao');
      if (palco && palco.falaParaRepetir) falarParaCrianca(palco.falaParaRepetir);
    });
    topo.insertBefore(botao, santidade);
  }
  atualizarBotaoDeSom();
}

function atualizarBotaoDeSom() {
  const botao = document.getElementById('lumi-som');
  if (!botao) return;
  const ligada = vozInfantilLigada();
  const falas = falasDaLumi();
  botao.setAttribute('aria-pressed', ligada ? 'true' : 'false');
  botao.setAttribute('aria-label', ligada ? falas.desligarVoz : falas.ligarVoz);
  botao.title = ligada ? falas.desligarVoz : falas.ligarVoz;
  botao.innerHTML = `<svg class="icone" viewBox="0 0 24 24" aria-hidden="true"><use href="#${ligada ? 'icone-som' : 'icone-som-mudo'}"></use></svg>`;
}

function removerLumi() {
  ['lumi-licao', 'lumi-mapa', 'lumi-som'].forEach((id) => {
    const el = document.getElementById(id);
    if (el && el.parentNode) el.parentNode.removeChild(el);
  });
}

const DURACAO_DOS_MOVIMENTOS = { acertou: 1300, errou: 1900, concluiu: 2100, cutucada: 720 };
const GESTOS_DA_LUMI = { olha: 2300, acena: 1500, pulinho: 800, espreguica: 1900 };
let gestosDaLumiLigados = false;

function semMovimentoDaLumi() {
  return !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
}

function fazerGestoDaLumi() {
  const lumis = Array.from(document.querySelectorAll('.lumi-palco .lumi[data-estado="parada"]')).filter((lumi) => lumi.getClientRects().length && !lumi.dataset.gesto);
  const nomes = Object.keys(GESTOS_DA_LUMI);
  lumis.forEach((lumi) => {
    const gesto = nomes[Math.floor(Math.random() * nomes.length)];
    const rosto = lumi.dataset.rosto;
    lumi.dataset.gesto = gesto;
    if (gesto === 'espreguica' && rosto === 'sorriso') lumi.dataset.rosto = 'feliz';
    setTimeout(() => {
      delete lumi.dataset.gesto;
      if (gesto === 'espreguica' && lumi.dataset.estado === 'parada') lumi.dataset.rosto = rosto;
    }, GESTOS_DA_LUMI[gesto]);
  });
}

function ligarGestosDaLumi() {
  if (gestosDaLumiLigados || semMovimentoDaLumi()) return;
  gestosDaLumiLigados = true;
  const agendar = () => setTimeout(() => {
    if (!document.hidden) fazerGestoDaLumi();
    agendar();
  }, 6000 + Math.random() * 6000);
  agendar();
}

function mudarLumi(palco, estado, rosto, fala) {
  if (!palco) return;
  const lumi = palco.querySelector('.lumi');
  const balao = palco.querySelector('.lumi-balao');
  clearTimeout(palco.temporizadorDaLumi);
  lumi.dataset.estado = 'parada';
  delete lumi.dataset.gesto;
  void lumi.getBoundingClientRect();
  lumi.dataset.estado = estado;
  lumi.dataset.variante = String(1 + Math.floor(Math.random() * 3));
  lumi.dataset.rosto = rosto;
  lumi.dataset.bracos = (estado === 'acertou' || estado === 'concluiu') ? 'cima' : 'baixo';
  if (fala !== undefined && balao) {
    balao.textContent = fala;
    balao.classList.remove('aparecendo');
    void balao.getBoundingClientRect();
    balao.classList.add('aparecendo');
  }
  const duracao = DURACAO_DOS_MOVIMENTOS[estado];
  if (duracao) {
    palco.temporizadorDaLumi = setTimeout(() => {
      lumi.dataset.estado = 'parada';
      if (estado !== 'concluiu') lumi.dataset.bracos = 'baixo';
    }, duracao);
  }
}

const PAGINAS_SO_PARA_ADULTOS = ['view-ia', 'view-planos', 'view-termos', 'view-cenaculos', 'view-cenaculo', 'view-comunidade', 'view-cursos', 'view-suporte'];

function paginaSoParaAdultos(idDaPagina) {
  if (!modoInfantilAtivo() || !PAGINAS_SO_PARA_ADULTOS.includes(idDaPagina)) return false;
  mostrarAvisoDaLumiParaCriancas();
  return true;
}

function fecharAvisoDaLumi() {
  const modal = document.getElementById('lumi-aviso-modal');
  if (modal) modal.classList.remove('active');
  pararVozInfantil(true);
}

function mostrarAvisoDaLumiParaCriancas() {
  let modal = document.getElementById('lumi-aviso-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'lumi-aviso-modal';
    modal.className = 'search-modal';
    modal.innerHTML = '<div class="search-modal-content lumi-aviso" role="dialog" aria-modal="true"><div class="lumi-aviso-lugar"></div><button type="button" class="licao-botao" id="lumi-aviso-ok"></button></div>';
    document.body.appendChild(modal);
    modal.querySelector('#lumi-aviso-ok').addEventListener('click', fecharAvisoDaLumi);
    modal.addEventListener('click', (evento) => { if (evento.target === modal) fecharAvisoDaLumi(); });
  }
  const falas = falasDaLumi();
  const fala = comNomeDaLumi(falas.areaDosAdultos);
  const lugar = modal.querySelector('.lumi-aviso-lugar');
  lugar.innerHTML = '';
  const palco = criarPalcoDaLumi('lumi-aviso');
  lugar.appendChild(palco);
  modal.querySelector('#lumi-aviso-ok').textContent = falas.areaDosAdultosBotao;
  modal.classList.add('active');
  palco.falaParaRepetir = [fala];
  mudarLumi(palco, 'cutucada', 'quase', fala);
  falarParaCrianca([fala]);
}

let lumiPrimeiraPergunta = true;

const DURACAO_DO_VOO_DA_LUMI = 2900;
const MOMENTOS_DO_VOO = { chegada: 1250, estouro: 1500, partida: 2350 };
const CAMINHOS_DO_VOO = [
  [[-0.3, 0.86], [0.24, 0.62], [0.72, 0.44], [0.86, 0.2], [0.56, 0.07], [0.3, 0.23], [0.5, 0.4]],
  [[1.3, 0.86], [0.76, 0.62], [0.28, 0.44], [0.14, 0.2], [0.44, 0.07], [0.7, 0.23], [0.5, 0.4]],
  [[-0.3, 0.16], [0.4, 0.14], [0.92, 0.32], [0.62, 0.62], [0.14, 0.58], [0.24, 0.36], [0.5, 0.4]],
];

function vooDaLumiPodeTocar() {
  try {
    return !document.hidden
      && typeof window.requestAnimationFrame === 'function'
      && !!window.matchMedia
      && !semMovimentoDaLumi()
      && !!document.createElement('canvas').getContext('2d');
  } catch (e) {
    return false;
  }
}

function amostrarCaminhoDoVoo(pontos, largura, altura) {
  const lugar = pontos.map(([x, y]) => [x * largura, y * altura]);
  const todos = [lugar[0], ...lugar, lugar[lugar.length - 1]];
  const amostras = [];
  for (let i = 1; i < todos.length - 2; i += 1) {
    const [p0, p1, p2, p3] = [todos[i - 1], todos[i], todos[i + 1], todos[i + 2]];
    for (let k = 0; k < 40; k += 1) {
      const u = k / 40;
      const junta = (a, b, c, d) => 0.5 * (2 * b + (c - a) * u + (2 * a - 5 * b + 4 * c - d) * u * u + (3 * b - a - 3 * c + d) * u * u * u);
      amostras.push({ x: junta(p0[0], p1[0], p2[0], p3[0]), y: junta(p0[1], p1[1], p2[1], p3[1]) });
    }
  }
  amostras.push({ x: lugar[lugar.length - 1][0], y: lugar[lugar.length - 1][1] });
  let distancia = 0;
  let direcao = null;
  amostras.forEach((ponto, i) => {
    const anterior = amostras[Math.max(0, i - 1)];
    const proximo = amostras[Math.min(amostras.length - 1, i + 1)];
    if (i > 0) distancia += Math.hypot(ponto.x - anterior.x, ponto.y - anterior.y);
    let angulo = Math.atan2(proximo.y - anterior.y, proximo.x - anterior.x);
    if (direcao !== null) {
      while (angulo - direcao > Math.PI) angulo -= Math.PI * 2;
      while (angulo - direcao < -Math.PI) angulo += Math.PI * 2;
    }
    direcao = angulo;
    ponto.distancia = distancia;
    ponto.angulo = angulo;
  });
  return { amostras, total: distancia };
}

function pontoDoCaminho(caminho, fracao) {
  const alvo = caminho.total * fracao;
  const { amostras } = caminho;
  let de = 0;
  let ate = amostras.length - 1;
  while (ate - de > 1) {
    const meio = (de + ate) >> 1;
    if (amostras[meio].distancia < alvo) de = meio;
    else ate = meio;
  }
  const a = amostras[de];
  const b = amostras[ate];
  const u = (alvo - a.distancia) / Math.max(0.001, b.distancia - a.distancia);
  return { x: a.x + (b.x - a.x) * u, y: a.y + (b.y - a.y) * u, angulo: a.angulo + (b.angulo - a.angulo) * u };
}

function desenharFaiscaDoVoo() {
  const tela = document.createElement('canvas');
  tela.width = 48;
  tela.height = 48;
  const p = tela.getContext('2d');
  const brilho = p.createRadialGradient(24, 24, 0, 24, 24, 24);
  brilho.addColorStop(0, 'rgba(255, 244, 200, 0.75)');
  brilho.addColorStop(1, 'rgba(240, 190, 80, 0)');
  p.fillStyle = brilho;
  p.fillRect(0, 0, 48, 48);
  p.translate(24, 24);
  p.fillStyle = '#ffe9a8';
  p.beginPath();
  p.moveTo(0, -20);
  p.quadraticCurveTo(2, -2, 20, 0);
  p.quadraticCurveTo(2, 2, 0, 20);
  p.quadraticCurveTo(-2, 2, -20, 0);
  p.quadraticCurveTo(-2, -2, 0, -20);
  p.fill();
  return tela;
}

function tocarVooDaLumi(opcoes) {
  if (!vooDaLumiPodeTocar()) return false;
  const tela = document.createElement('div');
  tela.id = 'lumi-voo';
  tela.className = 'lumi-voo';
  tela.setAttribute('aria-live', 'polite');
  tela.innerHTML = `
    <div class="lumi-voo-fundo"></div>
    <canvas class="lumi-voo-ceu" aria-hidden="true"></canvas>
    <div class="lumi-voo-textos"><strong>${escaparTextoDoVoo(opcoes.titulo)}</strong><span>${escaparTextoDoVoo(opcoes.texto)}</span></div>
    <div class="lumi lumi-voo-boneca" data-estado="voando" data-rosto="feliz" data-bracos="cima" aria-hidden="true">${desenhoDaLumi()}</div>`;
  document.body.appendChild(tela);
  if (document.activeElement && document.activeElement.blur) document.activeElement.blur();

  const fundo = tela.querySelector('.lumi-voo-fundo');
  const ceu = tela.querySelector('.lumi-voo-ceu');
  const boneca = tela.querySelector('.lumi-voo-boneca');
  const textos = tela.querySelector('.lumi-voo-textos');
  const largura = window.innerWidth;
  const altura = window.innerHeight;
  const densidade = Math.min(window.devicePixelRatio || 1, 2);
  ceu.width = Math.round(largura * densidade);
  ceu.height = Math.round(altura * densidade);
  const pincel = ceu.getContext('2d');
  pincel.scale(densidade, densidade);
  const faisca = desenharFaiscaDoVoo();
  const caminho = amostrarCaminhoDoVoo(CAMINHOS_DO_VOO[Math.floor(Math.random() * CAMINHOS_DO_VOO.length)], largura, altura);
  const centro = pontoDoCaminho(caminho, 1);
  const anguloDeSaida = pontoDoCaminho(caminho, 0).angulo;
  const giroFinal = Math.round(((centro.angulo - anguloDeSaida) * 180) / Math.PI / 360) * 360;
  const particulas = [];
  const ondas = [];
  const comeco = performance.now();
  let anterior = comeco;
  let quadro = null;
  let revelou = false;
  let estourou = false;
  let terminou = false;
  let ultimoPonto = null;

  const soltar = (x, y, vx, vy, vida, tamanho, gravidade) => {
    if (particulas.length < 170) particulas.push({ x, y, vx, vy, vida, total: vida, tamanho, gravidade });
  };
  const revelar = () => {
    if (revelou) return;
    revelou = true;
    opcoes.aoRevelar();
  };
  const estourar = () => {
    if (estourou) return;
    estourou = true;
    tela.classList.add('estourou');
    ondas.push({ raio: 40, vida: 620, total: 620 }, { raio: 10, vida: 860, total: 860 });
    for (let i = 0; i < 52; i += 1) {
      const angulo = Math.random() * Math.PI * 2;
      const forca = 160 + Math.random() * 620;
      soltar(centro.x, centro.y, Math.cos(angulo) * forca, Math.sin(angulo) * forca, 600 + Math.random() * 900, 10 + Math.random() * 26, 520);
    }
    if (opcoes.aoEstourar) opcoes.aoEstourar();
  };
  const terminar = () => {
    if (terminou) return;
    terminou = true;
    if (quadro) cancelAnimationFrame(quadro);
    clearTimeout(garantia);
    document.removeEventListener('keydown', pularPeloTeclado, true);
    estourou = true;
    revelar();
    tela.remove();
  };
  const pularPeloTeclado = (evento) => {
    evento.preventDefault();
    evento.stopPropagation();
    terminar();
  };
  const garantia = setTimeout(terminar, DURACAO_DO_VOO_DA_LUMI + 1500);
  tela.addEventListener('pointerdown', terminar);
  document.addEventListener('keydown', pularPeloTeclado, true);

  const poseDaLumi = (t) => {
    const { chegada, estouro, partida } = MOMENTOS_DO_VOO;
    if (t < chegada) {
      const x = t / chegada;
      const andou = x < 0.72 ? 0.86 * Math.pow(x / 0.72, 1.35) : 0.86 + 0.14 * (1 - Math.pow(1 - (x - 0.72) / 0.28, 3));
      const ponto = pontoDoCaminho(caminho, andou);
      const puxao = Math.max(0, Math.min(0.13, Math.sin(Math.PI * Math.min(1, x * 1.08)) * 0.16));
      return { x: ponto.x, y: ponto.y, giro: ((ponto.angulo - anguloDeSaida) * 180) / Math.PI + 14 * (1 - x), direcao: (ponto.angulo * 180) / Math.PI, largo: 1 + puxao, alto: 1 - puxao * 0.75, tamanho: 0.62 + 0.38 * x };
    }
    if (t < estouro) {
      const x = (t - chegada) / (estouro - chegada);
      const suave = x * x * (3 - 2 * x);
      return { x: centro.x, y: centro.y + 16 * suave, giro: giroFinal, direcao: 0, largo: 1 + 0.32 * suave, alto: 1 - 0.3 * suave, tamanho: 1 };
    }
    if (t < partida) {
      const d = t - estouro;
      const mola = Math.exp(-d / 190) * Math.cos(d / 42);
      const pulinho = d > 280 ? Math.abs(Math.sin(((d - 280) / 300) * Math.PI)) * 26 * Math.exp(-(d - 280) / 900) : 0;
      return { x: centro.x, y: centro.y + 16 * Math.exp(-d / 60) - pulinho, giro: giroFinal, direcao: 0, largo: 1 - 0.3 * mola, alto: 1 + 0.36 * mola, tamanho: 1.08 };
    }
    const d = t - partida;
    if (d < 130) {
      const x = d / 130;
      return { x: centro.x, y: centro.y + 18 * x, giro: giroFinal, direcao: 0, largo: 1 + 0.26 * x, alto: 1 - 0.26 * x, tamanho: 1.08 };
    }
    const x = (d - 130) / 400;
    return { x: centro.x, y: centro.y + 18 - Math.pow(x, 2.2) * (centro.y + 320), giro: giroFinal, direcao: 0, largo: Math.max(0.68, 1.26 - x * 2.4), alto: Math.min(1.42, 0.74 + x * 2.6), tamanho: 1.08 };
  };

  const pintar = (agora) => {
    if (terminou) return;
    const t = agora - comeco;
    const dt = Math.min(48, agora - anterior) / 1000;
    anterior = agora;
    if (t >= MOMENTOS_DO_VOO.estouro) estourar();
    if (t >= MOMENTOS_DO_VOO.partida + 170) revelar();
    if (t >= DURACAO_DO_VOO_DA_LUMI) { terminar(); return; }

    const pose = poseDaLumi(t);
    boneca.style.transform = `translate3d(${pose.x.toFixed(1)}px, ${pose.y.toFixed(1)}px, 0) rotate(${pose.direcao.toFixed(1)}deg) scale(${(pose.largo * pose.tamanho).toFixed(3)}, ${(pose.alto * pose.tamanho).toFixed(3)}) rotate(${(pose.giro - pose.direcao).toFixed(1)}deg)`;
    fundo.style.opacity = t < 220 ? (t / 220).toFixed(3) : (t > MOMENTOS_DO_VOO.partida + 170 ? Math.max(0, 1 - (t - MOMENTOS_DO_VOO.partida - 170) / 380).toFixed(3) : '1');
    if (t > MOMENTOS_DO_VOO.partida) {
      textos.style.animation = 'none';
      textos.style.transform = 'none';
      textos.style.opacity = Math.max(0, 1 - (t - MOMENTOS_DO_VOO.partida) / 170).toFixed(3);
    }

    if (ultimoPonto && (t < MOMENTOS_DO_VOO.chegada || t > MOMENTOS_DO_VOO.partida + 130)) {
      const passos = Math.max(1, Math.round(Math.hypot(pose.x - ultimoPonto.x, pose.y - ultimoPonto.y) / 11));
      for (let i = 0; i < passos; i += 1) {
        const u = i / passos;
        soltar(ultimoPonto.x + (pose.x - ultimoPonto.x) * u + (Math.random() - 0.5) * 20, ultimoPonto.y + (pose.y - ultimoPonto.y) * u + (Math.random() - 0.5) * 20, (Math.random() - 0.5) * 50, (Math.random() - 0.5) * 50 + 24, 320 + Math.random() * 380, 7 + Math.random() * 15, 60);
      }
    }
    ultimoPonto = { x: pose.x, y: pose.y };

    pincel.clearRect(0, 0, largura, altura);
    pincel.globalCompositeOperation = 'lighter';
    for (let i = particulas.length - 1; i >= 0; i -= 1) {
      const grao = particulas[i];
      grao.vida -= dt * 1000;
      if (grao.vida <= 0) { particulas.splice(i, 1); continue; }
      grao.vx *= 1 - 1.6 * dt;
      grao.vy = grao.vy * (1 - 1.6 * dt) + grao.gravidade * dt;
      grao.x += grao.vx * dt;
      grao.y += grao.vy * dt;
      const parte = grao.vida / grao.total;
      const lado = grao.tamanho * (0.45 + parte * 0.75);
      pincel.globalAlpha = Math.min(1, parte * 1.5);
      pincel.drawImage(faisca, grao.x - lado / 2, grao.y - lado / 2, lado, lado);
    }
    for (let i = ondas.length - 1; i >= 0; i -= 1) {
      const onda = ondas[i];
      onda.vida -= dt * 1000;
      if (onda.vida <= 0) { ondas.splice(i, 1); continue; }
      const parte = 1 - onda.vida / onda.total;
      pincel.globalAlpha = (1 - parte) * 0.5;
      pincel.strokeStyle = '#ffe9a8';
      pincel.lineWidth = 1 + (1 - parte) * 4;
      pincel.beginPath();
      pincel.arc(centro.x, centro.y, onda.raio + (1 - Math.pow(1 - parte, 3)) * Math.max(largura, altura) * 0.62, 0, Math.PI * 2);
      pincel.stroke();
    }
    pincel.globalAlpha = 1;
    pincel.globalCompositeOperation = 'source-over';
    quadro = requestAnimationFrame(pintar);
  };
  quadro = requestAnimationFrame(pintar);
  return true;
}

function escaparTextoDoVoo(texto) {
  const caixa = document.createElement('div');
  caixa.textContent = texto === undefined || texto === null ? '' : String(texto);
  return caixa.innerHTML;
}

function animarChegadaDoFimDaMissao(feGanha) {
  const fim = document.querySelector('#licao-corpo .licao-fim');
  if (!fim) return;
  fim.classList.add('lumi-chegou');
  const numero = fim.querySelector('#licao-fe-ganha');
  if (!numero) return;
  const comeco = performance.now();
  const contar = (agora) => {
    const x = Math.min(1, (agora - comeco - 260) / 620);
    const suave = x <= 0 ? 0 : 1 - Math.pow(1 - x, 3);
    numero.textContent = `+${Math.round(feGanha * suave)}`;
    if (x < 1 && numero.isConnected) requestAnimationFrame(contar);
  };
  numero.textContent = '+0';
  requestAnimationFrame(contar);
}

function mascoteReage(evento, dados) {
  const info = dados || {};

  if (!modoInfantilAtivo()) {
    if (evento === 'saiu' || evento === 'perfil') pararVozInfantil(false);
    removerLumi();
    return null;
  }

  const falas = falasDaLumi();

  if (evento === 'perfil') {
    pararVozInfantil(true);
    return null;
  }

  if (evento === 'saiu') {
    pararVozInfantil(true);
    return null;
  }

  if (evento === 'mapa') {
    const palco = lumiDoMapa();
    const cansada = typeof info.santidade === 'number' && info.santidade <= 0;
    const fala = cansada ? falas.mapaCansada : comNomeDaLumi(falas.mapa);
    mudarLumi(palco, cansada ? 'dormindo' : 'parada', cansada ? 'sono' : 'sorriso', fala);
    if (palco) palco.falaParaRepetir = [fala];
    return null;
  }

  const palco = lumiDaLicao();
  if (!palco) return null;

  if (evento === 'licao') {
    lumiPrimeiraPergunta = true;
    mudarLumi(palco, 'parada', 'sorriso', '');
    palco.falaParaRepetir = null;
    return null;
  }

  if (evento === 'historia') {
    mudarLumi(palco, 'parada', 'sorriso', falas.historia);
    palco.falaParaRepetir = [falas.historia, info.texto];
    falarParaCrianca(palco.falaParaRepetir);
    return null;
  }

  if (evento === 'pergunta') {
    const fala = lumiPrimeiraPergunta ? comNomeDaLumi(falas.ola) : sortearFala(falas.pergunta);
    lumiPrimeiraPergunta = false;
    mudarLumi(palco, 'parada', 'sorriso', fala);
    const partes = [fala, info.enunciado];
    if (info.tipo === 'vf') partes.push(falas.verdadeiroOuFalso);
    else (info.opcoes || []).forEach((opcao) => partes.push(opcao));
    palco.falaParaRepetir = partes;
    falarParaCrianca(partes);
    return null;
  }

  if (evento === 'resposta') {
    const fala = info.certo
      ? sortearFala(falas.acertou)
      : sortearFala(info.semRepetir ? falas.errouSemRepetir : falas.errou);
    mudarLumi(palco, info.certo ? 'acertou' : 'errou', info.certo ? 'feliz' : 'quase', fala);
    const partes = [fala];
    if (!info.certo && info.respostaCerta) partes.push(falas.respostaCerta.replace('{r}', textoParaFalar(info.respostaCerta)));
    partes.push(info.explicacao);
    palco.falaParaRepetir = partes;
    falarParaCrianca(partes);
    return fala;
  }

  if (evento === 'concluiu') {
    const fala = info.medalha ? falas.medalha : sortearFala(falas.concluiu);
    mudarLumi(palco, 'concluiu', 'feliz', fala);
    palco.falaParaRepetir = [fala];
    falarParaCrianca([fala]);
    return fala;
  }

  if (evento === 'semSantidade') {
    mudarLumi(palco, 'dormindo', 'sono', falas.cansada);
    palco.falaParaRepetir = [falas.cansada];
    falarParaCrianca([falas.cansada]);
    return falas.cansada;
  }

  return null;
}

function iniciarMascote() {
  liberarVozNoPrimeiroToque();
  if (vozInfantilDisponivel() && typeof window.speechSynthesis.addEventListener === 'function') {
    window.speechSynthesis.addEventListener('voiceschanged', () => { vozInfantil.escolhidas = {}; });
  }
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) pararVozInfantil(false);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  if (typeof rodarComSeguranca === 'function') rodarComSeguranca('mascote das crianças', iniciarMascote);
  else iniciarMascote();
});
