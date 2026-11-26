const TEXTOS_DO_APP_NOVO = {
  pt: { procure: 'Procure santos, orações, trilhas e festas', aTerco: 'Terço', aTercoSub: 'Rezar com guia', aLeitura: 'Leitura do dia', aLeituraSub: 'Evangelho de hoje', aCursos: 'Cursos', aCursosSub: 'Aprenda a fé', aNovenas: 'Novenas', aNovenasSub: 'Nove dias de oração', aDormir: 'Histórias para dormir', aDormirSub: 'Um santo antes de dormir', aLuminaSub: 'Tire suas dúvidas sobre a fé', trocar: 'Trocar de perfil', adicionar: 'Adicionar', verPerfil: 'Ver perfil', entrar: 'Entrar', entrarSub: 'Entre ou crie sua conta', hoje: 'Hoje', rezar: 'Para rezar e aprender', todos: 'Todos os santos', recentes: 'Pesquisas recentes:', recomendados: 'Recomendados', santos: 'Santos', oracoes: 'Orações', trilhas: 'Trilhas', padroeiros: 'Padroeiros', doutores: 'Doutores da Igreja', jovens: 'Santos jovens', festas: 'Festas do mês', maisProcurados: 'Mais procurados', ajuda: 'Em que posso te ajudar hoje?', musica: 'Música', salvos: 'Salvos', santo: 'Santo', oracao: 'Oração', trilha: 'Trilha', falar: 'Pesquisar falando', semFestas: 'Nenhuma festa neste mês.' },
  en: { procure: 'Search saints, prayers, trails and feasts', aTerco: 'Rosary', aTercoSub: 'Pray with a guide', aLeitura: 'Daily reading', aLeituraSub: 'Today’s Gospel', aCursos: 'Courses', aCursosSub: 'Learn the faith', aNovenas: 'Novenas', aNovenasSub: 'Nine days of prayer', aDormir: 'Bedtime stories', aDormirSub: 'A saint before sleep', aLuminaSub: 'Ask about the faith', trocar: 'Switch profile', adicionar: 'Add', verPerfil: 'View profile', entrar: 'Sign in', entrarSub: 'Sign in or create your account', hoje: 'Today', rezar: 'Pray and learn', todos: 'All saints', recentes: 'Recent searches:', recomendados: 'Recommended', santos: 'Saints', oracoes: 'Prayers', trilhas: 'Trails', padroeiros: 'Patrons', doutores: 'Doctors of the Church', jovens: 'Young saints', festas: 'Feasts this month', maisProcurados: 'Most searched', ajuda: 'How can I help you today?', musica: 'Music', salvos: 'Saved', santo: 'Saint', oracao: 'Prayer', trilha: 'Trail', falar: 'Search by voice', semFestas: 'No feasts this month.' },
  es: { procure: 'Busca santos, oraciones, senderos y fiestas', aTerco: 'Rosario', aTercoSub: 'Rezar con guía', aLeitura: 'Lectura del día', aLeituraSub: 'Evangelio de hoy', aCursos: 'Cursos', aCursosSub: 'Aprende la fe', aNovenas: 'Novenas', aNovenasSub: 'Nueve días de oración', aDormir: 'Historias para dormir', aDormirSub: 'Un santo antes de dormir', aLuminaSub: 'Resuelve tus dudas de fe', trocar: 'Cambiar de perfil', adicionar: 'Añadir', verPerfil: 'Ver perfil', entrar: 'Entrar', entrarSub: 'Entra o crea tu cuenta', hoje: 'Hoy', rezar: 'Para rezar y aprender', todos: 'Todos los santos', recentes: 'Búsquedas recientes:', recomendados: 'Recomendados', santos: 'Santos', oracoes: 'Oraciones', trilhas: 'Senderos', padroeiros: 'Patronos', doutores: 'Doctores de la Iglesia', jovens: 'Santos jóvenes', festas: 'Fiestas del mes', maisProcurados: 'Más buscados', ajuda: '¿En qué puedo ayudarte hoy?', musica: 'Música', salvos: 'Guardados', santo: 'Santo', oracao: 'Oración', trilha: 'Sendero', falar: 'Buscar por voz', semFestas: 'No hay fiestas este mes.' },
};

const ICONES_DO_APP_NOVO = {
  musica: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>',
  salvos: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" aria-hidden="true"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>',
  salvoCheio: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>',
  estrela: '<svg viewBox="0 0 100 100" aria-hidden="true"><path fill="#f3d27a" d="M50 0 C52 35 65 48 100 50 C65 52 52 65 50 100 C48 65 35 52 0 50 C35 48 48 35 50 0 Z"/></svg>',
  mais: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>',
  seta: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg>',
  microfone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/></svg>',
  relogio: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
  livro: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" aria-hidden="true"><path d="M2 5h7a3 3 0 0 1 3 3v12a2.5 2.5 0 0 0-2.5-2.5H2zM22 5h-7a3 3 0 0 0-3 3v12a2.5 2.5 0 0 1 2.5-2.5H22z"/></svg>',
  trilha: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" aria-hidden="true"><circle cx="6" cy="6" r="3"/><circle cx="18" cy="18" r="3"/><path d="M9 6h6a3 3 0 0 1 0 6H9a3 3 0 0 0 0 6h6"/></svg>',
};

