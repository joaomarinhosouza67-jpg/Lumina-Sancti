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

Object.assign(EFEITOS_DO_PERFIL, {
  'sao-miguel-entrada': efeitoSaoMiguel,
});

Object.assign(MINIS_DE_EFEITO, {
  'sao-miguel-entrada'(g) {
    return `${fundoDoMini(g, '#0b1022', '#1e3a8a')}<ellipse cx="32" cy="2" rx="16" ry="14" fill="#fde68a" opacity=".55"/><path d="M28 0L32 0L22 40H14Z" fill="#fef3c7" opacity=".25"/><path d="M36 0L40 0L50 40H42Z" fill="#fef3c7" opacity=".25"/>
    <g fill="#334155"><circle cx="8" cy="6" r="7"/><circle cx="18" cy="4" r="6"/><circle cx="25" cy="7" r="4.5"/><circle cx="56" cy="6" r="7"/><circle cx="46" cy="4" r="6"/><circle cx="39" cy="7" r="4.5"/></g>
    <path d="M14 11L11 18L14 18L10 26" fill="none" stroke="#e0f2fe" stroke-width="1"/>
    <path d="M28 30C24 24 18 18 12 16C16 21 20 26 26 31Z" fill="#f8fafc"/><path d="M36 30C40 24 46 18 52 16C48 21 44 26 38 31Z" fill="#f8fafc"/><circle cx="32" cy="31" r="4.5" fill="#64748b" stroke="#facc15" stroke-width="1"/>`;
  },

});

const METAIS = {
  ouro: ['#fff6cf', '#eebf4a', '#8a5a0a', '#f7d774', '#b07a12', '#5c3a04'],
  prata: ['#ffffff', '#d9e1ec', '#7b8798', '#f1f5f9', '#a3adbd', '#475569'],
  rosa: ['#fff1ec', '#f6bfae', '#9c5545', '#fcd9ce', '#c47c69', '#6b2f24'],
};

function anelDeMetal(metal, opcoes) {
  const c = METAIS[metal];
  const o = opcoes || {};
  const r = o.raio || 53;
  const largura = o.largura || 5.2;
  let rebites = '';
  if (o.rebites) {
    o.rebites.forEach((a) => {
      const [x, y] = pontoNoCirculo(r, a);
      rebites += `<circle cx="${n1(x)}" cy="${n1(y)}" r="1.5" fill="url(#mc)" stroke="${c[5]}" stroke-width=".35"/><circle cx="${n1(x - 0.45)}" cy="${n1(y - 0.45)}" r=".45" fill="#fff" opacity=".85"/>`;
    });
  }
  return `<defs><linearGradient id="mt" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${c[0]}"/><stop offset=".22" stop-color="${c[1]}"/><stop offset=".42" stop-color="${c[2]}"/><stop offset=".6" stop-color="${c[3]}"/><stop offset=".8" stop-color="${c[4]}"/><stop offset="1" stop-color="${c[5]}"/></linearGradient>
    <radialGradient id="mc" cx="35%" cy="30%" r="75%"><stop offset="0" stop-color="${c[0]}"/><stop offset=".5" stop-color="${c[1]}"/><stop offset="1" stop-color="${c[4]}"/></radialGradient></defs>
    <circle cx="68" cy="69.3" r="${r}" fill="none" stroke="#060a1e" stroke-width="${largura + 0.3}" opacity=".42"/>
    <circle cx="68" cy="68" r="${r}" fill="none" stroke="url(#mt)" stroke-width="${largura}"/>
    <circle cx="68" cy="68" r="${n1(r - largura / 2 - 1.2)}" fill="none" stroke="#050817" stroke-width="2" opacity=".26"/>
    <circle cx="68" cy="68" r="${n1(r - largura / 2 + 0.3)}" fill="none" stroke="${c[5]}" stroke-width=".6"/>
    <circle cx="68" cy="68" r="${n1(r + largura / 2 - 0.2)}" fill="none" stroke="${c[0]}" stroke-width=".55" opacity=".9"/>
    ${o.gravura === false ? '' : `<circle cx="68" cy="68" r="${r}" fill="none" stroke="${c[0]}" stroke-width=".4" stroke-dasharray="1.1 3.1" opacity=".55"/>`}${rebites}`;
}

function reflexoNoAnel(id, raio, largura) {
  const r1 = n1(raio + largura / 2 + 0.6);
  const r2 = n1(raio - largura / 2 - 0.6);
  return `<defs><linearGradient id="${id}-g" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".5" stop-color="#fff" stop-opacity=".9"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>
    <clipPath id="${id}-c"><path clip-rule="evenodd" d="M68 ${n1(68 - r1)}A${r1} ${r1} 0 1 1 67.99 ${n1(68 - r1)}ZM68 ${n1(68 - r2)}A${r2} ${r2} 0 1 0 68.01 ${n1(68 - r2)}Z"/></clipPath></defs>
    <g clip-path="url(#${id}-c)"><g transform="skewX(-22)"><rect class="enf-reflexo-passa" x="-30" y="-20" width="16" height="180" fill="url(#${id}-g)"/></g></g>`;
}

const PECAS_PREMIUM = {
  anelArcoIris: () => {
    const cores = ['#ef4444', '#f97316', '#facc15', '#22c55e', '#3b82f6', '#6366f1', '#a855f7'];
    const faixas = cores.map((cor, i) => `<circle cx="68" cy="68" r="${n1(57.4 - i * 1.02)}" fill="none" stroke="${cor}" stroke-width="1.12"/>`).join('');
    return `<circle cx="68" cy="69.2" r="54.4" fill="none" stroke="#060a1e" stroke-width="8" opacity=".35"/>${faixas}
      <circle cx="68" cy="68" r="58.1" fill="none" stroke="#ffffff" stroke-width=".7" opacity=".9"/>
      <circle cx="68" cy="68" r="50.6" fill="none" stroke="#1e1b4b" stroke-width=".7" opacity=".7"/>
      <path d="M${pontoNoCirculo(54.4, 205).map(n1).join(' ')}A54.4 54.4 0 0 1 ${pontoNoCirculo(54.4, 295).map(n1).join(' ')}" fill="none" stroke="#fff" stroke-width="3.2" stroke-linecap="round" opacity=".38"/>`;
  },
  nuvemFofinha: () => `<defs><radialGradient id="nf" cx="40%" cy="30%" r="75%"><stop offset="0" stop-color="#ffffff"/><stop offset=".6" stop-color="#f1f5ff"/><stop offset="1" stop-color="#c7d2fe"/></radialGradient></defs>
    <ellipse cx="0" cy="7.5" rx="17" ry="3" fill="#1e1b4b" opacity=".25"/>
    <circle cx="-10" cy="1.5" r="6.5" fill="url(#nf)"/><circle cx="-2" cy="-3" r="8.5" fill="url(#nf)"/><circle cx="8" cy="-0.5" r="7" fill="url(#nf)"/><circle cx="14" cy="3" r="4.8" fill="url(#nf)"/>
    <rect x="-15" y="1" width="31" height="6.6" rx="3.3" fill="url(#nf)"/>
    <circle cx="-4.5" cy="-6.2" r="2.2" fill="#fff"/>`,
  solSorrindo: () => `<defs><radialGradient id="ss" cx="40%" cy="35%" r="70%"><stop offset="0" stop-color="#fffbe6"/><stop offset=".45" stop-color="#fcd34d"/><stop offset="1" stop-color="#f59e0b"/></radialGradient></defs>
    <circle r="9.5" fill="url(#ss)" stroke="#d97706" stroke-width=".6"/>
    <path d="M-4.2 -1.2Q-3 -2.6 -1.8 -1.2M1.8 -1.2Q3 -2.6 4.2 -1.2" fill="none" stroke="#7c2d12" stroke-width=".8" stroke-linecap="round"/>
    <path d="M-3 2.4Q0 5.2 3 2.4" fill="none" stroke="#7c2d12" stroke-width=".8" stroke-linecap="round"/>
    <circle cx="-5.4" cy="1.8" r="1.5" fill="#fb7185" opacity=".55"/><circle cx="5.4" cy="1.8" r="1.5" fill="#fb7185" opacity=".55"/>
    <circle cx="-3.2" cy="-5.2" r="2" fill="#fff" opacity=".7"/>`,
  raiosDoSol: () => {
    let r = '';
    for (let i = 0; i < 12; i += 1) r += `<path d="M-1.6 -11.5L0 -16.5L1.6 -11.5Z" transform="rotate(${i * 30})" fill="#fbbf24" stroke="#f59e0b" stroke-width=".4" stroke-linejoin="round"/>`;
    return r;
  },
  anelDePerolas: () => {
    let perolas = '';
    for (let i = 0; i < 20; i += 1) {
      const [x, y] = pontoNoCirculo(53.2, i * 18 + 9);
      perolas += `<circle cx="${n1(x)}" cy="${n1(y)}" r="2.15" fill="url(#pe2)"/><circle cx="${n1(x - 0.7)}" cy="${n1(y - 0.7)}" r=".6" fill="#fff"/>`;
    }
    return `<defs><radialGradient id="pe2" cx="35%" cy="30%" r="75%"><stop offset="0" stop-color="#ffffff"/><stop offset=".55" stop-color="#f1eee8"/><stop offset="1" stop-color="#b7b1a6"/></radialGradient></defs>${anelDeMetal('ouro', { largura: 3.6, gravura: false })}${perolas}`;
  },
  querubimCorpo: () => `<defs>
      <radialGradient id="qp" cx="40%" cy="35%" r="70%"><stop offset="0" stop-color="#fff1e4"/><stop offset=".7" stop-color="#f8cfae"/><stop offset="1" stop-color="#e2a07a"/></radialGradient>
      <radialGradient id="qc" cx="35%" cy="30%" r="75%"><stop offset="0" stop-color="#fff3b0"/><stop offset=".6" stop-color="#f6c443"/><stop offset="1" stop-color="#c58a14"/></radialGradient>
      <linearGradient id="qv" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#dbe4f3"/></linearGradient>
      <linearGradient id="qh" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fde68a"/><stop offset=".5" stop-color="#fffbe6"/><stop offset="1" stop-color="#eab308"/></linearGradient>
    </defs>
    <path d="M-5.6 4.5C-6.6 9 -6 12.5 -4.8 13.6H4.8C6 12.5 6.6 9 5.6 4.5C3.5 3 -3.5 3 -5.6 4.5Z" fill="url(#qv)" stroke="#b8c4d9" stroke-width=".4"/>
    <path d="M-5 7.2H5" stroke="#f6c443" stroke-width="1"/>
    <circle cx="0" cy="-1.2" r="6.2" fill="url(#qp)"/>
    <circle cx="-4.6" cy="-5.8" r="2.1" fill="url(#qc)"/><circle cx="-1.6" cy="-7.4" r="2.3" fill="url(#qc)"/><circle cx="1.8" cy="-7.4" r="2.3" fill="url(#qc)"/><circle cx="4.7" cy="-5.6" r="2.1" fill="url(#qc)"/><circle cx="0" cy="-8.3" r="1.6" fill="url(#qc)"/>
    <path d="M-3.2 -1.4Q-2.2 -2.6 -1.2 -1.4M1.2 -1.4Q2.2 -2.6 3.2 -1.4" fill="none" stroke="#7c4a2d" stroke-width=".65" stroke-linecap="round"/>
    <path d="M-1.4 1.6Q0 2.8 1.4 1.6" fill="none" stroke="#c2410c" stroke-width=".6" stroke-linecap="round"/>
    <circle cx="-3.9" cy=".9" r="1.2" fill="#fb7185" opacity=".5"/><circle cx="3.9" cy=".9" r="1.2" fill="#fb7185" opacity=".5"/>
    <ellipse cx="0" cy="-11.4" rx="5.6" ry="1.6" fill="none" stroke="#fef08a" stroke-width="2.4" opacity=".35"/>
    <ellipse cx="0" cy="-11.4" rx="5.6" ry="1.6" fill="none" stroke="url(#qh)" stroke-width="1.1"/>`,
  querubimAsa: () => `<defs><linearGradient id="qa" x1="1" y1="0" x2="0" y2="0"><stop offset="0" stop-color="#dbe7f7"/><stop offset=".5" stop-color="#ffffff"/><stop offset="1" stop-color="#fff6dc"/></linearGradient></defs>
    ${[[34, 13], [16, 11], [-2, 8.5]].map(([a, L]) => penaLonga(L, a, 'qa', '#a8b8d0', 1.6)).join('')}`,
  estrelaDoce: (cor) => () => {
    const [claro, medio, escuro] = cor;
    return `<defs><radialGradient id="ed" cx="40%" cy="35%" r="75%"><stop offset="0" stop-color="${claro}"/><stop offset=".55" stop-color="${medio}"/><stop offset="1" stop-color="${escuro}"/></radialGradient></defs>
      <path d="${caminhoDeEstrela(0, 0.9, 8, 3.9, 5)}" fill="#0b1022" opacity=".35"/>
      <path d="${caminhoDeEstrela(0, 0, 8, 3.9, 5)}" fill="url(#ed)" stroke="${escuro}" stroke-width=".6" stroke-linejoin="round"/>
      <path d="${caminhoDeEstrela(0, -0.3, 4.6, 2.2, 5)}" fill="${claro}" opacity=".55"/>
      <ellipse cx="-2.2" cy="-3" rx="1.6" ry=".9" transform="rotate(-30 -2.2 -3)" fill="#fff" opacity=".9"/>`;
  },
  anelPastel: () => `<defs><linearGradient id="ap" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fbcfe8"/><stop offset=".35" stop-color="#f9a8d4"/><stop offset=".55" stop-color="#c4b5fd"/><stop offset=".8" stop-color="#93c5fd"/><stop offset="1" stop-color="#a5f3fc"/></linearGradient></defs>
    <circle cx="68" cy="69.2" r="53" fill="none" stroke="#060a1e" stroke-width="5.4" opacity=".35"/>
    <circle cx="68" cy="68" r="53" fill="none" stroke="url(#ap)" stroke-width="5"/>
    <circle cx="68" cy="68" r="54.9" fill="none" stroke="#ffffff" stroke-width=".7" opacity=".85"/>
    <circle cx="68" cy="68" r="50.7" fill="none" stroke="#6d28d9" stroke-width=".5" opacity=".5"/>
    <circle cx="68" cy="68" r="53" fill="none" stroke="#fff" stroke-width=".9" stroke-dasharray=".1 5.4" stroke-linecap="round" opacity=".9"/>`,
  ramoDeOliveira: () => {
    let folhas = '';
    const pontos = [[-30, 2, -20], [-24, 5, 160], [-18, 3, -30], [-12, 7, 150], [-6, 5, -40], [0, 8, 140], [6, 5, -35], [12, 7, 160], [18, 3, -25], [24, 5, 165], [30, 2, -15]];
    pontos.forEach(([x, y, a]) => { folhas += `<path d="M0 0C2 -1.6 6 -1.8 9 0C6 1.8 2 1.6 0 0Z" transform="translate(${x} ${y}) rotate(${a})" fill="url(#ol)" stroke="#365314" stroke-width=".35"/>`; });
    return `<defs><linearGradient id="ol" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#3f6212"/><stop offset=".5" stop-color="#84cc16"/><stop offset="1" stop-color="#bef264"/></linearGradient>
      <radialGradient id="oa" cx="35%" cy="30%" r="70%"><stop offset="0" stop-color="#a78bfa"/><stop offset=".6" stop-color="#4c1d95"/><stop offset="1" stop-color="#1e1b4b"/></radialGradient></defs>
      <path d="M-34 0Q0 12 34 0" fill="none" stroke="#713f12" stroke-width="1.1"/>${folhas}
      <circle cx="-9" cy="9.2" r="1.7" fill="url(#oa)"/><circle cx="4" cy="10.4" r="1.7" fill="url(#oa)"/><circle cx="15" cy="8.4" r="1.6" fill="url(#oa)"/>`;
  },
  pombaCorpo: () => `<defs><linearGradient id="pb" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset=".7" stop-color="#eef2f8"/><stop offset="1" stop-color="#b6c2d6"/></linearGradient>
      <linearGradient id="pw" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#cfd8e6"/><stop offset="1" stop-color="#8d9bb3"/></linearGradient></defs>
    <path d="M-2 -1C-6 -7 -12 -10 -17 -9C-14 -5 -10 -1 -5 1Z" fill="url(#pw)"/>
    <path d="M-12 1.5L-20 -1.5L-19 3.5L-21 6L-12 4.5Z" fill="url(#pb)" stroke="#9aa8bf" stroke-width=".35"/>
    <path d="M-13 3C-10 -1.5 -2 -3.5 5 -2.5C9 -2 11 0 11 2.2C11 4.8 7 6.6 1 6.6C-5 6.6 -10.5 5.6 -13 3Z" fill="url(#pb)" stroke="#9aa8bf" stroke-width=".35"/>
    <circle cx="9.2" cy="-.4" r="3.2" fill="url(#pb)"/>
    <path d="M12 -.6L14.6 .2L12 1Z" fill="#f59e0b"/><circle cx="10.2" cy="-1.1" r=".55" fill="#1f2937"/><circle cx="10.4" cy="-1.3" r=".18" fill="#fff"/>`,
  pombaAsa: () => `<defs><linearGradient id="pa" x1="1" y1="0" x2="0" y2="0"><stop offset="0" stop-color="#e5ebf5"/><stop offset=".5" stop-color="#ffffff"/><stop offset="1" stop-color="#f8fafc"/></linearGradient></defs>
    ${[[62, 15], [48, 14], [34, 12], [20, 9.5]].map(([a, L]) => penaLonga(L, a, 'pa', '#a3b1c9', 1.4)).join('')}`,
};

