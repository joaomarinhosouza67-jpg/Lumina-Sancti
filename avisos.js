const CHAVE_DOS_AVISOS_FECHADOS = 'lumina-sancti-avisos-fechados';
let advertenciaNaTela = false;

function avisosFechados() {
  try {
    const lista = JSON.parse(localStorage.getItem(CHAVE_DOS_AVISOS_FECHADOS) || '[]');
    return Array.isArray(lista) ? lista : [];
  } catch (e) {
    return [];
  }
}

function fecharAvisoGeral(id) {
  const faixa = document.getElementById('aviso-geral');
  if (faixa) faixa.hidden = true;
  try {
    const lista = avisosFechados().filter((x) => x !== id).concat(id).slice(-20);
    localStorage.setItem(CHAVE_DOS_AVISOS_FECHADOS, JSON.stringify(lista));
  } catch (e) {
    return;
  }
}

function linkSeguroDoAviso(link) {
  try {
    const endereco = new URL(link);
    return endereco.protocol === 'https:' ? endereco.href : '';
  } catch (e) {
    return '';
  }
}

async function carregarAvisoGeral() {
  const faixa = document.getElementById('aviso-geral');
  if (!faixa || typeof supabaseCliente === 'undefined' || !supabaseCliente) return;
  let aviso = null;
  try {
    const { data, error } = await supabaseCliente.rpc('aviso_atual');
    if (!error) aviso = data;
  } catch (e) {
    aviso = null;
  }
  if (!aviso || !aviso.id || avisosFechados().includes(aviso.id)) {
    faixa.hidden = true;
    return;
  }
  const link = aviso.link ? linkSeguroDoAviso(aviso.link) : '';
  faixa.innerHTML = `
    <span class="aviso-geral-icone">${typeof icone === 'function' ? icone('estrela') : ''}</span>
    <p class="aviso-geral-texto"></p>
    ${link ? '<a class="aviso-geral-link" target="_blank" rel="noopener noreferrer">Saiba mais</a>' : ''}
    <button type="button" class="aviso-geral-fechar" aria-label="Fechar aviso"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg></button>`;
  faixa.querySelector('.aviso-geral-texto').textContent = aviso.texto;
  if (link) faixa.querySelector('.aviso-geral-link').href = link;
  faixa.querySelector('.aviso-geral-fechar').addEventListener('click', () => fecharAvisoGeral(aviso.id));
  faixa.hidden = false;
}

function janelaDaAdvertencia() {
  let modal = document.getElementById('advertencia-janela');
  if (modal) return modal;
  modal = document.createElement('div');
  modal.id = 'advertencia-janela';
  modal.className = 'search-modal';
  modal.innerHTML = `
    <div class="search-modal-content advertencia-caixa" role="alertdialog" aria-modal="true" aria-labelledby="advertencia-titulo" aria-describedby="advertencia-motivo">
      <span class="advertencia-icone">${typeof icone === 'function' ? icone('escudo') : ''}</span>
      <h3 id="advertencia-titulo">Aviso da equipe do Lumina Sancti</h3>
      <p class="advertencia-motivo" id="advertencia-motivo"></p>
      <p class="advertencia-explica">Pedimos que você siga as Regras dos Cenáculos, para que todos se sintam em casa. Se isso se repetir, a conta pode ser suspensa.</p>
      <div class="advertencia-regras cenaculo-regras-caixa" id="advertencia-texto-das-regras" hidden></div>
      <div class="advertencia-botoes">
        <button type="button" class="licao-botao" id="advertencia-entendi">Entendi</button>
        <button type="button" class="perfil-link" id="advertencia-regras">Ler as regras</button>
      </div>
    </div>`;
  document.body.appendChild(modal);
  return modal;
}

async function verificarAdvertencia() {
  if (advertenciaNaTela || typeof supabaseCliente === 'undefined' || !supabaseCliente) return;
  if (typeof contaLogada !== 'function' || !contaLogada()) return;
  if (document.body.classList.contains('modo-kids')) return;
  if (typeof membroAtivo === 'undefined' || !membroAtivo || membroAtivo.tipo !== 'adulto') return;
  let advertencia = null;
  try {
    const { data, error } = await supabaseCliente.rpc('minha_advertencia');
    if (!error) advertencia = data;
  } catch (e) {
    advertencia = null;
  }
  if (!advertencia || !advertencia.id || document.body.classList.contains('modo-kids') || !membroAtivo || membroAtivo.tipo !== 'adulto') return;
  advertenciaNaTela = true;
  const modal = janelaDaAdvertencia();
  modal.querySelector('#advertencia-motivo').textContent = advertencia.motivo;
  const entendi = modal.querySelector('#advertencia-entendi');
  const novoEntendi = entendi.cloneNode(true);
  entendi.replaceWith(novoEntendi);
  novoEntendi.addEventListener('click', async () => {
    novoEntendi.disabled = true;
    try {
      await supabaseCliente.rpc('advertencia_vista', { _id: advertencia.id });
    } catch (e) {
      novoEntendi.disabled = false;
      return;
    }
    modal.classList.remove('active');
    advertenciaNaTela = false;
    novoEntendi.disabled = false;
    verificarAdvertencia();
  });
  const regras = modal.querySelector('#advertencia-regras');
  const novasRegras = regras.cloneNode(true);
  regras.replaceWith(novasRegras);
  const caixaDasRegras = modal.querySelector('#advertencia-texto-das-regras');
  caixaDasRegras.hidden = true;
  novasRegras.hidden = typeof REGRAS_DOS_CENACULOS === 'undefined';
  novasRegras.addEventListener('click', () => {
    if (!caixaDasRegras.innerHTML) caixaDasRegras.innerHTML = REGRAS_DOS_CENACULOS;
    caixaDasRegras.hidden = !caixaDasRegras.hidden;
    novasRegras.textContent = caixaDasRegras.hidden ? 'Ler as regras' : 'Esconder as regras';
  });
  modal.classList.add('active');
  setTimeout(() => novoEntendi.focus(), 50);
}

function iniciarAvisos() {
  setTimeout(carregarAvisoGeral, 400);
  setTimeout(verificarAdvertencia, 1500);
  if (typeof supabaseCliente !== 'undefined' && supabaseCliente) {
    supabaseCliente.auth.onAuthStateChange((evento) => {
      if (evento === 'SIGNED_IN') setTimeout(verificarAdvertencia, 800);
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  if (typeof rodarComSeguranca === 'function') rodarComSeguranca('avisos da equipe', iniciarAvisos);
  else iniciarAvisos();
});
