const CHAVE_PERGUNTOU_MISERICORDIA = 'lumina-sancti-perguntou-misericordia';
const CHAVE_PERGUNTOU_OFENSIVA = 'lumina-sancti-perguntou-ofensiva';
const LEMBRETES = {
  misericordia: { nome: 'Hora da Misericórdia', texto: 'Todo dia às 15h, um convite para rezar o Terço da Misericórdia.', icone: 'misericordia' },
  ofensiva: { nome: 'Não perca sua ofensiva', texto: 'Só nos dias em que você ainda não fez a missão.', icone: 'chama' },
};
const OFENSIVA_PADRAO = { modo: 'uma', hora: 20 };
const PRIMEIRA_HORA_DA_OFENSIVA = 8;
const ULTIMA_HORA_DA_OFENSIVA = 22;

function horarioDaOfensiva(dados) {
  const modo = dados && dados.ofensiva_modo === 'hora' ? 'hora' : 'uma';
  const hora = Number(dados && dados.ofensiva_hora);
  const valida = Number.isInteger(hora) && hora >= PRIMEIRA_HORA_DA_OFENSIVA && hora <= ULTIMA_HORA_DA_OFENSIVA;
  return { modo, hora: valida ? hora : OFENSIVA_PADRAO.hora };
}

function explicacaoDaOfensiva(modo, hora) {
  if (modo === 'hora') {
    return hora >= ULTIMA_HORA_DA_OFENSIVA
      ? tr('Dois avisos, às 22h e às 22h30, se você ainda não fez a missão do dia.')
      : tr('Um aviso a cada meia hora, das {hora}h às {ultima}h30, até você fazer a missão do dia.', { hora, ultima: ULTIMA_HORA_DA_OFENSIVA });
  }
  return tr('Um aviso às {hora}h, se você ainda não fez a missão do dia.', { hora });
}

function resumoDaOfensiva(modo, hora) {
  return modo === 'hora' ? tr('Ofensiva de meia em meia hora a partir das {hora}h', { hora }) : tr('Ofensiva às {hora}h', { hora });
}

function notificacoesSuportadas() {
  return 'serviceWorker' in navigator && 'PushManager' in window && 'Notification' in window;
}

function ehIphone() {
  return /iPhone|iPad|iPod/i.test(navigator.userAgent || '');
}

function lerMarca(chave) {
  try { return localStorage.getItem(chave); } catch (e) { return null; }
}

function guardarMarca(chave) {
  try { localStorage.setItem(chave, new Date().toISOString()); } catch (e) {  }
}

function textoDoProblemaDeNotificacao() {
  if (!notificacoesSuportadas()) {
    return ehIphone()
      ? 'No iPhone, os lembretes só funcionam com o Lumina Sancti instalado na tela de início. Abra no Safari, toque em Compartilhar e em "Adicionar à Tela de Início".'
      : 'Este navegador não recebe lembretes. Tente pelo Chrome ou pelo app instalado.';
  }
  if (Notification.permission === 'denied') {
    return 'As notificações estão bloqueadas para o Lumina Sancti. Libere nas configurações do navegador ou do celular e tente de novo.';
  }
  return '';
}

function bytesDaChave(base64) {
  const limpo = String(base64 || '').replace(/-/g, '+').replace(/_/g, '/');
  const completo = limpo + '='.repeat((4 - (limpo.length % 4)) % 4);
  const binario = atob(completo);
  return Uint8Array.from(binario, (c) => c.charCodeAt(0));
}

async function inscricaoDoAparelho(criar) {
  const registro = await navigator.serviceWorker.ready;
  let inscricao = await registro.pushManager.getSubscription();
  if (!inscricao && criar) {
    const { data: chave, error } = await supabaseCliente.rpc('notificacoes_chave_publica');
    if (error || !chave) throw new Error('sem_chave');
    inscricao = await registro.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: bytesDaChave(chave) });
  }
  return inscricao;
}

async function lembretesDoAparelho() {
  if (!notificacoesSuportadas() || Notification.permission !== 'granted' || typeof contaLogada !== 'function' || !contaLogada()) {
    return Object.assign({ misericordia: false, ofensiva: false }, OFENSIVA_PADRAO);
  }
  try {
    const inscricao = await inscricaoDoAparelho(false);
    if (!inscricao) return Object.assign({ misericordia: false, ofensiva: false }, OFENSIVA_PADRAO);
    const { data, error } = await supabaseCliente.rpc('notificacoes_minhas', { _endpoint: inscricao.endpoint });
    if (error || !data) return Object.assign({ misericordia: false, ofensiva: false }, OFENSIVA_PADRAO);
    return Object.assign({ misericordia: !!data.misericordia, ofensiva: !!data.ofensiva }, horarioDaOfensiva(data));
  } catch (e) {
    return Object.assign({ misericordia: false, ofensiva: false }, OFENSIVA_PADRAO);
  }
}

