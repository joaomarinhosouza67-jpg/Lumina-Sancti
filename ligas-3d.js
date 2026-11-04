import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.min.js';

const ESCALA = 1 / 50;
const CORES_DOS_METAIS = { bronze: '#c98a52', prata: '#dfe5ee', ouro: '#f2c35a', real: '#ffe08a', platina: '#eef3fa' };

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

function texturaDeCanvas(largura, altura, desenhar) {
  const tela = document.createElement('canvas');
  tela.width = largura;
  tela.height = altura;
  desenhar(tela.getContext('2d'), largura, altura);
  const textura = new THREE.CanvasTexture(tela);
  textura.colorSpace = THREE.SRGBColorSpace;
  return textura;
}

function texturaRedonda(cor) {
  return texturaDeCanvas(64, 64, (ctx) => {
    const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    grad.addColorStop(0, '#ffffff');
    grad.addColorStop(0.25, cor);
    grad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 64, 64);
  });
}

function texturaDeAnel(cor) {
  return texturaDeCanvas(256, 256, (ctx) => {
    const grad = ctx.createRadialGradient(128, 128, 60, 128, 128, 128);
    grad.addColorStop(0, 'rgba(255,255,255,0)');
    grad.addColorStop(0.72, 'rgba(255,255,255,0)');
    grad.addColorStop(0.86, cor);
    grad.addColorStop(0.9, '#ffffff');
    grad.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 256, 256);
  });
}

