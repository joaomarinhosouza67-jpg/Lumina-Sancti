const VISTAS_COM_COLUNA_DIREITA = ['view-trilhas', 'view-ranking', 'view-jogos', 'view-home', 'view-oracoes'];
const LARGURA_DA_COLUNA_DIREITA = 1280;
let ligaDaColunaDireita = { perfil: null, quando: 0, dados: null, carregando: false };

function telaDeComputadorLarga() {
  return window.matchMedia && window.matchMedia(`(min-width: ${LARGURA_DA_COLUNA_DIREITA}px)`).matches;
}

function escaparDaColuna(texto) {
  return String(texto == null ? '' : texto).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

function iconeDaColuna(nome) {
  return `<svg class="icone" viewBox="0 0 24 24" aria-hidden="true"><use href="#icone-${nome}"></use></svg>`;
}

function membroDaColuna() {
  return typeof obterMembroAtivo === 'function' ? obterMembroAtivo() : null;
}

async function carregarLigaDaColuna() {
  const membro = membroDaColuna();
  if (!membro || membro.tipo !== 'adulto' || typeof supabaseCliente === 'undefined' || !supabaseCliente) return;
  const agora = Date.now();
  if (ligaDaColunaDireita.carregando || (ligaDaColunaDireita.perfil === membro.id && agora - ligaDaColunaDireita.quando < 5 * 60 * 1000)) return;
  ligaDaColunaDireita.carregando = true;
  try {
    const { data, error } = await supabaseCliente.rpc('ranking_da_semana', { _pid: membro.id });
    if (!error) ligaDaColunaDireita = { perfil: membro.id, quando: Date.now(), dados: data || null, carregando: false };
  } catch (e) {
  }
  ligaDaColunaDireita.carregando = false;
  desenharColunaDireita();
}

function cartaoDaLigaNaColuna() {
  const membro = membroDaColuna();
  if (!membro || membro.tipo !== 'adulto') return '';
  const dados = ligaDaColunaDireita.perfil === membro.id ? ligaDaColunaDireita.dados : null;
  if (!dados) return '';
  const indice = Number(dados.liga) || 0;
  const liga = typeof ligaDoIndice === 'function' ? ligaDoIndice(indice) : { nome: '' };
  const linhas = Array.isArray(dados.lista) ? dados.lista : [];
  const eu = linhas.find((l) => l.eu);
  const emblema = typeof emblemaDaLiga === 'function' ? emblemaDaLiga(indice) : '';
  const detalhe = eu
    ? tr('Sua posição: {n}º', { n: eu.posicao })
    : tr('Faça uma missão esta semana para entrar na liga.');
  return `
    <section class="cd-cartao cd-liga">
      <div class="cd-cartao-topo"><strong>${escaparDaColuna(tr('Liga da semana'))}</strong><button type="button" class="cd-link" data-cd-ir="ranking">${escaparDaColuna(tr('Ver liga'))}</button></div>
      <div class="cd-liga-corpo"><span class="cd-liga-emblema">${emblema}</span><span class="cd-liga-textos"><em class="cd-liga-nome">${escaparDaColuna(tr(liga.nome || ''))}</em><b>${escaparDaColuna(detalhe)}</b>${eu && Number(dados.sobem) && eu.posicao <= Number(dados.sobem) ? `<small class="cd-sobe">${escaparDaColuna(tr('Na zona de subir de liga'))}</small>` : ''}${eu && Number(dados.descem) && eu.posicao > linhas.length - Number(dados.descem) ? `<small class="cd-desce">${escaparDaColuna(tr('Na zona de descer de liga'))}</small>` : ''}</span></div>
    </section>`;
}

function cartaoDosDesafiosNaColuna() {
  const dados = typeof caixasDoDia !== 'undefined' && caixasDoDia ? caixasDoDia.desafios : null;
  if (!dados || !Array.isArray(dados.itens) || !dados.itens.length) return '';
  const tipos = typeof TIPOS_DE_DESAFIO !== 'undefined' ? TIPOS_DE_DESAFIO : {};
  return `
    <section class="cd-cartao cd-desafios">
      <div class="cd-cartao-topo"><strong>${escaparDaColuna(tr('Desafios do dia'))}</strong><button type="button" class="cd-link" data-cd-ir="trilhas">${escaparDaColuna(tr('Ver todos'))}</button></div>
      <ul>${dados.itens.map((item) => {
        const info = tipos[item.tipo] || { icone: 'estrela' };
        const parte = Math.min(100, Math.round((Number(item.progresso) / Math.max(1, Number(item.meta))) * 100));
        return `<li class="${item.feito ? 'feito' : ''}"><span class="cd-desafio-icone">${iconeDaColuna(item.feito ? 'check' : info.icone)}</span><span class="cd-desafio-textos"><b>${escaparDaColuna(typeof textoDoDesafio === 'function' ? textoDoDesafio(item) : '')}</b><span class="cd-barra"><i style="width:${parte}%"></i><em>${Math.min(item.progresso, item.meta)} / ${item.meta}</em></span></span><span class="cd-desafio-bau">${typeof svgDoBau === 'function' ? svgDoBau(dados.bau_tipo || 'madeira', 30) : ''}</span></li>`;
      }).join('')}</ul>
    </section>`;
}

function desenharColunaDireita() {
  const coluna = document.getElementById('coluna-direita');
  if (!coluna) return;
  const vista = document.body.dataset.vista || '';
  const mostrar = telaDeComputadorLarga() && VISTAS_COM_COLUNA_DIREITA.includes(vista) && !document.body.classList.contains('modo-kids');
  document.body.classList.toggle('com-coluna-direita', mostrar);
  if (!mostrar) { coluna.hidden = true; return; }
  coluna.hidden = false;
  const membro = membroDaColuna();
  const numeros = membro ? `
    <div class="cd-numeros">
      <span class="cd-numero cd-fe" title="${escaparDaColuna(tr('Fé'))}">${iconeDaColuna('estrela')}<b>${Number(membro.fe) || 0}</b></span>
      <span class="cd-numero cd-chama" title="${escaparDaColuna(tr('Ofensiva'))}">${iconeDaColuna('chama')}<b>${Number(membro.ofensiva) || 0}</b></span>
      <span class="cd-numero cd-santidade" title="${escaparDaColuna(tr('Santidade'))}">${iconeDaColuna('pomba')}<b>${typeof membro.santidade === 'number' ? membro.santidade : ''}</b></span>
    </div>` : '';
  const ofensiva = membro ? `
    <section class="cd-cartao cd-ofensiva">
      <span class="cd-ofensiva-chama" aria-hidden="true">${iconeDaColuna('chama')}</span>
      <span class="cd-ofensiva-textos"><b>${Number(membro.ofensiva) || 0}</b><small>${escaparDaColuna(tr('dias de ofensiva'))}</small></span>
    </section>` : `
    <section class="cd-cartao cd-entrar">
      <strong>${escaparDaColuna(tr('Guarde o seu progresso'))}</strong>
      <button type="button" class="licao-botao" data-cd-ir="entrar">${escaparDaColuna(tr('Entrar ou criar conta'))}</button>
    </section>`;
  coluna.innerHTML = `${numeros}${ofensiva}${cartaoDaLigaNaColuna()}${cartaoDosDesafiosNaColuna()}
    <section class="cd-cartao cd-xadrez">
      <div class="cd-cartao-topo"><strong>${escaparDaColuna(tr('Jogue xadrez'))}</strong></div>
      <div class="cd-xadrez-arte" aria-hidden="true">${typeof xadrezPecaSvg === 'function' ? ['K', 'q', 'N'].map((p) => xadrezPecaSvg(p)).join('') : ''}</div>
      <button type="button" class="licao-botao" data-cd-ir="xadrez">${escaparDaColuna(tr('Jogar com a Lumina'))}</button>
    </section>`;
  coluna.querySelectorAll('[data-cd-ir]').forEach((botao) => botao.addEventListener('click', () => irDaColunaDireita(botao.dataset.cdIr)));
  if (membro && membro.tipo === 'adulto') carregarLigaDaColuna();
}

function irDaColunaDireita(destino) {
  if (destino === 'ranking' && typeof abrirRanking === 'function') abrirRanking();
  else if (destino === 'trilhas' && typeof abrirTrilhas === 'function') abrirTrilhas();
  else if (destino === 'entrar' && typeof irParaLogin === 'function') irParaLogin();
  else if (destino === 'xadrez' && typeof abrirJogos === 'function') {
    abrirJogos();
    setTimeout(() => { if (typeof comecarJogo === 'function') comecarJogo('xadrez'); }, 60);
  }
}

function iniciarLayoutDoComputador() {
  if (!document.getElementById('coluna-direita')) {
    const coluna = document.createElement('aside');
    coluna.id = 'coluna-direita';
    coluna.className = 'coluna-direita';
    coluna.hidden = true;
    coluna.setAttribute('aria-label', tr('Seu progresso'));
    document.body.appendChild(coluna);
  }
  if (typeof MutationObserver === 'function') {
    new MutationObserver(() => desenharColunaDireita()).observe(document.body, { attributes: true, attributeFilter: ['data-vista'] });
  }
  if (window.matchMedia) {
    const consulta = window.matchMedia(`(min-width: ${LARGURA_DA_COLUNA_DIREITA}px)`);
    if (consulta.addEventListener) consulta.addEventListener('change', desenharColunaDireita);
  }
  if (typeof desenharCaixaDeDesafios === 'function') {
    const original = desenharCaixaDeDesafios;
    desenharCaixaDeDesafios = function desenharCaixaDeDesafiosComColuna() {
      original();
      desenharColunaDireita();
    };
  }
  document.addEventListener('lumina-idioma', desenharColunaDireita);
  desenharColunaDireita();
}

document.addEventListener('DOMContentLoaded', () => {
  if (typeof rodarComSeguranca === 'function') rodarComSeguranca('layout-computador', iniciarLayoutDoComputador);
  else iniciarLayoutDoComputador();
});
