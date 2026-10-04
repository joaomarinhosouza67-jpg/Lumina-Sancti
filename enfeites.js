const ENFEITES = {
  moldura: [
    { id: 'aureola', nome: 'Auréola', texto: 'A luz dourada dos santos', gratis: true, criancas: true },
    { id: 'estrelas-de-maria', nome: '12 estrelas de Maria', texto: 'A coroa da Mulher do Apocalipse', criancas: true },
    { id: 'terco', nome: 'Terço', texto: 'Uma luz reza conta por conta' },
    { id: 'pentecostes', nome: 'Chamas de Pentecostes', texto: 'O fogo do Espírito Santo' },
    { id: 'rosas', nome: 'Rosas de Santa Teresinha', texto: 'Uma chuva de rosas' },
    { id: 'lirios', nome: 'Lírios de São José', texto: 'A pureza do guarda da Sagrada Família' },
    { id: 'asas-de-anjo', nome: 'Asas de anjo', texto: 'O anjo da guarda abre as asas', criancas: true },
    { id: 'sagrado-coracao', nome: 'Sagrado Coração', texto: 'O Coração de Jesus em chamas de amor' },
    { id: 'ramos-de-oliveira', nome: 'Ramos de oliveira', texto: 'A paz que vem de Deus', criancas: true },
    { id: 'rosacea', nome: 'Rosácea de vitral', texto: 'Os vidros coloridos da catedral' },
  ],
  efeito: [
    { id: 'estrelas-cadentes', nome: 'Estrelas cadentes', texto: 'Uma chuva de estrelas douradas', gratis: true, criancas: true },
    { id: 'pombas', nome: 'Pombas do Espírito Santo', texto: 'A pomba desce num facho de luz', },
    { id: 'vitral', nome: 'Vitral', texto: 'A rosácea da catedral se acende' },
    { id: 'petalas', nome: 'Pétalas de rosa', texto: 'Pétalas caindo devagar', criancas: true },
    { id: 'sinos', nome: 'Sinos da igreja', texto: 'Os sinos tocam de alegria' },
    { id: 'linguas-de-fogo', nome: 'Línguas de fogo', texto: 'O Espírito Santo desce em chamas' },
    { id: 'incenso', nome: 'Incenso', texto: 'A fumaça sobe como uma oração' },
    { id: 'custodia', nome: 'Custódia do Santíssimo', texto: 'A luz da adoração' },
    { id: 'estrela-de-belem', nome: 'Estrela de Belém', texto: 'A estrela que guiou os Magos', criancas: true },
    { id: 'penas-de-anjo', nome: 'Penas de anjo', texto: 'Penas brancas caindo do céu', criancas: true },
    { id: 'arco-iris', nome: 'Arco-íris da Aliança', texto: 'A promessa de Deus a Noé', criancas: true },
    { id: 'coracoes', nome: 'Corações subindo', texto: 'Muito amor para o céu', criancas: true },
    { id: 'luz-do-ceu', nome: 'Luz do céu', texto: 'Raios de luz descem do alto' },
  ],
  faixa: [
    { id: 'ceu-estrelado', nome: 'Céu estrelado', texto: 'Estrelas e a lua', gratis: true, criancas: true },
    { id: 'cruz-na-colina', nome: 'Cruz na colina', texto: 'O sol nasce atrás da cruz' },
    { id: 'pombas-passando', nome: 'Pombas passando', texto: 'Pombas brancas no céu da manhã', criancas: true },
    { id: 'velas', nome: 'Velas acesas', texto: 'A luz das velas da igreja' },
    { id: 'raios-de-gloria', nome: 'Raios de glória', texto: 'A cruz entre nuvens e luz' },
    { id: 'catedral', nome: 'Catedral à noite', texto: 'A rosácea acesa sob as estrelas' },
    { id: 'mar-da-galileia', nome: 'Mar da Galileia', texto: 'O barco dos apóstolos ao nascer do sol' },
    { id: 'campo-de-lirios', nome: 'Campo de lírios', texto: 'Olhai os lírios do campo', criancas: true },
    { id: 'chuva-de-rosas', nome: 'Chuva de rosas', texto: 'A promessa de Santa Teresinha', criancas: true },
  ],
};
const TIPOS_DE_ENFEITE = [
  { tipo: 'moldura', nome: 'Moldura da foto' },
  { tipo: 'efeito', nome: 'Efeito ao abrir' },
  { tipo: 'faixa', nome: 'Faixa do nome' },
];
const DURACAO_DO_EFEITO = 3800;

let sequenciaDosEnfeites = 0;
let enfeitesDaFamilia = {};

function idDoEnfeite(nome) {
  sequenciaDosEnfeites += 1;
  return `enf-${nome}-${sequenciaDosEnfeites}`;
}

function n1(valor) {
  return Math.round(valor * 10) / 10;
}

function pontoNoCirculo(raio, graus, cx = 68, cy = 68) {
  const a = (graus * Math.PI) / 180;
  return [cx + raio * Math.cos(a), cy + raio * Math.sin(a)];
}