const ESTRELA_DA_MARCA = '<svg class="nav-marca-estrela" viewBox="0 0 100 100" aria-hidden="true"><defs><radialGradient id="marca-nova-ouro" cx="50%" cy="50%" r="55%"><stop offset="0" stop-color="#fffbe8"/><stop offset=".3" stop-color="#f8e19a"/><stop offset=".72" stop-color="#dcae45"/><stop offset="1" stop-color="#9a6a1c"/></radialGradient><radialGradient id="marca-nova-brilho"><stop offset="0" stop-color="#fffef5"/><stop offset=".45" stop-color="#ffe9a8" stop-opacity=".5"/><stop offset="1" stop-color="#ffd76a" stop-opacity="0"/></radialGradient></defs><circle cx="50" cy="50" r="34" fill="url(#marca-nova-brilho)" opacity=".5"/><g transform="rotate(45 50 50)" opacity=".65"><path d="M50 15 C52 38 62 48 85 50 C62 52 52 62 50 85 C48 62 38 52 15 50 C38 48 48 38 50 15 Z" fill="url(#marca-nova-ouro)"/></g><path d="M50 0 C52 35 65 48 100 50 C65 52 52 65 50 100 C48 65 35 52 0 50 C35 48 48 35 50 0 Z" fill="url(#marca-nova-ouro)"/><path d="M50 50 L50 0 C52 35 65 48 100 50 Z M50 50 L50 100 C48 65 35 52 0 50 Z" fill="#6e4710" opacity=".26"/><circle cx="50" cy="50" r="5" fill="#fffef5"/></svg>';

function textoDoAppNovo(chave) {
  const idioma = typeof idiomaAtual !== 'undefined' && TEXTOS_DO_APP_NOVO[idiomaAtual] ? idiomaAtual : 'pt';
  return TEXTOS_DO_APP_NOVO[idioma][chave] || TEXTOS_DO_APP_NOVO.pt[chave] || chave;
}

