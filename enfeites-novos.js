ENFEITES.moldura.push(
  { id: 'trigo-e-uvas', nome: 'Trigo e uvas', texto: 'O pão e o vinho da Eucaristia' },
  { id: 'aguas-do-batismo', nome: 'Águas do Batismo', texto: 'A água viva que nos faz filhos de Deus', criancas: true },
  { id: 'estrela-guia', nome: 'Estrela-guia', texto: 'Uma estrela dá a volta e mostra o caminho', criancas: true },
  { id: 'coroa-de-flores', nome: 'Coroa de flores', texto: 'Flores do campo para Nossa Senhora', criancas: true },
  { id: 'coroa-real', nome: 'Coroa real', texto: 'Ouro e pedras preciosas para a família', criancas: true, exclusivo: true },
  { id: 'resplendor', nome: 'Resplendor', texto: 'Raios de ouro e luz girando sem parar', criancas: true, exclusivo: true },
  { id: 'constelacao-da-familia', nome: 'Constelação da família', texto: 'Seis estrelas, uma para cada um da casa', criancas: true, exclusivo: true },
);
ENFEITES.faixa.push(
  { id: 'amanhecer-nas-montanhas', nome: 'Amanhecer nas montanhas', texto: 'O sol nasce atrás das montanhas' },
  { id: 'noite-de-natal', nome: 'Noite de Natal', texto: 'A estrela brilha sobre Belém' },
  { id: 'girassois', nome: 'Campo de girassóis', texto: 'Girassóis olhando para o sol', criancas: true },
  { id: 'nuvens-do-ceu', nome: 'Nuvens do céu', texto: 'Nuvens passando num céu azul', criancas: true },
  { id: 'aurora-dourada', nome: 'Aurora dourada', texto: 'Fitas de luz dançando no céu', criancas: true, exclusivo: true },
  { id: 'ceu-de-ouro', nome: 'Céu de ouro', texto: 'A cruz brilhando num céu de ouro', criancas: true, exclusivo: true },
  { id: 'vitral-da-familia', nome: 'Vitral da família', texto: 'Um vitral aceso só da família', criancas: true, exclusivo: true },
);
ENFEITES.efeito.push(
  { id: 'fogos-de-gloria', nome: 'Fogos de glória', texto: 'Fogos dourados de festa' },
  { id: 'confete', nome: 'Confete de festa', texto: 'Confete colorido caindo', criancas: true },
  { id: 'neve-de-natal', nome: 'Neve de Natal', texto: 'Flocos de neve caindo devagar', criancas: true },
  { id: 'borboletas', nome: 'Borboletas', texto: 'Borboletas voando para o alto', criancas: true },
  { id: 'chuva-de-ouro', nome: 'Chuva de ouro', texto: 'Estrelas de ouro caindo e brilhando', criancas: true, exclusivo: true },
  { id: 'coroacao', nome: 'Coroação', texto: 'Uma coroa de luz desce do céu', criancas: true, exclusivo: true },
  { id: 'fogos-do-ceu', nome: 'Fogos do céu', texto: 'Fogos em forma de estrela e coração', criancas: true, exclusivo: true },
);

function espigaDeTrigo(cor) {
  let graos = '';
  for (let i = 0; i < 4; i += 1) {
    const y = -3 - i * 3.2;
    graos += `<ellipse cx="-1.5" cy="${n1(y)}" rx="1.3" ry="2.2" transform="rotate(-24 -1.5 ${n1(y)})" fill="url(#${cor})"/><ellipse cx="1.5" cy="${n1(y)}" rx="1.3" ry="2.2" transform="rotate(24 1.5 ${n1(y)})" fill="url(#${cor})"/>`;
  }
  return `<path d="M0 4V-15" stroke="#b45309" stroke-width=".7"/>${graos}<ellipse cx="0" cy="-16.5" rx="1.2" ry="2.1" fill="url(#${cor})"/><path d="M0 -18L-.6 -23M0 -18L.6 -23" stroke="#fcd34d" stroke-width=".4"/>`;
}

function cachoDeUvas(cor) {
  const bagos = [[0, 0], [-2.4, -1.6], [2.4, -1.6], [-1.2, -4], [1.2, -4], [0, -6.2], [-3.4, -4.4], [3.4, -4.4]]
    .map(([x, y]) => `<circle cx="${x}" cy="${n1(y + 3)}" r="1.7" fill="url(#${cor})"/>`).join('');
  return `${bagos}<path d="M0 -4.6C1.5 -7 3.5 -7.5 5.5 -7" stroke="#166534" stroke-width=".6" fill="none"/><path d="M2.5 -6.5C4 -9.5 7.5 -9 8 -6.5C6 -6 4 -5.5 2.5 -6.5Z" fill="#22c55e"/>`;
}

function florzinha(cor, miolo) {
  let petalas = '';
  for (let i = 0; i < 6; i += 1) petalas += `<ellipse cx="0" cy="-2.4" rx="1.3" ry="2.3" transform="rotate(${i * 60})" fill="${cor}"/>`;
  return `${petalas}<circle r="1.25" fill="${miolo}"/>`;
}

function estrelaDeOitoPontas(raio) {
  return caminhoDeEstrela(0, 0, raio, raio * 0.38, 8);
}

