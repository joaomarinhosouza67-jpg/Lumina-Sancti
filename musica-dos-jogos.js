const CHAVE_DA_MUSICA_DOS_JOGOS = 'lumina-sancti-musica-dos-jogos';

const FAIXAS_DOS_JOGOS = [
  { id: 'claustro', nome: 'Harpa do claustro', estilo: 'Calma', bpm: 72, semente: 11 },
  { id: 'orgao', nome: 'Órgão da catedral', estilo: 'Solene', bpm: 56, semente: 23 },
  { id: 'estrelas', nome: 'Noite estrelada', estilo: 'Suave', bpm: 64, semente: 37 },
  { id: 'eletronica', nome: 'Luz eletrônica', estilo: 'Eletrônica', bpm: 120, semente: 41 },
  { id: 'lofi', nome: 'Lo-fi do mosteiro', estilo: 'Lo-fi', bpm: 78, semente: 53 },
  { id: 'festa', nome: 'Festa no pátio', estilo: 'Animada', bpm: 104, semente: 67 },
];

const ACORDES_DAS_FAIXAS = {
  claustro: [[62, 66, 69], [59, 62, 66], [55, 59, 62], [57, 61, 64]],
  orgao: [[57, 60, 64], [53, 57, 60], [55, 60, 64], [55, 59, 62]],
  estrelas: [[52, 56, 59, 63], [49, 52, 56, 59], [45, 49, 52, 56], [47, 51, 54, 59]],
  eletronica: [[53, 56, 60], [49, 53, 56], [56, 60, 63], [51, 55, 58]],
  lofi: [[48, 52, 55, 59], [45, 48, 52, 55], [50, 53, 57, 60], [43, 47, 50, 53]],
  festa: [[55, 59, 62], [52, 55, 60], [54, 57, 62], [52, 55, 59]],
};
const ESCALAS_DAS_FAIXAS = {
  claustro: [74, 76, 78, 81, 83, 86],
  orgao: [69, 71, 72, 74, 76, 77, 79],
  estrelas: [76, 78, 80, 83, 85, 88],
  eletronica: [72, 75, 77, 80, 82, 84],
  lofi: [72, 74, 76, 79, 81, 84],
  festa: [67, 69, 71, 72, 74, 76, 79],
};

const musicaDosJogos = { ctx: null, mestre: null, eco: null, ruido: null, tocando: false, faixa: null, passo: 0, proximo: 0, relogio: null, melodia: [], ativa: false };

function preferenciasDaMusicaDosJogos() {
  const padrao = { ligada: true, efeitos: true, faixa: 'claustro', volume: 0.5 };
  try { return Object.assign(padrao, JSON.parse(localStorage.getItem(CHAVE_DA_MUSICA_DOS_JOGOS) || '{}')); } catch (e) { return padrao; }
}

function salvarPreferenciasDaMusicaDosJogos(mudancas) {
  const nova = Object.assign(preferenciasDaMusicaDosJogos(), mudancas || {});
  try { localStorage.setItem(CHAVE_DA_MUSICA_DOS_JOGOS, JSON.stringify(nova)); } catch (e) {
  }
  return nova;
}

function somDosJogosLigado() { return preferenciasDaMusicaDosJogos().efeitos !== false; }

