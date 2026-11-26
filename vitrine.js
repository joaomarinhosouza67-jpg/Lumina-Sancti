const TEXTOS_DA_VITRINE = {
  pt: {
    santoDoDia: 'Santo do dia', proximaFesta: 'Próxima festa', proximas: 'Próximas festas', festaEm: 'Festa em {data}', hoje: 'Hoje',
    trilha: 'Trilha com {n} missões', comecar: 'Começar a trilha', historia: 'Conhecer a história', anterior: 'Anterior', proximo: 'Próximo',
    conhecer: 'Santos para conhecer', padroeiros: 'Padroeiros para cada momento', jovens: 'Santos jovens', doutores: 'Doutores da Igreja',
    arcanjo: 'Arcanjo', doutor: 'Doutor da Igreja', jovem: 'Santo jovem', beato: 'Beato', familia: 'Sagrada Família', santo: 'Santo', santa: 'Santa',
    trabalho: 'Trabalho', estudos: 'Estudos', protecao: 'Proteção', televisao: 'Televisão', impossiveis: 'Causas impossíveis', perdidas: 'Coisas perdidas',
    desesperadas: 'Causas difíceis', viagens: 'Viagens', medicos: 'Médicos', animais: 'Animais', urgentes: 'Causas urgentes', visao: 'Olhos', maes: 'Mães',
    lavoura: 'Lavoura', internet: 'Internet',
  },
  en: {
    santoDoDia: 'Saint of the day', proximaFesta: 'Next feast', proximas: 'Upcoming feasts', festaEm: 'Feast on {data}', hoje: 'Today',
    trilha: 'Trail with {n} missions', comecar: 'Start the trail', historia: 'Read the story', anterior: 'Previous', proximo: 'Next',
    conhecer: 'Saints to meet', padroeiros: 'Patrons for every moment', jovens: 'Young saints', doutores: 'Doctors of the Church',
    arcanjo: 'Archangel', doutor: 'Doctor of the Church', jovem: 'Young saint', beato: 'Blessed', familia: 'Holy Family', santo: 'Saint', santa: 'Saint',
    trabalho: 'Work', estudos: 'Studies', protecao: 'Protection', televisao: 'Television', impossiveis: 'Impossible causes', perdidas: 'Lost things',
    desesperadas: 'Hard causes', viagens: 'Travel', medicos: 'Doctors', animais: 'Animals', urgentes: 'Urgent causes', visao: 'Eyes', maes: 'Mothers',
    lavoura: 'Farming', internet: 'Internet',
  },
  es: {
    santoDoDia: 'Santo del día', proximaFesta: 'Próxima fiesta', proximas: 'Próximas fiestas', festaEm: 'Fiesta el {data}', hoje: 'Hoy',
    trilha: 'Sendero con {n} misiones', comecar: 'Empezar el sendero', historia: 'Conocer la historia', anterior: 'Anterior', proximo: 'Siguiente',
    conhecer: 'Santos para conocer', padroeiros: 'Patronos para cada momento', jovens: 'Santos jóvenes', doutores: 'Doctores de la Iglesia',
    arcanjo: 'Arcángel', doutor: 'Doctor de la Iglesia', jovem: 'Santo joven', beato: 'Beato', familia: 'Sagrada Familia', santo: 'Santo', santa: 'Santa',
    trabalho: 'Trabajo', estudos: 'Estudios', protecao: 'Protección', televisao: 'Televisión', impossiveis: 'Causas imposibles', perdidas: 'Cosas perdidas',
    desesperadas: 'Causas difíciles', viagens: 'Viajes', medicos: 'Médicos', animais: 'Animales', urgentes: 'Causas urgentes', visao: 'Ojos', maes: 'Madres',
    lavoura: 'Campo', internet: 'Internet',
  },
};

