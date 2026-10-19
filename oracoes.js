const ICONES_DAS_ORACOES = {
  basicas: '<path d="M12 3v18M7 8h10"/>',
  maria: '<path d="M4 17l1.5-8 4 3.5L12 6l2.5 6.5 4-3.5L20 17z"/><path d="M4 20h16"/>',
  jesus: '<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8z"/>',
  espirito: '<path d="M12 22c4 0 7-2.8 7-7 0-4.5-4-7-4-11-2.5 1.5-4 4-4 6.5C9.5 9 9 8 9 6.5 6.5 8.5 5 11.5 5 15c0 4.2 3 7 7 7z"/>',
  anjos: '<path d="M12 9C10 6 6 5 3 6c1 4 4 7 9 8"/><path d="M12 9c2-3 6-4 9-3-1 4-4 7-9 8"/><circle cx="12" cy="5" r="1.6"/><path d="M12 14v7"/>',
  santos: '<ellipse cx="12" cy="3.6" rx="4.6" ry="1.5"/><circle cx="12" cy="10" r="3.2"/><path d="M5 21a7 7 0 0 1 14 0"/>',
  dia: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
  familia: '<path d="M3 11l9-7 9 7v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z"/><path d="M12 17.6l-2.5-2.4a1.6 1.6 0 0 1 2.5-2.1 1.6 1.6 0 0 1 2.5 2.1z"/>',
  dificeis: '<circle cx="12" cy="5" r="2"/><path d="M12 7v14M5 13H3a9 8 0 0 0 18 0h-2M8 10h8"/>',
  falecidos: '<path d="M9 21h6M10 21V10h4v11"/><path d="M12 7.5c1.4-1 1.4-2.8 0-4.5-1.4 1.7-1.4 3.5 0 4.5z"/>',
  terco: '<circle cx="12" cy="9" r="6"/><circle cx="12" cy="3" r="1"/><circle cx="6" cy="9" r="1"/><circle cx="18" cy="9" r="1"/><path d="M12 15v6M10 18h4"/>',
  frases: '<path d="M7 7h4v4c0 3-2 5-4 6M15 7h4v4c0 3-2 5-4 6"/>',
};

const NOVAS_SITUACOES_DE_ORACAO = [
  { rotulos: ['Coisas perdidas', 'Lost things', 'Cosas perdidas'], termos: ['perdi', 'perdido', 'perdida', 'perder', 'sumiu', 'objeto perdido', 'achar', 'encontrar', 'chave', 'documento', 'lost', 'lose', 'find', 'missing', 'keys', 'perdí', 'extraviado', 'encontrar'], itens: ['santo-antonio-coisas-perdidas', 'responsorio-santo-antonio'] },
  { rotulos: ['Gravidez e bebê', 'Pregnancy and baby', 'Embarazo y bebé'], termos: ['grávida', 'gravidez', 'gestante', 'bebê', 'parto', 'engravidar', 'nascimento', 'pregnant', 'pregnancy', 'baby', 'birth', 'childbirth', 'expecting', 'embarazada', 'embarazo', 'bebé', 'nacimiento'], itens: ['pela-gestante', 'nossa-senhora-de-guadalupe'] },
  { rotulos: ['Casamento', 'Marriage', 'Matrimonio'], termos: ['casamento', 'casal', 'marido', 'esposa', 'esposo', 'noivo', 'noiva', 'matrimônio', 'namoro', 'marriage', 'married', 'husband', 'wife', 'spouse', 'couple', 'wedding', 'matrimonio', 'pareja', 'boda', 'novio', 'novia'], itens: ['pelos-esposos', 'pela-familia'] },
  { rotulos: ['Tentação', 'Temptation', 'Tentación'], termos: ['tentação', 'tentado', 'tentada', 'vício', 'resistir', 'temptation', 'tempted', 'addiction', 'resist', 'tentación', 'vicio'], itens: ['na-tentacao', 'sao-bento', 'sao-miguel'] },
  { rotulos: ['Cirurgia', 'Surgery', 'Cirugía'], termos: ['cirurgia', 'operação', 'operar', 'anestesia', 'surgery', 'operation', 'cirugía', 'operación'], itens: ['antes-de-uma-cirurgia', 'pelos-doentes'] },
  { rotulos: ['Dívidas e dinheiro', 'Debts and money', 'Deudas y dinero'], termos: ['dívida', 'dívidas', 'endividado', 'endividada', 'dinheiro', 'contas', 'aluguel', 'falência', 'debt', 'debts', 'money', 'bills', 'rent', 'deuda', 'deudas', 'dinero', 'cuentas', 'alquiler'], itens: ['santa-edwiges', 'por-emprego'] },
  { rotulos: ['Olhos e visão', 'Eyes and sight', 'Ojos y vista'], termos: ['olhos', 'olho', 'visão', 'vista', 'cegueira', 'eyes', 'eye', 'sight', 'vision', 'blind', 'ojos', 'ojo', 'visión', 'ceguera'], itens: ['santa-luzia'] },
  { rotulos: ['Garganta', 'Throat', 'Garganta'], termos: ['garganta', 'engasgo', 'rouquidão', 'throat', 'choking', 'atragantado'], itens: ['sao-bras'] },
  { rotulos: ['Pelos pais', 'For my parents', 'Por mis padres'], termos: ['meus pais', 'papai', 'mamãe', 'meu pai', 'minha mãe', 'parents', 'father', 'mother', 'dad', 'mom', 'mis padres', 'papá', 'mamá'], itens: ['pelos-pais'] },
  { rotulos: ['Amigos', 'Friends', 'Amigos'], termos: ['amigo', 'amiga', 'amigos', 'amizade', 'friend', 'friends', 'friendship', 'amistad'], itens: ['pelos-amigos'] },
  { rotulos: ['O Papa e a Igreja', 'The Pope and the Church', 'El Papa y la Iglesia'], termos: ['papa', 'igreja', 'santo padre', 'bispo', 'pope', 'church', 'holy father', 'bishop', 'iglesia', 'obispo'], itens: ['pelo-papa', 'pelas-vocacoes'] },
  { rotulos: ['Vocação', 'Vocation', 'Vocación'], termos: ['vocação', 'freira', 'seminário', 'chamado de deus', 'missão', 'vocation', 'priest', 'nun', 'seminary', 'calling', 'mission', 'vocación', 'monja', 'seminario', 'misión'], itens: ['pelas-vocacoes', 'sao-rafael'] },
  { rotulos: ['Páscoa', 'Easter', 'Pascua'], termos: ['páscoa', 'ressurreição', 'aleluia', 'tempo pascal', 'easter', 'resurrection', 'alleluia', 'pascua', 'resurrección', 'aleluya'], itens: ['regina-coeli'] },
  { rotulos: ['Entregar a vida a Deus', 'Surrendering to God', 'Entregar la vida a Dios'], termos: ['entregar', 'abandono', 'vontade de deus', 'entrega', 'surrender', 'abandonment', 'will of god', 'voluntad de dios'], itens: ['oracao-do-abandono', 'tomai-senhor', 'nada-te-perturbe'] },
  { rotulos: ['Louvor e adoração', 'Praise and adoration', 'Alabanza y adoración'], termos: ['louvor', 'adoração', 'adorar', 'bendito', 'praise', 'adoration', 'adore', 'blessed', 'alabanza', 'adoración'], itens: ['louvores-divinos', 'magnificat', 'gloria'] },
];

