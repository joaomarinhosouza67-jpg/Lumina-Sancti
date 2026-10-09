ENFEITES.moldura.push(
  { id: 'sao-miguel', nome: 'São Miguel Arcanjo', texto: 'Asas, escudo e a espada de luz do arcanjo', criancas: true, exclusivo: true },
  { id: 'arco-iris-da-foto', nome: 'Arco-íris', texto: 'As cores da promessa de Deus', criancas: true },
  { id: 'anjinhos', nome: 'Anjinhos', texto: 'Anjinhos voando em volta', criancas: true },
  { id: 'estrelinhas-coloridas', nome: 'Estrelinhas coloridas', texto: 'Estrelas de todas as cores girando', criancas: true },
  { id: 'pombinhas', nome: 'Pombinhas', texto: 'Duas pombinhas dando a volta', criancas: true },
  { id: 'folhas-de-outono', nome: 'Folhas de outono', texto: 'Folhas douradas caindo', criancas: true },
  { id: 'coracao-imaculado', nome: 'Coração Imaculado', texto: 'O coração de Maria cercado de rosas' },
  { id: 'luz-divina', nome: 'Luz divina', texto: 'Feixes de luz dando a volta', criancas: true },
);
ENFEITES.faixa.push(
  { id: 'sao-miguel-faixa', nome: 'São Miguel Arcanjo', texto: 'O arcanjo de espada erguida rasga as nuvens', criancas: true, exclusivo: true },
  { id: 'jardim-do-eden', nome: 'Jardim do Éden', texto: 'Árvores, flores e borboletas', criancas: true },
  { id: 'arca-de-noe', nome: 'Arca de Noé', texto: 'A arca nas ondas debaixo do arco-íris', criancas: true },
  { id: 'fundo-do-mar', nome: 'Fundo do mar', texto: 'Peixinhos e bolhas', criancas: true },
  { id: 'estrelinhas-do-ceu', nome: 'Estrelinhas do céu', texto: 'A lua sorrindo entre estrelas coloridas', criancas: true },
  { id: 'pentecostes-faixa', nome: 'Pentecostes', texto: 'Línguas de fogo descendo do céu' },
  { id: 'oliveiras-ao-luar', nome: 'Oliveiras ao luar', texto: 'O jardim das Oliveiras sob a lua' },
  { id: 'basilica', nome: 'Basílica ao entardecer', texto: 'A cúpula iluminada no fim da tarde' },
);
ENFEITES.efeito.push(
  { id: 'sao-miguel-entrada', nome: 'São Miguel Arcanjo', texto: 'O céu se abre entre relâmpagos e as asas aparecem', criancas: true, exclusivo: true },
  { id: 'bolhas', nome: 'Bolhas de sabão', texto: 'Bolhas coloridas subindo', criancas: true },
  { id: 'anjinhos-voando', nome: 'Anjinhos voando', texto: 'Anjinhos passando pela tela', criancas: true },
  { id: 'estrelinhas', nome: 'Estrelinhas coloridas', texto: 'Uma explosão de estrelinhas', criancas: true },
  { id: 'baloes', nome: 'Balões', texto: 'Balões coloridos subindo', criancas: true },
  { id: 'raios-da-misericordia', nome: 'Raios da Misericórdia', texto: 'Os raios vermelho e branco de Jesus Misericordioso' },
  { id: 'cometa', nome: 'Cometa', texto: 'Um cometa cruza o céu', criancas: true },
  { id: 'aleluia', nome: 'Aleluia', texto: 'Notas de ouro subindo como um canto', criancas: true },
);

function penaFina(L, w, angulo, grad, borda, recuo) {
  return `<g transform="rotate(${n1(angulo)}) translate(${n1(-recuo)} 0)"><path d="M0 0C${n1(-L * 0.25)} ${n1(-w)} ${n1(-L * 0.78)} ${n1(-w * 1.02)} ${n1(-L)} ${n1(-w * 0.15)}C${n1(-L * 0.84)} ${n1(w * 0.58)} ${n1(-L * 0.4)} ${n1(w * 0.75)} 0 0Z" fill="url(#${grad})" stroke="${borda}" stroke-width=".4"/><path d="M${n1(-L * 0.08)} 0Q${n1(-L * 0.5)} ${n1(-w * 0.18)} ${n1(-L * 0.93)} ${n1(-w * 0.2)}" fill="none" stroke="${borda}" stroke-width=".3" opacity=".7"/></g>`;
}

function penaLonga(L, angulo, grad, borda, largura) {
  const k = largura || 1;
  return `<g transform="rotate(${n1(angulo)})"><path d="M0 0C${n1(-L * 0.25)} ${n1(-L * 0.14 * k)} ${n1(-L * 0.7)} ${n1(-L * 0.18 * k)} ${n1(-L)} ${n1(-L * 0.035)}C${n1(-L * 0.72)} ${n1(L * 0.075 * k)} ${n1(-L * 0.28)} ${n1(L * 0.1 * k)} 0 0Z" fill="url(#${grad})" stroke="${borda}" stroke-width=".45"/><path d="M${n1(-L * 0.06)} ${n1(-L * 0.01)}Q${n1(-L * 0.5)} ${n1(-L * 0.085 * k)} ${n1(-L * 0.94)} ${n1(-L * 0.04)}" fill="none" stroke="${borda}" stroke-width=".35" opacity=".55"/></g>`;
}

function asaElegante() {
  const sombra = [[6, 26], [14, 33], [22, 41], [30, 49], [38, 56], [46, 62], [54, 67], [62, 69], [70, 66]];
  const primarias = [[2, 23], [10, 30], [18, 38], [26, 46], [34, 53], [42, 60], [50, 66], [58, 70], [66, 70]];
  const secundarias = [[0, 16], [12, 22], [24, 28], [36, 34], [48, 38], [60, 40]];
  const cobertas = [[-4, 10], [10, 13], [24, 16], [38, 18], [52, 19], [64, 18]];
  return '<ellipse cx="-22" cy="-27" rx="46" ry="21" transform="rotate(52 -22 -27)" fill="url(#gl)"/>'
    + sombra.map(([a, L]) => penaLonga(L, a, 'pf', '#6f84a8', 1)).join('')
    + primarias.map(([a, L]) => penaLonga(L, a, 'pg', '#8ea4c6', 1.05)).join('')
    + secundarias.map(([a, L]) => penaLonga(L, a, 'ps', '#9fb3d1', 1.15)).join('')
    + cobertas.map(([a, L]) => penaLonga(L, a, 'pk', '#b4c3da', 1.3)).join('');
}

function membro(x1, y1, x2, y2, w1, w2, cor, bojo) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const L = Math.hypot(dx, dy) || 1;
  const nx = -dy / L;
  const ny = dx / L;
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  const b = bojo || 1.2;
  const m = Math.max(w1, w2) / 2;
  const p = (x, y) => `${n1(x)} ${n1(y)}`;
  return `<circle cx="${n1(x1)}" cy="${n1(y1)}" r="${n1(w1 / 2)}" fill="${cor}"/><circle cx="${n1(x2)}" cy="${n1(y2)}" r="${n1(w2 / 2)}" fill="${cor}"/><path d="M${p(x1 + nx * w1 / 2, y1 + ny * w1 / 2)}Q${p(mx + nx * m * b, my + ny * m * b)} ${p(x2 + nx * w2 / 2, y2 + ny * w2 / 2)}A${n1(w2 / 2)} ${n1(w2 / 2)} 0 0 1 ${p(x2 - nx * w2 / 2, y2 - ny * w2 / 2)}Q${p(mx - nx * m * 1.05, my - ny * m * 1.05)} ${p(x1 - nx * w1 / 2, y1 - ny * w1 / 2)}A${n1(w1 / 2)} ${n1(w1 / 2)} 0 0 1 ${p(x1 + nx * w1 / 2, y1 + ny * w1 / 2)}Z" fill="${cor}"/>`;
}

function anjinho(x, y, escala, atraso) {
  return `<g transform="translate(${x} ${y}) scale(${escala})"><g class="enf-flutua" style="animation-delay:${atraso}s">
    <path d="M-2 1C-7 -4 -11 -1 -10 3C-7 4 -4 3 -2 1Z" fill="#e0f2fe" stroke="#93c5fd" stroke-width=".4"/>
    <path d="M2 1C7 -4 11 -1 10 3C7 4 4 3 2 1Z" fill="#e0f2fe" stroke="#93c5fd" stroke-width=".4"/>
    <circle cx="0" cy="0" r="3.4" fill="#fde7c7"/><path d="M-3 4C-2 9 2 9 3 4Z" fill="#fef9c3"/>
    <ellipse cx="0" cy="-5.2" rx="3.4" ry="1" fill="none" stroke="#facc15" stroke-width=".9"/>
    <circle cx="-1.1" cy="-.2" r=".4" fill="#3f3f46"/><circle cx="1.1" cy="-.2" r=".4" fill="#3f3f46"/><path d="M-1 1.3Q0 2 1 1.3" stroke="#e11d48" stroke-width=".4" fill="none"/>
  </g></g>`;
}

function pombinha(cor) {
  return `<g fill="${cor}"><path d="M-6 0C-9 -2 -11 -6 -9 -8C-6 -6 -3 -3 -1 -1Z"/><path d="M6 0C9 -2 11 -6 9 -8C6 -6 3 -3 1 -1Z"/><ellipse cx="0" cy="0" rx="5" ry="2.6"/><circle cx="4.5" cy="-1.2" r="1.8"/><path d="M6 -1.3L8 -.8L6 -.3Z" fill="#f59e0b"/><path d="M-5 0L-9 2L-5 1.5Z"/></g>`;
}

function folhaDeOutono(cor) {
  return `<path d="M0 -5C3 -3 4 1 0 5C-4 1 -3 -3 0 -5Z" fill="${cor}"/><path d="M0 -4V5" stroke="#78350f" stroke-width=".4"/>`;
}

