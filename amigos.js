const CHAVE_AMIGO_PENDENTE = 'lumina-sancti-amigo-pendente';
const BIBLIOTECA_DO_QR = {
  endereco: 'https://cdn.jsdelivr.net/npm/qrcode-generator@1.4.4/qrcode.js',
  integridade: 'sha384-8FWZA6BGMXhsfO+BLtrJK0We6gg5o1JyO8xQm6peWDEUs17ACA5ziE/NIAkl9z2k',
};
const BIBLIOTECA_DE_LEITURA = {
  endereco: 'https://cdn.jsdelivr.net/npm/jsqr@1.4.0/dist/jsQR.js',
  integridade: 'sha384-b5Ya4Bq3qCyz39m2ISh+4DxjAIljdeFwK/BsXLuj9gugaNwAcj/ia15fxNZL9Nlx',
};
const REGEX_CODIGO_PESSOAL = /^[A-HJ-NP-Z2-9]{8}$/;
let bibliotecaDoQrPronta = null;
let bibliotecaDeLeituraPronta = null;
let leitorDeQrAtivo = null;
const enderecosDosFundos = {};

function formatarCodigoPessoal(codigo) {
  const limpo = String(codigo || '').toUpperCase();
  return limpo.length === 8 ? `${limpo.slice(0, 4)}-${limpo.slice(4)}` : limpo;
}

function linkDoAmigo(codigo) {
  return `${window.location.origin}/?amigo=${codigo}`;
}

function codigoDeAmigo(texto) {
  const valor = String(texto || '').trim();
  const doLink = valor.match(/[?&]amigo=([A-Za-z0-9-]+)/);
  const limpo = (doLink ? doLink[1] : valor).toUpperCase().replace(/[^A-Z0-9]/g, '');
  return REGEX_CODIGO_PESSOAL.test(limpo) ? limpo : '';
}

function primeiroNome(nome) {
  return String(nome || '').trim().split(/\s+/)[0] || '';
}

function carregarBibliotecaDoQr() {
  if (typeof qrcode === 'function') return Promise.resolve();
  if (bibliotecaDoQrPronta) return bibliotecaDoQrPronta;
  bibliotecaDoQrPronta = new Promise((resolver, rejeitar) => {
    const script = document.createElement('script');
    script.src = BIBLIOTECA_DO_QR.endereco;
    script.integrity = BIBLIOTECA_DO_QR.integridade;
    script.crossOrigin = 'anonymous';
    script.onload = () => (typeof qrcode === 'function' ? resolver() : rejeitar(new Error('qr')));
    script.onerror = () => {
      bibliotecaDoQrPronta = null;
      rejeitar(new Error('qr'));
    };
    document.head.appendChild(script);
  });
  return bibliotecaDoQrPronta;
}

function svgDoQr(texto) {
  const qr = qrcode(0, 'H');
  qr.addData(texto);
  qr.make();
  const n = qr.getModuleCount();
  const margem = 2;
  const total = n + margem * 2;
  const buraco = Math.floor(n * 0.2);
  const inicioDoBuraco = Math.floor((n - buraco) / 2);
  const fimDoBuraco = inicioDoBuraco + buraco;
  const ehOlho = (l, c) => (l < 7 && c < 7) || (l < 7 && c >= n - 7) || (l >= n - 7 && c < 7);
  const noBuraco = (l, c) => l >= inicioDoBuraco && l < fimDoBuraco && c >= inicioDoBuraco && c < fimDoBuraco;
  let pontos = '';
  for (let l = 0; l < n; l += 1) {
    for (let c = 0; c < n; c += 1) {
      if (qr.isDark(l, c) && !ehOlho(l, c) && !noBuraco(l, c)) {
        pontos += `<rect x="${c + margem}" y="${l + margem}" width="1" height="1" rx="0.32"/>`;
      }
    }
  }
  const olho = (l, c) => `
    <rect x="${c + margem + 0.5}" y="${l + margem + 0.5}" width="6" height="6" rx="1.8" fill="none" stroke="#0f172a" stroke-width="1"/>
    <rect x="${c + margem + 2}" y="${l + margem + 2}" width="3" height="3" rx="0.9" fill="#0f172a"/>`;
  return `<svg class="meu-codigo-svg" viewBox="0 0 ${total} ${total}" role="img" aria-label="QR Code do seu código pessoal" xmlns="http://www.w3.org/2000/svg">
    <rect width="${total}" height="${total}" rx="2.5" fill="#ffffff"/>
    <g fill="#0f172a">${pontos}</g>
    ${olho(0, 0)}${olho(0, n - 7)}${olho(n - 7, 0)}
  </svg>`;
}

async function copiarTexto(texto) {
  try {
    await navigator.clipboard.writeText(texto);
    return true;
  } catch (e) {
    const campo = document.createElement('textarea');
    campo.value = texto;
    campo.setAttribute('readonly', '');
    campo.style.position = 'fixed';
    campo.style.opacity = '0';
    document.body.appendChild(campo);
    campo.select();
    let foi = false;
    try { foi = document.execCommand('copy'); } catch (e2) { foi = false; }
    campo.remove();
    return foi;
  }
}

function abrirMeuCodigo() {
  return abrirCodigoQr('meu');
}

function abrirEscanearCodigo() {
  return abrirCodigoQr('escanear');
}

async function abrirCodigoQr(aba) {
  const perfil = perfilAdultoAtivo();
  if (!perfil || !(await garantirAceite())) return;
  pararLeitorDeQr();
  const corpo = janelaDoCenaculo('Código QR', `
    <div class="codigo-qr-abas" role="tablist">
      <button type="button" class="codigo-qr-aba" data-aba="meu" role="tab">Meu código</button>
      <button type="button" class="codigo-qr-aba" data-aba="escanear" role="tab">Escanear código</button>
    </div>
    <div id="codigo-qr-conteudo"></div>`);
  const modal = document.getElementById('cenaculo-janela');
  const aoFechar = new MutationObserver(() => {
    if (!modal.classList.contains('active') || !document.getElementById('codigo-qr-conteudo')) {
      pararLeitorDeQr();
      aoFechar.disconnect();
    }
  });
  aoFechar.observe(modal, { attributes: true, attributeFilter: ['class'], childList: true, subtree: true });
  const mostrar = async (qual) => {
    pararLeitorDeQr();
    corpo.querySelectorAll('.codigo-qr-aba').forEach((b) => b.classList.toggle('ativa', b.dataset.aba === qual));
    const lugar = corpo.querySelector('#codigo-qr-conteudo');
    if (qual === 'escanear') {
      mostrarLeitorDeQr(lugar);
      return;
    }
    lugar.innerHTML = '<p class="perfis-carregando">Carregando...</p>';
    try {
      const codigo = await chamarCenaculo('amigo_meu_codigo', { _pid: perfil.id });
      mostrarCartaoDoCodigo(lugar, codigo);
    } catch (erro) {
      lugar.innerHTML = `<p class="not-found-msg">${mensagemDoCenaculo(erro)}</p>`;
    }
  };
  corpo.querySelectorAll('.codigo-qr-aba').forEach((botao) => {
    botao.addEventListener('click', () => mostrar(botao.dataset.aba));
  });
  mostrar(aba === 'escanear' ? 'escanear' : 'meu');
}

function mostrarCartaoDoCodigo(corpo, codigo) {
  const perfil = perfilAdultoAtivo();
  const link = linkDoAmigo(codigo);
  corpo.innerHTML = `
    <div class="meu-codigo">
      <div class="meu-codigo-cartao">
        <div class="meu-codigo-qr" id="meu-codigo-qr"><p class="perfis-carregando">Gerando o QR Code...</p></div>
        <strong class="meu-codigo-nome">${escaparTexto(perfil.nome)}</strong>
        <span class="meu-codigo-texto" id="meu-codigo-texto">${formatarCodigoPessoal(codigo)}</span>
      </div>
      <p class="cenaculo-explica">Quem escanear este QR Code, no Lumina Sancti ou com a câmera do celular, ou colar o seu código em "Nova conversa", já pode conversar com você. Mande só para quem você conhece.</p>
      <div class="cenaculo-botoes">
        <button type="button" class="licao-botao" id="meu-codigo-copiar">Copiar código</button>
        <button type="button" class="filter-btn" id="meu-codigo-compartilhar">${navigator.share ? 'Compartilhar' : 'Copiar link'}</button>
      </div>
      <button type="button" class="perfil-link" id="meu-codigo-novo">Gerar um código novo (o antigo para de funcionar)</button>
      <p class="auth-feedback" id="meu-codigo-aviso" aria-live="polite"></p>
    </div>`;
  const aviso = corpo.querySelector('#meu-codigo-aviso');
  const caixaDoQr = corpo.querySelector('#meu-codigo-qr');
  carregarBibliotecaDoQr()
    .then(() => {
      caixaDoQr.innerHTML = `${svgDoQr(link)}<span class="meu-codigo-foto">${avatarDoCenaculo(perfil.avatar, perfil.fotoUrl, 'medio')}</span>`;
    })
    .catch(() => {
      caixaDoQr.innerHTML = '<p class="cenaculo-painel-aviso">Não foi possível gerar o QR Code agora. Mande o código abaixo.</p>';
    });
  corpo.querySelector('#meu-codigo-copiar').addEventListener('click', async () => {
    aviso.textContent = (await copiarTexto(formatarCodigoPessoal(codigo))) ? 'Código copiado!' : 'Não foi possível copiar. Anote o código.';
  });
  corpo.querySelector('#meu-codigo-compartilhar').addEventListener('click', async () => {
    const texto = tr('Converse comigo no Lumina Sancti. Meu código: {codigo}', { codigo: formatarCodigoPessoal(codigo) });
    if (navigator.share) {
      navigator.share({ title: 'Lumina Sancti', text: texto, url: link }).catch(() => {});
      return;
    }
    aviso.textContent = (await copiarTexto(`${texto}\n${link}`)) ? 'Link copiado!' : 'Não foi possível copiar.';
  });
  corpo.querySelector('#meu-codigo-novo').addEventListener('click', async () => {
    if (!window.confirm(tr('Gerar um código novo? Quem tiver o código antigo não vai mais conseguir adicionar você. As conversas que você já tem continuam.'))) return;
    try {
      const novo = await chamarCenaculo('amigo_novo_codigo', { _pid: perfilAdultoAtivo().id });
      mostrarCartaoDoCodigo(corpo, novo);
      corpo.querySelector('#meu-codigo-aviso').textContent = 'Pronto! Agora só o código novo funciona.';
    } catch (erro) {
      aviso.textContent = mensagemDoCenaculo(erro);
    }
  });
}

function carregarLeitorJsQr() {
  if (typeof jsQR === 'function') return Promise.resolve();
  if (bibliotecaDeLeituraPronta) return bibliotecaDeLeituraPronta;
  bibliotecaDeLeituraPronta = new Promise((resolver, rejeitar) => {
    const script = document.createElement('script');
    script.src = BIBLIOTECA_DE_LEITURA.endereco;
    script.integrity = BIBLIOTECA_DE_LEITURA.integridade;
    script.crossOrigin = 'anonymous';
    script.onload = () => (typeof jsQR === 'function' ? resolver() : rejeitar(new Error('leitor')));
    script.onerror = () => {
      bibliotecaDeLeituraPronta = null;
      rejeitar(new Error('leitor'));
    };
    document.head.appendChild(script);
  });
  return bibliotecaDeLeituraPronta;
}

async function prepararLeitorDeQr() {
  if (typeof BarcodeDetector !== 'undefined') {
    try {
      const formatos = await BarcodeDetector.getSupportedFormats();
      if (formatos.includes('qr_code')) {
        const detector = new BarcodeDetector({ formats: ['qr_code'] });
        return async (fonte) => {
          const achados = await detector.detect(fonte);
          return achados.length ? achados[0].rawValue : '';
        };
      }
    } catch (e) {
    }
  }
  await carregarLeitorJsQr();
  const tela = document.createElement('canvas');
  const contexto = tela.getContext('2d', { willReadFrequently: true });
  return async (fonte) => {
    const largura = fonte.videoWidth || fonte.naturalWidth || fonte.width;
    const altura = fonte.videoHeight || fonte.naturalHeight || fonte.height;
    if (!largura || !altura) return '';
    const escala = Math.min(1, 720 / Math.max(largura, altura));
    tela.width = Math.max(1, Math.round(largura * escala));
    tela.height = Math.max(1, Math.round(altura * escala));
    contexto.drawImage(fonte, 0, 0, tela.width, tela.height);
    const imagem = contexto.getImageData(0, 0, tela.width, tela.height);
    const achado = jsQR(imagem.data, tela.width, tela.height, { inversionAttempts: 'attemptBoth' });
    return achado ? achado.data : '';
  };
}

function pararLeitorDeQr() {
  if (!leitorDeQrAtivo) return;
  leitorDeQrAtivo.ativo = false;
  clearTimeout(leitorDeQrAtivo.temporizador);
  if (leitorDeQrAtivo.fluxo) leitorDeQrAtivo.fluxo.getTracks().forEach((faixa) => faixa.stop());
  leitorDeQrAtivo = null;
}

function aoLerQr(texto, aviso) {
  const codigo = codigoDeAmigo(texto);
  if (!codigo) {
    if (aviso) aviso.textContent = 'Esse QR Code não é um código do Lumina Sancti.';
    return false;
  }
  pararLeitorDeQr();
  abrirAdicionarPessoa(codigo);
  return true;
}