Object.assign(MOLDURAS, {
  'trigo-e-uvas'() {
    const ouro = idDoEnfeite('ouro');
    const trigo = idDoEnfeite('trigo');
    const uva = idDoEnfeite('uva');
    const brilho = idDoEnfeite('brilho');
    let enfeites = '';
    [200, 222, 244, 296, 318, 340].forEach((a, i) => {
      const [x, y] = pontoNoCirculo(56, a);
      enfeites += `<g transform="translate(${n1(x)} ${n1(y)}) rotate(${a + 90})"><g class="enf-balanca-suave" style="animation-delay:${n1(i * 0.4)}s">${espigaDeTrigo(trigo)}</g></g>`;
    });
    [20, 52, 84, 116, 148].forEach((a, i) => {
      const [x, y] = pontoNoCirculo(56, a);
      enfeites += `<g transform="translate(${n1(x)} ${n1(y)}) rotate(${a - 90}) scale(1.15)"><g class="enf-respira-local" style="--a:${n1(i * 0.5)}s">${cachoDeUvas(uva)}</g></g>`;
    });
    return `<defs>
      <linearGradient id="${ouro}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fef3c7"/><stop offset=".5" stop-color="#d4a017"/><stop offset="1" stop-color="#92400e"/></linearGradient>
      <linearGradient id="${trigo}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fde68a"/><stop offset="1" stop-color="#d97706"/></linearGradient>
      <radialGradient id="${uva}" cx="35%" cy="30%" r="75%"><stop offset="0" stop-color="#c4b5fd"/><stop offset=".55" stop-color="#7c3aed"/><stop offset="1" stop-color="#3b0764"/></radialGradient>
      ${filtroDeBrilho(brilho, 1.4)}
    </defs>
    <circle cx="68" cy="68" r="53" fill="none" stroke="url(#${ouro})" stroke-width="3"/>
    ${enfeites}
    <g transform="translate(68 9)" filter="url(#${brilho})" class="enf-respira"><circle r="7.5" fill="#fffbeb" stroke="#f5c542" stroke-width="1.2"/><path d="M0 -4.5V4.5M-3.5 -1H3.5" stroke="#d4a017" stroke-width="1.2"/></g>
    ${faisca(24, 22, 3, '#fef3c7', 0.4)}${faisca(112, 20, 2.6, '#fef3c7', 1.5)}`;
  },

  'aguas-do-batismo'() {
    const agua = idDoEnfeite('agua');
    const concha = idDoEnfeite('concha');
    const brilho = idDoEnfeite('brilho');
    const ondas = [0, 1, 2].map((i) => `<circle cx="68" cy="68" r="55" fill="none" stroke="#7dd3fc" stroke-width="1.6" class="enf-onda-anel" style="--a:${i}s"/>`).join('');
    const gotas = [[48, 4, 0], [88, 6, 1.4], [68, 2, 2.6]].map(([x, y, a]) => `<g transform="translate(${x} ${y})"><path class="enf-cai" style="--a:${a}s" d="M0 -3C1.6 0 2 1.6 0 3C-2 1.6 -1.6 0 0 -3Z" fill="#bae6fd"/></g>`).join('');
    let concha2 = '';
    for (let i = 0; i < 7; i += 1) concha2 += `<path d="M0 6L${n1(-9 + i * 3)} -5" stroke="#b45309" stroke-width=".5"/>`;
    return `<defs>
      <linearGradient id="${agua}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#e0f2fe"/><stop offset=".5" stop-color="#38bdf8"/><stop offset="1" stop-color="#1d4ed8"/></linearGradient>
      <linearGradient id="${concha}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fef3c7"/><stop offset="1" stop-color="#f59e0b"/></linearGradient>
      ${filtroDeBrilho(brilho, 1.5)}
    </defs>
    ${ondas}
    <circle cx="68" cy="68" r="54" fill="none" stroke="url(#${agua})" stroke-width="4.5" filter="url(#${brilho})"/>
    <circle cx="68" cy="68" r="54" fill="none" stroke="#f0f9ff" stroke-width="1" stroke-dasharray="3 11" class="enf-gira" style="--d:14s"/>
    <g transform="translate(68 12)"><path d="M0 6C-7 6 -11 0 -9.5 -5C-6 -8 6 -8 9.5 -5C11 0 7 6 0 6Z" fill="url(#${concha})" stroke="#b45309" stroke-width=".6"/>${concha2}</g>
    ${gotas}
    ${faisca(18, 40, 2.4, '#e0f2fe', 0.3)}${faisca(118, 96, 2.4, '#e0f2fe', 1.2)}`;
  },

  'estrela-guia'() {
    const ouro = idDoEnfeite('ouro');
    const brilho = idDoEnfeite('brilho');
    const rastro = [12, 24, 36].map((d, i) => {
      const [x, y] = pontoNoCirculo(55, -90 - d);
      return `<circle cx="${n1(x)}" cy="${n1(y)}" r="${n1(2.2 - i * 0.5)}" fill="#fde68a" opacity="${n1(0.7 - i * 0.2)}"/>`;
    }).join('');
    return `<defs>
      <linearGradient id="${ouro}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fffbeb"/><stop offset=".5" stop-color="#f5c542"/><stop offset="1" stop-color="#b8860b"/></linearGradient>
      ${filtroDeBrilho(brilho, 2)}
    </defs>
    <circle cx="68" cy="68" r="55" fill="none" stroke="url(#${ouro})" stroke-width="1.8" opacity=".85"/>
    <circle cx="68" cy="68" r="59" fill="none" stroke="#fde68a" stroke-width=".6" stroke-dasharray="1 7" opacity=".7"/>
    <g class="enf-gira" style="--d:7s">
      ${rastro}
      <g transform="translate(68 13)" filter="url(#${brilho})"><path d="${estrelaDeOitoPontas(9)}" fill="url(#${ouro})"/><circle r="2.4" fill="#fffbeb"/></g>
    </g>
    ${faisca(22, 104, 2.4, '#fef3c7', 0.6)}${faisca(116, 32, 2.2, '#fef3c7', 1.7)}`;
  },

  'coroa-de-flores'() {
    const folha = idDoEnfeite('folha');
    const cores = [['#ffffff', '#facc15'], ['#f9a8d4', '#fde047'], ['#fde047', '#f97316'], ['#c4b5fd', '#fef08a'], ['#fecaca', '#facc15']];
    let flores = '';
    for (let i = 0; i < 18; i += 1) {
      const a = i * 20;
      const [x, y] = pontoNoCirculo(55, a);
      const [cor, miolo] = cores[i % cores.length];
      const [fx, fy] = pontoNoCirculo(55, a + 10);
      flores += `<g transform="translate(${n1(fx)} ${n1(fy)}) rotate(${a + 100})"><path d="M0 0C2 -3 6 -3 8 0C6 2.5 2 2.5 0 0Z" fill="url(#${folha})"/></g>`;
      flores += `<g transform="translate(${n1(x)} ${n1(y)}) scale(1.45)"><g class="enf-respira-local" style="--a:${n1((i % 6) * 0.5)}s">${florzinha(cor, miolo)}</g></g>`;
    }
    return `<defs><linearGradient id="${folha}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#86efac"/><stop offset="1" stop-color="#15803d"/></linearGradient></defs>
    <circle cx="68" cy="68" r="55" fill="none" stroke="#65a30d" stroke-width="2"/>
    ${flores}
    <g transform="translate(112 22)"><g class="enf-borboleta" style="--a:.4s"><path d="M0 0C-5 -6 -9 -2 -6 2C-4 4 -1 2 0 0Z" fill="#f472b6"/><path d="M0 0C5 -6 9 -2 6 2C4 4 1 2 0 0Z" fill="#fb7185"/><path d="M0 -2V3" stroke="#3f3f46" stroke-width=".8"/></g></g>`;
  },

  'coroa-real'() {
    const ouro = idDoEnfeite('ouro');
    const brilho = idDoEnfeite('brilho');
    const pedras = ['#dc2626', '#2563eb', '#16a34a', '#9333ea', '#dc2626', '#2563eb', '#16a34a', '#9333ea', '#dc2626', '#2563eb', '#16a34a', '#9333ea'];
    let joias = '';
    pedras.forEach((cor, i) => {
      const [x, y] = pontoNoCirculo(55, i * 30 + 15);
      joias += `<g transform="translate(${n1(x)} ${n1(y)})"><path d="M0 -3.6L3.1 0L0 3.6L-3.1 0Z" fill="${cor}" stroke="#fef3c7" stroke-width=".6" class="enf-cintila" style="--a:${n1(i * 0.22)}s"/></g>`;
    });
    let perolas = '';
    for (let i = 0; i < 36; i += 1) {
      if (i % 3 === 1) continue;
      const [x, y] = pontoNoCirculo(59.5, i * 10);
      perolas += `<circle cx="${n1(x)}" cy="${n1(y)}" r="1.1" fill="#fffbeb"/>`;
    }
    return `<defs>
      <linearGradient id="${ouro}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fffbeb"/><stop offset=".35" stop-color="#facc15"/><stop offset=".7" stop-color="#ca8a04"/><stop offset="1" stop-color="#713f12"/></linearGradient>
      ${filtroDeBrilho(brilho, 1.8)}
    </defs>
    <circle cx="68" cy="68" r="55" fill="none" stroke="url(#${ouro})" stroke-width="5" filter="url(#${brilho})"/>
    <circle cx="68" cy="68" r="51.5" fill="none" stroke="#fef3c7" stroke-width=".7" opacity=".8"/>
    ${perolas}${joias}
    <g class="enf-flutua"><g transform="translate(68 4)" filter="url(#${brilho})">
      <path d="M-17 9L-19 -6L-9 1L0 -10L9 1L19 -6L17 9Z" fill="url(#${ouro})" stroke="#713f12" stroke-width=".7"/>
      <rect x="-17" y="8" width="34" height="4.5" rx="1.5" fill="url(#${ouro})" stroke="#713f12" stroke-width=".6"/>
      <circle cx="0" cy="-12" r="2.1" fill="#fffbeb"/><circle cx="-19" cy="-7.5" r="1.7" fill="#fffbeb"/><circle cx="19" cy="-7.5" r="1.7" fill="#fffbeb"/>
      <path d="M0 -3.5L2.3 0L0 3.5L-2.3 0Z" fill="#dc2626"/><circle cx="-9" cy="10.3" r="1.3" fill="#2563eb"/><circle cx="9" cy="10.3" r="1.3" fill="#16a34a"/>
    </g></g>
    ${faisca(16, 30, 3.4, '#fffbeb', 0.2)}${faisca(120, 30, 3, '#fffbeb', 1)}${faisca(28, 116, 2.8, '#fde68a', 1.8)}${faisca(108, 118, 2.8, '#fde68a', 2.4)}`;
  },

  resplendor() {
    const ouro = idDoEnfeite('ouro');
    const luz = idDoEnfeite('luz');
    const brilho = idDoEnfeite('brilho');
    let longos = '';
    let curtos = '';
    for (let i = 0; i < 24; i += 1) {
      const a = i * 15;
      const [x1, y1] = pontoNoCirculo(55, a - 2.6);
      const [x2, y2] = pontoNoCirculo(55, a + 2.6);
      const [x3, y3] = pontoNoCirculo(i % 2 === 0 ? 68 : 64, a);
      longos += `<path d="M${n1(x1)} ${n1(y1)}L${n1(x3)} ${n1(y3)}L${n1(x2)} ${n1(y2)}Z"/>`;
      const [c1, d1] = pontoNoCirculo(56, a + 7.5 - 1.6);
      const [c2, d2] = pontoNoCirculo(56, a + 7.5 + 1.6);
      const [c3, d3] = pontoNoCirculo(62, a + 7.5);
      curtos += `<path d="M${n1(c1)} ${n1(d1)}L${n1(c3)} ${n1(d3)}L${n1(c2)} ${n1(d2)}Z"/>`;
    }
    return `<defs>
      <linearGradient id="${ouro}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fffbeb"/><stop offset=".5" stop-color="#f5c542"/><stop offset="1" stop-color="#a16207"/></linearGradient>
      <radialGradient id="${luz}"><stop offset=".72" stop-color="#fffbeb" stop-opacity="0"/><stop offset=".82" stop-color="#fffbeb" stop-opacity=".55"/><stop offset="1" stop-color="#fde68a" stop-opacity="0"/></radialGradient>
      ${filtroDeBrilho(brilho, 1.6)}
    </defs>
    <circle cx="68" cy="68" r="68" fill="url(#${luz})" class="enf-respira" style="--d:2.4s"/>
    <g class="enf-gira" style="--d:30s" fill="url(#${ouro})" filter="url(#${brilho})">${longos}</g>
    <g class="enf-gira" style="--d:30s;animation-direction:reverse" fill="#fffbeb" opacity=".85">${curtos}</g>
    <circle cx="68" cy="68" r="54" fill="none" stroke="url(#${ouro})" stroke-width="3.4"/>
    <circle cx="68" cy="68" r="51" fill="none" stroke="#fffbeb" stroke-width=".8" stroke-dasharray="1.5 5" class="enf-gira" style="--d:12s"/>`;
  },

  'constelacao-da-familia'() {
    const ouro = idDoEnfeite('ouro');
    const brilho = idDoEnfeite('brilho');
    const estrelas = [0, 60, 120, 180, 240, 300].map((a, i) => {
      const [x, y] = pontoNoCirculo(56, a);
      return `<g transform="translate(${n1(x)} ${n1(y)})"><g class="enf-cintila" style="--a:${n1(i * 0.4)}s"><path d="${caminhoDeEstrela(0, 0, 6.5, 2.7, 5)}" fill="url(#${ouro})"/></g></g>`;
    }).join('');
    const linhas = [0, 60, 120, 180, 240, 300].map((a) => {
      const [x1, y1] = pontoNoCirculo(56, a);
      const [x2, y2] = pontoNoCirculo(56, a + 60);
      return `<path d="M${n1(x1)} ${n1(y1)}L${n1(x2)} ${n1(y2)}" stroke="#fde68a" stroke-width=".5" opacity=".55"/>`;
    }).join('');
    const sorteio = sorteioFixo(66);
    let poeira = '';
    for (let i = 0; i < 22; i += 1) {
      const [x, y] = pontoNoCirculo(50 + sorteio() * 16, sorteio() * 360);
      poeira += `<circle cx="${n1(x)}" cy="${n1(y)}" r="${n1(0.4 + sorteio() * 0.8)}" fill="#fff" class="enf-pisca" style="--a:${n1(sorteio() * 3)}s"/>`;
    }
    return `<defs>
      <linearGradient id="${ouro}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fffbeb"/><stop offset=".5" stop-color="#facc15"/><stop offset="1" stop-color="#ca8a04"/></linearGradient>
      ${filtroDeBrilho(brilho, 1.8)}
    </defs>
    <circle cx="68" cy="68" r="52" fill="none" stroke="#1e3a8a" stroke-width="5" opacity=".75"/>
    <circle cx="68" cy="68" r="52" fill="none" stroke="#93c5fd" stroke-width=".7" opacity=".7"/>
    ${poeira}
    <g class="enf-gira" style="--d:24s" filter="url(#${brilho})">${linhas}${estrelas}</g>`;
  },
});

