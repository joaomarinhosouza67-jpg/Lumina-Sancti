const CORPO_DA_LUMI = 'M60 6 C68 36 86 56 114 64 C86 72 68 88 60 114 C52 88 34 72 6 64 C34 56 52 36 60 6 Z';

const ROSTOS_DA_LUMI = {
  sorriso: `
    <ellipse cx="50" cy="59.5" rx="4.4" ry="5.9" fill="#2b1d05"/><ellipse cx="70" cy="59.5" rx="4.4" ry="5.9" fill="#2b1d05"/>
    <circle cx="51.7" cy="57" r="1.7" fill="#fff"/><circle cx="71.7" cy="57" r="1.7" fill="#fff"/>
    <path d="M53.5 71 Q60 77.5 66.5 71" fill="none" stroke="#2b1d05" stroke-width="2.6" stroke-linecap="round"/>`,
  feliz: `
    <path d="M45.3 61 Q50 54 54.7 61 M65.3 61 Q70 54 74.7 61" fill="none" stroke="#2b1d05" stroke-width="2.6" stroke-linecap="round"/>
    <path d="M51 69.5 Q60 84 69 69.5 Z" fill="#7c2d12"/><ellipse cx="60" cy="77" rx="4.2" ry="2.4" fill="#f9a8a8"/>`,
  fechado: `
    <path d="M45.3 59 Q50 64 54.7 59 M65.3 59 Q70 64 74.7 59" fill="none" stroke="#2b1d05" stroke-width="2.6" stroke-linecap="round"/>
    <path d="M54.5 71 Q60 75.5 65.5 71" fill="none" stroke="#2b1d05" stroke-width="2.4" stroke-linecap="round"/>`,
  dormindo: `
    <path d="M45.3 59 Q50 64 54.7 59 M65.3 59 Q70 64 74.7 59" fill="none" stroke="#2b1d05" stroke-width="2.6" stroke-linecap="round"/>
    <ellipse cx="60" cy="73" rx="2.5" ry="3" fill="#7c2d12"/>`,
  rindo: `
    <path d="M44.5 60 L54 56 L44.5 52 M75.5 60 L66 56 L75.5 52" fill="none" stroke="#2b1d05" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M49 67 Q60 88 71 67 Z" fill="#7c2d12"/><ellipse cx="60" cy="78" rx="5" ry="2.8" fill="#f9a8a8"/>
    <path d="M40 64 C37 69 36 72 36 74 A3.4 3.4 0 0 0 42.8 74 C42.8 72 41.8 69 40 64 Z M80 64 C78.2 69 77.2 72 77.2 74 A3.4 3.4 0 0 0 84 74 C84 72 83 69 80 64 Z" fill="#8fd3ff" stroke="#4aa3e0" stroke-width="0.8"/>`,
  piscando: `
    <ellipse cx="50" cy="59.5" rx="4.4" ry="5.9" fill="#2b1d05"/><circle cx="51.7" cy="57" r="1.7" fill="#fff"/>
    <path d="M65.3 60 Q70 55 74.7 60" fill="none" stroke="#2b1d05" stroke-width="2.6" stroke-linecap="round"/>
    <path d="M52.5 70 Q60 79 67.5 70" fill="none" stroke="#2b1d05" stroke-width="2.6" stroke-linecap="round"/>`,
};

function desenhoDaLumiNaFigurinha(x, y, escala, rosto, extras, giro) {
  return `
    <g transform="translate(${x} ${y}) rotate(${giro || 0} ${60 * escala} ${60 * escala}) scale(${escala})">
      ${extras && extras.atras ? extras.atras : ''}
      <path d="${CORPO_DA_LUMI}" fill="#f5d77a" stroke="#b8912a" stroke-width="2.4" stroke-linejoin="round"/>
      <path d="M58 16 C61 33 69 45 84 54" fill="none" stroke="#fffbe8" stroke-width="3.4" stroke-linecap="round" opacity=".6"/>
      <ellipse cx="41.5" cy="70" rx="5.5" ry="3.2" fill="#f4978e" opacity=".6"/><ellipse cx="78.5" cy="70" rx="5.5" ry="3.2" fill="#f4978e" opacity=".6"/>
      ${ROSTOS_DA_LUMI[rosto] || ROSTOS_DA_LUMI.sorriso}
      ${extras && extras.frente ? extras.frente : ''}
    </g>`;
}

const BRACO = (d, mao) => `<path d="${d}" fill="none" stroke="#c9a232" stroke-width="5.5" stroke-linecap="round"/><circle cx="${mao[0]}" cy="${mao[1]}" r="5" fill="#ecc95c" stroke="#b8912a" stroke-width="1.2"/>`;

