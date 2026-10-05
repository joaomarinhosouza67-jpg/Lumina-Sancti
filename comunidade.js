const TAMANHO_DA_PAGINA_DA_COMUNIDADE = 30;
const ORDEM_DOS_MARCOS = ['trilha', 'ofensiva', 'perfeitas', 'fe', 'missao'];

let abaDaComunidade = 'seguindo';
let postagensDaComunidade = [];
let carregandoComunidade = false;
let sequenciaDasArtes = 0;
let fotosDaComunidade = {};

function nomeDoSantoDoMarco(slug) {
  const santo = typeof santosData !== 'undefined' ? santosData.find((s) => s.id === slug) : null;
  if (santo && santo.nome) return typeof textoDoSanto === 'function' ? textoDoSanto(santo).nome : santo.nome;
  return String(slug || '').split('-').map((p) => p.charAt(0).toUpperCase() + p.slice(1)).join(' ');
}

function tituloDoMarco(m) {
  const valor = Number(m.valor || 0);
  if (m.tipo === 'ofensiva') return tr('{n} dias de ofensiva', { n: valor });
  if (m.tipo === 'perfeitas') return tr('{n} missões perfeitas', { n: valor });
  if (m.tipo === 'fe') return tr('{n} de Fé', { n: valor });
  if (m.tipo === 'missao') return tr('Missão perfeita na trilha de {santo}', { santo: nomeDoSantoDoMarco(m.santo) });
  return tr('Trilha de {santo}', { santo: nomeDoSantoDoMarco(m.santo) });
}

function fraseDoMarco(m, nome) {
  const quem = escaparTexto(nome);
  const valor = Number(m.valor || 0);
  if (nome === 'Você') {
    const santo = escaparTexto(nomeDoSantoDoMarco(m.santo));
    if (m.tipo === 'ofensiva') return tr('Você chegou a <strong>{n} dias seguidos</strong> estudando a vida dos santos!', { n: valor });
    if (m.tipo === 'perfeitas') return tr('Você completou <strong>{n} missões perfeitas</strong>, sem errar nada!', { n: valor });
    if (m.tipo === 'fe') return tr('Você juntou <strong>{n} de Fé</strong> nas trilhas dos santos!', { n: valor });
    if (m.tipo === 'missao') return tr('Você fez uma <strong>missão perfeita</strong> na trilha de {santo}, sem errar nada!', { santo });
    return tr('Você concluiu a <strong>trilha de {santo}</strong> e ganhou a insígnia!', { santo });
  }
  if (m.tipo === 'ofensiva') return tr('{quem} chegou a <strong>{n} dias seguidos</strong> estudando a vida dos santos!', { quem, n: valor });
  if (m.tipo === 'perfeitas') return tr('{quem} completou <strong>{n} missões perfeitas</strong>, sem errar nada!', { quem, n: valor });
  if (m.tipo === 'fe') return tr('{quem} juntou <strong>{n} de Fé</strong> nas trilhas dos santos!', { quem, n: valor });
  if (m.tipo === 'missao') return tr('{quem} fez uma <strong>missão perfeita</strong> na trilha de {santo}, sem errar nada!', { quem, santo: escaparTexto(nomeDoSantoDoMarco(m.santo)) });
  return tr('{quem} concluiu a <strong>trilha de {santo}</strong> e ganhou a insígnia!', { quem, santo: escaparTexto(nomeDoSantoDoMarco(m.santo)) });
}

function desenhoDoMarco(tipo, m) {
  if (tipo === 'trilha' && m && m.santo && typeof medalhaSvg === 'function') {
    return medalhaSvg({ santoId: m.santo }, { conquistada: true, classe: 'marco-desenho marco-desenho-medalha' });
  }
  if (tipo === 'missao') tipo = 'perfeitas';
  sequenciaDasArtes += 1;
  const g = `marco-${sequenciaDasArtes}`;
  if (tipo === 'ofensiva') {
    return `<svg class="marco-desenho" viewBox="0 0 64 80" aria-hidden="true" focusable="false"><defs><linearGradient id="${g}a" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffc800"/><stop offset="1" stop-color="#ff6a00"/></linearGradient></defs>
      <path class="marco-chama-fora" d="M32 2C36 16 55 26 55 49C55 65 45 77 32 77C19 77 9 65 9 49C9 38 14 31 20 26C20 34 24 39 28 39C26 26 26 14 32 2Z" fill="url(#${g}a)"/>
      <path class="marco-chama-dentro" d="M32 40C35 48 44 52 44 61C44 69 39 75 32 75C25 75 20 69 20 61C20 56 23 52 26 50C27 55 29 57 31 57C30 51 30 45 32 40Z" fill="#ffe26b"/></svg>`;
  }
  if (tipo === 'perfeitas') {
    return `<svg class="marco-desenho" viewBox="0 0 96 64" aria-hidden="true" focusable="false"><defs><linearGradient id="${g}a" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff3a3"/><stop offset="1" stop-color="#f5b400"/></linearGradient></defs>
      ${[[20, 38, 15], [48, 26, 21], [76, 38, 15]].map(([x, y, r]) => `<path d="${caminhoDaEstrelaDoMarco(x, y, r, r * 0.45)}" fill="url(#${g}a)" stroke="#b45309" stroke-width="1.6" stroke-linejoin="round"/>`).join('')}</svg>`;
  }
  if (tipo === 'fe') {
    return `<svg class="marco-desenho" viewBox="0 0 80 80" aria-hidden="true" focusable="false"><defs><radialGradient id="${g}a"><stop offset="0" stop-color="#fffbeb"/><stop offset=".55" stop-color="#fde68a"/><stop offset="1" stop-color="#f59e0b"/></radialGradient></defs>
      <path d="M40 2C42 30 50 38 78 40C50 42 42 50 40 78C38 50 30 42 2 40C30 38 38 30 40 2Z" fill="url(#${g}a)"/>
      <path d="M40 18C41 34 46 39 62 40C46 41 41 46 40 62C39 46 34 41 18 40C34 39 39 34 40 18Z" fill="#fffbeb" opacity=".7" transform="rotate(45 40 40)"/></svg>`;
  }
  return `<svg class="marco-desenho" viewBox="0 0 72 84" aria-hidden="true" focusable="false"><defs><linearGradient id="${g}a" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fde68a"/><stop offset=".5" stop-color="#f59e0b"/><stop offset="1" stop-color="#b45309"/></linearGradient></defs>
    <path d="M22 2H34L40 30H28ZM50 2H38L32 30H44Z" fill="#1cb0f6"/><path d="M28 2H34L40 30H34Z" fill="#0b8fd1"/>
    <circle cx="36" cy="52" r="26" fill="url(#${g}a)" stroke="#92400e" stroke-width="2"/>
    <circle cx="36" cy="52" r="18" fill="none" stroke="#fffbeb" stroke-width="1.6" opacity=".7"/>
    <path d="M36 38V66M26 47H46" stroke="#fffbeb" stroke-width="4" stroke-linecap="round"/></svg>`;
}