Object.assign(PECAS_PREMIUM, {
  folhaDeBordo: (c1, c2, c3) => () => `<defs><linearGradient id="fb" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${c1}"/><stop offset=".55" stop-color="${c2}"/><stop offset="1" stop-color="${c3}"/></linearGradient></defs>
    <path d="M0 9L.6 4.6C2.2 5.6 4.4 5.8 6 5C5 4 4.8 3 5.4 2C6.6 2.2 8 1.6 8.6.4C7.2 0 6.4-.8 6.4-2C5 -1.4 3.6-1.8 3-3C3.6-4.6 3.2-6.6 2-8C1.2-6.8.6-6.4 0-6.4C-.6-6.4-1.2-6.8-2-8C-3.2-6.6-3.6-4.6-3-3C-3.6-1.8-5-1.4-6.4-2C-6.4-.8-7.2 0-8.6.4C-8 1.6-6.6 2.2-5.4 2C-4.8 3-5 4-6 5C-4.4 5.8-2.2 5.6-.6 4.6Z" fill="url(#fb)" stroke="${c3}" stroke-width=".4" stroke-linejoin="round"/>
    <path d="M0 8V-5.6M0 2L4.6-1.2M0 2L-4.6-1.2M0 -.6L2.4-5M0-.6L-2.4-5" fill="none" stroke="${c3}" stroke-width=".35" opacity=".7"/>`,
  folhaOval: (c1, c2, c3) => () => `<defs><linearGradient id="fo" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${c1}"/><stop offset=".5" stop-color="${c2}"/><stop offset="1" stop-color="${c3}"/></linearGradient></defs>
    <path d="M0 -8C4 -5 4.6 2 0 8C-4.6 2 -4 -5 0 -8Z" fill="url(#fo)" stroke="${c3}" stroke-width=".4"/><path d="M0 -7V7.4M0 -2L2 -4M0 1L2.4 -1M0 -2L-2 -4M0 1L-2.4 -1" fill="none" stroke="${c3}" stroke-width=".3" opacity=".7"/>`,
  bolota: () => `<defs><radialGradient id="bn" cx="35%" cy="35%" r="70%"><stop offset="0" stop-color="#f3d9a4"/><stop offset=".6" stop-color="#c08a44"/><stop offset="1" stop-color="#7c4a1c"/></radialGradient>
      <linearGradient id="bc" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8b5a2b"/><stop offset="1" stop-color="#4a2c12"/></linearGradient></defs>
    <ellipse cx="0" cy="1.6" rx="2.8" ry="3.6" fill="url(#bn)"/><path d="M-3.3 -.4C-3.3 -3 3.3 -3 3.3 -.4C2 .5 -2 .5 -3.3 -.4Z" fill="url(#bc)"/>
    <path d="M-2.4 -1.6L2.4 -1.6M-2.8 -.6L2.8 -.6" stroke="#2f1b0b" stroke-width=".3" opacity=".6"/><path d="M0 -2.6L.6 -4.2" stroke="#4a2c12" stroke-width=".7" stroke-linecap="round"/>`,
  rosa: (c1, c2, c3) => () => {
    let petalas = '';
    for (let i = 0; i < 6; i += 1) petalas += `<ellipse cx="0" cy="-4.2" rx="3.4" ry="4.4" transform="rotate(${i * 60})" fill="url(#ro)" stroke="${c3}" stroke-width=".3"/>`;
    let meio = '';
    for (let i = 0; i < 5; i += 1) meio += `<ellipse cx="0" cy="-2.6" rx="2.4" ry="3" transform="rotate(${i * 72 + 30})" fill="url(#rm)" stroke="${c3}" stroke-width=".25"/>`;
    return `<defs><radialGradient id="ro" cx="50%" cy="20%" r="80%"><stop offset="0" stop-color="${c1}"/><stop offset=".6" stop-color="${c2}"/><stop offset="1" stop-color="${c3}"/></radialGradient>
      <radialGradient id="rm" cx="50%" cy="30%" r="80%"><stop offset="0" stop-color="${c2}"/><stop offset="1" stop-color="${c3}"/></radialGradient></defs>
      ${petalas}${meio}<path d="M-1.4 .4C-1.6 -1.4 .4 -2.2 1.4 -1C2.2 0 1.4 1.6 0 1.6C-1 1.6 -1.6 .8 -1.2 0" fill="none" stroke="${c3}" stroke-width=".5"/>`;
  },
  folhaDeRosa: () => `<defs><linearGradient id="fr" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#14532d"/><stop offset=".55" stop-color="#16a34a"/><stop offset="1" stop-color="#86efac"/></linearGradient></defs>
    <path d="M0 0C2.6 -2.6 7 -2.8 10 0C7 2.8 2.6 2.6 0 0Z" fill="url(#fr)" stroke="#14532d" stroke-width=".3"/><path d="M.6 0H9.4" stroke="#14532d" stroke-width=".3"/>`,
  coracao: () => `<defs><radialGradient id="ch" cx="38%" cy="30%" r="75%"><stop offset="0" stop-color="#ffb4b4"/><stop offset=".45" stop-color="#dc2626"/><stop offset="1" stop-color="#6b0f1a"/></radialGradient>
      <linearGradient id="ce" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#94a3b8"/><stop offset=".5" stop-color="#f8fafc"/><stop offset="1" stop-color="#64748b"/></linearGradient>
      <linearGradient id="co" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff6cf"/><stop offset=".5" stop-color="#eebf4a"/><stop offset="1" stop-color="#7a4e05"/></linearGradient></defs>
    <path d="M0 11C-14 2 -13 -9 -6 -9C-3 -9 -1 -7.4 0 -5.6C1 -7.4 3 -9 6 -9C13 -9 14 2 0 11Z" fill="#060a1e" opacity=".35" transform="translate(0 1.2)"/>
    <path d="M0 11C-14 2 -13 -9 -6 -9C-3 -9 -1 -7.4 0 -5.6C1 -7.4 3 -9 6 -9C13 -9 14 2 0 11Z" fill="url(#ch)" stroke="#5f0f17" stroke-width=".5"/>
    <path d="M-8.4 -5.4C-6.6 -7.6 -3.6 -7.2 -2.6 -5.2" fill="none" stroke="#fff" stroke-width="1.1" stroke-linecap="round" opacity=".6"/>
    <path d="M-15 -8L10 9" stroke="url(#ce)" stroke-width="1.6"/><path d="M-16.6 -9.4L-13 -6.6M-17.8 -7.8L-14.6 -10.4" stroke="url(#co)" stroke-width="1.4" stroke-linecap="round"/>
    ${[[-9, 3], [0, 7.6], [9, 3]].map(([x, y]) => `<g transform="translate(${x} ${y}) scale(.32)"><circle r="5" fill="#fff7f7"/><circle r="3" fill="#ffe4e6"/><circle r="1.2" fill="#fecdd3"/></g>`).join('')}`,
  raiosDivinos: () => {
    let r = '';
    for (let i = 0; i < 40; i += 1) {
      const a = (i * 360) / 40;
      if (i % 2 === 0) r += `<path d="M66.6 9L68 -6L69.4 9Z" transform="rotate(${a} 68 68)"/>`;
      else r += `<path d="M66.9 11C67.6 6 66.2 3 67.2 -0.5C67.9 2.8 69.2 5 69.1 11Z" transform="rotate(${a} 68 68)"/>`;
    }
    return `<defs><radialGradient id="rd" gradientUnits="userSpaceOnUse" cx="68" cy="68" r="76"><stop offset=".7" stop-color="#ffffff" stop-opacity="1"/><stop offset=".84" stop-color="#fde68a" stop-opacity=".95"/><stop offset="1" stop-color="#fbbf24" stop-opacity="0"/></radialGradient></defs><g fill="url(#rd)">${r}</g>`;
  },
});

const PECAS_PREMIUM_PRONTAS = {};

function pecaPremium(chave, caixa, desenho) {
  if (!PECAS_PREMIUM_PRONTAS[chave]) {
    PECAS_PREMIUM_PRONTAS[chave] = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="${caixa.join(' ')}">${desenho()}</svg>`)}`;
  }
  const [x, y, w, h] = caixa;
  return `<image href="${PECAS_PREMIUM_PRONTAS[chave]}" x="${x}" y="${y}" width="${w}" height="${h}"/>`;
}

const CORES_DE_ESTRELA = [['#fff0f6', '#f472b6', '#be185d'], ['#fffbe6', '#facc15', '#ca8a04'], ['#eff6ff', '#60a5fa', '#1d4ed8'], ['#f0fdf4', '#4ade80', '#15803d'], ['#faf5ff', '#c084fc', '#7e22ce'], ['#fff7ed', '#fb923c', '#c2410c']];

