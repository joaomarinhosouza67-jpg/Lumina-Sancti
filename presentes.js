let presenteNaTela = false;
const CHAVE_DO_PRESENTE_ADIADO = 'lumina-sancti-presente-adiado';
const ENDERECO_DO_SITE = 'https://luminasancti.com';
const TEXTOS_DE_COMPARTILHAR = {
  pt: 'Estou aprendendo a vida dos santos no Lumina Sancti, como num jogo: missões, medalhas e terço guiado. É grátis! Vem comigo:',
  en: 'I am learning the lives of the saints on Lumina Sancti, like a game: missions, medals and a guided rosary. It is free! Join me:',
  es: 'Estoy aprendiendo la vida de los santos en Lumina Sancti, como un juego: misiones, medallas y rosario guiado. ¡Es gratis! Ven conmigo:',
};

function idiomaDoPresente() {
  const idioma = typeof idiomaAtual !== 'undefined' ? idiomaAtual : 'pt';
  return idioma === 'en' || idioma === 'es' ? idioma : 'pt';
}

function textoDeCompartilhar() {
  return `${TEXTOS_DE_COMPARTILHAR[idiomaDoPresente()]} ${ENDERECO_DO_SITE}`;
}

function desenhoDoPresente() {
  const faisca = (dx, dy, atraso) => `<path class="presente-faisca" style="--dx:${dx}px;--dy:${dy}px;animation-delay:${atraso}s" transform="translate(120 118)" d="M0 -8 C1 -2 2 -1 8 0 C2 1 1 2 0 8 C-1 2 -2 1 -8 0 C-2 -1 -1 -2 0 -8 Z"/>`;
  const brilho = (x, y, tamanho, atraso) => `<path class="presente-cintila" style="animation-delay:${atraso}s" transform="translate(${x} ${y}) scale(${tamanho})" d="M0 -6 C0.8 -1.5 1.5 -0.8 6 0 C1.5 0.8 0.8 1.5 0 6 C-0.8 1.5 -1.5 0.8 -6 0 C-1.5 -0.8 -0.8 -1.5 0 -6 Z"/>`;
  let raios = '';
  for (let i = 0; i < 12; i++) raios += `<path d="M120 118 L${i % 2 ? 116 : 112} -6 L${i % 2 ? 124 : 128} -6 Z" transform="rotate(${i * 30} 120 118)"/>`;
  const estrela = 'M0 -30 L5 -11 L14 -14 L11 -5 L30 0 L11 5 L14 14 L5 11 L0 30 L-5 11 L-14 14 L-11 5 L-30 0 L-11 -5 L-14 -14 L-5 -11 Z';
  return `
    <svg class="presente-svg" viewBox="0 0 240 240" aria-hidden="true" focusable="false">
      <defs>
        <radialGradient id="presente-brilho"><stop offset="0" stop-color="#ffd25e" stop-opacity="0.5"/><stop offset="0.4" stop-color="#e8b440" stop-opacity="0.16"/><stop offset="1" stop-color="#e8b440" stop-opacity="0"/></radialGradient>
        <radialGradient id="presente-brilho-estrela"><stop offset="0" stop-color="#fffbe8" stop-opacity="0.95"/><stop offset="0.4" stop-color="#ffd76a" stop-opacity="0.45"/><stop offset="1" stop-color="#ffd76a" stop-opacity="0"/></radialGradient>
        <linearGradient id="presente-raio" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#ffe9a0" stop-opacity="0.85"/><stop offset="0.6" stop-color="#f5c84c" stop-opacity="0.25"/><stop offset="1" stop-color="#f5c84c" stop-opacity="0"/></linearGradient>
        <linearGradient id="presente-feixe" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#fff8d6" stop-opacity="0.95"/><stop offset="0.45" stop-color="#f7cf5c" stop-opacity="0.3"/><stop offset="0.88" stop-color="#f7cf5c" stop-opacity="0"/></linearGradient>
        <linearGradient id="presente-frente" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#d93c52"/><stop offset="1" stop-color="#94192b"/></linearGradient>
        <linearGradient id="presente-lado" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8e1729"/><stop offset="1" stop-color="#5a0b17"/></linearGradient>
        <linearGradient id="presente-tampa-frente" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e7506a"/><stop offset="1" stop-color="#b52539"/></linearGradient>
        <linearGradient id="presente-tampa-cima" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#f06b80"/><stop offset="1" stop-color="#d6435a"/></linearGradient>
        <linearGradient id="presente-tampa-lado" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#a42035"/><stop offset="1" stop-color="#74111f"/></linearGradient>
        <linearGradient id="presente-ouro" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#b9862a"/><stop offset="0.4" stop-color="#ffeaa6"/><stop offset="0.62" stop-color="#ecc25a"/><stop offset="1" stop-color="#b9862a"/></linearGradient>
        <linearGradient id="presente-ouro-escuro" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#d6a640"/><stop offset="1" stop-color="#9c6d1c"/></linearGradient>
        <linearGradient id="presente-laco-cor" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff1bf"/><stop offset="0.45" stop-color="#f2c95e"/><stop offset="1" stop-color="#c08a26"/></linearGradient>
        <radialGradient id="presente-dentro" cx="0.5" cy="0.6" r="0.7"><stop offset="0" stop-color="#fffbe6"/><stop offset="0.5" stop-color="#ffd36a"/><stop offset="1" stop-color="#c98a1e"/></radialGradient>
        <linearGradient id="presente-estrela-ouro" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fffbe6"/><stop offset="0.5" stop-color="#f6d270"/><stop offset="1" stop-color="#c9952f"/></linearGradient>
        <radialGradient id="presente-chao"><stop offset="0" stop-color="#000" stop-opacity="0.45"/><stop offset="1" stop-color="#000" stop-opacity="0"/></radialGradient>
        <pattern id="presente-papel" width="18" height="18" patternUnits="userSpaceOnUse">
          <path d="M4.5 1.5 L5.3 3.7 L7.5 4.5 L5.3 5.3 L4.5 7.5 L3.7 5.3 L1.5 4.5 L3.7 3.7 Z" fill="#ffd98a" opacity="0.5"/>
          <circle cx="13.5" cy="13.5" r="1.1" fill="#ffd98a" opacity="0.45"/>
        </pattern>
        <clipPath id="presente-clip-frente"><rect x="62" y="128" width="96" height="68" rx="3"/></clipPath>
      </defs>
      <circle class="presente-luz" cx="120" cy="132" r="112"/>
      <g class="presente-raios"><g class="presente-raios-giro">${raios}</g></g>
      <ellipse class="presente-sombra-chao" cx="122" cy="207" rx="70" ry="10"/>
      <g class="presente-cintilas">
        ${brilho(38, 72, 1, 0)}${brilho(202, 62, 1.25, 0.7)}${brilho(26, 150, 0.8, 1.3)}${brilho(214, 146, 0.9, 0.4)}${brilho(68, 30, 0.7, 1)}${brilho(178, 26, 0.85, 1.6)}${brilho(120, 16, 0.65, 0.2)}${brilho(196, 196, 0.7, 1.9)}${brilho(44, 198, 0.75, 1.1)}
      </g>
      <g class="presente-flutua">
        <g class="presente-caixa-toda">
          <path class="presente-feixe" d="M66 126 L176 119 L214 -12 L26 -12 Z"/>
          <path class="presente-boca" d="M62 128 L158 128 L176 118 L80 118 Z"/>
          <g class="presente-estrela-lugar" transform="translate(120 150)">
            <g class="presente-estrela">
              <circle r="40" fill="url(#presente-brilho-estrela)"/>
              <g class="presente-estrela-giro">
                <path d="${estrela}" fill="url(#presente-estrela-ouro)" stroke="#b98a2a" stroke-width="0.8"/>
                <path d="M0 -30 L5 -11 L0 0 Z M30 0 L11 5 L0 0 Z M0 30 L-5 11 L0 0 Z M-30 0 L-11 -5 L0 0 Z" fill="#fff" opacity="0.35"/>
                <circle r="4" fill="#fffdf2"/>
              </g>
            </g>
          </g>
          <g class="presente-corpo-todo">
            <path d="M158 128 L176 118 L176 186 L158 196 Z" fill="url(#presente-lado)"/>
            <path d="M164.3 124.5 L169.7 121.5 L169.7 189.5 L164.3 192.5 Z" fill="url(#presente-ouro-escuro)"/>
            <rect x="62" y="128" width="96" height="68" rx="3" fill="url(#presente-frente)"/>
            <rect x="62" y="128" width="96" height="68" rx="3" fill="url(#presente-papel)"/>
            <g clip-path="url(#presente-clip-frente)"><rect class="presente-reflexo" x="40" y="120" width="22" height="90" transform="skewX(-18)"/></g>
            <rect x="102" y="128" width="16" height="68" fill="url(#presente-ouro)"/>
            <path d="M158 128.5 L158 195.5" stroke="#4e0913" stroke-width="1.2" opacity="0.7"/>
            <path d="M64 129.5 L156 129.5" stroke="#ff9aa8" stroke-width="1" opacity="0.35"/>
          </g>
          <g class="presente-tampa">
            <path d="M56 110 L164 110 L184 99 L76 99 Z" fill="url(#presente-tampa-cima)"/>
            <path d="M164 110 L184 99 L184 121 L164 132 Z" fill="url(#presente-tampa-lado)"/>
            <rect x="56" y="110" width="108" height="22" rx="2.5" fill="url(#presente-tampa-frente)"/>
            <rect x="56" y="110" width="108" height="22" rx="2.5" fill="url(#presente-papel)"/>
            <path d="M102 110 L118 110 L138 99 L122 99 Z" fill="#f6d77e"/>
            <path d="M63 106.2 L171 106.2 L177 102.9 L69 102.9 Z" fill="#f2cd6c"/>
            <path d="M171 106.2 L177 102.9 L177 124.9 L171 128.2 Z" fill="url(#presente-ouro-escuro)"/>
            <rect x="102" y="110" width="16" height="22" fill="url(#presente-ouro)"/>
            <path d="M57 131.5 L163 131.5" stroke="#5a0b17" stroke-width="1.4" opacity="0.55"/>
            <path d="M58 110.8 L162 110.8" stroke="#ffb3be" stroke-width="1" opacity="0.5"/>
            <g class="presente-laco-todo">
              <path d="M116 106 C108 114 100 120 91 124 L97 130 L99.5 123.5 C108 119.5 114 113.5 119 108.5 Z" fill="url(#presente-ouro-escuro)"/>
              <path d="M124 106 C132 114 141 118 151 121 L146.5 127.5 L143.5 121.5 C134 118.5 128 113.5 121 108.5 Z" fill="url(#presente-ouro-escuro)"/>
              <path d="M120 104 C108 86 78 77 73 91 C70 103 92 110 120 104 Z" fill="url(#presente-laco-cor)" stroke="#b07a1c" stroke-width="0.9"/>
              <path d="M117 102.6 C107 93.5 89 88.5 85.5 94.5 C83.5 99.5 98 104 117 102.6 Z" fill="#a8741c" opacity="0.55"/>
              <path d="M120 104 C132 86 162 77 167 91 C170 103 148 110 120 104 Z" fill="url(#presente-laco-cor)" stroke="#b07a1c" stroke-width="0.9"/>
              <path d="M123 102.6 C133 93.5 151 88.5 154.5 94.5 C156.5 99.5 142 104 123 102.6 Z" fill="#a8741c" opacity="0.55"/>
              <path d="M79 88.5 C88 83.5 102 88 111 96" stroke="#fffbe6" stroke-width="1.6" fill="none" opacity="0.7" stroke-linecap="round"/>
              <path d="M161 88.5 C152 83.5 138 88 129 96" stroke="#fffbe6" stroke-width="1.6" fill="none" opacity="0.55" stroke-linecap="round"/>
              <ellipse cx="120" cy="104" rx="9.5" ry="7.5" fill="url(#presente-laco-cor)" stroke="#b07a1c" stroke-width="0.9"/>
              <ellipse cx="117.5" cy="101.5" rx="3.5" ry="2" fill="#fffbe6" opacity="0.75"/>
            </g>
          </g>
        </g>
      </g>
      <g class="presente-faiscas">
        ${faisca(-84, -70, 0)}${faisca(86, -66, 0.05)}${faisca(-100, -10, 0.1)}${faisca(102, -16, 0.03)}${faisca(-46, -100, 0.08)}${faisca(50, -102, 0.12)}${faisca(-74, 36, 0.06)}${faisca(76, 40, 0.09)}${faisca(0, -110, 0.04)}${faisca(-20, 60, 0.11)}
      </g>
    </svg>`;
}