function brilhinho(x, y, r, cor) {
  return `<path d="M${x} ${y - r} C${x + r * 0.15} ${y - r * 0.15} ${x + r * 0.15} ${y - r * 0.15} ${x + r} ${y} C${x + r * 0.15} ${y + r * 0.15} ${x + r * 0.15} ${y + r * 0.15} ${x} ${y + r} C${x - r * 0.15} ${y + r * 0.15} ${x - r * 0.15} ${y + r * 0.15} ${x - r} ${y} C${x - r * 0.15} ${y - r * 0.15} ${x - r * 0.15} ${y - r * 0.15} ${x} ${y - r} Z" fill="${cor || '#ffd76a'}"/>`;
}

function coracaoDeContas() {
  const contas = [];
  const total = 26;
  for (let i = 0; i < total; i += 1) {
    const t = (i / total) * Math.PI * 2;
    const x = 16 * Math.pow(Math.sin(t), 3);
    const y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
    contas.push(`<circle cx="${(80 + x * 2.9).toFixed(1)}" cy="${(58 - y * 2.9).toFixed(1)}" r="${i % 6 === 0 ? 4.6 : 3.4}" fill="${i % 6 === 0 ? '#2f5bb3' : '#7aa6ec'}" stroke="#1d3a78" stroke-width="1"/>`);
  }
  return contas.join('');
}