function caminhoDaEstrelaDoMarco(cx, cy, externo, interno) {
  let d = '';
  for (let i = 0; i < 10; i += 1) {
    const raio = i % 2 === 0 ? externo : interno;
    const a = -Math.PI / 2 + (i * Math.PI) / 5;
    d += `${i === 0 ? 'M' : 'L'}${(cx + raio * Math.cos(a)).toFixed(1)} ${(cy + raio * Math.sin(a)).toFixed(1)}`;
  }
  return `${d}Z`;
}

function arteDoMarco(m) {
  const valor = Number(m.valor || 0);
  let numero = String(valor);
  let rotulo = '';
  if (m.tipo === 'ofensiva') rotulo = valor === 1 ? 'dia de ofensiva' : 'dias de ofensiva';
  else if (m.tipo === 'perfeitas') rotulo = 'missões perfeitas';
  else if (m.tipo === 'fe') rotulo = 'de Fé';
  else if (m.tipo === 'missao') {
    numero = '';
    rotulo = tr('Missão perfeita · {santo}', { santo: escaparTexto(nomeDoSantoDoMarco(m.santo)) });
  } else {
    numero = '';
    rotulo = tr('Insígnia de {santo}', { santo: escaparTexto(nomeDoSantoDoMarco(m.santo)) });
  }
  return `
    <div class="marco-arte marco-arte-${escaparTexto(m.tipo)}">
      <span class="marco-arte-brilho" aria-hidden="true"></span>
      ${desenhoDoMarco(m.tipo, m)}
      <span class="marco-arte-textos">
        ${numero ? `<strong class="marco-arte-numero">${numero}</strong>` : ''}
        <span class="marco-arte-rotulo">${rotulo}</span>
      </span>
    </div>`;
}

function haQuantoTempo(iso) {
  const data = new Date(iso);
  if (Number.isNaN(data.getTime())) return '';
  const segundos = Math.max(0, Math.round((Date.now() - data.getTime()) / 1000));
  if (segundos < 60) return 'agora';
  const minutos = Math.round(segundos / 60);
  if (minutos < 60) return tr('há {n} min', { n: minutos });
  const horas = Math.round(minutos / 60);
  if (horas < 24) return tr('há {n} h', { n: horas });
  const dias = Math.round(horas / 24);
  if (dias === 1) return 'ontem';
  if (dias < 7) return tr('há {n} dias', { n: dias });
  return data.toLocaleDateString(localDoIdioma(), { day: 'numeric', month: 'short' });
}

function iconeDaComunidade(nome) {
  return typeof icone === 'function' ? icone(nome) : '';
}

function avatarDoAutor(autor, tamanho) {
  const foto = autor.eu ? (perfilAdultoAtivo() || {}).fotoUrl : fotosDaComunidade[autor.foto];
  return `<span class="enfeite-lugar-da-foto marco-autor-foto" data-moldura="${escaparTexto(autor.moldura || '')}">${desenharAvatar(autor.avatar, foto || '', tamanho || 'pequeno')}</span>`;
}

function colocarMoldurasDaComunidade(lugar) {
  if (typeof colocarMoldura !== 'function') return;
  lugar.querySelectorAll('.marco-autor-foto[data-moldura]').forEach((foto) => {
    if (foto.dataset.moldura) colocarMoldura(foto, foto.dataset.moldura);
    foto.removeAttribute('data-moldura');
  });
}

function cartaoDaPostagem(p) {
  const autor = p.autor || {};
  const nome = autor.eu ? 'Você' : (autor.nome || '');
  const minhas = Array.isArray(p.minhas) ? p.minhas : [];
  const reacao = (tipo, rotulo, nomeDoIcone) => {
    const ativa = minhas.includes(tipo);
    const total = Number(p[tipo] || 0);
    return `<button type="button" class="marco-reacao${ativa ? ' ativa' : ''}" data-reacao="${tipo}" aria-pressed="${ativa ? 'true' : 'false'}">${iconeDaComunidade(nomeDoIcone)}<span>${rotulo}</span>${total ? `<small>${total}</small>` : ''}</button>`;
  };
  return `
    <article class="marco-cartao" data-marco="${escaparTexto(p.id)}">
      <header class="marco-cabecalho">
        <button type="button" class="marco-autor" data-perfil="${escaparTexto(autor.perfil_id)}">
          ${avatarDoAutor(autor)}
          <span class="marco-autor-textos"><strong translate="no">${escaparTexto(autor.eu ? (perfilAdultoAtivo() || {}).nome || tr('Você') : autor.nome)}</strong><small>${haQuantoTempo(p.criado_em)}</small></span>
        </button>
        ${p.meu ? `<button type="button" class="icon-btn marco-apagar" aria-label="Apagar esta postagem">${iconeDaComunidade('lixeira')}</button>` : ''}
        ${!p.meu && !autor.eu_sigo ? `<button type="button" class="marco-seguir" data-seguir="${escaparTexto(autor.perfil_id)}">Seguir</button>` : ''}
      </header>
      ${arteDoMarco(p)}
      <p class="marco-frase">${fraseDoMarco(p, nome)}</p>
      <footer class="marco-reacoes">
        ${reacao('amem', 'Amém', 'cruz')}
        ${reacao('parabens', 'Parabéns', 'estrela')}
      </footer>
    </article>`;
}