const ITENS_A_MAIS_NAS_SITUACOES = {
  'Medo e proteção': { inicio: ['no-medo'], fim: ['sao-bento', 'sao-jorge'] },
  'Antes de dormir': { inicio: ['oracao-da-noite'] },
  'Começar o dia': { inicio: ['oferecimento-do-dia', 'oracao-da-manha'] },
  'Pedir perdão': { fim: ['oracao-de-jesus'] },
  'Paz e perdoar alguém': { fim: ['ato-de-caridade'] },
  'Agradecer': { fim: ['magnificat', 'depois-das-refeicoes'] },
  'Fé e dúvidas': { fim: ['ato-de-fe', 'credo-niceno'] },
  'Nossa Senhora': { fim: ['a-vossa-protecao', 'nossa-senhora-aparecida', 'regina-coeli', 'magnificat', 'imaculado-coracao', 'perpetuo-socorro', 'nossa-senhora-das-gracas', 'oracoes-de-fatima', 'nossa-senhora-de-guadalupe', 'ladainha-de-nossa-senhora'] },
  'Causas difíceis e urgentes': { inicio: ['sao-judas-tadeu', 'santa-rita'], fim: ['santo-expedito'] },
  'Tristeza e consolo': { inicio: ['na-tristeza'], fim: ['nada-te-perturbe'] },
  'Ansiedade e confiança': { inicio: ['na-ansiedade'], fim: ['nada-te-perturbe', 'oracao-do-abandono'] },
  'Pelos doentes': { inicio: ['pelos-doentes'], fim: ['sao-camilo', 'antes-de-uma-cirurgia'] },
  'Falecidos e luto': { fim: ['por-um-falecido', 'almas-do-purgatorio'] },
  'Antes das refeições': { fim: ['depois-das-refeicoes'] },
  'Estudos e decisões': { inicio: ['santo-tomas-antes-de-estudar'], fim: ['sete-dons'] },
  'Missa e Comunhão': { fim: ['comunhao-espiritual', 'louvores-divinos', 'eis-me-aqui'] },
  'Espírito Santo': { fim: ['veni-creator', 'respirai-em-mim', 'sete-dons'] },
  'Hora da Misericórdia (15h)': { fim: ['santa-faustina'] },
  'Ângelus (6h, 12h e 18h)': { fim: ['regina-coeli'] },
  'Viagem': { inicio: ['antes-de-viajar'], fim: ['sao-cristovao', 'sao-rafael'] },
  'Crianças e família': { inicio: ['pela-familia', 'pelos-filhos'], fim: ['santa-monica'] },
  'Trabalho e sustento': { inicio: ['por-emprego', 'sao-jose'], fim: ['antes-do-trabalho', 'santa-edwiges'] },
  'Santíssima Trindade': { fim: ['credo-niceno'] },
};

const POSICAO_DO_IDIOMA = { pt: 0, en: 1, es: 2 };
const TAMANHOS_DA_LETRA_DA_ORACAO = [0.95, 1.08, 1.22, 1.38];
const oracaoPeloId = new Map(BIBLIOTECA_DE_ORACOES.map((o) => [o.id, o]));

let categoriaDasOracoes = 'todas';
let listaDoLeitor = [];
let posicaoNoLeitor = 0;
let focoAntesDoLeitor = null;
let indiceDaBibliotecaDeOracoes = null;

function idiomaDasOracoes() {
  return typeof idiomaAtual !== 'undefined' && ['en', 'es'].includes(idiomaAtual) ? idiomaAtual : 'pt';
}