function itensDoPresenteEmTexto(itens, infantil) {
  const lista = [];
  if (!itens) return lista;
  if (itens.plano && !infantil) lista.push(tr('Plano {nome}', { nome: tr(itens.plano_nome || '') }));
  if (itens.santidade) lista.push(infantil ? tr('Energia infinita nas trilhas') : tr('Santidade infinita'));
  if (itens.trilhas) lista.push(tr('Todas as trilhas liberadas'));
  if (itens.enfeites) lista.push(tr('Enfeites exclusivos da família'));
  if (itens.perfis_max && !infantil) lista.push(tr('Até {n} perfis na conta', { n: itens.perfis_max }));
  return lista;
}

function janelaDoPresente() {
  let modal = document.getElementById('presente-janela');
  if (modal) return modal;
  modal = document.createElement('div');
  modal.id = 'presente-janela';
  modal.className = 'search-modal';
  modal.innerHTML = `
    <div class="search-modal-content presente-janela-caixa" role="dialog" aria-modal="true" aria-labelledby="presente-titulo">
      <div class="presente-palco"></div>
      <h3 id="presente-titulo"></h3>
      <p class="presente-mensagem" translate="no"></p>
      <div class="presente-revelado" hidden>
        <p class="presente-ganhou"></p>
        <ul class="novidade-itens presente-itens"></ul>
        <p class="presente-prazo"></p>
      </div>
      <div class="presente-compartilhar-caixa" hidden>
        <img class="presente-imagem" alt="" loading="lazy">
        <div class="presente-compartilhar-botoes">
          <a class="licao-botao presente-whatsapp" target="_blank" rel="noopener"></a>
          <button type="button" class="faixa-depois presente-copiar"></button>
          <a class="faixa-depois presente-baixar"></a>
        </div>
      </div>
      <div class="novidade-botoes">
        <button type="button" class="licao-botao" id="presente-abrir"></button>
        <button type="button" class="licao-botao" id="presente-compartilhar" hidden></button>
        <button type="button" class="faixa-depois" id="presente-fechar" hidden></button>
        <button type="button" class="faixa-depois" id="presente-depois"></button>
      </div>
    </div>`;
  document.body.appendChild(modal);
  modal.querySelector('#presente-depois').addEventListener('click', () => {
    const id = modal.dataset.presente;
    try { sessionStorage.setItem(CHAVE_DO_PRESENTE_ADIADO, String(id || '')); } catch (e) {  }
    fecharJanelaDoPresente();
  });
  modal.querySelector('#presente-fechar').addEventListener('click', fecharJanelaDoPresente);
  modal.querySelector('#presente-compartilhar').addEventListener('click', () => compartilharLuminaSancti(modal));
  modal.querySelector('#presente-abrir').addEventListener('click', () => abrirOPresente(modal));
  modal.querySelector('.presente-palco').addEventListener('click', () => {
    const abrir = modal.querySelector('#presente-abrir');
    if (!abrir.hidden && !abrir.disabled) abrirOPresente(modal);
  });
  return modal;
}

