const TEMPOS_LITURGICOS = {
  advento:        { cor: 'roxo',     nome: { pt: 'Advento', en: 'Advent', es: 'Adviento' } },
  gaudete:        { cor: 'rosa',     nome: { pt: 'Domingo Gaudete (3º do Advento)', en: 'Gaudete Sunday (3rd of Advent)', es: 'Domingo Gaudete (3º de Adviento)' } },
  natal:          { cor: 'branco',   nome: { pt: 'Tempo do Natal', en: 'Christmas Season', es: 'Tiempo de Navidad' } },
  comum:          { cor: 'verde',    nome: { pt: 'Tempo Comum', en: 'Ordinary Time', es: 'Tiempo Ordinario' } },
  quaresma:       { cor: 'roxo',     nome: { pt: 'Quaresma', en: 'Lent', es: 'Cuaresma' } },
  laetare:        { cor: 'rosa',     nome: { pt: 'Domingo Laetare (4º da Quaresma)', en: 'Laetare Sunday (4th of Lent)', es: 'Domingo Laetare (4º de Cuaresma)' } },
  ramos:          { cor: 'vermelho', nome: { pt: 'Domingo de Ramos', en: 'Palm Sunday', es: 'Domingo de Ramos' } },
  'semana-santa': { cor: 'roxo',     nome: { pt: 'Semana Santa', en: 'Holy Week', es: 'Semana Santa' } },
  'quinta-santa': { cor: 'branco',   nome: { pt: 'Quinta-feira Santa', en: 'Holy Thursday', es: 'Jueves Santo' } },
  'sexta-santa':  { cor: 'vermelho', nome: { pt: 'Sexta-feira da Paixão', en: 'Good Friday', es: 'Viernes Santo' } },
  'sabado-santo': { cor: 'roxo',     nome: { pt: 'Sábado Santo', en: 'Holy Saturday', es: 'Sábado Santo' } },
  pascoa:         { cor: 'branco',   nome: { pt: 'Tempo Pascal', en: 'Easter Season', es: 'Tiempo Pascual' } },
  pentecostes:    { cor: 'vermelho', nome: { pt: 'Pentecostes', en: 'Pentecost', es: 'Pentecostés' } },
};

const NOMES_DAS_CORES = {
  roxo:     { pt: 'roxo', en: 'purple', es: 'morado' },
  rosa:     { pt: 'rosa', en: 'rose', es: 'rosa' },
  branco:   { pt: 'branco', en: 'white', es: 'blanco' },
  verde:    { pt: 'verde', en: 'green', es: 'verde' },
  vermelho: { pt: 'vermelho', en: 'red', es: 'rojo' },
};

function numeroDoDia(ano, mes, dia) {
  return Math.round(Date.UTC(ano, mes, dia) / 86400000);
}

function diaDaSemana(numero) {
  return new Date(numero * 86400000).getUTCDay();
}

function domingoDePascoa(ano) {
  const a = ano % 19;
  const b = Math.floor(ano / 100);
  const c = ano % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const mes = Math.floor((h + l - 7 * m + 114) / 31);
  const dia = ((h + l - 7 * m + 114) % 31) + 1;
  return numeroDoDia(ano, mes - 1, dia);
}

function domingoAPartirDe(numero) {
  return numero + ((7 - diaDaSemana(numero)) % 7);
}

function inicioDoAdvento(ano) {
  return domingoAPartirDe(numeroDoDia(ano, 10, 27));
}

function batismoDoSenhor(ano) {
  const epifania = domingoAPartirDe(numeroDoDia(ano, 0, 2));
  const diaDaEpifania = epifania - numeroDoDia(ano, 0, 0);
  return diaDaEpifania >= 7 ? epifania + 1 : epifania + 7;
}

function tempoLiturgicoDoDia(data) {
  const quando = data || new Date();
  const ano = quando.getFullYear();
  const hoje = numeroDoDia(ano, quando.getMonth(), quando.getDate());

  const pascoa = domingoDePascoa(ano);
  const cinzas = pascoa - 46;
  const ramos = pascoa - 7;
  const pentecostes = pascoa + 49;
  const advento = inicioDoAdvento(ano);
  const natal = numeroDoDia(ano, 11, 25);

  let chave = 'comum';
  if (hoje <= batismoDoSenhor(ano) || hoje >= natal) chave = 'natal';
  else if (hoje >= advento) chave = hoje === advento + 14 ? 'gaudete' : 'advento';
  else if (hoje >= cinzas && hoje < ramos) chave = hoje === pascoa - 21 ? 'laetare' : 'quaresma';
  else if (hoje === ramos) chave = 'ramos';
  else if (hoje === pascoa - 3) chave = 'quinta-santa';
  else if (hoje === pascoa - 2) chave = 'sexta-santa';
  else if (hoje === pascoa - 1) chave = 'sabado-santo';
  else if (hoje > ramos && hoje < pascoa) chave = 'semana-santa';
  else if (hoje >= pascoa && hoje < pentecostes) chave = 'pascoa';
  else if (hoje === pentecostes) chave = 'pentecostes';

  return Object.assign({ chave }, TEMPOS_LITURGICOS[chave]);
}