Object.assign(FAIXAS, {
  'amanhecer-nas-montanhas'() {
    const ceu = idDoEnfeite('ceu');
    const sol = idDoEnfeite('sol');
    const raio = idDoEnfeite('raio');
    let raios = '';
    for (let i = 0; i < 14; i += 1) {
      const a = 180 + (i * 180) / 13;
      const r1 = (a * Math.PI) / 180;
      raios += `<path d="M250 64L${n1(250 + Math.cos(r1 - 0.05) * 120)} ${n1(64 + Math.sin(r1 - 0.05) * 120)}L${n1(250 + Math.cos(r1 + 0.05) * 120)} ${n1(64 + Math.sin(r1 + 0.05) * 120)}Z" fill="url(#${raio})"/>`;
    }
    const passaros = [[180, 26, 0], [200, 18, 2.5], [215, 30, 5]].map(([x, y, a]) => `<g transform="translate(${x} ${y})"><g class="enf-voa" style="--d:16s;--a:-${a}s"><path d="M0 0Q3 -3 6 0Q9 -3 12 0" stroke="#3f1d38" stroke-width="1.2" fill="none"/></g></g>`).join('');
    return `<defs>
      <linearGradient id="${ceu}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1e1b4b"/><stop offset=".45" stop-color="#7c2d12"/><stop offset=".8" stop-color="#f59e0b"/><stop offset="1" stop-color="#fde68a"/></linearGradient>
      <radialGradient id="${sol}"><stop offset="0" stop-color="#fffbeb"/><stop offset=".5" stop-color="#fde68a"/><stop offset="1" stop-color="#f59e0b" stop-opacity="0"/></radialGradient>
      <linearGradient id="${raio}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fef3c7" stop-opacity=".35"/><stop offset="1" stop-color="#fef3c7" stop-opacity="0"/></linearGradient>
    </defs>
    <rect width="320" height="80" fill="url(#${ceu})"/>
    <g style="transform-box:view-box;transform-origin:250px 64px;animation:enfGira 60s linear infinite">${raios}</g>
    <circle cx="250" cy="64" r="26" fill="url(#${sol})" class="enf-respira"/>
    <path d="M110 80L160 40L190 58L230 30L270 56L300 38L320 50V80Z" fill="#4c1d95" opacity=".85"/>
    <path d="M120 80L170 54L205 68L245 48L285 66L320 58V80Z" fill="#2e1065"/>
    <path d="M140 80L190 66L230 74L275 64L320 72V80Z" fill="#1e1036"/>
    ${passaros}`;
  },

  'noite-de-natal'() {
    const ceu = idDoEnfeite('ceu');
    const facho = idDoEnfeite('facho');
    const brilho = idDoEnfeite('brilho');
    const sorteio = sorteioFixo(25);
    let estrelas = '';
    for (let i = 0; i < 30; i += 1) {
      estrelas += `<circle cx="${n1(120 + sorteio() * 200)}" cy="${n1(3 + sorteio() * 46)}" r="${n1(0.3 + sorteio() * 0.8)}" fill="#fff" class="enf-pisca" style="--a:${n1(sorteio() * 3)}s"/>`;
    }
    const janelas = [[200, 66], [214, 70], [250, 64], [262, 69], [292, 66], [306, 70]].map(([x, y], i) => `<rect x="${x}" y="${y}" width="3.4" height="4" rx=".6" fill="#fcd34d" class="enf-respira" style="--a:${n1(i * 0.5)}s"/>`).join('');
    return `<defs>
      <linearGradient id="${ceu}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#020617"/><stop offset=".7" stop-color="#172554"/><stop offset="1" stop-color="#1e3a8a"/></linearGradient>
      <linearGradient id="${facho}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fef9c3" stop-opacity=".7"/><stop offset="1" stop-color="#fef9c3" stop-opacity="0"/></linearGradient>
      ${filtroDeBrilho(brilho, 1.8)}
    </defs>
    <rect width="320" height="80" fill="url(#${ceu})"/>
    ${estrelas}
    <path d="M246 16L236 66H262Z" fill="url(#${facho})" class="enf-respira"/>
    <g transform="translate(249 15)" filter="url(#${brilho})"><g class="enf-cintila"><path d="M0 -9C.6 -2 2 -.6 9 0C2 .6 .6 2 0 9C-.6 2 -2 .6 -9 0C-2 -.6 -.6 -2 0 -9Z" fill="#fffbeb"/><path d="M0 -5L1 -1L5 0L1 1L0 5L-1 1L-5 0L-1 -1Z" fill="#fde68a" transform="rotate(45)"/></g></g>
    <path d="M150 80V70H170V62H178V70H196V60C196 54 210 54 210 60V64H222V70H240V58H246V54H250V58H256V70H276V62C276 56 288 56 288 62V64H300V68H320V80Z" fill="#0b1026"/>
    ${janelas}`;
  },

  girassois() {
    const ceu = idDoEnfeite('ceu');
    const sorteio = sorteioFixo(31);
    let flores = '';
    for (let i = 0; i < 9; i += 1) {
      const x = n1(150 + i * 19 + sorteio() * 6);
      const y = n1(46 + sorteio() * 14);
      let petalas = '';
      for (let k = 0; k < 12; k += 1) petalas += `<ellipse cx="0" cy="-5.6" rx="1.7" ry="3.6" transform="rotate(${k * 30})" fill="#facc15"/>`;
      flores += `<g transform="translate(${x} ${y})"><path d="M0 4V${n1(80 - y)}" stroke="#15803d" stroke-width="1.6"/><path d="M0 14C-5 10 -9 12 -10 15C-6 16 -3 16 0 14Z" fill="#22c55e"/><g class="enf-balanca-suave" style="animation-delay:${n1(sorteio() * 3)}s">${petalas}<circle r="3.6" fill="#78350f"/><circle r="2.2" fill="#92400e"/></g></g>`;
    }
    return `<defs><linearGradient id="${ceu}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#38bdf8"/><stop offset="1" stop-color="#bae6fd"/></linearGradient></defs>
    <rect width="320" height="80" fill="url(#${ceu})"/>
    <circle cx="300" cy="14" r="10" fill="#fde047" class="enf-respira"/>
    <path d="M110 80C150 64 220 66 320 62V80Z" fill="#65a30d"/>
    ${flores}
    <g transform="translate(176 20)"><g class="enf-borboleta"><path d="M0 0C-5 -6 -9 -2 -6 2C-4 4 -1 2 0 0Z" fill="#fb923c"/><path d="M0 0C5 -6 9 -2 6 2C4 4 1 2 0 0Z" fill="#f97316"/></g></g>`;
  },

  'nuvens-do-ceu'() {
    const ceu = idDoEnfeite('ceu');
    const raio = idDoEnfeite('raio');
    const nuvens = [[170, 22, 1.1, 22], [240, 44, 1.4, 30], [300, 18, 0.9, 26], [200, 62, 1.2, 34]]
      .map(([x, y, e, d], i) => `<g class="enf-nuvem" style="--d:${d}s;--a:-${i * 3}s">${nuvem(x, y, e, '#ffffff', 0.95)}</g>`).join('');
    return `<defs>
      <linearGradient id="${ceu}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0ea5e9"/><stop offset="1" stop-color="#e0f2fe"/></linearGradient>
      <linearGradient id="${raio}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fffbeb" stop-opacity=".55"/><stop offset="1" stop-color="#fffbeb" stop-opacity="0"/></linearGradient>
    </defs>
    <rect width="320" height="80" fill="url(#${ceu})"/>
    <path d="M260 0H280L310 80H230Z" fill="url(#${raio})" class="enf-respira"/>
    <path d="M200 0H212L228 80H186Z" fill="url(#${raio})" class="enf-respira" style="--a:1.2s"/>
    ${nuvens}
    ${faisca(220, 12, 2, '#fffbeb', 0.4)}${faisca(286, 60, 1.8, '#fffbeb', 1.6)}`;
  },

  'aurora-dourada'() {
    const ceu = idDoEnfeite('ceu');
    const ouro = idDoEnfeite('ouro');
    const lilas = idDoEnfeite('lilas');
    const borrao = idDoEnfeite('borrao');
    const sorteio = sorteioFixo(44);
    let estrelas = '';
    for (let i = 0; i < 28; i += 1) estrelas += `<circle cx="${n1(110 + sorteio() * 210)}" cy="${n1(2 + sorteio() * 76)}" r="${n1(0.3 + sorteio() * 0.7)}" fill="#fff" class="enf-pisca" style="--a:${n1(sorteio() * 3)}s"/>`;
    let cortinas = '';
    for (let x = 96; x <= 326; x += 3.5) {
      const base = 30 + Math.sin(x / 26) * 9 + Math.sin(x / 9) * 2.5;
      const alto = 26 + Math.sin(x / 17 + 1) * 10;
      const cor = Math.sin(x / 40) > -0.2 ? ouro : lilas;
      cortinas += `<rect x="${n1(x)}" y="${n1(base - alto * 0.4)}" width="3" height="${n1(alto)}" fill="url(#${cor})" class="enf-respira" style="--a:${n1((x % 37) / 9)}s;--d:${n1(2.2 + (x % 11) / 6)}s"/>`;
    }
    return `<defs>
      <linearGradient id="${ceu}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#030712"/><stop offset="1" stop-color="#1e1b4b"/></linearGradient>
      <linearGradient id="${ouro}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fde68a" stop-opacity="0"/><stop offset=".35" stop-color="#fde68a" stop-opacity=".8"/><stop offset="1" stop-color="#f59e0b" stop-opacity="0"/></linearGradient>
      <linearGradient id="${lilas}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#c4b5fd" stop-opacity="0"/><stop offset=".35" stop-color="#c4b5fd" stop-opacity=".7"/><stop offset="1" stop-color="#7c3aed" stop-opacity="0"/></linearGradient>
      <filter id="${borrao}" x="-10%" y="-30%" width="120%" height="160%"><feGaussianBlur stdDeviation="1.6"/></filter>
    </defs>
    <rect width="320" height="80" fill="url(#${ceu})"/>
    ${estrelas}
    <g class="enf-nuvem" style="--d:9s" filter="url(#${borrao})">${cortinas}</g>
    ${faisca(190, 12, 2.6, '#fef3c7', 0.2)}${faisca(270, 66, 2.2, '#fef3c7', 1.4)}${faisca(304, 14, 2.4, '#fef3c7', 2.2)}`;
  },

  'ceu-de-ouro'() {
    const ceu = idDoEnfeite('ceu');
    const raio = idDoEnfeite('raio');
    const ouro = idDoEnfeite('ouro');
    const brilho = idDoEnfeite('brilho');
    let raios = '';
    for (let i = 0; i < 24; i += 1) {
      const a = (i * 15 * Math.PI) / 180;
      raios += `<path d="M250 40L${n1(250 + Math.cos(a - 0.06) * 140)} ${n1(40 + Math.sin(a - 0.06) * 140)}L${n1(250 + Math.cos(a + 0.06) * 140)} ${n1(40 + Math.sin(a + 0.06) * 140)}Z" fill="url(#${raio})"/>`;
    }
    const sorteio = sorteioFixo(8);
    let poeira = '';
    for (let i = 0; i < 16; i += 1) poeira += `<g transform="translate(${n1(140 + sorteio() * 180)} ${n1(70 + sorteio() * 10)})"><circle class="enf-sobe-lento" style="--a:-${n1(sorteio() * 9)}s;--d:${n1(6 + sorteio() * 5)}s" r="${n1(0.8 + sorteio() * 1.4)}" fill="#fde68a"/></g>`;
    return `<defs>
      <linearGradient id="${ceu}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#1c1003"/><stop offset=".55" stop-color="#78350f"/><stop offset="1" stop-color="#b45309"/></linearGradient>
      <linearGradient id="${raio}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fef3c7" stop-opacity=".45"/><stop offset="1" stop-color="#fef3c7" stop-opacity="0"/></linearGradient>
      <linearGradient id="${ouro}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fffbeb"/><stop offset=".5" stop-color="#facc15"/><stop offset="1" stop-color="#a16207"/></linearGradient>
      ${filtroDeBrilho(brilho, 2)}
    </defs>
    <rect width="320" height="80" fill="url(#${ceu})"/>
    <g style="transform-box:view-box;transform-origin:250px 40px;animation:enfGira 50s linear infinite">${raios}</g>
    <g filter="url(#${brilho})" class="enf-respira"><path d="M246 14H254V30H268V38H254V68H246V38H232V30H246Z" fill="url(#${ouro})"/></g>
    ${poeira}
    ${faisca(196, 20, 2.6, '#fffbeb', 0.4)}${faisca(300, 64, 2.4, '#fffbeb', 1.6)}`;
  },

  'vitral-da-familia'() {
    const fundo = idDoEnfeite('fundo');
    const luz = idDoEnfeite('luz');
    const recorte = idDoEnfeite('recorte');
    const arcos = [150, 192, 234, 276].map((x) => `<path d="M${x} 80V26C${x} 14 ${x + 15} 6 ${x + 15} 6C${x + 15} 6 ${x + 30} 14 ${x + 30} 26V80Z"/>`).join('');
    const cores = ['#dc2626', '#2563eb', '#16a34a', '#facc15', '#9333ea', '#ea580c'];
    let janelas = '';
    [150, 192, 234, 276].forEach((x, j) => {
      let vidros = '';
      for (let k = 0; k < 6; k += 1) {
        const col = k % 2;
        const lin = Math.floor(k / 2);
        vidros += `<rect x="${x + 2 + col * 14}" y="${24 + lin * 16}" width="13" height="15" fill="${cores[(k + j) % cores.length]}" class="enf-respira" style="--a:${n1((k + j) * 0.35)}s;--d:2.8s"/>`;
      }
      janelas += `<g>
        <path d="M${x} 80V26C${x} 14 ${x + 15} 6 ${x + 15} 6C${x + 15} 6 ${x + 30} 14 ${x + 30} 26V80Z" fill="#111827"/>
        <circle cx="${x + 15}" cy="17" r="7" fill="${cores[(j + 3) % cores.length]}" class="enf-respira" style="--a:${n1(j * 0.6)}s"/>
        ${vidros}
        <path d="M${x} 80V26C${x} 14 ${x + 15} 6 ${x + 15} 6C${x + 15} 6 ${x + 30} 14 ${x + 30} 26V80Z" fill="none" stroke="#fcd34d" stroke-width="1.6"/>
        <path d="M${x + 15} 24V80M${x} 40H${x + 30}M${x} 56H${x + 30}" stroke="#1f2937" stroke-width="1.2"/>
      </g>`;
    });
    return `<defs>
      <linearGradient id="${fundo}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1c1917"/><stop offset="1" stop-color="#0c0a09"/></linearGradient>
      <linearGradient id="${luz}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fffbeb" stop-opacity="0"/><stop offset=".5" stop-color="#fffbeb" stop-opacity=".45"/><stop offset="1" stop-color="#fffbeb" stop-opacity="0"/></linearGradient>
      <clipPath id="${recorte}">${arcos}</clipPath>
    </defs>
    <rect width="320" height="80" fill="url(#${fundo})"/>
    ${janelas}
    <g clip-path="url(#${recorte})"><rect class="enf-varre" x="120" y="0" width="34" height="80" fill="url(#${luz})"/></g>`;
  },
});

