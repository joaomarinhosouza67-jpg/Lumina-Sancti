let pedidosDeOracao = [];
let abaDosPedidos = 'todos';
let carregandoPedidos = false;
let intencoesDoDiario = [];
let intencaoEditando = null;
const fotosDosPedidos = {};
const TAMANHO_DA_PAGINA_DOS_PEDIDOS = 30;

function mensagemDosPedidos(erro) {
  const texto = String((erro && erro.message) || erro || '');
  if (texto.includes('pedido_texto')) return 'Escreva o pedido com 5 a 300 letras.';
  if (texto.includes('palavra_bloqueada')) return 'Tem uma palavra que não é permitida. Reescreva e tente de novo.';
  if (texto.includes('pedido_demais')) return 'Você já fez 3 pedidos hoje. Amanhã você pode pedir de novo.';
  if (texto.includes('pedido_nao_encontrado')) return 'Esse pedido não existe mais.';
  if (texto.includes('intencao_texto')) return 'Escreva a intenção com até 500 letras.';
  if (texto.includes('intencao_demais')) return 'Seu diário já tem 300 intenções. Apague algumas para escrever novas.';
  if (texto.includes('intencao_nao_encontrada')) return 'Essa intenção não existe mais.';
  if (typeof mensagemDoCenaculo === 'function') return mensagemDoCenaculo(erro);
  return 'Não foi possível fazer isso agora. Tente de novo em instantes.';
}

function avisoDosPedidos(texto) {
  if (typeof mostrarAvisoTrilhas === 'function') mostrarAvisoTrilhas(texto);
}

async function chamarDosPedidos(nome, argumentos) {
  if (typeof chamarCenaculo === 'function') return chamarCenaculo(nome, argumentos);
  const { data, error } = await supabaseCliente.rpc(nome, argumentos || {});
  if (error) throw error;
  return data;
}

function perfilParaPedidos(destino, pagina) {
  if (typeof contaLogada !== 'function' || !contaLogada()) {
    avisoDosPedidos('Entre na sua conta para continuar.');
    if (typeof irParaLogin === 'function') irParaLogin();
    return null;
  }
  if (typeof modoInfantilAtivo === 'function' && modoInfantilAtivo()) {
    if (typeof paginaSoParaAdultos === 'function') paginaSoParaAdultos(pagina);
    return null;
  }
  const perfil = typeof perfilAdultoAtivo === 'function' ? perfilAdultoAtivo() : null;
  if (!perfil) {
    if (typeof abrirSelecaoDePerfis === 'function') abrirSelecaoDePerfis(destino);
    return null;
  }
  return perfil;
}

function voltarParaOracoes() {
  return `<button class="btn-back dev-voltar"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg><span>${escaparTexto(tr('Orações do dia a dia'))}</span></button>`;
}

function dataCurtaDoPedido(iso) {
  const data = new Date(iso);
  if (Number.isNaN(data.getTime())) return '';
  const local = typeof localDoIdioma === 'function' ? localDoIdioma() : 'pt-BR';
  return data.toLocaleDateString(local, { day: 'numeric', month: 'short' });
}

function quandoDoPedido(iso) {
  return typeof haQuantoTempo === 'function' ? tr(haQuantoTempo(iso)) : dataCurtaDoPedido(iso);
}

function totalDeQuemRezou(n) {
  const total = Number(n) || 0;
  if (total === 0) return '';
  return total === 1 ? tr('1 pessoa rezou') : tr('{n} pessoas rezaram', { n: total });
}

function abrirPedidosDeOracao() {
  const perfil = perfilParaPedidos('pedidos', 'view-pedidos');
  if (!perfil) return;
  if (typeof closeSidebar === 'function') closeSidebar();
  abaDosPedidos = 'todos';
  mudarDeView('view-pedidos');
  desenharPaginaDosPedidos();
  carregarPedidos(false);
  window.scrollTo({ top: 0, behavior: 'auto' });
}