function tempoLiturgicoAtual() {
  let parametros = null;
  try { parametros = new URLSearchParams(window.location.search); } catch (e) {  }
  if (parametros) {
    const pedido = (parametros.get('tempo') || '').toLowerCase();
    if (TEMPOS_LITURGICOS[pedido]) return Object.assign({ chave: pedido }, TEMPOS_LITURGICOS[pedido]);
    const data = /^(\d{4})-(\d{2})-(\d{2})$/.exec(parametros.get('data') || '');
    if (data) return tempoLiturgicoDoDia(new Date(Number(data[1]), Number(data[2]) - 1, Number(data[3])));
  }
  return tempoLiturgicoDoDia(new Date());
}

const PAGINAS_QUE_HERDAM = ['view-detail'];
const PAGINAS_COM_SELO = ['view-trilhas', 'view-terco', 'view-ia', 'view-oracoes', 'view-padroeiro', 'view-leitura'];

let temaDoSite = 'dourado';

function temaParaPagina(idDaPagina) {
  if (PAGINAS_QUE_HERDAM.includes(idDaPagina)) return temaDoSite;
  if (idDaPagina === 'view-home') {
    return document.body.classList.contains('catalogo-interno') ? temaDoSite : 'dourado';
  }
  if (idDaPagina === 'view-perfis') return 'dourado';
  return 'liturgico';
}

function idiomaDoTempoLiturgico() {
  return (typeof idiomaAtual !== 'undefined' && ['pt', 'en', 'es'].includes(idiomaAtual)) ? idiomaAtual : 'pt';
}

function atualizarSelosLiturgicos() {
  const tempo = tempoLiturgicoAtual();
  const idioma = idiomaDoTempoLiturgico();
  const rotulo = { pt: 'Tempo litúrgico', en: 'Liturgical season', es: 'Tiempo litúrgico' }[idioma];
  const nome = tempo.nome[idioma];
  const cor = NOMES_DAS_CORES[tempo.cor][idioma];
  document.querySelectorAll('.selo-liturgico').forEach((selo) => {
    selo.innerHTML = `<i aria-hidden="true"></i><span>${nome} · ${cor}</span>`;
    selo.setAttribute('title', `${rotulo}: ${nome}`);
    selo.setAttribute('aria-label', `${rotulo}: ${nome}, ${cor}`);
  });
}

function colocarSelosLiturgicos() {
  PAGINAS_COM_SELO.forEach((id) => {
    const pagina = document.getElementById(id);
    if (!pagina || pagina.querySelector('.selo-liturgico')) return;
    const selo = document.createElement('p');
    selo.className = 'selo-liturgico';
    const voltar = pagina.querySelector('.btn-back');
    if (voltar) voltar.insertAdjacentElement('afterend', selo);
    else (pagina.firstElementChild || pagina).prepend(selo);
  });
  atualizarSelosLiturgicos();
}

function aplicarTema(tema) {
  temaDoSite = tema === 'liturgico' ? 'liturgico' : 'dourado';
  const corpo = document.body;
  if (temaDoSite === 'liturgico') {
    const tempo = tempoLiturgicoAtual();
    corpo.dataset.tema = 'liturgico';
    corpo.dataset.corLiturgica = tempo.cor;
  } else {
    delete corpo.dataset.tema;
    delete corpo.dataset.corLiturgica;
  }
}

function aplicarTemaDaPagina(idDaPagina) {
  aplicarTema(temaParaPagina(idDaPagina));
}

document.addEventListener('DOMContentLoaded', () => {
  try {
    colocarSelosLiturgicos();
  } catch (erro) {
    console.error('Lumina Sancti — falha ao iniciar o tempo litúrgico:', erro);
  }
});

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { tempoLiturgicoDoDia, domingoDePascoa, inicioDoAdvento, batismoDoSenhor, numeroDoDia, TEMPOS_LITURGICOS };
}