function noIdioma(lista) {
  if (!Array.isArray(lista)) return lista || '';
  return lista[POSICAO_DO_IDIOMA[idiomaDasOracoes()]] || lista[0];
}

function traduzirInterface(texto, valores) {
  if (typeof tr === 'function') return tr(texto, valores);
  return String(texto).replace(/\{(\w+)\}/g, (_, k) => (valores && valores[k] != null ? valores[k] : ''));
}

function escaparOracao(texto) {
  return String(texto == null ? '' : texto).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

function iconeDaOracao(nome) {
  return `<svg class="oracao-icone" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONES_DAS_ORACOES[nome] || ICONES_DAS_ORACOES.basicas}</svg>`;
}

function nomeDaCategoria(id) {
  if (id === 'todas') return traduzirInterface('Todas');
  if (id === 'frases') return traduzirInterface('Frases dos santos');
  const categoria = CATEGORIAS_DE_ORACAO.find((c) => c.id === id);
  return categoria ? noIdioma(categoria.nome) : '';
}

function numeroDoDiaDasOracoes(data) {
  const d = data || new Date();
  return Math.floor(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()) / 86400000);
}

function oracaoDoDia(data) {
  const candidatas = BIBLIOTECA_DE_ORACOES.filter((o) => !o.acao && o.cat !== 'falecidos');
  return candidatas[(numeroDoDiaDasOracoes(data) * 7) % candidatas.length];
}

function fraseDoDia(data) {
  return FRASES_DOS_SANTOS[(numeroDoDiaDasOracoes(data) * 11 + 3) % FRASES_DOS_SANTOS.length];
}

function santoPeloId(id) {
  return typeof santosData !== 'undefined' ? santosData.find((s) => s.id === id) : null;
}

function nomeDoSantoDaOracao(id) {
  const santo = santoPeloId(id);
  if (!santo) return '';
  return typeof textoDoSanto === 'function' ? textoDoSanto(santo).nome : santo.nome;
}

function htmlDoTextoDaOracao(texto) {
  const linhas = String(texto).split('\n');
  const finais = {};
  linhas.forEach((linha) => {
    const m = linha.match(/,\s([^,]{6,40}[.!])$/);
    if (m) finais[m[1]] = (finais[m[1]] || 0) + 1;
  });
  const respostas = Object.keys(finais).filter((f) => finais[f] >= 4);
  const formatarLinha = (linha) => {
    const limpa = linha.trim();
    if (/^\(.*\)$/.test(limpa)) return `<span class="oracao-rubrica">${escaparOracao(limpa)}</span>`;
    let html = escaparOracao(linha);
    const resposta = respostas.find((r) => linha.endsWith(r));
    if (resposta) {
      const corte = linha.length - resposta.length;
      html = `${escaparOracao(linha.slice(0, corte))}<span class="oracao-resposta">${escaparOracao(resposta)}</span>`;
    }
    html = html.replace(/\(([^)]{3,60})\)/g, '<span class="oracao-rubrica">($1)</span>');
    if (/^(Oremos|Let us pray|Oremos)[:.]/.test(limpa)) html = html.replace(/^(Oremos|Let us pray)([:.])/, '<strong>$1$2</strong>');
    if (/:$/.test(limpa) && limpa.length < 60) html = `<strong class="oracao-subtitulo">${html}</strong>`;
    return html;
  };
  return String(texto).split(/\n{2,}/).map((bloco) => `<p>${bloco.split('\n').map(formatarLinha).join('<br>')}</p>`).join('');
}

function htmlDoCartaoDeOracao(o) {
  return `<button type="button" class="oracao-cartao" data-oracao="${o.id}" translate="no">
    <span class="oracao-cartao-icone">${iconeDaOracao(o.cat)}</span>
    <span class="oracao-cartao-textos">
      <span class="oracao-cartao-titulo">${escaparOracao(noIdioma(o.t))}</span>
      <span class="oracao-cartao-quando">${escaparOracao(noIdioma(o.q))}</span>
    </span>
  </button>`;
}

function htmlDaFrase(f, comSelo) {
  const nome = nomeDoSantoDaOracao(f.santo);
  return `<figure class="frase-cartao${comSelo ? ' frase-do-dia' : ''}" translate="no">
    ${comSelo ? `<span class="frase-selo">${iconeDaOracao('frases')}${escaparOracao(traduzirInterface('Frase do dia'))}</span>` : ''}
    <blockquote class="frase-texto">${escaparOracao(noIdioma(f.x))}</blockquote>
    <figcaption class="frase-autor">
      <button type="button" class="frase-santo" data-santo="${f.santo}">${escaparOracao(nome)}</button>
      <span class="frase-fonte">${escaparOracao(noIdioma(f.f))}</span>
    </figcaption>
  </figure>`;
}

function ligarFrases(lugar) {
  lugar.querySelectorAll('.frase-santo').forEach((botao) => {
    botao.addEventListener('click', () => {
      if (typeof showDetail === 'function') showDetail(botao.dataset.santo);
    });
  });
}

