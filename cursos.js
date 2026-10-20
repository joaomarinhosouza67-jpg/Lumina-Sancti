const ICONES_DOS_CURSOS = ['capelo', 'cruz', 'biblia', 'calice', 'gota', 'coroa', 'vela', 'chave', 'livro', 'tabuas', 'igreja', 'calendario', 'chama', 'aliancas', 'terco', 'pomba', 'coracao', 'misericordia', 'estrela', 'lampada'];

let listaDeCursos = null;
let cursoAberto = null;
let aulaAberta = -1;
let cargaDosCursos = 0;

function textoSeguroDoCurso(texto) {
  return String(texto == null ? '' : texto).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

function corDoCurso(cor) {
  return /^#[0-9a-fA-F]{6}$/.test(String(cor || '')) ? cor : '#d4af37';
}

function iconeDoCurso(nome) {
  const valido = ICONES_DOS_CURSOS.includes(nome) ? nome : 'capelo';
  return typeof icone === 'function' ? icone(valido) : '';
}

function enderecoSeguroDoCurso(url) {
  return /^https:\/\/[^\s<>"']+$/.test(String(url || '')) ? String(url) : '';
}

function videoDoCurso(url) {
  const texto = String(url || '');
  let m = texto.match(/^https:\/\/(?:www\.|m\.)?youtube\.com\/(?:watch\?(?:.*&)?v=|shorts\/|embed\/|live\/)([A-Za-z0-9_-]{6,20})/);
  if (!m) m = texto.match(/^https:\/\/youtu\.be\/([A-Za-z0-9_-]{6,20})/);
  if (m) return { tipo: 'youtube', id: m[1], capa: `https://i.ytimg.com/vi/${m[1]}/hqdefault.jpg`, endereco: `https://www.youtube-nocookie.com/embed/${m[1]}?rel=0&modestbranding=1&autoplay=1` };
  m = texto.match(/^https:\/\/(?:www\.)?(?:player\.)?vimeo\.com\/(?:video\/)?(\d{5,12})/);
  if (m) return { tipo: 'vimeo', id: m[1], capa: '', endereco: `https://player.vimeo.com/video/${m[1]}?autoplay=1&dnt=1` };
  return null;
}

function htmlDoVideoDoCurso(url, titulo) {
  const video = videoDoCurso(url);
  if (!video) return '';
  return `
    <div class="curso-video" data-video="${textoSeguroDoCurso(video.endereco)}" data-titulo="${textoSeguroDoCurso(titulo)}">
      ${video.capa ? `<img class="curso-video-capa" src="${textoSeguroDoCurso(video.capa)}" alt="" loading="lazy">` : ''}
      <button type="button" class="curso-video-tocar" aria-label="${textoSeguroDoCurso(tr('Assistir ao vídeo'))}">${typeof icone === 'function' ? icone('tocar') : ''}<span>Assistir ao vídeo</span></button>
    </div>`;
}

function ligarVideosDoCurso(lugar) {
  lugar.querySelectorAll('.curso-video').forEach((caixa) => {
    const capa = caixa.querySelector('.curso-video-capa');
    if (capa) capa.addEventListener('error', () => capa.remove());
    const botao = caixa.querySelector('.curso-video-tocar');
    if (!botao) return;
    botao.addEventListener('click', () => {
      const quadro = document.createElement('iframe');
      quadro.src = caixa.dataset.video;
      quadro.title = caixa.dataset.titulo || 'Vídeo';
      quadro.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
      quadro.allowFullscreen = true;
      quadro.referrerPolicy = 'strict-origin-when-cross-origin';
      caixa.innerHTML = '';
      caixa.appendChild(quadro);
      caixa.classList.add('tocando');
    });
  });
}

function pararVideoDoCurso() {
  document.querySelectorAll('#view-cursos .curso-video.tocando iframe').forEach((quadro) => quadro.remove());
}

function formatarTextoDoCurso(texto) {
  const link = (trecho, antes, url) => {
    const fim = (url.match(/(?:[.,;:!?)]|&#39;|&quot;)+$/) || [''])[0];
    const limpo = url.slice(0, url.length - fim.length);
    return `${antes}<a href="${limpo}" target="_blank" rel="noopener noreferrer">${limpo}</a>${fim}`;
  };
  const negrito = (linha) => textoSeguroDoCurso(linha)
    .replace(/(^|\s)(https:\/\/[^\s<]+)/g, link)
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/(^|[\s(])\*([^*\s][^*]*)\*/g, '$1<em>$2</em>');
  return String(texto || '').replace(/\r/g, '').split(/\n\s*\n/).map((bloco) => {
    const linhas = bloco.split('\n').map((l) => l.trim()).filter(Boolean);
    if (!linhas.length) return '';
    if (linhas.every((l) => /^[-•]\s+/.test(l))) return `<ul>${linhas.map((l) => `<li>${negrito(l.replace(/^[-•]\s+/, ''))}</li>`).join('')}</ul>`;
    if (linhas.every((l) => /^\d+[.)]\s+/.test(l))) return `<ol>${linhas.map((l) => `<li>${negrito(l.replace(/^\d+[.)]\s+/, ''))}</li>`).join('')}</ol>`;
    if (linhas.length === 1 && /^#{1,3}\s+/.test(linhas[0])) return `<h4>${negrito(linhas[0].replace(/^#{1,3}\s+/, ''))}</h4>`;
    if (linhas.every((l) => /^>\s?/.test(l))) return `<blockquote>${linhas.map((l) => negrito(l.replace(/^>\s?/, ''))).join('<br>')}</blockquote>`;
    return `<p>${linhas.map(negrito).join('<br>')}</p>`;
  }).join('');
}

function idDoPerfilDosCursos() {
  return typeof perfilAdultoAtivo === 'function' && perfilAdultoAtivo() ? perfilAdultoAtivo().id : null;
}

function duracaoDoCurso(minutos) {
  const m = Number(minutos || 0);
  if (!m) return '';
  if (m < 60) return tr('{n} min', { n: m });
  const h = Math.floor(m / 60);
  const resto = m % 60;
  return resto ? tr('{h} h {m} min', { h, m: resto }) : tr('{h} h', { h });
}

function mostrarParteDosCursos(parte) {
  const partes = { catalogo: 'cursos-catalogo-caixa', curso: 'curso-pagina', aula: 'aula-pagina' };
  Object.entries(partes).forEach(([nome, id]) => {
    const el = document.getElementById(id);
    if (el) el.hidden = nome !== parte;
  });
  const voltar = document.getElementById('btn-back-cursos');
  if (voltar) voltar.hidden = parte !== 'catalogo';
  const topo = document.querySelector('#view-cursos .cursos-topo');
  if (topo) topo.hidden = parte !== 'catalogo';
  pararVideoDoCurso();
  window.scrollTo({ top: 0, behavior: 'auto' });
}

function abrirCursos(slug) {
  mudarDeView('view-cursos');
  mostrarParteDosCursos('catalogo');
  carregarCursos().then(() => { if (slug) abrirCurso(slug); });
}

async function carregarCursos() {
  const lugar = document.getElementById('cursos-catalogo');
  if (!lugar) return;
  cargaDosCursos += 1;
  const minhaCarga = cargaDosCursos;
  if (!listaDeCursos) lugar.innerHTML = `<p class="cursos-carregando">${textoSeguroDoCurso(tr('Carregando os cursos...'))}</p>`;
  let cursos = [];
  try {
    if (typeof supabaseCliente === 'undefined' || !supabaseCliente) throw new Error('sem_banco');
    const { data, error } = await supabaseCliente.rpc('cursos_lista', { _pid: idDoPerfilDosCursos() });
    if (error) throw error;
    cursos = Array.isArray(data) ? data : [];
  } catch (e) {
    cursos = [];
  }
  if (minhaCarga !== cargaDosCursos) return;
  listaDeCursos = cursos;
  desenharCatalogoDeCursos();
}

function desenharCatalogoDeCursos() {
  const lugar = document.getElementById('cursos-catalogo');
  const selo = document.getElementById('cursos-selo');
  const subtitulo = document.getElementById('cursos-em-breve-titulo');
  if (!lugar) return;
  const cursos = listaDeCursos || [];
  const enquanto = document.getElementById('cursos-enquanto');
  if (selo) selo.hidden = cursos.length > 0;
  if (enquanto) enquanto.hidden = cursos.length > 0;
  if (subtitulo) subtitulo.textContent = tr(cursos.length ? 'Próximos temas' : 'Temas que vão chegar');
  if (!cursos.length) {
    lugar.innerHTML = '';
    return;
  }
  lugar.innerHTML = `
    <h3 class="cursos-subtitulo">${textoSeguroDoCurso(tr('Cursos disponíveis'))}</h3>
    <div class="cursos-grade">${cursos.map((c) => {
      const total = Number(c.aulas || 0);
      const feitas = Math.min(total, Number(c.feitas || 0));
      const porcento = total ? Math.round((feitas / total) * 100) : 0;
      const capa = enderecoSeguroDoCurso(c.capa);
      return `
      <button type="button" class="curso-cartao" data-curso="${textoSeguroDoCurso(c.slug)}" style="--cor-curso: ${corDoCurso(c.cor)}">
        <span class="curso-cartao-capa">${capa ? `<img src="${textoSeguroDoCurso(capa)}" alt="" loading="lazy">` : `<span class="curso-cartao-icone">${iconeDoCurso(c.icone)}</span>`}
          ${c.aberto === false ? `<span class="curso-cartao-cadeado">${typeof icone === 'function' ? icone('cadeado') : ''}<span>Para assinantes</span></span>` : ''}
        </span>
        <span class="curso-cartao-textos">
          <strong translate="no">${textoSeguroDoCurso(c.titulo)}</strong>
          ${c.professor ? `<small class="curso-cartao-professor">${textoSeguroDoCurso(tr('Com {nome}', { nome: c.professor }))}</small>` : ''}
          ${c.resumo ? `<span class="curso-cartao-resumo" translate="no">${textoSeguroDoCurso(c.resumo)}</span>` : ''}
          <span class="curso-cartao-info">${textoSeguroDoCurso(tr(total === 1 ? '1 aula' : '{n} aulas', { n: total }))}${Number(c.minutos) ? ` · ${textoSeguroDoCurso(duracaoDoCurso(c.minutos))}` : ''}</span>
          ${feitas > 0 ? `<span class="curso-progresso" aria-label="${textoSeguroDoCurso(tr('{feitas} de {total} aulas feitas', { feitas, total }))}"><span class="curso-progresso-barra" style="width: ${porcento}%"></span></span><small class="curso-progresso-texto">${textoSeguroDoCurso(tr(feitas === total ? 'Curso concluído' : '{feitas} de {total} aulas feitas', { feitas, total }))}</small>` : ''}
        </span>
      </button>`;
    }).join('')}</div>`;
  lugar.querySelectorAll('.curso-cartao').forEach((botao) => botao.addEventListener('click', () => abrirCurso(botao.dataset.curso)));
}

async function abrirCurso(slug) {
  const lugar = document.getElementById('curso-pagina');
  if (!lugar || !slug) return;
  mostrarParteDosCursos('curso');
  lugar.innerHTML = `<p class="cursos-carregando">${textoSeguroDoCurso(tr('Carregando o curso...'))}</p>`;
  let curso = null;
  try {
    const { data, error } = await supabaseCliente.rpc('curso_ver', { _slug: slug, _pid: idDoPerfilDosCursos() });
    if (error) throw error;
    curso = data;
  } catch (e) {
    curso = null;
  }
  if (!curso) {
    lugar.innerHTML = `${botaoDeVoltarDosCursos('catalogo')}<p class="cursos-vazio">${textoSeguroDoCurso(tr('Este curso não está disponível agora.'))}</p>`;
    ligarVoltarDosCursos(lugar);
    return;
  }
  cursoAberto = curso;
  desenharCurso();
}

function botaoDeVoltarDosCursos(destino) {
  const rotulo = destino === 'curso' ? 'Voltar ao curso' : 'Todos os cursos';
  return `<button type="button" class="btn-back curso-voltar" data-voltar="${destino}"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M19 12H5M12 19l-7-7 7-7"/></svg><span>${textoSeguroDoCurso(tr(rotulo))}</span></button>`;
}

function ligarVoltarDosCursos(lugar) {
  lugar.querySelectorAll('[data-voltar]').forEach((botao) => botao.addEventListener('click', () => {
    if (botao.dataset.voltar === 'curso') desenharCurso();
    else { mostrarParteDosCursos('catalogo'); carregarCursos(); }
  }));
}

function proximaAulaDoCurso(curso) {
  const aulas = curso.aulas || [];
  const indice = aulas.findIndex((a) => !a.feita);
  return indice < 0 ? 0 : indice;
}

function desenharCurso() {
  const lugar = document.getElementById('curso-pagina');
  const c = cursoAberto;
  if (!lugar || !c) return;
  mostrarParteDosCursos('curso');
  const aulas = c.aulas || [];
  const feitas = aulas.filter((a) => a.feita).length;
  const minutos = aulas.reduce((s, a) => s + Number(a.minutos || 0), 0);
  const capa = enderecoSeguroDoCurso(c.capa);
  const comecou = feitas > 0;
  lugar.innerHTML = `
    ${botaoDeVoltarDosCursos('catalogo')}
    <header class="curso-topo" style="--cor-curso: ${corDoCurso(c.cor)}">
      <div class="curso-topo-capa">${capa ? `<img src="${textoSeguroDoCurso(capa)}" alt="">` : `<span class="curso-topo-icone">${iconeDoCurso(c.icone)}</span>`}</div>
      <div class="curso-topo-textos">
        <p class="curso-topo-selo">${textoSeguroDoCurso(tr('Curso de aprofundamento'))}</p>
        <h2 translate="no">${textoSeguroDoCurso(c.titulo)}</h2>
        ${c.professor ? `<p class="curso-topo-professor">${textoSeguroDoCurso(tr('Com {nome}', { nome: c.professor }))}</p>` : ''}
        ${c.resumo ? `<p class="curso-topo-resumo" translate="no">${textoSeguroDoCurso(c.resumo)}</p>` : ''}
        <p class="curso-topo-info">${textoSeguroDoCurso(tr(aulas.length === 1 ? '1 aula' : '{n} aulas', { n: aulas.length }))}${minutos ? ` · ${textoSeguroDoCurso(duracaoDoCurso(minutos))}` : ''}${comecou ? ` · ${textoSeguroDoCurso(tr('{feitas} de {total} aulas feitas', { feitas, total: aulas.length }))}` : ''}</p>
        ${c.aberto === false
          ? `<div class="curso-trancado">${typeof icone === 'function' ? icone('cadeado') : ''}<span>${textoSeguroDoCurso(tr('Este curso é para assinantes. Assine um plano para assistir a todas as aulas.'))}</span><button type="button" class="curso-botao" id="curso-ver-planos">Ver os planos</button></div>`
          : (aulas.length ? `<button type="button" class="curso-botao" id="curso-comecar">${textoSeguroDoCurso(tr(feitas === aulas.length ? 'Ver de novo' : (comecou ? 'Continuar' : 'Começar o curso')))}</button>` : '')}
      </div>
    </header>
    ${c.aberto !== false && c.video ? `<section class="curso-secao">${htmlDoVideoDoCurso(c.video, c.titulo)}</section>` : ''}
    ${c.descricao ? `<section class="curso-secao curso-texto" translate="no">${formatarTextoDoCurso(c.descricao)}</section>` : ''}
    <section class="curso-secao">
      <h3 class="cursos-subtitulo">${textoSeguroDoCurso(tr('Aulas'))}</h3>
      ${aulas.length ? `<ol class="curso-aulas">${aulas.map((a, i) => `
        <li>
          <button type="button" class="curso-aula${a.feita ? ' feita' : ''}" data-aula="${i}"${c.aberto === false ? ' disabled' : ''}>
            <span class="curso-aula-numero">${a.feita && typeof icone === 'function' ? icone('check') : i + 1}</span>
            <span class="curso-aula-textos">
              <strong translate="no">${textoSeguroDoCurso(a.titulo)}</strong>
              ${a.resumo ? `<small translate="no">${textoSeguroDoCurso(a.resumo)}</small>` : ''}
            </span>
            <span class="curso-aula-lado">${a.video && typeof icone === 'function' ? icone('video') : ''}${a.minutos ? `<small>${textoSeguroDoCurso(duracaoDoCurso(a.minutos))}</small>` : ''}${c.aberto === false && typeof icone === 'function' ? icone('cadeado') : ''}</span>
          </button>
        </li>`).join('')}</ol>` : `<p class="cursos-vazio">${textoSeguroDoCurso(tr('As aulas deste curso vão chegar em breve.'))}</p>`}
    </section>`;
  ligarVoltarDosCursos(lugar);
  ligarVideosDoCurso(lugar);
  const comecar = lugar.querySelector('#curso-comecar');
  if (comecar) comecar.addEventListener('click', () => abrirAula(proximaAulaDoCurso(c)));
  const planos = lugar.querySelector('#curso-ver-planos');
  if (planos) planos.addEventListener('click', () => { if (typeof abrirPlanos === 'function') abrirPlanos(); });
  lugar.querySelectorAll('.curso-aula').forEach((botao) => botao.addEventListener('click', () => abrirAula(Number(botao.dataset.aula))));
}

function abrirAula(indice) {
  const lugar = document.getElementById('aula-pagina');
  const c = cursoAberto;
  if (!lugar || !c || c.aberto === false) return;
  const aulas = c.aulas || [];
  const a = aulas[indice];
  if (!a) return;
  aulaAberta = indice;
  mostrarParteDosCursos('aula');
  const ultima = indice === aulas.length - 1;
  lugar.innerHTML = `
    ${botaoDeVoltarDosCursos('curso')}
    <article class="aula" style="--cor-curso: ${corDoCurso(c.cor)}">
      <p class="aula-onde">${textoSeguroDoCurso(tr('Aula {n} de {total}', { n: indice + 1, total: aulas.length }))} · <span translate="no">${textoSeguroDoCurso(c.titulo)}</span></p>
      <h2 class="aula-titulo" translate="no">${textoSeguroDoCurso(a.titulo)}</h2>
      ${a.minutos ? `<p class="aula-tempo">${textoSeguroDoCurso(duracaoDoCurso(a.minutos))}</p>` : ''}
      ${a.video ? htmlDoVideoDoCurso(a.video, a.titulo) : ''}
      ${a.texto ? `<div class="curso-texto aula-texto" translate="no">${formatarTextoDoCurso(a.texto)}</div>` : ''}
      <div class="aula-botoes">
        <button type="button" class="curso-botao-secundario${a.feita ? ' feita' : ''}" id="aula-feita" aria-pressed="${a.feita ? 'true' : 'false'}">${typeof icone === 'function' ? icone('check') : ''}<span>${textoSeguroDoCurso(tr(a.feita ? 'Aula concluída' : 'Marcar como concluída'))}</span></button>
        ${indice > 0 ? `<button type="button" class="curso-botao-secundario" id="aula-anterior">${textoSeguroDoCurso(tr('Aula anterior'))}</button>` : ''}
        <button type="button" class="curso-botao" id="aula-proxima">${textoSeguroDoCurso(tr(ultima ? 'Terminar o curso' : 'Próxima aula'))}</button>
      </div>
      <p class="aula-aviso" id="aula-aviso" aria-live="polite"></p>
    </article>`;
  ligarVoltarDosCursos(lugar);
  ligarVideosDoCurso(lugar);
  lugar.querySelector('#aula-feita').addEventListener('click', () => marcarAula(indice, !a.feita));
  const anterior = lugar.querySelector('#aula-anterior');
  if (anterior) anterior.addEventListener('click', () => abrirAula(indice - 1));
  lugar.querySelector('#aula-proxima').addEventListener('click', async () => {
    if (!a.feita) await marcarAula(indice, true, true);
    if (ultima) desenharCurso();
    else abrirAula(indice + 1);
  });
}

async function marcarAula(indice, feita, calado) {
  const c = cursoAberto;
  const a = c && (c.aulas || [])[indice];
  const aviso = document.getElementById('aula-aviso');
  if (!a) return false;
  const pid = idDoPerfilDosCursos();
  if (!pid) {
    if (aviso && !calado) aviso.textContent = tr('Entre na sua conta para guardar o seu progresso nos cursos.');
    return false;
  }
  try {
    const { error } = await supabaseCliente.rpc('curso_marcar_aula', { _pid: pid, _aula: a.id, _feita: feita });
    if (error) throw error;
    a.feita = feita;
    if (listaDeCursos) {
      const daLista = listaDeCursos.find((x) => x.id === c.id);
      if (daLista) daLista.feitas = (c.aulas || []).filter((x) => x.feita).length;
    }
    if (!calado && aulaAberta === indice) abrirAula(indice);
    return true;
  } catch (e) {
    if (aviso) aviso.textContent = tr('Não foi possível guardar agora. Tente de novo.');
    return false;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  try {
    const slug = new URLSearchParams(window.location.search).get('curso');
    if (slug && /^[a-z0-9-]{3,60}$/.test(slug)) setTimeout(() => abrirCursos(slug), 900);
  } catch (e) {
  }
});