function sorteioFixo(semente) {
  let s = semente >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function movimentoReduzido() {
  try {
    return !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  } catch (e) {
    return false;
  }
}

function filtroDeBrilho(id, desvio) {
  return `<filter id="${id}" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="${desvio}" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>`;
}

function faisca(x, y, tamanho, cor, atraso, duracao) {
  return `<g transform="translate(${n1(x)} ${n1(y)}) scale(${tamanho})"><path class="enf-pisca" style="--a:${atraso}s;--d:${duracao || 2.6}s" fill="${cor}" d="M0 -1C.12 -.24 .24 -.12 1 0C.24 .12 .12 .24 0 1C-.12 .24 -.24 .12 -1 0C-.24 -.12 -.12 -.24 0 -1Z"/></g>`;
}

function caminhoDeEstrela(cx, cy, externo, interno, pontas) {
  const total = pontas || 5;
  let d = '';
  for (let i = 0; i < total * 2; i += 1) {
    const raio = i % 2 === 0 ? externo : interno;
    const a = -Math.PI / 2 + (i * Math.PI) / total;
    d += `${i === 0 ? 'M' : 'L'}${n1(cx + raio * Math.cos(a))} ${n1(cy + raio * Math.sin(a))}`;
  }
  return `${d}Z`;
}

function penaDaAsa(comprimento, angulo, cor) {
  const L = comprimento;
  return `<path transform="rotate(${angulo})" d="M0 0C${n1(-L * 0.25)} ${n1(-L * 0.13)} ${n1(-L * 0.7)} ${n1(-L * 0.17)} ${n1(-L)} ${n1(-L * 0.04)}C${n1(-L * 0.72)} ${n1(L * 0.07)} ${n1(-L * 0.28)} ${n1(L * 0.1)} 0 0Z" fill="url(#${cor})" stroke="#cbd5e1" stroke-width=".5"/>`;
}

function asaDeAnjo(cor) {
  const penas = [[30, 52], [44, 47], [33, 36], [20, 30], [6, 24], [-8, 18]].map(([L, a]) => penaDaAsa(L, a, cor)).join('');
  const cobertas = [[22, 40], [20, 25], [16, 10], [12, -4]].map(([L, a]) => penaDaAsa(L, a, cor)).join('');
  return `${penas}<g opacity=".95">${cobertas}</g>`;
}

const MOLDURAS_NOVAS = {
  'asas-de-anjo'() {
    const pena = idDoEnfeite('pena');
    const ouro = idDoEnfeite('ouro');
    const brilho = idDoEnfeite('brilho');
    return `<defs>
      <linearGradient id="${pena}" x1="1" y1="0" x2="0" y2="0"><stop offset="0" stop-color="#ffffff"/><stop offset=".65" stop-color="#f1f5f9"/><stop offset="1" stop-color="#bfdbfe"/></linearGradient>
      <linearGradient id="${ouro}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fffbeb"/><stop offset=".5" stop-color="#f5c542"/><stop offset="1" stop-color="#b8860b"/></linearGradient>
      ${filtroDeBrilho(brilho, 1.8)}
    </defs>
    <g transform="translate(22 72) scale(1.5)"><g class="enf-asa-anjo-e" filter="url(#${brilho})">${asaDeAnjo(pena)}</g></g>
    <g transform="translate(114 72) scale(-1.5 1.5)"><g class="enf-asa-anjo-e" filter="url(#${brilho})">${asaDeAnjo(pena)}</g></g>
    <circle cx="68" cy="68" r="52.5" fill="none" stroke="url(#${ouro})" stroke-width="3" filter="url(#${brilho})"/>
    <g class="enf-flutua"><ellipse cx="68" cy="5" rx="25" ry="6.5" fill="none" stroke="url(#${ouro})" stroke-width="3.2" filter="url(#${brilho})"/>
    <ellipse cx="68" cy="5" rx="25" ry="6.5" fill="none" stroke="#fffbeb" stroke-width="1" stroke-dasharray="1.5 9" class="enf-gira" style="--d:9s"/></g>
    ${faisca(14, 30, 4, '#fffbeb', 0.2)}${faisca(122, 34, 3.6, '#fffbeb', 1.1)}${faisca(68, 126, 3.2, '#fde68a', 1.8)}`;
  },

  'sagrado-coracao'() {
    const anel = idDoEnfeite('anel');
    const coracao = idDoEnfeite('coracao');
    const fogo = idDoEnfeite('fogo');
    const brilho = idDoEnfeite('brilho');
    const luz = idDoEnfeite('luz');
    let raios = '';
    for (let i = 0; i < 16; i += 1) {
      const [x1, y1] = pontoNoCirculo(9, i * 22.5 - 4, 68, 12);
      const [x2, y2] = pontoNoCirculo(9, i * 22.5 + 4, 68, 12);
      const [x3, y3] = pontoNoCirculo(i % 2 ? 19 : 25, i * 22.5, 68, 12);
      raios += `<path d="M${n1(x1)} ${n1(y1)}L${n1(x3)} ${n1(y3)}L${n1(x2)} ${n1(y2)}Z"/>`;
    }
    return `<defs>
      <linearGradient id="${anel}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fde68a"/><stop offset=".35" stop-color="#dc2626"/><stop offset=".7" stop-color="#7f1d1d"/><stop offset="1" stop-color="#fbbf24"/></linearGradient>
      <radialGradient id="${coracao}" cx="40%" cy="35%" r="75%"><stop offset="0" stop-color="#fecaca"/><stop offset=".45" stop-color="#dc2626"/><stop offset="1" stop-color="#7f1d1d"/></radialGradient>
      <linearGradient id="${fogo}" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#f97316"/><stop offset="1" stop-color="#fde047"/></linearGradient>
      <radialGradient id="${luz}" gradientUnits="userSpaceOnUse" cx="68" cy="12" r="26"><stop offset="0" stop-color="#fff7d6" stop-opacity=".9"/><stop offset="1" stop-color="#fde68a" stop-opacity="0"/></radialGradient>
      ${filtroDeBrilho(brilho, 1.7)}
    </defs>
    <circle cx="68" cy="68" r="54" fill="none" stroke="url(#${anel})" stroke-width="4.4" filter="url(#${brilho})"/>
    <circle cx="68" cy="68" r="50.6" fill="none" stroke="#fde68a" stroke-width="1" opacity=".8"/>
    <circle cx="68" cy="68" r="57.6" fill="none" stroke="#fca5a5" stroke-width=".8" stroke-dasharray="2 6" class="enf-gira" style="--d:30s"/>
    <g class="enf-gira" style="--d:24s;transform-origin:68px 12px" fill="url(#${luz})">${raios}</g>
    <g class="enf-respira-local" style="transform-origin:68px 14px" filter="url(#${brilho})">
      <g transform="translate(68 4)"><g class="enf-chama" style="--d:.5s"><path d="M0 0C-4 -2 -4 -6 0 -11C4 -6 4 -2 0 0Z" fill="url(#${fogo})"/></g></g>
      <path d="M68 25C58 18 54 13 54 9C54 5 57 3 60.5 3C63.6 3 66 5 68 7.5C70 5 72.4 3 75.5 3C79 3 82 5 82 9C82 13 78 18 68 25Z" fill="url(#${coracao})" stroke="#fde68a" stroke-width=".8"/>
      <path d="M57 10.5C62 13 74 13 79 10.5" stroke="#4d7c0f" stroke-width="1.2" fill="none" stroke-dasharray="1.6 1.2"/>
      <path d="M68 -9V-1M65 -6H71" stroke="#fde68a" stroke-width="1.4"/>
    </g>
    ${faisca(20, 46, 3.6, '#fecaca', 0.3)}${faisca(118, 50, 3.2, '#fde68a', 1.2)}${faisca(40, 118, 3, '#fecaca', 2)}${faisca(98, 120, 3.4, '#fde68a', 0.8)}`;
  },

  'ramos-de-oliveira'() {
    const folha = idDoEnfeite('folha');
    const fita = idDoEnfeite('fita');
    const brilho = idDoEnfeite('brilho');
    const ramo = (lado) => {
      let folhas = '';
      for (let i = 0; i < 10; i += 1) {
        const a = lado === 'e' ? 100 + i * 15 : 80 - i * 15;
        const [x, y] = pontoNoCirculo(56, a);
        const rot = lado === 'e' ? a + 90 + (i % 2 ? 35 : -35) : a - 90 + (i % 2 ? -35 : 35);
        folhas += `<ellipse cx="${n1(x)}" cy="${n1(y)}" rx="7.2" ry="2.6" transform="rotate(${n1(rot)} ${n1(x)} ${n1(y)})" fill="url(#${folha})"/>`;
        if (i % 3 === 1) {
          const [ox, oy] = pontoNoCirculo(61, a + (lado === 'e' ? 6 : -6));
          folhas += `<circle cx="${n1(ox)}" cy="${n1(oy)}" r="2.1" fill="#3f6212" stroke="#a3e635" stroke-width=".4"/>`;
        }
      }
      const inicio = lado === 'e' ? 100 : 80;
      const fim = lado === 'e' ? 245 : -65;
      const [xi, yi] = pontoNoCirculo(56, inicio);
      const [xf, yf] = pontoNoCirculo(56, fim);
      const caule = `<path d="M${n1(xi)} ${n1(yi)}A56 56 0 0 ${lado === 'e' ? 1 : 0} ${n1(xf)} ${n1(yf)}" fill="none" stroke="#65a30d" stroke-width="1.4"/>`;
      return `<g class="enf-balanca-suave" style="transform-origin:68px 124px">${caule}${folhas}</g>`;
    };
    return `<defs>
      <linearGradient id="${folha}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#d9f99d"/><stop offset=".5" stop-color="#65a30d"/><stop offset="1" stop-color="#365314"/></linearGradient>
      <linearGradient id="${fita}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#b8860b"/><stop offset=".5" stop-color="#fde68a"/><stop offset="1" stop-color="#b8860b"/></linearGradient>
      ${filtroDeBrilho(brilho, 1.2)}
    </defs>
    <circle cx="68" cy="68" r="51.5" fill="none" stroke="#fde68a" stroke-width="1.4" opacity=".7"/>
    <g filter="url(#${brilho})">${ramo('e')}${ramo('d')}</g>
    <g filter="url(#${brilho})"><path d="M60 122L52 134L58 132L60 138L66 125Z" fill="url(#${fita})"/><path d="M76 122L84 134L78 132L76 138L70 125Z" fill="url(#${fita})"/><circle cx="68" cy="123" r="5" fill="url(#${fita})" stroke="#fffbeb" stroke-width=".5"/></g>
    ${faisca(34, 18, 3.4, '#fef9c3', 0.4)}${faisca(104, 16, 3, '#fef9c3', 1.5)}`;
  },

  rosacea() {
    const brilho = idDoEnfeite('brilho');
    const luz = idDoEnfeite('luz');
    const cores = ['#2563eb', '#dc2626', '#f59e0b', '#16a34a', '#7c3aed', '#0ea5e9'];
    let vidros = '';
    for (let i = 0; i < 24; i += 1) {
      const a1 = i * 15 + 1;
      const a2 = (i + 1) * 15 - 1;
      const [x1, y1] = pontoNoCirculo(53, a1);
      const [x2, y2] = pontoNoCirculo(53, a2);
      const [x3, y3] = pontoNoCirculo(65, a2);
      const [x4, y4] = pontoNoCirculo(65, a1);
      vidros += `<path d="M${n1(x1)} ${n1(y1)}A53 53 0 0 1 ${n1(x2)} ${n1(y2)}L${n1(x3)} ${n1(y3)}A65 65 0 0 0 ${n1(x4)} ${n1(y4)}Z" fill="${cores[i % cores.length]}" opacity=".88"/>`;
    }
    return `<defs>
      <linearGradient id="${luz}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#ffffff" stop-opacity="0"/><stop offset=".5" stop-color="#ffffff" stop-opacity=".75"/><stop offset="1" stop-color="#ffffff" stop-opacity="0"/></linearGradient>
      ${filtroDeBrilho(brilho, 1.5)}
    </defs>
    <g class="enf-gira" style="--d:70s" filter="url(#${brilho})">${vidros}</g>
    <circle cx="68" cy="68" r="65.5" fill="none" stroke="#1c1917" stroke-width="1.6"/>
    <circle cx="68" cy="68" r="52.5" fill="none" stroke="#1c1917" stroke-width="1.6"/>
    <circle cx="68" cy="68" r="66.8" fill="none" stroke="#e2b53a" stroke-width="1.4"/>
    <g class="enf-gira" style="--d:7s"><path d="M68 3A65 65 0 0 1 120 30" stroke="url(#${luz})" stroke-width="12" fill="none" opacity=".55"/></g>
    ${faisca(68, 2, 3.6, '#fffbeb', 0)}${faisca(132, 70, 3, '#fffbeb', 1)}${faisca(68, 134, 3, '#fffbeb', 2)}${faisca(4, 66, 3.4, '#fffbeb', 1.5)}`;
  },
};

const MOLDURAS = {
  aureola() {
    const ouro = idDoEnfeite('ouro');
    const halo = idDoEnfeite('halo');
    const raio = idDoEnfeite('raio');
    const brilho = idDoEnfeite('brilho');
    let raios = '';
    for (let i = 0; i < 40; i += 1) {
      const a = i * 9;
      const [x1, y1] = pontoNoCirculo(55, a - 2.1);
      const [x2, y2] = pontoNoCirculo(55, a + 2.1);
      const [x3, y3] = pontoNoCirculo(i % 2 === 0 ? 68 : 62.5, a);
      raios += `<path d="M${n1(x1)} ${n1(y1)}L${n1(x3)} ${n1(y3)}L${n1(x2)} ${n1(y2)}Z"/>`;
    }
    const faiscas = [-62, 28, 150, 232].map((a, i) => {
      const [x, y] = pontoNoCirculo(53, a);
      return faisca(x, y, i % 2 ? 4.6 : 6.2, '#fffbeb', i * 0.7);
    }).join('');
    return `<defs>
      <linearGradient id="${ouro}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fffbe6"/><stop offset=".3" stop-color="#fbe38a"/><stop offset=".55" stop-color="#e2b53a"/><stop offset=".8" stop-color="#b8860b"/><stop offset="1" stop-color="#fff1b8"/></linearGradient>
      <radialGradient id="${halo}" gradientUnits="userSpaceOnUse" cx="68" cy="68" r="68"><stop offset=".7" stop-color="#fde68a" stop-opacity="0"/><stop offset=".79" stop-color="#fde68a" stop-opacity=".5"/><stop offset="1" stop-color="#fde68a" stop-opacity="0"/></radialGradient>
      <radialGradient id="${raio}" gradientUnits="userSpaceOnUse" cx="68" cy="68" r="68"><stop offset=".78" stop-color="#fff7d1" stop-opacity=".95"/><stop offset="1" stop-color="#f59e0b" stop-opacity="0"/></radialGradient>
      ${filtroDeBrilho(brilho, 1.8)}
    </defs>
    <circle cx="68" cy="68" r="68" fill="url(#${halo})" class="enf-respira"/>
    <g class="enf-gira" style="--d:48s" fill="url(#${raio})">${raios}</g>
    <circle cx="68" cy="68" r="52.5" fill="none" stroke="url(#${ouro})" stroke-width="5.2" filter="url(#${brilho})"/>
    <circle cx="68" cy="68" r="52.5" fill="none" stroke="#fffdf2" stroke-width="1.3" stroke-linecap="round" stroke-dasharray="1 12" opacity=".9" class="enf-gira" style="--d:16s"/>
    ${faiscas}`;
  },

  'estrelas-de-maria'() {
    const manto = idDoEnfeite('manto');
    const ouro = idDoEnfeite('ouro');
    const lua = idDoEnfeite('lua');
    const brilho = idDoEnfeite('brilho');
    const mascara = idDoEnfeite('mascara');
    let estrelas = '';
    for (let i = 0; i < 12; i += 1) {
      const a = 150 + (i * 240) / 11;
      const [x, y] = pontoNoCirculo(60.5, a);
      estrelas += `<g transform="translate(${n1(x)} ${n1(y)})"><path class="enf-cintila" style="--a:${n1(i * 0.22)}s" d="${caminhoDeEstrela(0, 0, 5.8, 2.4)}" fill="url(#${ouro})" stroke="#fff8d6" stroke-width=".5"/></g>`;
    }
    return `<defs>
      <linearGradient id="${manto}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#93c5fd"/><stop offset=".5" stop-color="#2563eb"/><stop offset="1" stop-color="#1e3a8a"/></linearGradient>
      <radialGradient id="${ouro}" cx="40%" cy="35%" r="70%"><stop offset="0" stop-color="#fffbeb"/><stop offset=".45" stop-color="#fcd34d"/><stop offset="1" stop-color="#b45309"/></radialGradient>
      <linearGradient id="${lua}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset=".6" stop-color="#e2e8f0"/><stop offset="1" stop-color="#94a3b8"/></linearGradient>
      <mask id="${mascara}"><rect x="40" y="108" width="56" height="28" fill="#fff"/><ellipse cx="68" cy="116.5" rx="13.5" ry="7" fill="#000"/></mask>
      ${filtroDeBrilho(brilho, 1.6)}
    </defs>
    <circle cx="68" cy="68" r="55.5" fill="none" stroke="url(#${manto})" stroke-width="3.6" filter="url(#${brilho})"/>
    <circle cx="68" cy="68" r="51.8" fill="none" stroke="#fde68a" stroke-width="1.2" opacity=".85"/>
    <g filter="url(#${brilho})">${estrelas}</g>
    <ellipse cx="68" cy="121" rx="17" ry="8.5" fill="url(#${lua})" mask="url(#${mascara})" filter="url(#${brilho})"/>
    ${faisca(22, 110, 3, '#bfdbfe', 0.4)}${faisca(114, 108, 3.4, '#bfdbfe', 1.3)}`;
  },

  terco() {
    const perola = idDoEnfeite('perola');
    const ouro = idDoEnfeite('ouro');
    const brilho = idDoEnfeite('brilho');
    const luz = idDoEnfeite('luz');
    const inicio = 124;
    const fim = 416;
    const total = 55;
    let contas = '';
    for (let i = 0; i < total; i += 1) {
      const a = inicio + ((fim - inicio) * i) / (total - 1);
      const [x, y] = pontoNoCirculo(56, a);
      const grande = i % 11 === 0;
      contas += `<circle cx="${n1(x)}" cy="${n1(y)}" r="${grande ? 3.3 : 2.25}" fill="url(#${grande ? ouro : perola})"/>`;
    }
    const [xi, yi] = pontoNoCirculo(56, inicio);
    const [xf, yf] = pontoNoCirculo(56, fim);
    const caminho = `M${n1(xi)} ${n1(yi)}A56 56 0 1 1 ${n1(xf)} ${n1(yf)}`;
    const andando = movimentoReduzido() ? '' : `<animateMotion dur="16s" repeatCount="indefinite" path="${caminho}"/>`;
    return `<defs>
      <radialGradient id="${perola}" cx="35%" cy="30%" r="75%"><stop offset="0" stop-color="#ffffff"/><stop offset=".55" stop-color="#e2e8f0"/><stop offset="1" stop-color="#7c8ba1"/></radialGradient>
      <radialGradient id="${ouro}" cx="35%" cy="30%" r="80%"><stop offset="0" stop-color="#fffbeb"/><stop offset=".5" stop-color="#f5c542"/><stop offset="1" stop-color="#92610b"/></radialGradient>
      <radialGradient id="${luz}"><stop offset="0" stop-color="#fffbeb" stop-opacity="1"/><stop offset=".4" stop-color="#fde68a" stop-opacity=".7"/><stop offset="1" stop-color="#fde68a" stop-opacity="0"/></radialGradient>
      ${filtroDeBrilho(brilho, 1.4)}
    </defs>
    <path d="${caminho}" fill="none" stroke="#cbd5e1" stroke-width=".9" opacity=".7"/>
    <path d="M${n1(xi)} ${n1(yi)}L68 118M${n1(xf)} ${n1(yf)}L68 118" stroke="#cbd5e1" stroke-width=".9" opacity=".7"/>
    <g filter="url(#${brilho})">${contas}</g>
    <circle r="7" fill="url(#${luz})">${andando}</circle>
    <g class="enf-balanca" style="transform-origin:68px 118px">
      <ellipse cx="68" cy="120.5" rx="3.2" ry="3.8" fill="url(#${ouro})" stroke="#fff5cc" stroke-width=".4"/>
      <path d="M68 124.3V127" stroke="#cbd5e1" stroke-width=".9"/>
      <g filter="url(#${brilho})" fill="url(#${ouro})" stroke="#fff5cc" stroke-width=".35">
        <rect x="66.5" y="127" width="3" height="15" rx=".8"/>
        <rect x="61.5" y="130.6" width="13" height="2.8" rx=".8"/>
      </g>
    </g>`;
  },

  pentecostes() {
    const fogo = idDoEnfeite('fogo');
    const miolo = idDoEnfeite('miolo');
    const anel = idDoEnfeite('anel');
    const brilho = idDoEnfeite('brilho');
    const luzDaPomba = idDoEnfeite('luzpomba');
    const sorteio = sorteioFixo(11);
    let chamas = '';
    for (let i = 1; i <= 11; i += 1) {
      const a = 270 + i * 30;
      const [x, y] = pontoNoCirculo(51.5, a);
      const escala = n1(0.95 + sorteio() * 0.35);
      chamas += `<g transform="translate(${n1(x)} ${n1(y)}) rotate(${a + 90}) scale(${escala})"><g class="enf-chama" style="--d:${n1(0.42 + sorteio() * 0.3)}s;--a:${n1(sorteio())}s">
        <path d="M0 2C-6.2 -1.5 -6 -8.5 -1.6 -15C-1.7 -10.5 1.2 -9.8 1.4 -13.2C6.4 -8 6.6 -1.5 0 2Z" fill="url(#${fogo})"/>
        <path d="M0 1.6C-3.6 -.8 -3.4 -5.2 -.6 -9.2C-.4 -6.6 1.6 -6.4 1.6 -8.2C4 -5 3.8 -.9 0 1.6Z" fill="url(#${miolo})"/>
      </g></g>`;
    }
    return `<defs>
      <linearGradient id="${fogo}" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#dc2626"/><stop offset=".45" stop-color="#f97316"/><stop offset="1" stop-color="#fbbf24" stop-opacity=".9"/></linearGradient>
      <linearGradient id="${miolo}" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#fef9c3"/><stop offset="1" stop-color="#fde047"/></linearGradient>
      <linearGradient id="${anel}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fde68a"/><stop offset=".5" stop-color="#f97316"/><stop offset="1" stop-color="#b91c1c"/></linearGradient>
      <radialGradient id="${luzDaPomba}"><stop offset="0" stop-color="#fffbeb" stop-opacity=".95"/><stop offset="1" stop-color="#fde68a" stop-opacity="0"/></radialGradient>
      ${filtroDeBrilho(brilho, 1.5)}
    </defs>
    <circle cx="68" cy="68" r="51.5" fill="none" stroke="url(#${anel})" stroke-width="2.4" filter="url(#${brilho})"/>
    <g filter="url(#${brilho})">${chamas}</g>
    <circle cx="68" cy="9" r="15" fill="url(#${luzDaPomba})" class="enf-respira"/>
    <g transform="translate(68 9)" fill="#ffffff" filter="url(#${brilho})">
      <path class="enf-asa-esq" d="M-1.8 0C-5 -4 -9 -9 -15 -9C-12 -6 -11 -3 -9 -1C-7 0 -4 1 -1.8 2.5Z"/>
      <path class="enf-asa-dir" d="M1.8 0C5 -4 9 -9 15 -9C12 -6 11 -3 9 -1C7 0 4 1 1.8 2.5Z"/>
      <ellipse cx="0" cy="2" rx="2.7" ry="6"/>
      <path d="M-2.3 -3L0 -8.5L2.3 -3Z"/>
      <circle cx="0" cy="8.6" r="2.3"/>
      <path d="M-.7 10.6L0 12.2L.7 10.6Z" fill="#f59e0b"/>
    </g>`;
  },

  rosas() {
    const petala = idDoEnfeite('petala');
    const folha = idDoEnfeite('folha');
    const brilho = idDoEnfeite('brilho');
    let folhas = '';
    for (let i = 0; i < 20; i += 1) {
      const a = i * 18 + 9;
      const [x, y] = pontoNoCirculo(55, a);
      const lado = i % 2 === 0 ? -38 : 38;
      folhas += `<g transform="translate(${n1(x)} ${n1(y)}) rotate(${a + 90 + lado})"><path d="M0 0C2.2 -2.8 6.4 -2.9 9 0C6.4 2.6 2.2 2.6 0 0Z" fill="url(#${folha})"/><path d="M.6 0H8" stroke="#14532d" stroke-width=".35"/></g>`;
    }
    let rosas = '';
    [0, 51, 103, 154, 206, 257, 309].forEach((a, i) => {
      const [x, y] = pontoNoCirculo(55, a);
      let petalas = '';
      for (let k = 0; k < 5; k += 1) {
        const g = (k * 72 * Math.PI) / 180;
        petalas += `<ellipse cx="${n1(Math.cos(g) * 2.3)}" cy="${n1(Math.sin(g) * 2.3)}" rx="3.1" ry="2.7" transform="rotate(${k * 72} ${n1(Math.cos(g) * 2.3)} ${n1(Math.sin(g) * 2.3)})" fill="url(#${petala})" stroke="#881337" stroke-width=".25"/>`;
      }
      rosas += `<g transform="translate(${n1(x)} ${n1(y)}) scale(1.65)"><g class="enf-respira-local" style="--a:${n1(i * 0.45)}s">${petalas}
        <circle r="2.3" fill="#be123c"/><path d="M0 -1.3C1.3 -1.3 1.5 .8 0 1.05C-1.1 1.2 -1.3 -.4 -.2 -.55" stroke="#fda4af" stroke-width=".45" fill="none"/></g></g>`;
    });
    const caindo = [[40, 112, 0], [96, 116, 1.8], [68, 126, 3.4]].map(([x, y, atraso]) => `<g transform="translate(${x} ${y})"><path class="enf-cai" style="--a:${atraso}s" d="M0 0C1.6 -1.6 3.8 -1.1 3.3 1.1C2.8 2.7 .6 2.2 0 0Z" fill="#fb7185"/></g>`).join('');
    return `<defs>
      <radialGradient id="${petala}" cx="35%" cy="30%" r="80%"><stop offset="0" stop-color="#fecdd3"/><stop offset=".45" stop-color="#f43f5e"/><stop offset="1" stop-color="#9f1239"/></radialGradient>
      <linearGradient id="${folha}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#86efac"/><stop offset="1" stop-color="#15803d"/></linearGradient>
      ${filtroDeBrilho(brilho, 1.1)}
    </defs>
    <circle cx="68" cy="68" r="55" fill="none" stroke="#166534" stroke-width="1.8"/>
    ${folhas}
    <g filter="url(#${brilho})">${rosas}</g>
    ${caindo}`;
  },

  lirios() {
    const petala = idDoEnfeite('petala');
    const caule = idDoEnfeite('caule');
    const ouro = idDoEnfeite('ouro');
    const brilho = idDoEnfeite('brilho');
    const lirio = (x, y, escala, giro) => {
      let petalas = '';
      for (let k = 0; k < 6; k += 1) {
        petalas += `<path transform="rotate(${k * 60}) scale(${k % 2 ? 0.86 : 1})" d="M0 0C2.4 -3 2.6 -9.5 0 -14C-2.6 -9.5 -2.4 -3 0 0Z" fill="url(#${petala})" stroke="#e7e5e4" stroke-width=".35"/>`;
      }
      let estames = '';
      for (let k = 0; k < 6; k += 1) {
        const a = ((k * 60 + 30) * Math.PI) / 180;
        estames += `<path d="M0 0L${n1(Math.cos(a) * 5.5)} ${n1(Math.sin(a) * 5.5)}" stroke="#65a30d" stroke-width=".45"/><circle cx="${n1(Math.cos(a) * 5.8)}" cy="${n1(Math.sin(a) * 5.8)}" r=".9" fill="#ea580c"/>`;
      }
      return `<g transform="translate(${x} ${y}) rotate(${giro}) scale(${escala})">${petalas}<circle r="1.6" fill="#fde68a"/>${estames}</g>`;
    };
    const folha = (x, y, giro, tamanho) => `<path transform="translate(${x} ${y}) rotate(${giro}) scale(${tamanho})" d="M0 0C3 -3 9 -4.2 14 -2C9 -1 4 1 0 0Z" fill="url(#${caule})"/>`;
    const ramo = (espelho) => `<g transform="${espelho ? 'translate(136 0) scale(-1 1)' : ''}"><g class="enf-balanca-suave" style="transform-origin:44px 132px">
      <path d="M44 132C24 121 11 99 13 66" stroke="url(#${caule})" stroke-width="2" fill="none" stroke-linecap="round"/>
      <path d="M26 118C18 114 15 108 15 101" stroke="url(#${caule})" stroke-width="1.5" fill="none"/>
      ${folha(34, 126, 200, 1)}${folha(20, 104, 250, 0.9)}${folha(14, 86, 280, 0.8)}${folha(22, 114, 150, 0.8)}
      <g filter="url(#${brilho})">${lirio(13, 62, 1.05, 0)}${lirio(15, 99, 0.85, 30)}</g>
      <path d="M12 80C9 77 9 72 11.5 69C14 72 14 77 12 80Z" fill="#f5f5f4" stroke="#d6d3d1" stroke-width=".3"/>
    </g></g>`;
    return `<defs>
      <linearGradient id="${petala}" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#fef3c7"/><stop offset=".35" stop-color="#ffffff"/><stop offset="1" stop-color="#f8fafc"/></linearGradient>
      <linearGradient id="${caule}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#86efac"/><stop offset="1" stop-color="#166534"/></linearGradient>
      <linearGradient id="${ouro}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fef3c7"/><stop offset=".5" stop-color="#e2b53a"/><stop offset="1" stop-color="#fef3c7"/></linearGradient>
      ${filtroDeBrilho(brilho, 1.2)}
    </defs>
    <circle cx="68" cy="68" r="52.5" fill="none" stroke="url(#${ouro})" stroke-width="1.8" opacity=".95"/>
    ${ramo(false)}${ramo(true)}
    <g>${[[30, 40, 0], [106, 36, 1.2], [68, 124, 2.1], [44, 22, 2.9]].map(([x, y, a]) => `<g transform="translate(${x} ${y})"><g class="enf-sobe" style="--a:${a}s">${faisca(0, 0, 2.6, '#fef9c3', a)}</g></g>`).join('')}</g>`;
  },
};

function svgDaMoldura(id) {
  const desenho = MOLDURAS[id];
  if (!desenho) return '';
  return `<svg class="enfeite-moldura" viewBox="0 0 136 136" aria-hidden="true" focusable="false">${desenho()}</svg>`;
}

function pombaDeLado(x, y, escala, duracaoDaAsa, atrasoDaAsa) {
  return `<g transform="translate(${x} ${y}) scale(${escala})">
    <path d="M2 1C5 -1.5 11 -1.6 15 .4L19.5 -1.2L18.4 1.4L20.6 3L15.2 2.6C11 4.2 5 3.6 2 1Z" fill="#ffffff"/>
    <circle cx="2.4" cy=".3" r="2.1" fill="#ffffff"/>
    <path d="M.5 0L-1.5 .7L.6 1.1Z" fill="#f59e0b"/>
    <circle cx="1.7" cy="-.2" r=".35" fill="#1e293b"/>
    <path class="enf-asa" style="--d:${duracaoDaAsa}s;--a:${atrasoDaAsa}s" d="M6 .2C8 -6 12 -9.5 17.5 -10.5C14.5 -6.5 12.5 -2.5 11.5 .6Z" fill="#f1f5f9"/>
  </g>`;
}

function nuvem(x, y, escala, cor, opacidade) {
  return `<g transform="translate(${x} ${y}) scale(${escala})" fill="${cor}" opacity="${opacidade}"><ellipse cx="0" cy="0" rx="16" ry="5"/><ellipse cx="-7" cy="-3" rx="8" ry="5.5"/><ellipse cx="4" cy="-5" rx="9" ry="7"/><ellipse cx="12" cy="-1.5" rx="7" ry="4.5"/></g>`;
}

const FAIXAS = {
  'ceu-estrelado'() {
    const ceu = idDoEnfeite('ceu');
    const via = idDoEnfeite('via');
    const lua = idDoEnfeite('lua');
    const rastro = idDoEnfeite('rastro');
    const brilho = idDoEnfeite('brilho');
    const mascara = idDoEnfeite('mascara');
    const sorteio = sorteioFixo(7);
    let estrelas = '';
    for (let i = 0; i < 46; i += 1) {
      const x = n1(40 + sorteio() * 278);
      const y = n1(3 + sorteio() * 72);
      const r = n1(0.35 + sorteio() * 0.85);
      const pisca = i % 3 === 0 ? ` class="enf-pisca" style="--a:${n1(sorteio() * 3)}s;--d:${n1(1.8 + sorteio() * 2)}s"` : '';
      estrelas += `<circle cx="${x}" cy="${y}" r="${r}" fill="#ffffff" opacity="${n1(0.45 + sorteio() * 0.55)}"${pisca}/>`;
    }
    return `<defs>
      <linearGradient id="${ceu}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#050816"/><stop offset=".55" stop-color="#141042"/><stop offset="1" stop-color="#2b1b5c"/></linearGradient>
      <radialGradient id="${via}"><stop offset="0" stop-color="#c4b5fd" stop-opacity=".38"/><stop offset=".6" stop-color="#818cf8" stop-opacity=".12"/><stop offset="1" stop-color="#818cf8" stop-opacity="0"/></radialGradient>
      <radialGradient id="${lua}"><stop offset="0" stop-color="#fefce8" stop-opacity=".55"/><stop offset="1" stop-color="#fefce8" stop-opacity="0"/></radialGradient>
      <linearGradient id="${rastro}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fffbeb"/><stop offset=".3" stop-color="#fde68a" stop-opacity=".8"/><stop offset="1" stop-color="#fde68a" stop-opacity="0"/></linearGradient>
      <mask id="${mascara}"><rect width="320" height="80" fill="#fff"/><circle cx="296" cy="17" r="9" fill="#000"/></mask>
      ${filtroDeBrilho(brilho, 1.4)}
    </defs>
    <rect width="320" height="80" fill="url(#${ceu})"/>
    <ellipse cx="205" cy="38" rx="150" ry="17" transform="rotate(-14 205 38)" fill="url(#${via})"/>
    ${estrelas}
    ${faisca(118, 22, 3.4, '#fef3c7', 0.2)}${faisca(214, 58, 2.8, '#fef3c7', 1.1)}${faisca(258, 30, 4, '#fef3c7', 1.9)}${faisca(172, 12, 2.4, '#fef3c7', 2.6)}
    <circle cx="290" cy="21" r="22" fill="url(#${lua})"/>
    <circle cx="290" cy="21" r="10" fill="#fef9c3" mask="url(#${mascara})" filter="url(#${brilho})"/>
    <g transform="translate(330 4)"><g class="enf-cadente" style="--d:7s"><path d="M0 0L46 -13" stroke="url(#${rastro})" stroke-width="1.6" stroke-linecap="round" transform="rotate(180)"/><circle r="1.6" fill="#fffbeb" filter="url(#${brilho})"/></g></g>`;
  },

  'cruz-na-colina'() {
    const ceu = idDoEnfeite('ceu');
    const sol = idDoEnfeite('sol');
    const raio = idDoEnfeite('raio');
    const colina = idDoEnfeite('colina');
    const longe = idDoEnfeite('longe');
    const contorno = idDoEnfeite('contorno');
    const brilho = idDoEnfeite('brilho');
    let raios = '';
    for (let i = 0; i < 18; i += 1) {
      const a = i * 20;
      const [x1, y1] = pontoNoCirculo(10, a - 3.5, 262, 47);
      const [x2, y2] = pontoNoCirculo(10, a + 3.5, 262, 47);
      const [x3, y3] = pontoNoCirculo(i % 2 ? 110 : 150, a, 262, 47);
      raios += `<path d="M${n1(x1)} ${n1(y1)}L${n1(x3)} ${n1(y3)}L${n1(x2)} ${n1(y2)}Z"/>`;
    }
    const passaros = [[0, 16, 0.9, 11], [18, 24, 0.7, 13], [34, 12, 0.6, 15]].map(([dx, y, e, d], i) => `<g transform="translate(${330 + dx} ${y})"><g class="enf-voa" style="--d:${d}s;--a:${-i * 4}s"><g transform="scale(${e})"><path class="enf-asa-v" style="--d:${n1(0.5 + i * 0.08)}s" d="M-6 0Q-3 -3.5 0 0Q3 -3.5 6 0" stroke="#1f1033" stroke-width="1.4" fill="none" stroke-linecap="round"/></g></g></g>`).join('');
    return `<defs>
      <linearGradient id="${ceu}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1e1b4b"/><stop offset=".32" stop-color="#5b21b6"/><stop offset=".6" stop-color="#db2777"/><stop offset=".8" stop-color="#f97316"/><stop offset="1" stop-color="#fcd34d"/></linearGradient>
      <radialGradient id="${sol}" gradientUnits="userSpaceOnUse" cx="262" cy="47" r="46"><stop offset="0" stop-color="#fffbeb"/><stop offset=".22" stop-color="#fde68a"/><stop offset=".5" stop-color="#fbbf24" stop-opacity=".55"/><stop offset="1" stop-color="#f59e0b" stop-opacity="0"/></radialGradient>
      <radialGradient id="${raio}" gradientUnits="userSpaceOnUse" cx="262" cy="47" r="150"><stop offset="0" stop-color="#fff7d6" stop-opacity=".75"/><stop offset=".5" stop-color="#fde68a" stop-opacity=".22"/><stop offset="1" stop-color="#fde68a" stop-opacity="0"/></radialGradient>
      <linearGradient id="${colina}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2a1238"/><stop offset="1" stop-color="#0b0614"/></linearGradient>
      <linearGradient id="${longe}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6b2a5e"/><stop offset="1" stop-color="#3b1540"/></linearGradient>
      <linearGradient id="${contorno}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fde68a" stop-opacity="0"/><stop offset=".75" stop-color="#fde68a" stop-opacity=".9"/><stop offset="1" stop-color="#fde68a" stop-opacity=".2"/></linearGradient>
      ${filtroDeBrilho(brilho, 1.6)}
    </defs>
    <rect width="320" height="80" fill="url(#${ceu})"/>
    <g class="enf-gira" style="--d:90s;transform-origin:262px 47px" fill="url(#${raio})">${raios}</g>
    <circle cx="262" cy="47" r="46" fill="url(#${sol})" class="enf-respira"/>
    <circle cx="262" cy="47" r="10.5" fill="#fffbeb" filter="url(#${brilho})"/>
    <g class="enf-nuvem" style="--d:26s">${nuvem(150, 22, 1.2, '#fda4af', 0.35)}${nuvem(215, 14, 0.8, '#fed7aa', 0.4)}</g>
    <g class="enf-nuvem" style="--d:34s;--a:-9s">${nuvem(300, 30, 0.9, '#fecaca', 0.3)}</g>
    <path d="M120 80C160 60 196 60 226 65C258 71 290 60 320 55V80Z" fill="url(#${longe})" opacity=".9"/>
    <path d="M150 80C186 70 214 53 246 47.5C270 44 294 52 320 62V80Z" fill="url(#${colina})"/>
    <path d="M214 56C226 51 236 48.5 246 47.5C258 46.3 268 47 280 50" stroke="url(#${contorno})" stroke-width="1" fill="none"/>
    <circle cx="248" cy="33" r="14" fill="#fde68a" opacity=".22" filter="url(#${brilho})"/>
    <g fill="#0b0614"><rect x="246.6" y="17" width="3" height="31" rx=".5"/><rect x="240" y="24.5" width="16.2" height="2.8" rx=".5"/></g>
    <g stroke="#fde68a" stroke-width=".45" opacity=".75" fill="none"><path d="M249.6 17.3V47M256.2 24.7V27.1"/></g>
    ${passaros}`;
  },

  'pombas-passando'() {
    const ceu = idDoEnfeite('ceu');
    const sol = idDoEnfeite('sol');
    const sorteio = sorteioFixo(3);
    let pombas = '';
    for (let i = 0; i < 6; i += 1) {
      const y = n1(10 + sorteio() * 50);
      const escala = n1(0.75 + sorteio() * 0.55);
      const duracao = n1(10 + sorteio() * 7);
      pombas += `<g transform="translate(330 0)"><g class="enf-voa" style="--d:${duracao}s;--a:${n1(-i * (duracao / 6))}s">${pombaDeLado(0, y, escala, n1(0.45 + sorteio() * 0.2), n1(sorteio()))}</g></g>`;
    }
    return `<defs>
      <linearGradient id="${ceu}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1e40af"/><stop offset=".55" stop-color="#3b82f6"/><stop offset="1" stop-color="#bae6fd"/></linearGradient>
      <radialGradient id="${sol}" gradientUnits="userSpaceOnUse" cx="300" cy="6" r="80"><stop offset="0" stop-color="#fffbeb" stop-opacity=".95"/><stop offset=".3" stop-color="#fef3c7" stop-opacity=".45"/><stop offset="1" stop-color="#fef3c7" stop-opacity="0"/></radialGradient>
    </defs>
    <rect width="320" height="80" fill="url(#${ceu})"/>
    <rect width="320" height="80" fill="url(#${sol})"/>
    <g class="enf-nuvem" style="--d:30s">${nuvem(140, 62, 1.6, '#ffffff', 0.55)}${nuvem(260, 70, 1.3, '#ffffff', 0.6)}</g>
    <g class="enf-nuvem" style="--d:40s;--a:-12s">${nuvem(200, 20, 0.9, '#ffffff', 0.35)}</g>
    ${pombas}`;
  },

  velas() {
    const fundo = idDoEnfeite('fundo');
    const cera = idDoEnfeite('cera');
    const fogo = idDoEnfeite('fogo');
    const halo = idDoEnfeite('halo');
    const brilho = idDoEnfeite('brilho');
    const sorteio = sorteioFixo(5);
    let velas = '';
    [176, 194, 212, 232, 252, 272, 292, 310].forEach((x) => {
      const altura = n1(16 + sorteio() * 22);
      const topo = n1(80 - altura);
      const largura = n1(7 + sorteio() * 2.5);
      const esquerda = n1(x - largura / 2);
      const direita = n1(x + largura / 2);
      velas += `<g>
        <circle cx="${x}" cy="${n1(topo - 7)}" r="15" fill="url(#${halo})" class="enf-respira" style="--a:${n1(sorteio() * 2)}s"/>
        <rect x="${esquerda}" y="${topo}" width="${largura}" height="${altura}" rx="1.4" fill="url(#${cera})"/>
        <path d="M${esquerda} ${n1(topo + 1)}C${n1(esquerda + 1.5)} ${n1(topo + 5)} ${n1(x - 1)} ${n1(topo + 3)} ${n1(x - 0.6)} ${n1(topo + 7)}C${n1(x - 0.2)} ${n1(topo + 3)} ${n1(x + 0.8)} ${n1(topo + 2)} ${direita} ${n1(topo + 1)}" fill="#fffaf0" opacity=".8"/>
        <path d="M${x} ${topo}V${n1(topo - 2.2)}" stroke="#292524" stroke-width=".8"/>
        <g transform="translate(${x} ${n1(topo - 2)})"><g class="enf-chama" style="--d:${n1(0.35 + sorteio() * 0.3)}s;--a:${n1(sorteio())}s" filter="url(#${brilho})">
          <path d="M0 0C-2.6 -1.8 -2.4 -5.6 0 -10.5C2.4 -5.6 2.6 -1.8 0 0Z" fill="url(#${fogo})"/>
          <ellipse cx="0" cy="-1.3" rx=".9" ry="1.3" fill="#60a5fa" opacity=".7"/>
        </g></g>
      </g>`;
    });
    let luzes = '';
    for (let i = 0; i < 9; i += 1) {
      luzes += `<g transform="translate(${n1(150 + sorteio() * 165)} ${n1(60 + sorteio() * 18)})"><circle class="enf-sobe-lento" style="--a:${n1(-sorteio() * 9)}s;--d:${n1(7 + sorteio() * 5)}s" r="${n1(1 + sorteio() * 2.2)}" fill="#fcd34d" opacity=".35"/></g>`;
    }
    return `<defs>
      <linearGradient id="${fundo}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0c0603"/><stop offset=".6" stop-color="#2a1206"/><stop offset="1" stop-color="#4a2209"/></linearGradient>
      <linearGradient id="${cera}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#d6b98c"/><stop offset=".4" stop-color="#fff6e5"/><stop offset="1" stop-color="#c9a574"/></linearGradient>
      <linearGradient id="${fogo}" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#fff7ed"/><stop offset=".4" stop-color="#fde047"/><stop offset="1" stop-color="#f97316"/></linearGradient>
      <radialGradient id="${halo}"><stop offset="0" stop-color="#fde68a" stop-opacity=".55"/><stop offset="1" stop-color="#f59e0b" stop-opacity="0"/></radialGradient>
      ${filtroDeBrilho(brilho, 1.2)}
    </defs>
    <rect width="320" height="80" fill="url(#${fundo})"/>
    <ellipse cx="250" cy="70" rx="110" ry="40" fill="#f59e0b" opacity=".12"/>
    ${luzes}${velas}`;
  },

  'raios-de-gloria'() {
    const fundo = idDoEnfeite('fundo');
    const raio = idDoEnfeite('raio');
    const miolo = idDoEnfeite('miolo');
    const ouro = idDoEnfeite('ouro');
    const brilho = idDoEnfeite('brilho');
    let raios = '';
    for (let i = 0; i < 32; i += 1) {
      const a = i * 11.25;
      const [x1, y1] = pontoNoCirculo(8, a - 2.6, 262, 36);
      const [x2, y2] = pontoNoCirculo(8, a + 2.6, 262, 36);
      const [x3, y3] = pontoNoCirculo(i % 2 ? 95 : 150, a, 262, 36);
      raios += `<path d="M${n1(x1)} ${n1(y1)}L${n1(x3)} ${n1(y3)}L${n1(x2)} ${n1(y2)}Z"/>`;
    }
    return `<defs>
      <linearGradient id="${fundo}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2a1403"/><stop offset=".55" stop-color="#6b3a07"/><stop offset="1" stop-color="#a16207"/></linearGradient>
      <radialGradient id="${raio}" gradientUnits="userSpaceOnUse" cx="262" cy="36" r="150"><stop offset="0" stop-color="#fffbeb" stop-opacity=".9"/><stop offset=".45" stop-color="#fde68a" stop-opacity=".3"/><stop offset="1" stop-color="#fde68a" stop-opacity="0"/></radialGradient>
      <radialGradient id="${miolo}" gradientUnits="userSpaceOnUse" cx="262" cy="36" r="34"><stop offset="0" stop-color="#ffffff"/><stop offset=".35" stop-color="#fef3c7" stop-opacity=".9"/><stop offset="1" stop-color="#fbbf24" stop-opacity="0"/></radialGradient>
      <linearGradient id="${ouro}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fffbeb"/><stop offset=".5" stop-color="#f5c542"/><stop offset="1" stop-color="#a16207"/></linearGradient>
      ${filtroDeBrilho(brilho, 1.5)}
    </defs>
    <rect width="320" height="80" fill="url(#${fundo})"/>
    <g class="enf-gira" style="--d:120s;transform-origin:262px 36px" fill="url(#${raio})">${raios}</g>
    <circle cx="262" cy="36" r="34" fill="url(#${miolo})" class="enf-respira"/>
    <g filter="url(#${brilho})" fill="url(#${ouro})" stroke="#fffbeb" stroke-width=".5"><rect x="260.4" y="22" width="3.2" height="26" rx=".6"/><rect x="254" y="28.5" width="16" height="3.2" rx=".6"/></g>
    <g class="enf-nuvem" style="--d:28s">${nuvem(200, 76, 2.2, '#fff7ed', 0.5)}${nuvem(300, 80, 2, '#fff7ed', 0.55)}</g>
    <g class="enf-nuvem" style="--d:36s;--a:-10s">${nuvem(140, 80, 1.6, '#fef3c7', 0.35)}</g>
    ${faisca(212, 18, 2.6, '#fffbeb', 0.3)}${faisca(300, 14, 3.2, '#fffbeb', 1.2)}${faisca(236, 58, 2.2, '#fffbeb', 2)}${faisca(170, 34, 2, '#fffbeb', 2.8)}`;
  },
};

function liriosDoCampo(sorteio) {
  let lirios = '';
  [176, 196, 214, 236, 256, 276, 300].forEach((x, i) => {
    const altura = n1(22 + sorteio() * 18);
    const topo = n1(80 - altura);
    lirios += `<g class="enf-balanca-suave" style="transform-origin:${x}px 80px;animation-delay:${n1(-sorteio() * 4)}s">
      <path d="M${x} 80Q${x - 2} ${n1(80 - altura / 2)} ${x} ${topo}" stroke="#4d7c0f" stroke-width="1.3" fill="none"/>
      <path d="M${x} ${n1(80 - altura * 0.45)}q-6 -2 -8 -8q5 1 8 8" fill="#65a30d"/>
      <g transform="translate(${x} ${topo})">
        <path d="M0 0C-5 -2 -8 -7 -7 -11C-4 -8 -2 -6 0 -5C2 -6 4 -8 7 -11C8 -7 5 -2 0 0Z" fill="#ffffff" stroke="#e2e8f0" stroke-width=".4"/>
        <path d="M0 -1C-1.5 -5 -1.2 -10 0 -13C1.2 -10 1.5 -5 0 -1Z" fill="#f8fafc"/>
        <circle cx="-1.2" cy="-6" r=".8" fill="#f59e0b"/><circle cx="1.2" cy="-6.6" r=".8" fill="#f59e0b"/>
      </g>
    </g>`;
    if (i % 2) lirios += faisca(x + 6, n1(topo - 10), 1.8, '#fffbeb', n1(sorteio() * 3));
  });
  return lirios;
}

function borboleta(x, y, cor, duracao, atraso) {
  return `<g transform="translate(330 ${y})"><g class="enf-voa" style="--d:${duracao}s;--a:${atraso}s"><g class="enf-borboleta" style="--a:${atraso}s">
    <g transform="translate(${x - 330} 0)"><g class="enf-asa-v" style="--d:.28s"><path d="M0 0C-4 -6 -9 -5 -8 -1C-7 2 -3 2 0 0ZM0 0C-3 4 -7 5 -7 2C-7 0 -3 0 0 0Z" fill="${cor}"/><path d="M0 0C4 -6 9 -5 8 -1C7 2 3 2 0 0ZM0 0C3 4 7 5 7 2C7 0 3 0 0 0Z" fill="${cor}"/></g><path d="M0 -3V3" stroke="#1f2937" stroke-width="1"/></g>
  </g></g></g>`;
}

const FAIXAS_NOVAS = {
  catedral() {
    const ceu = idDoEnfeite('ceu');
    const pedra = idDoEnfeite('pedra');
    const vitral = idDoEnfeite('vitral');
    const brilho = idDoEnfeite('brilho');
    const lua = idDoEnfeite('lua');
    const sorteio = sorteioFixo(17);
    let estrelas = '';
    for (let i = 0; i < 34; i += 1) {
      const pisca = i % 3 === 0 ? ` class="enf-pisca" style="--a:${n1(sorteio() * 3)}s"` : '';
      estrelas += `<circle cx="${n1(130 + sorteio() * 190)}" cy="${n1(3 + sorteio() * 40)}" r="${n1(0.3 + sorteio() * 0.8)}" fill="#fff"${pisca}/>`;
    }
    let janelas = '';
    [[214, 52], [226, 52], [284, 52], [296, 52], [214, 38], [296, 38]].forEach(([x, y], i) => {
      janelas += `<path d="M${x} ${y}v-7a2.5 2.5 0 0 1 5 0v7z" fill="#fcd34d" class="enf-respira" style="--a:${n1(i * 0.4)}s;--d:${n1(2.4 + (i % 3) * 0.7)}s"/>`;
    });
    return `<defs>
      <linearGradient id="${ceu}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#020617"/><stop offset=".6" stop-color="#1e1b4b"/><stop offset="1" stop-color="#4c1d95"/></linearGradient>
      <linearGradient id="${pedra}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1e1b2e"/><stop offset="1" stop-color="#0b0712"/></linearGradient>
      <radialGradient id="${vitral}"><stop offset="0" stop-color="#fef3c7"/><stop offset=".4" stop-color="#f59e0b"/><stop offset=".75" stop-color="#be123c"/><stop offset="1" stop-color="#1e3a8a"/></radialGradient>
      <radialGradient id="${lua}"><stop offset="0" stop-color="#fefce8" stop-opacity=".5"/><stop offset="1" stop-color="#fefce8" stop-opacity="0"/></radialGradient>
      ${filtroDeBrilho(brilho, 1.6)}
    </defs>
    <rect width="320" height="80" fill="url(#${ceu})"/>
    ${estrelas}
    <circle cx="160" cy="18" r="16" fill="url(#${lua})"/><circle cx="160" cy="18" r="6" fill="#fefce8" filter="url(#${brilho})"/>
    <g opacity=".16"><ellipse cx="255" cy="62" rx="70" ry="22" fill="#f59e0b" class="enf-respira"/></g>
    <g fill="url(#${pedra})">
      <path d="M200 80V40l6-12 6 12v40z"/><path d="M298 80V40l6-12 6 12v40z"/>
      <rect x="208" y="44" width="96" height="36"/>
      <path d="M236 44V22l20-16 20 16v22z"/><path d="M252 7l4-15 4 15z"/>
    </g>
    <path d="M254.6 -12v8M252 -9h6" stroke="#fde68a" stroke-width="1.2"/>
    <circle cx="256" cy="30" r="9" fill="url(#${vitral})" filter="url(#${brilho})" class="enf-respira"/>
    <g stroke="#0b0712" stroke-width=".8" opacity=".8"><path d="M256 21v18M247 30h18M249.6 23.6l12.8 12.8M262.4 23.6l-12.8 12.8"/></g>
    <path d="M249 80V64a7 7 0 0 1 14 0v16z" fill="#fbbf24" opacity=".85" class="enf-respira" style="--d:3s"/>
    ${janelas}`;
  },

  'mar-da-galileia'() {
    const ceu = idDoEnfeite('ceu');
    const sol = idDoEnfeite('sol');
    const mar = idDoEnfeite('mar');
    const vela = idDoEnfeite('vela');
    const brilho = idDoEnfeite('brilho');
    const onda = (y, cor, opacidade, dur, atraso) => `<g class="enf-onda" style="--d:${dur}s;--a:${atraso}s"><path d="M0 ${y}${Array.from({ length: 14 }, (_, i) => `q15 ${i % 2 ? 3 : -3} 30 0`).join('')}V80H0Z" fill="${cor}" opacity="${opacidade}"/></g>`;
    return `<defs>
      <linearGradient id="${ceu}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1e3a8a"/><stop offset=".45" stop-color="#c2410c"/><stop offset=".75" stop-color="#fb923c"/><stop offset="1" stop-color="#fde68a"/></linearGradient>
      <radialGradient id="${sol}" gradientUnits="userSpaceOnUse" cx="250" cy="50" r="50"><stop offset="0" stop-color="#fffbeb"/><stop offset=".25" stop-color="#fde68a"/><stop offset="1" stop-color="#fb923c" stop-opacity="0"/></radialGradient>
      <linearGradient id="${mar}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0e7490"/><stop offset="1" stop-color="#082f49"/></linearGradient>
      <linearGradient id="${vela}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fffbeb"/><stop offset="1" stop-color="#fcd34d"/></linearGradient>
      ${filtroDeBrilho(brilho, 1.5)}
    </defs>
    <rect width="320" height="80" fill="url(#${ceu})"/>
    <circle cx="250" cy="50" r="50" fill="url(#${sol})" class="enf-respira"/>
    <circle cx="250" cy="52" r="11" fill="#fffbeb" filter="url(#${brilho})"/>
    <g class="enf-nuvem" style="--d:30s">${nuvem(180, 18, 1.2, '#fed7aa', 0.45)}${nuvem(290, 14, 0.9, '#fecaca', 0.4)}</g>
    <rect y="52" width="320" height="28" fill="url(#${mar})"/>
    <path d="M238 56h24M242 60h16M245 64h10" stroke="#fde68a" stroke-width="1.4" opacity=".7" class="enf-respira" style="--d:2.2s"/>
    <g transform="translate(205 50)"><g class="enf-balanca" style="transform-origin:0 6px">
      <path d="M-16 4H16L11 11H-11Z" fill="#78350f"/><path d="M0 4V-22" stroke="#451a03" stroke-width="1.4"/>
      <path d="M1 -21L15 2H1Z" fill="url(#${vela})"/><path d="M-1 -17L-11 1H-1Z" fill="#fef3c7" opacity=".9"/>
    </g></g>
    ${onda(58, '#155e75', 0.75, 7, 0)}${onda(64, '#0e7490', 0.65, 9, -3)}${onda(70, '#164e63', 0.85, 6, -1)}
    <g transform="translate(330 0)"><g class="enf-voa" style="--d:13s"><path class="enf-asa-v" style="--d:.5s" d="M-5 20Q-2.5 17 0 20Q2.5 17 5 20" stroke="#1f1033" stroke-width="1.2" fill="none"/></g></g>`;
  },

  'campo-de-lirios'() {
    const ceu = idDoEnfeite('ceu');
    const sol = idDoEnfeite('sol');
    const morro = idDoEnfeite('morro');
    const sorteio = sorteioFixo(23);
    return `<defs>
      <linearGradient id="${ceu}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#38bdf8"/><stop offset=".7" stop-color="#bae6fd"/><stop offset="1" stop-color="#fef3c7"/></linearGradient>
      <radialGradient id="${sol}" gradientUnits="userSpaceOnUse" cx="296" cy="12" r="70"><stop offset="0" stop-color="#fffbeb" stop-opacity=".95"/><stop offset=".3" stop-color="#fef3c7" stop-opacity=".5"/><stop offset="1" stop-color="#fef3c7" stop-opacity="0"/></radialGradient>
      <linearGradient id="${morro}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#86efac"/><stop offset="1" stop-color="#15803d"/></linearGradient>
    </defs>
    <rect width="320" height="80" fill="url(#${ceu})"/>
    <rect width="320" height="80" fill="url(#${sol})" class="enf-respira"/>
    <g class="enf-nuvem" style="--d:32s">${nuvem(200, 16, 1.3, '#ffffff', 0.7)}${nuvem(270, 30, 1, '#ffffff', 0.6)}</g>
    <path d="M120 80C170 58 220 56 260 60C290 63 306 58 320 54V80Z" fill="url(#${morro})"/>
    ${liriosDoCampo(sorteio)}
    ${borboleta(240, 30, '#f472b6', 14, 0)}${borboleta(280, 18, '#facc15', 17, -6)}${borboleta(200, 40, '#a78bfa', 15, -11)}`;
  },

  'chuva-de-rosas'() {
    const ceu = idDoEnfeite('ceu');
    const luz = idDoEnfeite('luz');
    const rosa = idDoEnfeite('rosa');
    const sorteio = sorteioFixo(31);
    let petalas = '';
    for (let i = 0; i < 22; i += 1) {
      const x = n1(130 + sorteio() * 190);
      const escala = n1(0.7 + sorteio() * 0.7);
      const cor = i % 3 ? '#fda4af' : '#e11d48';
      petalas += `<g transform="translate(${x} -8)"><g class="enf-cai-longo" style="--a:${n1(-sorteio() * 8)}s;--d:${n1(6 + sorteio() * 4)}s"><path transform="scale(${escala})" d="M0 3C3 1 2.5 -3 .4 -2.4Q0 -1.7 -.4 -2.4C-2.5 -3 -3 1 0 3Z" fill="${cor}"/></g></g>`;
    }
    const flor = (x, y, e) => `<g transform="translate(${x} ${y}) scale(${e})"><circle r="6" fill="url(#${rosa})"/><path d="M-3 -1C-2 -4 2 -4 3 -1C2 1 -2 1 -3 -1Z" fill="#9f1239" opacity=".6"/><path d="M-6 3C-9 6 -6 9 -2 7M6 3C9 6 6 9 2 7" fill="#4d7c0f"/></g>`;
    return `<defs>
      <linearGradient id="${ceu}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4c1d95"/><stop offset=".5" stop-color="#be185d"/><stop offset="1" stop-color="#fda4af"/></linearGradient>
      <radialGradient id="${luz}" gradientUnits="userSpaceOnUse" cx="260" cy="0" r="90"><stop offset="0" stop-color="#fff1f2" stop-opacity=".85"/><stop offset="1" stop-color="#fff1f2" stop-opacity="0"/></radialGradient>
      <radialGradient id="${rosa}" cx="40%" cy="35%" r="70%"><stop offset="0" stop-color="#fecdd3"/><stop offset=".5" stop-color="#e11d48"/><stop offset="1" stop-color="#881337"/></radialGradient>
    </defs>
    <rect width="320" height="80" fill="url(#${ceu})"/>
    <rect width="320" height="80" fill="url(#${luz})" class="enf-respira"/>
    ${petalas}
    <path d="M190 80C220 66 270 64 320 70V80Z" fill="#14532d" opacity=".9"/>
    ${flor(232, 70, 1.1)}${flor(262, 66, 1.3)}${flor(292, 70, 1.05)}${flor(312, 64, 0.9)}`;
  },
};

Object.assign(MOLDURAS, MOLDURAS_NOVAS);
Object.assign(FAIXAS, FAIXAS_NOVAS);

function svgDaFaixa(id) {
  const desenho = FAIXAS[id];
  if (!desenho) return '';
  return `<svg class="enfeite-faixa-svg" viewBox="0 0 320 80" preserveAspectRatio="xMaxYMid slice" aria-hidden="true" focusable="false">${desenho()}</svg>`;
}

function suave(t) {
  const x = Math.min(1, Math.max(0, t));
  return x * x * (3 - 2 * x);
}

function desenharFaisca(ctx, x, y, raio, cor, alfa) {
  if (alfa <= 0) return;
  ctx.save();
  ctx.globalAlpha *= alfa;
  ctx.translate(x, y);
  ctx.fillStyle = cor;
  ctx.beginPath();
  ctx.moveTo(0, -raio);
  ctx.quadraticCurveTo(raio * 0.18, -raio * 0.18, raio, 0);
  ctx.quadraticCurveTo(raio * 0.18, raio * 0.18, 0, raio);
  ctx.quadraticCurveTo(-raio * 0.18, raio * 0.18, -raio, 0);
  ctx.quadraticCurveTo(-raio * 0.18, -raio * 0.18, 0, -raio);
  ctx.fill();
  ctx.restore();
}

function desenharLuz(ctx, x, y, raio, cor, alfa) {
  if (alfa <= 0 || raio <= 0) return;
  const g = ctx.createRadialGradient(x, y, 0, x, y, raio);
  g.addColorStop(0, `rgba(${cor}, ${alfa})`);
  g.addColorStop(1, `rgba(${cor}, 0)`);
  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.arc(x, y, raio, 0, Math.PI * 2);
  ctx.fill();
}

function efeitoEstrelasCadentes(w, h) {
  const dx = Math.cos(Math.PI * 0.72);
  const dy = Math.sin(Math.PI * 0.72);
  const meteoros = Array.from({ length: 17 }, (_, i) => ({
    x: w * (0.3 + Math.random() * 0.95),
    y: -30 - Math.random() * h * 0.2,
    v: 480 + Math.random() * 360,
    inicio: i * 0.13 + Math.random() * 0.2,
    cauda: 70 + Math.random() * 100,
    grossura: 1.3 + Math.random() * 1.8,
    fim: h * (0.35 + Math.random() * 0.5),
    estourou: false,
  }));
  const brilhos = Array.from({ length: 30 }, () => ({ x: Math.random() * w, y: Math.random() * h * 0.85, r: 2 + Math.random() * 4, fase: Math.random() * 6, inicio: Math.random() * 1.8 }));
  const pedacos = [];
  let anterior = 0;
  return (ctx, s) => {
    const passo = Math.min(0.05, s - anterior);
    anterior = s;
    brilhos.forEach((b) => {
      if (s < b.inicio) return;
      desenharFaisca(ctx, b.x, b.y, b.r, '#fef3c7', (0.35 + 0.65 * Math.abs(Math.sin(s * 3 + b.fase))) * Math.min(1, (s - b.inicio) * 2));
    });
    meteoros.forEach((m) => {
      if (s < m.inicio || m.estourou) return;
      const d = (s - m.inicio) * m.v;
      const x = m.x + dx * d;
      const y = m.y + dy * d;
      if (y > m.fim) {
        m.estourou = true;
        for (let k = 0; k < 9; k += 1) {
          const a = Math.random() * Math.PI * 2;
          const v = 40 + Math.random() * 90;
          pedacos.push({ x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v - 30, vida: 0.7 + Math.random() * 0.5, idade: 0 });
        }
        return;
      }
      const g = ctx.createLinearGradient(x, y, x - dx * m.cauda, y - dy * m.cauda);
      g.addColorStop(0, 'rgba(255, 251, 235, 1)');
      g.addColorStop(0.25, 'rgba(253, 224, 71, 0.75)');
      g.addColorStop(1, 'rgba(245, 158, 11, 0)');
      ctx.strokeStyle = g;
      ctx.lineWidth = m.grossura;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x - dx * m.cauda, y - dy * m.cauda);
      ctx.stroke();
      desenharLuz(ctx, x, y, 9, '255, 247, 214', 0.95);
      desenharFaisca(ctx, x, y, 5, '#ffffff', 1);
    });
    for (let i = pedacos.length - 1; i >= 0; i -= 1) {
      const p = pedacos[i];
      p.idade += passo;
      if (p.idade > p.vida) { pedacos.splice(i, 1); continue; }
      p.vy += 120 * passo;
      p.x += p.vx * passo;
      p.y += p.vy * passo;
      desenharFaisca(ctx, p.x, p.y, 3.2, '#fde68a', 1 - p.idade / p.vida);
    }
  };
}