function renderizarDestaquesDasOracoes() {
  const doDia = document.getElementById('oracao-do-dia');
  if (doDia) {
    const o = oracaoDoDia();
    const trecho = noIdioma(o.x).split('\n').filter((l) => l.trim()).slice(0, 3).join('\n');
    doDia.innerHTML = `
      <span class="oracao-do-dia-selo">${iconeDaOracao(o.cat)}${escaparOracao(traduzirInterface('Oração do dia'))}</span>
      <h3 class="oracao-do-dia-titulo" translate="no">${escaparOracao(noIdioma(o.t))}</h3>
      <p class="oracao-do-dia-trecho" translate="no">${escaparOracao(trecho)}…</p>
      <button type="button" class="oracao-do-dia-botao" data-oracao="${o.id}">${escaparOracao(traduzirInterface('Rezar agora'))}</button>`;
    doDia.querySelector('.oracao-do-dia-botao').addEventListener('click', () => abrirLeitorDeOracao(o.id, [o.id]));
  }
  const frase = document.getElementById('frase-do-dia-oracoes');
  if (frase) {
    frase.innerHTML = htmlDaFrase(fraseDoDia(), true);
    ligarFrases(frase);
  }
}

function renderizarFraseDoDiaNoInicio() {
  const lugar = document.getElementById('frase-do-dia');
  if (!lugar) return;
  lugar.innerHTML = htmlDaFrase(fraseDoDia(), true);
  ligarFrases(lugar);
}

function renderizarCategoriasDasOracoes() {
  const nav = document.getElementById('oracoes-categorias');
  if (!nav) return;
  const ids = ['todas'].concat(CATEGORIAS_DE_ORACAO.map((c) => c.id), ['frases']);
  nav.innerHTML = ids.map((id) => `<button type="button" class="oracoes-categoria${id === categoriaDasOracoes ? ' ativa' : ''}" data-cat="${id}" aria-pressed="${id === categoriaDasOracoes}">
    ${id === 'todas' ? '' : iconeDaOracao(id)}<span>${escaparOracao(nomeDaCategoria(id))}</span></button>`).join('');
  nav.querySelectorAll('.oracoes-categoria').forEach((botao) => {
    botao.addEventListener('click', () => {
      categoriaDasOracoes = botao.dataset.cat;
      renderizarCategoriasDasOracoes();
      renderizarListaDeOracoes();
      const lista = document.getElementById('lista-oracoes');
      if (lista && window.scrollY > lista.offsetTop) window.scrollTo({ top: Math.max(0, nav.offsetTop - 80), behavior: 'smooth' });
    });
  });
}

function renderizarListaDeOracoes() {
  const lista = document.getElementById('lista-oracoes');
  if (!lista) return;
  if (categoriaDasOracoes === 'frases') {
    lista.innerHTML = `<section class="oracoes-secao">
      <h3 class="oracoes-secao-titulo">${iconeDaOracao('frases')}<span>${escaparOracao(nomeDaCategoria('frases'))}</span><small>${FRASES_DOS_SANTOS.length}</small></h3>
      <div class="frases-grade">${FRASES_DOS_SANTOS.map((f) => htmlDaFrase(f, false)).join('')}</div>
    </section>`;
    ligarFrases(lista);
    return;
  }
  const categorias = categoriaDasOracoes === 'todas' ? CATEGORIAS_DE_ORACAO : CATEGORIAS_DE_ORACAO.filter((c) => c.id === categoriaDasOracoes);
  lista.innerHTML = categorias.map((c) => {
    const daCategoria = BIBLIOTECA_DE_ORACOES.filter((o) => o.cat === c.id);
    return `<section class="oracoes-secao" data-cat="${c.id}">
      <h3 class="oracoes-secao-titulo">${iconeDaOracao(c.id)}<span>${escaparOracao(noIdioma(c.nome))}</span><small>${daCategoria.length}</small></h3>
      <div class="oracoes-grade">${daCategoria.map(htmlDoCartaoDeOracao).join('')}</div>
    </section>`;
  }).join('');
  const ordem = Array.from(lista.querySelectorAll('.oracao-cartao')).map((c) => c.dataset.oracao);
  lista.querySelectorAll('.oracao-cartao').forEach((cartao) => {
    cartao.addEventListener('click', () => abrirLeitorDeOracao(cartao.dataset.oracao, ordem));
  });
}

function prepararIndiceDaBibliotecaDeOracoes() {
  if (indiceDaBibliotecaDeOracoes) return indiceDaBibliotecaDeOracoes;
  const extrasDosIdiomas = (rotulo) => {
    if (typeof TERMOS_DE_BUSCA_POR_IDIOMA === 'undefined') return [];
    const termos = (TERMOS_DE_BUSCA_POR_IDIOMA.oracoes || {})[rotulo] || {};
    return [].concat(termos.en || [], termos.es || []);
  };
  const traducoesDoRotulo = (rotulo) => {
    const lista = [];
    ['en', 'es'].forEach((idioma) => {
      const dic = typeof window !== 'undefined' && window.TEXTOS_DAS_TELAS ? window.TEXTOS_DAS_TELAS[idioma] : null;
      if (dic && dic[rotulo]) lista.push(dic[rotulo]);
    });
    return lista;
  };
  const antigas = (typeof SITUACOES_DE_ORACAO !== 'undefined' ? SITUACOES_DE_ORACAO : []).map((s) => {
    const mais = ITENS_A_MAIS_NAS_SITUACOES[s.rotulo] || {};
    const itens = Array.from(new Set([].concat(mais.inicio || [], s.itens, mais.fim || []))).filter((id) => oracaoPeloId.has(id));
    return { rotulo: s.rotulo, termos: s.termos.concat(extrasDosIdiomas(s.rotulo), traducoesDoRotulo(s.rotulo)), itens };
  });
  const novas = NOVAS_SITUACOES_DE_ORACAO.map((s) => ({ rotulo: s.rotulos[0], rotulos: s.rotulos, termos: s.termos.concat(s.rotulos), itens: s.itens }));
  indiceDaBibliotecaDeOracoes = {
    itens: BuscaInteligente.prepararItens(BIBLIOTECA_DE_ORACOES.map((o) => ({ id: o.id, nomes: o.t.concat(o.nomes || []), texto: o.x.join('\n'), oracao: o }))),
    situacoes: BuscaInteligente.prepararSituacoes(antigas.concat(novas)),
    rotulos: new Map(novas.map((s) => [s.rotulo, s.rotulos])),
  };
  return indiceDaBibliotecaDeOracoes;
}