Object.assign(MOLDURAS, {
  'arco-iris-da-foto'() {
    const nuvem = pecaPremium('nuvem-fofinha', [-18, -12, 36, 22], PECAS_PREMIUM.nuvemFofinha);
    const brilho = idDoEnfeite('arco-brilho');
    return `<defs><linearGradient id="${brilho}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".5" stop-color="#fff" stop-opacity=".9"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient></defs>
      ${pecaPremium('anel-arco-iris', [0, 0, 136, 136], PECAS_PREMIUM.anelArcoIris)}
      <g class="enf-gira" style="--d:6s"><path d="M${pontoNoCirculo(54.4, -18).map(n1).join(' ')}A54.4 54.4 0 0 1 ${pontoNoCirculo(54.4, 18).map(n1).join(' ')}" fill="none" stroke="url(#${brilho})" stroke-width="5.6" stroke-linecap="round" opacity=".75"/></g>
      <g transform="translate(110 22)"><g class="enf-gira-local" style="--d:16s">${pecaPremium('raios-do-sol', [-17, -17, 34, 34], PECAS_PREMIUM.raiosDoSol)}</g>${pecaPremium('sol-sorrindo', [-10, -10, 20, 20], PECAS_PREMIUM.solSorrindo)}</g>
      <g transform="translate(22 110)"><g class="enf-flutua">${nuvem}</g></g>
      <g transform="translate(116 112) scale(-.9 .9)"><g class="enf-flutua" style="animation-delay:-1.4s">${nuvem}</g></g>
      ${faisca(18, 34, 3, '#fffbeb', 0.2)}${faisca(66, 2, 2.6, '#fffbeb', 1)}${faisca(132, 70, 2.4, '#fffbeb', 1.8)}${faisca(40, 128, 2.2, '#fde68a', 2.4)}`;
  },

  anjinhos() {
    const corpo = pecaPremium('querubim-corpo', [-9, -14, 18, 28], PECAS_PREMIUM.querubimCorpo);
    const asa = pecaPremium('querubim-asa', [-14, -10, 16, 14], PECAS_PREMIUM.querubimAsa);
    const querubim = (x, y, atraso) => `<g transform="translate(${x} ${y})"><g class="enf-contra-gira" style="--d:30s"><g class="enf-flutua" style="animation-delay:${atraso}s">
      <g transform="translate(-4 3)"><g class="enf-asa-querubim" style="--a:${atraso}s">${asa}</g></g>
      <g transform="translate(4 3) scale(-1 1)"><g class="enf-asa-querubim" style="--a:${atraso}s">${asa}</g></g>
      ${corpo}</g></g></g>`;
    return `${pecaPremium('anel-perolas', [0, 0, 136, 136], PECAS_PREMIUM.anelDePerolas)}
      ${reflexoNoAnel(idDoEnfeite('anj'), 53, 3.6)}
      <g class="enf-gira" style="--d:30s">${querubim(68, 9, 0)}${querubim(119, 97, -0.8)}${querubim(17, 97, -1.6)}</g>
      ${faisca(32, 20, 2.6, '#fffbeb', 0.3)}${faisca(104, 18, 2.6, '#fffbeb', 1.3)}${faisca(68, 128, 2.4, '#fde68a', 2.1)}`;
  },

  'estrelinhas-coloridas'() {
    const estrelas = [0, 45, 90, 135, 180, 225, 270, 315].map((a, i) => {
      const [x, y] = pontoNoCirculo(57, a);
      const e = i % 2 ? 0.85 : 1.15;
      const peca = pecaPremium(`estrela-doce-${i % 6}`, [-9, -9, 18, 19], PECAS_PREMIUM.estrelaDoce(CORES_DE_ESTRELA[i % 6]));
      return `<g transform="translate(${n1(x)} ${n1(y)}) scale(${e})"><g class="enf-cintila" style="--a:${n1(i * 0.32)}s">${peca}</g></g>`;
    }).join('');
    let pontinhos = '';
    for (let i = 0; i < 16; i += 1) {
      const [x, y] = pontoNoCirculo(62 + (i % 2) * 4, i * 22.5 + 11);
      pontinhos += `<circle cx="${n1(x)}" cy="${n1(y)}" r=".9" fill="${CORES_DE_ESTRELA[i % 6][1]}" class="enf-pisca" style="--a:${n1(i * 0.2)}s"/>`;
    }
    return `${pecaPremium('anel-pastel', [0, 0, 136, 136], PECAS_PREMIUM.anelPastel)}
      ${reflexoNoAnel(idDoEnfeite('est'), 53, 5)}
      ${pontinhos}<g class="enf-gira" style="--d:46s">${estrelas}</g>`;
  },

  pombinhas() {
    const corpo = pecaPremium('pomba-corpo', [-22, -11, 38, 19], PECAS_PREMIUM.pombaCorpo);
    const asa = pecaPremium('pomba-asa', [-17, -16, 19, 18], PECAS_PREMIUM.pombaAsa);
    const pomba = (atraso) => `${corpo}<g transform="translate(1 -1)"><g class="enf-asa-pomba-sm" style="--a:${atraso}s">${asa}</g></g>`;
    return `${pecaPremium('anel-prata', [0, 0, 136, 136], () => anelDeMetal('prata', { rebites: [45, 135, 225, 315] }))}
      ${reflexoNoAnel(idDoEnfeite('pom'), 53, 5.2)}
      <g transform="translate(68 120)">${pecaPremium('ramo-oliveira', [-36, -6, 72, 18], PECAS_PREMIUM.ramoDeOliveira)}</g>
      <g class="enf-gira" style="--d:13s"><g transform="translate(68 4) scale(1.05)">${pomba(0)}</g><g transform="translate(68 132) rotate(180) scale(1.05)">${pomba(-0.35)}</g></g>
      ${faisca(16, 40, 2.6, '#f8fafc', 0.4)}${faisca(122, 44, 2.4, '#f8fafc', 1.4)}`;
  },

  'folhas-de-outono'() {
    const tipos = [
      pecaPremium('bordo-vermelho', [-9, -9, 18, 19], PECAS_PREMIUM.folhaDeBordo('#fca5a5', '#dc2626', '#7f1d1d')),
      pecaPremium('bordo-laranja', [-9, -9, 18, 19], PECAS_PREMIUM.folhaDeBordo('#fed7aa', '#f97316', '#9a3412')),
      pecaPremium('bordo-ouro', [-9, -9, 18, 19], PECAS_PREMIUM.folhaDeBordo('#fef08a', '#eab308', '#854d0e')),
      pecaPremium('oval-marrom', [-5, -9, 10, 18], PECAS_PREMIUM.folhaOval('#fcd34d', '#b45309', '#78350f')),
      pecaPremium('oval-vermelha', [-5, -9, 10, 18], PECAS_PREMIUM.folhaOval('#fdba74', '#c2410c', '#7c2d12')),
    ];
    const caindo = [[30, 112, 0, 0], [100, 116, 1.4, 1], [64, 122, 2.8, 2], [14, 92, 4, 3]].map(([x, y, a, t]) => `<g transform="translate(${x} ${y})"><g class="enf-cai" style="--a:-${a}s"><g transform="scale(.7)">${tipos[t]}</g></g></g>`).join('');
    const coroa = pecaPremium('coroa-outono', [0, 0, 136, 136], () => {
      const desenhos = [
        PECAS_PREMIUM.folhaDeBordo('#fca5a5', '#dc2626', '#7f1d1d')(), PECAS_PREMIUM.folhaDeBordo('#fed7aa', '#f97316', '#9a3412')(),
        PECAS_PREMIUM.folhaDeBordo('#fef08a', '#eab308', '#854d0e')(), PECAS_PREMIUM.folhaOval('#fcd34d', '#b45309', '#78350f')(),
        PECAS_PREMIUM.folhaOval('#fdba74', '#c2410c', '#7c2d12')(),
      ].map((d, i) => d.split('id="fb"').join(`id="fb${i}"`).split('url(#fb)').join(`url(#fb${i})`).split('id="fo"').join(`id="fo${i}"`).split('url(#fo)').join(`url(#fo${i})`));
      let anel = '<circle cx="68" cy="68" r="53.5" fill="none" stroke="#5b3416" stroke-width="2.4"/><circle cx="68" cy="68" r="53.5" fill="none" stroke="#a16207" stroke-width=".8" stroke-dasharray="6 3"/>';
      for (let i = 0; i < 26; i += 1) {
        const a = i * (360 / 26);
        const [x, y] = pontoNoCirculo(54 + (i % 2) * 2.5, a);
        anel += `<g transform="translate(${n1(x)} ${n1(y)}) rotate(${n1(a + (i % 2 ? 30 : -20))}) scale(${i % 3 ? 0.9 : 1.05})">${desenhos[i % 5]}</g>`;
      }
      const bolota = PECAS_PREMIUM.bolota();
      [100, 220, 330].forEach((a) => { const [x, y] = pontoNoCirculo(56, a); anel += `<g transform="translate(${n1(x)} ${n1(y)}) rotate(${a})">${bolota}</g>`; });
      return anel;
    });
    return `${coroa}${caindo}${faisca(20, 28, 2.4, '#fde68a', 0.5)}${faisca(118, 30, 2.4, '#fde68a', 1.5)}`;
  },

  'coracao-imaculado'() {
    const brilho = idDoEnfeite('ch-luz');
    const fogo = idDoEnfeite('ch-fogo');
    const coroa = pecaPremium('coroa-rosas', [0, 0, 136, 136], () => {
      const rosa = PECAS_PREMIUM.rosa('#fecdd3', '#e11d48', '#881337')();
      const rosaClara = PECAS_PREMIUM.rosa('#ffffff', '#fbcfe8', '#be185d')().split('id="ro"').join('id="ro2"').split('url(#ro)').join('url(#ro2)').split('id="rm"').join('id="rm2"').split('url(#rm)').join('url(#rm2)');
      const folha = PECAS_PREMIUM.folhaDeRosa();
      let c = anelDeMetal('ouro', { largura: 4.4 });
      for (let i = 0; i < 12; i += 1) {
        const a = i * 30 + 15;
        if (a > 150 && a < 210) continue;
        const [x, y] = pontoNoCirculo(55.5, a);
        const [fx, fy] = pontoNoCirculo(55.5, a + 15);
        c += `<g transform="translate(${n1(fx)} ${n1(fy)}) rotate(${a + 105})">${folha}</g><g transform="translate(${n1(x)} ${n1(y)}) scale(.82)">${i % 2 ? rosaClara : rosa}</g>`;
      }
      return c;
    });
    return `<defs><radialGradient id="${brilho}"><stop offset="0" stop-color="#fecaca" stop-opacity=".85"/><stop offset="1" stop-color="#fecaca" stop-opacity="0"/></radialGradient>
        <linearGradient id="${fogo}" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#dc2626"/><stop offset=".45" stop-color="#f97316"/><stop offset="1" stop-color="#fef08a"/></linearGradient></defs>
      ${coroa}
      ${reflexoNoAnel(idDoEnfeite('ci'), 53, 4.4)}
      <g transform="translate(68 118)">
        <circle r="17" fill="url(#${brilho})" class="enf-respira" style="--d:2.2s"/>
        ${[[-4, -9, 0.42], [0, -11, 0.5], [4, -9, 0.4]].map(([x, y, d], i) => `<g transform="translate(${x} ${y})"><g class="enf-chama" style="--d:${d}s;--a:${i * 0.15}s"><path d="M0 0C-2.6 -2.4 -2.2 -6 0 -10C2.2 -6 2.6 -2.4 0 0Z" fill="url(#${fogo})"/></g></g>`).join('')}
        ${pecaPremium('coracao-imaculado', [-18, -11, 34, 24], PECAS_PREMIUM.coracao)}
      </g>
      ${faisca(22, 26, 2.6, '#fff1f2', 0.4)}${faisca(114, 26, 2.6, '#fff1f2', 1.4)}`;
  },

  'luz-divina'() {
    const halo = idDoEnfeite('ld-halo');
    return `<defs><radialGradient id="${halo}"><stop offset=".7" stop-color="#fde68a" stop-opacity="0"/><stop offset=".8" stop-color="#fef3c7" stop-opacity=".55"/><stop offset="1" stop-color="#fde68a" stop-opacity="0"/></radialGradient></defs><circle cx="68" cy="68" r="76" fill="url(#${halo})" class="enf-respira" style="--d:2.6s"/><g class="enf-gira" style="--d:70s"><g class="enf-respira" style="--d:3s">${pecaPremium('raios-divinos', [-10, -10, 156, 156], PECAS_PREMIUM.raiosDivinos)}</g></g>
      ${pecaPremium('anel-ouro-ld', [0, 0, 136, 136], () => anelDeMetal('ouro', { rebites: [0, 90, 180, 270] }))}
      ${reflexoNoAnel(idDoEnfeite('ld'), 53, 5.2)}
      <circle cx="30" cy="110" r=".9" fill="#fffbeb" class="enf-sobe-lento" style="--d:5s"/><circle cx="106" cy="112" r=".8" fill="#fffbeb" class="enf-sobe-lento" style="--d:6s;--a:-2s"/>
      ${faisca(68, -8, 3.4, '#ffffff', 0.2)}${faisca(-6, 68, 2.8, '#fffbeb', 1)}${faisca(142, 68, 2.8, '#fffbeb', 1.7)}${faisca(68, 144, 2.6, '#fffbeb', 2.4)}`;
  },
});