function sementeDaMusica(n) {
  let a = n >>> 0;
  return () => { a = (a + 0x6d2b79f5) >>> 0; let t = a; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
}

function frequenciaDaNota(m) { return 440 * Math.pow(2, (m - 69) / 12); }

function contextoDaMusicaDosJogos() {
  if (musicaDosJogos.ctx) return musicaDosJogos.ctx;
  const Classe = typeof window !== 'undefined' ? (window.AudioContext || window.webkitAudioContext) : null;
  if (!Classe) return null;
  let ctx = typeof contextoDeSomDosJogos !== 'undefined' && contextoDeSomDosJogos ? contextoDeSomDosJogos : null;
  if (!ctx) {
    try { ctx = new Classe(); } catch (e) { return null; }
    try { contextoDeSomDosJogos = ctx; } catch (e) {
    }
  }
  musicaDosJogos.ctx = ctx;
  const compressor = ctx.createDynamicsCompressor();
  compressor.threshold.value = -18; compressor.ratio.value = 3;
  compressor.connect(ctx.destination);
  const mestre = ctx.createGain();
  mestre.gain.value = 0;
  mestre.connect(compressor);
  const eco = ctx.createConvolver();
  const duracao = 2.6;
  const impulso = ctx.createBuffer(2, Math.floor(ctx.sampleRate * duracao), ctx.sampleRate);
  for (let canal = 0; canal < 2; canal += 1) {
    const dados = impulso.getChannelData(canal);
    for (let i = 0; i < dados.length; i += 1) dados[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / dados.length, 3.2);
  }
  eco.buffer = impulso;
  const retornoDoEco = ctx.createGain();
  retornoDoEco.gain.value = 0.55;
  eco.connect(retornoDoEco); retornoDoEco.connect(mestre);
  const ruido = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate);
  const r = ruido.getChannelData(0);
  for (let i = 0; i < r.length; i += 1) r[i] = Math.random() * 2 - 1;
  musicaDosJogos.mestre = mestre; musicaDosJogos.eco = eco; musicaDosJogos.ruido = ruido;
  return ctx;
}

function saidaDaMusica(no, eco) {
  no.connect(musicaDosJogos.mestre);
  if (eco) { const envio = musicaDosJogos.ctx.createGain(); envio.gain.value = eco; no.connect(envio); envio.connect(musicaDosJogos.eco); }
}

function envelopeDaMusica(ganho, quando, ataque, pico, duracao) {
  ganho.gain.setValueAtTime(0.0001, quando);
  ganho.gain.exponentialRampToValueAtTime(Math.max(0.0002, pico), quando + ataque);
  ganho.gain.exponentialRampToValueAtTime(0.0001, quando + Math.max(ataque + 0.02, duracao));
}

function instrumentoDedilhado(quando, f, duracao, vol, eco) {
  const ctx = musicaDosJogos.ctx;
  const g = ctx.createGain(); envelopeDaMusica(g, quando, 0.006, vol, duracao);
  const filtro = ctx.createBiquadFilter(); filtro.type = 'lowpass';
  filtro.frequency.setValueAtTime(Math.min(9000, f * 8), quando); filtro.frequency.exponentialRampToValueAtTime(Math.max(300, f * 1.5), quando + duracao);
  [['triangle', 1, 1], ['sine', 2, 0.35]].forEach(([tipo, mult, amp]) => {
    const o = ctx.createOscillator(); o.type = tipo; o.frequency.value = f * mult;
    const a = ctx.createGain(); a.gain.value = amp;
    o.connect(a); a.connect(filtro); o.start(quando); o.stop(quando + duracao + 0.05);
  });
  filtro.connect(g); saidaDaMusica(g, eco);
}

function instrumentoTapete(quando, notas, duracao, vol, brilho, eco) {
  const ctx = musicaDosJogos.ctx;
  const g = ctx.createGain();
  g.gain.setValueAtTime(0.0001, quando);
  g.gain.linearRampToValueAtTime(vol, quando + Math.min(0.9, duracao * 0.3));
  g.gain.setValueAtTime(vol, quando + duracao * 0.7);
  g.gain.linearRampToValueAtTime(0.0001, quando + duracao);
  const filtro = ctx.createBiquadFilter(); filtro.type = 'lowpass'; filtro.frequency.value = brilho || 900; filtro.Q.value = 0.6;
  notas.forEach((m) => {
    [-7, 7].forEach((desafino) => {
      const o = ctx.createOscillator(); o.type = 'sawtooth'; o.frequency.value = frequenciaDaNota(m); o.detune.value = desafino;
      const a = ctx.createGain(); a.gain.value = 0.5 / notas.length;
      o.connect(a); a.connect(filtro); o.start(quando); o.stop(quando + duracao + 0.05);
    });
  });
  filtro.connect(g); saidaDaMusica(g, eco);
}

