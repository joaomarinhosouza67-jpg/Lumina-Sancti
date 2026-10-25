ENFEITES.moldura.push(
  { id: 'trigo-e-uvas', nome: 'Trigo e uvas', texto: 'O pão e o vinho da Eucaristia' },
  { id: 'aguas-do-batismo', nome: 'Águas do Batismo', texto: 'A água viva que nos faz filhos de Deus', criancas: true },
  { id: 'estrela-guia', nome: 'Estrela-guia', texto: 'Uma estrela dá a volta e mostra o caminho', criancas: true },
  { id: 'coroa-de-flores', nome: 'Coroa de flores', texto: 'Flores do campo para Nossa Senhora', criancas: true },
  { id: 'coroa-real', nome: 'Coroa real', texto: 'Ouro e pedras preciosas para a família', criancas: true, exclusivo: true },
  { id: 'resplendor', nome: 'Resplendor', texto: 'Raios de ouro e luz girando sem parar', criancas: true, exclusivo: true },
  { id: 'constelacao-da-familia', nome: 'Constelação da família', texto: 'Seis estrelas, uma para cada um da casa', criancas: true, exclusivo: true },
);
ENFEITES.faixa.push(
  { id: 'amanhecer-nas-montanhas', nome: 'Amanhecer nas montanhas', texto: 'O sol nasce atrás das montanhas' },
  { id: 'noite-de-natal', nome: 'Noite de Natal', texto: 'A estrela brilha sobre Belém' },
  { id: 'girassois', nome: 'Campo de girassóis', texto: 'Girassóis olhando para o sol', criancas: true },
  { id: 'nuvens-do-ceu', nome: 'Nuvens do céu', texto: 'Nuvens passando num céu azul', criancas: true },
  { id: 'aurora-dourada', nome: 'Aurora dourada', texto: 'Fitas de luz dançando no céu', criancas: true, exclusivo: true },
  { id: 'ceu-de-ouro', nome: 'Céu de ouro', texto: 'A cruz brilhando num céu de ouro', criancas: true, exclusivo: true },
  { id: 'vitral-da-familia', nome: 'Vitral da família', texto: 'Um vitral aceso só da família', criancas: true, exclusivo: true },
);
ENFEITES.efeito.push(
  { id: 'fogos-de-gloria', nome: 'Fogos de glória', texto: 'Fogos dourados de festa' },
  { id: 'confete', nome: 'Confete de festa', texto: 'Confete colorido caindo', criancas: true },
  { id: 'neve-de-natal', nome: 'Neve de Natal', texto: 'Flocos de neve caindo devagar', criancas: true },
  { id: 'borboletas', nome: 'Borboletas', texto: 'Borboletas voando para o alto', criancas: true },
  { id: 'chuva-de-ouro', nome: 'Chuva de ouro', texto: 'Estrelas de ouro caindo e brilhando', criancas: true, exclusivo: true },
  { id: 'coroacao', nome: 'Coroação', texto: 'Uma coroa de luz desce do céu', criancas: true, exclusivo: true },
  { id: 'fogos-do-ceu', nome: 'Fogos do céu', texto: 'Fogos em forma de estrela e coração', criancas: true, exclusivo: true },
);

function fundoDoMini(g, cima, baixo) {
  return `<defs><linearGradient id="${g}c" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${cima}"/><stop offset="1" stop-color="${baixo}"/></linearGradient></defs><rect width="64" height="40" rx="7" fill="url(#${g}c)"/>`;
}

const CODIGO_DO_CLIQUE = { vezes: 0, tempo: 0 };

function abrirJanelaDoCodigo() {
  let janela = document.getElementById('codigo-especial-modal');
  if (!janela) {
    janela = document.createElement('div');
    janela.id = 'codigo-especial-modal';
    janela.className = 'search-modal';
    janela.innerHTML = `<div class="search-modal-content codigo-especial">
      <div class="search-header"><h3>Código</h3><button type="button" class="icon-btn" id="codigo-especial-fechar" aria-label="Fechar"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg></button></div>
      <form id="codigo-especial-form" autocomplete="off">
        <input type="text" id="codigo-especial-campo" maxlength="40" autocapitalize="characters" spellcheck="false" aria-label="Código">
        <button type="submit" class="licao-botao">Usar código</button>
        <p class="codigo-especial-aviso" id="codigo-especial-aviso" role="status"></p>
      </form>
    </div>`;
    document.body.appendChild(janela);
    janela.addEventListener('click', (evento) => { if (evento.target === janela) janela.classList.remove('active'); });
    document.getElementById('codigo-especial-fechar').addEventListener('click', () => janela.classList.remove('active'));
    document.getElementById('codigo-especial-form').addEventListener('submit', usarCodigoEspecial);
  }
  document.getElementById('codigo-especial-aviso').textContent = '';
  document.getElementById('codigo-especial-campo').value = '';
  janela.classList.add('active');
  setTimeout(() => document.getElementById('codigo-especial-campo').focus(), 50);
}

async function usarCodigoEspecial(evento) {
  evento.preventDefault();
  const aviso = document.getElementById('codigo-especial-aviso');
  const codigo = document.getElementById('codigo-especial-campo').value.trim();
  if (!codigo) return;
  if (typeof contaLogada !== 'function' || !contaLogada()) {
    aviso.textContent = 'Entre na sua conta para usar o código.';
    return;
  }
  aviso.textContent = 'Conferindo...';
  try {
    const { data, error } = await supabaseCliente.rpc('usar_codigo_especial', { _codigo: codigo });
    if (error) throw error;
    if (data && data.ok) {
      if (typeof carregarContaEspecial === 'function') await carregarContaEspecial();
      aviso.textContent = 'Pronto! As animações exclusivas da família foram liberadas em Meu perfil, na opção Enfeites do perfil.';
      if (typeof renderizarEscolhaDeEnfeites === 'function' && typeof escolhaDeEnfeites !== 'undefined' && escolhaDeEnfeites) renderizarEscolhaDeEnfeites();
    } else if (data && data.espera) {
      aviso.textContent = 'Muitas tentativas. Espere uma hora e tente de novo.';
    } else {
      aviso.textContent = 'Esse código não vale para esta conta.';
    }
  } catch (e) {
    aviso.textContent = 'Não foi possível conferir agora. Tente de novo em instantes.';
  }
}

function contarToqueNaEstrelaDoRodape() {
  const agora = Date.now();
  if (agora - CODIGO_DO_CLIQUE.tempo > 1500) CODIGO_DO_CLIQUE.vezes = 0;
  CODIGO_DO_CLIQUE.tempo = agora;
  CODIGO_DO_CLIQUE.vezes += 1;
  if (CODIGO_DO_CLIQUE.vezes >= 5) {
    CODIGO_DO_CLIQUE.vezes = 0;
    abrirJanelaDoCodigo();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const estrela = document.querySelector('.site-footer .footer-icon');
  if (estrela) estrela.addEventListener('click', contarToqueNaEstrelaDoRodape);
});