function nuvemDoDia(id, claro, meio, sombra) {
  const bolas = [[-24, 4, 6], [-15, 0, 8.5], [-4, -4, 10], [8, -2, 9], [18, 2, 7], [26, 5, 4.6], [0, 4, 8]];
  return `<defs><linearGradient id="${id}" gradientUnits="userSpaceOnUse" x1="0" y1="-14" x2="0" y2="10"><stop offset="0" stop-color="${claro}"/><stop offset=".55" stop-color="${meio}"/><stop offset="1" stop-color="${sombra}"/></linearGradient></defs>
    <rect x="-28" y="3" width="58" height="7" rx="3.5" fill="url(#${id})"/>${bolas.map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="url(#${id})"/>`).join('')}`;
}

const PECAS_DAS_FAIXAS = {
  edenFundo: () => `<defs>
      <linearGradient id="ec" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7cc4f2"/><stop offset=".6" stop-color="#cfe9f7"/><stop offset="1" stop-color="#fde7c4"/></linearGradient>
      <radialGradient id="esol" gradientUnits="userSpaceOnUse" cx="286" cy="16" r="90"><stop offset="0" stop-color="#fffbe6" stop-opacity="1"/><stop offset=".2" stop-color="#fde68a" stop-opacity=".6"/><stop offset="1" stop-color="#fde68a" stop-opacity="0"/></radialGradient>
      <linearGradient id="em1" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8fbf9a"/><stop offset="1" stop-color="#5d8f72"/></linearGradient>
      <linearGradient id="em2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7ccf5a"/><stop offset="1" stop-color="#3f8f3a"/></linearGradient>
      <linearGradient id="em3" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9be15d"/><stop offset="1" stop-color="#4d9a2c"/></linearGradient>
      <linearGradient id="er" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#7dd3fc"/><stop offset=".5" stop-color="#e0f2fe"/><stop offset="1" stop-color="#38bdf8"/></linearGradient>
    </defs>
    <rect width="320" height="80" fill="url(#ec)"/><rect width="320" height="80" fill="url(#esol)"/>
    <path d="M0 52C40 40 80 44 120 38C160 32 200 40 240 34C270 30 300 36 320 32V80H0Z" fill="url(#em1)" opacity=".85"/>
    <path d="M0 62C50 52 100 58 150 50C200 44 250 54 320 46V80H0Z" fill="url(#em2)"/>
    <path d="M150 80C175 70 205 66 232 66C258 66 280 72 300 80Z" fill="url(#er)" opacity=".9"/>
    <path d="M0 72C60 66 120 70 170 66C230 62 280 70 320 66V80H0Z" fill="url(#em3)"/>`,
  arvoreDaVida: () => {
    const copa = [[0, -20, 14], [-12, -14, 10], [12, -14, 10], [-18, -4, 8], [18, -4, 8], [-7, -8, 11], [7, -8, 11], [0, -30, 9]];
    const macas = [[-8, -16], [6, -22], [12, -8], [-14, -4], [2, -10], [-2, -26]];
    return `<defs><radialGradient id="ac2" cx="35%" cy="30%" r="80%"><stop offset="0" stop-color="#a3e635"/><stop offset=".55" stop-color="#22a447"/><stop offset="1" stop-color="#14532d"/></radialGradient>
        <linearGradient id="at" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#5b3416"/><stop offset=".5" stop-color="#8b5a2b"/><stop offset="1" stop-color="#3f230e"/></linearGradient>
        <radialGradient id="am" cx="35%" cy="30%" r="70%"><stop offset="0" stop-color="#fecaca"/><stop offset=".5" stop-color="#ef4444"/><stop offset="1" stop-color="#7f1d1d"/></radialGradient></defs>
      <ellipse cx="0" cy="22" rx="20" ry="3" fill="#14532d" opacity=".35"/>
      <path d="M-3 22C-2 10 -4 2 -9 -4L-5 -5C-2 0 0 4 0 6C1 2 3 -2 6 -6L9 -4C4 2 3 10 4 22Z" fill="url(#at)"/>
      ${copa.map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="url(#ac2)"/>`).join('')}
      ${copa.map(([x, y, r]) => `<circle cx="${n1(x - r * 0.3)}" cy="${n1(y - r * 0.35)}" r="${n1(r * 0.35)}" fill="#d9f99d" opacity=".35"/>`).join('')}
      ${macas.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="1.9" fill="url(#am)"/><circle cx="${n1(x - 0.6)}" cy="${n1(y - 0.6)}" r=".5" fill="#fff" opacity=".8"/>`).join('')}`;
  },
  flores: () => {
    const sorteio = sorteioFixo(44);
    let f = '';
    const cores = [['#fff', '#fde68a'], ['#f9a8d4', '#fef08a'], ['#c4b5fd', '#fde68a'], ['#fca5a5', '#fef3c7'], ['#fde047', '#f59e0b']];
    for (let i = 0; i < 26; i += 1) {
      const x = 120 + sorteio() * 200;
      const y = 68 + sorteio() * 11;
      const [p, m] = cores[i % cores.length];
      const e = 0.7 + sorteio() * 0.6;
      let pet = '';
      for (let k = 0; k < 5; k += 1) pet += `<ellipse cx="0" cy="-1.8" rx="1.1" ry="1.8" transform="rotate(${k * 72})" fill="${p}" stroke="#00000022" stroke-width=".2"/>`;
      f += `<g transform="translate(${n1(x)} ${n1(y)}) scale(${n1(e)})"><path d="M0 0V5" stroke="#3f6212" stroke-width=".6"/>${pet}<circle r=".9" fill="${m}"/></g>`;
    }
    return f;
  },
  borboleta: (c1, c2) => () => `<defs><linearGradient id="bo" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></linearGradient></defs>
    <path d="M0 0C-3 -6 -9 -6 -8 -1C-7.5 1.4 -3 1.2 0 0Z" fill="url(#bo)" stroke="#1f2937" stroke-width=".3"/><path d="M0 0C-2 2 -6 5 -5 6.4C-3.6 7 -1 3 0 0Z" fill="url(#bo)" stroke="#1f2937" stroke-width=".3"/>
    <circle cx="-5" cy="-2.6" r=".9" fill="#fff" opacity=".7"/><ellipse cx="0" cy=".6" rx=".6" ry="2.6" fill="#1f2937"/>`,
  arcaCeu: () => `<defs>
      <linearGradient id="ac3" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5b7fb8"/><stop offset=".55" stop-color="#a9c6e8"/><stop offset="1" stop-color="#f6dfb8"/></linearGradient>
      <radialGradient id="al" gradientUnits="userSpaceOnUse" cx="250" cy="10" r="120"><stop offset="0" stop-color="#fffbe6" stop-opacity=".9"/><stop offset=".3" stop-color="#fde68a" stop-opacity=".35"/><stop offset="1" stop-color="#fde68a" stop-opacity="0"/></radialGradient>
    </defs>
    <rect width="320" height="80" fill="url(#ac3)"/><rect width="320" height="80" fill="url(#al)"/>
    ${['#ef4444', '#f97316', '#facc15', '#22c55e', '#3b82f6', '#6366f1', '#a855f7'].map((c, i) => `<path d="M${150 + i * 3.6} 70A${92 - i * 3.6} ${66 - i * 3.6} 0 0 1 ${334 - i * 3.6} 70" fill="none" stroke="${c}" stroke-width="3.6" opacity=".55"/>`).join('')}`,
  arca: () => `<defs><linearGradient id="ak" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#b7793f"/><stop offset=".5" stop-color="#8a5326"/><stop offset="1" stop-color="#4a2a10"/></linearGradient>
      <linearGradient id="ar2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7c2d12"/><stop offset="1" stop-color="#431407"/></linearGradient>
      <linearGradient id="ag" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fde047"/><stop offset="1" stop-color="#d97706"/></linearGradient></defs>
    <path d="M-38 0H38L30 15C10 18 -10 18 -30 15Z" fill="url(#ak)" stroke="#3b1f0a" stroke-width=".5"/>
    ${[3, 6.5, 10, 13].map((y) => `<path d="M${-37 + y * 0.55} ${y}H${37 - y * 0.55}" stroke="#3b1f0a" stroke-width=".35" opacity=".7"/>`).join('')}
    <path d="M-24 -13H22V0H-24Z" fill="url(#ak)" stroke="#3b1f0a" stroke-width=".45"/>
    <path d="M-28 -13L-1 -25L26 -13Z" fill="url(#ar2)" stroke="#2a0e04" stroke-width=".45"/>
    ${[-15, -4, 7].map((x) => `<rect x="${x}" y="-9" width="6" height="5" rx="1" fill="#fef3c7" stroke="#3b1f0a" stroke-width=".4"/>`).join('')}
    <g transform="translate(16 -12)"><path d="M0 0L1 -10L2.6 -10L2 0Z" fill="url(#ag)"/><path d="M1.6 -10C1.6 -12 4 -13.6 6 -13C6.2 -11.6 4.6 -10.4 2.6 -10Z" fill="url(#ag)"/><circle cx="4.4" cy="-12.2" r=".4" fill="#1f2937"/><path d="M1.4 -6L2.2 -5.4M1.2 -3L2 -2.6" stroke="#92400e" stroke-width=".5"/></g>
    <g transform="translate(-21 -11)"><ellipse rx="4.2" ry="3.4" fill="#9ca3af"/><path d="M-3 1.6C-4 4 -4.6 5 -3.6 6" fill="none" stroke="#9ca3af" stroke-width="1.4" stroke-linecap="round"/><circle cx="-1.6" cy="-1" r=".45" fill="#1f2937"/><ellipse cx="2.6" cy="-1" rx="1.6" ry="2.2" fill="#d1d5db"/></g>`,
  pombaComRamo: () => `<defs><linearGradient id="pd" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff"/><stop offset="1" stop-color="#cbd5e1"/></linearGradient></defs>
    <path d="M-6 0C-3 -2 3 -2 6 -1C8 0 8 1.4 6 2C2 3 -3 2.6 -6 0Z" fill="url(#pd)"/><circle cx="6" cy="-.6" r="1.8" fill="url(#pd)"/><path d="M7.6 -.6L9.6 0L7.6 .4Z" fill="#f59e0b"/>
    <path d="M9 .2C10.6 1.4 12 1 13 2" fill="none" stroke="#3f6212" stroke-width=".5"/><path d="M11 1.3C11.6 .3 12.6 .4 12.6 1.3C12 1.9 11.4 1.8 11 1.3Z" fill="#65a30d"/><path d="M12.4 2.2C13.2 1.6 14 2 13.8 2.8C13.1 3.1 12.6 2.8 12.4 2.2Z" fill="#65a30d"/>
    <path d="M-6 0L-10 -1.6L-9.4 1L-10.6 2.6L-6 1.4Z" fill="url(#pd)"/>`,
  asaDaPomba: () => `<path d="M0 0C-2 -4 -6 -7 -10 -7C-7 -4 -4 -1 0 0Z" fill="#f8fafc" stroke="#cbd5e1" stroke-width=".3"/><path d="M-1 -1.4C-3 -4 -6 -5.4 -8.4 -5.2" fill="none" stroke="#cbd5e1" stroke-width=".3"/>`,
  marFundo: () => `<defs><linearGradient id="mf" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#22d3ee"/><stop offset=".45" stop-color="#0e7490"/><stop offset="1" stop-color="#083344"/></linearGradient>
      <linearGradient id="ma" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fde68a"/><stop offset="1" stop-color="#b45309"/></linearGradient></defs>
    <rect width="320" height="80" fill="url(#mf)"/>
    <path d="M100 80C130 70 170 74 210 70C250 66 290 72 320 69V80Z" fill="url(#ma)"/>
    <path d="M150 76C160 74 170 75 180 74M230 73C240 71 252 72 262 71" stroke="#fef3c7" stroke-width=".6" opacity=".6"/>`,
  coralRamo: () => `<defs><linearGradient id="cr" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#be185d"/><stop offset="1" stop-color="#f9a8d4"/></linearGradient></defs>
    <path d="M0 0C0 -6 -1 -10 -4 -14M0 -5C2 -9 5 -11 6 -16M-2 -9C-5 -11 -7 -12 -8 -15M3 -10C5 -12 4 -15 3 -18" fill="none" stroke="url(#cr)" stroke-width="2.2" stroke-linecap="round"/>`,
  coralLeque: () => `<defs><radialGradient id="cl" cx="50%" cy="100%" r="100%"><stop offset="0" stop-color="#6d28d9"/><stop offset="1" stop-color="#c4b5fd"/></radialGradient></defs>
    <path d="M0 0C-10 -6 -12 -16 -6 -20C-2 -22 2 -22 6 -20C12 -16 10 -6 0 0Z" fill="url(#cl)" opacity=".9"/>
    <path d="M0 0L-6 -18M0 0L0 -21M0 0L6 -18M0 0L-9 -12M0 0L9 -12" stroke="#ede9fe" stroke-width=".35" opacity=".7"/>`,
  estrelaDoMar: () => `<path d="${caminhoDeEstrela(0, 0, 5, 2.2, 5)}" fill="#fb923c" stroke="#c2410c" stroke-width=".4" stroke-linejoin="round"/><circle r="1" fill="#fed7aa"/>`,
  peixePalhaco: () => `<defs><linearGradient id="pp" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fdba74"/><stop offset="1" stop-color="#ea580c"/></linearGradient></defs>
    <path d="M-8 0C-5 -5 5 -5 8 0C5 5 -5 5 -8 0Z" fill="url(#pp)" stroke="#1f2937" stroke-width=".4"/><path d="M-8 0L-12 -3.4L-11 0L-12 3.4Z" fill="url(#pp)" stroke="#1f2937" stroke-width=".4"/>
    <path d="M2.6 -3.6C1.6 -1 1.6 1 2.6 3.6M-2.6 -3.8C-3.6 -1 -3.6 1 -2.6 3.8" stroke="#fff" stroke-width="1.4"/><circle cx="5.4" cy="-.8" r=".9" fill="#111827"/><circle cx="5.6" cy="-1" r=".3" fill="#fff"/>`,
  peixeAzul: () => `<defs><linearGradient id="pz" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#60a5fa"/><stop offset="1" stop-color="#1e3a8a"/></linearGradient></defs>
    <path d="M-7 0C-4 -6 5 -6 8 0C5 6 -4 6 -7 0Z" fill="url(#pz)" stroke="#0f172a" stroke-width=".4"/><path d="M-7 0L-11 -3L-11 3Z" fill="#facc15"/><path d="M-3 -3C0 -1 2 -1 5 -2.6" stroke="#0f172a" stroke-width=".8" fill="none"/><circle cx="5" cy="-.8" r=".8" fill="#111827"/>`,
  peixeAmarelo: () => `<defs><linearGradient id="py" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fef08a"/><stop offset="1" stop-color="#eab308"/></linearGradient></defs>
    <path d="M-6 0C-4 -7 4 -7 7 0C4 6 -4 6 -6 0Z" fill="url(#py)" stroke="#713f12" stroke-width=".4"/><path d="M-6 0L-9.6 -2.6L-9.6 2.6Z" fill="url(#py)"/><circle cx="4.2" cy="-1" r=".8" fill="#111827"/>`,
  luaSorrindo: () => `<defs><radialGradient id="lu" cx="35%" cy="35%" r="75%"><stop offset="0" stop-color="#fffbe6"/><stop offset=".6" stop-color="#fde68a"/><stop offset="1" stop-color="#d97706"/></radialGradient></defs>
    <path d="M6 -14A15 15 0 1 0 6 14A11.5 11.5 0 1 1 6 -14Z" fill="url(#lu)" stroke="#b45309" stroke-width=".5"/>
    <path d="M-5.6 -3.2Q-4.4 -4.4 -3.2 -3.2" fill="none" stroke="#78350f" stroke-width=".8" stroke-linecap="round"/><path d="M-6.4 3Q-4.4 5 -2.6 3.2" fill="none" stroke="#78350f" stroke-width=".8" stroke-linecap="round"/>
    <circle cx="-7.6" cy=".4" r="1.5" fill="#fb7185" opacity=".45"/>
    <path d="M-1 -12.4C3 -16 9 -16 12 -12L10 -10C8 -12.6 4 -12.8 1 -10.6Z" fill="#6366f1"/><circle cx="12.6" cy="-11" r="1.6" fill="#fff"/>`,
};

Object.assign(FAIXAS, {
  'jardim-do-eden'() {
    const borboletas = [['#f9a8d4', '#a855f7', 210, 22, 0], ['#fde047', '#f97316', 268, 30, 1.4], ['#7dd3fc', '#2563eb', 170, 34, 2.6]].map(([c1, c2, x, y, a], i) => `<g transform="translate(${x} ${y})"><g class="enf-borboleta-voa" style="--a:-${a}s"><g class="enf-bate" style="--a:${n1(i * 0.1)}s">${pecaPremium(`borboleta-${i}`, [-9, -7, 18, 14], PECAS_DAS_FAIXAS.borboleta(c1, c2))}</g><g transform="scale(-1 1)"><g class="enf-bate" style="--a:${n1(i * 0.1)}s">${pecaPremium(`borboleta-${i}`, [-9, -7, 18, 14], PECAS_DAS_FAIXAS.borboleta(c1, c2))}</g></g></g></g>`).join('');
    return `${pecaPremium('eden-fundo', [0, 0, 320, 80], PECAS_DAS_FAIXAS.edenFundo)}
      <g class="enf-respira" style="--d:4s"><circle cx="286" cy="16" r="16" fill="#fef9c3" opacity=".35"/></g><circle cx="286" cy="16" r="8.5" fill="#fffbe6"/><circle cx="286" cy="16" r="6" fill="#ffffff"/>
      <g transform="translate(250 50)">${pecaPremium('arvore-da-vida', [-24, -42, 48, 68], PECAS_DAS_FAIXAS.arvoreDaVida)}</g>
      <g transform="translate(176 56) scale(.62)">${pecaPremium('arvore-da-vida', [-24, -42, 48, 68], PECAS_DAS_FAIXAS.arvoreDaVida)}</g>
      <g transform="translate(306 58) scale(.7)">${pecaPremium('arvore-da-vida', [-24, -42, 48, 68], PECAS_DAS_FAIXAS.arvoreDaVida)}</g>
      <g class="enf-balanca-suave">${pecaPremium('flores-eden', [0, 0, 320, 80], PECAS_DAS_FAIXAS.flores)}</g>
      ${borboletas}`;
  },

  'arca-de-noe'() {
    const onda = (y, c1, c2, d, a, amp) => {
      let caminho = `M0 ${y}`;
      for (let x = 0; x <= 380; x += 20) caminho += `Q${x + 10} ${y - amp} ${x + 20} ${y}`;
      return `<g class="enf-onda" style="--d:${d}s;--a:-${a}s"><path d="${caminho}V80H0Z" fill="${c1}"/><path d="${caminho}" fill="none" stroke="${c2}" stroke-width=".8" opacity=".8"/></g>`;
    };
    const asa = pecaPremium('asa-pomba-arca', [-11, -8, 12, 9], PECAS_DAS_FAIXAS.asaDaPomba);
    return `${pecaPremium('arca-ceu', [0, 0, 320, 80], PECAS_DAS_FAIXAS.arcaCeu)}
      ${nuvemFofa(176, 18, 0.7, pecaPremium('nuvem-dia', [-30, -14, 62, 26], () => nuvemDoDia('nd', '#ffffff', '#f1f5f9', '#cbd5e1')), 30, 0)}
      ${nuvemFofa(300, 12, 0.6, pecaPremium('nuvem-dia', [-30, -14, 62, 26], () => nuvemDoDia('nd', '#ffffff', '#f1f5f9', '#cbd5e1')), 26, 5)}
      ${onda(62, '#1d6fa5', '#93c5fd', 7, 0, 3)}
      <g transform="translate(246 56) scale(1.28)"><g class="enf-balanca-suave">${pecaPremium('arca', [-40, -27, 80, 46], PECAS_DAS_FAIXAS.arca)}</g></g>
      ${onda(68, '#155e8c', '#bae6fd', 5, 2, 3.4)}${onda(74, '#0c4a6e', '#7dd3fc', 4, 1, 2.6)}
      <g transform="translate(200 26)"><g class="enf-voa-curto"><g transform="scale(1.4)">${pecaPremium('pomba-ramo', [-11, -4, 26, 8], PECAS_DAS_FAIXAS.pombaComRamo)}<g transform="translate(-1 -.6)"><g class="enf-bate-asa">${asa}</g></g></g></g></g>
      ${faisca(286, 10, 2.2, '#fffbeb', 0.4)}${faisca(160, 30, 2, '#fffbeb', 1.6)}`;
  },

  'fundo-do-mar'() {
    const raios = idDoEnfeite('mar-raios');
    let bolhas = '';
    const sorteio = sorteioFixo(9);
    for (let i = 0; i < 14; i += 1) bolhas += `<g transform="translate(${n1(130 + sorteio() * 190)} ${n1(70 + sorteio() * 8)})"><circle class="enf-sobe-lento" style="--a:-${n1(sorteio() * 9)}s;--d:${n1(5 + sorteio() * 4)}s" r="${n1(1 + sorteio() * 1.8)}" fill="#e0f2fe" fill-opacity=".18" stroke="#e0f2fe" stroke-width=".5"/></g>`;
    const peixe = (p, x, y, d, a, e) => `<g transform="translate(${x} ${y})"><g class="enf-voa" style="--d:${d}s;--a:-${a}s"><g transform="scale(-${e} ${e})">${p}</g></g></g>`;
    const pp = pecaPremium('peixe-palhaco', [-13, -6, 22, 12], PECAS_DAS_FAIXAS.peixePalhaco);
    const pz = pecaPremium('peixe-azul', [-12, -6, 21, 12], PECAS_DAS_FAIXAS.peixeAzul);
    const py = pecaPremium('peixe-amarelo', [-10, -6, 18, 12], PECAS_DAS_FAIXAS.peixeAmarelo);
    return `<defs><linearGradient id="${raios}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ecfeff" stop-opacity=".5"/><stop offset="1" stop-color="#ecfeff" stop-opacity="0"/></linearGradient></defs>
      ${pecaPremium('mar-fundo', [0, 0, 320, 80], PECAS_DAS_FAIXAS.marFundo)}
      <g class="enf-raios-agua" fill="url(#${raios})"><path d="M180 0H190L170 80H150Z"/><path d="M236 0H242L232 80H216Z"/><path d="M290 0H300L296 80H276Z"/></g>
      <g transform="translate(178 76)"><g class="enf-balanca-suave">${pecaPremium('coral-ramo', [-10, -20, 18, 22], PECAS_DAS_FAIXAS.coralRamo)}</g></g>
      <g transform="translate(296 76)"><g class="enf-balanca-suave">${pecaPremium('coral-leque', [-13, -23, 26, 24], PECAS_DAS_FAIXAS.coralLeque)}</g></g>
      <path d="M206 80C204 70 210 64 206 56C204 50 208 46 206 40" fill="none" stroke="#16a34a" stroke-width="2.4" stroke-linecap="round" class="enf-balanca-suave"/>
      <path d="M262 80C266 72 260 66 264 58" fill="none" stroke="#22c55e" stroke-width="2.2" stroke-linecap="round" class="enf-balanca-suave"/>
      <g transform="translate(240 75) rotate(-15)">${pecaPremium('estrela-do-mar', [-6, -6, 12, 12], PECAS_DAS_FAIXAS.estrelaDoMar)}</g>
      ${peixe(pp, 330, 30, 13, 0, 1.55)}${peixe(pz, 360, 50, 16, 5, 1.45)}${peixe(py, 300, 18, 11, 8, 1.35)}${peixe(pp, 370, 58, 20, 12, 1)}
      ${bolhas}`;
  },

  'estrelinhas-do-ceu'() {
    const ceu = idDoEnfeite('noite');
    const sorteio = sorteioFixo(21);
    let estrelas = '';
    for (let i = 0; i < 14; i += 1) {
      const peca = pecaPremium(`estrela-doce-${i % 6}`, [-9, -9, 18, 19], PECAS_PREMIUM.estrelaDoce(CORES_DE_ESTRELA[i % 6]));
      estrelas += `<g transform="translate(${n1(120 + sorteio() * 196)} ${n1(8 + sorteio() * 60)}) scale(${n1(0.35 + sorteio() * 0.35)})"><g class="enf-cintila" style="--a:${n1(sorteio() * 3)}s">${peca}</g></g>`;
    }
    let pontos = '';
    for (let i = 0; i < 40; i += 1) pontos += `<circle cx="${n1(sorteio() * 320)}" cy="${n1(sorteio() * 80)}" r="${n1(0.3 + sorteio() * 0.6)}" fill="#fff" class="enf-pisca" style="--a:${n1(sorteio() * 3)}s"/>`;
    return `<defs><linearGradient id="${ceu}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1e1b4b"/><stop offset=".6" stop-color="#3b2a7a"/><stop offset="1" stop-color="#6b3fa0"/></linearGradient></defs>
      <rect width="320" height="80" fill="url(#${ceu})"/>${pontos}
      <g class="enf-cadente" style="--a:-1s"><path d="M300 6L284 12" stroke="#fff" stroke-width="1" stroke-linecap="round"/></g>
      ${estrelas}
      ${nuvemFofa(272, 60, 0.75, pecaPremium('nuvem-noite', [-30, -14, 62, 26], () => nuvemDoDia('nn', '#e0e7ff', '#a5b4fc', '#6366f1')), 24, 0)}
      <g transform="translate(276 38)"><g class="enf-flutua">${pecaPremium('lua-sorrindo', [-16, -18, 32, 34], PECAS_DAS_FAIXAS.luaSorrindo)}</g></g>`;
  },
});

Object.assign(PECAS_DAS_FAIXAS, {
  pentecostesFundo: () => {
    let raios = '';
    for (let i = 0; i < 18; i += 1) raios += `<path d="M0 0L${n1(Math.cos((i * 20 * Math.PI) / 180 - 0.06) * 200)} ${n1(Math.sin((i * 20 * Math.PI) / 180 - 0.06) * 200)}L${n1(Math.cos((i * 20 * Math.PI) / 180 + 0.06) * 200)} ${n1(Math.sin((i * 20 * Math.PI) / 180 + 0.06) * 200)}Z"/>`;
    return `<defs><linearGradient id="pfc" x1="0" y1="0" x2=".4" y2="1"><stop offset="0" stop-color="#2a0710"/><stop offset=".5" stop-color="#7c1d12"/><stop offset="1" stop-color="#c2410c"/></linearGradient>
        <radialGradient id="pfl" gradientUnits="userSpaceOnUse" cx="262" cy="16" r="130"><stop offset="0" stop-color="#fffbeb" stop-opacity="1"/><stop offset=".15" stop-color="#fde68a" stop-opacity=".75"/><stop offset=".45" stop-color="#f97316" stop-opacity=".25"/><stop offset="1" stop-color="#f97316" stop-opacity="0"/></radialGradient>
        <radialGradient id="pfr" gradientUnits="userSpaceOnUse" cx="0" cy="0" r="200"><stop offset="0" stop-color="#fff7d6" stop-opacity=".35"/><stop offset="1" stop-color="#fff7d6" stop-opacity="0"/></radialGradient></defs>
      <rect width="320" height="80" fill="url(#pfc)"/><rect width="320" height="80" fill="url(#pfl)"/>
      <g transform="translate(262 16)" fill="url(#pfr)">${raios}</g>`;
  },
  pombaDeFrente: () => `<defs><linearGradient id="pdf" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#e2e8f0"/></linearGradient></defs>
    ${[[0, 1], [1, -1]].map(([k, s]) => `<g transform="scale(${s} 1)">${[[14, 22], [8, 20], [2, 17], [-6, 13]].map(([a, L]) => `<path d="M2 0C${n1(L * 0.3)} ${n1(-L * 0.25 - a * 0.1)} ${n1(L * 0.7)} ${n1(-L * 0.3 - a * 0.2)} ${L} ${n1(-a * 0.6 - 4)}C${n1(L * 0.7)} ${n1(-a * 0.2)} ${n1(L * 0.3)} 2 2 2Z" fill="url(#pdf)" stroke="#cbd5e1" stroke-width=".35"/>`).join('')}</g>`).join('')}
    <ellipse cx="0" cy="2" rx="3.2" ry="6.5" fill="url(#pdf)" stroke="#cbd5e1" stroke-width=".35"/><circle cx="0" cy="-4.6" r="2.6" fill="url(#pdf)" stroke="#cbd5e1" stroke-width=".35"/>
    <path d="M-.7 -3.6L0 -2.2L.7 -3.6Z" fill="#f59e0b"/><path d="M-2.4 8L0 13L2.4 8Z" fill="url(#pdf)" stroke="#cbd5e1" stroke-width=".35"/>`,
  apostolos: () => {
    const pos = [[170, 1, '#3b1a12'], [192, 0.9, '#2a120c'], [214, 1.05, '#3b1a12'], [238, 0.95, '#2a120c'], [262, 1.08, '#3b1a12'], [286, 0.92, '#2a120c'], [308, 1, '#3b1a12']];
    return `<defs><linearGradient id="apr" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fdba74" stop-opacity=".7"/><stop offset=".25" stop-color="#fdba74" stop-opacity="0"/></linearGradient></defs>
      ${pos.map(([x, e, c]) => `<g transform="translate(${x} 80) scale(${e})"><path d="M-12 0C-12 -10 -8 -14 -4 -15C-6 -17 -6.5 -21 -5 -24C-3 -27.5 3 -27.5 5 -24C6.5 -21 6 -17 4 -15C8 -14 12 -10 12 0Z" fill="${c}"/><path d="M-12 0C-12 -10 -8 -14 -4 -15C-6 -17 -6.5 -21 -5 -24C-3 -27.5 3 -27.5 5 -24" fill="none" stroke="#fdba74" stroke-width=".7" opacity=".55"/></g>`).join('')}`;
  },
  getsemaniFundo: () => `<defs><linearGradient id="gfc" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#030712"/><stop offset=".6" stop-color="#0f1b3d"/><stop offset="1" stop-color="#1e2b52"/></linearGradient>
      <radialGradient id="gfl" gradientUnits="userSpaceOnUse" cx="292" cy="18" r="70"><stop offset="0" stop-color="#e2e8f0" stop-opacity=".55"/><stop offset=".3" stop-color="#cbd5e1" stop-opacity=".18"/><stop offset="1" stop-color="#cbd5e1" stop-opacity="0"/></radialGradient>
      <radialGradient id="gflua" cx="40%" cy="40%" r="70%"><stop offset="0" stop-color="#ffffff"/><stop offset=".7" stop-color="#e2e8f0"/><stop offset="1" stop-color="#94a3b8"/></radialGradient>
      <linearGradient id="gfh" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1e293b"/><stop offset="1" stop-color="#0b1120"/></linearGradient></defs>
    <rect width="320" height="80" fill="url(#gfc)"/><rect width="320" height="80" fill="url(#gfl)"/>
    <circle cx="292" cy="18" r="9" fill="url(#gflua)"/><circle cx="289" cy="15.6" r="1.6" fill="#cbd5e1" opacity=".5"/><circle cx="295" cy="20.4" r="1.2" fill="#cbd5e1" opacity=".45"/>
    <path d="M0 66C60 60 120 64 180 58C230 54 280 60 320 56V80H0Z" fill="url(#gfh)"/>`,
  oliveira: () => `<defs><linearGradient id="otr" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#1c1917"/><stop offset=".6" stop-color="#44403c"/><stop offset="1" stop-color="#78716c"/></linearGradient>
      <radialGradient id="ofo" cx="60%" cy="25%" r="80%"><stop offset="0" stop-color="#8aa29a"/><stop offset=".5" stop-color="#3f5550"/><stop offset="1" stop-color="#1b2a2a"/></radialGradient></defs>
    <path d="M-3 24C-2 18 -5 14 -3 9C-1 5 -6 2 -9 -2L-6 -3C-3 0 -1 2 0 4C1 0 4 -2 7 -5L9 -3C5 1 3 5 4 9C6 14 3 18 4 24Z" fill="url(#otr)"/>
    ${[[-12, -8, 9, 5], [0, -12, 11, 6], [12, -7, 9, 5], [-6, -4, 8, 4], [7, -2, 8, 4], [-17, -2, 6, 3.4], [18, -1, 6, 3.4]].map(([x, y, rx, ry]) => `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="url(#ofo)"/>`).join('')}
    ${[[-12, -10], [0, -15], [12, -9], [4, -6]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="4.5" ry="1.4" fill="#c7d6d0" opacity=".25"/>`).join('')}`,
  jesusRezando: () => `<defs><linearGradient id="jr" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#cbd5e1"/><stop offset=".4" stop-color="#475569"/><stop offset="1" stop-color="#1e293b"/></linearGradient>
      <linearGradient id="jp" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#94a3b8"/><stop offset="1" stop-color="#1f2937"/></linearGradient></defs>
    <path d="M-16 12C-16 4 -10 -2 -2 -3C6 -3 14 2 15 12Z" fill="url(#jp)"/>
    <path d="M-4 -3C-6 -6 -6 -10 -4 -13C-3 -15 -1 -16 1 -15.4C2 -18 4.6 -19 6.6 -17.4C8.6 -15.8 8.4 -12.6 6.6 -11C9 -9 10 -6 9.6 -3Z" fill="url(#jr)"/>
    <path d="M6.6 -17.4C8.6 -15.8 8.4 -12.6 6.6 -11M1 -15.4C3.4 -14 6 -12 9.6 -8" fill="none" stroke="#f1f5f9" stroke-width=".6" opacity=".7"/>
    <circle cx="4.4" cy="-15.6" r="4.6" fill="none" stroke="#fef9c3" stroke-width=".7" opacity=".7"/>`,
  basilicaFundo: () => `<defs><linearGradient id="bfc" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1e1b4b"/><stop offset=".4" stop-color="#7e1d5b"/><stop offset=".75" stop-color="#ea580c"/><stop offset="1" stop-color="#fbbf24"/></linearGradient>
      <radialGradient id="bfs" gradientUnits="userSpaceOnUse" cx="190" cy="74" r="110"><stop offset="0" stop-color="#fffbeb" stop-opacity="1"/><stop offset=".12" stop-color="#fde68a" stop-opacity=".8"/><stop offset=".4" stop-color="#fb923c" stop-opacity=".3"/><stop offset="1" stop-color="#fb923c" stop-opacity="0"/></radialGradient></defs>
    <rect width="320" height="80" fill="url(#bfc)"/><rect width="320" height="80" fill="url(#bfs)"/>
    <circle cx="190" cy="76" r="10" fill="#fff7d6"/>`,
  basilica: () => {
    const colunas = (x0, n, passo, y, h) => Array.from({ length: n }, (_, i) => `<rect x="${n1(x0 + i * passo)}" y="${y}" width="1.2" height="${h}" fill="#3a2a4a"/>`).join('');
    return `<defs><linearGradient id="bsp" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4b3863"/><stop offset="1" stop-color="#1d1428"/></linearGradient>
        <linearGradient id="bsd" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#2a1f3a"/><stop offset=".35" stop-color="#6b5288"/><stop offset=".55" stop-color="#3d2d52"/><stop offset="1" stop-color="#1d1428"/></linearGradient></defs>
      <path d="M-46 0V-8H-6V0ZM46 0V-8H6V0Z" fill="url(#bsp)"/>${colunas(-45, 16, 2.5, -8, 8)}${colunas(6.5, 16, 2.5, -8, 8)}
      <path d="M-22 0V-20H22V0Z" fill="url(#bsp)"/>${colunas(-20, 10, 4.2, -18, 16)}
      <path d="M-24 -20L0 -27L24 -20Z" fill="url(#bsp)"/>
      <path d="M-14 -27V-33H14V-27Z" fill="url(#bsp)"/>${colunas(-13, 8, 3.6, -33, 6)}
      <path d="M-14 -33C-14 -48 -6 -55 0 -56C6 -55 14 -48 14 -33Z" fill="url(#bsd)"/>
      <path d="M-9 -34C-9 -45 -4 -51 0 -52M-4 -34C-4 -46 -2 -52 0 -53M4 -34C4 -46 2 -52 0 -53M9 -34C9 -45 4 -51 0 -52" fill="none" stroke="#8d75a8" stroke-width=".35" opacity=".7"/>
      <path d="M-2 -56V-61H2V-56Z" fill="url(#bsp)"/><path d="M-2.4 -61C-2.4 -63 2.4 -63 2.4 -61Z" fill="#4b3863"/>
      <path d="M0 -62.6V-69M-2 -67H2" stroke="#fde68a" stroke-width=".8"/>
      <path d="M58 0V-26L59.6 -30L61.2 -26V0Z" fill="url(#bsp)"/><path d="M59.6 -30V-33M58.6 -32H60.6" stroke="#fde68a" stroke-width=".5"/>`;
  },
  janelas: () => [[-17, -14], [-9, -14], [-1.2, -14], [6.6, -14], [14.4, -14], [-9, -31], [-1.2, -31], [6.6, -31], [-38, -5], [-30, -5], [26, -5], [34, -5]]
    .map(([x, y]) => `<rect x="${x}" y="${y}" width="2.2" height="3.4" rx="1.1" fill="#fcd34d"/>`).join(''),
});

