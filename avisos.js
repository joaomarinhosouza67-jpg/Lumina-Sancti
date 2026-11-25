const CHAVE_DOS_AVISOS_FECHADOS = 'lumina-sancti-avisos-fechados';
let advertenciaNaTela = false;

function avisosFechados() {
  try {
    const lista = JSON.parse(localStorage.getItem(CHAVE_DOS_AVISOS_FECHADOS) || '[]');
    return Array.isArray(lista) ? lista : [];
  } catch (e) {
    return [];
  }
}

const ICONES_DOS_AVISOS = {
  novidade: '<svg viewBox="0 0 100 100" width="20" height="20" aria-hidden="true"><path d="M50 4 C52 36 64 48 96 50 C64 52 52 64 50 96 C48 64 36 52 4 50 C36 48 48 36 50 4 Z" fill="currentColor"/></svg>',
  importante: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3 2 20h20L12 3z"/><path d="M12 10v4M12 17h.01"/></svg>',
  manutencao: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14.7 6.3a4 4 0 0 0-5.4 5.2L3 17.8V21h3.2l6.3-6.3a4 4 0 0 0 5.2-5.4l-2.6 2.6-2.4-.6-.6-2.4 2.6-2.6z"/></svg>',
  evento: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="3"/><path d="M3 10h18M8 3v4M16 3v4"/></svg>',
};
const avisosDoSite = { lista: [], indice: 0, vistos: new Set() };

function perfilDosAvisos() {
  const m = (typeof membroAtivo !== 'undefined' && membroAtivo) || null;
  return m && m.id ? m.id : null;
}

function registrarAviso(id, acao) {
  const pid = perfilDosAvisos();
  if (!pid || typeof supabaseCliente === 'undefined' || !supabaseCliente) return;
  try { supabaseCliente.rpc('aviso_registrar', { _pid: pid, _aviso: id, _acao: acao }).then(() => {}, () => {}); } catch (e) {
  }
}

function fecharAvisoGeral(id) {
  try {
    const lista = avisosFechados().filter((x) => x !== id).concat(id).slice(-40);
    localStorage.setItem(CHAVE_DOS_AVISOS_FECHADOS, JSON.stringify(lista));
  } catch (e) {
  }
  registrarAviso(id, 'fechou');
  avisosDoSite.lista = avisosDoSite.lista.filter((a) => a.id !== id);
  if (avisosDoSite.indice >= avisosDoSite.lista.length) avisosDoSite.indice = 0;
  mostrarAvisoDaVez();
}

function linkSeguroDoAviso(link) {
  try {
    const endereco = new URL(link);
    return endereco.protocol === 'https:' ? endereco.href : '';
  } catch (e) {
    return '';
  }
}

function mostrarAvisoDaVez() {
  const faixa = document.getElementById('aviso-geral');
  if (!faixa) return;
  const total = avisosDoSite.lista.length;
  const aviso = avisosDoSite.lista[avisosDoSite.indice];
  if (!aviso) { faixa.hidden = true; faixa.innerHTML = ''; return; }
  const tipo = ICONES_DOS_AVISOS[aviso.tipo] ? aviso.tipo : 'novidade';
  const link = aviso.link ? linkSeguroDoAviso(aviso.link) : '';
  faixa.className = `aviso-geral tipo-${tipo}`;
  faixa.innerHTML = `
    <span class="aviso-geral-icone">${ICONES_DOS_AVISOS[tipo]}</span>
    <div class="aviso-geral-corpo">${aviso.titulo ? '<strong class="aviso-geral-titulo"></strong>' : ''}<p class="aviso-geral-texto"></p></div>
    ${link ? '<a class="aviso-geral-link" target="_blank" rel="noopener noreferrer"></a>' : ''}
    ${total > 1 ? `<div class="aviso-geral-navegar"><button type="button" class="aviso-geral-seta" data-passo="-1" aria-label="${typeof tr === 'function' ? tr('Aviso anterior') : 'Aviso anterior'}"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="m15 18-6-6 6-6"/></svg></button><span class="aviso-geral-contagem">${avisosDoSite.indice + 1}/${total}</span><button type="button" class="aviso-geral-seta" data-passo="1" aria-label="${typeof tr === 'function' ? tr('Próximo aviso') : 'Próximo aviso'}"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="m9 18 6-6-6-6"/></svg></button></div>` : ''}
    <button type="button" class="aviso-geral-fechar" aria-label="Fechar aviso"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg></button>`;
  if (aviso.titulo) faixa.querySelector('.aviso-geral-titulo').textContent = aviso.titulo;
  faixa.querySelector('.aviso-geral-texto').textContent = aviso.texto;
  if (link) {
    const a = faixa.querySelector('.aviso-geral-link');
    a.href = link;
    a.textContent = aviso.botao || (typeof tr === 'function' ? tr('Saiba mais') : 'Saiba mais');
    a.addEventListener('click', () => registrarAviso(aviso.id, 'clicou'));
  }
  faixa.querySelectorAll('.aviso-geral-seta').forEach((b) => b.addEventListener('click', () => {
    avisosDoSite.indice = (avisosDoSite.indice + Number(b.dataset.passo) + total) % total;
    mostrarAvisoDaVez();
  }));
  faixa.querySelector('.aviso-geral-fechar').addEventListener('click', () => fecharAvisoGeral(aviso.id));
  faixa.hidden = false;
  if (!avisosDoSite.vistos.has(aviso.id)) { avisosDoSite.vistos.add(aviso.id); registrarAviso(aviso.id, 'viu'); }
}