async function mostrarLeitorDeQr(lugar) {
  lugar.innerHTML = `
    <div class="escanear">
      <div class="escanear-camera">
        <video id="escanear-video" playsinline muted autoplay></video>
        <span class="escanear-mira" aria-hidden="true"></span>
      </div>
      <p class="cenaculo-explica">Aponte a câmera para o QR Code da outra pessoa. Quando o código for lido, a conversa já começa.</p>
      <input type="file" id="escanear-foto" accept="image/*" hidden>
      <button type="button" class="filter-btn" id="escanear-foto-btn">Ler o QR Code de uma foto</button>
      <p class="auth-feedback" id="escanear-aviso" aria-live="polite"></p>
    </div>`;
  const aviso = lugar.querySelector('#escanear-aviso');
  const video = lugar.querySelector('#escanear-video');
  const arquivo = lugar.querySelector('#escanear-foto');
  lugar.querySelector('#escanear-foto-btn').addEventListener('click', () => arquivo.click());
  arquivo.addEventListener('change', async () => {
    const escolhido = arquivo.files && arquivo.files[0];
    if (!escolhido) return;
    aviso.textContent = 'Lendo a foto...';
    try {
      const ler = await prepararLeitorDeQr();
      const imagem = new Image();
      const endereco = URL.createObjectURL(escolhido);
      imagem.src = endereco;
      await imagem.decode();
      const texto = await ler(imagem);
      URL.revokeObjectURL(endereco);
      if (!texto) { aviso.textContent = 'Não encontramos um QR Code nessa foto. Tente uma foto mais nítida.'; return; }
      aoLerQr(texto, aviso);
    } catch (e) {
      aviso.textContent = 'Não foi possível ler essa foto.';
    }
  });

  const sessao = { ativo: true, fluxo: null, temporizador: null };
  leitorDeQrAtivo = sessao;
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    aviso.textContent = 'Este aparelho não abre a câmera pelo site. Use "Ler o QR Code de uma foto".';
    return;
  }
  let ler;
  try {
    ler = await prepararLeitorDeQr();
    sessao.fluxo = await navigator.mediaDevices.getUserMedia({ video: { facingMode: { ideal: 'environment' } }, audio: false });
  } catch (e) {
    if (sessao.fluxo) sessao.fluxo.getTracks().forEach((faixa) => faixa.stop());
    if (leitorDeQrAtivo === sessao) leitorDeQrAtivo = null;
    aviso.textContent = 'Não foi possível abrir a câmera. Permita o uso da câmera ou use "Ler o QR Code de uma foto".';
    return;
  }
  if (!sessao.ativo) {
    sessao.fluxo.getTracks().forEach((faixa) => faixa.stop());
    return;
  }
  video.srcObject = sessao.fluxo;
  try { await video.play(); } catch (e) {  }
  let ultimoAviso = 0;
  const procurar = async () => {
    if (!sessao.ativo) return;
    try {
      if (video.readyState >= 2) {
        const texto = await ler(video);
        if (texto && sessao.ativo) {
          if (aoLerQr(texto, Date.now() - ultimoAviso > 2500 ? aviso : null)) return;
          ultimoAviso = Date.now();
        }
      }
    } catch (e) {
    }
    if (sessao.ativo) sessao.temporizador = setTimeout(procurar, 250);
  };
  procurar();
}

async function abrirAdicionarPessoa(codigoInicial) {
  const perfil = perfilAdultoAtivo();
  if (!perfil || !(await garantirAceite())) return;
  const corpo = janelaDoCenaculo('Nova conversa', `
    <div id="amigo-passo1">
      <p class="cenaculo-explica">Para conversar com alguém, cole aqui o código pessoal da pessoa ou o link que ela mandou. Se ela mostrar o QR Code, é só apontar a câmera do celular para ele.</p>
      <label class="perfil-editor-rotulo" for="amigo-codigo-campo">Código ou link da pessoa</label>
      <input type="text" id="amigo-codigo-campo" class="perfil-editor-campo" autocomplete="off" autocapitalize="characters" placeholder="Ex.: 7K3Q-9XPA">
      <button type="button" class="licao-botao" id="amigo-codigo-continuar">Continuar</button>
    </div>
    <div id="amigo-passo2" hidden></div>
    <p class="auth-feedback" id="amigo-codigo-aviso" aria-live="polite"></p>
    <div class="amigo-atalhos">
      <button type="button" class="filter-btn" id="amigo-escanear">${iconeDoCenaculo('escanear')} Escanear QR Code</button>
      <button type="button" class="filter-btn" id="amigo-ver-meu-codigo">${iconeDoCenaculo('qr')} Meu código</button>
    </div>`);
  const aviso = corpo.querySelector('#amigo-codigo-aviso');
  const campo = corpo.querySelector('#amigo-codigo-campo');
  corpo.querySelector('#amigo-ver-meu-codigo').addEventListener('click', () => abrirMeuCodigo());
  corpo.querySelector('#amigo-escanear').addEventListener('click', () => abrirEscanearCodigo());

  const mostrarPrevia = async (codigo) => {
    aviso.textContent = 'Procurando...';
    try {
      const previa = await chamarCenaculo('amigo_previa', { _pid: perfil.id, _codigo: codigo });
      if (!previa) { aviso.textContent = ERROS_DO_CENACULO.codigo_invalido; return; }
      aviso.textContent = '';
      corpo.querySelector('#amigo-passo1').hidden = true;
      const passo2 = corpo.querySelector('#amigo-passo2');
      passo2.hidden = false;
      if (previa.eu_mesmo) {
        passo2.innerHTML = `<p class="cenaculo-explica">${ERROS_DO_CENACULO.codigo_proprio}</p>`;
        return;
      }
      passo2.innerHTML = `
        <div class="cenaculo-previa amigo-previa">
          ${avatarDoCenaculo(previa.avatar, '', 'medio')}
          <div>
            <strong>${escaparTexto(previa.nome)}</strong>
            <small>${previa.ja_contato ? 'Vocês já conversam.' : 'Quer conversar com esta pessoa?'}</small>
          </div>
        </div>
        ${blocoDoParticipante()}
        <button type="button" class="licao-botao" id="amigo-adicionar">${previa.ja_contato ? 'Abrir conversa' : 'Adicionar e conversar'}</button>`;
      passo2.querySelector('#amigo-adicionar').addEventListener('click', async () => {
        const botao = passo2.querySelector('#amigo-adicionar');
        botao.disabled = true;
        try {
          const adicionado = await chamarCenaculo('amigo_adicionar', { _pid: perfil.id, _codigo: codigo });
          fecharJanelaDoCenaculo();
          abrirConversa(adicionado.id);
        } catch (erro) {
          aviso.textContent = mensagemDoCenaculo(erro);
          botao.disabled = false;
        }
      });
    } catch (erro) {
      aviso.textContent = mensagemDoCenaculo(erro);
    }
  };

  corpo.querySelector('#amigo-codigo-continuar').addEventListener('click', () => {
    const codigo = codigoDeAmigo(campo.value);
    if (!codigo) { aviso.textContent = 'Esse código não parece certo. Ele tem 8 letras e números, como 7K3Q-9XPA.'; return; }
    mostrarPrevia(codigo);
  });
  campo.addEventListener('keydown', (evento) => {
    if (evento.key === 'Enter') corpo.querySelector('#amigo-codigo-continuar').click();
  });
  if (codigoInicial) {
    campo.value = formatarCodigoPessoal(codigoInicial);
    mostrarPrevia(codigoInicial);
  }
}

function frasesDaComparacao(dados) {
  const nome = escaparTexto(primeiroNome(dados.nome));
  const diferenca = Number(dados.minha_fe || 0) - Number(dados.fe || 0);
  if (diferenca > 0) return tr('Você tem <strong>{n}</strong> de Fé a mais que {nome}. Continue assim!', { n: diferenca, nome });
  if (diferenca < 0) return tr('Faltam <strong>{n}</strong> de Fé para você alcançar {nome}.', { n: -diferenca, nome });
  return tr('Você e {nome} estão empatados em Fé.', { nome });
}

function desdeQuando(iso) {
  if (!iso) return '';
  const data = new Date(iso);
  if (Number.isNaN(data.getTime())) return '';
  return tr('No Lumina Sancti desde {data}', { data: data.toLocaleDateString(localDoIdioma(), { month: 'long', year: 'numeric' }) });
}

function cartaoDeEstatistica(icone, cor, valor, rotulo, detalhe) {
  return `
    <div class="perfil-estatistica" style="--cor-da-estatistica:${cor}">
      <span class="perfil-estatistica-icone">${icone === 'estrela' && typeof estrelaDaFe === 'function' ? estrelaDaFe() : iconeDoCenaculo(icone)}</span>
      <span class="perfil-estatistica-textos">
        <strong>${valor}</strong>
        <small>${rotulo}</small>
        ${detalhe ? `<small class="perfil-estatistica-detalhe">${detalhe}</small>` : ''}
      </span>
    </div>`;
}

function blocoDaComparacao(dados, fotoDoOutro) {
  const perfil = perfilAdultoAtivo();
  const minha = Math.max(0, Number(dados.minha_fe || 0));
  const dela = Math.max(0, Number(dados.fe || 0));
  const maior = Math.max(minha, dela, 1);
  const lado = (avatar, nome, valor, classe) => {
    const lider = valor > 0 && valor >= Math.max(minha, dela) && minha !== dela;
    return `
    <div class="perfil-duelo-lado ${classe}${lider ? ' na-frente' : ''}">
      ${lider ? `<span class="perfil-duelo-coroa" aria-label="Na frente">${iconeDoCenaculo('trofeu')}</span>` : ''}
      ${avatar}
      <strong>${valor}</strong>
      <small>${nome}</small>
      <span class="perfil-duelo-barra"><span style="height:${Math.max(6, Math.round((valor / maior) * 100))}%"></span></span>
    </div>`;
  };
  return `
    <section class="perfil-secao">
      <h4 class="perfil-secao-titulo">${tr('Você x {nome}', { nome: escaparTexto(primeiroNome(dados.nome)) })}</h4>
      <div class="perfil-duelo">
        ${lado(avatarDoCenaculo(perfil.avatar, perfil.fotoUrl, 'pequeno'), 'Você', minha, 'eu')}
        <span class="perfil-duelo-x">x</span>
        ${lado(avatarDoCenaculo(dados.avatar, fotoDoOutro, 'pequeno'), escaparTexto(primeiroNome(dados.nome)), dela, 'outro')}
      </div>
      <p class="perfil-duelo-frase">${frasesDaComparacao(dados)}</p>
    </section>`;
}

function seloDeNaoLidasDoPerfil(perfilId) {
  if (typeof ultimaListaDeCenaculos === 'undefined' || !Array.isArray(ultimaListaDeCenaculos)) return '';
  const conversa = ultimaListaDeCenaculos.find((c) => c.tipo === 'conversa' && c.outro && c.outro.perfil_id === perfilId);
  const novas = conversa ? Math.max(0, Number(conversa.nao_lidas || 0)) : 0;
  if (!novas) return '';
  return `<span class="cenaculo-nao-lidas perfil-acao-selo" aria-label="${escaparTexto(tr(novas === 1 ? '1 mensagem nova' : '{n} mensagens novas', { n: novas }))}">${novas > 99 ? '99+' : novas}</span>`;
}

function acoesDoPerfil(dados) {
  const nome = escaparTexto(primeiroNome(dados.nome));
  if (dados.eu) {
    return `
      <div class="perfil-acoes">
        <button type="button" class="perfil-acao" id="perfil-publico-meu-codigo">${iconeDoCenaculo('qr')}<span>Meu código</span></button>
      </div>`;
  }
  if (dados.contato) {
    return `
      <div class="perfil-acoes">
        <button type="button" class="perfil-acao" id="perfil-publico-conversar">${iconeDoCenaculo('conversa')}<span>Conversar</span>${seloDeNaoLidasDoPerfil(dados.perfil_id)}</button>
        <button type="button" class="perfil-acao" id="perfil-publico-audio">${iconeDoCenaculo('microfone')}<span>Áudio</span></button>
      </div>`;
  }
  return `<div class="perfil-pedido" id="perfil-publico-pedido" data-nome="${nome}"></div>`;
}

function rodapeDoPerfil(dados) {
  if (dados.eu || !cenaculoAberto || !membroDoCenaculo(dados.perfil_id)) return '';
  const bloqueado = (cenaculoAberto.bloqueados || []).includes(dados.perfil_id);
  const nome = escaparTexto(primeiroNome(dados.nome));
  return `
    <div class="perfil-perigo">
      <button type="button" class="perfil-perigo-botao" id="perfil-publico-bloquear" data-bloqueado="${bloqueado ? 'sim' : 'nao'}">${iconeDoCenaculo('escudo')}<span>${tr(bloqueado ? 'Desbloquear {nome}' : 'Bloquear {nome}', { nome })}</span></button>
    </div>`;
}

async function abrirConversaComContato(dados, gravarAudio) {
  const perfil = perfilAdultoAtivo();
  const idDaConversa = await chamarCenaculo('conversa_abrir', { _pid: perfil.id, _contato: dados.perfil_id });
  fecharJanelaDoCenaculo();
  if (!cenaculoAberto || cenaculoAberto.id !== idDaConversa) await abrirConversa(idDaConversa);
  if (gravarAudio && typeof comecarGravacao === 'function') comecarGravacao();
}

