let estadoDaAssinatura = null;
let assinaturaEmCarregamento = null;
let contaDaAssinatura = null;

const NOMES_DOS_PLANOS = { free: 'Gratuito', individual: 'Individual', duo: 'Duo', familia: 'Família' };
const PLANOS_PAGOS = ['individual', 'duo', 'familia'];
const ENDERECOS_DE_PAGAMENTO = ['https://checkout.stripe.com/', 'https://billing.stripe.com/'];
const ASSINATURAS_DA_GOOGLE_PLAY = 'https://play.google.com/store/account/subscriptions';
const CHAVE_APP_DA_PLAY_STORE = 'lumina-sancti-app-play-store';

function cobrancaLigadaNoSite() {
  return !!(estadoDaAssinatura && estadoDaAssinatura.cobranca_ligada);
}

function maximoDePerfisDoPlano(padrao) {
  if (!cobrancaLigadaNoSite() || !estadoDaAssinatura.plano) return padrao;
  return Math.max(1, Number(estadoDaAssinatura.plano.perfis_max) || 1);
}

function perfilPrecisaDePlano(id) {
  if (!cobrancaLigadaNoSite() || !id) return false;
  const lista = Array.isArray(estadoDaAssinatura.perfis_trancados) ? estadoDaAssinatura.perfis_trancados : [];
  return lista.includes(id);
}

function podeOferecerMaisPerfis(quantidade) {
  return cobrancaLigadaNoSite() && quantidade >= maximoDePerfisDoPlano(1) && maximoDePerfisDoPlano(1) < 6;
}

function assinaturaValendo() {
  return !!(estadoDaAssinatura && estadoDaAssinatura.assinatura && estadoDaAssinatura.assinatura.vale);
}

function nomeDoPlanoAtual() {
  const id = estadoDaAssinatura && estadoDaAssinatura.plano ? estadoDaAssinatura.plano.id : 'free';
  return NOMES_DOS_PLANOS[id] || 'Gratuito';
}

function dentroDoAppDaPlayStore() {
  try {
    if (document.referrer && document.referrer.startsWith('android-app://')) sessionStorage.setItem(CHAVE_APP_DA_PLAY_STORE, '1');
    return sessionStorage.getItem(CHAVE_APP_DA_PLAY_STORE) === '1';
  } catch (e) {
    return false;
  }
}

async function cobrancaParaQuemNaoEntrou() {
  const { data, error } = await supabaseCliente.from('app_config').select('value').eq('key', 'paywall_enabled').maybeSingle();
  if (error) throw error;
  return { cobranca_ligada: !!data && data.value === true, plano: null, assinatura: null, perfis_trancados: [], sem_conta: true };
}

async function carregarMinhaAssinatura() {
  if (typeof supabaseCliente === 'undefined' || !supabaseCliente) {
    estadoDaAssinatura = null;
    contaDaAssinatura = null;
    return null;
  }
  const logado = typeof contaLogada === 'function' && contaLogada();
  const conta = logado && typeof sessaoAtual !== 'undefined' && sessaoAtual && sessaoAtual.user ? sessaoAtual.user.id : 'sem-conta';
  if (assinaturaEmCarregamento && contaDaAssinatura === conta) return assinaturaEmCarregamento;
  if (contaDaAssinatura !== conta) estadoDaAssinatura = null;
  contaDaAssinatura = conta;
  const busca = logado
    ? supabaseCliente.rpc('minha_assinatura').then(({ data, error }) => { if (error) throw error; return data || null; })
    : cobrancaParaQuemNaoEntrou();
  const pedido = busca.then((dados) => {
    if (contaDaAssinatura === conta) estadoDaAssinatura = dados;
    return estadoDaAssinatura;
  });
  assinaturaEmCarregamento = pedido;
  const limpar = () => { if (assinaturaEmCarregamento === pedido) assinaturaEmCarregamento = null; };
  pedido.then(limpar, limpar);
  return pedido;
}

async function carregarAssinaturaSemFalhar() {
  try {
    return await carregarMinhaAssinatura();
  } catch (e) {
    return estadoDaAssinatura;
  }
}

