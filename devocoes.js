let exameEscolhido = null;
let marcasDoExame = new Set();
let novenaAberta = null;
let diaDaNovenaAberto = null;

function idiomaDasDevocoes() {
  return typeof idiomaAtual === 'string' && ['pt', 'en', 'es'].includes(idiomaAtual) ? idiomaAtual : 'pt';
}

function textoDaDevocao(objeto) {
  if (!objeto) return '';
  if (typeof objeto === 'string') return typeof tr === 'function' ? tr(objeto) : objeto;
  return objeto[idiomaDasDevocoes()] || objeto.pt || '';
}

function trDaDevocao(texto, valores) {
  return typeof tr === 'function' ? tr(texto, valores) : String(texto).replace(/\{(\w+)\}/g, (_, chave) => (valores && valores[chave] !== undefined ? valores[chave] : ''));
}

function escaparDaDevocao(texto) {
  return String(texto || '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

function oracaoDaBibliotecaDaDevocao(id) {
  if (typeof BIBLIOTECA_DE_ORACOES === 'undefined') return null;
  const oracao = BIBLIOTECA_DE_ORACOES.find((o) => o.id === id);
  if (!oracao) return null;
  const i = { pt: 0, en: 1, es: 2 }[idiomaDasDevocoes()];
  return { titulo: oracao.t[i] || oracao.t[0], texto: oracao.x[i] || oracao.x[0] };
}

function paragrafosDaDevocao(texto) {
  return String(texto || '').split('\n').map((linha) => escaparDaDevocao(linha)).join('<br>');
}

function voltarDaDevocao() {
  return `<button class="btn-back dev-voltar"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg><span>${escaparDaDevocao(trDaDevocao('Voltar para o início'))}</span></button>`;
}

function exameInicialDoPerfil() {
  const membro = typeof obterMembroAtivo === 'function' ? obterMembroAtivo() : (typeof membroAtivo !== 'undefined' ? membroAtivo : null);
  if (membro && membro.tipo === 'crianca') return membro.faixa === '13a17' ? 'jovem' : 'crianca';
  return 'adulto';
}

function abrirExameDeConsciencia() {
  if (typeof closeSidebar === 'function') closeSidebar();
  marcasDoExame = new Set();
  exameEscolhido = exameInicialDoPerfil();
  mudarDeView('view-exame');
  desenharExame();
  window.scrollTo({ top: 0, behavior: 'auto' });
}

function desenharExame() {
  const lugar = document.getElementById('exame-conteudo');
  if (!lugar) return;
  const exame = EXAMES_DE_CONSCIENCIA[exameEscolhido] || EXAMES_DE_CONSCIENCIA.adulto;
  const contricao = oracaoDaBibliotecaDaDevocao('ato-de-contricao');
  const passos = exameEscolhido === 'crianca' ? PASSOS_DA_CONFISSAO.crianca : PASSOS_DA_CONFISSAO.geral;
  let numero = 0;
  lugar.innerHTML = `${voltarDaDevocao()}
    <header class="dev-topo">
      <p class="dev-selo">${escaparDaDevocao(trDaDevocao('Para se preparar para a confissão'))}</p>
      <h2 class="section-title">${escaparDaDevocao(trDaDevocao('Exame de consciência'))}</h2>
      <div class="title-divider"></div>
      <p class="dev-privado"><svg class="icone" viewBox="0 0 24 24" aria-hidden="true"><use href="#icone-cadeado"></use></svg><span>${escaparDaDevocao(trDaDevocao('Nada do que você marcar é guardado nem enviado. Quando você sair desta página, tudo se apaga.'))}</span></p>
    </header>
    <div class="dev-abas" role="tablist">${Object.keys(EXAMES_DE_CONSCIENCIA).map((chave) => `<button type="button" role="tab" class="dev-aba${chave === exameEscolhido ? ' ativa' : ''}" aria-selected="${chave === exameEscolhido}" data-exame="${chave}"><strong>${escaparDaDevocao(textoDaDevocao(EXAMES_DE_CONSCIENCIA[chave].nome))}</strong><small>${escaparDaDevocao(textoDaDevocao(EXAMES_DE_CONSCIENCIA[chave].idade))}</small></button>`).join('')}</div>
    <section class="dev-cartao dev-oracao-inicial">
      <small>${escaparDaDevocao(trDaDevocao('Antes de começar'))}</small>
      <p>${escaparDaDevocao(exameEscolhido === 'crianca' ? trDaDevocao('Jesus, me ajuda a lembrar com sinceridade o que eu fiz de errado e a ficar arrependido de verdade. Eu quero ficar perto de ti. Amém.') : trDaDevocao('Espírito Santo, ilumina a minha mente e o meu coração para que eu reconheça os meus pecados com sinceridade e me arrependa de verdade. Amém.'))}</p>
    </section>
    ${exame.grupos.map((grupo) => `<section class="dev-cartao dev-grupo">
      <h3>${escaparDaDevocao(textoDaDevocao(grupo.titulo))}</h3>
      <div class="dev-perguntas">${grupo.perguntas.map((pergunta) => { numero += 1; const id = `${exameEscolhido}-${numero}`; const marcada = marcasDoExame.has(id); return `<button type="button" class="dev-pergunta${marcada ? ' marcada' : ''}" aria-pressed="${marcada}" data-pergunta="${id}"><span class="dev-caixa" aria-hidden="true"></span><span class="dev-pergunta-texto">${escaparDaDevocao(textoDaDevocao(pergunta))}</span></button>`; }).join('')}</div>
    </section>`).join('')}
    <section class="dev-cartao dev-resumo" id="exame-resumo"></section>
    <section class="dev-cartao dev-passos">
      <h3>${escaparDaDevocao(trDaDevocao('Como se confessar'))}</h3>
      <ol>${passos.map((passo) => `<li>${escaparDaDevocao(textoDaDevocao(passo))}</li>`).join('')}</ol>
    </section>
    ${contricao ? `<section class="dev-cartao dev-oracao"><small>${escaparDaDevocao(trDaDevocao('Oração'))}</small><h3>${escaparDaDevocao(contricao.titulo)}</h3><p>${paragrafosDaDevocao(contricao.texto)}</p></section>` : ''}
    <p class="dev-final">${escaparDaDevocao(trDaDevocao('Deus nunca se cansa de perdoar quem se arrepende. A confissão é o encontro com a misericórdia dele.'))}</p>`;
  lugar.querySelector('.dev-voltar').addEventListener('click', () => { marcasDoExame = new Set(); mudarDeView('view-home'); });
  lugar.querySelectorAll('[data-exame]').forEach((aba) => aba.addEventListener('click', () => {
    if (aba.dataset.exame === exameEscolhido) return;
    exameEscolhido = aba.dataset.exame;
    marcasDoExame = new Set();
    desenharExame();
  }));
  lugar.querySelectorAll('[data-pergunta]').forEach((botao) => botao.addEventListener('click', () => {
    const id = botao.dataset.pergunta;
    if (marcasDoExame.has(id)) marcasDoExame.delete(id);
    else marcasDoExame.add(id);
    const marcada = marcasDoExame.has(id);
    botao.classList.toggle('marcada', marcada);
    botao.setAttribute('aria-pressed', String(marcada));
    desenharResumoDoExame();
  }));
  desenharResumoDoExame();
}

function desenharResumoDoExame() {
  const lugar = document.getElementById('exame-resumo');
  if (!lugar) return;
  const marcadas = Array.from(document.querySelectorAll('#exame-conteudo .dev-pergunta.marcada .dev-pergunta-texto')).map((el) => el.textContent);
  if (!marcadas.length) {
    lugar.innerHTML = `<h3>${escaparDaDevocao(trDaDevocao('Para lembrar na confissão'))}</h3><p class="dev-vazio">${escaparDaDevocao(trDaDevocao('Toque nas perguntas em que você precisa pedir perdão. Elas aparecem aqui para você lembrar na hora da confissão.'))}</p>`;
    return;
  }
  lugar.innerHTML = `<h3>${escaparDaDevocao(trDaDevocao('Para lembrar na confissão'))} <span class="dev-contagem">${marcadas.length}</span></h3>
    <ul>${marcadas.map((texto) => `<li>${escaparDaDevocao(texto)}</li>`).join('')}</ul>
    <button type="button" class="dev-apagar">${escaparDaDevocao(trDaDevocao('Apagar tudo agora'))}</button>`;
  lugar.querySelector('.dev-apagar').addEventListener('click', () => { marcasDoExame = new Set(); desenharExame(); });
}

function chaveDasNovenas() {
  const perfil = typeof membroAtivo !== 'undefined' && membroAtivo && membroAtivo.id ? membroAtivo.id : 'aparelho';
  return `lumina-sancti-novenas-${perfil}`;
}

function estadoDasNovenas() {
  try { return JSON.parse(localStorage.getItem(chaveDasNovenas()) || '{}') || {}; } catch (e) { return {}; }
}

function guardarEstadoDasNovenas(estado) {
  try { localStorage.setItem(chaveDasNovenas(), JSON.stringify(estado)); } catch (e) {
  }
}

function hojeDasDevocoes() {
  const base = typeof hojeDoAdvento === 'function' ? hojeDoAdvento() : new Date();
  return `${base.getFullYear()}-${String(base.getMonth() + 1).padStart(2, '0')}-${String(base.getDate()).padStart(2, '0')}`;
}

function progressoDaNovena(id) {
  const estado = estadoDasNovenas()[id];
  if (!estado || !estado.feitos) return { iniciada: false, feitos: 0, hojeFeito: false, proximo: 1, concluida: false };
  const dias = Object.keys(estado.feitos).map(Number).filter((n) => n >= 1 && n <= 9);
  const feitos = dias.length;
  const datas = Object.values(estado.feitos);
  const hojeFeito = datas.includes(hojeDasDevocoes());
  return { iniciada: feitos > 0, feitos, hojeFeito, proximo: Math.min(9, feitos + 1), concluida: feitos >= 9 };
}

function abrirNovenas(id) {
  if (typeof closeSidebar === 'function') closeSidebar();
  novenaAberta = NOVENAS.some((n) => n.id === id) ? id : null;
  diaDaNovenaAberto = null;
  mudarDeView('view-novenas');
  desenharNovenas();
  window.scrollTo({ top: 0, behavior: 'auto' });
}

function simboloDaNovena(novena) {
  const desenhos = {
    estrela: '<path d="M24 4 L28 18 L42 22 L28 26 L24 42 L20 26 L6 22 L20 18Z" fill="#fff6d6"/>',
    lirio: '<path d="M24 40 V20 M24 20 C18 14 16 8 24 4 C32 8 30 14 24 20 M24 22 C16 20 10 22 8 28 C16 30 20 28 24 24 M24 22 C32 20 38 22 40 28 C32 30 28 28 24 24" fill="none" stroke="#fff6d6" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>',
    pomba: '<path d="M8 26 C14 18 22 16 30 20 L40 12 L36 24 C34 32 26 36 18 34 L10 38 L14 30Z" fill="#fff6d6"/><circle cx="31" cy="21" r="1.4" fill="#8a3010"/>',
    coroa: '<path d="M8 34 L10 14 L18 24 L24 10 L30 24 L38 14 L40 34Z" fill="#fff6d6"/><rect x="8" y="34" width="32" height="5" rx="1.5" fill="#fff6d6"/>',
    raios: '<path d="M24 6 V42" stroke="#fff6d6" stroke-width="2.6"/><path d="M24 16 L10 42 H22Z" fill="#ff8a96" opacity=".9"/><path d="M24 16 L38 42 H26Z" fill="#9ad0ff" opacity=".9"/><circle cx="24" cy="12" r="5" fill="#fff6d6"/>',
  };
  return `<span class="dev-simbolo" style="--cor-novena:${novena.cor}"><svg viewBox="0 0 48 48" aria-hidden="true">${desenhos[novena.simbolo] || desenhos.estrela}</svg></span>`;
}

function desenharNovenas() {
  const lugar = document.getElementById('novenas-conteudo');
  if (!lugar) return;
  if (novenaAberta) { desenharNovena(lugar, NOVENAS.find((n) => n.id === novenaAberta)); return; }
  lugar.innerHTML = `${voltarDaDevocao()}
    <header class="dev-topo">
      <p class="dev-selo">${escaparDaDevocao(trDaDevocao('Nove dias de oração'))}</p>
      <h2 class="section-title">${escaparDaDevocao(trDaDevocao('Novenas'))}</h2>
      <div class="title-divider"></div>
      <p class="dev-intro">${escaparDaDevocao(trDaDevocao('Uma novena são nove dias seguidos de oração por uma intenção, como os apóstolos rezaram com Maria esperando o Espírito Santo. Reze um dia por vez e acompanhe o seu caminho.'))}</p>
    </header>
    <div class="dev-novenas">${NOVENAS.map((novena) => {
      const p = progressoDaNovena(novena.id);
      const estado = p.concluida ? trDaDevocao('Concluída') : (p.iniciada ? trDaDevocao('Dia {n} de 9', { n: p.hojeFeito ? p.feitos : p.proximo }) : trDaDevocao('Começar'));
      return `<button type="button" class="dev-novena-cartao${p.iniciada && !p.concluida ? ' em-andamento' : ''}${p.concluida ? ' concluida' : ''}" data-novena="${novena.id}" style="--cor-novena:${novena.cor}">
        ${simboloDaNovena(novena)}
        <span class="dev-novena-textos"><strong>${escaparDaDevocao(textoDaDevocao(novena.nome))}</strong><small>${escaparDaDevocao(textoDaDevocao(novena.epoca))}</small><span>${escaparDaDevocao(textoDaDevocao(novena.resumo))}</span></span>
        <span class="dev-novena-estado">${escaparDaDevocao(estado)}${p.iniciada && !p.concluida ? `<i style="--feito:${(p.feitos / 9) * 100}%"></i>` : ''}</span>
      </button>`;
    }).join('')}</div>`;
  lugar.querySelector('.dev-voltar').addEventListener('click', () => mudarDeView('view-home'));
  lugar.querySelectorAll('[data-novena]').forEach((botao) => botao.addEventListener('click', () => {
    novenaAberta = botao.dataset.novena;
    diaDaNovenaAberto = null;
    desenharNovenas();
    window.scrollTo({ top: 0, behavior: 'auto' });
  }));
}

function desenharNovena(lugar, novena) {
  if (!novena) { novenaAberta = null; desenharNovenas(); return; }
  const p = progressoDaNovena(novena.id);
  const feitos = (estadoDasNovenas()[novena.id] || {}).feitos || {};
  const dia = diaDaNovenaAberto || (p.concluida ? 9 : (p.hojeFeito ? p.feitos : p.proximo));
  diaDaNovenaAberto = dia;
  const dados = novena.dias[dia - 1];
  const oracao = novena.oracaoDaBiblioteca ? oracaoDaBibliotecaDaDevocao(novena.oracaoDaBiblioteca) : { titulo: textoDaDevocao(novena.nome), texto: textoDaDevocao(novena.oracao) };
  const basicas = ['pai-nosso', 'ave-maria', 'gloria'].map(oracaoDaBibliotecaDaDevocao).filter(Boolean);
  const feitoEsteDia = !!feitos[dia];
  const podeRezar = !feitoEsteDia && dia === p.proximo && !p.hojeFeito;
  let motivo = '';
  if (p.concluida) motivo = trDaDevocao('Novena concluída! Que Deus atenda as suas intenções.');
  else if (p.hojeFeito) motivo = trDaDevocao('Você já rezou hoje. Volte amanhã para o dia {n}.', { n: p.proximo });
  else if (feitoEsteDia) motivo = trDaDevocao('Você já rezou este dia.');
  else if (dia > p.proximo) motivo = trDaDevocao('Reze os dias na ordem, um por dia.');
  lugar.innerHTML = `<button class="btn-back dev-voltar"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg><span>${escaparDaDevocao(trDaDevocao('Todas as novenas'))}</span></button>
    <header class="dev-topo dev-topo-novena" style="--cor-novena:${novena.cor}">
      ${simboloDaNovena(novena)}
      <h2 class="section-title">${escaparDaDevocao(textoDaDevocao(novena.nome))}</h2>
      <p class="dev-intro">${escaparDaDevocao(textoDaDevocao(novena.epoca))}</p>
    </header>
    <div class="dev-dias" role="tablist">${novena.dias.map((_, i) => { const n = i + 1; return `<button type="button" class="dev-dia${feitos[n] ? ' feito' : ''}${n === dia ? ' atual' : ''}${n > p.proximo && !feitos[n] ? ' trancado' : ''}" data-dia-novena="${n}" aria-label="${escaparDaDevocao(trDaDevocao('Dia {n}', { n }))}"><span>${n}</span></button>`; }).join('')}</div>
    <section class="dev-cartao dev-dia-cartao" style="--cor-novena:${novena.cor}">
      <small>${escaparDaDevocao(trDaDevocao('Dia {n} de 9', { n: dia }))}</small>
      <h3>${escaparDaDevocao(textoDaDevocao(dados.titulo))}</h3>
      <p>${escaparDaDevocao(textoDaDevocao(dados.texto))}</p>
      <div class="dev-intencao"><small>${escaparDaDevocao(trDaDevocao('Intenção do dia'))}</small><p>${escaparDaDevocao(textoDaDevocao(dados.intencao))}</p></div>
    </section>
    ${oracao ? `<section class="dev-cartao dev-oracao"><small>${escaparDaDevocao(trDaDevocao('Oração da novena'))}</small><h3>${escaparDaDevocao(oracao.titulo)}</h3><p>${paragrafosDaDevocao(oracao.texto)}</p></section>` : ''}
    <section class="dev-cartao dev-basicas">
      <small>${escaparDaDevocao(trDaDevocao('Para terminar'))}</small>
      ${basicas.map((o) => `<details><summary>${escaparDaDevocao(o.titulo)}</summary><p>${paragrafosDaDevocao(o.texto)}</p></details>`).join('')}
    </section>
    <div class="dev-rezei-caixa">
      ${podeRezar ? `<button type="button" class="dev-rezei">${escaparDaDevocao(trDaDevocao('Rezei o dia {n}', { n: dia }))}</button>` : `<p class="dev-motivo">${escaparDaDevocao(motivo)}</p>`}
      ${p.concluida ? `<button type="button" class="dev-recomecar">${escaparDaDevocao(trDaDevocao('Rezar esta novena de novo'))}</button>` : ''}
    </div>`;
  lugar.querySelector('.dev-voltar').addEventListener('click', () => { novenaAberta = null; diaDaNovenaAberto = null; desenharNovenas(); window.scrollTo({ top: 0, behavior: 'auto' }); });
  lugar.querySelectorAll('[data-dia-novena]').forEach((botao) => botao.addEventListener('click', () => {
    const n = Number(botao.dataset.diaNovena);
    if (n > p.proximo && !feitos[n]) {
      if (typeof avisoRapidoDosSantos === 'function') avisoRapidoDosSantos(trDaDevocao('Reze os dias na ordem, um por dia.'), 'estrela');
      return;
    }
    diaDaNovenaAberto = n;
    desenharNovena(lugar, novena);
  }));
  const rezei = lugar.querySelector('.dev-rezei');
  if (rezei) rezei.addEventListener('click', () => marcarDiaDaNovena(novena, dia));
  const recomecar = lugar.querySelector('.dev-recomecar');
  if (recomecar) recomecar.addEventListener('click', () => {
    const estado = estadoDasNovenas();
    delete estado[novena.id];
    guardarEstadoDasNovenas(estado);
    diaDaNovenaAberto = null;
    desenharNovena(lugar, novena);
  });
}

function marcarDiaDaNovena(novena, dia) {
  const estado = estadoDasNovenas();
  const atual = estado[novena.id] || { inicio: hojeDasDevocoes(), feitos: {} };
  atual.feitos[dia] = hojeDasDevocoes();
  estado[novena.id] = atual;
  guardarEstadoDasNovenas(estado);
  diaDaNovenaAberto = null;
  if (typeof somDoAdvento === 'function') somDoAdvento(dia === 9 ? 'carta' : 'feito');
  const lugar = document.getElementById('novenas-conteudo');
  if (lugar) desenharNovena(lugar, novena);
  if (dia === 9) {
    if (typeof avisoRapidoDosSantos === 'function') avisoRapidoDosSantos(trDaDevocao('Novena concluída! Que Deus atenda as suas intenções.'), 'estrela');
  } else if (typeof avisoRapidoDosSantos === 'function') avisoRapidoDosSantos(trDaDevocao('Dia {n} rezado. Até amanhã!', { n: dia }), 'estrela');
  desenharDevocoesNoInicio();
}

function novenaDaEpocaDeHoje() {
  const hoje = hojeDasDevocoes().slice(5);
  const epocas = [['natal', '12-16', '12-24'], ['imaculada', '11-29', '12-07'], ['sao-jose', '03-10', '03-18'], ['aparecida', '10-03', '10-11']];
  const achada = epocas.find(([, de, ate]) => hoje >= de && hoje <= ate);
  return achada ? NOVENAS.find((n) => n.id === achada[0]) : null;
}

function desenharDevocoesNoInicio() {
  const lugar = document.getElementById('novena-inicio');
  if (!lugar) return;
  const emAndamento = NOVENAS.map((n) => ({ novena: n, p: progressoDaNovena(n.id) })).find(({ p }) => p.iniciada && !p.concluida && !p.hojeFeito);
  const daEpoca = novenaDaEpocaDeHoje();
  let novena = null;
  let texto = '';
  if (emAndamento) {
    novena = emAndamento.novena;
    texto = trDaDevocao('Hoje é o dia {n} de 9. Reze agora.', { n: emAndamento.p.proximo });
  } else if (daEpoca && !progressoDaNovena(daEpoca.id).iniciada) {
    novena = daEpoca;
    texto = trDaDevocao('É tempo desta novena. Comece hoje!');
  }
  lugar.hidden = !novena;
  if (!novena) { lugar.innerHTML = ''; return; }
  lugar.innerHTML = `<button type="button" class="dev-inicio" style="--cor-novena:${novena.cor}">${simboloDaNovena(novena)}<span><small>${escaparDaDevocao(trDaDevocao('Novena'))}</small><strong>${escaparDaDevocao(textoDaDevocao(novena.nome))}</strong><span>${escaparDaDevocao(texto)}</span></span></button>`;
  lugar.querySelector('.dev-inicio').addEventListener('click', () => abrirNovenas(novena.id));
}

function iniciarDevocoes() {
  const navNovenas = document.getElementById('nav-novenas');
  if (navNovenas) navNovenas.addEventListener('click', () => abrirNovenas());
  const navExame = document.getElementById('nav-exame');
  if (navExame) navExame.addEventListener('click', abrirExameDeConsciencia);
  document.querySelectorAll('[data-abrir-devocao]').forEach((botao) => botao.addEventListener('click', () => {
    if (botao.dataset.abrirDevocao === 'exame') abrirExameDeConsciencia();
    else abrirNovenas();
  }));
  desenharDevocoesNoInicio();
  document.addEventListener('lumina-idioma', () => {
    desenharDevocoesNoInicio();
    const exame = document.getElementById('view-exame');
    if (exame && exame.classList.contains('active')) desenharExame();
    const novenas = document.getElementById('view-novenas');
    if (novenas && novenas.classList.contains('active')) desenharNovenas();
  });
}

document.addEventListener('DOMContentLoaded', () => {
  if (typeof rodarComSeguranca === 'function') rodarComSeguranca('devocoes', iniciarDevocoes);
  else iniciarDevocoes();
});