Object.assign(FAIXAS, {
  'pentecostes-faixa'() {
    const fogo = idDoEnfeite('pf-fogo');
    const luz = idDoEnfeite('pf-luz');
    const chama = (x, y, i) => `<g transform="translate(${x} ${y})"><g class="enf-chama" style="--d:${n1(0.38 + (i % 3) * 0.08)}s;--a:${n1(i * 0.13)}s"><path d="M0 0C-3.4 -3 -3 -8 0 -14C3 -8 3.4 -3 0 0Z" fill="url(#${fogo})"/><path d="M0 -1C-1.4 -2.6 -1.2 -5.4 0 -8C1.2 -5.4 1.4 -2.6 0 -1Z" fill="#fef9c3"/></g></g>`;
    const xs = [170, 192, 214, 238, 262, 286, 308];
    return `<defs><linearGradient id="${fogo}" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#dc2626"/><stop offset=".5" stop-color="#f97316"/><stop offset="1" stop-color="#fde047"/></linearGradient>
        <radialGradient id="${luz}"><stop offset="0" stop-color="#fffbeb" stop-opacity=".95"/><stop offset=".5" stop-color="#fde68a" stop-opacity=".4"/><stop offset="1" stop-color="#fde68a" stop-opacity="0"/></radialGradient></defs>
      ${pecaPremium('pentecostes-fundo', [0, 0, 320, 80], PECAS_DAS_FAIXAS.pentecostesFundo)}
      <circle cx="262" cy="16" r="22" fill="url(#${luz})" class="enf-respira" style="--d:2.8s"/>
      <g transform="translate(262 15)"><g class="enf-flutua">${pecaPremium('pomba-frente', [-24, -16, 48, 30], PECAS_DAS_FAIXAS.pombaDeFrente)}</g></g>
      ${pecaPremium('apostolos', [150, 50, 170, 30], PECAS_DAS_FAIXAS.apostolos)}
      ${xs.map((x, i) => chama(x, 52 - (i % 2) * 2, i)).join('')}
      ${faisca(200, 18, 2, '#fef3c7', 0.4)}${faisca(300, 40, 1.8, '#fef3c7', 1.3)}${faisca(232, 34, 1.6, '#fef3c7', 2.1)}`;
  },

  'oliveiras-ao-luar'() {
    const sorteio = sorteioFixo(14);
    let estrelas = '';
    for (let i = 0; i < 30; i += 1) estrelas += `<circle cx="${n1(110 + sorteio() * 210)}" cy="${n1(3 + sorteio() * 40)}" r="${n1(0.3 + sorteio() * 0.6)}" fill="#fff" class="enf-pisca" style="--a:${n1(sorteio() * 3)}s"/>`;
    const feixe = idDoEnfeite('gt-feixe');
    const nevoa = idDoEnfeite('gt-nevoa');
    const oliveira = pecaPremium('oliveira', [-24, -20, 48, 46], PECAS_DAS_FAIXAS.oliveira);
    return `<defs><linearGradient id="${feixe}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fef9c3" stop-opacity=".0"/><stop offset=".4" stop-color="#fef9c3" stop-opacity=".18"/><stop offset="1" stop-color="#fef9c3" stop-opacity=".05"/></linearGradient>
        <linearGradient id="${nevoa}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#cbd5e1" stop-opacity="0"/><stop offset=".5" stop-color="#cbd5e1" stop-opacity=".18"/><stop offset="1" stop-color="#cbd5e1" stop-opacity="0"/></linearGradient></defs>
      ${pecaPremium('getsemani-fundo', [0, 0, 320, 80], PECAS_DAS_FAIXAS.getsemaniFundo)}
      ${estrelas}
      <path d="M234 0H254L270 80H222Z" fill="url(#${feixe})" class="enf-respira" style="--d:4s"/>
      <g transform="translate(178 56) scale(.95)">${oliveira}</g><g transform="translate(300 54) scale(1.1)">${oliveira}</g><g transform="translate(132 60) scale(.75)">${oliveira}</g>
      <g transform="translate(244 66) scale(1.3)"><path d="M-14 12C-12 2 -4 -1 6 0C12 1 16 6 16 12Z" fill="#334155"/><path d="M-12 4C-6 0 4 -1 12 2" stroke="#94a3b8" stroke-width=".6" opacity=".6"/>
        <g transform="translate(0 -.6) scale(.78)">${pecaPremium('jesus-rezando', [-17, -20, 34, 33], PECAS_DAS_FAIXAS.jesusRezando)}</g></g>
      <g class="enf-nuvem" style="--d:20s"><rect x="100" y="66" width="220" height="10" fill="url(#${nevoa})"/></g>`;
  },

  basilica() {
    const passaro = (x, y, d, a, e) => `<g transform="translate(${x} ${y}) scale(${e})"><g class="enf-voa" style="--d:${d}s;--a:-${a}s"><path d="M0 0Q2 -2 4 0Q6 -2 8 0" fill="none" stroke="#1d1428" stroke-width="1" stroke-linecap="round" class="enf-respira" style="--d:.5s"/></g></g>`;
    return `${pecaPremium('basilica-fundo', [0, 0, 320, 80], PECAS_DAS_FAIXAS.basilicaFundo)}
      ${nuvemFofa(140, 22, 0.7, pecaPremium('nuvem-tarde', [-30, -14, 62, 26], () => nuvemDoDia('nt', '#fde68a', '#f472b6', '#7e1d5b')), 32, 0)}
      ${nuvemFofa(290, 14, 0.6, pecaPremium('nuvem-tarde', [-30, -14, 62, 26], () => nuvemDoDia('nt', '#fde68a', '#f472b6', '#7e1d5b')), 26, 9)}
      <g transform="translate(252 80)">${pecaPremium('basilica', [-48, -70, 112, 72], PECAS_DAS_FAIXAS.basilica)}
        <g class="enf-respira" style="--d:3s">${pecaPremium('janelas', [-40, -33, 78, 33], PECAS_DAS_FAIXAS.janelas)}</g></g>
      ${passaro(330, 20, 16, 0, 1)}${passaro(350, 26, 18, 4, 0.8)}${passaro(370, 16, 15, 8, 0.9)}
      ${faisca(210, 50, 2, '#fffbeb', 0.6)}`;
  },
});

