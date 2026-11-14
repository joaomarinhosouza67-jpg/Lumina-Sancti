const ERROS_JA_ENVIADOS = new Set();
const ERROS_ESPERANDO = [];
let errosNestaPagina = 0;

function aparelhoDoErro() {
  const ua = navigator.userAgent || '';
  const aparelho = /iPhone/.test(ua) ? 'iPhone' : /iPad/.test(ua) ? 'iPad' : /Android/.test(ua) ? 'Android' : /Windows/.test(ua) ? 'Windows' : /Mac OS/.test(ua) ? 'Mac' : 'Outro';
  const navegador = /Edg\//.test(ua) ? 'Edge' : /SamsungBrowser/.test(ua) ? 'Samsung Internet' : /Chrome\//.test(ua) ? 'Chrome' : /Firefox\//.test(ua) ? 'Firefox' : /Safari\//.test(ua) ? 'Safari' : 'Navegador';
  return `${aparelho} · ${navegador}`;
}

function paginaDoErro() {
  const ativa = document.querySelector('.view.active');
  return ativa && ativa.id ? ativa.id : (location.pathname || '/');
}

function erroQueNaoEhDoSite(origem, mensagem) {
  return /^(chrome|moz|safari|safari-web)-extension:/.test(origem || '')
    || /ResizeObserver loop|^Script error\.?$|AbortError|Failed to fetch|NetworkError|Load failed|The operation was aborted/i.test(mensagem || '');
}

function mandarErro(dados) {
  if (typeof supabaseCliente === 'undefined' || !supabaseCliente) {
    ERROS_ESPERANDO.push(dados);
    return;
  }
  try {
    Promise.resolve(supabaseCliente.rpc('registrar_erro', dados)).then(() => {}, () => {});
  } catch (e) {
    return;
  }
}

function enviarErroDoSite(mensagem, origem) {
  const texto = String(mensagem || '').replace(/\s+/g, ' ').trim().slice(0, 300);
  const de = String(origem || '').slice(0, 200);
  if (!texto || erroQueNaoEhDoSite(de, texto)) return;
  const chave = `${texto}|${de}`;
  if (ERROS_JA_ENVIADOS.has(chave) || errosNestaPagina >= 8) return;
  ERROS_JA_ENVIADOS.add(chave);
  errosNestaPagina += 1;
  mandarErro({ _mensagem: texto, _origem: de, _pagina: paginaDoErro(), _aparelho: aparelhoDoErro(), _versao: window.__versaoDoSite || '' });
}

window.addEventListener('error', (evento) => {
  if (!evento || !evento.message) return;
  enviarErroDoSite(evento.message, evento.filename ? `${evento.filename}:${evento.lineno || 0}:${evento.colno || 0}` : '');
});

window.addEventListener('unhandledrejection', (evento) => {
  const motivo = evento && evento.reason;
  const texto = motivo && (motivo.message || (typeof motivo === 'string' ? motivo : ''));
  if (!texto) return;
  const linha = motivo && motivo.stack ? String(motivo.stack).split('\n').find((l) => /\.js/.test(l)) || '' : '';
  enviarErroDoSite(texto, linha.trim());
});

window.addEventListener('load', () => {
  try {
    if (typeof caches !== 'undefined') {
      caches.keys().then((nomes) => {
        const nome = nomes.find((n) => /^lumina-sancti-\d+\.\d+\.\d+$/.test(n));
        if (nome) window.__versaoDoSite = nome.replace('lumina-sancti-', '');
      }).catch(() => {});
    }
  } catch (e) {
  }
  setTimeout(() => {
    if (typeof supabaseCliente === 'undefined' || !supabaseCliente) return;
    ERROS_ESPERANDO.splice(0).forEach(mandarErro);
  }, 4000);
});
