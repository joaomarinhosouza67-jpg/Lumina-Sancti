const HISTORIAS_CARREGADAS = {};

function carregarHistoriasDosSantos(idioma) {
  if (!HISTORIAS_CARREGADAS[idioma]) {
    HISTORIAS_CARREGADAS[idioma] = fetch(`historias/${idioma}.json`)
      .then((resposta) => (resposta.ok ? resposta.json() : {}))
      .catch(() => {
        delete HISTORIAS_CARREGADAS[idioma];
        return {};
      });
  }
  return HISTORIAS_CARREGADAS[idioma];
}

function idiomaDasHistorias() {
  const idioma = typeof idiomaAtual !== 'undefined' ? idiomaAtual : 'pt';
  return ['pt', 'en', 'es'].includes(idioma) ? idioma : 'pt';
}

async function colocarHistoriaCompleta(santo) {
  if (!santo) return;
  const idioma = idiomaDasHistorias();
  const historias = await carregarHistoriasDosSantos(idioma);
  const html = historias && historias[santo.id];
  const artigo = document.getElementById('bio-article');
  if (!html || !artigo || artigo.dataset.santoId !== santo.id || idiomaDasHistorias() !== idioma) return;
  const lugar = artigo.querySelector('.bio-text');
  if (!lugar) return;
  lugar.innerHTML = html;
  lugar.classList.add('bio-historia');
  if (idioma !== 'pt') {
    const aviso = artigo.querySelector('.bio-aviso-traducao');
    if (aviso) aviso.remove();
  }
}

function textoParaOuvirDoSanto(santo, textos) {
  const artigo = document.getElementById('bio-article');
  const lugar = artigo && artigo.dataset.santoId === santo.id ? artigo.querySelector('.bio-text.bio-historia') : null;
  return lugar ? lugar.innerHTML : textos.texto;
}