function instrumentoOrgao(quando, notas, duracao, vol, eco) {
  const ctx = musicaDosJogos.ctx;
  const g = ctx.createGain();
  g.gain.setValueAtTime(0.0001, quando);
  g.gain.linearRampToValueAtTime(vol, quando + 0.12);
  g.gain.setValueAtTime(vol, quando + duracao - 0.25);
  g.gain.linearRampToValueAtTime(0.0001, quando + duracao);
  const tremolo = ctx.createOscillator(); tremolo.frequency.value = 5.2;
  const prof = ctx.createGain(); prof.gain.value = vol * 0.08;
  tremolo.connect(prof); prof.connect(g.gain); tremolo.start(quando); tremolo.stop(quando + duracao + 0.05);
  notas.forEach((m) => {
    [[1, 1], [2, 0.5], [3, 0.28], [4, 0.16], [6, 0.08]].forEach(([mult, amp]) => {
      const o = ctx.createOscillator(); o.type = 'sine'; o.frequency.value = frequenciaDaNota(m) * mult;
      const a = ctx.createGain(); a.gain.value = amp / notas.length;
      o.connect(a); a.connect(g); o.start(quando); o.stop(quando + duracao + 0.05);
    });
  });
  saidaDaMusica(g, eco);
}

function instrumentoSino(quando, f, vol, eco) {
  const ctx = musicaDosJogos.ctx;
  [[1, 1, 2.2], [2.76, 0.4, 1.1], [5.4, 0.22, 0.6], [8.93, 0.1, 0.35]].forEach(([mult, amp, dur]) => {
    const o = ctx.createOscillator(); o.type = 'sine'; o.frequency.value = f * mult;
    const g = ctx.createGain(); envelopeDaMusica(g, quando, 0.004, vol * amp, dur);
    o.connect(g); saidaDaMusica(g, eco); o.start(quando); o.stop(quando + dur + 0.05);
  });
}

function instrumentoGrave(quando, f, duracao, vol, tipo) {
  const ctx = musicaDosJogos.ctx;
  const o = ctx.createOscillator(); o.type = tipo || 'sine'; o.frequency.value = f;
  const filtro = ctx.createBiquadFilter(); filtro.type = 'lowpass'; filtro.frequency.value = tipo === 'sawtooth' ? 520 : 1200;
  const g = ctx.createGain(); envelopeDaMusica(g, quando, 0.01, vol, duracao);
  o.connect(filtro); filtro.connect(g); saidaDaMusica(g, 0); o.start(quando); o.stop(quando + duracao + 0.05);
}

function instrumentoBumbo(quando, vol, grave) {
  const ctx = musicaDosJogos.ctx;
  const o = ctx.createOscillator(); o.type = 'sine';
  o.frequency.setValueAtTime(grave ? 120 : 150, quando); o.frequency.exponentialRampToValueAtTime(grave ? 60 : 45, quando + 0.14);
  const g = ctx.createGain(); envelopeDaMusica(g, quando, 0.003, vol, grave ? 0.38 : 0.3);
  o.connect(g); saidaDaMusica(g, 0); o.start(quando); o.stop(quando + 0.45);
}

function instrumentoRuido(quando, vol, duracao, tipo, freq, eco) {
  const ctx = musicaDosJogos.ctx;
  const fonte = ctx.createBufferSource(); fonte.buffer = musicaDosJogos.ruido;
  const filtro = ctx.createBiquadFilter(); filtro.type = tipo; filtro.frequency.value = freq; filtro.Q.value = 0.8;
  const g = ctx.createGain(); envelopeDaMusica(g, quando, 0.002, vol, duracao);
  fonte.connect(filtro); filtro.connect(g); saidaDaMusica(g, eco || 0);
  fonte.start(quando, Math.random() * 0.5, duracao + 0.05);
}

function instrumentoFlauta(quando, f, duracao, vol, eco) {
  const ctx = musicaDosJogos.ctx;
  const o = ctx.createOscillator(); o.type = 'sine'; o.frequency.value = f;
  const vib = ctx.createOscillator(); vib.frequency.value = 5.4;
  const vibG = ctx.createGain(); vibG.gain.value = f * 0.006;
  vib.connect(vibG); vibG.connect(o.frequency);
  const h = ctx.createOscillator(); h.type = 'sine'; h.frequency.value = f * 2;
  const hg = ctx.createGain(); hg.gain.value = 0.18;
  const g = ctx.createGain();
  g.gain.setValueAtTime(0.0001, quando);
  g.gain.linearRampToValueAtTime(vol, quando + 0.06);
  g.gain.setValueAtTime(vol * 0.85, quando + duracao * 0.7);
  g.gain.linearRampToValueAtTime(0.0001, quando + duracao);
  o.connect(g); h.connect(hg); hg.connect(g); saidaDaMusica(g, eco);
  [o, vib, h].forEach((x) => { x.start(quando); x.stop(quando + duracao + 0.05); });
}

