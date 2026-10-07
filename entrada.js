(function iniciarEntrada() {
  const tela = document.getElementById('intro-screen');
  if (!tela) return;
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    tela.style.display = 'none';
    return;
  }
  document.body.classList.add('intro-ativa');

  const inicio = performance.now();
  let encerrada = false;
  let quadro = null;

  function tocarBrilho() {
    if (typeof tocarSomDeBrilho === 'function') tocarSomDeBrilho();
  }

  function encerrar() {
    if (encerrada) return;
    encerrada = true;
    document.body.classList.remove('intro-ativa');
    tela.classList.add('fade-out');
    setTimeout(() => {
      tela.style.display = 'none';
      if (quadro) cancelAnimationFrame(quadro);
      quadro = null;
    }, 1000);
  }

  tela.addEventListener('click', encerrar);
  window.addEventListener('load', () => {
    setTimeout(encerrar, Math.max(3900 - (performance.now() - inicio), 700));
  });
  setTimeout(encerrar, 6000);
  setTimeout(tocarBrilho, 900);
  document.addEventListener('click', tocarBrilho, { once: true });

  const tela2d = document.getElementById('intro-canvas');
  const p = tela2d && tela2d.getContext ? tela2d.getContext('2d') : null;
  if (!p) return;

  const CORES = [[196, 214, 255], [255, 255, 255], [255, 245, 226], [255, 226, 178], [255, 200, 140]];
  const mundo = { w: 0, h: 0, dpr: 1, ceu: null, estrelas: [], poeira: [], meteoros: [], brilhos: [] };

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
    c.width = Math.round(w * dpr);
    c.height = Math.round(h * dpr);
    const q = c.getContext('2d');
    q.setTransform(dpr, 0, 0, dpr, 0, 0);

    const fundo = q.createLinearGradient(0, 0, 0, h);
    fundo.addColorStop(0, '#03040c');
    fundo.addColorStop(0.55, '#070b1f');
    fundo.addColorStop(1, '#0e0c1c');
    q.fillStyle = fundo;
    q.fillRect(0, 0, w, h);

    const horizonte = q.createRadialGradient(w * 0.5, h * 1.15, 0, w * 0.5, h * 1.15, Math.max(w, h) * 0.75);
    horizonte.addColorStop(0, 'rgba(212, 150, 70, 0.16)');
    horizonte.addColorStop(0.45, 'rgba(120, 70, 90, 0.06)');
    horizonte.addColorStop(1, 'rgba(0, 0, 0, 0)');
    q.fillStyle = horizonte;
    q.fillRect(0, 0, w, h);

    const ax = -0.15 * w;
    const ay = 1.05 * h;
    const bx = 1.15 * w;
    const by = -0.1 * h;
    const comp = Math.hypot(bx - ax, by - ay);
    const nx = -(by - ay) / comp;
    const ny = (bx - ax) / comp;
    const largura = Math.min(w, h) * 0.17;

    q.globalCompositeOperation = 'lighter';
    for (let i = 0; i < 26; i++) {
      const t = Math.random();
      const d = normal() * largura * 0.6;
      const x = ax + (bx - ax) * t + nx * d;
      const y = ay + (by - ay) * t + ny * d;
      const r = largura * (0.6 + Math.random() * 1.1);
      const g = q.createRadialGradient(x, y, 0, x, y, r);
      const quente = Math.random() < 0.35;
      g.addColorStop(0, quente ? 'rgba(220, 180, 140, 0.05)' : 'rgba(150, 160, 230, 0.05)');
      g.addColorStop(1, 'rgba(0, 0, 0, 0)');
      q.fillStyle = g;
      q.fillRect(x - r, y - r, r * 2, r * 2);
    }
    const pontos = Math.round(Math.min(2600, (w * h) / 420));
    for (let i = 0; i < pontos; i++) {
      const t = Math.random();
      const d = normal() * largura * 0.45;
      const x = ax + (bx - ax) * t + nx * d;
      const y = ay + (by - ay) * t + ny * d;
      const a = Math.random() * 0.32 * Math.exp(-Math.abs(d) / largura);
      q.fillStyle = `rgba(230, 228, 255, ${a.toFixed(3)})`;
      const lado = Math.random() < 0.9 ? 0.7 : 1.2;
      q.fillRect(x, y, lado, lado);
    }
    q.globalCompositeOperation = 'source-over';
    for (let i = 0; i < 9; i++) {
      const t = 0.15 + Math.random() * 0.7;
      const d = normal() * largura * 0.15;
      const x = ax + (bx - ax) * t + nx * d;
      const y = ay + (by - ay) * t + ny * d;
      const r = largura * (0.25 + Math.random() * 0.35);
      const g = q.createRadialGradient(x, y, 0, x, y, r);
      g.addColorStop(0, 'rgba(3, 4, 12, 0.35)');
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
    const w = window.innerWidth;
    const h = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, w < 700 ? 1.5 : 2);
    tela2d.width = Math.round(w * dpr);
    tela2d.height = Math.round(h * dpr);
    mundo.w = w;
    mundo.h = h;
    mundo.dpr = dpr;
    mundo.ceu = pintarCeu(w, h, dpr);
    if (!mundo.brilhos.length) mundo.brilhos = CORES.map(fazerBrilho);

    const total = Math.round(Math.min(560, Math.max(220, (w * h) / 2300)));
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
      };
    });

    const m = Math.min(w, h);
    mundo.poeira = Array.from({ length: w < 700 ? 34 : 56 }, () => {
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

  function desenharLuz(t) {
    const { w, h } = mundo;
    const m = Math.min(w, h);
    const cx = w / 2;
    const cy = h * 0.42;
    const acende = suave(0.35, 1.75, t);
    const clarao = Math.exp(-Math.pow((t - 1.8) / 0.22, 2)) * 0.55;
    const respira = 1 + Math.sin(t * 2.3) * 0.04 * acende;
    const k = Math.min(1.5, acende * respira + clarao);
    if (k <= 0.001) return;

    circuloDeLuz(cx, cy, m * 0.62 * (0.55 + 0.45 * acende), [
      [0, `rgba(255, 214, 130, ${0.2 * k})`],
      [0.35, `rgba(212, 160, 60, ${0.07 * k})`],
      [1, 'rgba(212, 175, 55, 0)'],
    ]);
    circuloDeLuz(cx, cy, m * 0.15 * (0.5 + 0.5 * acende), [
      [0, `rgba(255, 248, 228, ${Math.min(1, 0.95 * k)})`],
      [0.3, `rgba(255, 222, 150, ${0.5 * k})`],
      [1, 'rgba(255, 200, 110, 0)'],
    ]);

    const longo = m * 0.4 * acende * (1 + clarao * 0.5);
    const curto = m * 0.14 * acende * (1 + clarao * 0.4);
    const largo = Math.max(1.2, m / 360);
    for (let i = 0; i < 4; i++) espinho(cx, cy, (Math.PI / 2) * i, longo, largo, Math.min(1, 0.95 * k));
    for (let i = 0; i < 4; i++) espinho(cx, cy, Math.PI / 4 + (Math.PI / 2) * i, curto, largo * 0.7, Math.min(1, 0.5 * k));

    circuloDeLuz(cx, cy, 6 + m * 0.018, [
      [0, 'rgba(255, 255, 255, 1)'],
      [0.45, `rgba(255, 250, 235, ${Math.min(1, k)})`],
      [1, 'rgba(255, 240, 200, 0)'],
    ]);
    return { cx, cy, k: acende, m };
  }

  function desenharPoeira(t, dt, luz) {
    if (!luz) return;
    const raio = luz.m * 0.4;
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

  let anterior = inicio;
  function quadroDaEntrada(agora) {
    if (encerrada && tela.style.display === 'none') return;
    const t = (agora - inicio) / 1000;
    const dt = Math.min(0.05, (agora - anterior) / 1000);
    anterior = agora;
    const { w, h, dpr } = mundo;

    p.setTransform(dpr, 0, 0, dpr, 0, 0);
    p.globalCompositeOperation = 'source-over';
    p.globalAlpha = 1;
    p.fillStyle = '#03040c';
    p.fillRect(0, 0, w, h);
    p.drawImage(mundo.ceu, -Math.min(t, 6) * 2, 0, w + 14, h);

    const aparece = suave(0, 0.9, t);
    p.globalCompositeOperation = 'lighter';
    const deriva = t * 4;
    mundo.estrelas.forEach((e) => {
      const entra = suave(e.entra, e.entra + 0.6, t);
      if (entra <= 0) return;
      const cintila = 1 - e.amp + e.amp * Math.sin(e.f * t * Math.PI * 2 + e.fase);
      const a = e.a * cintila * entra * aparece;
      if (a <= 0.02) return;
      const lado = e.r * 7;
      p.globalAlpha = Math.min(1, a);
      p.drawImage(mundo.brilhos[e.cor], e.x - deriva - lado / 2, e.y - lado / 2, lado, lado);
    });
    p.globalAlpha = 1;

    desenharMeteoros(t);
    const luz = desenharLuz(t);
    desenharPoeira(t, dt, luz);
    p.globalCompositeOperation = 'source-over';

    quadro = requestAnimationFrame(quadroDaEntrada);
  }

  montar();
  window.addEventListener('resize', () => { if (!encerrada) montar(); });
  quadro = requestAnimationFrame(quadroDaEntrada);
})();
