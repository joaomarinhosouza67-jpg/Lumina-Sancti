const FRASCOS_DE_AZEITE = {
  fe_dobro: { nome: 'Fé em dobro', tempo: '15 min', cor: '#f6c445', escura: '#a8650f', simbolo: 'dobro' },
  santidade: { nome: 'Santidade cheia', cor: '#9fe0ff', escura: '#2f7fb8', simbolo: 'aureola' },
  protecao: { nome: 'Protetor da ofensiva', tempo: '1 dia', cor: '#ff9a4d', escura: '#b8401a', simbolo: 'chama' },
};
const CORES_DOS_BAUS = {
  madeira: { corpo: ['#b57437', '#7c461c', '#4a250b'], tampa: ['#c98545', '#8d5022', '#5a2f10'], metal: ['#e6e9ef', '#7d8593', '#30353f'], veio: '#2e1606', cruz: '#2b2f38', luz: '#ffd08a', forro: ['#6a3a17', '#2e1606'] },
  prata: { corpo: ['#3e4f86', '#25305a', '#121836'], tampa: ['#4c5f9c', '#2b3768', '#151c3e'], metal: ['#ffffff', '#c3ccdc', '#5b6880'], veio: '#0a0f24', cruz: '#3b4766', luz: '#e4ecff', forro: ['#2c3f86', '#101a44'] },
  ouro: { corpo: ['#a3222a', '#6d1018', '#3a060b'], tampa: ['#b42b33', '#7a121b', '#40070c'], metal: ['#fff6d0', '#e5b444', '#7d4f0e'], veio: '#2a0306', cruz: '#7d4f0e', luz: '#ffe28a', joias: true, forro: ['#8e1b3a', '#4a0718'] },
  safira: { corpo: ['#2a6fd1', '#174a99', '#0a2457'], tampa: ['#3a80e0', '#1d56ad', '#0c2a66'], metal: ['#ffffff', '#cfd8e6', '#6b7a90'], veio: '#04122e', cruz: '#6b7a90', luz: '#bfe0ff', joias: true, forro: ['#173c80', '#071a3f'] },
  ametista: { corpo: ['#8a4fd0', '#5a2a9a', '#2e1159'], tampa: ['#9b62dd', '#6633aa', '#341466'], metal: ['#fff6d0', '#e5b444', '#7d4f0e'], veio: '#1a0533', cruz: '#7d4f0e', luz: '#ecd2ff', joias: true, forro: ['#5a2a9a', '#260c4a'] },
};
const DESAFIOS_DO_DIA = {
  missoes1: { texto: 'Faça 1 missão', icone: 'trilha', ir: 'trilhas' },
  missoes2: { texto: 'Faça 2 missões', icone: 'trilha', ir: 'trilhas' },
  fe20: { texto: 'Ganhe 20 de Fé', icone: 'estrela', ir: 'trilhas' },
  fe40: { texto: 'Ganhe 40 de Fé', icone: 'estrela', ir: 'trilhas' },
  perfeita: { texto: 'Faça uma missão sem errar', icone: 'medalha', ir: 'trilhas' },
  terco: { texto: 'Reze o terço', icone: 'terco', ir: 'terco' },
  quiz: { texto: 'Jogue o Quiz dos Santos', icone: 'lampada', ir: 'quiz' },
  oracao: { texto: 'Reze uma oração', icone: 'cruz', ir: 'oracoes' },
  jogo: { texto: 'Jogue um joguinho', icone: 'estrela', ir: 'jogos' },
};

let contadorDosDesenhosDeBau = 0;
let caixasDoDia = { desafios: null, mochila: null };
const desafiosJaAvisados = new Set();
let reloginhoDoFrasco = null;

function trDoBau(texto, valores) {
  return typeof tr === 'function' ? tr(texto, valores) : String(texto).replace(/\{(\w+)\}/g, (_, k) => (valores && valores[k] !== undefined ? valores[k] : ''));
}

function iconeDoBau(nome) {
  return typeof icone === 'function' ? icone(nome) : '';
}

function perfilDosBaus() {
  if (typeof contaLogada === 'function' && !contaLogada()) return null;
  const membro = typeof obterMembroAtivo === 'function' ? obterMembroAtivo() : null;
  return membro && membro.id && typeof supabaseCliente !== 'undefined' && supabaseCliente ? membro : null;
}