function efeitoFogos(w, h, opcoes) {
  const cores = opcoes.cores;
  const estouros = Array.from({ length: opcoes.quantos }, (_, i) => ({
    x: w * (0.18 + Math.random() * 0.64),
    y: h * (0.15 + Math.random() * 0.35),
    t0: 0.15 + i * (2.6 / opcoes.quantos) + Math.random() * 0.15,
    cor: cores[i % cores.length],
    forma: opcoes.formas ? opcoes.formas[i % opcoes.formas.length] : 'roda',
    pontos: 42,
  }));
  const direcao = (forma, k, total) => {
    const a = (k / total) * Math.PI * 2;
    if (forma === 'estrela') {
      const r = 0.55 + 0.45 * Math.abs(Math.cos((a * 5) / 2));
      return [Math.cos(a) * r, Math.sin(a) * r];
    }
    if (forma === 'coracao') {
      const x = 16 * Math.pow(Math.sin(a), 3) / 16;
      const y = -(13 * Math.cos(a) - 5 * Math.cos(2 * a) - 2 * Math.cos(3 * a) - Math.cos(4 * a)) / 16;
      return [x, y];
    }
    return [Math.cos(a), Math.sin(a)];
  };
  return (ctx, s) => {
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    estouros.forEach((e) => {
      const t = s - e.t0;
      if (t < -0.45) return;
      if (t < 0) {
        const subida = 1 + t / 0.45;
        desenharLuz(ctx, e.x, h - (h - e.y) * subida, 5, e.cor, 0.8);
        return;
      }
      if (t > 1.6) return;
      const raio = Math.min(w, h) * 0.22 * (1 - Math.pow(1 - Math.min(1, t / 0.9), 3));
      const alfa = 1 - t / 1.6;
      for (let k = 0; k < e.pontos; k += 1) {
        const [dx, dy] = direcao(e.forma, k, e.pontos);
        const x = e.x + dx * raio;
        const y = e.y + dy * raio + 18 * t * t;
        desenharLuz(ctx, x, y, 4.5, e.cor, 0.65 * alfa);
        desenharFaisca(ctx, x, y, 2.2, `rgba(${e.cor}, 1)`, alfa);
      }
      desenharLuz(ctx, e.x, e.y, 40 * (1 - Math.min(1, t / 0.4)), e.cor, 0.5 * (1 - Math.min(1, t / 0.4)));
    });
    ctx.restore();
  };
}

