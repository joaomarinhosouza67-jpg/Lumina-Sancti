import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.min.js';

const ESCALA = 1 / 50;
const CORES_DOS_METAIS = { bronze: '#c98a52', prata: '#dfe5ee', ouro: '#f2c35a', real: '#ffe08a' };

function para3d(x, y) {
  return new THREE.Vector2((x - 100) * ESCALA, -(y - 98) * ESCALA);
}

function formaDosPontos(pontos, fator) {
  const forma = new THREE.Shape();
  pontos.forEach(([x, y], i) => {
    const v = para3d(x, y).multiplyScalar(fator);
    if (i === 0) forma.moveTo(v.x, v.y);
    else forma.lineTo(v.x, v.y);
  });
  forma.closePath();
  return forma;
}

function formaDoCaminho(d) {
  const forma = new THREE.Shape();
  const partes = d.match(/[MLCHVZ]|-?\d*\.?\d+/g) || [];
  let i = 0;
  let atual = [0, 0];
  let comando = '';
  const numero = () => Number(partes[i++]);
  while (i < partes.length) {
    if (/[MLCHVZ]/.test(partes[i])) comando = partes[i++];
    if (comando === 'M') { atual = [numero(), numero()]; const v = para3d(...atual); forma.moveTo(v.x, v.y); comando = 'L'; }
    else if (comando === 'L') { atual = [numero(), numero()]; const v = para3d(...atual); forma.lineTo(v.x, v.y); }
    else if (comando === 'H') { atual = [numero(), atual[1]]; const v = para3d(...atual); forma.lineTo(v.x, v.y); }
    else if (comando === 'V') { atual = [atual[0], numero()]; const v = para3d(...atual); forma.lineTo(v.x, v.y); }
    else if (comando === 'C') {
      const a = para3d(numero(), numero());
      const b = para3d(numero(), numero());
      atual = [numero(), numero()];
      const c = para3d(...atual);
      forma.bezierCurveTo(a.x, a.y, b.x, b.y, c.x, c.y);
    } else if (comando === 'Z') { forma.closePath(); }
    else i += 1;
  }
  return forma;
}

function texturaRedonda(cor) {
  const tela = document.createElement('canvas');
  tela.width = 64;
  tela.height = 64;
  const ctx = tela.getContext('2d');
  const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  grad.addColorStop(0, '#ffffff');
  grad.addColorStop(0.25, cor);
  grad.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 64, 64);
  const textura = new THREE.CanvasTexture(tela);
  textura.colorSpace = THREE.SRGBColorSpace;
  return textura;
}

function ambienteDaLiga(renderizador, corDaLiga) {
  const cena = new THREE.Scene();
  cena.add(new THREE.Mesh(new THREE.BoxGeometry(24, 24, 24), new THREE.MeshBasicMaterial({ color: 0x080a14, side: THREE.BackSide })));
  const painel = (cor, forca, x, y, z, largura, altura) => {
    const placa = new THREE.Mesh(new THREE.PlaneGeometry(largura, altura), new THREE.MeshBasicMaterial({ color: new THREE.Color(cor).multiplyScalar(forca), side: THREE.DoubleSide }));
    placa.position.set(x, y, z);
    placa.lookAt(0, 0, 0);
    cena.add(placa);
  };
  painel('#ffffff', 7, -5, 6, 7, 7, 2.2);
  painel('#ffffff', 4, 8, 2, 3, 1.6, 9);
  painel(corDaLiga, 5, -8, -2, -1, 3, 9);
  painel(corDaLiga, 3.5, 0, -9, 5, 9, 2);
  painel('#fff1c2', 6, 3, 9, -4, 6, 2);
  painel('#ffffff', 2.5, 0, 0, -10, 10, 1);
  const gerador = new THREE.PMREMGenerator(renderizador);
  const textura = gerador.fromScene(cena, 0.02).texture;
  gerador.dispose();
  return textura;
}