function dataCurta(iso) {
  const data = iso ? new Date(iso) : null;
  if (!data || Number.isNaN(data.getTime())) return '';
  return data.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

function textoDaAssinatura() {
  const estado = estadoDaAssinatura;
  const assinatura = estado && estado.assinatura;
  if (!assinatura || !assinatura.vale) return '';
  const nome = NOMES_DOS_PLANOS[assinatura.plano] || nomeDoPlanoAtual();
  const periodo = assinatura.periodo === 'anual' ? 'anual' : 'mensal';
  const fim = dataCurta(assinatura.periodo_fim);
  if (assinatura.status === 'past_due') return `Plano ${nome} (${periodo}). Não conseguimos cobrar o seu cartão. Atualize a forma de pagamento para não perder o plano.`;
  if (assinatura.cancela_no_fim) return `Plano ${nome} (${periodo}). A assinatura foi cancelada e vale até ${fim}. Depois disso, a conta volta ao plano Gratuito.`;
  return `Plano ${nome} (${periodo}).${fim ? ` Renova em ${fim}.` : ''}`;
}

function resumoDoPlanoNoPerfil() {
  const assinatura = estadoDaAssinatura && estadoDaAssinatura.assinatura;
  if (assinatura && assinatura.vale) {
    const fim = dataCurta(assinatura.periodo_fim);
    if (assinatura.status === 'past_due') return 'Pagamento pendente. Toque para resolver';
    if (assinatura.cancela_no_fim) return fim ? `Cancelado, vale até ${fim}` : 'Cancelado';
    return `${assinatura.periodo === 'anual' ? 'Anual' : 'Mensal'}${fim ? `, renova em ${fim}` : ''}`;
  }
  return cobrancaLigadaNoSite() ? 'Veja os planos para ter mais perfis' : 'Os planos chegam em breve';
}

function mostrarMensagemDosPlanos(texto, erro) {
  const lugar = document.getElementById('planos-mensagem');
  if (!lugar) return;
  lugar.textContent = texto || '';
  lugar.classList.toggle('erro', !!erro);
}

function atualizarRodapeDosPlanos() {
  const situacao = document.getElementById('planos-situacao');
  if (!situacao) return;
  const texto = textoDaAssinatura();
  if (!texto) {
    situacao.hidden = true;
    situacao.innerHTML = '';
    return;
  }
  const doGooglePlay = estadoDaAssinatura.assinatura.origem === 'google_play';
  situacao.hidden = false;
  situacao.innerHTML = `
    <p>${escaparTexto(texto)}</p>
    <button type="button" class="filter-btn active" id="planos-gerenciar">${doGooglePlay ? 'Gerenciar na Google Play' : 'Gerenciar assinatura'}</button>
    <small>${doGooglePlay ? 'A assinatura foi feita pela Google Play e é cuidada por lá.' : 'Cancele, troque o cartão ou veja os recibos.'}</small>`;
  const botao = situacao.querySelector('#planos-gerenciar');
  if (botao) botao.addEventListener('click', () => gerenciarAssinatura(botao));
}

async function chamarPagamento(corpo) {
  const { data, error } = await supabaseCliente.functions.invoke('assinatura-pagar', { body: corpo });
  if (error) {
    let codigo = '';
    try {
      const resposta = error.context && typeof error.context.json === 'function' ? await error.context.json() : null;
      codigo = resposta && resposta.erro ? String(resposta.erro) : '';
    } catch (e) {
      codigo = '';
    }
    const falha = new Error(codigo || String(error.message || 'falha'));
    falha.codigo = codigo;
    throw falha;
  }
  return data;
}

function mensagemDoPagamento(erro) {
  const codigo = String((erro && (erro.codigo || erro.message)) || '');
  if (codigo.includes('cobranca_desligada')) return 'As assinaturas ainda não começaram. Assim que estiverem disponíveis, você poderá assinar por aqui.';
  if (codigo.includes('pagamento_nao_configurado')) return 'O pagamento ainda não está disponível. Tente de novo mais tarde.';
  if (codigo.includes('account_suspended')) return 'Sua conta está suspensa, e por isso não é possível assinar agora.';
  if (codigo.includes('precisa_entrar')) return 'Entre na sua conta para assinar.';
  return 'Não foi possível abrir o pagamento agora. Tente de novo em instantes.';
}

function irParaOPagamento(url) {
  if (typeof url !== 'string' || !ENDERECOS_DE_PAGAMENTO.some((inicio) => url.startsWith(inicio))) throw new Error('endereco_invalido');
  window.location.assign(url);
}

function botaoOcupado(botao, texto) {
  if (!botao) return () => {};
  const original = botao.textContent;
  botao.disabled = true;
  botao.textContent = texto;
  return () => {
    botao.disabled = false;
    botao.textContent = original;
  };
}

async function assinarPlano(plano, periodo, botao) {
  if (typeof contaLogada !== 'function' || !contaLogada()) {
    if (typeof irParaLogin === 'function') irParaLogin();
    return;
  }
  if (!PLANOS_PAGOS.includes(plano)) return;
  if (dentroDoAppDaPlayStore()) {
    mostrarMensagemDosPlanos('No aplicativo, a assinatura será feita pela Google Play. Essa opção chega em breve.', true);
    return;
  }
  mostrarMensagemDosPlanos('');
  const liberar = botaoOcupado(botao, 'Abrindo o pagamento...');
  try {
    const dados = await chamarPagamento({ acao: 'assinar', plano, periodo: periodo === 'anual' ? 'anual' : 'mensal' });
    irParaOPagamento(dados && dados.url);
  } catch (erro) {
    liberar();
    mostrarMensagemDosPlanos(mensagemDoPagamento(erro), true);
  }
}

async function gerenciarAssinatura(botao) {
  const assinatura = estadoDaAssinatura && estadoDaAssinatura.assinatura;
  if (assinatura && assinatura.origem === 'google_play') {
    window.open(ASSINATURAS_DA_GOOGLE_PLAY, '_blank', 'noopener');
    return;
  }
  mostrarMensagemDosPlanos('');
  const liberar = botaoOcupado(botao, 'Abrindo...');
  try {
    const dados = await chamarPagamento({ acao: 'gerenciar' });
    irParaOPagamento(dados && dados.url);
  } catch (erro) {
    liberar();
    mostrarMensagemDosPlanos(mensagemDoPagamento(erro), true);
  }
}

function abrirJanelaDaAssinatura(titulo, texto, rotuloDoBotao, aoConfirmar) {
  let modal = document.getElementById('assinatura-janela');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'assinatura-janela';
    modal.className = 'search-modal';
    modal.innerHTML = `
      <div class="search-modal-content assinatura-janela" role="dialog" aria-modal="true" aria-labelledby="assinatura-janela-titulo">
        <h3 id="assinatura-janela-titulo"></h3>
        <p id="assinatura-janela-texto" aria-live="polite"></p>
        <div class="assinatura-janela-botoes">
          <button type="button" class="licao-botao" id="assinatura-janela-ok"></button>
          <button type="button" class="perfil-link" id="assinatura-janela-fechar">Fechar</button>
        </div>
      </div>`;
    document.body.appendChild(modal);
    modal.addEventListener('click', (evento) => { if (evento.target === modal) modal.classList.remove('active'); });
    modal.querySelector('#assinatura-janela-fechar').addEventListener('click', () => modal.classList.remove('active'));
  }
  modal.querySelector('#assinatura-janela-titulo').textContent = titulo;
  modal.querySelector('#assinatura-janela-texto').textContent = texto;
  const ok = modal.querySelector('#assinatura-janela-ok');
  const novo = ok.cloneNode(false);
  novo.textContent = rotuloDoBotao || 'Entendi';
  novo.addEventListener('click', () => {
    modal.classList.remove('active');
    if (aoConfirmar) aoConfirmar();
  });
  ok.replaceWith(novo);
  modal.querySelector('#assinatura-janela-fechar').hidden = !aoConfirmar;
  modal.classList.add('active');
  return modal;
}

