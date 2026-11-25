const CHAVE_DA_MUSICA_DOS_JOGOS = 'lumina-sancti-musica-dos-jogos';

const FAIXAS_ORIGINAIS_DOS_JOGOS = [
  { id: 'claustro', ganho: 1.4, nome: 'Harpa do claustro', estilo: 'Calma', bpm: 72, semente: 11 },
  { id: 'orgao', ganho: 0.7, nome: 'Órgão da catedral', estilo: 'Solene', bpm: 56, semente: 23 },
  { id: 'estrelas', ganho: 2.2, nome: 'Noite estrelada', estilo: 'Suave', bpm: 64, semente: 37 },
  { id: 'eletronica', ganho: 1.7, nome: 'Luz eletrônica', estilo: 'Eletrônica', bpm: 120, semente: 41 },
  { id: 'lofi', ganho: 1.9, nome: 'Lo-fi do mosteiro', estilo: 'Lo-fi', bpm: 78, semente: 53 },
  { id: 'festa', ganho: 1.15, nome: 'Festa no pátio', estilo: 'Animada', bpm: 104, semente: 67 },
];
const FAIXAS_CLASSICAS_DA_MUSICA = typeof FAIXAS_CLASSICAS_DOS_JOGOS !== 'undefined' ? FAIXAS_CLASSICAS_DOS_JOGOS : [];
const FAIXAS_DOS_JOGOS = FAIXAS_CLASSICAS_DA_MUSICA.concat(FAIXAS_ORIGINAIS_DOS_JOGOS);
const JOGOS_COM_MUSICA_PROPRIA = ['xadrez', 'damas'];

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

const musicaDosJogos = { ctx: null, mestre: null, eco: null, ruido: null, tocando: false, faixa: null, passo: 0, proximo: 0, relogio: null, melodia: [], ativa: false, jogo: null, partitura: null, unidade: 0, inicio: 0, indice: 0, volta: 0, ondaDoPiano: null };

function preferenciasDaMusicaDosJogos() {
  const padrao = { ligada: true, efeitos: true, faixa: 'preludio', volume: 0.8, faixas: { xadrez: '', damas: '' } };
  let salvas = {};
  try { salvas = JSON.parse(localStorage.getItem(CHAVE_DA_MUSICA_DOS_JOGOS) || '{}') || {}; } catch (e) {
    salvas = {};
  }
  const pref = Object.assign(padrao, salvas);
  pref.faixas = Object.assign({ xadrez: '', damas: '' }, salvas.faixas || {});
  if (!FAIXAS_DOS_JOGOS.some((f) => f.id === pref.faixa)) pref.faixa = 'preludio';
  return pref;
}

function salvarPreferenciasDaMusicaDosJogos(mudancas) {
  const nova = Object.assign(preferenciasDaMusicaDosJogos(), mudancas || {});
  try { localStorage.setItem(CHAVE_DA_MUSICA_DOS_JOGOS, JSON.stringify(nova)); } catch (e) {
  }
  return nova;
}

function somDosJogosLigado() { return preferenciasDaMusicaDosJogos().efeitos !== false; }

function volumeDaMusicaDosJogos(pref) { return Math.max(0, Math.min(1, Number((pref || preferenciasDaMusicaDosJogos()).volume))) * 0.95; }

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
  const limite = ctx.createDynamicsCompressor();
  limite.threshold.value = -3; limite.knee.value = 0; limite.ratio.value = 20; limite.attack.value = 0.001; limite.release.value = 0.08;
  limite.connect(ctx.destination);
  const reforco = ctx.createGain();
  reforco.gain.value = 1.8;
  reforco.connect(limite);
  const compressor = ctx.createDynamicsCompressor();
  compressor.threshold.value = -16; compressor.knee.value = 10; compressor.ratio.value = 5; compressor.attack.value = 0.004; compressor.release.value = 0.25;
  compressor.connect(reforco);
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

function ondaDoPianoDosJogos() {
  const m = musicaDosJogos;
  if (m.ondaDoPiano) return m.ondaDoPiano;
  const harmonicos = [0, 1, 0.55, 0.3, 0.2, 0.12, 0.08, 0.05, 0.03, 0.02];
  m.ondaDoPiano = m.ctx.createPeriodicWave(new Float32Array(harmonicos.length), new Float32Array(harmonicos));
  return m.ondaDoPiano;
}