async function carregarAvisoGeral() {
  const faixa = document.getElementById('aviso-geral');
  if (!faixa || typeof supabaseCliente === 'undefined' || !supabaseCliente) return;
  let lista = null;
  try {
    const { data, error } = await supabaseCliente.rpc('avisos_atuais', { _pid: perfilDosAvisos() });
    if (!error && Array.isArray(data)) lista = data;
  } catch (e) {
    lista = null;
  }
  if (!lista) {
    try {
      const { data, error } = await supabaseCliente.rpc('aviso_atual');
      lista = !error && data && data.id ? [data] : [];
    } catch (e) {
      lista = [];
    }
  }
  const fechados = avisosFechados();
  const atual = avisosDoSite.lista[avisosDoSite.indice];
  avisosDoSite.lista = lista.filter((a) => a && a.id && a.texto && !fechados.includes(a.id));
  const onde = atual ? avisosDoSite.lista.findIndex((a) => a.id === atual.id) : -1;
  avisosDoSite.indice = onde >= 0 ? onde : 0;
  mostrarAvisoDaVez();
}

function janelaDaAdvertencia() {
  let modal = document.getElementById('advertencia-janela');
  if (modal) return modal;
  modal = document.createElement('div');
  modal.id = 'advertencia-janela';
  modal.className = 'search-modal';
  modal.innerHTML = `
    <div class="search-modal-content advertencia-caixa" role="alertdialog" aria-modal="true" aria-labelledby="advertencia-titulo" aria-describedby="advertencia-motivo">
      <span class="advertencia-icone">${typeof icone === 'function' ? icone('escudo') : ''}</span>
      <h3 id="advertencia-titulo">Aviso da equipe do Lumina Sancti</h3>
      <p class="advertencia-motivo" id="advertencia-motivo"></p>
      <p class="advertencia-explica">Pedimos que você siga as Regras dos Cenáculos, para que todos se sintam em casa. Se isso se repetir, a conta pode ser suspensa.</p>
      <div class="advertencia-regras cenaculo-regras-caixa" id="advertencia-texto-das-regras" hidden></div>
      <div class="advertencia-botoes">
        <button type="button" class="licao-botao" id="advertencia-entendi">Entendi</button>
        <button type="button" class="perfil-link" id="advertencia-regras">Ler as regras</button>
      </div>
    </div>`;
  document.body.appendChild(modal);
  return modal;
}