async function mudarLembretes(novos) {
  const perfil = typeof perfilAdultoAtivo === 'function' ? perfilAdultoAtivo() : null;
  if (!perfil) throw new Error('somente_adultos');
  const problema = textoDoProblemaDeNotificacao();
  if (problema) throw new Error(problema);
  const ligar = !!(novos.misericordia || novos.ofensiva);
  if (ligar && Notification.permission !== 'granted') {
    const resposta = await Notification.requestPermission();
    if (resposta !== 'granted') throw new Error('Sem a sua permissão o celular não mostra os lembretes. Se mudar de ideia, libere as notificações nas configurações.');
  }
  const horario = horarioDaOfensiva({ ofensiva_modo: novos.modo, ofensiva_hora: novos.hora });
  const inscricao = await inscricaoDoAparelho(ligar);
  if (!inscricao) return Object.assign({ misericordia: false, ofensiva: false }, horario);
  const dados = inscricao.toJSON();
  const { data, error } = await supabaseCliente.rpc('notificacoes_salvar', {
    _pid: perfil.id,
    _endpoint: dados.endpoint,
    _p256dh: dados.keys && dados.keys.p256dh,
    _auth: dados.keys && dados.keys.auth,
    _misericordia: !!novos.misericordia,
    _ofensiva: !!novos.ofensiva,
    _ofensiva_modo: horario.modo,
    _ofensiva_hora: horario.hora,
    _idioma: typeof idiomaAtual !== 'undefined' ? idiomaAtual : 'pt',
  });
  if (error) throw error;
  if (!ligar) {
    try { await inscricao.unsubscribe(); } catch (e) {  }
  }
  const salvo = data || {};
  return Object.assign({ misericordia: !!salvo.misericordia, ofensiva: !!salvo.ofensiva }, horarioDaOfensiva(data ? salvo : { ofensiva_modo: horario.modo, ofensiva_hora: horario.hora }));
}

function mensagemDosLembretes(erro) {
  const texto = String((erro && erro.message) || erro || '');
  if (texto.length > 40) return texto;
  return 'Não foi possível mudar os lembretes agora. Tente de novo em instantes.';
}

function convidarParaLembrete(tipo) {
  if (typeof janelaDoCenaculo !== 'function') return;
  const info = LEMBRETES[tipo];
  const misericordia = tipo === 'misericordia';
  const corpo = janelaDoCenaculo(misericordia ? 'Hora da Misericórdia' : 'Lembrete da ofensiva', `
    <div class="lembrete-convite">
      <span class="lembrete-convite-icone lembrete-${tipo}">${typeof icone === 'function' ? icone(info.icone) : ''}</span>
      <h3>${misericordia ? 'Quer um lembrete às 15h?' : 'Quer ajuda para não perder a sequência?'}</h3>
      <p>${misericordia
        ? 'Todo dia, às 3 da tarde, o Lumina Sancti avisa no seu celular: "Hoje é a Hora da Misericórdia, reze o terço com a gente".'
        : 'Se você ainda não tiver feito a missão do dia, às 20h chega um aviso no celular para você não perder a sua ofensiva. Depois dá para mudar o horário ou receber de meia em meia hora até fazer, em Meu perfil, na opção Notificações.'}</p>
      <div class="marco-convite-botoes">
        <button type="button" class="licao-botao" id="lembrete-sim">Sim, me lembre</button>
        <button type="button" class="marco-convite-nao" id="lembrete-nao">Agora não</button>
      </div>
      <p class="lembrete-aviso" id="lembrete-aviso" aria-live="polite"></p>
    </div>`);
  corpo.querySelector('#lembrete-nao').addEventListener('click', fecharJanelaDoCenaculo);
  corpo.querySelector('#lembrete-sim').addEventListener('click', async (evento) => {
    const botao = evento.currentTarget;
    const aviso = corpo.querySelector('#lembrete-aviso');
    botao.disabled = true;
    botao.textContent = 'Ligando...';
    try {
      const atuais = await lembretesDoAparelho();
      await mudarLembretes(Object.assign({}, atuais, { [tipo]: true }));
      fecharJanelaDoCenaculo();
      if (typeof mostrarAvisoTrilhas === 'function') {
        mostrarAvisoTrilhas(misericordia ? 'Pronto! Às 15h você recebe o lembrete da Hora da Misericórdia.' : 'Pronto! Às 20h a gente lembra você da missão do dia.');
      }
    } catch (erro) {
      botao.disabled = false;
      botao.textContent = 'Sim, me lembre';
      aviso.textContent = mensagemDosLembretes(erro);
    }
  });
}