function escaparDoAppNovo(texto) {
  return String(texto == null ? '' : texto).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

function avatarEstrela(classe) {
  return `<span class="avatar-estrela${classe ? ` ${classe}` : ''}">${ICONES_DO_APP_NOVO.estrela}</span>`;
}

function pinturaDoAppNovo(id, grande) {
  if (typeof PINTURAS_GUARDADAS !== 'undefined' && PINTURAS_GUARDADAS.has(id)) return grande ? `santos/grande/${id}.webp` : `santos/${id}.webp`;
  return typeof enderecoDaFotoDoSanto === 'function' ? enderecoDaFotoDoSanto(id, grande) || '' : '';
}

function irParaInicioDoAppNovo() {
  const botao = document.querySelector('.barra-app-botao[data-destino="inicio"]') || document.getElementById('nav-inicio');
  if (botao) botao.click();
}

function ligarCabecalhoNovo() {
  const marca = document.querySelector('#navbar .nav-brand');
  if (marca && !marca.querySelector('.nav-marca-estrela')) {
    marca.insertAdjacentHTML('afterbegin', ESTRELA_DA_MARCA);
    marca.setAttribute('role', 'link');
    marca.tabIndex = 0;
    marca.addEventListener('click', irParaInicioDoAppNovo);
    marca.addEventListener('keydown', (e) => { if (e.key === 'Enter') irParaInicioDoAppNovo(); });
  }
  const busca = document.getElementById('search-btn');
  if (busca && !document.getElementById('salvos-btn')) {
    busca.insertAdjacentHTML('afterend', `<button id="musica-topo-btn" class="icon-btn" type="button" aria-label="${escaparDoAppNovo(textoDoAppNovo('musica'))}">${ICONES_DO_APP_NOVO.musica}<span class="ondas" aria-hidden="true"><i></i><i></i><i></i></span></button><button id="salvos-btn" class="icon-btn" type="button" aria-label="${escaparDoAppNovo(textoDoAppNovo('salvos'))}">${ICONES_DO_APP_NOVO.salvos}<span class="salvos-numero" hidden></span></button>`);
    document.getElementById('musica-topo-btn').addEventListener('click', alternarMusicaDoTopo);
    document.getElementById('salvos-btn').addEventListener('click', abrirSalvos);
  }
  const conta = document.getElementById('conta-btn');
  if (conta && !conta.querySelector('.avatar-estrela')) conta.innerHTML = avatarEstrela();
}

const barraDoAppNovo = { casa: null, depois: null };
function posicionarBarraDoAppNovo() {
  const barra = document.getElementById('barra-app');
  const container = document.querySelector('#navbar .nav-container');
  const acoes = container ? container.querySelector('.nav-right-actions') : null;
  if (!barra || !container || !acoes) return;
  if (!barraDoAppNovo.casa) { barraDoAppNovo.casa = barra.parentNode; barraDoAppNovo.depois = barra.nextSibling; }
  const larga = window.matchMedia && window.matchMedia('(min-width: 1100px)').matches;
  if (larga && barra.parentNode !== container) container.insertBefore(barra, acoes);
  if (!larga && barra.parentNode === container) barraDoAppNovo.casa.insertBefore(barra, barraDoAppNovo.depois);
}

function ligarGavetaNova() {
  const titulo = document.querySelector('#sidebar .sidebar-titulo h2');
  if (titulo) { titulo.removeAttribute('data-i18n'); titulo.textContent = 'Lumina Sancti'; titulo.setAttribute('translate', 'no'); }
  return;
  const lateral = document.getElementById('sidebar');
  if (!lateral || document.getElementById('gaveta-conta') || lateral.querySelector('.sidebar-perfil, .menu-perfil, [class*="sidebar-conta"]')) return;
  if (lateral.textContent.includes('Trocar perfil')) return;
  const botao = document.createElement('button');
  botao.type = 'button';
  botao.id = 'gaveta-conta';
  botao.className = 'gaveta-conta';
  botao.addEventListener('click', () => {
    const logada = typeof contaLogada === 'function' ? contaLogada() : false;
    const alvo = document.getElementById(logada ? 'conta-menu-perfil' : 'conta-menu-entrar');
    if (typeof closeSidebar === 'function') closeSidebar();
    if (alvo) alvo.click();
  });
  lateral.appendChild(botao);
  atualizarGavetaNova();
  const abrir = document.getElementById('menu-btn');
  if (abrir) abrir.addEventListener('click', atualizarGavetaNova);
}

function atualizarGavetaNova() {
  const botao = document.getElementById('gaveta-conta');
  if (!botao) return;
  const membro = typeof membroAtivo !== 'undefined' && membroAtivo ? membroAtivo : null;
  const logada = typeof contaLogada === 'function' ? contaLogada() : false;
  const nome = logada && membro ? membro.nome : textoDoAppNovo('entrar');
  const sub = logada && membro ? textoDoAppNovo('verPerfil') : textoDoAppNovo('entrarSub');
  botao.innerHTML = `${avatarEstrela()}<span><b translate="no">${escaparDoAppNovo(nome)}</b><small>${escaparDoAppNovo(sub)}</small></span>${ICONES_DO_APP_NOVO.seta}`;
}

let carregandoPerfisDoMenu = false;
function montarGradeDePerfis() {
  const menu = document.getElementById('conta-menu');
  if (!menu) return;
  const velho = menu.querySelector('.conta-perfis-bloco');
  if (velho) velho.remove();
  menu.classList.remove('tem-grade');
  const cabeca = document.getElementById('conta-menu-cabeca');
  if (cabeca && !cabeca.hidden && !cabeca.querySelector('.avatar-estrela')) {
    cabeca.insertAdjacentHTML('afterbegin', avatarEstrela('grande'));
    const ver = document.createElement('button');
    ver.type = 'button';
    ver.className = 'conta-ver-perfil';
    ver.textContent = textoDoAppNovo('verPerfil');
    ver.addEventListener('click', (e) => { e.stopPropagation(); const p = document.getElementById('conta-menu-perfil'); if (p) p.click(); });
    cabeca.appendChild(ver);
  }
  const logada = typeof contaLogada === 'function' ? contaLogada() : false;
  const infantil = typeof modoInfantilAtivo === 'function' ? modoInfantilAtivo() : document.body.classList.contains('modo-kids');
  if (!logada || infantil || typeof membrosDaConta === 'undefined') return;
  if (!membrosDaConta.length) {
    if (!carregandoPerfisDoMenu && typeof carregarMembrosDaConta === 'function') {
      carregandoPerfisDoMenu = true;
      Promise.resolve(carregarMembrosDaConta()).then(() => { carregandoPerfisDoMenu = false; if (menu.classList.contains('aberto')) montarGradeDePerfis(); }, () => { carregandoPerfisDoMenu = false; });
    }
    return;
  }
  const atual = typeof membroAtivo !== 'undefined' && membroAtivo ? membroAtivo.id : null;
  const itens = membrosDaConta.map((m) => `<button type="button" class="conta-perfil-item${m.id === atual ? ' atual' : ''}" data-perfil-menu="${escaparDoAppNovo(m.id)}">${avatarEstrela()}<span translate="no">${escaparDoAppNovo(m.nome)}</span></button>`);
  const limite = typeof limiteDePerfis === 'function' ? limiteDePerfis() : 0;
  if (membrosDaConta.length < limite) itens.push(`<button type="button" class="conta-perfil-item" data-perfil-menu="novo">${avatarEstrela('mais').replace(ICONES_DO_APP_NOVO.estrela, ICONES_DO_APP_NOVO.mais)}<span>${escaparDoAppNovo(textoDoAppNovo('adicionar'))}</span></button>`);
  const bloco = document.createElement('div');
  bloco.className = 'conta-perfis-bloco';
  bloco.innerHTML = `<span class="conta-perfis-titulo">${escaparDoAppNovo(textoDoAppNovo('trocar')).toUpperCase()}</span><div class="conta-perfis-grade">${itens.join('')}</div>`;
  bloco.addEventListener('click', (e) => {
    const item = e.target.closest('[data-perfil-menu]');
    if (!item) return;
    e.stopPropagation();
    menu.classList.remove('aberto');
    const id = item.dataset.perfilMenu;
    if (id === 'novo') { if (typeof abrirEditorDePerfil === 'function') abrirEditorDePerfil(null); return; }
    if (id === atual) return;
    const membro = membrosDaConta.find((m) => m.id === id);
    if (!membro) return;
    if (typeof perfilGuardadoPeloPlano === 'function' && perfilGuardadoPeloPlano(membro)) { if (typeof avisarPerfilSemPlano === 'function') avisarPerfilSemPlano(membro); return; }
    try { destinoAposEscolherPerfil = 'inicio'; } catch (erro) { }
    const seguir = () => escolherPerfil(membro);
    if (typeof perfilTrancado === 'function' && perfilTrancado(membro) && typeof abrirPortao === 'function') {
      abrirPortao({ modo: 'entrar', alvo: membro.id, textos: typeof textosDoPinDoPerfil === 'function' ? textosDoPinDoPerfil(membro.nome) : undefined, aoConcluir: seguir });
    } else seguir();
  });
  if (cabeca && !cabeca.hidden) cabeca.after(bloco); else menu.prepend(bloco);
  menu.classList.add('tem-grade');
}

function musicaNoSiteLigada() {
  try { return localStorage.getItem('lumina-sancti-musica-no-site') === '1'; } catch (e) { return false; }
}

function atualizarBotaoDaMusicaDoTopo() {
  const botao = document.getElementById('musica-topo-btn');
  if (!botao || typeof musicaDosJogos === 'undefined') return;
  const tocando = !!musicaDosJogos.tocando;
  botao.classList.toggle('tocando', tocando);
  const faixa = tocando && musicaDosJogos.faixa ? musicaDosJogos.faixa.nome || '' : '';
  botao.title = faixa ? `${textoDoAppNovo('musica')}: ${faixa}` : textoDoAppNovo('musica');
}

function alternarMusicaDoTopo() {
  if (typeof musicaDosJogos === 'undefined' || typeof tocarMusicaDosJogos !== 'function') return;
  if (musicaDosJogos.tocando) {
    try { localStorage.setItem('lumina-sancti-musica-no-site', '0'); } catch (e) { }
    pararMusicaDosJogos();
  } else {
    try { localStorage.setItem('lumina-sancti-musica-no-site', '1'); } catch (e) { }
    if (typeof salvarPreferenciasDaMusicaDosJogos === 'function') salvarPreferenciasDaMusicaDosJogos({ ligada: true });
    musicaDosJogos.ativa = true;
    tocarMusicaDosJogos();
  }
  atualizarBotaoDaMusicaDoTopo();
}

function ligarMusicaDoTopo() {
  if (typeof atualizarMusicaDosJogos !== 'function' || typeof musicaDosJogos === 'undefined') return;
  const original = atualizarMusicaDosJogos;
  atualizarMusicaDosJogos = function atualizarMusicaComOSite(idDaView) {
    if (idDaView !== 'view-jogos' && musicaNoSiteLigada() && musicaDosJogos.tocando) {
      musicaDosJogos.ativa = true;
      const botao = document.getElementById('musica-jogos-botao');
      if (botao) botao.hidden = true;
      if (typeof fecharPainelDaMusicaDosJogos === 'function') fecharPainelDaMusicaDosJogos();
      atualizarBotaoDaMusicaDoTopo();
      return undefined;
    }
    const resultado = original.apply(this, arguments);
    atualizarBotaoDaMusicaDoTopo();
    return resultado;
  };
  ['tocarMusicaDosJogos', 'pararMusicaDosJogos'].forEach((nome) => {
    const antes = window[nome];
    if (typeof antes !== 'function') return;
    window[nome] = function () { const r = antes.apply(this, arguments); atualizarBotaoDaMusicaDoTopo(); return r; };
  });
}

let ultimoBotaoDeFavorito = null;
function atualizarContadorDeSalvos() {
  const numero = document.querySelector('#salvos-btn .salvos-numero');
  if (!numero || typeof getFavoritos !== 'function') return;
  const total = getFavoritos().length;
  numero.hidden = total === 0;
  numero.textContent = total > 99 ? '99+' : String(total);
}

function abrirSalvos() {
  const filtro = document.querySelector('#sidebar .side-filter[data-filter="favoritos"]');
  if (filtro) filtro.click();
}

function animarSalvo(origem) {
  const destino = document.getElementById('salvos-btn');
  if (origem) { origem.classList.remove('salvou'); void origem.offsetWidth; origem.classList.add('salvou'); }
  if (!destino || !destino.offsetParent) return;
  const fim = destino.getBoundingClientRect();
  const inicio = origem && origem.getBoundingClientRect ? origem.getBoundingClientRect() : { left: window.innerWidth / 2, top: window.innerHeight / 2, width: 0, height: 0 };
  const x0 = inicio.left + inicio.width / 2; const y0 = inicio.top + inicio.height / 2;
  const x1 = fim.left + fim.width / 2; const y1 = fim.top + fim.height / 2;
  const voo = document.createElement('span');
  voo.className = 'voo-do-salvo';
  voo.innerHTML = ICONES_DO_APP_NOVO.salvoCheio;
  voo.style.left = `${x0}px`;
  voo.style.top = `${y0}px`;
  document.body.appendChild(voo);
  requestAnimationFrame(() => requestAnimationFrame(() => {
    voo.style.transform = `translate(${x1 - x0}px, ${y1 - y0}px) scale(0.55)`;
    voo.style.opacity = '0.35';
  }));
  setTimeout(() => {
    voo.remove();
    destino.classList.remove('pulou'); void destino.offsetWidth; destino.classList.add('pulou');
    for (let i = 0; i < 10; i += 1) {
      const f = document.createElement('span');
      f.className = 'faisca-do-salvo';
      f.style.left = `${x1}px`;
      f.style.top = `${y1}px`;
      document.body.appendChild(f);
      const ang = (i / 10) * Math.PI * 2;
      requestAnimationFrame(() => requestAnimationFrame(() => { f.style.transform = `translate(${Math.cos(ang) * 34}px, ${Math.sin(ang) * 34}px) scale(0.3)`; f.style.opacity = '0'; }));
      setTimeout(() => f.remove(), 700);
    }
  }, 760);
}

function ligarSalvos() {
  document.addEventListener('pointerdown', (e) => {
    const botao = e.target && e.target.closest ? e.target.closest('.btn-favorito, [class*="favorit"]') : null;
    if (botao) ultimoBotaoDeFavorito = botao;
  }, true);
  if (typeof toggleFavorito === 'function' && typeof ehFavorito === 'function') {
    const original = toggleFavorito;
    toggleFavorito = function alternarFavoritoComBrilho(id) {
      const antes = ehFavorito(id);
      const resultado = original.apply(this, arguments);
      if (!antes && ehFavorito(id)) animarSalvo(ultimoBotaoDeFavorito);
      atualizarContadorDeSalvos();
      return resultado;
    };
  }
  atualizarContadorDeSalvos();
}

function buscasRecentes() {
  try { return JSON.parse(localStorage.getItem('lumina-sancti-buscas-recentes') || '[]').slice(0, 6); } catch (e) { return []; }
}

function guardarBuscaRecente(texto) {
  const limpo = String(texto || '').trim();
  if (!limpo) return;
  const lista = buscasRecentes().filter((t) => t.toLowerCase() !== limpo.toLowerCase());
  lista.unshift(limpo);
  try { localStorage.setItem('lumina-sancti-buscas-recentes', JSON.stringify(lista.slice(0, 6))); } catch (e) { }
}

const buscaNova = { filtro: 'recomendados' };
function idsDosSantosDaBusca(filtro) {
  if (typeof santosData === 'undefined') return [];
  if (filtro === 'jovens') return santosData.filter((s) => String(s.categoria).includes('santos-jovens')).map((s) => s.id);
  if (filtro === 'doutores') return santosData.filter((s) => String(s.categoria).includes('doutores')).map((s) => s.id);
  if (filtro === 'festas') {
    const mes = String(new Date().getMonth() + 1).padStart(2, '0');
    return santosData.filter((s) => s.festa && s.festa.startsWith(`${mes}-`)).sort((a, b) => a.festa.localeCompare(b.festa)).map((s) => s.id);
  }
  return santosData.map((s) => s.id);
}

function htmlDoPosterDaBusca(id, selo, i) {
  return typeof htmlDoPoster === 'function' ? htmlDoPoster(id, selo || '', i) : '';
}

function desenharExtrasDaBusca() {
  const caixa = document.getElementById('busca-extra');
  if (!caixa) return;
  const recentes = buscasRecentes();
  const filtros = [['recomendados', textoDoAppNovo('recomendados')], ['santos', textoDoAppNovo('santos')], ['oracoes', textoDoAppNovo('oracoes')], ['trilhas', textoDoAppNovo('trilhas')], ['padroeiros', textoDoAppNovo('padroeiros')], ['doutores', textoDoAppNovo('doutores')], ['jovens', textoDoAppNovo('jovens')], ['festas', textoDoAppNovo('festas')]];
  let conteudo = '';
  if (buscaNova.filtro === 'recomendados') {
    const procurados = (typeof SANTOS_PARA_CONHECER !== 'undefined' ? SANTOS_PARA_CONHECER : []).map((id, i) => htmlDoPosterDaBusca(id, '', i)).join('');
    const padroeiros = (typeof PADROEIROS_DA_VITRINE !== 'undefined' ? PADROEIROS_DA_VITRINE : []).map(([id, tag], i) => htmlDoPosterDaBusca(id, typeof textoDaVitrine === 'function' ? textoDaVitrine(tag) : '', i)).join('');
    conteudo = `<div class="busca-fileira"><h4>${escaparDoAppNovo(textoDoAppNovo('maisProcurados'))}</h4><div class="busca-trilho">${procurados}</div></div><div class="busca-fileira"><h4>${escaparDoAppNovo(typeof textoDaVitrine === 'function' ? textoDaVitrine('padroeiros') : '')}</h4><div class="busca-trilho">${padroeiros}</div></div>`;
  } else {
    const ids = idsDosSantosDaBusca(buscaNova.filtro);
    conteudo = ids.length ? `<div class="busca-grade">${ids.map((id, i) => htmlDoPosterDaBusca(id, '', i)).join('')}</div>` : `<p class="not-found-msg">${escaparDoAppNovo(textoDoAppNovo('semFestas'))}</p>`;
  }
  caixa.innerHTML = `${recentes.length ? `<div class="busca-recentes">${escaparDoAppNovo(textoDoAppNovo('recentes'))} ${recentes.map((t) => `<button type="button" class="busca-chip" data-busca-recente="${escaparDoAppNovo(t)}">${ICONES_DO_APP_NOVO.relogio}${escaparDoAppNovo(t)}</button>`).join('')}</div>` : ''}
    <div class="busca-filtros">${filtros.map(([id, nome]) => `<button type="button" class="busca-chip${buscaNova.filtro === id ? ' ativo' : ''}" data-busca-filtro="${id}">${escaparDoAppNovo(nome)}</button>`).join('')}</div>
    ${conteudo}`;
}

function oracoesDaBusca(texto) {
  if (typeof BIBLIOTECA_DE_ORACOES === 'undefined' || !Array.isArray(BIBLIOTECA_DE_ORACOES) || typeof BuscaInteligente === 'undefined') return [];
  const alvo = BuscaInteligente.normalizar(texto);
  return BIBLIOTECA_DE_ORACOES.filter((o) => BuscaInteligente.normalizar(typeof noIdioma === 'function' ? noIdioma(o.t) : String(o.t)).includes(alvo)).slice(0, 4);
}

function trilhasDaBusca(texto) {
  if (typeof trilhasEmUso !== 'function' || typeof BuscaInteligente === 'undefined') return [];
  const alvo = BuscaInteligente.normalizar(texto);
  let lista = [];
  try { lista = trilhasEmUso() || []; } catch (e) { lista = []; }
  return lista.filter((t) => BuscaInteligente.normalizar(`${t.titulo || ''} ${t.santo || ''}`).includes(alvo)).slice(0, 3);
}

function completarResultadosDaBusca() {
  const entrada = document.getElementById('search-input');
  const resultados = document.getElementById('search-results');
  const extra = document.getElementById('busca-extra');
  if (!entrada || !resultados) return;
  const texto = entrada.value.trim();
  if (extra) extra.hidden = texto.length >= 2;
  if (texto.length < 2) return;
  resultados.querySelectorAll('.search-result-item').forEach((item) => {
    item.tabIndex = 0;
    if (!item.querySelector('.busca-tipo')) item.insertAdjacentHTML('beforeend', `<span class="busca-tipo">${escaparDoAppNovo(textoDoAppNovo('santo'))}</span>`);
  });
  const vazio = resultados.querySelector('.not-found-msg');
  const extras = [];
  oracoesDaBusca(texto).forEach((o) => extras.push({ tipo: 'oracao', id: o.id, titulo: typeof noIdioma === 'function' ? noIdioma(o.t) : o.t }));
  trilhasDaBusca(texto).forEach((t) => extras.push({ tipo: 'trilha', id: t.slug, titulo: t.titulo || t.santo }));
  if (!extras.length) return;
  if (vazio) vazio.remove();
  extras.forEach((x) => {
    const item = document.createElement('div');
    item.className = 'search-result-item';
    item.tabIndex = 0;
    item.innerHTML = `<span class="busca-icone-item">${x.tipo === 'oracao' ? ICONES_DO_APP_NOVO.livro : ICONES_DO_APP_NOVO.trilha}</span><span class="search-result-textos"><span class="search-result-title">${escaparDoAppNovo(x.titulo)}</span></span><span class="busca-tipo">${escaparDoAppNovo(textoDoAppNovo(x.tipo))}</span>`;
    item.addEventListener('click', () => {
      guardarBuscaRecente(x.titulo);
      if (typeof closeSearch === 'function') closeSearch();
      if (x.tipo === 'oracao' && typeof abrirLeitorDeOracao === 'function') abrirLeitorDeOracao(x.id, [x.id]);
      if (x.tipo === 'trilha' && typeof abrirTrilhas === 'function') abrirTrilhas(x.id);
    });
    resultados.appendChild(item);
  });
}

function reconhecedorDeVoz() {
  const Classe = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!Classe) return null;
  const rec = new Classe();
  const idioma = typeof idiomaAtual !== 'undefined' ? idiomaAtual : 'pt';
  rec.lang = idioma === 'en' ? 'en-US' : idioma === 'es' ? 'es-ES' : 'pt-BR';
  rec.interimResults = false;
  rec.maxAlternatives = 1;
  return rec;
}