function svgDoFrasco(tipo, tamanho) {
  const f = FRASCOS_DE_AZEITE[tipo] || FRASCOS_DE_AZEITE.fe_dobro;
  const id = `frasco-${tipo}-${(contadorDosDesenhosDeBau += 1)}`;
  const simbolos = {
    dobro: '<text x="32" y="58" text-anchor="middle" font-family="Georgia, serif" font-size="13" font-weight="700" fill="#5a3203" opacity=".75">2×</text>',
    aureola: '<ellipse cx="32" cy="52" rx="8" ry="3" fill="none" stroke="#ffffff" stroke-width="2" opacity=".85"/><path d="M32 54 v8 M28 58 h8" stroke="#ffffff" stroke-width="2" stroke-linecap="round" opacity=".85"/>',
    chama: '<path d="M32 46 c4 5 7 8 6 12 c-1 4 -4 6 -6 6 c-3 0 -6 -2 -6 -6 c0 -3 2 -5 3 -7 c1 2 2 3 3 3 c0 -3 -1 -5 0 -8z" fill="#fff4d6" opacity=".9"/>',
  };
  return `<svg class="frasco-svg" viewBox="0 0 64 80" width="${tamanho || 48}" height="${Math.round((tamanho || 48) * 1.25)}" aria-hidden="true">
    <defs>
      <linearGradient id="${id}-l" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fffbe8"/><stop offset=".3" stop-color="${f.cor}"/><stop offset="1" stop-color="${f.escura}"/></linearGradient>
      <radialGradient id="${id}-v" cx=".32" cy=".3" r=".75"><stop offset="0" stop-color="#ffffff" stop-opacity=".55"/><stop offset=".45" stop-color="#ffffff" stop-opacity=".08"/><stop offset="1" stop-color="#ffffff" stop-opacity="0"/></radialGradient>
      <radialGradient id="${id}-b"><stop offset="0" stop-color="${f.cor}" stop-opacity=".55"/><stop offset="1" stop-color="${f.cor}" stop-opacity="0"/></radialGradient>
    </defs>
    <circle cx="32" cy="50" r="30" fill="url(#${id}-b)"/>
    <ellipse cx="32" cy="76" rx="17" ry="3.2" fill="#000" opacity=".28"/>
    <path d="M25 6 h14 l-1.5 9 h-11z" fill="#9b6a35"/><path d="M25 6 h14" stroke="#c99a5e" stroke-width="2" stroke-linecap="round"/>
    <path d="M26.5 15 h11 v8 c11 4.5 17 13.5 17 25 a22.5 22.5 0 0 1 -45 0 c0 -11.5 6 -20.5 17 -25z" fill="rgba(210,230,255,.16)"/>
    <path d="M11.2 44 c6 2.6 12.4 -1.8 20.8 .4 c8 2.1 14 -1.6 20.8 -.6 c.5 1.3 .7 2.9 .7 4.2 a21.5 21.5 0 0 1 -43 0 c0 -1.4 .2 -2.7 .7 -4z" fill="url(#${id}-l)"/>
    ${simbolos[f.simbolo] || ''}
    <path d="M26.5 15 h11 v8 c11 4.5 17 13.5 17 25 a22.5 22.5 0 0 1 -45 0 c0 -11.5 6 -20.5 17 -25z" fill="url(#${id}-v)" stroke="rgba(255,255,255,.6)" stroke-width="1.4"/>
    <path d="M17 37 q-4 8 -1 17" stroke="#ffffff" stroke-opacity=".65" stroke-width="2.6" fill="none" stroke-linecap="round"/>
  </svg>`;
}