async function podePerguntarSobreLembrete(chave, tipo) {
  if (lerMarca(chave)) return false;
  if (typeof contaLogada !== 'function' || !contaLogada()) return false;
  if (typeof perfilAdultoAtivo !== 'function' || !perfilAdultoAtivo()) return false;
  if (!notificacoesSuportadas() || Notification.permission === 'denied') return false;
  const atuais = await lembretesDoAparelho();
  return !atuais[tipo];
}

async function oferecerLembreteDaMisericordia() {
  if (!(await podePerguntarSobreLembrete(CHAVE_PERGUNTOU_MISERICORDIA, 'misericordia'))) return;
  guardarMarca(CHAVE_PERGUNTOU_MISERICORDIA);
  setTimeout(() => convidarParaLembrete('misericordia'), 900);
}

async function oferecerLembreteDaOfensiva() {
  if (!(await podePerguntarSobreLembrete(CHAVE_PERGUNTOU_OFENSIVA, 'ofensiva'))) return false;
  guardarMarca(CHAVE_PERGUNTOU_OFENSIVA);
  setTimeout(() => convidarParaLembrete('ofensiva'), 1100);
  return true;
}

async function abrirAjustesDosLembretes() {
  if (typeof janelaDoCenaculo !== 'function') return;
  const corpo = janelaDoCenaculo('Lembretes', '<p class="perfis-carregando">Carregando...</p>');
  const problema = textoDoProblemaDeNotificacao();
  const atuais = await lembretesDoAparelho();
  corpo.innerHTML = `
    <p class="cenaculo-explica">Os lembretes chegam como notificação neste aparelho. Você pode desligar quando quiser.</p>
    ${problema ? `<p class="lembrete-problema">${problema}</p>` : ''}
    <div class="lembretes-lista">
      ${Object.keys(LEMBRETES).map((tipo) => `
        <label class="lembrete-linha">
          <span class="lembrete-convite-icone lembrete-${tipo}">${typeof icone === 'function' ? icone(LEMBRETES[tipo].icone) : ''}</span>
          <span class="ajuste-textos"><strong>${LEMBRETES[tipo].nome}</strong><small>${LEMBRETES[tipo].texto}</small></span>
          <input type="checkbox" class="lembrete-chave" data-tipo="${tipo}" ${atuais[tipo] ? 'checked' : ''} ${problema ? 'disabled' : ''}>
          <span class="lembrete-interruptor" aria-hidden="true"></span>
        </label>
        ${tipo === 'ofensiva' ? htmlDoHorarioDaOfensiva(atuais, !!problema) : ''}`).join('')}
    </div>
    <p class="lembrete-aviso" id="lembretes-aviso" aria-live="polite"></p>`;
  const estado = Object.assign({}, atuais);
  const aviso = corpo.querySelector('#lembretes-aviso');
  const opcoes = corpo.querySelector('#lembrete-ofensiva-opcoes');
  const travar = (sim) => {
    corpo.querySelectorAll('.lembrete-chave, .lembrete-modo, #lembrete-hora').forEach((c) => { c.disabled = sim; });
  };
  const mostrarHorario = () => {
    if (!opcoes) return;
    opcoes.hidden = !estado.ofensiva;
    opcoes.querySelectorAll('.lembrete-modo').forEach((botao) => {
      const ativo = botao.dataset.modo === estado.modo;
      botao.classList.toggle('ativo', ativo);
      botao.setAttribute('aria-checked', ativo ? 'true' : 'false');
    });
    const seletor = opcoes.querySelector('#lembrete-hora');
    if (seletor) seletor.value = String(estado.hora);
    const rotulo = opcoes.querySelector('#lembrete-hora-rotulo');
    if (rotulo) rotulo.textContent = estado.modo === 'hora' ? 'Começar às' : 'Horário do aviso';
    const explica = opcoes.querySelector('#lembrete-ofensiva-explica');
    if (explica) explica.textContent = explicacaoDaOfensiva(estado.modo, estado.hora);
  };
  const salvar = async (desejado, textoCerto, aoFalhar) => {
    travar(true);
    aviso.textContent = 'Salvando...';
    aviso.classList.remove('certo');
    try {
      const salvo = await mudarLembretes(desejado);
      Object.assign(estado, salvo);
      aviso.textContent = textoCerto();
      aviso.classList.add('certo');
    } catch (erro) {
      if (aoFalhar) aoFalhar();
      aviso.textContent = mensagemDosLembretes(erro);
    }
    travar(false);
    mostrarHorario();
    atualizarResumoDosLembretes();
  };
  corpo.querySelectorAll('.lembrete-chave').forEach((caixa) => {
    caixa.addEventListener('change', () => {
      const tipo = caixa.dataset.tipo;
      salvar(Object.assign({}, estado, { [tipo]: caixa.checked }),
        () => (caixa.checked ? 'Lembrete ligado.' : 'Lembrete desligado.'),
        () => { caixa.checked = !caixa.checked; });
    });
  });
  if (opcoes) {
    opcoes.querySelectorAll('.lembrete-modo').forEach((botao) => {
      botao.addEventListener('click', () => {
        if (botao.dataset.modo === estado.modo) return;
        salvar(Object.assign({}, estado, { modo: botao.dataset.modo }), () => 'Horário salvo.');
      });
    });
    const seletor = opcoes.querySelector('#lembrete-hora');
    if (seletor) {
      seletor.addEventListener('change', () => {
        salvar(Object.assign({}, estado, { hora: Number(seletor.value) }), () => 'Horário salvo.');
      });
    }
  }
  mostrarHorario();
}

