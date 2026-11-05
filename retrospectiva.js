const RETROSPECTIVA_DO_ANO = { ano: 2026, de: '2026-12-01', ate: '2027-01-15' };
const estadoDaRetrospectiva = { telas: [], atual: 0, relogio: null, dados: null };

function trDaRetrospectiva(texto, valores) {
  return typeof tr === 'function' ? tr(texto, valores) : String(texto).replace(/\{(\w+)\}/g, (_, chave) => (valores && valores[chave] !== undefined ? valores[chave] : ''));
}

function escaparDaRetrospectiva(texto) {
  return String(texto || '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

function hojeDaRetrospectiva() {
  if (typeof hojeDoAdvento === 'function') return hojeDoAdvento();
  const agora = new Date();
  return new Date(agora.getFullYear(), agora.getMonth(), agora.getDate());
}

function dataDaRetrospectiva(texto) {
  const [a, m, d] = texto.split('-').map(Number);
  return new Date(a, m - 1, d);
}

function retrospectivaNaEpoca() {
  let previa = false;
  try { previa = new URLSearchParams(window.location.search).get('retrospectiva') === '1'; } catch (e) {
  }
  const hoje = hojeDaRetrospectiva();
  return previa || (hoje >= dataDaRetrospectiva(RETROSPECTIVA_DO_ANO.de) && hoje <= dataDaRetrospectiva(RETROSPECTIVA_DO_ANO.ate));
}

function numeroDaRetrospectiva(n) {
  try { return new Intl.NumberFormat(typeof idiomaAtual === 'string' && idiomaAtual === 'en' ? 'en-US' : (idiomaAtual === 'es' ? 'es-ES' : 'pt-BR')).format(n); } catch (e) { return String(n); }
}

function dadosDaRetrospectiva() {
  let estado = null;
  try { estado = typeof carregarProgressoTrilhas === 'function' ? carregarProgressoTrilhas() : null; } catch (e) { estado = null; }
  estado = estado || { fe: 0, ofensiva: 0, licoes: {} };
  const membro = typeof membroAtivo !== 'undefined' && membroAtivo ? membroAtivo : null;
  const fe = Math.max(Number(estado.fe) || 0, membro ? Number(membro.fe) || 0 : 0);
  const missoes = Object.keys(estado.licoes || {}).length;
  const estrelas = Object.values(estado.licoes || {}).reduce((soma, l) => soma + (Number(l.estrelas) || 0), 0);
  let trilhas = [];
  try { trilhas = (typeof trilhasEmUso === 'function' ? trilhasEmUso() : []).filter((t) => t.licoes && t.licoes.length && typeof trilhaConcluida === 'function' && trilhaConcluida(t, estado)); } catch (e) { trilhas = []; }
  const cartas = typeof cartasDoAlbum === 'function' ? cartasDoAlbum() : {};
  const figurinhas = Object.keys(cartas).length;
  const douradas = Object.values(cartas).filter((c) => c === 'dourada').length;
  const ofensiva = Math.max(Number(estado.ofensiva) || 0, membro ? Number(membro.melhorOfensiva) || Number(membro.ofensiva) || 0 : 0);
  let novenas = 0;
  try { if (typeof estadoDasNovenas === 'function') novenas = Object.values(estadoDasNovenas()).filter((n) => n && n.feitos && Object.keys(n.feitos).length >= 9).length; } catch (e) {
  }
  let advento = 0;
  try { if (typeof estadoDoAdvento === 'function' && typeof quantosDiasFeitosNoAdvento === 'function') advento = quantosDiasFeitosNoAdvento(estadoDoAdvento()); } catch (e) {
  }
  const devocaoId = typeof santoDeDevocao === 'function' ? santoDeDevocao() : '';
  let santo = devocaoId && typeof santosData !== 'undefined' ? santosData.find((s) => s.id === devocaoId) : null;
  if (!santo && trilhas.length && typeof santosData !== 'undefined') santo = santosData.find((s) => s.id === trilhas[trilhas.length - 1].santoId) || null;
  const posicao = typeof posicaoNaLiga === 'function' ? posicaoNaLiga(fe) : null;
  return { fe, missoes, estrelas, trilhas, figurinhas, douradas, ofensiva, novenas, advento, santo, devocao: !!devocaoId, posicao };
}

function contadorDaRetrospectiva(valor) {
  return `<strong class="retro-numero" data-ate="${valor}">0</strong>`;
}

function telasDaRetrospectiva(d) {
  const ano = RETROSPECTIVA_DO_ANO.ano;
  const telas = [];
  telas.push({ cor: '#3a1f6e', html: `<div class="retro-estrela" aria-hidden="true"></div><small>${escaparDaRetrospectiva(trDaRetrospectiva('Retrospectiva'))}</small><h2>${escaparDaRetrospectiva(trDaRetrospectiva('Seu {ano} com os santos', { ano }))}</h2><p>${escaparDaRetrospectiva(trDaRetrospectiva('Vamos relembrar o caminho que você fez este ano?'))}</p>` });
  telas.push({ cor: '#5a3a0c', html: `<small>${escaparDaRetrospectiva(trDaRetrospectiva('Fé'))}</small>${contadorDaRetrospectiva(d.fe)}<p>${escaparDaRetrospectiva(trDaRetrospectiva('de Fé juntada aprendendo com os santos.'))}</p>${d.posicao && typeof emblemaDaLiga === 'function' ? `<div class="retro-emblema">${emblemaDaLiga(d.posicao.indice, { divisao: d.posicao.divisao, classe: 'grande' })}</div><p class="retro-destaque">${escaparDaRetrospectiva(trDaRetrospectiva('Você chegou à liga {liga}.', { liga: typeof nomeDaDivisao === 'function' ? nomeDaDivisao(d.posicao) : '' }))}</p>` : ''}` });
  telas.push({ cor: '#123a5a', html: `<small>${escaparDaRetrospectiva(trDaRetrospectiva('Trilhas'))}</small>${contadorDaRetrospectiva(d.missoes)}<p>${escaparDaRetrospectiva(d.missoes === 1 ? trDaRetrospectiva('missão feita.') : trDaRetrospectiva('missões feitas.'))}</p>${d.trilhas.length ? `<p class="retro-destaque">${escaparDaRetrospectiva(d.trilhas.length === 1 ? trDaRetrospectiva('E 1 trilha completa!') : trDaRetrospectiva('E {n} trilhas completas!', { n: d.trilhas.length }))}</p><div class="retro-medalhas">${d.trilhas.slice(0, 8).map((t) => `<span class="retro-medalha">${typeof medalhaSvg === 'function' ? medalhaSvg(t, { conquistada: true }) : ''}</span>`).join('')}</div>` : `<p class="retro-destaque">${escaparDaRetrospectiva(trDaRetrospectiva('A primeira trilha completa está esperando por você.'))}</p>`}` });
  telas.push({ cor: '#6a1f1f', html: `<small>${escaparDaRetrospectiva(trDaRetrospectiva('Ofensiva'))}</small><div class="retro-chama" aria-hidden="true"><svg viewBox="0 0 96 128"><defs><radialGradient id="retro-fogo" cx="50%" cy="72%" r="62%"><stop offset="0" stop-color="#fff6c2"/><stop offset=".35" stop-color="#ffc23d"/><stop offset=".75" stop-color="#ff6a1a"/><stop offset="1" stop-color="#c22d12"/></radialGradient></defs><path d="M48 4 C60 30 86 46 86 82 C86 108 68 124 48 124 C28 124 10 108 10 82 C10 62 22 50 30 38 C32 54 38 62 46 66 C42 46 40 24 48 4Z" fill="url(#retro-fogo)"/><path d="M48 70 C58 82 64 90 64 102 C64 114 57 120 48 120 C39 120 32 114 32 102 C32 92 40 84 48 70Z" fill="#fff6c2" opacity=".9"/></svg></div>${contadorDaRetrospectiva(d.ofensiva)}<p>${escaparDaRetrospectiva(d.ofensiva === 1 ? trDaRetrospectiva('dia seguido foi a sua maior ofensiva.') : trDaRetrospectiva('dias seguidos foi a sua maior ofensiva.'))}</p>` });
  telas.push({ cor: '#3a2a6a', html: `<small>${escaparDaRetrospectiva(trDaRetrospectiva('Álbum'))}</small>${contadorDaRetrospectiva(d.figurinhas)}<p>${escaparDaRetrospectiva(d.figurinhas === 1 ? trDaRetrospectiva('figurinha colada no seu álbum.') : trDaRetrospectiva('figurinhas coladas no seu álbum.'))}</p>${d.douradas ? `<p class="retro-destaque">${escaparDaRetrospectiva(d.douradas === 1 ? trDaRetrospectiva('1 delas é dourada!') : trDaRetrospectiva('{n} delas são douradas!', { n: d.douradas }))}</p>` : ''}` });
  if (d.novenas || d.advento) telas.push({ cor: '#24304a', html: `<small>${escaparDaRetrospectiva(trDaRetrospectiva('Oração'))}</small>${d.advento ? `${contadorDaRetrospectiva(d.advento)}<p>${escaparDaRetrospectiva(trDaRetrospectiva('dias do Advento vividos com gestos de amor.'))}</p>` : ''}${d.novenas ? `<p class="retro-destaque">${escaparDaRetrospectiva(d.novenas === 1 ? trDaRetrospectiva('E 1 novena rezada do começo ao fim.') : trDaRetrospectiva('E {n} novenas rezadas do começo ao fim.', { n: d.novenas }))}</p>` : ''}` });
  if (d.santo) {
    const foto = typeof enderecoDaFotoDoSanto === 'function' ? enderecoDaFotoDoSanto(d.santo.id) : '';
    const nome = typeof textoDoSanto === 'function' ? textoDoSanto(d.santo).nome : d.santo.nome;
    telas.push({ cor: '#1f4a3a', html: `<small>${escaparDaRetrospectiva(d.devocao ? trDaRetrospectiva('Seu santo de devoção') : trDaRetrospectiva('Um santo que caminhou com você'))}</small><span class="retro-santo-foto"${foto ? ` style="background-image:url('${escaparDaRetrospectiva(foto)}')"` : ''}></span><h2 translate="no">${escaparDaRetrospectiva(nome)}</h2><p>${escaparDaRetrospectiva(trDaRetrospectiva('Que ele continue intercedendo por você no ano que vem.'))}</p>` });
  }
  telas.push({ cor: '#2a1650', final: true, html: `<small>${escaparDaRetrospectiva(trDaRetrospectiva('Meu {ano} no Lumina Sancti', { ano }))}</small>
    <div class="retro-resumo">
      <div><strong>${numeroDaRetrospectiva(d.fe)}</strong><span>${escaparDaRetrospectiva(trDaRetrospectiva('de Fé'))}</span></div>
      <div><strong>${numeroDaRetrospectiva(d.missoes)}</strong><span>${escaparDaRetrospectiva(trDaRetrospectiva('missões'))}</span></div>
      <div><strong>${numeroDaRetrospectiva(d.trilhas.length)}</strong><span>${escaparDaRetrospectiva(trDaRetrospectiva('trilhas'))}</span></div>
      <div><strong>${numeroDaRetrospectiva(d.ofensiva)}</strong><span>${escaparDaRetrospectiva(trDaRetrospectiva('dias de ofensiva'))}</span></div>
      <div><strong>${numeroDaRetrospectiva(d.figurinhas)}</strong><span>${escaparDaRetrospectiva(trDaRetrospectiva('figurinhas'))}</span></div>
      <div><strong>${escaparDaRetrospectiva(d.posicao && typeof nomeDaDivisao === 'function' ? nomeDaDivisao(d.posicao) : '-')}</strong><span>${escaparDaRetrospectiva(trDaRetrospectiva('liga'))}</span></div>
    </div>
    <p>${escaparDaRetrospectiva(trDaRetrospectiva('Que {proximo} seja ainda mais cheio de luz!', { proximo: ano + 1 }))}</p>
    <div class="retro-acoes"><button type="button" class="retro-compartilhar">${escaparDaRetrospectiva(trDaRetrospectiva('Compartilhar'))}</button><button type="button" class="retro-de-novo">${escaparDaRetrospectiva(trDaRetrospectiva('Ver de novo'))}</button></div>` });
  return telas;
}

function abrirRetrospectiva() {
  if (typeof closeSidebar === 'function') closeSidebar();
  fecharRetrospectiva();
  const dados = dadosDaRetrospectiva();
  estadoDaRetrospectiva.dados = dados;
  estadoDaRetrospectiva.telas = telasDaRetrospectiva(dados);
  estadoDaRetrospectiva.atual = 0;
  const caixa = document.createElement('div');
  caixa.id = 'retrospectiva';
  caixa.className = 'retro';
  caixa.setAttribute('role', 'dialog');
  caixa.setAttribute('aria-modal', 'true');
  caixa.setAttribute('aria-label', trDaRetrospectiva('Retrospectiva'));
  caixa.innerHTML = `<div class="retro-barras">${estadoDaRetrospectiva.telas.map(() => '<i><b></b></i>').join('')}</div>
    <button type="button" class="retro-fechar" aria-label="${escaparDaRetrospectiva(trDaRetrospectiva('Fechar'))}">&times;</button>
    <div class="retro-palco"></div>
    <button type="button" class="retro-lado voltar" aria-label="${escaparDaRetrospectiva(trDaRetrospectiva('Voltar'))}"></button>
    <button type="button" class="retro-lado avancar" aria-label="${escaparDaRetrospectiva(trDaRetrospectiva('Avançar'))}"></button>`;
  document.body.appendChild(caixa);
  document.body.classList.add('retro-aberta');
  caixa.querySelector('.retro-fechar').addEventListener('click', fecharRetrospectiva);
  caixa.querySelector('.retro-lado.voltar').addEventListener('click', () => irParaTelaDaRetrospectiva(estadoDaRetrospectiva.atual - 1));
  caixa.querySelector('.retro-lado.avancar').addEventListener('click', () => irParaTelaDaRetrospectiva(estadoDaRetrospectiva.atual + 1));
  document.addEventListener('keydown', teclasDaRetrospectiva);
  requestAnimationFrame(() => caixa.classList.add('aberta'));
  irParaTelaDaRetrospectiva(0);
}

function teclasDaRetrospectiva(evento) {
  if (!document.getElementById('retrospectiva')) return;
  if (evento.key === 'Escape') fecharRetrospectiva();
  else if (evento.key === 'ArrowRight') irParaTelaDaRetrospectiva(estadoDaRetrospectiva.atual + 1);
  else if (evento.key === 'ArrowLeft') irParaTelaDaRetrospectiva(estadoDaRetrospectiva.atual - 1);
}

function irParaTelaDaRetrospectiva(indice) {
  const caixa = document.getElementById('retrospectiva');
  if (!caixa) return;
  const total = estadoDaRetrospectiva.telas.length;
  if (indice >= total) return;
  const i = Math.max(0, indice);
  estadoDaRetrospectiva.atual = i;
  const tela = estadoDaRetrospectiva.telas[i];
  clearTimeout(estadoDaRetrospectiva.relogio);
  caixa.style.setProperty('--retro-cor', tela.cor);
  caixa.querySelectorAll('.retro-barras i').forEach((barra, k) => {
    barra.classList.toggle('cheia', k < i);
    barra.classList.toggle('andando', k === i && !tela.final);
  });
  const palco = caixa.querySelector('.retro-palco');
  palco.innerHTML = `<section class="retro-tela${tela.final ? ' final' : ''}">${tela.html}</section>`;
  if (typeof aplicarEstilosDaLiga === 'function') aplicarEstilosDaLiga(palco);
  palco.querySelectorAll('.retro-numero').forEach(animarNumeroDaRetrospectiva);
  if (typeof somDoAdvento === 'function' && i > 0) somDoAdvento(tela.final ? 'carta' : 'porta');
  const compartilhar = palco.querySelector('.retro-compartilhar');
  if (compartilhar) compartilhar.addEventListener('click', compartilharRetrospectiva);
  const deNovo = palco.querySelector('.retro-de-novo');
  if (deNovo) deNovo.addEventListener('click', () => irParaTelaDaRetrospectiva(0));
  caixa.querySelectorAll('.retro-lado').forEach((lado) => { lado.hidden = !!tela.final; });
  if (!tela.final) estadoDaRetrospectiva.relogio = setTimeout(() => irParaTelaDaRetrospectiva(i + 1), 6500);
}

function animarNumeroDaRetrospectiva(el) {
  const ate = Number(el.dataset.ate) || 0;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || ate === 0) { el.textContent = numeroDaRetrospectiva(ate); return; }
  const inicio = performance.now();
  const passo = (agora) => {
    if (!el.isConnected) return;
    const t = Math.min(1, (agora - inicio) / 1400);
    const suave = 1 - Math.pow(1 - t, 3);
    el.textContent = numeroDaRetrospectiva(Math.round(ate * suave));
    if (t < 1) requestAnimationFrame(passo);
  };
  requestAnimationFrame(passo);
}

function fecharRetrospectiva() {
  clearTimeout(estadoDaRetrospectiva.relogio);
  document.removeEventListener('keydown', teclasDaRetrospectiva);
  const caixa = document.getElementById('retrospectiva');
  if (caixa) caixa.remove();
  document.body.classList.remove('retro-aberta');
}

function imagemDaRetrospectiva() {
  const d = estadoDaRetrospectiva.dados || dadosDaRetrospectiva();
  const tela = document.createElement('canvas');
  tela.width = 1080;
  tela.height = 1350;
  const ctx = tela.getContext('2d');
  const fundo = ctx.createLinearGradient(0, 0, 0, 1350);
  fundo.addColorStop(0, '#0b0e2a');
  fundo.addColorStop(0.55, '#24104a');
  fundo.addColorStop(1, '#0a0c22');
  ctx.fillStyle = fundo;
  ctx.fillRect(0, 0, 1080, 1350);
  for (let i = 0; i < 90; i += 1) {
    const x = (Math.sin(i * 91.7) * 0.5 + 0.5) * 1080;
    const y = (Math.sin(i * 37.3 + 2) * 0.5 + 0.5) * 1350;
    ctx.fillStyle = `rgba(255,255,255,${0.2 + (Math.sin(i * 5.1) * 0.5 + 0.5) * 0.6})`;
    ctx.beginPath();
    ctx.arc(x, y, 1 + (Math.sin(i * 13.1) * 0.5 + 0.5) * 2.2, 0, Math.PI * 2);
    ctx.fill();
  }
  const brilho = ctx.createRadialGradient(540, 230, 0, 540, 230, 160);
  brilho.addColorStop(0, 'rgba(255,231,160,0.85)');
  brilho.addColorStop(1, 'rgba(255,231,160,0)');
  ctx.fillStyle = brilho;
  ctx.fillRect(380, 70, 320, 320);
  ctx.fillStyle = '#fff6d6';
  ctx.beginPath();
  [[540, 150], [556, 214], [620, 230], [556, 246], [540, 310], [524, 246], [460, 230], [524, 214]].forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)));
  ctx.closePath();
  ctx.fill();
  ctx.textAlign = 'center';
  ctx.fillStyle = '#f5d77a';
  ctx.font = '600 44px Georgia, serif';
  ctx.fillText('LUMINA SANCTI', 540, 400);
  ctx.fillStyle = '#fff1c4';
  ctx.font = '700 70px Georgia, serif';
  ctx.fillText(trDaRetrospectiva('Meu {ano} com os santos', { ano: RETROSPECTIVA_DO_ANO.ano }), 540, 490);
  const itens = [
    [numeroDaRetrospectiva(d.fe), trDaRetrospectiva('de Fé')],
    [numeroDaRetrospectiva(d.missoes), trDaRetrospectiva('missões')],
    [numeroDaRetrospectiva(d.trilhas.length), trDaRetrospectiva('trilhas')],
    [numeroDaRetrospectiva(d.ofensiva), trDaRetrospectiva('dias de ofensiva')],
    [numeroDaRetrospectiva(d.figurinhas), trDaRetrospectiva('figurinhas')],
    [d.posicao && typeof nomeDaDivisao === 'function' ? nomeDaDivisao(d.posicao) : '-', trDaRetrospectiva('liga')],
  ];
  itens.forEach(([valor, rotulo], i) => {
    const cx = i % 2 ? 790 : 290;
    const y = 600 + Math.floor(i / 2) * 210;
    ctx.fillStyle = 'rgba(255,255,255,0.06)';
    ctx.strokeStyle = 'rgba(245,215,122,0.45)';
    ctx.lineWidth = 3;
    const r = 28;
    const bx = cx - 230;
    const by = y;
    const bw = 460;
    const bh = 180;
    ctx.beginPath();
    ctx.moveTo(bx + r, by);
    ctx.arcTo(bx + bw, by, bx + bw, by + bh, r);
    ctx.arcTo(bx + bw, by + bh, bx, by + bh, r);
    ctx.arcTo(bx, by + bh, bx, by, r);
    ctx.arcTo(bx, by, bx + bw, by, r);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = '#ffe7a8';
    ctx.font = String(valor).length > 9 ? '700 46px Georgia, serif' : '700 70px Georgia, serif';
    ctx.fillText(String(valor), cx, y + 95);
    ctx.fillStyle = '#d9d2ef';
    ctx.font = '400 34px Arial, sans-serif';
    ctx.fillText(rotulo, cx, y + 145);
  });
  ctx.fillStyle = '#f5d77a';
  ctx.font = 'italic 40px Georgia, serif';
  ctx.fillText(trDaRetrospectiva('Que {proximo} seja ainda mais cheio de luz!', { proximo: RETROSPECTIVA_DO_ANO.ano + 1 }), 540, 1250);
  ctx.fillStyle = 'rgba(255,255,255,0.7)';
  ctx.font = '400 32px Arial, sans-serif';
  ctx.fillText('luminasancti.com', 540, 1305);
  return tela;
}