function ouvirPara(entrada, botao) {
  const rec = reconhecedorDeVoz();
  if (!rec || !entrada) return;
  botao.classList.add('ouvindo');
  rec.onresult = (e) => {
    const texto = e.results && e.results[0] && e.results[0][0] ? e.results[0][0].transcript : '';
    entrada.value = texto;
    entrada.dispatchEvent(new Event('input', { bubbles: true }));
    entrada.focus();
  };
  rec.onend = () => botao.classList.remove('ouvindo');
  rec.onerror = () => botao.classList.remove('ouvindo');
  try { rec.start(); } catch (e) { botao.classList.remove('ouvindo'); }
}

function ligarBuscaNova() {
  const modal = document.getElementById('search-modal');
  const entrada = document.getElementById('search-input');
  const resultados = document.getElementById('search-results');
  if (!modal || !entrada || !resultados || document.getElementById('busca-extra')) return;
  const extra = document.createElement('div');
  extra.id = 'busca-extra';
  extra.className = 'busca-extra';
  resultados.after(extra);
  entrada.removeAttribute('data-i18n-placeholder');
  entrada.setAttribute('placeholder', textoDoAppNovo('procure'));
  if (window.SpeechRecognition || window.webkitSpeechRecognition) {
    const voz = document.createElement('button');
    voz.type = 'button';
    voz.className = 'busca-voz';
    voz.setAttribute('aria-label', textoDoAppNovo('falar'));
    voz.innerHTML = ICONES_DO_APP_NOVO.microfone;
    voz.addEventListener('click', () => ouvirPara(entrada, voz));
    entrada.after(voz);
  }
  entrada.addEventListener('input', completarResultadosDaBusca);
  resultados.addEventListener('click', (e) => {
    const item = e.target.closest('.search-result-item');
    if (!item) return;
    const titulo = item.querySelector('.search-result-title');
    if (titulo) guardarBuscaRecente(titulo.textContent);
  }, true);
  resultados.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && e.target.classList && e.target.classList.contains('search-result-item')) e.target.click();
  });
  extra.addEventListener('click', (e) => {
    const recente = e.target.closest('[data-busca-recente]');
    if (recente) { entrada.value = recente.dataset.buscaRecente; entrada.dispatchEvent(new Event('input', { bubbles: true })); entrada.focus(); return; }
    const filtro = e.target.closest('[data-busca-filtro]');
    if (filtro) {
      const id = filtro.dataset.buscaFiltro;
      if (id === 'oracoes') { if (typeof closeSearch === 'function') closeSearch(); const b = document.querySelector('.barra-app-botao[data-destino="oracoes"]') || document.getElementById('nav-oracoes'); if (b) b.click(); return; }
      if (id === 'trilhas') { if (typeof closeSearch === 'function') closeSearch(); if (typeof abrirTrilhas === 'function') abrirTrilhas(); return; }
      if (id === 'padroeiros') { if (typeof closeSearch === 'function') closeSearch(); const b = document.getElementById('nav-padroeiro'); if (b) b.click(); return; }
      buscaNova.filtro = id;
      desenharExtrasDaBusca();
      return;
    }
    const santo = e.target.closest('[data-vit-santo]');
    if (santo) {
      const nome = santo.getAttribute('aria-label');
      if (nome) guardarBuscaRecente(nome);
      if (typeof closeSearch === 'function') closeSearch();
      if (typeof showDetail === 'function') showDetail(santo.dataset.vitSanto);
    }
  });
  const botao = document.getElementById('search-btn');
  if (botao) botao.addEventListener('click', () => { buscaNova.filtro = 'recomendados'; extra.hidden = false; desenharExtrasDaBusca(); });
}

