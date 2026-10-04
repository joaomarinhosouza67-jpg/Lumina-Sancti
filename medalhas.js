const ESTILO_DAS_MEDALHAS = {
  'carlo-acutis': { cor: '#22c55e', forma: 'sol', emblema: 'hostia' },
  'francisco-assis': { cor: '#b7791f', forma: 'circulo', emblema: 'tau' },
  'jose': { cor: '#3b82f6', forma: 'escudo', emblema: 'lirio' },
  'teresinha': { cor: '#ec4899', forma: 'flor', emblema: 'rosa' },
  'antonio-padua': { cor: '#a16207', forma: 'circulo', emblema: 'livro' },
  'padre-pio': { cor: '#7c3aed', forma: 'escudo', emblema: 'cruz' },
  'nossa-senhora': { cor: '#60a5fa', forma: 'flor', emblema: 'estrela' },
  'bento-nursia': { cor: '#0f766e', forma: 'hexagono', emblema: 'cruz-bento' },
  'clara-assis': { cor: '#f59e0b', forma: 'sol', emblema: 'lirio' },
  'joao-paulo-ii': { cor: '#dc2626', forma: 'estrela', emblema: 'escudo' },
  'rita-cassia': { cor: '#be185d', forma: 'hexagono', emblema: 'rosa' },
  'judas-tadeu': { cor: '#16a34a', forma: 'circulo', emblema: 'ancora' },
  'teresa-avila': { cor: '#9333ea', forma: 'estrela', emblema: 'pomba' },
  'dulce-pobres': { cor: '#0ea5e9', forma: 'flor', emblema: 'coracao' },
  'joao-bosco': { cor: '#ea580c', forma: 'estrela', emblema: 'sol' },
  'teresa-calcuta': { cor: '#1d4ed8', forma: 'hexagono', emblema: 'coracao-maos' },
  'maximiliano-kolbe': { cor: '#6366f1', forma: 'escudo', emblema: 'coroa' },
  'faustina': { cor: '#e11d48', forma: 'sol', emblema: 'raios' },
  'sebastiao': { cor: '#b91c1c', forma: 'escudo', emblema: 'flechas' },
  'monica': { cor: '#ca8a04', forma: 'circulo', emblema: 'ampulheta' },
};

const APELIDOS_DAS_TRILHAS = {
  'santo-francisco': 'francisco-assis',
  'santo-jose': 'jose',
  'santa-teresinha': 'teresinha',
  'santo-antonio': 'antonio-padua',
  'sao-bento': 'bento-nursia',
  'santa-clara': 'clara-assis',
  'santa-rita': 'rita-cassia',
  'sao-judas': 'judas-tadeu',
  'santa-dulce': 'dulce-pobres',
  'dom-bosco': 'joao-bosco',
  'madre-teresa': 'teresa-calcuta',
  'sao-maximiliano': 'maximiliano-kolbe',
  'santa-faustina': 'faustina',
  'sao-sebastiao': 'sebastiao',
  'santa-monica': 'monica',
};