function desenharPaginaDosPedidos() {
  const lugar = document.getElementById('pedidos-conteudo');
  if (!lugar) return;
  lugar.innerHTML = `${voltarParaOracoes()}
    <header class="dev-topo">
      <p class="dev-selo">${escaparTexto(tr('Rezem por mim'))}</p>
      <h2 class="section-title">${escaparTexto(tr('Pedidos de oração'))}</h2>
      <div class="title-divider"></div>
    </header>
    <form class="pedido-novo" id="pedido-novo" autocomplete="off">
      <textarea id="pedido-texto" maxlength="300" rows="3" placeholder="${escaparTexto(tr('Pelo que você quer que rezem?'))}"></textarea>
      <div class="pedido-novo-rodape">
        <label class="pedido-anonimo"><input type="checkbox" id="pedido-anonimo"><span>${escaparTexto(tr('Sem mostrar meu nome'))}</span></label>
        <small class="pedido-contador" id="pedido-contador">0/300</small>
        <button type="submit" class="licao-botao pedido-enviar" id="pedido-enviar">${escaparTexto(tr('Pedir oração'))}</button>
      </div>
    </form>
    <div class="pedidos-abas" role="tablist">
      <button type="button" class="pedidos-aba${abaDosPedidos === 'todos' ? ' ativa' : ''}" data-aba="todos" role="tab">${escaparTexto(tr('Todos'))}</button>
      <button type="button" class="pedidos-aba${abaDosPedidos === 'meus' ? ' ativa' : ''}" data-aba="meus" role="tab">${escaparTexto(tr('Meus pedidos'))}</button>
    </div>
    <div class="pedidos-lista" id="pedidos-lista"></div>
    <button type="button" class="pedidos-mais" id="pedidos-mais" hidden>${escaparTexto(tr('Ver mais'))}</button>`;
  lugar.querySelector('.dev-voltar').addEventListener('click', () => mudarDeView('view-oracoes'));
  const texto = lugar.querySelector('#pedido-texto');
  const contador = lugar.querySelector('#pedido-contador');
  texto.addEventListener('input', () => { contador.textContent = `${texto.value.length}/300`; });
  lugar.querySelector('#pedido-novo').addEventListener('submit', enviarPedidoDeOracao);
  lugar.querySelectorAll('.pedidos-aba').forEach((aba) => aba.addEventListener('click', () => {
    if (aba.dataset.aba === abaDosPedidos) return;
    abaDosPedidos = aba.dataset.aba;
    lugar.querySelectorAll('.pedidos-aba').forEach((a) => a.classList.toggle('ativa', a === aba));
    carregarPedidos(false);
  }));
  lugar.querySelector('#pedidos-mais').addEventListener('click', () => carregarPedidos(true));
}

async function carregarFotosDosPedidos(lista) {
  const caminhos = lista.map((p) => p.avatar_path).filter((c) => c && !fotosDosPedidos[c]);
  if (!caminhos.length || typeof enderecosAssinados !== 'function') return;
  Object.assign(fotosDosPedidos, await enderecosAssinados('avatars', caminhos));
}

async function carregarPedidos(maisAntigos) {
  const lista = document.getElementById('pedidos-lista');
  const mais = document.getElementById('pedidos-mais');
  const perfil = typeof perfilAdultoAtivo === 'function' ? perfilAdultoAtivo() : null;
  if (!lista || !perfil || carregandoPedidos) return;
  carregandoPedidos = true;
  if (!maisAntigos) {
    pedidosDeOracao = [];
    lista.innerHTML = '<div class="marco-esqueleto"></div><div class="marco-esqueleto"></div>';
  }
  if (mais) mais.hidden = true;
  const aba = abaDosPedidos;
  try {
    let novos;
    if (aba === 'meus') {
      novos = ((await chamarDosPedidos('meus_pedidos_oracao', { _pid: perfil.id })) || []).map((p) => Object.assign({ meu: true, nome: perfil.nome, avatar_key: perfil.avatar }, p));
    } else {
      const antes = maisAntigos && pedidosDeOracao.length ? pedidosDeOracao[pedidosDeOracao.length - 1].id : null;
      novos = (await chamarDosPedidos('pedidos_oracao_lista', { _pid: perfil.id, _antes: antes })) || [];
      await carregarFotosDosPedidos(novos);
    }
    if (aba !== abaDosPedidos) return;
    pedidosDeOracao = pedidosDeOracao.concat(novos);
    desenharListaDosPedidos();
    if (mais) mais.hidden = aba === 'meus' || novos.length < TAMANHO_DA_PAGINA_DOS_PEDIDOS;
  } catch (erro) {
    if (!maisAntigos) lista.innerHTML = `<p class="not-found-msg">${escaparTexto(tr(mensagemDosPedidos(erro)))}</p>`;
    else avisoDosPedidos(mensagemDosPedidos(erro));
  } finally {
    carregandoPedidos = false;
  }
}