function avisarPerfilSemPlano(membro) {
  const limite = maximoDePerfisDoPlano(1);
  const quantos = limite === 1 ? '1 perfil' : `${limite} perfis`;
  abrirJanelaDaAssinatura(
    `O perfil de ${membro && membro.nome ? membro.nome : 'alguém'} está guardado`,
    `O plano ${nomeDoPlanoAtual()} libera ${quantos}. Tudo deste perfil continua salvo: Fé, medalhas e progresso. Para usá-lo de novo, assine um plano com mais perfis.`,
    'Ver planos',
    () => { if (typeof abrirPlanos === 'function') abrirPlanos(); },
  );
}

function esperar(ms) {
  return new Promise((resolver) => setTimeout(resolver, ms));
}

async function esperarPelaSessao() {
  for (let i = 0; i < 20; i += 1) {
    if (typeof contaLogada === 'function' && contaLogada()) return true;
    await esperar(250);
  }
  return false;
}

async function acompanharAssinaturaConfirmada() {
  const janela = abrirJanelaDaAssinatura('Pagamento recebido', 'Estamos ativando a sua assinatura. Isso leva só alguns segundos...', 'Entendi');
  const texto = janela.querySelector('#assinatura-janela-texto');
  for (let tentativa = 0; tentativa < 10; tentativa += 1) {
    const estado = await carregarAssinaturaSemFalhar();
    if (estado && estado.assinatura && estado.assinatura.vale) {
      janela.querySelector('#assinatura-janela-titulo').textContent = 'Assinatura ativa';
      texto.textContent = `Pronto! O plano ${NOMES_DOS_PLANOS[estado.assinatura.plano] || nomeDoPlanoAtual()} já está valendo. Obrigado por caminhar com os santos no Lumina Sancti.`;
      aposMudarAssinatura();
      return;
    }
    await esperar(2000);
  }
  texto.textContent = 'O pagamento foi recebido, mas a assinatura ainda está sendo ativada. Pode levar alguns minutos. Se não aparecer, escreva para suporte@luminasancti.com.';
}