function mensagemDaComunidade(erro) {
  const texto = String((erro && erro.message) || erro || '');
  if (texto.includes('marco_invalido')) return 'Esse marco ainda não foi conquistado.';
  if (texto.includes('muitos_marcos')) return 'Você já postou muitos marcos hoje. Tente de novo amanhã.';
  if (texto.includes('muitos_seguindo')) return 'Você já seguiu muitas pessoas hoje. Tente de novo amanhã.';
  if (texto.includes('perfil_bloqueado')) return 'Não é possível seguir essa pessoa.';
  if (texto.includes('marco_nao_encontrado')) return 'Essa postagem não existe mais.';
  if (typeof mensagemDoCenaculo === 'function') return mensagemDoCenaculo(erro);
  return 'Não foi possível fazer isso agora. Tente de novo em instantes.';
}

function avisoDaComunidade(texto) {
  if (typeof mostrarAvisoTrilhas === 'function') mostrarAvisoTrilhas(texto);
}

async function chamarComunidade(nome, argumentos) {
  if (typeof chamarCenaculo === 'function') return chamarCenaculo(nome, argumentos);
  const { data, error } = await supabaseCliente.rpc(nome, argumentos || {});
  if (error) throw error;
  return data;
}

function abrirComunidade() {
  if (typeof contaLogada !== 'function' || !contaLogada()) {
    avisoDaComunidade('Entre na sua conta para ver a Comunidade.');
    if (typeof irParaLogin === 'function') irParaLogin();
    return;
  }
  if (typeof modoInfantilAtivo === 'function' && modoInfantilAtivo()) {
    if (typeof paginaSoParaAdultos === 'function') paginaSoParaAdultos('view-comunidade');
    return;
  }
  if (!perfilAdultoAtivo()) {
    if (typeof abrirSelecaoDePerfis === 'function') abrirSelecaoDePerfis('comunidade');
    return;
  }
  if (typeof closeSidebar === 'function') closeSidebar();
  mudarDeView('view-comunidade');
  marcarAbaDaComunidade();
  preencherTopoDaComunidade();
  carregarComunidade(false);
}

function marcarAbaDaComunidade() {
  document.querySelectorAll('.comunidade-aba').forEach((aba) => {
    const ativa = aba.dataset.aba === abaDaComunidade;
    aba.classList.toggle('ativa', ativa);
    aba.setAttribute('aria-selected', ativa ? 'true' : 'false');
  });
}

async function preencherTopoDaComunidade() {
  const lugar = document.getElementById('comunidade-eu');
  const perfil = perfilAdultoAtivo();
  if (!lugar || !perfil) return;
  lugar.innerHTML = `
    ${desenharAvatar(perfil.avatar, perfil.fotoUrl, 'medio')}
    <span class="comunidade-eu-textos">
      <strong>${escaparTexto(perfil.nome)}</strong>
      <span class="perfil-social" id="comunidade-eu-social"><span class="perfil-social-carregando">Carregando...</span></span>
    </span>`;
  await preencherResumoSocial(document.getElementById('comunidade-eu-social'), perfil.id);
}

async function preencherResumoSocial(lugar, alvoId, aoMudar) {
  const perfil = perfilAdultoAtivo();
  if (!lugar || !perfil || !alvoId) return null;
  let resumo;
  try {
    resumo = await chamarComunidade('social_resumo', { _pid: perfil.id, _alvo: alvoId });
  } catch (e) {
    lugar.innerHTML = '';
    return null;
  }
  if (!lugar.isConnected) return resumo;
  const numero = (valor, rotuloUm, rotuloVarios, qual) => {
    const n = Number(valor || 0);
    const texto = `<strong>${n}</strong> ${n === 1 ? rotuloUm : rotuloVarios}`;
    return qual ? `<button type="button" class="perfil-social-numero" data-lista="${qual}">${texto}</button>` : `<span class="perfil-social-numero">${texto}</span>`;
  };
  const botaoSeguir = resumo.eu || resumo.bloqueado ? '' : `<button type="button" class="perfil-social-seguir${resumo.eu_sigo ? ' seguindo' : ''}" data-seguindo="${resumo.eu_sigo ? 'sim' : 'nao'}">${resumo.eu_sigo ? `${iconeDaComunidade('check')}Seguindo` : `${iconeDaComunidade('seguir')}Seguir`}</button>`;
  lugar.innerHTML = `
    <span class="perfil-social-numeros">
      ${numero(resumo.seguidores, 'seguidor', 'seguidores', 'seguidores')}
      ${numero(resumo.seguindo, 'seguindo', 'seguindo', 'seguindo')}
      ${numero(resumo.marcos, 'marco', 'marcos', resumo.marcos ? 'marcos' : '')}
    </span>
    ${resumo.me_segue && !resumo.eu ? '<small class="perfil-social-segue-voce">Segue você</small>' : ''}
    ${botaoSeguir}`;
  lugar.querySelectorAll('[data-lista]').forEach((botao) => {
    botao.addEventListener('click', () => {
      if (botao.dataset.lista === 'marcos') abrirMarcosDaPessoa(alvoId);
      else abrirListaSocial(alvoId, botao.dataset.lista);
    });
  });
  const seguir = lugar.querySelector('.perfil-social-seguir');
  if (seguir) {
    seguir.addEventListener('click', async () => {
      seguir.disabled = true;
      try {
        await chamarComunidade('seguir', { _pid: perfil.id, _alvo: alvoId, _seguir: seguir.dataset.seguindo !== 'sim' });
        await preencherResumoSocial(lugar, alvoId, aoMudar);
        if (aoMudar) aoMudar();
      } catch (erro) {
        seguir.disabled = false;
        avisoDaComunidade(mensagemDaComunidade(erro));
      }
    });
  }
  return resumo;
}