function efeitoFogosDeGloria(w, h) {
  return efeitoFogos(w, h, { quantos: 5, cores: ['253, 224, 71', '255, 251, 235', '251, 191, 36'] });
}

function efeitoFogosDoCeu(w, h) {
  return efeitoFogos(w, h, { quantos: 6, cores: ['253, 224, 71', '244, 114, 182', '147, 197, 253', '196, 181, 253', '255, 251, 235'], formas: ['estrela', 'coracao', 'roda', 'estrela', 'coracao', 'estrela'] });
}

function efeitoConfete(w, h) {
  const cores = ['#f43f5e', '#f59e0b', '#22c55e', '#3b82f6', '#a855f7', '#facc15', '#ec4899'];
  const pedacos = Array.from({ length: 90 }, () => ({
    x: Math.random() * w, y: -20 - Math.random() * h * 0.6, vy: 90 + Math.random() * 120, vx: (Math.random() - 0.5) * 40,
    giro: Math.random() * 6, vg: (Math.random() - 0.5) * 10, cor: cores[Math.floor(Math.random() * cores.length)], l: 4 + Math.random() * 4,
  }));
  return (ctx, s) => {
    pedacos.forEach((p) => {
      const y = p.y + p.vy * s;
      if (y > h + 10) return;
      const x = p.x + p.vx * s + Math.sin(s * 3 + p.giro) * 10;
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(p.giro + p.vg * s);
      ctx.scale(1, Math.abs(Math.cos(s * 6 + p.giro)) + 0.2);
      ctx.fillStyle = p.cor;
      ctx.fillRect(-p.l / 2, -p.l / 4, p.l, p.l / 2);
      ctx.restore();
    });
  };
}