function instrumentoPiano(quando, f, duracao, vol, eco) {
  const ctx = musicaDosJogos.ctx;
  const agudo = Math.max(0, Math.min(1, (f - 80) / 900));
  const natural = 3.2 - agudo * 2.2;
  const solta = quando + Math.max(0.08, Math.min(duracao, natural * 2));
  const g = ctx.createGain();
  g.gain.setValueAtTime(0.0001, quando);
  g.gain.linearRampToValueAtTime(vol, quando + 0.005);
  g.gain.setTargetAtTime(vol * 0.45, quando + 0.005, 0.09);
  if (solta > quando + 0.2) g.gain.setTargetAtTime(0.0001, quando + 0.2, natural * 0.45);
  g.gain.setTargetAtTime(0.0001, solta, 0.1);
  const filtro = ctx.createBiquadFilter(); filtro.type = 'lowpass'; filtro.Q.value = 0.3;
  filtro.frequency.setValueAtTime(Math.min(14000, f * 10 + 1500), quando);
  filtro.frequency.setTargetAtTime(Math.max(500, f * 2.5), quando + 0.01, 0.35);
  const onda = ondaDoPianoDosJogos();
  const fim = solta + 0.7;
  [[0, 1], [4, 0.35]].forEach(([desafino, amp]) => {
    const o = ctx.createOscillator(); o.setPeriodicWave(onda); o.frequency.value = f; o.detune.value = desafino;
    const a = ctx.createGain(); a.gain.value = amp;
    o.connect(a); a.connect(filtro); o.start(quando); o.stop(fim);
  });
  filtro.connect(g); saidaDaMusica(g, eco);
  if (vol > 0.08) instrumentoRuido(quando, vol * 0.04, 0.02, 'bandpass', Math.min(9000, f * 4), 0);
}

function instrumentoOboe(quando, f, duracao, vol, eco) {
  const ctx = musicaDosJogos.ctx;
  const o = ctx.createOscillator(); o.type = 'sawtooth'; o.frequency.value = f;
  const vib = ctx.createOscillator(); vib.frequency.value = 5;
  const vibG = ctx.createGain(); vibG.gain.setValueAtTime(0, quando); vibG.gain.linearRampToValueAtTime(f * 0.005, quando + 0.4);
  vib.connect(vibG); vibG.connect(o.frequency);
  const banda = ctx.createBiquadFilter(); banda.type = 'bandpass'; banda.frequency.value = 1300; banda.Q.value = 0.9;
  const corte = ctx.createBiquadFilter(); corte.type = 'lowpass'; corte.frequency.value = 3200;
  const g = ctx.createGain();
  const forte = vol * 2.2;
  g.gain.setValueAtTime(0.0001, quando);
  g.gain.linearRampToValueAtTime(forte, quando + 0.07);
  g.gain.setValueAtTime(forte * 0.9, quando + Math.max(0.08, duracao - 0.1));
  g.gain.linearRampToValueAtTime(0.0001, quando + duracao + 0.12);
  o.connect(banda); banda.connect(corte); corte.connect(g); saidaDaMusica(g, eco);
  [o, vib].forEach((x) => { x.start(quando); x.stop(quando + duracao + 0.15); });
}

function instrumentoCravo(quando, f, duracao, vol, eco) {
  const ctx = musicaDosJogos.ctx;
  const fim = quando + Math.min(1.6, Math.max(0.35, duracao + 0.25));
  const filtro = ctx.createBiquadFilter(); filtro.type = 'lowpass'; filtro.Q.value = 1.5;
  filtro.frequency.setValueAtTime(Math.min(12000, f * 12), quando);
  filtro.frequency.exponentialRampToValueAtTime(Math.max(600, f * 3), fim);
  const g = ctx.createGain(); envelopeDaMusica(g, quando, 0.002, vol, fim - quando);
  [['sawtooth', 1, 0.7], ['square', 2, 0.25]].forEach(([tipo, mult, amp]) => {
    const o = ctx.createOscillator(); o.type = tipo; o.frequency.value = f * mult;
    const a = ctx.createGain(); a.gain.value = amp;
    o.connect(a); a.connect(filtro); o.start(quando); o.stop(fim + 0.05);
  });
  filtro.connect(g); saidaDaMusica(g, eco);
}