function buscarNaBibliotecaDeOracoes(consulta, limite) {
  if (typeof BuscaInteligente === 'undefined') return [];
  const indice = prepararIndiceDaBibliotecaDeOracoes();
  return BuscaInteligente.buscar(consulta, indice.itens, indice.situacoes)
    .slice(0, limite || 4)
    .map((r) => ({ oracao: r.item.oracao, motivo: r.motivo, pontos: r.pontos }));
}

function rotuloDoMotivo(motivo) {
  if (!motivo) return '';
  const indice = prepararIndiceDaBibliotecaDeOracoes();
  const rotulos = indice.rotulos.get(motivo);
  return rotulos ? noIdioma(rotulos) : traduzirInterface(motivo);
}

function botaoDePassoAPasso(o) {
  if (o.acao === 'misericordia') return `<button type="button" class="filter-btn active oracao-acao" data-acao="misericordia">${escaparOracao(traduzirInterface('Rezar passo a passo'))}</button>`;
  if (o.acao === 'terco') return `<button type="button" class="filter-btn active oracao-acao" data-acao="terco">${escaparOracao(traduzirInterface('Rezar o terço passo a passo'))}</button>`;
  return '';
}

function htmlDoResultadoDeOracao(o, extra) {
  const motivo = extra.motivo ? `<span class="oracao-motivo">${escaparOracao(traduzirInterface('Para: {motivo}', { motivo: rotuloDoMotivo(extra.motivo) }))}</span>` : '';
  const selo = extra.melhor ? `<span class="oracao-selo">${escaparOracao(traduzirInterface('Mais indicada'))}</span>` : '';
  if (!extra.melhor) {
    return `<button type="button" class="oracao-item oracao-item-compacto" data-oracao="${o.id}" translate="no">
      <span class="oracao-cartao-icone">${iconeDaOracao(o.cat)}</span>
      <span class="oracao-titulo-linha"><span>${escaparOracao(noIdioma(o.t))}</span>${motivo}</span>
    </button>`;
  }
  return `<article class="oracao-item aberta oracao-destaque" data-oracao="${o.id}">
    <header class="oracao-destaque-topo"><span class="oracao-titulo-linha">${selo}<span translate="no">${escaparOracao(noIdioma(o.t))}</span>${motivo}</span></header>
    <div class="oracao-corpo" translate="no">
      <div class="oracao-texto">${htmlDoTextoDaOracao(noIdioma(o.x))}</div>
      ${o.n ? `<p class="oracao-nota">${escaparOracao(noIdioma(o.n))}</p>` : ''}
    </div>
    <div class="oracao-destaque-acoes">
      ${botaoDePassoAPasso(o)}
      <button type="button" class="oracao-abrir-leitor" data-oracao="${o.id}">${escaparOracao(traduzirInterface('Abrir em tela cheia'))}</button>
    </div>
  </article>`;
}

function mostrarResultadoDaBuscaNaBiblioteca(consulta) {
  const area = document.getElementById('oracao-resultado');
  if (!area) return;
  const texto = String(consulta || '').trim();
  if (!texto) { area.innerHTML = ''; return; }
  const achadas = buscarNaBibliotecaDeOracoes(texto, 5);
  if (!achadas.length) {
    area.innerHTML = `
      <div class="oracao-sem-resultado">
        <p>${traduzirInterface('Não encontrei uma oração para "{texto}". Tente contar com outras palavras (por exemplo: "medo", "doença", "agradecer") ou pergunte à Lumina.', { texto: escaparOracao(texto) })}</p>
        <button type="button" class="btn-ask-ai" id="oracao-perguntar-lumina">${escaparOracao(traduzirInterface('Perguntar à Lumina'))}</button>
      </div>`;
    document.getElementById('oracao-perguntar-lumina').addEventListener('click', () => {
      mudarDeView('view-ia');
      setTimeout(() => {
        const campo = document.getElementById('lumina-input');
        if (campo) { campo.value = traduzirInterface('Que oração posso rezar para: {texto}?', { texto }); campo.focus(); }
      }, 300);
    });
    return;
  }
  const [melhor, ...outras] = achadas;
  const ordem = achadas.map((r) => r.oracao.id);
  area.innerHTML = `
    ${htmlDoResultadoDeOracao(melhor.oracao, { melhor: true, motivo: melhor.motivo })}
    ${outras.length ? `<p class="oracao-outras-titulo">${escaparOracao(traduzirInterface('Também podem ajudar'))}</p><div class="oracao-outras">${outras.map((r) => htmlDoResultadoDeOracao(r.oracao, { motivo: r.motivo })).join('')}</div>` : ''}`;
  area.querySelectorAll('.oracao-item-compacto, .oracao-abrir-leitor').forEach((botao) => {
    botao.addEventListener('click', () => abrirLeitorDeOracao(botao.dataset.oracao, ordem));
  });
  area.querySelectorAll('.oracao-acao').forEach((botao) => {
    botao.addEventListener('click', () => abrirTerco(botao.dataset.acao === 'misericordia' ? 'misericordia' : null));
  });
}

