const CHAVE_PERGUNTOU_MISERICORDIA = 'lumina-sancti-perguntou-misericordia';
const CHAVE_PERGUNTOU_OFENSIVA = 'lumina-sancti-perguntou-ofensiva';
const LEMBRETES = {
  misericordia: { nome: 'Hora da Misericórdia', texto: 'Todo dia às 15h, um convite para rezar o Terço da Misericórdia.', icone: 'misericordia' },
  ofensiva: { nome: 'Não perca sua ofensiva', texto: 'Às 20h, se você ainda não fez a missão do dia.', icone: 'chama' },
};

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
    return { misericordia: false, ofensiva: false };
  }
  try {
    const inscricao = await inscricaoDoAparelho(false);
    if (!inscricao) return { misericordia: false, ofensiva: false };
    const { data, error } = await supabaseCliente.rpc('notificacoes_minhas', { _endpoint: inscricao.endpoint });
    if (error || !data) return { misericordia: false, ofensiva: false };
    return { misericordia: !!data.misericordia, ofensiva: !!data.ofensiva };
  } catch (e) {
    return { misericordia: false, ofensiva: false };
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
  const inscricao = await inscricaoDoAparelho(ligar);
  if (!inscricao) return { misericordia: false, ofensiva: false };
  const dados = inscricao.toJSON();
  const { data, error } = await supabaseCliente.rpc('notificacoes_salvar', {
    _pid: perfil.id,
    _endpoint: dados.endpoint,
    _p256dh: dados.keys && dados.keys.p256dh,
    _auth: dados.keys && dados.keys.auth,
    _misericordia: !!novos.misericordia,
    _ofensiva: !!novos.ofensiva,
  });
  if (error) throw error;
  if (!ligar) {
    try { await inscricao.unsubscribe(); } catch (e) {  }
  }
  return data || { misericordia: !!novos.misericordia, ofensiva: !!novos.ofensiva };
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
        : 'Se você ainda não tiver feito a missão do dia, às 20h chega um aviso no celular para você não perder a sua ofensiva.'}</p>
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
        </label>`).join('')}
    </div>
    <p class="lembrete-aviso" id="lembretes-aviso" aria-live="polite"></p>`;
  const estado = Object.assign({}, atuais);
  corpo.querySelectorAll('.lembrete-chave').forEach((caixa) => {
    caixa.addEventListener('change', async () => {
      const aviso = corpo.querySelector('#lembretes-aviso');
      const tipo = caixa.dataset.tipo;
      const desejado = Object.assign({}, estado, { [tipo]: caixa.checked });
      corpo.querySelectorAll('.lembrete-chave').forEach((c) => { c.disabled = true; });
      aviso.textContent = 'Salvando...';
      aviso.classList.remove('certo');
      try {
        const salvo = await mudarLembretes(desejado);
        Object.assign(estado, { misericordia: !!salvo.misericordia, ofensiva: !!salvo.ofensiva });
        aviso.textContent = caixa.checked ? 'Lembrete ligado.' : 'Lembrete desligado.';
        aviso.classList.add('certo');
      } catch (erro) {
        caixa.checked = !caixa.checked;
        aviso.textContent = mensagemDosLembretes(erro);
      }
      corpo.querySelectorAll('.lembrete-chave').forEach((c) => { c.disabled = false; });
      atualizarResumoDosLembretes();
    });
  });
}

async function atualizarResumoDosLembretes() {
  const resumo = document.getElementById('meu-perfil-lembretes-resumo');
  if (!resumo) return;
  const atuais = await lembretesDoAparelho();
  const ligados = Object.keys(LEMBRETES).filter((t) => atuais[t]).map((t) => (t === 'misericordia' ? 'Misericórdia às 15h' : 'Ofensiva às 20h'));
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

document.addEventListener('DOMContentLoaded', () => {
  const iniciar = () => abrirPeloEnderecoDoLembrete();
  if (typeof rodarComSeguranca === 'function') rodarComSeguranca('lembretes', iniciar);
  else iniciar();
});