async function verificarAdvertencia() {
  if (advertenciaNaTela || typeof supabaseCliente === 'undefined' || !supabaseCliente) return;
  if (typeof contaLogada !== 'function' || !contaLogada()) return;
  if (document.body.classList.contains('modo-kids')) return;
  if (typeof membroAtivo === 'undefined' || !membroAtivo || membroAtivo.tipo !== 'adulto') return;
  let advertencia = null;
  try {
    const { data, error } = await supabaseCliente.rpc('minha_advertencia');
    if (!error) advertencia = data;
  } catch (e) {
    advertencia = null;
  }
  if (!advertencia || !advertencia.id || document.body.classList.contains('modo-kids') || !membroAtivo || membroAtivo.tipo !== 'adulto') return;
  advertenciaNaTela = true;
  const modal = janelaDaAdvertencia();
  const recado = advertencia.tipo === 'recado';
  modal.classList.toggle('recado', recado);
  modal.querySelector('#advertencia-titulo').textContent = recado ? 'Recado da equipe do Lumina Sancti' : 'Aviso da equipe do Lumina Sancti';
  modal.querySelector('.advertencia-explica').hidden = recado;
  modal.querySelector('#advertencia-motivo').textContent = advertencia.motivo;
  const entendi = modal.querySelector('#advertencia-entendi');
  const novoEntendi = entendi.cloneNode(true);
  entendi.replaceWith(novoEntendi);
  novoEntendi.addEventListener('click', async () => {
    novoEntendi.disabled = true;
    try {
      await supabaseCliente.rpc('advertencia_vista', { _id: advertencia.id });
    } catch (e) {
      novoEntendi.disabled = false;
      return;
    }
    modal.classList.remove('active');
    advertenciaNaTela = false;
    novoEntendi.disabled = false;
    verificarAdvertencia();
  });
  const regras = modal.querySelector('#advertencia-regras');
  const novasRegras = regras.cloneNode(true);
  regras.replaceWith(novasRegras);
  const caixaDasRegras = modal.querySelector('#advertencia-texto-das-regras');
  caixaDasRegras.hidden = true;
  novasRegras.hidden = recado || typeof REGRAS_DOS_CENACULOS === 'undefined';
  novasRegras.addEventListener('click', () => {
    if (!caixaDasRegras.innerHTML) caixaDasRegras.innerHTML = REGRAS_DOS_CENACULOS;
    caixaDasRegras.hidden = !caixaDasRegras.hidden;
    novasRegras.textContent = caixaDasRegras.hidden ? 'Ler as regras' : 'Esconder as regras';
  });
  modal.classList.add('active');
  setTimeout(() => novoEntendi.focus(), 50);
}

const CHAVE_DA_NOVIDADE_ADIADA = 'lumina-sancti-novidade-adiada';
const CHAVE_DAS_NOVIDADES_VISTAS = 'lumina-sancti-novidades-vistas';
let novidadeNaTela = false;

function lerGuardado(chave, padrao) {
  try {
    const valor = JSON.parse(localStorage.getItem(chave) || 'null');
    return valor === null ? padrao : valor;
  } catch (e) {
    return padrao;
  }
}

function guardar(chave, valor) {
  try {
    localStorage.setItem(chave, JSON.stringify(valor));
  } catch (e) {
    return;
  }
}

function diaDeHoje() {
  const agora = new Date();
  return `${agora.getFullYear()}-${agora.getMonth() + 1}-${agora.getDate()}`;
}

function textoNoIdiomaDaNovidade(campo) {
  const idioma = typeof idiomaAtual !== 'undefined' ? idiomaAtual : 'pt';
  if (!campo || typeof campo !== 'object') return campo || '';
  return campo[idioma] || campo.pt || '';
}

const DESTINOS_DA_NOVIDADE = {
  trilhas: 'Ver as trilhas',
  terco: 'Abrir o terço',
  oracoes: 'Ver as orações',
  cenaculos: 'Abrir os Cenáculos',
  comunidade: 'Ver a Comunidade',
};

function irParaDestinoDaNovidade(destino) {
  if (destino === 'trilhas' && typeof abrirTrilhas === 'function') abrirTrilhas();
  else if (destino === 'terco') mudarDeView('view-terco');
  else if (destino === 'oracoes') mudarDeView('view-oracoes');
  else if (destino === 'cenaculos' && typeof abrirCenaculos === 'function') abrirCenaculos();
  else if (destino === 'comunidade' && typeof abrirComunidade === 'function') abrirComunidade();
}

function janelaDaNovidade() {
  let modal = document.getElementById('novidade-janela');
  if (modal) return modal;
  modal = document.createElement('div');
  modal.id = 'novidade-janela';
  modal.className = 'search-modal';
  modal.innerHTML = `
    <div class="search-modal-content novidade-caixa" role="dialog" aria-modal="true" aria-labelledby="novidade-titulo">
      <span class="novidade-selo" aria-hidden="true"></span>
      <p class="novidade-versao" id="novidade-versao"></p>
      <h3 id="novidade-titulo"></h3>
      <ul class="novidade-itens" id="novidade-itens"></ul>
      <div class="novidade-botoes">
        <button type="button" class="licao-botao" id="novidade-conferi">Conferi!</button>
        <button type="button" class="faixa-depois" id="novidade-depois">Ver depois</button>
      </div>
    </div>`;
  document.body.appendChild(modal);
  return modal;
}