const SANTOS_PARA_CONHECER = ['padre-pio', 'teresinha', 'francisco-assis', 'antonio-padua', 'rita-cassia', 'carlo-acutis', 'joana-darc', 'agostinho', 'jose', 'teresa-calcuta', 'joao-paulo-ii', 'miguel', 'dulce-pobres', 'maximiliano-kolbe', 'bernadete', 'faustina'];
const PADROEIROS_DA_VITRINE = [['jose', 'trabalho'], ['tomas-aquino', 'estudos'], ['bento-nursia', 'protecao'], ['rita-cassia', 'impossiveis'], ['antonio-padua', 'perdidas'], ['judas-tadeu', 'desesperadas'], ['expedito', 'urgentes'], ['cristovao', 'viagens'], ['cosme-damiao', 'medicos'], ['francisco-assis', 'animais'], ['santa-luzia', 'visao'], ['monica', 'maes'], ['clara-assis', 'televisao'], ['isidro-lavrador', 'lavoura'], ['carlo-acutis', 'internet']];

const vitrine = { slides: [], atual: 0, relogio: null, parado: false, montada: false, toqueX: null };

function textoDaVitrine(chave, valores) {
  const idioma = typeof idiomaAtual !== 'undefined' && TEXTOS_DA_VITRINE[idiomaAtual] ? idiomaAtual : 'pt';
  let texto = TEXTOS_DA_VITRINE[idioma][chave] || TEXTOS_DA_VITRINE.pt[chave] || chave;
  Object.entries(valores || {}).forEach(([k, v]) => { texto = texto.replace(`{${k}}`, v); });
  return texto;
}