async function abrirPerfilPublico(idDoPerfil) {
  const perfil = perfilAdultoAtivo();
  if (!perfil || !idDoPerfil) return;
  const corpo = janelaDoCenaculo('Perfil', '<p class="perfis-carregando">Carregando o perfil...</p>');
  try {
    const dados = await chamarCenaculo('perfil_publico', { _pid: perfil.id, _alvo: idDoPerfil });
    let foto = '';
    if (dados.eu) foto = perfil.fotoUrl || '';
    else if (dados.foto) foto = (await enderecosAssinados('avatars', [dados.foto]))[dados.foto] || '';
    const titulo = document.getElementById('cenaculo-janela-titulo');
    if (titulo) titulo.textContent = dados.eu ? 'Seu perfil' : (dados.contato ? 'Dados do contato' : 'Perfil');
    const sequencia = Number(dados.sequencia || 0);
    const recorde = Number(dados.melhor_sequencia || 0);
    const licoes = Number(dados.licoes || 0);
    corpo.innerHTML = `
      <div class="perfil-publico">
        <div class="perfil-publico-capa">
          <span class="perfil-publico-foto">${avatarDoCenaculo(dados.avatar, foto, 'grande')}</span>
        </div>
        <div class="perfil-publico-topo">
          <strong class="perfil-publico-nome">${escaparTexto(dados.nome)}</strong>
          <small>${desdeQuando(dados.desde)}</small>
          <div class="perfil-social" id="perfil-publico-social"></div>
          <div class="perfil-selos">
            ${dados.eu ? '<span class="perfil-selo">Você</span>' : ''}
            ${dados.contato ? `<span class="perfil-selo">${iconeDoCenaculo('conversa')} Contato</span>` : ''}
            ${sequencia >= 3 ? `<span class="perfil-selo fogo">${iconeDoCenaculo('chama')} ${tr('{n} dias seguidos', { n: sequencia })}</span>` : ''}
            ${licoes >= 10 ? `<span class="perfil-selo estudioso">${iconeDoCenaculo('livro')} ${tr('{n} lições', { n: licoes })}</span>` : ''}
          </div>
        </div>
        ${acoesDoPerfil(dados)}
        <section class="perfil-secao">
          <h4 class="perfil-secao-titulo">Estatísticas</h4>
          <div class="perfil-publico-numeros">
            ${cartaoDeEstatistica('chama', '#ff9600', sequencia, sequencia === 1 ? 'dia seguido' : 'dias seguidos', recorde > 0 ? tr('recorde: {n}', { n: recorde }) : '')}
            ${cartaoDeEstatistica('estrela', '#f5b400', Number(dados.fe || 0), 'Fé no total', '')}
            ${cartaoDeEstatistica('trofeu', '#58cc02', Number(dados.fe_semana || 0), 'Fé nesta semana', '')}
            ${cartaoDeEstatistica('livro', '#1cb0f6', licoes, licoes === 1 ? 'lição concluída' : 'lições concluídas', '')}
          </div>
        </section>
        ${dados.eu ? '' : blocoDaComparacao(dados, foto)}
        ${dados.eu || !Array.isArray(dados.album) ? '' : `<section class="perfil-secao">
          <h4 class="perfil-secao-titulo">${tr('Álbum dos Santos')}</h4>
          <button type="button" class="album-botao" id="perfil-publico-album">
            <span class="album-botao-icone">${iconeDoCenaculo('medalha')}</span>
            <span class="album-botao-textos"><strong>${tr('Ver o álbum')}</strong><small>${tr('{n} de {total} figurinhas', { n: dados.album.length, total: santosData.length })}</small></span>
            ${iconeDoCenaculo('seta-direita')}
          </button>
        </section>`}
        ${rodapeDoPerfil(dados)}
      </div>`;
    if (typeof aplicarEnfeitesNoCartao === 'function') aplicarEnfeitesNoCartao(corpo.querySelector('.perfil-publico'), dados.enfeites);
    if (typeof preencherResumoSocial === 'function') {
      preencherResumoSocial(corpo.querySelector('#perfil-publico-social'), dados.perfil_id).then((resumo) => {
        const lugarDoPedido = corpo.querySelector('#perfil-publico-pedido');
        if (lugarDoPedido && typeof preencherAcoesDeConversa === 'function') {
          preencherAcoesDeConversa(lugarDoPedido, dados.perfil_id, resumo, () => abrirPerfilPublico(dados.perfil_id));
        }
      });
    }
    const conversar = corpo.querySelector('#perfil-publico-conversar');
    const audio = corpo.querySelector('#perfil-publico-audio');
    [[conversar, false], [audio, true]].forEach(([botao, gravar]) => {
      if (!botao) return;
      botao.addEventListener('click', async () => {
        botao.disabled = true;
        try {
          await abrirConversaComContato(dados, gravar);
        } catch (erro) {
          botao.disabled = false;
          avisoDoCenaculo(mensagemDoCenaculo(erro));
        }
      });
    });
    const verAlbum = corpo.querySelector('#perfil-publico-album');
    if (verAlbum) {
      verAlbum.addEventListener('click', () => {
        const cartasDoAmigo = {};
        dados.album.forEach((item) => { if (item && item.santo) cartasDoAmigo[item.santo] = item.dourada ? 'dourada' : 'normal'; });
        abrirAlbumDeSantos({ cartas: cartasDoAmigo, dono: dados.nome });
      });
    }
    const meuCodigo = corpo.querySelector('#perfil-publico-meu-codigo');
    if (meuCodigo) meuCodigo.addEventListener('click', () => abrirMeuCodigo());
    const bloquear = corpo.querySelector('#perfil-publico-bloquear');
    if (bloquear) {
      bloquear.addEventListener('click', () => {
        if (bloquear.dataset.bloqueado === 'sim') mudarBloqueio(dados.perfil_id, false);
        else confirmarBloqueio(dados.perfil_id, dados.nome);
      });
    }
  } catch (erro) {
    corpo.innerHTML = `<p class="not-found-msg">${mensagemDoCenaculo(erro)}</p>`;
  }
}

function metadadosDaConta() {
  return (typeof sessaoAtual !== 'undefined' && sessaoAtual && sessaoAtual.user && sessaoAtual.user.user_metadata) || {};
}

function fundoPessoal() {
  const perfil = perfilAdultoAtivo();
  if (!perfil) return null;
  const todos = metadadosDaConta().fundos_pessoais || {};
  return todos[perfil.id] || null;
}

async function salvarFundoPessoal(valor) {
  const perfil = perfilAdultoAtivo();
  if (!perfil) return;
  const todos = Object.assign({}, metadadosDaConta().fundos_pessoais || {});
  if (valor) todos[perfil.id] = valor;
  else delete todos[perfil.id];
  const { error } = await supabaseCliente.auth.updateUser({ data: { fundos_pessoais: todos } });
  if (error) throw error;
  if (sessaoAtual && sessaoAtual.user) {
    sessaoAtual.user.user_metadata = Object.assign({}, sessaoAtual.user.user_metadata || {}, { fundos_pessoais: todos });
  }
}

async function enderecoDoFundoPessoal(caminho) {
  if (!caminho) return '';
  const guardado = enderecosDosFundos[caminho];
  if (guardado && guardado.vale > Date.now()) return guardado.url;
  const enderecos = await enderecosAssinados('avatars', [caminho]);
  if (enderecos[caminho]) enderecosDosFundos[caminho] = { url: enderecos[caminho], vale: Date.now() + 50 * 60 * 1000 };
  return enderecos[caminho] || '';
}

function reduzirImagemDeFundo(arquivo, maiorLado) {
  return new Promise((resolver, rejeitar) => {
    const imagem = new Image();
    const endereco = URL.createObjectURL(arquivo);
    imagem.onload = () => {
      const escala = Math.min(1, maiorLado / Math.max(imagem.width, imagem.height));
      const tela = document.createElement('canvas');
      tela.width = Math.max(1, Math.round(imagem.width * escala));
      tela.height = Math.max(1, Math.round(imagem.height * escala));
      tela.getContext('2d').drawImage(imagem, 0, 0, tela.width, tela.height);
      URL.revokeObjectURL(endereco);
      tela.toBlob((blob) => (blob ? resolver(blob) : rejeitar(new Error('falha'))), 'image/jpeg', 0.82);
    };
    imagem.onerror = () => {
      URL.revokeObjectURL(endereco);
      rejeitar(new Error('falha'));
    };
    imagem.src = endereco;
  });
}

function podeMudarFundoDeTodos() {
  return !!cenaculoAberto && !!cenaculoAberto.id && (ehConversaADois() || cenaculoAberto.papel === 'organizador');
}

function reaplicarFundoDaConversa() {
  if (cenaculoAberto && cenaculoAberto.id) aplicarFundo(cenaculoAberto.fundo);
}

async function amostraDaFotoPessoal(botao, caminho) {
  const url = await enderecoDoFundoPessoal(caminho);
  const amostra = botao && botao.querySelector('.fundo-amostra');
  if (url && amostra) {
    amostra.style.backgroundImage = `url("${url}")`;
    amostra.classList.add('com-foto');
  }
}

function mostrarFundosPessoais(lugar) {
  const atual = fundoPessoal();
  const escolhido = !atual ? 'nenhum' : (atual.foto ? 'foto' : atual.pronto);
  lugar.innerHTML = `
    <p class="cenaculo-explica">Só você vê este papel de parede. Ele vale para todas as suas conversas neste perfil.</p>
    <div class="fundo-opcoes">
      <button type="button" class="fundo-opcao${escolhido === 'nenhum' ? ' escolhido' : ''}" data-pessoal="nenhum">
        <span class="fundo-amostra fundo-cada">${iconeDoCenaculo('conversa')}</span>
        <span class="fundo-opcao-nome">Fundo de cada conversa</span>
      </button>
      ${FUNDOS_DA_CONVERSA.map((f) => `
        <button type="button" class="fundo-opcao${escolhido === f.id ? ' escolhido' : ''}" data-pessoal="${f.id}">
          <span class="fundo-amostra fundo-${f.id}"></span>
          <span class="fundo-opcao-nome">${f.nome}</span>
        </button>`).join('')}
      <button type="button" class="fundo-opcao${escolhido === 'foto' ? ' escolhido' : ''}" data-pessoal="foto">
        <span class="fundo-amostra fundo-da-galeria">${iconeDoCenaculo('camera')}</span>
        <span class="fundo-opcao-nome">${escolhido === 'foto' ? 'Trocar a minha foto' : 'Foto do celular'}</span>
      </button>
    </div>
    <input type="file" id="papel-foto" accept="image/*" hidden>
    <p class="auth-feedback" id="papel-aviso" aria-live="polite"></p>`;
  const aviso = lugar.querySelector('#papel-aviso');
  const arquivo = lugar.querySelector('#papel-foto');
  if (atual && atual.foto) amostraDaFotoPessoal(lugar.querySelector('[data-pessoal="foto"]'), atual.foto);
  const concluir = () => {
    reaplicarFundoDaConversa();
    fecharJanelaDoCenaculo();
    avisoDoCenaculo('Papel de parede salvo.');
  };
  lugar.querySelectorAll('.fundo-opcao[data-pessoal]').forEach((botao) => {
    botao.addEventListener('click', async () => {
      const valor = botao.dataset.pessoal;
      if (valor === 'foto') { arquivo.click(); return; }
      try {
        const anterior = fundoPessoal();
        await salvarFundoPessoal(valor === 'nenhum' ? null : { pronto: valor });
        if (anterior && anterior.foto) {
          try { await supabaseCliente.storage.from('avatars').remove([anterior.foto]); } catch (e) {  }
        }
        concluir();
      } catch (erro) {
        aviso.textContent = 'Não foi possível salvar agora. Tente de novo.';
      }
    });
  });
  arquivo.addEventListener('change', async () => {
    const escolhida = arquivo.files && arquivo.files[0];
    if (!escolhida) return;
    if (!escolhida.type || !escolhida.type.startsWith('image/')) { aviso.textContent = 'Escolha um arquivo de imagem.'; return; }
    const conta = sessaoAtual && sessaoAtual.user;
    const perfil = perfilAdultoAtivo();
    if (!conta || !perfil) return;
    aviso.textContent = 'Enviando a foto...';
    try {
      const imagem = await reduzirImagemDeFundo(escolhida, 1280);
      const caminho = `${conta.id}/fundo-${perfil.id}-${Date.now()}.jpg`;
      const { error } = await supabaseCliente.storage.from('avatars').upload(caminho, imagem, { contentType: 'image/jpeg', upsert: false });
      if (error) throw error;
      const anterior = fundoPessoal();
      await salvarFundoPessoal({ foto: caminho });
      enderecosDosFundos[caminho] = { url: URL.createObjectURL(imagem), vale: Date.now() + 50 * 60 * 1000 };
      if (anterior && anterior.foto && anterior.foto !== caminho) {
        try { await supabaseCliente.storage.from('avatars').remove([anterior.foto]); } catch (e) {  }
      }
      concluir();
    } catch (erro) {
      aviso.textContent = 'Não foi possível usar essa foto. Tente outra.';
    }
  });
}

function mostrarFundosDeTodos(lugar) {
  const atual = cenaculoAberto.fundo || 'padrao';
  lugar.innerHTML = `
    <p class="cenaculo-explica">${ehConversaADois() ? 'Este fundo aparece para vocês dois, a menos que alguém tenha escolhido um papel de parede só para si.' : 'Este fundo aparece para todos do cenáculo, a menos que alguém tenha escolhido um papel de parede só para si.'}</p>
    <div class="fundo-opcoes">
      ${FUNDOS_DA_CONVERSA.map((f) => `
        <button type="button" class="fundo-opcao${f.id === atual ? ' escolhido' : ''}" data-fundo="${f.id}">
          <span class="fundo-amostra fundo-${f.id}"></span>
          <span class="fundo-opcao-nome">${f.nome}</span>
        </button>`).join('')}
    </div>
    <p class="auth-feedback" id="fundo-aviso" aria-live="polite"></p>`;
  lugar.querySelectorAll('.fundo-opcao[data-fundo]').forEach((botao) => {
    botao.addEventListener('click', async () => {
      const fundo = botao.dataset.fundo;
      try {
        await chamarCenaculo('cenaculo_mudar_fundo', { _pid: perfilAdultoAtivo().id, _cid: cenaculoAberto.id, _fundo: fundo });
        cenaculoAberto.fundo = fundo;
        aplicarFundo(fundo);
        fecharJanelaDoCenaculo();
      } catch (erro) {
        lugar.querySelector('#fundo-aviso').textContent = mensagemDoCenaculo(erro);
      }
    });
  });
}

function abrirEscolhaDeFundo(aba) {
  if (!perfilAdultoAtivo()) return;
  const deTodos = podeMudarFundoDeTodos();
  const corpo = janelaDoCenaculo('Papel de parede', `
    ${deTodos ? `
    <div class="codigo-qr-abas" role="tablist">
      <button type="button" class="codigo-qr-aba papel-aba" data-aba="meu" role="tab">Só para mim</button>
      <button type="button" class="codigo-qr-aba papel-aba" data-aba="todos" role="tab">${ehConversaADois() ? 'Para nós dois' : 'Para todos'}</button>
    </div>` : ''}
    <div id="papel-conteudo"></div>`);
  const lugar = corpo.querySelector('#papel-conteudo');
  const mostrar = (qual) => {
    corpo.querySelectorAll('.papel-aba').forEach((b) => b.classList.toggle('ativa', b.dataset.aba === qual));
    if (qual === 'todos') mostrarFundosDeTodos(lugar);
    else mostrarFundosPessoais(lugar);
  };
  corpo.querySelectorAll('.papel-aba').forEach((botao) => botao.addEventListener('click', () => mostrar(botao.dataset.aba)));
  mostrar(aba === 'todos' && deTodos ? 'todos' : 'meu');
}

function acaoDoMeuPerfil(id, icone, texto) {
  return `<button type="button" class="perfil-acao" id="${id}">${iconeDoCenaculo(icone)}<span>${texto}</span></button>`;
}

function blocoDasInsignias() {
  if (typeof carregarProgressoTrilhas !== 'function' || typeof trilhasEmUso !== 'function' || typeof trilhaConcluida !== 'function') return '';
  let trilhas = [];
  let estado = null;
  try {
    trilhas = trilhasEmUso() || [];
    estado = carregarProgressoTrilhas();
  } catch (e) {
    return '';
  }
  if (!trilhas.length || !estado) return '';
  const conquistadas = trilhas.filter((t) => trilhaConcluida(t, estado));
  const mostrar = trilhas.slice().sort((a, b) => Number(trilhaConcluida(b, estado)) - Number(trilhaConcluida(a, estado))).slice(0, 6);
  return `
    <section class="perfil-secao">
      <div class="perfil-secao-cabecalho">
        <h4 class="perfil-secao-titulo">Insígnias</h4>
        <button type="button" class="perfil-link" id="meu-perfil-insignias">Ver todas</button>
      </div>
      <div class="meu-perfil-insignias">
        ${mostrar.map((trilha) => {
          const tem = trilhaConcluida(trilha, estado);
          return `<span class="meu-perfil-insignia${tem ? ' conquistada' : ''}" title="${escaparTexto(trilha.santo || '')}">${iconeDoCenaculo(tem ? 'medalha' : 'cadeado')}<small>${escaparTexto(trilha.santo || '')}</small></span>`;
        }).join('')}
      </div>
      <p class="meu-perfil-insignias-resumo">${tr('{n} de {total} insígnias conquistadas', { n: conquistadas.length, total: trilhas.length })}</p>
    </section>`;
}