function instrumentoPianoEletrico(quando, notas, duracao, vol, eco) {
  const ctx = musicaDosJogos.ctx;
  notas.forEach((m, i) => {
    const f = frequenciaDaNota(m);
    const g = ctx.createGain(); envelopeDaMusica(g, quando + i * 0.012, 0.008, vol / notas.length * 1.6, duracao);
    const o = ctx.createOscillator(); o.type = 'sine'; o.frequency.value = f;
    const o2 = ctx.createOscillator(); o2.type = 'sine'; o2.frequency.value = f * 4.01;
    const g2 = ctx.createGain(); envelopeDaMusica(g2, quando + i * 0.012, 0.003, 0.25, 0.25);
    o.connect(g); o2.connect(g2); g2.connect(g); saidaDaMusica(g, eco);
    [o, o2].forEach((x) => { x.start(quando + i * 0.012); x.stop(quando + duracao + 0.1); });
  });
}

function instrumentoArpejo(quando, f, duracao, vol, eco) {
  const ctx = musicaDosJogos.ctx;
  const o = ctx.createOscillator(); o.type = 'square'; o.frequency.value = f;
  const filtro = ctx.createBiquadFilter(); filtro.type = 'lowpass';
  filtro.frequency.setValueAtTime(2600, quando); filtro.frequency.exponentialRampToValueAtTime(500, quando + duracao);
  const g = ctx.createGain(); envelopeDaMusica(g, quando, 0.004, vol, duracao);
  o.connect(filtro); filtro.connect(g); saidaDaMusica(g, eco); o.start(quando); o.stop(quando + duracao + 0.05);
}

function prepararMelodiaDaFaixa(faixa) {
  const rnd = sementeDaMusica(faixa.semente);
  const escala = ESCALAS_DAS_FAIXAS[faixa.id];
  const notas = [];
  let pos = Math.floor(escala.length / 2);
  for (let i = 0; i < 128; i += 1) {
    const salto = rnd() < 0.7 ? (rnd() < 0.5 ? -1 : 1) : (rnd() < 0.5 ? -2 : 2);
    pos = Math.max(0, Math.min(escala.length - 1, pos + salto));
    notas.push({ nota: escala[pos], toca: rnd() });
  }
  return notas;
}