function escaparDaVitrine(texto) {
  return String(texto == null ? '' : texto).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

const PINTURAS_GUARDADAS = new Set(["afonso-ligorio", "agostinho", "alberto-magno", "ambrosio", "andre-apostolo", "andre-bessette", "andre-dung-lac", "andre-kim-taegon", "angela-merici", "anjos-guarda", "antao-grande", "antonio-padua", "atanasio", "barbara", "barnabe-apostolo", "basilio-magno", "beda-veneravel", "bento-nursia", "bernadete", "bernardino-sena", "bernardo-claraval", "boaventura", "bonifacio", "brigida-suecia", "camilo-lelis", "carlo-acutis", "carlos-borromeu", "catarina-alexandria", "catarina-laboure", "catarina-sena", "cecilia", "charbel-makhlouf", "charles-foucauld", "cirilo-jerusalem", "cirilo-metodio", "clara-assis", "cornelio-cipriano", "cosme-damiao", "damiao-molokai", "domingos-gusmao", "domingos-savio", "dulce-pobres", "edith-stein", "edwiges", "estanislau", "estevao-protomartir", "expedito", "faustina", "fidelis-sigmaringen", "filipe-neri", "filipe-tiago", "frances-cabrini", "francisco-assis", "francisco-paula", "francisco-sales", "francisco-xavier", "frei-galvao", "gabriel", "gemma-galgani", "gerardo-majela", "gertrudes", "gianna-molla", "gregorio-magno", "grignion-montfort", "hilario-poitiers", "hildegarda", "inacio-loyola", "ines-roma", "ireneu-lyon", "isabel-ana-seton", "isabel-hungria", "isabel-portugal", "isidoro-sevilha", "isidro-lavrador", "jeronimo", "joana-darc", "joao-batista-lasalle", "joao-brebeuf", "joao-capistrano", "joao-crisostomo", "joao-da-cruz", "joao-de-britto", "joao-de-deus", "joao-henry-newman", "joao-maria-vianney", "joao-paulo-ii", "joao-xxiii", "joaquim-ana", "jorge", "josafat", "jose", "jose-anchieta", "jose-operario", "jose-sanchez-rio", "josefina-bakhita", "josemaria-escriva", "juan-diego", "judas-tadeu", "junipero-serra", "justino-martir", "kateri-tekakwitha", "laura-vicuna", "lourenco", "lourenco-brindes", "lucas-evangelista", "luis-gonzaga", "luis-ix-franca", "luis-orione", "madre-paulina", "marcos-evangelista", "margarida-maria-alacoque", "maria-goretti", "maria-madalena", "maria-mazzarello", "marta-maria-lazaro", "martin-porres", "martinho-tours", "mateus-apostolo", "matias-apostolo", "maximiliano-kolbe", "miguel", "miguel-pro", "monica", "nascimento-joao-batista", "nha-chica", "nuno-alvares", "oscar-romero", "padre-pio", "pastorinhos-fatima", "paulo-miki", "paulo-vi", "pedro-canisio", "pedro-claver", "pedro-damiao", "pedro-eymard", "pedro-paulo-apostolos", "perpetua-felicidade", "pier-giorgio", "pio-x", "policarpo", "rafael", "raimundo-penafort", "rita-cassia", "roberto-belarmino", "rosa-lima", "sagrada-familia", "santa-agueda", "santa-luzia", "sao-bras", "sao-bruno", "sao-januario", "sao-nicolau", "sao-patricio", "sebastiao", "solanus-casey", "tarcisio", "teresa-avila", "teresa-calcuta", "teresa-dos-andes", "teresinha", "tomas-aquino", "tomas-becket", "tomas-more", "tome-apostolo", "turibio-mogrovejo", "vicente-ferrer", "zita"]);

function fotoGuardadaDoSanto(id, grande) {
  if (!PINTURAS_GUARDADAS.has(id)) return fotoDeReservaDoSanto(id, grande);
  return grande ? `santos/grande/${id}.webp` : `santos/${id}.webp`;
}

function fotoDeReservaDoSanto(id, grande) {
  return typeof enderecoDaFotoDoSanto === 'function' ? enderecoDaFotoDoSanto(id, grande) || '' : '';
}

function imagemDaVitrine(id, grande, classe) {
  const reserva = fotoDeReservaDoSanto(id, grande);
  return `<img class="${classe}" src="${fotoGuardadaDoSanto(id, grande)}" alt="" loading="${grande ? 'eager' : 'lazy'}" decoding="async" data-reserva="${escaparDaVitrine(reserva)}">`;
}

function santoDaVitrine(id) {
  return typeof santosData !== 'undefined' ? santosData.find((s) => s.id === id) : null;
}

function rotuloDaCategoria(santo) {
  const c = Array.isArray(santo.categoria) ? santo.categoria : String(santo.categoria || '').split(',');
  if (c.includes('arcanjos')) return textoDaVitrine('arcanjo');
  if (c.includes('sagrada-familia')) return textoDaVitrine('familia');
  if (c.includes('doutores')) return textoDaVitrine('doutor');
  if (c.includes('beatos')) return textoDaVitrine('beato');
  if (c.includes('santos-jovens')) return textoDaVitrine('jovem');
  return /^Santa/.test(santo.nome || '') ? textoDaVitrine('santa') : textoDaVitrine('santo');
}

function dataDaFesta(santo) {
  if (!santo || !santo.festa) return null;
  const [mes, dia] = santo.festa.split('-').map(Number);
  if (!mes || !dia) return null;
  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);
  let quando = new Date(hoje.getFullYear(), mes - 1, dia);
  if (quando < hoje) quando = new Date(hoje.getFullYear() + 1, mes - 1, dia);
  return quando;
}

function textoDaFesta(santo) {
  const quando = dataDaFesta(santo);
  if (!quando) return '';
  const hoje = new Date();
  if (quando.toDateString() === hoje.toDateString()) return textoDaVitrine('hoje');
  const local = typeof localDoIdioma === 'function' ? localDoIdioma() : 'pt-BR';
  return textoDaVitrine('festaEm', { data: quando.toLocaleDateString(local, { day: 'numeric', month: 'long' }) });
}