function ligarInicioNovo() {
  const home = document.getElementById('view-home');
  if (!home) return;
  if (!document.getElementById('vit-atalhos')) {
    const atalhos = [
      ['nav-terco', 'terco', textoDoAppNovo('aTerco'), textoDoAppNovo('aTercoSub')],
      ['nav-leitura', 'biblia', textoDoAppNovo('aLeitura'), textoDoAppNovo('aLeituraSub')],
      ['nav-cursos', 'capelo', textoDoAppNovo('aCursos'), textoDoAppNovo('aCursosSub')],
      ['nav-novenas', 'vela', textoDoAppNovo('aNovenas'), textoDoAppNovo('aNovenasSub')],
      ['nav-dormir', 'lampada', textoDoAppNovo('aDormir'), textoDoAppNovo('aDormirSub')],
      ['lumina-btn', 'estrela', 'Lumina', textoDoAppNovo('aLuminaSub')],
    ];
    const secao = document.createElement('section');
    secao.id = 'vit-atalhos';
    secao.className = 'vit-atalhos';
    secao.innerHTML = atalhos.map(([alvo, icone, titulo, sub]) => `<button type="button" class="vit-atalho" data-clicar="${alvo}"><svg class="icone" viewBox="0 0 24 24" aria-hidden="true"><use href="#icone-${icone}"></use></svg><span><b>${escaparDoAppNovo(titulo)}</b><small>${escaparDoAppNovo(sub)}</small></span></button>`).join('');
    secao.addEventListener('click', (e) => {
      const b = e.target.closest('[data-clicar]');
      const alvo = b ? document.getElementById(b.dataset.clicar) : null;
      if (alvo) alvo.click();
    });
    const catalogo = document.getElementById('catalogo-interno-topo') || home.querySelector('#materias');
    if (catalogo) catalogo.before(secao);
  }
  const titulos = [['.hoje-area', 'hoje'], ['#vit-atalhos', 'rezar'], ['#materias', 'todos']];
  titulos.forEach(([seletor, chave]) => {
    const alvo = home.querySelector(seletor);
    if (!alvo || (alvo.previousElementSibling && alvo.previousElementSibling.dataset && alvo.previousElementSibling.dataset.tituloNovo === chave)) return;
    const h = document.createElement('h2');
    h.className = 'titulo-da-secao';
    h.dataset.tituloNovo = chave;
    h.textContent = textoDoAppNovo(chave);
    if (chave === 'todos') {
      const topo = document.getElementById('catalogo-interno-topo');
      (topo || alvo).before(h);
    } else alvo.before(h);
  });
  const quiz = document.getElementById('quiz-inicio-cartao');
  if (quiz && !quiz.querySelector('.quiz-rostos')) {
    quiz.insertAdjacentHTML('beforeend', `<span class="quiz-rostos" aria-hidden="true">${['teresinha', 'padre-pio', 'joana-darc', 'carlo-acutis', 'francisco-assis'].map((id) => `<img src="${escaparDoAppNovo(pinturaDoAppNovo(id))}" alt="" loading="lazy">`).join('')}</span>`);
  }
  const pintarHoje = () => {
    const frase = document.querySelector('#frase-do-dia .frase-cartao');
    if (frase && !frase.querySelector('.hoje-pintura')) {
      const santo = frase.querySelector('[data-santo]');
      const id = santo ? santo.dataset.santo : 'padre-pio';
      const src = pinturaDoAppNovo(id, true);
      if (src) frase.insertAdjacentHTML('afterbegin', `<span class="hoje-pintura" aria-hidden="true"><img src="${escaparDoAppNovo(src)}" alt="" loading="lazy"></span>`);
    }
    const oracao = document.querySelector('#oracao-do-dia-inicio .oracao-inicio-cartao');
    if (oracao && !oracao.querySelector('.hoje-pintura')) {
      const opcoes = ['teresa-avila', 'francisco-assis', 'bernadete', 'teresinha', 'inacio-loyola', 'faustina', 'agostinho'];
      const id = opcoes[new Date().getDate() % opcoes.length];
      const src = pinturaDoAppNovo(id, true);
      if (src) oracao.insertAdjacentHTML('afterbegin', `<span class="hoje-pintura" aria-hidden="true"><img src="${escaparDoAppNovo(src)}" alt="" loading="lazy"></span>`);
    }
  };
  pintarHoje();
  ['frase-do-dia', 'oracao-do-dia-inicio'].forEach((id) => {
    const lugar = document.getElementById(id);
    if (lugar && typeof MutationObserver !== 'undefined') new MutationObserver(pintarHoje).observe(lugar, { childList: true });
  });
}