function midiDaNotaDaPartitura(nome) {
  const m = /^([A-G])(#|b)?(-?\d)$/.exec(nome);
  if (!m) return null;
  return 12 * (Number(m[3]) + 1) + { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 }[m[1]] + (m[2] === '#' ? 1 : m[2] === 'b' ? -1 : 0);
}

function lerVozDaPartitura(voz) {
  const eventos = [];
  let t = 0; let dur = 1;
  String(voz.texto || '').trim().split(/\s+/).forEach((parte) => {
    if (!parte) return;
    const [nome, d] = parte.split(':');
    if (d !== undefined) dur = Number(d);
    if (nome !== 'r') {
      const notas = nome.split('+').map(midiDaNotaDaPartitura).filter((x) => x !== null).map((x) => x + (voz.transpor || 0));
      if (notas.length) eventos.push({ t, dur, notas, voz });
    }
    t += dur;
  });
  return { eventos, total: t };
}

function prepararPartituraDaFaixa(faixa) {
  if (faixa.partitura) return faixa.partitura;
  let total = 0;
  const eventos = [];
  faixa.vozes.forEach((voz) => {
    const lida = lerVozDaPartitura(voz);
    total = Math.max(total, lida.total);
    lida.eventos.forEach((e) => eventos.push(e));
  });
  eventos.sort((a, b) => a.t - b.t);
  faixa.partitura = { eventos, total };
  return faixa.partitura;
}

function tocarEventoDaPartitura(ev, quando, unidade, divisao) {
  const voz = ev.voz;
  const dur = Math.max(ev.dur, voz.pedal || 0) * unidade;
  const naBatida = Math.abs(ev.t * 1000 % (divisao * 1000)) < 1;
  const vol = (voz.vol || 0.2) * (0.9 + Math.random() * 0.16) * (naBatida ? 1.08 : 1);
  const eco = voz.eco || 0;
  const t = quando + (voz.instrumento === 'piano' || voz.instrumento === 'cravo' ? Math.random() * 0.008 : 0);
  const f = (m) => frequenciaDaNota(m);
  const cada = (fn) => ev.notas.forEach((m, i) => fn(m, i));
  switch (voz.instrumento) {
    case 'piano': cada((m, i) => instrumentoPiano(t + i * 0.006, f(m), dur, vol / Math.sqrt(ev.notas.length), eco)); break;
    case 'cordas': instrumentoTapete(t, ev.notas, dur + 0.2, vol, 1700, eco); break;
    case 'orgao': instrumentoOrgao(t, ev.notas, Math.max(0.4, dur), vol, eco); break;
    case 'flauta': cada((m) => instrumentoFlauta(t, f(m), Math.max(0.12, dur * 0.95), vol, eco)); break;
    case 'oboe': cada((m) => instrumentoOboe(t, f(m), Math.max(0.12, dur * 0.95), vol, eco)); break;
    case 'harpa': cada((m) => instrumentoDedilhado(t, f(m), Math.max(0.6, dur * 3), vol, eco)); break;
    case 'sino': cada((m) => instrumentoSino(t, f(m), vol, eco)); break;
    case 'baixo': cada((m) => instrumentoGrave(t, f(m), Math.max(0.2, dur), vol, 'triangle')); break;
    case 'cravo': cada((m) => instrumentoCravo(t, f(m), dur, vol, eco)); break;
    case 'pizz': cada((m) => instrumentoDedilhado(t, f(m), 0.32, vol, eco)); break;
    default: break;
  }
}

function agendarPartituraDosJogos() {
  const m = musicaDosJogos;
  const p = m.partitura;
  if (!p || !p.eventos.length) return;
  const limite = m.ctx.currentTime + 0.25;
  for (let guarda = 0; guarda < 500; guarda += 1) {
    const ev = p.eventos[m.indice];
    const quando = m.inicio + ev.t * m.unidade;
    if (quando > limite) break;
    if (quando >= m.ctx.currentTime - 0.08) {
      try { tocarEventoDaPartitura(ev, quando, m.unidade, m.faixa.divisao); } catch (e) {
      }
    }
    m.indice += 1;
    if (m.indice >= p.eventos.length) {
      m.indice = 0;
      m.inicio += p.total * m.unidade;
      m.volta += 1;
      if (m.faixa.acelerar) m.unidade = (60 / m.faixa.bpm / m.faixa.divisao) / (1 + (m.volta % 4) * 0.2);
    }
  }
}

function agendarMusicaDosJogos() {
  const m = musicaDosJogos;
  if (!m.tocando || !m.ctx || !m.faixa) return;
  if (m.partitura) { agendarPartituraDosJogos(); return; }
  const dur = 60 / m.faixa.bpm / 4;
  while (m.proximo < m.ctx.currentTime + 0.15) {
    try { tocarPassoDaMusica(m.faixa, m.passo, m.proximo, dur); } catch (e) {
    }
    m.proximo += dur;
    m.passo = (m.passo + 1) % (16 * 4 * 4);
  }
}

function faixaDoMomentoDosJogos(pref) {
  const p = pref || preferenciasDaMusicaDosJogos();
  const jogo = musicaDosJogos.jogo;
  const propria = jogo && p.faixas ? p.faixas[jogo] : '';
  const id = propria || p.faixa;
  return FAIXAS_DOS_JOGOS.find((f) => f.id === id) || FAIXAS_DOS_JOGOS[0];
}

function tocarMusicaDosJogos(idDaFaixa) {
  const pref = preferenciasDaMusicaDosJogos();
  if (!pref.ligada) { pararMusicaDosJogos(); return; }
  const ctx = contextoDaMusicaDosJogos();
  if (!ctx) return;
  const faixa = (idDaFaixa && FAIXAS_DOS_JOGOS.find((f) => f.id === idDaFaixa)) || faixaDoMomentoDosJogos(pref);
  const m = musicaDosJogos;
  if (ctx.state === 'suspended') ctx.resume().catch(() => {});
  const volume = volumeDaMusicaDosJogos(pref) * (faixa.ganho || 1);
  const agora = ctx.currentTime;
  if (m.tocando && m.faixa && m.faixa.id === faixa.id) {
    m.mestre.gain.cancelScheduledValues(agora);
    m.mestre.gain.setTargetAtTime(volume, agora, 0.2);
    return;
  }
  const trocando = m.tocando;
  if (m.relogio) clearInterval(m.relogio);
  m.faixa = faixa; m.passo = 0; m.indice = 0; m.volta = 0;
  m.partitura = faixa.vozes ? prepararPartituraDaFaixa(faixa) : null;
  m.unidade = faixa.vozes ? 60 / faixa.bpm / faixa.divisao : 0;
  m.melodia = faixa.vozes ? [] : prepararMelodiaDaFaixa(faixa);
  const comeco = agora + (trocando ? 0.45 : 0.12);
  m.proximo = comeco; m.inicio = comeco;
  m.tocando = true;
  m.mestre.gain.cancelScheduledValues(agora);
  m.mestre.gain.setValueAtTime(Math.max(0.0001, m.mestre.gain.value), agora);
  if (trocando) m.mestre.gain.linearRampToValueAtTime(0.0001, agora + 0.4);
  m.mestre.gain.linearRampToValueAtTime(volume, comeco + 1);
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

function definirJogoDaMusica(id) {
  const m = musicaDosJogos;
  m.jogo = id || null;
  if (!m.ativa || !m.tocando) return;
  const faixa = faixaDoMomentoDosJogos();
  if (!m.faixa || m.faixa.id !== faixa.id) tocarMusicaDosJogos(faixa.id);
}

function atualizarMusicaDosJogos(idDaView) {
  musicaDosJogos.ativa = idDaView === 'view-jogos';
  garantirBotaoDaMusicaDosJogos();
  garantirBotaoDaMusicaNaTela();
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

function alternarPainelDaMusicaDosJogos() {
  if (document.getElementById('musica-jogos-painel')) fecharPainelDaMusicaDosJogos(); else abrirPainelDaMusicaDosJogos();
}

function garantirBotaoDaMusicaDosJogos() {
  if (typeof document === 'undefined' || !document.body || !document.createElement) return;
  if (document.getElementById('musica-jogos-botao')) return;
  const botao = document.createElement('button');
  botao.type = 'button';
  botao.id = 'musica-jogos-botao';
  botao.className = 'musica-jogos-botao';
  botao.hidden = true;
  botao.setAttribute('aria-label', trDaMusica('Música dos jogos'));
  botao.addEventListener('click', alternarPainelDaMusicaDosJogos);
  const busca = document.getElementById('search-btn');
  if (busca && busca.parentNode) { botao.classList.add('icon-btn', 'no-topo'); busca.parentNode.insertBefore(botao, busca); } else document.body.appendChild(botao);
  atualizarBotaoDaMusicaDosJogos();
}

function garantirBotaoDaMusicaNaTela() {
  if (typeof document === 'undefined' || !document.getElementById || !document.createElement) return;
  const lugar = document.getElementById('jogos-container');
  if (!lugar) return;
  if (!lugar.dataset.musicaObservada && typeof MutationObserver !== 'undefined') {
    lugar.dataset.musicaObservada = '1';
    new MutationObserver(() => garantirBotaoDaMusicaNaTela()).observe(lugar, { childList: true, subtree: true });
  }
  const cabecalho = lugar.querySelector('.jogo-cabecalho');
  const alvo = cabecalho || lugar;
  let botao = document.getElementById('musica-jogos-botao-tela');
  if (botao && botao.parentNode === alvo) return;
  if (!botao) {
    botao = document.createElement('button');
    botao.type = 'button';
    botao.id = 'musica-jogos-botao-tela';
    botao.className = 'musica-jogos-tela';
    botao.setAttribute('aria-label', trDaMusica('Música dos jogos'));
    botao.addEventListener('click', alternarPainelDaMusicaDosJogos);
  }
  botao.classList.toggle('na-lista', !cabecalho);
  if (cabecalho) cabecalho.insertBefore(botao, cabecalho.querySelector('.jogo-placar'));
  else lugar.insertBefore(botao, lugar.firstChild);
  atualizarBotaoDaMusicaDosJogos();
}

function atualizarBotaoDaMusicaDosJogos() {
  if (typeof document === 'undefined' || !document.getElementById) return;
  const ligada = preferenciasDaMusicaDosJogos().ligada;
  ['musica-jogos-botao', 'musica-jogos-botao-tela'].forEach((id) => {
    const botao = document.getElementById(id);
    if (!botao) return;
    botao.innerHTML = iconeDaMusicaDosJogos(ligada);
    botao.classList.toggle('tocando', !!musicaDosJogos.tocando);
    botao.classList.toggle('desligada', !ligada);
  });
}

function trDaMusica(texto) { return typeof tr === 'function' ? tr(texto) : texto; }

let abaDaMusicaDosJogos = 'todos';

function htmlDoPainelDaMusicaDosJogos() {
  const pref = preferenciasDaMusicaDosJogos();
  const aba = abaDaMusicaDosJogos;
  const escolhida = aba === 'todos' ? pref.faixa : (pref.faixas[aba] || '');
  const tocandoAgora = musicaDosJogos.tocando && musicaDosJogos.faixa ? musicaDosJogos.faixa.id : '';
  const botaoDaFaixa = (f) => `<button type="button" class="musica-jogos-faixa${f.id === escolhida ? ' ativa' : ''}${f.id === tocandoAgora ? ' tocando' : ''}" data-faixa="${f.id}"><b>${trDaMusica(f.nome)}</b><small>${trDaMusica(f.autor || f.estilo)}</small></button>`;
  const abas = [['todos', 'Todos'], ['xadrez', 'Xadrez'], ['damas', 'Damas']];
  return `
    <div class="musica-jogos-topo"><strong>${trDaMusica('Música dos jogos')}</strong><button type="button" class="musica-jogos-fechar" aria-label="${trDaMusica('Fechar')}">×</button></div>
    <label class="musica-jogos-chave"><span>${trDaMusica('Música')}</span><input type="checkbox" id="musica-jogos-ligada" ${pref.ligada ? 'checked' : ''}><i></i></label>
    <label class="musica-jogos-chave"><span>${trDaMusica('Efeitos sonoros')}</span><input type="checkbox" id="musica-jogos-efeitos" ${pref.efeitos ? 'checked' : ''}><i></i></label>
    <label class="musica-jogos-volume"><span>${trDaMusica('Volume')}</span><input type="range" id="musica-jogos-volume" min="0" max="1" step="0.05" value="${pref.volume}"></label>
    <div class="musica-jogos-abas" role="tablist">${abas.map(([id, nome]) => `<button type="button" role="tab" class="musica-jogos-aba${aba === id ? ' ativa' : ''}" aria-selected="${aba === id}" data-aba="${id}">${trDaMusica(nome)}</button>`).join('')}</div>
    <div class="musica-jogos-faixas${pref.ligada ? '' : ' apagadas'}">
      ${aba !== 'todos' ? `<button type="button" class="musica-jogos-faixa musica-jogos-mesma${escolhida ? '' : ' ativa'}" data-faixa=""><b>${trDaMusica('A mesma dos outros jogos')}</b></button>` : ''}
      <h4 class="musica-jogos-grupo">${trDaMusica('Clássicas')}</h4>
      ${FAIXAS_CLASSICAS_DA_MUSICA.map(botaoDaFaixa).join('')}
      <h4 class="musica-jogos-grupo">${trDaMusica('Do Lumina')}</h4>
      ${FAIXAS_ORIGINAIS_DOS_JOGOS.map(botaoDaFaixa).join('')}
    </div>`;
}

function abrirPainelDaMusicaDosJogos() {
  if (typeof document === 'undefined') return;
  fecharPainelDaMusicaDosJogos();
  abaDaMusicaDosJogos = JOGOS_COM_MUSICA_PROPRIA.includes(musicaDosJogos.jogo) ? musicaDosJogos.jogo : 'todos';
  const painel = document.createElement('div');
  painel.id = 'musica-jogos-painel';
  painel.className = 'musica-jogos-painel';
  painel.setAttribute('role', 'dialog');
  painel.innerHTML = htmlDoPainelDaMusicaDosJogos();
  document.body.appendChild(painel);
  const religar = () => {
    const rolagem = painel.scrollTop;
    painel.innerHTML = htmlDoPainelDaMusicaDosJogos();
    painel.scrollTop = rolagem;
    ligar();
  };
  const ligar = () => {
    painel.querySelector('.musica-jogos-fechar').addEventListener('click', fecharPainelDaMusicaDosJogos);
    painel.querySelector('#musica-jogos-ligada').addEventListener('change', (e) => {
      salvarPreferenciasDaMusicaDosJogos({ ligada: e.target.checked });
      if (e.target.checked) tocarMusicaDosJogos(); else pararMusicaDosJogos();
      atualizarBotaoDaMusicaDosJogos();
      religar();
    });
    painel.querySelector('#musica-jogos-efeitos').addEventListener('change', (e) => salvarPreferenciasDaMusicaDosJogos({ efeitos: e.target.checked }));
    painel.querySelectorAll('.musica-jogos-aba').forEach((b) => b.addEventListener('click', () => {
      abaDaMusicaDosJogos = b.dataset.aba;
      religar();
    }));
    painel.querySelectorAll('.musica-jogos-faixa').forEach((b) => b.addEventListener('click', () => {
      const id = b.dataset.faixa;
      const pref = preferenciasDaMusicaDosJogos();
      if (abaDaMusicaDosJogos === 'todos') salvarPreferenciasDaMusicaDosJogos({ faixa: id, ligada: true });
      else salvarPreferenciasDaMusicaDosJogos({ faixas: Object.assign({}, pref.faixas, { [abaDaMusicaDosJogos]: id }), ligada: true });
      tocarMusicaDosJogos(id || preferenciasDaMusicaDosJogos().faixa);
      atualizarBotaoDaMusicaDosJogos();
      religar();
    }));
    painel.querySelector('#musica-jogos-volume').addEventListener('input', (e) => {
      salvarPreferenciasDaMusicaDosJogos({ volume: Number(e.target.value) });
      if (musicaDosJogos.tocando && musicaDosJogos.faixa) tocarMusicaDosJogos(musicaDosJogos.faixa.id);
    });
  };
  ligar();
  setTimeout(() => document.addEventListener('pointerdown', fecharAoTocarFora, true), 0);
}

function fecharAoTocarFora(e) {
  const painel = document.getElementById('musica-jogos-painel');
  if (!painel) { document.removeEventListener('pointerdown', fecharAoTocarFora, true); return; }
  if (painel.contains(e.target)) return;
  if (['musica-jogos-botao', 'musica-jogos-botao-tela'].some((id) => { const b = document.getElementById(id); return b && b.contains(e.target); })) return;
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