function avatarDoPedido(p) {
  if (p.anonimo && !p.meu) return `<span class="avatar avatar-pequeno pedido-anonimo-foto">${typeof icone === 'function' ? icone('pomba') : ''}</span>`;
  const perfil = typeof perfilAdultoAtivo === 'function' ? perfilAdultoAtivo() : null;
  const foto = p.meu ? (perfil || {}).fotoUrl : fotosDosPedidos[p.avatar_path];
  return desenharAvatar(p.avatar_key, foto || '', 'pequeno');
}

function cartaoDoPedido(p) {
  const nome = p.anonimo && !p.meu ? tr('Anônimo') : (p.meu ? tr('Você') : (p.nome || ''));
  const total = totalDeQuemRezou(p.rezaram);
  const rezar = p.meu
    ? ''
    : `<button type="button" class="pedido-rezar${p.eu_rezei ? ' rezado' : ''}" aria-pressed="${p.eu_rezei ? 'true' : 'false'}"${p.eu_rezei ? ' disabled' : ''}>${typeof icone === 'function' ? icone('vela') : ''}<span>${escaparTexto(tr(p.eu_rezei ? 'Rezei' : 'Rezar'))}</span></button>`;
  const menu = p.meu
    ? `<button type="button" class="icon-btn pedido-apagar" aria-label="${escaparTexto(tr('Apagar pedido'))}">${typeof icone === 'function' ? icone('lixeira') : ''}</button>`
    : `<button type="button" class="pedido-denunciar">${escaparTexto(tr('Denunciar'))}</button>`;
  return `
    <article class="pedido-cartao${p.eu_rezei ? ' rezado' : ''}${p.oculto ? ' oculto' : ''}" data-pedido="${escaparTexto(p.id)}">
      <header class="pedido-cabecalho">
        ${avatarDoPedido(p)}
        <span class="pedido-autor"><strong translate="no">${escaparTexto(nome)}</strong><small>${escaparTexto(quandoDoPedido(p.criado_em))}${p.meu && p.anonimo ? ` · ${escaparTexto(tr('sem nome'))}` : ''}</small></span>
        ${menu}
      </header>
      <p class="pedido-texto" translate="no">${escaparTexto(p.texto)}</p>
      ${p.oculto ? `<p class="pedido-escondido">${escaparTexto(tr('Escondido pela equipe'))}</p>` : ''}
      <footer class="pedido-rodape">
        ${rezar}
        <small class="pedido-total">${escaparTexto(total)}</small>
      </footer>
    </article>`;
}

function desenharListaDosPedidos() {
  const lista = document.getElementById('pedidos-lista');
  if (!lista) return;
  if (!pedidosDeOracao.length) {
    lista.innerHTML = `<div class="pedidos-vazio">${typeof icone === 'function' ? icone('pomba') : ''}<p>${escaparTexto(abaDosPedidos === 'meus' ? tr('Você ainda não fez nenhum pedido.') : tr('Ainda não há pedidos. Seja o primeiro a pedir.'))}</p></div>`;
    return;
  }
  lista.innerHTML = pedidosDeOracao.map(cartaoDoPedido).join('');
  lista.querySelectorAll('.pedido-cartao').forEach((cartao) => {
    const pedido = pedidosDeOracao.find((p) => String(p.id) === cartao.dataset.pedido);
    if (!pedido) return;
    const rezar = cartao.querySelector('.pedido-rezar');
    if (rezar) rezar.addEventListener('click', () => rezarPeloPedido(pedido, cartao));
    const apagar = cartao.querySelector('.pedido-apagar');
    if (apagar) apagar.addEventListener('click', () => confirmarApagarPedido(pedido));
    const denunciar = cartao.querySelector('.pedido-denunciar');
    if (denunciar) denunciar.addEventListener('click', () => confirmarDenunciaDoPedido(pedido));
  });
}