const CHAVE_TAMANHO_DO_TEXTO = 'lumina-sancti-tamanho-texto';
const CHAVE_MENOS_MOVIMENTO = 'lumina-sancti-menos-movimento';
const IDIOMAS_DO_APP = [
  ['pt', 'Português', '<svg class="bandeira" viewBox="0 0 20 14" aria-hidden="true"><rect width="20" height="14" fill="#009c3b"/><path d="M10 1.8 18.2 7 10 12.2 1.8 7z" fill="#ffdf00"/><circle cx="10" cy="7" r="2.9" fill="#002776"/></svg>'],
  ['en', 'English', '<svg class="bandeira" viewBox="0 0 20 14" aria-hidden="true"><rect width="20" height="14" fill="#ffffff"/><path d="M0 0h20v2H0zM0 4h20v2H0zM0 8h20v2H0zM0 12h20v2H0z" fill="#b22234"/><rect width="9" height="8" fill="#3c3b6e"/></svg>'],
  ['es', 'Español', '<svg class="bandeira" viewBox="0 0 20 14" aria-hidden="true"><rect width="20" height="14" fill="#aa151b"/><rect y="3.5" width="20" height="7" fill="#f1bf00"/></svg>'],
];
const TAMANHOS_DO_TEXTO = [['normal', 'Normal'], ['grande', 'Grande'], ['maior', 'Muito grande']];
const ICONE_DO_GLOBO = '<svg class="icone" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15 15 0 0 1 0 20 15 15 0 0 1 0-20z"/></svg>';
const ICONE_DO_TEXTO = '<svg class="icone" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7V5h11v2M9.5 5v14M7 19h5M14 12v-1.5h7V12M17.5 10.5V19M16 19h3"/></svg>';
const ICONE_DO_MOVIMENTO = '<svg class="icone" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M3 12h4l3-8 4 16 3-8h4"/></svg>';

function lerPreferencia(chave) {
  try { return localStorage.getItem(chave) || ''; } catch (e) { return ''; }
}

function guardarPreferencia(chave, valor) {
  try {
    if (valor) localStorage.setItem(chave, valor);
    else localStorage.removeItem(chave);
  } catch (e) {
  }
}

function aplicarPreferenciasDoAparelho() {
  const raiz = document.documentElement;
  const tamanho = lerPreferencia(CHAVE_TAMANHO_DO_TEXTO);
  raiz.classList.toggle('texto-grande', tamanho === 'grande');
  raiz.classList.toggle('texto-maior', tamanho === 'maior');
  raiz.classList.toggle('menos-movimento', lerPreferencia(CHAVE_MENOS_MOVIMENTO) === '1');
}

aplicarPreferenciasDoAparelho();

function blocoDasPreferencias() {
  const idioma = typeof idiomaAtual !== 'undefined' && idiomaAtual ? idiomaAtual : 'pt';
  const tamanho = lerPreferencia(CHAVE_TAMANHO_DO_TEXTO) || 'normal';
  const menos = lerPreferencia(CHAVE_MENOS_MOVIMENTO) === '1';
  return `
      <section class="perfil-secao">
        <h4 class="perfil-secao-titulo">Preferências</h4>
        <div class="ajustes-lista">
          <div class="ajuste-bloco">
            <div class="ajuste-bloco-topo">
              <span class="ajuste-icone">${ICONE_DO_GLOBO}</span>
              <span class="ajuste-textos"><strong>Idioma</strong><small>O app inteiro muda para o idioma escolhido</small></span>
            </div>
            <div class="ajuste-escolhas" role="group" aria-label="Idioma">
              ${IDIOMAS_DO_APP.map(([codigo, nome, bandeira]) => `<button type="button" class="ajuste-escolha${codigo === idioma ? ' ativa' : ''}" data-idioma="${codigo}" aria-pressed="${codigo === idioma}" translate="no">${bandeira}<span>${nome}</span></button>`).join('')}
            </div>
          </div>
          <div class="ajuste-bloco">
            <div class="ajuste-bloco-topo">
              <span class="ajuste-icone">${ICONE_DO_TEXTO}</span>
              <span class="ajuste-textos"><strong>Tamanho do texto</strong><small>Deixe as letras maiores para ler melhor</small></span>
            </div>
            <div class="ajuste-escolhas" role="group" aria-label="Tamanho do texto">
              ${TAMANHOS_DO_TEXTO.map(([codigo, nome], i) => `<button type="button" class="ajuste-escolha${codigo === tamanho ? ' ativa' : ''}" data-tamanho="${codigo}" aria-pressed="${codigo === tamanho}"><span class="ajuste-aa ajuste-aa-${i}" aria-hidden="true">Aa</span><span>${nome}</span></button>`).join('')}
            </div>
          </div>
          <label class="ajuste ajuste-chave">
            <span class="ajuste-icone">${ICONE_DO_MOVIMENTO}</span>
            <span class="ajuste-textos"><strong>Menos animações</strong><small>Deixa o app mais calmo e economiza bateria</small></span>
            <input type="checkbox" class="chave" id="pref-menos-movimento"${menos ? ' checked' : ''}>
            <span class="chave-trilho" aria-hidden="true"></span>
          </label>
        </div>
      </section>`;
}

function blocoDosMeusSantos() {
  const lista = typeof santosData !== 'undefined' ? santosData : [];
  const achar = (id) => lista.find((s) => s.id === id) || null;
  const nome = (s) => escaparTexto(typeof textoDoSanto === 'function' ? textoDoSanto(s).nome : s.nome);
  const foto = (id) => {
    const endereco = typeof enderecoDaFotoDoSanto === 'function' ? enderecoDaFotoDoSanto(id) : '';
    return endereco ? `<img src="${escaparTexto(endereco)}" alt="" loading="lazy">` : '';
  };
  const devocao = achar(typeof santoDeDevocao === 'function' ? santoDeDevocao() : '');
  const favoritos = (typeof getFavoritos === 'function' ? getFavoritos() : []).map(achar).filter(Boolean);
  return `
      <section class="perfil-secao meus-santos">
        <h4 class="perfil-secao-titulo">Meus santos</h4>
        ${devocao ? `
        <button type="button" class="santo-devocao-cartao" data-abrir-santo="${devocao.id}">
          <span class="santo-devocao-foto">${foto(devocao.id)}</span>
          <span class="santo-devocao-textos"><small>Meu santo de devoção</small><strong translate="no">${nome(devocao)}</strong><em>Ler a história</em></span>
        </button>` : `
        <p class="meus-santos-vazio">Você ainda não escolheu um santo de devoção. Abra a história de um santo e, no final, toque em "Escolher como meu santo de devoção".</p>`}
        <div class="meus-santos-favoritos-topo"><strong>Favoritos</strong><small>${favoritos.length}</small></div>
        ${favoritos.length ? `
        <div class="favoritos-faixa">
          ${favoritos.map((s) => `<button type="button" class="favorito-mini" data-abrir-santo="${s.id}"><span class="favorito-mini-foto">${foto(s.id)}</span><span class="favorito-mini-nome" translate="no">${nome(s)}</span></button>`).join('')}
        </div>` : `
        <p class="meus-santos-vazio">Toque no coração de um santo para guardá-lo aqui.</p>`}
        ${blocoDosSantosPessoais(achar, nome, foto)}
        ${blocoDoAlbum()}
        ${blocoDoPassaporte()}
        ${blocoDaVirtude()}
      </section>`;
}

function chaveDoAniversario() {
  const perfil = typeof membroAtivo !== 'undefined' && membroAtivo && membroAtivo.id ? membroAtivo.id : 'aparelho';
  return `lumina-sancti-aniversario-${perfil}`;
}

