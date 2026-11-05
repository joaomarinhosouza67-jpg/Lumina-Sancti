let contadorDoAdvento = 0;
let dataDeTesteDoAdvento = null;
let diaAbertoNoAdvento = null;
let pecaQueChegou = null;

function textoDoAdvento(objeto) {
  if (!objeto) return '';
  if (typeof objeto === 'string') return typeof tr === 'function' ? tr(objeto) : objeto;
  const idioma = typeof idiomaAtual === 'string' ? idiomaAtual : 'pt';
  return objeto[idioma] || objeto.pt || '';
}

function trDoAdvento(texto, valores) {
  return typeof tr === 'function' ? tr(texto, valores) : String(texto).replace(/\{(\w+)\}/g, (_, chave) => (valores && valores[chave] !== undefined ? valores[chave] : ''));
}

function escaparDoAdvento(texto) {
  return String(texto || '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

function dataDoAdvento(texto) {
  const [a, m, d] = String(texto).split('-').map(Number);
  return new Date(a, m - 1, d);
}

function hojeDoAdvento() {
  if (dataDeTesteDoAdvento === null) {
    dataDeTesteDoAdvento = '';
    try {
      const pedido = new URLSearchParams(window.location.search).get('advento');
      if (pedido && /^\d{4}-\d{2}-\d{2}$/.test(pedido)) dataDeTesteDoAdvento = pedido;
    } catch (e) {
    }
  }
  if (dataDeTesteDoAdvento) return dataDoAdvento(dataDeTesteDoAdvento);
  const agora = new Date();
  return new Date(agora.getFullYear(), agora.getMonth(), agora.getDate());
}

function diasEntreNoAdvento(a, b) {
  return Math.round((b - a) / 86400000);
}

function indiceDeHojeNoAdvento() {
  return diasEntreNoAdvento(dataDoAdvento(ADVENTO_DO_ANO.inicio), hojeDoAdvento());
}

function temporadaDoAdvento() {
  const hoje = hojeDoAdvento();
  if (hoje < dataDoAdvento(ADVENTO_DO_ANO.mostrarDe) || hoje > dataDoAdvento(ADVENTO_DO_ANO.mostrarAte)) return 'fora';
  if (hoje < dataDoAdvento(ADVENTO_DO_ANO.inicio)) return 'antes';
  if (hoje <= dataDoAdvento(ADVENTO_DO_ANO.natal)) return 'advento';
  return 'natal';
}

function epifaniaLiberada() {
  return hojeDoAdvento() >= dataDoAdvento(ADVENTO_DO_ANO.epifania);
}

function chaveDoAdvento() {
  const perfil = typeof membroAtivo !== 'undefined' && membroAtivo && membroAtivo.id ? membroAtivo.id : 'aparelho';
  return `lumina-sancti-advento-${ADVENTO_DO_ANO.ano}-${perfil}`;
}

function estadoDoAdvento() {
  try {
    const salvo = JSON.parse(localStorage.getItem(chaveDoAdvento()) || '{}') || {};
    return { feitos: salvo.feitos || {}, epifania: !!salvo.epifania, cartaVista: !!salvo.cartaVista };
  } catch (e) {
    return { feitos: {}, epifania: false, cartaVista: false };
  }
}

function guardarEstadoDoAdvento(estado) {
  try { localStorage.setItem(chaveDoAdvento(), JSON.stringify(estado)); } catch (e) {
  }
}

function quantosDiasFeitosNoAdvento(estado) {
  return DIAS_DO_ADVENTO.filter((_, i) => estado.feitos[i]).length;
}

function ganhouCartaDeNatal(estado) {
  return quantosDiasFeitosNoAdvento(estado || estadoDoAdvento()) === DIAS_DO_ADVENTO.length;
}

function pecasVisiveisDoPresepio(estado) {
  const pecas = new Set();
  DIAS_DO_ADVENTO.forEach((dia, i) => { if (estado.feitos[i]) pecas.add(dia.peca); });
  if (estado.epifania) pecas.add('magos');
  return pecas;
}

function dataDoDiaDoAdvento(indice) {
  const data = dataDoAdvento(ADVENTO_DO_ANO.inicio);
  data.setDate(data.getDate() + indice);
  return data;
}

function localeDoAdvento() {
  const idioma = typeof idiomaAtual === 'string' ? idiomaAtual : 'pt';
  return idioma === 'en' ? 'en-US' : (idioma === 'es' ? 'es-ES' : 'pt-BR');
}

function dataEscritaDoAdvento(data, comSemana) {
  try {
    return new Intl.DateTimeFormat(localeDoAdvento(), comSemana ? { weekday: 'long', day: 'numeric', month: 'long' } : { day: 'numeric', month: 'long' }).format(data);
  } catch (e) {
    return data.toLocaleDateString();
  }
}

function mesCurtoDoAdvento(data) {
  try {
    return new Intl.DateTimeFormat(localeDoAdvento(), { month: 'short' }).format(data).replace('.', '');
  } catch (e) {
    return String(data.getMonth() + 1);
  }
}

function velasAcesasNoAdvento() {
  const indice = indiceDeHojeNoAdvento();
  if (indice < 0) return 0;
  if (indice >= DIAS_DO_ADVENTO.length - 1) return 5;
  return ADVENTO_DO_ANO.domingos.filter((d) => d <= indice).length;
}

function ruidoDoAdvento(i, semente) {
  const x = Math.sin(i * 127.1 + semente * 311.7) * 43758.5453;
  return x - Math.floor(x);
}

function velaDoAdvento(g, x, base, altura, cores, acesa, numero) {
  const topo = base - altura;
  return `<g class="adv-vela${acesa ? ' acesa' : ''}" data-vela="${numero}">
    ${acesa ? `<circle class="adv-vela-halo" cx="${x}" cy="${topo - 12}" r="34" fill="url(#${g}-halo)"/>` : ''}
    <rect x="${x - 9}" y="${topo}" width="18" height="${altura}" rx="2.5" fill="url(#${g}-vela-${numero})"/>
    <ellipse cx="${x}" cy="${topo}" rx="9" ry="3" fill="${cores[0]}"/>
    <path d="M${x - 9} ${topo + 1} q3 9 6 2 q2 13 5 4 q3 6 7 -4 v-2z" fill="${cores[0]}" opacity=".9"/>
    <rect x="${x - 6.5}" y="${topo + 6}" width="3" height="${altura - 12}" rx="1.5" fill="#fff" opacity=".22"/>
    <path d="M${x} ${topo - 1} v-6" stroke="#2b1d12" stroke-width="1.6" stroke-linecap="round"/>
    ${acesa ? `<g class="adv-chama"><path d="M${x} ${topo - 26} C${x + 7} ${topo - 15} ${x + 6} ${topo - 6} ${x} ${topo - 4} C${x - 6} ${topo - 6} ${x - 7} ${topo - 15} ${x} ${topo - 26}Z" fill="url(#${g}-chama)"/><path d="M${x} ${topo - 16} C${x + 3} ${topo - 11} ${x + 2.5} ${topo - 7} ${x} ${topo - 6} C${x - 2.5} ${topo - 7} ${x - 3} ${topo - 11} ${x} ${topo - 16}Z" fill="#fffbe8"/></g>` : ''}
  </g>`;
}

function coroaDoAdvento(acesas) {
  contadorDoAdvento += 1;
  const g = `adv${contadorDoAdvento}`;
  const roxa = ['#8a5cc2', '#6a3d9a', '#3f2061'];
  const rosa = ['#f4a8cb', '#de78a9', '#a2416f'];
  const branca = ['#fffdf6', '#efe6d4', '#c9bca2'];
  const centro = [130, 128];
  const raios = [100, 34];
  const ponto = (graus) => { const a = (graus * Math.PI) / 180; return [centro[0] + raios[0] * Math.cos(a), centro[1] + raios[1] * Math.sin(a)]; };
  const folhas = (de, ate) => {
    let html = '';
    const verdes = ['#1f6b3a', '#2e8b4e', '#17552d', '#3c9a5a', '#4caf6a', '#245f38'];
    let k = Math.round(de / 5);
    for (let graus = de; graus < ate; graus += 5, k += 1) {
      [[-1, 0.86], [0, 1], [1, 1.12]].forEach(([anel, fator], camada) => {
        const a = ((graus + camada * 2.5) * Math.PI) / 180;
        const x = centro[0] + raios[0] * fator * Math.cos(a) + (ruidoDoAdvento(k, 5 + camada) - 0.5) * 6;
        const y = centro[1] + raios[1] * fator * Math.sin(a) + anel * 3 + (ruidoDoAdvento(k, 7 + camada) - 0.5) * 4;
        const cor = verdes[(k + camada * 2) % verdes.length];
        const giro = graus + 90 + (ruidoDoAdvento(k, 3 + camada) - 0.5) * 70;
        html += `<ellipse cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" rx="${(10 + camada * 2).toFixed(0)}" ry="${(3.6 + camada * 0.5).toFixed(1)}" fill="${cor}" transform="rotate(${giro.toFixed(0)} ${x.toFixed(1)} ${y.toFixed(1)})"/>`;
      });
      if (k % 3 === 0) {
        const [x, y] = ponto(graus + 1.5);
        html += `<path d="M${(x - 6).toFixed(1)} ${(y - 2).toFixed(1)} l12 4" stroke="#6fcf8a" stroke-width="1" opacity=".55"/>`;
      }
      if (k % 6 === 0) {
        const [x, y] = ponto(graus + 2);
        html += `<circle cx="${(x + 2).toFixed(1)}" cy="${(y - 3).toFixed(1)}" r="3.4" fill="#c8202e"/><circle cx="${(x + 5).toFixed(1)}" cy="${(y - 1).toFixed(1)}" r="2.8" fill="#b01a28"/><circle cx="${(x + 1).toFixed(1)}" cy="${(y - 4).toFixed(1)}" r="1" fill="#fff" opacity=".7"/>`;
      }
    }
    return html;
  };
  const laco = (graus) => {
    const [x, y] = ponto(graus);
    return `<g transform="translate(${x.toFixed(1)} ${(y + 2).toFixed(1)})"><path d="M0 0 C-12 -10 -16 4 -2 2Z M0 0 C12 -10 16 4 2 2Z" fill="#b5172a" stroke="#7a0c1a" stroke-width=".8"/><path d="M-1 2 L-6 14 M1 2 L6 14" stroke="#b5172a" stroke-width="3" stroke-linecap="round"/><circle r="2.6" fill="#d9283c"/></g>`;
  };
  const posicoes = [118, 200, 285, 18];
  const cores = [roxa, roxa, rosa, roxa];
  const velas = posicoes.map((graus, i) => { const [x, y] = ponto(graus); return { x, y, i }; });
  const gradientes = [roxa, roxa, rosa, roxa, branca].map((c, i) => `<linearGradient id="${g}-vela-${i + 1}" x1="0" x2="1"><stop offset="0" stop-color="${c[2]}"/><stop offset=".35" stop-color="${c[1]}"/><stop offset=".7" stop-color="${c[0]}"/><stop offset="1" stop-color="${c[1]}"/></linearGradient>`).join('');
  const vela = (v) => velaDoAdvento(g, v.x, v.y + 2, 58, cores[v.i], acesas > v.i, v.i + 1);
  return `<svg class="adv-coroa" viewBox="0 0 260 190" role="img" aria-label="${escaparDoAdvento(trDoAdvento('Coroa do Advento'))}">
    <defs>${gradientes}
      <radialGradient id="${g}-halo"><stop offset="0" stop-color="#ffe7a0" stop-opacity=".75"/><stop offset="1" stop-color="#ffe7a0" stop-opacity="0"/></radialGradient>
      <radialGradient id="${g}-chama" cx="50%" cy="70%" r="60%"><stop offset="0" stop-color="#fff6c2"/><stop offset=".5" stop-color="#ffc23d"/><stop offset="1" stop-color="#ff6a1a"/></radialGradient>
      <radialGradient id="${g}-base" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#000" stop-opacity=".35"/><stop offset="1" stop-color="#000" stop-opacity="0"/></radialGradient>
    </defs>
    <ellipse cx="130" cy="140" rx="118" ry="40" fill="url(#${g}-base)"/>
    ${folhas(180, 360)}
    ${vela(velas[1])}${vela(velas[2])}
    ${velaDoAdvento(g, 130, 132, 74, branca, acesas >= 5, 5)}
    ${folhas(0, 180)}
    ${laco(62)}${laco(160)}
    ${vela(velas[0])}${vela(velas[3])}
  </svg>`;
}

function pessoaDoPresepio(o) {
  const s = o.escala || 1;
  const x = o.x;
  const base = o.base;
  const altura = (o.ajoelhada ? 40 : (o.sentada ? 38 : 58)) * s;
  const hy = base - altura + 7 * s;
  const largura = (o.ajoelhada ? 17 : 13) * s;
  const corpo = `M${x - largura} ${base} C${x - largura + 1 * s} ${base - 18 * s} ${x - 10 * s} ${hy + 14 * s} ${x - 6 * s} ${hy + 8 * s} L${x + 6 * s} ${hy + 8 * s} C${x + 10 * s} ${hy + 14 * s} ${x + largura - 1 * s} ${base - 18 * s} ${x + largura} ${base} Z`;
  const manto = o.manto ? `<path d="M${x - largura - 2 * s} ${base} C${x - largura - 2 * s} ${base - 22 * s} ${x - 12 * s} ${hy + 6 * s} ${x - 2 * s} ${hy - 7 * s} C${x + 6 * s} ${hy - 7 * s} ${x + 9 * s} ${hy + 2 * s} ${x + 9 * s} ${hy + 8 * s} C${x + 2 * s} ${hy + 18 * s} ${x - 2 * s} ${base - 14 * s} ${x + 2 * s} ${base} Z" fill="${o.manto}"/>` : '';
  const veu = o.veu ? `<path d="M${x - 8.5 * s} ${hy + 9 * s} C${x - 10 * s} ${hy - 4 * s} ${x - 6 * s} ${hy - 10 * s} ${x} ${hy - 10 * s} C${x + 6 * s} ${hy - 10 * s} ${x + 10 * s} ${hy - 4 * s} ${x + 8.5 * s} ${hy + 9 * s} C${x + 5 * s} ${hy + 4 * s} ${x - 5 * s} ${hy + 4 * s} ${x - 8.5 * s} ${hy + 9 * s} Z" fill="${o.veu}"/>` : '';
  const cabelo = o.cabelo ? `<path d="M${x - 6.6 * s} ${hy} C${x - 7 * s} ${hy - 8 * s} ${x + 7 * s} ${hy - 8 * s} ${x + 6.6 * s} ${hy} C${x + 4 * s} ${hy - 4 * s} ${x - 4 * s} ${hy - 4 * s} ${x - 6.6 * s} ${hy} Z" fill="${o.cabelo}"/>` : '';
  const barba = o.barba ? `<path d="M${x - 5.5 * s} ${hy + 1 * s} C${x - 5 * s} ${hy + 9 * s} ${x + 5 * s} ${hy + 9 * s} ${x + 5.5 * s} ${hy + 1 * s} C${x + 3 * s} ${hy + 4 * s} ${x - 3 * s} ${hy + 4 * s} ${x - 5.5 * s} ${hy + 1 * s} Z" fill="${o.barba}"/>` : '';
  const aureola = o.aureola ? `<circle cx="${x}" cy="${hy - 1 * s}" r="${11 * s}" fill="#ffe08a" opacity=".28"/><circle cx="${x}" cy="${hy - 1 * s}" r="${11 * s}" fill="none" stroke="#ffd25e" stroke-width="${1.4 * s}"/>` : '';
  const coroa = o.coroa ? `<path d="M${x - 6 * s} ${hy - 5 * s} L${x - 6 * s} ${hy - 11 * s} L${x - 3 * s} ${hy - 8 * s} L${x} ${hy - 13 * s} L${x + 3 * s} ${hy - 8 * s} L${x + 6 * s} ${hy - 11 * s} L${x + 6 * s} ${hy - 5 * s} Z" fill="#f2c35a" stroke="#8a6414" stroke-width=".6"/>` : '';
  const maos = `<ellipse cx="${x + (o.maosX || 2) * s}" cy="${hy + 19 * s}" rx="${3.2 * s}" ry="${2.6 * s}" fill="${o.pele || '#e9b98d'}"/>`;
  const cajado = o.cajado ? `<path d="M${x + 11 * s} ${base} L${x + 11 * s} ${hy - 6 * s} c0 -7 -8 -7 -8 -1" fill="none" stroke="#6b4423" stroke-width="${2.2 * s}" stroke-linecap="round"/>` : '';
  const cesto = o.cesto ? `<path d="M${x + 6 * s} ${hy + 22 * s} h${13 * s} l${-2 * s} ${8 * s} h${-9 * s}z" fill="#b8843f" stroke="#7a5420" stroke-width=".7"/><path d="M${x + 8 * s} ${hy + 22 * s} c0 -7 9 -7 9 0" fill="none" stroke="#7a5420" stroke-width="1.2"/><circle cx="${x + 10 * s}" cy="${hy + 21 * s}" r="${2 * s}" fill="#d63b3b"/><circle cx="${x + 14 * s}" cy="${hy + 21 * s}" r="${2 * s}" fill="#e7b23a"/>` : '';
  const flauta = o.flauta ? `<path d="M${x + 1 * s} ${hy + 6 * s} L${x + 15 * s} ${hy + 14 * s}" stroke="#c9a25f" stroke-width="${1.8 * s}" stroke-linecap="round"/>` : '';
  const presente = o.presente ? `<g transform="translate(${x + 4 * s} ${hy + 16 * s})"><rect x="0" y="0" width="${8 * s}" height="${6 * s}" rx="1" fill="${o.presente}" stroke="#7a5a12" stroke-width=".6"/><rect x="${-1 * s}" y="${-2 * s}" width="${10 * s}" height="${2.4 * s}" rx="1" fill="#f2c35a"/></g>` : '';
  const olhos = `<path d="M${x - 3 * s} ${hy + 0.5 * s} q1.2 1 2.4 0 M${x + 0.6 * s} ${hy + 0.5 * s} q1.2 1 2.4 0" stroke="#3b2618" stroke-width="${0.7 * s}" fill="none" stroke-linecap="round"/>`;
  return `${aureola}${o.veu && o.manto ? '' : manto}<path d="${corpo}" fill="${o.tunica}"/>${o.veu && o.manto ? manto : ''}<path d="${corpo}" fill="url(#${o.g}-sombra)"/>${veu}<circle cx="${x}" cy="${hy}" r="${6.5 * s}" fill="${o.pele || '#e9b98d'}"/>${cabelo}${barba}${olhos}${coroa}${maos}${cajado}${cesto}${flauta}${presente}`;
}

function ovelhaDoPresepio(x, y, s, virada) {
  const lado = virada ? -1 : 1;
  let la = '';
  [[-8, 0, 6], [-3, -3, 6.5], [3, -3, 6.5], [8, 0, 6], [0, 1, 7], [-5, 3, 5.5], [5, 3, 5.5]].forEach(([dx, dy, r]) => {
    la += `<circle cx="${x + dx * s * lado}" cy="${y + dy * s}" r="${r * s}" fill="#f3eee2"/>`;
  });
  return `<g class="adv-ovelha"><path d="M${x - 6 * s * lado} ${y + 5 * s} v${7 * s} M${x - 2 * s * lado} ${y + 6 * s} v${7 * s} M${x + 3 * s * lado} ${y + 6 * s} v${7 * s} M${x + 7 * s * lado} ${y + 5 * s} v${7 * s}" stroke="#3a3330" stroke-width="${1.8 * s}" stroke-linecap="round"/>${la}<circle cx="${x}" cy="${y}" r="${7 * s}" fill="url(#adv-la-sombra)" opacity=".5"/><ellipse cx="${x + 13 * s * lado}" cy="${y - 3 * s}" rx="${4.6 * s}" ry="${3.6 * s}" fill="#3a3330"/><ellipse cx="${x + 10.5 * s * lado}" cy="${y - 6 * s}" rx="${2.6 * s}" ry="${1.2 * s}" fill="#3a3330" transform="rotate(${-30 * lado} ${x + 10.5 * s * lado} ${y - 6 * s})"/><circle cx="${x + 14.5 * s * lado}" cy="${y - 4 * s}" r="${0.7 * s}" fill="#fff"/></g>`;
}

function pecasDoPresepio(g) {
  const estrelas = Array.from({ length: 46 }, (_, i) => `<circle class="adv-estrelinha" cx="${(ruidoDoAdvento(i, 1) * 520).toFixed(0)}" cy="${(ruidoDoAdvento(i, 2) * 150).toFixed(0)}" r="${(0.6 + ruidoDoAdvento(i, 3) * 1.3).toFixed(1)}" fill="#fff" opacity="${(0.4 + ruidoDoAdvento(i, 4) * 0.6).toFixed(2)}"/>`).join('');
  const sombra = (x, y, rx) => `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${(rx / 5).toFixed(1)}" fill="#000" opacity=".3"/>`;
  const p = (o) => pessoaDoPresepio(Object.assign({ g }, o));
  return {
    fundo: `<rect width="520" height="300" fill="url(#${g}-ceu)"/>${estrelas}<path d="M0 214 C70 186 140 196 210 206 C290 196 360 178 430 192 C470 198 500 196 520 190 V300 H0Z" fill="#141f4a"/><path d="M0 240 C90 228 170 236 260 238 C350 236 430 226 520 236 V300 H0Z" fill="url(#${g}-chao)"/>`,
    belem: `<g fill="#7d76a3">${[[24, 182, 26, 22], [50, 172, 22, 32], [74, 186, 30, 18], [104, 178, 20, 26], [126, 188, 26, 16]].map(([x, y, w, h]) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#8b84b2"/><rect x="${x}" y="${y}" width="${(w * 0.35).toFixed(0)}" height="${h}" fill="#6c6595"/><rect x="${x + w * 0.55}" y="${y + 5}" width="4" height="5" fill="#ffd66b"/>`).join('')}<path d="M50 172 a11 9 0 0 1 22 0Z" fill="#a39cc6"/><path d="M104 178 a10 8 0 0 1 20 0Z" fill="#a39cc6"/><rect x="58" y="176" width="4" height="6" fill="#ffd66b"/></g>`,
    ciprestes: `<path d="M150 236 C138 200 142 170 150 146 C158 170 162 200 150 236Z" fill="#163a2a"/><path d="M164 238 C156 214 158 194 164 178 C170 194 172 214 164 238Z" fill="#1d4a34"/><path d="M372 236 C360 204 364 176 372 152 C380 176 384 204 372 236Z" fill="#163a2a"/>`,
    palmeira: `<path d="M486 252 C482 220 484 190 492 160" fill="none" stroke="#6b4a2a" stroke-width="7" stroke-linecap="round"/><path d="M486 252 C482 220 484 190 492 160" fill="none" stroke="#8a6640" stroke-width="7" stroke-dasharray="2 5"/>${[[-60, 30], [-30, 34], [0, 30], [30, 32], [60, 30], [-90, 24], [95, 22]].map(([a, c]) => `<path d="M492 160 q${(Math.cos(((a - 90) * Math.PI) / 180) * c * 0.6).toFixed(1)} ${(Math.sin(((a - 90) * Math.PI) / 180) * c * 0.6 - 10).toFixed(1)} ${(Math.cos(((a - 90) * Math.PI) / 180) * c).toFixed(1)} ${(Math.sin(((a - 90) * Math.PI) / 180) * c + 8).toFixed(1)}" fill="none" stroke="#2f7d45" stroke-width="5" stroke-linecap="round"/>`).join('')}`,
    gruta: `<rect x="176" y="140" width="168" height="106" fill="#2e1d10"/>${Array.from({ length: 8 }, (_, i) => `<rect x="${178 + i * 21}" y="142" width="19" height="104" fill="${i % 2 ? '#3d2716' : '#36220f'}"/>`).join('')}<rect x="170" y="134" width="11" height="114" fill="url(#${g}-madeira)"/><rect x="339" y="134" width="11" height="114" fill="url(#${g}-madeira)"/><path d="M152 144 L260 90 L368 144 L358 152 L260 104 L162 152Z" fill="url(#${g}-telhado)"/>${Array.from({ length: 17 }, (_, i) => { const x = 166 + i * 12; const y = 144 - (x < 260 ? (x - 152) : (368 - x)) * 0.5; return `<path d="M${x} ${(y + 1).toFixed(1)} l${x < 260 ? -3 : 3} 8" stroke="#8a6a2e" stroke-width="1.2" opacity=".75"/>`; }).join('')}<rect x="164" y="136" width="192" height="8" rx="2" fill="url(#${g}-madeira)"/>`,
    luz: `<g class="adv-luz-natal"><circle cx="260" cy="210" r="96" fill="url(#${g}-luz)"/>${Array.from({ length: 12 }, (_, i) => { const a = (i * 30 * Math.PI) / 180; return `<path d="M260 208 L${(260 + Math.cos(a - 0.04) * 120).toFixed(0)} ${(208 + Math.sin(a - 0.04) * 120).toFixed(0)} L${(260 + Math.cos(a + 0.04) * 120).toFixed(0)} ${(208 + Math.sin(a + 0.04) * 120).toFixed(0)}Z" fill="#fff3c4" opacity=".16"/>`; }).join('')}</g>`,
    lamparina: `<path d="M326 144 v14" stroke="#9a7a3a" stroke-width="1"/><circle class="adv-chama-lamparina" cx="326" cy="166" r="22" fill="url(#${g}-luz)"/><path d="M320 158 h12 l-2 12 h-8z" fill="#c9962e" stroke="#7a5a14" stroke-width=".8"/><path d="M326 159 c3 3 2 7 0 8 c-2 -1 -3 -5 0 -8z" fill="#ffd35a"/>`,
    palha: `<g stroke="#d9b45a" stroke-width="1.4" stroke-linecap="round">${Array.from({ length: 34 }, (_, i) => { const x = 186 + ruidoDoAdvento(i, 8) * 148; const y = 240 + ruidoDoAdvento(i, 9) * 8; const a = (ruidoDoAdvento(i, 10) - 0.5) * 16; return `<path d="M${x.toFixed(0)} ${y.toFixed(0)} l8 ${(a / 4).toFixed(1)}"/>`; }).join('')}</g>`,
    boi: `${sombra(204, 236, 30)}<ellipse cx="198" cy="218" rx="27" ry="15" fill="#6e4026"/><ellipse cx="192" cy="224" rx="12" ry="6" fill="#a8744c" opacity=".8"/><path d="M216 190 c-6 -5 -12 -1 -10 4" fill="none" stroke="#efe4cf" stroke-width="2.6" stroke-linecap="round"/><path d="M230 189 c6 -6 12 -1 9 4" fill="none" stroke="#efe4cf" stroke-width="2.6" stroke-linecap="round"/><ellipse cx="223" cy="198" rx="11" ry="10" fill="#7d4a2c"/><ellipse cx="226" cy="205" rx="6.5" ry="4.6" fill="#d9a98a"/><circle cx="224" cy="205" r=".9" fill="#4a2a18"/><circle cx="229" cy="205" r=".9" fill="#4a2a18"/><circle cx="219" cy="195" r="1.2" fill="#1b120b"/><ellipse cx="211" cy="194" rx="5" ry="2.4" fill="#5a3018" transform="rotate(-20 211 194)"/>`,
    burro: `${sombra(306, 236, 28)}<ellipse cx="312" cy="220" rx="25" ry="14" fill="#8d8a92"/><ellipse cx="312" cy="226" rx="18" ry="6" fill="#c9c6cc" opacity=".7"/><path d="M296 214 C290 204 288 196 290 192" stroke="#8d8a92" stroke-width="11" stroke-linecap="round"/><ellipse cx="287" cy="196" rx="9" ry="7" fill="#9a97a0" transform="rotate(-25 287 196)"/><ellipse cx="282" cy="200" rx="5" ry="4" fill="#d9d6dc"/><path d="M291 189 l2 -17 l4 16z M296 190 l6 -15 l1 16z" fill="#7b7880"/><circle cx="288" cy="193" r="1.2" fill="#1b120b"/>`,
    manjedoura: `${sombra(260, 247, 34)}<path d="M236 230 L230 248 M284 230 L290 248 M240 232 L282 246 M280 232 L238 246" stroke="#5a3816" stroke-width="3.2" stroke-linecap="round"/><path d="M226 212 H294 L286 232 H234Z" fill="url(#${g}-madeira)" stroke="#3d2610" stroke-width="1"/><path d="M228 213 C236 204 244 210 250 205 C258 210 266 203 272 208 C280 204 288 209 292 213Z" fill="#d9b45a"/><path d="M234 212 l-4 -5 M246 210 l2 -6 M270 210 l3 -6 M284 211 l5 -4" stroke="#e8c76e" stroke-width="1.2"/>`,
    menino: `<circle class="adv-brilho-menino" cx="260" cy="204" r="26" fill="url(#${g}-luz)"/><circle cx="252" cy="204" r="9" fill="#ffe08a" opacity=".35"/><circle cx="252" cy="204" r="9" fill="none" stroke="#ffd25e" stroke-width="1.2"/><ellipse cx="263" cy="207" rx="13" ry="6.5" fill="#fbf7ee" stroke="#e2d8c4" stroke-width=".8"/><path d="M258 203 c3 3 9 3 14 1 M258 210 c4 -2 10 -1 14 1" stroke="#e2d8c4" stroke-width=".8" fill="none"/><circle cx="252" cy="204.5" r="5" fill="#f1c9a2"/><path d="M249.6 204.5 q1 .8 2 0 M252.6 204.5 q1 .8 2 0" stroke="#3b2618" stroke-width=".6" fill="none"/>`,
    maria: `${sombra(222, 247, 20)}${p({ x: 222, base: 247, ajoelhada: true, tunica: '#f4efe6', manto: `url(#${g}-manto-maria)`, veu: '#ffffff', aureola: true, maosX: 6 })}`,
    jose: `${sombra(300, 248, 16)}${p({ x: 300, base: 248, tunica: '#8b5a2b', manto: '#5f7a3a', cabelo: '#4a2e1a', barba: '#4a2e1a', aureola: true, cajado: true, maosX: -2 })}`,
    anjo: `<g class="adv-anjo"><path d="M260 84 C238 70 226 52 230 40 C240 52 250 60 262 70Z" fill="url(#${g}-asa)"/><path d="M260 84 C282 70 294 52 290 40 C280 52 270 60 258 70Z" fill="url(#${g}-asa)"/>${p({ x: 260, base: 108, escala: 0.62, tunica: '#ffffff', cabelo: '#e8c06a', aureola: true })}<path d="M232 112 C248 106 272 106 288 112 L286 122 C270 116 250 116 234 122Z" fill="#fff6dc" stroke="#d9b45a" stroke-width=".8"/><text x="260" y="118.5" text-anchor="middle" font-family="Cinzel, Georgia, serif" font-size="7.5" font-weight="700" fill="#8a6414" letter-spacing="1.5">GLORIA</text></g>`,
    estrela: `<g class="adv-estrela-belem"><path d="M338 40 L286 98 L296 103Z" fill="url(#${g}-cauda)"/><circle cx="338" cy="32" r="30" fill="url(#${g}-brilho)"/><path d="M338 10 L342 28 L360 32 L342 36 L338 54 L334 36 L316 32 L334 28Z" fill="#fff8d6"/><path d="M338 20 L340 30 L350 32 L340 34 L338 44 L336 34 L326 32 L336 30Z" fill="#ffffff"/></g>`,
    anjosGloria: `<g class="adv-anjinhos">${[[118, 74, 1], [402, 68, -1]].map(([x, y, l]) => `<g transform="translate(${x} ${y}) scale(${l} 1)"><path d="M0 8 C-14 0 -20 -10 -16 -18 C-10 -10 -4 -6 2 0Z" fill="url(#${g}-asa)"/><path d="M0 8 C10 0 16 -6 14 -14 C8 -8 4 -6 -2 0Z" fill="url(#${g}-asa)" opacity=".8"/><path d="M-7 26 C-6 14 -4 8 0 6 C4 8 6 14 7 26Z" fill="#fff"/><circle cx="0" cy="2" r="5" fill="#f1c9a2"/><path d="M-5 0 C-5 -6 5 -6 5 0 C3 -3 -3 -3 -5 0Z" fill="#e8c06a"/><circle cx="0" cy="1" r="8" fill="none" stroke="#ffd25e" stroke-width="1"/><path d="M4 12 l12 -6" stroke="#d9b45a" stroke-width="2" stroke-linecap="round"/><path d="M15 4 l4 -2 l-1 5z" fill="#d9b45a"/></g>`).join('')}</g>`,
    pastor: `${sombra(392, 250, 16)}${p({ x: 392, base: 250, tunica: '#a87c46', manto: '#6d5a3a', veu: '#e9dcc0', barba: '#5a3c22', cajado: true, maosX: 4 })}`,
    flautista: `${sombra(440, 260, 16)}${p({ x: 440, base: 260, sentada: true, escala: 0.9, tunica: '#7c8b5a', veu: '#d8c8a2', flauta: true, maosX: 8 })}`,
    pastora: `${sombra(158, 250, 15)}${p({ x: 158, base: 250, escala: 0.92, tunica: '#b5574a', manto: '#e2c48a', veu: '#f0e4cc', cesto: true, maosX: 7 })}`,
    ovelha1: `${sombra(356, 268, 14)}${ovelhaDoPresepio(356, 258, 0.9, true)}`,
    ovelha2: `${sombra(452, 282, 14)}${ovelhaDoPresepio(452, 272, 0.95, false)}`,
    ovelha3: `${sombra(110, 280, 14)}${ovelhaDoPresepio(110, 270, 0.9, false)}`,
    cordeiro: `${sombra(374, 284, 10)}${ovelhaDoPresepio(374, 277, 0.62, true)}`,
    cachorro: `${sombra(414, 270, 14)}<ellipse cx="414" cy="264" rx="14" ry="7" fill="#c49a62"/><circle cx="426" cy="256" r="6" fill="#c49a62"/><ellipse cx="430" cy="259" rx="4" ry="2.6" fill="#a37a48"/><path d="M422 251 l-3 -7 l6 4z" fill="#8a6236"/><circle cx="427" cy="255" r="1" fill="#1b120b"/><path d="M400 262 c-6 -3 -8 -8 -6 -11" stroke="#c49a62" stroke-width="3" fill="none" stroke-linecap="round"/>`,
    fogueira: `<g class="adv-fogueira"><circle cx="486" cy="270" r="30" fill="url(#${g}-luz)"/><path d="M472 280 L500 272 M474 272 L500 281" stroke="#5a3816" stroke-width="4.5" stroke-linecap="round"/><path class="adv-fogo" d="M486 254 C494 262 498 270 492 278 C488 282 484 282 480 278 C474 270 478 264 486 254Z" fill="url(#${g}-fogo)"/><path class="adv-fogo dois" d="M486 264 C490 268 491 273 488 277 C486 279 485 279 483 277 C481 273 482 269 486 264Z" fill="#fff3b0"/></g>`,
    poco: `${sombra(46, 262, 20)}<path d="M28 236 V264 H64 V236" fill="#8b8379"/>${[0, 1, 2].map((l) => [0, 1, 2].map((c) => `<rect x="${28 + c * 12 + (l % 2) * 6}" y="${238 + l * 9}" width="11" height="8" rx="1" fill="${(l + c) % 2 ? '#a39b90' : '#958d82'}"/>`).join('')).join('')}<ellipse cx="46" cy="236" rx="18" ry="4" fill="#5d564e"/><path d="M30 236 V212 M62 236 V212 M26 212 H66" stroke="#6b4423" stroke-width="3" stroke-linecap="round"/><path d="M46 212 v10" stroke="#9a7a3a" stroke-width="1"/><rect x="42" y="222" width="8" height="7" rx="1" fill="#7a5420"/>`,
    roseira: `${sombra(192, 288, 20)}<ellipse cx="192" cy="280" rx="20" ry="11" fill="#1f5a33"/><ellipse cx="184" cy="276" rx="10" ry="7" fill="#2b7342"/>${[[180, 274], [194, 270], [204, 278], [188, 284], [198, 285]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="4.4" fill="#d3263a"/><path d="M${x - 2} ${y} a2 2 0 1 1 4 0" fill="none" stroke="#8f0f1f" stroke-width=".8"/>`).join('')}`,
    magos: `${sombra(80, 262, 40)}${p({ x: 62, base: 262, escala: 0.95, tunica: '#7a2f8f', manto: '#c9a24a', barba: '#d9d2c4', coroa: true, presente: '#f2c35a', maosX: 6 })}${p({ x: 90, base: 262, escala: 0.98, tunica: '#1f6b5a', manto: '#b5172a', barba: '#3b2618', pele: '#9a6a44', coroa: true, presente: '#8a5a2b', maosX: 6 })}${p({ x: 118, base: 262, escala: 0.92, tunica: '#2b4f9a', manto: '#e2c48a', pele: '#6b4228', coroa: true, presente: '#c9c3d9', maosX: 6 })}`,
  };
}

const ORDEM_DO_PRESEPIO = ['belem', 'ciprestes', 'palmeira', 'gruta', 'luz', 'lamparina', 'palha', 'boi', 'burro', 'manjedoura', 'menino', 'maria', 'jose', 'anjo', 'estrela', 'anjosGloria', 'poco', 'pastora', 'magos', 'roseira', 'ovelha3', 'pastor', 'cachorro', 'ovelha1', 'cordeiro', 'flautista', 'ovelha2', 'fogueira'];

function presepioDoAdvento(pecas, opcoes) {
  const o = opcoes || {};
  contadorDoAdvento += 1;
  const g = `adv${contadorDoAdvento}`;
  const desenhos = pecasDoPresepio(g);
  const camadas = ORDEM_DO_PRESEPIO.filter((peca) => o.todas || pecas.has(peca)).map((peca) => `<g class="adv-peca${o.nova === peca ? ' chegando' : ''}" data-peca="${peca}">${desenhos[peca]}</g>`).join('');
  return `<svg class="adv-presepio${o.classe ? ` ${o.classe}` : ''}" viewBox="${o.recorte || '0 0 520 300'}" role="img" aria-label="${escaparDoAdvento(trDoAdvento('Presépio'))}">
    <defs>
      <linearGradient id="${g}-ceu" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#060a24"/><stop offset=".65" stop-color="#15215a"/><stop offset="1" stop-color="#2a3a7c"/></linearGradient>
      <linearGradient id="${g}-chao" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2a3524"/><stop offset="1" stop-color="#121a10"/></linearGradient>
      <linearGradient id="${g}-madeira" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#9a6a36"/><stop offset="1" stop-color="#5a3816"/></linearGradient>
      <linearGradient id="${g}-telhado" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e2bd6e"/><stop offset="1" stop-color="#8f6b2c"/></linearGradient>
      <linearGradient id="${g}-manto-maria" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#5a8ae6"/><stop offset="1" stop-color="#1f3f8f"/></linearGradient>
      <linearGradient id="${g}-sombra" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#000" stop-opacity=".25"/><stop offset=".5" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".2"/></linearGradient>
      <linearGradient id="${g}-asa" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff8dc"/><stop offset="1" stop-color="#e2b85a"/></linearGradient>
      <linearGradient id="${g}-cauda" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff6c8" stop-opacity=".9"/><stop offset="1" stop-color="#fff6c8" stop-opacity="0"/></linearGradient>
      <radialGradient id="${g}-brilho"><stop offset="0" stop-color="#fff6c8" stop-opacity=".9"/><stop offset="1" stop-color="#fff6c8" stop-opacity="0"/></radialGradient>
      <radialGradient id="${g}-luz"><stop offset="0" stop-color="#ffe7a0" stop-opacity=".85"/><stop offset=".5" stop-color="#ffcf6a" stop-opacity=".3"/><stop offset="1" stop-color="#ffcf6a" stop-opacity="0"/></radialGradient>
      <radialGradient id="${g}-fogo" cx="50%" cy="75%" r="65%"><stop offset="0" stop-color="#fff3b0"/><stop offset=".45" stop-color="#ff9a2e"/><stop offset="1" stop-color="#d6451b"/></radialGradient>
      <radialGradient id="adv-la-sombra"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#b9b0a0" stop-opacity=".8"/></radialGradient>
    </defs>
    <g class="adv-fundo">${desenhos.fundo}</g>
    ${camadas}
  </svg>`;
}

function cartaDeNatalDoAdvento(ganhou) {
  return `<span class="adv-carta${ganhou ? ' ganha' : ''}">
    <span class="adv-carta-brilho" aria-hidden="true"></span>
    <span class="adv-carta-arte">${presepioDoAdvento(new Set(['gruta', 'luz', 'palha', 'boi', 'burro', 'manjedoura', 'menino', 'maria', 'jose', 'estrela', 'anjo']), { recorte: '150 10 220 250', classe: 'mini' })}</span>
    <span class="adv-carta-nome">${escaparDoAdvento(trDoAdvento('Natal {ano}', { ano: ADVENTO_DO_ANO.ano }))}</span>
    <span class="adv-carta-selo">${escaparDoAdvento(trDoAdvento('Edição especial'))}</span>
  </span>`;
}

function cartasEspeciaisDoAlbum() {
  const temporada = temporadaDoAdvento();
  const ganhou = ganhouCartaDeNatal();
  if (!ganhou && temporada === 'fora') return [];
  return [{ id: `natal-${ADVENTO_DO_ANO.ano}`, ganhou, html: cartaDeNatalDoAdvento(ganhou), dica: trDoAdvento('Complete o Calendário do Advento') }];
}

function textoDaVelaDoAdvento(acesas) {
  if (acesas >= 5) return trDoAdvento('Feliz Natal! A vela branca de Cristo está acesa.');
  if (acesas === 0) return trDoAdvento('As velas começam a ser acesas no 1º Domingo do Advento.');
  const nomes = ['', trDoAdvento('1ª vela acesa'), trDoAdvento('2 velas acesas'), trDoAdvento('3 velas acesas: a rosa é da alegria'), trDoAdvento('4 velas acesas: o Natal chegou bem perto')];
  return nomes[acesas];
}

function contagemParaONatal() {
  const faltam = diasEntreNoAdvento(hojeDoAdvento(), dataDoAdvento(ADVENTO_DO_ANO.natal));
  if (faltam > 1) return trDoAdvento('Faltam {n} dias para o Natal', { n: faltam });
  if (faltam === 1) return trDoAdvento('Amanhã é Natal!');
  if (faltam === 0) return trDoAdvento('Hoje é Natal!');
  return trDoAdvento('Tempo do Natal');
}

function portinhaDoAdvento(dia, i, estado, hojeIndice) {
  const data = dataDoDiaDoAdvento(i);
  const liberado = i <= hojeIndice;
  const feito = !!estado.feitos[i];
  const hoje = i === hojeIndice;
  const domingo = ADVENTO_DO_ANO.domingos.includes(i);
  const classes = ['adv-porta', liberado ? 'liberada' : 'trancada', feito ? 'feita' : '', hoje ? 'hoje' : '', domingo ? 'domingo' : '', dia.natal ? 'natal' : ''].filter(Boolean).join(' ');
  const rotulo = liberado
    ? `${dataEscritaDoAdvento(data)}${feito ? `, ${trDoAdvento('feito')}` : ''}`
    : (i - hojeIndice === 1 ? trDoAdvento('{data}: abre amanhã', { data: dataEscritaDoAdvento(data) }) : trDoAdvento('{data}: abre em {n} dias', { data: dataEscritaDoAdvento(data), n: i - hojeIndice }));
  return `<button type="button" class="${classes}" data-dia-advento="${i}" aria-label="${escaparDoAdvento(rotulo)}">
    <span class="adv-porta-fundo"><span class="adv-porta-estrela" aria-hidden="true"></span>${feito ? '<span class="adv-porta-feita" aria-hidden="true"></span>' : ''}</span>
    <span class="adv-porta-folha" aria-hidden="true"><span class="adv-porta-numero">${data.getDate()}</span><span class="adv-porta-mes">${escaparDoAdvento(mesCurtoDoAdvento(data))}</span>${liberado ? '' : '<span class="adv-porta-cadeado"></span>'}</span>
  </button>`;
}

function htmlDoAdvento() {
  const estado = estadoDoAdvento();
  const temporada = temporadaDoAdvento();
  const hojeIndice = indiceDeHojeNoAdvento();
  const acesas = velasAcesasNoAdvento();
  const feitos = quantosDiasFeitosNoAdvento(estado);
  const pecas = pecasVisiveisDoPresepio(estado);
  const total = DIAS_DO_ADVENTO.length;
  const ganhou = ganhouCartaDeNatal(estado);
  const antes = temporada === 'antes' || hojeIndice < 0;
  const faltamParaComecar = diasEntreNoAdvento(hojeDoAdvento(), dataDoAdvento(ADVENTO_DO_ANO.inicio));
  const epifania = epifaniaLiberada();
  return `<header class="adv-topo">
      <button class="btn-back" id="btn-voltar-advento"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg><span>${escaparDoAdvento(trDoAdvento('Voltar para o início'))}</span></button>
      <p class="adv-selo">${escaparDoAdvento(trDoAdvento('Tempo do Advento'))}</p>
      <h2 class="section-title">${escaparDoAdvento(trDoAdvento('Calendário do Advento'))}</h2>
      <div class="title-divider"></div>
      <p class="adv-intro">${escaparDoAdvento(trDoAdvento('Prepare o coração para o Natal, um dia de cada vez. Abra a portinha de cada dia, faça o gesto e ganhe uma peça para o seu presépio.'))}</p>
    </header>
    <section class="adv-cartao adv-cartao-coroa">
      <div class="adv-coroa-caixa">${coroaDoAdvento(acesas)}</div>
      <div class="adv-coroa-textos">
        <strong>${escaparDoAdvento(antes ? trDoAdvento('O Advento começa em {data}', { data: dataEscritaDoAdvento(dataDoAdvento(ADVENTO_DO_ANO.inicio)) }) : contagemParaONatal())}</strong>
        <span>${escaparDoAdvento(antes ? (faltamParaComecar === 1 ? trDoAdvento('Amanhã começa o Advento. Prepare a sua coroa!') : trDoAdvento('Faltam {n} dias para o 1º Domingo do Advento.', { n: faltamParaComecar })) : textoDaVelaDoAdvento(acesas))}</span>
      </div>
    </section>
    <section class="adv-cartao">
      <div class="adv-cartao-topo"><h3>${escaparDoAdvento(trDoAdvento('As portinhas'))}</h3><span class="adv-contador">${escaparDoAdvento(trDoAdvento('{n} de {total} dias', { n: feitos, total }))}</span></div>
      <div class="adv-portas">${DIAS_DO_ADVENTO.map((dia, i) => portinhaDoAdvento(dia, i, estado, hojeIndice)).join('')}${epifania ? `<button type="button" class="adv-porta liberada epifania${estado.epifania ? ' feita' : ''}" data-dia-advento="epifania" aria-label="${escaparDoAdvento(trDoAdvento('Epifania'))}"><span class="adv-porta-fundo"><span class="adv-porta-estrela" aria-hidden="true"></span>${estado.epifania ? '<span class="adv-porta-feita" aria-hidden="true"></span>' : ''}</span><span class="adv-porta-folha" aria-hidden="true"><span class="adv-porta-numero">${dataDoAdvento(ADVENTO_DO_ANO.epifania).getDate()}</span><span class="adv-porta-mes">${escaparDoAdvento(mesCurtoDoAdvento(dataDoAdvento(ADVENTO_DO_ANO.epifania)))}</span></span></button>` : ''}</div>
    </section>
    <section class="adv-cartao adv-cartao-presepio">
      <div class="adv-cartao-topo"><h3>${escaparDoAdvento(trDoAdvento('Meu presépio'))}</h3><span class="adv-contador">${escaparDoAdvento(trDoAdvento('{n} peças', { n: pecas.size }))}</span></div>
      <div class="adv-presepio-caixa">${presepioDoAdvento(pecas, { nova: pecaQueChegou })}${pecas.size ? '' : `<p class="adv-presepio-vazio">${escaparDoAdvento(trDoAdvento('Cada gesto feito coloca uma peça no presépio. No Natal, chega o Menino Jesus.'))}</p>`}</div>
    </section>
    <section class="adv-cartao adv-cartao-carta">
      ${cartaDeNatalDoAdvento(ganhou)}
      <div class="adv-carta-textos">
        <strong>${escaparDoAdvento(ganhou ? trDoAdvento('Você ganhou a figurinha de Natal!') : trDoAdvento('Figurinha especial de Natal'))}</strong>
        <span>${escaparDoAdvento(ganhou ? trDoAdvento('Ela já está colada no seu álbum, na página Edição especial.') : trDoAdvento('Faça o gesto de todos os {total} dias para colar esta figurinha no seu álbum. Dias que passaram ainda podem ser feitos.', { total }))}</span>
      </div>
    </section>`;
}

function desenharAdvento() {
  const lugar = document.getElementById('advento-conteudo');
  if (!lugar) return;
  lugar.innerHTML = htmlDoAdvento();
  pecaQueChegou = null;
  const voltar = lugar.querySelector('#btn-voltar-advento');
  if (voltar) voltar.addEventListener('click', () => mudarDeView('view-home'));
  lugar.querySelectorAll('[data-dia-advento]').forEach((botao) => botao.addEventListener('click', () => {
    const qual = botao.dataset.diaAdvento;
    if (qual === 'epifania') { abrirDiaDoAdvento('epifania'); return; }
    const i = Number(qual);
    if (i > indiceDeHojeNoAdvento()) {
      botao.classList.remove('balancando');
      void botao.offsetWidth;
      botao.classList.add('balancando');
      somDoAdvento('trancada');
      avisoDoAdvento(i - indiceDeHojeNoAdvento() === 1 ? trDoAdvento('Essa portinha abre amanhã.') : trDoAdvento('Essa portinha abre em {n} dias.', { n: i - indiceDeHojeNoAdvento() }));
      return;
    }
    botao.classList.add('abrindo');
    somDoAdvento('porta');
    setTimeout(() => abrirDiaDoAdvento(i), 420);
  }));
}

function avisoDoAdvento(texto) {
  if (typeof avisoRapidoDosSantos === 'function') { avisoRapidoDosSantos(texto, 'estrela'); return; }
  let aviso = document.getElementById('adv-aviso');
  if (!aviso) {
    aviso = document.createElement('div');
    aviso.id = 'adv-aviso';
    aviso.className = 'adv-aviso';
    aviso.setAttribute('role', 'status');
    document.body.appendChild(aviso);
  }
  aviso.textContent = texto;
  aviso.classList.remove('visivel');
  void aviso.offsetWidth;
  aviso.classList.add('visivel');
}

let audioDoAdvento = null;

function somDoAdvento(tipo) {
  try {
    if (!audioDoAdvento) audioDoAdvento = new (window.AudioContext || window.webkitAudioContext)();
    const ctx = audioDoAdvento;
    if (ctx.state === 'suspended') ctx.resume();
    const agora = ctx.currentTime;
    const saida = ctx.createGain();
    saida.gain.value = 0.18;
    saida.connect(ctx.destination);
    const sino = (freq, quando, duracao, forca) => {
      [1, 2.76, 5.4].forEach((parcial, k) => {
        const osc = ctx.createOscillator();
        const ganho = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.value = freq * parcial;
        ganho.gain.setValueAtTime(0, agora + quando);
        ganho.gain.linearRampToValueAtTime(forca / (k + 1), agora + quando + 0.005);
        ganho.gain.exponentialRampToValueAtTime(0.0001, agora + quando + duracao / (k + 1));
        osc.connect(ganho);
        ganho.connect(saida);
        osc.start(agora + quando);
        osc.stop(agora + quando + duracao);
      });
    };
    if (tipo === 'porta') { sino(880, 0, 1.4, 0.5); sino(1318.5, 0.09, 1.2, 0.35); }
    else if (tipo === 'feito') { [659.3, 784, 987.8, 1318.5].forEach((f, i) => sino(f, i * 0.11, 1.8, 0.45)); }
    else if (tipo === 'carta') { [523.3, 659.3, 784, 1046.5, 1318.5, 1568].forEach((f, i) => sino(f, i * 0.09, 2.4, 0.4)); }
    else if (tipo === 'trancada') {
      const osc = ctx.createOscillator();
      const ganho = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(180, agora);
      osc.frequency.exponentialRampToValueAtTime(110, agora + 0.12);
      ganho.gain.setValueAtTime(0.4, agora);
      ganho.gain.exponentialRampToValueAtTime(0.001, agora + 0.16);
      osc.connect(ganho);
      ganho.connect(saida);
      osc.start(agora);
      osc.stop(agora + 0.18);
    }
  } catch (e) {
  }
}

function botaoDeAcaoDoAdvento(acao) {
  if (acao === 'terco' && typeof abrirTerco === 'function') return `<button type="button" class="adv-acao" data-acao-advento="terco">${escaparDoAdvento(trDoAdvento('Rezar o terço guiado'))}</button>`;
  if (acao === 'exame' && typeof abrirExameDeConsciencia === 'function') return `<button type="button" class="adv-acao" data-acao-advento="exame">${escaparDoAdvento(trDoAdvento('Fazer o exame de consciência'))}</button>`;
  if (acao === 'novena' && typeof abrirNovenas === 'function') return `<button type="button" class="adv-acao" data-acao-advento="novena">${escaparDoAdvento(trDoAdvento('Começar a Novena de Natal'))}</button>`;
  if (acao === 'trilhas' && typeof abrirTrilhas === 'function') return `<button type="button" class="adv-acao" data-acao-advento="trilhas">${escaparDoAdvento(trDoAdvento('Ir para as trilhas'))}</button>`;
  return '';
}

function fazerAcaoDoAdvento(acao) {
  fecharDiaDoAdvento();
  if (acao === 'terco') { if (typeof closeSidebar === 'function') closeSidebar(); mudarDeView('view-terco'); }
  else if (acao === 'exame') abrirExameDeConsciencia();
  else if (acao === 'novena') abrirNovenas('natal');
  else if (acao === 'trilhas') abrirTrilhas();
}

function abrirDiaDoAdvento(qual) {
  const epifania = qual === 'epifania';
  const dia = epifania ? DIA_DA_EPIFANIA : DIAS_DO_ADVENTO[qual];
  if (!dia) return;
  diaAbertoNoAdvento = qual;
  const estado = estadoDoAdvento();
  const feito = epifania ? estado.epifania : !!estado.feitos[qual];
  const data = epifania ? dataDoAdvento(ADVENTO_DO_ANO.epifania) : dataDoDiaDoAdvento(qual);
  const santo = dia.santo && typeof santosData !== 'undefined' ? santosData.find((s) => s.id === dia.santo) : null;
  const nomeDoSanto = santo ? (typeof textoDoSanto === 'function' ? textoDoSanto(santo).nome : santo.nome) : '';
  const fotoDoSanto = santo && typeof enderecoDaFotoDoSanto === 'function' ? enderecoDaFotoDoSanto(santo.id) : '';
  const passou = !epifania && qual < indiceDeHojeNoAdvento();
  const nomeDaPeca = textoDoAdvento(NOMES_DAS_PECAS_DO_PRESEPIO[dia.peca]);
  let janela = document.getElementById('adv-janela');
  if (!janela) {
    janela = document.createElement('div');
    janela.id = 'adv-janela';
    janela.className = 'adv-janela';
    janela.setAttribute('role', 'dialog');
    janela.setAttribute('aria-modal', 'true');
    document.body.appendChild(janela);
    janela.addEventListener('click', (evento) => { if (evento.target === janela) fecharDiaDoAdvento(); });
    document.addEventListener('keydown', (evento) => { if (evento.key === 'Escape' && janela.classList.contains('aberta')) fecharDiaDoAdvento(); });
  }
  janela.setAttribute('aria-label', textoDoAdvento(dia.titulo));
  janela.innerHTML = `<div class="adv-janela-caixa${dia.natal ? ' natal' : ''}">
    <button type="button" class="adv-janela-fechar" aria-label="${escaparDoAdvento(trDoAdvento('Fechar'))}">&times;</button>
    <p class="adv-janela-data">${escaparDoAdvento(dataEscritaDoAdvento(data, true))}</p>
    <h3 class="adv-janela-titulo">${escaparDoAdvento(textoDoAdvento(dia.titulo))}</h3>
    ${santo ? `<button type="button" class="adv-janela-santo" data-abrir-santo-advento="${escaparDoAdvento(santo.id)}"><span class="adv-janela-santo-foto"${fotoDoSanto ? ` style="background-image:url('${escaparDoAdvento(fotoDoSanto)}')"` : ''}></span><span><small>${escaparDoAdvento(trDoAdvento('Santo do dia'))}</small><strong translate="no">${escaparDoAdvento(nomeDoSanto)}</strong></span></button>` : ''}
    <p class="adv-janela-texto">${escaparDoAdvento(textoDoAdvento(dia.texto))}</p>
    <div class="adv-janela-bloco gesto"><small>${escaparDoAdvento(trDoAdvento('Gesto de hoje'))}</small><p>${escaparDoAdvento(textoDoAdvento(dia.gesto))}</p>${botaoDeAcaoDoAdvento(dia.acao)}</div>
    <div class="adv-janela-bloco oracao"><small>${escaparDoAdvento(trDoAdvento('Oração'))}</small><p>${escaparDoAdvento(textoDoAdvento(dia.oracao))}</p></div>
    <div class="adv-janela-peca"><span class="adv-janela-peca-arte">${presepioDoAdvento(new Set([dia.peca]), { classe: 'so-peca', recorte: recorteDaPeca(dia.peca) })}</span><span>${escaparDoAdvento(feito ? trDoAdvento('{peca} já está no seu presépio.', { peca: nomeDaPeca }) : trDoAdvento('Ao fazer o gesto, você ganha: {peca}', { peca: nomeDaPeca }))}</span></div>
    <button type="button" class="adv-janela-feito${feito ? ' ja' : ''}"${feito ? ' disabled' : ''}>${escaparDoAdvento(feito ? trDoAdvento('Gesto feito') : (passou ? trDoAdvento('Fiz o gesto deste dia') : trDoAdvento('Fiz o gesto de hoje')))}</button>
  </div>`;
  janela.querySelector('.adv-janela-fechar').addEventListener('click', fecharDiaDoAdvento);
  const botaoSanto = janela.querySelector('[data-abrir-santo-advento]');
  if (botaoSanto) botaoSanto.addEventListener('click', () => { fecharDiaDoAdvento(); if (typeof showDetail === 'function') showDetail(botaoSanto.dataset.abrirSantoAdvento); });
  const acao = janela.querySelector('[data-acao-advento]');
  if (acao) acao.addEventListener('click', () => fazerAcaoDoAdvento(acao.dataset.acaoAdvento));
  const feitoBotao = janela.querySelector('.adv-janela-feito');
  if (!feito) feitoBotao.addEventListener('click', () => marcarDiaDoAdvento(qual));
  janela.classList.add('aberta');
  document.body.classList.add('adv-janela-aberta');
  setTimeout(() => feitoBotao.focus({ preventScroll: true }), 60);
}

function recorteDaPeca(peca) {
  const recortes = {
    gruta: '140 80 240 180', palha: '176 226 168 30', lamparina: '296 136 60 60', manjedoura: '220 196 80 58', boi: '166 180 76 62', burro: '270 166 74 80',
    ovelha1: '330 238 50 40', palmeira: '440 120 80 140', belem: '14 160 144 52', maria: '196 182 52 70', ovelha2: '428 252 50 40', jose: '276 166 52 86',
    poco: '18 200 56 70', roseira: '166 260 52 34', anjo: '220 30 80 96', pastor: '370 172 46 82', cordeiro: '356 262 36 28', fogueira: '462 246 50 42',
    flautista: '420 210 52 54', cachorro: '392 244 46 30', ovelha3: '86 250 50 40', pastora: '136 180 50 74', estrela: '300 0 80 110', ciprestes: '130 140 260 100',
    anjosGloria: '96 46 330 54', luz: '160 110 200 200', menino: '232 186 56 34', magos: '40 192 104 74',
  };
  return recortes[peca] || '0 0 520 300';
}

function fecharDiaDoAdvento() {
  const janela = document.getElementById('adv-janela');
  if (janela) janela.classList.remove('aberta');
  document.body.classList.remove('adv-janela-aberta');
  diaAbertoNoAdvento = null;
  document.querySelectorAll('.adv-porta.abrindo').forEach((porta) => porta.classList.remove('abrindo'));
}

function marcarDiaDoAdvento(qual) {
  const estado = estadoDoAdvento();
  const tinhaCarta = ganhouCartaDeNatal(estado);
  if (qual === 'epifania') estado.epifania = true;
  else estado.feitos[qual] = true;
  guardarEstadoDoAdvento(estado);
  pecaQueChegou = qual === 'epifania' ? 'magos' : DIAS_DO_ADVENTO[qual].peca;
  fecharDiaDoAdvento();
  somDoAdvento('feito');
  desenharAdvento();
  desenharAdventoNoInicio();
  const presepio = document.querySelector('#advento-conteudo .adv-cartao-presepio');
  if (presepio) setTimeout(() => presepio.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'center' }), 120);
  if (!tinhaCarta && ganhouCartaDeNatal(estado)) setTimeout(mostrarCartaDeNatalGanha, 1500);
}