async function enviarPedidoDeOracao(evento) {
  evento.preventDefault();
  const perfil = typeof perfilAdultoAtivo === 'function' ? perfilAdultoAtivo() : null;
  const campo = document.getElementById('pedido-texto');
  const botao = document.getElementById('pedido-enviar');
  if (!perfil || !campo) return;
  const texto = campo.value.trim();
  if (texto.length < 5) { avisoDosPedidos(mensagemDosPedidos('pedido_texto')); campo.focus(); return; }
  botao.disabled = true;
  try {
    await chamarDosPedidos('pedido_oracao_criar', { _pid: perfil.id, _texto: texto, _anonimo: !!document.getElementById('pedido-anonimo').checked });
    campo.value = '';
    document.getElementById('pedido-contador').textContent = '0/300';
    document.getElementById('pedido-anonimo').checked = false;
    avisoDosPedidos('Pedido enviado. Vamos rezar por você.');
    carregarPedidos(false);
  } catch (erro) {
    avisoDosPedidos(mensagemDosPedidos(erro));
  } finally {
    botao.disabled = false;
  }
}

function luzDaOracao(botao) {
  const luz = document.createElement('span');
  luz.className = 'pedido-luz';
  luz.setAttribute('aria-hidden', 'true');
  for (let i = 0; i < 6; i += 1) {
    const brilho = document.createElement('i');
    brilho.style.setProperty('--i', i);
    luz.appendChild(brilho);
  }
  botao.appendChild(luz);
  setTimeout(() => luz.remove(), 1600);
}

async function rezarPeloPedido(pedido, cartao) {
  const perfil = typeof perfilAdultoAtivo === 'function' ? perfilAdultoAtivo() : null;
  const botao = cartao.querySelector('.pedido-rezar');
  if (!perfil || !botao || pedido.eu_rezei) return;
  botao.disabled = true;
  try {
    const r = (await chamarDosPedidos('pedido_oracao_rezar', { _pid: perfil.id, _id: pedido.id })) || {};
    pedido.eu_rezei = true;
    if (r.rezaram !== undefined) pedido.rezaram = r.rezaram;
    cartao.classList.add('rezado', 'acabou-de-rezar');
    botao.classList.add('rezado');
    botao.setAttribute('aria-pressed', 'true');
    botao.querySelector('span').textContent = tr('Rezei');
    cartao.querySelector('.pedido-total').textContent = totalDeQuemRezou(pedido.rezaram);
    luzDaOracao(botao);
  } catch (erro) {
    botao.disabled = false;
    avisoDosPedidos(mensagemDosPedidos(erro));
  }
}