function fecharJanelaDoPresente() {
  const modal = document.getElementById('presente-janela');
  if (modal) modal.classList.remove('active');
  presenteNaTela = false;
  if (typeof verificarNovidade === 'function') setTimeout(verificarNovidade, 1500);
}

function soltarConfete(lugar) {
  const cores = ['#e3bc58', '#f5d77a', '#fff6d6', '#ffffff', '#93c5fd', '#f9a8d4', '#86efac', '#e7506a'];
  const formas = ['', 'redondo', 'fita', 'estrela'];
  for (let i = 0; i < 44; i++) {
    const pedaco = document.createElement('span');
    pedaco.className = `presente-confete ${formas[i % formas.length]}`;
    const lado = (Math.random() - 0.5) * 2;
    pedaco.style.setProperty('--x', `${Math.round(lado * 190)}px`);
    pedaco.style.setProperty('--meio-x', `${Math.round(lado * 120)}px`);
    pedaco.style.setProperty('--sobe', `${Math.round(-60 - Math.random() * 110)}px`);
    pedaco.style.setProperty('--y', `${Math.round(140 + Math.random() * 180)}px`);
    pedaco.style.setProperty('--giro', `${Math.round(Math.random() * 900 - 450)}deg`);
    pedaco.style.setProperty('--atraso', `${(Math.random() * 0.3).toFixed(2)}s`);
    pedaco.style.setProperty('--duracao', `${(1.8 + Math.random() * 0.9).toFixed(2)}s`);
    pedaco.style.background = cores[i % cores.length];
    lugar.appendChild(pedaco);
    setTimeout(() => pedaco.remove(), 3400);
  }
}