function htmlDoHorarioDaOfensiva(atuais, travado) {
  const horas = [];
  for (let h = PRIMEIRA_HORA_DA_OFENSIVA; h <= ULTIMA_HORA_DA_OFENSIVA; h++) horas.push(h);
  return `
    <div class="lembrete-horario" id="lembrete-ofensiva-opcoes" ${atuais.ofensiva ? '' : 'hidden'}>
      <div class="lembrete-modos" role="radiogroup" aria-label="Quantas vezes avisar">
        <button type="button" class="lembrete-modo" data-modo="uma" role="radio" ${travado ? 'disabled' : ''}>Uma vez por dia</button>
        <button type="button" class="lembrete-modo" data-modo="hora" role="radio" ${travado ? 'disabled' : ''}>De meia em meia hora</button>
      </div>
      <label class="lembrete-hora-linha">
        <span id="lembrete-hora-rotulo">Horário do aviso</span>
        <select id="lembrete-hora" ${travado ? 'disabled' : ''}>
          ${horas.map((h) => `<option value="${h}">${h}h</option>`).join('')}
        </select>
      </label>
      <p class="lembrete-horario-explica" id="lembrete-ofensiva-explica"></p>
      <p class="lembrete-horario-explica">Se a ofensiva acabar, chega um convite por dia, por alguns dias, para você voltar.</p>
    </div>`;
}

async function atualizarResumoDosLembretes() {
  const resumo = document.getElementById('meu-perfil-lembretes-resumo');
  if (!resumo) return;
  const atuais = await lembretesDoAparelho();
  const ligados = Object.keys(LEMBRETES).filter((t) => atuais[t]).map((t) => (t === 'misericordia' ? tr('Misericórdia às 15h') : resumoDaOfensiva(atuais.modo, atuais.hora)));
  if (resumo.isConnected) resumo.textContent = ligados.length ? ligados.join(' e ') : 'Desligados';
}

function abrirPeloEnderecoDoLembrete() {
  let destino = '';
  try { destino = new URLSearchParams(window.location.search).get('abrir') || ''; } catch (e) { destino = ''; }
  if (!destino) return;
  try {
    const url = new URL(window.location.href);
    url.searchParams.delete('abrir');
    history.replaceState(null, '', url.pathname + url.search + url.hash);
  } catch (e) {  }
  setTimeout(() => {
    if (destino === 'misericordia' && typeof abrirTerco === 'function') abrirTerco('misericordia');
    else if (destino === 'trilhas' && typeof abrirTrilhas === 'function') abrirTrilhas();
  }, 1200);
}

async function avisarIdiomaDosLembretes(idioma) {
  if (!notificacoesSuportadas() || Notification.permission !== 'granted' || typeof contaLogada !== 'function' || !contaLogada()) return;
  try {
    const inscricao = await inscricaoDoAparelho(false);
    if (inscricao) await supabaseCliente.rpc('notificacoes_idioma', { _endpoint: inscricao.endpoint, _idioma: idioma });
  } catch (e) {
  }
}

document.addEventListener('lumina-idioma', (evento) => {
  avisarIdiomaDosLembretes(evento.detail && evento.detail.idioma ? evento.detail.idioma : 'pt');
});

document.addEventListener('DOMContentLoaded', () => {
  const iniciar = () => abrirPeloEnderecoDoLembrete();
  if (typeof rodarComSeguranca === 'function') rodarComSeguranca('lembretes', iniciar);
  else iniciar();
});