async function carregarFotosDosAutores(lista) {
  const caminhos = lista.map((p) => p.autor && p.autor.foto).filter((c) => c && !fotosDaComunidade[c]);
  if (!caminhos.length || typeof enderecosAssinados !== 'function') return;
  Object.assign(fotosDaComunidade, await enderecosAssinados('avatars', caminhos));
}

async function carregarComunidade(maisAntigas) {
  const lista = document.getElementById('comunidade-lista');
  const mais = document.getElementById('comunidade-mais');
  const perfil = perfilAdultoAtivo();
  if (!lista || !perfil || carregandoComunidade) return;
  carregandoComunidade = true;
  if (!maisAntigas) {
    postagensDaComunidade = [];
    lista.innerHTML = '<p class="perfis-carregando">Carregando...</p>';
  }
  if (mais) mais.hidden = true;
  const antes = maisAntigas && postagensDaComunidade.length ? postagensDaComunidade[postagensDaComunidade.length - 1].criado_em : null;
  const aba = abaDaComunidade;
  try {
    const novas = (await chamarComunidade('comunidade', { _pid: perfil.id, _aba: aba, _antes: antes, _autor: null })) || [];
    await carregarFotosDosAutores(novas);
    if (aba !== abaDaComunidade) return;
    postagensDaComunidade = postagensDaComunidade.concat(novas);
    renderizarComunidade();
    if (mais) mais.hidden = novas.length < TAMANHO_DA_PAGINA_DA_COMUNIDADE;
  } catch (erro) {
    if (!maisAntigas) lista.innerHTML = `<p class="not-found-msg">${escaparTexto(mensagemDaComunidade(erro))}</p>`;
    else avisoDaComunidade(mensagemDaComunidade(erro));
  } finally {
    carregandoComunidade = false;
  }
}

function renderizarComunidade() {
  const lista = document.getElementById('comunidade-lista');
  if (!lista) return;
  if (!postagensDaComunidade.length) {
    lista.innerHTML = abaDaComunidade === 'seguindo'
      ? `<div class="comunidade-vazia">
          <span class="comunidade-vazia-icone">${iconeDaComunidade('usuarios')}</span>
          <h3>Siga outras pessoas</h3>
          <p>Aqui aparecem os marcos de quem você segue. Na aba Global, toque no nome de alguém para ver o perfil e seguir.</p>
          <button type="button" class="licao-botao" id="comunidade-ir-global">Ver a aba Global</button>
        </div>`
      : `<div class="comunidade-vazia">
          <span class="comunidade-vazia-icone">${iconeDaComunidade('estrela')}</span>
          <h3>Ninguém postou ainda</h3>
          <p>Complete missões nas trilhas e compartilhe o seu primeiro marco com todo mundo.</p>
          <button type="button" class="licao-botao" id="comunidade-vazia-postar">Compartilhar um marco</button>
        </div>`;
    const irGlobal = document.getElementById('comunidade-ir-global');
    if (irGlobal) irGlobal.addEventListener('click', () => trocarAbaDaComunidade('global'));
    const postar = document.getElementById('comunidade-vazia-postar');
    if (postar) postar.addEventListener('click', abrirCompartilharMarco);
    return;
  }
  lista.innerHTML = postagensDaComunidade.map(cartaoDaPostagem).join('');
  ligarCartoesDaComunidade(lista, postagensDaComunidade, () => renderizarComunidade());
}

function ligarCartoesDaComunidade(lugar, postagens, redesenhar) {
  const perfil = perfilAdultoAtivo();
  colocarMoldurasDaComunidade(lugar);
  lugar.querySelectorAll('.marco-cartao').forEach((cartao) => {
    const postagem = postagens.find((p) => String(p.id) === cartao.dataset.marco);
    if (!postagem) return;
    const autor = cartao.querySelector('.marco-autor');
    if (autor) autor.addEventListener('click', () => { if (typeof abrirPerfilPublico === 'function') abrirPerfilPublico(autor.dataset.perfil); });
    const seguir = cartao.querySelector('.marco-seguir');
    if (seguir) {
      seguir.addEventListener('click', async () => {
        seguir.disabled = true;
        try {
          await chamarComunidade('seguir', { _pid: perfil.id, _alvo: seguir.dataset.seguir, _seguir: true });
          postagens.forEach((p) => { if (p.autor && p.autor.perfil_id === seguir.dataset.seguir) p.autor.eu_sigo = true; });
          avisoDaComunidade(tr('Agora você segue {nome}.', { nome: postagem.autor.nome }));
          redesenhar();
          preencherTopoDaComunidade();
        } catch (erro) {
          seguir.disabled = false;
          avisoDaComunidade(mensagemDaComunidade(erro));
        }
      });
    }
    cartao.querySelectorAll('.marco-reacao').forEach((botao) => {
      botao.addEventListener('click', async () => {
        const tipo = botao.dataset.reacao;
        const ligar = !(postagem.minhas || []).includes(tipo);
        botao.disabled = true;
        try {
          const r = await chamarComunidade('reagir_marco', { _pid: perfil.id, _id: postagem.id, _tipo: tipo, _ligar: ligar });
          Object.assign(postagem, { amem: r.amem, parabens: r.parabens, minhas: r.minhas || [] });
          redesenhar();
        } catch (erro) {
          botao.disabled = false;
          avisoDaComunidade(mensagemDaComunidade(erro));
        }
      });
    });
    const apagar = cartao.querySelector('.marco-apagar');
    if (apagar) apagar.addEventListener('click', () => confirmarApagarMarco(postagem, postagens, redesenhar));
  });
}

