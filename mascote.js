// ============================================================
//  LUMINA SANCTI — LUMI, A ESTRELINHA DAS CRIANÇAS
//  (mascote e voz doce do modo infantil)
// ============================================================
// A Lumi só existe no modo infantil: quando o perfil escolhido é de
// criança, o perfis.js coloca a classe "modo-kids" no body. No perfil
// adulto nada disto aparece: nenhum desenho, nenhum botão, nenhuma voz.
//
// O que a Lumi faz:
//   - é a estrela dourada do site, com bracinhos, perninhas, olhinhos
//     e boquinha, desenhada aqui mesmo (SVG) e animada só com CSS;
//   - mostra falas curtas num balãozinho, no idioma do site;
//   - lê em voz alta a pergunta, as opções, o incentivo e a explicação,
//     para quem ainda está aprendendo a ler;
//   - nunca ralha e nunca apressa: erro vira convite para tentar de novo.
//
// SOBRE A VOZ (nota honesta para o João): usamos a voz que o próprio
// navegador já tem (speechSynthesis), a mesma do botão "Ouvir
// biografia". É grátis e funciona sem internet, mas não é perfeita:
// cada celular tem vozes diferentes e algumas soam um pouco robóticas.
// Uma voz de estúdio, bem mais bonita, exigiria um serviço pago de
// fala. Fica como melhoria futura, não agora.
//
// O trilhas.js avisa a Lumi do que acontece na lição chamando
// mascoteReage('pergunta' | 'resposta' | ...). Este arquivo precisa
// ser carregado DEPOIS do script.js e do trilhas.js.

const NOME_DO_MASCOTE = 'Lumi'; // aprovado pelo João; muda aqui e vale no site todo
const CHAVE_VOZ_INFANTIL = 'lumina-sancti-voz-kids';

// Falas da Lumi nos três idiomas. Sempre gentis: nada de "errado",
// nada de pressa.
const FALAS_DA_LUMI = {
  pt: {
    ola: 'Oi! Eu sou a {nome}. Vamos aprender juntos?',
    pergunta: ['Vamos lá!', 'Escute comigo.', 'Pense com calma.', 'Você consegue!'],
    acertou: ['Muito bem!', 'Isso mesmo!', 'Que lindo!', 'Você acertou!', 'Parabéns!'],
    // Sem conta, a pergunta errada volta no fim da missão
    errou: ['Quase! Vamos de novo.', 'Tudo bem! Vamos tentar de novo.', 'Quase lá! Você vai conseguir.'],
    // Com conta, cada pergunta é respondida uma vez só
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

// ============================================================
//  VOZ DOCE (a do próprio navegador)
// ============================================================
const vozInfantil = {
  liberada: false,   // os navegadores só deixam falar depois do primeiro toque
  pendente: null,    // o que ficou esperando esse primeiro toque
  falando: false,
  vez: 0,            // cada nova fala ganha um número; ajuda a saber quando a última terminou
  escolhidas: {},    // voz escolhida para cada idioma
};

function vozInfantilDisponivel() {
  return typeof window !== 'undefined' && 'speechSynthesis' in window && typeof SpeechSynthesisUtterance !== 'undefined';
}

// A escolha de ligar ou desligar fica guardada no aparelho
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
    // modo privado: a escolha vale só até fechar o site
  }
}

// Nomes de vozes femininas conhecidas (Windows, Android, iPhone, Mac e
// Chrome), em ordem de preferência. Se nenhuma existir no aparelho,
// usamos outra voz do idioma que não seja das masculinas conhecidas.
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
  if (doIdioma.length === 0) return null; // o navegador escolhe a padrão do idioma
  const regiao = codigoDaVozInfantil().toLowerCase();
  // Primeiro as vozes do país certo (português do Brasil, por exemplo)
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