function tocarPassoDaMusica(faixa, passo, quando, dur) {
  const acordes = ACORDES_DAS_FAIXAS[faixa.id];
  const compasso = Math.floor(passo / 16);
  const p = passo % 16;
  const acorde = acordes[compasso % acordes.length];
  const raiz = acorde[0];
  const mel = musicaDosJogos.melodia[passo % musicaDosJogos.melodia.length];
  const variacao = Math.floor(compasso / acordes.length) % 2;
  if (faixa.id === 'claustro') {
    if (p === 0) { instrumentoTapete(quando, acorde, dur * 16, 0.05, 700, 0.5); instrumentoGrave(quando, frequenciaDaNota(raiz - 12), dur * 7, 0.18); }
    if (p === 8) instrumentoGrave(quando, frequenciaDaNota(raiz - 12), dur * 7, 0.14);
    if (p % 2 === 0) {
      const ordem = [0, 1, 2, 1, 0, 1, 2, 1];
      const k = ordem[(p / 2) % 8];
      const oitava = p >= 8 ? 12 : 0;
      instrumentoDedilhado(quando, frequenciaDaNota(acorde[k] + oitava), dur * 6, 0.16, 0.35);
    }
    if ((p === 6 || p === 14) && mel.toca < (variacao ? 0.75 : 0.45)) instrumentoSino(quando, frequenciaDaNota(mel.nota), 0.06, 0.6);
  } else if (faixa.id === 'orgao') {
    if (p === 0) { instrumentoOrgao(quando, acorde, dur * 16, 0.13, 0.7); instrumentoOrgao(quando, [raiz - 24], dur * 16, 0.09, 0.5); }
    if ((p === 0 || p === 8) && mel.toca < 0.85) instrumentoOrgao(quando, [mel.nota - 12], dur * 8, 0.05, 0.8);
  } else if (faixa.id === 'estrelas') {
    if (p === 0) { instrumentoTapete(quando, acorde, dur * 16, 0.07, 600 + 300 * variacao, 0.8); instrumentoGrave(quando, frequenciaDaNota(raiz - 12), dur * 16, 0.1); }
    if ([0, 6, 10, 13].includes(p) && mel.toca < 0.55) instrumentoSino(quando, frequenciaDaNota(mel.nota), 0.07, 0.8);
  } else if (faixa.id === 'eletronica') {
    if (p % 4 === 0) instrumentoBumbo(quando, 0.42);
    if (p === 4 || p === 12) instrumentoRuido(quando, 0.12, 0.16, 'bandpass', 1600, 0.2);
    if (p % 2 === 1) instrumentoRuido(quando, p % 4 === 2 ? 0.05 : 0.025, 0.04, 'highpass', 7500);
    if (p % 4 === 2) instrumentoGrave(quando, frequenciaDaNota(raiz - 24), dur * 1.8, 0.2, 'sawtooth');
    instrumentoArpejo(quando, frequenciaDaNota(acorde[p % acorde.length] + 12 + (p >= 8 && variacao ? 12 : 0)), dur * 0.9, 0.035, 0.25);
    if (p === 0) instrumentoTapete(quando, acorde, dur * 16, 0.04, 1400, 0.3);
  } else if (faixa.id === 'lofi') {
    const balanco = p % 2 === 1 ? dur * 0.18 : 0;
    const t = quando + balanco;
    if (p === 0 || p === 7 || p === 10) instrumentoBumbo(t, 0.3, true);
    if (p === 4 || p === 12) instrumentoRuido(t, 0.08, 0.18, 'bandpass', 1900, 0.15);
    if (p % 2 === 0) instrumentoRuido(t, 0.022, 0.05, 'highpass', 6500);
    if (p === 0 || p === 10) instrumentoPianoEletrico(t, acorde, dur * (p === 0 ? 9 : 6), 0.12, 0.35);
    if (p === 0 || p === 8 || p === 11) instrumentoGrave(t, frequenciaDaNota(raiz - 12), dur * 2.5, 0.2);
    if ((p === 3 || p === 14) && mel.toca < 0.5) instrumentoPianoEletrico(t, [mel.nota], dur * 3, 0.05, 0.5);
  } else if (faixa.id === 'festa') {
    if ([0, 3, 6, 8, 11, 14].includes(p)) instrumentoBumbo(quando, p === 0 || p === 8 ? 0.3 : 0.16, true);
    if ([0, 6, 8, 12].includes(p)) acorde.forEach((m, i) => instrumentoDedilhado(quando + i * 0.015, frequenciaDaNota(m), dur * 4, 0.09, 0.2));
    if (p % 2 === 0 && mel.toca < 0.82) instrumentoFlauta(quando, frequenciaDaNota(mel.nota), dur * (mel.toca < 0.3 ? 3.6 : 1.8), 0.08, 0.35);
    if (p === 0 || p === 8) instrumentoGrave(quando, frequenciaDaNota(raiz - 12), dur * 6, 0.16);
  }
}

function agendarMusicaDosJogos() {
  const m = musicaDosJogos;
  if (!m.tocando || !m.ctx || !m.faixa) return;
  const dur = 60 / m.faixa.bpm / 4;
  while (m.proximo < m.ctx.currentTime + 0.15) {
    try { tocarPassoDaMusica(m.faixa, m.passo, m.proximo, dur); } catch (e) {
    }
    m.proximo += dur;
    m.passo = (m.passo + 1) % (16 * 4 * 4);
  }
}