function confirmarApagarMarco(postagem, postagens, redesenhar) {
  const perfil = perfilAdultoAtivo();
  const corpo = janelaDoCenaculo('Apagar postagem', `
    <p class="cenaculo-explica">${tr('Apagar "{titulo}" da Comunidade? As reações também somem.', { titulo: escaparTexto(tituloDoMarco(postagem)) })}</p>
    <div class="marco-convite-botoes">
      <button type="button" class="licao-botao marco-botao-perigo" id="marco-apagar-sim">Apagar</button>
      <button type="button" class="marco-convite-nao" id="marco-apagar-nao">Cancelar</button>
    </div>`);
  corpo.querySelector('#marco-apagar-nao').addEventListener('click', fecharJanelaDoCenaculo);
  corpo.querySelector('#marco-apagar-sim').addEventListener('click', async (evento) => {
    evento.currentTarget.disabled = true;
    try {
      await chamarComunidade('apagar_marco', { _pid: perfil.id, _id: postagem.id });
      const indice = postagens.indexOf(postagem);
      if (indice >= 0) postagens.splice(indice, 1);
      fecharJanelaDoCenaculo();
      avisoDaComunidade('Postagem apagada.');
      redesenhar();
      preencherTopoDaComunidade();
    } catch (erro) {
      evento.currentTarget.disabled = false;
      avisoDaComunidade(mensagemDaComunidade(erro));
    }
  });
}

function trocarAbaDaComunidade(aba) {
  if (aba === abaDaComunidade && postagensDaComunidade.length) return;
  abaDaComunidade = aba;
  marcarAbaDaComunidade();
  carregandoComunidade = false;
  carregarComunidade(false);
}

async function abrirListaSocial(alvoId, qual) {
  const perfil = perfilAdultoAtivo();
  if (!perfil) return;
  const corpo = janelaDoCenaculo(qual === 'seguidores' ? 'Seguidores' : 'Seguindo', '<p class="perfis-carregando">Carregando...</p>');
  try {
    const pessoas = (await chamarComunidade('social_lista', { _pid: perfil.id, _alvo: alvoId, _qual: qual, _antes: null })) || [];
    await carregarFotosDosAutores(pessoas.map((autor) => ({ autor })));
    if (!pessoas.length) {
      corpo.innerHTML = `<p class="painel-vazio">${qual === 'seguidores' ? 'Ninguém segue este perfil ainda.' : 'Este perfil ainda não segue ninguém.'}</p>`;
      return;
    }
    corpo.innerHTML = `<div class="social-lista">${pessoas.map((p) => `
      <div class="social-linha">
        <button type="button" class="marco-autor" data-perfil="${escaparTexto(p.perfil_id)}">
          ${avatarDoAutor(p)}
          <span class="marco-autor-textos"><strong translate="no">${escaparTexto(p.eu ? tr('Você') : p.nome)}</strong></span>
        </button>
        ${p.eu ? '' : `<button type="button" class="perfil-social-seguir${p.eu_sigo ? ' seguindo' : ''}" data-alvo="${escaparTexto(p.perfil_id)}" data-seguindo="${p.eu_sigo ? 'sim' : 'nao'}">${p.eu_sigo ? 'Seguindo' : 'Seguir'}</button>`}
      </div>`).join('')}</div>`;
    colocarMoldurasDaComunidade(corpo);
    corpo.querySelectorAll('.marco-autor').forEach((botao) => {
      botao.addEventListener('click', () => { if (typeof abrirPerfilPublico === 'function') abrirPerfilPublico(botao.dataset.perfil); });
    });
    corpo.querySelectorAll('.perfil-social-seguir[data-alvo]').forEach((botao) => {
      botao.addEventListener('click', async () => {
        const seguir = botao.dataset.seguindo !== 'sim';
        botao.disabled = true;
        try {
          await chamarComunidade('seguir', { _pid: perfil.id, _alvo: botao.dataset.alvo, _seguir: seguir });
          botao.dataset.seguindo = seguir ? 'sim' : 'nao';
          botao.classList.toggle('seguindo', seguir);
          botao.textContent = seguir ? 'Seguindo' : 'Seguir';
          preencherTopoDaComunidade();
        } catch (erro) {
          avisoDaComunidade(mensagemDaComunidade(erro));
        }
        botao.disabled = false;
      });
    });
  } catch (erro) {
    corpo.innerHTML = `<p class="not-found-msg">${escaparTexto(mensagemDaComunidade(erro))}</p>`;
  }
}

async function abrirMarcosDaPessoa(alvoId) {
  const perfil = perfilAdultoAtivo();
  if (!perfil) return;
  const corpo = janelaDoCenaculo('Marcos', '<p class="perfis-carregando">Carregando...</p>');
  try {
    const postagens = (await chamarComunidade('comunidade', { _pid: perfil.id, _aba: 'global', _antes: null, _autor: alvoId })) || [];
    await carregarFotosDosAutores(postagens);
    const desenhar = () => {
      corpo.innerHTML = postagens.length
        ? `<div class="comunidade-lista comunidade-lista-janela">${postagens.map(cartaoDaPostagem).join('')}</div>`
        : '<p class="painel-vazio">Nenhum marco postado ainda.</p>';
      ligarCartoesDaComunidade(corpo, postagens, desenhar);
    };
    desenhar();
  } catch (erro) {
    corpo.innerHTML = `<p class="not-found-msg">${escaparTexto(mensagemDaComunidade(erro))}</p>`;
  }
}

