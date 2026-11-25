function trDosAmigos(texto, valores) { return typeof tr === 'function' ? tr(texto, valores) : texto; }

function escaparDosAmigos(texto) {
  return String(texto == null ? '' : texto).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

async function chamarDosAmigos(nome, argumentos) {
  const { data, error } = await supabaseCliente.rpc(nome, argumentos || {});
  if (error) throw error;
  return data;
}

function perfilDosAmigos() { return typeof perfilAdultoAtivo === 'function' ? perfilAdultoAtivo() : null; }

function contatosDoAparelhoDisponiveis() {
  return typeof navigator !== 'undefined' && !!navigator.contacts && typeof navigator.contacts.select === 'function';
}

async function codigoDoEmail(email) {
  const dados = new TextEncoder().encode(String(email || '').trim().toLowerCase());
  const resumo = await crypto.subtle.digest('SHA-256', dados);
  return Array.from(new Uint8Array(resumo)).map((b) => b.toString(16).padStart(2, '0')).join('');
}

const MENSAGENS_DOS_AMIGOS = {
  muitas_buscas: 'Você já procurou muitos contatos hoje. Tente de novo amanhã.',
  somente_adultos: 'Só perfis de adultos podem procurar amigos.',
  usuario_formato: 'Use de 3 a 20 letras minúsculas, números, ponto ou _.',
  usuario_reservado: 'Esse nome é reservado. Escolha outro.',
  usuario_em_uso: 'Esse nome de usuário já está em uso.',
  usuario_mudou_recente: 'Você só pode trocar o nome de usuário uma vez a cada 7 dias.',
};

function mensagemDosAmigos(erro) {
  const texto = String((erro && erro.message) || erro || '');
  const chave = Object.keys(MENSAGENS_DOS_AMIGOS).find((k) => texto.includes(k));
  return trDosAmigos(chave ? MENSAGENS_DOS_AMIGOS[chave] : 'Não deu certo agora. Tente de novo.');
}

function cartaoDoAmigoAchado(p) {
  const avatar = typeof avatarDoAutor === 'function' ? avatarDoAutor(p, 'pequeno') : '';
  return `<div class="amigo-achado" data-perfil="${escaparDosAmigos(p.perfil_id)}">
    ${avatar}
    <span class="amigo-achado-textos"><strong translate="no">${escaparDosAmigos(p.nome)}</strong>${p.usuario ? `<small translate="no">@${escaparDosAmigos(p.usuario)}</small>` : ''}</span>
    <button type="button" class="amigo-seguir${p.eu_sigo ? ' seguindo' : ''}" data-alvo="${escaparDosAmigos(p.perfil_id)}" data-seguindo="${p.eu_sigo ? 'sim' : 'nao'}">${trDosAmigos(p.eu_sigo ? 'Seguindo' : 'Seguir')}</button>
  </div>`;
}

async function mostrarAmigosAchados(lugar, lista, vazio) {
  if (!lugar) return;
  if (!lista || !lista.length) { lugar.innerHTML = `<p class="amigos-vazio">${trDosAmigos(vazio)}</p>`; return; }
  if (typeof carregarFotosDosAutores === 'function') {
    try { await carregarFotosDosAutores(lista.map((p) => ({ autor: p }))); } catch (e) {
    }
  }
  lugar.innerHTML = lista.map(cartaoDoAmigoAchado).join('');
  if (typeof colocarMoldurasDaComunidade === 'function') colocarMoldurasDaComunidade(lugar);
}

async function alternarSeguirAmigo(botao) {
  const perfil = perfilDosAmigos();
  if (!perfil || botao.disabled) return;
  const seguir = botao.dataset.seguindo !== 'sim';
  botao.disabled = true;
  try {
    await chamarDosAmigos('seguir', { _pid: perfil.id, _alvo: botao.dataset.alvo, _seguir: seguir });
    botao.dataset.seguindo = seguir ? 'sim' : 'nao';
    botao.classList.toggle('seguindo', seguir);
    botao.textContent = trDosAmigos(seguir ? 'Seguindo' : 'Seguir');
  } catch (e) {
    if (typeof avisoRapidoDosSantos === 'function') avisoRapidoDosSantos(mensagemDosAmigos(e), 'erro');
  } finally {
    botao.disabled = false;
  }
}

function linkDoConviteDosAmigos() {
  const texto = trDosAmigos('Estou aprendendo sobre a vida dos santos no Lumina Sancti. Vem comigo! {link}', { link: 'https://luminasancti.com' });
  return `https://wa.me/?text=${encodeURIComponent(texto)}`;
}

async function abrirEncontrarAmigos() {
  const perfil = perfilDosAmigos();
  if (!perfil || typeof janelaDoCenaculo !== 'function') return;
  const contatos = contatosDoAparelhoDisponiveis();
  const corpo = janelaDoCenaculo(trDosAmigos('Encontrar amigos'), `
    <div class="amigos-busca">
      <form class="amigos-usuario" id="amigos-usuario-form">
        <span class="amigos-arroba" aria-hidden="true">@</span>
        <input type="search" id="amigos-usuario" placeholder="${escaparDosAmigos(trDosAmigos('nome de usuário'))}" autocomplete="off" autocapitalize="none" spellcheck="false" maxlength="21" aria-label="${escaparDosAmigos(trDosAmigos('Nome de usuário'))}">
        <button type="submit" class="amigos-botao">${trDosAmigos('Buscar')}</button>
      </form>
      <div class="amigos-resultado" id="amigos-resultado-usuario" aria-live="polite"></div>
      ${contatos ? `<button type="button" class="amigos-opcao" id="amigos-contatos"><span class="amigos-opcao-icone">${typeof icone === 'function' ? icone('usuarios') : ''}</span><span><strong>${trDosAmigos('Procurar nos meus contatos')}</strong></span></button>
      <div class="amigos-resultado" id="amigos-resultado-contatos" aria-live="polite"></div>` : ''}
      <a class="amigos-opcao amigos-whatsapp" href="${linkDoConviteDosAmigos()}" target="_blank" rel="noopener noreferrer"><span class="amigos-opcao-icone"><svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path fill="currentColor" d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2c-1.5 0-3-.4-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.3-.4.7-1.4.1-.2 0-.3 0-.4l-.8-1.9c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.9 11.9 0 0 0 4.6 4c1.7.7 2.3.8 3.2.6a2.7 2.7 0 0 0 1.8-1.3 2.2 2.2 0 0 0 .2-1.3c-.1-.1-.3-.2-.5-.3z"/></svg></span><span><strong>${trDosAmigos('Convidar pelo WhatsApp')}</strong></span></a>
      <label class="amigos-chave"><span>${trDosAmigos('Deixar meus amigos me acharem pelo e-mail')}</span><input type="checkbox" id="amigos-encontravel" checked><i></i></label>
    </div>`);
  if (!corpo) return;
  const form = corpo.querySelector('#amigos-usuario-form');
  const resultadoUsuario = corpo.querySelector('#amigos-resultado-usuario');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const valor = corpo.querySelector('#amigos-usuario').value.trim().replace(/^@+/, '');
    if (valor.length < 3) return;
    resultadoUsuario.innerHTML = `<p class="amigos-vazio">${trDosAmigos('Buscando...')}</p>`;
    try {
      const achado = await chamarDosAmigos('buscar_por_usuario', { _pid: perfil.id, _usuario: valor });
      await mostrarAmigosAchados(resultadoUsuario, achado ? [achado] : [], 'Ninguém com esse nome de usuário.');
    } catch (erro) {
      resultadoUsuario.innerHTML = `<p class="amigos-vazio">${escaparDosAmigos(mensagemDosAmigos(erro))}</p>`;
    }
  });
  const botaoContatos = corpo.querySelector('#amigos-contatos');
  if (botaoContatos) botaoContatos.addEventListener('click', async () => {
    const lugar = corpo.querySelector('#amigos-resultado-contatos');
    let escolhidos = [];
    try { escolhidos = await navigator.contacts.select(['name', 'email'], { multiple: true }); } catch (e) {
      return;
    }
    const emails = [...new Set(escolhidos.flatMap((c) => c.email || []).map((x) => String(x).trim().toLowerCase()).filter((x) => x.includes('@')))].slice(0, 300);
    if (!emails.length) { lugar.innerHTML = `<p class="amigos-vazio">${trDosAmigos('Esses contatos não têm e-mail salvo.')}</p>`; return; }
    lugar.innerHTML = `<p class="amigos-vazio">${trDosAmigos('Buscando...')}</p>`;
    try {
      const codigos = await Promise.all(emails.map(codigoDoEmail));
      const achados = await chamarDosAmigos('amigos_pelos_contatos', { _pid: perfil.id, _codigos: codigos });
      await mostrarAmigosAchados(lugar, achados, 'Nenhum desses contatos está no Lumina Sancti ainda. Que tal convidar pelo WhatsApp?');
    } catch (erro) {
      lugar.innerHTML = `<p class="amigos-vazio">${escaparDosAmigos(mensagemDosAmigos(erro))}</p>`;
    }
  });
  corpo.addEventListener('click', (e) => {
    const botao = e.target.closest('.amigo-seguir');
    if (botao) alternarSeguirAmigo(botao);
  });
  const chave = corpo.querySelector('#amigos-encontravel');
  try {
    const meu = await chamarDosAmigos('meu_usuario', { _pid: perfil.id });
    if (meu && meu.encontravel === false) chave.checked = false;
  } catch (e) {
  }
  chave.addEventListener('change', async () => {
    try { await chamarDosAmigos('perfil_mudar_encontravel', { _pid: perfil.id, _sim: chave.checked }); } catch (e) {
      chave.checked = !chave.checked;
    }
  });
}