function oracaoParaOSanto(santoId, tema) {
  const especificas = BIBLIOTECA_DE_ORACOES.filter((o) => (o.santos || []).includes(santoId));
  const melhor = especificas.find((o) => o.santos[0] === santoId && ['santos', 'anjos', 'maria'].includes(o.cat)) || especificas.find((o) => o.santos[0] === santoId) || null;
  if (melhor) return melhor;
  const santo = santoPeloId(santoId);
  if (!santo) return null;
  const nome = nomeDoSantoDaOracao(santoId);
  const pedido = noIdioma(PEDIDOS_AOS_PADROEIROS[tema] || PEDIDOS_AOS_PADROEIROS['']);
  const texto = noIdioma(MODELO_DE_ORACAO_AO_SANTO).replace(/\{santo\}/g, nome).replace(/\{pedido\}/g, pedido);
  const titulo = traduzirInterface('Oração a {santo}', { santo: nome });
  const quando = traduzirInterface('Para pedir a intercessão de {santo}.', { santo: nome });
  return { id: `santo-${santoId}`, cat: 'santos', t: [titulo, titulo, titulo], q: [quando, quando, quando], x: [texto, texto, texto], santos: [santoId], gerada: true };
}

const oracoesGeradas = new Map();

function abrirOracaoDoSanto(santoId, tema) {
  const o = oracaoParaOSanto(santoId, tema);
  if (!o) return;
  if (o.gerada) oracoesGeradas.set(o.id, { santoId, tema });
  abrirLeitorDeOracao(o.id, [o.id], o);
}

function oracaoParaOLeitor(id) {
  if (oracaoPeloId.has(id)) return oracaoPeloId.get(id);
  const gerada = oracoesGeradas.get(id);
  return gerada ? oracaoParaOSanto(gerada.santoId, gerada.tema) : null;
}

function tamanhoDaLetraDaOracao() {
  try {
    const bruto = localStorage.getItem('lumina-sancti-letra-oracao');
    if (bruto === null) return 1;
    const n = Number(bruto);
    return Number.isInteger(n) && n >= 0 && n < TAMANHOS_DA_LETRA_DA_ORACAO.length ? n : 1;
  } catch (e) {
    return 1;
  }
}

function guardarTamanhoDaLetraDaOracao(n) {
  try { localStorage.setItem('lumina-sancti-letra-oracao', String(n)); } catch (e) {}
}

function garantirLeitorDeOracao() {
  let leitor = document.getElementById('oracao-leitor');
  if (leitor) return leitor;
  leitor = document.createElement('div');
  leitor.id = 'oracao-leitor';
  leitor.className = 'oracao-leitor';
  leitor.hidden = true;
  document.body.appendChild(leitor);
  leitor.addEventListener('click', (e) => {
    if (e.target.closest('[data-fechar]')) { fecharLeitorDeOracao(); return; }
    const botao = e.target.closest('[data-acao]');
    if (!botao) {
      const santo = e.target.closest('[data-santo]');
      if (santo) { fecharLeitorDeOracao(); if (typeof showDetail === 'function') showDetail(santo.dataset.santo); }
      return;
    }
    const acao = botao.dataset.acao;
    if (acao === 'anterior') mudarOracaoNoLeitor(-1);
    else if (acao === 'proxima') mudarOracaoNoLeitor(1);
    else if (acao === 'maior' || acao === 'menor') {
      const atual = tamanhoDaLetraDaOracao();
      const novo = Math.max(0, Math.min(TAMANHOS_DA_LETRA_DA_ORACAO.length - 1, atual + (acao === 'maior' ? 1 : -1)));
      guardarTamanhoDaLetraDaOracao(novo);
      leitor.querySelector('.oracao-leitor-folha').style.setProperty('--letra-da-oracao', `${TAMANHOS_DA_LETRA_DA_ORACAO[novo]}rem`);
    } else if (acao === 'copiar') copiarOracaoDoLeitor(botao);
    else if (acao === 'compartilhar') compartilharOracaoDoLeitor(botao);
    else if (acao === 'passo') {
      const o = oracaoParaOLeitor(listaDoLeitor[posicaoNoLeitor]);
      fecharLeitorDeOracao();
      if (o && typeof abrirTerco === 'function') abrirTerco(o.acao === 'misericordia' ? 'misericordia' : null);
    }
  });
  document.addEventListener('keydown', (e) => {
    if (leitor.hidden) return;
    if (e.key === 'Escape') fecharLeitorDeOracao();
    else if (e.key === 'ArrowRight' && listaDoLeitor.length > 1) mudarOracaoNoLeitor(1);
    else if (e.key === 'ArrowLeft' && listaDoLeitor.length > 1) mudarOracaoNoLeitor(-1);
  });
  return leitor;
}

