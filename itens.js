const RARIDADES_DOS_ITENS = {
  padrao: { nome: 'Padrão', ordem: 0 },
  comum: { nome: 'Comum', ordem: 1 },
  raro: { nome: 'Raro', ordem: 2 },
  epico: { nome: 'Épico', ordem: 3 },
  lendario: { nome: 'Lendário', ordem: 4 },
  secreto: { nome: 'Secreto', ordem: 5 },
};

const CATEGORIAS_DOS_ITENS = {
  pacotes: { nome: 'Pacotes' },
  pecas_xadrez: { nome: 'Peças do xadrez' },
  pecas_damas: { nome: 'Peças das damas' },
  tabuleiro: { nome: 'Tabuleiro' },
  moldura: { nome: 'Moldura' },
};

const ITENS_DO_JOGO = {
  'xadrez-classico': { categoria: 'pecas_xadrez', raridade: 'padrao', nome: 'Clássicas', conjunto: 'classico' },
  'xadrez-madeira': { categoria: 'pecas_xadrez', raridade: 'comum', nome: 'Madeira', conjunto: 'madeira' },
  'xadrez-catedral': { categoria: 'pecas_xadrez', raridade: 'raro', nome: 'Catedral', conjunto: 'catedral' },
  'xadrez-ouro-prata': { categoria: 'pecas_xadrez', raridade: 'epico', nome: 'Ouro e prata', conjunto: 'ouro-prata' },
  'xadrez-diamante': { categoria: 'pecas_xadrez', raridade: 'lendario', nome: 'Diamante e ônix', conjunto: 'diamante', pacote: 'diamante' },
  'damas-classico': { categoria: 'pecas_damas', raridade: 'padrao', nome: 'Clássicas', conjunto: 'classico' },
  'damas-madeira': { categoria: 'pecas_damas', raridade: 'comum', nome: 'Madeira', conjunto: 'madeira' },
  'damas-medalha': { categoria: 'pecas_damas', raridade: 'raro', nome: 'Medalhas', conjunto: 'medalha' },
  'damas-ouro-prata': { categoria: 'pecas_damas', raridade: 'epico', nome: 'Ouro e prata', conjunto: 'ouro-prata' },
  'damas-diamante': { categoria: 'pecas_damas', raridade: 'lendario', nome: 'Diamante e ônix', conjunto: 'diamante', pacote: 'diamante' },
  'tabuleiro-madeira': { categoria: 'tabuleiro', raridade: 'padrao', nome: 'Madeira', tema: 'madeira' },
  'tabuleiro-jardim': { categoria: 'tabuleiro', raridade: 'comum', nome: 'Jardim', tema: 'jardim' },
  'tabuleiro-marmore': { categoria: 'tabuleiro', raridade: 'raro', nome: 'Mármore', tema: 'marmore' },
  'tabuleiro-noite': { categoria: 'tabuleiro', raridade: 'raro', nome: 'Noite santa', tema: 'noite' },
  'tabuleiro-vitral': { categoria: 'tabuleiro', raridade: 'epico', nome: 'Vitral', tema: 'vitral' },
  'tabuleiro-diamante': { categoria: 'tabuleiro', raridade: 'lendario', nome: 'Diamante', tema: 'diamante', pacote: 'diamante' },
  'moldura-ouro': { categoria: 'moldura', raridade: 'padrao', nome: 'Ouro', tema: 'ouro' },
  'moldura-prata': { categoria: 'moldura', raridade: 'comum', nome: 'Prata', tema: 'prata' },
  'moldura-bronze': { categoria: 'moldura', raridade: 'comum', nome: 'Bronze', tema: 'bronze' },
  'moldura-esmeralda': { categoria: 'moldura', raridade: 'raro', nome: 'Esmeralda', tema: 'esmeralda', pacote: 'esmeralda' },
  'moldura-rubi': { categoria: 'moldura', raridade: 'epico', nome: 'Rubi', tema: 'rubi', pacote: 'rubi' },
  'moldura-ametista': { categoria: 'moldura', raridade: 'epico', nome: 'Ametista', tema: 'ametista', pacote: 'ametista' },
  'moldura-diamante': { categoria: 'moldura', raridade: 'lendario', nome: 'Diamante', tema: 'diamante', pacote: 'diamante' },
  'xadrez-vidro': { categoria: 'pecas_xadrez', raridade: 'comum', nome: 'Vidro', conjunto: 'vidro', pacote: 'vidro' },
  'damas-vidro': { categoria: 'pecas_damas', raridade: 'comum', nome: 'Vidro', conjunto: 'vidro', pacote: 'vidro' },
  'tabuleiro-vidro': { categoria: 'tabuleiro', raridade: 'comum', nome: 'Vidro', tema: 'vidro', pacote: 'vidro' },
  'moldura-vidro': { categoria: 'moldura', raridade: 'comum', nome: 'Vidro', tema: 'vidro', pacote: 'vidro' },
  'xadrez-esmeralda': { categoria: 'pecas_xadrez', raridade: 'raro', nome: 'Esmeralda', conjunto: 'esmeralda', pacote: 'esmeralda' },
  'damas-esmeralda': { categoria: 'pecas_damas', raridade: 'raro', nome: 'Esmeralda', conjunto: 'esmeralda', pacote: 'esmeralda' },
  'tabuleiro-esmeralda': { categoria: 'tabuleiro', raridade: 'raro', nome: 'Esmeralda', tema: 'esmeralda', pacote: 'esmeralda' },
  'xadrez-ouro': { categoria: 'pecas_xadrez', raridade: 'raro', nome: 'Ouro', conjunto: 'ouro', pacote: 'ouro' },
  'damas-ouro': { categoria: 'pecas_damas', raridade: 'raro', nome: 'Ouro', conjunto: 'ouro', pacote: 'ouro' },
  'tabuleiro-ouro': { categoria: 'tabuleiro', raridade: 'raro', nome: 'Ouro', tema: 'ouro', pacote: 'ouro' },
  'moldura-ouro-real': { categoria: 'moldura', raridade: 'raro', nome: 'Ouro real', tema: 'ouro-real', pacote: 'ouro' },
  'xadrez-rubi': { categoria: 'pecas_xadrez', raridade: 'epico', nome: 'Rubi', conjunto: 'rubi', pacote: 'rubi' },
  'damas-rubi': { categoria: 'pecas_damas', raridade: 'epico', nome: 'Rubi', conjunto: 'rubi', pacote: 'rubi' },
  'tabuleiro-rubi': { categoria: 'tabuleiro', raridade: 'epico', nome: 'Rubi', tema: 'rubi', pacote: 'rubi' },
  'xadrez-obsidiana': { categoria: 'pecas_xadrez', raridade: 'epico', nome: 'Obsidiana e pérola', conjunto: 'obsidiana', pacote: 'obsidiana' },
  'damas-obsidiana': { categoria: 'pecas_damas', raridade: 'epico', nome: 'Obsidiana e pérola', conjunto: 'obsidiana', pacote: 'obsidiana' },
  'tabuleiro-obsidiana': { categoria: 'tabuleiro', raridade: 'epico', nome: 'Obsidiana', tema: 'obsidiana', pacote: 'obsidiana' },
  'moldura-obsidiana': { categoria: 'moldura', raridade: 'epico', nome: 'Obsidiana', tema: 'obsidiana', pacote: 'obsidiana' },
  'xadrez-celestial': { categoria: 'pecas_xadrez', raridade: 'secreto', nome: 'Pedra celestial', conjunto: 'celestial', pacote: 'celestial' },
  'damas-celestial': { categoria: 'pecas_damas', raridade: 'secreto', nome: 'Pedra celestial', conjunto: 'celestial', pacote: 'celestial' },
  'tabuleiro-celestial': { categoria: 'tabuleiro', raridade: 'secreto', nome: 'Pedra celestial', tema: 'celestial', pacote: 'celestial' },
  'moldura-celestial': { categoria: 'moldura', raridade: 'secreto', nome: 'Pedra celestial', tema: 'celestial', pacote: 'celestial' },
  'xadrez-cristal': { categoria: 'pecas_xadrez', raridade: 'epico', nome: 'Cristal', conjunto: 'cristal', pacote: 'cristal' },
  'damas-cristal': { categoria: 'pecas_damas', raridade: 'epico', nome: 'Cristal', conjunto: 'cristal', pacote: 'cristal' },
  'tabuleiro-cristal': { categoria: 'tabuleiro', raridade: 'epico', nome: 'Cristal', tema: 'cristal', pacote: 'cristal' },
  'moldura-cristal': { categoria: 'moldura', raridade: 'epico', nome: 'Cristal', tema: 'cristal', pacote: 'cristal' },
  'xadrez-safira': { categoria: 'pecas_xadrez', raridade: 'raro', nome: 'Safira', conjunto: 'safira', pacote: 'safira' },
  'damas-safira': { categoria: 'pecas_damas', raridade: 'raro', nome: 'Safira', conjunto: 'safira', pacote: 'safira' },
  'tabuleiro-safira': { categoria: 'tabuleiro', raridade: 'raro', nome: 'Safira', tema: 'safira', pacote: 'safira' },
  'moldura-safira': { categoria: 'moldura', raridade: 'raro', nome: 'Safira', tema: 'safira', pacote: 'safira' },
  'xadrez-ametista': { categoria: 'pecas_xadrez', raridade: 'epico', nome: 'Ametista', conjunto: 'ametista', pacote: 'ametista' },
  'damas-ametista': { categoria: 'pecas_damas', raridade: 'epico', nome: 'Ametista', conjunto: 'ametista', pacote: 'ametista' },
  'tabuleiro-ametista': { categoria: 'tabuleiro', raridade: 'epico', nome: 'Ametista', tema: 'ametista', pacote: 'ametista' },
  'xadrez-ambar': { categoria: 'pecas_xadrez', raridade: 'raro', nome: 'Âmbar', conjunto: 'ambar', pacote: 'ambar' },
  'damas-ambar': { categoria: 'pecas_damas', raridade: 'raro', nome: 'Âmbar', conjunto: 'ambar', pacote: 'ambar' },
  'tabuleiro-ambar': { categoria: 'tabuleiro', raridade: 'raro', nome: 'Âmbar', tema: 'ambar', pacote: 'ambar' },
  'moldura-ambar': { categoria: 'moldura', raridade: 'raro', nome: 'Âmbar', tema: 'ambar', pacote: 'ambar' },
  'xadrez-gotico': { categoria: 'pecas_xadrez', raridade: 'lendario', nome: 'Catedral gótica', conjunto: 'gotico', pacote: 'gotico' },
  'damas-gotico': { categoria: 'pecas_damas', raridade: 'lendario', nome: 'Catedral gótica', conjunto: 'gotico', pacote: 'gotico' },
  'tabuleiro-gotico': { categoria: 'tabuleiro', raridade: 'lendario', nome: 'Catedral gótica', tema: 'gotico', pacote: 'gotico' },
  'moldura-gotica': { categoria: 'moldura', raridade: 'lendario', nome: 'Catedral gótica', tema: 'gotica', pacote: 'gotico' },
  'xadrez-sagrada': { categoria: 'pecas_xadrez', raridade: 'lendario', nome: 'Sagrada Família', conjunto: 'sagrada', pacote: 'sagrada' },
  'damas-sagrada': { categoria: 'pecas_damas', raridade: 'lendario', nome: 'Sagrada Família', conjunto: 'sagrada', pacote: 'sagrada' },
  'tabuleiro-sagrada': { categoria: 'tabuleiro', raridade: 'lendario', nome: 'Sagrada Família', tema: 'sagrada', pacote: 'sagrada' },
  'moldura-sagrada': { categoria: 'moldura', raridade: 'lendario', nome: 'Sagrada Família', tema: 'sagrada', pacote: 'sagrada' },
};