function mostrarCartaDeNatalGanha() {
  somDoAdvento('carta');
  const tela = document.createElement('div');
  tela.className = 'adv-ganhou';
  tela.setAttribute('role', 'dialog');
  tela.setAttribute('aria-modal', 'true');
  tela.innerHTML = `<div class="adv-ganhou-caixa">
    <div class="adv-ganhou-raios" aria-hidden="true"></div>
    ${cartaDeNatalDoAdvento(true)}
    <h3>${escaparDoAdvento(trDoAdvento('Figurinha de Natal conquistada!'))}</h3>
    <p>${escaparDoAdvento(trDoAdvento('Você viveu todo o Advento com Jesus. A figurinha especial já está colada no seu álbum.'))}</p>
    <button type="button" class="adv-ganhou-ok">${escaparDoAdvento(trDoAdvento('Amém!'))}</button>
  </div>`;
  document.body.appendChild(tela);
  requestAnimationFrame(() => tela.classList.add('aberta'));
  const fechar = () => { tela.classList.remove('aberta'); setTimeout(() => tela.remove(), 400); };
  tela.querySelector('.adv-ganhou-ok').addEventListener('click', fechar);
  tela.addEventListener('click', (evento) => { if (evento.target === tela) fechar(); });
}

function abrirAdvento() {
  if (typeof closeSidebar === 'function') closeSidebar();
  mudarDeView('view-advento');
  desenharAdvento();
  window.scrollTo({ top: 0, behavior: 'auto' });
}