function desenharLeitorDeOracao() {
  const leitor = garantirLeitorDeOracao();
  const o = oracaoParaOLeitor(listaDoLeitor[posicaoNoLeitor]);
  if (!o) return;
  const varias = listaDoLeitor.length > 1;
  const santos = (o.santos || []).map((id) => ({ id, nome: nomeDoSantoDaOracao(id) })).filter((s) => s.nome);
  leitor.innerHTML = `
    <div class="oracao-leitor-fundo" data-fechar></div>
    <article class="oracao-leitor-folha" role="dialog" aria-modal="true" aria-labelledby="oracao-leitor-titulo" style="--letra-da-oracao:${TAMANHOS_DA_LETRA_DA_ORACAO[tamanhoDaLetraDaOracao()]}rem">
      <header class="oracao-leitor-topo">
        <span class="oracao-leitor-categoria">${iconeDaOracao(o.cat)}${escaparOracao(nomeDaCategoria(o.cat))}</span>
        <div class="oracao-leitor-ferramentas">
          <button type="button" data-acao="menor" aria-label="${escaparOracao(traduzirInterface('Diminuir a letra'))}">A−</button>
          <button type="button" data-acao="maior" aria-label="${escaparOracao(traduzirInterface('Aumentar a letra'))}">A+</button>
          <button type="button" class="oracao-leitor-fechar" data-fechar aria-label="${escaparOracao(traduzirInterface('Fechar'))}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M18 6L6 18M6 6l12 12"/></svg></button>
        </div>
      </header>
      <div class="oracao-leitor-corpo" translate="no">
        <span class="oracao-leitor-cruz" aria-hidden="true">✠</span>
        <h2 id="oracao-leitor-titulo">${escaparOracao(noIdioma(o.t))}</h2>
        <p class="oracao-leitor-quando">${escaparOracao(noIdioma(o.q))}</p>
        <div class="oracao-leitor-texto">${htmlDoTextoDaOracao(noIdioma(o.x))}</div>
        ${o.n ? `<p class="oracao-leitor-nota">${escaparOracao(noIdioma(o.n))}</p>` : ''}
        ${santos.length ? `<div class="oracao-leitor-santos">${santos.map((s) => `<button type="button" class="oracao-leitor-santo" data-santo="${s.id}">${escaparOracao(traduzirInterface('Ver a vida de {santo}', { santo: s.nome }))}</button>`).join('')}</div>` : ''}
      </div>
      <footer class="oracao-leitor-rodape">
        <div class="oracao-leitor-acoes">
          ${o.acao ? `<button type="button" class="oracao-leitor-principal" data-acao="passo">${escaparOracao(traduzirInterface(o.acao === 'terco' ? 'Rezar o terço passo a passo' : 'Rezar passo a passo'))}</button>` : ''}
          <button type="button" data-acao="copiar">${escaparOracao(traduzirInterface('Copiar'))}</button>
          <button type="button" data-acao="compartilhar">${escaparOracao(traduzirInterface('Compartilhar'))}</button>
        </div>
        ${varias ? `<div class="oracao-leitor-navegar">
          <button type="button" data-acao="anterior" aria-label="${escaparOracao(traduzirInterface('Anterior'))}">‹ ${escaparOracao(traduzirInterface('Anterior'))}</button>
          <span class="oracao-leitor-posicao">${posicaoNoLeitor + 1} / ${listaDoLeitor.length}</span>
          <button type="button" data-acao="proxima" aria-label="${escaparOracao(traduzirInterface('Próxima'))}">${escaparOracao(traduzirInterface('Próxima'))} ›</button>
        </div>` : ''}
      </footer>
    </article>`;
  const corpo = leitor.querySelector('.oracao-leitor-corpo');
  if (corpo) corpo.scrollTop = 0;
}

function abrirLeitorDeOracao(id, lista, gerada) {
  if (gerada && gerada.gerada && !oracoesGeradas.has(id)) oracoesGeradas.set(id, { santoId: gerada.santos[0], tema: '' });
  listaDoLeitor = Array.isArray(lista) && lista.length ? lista.slice() : [id];
  posicaoNoLeitor = Math.max(0, listaDoLeitor.indexOf(id));
  focoAntesDoLeitor = document.activeElement;
  desenharLeitorDeOracao();
  const leitor = garantirLeitorDeOracao();
  leitor.hidden = false;
  document.body.classList.add('leitor-de-oracao-aberto');
  requestAnimationFrame(() => {
    leitor.classList.add('aberto');
    const fechar = leitor.querySelector('.oracao-leitor-fechar');
    if (fechar) fechar.focus({ preventScroll: true });
  });
}

function fecharLeitorDeOracao() {
  const leitor = document.getElementById('oracao-leitor');
  if (!leitor || leitor.hidden) return;
  leitor.classList.remove('aberto');
  leitor.hidden = true;
  document.body.classList.remove('leitor-de-oracao-aberto');
  if (focoAntesDoLeitor && typeof focoAntesDoLeitor.focus === 'function') focoAntesDoLeitor.focus({ preventScroll: true });
}

function mudarOracaoNoLeitor(passo) {
  if (listaDoLeitor.length < 2) return;
  posicaoNoLeitor = (posicaoNoLeitor + passo + listaDoLeitor.length) % listaDoLeitor.length;
  desenharLeitorDeOracao();
  const leitor = document.getElementById('oracao-leitor');
  const botao = leitor && leitor.querySelector(`[data-acao="${passo > 0 ? 'proxima' : 'anterior'}"]`);
  if (botao) botao.focus({ preventScroll: true });
}

function textoParaCopiarDaOracao() {
  const o = oracaoParaOLeitor(listaDoLeitor[posicaoNoLeitor]);
  if (!o) return { titulo: '', texto: '' };
  return { titulo: noIdioma(o.t), texto: `${noIdioma(o.t)}\n\n${noIdioma(o.x)}` };
}