async function atualizarDepoisDoPresente() {
  try {
    if (typeof carregarContaEspecial === 'function') await carregarContaEspecial();
    if (typeof carregarMinhaAssinatura === 'function') await carregarMinhaAssinatura();
    const trilhas = document.getElementById('view-trilhas');
    if (trilhas && trilhas.classList.contains('active') && typeof renderizarTrilhas === 'function') renderizarTrilhas();
  } catch (e) {
  }
}

async function abrirOPresente(modal) {
  const botao = modal.querySelector('#presente-abrir');
  const infantil = modal.dataset.infantil === 'sim';
  botao.disabled = true;
  modal.querySelector('#presente-depois').hidden = true;
  const palco = modal.querySelector('.presente-palco');
  palco.classList.add('abrindo');
  modal.querySelector('.presente-janela-caixa').classList.remove('aberta');
  let resultado = null;
  try {
    const resposta = await supabaseCliente.rpc('abrir_presente', { _id: Number(modal.dataset.presente) });
    if (resposta.error) throw resposta.error;
    resultado = resposta.data;
  } catch (e) {
    palco.classList.remove('abrindo');
    botao.disabled = false;
    modal.querySelector('#presente-depois').hidden = false;
    if (typeof mostrarAvisoTrilhas === 'function') mostrarAvisoTrilhas(tr('Não foi possível abrir o presente agora. Tente de novo.'));
    return;
  }
  setTimeout(() => {
    palco.classList.remove('abrindo');
    palco.classList.add('aberto');
    modal.querySelector('.presente-janela-caixa').classList.add('aberta');
    soltarConfete(palco);
    const itens = itensDoPresenteEmTexto(resultado && resultado.itens, infantil);
    const lista = modal.querySelector('.presente-itens');
    lista.innerHTML = '';
    itens.forEach((texto, i) => {
      const item = document.createElement('li');
      item.style.setProperty('--atraso', `${0.2 + i * 0.12}s`);
      item.textContent = texto;
      lista.appendChild(item);
    });
    modal.querySelector('.presente-ganhou').textContent = tr('Você ganhou:');
    const fim = resultado && resultado.vale_ate ? new Date(resultado.vale_ate) : null;
    modal.querySelector('.presente-prazo').textContent = fim && !Number.isNaN(fim.getTime())
      ? tr('Vale até {dia}. Aproveite!', { dia: fim.toLocaleDateString(typeof localDoIdioma === 'function' ? localDoIdioma() : 'pt-BR') })
      : '';
    modal.querySelector('#presente-titulo').textContent = tr('Presente aberto!');
    modal.querySelector('.presente-revelado').hidden = false;
    botao.hidden = true;
    modal.querySelector('#presente-compartilhar').hidden = infantil;
    const fechar = modal.querySelector('#presente-fechar');
    fechar.hidden = false;
    fechar.textContent = tr('Começar');
    atualizarDepoisDoPresente();
  }, 1100);
}