async function abrirCompartilharMarco() {
  const perfil = perfilAdultoAtivo();
  if (!perfil) return;
  const corpo = janelaDoCenaculo('Compartilhar um marco', '<p class="perfis-carregando">Carregando os seus marcos...</p>');
  try {
    const dados = await chamarComunidade('marcos_do_perfil', { _pid: perfil.id });
    const marcos = ordenarMarcos(dados.marcos || []);
    if (!marcos.length) {
      corpo.innerHTML = `
        <div class="comunidade-vazia">
          <span class="comunidade-vazia-icone">${iconeDaComunidade('trilha')}</span>
          <h3>Você ainda não tem marcos</h3>
          <p>Eles aparecem quando você completa 3 missões sem errar, chega a 7 dias de ofensiva, junta 100 de Fé ou conclui uma trilha inteira.</p>
        </div>`;
      return;
    }
    corpo.innerHTML = `
      <p class="cenaculo-explica">Escolha o que você quer mostrar para a Comunidade.</p>
      <div class="marcos-escolha">${marcos.map((m) => `
        <div class="marco-escolha">
          ${arteDoMarco(m)}
          <button type="button" class="licao-botao marco-escolha-botao" data-chave="${escaparTexto(m.chave)}"${m.postado ? ' disabled' : ''}>${m.postado ? 'Já postado' : 'Postar'}</button>
        </div>`).join('')}</div>`;
    corpo.querySelectorAll('.marco-escolha-botao:not([disabled])').forEach((botao) => {
      botao.addEventListener('click', async () => {
        botao.disabled = true;
        botao.textContent = 'Postando...';
        try {
          await chamarComunidade('postar_marco', { _pid: perfil.id, _chave: botao.dataset.chave });
          botao.textContent = 'Já postado';
          avisoDaComunidade('Marco postado na Comunidade!');
          aposPostarMarco();
        } catch (erro) {
          botao.disabled = false;
          botao.textContent = 'Postar';
          avisoDaComunidade(mensagemDaComunidade(erro));
        }
      });
    });
  } catch (erro) {
    corpo.innerHTML = `<p class="not-found-msg">${escaparTexto(mensagemDaComunidade(erro))}</p>`;
  }
}

function aposPostarMarco() {
  const ativa = document.querySelector('.view.active');
  if (ativa && ativa.id === 'view-comunidade') {
    preencherTopoDaComunidade();
    carregarComunidade(false);
  }
}

function ordenarMarcos(marcos) {
  return marcos.slice().sort((a, b) => ORDEM_DOS_MARCOS.indexOf(a.tipo) - ORDEM_DOS_MARCOS.indexOf(b.tipo));
}

function marcoAcabouDeChegar(m, info, dados) {
  const r = info.resultado || {};
  const antes = info.antes || {};
  if (m.tipo === 'ofensiva') return Number(r.streak) === Number(m.valor) && Number(antes.ofensiva || 0) < Number(m.valor);
  if (m.tipo === 'perfeitas') return Number(r.correct) === Number(r.total) && Number(dados.perfeitas) === Number(m.valor);
  if (m.tipo === 'fe') return Number(antes.fe || 0) < Number(m.valor) && Number(r.faith_total) >= Number(m.valor);
  if (m.tipo === 'trilha') return !!info.insigniaNova && !!info.trilha && info.trilha.slug === m.santo;
  return false;
}

async function verificarNovoMarco(info) {
  const perfil = perfilAdultoAtivo();
  if (!perfil || !info || !info.resultado || typeof contaLogada !== 'function' || !contaLogada()) return false;
  let dados;
  try {
    dados = await chamarComunidade('marcos_do_perfil', { _pid: perfil.id });
  } catch (e) {
    return false;
  }
  const novos = ordenarMarcos((dados.marcos || []).filter((m) => !m.postado && marcoAcabouDeChegar(m, info, dados)));
  if (!novos.length) return false;
  setTimeout(() => convidarParaPostar(novos[0]), 1100);
  return true;
}

function convidarParaPostar(m) {
  const perfil = perfilAdultoAtivo();
  if (!perfil || typeof janelaDoCenaculo !== 'function') return;
  const corpo = janelaDoCenaculo('Novo marco!', `
    <div class="marco-convite">
      ${arteDoMarco(m)}
      <p class="marco-frase">${fraseDoMarco(m, 'Você')}</p>
      <p class="cenaculo-explica">Você deseja postar esse novo marco na Comunidade? Quem segue você vai ver.</p>
      <div class="marco-convite-botoes">
        <button type="button" class="licao-botao" id="marco-convite-sim">Sim, postar</button>
        <button type="button" class="marco-convite-nao" id="marco-convite-nao">Não, obrigado</button>
      </div>
    </div>`);
  corpo.querySelector('#marco-convite-nao').addEventListener('click', fecharJanelaDoCenaculo);
  corpo.querySelector('#marco-convite-sim').addEventListener('click', async (evento) => {
    const botao = evento.currentTarget;
    botao.disabled = true;
    botao.textContent = 'Postando...';
    try {
      await chamarComunidade('postar_marco', { _pid: perfil.id, _chave: m.chave });
      fecharJanelaDoCenaculo();
      avisoDaComunidade('Marco postado na Comunidade!');
      aposPostarMarco();
    } catch (erro) {
      botao.disabled = false;
      botao.textContent = 'Sim, postar';
      avisoDaComunidade(mensagemDaComunidade(erro));
    }
  });
}