function santoDoNome(nomeDaPessoa) {
  const limpar = (texto) => String(texto || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
  const primeiro = limpar(nomeDaPessoa).split(/\s+/)[0];
  if (!primeiro || primeiro.length < 3 || typeof santosData === 'undefined') return null;
  return santosData.find((s) => limpar(s.nome).split(/[^a-z]+/).slice(1).includes(primeiro)) || null;
}

function santoDaData(mesDia) {
  if (!mesDia || typeof santosData === 'undefined') return null;
  const [mes, dia] = mesDia.split('-').map(Number);
  const base = new Date(2024, mes - 1, dia);
  let melhor = null;
  santosData.forEach((santo) => {
    const partes = /^(\d{2})-(\d{2})$/.exec(santo.data || santo.festa || '');
    if (!partes) return;
    let quando = new Date(2024, Number(partes[1]) - 1, Number(partes[2]));
    if (quando < base) quando = new Date(2025, Number(partes[1]) - 1, Number(partes[2]));
    const dias = Math.round((quando - base) / 86400000);
    if (!melhor || dias < melhor.dias) melhor = { santo, dias };
  });
  return melhor ? melhor.santo : null;
}

function avisarFestaDosSantosPessoais() {
  const perfil = (typeof membroAtivo !== 'undefined' && membroAtivo) || null;
  const hoje = new Date();
  const mesDia = `${String(hoje.getMonth() + 1).padStart(2, '0')}-${String(hoje.getDate()).padStart(2, '0')}`;
  const chave = `lumina-sancti-festa-avisada-${perfil && perfil.id ? perfil.id : 'aparelho'}`;
  let aniversario = '';
  try {
    if (localStorage.getItem(chave) === mesDia) return;
    aniversario = localStorage.getItem(chaveDoAniversario()) || '';
  } catch (e) {
    return;
  }
  const doNome = santoDoNome(perfil ? perfil.nome : '');
  let texto = '';
  if (aniversario === mesDia) {
    const doDia = santoDaData(mesDia);
    texto = doDia ? tr('Feliz aniversário! Hoje {nome} reza por você.', { nome: textoDoSanto(doDia).nome }) : tr('Feliz aniversário! Os santos rezam por você hoje.');
  } else if (doNome && (doNome.data || doNome.festa) === mesDia) {
    texto = tr('Hoje é a festa de {nome}, o santo do seu nome!', { nome: textoDoSanto(doNome).nome });
  }
  if (!texto || typeof avisoRapidoDosSantos !== 'function') return;
  try { localStorage.setItem(chave, mesDia); } catch (e) { return; }
  avisoRapidoDosSantos(texto, 'estrela');
}

function blocoDosSantosPessoais(achar, nome, foto) {
  const perfil = (typeof membroAtivo !== 'undefined' && membroAtivo) || null;
  const doNome = santoDoNome(perfil ? perfil.nome : '');
  let aniversario = '';
  try { aniversario = localStorage.getItem(chaveDoAniversario()) || ''; } catch (e) {
  }
  const doAniversario = santoDaData(aniversario);
  const cartao = (santo, rotulo) => `
          <button type="button" class="santo-pessoal" data-abrir-santo="${santo.id}">
            <span class="favorito-mini-foto">${foto(santo.id)}</span>
            <small>${rotulo}</small>
            <strong translate="no">${nome(santo)}</strong>
          </button>`;
  return `
        <div class="meus-santos-favoritos-topo"><strong>Santos que caminham com você</strong></div>
        <div class="santos-pessoais">
          ${doNome ? cartao(doNome, tr('Do seu nome')) : `<p class="meus-santos-vazio">${tr('Não achamos um santo com o seu nome.')}</p>`}
          ${doAniversario ? cartao(doAniversario, tr('Do seu aniversário')) : `
          <label class="santo-pessoal santo-pessoal-vazio">
            <small>${tr('Do seu aniversário')}</small>
            <span>${tr('Quando você faz aniversário?')}</span>
            <input type="date" id="meu-aniversario" aria-label="${tr('Data do seu aniversário')}">
          </label>`}
        </div>
        ${doAniversario ? `<button type="button" class="perfil-link" id="trocar-aniversario">${tr('Mudar a data do aniversário')}</button>` : ''}`;
}

function blocoDoAlbum() {
  if (typeof cartasDoAlbum !== 'function' || typeof santosData === 'undefined') return '';
  const cartas = cartasDoAlbum();
  const tenho = santosData.filter((s) => cartas[s.id]).length;
  const porcento = Math.round((tenho / santosData.length) * 100);
  return `
        <button type="button" class="album-botao" id="abrir-album">
          <span class="album-botao-icone">${iconeDoCenaculo('medalha')}</span>
          <span class="album-botao-textos"><strong>${tr('Meu álbum de santos')}</strong><small>${tr('{n} de {total} figurinhas', { n: tenho, total: santosData.length })}</small><span class="album-barra"><span style="width:${porcento}%"></span></span></span>
          ${iconeDoCenaculo('seta-direita')}
        </button>`;
}

const SANTUARIOS = [
  { id: 'aparecida', nome: 'Aparecida', pais: 'Brasil', lugar: 'Santuário Nacional de Nossa Senhora Aparecida', lat: -22.8519, lon: -45.2337, trilhas: ['nossa-senhora'] },
  { id: 'salvador', nome: 'Salvador', pais: 'Brasil', lugar: 'Santuário de Santa Dulce dos Pobres', lat: -12.9333, lon: -38.5106, trilhas: ['dulce-pobres'] },
  { id: 'fatima', nome: 'Fátima', pais: 'Portugal', lugar: 'Santuário de Fátima', lat: 39.6317, lon: -8.6728, trilhas: ['nossa-senhora'] },
  { id: 'guadalupe', nome: 'Guadalupe', pais: 'México', lugar: 'Basílica de Guadalupe', lat: 19.4847, lon: -99.1172, trilhas: ['nossa-senhora'] },
  { id: 'nazare', nome: 'Nazaré', pais: 'Israel', lugar: 'Basílica da Anunciação', lat: 32.7022, lon: 35.2978, trilhas: ['jose'] },
  { id: 'roma', nome: 'Roma', pais: 'Vaticano', lugar: 'Basílica de São Pedro', lat: 41.9022, lon: 12.4539, trilhas: ['joao-paulo-ii', 'judas-tadeu', 'sebastiao'] },
  { id: 'assis', nome: 'Assis', pais: 'Itália', lugar: 'Basílica de São Francisco', lat: 43.0748, lon: 12.6055, trilhas: ['francisco-assis', 'clara-assis', 'carlo-acutis'] },
  { id: 'padua', nome: 'Pádua', pais: 'Itália', lugar: 'Basílica de Santo Antônio', lat: 45.4014, lon: 11.8807, trilhas: ['antonio-padua'] },
  { id: 'cassia', nome: 'Cássia', pais: 'Itália', lugar: 'Basílica de Santa Rita', lat: 42.7177, lon: 13.0144, trilhas: ['rita-cassia'] },
  { id: 'san-giovanni-rotondo', nome: 'San Giovanni Rotondo', pais: 'Itália', lugar: 'Santuário de São Padre Pio', lat: 41.7064, lon: 15.7036, trilhas: ['padre-pio'] },
  { id: 'monte-cassino', nome: 'Monte Cassino', pais: 'Itália', lugar: 'Abadia de Monte Cassino', lat: 41.49, lon: 13.8139, trilhas: ['bento-nursia'] },
  { id: 'ostia', nome: 'Óstia', pais: 'Itália', lugar: 'Onde Santa Mônica passou seus últimos dias', lat: 41.7556, lon: 12.2903, trilhas: ['monica'] },
  { id: 'turim', nome: 'Turim', pais: 'Itália', lugar: 'Basílica de Maria Auxiliadora', lat: 45.0786, lon: 7.6735, trilhas: ['joao-bosco'] },
  { id: 'lisieux', nome: 'Lisieux', pais: 'França', lugar: 'Basílica de Santa Teresinha', lat: 49.1414, lon: 0.235, trilhas: ['teresinha'] },
  { id: 'avila', nome: 'Ávila', pais: 'Espanha', lugar: 'Convento de Santa Teresa', lat: 40.656, lon: -4.701, trilhas: ['teresa-avila'] },
  { id: 'cracovia', nome: 'Cracóvia', pais: 'Polônia', lugar: 'Santuário da Divina Misericórdia', lat: 50.0187, lon: 19.9318, trilhas: ['faustina'] },
  { id: 'niepokalanow', nome: 'Niepokalanów', pais: 'Polônia', lugar: 'Convento fundado por São Maximiliano Kolbe', lat: 52.2196, lon: 20.4119, trilhas: ['maximiliano-kolbe'] },
  { id: 'calcuta', nome: 'Calcutá', pais: 'Índia', lugar: 'Casa Mãe das Missionárias da Caridade', lat: 22.5524, lon: 88.3601, trilhas: ['teresa-calcuta'] },
];
const DISTANCIA_DO_SANTUARIO_EM_KM = 5;

function chaveDoPassaporte() {
  const perfil = typeof membroAtivo !== 'undefined' && membroAtivo && membroAtivo.id ? membroAtivo.id : 'aparelho';
  return `lumina-sancti-passaporte-${perfil}`;
}

function visitasDoPassaporte() {
  try { return JSON.parse(localStorage.getItem(chaveDoPassaporte()) || '{}') || {}; } catch (e) { return {}; }
}

function trilhasTerminadas() {
  const feitas = new Set();
  let estado = null;
  try { estado = typeof carregarProgressoTrilhas === 'function' ? carregarProgressoTrilhas() : null; } catch (e) { estado = null; }
  if (!estado || !estado.licoes || typeof trilhasDoAlbum !== 'function') return feitas;
  trilhasDoAlbum().forEach((trilha) => {
    if (trilha.licoes && trilha.licoes.length && trilhaConcluida(trilha, estado)) feitas.add(trilha.santoId || trilha.slug);
  });
  return feitas;
}

function distanciaEmKm(lat1, lon1, lat2, lon2) {
  const rad = (graus) => (graus * Math.PI) / 180;
  const a = Math.sin(rad(lat2 - lat1) / 2) ** 2 + Math.cos(rad(lat1)) * Math.cos(rad(lat2)) * Math.sin(rad(lon2 - lon1) / 2) ** 2;
  return 6371 * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function nomesDosSantosDoSantuario(santuario) {
  return santuario.trilhas.map((id) => {
    const santo = santosData.find((s) => s.id === id);
    return santo ? textoDoSanto(santo).nome : tr('Nossa Senhora');
  }).join(' · ');
}

function blocoDoPassaporte() {
  const feitas = trilhasTerminadas();
  const carimbos = SANTUARIOS.filter((s) => s.trilhas.some((t) => feitas.has(t))).length;
  return `
        <button type="button" class="album-botao passaporte-botao" id="abrir-passaporte">
          <span class="album-botao-icone">${iconeDoCenaculo('igreja')}</span>
          <span class="album-botao-textos"><strong>${tr('Passaporte do peregrino')}</strong><small>${tr('{n} de {total} carimbos', { n: carimbos, total: SANTUARIOS.length })}</small></span>
          ${iconeDoCenaculo('seta-direita')}
        </button>`;
}

function abrirPassaporte() {
  const feitas = trilhasTerminadas();
  const visitas = visitasDoPassaporte();
  const carimbados = SANTUARIOS.filter((s) => s.trilhas.some((t) => feitas.has(t))).length;
  const carimbo = (santuario, i) => {
    const ganho = santuario.trilhas.some((t) => feitas.has(t));
    const visita = visitas[santuario.id];
    return `<button type="button" class="carimbo${ganho ? ' ganho' : ''}${visita ? ' visitado' : ''}" data-santuario="${santuario.id}" style="--inclinacao:${((i * 7) % 15) - 7}deg">
      <span class="carimbo-anel"><span class="carimbo-cidade" translate="no">${santuario.nome}</span><span class="carimbo-pais">${tr(santuario.pais)}</span></span>
      ${visita ? `<span class="carimbo-peregrino">${tr('Peregrino')}<small>${escaparTexto(visita)}</small></span>` : ''}
      <span class="carimbo-lugar">${tr(santuario.lugar)}</span>
      <span class="carimbo-santos" translate="no">${escaparTexto(nomesDosSantosDoSantuario(santuario))}</span>
    </button>`;
  };
  const corpo = janelaDoCenaculo(tr('Passaporte do peregrino'), `<div class="passaporte">
      <div class="passaporte-capa">
        <span class="passaporte-emblema">${iconeDoCenaculo('cruz')}</span>
        <small>LUMINA SANCTI</small>
        <strong>${tr('Passaporte do peregrino')}</strong>
        <span>${tr('{n} de {total} carimbos', { n: carimbados, total: SANTUARIOS.length })} · ${tr('{n} visitas', { n: Object.keys(visitas).length })}</span>
      </div>
      <p class="passaporte-explica">${tr('Cada trilha terminada carimba o santuário do santo. Se você for a um desses lugares de verdade, toque em "Estou num santuário" para ganhar o carimbo de peregrino.')}</p>
      <button type="button" class="passaporte-local" id="passaporte-local">${iconeDoCenaculo('igreja')}<span>${tr('Estou num santuário')}</span></button>
      <p class="passaporte-resposta" id="passaporte-resposta" aria-live="polite"></p>
      <div class="passaporte-carimbos">${SANTUARIOS.map(carimbo).join('')}</div>
      <p class="passaporte-privacidade">${tr('Sua localização só é usada na hora, para conferir. Ela não é guardada nem enviada.')}</p>
    </div>`);
  const resposta = corpo.querySelector('#passaporte-resposta');
  corpo.querySelectorAll('[data-santuario]').forEach((botao) => botao.addEventListener('click', () => {
    const santuario = SANTUARIOS.find((s) => s.id === botao.dataset.santuario);
    if (!santuario) return;
    const trilha = trilhasDoAlbum().find((t) => santuario.trilhas.includes(t.santoId || t.slug));
    const santo = santosData.find((s) => santuario.trilhas.includes(s.id));
    fecharJanelaDoCenaculo();
    if (!botao.classList.contains('ganho') && trilha && typeof abrirTrilhas === 'function') abrirTrilhas(trilha.slug);
    else if (santo && typeof showDetail === 'function') showDetail(santo.id);
  }));
  corpo.querySelector('#passaporte-local').addEventListener('click', (evento) => {
    const botao = evento.currentTarget;
    if (!navigator.geolocation) { resposta.textContent = tr('Este aparelho não consegue ver a localização.'); return; }
    botao.disabled = true;
    resposta.textContent = tr('Conferindo onde você está...');
    navigator.geolocation.getCurrentPosition((posicao) => {
      botao.disabled = false;
      const { latitude, longitude } = posicao.coords;
      const perto = SANTUARIOS.map((s) => ({ s, km: distanciaEmKm(latitude, longitude, s.lat, s.lon) })).sort((a, b) => a.km - b.km)[0];
      if (perto.km <= DISTANCIA_DO_SANTUARIO_EM_KM) {
        const hoje = new Date();
        const todas = visitasDoPassaporte();
        todas[perto.s.id] = `${String(hoje.getDate()).padStart(2, '0')}/${String(hoje.getMonth() + 1).padStart(2, '0')}/${hoje.getFullYear()}`;
        try { localStorage.setItem(chaveDoPassaporte(), JSON.stringify(todas)); } catch (e) { return; }
        avisoRapidoDosSantos(tr('Carimbo de peregrino em {lugar}!', { lugar: perto.s.nome }), 'estrela');
        abrirPassaporte();
        return;
      }
      resposta.textContent = tr('Você está a {km} km de {lugar}, o santuário mais perto do passaporte.', { km: Math.round(perto.km).toLocaleString(), lugar: perto.s.nome });
    }, () => {
      botao.disabled = false;
      resposta.textContent = tr('Não foi possível ver onde você está. Confira se a localização está liberada para o Lumina Sancti.');
    }, { enableHighAccuracy: true, timeout: 15000, maximumAge: 60000 });
  });
}

const VIRTUDES_DA_SEMANA = [
  { virtude: 'Paciência', santo: 'monica', acoes: ['Esperar sem reclamar', 'Responder com calma a quem me irritou', 'Rezar por alguém difícil de conviver'] },
  { virtude: 'Caridade', santo: 'teresa-calcuta', acoes: ['Ajudar em casa sem ninguém pedir', 'Dar atenção a quem está sozinho', 'Partilhar algo que é meu'] },
  { virtude: 'Humildade', santo: 'teresinha', acoes: ['Fazer uma boa ação sem contar a ninguém', 'Pedir desculpas', 'Elogiar alguém de coração'] },
  { virtude: 'Alegria', santo: 'joao-bosco', acoes: ['Sorrir para todos em casa', 'Contar algo bom que aconteceu hoje', 'Passar um tempo junto com a família'] },
  { virtude: 'Coragem', santo: 'sebastiao', acoes: ['Fazer o sinal da cruz sem vergonha', 'Defender quem foi tratado mal', 'Falar a verdade, mesmo sendo difícil'] },
  { virtude: 'Simplicidade', santo: 'francisco-assis', acoes: ['Usar menos o celular hoje', 'Agradecer a Deus pela natureza', 'Doar algo que eu não uso mais'] },
  { virtude: 'Confiança', santo: 'faustina', acoes: ['Rezar "Jesus, eu confio em Vós"', 'Ler um trecho do Evangelho', 'Entregar a Deus uma preocupação'] },
  { virtude: 'Perdão', santo: 'joao-paulo-ii', acoes: ['Perdoar uma ofensa', 'Não guardar mágoa de ninguém', 'Rezar por quem me fez mal'] },
  { virtude: 'Generosidade', santo: 'maximiliano-kolbe', acoes: ['Dar a vez para outra pessoa', 'Ajudar sem esperar nada em troca', 'Rezar por alguém que está sofrendo'] },
  { virtude: 'Trabalho', santo: 'jose', acoes: ['Fazer bem feita uma tarefa', 'Ajudar nos trabalhos da casa', 'Oferecer o meu trabalho a Deus'] },
  { virtude: 'Oração', santo: 'padre-pio', acoes: ['Rezar uma dezena do terço', 'Ficar um minuto em silêncio com Deus', 'Rezar pela família'] },
  { virtude: 'Esperança', santo: 'rita-cassia', acoes: ['Não desanimar diante de um problema', 'Animar alguém que está triste', 'Agradecer por três coisas boas do dia'] },
];
const META_DA_VIRTUDE_POR_PESSOA = 10;

function virtudeDaSemana() {
  const hoje = new Date();
  const semana = Math.floor((Date.UTC(hoje.getFullYear(), hoje.getMonth(), hoje.getDate()) - Date.UTC(2024, 0, 1)) / 604800000);
  return VIRTUDES_DA_SEMANA[((semana % VIRTUDES_DA_SEMANA.length) + VIRTUDES_DA_SEMANA.length) % VIRTUDES_DA_SEMANA.length];
}

function blocoDaVirtude() {
  const virtude = virtudeDaSemana();
  return `
        <button type="button" class="album-botao virtude-botao" id="abrir-virtude">
          <span class="album-botao-icone">${iconeDoCenaculo('coracao')}</span>
          <span class="album-botao-textos"><strong>${tr('Virtude da semana: {virtude}', { virtude: tr(virtude.virtude) })}</strong><small>${tr('Desafio da família')}</small></span>
          ${iconeDoCenaculo('seta-direita')}
        </button>`;
}

function dataLocalDaVirtude(data) {
  return `${data.getFullYear()}-${String(data.getMonth() + 1).padStart(2, '0')}-${String(data.getDate()).padStart(2, '0')}`;
}

function virtudeNaConta() {
  return typeof supabaseCliente !== 'undefined' && supabaseCliente && typeof sessaoAtual !== 'undefined' && sessaoAtual
    && typeof membroAtivo !== 'undefined' && membroAtivo && membroAtivo.id;
}

function chaveDaVirtude() {
  const perfil = typeof membroAtivo !== 'undefined' && membroAtivo && membroAtivo.id ? membroAtivo.id : 'aparelho';
  return `lumina-sancti-virtude-${perfil}`;
}

function virtudeLocal() {
  let marcas = {};
  try { marcas = JSON.parse(localStorage.getItem(chaveDaVirtude()) || '{}') || {}; } catch (e) { marcas = {}; }
  const hoje = new Date();
  const inicio = new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate() - ((hoje.getDay() + 6) % 7));
  const desde = dataLocalDaVirtude(inicio);
  const semana = Object.entries(marcas).filter(([dia]) => dia >= desde).reduce((soma, [, lista]) => soma + lista.length, 0);
  return { marcas, dados: { perfis: [{ id: 'eu', nome: (typeof membroAtivo !== 'undefined' && membroAtivo && membroAtivo.nome) || '', eu: true, hoje: marcas[dataLocalDaVirtude(hoje)] || [], semana }] } };
}

async function dadosDaVirtude() {
  if (virtudeNaConta()) return chamarCenaculo('desafio_da_familia', { _pid: membroAtivo.id });
  return virtudeLocal().dados;
}

async function marcarVirtude(acao, feita) {
  if (virtudeNaConta()) return chamarCenaculo('desafio_marcar', { _pid: membroAtivo.id, _acao: acao, _feita: feita });
  const { marcas } = virtudeLocal();
  const hoje = dataLocalDaVirtude(new Date());
  const lista = new Set(marcas[hoje] || []);
  if (feita) lista.add(acao); else lista.delete(acao);
  marcas[hoje] = Array.from(lista).sort();
  Object.keys(marcas).forEach((dia) => { if (dia < dataLocalDaVirtude(new Date(Date.now() - 60 * 86400000))) delete marcas[dia]; });
  localStorage.setItem(chaveDaVirtude(), JSON.stringify(marcas));
  return virtudeLocal().dados;
}

async function abrirDesafioDaVirtude() {
  const virtude = virtudeDaSemana();
  const santo = santosData.find((s) => s.id === virtude.santo);
  const endereco = santo && typeof enderecoDaFotoDoSanto === 'function' ? enderecoDaFotoDoSanto(santo.id) : '';
  const corpo = janelaDoCenaculo(tr('Virtude da semana'), `<p class="perfis-carregando">${tr('Carregando...')}</p>`);
  const desenhar = (dados) => {
    const perfis = (dados && dados.perfis) || [];
    const eu = perfis.find((p) => p.eu) || perfis[0] || { hoje: [] };
    const feitas = new Set((eu.hoje || []).map(Number));
    const total = perfis.reduce((soma, p) => soma + Number(p.semana || 0), 0);
    const meta = Math.max(1, perfis.length) * META_DA_VIRTUDE_POR_PESSOA;
    corpo.innerHTML = `<div class="virtude">
      <div class="virtude-topo">
        <span class="virtude-foto">${endereco ? `<img src="${escaparTexto(endereco)}" alt="">` : ''}</span>
        <span class="virtude-textos"><small>${tr('Virtude da semana')}</small><strong>${tr(virtude.virtude)}</strong><em translate="no">${santo ? escaparTexto(textoDoSanto(santo).nome) : ''}</em></span>
      </div>
      <p class="virtude-explica">${tr('Toda semana, uma virtude para a família viver junto. Marque as pequenas ações que você fez hoje.')}</p>
      <div class="virtude-acoes">${virtude.acoes.map((acao, i) => `<button type="button" class="virtude-acao${feitas.has(i) ? ' feita' : ''}" data-acao="${i}" aria-pressed="${feitas.has(i)}"><span class="virtude-check">${iconeDoCenaculo('check')}</span><span>${tr(acao)}</span></button>`).join('')}</div>
      <div class="virtude-familia">
        <div class="virtude-familia-topo"><strong>${tr('A família nesta semana')}</strong><small>${tr('{n} de {total} ações', { n: Math.min(total, meta), total: meta })}</small></div>
        <span class="virtude-barra"><span style="width:${Math.min(100, Math.round((total / meta) * 100))}%"></span></span>
        <ul class="virtude-pessoas">${perfis.map((p) => `<li><span translate="no">${escaparTexto(p.nome || tr('Você'))}</span>${p.eu && p.nome ? `<em>${tr('você')}</em>` : ''}<b>${Number(p.semana || 0)}</b></li>`).join('')}</ul>
      </div>
    </div>`;
    corpo.querySelectorAll('[data-acao]').forEach((botao) => botao.addEventListener('click', async () => {
      botao.disabled = true;
      try {
        desenhar(await marcarVirtude(Number(botao.dataset.acao), !botao.classList.contains('feita')));
      } catch (erro) {
        botao.disabled = false;
        avisoRapidoDosSantos(tr('Não foi possível salvar. Tente de novo.'));
      }
    }));
  };
  try {
    desenhar(await dadosDaVirtude());
  } catch (erro) {
    corpo.innerHTML = `<p class="not-found-msg">${tr('Não foi possível carregar o desafio. Tente de novo.')}</p>`;
  }
}

const SECOES_DO_ALBUM = { secreta: 'Sagrada Família', lendaria: 'Os Arcanjos', epica: 'Doutores da Igreja', rara: 'Jovens santos e beatos', comum: 'Grandes santos' };
const FIGURINHAS_POR_PAGINA = 9;
const SILHUETA_DO_SANTO = '<svg viewBox="0 0 40 52" aria-hidden="true"><circle cx="20" cy="11" r="9" fill="none" stroke="currentColor" stroke-width="1.6"/><circle cx="20" cy="19" r="7.5" fill="currentColor"/><path d="M5 52c0-12 6.5-20 15-20s15 8 15 20z" fill="currentColor"/></svg>';
let paginaDoAlbum = 0;
let teclasDoAlbumLigadas = false;

function teclaDoAlbum(evento) {
  const modal = document.getElementById('cenaculo-janela');
  const livro = modal && modal.classList.contains('active') ? modal.querySelector('.album-livro') : null;
  if (!livro) return;
  if (evento.key === 'ArrowRight') livro.querySelector('#album-avancar').click();
  else if (evento.key === 'ArrowLeft') livro.querySelector('#album-voltar').click();
}

function abrirAlbumDeSantos(opcoes) {
  const deAmigo = !!(opcoes && opcoes.cartas);
  const cartas = deAmigo ? opcoes.cartas : cartasDoAlbum();
  const comTrilha = deAmigo ? new Set() : new Set(trilhasDoAlbum().map((trilha) => trilha.santoId).filter(Boolean));
  const rotulos = { secreta: tr('Secreta'), lendaria: tr('Lendária'), epica: tr('Épica'), rara: tr('Rara'), comum: tr('Comum') };
  const ordenados = santosData.map((santo) => ({ santo, raridade: raridadeDaCarta(santo) }))
    .sort((a, b) => ORDEM_DAS_RARIDADES.indexOf(a.raridade) - ORDEM_DAS_RARIDADES.indexOf(b.raridade))
    .map((item, i) => Object.assign(item, { numero: i + 1 }));
  const tenho = ordenados.filter((item) => cartas[item.santo.id]).length;
  const paginas = [{ capa: true }];
  const inicioDaSecao = {};
  ORDEM_DAS_RARIDADES.forEach((raridade) => {
    const secao = ordenados.filter((item) => item.raridade === raridade);
    inicioDaSecao[raridade] = paginas.length;
    for (let i = 0; i < secao.length; i += FIGURINHAS_POR_PAGINA) paginas.push({ raridade, secao, lista: secao.slice(i, i + FIGURINHAS_POR_PAGINA) });
  });

  const figurinha = ({ santo, raridade, numero }) => {
    const numeroTexto = String(numero).padStart(3, '0');
    const carta = cartas[santo.id];
    const nome = escaparTexto(textoDoSanto(santo).nome);
    if (carta) {
      const endereco = typeof enderecoDaFotoDoSanto === 'function' ? enderecoDaFotoDoSanto(santo.id) : '';
      return `<div class="album-vaga cheia"><button type="button" class="album-carta ${raridade}${carta === 'dourada' ? ' dourada' : ''}" data-abrir-santo="${santo.id}">
        <span class="album-carta-brilho" aria-hidden="true"></span>
        <span class="album-carta-numero">${numeroTexto}</span>
        <span class="album-carta-foto">${endereco ? `<img src="${escaparTexto(endereco)}" alt="" loading="lazy">` : ''}</span>
        <span class="album-carta-nome" translate="no">${nome}</span>
        <span class="album-carta-selo">${rotulos[raridade]}${carta === 'dourada' ? ` · ${tr('Dourada')}` : ''}</span>
      </button></div>`;
    }
    const segredo = raridade === 'secreta';
    const temTrilha = comTrilha.has(santo.id);
    const tag = temTrilha ? 'button' : 'div';
    return `<${tag}${temTrilha ? ` type="button" data-abrir-trilha="${santo.id}"` : ''} class="album-vaga ${raridade}${temTrilha ? ' com-trilha' : (deAmigo ? '' : ' em-breve')}">
      <span class="album-vaga-numero">${numeroTexto}</span>
      <span class="album-vaga-silhueta">${segredo ? '?' : SILHUETA_DO_SANTO}</span>
      <span class="album-vaga-nome"${segredo ? '' : ' translate="no"'}>${segredo ? tr('Carta secreta') : nome}</span>
      ${deAmigo ? '' : `<span class="album-vaga-dica">${temTrilha ? tr('Termine a trilha') : tr('Trilha em breve')}</span>`}
    </${tag}>`;
  };

  const legenda = ORDEM_DAS_RARIDADES.map((raridade) => {
    const secao = ordenados.filter((item) => item.raridade === raridade);
    return `<button type="button" class="album-tipo ${raridade}" data-ir-pagina="${inicioDaSecao[raridade]}"><i aria-hidden="true"></i>${rotulos[raridade]} <b>${secao.filter((item) => cartas[item.santo.id]).length}/${secao.length}</b></button>`;
  }).join('');

  const desenharPagina = (indice) => {
    const pagina = paginas[indice];
    if (pagina.capa) return `<section class="album-pagina album-capa">
      <div class="album-capa-moldura">
        <svg class="album-capa-estrela" viewBox="0 0 100 100" aria-hidden="true"><path d="M50 0C52 35 65 48 100 50C65 52 52 65 50 100C48 65 35 52 0 50C35 48 48 35 50 0Z"/></svg>
        <p class="album-capa-marca">LUMINA SANCTI</p>
        <h3 class="album-capa-titulo">${tr('Álbum dos Santos')}</h3>
        <p class="album-capa-resumo">${tr('{n} de {total} figurinhas', { n: tenho, total: ordenados.length })}</p>
        <span class="album-barra"><span style="width:${Math.round((tenho / ordenados.length) * 100)}%"></span></span>
        <div class="album-tipos">${legenda}</div>
        ${deAmigo ? `<p class="album-capa-explica">${tr('Álbum de {nome}', { nome: escaparTexto(opcoes.dono || '') })}</p>` : `<p class="album-capa-explica">${tr('Termine a trilha de um santo para colar a figurinha dele. Faça todas as missões com 3 estrelas e ela fica dourada.')}</p>
        <p class="album-capa-trilhas">${tr('{n} santos já têm trilha. Novas trilhas liberam novas figurinhas.', { n: comTrilha.size })}</p>`}
      </div>
    </section>`;
    const coladas = pagina.secao.filter((item) => cartas[item.santo.id]).length;
    return `<section class="album-pagina ${pagina.raridade}">
      <header class="album-pagina-topo"><span class="album-pagina-selo" aria-hidden="true"></span><h3>${tr(SECOES_DO_ALBUM[pagina.raridade])}</h3><small>${rotulos[pagina.raridade]} · ${coladas}/${pagina.secao.length}</small></header>
      <div class="album-pagina-grade">${pagina.lista.map(figurinha).join('')}</div>
      <footer class="album-pagina-numero">${indice}</footer>
    </section>`;
  };

  const seta = iconeDoCenaculo('seta-direita');
  const corpo = janelaDoCenaculo(deAmigo ? tr('Álbum de {nome}', { nome: opcoes.dono || '' }) : tr('Meu álbum de santos'), `<div class="album-livro">
      <div class="album-folhas" id="album-folhas"></div>
      <div class="album-controles">
        <button type="button" class="album-virar voltar" id="album-voltar" aria-label="${tr('Página anterior')}">${seta}</button>
        <span class="album-indicador" id="album-indicador"></span>
        <button type="button" class="album-virar" id="album-avancar" aria-label="${tr('Próxima página')}">${seta}</button>
      </div>
    </div>`);
  const livro = corpo.querySelector('.album-livro');
  const folhas = livro.querySelector('#album-folhas');
  const janela = livro.closest('.cenaculo-janela-conteudo');
  const dupla = () => window.matchMedia('(min-width: 860px)').matches;
  const semMovimento = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const entre = (valor, minimo, maximo) => Math.max(minimo, Math.min(maximo, valor));
  const paginaBranca = '<section class="album-pagina album-branca" aria-hidden="true"></section>';
  const inicioValido = (indice) => {
    const limite = entre(indice, 0, paginas.length - 1);
    return dupla() && limite > 0 && limite % 2 === 0 ? limite - 1 : limite;
  };
  const abertura = (inicio) => {
    if (!dupla()) return { dir: inicio };
    return inicio === 0 ? { dir: 0 } : { esq: inicio, dir: inicio + 1 };
  };
  const paginaPronta = (indice) => {
    if (indice === undefined) return '';
    return indice < paginas.length ? desenharPagina(indice) : paginaBranca;
  };
  const proximo = (sentido) => {
    const destino = sentido > 0
      ? (dupla() && paginaDoAlbum > 0 ? paginaDoAlbum + 2 : paginaDoAlbum + 1)
      : (dupla() ? (paginaDoAlbum <= 1 ? 0 : paginaDoAlbum - 2) : paginaDoAlbum - 1);
    return destino < 0 || destino >= paginas.length ? null : destino;
  };
  const pintarLados = (esq, dir) => {
    folhas.innerHTML = `${dupla() ? `<div class="album-lado esq">${paginaPronta(esq)}</div>` : ''}<div class="album-lado dir">${paginaPronta(dir)}</div>`;
  };
  const adiantarFotos = (inicio) => {
    if (typeof enderecoDaFotoDoSanto !== 'function') return;
    for (let i = inicio - 2; i <= inicio + 3; i += 1) {
      const pagina = paginas[i];
      if (!pagina || !pagina.lista) continue;
      pagina.lista.forEach(({ santo }) => {
        const endereco = cartas[santo.id] ? enderecoDaFotoDoSanto(santo.id) : '';
        if (endereco) new Image().src = endereco;
      });
    }
  };
  const atualizarControles = (inicio) => {
    const vistas = [inicio, ...(dupla() && inicio > 0 ? [inicio + 1] : [])].filter((i) => i < paginas.length);
    const fracao = inicio / Math.max(1, paginas.length - 1);
    livro.querySelector('#album-indicador').textContent = inicio === 0
      ? tr('Capa')
      : tr('Página {n} de {total}', { n: vistas.join('-'), total: paginas.length - 1 });
    livro.querySelector('#album-voltar').disabled = inicio === 0;
    livro.querySelector('#album-avancar').disabled = vistas[vistas.length - 1] >= paginas.length - 1;
    folhas.style.setProperty('--pilha-esq', `${inicio === 0 ? 0 : (2 + fracao * 6).toFixed(1)}px`);
    folhas.style.setProperty('--pilha-dir', `${(2 + (1 - fracao) * 6).toFixed(1)}px`);
  };
  const mostrar = (inicio) => {
    paginaDoAlbum = inicioValido(inicio);
    const lados = abertura(paginaDoAlbum);
    folhas.className = `album-folhas ${dupla() ? 'dupla' : 'unica'}`;
    folhas.style.minHeight = '';
    folhas.style.setProperty('--abertura', dupla() && paginaDoAlbum === 0 ? '0' : '1');
    pintarLados(lados.esq, lados.dir);
    atualizarControles(paginaDoAlbum);
    adiantarFotos(paginaDoAlbum);
  };

  let giro = null;
  const comecarGiro = (anterior, seguinte) => {
    const a = abertura(anterior);
    const b = abertura(seguinte);
    const base = folhas.querySelector('.album-lado.dir');
    const largura = base.offsetWidth;
    const altura = base.offsetHeight;
    const esquerda = base.offsetLeft;
    const faixasTotal = dupla() ? 12 : 10;
    const passo = largura / faixasTotal;
    const sobra = 0.7;
    const semPreguica = (html) => html.replace(/loading="lazy"/g, 'loading="eager"');
    const frente = semPreguica(paginaPronta(a.dir));
    const verso = dupla() ? semPreguica(paginaPronta(b.esq)) : paginaBranca;
    const miolo = (lado, deslocamento, html) => `<div class="album-miolo ${lado}" style="left:${deslocamento.toFixed(2)}px;width:${largura}px;height:${altura}px">${html}</div>`;
    const fatia = (i) => `<div class="album-faixa" style="left:${i === 0 ? 0 : passo.toFixed(2)}px;width:${(passo + sobra).toFixed(2)}px">
      <div class="album-face frente">${miolo('dir', -i * passo, frente)}<i class="album-tom"></i><i class="album-luz"></i></div>
      <div class="album-face verso">${miolo('esq', -(largura - i * passo - passo - sobra), verso)}<i class="album-tom"></i><i class="album-luz"></i></div>
      ${i < faixasTotal - 1 ? fatia(i + 1) : ''}
    </div>`;
    folhas.style.minHeight = `${folhas.offsetHeight}px`;
    pintarLados(a.esq, b.dir);
    folhas.insertAdjacentHTML('beforeend', `${dupla() ? '<i class="album-sombra esq"></i>' : ''}<i class="album-sombra dir"></i><div class="album-folha-girando" style="left:${esquerda}px;width:${largura}px;height:${altura}px">${fatia(0)}</div>`);
    janela.classList.add('album-girando');
    giro = {
      anterior,
      seguinte,
      largura,
      p: 0,
      alvo: 1,
      quadro: null,
      dura: anterior === 0,
      abrindo: dupla() && anterior === 0,
      sombraEsq: folhas.querySelector('.album-sombra.esq'),
      sombraDir: folhas.querySelector('.album-sombra.dir'),
      faixas: Array.from(folhas.querySelectorAll('.album-faixa')).map((faixa) => ({
        faixa,
        tomFrente: faixa.children[0].querySelector('.album-tom'),
        luzFrente: faixa.children[0].querySelector('.album-luz'),
        tomVerso: faixa.children[1].querySelector('.album-tom'),
        luzVerso: faixa.children[1].querySelector('.album-luz'),
      })),
    };
  };
  const pintarGiro = (p) => {
    giro.p = p;
    let raiz = 180 * Math.pow(p, 1.8);
    let ponta = 180 * (1 - Math.pow(1 - p, 1.8));
    const meio = (raiz + ponta) / 2;
    if (giro.dura) {
      raiz = meio + (raiz - meio) * 0.1;
      ponta = meio + (ponta - meio) * 0.1;
    }
    const passo = (ponta - raiz) / (giro.faixas.length - 1);
    giro.faixas.forEach((item, i) => {
      item.faixa.style.transform = `rotateY(${(i === 0 ? -raiz : -passo).toFixed(2)}deg)`;
      const graus = raiz + passo * i;
      const escuro = (0.68 * Math.pow(Math.sin((graus * Math.PI) / 180), 1.4)).toFixed(3);
      item.tomFrente.style.opacity = escuro;
      item.tomVerso.style.opacity = escuro;
      item.luzFrente.style.opacity = (0.13 * Math.exp(-Math.pow((graus - 36) / 24, 2))).toFixed(3);
      item.luzVerso.style.opacity = (0.13 * Math.exp(-Math.pow((144 - graus) / 24, 2))).toFixed(3);
    });
    const radianos = (meio * Math.PI) / 180;
    const forca = (0.8 * Math.sin(radianos)).toFixed(3);
    giro.sombraDir.style.opacity = forca;
    giro.sombraDir.style.transform = `scaleX(${Math.max(0, Math.cos(radianos)).toFixed(3)})`;
    if (giro.sombraEsq) {
      giro.sombraEsq.style.opacity = forca;
      giro.sombraEsq.style.transform = `scaleX(${Math.max(0, -Math.cos(radianos)).toFixed(3)})`;
    }
    if (giro.abrindo) folhas.style.setProperty('--abertura', p.toFixed(3));
  };
  const terminarGiro = () => {
    if (!giro) return;
    if (giro.quadro) cancelAnimationFrame(giro.quadro);
    const destino = giro.alvo === 1 ? giro.seguinte : giro.anterior;
    giro = null;
    janela.classList.remove('album-girando');
    mostrar(destino);
  };
  const animarGiro = (alvo, duracao) => {
    const de = giro.p;
    const comeco = performance.now();
    giro.alvo = alvo;
    const quadro = (agora) => {
      if (!giro) return;
      const x = entre((agora - comeco) / duracao, 0, 1);
      const suave = x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
      pintarGiro(de + (alvo - de) * suave);
      if (x < 1) giro.quadro = requestAnimationFrame(quadro);
      else terminarGiro();
    };
    giro.quadro = requestAnimationFrame(quadro);
  };
  const girarPara = (destino) => {
    terminarGiro();
    const inicio = inicioValido(destino);
    if (inicio === paginaDoAlbum) return;
    if (semMovimento()) { mostrar(inicio); return; }
    const frente = inicio > paginaDoAlbum;
    atualizarControles(inicio);
    comecarGiro(frente ? paginaDoAlbum : inicio, frente ? inicio : paginaDoAlbum);
    pintarGiro(frente ? 0 : 1);
    animarGiro(frente ? 1 : 0, 950);
  };
  const virar = (sentido) => {
    terminarGiro();
    const destino = proximo(sentido);
    if (destino !== null) girarPara(destino);
  };

  let arraste = null;
  let arrastouEm = 0;
  folhas.addEventListener('dragstart', (evento) => evento.preventDefault());
  folhas.addEventListener('pointerdown', (evento) => {
    if (evento.button) return;
    terminarGiro();
    arraste = { id: evento.pointerId, x: evento.clientX, y: evento.clientY, ativo: false, ultimoX: evento.clientX, ultimoT: evento.timeStamp, velocidade: 0 };
  });
  folhas.addEventListener('pointermove', (evento) => {
    if (!arraste || evento.pointerId !== arraste.id) return;
    const dx = evento.clientX - arraste.x;
    const dy = evento.clientY - arraste.y;
    if (!arraste.ativo) {
      if (Math.abs(dy) > 14 && Math.abs(dy) > Math.abs(dx)) { arraste = null; return; }
      if (Math.abs(dx) < 10 || Math.abs(dx) < Math.abs(dy) || semMovimento()) return;
      arraste.sentido = dx < 0 ? 1 : -1;
      const destino = proximo(arraste.sentido);
      if (destino === null) { arraste = null; return; }
      arraste.ativo = true;
      arraste.destino = destino;
      if (folhas.setPointerCapture) folhas.setPointerCapture(evento.pointerId);
      comecarGiro(arraste.sentido > 0 ? paginaDoAlbum : destino, arraste.sentido > 0 ? destino : paginaDoAlbum);
    }
    const alcance = giro.largura * (dupla() ? 1.5 : 0.9);
    const avancou = entre(Math.abs(dx) / alcance, 0, 1);
    const certo = arraste.sentido > 0 ? dx < 0 : dx > 0;
    pintarGiro(arraste.sentido > 0 ? (certo ? avancou : 0) : (certo ? 1 - avancou : 1));
    const tempo = Math.max(1, evento.timeStamp - arraste.ultimoT);
    arraste.velocidade = (evento.clientX - arraste.ultimoX) / tempo;
    arraste.ultimoX = evento.clientX;
    arraste.ultimoT = evento.timeStamp;
  });
  const soltar = (evento) => {
    if (!arraste || evento.pointerId !== arraste.id) return;
    const { ativo, sentido, velocidade } = arraste;
    arraste = null;
    if (!ativo || !giro) return;
    arrastouEm = performance.now();
    const feito = sentido > 0 ? giro.p : 1 - giro.p;
    const jogou = sentido > 0 ? velocidade < -0.5 : velocidade > 0.5;
    const completa = evento.type === 'pointerup' && (feito > 0.35 || jogou);
    const alvo = sentido > 0 ? (completa ? 1 : 0) : (completa ? 0 : 1);
    if (completa) atualizarControles(alvo === 1 ? giro.seguinte : giro.anterior);
    animarGiro(alvo, 160 + 620 * Math.abs(alvo - giro.p));
  };
  folhas.addEventListener('pointerup', soltar);
  folhas.addEventListener('pointercancel', soltar);

  livro.addEventListener('click', (evento) => {
    if (performance.now() - arrastouEm < 250) return;
    const alvo = evento.target.closest('[data-abrir-santo], [data-abrir-trilha], [data-ir-pagina], #album-voltar, #album-avancar');
    if (!alvo) return;
    if (alvo.id === 'album-voltar') { virar(-1); return; }
    if (alvo.id === 'album-avancar') { virar(1); return; }
    if (alvo.dataset.irPagina) { girarPara(Number(alvo.dataset.irPagina)); return; }
    fecharJanelaDoCenaculo();
    if (alvo.dataset.abrirSanto) {
      if (typeof showDetail === 'function') showDetail(alvo.dataset.abrirSanto);
      return;
    }
    const trilha = trilhaDoSanto(alvo.dataset.abrirTrilha);
    if (trilha && typeof abrirTrilhas === 'function') abrirTrilhas(trilha.slug);
  });
  if (!teclasDoAlbumLigadas) {
    document.addEventListener('keydown', teclaDoAlbum);
    teclasDoAlbumLigadas = true;
  }
  mostrar(0);
}

function marcarEscolha(lugar, seletor, escolhido) {
  lugar.querySelectorAll(seletor).forEach((botao) => {
    const ativa = botao === escolhido;
    botao.classList.toggle('ativa', ativa);
    botao.setAttribute('aria-pressed', ativa ? 'true' : 'false');
  });
}

function ligarPreferencias(lugar) {
  lugar.querySelectorAll('[data-idioma]').forEach((botao) => botao.addEventListener('click', () => {
    marcarEscolha(lugar, '[data-idioma]', botao);
    if (typeof aplicarIdioma === 'function') aplicarIdioma(botao.dataset.idioma);
  }));
  lugar.querySelectorAll('[data-tamanho]').forEach((botao) => botao.addEventListener('click', () => {
    guardarPreferencia(CHAVE_TAMANHO_DO_TEXTO, botao.dataset.tamanho === 'normal' ? '' : botao.dataset.tamanho);
    aplicarPreferenciasDoAparelho();
    marcarEscolha(lugar, '[data-tamanho]', botao);
  }));
  const chave = lugar.querySelector('#pref-menos-movimento');
  if (chave) chave.addEventListener('change', () => {
    guardarPreferencia(CHAVE_MENOS_MOVIMENTO, chave.checked ? '1' : '');
    aplicarPreferenciasDoAparelho();
  });
}

async function renderizarMeuPerfil() {
  const lugar = document.getElementById('meu-perfil-cabecalho');
  if (!lugar) return;
  const perfil = (typeof membroAtivo !== 'undefined' && membroAtivo) || null;
  const meta = metadadosDaConta();
  const nomeDaConta = meta.nome || meta.full_name || '';
  const nome = perfil ? perfil.nome : (nomeDaConta || 'Minha conta');
  const adulto = !!perfil && perfil.tipo === 'adulto';
  const fundo = fundoPessoal();
  lugar.innerHTML = `
    <div class="perfil-publico meu-perfil">
      <div class="perfil-publico-capa meu-perfil-capa">
        <span class="perfil-publico-foto">${avatarDoCenaculo(perfil ? perfil.avatar : 'adulto-estrela', perfil ? perfil.fotoUrl : '', 'grande')}</span>
        ${perfil ? `<button type="button" class="meu-perfil-camera" id="meu-perfil-foto" aria-label="Trocar a foto do perfil">${iconeDoCenaculo('camera')}</button>` : ''}
      </div>
      <div class="perfil-publico-topo">
        <strong class="perfil-publico-nome" id="meu-perfil-nome" translate="no">${escaparTexto(nome)}</strong>
        <small>${perfil ? (nomeDaConta ? tr(adulto ? 'Perfil de adulto na conta de {nome}' : 'Perfil de criança na conta de {nome}', { nome: escaparTexto(nomeDaConta) }) : tr(adulto ? 'Perfil de adulto' : 'Perfil de criança')) : 'Escolha um perfil para ver as suas estatísticas'}</small>
        <small id="meu-perfil-desde"></small>
        ${adulto ? '<div class="perfil-social" id="meu-perfil-social"></div>' : ''}
      </div>
      <div class="perfil-acoes perfil-acoes-tres">
        ${perfil ? acaoDoMeuPerfil('meu-perfil-editar', 'lapis', 'Editar perfil') : ''}
        ${adulto ? acaoDoMeuPerfil('meu-perfil-codigo', 'qr', 'Meu código') : ''}
        ${acaoDoMeuPerfil('meu-perfil-trocar', 'usuarios', 'Trocar perfil')}
      </div>
      ${perfil ? `
      <section class="perfil-secao">
        <h4 class="perfil-secao-titulo">Estatísticas</h4>
        <div class="perfil-publico-numeros" id="meu-perfil-numeros">
          ${cartaoDeEstatistica('chama', '#ff9600', perfil.ofensiva || 0, (perfil.ofensiva || 0) === 1 ? 'dia seguido' : 'dias seguidos', perfil.melhorOfensiva ? tr('recorde: {n}', { n: perfil.melhorOfensiva }) : '')}
          ${cartaoDeEstatistica('estrela', '#f5b400', perfil.fe || 0, 'Fé no total', '')}
          ${cartaoDeEstatistica('trofeu', '#58cc02', '...', 'Fé nesta semana', '')}
          ${cartaoDeEstatistica('livro', '#1cb0f6', '...', 'lições concluídas', '')}
        </div>
      </section>` : ''}
      ${perfil ? blocoDasInsignias() : ''}
      ${blocoDosMeusSantos()}
      <h3 class="meu-perfil-config-titulo">Configurações</h3>
      ${blocoDasPreferencias()}
      ${perfil ? `
      <section class="perfil-secao">
        <h4 class="perfil-secao-titulo">Aparência</h4>
        <div class="ajustes-lista">
          <button type="button" class="ajuste" id="meu-perfil-enfeites">
            <span class="ajuste-icone">${iconeDoCenaculo('estrela')}</span>
            <span class="ajuste-textos"><strong>Enfeites do perfil</strong><small>Moldura da foto, efeito ao abrir e faixa do nome</small></span>
            ${iconeDoCenaculo('seta-direita')}
          </button>
        </div>
      </section>` : ''}
      ${adulto ? `
      <section class="perfil-secao">
        <h4 class="perfil-secao-titulo">Lembretes</h4>
        <div class="ajustes-lista">
          <button type="button" class="ajuste" id="meu-perfil-lembretes">
            <span class="ajuste-icone">${iconeDoCenaculo('sino')}</span>
            <span class="ajuste-textos"><strong>Notificações</strong><small id="meu-perfil-lembretes-resumo">Hora da Misericórdia e ofensiva</small></span>
            ${iconeDoCenaculo('seta-direita')}
          </button>
        </div>
      </section>` : ''}
      <section class="perfil-secao">
        <h4 class="perfil-secao-titulo">Conversas</h4>
        <div class="ajustes-lista">
          ${adulto ? `<button type="button" class="ajuste" id="meu-perfil-papel">
            <span class="ajuste-icone">${iconeDoCenaculo('paleta')}</span>
            <span class="ajuste-textos"><strong>Papel de parede</strong><small>${fundo ? (fundo.foto ? 'Uma foto sua' : (FUNDOS_DA_CONVERSA.find((f) => f.id === fundo.pronto) || {}).nome || 'Personalizado') : 'O fundo de cada conversa'}</small></span>
            ${iconeDoCenaculo('seta-direita')}
          </button>` : ''}
          <button type="button" class="ajuste" id="meu-perfil-ranking">
            <span class="ajuste-icone">${iconeDoCenaculo('trofeu')}</span>
            <span class="ajuste-textos"><strong>Ranking</strong><small>Veja a sua posição na família e no mundo</small></span>
            ${iconeDoCenaculo('seta-direita')}
          </button>
        </div>
      </section>
      ${adulto ? `
      <section class="perfil-secao">
        <h4 class="perfil-secao-titulo">Ajuda</h4>
        <div class="ajustes-lista">
          <button type="button" class="ajuste" id="meu-perfil-suporte">
            <span class="ajuste-icone">${iconeDoCenaculo('ajuda')}</span>
            <span class="ajuste-textos"><strong>Fale com a equipe</strong><small>Dúvidas, problemas e sugestões</small></span>
            <span class="aviso-suporte" data-aviso-suporte hidden></span>
            ${iconeDoCenaculo('seta-direita')}
          </button>
        </div>
      </section>` : ''}
      ${!perfil || adulto ? `
      <section class="perfil-secao">
        <h4 class="perfil-secao-titulo">Assinatura</h4>
        <div class="ajustes-lista">
          <button type="button" class="ajuste" id="meu-perfil-plano">
            <span class="ajuste-icone">${iconeDoCenaculo('medalha')}</span>
            <span class="ajuste-textos"><strong id="meu-perfil-plano-nome">Seu plano</strong><small id="meu-perfil-plano-resumo">Carregando...</small></span>
            ${iconeDoCenaculo('seta-direita')}
          </button>
        </div>
      </section>` : ''}
    </div>`;

  const ligar = (id, funcao) => {
    const botao = lugar.querySelector(`#${id}`);
    if (botao) botao.addEventListener('click', funcao);
  };
  ligar('meu-perfil-foto', () => { if (typeof abrirEditorDePerfil === 'function') abrirEditorDePerfil(perfil); });
  ligar('meu-perfil-editar', () => { if (typeof abrirEditorDePerfil === 'function') abrirEditorDePerfil(perfil); });
  ligar('meu-perfil-codigo', () => abrirMeuCodigo());
  ligar('meu-perfil-trocar', () => { if (typeof abrirSelecaoDePerfis === 'function') abrirSelecaoDePerfis('inicio'); });
  ligar('meu-perfil-papel', () => abrirEscolhaDeFundo('meu'));
  ligar('meu-perfil-ranking', () => { if (typeof abrirRanking === 'function') abrirRanking(); });
  ligar('meu-perfil-insignias', () => { if (typeof abrirInsignias === 'function') abrirInsignias(); });
  ligar('meu-perfil-plano', () => { if (typeof abrirPlanos === 'function') abrirPlanos(); });
  ligar('meu-perfil-enfeites', () => { if (typeof abrirEnfeitesDoPerfil === 'function') abrirEnfeitesDoPerfil(); });
  ligar('meu-perfil-suporte', () => { if (typeof abrirSuporte === 'function') abrirSuporte(); });
  ligarPreferencias(lugar);
  lugar.querySelectorAll('[data-abrir-santo]').forEach((botao) => botao.addEventListener('click', () => {
    if (typeof showDetail === 'function') showDetail(botao.dataset.abrirSanto);
  }));
  ligar('abrir-album', abrirAlbumDeSantos);
  ligar('abrir-passaporte', abrirPassaporte);
  ligar('abrir-virtude', abrirDesafioDaVirtude);
  const campoDoAniversario = lugar.querySelector('#meu-aniversario');
  if (campoDoAniversario) campoDoAniversario.addEventListener('change', () => {
    const partes = /^\d{4}-(\d{2})-(\d{2})$/.exec(campoDoAniversario.value || '');
    if (!partes) return;
    try { localStorage.setItem(chaveDoAniversario(), `${partes[1]}-${partes[2]}`); } catch (e) {
    }
    renderizarMeuPerfil();
  });
  ligar('trocar-aniversario', () => {
    try { localStorage.removeItem(chaveDoAniversario()); } catch (e) {
    }
    renderizarMeuPerfil();
  });
  if (adulto && typeof atualizarAvisoDoSuporte === 'function') atualizarAvisoDoSuporte();
  if (perfil && typeof enfeitarMeuPerfil === 'function') enfeitarMeuPerfil();
  if (adulto && typeof preencherResumoSocial === 'function') preencherResumoSocial(lugar.querySelector('#meu-perfil-social'), perfil.id);
  ligar('meu-perfil-lembretes', () => { if (typeof abrirAjustesDosLembretes === 'function') abrirAjustesDosLembretes(); });
  if (adulto && typeof atualizarResumoDosLembretes === 'function') atualizarResumoDosLembretes();
  if (lugar.querySelector('#meu-perfil-plano') && typeof carregarAssinaturaSemFalhar === 'function') {
    carregarAssinaturaSemFalhar().then(() => {
      const nomeDoPlano = document.getElementById('meu-perfil-plano-nome');
      const resumo = document.getElementById('meu-perfil-plano-resumo');
      if (nomeDoPlano) nomeDoPlano.textContent = tr('Plano {nome}', { nome: tr(nomeDoPlanoAtual()) });
      if (resumo) resumo.textContent = resumoDoPlanoNoPerfil();
    });
  }

  if (adulto) {
    try {
      const dados = await chamarCenaculo('perfil_publico', { _pid: perfil.id, _alvo: perfil.id });
      const numeros = document.getElementById('meu-perfil-numeros');
      const desde = document.getElementById('meu-perfil-desde');
      if (desde) desde.textContent = desdeQuando(dados.desde);
      if (numeros) {
        const sequencia = Number(dados.sequencia || 0);
        const licoes = Number(dados.licoes || 0);
        numeros.innerHTML = [
          cartaoDeEstatistica('chama', '#ff9600', sequencia, sequencia === 1 ? 'dia seguido' : 'dias seguidos', Number(dados.melhor_sequencia) ? tr('recorde: {n}', { n: Number(dados.melhor_sequencia) }) : ''),
          cartaoDeEstatistica('estrela', '#f5b400', Number(dados.fe || 0), 'Fé no total', ''),
          cartaoDeEstatistica('trofeu', '#58cc02', Number(dados.fe_semana || 0), 'Fé nesta semana', ''),
          cartaoDeEstatistica('livro', '#1cb0f6', licoes, licoes === 1 ? 'lição concluída' : 'lições concluídas', ''),
        ].join('');
      }
    } catch (e) {
      const numeros = document.getElementById('meu-perfil-numeros');
      if (numeros) numeros.querySelectorAll('.perfil-estatistica strong').forEach((s) => { if (s.textContent === '...') s.textContent = '-'; });
    }
  }
}

function previaDaFotoDoGrupo() {
  return fotoDoGrupoUrl
    ? `<span class="avatar avatar-grande"><img src="${escaparTexto(fotoDoGrupoUrl)}" alt=""></span>`
    : `<span class="foto-do-grupo-vazia">${iconeDoCenaculo('usuarios')}</span>`;
}

function novoNomeDeArquivo() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID();
  return '00000000-0000-4000-8000-000000000000'.replace(/0/g, () => Math.floor(Math.random() * 16).toString(16));
}