function ligarLuminaNova() {
  const entrada = document.getElementById('lumina-input');
  if (entrada && !document.getElementById('lumina-voz') && (window.SpeechRecognition || window.webkitSpeechRecognition)) {
    const voz = document.createElement('button');
    voz.type = 'button';
    voz.id = 'lumina-voz';
    voz.className = 'lumina-voz';
    voz.setAttribute('aria-label', textoDoAppNovo('falar'));
    voz.innerHTML = ICONES_DO_APP_NOVO.microfone;
    voz.addEventListener('click', () => ouvirPara(entrada, voz));
    entrada.after(voz);
  }
  const nova = document.getElementById('lumina-nova');
  if (nova && !nova.dataset.ligadaNova) {
    nova.dataset.ligadaNova = '1';
    nova.addEventListener('click', () => { if (document.body.classList.contains('lumina-com-lado') && typeof abrirHistoricoDaLumina === 'function') setTimeout(() => { try { abrirHistoricoDaLumina(); } catch (e) { } }, 300); });
  }
  const titulo = document.querySelector('.lumina-saudacao-titulo');
  if (titulo) titulo.textContent = textoDoAppNovo('ajuda');
}

function aoMudarDeVistaNoAppNovo() {
  const vista = document.body.dataset.vista || '';
  const larga = window.matchMedia && window.matchMedia('(min-width: 1024px)').matches;
  if (vista === 'view-ia' && larga) {
    if (!document.body.classList.contains('lumina-com-lado')) {
      document.body.classList.add('lumina-com-lado');
      if (typeof abrirHistoricoDaLumina === 'function') { try { abrirHistoricoDaLumina(); } catch (e) { } }
    }
    ligarLuminaNova();
  } else if (document.body.classList.contains('lumina-com-lado')) {
    document.body.classList.remove('lumina-com-lado');
    if (typeof fecharHistoricoDaLumina === 'function') fecharHistoricoDaLumina();
  }
  atualizarBotaoDaMusicaDoTopo();
}

