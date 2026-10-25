const ATRIBUTOS_DAS_TELAS = ['placeholder', 'aria-label', 'title', 'alt'];
const ORIGINAIS_DOS_TEXTOS = new WeakMap();
const ORIGINAIS_DOS_ATRIBUTOS = new WeakMap();
const ORIGINAIS_DOS_BLOCOS = new WeakMap();
const textosDasTelasCarregados = {};
let observadorDasTelas = null;
const FRASES_MONTADAS = new Map();

function idiomaDasTelas() {
  return typeof idiomaAtual !== 'undefined' ? idiomaAtual : 'pt';
}

function dicionarioDasTelas(idioma) {
  const codigo = idioma || idiomaDasTelas();
  if (codigo === 'pt' || typeof window === 'undefined' || !window.TEXTOS_DAS_TELAS) return null;
  return window.TEXTOS_DAS_TELAS[codigo] || null;
}

function chaveDoTextoDaTela(texto) {
  return String(texto).replace(/\s+/g, ' ').trim();
}

function montarFraseDaTela(texto, valores) {
  const dicionario = dicionarioDasTelas();
  const chave = chaveDoTextoDaTela(texto);
  let saida = dicionario && dicionario[chave] ? dicionario[chave] : texto;
  if (valores) saida = saida.replace(/\{(\w+)\}/g, (marca, nome) => (valores[nome] !== undefined ? valores[nome] : marca));
  return saida;
}

function tr(texto, valores) {
  const saida = montarFraseDaTela(texto, valores);
  if (valores && !/</.test(saida)) {
    if (FRASES_MONTADAS.size > 3000) FRASES_MONTADAS.clear();
    FRASES_MONTADAS.set(chaveDoTextoDaTela(saida), { texto, valores });
  }
  return saida;
}

function textoTraduzidoDaTela(original) {
  const chave = chaveDoTextoDaTela(original);
  const montada = FRASES_MONTADAS.get(chave);
  if (montada) {
    const nova = montarFraseDaTela(montada.texto, montada.valores);
    FRASES_MONTADAS.set(chaveDoTextoDaTela(nova), montada);
    return original.match(/^\s*/)[0] + nova + original.match(/\s*$/)[0];
  }
  const dicionario = dicionarioDasTelas();
  if (!dicionario) return null;
  if (!chave || !dicionario[chave]) return null;
  const antes = original.match(/^\s*/)[0];
  const depois = original.match(/\s*$/)[0];
  return antes + dicionario[chave] + depois;
}

function podeTraduzirNaTela(elemento, atributo) {
  if (!elemento) return false;
  const bloqueio = atributo ? '[translate="no"]' : 'script,style,textarea,[translate="no"],[contenteditable="true"],#cards-grid,#bio-article';
  return !elemento.closest(bloqueio);
}

function traduzirTextoDaTela(no) {
  if (!podeTraduzirNaTela(no.parentElement)) return;
  const guardado = ORIGINAIS_DOS_TEXTOS.get(no);
  let original = no.data;
  if (guardado && no.data === guardado.aplicado) original = guardado.original;
  const novo = textoTraduzidoDaTela(original);
  const final = novo == null ? original : novo;
  ORIGINAIS_DOS_TEXTOS.set(no, { original, aplicado: final });
  if (no.data !== final) no.data = final;
}

function traduzirAtributoDaTela(elemento, atributo) {
  if (!elemento.hasAttribute(atributo) || !podeTraduzirNaTela(elemento, true)) return;
  let guardados = ORIGINAIS_DOS_ATRIBUTOS.get(elemento);
  if (!guardados) { guardados = {}; ORIGINAIS_DOS_ATRIBUTOS.set(elemento, guardados); }
  const atual = elemento.getAttribute(atributo);
  const guardado = guardados[atributo];
  const original = guardado && atual === guardado.aplicado ? guardado.original : atual;
  const novo = textoTraduzidoDaTela(original);
  const final = novo == null ? original : novo;
  guardados[atributo] = { original, aplicado: final };
  if (atual !== final) elemento.setAttribute(atributo, final);
}

function traduzirBlocoDaTela(elemento) {
  const nome = elemento.dataset.i18nBloco;
  if (!ORIGINAIS_DOS_BLOCOS.has(elemento)) ORIGINAIS_DOS_BLOCOS.set(elemento, elemento.innerHTML);
  const dicionario = dicionarioDasTelas();
  const blocos = dicionario && dicionario.__blocos ? dicionario.__blocos : null;
  const html = blocos && blocos[nome] ? blocos[nome] : ORIGINAIS_DOS_BLOCOS.get(elemento);
  if (elemento.innerHTML !== html) elemento.innerHTML = html;
}

function traduzirArvoreDaTela(raiz) {
  if (!raiz) return;
  if (raiz.nodeType === 3) { traduzirTextoDaTela(raiz); return; }
  if (raiz.nodeType !== 1) return;
  if (raiz.matches('[data-i18n-bloco]')) traduzirBlocoDaTela(raiz);
  raiz.querySelectorAll('[data-i18n-bloco]').forEach(traduzirBlocoDaTela);
  const andar = document.createTreeWalker(raiz, NodeFilter.SHOW_TEXT);
  let no;
  while ((no = andar.nextNode())) {
    if (no.data.trim()) traduzirTextoDaTela(no);
  }
  const comAtributos = raiz.querySelectorAll(ATRIBUTOS_DAS_TELAS.map((a) => `[${a}]`).join(','));
  [raiz, ...comAtributos].forEach((el) => {
    if (el.nodeType === 1) ATRIBUTOS_DAS_TELAS.forEach((a) => traduzirAtributoDaTela(el, a));
  });
}

function ligarObservadorDasTelas() {
  if (observadorDasTelas || typeof MutationObserver === 'undefined' || !document.body) return;
  observadorDasTelas = new MutationObserver((mudancas) => {
    mudancas.forEach((m) => {
      if (m.type === 'childList') m.addedNodes.forEach(traduzirArvoreDaTela);
      else if (m.type === 'characterData') traduzirTextoDaTela(m.target);
      else if (m.type === 'attributes') traduzirAtributoDaTela(m.target, m.attributeName);
    });
  });
  observadorDasTelas.observe(document.body, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ATRIBUTOS_DAS_TELAS });
}

function carregarTextosDasTelas(codigo) {
  if (codigo === 'pt') return Promise.resolve();
  if (window.TEXTOS_DAS_TELAS && window.TEXTOS_DAS_TELAS[codigo]) return Promise.resolve();
  if (textosDasTelasCarregados[codigo]) return textosDasTelasCarregados[codigo];
  textosDasTelasCarregados[codigo] = new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = `textos-telas-${codigo}.js`;
    script.onload = () => resolve();
    script.onerror = () => { delete textosDasTelasCarregados[codigo]; resolve(); };
    (document.head || document.body).appendChild(script);
  });
  return textosDasTelasCarregados[codigo];
}

function aplicarIdiomaNasTelas(codigo) {
  return carregarTextosDasTelas(codigo).then(() => {
    if (idiomaDasTelas() !== codigo) return;
    traduzirArvoreDaTela(document.body);
    if (codigo !== 'pt') ligarObservadorDasTelas();
    else if (observadorDasTelas) { observadorDasTelas.disconnect(); observadorDasTelas = null; }
    document.dispatchEvent(new CustomEvent('lumina-idioma', { detail: { idioma: codigo } }));
  });
}

function localDoIdioma() {
  return { pt: 'pt-BR', en: 'en-US', es: 'es-ES' }[idiomaDasTelas()] || 'pt-BR';
}
