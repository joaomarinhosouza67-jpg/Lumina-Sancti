let inicioDoSite = null;
let agendaDoInicio = null;
let eventosJaPegos = new Set();
let eventosDoPerfil = null;
let eventoJaOferecido = false;

function trDoEvento(texto, valores) {
  return typeof tr === 'function' ? tr(texto, valores) : String(texto).replace(/\{(\w+)\}/g, (_, k) => (valores && valores[k] !== undefined ? valores[k] : ''));
}

function escaparDoEvento(texto) {
  return String(texto || '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

function diaDeHojeDoSite() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function perfilDoEvento() {
  if (typeof contaLogada === 'function' && !contaLogada()) return null;
  const membro = typeof obterMembroAtivo === 'function' ? obterMembroAtivo() : null;
  return membro && membro.id ? membro : null;
}

async function carregarInicioDoSite() {
  if (typeof supabaseCliente === 'undefined' || !supabaseCliente) return;
  try {
    const { data, error } = await supabaseCliente.rpc('inicio_do_site', { _dia: diaDeHojeDoSite() });
    if (error || !data) return;
    inicioDoSite = data;
    agendaDoInicio = data.agenda || null;
    await aplicarManutencao();
    if (agendaDoInicio) aplicarAgendaDoInicio();
    await desenharEventosDoSite();
  } catch (e) {
    return;
  }
}

async function souDaEquipe() {
  if (typeof contaLogada === 'function' && !contaLogada()) return false;
  try {
    const { data } = await supabaseCliente.rpc('equipe_membro');
    return !!data;
  } catch (e) {
    return false;
  }
}

async function aplicarManutencao() {
  const m = inicioDoSite && inicioDoSite.manutencao;
  const antiga = document.getElementById('manutencao-tela');
  if (!m || !m.ligado) {
    if (antiga) antiga.remove();
    return;
  }
  if (await souDaEquipe()) return;
  if (antiga) return;
  const tela = document.createElement('div');
  tela.id = 'manutencao-tela';
  tela.className = 'manutencao-tela';
  tela.setAttribute('role', 'alertdialog');
  tela.setAttribute('aria-modal', 'true');
  tela.innerHTML = `
    <div class="manutencao-caixa">
      <svg class="manutencao-estrela" viewBox="0 0 100 100" aria-hidden="true"><path d="M50 2 C52 36 64 48 98 50 C64 52 52 64 50 98 C48 64 36 52 2 50 C36 48 48 36 50 2 Z" fill="#f0cf7a"/></svg>
      <h2>${escaparDoEvento(trDoEvento('Em manutenção'))}</h2>
      ${m.mensagem ? `<p>${escaparDoEvento(m.mensagem)}</p>` : ''}
      <button type="button" class="bau-botao" id="manutencao-de-novo">${escaparDoEvento(trDoEvento('Tentar de novo'))}</button>
    </div>`;
  document.body.appendChild(tela);
  tela.querySelector('#manutencao-de-novo').addEventListener('click', () => location.reload());
}

function aplicarAgendaDoInicio() {
  try {
    if (typeof renderSantoDoDia === 'function' && agendaDoInicio.santo) renderSantoDoDia();
    if (typeof renderizarFraseDoDiaNoInicio === 'function' && agendaDoInicio.frase) renderizarFraseDoDiaNoInicio();
    if (typeof renderizarDestaquesDasOracoes === 'function' && (agendaDoInicio.oracao || agendaDoInicio.frase)) renderizarDestaquesDasOracoes();
  } catch (e) {
    return;
  }
}

function fimDoEventoEmTexto(fim) {
  const falta = new Date(fim).getTime() - Date.now();
  if (!(falta > 0)) return '';
  const horas = Math.floor(falta / 3600000);
  if (horas >= 48) return trDoEvento('{n} dias', { n: Math.ceil(horas / 24) });
  if (horas >= 1) return trDoEvento('{n} h', { n: horas });
  return trDoEvento('{n} min', { n: Math.max(1, Math.ceil(falta / 60000)) });
}

async function carregarEventosPegos() {
  const perfil = perfilDoEvento();
  if (!perfil) {
    eventosJaPegos = new Set();
    eventosDoPerfil = null;
    return;
  }
  if (eventosDoPerfil === perfil.id) return;
  try {
    const { data } = await supabaseCliente.rpc('eventos_resgatados', { _pid: perfil.id });
    eventosJaPegos = new Set(Array.isArray(data) ? data.map(Number) : []);
    eventosDoPerfil = perfil.id;
  } catch (e) {
    eventosJaPegos = new Set();
  }
}

function desenhoDoEvento(evento) {
  if (evento.tipo === 'bau' && typeof svgDoBau === 'function') return svgDoBau(evento.presente || 'prata', 64);
  if (typeof svgDoFrasco === 'function') return svgDoFrasco(evento.tipo === 'fe_dobro' ? 'fe_dobro' : (evento.presente || 'fe_dobro'), 46);
  return '';
}

function chaveDoEventoVisto(evento) {
  const perfil = perfilDoEvento();
  return `lumina-sancti-evento-visto-${evento.id}-${perfil ? perfil.id : 'sem'}`;
}

function eventoJaVisto(evento) {
  try { return localStorage.getItem(chaveDoEventoVisto(evento)) === '1'; } catch (e) { return false; }
}

function marcarEventoVisto(evento) {
  try { localStorage.setItem(chaveDoEventoVisto(evento), '1'); } catch (e) { }
}

function telaLivreParaEvento() {
  if (document.getElementById('bau-janela') || document.getElementById('liga-tela') || document.getElementById('manutencao-tela')) return false;
  if (document.body.classList.contains('intro-ativa')) return false;
  const ativa = document.querySelector('.view.active');
  return !!ativa && ['view-home', 'view-trilhas'].includes(ativa.id);
}

function mostrarEventoEmTelaCheia(evento) {
  if (typeof janelaDoBau !== 'function') return;
  marcarEventoVisto(evento);
  const ehBau = evento.tipo === 'bau';
  const ehFe = evento.tipo === 'fe_dobro';
  const tempo = fimDoEventoEmTexto(evento.fim);
  const arte = ehBau && typeof bauEm3d === 'function'
    ? bauEm3d(evento.presente || 'prata', 220)
    : (typeof svgDoFrasco === 'function' ? svgDoFrasco(ehFe ? 'fe_dobro' : (evento.presente || 'fe_dobro'), 150) : '');
  const fundo = janelaDoBau(`
    <span class="bau-rotulo">${escaparDoEvento(trDoEvento(ehFe ? 'Evento' : 'Presente'))}</span>
    <strong class="bau-titulo">${escaparDoEvento(evento.titulo)}</strong>
    <div class="evento-tela-palco"><span class="bau-raios" aria-hidden="true"></span><div class="evento-tela-arte">${arte}</div></div>
    ${tempo ? `<span class="frasco-tempo"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="13" r="8" fill="none" stroke="currentColor" stroke-width="2"/><path d="M12 9v4l3 2M9 2h6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>${escaparDoEvento(tempo)}</span>` : ''}
    <div class="bau-botoes-coluna">
      <button type="button" class="bau-botao" id="evento-tela-sim">${escaparDoEvento(trDoEvento(ehFe ? 'Fazer missão' : (ehBau ? 'Abrir baú' : 'Pegar')))}</button>
      <button type="button" class="bau-botao-texto" id="evento-tela-nao">${escaparDoEvento(trDoEvento('Agora não'))}</button>
    </div>`, 'tela-cheia evento-tela');
  fundo.querySelector('#evento-tela-nao').addEventListener('click', fecharJanelaDoBau);
  const sim = fundo.querySelector('#evento-tela-sim');
  sim.addEventListener('click', async () => {
    if (ehFe) {
      fecharJanelaDoBau();
      if (typeof abrirTrilhas === 'function') abrirTrilhas();
      return;
    }
    const perfil = perfilDoEvento();
    if (!perfil) { fecharJanelaDoBau(); if (typeof irParaLogin === 'function') irParaLogin(); return; }
    sim.disabled = true;
    try {
      const { data, error } = await supabaseCliente.rpc('evento_resgatar', { _pid: perfil.id, _id: Number(evento.id) });
      if (error) throw error;
      eventosJaPegos.add(Number(evento.id));
      if (data && data.bau_id) {
        abrirBau(Number(data.bau_id), data.tipo, { titulo: evento.titulo, rotulo: trDoEvento('Presente') });
      } else if (data && data.frasco) {
        fecharJanelaDoBau();
        if (typeof atualizarCaixasDoDia === 'function') await atualizarCaixasDoDia();
        if (typeof mostrarFrasco === 'function') mostrarFrasco(data.frasco);
      }
      desenharEventosDoSite();
    } catch (erro) {
      if (String((erro && erro.message) || '').includes('evento_ja_resgatado')) {
        eventosJaPegos.add(Number(evento.id));
        fecharJanelaDoBau();
        desenharEventosDoSite();
        return;
      }
      sim.disabled = false;
    }
  });
}

let procurandoEventoParaMostrar = false;

function oferecerEventoEmTelaCheia(eventos) {
  if (eventoJaOferecido || procurandoEventoParaMostrar) return;
  procurandoEventoParaMostrar = true;
  let tentativas = 0;
  const tentar = async () => {
    tentativas += 1;
    if (eventoJaOferecido) { procurandoEventoParaMostrar = false; return; }
    if (perfilDoEvento() && telaLivreParaEvento()) {
      await carregarEventosPegos();
      const proximo = eventos.find((e) => new Date(e.fim).getTime() > Date.now() && !eventoJaVisto(e) && (e.tipo === 'fe_dobro' || !eventosJaPegos.has(Number(e.id))));
      procurandoEventoParaMostrar = false;
      if (!proximo) return;
      eventoJaOferecido = true;
      mostrarEventoEmTelaCheia(proximo);
      return;
    }
    if (tentativas < 40) setTimeout(tentar, 1500);
    else procurandoEventoParaMostrar = false;
  };
  setTimeout(tentar, 900);
}

async function desenharEventosDoSite() {
  const lugar = document.getElementById('evento-inicio');
  if (!lugar) return;
  await carregarEventosPegos();
  const eventos = (inicioDoSite && Array.isArray(inicioDoSite.eventos) ? inicioDoSite.eventos : [])
    .filter((e) => new Date(e.fim).getTime() > Date.now())
    .filter((e) => e.tipo === 'fe_dobro' || !eventosJaPegos.has(Number(e.id)));
  if (!eventos.length) {
    lugar.hidden = true;
    lugar.innerHTML = '';
    return;
  }
  if (!document.getElementById('bau-janela')) oferecerEventoEmTelaCheia(eventos);
  lugar.hidden = false;
  lugar.innerHTML = eventos.map((e) => {
    const pego = eventosJaPegos.has(Number(e.id));
    const tempo = fimDoEventoEmTexto(e.fim);
    const acao = e.tipo === 'fe_dobro'
      ? `<button type="button" class="evento-botao" data-evento-ir="trilhas">${escaparDoEvento(trDoEvento('Fazer missão'))}</button>`
      : (pego ? `<span class="evento-pego">${typeof icone === 'function' ? icone('check') : ''}${escaparDoEvento(trDoEvento('Pego'))}</span>`
        : `<button type="button" class="evento-botao" data-evento-pegar="${Number(e.id)}" data-tipo="${escaparDoEvento(e.tipo)}">${escaparDoEvento(trDoEvento('Pegar'))}</button>`);
    return `
      <article class="evento-cartao evento-${escaparDoEvento(e.tipo)}">
        <span class="evento-arte" aria-hidden="true">${desenhoDoEvento(e)}</span>
        <span class="evento-textos">
          <strong>${escaparDoEvento(e.titulo)}</strong>
          ${tempo ? `<small class="evento-tempo"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="13" r="8" fill="none" stroke="currentColor" stroke-width="2"/><path d="M12 9v4l3 2M9 2h6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>${escaparDoEvento(tempo)}</small>` : ''}
        </span>
        ${acao}
      </article>`;
  }).join('');
  lugar.querySelectorAll('[data-evento-ir]').forEach((botao) => botao.addEventListener('click', () => { if (typeof abrirTrilhas === 'function') abrirTrilhas(); }));
  lugar.querySelectorAll('[data-evento-pegar]').forEach((botao) => botao.addEventListener('click', () => pegarPresenteDoEvento(botao)));
}

async function pegarPresenteDoEvento(botao) {
  const perfil = perfilDoEvento();
  if (!perfil) {
    if (typeof irParaLogin === 'function') irParaLogin();
    return;
  }
  botao.disabled = true;
  try {
    const { data, error } = await supabaseCliente.rpc('evento_resgatar', { _pid: perfil.id, _id: Number(botao.dataset.eventoPegar) });
    if (error) throw error;
    eventosJaPegos.add(Number(botao.dataset.eventoPegar));
    if (data && data.bau_id && typeof abrirBau === 'function') abrirBau(Number(data.bau_id), data.tipo);
    else if (data && data.frasco) {
      if (typeof atualizarCaixasDoDia === 'function') await atualizarCaixasDoDia();
      if (typeof mostrarFrasco === 'function') mostrarFrasco(data.frasco);
    }
    desenharEventosDoSite();
  } catch (erro) {
    const texto = String((erro && erro.message) || '');
    if (texto.includes('evento_ja_resgatado')) {
      eventosJaPegos.add(Number(botao.dataset.eventoPegar));
      desenharEventosDoSite();
      return;
    }
    botao.disabled = false;
    if (typeof mostrarAvisoTrilhas === 'function') mostrarAvisoTrilhas(trDoEvento('Não deu para pegar agora. Tente de novo.'));
  }
}

function abrirCodigoDePresente() {
  const perfil = perfilDoEvento();
  if (!perfil) {
    if (typeof irParaLogin === 'function') irParaLogin();
    return;
  }
  if (typeof janelaDoBau !== 'function') return;
  const fundo = janelaDoBau(`
    <div class="codigo-presente-arte" aria-hidden="true">${typeof svgDoBau === 'function' ? svgDoBau('ouro', 96) : ''}</div>
    <strong class="bau-titulo">${escaparDoEvento(trDoEvento('Código de presente'))}</strong>
    <form class="codigo-presente-form" id="codigo-presente-form">
      <input type="text" id="codigo-presente-campo" maxlength="24" autocomplete="off" autocapitalize="characters" spellcheck="false" aria-label="${escaparDoEvento(trDoEvento('Código de presente'))}" placeholder="NATAL2026">
      <p class="frasco-aviso" id="codigo-presente-aviso" aria-live="polite"></p>
      <div class="bau-botoes">
        <button type="submit" class="bau-botao" id="codigo-presente-usar">${escaparDoEvento(trDoEvento('Usar'))}</button>
        <button type="button" class="bau-botao bau-botao-claro" id="codigo-presente-fechar">${escaparDoEvento(trDoEvento('Fechar'))}</button>
      </div>
    </form>`, 'janela-codigo');
  const campo = fundo.querySelector('#codigo-presente-campo');
  const aviso = fundo.querySelector('#codigo-presente-aviso');
  const usar = fundo.querySelector('#codigo-presente-usar');
  setTimeout(() => campo.focus(), 80);
  fundo.querySelector('#codigo-presente-fechar').addEventListener('click', fecharJanelaDoBau);
  fundo.querySelector('#codigo-presente-form').addEventListener('submit', async (evento) => {
    evento.preventDefault();
    const codigo = campo.value.trim();
    if (codigo.length < 4) { campo.focus(); return; }
    usar.disabled = true;
    aviso.textContent = '';
    try {
      const { data, error } = await supabaseCliente.rpc('codigo_resgatar', { _pid: perfil.id, _codigo: codigo });
      if (error) throw error;
      if (data && data.tipo === 'bau') {
        abrirBau(Number(data.bau_id), data.bau_tipo);
        return;
      }
      if (data && data.tipo === 'frasco') {
        if (typeof atualizarCaixasDoDia === 'function') await atualizarCaixasDoDia();
        mostrarFrasco(data.frasco);
        return;
      }
      fecharJanelaDoBau();
      if (typeof mostrarAvisoTrilhas === 'function') {
        mostrarAvisoTrilhas(data && data.tipo === 'fe'
          ? trDoEvento('+{n} de Fé', { n: data.quantidade })
          : trDoEvento('Plano liberado por {n} dias', { n: data && data.dias }));
      }
    } catch (erro) {
      const texto = String((erro && erro.message) || '');
      aviso.textContent = texto.includes('codigo_ja_usado') ? trDoEvento('Você já usou este código.')
        : texto.includes('tentativas_demais') ? trDoEvento('Muitas tentativas. Tente mais tarde.')
          : texto.includes('codigo_invalido') ? trDoEvento('Código inválido.')
            : trDoEvento('Não deu para usar agora. Tente de novo.');
      usar.disabled = false;
    }
  });
}

function iniciarEventosDoSite() {
  document.addEventListener('click', (evento) => {
    if (evento.target && evento.target.closest && evento.target.closest('#meu-perfil-codigo')) abrirCodigoDePresente();
  });
  setTimeout(carregarInicioDoSite, 1200);
  setInterval(() => { if (document.visibilityState === 'visible') carregarInicioDoSite(); }, 10 * 60 * 1000);
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', iniciarEventosDoSite);
else iniciarEventosDoSite();