function svgDoBau(tipo, tamanho) {
  const c = CORES_DOS_BAUS[tipo] || CORES_DOS_BAUS.madeira;
  const id = `bau-${tipo}-${(contadorDosDesenhosDeBau += 1)}`;
  const rebite = (x, y) => `<circle cx="${x}" cy="${y}" r="2.3" fill="url(#${id}-r)"/><circle cx="${x - 0.7}" cy="${y - 0.8}" r="0.8" fill="#fff" opacity=".7"/>`;
  const rebites = [78, 94, 110, 124].map((y) => rebite(37, y) + rebite(123, y)).join('');
  const veios = [76, 84, 92, 100, 108, 116, 122].map((y, i) => `<path d="M${20 + (i % 3) * 4} ${y} q18 ${i % 2 ? -1.6 : 1.4} 36 0 t36 0 t36 0" fill="none" stroke="${c.veio}" stroke-width=".8" opacity=".35"/>`).join('');
  const joias = c.joias ? `<circle cx="80" cy="91" r="3.4" fill="url(#${id}-j)" stroke="#5c0a0a" stroke-width=".6"/><circle cx="79" cy="90" r="1.1" fill="#fff" opacity=".8"/>` : '';
  const joiasDaTampa = c.joias ? `<g class="bau-joias-tampa"><circle cx="80" cy="40" r="4" fill="url(#${id}-s)" stroke="#0b2a5c" stroke-width=".6"/><circle cx="79" cy="38.8" r="1.3" fill="#fff" opacity=".85"/><circle cx="58" cy="44" r="2.6" fill="url(#${id}-j)"/><circle cx="102" cy="44" r="2.6" fill="url(#${id}-j)"/></g>` : '';
  return `<svg class="bau-svg bau-${tipo}" viewBox="0 0 160 150" width="${tamanho || 64}" height="${Math.round((tamanho || 64) * 0.94)}" aria-hidden="true">
    <defs>
      <linearGradient id="${id}-c" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${c.corpo[0]}"/><stop offset=".55" stop-color="${c.corpo[1]}"/><stop offset="1" stop-color="${c.corpo[2]}"/></linearGradient>
      <linearGradient id="${id}-t" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${c.tampa[0]}"/><stop offset=".6" stop-color="${c.tampa[1]}"/><stop offset="1" stop-color="${c.tampa[2]}"/></linearGradient>
      <linearGradient id="${id}-lado" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#000" stop-opacity=".45"/><stop offset=".18" stop-color="#000" stop-opacity="0"/><stop offset=".82" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".5"/></linearGradient>
      <linearGradient id="${id}-m" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${c.metal[2]}"/><stop offset=".35" stop-color="${c.metal[0]}"/><stop offset=".6" stop-color="${c.metal[1]}"/><stop offset="1" stop-color="${c.metal[2]}"/></linearGradient>
      <linearGradient id="${id}-mh" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${c.metal[0]}"/><stop offset=".5" stop-color="${c.metal[1]}"/><stop offset="1" stop-color="${c.metal[2]}"/></linearGradient>
      <radialGradient id="${id}-r" cx=".35" cy=".35" r=".7"><stop offset="0" stop-color="${c.metal[0]}"/><stop offset="1" stop-color="${c.metal[2]}"/></radialGradient>
      <radialGradient id="${id}-l" cx=".5" cy="1" r="1"><stop offset="0" stop-color="#ffffff" stop-opacity=".95"/><stop offset=".35" stop-color="${c.luz}" stop-opacity=".85"/><stop offset="1" stop-color="${c.luz}" stop-opacity="0"/></radialGradient>
      <radialGradient id="${id}-j" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="#ffd1d1"/><stop offset=".45" stop-color="#e11d48"/><stop offset="1" stop-color="#6b0a1e"/></radialGradient>
      <radialGradient id="${id}-s" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="#d6ecff"/><stop offset=".45" stop-color="#2f6fe0"/><stop offset="1" stop-color="#0b2a5c"/></radialGradient>
      <linearGradient id="${id}-brilho" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".35"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>
    </defs>
    <ellipse cx="80" cy="140" rx="62" ry="7" fill="#000" opacity=".35"/>
    <g class="bau-luz" opacity="0"><path d="M26 70 L54 -10 H106 L134 70 Z" fill="url(#${id}-l)" opacity=".8"/><ellipse cx="80" cy="70" rx="56" ry="9" fill="#fff8dc" opacity=".9"/></g>
    <g class="bau-corpo">
      <path d="M22 68 H138 L136 70 H24 Z" fill="#1a0d05" opacity=".6"/>
      <path d="M18 70 H142 V128 a6 6 0 0 1 -6 6 H24 a6 6 0 0 1 -6 -6 Z" fill="url(#${id}-c)"/>
      ${veios}
      <path d="M18 86 H142 M18 102 H142 M18 118 H142" stroke="#000" stroke-opacity=".28" stroke-width="1.2"/>
      <path d="M18 87 H142 M18 103 H142 M18 119 H142" stroke="#fff" stroke-opacity=".07" stroke-width="1"/>
      <path d="M18 70 H142 V128 a6 6 0 0 1 -6 6 H24 a6 6 0 0 1 -6 -6 Z" fill="url(#${id}-lado)"/>
      <rect x="31" y="70" width="12" height="64" fill="url(#${id}-m)"/>
      <rect x="117" y="70" width="12" height="64" fill="url(#${id}-m)"/>
      <rect x="16" y="68" width="128" height="7" rx="2" fill="url(#${id}-mh)"/>
      <path d="M16 124 H144 V128 a8 8 0 0 1 -8 8 H24 a8 8 0 0 1 -8 -8 Z" fill="url(#${id}-mh)"/>
      <path d="M16 112 V128 a8 8 0 0 0 8 8 H34 V128 H24 V112 Z" fill="url(#${id}-mh)" opacity=".95"/>
      <path d="M144 112 V128 a8 8 0 0 1 -8 8 H126 V128 H136 V112 Z" fill="url(#${id}-mh)" opacity=".95"/>
      ${rebites}
      <path d="M66 76 H94 V96 C94 106 86 112 80 115 C74 112 66 106 66 96 Z" fill="url(#${id}-mh)" stroke="${c.metal[2]}" stroke-width="1"/>
      <path d="M68.5 78.5 H91.5 V96 C91.5 104.5 85 109.5 80 112 C75 109.5 68.5 104.5 68.5 96 Z" fill="none" stroke="${c.metal[0]}" stroke-opacity=".6" stroke-width=".8"/>
      <path d="M80 81 V103 M73 89 H87" stroke="${c.cruz}" stroke-width="3.2" stroke-linecap="round"/>
      <path d="M80 81 V103 M73 89 H87" stroke="#fff" stroke-opacity=".25" stroke-width="1" stroke-linecap="round"/>
      ${joias}
    </g>
    <g class="bau-tampa">
      <path d="M16 72 V58 C16 34 44 20 80 20 C116 20 144 34 144 58 V72 Z" fill="url(#${id}-t)"/>
      <path d="M24 52 C30 38 52 30 80 30 C108 30 130 38 136 52 M18 64 C22 50 48 41 80 41 C112 41 138 50 142 64" fill="none" stroke="#000" stroke-opacity=".25" stroke-width="1.2"/>
      <path d="M16 72 V58 C16 34 44 20 80 20 C116 20 144 34 144 58 V72 Z" fill="url(#${id}-lado)"/>
      <path d="M31 72 V48 C33 38 37 33 43 29 V72 Z" fill="url(#${id}-m)"/>
      <path d="M129 72 V48 C127 38 123 33 117 29 V72 Z" fill="url(#${id}-m)"/>
      <path d="M34 34 C46 25 62 22 80 22 C98 22 114 25 126 34" fill="none" stroke="url(#${id}-brilho)" stroke-width="5" stroke-linecap="round"/>
      <rect x="14" y="64" width="132" height="9" rx="3" fill="url(#${id}-mh)"/>
      ${rebite(37, 50) + rebite(123, 50) + rebite(37, 68) + rebite(123, 68)}
      <path d="M72 66 H88 V80 a8 8 0 0 1 -16 0 Z" fill="url(#${id}-mh)" stroke="${c.metal[2]}" stroke-width="1"/>
      <circle cx="80" cy="79" r="2.6" fill="${c.metal[2]}"/>
      ${joiasDaTampa}
    </g>
  </svg>`;
}