const PACOTES_DOS_ITENS = {
  vidro: { nome: 'Pacote Vidro', raridade: 'comum' },
  safira: { nome: 'Pacote Safira', raridade: 'raro' },
  esmeralda: { nome: 'Pacote Esmeralda', raridade: 'raro' },
  ouro: { nome: 'Pacote Ouro', raridade: 'raro' },
  ambar: { nome: 'Pacote Âmbar', raridade: 'raro' },
  cristal: { nome: 'Pacote Cristal', raridade: 'epico' },
  rubi: { nome: 'Pacote Rubi', raridade: 'epico' },
  ametista: { nome: 'Pacote Ametista', raridade: 'epico' },
  obsidiana: { nome: 'Pacote Obsidiana', raridade: 'epico' },
  diamante: { nome: 'Pacote Diamante', raridade: 'lendario' },
  gotico: { nome: 'Pacote Catedral gótica', raridade: 'lendario' },
  sagrada: { nome: 'Pacote Sagrada Família', raridade: 'lendario' },
  celestial: { nome: 'Pacote Pedra celestial', raridade: 'secreto' },
};

let itensDoPerfil = { perfil: null, itens: new Set(), equipados: {}, carregado: false };
let categoriaAbertaNaColecao = null;

function trDoItem(texto, valores) {
  return typeof tr === 'function' ? tr(texto, valores) : String(texto).replace(/\{(\w+)\}/g, (_, k) => (valores && valores[k] !== undefined ? valores[k] : ''));
}