function floco(ctx, x, y, r, alfa, giro) {
  ctx.save();
  ctx.globalAlpha *= alfa;
  ctx.translate(x, y);
  ctx.rotate(giro);
  ctx.strokeStyle = '#f8fafc';
  ctx.lineWidth = Math.max(0.8, r * 0.18);
  ctx.lineCap = 'round';
  for (let i = 0; i < 6; i += 1) {
    ctx.rotate(Math.PI / 3);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, -r);
    ctx.moveTo(0, -r * 0.55);
    ctx.lineTo(r * 0.25, -r * 0.75);
    ctx.moveTo(0, -r * 0.55);
    ctx.lineTo(-r * 0.25, -r * 0.75);
    ctx.stroke();
  }
  ctx.restore();
}

function efeitoNeveDeNatal(w, h) {
  const flocos = Array.from({ length: 55 }, () => ({ x: Math.random() * w, y: -10 - Math.random() * h * 0.7, vy: 30 + Math.random() * 45, r: 3 + Math.random() * 5, fase: Math.random() * 6, giro: Math.random() * 3 }));
  return (ctx, s) => {
    const aparece = suave(s / 0.6);
    flocos.forEach((f) => {
      const y = f.y + f.vy * s;
      if (y > h + 10) return;
      floco(ctx, f.x + Math.sin(s * 1.3 + f.fase) * 14, y, f.r, 0.9 * aparece, f.giro + s * 0.6);
    });
  };
}