const DEFS_DO_ARCANJO = `<defs>
  <linearGradient id="ou" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff6cf"/><stop offset=".22" stop-color="#eebf4a"/><stop offset=".42" stop-color="#8a5a0a"/><stop offset=".6" stop-color="#f7d774"/><stop offset=".8" stop-color="#b07a12"/><stop offset="1" stop-color="#5c3a04"/></linearGradient>
  <linearGradient id="oc" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fffbea"/><stop offset=".5" stop-color="#f5cf5a"/><stop offset="1" stop-color="#9a6a0e"/></linearGradient>
  <linearGradient id="pm" x1="1" y1="0" x2="0" y2="0"><stop offset="0" stop-color="#b9c9e2"/><stop offset=".35" stop-color="#ffffff"/><stop offset=".85" stop-color="#fdf6e3"/><stop offset="1" stop-color="#f3d78a"/></linearGradient>
  <linearGradient id="pf" x1="1" y1="0" x2="0" y2="0"><stop offset="0" stop-color="#7f93b8"/><stop offset=".4" stop-color="#dce6f5"/><stop offset=".9" stop-color="#f7ecd0"/><stop offset="1" stop-color="#e2b955"/></linearGradient>
  <linearGradient id="pc" x1="1" y1="0" x2="0" y2="0"><stop offset="0" stop-color="#e8eef8"/><stop offset=".6" stop-color="#ffffff"/><stop offset="1" stop-color="#fff3cf"/></linearGradient>
  <linearGradient id="po" x1="1" y1="0" x2="0" y2="0"><stop offset="0" stop-color="#fff7d6"/><stop offset=".55" stop-color="#f5cf5a"/><stop offset="1" stop-color="#c58a14"/></linearGradient>
  <linearGradient id="la" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#7dd3fc"/><stop offset=".45" stop-color="#ffffff"/><stop offset=".55" stop-color="#f0f9ff"/><stop offset="1" stop-color="#38bdf8"/></linearGradient>
  <radialGradient id="es" cx="38%" cy="30%" r="80%"><stop offset="0" stop-color="#7cb4ff"/><stop offset=".45" stop-color="#2353c9"/><stop offset="1" stop-color="#0d1f5c"/></radialGradient>
  <radialGradient id="ru" cx="35%" cy="30%" r="70%"><stop offset="0" stop-color="#ffd6d6"/><stop offset=".4" stop-color="#e11d48"/><stop offset="1" stop-color="#6b0f1a"/></radialGradient>
  <linearGradient id="ca" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ff9b8a"/><stop offset=".5" stop-color="#e2463b"/><stop offset="1" stop-color="#8f1d1d"/></linearGradient>
  <linearGradient id="cf" x1="1" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffab9c"/><stop offset=".45" stop-color="#ea5345"/><stop offset="1" stop-color="#8f1d1d"/></linearGradient>
  <linearGradient id="cd" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#7f1414"/><stop offset="1" stop-color="#b42318"/></linearGradient>
  <linearGradient id="ac" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f4f8ff"/><stop offset=".4" stop-color="#aec2de"/><stop offset=".8" stop-color="#4a6290"/><stop offset="1" stop-color="#26375c"/></linearGradient>
  <linearGradient id="sa" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f8fafc"/><stop offset="1" stop-color="#9fb0cc"/></linearGradient>
  <linearGradient id="pe" gradientUnits="userSpaceOnUse" x1="-16" y1="-34" x2="16" y2="30"><stop offset="0" stop-color="#ffe6cc"/><stop offset=".5" stop-color="#eab489"/><stop offset="1" stop-color="#b9774f"/></linearGradient>
  <radialGradient id="cb" cx="35%" cy="30%" r="80%"><stop offset="0" stop-color="#f7d27a"/><stop offset=".6" stop-color="#c98b2e"/><stop offset="1" stop-color="#7c4a12"/></radialGradient>
  <linearGradient id="br" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fff6cf"/><stop offset=".5" stop-color="#e2ad3a"/><stop offset="1" stop-color="#7a4e05"/></linearGradient>
  <linearGradient id="te" gradientUnits="userSpaceOnUse" x1="0" y1="-13" x2="0" y2="14"><stop offset="0" stop-color="#7183ad"/><stop offset=".35" stop-color="#3a4a72"/><stop offset="1" stop-color="#121a33"/></linearGradient>
  <linearGradient id="nl" gradientUnits="userSpaceOnUse" x1="0" y1="-13" x2="0" y2="14"><stop offset="0" stop-color="#ffffff"/><stop offset=".3" stop-color="#fff1d6"/><stop offset=".7" stop-color="#f3b768"/><stop offset="1" stop-color="#b86a23"/></linearGradient>
  <linearGradient id="pg" x1="1" y1="0" x2="0" y2="0"><stop offset="0" stop-color="#b8cbe6"/><stop offset=".3" stop-color="#f4f8ff"/><stop offset=".75" stop-color="#fffaf0"/><stop offset="1" stop-color="#f2cf74"/></linearGradient>
  <linearGradient id="ps" x1="1" y1="0" x2="0" y2="0"><stop offset="0" stop-color="#d3e0f2"/><stop offset=".4" stop-color="#ffffff"/><stop offset="1" stop-color="#fff1cc"/></linearGradient>
  <linearGradient id="pk" x1="1" y1="0" x2="0" y2="0"><stop offset="0" stop-color="#e9f0fa"/><stop offset="1" stop-color="#ffffff"/></linearGradient>
  <radialGradient id="gl" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#ffffff" stop-opacity=".42"/><stop offset=".6" stop-color="#dbeafe" stop-opacity=".16"/><stop offset="1" stop-color="#dbeafe" stop-opacity="0"/></radialGradient>
  <radialGradient id="ra" gradientUnits="userSpaceOnUse" cx="0" cy="0" r="240"><stop offset="0" stop-color="#fffbeb" stop-opacity=".42"/><stop offset=".35" stop-color="#fde68a" stop-opacity=".16"/><stop offset="1" stop-color="#fde68a" stop-opacity="0"/></radialGradient>
</defs>`;

const PECAS_DO_ARCANJO = {};

function pecaDoArcanjo(chave, caixa, desenho) {
  if (!PECAS_DO_ARCANJO[chave]) {
    PECAS_DO_ARCANJO[chave] = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="${caixa.join(' ')}">${DEFS_DO_ARCANJO}${desenho()}</svg>`)}`;
  }
  const [x, y, w, h] = caixa;
  return `<image href="${PECAS_DO_ARCANJO[chave]}" x="${x}" y="${y}" width="${w}" height="${h}"/>`;
}

function corpoDaNuvem(grad, base) {
  const bolas = [[-28, 6, 4.5], [-20, 3, 6.5], [-10, -1, 8.5], [2, -3, 9.5], [14, -1, 8], [24, 3, 6], [32, 6, 4], [-4, 5, 7], [8, 5, 7]];
  return `<rect x="-32" y="6" width="68" height="8" rx="4" fill="${base}"/>${bolas.map(([bx, by, r]) => `<circle cx="${bx}" cy="${by}" r="${r}" fill="url(#${grad})"/>`).join('')}`;
}

function nuvemFofa(x, y, escala, peca, d, a) {
  return `<g class="enf-nuvem" style="--d:${d}s;--a:-${a}s"><g transform="translate(${x} ${y}) scale(${escala})">${peca}</g></g>`;
}

const PECAS_DA_MOLDURA_DO_ARCANJO = {
  asa: () => asaElegante(),
  espada: () => `<path d="M0 -42L2.7 -33.5V6.5H-2.7V-33.5Z" fill="url(#la)" stroke="#0c4a6e" stroke-width=".3"/>
    <path d="M0 -36V5" stroke="#e0f2fe" stroke-width=".7"/>
    <path d="M-1.7 8.5H1.7V15.5H-1.7Z" fill="#7c2d12"/><path d="M-1.7 10.2L1.7 11.2M-1.7 12.4L1.7 13.4" stroke="#c2410c" stroke-width=".45"/>
    <path d="M-13 7.2C-9 4.6 9 4.6 13 7.2C9 10 -9 10 -13 7.2Z" fill="url(#ou)" stroke="#5c3a04" stroke-width=".45"/>
    <circle cx="-13.4" cy="7.2" r="1.8" fill="url(#oc)" stroke="#5c3a04" stroke-width=".35"/><circle cx="13.4" cy="7.2" r="1.8" fill="url(#oc)" stroke="#5c3a04" stroke-width=".35"/>
    <circle cx="0" cy="7.3" r="2.3" fill="url(#ru)" stroke="#5c3a04" stroke-width=".4"/><circle cx="-.7" cy="6.5" r=".6" fill="#fff" opacity=".9"/>`,
  anel: () => {
    let rebites = '';
    [30, 60, 120, 150, 210, 240, 300, 330].forEach((a) => {
      const [x, y] = pontoNoCirculo(53, a);
      rebites += `<path d="M${n1(x)} ${n1(y - 1.5)}L${n1(x + 1.5)} ${n1(y)}L${n1(x)} ${n1(y + 1.5)}L${n1(x - 1.5)} ${n1(y)}Z" fill="url(#oc)" stroke="#5c3a04" stroke-width=".35"/>`;
    });
    return `<circle cx="68" cy="69.3" r="53" fill="none" stroke="#060a1e" stroke-width="5.6" opacity=".45"/>
      <circle cx="68" cy="68" r="53" fill="none" stroke="url(#ou)" stroke-width="5.4"/>
      <circle cx="68" cy="68" r="49.4" fill="none" stroke="#050817" stroke-width="2.2" opacity=".28"/>
      <circle cx="68" cy="68" r="50.6" fill="none" stroke="#4a2f03" stroke-width=".7"/>
      <circle cx="68" cy="68" r="55.6" fill="none" stroke="#fff3c4" stroke-width=".55" opacity=".85"/>
      <circle cx="68" cy="68" r="53" fill="none" stroke="#fff6d5" stroke-width=".45" stroke-dasharray="1.2 3.2" opacity=".55"/>${rebites}`;
  },
  fita: () => `<path d="M62 117C47 121 32 116 21 103L11 102L16 107.5L10 113L20 112.5C32 124 47 130 62 126Z" fill="url(#ca)" stroke="#5f0f0f" stroke-width=".5"/>
    <path d="M62 121.5C48 125 34 121 22.5 109.5" fill="none" stroke="url(#cd)" stroke-width="2.2" opacity=".75"/>
    <path d="M60 118.4C47 122 33 117.5 22.5 105" fill="none" stroke="#ffc2b8" stroke-width=".6" opacity=".8"/>`,
  escudo: () => `<path d="M-12.5 -11H12.5V1.5C12.5 10 6.5 15 0 18.3C-6.5 15 -12.5 10 -12.5 1.5Z" fill="#060a1e" opacity=".45"/>
    <path d="M-12.5 -12.5H12.5V0C12.5 8.5 6.5 13.5 0 16.8C-6.5 13.5 -12.5 8.5 -12.5 0Z" fill="url(#es)" stroke="url(#ou)" stroke-width="1.8"/>
    <g stroke="#fde68a" stroke-width=".4" opacity=".55">${[0, 30, 60, 90, 120, 150].map((a) => `<path d="M0 0L${n1(Math.cos((a * Math.PI) / 180) * 10)} ${n1(Math.sin((a * Math.PI) / 180) * 10)}M0 0L${n1(-Math.cos((a * Math.PI) / 180) * 10)} ${n1(-Math.sin((a * Math.PI) / 180) * 10)}"/>`).join('')}</g>
    <path d="M-1.4 -9H1.4V-2.8H6.4V0H1.4V10.5H-1.4V0H-6.4V-2.8H-1.4Z" fill="url(#oc)" stroke="#5c3a04" stroke-width=".35"/>
    <path d="M-10.5 -10.5H10.5V-5C4 -7.5 -4 -7.5 -10.5 -3Z" fill="#fff" opacity=".18"/>`,
};

