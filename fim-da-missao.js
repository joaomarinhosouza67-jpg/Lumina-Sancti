const DIAS_DA_SEMANA_DO_FIM = { pt: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'], en: ['S', 'M', 'T', 'W', 'T', 'F', 'S'], es: ['D', 'L', 'M', 'X', 'J', 'V', 'S'] };

function escaparDoFim(texto) {
  return String(texto == null ? '' : texto).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

function guardarComoEstavaAntesDaMissao() {
  if (!licaoAtual) return;
  const desafios = typeof caixasDoDia !== 'undefined' && caixasDoDia && caixasDoDia.desafios;
  licaoAtual.desafiosAntes = desafios && Array.isArray(desafios.itens) ? desafios.itens.map((i) => ({ id: i.id, tipo: i.tipo, progresso: Number(i.progresso) || 0, meta: Number(i.meta) || 1, feito: !!i.feito })) : null;
  licaoAtual.ligaAntes = null;
  const membro = typeof obterMembroAtivo === 'function' ? obterMembroAtivo() : null;
  if (!membro || membro.tipo !== 'adulto' || typeof supabaseCliente === 'undefined' || !supabaseCliente) return;
  const minhaLicao = licaoAtual;
  supabaseCliente.rpc('ranking_da_semana', { _pid: membro.id }).then(({ data }) => {
    if (minhaLicao !== licaoAtual || !data) return;
    const eu = (data.lista || []).find((l) => l.eu);
    licaoAtual.ligaAntes = { liga: Number(data.liga) || 0, posicao: eu ? eu.posicao : null };
  }).catch(() => {});
}

const FAISCAS_DA_CHAMA = [[-78, -62, 0], [76, -70, 0.03], [-52, -116, 0.05], [54, -112, 0.02], [-18, -148, 0.06], [20, -140, 0.04], [-96, -22, 0.01], [94, -30, 0.05], [-36, -84, 0.03], [38, -90, 0.02], [0, -120, 0.04], [-64, -8, 0.06]];

function htmlDaChamaGrande() {
  return `<svg class="fim-chama-svg" viewBox="0 0 120 150" aria-hidden="true">
    <defs>
      <radialGradient id="fim-chama-fora" cx="50%" cy="78%" r="70%"><stop offset="0" stop-color="#ffe066"/><stop offset=".45" stop-color="#ffb02e"/><stop offset="1" stop-color="#ff6a1a"/></radialGradient>
      <radialGradient id="fim-chama-dentro" cx="50%" cy="80%" r="70%"><stop offset="0" stop-color="#ffffff"/><stop offset=".5" stop-color="#fff3b0"/><stop offset="1" stop-color="#ffd25c"/></radialGradient>
    </defs>
    <g class="fim-chama-corpo">
      <path class="fim-chama-fora" d="M60 6 C76 30 98 46 98 84 C98 116 80 140 60 140 C40 140 22 116 22 84 C22 62 34 50 40 34 C46 46 50 52 54 54 C54 36 56 20 60 6 Z" fill="url(#fim-chama-fora)"/>
      <path class="fim-chama-dentro" d="M60 62 C70 76 80 86 80 104 C80 122 71 134 60 134 C49 134 40 122 40 104 C40 92 46 84 50 76 C53 84 56 88 58 88 C58 78 58 70 60 62 Z" fill="url(#fim-chama-dentro)"/>
    </g>
  </svg>`;
}

function htmlDaEstrelaDaChama() {
  return `<svg viewBox="0 0 100 100" aria-hidden="true">
    <defs>
      <radialGradient id="fim-estrela-cor" cx="50%" cy="45%" r="60%"><stop offset="0" stop-color="#fffdf0"/><stop offset=".35" stop-color="#ffe98a"/><stop offset="1" stop-color="#f5b32a"/></radialGradient>
    </defs>
    <path d="M50 6 L62.93 34.2 L93.75 37.79 L70.92 58.8 L77.04 89.21 L50 74 L22.96 89.21 L29.08 58.8 L6.25 37.79 L37.07 34.2 Z" fill="url(#fim-estrela-cor)" stroke="#f7c548" stroke-width="6" stroke-linejoin="round"/>
    <path d="M50 30 L55 43 L68 45 L58 54 L61 67 L50 60 L39 67 L42 54 L32 45 L45 43 Z" fill="#fffef6" opacity=".75"/>
  </svg>`;
}

function htmlDoPalcoDaChama() {
  const faiscas = FAISCAS_DA_CHAMA.map(([x, y, d]) => `<i style="--x:${x}px;--y:${y}px;--d:${d}s"></i>`).join('');
  return `<div class="fim-ofensiva-chama" aria-hidden="true">
    <span class="fim-chama-anel"></span>
    <div class="fim-chama-voo"><span class="fim-chama-brilho"></span>${htmlDaChamaGrande()}<span class="fim-chama-brasas"><i></i><i></i><i></i><i></i></span></div>
    <span class="fim-chama-estrela">${htmlDaEstrelaDaChama()}</span>
    <span class="fim-chama-clarao"></span>
    <span class="fim-ofensiva-faiscas">${faiscas}</span>
  </div>`;
}

function mostrarPassoDaOfensiva(antes, depois) {
  const corpo = document.getElementById('licao-corpo');
  if (!corpo) return false;
  const hoje = new Date().getDay();
  const acesos = new Set();
  for (let i = 0; i < Math.min(depois, 7); i += 1) acesos.add((hoje - i + 7) % 7);
  corpo.innerHTML = `
    <div class="fim-passo fim-ofensiva">
      ${htmlDoPalcoDaChama()}
      <strong class="fim-ofensiva-numero" id="fim-ofensiva-numero">${antes}</strong>
      <h2>${escaparDoFim(tr(depois === 1 ? 'dia de ofensiva' : 'dias de ofensiva'))}</h2>
      <div class="fim-semana">${(DIAS_DA_SEMANA_DO_FIM[typeof idiomaAtual !== 'undefined' ? idiomaAtual : 'pt'] || DIAS_DA_SEMANA_DO_FIM.pt).map((d, i) => `<span class="fim-dia${acesos.has(i) ? ' aceso' : ''}${i === hoje ? ' hoje' : ''}" style="--i:${(i - hoje + 7) % 7}"><small>${escaparDoFim(d)}</small><i>${typeof icone === 'function' ? icone(acesos.has(i) ? 'check' : 'chama') : ''}</i></span>`).join('')}</div>
    </div>`;
  const numero = corpo.querySelector('#fim-ofensiva-numero');
  const semMovimento = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  setTimeout(() => {
    if (!numero.isConnected) return;
    numero.textContent = String(depois);
    numero.classList.add('subiu');
    if (typeof somDaLicao === 'function') somDaLicao('certo');
  }, semMovimento ? 400 : 3000);
  prepararRodapeDaLicao(tr('Continuar'), true);
  return true;
}

async function mostrarPassoDosDesafios() {
  const antes = licaoAtual && licaoAtual.desafiosAntes;
  if (!antes || typeof chamarDosBaus !== 'function') return false;
  let dados = null;
  try { dados = await chamarDosBaus('desafios_hoje'); } catch (e) { dados = null; }
  if (dados && typeof somarFeDosDesafios === 'function') somarFeDosDesafios(dados, true);
  if (!dados || !Array.isArray(dados.itens) || !licaoAtual) return false;
  const mudou = dados.itens.filter((item) => {
    const velho = antes.find((a) => a.id === item.id && a.tipo === item.tipo);
    return !velho || Number(item.progresso) > velho.progresso;
  });
  if (!mudou.length) return false;
  const completos = dados.itens.filter((i) => i.feito).length;
  const corpo = document.getElementById('licao-corpo');
  if (!corpo) return false;
  const tipos = typeof TIPOS_DE_DESAFIO !== 'undefined' ? TIPOS_DE_DESAFIO : {};
  const titulo = dados.completo ? tr('Desafios do dia completos!') : (mudou.some((i) => i.feito) ? tr('Desafio do dia concluído!') : tr('Desafios do dia'));
  corpo.innerHTML = `
    <div class="fim-passo fim-desafios">
      <h2>${escaparDoFim(titulo)}</h2>
      <ul class="fim-desafios-lista">${dados.itens.map((item, n) => {
        const velho = antes.find((a) => a.id === item.id && a.tipo === item.tipo) || { progresso: 0 };
        const meta = Math.max(1, Number(item.meta));
        const de = Math.min(100, Math.round((velho.progresso / meta) * 100));
        const para = Math.min(100, Math.round((Number(item.progresso) / meta) * 100));
        const info = tipos[item.tipo] || { icone: 'estrela' };
        return `<li class="${item.feito ? 'feito' : ''}" style="--i:${n}"><span class="fim-desafio-icone">${typeof icone === 'function' ? icone(info.icone) : ''}</span><span class="fim-desafio-textos"><b>${escaparDoFim(typeof textoDoDesafio === 'function' ? textoDoDesafio(item) : '')}</b><span class="fim-barra"><i data-de="${de}" data-para="${para}" style="width:${de}%"></i><em>${Math.min(item.progresso, meta)} / ${meta}</em></span></span><span class="fim-desafio-fe">${typeof icone === 'function' ? icone('estrela') : ''}+${Number(item.fe) || 10}</span></li>`;
      }).join('')}</ul>
      ${dados.completo && dados.bau_id ? `<button type="button" class="fim-abrir-bau" id="fim-abrir-bau">${typeof svgDoBau === 'function' ? svgDoBau(dados.bau_tipo || 'madeira', 64) : ''}<span>${escaparDoFim(tr('Abrir baú'))}</span></button>` : `<p class="fim-desafios-conta">${completos}/${dados.itens.length}</p>`}
    </div>`;
  requestAnimationFrame(() => setTimeout(() => {
    corpo.querySelectorAll('.fim-barra i').forEach((barra) => { barra.style.width = `${barra.dataset.para}%`; });
  }, 350));
  if (dados.completo && dados.bau_id) {
    if (typeof desafiosJaAvisados !== 'undefined' && desafiosJaAvisados && desafiosJaAvisados.add) desafiosJaAvisados.add(`${dados.dia}:${dados.bau_id}`);
    const botao = corpo.querySelector('#fim-abrir-bau');
    if (botao && typeof abrirBau === 'function') botao.addEventListener('click', () => { botao.disabled = true; abrirBau(Number(dados.bau_id), dados.bau_tipo); });
  }
  if (typeof caixasDoDia !== 'undefined' && caixasDoDia) { caixasDoDia.desafios = dados; if (typeof desenharCaixaDeDesafios === 'function') desenharCaixaDeDesafios(); }
  prepararRodapeDaLicao(tr('Continuar'), true);
  return true;
}

async function mostrarPassoDaLiga() {
  const antes = licaoAtual && licaoAtual.ligaAntes;
  const membro = typeof obterMembroAtivo === 'function' ? obterMembroAtivo() : null;
  if (!membro || membro.tipo !== 'adulto' || typeof supabaseCliente === 'undefined' || !supabaseCliente) return false;
  let dados = null;
  try { const r = await supabaseCliente.rpc('ranking_da_semana', { _pid: membro.id }); dados = r.data; } catch (e) { dados = null; }
  if (!dados || !licaoAtual) return false;
  const linhas = Array.isArray(dados.lista) ? dados.lista : [];
  const eu = linhas.find((l) => l.eu);
  if (!eu) return false;
  const posicaoAntes = antes && antes.posicao ? antes.posicao : null;
  if (posicaoAntes !== null && eu.posicao >= posicaoAntes) return false;
  const liga = typeof ligaDoIndice === 'function' ? ligaDoIndice(Number(dados.liga) || 0) : { nome: '' };
  const inicio = Math.max(0, linhas.indexOf(eu) - 2);
  const mostrar = linhas.slice(inicio, inicio + 5);
  const subiu = posicaoAntes !== null ? Math.min(posicaoAntes - eu.posicao, mostrar.length - 1 - mostrar.indexOf(eu)) : 0;
  const corpo = document.getElementById('licao-corpo');
  if (!corpo) return false;
  const titulo = posicaoAntes === null ? tr('Você entrou na Liga {nome}!', { nome: tr(liga.nome || '') }) : tr('Você subiu para o {n}º lugar!', { n: eu.posicao });
  corpo.innerHTML = `
    <div class="fim-passo fim-liga">
      <span class="fim-liga-emblema">${typeof emblemaDaLiga === 'function' ? emblemaDaLiga(Number(dados.liga) || 0) : ''}</span>
      <h2>${escaparDoFim(titulo)}</h2>
      <ol class="fim-liga-lista">${mostrar.map((l) => `<li class="${l.eu ? 'eu' : ''}"${l.eu && subiu > 0 ? ` style="--subiu:${subiu}"` : ''}><b>${l.posicao}</b><span>${escaparDoFim(l.eu ? tr('Você') : l.nome)}</span><em>${Number(l.fe) || 0} ${escaparDoFim(tr('Fé'))}</em></li>`).join('')}</ol>
    </div>`;
  prepararRodapeDaLicao(tr('Continuar'), true);
  return true;
}

function montarPassosDoFim({ ofensivaSubiu, ofensivaAntes, ofensivaDepois }) {
  const passos = [];
  if (ofensivaSubiu && ofensivaDepois > 0) passos.push(() => mostrarPassoDaOfensiva(Math.max(0, ofensivaAntes), ofensivaDepois));
  if (!(typeof perfilEhInfantil === 'function' && perfilEhInfantil())) {
    passos.push(mostrarPassoDosDesafios);
    passos.push(mostrarPassoDaLiga);
  }
  return passos;
}

async function avancarFimDaMissao() {
  if (!licaoAtual || licaoAtual.avancandoFim) return true;
  licaoAtual.avancandoFim = true;
  const botao = document.getElementById('licao-botao');
  if (botao) botao.disabled = true;
  if (typeof pararAnimacoesRive === 'function') pararAnimacoesRive();
  try {
    while (licaoAtual && Array.isArray(licaoAtual.passosDoFim) && licaoAtual.passosDoFim.length) {
      const passo = licaoAtual.passosDoFim.shift();
      let mostrou = false;
      try { mostrou = await passo(); } catch (e) { mostrou = false; }
      if (mostrou) return true;
    }
    return false;
  } finally {
    if (licaoAtual) licaoAtual.avancandoFim = false;
    if (botao) botao.disabled = false;
  }
}