function confirmarApagarPedido(pedido) {
  const perfil = typeof perfilAdultoAtivo === 'function' ? perfilAdultoAtivo() : null;
  if (!perfil || typeof janelaDoCenaculo !== 'function') return;
  const corpo = janelaDoCenaculo(tr('Apagar pedido'), `
    <p class="cenaculo-explica">${escaparTexto(tr('Apagar este pedido de oração?'))}</p>
    <div class="marco-convite-botoes">
      <button type="button" class="licao-botao marco-botao-perigo" id="pedido-apagar-sim">${escaparTexto(tr('Apagar'))}</button>
      <button type="button" class="marco-convite-nao" id="pedido-apagar-nao">${escaparTexto(tr('Cancelar'))}</button>
    </div>`);
  corpo.querySelector('#pedido-apagar-nao').addEventListener('click', fecharJanelaDoCenaculo);
  corpo.querySelector('#pedido-apagar-sim').addEventListener('click', async (evento) => {
    const botao = evento.currentTarget;
    botao.disabled = true;
    try {
      await chamarDosPedidos('pedido_oracao_apagar', { _pid: perfil.id, _id: pedido.id });
      pedidosDeOracao = pedidosDeOracao.filter((p) => p !== pedido);
      fecharJanelaDoCenaculo();
      avisoDosPedidos('Pedido apagado.');
      desenharListaDosPedidos();
    } catch (erro) {
      botao.disabled = false;
      avisoDosPedidos(mensagemDosPedidos(erro));
    }
  });
}

function confirmarDenunciaDoPedido(pedido) {
  const perfil = typeof perfilAdultoAtivo === 'function' ? perfilAdultoAtivo() : null;
  if (!perfil || typeof janelaDoCenaculo !== 'function') return;
  const corpo = janelaDoCenaculo(tr('Denunciar pedido'), `
    <p class="cenaculo-explica">${escaparTexto(tr('Este pedido tem algo errado? A equipe vai olhar e ele some da sua lista.'))}</p>
    <div class="marco-convite-botoes">
      <button type="button" class="licao-botao marco-botao-perigo" id="pedido-denunciar-sim">${escaparTexto(tr('Denunciar'))}</button>
      <button type="button" class="marco-convite-nao" id="pedido-denunciar-nao">${escaparTexto(tr('Cancelar'))}</button>
    </div>`);
  corpo.querySelector('#pedido-denunciar-nao').addEventListener('click', fecharJanelaDoCenaculo);
  corpo.querySelector('#pedido-denunciar-sim').addEventListener('click', async (evento) => {
    const botao = evento.currentTarget;
    botao.disabled = true;
    try {
      await chamarDosPedidos('pedido_oracao_denunciar', { _pid: perfil.id, _id: pedido.id, _motivo: null });
      pedidosDeOracao = pedidosDeOracao.filter((p) => p !== pedido);
      fecharJanelaDoCenaculo();
      avisoDosPedidos('Obrigado. A equipe vai olhar esse pedido.');
      desenharListaDosPedidos();
    } catch (erro) {
      botao.disabled = false;
      avisoDosPedidos(mensagemDosPedidos(erro));
    }
  });
}

function abrirDiarioDeIntencoes() {
  const perfil = perfilParaPedidos('intencoes', 'view-intencoes');
  if (!perfil) return;
  if (typeof closeSidebar === 'function') closeSidebar();
  intencaoEditando = null;
  mudarDeView('view-intencoes');
  desenharPaginaDoDiario();
  carregarIntencoes();
  window.scrollTo({ top: 0, behavior: 'auto' });
}

function desenharPaginaDoDiario() {
  const lugar = document.getElementById('intencoes-conteudo');
  if (!lugar) return;
  lugar.innerHTML = `${voltarParaOracoes()}
    <header class="dev-topo">
      <p class="dev-selo">${escaparTexto(tr('Só você vê'))}</p>
      <h2 class="section-title">${escaparTexto(tr('Diário de intenções'))}</h2>
      <div class="title-divider"></div>
    </header>
    <form class="pedido-novo intencao-nova" id="intencao-nova" autocomplete="off">
      <textarea id="intencao-texto" maxlength="500" rows="3" placeholder="${escaparTexto(tr('Por qual intenção você está rezando?'))}"></textarea>
      <div class="pedido-novo-rodape">
        <button type="button" class="intencao-cancelar" id="intencao-cancelar" hidden>${escaparTexto(tr('Cancelar'))}</button>
        <small class="pedido-contador" id="intencao-contador">0/500</small>
        <button type="submit" class="licao-botao pedido-enviar" id="intencao-guardar">${escaparTexto(tr('Guardar'))}</button>
      </div>
    </form>
    <section class="intencoes-grupo">
      <h3 class="intencoes-titulo">${escaparTexto(tr('Rezando por'))}</h3>
      <div class="intencoes-lista" id="intencoes-abertas"></div>
    </section>
    <section class="intencoes-grupo intencoes-gracas" id="intencoes-gracas" hidden>
      <h3 class="intencoes-titulo">${escaparTexto(tr('Graças alcançadas'))}</h3>
      <div class="intencoes-lista" id="intencoes-atendidas"></div>
    </section>`;
  lugar.querySelector('.dev-voltar').addEventListener('click', () => mudarDeView('view-oracoes'));
  const texto = lugar.querySelector('#intencao-texto');
  const contador = lugar.querySelector('#intencao-contador');
  texto.addEventListener('input', () => { contador.textContent = `${texto.value.length}/500`; });
  lugar.querySelector('#intencao-nova').addEventListener('submit', guardarIntencao);
  lugar.querySelector('#intencao-cancelar').addEventListener('click', () => pararDeEditarIntencao());
}