function compartilharRetrospectiva() {
  const tela = imagemDaRetrospectiva();
  const nome = `lumina-sancti-${RETROSPECTIVA_DO_ANO.ano}.png`;
  const baixar = () => {
    const link = document.createElement('a');
    link.href = tela.toDataURL('image/png');
    link.download = nome;
    document.body.appendChild(link);
    link.click();
    link.remove();
  };
  if (!tela.toBlob) { baixar(); return; }
  tela.toBlob((blob) => {
    if (!blob) { baixar(); return; }
    const arquivo = typeof File === 'function' ? new File([blob], nome, { type: 'image/png' }) : null;
    if (arquivo && navigator.canShare && navigator.canShare({ files: [arquivo] })) {
      navigator.share({ files: [arquivo], title: trDaRetrospectiva('Meu {ano} com os santos', { ano: RETROSPECTIVA_DO_ANO.ano }), text: 'luminasancti.com' }).catch(() => {});
    } else {
      baixar();
    }
  }, 'image/png');
}

function desenharRetrospectivaNoInicio() {
  const lugar = document.getElementById('retrospectiva-inicio');
  const nav = document.getElementById('nav-retrospectiva');
  const mostrar = retrospectivaNaEpoca();
  if (nav) nav.hidden = !mostrar;
  if (!lugar) return;
  lugar.hidden = !mostrar;
  if (!mostrar) { lugar.innerHTML = ''; return; }
  lugar.innerHTML = `<button type="button" class="retro-inicio"><span class="retro-inicio-estrela" aria-hidden="true"></span><span><small>${escaparDaRetrospectiva(trDaRetrospectiva('Retrospectiva'))}</small><strong>${escaparDaRetrospectiva(trDaRetrospectiva('Seu {ano} com os santos', { ano: RETROSPECTIVA_DO_ANO.ano }))}</strong><span>${escaparDaRetrospectiva(trDaRetrospectiva('Veja tudo o que você viveu este ano e compartilhe.'))}</span></span></button>`;
  lugar.querySelector('.retro-inicio').addEventListener('click', abrirRetrospectiva);
}

function iniciarRetrospectiva() {
  const nav = document.getElementById('nav-retrospectiva');
  if (nav) nav.addEventListener('click', abrirRetrospectiva);
  desenharRetrospectivaNoInicio();
  document.addEventListener('lumina-idioma', desenharRetrospectivaNoInicio);
}

document.addEventListener('DOMContentLoaded', () => {
  if (typeof rodarComSeguranca === 'function') rodarComSeguranca('retrospectiva', iniciarRetrospectiva);
  else iniciarRetrospectiva();
});