function oferecerCompartilharMissaoPerfeita(info) {
  if (!info || !info.trilha || typeof janelaDoCenaculo !== 'function') return;
  const { trilha, licao, chave } = info;
  const traduzir = typeof tt === 'function' ? tt : (k) => k;
  const perfil = perfilAdultoAtivo();
  const podePostar = !!(chave && perfil && typeof contaLogada === 'function' && contaLogada());
  const cores = typeof variaveisDeCorDaTrilha === 'function' ? variaveisDeCorDaTrilha(trilha) : '';
  const estrelas = [0, 1, 2].map((i) => `<svg class="perfeita-estrela perfeita-estrela-${i}" viewBox="0 0 24 24" aria-hidden="true"><path d="${caminhoDaEstrelaDoMarco(12, 12.6, 11.5, 5.2)}"/></svg>`).join('');
  const corpo = janelaDoCenaculo(traduzir('perfeita_titulo'), `
    <div class="perfeita-convite" style="${cores}">
      <div class="perfeita-arte" aria-hidden="true"><span class="perfeita-raios"></span>${estrelas}</div>
      <h3>${traduzir('perfeita_titulo')}</h3>
      <p class="perfeita-onde">${licao ? `${licao.titulo} · ` : ''}${trilha.titulo}</p>
      <p class="perfeita-texto">${traduzir('perfeita_texto')}</p>
      <div class="perfeita-botoes">
        ${podePostar ? `<button type="button" class="licao-botao perfeita-postar" id="perfeita-postar">${iconeDaComunidade('comunidade')}<span>${traduzir('perfeita_postar')}</span></button>` : ''}
        <button type="button" class="perfeita-enviar" id="perfeita-enviar">${iconeDaComunidade('enviar')}<span>${traduzir('perfeita_enviar')}</span></button>
        <button type="button" class="marco-convite-nao" id="perfeita-nao">${traduzir('perfeita_agora_nao')}</button>
      </div>
    </div>`);
  corpo.querySelector('#perfeita-nao').addEventListener('click', fecharJanelaDoCenaculo);
  const postar = corpo.querySelector('#perfeita-postar');
  if (postar) {
    postar.addEventListener('click', async () => {
      postar.disabled = true;
      try {
        await chamarComunidade('postar_marco', { _pid: perfil.id, _chave: chave });
        fecharJanelaDoCenaculo();
        avisoDaComunidade(traduzir('perfeita_postado'));
        aposPostarMarco();
      } catch (erro) {
        postar.disabled = false;
        avisoDaComunidade(mensagemDaComunidade(erro));
      }
    });
  }
  corpo.querySelector('#perfeita-enviar').addEventListener('click', async () => {
    const mensagem = `${traduzir('perfeita_mensagem', { santo: trilha.santo })} https://luminasancti.com`;
    if (navigator.share) {
      try {
        await navigator.share({ title: 'Lumina Sancti', text: mensagem });
        fecharJanelaDoCenaculo();
        return;
      } catch (erro) {
        if (erro && erro.name === 'AbortError') return;
      }
    }
    try {
      await navigator.clipboard.writeText(mensagem);
      avisoDaComunidade(traduzir('perfeita_copiado'));
    } catch (erro) {
      window.open(`https://wa.me/?text=${encodeURIComponent(mensagem)}`, '_blank', 'noopener');
    }
  });
}

function mensagemDoPedido(erro) {
  const texto = String((erro && erro.message) || erro || '');
  if (texto.includes('muitos_pedidos')) return 'Você já fez muitos pedidos hoje. Tente de novo amanhã.';
  if (texto.includes('pedido_recusado_recente')) return 'Essa pessoa recusou o seu pedido há pouco tempo. Tente de novo daqui a alguns dias.';
  if (texto.includes('pedido_nao_encontrado')) return 'Esse pedido não existe mais.';
  return mensagemDaComunidade(erro);
}

async function preencherAcoesDeConversa(lugar, alvoId, resumo, aoMudar) {
  const perfil = perfilAdultoAtivo();
  if (!lugar || !perfil || !resumo || resumo.eu || resumo.contato || resumo.familia || resumo.bloqueado) {
    if (lugar) lugar.innerHTML = '';
    return;
  }
  const nome = escaparTexto(lugar.dataset.nome || 'essa pessoa');
  if (resumo.pedido_recebido) {
    lugar.innerHTML = `
      <p class="pedido-aviso">${tr('{nome} pediu para conversar com você.', { nome })}</p>
      <div class="pedido-botoes">
        <button type="button" class="perfil-social-seguir" data-pedido="aceitar">${iconeDaComunidade('check')}Aceitar</button>
        <button type="button" class="pedido-recusar" data-pedido="recusar">Recusar</button>
      </div>`;
  } else if (resumo.pedido_enviado) {
    lugar.innerHTML = `
      <p class="pedido-aviso">${tr('Pedido enviado. Quando {nome} aceitar, a conversa aparece nos seus Cenáculos.', { nome })}</p>
      <div class="pedido-botoes"><button type="button" class="pedido-recusar" data-pedido="cancelar">Cancelar pedido</button></div>`;
  } else {
    lugar.innerHTML = `
      <div class="pedido-botoes"><button type="button" class="perfil-acao pedido-pedir" data-pedido="pedir">${iconeDaComunidade('conversa')}<span>Pedir para conversar</span></button></div>
      <p class="pedido-explica">${tr('{nome} recebe o seu pedido e escolhe se aceita. Se vocês já se conhecem, também dá para usar o código pessoal.', { nome })}</p>`;
  }
  lugar.querySelectorAll('[data-pedido]').forEach((botao) => {
    botao.addEventListener('click', async () => {
      const acao = botao.dataset.pedido;
      botao.disabled = true;
      try {
        if (acao === 'pedir') {
          if (typeof garantirAceite === 'function' && !(await garantirAceite())) { botao.disabled = false; return; }
          const r = await chamarComunidade('pedir_conversa', { _pid: perfil.id, _alvo: alvoId });
          avisoDaComunidade(r && r.estado === 'contato' ? 'Vocês agora podem conversar!' : 'Pedido enviado.');
        } else if (acao === 'cancelar') {
          await chamarComunidade('cancelar_pedido_conversa', { _pid: perfil.id, _alvo: alvoId });
          avisoDaComunidade('Pedido cancelado.');
        } else {
          await chamarComunidade('responder_pedido_conversa', { _pid: perfil.id, _id: resumo.pedido_recebido, _aceitar: acao === 'aceitar' });
          avisoDaComunidade(acao === 'aceitar' ? 'Pedido aceito. Agora vocês podem conversar!' : 'Pedido recusado.');
          atualizarSelosDePedidos();
        }
        if (aoMudar) aoMudar();
      } catch (erro) {
        botao.disabled = false;
        avisoDaComunidade(mensagemDoPedido(erro));
      }
    });
  });
}