async function carregarIntencoes() {
  const perfil = typeof perfilAdultoAtivo === 'function' ? perfilAdultoAtivo() : null;
  const abertas = document.getElementById('intencoes-abertas');
  if (!perfil || !abertas) return;
  abertas.innerHTML = '<div class="marco-esqueleto"></div>';
  try {
    intencoesDoDiario = (await chamarDosPedidos('intencoes_lista', { _pid: perfil.id })) || [];
    desenharIntencoes();
  } catch (erro) {
    abertas.innerHTML = `<p class="not-found-msg">${escaparTexto(tr(mensagemDosPedidos(erro)))}</p>`;
  }
}

function cartaoDaIntencao(i) {
  const atendida = !!i.atendida_em;
  const ic = (nome) => (typeof icone === 'function' ? icone(nome) : '');
  if (atendida) {
    return `
      <article class="intencao-cartao atendida" data-intencao="${escaparTexto(i.id)}">
        <p class="intencao-texto" translate="no">${escaparTexto(i.texto)}</p>
        ${i.agradecimento ? `<p class="intencao-agradecimento" translate="no">${escaparTexto(i.agradecimento)}</p>` : ''}
        <footer class="intencao-rodape">
          <small>${ic('check')}${escaparTexto(tr('Atendida em {data}', { data: dataCurtaDoPedido(i.atendida_em) }))}</small>
          <button type="button" class="intencao-voltar">${escaparTexto(tr('Voltar a rezar'))}</button>
          <button type="button" class="icon-btn intencao-apagar" aria-label="${escaparTexto(tr('Apagar'))}">${ic('lixeira')}</button>
        </footer>
      </article>`;
  }
  return `
    <article class="intencao-cartao" data-intencao="${escaparTexto(i.id)}">
      <p class="intencao-texto" translate="no">${escaparTexto(i.texto)}</p>
      <footer class="intencao-rodape">
        <small>${escaparTexto(tr('Desde {data}', { data: dataCurtaDoPedido(i.criada_em) }))}</small>
        <button type="button" class="intencao-atendida-btn">${ic('check')}<span>${escaparTexto(tr('Foi atendida'))}</span></button>
        <button type="button" class="icon-btn intencao-editar" aria-label="${escaparTexto(tr('Editar'))}">${ic('lapis')}</button>
        <button type="button" class="icon-btn intencao-apagar" aria-label="${escaparTexto(tr('Apagar'))}">${ic('lixeira')}</button>
      </footer>
    </article>`;
}