const SPRITES_PREMIUM = {};

function spritePremium(chave, criar) {
  if (!SPRITES_PREMIUM[chave]) SPRITES_PREMIUM[chave] = criar();
  const s = SPRITES_PREMIUM[chave];
  return s && s.tela !== undefined ? s.tela : s;
}

function focoDoEfeito(w, h, foco) {
  const f = foco || { x: w / 2, y: Math.min(h * 0.3, 170), r: Math.min(w, h) * 0.12 };
  return { cx: f.x, cy: f.y, R: Math.max(30, Math.min(f.r, 80)) };
}

function spriteDeBolha() {
  const tela = document.createElement('canvas');
  tela.width = 128;
  tela.height = 128;
  const c = tela.getContext('2d');
  if (!c) return tela;
  const g = c.createRadialGradient(64, 64, 40, 64, 64, 62);
  g.addColorStop(0, 'rgba(255, 255, 255, 0.02)');
  g.addColorStop(0.8, 'rgba(224, 242, 254, 0.12)');
  g.addColorStop(1, 'rgba(255, 255, 255, 0.5)');
  c.fillStyle = g;
  c.beginPath();
  c.arc(64, 64, 62, 0, Math.PI * 2);
  c.fill();
  const cores = ['rgba(244, 114, 182, 0.55)', 'rgba(250, 204, 21, 0.5)', 'rgba(74, 222, 128, 0.45)', 'rgba(96, 165, 250, 0.55)', 'rgba(192, 132, 252, 0.55)'];
  c.lineWidth = 3.2;
  cores.forEach((cor, i) => {
    c.strokeStyle = cor;
    c.beginPath();
    c.arc(64, 64, 59, (i / cores.length) * Math.PI * 2 + 0.3, ((i + 1) / cores.length) * Math.PI * 2 + 0.3);
    c.stroke();
  });
  c.fillStyle = 'rgba(255, 255, 255, 0.9)';
  c.beginPath();
  c.ellipse(44, 40, 14, 8, -0.7, 0, Math.PI * 2);
  c.fill();
  c.fillStyle = 'rgba(255, 255, 255, 0.55)';
  c.beginPath();
  c.arc(86, 90, 5, 0, Math.PI * 2);
  c.fill();
  return tela;
}

