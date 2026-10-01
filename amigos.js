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
    const texto = `Converse comigo no Lumina Sancti. Meu código: ${formatarCodigoPessoal(codigo)}`;
    if (navigator.share) {
      navigator.share({ title: 'Lumina Sancti', text: texto, url: link }).catch(() => {});
      return;
    }
    aviso.textContent = (await copiarTexto(`${texto}\n${link}`)) ? 'Link copiado!' : 'Não foi possível copiar.';
  });
  corpo.querySelector('#meu-codigo-novo').addEventListener('click', async () => {
    if (!window.confirm('Gerar um código novo? Quem tiver o código antigo não vai mais conseguir adicionar você. As conversas que você já tem continuam.')) return;
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
  if (diferenca > 0) return `Você tem <strong>${diferenca}</strong> de Fé a mais que ${nome}. Continue assim!`;
  if (diferenca < 0) return `Faltam <strong>${-diferenca}</strong> de Fé para você alcançar ${nome}.`;
  return `Você e ${nome} estão empatados em Fé.`;
}

function desdeQuando(iso) {
  if (!iso) return '';
  const data = new Date(iso);
  if (Number.isNaN(data.getTime())) return '';
  return `No Lumina Sancti desde ${data.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}`;
}

function cartaoDeEstatistica(icone, cor, valor, rotulo, detalhe) {
  return `
    <div class="perfil-estatistica" style="--cor-da-estatistica:${cor}">
      <span class="perfil-estatistica-icone">${iconeDoCenaculo(icone)}</span>
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
      <h4 class="perfil-secao-titulo">Você x ${escaparTexto(primeiroNome(dados.nome))}</h4>
      <div class="perfil-duelo">
        ${lado(avatarDoCenaculo(perfil.avatar, perfil.fotoUrl, 'pequeno'), 'Você', minha, 'eu')}
        <span class="perfil-duelo-x">x</span>
        ${lado(avatarDoCenaculo(dados.avatar, fotoDoOutro, 'pequeno'), escaparTexto(primeiroNome(dados.nome)), dela, 'outro')}
      </div>
      <p class="perfil-duelo-frase">${frasesDaComparacao(dados)}</p>
    </section>`;
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
        <button type="button" class="perfil-acao" id="perfil-publico-conversar">${iconeDoCenaculo('conversa')}<span>Conversar</span></button>
        <button type="button" class="perfil-acao" id="perfil-publico-audio">${iconeDoCenaculo('microfone')}<span>Áudio</span></button>
      </div>`;
  }
  return `<p class="cenaculo-explica perfil-publico-nota">Para conversar com ${nome}, peça o código pessoal a essa pessoa, ou escaneie o QR Code dela em "Nova conversa".</p>`;
}

function rodapeDoPerfil(dados) {
  if (dados.eu || !cenaculoAberto || !membroDoCenaculo(dados.perfil_id)) return '';
  const bloqueado = (cenaculoAberto.bloqueados || []).includes(dados.perfil_id);
  const nome = escaparTexto(primeiroNome(dados.nome));
  return `
    <div class="perfil-perigo">
      <button type="button" class="perfil-perigo-botao" id="perfil-publico-bloquear" data-bloqueado="${bloqueado ? 'sim' : 'nao'}">${iconeDoCenaculo('escudo')}<span>${bloqueado ? `Desbloquear ${nome}` : `Bloquear ${nome}`}</span></button>
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
            ${sequencia >= 3 ? `<span class="perfil-selo fogo">${iconeDoCenaculo('chama')} ${sequencia} dias seguidos</span>` : ''}
            ${licoes >= 10 ? `<span class="perfil-selo estudioso">${iconeDoCenaculo('livro')} ${licoes} lições</span>` : ''}
          </div>
        </div>
        ${acoesDoPerfil(dados)}
        <section class="perfil-secao">
          <h4 class="perfil-secao-titulo">Estatísticas</h4>
          <div class="perfil-publico-numeros">
            ${cartaoDeEstatistica('chama', '#ff9600', sequencia, sequencia === 1 ? 'dia seguido' : 'dias seguidos', recorde > 0 ? `recorde: ${recorde}` : '')}
            ${cartaoDeEstatistica('estrela', '#f5b400', Number(dados.fe || 0), 'Fé no total', '')}
            ${cartaoDeEstatistica('trofeu', '#58cc02', Number(dados.fe_semana || 0), 'Fé nesta semana', '')}
            ${cartaoDeEstatistica('livro', '#1cb0f6', licoes, licoes === 1 ? 'lição concluída' : 'lições concluídas', '')}
          </div>
        </section>
        ${dados.eu ? '' : blocoDaComparacao(dados, foto)}
        ${rodapeDoPerfil(dados)}
      </div>`;
    if (typeof aplicarEnfeitesNoCartao === 'function') aplicarEnfeitesNoCartao(corpo.querySelector('.perfil-publico'), dados.enfeites);
    if (typeof preencherResumoSocial === 'function') preencherResumoSocial(corpo.querySelector('#perfil-publico-social'), dados.perfil_id);
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
      <p class="meu-perfil-insignias-resumo">${conquistadas.length} de ${trilhas.length} insígnias conquistadas</p>
    </section>`;
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
        <strong class="perfil-publico-nome" id="meu-perfil-nome">${escaparTexto(nome)}</strong>
        <small>${perfil ? `Perfil de ${adulto ? 'adulto' : 'criança'}${nomeDaConta ? ` na conta de ${escaparTexto(nomeDaConta)}` : ''}` : 'Escolha um perfil para ver as suas estatísticas'}</small>
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
          ${cartaoDeEstatistica('chama', '#ff9600', perfil.ofensiva || 0, (perfil.ofensiva || 0) === 1 ? 'dia seguido' : 'dias seguidos', perfil.melhorOfensiva ? `recorde: ${perfil.melhorOfensiva}` : '')}
          ${cartaoDeEstatistica('estrela', '#f5b400', perfil.fe || 0, 'Fé no total', '')}
          ${cartaoDeEstatistica('trofeu', '#58cc02', '...', 'Fé nesta semana', '')}
          ${cartaoDeEstatistica('livro', '#1cb0f6', '...', 'lições concluídas', '')}
        </div>
      </section>` : ''}
      ${perfil ? blocoDasInsignias() : ''}
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
  if (perfil && typeof enfeitarMeuPerfil === 'function') enfeitarMeuPerfil();
  if (adulto && typeof preencherResumoSocial === 'function') preencherResumoSocial(lugar.querySelector('#meu-perfil-social'), perfil.id);
  ligar('meu-perfil-lembretes', () => { if (typeof abrirAjustesDosLembretes === 'function') abrirAjustesDosLembretes(); });
  if (adulto && typeof atualizarResumoDosLembretes === 'function') atualizarResumoDosLembretes();
  if (lugar.querySelector('#meu-perfil-plano') && typeof carregarAssinaturaSemFalhar === 'function') {
    carregarAssinaturaSemFalhar().then(() => {
      const nomeDoPlano = document.getElementById('meu-perfil-plano-nome');
      const resumo = document.getElementById('meu-perfil-plano-resumo');
      if (nomeDoPlano) nomeDoPlano.textContent = `Plano ${nomeDoPlanoAtual()}`;
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
          cartaoDeEstatistica('chama', '#ff9600', sequencia, sequencia === 1 ? 'dia seguido' : 'dias seguidos', Number(dados.melhor_sequencia) ? `recorde: ${Number(dados.melhor_sequencia)}` : ''),
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