function forroDaTampa(tipo, largura) {
  const c = CORES_DOS_BAUS[tipo] || CORES_DOS_BAUS.madeira;
  const id = `forro-${tipo}-${(contadorDosDesenhosDeBau += 1)}`;
  let losangos = '';
  for (let x = 8; x <= 120; x += 14) for (let y = 6; y <= 44; y += 12) losangos += `<path d="M${x} ${y - 6} L${x + 7} ${y} L${x} ${y + 6} L${x - 7} ${y} Z" fill="none" stroke="#000" stroke-opacity=".25" stroke-width=".7"/><circle cx="${x}" cy="${y - 6}" r=".9" fill="${c.metal[0]}" opacity=".7"/>`;
  return `<svg class="bau-forro" viewBox="0 0 128 46" width="${largura}" height="${Math.round(largura * 46 / 128)}" preserveAspectRatio="none" aria-hidden="true">
    <defs>
      <radialGradient id="${id}-v" cx=".5" cy=".85" r=".95"><stop offset="0" stop-color="${c.forro[0]}"/><stop offset="1" stop-color="${c.forro[1]}"/></radialGradient>
      <linearGradient id="${id}-m" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${c.metal[0]}"/><stop offset=".5" stop-color="${c.metal[1]}"/><stop offset="1" stop-color="${c.metal[2]}"/></linearGradient>
      <linearGradient id="${id}-l" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="${c.luz}" stop-opacity=".55"/><stop offset="1" stop-color="${c.luz}" stop-opacity="0"/></linearGradient>
    </defs>
    <rect width="128" height="46" rx="2" fill="url(#${id}-m)"/>
    <rect x="4" y="4" width="120" height="38" rx="1.5" fill="url(#${id}-v)"/>
    ${losangos}
    <rect x="4" y="4" width="120" height="38" fill="url(#${id}-l)"/>
    <path d="M64 12 V34 M57 19 H71" stroke="${c.metal[1]}" stroke-width="2.6" stroke-linecap="round"/>
    <path d="M64 12 V34 M57 19 H71" stroke="#fff" stroke-opacity=".3" stroke-width=".8" stroke-linecap="round"/>
  </svg>`;
}

function bauEm3d(tipo, largura) {
  const e = largura / 160;
  const parte = (classe, caixa, altura) => svgDoBau(tipo, largura)
    .replace('<svg class="bau-svg', `<svg class="bau-svg ${classe}`)
    .replace('viewBox="0 0 160 150"', `viewBox="${caixa}"`)
    .replace(/height="\d+"/, `height="${Math.round(altura)}"`);
  const moedas = Array.from({ length: 12 }, (_, i) => {
    const lado = i % 2 ? 1 : -1;
    const x = lado * (18 + (i * 13) % 70);
    const y = -(70 + (i * 17) % 60);
    return `<i style="--x:${x}px;--y:${y}px;--t:${(0.9 + (i % 4) * 0.12).toFixed(2)}s;--d:${(0.05 * i).toFixed(2)}s"></i>`;
  }).join('');
  return `<div class="bau-3d bau-${tipo}" style="--l:${largura}px;--e:${e}">
    <div class="bau-3d-corpo">${parte('bau-so-corpo', '0 64 160 86', 86 * e)}</div>
    <div class="bau-3d-tampa">
      <div class="bau-3d-fora">${parte('bau-so-tampa', '0 14 160 62', 62 * e)}</div>
      <div class="bau-3d-dentro">${forroDaTampa(tipo, Math.round(largura * 0.8))}</div>
    </div>
    <div class="bau-3d-boca"><span></span></div>
    <div class="bau-3d-luz"></div>
    <div class="bau-moedas">${moedas}</div>
  </div>`;
}

const POSICOES_DOS_BAUS_DA_TRILHA = [2, 6];
let bausDaTrilha = {};
let bausDaTrilhaDoPerfil = null;

function htmlDoNoDeBau(trilha, indice, estado) {
  if (!POSICOES_DOS_BAUS_DA_TRILHA.includes(indice) || !trilha || !Array.isArray(trilha.licoes) || trilha.licoes.length <= indice + 1) return '';
  const licao = trilha.licoes[indice];
  const feitas = estado && estado.licoes ? estado.licoes : {};
  const pronto = trilha.licoes.slice(0, indice + 1).every((l) => !!feitas[l.slug]);
  const info = bausDaTrilha[licao.slug];
  const situacao = info && info.aberto ? 'aberto' : (pronto ? 'pronto' : 'bloqueado');
  const tipo = (info && info.tipo) || (indice === 2 ? 'madeira' : 'prata');
  const selo = situacao === 'aberto' ? iconeDoBau('check') : (situacao === 'bloqueado' ? iconeDoBau('cadeado') : '');
  return `
        <div class="no-wrapper desloc-0 no-wrapper-bau">
          <button type="button" class="no-bau ${situacao}" data-bau-licao="${escaparDoBau(licao.slug)}" data-bau-tipo="${tipo}" aria-label="${escaparDoBau(nomeDoBau(tipo))}">
            <span class="no-bau-figura">${svgDoBau(tipo, 78)}</span>
            ${selo ? `<span class="no-bau-selo">${selo}</span>` : ''}
          </button>
        </div>`;
}

function marcarNosDeBau() {
  document.querySelectorAll('.no-bau[data-bau-licao]').forEach((botao) => {
    const info = bausDaTrilha[botao.dataset.bauLicao];
    if (!info || !info.aberto || botao.classList.contains('aberto')) return;
    botao.classList.remove('pronto', 'bloqueado');
    botao.classList.add('aberto');
    const antigo = botao.querySelector('.no-bau-selo');
    if (antigo) antigo.remove();
    botao.insertAdjacentHTML('beforeend', `<span class="no-bau-selo">${iconeDoBau('check')}</span>`);
  });
}