const PECAS_DA_FAIXA_DO_ARCANJO = {
  raios: () => `<g fill="url(#ra)">${[-150, -128, -104, -82, -58, -36, -12, 14, 38, 62, 90, 118, 142, 166].map((a, i) => {
    const r = (a * Math.PI) / 180;
    const abertura = (i % 3 === 0 ? 5 : 3) * (Math.PI / 180);
    return `<path d="M0 0L${n1(Math.cos(r - abertura) * 260)} ${n1(Math.sin(r - abertura) * 260)}L${n1(Math.cos(r + abertura) * 260)} ${n1(Math.sin(r + abertura) * 260)}Z"/>`;
  }).join('')}</g>`,
  nuvemEscura: () => corpoDaNuvem('te', '#121a33'),
  nuvemClara: () => corpoDaNuvem('nl', '#c47a33'),
  asa: () => asaElegante(),
  capa: () => `<path d="M-6 -18.6C-11 -18 -16.5 -14 -19.5 -7C-22 -1 -24 6 -27.5 10.5C-22.5 11 -18.2 8.2 -15.6 4.6C-15 9.2 -16.6 13.8 -19.4 17.4C-13.6 16.4 -9.6 11 -8 5C-7 0 -6.6 -6 -5.4 -12Z" fill="url(#cf)" stroke="#6b1414" stroke-width=".35"/>
    <path d="M-9.6 -14C-13 -8 -14.8 -2 -15.6 4.6M-7.8 -9C-9.6 -2 -10.6 4 -12.6 9.6" fill="none" stroke="#8f1d1d" stroke-width=".55" opacity=".75"/>
    <path d="M-7.4 -17.6C-12 -16 -15.8 -11 -18 -5.6" fill="none" stroke="#ffc4b9" stroke-width=".45" opacity=".9"/>`,
  corpo: () => `<path d="M7.4 -18.6C11.6 -17.6 14.4 -13.6 15 -8.6C15.6 -4 14.2 0 13.4 3C12.4 -.6 10.6 -3.6 8.4 -5.6C9.4 -9 8.8 -13.6 7.4 -18.6Z" fill="url(#cf)" stroke="#6b1414" stroke-width=".35"/>
    ${membro(3.6, 5.6, 6.8, 15.6, 3.9, 2.8, 'url(#pe)', 1.25)}${membro(6.8, 15.6, 9.6, 24.2, 2.8, 1.9, 'url(#pe)', 1.3)}
    <path d="M8.6 24L13 25.2Q13.8 26.6 12.2 27.1L8.2 26.6Z" fill="#a16207"/><path d="M7.9 21.2Q9 20.6 10.1 21.4M8.4 23.2Q9.4 22.6 10.5 23.3" fill="none" stroke="#b7862b" stroke-width=".4"/>
    ${membro(-2.6, 5.6, -6.6, 16.2, 4, 2.9, 'url(#pe)', 1.25)}${membro(-6.6, 16.2, -8, 26.2, 2.9, 1.9, 'url(#pe)', 1.3)}
    <path d="M-8.8 25.8L-13 27.4Q-13.2 28.9 -11.2 28.9L-6.2 28.4L-6.6 25.9Z" fill="#a16207"/><path d="M-8.8 22.6Q-7.6 22 -6.4 22.8M-8.9 24.6Q-7.7 24 -6.5 24.8" fill="none" stroke="#b7862b" stroke-width=".4"/>
    <path d="M-4.6 -3.4H5.8L9.4 6.4Q8 7.8 6.4 6.6Q5 8.2 3.4 6.8Q1.8 8.4 .4 6.8Q-1.2 8.4 -2.6 6.8Q-4 8.2 -5.6 6.6Q-7 7.6 -8.2 6.4Z" fill="url(#sa)" stroke="#7b8db0" stroke-width=".3"/>
    <path d="M-2 -3V6.6M1.2 -3V6.9M4 -3V6.6M-4.8 -2V6.2M6.8 -2V6.2" stroke="#8a9bbd" stroke-width=".3"/>
    <path d="M-6.4 -18.4C-7.4 -12 -6 -7.2 -4.2 -3.6H5.4C7 -7.2 8.2 -12 7.2 -18.4C3.2 -19.8 -2.4 -19.8 -6.4 -18.4Z" fill="url(#ac)" stroke="#26375c" stroke-width=".35"/>
    <path d="M-4 -14Q.6 -12 5 -14M.6 -11.4V-5M-3 -8.6Q.6 -7.4 4.2 -8.6" fill="none" stroke="#3b5179" stroke-width=".35" opacity=".8"/>
    <path d="M-5.2 -17C-3 -18.2 0 -18.4 2 -18" fill="none" stroke="#ffffff" stroke-width=".5" opacity=".8"/>
    <path d="M-6 -17.5L5.4 -4.4L4 -3.4L-6.8 -15.4Z" fill="#f9a8a0" stroke="#c2413b" stroke-width=".25"/>
    <path d="M-4.4 -4.6H5.6V-3H-4.4Z" fill="url(#ou)"/>
    ${membro(7.6, -17, 10.6, -10, 3, 2.4, 'url(#pe)', 1.3)}${membro(10.6, -10, 12.4, -3.8, 2.4, 1.8, 'url(#pe)', 1.2)}
    ${membro(11.3, -7.6, 12.1, -5, 2.3, 2.1, 'url(#br)', 1)}<circle cx="12.5" cy="-3.4" r="1.15" fill="url(#pe)"/>
    <ellipse cx="8" cy="-18.2" rx="2.7" ry="2.1" fill="url(#sa)" stroke="#7b8db0" stroke-width=".3"/>
    <path d="M-.8 -21H2V-18.4H-.8Z" fill="#d89b70"/>
    <ellipse cx=".6" cy="-24" rx="3" ry="3.6" fill="url(#pe)"/>
    <path d="M-3.6 -24.2C-4.8 -29 -1.6 -31.2 1 -30.8C4.2 -31 6 -28 4.6 -24.4C4.2 -26.6 2.6 -27.8 1 -27.6C-1 -28 -2.8 -26.8 -3.6 -24.2Z" fill="url(#cb)"/><circle cx="-4.2" cy="-27.4" r="1.2" fill="url(#cb)"/><circle cx="5" cy="-27.8" r="1.1" fill="url(#cb)"/><circle cx=".2" cy="-31.2" r="1.3" fill="url(#cb)"/><circle cx="4.8" cy="-23.4" r=".9" fill="url(#cb)"/>
    <circle cx="-3.6" cy="-25.6" r="1.3" fill="url(#cb)"/><circle cx="4.6" cy="-25.8" r="1.25" fill="url(#cb)"/><circle cx="-2.4" cy="-29.2" r="1.3" fill="url(#cb)"/><circle cx="2.8" cy="-30" r="1.25" fill="url(#cb)"/><circle cx="-3.9" cy="-23" r="1" fill="url(#cb)"/>
    <path d="M-.9 -24.5Q0 -25.1 .9 -24.6M1.9 -24.6Q2.8 -25.1 3.6 -24.5" fill="none" stroke="#8a5a1c" stroke-width=".32"/>
    <ellipse cx="0" cy="-23.4" rx=".55" ry=".34" fill="#2b1d12"/><ellipse cx="2.7" cy="-23.4" rx=".55" ry=".34" fill="#2b1d12"/>
    <path d="M1.4 -23.2L1.1 -22L1.7 -21.9" fill="none" stroke="#b9774f" stroke-width=".25"/>
    <path d="M.7 -20.9Q1.4 -20.6 2.1 -20.9" fill="none" stroke="#b4533c" stroke-width=".32"/>
    <ellipse cx="-.6" cy="-22" rx=".8" ry=".45" fill="#f08a7a" opacity=".35"/><ellipse cx="3.4" cy="-22" rx=".7" ry=".4" fill="#f08a7a" opacity=".35"/>
    <ellipse cx="-6.4" cy="-17.2" rx="2.8" ry="2.2" fill="url(#ac)" stroke="#26375c" stroke-width=".3"/>
    ${membro(-6.6, -17.2, -10.6, -24.6, 3.1, 2.5, 'url(#pe)', 1.3)}${membro(-10.6, -24.6, -12.4, -31, 2.5, 1.9, 'url(#pe)', 1.2)}
    ${membro(-11.3, -27.4, -12, -29.8, 2.4, 2.2, 'url(#br)', 1)}
    <ellipse cx="-7.6" cy="-18.8" rx="2.5" ry="1.9" fill="url(#sa)" stroke="#7b8db0" stroke-width=".3"/>`,
  espada: () => `<path d="M-.95 -2V-27.4L0 -30.6L.95 -27.4V-2Z" fill="url(#la)" stroke="#0c4a6e" stroke-width=".2"/>
    <path d="M0 -3V-27" stroke="#f0f9ff" stroke-width=".35"/>
    <path d="M-.55 -1H.55V3H-.55Z" fill="#7c2d12"/><circle cx="0" cy="3.7" r=".85" fill="url(#ou)"/>
    <path d="M-4.2 -1.6C-2 -2.7 2 -2.7 4.2 -1.6C2 -.6 -2 -.6 -4.2 -1.6Z" fill="url(#ou)" stroke="#5c3a04" stroke-width=".2"/>
    <circle cx="0" cy="-1.6" r=".6" fill="#e11d48"/>`,
};

