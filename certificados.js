const ESTRELA_DO_CERTIFICADO = 'M50 0 C52 35 65 48 100 50 C65 52 52 65 50 100 C48 65 35 52 0 50 C35 48 48 35 50 0 Z';
const certificadosDosPerfis = {};
let contadorDosCertificados = 0;

function trDoCertificado(texto, valores) {
  return typeof tr === 'function' ? tr(texto, valores) : String(texto).replace(/\{(\w+)\}/g, (_, k) => (valores && valores[k] !== undefined ? valores[k] : ''));
}

function escaparDoCertificado(texto) {
  return String(texto == null ? '' : texto).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

function idiomaDoCertificado() {
  try { return typeof localDoIdioma === 'function' ? localDoIdioma() : 'pt-BR'; } catch (e) { return 'pt-BR'; }
}

function dataDoCertificado(iso) {
  const d = iso ? new Date(iso) : new Date();
  if (Number.isNaN(d.getTime())) return '';
  return d.toLocaleDateString(idiomaDoCertificado(), { day: 'numeric', month: 'long', year: 'numeric' });
}

function esperarDoCertificado(ms) { return new Promise((ok) => setTimeout(ok, ms)); }

function perfilDoCertificado() {
  const membro = (typeof membroAtivo !== 'undefined' && membroAtivo) || (typeof obterMembroAtivo === 'function' ? obterMembroAtivo() : null);
  return membro && membro.id ? membro : null;
}

function estrelaDoCertificado(cx, cy, tamanho, cor, luz) {
  return `<g transform="translate(${cx - tamanho / 2} ${cy - tamanho / 2}) scale(${tamanho / 100})"><path d="${ESTRELA_DO_CERTIFICADO}" fill="${cor}"/>${luz ? `<path d="${ESTRELA_DO_CERTIFICADO}" fill="${luz}" opacity=".6" transform="rotate(45 50 50) translate(15 15) scale(.7)"/>` : ''}</g>`;
}

function seloDoCertificado(p, x, y, r) {
  const pontas = [];
  for (let i = 0; i < 48; i += 1) {
    const a = (i * Math.PI) / 24;
    const raio = i % 2 ? r : r * 0.9;
    pontas.push(`${(x + raio * Math.cos(a)).toFixed(1)},${(y + raio * Math.sin(a)).toFixed(1)}`);
  }
  return `<g><path d="M${x - 52} ${y + r * 0.55} l-20 ${r * 0.9} l30 -13 l17 28 l15 -${r * 0.9} z M${x + 52} ${y + r * 0.55} l20 ${r * 0.9} l-30 -13 l-17 28 l-15 -${r * 0.9} z" fill="#8a1c2c"/>
    <polygon points="${pontas.join(' ')}" fill="url(#${p}-ouro)" stroke="#8a5d10" stroke-width="3"/>
    <circle cx="${x}" cy="${y}" r="${r * 0.74}" fill="none" stroke="#8a5d10" stroke-width="2.5"/>
    <circle cx="${x}" cy="${y}" r="${r * 0.66}" fill="url(#${p}-ouro-claro)"/>
    ${estrelaDoCertificado(x, y, r * 1.02, '#7a520c', '#fff3c4')}</g>`;
}

function cantoDoCertificado(p, x, y, rot) {
  return `<g transform="translate(${x} ${y}) rotate(${rot})" fill="none" stroke="url(#${p}-ouro)" stroke-width="3" stroke-linecap="round">
    <path d="M0 0 C 70 0 110 22 118 70"/><path d="M0 0 C 0 70 22 110 70 118"/>
    <path d="M18 18 C 52 18 70 34 72 64 C 46 60 30 46 18 18 Z" fill="url(#${p}-ouro)" stroke="none" opacity=".85"/>
    <circle cx="118" cy="74" r="5" fill="url(#${p}-ouro)" stroke="none"/><circle cx="74" cy="118" r="5" fill="url(#${p}-ouro)" stroke="none"/>
    <path d="M-6 -6 l10 0 l-10 10 z" fill="url(#${p}-ouro)" stroke="none"/></g>`;
}

function certificadoSvg(dados) {
  contadorDosCertificados += 1;
  const p = `cert${contadorDosCertificados}`;
  const serifa = "Georgia, 'Times New Roman', serif";
  const cursiva = "'Segoe Script', 'Brush Script MT', 'Lucida Handwriting', 'Dancing Script', cursive";
  const nome = String(dados.nome || '');
  const tamanhoDoNome = Math.max(54, Math.min(96, Math.round(1500 / Math.max(10, nome.length * 1.05))));
  const destaque = String(dados.destaque || '');
  const tamanhoDoDestaque = Math.max(32, Math.min(50, Math.round(1900 / Math.max(20, destaque.length * 1.2))));
  const raios = Array.from({ length: 32 }, (_, i) => `<path d="M0 -${i % 2 ? 96 : 116} L${i % 2 ? 1.6 : 2.6} -66 L-${i % 2 ? 1.6 : 2.6} -66 Z" fill="url(#${p}-ouro)" opacity="${i % 2 ? 0.35 : 0.6}" transform="rotate(${i * 11.25})"/>`).join('');
  const codigo = String(dados.codigo || '');
  const verificacao = codigo ? `${trDoCertificado('Código')} ${codigo} · ${trDoCertificado('Verifique em')} luminasancti.com/?certificado=${codigo}` : 'luminasancti.com';
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 1131" width="1600" height="1131" class="certificado-svg" role="img" aria-label="${escaparDoCertificado(`${trDoCertificado('Certificado de Conclusão')}: ${nome}, ${destaque}`)}">
  <defs>
    <linearGradient id="${p}-papel" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fdf6df"/><stop offset=".45" stop-color="#f6e6b8"/><stop offset="1" stop-color="#e6c983"/></linearGradient>
    <radialGradient id="${p}-luz" cx="50%" cy="42%" r="58%"><stop offset="0" stop-color="#fffdf3" stop-opacity=".9"/><stop offset="1" stop-color="#fffdf3" stop-opacity="0"/></radialGradient>
    <radialGradient id="${p}-vinheta" cx="50%" cy="50%" r="72%"><stop offset=".62" stop-color="#b98a3a" stop-opacity="0"/><stop offset="1" stop-color="#8f6118" stop-opacity=".32"/></radialGradient>
    <pattern id="${p}-trama" width="16" height="16" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><path d="M0 8 H16" stroke="#a87a24" stroke-opacity=".08" stroke-width="1"/></pattern>
    <linearGradient id="${p}-ouro" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f9e08e"/><stop offset=".4" stop-color="#c9952c"/><stop offset=".65" stop-color="#f4d477"/><stop offset="1" stop-color="#8a5d10"/></linearGradient>
    <radialGradient id="${p}-ouro-claro" cx=".4" cy=".35" r=".8"><stop offset="0" stop-color="#fff6cf"/><stop offset=".6" stop-color="#ecc45c"/><stop offset="1" stop-color="#b8862a"/></radialGradient>
    <radialGradient id="${p}-brilho" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#ffe9a6" stop-opacity=".85"/><stop offset="1" stop-color="#ffe9a6" stop-opacity="0"/></radialGradient>
    <linearGradient id="${p}-tinta" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9c6a14"/><stop offset="1" stop-color="#6e4a0c"/></linearGradient>
  </defs>
  <rect width="1600" height="1131" fill="url(#${p}-papel)"/>
  <rect width="1600" height="1131" fill="url(#${p}-trama)"/>
  <rect width="1600" height="1131" fill="url(#${p}-luz)"/>
  <rect width="1600" height="1131" fill="url(#${p}-vinheta)"/>
  <rect x="34" y="34" width="1532" height="1063" rx="10" fill="none" stroke="url(#${p}-ouro)" stroke-width="16"/>
  <rect x="58" y="58" width="1484" height="1015" fill="none" stroke="#c9952c" stroke-width="5" stroke-dasharray="0 14" stroke-linecap="round"/>
  <rect x="72" y="72" width="1456" height="987" rx="4" fill="none" stroke="url(#${p}-ouro)" stroke-width="2.5"/>
  <rect x="84" y="84" width="1432" height="963" rx="2" fill="none" stroke="#c9952c" stroke-opacity=".45" stroke-width="1.2"/>
  ${cantoDoCertificado(p, 98, 98, 0)}${cantoDoCertificado(p, 1502, 98, 90)}${cantoDoCertificado(p, 1502, 1033, 180)}${cantoDoCertificado(p, 98, 1033, 270)}
  <g transform="translate(800 150)"><circle r="118" fill="url(#${p}-brilho)"/>${raios}</g>
  ${estrelaDoCertificado(800, 150, 158, `url(#${p}-ouro)`, '#fff6d2')}
  <text x="800" y="268" text-anchor="middle" font-family="${serifa}" font-size="24" letter-spacing="12" fill="#8a5d10">LUMINA SANCTI</text>
  <text x="800" y="344" text-anchor="middle" font-family="${serifa}" font-size="62" fill="#1c2444">${escaparDoCertificado(trDoCertificado('Certificado de Conclusão'))}</text>
  <g fill="url(#${p}-ouro)"><rect x="560" y="370" width="200" height="2.5"/><rect x="840" y="370" width="200" height="2.5"/>${estrelaDoCertificado(800, 371, 26, `url(#${p}-ouro)`, '')}</g>
  <text x="800" y="436" text-anchor="middle" font-family="${serifa}" font-style="italic" font-size="30" fill="#6b5a3a">${escaparDoCertificado(trDoCertificado('Certificamos que'))}</text>
  <text x="800" y="${514 + tamanhoDoNome * 0.2}" text-anchor="middle" font-family="${serifa}" font-style="italic" font-size="${tamanhoDoNome}" fill="url(#${p}-tinta)">${escaparDoCertificado(nome)}</text>
  <path d="M430 566 C 560 552 680 578 800 566 C 920 554 1040 580 1170 566" fill="none" stroke="url(#${p}-ouro)" stroke-width="2.5" stroke-linecap="round"/>
  <path d="M800 557 l9 9 l-9 9 l-9 -9 z" fill="url(#${p}-ouro)"/>
  <text x="800" y="626" text-anchor="middle" font-family="${serifa}" font-size="30" fill="#2b3150">${escaparDoCertificado(dados.linha || '')}</text>
  <text x="800" y="${686 + (50 - tamanhoDoDestaque) * 0.3}" text-anchor="middle" font-family="${serifa}" font-weight="bold" font-size="${tamanhoDoDestaque}" fill="#1c2444">${escaparDoCertificado(destaque)}</text>
  ${dados.extra ? `<text x="800" y="730" text-anchor="middle" font-family="${serifa}" font-style="italic" font-size="25" fill="#6b5a3a">${escaparDoCertificado(dados.extra)}</text>` : ''}
  <circle cx="800" cy="868" r="96" fill="url(#${p}-brilho)" opacity=".7"/>
  ${seloDoCertificado(p, 800, 866, 62)}
  <text x="370" y="878" text-anchor="middle" font-family="${serifa}" font-size="30" fill="#1c2444">${escaparDoCertificado(dataDoCertificado(dados.data))}</text>
  <line x1="200" y1="896" x2="540" y2="896" stroke="#8a5d10" stroke-width="1.5"/>
  <text x="370" y="926" text-anchor="middle" font-family="${serifa}" font-size="18" letter-spacing="3" fill="#8a5d10">${escaparDoCertificado(trDoCertificado('CONCLUÍDO EM').toUpperCase())}</text>
  <text x="1230" y="884" text-anchor="middle" font-family="${cursiva}" font-size="56" fill="#1c2444" transform="rotate(-4 1230 870)">Lumina Sancti</text>
  <path d="M1090 900 C 1160 884 1300 914 1380 888" fill="none" stroke="#1c2444" stroke-width="2" stroke-linecap="round" opacity=".7"/>
  <line x1="1060" y1="906" x2="1400" y2="906" stroke="#8a5d10" stroke-width="1.5"/>
  <text x="1230" y="936" text-anchor="middle" font-family="${serifa}" font-size="18" letter-spacing="3" fill="#8a5d10">${escaparDoCertificado(trDoCertificado('EQUIPE LUMINA SANCTI'))}</text>
  <text x="800" y="990" text-anchor="middle" font-family="${serifa}" font-style="italic" font-size="20" fill="#8a6a30">Ad Maiorem Dei Gloriam</text>
  <text x="800" y="1020" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="16" letter-spacing="1" fill="#7d6a42">${escaparDoCertificado(verificacao)}</text>
</svg>`;
}

function dadosDoCertificado(c) {
  if (!c) return null;
  const curso = c.tipo === 'curso';
  const n = Number(c.titulo) || 0;
  return {
    tipo: curso ? 'curso' : 'todas',
    nome: c.nome || '',
    linha: trDoCertificado(curso ? 'concluiu o curso de aprofundamento' : 'concluiu todas as trilhas dos santos'),
    destaque: curso ? c.titulo : trDoCertificado('Trilhas dos Santos'),
    extra: curso ? (c.detalhe ? trDoCertificado('com {nome}', { nome: c.detalhe }) : '') : (n ? trDoCertificado('{n} trilhas concluídas', { n }) : ''),
    data: c.emitido_em,
    codigo: c.codigo || '',
  };
}

function todasAsTrilhasConcluidas() {
  try {
    if (typeof carregarProgressoTrilhas !== 'function' || typeof trilhasEmUso !== 'function' || typeof trilhaConcluida !== 'function') return false;
    const estado = carregarProgressoTrilhas();
    const trilhas = trilhasEmUso().filter((t) => t.licoes && t.licoes.length);
    return trilhas.length > 0 && trilhas.every((t) => trilhaConcluida(t, estado));
  } catch (e) {
    return false;
  }
}

function cursosConcluidosConhecidos() {
  try {
    if (typeof listaDeCursos === 'undefined' || !Array.isArray(listaDeCursos)) return [];
    return listaDeCursos.filter((c) => {
      const total = Array.isArray(c.aulas) ? c.aulas.length : Number(c.aulas || 0);
      const feitas = Array.isArray(c.aulas) ? c.aulas.filter((a) => a.feita).length : Number(c.feitas || 0);
      return total > 0 && feitas >= total;
    }).map((c) => String(c.id));
  } catch (e) {
    return [];
  }
}

async function chamarCertificado(nome, argumentos) {
  if (typeof supabaseCliente === 'undefined' || !supabaseCliente) throw new Error('sem_conexao');
  const { data, error } = await supabaseCliente.rpc(nome, argumentos);
  if (error) throw error;
  return data;
}

function guardarCertificado(pid, c) {
  if (!pid || !c) return;
  const lista = certificadosDosPerfis[pid] || (certificadosDosPerfis[pid] = []);
  if (!lista.some((x) => x.codigo === c.codigo)) lista.unshift(c);
}

async function carregarCertificados(pid, dono) {
  if (!pid) return [];
  let lista = [];
  try { lista = (await chamarCertificado('certificados_do_perfil', { _pid: pid })) || []; } catch (e) {
    lista = certificadosDosPerfis[pid] || [];
  }
  if (dono) {
    const faltam = [];
    if (todasAsTrilhasConcluidas() && !lista.some((c) => c.tipo === 'todas_trilhas')) faltam.push(['todas_trilhas', 'todas']);
    cursosConcluidosConhecidos().forEach((id) => { if (!lista.some((c) => c.tipo === 'curso' && String(c.referencia) === id)) faltam.push(['curso', id]); });
    for (const [tipo, ref] of faltam) {
      try {
        const novo = await chamarCertificado('certificado_emitir', { _pid: pid, _tipo: tipo, _ref: ref });
        if (novo && !lista.some((c) => c.codigo === novo.codigo)) lista.unshift(novo);
      } catch (e) {
      }
    }
  }
  certificadosDosPerfis[pid] = lista;
  return lista;
}

function cartaoDoCertificado(pid, c, i) {
  const d = dadosDoCertificado(c);
  const rotulo = d.tipo === 'curso' ? trDoCertificado('Curso') : trDoCertificado('Todas as trilhas');
  return `<button type="button" class="certificado-cartao tipo-${d.tipo}" data-certificado-pid="${escaparDoCertificado(pid)}" data-certificado-indice="${i}">
      <span class="certificado-mini" aria-hidden="true">${certificadoSvg(d)}</span>
      <span class="certificado-cartao-textos"><small>${escaparDoCertificado(rotulo)}</small><strong>${escaparDoCertificado(d.destaque)}</strong><em>${escaparDoCertificado(dataDoCertificado(d.data))}</em></span>
    </button>`;
}

function htmlDosCertificadosDoPerfil(pid, dono) {
  const membro = perfilDoCertificado();
  const id = pid || (membro && membro.id);
  if (!id) return '';
  const eu = dono !== undefined ? !!dono : (!pid || !!(membro && membro.id === pid));
  contadorDosCertificados += 1;
  const lugar = `certificados-do-perfil-${contadorDosCertificados}`;
  setTimeout(() => {
    const el = document.getElementById(lugar);
    if (el) preencherCertificadosDoPerfil(el, id, eu);
  }, 0);
  return `<section class="perfil-secao perfil-certificados" id="${lugar}" hidden></section>`;
}

async function preencherCertificadosDoPerfil(el, pid, dono) {
  const lista = await carregarCertificados(pid, dono);
  if (!el.isConnected) return;
  if (!lista.length) { el.hidden = true; el.innerHTML = ''; return; }
  el.hidden = false;
  el.innerHTML = `<div class="perfil-secao-cabecalho"><h4 class="perfil-secao-titulo">${escaparDoCertificado(trDoCertificado('Certificados'))}</h4><button type="button" class="perfil-link" data-ver-certificados="${escaparDoCertificado(pid)}">${escaparDoCertificado(trDoCertificado('Ver todos'))}</button></div>
    <div class="certificados-lista">${lista.slice(0, 2).map((c, i) => cartaoDoCertificado(pid, c, i)).join('')}</div>`;
}

function fecharListaDeCertificados() {
  const janela = document.getElementById('certificados-lista-janela');
  if (janela) janela.remove();
}

function abrirListaDeCertificados(pid) {
  fecharListaDeCertificados();
  const lista = certificadosDosPerfis[pid] || [];
  const janela = document.createElement('div');
  janela.id = 'certificados-lista-janela';
  janela.className = 'certificado-janela certificados-lista-janela';
  janela.setAttribute('role', 'dialog');
  janela.setAttribute('aria-modal', 'true');
  janela.innerHTML = `<div class="certificados-lista-caixa">
    <div class="certificados-lista-topo"><h3>${escaparDoCertificado(trDoCertificado('Certificados'))}</h3><button type="button" class="certificado-fechar" aria-label="${escaparDoCertificado(trDoCertificado('Fechar'))}">×</button></div>
    <div class="certificados-lista">${lista.map((c, i) => cartaoDoCertificado(pid, c, i)).join('')}</div>
  </div>`;
  document.body.appendChild(janela);
  requestAnimationFrame(() => janela.classList.add('aberta'));
  janela.addEventListener('click', (e) => { if (e.target === janela) fecharListaDeCertificados(); });
  janela.querySelector('.certificado-fechar').addEventListener('click', fecharListaDeCertificados);
}

async function certificadoEmPng(svg) {
  const url = URL.createObjectURL(new Blob([svg], { type: 'image/svg+xml;charset=utf-8' }));
  try {
    const imagem = new Image();
    await new Promise((ok, erro) => { imagem.onload = ok; imagem.onerror = erro; imagem.src = url; });
    const tela = document.createElement('canvas');
    tela.width = 2400; tela.height = 1697;
    tela.getContext('2d').drawImage(imagem, 0, 0, tela.width, tela.height);
    return await new Promise((ok) => tela.toBlob(ok, 'image/jpeg', 0.92));
  } finally {
    URL.revokeObjectURL(url);
  }
}

function nomeDoArquivoDoCertificado(dados) {
  const base = `certificado-${String(dados.destaque || 'lumina-sancti').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}`;
  return `${base || 'certificado'}.jpg`;
}

function fecharCertificado() {
  const janela = document.getElementById('certificado-janela');
  if (janela) janela.remove();
  document.body.classList.remove('imprimindo-certificado');
}

function montarJanelaDoCertificado(conteudo) {
  fecharCertificado();
  const janela = document.createElement('div');
  janela.id = 'certificado-janela';
  janela.className = 'certificado-janela';
  janela.setAttribute('role', 'dialog');
  janela.setAttribute('aria-modal', 'true');
  janela.innerHTML = `<div class="certificado-caixa"><button type="button" class="certificado-fechar" aria-label="${escaparDoCertificado(trDoCertificado('Fechar'))}">×</button>${conteudo}</div>`;
  document.body.appendChild(janela);
  requestAnimationFrame(() => janela.classList.add('aberta'));
  janela.addEventListener('click', (e) => { if (e.target === janela) fecharCertificado(); });
  janela.querySelector('.certificado-fechar').addEventListener('click', fecharCertificado);
  return janela;
}

function abrirCertificado(dados, opcoes) {
  if (!dados) return;
  const svg = certificadoSvg(dados);
  const verificado = opcoes && opcoes.verificado;
  const janela = montarJanelaDoCertificado(`
    ${verificado ? `<div class="certificado-verificado"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>${escaparDoCertificado(trDoCertificado('Certificado verdadeiro'))}</div>` : ''}
    <div class="certificado-arte">${svg}</div>
    <div class="certificado-botoes">
      <button type="button" class="certificado-acao principal" data-acao-cert="baixar">${escaparDoCertificado(trDoCertificado('Baixar imagem'))}</button>
      ${verificado ? '' : `<button type="button" class="certificado-acao" data-acao-cert="compartilhar">${escaparDoCertificado(trDoCertificado('Compartilhar'))}</button>`}
      <button type="button" class="certificado-acao" data-acao-cert="imprimir">${escaparDoCertificado(trDoCertificado('Imprimir ou salvar em PDF'))}</button>
    </div>`);
  janela.querySelectorAll('[data-acao-cert]').forEach((b) => b.addEventListener('click', async () => {
    const acao = b.dataset.acaoCert;
    if (acao === 'imprimir') { document.body.classList.add('imprimindo-certificado'); window.print(); setTimeout(() => document.body.classList.remove('imprimindo-certificado'), 800); return; }
    b.disabled = true;
    try {
      const imagem = await certificadoEmPng(svg);
      const arquivo = new File([imagem], nomeDoArquivoDoCertificado(dados), { type: 'image/jpeg' });
      if (acao === 'compartilhar' && navigator.canShare && navigator.canShare({ files: [arquivo] })) {
        await navigator.share({ files: [arquivo], title: trDoCertificado('Certificado de Conclusão'), text: `${dados.destaque} · luminasancti.com/?certificado=${dados.codigo}` });
      } else {
        const link = document.createElement('a');
        link.href = URL.createObjectURL(imagem);
        link.download = arquivo.name;
        document.body.appendChild(link);
        link.click();
        setTimeout(() => { URL.revokeObjectURL(link.href); link.remove(); }, 1500);
      }
    } catch (e) {
    } finally {
      b.disabled = false;
    }
  }));
}

function avisarDoCertificado() {
  if (typeof avisoRapidoDosSantos === 'function') avisoRapidoDosSantos(trDoCertificado('Não deu para abrir o certificado agora. Tente de novo.'), 'erro');
}

async function emitirEAbrirCertificado(pid, tipo, ref, botao) {
  if (!pid) return;
  if (botao) botao.disabled = true;
  try {
    const c = await chamarCertificado('certificado_emitir', { _pid: pid, _tipo: tipo, _ref: ref });
    if (!c) throw new Error('vazio');
    guardarCertificado(pid, c);
    abrirCertificado(dadosDoCertificado(c));
  } catch (e) {
    avisarDoCertificado();
  } finally {
    if (botao) botao.disabled = false;
  }
}

function abrirCertificadoDeTodasAsTrilhas(botao) {
  const membro = perfilDoCertificado();
  return emitirEAbrirCertificado(membro && membro.id, 'todas_trilhas', 'todas', botao);
}

function abrirCertificadoDoCurso(curso, botao) {
  if (!curso) return null;
  const adulto = typeof perfilAdultoAtivo === 'function' ? perfilAdultoAtivo() : perfilDoCertificado();
  return emitirEAbrirCertificado(adulto && adulto.id, 'curso', String(curso.id || curso.slug), botao);
}

function codigoDoEndereco() {
  try { return String(new URLSearchParams(window.location.search).get('certificado') || '').trim().toUpperCase(); } catch (e) { return ''; }
}

async function verificarCertificadoDoEndereco() {
  const codigo = codigoDoEndereco();
  if (!codigo) return;
  for (let i = 0; i < 60 && (typeof supabaseCliente === 'undefined' || !supabaseCliente); i += 1) await esperarDoCertificado(100);
  let resposta = null;
  try { resposta = await chamarCertificado('certificado_verificar', { _codigo: codigo }); } catch (e) {
    resposta = null;
  }
  for (let i = 0; i < 130 && document.body.classList.contains('intro-ativa'); i += 1) await esperarDoCertificado(100);
  if (resposta && resposta.valido) { abrirCertificado(dadosDoCertificado(resposta), { verificado: true }); return; }
  montarJanelaDoCertificado(`<div class="certificado-invalido"><svg viewBox="0 0 100 100" width="56" height="56" aria-hidden="true"><path d="${ESTRELA_DO_CERTIFICADO}" fill="#d4af37"/></svg><h3>${escaparDoCertificado(trDoCertificado('Certificado não encontrado'))}</h3><p translate="no">${escaparDoCertificado(codigo)}</p></div>`);
}

if (typeof document !== 'undefined' && document.addEventListener) {
  document.addEventListener('click', (e) => {
    const alvo = e.target && e.target.closest ? e.target.closest('[data-certificado-indice], [data-ver-certificados], [data-certificado-curso], [data-certificado-todas]') : null;
    if (!alvo) return;
    if (alvo.dataset.verCertificados) abrirListaDeCertificados(alvo.dataset.verCertificados);
    else if (alvo.dataset.certificadoIndice !== undefined) {
      const lista = certificadosDosPerfis[alvo.dataset.certificadoPid] || [];
      abrirCertificado(dadosDoCertificado(lista[Number(alvo.dataset.certificadoIndice)]));
    } else if (alvo.dataset.certificadoTodas !== undefined) abrirCertificadoDeTodasAsTrilhas(alvo);
    else if (alvo.dataset.certificadoCurso && typeof cursoAberto !== 'undefined' && cursoAberto) abrirCertificadoDoCurso(cursoAberto, alvo);
  });
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    if (document.getElementById('certificado-janela')) fecharCertificado();
    else if (document.getElementById('certificados-lista-janela')) fecharListaDeCertificados();
  });
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => verificarCertificadoDoEndereco());
  else setTimeout(verificarCertificadoDoEndereco, 0);
}
