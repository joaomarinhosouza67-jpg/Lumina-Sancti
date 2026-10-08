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
  const mundo = { w: 0, h: 0, dpr: 1, ceu: null, estrelas: [], poeira: [], meteoros: [], brilhos: [], convergem: [] };

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

  function entre(a, b, x) {
    return Math.min(1, Math.max(0, (x - a) / (b - a)));
  }

  function voltaComPulo(x) {
    const c1 = 1.56;
    const c3 = c1 + 1;
    return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
  }

  function saidaSuave(x) {
    return 1 - Math.pow(1 - x, 3);
  }

  function desenharCoroa(cx, cy, raio, angulo, forca) {
    if (forca <= 0.01) return;
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
    p.shadowBlur = 26 * mundo.dpr * Math.max(0.6, tamanho / 110);
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
    const cy = h * 0.42;
    const tamanho = Math.max(92, Math.min(150, m * 0.17));
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
      const lado = 16 * (1 - 0.75 * mov);
      p.globalAlpha = Math.max(0, a);
      p.drawImage(mundo.brilhos[3], x - lado / 2, y - lado / 2, lado, lado);
    });
    p.globalAlpha = 1;

    const coroa = entre(1.2, 2.4, t);
    desenharCoroa(cx, cy, Math.min(260, m * 0.65), ((t - 1.2) * Math.PI * 2) / 40, coroa);

    for (let i = 0; i < 12; i++) {
      const pr = entre(0.85 + 0.04 * i, 1.85 + 0.04 * i, t);
      if (pr <= 0 || pr >= 1) continue;
      const a = pr < 0.35 ? pr / 0.35 : 1 - (pr - 0.35) / 0.65;
      desenharRaio(cx, cy, (i * Math.PI) / 6, 280 * unidade * saidaSuave(pr), a);
    }

    const forma = entre(0.25, 1.95, t);
    const forcaDaEstrela = Math.min(1, forma / 0.55);
    const escalaDaEstrela = forma > 0 ? voltaComPulo(forma) : 0;
    const giro = (-60 * Math.PI / 180) * (1 - voltaComPulo(forma)) + (t > 1.95 ? ((t - 1.95) * Math.PI * 2) / 14 : 0);
    const pulso = t > 1.95 ? 0.55 + 0.45 * (1 - Math.cos(((t - 1.95) * Math.PI * 2) / 2.2)) / 2 : 0.6;

    if (forcaDaEstrela > 0) {
      const largo = Math.max(1, m / 420);
      for (let i = 0; i < 4; i++) {
        espinho(cx, cy, giro + (Math.PI / 2) * i - Math.PI / 2, m * 0.3 * escalaDaEstrela, largo, 0.35 * forcaDaEstrela);
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

    return { cx, cy, k: forcaDaEstrela, m };
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
