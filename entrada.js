function somDaEntradaLumina(ctx, destino, t0, apartirDe) {
  const desde = apartirDe || 0;
  const em = (t) => Math.max(ctx.currentTime, t0 + t);
  const mestre = ctx.createGain();
  mestre.gain.value = 0.9;
  mestre.connect(destino);
  const seco = ctx.createGain();
  const eco = ctx.createDelay(1.0);
  eco.delayTime.value = 0.27;
  const volta = ctx.createGain();
  volta.gain.value = 0.36;
  const molhado = ctx.createGain();
  molhado.gain.value = 0.3;
  seco.connect(mestre);
  seco.connect(eco);
  eco.connect(volta);
  volta.connect(eco);
  eco.connect(molhado);
  molhado.connect(mestre);
  let bufferDeRuido = null;
  function ruido() {
    if (bufferDeRuido) return bufferDeRuido;
    bufferDeRuido = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate);
    const d = bufferDeRuido.getChannelData(0);
    for (let i = 0; i < d.length; i += 1) d[i] = Math.random() * 2 - 1;
    return bufferDeRuido;
  }
  function tom(freq, t, dur, vol, tipo, ataque) {
    if (t < desde) return;
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = tipo || 'sine';
    o.frequency.value = freq;
    const a = em(t);
    g.gain.setValueAtTime(0.0001, a);
    g.gain.exponentialRampToValueAtTime(vol, a + (ataque || 0.01));
    g.gain.exponentialRampToValueAtTime(0.0001, a + dur);
    o.connect(g);
    g.connect(seco);
    o.start(a);
    o.stop(a + dur + 0.05);
  }
  function acorde(freqs, t, dur, vol, ataque, soltura) {
    if (t + dur < desde) return;
    freqs.forEach((f, i) => {
      [0, 1].forEach((k) => {
        const o = ctx.createOscillator();
        const g = ctx.createGain();
        o.type = k ? 'triangle' : 'sine';
        o.frequency.value = f * (k ? 1.003 : 1);
        const a = em(Math.max(t, desde));
        const fim = t0 + t + dur;
        const pico = vol * (k ? 0.35 : 1) / Math.sqrt(freqs.length) * (1 - i * 0.06);
        g.gain.setValueAtTime(0.0001, a);
        g.gain.linearRampToValueAtTime(pico, Math.min(fim - 0.05, a + ataque));
        g.gain.setValueAtTime(pico, Math.max(a + ataque, fim - soltura));
        g.gain.linearRampToValueAtTime(0.0001, fim);
        o.connect(g);
        g.connect(seco);
        o.start(a);
        o.stop(fim + 0.05);
      });
    });
  }
  function vento(t, dur, de, ate, vol, corte) {
    if (t + dur < desde) return;
    const fonte = ctx.createBufferSource();
    fonte.buffer = ruido();
    fonte.loop = true;
    const filtro = ctx.createBiquadFilter();
    filtro.type = 'bandpass';
    filtro.Q.value = 1.4;
    const g = ctx.createGain();
    const a = em(Math.max(t, desde));
    const fim = t0 + t + dur;
    filtro.frequency.setValueAtTime(de, a);
    filtro.frequency.exponentialRampToValueAtTime(ate, fim);
    g.gain.setValueAtTime(0.0001, a);
    g.gain.exponentialRampToValueAtTime(vol, corte ? fim - 0.04 : a + dur * 0.6);
    g.gain.exponentialRampToValueAtTime(0.0001, corte ? fim : fim + 0.4);
    fonte.connect(filtro);
    filtro.connect(g);
    g.connect(corte ? mestre : seco);
    fonte.start(a);
    fonte.stop(fim + 0.5);
  }
  function grave(t, dur, de, ate, vol) {
    if (t < desde) return;
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    const a = em(t);
    o.frequency.setValueAtTime(de, a);
    o.frequency.exponentialRampToValueAtTime(ate, a + dur);
    g.gain.setValueAtTime(0.0001, a);
    g.gain.exponentialRampToValueAtTime(vol, a + dur * 0.7);
    g.gain.exponentialRampToValueAtTime(0.0001, a + dur);
    o.connect(g);
    g.connect(mestre);
    o.start(a);
    o.stop(a + dur + 0.05);
  }
  const altos = [1046.5, 1174.7, 1318.5, 1568.0, 1760.0, 2093.0, 2349.3, 2637.0];
  acorde([220, 329.6, 440, 554.4, 659.3], 0.1, 3.9, 0.05, 1.3, 1.2);
  [1046.5, 1318.5, 1568.0, 2093.0, 2637.0].forEach((f, i) => tom(f, 0.8 + i * 0.075, 1.8, 0.055, 'sine', 0.02));
  tom(110, 1.75, 2.6, 0.06, 'sine', 0.7);
  tom(164.8, 1.75, 2.6, 0.035, 'sine', 0.7);
  for (let t = 2.1, i = 0; t < 3.75; t += 0.2 + ((i * 37) % 11) / 60, i += 1) tom(altos[(i * 5) % altos.length] * 1.5, t, 0.6, 0.016, 'sine', 0.01);
  vento(3.75, 0.9, 220, 4200, 0.2, true);
  grave(3.8, 0.85, 90, 34, 0.12);
  acorde([392.0, 523.25, 659.25, 783.99], 4.85, 2.7, 0.034, 1.3, 1.1);
  acorde([440.0, 554.37, 659.25, 880.0], 7.1, 2.6, 0.032, 1.2, 1.1);
  acorde([261.6, 329.6, 392.0, 523.3, 587.3, 784.0], 9.35, 2.2, 0.075, 1.05, 1.0);
  [1046.5, 1568.0, 2093.0, 3136.0].forEach((f, i) => tom(f, 10.45 + i * 0.03, 2.6, 0.05 - i * 0.008, 'sine', 0.015));
  return mestre;
}

