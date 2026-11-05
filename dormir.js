const HISTORIAS_PARA_DORMIR = ['sagrada-familia', 'anjos-guarda', 'francisco-assis', 'clara-assis', 'antonio-padua', 'jose', 'teresinha', 'joao-bosco', 'domingos-savio', 'martin-porres', 'rosa-lima', 'juan-diego', 'bernadete', 'sao-nicolau', 'isidro-lavrador', 'frei-galvao', 'nha-chica', 'dulce-pobres', 'carlo-acutis', 'filipe-neri', 'joaquim-ana', 'kateri-tekakwitha', 'zita', 'andre-bessette', 'joao-maria-vianney', 'rafael'];

const estadoDoDormir = { santo: null, partes: [], atual: 0, tocando: false, timer: 'fim', apagarEm: null, relogio: null, terminou: false };

function trDoDormir(texto, valores) {
  return typeof tr === 'function' ? tr(texto, valores) : String(texto).replace(/\{(\w+)\}/g, (_, chave) => (valores && valores[chave] !== undefined ? valores[chave] : ''));
}

function escaparDoDormir(texto) {
  return String(texto || '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

function idiomaDoDormir() {
  return typeof idiomaAtual === 'string' && ['pt', 'en', 'es'].includes(idiomaAtual) ? idiomaAtual : 'pt';
}

function santosParaDormir() {
  if (typeof santosData === 'undefined') return [];
  return HISTORIAS_PARA_DORMIR.map((id) => santosData.find((s) => s.id === id)).filter(Boolean);
}

function nomeDoSantoParaDormir(santo) {
  return typeof textoDoSanto === 'function' ? textoDoSanto(santo).nome : santo.nome;
}

function vozDisponivelParaDormir() {
  return !!(window.speechSynthesis && typeof SpeechSynthesisUtterance === 'function');
}

function ceuDoDormir() {
  const estrelas = Array.from({ length: 70 }, (_, i) => {
    const x = (Math.sin(i * 91.7) * 0.5 + 0.5) * 100;
    const y = (Math.sin(i * 37.3 + 2) * 0.5 + 0.5) * 70;
    const t = 1 + (Math.sin(i * 13.1) * 0.5 + 0.5) * 2.2;
    const d = (Math.sin(i * 7.7) * 0.5 + 0.5) * 4;
    return `<i style="left:${x.toFixed(1)}%;top:${y.toFixed(1)}%;--t:${(2.4 + d).toFixed(1)}s;--d:-${d.toFixed(1)}s;width:${t.toFixed(1)}px;height:${t.toFixed(1)}px"></i>`;
  }).join('');
  return `<div class="dormir-ceu" aria-hidden="true"><div class="dormir-estrelas">${estrelas}</div><div class="dormir-lua"></div><div class="dormir-nuvem um"></div><div class="dormir-nuvem dois"></div></div>`;
}

function abrirHistoriasParaDormir() {
  if (typeof closeSidebar === 'function') closeSidebar();
  pararHistoriaParaDormir();
  mudarDeView('view-dormir');
  desenharEscolhaParaDormir();
  window.scrollTo({ top: 0, behavior: 'auto' });
}

function desenharEscolhaParaDormir() {
  const lugar = document.getElementById('dormir-conteudo');
  if (!lugar) return;
  const santos = santosParaDormir();
  const foto = (santo) => (typeof enderecoDaFotoDoSanto === 'function' ? enderecoDaFotoDoSanto(santo.id) : '');
  lugar.className = 'dormir-tela escolha';
  lugar.innerHTML = `${ceuDoDormir()}
    <div class="dormir-miolo">
      <button class="btn-back dormir-voltar"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg><span>${escaparDoDormir(trDoDormir('Voltar para o início'))}</span></button>
      <header class="dormir-topo">
        <div class="dormir-lumi lumi" data-estado="dormindo" data-rosto="sono" data-bracos="baixo">${typeof desenhoDaLumi === 'function' ? desenhoDaLumi() : ''}</div>
        <h2>${escaparDoDormir(trDoDormir('Histórias para dormir'))}</h2>
        <p>${escaparDoDormir(trDoDormir('Escolha um santo. A Lumi conta a história bem baixinho, e a tela vai escurecendo devagar.'))}</p>
        ${vozDisponivelParaDormir() ? '' : `<p class="dormir-sem-voz">${escaparDoDormir(trDoDormir('Este aparelho não tem voz para ler. A história aparece na tela para alguém ler para você.'))}</p>`}
      </header>
      <div class="dormir-opcoes" role="group" aria-label="${escaparDoDormir(trDoDormir('Apagar a tela'))}">
        <span>${escaparDoDormir(trDoDormir('Apagar a tela'))}</span>
        ${[['fim', trDoDormir('Quando a história acabar')], ['10', trDoDormir('Em 10 minutos')], ['20', trDoDormir('Em 20 minutos')]].map(([valor, rotulo]) => `<button type="button" class="dormir-opcao${estadoDoDormir.timer === valor ? ' ativa' : ''}" data-timer="${valor}">${escaparDoDormir(rotulo)}</button>`).join('')}
      </div>
      <button type="button" class="dormir-surpresa" data-santo-dormir="surpresa">${escaparDoDormir(trDoDormir('Me surpreenda!'))}</button>
      <div class="dormir-santos">${santos.map((santo) => `<button type="button" class="dormir-santo" data-santo-dormir="${santo.id}"><span class="dormir-santo-foto"${foto(santo) ? ` style="background-image:url('${escaparDoDormir(foto(santo))}')"` : ''}></span><span class="dormir-santo-nome" translate="no">${escaparDoDormir(nomeDoSantoParaDormir(santo))}</span></button>`).join('')}</div>
    </div>`;
  lugar.querySelector('.dormir-voltar').addEventListener('click', () => { pararHistoriaParaDormir(); mudarDeView('view-home'); });
  lugar.querySelectorAll('[data-timer]').forEach((botao) => botao.addEventListener('click', () => {
    estadoDoDormir.timer = botao.dataset.timer;
    lugar.querySelectorAll('[data-timer]').forEach((b) => b.classList.toggle('ativa', b === botao));
  }));
  lugar.querySelectorAll('[data-santo-dormir]').forEach((botao) => botao.addEventListener('click', () => {
    let id = botao.dataset.santoDormir;
    if (id === 'surpresa') id = santos[Math.floor(Math.random() * santos.length)].id;
    comecarHistoriaParaDormir(id);
  }));
}

function partesDaHistoria(html) {
  const caixa = document.createElement('div');
  caixa.innerHTML = html;
  const partes = [];
  caixa.querySelectorAll('h3, p').forEach((el) => {
    const texto = el.textContent.replace(/\s+/g, ' ').trim();
    if (texto) partes.push({ titulo: el.tagName === 'H3', texto });
  });
  return partes;
}

async function comecarHistoriaParaDormir(id) {
  const santo = santosData.find((s) => s.id === id);
  if (!santo) return;
  pararHistoriaParaDormir();
  const lugar = document.getElementById('dormir-conteudo');
  if (!lugar) return;
  lugar.className = 'dormir-tela contando';
  lugar.innerHTML = `${ceuDoDormir()}<div class="dormir-miolo"><p class="dormir-carregando">${escaparDoDormir(trDoDormir('Preparando a história...'))}</p></div>`;
  const historias = typeof carregarHistoriasDosSantos === 'function' ? await carregarHistoriasDosSantos(idiomaDoDormir()) : {};
  const html = (historias && historias[id]) || santo.texto || '';
  const oracao = typeof BIBLIOTECA_DE_ORACOES !== 'undefined' ? BIBLIOTECA_DE_ORACOES.find((o) => o.id === 'santo-anjo') : null;
  const i = { pt: 0, en: 1, es: 2 }[idiomaDoDormir()];
  estadoDoDormir.santo = santo;
  estadoDoDormir.partes = partesDaHistoria(html);
  estadoDoDormir.partes.unshift({ titulo: true, texto: nomeDoSantoParaDormir(santo) });
  estadoDoDormir.partes.push({ fim: true, texto: trDoDormir('Boa noite! Que o seu anjo da guarda cuide de você esta noite.') });
  if (oracao) estadoDoDormir.partes.push({ oracao: true, texto: oracao.x[i] || oracao.x[0] });
  estadoDoDormir.atual = 0;
  estadoDoDormir.terminou = false;
  if (estadoDoDormir.timer !== 'fim') estadoDoDormir.apagarEm = Date.now() + Number(estadoDoDormir.timer) * 60000;
  else estadoDoDormir.apagarEm = null;
  estadoDoDormir.tocando = vozDisponivelParaDormir();
  desenharHistoriaParaDormir();
  if (estadoDoDormir.tocando) falarParteParaDormir();
  estadoDoDormir.relogio = setInterval(cuidarDoTempoParaDormir, 1000);
}

function desenharHistoriaParaDormir() {
  const lugar = document.getElementById('dormir-conteudo');
  if (!lugar || !estadoDoDormir.santo) return;
  const santo = estadoDoDormir.santo;
  const foto = typeof enderecoDaFotoDoSanto === 'function' ? enderecoDaFotoDoSanto(santo.id) : '';
  lugar.className = 'dormir-tela contando';
  lugar.innerHTML = `${ceuDoDormir()}
    <div class="dormir-escuro" aria-hidden="true"></div>
    <div class="dormir-miolo">
      <div class="dormir-cabeca">
        <span class="dormir-santo-foto grande"${foto ? ` style="background-image:url('${escaparDoDormir(foto)}')"` : ''}></span>
        <div class="dormir-lumi lumi pequena" data-estado="dormindo" data-rosto="sono" data-bracos="baixo">${typeof desenhoDaLumi === 'function' ? desenhoDaLumi() : ''}</div>
      </div>
      <div class="dormir-texto" id="dormir-texto">${estadoDoDormir.partes.map((parte, k) => `<p class="dormir-parte${parte.titulo ? ' titulo' : ''}${parte.fim ? ' fim' : ''}${parte.oracao ? ' oracao' : ''}${k === estadoDoDormir.atual ? ' atual' : ''}" data-parte="${k}"${parte.titulo && k === 0 ? ' translate="no"' : ''}>${escaparDoDormir(parte.texto)}</p>`).join('')}</div>
      <div class="dormir-controles">
        ${vozDisponivelParaDormir() ? `<button type="button" class="dormir-botao" data-dormir="anterior" aria-label="${escaparDoDormir(trDoDormir('Voltar um pedaço'))}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 5h2v14H6zM20 5v14L9 12z"/></svg></button>
        <button type="button" class="dormir-botao principal" data-dormir="tocar" aria-label="${escaparDoDormir(estadoDoDormir.tocando ? trDoDormir('Pausar') : trDoDormir('Continuar'))}">${estadoDoDormir.tocando ? '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 5h4v14H7zM13 5h4v14h-4z"/></svg>' : '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>'}</button>
        <button type="button" class="dormir-botao" data-dormir="proximo" aria-label="${escaparDoDormir(trDoDormir('Pular um pedaço'))}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M16 5h2v14h-2zM4 5v14l11-7z"/></svg></button>` : ''}
        <button type="button" class="dormir-botao texto" data-dormir="parar">${escaparDoDormir(trDoDormir('Outra história'))}</button>
      </div>
    </div>`;
  lugar.querySelectorAll('[data-dormir]').forEach((botao) => botao.addEventListener('click', () => {
    const acao = botao.dataset.dormir;
    if (acao === 'parar') { pararHistoriaParaDormir(); desenharEscolhaParaDormir(); return; }
    if (acao === 'tocar') {
      if (estadoDoDormir.tocando) { estadoDoDormir.tocando = false; if (window.speechSynthesis) window.speechSynthesis.cancel(); }
      else { estadoDoDormir.tocando = true; if (estadoDoDormir.terminou) { estadoDoDormir.atual = 0; estadoDoDormir.terminou = false; } falarParteParaDormir(); }
      desenharHistoriaParaDormir();
      return;
    }
    const passo = acao === 'proximo' ? 1 : -1;
    estadoDoDormir.atual = Math.max(0, Math.min(estadoDoDormir.partes.length - 1, estadoDoDormir.atual + passo));
    if (window.speechSynthesis) window.speechSynthesis.cancel();
    marcarParteParaDormir();
    if (estadoDoDormir.tocando) setTimeout(falarParteParaDormir, 80);
  }));
  lugar.querySelector('.dormir-escuro').addEventListener('click', acordarDaHistoria);
  marcarParteParaDormir();
}

function marcarParteParaDormir() {
  const lugar = document.getElementById('dormir-texto');
  if (!lugar) return;
  lugar.querySelectorAll('.dormir-parte').forEach((p) => p.classList.toggle('atual', Number(p.dataset.parte) === estadoDoDormir.atual));
  const atual = lugar.querySelector('.dormir-parte.atual');
  if (atual) {
    const alvo = atual.offsetTop - lugar.clientHeight * 0.35;
    lugar.scrollTo({ top: Math.max(0, alvo), behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  }
}

function frasesDaParte(texto) {
  const frases = String(texto).match(/[^.!?;:]+[.!?;:]*\s*/g) || [texto];
  const juntas = [];
  frases.forEach((frase) => {
    const ultima = juntas[juntas.length - 1];
    if (ultima && (ultima + frase).length < 180) juntas[juntas.length - 1] = ultima + frase;
    else juntas.push(frase);
  });
  return juntas.map((f) => f.trim()).filter(Boolean);
}

function falarParteParaDormir() {
  if (!estadoDoDormir.tocando || !vozDisponivelParaDormir()) return;
  const parte = estadoDoDormir.partes[estadoDoDormir.atual];
  if (!parte) { terminarHistoriaParaDormir(); return; }
  marcarParteParaDormir();
  const frases = frasesDaParte(parte.texto);
  const deQuem = estadoDoDormir.atual;
  let k = 0;
  const proxima = () => {
    if (!estadoDoDormir.tocando || deQuem !== estadoDoDormir.atual) return;
    if (k >= frases.length) {
      estadoDoDormir.atual += 1;
      if (estadoDoDormir.atual >= estadoDoDormir.partes.length) { terminarHistoriaParaDormir(); return; }
      setTimeout(falarParteParaDormir, parte.titulo ? 700 : 450);
      return;
    }
    const fala = new SpeechSynthesisUtterance(frases[k]);
    k += 1;
    fala.lang = { pt: 'pt-BR', en: 'en-US', es: 'es-ES' }[idiomaDoDormir()];
    const voz = typeof escolherVozFeminina === 'function' ? escolherVozFeminina() : null;
    if (voz) fala.voice = voz;
    fala.rate = 0.84;
    fala.pitch = 1.04;
    fala.volume = 0.9;
    fala.onend = () => setTimeout(proxima, 120);
    fala.onerror = () => setTimeout(proxima, 120);
    window.speechSynthesis.speak(fala);
  };
  proxima();
}

function terminarHistoriaParaDormir() {
  estadoDoDormir.tocando = false;
  estadoDoDormir.terminou = true;
  estadoDoDormir.atual = estadoDoDormir.partes.length - 1;
  desenharHistoriaParaDormir();
  if (estadoDoDormir.timer === 'fim') setTimeout(apagarTelaParaDormir, 4000);
}

function apagarTelaParaDormir() {
  const tela = document.querySelector('#dormir-conteudo.contando');
  if (tela) tela.classList.add('apagada');
}

function acordarDaHistoria() {
  const tela = document.querySelector('#dormir-conteudo.contando');
  if (tela) tela.classList.remove('apagada');
}

function cuidarDoTempoParaDormir() {
  const tela = document.querySelector('#dormir-conteudo.contando');
  if (!tela) return;
  const total = Math.max(1, estadoDoDormir.partes.length - 1);
  const progresso = estadoDoDormir.atual / total;
  tela.style.setProperty('--escurecer', (0.15 + progresso * 0.45).toFixed(2));
  if (estadoDoDormir.apagarEm && Date.now() >= estadoDoDormir.apagarEm) {
    estadoDoDormir.apagarEm = null;
    estadoDoDormir.tocando = false;
    if (window.speechSynthesis) window.speechSynthesis.cancel();
    apagarTelaParaDormir();
  }
}

function pararHistoriaParaDormir() {
  estadoDoDormir.tocando = false;
  if (estadoDoDormir.relogio) clearInterval(estadoDoDormir.relogio);
  estadoDoDormir.relogio = null;
  if (window.speechSynthesis) window.speechSynthesis.cancel();
}

function iniciarHistoriasParaDormir() {
  const nav = document.getElementById('nav-dormir');
  if (nav) nav.addEventListener('click', abrirHistoriasParaDormir);
  const atalho = document.getElementById('atalho-dormir');
  if (atalho) atalho.addEventListener('click', abrirHistoriasParaDormir);
  document.addEventListener('lumina-idioma', () => {
    const view = document.getElementById('view-dormir');
    if (view && view.classList.contains('active') && !estadoDoDormir.tocando) desenharEscolhaParaDormir();
  });
}

document.addEventListener('DOMContentLoaded', () => {
  if (typeof rodarComSeguranca === 'function') rodarComSeguranca('dormir', iniciarHistoriasParaDormir);
  else iniciarHistoriasParaDormir();
});