function trocarFotosDoCatalogo() {
  const grade = document.getElementById('cards-grid');
  if (!grade || typeof PINTURAS_GUARDADAS === 'undefined') return;
  grade.querySelectorAll('.card-img-wrapper').forEach((caixa) => {
    const id = (caixa.id || '').replace('img-wrapper-', '');
    if (!id || !PINTURAS_GUARDADAS.has(id)) return;
    caixa.querySelectorAll('img').forEach((img) => {
      const local = `santos/${id}.webp`;
      if (img.dataset.local === '1' || img.getAttribute('src') === local) return;
      img.dataset.original = img.getAttribute('src') || '';
      img.dataset.local = '1';
      img.addEventListener('error', () => { if (img.dataset.original && img.getAttribute('src') !== img.dataset.original) img.setAttribute('src', img.dataset.original); }, { once: true });
      img.setAttribute('src', local);
    });
  });
}

function iniciarAppNovo() {
  document.body.classList.add('app-novo');
  ligarCabecalhoNovo();
  posicionarBarraDoAppNovo();
  if (window.matchMedia) {
    const consulta = window.matchMedia('(min-width: 1100px)');
    if (consulta.addEventListener) consulta.addEventListener('change', posicionarBarraDoAppNovo);
    else if (consulta.addListener) consulta.addListener(posicionarBarraDoAppNovo);
  }
  ligarGavetaNova();
  ligarMusicaDoTopo();
  ligarSalvos();
  ligarBuscaNova();
  ligarInicioNovo();
  ligarLuminaNova();
  const grade = document.getElementById('cards-grid');
  if (grade && typeof MutationObserver !== 'undefined') new MutationObserver(trocarFotosDoCatalogo).observe(grade, { childList: true, subtree: true });
  trocarFotosDoCatalogo();
  const conta = document.getElementById('conta-btn');
  if (conta) conta.addEventListener('click', () => setTimeout(montarGradeDePerfis, 0));
  const cabeca = document.getElementById('conta-menu-cabeca');
  if (cabeca && typeof MutationObserver !== 'undefined') new MutationObserver(() => { const menu = document.getElementById('conta-menu'); if (menu && menu.classList.contains('aberto') && !cabeca.querySelector('.avatar-estrela')) montarGradeDePerfis(); }).observe(cabeca, { childList: true });
  if (typeof MutationObserver !== 'undefined') new MutationObserver(aoMudarDeVistaNoAppNovo).observe(document.body, { attributes: true, attributeFilter: ['data-vista'] });
  document.addEventListener('lumina-idioma', () => {
    document.querySelectorAll('[data-titulo-novo]').forEach((h) => { h.textContent = textoDoAppNovo(h.dataset.tituloNovo); });
    atualizarGavetaNova();
    ligarLuminaNova();
    const campo = document.getElementById('search-input');
    if (campo) campo.setAttribute('placeholder', textoDoAppNovo('procure'));
    if (document.getElementById('search-modal') && document.getElementById('search-modal').classList.contains('active')) desenharExtrasDaBusca();
  });
  aoMudarDeVistaNoAppNovo();
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => setTimeout(iniciarAppNovo, 0));
else setTimeout(iniciarAppNovo, 0);