function escaparDoItem(texto) {
  return String(texto == null ? '' : texto).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

function perfilDosItens() {
  return typeof perfilDosBaus === 'function' ? perfilDosBaus() : null;
}

async function carregarItensDoPerfil(forcar) {
  const perfil = perfilDosItens();
  if (!perfil) {
    itensDoPerfil = { perfil: null, itens: new Set(), equipados: {}, carregado: true };
    return itensDoPerfil;
  }
  if (!forcar && itensDoPerfil.carregado && itensDoPerfil.perfil === perfil.id) return itensDoPerfil;
  try {
    const dados = await chamarDosBaus('itens_meus');
    itensDoPerfil = {
      perfil: perfil.id,
      itens: new Set(dados && dados.tem_tudo ? Object.keys(ITENS_DO_JOGO) : ((dados && dados.itens) || []).map((i) => i.id)),
      equipados: (dados && dados.equipados) || {},
      carregado: true,
    };
  } catch (e) {
    itensDoPerfil = { perfil: perfil.id, itens: new Set(), equipados: {}, carregado: true };
  }
  return itensDoPerfil;
}

function itemPadraoDa(categoria) {
  return Object.keys(ITENS_DO_JOGO).find((id) => ITENS_DO_JOGO[id].categoria === categoria && ITENS_DO_JOGO[id].raridade === 'padrao');
}

function temItem(id) {
  const item = ITENS_DO_JOGO[id];
  if (!item) return false;
  return item.raridade === 'padrao' || itensDoPerfil.itens.has(id);
}

function itemEquipado(categoria) {
  const perfil = perfilDosItens();
  const escolhido = perfil && itensDoPerfil.perfil === perfil.id ? itensDoPerfil.equipados[categoria] : null;
  return escolhido && ITENS_DO_JOGO[escolhido] && temItem(escolhido) ? escolhido : itemPadraoDa(categoria);
}

function conjuntoDoXadrez() {
  return ITENS_DO_JOGO[itemEquipado('pecas_xadrez')].conjunto;
}

function conjuntoDasDamas() {
  return ITENS_DO_JOGO[itemEquipado('pecas_damas')].conjunto;
}

function classesDoTabuleiro() {
  return `tema-${ITENS_DO_JOGO[itemEquipado('tabuleiro')].tema} moldura-${ITENS_DO_JOGO[itemEquipado('moldura')].tema}`;
}

function previaDoItem(id) {
  const item = ITENS_DO_JOGO[id];
  if (!item) return '';
  const casas = '<i class="xadrez-casa clara"></i><i class="xadrez-casa escura"></i><i class="xadrez-casa escura"></i><i class="xadrez-casa clara"></i>';
  if (item.categoria === 'pecas_xadrez' && typeof xadrezPecaSvg === 'function') return `<span class="item-previa item-previa-pecas">${xadrezPecaSvg('K', item.conjunto)}${xadrezPecaSvg('q', item.conjunto)}</span>`;
  if (item.categoria === 'pecas_damas' && typeof damasPecaSvg === 'function') return `<span class="item-previa item-previa-pecas">${damasPecaSvg('W', item.conjunto)}${damasPecaSvg('b', item.conjunto)}</span>`;
  if (item.categoria === 'tabuleiro') return `<span class="item-previa xadrez-tabuleiro item-previa-tabuleiro tema-${item.tema} moldura-ouro">${casas}</span>`;
  return `<span class="item-previa xadrez-tabuleiro item-previa-tabuleiro tema-madeira moldura-${item.tema}">${casas}</span>`;
}

function seloDaRaridade(raridade) {
  const r = RARIDADES_DOS_ITENS[raridade] || RARIDADES_DOS_ITENS.comum;
  return `<em class="item-raridade raridade-${raridade}">${escaparDoItem(trDoItem(r.nome))}</em>`;
}

function categoriasDaColecao(jogo) {
  if (jogo === 'xadrez') return ['pacotes', 'pecas_xadrez', 'tabuleiro', 'moldura'];
  if (jogo === 'damas') return ['pacotes', 'pecas_damas', 'tabuleiro', 'moldura'];
  return ['pacotes', 'pecas_xadrez', 'pecas_damas', 'tabuleiro', 'moldura'];
}

function itensDoPacote(pacote) {
  return Object.keys(ITENS_DO_JOGO).filter((id) => ITENS_DO_JOGO[id].pacote === pacote);
}

function previaDoPacote(pacote) {
  const ids = itensDoPacote(pacote);
  const achar = (categoria) => ids.map((id) => ITENS_DO_JOGO[id]).find((i) => i.categoria === categoria) || {};
  const casas = '<i class="xadrez-casa clara"></i><i class="xadrez-casa escura"></i><i class="xadrez-casa escura"></i><i class="xadrez-casa clara"></i>';
  const conjunto = achar('pecas_xadrez').conjunto;
  const pecas = typeof xadrezPecaSvg === 'function' ? xadrezPecaSvg('K', conjunto) + xadrezPecaSvg('q', conjunto) : '';
  return `<span class="item-previa pacote-previa"><span class="xadrez-tabuleiro item-previa-tabuleiro tema-${achar('tabuleiro').tema || 'madeira'} moldura-${achar('moldura').tema || 'ouro'}">${casas}</span><span class="pacote-pecas">${pecas}</span></span>`;
}

function htmlDosPacotes() {
  return `<div class="colecao-grade colecao-pacotes">${Object.keys(PACOTES_DOS_ITENS).map((pacote) => {
    const info = PACOTES_DOS_ITENS[pacote];
    const ids = itensDoPacote(pacote);
    const meusIds = ids.filter((id) => temItem(id));
    const meus = meusIds.length;
    const misterio = info.raridade === 'secreto' && meus === 0;
    const emUso = meus > 0 && meusIds.every((id) => itemEquipado(ITENS_DO_JOGO[id].categoria) === id);
    let texto = trDoItem('Encontre em baús');
    if (misterio) texto = trDoItem('Só a equipe pode dar de presente');
    else if (emUso && meus === ids.length) texto = trDoItem('Usando');
    else if (meus === ids.length) texto = trDoItem('Usar pacote');
    else if (meus) texto = trDoItem('{n} de {total} peças do pacote', { n: meus, total: ids.length });
    return `<button type="button" class="colecao-item colecao-pacote raridade-${info.raridade}${meus ? '' : ' bloqueado'}${misterio ? ' misterio' : ''}${emUso ? ' usando' : ''}" data-pacote="${pacote}" aria-pressed="${emUso ? 'true' : 'false'}">
      ${misterio ? '<span class="item-previa pacote-misterio" aria-hidden="true">?</span>' : previaDoPacote(pacote)}
      <b>${escaparDoItem(misterio ? trDoItem('Pacote secreto') : trDoItem(info.nome))}</b>
      ${seloDaRaridade(info.raridade)}
      <small>${escaparDoItem(texto)}</small>
    </button>`;
  }).join('')}</div>`;
}

async function equiparPacote(pacote) {
  const ids = itensDoPacote(pacote).filter((id) => temItem(id));
  for (const id of ids) await equiparItem(id);
  return ids.length > 0;
}

function htmlDaColecao(jogo) {
  const categorias = categoriasDaColecao(jogo);
  if (!categorias.includes(categoriaAbertaNaColecao)) categoriaAbertaNaColecao = categorias[0];
  const perfil = perfilDosItens();
  const ids = Object.keys(ITENS_DO_JOGO).filter((id) => ITENS_DO_JOGO[id].categoria === categoriaAbertaNaColecao)
    .sort((a, b) => RARIDADES_DOS_ITENS[ITENS_DO_JOGO[a].raridade].ordem - RARIDADES_DOS_ITENS[ITENS_DO_JOGO[b].raridade].ordem);
  const equipado = itemEquipado(categoriaAbertaNaColecao);
  const total = Object.keys(ITENS_DO_JOGO).filter((id) => ITENS_DO_JOGO[id].raridade !== 'padrao');
  const meus = total.filter((id) => itensDoPerfil.itens.has(id)).length;
  return `
    <strong class="bau-titulo">${escaparDoItem(trDoItem('Personalizar'))}</strong>
    <span class="colecao-conta">${escaparDoItem(trDoItem('{n} de {total} itens raros', { n: meus, total: total.length }))}</span>
    <div class="colecao-abas" role="tablist">${categorias.map((c) => `<button type="button" class="colecao-aba${c === categoriaAbertaNaColecao ? ' ativa' : ''}" data-categoria="${c}" role="tab">${escaparDoItem(trDoItem(CATEGORIAS_DOS_ITENS[c].nome))}</button>`).join('')}</div>
    ${categoriaAbertaNaColecao === 'pacotes' ? htmlDosPacotes() : `<div class="colecao-grade">${ids.map((id) => {
      const item = ITENS_DO_JOGO[id];
      const meu = temItem(id);
      const usando = id === equipado;
      const misterio = item.raridade === 'secreto' && !meu;
      let texto = trDoItem('Encontre em baús');
      if (usando) texto = trDoItem('Usando');
      else if (meu) texto = trDoItem('Usar');
      else if (misterio) texto = trDoItem('Só a equipe pode dar de presente');
      return `<button type="button" class="colecao-item raridade-${item.raridade}${meu ? '' : ' bloqueado'}${usando ? ' usando' : ''}${misterio ? ' misterio' : ''}" data-item="${id}" ${meu ? '' : 'aria-disabled="true"'}>
        ${misterio ? '<span class="item-previa pacote-misterio" aria-hidden="true">?</span>' : previaDoItem(id)}
        <b>${escaparDoItem(misterio ? trDoItem('Item secreto') : trDoItem(item.nome))}</b>
        ${seloDaRaridade(item.raridade)}
        <small>${escaparDoItem(texto)}</small>
      </button>`;
    }).join('')}</div>`}
    ${perfil ? '' : `<p class="colecao-aviso">${escaparDoItem(trDoItem('Entre na sua conta e abra baús para ganhar itens raros.'))}</p>`}
    <button type="button" class="bau-botao" id="colecao-fechar">${escaparDoItem(trDoItem('Pronto'))}</button>`;
}

async function abrirColecaoDeItens(jogo, aoMudar) {
  if (typeof janelaDoBau !== 'function') return;
  await carregarItensDoPerfil();
  const fundo = janelaDoBau(htmlDaColecao(jogo), 'colecao-janela');
  const ligar = () => {
    const caixa = fundo.querySelector('.bau-janela-caixa');
    if (!caixa) return;
    caixa.querySelectorAll('.colecao-aba').forEach((aba) => aba.addEventListener('click', () => {
      categoriaAbertaNaColecao = aba.dataset.categoria;
      caixa.innerHTML = htmlDaColecao(jogo);
      ligar();
    }));
    caixa.querySelectorAll('.colecao-pacote').forEach((botao) => botao.addEventListener('click', async () => {
      const pacote = botao.dataset.pacote;
      if (!itensDoPacote(pacote).some((id) => temItem(id))) {
        if (typeof mostrarAvisoTrilhas === 'function') mostrarAvisoTrilhas(PACOTES_DOS_ITENS[pacote].raridade === 'secreto' ? trDoItem('Esse pacote é secreto: só a equipe do Lumina Sancti pode dar de presente.') : trDoItem('Esse item aparece nos baús. Quanto mais raro o baú, maior a chance.'));
        return;
      }
      await equiparPacote(pacote);
      caixa.innerHTML = htmlDaColecao(jogo);
      ligar();
      if (typeof aoMudar === 'function') aoMudar();
    }));
    caixa.querySelectorAll('.colecao-item[data-item]').forEach((botao) => botao.addEventListener('click', async () => {
      const id = botao.dataset.item;
      if (!temItem(id)) {
        if (typeof mostrarAvisoTrilhas === 'function') mostrarAvisoTrilhas(ITENS_DO_JOGO[id] && ITENS_DO_JOGO[id].raridade === 'secreto' ? trDoItem('Esse pacote é secreto: só a equipe do Lumina Sancti pode dar de presente.') : trDoItem('Esse item aparece nos baús. Quanto mais raro o baú, maior a chance.'));
        return;
      }
      await equiparItem(id);
      caixa.innerHTML = htmlDaColecao(jogo);
      ligar();
      if (typeof aoMudar === 'function') aoMudar();
    }));
    const fechar = caixa.querySelector('#colecao-fechar');
    if (fechar) fechar.addEventListener('click', fecharJanelaDoBau);
  };
  ligar();
}

async function equiparItem(id) {
  const item = ITENS_DO_JOGO[id];
  if (!item || !temItem(id)) return false;
  const antes = Object.assign({}, itensDoPerfil.equipados);
  itensDoPerfil.equipados[item.categoria] = id;
  const perfil = perfilDosItens();
  if (!perfil) return true;
  try {
    const dados = await chamarDosBaus('item_equipar', { _item: id });
    if (dados && dados.equipados) itensDoPerfil.equipados = dados.equipados;
    return true;
  } catch (e) {
    itensDoPerfil.equipados = antes;
    if (typeof mostrarAvisoTrilhas === 'function') mostrarAvisoTrilhas(trDoItem('Não deu para trocar agora. Tente de novo.'));
    return false;
  }
}

function htmlDoItemDoBau(resultadoDoItem, indice) {
  if (!resultadoDoItem) return '';
  if (resultadoDoItem.duplicado) {
    return `<span class="bau-premio bau-premio-repetido" style="--i:${indice}"><small>${escaparDoItem(trDoItem('Item repetido: virou +{n} de Fé', { n: resultadoDoItem.fe }))}</small></span>`;
  }
  const item = ITENS_DO_JOGO[resultadoDoItem.id];
  if (!item) return '';
  return `<span class="bau-premio bau-premio-item raridade-${item.raridade}" style="--i:${indice}">
    ${previaDoItem(resultadoDoItem.id)}
    <b>${escaparDoItem(trDoItem(item.nome))}</b>
    ${seloDaRaridade(item.raridade)}
    <button type="button" class="bau-usar-item" data-item="${resultadoDoItem.id}">${escaparDoItem(trDoItem('Usar agora'))}</button>
  </span>`;
}

function ligarItemDoBau(lugar, resultadoDoItem) {
  if (!lugar || !resultadoDoItem || resultadoDoItem.duplicado || !resultadoDoItem.id) return;
  itensDoPerfil.itens.add(resultadoDoItem.id);
  const botao = lugar.querySelector('.bau-usar-item');
  if (!botao) return;
  botao.addEventListener('click', async () => {
    botao.disabled = true;
    const foi = await equiparItem(resultadoDoItem.id);
    botao.textContent = foi ? trDoItem('Usando') : trDoItem('Usar agora');
    if (!foi) botao.disabled = false;
  });
}
