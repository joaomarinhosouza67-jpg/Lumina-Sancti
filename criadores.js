const criadoresDoLumina = { lista: new Map(), carregado: false, pedido: null };

function trDoCriador(texto) { return typeof tr === 'function' ? tr(texto) : texto; }

function carregarCriadores() {
  if (criadoresDoLumina.pedido) return criadoresDoLumina.pedido;
  if (typeof supabaseCliente === 'undefined' || !supabaseCliente) return Promise.resolve(criadoresDoLumina.lista);
  criadoresDoLumina.pedido = supabaseCliente.rpc('criadores_lista').then(({ data, error }) => {
    if (!error && Array.isArray(data)) data.forEach((c) => criadoresDoLumina.lista.set(String(c.perfil_id), c));
    criadoresDoLumina.carregado = true;
    marcarCriadoresNaTela();
    return criadoresDoLumina.lista;
  }, () => {
    criadoresDoLumina.pedido = null;
    return criadoresDoLumina.lista;
  });
  return criadoresDoLumina.pedido;
}

function colunasDoCodigo(quantas, linhas) {
  let html = '';
  for (let i = 0; i < quantas; i += 1) {
    let digitos = '';
    for (let j = 0; j < linhas; j += 1) digitos += (Math.random() < 0.5 ? '0' : '1') + (j < linhas - 1 ? '\n' : '');
    const duracao = (0.7 + Math.random() * 0.8).toFixed(2);
    const atraso = (-Math.random() * 1.5).toFixed(2);
    html += `<i style="left:${((i + 0.5) * (100 / quantas)).toFixed(1)}%;animation-duration:${duracao}s;animation-delay:${atraso}s">${digitos}\n${digitos}</i>`;
  }
  return html;
}

function htmlDoSeloDeCriador(info, grande) {
  const rotulo = trDoCriador((info && info.rotulo) || 'Criador');
  return `<span class="selo-criador${grande ? ' grande' : ''}" role="img" aria-label="${rotulo}" title="${rotulo}"><span class="selo-criador-chuva" aria-hidden="true">${colunasDoCodigo(grande ? 14 : 8, grande ? 8 : 6)}</span><svg class="selo-criador-icone" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="m8 7-5 5 5 5M16 7l5 5-5 5"/></svg><b>${rotulo}</b></span>`;
}

function chuvaDeCodigoNaCapa(capa) {
  if (!capa || capa.querySelector(':scope > .capa-criador-chuva')) return;
  capa.classList.add('capa-criador');
  const tela = document.createElement('canvas');
  tela.className = 'capa-criador-chuva';
  tela.setAttribute('aria-hidden', 'true');
  capa.insertBefore(tela, capa.firstChild);
  const ctx = tela.getContext && tela.getContext('2d');
  if (!ctx) return;
  const parado = typeof window.matchMedia === 'function' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const passo = 14;
  let colunas = [];
  let largura = 0;
  let altura = 0;
  const medir = () => {
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    largura = Math.max(1, capa.clientWidth);
    altura = Math.max(1, capa.clientHeight);
    tela.width = Math.round(largura * dpr);
    tela.height = Math.round(altura * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const n = Math.ceil(largura / passo);
    colunas = Array.from({ length: n }, (_, i) => colunas[i] || { y: Math.random() * -altura, v: 1.2 + Math.random() * 2.4 });
    ctx.fillStyle = '#02130a';
    ctx.fillRect(0, 0, largura, altura);
  };
  medir();
  let anterior = 0;
  const quadro = (agora) => {
    if (!tela.isConnected) return;
    if (tela.width !== Math.round(capa.clientWidth * Math.min(2, window.devicePixelRatio || 1))) medir();
    if (agora - anterior > 33) {
      anterior = agora;
      ctx.fillStyle = 'rgba(2, 19, 10, 0.22)';
      ctx.fillRect(0, 0, largura, altura);
      ctx.font = '600 12px ui-monospace, Consolas, monospace';
      ctx.textAlign = 'center';
      colunas.forEach((c, i) => {
        const x = i * passo + passo / 2;
        const digito = Math.random() < 0.5 ? '0' : '1';
        ctx.fillStyle = '#d8ffe4';
        ctx.shadowColor = '#3dff7a';
        ctx.shadowBlur = 8;
        ctx.fillText(digito, x, c.y);
        ctx.shadowBlur = 0;
        ctx.fillStyle = 'rgba(61, 255, 122, 0.85)';
        ctx.fillText(Math.random() < 0.5 ? '0' : '1', x, c.y - passo);
        c.y += c.v * 4;
        if (c.y > altura + passo * 2 && Math.random() > 0.9) { c.y = Math.random() * -40; c.v = 1.2 + Math.random() * 2.4; }
      });
    }
    if (!parado) requestAnimationFrame(quadro);
  };
  requestAnimationFrame(quadro);
}

function marcarCriadoresNaTela(raiz) {
  if (typeof document === 'undefined' || !criadoresDoLumina.lista.size) return;
  const lugar = raiz || document;
  lugar.querySelectorAll('.perfil-publico-nome[data-perfil]:not([data-criador-visto])').forEach((nome) => {
    nome.setAttribute('data-criador-visto', '1');
    const info = criadoresDoLumina.lista.get(nome.dataset.perfil);
    if (!info) return;
    nome.insertAdjacentHTML('afterend', htmlDoSeloDeCriador(info, true));
    const cartao = nome.closest('.perfil-publico');
    if (cartao) chuvaDeCodigoNaCapa(cartao.querySelector('.perfil-publico-capa'));
  });
  lugar.querySelectorAll('.ranking-linha[data-perfil]:not([data-criador-visto]), .marco-autor[data-perfil]:not([data-criador-visto])').forEach((linha) => {
    linha.setAttribute('data-criador-visto', '1');
    const info = criadoresDoLumina.lista.get(linha.dataset.perfil);
    if (!info) return;
    const nome = linha.querySelector('.ranking-nome, .marco-autor-textos strong');
    if (nome && !nome.querySelector('.selo-criador')) nome.insertAdjacentHTML('beforeend', ' ' + htmlDoSeloDeCriador(info, false));
  });
}

if (typeof document !== 'undefined' && typeof MutationObserver !== 'undefined') {
  let agendado = false;
  const observar = () => {
    if (!document.body) return;
    new MutationObserver(() => {
      if (agendado || !criadoresDoLumina.lista.size) return;
      agendado = true;
      setTimeout(() => { agendado = false; marcarCriadoresNaTela(); }, 120);
    }).observe(document.body, { childList: true, subtree: true });
    setTimeout(carregarCriadores, 1500);
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', observar);
  else observar();
}
