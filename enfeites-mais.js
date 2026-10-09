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

Object.assign(PECAS_PREMIUM, {
  espigaPremium: () => {
    let graos = '';
    for (let i = 0; i < 6; i += 1) {
      const y = -3 - i * 3;
      graos += `<ellipse cx="-1.6" cy="${n1(y)}" rx="1.4" ry="2.4" transform="rotate(-26 -1.6 ${n1(y)})" fill="url(#eg)" stroke="#8a5a0a" stroke-width=".25"/><ellipse cx="1.6" cy="${n1(y)}" rx="1.4" ry="2.4" transform="rotate(26 1.6 ${n1(y)})" fill="url(#eg)" stroke="#8a5a0a" stroke-width=".25"/>`;
      graos += `<path d="M-2.4 ${n1(y - 1.6)}L-4.6 ${n1(y - 6)}M2.4 ${n1(y - 1.6)}L4.6 ${n1(y - 6)}" stroke="#f5d78a" stroke-width=".25"/>`;
    }
    return `<defs><radialGradient id="eg" cx="35%" cy="30%" r="80%"><stop offset="0" stop-color="#fff3c4"/><stop offset=".55" stop-color="#e8b84a"/><stop offset="1" stop-color="#9a6a12"/></radialGradient></defs>
      <path d="M0 6V-19" stroke="#b07a12" stroke-width=".8"/>${graos}<ellipse cx="0" cy="-21" rx="1.3" ry="2.4" fill="url(#eg)"/><path d="M0 -23L0 -28" stroke="#f5d78a" stroke-width=".3"/>`;
  },
  cachoPremium: () => {
    const bagos = [[0, 9], [-2.8, 6.6], [2.8, 6.6], [-4.4, 3.6], [0, 4], [4.4, 3.6], [-2.6, 1], [2.6, 1], [-5, -1.4], [0, -1], [5, -1.4], [-2.4, -3.6], [2.4, -3.6]];
    return `<defs><radialGradient id="ug" cx="35%" cy="30%" r="75%"><stop offset="0" stop-color="#d8b4fe"/><stop offset=".45" stop-color="#7e22ce"/><stop offset="1" stop-color="#3b0764"/></radialGradient>
        <linearGradient id="uf" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#86efac"/><stop offset="1" stop-color="#166534"/></linearGradient></defs>
      <path d="M0 -6C2 -9 6 -10 8 -12" stroke="#6b4423" stroke-width=".8" fill="none"/>
      <path d="M2 -8C4 -14 12 -14 13 -9C10 -6 6 -6 2 -8Z" fill="url(#uf)" stroke="#14532d" stroke-width=".3"/><path d="M3 -8.4C6 -10 9 -10.6 12 -9.6" stroke="#14532d" stroke-width=".25" fill="none"/>
      ${bagos.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="2.5" fill="url(#ug)"/><circle cx="${n1(x - 0.8)}" cy="${n1(y - 0.8)}" r=".6" fill="#f5e8ff" opacity=".8"/>`).join('')}`;
  },
  hostiaEClice: () => `<defs><linearGradient id="cal" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#8a5a0a"/><stop offset=".3" stop-color="#fff3c4"/><stop offset=".55" stop-color="#e8b84a"/><stop offset="1" stop-color="#6b4304"/></linearGradient>
      <radialGradient id="hos" cx="40%" cy="35%" r="70%"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#f3e7c9"/></radialGradient></defs>
    <path d="M-7 2C-7 8 -3 10 0 10C3 10 7 8 7 2Z" fill="url(#cal)" stroke="#5c3a04" stroke-width=".4"/>
    <path d="M-1 10V15M-4.6 16.4C-3 15 3 15 4.6 16.4Z" stroke="#5c3a04" stroke-width=".4" fill="url(#cal)"/><rect x="-1" y="10" width="2" height="5" fill="url(#cal)"/>
    <circle cx="0" cy="-4" r="6" fill="url(#hos)" stroke="#d6c08e" stroke-width=".5"/><path d="M0 -8V0M-3 -4.6H3" stroke="#c9a24a" stroke-width=".8"/>`,
  conchaBatismo: () => `<defs><linearGradient id="cb2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff7ed"/><stop offset="1" stop-color="#fdba74"/></linearGradient></defs>
    <path d="M0 6C-8 6 -11 0 -10 -4C-9 -8 -4 -10 0 -10C4 -10 9 -8 10 -4C11 0 8 6 0 6Z" fill="url(#cb2)" stroke="#c2410c" stroke-width=".45"/>
    ${[-7, -4.6, -2.2, 0, 2.2, 4.6, 7].map((x) => `<path d="M0 5L${x} -9" stroke="#ea8a4a" stroke-width=".4"/>`).join('')}<path d="M-3 6H3L1.6 8.4H-1.6Z" fill="url(#cb2)" stroke="#c2410c" stroke-width=".4"/>`,
  anelDeAgua: () => `<defs><linearGradient id="ag2" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#e0f2fe"/><stop offset=".4" stop-color="#38bdf8"/><stop offset=".7" stop-color="#0284c7"/><stop offset="1" stop-color="#075985"/></linearGradient></defs>
    <circle cx="68" cy="69.2" r="53.4" fill="none" stroke="#060a1e" stroke-width="6" opacity=".35"/>
    <circle cx="68" cy="68" r="53.4" fill="none" stroke="url(#ag2)" stroke-width="5.6"/>
    <circle cx="68" cy="68" r="55.9" fill="none" stroke="#f0f9ff" stroke-width=".7" opacity=".9"/><circle cx="68" cy="68" r="50.7" fill="none" stroke="#0c4a6e" stroke-width=".6"/>`,
  estrelaGuiaBrilho: () => `<defs><radialGradient id="sg" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#ffffff"/><stop offset=".35" stop-color="#fef9c3" stop-opacity=".9"/><stop offset="1" stop-color="#fde68a" stop-opacity="0"/></radialGradient>
      <linearGradient id="sg2" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset=".5" stop-color="#fde68a"/><stop offset="1" stop-color="#f59e0b"/></linearGradient></defs>
    <circle r="9" fill="url(#sg)"/>
    <path d="M0 -12L1.6 -1.6L12 0L1.6 1.6L0 12L-1.6 1.6L-12 0L-1.6 -1.6Z" fill="url(#sg2)"/>
    <path d="M0 -6L.9 -.9L6 0L.9 .9L0 6L-.9 .9L-6 0L-.9 -.9Z" transform="rotate(45)" fill="#fffbeb"/>`,
  florMargarida: () => `<defs><radialGradient id="fm" cx="50%" cy="50%" r="60%"><stop offset="0" stop-color="#fde68a"/><stop offset="1" stop-color="#d97706"/></radialGradient></defs>
    ${Array.from({ length: 12 }, (_, i) => `<ellipse cx="0" cy="-3.6" rx="1.1" ry="3" transform="rotate(${i * 30})" fill="#ffffff" stroke="#e2e8f0" stroke-width=".25"/>`).join('')}<circle r="1.9" fill="url(#fm)"/>`,
  florMiosotis: () => `${Array.from({ length: 5 }, (_, i) => `<circle cx="0" cy="-1.9" r="1.6" transform="rotate(${i * 72})" fill="#93c5fd" stroke="#3b82f6" stroke-width=".25"/>`).join('')}<circle r=".9" fill="#fde047"/>`,
  borboletaAzul: () => `<defs><linearGradient id="ba" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#e0f2fe"/><stop offset=".5" stop-color="#38bdf8"/><stop offset="1" stop-color="#1e40af"/></linearGradient></defs>
    <path d="M0 0C-3 -7 -10 -7 -9 -1C-8.4 1.6 -3 1.2 0 0Z" fill="url(#ba)" stroke="#0f172a" stroke-width=".35"/><path d="M0 0C-2 2 -6.4 5.4 -5.4 7C-3.8 7.6 -1 3.4 0 0Z" fill="url(#ba)" stroke="#0f172a" stroke-width=".35"/><circle cx="-5.6" cy="-3" r="1" fill="#fff" opacity=".8"/>`,
  joia: (c1, c2, c3) => () => `<defs><linearGradient id="jo" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${c1}"/><stop offset=".5" stop-color="${c2}"/><stop offset="1" stop-color="${c3}"/></linearGradient></defs>
    <path d="M0 -4L3.4 -1.6L3.4 1.6L0 4L-3.4 1.6L-3.4 -1.6Z" fill="url(#jo)" stroke="#5c3a04" stroke-width=".5"/><path d="M0 -4L0 4M-3.4 -1.6L3.4 1.6M3.4 -1.6L-3.4 1.6" stroke="#ffffff" stroke-width=".25" opacity=".45"/><path d="M-1.6 -2.6L-.4 -3.2L-1 -1.6Z" fill="#fff" opacity=".9"/>`,
  coroaReal: () => `<defs><linearGradient id="cr2" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff6cf"/><stop offset=".25" stop-color="#eebf4a"/><stop offset=".45" stop-color="#8a5a0a"/><stop offset=".65" stop-color="#f7d774"/><stop offset="1" stop-color="#6b4304"/></linearGradient>
      <linearGradient id="cv" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#b91c1c"/><stop offset="1" stop-color="#450a0a"/></linearGradient>
      <radialGradient id="rb" cx="35%" cy="30%" r="70%"><stop offset="0" stop-color="#fecaca"/><stop offset=".5" stop-color="#dc2626"/><stop offset="1" stop-color="#7f1d1d"/></radialGradient>
      <radialGradient id="sf" cx="35%" cy="30%" r="70%"><stop offset="0" stop-color="#bfdbfe"/><stop offset=".5" stop-color="#2563eb"/><stop offset="1" stop-color="#1e3a8a"/></radialGradient>
      <radialGradient id="pl" cx="35%" cy="30%" r="75%"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#cbd5e1"/></radialGradient></defs>
    <path d="M-15 2C-15 -4 -9 -7 0 -7C9 -7 15 -4 15 2Z" fill="url(#cv)"/>
    <path d="M-16 4L-18 -12L-9 -4L-4.6 -16L0 -6L4.6 -16L9 -4L18 -12L16 4Z" fill="url(#cr2)" stroke="#5c3a04" stroke-width=".6" stroke-linejoin="round"/>
    <path d="M-16.6 1H16.6V6H-16.6Z" fill="url(#cr2)" stroke="#5c3a04" stroke-width=".55"/>
    ${[-18, -4.6, 4.6, 18].map((x, i) => `<circle cx="${x}" cy="${i === 1 || i === 2 ? -16 : -12}" r="1.7" fill="url(#pl)" stroke="#94a3b8" stroke-width=".3"/>`).join('')}
    <circle cx="0" cy="3.5" r="2.1" fill="url(#rb)"/><circle cx="-9" cy="3.5" r="1.6" fill="url(#sf)"/><circle cx="9" cy="3.5" r="1.6" fill="url(#sf)"/>
    <path d="M0 -6V-12M-2.4 -9.6H2.4" stroke="url(#cr2)" stroke-width="1.6"/><circle cx="0" cy="-12.6" r="1.2" fill="url(#pl)"/>
    <path d="M-12 -2L-8 -6M8 -6L12 -2" stroke="#fff6cf" stroke-width=".5" opacity=".7"/>`,
  raiosResplendor: (n, raio, ponta) => () => {
    let r = '';
    for (let i = 0; i < n; i += 1) {
      const a = (i * 360) / n;
      if (i % 2) r += `<path d="M67.2 ${68 - raio}L68 ${ponta}L68.8 ${68 - raio}Z" transform="rotate(${a} 68 68)"/>`;
      else r += `<path d="M66.7 ${68 - raio}C67.6 ${n1((68 - raio + ponta) / 2 + 4)} 66.4 ${n1((68 - raio + ponta) / 2 - 4)} 67.6 ${ponta + 2}C68.4 ${n1((68 - raio + ponta) / 2 - 2)} 69.6 ${n1((68 - raio + ponta) / 2 + 3)} 69.3 ${68 - raio}Z" transform="rotate(${a} 68 68)"/>`;
    }
    return `<defs><radialGradient id="rr" gradientUnits="userSpaceOnUse" cx="68" cy="68" r="${68 - ponta + 2}"><stop offset="${n1(raio / (68 - ponta + 2))}" stop-color="#ffffff"/><stop offset=".86" stop-color="#facc15"/><stop offset="1" stop-color="#f59e0b" stop-opacity="0"/></radialGradient></defs><g fill="url(#rr)">${r}</g>`;
  },
  anelNoturno: () => `<defs><linearGradient id="an2" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#312e81"/><stop offset=".5" stop-color="#1e1b4b"/><stop offset="1" stop-color="#0b0a24"/></linearGradient></defs>
    <circle cx="68" cy="69.2" r="53.4" fill="none" stroke="#000" stroke-width="7" opacity=".3"/>
    <circle cx="68" cy="68" r="53.4" fill="none" stroke="url(#an2)" stroke-width="6.4"/>
    <circle cx="68" cy="68" r="56.6" fill="none" stroke="#c7d2fe" stroke-width=".6" opacity=".8"/><circle cx="68" cy="68" r="50.3" fill="none" stroke="#a5b4fc" stroke-width=".5" opacity=".7"/>
    ${Array.from({ length: 40 }, (_, i) => { const [x, y] = pontoNoCirculo(53.4 + ((i * 7) % 5) - 2, i * 9 + 3); return `<circle cx="${n1(x)}" cy="${n1(y)}" r="${n1(0.25 + ((i * 3) % 4) * 0.12)}" fill="#fff" opacity=".85"/>`; }).join('')}`,
});

Object.assign(MOLDURAS, {
  'trigo-e-uvas'() {
    const espiga = pecaPremium('espiga-premium', [-6, -29, 12, 36], PECAS_PREMIUM.espigaPremium);
    const cacho = pecaPremium('cacho-premium', [-8, -15, 22, 27], PECAS_PREMIUM.cachoPremium);
    const brilho = idDoEnfeite('tu-luz');
    let espigas = '';
    [148, 168, 188, 208, 228].forEach((a, i) => { const [x, y] = pontoNoCirculo(57, a); espigas += `<g transform="translate(${n1(x)} ${n1(y)}) rotate(${a - 205})"><g class="enf-balanca-local" style="--a:-${n1(i * 0.4)}s">${espiga}</g></g>`; });
    let cachos = '';
    [312, 338, 4, 30].forEach((a) => { const [x, y] = pontoNoCirculo(58, a); cachos += `<g transform="translate(${n1(x)} ${n1(y)}) rotate(${a - 70}) scale(.9)">${cacho}</g>`; });
    return `<defs><radialGradient id="${brilho}"><stop offset="0" stop-color="#fffbeb" stop-opacity=".9"/><stop offset="1" stop-color="#fde68a" stop-opacity="0"/></radialGradient></defs>
      ${pecaPremium('anel-ouro-tu', [0, 0, 136, 136], () => anelDeMetal('ouro', { largura: 4.6, rebites: [45, 315] }))}
      ${reflexoNoAnel(idDoEnfeite('tu'), 53, 4.6)}
      ${espigas}${cachos}
      <g transform="translate(68 4)"><circle r="16" fill="url(#${brilho})" class="enf-respira" style="--d:2.4s"/>${pecaPremium('hostia-calice', [-9, -11, 18, 29], PECAS_PREMIUM.hostiaEClice)}</g>
      ${faisca(68, -14, 3, '#fffbeb', 0.3)}${faisca(18, 60, 2.2, '#fde68a', 1.2)}${faisca(120, 60, 2.2, '#e9d5ff', 2)}`;
  },

  'aguas-do-batismo'() {
    const brilho = idDoEnfeite('ab-onda');
    let gotas = '';
    [[60, 18, 0], [68, 16, 0.6], [76, 18, 1.2]].forEach(([x, y, a]) => { gotas += `<g transform="translate(${x} ${y})"><path class="enf-gota" style="--a:${a}s" d="M0 -2.4C1.6 0 2 1.4 0 2.6C-2 1.4 -1.6 0 0 -2.4Z" fill="#7dd3fc" stroke="#e0f2fe" stroke-width=".3"/></g>`; });
    return `<defs><linearGradient id="${brilho}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".5" stop-color="#fff" stop-opacity=".95"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient></defs>
      ${pecaPremium('anel-agua', [0, 0, 136, 136], PECAS_PREMIUM.anelDeAgua)}
      <g class="enf-gira" style="--d:7s"><circle cx="68" cy="68" r="53.4" fill="none" stroke="#f0f9ff" stroke-width="1.2" stroke-dasharray="10 22" stroke-linecap="round" opacity=".75"/></g>
      <g class="enf-gira" style="--d:11s;animation-direction:reverse"><circle cx="68" cy="68" r="52.2" fill="none" stroke="#bae6fd" stroke-width=".7" stroke-dasharray="4 18" stroke-linecap="round" opacity=".7"/></g>
      <g transform="translate(68 8)">${pecaPremium('concha', [-11, -11, 22, 20], PECAS_PREMIUM.conchaBatismo)}</g>${gotas}
      ${[[20, 108, 0], [116, 104, 1.6], [40, 124, 3]].map(([x, y, a]) => `<circle cx="${x}" cy="${y}" r="1.6" fill="#e0f2fe" fill-opacity=".2" stroke="#e0f2fe" stroke-width=".4" class="enf-sobe-lento" style="--d:5s;--a:-${a}s"/>`).join('')}
      ${faisca(14, 50, 2.4, '#e0f2fe', 0.4)}${faisca(124, 46, 2.4, '#e0f2fe', 1.4)}`;
  },

  'estrela-guia'() {
    const rastro = idDoEnfeite('eg-rastro');
    return `<defs><linearGradient id="${rastro}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fde68a" stop-opacity="0"/><stop offset="1" stop-color="#fef9c3" stop-opacity=".95"/></linearGradient></defs>
      ${pecaPremium('anel-prata-eg', [0, 0, 136, 136], () => anelDeMetal('prata', { largura: 4.4 }))}
      ${reflexoNoAnel(idDoEnfeite('eg'), 53, 4.4)}
      ${Array.from({ length: 10 }, (_, i) => { const [x, y] = pontoNoCirculo(60 + (i % 3) * 2, i * 36 + 10); return `<circle cx="${n1(x)}" cy="${n1(y)}" r=".9" fill="#fff" class="enf-pisca" style="--a:${n1(i * 0.27)}s"/>`; }).join('')}
      <g class="enf-gira" style="--d:9s">
        <path d="M${pontoNoCirculo(57, -70).map(n1).join(' ')}A57 57 0 0 1 ${pontoNoCirculo(57, -6).map(n1).join(' ')}" fill="none" stroke="url(#${rastro})" stroke-width="2.4" stroke-linecap="round"/>
        <g transform="translate(${pontoNoCirculo(57, -4).map(n1).join(' ')})"><g class="enf-gira-local" style="--d:4s">${pecaPremium('estrela-guia', [-13, -13, 26, 26], PECAS_PREMIUM.estrelaGuiaBrilho)}</g></g>
      </g>`;
  },

  'coroa-de-flores'() {
    const margarida = pecaPremium('margarida', [-6, -6, 12, 12], PECAS_PREMIUM.florMargarida);
    const miosotis = pecaPremium('miosotis', [-4, -4, 8, 8], PECAS_PREMIUM.florMiosotis);
    const rosa = pecaPremium('rosa-clara', [-8, -8, 16, 16], PECAS_PREMIUM.rosa('#ffffff', '#fbcfe8', '#be185d'));
    const folha = pecaPremium('folha-rosa', [0, -3, 10, 6], PECAS_PREMIUM.folhaDeRosa);
    const coroa = pecaPremium('coroa-flores', [0, 0, 136, 136], () => {
      let c = '<circle cx="68" cy="68" r="54" fill="none" stroke="#3f6212" stroke-width="1.6"/>';
      const m = PECAS_PREMIUM.florMargarida();
      const mi = PECAS_PREMIUM.florMiosotis();
      const r = PECAS_PREMIUM.rosa('#ffffff', '#fbcfe8', '#be185d')();
      const f = PECAS_PREMIUM.folhaDeRosa();
      for (let i = 0; i < 24; i += 1) {
        const a = i * 15;
        const [x, y] = pontoNoCirculo(54, a);
        c += `<g transform="translate(${n1(x)} ${n1(y)}) rotate(${a + 60})">${f}</g>`;
      }
      for (let i = 0; i < 24; i += 1) {
        const a = i * 15 + 7;
        const [x, y] = pontoNoCirculo(54.5 + (i % 2) * 1.5, a);
        const flor = i % 3 === 0 ? `<g transform="scale(.7)">${r}</g>` : i % 3 === 1 ? m : mi;
        c += `<g transform="translate(${n1(x)} ${n1(y)})">${flor}</g>`;
      }
      return c;
    });
    return `${coroa}
      <g transform="translate(112 32)"><g class="enf-flutua"><g class="enf-bate" style="--a:.1s">${pecaPremium('borboleta-azul', [-10, -8, 11, 16], PECAS_PREMIUM.borboletaAzul)}</g><g transform="scale(-1 1)"><g class="enf-bate" style="--a:.1s">${pecaPremium('borboleta-azul', [-10, -8, 11, 16], PECAS_PREMIUM.borboletaAzul)}</g></g></g></g>
      ${faisca(20, 30, 2.4, '#fff', 0.5)}${faisca(28, 116, 2.2, '#fff', 1.5)}${faisca(110, 120, 2.2, '#fff', 2.3)}`;
  },

  'coroa-real'() {
    const joias = [[30, '#bfdbfe', '#2563eb', '#1e3a8a'], [90, '#bbf7d0', '#16a34a', '#14532d'], [150, '#fecaca', '#dc2626', '#7f1d1d'], [210, '#bbf7d0', '#16a34a', '#14532d'], [270, '#bfdbfe', '#2563eb', '#1e3a8a'], [330, '#fecaca', '#dc2626', '#7f1d1d']];
    return `${pecaPremium('anel-real', [0, 0, 136, 136], () => anelDeMetal('ouro', { largura: 6 }) + joias.map(([a, c1, c2, c3], i) => { const [x, y] = pontoNoCirculo(53, a); return `<g transform="translate(${n1(x)} ${n1(y)}) rotate(${a})">${PECAS_PREMIUM.joia(c1, c2, c3)().split('id="jo"').join(`id="jo${i}"`).split('url(#jo)').join(`url(#jo${i})`)}</g>`; }).join(''))}
      ${reflexoNoAnel(idDoEnfeite('cr'), 53, 6)}
      <g transform="translate(68 6) scale(1.25)"><g class="enf-flutua">${pecaPremium('coroa-real', [-20, -19, 40, 27], PECAS_PREMIUM.coroaReal)}</g></g>
      ${faisca(52, -14, 2.6, '#fff', 0.2)}${faisca(88, -12, 2.4, '#fff', 1.1)}${faisca(20, 96, 2.2, '#fde68a', 1.8)}${faisca(118, 96, 2.2, '#fde68a', 2.5)}`;
  },

  resplendor() {
    return `<g class="enf-gira" style="--d:50s">${pecaPremium('resplendor-a', [-6, -6, 148, 148], PECAS_PREMIUM.raiosResplendor(48, 56, -2))}</g>
      <g class="enf-gira" style="--d:36s;animation-direction:reverse"><g class="enf-respira" style="--d:2.2s">${pecaPremium('resplendor-b', [0, 0, 136, 136], PECAS_PREMIUM.raiosResplendor(32, 56, 6))}</g></g>
      ${pecaPremium('anel-ouro-rs', [0, 0, 136, 136], () => anelDeMetal('ouro', { largura: 5.4, rebites: [0, 60, 120, 180, 240, 300] }))}
      ${reflexoNoAnel(idDoEnfeite('rs'), 53, 5.4)}
      ${faisca(68, -6, 3.2, '#fff', 0.2)}${faisca(10, 30, 2.4, '#fffbeb', 1)}${faisca(126, 106, 2.4, '#fffbeb', 1.8)}`;
  },

  'constelacao-da-familia'() {
    const pontos = [0, 60, 120, 180, 240, 300].map((a) => pontoNoCirculo(62, a - 90));
    const linhas = pontos.map(([x, y], i) => { const [x2, y2] = pontos[(i + 1) % 6]; return `M${n1(x)} ${n1(y)}L${n1(x2)} ${n1(y2)}`; }).join('');
    return `${pecaPremium('anel-noturno', [0, 0, 136, 136], PECAS_PREMIUM.anelNoturno)}
      <path d="${linhas}" fill="none" stroke="#c7d2fe" stroke-width=".6" stroke-dasharray="4 3" class="enf-linhas-constelacao" opacity=".8"/>
      ${pontos.map(([x, y], i) => `<g transform="translate(${n1(x)} ${n1(y)})"><g class="enf-cintila" style="--a:${n1(i * 0.4)}s">${pecaPremium('estrela-guia', [-13, -13, 26, 26], PECAS_PREMIUM.estrelaGuiaBrilho).replace('<image ', '<image transform="scale(.62)" ')}</g></g>`).join('')}`;
  },
});

Object.assign(PECAS_DAS_FAIXAS, {
  montanhasFundo: () => `<defs><linearGradient id="mo1" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1e1b4b"/><stop offset=".35" stop-color="#6d28d9"/><stop offset=".62" stop-color="#ec4899"/><stop offset=".82" stop-color="#fb923c"/><stop offset="1" stop-color="#fde68a"/></linearGradient>
      <radialGradient id="mo2" gradientUnits="userSpaceOnUse" cx="262" cy="40" r="120"><stop offset="0" stop-color="#fffbeb" stop-opacity="1"/><stop offset=".15" stop-color="#fde68a" stop-opacity=".75"/><stop offset=".5" stop-color="#fb923c" stop-opacity=".25"/><stop offset="1" stop-color="#fb923c" stop-opacity="0"/></radialGradient>
      <linearGradient id="mo3" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#c4b5fd"/><stop offset="1" stop-color="#8b5cf6"/></linearGradient>
      <linearGradient id="mo4" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6d5bd0"/><stop offset="1" stop-color="#3b2a8a"/></linearGradient>
      <linearGradient id="mo5" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2e1f6b"/><stop offset="1" stop-color="#140c33"/></linearGradient></defs>
    <rect width="320" height="80" fill="url(#mo1)"/><rect width="320" height="80" fill="url(#mo2)"/>
    <circle cx="262" cy="40" r="16" fill="#fef3c7" opacity=".45"/><circle cx="262" cy="40" r="10" fill="#fff7d6"/>
    <path d="M0 58L30 40L52 50L84 30L112 46L140 26L170 44L200 30L230 46L262 34L292 48L320 36V80H0Z" fill="url(#mo3)"/>
    <path d="M84 30L76 36L80 36L74 40L90 38ZM140 26L132 33L137 33L131 37L147 34ZM200 30L193 36L198 36L192 39L207 37Z" fill="#f5f3ff" opacity=".85"/>
    <path d="M0 64L40 52L72 60L110 46L150 58L190 44L228 58L270 48L320 60V80H0Z" fill="url(#mo4)"/>
    <path d="M0 72L36 64L70 70L110 62L150 70L196 60L236 70L280 64L320 70V80H0Z" fill="url(#mo5)"/>
    ${[[214, 62], [222, 60], [232, 63], [292, 64], [300, 62], [308, 65], [150, 66], [158, 64]].map(([x, y]) => `<path d="M${x} ${y}L${x - 3} ${y + 8}H${x + 3}Z" fill="#0b0624"/>`).join('')}`,
  belemFundo: () => `<defs><linearGradient id="be1" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#020617"/><stop offset=".6" stop-color="#14204a"/><stop offset="1" stop-color="#2a3a6e"/></linearGradient>
      <linearGradient id="be2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1b2347"/><stop offset="1" stop-color="#0b1022"/></linearGradient>
      <radialGradient id="be3" gradientUnits="userSpaceOnUse" cx="268" cy="66" r="22"><stop offset="0" stop-color="#fde68a" stop-opacity=".9"/><stop offset="1" stop-color="#fde68a" stop-opacity="0"/></radialGradient></defs>
    <rect width="320" height="80" fill="url(#be1)"/>
    <path d="M0 70C40 62 90 66 140 60C190 54 250 62 320 58V80H0Z" fill="url(#be2)"/>
    <path d="M150 62V54H156V50H162V56H170V52L174 48L178 52V58H186V54H194V60H200V56C200 52 204 50 206 50C208 50 212 52 212 56V62Z" fill="#0a0f24"/>
    ${[[153, 57], [165, 58], [180, 60], [189, 57], [205, 58]].map(([x, y]) => `<rect x="${x}" y="${y}" width="1.6" height="2" fill="#fcd34d"/>`).join('')}
    <circle cx="268" cy="66" r="22" fill="url(#be3)"/>
    <path d="M252 72V62L268 54L284 62V72Z" fill="#2b1a0e" stroke="#5c3a1a" stroke-width=".6"/><path d="M249 63L268 52L287 63" fill="none" stroke="#6b4423" stroke-width="1.6"/>
    <path d="M258 72V64H278V72Z" fill="#f6c453" opacity=".85"/>
    <path d="M262 72C262 68 264 66 265.6 66C267 66 268 67.6 268 69V72Z" fill="#1e3a8a"/><circle cx="265.6" cy="65" r="1.4" fill="#1e3a8a"/>
    <path d="M272 72V67C272 65.6 273 65 274 65C275 65 276 65.6 276 67V72Z" fill="#5b3416"/><circle cx="274" cy="63.6" r="1.4" fill="#5b3416"/>
    <path d="M265 70.6H272L271 72H266Z" fill="#8b5a2b"/><circle cx="268.5" cy="70.2" r="1" fill="#fff7d6"/>
    <g fill="#0a0f24">${[[40, 64], [56, 63], [72, 64]].map(([x, y]) => `<path d="M${x} ${y}c1 -2 3 -2 4 0l1 -3c1 -1 2 0 2 1v4h-1v3h-1v-3h-3v3h-1v-3c-1 0 -1 -1 -1 -2z"/><circle cx="${x + 6.6}" cy="${y - 4.2}" r="1"/>`).join('')}</g>`,
  girassol: () => {
    let fora = '';
    for (let i = 0; i < 16; i += 1) fora += `<ellipse cx="0" cy="-6.4" rx="1.6" ry="3.6" transform="rotate(${i * 22.5})" fill="url(#gp)" stroke="#d97706" stroke-width=".25"/>`;
    let dentro = '';
    for (let i = 0; i < 16; i += 1) dentro += `<ellipse cx="0" cy="-5" rx="1.3" ry="2.8" transform="rotate(${i * 22.5 + 11})" fill="#fbbf24" stroke="#d97706" stroke-width=".2"/>`;
    let sementes = '';
    for (let i = 0; i < 18; i += 1) { const a = i * 2.4; const r = Math.sqrt(i) * 0.75; sementes += `<circle cx="${n1(Math.cos(a) * r)}" cy="${n1(Math.sin(a) * r)}" r=".35" fill="#2a1406"/>`; }
    return `<defs><linearGradient id="gp" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fde047"/><stop offset="1" stop-color="#f59e0b"/></linearGradient>
        <radialGradient id="gc" cx="40%" cy="35%" r="70%"><stop offset="0" stop-color="#a16207"/><stop offset="1" stop-color="#3f1d06"/></radialGradient></defs>
      <path d="M0 4V30" stroke="#3f6212" stroke-width="1.4"/><path d="M0 16C-6 12 -10 14 -11 18C-6 19 -3 18 0 16ZM0 22C6 18 10 20 11 24C6 25 3 24 0 22Z" fill="#4d7c0f"/>
      ${fora}${dentro}<circle r="3.8" fill="url(#gc)"/>${sementes}`;
  },
  abelha: () => `<ellipse cx="0" cy="0" rx="3.6" ry="2.4" fill="#facc15" stroke="#1f2937" stroke-width=".35"/><path d="M-1 -2.2V2.2M1.2 -2.2V2.2" stroke="#1f2937" stroke-width=".9"/><circle cx="3.6" cy="-.2" r="1.2" fill="#1f2937"/><ellipse cx="-.6" cy="-3.2" rx="1.8" ry="1.2" fill="#e0f2fe" opacity=".85"/><ellipse cx="1" cy="-3.2" rx="1.6" ry="1.1" fill="#e0f2fe" opacity=".8"/>`,
  baloeAr: () => {
    const cores = ['#ef4444', '#facc15', '#3b82f6', '#22c55e', '#f97316', '#a855f7'];
    let gomos = '';
    cores.forEach((c, i) => { const x0 = -10 + i * (20 / 6); gomos += `<path d="M0 -14C${n1(x0 - 1)} -13 ${n1(x0)} -6 ${n1(x0 * 0.55)} 6L${n1((x0 + 20 / 6) * 0.55)} 6C${n1(x0 + 20 / 6)} -6 ${n1(x0 + 20 / 6 + 1)} -13 0 -14Z" fill="${c}"/>`; });
    return `<defs><clipPath id="bc3"><path d="M0 -14C-12 -14 -14 -2 -6 6H6C14 -2 12 -14 0 -14Z"/></clipPath><radialGradient id="bs3" cx="35%" cy="30%" r="80%"><stop offset="0" stop-color="#fff" stop-opacity=".45"/><stop offset="1" stop-color="#000" stop-opacity=".25"/></radialGradient></defs>
      <g clip-path="url(#bc3)"><rect x="-14" y="-15" width="28" height="22" fill="#ef4444"/>${gomos}</g><path d="M0 -14C-12 -14 -14 -2 -6 6H6C14 -2 12 -14 0 -14Z" fill="url(#bs3)" stroke="#7c2d12" stroke-width=".4"/>
      <path d="M-5 6L-3 11M5 6L3 11" stroke="#78350f" stroke-width=".4"/><rect x="-3.4" y="11" width="6.8" height="4" rx=".8" fill="#92400e" stroke="#451a03" stroke-width=".35"/>`;
  },
  auroraFundo: () => `<defs><linearGradient id="au1" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#020617"/><stop offset=".7" stop-color="#0b1a2e"/><stop offset="1" stop-color="#16263f"/></linearGradient></defs>
    <rect width="320" height="80" fill="url(#au1)"/>`,
  auroraMontes: () => `<defs><linearGradient id="au2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e2e8f0"/><stop offset="1" stop-color="#64748b"/></linearGradient></defs>
    <path d="M0 80V64L30 50L48 58L80 42L104 54L132 40L160 56L190 44L214 58L246 46L272 56L300 44L320 52V80Z" fill="#0f172a"/>
    <path d="M80 42L74 47L79 46L76 50L86 46ZM132 40L126 45L131 44L128 48L138 44ZM190 44L184 49L189 48L186 51L196 48ZM300 44L294 49L299 48L297 51L306 48Z" fill="url(#au2)" opacity=".8"/>
    <path d="M0 80V72C60 66 120 70 180 66C240 62 280 68 320 66V80Z" fill="#070d1c"/>
    <path d="M270 66V60L276 56L282 60V66Z" fill="#111827"/><path d="M276 56V52M274.6 53.4H277.4" stroke="#fde68a" stroke-width=".5"/><rect x="275" y="61" width="2" height="2.6" fill="#fcd34d"/>`,
  cortinaDourada: (c1, c2) => () => {
    const baixo = (x) => 52 + 5 * Math.sin(x * 0.05) + 3 * Math.sin(x * 0.13 + 1);
    const cima = (x) => 10 + 9 * Math.sin(x * 0.033 + 1) + 3 * Math.sin(x * 0.09);
    let raios = '';
    for (let x = 0; x <= 180; x += 2.6) {
      const y1 = cima(x);
      const y2 = baixo(x);
      raios += `<rect x="${n1(x)}" y="${n1(y1)}" width="2" height="${n1(y2 - y1)}" fill="url(#cdo)" opacity="${n1(0.55 + 0.45 * Math.abs(Math.sin(x * 0.21)))}"/>`;
    }
    let borda = `M0 ${n1(baixo(0))}`;
    for (let x = 4; x <= 180; x += 4) borda += `L${x} ${n1(baixo(x))}`;
    return `<defs><linearGradient id="cdo" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${c1}" stop-opacity="0"/><stop offset=".55" stop-color="${c1}" stop-opacity=".35"/><stop offset=".9" stop-color="${c2}" stop-opacity=".85"/><stop offset="1" stop-color="${c2}" stop-opacity=".2"/></linearGradient></defs>
      ${raios}<path d="${borda}" fill="none" stroke="${c2}" stroke-width=".8" opacity=".45"/>`;
  },
  ceuDeOuroFundo: () => `<defs><linearGradient id="co1" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3b1d05"/><stop offset=".55" stop-color="#a16207"/><stop offset="1" stop-color="#fbbf24"/></linearGradient>
      <radialGradient id="co2" gradientUnits="userSpaceOnUse" cx="252" cy="30" r="130"><stop offset="0" stop-color="#fffbeb" stop-opacity="1"/><stop offset=".18" stop-color="#fef3c7" stop-opacity=".8"/><stop offset=".5" stop-color="#fbbf24" stop-opacity=".25"/><stop offset="1" stop-color="#fbbf24" stop-opacity="0"/></radialGradient></defs>
    <rect width="320" height="80" fill="url(#co1)"/><rect width="320" height="80" fill="url(#co2)"/>`,
  raiosDeOuro: () => `<defs><radialGradient id="ro3" gradientUnits="userSpaceOnUse" cx="0" cy="0" r="230"><stop offset="0" stop-color="#fffbeb" stop-opacity=".55"/><stop offset=".4" stop-color="#fde68a" stop-opacity=".18"/><stop offset="1" stop-color="#fde68a" stop-opacity="0"/></radialGradient></defs>
    <g fill="url(#ro3)">${Array.from({ length: 24 }, (_, i) => { const a = (i * 15 * Math.PI) / 180; const ab = i % 2 ? 0.03 : 0.055; return `<path d="M0 0L${n1(Math.cos(a - ab) * 240)} ${n1(Math.sin(a - ab) * 240)}L${n1(Math.cos(a + ab) * 240)} ${n1(Math.sin(a + ab) * 240)}Z"/>`; }).join('')}</g>`,
  cruzGloriosa: () => `<defs><linearGradient id="cg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fffbea"/><stop offset=".3" stop-color="#facc15"/><stop offset=".55" stop-color="#a16207"/><stop offset=".75" stop-color="#fde68a"/><stop offset="1" stop-color="#78350f"/></linearGradient></defs>
    <path d="M-2.6 -20H2.6V-9H11V-4H2.6V22H-2.6V-4H-11V-9H-2.6Z" fill="url(#cg)" stroke="#5c3a04" stroke-width=".6"/>
    <path d="M-1.4 -18.6V20.6M-9.6 -6.5H9.6" stroke="#fff7d6" stroke-width=".6" opacity=".7"/>
    ${[[0, -20], [11, -6.5], [-11, -6.5], [0, 22]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="1.8" fill="url(#cg)" stroke="#5c3a04" stroke-width=".4"/>`).join('')}`,
  vitralFundo: () => `<defs><linearGradient id="vf1" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1c1917"/><stop offset="1" stop-color="#0c0a09"/></linearGradient>
      <pattern id="vf2" width="16" height="8" patternUnits="userSpaceOnUse"><rect width="16" height="8" fill="none" stroke="#292524" stroke-width=".6"/><path d="M8 0V8" stroke="#292524" stroke-width=".6" transform="translate(0 0)"/></pattern></defs>
    <rect width="320" height="80" fill="url(#vf1)"/><rect width="320" height="80" fill="url(#vf2)" opacity=".7"/>`,
  janelaGotica: (tema) => () => {
    const cores = ['#1d4ed8', '#dc2626', '#16a34a', '#eab308', '#7c3aed', '#0891b2'];
    const sorteio = sorteioFixo(tema * 7 + 3);
    let vidros = '';
    for (let y = -26; y < 22; y += 5) for (let x = -8; x < 8; x += 4) vidros += `<rect x="${x}" y="${y}" width="4" height="5" fill="${cores[Math.floor(sorteio() * cores.length)]}" opacity=".9"/>`;
    const simbolo = tema === 0 ? '<path d="M-1.4 -14H1.4V-9H6V-6.2H1.4V4H-1.4V-6.2H-6V-9H-1.4Z" fill="#fef3c7"/>'
      : tema === 1 ? '<path d="M0 2C-8 -3 -7 -10 -3.2 -10C-1.6 -10 -.6 -9 0 -7.8C.6 -9 1.6 -10 3.2 -10C7 -10 8 -3 0 2Z" fill="#fecaca" stroke="#fef3c7" stroke-width=".6"/>'
        : '<path d="M-1 -2C-4 -5 -7 -7 -9 -6C-7 -4 -4 -2 -1 0ZM1 -2C4 -5 7 -7 9 -6C7 -4 4 -2 1 0Z" fill="#f8fafc"/><ellipse cx="0" cy="-1" rx="1.4" ry="3" fill="#f8fafc"/>';
    return `<defs><clipPath id="jg${tema}"><path d="M-8 22V-18C-8 -26 0 -32 0 -32C0 -32 8 -26 8 -18V22Z"/></clipPath>
        <linearGradient id="jl${tema}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".45"/><stop offset=".5" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".25"/></linearGradient></defs>
      <path d="M-10 24V-18C-10 -28 0 -35 0 -35C0 -35 10 -28 10 -18V24Z" fill="#44403c" stroke="#78716c" stroke-width=".8"/>
      <g clip-path="url(#jg${tema})"><rect x="-8" y="-32" width="16" height="54" fill="#1e3a8a"/>${vidros}</g>
      <path d="M-8 -16H8M-8 -6H8M-8 4H8M-8 14H8M0 -32V22" stroke="#1c1917" stroke-width=".9"/>
      <g transform="translate(0 -6)">${simbolo}</g>
      <path d="M-8 22V-18C-8 -26 0 -32 0 -32C0 -32 8 -26 8 -18V22Z" fill="url(#jl${tema})" stroke="#a8a29e" stroke-width=".7"/>`;
  },
  rosacea2: () => {
    const cores = ['#dc2626', '#1d4ed8', '#eab308', '#16a34a', '#7c3aed', '#0891b2', '#dc2626', '#1d4ed8'];
    return `<circle r="11" fill="#44403c" stroke="#78716c" stroke-width=".8"/>${cores.map((c, i) => `<path d="M0 0L${n1(Math.cos((i * 45 * Math.PI) / 180) * 9.5)} ${n1(Math.sin((i * 45 * Math.PI) / 180) * 9.5)}A9.5 9.5 0 0 1 ${n1(Math.cos(((i + 1) * 45 * Math.PI) / 180) * 9.5)} ${n1(Math.sin(((i + 1) * 45 * Math.PI) / 180) * 9.5)}Z" fill="${c}" stroke="#1c1917" stroke-width=".6"/>`).join('')}<circle r="3" fill="#fde68a" stroke="#1c1917" stroke-width=".6"/>`;
  },
});

Object.assign(FAIXAS, {
  'amanhecer-nas-montanhas'() {
    const nevoa = idDoEnfeite('mn-nevoa');
    const passaro = (x, y, d, a, e) => `<g transform="translate(${x} ${y}) scale(${e})"><g class="enf-voa" style="--d:${d}s;--a:-${a}s"><path d="M0 0Q2 -2 4 0Q6 -2 8 0" fill="none" stroke="#2e1f6b" stroke-width="1" stroke-linecap="round"/></g></g>`;
    return `<defs><radialGradient id="${nevoa}"><stop offset="0" stop-color="#fdf2f8" stop-opacity=".4"/><stop offset="1" stop-color="#fdf2f8" stop-opacity="0"/></radialGradient></defs>
      ${pecaPremium('montanhas', [0, 0, 320, 80], PECAS_DAS_FAIXAS.montanhasFundo)}
      <g class="enf-nuvem" style="--d:26s"><ellipse cx="200" cy="60" rx="130" ry="5" fill="url(#${nevoa})"/></g>
      <g class="enf-nuvem" style="--d:34s;--a:-10s"><ellipse cx="170" cy="68" rx="150" ry="4.5" fill="url(#${nevoa})"/></g>
      ${passaro(340, 26, 18, 0, 1)}${passaro(360, 32, 20, 6, 0.8)}${passaro(330, 20, 16, 11, 0.7)}`;
  },

  'noite-de-natal'() {
    const brilho = idDoEnfeite('nn-brilho');
    const feixe = idDoEnfeite('nn-feixe');
    const sorteio = sorteioFixo(25);
    let estrelas = '';
    for (let i = 0; i < 40; i += 1) estrelas += `<circle cx="${n1(sorteio() * 320)}" cy="${n1(sorteio() * 54)}" r="${n1(0.3 + sorteio() * 0.6)}" fill="#fff" class="enf-pisca" style="--a:${n1(sorteio() * 3)}s"/>`;
    return `<defs><radialGradient id="${brilho}"><stop offset="0" stop-color="#ffffff" stop-opacity="1"/><stop offset=".25" stop-color="#fef9c3" stop-opacity=".7"/><stop offset="1" stop-color="#fde68a" stop-opacity="0"/></radialGradient>
        <linearGradient id="${feixe}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fef9c3" stop-opacity=".55"/><stop offset="1" stop-color="#fef9c3" stop-opacity="0"/></linearGradient></defs>
      ${pecaPremium('belem', [0, 0, 320, 80], PECAS_DAS_FAIXAS.belemFundo)}
      ${estrelas}
      <path d="M266 14L262 64H274Z" fill="url(#${feixe})" class="enf-respira" style="--d:3s"/>
      <circle cx="268" cy="12" r="16" fill="url(#${brilho})" class="enf-respira" style="--d:2.4s"/>
      <g transform="translate(268 12)"><g class="enf-gira-local" style="--d:24s">${pecaPremium('estrela-guia', [-13, -13, 26, 26], PECAS_PREMIUM.estrelaGuiaBrilho)}</g></g>`;
  },

  girassois() {
    const flor = pecaPremium('girassol', [-11, -11, 22, 42], PECAS_DAS_FAIXAS.girassol);
    const sorteio = sorteioFixo(51);
    let campo = '';
    for (let i = 0; i < 14; i += 1) {
      const x = 130 + i * 14 + sorteio() * 6;
      const e = 0.55 + sorteio() * 0.5;
      campo += `<g transform="translate(${n1(x)} ${n1(52 + (1 - e) * 22)}) scale(${n1(e)})"><g class="enf-balanca-local" style="--a:-${n1(sorteio() * 3)}s">${flor}</g></g>`;
    }
    return `${pecaPremium('eden-fundo', [0, 0, 320, 80], PECAS_DAS_FAIXAS.edenFundo)}
      <circle cx="286" cy="16" r="16" fill="#fef9c3" opacity=".35" class="enf-respira" style="--d:4s"/><circle cx="286" cy="16" r="8.5" fill="#fffbe6"/>
      ${nuvemFofa(190, 16, 0.6, pecaPremium('nuvem-dia', [-30, -14, 62, 26], () => nuvemDoDia('nd', '#ffffff', '#f1f5f9', '#cbd5e1')), 30, 0)}
      ${campo}
      <g transform="translate(220 30)"><g class="enf-borboleta-voa" style="--a:-2s">${pecaPremium('abelha', [-5, -5, 10, 8], PECAS_DAS_FAIXAS.abelha)}</g></g>
      <g transform="translate(276 40)"><g class="enf-borboleta-voa" style="--a:-5s">${pecaPremium('abelha', [-5, -5, 10, 8], PECAS_DAS_FAIXAS.abelha)}</g></g>`;
  },

  'nuvens-do-ceu'() {
    const ceu = idDoEnfeite('nc-ceu');
    const nuvem = pecaPremium('nuvem-dia', [-30, -14, 62, 26], () => nuvemDoDia('nd', '#ffffff', '#f1f5f9', '#cbd5e1'));
    const passaro = (x, y, d, a) => `<g transform="translate(${x} ${y})"><g class="enf-voa" style="--d:${d}s;--a:-${a}s"><path d="M0 0Q2 -2 4 0Q6 -2 8 0" fill="none" stroke="#475569" stroke-width=".9" stroke-linecap="round"/></g></g>`;
    return `<defs><linearGradient id="${ceu}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2563eb"/><stop offset=".6" stop-color="#60a5fa"/><stop offset="1" stop-color="#bfdbfe"/></linearGradient></defs>
      <rect width="320" height="80" fill="url(#${ceu})"/>
      <g transform="translate(296 14)"><g class="enf-gira-local" style="--d:30s">${pecaPremium('raios-do-sol', [-17, -17, 34, 34], PECAS_PREMIUM.raiosDoSol)}</g><circle r="10" fill="#fef08a"/><circle r="7" fill="#fffbe6"/></g>
      ${nuvemFofa(140, 58, 0.9, nuvem, 40, 0)}${nuvemFofa(230, 24, 0.75, nuvem, 32, 6)}${nuvemFofa(300, 62, 1, nuvem, 36, 12)}${nuvemFofa(180, 70, 0.6, nuvem, 28, 3)}
      <g transform="translate(250 44)"><g class="enf-flutua">${pecaPremium('balao-ar', [-14, -15, 28, 31], PECAS_DAS_FAIXAS.baloeAr)}</g></g>
      ${passaro(340, 30, 20, 0)}${passaro(360, 36, 22, 7)}`;
  },

  'aurora-dourada'() {
    const sorteio = sorteioFixo(61);
    let estrelas = '';
    for (let i = 0; i < 36; i += 1) estrelas += `<circle cx="${n1(sorteio() * 320)}" cy="${n1(sorteio() * 46)}" r="${n1(0.3 + sorteio() * 0.6)}" fill="#fff" class="enf-pisca" style="--a:${n1(sorteio() * 3)}s"/>`;
    return `${pecaPremium('aurora-fundo', [0, 0, 320, 80], PECAS_DAS_FAIXAS.auroraFundo)}
      ${estrelas}
      <g transform="translate(110 -2)"><g class="enf-aurora" style="--d:9s">${pecaPremium('cortina-ouro', [0, 0, 180, 64], PECAS_DAS_FAIXAS.cortinaDourada('#fde68a', '#facc15'))}</g></g>
      <g transform="translate(170 6) scale(.85)"><g class="enf-aurora" style="--d:12s;--a:-4s">${pecaPremium('cortina-verde', [0, 0, 180, 64], PECAS_DAS_FAIXAS.cortinaDourada('#fef3c7', '#bef264'))}</g></g>
      <g transform="translate(150 0) scale(.7 1)"><g class="enf-aurora" style="--d:7s;--a:-2s">${pecaPremium('cortina-ouro', [0, 0, 180, 64], PECAS_DAS_FAIXAS.cortinaDourada('#fde68a', '#facc15'))}</g></g>
      ${pecaPremium('aurora-montes', [0, 0, 320, 80], PECAS_DAS_FAIXAS.auroraMontes)}`;
  },

  'ceu-de-ouro'() {
    const nuvem = pecaPremium('nuvem-ouro', [-30, -14, 62, 26], () => nuvemDoDia('ng', '#fffbeb', '#fde68a', '#d97706'));
    const halo = idDoEnfeite('co-halo');
    let particulas = '';
    const sorteio = sorteioFixo(77);
    for (let i = 0; i < 12; i += 1) particulas += `<circle cx="${n1(150 + sorteio() * 170)}" cy="${n1(66 + sorteio() * 12)}" r="${n1(0.4 + sorteio() * 0.6)}" fill="#fffbeb" class="enf-sobe-lento" style="--d:${n1(4 + sorteio() * 4)}s;--a:-${n1(sorteio() * 8)}s"/>`;
    return `<defs><radialGradient id="${halo}"><stop offset="0" stop-color="#ffffff" stop-opacity=".95"/><stop offset=".4" stop-color="#fef3c7" stop-opacity=".5"/><stop offset="1" stop-color="#fde68a" stop-opacity="0"/></radialGradient></defs>
      ${pecaPremium('ceu-ouro', [0, 0, 320, 80], PECAS_DAS_FAIXAS.ceuDeOuroFundo)}
      <g transform="translate(252 30)"><g class="enf-gira-local" style="--d:80s">${pecaPremium('raios-ouro', [-242, -242, 484, 484], PECAS_DAS_FAIXAS.raiosDeOuro)}</g></g>
      <circle cx="252" cy="30" r="22" fill="url(#${halo})" class="enf-respira" style="--d:2.6s"/>
      <g transform="translate(252 30)"><g class="enf-flutua">${pecaPremium('cruz-gloriosa', [-13, -22, 26, 46], PECAS_DAS_FAIXAS.cruzGloriosa)}</g></g>
      ${nuvemFofa(200, 72, 1, nuvem, 30, 0)}${nuvemFofa(290, 74, 1.1, nuvem, 26, 8)}${nuvemFofa(150, 76, 0.8, nuvem, 34, 14)}
      ${particulas}${faisca(226, 12, 2.4, '#fff', 0.3)}${faisca(284, 14, 2.2, '#fff', 1.4)}`;
  },

  'vitral-da-familia'() {
    const luz = idDoEnfeite('vf-luz');
    const reflexo = idDoEnfeite('vf-ref');
    return `<defs><linearGradient id="${luz}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fde68a" stop-opacity=".35"/><stop offset="1" stop-color="#fde68a" stop-opacity="0"/></linearGradient>
        <linearGradient id="${reflexo}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".5" stop-color="#fff" stop-opacity=".45"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient></defs>
      ${pecaPremium('vitral-fundo', [0, 0, 320, 80], PECAS_DAS_FAIXAS.vitralFundo)}
      <g class="enf-respira" style="--d:3.4s"><path d="M196 44L176 80H216Z" fill="url(#${luz})"/><path d="M244 44L226 80H262Z" fill="url(#${luz})"/><path d="M292 44L276 80H308Z" fill="url(#${luz})"/></g>
      <g transform="translate(196 42)">${pecaPremium('janela-0', [-11, -36, 22, 61], PECAS_DAS_FAIXAS.janelaGotica(0))}</g>
      <g transform="translate(244 38) scale(1.1)">${pecaPremium('janela-1', [-11, -36, 22, 61], PECAS_DAS_FAIXAS.janelaGotica(1))}</g>
      <g transform="translate(292 42)">${pecaPremium('janela-2', [-11, -36, 22, 61], PECAS_DAS_FAIXAS.janelaGotica(2))}</g>
      <g clip-path="none"><g transform="skewX(-20)"><rect class="enf-reflexo-passa" x="150" y="0" width="14" height="80" fill="url(#${reflexo})"/></g></g>`;
  },
});

function pontosDaForma(forma, n) {
  const pontos = [];
  for (let i = 0; i < n; i += 1) {
    const t = (i / n) * Math.PI * 2;
    if (forma === 'coracao') {
      pontos.push([(16 * Math.sin(t) ** 3) / 17, -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)) / 17]);
    } else if (forma === 'estrela') {
      const k = Math.floor((i / n) * 10);
      const q = (i / n) * 10 - k;
      const r1 = k % 2 === 0 ? 1 : 0.45;
      const r2 = k % 2 === 0 ? 0.45 : 1;
      const a1 = -Math.PI / 2 + (k * Math.PI) / 5;
      const a2 = -Math.PI / 2 + ((k + 1) * Math.PI) / 5;
      pontos.push([Math.cos(a1) * r1 * (1 - q) + Math.cos(a2) * r2 * q, Math.sin(a1) * r1 * (1 - q) + Math.sin(a2) * r2 * q]);
    } else {
      const a = t + Math.random() * 0.2;
      const r = 0.55 + Math.random() * 0.45;
      pontos.push([Math.cos(a) * r, Math.sin(a) * r]);
    }
  }
  return pontos;
}

function motorDeFogos(w, h, foco, opcoes) {
  const { cx, cy, R } = focoDoEfeito(w, h, foco);
  const paletas = opcoes.paletas;
  const brilho = spritePremium('luz-dourada', () => spriteDeBrasa('253, 230, 138'));
  const alvos = opcoes.alvos.map(([dx, dy]) => [Math.min(w - 20, Math.max(20, cx + dx * R)), Math.max(16, cy + dy * R)]);
  const fogos = alvos.map(([x, y], i) => {
    const paleta = paletas[i % paletas.length];
    const forma = opcoes.formas[i % opcoes.formas.length];
    const raio = R * (1.7 + Math.random() * 0.5);
    return {
      de: [x + (Math.random() - 0.5) * R, Math.min(h, cy + R * 5)], ate: [x, y], sobe: 0.55 + Math.random() * 0.15, nasce: i * 0.32,
      particulas: pontosDaForma(forma, 64).map(([px, py]) => ({ vx: px * raio * 2.2, vy: py * raio * 2.2, cor: paleta[Math.floor(Math.random() * paleta.length)], pisca: Math.random() * 6.28 })),
    };
  });
  return (ctx, s) => {
    const base = ctx.globalAlpha;
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    fogos.forEach((f) => {
      const t = s - f.nasce;
      if (t <= 0) return;
      if (t < f.sobe) {
        const q = 1 - (1 - t / f.sobe) ** 2;
        const x = f.de[0] + (f.ate[0] - f.de[0]) * q;
        const y = f.de[1] + (f.ate[1] - f.de[1]) * q;
        ctx.globalAlpha = base;
        ctx.strokeStyle = 'rgba(253, 230, 138, 0.55)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x - (f.ate[0] - f.de[0]) * 0.08, y - (f.ate[1] - f.de[1]) * 0.08);
        ctx.stroke();
        ctx.drawImage(brilho, x - 6, y - 6, 12, 12);
        return;
      }
      const e = t - f.sobe;
      if (e > 2.2) return;
      if (e < 0.25) {
        ctx.globalAlpha = base * (1 - e / 0.25);
        ctx.drawImage(brilho, f.ate[0] - R * 1.2, f.ate[1] - R * 1.2, R * 2.4, R * 2.4);
      }
      const corre = (1 - Math.exp(-e * 3)) / 3;
      const cai = 18 * e * e;
      const vida = Math.max(0, 1 - e / 2.2);
      f.particulas.forEach((p) => {
        const x = f.ate[0] + p.vx * corre;
        const y = f.ate[1] + p.vy * corre + cai;
        const xa = f.ate[0] + p.vx * Math.max(0, corre - 0.025);
        const ya = f.ate[1] + p.vy * Math.max(0, corre - 0.025) + cai * 0.92;
        const pisca = e > 1 ? 0.5 + 0.5 * Math.sin(e * 30 + p.pisca) : 1;
        ctx.globalAlpha = base * vida * pisca;
        ctx.strokeStyle = p.cor;
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        ctx.moveTo(xa, ya);
        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.fillStyle = p.cor;
        ctx.fillRect(x - 1, y - 1, 2, 2);
      });
    });
    ctx.restore();
    ctx.globalAlpha = base;
  };
}

function efeitoFogosDeGloria(w, h, foco) {
  return motorDeFogos(w, h, foco, {
    paletas: [['#fffbeb', '#fde68a', '#facc15'], ['#fef3c7', '#fbbf24', '#f59e0b'], ['#ffffff', '#fde68a', '#fcd34d']],
    formas: ['redonda'], alvos: [[-1.9, -1.2], [1.9, -1.4], [0, -2.3], [-2.2, 0.6], [2.2, 0.4], [-0.9, -2], [1.1, -2.1]],
  });
}
efeitoFogosDeGloria.usaMargem = true;

function efeitoFogosDoCeu(w, h, foco) {
  return motorDeFogos(w, h, foco, {
    paletas: [['#fecdd3', '#fb7185', '#f43f5e'], ['#fef3c7', '#fde68a', '#facc15'], ['#e9d5ff', '#c084fc', '#a855f7'], ['#bfdbfe', '#60a5fa', '#ffffff']],
    formas: ['coracao', 'estrela'], alvos: [[-1.9, -1.1], [1.9, -1.3], [0, -2.3], [-2.1, 0.7], [2.1, 0.5], [1, -2.1]],
  });
}
efeitoFogosDoCeu.usaMargem = true;

function efeitoConfete(w, h, foco) {
  const { cx, cy, R } = focoDoEfeito(w, h, foco);
  const cores = ['#f43f5e', '#f59e0b', '#facc15', '#22c55e', '#3b82f6', '#a855f7', '#ec4899', '#14b8a6'];
  const chao = Math.min(h, cy + R * 4);
  const pedacos = Array.from({ length: 90 }, (_, i) => {
    const lado = i % 2 ? 1 : -1;
    const ang = -Math.PI / 2 + lado * (0.25 + Math.random() * 0.55);
    const v = R * (6 + Math.random() * 5);
    return { x: lado < 0 ? 0 : w, y: chao, vx: Math.cos(ang) * v * -lado * -1, vy: Math.sin(ang) * v, cor: cores[i % cores.length], tipo: i % 5, giro: Math.random() * 6.28, vg: (Math.random() - 0.5) * 10, fase: Math.random() * 6.28, tam: 3 + Math.random() * 4, atraso: Math.random() * 0.25 };
  });
  pedacos.forEach((p) => { p.vx = (p.x === 0 ? 1 : -1) * Math.abs(p.vx); });
  return (ctx, s) => {
    const base = ctx.globalAlpha;
    pedacos.forEach((p) => {
      const t = s - p.atraso;
      if (t <= 0) return;
      const arrasto = (1 - Math.exp(-t * 1.6)) / 1.6;
      const x = p.x + p.vx * arrasto + Math.sin(t * 3 + p.fase) * 10 * Math.min(1, t);
      const y = p.y + p.vy * arrasto + 60 * t * t;
      const vira = Math.cos(t * 8 + p.fase);
      ctx.save();
      ctx.globalAlpha = base * Math.max(0, 1 - Math.max(0, t - 2.6) / 1);
      ctx.translate(x, y);
      ctx.rotate(p.giro + p.vg * t);
      ctx.fillStyle = p.cor;
      if (p.tipo === 0) {
        ctx.beginPath();
        ctx.arc(0, 0, p.tam * 0.55, 0, Math.PI * 2);
        ctx.fill();
      } else if (p.tipo === 4) {
        ctx.strokeStyle = p.cor;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(-p.tam * 1.6, 0);
        ctx.bezierCurveTo(-p.tam * 0.6, -p.tam * vira, p.tam * 0.6, p.tam * vira, p.tam * 1.6, 0);
        ctx.stroke();
      } else {
        ctx.scale(1, 0.25 + 0.75 * Math.abs(vira));
        ctx.fillRect(-p.tam * 0.7, -p.tam * 0.4, p.tam * 1.4, p.tam * 0.8);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.35)';
        ctx.fillRect(-p.tam * 0.7, -p.tam * 0.4, p.tam * 1.4, p.tam * 0.25);
      }
      ctx.restore();
    });
    ctx.globalAlpha = base;
  };
}
efeitoConfete.usaMargem = true;


function spriteDeFloco(tipo) {
  const bracos = [0, 60, 120, 180, 240, 300];
  const desenho = tipo === 0
    ? `<g stroke="#f0f9ff" stroke-width="1.1" stroke-linecap="round">${bracos.map((a) => `<path d="M0 0V-10M0 -6L-2.6 -8.6M0 -6L2.6 -8.6M0 -3L-1.6 -4.6M0 -3L1.6 -4.6" transform="rotate(${a})"/>`).join('')}</g><circle r="1.4" fill="#fff"/>`
    : tipo === 1
      ? `<g stroke="#e0f2fe" stroke-width="1.4" stroke-linecap="round">${bracos.map((a) => `<path d="M0 0V-9M-2 -7L0 -9L2 -7" transform="rotate(${a})" fill="none"/>`).join('')}</g><path d="${caminhoDeEstrela(0, 0, 3, 1.6, 6)}" fill="#fff"/>`
      : `<g stroke="#ffffff" stroke-width="1" stroke-linecap="round">${bracos.map((a) => `<path d="M0 0V-9.6M0 -4.4L-3 -6.4M0 -4.4L3 -6.4M0 -7.6L-1.6 -9M0 -7.6L1.6 -9" transform="rotate(${a})"/>`).join('')}</g>`;
  return bitmapDoSvg(desenho, '-11 -11 22 22', 64, 64);
}

function efeitoNeveDeNatal(w, h, foco) {
  const { cy, R } = focoDoEfeito(w, h, foco);
  const sprites = [0, 1, 2].map((i) => spritePremium(`floco-${i}`, () => spriteDeFloco(i)));
  const luz = spritePremium('luz-neve', () => spriteDeBrasa('224, 242, 254'));
  const flocos = Array.from({ length: 64 }, (_, i) => {
    const z = Math.random();
    return { x: Math.random() * w, y: -20 - Math.random() * (cy + R * 2), v: 30 + z * 60, r: 3 + z * 9, z, giro: Math.random() * 6.28, vg: (Math.random() - 0.5) * 1.5, fase: Math.random() * 6.28, tipo: i % 3 };
  });
  return (ctx, s) => {
    const base = ctx.globalAlpha;
    flocos.forEach((f) => {
      const y = f.y + f.v * s * 1.6;
      const x = f.x + Math.sin(s * 1.2 + f.fase) * (8 + f.z * 10);
      if (y < -f.r * 2 || y > h + f.r) return;
      const img = sprites[f.tipo];
      ctx.save();
      ctx.globalAlpha = base * (0.45 + f.z * 0.55) * Math.min(1, s * 2);
      if (f.z > 0.75) {
        ctx.globalCompositeOperation = 'lighter';
        ctx.drawImage(luz, x - f.r * 1.6, y - f.r * 1.6, f.r * 3.2, f.r * 3.2);
        ctx.globalCompositeOperation = 'source-over';
      }
      if (imagemPronta(img)) {
        ctx.translate(x, y);
        ctx.rotate(f.giro + f.vg * s);
        ctx.drawImage(img, -f.r, -f.r, f.r * 2, f.r * 2);
      }
      ctx.restore();
    });
    ctx.globalAlpha = base;
  };
}
efeitoNeveDeNatal.usaMargem = true;

function efeitoBorboletas(w, h, foco) {
  const { cx, cy, R } = focoDoEfeito(w, h, foco);
  const tipos = [['#f9a8d4', '#a855f7'], ['#fde047', '#f97316'], ['#7dd3fc', '#2563eb'], ['#86efac', '#15803d'], ['#fecaca', '#dc2626']];
  const asas = tipos.map(([c1, c2], i) => spritePremium(`asa-borboleta-${i}`, () => bitmapDoSvg(PECAS_DAS_FAIXAS.borboleta(c1, c2)(), '-9 -7 9 14', 54, 84)));
  const borboletas = Array.from({ length: 9 }, (_, i) => {
    const lado = i % 2 ? 1 : -1;
    return {
      de: [cx + lado * (R * 0.6 + Math.random() * R * 2), Math.min(h, cy + R * (3.5 + Math.random() * 2))],
      meio: [cx + lado * (R * 1.6 + Math.random() * R * 1.4), cy + (Math.random() - 0.4) * R * 2],
      ate: [cx + lado * (R * 0.4 + Math.random() * R * 2.6), cy - R * (2 + Math.random() * 1.6)],
      tam: R * (0.32 + Math.random() * 0.18), tipo: i % tipos.length, atraso: i * 0.18, fase: Math.random() * 6.28,
    };
  });
  return (ctx, s) => {
    const base = ctx.globalAlpha;
    borboletas.forEach((b) => {
      const q = Math.min(1, Math.max(0, (s - b.atraso) / 3.1));
      if (q <= 0 || q >= 1) return;
      const u = 1 - q;
      const x = u * u * b.de[0] + 2 * u * q * b.meio[0] + q * q * b.ate[0] + Math.sin(s * 4 + b.fase) * 6;
      const y = u * u * b.de[1] + 2 * u * q * b.meio[1] + q * q * b.ate[1] + Math.cos(s * 5 + b.fase) * 4;
      const dx = 2 * u * (b.meio[0] - b.de[0]) + 2 * q * (b.ate[0] - b.meio[0]);
      const dy = 2 * u * (b.meio[1] - b.de[1]) + 2 * q * (b.ate[1] - b.meio[1]);
      const bate = 0.2 + 0.8 * Math.abs(Math.sin(s * 14 + b.fase));
      desenharFaisca(ctx, x - dx * 0.03, y - dy * 0.03 + b.tam * 0.4, b.tam * 0.25, '#fffbeb', 0.6);
      const img = asas[b.tipo];
      if (!imagemPronta(img)) return;
      ctx.save();
      ctx.globalAlpha = base * Math.min(1, q * 8) * Math.min(1, (1 - q) * 8);
      ctx.translate(x, y);
      ctx.rotate(Math.atan2(dy, dx) + Math.PI / 2);
      [-1, 1].forEach((lado) => {
        ctx.save();
        ctx.scale(lado * bate, 1);
        ctx.drawImage(img, -b.tam, -b.tam * 0.78, b.tam, b.tam * 1.56);
        ctx.restore();
      });
      ctx.fillStyle = '#1f2937';
      ctx.fillRect(-b.tam * 0.06, -b.tam * 0.3, b.tam * 0.12, b.tam * 0.7);
      ctx.restore();
    });
    ctx.globalAlpha = base;
  };
}
efeitoBorboletas.usaMargem = true;

function efeitoChuvaDeOuro(w, h, foco) {
  const { cy, R } = focoDoEfeito(w, h, foco);
  const estrela = spritePremium('estrela-ouro', () => bitmapDoSvg(PECAS_PREMIUM.estrelaDoce(['#fffbe6', '#facc15', '#a16207'])(), '-9 -9 18 19', 72, 76));
  const brilho = spritePremium('luz-dourada', () => spriteDeBrasa('253, 230, 138'));
  const fundo = Math.min(h, cy + R * 4.5);
  const estrelas = Array.from({ length: 46 }, () => ({ x: Math.random() * w, y: -20 - Math.random() * fundo * 0.9, v: 70 + Math.random() * 90, r: R * (0.1 + Math.random() * 0.16), giro: Math.random() * 6.28, vg: (Math.random() - 0.5) * 4, fase: Math.random() * 6.28 }));
  const poeira = Array.from({ length: 50 }, () => ({ x: Math.random() * w, y: Math.random() * fundo, r: 1 + Math.random() * 2.2, fase: Math.random() * 6.28 }));
  return (ctx, s) => {
    const base = ctx.globalAlpha;
    const onda = suave(s / 0.6);
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    const g = ctx.createLinearGradient(0, 0, 0, fundo * 0.5);
    g.addColorStop(0, `rgba(253, 230, 138, ${0.25 * onda})`);
    g.addColorStop(1, 'rgba(253, 230, 138, 0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, fundo * 0.5);
    poeira.forEach((p) => {
      const pisca = Math.max(0, Math.sin(s * 3 + p.fase));
      if (pisca <= 0) return;
      ctx.globalAlpha = base * pisca * onda * 0.8;
      ctx.drawImage(brilho, p.x - p.r * 2, p.y + s * 8 - p.r * 2, p.r * 4, p.r * 4);
    });
    ctx.restore();
    estrelas.forEach((e) => {
      const y = e.y + e.v * s;
      if (y < -e.r * 2 || y > fundo + e.r) return;
      const x = e.x + Math.sin(s * 2 + e.fase) * 6;
      ctx.save();
      ctx.globalCompositeOperation = 'lighter';
      ctx.globalAlpha = base * 0.5;
      ctx.drawImage(brilho, x - e.r * 2, y - e.r * 2, e.r * 4, e.r * 4);
      ctx.restore();
      if (!imagemPronta(estrela)) return;
      ctx.save();
      ctx.globalAlpha = base;
      ctx.translate(x, y);
      ctx.rotate(e.giro + e.vg * s);
      ctx.drawImage(estrela, -e.r, -e.r, e.r * 2, e.r * 2.1);
      ctx.restore();
      if (Math.sin(s * 5 + e.fase) > 0.85) desenharFaisca(ctx, x + e.r * 0.4, y - e.r * 0.4, e.r * 0.9, '#ffffff', 1);
    });
    ctx.globalAlpha = base;
  };
}
efeitoChuvaDeOuro.usaMargem = true;

function efeitoCoroacao(w, h, foco) {
  const { cx, cy, R } = focoDoEfeito(w, h, foco);
  const coroa = spritePremium('coroa-real', () => bitmapDoSvg(PECAS_PREMIUM.coroaReal(), '-20 -19 40 27', 240, 162));
  const brilho = spritePremium('luz-dourada', () => spriteDeBrasa('253, 230, 138'));
  const branco = spritePremium('luz-branca', () => spriteDeBrasa('255, 255, 255'));
  const larg = R * 1.7;
  const alt = larg * (27 / 40);
  const yFinal = cy - R * 0.84 - alt;
  const faiscas = Array.from({ length: 36 }, (_, i) => ({ a: (i / 36) * Math.PI * 2, v: R * (1.6 + Math.random() * 1.6), fase: Math.random() * 6.28 }));
  return (ctx, s) => {
    const base = ctx.globalAlpha;
    const desce = suave(s / 1.2);
    const pousou = s >= 1.2;
    const y = -alt + (yFinal + alt) * desce + (pousou ? Math.sin((s - 1.2) * 2.4) * R * 0.04 : 0);
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    const feixe = ctx.createLinearGradient(cx - larg * 0.6, 0, cx + larg * 0.6, 0);
    const forcaFeixe = 0.35 * (1 - suave((s - 1.4) / 1.4));
    feixe.addColorStop(0, 'rgba(253, 230, 138, 0)');
    feixe.addColorStop(0.5, `rgba(255, 251, 235, ${forcaFeixe})`);
    feixe.addColorStop(1, 'rgba(253, 230, 138, 0)');
    ctx.fillStyle = feixe;
    ctx.fillRect(cx - larg * 0.6, 0, larg * 1.2, y + alt * 0.5);
    ctx.globalAlpha = base * 0.75;
    ctx.drawImage(brilho, cx - larg, y - larg * 0.7, larg * 2, larg * 1.6);
    if (pousou) {
      const q = Math.min(1, (s - 1.2) / 0.6);
      ctx.globalAlpha = base * (1 - q);
      ctx.drawImage(branco, cx - R * 2.4 * (0.4 + q), yFinal - R * 2.4 * (0.4 + q) + alt * 0.6, R * 4.8 * (0.4 + q), R * 4.8 * (0.4 + q));
      ctx.globalAlpha = base;
      ctx.strokeStyle = `rgba(253, 230, 138, ${0.8 * (1 - q)})`;
      ctx.lineWidth = R * 0.08 * (1 - q) + 0.5;
      ctx.beginPath();
      ctx.arc(cx, cy, R * (1.05 + q * 1.6), 0, Math.PI * 2);
      ctx.stroke();
    }
    ctx.restore();
    if (imagemPronta(coroa)) {
      ctx.save();
      ctx.globalAlpha = base;
      ctx.drawImage(coroa, cx - larg / 2, y, larg, alt);
      ctx.restore();
    }
    if (pousou) {
      const t = s - 1.2;
      faiscas.forEach((f) => {
        const d = R * 1.05 + f.v * (1 - Math.exp(-t * 2.4)) / 2.4;
        desenharFaisca(ctx, cx + Math.cos(f.a) * d, cy + Math.sin(f.a) * d, R * 0.12 * (0.6 + 0.4 * Math.sin(t * 8 + f.fase)), '#fde68a', Math.max(0, 1 - t / 1.8));
      });
    }
    ctx.globalAlpha = base;
  };
}
efeitoCoroacao.usaMargem = true;

Object.assign(EFEITOS_DO_PERFIL, {
  'fogos-de-gloria': efeitoFogosDeGloria,
  confete: efeitoConfete,
  'neve-de-natal': efeitoNeveDeNatal,
  borboletas: efeitoBorboletas,
  'chuva-de-ouro': efeitoChuvaDeOuro,
  coroacao: efeitoCoroacao,
  'fogos-do-ceu': efeitoFogosDoCeu,
});

function estouroDeLinhas(x, y, r, cor, n) {
  let l = '';
  for (let i = 0; i < n; i += 1) {
    const a = (i / n) * Math.PI * 2;
    l += `<path d="M${n1(x + Math.cos(a) * r * 0.35)} ${n1(y + Math.sin(a) * r * 0.35)}L${n1(x + Math.cos(a) * r)} ${n1(y + Math.sin(a) * r)}" stroke="${cor}" stroke-width=".8" stroke-linecap="round"/><circle cx="${n1(x + Math.cos(a) * r)}" cy="${n1(y + Math.sin(a) * r)}" r=".7" fill="#fff"/>`;
  }
  return `<circle cx="${x}" cy="${y}" r="${n1(r * 0.6)}" fill="${cor}" opacity=".18"/>${l}`;
}

Object.assign(MINIS_DE_EFEITO, {
  'fogos-de-gloria'(g) {
    return `${fundoDoMini(g, '#0b1022', '#1e1b4b')}${estouroDeLinhas(20, 15, 10, '#fde68a', 14)}${estouroDeLinhas(45, 22, 12, '#facc15', 16)}<path d="M45 40L45 34" stroke="#fde68a" stroke-width=".7" opacity=".6"/>`;
  },
  confete(g) {
    const cores = ['#f43f5e', '#f59e0b', '#facc15', '#22c55e', '#3b82f6', '#a855f7', '#ec4899'];
    let c = '';
    [[8, 10, 20], [18, 24, -30], [28, 8, 45], [36, 30, 10], [46, 14, -50], [56, 26, 30], [14, 34, 70], [50, 6, -10], [24, 18, 0], [40, 22, 60]].forEach(([x, y, a], i) => { c += `<rect x="${x}" y="${y}" width="4" height="2.4" rx=".4" fill="${cores[i % cores.length]}" transform="rotate(${a} ${x + 2} ${y + 1.2})"/>`; });
    return `${fundoDoMini(g, '#4c1d95', '#7c3aed')}${c}<path d="M4 20C8 16 12 24 16 20S24 24 28 20" stroke="#fde047" stroke-width="1" fill="none"/><path d="M36 36C40 32 44 40 48 36S56 40 60 36" stroke="#22d3ee" stroke-width="1" fill="none"/>`;
  },
  'neve-de-natal'(g) {
    const floco = (x, y, r) => `<g transform="translate(${x} ${y})" stroke="#f0f9ff" stroke-width=".7" stroke-linecap="round">${[0, 60, 120].map((a) => `<path d="M0 ${-r}V${r}" transform="rotate(${a})"/>`).join('')}${[0, 60, 120, 180, 240, 300].map((a) => `<path d="M0 ${n1(-r * 0.6)}L${n1(-r * 0.3)} ${n1(-r * 0.85)}M0 ${n1(-r * 0.6)}L${n1(r * 0.3)} ${n1(-r * 0.85)}" transform="rotate(${a})"/>`).join('')}</g>`;
    return `${fundoDoMini(g, '#0c4a6e', '#38bdf8')}${floco(14, 12, 6)}${floco(34, 26, 8)}${floco(52, 12, 5)}${floco(24, 32, 3.6)}${floco(50, 32, 4)}`;
  },
  borboletas(g) {
    const b = (x, y, e, i, c1, c2) => `<g transform="translate(${x} ${y}) scale(${e})">${pecaPremium(`borboleta-${i}`, [-9, -7, 18, 14], PECAS_DAS_FAIXAS.borboleta(c1, c2))}<g transform="scale(-1 1)">${pecaPremium(`borboleta-${i}`, [-9, -7, 18, 14], PECAS_DAS_FAIXAS.borboleta(c1, c2))}</g></g>`;
    return `${fundoDoMini(g, '#dcfce7', '#86efac')}${b(20, 20, 1.2, 0, '#f9a8d4', '#a855f7')}${b(46, 14, 0.95, 1, '#fde047', '#f97316')}${b(44, 32, 0.7, 2, '#7dd3fc', '#2563eb')}`;
  },
  'chuva-de-ouro'(g) {
    const e = (x, y, s) => `<g transform="translate(${x} ${y}) scale(${s})">${pecaPremium('estrela-ouro-mini', [-9, -9, 18, 19], PECAS_PREMIUM.estrelaDoce(['#fffbe6', '#facc15', '#a16207']))}</g>`;
    return `${fundoDoMini(g, '#1c1305', '#713f12')}${e(14, 10, 0.6)}${e(32, 22, 0.75)}${e(50, 12, 0.55)}${e(22, 32, 0.5)}${e(48, 32, 0.6)}${faisca(40, 8, 2, '#fff', 0)}`;
  },
  coroacao(g) {
    return `${fundoDoMini(g, '#1e1b4b', '#4c1d95')}<ellipse cx="32" cy="18" rx="20" ry="14" fill="#fde68a" opacity=".25"/><path d="M26 0H38L36 14H28Z" fill="#fef3c7" opacity=".25"/><g transform="translate(32 20) scale(.85)">${pecaPremium('coroa-real', [-20, -19, 40, 27], PECAS_PREMIUM.coroaReal)}</g><circle cx="32" cy="33" r="5" fill="#64748b" stroke="#facc15" stroke-width=".9"/>`;
  },
  'fogos-do-ceu'(g) {
    const forma = (x, y, r, tipo, cor) => pontosDaForma(tipo, 20).map(([px, py]) => `<circle cx="${n1(x + px * r)}" cy="${n1(y + py * r)}" r=".8" fill="${cor}"/>`).join('');
    return `${fundoDoMini(g, '#0b1022', '#312e81')}${forma(20, 18, 10, 'coracao', '#fb7185')}${forma(46, 18, 11, 'estrela', '#fde68a')}`;
  },
});

Object.assign(PECAS_PREMIUM, {
  anelDeLuz: () => `<defs><radialGradient id="al1" cx="50%" cy="50%" r="50%"><stop offset=".72" stop-color="#fde68a" stop-opacity="0"/><stop offset=".8" stop-color="#fef3c7" stop-opacity=".75"/><stop offset=".86" stop-color="#facc15" stop-opacity=".45"/><stop offset="1" stop-color="#facc15" stop-opacity="0"/></radialGradient>
      <linearGradient id="al2" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fffbea"/><stop offset=".4" stop-color="#fde68a"/><stop offset=".7" stop-color="#f5c542"/><stop offset="1" stop-color="#b8860b"/></linearGradient></defs>
    <circle cx="68" cy="68" r="66" fill="url(#al1)"/>
    <circle cx="68" cy="68" r="53" fill="none" stroke="url(#al2)" stroke-width="4"/>
    <circle cx="68" cy="68" r="55.4" fill="none" stroke="#fffbeb" stroke-width=".8" opacity=".9"/><circle cx="68" cy="68" r="50.8" fill="none" stroke="#a16207" stroke-width=".6"/>`,
  estrelaDourada: () => `<defs><linearGradient id="ed2" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fffbea"/><stop offset=".45" stop-color="#facc15"/><stop offset="1" stop-color="#a16207"/></linearGradient></defs>
    <path d="${caminhoDeEstrela(0, 0, 5, 2.1, 5)}" fill="url(#ed2)" stroke="#78350f" stroke-width=".35" stroke-linejoin="round"/><path d="${caminhoDeEstrela(0, -0.2, 2.6, 1.1, 5)}" fill="#fffbeb" opacity=".6"/>`,
  anelMariano: () => `<defs><linearGradient id="am2" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#93c5fd"/><stop offset=".4" stop-color="#1d4ed8"/><stop offset="1" stop-color="#0b1f5c"/></linearGradient>
      <linearGradient id="am3" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff6cf"/><stop offset=".5" stop-color="#eebf4a"/><stop offset="1" stop-color="#7a4e05"/></linearGradient></defs>
    <circle cx="68" cy="69.2" r="53.5" fill="none" stroke="#060a1e" stroke-width="7.6" opacity=".35"/>
    <circle cx="68" cy="68" r="53.5" fill="none" stroke="url(#am2)" stroke-width="7"/>
    <circle cx="68" cy="68" r="57" fill="none" stroke="url(#am3)" stroke-width="1.3"/><circle cx="68" cy="68" r="50" fill="none" stroke="url(#am3)" stroke-width="1.1"/>`,
  luaCrescente: () => `<defs><linearGradient id="lc" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fffbea"/><stop offset=".5" stop-color="#f5c542"/><stop offset="1" stop-color="#8a5a0a"/></linearGradient></defs>
    <path d="M-14 -2C-10 6 10 6 14 -2C8 2 -8 2 -14 -2Z" fill="url(#lc)" stroke="#5c3a04" stroke-width=".4"/>`,
  contaDePerola: () => `<defs><radialGradient id="cp" cx="35%" cy="30%" r="75%"><stop offset="0" stop-color="#ffffff"/><stop offset=".6" stop-color="#e8e2d6"/><stop offset="1" stop-color="#a39a8a"/></radialGradient></defs><circle r="2" fill="url(#cp)"/><circle cx="-.6" cy="-.6" r=".55" fill="#fff"/>`,
  crucifixo: () => `<defs><linearGradient id="cx2" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff6cf"/><stop offset=".3" stop-color="#eebf4a"/><stop offset=".55" stop-color="#8a5a0a"/><stop offset=".8" stop-color="#f7d774"/><stop offset="1" stop-color="#5c3a04"/></linearGradient></defs>
    <path d="M-1.6 -10H1.6V-5H6V-2H1.6V12H-1.6V-2H-6V-5H-1.6Z" fill="url(#cx2)" stroke="#5c3a04" stroke-width=".4"/>
    <path d="M0 -4.6C-.8 -4.6 -1 -3.6 -.6 -3C-1.6 -2.8 -3.6 -3.4 -4.6 -3.6C-3.4 -2.6 -1.4 -2 -.8 -1.4V5.6L0 7L.8 5.6V-1.4C1.4 -2 3.4 -2.6 4.6 -3.6C3.6 -3.4 1.6 -2.8 .6 -3C1 -3.6 .8 -4.6 0 -4.6Z" fill="#fef3c7" opacity=".9"/>
    <circle cx="0" cy="-12.4" r="1.4" fill="none" stroke="url(#cx2)" stroke-width=".8"/>`,
  medalhaMilagrosa: () => `<defs><radialGradient id="mm" cx="35%" cy="30%" r="75%"><stop offset="0" stop-color="#fffbea"/><stop offset=".5" stop-color="#e2e8f0"/><stop offset="1" stop-color="#64748b"/></radialGradient></defs>
    <ellipse rx="3.6" ry="4.6" fill="url(#mm)" stroke="#475569" stroke-width=".4"/><path d="M0 -2.6C-.9 -2.6 -1.2 -1.6 -.8 -1C-1.6 -.2 -1.6 1.6 -1 2.6H1C1.6 1.6 1.6 -.2 .8 -1C1.2 -1.6 .9 -2.6 0 -2.6Z" fill="#94a3b8"/>`,
  linguaDeFogo: () => `<defs><linearGradient id="lf" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#b91c1c"/><stop offset=".4" stop-color="#f97316"/><stop offset=".8" stop-color="#fde047"/><stop offset="1" stop-color="#fffbeb"/></linearGradient></defs>
    <path d="M0 0C-4 -3 -4 -8 0 -15C1.4 -11 4.4 -8 3.6 -4C3.2 -1.8 1.8 -.4 0 0Z" fill="url(#lf)"/><path d="M.2 -1.6C-1.4 -3 -1.4 -5.6 .2 -8.6C1.4 -6 2 -4.2 .2 -1.6Z" fill="#fffbeb" opacity=".85"/>`,
  pombaDeFrentePequena: () => PECAS_DAS_FAIXAS.pombaDeFrente(),
  lirio: () => `<defs><linearGradient id="li" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#e2e8f0"/><stop offset=".55" stop-color="#ffffff"/><stop offset="1" stop-color="#fffbeb"/></linearGradient></defs>
    ${[-50, -18, 18, 50, 0].map((a, i) => `<path d="M0 0C-2.4 -4 -2.6 -9 0 -13C2.6 -9 2.4 -4 0 0Z" transform="rotate(${a}) scale(${i === 4 ? 0.9 : 1})" fill="url(#li)" stroke="#cbd5e1" stroke-width=".35"/>`).join('')}
    <path d="M0 0L-2 -7M0 0L0 -8M0 0L2 -7" stroke="#a16207" stroke-width=".35"/><circle cx="-2" cy="-7" r=".7" fill="#ea580c"/><circle cx="0" cy="-8" r=".7" fill="#ea580c"/><circle cx="2" cy="-7" r=".7" fill="#ea580c"/>`,
  folhaVerde: () => `<defs><linearGradient id="fv" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#14532d"/><stop offset=".6" stop-color="#22c55e"/><stop offset="1" stop-color="#bbf7d0"/></linearGradient></defs>
    <path d="M0 0C3 -2.4 9 -2.6 13 0C9 2.6 3 2.4 0 0Z" fill="url(#fv)" stroke="#14532d" stroke-width=".3"/><path d="M.6 0H12" stroke="#14532d" stroke-width=".3"/>`,
  coracaoSagrado: () => `<defs><radialGradient id="cs" cx="38%" cy="30%" r="75%"><stop offset="0" stop-color="#ffb4b4"/><stop offset=".45" stop-color="#dc2626"/><stop offset="1" stop-color="#6b0f1a"/></radialGradient>
      <linearGradient id="csc" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff6cf"/><stop offset=".5" stop-color="#eebf4a"/><stop offset="1" stop-color="#7a4e05"/></linearGradient></defs>
    <path d="M0 11C-14 2 -13 -9 -6 -9C-3 -9 -1 -7.4 0 -5.6C1 -7.4 3 -9 6 -9C13 -9 14 2 0 11Z" fill="url(#cs)" stroke="#5f0f17" stroke-width=".5"/>
    <path d="M-11 -1C-6 2 6 2 11 -1M-11 1C-6 -2 6 -2 11 1" fill="none" stroke="#365314" stroke-width="1"/>
    ${[-9, -5, -1, 3, 7].map((x) => `<path d="M${x} -1L${x + 0.8} -3M${x + 1.6} 1L${x + 2.2} 3" stroke="#365314" stroke-width=".6"/>`).join('')}
    <path d="M-8.4 -5.4C-6.6 -7.6 -3.6 -7.2 -2.6 -5.2" fill="none" stroke="#fff" stroke-width="1" stroke-linecap="round" opacity=".55"/>
    <path d="M-1 -14H1V-10H3.6V-8H1V-5.4H-1V-8H-3.6V-10H-1Z" fill="url(#csc)" stroke="#5c3a04" stroke-width=".35"/>
    <path d="M1.4 4C1.4 6 .4 7 -.6 7" stroke="#fecaca" stroke-width=".8" fill="none"/>`,
  raminhoDeOliveira: (lado) => () => {
    let f = '';
    for (let i = 0; i < 9; i += 1) {
      const t = i / 8;
      const x = 0;
      const y = -t * 44;
      f += `<path d="M0 0C2 -1.6 6 -1.8 9 0C6 1.8 2 1.6 0 0Z" transform="translate(${x} ${n1(y)}) rotate(${i % 2 ? -60 : -120})" fill="url(#ro4)" stroke="#365314" stroke-width=".3"/>`;
    }
    return `<defs><linearGradient id="ro4" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#3f6212"/><stop offset=".5" stop-color="#94a3b8"/><stop offset="1" stop-color="#d9f99d"/></linearGradient>
        <radialGradient id="oa4" cx="35%" cy="30%" r="70%"><stop offset="0" stop-color="#a3e635"/><stop offset=".6" stop-color="#4d7c0f"/><stop offset="1" stop-color="#1a2e05"/></radialGradient></defs>
      <path d="M0 4C${lado * 2} -16 ${lado * -2} -30 0 -46" fill="none" stroke="#6b4423" stroke-width=".9"/>${f}
      <ellipse cx="${lado * 3}" cy="-14" rx="1.6" ry="2.2" fill="url(#oa4)"/><ellipse cx="${lado * -3}" cy="-28" rx="1.6" ry="2.2" fill="url(#oa4)"/>`;
  },
  laco: () => `<defs><linearGradient id="lo" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fef3c7"/><stop offset="1" stop-color="#d4a017"/></linearGradient></defs>
    <path d="M0 0C-5 -5 -11 -4 -10 0C-11 4 -5 5 0 0Z" fill="url(#lo)" stroke="#92400e" stroke-width=".4"/><path d="M0 0C5 -5 11 -4 10 0C11 4 5 5 0 0Z" fill="url(#lo)" stroke="#92400e" stroke-width=".4"/>
    <path d="M-1 1L-5 9L-2.6 8L-1.4 10Z M1 1L5 9L2.6 8L1.4 10Z" fill="url(#lo)" stroke="#92400e" stroke-width=".4"/><circle r="1.8" fill="url(#lo)" stroke="#92400e" stroke-width=".4"/>`,
  rosaceaAnel: () => {
    const cores = ['#1d4ed8', '#dc2626', '#eab308', '#16a34a', '#7c3aed', '#0891b2'];
    let vidros = '';
    for (let i = 0; i < 24; i += 1) {
      const a1 = (i * 15 - 90) * Math.PI / 180;
      const a2 = ((i + 1) * 15 - 90) * Math.PI / 180;
      const p = (a, r) => `${n1(68 + Math.cos(a) * r)} ${n1(68 + Math.sin(a) * r)}`;
      vidros += `<path d="M${p(a1, 50.5)}L${p(a1, 58.5)}A58.5 58.5 0 0 1 ${p(a2, 58.5)}L${p(a2, 50.5)}A50.5 50.5 0 0 0 ${p(a1, 50.5)}Z" fill="${cores[i % cores.length]}" stroke="#1c1917" stroke-width=".6"/>`;
      const am = (a1 + a2) / 2;
      vidros += `<circle cx="${n1(68 + Math.cos(am) * 54.5)}" cy="${n1(68 + Math.sin(am) * 54.5)}" r="1.4" fill="#fef3c7" opacity=".55"/>`;
    }
    return `<defs><linearGradient id="rsx" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff6cf"/><stop offset=".5" stop-color="#eebf4a"/><stop offset="1" stop-color="#7a4e05"/></linearGradient></defs>
      <circle cx="68" cy="69.2" r="54.5" fill="none" stroke="#060a1e" stroke-width="10" opacity=".35"/>${vidros}
      <circle cx="68" cy="68" r="59.2" fill="none" stroke="url(#rsx)" stroke-width="1.6"/><circle cx="68" cy="68" r="50" fill="none" stroke="url(#rsx)" stroke-width="1.4"/>`;
  },
});

Object.assign(MOLDURAS, {
  aureola() {
    return `<g class="enf-respira" style="--d:3s">${pecaPremium('anel-de-luz', [-0, 0, 136, 136], PECAS_PREMIUM.anelDeLuz)}</g>
      ${reflexoNoAnel(idDoEnfeite('au'), 53, 4)}
      <g class="enf-gira" style="--d:12s">${[0, 120, 240].map((a) => { const [x, y] = pontoNoCirculo(53, a); return faisca(x, y, 3, '#ffffff', 0); }).join('')}</g>
      <g class="enf-gira" style="--d:18s;animation-direction:reverse">${[60, 180, 300].map((a, i) => { const [x, y] = pontoNoCirculo(58, a); return faisca(x, y, 2.2, '#fef3c7', i * 0.6); }).join('')}</g>`;
  },

  'estrelas-de-maria'() {
    const estrela = pecaPremium('estrela-dourada', [-6, -6, 12, 12], PECAS_PREMIUM.estrelaDourada);
    return `${pecaPremium('anel-mariano', [0, 0, 136, 136], PECAS_PREMIUM.anelMariano)}
      ${reflexoNoAnel(idDoEnfeite('em'), 53.5, 7)}
      ${Array.from({ length: 12 }, (_, i) => { const [x, y] = pontoNoCirculo(53.5, i * 30 - 90); return `<g transform="translate(${n1(x)} ${n1(y)})"><g class="enf-cintila" style="--a:${n1(i * 0.22)}s">${estrela}</g></g>`; }).join('')}
      <g transform="translate(68 126)">${pecaPremium('lua-crescente', [-15, -4, 30, 10], PECAS_PREMIUM.luaCrescente)}</g>
      ${faisca(16, 30, 2.4, '#fff', 0.4)}${faisca(120, 30, 2.4, '#fff', 1.4)}`;
  },

  terco() {
    const contas = () => {
      let c = '<defs><radialGradient id="cp" cx="35%" cy="30%" r="75%"><stop offset="0" stop-color="#ffffff"/><stop offset=".6" stop-color="#e8e2d6"/><stop offset="1" stop-color="#a39a8a"/></radialGradient></defs><circle cx="68" cy="68" r="54" fill="none" stroke="#a8a29e" stroke-width=".6" stroke-dasharray="1 1.4"/>';
      for (let i = 0; i < 50; i += 1) {
        const a = 90 + 14 + (i / 49) * (360 - 28);
        const r = i % 10 === 0 ? 2.9 : 2;
        const [x, y] = pontoNoCirculo(54, a);
        c += `<circle cx="${n1(x)}" cy="${n1(y)}" r="${r}" fill="url(#cp)"/><circle cx="${n1(x - r * 0.3)}" cy="${n1(y - r * 0.3)}" r="${n1(r * 0.28)}" fill="#fff"/>`;
      }
      return c;
    };
    return `${pecaPremium('terco-contas', [0, 0, 136, 136], contas)}
      <g class="enf-gira" style="--d:9s"><circle cx="68" cy="68" r="54" fill="none" stroke="#fff" stroke-width="2.6" stroke-dasharray="3 60" stroke-linecap="round" opacity=".5"/></g>
      <g transform="translate(68 122)"><path d="M0 -6V0" stroke="#a8a29e" stroke-width=".6"/>${pecaPremium('medalha', [-4, -5, 8, 10], PECAS_PREMIUM.medalhaMilagrosa)}<path d="M0 5V9" stroke="#a8a29e" stroke-width=".6"/>
        <g transform="translate(0 20)"><g class="enf-balanca-local">${pecaPremium('crucifixo', [-7, -14, 14, 27], PECAS_PREMIUM.crucifixo)}</g></g></g>`;
  },

  pentecostes() {
    const chama = pecaPremium('lingua-fogo', [-5, -16, 10, 17], PECAS_PREMIUM.linguaDeFogo);
    return `${pecaPremium('anel-ouro-pe', [0, 0, 136, 136], () => anelDeMetal('ouro', { largura: 4.4 }))}
      ${reflexoNoAnel(idDoEnfeite('pe'), 53, 4.4)}
      ${Array.from({ length: 12 }, (_, i) => { const a = i * 30 - 75; const [x, y] = pontoNoCirculo(56, a); return `<g transform="translate(${n1(x)} ${n1(y)}) rotate(${a + 90})"><g class="enf-chama" style="--d:${n1(0.36 + (i % 3) * 0.07)}s;--a:${n1(i * 0.11)}s">${chama}</g></g>`; }).join('')}
      <g transform="translate(68 4) scale(.62)"><g class="enf-flutua">${pecaPremium('pomba-frente', [-24, -16, 48, 30], PECAS_DAS_FAIXAS.pombaDeFrente)}</g></g>`;
  },

  rosas() {
    const coroa = pecaPremium('coroa-rosas-vermelhas', [0, 0, 136, 136], () => {
      const rosa = PECAS_PREMIUM.rosa('#fecdd3', '#e11d48', '#881337')();
      const botao = PECAS_PREMIUM.rosa('#ffe4e6', '#fb7185', '#9f1239')().split('id="ro"').join('id="rb2"').split('url(#ro)').join('url(#rb2)').split('id="rm"').join('id="rmb"').split('url(#rm)').join('url(#rmb)');
      const folha = PECAS_PREMIUM.folhaDeRosa();
      let c = anelDeMetal('ouro', { largura: 3.4, gravura: false });
      for (let i = 0; i < 16; i += 1) {
        const a = i * 22.5;
        const [fx, fy] = pontoNoCirculo(56, a + 11);
        c += `<g transform="translate(${n1(fx)} ${n1(fy)}) rotate(${a + 100})">${folha}</g>`;
      }
      for (let i = 0; i < 16; i += 1) {
        const a = i * 22.5;
        const [x, y] = pontoNoCirculo(55.5, a);
        c += `<g transform="translate(${n1(x)} ${n1(y)}) scale(${i % 2 ? 0.62 : 0.85})">${i % 2 ? botao : rosa}</g>`;
      }
      return c;
    });
    const petala = '<path d="M0 -2.4C1.8 -2.4 2.6 0 0 2.6C-2.6 0 -1.8 -2.4 0 -2.4Z" fill="#fb7185"/>';
    return `${coroa}${[[26, 112, 0], [104, 118, 1.6], [64, 126, 3.1]].map(([x, y, a]) => `<g transform="translate(${x} ${y})"><g class="enf-cai" style="--a:-${a}s">${petala}</g></g>`).join('')}
      ${faisca(16, 34, 2.4, '#fff1f2', 0.4)}${faisca(120, 30, 2.4, '#fff1f2', 1.4)}`;
  },

  lirios() {
    const lirio = pecaPremium('lirio', [-8, -14, 16, 15], PECAS_PREMIUM.lirio);
    const folha = pecaPremium('folha-verde', [0, -3, 14, 6], PECAS_PREMIUM.folhaVerde);
    let coroa = '';
    [130, 160, 190, 220, 320, 350, 20, 50].forEach((a, i) => {
      const [x, y] = pontoNoCirculo(56, a);
      const [fx, fy] = pontoNoCirculo(55, a + (a > 90 && a < 270 ? 14 : -14));
      coroa += `<g transform="translate(${n1(fx)} ${n1(fy)}) rotate(${a + (a > 90 && a < 270 ? 100 : 80)})">${folha}</g><g transform="translate(${n1(x)} ${n1(y)}) rotate(${a + 90})"><g class="enf-balanca-local" style="--a:-${n1(i * 0.5)}s">${lirio}</g></g>`;
    });
    return `${pecaPremium('anel-prata-li', [0, 0, 136, 136], () => anelDeMetal('prata', { largura: 3.8 }))}
      ${reflexoNoAnel(idDoEnfeite('li'), 53, 3.8)}
      ${coroa}${faisca(110, 26, 2.4, '#fff', 0.5)}${faisca(26, 40, 2.2, '#fffbeb', 1.6)}`;
  },

  'asas-de-anjo'() {
    const asa = pecaDoArcanjo('m-asa', [-56, -76, 62, 86], PECAS_DA_MOLDURA_DO_ARCANJO.asa);
    const halo = idDoEnfeite('aa-halo');
    const brilho = idDoEnfeite('aa-brilho');
    return `<defs><linearGradient id="${halo}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fde68a"/><stop offset=".5" stop-color="#fffbea"/><stop offset="1" stop-color="#eab308"/></linearGradient>
        <radialGradient id="${brilho}" cx="50%" cy="50%" r="50%"><stop offset=".72" stop-color="#fde68a" stop-opacity="0"/><stop offset=".8" stop-color="#fef3c7" stop-opacity=".6"/><stop offset="1" stop-color="#facc15" stop-opacity="0"/></radialGradient></defs>
      <circle cx="68" cy="68" r="66" fill="url(#${brilho})" class="enf-respira" style="--d:3s"/>
      <g transform="translate(16 76)"><g class="enf-asa-sm">${asa}</g></g>
      <g transform="translate(120 76) scale(-1 1)"><g class="enf-asa-sm">${asa}</g></g>
      ${pecaPremium('anel-ouro-aa', [0, 0, 136, 136], () => anelDeMetal('ouro', { largura: 4.2 }))}
      ${reflexoNoAnel(idDoEnfeite('aa'), 53, 4.2)}
      <g class="enf-flutua"><ellipse cx="68" cy="2" rx="26" ry="6.5" fill="none" stroke="#fef08a" stroke-width="6" opacity=".25"/><ellipse cx="68" cy="2" rx="26" ry="6.5" fill="none" stroke="url(#${halo})" stroke-width="3"/>
      <ellipse cx="68" cy="2" rx="26" ry="6.5" fill="none" stroke="#fff" stroke-width=".8" stroke-dasharray="2 10" opacity=".8"/></g>
      ${faisca(10, 30, 3, '#fff', 0.2)}${faisca(126, 30, 3, '#fff', 1.2)}${faisca(68, 132, 2.6, '#fde68a', 2)}`;
  },

  'sagrado-coracao'() {
    const fogo = idDoEnfeite('sc-fogo');
    const luz = idDoEnfeite('sc-luz');
    let raios = '';
    for (let i = 0; i < 16; i += 1) raios += `<path d="M0 0L${n1(Math.cos((i * 22.5 * Math.PI) / 180) * 22)} ${n1(Math.sin((i * 22.5 * Math.PI) / 180) * 22)}" stroke="#fde68a" stroke-width="${i % 2 ? 0.5 : 1}" opacity=".7"/>`;
    return `<defs><radialGradient id="${luz}"><stop offset="0" stop-color="#fef3c7" stop-opacity=".9"/><stop offset="1" stop-color="#fde68a" stop-opacity="0"/></radialGradient>
        <linearGradient id="${fogo}" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#dc2626"/><stop offset=".45" stop-color="#f97316"/><stop offset="1" stop-color="#fef08a"/></linearGradient></defs>
      ${pecaPremium('anel-ouro-sc', [0, 0, 136, 136], () => anelDeMetal('ouro', { largura: 5, rebites: [30, 90, 150, 210, 330] }))}
      ${reflexoNoAnel(idDoEnfeite('sc'), 53, 5)}
      <g transform="translate(68 8)">
        <circle r="20" fill="url(#${luz})" class="enf-respira" style="--d:2.2s"/>
        <g class="enf-gira-local" style="--d:30s">${raios}</g>
        ${[[-4, -14, 0.4], [4, -14, 0.46]].map(([x, y, d], i) => `<g transform="translate(${x} ${y})"><g class="enf-chama" style="--d:${d}s;--a:${i * 0.2}s"><path d="M0 0C-2.4 -2.2 -2 -5.6 0 -9C2 -5.6 2.4 -2.2 0 0Z" fill="url(#${fogo})"/></g></g>`).join('')}
        <g transform="scale(.95)">${pecaPremium('coracao-sagrado', [-15, -15, 30, 27], PECAS_PREMIUM.coracaoSagrado)}</g>
      </g>
      ${faisca(26, 22, 2.4, '#fff', 0.5)}${faisca(110, 22, 2.4, '#fff', 1.5)}`;
  },

  'ramos-de-oliveira'() {
    return `${pecaPremium('anel-prata-ro', [0, 0, 136, 136], () => anelDeMetal('prata', { largura: 3 }))}
      <g transform="translate(60 124) rotate(-58)">${pecaPremium('raminho-esq', [-6, -48, 14, 54], PECAS_PREMIUM.raminhoDeOliveira(-1))}</g>
      <g transform="translate(60 124) rotate(-112)">${pecaPremium('raminho-esq2', [-6, -48, 14, 54], PECAS_PREMIUM.raminhoDeOliveira(1))}</g>
      <g transform="translate(76 124) rotate(58)">${pecaPremium('raminho-dir', [-8, -48, 14, 54], PECAS_PREMIUM.raminhoDeOliveira(1))}</g>
      <g transform="translate(76 124) rotate(112)">${pecaPremium('raminho-dir2', [-8, -48, 14, 54], PECAS_PREMIUM.raminhoDeOliveira(-1))}</g>
      <g transform="translate(68 124)">${pecaPremium('laco', [-11, -5, 22, 16], PECAS_PREMIUM.laco)}</g>
      <g transform="translate(68 10) scale(.5)"><g class="enf-flutua">${pecaPremium('pomba-frente', [-24, -16, 48, 30], PECAS_DAS_FAIXAS.pombaDeFrente)}</g></g>
      ${faisca(20, 40, 2.2, '#fff', 0.5)}${faisca(116, 40, 2.2, '#fff', 1.5)}`;
  },

  rosacea() {
    const brilho = idDoEnfeite('rs-brilho');
    return `<defs><radialGradient id="${brilho}" cx="50%" cy="50%" r="50%"><stop offset=".72" stop-color="#fde68a" stop-opacity="0"/><stop offset=".86" stop-color="#fef3c7" stop-opacity=".35"/><stop offset="1" stop-color="#fde68a" stop-opacity="0"/></radialGradient></defs>
      <circle cx="68" cy="68" r="70" fill="url(#${brilho})" class="enf-respira" style="--d:3s"/>
      ${pecaPremium('rosacea-anel', [0, 0, 136, 136], PECAS_PREMIUM.rosaceaAnel)}
      ${reflexoNoAnel(idDoEnfeite('rsa'), 54.5, 8)}`;
  },
});

Object.assign(PECAS_DAS_FAIXAS, {
  ceuEstreladoFundo: () => {
    const sorteio = sorteioFixo(91);
    let pontos = '';
    for (let i = 0; i < 150; i += 1) {
      const x = sorteio() * 320;
      const nuvem = Math.exp(-Math.pow((x * 0.18 + 10 - sorteio() * 30 - (sorteio() * 80)), 2) / 800);
      pontos += `<circle cx="${n1(x)}" cy="${n1(sorteio() * 80)}" r="${n1(0.2 + sorteio() * 0.45)}" fill="#fff" opacity="${n1(0.3 + sorteio() * 0.6 + nuvem * 0.1)}"/>`;
    }
    return `<defs><linearGradient id="ce1" x1="0" y1="0" x2=".3" y2="1"><stop offset="0" stop-color="#020617"/><stop offset=".6" stop-color="#111a44"/><stop offset="1" stop-color="#2a1f5c"/></linearGradient>
        <linearGradient id="ce2" x1="0" y1="1" x2="1" y2="0"><stop offset="0" stop-color="#c4b5fd" stop-opacity="0"/><stop offset=".5" stop-color="#e0e7ff" stop-opacity=".22"/><stop offset="1" stop-color="#c4b5fd" stop-opacity="0"/></linearGradient></defs>
      <rect width="320" height="80" fill="url(#ce1)"/>
      <path d="M60 80C120 50 200 34 320 0V30C220 52 140 70 100 80Z" fill="url(#ce2)"/>${pontos}`;
  },
  luaCheia: () => `<defs><radialGradient id="lu2" cx="40%" cy="40%" r="70%"><stop offset="0" stop-color="#ffffff"/><stop offset=".7" stop-color="#fef9c3"/><stop offset="1" stop-color="#e2d6a8"/></radialGradient>
      <radialGradient id="lu3"><stop offset="0" stop-color="#fef9c3" stop-opacity=".5"/><stop offset="1" stop-color="#fef9c3" stop-opacity="0"/></radialGradient></defs>
    <circle r="24" fill="url(#lu3)"/><circle r="9" fill="url(#lu2)"/><circle cx="-3" cy="-2" r="1.8" fill="#e5dbb0" opacity=".7"/><circle cx="2.6" cy="2.4" r="1.3" fill="#e5dbb0" opacity=".6"/><circle cx="2" cy="-3.4" r=".9" fill="#e5dbb0" opacity=".6"/>`,
  colinaFundo: () => `<defs><linearGradient id="cc1" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#312e81"/><stop offset=".45" stop-color="#be185d"/><stop offset=".75" stop-color="#f97316"/><stop offset="1" stop-color="#fde68a"/></linearGradient>
      <radialGradient id="cc2" gradientUnits="userSpaceOnUse" cx="250" cy="52" r="140"><stop offset="0" stop-color="#fffbeb" stop-opacity="1"/><stop offset=".12" stop-color="#fde68a" stop-opacity=".85"/><stop offset=".4" stop-color="#fb923c" stop-opacity=".3"/><stop offset="1" stop-color="#fb923c" stop-opacity="0"/></radialGradient>
      <linearGradient id="cc3" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4c1d3d"/><stop offset="1" stop-color="#1c0b1a"/></linearGradient>
      <linearGradient id="cc4" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2a0f24"/><stop offset="1" stop-color="#0f0510"/></linearGradient></defs>
    <rect width="320" height="80" fill="url(#cc1)"/><rect width="320" height="80" fill="url(#cc2)"/>
    <circle cx="250" cy="52" r="13" fill="#fff7d6"/>
    <path d="M0 68C60 60 120 66 180 60C230 55 280 62 320 58V80H0Z" fill="url(#cc3)"/>
    <path d="M150 80C190 64 220 54 250 50C280 54 300 62 320 68V80Z" fill="url(#cc4)"/>`,
  cruzNoMonte: () => `<path d="M-1.6 -26H1.6V-17H8V-14H1.6V2H-1.6V-14H-8V-17H-1.6Z" fill="#0f0510"/><path d="M1.6 -26V2" stroke="#fde68a" stroke-width=".5" opacity=".7"/><path d="M-8 -17H8" stroke="#fde68a" stroke-width=".4" opacity=".6"/>`,
  pombaVoando: () => `<defs><linearGradient id="pv" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#cbd5e1"/></linearGradient></defs>
    <path d="M-7 0C-4 -2.4 4 -2.6 7 -1C9 0 9 1.6 7 2.2C3 3.2 -3 2.8 -7 0Z" fill="url(#pv)"/><circle cx="7" cy="-.6" r="2" fill="url(#pv)"/><path d="M8.8 -.6L11 0L8.8 .4Z" fill="#f59e0b"/><circle cx="7.6" cy="-1" r=".35" fill="#1f2937"/>
    <path d="M-7 0L-12 -2L-11.4 1.2L-12.6 3L-7 1.6Z" fill="url(#pv)"/>`,
  asaPomba: () => `<path d="M0 0C-2 -5 -7 -9 -12 -9C-8 -5 -4 -1 0 0Z" fill="#f8fafc" stroke="#cbd5e1" stroke-width=".35"/><path d="M-1 -1.6C-3.4 -4.6 -7 -6.6 -10 -6.8" fill="none" stroke="#cbd5e1" stroke-width=".3"/>`,
  velasFundo: () => `<defs><radialGradient id="vl1" gradientUnits="userSpaceOnUse" cx="240" cy="50" r="130"><stop offset="0" stop-color="#7c2d12" stop-opacity=".8"/><stop offset=".5" stop-color="#3b1408" stop-opacity=".5"/><stop offset="1" stop-color="#0c0503" stop-opacity="0"/></radialGradient></defs>
    <rect width="320" height="80" fill="#0c0503"/><rect width="320" height="80" fill="url(#vl1)"/>
    <path d="M150 80V74H320V80Z" fill="#2a1408"/><path d="M150 74H320" stroke="#7c4a1c" stroke-width=".6"/>`,
  vela: (alt) => () => `<defs><linearGradient id="vc" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#d6c7a8"/><stop offset=".35" stop-color="#fffaf0"/><stop offset=".7" stop-color="#f3e9d2"/><stop offset="1" stop-color="#bba57c"/></linearGradient></defs>
    <rect x="-3" y="${-alt}" width="6" height="${alt}" fill="url(#vc)"/><path d="M-3 ${-alt}C-3 ${-alt + 3} -1.6 ${-alt + 4} -1.4 ${-alt + 7}C-1.2 ${-alt + 4} 0 ${-alt + 2} 1 ${-alt}" fill="#fffaf0" stroke="#e8dcc0" stroke-width=".3"/>
    <ellipse cx="0" cy="${-alt}" rx="3" ry=".8" fill="#f3e9d2"/><path d="M0 ${-alt}V${-alt - 2}" stroke="#2a1408" stroke-width=".5"/>`,
  catedralFundo: () => `<defs><linearGradient id="ct1" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#020617"/><stop offset=".7" stop-color="#1e1b4b"/><stop offset="1" stop-color="#312e81"/></linearGradient>
      <linearGradient id="ct2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2e2a4f"/><stop offset="1" stop-color="#110f22"/></linearGradient></defs>
    <rect width="320" height="80" fill="url(#ct1)"/>
    <g fill="url(#ct2)">
      <path d="M206 80V30L212 14L218 30V80Z"/><path d="M272 80V30L278 14L284 30V80Z"/>
      <path d="M216 80V40L245 20L274 40V80Z"/>
      <path d="M180 80V52L198 44V80ZM302 80V52L284 44V80Z"/>
    </g>
    <path d="M212 14V8M210 10H214M278 14V8M276 10H280M245 20V12M242.6 14.4H247.4" stroke="#fde68a" stroke-width=".7"/>
    <path d="M236 80V64C236 58 240 55 245 55C250 55 254 58 254 64V80Z" fill="#fbbf24" opacity=".85"/>
    ${[[209, 40], [209, 52], [275, 40], [275, 52], [186, 60], [296, 60], [226, 50], [260, 50]].map(([x, y]) => `<path d="M${x} ${y + 6}V${y + 2}C${x} ${y} ${x + 3} ${y} ${x + 3} ${y + 2}V${y + 6}Z" fill="#fcd34d" opacity=".8"/>`).join('')}`,
  galileiaFundo: () => `<defs><linearGradient id="ga1" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1e3a8a"/><stop offset=".45" stop-color="#c2410c"/><stop offset=".7" stop-color="#fb923c"/><stop offset="1" stop-color="#fde68a"/></linearGradient>
      <radialGradient id="ga2" gradientUnits="userSpaceOnUse" cx="262" cy="50" r="120"><stop offset="0" stop-color="#fffbeb" stop-opacity="1"/><stop offset=".15" stop-color="#fde68a" stop-opacity=".7"/><stop offset="1" stop-color="#fb923c" stop-opacity="0"/></radialGradient>
      <linearGradient id="ga3" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#c2410c"/><stop offset=".3" stop-color="#155e75"/><stop offset="1" stop-color="#082f49"/></linearGradient></defs>
    <rect width="320" height="80" fill="url(#ga1)"/><rect width="320" height="80" fill="url(#ga2)"/>
    <circle cx="262" cy="52" r="11" fill="#fff7d6"/>
    <path d="M0 52C40 44 90 48 130 42C170 38 210 46 250 44C280 42 300 46 320 44V56H0Z" fill="#4a1d3a" opacity=".85"/>
    <rect y="54" width="320" height="26" fill="url(#ga3)"/>
    <path d="M250 58H274M244 62H280M252 66H272M246 70H278" stroke="#fde68a" stroke-width=".9" opacity=".7"/>`,
  barco: () => `<defs><linearGradient id="bv" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fef3c7"/><stop offset="1" stop-color="#d6c08e"/></linearGradient></defs>
    <path d="M-14 0H14L10 5H-10Z" fill="#3b1f0a"/><path d="M0 0V-22" stroke="#3b1f0a" stroke-width=".8"/><path d="M.6 -21L12 -2H.6Z" fill="url(#bv)"/><path d="M-.6 -16L-8 -2H-.6Z" fill="url(#bv)" opacity=".9"/>
    ${[-6, -2, 2].map((x) => `<circle cx="${x}" cy="-1.6" r="1.2" fill="#1c0b05"/>`).join('')}`,
  camposDeLirios: () => {
    const sorteio = sorteioFixo(33);
    let l = '';
    for (let i = 0; i < 18; i += 1) {
      const x = 130 + i * 11 + sorteio() * 4;
      const y = 58 + sorteio() * 14;
      const e = 0.7 + sorteio() * 0.5;
      l += `<g transform="translate(${n1(x)} ${n1(y)}) scale(${n1(e)})"><path d="M0 0V18" stroke="#3f6212" stroke-width=".9"/><path d="M0 10C-4 7 -7 8 -8 10C-5 11 -2 11 0 10Z" fill="#4d7c0f"/>${[-50, -18, 18, 50, 0].map((a) => `<path d="M0 0C-1.6 -3 -1.8 -6.4 0 -9C1.8 -6.4 1.6 -3 0 0Z" transform="rotate(${a})" fill="#ffffff" stroke="#cbd5e1" stroke-width=".3"/>`).join('')}<circle cx="0" cy="-5" r=".8" fill="#ea580c"/></g>`;
    }
    return l;
  },
  rosaCaindo: () => '<path d="M0 -3C2.4 -3 3.4 0 0 3.4C-3.4 0 -2.4 -3 0 -3Z" fill="#fb7185" stroke="#be123c" stroke-width=".3"/><path d="M0 -2.4V2.4" stroke="#fda4af" stroke-width=".3"/>',
  jardimDeRosas: () => {
    const sorteio = sorteioFixo(71);
    let r = '';
    for (let i = 0; i < 16; i += 1) {
      const x = 140 + i * 12 + sorteio() * 6;
      const y = 66 + sorteio() * 10;
      r += `<g transform="translate(${n1(x)} ${n1(y)}) scale(${n1(0.45 + sorteio() * 0.25)})">${PECAS_PREMIUM.rosa('#fecdd3', '#e11d48', '#881337')()}</g>`;
    }
    return `<path d="M120 80C160 66 220 64 320 62V80Z" fill="#166534"/>${r}`;
  },
});

Object.assign(FAIXAS, {
  'ceu-estrelado'() {
    const sorteio = sorteioFixo(13);
    let pisca = '';
    for (let i = 0; i < 18; i += 1) pisca += faisca(sorteio() * 320, sorteio() * 70, 1 + sorteio() * 1.4, '#fff', n1(sorteio() * 3));
    return `${pecaPremium('ceu-estrelado', [0, 0, 320, 80], PECAS_DAS_FAIXAS.ceuEstreladoFundo)}${pisca}
      <g class="enf-cadente" style="--a:-1s"><path d="M300 10L276 18" stroke="#fff" stroke-width="1" stroke-linecap="round" opacity=".9"/></g>
      <g class="enf-cadente" style="--a:-4.5s"><path d="M220 6L200 13" stroke="#fef3c7" stroke-width=".8" stroke-linecap="round"/></g>
      <g transform="translate(288 22)"><g class="enf-respira" style="--d:4s">${pecaPremium('lua-cheia', [-25, -25, 50, 50], PECAS_DAS_FAIXAS.luaCheia)}</g></g>`;
  },

  'cruz-na-colina'() {
    const passaro = (x, y, d, a) => `<g transform="translate(${x} ${y})"><g class="enf-voa" style="--d:${d}s;--a:-${a}s"><path d="M0 0Q2 -2 4 0Q6 -2 8 0" fill="none" stroke="#2a0f24" stroke-width=".9" stroke-linecap="round"/></g></g>`;
    const corte = idDoEnfeite('cc-corte');
    return `<defs><clipPath id="${corte}"><path d="M0 0H320V58C280 62 230 55 180 60C120 66 60 60 0 68Z"/></clipPath></defs>${pecaPremium('colina', [0, 0, 320, 80], PECAS_DAS_FAIXAS.colinaFundo)}
      <g clip-path="url(#${corte})"><g transform="translate(250 52)"><g class="enf-gira-local" style="--d:90s">${pecaPremium('raios-ouro', [-242, -242, 484, 484], PECAS_DAS_FAIXAS.raiosDeOuro)}</g></g></g>
      <path d="M150 80C190 64 220 54 250 50C280 54 300 62 320 68V80Z" fill="#14060f"/>
      ${nuvemFofa(170, 22, 0.7, pecaPremium('nuvem-tarde', [-30, -14, 62, 26], () => nuvemDoDia('nt', '#fde68a', '#f472b6', '#7e1d5b')), 32, 0)}
      <g transform="translate(250 52)">${pecaPremium('cruz-monte', [-9, -27, 18, 30], PECAS_DAS_FAIXAS.cruzNoMonte)}</g>
      ${passaro(340, 24, 18, 0)}${passaro(360, 30, 20, 6)}`;
  },

  'pombas-passando'() {
    const ceu = idDoEnfeite('pp-ceu');
    const corpo = pecaPremium('pomba-voando', [-13, -4, 25, 8], PECAS_DAS_FAIXAS.pombaVoando);
    const asa = pecaPremium('asa-pomba', [-13, -10, 14, 11], PECAS_DAS_FAIXAS.asaPomba);
    const pomba = (x, y, d, a, e) => `<g transform="translate(${x} ${y}) scale(-${e} ${e})"><g class="enf-voa" style="--d:${d}s;--a:-${a}s"><g transform="scale(-1 1)">${corpo}<g transform="translate(-1 -.6)"><g class="enf-bate-asa" style="--a:${n1(a * 0.1)}s">${asa}</g></g></g></g></g>`;
    return `<defs><linearGradient id="${ceu}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3b82f6"/><stop offset=".6" stop-color="#93c5fd"/><stop offset="1" stop-color="#e0f2fe"/></linearGradient></defs>
      <rect width="320" height="80" fill="url(#${ceu})"/>
      ${nuvemFofa(160, 60, 0.9, pecaPremium('nuvem-dia', [-30, -14, 62, 26], () => nuvemDoDia('nd', '#ffffff', '#f1f5f9', '#cbd5e1')), 40, 0)}
      ${nuvemFofa(280, 66, 1, pecaPremium('nuvem-dia', [-30, -14, 62, 26], () => nuvemDoDia('nd', '#ffffff', '#f1f5f9', '#cbd5e1')), 36, 8)}
      ${pomba(-20, 22, 14, 0, 1.1)}${pomba(-40, 34, 16, 4, 0.9)}${pomba(-30, 14, 12, 8, 0.8)}${pomba(-60, 40, 18, 2, 1)}`;
  },

  velas() {
    const luz = idDoEnfeite('vl-luz');
    const fogo = idDoEnfeite('vl-fogo');
    const alturas = [22, 30, 18, 34, 26, 20, 28, 24];
    return `<defs><radialGradient id="${luz}"><stop offset="0" stop-color="#fde68a" stop-opacity=".55"/><stop offset="1" stop-color="#fb923c" stop-opacity="0"/></radialGradient>
        <radialGradient id="${fogo}" cx="50%" cy="70%" r="70%"><stop offset="0" stop-color="#ffffff"/><stop offset=".35" stop-color="#fef08a"/><stop offset=".75" stop-color="#f97316"/><stop offset="1" stop-color="#dc2626" stop-opacity=".2"/></radialGradient></defs>
      ${pecaPremium('velas-fundo', [0, 0, 320, 80], PECAS_DAS_FAIXAS.velasFundo)}
      ${alturas.map((alt, i) => { const x = 170 + i * 19; return `<circle cx="${x}" cy="${74 - alt - 3}" r="13" fill="url(#${luz})" class="enf-respira" style="--d:${n1(1.4 + (i % 3) * 0.3)}s"/>
        <g transform="translate(${x} 74)">${pecaPremium(`vela-${alt}`, [-4, -alt - 3, 8, alt + 3], PECAS_DAS_FAIXAS.vela(alt))}</g>
        <g transform="translate(${x} ${74 - alt - 2})"><g class="enf-chama" style="--d:${n1(0.3 + (i % 4) * 0.06)}s;--a:${n1(i * 0.09)}s"><path d="M0 0C-1.8 -1.6 -1.6 -4 0 -7C1.6 -4 1.8 -1.6 0 0Z" fill="url(#${fogo})"/></g></g>`; }).join('')}`;
  },

  'raios-de-gloria'() {
    const halo = idDoEnfeite('rg-halo');
    return `<defs><radialGradient id="${halo}"><stop offset="0" stop-color="#ffffff" stop-opacity="1"/><stop offset=".35" stop-color="#fef3c7" stop-opacity=".6"/><stop offset="1" stop-color="#fde68a" stop-opacity="0"/></radialGradient></defs>
      ${pecaPremium('ceu-ouro', [0, 0, 320, 80], PECAS_DAS_FAIXAS.ceuDeOuroFundo)}
      <g transform="translate(252 30)"><g class="enf-gira-local" style="--d:60s">${pecaPremium('raios-ouro', [-242, -242, 484, 484], PECAS_DAS_FAIXAS.raiosDeOuro)}</g><g class="enf-gira-local" style="--d:90s;animation-direction:reverse">${pecaPremium('raios-ouro', [-242, -242, 484, 484], PECAS_DAS_FAIXAS.raiosDeOuro)}</g></g>
      <circle cx="252" cy="30" r="26" fill="url(#${halo})" class="enf-respira" style="--d:2.4s"/>
      <g transform="translate(252 30)"><text x="0" y="5" text-anchor="middle" font-family="Georgia, serif" font-size="15" font-weight="700" fill="#a16207" stroke="#fef3c7" stroke-width=".5">IHS</text><path d="M0 -14V-8M-2.4 -11.6H2.4" stroke="#a16207" stroke-width="1.2"/></g>
      ${nuvemFofa(200, 72, 1, pecaPremium('nuvem-ouro', [-30, -14, 62, 26], () => nuvemDoDia('ng', '#fffbeb', '#fde68a', '#d97706')), 30, 0)}${nuvemFofa(300, 74, 1.1, pecaPremium('nuvem-ouro', [-30, -14, 62, 26], () => nuvemDoDia('ng', '#fffbeb', '#fde68a', '#d97706')), 26, 8)}`;
  },

  catedral() {
    const sorteio = sorteioFixo(17);
    let estrelas = '';
    for (let i = 0; i < 34; i += 1) estrelas += `<circle cx="${n1(sorteio() * 320)}" cy="${n1(sorteio() * 46)}" r="${n1(0.3 + sorteio() * 0.6)}" fill="#fff" class="enf-pisca" style="--a:${n1(sorteio() * 3)}s"/>`;
    return `${pecaPremium('catedral-fundo', [0, 0, 320, 80], PECAS_DAS_FAIXAS.catedralFundo)}${estrelas}
      <g transform="translate(245 34)"><g class="enf-respira" style="--d:3s">${pecaPremium('rosacea-pequena', [-12, -12, 24, 24], PECAS_DAS_FAIXAS.rosacea2)}</g></g>
      <g transform="translate(290 16)">${pecaPremium('lua-cheia', [-25, -25, 50, 50], PECAS_DAS_FAIXAS.luaCheia).replace('<image ', '<image transform="scale(.6)" ')}</g>`;
  },

  'mar-da-galileia'() {
    const onda = (y, cor, d, a) => {
      let c = `M0 ${y}`;
      for (let x = 0; x <= 380; x += 16) c += `Q${x + 8} ${y - 1.6} ${x + 16} ${y}`;
      return `<g class="enf-onda" style="--d:${d}s;--a:-${a}s"><path d="${c}" fill="none" stroke="${cor}" stroke-width=".7" opacity=".7"/></g>`;
    };
    const passaro = (x, y, d, a) => `<g transform="translate(${x} ${y})"><g class="enf-voa" style="--d:${d}s;--a:-${a}s"><path d="M0 0Q2 -2 4 0Q6 -2 8 0" fill="none" stroke="#3b0f2a" stroke-width=".9" stroke-linecap="round"/></g></g>`;
    return `${pecaPremium('galileia', [0, 0, 320, 80], PECAS_DAS_FAIXAS.galileiaFundo)}
      ${onda(60, '#fde68a', 7, 0)}${onda(66, '#7dd3fc', 9, 3)}${onda(73, '#38bdf8', 6, 1)}
      <g transform="translate(212 60)"><g class="enf-balanca-suave">${pecaPremium('barco', [-15, -23, 30, 29], PECAS_DAS_FAIXAS.barco)}</g></g>
      ${passaro(340, 22, 16, 0)}${passaro(358, 28, 18, 5)}`;
  },

  'campo-de-lirios'() {
    const borboleta = (x, y, a, i, c1, c2) => `<g transform="translate(${x} ${y})"><g class="enf-borboleta-voa" style="--a:-${a}s"><g class="enf-bate">${pecaPremium(`borboleta-${i}`, [-9, -7, 18, 14], PECAS_DAS_FAIXAS.borboleta(c1, c2))}</g><g transform="scale(-1 1)"><g class="enf-bate">${pecaPremium(`borboleta-${i}`, [-9, -7, 18, 14], PECAS_DAS_FAIXAS.borboleta(c1, c2))}</g></g></g></g>`;
    return `${pecaPremium('eden-fundo', [0, 0, 320, 80], PECAS_DAS_FAIXAS.edenFundo)}
      <circle cx="286" cy="16" r="16" fill="#fef9c3" opacity=".35" class="enf-respira" style="--d:4s"/><circle cx="286" cy="16" r="8.5" fill="#fffbe6"/>
      <g class="enf-balanca-suave">${pecaPremium('campo-lirios', [0, 0, 320, 80], PECAS_DAS_FAIXAS.camposDeLirios)}</g>
      ${borboleta(200, 30, 0, 0, '#f9a8d4', '#a855f7')}${borboleta(262, 36, 2, 1, '#fde047', '#f97316')}`;
  },

  'chuva-de-rosas'() {
    const ceu = idDoEnfeite('cr-ceu');
    const petala = pecaPremium('petala-rosa', [-4, -4, 8, 8], PECAS_DAS_FAIXAS.rosaCaindo);
    const sorteio = sorteioFixo(5);
    let chuva = '';
    for (let i = 0; i < 14; i += 1) chuva += `<g transform="translate(${n1(140 + sorteio() * 180)} ${n1(-4 - sorteio() * 10)})"><g class="enf-cai-longo" style="--d:${n1(6 + sorteio() * 3)}s;--a:-${n1(sorteio() * 8)}s"><g transform="scale(${n1(0.8 + sorteio() * 0.6)})">${petala}</g></g></g>`;
    return `<defs><linearGradient id="${ceu}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#701a75"/><stop offset=".5" stop-color="#db2777"/><stop offset="1" stop-color="#fbcfe8"/></linearGradient>
        <radialGradient id="${ceu}-l"><stop offset="0" stop-color="#fff1f2" stop-opacity=".55"/><stop offset="1" stop-color="#fff1f2" stop-opacity="0"/></radialGradient></defs>
      <rect width="320" height="80" fill="url(#${ceu})"/>
      <circle cx="250" cy="22" r="46" fill="url(#${ceu}-l)" class="enf-respira" style="--d:4s"/>
      ${pecaPremium('jardim-rosas', [100, 40, 220, 40], PECAS_DAS_FAIXAS.jardimDeRosas)}${chuva}`;
  },
});

const DESENHOS_DOS_EFEITOS = {
  sino: () => `<defs><linearGradient id="si" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#7a4e05"/><stop offset=".3" stop-color="#fff3c4"/><stop offset=".55" stop-color="#eebf4a"/><stop offset="1" stop-color="#5c3a04"/></linearGradient></defs>
    <path d="M-2 -16H2V-12H-2Z" fill="url(#si)"/><circle cx="0" cy="-17" r="2.2" fill="none" stroke="url(#si)" stroke-width="1.2"/>
    <path d="M0 -12C-7 -12 -8 -6 -8.6 0C-9 5 -11 7 -13 9H13C11 7 9 5 8.6 0C8 -6 7 -12 0 -12Z" fill="url(#si)" stroke="#5c3a04" stroke-width=".5"/>
    <path d="M-13 9H13V11.4H-13Z" fill="url(#si)" stroke="#5c3a04" stroke-width=".4"/><circle cx="0" cy="13" r="2.2" fill="#8a5a0a"/>
    <path d="M-4.6 -8C-5.6 -3 -6 2 -7.6 6" stroke="#fffbea" stroke-width="1" opacity=".7" fill="none"/>`,
  custodia: () => {
    let r = '';
    for (let i = 0; i < 32; i += 1) r += `<path d="${i % 2 ? 'M-.9 -11L0 -24L.9 -11Z' : 'M-1.4 -11C-.6 -15 -1.8 -18 0 -21C1.8 -18 .6 -15 1.4 -11Z'}" transform="rotate(${i * 11.25})" fill="url(#cu)"/>`;
    return `<defs><linearGradient id="cu" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fffbea"/><stop offset=".45" stop-color="#facc15"/><stop offset="1" stop-color="#a16207"/></linearGradient>
        <radialGradient id="cuh" cx="40%" cy="35%" r="70%"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#f3e7c9"/></radialGradient></defs>
      ${r}<circle r="11" fill="none" stroke="url(#cu)" stroke-width="2.2"/><circle r="8.6" fill="url(#cuh)"/><path d="M0 -5V5M-3.6 -1.6H3.6" stroke="#d4a017" stroke-width="1"/>
      <path d="M-1.4 12H1.4V28H-1.4Z" fill="url(#cu)"/><circle cx="0" cy="20" r="2.4" fill="url(#cu)"/><path d="M-9 34C-9 30 -4 28 0 28C4 28 9 30 9 34Z" fill="url(#cu)" stroke="#a16207" stroke-width=".4"/>
      <path d="M0 -24V-30M-2.6 -27.4H2.6" stroke="url(#cu)" stroke-width="1.2"/>`;
  },
  coracaoBrilhante: (c1, c2, c3) => () => `<defs><radialGradient id="ch2" cx="35%" cy="30%" r="80%"><stop offset="0" stop-color="${c1}"/><stop offset=".5" stop-color="${c2}"/><stop offset="1" stop-color="${c3}"/></radialGradient></defs>
    <path d="M0 9C-12 1 -11 -8 -5 -8C-2.6 -8 -.8 -6.6 0 -5C.8 -6.6 2.6 -8 5 -8C11 -8 12 1 0 9Z" fill="url(#ch2)" stroke="${c3}" stroke-width=".4"/>
    <ellipse cx="-5" cy="-4" rx="2.4" ry="1.4" transform="rotate(-30 -5 -4)" fill="#fff" opacity=".85"/>`,
};

function spriteDeFumaca() {
  const tela = document.createElement('canvas');
  tela.width = 96;
  tela.height = 96;
  const c = tela.getContext('2d');
  if (!c) return tela;
  for (let i = 0; i < 7; i += 1) {
    const x = 30 + Math.random() * 36;
    const y = 30 + Math.random() * 36;
    const r = 18 + Math.random() * 14;
    const g = c.createRadialGradient(x, y, 0, x, y, r);
    g.addColorStop(0, 'rgba(241, 245, 249, 0.32)');
    g.addColorStop(1, 'rgba(241, 245, 249, 0)');
    c.fillStyle = g;
    c.fillRect(0, 0, 96, 96);
  }
  return tela;
}

function efeitoEstrelasCadentes(w, h, foco) {
  const { cx, cy, R } = focoDoEfeito(w, h, foco);
  const luz = spritePremium('luz-branca', () => spriteDeBrasa('255, 255, 255'));
  const ouro = spritePremium('luz-dourada', () => spriteDeBrasa('253, 230, 138'));
  const ang = Math.PI * 0.78;
  const meteoros = Array.from({ length: 14 }, (_, i) => {
    const lado = i % 2 ? 1 : -1;
    return { x: cx + lado * (R * 1.2 + Math.random() * w * 0.45) + R * 3, y: -R + Math.random() * (cy + R * 1.5), v: R * (9 + Math.random() * 6), nasce: Math.random() * 2.2, vida: 0.7 + Math.random() * 0.4, cauda: R * (2 + Math.random() * 2), ouro: Math.random() < 0.6, r: R * (0.08 + Math.random() * 0.06) };
  });
  const dx = Math.cos(ang);
  const dy = Math.sin(ang);
  return (ctx, s) => {
    const base = ctx.globalAlpha;
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    meteoros.forEach((m) => {
      const t = s - m.nasce;
      if (t <= 0 || t > m.vida) return;
      const q = t / m.vida;
      const x = m.x + dx * m.v * t;
      const y = m.y + dy * m.v * t;
      const alfa = Math.sin(q * Math.PI);
      const g = ctx.createLinearGradient(x, y, x - dx * m.cauda, y - dy * m.cauda);
      g.addColorStop(0, m.ouro ? `rgba(253, 230, 138, ${alfa})` : `rgba(255, 255, 255, ${alfa})`);
      g.addColorStop(1, 'rgba(253, 230, 138, 0)');
      ctx.strokeStyle = g;
      ctx.lineWidth = m.r * 1.6;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x - dx * m.cauda, y - dy * m.cauda);
      ctx.stroke();
      ctx.globalAlpha = base * alfa;
      ctx.drawImage(m.ouro ? ouro : luz, x - m.r * 5, y - m.r * 5, m.r * 10, m.r * 10);
      ctx.globalAlpha = base;
    });
    ctx.restore();
  };
}
efeitoEstrelasCadentes.usaMargem = true;

function efeitoPombas(w, h, foco) {
  const { cx, cy, R } = focoDoEfeito(w, h, foco);
  const corpo = spritePremium('pomba-voando', () => bitmapDoSvg(PECAS_DAS_FAIXAS.pombaVoando(), '-13 -4 25 8', 200, 64));
  const asa = spritePremium('asa-pomba', () => bitmapDoSvg(PECAS_DAS_FAIXAS.asaPomba(), '-13 -10 14 11', 112, 88));
  const pena = spritesDoArcanjo();
  const pombas = Array.from({ length: 6 }, (_, i) => {
    const lado = i % 2 ? 1 : -1;
    const a = -Math.PI / 2 + lado * (0.35 + (i >> 1) * 0.35);
    return { a, lado, v: R * (3.4 + Math.random() * 1.6), sobe: R * (0.6 + Math.random() * 0.8), atraso: i * 0.12, tam: R * (0.55 + Math.random() * 0.2), fase: Math.random() * 6.28 };
  });
  return (ctx, s) => {
    const base = ctx.globalAlpha;
    pombas.forEach((p) => {
      const t = s - p.atraso;
      if (t <= 0) return;
      const corre = (1 - Math.exp(-t * 0.9)) / 0.9;
      const x = cx + Math.cos(p.a) * (R * 0.6 + p.v * corre);
      const y = cy + Math.sin(p.a) * (R * 0.6 + p.v * corre) - p.sobe * t * 0.3;
      const alfa = Math.min(1, t * 4) * Math.max(0, 1 - Math.max(0, t - 2.6) / 0.9);
      if (alfa <= 0 || !imagemPronta(corpo) || !imagemPronta(asa)) return;
      const bate = Math.sin(s * 16 + p.fase);
      ctx.save();
      ctx.globalAlpha = base * alfa;
      ctx.translate(x, y);
      ctx.scale(p.lado < 0 ? -1 : 1, 1);
      ctx.rotate(-0.25);
      const e = p.tam / 12;
      ctx.drawImage(corpo, -13 * e, -4 * e, 25 * e, 8 * e);
      ctx.save();
      ctx.translate(-1 * e, -0.6 * e);
      ctx.rotate(0.3 * bate);
      ctx.scale(1, 0.4 + 0.6 * Math.abs(bate));
      ctx.drawImage(asa, -13 * e, -10 * e, 14 * e, 11 * e);
      ctx.restore();
      ctx.restore();
      if (imagemPronta(pena.pena) && Math.sin(t * 3 + p.fase) > 0.96) desenharFaisca(ctx, x, y + p.tam * 0.4, p.tam * 0.18, '#ffffff', 0.8);
    });
    ctx.globalAlpha = base;
  };
}
efeitoPombas.usaMargem = true;

function efeitoVitral(w, h, foco) {
  const { cx, cy, R } = focoDoEfeito(w, h, foco);
  const cores = ['239, 68, 68', '59, 130, 246', '234, 179, 8', '34, 197, 94', '168, 85, 247', '6, 182, 212'];
  const cacos = Array.from({ length: 30 }, (_, i) => ({ x: Math.random() * w, y: Math.random() * (cy + R * 3), r: R * (0.06 + Math.random() * 0.08), cor: cores[i % cores.length], fase: Math.random() * 6.28, nasce: 0.4 + Math.random() * 1.8 }));
  return (ctx, s) => {
    const base = ctx.globalAlpha;
    const abre = suave(s / 0.9) * (1 - suave((s - 2.8) / 1));
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    const origem = [cx + Math.sin(s * 0.6) * R * 0.4, -R * 0.8];
    cores.forEach((cor, i) => {
      const a = Math.PI / 2 + (i - 2.5) * 0.15 + Math.sin(s * 0.8 + i) * 0.03;
      const L = (cy + R * 3) * abre;
      const g = ctx.createLinearGradient(origem[0], origem[1], origem[0] + Math.cos(a) * L, origem[1] + Math.sin(a) * L);
      g.addColorStop(0, `rgba(${cor}, ${0.32 * abre})`);
      g.addColorStop(1, `rgba(${cor}, 0)`);
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.moveTo(origem[0], origem[1]);
      ctx.lineTo(origem[0] + Math.cos(a - 0.07) * L, origem[1] + Math.sin(a - 0.07) * L);
      ctx.lineTo(origem[0] + Math.cos(a + 0.07) * L, origem[1] + Math.sin(a + 0.07) * L);
      ctx.closePath();
      ctx.fill();
    });
    ctx.restore();
    cacos.forEach((c) => {
      const t = s - c.nasce;
      if (t <= 0) return;
      const pisca = Math.max(0, Math.sin(t * 4 + c.fase));
      if (pisca <= 0) return;
      ctx.save();
      ctx.globalAlpha = base * pisca * Math.max(0, 1 - t / 2.4);
      ctx.translate(c.x, c.y + t * 10);
      ctx.rotate(c.fase + t);
      ctx.fillStyle = `rgba(${c.cor}, 0.9)`;
      ctx.beginPath();
      ctx.moveTo(0, -c.r);
      ctx.lineTo(c.r * 0.8, c.r * 0.4);
      ctx.lineTo(-c.r * 0.7, c.r * 0.6);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    });
    ctx.globalAlpha = base;
  };
}
efeitoVitral.usaMargem = true;

function efeitoPetalas(w, h, foco) {
  const { cy, R } = focoDoEfeito(w, h, foco);
  const petala = spritePremium('petala-rosa', () => bitmapDoSvg(PECAS_DAS_FAIXAS.rosaCaindo(), '-4 -4 8 8', 48, 48));
  const clara = spritePremium('petala-clara', () => bitmapDoSvg(PECAS_DAS_FAIXAS.rosaCaindo().replace('#fb7185', '#fbcfe8').replace('#be123c', '#db2777'), '-4 -4 8 8', 48, 48));
  const petalas = Array.from({ length: 40 }, (_, i) => ({ x: Math.random() * w, y: -20 - Math.random() * (cy + R * 2), v: 40 + Math.random() * 50, r: R * (0.14 + Math.random() * 0.12), giro: Math.random() * 6.28, vg: (Math.random() - 0.5) * 3, fase: Math.random() * 6.28, clara: i % 3 === 0 }));
  return (ctx, s) => {
    const base = ctx.globalAlpha;
    petalas.forEach((p) => {
      const y = p.y + p.v * s * 1.5;
      if (y < -p.r * 2 || y > h + p.r) return;
      const x = p.x + Math.sin(s * 1.6 + p.fase) * 18;
      const img = p.clara ? clara : petala;
      if (!imagemPronta(img)) return;
      ctx.save();
      ctx.globalAlpha = base * Math.min(1, s * 2);
      ctx.translate(x, y);
      ctx.rotate(p.giro + p.vg * s);
      ctx.scale(0.3 + 0.7 * Math.abs(Math.cos(s * 3 + p.fase)), 1);
      ctx.drawImage(img, -p.r, -p.r, p.r * 2, p.r * 2);
      ctx.restore();
    });
    ctx.globalAlpha = base;
  };
}
efeitoPetalas.usaMargem = true;

function efeitoSinos(w, h, foco) {
  const { cx, cy, R } = focoDoEfeito(w, h, foco);
  const sino = spritePremium('sino', () => bitmapDoSvg(DESENHOS_DOS_EFEITOS.sino(), '-14 -20 28 36', 140, 180));
  const notas = Object.keys(NOTAS_DE_OURO).map((k) => spritePremium(`nota-${k}`, () => bitmapDoSvg('<defs><linearGradient id="no" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fffbe6"/><stop offset=".45" stop-color="#facc15"/><stop offset="1" stop-color="#a16207"/></linearGradient></defs>' + NOTAS_DE_OURO[k], '-8 -14 18 20', 72, 80)));
  const tam = R * 1.1;
  const lados = [[-1, cx - R * 1.9], [1, cx + R * 1.9]];
  const ondas = [0.3, 0.9, 1.5, 2.1];
  const voando = Array.from({ length: 10 }, (_, i) => ({ lado: i % 2 ? 1 : -1, nasce: 0.4 + i * 0.22, dx: (Math.random() - 0.5) * R, tipo: i % 3 }));
  return (ctx, s) => {
    const base = ctx.globalAlpha;
    const entra = saidaComVolta(Math.min(1, s / 0.6));
    lados.forEach(([lado, x]) => {
      const y = cy - R * 0.2;
      ctx.save();
      ctx.globalCompositeOperation = 'lighter';
      ondas.forEach((o) => {
        const t = s - o;
        if (t <= 0 || t > 1) return;
        ctx.strokeStyle = `rgba(253, 230, 138, ${0.6 * (1 - t)})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(x, y + tam * 0.35, tam * (0.4 + t * 1.1), 0, Math.PI * 2);
        ctx.stroke();
      });
      ctx.restore();
      if (!imagemPronta(sino)) return;
      ctx.save();
      ctx.globalAlpha = base * Math.min(1, s * 3);
      ctx.translate(x, y - tam * 0.55);
      ctx.rotate(Math.sin(s * 7 + (lado > 0 ? Math.PI : 0)) * 0.35 * Math.max(0.2, 1 - s / 4));
      ctx.scale(entra, entra);
      ctx.drawImage(sino, -tam * 0.5, 0, tam, tam * (36 / 28));
      ctx.restore();
    });
    voando.forEach((n) => {
      const t = s - n.nasce;
      if (t <= 0 || t > 1.8) return;
      const x = (n.lado < 0 ? cx - R * 1.9 : cx + R * 1.9) + n.dx + Math.sin(t * 3) * 10;
      const y = cy - R * 0.4 - t * R * 1.6;
      const img = notas[n.tipo];
      if (!imagemPronta(img)) return;
      ctx.globalAlpha = base * Math.max(0, 1 - t / 1.8);
      ctx.drawImage(img, x - R * 0.2, y - R * 0.25, R * 0.4, R * 0.45);
    });
    ctx.globalAlpha = base;
  };
}
efeitoSinos.usaMargem = true;

function efeitoLinguasDeFogo(w, h, foco) {
  const { cx, cy, R } = focoDoEfeito(w, h, foco);
  const chama = spritePremium('lingua-fogo', () => bitmapDoSvg(PECAS_PREMIUM.linguaDeFogo(), '-5 -16 10 17', 60, 102));
  const pomba = spritePremium('pomba-frente', () => bitmapDoSvg(PECAS_DAS_FAIXAS.pombaDeFrente(), '-24 -16 48 30', 240, 150));
  const brilho = spritePremium('luz-fogo', () => spriteDeBrasa('251, 146, 60'));
  const ouro = spritePremium('luz-dourada', () => spriteDeBrasa('253, 230, 138'));
  const chamas = Array.from({ length: 9 }, (_, i) => {
    const a = -Math.PI / 2 + (i - 4) * 0.42;
    return { de: [cx + (i - 4) * R * 0.25, -R * 0.5], ate: [cx + Math.cos(a) * R * 1.55, cy + Math.sin(a) * R * 1.55], nasce: 0.35 + Math.abs(i - 4) * 0.08, fase: Math.random() * 6.28 };
  });
  return (ctx, s) => {
    const base = ctx.globalAlpha;
    const pombaY = Math.min(cy - R * 2.1, -R * 0.2 + R * 1.2 * suave(s / 0.6));
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    ctx.globalAlpha = base * 0.7 * suave(s / 0.6);
    ctx.drawImage(ouro, cx - R * 1.6, pombaY - R * 1.6, R * 3.2, R * 3.2);
    ctx.restore();
    if (imagemPronta(pomba)) {
      ctx.save();
      ctx.globalAlpha = base * suave(s / 0.5);
      ctx.drawImage(pomba, cx - R * 0.8, pombaY - R * 0.5, R * 1.6, R * 1.0);
      ctx.restore();
    }
    chamas.forEach((c) => {
      const t = s - c.nasce;
      if (t <= 0) return;
      const q = suave(t / 0.8);
      const x = c.de[0] + (c.ate[0] - c.de[0]) * q;
      const y = c.de[1] + (c.ate[1] - c.de[1]) * q + Math.sin(t * 4 + c.fase) * 2;
      const tam = R * 0.42 * (1 + 0.08 * Math.sin(t * 20 + c.fase));
      ctx.save();
      ctx.globalCompositeOperation = 'lighter';
      ctx.globalAlpha = base * 0.6;
      ctx.drawImage(brilho, x - tam, y - tam * 1.6, tam * 2, tam * 2.4);
      ctx.restore();
      if (!imagemPronta(chama)) return;
      ctx.save();
      ctx.globalAlpha = base;
      ctx.translate(x, y);
      ctx.scale(1 + 0.08 * Math.sin(t * 18 + c.fase), 1 + 0.1 * Math.cos(t * 15 + c.fase));
      ctx.drawImage(chama, -tam * 0.3, -tam, tam * 0.6, tam * 1.02);
      ctx.restore();
    });
    ctx.globalAlpha = base;
  };
}
efeitoLinguasDeFogo.usaMargem = true;

function efeitoIncenso(w, h, foco) {
  const { cx, cy, R } = focoDoEfeito(w, h, foco);
  const fumaca = spritePremium('fumaca', spriteDeFumaca);
  const ouro = spritePremium('luz-dourada', () => spriteDeBrasa('253, 230, 138'));
  const nuvens = Array.from({ length: 34 }, (_, i) => {
    const lado = i % 2 ? 1 : -1;
    return { x0: cx + lado * (R * 1.2 + Math.random() * R * 0.8), y0: cy + R * (1.4 + Math.random() * 0.6), nasce: Math.random() * 2.4, v: R * (0.9 + Math.random() * 0.6), r0: R * (0.3 + Math.random() * 0.2), giro: Math.random() * 6.28, lado, fase: Math.random() * 6.28 };
  });
  return (ctx, s) => {
    const base = ctx.globalAlpha;
    nuvens.forEach((n) => {
      const t = s - n.nasce;
      if (t <= 0 || t > 2.2) return;
      const y = n.y0 - n.v * t;
      const x = n.x0 + Math.sin(t * 1.8 + n.fase) * R * 0.35 * t + n.lado * t * R * 0.15;
      const r = n.r0 * (1 + t * 1.2);
      ctx.save();
      ctx.globalAlpha = base * Math.min(1, t * 2) * Math.max(0, 1 - t / 2.2) * 0.9;
      ctx.translate(x, y);
      ctx.rotate(n.giro + t * 0.5);
      ctx.drawImage(fumaca, -r, -r, r * 2, r * 2);
      ctx.restore();
    });
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    [-1, 1].forEach((lado) => {
      ctx.globalAlpha = base * (0.5 + 0.2 * Math.sin(s * 6 + lado));
      ctx.drawImage(ouro, cx + lado * R * 1.6 - R * 0.35, cy + R * 1.6 - R * 0.35, R * 0.7, R * 0.7);
    });
    ctx.restore();
    ctx.globalAlpha = base;
  };
}
efeitoIncenso.usaMargem = true;

function efeitoCustodia(w, h, foco) {
  const { cx, cy, R } = focoDoEfeito(w, h, foco);
  const custodia = spritePremium('custodia', () => bitmapDoSvg(DESENHOS_DOS_EFEITOS.custodia(), '-26 -32 52 68', 260, 340));
  const branco = spritePremium('luz-branca', () => spriteDeBrasa('255, 255, 255'));
  const ouro = spritePremium('luz-dourada', () => spriteDeBrasa('253, 230, 138'));
  const tam = R * 1.5;
  const motas = Array.from({ length: 30 }, () => ({ a: Math.random() * Math.PI * 2, d: R * (1 + Math.random() * 2.6), fase: Math.random() * 6.28, nasce: 0.6 + Math.random() * 1.6 }));
  return (ctx, s) => {
    const base = ctx.globalAlpha;
    const surge = suave(s / 0.9);
    const x = cx + R * 2.05;
    const y = cy - R * 1.2;
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    ctx.globalAlpha = base * 0.8 * surge;
    ctx.drawImage(ouro, x - tam * 1.4, y - tam * 1.2, tam * 2.8, tam * 2.8);
    const q = Math.min(1, Math.max(0, (s - 0.5) / 0.7));
    if (q > 0 && q < 1) {
      ctx.globalAlpha = base * (1 - q);
      ctx.drawImage(branco, x - tam * 1.6 * q, y - tam * 1.6 * q + tam * 0.1, tam * 3.2 * q, tam * 3.2 * q);
    }
    ctx.restore();
    if (imagemPronta(custodia)) {
      ctx.save();
      ctx.globalAlpha = base * surge;
      ctx.translate(x, y);
      ctx.scale(0.7 + 0.3 * surge, 0.7 + 0.3 * surge);
      ctx.drawImage(custodia, -tam * 0.5, -tam * 0.61, tam, tam * (68 / 52));
      ctx.restore();
    }
    motas.forEach((m) => {
      const t = s - m.nasce;
      if (t <= 0) return;
      const pisca = Math.max(0, Math.sin(t * 3 + m.fase));
      desenharFaisca(ctx, x + Math.cos(m.a) * m.d * 0.6, y + Math.sin(m.a) * m.d * 0.6 - t * 8, R * 0.08 + 1.5, '#fde68a', pisca * Math.max(0, 1 - t / 2.2));
    });
    ctx.globalAlpha = base;
  };
}
efeitoCustodia.usaMargem = true;

function efeitoEstrelaDeBelem(w, h, foco) {
  const { cx, cy, R } = focoDoEfeito(w, h, foco);
  const estrela = spritePremium('estrela-guia', () => bitmapDoSvg(PECAS_PREMIUM.estrelaGuiaBrilho(), '-13 -13 26 26', 156, 156));
  const ouro = spritePremium('luz-dourada', () => spriteDeBrasa('253, 230, 138'));
  const fim = [cx, cy - R * 2.1];
  const de = [-R, cy - R * 3.2];
  const rastro = Array.from({ length: 40 }, () => ({ q: Math.random(), dx: (Math.random() - 0.5) * 16, dy: (Math.random() - 0.5) * 16, r: 1 + Math.random() * 2 }));
  const ponto = (q) => [de[0] + (fim[0] - de[0]) * q, de[1] + (fim[1] - de[1]) * q - Math.sin(q * Math.PI) * R * 0.6];
  return (ctx, s) => {
    const base = ctx.globalAlpha;
    const q = suave(s / 1.4);
    const [x, y] = ponto(q);
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    rastro.forEach((p) => {
      if (p.q > q) return;
      const [rx, ry] = ponto(p.q);
      const idade = (q - p.q) * 3;
      const alfa = Math.max(0, 1 - idade);
      if (alfa <= 0) return;
      ctx.globalAlpha = base * alfa;
      ctx.drawImage(ouro, rx + p.dx - p.r * 2, ry + p.dy + idade * 10 - p.r * 2, p.r * 4, p.r * 4);
    });
    if (q >= 1) {
      const t = s - 1.4;
      const feixe = Math.min(1, t / 0.6);
      const g = ctx.createLinearGradient(0, y, 0, cy + R);
      g.addColorStop(0, `rgba(254, 249, 195, ${0.5 * feixe})`);
      g.addColorStop(1, 'rgba(254, 249, 195, 0)');
      ctx.fillStyle = g;
      ctx.globalAlpha = base;
      ctx.beginPath();
      ctx.moveTo(x - R * 0.12, y);
      ctx.lineTo(x + R * 0.12, y);
      ctx.lineTo(x + R * 1.1, cy + R);
      ctx.lineTo(x - R * 1.1, cy + R);
      ctx.closePath();
      ctx.fill();
    }
    ctx.globalAlpha = base * 0.85;
    ctx.drawImage(ouro, x - R * 1.1, y - R * 1.1, R * 2.2, R * 2.2);
    ctx.restore();
    if (imagemPronta(estrela)) {
      ctx.save();
      ctx.globalAlpha = base;
      ctx.translate(x, y);
      ctx.rotate(s * 0.6);
      ctx.drawImage(estrela, -R * 0.65, -R * 0.65, R * 1.3, R * 1.3);
      ctx.restore();
    }
    ctx.globalAlpha = base;
  };
}
efeitoEstrelaDeBelem.usaMargem = true;

function efeitoPenasDeAnjo(w, h, foco) {
  const { cy, R } = focoDoEfeito(w, h, foco);
  const sprites = spritesDoArcanjo();
  const penas = Array.from({ length: 26 }, (_, i) => ({ x: Math.random() * w, y: -20 - Math.random() * (cy + R * 2), v: 30 + Math.random() * 40, tam: R * (0.35 + Math.random() * 0.35), giro: Math.random() * 6.28, vg: (Math.random() - 0.5) * 2, fase: Math.random() * 6.28, ouro: i % 4 === 0 }));
  return (ctx, s) => {
    const base = ctx.globalAlpha;
    penas.forEach((p) => {
      const img = p.ouro ? sprites.penaDeOuro : sprites.pena;
      const y = p.y + p.v * s * 1.6;
      if (!imagemPronta(img) || y > h + p.tam || y < -p.tam * 2) return;
      const x = p.x + Math.sin(s * 1.4 + p.fase) * 22;
      ctx.save();
      ctx.globalAlpha = base * Math.min(1, s * 2);
      ctx.translate(x, y);
      ctx.rotate(p.giro + p.vg * s + Math.sin(s * 2 + p.fase) * 0.5);
      ctx.scale(0.3 + 0.7 * Math.abs(Math.cos(s * 2.6 + p.fase)), 1);
      ctx.drawImage(img, -p.tam, -p.tam * 0.28, p.tam * 1.1, p.tam * 0.61);
      ctx.restore();
    });
    ctx.globalAlpha = base;
  };
}
efeitoPenasDeAnjo.usaMargem = true;

function efeitoArcoIris(w, h, foco) {
  const { cx, cy, R } = focoDoEfeito(w, h, foco);
  const nuvem = spritePremium('nuvem-fofinha', () => bitmapDoSvg(PECAS_PREMIUM.nuvemFofinha(), '-18 -12 36 22', 180, 110));
  const cores = ['239, 68, 68', '249, 115, 22', '250, 204, 21', '34, 197, 94', '59, 130, 246', '99, 102, 241', '168, 85, 247'];
  const raio = Math.min(R * 2.6, w * 0.45);
  const base0 = cy + R * 0.9;
  return (ctx, s) => {
    const base = ctx.globalAlpha;
    const q = suave(s / 1.1);
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    cores.forEach((cor, i) => {
      ctx.strokeStyle = `rgba(${cor}, 0.55)`;
      ctx.lineWidth = R * 0.13;
      ctx.beginPath();
      ctx.arc(cx, base0, raio - i * R * 0.13, Math.PI, Math.PI + Math.PI * q);
      ctx.stroke();
    });
    ctx.restore();
    if (imagemPronta(nuvem)) {
      [[cx - raio + R * 0.4, 0], [cx + raio - R * 0.4, 0.5]].forEach(([x, atraso]) => {
        const e = saidaComVolta(Math.min(1, Math.max(0, (s - atraso) / 0.6)));
        if (e <= 0) return;
        ctx.save();
        ctx.globalAlpha = base;
        ctx.translate(x, base0 + Math.sin(s * 2 + atraso) * 3);
        ctx.scale(e, e);
        ctx.drawImage(nuvem, -R * 0.9, -R * 0.55, R * 1.8, R * 1.1);
        ctx.restore();
      });
    }
    for (let i = 0; i < 8; i += 1) {
      const a = Math.PI + (i / 7) * Math.PI;
      const pisca = Math.max(0, Math.sin(s * 4 + i));
      if (q > i / 8) desenharFaisca(ctx, cx + Math.cos(a) * (raio + R * 0.3), base0 + Math.sin(a) * (raio + R * 0.3), R * 0.1 + 2, '#ffffff', pisca);
    }
    ctx.globalAlpha = base;
  };
}
efeitoArcoIris.usaMargem = true;

function efeitoCoracoes(w, h, foco) {
  const { cx, cy, R } = focoDoEfeito(w, h, foco);
  const tipos = [['#fecdd3', '#f43f5e', '#9f1239'], ['#fbcfe8', '#ec4899', '#9d174d'], ['#fef3c7', '#facc15', '#a16207'], ['#fee2e2', '#ef4444', '#7f1d1d']];
  const sprites = tipos.map((c, i) => spritePremium(`coracao-${i}`, () => bitmapDoSvg(DESENHOS_DOS_EFEITOS.coracaoBrilhante(...c)(), '-12 -9 24 19', 96, 76)));
  const coracoes = Array.from({ length: 22 }, (_, i) => {
    const lado = i % 2 ? 1 : -1;
    return { x: cx + lado * (R * 1.1 + Math.random() * Math.max(10, w / 2 - R * 1.1)), y: cy + R * (1.2 + Math.random() * 2.6), v: 50 + Math.random() * 50, tam: R * (0.28 + Math.random() * 0.22), tipo: i % 4, fase: Math.random() * 6.28, nasce: Math.random() * 1.4 };
  });
  return (ctx, s) => {
    const base = ctx.globalAlpha;
    coracoes.forEach((c) => {
      const t = s - c.nasce;
      if (t <= 0) return;
      const img = sprites[c.tipo];
      const x = c.x + Math.sin(t * 2.4 + c.fase) * 12;
      const y = c.y - c.v * t;
      const alfa = Math.min(1, t * 3) * Math.max(0, 1 - t / 2.4);
      if (alfa <= 0 || !imagemPronta(img)) return;
      const pulsa = 1 + 0.12 * Math.sin(t * 9 + c.fase);
      ctx.save();
      ctx.globalAlpha = base * alfa;
      ctx.translate(x, y);
      ctx.rotate(Math.sin(t * 2 + c.fase) * 0.25);
      ctx.scale(pulsa, pulsa);
      ctx.drawImage(img, -c.tam, -c.tam * 0.79, c.tam * 2, c.tam * 1.58);
      ctx.restore();
      if (t > 2) desenharFaisca(ctx, x, y, c.tam * 0.6, '#fff1f2', (2.4 - t) / 0.4);
    });
    ctx.globalAlpha = base;
  };
}
efeitoCoracoes.usaMargem = true;

function efeitoLuzDoCeu(w, h, foco) {
  const { cx, cy, R } = focoDoEfeito(w, h, foco);
  const branco = spritePremium('luz-branca', () => spriteDeBrasa('255, 255, 255'));
  const motas = Array.from({ length: 40 }, () => ({ x: cx + (Math.random() - 0.5) * R * 4, y: Math.random() * (cy + R * 1.5), fase: Math.random() * 6.28, r: 1 + Math.random() * 2, v: 6 + Math.random() * 12 }));
  return (ctx, s) => {
    const base = ctx.globalAlpha;
    const abre = suave(s / 0.9) * (1 - suave((s - 2.8) / 1));
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    [[-0.9, 0.5], [0, 0.85], [0.9, 0.5], [-0.4, 0.35], [0.45, 0.35]].forEach(([dx, forca], i) => {
      const x0 = cx + dx * R * 0.8 + Math.sin(s * 0.7 + i) * R * 0.08;
      const g = ctx.createLinearGradient(0, -R, 0, cy + R * 1.6);
      g.addColorStop(0, `rgba(255, 251, 235, ${0.42 * forca * abre})`);
      g.addColorStop(1, 'rgba(255, 251, 235, 0)');
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.moveTo(x0 - R * 0.12, -R);
      ctx.lineTo(x0 + R * 0.12, -R);
      ctx.lineTo(x0 + R * 0.45 + dx * R * 0.6, cy + R * 1.6);
      ctx.lineTo(x0 - R * 0.45 + dx * R * 0.6, cy + R * 1.6);
      ctx.closePath();
      ctx.fill();
    });
    ctx.globalAlpha = base * 0.5 * abre;
    ctx.drawImage(branco, cx - R * 2, -R * 1.6, R * 4, R * 2.6);
    motas.forEach((m) => {
      const pisca = 0.5 + 0.5 * Math.sin(s * 3 + m.fase);
      ctx.globalAlpha = base * abre * pisca * 0.8;
      ctx.drawImage(branco, m.x - m.r * 2, m.y + m.v * s - m.r * 2, m.r * 4, m.r * 4);
    });
    ctx.restore();
    ctx.globalAlpha = base;
  };
}
efeitoLuzDoCeu.usaMargem = true;

Object.assign(EFEITOS_DO_PERFIL, {
  'estrelas-cadentes': efeitoEstrelasCadentes,
  pombas: efeitoPombas,
  vitral: efeitoVitral,
  petalas: efeitoPetalas,
  sinos: efeitoSinos,
  'linguas-de-fogo': efeitoLinguasDeFogo,
  incenso: efeitoIncenso,
  custodia: efeitoCustodia,
  'estrela-de-belem': efeitoEstrelaDeBelem,
  'penas-de-anjo': efeitoPenasDeAnjo,
  'arco-iris': efeitoArcoIris,
  coracoes: efeitoCoracoes,
  'luz-do-ceu': efeitoLuzDoCeu,
});

Object.assign(MINIS_DE_EFEITO, {
  'estrelas-cadentes'(g) {
    const m = (x, y, l) => `<path d="M${x} ${y}L${x - l} ${n1(y - l * 0.45)}" stroke="url(#${g}m)" stroke-width="1.4" stroke-linecap="round"/><circle cx="${x}" cy="${y}" r="1.4" fill="#fff"/>`;
    return `${fundoDoMini(g, '#020617', '#1e1b4b')}<defs><linearGradient id="${g}m" x1="1" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#fde68a"/><stop offset="1" stop-color="#fde68a" stop-opacity="0"/></linearGradient></defs>${m(22, 20, 16)}${m(48, 14, 20)}${m(40, 32, 12)}${faisca(14, 30, 1.4, '#fff', 0)}${faisca(56, 30, 1.2, '#fff', 0)}`;
  },
  pombas(g) {
    const corpo = pecaPremium('pomba-voando', [-13, -4, 25, 8], PECAS_DAS_FAIXAS.pombaVoando);
    const asa = pecaPremium('asa-pomba', [-13, -10, 14, 11], PECAS_DAS_FAIXAS.asaPomba);
    const pomba = (x, y, e, espelho) => `<g transform="translate(${x} ${y}) scale(${espelho ? -e : e} ${e})">${corpo}<g transform="translate(-1 -.6)">${asa}</g></g>`;
    return `${fundoDoMini(g, '#2563eb', '#bfdbfe')}${pomba(20, 18, 0.9, true)}${pomba(44, 24, 1, false)}${pomba(34, 10, 0.6, false)}`;
  },
  vitral(g) {
    const cores = ['#ef4444', '#3b82f6', '#eab308', '#22c55e', '#a855f7', '#06b6d4'];
    return `${fundoDoMini(g, '#0f0a1e', '#1e1b4b')}${cores.map((c, i) => `<path d="M32 -2L${8 + i * 9.6} 40H${13 + i * 9.6}Z" fill="${c}" opacity=".45"/>`).join('')}<g transform="translate(32 4)">${pecaPremium('rosacea-pequena', [-12, -12, 24, 24], PECAS_DAS_FAIXAS.rosacea2).replace('<image ', '<image transform="scale(.5)" ')}</g>`;
  },
  petalas(g) {
    const p = pecaPremium('petala-rosa', [-4, -4, 8, 8], PECAS_DAS_FAIXAS.rosaCaindo);
    return `${fundoDoMini(g, '#9d174d', '#f9a8d4')}${[[12, 10, 20, 1.1], [28, 24, -30, 1.3], [44, 8, 60, 1], [54, 28, 10, 1.2], [20, 32, 80, 0.9], [38, 16, -60, 0.8]].map(([x, y, a, e]) => `<g transform="translate(${x} ${y}) rotate(${a}) scale(${e})">${p}</g>`).join('')}`;
  },
  sinos(g) {
    const sino = (x, y, a) => `<g transform="translate(${x} ${y}) rotate(${a}) scale(.55)">${pecaPremium('sino-mini', [-14, -20, 28, 36], DESENHOS_DOS_EFEITOS.sino)}</g>`;
    return `${fundoDoMini(g, '#451a03', '#92400e')}<circle cx="18" cy="22" r="12" fill="none" stroke="#fde68a" stroke-width=".6" opacity=".5"/><circle cx="46" cy="22" r="12" fill="none" stroke="#fde68a" stroke-width=".6" opacity=".5"/>${sino(18, 20, -14)}${sino(46, 20, 14)}`;
  },
  'linguas-de-fogo'(g) {
    const chama = pecaPremium('lingua-fogo', [-5, -16, 10, 17], PECAS_PREMIUM.linguaDeFogo);
    return `${fundoDoMini(g, '#450a0a', '#9a3412')}<g transform="translate(32 9) scale(.36)">${pecaPremium('pomba-frente', [-24, -16, 48, 30], PECAS_DAS_FAIXAS.pombaDeFrente)}</g>${[[14, 34], [26, 36], [38, 36], [50, 34]].map(([x, y]) => `<g transform="translate(${x} ${y}) scale(.95)">${chama}</g>`).join('')}`;
  },
  incenso(g) {
    return `${fundoDoMini(g, '#1c1917', '#44403c')}<defs><radialGradient id="${g}f"><stop offset="0" stop-color="#f1f5f9" stop-opacity=".55"/><stop offset="1" stop-color="#f1f5f9" stop-opacity="0"/></radialGradient></defs>
      ${[[26, 30, 7], [30, 22, 9], [36, 13, 11], [28, 8, 8], [42, 24, 7]].map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="url(#${g}f)"/>`).join('')}
      <path d="M28 38L30 33H34L36 38Z" fill="#d4a017"/><circle cx="32" cy="34" r="1.6" fill="#fb923c"/>`;
  },
  custodia(g) {
    return `${fundoDoMini(g, '#1c1305', '#451a03')}<ellipse cx="32" cy="16" rx="16" ry="14" fill="#fde68a" opacity=".22"/><g transform="translate(32 16) scale(.5)">${pecaPremium('custodia-mini', [-26, -32, 52, 68], DESENHOS_DOS_EFEITOS.custodia)}</g>`;
  },
  'estrela-de-belem'(g) {
    return `${fundoDoMini(g, '#020617', '#172554')}<path d="M4 6Q24 2 44 12" fill="none" stroke="#fde68a" stroke-width="1" stroke-dasharray="1 2" opacity=".7"/><path d="M42 14L36 40H50Z" fill="#fef9c3" opacity=".25"/><g transform="translate(44 12) scale(.62)">${pecaPremium('estrela-guia', [-13, -13, 26, 26], PECAS_PREMIUM.estrelaGuiaBrilho)}</g>`;
  },
  'penas-de-anjo'(g) {
    const pena = pecaDoArcanjo('f-pena', [-17, -5, 18, 10], () => penaFina(16, 3.6, 0, 'pc', '#a3b1c9', 0));
    return `${fundoDoMini(g, '#7dd3fc', '#e0f2fe')}${[[20, 14, 40, 1.1], [42, 22, -30, 1.3], [30, 32, 70, 0.9]].map(([x, y, a, e]) => `<g transform="translate(${x} ${y}) rotate(${a}) scale(${e})">${pena}</g>`).join('')}`;
  },
  'arco-iris'(g) {
    const cores = ['#ef4444', '#f97316', '#facc15', '#22c55e', '#3b82f6', '#6366f1', '#a855f7'];
    const nuvem = pecaPremium('nuvem-fofinha', [-18, -12, 36, 22], PECAS_PREMIUM.nuvemFofinha);
    return `${fundoDoMini(g, '#38bdf8', '#e0f2fe')}${cores.map((c, i) => `<path d="M${10 + i * 1.8} 34A${22 - i * 1.8} ${22 - i * 1.8} 0 0 1 ${54 - i * 1.8} 34" stroke="${c}" stroke-width="1.8" fill="none"/>`).join('')}<g transform="translate(12 33) scale(.5)">${nuvem}</g><g transform="translate(52 33) scale(-.5 .5)">${nuvem}</g>`;
  },
  coracoes(g) {
    const c = (x, y, e, i, cs) => `<g transform="translate(${x} ${y}) scale(${e})">${pecaPremium(`coracao-mini-${i}`, [-12, -9, 24, 19], DESENHOS_DOS_EFEITOS.coracaoBrilhante(...cs))}</g>`;
    return `${fundoDoMini(g, '#831843', '#f472b6')}${c(18, 24, 0.75, 0, ['#fecdd3', '#f43f5e', '#9f1239'])}${c(40, 14, 0.6, 1, ['#fbcfe8', '#ec4899', '#9d174d'])}${c(50, 30, 0.5, 2, ['#fef3c7', '#facc15', '#a16207'])}`;
  },
  'luz-do-ceu'(g) {
    return `${fundoDoMini(g, '#1e293b', '#0f172a')}<defs><linearGradient id="${g}l" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fffbeb" stop-opacity=".85"/><stop offset="1" stop-color="#fffbeb" stop-opacity="0"/></linearGradient></defs>
      <path d="M24 0H30L34 40H14Z" fill="url(#${g}l)"/><path d="M32 0H36L48 40H34Z" fill="url(#${g}l)" opacity=".7"/><path d="M18 0H22L14 40H4Z" fill="url(#${g}l)" opacity=".5"/><circle cx="32" cy="30" r="5" fill="#64748b" stroke="#fde68a" stroke-width=".9"/>`;
  },
});