const SIGNIFICADO_DAS_MEDALHAS = {
  pt: {
    'carlo-acutis': 'Amor à Eucaristia: ter Jesus na Missa e no sacrário como o centro do dia.',
    'francisco-assis': 'Pobreza: viver com o necessário e encontrar a alegria em Deus, não nas coisas.',
    'jose': 'Fidelidade: cuidar em silêncio de quem Deus nos confiou, todos os dias.',
    'teresinha': 'Confiança: o pequeno caminho de quem se entrega a Deus como uma criança.',
    'antonio-padua': 'Sabedoria: conhecer a Palavra de Deus e anunciá-la com amor.',
    'padre-pio': 'Penitência: oferecer os sofrimentos com Jesus pela salvação das almas.',
    'nossa-senhora': 'Humildade: dizer sim a Deus, como Maria, sem procurar o próprio brilho.',
    'bento-nursia': 'Ordem: rezar e trabalhar, dando a Deus o primeiro lugar em cada hora.',
    'clara-assis': 'Pureza: um coração simples e limpo, que só quer agradar a Deus.',
    'joao-paulo-ii': 'Coragem: abrir as portas a Cristo, sem ter medo.',
    'rita-cassia': 'Perseverança: não desistir, nem diante do que parece impossível.',
    'judas-tadeu': 'Esperança: confiar em Deus mesmo nas causas mais difíceis.',
    'teresa-avila': 'Oração: conversar com Deus como quem fala com um amigo.',
    'dulce-pobres': 'Caridade: servir os pobres e os doentes como se fossem o próprio Jesus.',
    'joao-bosco': 'Alegria: a santidade que sorri, brinca e faz o bem.',
    'teresa-calcuta': 'Compaixão: sentir a dor dos outros e fazer pequenas coisas com grande amor.',
    'maximiliano-kolbe': 'Doação: dar a própria vida por amor ao próximo.',
    'faustina': 'Misericórdia: confiar no amor de Jesus que perdoa e perdoar também.',
    'sebastiao': 'Fortaleza: permanecer firme na fé, mesmo quando é difícil.',
    'monica': 'Paciência: rezar sem desistir e esperar a hora de Deus.',
  },
  en: {
    'carlo-acutis': 'Love for the Eucharist: making Jesus in the Mass and the tabernacle the center of each day.',
    'francisco-assis': 'Poverty: living with what is needed and finding joy in God, not in things.',
    'jose': 'Faithfulness: quietly caring, every day, for those God has entrusted to us.',
    'teresinha': 'Trust: the little way of those who give themselves to God like a child.',
    'antonio-padua': 'Wisdom: knowing the Word of God and proclaiming it with love.',
    'padre-pio': 'Penance: offering our sufferings with Jesus for the salvation of souls.',
    'nossa-senhora': 'Humility: saying yes to God, like Mary, without seeking our own glory.',
    'bento-nursia': 'Order: praying and working, giving God first place in every hour.',
    'clara-assis': 'Purity: a simple, clean heart that only wants to please God.',
    'joao-paulo-ii': 'Courage: opening the doors to Christ without being afraid.',
    'rita-cassia': 'Perseverance: never giving up, even in the face of the impossible.',
    'judas-tadeu': 'Hope: trusting God even in the most difficult causes.',
    'teresa-avila': 'Prayer: talking with God the way we talk with a friend.',
    'dulce-pobres': 'Charity: serving the poor and the sick as if they were Jesus himself.',
    'joao-bosco': 'Joy: holiness that smiles, plays and does good.',
    'teresa-calcuta': 'Compassion: feeling the pain of others and doing small things with great love.',
    'maximiliano-kolbe': 'Self-giving: laying down one\'s life out of love for others.',
    'faustina': 'Mercy: trusting in the forgiving love of Jesus and forgiving others too.',
    'sebastiao': 'Fortitude: standing firm in the faith, even when it is hard.',
    'monica': 'Patience: praying without giving up and waiting for God\'s time.',
  },
  es: {
    'carlo-acutis': 'Amor a la Eucaristía: tener a Jesús en la Misa y en el sagrario como el centro del día.',
    'francisco-assis': 'Pobreza: vivir con lo necesario y encontrar la alegría en Dios, no en las cosas.',
    'jose': 'Fidelidad: cuidar en silencio, cada día, a quienes Dios nos confió.',
    'teresinha': 'Confianza: el caminito de quien se entrega a Dios como un niño.',
    'antonio-padua': 'Sabiduría: conocer la Palabra de Dios y anunciarla con amor.',
    'padre-pio': 'Penitencia: ofrecer los sufrimientos con Jesús por la salvación de las almas.',
    'nossa-senhora': 'Humildad: decir sí a Dios, como María, sin buscar el propio brillo.',
    'bento-nursia': 'Orden: rezar y trabajar, dando a Dios el primer lugar en cada hora.',
    'clara-assis': 'Pureza: un corazón sencillo y limpio que solo quiere agradar a Dios.',
    'joao-paulo-ii': 'Valentía: abrir las puertas a Cristo, sin tener miedo.',
    'rita-cassia': 'Perseverancia: no rendirse, ni ante lo que parece imposible.',
    'judas-tadeu': 'Esperanza: confiar en Dios incluso en las causas más difíciles.',
    'teresa-avila': 'Oración: hablar con Dios como quien habla con un amigo.',
    'dulce-pobres': 'Caridad: servir a los pobres y enfermos como si fueran el mismo Jesús.',
    'joao-bosco': 'Alegría: la santidad que sonríe, juega y hace el bien.',
    'teresa-calcuta': 'Compasión: sentir el dolor de los demás y hacer cosas pequeñas con gran amor.',
    'maximiliano-kolbe': 'Entrega: dar la propia vida por amor al prójimo.',
    'faustina': 'Misericordia: confiar en el amor de Jesús que perdona y perdonar también.',
    'sebastiao': 'Fortaleza: mantenerse firme en la fe, aunque sea difícil.',
    'monica': 'Paciencia: rezar sin rendirse y esperar la hora de Dios.',
  },
};