function efeitoBolhas(w, h, foco) {
  const { cx, cy, R } = focoDoEfeito(w, h, foco);
  const bolha = spritePremium('bolha', spriteDeBolha);
  const bolhas = Array.from({ length: 26 }, (_, i) => {
    const lado = i % 2 ? 1 : -1;
    const longe = R * 1.25 + Math.random() * Math.max(10, (w / 2) - R * 1.25);
    return { x: cx + lado * longe, y: Math.min(h, cy + R * (2.2 + Math.random() * 3.4)), v: 70 + Math.random() * 60, r: 7 + Math.random() * 17, fase: Math.random() * 6.28, nasce: Math.random() * 1.2, estoura: 1.5 + Math.random() * 1.6 };
  });
  return (ctx, s) => {
    const base = ctx.globalAlpha;
    bolhas.forEach((b) => {
      const t = s - b.nasce;
      if (t <= 0) return;
      const x = b.x + Math.sin(t * 1.8 + b.fase) * 10;
      const y = b.y - b.v * t;
      if (t < b.estoura) {
        const pulsa = 1 + Math.sin(t * 5 + b.fase) * 0.04;
        ctx.globalAlpha = base * Math.min(1, t * 3);
        ctx.drawImage(bolha, x - b.r * pulsa, y - b.r / pulsa, b.r * 2 * pulsa, b.r * 2 / pulsa);
      } else {
        const q = (t - b.estoura) / 0.35;
        if (q > 1) return;
        ctx.globalAlpha = base * (1 - q);
        ctx.strokeStyle = 'rgba(224, 242, 254, 0.9)';
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.arc(x, y, b.r * (1 + q * 0.6), 0, Math.PI * 2);
        ctx.stroke();
        for (let k = 0; k < 6; k += 1) {
          const a = (k / 6) * Math.PI * 2 + b.fase;
          desenharFaisca(ctx, x + Math.cos(a) * b.r * (1 + q * 1.4), y + Math.sin(a) * b.r * (1 + q * 1.4), 2.2, '#e0f2fe', 1 - q);
        }
      }
    });
    ctx.globalAlpha = base;
  };
}
efeitoBolhas.usaMargem = true;

function efeitoAnjinhosVoando(w, h, foco) {
  const { cx, cy, R } = focoDoEfeito(w, h, foco);
  const corpo = spritePremium('querubim-corpo', () => bitmapDoSvg(PECAS_PREMIUM.querubimCorpo(), '-9 -14 18 28', 108, 168));
  const asa = spritePremium('querubim-asa', () => bitmapDoSvg(PECAS_PREMIUM.querubimAsa(), '-14 -10 16 14', 96, 84));
  const coracao = spritePremium('coracaozinho', () => bitmapDoSvg('<path d="M0 6C-7 1 -6 -5 -2.6 -5C-1.4 -5 -.4 -4.2 0 -3.2C.4 -4.2 1.4 -5 2.6 -5C6 -5 7 1 0 6Z" fill="#fb7185" stroke="#be123c" stroke-width=".5"/><circle cx="-2.6" cy="-2.6" r="1" fill="#fff" opacity=".8"/>', '-7 -6 14 13', 56, 52));
  const caminhos = [
    { de: [-R, cy + R * 3], meio: [cx - R * 2.4, cy - R * 0.2], ate: [cx + R * 0.6, -R * 1.5], atraso: 0 },
    { de: [w + R, cy + R * 2.6], meio: [cx + R * 2.5, cy + R * 0.2], ate: [cx - R * 0.8, -R * 1.5], atraso: 0.35 },
    { de: [cx - R * 0.3, h + R], meio: [cx + R * 1.8, cy + R * 1.6], ate: [w + R, cy - R * 1.4], atraso: 0.7 },
  ];
  const coracoes = Array.from({ length: 14 }, () => ({ quem: Math.floor(Math.random() * 3), nasce: 0.4 + Math.random() * 2.2, dx: (Math.random() - 0.5) * 30, r: 5 + Math.random() * 5 }));
  const ponto = (c, q) => {
    const u = 1 - q;
    return [u * u * c.de[0] + 2 * u * q * c.meio[0] + q * q * c.ate[0], u * u * c.de[1] + 2 * u * q * c.meio[1] + q * q * c.ate[1]];
  };
  const tam = R * 0.95;
  return (ctx, s) => {
    const base = ctx.globalAlpha;
    caminhos.forEach((c, i) => {
      const q = Math.min(1, Math.max(0, (s - c.atraso) / 2.9));
      if (q <= 0 || q >= 1) return;
      const [x, y] = ponto(c, suave(q));
      for (let k = 1; k <= 6; k += 1) {
        const [tx, ty] = ponto(c, suave(Math.max(0, q - k * 0.025)));
        desenharFaisca(ctx, tx, ty + tam * 0.2, 3.4 - k * 0.4, '#fde68a', (1 - k / 7) * 0.8);
      }
      const bate = Math.sin(s * 22 + i) * 0.45;
      if (!imagemPronta(corpo) || !imagemPronta(asa)) return;
      ctx.save();
      ctx.translate(x, y + Math.sin(s * 3 + i) * 4);
      [-1, 1].forEach((lado) => {
        ctx.save();
        ctx.translate(lado * tam * 0.2, tam * 0.1);
        ctx.scale(lado, 1);
        ctx.rotate(-0.15 - bate);
        ctx.drawImage(asa, -tam * 0.78, -tam * 0.56, tam * 0.89, tam * 0.78);
        ctx.restore();
      });
      ctx.drawImage(corpo, -tam * 0.5, -tam * 0.78, tam, tam * 1.56);
      ctx.restore();
    });
    coracoes.forEach((c) => {
      const t = s - c.nasce;
      const cam = caminhos[c.quem];
      const q = Math.min(1, Math.max(0, (c.nasce - cam.atraso) / 2.9));
      if (t <= 0 || t > 1.4 || q <= 0 || q >= 1 || !imagemPronta(coracao)) return;
      const [x, y] = ponto(cam, suave(q));
      ctx.globalAlpha = base * Math.max(0, 1 - t / 1.4);
      ctx.drawImage(coracao, x + c.dx * t - c.r, y - 30 * t - c.r, c.r * 2, c.r * 1.86);
    });
    ctx.globalAlpha = base;
  };
}
efeitoAnjinhosVoando.usaMargem = true;