let pedidosRecebidos = [];

async function carregarPedidosRecebidos() {
  const perfil = perfilAdultoAtivo();
  if (!perfil || typeof contaLogada !== 'function' || !contaLogada()) {
    pedidosRecebidos = [];
    return pedidosRecebidos;
  }
  try {
    pedidosRecebidos = (await chamarComunidade('pedidos_recebidos', { _pid: perfil.id })) || [];
  } catch (e) {
    pedidosRecebidos = [];
  }
  return pedidosRecebidos;
}

function atualizarSelosDePedidos() {
  const total = pedidosRecebidos.length;
  document.querySelectorAll('#barra-app [data-destino="cenaculos"], #nav-cenaculos').forEach((botao) => {
    let selo = botao.querySelector('.selo-de-pedidos');
    if (!total) {
      if (selo) selo.remove();
      return;
    }
    if (!selo) {
      selo = document.createElement('span');
      selo.className = 'selo-de-pedidos';
      botao.appendChild(selo);
    }
    selo.textContent = total > 9 ? '9+' : String(total);
  });
}

async function mostrarPedidosNosCenaculos() {
  const lugar = document.getElementById('cenaculos-pedidos');
  await carregarPedidosRecebidos();
  atualizarSelosDePedidos();
  if (!lugar) return;
  if (!pedidosRecebidos.length) {
    lugar.innerHTML = '';
    lugar.hidden = true;
    return;
  }
  await carregarFotosDosAutores(pedidosRecebidos.map((autor) => ({ autor })));
  lugar.hidden = false;
  lugar.innerHTML = `
    <p class="pedidos-titulo">${iconeDaComunidade('seguir')}Pedidos para conversar <small>${pedidosRecebidos.length}</small></p>
    ${pedidosRecebidos.map((p) => `
      <div class="pedido-linha" data-pedido-id="${escaparTexto(p.pedido_id)}">
        <button type="button" class="marco-autor" data-perfil="${escaparTexto(p.perfil_id)}">
          ${avatarDoAutor(p)}
          <span class="marco-autor-textos"><strong translate="no">${escaparTexto(p.nome)}</strong><small>${tr('quer conversar com você · {quando}', { quando: haQuantoTempo(p.criado_em) })}</small></span>
        </button>
        <span class="pedido-botoes">
          <button type="button" class="perfil-social-seguir" data-resposta="sim">Aceitar</button>
          <button type="button" class="pedido-recusar" data-resposta="nao">Recusar</button>
        </span>
      </div>`).join('')}`;
  colocarMoldurasDaComunidade(lugar);
  lugar.querySelectorAll('.marco-autor').forEach((botao) => {
    botao.addEventListener('click', () => { if (typeof abrirPerfilPublico === 'function') abrirPerfilPublico(botao.dataset.perfil); });
  });
  lugar.querySelectorAll('[data-resposta]').forEach((botao) => {
    botao.addEventListener('click', async () => {
      const linha = botao.closest('.pedido-linha');
      const perfil = perfilAdultoAtivo();
      const aceitar = botao.dataset.resposta === 'sim';
      linha.querySelectorAll('button').forEach((b) => { b.disabled = true; });
      try {
        if (aceitar && typeof garantirAceite === 'function' && !(await garantirAceite())) {
          linha.querySelectorAll('button').forEach((b) => { b.disabled = false; });
          return;
        }
        await chamarComunidade('responder_pedido_conversa', { _pid: perfil.id, _id: Number(linha.dataset.pedidoId), _aceitar: aceitar });
        avisoDaComunidade(aceitar ? 'Pedido aceito. A conversa já está na sua lista.' : 'Pedido recusado.');
        await mostrarPedidosNosCenaculos();
        if (aceitar && typeof carregarListaDeCenaculos === 'function') carregarListaDeCenaculos();
      } catch (erro) {
        linha.querySelectorAll('button').forEach((b) => { b.disabled = false; });
        avisoDaComunidade(mensagemDoPedido(erro));
      }
    });
  });
}

function iniciarComunidade() {
  document.querySelectorAll('.comunidade-aba').forEach((aba) => {
    aba.addEventListener('click', () => trocarAbaDaComunidade(aba.dataset.aba));
  });
  const ligar = (id, funcao) => {
    const elemento = document.getElementById(id);
    if (elemento) elemento.addEventListener('click', funcao);
  };
  ligar('comunidade-postar-btn', abrirCompartilharMarco);
  ligar('comunidade-mais', () => carregarComunidade(true));
  ligar('nav-comunidade', abrirComunidade);
}

document.addEventListener('DOMContentLoaded', () => {
  if (typeof rodarComSeguranca === 'function') rodarComSeguranca('comunidade', iniciarComunidade);
  else iniciarComunidade();
});