function desenharIntencoes() {
  const abertas = document.getElementById('intencoes-abertas');
  const atendidas = document.getElementById('intencoes-atendidas');
  const gracas = document.getElementById('intencoes-gracas');
  if (!abertas || !atendidas) return;
  const listaAbertas = intencoesDoDiario.filter((i) => !i.atendida_em);
  const listaAtendidas = intencoesDoDiario.filter((i) => i.atendida_em).sort((a, b) => String(b.atendida_em).localeCompare(String(a.atendida_em)));
  abertas.innerHTML = listaAbertas.length
    ? listaAbertas.map(cartaoDaIntencao).join('')
    : `<div class="pedidos-vazio">${typeof icone === 'function' ? icone('vela') : ''}<p>${escaparTexto(tr('Escreva acima a primeira intenção.'))}</p></div>`;
  atendidas.innerHTML = listaAtendidas.map(cartaoDaIntencao).join('');
  if (gracas) gracas.hidden = listaAtendidas.length === 0;
  document.querySelectorAll('#intencoes-conteudo .intencao-cartao').forEach((cartao) => {
    const intencao = intencoesDoDiario.find((i) => String(i.id) === cartao.dataset.intencao);
    if (!intencao) return;
    const ligar = (seletor, acao) => { const b = cartao.querySelector(seletor); if (b) b.addEventListener('click', acao); };
    ligar('.intencao-atendida-btn', () => perguntarAgradecimento(intencao, cartao));
    ligar('.intencao-editar', () => editarIntencao(intencao));
    ligar('.intencao-apagar', () => confirmarApagarIntencao(intencao));
    ligar('.intencao-voltar', () => marcarIntencao(intencao, false, null));
  });
}

function editarIntencao(intencao) {
  const campo = document.getElementById('intencao-texto');
  if (!campo) return;
  intencaoEditando = intencao.id;
  campo.value = intencao.texto;
  document.getElementById('intencao-contador').textContent = `${campo.value.length}/500`;
  document.getElementById('intencao-guardar').textContent = tr('Salvar');
  document.getElementById('intencao-cancelar').hidden = false;
  document.getElementById('intencao-nova').classList.add('editando');
  campo.scrollIntoView({ behavior: 'smooth', block: 'center' });
  campo.focus();
}

function pararDeEditarIntencao() {
  intencaoEditando = null;
  const campo = document.getElementById('intencao-texto');
  if (!campo) return;
  campo.value = '';
  document.getElementById('intencao-contador').textContent = '0/500';
  document.getElementById('intencao-guardar').textContent = tr('Guardar');
  document.getElementById('intencao-cancelar').hidden = true;
  document.getElementById('intencao-nova').classList.remove('editando');
}

async function guardarIntencao(evento) {
  evento.preventDefault();
  const perfil = typeof perfilAdultoAtivo === 'function' ? perfilAdultoAtivo() : null;
  const campo = document.getElementById('intencao-texto');
  const botao = document.getElementById('intencao-guardar');
  if (!perfil || !campo) return;
  const texto = campo.value.trim();
  if (!texto) { campo.focus(); return; }
  botao.disabled = true;
  try {
    await chamarDosPedidos('intencao_salvar', { _pid: perfil.id, _id: intencaoEditando, _texto: texto });
    const editou = intencaoEditando !== null;
    pararDeEditarIntencao();
    avisoDosPedidos(editou ? 'Intenção salva.' : 'Intenção guardada no seu diário.');
    await carregarIntencoes();
  } catch (erro) {
    avisoDosPedidos(mensagemDosPedidos(erro));
  } finally {
    botao.disabled = false;
  }
}

function perguntarAgradecimento(intencao, cartao) {
  if (cartao.querySelector('.intencao-graca')) return;
  const caixa = document.createElement('div');
  caixa.className = 'intencao-graca';
  caixa.innerHTML = `
    <textarea maxlength="500" rows="2" placeholder="${escaparTexto(tr('Quer escrever um agradecimento?'))}"></textarea>
    <div class="intencao-graca-botoes">
      <button type="button" class="marco-convite-nao intencao-graca-nao">${escaparTexto(tr('Cancelar'))}</button>
      <button type="button" class="licao-botao intencao-graca-sim">${escaparTexto(tr('Guardar graça'))}</button>
    </div>`;
  cartao.appendChild(caixa);
  caixa.querySelector('textarea').focus();
  caixa.querySelector('.intencao-graca-nao').addEventListener('click', () => caixa.remove());
  caixa.querySelector('.intencao-graca-sim').addEventListener('click', (e) => {
    e.currentTarget.disabled = true;
    marcarIntencao(intencao, true, caixa.querySelector('textarea').value.trim() || null, cartao);
  });
}