const FIGURINHAS_DO_LUMINA = [
  {
    id: 'luminaAmem',
    rotulo: ['Amém', 'Amen', 'Amén'],
    desenho: () => desenhoDaLumiNaFigurinha(32, 6, 0.8, 'fechado', {
      frente: `${BRACO('M28 72 Q40 90 53 94', [53, 94])}${BRACO('M92 72 Q80 90 67 94', [67, 94])}
        <ellipse cx="56.5" cy="92" rx="5.2" ry="11" transform="rotate(16 56.5 92)" fill="#ecc95c" stroke="#b8912a" stroke-width="1.4"/>
        <ellipse cx="63.5" cy="92" rx="5.2" ry="11" transform="rotate(-16 63.5 92)" fill="#ecc95c" stroke="#b8912a" stroke-width="1.4"/>`,
    }) + brilhinho(28, 30, 9) + brilhinho(134, 40, 7) + brilhinho(124, 14, 5, '#fff3c4'),
  },
  {
    id: 'luminaRezando',
    rotulo: ['Rezando por você', 'Praying for you', 'Rezando por ti'],
    desenho: () => `
      <circle cx="70" cy="40" r="30" fill="#ffd36b" opacity=".28"/>
      <circle cx="70" cy="40" r="17" fill="#ffd36b" opacity=".4"/>
      <path d="M70 18 C78 30 80 38 76 46 C74 50 66 50 64 46 C60 38 62 30 70 18 Z" fill="#f7a531"/>
      <path d="M70 30 C74 36 74 41 72 44 C71 46 69 46 68 44 C66 41 66 36 70 30 Z" fill="#ffe9a3"/>
      <path d="M70 48 V54" stroke="#3a2a14" stroke-width="2" stroke-linecap="round"/>
      <rect x="57" y="54" width="26" height="58" rx="5" fill="#fff6dd" stroke="#d6b77a" stroke-width="2.4"/>
      <path d="M57 62 C62 66 66 60 70 64 C74 68 78 60 83 64" fill="none" stroke="#f0d9a6" stroke-width="3" stroke-linecap="round"/>
      <rect x="50" y="110" width="40" height="8" rx="4" fill="#d9ad4a" stroke="#a87422" stroke-width="1.6"/>
      ${desenhoDaLumiNaFigurinha(92, 58, 0.46, 'fechado', { frente: `${BRACO('M28 72 Q40 90 53 94', [53, 94])}${BRACO('M92 72 Q80 90 67 94', [67, 94])}` })}
      ${brilhinho(30, 40, 7)}${brilhinho(130, 30, 6, '#fff3c4')}`,
  },
  {
    id: 'luminaAbencoe',
    rotulo: ['Deus te abençoe', 'God bless you', 'Dios te bendiga'],
    desenho: () => `
      <g stroke="#f3c44c" stroke-width="3" stroke-linecap="round" opacity=".75">
        ${Array.from({ length: 14 }, (_, k) => { const a = (k / 14) * Math.PI * 2; return `<path d="M${(80 + Math.cos(a) * 34).toFixed(1)} ${(64 + Math.sin(a) * 34).toFixed(1)} L${(80 + Math.cos(a) * 54).toFixed(1)} ${(64 + Math.sin(a) * 54).toFixed(1)}"/>`; }).join('')}
      </g>
      <circle cx="80" cy="64" r="34" fill="#fff4c9" opacity=".7"/>
      <path d="M44 74 C56 62 74 60 88 66 C96 56 108 54 116 60 C110 62 106 66 104 70 C108 74 108 82 100 88 C86 98 62 96 48 88 L34 94 L40 82 Z" fill="#fff" stroke="#8aa2bd" stroke-width="2.2" stroke-linejoin="round"/>
      <path d="M66 70 C62 52 74 38 96 34 C90 46 90 58 84 68 Z" fill="#fff" stroke="#8aa2bd" stroke-width="2.2" stroke-linejoin="round"/>
      <path d="M74 66 C74 56 80 48 90 44" fill="none" stroke="#c9d6e6" stroke-width="2" stroke-linecap="round"/>
      <circle cx="108" cy="62" r="2.4" fill="#2b1d05"/>
      <path d="M116 60 L125 62 L116 65 Z" fill="#f2a33a"/>
      <path d="M124 63 C130 70 132 76 130 84" fill="none" stroke="#5b8a3c" stroke-width="2.2" stroke-linecap="round"/>
      <ellipse cx="131" cy="72" rx="3" ry="6" transform="rotate(-30 131 72)" fill="#7fb35a"/><ellipse cx="127" cy="80" rx="3" ry="6" transform="rotate(30 127 80)" fill="#7fb35a"/>`,
  },
  {
    id: 'luminaGloria',
    rotulo: ['Glória a Deus!', 'Glory to God!', '¡Gloria a Dios!'],
    desenho: () => desenhoDaLumiNaFigurinha(34, 14, 0.76, 'feliz', {
      atras: `${BRACO('M24 58 Q10 46 12 30', [12, 28])}${BRACO('M96 58 Q110 46 108 30', [108, 28])}`,
    }, -6) + brilhinho(24, 24, 10) + brilhinho(138, 22, 9) + brilhinho(20, 92, 6, '#fff3c4') + brilhinho(142, 88, 7, '#fff3c4')
      + '<circle cx="40" cy="12" r="3" fill="#7aa6ec"/><circle cx="120" cy="104" r="3" fill="#f29bb2"/><circle cx="30" cy="110" r="2.6" fill="#7fb35a"/><circle cx="130" cy="58" r="2.6" fill="#f29bb2"/>',
  },
  {
    id: 'luminaPazEBem',
    rotulo: ['Paz e bem', 'Peace and good', 'Paz y bien'],
    desenho: () => `
      <circle cx="80" cy="62" r="50" fill="#f6ead0" stroke="#d9ad4a" stroke-width="2.4"/>
      <path d="M44 32 H116 V50 H90 V104 H70 V50 H44 Z" fill="#a8743a" stroke="#6b4420" stroke-width="3" stroke-linejoin="round"/>
      <path d="M48 36 H112" stroke="#c99560" stroke-width="2" stroke-linecap="round"/>
      <path d="M34 104 C52 94 70 98 80 108 C90 98 108 94 126 104" fill="none" stroke="#5b8a3c" stroke-width="3" stroke-linecap="round"/>
      ${[[44, 100, -30], [56, 96, 20], [104, 96, -20], [116, 100, 30], [68, 100, -40], [92, 100, 40]].map(([x, y, r]) => `<ellipse cx="${x}" cy="${y}" rx="3.4" ry="7" transform="rotate(${r} ${x} ${y})" fill="#7fb35a"/>`).join('')}`,
  },
  {
    id: 'luminaBomDia',
    rotulo: ['Bom dia!', 'Good morning!', '¡Buenos días!'],
    desenho: () => `
      <g stroke="#ffb938" stroke-width="4" stroke-linecap="round">
        ${Array.from({ length: 9 }, (_, k) => { const a = Math.PI + (k / 8) * Math.PI; return `<path d="M${(80 + Math.cos(a) * 46).toFixed(1)} ${(84 + Math.sin(a) * 46).toFixed(1)} L${(80 + Math.cos(a) * 62).toFixed(1)} ${(84 + Math.sin(a) * 62).toFixed(1)}"/>`; }).join('')}
      </g>
      <circle cx="80" cy="84" r="38" fill="#ffcf4a" stroke="#f0a92a" stroke-width="3"/>
      <ellipse cx="68" cy="76" rx="3.6" ry="4.8" fill="#2b1d05"/><ellipse cx="92" cy="76" rx="3.6" ry="4.8" fill="#2b1d05"/>
      <ellipse cx="62" cy="86" rx="5" ry="3" fill="#f4978e" opacity=".6"/><ellipse cx="98" cy="86" rx="5" ry="3" fill="#f4978e" opacity=".6"/>
      <path d="M72 88 Q80 96 88 88" fill="none" stroke="#2b1d05" stroke-width="2.8" stroke-linecap="round"/>
      <path d="M8 118 C40 96 70 100 92 108 C112 100 136 98 152 110 V122 H8 Z" fill="#7fb35a" stroke="#5b8a3c" stroke-width="2.4" stroke-linejoin="round"/>
      <path d="M112 106 V90 L121 82 L130 90 V106 Z" fill="#fff8e8" stroke="#b98a5a" stroke-width="2" stroke-linejoin="round"/>
      <path d="M121 82 V72 M117 76 H125" stroke="#b98a5a" stroke-width="2" stroke-linecap="round"/>
      <rect x="118.5" y="96" width="5" height="10" rx="2.5" fill="#b98a5a"/>`,
  },
  {
    id: 'luminaBoaNoite',
    rotulo: ['Boa noite', 'Good night', 'Buenas noches'],
    desenho: () => `
      <circle cx="80" cy="62" r="56" fill="#1d2452" stroke="#d9ad4a" stroke-width="2.4"/>
      <path d="M58 24 a30 30 0 1 0 26 46 a24 24 0 1 1 -26 -46 Z" fill="#fff1c4"/>
      ${brilhinho(112, 30, 6, '#fff')}${brilhinho(126, 56, 4, '#fff')}${brilhinho(40, 96, 4, '#fff')}${brilhinho(100, 104, 3.4, '#fff')}
      ${desenhoDaLumiNaFigurinha(80, 50, 0.5, 'dormindo', null, 12)}
      <text x="116" y="46" font-family="Merriweather Sans, Arial, sans-serif" font-weight="800" font-size="12" fill="#e0f2fe">z</text>
      <text x="124" y="36" font-family="Merriweather Sans, Arial, sans-serif" font-weight="800" font-size="15" fill="#e0f2fe">z</text>
      <text x="133" y="24" font-family="Merriweather Sans, Arial, sans-serif" font-weight="800" font-size="18" fill="#e0f2fe">Z</text>`,
  },
  {
    id: 'luminaObrigado',
    rotulo: ['Obrigado!', 'Thank you!', '¡Gracias!'],
    desenho: () => desenhoDaLumiNaFigurinha(30, 4, 0.82, 'feliz', {
      frente: `${BRACO('M24 72 Q36 92 46 98', [46, 98])}${BRACO('M96 72 Q84 92 74 98', [74, 98])}
        <path d="M60 116 C40 100 34 90 40 82 C45 75 55 76 60 84 C65 76 75 75 80 82 C86 90 80 100 60 116 Z" fill="#e2546a" stroke="#a8273d" stroke-width="2.4" stroke-linejoin="round"/>
        <path d="M46 86 C48 82 52 82 54 84" fill="none" stroke="#ffd0d8" stroke-width="2.4" stroke-linecap="round"/>`,
    }) + brilhinho(24, 26, 8) + brilhinho(136, 34, 7),
  },
  {
    id: 'luminaAveMaria',
    rotulo: ['Ave Maria', 'Hail Mary', 'Ave María'],
    desenho: () => `
      <path d="M80 98 C60 84 44 72 42 56 C40 42 50 32 62 32 C70 32 76 36 80 44 C84 36 90 32 98 32 C110 32 120 42 118 56 C116 72 100 84 80 98 Z" fill="#e9f0ff" opacity=".9"/>
      ${coracaoDeContas()}
      <path d="M80 104 V112" stroke="#1d3a78" stroke-width="2"/>
      <path d="M80 112 V130 M73 118 H87" stroke="#d9ad4a" stroke-width="4.4" stroke-linecap="round"/>
      <text x="80" y="66" text-anchor="middle" font-family="Cormorant Garamond, Georgia, serif" font-weight="700" font-size="30" fill="#2f5bb3">M</text>
      ${brilhinho(80, 30, 5, '#fff')}`,
  },
  {
    id: 'luminaKkk',
    rotulo: ['Kkkk', 'Haha', 'Jajaja'],
    desenho: () => desenhoDaLumiNaFigurinha(30, 6, 0.82, 'rindo', {
      atras: `${BRACO('M22 70 Q10 82 14 96', [14, 98])}${BRACO('M98 70 Q110 82 106 96', [106, 98])}`,
    }, 12) + '<path d="M18 30 l8 6 M14 44 l9 2 M142 28 l-8 6 M146 42 l-9 2" stroke="#d9ad4a" stroke-width="3" stroke-linecap="round"/>',
  },
  {
    id: 'luminaFicaComDeus',
    rotulo: ['Fica com Deus', 'Go with God', 'Ve con Dios'],
    desenho: () => desenhoDaLumiNaFigurinha(26, 10, 0.8, 'piscando', {
      atras: `${BRACO('M98 60 Q114 48 112 32', [112, 29])}`,
      frente: `${BRACO('M22 72 Q14 82 16 94', [16, 96])}`,
    }) + '<path d="M128 22 q6 6 0 12 M136 16 q10 10 0 22" fill="none" stroke="#d9ad4a" stroke-width="3" stroke-linecap="round"/>'
      + '<path d="M30 20 V40 M23 27 H37" stroke="#d9ad4a" stroke-width="4" stroke-linecap="round"/>',
  },
  {
    id: 'luminaNiver',
    rotulo: ['Feliz aniversário!', 'Happy birthday!', '¡Feliz cumpleaños!'],
    desenho: () => `
      <rect x="36" y="76" width="88" height="40" rx="8" fill="#fff3d6" stroke="#d6b77a" stroke-width="2.4"/>
      <path d="M36 84 C44 92 50 84 56 90 C62 96 68 84 74 90 C80 96 86 84 92 90 C98 96 104 84 110 90 C116 96 120 86 124 84 V80 C124 78 122 76 120 76 H40 C38 76 36 78 36 80 Z" fill="#f29bb2"/>
      <rect x="52" y="48" width="56" height="30" rx="7" fill="#fff8e8" stroke="#d6b77a" stroke-width="2.4"/>
      <path d="M52 56 C58 62 62 54 68 60 C74 66 80 54 86 60 C92 66 98 54 108 58 V54 C108 51 106 48 103 48 H57 C54 48 52 51 52 54 Z" fill="#9fd0f5"/>
      ${[66, 80, 94].map((x) => `<rect x="${x - 2.5}" y="32" width="5" height="17" rx="2" fill="#7aa6ec" stroke="#2f5bb3" stroke-width="1"/><path d="M${x} 20 C${x + 4} 26 ${x + 4} 29 ${x} 31 C${x - 4} 29 ${x - 4} 26 ${x} 20 Z" fill="#f7a531"/>`).join('')}
      <circle cx="26" cy="40" r="3.4" fill="#f29bb2"/><circle cx="136" cy="44" r="3.4" fill="#7fb35a"/><circle cx="30" cy="70" r="2.8" fill="#7aa6ec"/><circle cx="132" cy="70" r="2.8" fill="#ffcf4a"/>
      ${brilhinho(122, 22, 7)}${brilhinho(40, 18, 6, '#fff3c4')}`,
  },
];

