const TEMAS_DO_SUPORTE = [
  { id: 'conta', nome: 'Conta e entrada', icone: 'pessoa' },
  { id: 'assinatura', nome: 'Planos e pagamento', icone: 'estrela' },
  { id: 'trilhas', nome: 'Trilhas e missões', icone: 'trilha' },
  { id: 'cenaculos', nome: 'Cenáculos e conversas', icone: 'conversa' },
  { id: 'perfis', nome: 'Perfis e modo infantil', icone: 'usuarios' },
  { id: 'notificacoes', nome: 'Notificações e lembretes', icone: 'sino' },
  { id: 'erro', nome: 'Algo não funciona', icone: 'alerta' },
  { id: 'sugestao', nome: 'Sugestão', icone: 'lampada' },
  { id: 'denuncia', nome: 'Denúncia', icone: 'escudo' },
  { id: 'outro', nome: 'Outro assunto', icone: 'pontos' },
];
const ERROS_DO_SUPORTE = {
  suporte_texto: 'Escreva a sua mensagem (até 2000 letras).',
  suporte_tema: 'Escolha sobre o que você quer falar.',
  suporte_demais: 'Você mandou muitas mensagens hoje. Espere um pouco e tente de novo.',
  suporte_nao_encontrado: 'Essa conversa não existe mais.',
  somente_adultos: 'Escolha um perfil de adulto para falar com a equipe.',
};
const STATUS_DO_SUPORTE = { aberta: 'Esperando resposta', respondida: 'Respondida', resolvida: 'Resolvida' };
const ATENDIMENTO_DO_SUPORTE_URL = 'https://lumina-ia.5dh6gl58df5c.workers.dev/atender';
const TEMAS_SEM_ATENDIMENTO = ['denuncia', 'sugestao'];
const RESPOSTAS_DO_ATENDIMENTO = 6;
let atendimentoDoSuporte = null;

let telaDoSuporte = 'lista';
let conversaDoSuporte = null;
let temaEscolhidoNoSuporte = '';
let relogioDoSuporte = null;
let naoLidasDoSuporte = 0;