function pombaDeFrente(ctx, x, y, tamanho, asa, alfa) {
  if (alfa <= 0) return;
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(tamanho, tamanho);
  ctx.globalAlpha *= alfa;
  ctx.shadowColor = 'rgba(253, 230, 138, 0.95)';
  ctx.shadowBlur = 22;
  ctx.fillStyle = '#ffffff';
  [-1, 1].forEach((lado) => {
    ctx.beginPath();
    ctx.moveTo(0, -3);
    ctx.bezierCurveTo(lado * 9, -9 - asa * 6, lado * 21, -17 - asa * 10, lado * 33, -15 - asa * 15);
    ctx.bezierCurveTo(lado * 29, -11 - asa * 11, lado * 30, -8 - asa * 8, lado * 25, -6 - asa * 6);
    ctx.bezierCurveTo(lado * 26, -3 - asa * 4, lado * 22, -2 - asa * 3, lado * 18, -1 - asa * 2);
    ctx.bezierCurveTo(lado * 13, 1, lado * 7, 3, 0, 4);
    ctx.closePath();
    ctx.fill();
  });
  ctx.beginPath();
  ctx.ellipse(0, 3, 5.2, 11, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(-4.5, -5);
  ctx.lineTo(-6, -15);
  ctx.lineTo(0, -12);
  ctx.lineTo(6, -15);
  ctx.lineTo(4.5, -5);
  ctx.closePath();
  ctx.fill();
  ctx.beginPath();
  ctx.arc(0, 15.5, 4.4, 0, Math.PI * 2);
  ctx.fill();
  ctx.shadowBlur = 0;
  ctx.strokeStyle = 'rgba(148, 163, 184, 0.75)';
  ctx.lineWidth = 0.7;
  ctx.lineCap = 'round';
  [-1, 1].forEach((lado) => {
    [[0.35, 0.55], [0.55, 0.72], [0.75, 0.88]].forEach(([de, ate]) => {
      ctx.beginPath();
      ctx.moveTo(lado * 33 * de, -15 * de - asa * 15 * de + 2);
      ctx.quadraticCurveTo(lado * 33 * ((de + ate) / 2), -8 - asa * 8 * ate, lado * 33 * ate - lado * 4, -4 - asa * 5 * ate);
      ctx.stroke();
    });
  });
  ctx.fillStyle = '#f59e0b';
  ctx.beginPath();
  ctx.moveTo(-1.4, 19.2);
  ctx.lineTo(0, 22.5);
  ctx.lineTo(1.4, 19.2);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

function gloriaDourada(ctx, x, y, raio, giro, alfa) {
  if (alfa <= 0) return;
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(giro);
  for (let k = 0; k < 32; k += 1) {
    ctx.rotate((Math.PI * 2) / 32);
    const tamanho = raio * (k % 2 ? 0.72 : 1);
    const g = ctx.createLinearGradient(0, 0, 0, -tamanho);
    g.addColorStop(0, `rgba(255, 247, 214, ${0.75 * alfa})`);
    g.addColorStop(0.5, `rgba(250, 204, 21, ${0.35 * alfa})`);
    g.addColorStop(1, 'rgba(250, 204, 21, 0)');
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.moveTo(-raio * 0.035, 0);
    ctx.lineTo(0, -tamanho);
    ctx.lineTo(raio * 0.035, 0);
    ctx.closePath();
    ctx.fill();
  }
  ctx.restore();
  desenharLuz(ctx, x, y, raio * 0.55, '255, 244, 196', 0.8 * alfa);
}

function passarinho(ctx, x, y, tamanho, asa, alfa, giro) {
  if (alfa <= 0) return;
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(giro);
  ctx.scale(tamanho, tamanho);
  ctx.globalAlpha *= alfa;
  ctx.shadowColor = 'rgba(254, 243, 199, 0.9)';
  ctx.shadowBlur = 10;
  ctx.strokeStyle = '#ffffff';
  ctx.fillStyle = '#ffffff';
  ctx.lineWidth = 2.4;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(-11, -asa * 4);
  ctx.quadraticCurveTo(-5, -7 * asa - 2, 0, 0);
  ctx.quadraticCurveTo(5, -7 * asa - 2, 11, -asa * 4);
  ctx.stroke();
  ctx.beginPath();
  ctx.ellipse(0, 1, 2.2, 3.4, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function efeitoPombas(w, h) {
  const cx = w / 2;
  const pouso = Math.min(h * 0.3, 150);
  const bando = Array.from({ length: 12 }, (_, i) => {
    const a = -Math.PI / 2 + (i / 11 - 0.5) * Math.PI * 1.5 + (Math.random() - 0.5) * 0.3;
    return { a, v: 120 + Math.random() * 110, fase: Math.random() * 6, tam: 0.8 + Math.random() * 0.6, atraso: Math.random() * 0.25 };
  });
  const po = Array.from({ length: 40 }, () => ({ x: cx + (Math.random() - 0.5) * w * 0.3, y: -Math.random() * h * 0.6, v: 40 + Math.random() * 60, fase: Math.random() * 6, r: 1.5 + Math.random() * 2.5 }));
  return (ctx, s) => {
    const facho = Math.min(1, s / 0.6) * (1 - suave((s - 2.2) / 0.9));
    if (facho > 0) {
      const fundo = Math.min(h, pouso + 170);
      const g = ctx.createLinearGradient(0, 0, 0, fundo);
      g.addColorStop(0, `rgba(254, 243, 199, ${0.42 * facho})`);
      g.addColorStop(0.6, `rgba(253, 230, 138, ${0.12 * facho})`);
      g.addColorStop(1, 'rgba(253, 230, 138, 0)');
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.moveTo(cx - 16, 0);
      ctx.lineTo(cx + 16, 0);
      ctx.lineTo(cx + w * 0.2, fundo);
      ctx.lineTo(cx - w * 0.2, fundo);
      ctx.closePath();
      ctx.fill();
    }
    po.forEach((p) => {
      const y = p.y + s * p.v;
      if (y < 0 || y > h) return;
      desenharFaisca(ctx, p.x + Math.sin(s * 2 + p.fase) * 10, y, p.r, '#fde68a', facho * (0.5 + 0.5 * Math.sin(s * 5 + p.fase)));
    });
    const descida = suave(s / 1.3);
    const subida = suave((s - 1.7) / 1.2);
    const yGrande = -70 + (pouso + 70) * descida - subida * 60;
    const alfaGrande = Math.min(1, s * 3) * (1 - subida);
    const tamanhoDaPomba = Math.min(w, 360, h * 1.3) / 160;
    gloriaDourada(ctx, cx, yGrande + 6 * tamanhoDaPomba, 64 * tamanhoDaPomba * (0.9 + 0.1 * Math.sin(s * 3)), s * 0.35, alfaGrande * suave((s - 0.5) / 0.7));
    pombaDeFrente(ctx, cx, yGrande, tamanhoDaPomba, Math.sin(s * 8), alfaGrande);
    if (s > 1.45) {
      const t = s - 1.45;
      bando.forEach((b) => {
        const tt = t - b.atraso;
        if (tt <= 0) return;
        const x = cx + Math.cos(b.a) * b.v * tt;
        const y = pouso + Math.sin(b.a) * b.v * tt - 16 * tt * tt;
        passarinho(ctx, x, y, b.tam, Math.sin(s * 11 + b.fase), Math.min(1, tt * 4) * (1 - suave((tt - 1.4) / 0.8)), Math.cos(b.a) * 0.25);
      });
    }
  };
}

function efeitoVitral(w, h) {
  const cx = w / 2;
  const R = Math.min(w * 0.4, h * 0.34, 150);
  const cy = Math.max(R * 1.02, Math.min(h * 0.33, 165));
  const CORES = [['#1e3a8a', '#60a5fa'], ['#7f1d1d', '#f87171'], ['#78350f', '#fcd34d'], ['#14532d', '#4ade80'], ['#4c1d95', '#c4b5fd']];
  const pecas = [];
  const pol = (r, a) => [cx + r * Math.cos(a), cy + r * Math.sin(a)];
  for (let k = 0; k < 8; k += 1) {
    const a = (k * Math.PI) / 4;
    pecas.push({ tipo: 'petala', a, r0: R * 0.15, r1: R * 0.44, cor: CORES[k % 2], atraso: 0.18 + k * 0.05 });
  }
  for (let k = 0; k < 16; k += 1) {
    const a = (k * Math.PI) / 8 + Math.PI / 16;
    pecas.push({ tipo: 'arco', a, r0: R * 0.46, r1: R * 0.76, cor: CORES[[2, 3, 0, 4][k % 4]], atraso: 0.6 + k * 0.035 });
  }
  for (let k = 0; k < 16; k += 1) {
    const a = (k * Math.PI) / 8;
    pecas.push({ tipo: 'bola', a, r0: R * 0.86, r1: R * 0.075, cor: CORES[k % 2 ? 1 : 0], atraso: 1.1 + k * 0.025 });
  }
  const cacos = [];
  let quebrou = false;
  let anterior = 0;
  const caminho = (ctx, p) => {
    ctx.beginPath();
    if (p.tipo === 'petala') {
      const [x0, y0] = pol(p.r0, p.a);
      const [xa, ya] = pol(p.r1 * 0.78, p.a - 0.33);
      const [x1, y1] = pol(p.r1, p.a);
      const [xb, yb] = pol(p.r1 * 0.78, p.a + 0.33);
      ctx.moveTo(x0, y0);
      ctx.quadraticCurveTo(xa, ya, x1, y1);
      ctx.quadraticCurveTo(xb, yb, x0, y0);
    } else if (p.tipo === 'arco') {
      const largura = Math.PI / 8 * 0.42;
      const [x0, y0] = pol(p.r0, p.a - largura);
      const [x1, y1] = pol(p.r1 * 0.9, p.a - largura);
      const [x2, y2] = pol(p.r1, p.a);
      const [x3, y3] = pol(p.r1 * 0.9, p.a + largura);
      ctx.moveTo(x0, y0);
      ctx.lineTo(x1, y1);
      ctx.quadraticCurveTo(...pol(p.r1 * 0.99, p.a - largura * 0.6), x2, y2);
      ctx.quadraticCurveTo(...pol(p.r1 * 0.99, p.a + largura * 0.6), x3, y3);
      ctx.lineTo(...pol(p.r0, p.a + largura));
      ctx.arc(cx, cy, p.r0, p.a + largura, p.a - largura, true);
    } else {
      const [x, y] = pol(p.r0, p.a);
      ctx.arc(x, y, p.r1, 0, Math.PI * 2);
    }
    ctx.closePath();
  };
  return (ctx, s) => {
    const passo = Math.min(0.05, s - anterior);
    anterior = s;
    const fim = suave((s - 2.55) / 0.5);
    if (s > 1.35) {
      const forca = Math.min(1, (s - 1.35) * 1.5) * (1 - fim);
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(s * 0.25);
      for (let k = 0; k < 16; k += 1) {
        ctx.rotate(Math.PI / 8);
        const g = ctx.createLinearGradient(0, 0, 0, -R * 2.2);
        g.addColorStop(0, `rgba(254, 243, 199, ${0.32 * forca})`);
        g.addColorStop(1, 'rgba(254, 243, 199, 0)');
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.moveTo(-R * 0.06, 0);
        ctx.lineTo(0, -R * 2.2);
        ctx.lineTo(R * 0.06, 0);
        ctx.fill();
      }
      ctx.restore();
    }
    if (s > 2.55 && !quebrou) {
      quebrou = true;
      pecas.forEach((p) => {
        const [x, y] = pol(p.tipo === 'bola' ? p.r0 : (p.r0 + p.r1) / 2, p.a);
        for (let k = 0; k < 3; k += 1) {
          const v = 60 + Math.random() * 160;
          const a = p.a + (Math.random() - 0.5) * 0.8;
          cacos.push({ x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v, giro: Math.random() * 6, vg: (Math.random() - 0.5) * 10, cor: p.cor[1], tam: 3 + Math.random() * 4, idade: 0 });
        }
      });
    }
    if (fim < 1) {
      ctx.save();
      ctx.globalAlpha *= 1 - fim;
      const escala = 1 + fim * 0.12;
      ctx.translate(cx, cy);
      ctx.scale(escala, escala);
      ctx.translate(-cx, -cy);
      const acesa = s > 1.35 ? 0.5 + 0.5 * Math.sin((s - 1.35) * 4) : 0;
      ctx.shadowColor = 'rgba(253, 224, 71, 0.9)';
      ctx.shadowBlur = 18 * acesa;
      pecas.forEach((p) => {
        const t = suave((s - p.atraso) / 0.35);
        if (t <= 0) return;
        ctx.save();
        ctx.globalAlpha *= t;
        const g = ctx.createRadialGradient(cx, cy, p.tipo === 'bola' ? p.r0 - p.r1 : p.r0, cx, cy, p.tipo === 'bola' ? p.r0 + p.r1 : p.r1);
        g.addColorStop(0, p.cor[1]);
        g.addColorStop(1, p.cor[0]);
        ctx.fillStyle = g;
        caminho(ctx, p);
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.strokeStyle = '#1c1917';
        ctx.lineWidth = 2.2;
        ctx.stroke();
        ctx.restore();
      });
      const miolo = suave(s / 0.3);
      if (miolo > 0) {
        ctx.save();
        ctx.globalAlpha *= miolo;
        const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, R * 0.15);
        g.addColorStop(0, '#fffbeb');
        g.addColorStop(1, '#f59e0b');
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(cx, cy, R * 0.14, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#1c1917';
        ctx.lineWidth = 2.2;
        ctx.stroke();
        ctx.restore();
      }
      const aro = suave((s - 1.2) / 0.4);
      if (aro > 0) {
        ctx.save();
        ctx.globalAlpha *= aro;
        ctx.strokeStyle = '#e2b53a';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.arc(cx, cy, R * 0.97, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }
      ctx.restore();
    }
    cacos.forEach((c) => {
      c.idade += passo;
      c.x += c.vx * passo;
      c.y += c.vy * passo;
      c.vy += 90 * passo;
      c.giro += c.vg * passo;
      const alfa = 1 - c.idade / 1.1;
      if (alfa <= 0) return;
      ctx.save();
      ctx.globalAlpha *= alfa;
      ctx.translate(c.x, c.y);
      ctx.rotate(c.giro);
      ctx.fillStyle = c.cor;
      ctx.shadowColor = c.cor;
      ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.moveTo(-c.tam, -c.tam * 0.4);
      ctx.lineTo(c.tam * 0.8, -c.tam * 0.7);
      ctx.lineTo(c.tam * 0.3, c.tam * 0.8);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    });
  };
}

function efeitoPetalas(w, h) {
  const CORES = [['#fecdd3', '#e11d48'], ['#fda4af', '#be123c'], ['#ffe4e6', '#f43f5e'], ['#fecaca', '#dc2626']];
  const petalas = Array.from({ length: 48 }, () => ({
    x: Math.random() * w,
    y: -20 - Math.random() * h * 0.5,
    v: 70 + Math.random() * 80,
    balanco: 18 + Math.random() * 36,
    fase: Math.random() * 6,
    giro: (Math.random() - 0.5) * 3,
    vira: 2 + Math.random() * 3,
    tam: 5 + Math.random() * 6,
    cor: CORES[Math.floor(Math.random() * CORES.length)],
    inicio: Math.random() * 1.1,
  }));
  return (ctx, s) => {
    const rosa = Math.min(1, s * 2) * (1 - suave((s - 1.2) / 1.2));
    if (rosa > 0) {
      const g = ctx.createLinearGradient(0, 0, 0, h * 0.5);
      g.addColorStop(0, `rgba(251, 113, 133, ${0.28 * rosa})`);
      g.addColorStop(1, 'rgba(251, 113, 133, 0)');
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h * 0.5);
    }
    petalas.forEach((p) => {
      const t = s - p.inicio;
      if (t <= 0) return;
      const y = p.y + t * p.v * (1 + t * 0.25);
      if (y > h + 20) return;
      const x = p.x + Math.sin(t * 1.7 + p.fase) * p.balanco;
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(p.fase + t * p.giro);
      ctx.scale(Math.cos(t * p.vira + p.fase), 1);
      const g = ctx.createLinearGradient(0, -p.tam, 0, p.tam);
      g.addColorStop(0, p.cor[0]);
      g.addColorStop(1, p.cor[1]);
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.moveTo(0, p.tam);
      ctx.bezierCurveTo(p.tam * 0.95, p.tam * 0.35, p.tam * 0.8, -p.tam * 0.9, p.tam * 0.12, -p.tam * 0.75);
      ctx.quadraticCurveTo(0, -p.tam * 0.55, -p.tam * 0.12, -p.tam * 0.75);
      ctx.bezierCurveTo(-p.tam * 0.8, -p.tam * 0.9, -p.tam * 0.95, p.tam * 0.35, 0, p.tam);
      ctx.fill();
      ctx.restore();
    });
  };
}

function desenharSino(ctx, x, y, tamanho, angulo) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angulo);
  ctx.scale(tamanho, tamanho);
  const g = ctx.createLinearGradient(-17, 0, 17, 0);
  g.addColorStop(0, '#78350f');
  g.addColorStop(0.25, '#d97706');
  g.addColorStop(0.45, '#fde68a');
  g.addColorStop(0.6, '#fbbf24');
  g.addColorStop(1, '#78350f');
  ctx.shadowColor = 'rgba(253, 224, 71, 0.6)';
  ctx.shadowBlur = 14;
  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.moveTo(-5, 4);
  ctx.bezierCurveTo(-10, 5, -11, 16, -12, 24);
  ctx.quadraticCurveTo(-14, 30, -18, 32);
  ctx.lineTo(18, 32);
  ctx.quadraticCurveTo(14, 30, 12, 24);
  ctx.bezierCurveTo(11, 16, 10, 5, 5, 4);
  ctx.closePath();
  ctx.fill();
  ctx.shadowBlur = 0;
  ctx.fillStyle = '#92400e';
  ctx.beginPath();
  ctx.ellipse(0, 32, 18, 2.6, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#fde68a';
  ctx.lineWidth = 1.6;
  ctx.beginPath();
  ctx.arc(0, 2, 3.2, Math.PI, 0);
  ctx.stroke();
  ctx.fillStyle = '#78350f';
  ctx.beginPath();
  ctx.arc(-Math.sin(angulo) * 9, 34, 3.2, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function efeitoSinos(w, h) {
  const topo = Math.min(h * 0.14, 64);
  const sinos = [{ x: w * 0.33, fase: 0 }, { x: w * 0.67, fase: Math.PI }];
  const tamanho = Math.min(w, 380) / 170;
  const ondas = [];
  const notas = [];
  let proxima = 0.45;
  let lado = 0;
  let anterior = 0;
  return (ctx, s) => {
    const passo = Math.min(0.05, s - anterior);
    anterior = s;
    const forca = suave(s / 0.4) * (1 - suave((s - 2.6) / 0.9));
    const aparece = suave(s / 0.35) * (1 - suave((s - 3.1) / 0.6));
    ctx.save();
    ctx.globalAlpha *= aparece;
    ctx.strokeStyle = '#b45309';
    ctx.lineWidth = 4 * tamanho;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(w * 0.22, topo - 8 * tamanho);
    ctx.lineTo(w * 0.78, topo - 8 * tamanho);
    ctx.stroke();
    ctx.fillStyle = '#fbbf24';
    ctx.fillRect(w / 2 - 1.8 * tamanho, topo - 30 * tamanho, 3.6 * tamanho, 18 * tamanho);
    ctx.fillRect(w / 2 - 7 * tamanho, topo - 25 * tamanho, 14 * tamanho, 3.4 * tamanho);
    sinos.forEach((sino) => {
      desenharSino(ctx, sino.x, topo - 8 * tamanho, tamanho, Math.sin(s * 4.2 + sino.fase) * 0.55 * forca);
    });
    ctx.restore();
    if (s > proxima && s < 2.9) {
      const sino = sinos[lado % 2];
      lado += 1;
      proxima += 0.75 / 2;
      const boca = topo + 26 * tamanho;
      ondas.push({ x: sino.x, y: boca, idade: 0 });
      for (let k = 0; k < 3; k += 1) {
        notas.push({ x: sino.x + (Math.random() - 0.5) * 30, y: boca, vx: (Math.random() - 0.5) * 50, vy: -30 - Math.random() * 30, idade: 0, texto: k % 2 ? '♪' : '♫' });
      }
    }
    ondas.forEach((o) => {
      o.idade += passo;
      const t = o.idade / 1.1;
      if (t >= 1) return;
      ctx.strokeStyle = `rgba(253, 230, 138, ${0.8 * (1 - t)})`;
      ctx.lineWidth = 2.4 * (1 - t) + 0.5;
      [1, 1.45].forEach((f) => {
        ctx.beginPath();
        ctx.arc(o.x, o.y, (12 + t * 80) * f, Math.PI * 0.15, Math.PI * 0.85);
        ctx.stroke();
      });
    });
    notas.forEach((n) => {
      n.idade += passo;
      const t = n.idade / 1.4;
      if (t >= 1) return;
      n.x += n.vx * passo;
      n.y += (n.vy + 90) * passo;
      ctx.save();
      ctx.globalAlpha *= 1 - t;
      ctx.fillStyle = '#fde68a';
      ctx.shadowColor = 'rgba(253, 230, 138, 0.9)';
      ctx.shadowBlur = 8;
      ctx.font = `${Math.round(16 * tamanho)}px serif`;
      ctx.fillText(n.texto, n.x, n.y);
      ctx.restore();
    });
  };
}

function desenharChama(ctx, x, y, tamanho, s, fase, alfa) {
  if (alfa <= 0) return;
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(tamanho * (1 + Math.sin(s * 13 + fase) * 0.06), tamanho * (1 + Math.sin(s * 19 + fase) * 0.1));
  ctx.globalAlpha *= alfa;
  ctx.shadowColor = 'rgba(251, 146, 60, 0.95)';
  ctx.shadowBlur = 16;
  const g = ctx.createLinearGradient(0, -17, 0, 8);
  g.addColorStop(0, 'rgba(220, 38, 38, 0)');
  g.addColorStop(0.22, '#ea580c');
  g.addColorStop(0.62, '#fbbf24');
  g.addColorStop(1, '#fef3c7');
  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.moveTo(Math.sin(s * 9 + fase) * 1.6, -17);
  ctx.bezierCurveTo(4, -10, 8, -4, 7, 1);
  ctx.bezierCurveTo(6.5, 5.5, 3.5, 8, 0, 8);
  ctx.bezierCurveTo(-3.5, 8, -6.5, 5.5, -7, 1);
  ctx.bezierCurveTo(-8, -4, -4, -10, Math.sin(s * 9 + fase) * 1.6, -17);
  ctx.fill();
  ctx.shadowBlur = 0;
  ctx.fillStyle = 'rgba(255, 251, 235, 0.95)';
  ctx.beginPath();
  ctx.ellipse(0, 3.4, 2.5, 3.9, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function efeitoLinguasDeFogo(w, h) {
  const total = Math.max(7, Math.min(13, Math.round(w / 34)));
  const linguas = Array.from({ length: total }, (_, i) => ({
    x: w * (0.08 + 0.84 * ((i + 0.5) / total)) + (Math.random() - 0.5) * 16,
    alvo: h * (0.16 + Math.random() * 0.46),
    inicio: 0.12 + Math.random() * 1.1,
    tam: 1.15 + Math.random() * 0.7,
    fase: Math.random() * 6,
  }));
  const faiscas = [];
  let anterior = 0;
  return (ctx, s) => {
    const passo = Math.min(0.05, s - anterior);
    anterior = s;
    const brilho = suave(s / 0.6) * (1 - suave((s - 2.8) / 0.8));
    if (brilho > 0) {
      const g = ctx.createLinearGradient(0, 0, 0, h * 0.5);
      g.addColorStop(0, `rgba(249, 115, 22, ${0.34 * brilho})`);
      g.addColorStop(1, 'rgba(249, 115, 22, 0)');
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h * 0.5);
    }
    linguas.forEach((l) => {
      const t = s - l.inicio;
      if (t <= 0) return;
      const y = -24 + (l.alvo + 24) * suave(t / 0.95);
      const x = l.x + Math.sin(t * 2.2 + l.fase) * 6;
      const alfa = Math.min(1, t * 3);
      desenharLuz(ctx, x, y, 30 * l.tam, '251, 146, 60', 0.32 * alfa);
      desenharChama(ctx, x, y, l.tam, s, l.fase, alfa);
      if (Math.random() < 0.16 * (passo / 0.016)) {
        faiscas.push({ x: x + (Math.random() - 0.5) * 8, y: y - 12 * l.tam, vx: (Math.random() - 0.5) * 34, vy: -45 - Math.random() * 55, idade: 0, vida: 0.5 + Math.random() * 0.5 });
      }
    });
    for (let i = faiscas.length - 1; i >= 0; i -= 1) {
      const f = faiscas[i];
      f.idade += passo;
      if (f.idade > f.vida) { faiscas.splice(i, 1); continue; }
      f.x += f.vx * passo;
      f.y += f.vy * passo;
      desenharFaisca(ctx, f.x, f.y, 2.4, '#fed7aa', 1 - f.idade / f.vida);
    }
  };
}

function desenharTuribulo(ctx, x, y, tamanho) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(tamanho, tamanho);
  ctx.shadowColor = 'rgba(253, 224, 71, 0.55)';
  ctx.shadowBlur = 12;
  const g = ctx.createLinearGradient(-14, 0, 14, 0);
  g.addColorStop(0, '#78350f');
  g.addColorStop(0.35, '#d97706');
  g.addColorStop(0.5, '#fde68a');
  g.addColorStop(0.7, '#f59e0b');
  g.addColorStop(1, '#78350f');
  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.moveTo(-12, 0);
  ctx.quadraticCurveTo(-12, -14, 0, -16);
  ctx.quadraticCurveTo(12, -14, 12, 0);
  ctx.closePath();
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(-14, 0);
  ctx.lineTo(14, 0);
  ctx.quadraticCurveTo(13, 13, 0, 14);
  ctx.quadraticCurveTo(-13, 13, -14, 0);
  ctx.fill();
  ctx.fillRect(-5, 13, 10, 4);
  ctx.fillRect(-8, 16.5, 16, 3);
  ctx.shadowBlur = 0;
  ctx.fillStyle = 'rgba(69, 26, 3, 0.85)';
  [[-6, -6], [0, -9], [6, -6], [-3, -2.5], [3, -2.5]].forEach(([fx, fy]) => {
    ctx.beginPath();
    ctx.arc(fx, fy, 1.3, 0, Math.PI * 2);
    ctx.fill();
  });
  ctx.fillStyle = '#fde68a';
  ctx.beginPath();
  ctx.arc(0, -17.5, 2.2, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function efeitoIncenso(w, h) {
  const pivo = { x: w / 2, y: -8 };
  const corda = Math.min(h * 0.5, 300);
  const tamanho = Math.min(w, 420) / 210;
  const fumacas = [];
  const brilhos = Array.from({ length: 18 }, () => ({ x: Math.random() * w, y: Math.random() * h * 0.7, r: 1.6 + Math.random() * 2.6, fase: Math.random() * 6, inicio: 0.6 + Math.random() * 1.6 }));
  let proxima = 0.25;
  let anterior = 0;
  return (ctx, s) => {
    const passo = Math.min(0.05, s - anterior);
    anterior = s;
    const aparece = suave(s / 0.5) * (1 - suave((s - 3.0) / 0.7));
    const angulo = Math.sin(s * 2.3) * 0.42 * aparece;
    const tx = pivo.x + Math.sin(angulo) * corda;
    const ty = pivo.y + Math.cos(angulo) * corda;
    if (s > proxima && s < 3.0) {
      proxima += 0.07;
      fumacas.push({ x: tx + (Math.random() - 0.5) * 10 * tamanho, y: ty - 16 * tamanho, vx: (Math.random() - 0.5) * 14, vy: -38 - Math.random() * 26, idade: 0, vida: 1.6 + Math.random() * 0.9, fase: Math.random() * 6, r: (5 + Math.random() * 5) * tamanho });
    }
    for (let i = fumacas.length - 1; i >= 0; i -= 1) {
      const f = fumacas[i];
      f.idade += passo;
      const t = f.idade / f.vida;
      if (t >= 1) { fumacas.splice(i, 1); continue; }
      f.x += (f.vx + Math.sin(f.idade * 2.4 + f.fase) * 16) * passo;
      f.y += f.vy * passo;
      const raio = f.r * (1 + t * 4.5);
      const g = ctx.createRadialGradient(f.x, f.y, 0, f.x, f.y, raio);
      g.addColorStop(0, `rgba(241, 245, 249, ${0.34 * (1 - t)})`);
      g.addColorStop(0.6, `rgba(226, 232, 240, ${0.16 * (1 - t)})`);
      g.addColorStop(1, 'rgba(226, 232, 240, 0)');
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(f.x, f.y, raio, 0, Math.PI * 2);
      ctx.fill();
    }
    brilhos.forEach((b) => {
      if (s < b.inicio) return;
      desenharFaisca(ctx, b.x, b.y, b.r, '#fde68a', (0.3 + 0.7 * Math.abs(Math.sin(s * 3 + b.fase))) * Math.min(1, (s - b.inicio) * 2) * aparece);
    });
    if (aparece <= 0) return;
    ctx.save();
    ctx.globalAlpha *= aparece;
    ctx.strokeStyle = '#d97706';
    ctx.lineWidth = 1.4 * tamanho;
    ctx.setLineDash([3 * tamanho, 2 * tamanho]);
    [-9, 0, 9].forEach((d) => {
      ctx.beginPath();
      ctx.moveTo(pivo.x, pivo.y);
      ctx.lineTo(tx + Math.cos(angulo) * d * tamanho, ty - 15 * tamanho);
      ctx.stroke();
    });
    ctx.setLineDash([]);
    ctx.translate(tx, ty);
    ctx.rotate(-angulo);
    desenharLuz(ctx, 0, 4 * tamanho, 34 * tamanho, '251, 191, 36', 0.35);
    desenharTuribulo(ctx, 0, 0, tamanho);
    ctx.restore();
  };
}

function efeitoCustodia(w, h) {
  const R = Math.min(w * 0.28, h * 0.22, 110);
  const cx = w / 2;
  const cy = Math.max(R * 1.35, Math.min(h * 0.3, 190));
  const RAIOS = 36;
  const faiscas = Array.from({ length: 28 }, () => ({ a: Math.random() * Math.PI * 2, d: R * (1.05 + Math.random() * 1.1), fase: Math.random() * 6, r: 1.8 + Math.random() * 3 }));
  return (ctx, s) => {
    const aparece = suave(s / 0.8) * (1 - suave((s - 3.0) / 0.7));
    if (aparece <= 0) return;
    const cresce = 0.8 + 0.2 * suave(s / 1.3);
    ctx.save();
    ctx.globalAlpha *= aparece;
    desenharLuz(ctx, cx, cy, R * 2.6, '254, 243, 199', 0.42 + 0.08 * Math.sin(s * 3));
    ctx.translate(cx, cy);
    ctx.save();
    ctx.rotate(s * 0.18);
    for (let i = 0; i < RAIOS; i += 1) {
      const longo = i % 2 === 0;
      const comprimento = R * (longo ? 1.08 : 0.78) * cresce;
      const largura = longo ? R * 0.05 : R * 0.03;
      ctx.save();
      ctx.rotate((i * Math.PI * 2) / RAIOS);
      const g = ctx.createLinearGradient(R * 0.3, 0, comprimento, 0);
      g.addColorStop(0, 'rgba(253, 230, 138, 0.95)');
      g.addColorStop(0.7, 'rgba(251, 191, 36, 0.65)');
      g.addColorStop(1, 'rgba(245, 158, 11, 0)');
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.moveTo(R * 0.3, -largura);
      ctx.lineTo(comprimento, 0);
      ctx.lineTo(R * 0.3, largura);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    }
    ctx.restore();
    const ouro = ctx.createLinearGradient(-R * 0.1, 0, R * 0.1, 0);
    ouro.addColorStop(0, '#b45309');
    ouro.addColorStop(0.5, '#fde68a');
    ouro.addColorStop(1, '#b45309');
    ctx.fillStyle = ouro;
    ctx.fillRect(-R * 0.045, R * 0.38, R * 0.09, R * 0.72);
    ctx.beginPath();
    ctx.ellipse(0, R * 0.74, R * 0.11, R * 0.07, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(-R * 0.08, R * 1.08);
    ctx.lineTo(R * 0.08, R * 1.08);
    ctx.lineTo(R * 0.34, R * 1.26);
    ctx.lineTo(-R * 0.34, R * 1.26);
    ctx.closePath();
    ctx.fill();
    ctx.fillRect(-R * 0.03, -R * 1.25, R * 0.06, R * 0.3);
    ctx.fillRect(-R * 0.11, -R * 1.17, R * 0.22, R * 0.055);
    ctx.shadowColor = 'rgba(253, 224, 71, 0.95)';
    ctx.shadowBlur = 20;
    ctx.strokeStyle = '#fbbf24';
    ctx.lineWidth = R * 0.075;
    ctx.beginPath();
    ctx.arc(0, 0, R * 0.34, 0, Math.PI * 2);
    ctx.stroke();
    ctx.fillStyle = '#fffbeb';
    ctx.beginPath();
    ctx.arc(0, 0, R * 0.27, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.strokeStyle = 'rgba(217, 119, 6, 0.4)';
    ctx.lineWidth = R * 0.022;
    ctx.beginPath();
    ctx.moveTo(0, -R * 0.15);
    ctx.lineTo(0, R * 0.15);
    ctx.moveTo(-R * 0.1, -R * 0.04);
    ctx.lineTo(R * 0.1, -R * 0.04);
    ctx.stroke();
    ctx.restore();
    faiscas.forEach((f) => {
      const a = f.a + s * 0.25;
      desenharFaisca(ctx, cx + Math.cos(a) * f.d, cy + Math.sin(a) * f.d, f.r, '#fef3c7', (0.25 + 0.75 * Math.abs(Math.sin(s * 2.6 + f.fase))) * aparece);
    });
  };
}

function desenharEstrelaDeBelem(ctx, x, y, R, alfa) {
  if (alfa <= 0) return;
  desenharLuz(ctx, x, y, R * 3, '254, 243, 199', 0.55 * alfa);
  ctx.save();
  ctx.translate(x, y);
  ctx.globalAlpha *= alfa;
  ctx.shadowColor = 'rgba(253, 230, 138, 1)';
  ctx.shadowBlur = 22;
  ctx.fillStyle = '#fffbeb';
  ctx.beginPath();
  for (let i = 0; i < 16; i += 1) {
    const a = (i * Math.PI) / 8 - Math.PI / 2;
    let raio = R * 0.17;
    if (i % 2 === 0) {
      const ponta = i / 2;
      if (ponta === 4) raio = R * 2.3;
      else if (ponta % 2 === 0) raio = R * 1.3;
      else raio = R * 0.62;
    }
    const px = Math.cos(a) * raio;
    const py = Math.sin(a) * raio;
    if (i === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  ctx.closePath();
  ctx.fill();
  ctx.shadowBlur = 0;
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(0, 0, R * 0.22, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function efeitoEstrelaDeBelem(w, h) {
  const R = Math.max(16, Math.min(w, 420) / 13);
  const fim = { x: w * 0.5, y: Math.max(R * 2, Math.min(h * 0.17, 110)) };
  const comeco = { x: -R * 3, y: Math.min(h * 0.5, 260) };
  const rastro = [];
  const caindo = [];
  const ceu = Array.from({ length: 24 }, () => ({ x: Math.random() * w, y: Math.random() * h * 0.75, r: 1.4 + Math.random() * 2.4, fase: Math.random() * 6 }));
  let anterior = 0;
  return (ctx, s) => {
    const passo = Math.min(0.05, s - anterior);
    anterior = s;
    const fundo = suave(s / 0.5) * (1 - suave((s - 3.0) / 0.7));
    ceu.forEach((c) => desenharFaisca(ctx, c.x, c.y, c.r, '#fef3c7', (0.25 + 0.6 * Math.abs(Math.sin(s * 2.4 + c.fase))) * fundo));
    const viagem = suave(s / 1.6);
    const x = comeco.x + (fim.x - comeco.x) * viagem;
    const y = comeco.y + (fim.y - comeco.y) * viagem - Math.sin(viagem * Math.PI) * h * 0.12;
    if (viagem < 1) {
      for (let k = 0; k < 3; k += 1) {
        rastro.push({ x: x + (Math.random() - 0.5) * R * 0.8, y: y + (Math.random() - 0.5) * R * 0.8, idade: 0, vida: 0.6 + Math.random() * 0.6, r: R * (0.08 + Math.random() * 0.14) });
      }
    } else if (s < 3.1 && Math.random() < 0.22) {
      caindo.push({ x: x + (Math.random() - 0.5) * R * 7, y: y + R * 1.2, vy: 40 + Math.random() * 50, idade: 0, vida: 1 + Math.random() * 0.8, r: R * (0.06 + Math.random() * 0.1) });
    }
    [rastro, caindo].forEach((lista) => {
      for (let i = lista.length - 1; i >= 0; i -= 1) {
        const p = lista[i];
        p.idade += passo;
        if (p.idade > p.vida) { lista.splice(i, 1); continue; }
        if (p.vy) p.y += p.vy * passo;
        desenharFaisca(ctx, p.x, p.y, p.r * 2, '#fde68a', 1 - p.idade / p.vida);
      }
    });
    const pulso = viagem >= 1 ? 1 + 0.12 * Math.sin(s * 5) : 0.75 + 0.25 * viagem;
    desenharEstrelaDeBelem(ctx, x, y, R * pulso, fundo);
  };
}

function desenharPena(ctx, x, y, tamanho, giro, alfa) {
  if (alfa <= 0) return;
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(giro);
  ctx.scale(tamanho, tamanho);
  ctx.globalAlpha *= alfa;
  ctx.shadowColor = 'rgba(253, 230, 138, 0.7)';
  ctx.shadowBlur = 8;
  const g = ctx.createLinearGradient(-6, 0, 6, 0);
  g.addColorStop(0, '#dbe4f0');
  g.addColorStop(0.5, '#ffffff');
  g.addColorStop(1, '#cbd5e1');
  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.moveTo(0, -15);
  ctx.bezierCurveTo(6.5, -11, 7, 2, 1.4, 10);
  ctx.lineTo(-1.4, 10);
  ctx.bezierCurveTo(-7, 2, -6.5, -11, 0, -15);
  ctx.fill();
  ctx.shadowBlur = 0;
  ctx.strokeStyle = 'rgba(148, 163, 184, 0.45)';
  ctx.lineWidth = 0.5;
  for (let k = -10; k < 8; k += 3) {
    ctx.beginPath();
    ctx.moveTo(0, k);
    ctx.lineTo(4.8, k - 3.2);
    ctx.moveTo(0, k);
    ctx.lineTo(-4.8, k - 3.2);
    ctx.stroke();
  }
  ctx.strokeStyle = 'rgba(203, 213, 225, 1)';
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  ctx.moveTo(0, -14);
  ctx.lineTo(0, 15);
  ctx.stroke();
  ctx.restore();
}

function efeitoPenasDeAnjo(w, h) {
  const penas = Array.from({ length: 22 }, () => ({
    x: Math.random() * w,
    y: -30 - Math.random() * h * 0.35,
    v: 45 + Math.random() * 45,
    balanco: 22 + Math.random() * 30,
    fase: Math.random() * 6,
    tam: 1.1 + Math.random() * 0.9,
    inicio: Math.random() * 1.2,
  }));
  const brilhos = Array.from({ length: 20 }, () => ({ x: Math.random() * w, y: Math.random() * h * 0.8, r: 1.6 + Math.random() * 2.4, fase: Math.random() * 6, inicio: 0.4 + Math.random() * 1.8 }));
  return (ctx, s) => {
    const luz = suave(s / 0.6) * (1 - suave((s - 2.8) / 0.8));
    if (luz > 0) {
      const g = ctx.createLinearGradient(0, 0, 0, h * 0.55);
      g.addColorStop(0, `rgba(224, 231, 255, ${0.3 * luz})`);
      g.addColorStop(1, 'rgba(224, 231, 255, 0)');
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h * 0.55);
    }
    brilhos.forEach((b) => {
      if (s < b.inicio) return;
      desenharFaisca(ctx, b.x, b.y, b.r, '#fde68a', (0.3 + 0.7 * Math.abs(Math.sin(s * 3 + b.fase))) * Math.min(1, (s - b.inicio) * 2));
    });
    penas.forEach((p) => {
      const t = s - p.inicio;
      if (t <= 0) return;
      const y = p.y + t * p.v;
      if (y > h + 30) return;
      const onda = Math.sin(t * 1.9 + p.fase);
      desenharPena(ctx, p.x + onda * p.balanco, y, p.tam, onda * 0.7 + 0.3, Math.min(1, t * 2.5));
    });
  };
}

function efeitoArcoIris(w, h) {
  const CORES = ['#ef4444', '#f97316', '#facc15', '#22c55e', '#3b82f6', '#6366f1', '#a855f7'];
  const cx = w / 2;
  const cy = Math.min(h * 0.62, 340);
  const raio = Math.min(w * 0.46, cy * 0.92);
  const faixa = Math.max(5, raio * 0.055);
  const brilhos = Array.from({ length: 26 }, () => ({ a: Math.PI + Math.random() * Math.PI, d: raio * (0.6 + Math.random() * 0.5), r: 1.6 + Math.random() * 2.6, fase: Math.random() * 6 }));
  return (ctx, s) => {
    const cresce = suave(s / 1.3);
    const some = 1 - suave((s - 2.9) / 0.8);
    ctx.save();
    ctx.globalAlpha *= some;
    ctx.lineCap = 'round';
    CORES.forEach((cor, i) => {
      ctx.strokeStyle = cor;
      ctx.globalAlpha = some * 0.82;
      ctx.lineWidth = faixa;
      ctx.beginPath();
      ctx.arc(cx, cy, raio - i * faixa, Math.PI, Math.PI + Math.PI * cresce);
      ctx.stroke();
    });
    ctx.restore();
    if (cresce > 0.2) {
      [[cx - raio + faixa * 3, cy], [cx + raio - faixa * 3, cy]].forEach(([x, y]) => {
        desenharLuz(ctx, x, y, raio * 0.28, '255, 255, 255', 0.55 * some);
        ctx.save();
        ctx.globalAlpha *= 0.85 * some;
        ctx.fillStyle = '#ffffff';
        [[-14, 4, 16], [0, -4, 20], [16, 3, 15]].forEach(([dx, dy, r]) => { ctx.beginPath(); ctx.arc(x + dx, y + dy, r, 0, Math.PI * 2); ctx.fill(); });
        ctx.restore();
      });
    }
    brilhos.forEach((b) => desenharFaisca(ctx, cx + Math.cos(b.a) * b.d, cy + Math.sin(b.a) * b.d, b.r, '#fffbeb', (0.3 + 0.7 * Math.abs(Math.sin(s * 3 + b.fase))) * cresce * some));
    const voo = suave((s - 0.7) / 2.4);
    if (voo > 0 && voo < 1) pombaDeFrente(ctx, w * (0.1 + voo * 0.8), cy - raio * (0.5 + Math.sin(voo * Math.PI) * 0.45), Math.min(w, 420) / 520, Math.sin(s * 14), Math.min(1, voo * 4) * some);
  };
}

function desenharCoracao(ctx, x, y, tamanho, cor, alfa) {
  if (alfa <= 0) return;
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(tamanho, tamanho);
  ctx.globalAlpha *= alfa;
  ctx.shadowColor = 'rgba(244, 114, 182, 0.8)';
  ctx.shadowBlur = 10;
  const g = ctx.createLinearGradient(0, -8, 0, 8);
  g.addColorStop(0, cor[0]);
  g.addColorStop(1, cor[1]);
  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.moveTo(0, 7);
  ctx.bezierCurveTo(-9, 1, -9, -7, -4.5, -7);
  ctx.bezierCurveTo(-2, -7, -0.5, -5.5, 0, -4);
  ctx.bezierCurveTo(0.5, -5.5, 2, -7, 4.5, -7);
  ctx.bezierCurveTo(9, -7, 9, 1, 0, 7);
  ctx.fill();
  ctx.shadowBlur = 0;
  ctx.fillStyle = 'rgba(255, 255, 255, 0.55)';
  ctx.beginPath();
  ctx.ellipse(-3.5, -3.5, 1.6, 1, -0.6, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function efeitoCoracoes(w, h) {
  const CORES = [['#fda4af', '#e11d48'], ['#f9a8d4', '#db2777'], ['#fecaca', '#dc2626'], ['#fde68a', '#f59e0b']];
  const coracoes = Array.from({ length: 30 }, () => ({
    x: Math.random() * w,
    v: 70 + Math.random() * 90,
    balanco: 10 + Math.random() * 22,
    fase: Math.random() * 6,
    tam: 1 + Math.random() * 1.4,
    cor: CORES[Math.floor(Math.random() * CORES.length)],
    inicio: Math.random() * 1.6,
  }));
  return (ctx, s) => {
    const fundo = suave(s / 0.6) * (1 - suave((s - 2.8) / 0.8));
    if (fundo > 0) {
      const g = ctx.createLinearGradient(0, h, 0, h * 0.4);
      g.addColorStop(0, `rgba(244, 114, 182, ${0.28 * fundo})`);
      g.addColorStop(1, 'rgba(244, 114, 182, 0)');
      ctx.fillStyle = g;
      ctx.fillRect(0, h * 0.4, w, h * 0.6);
    }
    coracoes.forEach((c) => {
      const t = s - c.inicio;
      if (t <= 0) return;
      const y = h + 20 - t * c.v;
      if (y < -20) return;
      const pulso = 1 + Math.sin(t * 7 + c.fase) * 0.08;
      desenharCoracao(ctx, c.x + Math.sin(t * 2 + c.fase) * c.balanco, y, c.tam * pulso, c.cor, Math.min(1, t * 2.5));
    });
  };
}

function efeitoLuzDoCeu(w, h) {
  const feixes = Array.from({ length: 6 }, (_, i) => ({ x: w * (0.12 + i * 0.15) + (Math.random() - 0.5) * 20, largura: w * (0.035 + Math.random() * 0.04), fase: Math.random() * 6, inicio: i * 0.12 }));
  const poeira = Array.from({ length: 40 }, () => ({ x: Math.random() * w, y: Math.random() * h, r: 0.8 + Math.random() * 1.8, vy: 6 + Math.random() * 14, fase: Math.random() * 6 }));
  return (ctx, s) => {
    const aparece = suave(s / 0.9) * (1 - suave((s - 2.9) / 0.8));
    if (aparece <= 0) return;
    const topo = ctx.createLinearGradient(0, 0, 0, h * 0.35);
    topo.addColorStop(0, `rgba(254, 243, 199, ${0.45 * aparece})`);
    topo.addColorStop(1, 'rgba(254, 243, 199, 0)');
    ctx.fillStyle = topo;
    ctx.fillRect(0, 0, w, h * 0.35);
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    feixes.forEach((f) => {
      const t = s - f.inicio;
      if (t <= 0) return;
      const forca = suave(t / 0.8) * aparece * (0.75 + 0.25 * Math.sin(s * 2 + f.fase));
      const desvio = Math.sin(s * 0.8 + f.fase) * 18;
      const g = ctx.createLinearGradient(0, 0, 0, h);
      g.addColorStop(0, `rgba(255, 244, 200, ${0.7 * forca})`);
      g.addColorStop(0.45, `rgba(252, 211, 77, ${0.28 * forca})`);
      g.addColorStop(1, 'rgba(252, 211, 77, 0)');
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.moveTo(f.x - f.largura * 0.25, 0);
      ctx.lineTo(f.x + f.largura * 0.25, 0);
      ctx.lineTo(f.x + desvio + f.largura, h);
      ctx.lineTo(f.x + desvio - f.largura, h);
      ctx.closePath();
      ctx.fill();
    });
    ctx.restore();
    poeira.forEach((p) => {
      const y = (p.y + s * p.vy) % h;
      desenharLuz(ctx, p.x + Math.sin(s + p.fase) * 6, y, p.r * 3, '253, 230, 138', 0.5 * aparece * Math.abs(Math.sin(s * 2 + p.fase)));
    });
  };
}

const EFEITOS_DO_PERFIL = {
  'arco-iris': efeitoArcoIris,
  coracoes: efeitoCoracoes,
  'luz-do-ceu': efeitoLuzDoCeu,
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
};

function tocarEfeitoDoPerfil(alvo, id) {
  const criar = EFEITOS_DO_PERFIL[id];
  if (!alvo || !criar || movimentoReduzido()) return null;
  alvo.querySelectorAll(':scope > .enfeite-efeito').forEach((antigo) => antigo.remove());
  if (getComputedStyle(alvo).position === 'static') alvo.style.position = 'relative';
  const w = Math.max(1, Math.round(alvo.clientWidth));
  const h = Math.max(1, Math.round(Math.min(alvo.scrollHeight || alvo.clientHeight, 720)));
  const tela = document.createElement('canvas');
  tela.className = 'enfeite-efeito';
  tela.setAttribute('aria-hidden', 'true');
  const escala = Math.min(window.devicePixelRatio || 1, 2);
  tela.width = Math.round(w * escala);
  tela.height = Math.round(h * escala);
  tela.style.width = `${w}px`;
  tela.style.height = `${h}px`;
  const ctx = tela.getContext && tela.getContext('2d');
  if (!ctx) return null;
  alvo.appendChild(tela);
  ctx.scale(escala, escala);
  const desenhar = criar(w, h);
  const inicio = performance.now();
  const quadro = (agora) => {
    if (!tela.isConnected) return;
    const t = agora - inicio;
    ctx.clearRect(0, 0, w, h);
    ctx.save();
    ctx.globalAlpha = t > DURACAO_DO_EFEITO - 450 ? Math.max(0, (DURACAO_DO_EFEITO - t) / 450) : 1;
    try {
      desenhar(ctx, t / 1000);
    } catch (e) {
      tela.remove();
      return;
    }
    ctx.restore();
    if (t < DURACAO_DO_EFEITO) requestAnimationFrame(quadro);
    else tela.remove();
  };
  requestAnimationFrame(quadro);
  return tela;
}

const MINIS_NOVOS_DE_EFEITO = {
  'arco-iris'(g) {
    const cores = ['#ef4444', '#f97316', '#facc15', '#22c55e', '#3b82f6', '#a855f7'];
    const arcos = cores.map((cor, i) => `<path d="M${10 + i * 2.6} 34A${22 - i * 2.6} ${22 - i * 2.6} 0 0 1 ${54 - i * 2.6} 34" stroke="${cor}" stroke-width="2.6" fill="none"/>`).join('');
    return `<defs><linearGradient id="${g}c" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0ea5e9"/><stop offset="1" stop-color="#bae6fd"/></linearGradient></defs>
      <rect width="64" height="40" rx="7" fill="url(#${g}c)"/>${arcos}<circle cx="12" cy="35" r="5" fill="#fff"/><circle cx="17" cy="33" r="5" fill="#fff"/><circle cx="52" cy="35" r="5" fill="#fff"/><circle cx="47" cy="33" r="5" fill="#fff"/>${faisca(32, 8, 1.6, '#fffbeb', 0)}`;
  },
  coracoes(g) {
    const coracao = (x, y, e, cor) => `<path transform="translate(${x} ${y}) scale(${e})" d="M0 7C-9 1 -9 -7 -4.5 -7C-2 -7 -.5 -5.5 0 -4C.5 -5.5 2 -7 4.5 -7C9 -7 9 1 0 7Z" fill="${cor}"/>`;
    return `<defs><linearGradient id="${g}c" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4c0519"/><stop offset="1" stop-color="#be185d"/></linearGradient></defs>
      <rect width="64" height="40" rx="7" fill="url(#${g}c)"/>${coracao(18, 26, 1.2, '#fda4af')}${coracao(36, 14, 0.9, '#f43f5e')}${coracao(50, 28, 1, '#fde68a')}${coracao(28, 34, 0.6, '#f9a8d4')}`;
  },
  'luz-do-ceu'(g) {
    return `<defs><linearGradient id="${g}c" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1e293b"/><stop offset="1" stop-color="#0f172a"/></linearGradient><linearGradient id="${g}l" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fffbeb" stop-opacity=".9"/><stop offset="1" stop-color="#fde68a" stop-opacity="0"/></linearGradient></defs>
      <rect width="64" height="40" rx="7" fill="url(#${g}c)"/><path d="M10 0H16L22 40H2Z" fill="url(#${g}l)"/><path d="M28 0H34L42 40H22Z" fill="url(#${g}l)"/><path d="M46 0H52L62 40H42Z" fill="url(#${g}l)"/>${faisca(20, 18, 1.4, '#fde68a', 0)}${faisca(44, 26, 1.2, '#fde68a', 1)}`;
  },
};

const MINIS_DE_EFEITO = {
  'estrelas-cadentes'(g) {
    const rastros = [[60, 3, 40, 19], [44, 1, 26, 15], [58, 18, 44, 29]].map(([x1, y1, x2, y2]) => `<path d="M${x1} ${y1}L${x2} ${y2}" stroke="url(#${g}r)" stroke-width="1.6" stroke-linecap="round"/><circle cx="${x2}" cy="${y2}" r="1.6" fill="#fffbeb"/>`).join('');
    return `<defs><linearGradient id="${g}c" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#050816"/><stop offset="1" stop-color="#2e1f5e"/></linearGradient><linearGradient id="${g}r" x1="1" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fde68a" stop-opacity="0"/><stop offset="1" stop-color="#fffbeb"/></linearGradient></defs>
      <rect width="64" height="40" rx="7" fill="url(#${g}c)"/>${rastros}${faisca(12, 10, 2.4, '#fef3c7', 0)}${faisca(20, 30, 1.8, '#fef3c7', 0.8)}${faisca(34, 34, 1.5, '#fef3c7', 1.4)}`;
  },
  pombas(g) {
    return `<defs><linearGradient id="${g}c" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1e3a8a"/><stop offset="1" stop-color="#7c3aed"/></linearGradient><linearGradient id="${g}l" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fef3c7" stop-opacity=".85"/><stop offset="1" stop-color="#fef3c7" stop-opacity="0"/></linearGradient></defs>
      <rect width="64" height="40" rx="7" fill="url(#${g}c)"/><path d="M27 0H37L56 40H8Z" fill="url(#${g}l)"/>
      <g transform="translate(32 19) scale(1.25)" fill="#ffffff"><path d="M-1.8 0C-5 -4 -9 -9 -15 -9C-12 -6 -11 -3 -9 -1C-7 0 -4 1 -1.8 2.5Z"/><path d="M1.8 0C5 -4 9 -9 15 -9C12 -6 11 -3 9 -1C7 0 4 1 1.8 2.5Z"/><ellipse cx="0" cy="2" rx="2.6" ry="5.6"/><path d="M-2.2 -3L0 -8L2.2 -3Z"/><circle cx="0" cy="8.2" r="2.2"/></g>`;
  },
  vitral(g) {
    const cores = ['#2563eb', '#dc2626', '#16a34a', '#d97706', '#7c3aed', '#dc2626', '#2563eb', '#d97706'];
    const petalas = cores.map((cor, k) => `<path transform="rotate(${k * 45} 32 20)" d="M32 17C35 13 35 8 32 4C29 8 29 13 32 17Z" fill="${cor}" stroke="#1c1917" stroke-width=".8"/>`).join('');
    return `<defs><radialGradient id="${g}c"><stop offset="0" stop-color="#fef3c7" stop-opacity=".5"/><stop offset="1" stop-color="#1c1917" stop-opacity="0"/></radialGradient></defs>
      <rect width="64" height="40" rx="7" fill="#1c1917"/><circle cx="32" cy="20" r="20" fill="url(#${g}c)"/>${petalas}<circle cx="32" cy="20" r="3" fill="#fbbf24" stroke="#1c1917" stroke-width=".8"/><circle cx="32" cy="20" r="17" fill="none" stroke="#e2b53a" stroke-width="1.4"/>`;
  },
  petalas(g) {
    const petalas = [[12, 10, 20], [24, 26, -30], [38, 12, 60], [50, 28, 10], [56, 8, -50], [30, 34, 80], [8, 30, 40]].map(([x, y, a], i) => `<path transform="translate(${x} ${y}) rotate(${a}) scale(${i % 2 ? 1.1 : 1.4})" d="M0 3C3 1 2.5 -3 .4 -2.4Q0 -1.7 -.4 -2.4C-2.5 -3 -3 1 0 3Z" fill="${i % 3 ? '#fda4af' : '#f43f5e'}"/>`).join('');
    return `<defs><linearGradient id="${g}c" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4c0519"/><stop offset="1" stop-color="#9f1239"/></linearGradient></defs><rect width="64" height="40" rx="7" fill="url(#${g}c)"/>${petalas}`;
  },
  sinos(g) {
    return `<defs><linearGradient id="${g}c" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1c0f02"/><stop offset="1" stop-color="#6b3a07"/></linearGradient><linearGradient id="${g}o" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#78350f"/><stop offset=".45" stop-color="#fde68a"/><stop offset="1" stop-color="#92400e"/></linearGradient></defs>
      <rect width="64" height="40" rx="7" fill="url(#${g}c)"/>
      <g transform="translate(32 3) rotate(-10) scale(.86)">
        <path d="M0 0V3" stroke="#fde68a" stroke-width="1.6"/>
        <path d="M-5 4C-10 5 -11 16 -12 24Q-14 30 -18 32H18Q14 30 12 24C11 16 10 5 5 4Z" fill="url(#${g}o)"/>
        <ellipse cx="0" cy="32" rx="18" ry="2.6" fill="#92400e"/>
        <circle cx="3" cy="35" r="3" fill="#78350f"/>
      </g>
      <path d="M11 30Q7 24 11 18M6 33Q0 24 6 15M53 30Q57 24 53 18M58 33Q64 24 58 15" stroke="#fde68a" stroke-width="1.3" fill="none" stroke-linecap="round" opacity=".85"/>`;
  },
  'linguas-de-fogo'(g) {
    const chama = (x, y, e) => `<g transform="translate(${x} ${y}) scale(${e})"><path d="M0 -17C4 -10 8 -4 7 1C6.5 5.5 3.5 8 0 8C-3.5 8 -6.5 5.5 -7 1C-8 -4 -4 -10 0 -17Z" fill="url(#${g}f)"/><ellipse cx="0" cy="3.4" rx="2.5" ry="3.9" fill="#fffbeb"/></g>`;
    return `<defs><linearGradient id="${g}c" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7c2d12"/><stop offset="1" stop-color="#1c0a05"/></linearGradient><linearGradient id="${g}f" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#dc2626" stop-opacity="0"/><stop offset=".3" stop-color="#ea580c"/><stop offset=".7" stop-color="#fbbf24"/><stop offset="1" stop-color="#fef3c7"/></linearGradient><radialGradient id="${g}l"><stop offset="0" stop-color="#fb923c" stop-opacity=".55"/><stop offset="1" stop-color="#fb923c" stop-opacity="0"/></radialGradient></defs>
      <rect width="64" height="40" rx="7" fill="url(#${g}c)"/><circle cx="16" cy="14" r="11" fill="url(#${g}l)"/><circle cx="34" cy="24" r="12" fill="url(#${g}l)"/><circle cx="50" cy="13" r="10" fill="url(#${g}l)"/>
      ${chama(16, 15, 0.75)}${chama(34, 25, 0.85)}${chama(50, 14, 0.7)}`;
  },
  incenso(g) {
    return `<defs><linearGradient id="${g}c" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1e1b4b"/><stop offset="1" stop-color="#3b2a12"/></linearGradient><linearGradient id="${g}o" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#78350f"/><stop offset=".5" stop-color="#fde68a"/><stop offset="1" stop-color="#78350f"/></linearGradient></defs>
      <rect width="64" height="40" rx="7" fill="url(#${g}c)"/>
      <path d="M30 26C24 20 34 16 28 10C24 6 30 3 27 0M36 26C42 21 32 15 38 9C41 6 36 3 39 0" stroke="#e2e8f0" stroke-width="2.2" fill="none" stroke-linecap="round" opacity=".55"/>
      <path d="M32 0V25M27 0L30 25M37 0L34 25" stroke="#d97706" stroke-width=".7" stroke-dasharray="1.6 1"/>
      <path d="M25 30Q25 24 32 23Q39 24 39 30Z" fill="url(#${g}o)"/><path d="M24 30H40Q39 36 32 37Q25 36 24 30Z" fill="url(#${g}o)"/>`;
  },
  custodia(g) {
    const raios = Array.from({ length: 24 }, (_, k) => {
      const a = (k * Math.PI * 2) / 24;
      const r = k % 2 ? 11 : 15;
      return `<path d="M${n1(32 + Math.cos(a) * 5)} ${n1(17 + Math.sin(a) * 5)}L${n1(32 + Math.cos(a) * r)} ${n1(17 + Math.sin(a) * r)}" stroke="#fde68a" stroke-width="${k % 2 ? 0.8 : 1.3}" stroke-linecap="round"/>`;
    }).join('');
    return `<defs><radialGradient id="${g}c"><stop offset="0" stop-color="#78350f"/><stop offset="1" stop-color="#0f172a"/></radialGradient><radialGradient id="${g}l"><stop offset="0" stop-color="#fef3c7" stop-opacity=".8"/><stop offset="1" stop-color="#fef3c7" stop-opacity="0"/></radialGradient></defs>
      <rect width="64" height="40" rx="7" fill="url(#${g}c)"/><circle cx="32" cy="17" r="17" fill="url(#${g}l)"/>${raios}
      <circle cx="32" cy="17" r="4.6" fill="#fffbeb" stroke="#fbbf24" stroke-width="1.4"/>
      <path d="M31.4 22H32.6V33H31.4Z" fill="#fbbf24"/><path d="M28 36L30.6 33H33.4L36 36Z" fill="#fbbf24"/><path d="M31.5 1H32.5V4H31.5ZM30.5 1.8H33.5V2.6H30.5Z" fill="#fbbf24"/>`;
  },
  'estrela-de-belem'(g) {
    let pontos = '';
    for (let i = 0; i < 16; i += 1) {
      const a = (i * Math.PI) / 8 - Math.PI / 2;
      let r = 1.2;
      if (i % 2 === 0) {
        const ponta = i / 2;
        if (ponta === 4) r = 15;
        else if (ponta % 2 === 0) r = 8.5;
        else r = 4;
      }
      pontos += `${i === 0 ? 'M' : 'L'}${n1(40 + Math.cos(a) * r)} ${n1(12 + Math.sin(a) * r)}`;
    }
    return `<defs><linearGradient id="${g}c" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#020617"/><stop offset="1" stop-color="#1e3a8a"/></linearGradient><radialGradient id="${g}l"><stop offset="0" stop-color="#fef3c7" stop-opacity=".75"/><stop offset="1" stop-color="#fef3c7" stop-opacity="0"/></radialGradient></defs>
      <rect width="64" height="40" rx="7" fill="url(#${g}c)"/><circle cx="40" cy="12" r="14" fill="url(#${g}l)"/>
      <path d="M8 30Q20 18 34 14" stroke="#fde68a" stroke-width="1" fill="none" stroke-dasharray="1 2.4" stroke-linecap="round"/>
      <path d="${pontos}Z" fill="#fffbeb"/>${faisca(14, 26, 1.6, '#fde68a', 0)}${faisca(24, 19, 1.3, '#fde68a', 0.6)}${faisca(54, 30, 1.4, '#fef3c7', 1.2)}`;
  },
  'penas-de-anjo'(g) {
    const pena = (x, y, a, e) => `<g transform="translate(${x} ${y}) rotate(${a}) scale(${e})"><path d="M0 -15C6.5 -11 7 2 1.4 10L-1.4 10C-7 2 -6.5 -11 0 -15Z" fill="#ffffff"/><path d="M0 -14V15" stroke="#cbd5e1" stroke-width=".9"/></g>`;
    return `<defs><linearGradient id="${g}c" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#312e81"/><stop offset="1" stop-color="#7dd3fc"/></linearGradient></defs>
      <rect width="64" height="40" rx="7" fill="url(#${g}c)"/>${pena(16, 14, -30, 0.7)}${pena(36, 24, 25, 0.8)}${pena(52, 11, -10, 0.55)}${faisca(26, 9, 1.4, '#fde68a', 0)}${faisca(48, 30, 1.2, '#fde68a', 0.8)}`;
  },
};

Object.assign(MINIS_DE_EFEITO, MINIS_NOVOS_DE_EFEITO);

function svgDoEfeito(id) {
  const desenho = MINIS_DE_EFEITO[id];
  if (!desenho) return '';
  return `<svg class="enfeite-mini-efeito-svg" viewBox="0 0 64 40" aria-hidden="true" focusable="false">${desenho(idDoEnfeite('mini'))}</svg>`;
}

function itemDoEnfeite(tipo, id) {
  return (ENFEITES[tipo] || []).find((item) => item.id === id) || null;
}

function perfilEhCrianca(perfil) {
  return !!perfil && perfil.tipo === 'crianca';
}

function enfeiteLiberado(item, perfil) {
  if (!item) return true;
  if (perfilEhCrianca(perfil) && !item.criancas) return false;
  if (item.gratis) return true;
  if (typeof cobrancaLigadaNoSite !== 'function' || !cobrancaLigadaNoSite()) return true;
  const plano = typeof estadoDaAssinatura !== 'undefined' && estadoDaAssinatura && estadoDaAssinatura.plano ? estadoDaAssinatura.plano.id : 'free';
  return plano !== 'free';
}

async function carregarEnfeitesDaFamilia() {
  if (typeof supabaseCliente === 'undefined' || !supabaseCliente || typeof contaLogada !== 'function' || !contaLogada()) return enfeitesDaFamilia;
  try {
    const { data, error } = await supabaseCliente.rpc('enfeites_da_familia');
    if (!error && data && typeof data === 'object') enfeitesDaFamilia = data;
  } catch (e) {
    return enfeitesDaFamilia;
  }
  return enfeitesDaFamilia;
}

function colocarMoldura(lugar, id) {
  if (!lugar) return;
  lugar.querySelectorAll(':scope > .enfeite-moldura').forEach((antiga) => antiga.remove());
  const tem = !!MOLDURAS[id];
  lugar.classList.toggle('com-moldura', tem);
  if (tem) lugar.insertAdjacentHTML('beforeend', svgDaMoldura(id));
}

function colocarFaixa(lugar, id, classe) {
  if (!lugar) return;
  lugar.querySelectorAll(':scope > .enfeite-faixa').forEach((antiga) => antiga.remove());
  const tem = !!FAIXAS[id];
  lugar.classList.toggle('com-faixa', tem);
  if (tem) lugar.insertAdjacentHTML('afterbegin', `<span class="enfeite-faixa ${classe || ''}" aria-hidden="true">${svgDaFaixa(id)}</span>`);
}

function aplicarEnfeitesNoCartao(cartao, enfeites, tocar) {
  if (!cartao) return;
  const escolha = enfeites || {};
  colocarFaixa(cartao.querySelector('.perfil-publico-capa'), escolha.faixa, 'enfeite-faixa-capa');
  colocarMoldura(cartao.querySelector('.perfil-publico-foto'), escolha.moldura);
  if (tocar !== false && escolha.efeito) tocarEfeitoDoPerfil(cartao, escolha.efeito);
}

async function aplicarEnfeitesNoPainel(conteudo, membroId) {
  if (!conteudo) return;
  await carregarEnfeitesDaFamilia();
  const topo = conteudo.querySelector('.painel-topo');
  if (!topo || !conteudo.isConnected) return;
  const escolha = enfeitesDaFamilia[membroId] || {};
  const avatar = topo.querySelector(':scope > .avatar');
  if (avatar && escolha.moldura) {
    const lugar = document.createElement('span');
    lugar.className = 'enfeite-lugar-da-foto';
    avatar.replaceWith(lugar);
    lugar.appendChild(avatar);
    colocarMoldura(lugar, escolha.moldura);
  }
  colocarFaixa(topo, escolha.faixa, 'enfeite-faixa-painel');
  if (escolha.efeito) tocarEfeitoDoPerfil(conteudo.closest('.perfil-painel') || conteudo, escolha.efeito);
}

function faixaDaLinhaDaConversa(outro) {
  if (!outro || !FAIXAS[outro.faixa]) return '';
  return `<span class="enfeite-faixa enfeite-faixa-linha" aria-hidden="true">${svgDaFaixa(outro.faixa)}</span>`;
}

function aplicarEnfeitesNoMeuPerfil(tocar) {
  const cartao = document.querySelector('#meu-perfil-cabecalho .meu-perfil');
  const perfil = typeof membroAtivo !== 'undefined' ? membroAtivo : null;
  if (!cartao || !perfil) return;
  const escolha = enfeitesDaFamilia[perfil.id] || {};
  colocarFaixa(cartao.querySelector('.perfil-publico-capa'), escolha.faixa, 'enfeite-faixa-capa');
  colocarMoldura(cartao.querySelector('.perfil-publico-foto'), escolha.moldura);
  if (tocar && escolha.efeito) tocarEfeitoDoPerfil(cartao, escolha.efeito);
}

async function enfeitarMeuPerfil() {
  const perfil = typeof membroAtivo !== 'undefined' ? membroAtivo : null;
  if (!perfil) return;
  await carregarEnfeitesDaFamilia();
  aplicarEnfeitesNoMeuPerfil(true);
}

async function carregarEnfeitesPublicos(ids) {
  const perfil = typeof membroAtivo !== 'undefined' ? membroAtivo : null;
  const lista = Array.from(new Set((ids || []).filter(Boolean))).slice(0, 100);
  if (!perfil || !lista.length || typeof supabaseCliente === 'undefined' || !supabaseCliente) return {};
  try {
    const { data, error } = await supabaseCliente.rpc('enfeites_publicos', { _pid: perfil.id, _ids: lista });
    if (error || !data || typeof data !== 'object') return {};
    return data;
  } catch (e) {
    return {};
  }
}

function enfeitarLinha(linha, escolha) {
  if (!linha || !escolha) return;
  if (linha.classList.contains('podio-lugar')) {
    if (FAIXAS[escolha.faixa]) colocarFaixa(linha, escolha.faixa, 'enfeite-faixa-podio');
    if (MOLDURAS[escolha.moldura]) colocarMoldura(linha.querySelector('.podio-foto'), escolha.moldura);
    return;
  }
  if (FAIXAS[escolha.faixa]) colocarFaixa(linha, escolha.faixa, 'enfeite-faixa-linha');
  const avatar = linha.querySelector(':scope > .avatar');
  if (avatar && MOLDURAS[escolha.moldura]) {
    const lugar = document.createElement('span');
    lugar.className = 'enfeite-lugar-da-foto enfeite-lugar-pequeno';
    avatar.replaceWith(lugar);
    lugar.appendChild(avatar);
    colocarMoldura(lugar, escolha.moldura);
  }
}

async function enfeitarLinhasDoRanking(lista, familia) {
  if (!lista) return;
  const linhas = Array.from(lista.querySelectorAll('.ranking-linha[data-perfil], .podio-lugar[data-perfil]'));
  if (!linhas.length) return;
  let mapa = {};
  if (familia) {
    await carregarEnfeitesDaFamilia();
    mapa = enfeitesDaFamilia;
  } else {
    mapa = await carregarEnfeitesPublicos(linhas.map((l) => l.dataset.perfil));
  }
  if (!lista.isConnected) return;
  linhas.forEach((linha) => {
    if (linha.isConnected) enfeitarLinha(linha, mapa[linha.dataset.perfil]);
  });
}

let escolhaDeEnfeites = null;

function perfilDaEscolha() {
  return escolhaDeEnfeites ? escolhaDeEnfeites.perfil : null;
}

function itensVisiveis(tipo, perfil) {
  const crianca = perfilEhCrianca(perfil);
  return (ENFEITES[tipo] || []).filter((item) => (!crianca || (item.criancas && enfeiteLiberado(item, perfil))));
}

function seloDoEnfeite(item, perfil) {
  if (!item || perfilEhCrianca(perfil)) return '';
  if (item.gratis) return '<span class="enfeite-selo gratis">Grátis</span>';
  if (enfeiteLiberado(item, perfil)) return '<span class="enfeite-selo">Assinantes</span>';
  return `<span class="enfeite-selo trancado">${icone('cadeado')}Assinantes</span>`;
}

function opcaoDeEnfeite(tipo, item, perfil) {
  const valor = escolhaDeEnfeites.valores[tipo] || '';
  const id = item ? item.id : '';
  const escolhido = valor === id;
  const liberado = enfeiteLiberado(item, perfil);
  let previa = '';
  if (tipo === 'moldura') previa = `<span class="enfeite-mini-foto">${desenharAvatar(perfil.avatar, perfil.fotoUrl, 'medio')}${item ? svgDaMoldura(item.id) : ''}</span>`;
  else if (tipo === 'faixa') previa = `<span class="enfeite-mini-faixa">${item ? svgDaFaixa(item.id) : ''}</span>`;
  else previa = `<span class="enfeite-mini-efeito">${item ? svgDoEfeito(item.id) : ''}</span>`;
  return `<button type="button" class="enfeite-opcao${escolhido ? ' escolhido' : ''}${liberado ? '' : ' trancado'}" data-id="${id}" aria-pressed="${escolhido ? 'true' : 'false'}">
    ${previa}
    <strong>${item ? escaparTexto(item.nome) : 'Nenhum'}</strong>
    ${seloDoEnfeite(item, perfil)}
  </button>`;
}

function atualizarPreviaDosEnfeites(tocar) {
  const previa = document.getElementById('enfeites-previa');
  if (!previa || !escolhaDeEnfeites) return;
  aplicarEnfeitesNoCartao(previa, escolhaDeEnfeites.valores, tocar);
}

function escolhaTrancada() {
  const perfil = perfilDaEscolha();
  return TIPOS_DE_ENFEITE.some(({ tipo }) => {
    const item = itemDoEnfeite(tipo, escolhaDeEnfeites.valores[tipo]);
    return !!item && !enfeiteLiberado(item, perfil);
  });
}

function atualizarBotaoDosEnfeites() {
  const botao = document.getElementById('enfeites-salvar');
  const aviso = document.getElementById('enfeites-aviso');
  if (!botao || !escolhaDeEnfeites) return;
  if (escolhaTrancada()) {
    botao.textContent = 'Ver os planos';
    botao.dataset.acao = 'planos';
    if (aviso) {
      aviso.textContent = 'Os enfeites com cadeado são dos assinantes. Escolha outro ou assine um plano para usar.';
      aviso.classList.remove('certo');
    }
  } else {
    botao.textContent = 'Salvar';
    botao.dataset.acao = 'salvar';
  }
}

function renderizarEscolhaDeEnfeites() {
  const grade = document.getElementById('enfeites-grade');
  if (!grade || !escolhaDeEnfeites) return;
  const perfil = perfilDaEscolha();
  const tipo = escolhaDeEnfeites.aba;
  document.querySelectorAll('.enfeites-aba').forEach((aba) => {
    const ativa = aba.dataset.tipo === tipo;
    aba.classList.toggle('ativa', ativa);
    aba.setAttribute('aria-selected', ativa ? 'true' : 'false');
  });
  grade.className = `enfeites-grade enfeites-grade-${tipo}`;
  grade.innerHTML = [null, ...itensVisiveis(tipo, perfil)].map((item) => opcaoDeEnfeite(tipo, item, perfil)).join('');
  grade.querySelectorAll('.enfeite-opcao').forEach((botao) => {
    botao.addEventListener('click', () => {
      escolhaDeEnfeites.valores[tipo] = botao.dataset.id || null;
      const aviso = document.getElementById('enfeites-aviso');
      if (aviso) {
        aviso.textContent = '';
        aviso.classList.remove('certo');
      }
      renderizarEscolhaDeEnfeites();
      atualizarPreviaDosEnfeites(tipo === 'efeito');
    });
  });
  atualizarBotaoDosEnfeites();
}

function mensagemDosEnfeites(erro) {
  const texto = String((erro && erro.message) || '');
  if (texto.includes('enfeite_de_assinante')) return 'Esse enfeite é só para assinantes. Escolha outro ou assine um plano.';
  if (texto.includes('enfeite_invalido')) return 'Esse enfeite não está disponível para este perfil.';
  return 'Não foi possível salvar agora. Tente de novo em instantes.';
}

async function salvarEnfeitesDoPerfil() {
  const botao = document.getElementById('enfeites-salvar');
  const aviso = document.getElementById('enfeites-aviso');
  const perfil = perfilDaEscolha();
  if (!botao || !perfil) return;
  if (botao.dataset.acao === 'planos') {
    if (typeof fecharJanelaDoCenaculo === 'function') fecharJanelaDoCenaculo();
    if (typeof abrirPlanos === 'function') abrirPlanos();
    return;
  }
  botao.disabled = true;
  botao.textContent = 'Salvando...';
  let salvou = false;
  try {
    const valores = escolhaDeEnfeites.valores;
    const { data, error } = await supabaseCliente.rpc('perfil_mudar_enfeites', {
      _pid: perfil.id,
      _moldura: valores.moldura || null,
      _efeito: valores.efeito || null,
      _faixa: valores.faixa || null,
    });
    if (error) throw error;
    enfeitesDaFamilia[perfil.id] = data || {};
    salvou = true;
    if (aviso) {
      aviso.textContent = 'Pronto! Os enfeites foram salvos e já aparecem no seu perfil.';
      aviso.classList.add('certo');
    }
  } catch (erro) {
    if (aviso) {
      aviso.textContent = mensagemDosEnfeites(erro);
      aviso.classList.remove('certo');
    }
  }
  botao.disabled = false;
  atualizarBotaoDosEnfeites();
  const meuPerfil = document.querySelector('#meu-perfil-cabecalho .meu-perfil');
  if (salvou && meuPerfil && meuPerfil.offsetParent !== null) {
    if (typeof fecharJanelaDoCenaculo === 'function') fecharJanelaDoCenaculo();
    aplicarEnfeitesNoMeuPerfil(true);
    if (typeof mostrarAvisoTrilhas === 'function') mostrarAvisoTrilhas('Enfeites salvos! Agora é assim que os outros veem o seu perfil.');
  } else if (salvou) {
    aplicarEnfeitesNoMeuPerfil(false);
  }
}

async function abrirEnfeitesDoPerfil() {
  const perfil = typeof membroAtivo !== 'undefined' ? membroAtivo : null;
  if (!perfil || typeof janelaDoCenaculo !== 'function') return;
  const corpo = janelaDoCenaculo('Enfeites do perfil', '<p class="perfis-carregando">Carregando...</p>');
  await Promise.all([
    carregarEnfeitesDaFamilia(),
    typeof carregarAssinaturaSemFalhar === 'function' ? carregarAssinaturaSemFalhar() : null,
  ]);
  const atuais = enfeitesDaFamilia[perfil.id] || {};
  escolhaDeEnfeites = {
    perfil,
    aba: 'moldura',
    valores: { moldura: atuais.moldura || null, efeito: atuais.efeito || null, faixa: atuais.faixa || null },
  };
  corpo.innerHTML = `
    <div class="enfeites-escolha">
      <div class="perfil-publico enfeites-previa" id="enfeites-previa">
        <div class="perfil-publico-capa">
          <span class="perfil-publico-foto">${desenharAvatar(perfil.avatar, perfil.fotoUrl, 'grande')}</span>
        </div>
        <div class="perfil-publico-topo">
          <strong class="perfil-publico-nome">${escaparTexto(perfil.nome)}</strong>
          <button type="button" class="perfil-link" id="enfeites-ver-efeito">Ver o efeito ao abrir</button>
        </div>
      </div>
      <div class="enfeites-abas" role="tablist">
        ${TIPOS_DE_ENFEITE.map((t) => `<button type="button" role="tab" class="enfeites-aba" data-tipo="${t.tipo}">${t.nome}</button>`).join('')}
      </div>
      <div class="enfeites-grade" id="enfeites-grade"></div>
      <p class="enfeites-aviso" id="enfeites-aviso" aria-live="polite"></p>
      <button type="button" class="licao-botao" id="enfeites-salvar">Salvar</button>
    </div>`;
  corpo.querySelectorAll('.enfeites-aba').forEach((aba) => {
    aba.addEventListener('click', () => {
      escolhaDeEnfeites.aba = aba.dataset.tipo;
      renderizarEscolhaDeEnfeites();
    });
  });
  const verEfeito = corpo.querySelector('#enfeites-ver-efeito');
  if (verEfeito) {
    verEfeito.addEventListener('click', () => {
      const efeito = escolhaDeEnfeites.valores.efeito;
      const aviso = document.getElementById('enfeites-aviso');
      if (!efeito) {
        if (aviso) aviso.textContent = 'Escolha um efeito na aba "Efeito ao abrir".';
        return;
      }
      tocarEfeitoDoPerfil(document.getElementById('enfeites-previa'), efeito);
    });
  }
  corpo.querySelector('#enfeites-salvar').addEventListener('click', salvarEnfeitesDoPerfil);
  renderizarEscolhaDeEnfeites();
  atualizarPreviaDosEnfeites(false);
}