async function carregarBausDaTrilha() {
  const perfil = perfilDosBaus();
  if (!perfil) {
    bausDaTrilha = {};
    bausDaTrilhaDoPerfil = null;
    return;
  }
  if (bausDaTrilhaDoPerfil === perfil.id) {
    marcarNosDeBau();
    return;
  }
  try {
    const lista = await chamarDosBaus('trilha_baus');
    bausDaTrilha = {};
    (Array.isArray(lista) ? lista : []).forEach((b) => { bausDaTrilha[b.licao] = b; });
    bausDaTrilhaDoPerfil = perfil.id;
    marcarNosDeBau();
  } catch (e) {
    return;
  }
}

async function tocarNoBauDaTrilha(botao) {
  if (!botao || botao.classList.contains('aberto') || botao.disabled) return;
  if (botao.classList.contains('bloqueado')) {
    botao.classList.remove('balanca');
    void botao.offsetWidth;
    botao.classList.add('balanca');
    return;
  }
  if (!perfilDosBaus()) {
    if (typeof irParaLogin === 'function') irParaLogin();
    return;
  }
  botao.disabled = true;
  const licao = botao.dataset.bauLicao;
  try {
    const dados = await chamarDosBaus('trilha_bau_pegar', { _licao: licao });
    if (dados && dados.bau_id) {
      bausDaTrilha[licao] = { licao, bau_id: dados.bau_id, tipo: dados.tipo, aberto: true };
      if (!dados.aberto) abrirBau(Number(dados.bau_id), dados.tipo);
      else marcarNosDeBau();
    }
  } catch (e) {
    if (typeof mostrarAvisoTrilhas === 'function') mostrarAvisoTrilhas(trDoBau('Não deu para abrir agora. Tente de novo.'));
  } finally {
    botao.disabled = false;
  }
}

function nomeDoBau(tipo) {
  return trDoBau({ ametista: 'Baú de ametista', safira: 'Baú de safira', ouro: 'Baú de ouro', prata: 'Baú de prata', madeira: 'Baú de madeira' }[tipo] || 'Baú');
}

async function chamarDosBaus(funcao, parametros) {
  const perfil = perfilDosBaus();
  if (!perfil) return null;
  const { data, error } = await supabaseCliente.rpc(funcao, Object.assign({ _pid: perfil.id }, parametros || {}));
  if (error) throw error;
  return data;
}

function desenharCaixaDeDesafios() {
  const lugar = document.getElementById('desafios-cartao');
  const dados = caixasDoDia.desafios;
  if (!lugar) return;
  if (!dados || !Array.isArray(dados.itens)) { lugar.hidden = true; return; }
  const feitos = dados.itens.filter((i) => i.feito).length;
  const bauFechado = dados.bau_id && caixasDoDia.mochila && (caixasDoDia.mochila.baus || []).some((b) => b.id === dados.bau_id);
  lugar.hidden = false;
  lugar.innerHTML = `
    <div class="desafios-topo">
      <strong>${trDoBau('Desafios do dia')}</strong>
      <span class="desafios-conta">${feitos}/${dados.itens.length}</span>
    </div>
    <ul class="desafios-lista">
      ${dados.itens.map((item) => {
        const info = TIPOS_DE_DESAFIO[item.tipo] || DESAFIOS_DO_DIA[item.id] || { icone: 'estrela', ir: 'trilhas' };
        const parte = Math.min(100, Math.round((Number(item.progresso) / Math.max(1, Number(item.meta))) * 100));
        return `<li><button type="button" class="desafio${item.feito ? ' feito' : ''}" data-ir="${info.ir}">
          <span class="desafio-icone">${iconeDoBau(item.feito ? 'check' : info.icone)}</span>
          <span class="desafio-textos"><strong>${escaparDoBau(textoDoDesafio(item))}</strong><span class="desafio-barra"><i style="width:${parte}%"></i></span></span>
          <span class="desafio-numero">${Math.min(item.progresso, item.meta)}/${item.meta}</span>
          <span class="desafio-fe">${iconeDoBau('estrela')}+${Number(item.fe) || 10}</span>
        </button></li>`;
      }).join('')}
    </ul>
    <div class="desafios-premio${dados.completo ? ' pronto' : ''}">
      <span class="desafios-premio-bau">${svgDoBau(dados.bau_tipo || 'madeira', 52)}</span>
      ${dados.completo && bauFechado
        ? `<button type="button" class="desafios-abrir" data-abrir-bau="${dados.bau_id}" data-tipo="${dados.bau_tipo}">${trDoBau('Abrir baú')}</button>`
        : (dados.completo ? `<span class="desafios-premio-texto">${trDoBau('Baú aberto')}</span>` : `<span class="desafios-premio-conta">${feitos}/${dados.itens.length}</span>`)}
    </div>`;
  lugar.querySelectorAll('[data-ir]').forEach((botao) => botao.addEventListener('click', () => irParaDesafio(botao.dataset.ir)));
  lugar.querySelectorAll('[data-abrir-bau]').forEach((botao) => botao.addEventListener('click', () => abrirBau(Number(botao.dataset.abrirBau), botao.dataset.tipo)));
}