function escaparDoSuporte(texto) {
  return String(texto == null ? '' : texto).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

function iconeDoSuporte(nome) {
  return `<svg class="icone" viewBox="0 0 24 24" aria-hidden="true"><use href="#icone-${nome}"></use></svg>`;
}

function temaDoSuporte(id) {
  return TEMAS_DO_SUPORTE.find((t) => t.id === id) || TEMAS_DO_SUPORTE[TEMAS_DO_SUPORTE.length - 1];
}

function dataDoSuporte(iso, comHora) {
  const data = iso ? new Date(iso) : null;
  if (!data || Number.isNaN(data.getTime())) return '';
  const local = typeof localDoIdioma === 'function' ? localDoIdioma() : 'pt-BR';
  const hoje = new Date();
  const mesmoDia = data.toDateString() === hoje.toDateString();
  if (mesmoDia && !comHora) return data.toLocaleTimeString(local, { hour: '2-digit', minute: '2-digit' });
  return comHora
    ? data.toLocaleString(local, { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' })
    : data.toLocaleDateString(local, { day: '2-digit', month: '2-digit' });
}

function erroDoSuporte(erro) {
  const texto = String((erro && erro.message) || erro || '');
  const chave = Object.keys(ERROS_DO_SUPORTE).find((k) => texto.includes(k));
  return tr(chave ? ERROS_DO_SUPORTE[chave] : 'Não foi possível falar com a equipe agora. Tente de novo.');
}

async function chamarSuporte(nome, argumentos) {
  const { data, error } = await supabaseCliente.rpc(nome, argumentos || {});
  if (error) throw error;
  return data;
}

function idiomaDoSuporte() {
  const idioma = typeof idiomaAtual !== 'undefined' ? idiomaAtual : 'pt';
  return idioma === 'en' || idioma === 'es' ? idioma : 'pt';
}

function perfilDoSuporte() {
  return (typeof membroAtivo !== 'undefined' && membroAtivo && membroAtivo.tipo === 'adulto') ? membroAtivo : null;
}

function lugarDoSuporte() {
  return document.getElementById('suporte-conteudo');
}

function abrirSuporte(idDaConversa) {
  if (typeof closeSidebar === 'function') closeSidebar();
  if (typeof modoInfantilAtivo === 'function' && modoInfantilAtivo()) {
    if (typeof paginaSoParaAdultos === 'function') paginaSoParaAdultos('view-suporte');
    return;
  }
  if (typeof contaLogada !== 'function' || !contaLogada()) {
    mudarDeView('view-suporte');
    mostrarSuporteSemConta();
    return;
  }
  if (!perfilDoSuporte()) {
    if (typeof abrirSelecaoDePerfis === 'function') abrirSelecaoDePerfis('suporte');
    return;
  }
  mudarDeView('view-suporte');
  if (idDaConversa) abrirConversaDoSuporte(idDaConversa);
  else mostrarListaDoSuporte();
}

function mostrarSuporteSemConta() {
  pararRelogioDoSuporte();
  const lugar = lugarDoSuporte();
  if (!lugar) return;
  lugar.innerHTML = `
    <div class="suporte-vazio">
      <span class="suporte-vazio-icone">${iconeDoSuporte('pessoa')}</span>
      <p>${tr('Entre na sua conta para conversar com a equipe.')}</p>
      <button type="button" class="licao-botao" id="suporte-entrar">${tr('Entrar na conta')}</button>
      <p class="suporte-email">${tr('Prefere e-mail?')} <a href="mailto:suporte@luminasancti.com">suporte@luminasancti.com</a></p>
    </div>`;
  lugar.querySelector('#suporte-entrar').addEventListener('click', () => { if (typeof irParaLogin === 'function') irParaLogin(); });
}

async function mostrarListaDoSuporte() {
  telaDoSuporte = 'lista';
  conversaDoSuporte = null;
  pararRelogioDoSuporte();
  const lugar = lugarDoSuporte();
  if (!lugar) return;
  lugar.innerHTML = `<p class="suporte-carregando">${tr('Carregando...')}</p>`;
  let conversas = [];
  try {
    conversas = (await chamarSuporte('suporte_minhas_conversas')) || [];
  } catch (erro) {
    lugar.innerHTML = `<p class="suporte-aviso">${escaparDoSuporte(erroDoSuporte(erro))}</p>`;
    return;
  }
  if (telaDoSuporte !== 'lista') return;
  const itens = conversas.map((c) => {
    const tema = temaDoSuporte(c.tema);
    const ultima = c.ultima || {};
    const previa = ultima.texto ? `${ultima.da_equipe ? tr('Equipe:') + ' ' : tr('Você:') + ' '}${ultima.texto}` : '';
    return `
      <li>
        <button type="button" class="suporte-item${c.nao_lida ? ' nao-lida' : ''}" data-conversa="${escaparDoSuporte(c.id)}">
          <span class="suporte-item-icone">${iconeDoSuporte(tema.icone)}</span>
          <span class="suporte-item-textos">
            <strong>${escaparDoSuporte(tr(tema.nome))}${c.assunto ? ` <span class="suporte-item-assunto" translate="no">· ${escaparDoSuporte(c.assunto)}</span>` : ''}</strong>
            <small translate="no">${escaparDoSuporte(previa)}</small>
          </span>
          <span class="suporte-item-lado">
            <span class="suporte-status status-${escaparDoSuporte(c.status)}">${escaparDoSuporte(tr(c.nao_lida ? 'Resposta nova' : (STATUS_DO_SUPORTE[c.status] || '')))}</span>
            <small>${escaparDoSuporte(dataDoSuporte(c.atualizada_em))}</small>
          </span>
        </button>
      </li>`;
  }).join('');
  lugar.innerHTML = `
    <div class="suporte-acoes">
      <button type="button" class="licao-botao suporte-nova-botao" id="suporte-nova">${iconeDoSuporte('mais')}<span>${tr('Nova conversa')}</span></button>
    </div>
    ${conversas.length ? `<h3 class="suporte-subtitulo">${tr('Minhas conversas')}</h3><ul class="suporte-lista">${itens}</ul>` : `
    <div class="suporte-vazio">
      <span class="suporte-vazio-icone">${iconeDoSuporte('conversa')}</span>
      <p>${tr('Você ainda não mandou nenhuma mensagem.')}</p>
      <p class="suporte-vazio-sub">${tr('Toque em "Nova conversa" para escrever para a equipe. Você pode abrir uma conversa para cada assunto.')}</p>
    </div>`}
    <p class="suporte-email">${tr('Prefere e-mail?')} <a href="mailto:suporte@luminasancti.com">suporte@luminasancti.com</a></p>`;
  lugar.querySelector('#suporte-nova').addEventListener('click', mostrarNovaConversaDoSuporte);
  lugar.querySelectorAll('[data-conversa]').forEach((botao) => {
    botao.addEventListener('click', () => abrirConversaDoSuporte(Number(botao.dataset.conversa)));
  });
}

function mostrarNovaConversaDoSuporte() {
  telaDoSuporte = 'nova';
  temaEscolhidoNoSuporte = '';
  pararRelogioDoSuporte();
  const lugar = lugarDoSuporte();
  if (!lugar) return;
  lugar.innerHTML = `
    <div class="suporte-nova">
      <button type="button" class="suporte-voltar" id="suporte-voltar">${iconeDoSuporte('voltar-seta')}<span>${tr('Minhas conversas')}</span></button>
      <h3 class="suporte-subtitulo">${tr('Sobre o que você quer falar?')}</h3>
      <div class="suporte-temas" role="radiogroup" aria-label="${escaparDoSuporte(tr('Assunto da conversa'))}">
        ${TEMAS_DO_SUPORTE.map((t) => `<button type="button" class="suporte-tema" role="radio" aria-checked="false" data-tema="${t.id}">${iconeDoSuporte(t.icone)}<span>${escaparDoSuporte(tr(t.nome))}</span></button>`).join('')}
      </div>
      <label class="suporte-rotulo" for="suporte-assunto">${tr('Título (opcional)')}</label>
      <input type="text" id="suporte-assunto" class="suporte-campo" maxlength="80" placeholder="${escaparDoSuporte(tr('Ex.: Não consigo abrir uma missão'))}">
      <label class="suporte-rotulo" for="suporte-texto">${tr('Sua mensagem')}</label>
      <textarea id="suporte-texto" class="suporte-campo" maxlength="2000" rows="5" placeholder="${escaparDoSuporte(tr('Conte com detalhes o que aconteceu. Se for um erro, diga em que tela você estava.'))}"></textarea>
      <small class="suporte-contador" id="suporte-contador">0 / 2000</small>
      <button type="button" class="licao-botao" id="suporte-enviar-nova" disabled>${iconeDoSuporte('enviar')}<span>${tr('Enviar para a equipe')}</span></button>
      <p class="suporte-aviso" id="suporte-aviso" aria-live="polite"></p>
    </div>`;
  const texto = lugar.querySelector('#suporte-texto');
  const enviar = lugar.querySelector('#suporte-enviar-nova');
  const atualizar = () => {
    lugar.querySelector('#suporte-contador').textContent = `${texto.value.length} / 2000`;
    enviar.disabled = !temaEscolhidoNoSuporte || texto.value.trim().length < 2;
  };
  lugar.querySelector('#suporte-voltar').addEventListener('click', mostrarListaDoSuporte);
  lugar.querySelectorAll('.suporte-tema').forEach((botao) => {
    botao.addEventListener('click', () => {
      temaEscolhidoNoSuporte = botao.dataset.tema;
      lugar.querySelectorAll('.suporte-tema').forEach((b) => {
        const escolhido = b === botao;
        b.classList.toggle('escolhido', escolhido);
        b.setAttribute('aria-checked', escolhido ? 'true' : 'false');
      });
      atualizar();
      const rotulo = enviar.querySelector('span');
      if (rotulo) rotulo.textContent = tr(TEMAS_SEM_ATENDIMENTO.includes(temaEscolhidoNoSuporte) ? 'Enviar para a equipe' : 'Enviar');
      if (!texto.value) texto.focus();
    });
  });
  texto.addEventListener('input', atualizar);
  enviar.addEventListener('click', async () => {
    const perfil = perfilDoSuporte();
    const aviso = lugar.querySelector('#suporte-aviso');
    if (!perfil) { aviso.textContent = erroDoSuporte('somente_adultos'); return; }
    if (!TEMAS_SEM_ATENDIMENTO.includes(temaEscolhidoNoSuporte)) {
      mostrarAtendimentoDoSuporte({ tema: temaEscolhidoNoSuporte, assunto: lugar.querySelector('#suporte-assunto').value.trim() || null, texto: texto.value.trim() });
      return;
    }
    enviar.disabled = true;
    aviso.textContent = '';
    try {
      const r = await chamarSuporte('suporte_criar', {
        _perfil: perfil.id,
        _tema: temaEscolhidoNoSuporte,
        _assunto: lugar.querySelector('#suporte-assunto').value.trim() || null,
        _texto: texto.value.trim(),
        _idioma: idiomaDoSuporte(),
      });
      if (typeof mostrarAvisoTrilhas === 'function') mostrarAvisoTrilhas(tr('Mensagem enviada! A equipe vai responder por aqui.'));
      await abrirConversaDoSuporte(Number(r && r.id));
    } catch (erro) {
      enviar.disabled = false;
      aviso.textContent = erroDoSuporte(erro);
    }
  });
}

function bolhaDoSuporte(m) {
  const classe = m.da_ia ? 'da-equipe da-ia' : m.da_equipe ? 'da-equipe' : 'minha';
  const autor = m.da_ia ? 'Lumina' : m.da_equipe ? tr('Equipe Lumina Sancti') : '';
  return `
    <div class="suporte-msg ${classe}">
      ${autor ? `<span class="suporte-msg-autor">${iconeDoSuporte(m.da_ia ? 'ajuda' : 'estrela')}${escaparDoSuporte(autor)}</span>` : ''}
      <p translate="no">${escaparDoSuporte(m.texto)}</p>
      <small>${escaparDoSuporte(dataDoSuporte(m.criada_em, true))}</small>
    </div>`;
}

async function abrirConversaDoSuporte(id) {
  if (!id) { mostrarListaDoSuporte(); return; }
  telaDoSuporte = 'conversa';
  const lugar = lugarDoSuporte();
  if (!lugar) return;
  if (!conversaDoSuporte || conversaDoSuporte.id !== id) lugar.innerHTML = `<p class="suporte-carregando">${tr('Carregando...')}</p>`;
  let conversa = null;
  try {
    conversa = await chamarSuporte('suporte_conversa', { _id: id });
  } catch (erro) {
    lugar.innerHTML = `<p class="suporte-aviso">${escaparDoSuporte(erroDoSuporte(erro))}</p>`;
    return;
  }
  if (telaDoSuporte !== 'conversa') return;
  const mesma = conversaDoSuporte && conversaDoSuporte.id === conversa.id && lugar.querySelector('.suporte-conversa')
    && (conversaDoSuporte.mensagens || []).length === (conversa.mensagens || []).length && conversaDoSuporte.status === conversa.status;
  conversaDoSuporte = conversa;
  if (!mesma) desenharConversaDoSuporte(lugar, conversa);
  atualizarAvisoDoSuporte();
  ligarRelogioDoSuporte();
}

function desenharConversaDoSuporte(lugar, conversa) {
  const tema = temaDoSuporte(conversa.tema);
  const mensagens = conversa.mensagens || [];
  const rascunho = lugar.querySelector('#suporte-resposta');
  const textoGuardado = rascunho ? rascunho.value : '';
  const estavaFocado = rascunho && document.activeElement === rascunho;
  lugar.innerHTML = `
    <div class="suporte-conversa">
      <div class="suporte-conversa-topo">
        <button type="button" class="suporte-voltar so-icone" id="suporte-voltar" aria-label="${escaparDoSuporte(tr('Minhas conversas'))}">${iconeDoSuporte('voltar-seta')}</button>
        <span class="suporte-item-icone">${iconeDoSuporte(tema.icone)}</span>
        <div class="suporte-conversa-titulo">
          <strong>${escaparDoSuporte(tr(tema.nome))}</strong>
          <small>${conversa.assunto ? `<span translate="no">${escaparDoSuporte(conversa.assunto)}</span> · ` : ''}<span class="suporte-status status-${escaparDoSuporte(conversa.status)}">${escaparDoSuporte(tr(STATUS_DO_SUPORTE[conversa.status] || ''))}</span></small>
        </div>
      </div>
      <div class="suporte-mensagens" id="suporte-mensagens">
        ${mensagens.map(bolhaDoSuporte).join('')}
        ${conversa.status === 'aberta' && mensagens.length && !mensagens[mensagens.length - 1].da_equipe ? `<p class="suporte-espera">${tr('A equipe recebeu a sua mensagem e responde aqui em até 2 dias. Se as notificações estiverem ligadas, você recebe um aviso no celular.')}</p>` : ''}
        ${conversa.status === 'resolvida' ? `<p class="suporte-espera">${tr('A equipe marcou esta conversa como resolvida. Se precisar de mais alguma coisa, é só escrever de novo.')}</p>` : ''}
      </div>
      <form class="suporte-responder" id="suporte-responder">
        <textarea id="suporte-resposta" class="suporte-campo" rows="2" maxlength="2000" placeholder="${escaparDoSuporte(tr('Escreva uma mensagem'))}"></textarea>
        <button type="submit" class="suporte-enviar" aria-label="${escaparDoSuporte(tr('Enviar'))}">${iconeDoSuporte('enviar')}</button>
      </form>
      <p class="suporte-aviso" id="suporte-aviso" aria-live="polite"></p>
    </div>`;
  const caixa = lugar.querySelector('#suporte-mensagens');
  caixa.scrollTop = caixa.scrollHeight;
  const resposta = lugar.querySelector('#suporte-resposta');
  resposta.value = textoGuardado;
  if (estavaFocado) resposta.focus();
  lugar.querySelector('#suporte-voltar').addEventListener('click', mostrarListaDoSuporte);
  resposta.addEventListener('keydown', (evento) => {
    if (evento.key === 'Enter' && !evento.shiftKey && window.matchMedia && window.matchMedia('(min-width: 900px)').matches) {
      evento.preventDefault();
      lugar.querySelector('#suporte-responder').requestSubmit();
    }
  });
  lugar.querySelector('#suporte-responder').addEventListener('submit', async (evento) => {
    evento.preventDefault();
    const texto = resposta.value.trim();
    const perfil = perfilDoSuporte();
    const aviso = lugar.querySelector('#suporte-aviso');
    if (!texto) return;
    if (!perfil) { aviso.textContent = erroDoSuporte('somente_adultos'); return; }
    const botao = lugar.querySelector('.suporte-enviar');
    botao.disabled = true;
    try {
      await chamarSuporte('suporte_enviar', { _id: conversa.id, _perfil: perfil.id, _texto: texto });
      resposta.value = '';
      await abrirConversaDoSuporte(conversa.id);
    } catch (erro) {
      botao.disabled = false;
      aviso.textContent = erroDoSuporte(erro);
    }
  });
}

async function perguntarAoAtendimento(pergunta) {
  const perfil = perfilDoSuporte();
  const { data } = await supabaseCliente.auth.getSession();
  const token = data && data.session ? data.session.access_token : '';
  const historico = atendimentoDoSuporte.historico.slice(0, -1).map((m) => ({ papel: m.da_ia ? 'atendimento' : 'pessoa', texto: m.texto }));
  const resposta = await fetch(ATENDIMENTO_DO_SUPORTE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify({ pergunta, historico, tema: atendimentoDoSuporte.tema, idioma: idiomaDoSuporte(), perfil: perfil ? perfil.id : null }),
  });
  const corpo = await resposta.json().catch(() => ({}));
  if (!resposta.ok || !corpo.resposta) return { texto: corpo.erro || tr('A Lumina não conseguiu responder agora. Toque em "Falar com uma pessoa da equipe".'), precisaEquipe: true, falhou: true };
  return { texto: corpo.resposta, precisaEquipe: !!corpo.precisaEquipe };
}

function desenharAtendimentoDoSuporte(lugar) {
  const a = atendimentoDoSuporte;
  const tema = temaDoSuporte(a.tema);
  const respostas = a.historico.filter((m) => m.da_ia).length;
  const podePerguntar = !a.esperando && respostas < RESPOSTAS_DO_ATENDIMENTO;
  lugar.innerHTML = `
    <div class="suporte-conversa suporte-atendimento">
      <div class="suporte-conversa-topo">
        <button type="button" class="suporte-voltar so-icone" id="suporte-voltar" aria-label="${escaparDoSuporte(tr('Minhas conversas'))}">${iconeDoSuporte('voltar-seta')}</button>
        <span class="suporte-item-icone">${iconeDoSuporte(tema.icone)}</span>
        <div class="suporte-conversa-titulo">
          <strong>${escaparDoSuporte(tr(tema.nome))}</strong>
          <small>${escaparDoSuporte('Lumina')}</small>
        </div>
      </div>
      <div class="suporte-mensagens" id="suporte-mensagens" aria-live="polite">
        ${a.historico.map((m) => bolhaDoSuporte({ ...m, da_equipe: m.da_ia })).join('')}
        ${a.esperando ? `<div class="suporte-msg da-equipe da-ia suporte-digitando" aria-label="${escaparDoSuporte(tr('Escrevendo...'))}"><span></span><span></span><span></span></div>` : ''}
      </div>
      ${podePerguntar ? `<form class="suporte-responder" id="suporte-responder">
        <textarea id="suporte-resposta" class="suporte-campo" rows="2" maxlength="1000" placeholder="${escaparDoSuporte(tr('Escreva outra dúvida'))}"></textarea>
        <button type="submit" class="suporte-enviar" aria-label="${escaparDoSuporte(tr('Enviar'))}">${iconeDoSuporte('enviar')}</button>
      </form>` : ''}
      <div class="suporte-atendimento-acoes">
        <button type="button" class="suporte-pessoa${a.precisaEquipe ? ' destaque' : ''}" id="suporte-pessoa" ${a.esperando ? 'disabled' : ''}>${iconeDoSuporte('usuarios')}<span>${tr('Falar com uma pessoa da equipe')}</span></button>
        ${a.precisaEquipe || a.esperando ? '' : `<button type="button" class="suporte-resolveu" id="suporte-resolveu">${iconeDoSuporte('check')}<span>${tr('Resolveu')}</span></button>`}
      </div>
      <p class="suporte-aviso" id="suporte-aviso" aria-live="polite"></p>
    </div>`;
  const caixa = lugar.querySelector('#suporte-mensagens');
  caixa.scrollTop = caixa.scrollHeight;
  lugar.querySelector('#suporte-voltar').addEventListener('click', mostrarListaDoSuporte);
  const resolveu = lugar.querySelector('#suporte-resolveu');
  if (resolveu) resolveu.addEventListener('click', () => {
    atendimentoDoSuporte = null;
    if (typeof mostrarAvisoTrilhas === 'function') mostrarAvisoTrilhas(tr('Que bom que ajudou!'));
    mostrarListaDoSuporte();
  });
  lugar.querySelector('#suporte-pessoa').addEventListener('click', () => passarAtendimentoParaEquipe(lugar));
  const form = lugar.querySelector('#suporte-responder');
  if (form) {
    const campo = form.querySelector('#suporte-resposta');
    campo.addEventListener('keydown', (evento) => {
      if (evento.key === 'Enter' && !evento.shiftKey && window.matchMedia && window.matchMedia('(min-width: 900px)').matches) {
        evento.preventDefault();
        form.requestSubmit();
      }
    });
    form.addEventListener('submit', (evento) => {
      evento.preventDefault();
      const texto = campo.value.trim();
      if (texto) continuarAtendimentoDoSuporte(lugar, texto);
    });
  }
}

async function continuarAtendimentoDoSuporte(lugar, texto) {
  const a = atendimentoDoSuporte;
  if (!a || a.esperando) return;
  a.historico.push({ texto, da_ia: false, criada_em: new Date().toISOString() });
  a.esperando = true;
  desenharAtendimentoDoSuporte(lugar);
  let resultado;
  try {
    resultado = await perguntarAoAtendimento(texto);
  } catch (erro) {
    resultado = { texto: tr('A Lumina não conseguiu responder agora. Toque em "Falar com uma pessoa da equipe".'), precisaEquipe: true, falhou: true };
  }
  if (atendimentoDoSuporte !== a || telaDoSuporte !== 'atendimento') return;
  a.esperando = false;
  a.historico.push({ texto: resultado.texto, da_ia: true, criada_em: new Date().toISOString() });
  if (resultado.precisaEquipe) a.precisaEquipe = true;
  desenharAtendimentoDoSuporte(lugar);
}

function mostrarAtendimentoDoSuporte(pedido) {
  telaDoSuporte = 'atendimento';
  pararRelogioDoSuporte();
  const lugar = lugarDoSuporte();
  if (!lugar) return;
  atendimentoDoSuporte = { tema: pedido.tema, assunto: pedido.assunto, historico: [], esperando: false, precisaEquipe: false };
  continuarAtendimentoDoSuporte(lugar, pedido.texto);
}

async function passarAtendimentoParaEquipe(lugar) {
  const a = atendimentoDoSuporte;
  const perfil = perfilDoSuporte();
  const aviso = lugar.querySelector('#suporte-aviso');
  if (!a) return;
  if (!perfil) { aviso.textContent = erroDoSuporte('somente_adultos'); return; }
  const botao = lugar.querySelector('#suporte-pessoa');
  botao.disabled = true;
  aviso.textContent = '';
  try {
    const r = await chamarSuporte('suporte_criar', {
      _perfil: perfil.id,
      _tema: a.tema,
      _assunto: a.assunto,
      _texto: tr('Quero falar com uma pessoa da equipe.'),
      _idioma: idiomaDoSuporte(),
      _historico: a.historico.map((m) => ({ texto: m.texto, da_ia: !!m.da_ia })),
    });
    atendimentoDoSuporte = null;
    if (typeof mostrarAvisoTrilhas === 'function') mostrarAvisoTrilhas(tr('Pronto! A equipe responde aqui em até 2 dias.'));
    await abrirConversaDoSuporte(Number(r && r.id));
  } catch (erro) {
    botao.disabled = false;
    aviso.textContent = erroDoSuporte(erro);
  }
}

function pararRelogioDoSuporte() {
  if (relogioDoSuporte) clearInterval(relogioDoSuporte);
  relogioDoSuporte = null;
}

function ligarRelogioDoSuporte() {
  pararRelogioDoSuporte();
  relogioDoSuporte = setInterval(() => {
    const tela = document.getElementById('view-suporte');
    if (!tela || !tela.classList.contains('active') || telaDoSuporte !== 'conversa' || !conversaDoSuporte) { pararRelogioDoSuporte(); return; }
    if (document.hidden) return;
    abrirConversaDoSuporte(conversaDoSuporte.id);
  }, 20000);
}

async function atualizarAvisoDoSuporte() {
  if (typeof supabaseCliente === 'undefined' || !supabaseCliente || typeof contaLogada !== 'function' || !contaLogada()) return;
  if (typeof modoInfantilAtivo === 'function' && modoInfantilAtivo()) return;
  try {
    naoLidasDoSuporte = Number(await chamarSuporte('suporte_nao_lidas')) || 0;
  } catch (e) {
    return;
  }
  document.querySelectorAll('[data-aviso-suporte]').forEach((marca) => {
    marca.hidden = naoLidasDoSuporte === 0;
    marca.textContent = naoLidasDoSuporte > 9 ? '9+' : String(naoLidasDoSuporte);
  });
}

function iniciarSuporte() {
  const ligar = (id, funcao) => {
    const botao = document.getElementById(id);
    if (botao) botao.addEventListener('click', funcao);
  };
  ligar('nav-suporte', () => abrirSuporte());
  ligar('footer-suporte', () => abrirSuporte());
  ligar('btn-back-suporte', () => { pararRelogioDoSuporte(); mudarDeView('view-home'); });
  setTimeout(atualizarAvisoDoSuporte, 4000);
  setInterval(() => { if (!document.hidden) atualizarAvisoDoSuporte(); }, 5 * 60 * 1000);
}

document.addEventListener('DOMContentLoaded', () => {
  if (typeof rodarComSeguranca === 'function') rodarComSeguranca('suporte', iniciarSuporte);
  else iniciarSuporte();
});