const EMBLEMAS_DAS_MEDALHAS = {
  hostia: '<circle cx="12" cy="9" r="4.2"/><path d="M12 7v4M10 9h4"/><path d="M12 13.2V20M8.5 20.5h7"/><path d="M12 1.8v1.6M5.6 3.6l1.1 1.1M18.4 3.6l-1.1 1.1M3.4 9h1.6M19 9h1.6"/>',
  tau: '<path d="M4.5 4.5h15v3.2h-5.6V20h-3.8V7.7H4.5z"/>',
  lirio: '<path d="M12 21v-9"/><path d="M12 12c-3-1-5.2-3.8-5.2-7.2 2.2 0 4.2 1.2 5.2 3 1-1.8 3-3 5.2-3 0 3.4-2.2 6.2-5.2 7.2z"/><path d="M12 16.2c-1.7-1.2-3.6-1.3-5-.6M12 16.2c1.7-1.2 3.6-1.3 5-.6"/>',
  rosa: '<path d="M12 4.5c-2.8 0-4.8 2-4.8 4.4 0 2.6 2.1 4.6 4.8 4.6s4.8-2 4.8-4.6c0-2.4-2-4.4-4.8-4.4z"/><path d="M12 6.8c-1.2 0-2 .9-2 2s.9 2 2 2 2-.9 2-2"/><path d="M12 13.5V21"/><path d="M12 17.5c-1.6-.1-2.9-1-3.6-2.3M12 16.6c1.5 0 2.7-.8 3.4-2"/>',
  livro: '<use href="#icone-livro"/>',
  cruz: '<use href="#icone-cruz"/>',
  estrela: '<use href="#icone-estrela"/>',
  pomba: '<use href="#icone-pomba"/>',
  coracao: '<use href="#icone-coracao"/>',
  terco: '<use href="#icone-terco"/>',
  escudo: '<use href="#icone-escudo"/>',
  'cruz-bento': '<circle cx="12" cy="12" r="8.5"/><path d="M12 5v14M5 12h14"/><path d="M9.5 5.6h5M9.5 18.4h5M5.6 9.5v5M18.4 9.5v5"/>',
  ancora: '<circle cx="12" cy="4.8" r="2"/><path d="M12 6.8V21"/><path d="M8.5 10h7"/><path d="M4.5 13.5a7.5 7.5 0 0 0 15 0"/><path d="M4.5 13.5 3 15M19.5 13.5 21 15"/>',
  sol: '<circle cx="12" cy="12" r="4.2"/><path d="M12 2.5v2.6M12 18.9v2.6M2.5 12h2.6M18.9 12h2.6M5.3 5.3l1.8 1.8M16.9 16.9l1.8 1.8M5.3 18.7l1.8-1.8M16.9 7.1l1.8-1.8"/>',
  coroa: '<path d="M3.5 17.5h17l-1.6-9.5-4.4 3.8L12 5l-2.5 6.8L5.1 8z"/><path d="M5 20.5h14"/>',
  raios: '<path d="M12 10s-3.4-2-3.4-4.4a1.8 1.8 0 0 1 3.4-.9 1.8 1.8 0 0 1 3.4.9C15.4 8 12 10 12 10z"/><path d="M10.8 11.6 6.2 21M13.2 11.6l4.6 9.4"/><path d="M11.2 14.6 9.4 21M12.8 14.6l1.8 6.4"/>',
  'coracao-maos': '<path d="M12 12.6s-4.3-2.6-4.3-5.5a2.3 2.3 0 0 1 4.3-1.2 2.3 2.3 0 0 1 4.3 1.2c0 2.9-4.3 5.5-4.3 5.5z"/><path d="M3.5 13.2c1.9 3.8 4.9 6.3 8.5 6.3s6.6-2.5 8.5-6.3"/>',
  flechas: '<path d="M5 19 19 5M19 5h-5.2M19 5v5.2"/><path d="M5 5l14 14M19 19h-5.2M19 19v-5.2"/>',
  ampulheta: '<path d="M6 3h12M6 21h12"/><path d="M7.5 3c0 5 4.5 6.2 4.5 9s-4.5 4-4.5 9M16.5 3c0 5-4.5 6.2-4.5 9s4.5 4 4.5 9"/><path d="M9.5 19.5h5"/>',
};