function normalizarUsuarioDigitado(texto) {
  return String(texto || '').trim().replace(/^@+/, '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9_.]/g, '').slice(0, 20);
}

const MOTIVOS_DO_USUARIO = {
  formato: 'Use de 3 a 20 letras minúsculas, números, ponto ou _, sem começar ou terminar com ponto.',
  reservado: 'Esse nome é reservado. Escolha outro.',
  em_uso: 'Esse nome de usuário já está em uso.',
};

async function abrirNomeDeUsuario(atual, aoSalvar) {
  const perfil = perfilDosAmigos();
  if (!perfil || typeof janelaDoCenaculo !== 'function') return;
  const corpo = janelaDoCenaculo(trDosAmigos('Nome de usuário'), `
    <form class="usuario-form" id="usuario-form">
      <div class="amigos-usuario usuario-campo">
        <span class="amigos-arroba" aria-hidden="true">@</span>
        <input type="text" id="usuario-campo" value="${escaparDosAmigos(atual || '')}" autocomplete="off" autocapitalize="none" spellcheck="false" maxlength="20" aria-label="${escaparDosAmigos(trDosAmigos('Nome de usuário'))}">
      </div>
      <p class="usuario-situacao" id="usuario-situacao" aria-live="polite"></p>
      <p class="usuario-aviso"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></svg><span>${trDosAmigos('Todo mundo pode ver o seu nome de usuário.')}</span></p>
      <button type="submit" class="amigos-botao usuario-salvar" id="usuario-salvar" disabled>${trDosAmigos('Salvar')}</button>
    </form>`);
  if (!corpo) return;
  const campo = corpo.querySelector('#usuario-campo');
  const situacao = corpo.querySelector('#usuario-situacao');
  const salvar = corpo.querySelector('#usuario-salvar');
  let relogio = null;
  let livre = '';
  const conferir = () => {
    const valor = normalizarUsuarioDigitado(campo.value);
    if (campo.value !== valor) campo.value = valor;
    livre = '';
    salvar.disabled = true;
    situacao.className = 'usuario-situacao';
    if (relogio) clearTimeout(relogio);
    if (!valor) { situacao.textContent = ''; return; }
    if (valor === atual) { situacao.textContent = trDosAmigos('Esse já é o seu nome de usuário.'); return; }
    relogio = setTimeout(async () => {
      try {
        const r = await chamarDosAmigos('usuario_disponivel', { _usuario: valor });
        if (normalizarUsuarioDigitado(campo.value) !== valor) return;
        if (r && r.ok) { livre = valor; salvar.disabled = false; situacao.textContent = trDosAmigos('Disponível'); situacao.classList.add('livre'); }
        else { situacao.textContent = trDosAmigos(MOTIVOS_DO_USUARIO[r && r.motivo] || MOTIVOS_DO_USUARIO.formato); situacao.classList.add('ocupado'); }
      } catch (e) {
        situacao.textContent = mensagemDosAmigos(e);
      }
    }, 350);
  };
  campo.addEventListener('input', conferir);
  corpo.querySelector('#usuario-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!livre) return;
    salvar.disabled = true;
    try {
      const salvo = await chamarDosAmigos('perfil_definir_usuario', { _pid: perfil.id, _usuario: livre });
      if (typeof usuarioDoMenuDaConta !== 'undefined') usuarioDoMenuDaConta = { perfil: perfil.id, usuario: salvo };
      if (typeof fecharJanelaDoCenaculo === 'function') fecharJanelaDoCenaculo();
      if (aoSalvar) aoSalvar(salvo);
    } catch (erro) {
      situacao.textContent = mensagemDosAmigos(erro);
      situacao.className = 'usuario-situacao ocupado';
    }
  });
  setTimeout(() => campo.focus(), 60);
}

