const FIGURINHAS = [
  { id: 'amem', rotulo: 'Amém', letra: 17, fundo: ['#2b3a5c', '#0f172a'], simbolo: 'estrela', animacao: 'brilho' },
  { id: 'rezando-por-voce', rotulo: 'Rezando por você', letra: 11.5, fundo: ['#3b2f14', '#140f06'], simbolo: 'vela', animacao: 'chama' },
  { id: 'deus-abencoe', rotulo: 'Deus abençoe', letra: 13.5, fundo: ['#1e3a5f', '#0b1a2e'], simbolo: 'pomba', animacao: 'voo' },
  { id: 'gloria-a-deus', rotulo: 'Glória a Deus!', letra: 13, fundo: ['#f59e0b', '#b45309'], simbolo: 'sol', animacao: 'gira' },
  { id: 'bom-dia', rotulo: 'Bom dia!', letra: 15.5, fundo: ['#fcd34d', '#f97316'], simbolo: 'amanhecer' },
  { id: 'boa-noite', rotulo: 'Boa noite', letra: 15.5, fundo: ['#3730a3', '#0f172a'], simbolo: 'lua', animacao: 'brilho' },
  { id: 'obrigado', rotulo: 'Obrigado!', letra: 15, fundo: ['#fb7185', '#be123c'], simbolo: 'coracao', animacao: 'bate' },
  { id: 'paz-e-bem', rotulo: 'Paz e bem', letra: 15, fundo: ['#7c5a2e', '#3b2a12'], simbolo: 'tau' },
  { id: 'vamos-rezar', rotulo: 'Vamos rezar o terço', letra: 10.5, fundo: ['#2d1f3d', '#150d20'], simbolo: 'terco' },
  { id: 'fe', rotulo: 'Fé', letra: 18, fundo: ['#1e3a8a', '#0f172a'], simbolo: 'cruz', animacao: 'brilho' },
  { id: 'parabens', rotulo: 'Parabéns!', letra: 15, fundo: ['#14b8a6', '#0f766e'], simbolo: 'festa', animacao: 'brilho' },
  { id: 'aleluia', rotulo: 'Aleluia!', letra: 16, fundo: ['#fde68a', '#d4af37'], simbolo: 'raios', animacao: 'gira' },
];

const EMOJIS_DO_CENACULO = [
  '🙏', '✝️', '🕊️', '📿', '🕯️', '⛪', '📖', '😇',
  '❤️', '💛', '🤍', '🥰', '😊', '🙂', '😍', '🤗',
  '😂', '😅', '😉', '🤔', '😮', '😢', '🙌', '👏',
  '👍', '🤝', '👋', '💪', '🌟', '✨', '🔥', '🌹',
  '🌸', '☀️', '🌙', '🎉', '🎂', '☕',
];

let contadorDeFigurinhas = 0;