async function verificarNovidade() {
  if (novidadeNaTela || advertenciaNaTela || (typeof presenteNaTela !== 'undefined' && presenteNaTela) || typeof supabaseCliente === 'undefined' || !supabaseCliente) return;
  if (document.body.classList.contains('modo-kids') || document.body.classList.contains('intro-ativa')) return;
  const inicio = document.getElementById('view-home');
  if (!inicio || !inicio.classList.contains('active')) return;
  let novidade = null;
  try {
    const { data, error } = await supabaseCliente.rpc('novidade_atual');
    if (!error) novidade = data;
  } catch (e) {
    novidade = null;
  }
  if (!novidade || !novidade.id || novidadeNaTela || (typeof presenteNaTela !== 'undefined' && presenteNaTela) || document.body.classList.contains('modo-kids')) return;
  if (lerGuardado(CHAVE_DAS_NOVIDADES_VISTAS, []).includes(novidade.id)) return;
  const adiada = lerGuardado(CHAVE_DA_NOVIDADE_ADIADA, null);
  if (adiada && adiada.id === novidade.id && adiada.dia === diaDeHoje()) return;
  const itens = textoNoIdiomaDaNovidade(novidade.itens);
  if (!Array.isArray(itens) || itens.length === 0) return;

  novidadeNaTela = true;
  const modal = janelaDaNovidade();
  modal.querySelector('#novidade-versao').textContent = tr('Versão {v}', { v: novidade.versao });
  modal.querySelector('#novidade-titulo').textContent = textoNoIdiomaDaNovidade(novidade.titulo) || tr('Novidades');
  const lista = modal.querySelector('#novidade-itens');
  lista.innerHTML = '';
  itens.forEach((texto, i) => {
    const item = document.createElement('li');
    item.style.setProperty('--atraso', `${0.15 + i * 0.09}s`);
    item.textContent = texto;
    item.setAttribute('translate', 'no');
    lista.appendChild(item);
  });
  const fechar = () => {
    modal.classList.remove('active');
    novidadeNaTela = false;
  };
  const destino = DESTINOS_DA_NOVIDADE[novidade.destino] ? novidade.destino : (novidade.destino === 'nenhum' ? '' : 'trilhas');
  const conferi = modal.querySelector('#novidade-conferi');
  const novoConferi = conferi.cloneNode(true);
  conferi.replaceWith(novoConferi);
  novoConferi.textContent = destino ? tr(DESTINOS_DA_NOVIDADE[destino]) : tr('Conferi!');
  novoConferi.classList.toggle('novidade-ir', !!destino);
  novoConferi.addEventListener('click', async () => {
    guardar(CHAVE_DAS_NOVIDADES_VISTAS, lerGuardado(CHAVE_DAS_NOVIDADES_VISTAS, []).filter((x) => x !== novidade.id).concat(novidade.id).slice(-30));
    fechar();
    if (destino) setTimeout(() => irParaDestinoDaNovidade(destino), 150);
    if (typeof contaLogada === 'function' && contaLogada()) {
      try { await supabaseCliente.rpc('novidade_vista', { _id: novidade.id }); } catch (e) {  }
    }
  });
  const depois = modal.querySelector('#novidade-depois');
  const novoDepois = depois.cloneNode(true);
  depois.replaceWith(novoDepois);
  novoDepois.addEventListener('click', () => {
    guardar(CHAVE_DA_NOVIDADE_ADIADA, { id: novidade.id, dia: diaDeHoje() });
    fechar();
  });
  modal.classList.add('active');
  setTimeout(() => novoConferi.focus(), 60);
}

function iniciarAvisos() {
  setTimeout(verificarNovidade, 7000);
  setTimeout(carregarAvisoGeral, 400);
  setTimeout(verificarAdvertencia, 1500);
  if (typeof supabaseCliente !== 'undefined' && supabaseCliente) {
    supabaseCliente.auth.onAuthStateChange((evento) => {
      if (evento === 'SIGNED_IN') { setTimeout(verificarAdvertencia, 800); setTimeout(carregarAvisoGeral, 1200); }
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  if (typeof rodarComSeguranca === 'function') rodarComSeguranca('avisos da equipe', iniciarAvisos);
  else iniciarAvisos();
});