function geometriaDaFaceta(pts, altura) {
  const [a, b, c] = pts.map(([x, y]) => para3d(x, y));
  const centro = new THREE.Vector2((a.x + b.x + c.x) / 3, (a.y + b.y + c.y) / 3);
  let v = [a, b, c];
  if ((b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x) < 0) v = [a, c, b];
  const topo = [0, 0, altura];
  const base = v.map((p) => [p.x - centro.x, p.y - centro.y, 0]);
  const posicoes = [];
  for (let i = 0; i < 3; i += 1) posicoes.push(...base[i], ...base[(i + 1) % 3], ...topo);
  const geometria = new THREE.BufferGeometry();
  geometria.setAttribute('position', new THREE.Float32BufferAttribute(posicoes, 3));
  geometria.computeVertexNormals();
  return { geometria, centro };
}

async function texturaDoSimbolo(svg, desfoque) {
  const imagem = new Image();
  imagem.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
  await imagem.decode();
  const tela = document.createElement('canvas');
  tela.width = 512;
  tela.height = 512;
  const ctx = tela.getContext('2d');
  if (desfoque) ctx.filter = `blur(${desfoque}px)`;
  ctx.drawImage(imagem, 0, 0, 512, 512);
  const textura = new THREE.CanvasTexture(tela);
  textura.colorSpace = THREE.SRGBColorSpace;
  return textura;
}