Object.assign(MOLDURAS, {
  'sao-miguel'() {
    const g = { aura: idDoEnfeite('aura'), reflexo: idDoEnfeite('reflexo'), anel: idDoEnfeite('anel'), luz: idDoEnfeite('luz'), brilhoLamina: idDoEnfeite('brilho-lamina') };
    const P = PECAS_DA_MOLDURA_DO_ARCANJO;
    const asa = pecaDoArcanjo('m-asa', [-56, -76, 62, 86], P.asa);
    const fita = pecaDoArcanjo('m-fita', [6, 98, 60, 34], P.fita);
    return `<defs>
      <radialGradient id="${g.aura}" cx="50%" cy="50%" r="50%"><stop offset=".7" stop-color="#bfdbfe" stop-opacity="0"/><stop offset=".79" stop-color="#e0f2fe" stop-opacity=".5"/><stop offset="1" stop-color="#bfdbfe" stop-opacity="0"/></radialGradient>
      <radialGradient id="${g.luz}" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#ffffff" stop-opacity=".95"/><stop offset=".35" stop-color="#bae6fd" stop-opacity=".55"/><stop offset="1" stop-color="#7dd3fc" stop-opacity="0"/></radialGradient>
      <linearGradient id="${g.reflexo}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".5" stop-color="#fff" stop-opacity=".95"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>
      <linearGradient id="${g.brilhoLamina}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#7dd3fc" stop-opacity="0"/><stop offset=".5" stop-color="#e0f2fe" stop-opacity=".8"/><stop offset="1" stop-color="#7dd3fc" stop-opacity="0"/></linearGradient>
      <clipPath id="${g.anel}"><path clip-rule="evenodd" d="M68 12.2A55.8 55.8 0 1 1 67.99 12.2ZM68 17.7A50.3 50.3 0 1 0 68.01 17.7Z"/></clipPath>
    </defs>
    <circle cx="68" cy="68" r="70" fill="url(#${g.aura})" class="enf-respira" style="--d:3.6s"/>
    <g transform="translate(16 76) scale(.96)"><g class="enf-asa-sm">${asa}</g></g>
    <g transform="translate(120 76) scale(-.96 .96)"><g class="enf-asa-sm">${asa}</g></g>
    <g transform="translate(68 0)">
      <path d="M0 -50L9 6H-9Z" fill="url(#${g.brilhoLamina})" class="enf-respira" style="--d:1.7s"/>
      <ellipse cx="0" cy="-40" rx="7" ry="7" fill="url(#${g.luz})" class="enf-respira" style="--d:1.7s;--a:.4s"/>
      ${pecaDoArcanjo('m-espada', [-15, -44, 30, 62], P.espada)}
      <g class="enf-brilho-sobe"><path d="M0 -3.4C.25 -.5 .5 -.25 3.4 0C.5 .25 .25 .5 0 3.4C-.25 .5 -.5 .25 -3.4 0C-.5 -.25 -.25 -.5 0 -3.4Z" fill="#fff"/></g>
    </g>
    ${pecaDoArcanjo('m-anel', [0, 0, 136, 136], P.anel)}
    <g clip-path="url(#${g.anel})"><g transform="skewX(-22)"><rect class="enf-reflexo-passa" x="-30" y="-20" width="16" height="180" fill="url(#${g.reflexo})"/></g></g>
    <g><g class="enf-fita-sm">${fita}</g></g>
    <g transform="translate(136 0) scale(-1 1)"><g class="enf-fita-sm" style="--a:-1.7s">${fita}</g></g>
    <g transform="translate(68 125)">${pecaDoArcanjo('m-escudo', [-14, -14, 28, 34], P.escudo)}</g>
    <circle cx="25" cy="104" r=".9" fill="#fde68a" class="enf-sobe-lento" style="--d:5.5s"/>
    <circle cx="111" cy="106" r=".8" fill="#fde68a" class="enf-sobe-lento" style="--d:6.5s;--a:-2s"/>
    <circle cx="14" cy="92" r=".7" fill="#fff" class="enf-sobe-lento" style="--d:7s;--a:-4s"/>
    <circle cx="122" cy="94" r=".7" fill="#fff" class="enf-sobe-lento" style="--d:6s;--a:-1s"/>
    ${faisca(-6, 46, 3.2, '#fffbeb', 0.2)}${faisca(142, 50, 2.8, '#fffbeb', 1.1)}${faisca(68, -48, 3.6, '#e0f2fe', 0.7)}${faisca(30, 128, 2.4, '#fde68a', 1.7)}${faisca(108, 130, 2.2, '#fde68a', 2.3)}`;
  },

  'arco-iris-da-foto'() {
    const cores = ['#ef4444', '#f97316', '#facc15', '#22c55e', '#3b82f6', '#8b5cf6'];
    const aneis = cores.map((cor, i) => `<circle cx="68" cy="68" r="${n1(51 + i * 2.2)}" fill="none" stroke="${cor}" stroke-width="2.4"/>`).join('');
    return `${aneis}
    <g class="enf-flutua">${nuvem(26, 112, 0.9, '#ffffff', 1)}${nuvem(110, 112, 0.9, '#ffffff', 1)}</g>
    ${faisca(68, 4, 3, '#fffbeb', 0.2)}${faisca(14, 50, 2.4, '#fffbeb', 1)}${faisca(122, 50, 2.4, '#fffbeb', 1.8)}`;
  },

  anjinhos() {
    const ouro = idDoEnfeite('ouro');
    return `<defs><linearGradient id="${ouro}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fffbeb"/><stop offset="1" stop-color="#facc15"/></linearGradient></defs>
    <circle cx="68" cy="68" r="54" fill="none" stroke="url(#${ouro})" stroke-width="2.5"/>
    <circle cx="68" cy="68" r="54" fill="none" stroke="#fff" stroke-width=".8" stroke-dasharray="1 7"/>
    <g class="enf-gira" style="--d:18s">${anjinho(68, 12, 1.5, 0)}${anjinho(116, 96, 1.5, 0.8)}${anjinho(20, 96, 1.5, 1.6)}</g>`;
  },

  'estrelinhas-coloridas'() {
    const cores = ['#f472b6', '#facc15', '#60a5fa', '#4ade80', '#c084fc', '#fb923c', '#f87171', '#2dd4bf'];
    const estrelas = cores.map((cor, i) => {
      const [x, y] = pontoNoCirculo(56, i * 45);
      return `<g transform="translate(${n1(x)} ${n1(y)})"><g class="enf-cintila" style="--a:${n1(i * 0.3)}s"><path d="${caminhoDeEstrela(0, 0, 7, 3, 5)}" fill="${cor}" stroke="#fff" stroke-width=".6"/></g></g>`;
    }).join('');
    return `<circle cx="68" cy="68" r="56" fill="none" stroke="#fde68a" stroke-width="1.2" stroke-dasharray="2 4"/>
    <g class="enf-gira" style="--d:20s">${estrelas}</g>`;
  },

  pombinhas() {
    return `<circle cx="68" cy="68" r="54" fill="none" stroke="#bae6fd" stroke-width="2.4"/>
    <circle cx="68" cy="68" r="58" fill="none" stroke="#fff" stroke-width=".7" opacity=".7"/>
    <g class="enf-gira" style="--d:9s"><g transform="translate(68 10) scale(1.6)">${pombinha('#ffffff')}</g><g transform="translate(68 126) scale(-1.6 1.6)">${pombinha('#f1f5f9')}</g></g>
    ${faisca(20, 30, 2.4, '#fffbeb', 0.4)}${faisca(116, 104, 2.4, '#fffbeb', 1.5)}`;
  },

  'folhas-de-outono'() {
    const cores = ['#f59e0b', '#ea580c', '#dc2626', '#facc15', '#b45309'];
    let folhas = '';
    for (let i = 0; i < 20; i += 1) {
      const a = i * 18;
      const [x, y] = pontoNoCirculo(55, a);
      folhas += `<g transform="translate(${n1(x)} ${n1(y)}) rotate(${a + 60}) scale(1.4)">${folhaDeOutono(cores[i % cores.length])}</g>`;
    }
    const caindo = [[36, 118, 0], [92, 122, 1.6], [64, 128, 3]].map(([x, y, a], i) => `<g transform="translate(${x} ${y})"><g class="enf-cai" style="--a:${a}s">${folhaDeOutono(cores[i])}</g></g>`).join('');
    return `<circle cx="68" cy="68" r="55" fill="none" stroke="#92400e" stroke-width="2"/>${folhas}${caindo}`;
  },

  'coracao-imaculado'() {
    const ouro = idDoEnfeite('ouro');
    const coracao = idDoEnfeite('coracao');
    const fogo = idDoEnfeite('fogo');
    const brilho = idDoEnfeite('brilho');
    let rosas = '';
    for (let i = 0; i < 12; i += 1) {
      const [x, y] = pontoNoCirculo(55, i * 30 + 15);
      rosas += `<g transform="translate(${n1(x)} ${n1(y)})"><circle r="3.4" fill="#fecdd3"/><circle r="2.2" fill="#fb7185"/><circle r="1" fill="#be123c"/></g>`;
    }
    return `<defs>
      <linearGradient id="${ouro}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fffbeb"/><stop offset=".5" stop-color="#f5c542"/><stop offset="1" stop-color="#a16207"/></linearGradient>
      <radialGradient id="${coracao}" cx="40%" cy="35%" r="70%"><stop offset="0" stop-color="#fda4af"/><stop offset=".6" stop-color="#e11d48"/><stop offset="1" stop-color="#881337"/></radialGradient>
      <linearGradient id="${fogo}" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#f97316"/><stop offset="1" stop-color="#fde68a"/></linearGradient>
      ${filtroDeBrilho(brilho, 1.6)}
    </defs>
    <circle cx="68" cy="68" r="55" fill="none" stroke="url(#${ouro})" stroke-width="2.8"/>
    ${rosas}
    <g transform="translate(68 116)" filter="url(#${brilho})">
      <g transform="translate(0 -9)"><g class="enf-chama" style="--d:.45s"><path d="M0 0C-3 -3 -2 -7 0 -11C2 -7 3 -3 0 0Z" fill="url(#${fogo})"/></g></g>
      <path d="M0 9C-12 1 -11 -9 -5 -9C-2.5 -9 -.8 -7.5 0 -6C.8 -7.5 2.5 -9 5 -9C11 -9 12 1 0 9Z" fill="url(#${coracao})" class="enf-respira-local"/>
      <path d="M-11 -8L9 6" stroke="#cbd5e1" stroke-width="1.2"/><circle cx="-11" cy="-8" r="1.2" fill="url(#${ouro})"/>
    </g>`;
  },

  'luz-divina'() {
    const ouro = idDoEnfeite('ouro');
    const brilho = idDoEnfeite('brilho');
    let raios = '';
    for (let i = 0; i < 36; i += 1) {
      const [x1, y1] = pontoNoCirculo(57.5, i * 10);
      const [x2, y2] = pontoNoCirculo(i % 2 ? 62 : 66.5, i * 10);
      raios += `<path d="M${n1(x1)} ${n1(y1)}L${n1(x2)} ${n1(y2)}" stroke="${i % 2 ? '#fef3c7' : '#fcd34d'}" stroke-width="${i % 2 ? 0.9 : 1.6}" stroke-linecap="round"/>`;
    }
    return `<defs>
      <linearGradient id="${ouro}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fffbeb"/><stop offset=".5" stop-color="#facc15"/><stop offset="1" stop-color="#a16207"/></linearGradient>
      ${filtroDeBrilho(brilho, 1.3)}
    </defs>
    <g class="enf-gira" style="--d:36s"><g filter="url(#${brilho})" class="enf-respira" style="--d:2.6s">${raios}</g></g>
    <circle cx="68" cy="68" r="54" fill="none" stroke="url(#${ouro})" stroke-width="2.6"/>
    <circle cx="68" cy="68" r="51" fill="none" stroke="#fffbeb" stroke-width=".6" opacity=".7"/>
    ${faisca(68, 3, 2.6, '#fffbeb', 0.2)}${faisca(118, 96, 2.2, '#fffbeb', 1.1)}${faisca(18, 96, 2.2, '#fffbeb', 1.9)}`;
  },
});