async function trocarFotoDoGrupo(caminho) {
  const antiga = await chamarCenaculo('cenaculo_mudar_foto', { _pid: perfilAdultoAtivo().id, _cid: cenaculoAberto.id, _caminho: caminho });
  if (antiga && antiga !== caminho) {
    try { await supabaseCliente.storage.from('cenaculo-fotos').remove([antiga]); } catch (e) {  }
  }
  cenaculoAberto.foto = caminho;
}

function abrirFotoDoGrupo() {
  if (!cenaculoAberto || ehConversaADois() || cenaculoAberto.papel !== 'organizador') return;
  const corpo = janelaDoCenaculo('Foto do grupo', `
    <div class="foto-do-grupo">
      <div class="foto-do-grupo-previa" id="foto-do-grupo-previa">${previaDaFotoDoGrupo()}</div>
      <p class="cenaculo-explica">A foto aparece para todos do cenáculo, na lista e no topo da conversa. Use uma imagem adequada para todos.</p>
      <input type="file" id="foto-do-grupo-arquivo" accept="image/*" hidden>
      <button type="button" class="licao-botao" id="foto-do-grupo-escolher">Escolher foto</button>
      ${cenaculoAberto.foto ? '<button type="button" class="perfil-link perfil-link-perigo" id="foto-do-grupo-tirar">Tirar a foto do grupo</button>' : ''}
      <p class="auth-feedback" id="foto-do-grupo-aviso" aria-live="polite"></p>
    </div>`);
  const aviso = corpo.querySelector('#foto-do-grupo-aviso');
  const arquivo = corpo.querySelector('#foto-do-grupo-arquivo');
  corpo.querySelector('#foto-do-grupo-escolher').addEventListener('click', () => arquivo.click());
  arquivo.addEventListener('change', async () => {
    const escolhido = arquivo.files && arquivo.files[0];
    if (!escolhido) return;
    if (!escolhido.type || !escolhido.type.startsWith('image/')) { aviso.textContent = 'Escolha um arquivo de imagem.'; return; }
    aviso.textContent = 'Enviando a foto...';
    try {
      const imagem = await reduzirFoto(escolhido, 512);
      const caminho = `${cenaculoAberto.id}/${novoNomeDeArquivo()}.jpg`;
      const { error } = await supabaseCliente.storage.from('cenaculo-fotos').upload(caminho, imagem, { contentType: 'image/jpeg', upsert: false });
      if (error) throw error;
      await trocarFotoDoGrupo(caminho);
      fotoDoGrupoUrl = URL.createObjectURL(imagem);
      renderizarCabecalhoDaConversa();
      fecharJanelaDoCenaculo();
      avisoDoCenaculo('Foto do grupo atualizada.');
    } catch (erro) {
      aviso.textContent = ERROS_DO_CENACULO.foto_invalida;
    }
  });
  const tirar = corpo.querySelector('#foto-do-grupo-tirar');
  if (tirar) {
    tirar.addEventListener('click', async () => {
      try {
        await trocarFotoDoGrupo(null);
        fotoDoGrupoUrl = '';
        renderizarCabecalhoDaConversa();
        fecharJanelaDoCenaculo();
      } catch (erro) {
        aviso.textContent = mensagemDoCenaculo(erro);
      }
    });
  }
}