function suave(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function voltaSuave(t) {
  const c1 = 1.5;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
}

export async function cinema3dDaLiga(lugar, dados) {
  const renderizador = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' });
  renderizador.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderizador.toneMapping = THREE.ACESFilmicToneMapping;
  renderizador.toneMappingExposure = 0.95;
  renderizador.domElement.className = 'liga-cinema-3d';
  const brilho = document.createElement('canvas');
  brilho.className = 'liga-cinema-bloom';
  const ctxBrilho = brilho.getContext('2d');
  lugar.appendChild(renderizador.domElement);
  lugar.appendChild(brilho);

  const cena = new THREE.Scene();
  cena.background = new THREE.Color(0x04050c);
  cena.fog = new THREE.Fog(0x04050c, 7, 16);
  cena.environment = ambienteDaLiga(renderizador, dados.cor);
  const camera = new THREE.PerspectiveCamera(34, 1, 0.05, 60);
  cena.add(new THREE.AmbientLight(0xffffff, 0.25));
  const chave = new THREE.DirectionalLight(0xffffff, 2.4);
  chave.position.set(-3, 4, 5);
  cena.add(chave);
  const luzColorida = new THREE.PointLight(new THREE.Color(dados.cor), 40, 12, 2);
  luzColorida.position.set(2, -1, 2.5);
  cena.add(luzColorida);
  const luzQuente = new THREE.PointLight(0xfff1c2, 18, 10, 2);
  luzQuente.position.set(-2, 2.5, 2);
  cena.add(luzQuente);

  const emblema = new THREE.Group();
  cena.add(emblema);
  const corDoMetal = new THREE.Color(CORES_DOS_METAIS[dados.metal] || CORES_DOS_METAIS.ouro);
  const metal = new THREE.MeshStandardMaterial({ color: corDoMetal, metalness: 1, roughness: 0.18, envMapIntensity: 1.5 });
  const metalEscuro = new THREE.MeshStandardMaterial({ color: 0x1a1f2e, metalness: 0.85, roughness: 0.35 });

  const fundo = new THREE.Mesh(new THREE.ExtrudeGeometry(formaDosPontos(dados.pontos, 1), { depth: 0.12, bevelEnabled: false }), new THREE.MeshStandardMaterial({ color: new THREE.Color(dados.escuro), metalness: 0.6, roughness: 0.4 }));
  fundo.position.z = -0.14;
  emblema.add(fundo);

  const anel = formaDosPontos(dados.pontos, 1.1);
  anel.holes.push(formaDosPontos(dados.pontos, 0.985));
  const moldura = new THREE.Mesh(new THREE.ExtrudeGeometry(anel, { depth: 0.14, bevelEnabled: true, bevelThickness: 0.05, bevelSize: 0.035, bevelSegments: 3 }), metal);
  moldura.position.z = -0.06;
  emblema.add(moldura);

  const pecas = dados.facetas.map((faceta, k) => {
    const altura = 0.05 + ((k * 37) % 11) / 110;
    const { geometria, centro } = geometriaDaFaceta(faceta.pts, altura);
    const placaDeMetal = new THREE.Mesh(geometriaDaFaceta(faceta.pts, 0.03).geometria, new THREE.MeshStandardMaterial({ color: new THREE.Color(faceta.metal), metalness: 0.8, roughness: 0.48, flatShading: true, envMapIntensity: 0.35 }));
    placaDeMetal.position.set(centro.x, centro.y, -0.02);
    emblema.add(placaDeMetal);
    const cor = new THREE.Color(faceta.cor).multiplyScalar(0.78);
    const cristal = new THREE.Mesh(geometria, new THREE.MeshPhysicalMaterial({ color: cor, metalness: 0.2, roughness: 0.04, clearcoat: 1, clearcoatRoughness: 0.03, flatShading: true, emissive: cor, emissiveIntensity: 0.08, envMapIntensity: 1.8, iridescence: dados.prisma ? 0.9 : 0.25, iridescenceIOR: 1.6 }));
    const inicio = new THREE.Vector3(centro.x + faceta.dx * ESCALA * 1.4, centro.y - faceta.dy * ESCALA * 1.4, 1.2 + ((k * 53) % 17) / 6);
    const giro = new THREE.Euler(((k * 29) % 13) / 2 - 3, ((k * 41) % 11) / 2 - 2.5, (faceta.giro * Math.PI) / 180);
    cristal.position.copy(inicio);
    cristal.visible = false;
    emblema.add(cristal);
    return { cristal, inicio, giro, alvo: new THREE.Vector3(centro.x, centro.y, 0), atraso: 0.95 + faceta.atraso };
  });

  const simbolo = new THREE.Mesh(new THREE.PlaneGeometry(4, 4), new THREE.MeshBasicMaterial({ transparent: true, opacity: 0, toneMapped: false, depthWrite: false }));
  const aura = new THREE.Mesh(new THREE.PlaneGeometry(4.3, 4.3), new THREE.MeshBasicMaterial({ transparent: true, opacity: 0, blending: THREE.AdditiveBlending, toneMapped: false, depthWrite: false, color: new THREE.Color(dados.claro) }));
  simbolo.position.set(0, -0.04, 0.24);
  aura.position.set(0, -0.04, 0.22);
  emblema.add(aura, simbolo);
  texturaDoSimbolo(dados.svgDoSimbolo, 0).then((t) => { simbolo.material.map = t; simbolo.material.needsUpdate = true; }).catch(() => {});
  texturaDoSimbolo(dados.svgDoSimbolo, 14).then((t) => { aura.material.map = t; aura.material.needsUpdate = true; }).catch(() => {});

  if (dados.pedestal) {
    const haste = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.16, 0.38, 24), metal);
    haste.position.y = -1.88;
    const base = new THREE.Mesh(new THREE.CylinderGeometry(0.6, 0.72, 0.2, 48), metalEscuro);
    base.position.y = -2.16;
    const aro = new THREE.Mesh(new THREE.TorusGeometry(0.64, 0.028, 12, 64), metal);
    aro.rotation.x = Math.PI / 2;
    aro.position.y = -2.06;
    const base2 = new THREE.Mesh(new THREE.CylinderGeometry(0.86, 0.94, 0.16, 48), metalEscuro);
    base2.position.y = -2.34;
    const aro2 = new THREE.Mesh(new THREE.TorusGeometry(0.88, 0.03, 12, 64), metal);
    aro2.rotation.x = Math.PI / 2;
    aro2.position.y = -2.26;
    emblema.add(haste, base, aro, base2, aro2);
  }

  const extrudar = (forma, profundidade) => new THREE.ExtrudeGeometry(forma, { depth: profundidade, bevelEnabled: true, bevelThickness: 0.015, bevelSize: 0.012, bevelSegments: 2 });
  if (dados.asas) {
    const escala = dados.escalaDasAsas || 1;
    const encaixe = para3d(36, 92);
    dados.asas.forEach((d) => {
      const geometria = extrudar(formaDoCaminho(d), 0.05);
      const esquerda = new THREE.Mesh(geometria, new THREE.MeshStandardMaterial({ color: corDoMetal, metalness: 1, roughness: 0.22, side: THREE.DoubleSide }));
      esquerda.scale.set(escala, escala, 1);
      esquerda.position.set(encaixe.x * (1 - escala), encaixe.y * (1 - escala), -0.16);
      const direita = esquerda.clone();
      direita.scale.x = -escala;
      direita.position.x = -esquerda.position.x;
      emblema.add(esquerda, direita);
    });
  }
  if (dados.coroa) {
    const coroa = new THREE.Mesh(extrudar(formaDoCaminho(dados.coroa), 0.08), metal);
    coroa.position.z = -0.02;
    emblema.add(coroa);
  }
  if (dados.ramos) {
    const folha = new THREE.Shape();
    folha.absellipse(0, 0, 0.19, 0.07, 0, Math.PI * 2, false, 0);
    const geometriaDaFolha = extrudar(folha, 0.03);
    const curva = (lado) => new THREE.CubicBezierCurve3(...[[92, 198], [58, 196], [22, 176], [14, 124]].map(([x, y]) => { const v = para3d(lado < 0 ? x : 200 - x, y); return new THREE.Vector3(v.x, v.y, 0.04); }));
    [-1, 1].forEach((lado) => {
      const caminho = curva(lado);
      emblema.add(new THREE.Mesh(new THREE.TubeGeometry(caminho, 32, 0.025, 8, false), metal));
      for (let i = 1; i <= 7; i += 1) {
        const t = i / 7.4;
        const p = caminho.getPoint(t);
        const tangente = caminho.getTangent(t);
        const angulo = Math.atan2(tangente.y, tangente.x);
        [-1, 1].forEach((s) => {
          const f = new THREE.Mesh(geometriaDaFolha, metal);
          f.position.set(p.x + Math.cos(angulo + s * 1.2) * 0.12, p.y + Math.sin(angulo + s * 1.2) * 0.12, 0.04);
          f.rotation.z = angulo + s * 0.7;
          emblema.add(f);
        });
      }
    });
  }
  if (dados.aureola) {
    const halo = new THREE.Mesh(new THREE.TorusGeometry(2.1, 0.04, 16, 120), metal);
    halo.position.z = -0.25;
    emblema.add(halo);
  }

  const contorno = dados.pontos.map(([x, y]) => { const v = para3d(x, y).multiplyScalar(1.04); return new THREE.Vector3(v.x, v.y, 0.12); });
  const caminhoDaEnergia = new THREE.CatmullRomCurve3(contorno, true, 'catmullrom', 0.02);
  const texturaDaLuz = texturaRedonda(dados.claro);
  const rastro = Array.from({ length: 14 }, (_, i) => {
    const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: texturaDaLuz, blending: THREE.AdditiveBlending, transparent: true, depthWrite: false, toneMapped: false, opacity: 0 }));
    const tamanho = i === 0 ? 0.6 : 0.42 - i * 0.022;
    sprite.scale.set(tamanho, tamanho, 1);
    emblema.add(sprite);
    return sprite;
  });

  const poeira = new THREE.BufferGeometry();
  const posicoesDaPoeira = new Float32Array(240 * 3);
  for (let i = 0; i < 240; i += 1) {
    posicoesDaPoeira[i * 3] = (Math.random() - 0.5) * 9;
    posicoesDaPoeira[i * 3 + 1] = (Math.random() - 0.5) * 7;
    posicoesDaPoeira[i * 3 + 2] = (Math.random() - 0.3) * 6;
  }
  poeira.setAttribute('position', new THREE.BufferAttribute(posicoesDaPoeira, 3));
  const pontosDePoeira = new THREE.Points(poeira, new THREE.PointsMaterial({ size: 0.05, map: texturaRedonda(dados.claro), transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, opacity: 0.7, toneMapped: false }));
  cena.add(pontosDePoeira);
  const rosacea = new THREE.Mesh(new THREE.PlaneGeometry(8, 8), new THREE.MeshBasicMaterial({ transparent: true, opacity: 0.5, toneMapped: false, depthWrite: false, fog: false }));
  rosacea.position.set(0, 0.5, -4.5);
  cena.add(rosacea);
  if (dados.svgDaRosacea) texturaDoSimbolo(dados.svgDaRosacea, 0).then((t) => { rosacea.material.map = t; rosacea.material.needsUpdate = true; }).catch(() => {});

  const posicoes = new THREE.CatmullRomCurve3([new THREE.Vector3(-1.3, 1.6, 1.6), new THREE.Vector3(-0.3, 0.9, 1.9), new THREE.Vector3(0.8, -0.4, 2.2), new THREE.Vector3(0.4, 0.0, 4.6), new THREE.Vector3(0, -0.15, 7.4)]);
  const alvos = new THREE.CatmullRomCurve3([new THREE.Vector3(-0.8, 0.9, 0), new THREE.Vector3(0, 0.5, 0), new THREE.Vector3(0.3, -0.3, 0), new THREE.Vector3(0.1, -0.2, 0), new THREE.Vector3(0, -0.3, 0)]);

  const medir = () => {
    const largura = lugar.clientWidth || window.innerWidth;
    const altura = lugar.clientHeight || window.innerHeight;
    renderizador.setSize(largura, altura, false);
    renderizador.domElement.style.width = '100%';
    renderizador.domElement.style.height = '100%';
    brilho.width = Math.max(1, Math.round(largura / 3));
    brilho.height = Math.max(1, Math.round(altura / 3));
    camera.aspect = largura / altura;
    camera.fov = largura < altura ? 40 : 30;
    camera.updateProjectionMatrix();
  };
  medir();
  window.addEventListener('resize', medir);

  const inicio = performance.now();
  let parado = false;
  const alvo = new THREE.Vector3();
  const quadro = (agora) => {
    if (parado || !lugar.isConnected) { parar(); return; }
    const t = Math.max(0, (agora - inicio) / 1000);
    const caminho = suave(Math.min(1, t / 3.1));
    camera.position.copy(posicoes.getPoint(caminho));
    alvos.getPoint(caminho, alvo);
    camera.lookAt(alvo);
    emblema.rotation.y = -0.38 * (1 - caminho) + Math.sin(t * 1.3) * 0.06 * caminho;
    emblema.rotation.x = 0.12 * (1 - caminho);
    pecas.forEach((p) => {
      const fase = (t - p.atraso) / 0.8;
      if (fase <= 0) { p.cristal.visible = false; return; }
      p.cristal.visible = true;
      const e = voltaSuave(Math.min(1, fase));
      p.cristal.position.lerpVectors(p.inicio, p.alvo, Math.min(1.05, e));
      p.cristal.rotation.set(p.giro.x * (1 - e), p.giro.y * (1 - e), p.giro.z * (1 - e));
      const s = 0.3 + 0.7 * Math.min(1, e);
      p.cristal.scale.set(s, s, s);
    });
    const corrida = t < 0.15 ? -1 : ((t - 0.15) / 1.4);
    rastro.forEach((sprite, i) => {
      if (corrida < 0 || corrida > 2) { sprite.material.opacity = 0; return; }
      const u = (((corrida % 1) - i * 0.012) + 1) % 1;
      caminhoDaEnergia.getPoint(u, sprite.position);
      sprite.material.opacity = (1 - i / rastro.length) * (corrida > 1.85 ? (2 - corrida) / 0.15 : 1);
    });
    const simboloFase = Math.max(0, Math.min(1, (t - 2.2) / 0.5));
    simbolo.material.opacity = simboloFase;
    aura.material.opacity = simboloFase * (0.7 + Math.sin(t * 6) * 0.15);
    luzColorida.position.set(Math.cos(t * 1.4) * 2.6, Math.sin(t * 0.9) * 1.6, 2.4);
    luzColorida.intensity = 8 + 32 * Math.min(1, t / 1.4);
    pontosDePoeira.rotation.y = t * 0.03;
    pontosDePoeira.position.y = t * 0.05;
    renderizador.render(cena, camera);
    try {
      ctxBrilho.clearRect(0, 0, brilho.width, brilho.height);
      ctxBrilho.drawImage(renderizador.domElement, 0, 0, brilho.width, brilho.height);
    } catch (e) {
    }
    requestAnimationFrame(quadro);
  };
  function parar() {
    if (parado) return;
    parado = true;
    window.removeEventListener('resize', medir);
    cena.traverse((obj) => {
      if (obj.geometry) obj.geometry.dispose();
      if (obj.material) [].concat(obj.material).forEach((m) => { if (m.map) m.map.dispose(); m.dispose(); });
    });
    if (cena.environment) cena.environment.dispose();
    renderizador.dispose();
    renderizador.forceContextLoss();
  }
  renderizador.compile(cena, camera);
  requestAnimationFrame(quadro);
  return { parar };
}