let contadorDeMedalhas = 0;

function chaveDaMedalha(trilha) {
  if (!trilha) return '';
  const base = trilha.santoId || trilha.slug || '';
  return APELIDOS_DAS_TRILHAS[base] || base;
}

function estiloDaMedalha(trilha) {
  const chave = chaveDaMedalha(trilha);
  const estilo = ESTILO_DAS_MEDALHAS[chave];
  if (estilo) return estilo;
  return { cor: (trilha && /^#[0-9a-f]{6}$/i.test(trilha.cor || '') ? trilha.cor : '#34d399'), forma: 'circulo', emblema: 'estrela' };
}

function corDaTrilha(trilha) {
  return estiloDaMedalha(trilha).cor;
}

function significadoDaMedalha(trilha, idioma) {
  const chave = chaveDaMedalha(trilha);
  const lista = SIGNIFICADO_DAS_MEDALHAS[idioma] || SIGNIFICADO_DAS_MEDALHAS.pt;
  return lista[chave] || SIGNIFICADO_DAS_MEDALHAS.pt[chave] || '';
}

function misturarCor(hex, alvo, quanto) {
  const de = hex.replace('#', '');
  const para = alvo.replace('#', '');
  const canal = (texto, i) => parseInt(texto.slice(i, i + 2), 16);
  const r = Math.round(canal(de, 0) + (canal(para, 0) - canal(de, 0)) * quanto);
  const g = Math.round(canal(de, 2) + (canal(para, 2) - canal(de, 2)) * quanto);
  const b = Math.round(canal(de, 4) + (canal(para, 4) - canal(de, 4)) * quanto);
  return '#' + [r, g, b].map((v) => v.toString(16).padStart(2, '0')).join('');
}

function pontosEmEstrela(cx, cy, pontas, externo, interno, giro) {
  const pontos = [];
  for (let i = 0; i < pontas * 2; i++) {
    const raio = i % 2 === 0 ? externo : interno;
    const angulo = (Math.PI / pontas) * i - Math.PI / 2 + (giro || 0);
    pontos.push(`${(cx + raio * Math.cos(angulo)).toFixed(2)},${(cy + raio * Math.sin(angulo)).toFixed(2)}`);
  }
  return pontos.join(' ');
}

function formaDaMedalha(forma, cx, cy) {
  if (forma === 'sol') return `<polygon points="${pontosEmEstrela(cx, cy, 16, 42, 34)}"/>`;
  if (forma === 'estrela') return `<polygon points="${pontosEmEstrela(cx, cy, 8, 43, 32, Math.PI / 8)}"/>`;
  if (forma === 'hexagono') return `<polygon points="${pontosEmEstrela(cx, cy, 3, 41, 41)}"/>`;
  if (forma === 'escudo') return `<path d="M${cx} ${cy - 40} L${cx + 35} ${cy - 29} C${cx + 35} ${cy + 6} ${cx + 21} ${cy + 28} ${cx} ${cy + 40} C${cx - 21} ${cy + 28} ${cx - 35} ${cy + 6} ${cx - 35} ${cy - 29} Z"/>`;
  if (forma === 'flor') {
    const petalas = [];
    for (let i = 0; i < 10; i++) {
      const angulo = (Math.PI * 2 * i) / 10;
      petalas.push(`<circle cx="${(cx + 31 * Math.cos(angulo)).toFixed(2)}" cy="${(cy + 31 * Math.sin(angulo)).toFixed(2)}" r="10.5"/>`);
    }
    return `<circle cx="${cx}" cy="${cy}" r="33"/>${petalas.join('')}`;
  }
  return `<circle cx="${cx}" cy="${cy}" r="39"/>`;
}

function medalhaSvg(trilha, opcoes) {
  const { conquistada = false, classe = '', titulo = '' } = opcoes || {};
  const estilo = estiloDaMedalha(trilha);
  const id = `medalha-${++contadorDeMedalhas}`;
  const cx = 60;
  const cy = 98;
  const cor = conquistada ? estilo.cor : '#475569';
  const corClara = misturarCor(cor, '#ffffff', conquistada ? 0.45 : 0.25);
  const corEscura = misturarCor(cor, '#000000', 0.45);
  const metal = conquistada
    ? '<stop offset="0" stop-color="#fffbe6"/><stop offset="0.3" stop-color="#facc15"/><stop offset="0.62" stop-color="#b7791f"/><stop offset="1" stop-color="#fde68a"/>'
    : '<stop offset="0" stop-color="#94a3b8"/><stop offset="0.55" stop-color="#475569"/><stop offset="1" stop-color="#64748b"/>';
  const forma = formaDaMedalha(estilo.forma, cx, cy);
  const emblema = EMBLEMAS_DAS_MEDALHAS[estilo.emblema] || EMBLEMAS_DAS_MEDALHAS.estrela;
  const corDoEmblema = conquistada ? '#ffffff' : '#94a3b8';
  return `
    <svg class="medalha-svg ${conquistada ? 'medalha-conquistada' : 'medalha-trancada'} ${classe}" viewBox="0 0 120 142" role="img" aria-label="${titulo}">
      <defs>
        <linearGradient id="${id}-metal" x1="0" y1="0" x2="1" y2="1">${metal}</linearGradient>
        <radialGradient id="${id}-disco" cx="0.38" cy="0.32" r="0.8"><stop offset="0" stop-color="${corClara}"/><stop offset="0.55" stop-color="${cor}"/><stop offset="1" stop-color="${corEscura}"/></radialGradient>
        <linearGradient id="${id}-fita" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${corEscura}"/><stop offset="1" stop-color="${cor}"/></linearGradient>
        <clipPath id="${id}-corte">${forma}</clipPath>
      </defs>
      <g class="medalha-fita">
        <polygon points="30,2 54,2 68,54 52,60" fill="url(#${id}-fita)"/>
        <polygon points="90,2 66,2 52,54 68,60" fill="url(#${id}-fita)"/>
        <path d="M42 2 L60 56 M78 2 L60 56" stroke="${corClara}" stroke-width="3" opacity="0.55"/>
      </g>
      <circle cx="60" cy="58" r="7" fill="url(#${id}-metal)" stroke="${corEscura}" stroke-width="1.2"/>
      <g class="medalha-corpo">
        <g fill="url(#${id}-metal)" stroke="${conquistada ? '#92400e' : '#334155'}" stroke-width="1.4">${forma}</g>
        <circle cx="${cx}" cy="${cy}" r="27" fill="url(#${id}-disco)" stroke="${conquistada ? '#fef3c7' : '#94a3b8'}" stroke-width="2.4"/>
        <circle cx="${cx}" cy="${cy}" r="22.5" fill="none" stroke="rgba(255,255,255,0.35)" stroke-width="1" stroke-dasharray="1.2 3"/>
        <svg x="${cx - 15}" y="${cy - 15}" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="${corDoEmblema}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="medalha-emblema">${emblema}</svg>
        ${conquistada ? `<g clip-path="url(#${id}-corte)"><g transform="rotate(24 60 98)"><rect class="medalha-reflexo" x="0" y="20" width="20" height="160" fill="rgba(255,255,255,0.5)"/></g></g>` : ''}
      </g>
    </svg>`;
}
