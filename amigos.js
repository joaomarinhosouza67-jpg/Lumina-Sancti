const CHAVE_AMIGO_PENDENTE = 'lumina-sancti-amigo-pendente';
const BIBLIOTECA_DO_QR = {
  endereco: 'https://cdn.jsdelivr.net/npm/qrcode-generator@1.4.4/qrcode.js',
  integridade: 'sha384-8FWZA6BGMXhsfO+BLtrJK0We6gg5o1JyO8xQm6peWDEUs17ACA5ziE/NIAkl9z2k',
};
const REGEX_CODIGO_PESSOAL = /^[A-HJ-NP-Z2-9]{8}$/;
let bibliotecaDoQrPronta = null;

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
        pontos += `<circle cx="${c + margem + 0.5}" cy="${l + margem + 0.5}" r="0.44"/>`;
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

async function abrirMeuCodigo() {
  const perfil = perfilAdultoAtivo();
  if (!perfil || !(await garantirAceite())) return;
  const corpo = janelaDoCenaculo('Meu código', '<p class="perfis-carregando">Carregando...</p>');
  try {
    const codigo = await chamarCenaculo('amigo_meu_codigo', { _pid: perfil.id });
    mostrarCartaoDoCodigo(corpo, codigo);
  } catch (erro) {
    corpo.innerHTML = `<p class="not-found-msg">${mensagemDoCenaculo(erro)}</p>`;
  }
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
      <p class="cenaculo-explica">Quem apontar a câmera do celular para este QR Code, ou colar o seu código em "Nova conversa", já pode conversar com você. Mande só para quem você conhece.</p>
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
      const novo = await chamarCenaculo('amigo_novo_codigo', { _pid: perfil.id });
      mostrarCartaoDoCodigo(corpo, novo);
      corpo.querySelector('#meu-codigo-aviso').textContent = 'Pronto! Agora só o código novo funciona.';
    } catch (erro) {
      aviso.textContent = mensagemDoCenaculo(erro);
    }
  });
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
    <button type="button" class="perfil-link" id="amigo-ver-meu-codigo">Mostrar o meu código e o meu QR Code</button>`);
  const aviso = corpo.querySelector('#amigo-codigo-aviso');
  const campo = corpo.querySelector('#amigo-codigo-campo');
  corpo.querySelector('#amigo-ver-meu-codigo').addEventListener('click', abrirMeuCodigo);

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
  if (diferenca > 0) return `Você tem <strong>${diferenca}</strong> de Fé a mais que ${nome}.`;
  if (diferenca < 0) return `Faltam <strong>${-diferenca}</strong> de Fé para você alcançar ${nome}.`;
  return `Você e ${nome} estão empatados em Fé.`;
}

function barrasDaComparacao(dados) {
  const minha = Math.max(0, Number(dados.minha_fe || 0));
  const dela = Math.max(0, Number(dados.fe || 0));
  const maior = Math.max(minha, dela, 1);
  const barra = (rotulo, valor, classe) => `
    <div class="perfil-publico-barra ${classe}">
      <span class="perfil-publico-barra-nome">${rotulo}</span>
      <span class="perfil-publico-barra-trilho"><span style="width:${Math.max(4, Math.round((valor / maior) * 100))}%"></span></span>
      <span class="perfil-publico-barra-valor">${valor}</span>
    </div>`;
  return barra('Você', minha, 'eu') + barra(escaparTexto(primeiroNome(dados.nome)), dela, 'outro');
}

function desdeQuando(iso) {
  if (!iso) return '';
  const data = new Date(iso);
  if (Number.isNaN(data.getTime())) return '';
  return `No Lumina Sancti desde ${data.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}`;
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
    if (titulo) titulo.textContent = dados.eu ? 'Seu perfil' : 'Perfil';
    const sequencia = Number(dados.sequencia || 0);
    let rodape = '';
    if (dados.eu) rodape = '<p class="cenaculo-explica perfil-publico-nota">Este é o seu perfil, do jeito que os outros veem.</p>';
    else if (dados.contato) rodape = '<button type="button" class="licao-botao" id="perfil-publico-conversar">Conversar</button>';
    else rodape = `<p class="cenaculo-explica perfil-publico-nota">Para conversar com ${escaparTexto(primeiroNome(dados.nome))}, peça o código pessoal a essa pessoa e cole em "Nova conversa", nos Cenáculos.</p>`;
    corpo.innerHTML = `
      <div class="perfil-publico">
        <div class="perfil-publico-topo">
          ${avatarDoCenaculo(dados.avatar, foto, 'grande')}
          <strong class="perfil-publico-nome">${escaparTexto(dados.nome)}</strong>
          <small>${desdeQuando(dados.desde)}</small>
        </div>
        <div class="perfil-publico-numeros">
          <div><strong>${Number(dados.fe || 0)}</strong><small>Fé no total</small></div>
          <div><strong>${Number(dados.fe_semana || 0)}</strong><small>Fé nesta semana</small></div>
          <div><strong>${sequencia}</strong><small>${sequencia === 1 ? 'dia seguido' : 'dias seguidos'}</small></div>
          <div><strong>${Number(dados.licoes || 0)}</strong><small>${Number(dados.licoes) === 1 ? 'lição concluída' : 'lições concluídas'}</small></div>
        </div>
        ${dados.eu ? '' : `
        <div class="perfil-publico-comparacao">
          <p>${frasesDaComparacao(dados)}</p>
          ${barrasDaComparacao(dados)}
        </div>`}
        ${rodape}
      </div>`;
    const conversar = corpo.querySelector('#perfil-publico-conversar');
    if (conversar) {
      conversar.addEventListener('click', async () => {
        conversar.disabled = true;
        try {
          const idDaConversa = await chamarCenaculo('conversa_abrir', { _pid: perfil.id, _contato: dados.perfil_id });
          fecharJanelaDoCenaculo();
          abrirConversa(idDaConversa);
        } catch (erro) {
          conversar.disabled = false;
          avisoDoCenaculo(mensagemDoCenaculo(erro));
        }
      });
    }
  } catch (erro) {
    corpo.innerHTML = `<p class="not-found-msg">${mensagemDoCenaculo(erro)}</p>`;
  }
}

function abrirEscolhaDeFundo() {
  if (!cenaculoAberto) return;
  const atual = cenaculoAberto.fundo || 'padrao';
  const corpo = janelaDoCenaculo('Fundo da conversa', `
    <p class="cenaculo-explica">${ehConversaADois() ? 'O fundo muda para vocês dois.' : 'O fundo muda para todos do cenáculo.'}</p>
    <div class="fundo-opcoes">
      ${FUNDOS_DA_CONVERSA.map((f) => `
        <button type="button" class="fundo-opcao${f.id === atual ? ' escolhido' : ''}" data-fundo="${f.id}">
          <span class="fundo-amostra fundo-${f.id}"></span>
          <span class="fundo-opcao-nome">${f.nome}</span>
        </button>`).join('')}
    </div>
    <p class="auth-feedback" id="fundo-aviso" aria-live="polite"></p>`);
  corpo.querySelectorAll('.fundo-opcao').forEach((botao) => {
    botao.addEventListener('click', async () => {
      const fundo = botao.dataset.fundo;
      try {
        await chamarCenaculo('cenaculo_mudar_fundo', { _pid: perfilAdultoAtivo().id, _cid: cenaculoAberto.id, _fundo: fundo });
        cenaculoAberto.fundo = fundo;
        aplicarFundo(fundo);
        fecharJanelaDoCenaculo();
      } catch (erro) {
        corpo.querySelector('#fundo-aviso').textContent = mensagemDoCenaculo(erro);
      }
    });
  });
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
  mudarDeView('view-cenaculos');
  carregarListaDeCenaculos();
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