function escolherSlidesDaVitrine() {
  if (typeof santosData === 'undefined') return [];
  const comFoto = santosData.filter((s) => typeof FOTOS_DOS_SANTOS === 'undefined' || FOTOS_DOS_SANTOS[s.id]);
  const deHoje = typeof getSantoDeHoje === 'function' ? getSantoDeHoje() : null;
  const proximos = comFoto.filter((s) => dataDaFesta(s)).sort((a, b) => dataDaFesta(a) - dataDaFesta(b));
  const lista = [];
  if (deHoje && comFoto.includes(deHoje)) lista.push({ santo: deHoje, selo: textoDaVitrine('santoDoDia') });
  proximos.forEach((s) => {
    if (lista.length >= 5 || lista.some((x) => x.santo.id === s.id)) return;
    lista.push({ santo: s, selo: textoDaVitrine('proximaFesta') });
  });
  return lista;
}

function trilhaDaVitrine(id) {
  try { return typeof trilhaDoSanto === 'function' ? trilhaDoSanto(id) : null; } catch (e) { return null; }
}

function htmlDoSlide(item, indice) {
  const santo = item.santo;
  const textos = typeof textoDoSanto === 'function' ? textoDoSanto(santo) : { nome: santo.nome, resumo: santo.resumo };
  const trilha = trilhaDaVitrine(santo.id);
  const meta = [`<b>${escaparDaVitrine(rotuloDaCategoria(santo))}</b>`];
  const festa = textoDaFesta(santo);
  if (festa) meta.push(`<span>${escaparDaVitrine(festa)}</span>`);
  if (trilha && trilha.licoes && trilha.licoes.length) meta.push(`<span>${escaparDaVitrine(textoDaVitrine('trilha', { n: trilha.licoes.length }))}</span>`);
  const botoes = [];
  if (trilha) botoes.push(`<button type="button" class="vit-botao vit-botao-ouro" data-vit-trilha="${escaparDaVitrine(trilha.slug)}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 4.5v15l12-7.5z" fill="currentColor"/></svg>${escaparDaVitrine(textoDaVitrine('comecar'))}</button>`);
  botoes.push(`<button type="button" class="vit-botao ${trilha ? 'vit-botao-vidro' : 'vit-botao-ouro'}" data-vit-santo="${escaparDaVitrine(santo.id)}">${escaparDaVitrine(textoDaVitrine('historia'))}</button>`);
  return `<article class="vit-slide${indice === 0 ? ' ativo' : ''}" data-indice="${indice}" aria-roledescription="slide" aria-hidden="${indice === 0 ? 'false' : 'true'}">
    <div class="vit-fundo">${imagemDaVitrine(santo.id, true, 'vit-fundo-img')}</div>
    <div class="vit-degrade"></div>
    <figure class="vit-quadro" data-vit-santo="${escaparDaVitrine(santo.id)}">${imagemDaVitrine(santo.id, true, 'vit-quadro-img')}</figure>
    <div class="vit-texto">
      <span class="vit-selo">${escaparDaVitrine(item.selo)}</span>
      <h2 class="vit-nome" translate="no">${escaparDaVitrine(textos.nome)}</h2>
      <div class="vit-meta">${meta.join('<i aria-hidden="true">·</i>')}</div>
      <p class="vit-resumo">${escaparDaVitrine(textos.resumo || '')}</p>
      <div class="vit-botoes">${botoes.join('')}</div>
    </div>
  </article>`;
}

function htmlDoPoster(id, selo, ordem) {
  const santo = santoDaVitrine(id);
  if (!santo) return '';
  const textos = typeof textoDoSanto === 'function' ? textoDoSanto(santo) : { nome: santo.nome };
  return `<button type="button" class="vit-poster" style="--i:${Number(ordem) || 0}" data-vit-santo="${escaparDaVitrine(id)}" aria-label="${escaparDaVitrine(textos.nome)}">
    ${imagemDaVitrine(id, false, 'vit-poster-img')}
    ${selo ? `<small class="vit-poster-selo">${escaparDaVitrine(selo)}</small>` : ''}
    <span class="vit-poster-nome" translate="no">${escaparDaVitrine(textos.nome)}</span>
  </button>`;
}