// Transforma o que está na tela (às vezes com HTML) em texto para falar
function textoParaFalar(texto) {
  const semTags = String(texto == null ? '' : texto).replace(/<[^>]+>/g, ' ');
  let limpo = semTags;
  try {
    const caixa = document.createElement('textarea');
    caixa.innerHTML = semTags; // desfaz &amp; &quot; e parecidos
    if (typeof caixa.value === 'string') limpo = caixa.value;
  } catch (e) {
    // sem problema: fica o texto sem as tags
  }
  return limpo.replace(/\s+/g, ' ').trim();
}

// Só vale o toque de verdade que a própria Lumi percebeu (ver
// liberarVozNoPrimeiroToque). Para abrir uma lição a criança sempre
// toca numa missão, então a voz já está liberada quando a lição começa.
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
    // Um pouco mais devagar e um pouco mais aguda, para soar doce
    // (bem parecida com a voz infantil do aplicativo)
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

// Fala uma lista de frases, uma depois da outra (as pausas entre elas
// ajudam a criança a separar a pergunta das opções).
function falarParaCrianca(partes) {
  if (!modoInfantilAtivo() || !vozInfantilDisponivel() || !vozInfantilLigada()) return;
  const textos = (partes || []).map(textoParaFalar).filter(Boolean);
  if (textos.length === 0) return;
  if (!navegadorJaFoiTocado()) {
    // Ainda ninguém tocou na tela: guarda para falar no primeiro toque
    vozInfantil.pendente = textos;
    return;
  }
  dizerEmVoz(textos);
}

// Para a voz da Lumi. Com "mesmoSemFalar", cancela de qualquer jeito
// (usado ao sair da lição e ao trocar de perfil).
function pararVozInfantil(mesmoSemFalar) {
  vozInfantil.pendente = null;
  if (!vozInfantilDisponivel()) return;
  if (mesmoSemFalar || vozInfantil.falando) {
    vozInfantil.vez += 1;
    vozInfantil.falando = false;
    window.speechSynthesis.cancel();
  }
}

// Nada de som antes do primeiro toque na tela: os navegadores bloqueiam
// e a experiência quebraria. No primeiro toque, fala o que estava
// esperando (se ainda fizer sentido).
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

// ============================================================
//  O DESENHO DA LUMI
// ============================================================
// A mesma estrela de quatro pontas do Lumina Sancti, mais gordinha,
// para caber um rostinho. Os bracinhos e as perninhas ficam atrás do
// corpo; cada expressão é um grupo que aparece ou some pelo CSS.
let contadorDeLumis = 0;