(function iniciarEntrada() {
  const tela = document.getElementById('intro-screen');
  if (!tela) return;
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    tela.style.display = 'none';
    return;
  }
  document.body.classList.add('intro-ativa');

  const T = { voa: 3.9, preto: 4.65, escreve: 4.9, escrito: 9.3, brilha: 9.4, branco: 10.5, fim: 11.4 };
  const RITMO = navigator.webdriver ? 3 : 1;
  const inicio = performance.now();
  let salto = 0;
  let ultimo = 0;
  let encerrada = false;
  let revelada = false;
  let quadroId = null;
  let carregou = document.readyState !== 'loading';
  document.addEventListener('DOMContentLoaded', () => { carregou = true; });

  function tempo(agora) {
    let t = ((agora - inicio) / 1000) * RITMO + salto;
    const limite = T.brilha - 0.02;
    if (!carregou && t > limite) { salto -= t - limite; t = limite; }
    return t;
  }

  let somCtx = null;
  let somMestre = null;
  function somLigado() {
    try { return localStorage.getItem('lumina-sancti-sem-som-abertura') !== '1'; } catch (e) { return true; }
  }
  function agendarSons() {
    if (!somCtx || somCtx.state !== 'running' || revelada) return;
    if (somMestre) { try { somMestre.gain.setTargetAtTime(0, somCtx.currentTime, 0.04); } catch (e) { somMestre = null; } }
    const agora = tempo(performance.now());
    try { somMestre = somDaEntradaLumina(somCtx, somCtx.destination, somCtx.currentTime - agora, agora); } catch (e) { somMestre = null; }
  }
  function acordarSom() {
    if (!somCtx || revelada) return;
    if (somCtx.state === 'running') return;
    somCtx.resume().then(agendarSons).catch(() => {});
  }
  if (somLigado() && !navigator.webdriver) {
    try {
      const Classe = window.AudioContext || window.webkitAudioContext;
      if (Classe) {
        somCtx = new Classe();
        if (somCtx.state === 'running') agendarSons();
        else somCtx.resume().then(agendarSons).catch(() => {});
        ['pointerdown', 'keydown', 'touchstart'].forEach((ev) => document.addEventListener(ev, acordarSom, { once: true, capture: true }));
      }
    } catch (e) {
      somCtx = null;
    }
  }

  function revelar() {
    if (revelada) return;
    revelada = true;
    document.body.classList.remove('intro-ativa');
    tela.classList.add('intro-revelando');
    document.removeEventListener('keydown', teclaDaEntrada, true);
  }

  function encerrar() {
    if (encerrada) return;
    encerrada = true;
    revelar();
    tela.style.display = 'none';
    if (quadroId) cancelAnimationFrame(quadroId);
    quadroId = null;
    if (somCtx) setTimeout(() => { try { somCtx.close(); } catch (e) { somCtx = null; } }, 3500);
  }

  const faiscas = [];
  const lampejos = [];
  function pular() {
    if (revelada) return;
    const t = tempo(performance.now());
    const alvo = T.brilha - 0.02;
    if (t < alvo) {
      salto += alvo - t;
      faiscas.length = 0;
      lampejos.length = 0;
      setTimeout(agendarSons, 30);
    }
  }
  function teclaDaEntrada(e) {
    if (e.key === 'Enter' || e.key === ' ' || e.keyCode === 13) { e.preventDefault(); pular(); }
  }
  tela.addEventListener('click', pular);
  document.addEventListener('keydown', teclaDaEntrada, true);
  setTimeout(encerrar, 30000);

  const tela2d = document.getElementById('intro-canvas');
  const telaFaiscas = document.getElementById('intro-faiscas');
  const p = tela2d && tela2d.getContext ? tela2d.getContext('2d') : null;
  const c2 = telaFaiscas && telaFaiscas.getContext ? telaFaiscas.getContext('2d') : null;
  if (!p || !c2) { setTimeout(encerrar, 1500); return; }

  const feixes = tela.querySelector('.intro-feixes-caixa');
  const preto = tela.querySelector('.intro-preto');
  const branco = tela.querySelector('.intro-branco');
  const nomeEl = tela.querySelector('.intro-nome');
  const nomeSvg = tela.querySelector('.intro-nome-svg');
  const medida = tela.querySelector('.intro-nome-medida');
  const grupoDeLetras = tela.querySelector('.intro-letras');
  const reflexoNome = tela.querySelector('.intro-nome-reflexo');
  const luzDoNome = tela.querySelector('.intro-nome-luz');
  const reflexo = document.getElementById('intro-reflexo');
  const borrao = document.getElementById('intro-borrao');
  const dica = tela.querySelector('.intro-dica');

  const CORES = [[196, 214, 255], [255, 255, 255], [255, 245, 226], [255, 226, 178], [255, 200, 140]];
  const mundo = { w: 1, h: 1, dpr: 1, ceu: null, estrelas: [], poeira: [], meteoros: [], brilhos: [], convergem: [] };

  function rgba(c, a) {
    return `rgba(${c[0]}, ${c[1]}, ${c[2]}, ${a})`;
  }

  function fazerBrilho(cor) {
    const lado = 32;
    const c = document.createElement('canvas');
    c.width = lado;
    c.height = lado;
    const q = c.getContext('2d');
    const g = q.createRadialGradient(lado / 2, lado / 2, 0, lado / 2, lado / 2, lado / 2);
    g.addColorStop(0, 'rgba(255, 255, 255, 1)');
    g.addColorStop(0.12, rgba(cor, 1));
    g.addColorStop(0.32, rgba(cor, 0.35));
    g.addColorStop(1, rgba(cor, 0));
    q.fillStyle = g;
    q.fillRect(0, 0, lado, lado);
    return c;
  }

  function normal() {
    let u = 0;
    let v = 0;
    while (!u) u = Math.random();
    while (!v) v = Math.random();
    return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
  }

  function pintarCeu(w, h, dpr) {
    const c = document.createElement('canvas');
    c.width = Math.max(1, Math.round(w * dpr));
    c.height = Math.max(1, Math.round(h * dpr));
    const q = c.getContext('2d');
    q.setTransform(dpr, 0, 0, dpr, 0, 0);
    const fundo = q.createLinearGradient(0, 0, 0, h);
    fundo.addColorStop(0, '#02030a');
    fundo.addColorStop(0.55, '#070b1f');
    fundo.addColorStop(1, '#0e0c1c');
    q.fillStyle = fundo;
    q.fillRect(0, 0, w, h);
    const horizonte = q.createRadialGradient(w * 0.5, h * 1.15, 0, w * 0.5, h * 1.15, Math.max(w, h) * 0.75);
    horizonte.addColorStop(0, 'rgba(212, 150, 70, 0.14)');
    horizonte.addColorStop(0.45, 'rgba(120, 70, 90, 0.05)');
    horizonte.addColorStop(1, 'rgba(0, 0, 0, 0)');
    q.fillStyle = horizonte;
    q.fillRect(0, 0, w, h);
    const ax = -0.15 * w;
    const ay = 1.05 * h;
    const bx = 1.15 * w;
    const by = -0.1 * h;
    const comp = Math.hypot(bx - ax, by - ay) || 1;
    const nx = -(by - ay) / comp;
    const ny = (bx - ax) / comp;
    const largura = Math.max(1, Math.min(w, h) * 0.19);
    q.globalCompositeOperation = 'lighter';
    for (let i = 0; i < 34; i++) {
      const t = Math.random();
      const d = normal() * largura * 0.6;
      const x = ax + (bx - ax) * t + nx * d;
      const y = ay + (by - ay) * t + ny * d;
      const r = largura * (0.6 + Math.random() * 1.1);
      const g = q.createRadialGradient(x, y, 0, x, y, r);
      const tom = Math.random();
      g.addColorStop(0, tom < 0.3 ? 'rgba(225, 182, 140, 0.055)' : tom < 0.42 ? 'rgba(200, 120, 165, 0.035)' : 'rgba(150, 162, 235, 0.055)');
      g.addColorStop(1, 'rgba(0, 0, 0, 0)');
      q.fillStyle = g;
      q.fillRect(x - r, y - r, r * 2, r * 2);
    }
    const pontos = Math.round(Math.min(5200, (w * h) / 260));
    for (let i = 0; i < pontos; i++) {
      const t = Math.random();
      const d = normal() * largura * 0.45;
      const x = ax + (bx - ax) * t + nx * d;
      const y = ay + (by - ay) * t + ny * d;
      const a = Math.random() * 0.36 * Math.exp(-Math.abs(d) / largura);
      q.fillStyle = `rgba(232, 230, 255, ${a.toFixed(3)})`;
      const lado = Math.random() < 0.9 ? 0.7 : 1.2;
      q.fillRect(x, y, lado, lado);
    }
    const soltas = Math.round(Math.min(1800, (w * h) / 800));
    for (let i = 0; i < soltas; i++) {
      q.fillStyle = `rgba(225, 230, 255, ${(Math.random() * 0.24).toFixed(3)})`;
      q.fillRect(Math.random() * w, Math.random() * h, 0.7, 0.7);
    }
    q.globalCompositeOperation = 'source-over';
    for (let i = 0; i < 11; i++) {
      const t = 0.12 + Math.random() * 0.76;
      const d = normal() * largura * 0.15;
      const x = ax + (bx - ax) * t + nx * d;
      const y = ay + (by - ay) * t + ny * d;
      const r = largura * (0.22 + Math.random() * 0.35);
      const g = q.createRadialGradient(x, y, 0, x, y, r);
      g.addColorStop(0, 'rgba(3, 4, 12, 0.38)');
      g.addColorStop(1, 'rgba(3, 4, 12, 0)');
      q.fillStyle = g;
      q.fillRect(x - r, y - r, r * 2, r * 2);
    }
    return c;
  }

  function sortearCor() {
    const r = Math.random();
    if (r < 0.16) return 0;
    if (r < 0.62) return 1;
    if (r < 0.84) return 2;
    if (r < 0.95) return 3;
    return 4;
  }

  function montar() {
    const w = Math.max(1, window.innerWidth || 0);
    const h = Math.max(1, window.innerHeight || 0);
    const dpr = Math.min(window.devicePixelRatio || 1, w < 700 ? 1.5 : 2);
    [tela2d, telaFaiscas].forEach((c) => { c.width = Math.round(w * dpr); c.height = Math.round(h * dpr); });
    mundo.w = w;
    mundo.h = h;
    mundo.dpr = dpr;
    mundo.ceu = pintarCeu(w, h, dpr);
    if (!mundo.brilhos.length) mundo.brilhos = CORES.map(fazerBrilho);

    const total = Math.round(Math.min(720, Math.max(280, (w * h) / 1700)));
    mundo.estrelas = Array.from({ length: total }, () => {
      const forca = Math.pow(Math.random(), 3);
      return {
        x: Math.random() * (w + 40) - 20,
        y: Math.random() * h,
        r: 0.45 + forca * 2.1,
        a: 0.22 + forca * 0.78,
        cor: sortearCor(),
        f: 0.5 + Math.random() * 1.9,
        fase: Math.random() * Math.PI * 2,
        amp: 0.06 + Math.random() * 0.3,
        entra: Math.random() * 0.8,
        z: 0.3 + Math.random() * 0.7,
      };
    });

    const m = Math.min(w, h);
    mundo.poeira = Array.from({ length: w < 700 ? 40 : 64 }, () => {
      const ang = Math.random() * Math.PI * 2;
      const dist = Math.sqrt(Math.random()) * m * 0.38;
      return {
        x: Math.cos(ang) * dist,
        y: Math.sin(ang) * dist,
        vx: (Math.random() - 0.5) * 6,
        vy: -4 - Math.random() * 10,
        r: 0.5 + Math.random() * 1.3,
        fase: Math.random() * Math.PI * 2,
      };
    });

    mundo.convergem = Array.from({ length: 6 }, (_, i) => {
      const ang = ((360 / 6) * i + (Math.random() * 25 - 12)) * Math.PI / 180;
      const dist = ((38 + Math.random() * 14) * m) / 100;
      return { dx: Math.cos(ang) * dist, dy: Math.sin(ang) * dist, atraso: Math.random() * 0.25 };
    });

    const escala = Math.max(0.55, m / 900);
    mundo.meteoros = [1.15, 2.05, 2.95].map((t0, i) => {
      const dir = i === 1 ? -1 : 1;
      const ang = 0.32 + Math.random() * 0.22;
      const vel = (950 + Math.random() * 450) * escala;
      return {
        t0,
        dur: 0.75 + Math.random() * 0.25,
        x: dir === 1 ? w * (0.05 + Math.random() * 0.35) : w * (0.6 + Math.random() * 0.35),
        y: h * (0.04 + Math.random() * 0.22),
        vx: dir * Math.cos(ang) * vel,
        vy: Math.sin(ang) * vel,
        cauda: (150 + Math.random() * 130) * escala,
      };
    });
  }

  function suave(a, b, x) {
    const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
    return t * t * (3 - 2 * t);
  }

  function entre(a, b, x) {
    return Math.min(1, Math.max(0, (x - a) / (b - a)));
  }

  function circuloDeLuz(x, y, raio, paradas) {
    if (raio <= 0) return;
    const g = p.createRadialGradient(x, y, 0, x, y, raio);
    paradas.forEach(([pos, cor]) => g.addColorStop(pos, cor));
    p.fillStyle = g;
    p.fillRect(x - raio, y - raio, raio * 2, raio * 2);
  }

  function espinho(cx, cy, angulo, comprimento, largura, forca) {
    if (comprimento <= 1 || forca <= 0) return;
    p.save();
    p.translate(cx, cy);
    p.rotate(angulo);
    const g = p.createLinearGradient(0, 0, comprimento, 0);
    g.addColorStop(0, `rgba(255, 251, 238, ${forca})`);
    g.addColorStop(0.18, `rgba(255, 228, 160, ${forca * 0.6})`);
    g.addColorStop(0.6, `rgba(232, 190, 90, ${forca * 0.18})`);
    g.addColorStop(1, 'rgba(212, 175, 55, 0)');
    p.fillStyle = g;
    const desenhar = (l) => {
      p.beginPath();
      p.moveTo(0, -l);
      p.quadraticCurveTo(comprimento * 0.22, -l * 0.18, comprimento, 0);
      p.quadraticCurveTo(comprimento * 0.22, l * 0.18, 0, l);
      p.closePath();
      p.fill();
    };
    desenhar(largura);
    p.globalAlpha = 0.28;
    desenhar(largura * 4.5);
    p.restore();
  }

  const ESTRELA = typeof Path2D === 'function' ? new Path2D('M50 0 C52 35 65 48 100 50 C65 52 52 65 50 100 C48 65 35 52 0 50 C35 48 48 35 50 0 Z') : null;
  const ESTRELA_DE_DENTRO = typeof Path2D === 'function' ? new Path2D('M50 15 C52 38 62 48 85 50 C62 52 52 62 50 85 C48 62 38 52 15 50 C38 48 48 38 50 15 Z') : null;

  function voltaComPulo(x) {
    const k1 = 1.56;
    const k3 = k1 + 1;
    return 1 + k3 * Math.pow(x - 1, 3) + k1 * Math.pow(x - 1, 2);
  }

  function saidaSuave(x) {
    return 1 - Math.pow(1 - x, 3);
  }

  function desenharCoroa(cx, cy, raio, angulo, forca) {
    if (forca <= 0.01 || raio <= 0) return;
    const g = p.createRadialGradient(cx, cy, 0, cx, cy, raio);
    g.addColorStop(0, 'rgba(255, 215, 0, 0)');
    g.addColorStop(0.18, `rgba(255, 215, 0, ${0.16 * forca})`);
    g.addColorStop(0.68, 'rgba(255, 215, 0, 0)');
    p.fillStyle = g;
    p.beginPath();
    const fatia = (2.5 * Math.PI) / 180;
    for (let i = 0; i < 24; i++) {
      const a = angulo + (i * Math.PI * 2) / 24;
      p.moveTo(cx, cy);
      p.arc(cx, cy, raio, a, a + fatia);
      p.closePath();
    }
    p.fill();
  }

  function desenharRaio(cx, cy, angulo, comprimento, forca) {
    if (comprimento <= 1 || forca <= 0.01) return;
    p.save();
    p.translate(cx, cy);
    p.rotate(angulo);
    const g = p.createLinearGradient(0, 0, comprimento, 0);
    g.addColorStop(0, 'rgba(255, 215, 0, 0)');
    g.addColorStop(0.38, `rgba(255, 215, 0, ${forca})`);
    g.addColorStop(0.5, `rgba(255, 251, 232, ${forca})`);
    g.addColorStop(0.62, `rgba(255, 215, 0, ${forca})`);
    g.addColorStop(1, 'rgba(255, 215, 0, 0)');
    p.fillStyle = g;
    p.fillRect(0, -1, comprimento, 2);
    p.restore();
  }

  function desenharEstrela(cx, cy, tamanho, angulo, forca, pulso) {
    if (!ESTRELA || tamanho <= 1 || forca <= 0.01) return;
    p.save();
    p.translate(cx, cy);
    p.rotate(angulo);
    p.scale(tamanho / 100, tamanho / 100);
    p.translate(-50, -50);
    p.globalCompositeOperation = 'source-over';
    p.shadowColor = 'rgba(255, 210, 90, 0.9)';
    p.shadowBlur = tamanho > 420 ? 0 : Math.min(48, 26 * mundo.dpr * Math.max(0.6, tamanho / 110));
    const ouro = p.createLinearGradient(20, 0, 80, 100);
    ouro.addColorStop(0, '#fbe7a1');
    ouro.addColorStop(0.45, '#e2bd4f');
    ouro.addColorStop(1, '#b8902f');
    p.globalAlpha = 0.95 * forca;
    p.fillStyle = ouro;
    p.fill(ESTRELA);
    p.shadowBlur = 0;
    p.translate(50, 50);
    p.rotate(Math.PI / 4);
    p.translate(-50, -50);
    p.globalAlpha = forca * pulso;
    p.fillStyle = '#fff3c4';
    p.fill(ESTRELA_DE_DENTRO);
    p.restore();
  }

  function desenharLuz(t) {
    const { w, h } = mundo;
    const m = Math.min(w, h);
    const cx = w / 2;
    const cy = h / 2;
    const voo = entre(T.voa, T.preto, t);
    const aproxima = voo * voo * voo;
    const zoom = 1 + aproxima * 16;
    const tamanho = Math.max(120, Math.min(230, m * 0.25)) * zoom;
    const unidade = tamanho / 100;

    p.save();
    p.globalCompositeOperation = 'lighter';

    mundo.convergem.forEach((luz) => {
      const pr = entre(luz.atraso, luz.atraso + 0.85, t);
      if (pr <= 0 || pr >= 1) return;
      const mov = pr < 0.5 ? 4 * pr * pr * pr : 1 - Math.pow(-2 * pr + 2, 3) / 2;
      const x = cx + luz.dx * (1 - mov);
      const y = cy + luz.dy * (1 - mov);
      const a = pr < 0.2 ? pr / 0.2 : 1 - (pr - 0.2) / 0.8;
      const lado = 18 * (1 - 0.75 * mov);
      p.globalAlpha = Math.max(0, a);
      p.drawImage(mundo.brilhos[3], x - lado / 2, y - lado / 2, lado, lado);
    });
    p.globalAlpha = 1;

    const coroa = entre(1.2, 2.4, t);
    desenharCoroa(cx, cy, Math.min(340, m * 0.8) * zoom, ((t - 1.2) * Math.PI * 2) / 40, coroa * (1 - voo));

    for (let i = 0; i < 12; i++) {
      const pr = entre(0.85 + 0.04 * i, 1.85 + 0.04 * i, t);
      if (pr <= 0 || pr >= 1) continue;
      const a = pr < 0.35 ? pr / 0.35 : 1 - (pr - 0.35) / 0.65;
      desenharRaio(cx, cy, (i * Math.PI) / 6, 300 * unidade * saidaSuave(pr), a);
    }

    const forma = entre(0.25, 1.95, t);
    const forcaDaEstrela = Math.min(1, forma / 0.55);
    const escalaDaEstrela = forma > 0 ? voltaComPulo(forma) : 0;
    const giroLento = t > 1.95 ? ((t - 1.95) * Math.PI * 2) / 9 : 0;
    const giroRapido = t > 3.0 ? Math.pow(t - 3.0, 2) * 2.2 : 0;
    const giro = (-60 * Math.PI / 180) * (1 - voltaComPulo(forma)) + giroLento + giroRapido;
    const pulso = t > 1.95 ? 0.55 + 0.45 * (1 - Math.cos(((t - 1.95) * Math.PI * 2) / 2.2)) / 2 : 0.6;

    if (forcaDaEstrela > 0) {
      const largo = Math.max(1, m / 380) * (1 + aproxima * 6);
      for (let i = 0; i < 4; i++) {
        espinho(cx, cy, giro + (Math.PI / 2) * i - Math.PI / 2, m * 0.34 * escalaDaEstrela * (1 + aproxima * 5), largo, 0.38 * forcaDaEstrela);
      }
    }

    p.restore();
    desenharEstrela(cx, cy, tamanho * escalaDaEstrela, giro, forcaDaEstrela, pulso);

    const clarao = entre(1.8, 2.9, t);
    if (clarao > 0 && clarao < 1) {
      const escala = clarao < 0.4 ? 0.6 + 0.5 * (clarao / 0.4) : 1.1 + 0.4 * ((clarao - 0.4) / 0.6);
      const a = clarao < 0.4 ? 0.6 * (clarao / 0.4) : 0.6 * (1 - (clarao - 0.4) / 0.6);
      const r = (Math.hypot(w, h) / 2) * escala;
      p.save();
      p.globalCompositeOperation = 'lighter';
      circuloDeLuz(cx, cy, r, [
        [0, `rgba(255, 250, 225, ${0.95 * a})`],
        [0.3, `rgba(255, 215, 0, ${0.42 * a})`],
        [0.65, 'rgba(255, 215, 0, 0)'],
        [1, 'rgba(255, 215, 0, 0)'],
      ]);
      p.restore();
    }

    if (voo > 0) {
      const a = 0.85 * aproxima;
      p.save();
      p.globalCompositeOperation = 'lighter';
      circuloDeLuz(cx, cy, Math.hypot(w, h) * (0.2 + voo * 0.6), [
        [0, `rgba(255, 252, 235, ${a})`],
        [0.35, `rgba(255, 220, 130, ${a * 0.5})`],
        [1, 'rgba(255, 215, 0, 0)'],
      ]);
      p.restore();
    }

    return { cx, cy, k: forcaDaEstrela * (1 - voo), m };
  }

  function desenharPoeira(t, dt, luz) {
    if (!luz) return;
    const raio = luz.m * 0.42;
    mundo.poeira.forEach((grao) => {
      grao.x += grao.vx * dt;
      grao.y += grao.vy * dt;
      if (Math.hypot(grao.x, grao.y) > raio) {
        const ang = Math.random() * Math.PI * 2;
        grao.x = Math.cos(ang) * raio * 0.3;
        grao.y = Math.sin(ang) * raio * 0.3 + raio * 0.35;
      }
      const perto = 1 - Math.hypot(grao.x, grao.y) / raio;
      const a = luz.k * perto * perto * (0.55 + 0.45 * Math.sin(t * 3 + grao.fase));
      if (a <= 0.01) return;
      const lado = grao.r * 6;
      p.globalAlpha = Math.min(1, a);
      p.drawImage(mundo.brilhos[3], luz.cx + grao.x - lado / 2, luz.cy + grao.y - lado / 2, lado, lado);
    });
    p.globalAlpha = 1;
  }

  function desenharMeteoros(t) {
    mundo.meteoros.forEach((me) => {
      const prog = (t - me.t0) / me.dur;
      if (prog <= 0 || prog >= 1) return;
      const passado = t - me.t0;
      const hx = me.x + me.vx * passado;
      const hy = me.y + me.vy * passado;
      const n = Math.hypot(me.vx, me.vy) || 1;
      const cauda = me.cauda * Math.min(1, prog * 3);
      const tx = hx - (me.vx / n) * cauda;
      const ty = hy - (me.vy / n) * cauda;
      const a = Math.sin(Math.PI * prog);
      const g = p.createLinearGradient(tx, ty, hx, hy);
      g.addColorStop(0, 'rgba(255, 215, 0, 0)');
      g.addColorStop(0.7, `rgba(255, 220, 120, ${0.45 * a})`);
      g.addColorStop(1, `rgba(255, 252, 238, ${0.95 * a})`);
      p.strokeStyle = g;
      p.lineCap = 'round';
      p.lineWidth = 1.6;
      p.beginPath();
      p.moveTo(tx, ty);
      p.lineTo(hx, hy);
      p.stroke();
      p.globalAlpha = 0.35 * a;
      p.lineWidth = 5;
      p.stroke();
      p.globalAlpha = a;
      p.drawImage(mundo.brilhos[3], hx - 7, hy - 7, 14, 14);
      p.globalAlpha = 1;
    });
  }

  function desenharCeu(t, dt) {
    const { w, h, dpr } = mundo;
    const cx = w / 2;
    const cy = h / 2;
    p.setTransform(dpr, 0, 0, dpr, 0, 0);
    p.globalCompositeOperation = 'source-over';
    p.globalAlpha = 1;
    p.fillStyle = '#02030a';
    p.fillRect(0, 0, w, h);
    const voo = entre(T.voa, T.preto, t);
    const aproxima = voo * voo * voo;
    const zoomDoCeu = 1 + aproxima * 1.4;
    p.globalAlpha = 1 - voo * 0.5;
    p.drawImage(mundo.ceu, cx - (w * zoomDoCeu) / 2 - Math.min(t, 6) * 2, cy - (h * zoomDoCeu) / 2, w * zoomDoCeu + 14, h * zoomDoCeu);
    p.globalAlpha = 1;

    const aparece = suave(0, 0.9, t);
    p.globalCompositeOperation = 'lighter';
    const deriva = Math.min(t, T.voa) * 4;
    mundo.estrelas.forEach((e) => {
      const entra = suave(e.entra, e.entra + 0.6, t);
      if (entra <= 0) return;
      const cintila = 1 - e.amp + e.amp * Math.sin(e.f * t * Math.PI * 2 + e.fase);
      const a = e.a * cintila * entra * aparece;
      if (a <= 0.02) return;
      const bx = e.x - deriva;
      if (voo > 0.03) {
        const k = 1 + aproxima * 9 * e.z;
        const kAntes = 1 + Math.max(0, aproxima - 0.07) * 9 * e.z;
        p.globalAlpha = 1;
        p.strokeStyle = rgba(CORES[e.cor], Math.min(1, a));
        p.lineWidth = Math.max(0.6, e.r * (0.8 + aproxima * 2));
        p.beginPath();
        p.moveTo(cx + (bx - cx) * kAntes, cy + (e.y - cy) * kAntes);
        p.lineTo(cx + (bx - cx) * k, cy + (e.y - cy) * k);
        p.stroke();
        return;
      }
      const lado = e.r * 7;
      p.globalAlpha = Math.min(1, a);
      p.drawImage(mundo.brilhos[e.cor], bx - lado / 2, e.y - lado / 2, lado, lado);
    });
    p.globalAlpha = 1;

    if (voo < 0.2) desenharMeteoros(t);
    const luz = desenharLuz(t);
    desenharPoeira(t, dt, luz);
    p.globalCompositeOperation = 'source-over';
    if (feixes) {
      feixes.style.transform = `scale(${1 + aproxima * 3})`;
      feixes.style.opacity = String(1 - voo);
    }
  }

  const escrita = { pronta: false, cortes: [], faixa: null, esquerda: 0, direita: 0, colunas: [], origemX: 0, origemY: 0, penaY: null, caixa: null };
  function montarNome() {
    if (escrita.pronta || !medida || !nomeSvg || !grupoDeLetras) return;
    escrita.pronta = true;
    const ns = 'http://www.w3.org/2000/svg';
    let b = null;
    try { b = medida.getBBox(); } catch (e) { b = null; }
    if (!b || !(b.width > 0)) b = { x: 200, y: 40, width: 1000, height: 220 };
    escrita.caixa = b;
    nomeSvg.setAttribute('viewBox', `${b.x - 80} ${b.y - 60} ${b.width + 160} ${b.height + 120}`);
    const defs = nomeSvg.querySelector('defs');
    const fazerCorte = (id) => {
      const clip = document.createElementNS(ns, 'clipPath');
      clip.id = id;
      const ret = document.createElementNS(ns, 'rect');
      ret.setAttribute('x', b.x - 120); ret.setAttribute('y', b.y - 200); ret.setAttribute('height', b.height + 400); ret.setAttribute('width', 0);
      clip.appendChild(ret);
      defs.appendChild(clip);
      return ret;
    };
    escrita.cortes = [fazerCorte('intro-corte-tinta')];
    escrita.faixa = fazerCorte('intro-corte-faixa');
    const texto = medida.textContent;
    const fazerTexto = (classe, corte) => {
      const el = document.createElementNS(ns, 'text');
      el.setAttribute('x', 700); el.setAttribute('y', 200); el.setAttribute('text-anchor', 'middle');
      el.setAttribute('class', classe);
      el.setAttribute('clip-path', `url(#${corte})`);
      el.textContent = texto;
      grupoDeLetras.appendChild(el);
    };
    fazerTexto('intro-sombra', 'intro-corte-tinta');
    fazerTexto('intro-tinta', 'intro-corte-tinta');
    fazerTexto('intro-realce', 'intro-corte-tinta');
    fazerTexto('intro-traco', 'intro-corte-faixa');
    escrita.esquerda = b.x;
    escrita.direita = b.x + b.width;
    try {
      const margem = 140;
      const largura = Math.ceil(b.width + margem * 2);
      const altura = Math.ceil(b.height + margem * 2);
      const c = document.createElement('canvas');
      c.width = largura; c.height = altura;
      const q = c.getContext('2d');
      const estilo = getComputedStyle(medida);
      q.font = `${estilo.fontSize || '200px'} ${estilo.fontFamily}`;
      q.textAlign = 'center';
      q.textBaseline = 'alphabetic';
      q.fillStyle = '#000';
      escrita.origemX = b.x - margem;
      escrita.origemY = b.y - margem;
      q.fillText(texto, 700 - escrita.origemX, 200 - escrita.origemY);
      const dados = q.getImageData(0, 0, largura, altura).data;
      let primeira = -1; let ultima = -1;
      for (let col = 0; col < largura; col += 1) {
        const trechos = [];
        let comeco = -1;
        for (let lin = 0; lin < altura; lin += 1) {
          const tem = dados[(lin * largura + col) * 4 + 3] > 90;
          if (tem && comeco < 0) comeco = lin;
          if ((!tem || lin === altura - 1) && comeco >= 0) { trechos.push((comeco + lin) / 2); comeco = -1; }
        }
        escrita.colunas.push(trechos);
        if (trechos.length) { if (primeira < 0) primeira = col; ultima = col; }
      }
      if (primeira >= 0) { escrita.esquerda = escrita.origemX + primeira - 6; escrita.direita = escrita.origemX + ultima + 6; }
    } catch (e) {
      escrita.colunas = [];
    }
  }

  function alturaDaPena(xSvg) {
    const col = Math.round(xSvg - escrita.origemX);
    let trechos = null;
    for (let d = 0; d <= 4 && !trechos; d += 1) {
      const a = escrita.colunas[col - d]; const b = escrita.colunas[col + d];
      if (a && a.length) trechos = a; else if (b && b.length) trechos = b;
    }
    if (!trechos) return { y: escrita.penaY, tinta: false };
    let melhor = trechos[0];
    if (escrita.penaY !== null) trechos.forEach((y) => { if (Math.abs(y + escrita.origemY - escrita.penaY) < Math.abs(melhor + escrita.origemY - escrita.penaY)) melhor = y; });
    else trechos.forEach((y) => { if (y > melhor) melhor = y; });
    return { y: melhor + escrita.origemY, tinta: true };
  }

  function pontoDeTinta(ateX) {
    if (!escrita.colunas.length) return null;
    const limite = Math.min(escrita.colunas.length - 1, Math.round(ateX - escrita.origemX));
    const inicioCol = Math.max(0, Math.round(escrita.esquerda - escrita.origemX));
    if (limite <= inicioCol) return null;
    for (let tentativa = 0; tentativa < 6; tentativa += 1) {
      const col = inicioCol + Math.floor(Math.random() * (limite - inicioCol));
      const trechos = escrita.colunas[col];
      if (trechos && trechos.length) return { x: col + escrita.origemX, y: trechos[Math.floor(Math.random() * trechos.length)] + escrita.origemY };
    }
    return null;
  }

  function pontoNaTela(x, y) {
    try {
      const m = nomeSvg.getScreenCTM();
      if (!m) return null;
      const ponto = nomeSvg.createSVGPoint(); ponto.x = x; ponto.y = y;
      const r = ponto.matrixTransform(m);
      return { x: r.x, y: r.y };
    } catch (e) {
      return null;
    }
  }

  function desenharLampejo(x, y, tam, a) {
    c2.save();
    c2.translate(x, y);
    for (let i = 0; i < 2; i += 1) {
      c2.rotate(Math.PI / 2 * i);
      const g = c2.createLinearGradient(-tam, 0, tam, 0);
      g.addColorStop(0, 'rgba(255, 240, 200, 0)'); g.addColorStop(0.5, `rgba(255, 252, 238, ${a})`); g.addColorStop(1, 'rgba(255, 240, 200, 0)');
      c2.fillStyle = g; c2.fillRect(-tam, -0.8, tam * 2, 1.6);
    }
    const n = c2.createRadialGradient(0, 0, 0, 0, 0, tam * 0.35);
    n.addColorStop(0, `rgba(255, 255, 255, ${a})`); n.addColorStop(1, 'rgba(255, 230, 170, 0)');
    c2.fillStyle = n; c2.beginPath(); c2.arc(0, 0, tam * 0.35, 0, 6.29); c2.fill();
    c2.restore();
  }

  const NATAL = (() => { const d = new Date(); const m = d.getMonth(); const dia = d.getDate(); return (m === 10 && dia >= 20) || m === 11 || (m === 0 && dia <= 6); })();
  const CORES_DOS_RAIOS = NATAL
    ? [[255, 244, 210, 255, 224, 150], [255, 244, 210, 255, 224, 150], [255, 190, 190, 235, 70, 80], [205, 255, 215, 90, 200, 120]]
    : [[255, 244, 210, 255, 224, 150]];
  const neve = [];
  function desenharNeve(t, dt, w, h) {
    if (!NATAL) return;
    const forca = suave(T.preto - 0.1, T.escreve + 0.4, t) * (1 - suave(T.brilha, T.branco, t));
    if (forca <= 0) return;
    if (!neve.length) {
      const total = Math.round(Math.min(160, Math.max(60, (w * h) / 9000)));
      for (let i = 0; i < total; i += 1) neve.push({ x: Math.random() * w, y: Math.random() * h, r: 0.8 + Math.random() * 2.4, v: 18 + Math.random() * 38, fase: Math.random() * 6.28, balanco: 10 + Math.random() * 26 });
    }
    c2.globalCompositeOperation = 'source-over';
    neve.forEach((f) => {
      f.y += f.v * dt * (0.6 + f.r / 3);
      if (f.y > h + 6) { f.y = -6; f.x = Math.random() * w; }
      const x = f.x + Math.sin(t * 0.9 + f.fase) * f.balanco;
      const a = forca * (0.35 + f.r / 4.5);
      const g = c2.createRadialGradient(x, f.y, 0, x, f.y, f.r * 2.2);
      g.addColorStop(0, `rgba(255, 255, 255, ${Math.min(1, a)})`);
      g.addColorStop(1, 'rgba(255, 255, 255, 0)');
      c2.fillStyle = g;
      c2.beginPath(); c2.arc(x, f.y, f.r * 2.2, 0, 6.29); c2.fill();
    });
  }

  function desenharNome(t, dt) {
    const { w, h } = mundo;
    c2.setTransform(mundo.dpr, 0, 0, mundo.dpr, 0, 0);
    c2.clearRect(0, 0, w, h);
    desenharNeve(t, dt, w, h);
    const visivel = t >= T.escreve - 0.05;
    nomeEl.style.opacity = visivel ? '1' : '0';
    if (!visivel || !escrita.pronta) return;
    const pr = entre(T.escreve, T.escrito, t);
    const x = escrita.esquerda + (escrita.direita - escrita.esquerda) * pr;
    const inicioDoCorte = escrita.caixa.x - 120;
    escrita.cortes.forEach((c) => c.setAttribute('width', String(Math.max(0, x - inicioDoCorte))));
    const brasa = 1 - suave(T.escrito, T.escrito + 0.5, t);
    escrita.faixa.setAttribute('x', String(x - 170));
    escrita.faixa.setAttribute('width', String(pr > 0 ? 170 * brasa : 0));

    const k = suave(T.brilha, T.branco, t);
    nomeEl.style.transform = `scale(${1 + 1.9 * k * k})`;
    if (borrao) borrao.setAttribute('stdDeviation', String(3 + 13 * k));
    if (luzDoNome) luzDoNome.setAttribute('opacity', String(Math.min(1, k * 1.3)));
    const r = entre(T.escrito - 0.1, T.brilha + 0.3, t);
    if (reflexoNome) reflexoNome.setAttribute('opacity', r > 0 && r < 1 ? '0.85' : '0');
    if (reflexo) reflexo.setAttribute('gradientTransform', `translate(${escrita.caixa.x - 340 + r * (escrita.caixa.width + 680)} 0)`);

    let pena = null;
    let forca = 0;
    if (pr > 0 && pr < 1) {
      const alvo = alturaDaPena(x);
      if (alvo.y !== null && alvo.y !== undefined) {
        escrita.penaY = escrita.penaY === null ? alvo.y : escrita.penaY + (alvo.y - escrita.penaY) * Math.min(1, dt * 30);
        pena = pontoNaTela(x, escrita.penaY);
        forca = alvo.tinta ? 1 : 0.45;
      }
    }
    if (dt > 0 && pr > 0) {
      const taxa = 7 + 26 * k;
      const base = taxa * dt;
      const novos = Math.floor(base) + (Math.random() < base % 1 ? 1 : 0);
      for (let i = 0; i < novos; i += 1) {
        const ponto = pontoDeTinta(x);
        const naTela = ponto && pontoNaTela(ponto.x, ponto.y);
        if (!naTela) continue;
        lampejos.push({ x: naTela.x, y: naTela.y, ang: -Math.PI / 2 + (Math.random() - 0.5) * 1.3, comp: 90 + Math.random() * 170, larg: 5 + Math.random() * 12, vida: 0, max: 1.1 + Math.random() * 0.9, cor: CORES_DOS_RAIOS[Math.floor(Math.random() * CORES_DOS_RAIOS.length)] });
      }
    }

    c2.globalCompositeOperation = 'lighter';
    if (pr > 0) {
      const ini = pontoNaTela(escrita.esquerda, escrita.caixa.y + escrita.caixa.height * 0.55);
      const fimX = pontoNaTela(x, escrita.caixa.y + escrita.caixa.height * 0.55);
      if (ini && fimX && fimX.x > ini.x) {
        const cx = (ini.x + fimX.x) / 2;
        const meia = (fimX.x - ini.x) / 2 + 60;
        c2.save();
        c2.translate(cx, ini.y);
        c2.scale(1, 0.42);
        const aura = c2.createRadialGradient(0, 0, 0, 0, 0, meia);
        const forte = 0.16 + 0.1 * Math.sin(t * 2.2);
        aura.addColorStop(0, NATAL ? `rgba(255, 200, 170, ${forte})` : `rgba(255, 228, 160, ${forte})`);
        aura.addColorStop(0.6, NATAL ? `rgba(220, 60, 70, ${forte * 0.35})` : `rgba(255, 210, 120, ${forte * 0.4})`);
        aura.addColorStop(1, 'rgba(255, 200, 100, 0)');
        c2.fillStyle = aura;
        c2.beginPath(); c2.arc(0, 0, meia, 0, 6.29); c2.fill();
        c2.restore();
      }
    }
    for (let i = lampejos.length - 1; i >= 0; i -= 1) {
      const l = lampejos[i];
      l.vida += dt;
      if (l.vida > l.max) { lampejos.splice(i, 1); continue; }
      const s = Math.sin(Math.PI * (l.vida / l.max));
      const comp = l.comp * (0.55 + 0.45 * s);
      c2.save();
      c2.translate(l.x, l.y);
      c2.rotate(l.ang + Math.PI / 2);
      const g = c2.createLinearGradient(0, 0, 0, -comp);
      const cor = l.cor || CORES_DOS_RAIOS[0];
      const vivo = cor === CORES_DOS_RAIOS[0] ? 1 : 1.5;
      g.addColorStop(0, `rgba(${cor[0]}, ${cor[1]}, ${cor[2]}, ${0.34 * s * vivo})`);
      g.addColorStop(0.35, `rgba(${cor[3]}, ${cor[4]}, ${cor[5]}, ${0.16 * s * vivo})`);
      g.addColorStop(1, `rgba(${cor[3]}, ${cor[4]}, ${cor[5]}, 0)`);
      c2.fillStyle = g;
      c2.beginPath();
      c2.moveTo(-l.larg * 0.35, 0);
      c2.lineTo(-l.larg, -comp);
      c2.lineTo(l.larg, -comp);
      c2.lineTo(l.larg * 0.35, 0);
      c2.closePath();
      c2.fill();
      c2.restore();
    }
    if (pena) {
      const raio = 34;
      const g = c2.createRadialGradient(pena.x, pena.y, 0, pena.x, pena.y, raio);
      g.addColorStop(0, `rgba(255, 255, 250, ${forca})`); g.addColorStop(0.18, `rgba(255, 236, 170, ${0.75 * forca})`); g.addColorStop(1, 'rgba(255, 210, 110, 0)');
      c2.fillStyle = g; c2.beginPath(); c2.arc(pena.x, pena.y, raio, 0, 6.29); c2.fill();
    }
    if (k > 0) {
      const centro = pontoNaTela(escrita.caixa.x + escrita.caixa.width / 2, escrita.caixa.y + escrita.caixa.height / 2) || { x: w / 2, y: h / 2 };
      const esquerda = pontoNaTela(escrita.caixa.x, escrita.caixa.y + escrita.caixa.height / 2);
      const meia = esquerda ? Math.abs(centro.x - esquerda.x) : w * 0.4;
      const raio = Math.max(10, meia * (0.5 + 2.8 * k * k) + Math.hypot(w, h) * 0.6 * k * k * k);
      const g = c2.createRadialGradient(centro.x, centro.y, 0, centro.x, centro.y, raio);
      g.addColorStop(0, `rgba(255, 255, 252, ${0.95 * k})`);
      g.addColorStop(0.35, `rgba(255, 246, 215, ${0.75 * k})`);
      g.addColorStop(0.7, `rgba(255, 225, 150, ${0.35 * k})`);
      g.addColorStop(1, 'rgba(255, 215, 120, 0)');
      c2.fillStyle = g;
      c2.fillRect(0, 0, w, h);
    }
    c2.globalCompositeOperation = 'source-over';
  }

  function tipoDeAparelho() {
    const ua = navigator.userAgent || '';
    if (/SmartTV|SMART-TV|Tizen|Web0S|WebOS|NetCast|HbbTV|Android TV|GoogleTV|AFT[A-Z]|BRAVIA|CrKey/i.test(ua)) return 'tv';
    if ((window.matchMedia && window.matchMedia('(pointer: coarse)').matches) || /Android|iPhone|iPad/i.test(ua)) return 'celular';
    return 'computador';
  }
  const DICAS = {
    pt: { computador: 'Clique com o botão esquerdo para pular a animação', celular: 'Toque na tela para pular a animação', tv: 'Aperte OK no controle para pular a animação' },
    en: { computador: 'Left-click to skip the animation', celular: 'Tap the screen to skip the animation', tv: 'Press OK on the remote to skip the animation' },
    es: { computador: 'Haz clic con el botón izquierdo para saltar la animación', celular: 'Toca la pantalla para saltar la animación', tv: 'Pulsa OK en el control remoto para saltar la animación' },
  };
  const ICONES = {
    computador: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><rect x="6" y="3" width="12" height="18" rx="6"/><path d="M12 3v7M6 10h6"/><path d="M6.6 10V9a5.4 5.4 0 0 1 5.4-6v7z" fill="currentColor" stroke="none"/></svg>',
    celular: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><rect x="6" y="2.5" width="12" height="19" rx="2.5"/><circle cx="12" cy="12" r="2.6" fill="currentColor" stroke="none"/></svg>',
    tv: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><rect x="7" y="2" width="10" height="20" rx="5"/><circle cx="12" cy="8" r="2.4" fill="currentColor" stroke="none"/><path d="M10 14h4M10 17h4"/></svg>',
  };
  let temDica = false;
  try {
    if (dica && !localStorage.getItem('lumina-sancti-dica-da-entrada')) {
      const tipo = tipoDeAparelho();
      const idioma = localStorage.getItem('lumina-sancti-idioma') || 'pt';
      const frases = DICAS[idioma] || DICAS.pt;
      dica.className = `intro-dica ${tipo}`;
      dica.innerHTML = `${ICONES[tipo]}<span>${frases[tipo]}</span>`;
      localStorage.setItem('lumina-sancti-dica-da-entrada', '1');
      temDica = true;
    }
  } catch (e) {
    temDica = false;
  }

  function quadroDaEntrada(agora) {
    if (encerrada) return;
    const t = tempo(agora);
    const dt = Math.min(0.1, Math.max(0, t - ultimo));
    ultimo = t;
    const escondida = tela.style.display === 'none';
    if (!escondida && t < T.preto + 0.1) desenharCeu(t, dt);
    if (!escondida) desenharNome(t, dt);
    preto.style.opacity = String(suave(T.preto - 0.28, T.preto, t));
    branco.style.opacity = String(suave(T.branco - 0.35, T.branco, t) * (1 - suave(T.branco, T.fim, t)));
    if (temDica) dica.style.opacity = String(suave(0.5, 1.0, t) * (1 - suave(T.brilha - 0.3, T.brilha, t)));
    if (t >= T.branco) revelar();
    if (t >= T.fim) { encerrar(); return; }
    quadroId = requestAnimationFrame(quadroDaEntrada);
  }

  montar();
  window.addEventListener('resize', () => { if (!encerrada) montar(); });
  const fontes = document.fonts && document.fonts.load ? document.fonts.load('200px "Alex Brush"') : Promise.resolve();
  Promise.race([fontes, new Promise((ok) => setTimeout(ok, 2500))]).then(montarNome, montarNome);
  quadroId = requestAnimationFrame(quadroDaEntrada);
})();