function htmlDaFileira(titulo, posters) {
  if (!posters.length) return '';
  return `<section class="vit-fileira">
    <h2 class="vit-fileira-titulo">${escaparDaVitrine(titulo)}</h2>
    <div class="vit-fileira-caixa">
      <button type="button" class="vit-seta vit-seta-esq" data-vit-rolar="-1" aria-label="${escaparDaVitrine(textoDaVitrine('anterior'))}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
      <div class="vit-trilho">${posters.join('')}</div>
      <button type="button" class="vit-seta vit-seta-dir" data-vit-rolar="1" aria-label="${escaparDaVitrine(textoDaVitrine('proximo'))}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
    </div>
  </section>`;
}

function idsDaCategoria(categoria, limite) {
  if (typeof santosData === 'undefined') return [];
  return santosData.filter((s) => {
    const c = Array.isArray(s.categoria) ? s.categoria : String(s.categoria || '').split(',');
    return c.includes(categoria) && (typeof FOTOS_DOS_SANTOS === 'undefined' || FOTOS_DOS_SANTOS[s.id]);
  }).slice(0, limite).map((s) => s.id);
}

function mostrarSlideDaVitrine(indice) {
  const palco = document.getElementById('vitrine-palco');
  if (!palco || !vitrine.slides.length) return;
  vitrine.atual = (indice + vitrine.slides.length) % vitrine.slides.length;
  palco.querySelectorAll('.vit-slide').forEach((el, i) => {
    const ativo = i === vitrine.atual;
    el.classList.toggle('ativo', ativo);
    el.setAttribute('aria-hidden', ativo ? 'false' : 'true');
    el.querySelectorAll('button').forEach((b) => { b.tabIndex = ativo ? 0 : -1; });
  });
  document.querySelectorAll('#vitrine-pontos button').forEach((b, i) => b.classList.toggle('ativo', i === vitrine.atual));
  agendarVitrine();
}

function agendarVitrine() {
  clearTimeout(vitrine.relogio);
  if (vitrine.parado || vitrine.slides.length < 2) return;
  vitrine.relogio = setTimeout(() => {
    const home = document.getElementById('view-home');
    if (document.hidden || !home || !home.classList.contains('active')) { agendarVitrine(); return; }
    mostrarSlideDaVitrine(vitrine.atual + 1);
  }, 7000);
}

function abrirSantoDaVitrine(id) {
  if (typeof showDetail === 'function') showDetail(id);
}

function abrirTrilhaDaVitrine(slug) {
  if (typeof abrirTrilhas === 'function') abrirTrilhas(slug);
  else if (typeof mudarDeView === 'function') mudarDeView('view-trilhas');
}

function trocarPelaReserva(evento) {
  const img = evento.target;
  if (!(img instanceof HTMLImageElement) || !img.closest('#vitrine, #vitrine-fileiras')) return;
  const reserva = img.dataset.reserva;
  if (reserva && !img.dataset.trocou) { img.dataset.trocou = '1'; img.src = reserva; return; }
  img.classList.add('sem-foto');
}

function montarVitrine() {
  const palco = document.getElementById('vitrine-palco');
  const pontos = document.getElementById('vitrine-pontos');
  const fileiras = document.getElementById('vitrine-fileiras');
  if (!palco || !fileiras || typeof santosData === 'undefined') return;
  vitrine.slides = escolherSlidesDaVitrine();
  palco.innerHTML = vitrine.slides.map(htmlDoSlide).join('');
  if (pontos) {
    pontos.innerHTML = vitrine.slides.length > 1 ? vitrine.slides.map((item, i) => `<button type="button" class="${i === 0 ? 'ativo' : ''}" data-vit-ponto="${i}" aria-label="${escaparDaVitrine(typeof textoDoSanto === 'function' ? textoDoSanto(item.santo).nome : item.santo.nome)}"></button>`).join('') : '';
  }
  vitrine.atual = 0;
  const jovens = idsDaCategoria('santos-jovens', 16);
  const doutores = idsDaCategoria('doutores', 16);
  fileiras.innerHTML = [
    htmlDaFileira(textoDaVitrine('conhecer'), SANTOS_PARA_CONHECER.map((id, i) => htmlDoPoster(id, '', i)).filter(Boolean)),
    htmlDaFileira(textoDaVitrine('padroeiros'), PADROEIROS_DA_VITRINE.map(([id, tag], i) => htmlDoPoster(id, textoDaVitrine(tag), i)).filter(Boolean)),
    htmlDaFileira(textoDaVitrine('jovens'), jovens.map((id, i) => htmlDoPoster(id, '', i)).filter(Boolean)),
    htmlDaFileira(textoDaVitrine('doutores'), doutores.map((id, i) => htmlDoPoster(id, '', i)).filter(Boolean)),
  ].join('');
  mostrarSlideDaVitrine(0);
  observarFileiras();
  if (!vitrine.montada) ligarVitrine();
  vitrine.montada = true;
}