const TIPOS_DE_DESAFIO = {
  missoes: { icone: 'trilha', ir: 'trilhas' },
  fe: { icone: 'estrela', ir: 'trilhas' },
  perfeitas: { icone: 'medalha', ir: 'trilhas' },
  terco: { icone: 'terco', ir: 'terco' },
  quiz: { icone: 'lampada', ir: 'quiz' },
  oracao: { icone: 'cruz', ir: 'oracoes' },
  jogo: { icone: 'estrela', ir: 'jogos' },
};

function textoDoDesafio(item) {
  const n = Number(item.meta) || 1;
  const textos = {
    missoes: n === 1 ? ['Faça 1 missão'] : ['Faça {n} missões', { n }],
    fe: ['Ganhe {n} de Fé', { n }],
    perfeitas: n === 1 ? ['Faça uma missão sem errar'] : ['Faça {n} missões sem errar', { n }],
    terco: n === 1 ? ['Reze o terço'] : ['Reze o terço {n} vezes', { n }],
    quiz: n === 1 ? ['Jogue o Quiz dos Santos'] : ['Jogue o Quiz dos Santos {n} vezes', { n }],
    oracao: n === 1 ? ['Reze uma oração'] : ['Reze {n} orações', { n }],
    jogo: n === 1 ? ['Jogue um joguinho'] : ['Jogue {n} joguinhos', { n }],
  };
  const t = textos[item.tipo];
  if (t) return trDoBau(t[0], t[1]);
  const antigo = DESAFIOS_DO_DIA[item.id];
  return antigo ? trDoBau(antigo.texto) : String(item.id || '');
}

function irParaDesafio(destino) {
  if (destino === 'terco') { if (typeof mudarDeView === 'function') mudarDeView('view-terco'); return; }
  if (destino === 'quiz') { if (typeof abrirQuizDaLumina === 'function') abrirQuizDaLumina(); return; }
  if (destino === 'oracoes') { if (typeof mudarDeView === 'function') mudarDeView('view-oracoes'); return; }
  if (destino === 'jogos') { if (typeof abrirJogos === 'function') abrirJogos(); return; }
  const continuar = document.querySelector('#trilhas-continuar button, #trilhas-continuar [role="button"]');
  if (continuar) continuar.click();
}

function minutosQueFaltam(ate) {
  const falta = new Date(ate).getTime() - Date.now();
  return falta > 0 ? Math.ceil(falta / 60000) : 0;
}

function desenharMochila() {
  const lugar = document.getElementById('mochila-cartao');
  const dados = caixasDoDia.mochila;
  if (!lugar) return;
  if (!dados) { lugar.hidden = true; return; }
  const baus = Array.isArray(dados.baus) ? dados.baus : [];
  const frascos = dados.frascos || {};
  const efeitos = dados.efeitos || {};
  const dobro = efeitos.fe_dobro ? minutosQueFaltam(efeitos.fe_dobro) : 0;
  lugar.hidden = false;
  lugar.innerHTML = `
    ${dobro ? `<p class="mochila-efeito">${svgDoFrasco('fe_dobro', 20)}<span>${trDoBau('Fé em dobro: {n} min', { n: dobro })}</span></p>` : ''}
    <div class="mochila-linha">
      <div class="mochila-baus">
        ${baus.length ? baus.slice(0, 4).map((b) => `<button type="button" class="mochila-bau" data-abrir-bau="${b.id}" data-tipo="${b.tipo}" aria-label="${escaparDoBau(nomeDoBau(b.tipo))}">${svgDoBau(b.tipo, 46)}</button>`).join('')
          : `<span class="mochila-vazio">${svgDoBau('madeira', 40)}</span>`}
        ${baus.length > 4 ? `<span class="mochila-mais">+${baus.length - 4}</span>` : ''}
      </div>
      <div class="mochila-frascos">
        ${Object.keys(FRASCOS_DE_AZEITE).map((tipo) => {
          const qtd = Number(frascos[tipo] || 0);
          return `<button type="button" class="mochila-frasco${qtd ? '' : ' vazio'}" data-frasco="${tipo}" aria-label="${escaparDoBau(trDoBau(FRASCOS_DE_AZEITE[tipo].nome))}">${svgDoFrasco(tipo, 34)}<b>${qtd}</b></button>`;
        }).join('')}
      </div>
    </div>`;
  lugar.querySelectorAll('[data-abrir-bau]').forEach((botao) => botao.addEventListener('click', () => abrirBau(Number(botao.dataset.abrirBau), botao.dataset.tipo)));
  lugar.querySelectorAll('[data-frasco]').forEach((botao) => botao.addEventListener('click', () => mostrarFrasco(botao.dataset.frasco)));
  if (typeof abrirColecaoDeItens === 'function' && !lugar.querySelector('.mochila-itens')) {
    lugar.insertAdjacentHTML('beforeend', `<button type="button" class="mochila-itens">${escaparDoBau(trDoBau('Itens raros'))}</button>`);
    lugar.querySelector('.mochila-itens').addEventListener('click', () => abrirColecaoDeItens('todos'));
  }
  clearTimeout(reloginhoDoFrasco);
  if (dobro) reloginhoDoFrasco = setTimeout(desenharMochila, 30000);
}

