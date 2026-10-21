const CACHE_DO_WIDGET_DO_SITE = 'lumina-widget';
const ENDERECO_DO_MEU_DIA = '/widgets/meu-dia.json';

function diaDeHojeDoWidget() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function chaveDaMissaoDoWidget(id) {
  return `lumina-sancti-widget-missao-${id}`;
}

function avisarWidgetDoLumina() {
  try {
    if (navigator.serviceWorker && navigator.serviceWorker.controller) navigator.serviceWorker.controller.postMessage({ tipo: 'atualizar-widget' });
  } catch (e) {
  }
}

async function guardarDiaDoWidget() {
  if (!('caches' in window)) return;
  const membro = typeof obterMembroAtivo === 'function' ? obterMembroAtivo() : null;
  const logado = typeof contaLogada === 'function' && contaLogada();
  let dados = null;
  if (membro && logado) {
    const hoje = diaDeHojeDoWidget();
    let marcado = '';
    try { marcado = localStorage.getItem(chaveDaMissaoDoWidget(membro.id)) || ''; } catch (e) { marcado = ''; }
    dados = {
      nome: String(membro.nome || '').trim().split(/\s+/)[0] || '',
      ofensiva: Math.max(0, Number(membro.ofensiva || 0)),
      fezHoje: String(membro.ultimoDia || '').slice(0, 10) === hoje || marcado === hoje,
      dia: hoje,
      idioma: typeof idiomaAtual !== 'undefined' ? idiomaAtual : 'pt',
    };
  }
  try {
    const cache = await caches.open(CACHE_DO_WIDGET_DO_SITE);
    if (dados) await cache.put(ENDERECO_DO_MEU_DIA, new Response(JSON.stringify(dados), { headers: { 'Content-Type': 'application/json' } }));
    else await cache.delete(ENDERECO_DO_MEU_DIA);
  } catch (e) {
    return;
  }
  avisarWidgetDoLumina();
}

function marcarMissaoDeHojeNoWidget() {
  const membro = typeof obterMembroAtivo === 'function' ? obterMembroAtivo() : null;
  if (!membro) return;
  try { localStorage.setItem(chaveDaMissaoDoWidget(membro.id), diaDeHojeDoWidget()); } catch (e) {}
  guardarDiaDoWidget();
}

async function pedirAtualizacaoDoWidget() {
  try {
    if (!('serviceWorker' in navigator)) return;
    const registro = await navigator.serviceWorker.ready;
    if (!registro || !('periodicSync' in registro) || !navigator.permissions) return;
    const permissao = await navigator.permissions.query({ name: 'periodic-background-sync' });
    if (permissao.state === 'granted') await registro.periodicSync.register('lumina-widget', { minInterval: 6 * 60 * 60 * 1000 });
  } catch (e) {
  }
}

document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => { guardarDiaDoWidget(); pedirAtualizacaoDoWidget(); }, 5000);
  document.addEventListener('visibilitychange', () => { if (!document.hidden) guardarDiaDoWidget(); });
});