function tocarMusicaDosJogos(idDaFaixa) {
  const pref = preferenciasDaMusicaDosJogos();
  if (!pref.ligada) { pararMusicaDosJogos(); return; }
  const ctx = contextoDaMusicaDosJogos();
  if (!ctx) return;
  const faixa = FAIXAS_DOS_JOGOS.find((f) => f.id === (idDaFaixa || pref.faixa)) || FAIXAS_DOS_JOGOS[0];
  const m = musicaDosJogos;
  if (ctx.state === 'suspended') ctx.resume().catch(() => {});
  const volume = Math.max(0, Math.min(1, Number(pref.volume))) * 0.42;
  if (m.tocando && m.faixa && m.faixa.id === faixa.id) {
    m.mestre.gain.cancelScheduledValues(ctx.currentTime);
    m.mestre.gain.setTargetAtTime(volume, ctx.currentTime, 0.2);
    return;
  }
  if (m.relogio) clearInterval(m.relogio);
  m.faixa = faixa; m.passo = 0; m.melodia = prepararMelodiaDaFaixa(faixa);
  m.proximo = ctx.currentTime + 0.12;
  m.tocando = true;
  m.mestre.gain.cancelScheduledValues(ctx.currentTime);
  m.mestre.gain.setValueAtTime(m.mestre.gain.value, ctx.currentTime);
  m.mestre.gain.linearRampToValueAtTime(volume, ctx.currentTime + 1.2);
  m.relogio = setInterval(agendarMusicaDosJogos, 30);
  agendarMusicaDosJogos();
  atualizarBotaoDaMusicaDosJogos();
}

function pararMusicaDosJogos() {
  const m = musicaDosJogos;
  if (!m.tocando) return;
  m.tocando = false;
  if (m.relogio) { clearInterval(m.relogio); m.relogio = null; }
  if (m.ctx && m.mestre) {
    const agora = m.ctx.currentTime;
    m.mestre.gain.cancelScheduledValues(agora);
    m.mestre.gain.setValueAtTime(m.mestre.gain.value, agora);
    m.mestre.gain.linearRampToValueAtTime(0, agora + 0.4);
  }
  atualizarBotaoDaMusicaDosJogos();
}

function atualizarMusicaDosJogos(idDaView) {
  musicaDosJogos.ativa = idDaView === 'view-jogos';
  garantirBotaoDaMusicaDosJogos();
  const botao = typeof document !== 'undefined' ? document.getElementById('musica-jogos-botao') : null;
  if (botao) botao.hidden = !musicaDosJogos.ativa;
  if (!musicaDosJogos.ativa) { fecharPainelDaMusicaDosJogos(); pararMusicaDosJogos(); return; }
  if (preferenciasDaMusicaDosJogos().ligada) tocarMusicaDosJogos();
}

function iconeDaMusicaDosJogos(ligada) {
  return ligada
    ? '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>'
    : '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/><path d="M3 3l18 18"/></svg>';
}

function garantirBotaoDaMusicaDosJogos() {
  if (typeof document === 'undefined' || !document.body || !document.createElement) return;
  if (document.getElementById('musica-jogos-botao')) return;
  const botao = document.createElement('button');
  botao.type = 'button';
  botao.id = 'musica-jogos-botao';
  botao.className = 'musica-jogos-botao';
  botao.hidden = true;
  botao.setAttribute('aria-label', typeof tr === 'function' ? tr('Música dos jogos') : 'Música dos jogos');
  botao.addEventListener('click', () => { if (document.getElementById('musica-jogos-painel')) fecharPainelDaMusicaDosJogos(); else abrirPainelDaMusicaDosJogos(); });
  const busca = document.getElementById('search-btn');
  if (busca && busca.parentNode) { botao.classList.add('icon-btn', 'no-topo'); busca.parentNode.insertBefore(botao, busca); } else document.body.appendChild(botao);
  atualizarBotaoDaMusicaDosJogos();
}

function atualizarBotaoDaMusicaDosJogos() {
  if (typeof document === 'undefined' || !document.getElementById) return;
  const botao = document.getElementById('musica-jogos-botao');
  if (!botao) return;
  const ligada = preferenciasDaMusicaDosJogos().ligada;
  botao.innerHTML = iconeDaMusicaDosJogos(ligada);
  botao.classList.toggle('tocando', !!musicaDosJogos.tocando);
  botao.classList.toggle('desligada', !ligada);
}

function trDaMusica(texto) { return typeof tr === 'function' ? tr(texto) : texto; }