function escaparDoBau(texto) {
  return String(texto || '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

async function atualizarCaixasDoDia() {
  if (!perfilDosBaus()) {
    caixasDoDia = { desafios: null, mochila: null };
    desenharCaixaDeDesafios();
    desenharMochila();
    return;
  }
  try {
    const [desafios, mochila] = await Promise.all([chamarDosBaus('desafios_hoje'), chamarDosBaus('baus_meus')]);
    caixasDoDia = { desafios, mochila };
    somarFeDosDesafios(desafios);
    if (desafios && desafios.bau_novo) {
      const atualizada = await chamarDosBaus('baus_meus');
      if (atualizada) caixasDoDia.mochila = atualizada;
      avisarDesafiosCompletos(desafios);
    }
  } catch (e) {
    caixasDoDia = { desafios: null, mochila: null };
  }
  desenharCaixaDeDesafios();
  desenharMochila();
}

function somarFeDosDesafios(dados, semAviso) {
  const fe = dados ? Number(dados.fe_ganha) || 0 : 0;
  if (fe <= 0) return;
  const membro = typeof obterMembroAtivo === 'function' ? obterMembroAtivo() : null;
  if (membro && typeof membro.fe === 'number') membro.fe += fe;
  if (typeof estadoEmMemoriaDaConta !== 'undefined' && estadoEmMemoriaDaConta && typeof estadoEmMemoriaDaConta.fe === 'number') estadoEmMemoriaDaConta.fe += fe;
  if (!semAviso && !dados.bau_novo && typeof mostrarAvisoTrilhas === 'function') mostrarAvisoTrilhas(trDoBau('Desafio do dia completo: +{n} de Fé', { n: fe }));
  if (typeof desenharColunaDireita === 'function') desenharColunaDireita();
}

function avisarDesafiosCompletos(dados) {
  const chave = `${dados.dia}:${dados.bau_id}`;
  if (desafiosJaAvisados.has(chave)) return;
  desafiosJaAvisados.add(chave);
  if (typeof mostrarAvisoTrilhas === 'function') mostrarAvisoTrilhas(trDoBau('Desafios do dia completos! Você ganhou um {bau}.', { bau: nomeDoBau(dados.bau_tipo).toLowerCase() }));
}

async function registrarDesafio(tipo) {
  if (!perfilDosBaus()) return;
  try {
    const desafios = await chamarDosBaus('desafio_registrar', { _tipo: tipo });
    if (!desafios) return;
    caixasDoDia.desafios = desafios;
    somarFeDosDesafios(desafios);
    if (desafios.bau_novo) {
      caixasDoDia.mochila = await chamarDosBaus('baus_meus');
      avisarDesafiosCompletos(desafios);
    }
    desenharCaixaDeDesafios();
    desenharMochila();
  } catch (e) {
    return;
  }
}

function janelaDoBau(conteudo, classe) {
  fecharJanelaDoBau();
  const fundo = document.createElement('div');
  fundo.className = `bau-janela ${classe || ''}`;
  fundo.id = 'bau-janela';
  fundo.setAttribute('role', 'dialog');
  fundo.setAttribute('aria-modal', 'true');
  fundo.innerHTML = `<div class="bau-janela-caixa">${conteudo}</div>`;
  document.body.appendChild(fundo);
  requestAnimationFrame(() => fundo.classList.add('aberta'));
  fundo.addEventListener('click', (evento) => { if (evento.target === fundo && fundo.dataset.travada !== 'sim') fecharJanelaDoBau(); });
  return fundo;
}

let redesenharDepoisDoBau = false;

function fecharJanelaDoBau() {
  const atual = document.getElementById('bau-janela');
  if (atual) atual.remove();
  if (!redesenharDepoisDoBau) return;
  redesenharDepoisDoBau = false;
  atualizarCaixasDoDia();
  const trilhas = document.getElementById('view-trilhas');
  if (typeof renderizarTrilhas === 'function' && trilhas && trilhas.classList.contains('active')) renderizarTrilhas();
}

function tocarSomDoBau(tipo) {
  if (typeof somDaLiga !== 'function') return;
  try {
    if (tipo === 'abrir') somDaLiga('encaixe', 0, undefined, 0.6, 1.4);
    else somDaLiga('encaixe', 0, undefined, 0.35, 0.8);
  } catch (e) {
    return;
  }
}

async function abrirBau(id, tipo, opcoes) {
  if (!id) return;
  const extra = opcoes || {};
  const fundo = janelaDoBau(`
    ${extra.rotulo ? `<span class="bau-rotulo">${escaparDoBau(extra.rotulo)}</span>` : ''}
    <strong class="bau-titulo">${escaparDoBau(extra.titulo || nomeDoBau(tipo))}</strong>
    <div class="bau-palco bau-${escaparDoBau(tipo)}">
      <span class="bau-raios" aria-hidden="true"></span>
      <span class="bau-faiscas" aria-hidden="true">${Array.from({ length: 16 }, (_, i) => `<i style="--a:${Math.round(i * 22.5 + (i % 2) * 9)}deg;--d:${90 + (i % 4) * 22}px;--t:${(0.7 + (i % 3) * 0.18).toFixed(2)}s"></i>`).join('')}</span>
      <div class="bau-desenho">${bauEm3d(tipo, 200)}</div>
      <div class="bau-premios" id="bau-premios"></div>
    </div>
    <button type="button" class="bau-botao" id="bau-botao" disabled>${trDoBau('Abrindo...')}</button>`, 'abrindo tela-cheia');
  fundo.dataset.travada = 'sim';
  const inicio = Date.now();
  let resultado = null;
  try {
    resultado = await chamarDosBaus('bau_abrir', { _id: id });
  } catch (e) {
    resultado = null;
  }
  const espera = Math.max(0, 1500 - (Date.now() - inicio));
  setTimeout(() => {
    if (!document.body.contains(fundo)) return;
    const botao = fundo.querySelector('#bau-botao');
    fundo.dataset.travada = 'nao';
    if (!resultado) {
      fundo.classList.remove('abrindo');
      if (botao) { botao.disabled = false; botao.textContent = trDoBau('Fechar'); botao.addEventListener('click', fecharJanelaDoBau); }
      const premios = fundo.querySelector('#bau-premios');
      if (premios) premios.innerHTML = `<p class="bau-erro">${trDoBau('Não deu para abrir agora. Tente de novo.')}</p>`;
      return;
    }
    tocarSomDoBau('abrir');
    fundo.classList.remove('abrindo');
    fundo.classList.add('aberto');
    const premios = fundo.querySelector('#bau-premios');
    const itens = [`<span class="bau-premio bau-premio-fe" style="--i:0">${typeof estrelaDaFe === 'function' ? estrelaDaFe('fe-grande') : iconeDoBau('estrela')}<b>+${Number(resultado.fe) || 0}</b><small>${trDoBau('de Fé')}</small></span>`]
      .concat((resultado.frascos || []).map((t, i) => `<span class="bau-premio" style="--i:${i + 1}">${svgDoFrasco(t, 46)}<small>${escaparDoBau(trDoBau((FRASCOS_DE_AZEITE[t] || {}).nome || t))}</small></span>`));
    const itemDoBau = typeof htmlDoItemDoBau === 'function' ? htmlDoItemDoBau(resultado.item, itens.length) : '';
    if (premios) {
      premios.innerHTML = itens.join('') + itemDoBau;
      if (typeof ligarItemDoBau === 'function') ligarItemDoBau(premios, resultado.item);
    }
    if (botao) { botao.disabled = false; botao.textContent = trDoBau('Continuar'); botao.addEventListener('click', fecharJanelaDoBau); botao.focus({ preventScroll: true }); }
    const membro = typeof obterMembroAtivo === 'function' ? obterMembroAtivo() : null;
    if (membro && typeof membro.fe === 'number') membro.fe += Number(resultado.fe) || 0;
    if (typeof estadoEmMemoriaDaConta !== 'undefined' && estadoEmMemoriaDaConta && typeof estadoEmMemoriaDaConta.fe === 'number') estadoEmMemoriaDaConta.fe += Number(resultado.fe) || 0;
    redesenharDepoisDoBau = true;
  }, espera);
}

function mostrarFrasco(tipo) {
  const f = FRASCOS_DE_AZEITE[tipo];
  if (!f) return;
  const qtd = Number(((caixasDoDia.mochila || {}).frascos || {})[tipo] || 0);
  const passivo = tipo === 'protecao';
  const fundo = janelaDoBau(`
    <div class="frasco-detalhe">${svgDoFrasco(tipo, 96)}<b class="frasco-qtd${qtd ? '' : ' zero'}">×${qtd}</b></div>
    <strong class="bau-titulo">${escaparDoBau(trDoBau(f.nome))}</strong>
    ${f.tempo ? `<span class="frasco-tempo"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="13" r="8" fill="none" stroke="currentColor" stroke-width="2"/><path d="M12 9v4l3 2M9 2h6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>${escaparDoBau(trDoBau(f.tempo))}</span>` : ''}
    <p class="frasco-aviso" id="frasco-aviso" aria-live="polite"></p>
    <div class="bau-botoes">
      ${!passivo && qtd > 0 ? `<button type="button" class="bau-botao" id="frasco-usar">${trDoBau('Usar agora')}</button>` : ''}
      <button type="button" class="bau-botao bau-botao-claro" id="frasco-fechar">${trDoBau('Fechar')}</button>
    </div>`, 'janela-frasco');
  fundo.querySelector('#frasco-fechar').addEventListener('click', fecharJanelaDoBau);
  const usar = fundo.querySelector('#frasco-usar');
  if (usar) usar.addEventListener('click', async () => {
    usar.disabled = true;
    const aviso = fundo.querySelector('#frasco-aviso');
    try {
      const mochila = await chamarDosBaus('frasco_usar', { _tipo: tipo });
      if (mochila) caixasDoDia.mochila = mochila;
      fundo.querySelector('.frasco-detalhe').classList.add('usado');
      tocarSomDoBau('abrir');
      if (tipo === 'santidade') {
        const membro = typeof obterMembroAtivo === 'function' ? obterMembroAtivo() : null;
        if (membro) membro.santidade = 15;
        if (typeof estadoEmMemoriaDaConta !== 'undefined' && estadoEmMemoriaDaConta) estadoEmMemoriaDaConta.santidade = 15;
        if (typeof renderizarTrilhas === 'function') renderizarTrilhas();
      }
      desenharMochila();
      setTimeout(fecharJanelaDoBau, 900);
    } catch (erro) {
      const texto = String((erro && erro.message) || '');
      if (aviso) aviso.textContent = texto.includes('santidade_cheia') ? trDoBau('Sua Santidade já está cheia.') : trDoBau('Não deu para usar agora. Tente de novo.');
      usar.disabled = false;
    }
  });
}

function iniciarBaus() {
  document.addEventListener('keydown', (evento) => {
    const janela = document.getElementById('bau-janela');
    if (evento.key === 'Escape' && janela && janela.dataset.travada !== 'sim') fecharJanelaDoBau();
  });
}

document.addEventListener('DOMContentLoaded', () => {
  if (typeof rodarComSeguranca === 'function') rodarComSeguranca('baus', iniciarBaus);
  else iniciarBaus();
});