Object.assign(FAIXAS, {
  'sao-miguel-faixa'() {
    const g = { ceu: idDoEnfeite('ceu'), gloria: idDoEnfeite('gloria'), halo: idDoEnfeite('halo'), brilhoLamina: idDoEnfeite('brilho-lamina') };
    const P = PECAS_DA_FAIXA_DO_ARCANJO;
    const escura = pecaDoArcanjo('f-nuvem-escura', [-38, -20, 76, 36], P.nuvemEscura);
    const clara = pecaDoArcanjo('f-nuvem-clara', [-38, -20, 76, 36], P.nuvemClara);
    const asaPeca = pecaDoArcanjo('f-asa', [-56, -76, 62, 86], P.asa);
    const asa = (x, espelho) => `<g transform="translate(${x} -15)${espelho ? ' scale(-1 1)' : ''}"><g class="enf-asa-sm"><g transform="rotate(-12) scale(.52)">${asaPeca}</g></g></g>`;
    let elos = '';
    for (let i = 0; i < 8; i += 1) elos += `<ellipse cx="${n1(i * 0.45)}" cy="${n1(1.2 + i * 1.9)}" rx="${i % 2 ? 0.45 : 0.95}" ry="${i % 2 ? 0.95 : 0.55}" fill="none" stroke="#9ca3af" stroke-width=".42"/>`;
    const sorteio = sorteioFixo(31);
    let brasas = '';
    for (let i = 0; i < 14; i += 1) brasas += `<circle cx="${n1(180 + sorteio() * 140)}" cy="${n1(70 + sorteio() * 12)}" r="${n1(0.35 + sorteio() * 0.6)}" fill="${i % 3 ? '#fde68a' : '#ffffff'}" class="enf-sobe-lento" style="--d:${n1(4 + sorteio() * 4)}s;--a:-${n1(sorteio() * 8)}s"/>`;
    const pena = pecaDoArcanjo('f-pena', [-17, -5, 18, 10], () => penaFina(16, 3.6, 0, 'pc', '#a3b1c9', 0));
    const penasCaindo = [[214, -6, 0], [292, -10, 2.4], [178, -4, 4.6]].map(([x, y, a]) => `<g transform="translate(${x} ${y})"><g class="enf-cai-longo" style="--d:8s;--a:-${a}s"><g transform="rotate(60) scale(.45)">${pena}</g></g></g>`).join('');
    return `<defs>
      <linearGradient id="${g.ceu}" x1="0" y1="0" x2=".35" y2="1"><stop offset="0" stop-color="#050816"/><stop offset=".55" stop-color="#121a42"/><stop offset="1" stop-color="#1f2a5a"/></linearGradient>
      <radialGradient id="${g.gloria}" gradientUnits="userSpaceOnUse" cx="252" cy="26" r="150"><stop offset="0" stop-color="#fffaf0" stop-opacity="1"/><stop offset=".12" stop-color="#fde68a" stop-opacity=".85"/><stop offset=".32" stop-color="#f59e0b" stop-opacity=".35"/><stop offset=".6" stop-color="#9a3412" stop-opacity=".12"/><stop offset="1" stop-color="#1f2a5a" stop-opacity="0"/></radialGradient>
      <radialGradient id="${g.halo}" cx="50%" cy="50%" r="50%"><stop offset=".55" stop-color="#fde68a" stop-opacity="0"/><stop offset=".8" stop-color="#fde68a" stop-opacity=".9"/><stop offset="1" stop-color="#fde68a" stop-opacity="0"/></radialGradient>
      <linearGradient id="${g.brilhoLamina}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#7dd3fc" stop-opacity="0"/><stop offset=".5" stop-color="#e0f2fe" stop-opacity=".85"/><stop offset="1" stop-color="#7dd3fc" stop-opacity="0"/></linearGradient>
    </defs>
    <rect width="320" height="80" fill="url(#${g.ceu})"/>
    <rect width="320" height="80" fill="url(#${g.gloria})" class="enf-respira" style="--d:4.5s"/>
    <g transform="translate(252 26)"><g class="enf-raios-sm">${pecaDoArcanjo('f-raios', [-262, -262, 524, 524], P.raios)}</g></g>
    ${nuvemFofa(130, 70, 1.5, escura, 34, 0)}${nuvemFofa(196, 80, 1.7, escura, 40, 8)}${nuvemFofa(76, 76, 1.3, escura, 30, 16)}
    <g class="enf-relampago"><path d="M156 46L150 58L155.5 58L148 72" fill="none" stroke="#93c5fd" stroke-width="3.2" opacity=".35"/><path d="M156 46L150 58L155.5 58L148 72" fill="none" stroke="#f0f9ff" stroke-width="1"/></g>
    <g class="enf-relampago" style="--a:-3.4s"><path d="M98 50L94 60L98.5 60L93 70" fill="none" stroke="#93c5fd" stroke-width="2.6" opacity=".35"/><path d="M98 50L94 60L98.5 60L93 70" fill="none" stroke="#f0f9ff" stroke-width=".8"/></g>
    ${penasCaindo}
    <g transform="translate(252 46) scale(.78)"><g class="enf-flutua">
      ${asa(-2, false)}${asa(3, true)}
      <g transform="translate(-6 -18.6)"><g class="enf-capa-sm"><g transform="translate(6 18.6)">${pecaDoArcanjo('f-capa', [-29, -20, 25, 39], P.capa)}</g></g></g>
      <ellipse cx=".6" cy="-25.2" rx="5.6" ry="5.6" fill="url(#${g.halo})" class="enf-respira" style="--d:2.4s"/>
      ${pecaDoArcanjo('f-corpo', [-16, -34, 34, 66], P.corpo)}
      <g transform="translate(12.4 -3.6)"><g class="enf-corrente">${elos}</g></g>
      <g transform="translate(-12.5 -31.8) rotate(-30)">
        <path d="M-5.6 1V-30L0 -41L5.6 -30V1Z" fill="url(#${g.brilhoLamina})" class="enf-respira" style="--d:1.5s"/>
        <path d="M-2.6 0V-29L0 -35L2.6 -29V0Z" fill="url(#${g.brilhoLamina})"/>
        ${pecaDoArcanjo('f-espada', [-5, -32, 10, 37], P.espada)}
        <g class="enf-brilho-lamina"><path d="M0 -2.4C.18 -.4 .36 -.18 2.4 0C.36 .18 .18 .4 0 2.4C-.18 .4 -.36 .18 -2.4 0C-.36 -.18 -.18 -.4 0 -2.4Z" fill="#fff"/></g>
      </g>
      <circle cx="-12.5" cy="-31.8" r="1.35" fill="#eab489"/>
    </g></g>
    ${nuvemFofa(250, 75.5, 1.05, clara, 26, 0)}${nuvemFofa(292, 80, 0.95, clara, 22, 6)}${nuvemFofa(206, 82, 0.9, clara, 30, 11)}
    ${brasas}
    ${faisca(233, 4, 4.2, '#ffffff', 0.4)}${faisca(196, 20, 2.2, '#fef9c3', 1.2)}${faisca(306, 16, 2.4, '#fef9c3', 2)}${faisca(286, 46, 1.8, '#fef9c3', 0.9)}`;
  },

  'jardim-do-eden'() {
    const ceu = idDoEnfeite('ceu');
    const sorteio = sorteioFixo(12);
    let flores = '';
    for (let i = 0; i < 16; i += 1) flores += `<g transform="translate(${n1(130 + sorteio() * 190)} ${n1(66 + sorteio() * 12)}) scale(1.1)"><g class="enf-respira-local" style="--a:${n1(sorteio() * 3)}s">${florzinha(['#f472b6', '#facc15', '#ffffff', '#c084fc'][i % 4], '#f59e0b')}</g></g>`;
    const arvore = (x, e) => `<g transform="translate(${x} 62) scale(${e})"><path d="M-2 0H2V18H-2Z" fill="#78350f"/><circle cx="0" cy="-6" r="12" fill="#16a34a"/><circle cx="-8" cy="0" r="8" fill="#15803d"/><circle cx="8" cy="0" r="8" fill="#22c55e"/><circle cx="-3" cy="-4" r="2" fill="#ef4444"/><circle cx="5" cy="-8" r="2" fill="#ef4444"/></g>`;
    return `<defs><linearGradient id="${ceu}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7dd3fc"/><stop offset="1" stop-color="#ecfccb"/></linearGradient></defs>
    <rect width="320" height="80" fill="url(#${ceu})"/>
    <path d="M100 80C140 60 220 62 320 58V80Z" fill="#84cc16"/>
    ${arvore(170, 1)}${arvore(290, 1.2)}${arvore(232, 0.8)}
    ${flores}
    <g transform="translate(200 24)"><g class="enf-borboleta"><path d="M0 0C-5 -6 -9 -2 -6 2C-4 4 -1 2 0 0Z" fill="#c084fc"/><path d="M0 0C5 -6 9 -2 6 2C4 4 1 2 0 0Z" fill="#a855f7"/></g></g>
    <g transform="translate(262 18)"><g class="enf-borboleta" style="--a:.7s"><path d="M0 0C-5 -6 -9 -2 -6 2C-4 4 -1 2 0 0Z" fill="#fb923c"/><path d="M0 0C5 -6 9 -2 6 2C4 4 1 2 0 0Z" fill="#f97316"/></g></g>`;
  },

  'arca-de-noe'() {
    const ceu = idDoEnfeite('ceu');
    const mar = idDoEnfeite('mar');
    const cores = ['#ef4444', '#f97316', '#facc15', '#22c55e', '#3b82f6', '#8b5cf6'];
    const arco = cores.map((cor, i) => `<path d="M${150 + i * 4} 62A${85 - i * 4} ${60 - i * 4} 0 0 1 ${320 - i * 4} 62" fill="none" stroke="${cor}" stroke-width="3.4" opacity=".75"/>`).join('');
    const onda = (y, cor, d) => {
      let caminho = `M0 ${y}`;
      for (let x = 0; x <= 380; x += 20) caminho += `Q${x + 10} ${y - 4} ${x + 20} ${y}`;
      return `<g class="enf-onda" style="--d:${d}s"><path d="${caminho}V80H0Z" fill="${cor}"/></g>`;
    };
    return `<defs>
      <linearGradient id="${ceu}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#60a5fa"/><stop offset="1" stop-color="#e0f2fe"/></linearGradient>
      <linearGradient id="${mar}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0284c7"/><stop offset="1" stop-color="#075985"/></linearGradient>
    </defs>
    <rect width="320" height="80" fill="url(#${ceu})"/>
    ${arco}
    <g class="enf-balanca-suave"><g transform="translate(232 52)">
      <path d="M-34 0H34L26 14H-26Z" fill="#92400e"/><path d="M-20 -12H20V0H-20Z" fill="#b45309"/><path d="M-24 -12L0 -24L24 -12Z" fill="#78350f"/>
      <circle cx="-10" cy="-6" r="2.2" fill="#fde68a"/><circle cx="0" cy="-6" r="2.2" fill="#fde68a"/><circle cx="10" cy="-6" r="2.2" fill="#fde68a"/>
      <path d="M-16 -16C-16 -22 -12 -24 -11 -19" stroke="#a16207" stroke-width="1.6" fill="none"/><circle cx="-11" cy="-19" r="2" fill="#a16207"/>
      <path d="M14 -16L16 -26M18 -16L20 -24" stroke="#facc15" stroke-width="1.6"/><circle cx="18" cy="-14" r="3.6" fill="#facc15"/>
    </g></g>
    ${onda(66, 'url(#' + mar + ')', 4)}${onda(72, '#0369a1', 6)}`;
  },

  'fundo-do-mar'() {
    const agua = idDoEnfeite('agua');
    const peixe = (cor, e) => `<g transform="scale(${e})"><path d="M0 0C4 -5 12 -5 16 0C12 5 4 5 0 0Z" fill="${cor}"/><path d="M0 0L-6 -4V4Z" fill="${cor}"/><circle cx="11" cy="-1" r="1.1" fill="#0f172a"/></g>`;
    const peixes = [[110, 30, '#f97316', 1.2, 14, 0], [140, 54, '#facc15', 1, 18, 4], [90, 20, '#f472b6', 0.9, 16, 8], [160, 66, '#22d3ee', 1.1, 20, 2]]
      .map(([x, y, cor, e, d, a]) => `<g transform="translate(${x + 220} ${y})"><g class="enf-voa" style="--d:${d}s;--a:-${a}s"><g transform="scale(-1 1)">${peixe(cor, e)}</g></g></g>`).join('');
    const sorteio = sorteioFixo(3);
    let bolhas = '';
    for (let i = 0; i < 12; i += 1) bolhas += `<g transform="translate(${n1(150 + sorteio() * 170)} ${n1(72 + sorteio() * 8)})"><circle class="enf-sobe-lento" style="--a:-${n1(sorteio() * 9)}s;--d:${n1(5 + sorteio() * 4)}s" r="${n1(1.2 + sorteio() * 2)}" fill="none" stroke="#e0f2fe" stroke-width=".7"/></g>`;
    return `<defs><linearGradient id="${agua}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#22d3ee"/><stop offset="1" stop-color="#1e3a8a"/></linearGradient></defs>
    <rect width="320" height="80" fill="url(#${agua})"/>
    <path d="M120 80C150 72 200 76 240 72C270 70 300 74 320 72V80Z" fill="#fde68a"/>
    <path d="M190 80C188 70 194 64 192 56M196 80C200 72 196 66 200 60" stroke="#16a34a" stroke-width="2.4" fill="none" class="enf-balanca-suave"/>
    <path d="M280 80C278 68 284 62 282 54" stroke="#22c55e" stroke-width="2.4" fill="none" class="enf-balanca-suave"/>
    ${peixes}${bolhas}`;
  },

  'estrelinhas-do-ceu'() {
    const ceu = idDoEnfeite('ceu');
    const cores = ['#f472b6', '#facc15', '#60a5fa', '#4ade80', '#c084fc', '#fb923c'];
    const sorteio = sorteioFixo(21);
    let estrelas = '';
    for (let i = 0; i < 18; i += 1) estrelas += `<g transform="translate(${n1(120 + sorteio() * 200)} ${n1(8 + sorteio() * 64)})"><g class="enf-cintila" style="--a:${n1(sorteio() * 3)}s"><path d="${caminhoDeEstrela(0, 0, 3 + sorteio() * 3, 1.4, 5)}" fill="${cores[i % cores.length]}"/></g></g>`;
    return `<defs><linearGradient id="${ceu}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1e1b4b"/><stop offset="1" stop-color="#4c1d95"/></linearGradient></defs>
    <rect width="320" height="80" fill="url(#${ceu})"/>
    ${estrelas}
    <g transform="translate(276 34)"><g class="enf-flutua"><path d="M8 -16A18 18 0 1 0 8 16A14 14 0 1 1 8 -16Z" fill="#fde68a"/><circle cx="-5" cy="-3" r="1.3" fill="#78350f"/><path d="M-8 4Q-4 8 0 5" stroke="#78350f" stroke-width="1" fill="none"/><circle cx="-9" cy="2" r="1.6" fill="#fda4af" opacity=".7"/></g></g>`;
  },

  'pentecostes-faixa'() {
    const ceu = idDoEnfeite('ceu');
    const fogo = idDoEnfeite('fogo');
    const brilho = idDoEnfeite('brilho');
    let chamas = '';
    [170, 200, 230, 260, 290, 314].forEach((x, i) => {
      const y = 30 + (i % 2) * 12;
      chamas += `<g transform="translate(${x} ${y})"><g class="enf-chama" style="--d:${n1(0.4 + (i % 3) * 0.1)}s;--a:${n1(i * 0.2)}s" filter="url(#${brilho})"><path d="M0 0C-4 -3 -3.5 -8 0 -15C3.5 -8 4 -3 0 0Z" fill="url(#${fogo})"/></g></g>`;
    });
    return `<defs>
      <linearGradient id="${ceu}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#450a0a"/><stop offset=".6" stop-color="#9a3412"/><stop offset="1" stop-color="#f59e0b"/></linearGradient>
      <linearGradient id="${fogo}" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#dc2626"/><stop offset=".5" stop-color="#f97316"/><stop offset="1" stop-color="#fef08a"/></linearGradient>
      ${filtroDeBrilho(brilho, 1.8)}
    </defs>
    <rect width="320" height="80" fill="url(#${ceu})"/>
    <g transform="translate(240 14)"><g class="enf-flutua"><path d="M-2 0C-6 -3 -10 -6 -15 -6C-12 -3 -10 0 -8 1C-6 2 -4 2 -2 3Z" fill="#fff"/><path d="M2 0C6 -3 10 -6 15 -6C12 -3 10 0 8 1C6 2 4 2 2 3Z" fill="#fff"/><ellipse cx="0" cy="2" rx="2.4" ry="5" fill="#fff"/></g></g>
    ${chamas}`;
  },

  'oliveiras-ao-luar'() {
    const ceu = idDoEnfeite('ceu');
    const lua = idDoEnfeite('lua');
    const sorteio = sorteioFixo(14);
    let estrelas = '';
    for (let i = 0; i < 24; i += 1) estrelas += `<circle cx="${n1(120 + sorteio() * 200)}" cy="${n1(3 + sorteio() * 40)}" r="${n1(0.3 + sorteio() * 0.7)}" fill="#fff" class="enf-pisca" style="--a:${n1(sorteio() * 3)}s"/>`;
    const oliveira = (x, e) => `<g transform="translate(${x} 80) scale(${e})"><path d="M-2 0C-3 -8 -6 -12 -2 -20H2C5 -13 2 -8 3 0Z" fill="#0b1120"/><ellipse cx="0" cy="-24" rx="14" ry="8" fill="#0f172a"/><ellipse cx="-9" cy="-20" rx="8" ry="5" fill="#0b1120"/><ellipse cx="9" cy="-19" rx="8" ry="5" fill="#111827"/></g>`;
    return `<defs>
      <linearGradient id="${ceu}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#020617"/><stop offset="1" stop-color="#1e293b"/></linearGradient>
      <radialGradient id="${lua}"><stop offset="0" stop-color="#f8fafc" stop-opacity=".55"/><stop offset="1" stop-color="#f8fafc" stop-opacity="0"/></radialGradient>
    </defs>
    <rect width="320" height="80" fill="url(#${ceu})"/>
    ${estrelas}
    <circle cx="282" cy="20" r="22" fill="url(#${lua})" class="enf-respira"/><circle cx="282" cy="20" r="8" fill="#f1f5f9"/>
    <path d="M110 80C160 70 240 72 320 68V80Z" fill="#0b1120"/>
    ${oliveira(170, 1)}${oliveira(230, 1.3)}${oliveira(300, 1)}`;
  },

  basilica() {
    const ceu = idDoEnfeite('ceu');
    const pedra = idDoEnfeite('pedra');
    const janelas = [[206, 66], [218, 66], [262, 66], [274, 66], [240, 48], [234, 66], [246, 66]].map(([x, y], i) => `<rect x="${x}" y="${y}" width="3" height="5" rx="1.4" fill="#fcd34d" class="enf-respira" style="--a:${n1(i * 0.4)}s"/>`).join('');
    return `<defs>
      <linearGradient id="${ceu}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#312e81"/><stop offset=".55" stop-color="#be185d"/><stop offset="1" stop-color="#fb923c"/></linearGradient>
      <linearGradient id="${pedra}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3b2f4a"/><stop offset="1" stop-color="#1c1626"/></linearGradient>
    </defs>
    <rect width="320" height="80" fill="url(#${ceu})"/>
    <circle cx="160" cy="70" r="18" fill="#fde68a" opacity=".5" class="enf-respira"/>
    <path d="M190 80V60H204V56H226V48C226 36 234 30 240 28C246 30 254 36 254 48V56H276V60H290V80Z" fill="url(#${pedra})"/>
    <path d="M240 28V20M237 23H243" stroke="#fde68a" stroke-width="1.4"/>
    <path d="M196 80V64M284 80V64" stroke="#1c1626" stroke-width="5"/>
    ${janelas}`;
  },
});