function desenharAdventoNoInicio() {
  const lugar = document.getElementById('advento-inicio');
  const nav = document.getElementById('nav-advento');
  const atalho = document.getElementById('atalho-advento');
  const temporada = temporadaDoAdvento();
  const mostrar = temporada !== 'fora';
  if (nav) nav.hidden = !mostrar;
  if (atalho) atalho.hidden = !mostrar;
  if (!lugar) return;
  lugar.hidden = !mostrar;
  if (!mostrar) { lugar.innerHTML = ''; return; }
  const estado = estadoDoAdvento();
  const hojeIndice = indiceDeHojeNoAdvento();
  const acesas = velasAcesasNoAdvento();
  let titulo;
  let texto;
  let botao;
  if (temporada === 'antes') {
    const faltam = diasEntreNoAdvento(hojeDoAdvento(), dataDoAdvento(ADVENTO_DO_ANO.inicio));
    titulo = trDoAdvento('O Advento está chegando');
    texto = faltam === 1 ? trDoAdvento('Amanhã começa o Advento. Prepare a sua coroa!') : trDoAdvento('Faltam {n} dias para o 1º Domingo do Advento.', { n: faltam });
    botao = trDoAdvento('Ver o calendário');
  } else if (temporada === 'advento') {
    const diaDeHoje = DIAS_DO_ADVENTO[Math.min(hojeIndice, DIAS_DO_ADVENTO.length - 1)];
    const feitoHoje = !!estado.feitos[Math.min(hojeIndice, DIAS_DO_ADVENTO.length - 1)];
    titulo = contagemParaONatal();
    texto = textoDoAdvento(diaDeHoje.titulo);
    botao = feitoHoje ? trDoAdvento('Ver o meu presépio') : trDoAdvento('Abrir a portinha de hoje');
  } else {
    titulo = trDoAdvento('Feliz Natal!');
    texto = epifaniaLiberada() && !estado.epifania ? trDoAdvento('Os Reis Magos chegaram. Abra a portinha da Epifania!') : trDoAdvento('Veja o seu presépio completo.');
    botao = trDoAdvento('Abrir o calendário');
  }
  lugar.innerHTML = `<button type="button" class="adv-inicio" id="adv-inicio-botao">
    <span class="adv-inicio-coroa">${coroaDoAdvento(acesas)}</span>
    <span class="adv-inicio-textos"><small>${escaparDoAdvento(trDoAdvento('Calendário do Advento'))}</small><strong>${escaparDoAdvento(titulo)}</strong><span>${escaparDoAdvento(texto)}</span><em>${escaparDoAdvento(botao)}</em></span>
  </button>`;
  lugar.querySelector('#adv-inicio-botao').addEventListener('click', abrirAdvento);
}

function iniciarAdvento() {
  const nav = document.getElementById('nav-advento');
  if (nav) nav.addEventListener('click', abrirAdvento);
  const atalho = document.getElementById('atalho-advento');
  if (atalho) atalho.addEventListener('click', abrirAdvento);
  desenharAdventoNoInicio();
  document.addEventListener('lumina-idioma', () => {
    desenharAdventoNoInicio();
    const view = document.getElementById('view-advento');
    if (view && view.classList.contains('active')) desenharAdvento();
    if (diaAbertoNoAdvento !== null) abrirDiaDoAdvento(diaAbertoNoAdvento);
  });
  try {
    if (new URLSearchParams(window.location.search).get('advento')) setTimeout(() => { if (temporadaDoAdvento() !== 'fora') abrirAdvento(); }, 400);
  } catch (e) {
  }
}

document.addEventListener('DOMContentLoaded', () => {
  if (typeof rodarComSeguranca === 'function') rodarComSeguranca('advento', iniciarAdvento);
  else iniciarAdvento();
});