function desenharBorboleta(ctx, x, y, tamanho, bater, cor, cor2) {
  ctx.save();
  ctx.translate(x, y);
  [-1, 1].forEach((lado) => {
    ctx.save();
    ctx.scale(lado * (0.25 + 0.75 * Math.abs(bater)), 1);
    ctx.fillStyle = cor;
    ctx.beginPath();
    ctx.ellipse(tamanho * 0.55, -tamanho * 0.35, tamanho * 0.55, tamanho * 0.42, -0.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = cor2;
    ctx.beginPath();
    ctx.ellipse(tamanho * 0.42, tamanho * 0.3, tamanho * 0.36, tamanho * 0.3, 0.4, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  });
  ctx.fillStyle = '#3f3f46';
  ctx.fillRect(-tamanho * 0.06, -tamanho * 0.45, tamanho * 0.12, tamanho * 0.9);
  ctx.restore();
}

function efeitoBorboletas(w, h) {
  const pares = [['#f472b6', '#fbcfe8'], ['#60a5fa', '#bfdbfe'], ['#facc15', '#fef08a'], ['#a78bfa', '#ddd6fe'], ['#fb923c', '#fed7aa']];
  const voo = Array.from({ length: 12 }, (_, i) => ({ x: Math.random() * w, y: h + 20 + Math.random() * 60, vy: 70 + Math.random() * 60, fase: Math.random() * 6, t: 9 + Math.random() * 7, cor: pares[i % pares.length] }));
  return (ctx, s) => {
    voo.forEach((b) => {
      const y = b.y - b.vy * s;
      if (y < -30) return;
      const x = b.x + Math.sin(s * 1.6 + b.fase) * 30;
      desenharBorboleta(ctx, x, y, b.t, Math.sin(s * 14 + b.fase), b.cor[0], b.cor[1]);
    });
  };
}

function efeitoChuvaDeOuro(w, h) {
  const estrelas = Array.from({ length: 70 }, () => ({ x: Math.random() * w, y: -20 - Math.random() * h * 0.8, vy: 110 + Math.random() * 120, r: 3 + Math.random() * 5, giro: Math.random() * 6, fase: Math.random() * 6 }));
  return (ctx, s) => {
    const topo = ctx.createLinearGradient(0, 0, 0, h * 0.3);
    topo.addColorStop(0, `rgba(253, 230, 138, ${0.35 * suave(s / 0.6)})`);
    topo.addColorStop(1, 'rgba(253, 230, 138, 0)');
    ctx.fillStyle = topo;
    ctx.fillRect(0, 0, w, h * 0.3);
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    estrelas.forEach((e) => {
      const y = e.y + e.vy * s;
      if (y > h + 20) return;
      const brilho = 0.6 + 0.4 * Math.sin(s * 8 + e.fase);
      desenharLuz(ctx, e.x, y, e.r * 2.6, '253, 224, 71', 0.35 * brilho);
      ctx.save();
      ctx.translate(e.x, y);
      ctx.rotate(e.giro + s * 2);
      desenharFaisca(ctx, 0, 0, e.r, '#fde68a', brilho);
      ctx.restore();
    });
    ctx.restore();
  };
}

function efeitoCoroacao(w, h) {
  const faiscas = Array.from({ length: 30 }, () => ({ a: Math.random() * Math.PI * 2, d: 20 + Math.random() * 60, fase: Math.random() * 6 }));
  return (ctx, s) => {
    const cx = w / 2;
    const alvoY = Math.min(h * 0.3, 150);
    const desce = suave(s / 1.4);
    const y = -40 + (alvoY + 40) * desce;
    const tam = Math.min(w, 420) * 0.16;
    const pousou = suave((s - 1.3) / 0.5);
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    for (let i = 0; i < 12; i += 1) {
      const a = -Math.PI / 2 + (i - 5.5) * 0.16;
      const g = ctx.createLinearGradient(cx, y, cx + Math.cos(a) * h, y + Math.sin(a) * -h);
      g.addColorStop(0, `rgba(254, 243, 199, ${0.22 * pousou})`);
      g.addColorStop(1, 'rgba(254, 243, 199, 0)');
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.moveTo(cx, y);
      ctx.lineTo(cx + Math.cos(a - 0.05) * h, y - Math.abs(Math.sin(a - 0.05)) * h);
      ctx.lineTo(cx + Math.cos(a + 0.05) * h, y - Math.abs(Math.sin(a + 0.05)) * h);
      ctx.closePath();
      ctx.fill();
    }
    desenharLuz(ctx, cx, y, tam * 2.2, '253, 224, 71', 0.45);
    ctx.restore();
    ctx.save();
    ctx.translate(cx, y);
    ctx.scale(tam / 40, tam / 40);
    const ouro = ctx.createLinearGradient(-20, -18, 20, 12);
    ouro.addColorStop(0, '#fffbeb');
    ouro.addColorStop(0.45, '#facc15');
    ouro.addColorStop(1, '#a16207');
    ctx.fillStyle = ouro;
    ctx.beginPath();
    ctx.moveTo(-20, 10);
    ctx.lineTo(-23, -10);
    ctx.lineTo(-11, 0);
    ctx.lineTo(0, -16);
    ctx.lineTo(11, 0);
    ctx.lineTo(23, -10);
    ctx.lineTo(20, 10);
    ctx.closePath();
    ctx.fill();
    ctx.fillRect(-20, 10, 40, 6);
    [['#dc2626', 0, 13], ['#2563eb', -11, 13], ['#16a34a', 11, 13]].forEach(([cor, x, yy]) => {
      ctx.fillStyle = cor;
      ctx.beginPath();
      ctx.arc(x, yy, 2.2, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.fillStyle = '#fffbeb';
    [[0, -18], [-23, -12], [23, -12]].forEach(([x, yy]) => {
      ctx.beginPath();
      ctx.arc(x, yy, 2.6, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.restore();
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    faiscas.forEach((f) => {
      const alfa = pousou * (0.5 + 0.5 * Math.sin(s * 7 + f.fase));
      desenharFaisca(ctx, cx + Math.cos(f.a) * f.d * (1 + pousou * 0.6), y + Math.sin(f.a) * f.d * 0.6, 3, '#fef3c7', alfa);
    });
    ctx.restore();
  };
}

Object.assign(EFEITOS_DO_PERFIL, {
  'fogos-de-gloria': efeitoFogosDeGloria,
  confete: efeitoConfete,
  'neve-de-natal': efeitoNeveDeNatal,
  borboletas: efeitoBorboletas,
  'chuva-de-ouro': efeitoChuvaDeOuro,
  coroacao: efeitoCoroacao,
  'fogos-do-ceu': efeitoFogosDoCeu,
});

function fundoDoMini(g, cima, baixo) {
  return `<defs><linearGradient id="${g}c" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${cima}"/><stop offset="1" stop-color="${baixo}"/></linearGradient></defs><rect width="64" height="40" rx="7" fill="url(#${g}c)"/>`;
}

function estouroMini(x, y, r, cor) {
  let raios = '';
  for (let i = 0; i < 12; i += 1) {
    const a = (i * 30 * Math.PI) / 180;
    raios += `<path d="M${n1(x + Math.cos(a) * r * 0.35)} ${n1(y + Math.sin(a) * r * 0.35)}L${n1(x + Math.cos(a) * r)} ${n1(y + Math.sin(a) * r)}" stroke="${cor}" stroke-width="1.1" stroke-linecap="round"/>`;
  }
  return raios;
}

Object.assign(MINIS_DE_EFEITO, {
  'fogos-de-gloria'(g) {
    return `${fundoDoMini(g, '#020617', '#1e1b4b')}${estouroMini(22, 15, 10, '#fde047')}${estouroMini(44, 22, 8, '#fffbeb')}${faisca(52, 8, 1.6, '#fde68a', 0)}`;
  },
  confete(g) {
    const cores = ['#f43f5e', '#f59e0b', '#22c55e', '#3b82f6', '#a855f7', '#facc15'];
    const sorteio = sorteioFixo(9);
    let pedacos = '';
    for (let i = 0; i < 18; i += 1) pedacos += `<rect x="${n1(4 + sorteio() * 54)}" y="${n1(3 + sorteio() * 32)}" width="4" height="2" rx=".6" transform="rotate(${n1(sorteio() * 180)} ${n1(6 + sorteio() * 50)} 20)" fill="${cores[i % cores.length]}"/>`;
    return `${fundoDoMini(g, '#1e1b4b', '#4c1d95')}${pedacos}`;
  },
  'neve-de-natal'(g) {
    const flocos = [[14, 10, 4], [34, 20, 5], [52, 9, 3.5], [24, 31, 3], [48, 30, 4]].map(([x, y, r]) => {
      let bracos = '';
      for (let i = 0; i < 6; i += 1) bracos += `<path d="M0 0V${-r}" transform="rotate(${i * 60})"/>`;
      return `<g transform="translate(${x} ${y})" stroke="#f8fafc" stroke-width=".9" stroke-linecap="round">${bracos}</g>`;
    }).join('');
    return `${fundoDoMini(g, '#0c4a6e', '#38bdf8')}${flocos}`;
  },
  borboletas(g) {
    const borboleta = (x, y, e, c1, c2) => `<g transform="translate(${x} ${y}) scale(${e})"><path d="M0 0C-5 -6 -9 -2 -6 2C-4 4 -1 2 0 0Z" fill="${c1}"/><path d="M0 0C5 -6 9 -2 6 2C4 4 1 2 0 0Z" fill="${c2}"/><path d="M0 -2V3" stroke="#3f3f46" stroke-width=".8"/></g>`;
    return `${fundoDoMini(g, '#86efac', '#bbf7d0')}${borboleta(20, 22, 1.4, '#f472b6', '#ec4899')}${borboleta(44, 14, 1.1, '#60a5fa', '#3b82f6')}${borboleta(48, 31, 0.9, '#facc15', '#f59e0b')}`;
  },
  'chuva-de-ouro'(g) {
    return `${fundoDoMini(g, '#422006', '#a16207')}${[[12, 8], [26, 20], [40, 10], [52, 26], [20, 32], [46, 34]].map(([x, y], i) => faisca(x, y, 2.6 - (i % 3) * 0.4, '#fde68a', i * 0.3)).join('')}`;
  },
  coroacao(g) {
    return `${fundoDoMini(g, '#1e1b4b', '#7c2d12')}<path d="M32 4L24 24H40Z" fill="#fef3c7" opacity=".35"/><g transform="translate(32 22) scale(.6)"><path d="M-20 10L-23 -10L-11 0L0 -16L11 0L23 -10L20 10Z" fill="#facc15" stroke="#a16207" stroke-width="1"/><rect x="-20" y="10" width="40" height="6" fill="#eab308"/><circle cx="0" cy="13" r="2.4" fill="#dc2626"/></g>${faisca(14, 12, 1.8, '#fef3c7', 0)}${faisca(50, 30, 1.6, '#fef3c7', 0.7)}`;
  },
  'fogos-do-ceu'(g) {
    const coracao = '<path transform="translate(44 18) scale(1.1)" d="M0 7C-9 1 -9 -7 -4.5 -7C-2 -7 -.5 -5.5 0 -4C.5 -5.5 2 -7 4.5 -7C9 -7 9 1 0 7Z" fill="none" stroke="#f472b6" stroke-width="1.2" stroke-dasharray="1.5 1.5"/>';
    return `${fundoDoMini(g, '#020617', '#312e81')}<path d="${caminhoDeEstrela(20, 18, 11, 5, 5)}" fill="none" stroke="#fde047" stroke-width="1.1" stroke-dasharray="1.5 1.5"/>${coracao}${faisca(32, 33, 1.6, '#c4b5fd', 0.4)}`;
  },
});

const CODIGO_DO_CLIQUE = { vezes: 0, tempo: 0 };

function abrirJanelaDoCodigo() {
  let janela = document.getElementById('codigo-especial-modal');
  if (!janela) {
    janela = document.createElement('div');
    janela.id = 'codigo-especial-modal';
    janela.className = 'search-modal';
    janela.innerHTML = `<div class="search-modal-content codigo-especial">
      <div class="search-header"><h3>Código</h3><button type="button" class="icon-btn" id="codigo-especial-fechar" aria-label="Fechar"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg></button></div>
      <form id="codigo-especial-form" autocomplete="off">
        <input type="text" id="codigo-especial-campo" maxlength="40" autocapitalize="characters" spellcheck="false" aria-label="Código">
        <button type="submit" class="licao-botao">Usar código</button>
        <p class="codigo-especial-aviso" id="codigo-especial-aviso" role="status"></p>
      </form>
    </div>`;
    document.body.appendChild(janela);
    janela.addEventListener('click', (evento) => { if (evento.target === janela) janela.classList.remove('active'); });
    document.getElementById('codigo-especial-fechar').addEventListener('click', () => janela.classList.remove('active'));
    document.getElementById('codigo-especial-form').addEventListener('submit', usarCodigoEspecial);
  }
  document.getElementById('codigo-especial-aviso').textContent = '';
  document.getElementById('codigo-especial-campo').value = '';
  janela.classList.add('active');
  setTimeout(() => document.getElementById('codigo-especial-campo').focus(), 50);
}

async function usarCodigoEspecial(evento) {
  evento.preventDefault();
  const aviso = document.getElementById('codigo-especial-aviso');
  const codigo = document.getElementById('codigo-especial-campo').value.trim();
  if (!codigo) return;
  if (typeof contaLogada !== 'function' || !contaLogada()) {
    aviso.textContent = 'Entre na sua conta para usar o código.';
    return;
  }
  aviso.textContent = 'Conferindo...';
  try {
    const { data, error } = await supabaseCliente.rpc('usar_codigo_especial', { _codigo: codigo });
    if (error) throw error;
    if (data && data.ok) {
      if (typeof carregarContaEspecial === 'function') await carregarContaEspecial();
      aviso.textContent = 'Pronto! As animações exclusivas da família foram liberadas em Meu perfil, na opção Enfeites do perfil.';
      if (typeof renderizarEscolhaDeEnfeites === 'function' && typeof escolhaDeEnfeites !== 'undefined' && escolhaDeEnfeites) renderizarEscolhaDeEnfeites();
    } else if (data && data.espera) {
      aviso.textContent = 'Muitas tentativas. Espere uma hora e tente de novo.';
    } else {
      aviso.textContent = 'Esse código não vale para esta conta.';
    }
  } catch (e) {
    aviso.textContent = 'Não foi possível conferir agora. Tente de novo em instantes.';
  }
}

function contarToqueNaEstrelaDoRodape() {
  const agora = Date.now();
  if (agora - CODIGO_DO_CLIQUE.tempo > 1500) CODIGO_DO_CLIQUE.vezes = 0;
  CODIGO_DO_CLIQUE.tempo = agora;
  CODIGO_DO_CLIQUE.vezes += 1;
  if (CODIGO_DO_CLIQUE.vezes >= 5) {
    CODIGO_DO_CLIQUE.vezes = 0;
    abrirJanelaDoCodigo();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const estrela = document.querySelector('.site-footer .footer-icon');
  if (estrela) estrela.addEventListener('click', contarToqueNaEstrelaDoRodape);
});