function imagemDoSvg(conteudo, caixa, largura, altura) {
  const img = new Image();
  img.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="${caixa}" width="${largura}" height="${altura}">${conteudo}</svg>`)}`;
  return img;
}

function imagemPronta(img) {
  return !!img && (img.tagName === 'CANVAS' || (img.complete && img.naturalWidth > 0));
}

function bitmapDoSvg(conteudo, caixa, largura, altura) {
  const guardado = { tela: null };
  const img = imagemDoSvg(conteudo, caixa, largura, altura);
  const passar = () => {
    try {
      const tela = document.createElement('canvas');
      tela.width = largura;
      tela.height = altura;
      tela.getContext('2d').drawImage(img, 0, 0, largura, altura);
      guardado.tela = tela;
    } catch (e) {
      guardado.tela = null;
    }
  };
  if (img.complete && img.naturalWidth) passar();
  else img.addEventListener('load', passar, { once: true });
  return guardado;
}

let spritesDoArcanjoGuardados = null;

function spritesDoArcanjo() {
  if (spritesDoArcanjoGuardados) return spritesDoArcanjoGuardados;
  const defs = DEFS_DO_ARCANJO;
  const asa = bitmapDoSvg(defs + asaElegante(), '-56 -76 62 86', 372, 516);
  const pena = bitmapDoSvg(defs + penaFina(16, 3.8, 0, 'pc', '#a3b1c9', 0), '-17 -5 18 10', 108, 60);
  const penaDeOuro = bitmapDoSvg(defs + penaFina(16, 3.8, 0, 'po', '#a16207', 0), '-17 -5 18 10', 108, 60);
  spritesDoArcanjoGuardados = {
    get asa() { return asa.tela; },
    get pena() { return pena.tela; },
    get penaDeOuro() { return penaDeOuro.tela; },
    nuvens: [spriteDeNuvemEscura(3), spriteDeNuvemEscura(7), spriteDeNuvemEscura(11)],
    luz: spriteDeBrasa('253, 230, 138'),
    luzAzul: spriteDeBrasa('191, 219, 254'),
  };
  return spritesDoArcanjoGuardados;
}

function spriteDeBrasa(cor) {
  const tela = document.createElement('canvas');
  tela.width = 64;
  tela.height = 64;
  const c = tela.getContext('2d');
  if (!c) return tela;
  const g = c.createRadialGradient(32, 32, 0, 32, 32, 32);
  g.addColorStop(0, 'rgba(255, 255, 255, 1)');
  g.addColorStop(0.18, `rgba(${cor}, 0.95)`);
  g.addColorStop(0.5, `rgba(${cor}, 0.28)`);
  g.addColorStop(1, `rgba(${cor}, 0)`);
  c.fillStyle = g;
  c.fillRect(0, 0, 64, 64);
  return tela;
}

function spriteDeNuvemEscura(semente) {
  const tela = document.createElement('canvas');
  tela.width = 320;
  tela.height = 170;
  const c = tela.getContext('2d');
  if (!c) return tela;
  const sorteio = sorteioFixo(semente);
  const bolas = [];
  for (let i = 0; i < 30; i += 1) {
    const x = 34 + sorteio() * 252;
    const borda = 1 - Math.abs(x - 160) / 170;
    bolas.push({ x, y: 92 - sorteio() * 46 * borda, r: 18 + sorteio() * 34 * (0.45 + borda * 0.55) });
  }
  bolas.sort((a, b) => a.y - b.y);
  bolas.forEach(({ x, y, r }) => {
    const g = c.createRadialGradient(x, y + r * 0.25, r * 0.15, x, y, r);
    g.addColorStop(0, 'rgba(28, 36, 62, 0.95)');
    g.addColorStop(0.6, 'rgba(24, 31, 54, 0.75)');
    g.addColorStop(1, 'rgba(16, 21, 38, 0)');
    c.fillStyle = g;
    c.beginPath();
    c.arc(x, y, r, 0, Math.PI * 2);
    c.fill();
  });
  bolas.forEach(({ x, y, r }) => {
    const g = c.createRadialGradient(x - r * 0.15, y - r * 0.45, r * 0.05, x, y - r * 0.2, r * 0.85);
    g.addColorStop(0, 'rgba(132, 150, 192, 0.34)');
    g.addColorStop(0.5, 'rgba(84, 100, 140, 0.22)');
    g.addColorStop(1, 'rgba(60, 74, 110, 0)');
    c.fillStyle = g;
    c.beginPath();
    c.arc(x, y, r, 0, Math.PI * 2);
    c.fill();
  });
  const suave2 = document.createElement('canvas');
  suave2.width = tela.width;
  suave2.height = tela.height;
  const c2 = suave2.getContext('2d');
  if (!c2 || !('filter' in c2)) return tela;
  c2.filter = 'blur(2.5px)';
  c2.drawImage(tela, 0, 0);
  return suave2;
}

function saidaComVolta(t) {
  const x = Math.min(1, Math.max(0, t));
  const c1 = 1.5;
  return 1 + (c1 + 1) * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
}

function raioDeTempestade(x0, y0, x1, y1, desvio, sorteio) {
  let pontos = [[x0, y0], [x1, y1]];
  let d = desvio;
  for (let nivel = 0; nivel < 5; nivel += 1) {
    const novos = [pontos[0]];
    for (let i = 1; i < pontos.length; i += 1) {
      const [ax, ay] = pontos[i - 1];
      const [bx, by] = pontos[i];
      const L = Math.hypot(bx - ax, by - ay) || 1;
      const desloca = (sorteio() - 0.5) * d;
      novos.push([(ax + bx) / 2 + (-(by - ay) / L) * desloca, (ay + by) / 2 + ((bx - ax) / L) * desloca], pontos[i]);
    }
    pontos = novos;
    d *= 0.55;
  }
  const galhos = [];
  [0.35, 0.6].forEach((q) => {
    const i = Math.floor(pontos.length * q);
    const [gx, gy] = pontos[i];
    const angulo = Math.atan2(y1 - y0, x1 - x0) + (sorteio() < 0.5 ? -1 : 1) * (0.5 + sorteio() * 0.4);
    const L = Math.hypot(x1 - x0, y1 - y0) * (0.22 + sorteio() * 0.15);
    let g = [[gx, gy], [gx + Math.cos(angulo) * L, gy + Math.sin(angulo) * L]];
    let dg = desvio * 0.4;
    for (let nivel = 0; nivel < 3; nivel += 1) {
      const novos = [g[0]];
      for (let k = 1; k < g.length; k += 1) {
        const [ax, ay] = g[k - 1];
        const [bx, by] = g[k];
        novos.push([(ax + bx) / 2 + (sorteio() - 0.5) * dg, (ay + by) / 2 + (sorteio() - 0.5) * dg], g[k]);
      }
      g = novos;
      dg *= 0.55;
    }
    galhos.push(g);
  });
  return { pontos, galhos };
}

function desenharRaioDeTempestade(ctx, raio, forca) {
  if (forca <= 0) return;
  const linha = (pts, largura, cor) => {
    ctx.strokeStyle = cor;
    ctx.lineWidth = largura;
    ctx.beginPath();
    pts.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)));
    ctx.stroke();
  };
  ctx.save();
  ctx.globalCompositeOperation = 'lighter';
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  linha(raio.pontos, 9, `rgba(96, 165, 250, ${0.22 * forca})`);
  linha(raio.pontos, 4, `rgba(191, 219, 254, ${0.6 * forca})`);
  linha(raio.pontos, 1.6, `rgba(255, 255, 255, ${forca})`);
  raio.galhos.forEach((g) => {
    linha(g, 4, `rgba(147, 197, 253, ${0.25 * forca})`);
    linha(g, 1, `rgba(255, 255, 255, ${0.85 * forca})`);
  });
  ctx.restore();
}