function aposMudarAssinatura() {
  const planos = document.getElementById('view-planos');
  if (planos && planos.classList.contains('active') && typeof renderizarPlanos === 'function') renderizarPlanos();
  const perfis = document.getElementById('view-perfis');
  if (perfis && perfis.classList.contains('active') && typeof renderizarSelecaoDePerfis === 'function') renderizarSelecaoDePerfis();
  const conta = document.getElementById('view-perfil');
  if (conta && conta.classList.contains('active') && typeof renderizarMeuPerfil === 'function') renderizarMeuPerfil();
}

async function verificarVoltaDoPagamento() {
  let situacao = null;
  try {
    const endereco = new URL(window.location.href);
    situacao = endereco.searchParams.get('assinatura');
    if (!situacao) return;
    endereco.searchParams.delete('assinatura');
    history.replaceState(history.state, '', endereco.pathname + endereco.search + endereco.hash);
  } catch (e) {
    return;
  }
  if (situacao === 'cancelada') {
    abrirJanelaDaAssinatura('Pagamento não concluído', 'Você saiu antes de terminar. Nada foi cobrado. Quando quiser, é só escolher um plano de novo.', 'Entendi');
    return;
  }
  if (!(await esperarPelaSessao())) return;
  if (situacao === 'confirmada') {
    await acompanharAssinaturaConfirmada();
  } else if (situacao === 'voltou') {
    await carregarAssinaturaSemFalhar();
    aposMudarAssinatura();
  }
}

function ligarPaginaDosPlanos() {
  const termos = document.getElementById('planos-termos');
  if (termos) termos.addEventListener('click', () => { if (typeof abrirTermosDaAssinatura === 'function') abrirTermosDaAssinatura(); });
  window.addEventListener('pageshow', (evento) => {
    if (!evento.persisted) return;
    const planos = document.getElementById('view-planos');
    if (planos && planos.classList.contains('active') && typeof renderizarPlanos === 'function') renderizarPlanos();
  });
  if (typeof supabaseCliente !== 'undefined' && supabaseCliente) {
    supabaseCliente.auth.onAuthStateChange((_evento, sessao) => {
      if (!sessao) {
        estadoDaAssinatura = null;
        contaDaAssinatura = null;
      }
    });
  }
  dentroDoAppDaPlayStore();
  setTimeout(verificarVoltaDoPagamento, 0);
}

document.addEventListener('DOMContentLoaded', () => {
  if (typeof rodarComSeguranca === 'function') rodarComSeguranca('planos e assinaturas', ligarPaginaDosPlanos);
  else ligarPaginaDosPlanos();
});