function efeitoEstrelinhas(w, h, foco) {
  const { cx, cy, R } = focoDoEfeito(w, h, foco);
  const sprites = CORES_DE_ESTRELA.map((cor, i) => spritePremium(`estrela-doce-${i}`, () => bitmapDoSvg(PECAS_PREMIUM.estrelaDoce(cor)(), '-9 -9 18 19', 72, 76)));
  const estrelas = Array.from({ length: 40 }, (_, i) => {
    const a = (i / 40) * Math.PI * 2 + Math.random() * 0.3;
    return { a, v: R * (2.6 + Math.random() * 3.2), r: R * (0.14 + Math.random() * 0.16), giro: Math.random() * 6.28, vg: (Math.random() - 0.5) * 8, tipo: i % 6, atraso: Math.random() * 0.25 };
  });
  return (ctx, s) => {
    const base = ctx.globalAlpha;
    const anel = Math.min(1, s / 0.6);
    if (anel < 1) {
      ctx.save();
      ctx.globalCompositeOperation = 'lighter';
      ctx.strokeStyle = `rgba(253, 230, 138, ${0.7 * (1 - anel)})`;
      ctx.lineWidth = R * 0.18 * (1 - anel) + 1;
      ctx.beginPath();
      ctx.arc(cx, cy, R * (1.05 + anel * 1.8), 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
    }
    estrelas.forEach((e) => {
      const t = s - e.atraso;
      if (t <= 0) return;
      const corre = (1 - Math.exp(-t * 2.6)) / 2.6;
      const x = cx + Math.cos(e.a) * (R * 1.1 + e.v * corre);
      const y = cy + Math.sin(e.a) * (R * 1.1 + e.v * corre) + 26 * Math.max(0, t - 0.6) * Math.max(0, t - 0.6);
      const img = sprites[e.tipo];
      const alfa = Math.min(1, t * 6) * Math.max(0, 1 - Math.max(0, t - 2.2) / 1.2);
      if (alfa <= 0) return;
      desenharFaisca(ctx, x - Math.cos(e.a) * e.r * 1.6, y - Math.sin(e.a) * e.r * 1.6, e.r * 0.5, '#fffbeb', alfa * Math.max(0, 1 - t));
      if (!imagemPronta(img)) return;
      ctx.save();
      ctx.globalAlpha = base * alfa;
      ctx.translate(x, y);
      ctx.rotate(e.giro + e.vg * corre);
      ctx.drawImage(img, -e.r, -e.r, e.r * 2, e.r * 2.1);
      ctx.restore();
    });
    ctx.globalAlpha = base;
  };
}
efeitoEstrelinhas.usaMargem = true;

function spriteDeBalao(cor, escura) {
  const tela = document.createElement('canvas');
  tela.width = 96;
  tela.height = 128;
  const c = tela.getContext('2d');
  if (!c) return tela;
  const g = c.createRadialGradient(36, 36, 4, 48, 52, 56);
  g.addColorStop(0, '#ffffff');
  g.addColorStop(0.18, cor);
  g.addColorStop(0.85, cor);
  g.addColorStop(1, escura);
  c.fillStyle = g;
  c.beginPath();
  c.moveTo(48, 112);
  c.bezierCurveTo(14, 96, 6, 60, 10, 40);
  c.bezierCurveTo(14, 14, 34, 4, 48, 4);
  c.bezierCurveTo(62, 4, 82, 14, 86, 40);
  c.bezierCurveTo(90, 60, 82, 96, 48, 112);
  c.fill();
  c.fillStyle = escura;
  c.beginPath();
  c.moveTo(42, 120);
  c.lineTo(48, 110);
  c.lineTo(54, 120);
  c.closePath();
  c.fill();
  c.fillStyle = 'rgba(255, 255, 255, 0.75)';
  c.beginPath();
  c.ellipse(32, 30, 7, 13, 0.5, 0, Math.PI * 2);
  c.fill();
  return tela;
}

function efeitoBaloes(w, h, foco) {
  const { cx, cy, R } = focoDoEfeito(w, h, foco);
  const cores = [['#ef4444', '#7f1d1d'], ['#f59e0b', '#92400e'], ['#facc15', '#a16207'], ['#22c55e', '#14532d'], ['#3b82f6', '#1e3a8a'], ['#a855f7', '#581c87'], ['#ec4899', '#831843']];
  const sprites = cores.map(([c1, c2], i) => spritePremium(`balao-${i}`, () => spriteDeBalao(c1, c2)));
  const baloes = Array.from({ length: 14 }, (_, i) => {
    const lado = i % 2 ? 1 : -1;
    const longe = R * 1.3 + Math.random() * Math.max(10, w / 2 - R * 1.3);
    return { x: cx + lado * longe, y: Math.min(h + R, cy + R * (3.2 + Math.random() * 3.4)), v: 110 + Math.random() * 70, r: R * (0.38 + Math.random() * 0.22), fase: Math.random() * 6.28, cor: i % sprites.length, atraso: Math.random() * 0.9 };
  });
  return (ctx, s) => {
    const base = ctx.globalAlpha;
    baloes.forEach((b) => {
      const t = s - b.atraso;
      if (t <= 0) return;
      const balanca = Math.sin(t * 1.6 + b.fase);
      const x = b.x + balanca * 12;
      const y = b.y - b.v * t;
      if (y < -b.r * 4) return;
      const largura = b.r * 1.5;
      const altura = largura * (128 / 96);
      ctx.globalAlpha = base;
      ctx.strokeStyle = 'rgba(226, 232, 240, 0.75)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(x, y + altura * 0.44);
      ctx.bezierCurveTo(x - balanca * 10, y + altura * 0.8, x + balanca * 8, y + altura * 1.1, x - balanca * 4, y + altura * 1.45);
      ctx.stroke();
      const img = sprites[b.cor];
      if (!imagemPronta(img)) return;
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(balanca * 0.08);
      ctx.drawImage(img, -largura / 2, -altura / 2, largura, altura);
      ctx.restore();
    });
    ctx.globalAlpha = base;
  };
}
efeitoBaloes.usaMargem = true;

function efeitoRaiosDaMisericordia(w, h, foco) {
  const { cx, cy, R } = focoDoEfeito(w, h, foco);
  const motas = Array.from({ length: 30 }, () => ({ lado: Math.random() < 0.5 ? -1 : 1, d: Math.random(), q: 0.15 + Math.random() * 0.85, fase: Math.random() * 6.28, nasce: 0.6 + Math.random() * 1.6 }));
  const origem = [cx, cy + R * 0.35];
  const luz = spritePremium('luz-misericordia', () => spriteDeBrasa('255, 251, 235'));
  return (ctx, s) => {
    const base = ctx.globalAlpha;
    const abre = suave(s / 1.1);
    const pulsa = 0.85 + 0.15 * Math.sin(s * 3.2);
    const alcance = (h - origem[1]) * 1.05 * abre;
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    [[-1, [226, 240, 255]], [1, [239, 68, 68]]].forEach(([lado, [r, g, b]]) => {
      for (let i = 0; i < 4; i += 1) {
        const meio = Math.PI / 2 + lado * (0.17 + i * 0.08);
        const largura = 0.07 + i * 0.012;
        const gr = ctx.createLinearGradient(origem[0], origem[1], origem[0] + Math.cos(meio) * alcance, origem[1] + Math.sin(meio) * alcance);
        gr.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0)`);
        gr.addColorStop(0.12, `rgba(${r}, ${g}, ${b}, ${0.5 * pulsa * (1 - i * 0.15)})`);
        gr.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
        ctx.fillStyle = gr;
        ctx.beginPath();
        ctx.moveTo(origem[0] + lado * R * 0.05, origem[1]);
        ctx.lineTo(origem[0] + Math.cos(meio - largura) * alcance, origem[1] + Math.sin(meio - largura) * alcance);
        ctx.lineTo(origem[0] + Math.cos(meio + largura) * alcance, origem[1] + Math.sin(meio + largura) * alcance);
        ctx.closePath();
        ctx.fill();
      }
    });
    ctx.globalAlpha = base * 0.55 * abre * pulsa;
    ctx.drawImage(luz, origem[0] - R * 0.9, origem[1] - R * 0.5, R * 1.8, R * 1.2);
    ctx.restore();
    motas.forEach((m) => {
      const t = s - m.nasce;
      if (t <= 0) return;
      const a = Math.PI / 2 + m.lado * (0.17 + m.d * 0.3);
      const dist = alcance * m.q;
      const x = origem[0] + Math.cos(a) * dist + Math.sin(t * 2 + m.fase) * 6;
      const y = origem[1] + Math.sin(a) * dist - t * 12;
      desenharFaisca(ctx, x, y, 2.6, m.lado < 0 ? '#f0f9ff' : '#fecaca', Math.max(0, Math.sin(t * 3 + m.fase)) * Math.max(0, 1 - t / 2.4));
    });
    ctx.globalAlpha = base;
  };
}
efeitoRaiosDaMisericordia.usaMargem = true;

function efeitoCometa(w, h, foco) {
  const { cx, cy, R } = focoDoEfeito(w, h, foco);
  const luz = spritePremium('luz-cometa', () => spriteDeBrasa('224, 242, 254'));
  const ouro = spritePremium('luz-dourada', () => spriteDeBrasa('253, 230, 138'));
  const de = [w + R, cy - R * 2.4];
  const meio = [cx, cy - R * 2.2];
  const ate = [-R * 1.5, cy + R * 0.4];
  const ponto = (q) => {
    const u = 1 - q;
    return [u * u * de[0] + 2 * u * q * meio[0] + q * q * ate[0], u * u * de[1] + 2 * u * q * meio[1] + q * q * ate[1]];
  };
  const poeira = Array.from({ length: 70 }, () => ({ q: Math.random(), dx: (Math.random() - 0.5) * 18, dy: (Math.random() - 0.5) * 18, vy: 10 + Math.random() * 30, r: 1 + Math.random() * 2.4, ouro: Math.random() < 0.4 }));
  return (ctx, s) => {
    const base = ctx.globalAlpha;
    const q = Math.min(1.05, suave(s / 2.4));
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    const passos = 40;
    for (let k = passos; k >= 1; k -= 1) {
      const qa = q - (k / passos) * 0.32;
      const qb = q - ((k - 1) / passos) * 0.32;
      if (qb <= 0) continue;
      const [x0, y0] = ponto(Math.max(0, qa));
      const [x1, y1] = ponto(Math.min(1, Math.max(0, qb)));
      const f = 1 - k / passos;
      ctx.strokeStyle = `rgba(186, 230, 253, ${0.55 * f})`;
      ctx.lineWidth = R * 0.32 * f + 0.5;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(x0, y0);
      ctx.lineTo(x1, y1);
      ctx.stroke();
      ctx.strokeStyle = `rgba(255, 255, 255, ${0.8 * f})`;
      ctx.lineWidth = R * 0.08 * f + 0.4;
      ctx.beginPath();
      ctx.moveTo(x0, y0);
      ctx.lineTo(x1, y1);
      ctx.stroke();
    }
    if (q < 1) {
      const [x, y] = ponto(q);
      ctx.globalAlpha = base;
      ctx.drawImage(luz, x - R * 0.9, y - R * 0.9, R * 1.8, R * 1.8);
      ctx.drawImage(ouro, x - R * 0.4, y - R * 0.4, R * 0.8, R * 0.8);
      desenharFaisca(ctx, x, y, R * 0.35, '#ffffff', 1);
    }
    poeira.forEach((p) => {
      if (p.q > q) return;
      const desde = (q - p.q) * 2.4;
      const [x, y] = ponto(p.q);
      const alfa = Math.max(0, 1 - desde / 1.6);
      if (alfa <= 0) return;
      ctx.globalAlpha = base * alfa;
      ctx.drawImage(p.ouro ? ouro : luz, x + p.dx - p.r * 2, y + p.dy + p.vy * desde - p.r * 2, p.r * 4, p.r * 4);
    });
    ctx.restore();
    ctx.globalAlpha = base;
  };
}
efeitoCometa.usaMargem = true;

const NOTAS_DE_OURO = {
  colcheia: '<path d="M2.6 -12V2.4" stroke="url(#no)" stroke-width="1.3"/><path d="M2.6 -12C5 -10 7.4 -8.6 6.4 -5" fill="none" stroke="url(#no)" stroke-width="1.3" stroke-linecap="round"/><ellipse cx="0" cy="2.6" rx="3" ry="2.2" transform="rotate(-22)" fill="url(#no)"/>',
  dupla: '<path d="M-1.4 -10V2.4M8.6 -12V.4" stroke="url(#no)" stroke-width="1.3"/><path d="M-1.4 -10L8.6 -12V-9L-1.4 -7Z" fill="url(#no)"/><ellipse cx="-4" cy="2.6" rx="3" ry="2.2" transform="rotate(-22 -4 2.6)" fill="url(#no)"/><ellipse cx="6" cy=".6" rx="3" ry="2.2" transform="rotate(-22 6 .6)" fill="url(#no)"/>',
  seminima: '<path d="M2.6 -12V2.4" stroke="url(#no)" stroke-width="1.3"/><ellipse cx="0" cy="2.6" rx="3" ry="2.2" transform="rotate(-22)" fill="url(#no)"/>',
};

function efeitoAleluia(w, h, foco) {
  const { cx, cy, R } = focoDoEfeito(w, h, foco);
  const defs = '<defs><linearGradient id="no" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fffbe6"/><stop offset=".45" stop-color="#facc15"/><stop offset="1" stop-color="#a16207"/></linearGradient></defs>';
  const sprites = Object.keys(NOTAS_DE_OURO).map((k) => spritePremium(`nota-${k}`, () => bitmapDoSvg(defs + NOTAS_DE_OURO[k], '-8 -14 18 20', 72, 80)));
  const ouro = spritePremium('luz-dourada', () => spriteDeBrasa('253, 230, 138'));
  const notas = Array.from({ length: 22 }, (_, i) => {
    const lado = i % 2 ? 1 : -1;
    const longe = R * 1.2 + Math.random() * Math.max(10, w / 2 - R * 1.2);
    return { x: cx + lado * longe, y: cy + R * (1.4 + Math.random() * 3), v: 50 + Math.random() * 40, t: R * (0.36 + Math.random() * 0.2), fase: Math.random() * 6.28, tipo: i % sprites.length, nasce: Math.random() * 1.6 };
  });
  return (ctx, s) => {
    const base = ctx.globalAlpha;
    const onda = suave(s / 0.8) * (1 - suave((s - 2.6) / 1));
    if (onda > 0) {
      ctx.save();
      ctx.globalCompositeOperation = 'lighter';
      for (let linha = 0; linha < 5; linha += 1) {
        ctx.strokeStyle = `rgba(253, 230, 138, ${0.22 * onda})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        for (let x = 0; x <= w; x += 8) {
          const y = cy + R * 1.9 + linha * 5 + Math.sin(x * 0.02 + s * 2.4) * R * 0.25;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
      ctx.restore();
    }
    notas.forEach((n) => {
      const t = s - n.nasce;
      if (t <= 0) return;
      const x = n.x + Math.sin(t * 2 + n.fase) * 12;
      const y = n.y - n.v * t;
      const alfa = Math.min(1, t * 3) * Math.max(0, 1 - t / 2.6);
      if (alfa <= 0) return;
      ctx.save();
      ctx.globalCompositeOperation = 'lighter';
      ctx.globalAlpha = base * alfa * 0.6;
      ctx.drawImage(ouro, x - n.t * 1.1, y - n.t * 1.1, n.t * 2.2, n.t * 2.2);
      ctx.restore();
      const img = sprites[n.tipo];
      if (!imagemPronta(img)) return;
      ctx.save();
      ctx.globalAlpha = base * alfa;
      ctx.translate(x, y);
      ctx.rotate(Math.sin(t * 2.4 + n.fase) * 0.25);
      ctx.drawImage(img, -n.t * 0.8, -n.t * 1.4, n.t * 1.8, n.t * 2);
      ctx.restore();
    });
    ctx.globalAlpha = base;
  };
}
efeitoAleluia.usaMargem = true;

Object.assign(EFEITOS_DO_PERFIL, {
  bolhas: efeitoBolhas,
  'anjinhos-voando': efeitoAnjinhosVoando,
  estrelinhas: efeitoEstrelinhas,
  baloes: efeitoBaloes,
  'raios-da-misericordia': efeitoRaiosDaMisericordia,
  cometa: efeitoCometa,
  aleluia: efeitoAleluia,
});

Object.assign(MINIS_DE_EFEITO, {
  bolhas(g) {
    const bolha = (x, y, r) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#e0f2fe" fill-opacity=".12" stroke="url(#${g}i)" stroke-width="${n1(r * 0.16)}"/><ellipse cx="${n1(x - r * 0.35)}" cy="${n1(y - r * 0.4)}" rx="${n1(r * 0.28)}" ry="${n1(r * 0.16)}" transform="rotate(-35 ${n1(x - r * 0.35)} ${n1(y - r * 0.4)})" fill="#fff" opacity=".9"/>`;
    return `${fundoDoMini(g, '#0c4a6e', '#38bdf8')}<defs><linearGradient id="${g}i" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f9a8d4"/><stop offset=".35" stop-color="#fde047"/><stop offset=".65" stop-color="#86efac"/><stop offset="1" stop-color="#93c5fd"/></linearGradient></defs>
      ${bolha(16, 26, 8)}${bolha(36, 14, 10)}${bolha(52, 29, 6)}${bolha(26, 8, 4)}`;
  },
  'anjinhos-voando'(g) {
    const corpo = pecaPremium('querubim-corpo', [-9, -14, 18, 28], PECAS_PREMIUM.querubimCorpo);
    const asa = pecaPremium('querubim-asa', [-14, -10, 16, 14], PECAS_PREMIUM.querubimAsa);
    const anjo = (x, y, e) => `<g transform="translate(${x} ${y}) scale(${e})"><g transform="translate(-4 3)">${asa}</g><g transform="translate(4 3) scale(-1 1)">${asa}</g>${corpo}</g>`;
    return `${fundoDoMini(g, '#7dd3fc', '#e0f2fe')}${anjo(20, 22, 0.95)}${anjo(46, 20, 0.8)}${faisca(33, 32, 2, '#fde68a', 0)}${faisca(58, 8, 1.6, '#fde68a', 0)}`;
  },
  estrelinhas(g) {
    const estrela = (x, y, e, i) => `<g transform="translate(${x} ${y}) scale(${e})">${pecaPremium(`estrela-doce-${i}`, [-9, -9, 18, 19], PECAS_PREMIUM.estrelaDoce(CORES_DE_ESTRELA[i]))}</g>`;
    return `${fundoDoMini(g, '#1e1b4b', '#4c1d95')}<circle cx="32" cy="22" r="9" fill="none" stroke="#fde68a" stroke-width="1" opacity=".6"/>${estrela(12, 12, 0.6, 0)}${estrela(52, 10, 0.55, 1)}${estrela(14, 32, 0.5, 2)}${estrela(50, 32, 0.6, 3)}${estrela(32, 6, 0.45, 4)}`;
  },
  baloes(g) {
    const cores = [['#ef4444', '#7f1d1d'], ['#facc15', '#a16207'], ['#3b82f6', '#1e3a8a'], ['#22c55e', '#14532d']];
    const defs = cores.map(([c, e], i) => `<radialGradient id="${g}b${i}" cx="35%" cy="30%" r="75%"><stop offset="0" stop-color="#fff"/><stop offset=".25" stop-color="${c}"/><stop offset="1" stop-color="${e}"/></radialGradient>`).join('');
    const balao = (x, y, i) => `<path d="M${x} ${y + 7}Q${x + 2} ${y + 12} ${x - 1} ${y + 18}" stroke="#f1f5f9" stroke-width=".5" fill="none"/><ellipse cx="${x}" cy="${y}" rx="5" ry="6.4" fill="url(#${g}b${i})"/><path d="M${x - 1} ${y + 7.2}L${x} ${y + 6}L${x + 1} ${y + 7.2}Z" fill="${cores[i][1]}"/>`;
    return `${fundoDoMini(g, '#0ea5e9', '#e0f2fe')}<defs>${defs}</defs>${balao(15, 15, 0)}${balao(29, 11, 1)}${balao(43, 17, 2)}${balao(54, 10, 3)}`;
  },
  'raios-da-misericordia'(g) {
    return `${fundoDoMini(g, '#111827', '#1e293b')}<defs><linearGradient id="${g}p" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e0f2fe" stop-opacity=".95"/><stop offset="1" stop-color="#e0f2fe" stop-opacity="0"/></linearGradient>
      <linearGradient id="${g}v" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ef4444" stop-opacity=".95"/><stop offset="1" stop-color="#ef4444" stop-opacity="0"/></linearGradient></defs>
      <path d="M31 12L10 40H24Z" fill="url(#${g}v)"/><path d="M33 12L54 40H40Z" fill="url(#${g}p)"/><circle cx="32" cy="11" r="5" fill="#64748b" stroke="#fde68a" stroke-width="1"/>`;
  },
  cometa(g) {
    return `${fundoDoMini(g, '#020617', '#1e1b4b')}<defs><linearGradient id="${g}c" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#bae6fd" stop-opacity="0"/><stop offset="1" stop-color="#ffffff"/></linearGradient><radialGradient id="${g}l"><stop offset="0" stop-color="#fff"/><stop offset=".4" stop-color="#e0f2fe" stop-opacity=".8"/><stop offset="1" stop-color="#e0f2fe" stop-opacity="0"/></radialGradient></defs>
      <path d="M4 5Q24 7 46 22" fill="none" stroke="#93c5fd" stroke-width="6" stroke-linecap="round" opacity=".25"/><path d="M14 8Q30 10 46 22" fill="none" stroke="#e0f2fe" stroke-width="3" stroke-linecap="round" opacity=".7"/><circle cx="47" cy="23" r="8" fill="url(#${g}l)"/><circle cx="47" cy="23" r="2.4" fill="#fff"/>${faisca(20, 30, 1.6, '#fde68a', 0)}${faisca(56, 8, 1.4, '#e0f2fe', 0)}`;
  },
  aleluia(g) {
    const defs = `<linearGradient id="no" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fffbe6"/><stop offset=".45" stop-color="#facc15"/><stop offset="1" stop-color="#a16207"/></linearGradient>`;
    const nota = (x, y, tipo, e) => `<g transform="translate(${x} ${y}) scale(${e})">${pecaPremium(`nota-mini-${tipo}`, [-8, -14, 18, 20], () => `<defs>${defs}</defs>${NOTAS_DE_OURO[tipo]}`)}</g>`;
    return `${fundoDoMini(g, '#422006', '#92400e')}${[0, 1, 2, 3, 4].map((i) => `<path d="M0 ${26 + i * 2.4}Q16 ${22 + i * 2.4} 32 ${26 + i * 2.4}T64 ${26 + i * 2.4}" fill="none" stroke="#fde68a" stroke-width=".35" opacity=".5"/>`).join('')}
      ${nota(16, 24, 'colcheia', 0.95)}${nota(34, 18, 'dupla', 0.9)}${nota(52, 26, 'seminima', 0.95)}`;
  },
});