function efeitoSaoMiguel(w, h, foco) {
  const sprites = spritesDoArcanjo();
  const f = foco || { x: w / 2, y: Math.min(h * 0.3, 170), r: Math.min(w, h) * 0.12 };
  const cx = f.x;
  const cy = f.y;
  const R = Math.max(30, Math.min(f.r, 80));
  const sorteio = Math.random;
  const topoDasNuvens = Math.max(R * 1.6, cy - R * 0.2);
  const nuvens = [];
  [-1, 1].forEach((lado) => {
    for (let i = 0; i < 6; i += 1) {
      const largura = R * (2.4 + sorteio() * 1.4);
      nuvens.push({
        lado, x: cx + lado * (R * 0.25 + i * w * 0.11 + sorteio() * R * 0.4), y: topoDasNuvens * (0.15 + sorteio() * 0.7),
        largura, fase: sorteio() * 6.28, atraso: sorteio() * 0.12, tipo: i % 3,
      });
    }
  });
  nuvens.sort((a, b) => a.y - b.y);
  const raios = [
    { nasce: 0.32, vida: 0.22, ...raioDeTempestade(cx - R * 0.9, topoDasNuvens * 0.45, cx - R * 1.7, cy + R * 0.2, R * 1.4, sorteio) },
    { nasce: 0.58, vida: 0.2, ...raioDeTempestade(cx + R * 0.7, topoDasNuvens * 0.4, cx + R * 1.9, cy - R * 0.1, R * 1.4, sorteio) },
    { nasce: 0.8, vida: 0.24, ...raioDeTempestade(cx - R * 0.2, topoDasNuvens * 0.55, cx + R * 0.15, cy - R * 1.05, R * 0.9, sorteio) },
  ];
  const ladoLivre = Math.max(R * 0.8, Math.min(cx - R, w - cx - R));
  const unidadeDaAsa = Math.max(0.9, Math.min((ladoLivre + 8) / 50, (cy + R * 0.15) / 72, R * 0.06));
  const penas = Array.from({ length: 22 }, (_, i) => {
    const lado = i % 2 ? 1 : -1;
    return {
      x: cx + lado * (R * 1.1 + sorteio() * ladoLivre), y: cy - R * 0.9 + sorteio() * R * 1.8,
      vx: lado * (4 + sorteio() * 14), vy: 22 + sorteio() * 30, giro: sorteio() * 6.28, vg: (sorteio() - 0.5) * 2.4,
      fase: sorteio() * 6.28, tam: 0.7 + sorteio() * 0.8, nasce: 1.35 + sorteio() * 1.1, ouro: sorteio() < 0.4,
    };
  });
  const brasas = Array.from({ length: 36 }, () => ({
    x: sorteio() * w, y: cy + R * (1.2 + sorteio() * 3.4), vy: 26 + sorteio() * 60, r: 4 + sorteio() * 8,
    fase: sorteio() * 6.28, nasce: 1.2 + sorteio() * 1.6, azul: sorteio() < 0.3,
  }));
  const brilhos = Array.from({ length: 14 }, () => ({
    x: sorteio() * w, y: sorteio() * (cy + R * 2.5), r: 4 + sorteio() * 6, fase: sorteio() * 6.28, nasce: 1.3 + sorteio() * 1.6,
  }));

  const desenharAsa = (c, lado, abre, bate, alfa, brilho) => {
    const img = sprites.asa;
    if (!imagemPronta(img) || abre <= 0 || alfa <= 0) return;
    c.save();
    c.translate(cx + lado * R * 0.96, cy + R * 0.16);
    if (lado > 0) c.scale(-1, 1);
    c.rotate(-((1 - Math.min(1, abre)) * 1.1 + bate));
    const e = unidadeDaAsa * (0.35 + 0.65 * Math.min(1, abre));
    c.globalAlpha *= alfa;
    c.drawImage(img, -56 * e, -76 * e, 62 * e, 86 * e);
    if (brilho > 0) {
      c.globalCompositeOperation = 'lighter';
      c.globalAlpha *= brilho;
      c.drawImage(img, -56 * e, -76 * e, 62 * e, 86 * e);
    }
    c.restore();
  };

  return (ctx, s) => {
    const base = ctx.globalAlpha;
    const chega = suave(s / 0.4);
    const abreOCeu = suave((s - 1.0) / 0.75);
    const vai = suave((s - 1.0) / 1.1);
    const clarao = raios.reduce((m, r) => Math.max(m, s >= r.nasce && s < r.nasce + r.vida ? (1 - (s - r.nasce) / r.vida) * (0.6 + 0.4 * Math.sin((s - r.nasce) * 90)) : 0), 0);

    if (abreOCeu > 0) {
      ctx.save();
      ctx.globalCompositeOperation = 'lighter';
      const brilho = abreOCeu * (1 - suave((s - 2.6) / 1.1));
      const r1 = Math.max(w, topoDasNuvens * 2.2) * 0.75;
      ctx.globalAlpha = base * 0.85 * brilho;
      ctx.drawImage(sprites.luz, cx - r1, -r1 * 0.7, r1 * 2, r1 * 1.4);
      ctx.translate(cx, -R * 0.4);
      for (let i = 0; i < 9; i += 1) {
        const a = Math.PI / 2 + (i - 4) * 0.19 + Math.sin(s * 0.7 + i) * 0.015;
        const L = cy + R * 2.4;
        const largura = i % 2 ? 0.022 : 0.04;
        const g = ctx.createLinearGradient(0, 0, Math.cos(a) * L, Math.sin(a) * L);
        g.addColorStop(0, `rgba(255, 251, 235, ${0.32 * brilho})`);
        g.addColorStop(0.5, `rgba(253, 230, 138, ${0.1 * brilho})`);
        g.addColorStop(1, 'rgba(253, 230, 138, 0)');
        ctx.globalAlpha = base;
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(Math.cos(a - largura) * L, Math.sin(a - largura) * L);
        ctx.lineTo(Math.cos(a + largura) * L, Math.sin(a + largura) * L);
        ctx.closePath();
        ctx.fill();
      }
      ctx.restore();
    }

    if (clarao > 0) {
      ctx.save();
      ctx.globalCompositeOperation = 'lighter';
      const g = ctx.createLinearGradient(0, 0, 0, topoDasNuvens * 1.6);
      g.addColorStop(0, `rgba(191, 219, 254, ${0.28 * clarao})`);
      g.addColorStop(1, 'rgba(191, 219, 254, 0)');
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, topoDasNuvens * 1.6);
      ctx.restore();
    }

    if (vai < 1) {
      nuvens.forEach((n) => {
        const nuvem = sprites.nuvens[n.tipo];
        const entra = suave((s - n.atraso) / 0.45);
        const desliza = n.lado * vai * (w * 0.55 + n.largura);
        const x = n.x + desliza + Math.sin(s * 1.3 + n.fase) * 3;
        const y = n.y - (1 - entra) * topoDasNuvens * 0.6;
        const alfa = entra * (1 - vai) * 0.95;
        if (alfa <= 0) return;
        const larg = n.largura;
        const alt = larg * (170 / 320);
        ctx.save();
        ctx.globalAlpha = base * alfa;
        ctx.drawImage(nuvem, x - larg / 2, y - alt / 2, larg, alt);
        if (clarao > 0) {
          ctx.globalCompositeOperation = 'lighter';
          ctx.globalAlpha = base * alfa * clarao * 0.7;
          ctx.drawImage(nuvem, x - larg / 2, y - alt / 2, larg, alt);
        }
        if (abreOCeu > 0) {
          ctx.globalCompositeOperation = 'lighter';
          ctx.globalAlpha = base * alfa * abreOCeu * 0.45;
          ctx.drawImage(sprites.luz, x - larg * 0.45, y - alt * 0.9, larg * 0.9, alt * 1.2);
        }
        ctx.restore();
      });
    }

    raios.forEach((r) => {
      const t = s - r.nasce;
      if (t < 0 || t > r.vida) return;
      const forca = (1 - t / r.vida) * (0.55 + 0.45 * Math.abs(Math.sin(t * 70)));
      ctx.save();
      ctx.globalAlpha = base;
      desenharRaioDeTempestade(ctx, r, forca);
      ctx.restore();
    });

    const abre = s < 1.05 ? 0 : saidaComVolta((s - 1.05) / 0.85);
    const bate = s > 1.9 ? Math.sin((s - 1.9) * 3) * 0.05 * Math.max(0, 1 - (s - 1.9) / 2) : 0;
    const surge = Math.min(1, Math.max(0, (s - 1.05) / 0.35));
    const brilhoDasAsas = Math.max(0, 1 - Math.abs(s - 1.5) / 0.5) * 0.3;
    desenharAsa(ctx, -1, abre, bate, 0.95 * surge, brilhoDasAsas);
    desenharAsa(ctx, 1, abre, bate, 0.95 * surge, brilhoDasAsas);

    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    brasas.forEach((b) => {
      const t = s - b.nasce;
      if (t <= 0) return;
      const y = b.y - b.vy * t;
      const x = b.x + Math.sin(t * 2.2 + b.fase) * 10;
      const alfa = Math.min(1, t * 3) * Math.max(0, 1 - t / 2.4) * (0.6 + 0.4 * Math.sin(t * 9 + b.fase));
      if (alfa <= 0) return;
      ctx.globalAlpha = base * alfa;
      ctx.drawImage(b.azul ? sprites.luzAzul : sprites.luz, x - b.r, y - b.r, b.r * 2, b.r * 2);
    });
    ctx.restore();

    penas.forEach((p) => {
      const t = s - p.nasce;
      const img = p.ouro ? sprites.penaDeOuro : sprites.pena;
      if (t <= 0 || !imagemPronta(img)) return;
      const x = p.x + p.vx * t + Math.sin(t * 2 + p.fase) * 14;
      const y = p.y + p.vy * t;
      const vira = Math.cos(t * 3.4 + p.fase);
      const e = R * 0.42 * p.tam;
      ctx.save();
      ctx.globalAlpha = base * Math.min(1, t * 2.5) * Math.max(0, 1 - t / 2.4);
      ctx.translate(x, y);
      ctx.rotate(p.giro + p.vg * t + Math.sin(t * 2.6 + p.fase) * 0.5);
      ctx.scale(0.25 + 0.75 * Math.abs(vira), 1);
      ctx.drawImage(img, -e, -e * 0.28, e * 1.1, e * 0.61);
      ctx.restore();
    });

    brilhos.forEach((b) => {
      const t = s - b.nasce;
      if (t <= 0) return;
      const pisca = Math.max(0, Math.sin(t * 4 + b.fase));
      desenharFaisca(ctx, b.x, b.y, b.r * (0.5 + 0.5 * pisca), '#fffbeb', pisca * Math.max(0, 1 - t / 2.2));
    });
  };
}

efeitoSaoMiguel.usaMargem = true;

function efeitoBolhas(w, h) {
  const bolhas = Array.from({ length: 34 }, () => ({ x: Math.random() * w, y: h + 20 + Math.random() * h * 0.5, vy: 60 + Math.random() * 80, r: 8 + Math.random() * 18, fase: Math.random() * 6 }));
  return (ctx, s) => {
    bolhas.forEach((b) => {
      const y = b.y - b.vy * s;
      if (y < -b.r * 2) return;
      const x = b.x + Math.sin(s * 1.5 + b.fase) * 16;
      const g = ctx.createRadialGradient(x - b.r * 0.35, y - b.r * 0.35, b.r * 0.1, x, y, b.r);
      g.addColorStop(0, 'rgba(255, 255, 255, 0.55)');
      g.addColorStop(0.7, 'rgba(186, 230, 253, 0.12)');
      g.addColorStop(0.92, `hsla(${(s * 120 + b.fase * 60) % 360}, 90%, 75%, 0.55)`);
      g.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(x, y, b.r, 0, Math.PI * 2);
      ctx.fill();
    });
  };
}