function simboloDaFigurinha(simbolo) {
  const icone = (nome, cor) => `<svg x="32" y="22" width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="${cor}" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><use href="#icone-${nome}"></use></svg>`;
  switch (simbolo) {
    case 'estrela':
      return '<path d="M60 16 C62 40 70 48 94 50 C70 52 62 60 60 84 C58 60 50 52 26 50 C50 48 58 40 60 16 Z" fill="#f5d77a"/><path d="M84 22 C85 28 87 30 93 31 C87 32 85 34 84 40 C83 34 81 32 75 31 C81 30 83 28 84 22 Z" fill="#fff6d5"/>';
    case 'vela':
      return '<rect x="50" y="46" width="20" height="34" rx="3" fill="#fdf6e3"/><path d="M60 43 v4" stroke="#3b2f14" stroke-width="2"/><g class="fig-anim-chama"><path d="M60 20 C69 31 70 38 60 44 C50 38 51 31 60 20 Z" fill="#fbbf24"/><path d="M60 29 C64 34 64 38 60 41 C56 38 56 34 60 29 Z" fill="#fff6d5"/></g>';
    case 'pomba':
      return `<g class="fig-anim-voo">${icone('pomba', '#ffffff')}</g>`;
    case 'sol':
      return '<g class="fig-anim-gira"><circle cx="60" cy="50" r="15" fill="#fff6d5"/><g stroke="#fff6d5" stroke-width="4" stroke-linecap="round"><path d="M60 18 v8"/><path d="M60 74 v8"/><path d="M28 50 h8"/><path d="M84 50 h8"/><path d="M37 27 l6 6"/><path d="M77 67 l6 6"/><path d="M83 27 l-6 6"/><path d="M43 67 l-6 6"/></g></g>';
    case 'amanhecer':
      return '<path d="M30 66 A30 30 0 0 1 90 66 Z" fill="#fff6d5"/><g stroke="#fff6d5" stroke-width="4" stroke-linecap="round"><path d="M60 22 v10"/><path d="M32 36 l7 7"/><path d="M88 36 l-7 7"/><path d="M20 58 h9"/><path d="M91 58 h9"/></g><path d="M22 70 h76" stroke="#fff" stroke-width="4" stroke-linecap="round"/>';
    case 'lua':
      return '<path d="M70 20 A32 32 0 1 0 88 64 A25 25 0 1 1 70 20 Z" fill="#fde68a"/><path d="M34 28 C35 32 36 33 40 34 C36 35 35 36 34 40 C33 36 32 35 28 34 C32 33 33 32 34 28 Z" fill="#fff6d5"/><path d="M86 30 C87 33 88 34 91 35 C88 36 87 37 86 40 C85 37 84 36 81 35 C84 34 85 33 86 30 Z" fill="#fff6d5"/>';
    case 'coracao':
      return '<g class="fig-anim-bate"><path d="M60 80 C30 60 24 42 36 31 C46 23 57 29 60 37 C63 29 74 23 84 31 C96 42 90 60 60 80 Z" fill="#fff1f2"/></g>';
    case 'tau':
      return '<rect x="34" y="24" width="52" height="13" rx="3" fill="#f5d77a"/><rect x="53.5" y="24" width="13" height="56" rx="3" fill="#f5d77a"/>';
    case 'terco':
      return icone('terco', '#f5d77a');
    case 'cruz':
      return '<rect x="53.5" y="18" width="13" height="64" rx="3" fill="#f5d77a"/><rect x="36" y="34" width="48" height="13" rx="3" fill="#f5d77a"/>';
    case 'festa':
      return '<path d="M60 18 C62 38 68 44 86 46 C68 48 62 54 60 74 C58 54 52 48 34 46 C52 44 58 38 60 18 Z" fill="#fff6d5"/><circle cx="32" cy="28" r="4" fill="#fde68a"/><circle cx="90" cy="26" r="4" fill="#fbcfe8"/><circle cx="92" cy="70" r="3.5" fill="#bfdbfe"/><circle cx="28" cy="70" r="3.5" fill="#fbcfe8"/><path d="M40 16 l4 6" stroke="#fde68a" stroke-width="3" stroke-linecap="round"/><path d="M82 14 l-3 7" stroke="#bfdbfe" stroke-width="3" stroke-linecap="round"/>';
    case 'raios':
      return '<g class="fig-anim-gira"><g stroke="#fff6d5" stroke-width="3.5" stroke-linecap="round" opacity="0.9"><path d="M60 14 v12"/><path d="M60 74 v12"/><path d="M24 50 h12"/><path d="M84 50 h12"/><path d="M35 25 l8 8"/><path d="M77 67 l8 8"/><path d="M85 25 l-8 8"/><path d="M43 67 l-8 8"/></g></g><path d="M60 30 C61 44 66 49 80 50 C66 51 61 56 60 70 C59 56 54 51 40 50 C54 49 59 44 60 30 Z" fill="#fff"/>';
    default:
      return '';
  }
}

function desenharFigurinha(id) {
  const figurinha = FIGURINHAS.find((f) => f.id === id);
  if (!figurinha) return '';
  contadorDeFigurinhas += 1;
  const gradiente = `figurinha-fundo-${contadorDeFigurinhas}`;
  const simbolo = simboloDaFigurinha(figurinha.simbolo);
  const animado = figurinha.animacao && !['vela', 'pomba', 'sol', 'coracao', 'raios'].includes(figurinha.simbolo)
    ? `<g class="fig-anim-${figurinha.animacao}">${simbolo}</g>`
    : simbolo;
  return `<svg class="figurinha-svg" viewBox="0 0 120 120" role="img" aria-label="${figurinha.rotulo}">
    <defs><radialGradient id="${gradiente}" cx="45%" cy="35%" r="75%"><stop offset="0%" stop-color="${figurinha.fundo[0]}"/><stop offset="100%" stop-color="${figurinha.fundo[1]}"/></radialGradient></defs>
    <circle cx="60" cy="52" r="46" fill="url(#${gradiente})" stroke="#ffffff" stroke-width="4"/>
    ${animado}
    <rect x="8" y="88" width="104" height="26" rx="13" fill="#ffffff"/>
    <text x="60" y="${105 + (figurinha.letra > 15 ? 1 : 0)}" text-anchor="middle" font-family="'Cormorant Garamond', Georgia, serif" font-weight="700" font-size="${figurinha.letra}" fill="#1e293b">${figurinha.rotulo}</text>
  </svg>`;
}

function rotuloDaFigurinha(id) {
  const figurinha = FIGURINHAS.find((f) => f.id === id);
  return figurinha ? figurinha.rotulo : '';
}