function desenhoDaLumi() {
  contadorDeLumis += 1;
  const id = `lumi-${contadorDeLumis}`;
  const faisca = (dx, dy, atraso) => `<path class="lumi-faisca" style="--dx:${dx}px;--dy:${dy}px;animation-delay:${atraso}s" transform="translate(60 64)" d="M0 -7 C1 -2 2 -1 7 0 C2 1 1 2 0 7 C-1 2 -2 1 -7 0 C-2 -1 -1 -2 0 -7 Z"/>`;
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
      <circle class="lumi-aura" cx="60" cy="64" r="58" fill="url(#${id}-aura)"/>
      <g class="lumi-faiscas">
        ${faisca(-46, -40, 0)}${faisca(48, -38, 0.08)}${faisca(-54, 8, 0.16)}${faisca(54, 12, 0.05)}${faisca(-30, 46, 0.12)}${faisca(34, 44, 0.2)}
      </g>
      <g class="lumi-corpo-todo">
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
        </g>
      </g>
      <g class="lumi-zzz">
        <text x="86" y="32">z</text>
        <text x="95" y="21">z</text>
        <text x="104" y="9">Z</text>
      </g>
    </svg>`;
}

// ============================================================
//  ONDE A LUMI APARECE
// ============================================================
// Ela fica no meio do conteúdo (nunca por cima): numa faixa própria,
// abaixo do nome do santo na lição e abaixo do placar no mapa das
// trilhas. Assim nunca cobre um botão nem atrapalha o toque.
function criarPalcoDaLumi(id) {
  const palco = document.createElement('div');
  palco.id = id;
  palco.className = 'lumi-palco';
  palco.innerHTML = `
    <button type="button" class="lumi" data-estado="parada" data-rosto="sorriso" data-bracos="baixo">${desenhoDaLumi()}</button>
    <p class="lumi-balao" role="status" aria-live="polite"></p>`;
  const botao = palco.querySelector('.lumi');
  botao.setAttribute('aria-label', comNomeDaLumi(falasDaLumi().tocarParaOuvir));
  // Tocar na Lumi repete a última fala (bom para quem ainda não lê)
  botao.addEventListener('click', () => {
    mudarLumi(palco, 'cutucada', botao.dataset.rosto);
    if (palco.falaParaRepetir) falarParaCrianca(palco.falaParaRepetir);
  });
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

// Botão de som (alto-falante) no topo da lição, só para crianças
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
      // Ao ligar de novo, repete o que está na tela
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

// Tira a Lumi (e o botão de som) da tela, por exemplo ao trocar para
// um perfil de adulto.
function removerLumi() {
  ['lumi-licao', 'lumi-mapa', 'lumi-som'].forEach((id) => {
    const el = document.getElementById(id);
    if (el && el.parentNode) el.parentNode.removeChild(el);
  });
}

// Troca o jeito da Lumi: "estado" é o movimento (pular, balançar,
// girar, dormir) e "rosto" é a expressão. Os movimentos de uma vez só
// voltam sozinhos para o flutuar de sempre; a expressão continua até a
// próxima pergunta.
const DURACAO_DOS_MOVIMENTOS = { acertou: 1300, errou: 1900, concluiu: 1600, cutucada: 500 };

function mudarLumi(palco, estado, rosto, fala) {
  if (!palco) return;
  const lumi = palco.querySelector('.lumi');
  const balao = palco.querySelector('.lumi-balao');
  clearTimeout(palco.temporizadorDaLumi);
  // Recomeça a animação mesmo quando o estado se repete
  lumi.dataset.estado = 'parada';
  void lumi.getBoundingClientRect();
  lumi.dataset.estado = estado;
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

// ============================================================
//  O QUE A LUMI FAZ EM CADA MOMENTO DA LIÇÃO
// ============================================================
// Chamado pelo trilhas.js (e pelo perfis.js, ao trocar de perfil).
// Devolve a frase de incentivo usada, para a tela mostrar a mesma
// frase que a Lumi fala.
let lumiPrimeiraPergunta = true;

function mascoteReage(evento, dados) {
  const info = dados || {};

  // Perfil de adulto (ou nenhum perfil): a Lumi não existe
  if (!modoInfantilAtivo()) {
    if (evento === 'saiu' || evento === 'perfil') pararVozInfantil(false);
    removerLumi();
    return null;
  }

  const falas = falasDaLumi();

  if (evento === 'perfil') {
    // Trocou de perfil (de uma criança para outra, por exemplo)
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
    // No mapa ela não fala sozinha: só quando a criança toca nela
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

// ============================================================
//  INICIALIZAÇÃO
// ============================================================
function iniciarMascote() {
  liberarVozNoPrimeiroToque();
  if (vozInfantilDisponivel() && typeof window.speechSynthesis.addEventListener === 'function') {
    // As vozes chegam um pouco depois de o site abrir: escolhe de novo
    window.speechSynthesis.addEventListener('voiceschanged', () => { vozInfantil.escolhidas = {}; });
  }
  // Site foi para o fundo (trocou de aplicativo): a Lumi fica quieta
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) pararVozInfantil(false);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  if (typeof rodarComSeguranca === 'function') rodarComSeguranca('mascote das crianças', iniciarMascote);
  else iniciarMascote();
});