async function preencherMeuNomeDeUsuario(lugar) {
  const perfil = perfilDosAmigos();
  if (!lugar || !perfil) return;
  let meu = null;
  try { meu = await chamarDosAmigos('meu_usuario', { _pid: perfil.id }); } catch (e) {
    return;
  }
  if (!lugar.isConnected) return;
  const usuario = meu && meu.usuario;
  lugar.innerHTML = usuario
    ? `<button type="button" class="meu-usuario-botao" translate="no">@${escaparDosAmigos(usuario)}</button>`
    : `<button type="button" class="meu-usuario-botao vazio">${typeof icone === 'function' ? icone('mais') : ''}<span>${trDosAmigos('Escolher nome de usuário')}</span></button>`;
  lugar.querySelector('button').addEventListener('click', () => abrirNomeDeUsuario(usuario, () => preencherMeuNomeDeUsuario(lugar)));
}

async function preencherUsuarioPublico(lugar, idDoPerfil) {
  if (!lugar || !idDoPerfil) return;
  try {
    const mapa = await chamarDosAmigos('perfis_usuarios', { _ids: [idDoPerfil] });
    if (mapa && mapa[idDoPerfil] && lugar.isConnected) lugar.textContent = '@' + mapa[idDoPerfil];
  } catch (e) {
  }
}

function preencherUsuariosNaTela() {
  const meu = document.getElementById('meu-usuario');
  if (meu && !meu.dataset.preenchido) { meu.dataset.preenchido = '1'; preencherMeuNomeDeUsuario(meu); }
  const publico = document.getElementById('perfil-publico-usuario');
  if (publico && !publico.dataset.preenchido) {
    publico.dataset.preenchido = '1';
    const nome = publico.previousElementSibling;
    preencherUsuarioPublico(publico, nome && nome.dataset ? nome.dataset.perfil : '');
  }
}

if (typeof document !== 'undefined' && document.addEventListener) {
  document.addEventListener('click', (e) => {
    if (e.target && e.target.closest && e.target.closest('#comunidade-amigos-btn')) abrirEncontrarAmigos();
  });
  const observarUsuarios = () => {
    if (!document.body || typeof MutationObserver === 'undefined') return;
    let agendado = false;
    new MutationObserver(() => {
      if (agendado) return;
      agendado = true;
      setTimeout(() => { agendado = false; preencherUsuariosNaTela(); }, 150);
    }).observe(document.body, { childList: true, subtree: true });
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', observarUsuarios);
  else observarUsuarios();
}