function observarFileiras() {
  const fileiras = document.querySelectorAll('#vitrine-fileiras .vit-fileira');
  if (!('IntersectionObserver' in window)) { fileiras.forEach((f) => f.classList.add('visivel')); return; }
  const olho = new IntersectionObserver((entradas) => {
    entradas.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('visivel'); olho.unobserve(e.target); } });
  }, { rootMargin: '0px 0px -8% 0px' });
  fileiras.forEach((f) => olho.observe(f));
}

function ligarVitrine() {
  const caixa = document.getElementById('vitrine');
  const fileiras = document.getElementById('vitrine-fileiras');
  document.addEventListener('error', trocarPelaReserva, true);
  const cliques = (e) => {
    const trilha = e.target.closest('[data-vit-trilha]');
    if (trilha) { abrirTrilhaDaVitrine(trilha.dataset.vitTrilha); return; }
    const santo = e.target.closest('[data-vit-santo]');
    if (santo) { abrirSantoDaVitrine(santo.dataset.vitSanto); return; }
    const ponto = e.target.closest('[data-vit-ponto]');
    if (ponto) { mostrarSlideDaVitrine(Number(ponto.dataset.vitPonto)); return; }
    const seta = e.target.closest('[data-vit-mudar]');
    if (seta) { mostrarSlideDaVitrine(vitrine.atual + Number(seta.dataset.vitMudar)); return; }
    const rolar = e.target.closest('[data-vit-rolar]');
    if (rolar) {
      const trilho = rolar.parentElement.querySelector('.vit-trilho');
      if (trilho) trilho.scrollBy({ left: Number(rolar.dataset.vitRolar) * trilho.clientWidth * 0.85, behavior: 'smooth' });
    }
  };
  if (caixa) {
    caixa.addEventListener('click', cliques);
    caixa.addEventListener('mouseenter', () => { vitrine.parado = true; clearTimeout(vitrine.relogio); });
    caixa.addEventListener('mouseleave', () => { vitrine.parado = false; agendarVitrine(); });
    caixa.addEventListener('focusin', () => { vitrine.parado = true; clearTimeout(vitrine.relogio); });
    caixa.addEventListener('focusout', () => { vitrine.parado = false; agendarVitrine(); });
    caixa.addEventListener('touchstart', (e) => { vitrine.toqueX = e.touches[0].clientX; }, { passive: true });
    caixa.addEventListener('touchend', (e) => {
      if (vitrine.toqueX === null) return;
      const dx = e.changedTouches[0].clientX - vitrine.toqueX;
      vitrine.toqueX = null;
      if (Math.abs(dx) > 50) mostrarSlideDaVitrine(vitrine.atual + (dx < 0 ? 1 : -1));
    }, { passive: true });
    caixa.addEventListener('keydown', (e) => {
      if (e.target.closest('.vit-trilho')) return;
      if (e.key === 'ArrowRight') { mostrarSlideDaVitrine(vitrine.atual + 1); }
      if (e.key === 'ArrowLeft') { mostrarSlideDaVitrine(vitrine.atual - 1); }
    });
  }
  if (fileiras) fileiras.addEventListener('click', cliques);
  document.addEventListener('lumina-idioma', montarVitrine);
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => setTimeout(montarVitrine, 0));
else setTimeout(montarVitrine, 0);