function guardarAmigoPendente() {
  let codigo = '';
  try {
    codigo = codigoDeAmigo(`?amigo=${new URLSearchParams(window.location.search).get('amigo') || ''}`);
  } catch (e) {
    return;
  }
  if (!codigo) return;
  try { sessionStorage.setItem(CHAVE_AMIGO_PENDENTE, codigo); } catch (e) {  }
  try {
    const url = new URL(window.location.href);
    url.searchParams.delete('amigo');
    history.replaceState(null, '', url.pathname + (url.search || '') + url.hash);
  } catch (e) {
  }
}

function amigoPendente() {
  try { return sessionStorage.getItem(CHAVE_AMIGO_PENDENTE) || ''; } catch (e) { return ''; }
}

function verificarAmigoPendente() {
  const codigo = amigoPendente();
  if (!codigo) return;
  if (typeof contaLogada !== 'function' || !contaLogada()) {
    avisoDoCenaculo('Alguém mandou o código para conversar com você. Entre na sua conta para continuar.');
    return;
  }
  if (!perfilAdultoAtivo()) return;
  try { sessionStorage.removeItem(CHAVE_AMIGO_PENDENTE); } catch (e) {  }
  if (paginaBloqueadaPelaSuspensao('view-cenaculos')) return;
  mostrarListaDeCenaculos();
  abrirAdicionarPessoa(codigo);
}

function iniciarAmigos() {
  guardarAmigoPendente();
  setTimeout(() => {
    if (amigoPendente() && !(typeof contaLogada === 'function' && contaLogada())) verificarAmigoPendente();
  }, 400);
}

document.addEventListener('DOMContentLoaded', () => {
  if (typeof rodarComSeguranca === 'function') rodarComSeguranca('amigos', iniciarAmigos);
  else iniciarAmigos();
});