function texturaDeNuvem() {
  return texturaDeCanvas(256, 256, (ctx) => {
    for (let i = 0; i < 9; i += 1) {
      const x = 60 + Math.random() * 136;
      const y = 80 + Math.random() * 96;
      const r = 40 + Math.random() * 50;
      const grad = ctx.createRadialGradient(x, y, 0, x, y, r);
      grad.addColorStop(0, 'rgba(255,248,232,0.55)');
      grad.addColorStop(1, 'rgba(255,248,232,0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 256, 256);
    }
  });
}

function texturaDeRaio() {
  return texturaDeCanvas(64, 256, (ctx) => {
    const lado = ctx.createLinearGradient(0, 0, 64, 0);
    lado.addColorStop(0, 'rgba(255,240,200,0)');
    lado.addColorStop(0.5, 'rgba(255,248,225,1)');
    lado.addColorStop(1, 'rgba(255,240,200,0)');
    ctx.fillStyle = lado;
    ctx.fillRect(0, 0, 64, 256);
    ctx.globalCompositeOperation = 'destination-in';
    const cima = ctx.createLinearGradient(0, 0, 0, 256);
    cima.addColorStop(0, 'rgba(0,0,0,1)');
    cima.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = cima;
    ctx.fillRect(0, 0, 64, 256);
  });
}

function ambienteDaLiga(renderizador, corDaLiga, tema) {
  const cena = new THREE.Scene();
  cena.add(new THREE.Mesh(new THREE.BoxGeometry(24, 24, 24), new THREE.MeshBasicMaterial({ color: 0x080a14, side: THREE.BackSide })));
  const painel = (cor, forca, x, y, z, largura, altura) => {
    const placa = new THREE.Mesh(new THREE.PlaneGeometry(largura, altura), new THREE.MeshBasicMaterial({ color: new THREE.Color(cor).multiplyScalar(forca), side: THREE.DoubleSide }));
    placa.position.set(x, y, z);
    placa.lookAt(0, 0, 0);
    cena.add(placa);
  };
  const quente = tema === 'arquiteto' ? '#7ff6ff' : '#fff1c2';
  painel('#ffffff', 7, -5, 6, 7, 7, 2.2);
  painel('#ffffff', 4, 8, 2, 3, 1.6, 9);
  painel(corDaLiga, 5, -8, -2, -1, 3, 9);
  painel(corDaLiga, 3.5, 0, -9, 5, 9, 2);
  painel(quente, 6, 3, 9, -4, 6, 2);
  painel('#ffffff', 2.5, 0, 0, -10, 10, 1);
  if (tema === 'celestial' || tema === 'fundador') { painel('#ffe7a8', 8, 0, 10, 2, 8, 3); painel('#ffd1f0', 3, 8, -3, -3, 2, 6); }
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
  return texturaDeCanvas(512, 512, (ctx) => {
    if (desfoque) ctx.filter = `blur(${desfoque}px)`;
    ctx.drawImage(imagem, 0, 0, 512, 512);
  });
}

function suave(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function saida(t) {
  return 1 - Math.pow(1 - t, 3);
}

function voltaSuave(t) {
  const c1 = 1.5;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
}

function faixa(t, a, b) {
  return Math.max(0, Math.min(1, (t - a) / (b - a)));
}

export async function cinema3dDaLiga(lugar, dados) {
  const tema = dados.tema || 'normal';
  const especial = tema === 'celestial' || tema === 'arquiteto' || tema === 'fundador';
  const atrasoDosCristais = especial ? 1.45 : 0;
  const impacto = dados.impacto || (especial ? 4.35 : 2.45);
  const fimDoCaminho = especial ? 5.9 : 3.1;
  const giro = especial ? [4.6, 5.6] : [2.55, 3.35];
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
  const fundoDaCena = { celestial: 0x0c0a1e, fundador: 0x12060a, arquiteto: 0x02060e, empireo: 0x03031a }[tema] || 0x04050c;
  cena.background = new THREE.Color(fundoDaCena);
  cena.fog = new THREE.Fog(fundoDaCena, 7, 18);
  cena.environment = ambienteDaLiga(renderizador, dados.cor, tema);
  const camera = new THREE.PerspectiveCamera(34, 1, 0.05, 80);
  cena.add(new THREE.AmbientLight(0xffffff, 0.25));
  const chave = new THREE.DirectionalLight(0xffffff, 2.4);
  chave.position.set(-3, 4, 5);
  cena.add(chave);
  const luzColorida = new THREE.PointLight(new THREE.Color(dados.cor), 40, 12, 2);
  luzColorida.position.set(2, -1, 2.5);
  cena.add(luzColorida);
  const luzQuente = new THREE.PointLight(tema === 'arquiteto' ? 0x7ff6ff : 0xfff1c2, 18, 10, 2);
  luzQuente.position.set(-2, 2.5, 2);
  cena.add(luzQuente);

  const suporte = new THREE.Group();
  const emblema = new THREE.Group();
  suporte.add(emblema);
  cena.add(suporte);
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

  const materialDasArestas = dados.arestas ? new THREE.LineBasicMaterial({ color: new THREE.Color(dados.arestas), transparent: true, opacity: 0, blending: THREE.AdditiveBlending, toneMapped: false }) : null;
  const pecas = dados.facetas.map((faceta, k) => {
    const altura = 0.05 + ((k * 37) % 11) / 110;
    const { geometria, centro } = geometriaDaFaceta(faceta.pts, altura);
    const placaDeMetal = new THREE.Mesh(geometriaDaFaceta(faceta.pts, 0.03).geometria, new THREE.MeshStandardMaterial({ color: new THREE.Color(faceta.metal), metalness: 0.8, roughness: 0.48, flatShading: true, envMapIntensity: 0.35 }));
    placaDeMetal.position.set(centro.x, centro.y, -0.02);
    emblema.add(placaDeMetal);
    const cor = new THREE.Color(faceta.cor).multiplyScalar(dados.prisma ? 0.92 : 0.78);
    const cristal = new THREE.Mesh(geometria, new THREE.MeshPhysicalMaterial({ color: cor, metalness: dados.arestas ? 0.5 : 0.2, roughness: 0.04, clearcoat: 1, clearcoatRoughness: 0.03, flatShading: true, emissive: cor, emissiveIntensity: 0.08, envMapIntensity: dados.arestas ? 2.4 : 1.8, iridescence: dados.prisma ? 0.9 : 0.25, iridescenceIOR: 1.6 }));
    if (materialDasArestas) cristal.add(new THREE.LineSegments(new THREE.EdgesGeometry(geometria, 1), materialDasArestas));
    const inicio = new THREE.Vector3(centro.x + faceta.dx * ESCALA * 1.4, centro.y - faceta.dy * ESCALA * 1.4, 1.2 + ((k * 53) % 17) / 6);
    const rodada = new THREE.Euler(((k * 29) % 13) / 2 - 3, ((k * 41) % 11) / 2 - 2.5, (faceta.giro * Math.PI) / 180);
    cristal.position.copy(inicio);
    cristal.visible = false;
    emblema.add(cristal);
    return { cristal, inicio, rodada, alvo: new THREE.Vector3(centro.x, centro.y, 0), atraso: 0.95 + faceta.atraso + atrasoDosCristais };
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
  const asas = [];
  if (dados.asas) {
    const escala = dados.escalaDasAsas || 1;
    const encaixe = para3d(36, 92);
    const materialDaAsa = new THREE.MeshStandardMaterial({ color: corDoMetal, metalness: 1, roughness: 0.22, side: THREE.DoubleSide, envMapIntensity: 1.5 });
    [-1, 1].forEach((lado) => {
      const grupo = new THREE.Group();
      grupo.position.set(lado < 0 ? encaixe.x : -encaixe.x, encaixe.y, -0.16);
      grupo.scale.set(lado < 0 ? escala : -escala, escala, 1);
      dados.asas.forEach((d) => {
        const pena = new THREE.Mesh(extrudar(formaDoCaminho(d), 0.05), materialDaAsa);
        pena.position.set(-encaixe.x, -encaixe.y, 0);
        grupo.add(pena);
      });
      grupo.userData.lado = lado;
      emblema.add(grupo);
      asas.push(grupo);
    });
  }
  const veludo = new THREE.MeshPhysicalMaterial({ color: 0x8c1027, roughness: 0.6, sheen: 1, sheenRoughness: 0.32, sheenColor: new THREE.Color(0xff7a92), side: THREE.DoubleSide, envMapIntensity: 0.55 });
  if (dados.coroa) {
    const coroa = new THREE.Group();
    coroa.add(new THREE.Mesh(extrudar(formaDoCaminho(dados.coroa), 0.08), metal));
    if (dados.gorro) {
      const gorro = new THREE.Mesh(extrudar(formaDoCaminho(dados.gorro), 0.05), veludo);
      gorro.position.z = -0.05;
      const aro = new THREE.Mesh(extrudar(formaDoCaminho('M74 16 H126 V20 H74 Z'), 0.1), metal);
      const globo = new THREE.Mesh(new THREE.SphereGeometry(0.065, 24, 16), metal);
      const p = para3d(100, -16);
      globo.position.set(p.x, p.y, 0.04);
      const cruzV = new THREE.Mesh(new THREE.BoxGeometry(0.035, 0.17, 0.035), metal);
      cruzV.position.set(p.x, p.y + 0.15, 0.04);
      const cruzH = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.035, 0.035), metal);
      cruzH.position.set(p.x, p.y + 0.17, 0.04);
      coroa.add(gorro, aro, globo, cruzV, cruzH);
      const centro = para3d(100, 14);
      coroa.scale.set(1.5, 1.5, 1.5);
      coroa.position.set(centro.x * -0.5, centro.y * -0.5, 0);
    }
    coroa.position.z = -0.02;
    emblema.add(coroa);
  }
  const mantos = [];
  if (dados.manto) {
    const arminho = new THREE.MeshPhysicalMaterial({ color: 0xf7f2ea, roughness: 0.92, sheen: 1, sheenRoughness: 0.6, sheenColor: new THREE.Color(0xffffff), side: THREE.DoubleSide });
    const pintas = new THREE.MeshStandardMaterial({ color: 0x1b1018, roughness: 0.7 });
    [-1, 1].forEach((lado) => {
      const grupo = new THREE.Group();
      const pano = new THREE.Mesh(extrudar(formaDoCaminho(dados.manto[0]), 0.05), veludo);
      const forro = new THREE.Mesh(extrudar(formaDoCaminho(dados.manto[1]), 0.02), arminho);
      forro.position.z = 0.06;
      grupo.add(pano, forro);
      for (let i = 0; i < 9; i += 1) {
        const v = para3d(20 + (i % 3) * 22 + (Math.floor(i / 3) % 2) * 10, 75 + Math.floor(i / 3) * 40);
        const pinta = new THREE.Mesh(new THREE.ConeGeometry(0.035, 0.13, 4), pintas);
        pinta.position.set(v.x, v.y, 0.1);
        grupo.add(pinta);
      }
      grupo.scale.x = lado;
      grupo.position.z = -0.42;
      grupo.userData.lado = lado;
      emblema.add(grupo);
      mantos.push(grupo);
    });
  }
  if (dados.cetros) {
    [-1, 1].forEach((lado) => {
      const a = para3d(lado < 0 ? 16 : 184, 214);
      const b = para3d(lado < 0 ? 184 : 16, -10);
      const comprimento = Math.hypot(b.x - a.x, b.y - a.y);
      const z = -0.3 + lado * 0.04;
      const haste = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.065, comprimento, 20), metal);
      haste.position.set((a.x + b.x) / 2, (a.y + b.y) / 2, z);
      haste.rotation.z = Math.atan2(b.y - a.y, b.x - a.x) - Math.PI / 2;
      const globo = new THREE.Mesh(new THREE.SphereGeometry(0.18, 32, 20), metal);
      globo.position.set(b.x, b.y, z);
      const cruzV = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.3, 0.06), metal);
      cruzV.position.set(b.x, b.y + 0.3, z);
      const cruzH = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.06, 0.06), metal);
      cruzH.position.set(b.x, b.y + 0.34, z);
      emblema.add(haste, globo, cruzV, cruzH);
    });
  }
  const torres = [];
  if (dados.torres) {
    const janela = new THREE.MeshBasicMaterial({ color: 0x5ff3ff, toneMapped: false });
    [-1, 1].forEach((lado) => {
      const grupo = new THREE.Group();
      grupo.add(new THREE.Mesh(extrudar(formaDoCaminho(dados.torres), 0.2), metal));
      [[8, 106], [8, 142]].forEach(([x, y]) => {
        const v = para3d(x, y);
        const vidro = new THREE.Mesh(new THREE.PlaneGeometry(0.15, 0.38), janela);
        vidro.position.set(v.x, v.y, 0.24);
        grupo.add(vidro);
      });
      const ponta = para3d(8, 30);
      const cruzV = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.3, 0.04), metal);
      cruzV.position.set(ponta.x, ponta.y, 0.1);
      const cruzH = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.04, 0.04), metal);
      cruzH.position.set(ponta.x, ponta.y + 0.05, 0.1);
      grupo.add(cruzV, cruzH);
      grupo.scale.x = lado;
      grupo.position.z = -0.24;
      emblema.add(grupo);
      torres.push(grupo);
    });
  }
  const aneis = [];
  if (dados.anelHolografico || dados.aureolaDupla) {
    const corDoAnel = dados.anelHolografico ? 0x5ff3ff : corDoMetal;
    [[2.4, 0.016], [2.27, 0.008]].forEach(([raio, grossura], i) => {
      const anelDeLuz = new THREE.Mesh(new THREE.TorusGeometry(raio, grossura, 8, 160), new THREE.MeshBasicMaterial({ color: corDoAnel, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, toneMapped: false, depthWrite: false }));
      anelDeLuz.position.z = -0.32;
      anelDeLuz.userData.sentido = i ? -1 : 1;
      emblema.add(anelDeLuz);
      aneis.push(anelDeLuz);
    });
  }
  const estrelas = [];
  if (dados.estrelasEmOrbita) {
    const texturaDaEstrela = texturaRedonda('#ffffff');
    for (let i = 0; i < 12; i += 1) {
      const estrela = new THREE.Sprite(new THREE.SpriteMaterial({ map: texturaDaEstrela, blending: THREE.AdditiveBlending, transparent: true, depthWrite: false, toneMapped: false, opacity: 0, color: new THREE.Color().setHSL(i / 12, 0.9, 0.82) }));
      estrela.userData.angulo = (i / 12) * Math.PI * 2;
      estrela.userData.fase = i * 0.7;
      emblema.add(estrela);
      estrelas.push(estrela);
    }
  }
  const nuvensDaBase = [];
  if (dados.nuvensNaBase) {
    const texturaDaNuvemDaBase = texturaDeCanvas(128, 128, (ctx) => {
      const grad = ctx.createRadialGradient(54, 50, 4, 64, 64, 62);
      grad.addColorStop(0, 'rgba(255,255,255,1)');
      grad.addColorStop(0.55, 'rgba(246,240,255,0.95)');
      grad.addColorStop(0.85, 'rgba(214,200,246,0.55)');
      grad.addColorStop(1, 'rgba(214,200,246,0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 128, 128);
    });
    dados.nuvensNaBase.forEach(([x, y, r], i) => {
      const v = para3d(x, y);
      const nuvem = new THREE.Sprite(new THREE.SpriteMaterial({ map: texturaDaNuvemDaBase, transparent: true, depthWrite: false, opacity: 0 }));
      nuvem.scale.setScalar((r * 2.6) * ESCALA);
      nuvem.position.set(v.x, v.y, 0.3 + (i % 3) * 0.04);
      nuvem.userData.y0 = v.y;
      nuvem.userData.fase = i * 0.9;
      emblema.add(nuvem);
      nuvensDaBase.push(nuvem);
    });
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
  let halo = null;
  let brilhoDoHalo = null;
  if (dados.aureola) {
    halo = new THREE.Mesh(new THREE.TorusGeometry(2.1, 0.045, 16, 120), new THREE.MeshStandardMaterial({ color: corDoMetal, metalness: 1, roughness: 0.2, emissive: corDoMetal, emissiveIntensity: especial ? 0 : 0.4, envMapIntensity: 1.5 }));
    halo.position.z = -0.25;
    brilhoDoHalo = new THREE.Sprite(new THREE.SpriteMaterial({ map: texturaDeAnel('#fff1c2'), blending: THREE.AdditiveBlending, transparent: true, depthWrite: false, toneMapped: false, opacity: especial ? 0 : 0.35 }));
    brilhoDoHalo.scale.set(5.6, 5.6, 1);
    brilhoDoHalo.position.z = -0.3;
    emblema.add(halo, brilhoDoHalo);
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

  const quantasLuzes = especial ? 420 : 240;
  const poeira = new THREE.BufferGeometry();
  const posicoesDaPoeira = new Float32Array(quantasLuzes * 3);
  for (let i = 0; i < quantasLuzes; i += 1) {
    posicoesDaPoeira[i * 3] = (Math.random() - 0.5) * 10;
    posicoesDaPoeira[i * 3 + 1] = (Math.random() - 0.5) * 9;
    posicoesDaPoeira[i * 3 + 2] = (Math.random() - 0.3) * 6;
  }
  poeira.setAttribute('position', new THREE.BufferAttribute(posicoesDaPoeira, 3));
  const corDaPoeira = tema === 'arquiteto' ? '#7ff6ff' : (tema === 'celestial' || tema === 'fundador' ? '#ffe7a8' : dados.claro);
  const pontosDePoeira = new THREE.Points(poeira, new THREE.PointsMaterial({ size: especial ? 0.06 : 0.05, map: texturaRedonda(corDaPoeira), transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, opacity: 0.75, toneMapped: false }));
  cena.add(pontosDePoeira);
  if (tema !== 'arquiteto') {
    const rosacea = new THREE.Mesh(new THREE.PlaneGeometry(8, 8), new THREE.MeshBasicMaterial({ transparent: true, opacity: especial ? 0.32 : 0.5, toneMapped: false, depthWrite: false, fog: false }));
    rosacea.position.set(0, 0.5, -4.5);
    cena.add(rosacea);
    if (dados.svgDaRosacea) texturaDoSimbolo(dados.svgDaRosacea, 0).then((t) => { rosacea.material.map = t; rosacea.material.needsUpdate = true; }).catch(() => {});
  }

  const onda = new THREE.Sprite(new THREE.SpriteMaterial({ map: texturaDeAnel(dados.claro), blending: THREE.AdditiveBlending, transparent: true, depthWrite: false, toneMapped: false, opacity: 0 }));
  onda.position.z = 0.3;
  cena.add(onda);

  const nuvens = [];
  const raios = [];
  if (tema === 'celestial' || tema === 'fundador') {
    const texturaDaNuvem = texturaDeNuvem();
    for (let i = 0; i < 16; i += 1) {
      const nuvem = new THREE.Sprite(new THREE.SpriteMaterial({ map: texturaDaNuvem, transparent: true, depthWrite: false, opacity: 0.9, color: tema === 'fundador' ? 0xffd9c2 : 0xfff6e8 }));
      const lado = i % 2 === 0 ? -1 : 1;
      const x = lado * (0.2 + Math.random() * 1.6);
      nuvem.position.set(x, -1.5 + Math.random() * 4, 1 + Math.random() * 2.5);
      const tamanho = 3 + Math.random() * 3;
      nuvem.scale.set(tamanho, tamanho * 0.7, 1);
      nuvem.userData = { lado, x0: x, velocidade: 3 + Math.random() * 3 };
      cena.add(nuvem);
      nuvens.push(nuvem);
    }
    const texturaDoRaio = texturaDeRaio();
    for (let i = 0; i < 7; i += 1) {
      const raio = new THREE.Mesh(new THREE.PlaneGeometry(1.1 + Math.random() * 0.8, 14), new THREE.MeshBasicMaterial({ map: texturaDoRaio, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false, side: THREE.DoubleSide, color: tema === 'fundador' ? 0xffc27a : 0xfff3d6 }));
      raio.position.set(-3 + i, 4.5, -1.5);
      raio.rotation.z = (i - 3) * 0.12;
      raio.userData = { fase: Math.random() * 6 };
      cena.add(raio);
      raios.push(raio);
    }
  }
  let grade = null;
  let codigo = null;
  if (tema === 'arquiteto') {
    grade = new THREE.GridHelper(16, 32, 0x5ff3ff, 0x1d6f80);
    grade.position.y = -2.45;
    grade.material.transparent = true;
    grade.material.opacity = 0;
    cena.add(grade);
    const pontos = new Float32Array(200 * 3);
    for (let i = 0; i < 200; i += 1) {
      const a = Math.random() * Math.PI * 2;
      const r = 2.4 + Math.random() * 1.4;
      pontos[i * 3] = Math.cos(a) * r;
      pontos[i * 3 + 1] = -2 + Math.random() * 4.5;
      pontos[i * 3 + 2] = Math.sin(a) * r;
    }
    const geometria = new THREE.BufferGeometry();
    geometria.setAttribute('position', new THREE.BufferAttribute(pontos, 3));
    codigo = new THREE.Points(geometria, new THREE.PointsMaterial({ size: 0.07, map: texturaRedonda('#5ff3ff'), transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, opacity: 0, toneMapped: false }));
    cena.add(codigo);
  }

  const caminhos = {
    normal: [[[-1.3, 1.6, 1.6], [-0.3, 0.9, 1.9], [0.8, -0.4, 2.2], [0.4, 0.0, 4.6], [0, -0.15, 7.4]], [[-0.8, 0.9, 0], [0, 0.5, 0], [0.3, -0.3, 0], [0.1, -0.2, 0], [0, -0.3, 0]]],
    celestial: [[[0, -2.4, 7.4], [0.1, -0.6, 5.8], [-1.1, 1.0, 2.4], [0.9, -0.4, 2.6], [0, -0.15, 7.8]], [[0, 2.4, 0], [0, 0.8, 0], [-0.5, 0.6, 0], [0.3, -0.2, 0], [0, -0.3, 0]]],
    arquiteto: [[[0, -1.6, 7.8], [0.3, -1.0, 5.6], [-1.0, 1.0, 2.4], [0.9, -0.4, 2.6], [0, -0.15, 7.8]], [[0, -2.2, 0], [0, -0.6, 0], [-0.5, 0.6, 0], [0.3, -0.2, 0], [0, -0.3, 0]]],
  };
  const escolhido = caminhos[tema === 'fundador' ? 'celestial' : tema] || caminhos.normal;
  const posicoes = new THREE.CatmullRomCurve3(escolhido[0].map((p) => new THREE.Vector3(...p)));
  const alvos = new THREE.CatmullRomCurve3(escolhido[1].map((p) => new THREE.Vector3(...p)));

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
    const caminho = suave(Math.min(1, t / fimDoCaminho));
    camera.position.copy(posicoes.getPoint(caminho));
    alvos.getPoint(caminho, alvo);
    const tremor = faixa(t, impacto, impacto + 0.5);
    if (tremor > 0 && tremor < 1) {
      const forca = (1 - tremor) * 0.06;
      camera.position.x += (Math.random() - 0.5) * forca;
      camera.position.y += (Math.random() - 0.5) * forca;
    }
    camera.lookAt(alvo);
    if (tema === 'celestial' || tema === 'fundador') suporte.position.y = 4.6 * (1 - saida(faixa(t, 0.5, 1.9)));
    else if (tema === 'arquiteto') suporte.position.y = -4.6 * (1 - saida(faixa(t, 0.5, 1.9)));
    const voltas = suave(faixa(t, giro[0], giro[1])) * Math.PI * 2;
    emblema.rotation.y = -0.38 * (1 - caminho) + Math.sin(t * 1.3) * 0.06 * caminho + voltas;
    emblema.rotation.x = 0.12 * (1 - caminho);
    asas.forEach((grupo) => {
      const aberta = especial ? saida(faixa(t, 2.0, 2.9)) : 1;
      grupo.rotation.z = grupo.userData.lado < 0 ? -1.05 * (1 - aberta) : 1.05 * (1 - aberta);
    });
    mantos.forEach((grupo) => {
      const aberto = saida(faixa(t, 1.9, 3.0));
      grupo.rotation.y = -grupo.userData.lado * 1.35 * (1 - aberto);
    });
    torres.forEach((grupo) => {
      const sobe = saida(faixa(t, 1.9, 3.1));
      grupo.position.y = -3.2 * (1 - sobe);
    });
    aneis.forEach((anelDeLuz) => {
      anelDeLuz.material.opacity = faixa(t, impacto - 0.4, impacto + 0.2) * (0.6 + Math.sin(t * 3 + anelDeLuz.userData.sentido) * 0.2);
      anelDeLuz.rotation.z = t * 0.25 * anelDeLuz.userData.sentido;
    });
    estrelas.forEach((estrela) => {
      const angulo = estrela.userData.angulo + t * 0.35;
      estrela.position.set(Math.cos(angulo) * 2.5, Math.sin(angulo) * 2.5, -0.2);
      const pisca = 0.55 + Math.sin(t * 4 + estrela.userData.fase) * 0.45;
      estrela.material.opacity = faixa(t, impacto - 0.2, impacto + 0.6) * pisca;
      estrela.scale.setScalar(0.18 + pisca * 0.16);
    });
    nuvensDaBase.forEach((nuvem) => {
      nuvem.material.opacity = faixa(t, 1.6, 2.6) * 0.96;
      nuvem.position.y = nuvem.userData.y0 + Math.sin(t * 0.9 + nuvem.userData.fase) * 0.03;
    });
    pecas.forEach((p) => {
      const fase = (t - p.atraso) / 0.8;
      if (fase <= 0) { p.cristal.visible = false; return; }
      p.cristal.visible = true;
      const e = voltaSuave(Math.min(1, fase));
      p.cristal.position.lerpVectors(p.inicio, p.alvo, Math.min(1.05, e));
      p.cristal.rotation.set(p.rodada.x * (1 - e), p.rodada.y * (1 - e), p.rodada.z * (1 - e));
      const s = 0.3 + 0.7 * Math.min(1, e);
      p.cristal.scale.set(s, s, s);
    });
    if (materialDasArestas) materialDasArestas.opacity = faixa(t, 1.2 + atrasoDosCristais, 2.6 + atrasoDosCristais) * (0.75 + Math.sin(t * 7) * 0.2);
    const comecoDaEnergia = 0.15 + (especial ? 1.0 : 0);
    const corrida = t < comecoDaEnergia ? -1 : ((t - comecoDaEnergia) / 1.4);
    rastro.forEach((sprite, i) => {
      if (corrida < 0 || corrida > 2) { sprite.material.opacity = 0; return; }
      const u = (((corrida % 1) - i * 0.012) + 1) % 1;
      caminhoDaEnergia.getPoint(u, sprite.position);
      sprite.material.opacity = (1 - i / rastro.length) * (corrida > 1.85 ? (2 - corrida) / 0.15 : 1);
    });
    const simboloFase = faixa(t, 2.2 + atrasoDosCristais, 2.7 + atrasoDosCristais);
    simbolo.material.opacity = simboloFase;
    aura.material.opacity = simboloFase * (0.7 + Math.sin(t * 6) * 0.15);
    if (halo && especial) {
      const aceso = faixa(t, impacto - 0.6, impacto);
      halo.material.emissiveIntensity = aceso * 2.2;
      brilhoDoHalo.material.opacity = aceso * (0.75 + Math.sin(t * 5) * 0.2);
      brilhoDoHalo.scale.setScalar(5.2 + aceso * 0.8);
    }
    const ondaFase = faixa(t, impacto, impacto + 0.9);
    onda.material.opacity = ondaFase > 0 && ondaFase < 1 ? (1 - ondaFase) * 0.9 : 0;
    onda.scale.setScalar(0.4 + ondaFase * 8);
    nuvens.forEach((nuvem) => {
      const abre = saida(faixa(t, 0.1, 1.8));
      nuvem.position.x = nuvem.userData.x0 + nuvem.userData.lado * abre * nuvem.userData.velocidade;
      nuvem.material.opacity = 0.9 * (1 - faixa(t, 1.2, 2.2));
    });
    raios.forEach((raio) => {
      raio.material.opacity = faixa(t, 0.2, 1.3) * (0.35 + Math.sin(t * 1.6 + raio.userData.fase) * 0.12) * (1 - faixa(t, 5.6, 6.3) * 0.6);
      raio.rotation.z += 0.0008;
    });
    if (grade) grade.material.opacity = faixa(t, 0, 0.9) * 0.55 * (1 - faixa(t, 5.4, 6.2) * 0.7);
    if (codigo) {
      codigo.material.opacity = faixa(t, 0.6, 1.6) * 0.9;
      codigo.rotation.y = t * 0.6;
    }
    luzColorida.position.set(Math.cos(t * 1.4) * 2.6, Math.sin(t * 0.9) * 1.6, 2.4);
    luzColorida.intensity = 8 + 32 * Math.min(1, t / (especial ? 3 : 1.4));
    pontosDePoeira.rotation.y = t * 0.03;
    pontosDePoeira.position.y = (tema === 'celestial' || tema === 'fundador' ? 0.25 : 0.05) * t;
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