function htmlDoPainelDaMusicaDosJogos() {
  const pref = preferenciasDaMusicaDosJogos();
  return `
    <div class="musica-jogos-topo"><strong>${trDaMusica('Música dos jogos')}</strong><button type="button" class="musica-jogos-fechar" aria-label="${trDaMusica('Fechar')}">×</button></div>
    <label class="musica-jogos-chave"><span>${trDaMusica('Música')}</span><input type="checkbox" id="musica-jogos-ligada" ${pref.ligada ? 'checked' : ''}><i></i></label>
    <label class="musica-jogos-chave"><span>${trDaMusica('Efeitos sonoros')}</span><input type="checkbox" id="musica-jogos-efeitos" ${pref.efeitos ? 'checked' : ''}><i></i></label>
    <div class="musica-jogos-faixas${pref.ligada ? '' : ' apagadas'}">${FAIXAS_DOS_JOGOS.map((f) => `<button type="button" class="musica-jogos-faixa${f.id === pref.faixa ? ' ativa' : ''}" data-faixa="${f.id}"><b>${trDaMusica(f.nome)}</b><small>${trDaMusica(f.estilo)}</small></button>`).join('')}</div>
    <label class="musica-jogos-volume"><span>${trDaMusica('Volume')}</span><input type="range" id="musica-jogos-volume" min="0" max="1" step="0.05" value="${pref.volume}"></label>`;
}

function abrirPainelDaMusicaDosJogos() {
  if (typeof document === 'undefined') return;
  fecharPainelDaMusicaDosJogos();
  const painel = document.createElement('div');
  painel.id = 'musica-jogos-painel';
  painel.className = 'musica-jogos-painel';
  painel.setAttribute('role', 'dialog');
  painel.innerHTML = htmlDoPainelDaMusicaDosJogos();
  document.body.appendChild(painel);
  const religar = () => { painel.innerHTML = htmlDoPainelDaMusicaDosJogos(); ligar(); };
  const ligar = () => {
    painel.querySelector('.musica-jogos-fechar').addEventListener('click', fecharPainelDaMusicaDosJogos);
    painel.querySelector('#musica-jogos-ligada').addEventListener('change', (e) => {
      salvarPreferenciasDaMusicaDosJogos({ ligada: e.target.checked });
      if (e.target.checked) tocarMusicaDosJogos(); else pararMusicaDosJogos();
      atualizarBotaoDaMusicaDosJogos();
      religar();
    });
    painel.querySelector('#musica-jogos-efeitos').addEventListener('change', (e) => salvarPreferenciasDaMusicaDosJogos({ efeitos: e.target.checked }));
    painel.querySelectorAll('.musica-jogos-faixa').forEach((b) => b.addEventListener('click', () => {
      salvarPreferenciasDaMusicaDosJogos({ faixa: b.dataset.faixa, ligada: true });
      pararMusicaDosJogos();
      tocarMusicaDosJogos(b.dataset.faixa);
      religar();
    }));
    painel.querySelector('#musica-jogos-volume').addEventListener('input', (e) => {
      salvarPreferenciasDaMusicaDosJogos({ volume: Number(e.target.value) });
      if (musicaDosJogos.tocando) tocarMusicaDosJogos();
    });
  };
  ligar();
  setTimeout(() => document.addEventListener('pointerdown', fecharAoTocarFora, true), 0);
}

function fecharAoTocarFora(e) {
  const painel = document.getElementById('musica-jogos-painel');
  const botao = document.getElementById('musica-jogos-botao');
  if (!painel) { document.removeEventListener('pointerdown', fecharAoTocarFora, true); return; }
  if (painel.contains(e.target) || (botao && botao.contains(e.target))) return;
  fecharPainelDaMusicaDosJogos();
}

function fecharPainelDaMusicaDosJogos() {
  if (typeof document === 'undefined' || !document.getElementById) return;
  const painel = document.getElementById('musica-jogos-painel');
  if (painel) painel.remove();
  document.removeEventListener('pointerdown', fecharAoTocarFora, true);
}

if (typeof document !== 'undefined' && document.addEventListener) {
  document.addEventListener('visibilitychange', () => {
    const ctx = musicaDosJogos.ctx;
    if (!ctx) return;
    if (document.hidden) { if (ctx.state === 'running' && musicaDosJogos.tocando) ctx.suspend().catch(() => {}); }
    else if (musicaDosJogos.tocando) ctx.resume().catch(() => {});
  });
  document.addEventListener('pointerdown', () => {
    const ctx = musicaDosJogos.ctx;
    if (ctx && ctx.state === 'suspended' && musicaDosJogos.tocando && !document.hidden) ctx.resume().catch(() => {});
  }, true);
}