async function imagemDeCompartilhar() {
  const endereco = `compartilhar-${idiomaDoPresente()}.jpg`;
  const resposta = await fetch(endereco);
  if (!resposta.ok) throw new Error('sem_imagem');
  const conteudo = await resposta.blob();
  return new File([conteudo], 'lumina-sancti.jpg', { type: 'image/jpeg' });
}

function mostrarCaixaDeCompartilhar(modal) {
  const caixa = modal.querySelector('.presente-compartilhar-caixa');
  const texto = textoDeCompartilhar();
  const imagem = `compartilhar-${idiomaDoPresente()}.jpg`;
  caixa.querySelector('.presente-imagem').src = imagem;
  caixa.querySelector('.presente-imagem').alt = tr('Imagem para compartilhar o Lumina Sancti');
  const whatsapp = caixa.querySelector('.presente-whatsapp');
  whatsapp.href = `https://wa.me/?text=${encodeURIComponent(texto)}`;
  whatsapp.textContent = tr('Mandar no WhatsApp');
  const copiar = caixa.querySelector('.presente-copiar');
  copiar.textContent = tr('Copiar a mensagem');
  copiar.onclick = async () => {
    try {
      await navigator.clipboard.writeText(texto);
      copiar.textContent = tr('Mensagem copiada!');
    } catch (e) {
      copiar.textContent = texto;
    }
  };
  const baixar = caixa.querySelector('.presente-baixar');
  baixar.href = imagem;
  baixar.setAttribute('download', 'lumina-sancti.jpg');
  baixar.textContent = tr('Baixar a imagem');
  caixa.hidden = false;
  if (caixa.scrollIntoView) caixa.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

async function compartilharLuminaSancti(modal) {
  const texto = textoDeCompartilhar();
  try {
    const arquivo = await imagemDeCompartilhar();
    if (navigator.canShare && navigator.canShare({ files: [arquivo] }) && navigator.share) {
      await navigator.share({ files: [arquivo], text: texto, title: 'Lumina Sancti' });
      return;
    }
  } catch (e) {
    if (e && e.name === 'AbortError') return;
  }
  if (modal) {
    mostrarCaixaDeCompartilhar(modal);
    return;
  }
  if (navigator.share) {
    try { await navigator.share({ title: 'Lumina Sancti', text: texto, url: ENDERECO_DO_SITE }); } catch (e) {  }
    return;
  }
  try {
    await navigator.clipboard.writeText(texto);
    if (typeof mostrarAvisoTrilhas === 'function') mostrarAvisoTrilhas(tr('Mensagem copiada! Agora é só colar e compartilhar.'));
  } catch (e) {
    window.open(`https://wa.me/?text=${encodeURIComponent(texto)}`, '_blank', 'noopener');
  }
}

async function verificarPresente() {
  if (presenteNaTela || typeof supabaseCliente === 'undefined' || !supabaseCliente) return;
  if (typeof contaLogada !== 'function' || !contaLogada()) return;
  if (typeof membroAtivo === 'undefined' || !membroAtivo) return;
  if (document.body.classList.contains('intro-ativa')) return;
  if (typeof novidadeNaTela !== 'undefined' && novidadeNaTela) return;
  if (typeof advertenciaNaTela !== 'undefined' && advertenciaNaTela) return;
  const licao = document.getElementById('view-licao');
  if (licao && licao.classList.contains('active')) return;
  let presente = null;
  try {
    const { data, error } = await supabaseCliente.rpc('meu_presente');
    if (!error) presente = data;
  } catch (e) {
    presente = null;
  }
  if (!presente || !presente.id || presenteNaTela) return;
  let adiado = '';
  try { adiado = sessionStorage.getItem(CHAVE_DO_PRESENTE_ADIADO) || ''; } catch (e) {  }
  if (adiado === String(presente.id)) return;
  const infantil = document.body.classList.contains('modo-kids');
  presenteNaTela = true;
  const modal = janelaDoPresente();
  modal.dataset.presente = String(presente.id);
  modal.dataset.infantil = infantil ? 'sim' : 'nao';
  const palco = modal.querySelector('.presente-palco');
  palco.className = 'presente-palco';
  palco.innerHTML = desenhoDoPresente();
  modal.querySelector('.presente-janela-caixa').classList.remove('aberta');
  modal.querySelector('#presente-titulo').textContent = tr('Você ganhou um presente!');
  modal.querySelector('.presente-mensagem').textContent = infantil ? tr('Obrigado por aprender com o Lumina Sancti! Como agradecimento, a equipe mandou um presente para você!') : (presente.mensagem || '');
  modal.querySelector('.presente-revelado').hidden = true;
  modal.querySelector('.presente-compartilhar-caixa').hidden = true;
  const abrir = modal.querySelector('#presente-abrir');
  abrir.hidden = false;
  abrir.disabled = false;
  abrir.textContent = tr('Abrir presente');
  const compartilhar = modal.querySelector('#presente-compartilhar');
  compartilhar.hidden = true;
  compartilhar.textContent = tr('Compartilhar o Lumina Sancti');
  modal.querySelector('#presente-fechar').hidden = true;
  const depois = modal.querySelector('#presente-depois');
  depois.hidden = false;
  depois.textContent = tr('Abrir depois');
  modal.classList.add('active');
  setTimeout(() => abrir.focus(), 60);
}

function abrirPresentePeloLink() {
  try { sessionStorage.removeItem(CHAVE_DO_PRESENTE_ADIADO); } catch (e) {  }
  let tentativas = 0;
  const tentar = async () => {
    tentativas += 1;
    if (presenteNaTela) return;
    const pronto = typeof contaLogada === 'function' && contaLogada() && typeof membroAtivo !== 'undefined' && membroAtivo && !document.body.classList.contains('intro-ativa') && !(typeof telaDePerfisNaFrente === 'function' && telaDePerfisNaFrente());
    if (pronto) {
      const licao = document.getElementById('view-licao');
      if (licao && licao.classList.contains('active')) return;
      await verificarPresente();
      if (presenteNaTela || tentativas > 3) return;
    }
    if (tentativas < 120) setTimeout(tentar, 1000);
  };
  tentar();
}

function iniciarPresentes() {
  setTimeout(verificarPresente, 2600);
}

document.addEventListener('DOMContentLoaded', () => {
  if (typeof rodarComSeguranca === 'function') rodarComSeguranca('presentes', iniciarPresentes);
  else iniciarPresentes();
});