const POSICAO_DO_IDIOMA_DAS_FIGURINHAS = { pt: 0, en: 1, es: 2 };

function ehFigurinhaDoLumina(id) {
  return typeof id === 'string' && FIGURINHAS_DO_LUMINA.some((f) => f.id === id);
}

function rotuloDaFigurinha(figurinha) {
  const idioma = typeof idiomaAtual === 'string' ? idiomaAtual : 'pt';
  return figurinha.rotulo[POSICAO_DO_IDIOMA_DAS_FIGURINHAS[idioma] || 0];
}

function escaparRotuloDaFigurinha(texto) {
  return String(texto).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
}

function svgDaFigurinha(id) {
  const figurinha = FIGURINHAS_DO_LUMINA.find((f) => f.id === id);
  if (!figurinha) return '';
  const rotulo = rotuloDaFigurinha(figurinha);
  const largura = rotulo.length * 9.4;
  const ajuste = largura > 116 ? ' textLength="116" lengthAdjust="spacingAndGlyphs"' : '';
  return `<svg class="figurinha-lumina-svg" viewBox="0 0 160 160" role="img" aria-label="${escaparRotuloDaFigurinha(rotulo)}">
    <g class="figurinha-lumina-arte">${figurinha.desenho()}</g>
    <g transform="rotate(-4 80 138)">
      <rect x="16" y="123" width="128" height="30" rx="15" fill="#fffaf0" stroke="#d9ad4a" stroke-width="2.6"/>
      <text x="80" y="143.5" text-anchor="middle" font-family="Merriweather Sans, Manrope, Arial, sans-serif" font-weight="800" font-size="16" fill="#3a2410"${ajuste}>${escaparRotuloDaFigurinha(rotulo)}</text>
    </g>
  </svg>`;
}