async function marcarIntencao(intencao, atendida, agradecimento, cartao) {
  const perfil = typeof perfilAdultoAtivo === 'function' ? perfilAdultoAtivo() : null;
  if (!perfil) return;
  try {
    await chamarDosPedidos('intencao_atendida', { _pid: perfil.id, _id: intencao.id, _agradecimento: agradecimento, _atendida: atendida });
    if (atendida && cartao) {
      cartao.classList.add('virando-graca');
      luzDaOracao(cartao);
      await new Promise((ok) => setTimeout(ok, 900));
    }
    if (atendida) avisoDosPedidos('Graças a Deus!');
    await carregarIntencoes();
  } catch (erro) {
    avisoDosPedidos(mensagemDosPedidos(erro));
    const sim = cartao && cartao.querySelector('.intencao-graca-sim');
    if (sim) sim.disabled = false;
  }
}

function confirmarApagarIntencao(intencao) {
  const perfil = typeof perfilAdultoAtivo === 'function' ? perfilAdultoAtivo() : null;
  if (!perfil || typeof janelaDoCenaculo !== 'function') return;
  const corpo = janelaDoCenaculo(tr('Apagar intenção'), `
    <p class="cenaculo-explica">${escaparTexto(tr('Apagar esta intenção do seu diário?'))}</p>
    <div class="marco-convite-botoes">
      <button type="button" class="licao-botao marco-botao-perigo" id="intencao-apagar-sim">${escaparTexto(tr('Apagar'))}</button>
      <button type="button" class="marco-convite-nao" id="intencao-apagar-nao">${escaparTexto(tr('Cancelar'))}</button>
    </div>`);
  corpo.querySelector('#intencao-apagar-nao').addEventListener('click', fecharJanelaDoCenaculo);
  corpo.querySelector('#intencao-apagar-sim').addEventListener('click', async (evento) => {
    const botao = evento.currentTarget;
    botao.disabled = true;
    try {
      await chamarDosPedidos('intencao_apagar', { _pid: perfil.id, _id: intencao.id });
      if (intencaoEditando === intencao.id) pararDeEditarIntencao();
      intencoesDoDiario = intencoesDoDiario.filter((i) => i !== intencao);
      fecharJanelaDoCenaculo();
      desenharIntencoes();
    } catch (erro) {
      botao.disabled = false;
      avisoDosPedidos(mensagemDosPedidos(erro));
    }
  });
}

function iniciarPedidosDeOracao() {
  if (typeof PAGINAS_SO_PARA_ADULTOS !== 'undefined') {
    ['view-pedidos', 'view-intencoes'].forEach((v) => { if (!PAGINAS_SO_PARA_ADULTOS.includes(v)) PAGINAS_SO_PARA_ADULTOS.push(v); });
  }
  const ligar = (id, acao) => { const b = document.getElementById(id); if (b) b.addEventListener('click', acao); };
  ligar('nav-pedidos', abrirPedidosDeOracao);
  ligar('nav-intencoes', abrirDiarioDeIntencoes);
  document.querySelectorAll('[data-abrir-pedidos]').forEach((botao) => botao.addEventListener('click', () => {
    if (botao.dataset.abrirPedidos === 'intencoes') abrirDiarioDeIntencoes();
    else abrirPedidosDeOracao();
  }));
  document.addEventListener('lumina-idioma', () => {
    const pedidos = document.getElementById('view-pedidos');
    if (pedidos && pedidos.classList.contains('active')) { desenharPaginaDosPedidos(); desenharListaDosPedidos(); }
    const diario = document.getElementById('view-intencoes');
    if (diario && diario.classList.contains('active')) { desenharPaginaDoDiario(); desenharIntencoes(); }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  if (typeof rodarComSeguranca === 'function') rodarComSeguranca('pedidos', iniciarPedidosDeOracao);
  else iniciarPedidosDeOracao();
});
