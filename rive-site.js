let promessaDoRive = null;
const animacoesRiveAtivas = new Set();

function riveDesligadoPeloAparelho() {
  return !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
}

function carregarRive() {
  if (window.rive && window.rive.Rive) return Promise.resolve(window.rive);
  if (!promessaDoRive) {
    promessaDoRive = new Promise((ok, erro) => {
      const script = document.createElement('script');
      script.src = 'rive/rive.js';
      script.async = true;
      script.onload = () => {
        if (!window.rive || !window.rive.Rive) { erro(new Error('rive_indisponivel')); return; }
        try { window.rive.RuntimeLoader.setWasmUrl(new URL('rive/rive.wasm', window.location.href).href); } catch (e) { }
        ok(window.rive);
      };
      script.onerror = () => erro(new Error('rive_nao_carregou'));
      document.head.appendChild(script);
    }).catch((e) => { promessaDoRive = null; throw e; });
  }
  return promessaDoRive;
}

async function tocarAnimacaoRive(canvas, arquivo, maquina) {
  if (!canvas || riveDesligadoPeloAparelho()) return null;
  let biblioteca;
  try { biblioteca = await carregarRive(); } catch (e) { return null; }
  if (!canvas.isConnected) return null;
  return new Promise((ok) => {
    let animacao = null;
    try {
      animacao = new biblioteca.Rive({
        src: arquivo,
        canvas,
        autoplay: true,
        stateMachines: maquina,
        layout: new biblioteca.Layout({ fit: biblioteca.Fit.Contain, alignment: biblioteca.Alignment.Center }),
        onLoad: () => {
          try { animacao.resizeDrawingSurfaceToCanvas(); } catch (e) { }
          canvas.classList.add('pronto');
          animacoesRiveAtivas.add(animacao);
          ok(animacao);
        },
        onLoadError: () => { try { animacao.cleanup(); } catch (e) { } ok(null); },
      });
    } catch (e) {
      ok(null);
    }
  });
}

function pararAnimacoesRive() {
  animacoesRiveAtivas.forEach((animacao) => { try { animacao.cleanup(); } catch (e) { } });
  animacoesRiveAtivas.clear();
}