async function copiarOracaoDoLeitor(botao) {
  const { texto } = textoParaCopiarDaOracao();
  try {
    await navigator.clipboard.writeText(`${texto}\n\n— Lumina Sancti · luminasancti.com`);
    const antes = botao.textContent;
    botao.textContent = traduzirInterface('Copiado!');
    botao.classList.add('feito');
    setTimeout(() => { botao.textContent = antes; botao.classList.remove('feito'); }, 1800);
  } catch (e) {}
}

async function compartilharOracaoDoLeitor(botao) {
  const { titulo, texto } = textoParaCopiarDaOracao();
  if (navigator.share) {
    try {
      await navigator.share({ title: titulo, text: `${texto}\n\n— Lumina Sancti`, url: 'https://luminasancti.com/' });
      return;
    } catch (e) {
      if (e && e.name === 'AbortError') return;
    }
  }
  copiarOracaoDoLeitor(botao);
}

function preencherOracaoEFrasesDoSanto(santo, lugar) {
  if (!lugar || !santo) return;
  const frases = FRASES_DOS_SANTOS.filter((f) => f.santo === santo.id);
  const nome = nomeDoSantoDaOracao(santo.id);
  lugar.innerHTML = `
    <div class="bio-rezar">
      <button type="button" class="bio-rezar-botao" data-santo-rezar="${santo.id}">${iconeDaOracao('santos')}<span>${escaparOracao(traduzirInterface('Rezar a {santo}', { santo: nome }))}</span></button>
    </div>
    ${frases.length ? `<section class="bio-frases">
      <h3 class="bio-frases-titulo">${iconeDaOracao('frases')}${escaparOracao(traduzirInterface('Frases de {santo}', { santo: nome }))}</h3>
      ${frases.map((f) => `<figure class="frase-cartao frase-na-bio" translate="no"><blockquote class="frase-texto">${escaparOracao(noIdioma(f.x))}</blockquote><figcaption class="frase-autor"><span class="frase-fonte">${escaparOracao(noIdioma(f.f))}</span></figcaption></figure>`).join('')}
    </section>` : ''}`;
  const botao = lugar.querySelector('.bio-rezar-botao');
  if (botao) botao.addEventListener('click', () => abrirOracaoDoSanto(santo.id, ''));
}

function botaoDeRezarAoSanto(santo, tema) {
  const nome = typeof textoDoSanto === 'function' ? textoDoSanto(santo).nome : santo.nome;
  return `<button type="button" class="padroeiro-rezar" data-santo-rezar="${santo.id}" data-tema="${escaparOracao(tema || '')}">${iconeDaOracao('santos')}<span>${escaparOracao(traduzirInterface('Rezar a {santo}', { santo: nome }))}</span></button>`;
}

function ligarBotoesDeRezarAoSanto(lugar) {
  lugar.querySelectorAll('.padroeiro-rezar').forEach((botao) => {
    botao.addEventListener('click', (e) => {
      e.stopPropagation();
      abrirOracaoDoSanto(botao.dataset.santoRezar, botao.dataset.tema || '');
    });
  });
}

function redesenharBibliotecaDeOracoes() {
  renderizarDestaquesDasOracoes();
  renderizarCategoriasDasOracoes();
  renderizarListaDeOracoes();
  renderizarFraseDoDiaNoInicio();
  const leitor = document.getElementById('oracao-leitor');
  if (leitor && !leitor.hidden) desenharLeitorDeOracao();
}

let atalhoDaBibliotecaDeOracoes = null;

function iniciarBibliotecaDeOracoes() {
  redesenharBibliotecaDeOracoes();
  const campo = document.getElementById('oracao-busca');
  const sugestoes = document.getElementById('oracao-sugestoes');
  if (campo) {
    let espera = null;
    campo.addEventListener('input', () => {
      atalhoDaBibliotecaDeOracoes = null;
      clearTimeout(espera);
      espera = setTimeout(() => mostrarResultadoDaBuscaNaBiblioteca(campo.value), 150);
    });
    campo.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') { clearTimeout(espera); mostrarResultadoDaBuscaNaBiblioteca(campo.value); }
    });
  }
  if (sugestoes && campo) {
    const lista = typeof SUGESTOES_DE_BUSCA_DE_ORACAO !== 'undefined' ? SUGESTOES_DE_BUSCA_DE_ORACAO : [];
    sugestoes.innerHTML = lista.map((s) => `<button type="button" class="busca-atalho" data-busca="${escaparOracao(s)}">${escaparOracao(s)}</button>`).join('');
    sugestoes.querySelectorAll('.busca-atalho').forEach((botao) => {
      botao.addEventListener('click', () => {
        campo.value = botao.textContent;
        atalhoDaBibliotecaDeOracoes = botao.dataset.busca || null;
        mostrarResultadoDaBuscaNaBiblioteca(botao.dataset.busca || campo.value);
      });
    });
  }
  document.addEventListener('lumina-idioma', () => {
    redesenharBibliotecaDeOracoes();
    if (campo && campo.value.trim()) {
      if (atalhoDaBibliotecaDeOracoes) {
        campo.value = traduzirInterface(atalhoDaBibliotecaDeOracoes);
        mostrarResultadoDaBuscaNaBiblioteca(atalhoDaBibliotecaDeOracoes);
      } else {
        mostrarResultadoDaBuscaNaBiblioteca(campo.value);
      }
    }
  });
  const btnVoltar = document.getElementById('btn-back-oracoes');
  if (btnVoltar) btnVoltar.addEventListener('click', () => mudarDeView('view-home'));
}