function desenharAnjinho(ctx, x, y, t, bater) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(t / 20, t / 20);
  [-1, 1].forEach((lado) => {
    ctx.save();
    ctx.scale(lado, 1 - 0.4 * Math.abs(bater));
    ctx.fillStyle = '#e0f2fe';
    ctx.beginPath();
    ctx.ellipse(10, -4, 10, 6, -0.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  });
  ctx.fillStyle = '#fef9c3';
  ctx.beginPath();
  ctx.moveTo(-6, 4);
  ctx.lineTo(6, 4);
  ctx.lineTo(8, 16);
  ctx.lineTo(-8, 16);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = '#fde7c7';
  ctx.beginPath();
  ctx.arc(0, -2, 6.5, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#facc15';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.ellipse(0, -11, 6, 2, 0, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();
}

function efeitoAnjinhosVoando(w, h) {
  const anjos = Array.from({ length: 6 }, (_, i) => ({ y: h * (0.12 + i * 0.12), v: 120 + Math.random() * 90, atraso: i * 0.3, t: 22 + Math.random() * 10, dir: i % 2 === 0 ? 1 : -1, fase: Math.random() * 6 }));
  return (ctx, s) => {
    anjos.forEach((a) => {
      const t = s - a.atraso;
      if (t <= 0) return;
      const x = a.dir === 1 ? -40 + a.v * t : w + 40 - a.v * t;
      desenharAnjinho(ctx, x, a.y + Math.sin(t * 3 + a.fase) * 10, a.t, Math.sin(t * 12 + a.fase));
      desenharFaisca(ctx, x - a.dir * 26, a.y + 6, 4, '#fde68a', 0.7);
    });
  };
}

function efeitoEstrelinhas(w, h) {
  const cores = ['#f472b6', '#facc15', '#60a5fa', '#4ade80', '#c084fc', '#fb923c'];
  const estrelas = Array.from({ length: 50 }, (_, i) => ({ a: Math.random() * Math.PI * 2, v: 140 + Math.random() * 240, r: 4 + Math.random() * 6, cor: cores[i % cores.length], giro: Math.random() * 6 }));
  return (ctx, s) => {
    const cx = w / 2;
    const cy = Math.min(h * 0.32, 180);
    estrelas.forEach((e) => {
      const d = e.v * s * (1 - s / 8);
      const x = cx + Math.cos(e.a) * d;
      const y = cy + Math.sin(e.a) * d + 30 * s * s;
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(e.giro + s * 3);
      ctx.fillStyle = e.cor;
      ctx.beginPath();
      for (let k = 0; k < 10; k += 1) {
        const r = k % 2 === 0 ? e.r : e.r * 0.45;
        const ang = -Math.PI / 2 + (k * Math.PI) / 5;
        ctx.lineTo(Math.cos(ang) * r, Math.sin(ang) * r);
      }
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    });
  };
}

function efeitoBaloes(w, h) {
  const cores = ['#ef4444', '#f97316', '#facc15', '#22c55e', '#3b82f6', '#a855f7', '#ec4899'];
  const baloes = Array.from({ length: 16 }, (_, i) => ({ x: Math.random() * w, y: h + 30 + Math.random() * h * 0.4, vy: 110 + Math.random() * 70, r: 14 + Math.random() * 8, cor: cores[i % cores.length], fase: Math.random() * 6 }));
  return (ctx, s) => {
    baloes.forEach((b) => {
      const y = b.y - b.vy * s;
      if (y < -b.r * 4) return;
      const x = b.x + Math.sin(s * 1.4 + b.fase) * 12;
      ctx.strokeStyle = 'rgba(241, 245, 249, 0.7)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(x, y + b.r * 1.2);
      ctx.quadraticCurveTo(x + 6, y + b.r * 2, x, y + b.r * 2.8);
      ctx.stroke();
      const g = ctx.createRadialGradient(x - b.r * 0.35, y - b.r * 0.4, b.r * 0.1, x, y, b.r * 1.2);
      g.addColorStop(0, '#ffffff');
      g.addColorStop(0.25, b.cor);
      g.addColorStop(1, b.cor);
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.ellipse(x, y, b.r, b.r * 1.2, 0, 0, Math.PI * 2);
      ctx.fill();
    });
  };
}

function efeitoRaiosDaMisericordia(w, h) {
  return (ctx, s) => {
    const cx = w / 2;
    const cy = Math.min(h * 0.3, 170);
    const abre = suave(s / 1.2);
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    [[-1, '239, 68, 68'], [1, '224, 242, 254']].forEach(([lado, cor]) => {
      for (let i = 0; i < 3; i += 1) {
        const a = Math.PI / 2 + lado * (0.15 + i * 0.12) * abre;
        const comprimento = h * 1.1 * abre;
        const g = ctx.createLinearGradient(cx, cy, cx + Math.cos(a) * comprimento, cy + Math.sin(a) * comprimento);
        g.addColorStop(0, `rgba(${cor}, ${0.75 * (1 - i * 0.2)})`);
        g.addColorStop(1, `rgba(${cor}, 0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + Math.cos(a - 0.09) * comprimento, cy + Math.sin(a - 0.09) * comprimento);
        ctx.lineTo(cx + Math.cos(a + 0.09) * comprimento, cy + Math.sin(a + 0.09) * comprimento);
        ctx.closePath();
        ctx.fill();
      }
    });
    desenharLuz(ctx, cx, cy, 70 * abre, '255, 251, 235', 0.8 * abre);
    ctx.restore();
  };
}

function efeitoCometa(w, h) {
  const faiscas = Array.from({ length: 40 }, () => ({ atraso: Math.random(), dx: (Math.random() - 0.5) * 30, dy: (Math.random() - 0.5) * 30 }));
  return (ctx, s) => {
    const p = suave(s / 2.6);
    const x = -80 + (w + 160) * p;
    const y = h * 0.12 + h * 0.25 * p;
    const cauda = Math.min(w * 0.45, 360);
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    const g = ctx.createLinearGradient(x - cauda, y - cauda * 0.25, x, y);
    g.addColorStop(0, 'rgba(147, 197, 253, 0)');
    g.addColorStop(0.7, 'rgba(191, 219, 254, 0.45)');
    g.addColorStop(1, 'rgba(255, 255, 255, 0.95)');
    ctx.strokeStyle = g;
    ctx.lineWidth = 7;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(x - cauda, y - cauda * 0.25);
    ctx.lineTo(x, y);
    ctx.stroke();
    desenharLuz(ctx, x, y, 34, '224, 242, 254', 0.9);
    faiscas.forEach((f) => {
      const t = (s * 1.5 + f.atraso) % 1;
      desenharFaisca(ctx, x - t * cauda * 0.6 + f.dx, y - t * cauda * 0.15 + f.dy, 3, '#e0f2fe', 1 - t);
    });
    ctx.restore();
  };
}

function efeitoAleluia(w, h) {
  const notas = Array.from({ length: 24 }, () => ({ x: Math.random() * w, y: h + 20 + Math.random() * h * 0.3, vy: 80 + Math.random() * 70, t: 14 + Math.random() * 10, fase: Math.random() * 6, dupla: Math.random() < 0.4 }));
  return (ctx, s) => {
    notas.forEach((n) => {
      const y = n.y - n.vy * s;
      if (y < -40) return;
      const x = n.x + Math.sin(s * 2 + n.fase) * 14;
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(Math.sin(s * 2 + n.fase) * 0.2);
      ctx.fillStyle = '#facc15';
      ctx.strokeStyle = '#facc15';
      ctx.lineWidth = n.t * 0.1;
      ctx.beginPath();
      ctx.ellipse(0, 0, n.t * 0.32, n.t * 0.24, -0.4, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(n.t * 0.3, 0);
      ctx.lineTo(n.t * 0.3, -n.t);
      if (n.dupla) {
        ctx.lineTo(n.t * 1.1, -n.t * 0.8);
        ctx.lineTo(n.t * 1.1, -n.t * 0.1);
      }
      ctx.stroke();
      if (n.dupla) {
        ctx.beginPath();
        ctx.ellipse(n.t * 0.8, -n.t * 0.1, n.t * 0.32, n.t * 0.24, -0.4, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
      desenharLuz(ctx, x, y, n.t, '253, 224, 71', 0.25);
    });
  };
}

Object.assign(EFEITOS_DO_PERFIL, {
  'sao-miguel-entrada': efeitoSaoMiguel,
  bolhas: efeitoBolhas,
  'anjinhos-voando': efeitoAnjinhosVoando,
  estrelinhas: efeitoEstrelinhas,
  baloes: efeitoBaloes,
  'raios-da-misericordia': efeitoRaiosDaMisericordia,
  cometa: efeitoCometa,
  aleluia: efeitoAleluia,
});

Object.assign(MINIS_DE_EFEITO, {
  'sao-miguel-entrada'(g) {
    return `${fundoDoMini(g, '#0b1022', '#1e3a8a')}<ellipse cx="32" cy="2" rx="16" ry="14" fill="#fde68a" opacity=".55"/><path d="M28 0L32 0L22 40H14Z" fill="#fef3c7" opacity=".25"/><path d="M36 0L40 0L50 40H42Z" fill="#fef3c7" opacity=".25"/>
    <g fill="#334155"><circle cx="8" cy="6" r="7"/><circle cx="18" cy="4" r="6"/><circle cx="25" cy="7" r="4.5"/><circle cx="56" cy="6" r="7"/><circle cx="46" cy="4" r="6"/><circle cx="39" cy="7" r="4.5"/></g>
    <path d="M14 11L11 18L14 18L10 26" fill="none" stroke="#e0f2fe" stroke-width="1"/>
    <path d="M28 30C24 24 18 18 12 16C16 21 20 26 26 31Z" fill="#f8fafc"/><path d="M36 30C40 24 46 18 52 16C48 21 44 26 38 31Z" fill="#f8fafc"/><circle cx="32" cy="31" r="4.5" fill="#64748b" stroke="#facc15" stroke-width="1"/>`;
  },

  bolhas(g) {
    return `${fundoDoMini(g, '#0ea5e9', '#7dd3fc')}${[[16, 26, 7], [34, 14, 9], [50, 28, 6], [26, 8, 4]].map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#ffffff" fill-opacity=".25" stroke="#f0f9ff" stroke-width=".9"/><circle cx="${x - r * 0.35}" cy="${y - r * 0.35}" r="${n1(r * 0.25)}" fill="#fff"/>`).join('')}`;
  },
  'anjinhos-voando'(g) {
    return `${fundoDoMini(g, '#7dd3fc', '#e0f2fe')}<g transform="scale(.32)">${anjinho(60, 60, 2.4, 0)}${anjinho(140, 70, 2, 0.5)}</g>`;
  },
  estrelinhas(g) {
    const cores = ['#f472b6', '#facc15', '#60a5fa', '#4ade80', '#c084fc'];
    return `${fundoDoMini(g, '#1e1b4b', '#4c1d95')}${[[14, 12], [30, 24], [48, 10], [52, 30], [20, 32]].map(([x, y], i) => `<path d="${caminhoDeEstrela(x, y, 5, 2.2, 5)}" fill="${cores[i]}"/>`).join('')}`;
  },
  baloes(g) {
    const cores = ['#ef4444', '#facc15', '#3b82f6', '#22c55e'];
    return `${fundoDoMini(g, '#38bdf8', '#e0f2fe')}${[[16, 16], [30, 12], [44, 18], [54, 10]].map(([x, y], i) => `<path d="M${x} ${y + 7}Q${x + 2} ${y + 12} ${x} ${y + 18}" stroke="#f1f5f9" stroke-width=".6" fill="none"/><ellipse cx="${x}" cy="${y}" rx="5" ry="6.2" fill="${cores[i]}"/>`).join('')}`;
  },
  'raios-da-misericordia'(g) {
    return `${fundoDoMini(g, '#1e293b', '#0f172a')}<path d="M32 6L18 40H28Z" fill="#ef4444" opacity=".8"/><path d="M32 6L46 40H36Z" fill="#e0f2fe" opacity=".85"/><circle cx="32" cy="7" r="4" fill="#fffbeb"/>`;
  },
  cometa(g) {
    return `${fundoDoMini(g, '#020617', '#1e1b4b')}<path d="M4 6L46 22" stroke="#bfdbfe" stroke-width="3" stroke-linecap="round" opacity=".6"/><circle cx="47" cy="22" r="4" fill="#ffffff"/>${faisca(20, 30, 1.6, '#e0f2fe', 0)}${faisca(56, 8, 1.4, '#e0f2fe', 0.6)}`;
  },
  aleluia(g) {
    const nota = (x, y) => `<ellipse cx="${x}" cy="${y}" rx="3" ry="2.2" transform="rotate(-20 ${x} ${y})" fill="#facc15"/><path d="M${x + 2.8} ${y}V${y - 12}" stroke="#facc15" stroke-width="1"/>`;
    return `${fundoDoMini(g, '#422006', '#92400e')}${nota(16, 30)}${nota(32, 20)}${nota(48, 32)}<path d="M34.8 8L50.8 12V20" stroke="#facc15" stroke-width="1" fill="none"/>`;
  },
});
