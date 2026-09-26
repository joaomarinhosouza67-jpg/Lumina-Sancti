// ============================================================
//  LUMINA SANCTI — BUSCA QUE ENTENDE O QUE A PESSOA QUIS DIZER
// ============================================================
// Usada nas Orações e no "Padroeiro de...". A pessoa não precisa
// digitar o nome exato: a busca
//   1. tira acentos, pontuação e maiúsculas ("Oração" = "oracao");
//   2. ignora palavras que não dizem nada ("estou com muito medo" vira
//      "medo");
//   3. aceita erros de digitação ("ave maira", "credu", "contrisao") e
//      variações da mesma palavra ("doente", "doentes", "doença");
//   4. entende a INTENÇÃO: cada item tem uma lista de situações (medo,
//      dormir, perdão, falecidos...) com as palavras que as pessoas
//      costumam usar para cada uma.
// Tudo roda no próprio aparelho, sem internet e sem inteligência
// artificial: é rápido e sempre dá a mesma resposta para a mesma busca.

const BuscaInteligente = (() => {
  // Palavras que sozinhas não ajudam a achar nada
  const PALAVRAS_VAZIAS = new Set((
    'a o as os um uma uns umas de da do das dos d em no na nos nas num numa por pelo pela pelos pelas ' +
    'para pra pro pras pros com sem que quem qual quais e ou mas se me te lhe lhes vos eu tu ele ela eles elas ' +
    'voce voces meu minha meus minhas teu tua seu sua seus suas nosso nossos ao aos ' +
    'estou esta estamos estao sou somos ser estar ter tenho tem temos tive tava ta ' +
    'muito muita muitos muitas mais menos ja ainda hoje agora quando como onde porque pois entao tambem so bem ' +
    'algum alguma alguns algumas nada tudo todo toda todos todas isso isto aquilo esse essa este aquele aquela ' +
    'preciso precisa precisando quero queria gostaria posso pode poderia favor ' +
    'vou vai vamos amanha ontem sempre dia dias tambem ' +
    'rezar reza rezo rezando oracao oracoes orar prece preces uma alguma ' +
    'the of for to and my me i am is prayer pray el la los las del por para mi yo oracion rezo'
  ).split(' '));

  function normalizar(texto) {
    return String(texto == null ? '' : texto)
      .toLowerCase()
      .normalize('NFD').replace(/[̀-ͯ]/g, '')
      .replace(/[^a-z0-9]+/g, ' ')
      .trim();
  }

  function palavras(texto) {
    return normalizar(texto).split(' ').filter((p) => p.length > 1 && !PALAVRAS_VAZIAS.has(p));
  }

  // Raiz simples: tira plural e a última vogal (doente/doentes -> doent)
  function raiz(palavra) {
    let p = palavra;
    if (p.length > 5 && p.endsWith('mente')) p = p.slice(0, -5);
    if (p.length > 4 && p.endsWith('coes')) p = `${p.slice(0, -4)}cao`;
    else if (p.length > 4 && p.endsWith('oes')) p = `${p.slice(0, -3)}ao`;
    else if (p.length > 4 && p.endsWith('s')) p = p.slice(0, -1);
    if (p.length > 4 && /[aeo]$/.test(p)) p = p.slice(0, -1);
    return p;
  }

  // Distância entre duas palavras contando troca de letras vizinhas
  // como um erro só ("maira" -> "maria"). Para cedo se passar do limite.
  function distancia(a, b, limite) {
    if (Math.abs(a.length - b.length) > limite) return limite + 1;
    const linhas = [];
    for (let i = 0; i <= a.length; i++) {
      linhas.push([i]);
    }
    for (let j = 1; j <= b.length; j++) linhas[0][j] = j;
    for (let i = 1; i <= a.length; i++) {
      let menorDaLinha = Infinity;
      for (let j = 1; j <= b.length; j++) {
        const custo = a[i - 1] === b[j - 1] ? 0 : 1;
        let valor = Math.min(linhas[i - 1][j] + 1, linhas[i][j - 1] + 1, linhas[i - 1][j - 1] + custo);
        if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) {
          valor = Math.min(valor, linhas[i - 2][j - 2] + 1);
        }
        linhas[i][j] = valor;
        if (valor < menorDaLinha) menorDaLinha = valor;
      }
      if (menorDaLinha > limite) return limite + 1;
    }
    return linhas[a.length][b.length];
  }

  // Quanto duas palavras se parecem: 1 = iguais, 0 = nada a ver
  function semelhanca(a, b) {
    if (a === b) return 1;
    if (raiz(a) === raiz(b)) return 0.95;
    const menor = Math.min(a.length, b.length);
    if (menor >= 4 && (a.startsWith(b) || b.startsWith(a))) return 0.85;
    let comum = 0;
    while (comum < menor && a[comum] === b[comum]) comum += 1;
    // Começo igual e comprido ("arrependi" / "arrependido"), mas não
    // "confissão" / "confiar"
    if (comum >= 5 && comum / menor >= 0.8) return 0.75;
    // Palavras curtas não aceitam erro ("medo" não pode virar "meio")
    const tolerancia = menor >= 8 ? 2 : (menor >= 5 ? 1 : 0);
    if (tolerancia && distancia(a, b, tolerancia) <= tolerancia) return 0.7;
    return 0;
  }

  function melhorSemelhanca(palavra, lista) {
    let melhor = 0;
    for (const outra of lista) {
      const s = semelhanca(palavra, outra);
      if (s > melhor) melhor = s;
      if (melhor === 1) break;
    }
    return melhor;
  }

  // Deixa uma lista de termos pronta para comparar (faz isso uma vez só)
  // As palavras que só aparecem dentro de frases ("mãe" em "mãe de
  // Deus") valem a metade: sozinhas, dizem pouco sobre a situação
  function prepararTermos(termos) {
    const frases = [];
    const soltas = [];
    const deFrases = [];
    termos.forEach((termo) => {
      const n = normalizar(termo);
      if (!n) return;
      if (n.includes(' ')) {
        frases.push(n);
        palavras(n).forEach((p) => deFrases.push(p));
      } else {
        palavras(n).forEach((p) => soltas.push(p));
      }
    });
    const unicas = Array.from(new Set(soltas));
    return { frases, palavras: unicas, palavrasDeFrases: Array.from(new Set(deFrases)).filter((p) => !unicas.includes(p)) };
  }

  // O quanto uma busca combina com um NOME (0 a 1): o nome inteiro
  // digitado vale mais do que uma palavra solta dele
  function combinarNome(consulta, nomes) {
    const normalizada = normalizar(consulta);
    const doPedido = palavras(consulta);
    if (!normalizada) return 0;
    let melhor = 0;
    nomes.forEach((nome) => {
      const n = normalizar(nome);
      const doNome = palavras(nome);
      if (!n) return;
      let nota = 0;
      if (n === normalizada) nota = 1;
      else if (doNome.length >= 2 && ` ${normalizada} `.includes(` ${n} `)) nota = 0.95;
      else if (doPedido.length && doNome.length) {
        const soma = doPedido.reduce((total, p) => total + melhorSemelhanca(p, doNome), 0);
        nota = soma / Math.max(doNome.length, doPedido.length);
      }
      if (nota > melhor) melhor = nota;
    });
    return melhor;
  }

  // O quanto uma busca combina com uma SITUAÇÃO (0 a 1): proporção das
  // palavras importantes da busca que aparecem entre as da situação
  function combinarSituacao(consulta, termosPreparados) {
    const normalizada = ` ${normalizar(consulta)} `;
    const doPedido = palavras(consulta);
    let achadas = 0;
    const usadas = new Set();
    termosPreparados.frases.forEach((frase) => {
      if (normalizada.includes(` ${frase} `)) {
        achadas += Math.max(1, palavras(frase).length);
        palavras(frase).forEach((p) => usadas.add(p));
      }
    });
    doPedido.forEach((p) => {
      if (usadas.has(p)) return;
      const inteira = melhorSemelhanca(p, termosPreparados.palavras);
      const deFrase = melhorSemelhanca(p, termosPreparados.palavrasDeFrases || []) * 0.35;
      const s = Math.max(inteira >= 0.7 ? inteira : 0, deFrase >= 0.25 ? deFrase : 0);
      achadas += s;
    });
    // Basta uma ou duas palavras certeiras: numa frase longa ("minha mãe
    // está internada no hospital"), as outras palavras não atrapalham
    const base = Math.max(1, Math.min(doPedido.length, 2));
    return Math.min(1, achadas / base);
  }

  // Busca genérica.
  //   itens: [{ id, nomes: [...], texto: '...' }]
  //   situacoes: [{ rotulo, termos: [...], itens: [ids, do mais indicado ao menos] }]
  // Devolve os itens do mais indicado ao menos, cada um com o motivo.
  function buscar(consulta, itens, situacoes, opcoes) {
    const limiteMinimo = (opcoes && opcoes.minimo) || 0.2;
    const normalizada = normalizar(consulta);
    if (!normalizada) return [];
    const trechoLongo = normalizada.split(' ').length >= 3;
    const pontos = new Map();
    itens.forEach((item) => {
      const nome = combinarNome(consulta, item.nomes || []);
      const doTexto = item.textoPreparado ? combinarSituacao(consulta, item.textoPreparado) : 0;
      // Um pedaço do próprio texto ("livrai-nos do mal") leva direto a ele
      const trecho = trechoLongo && item.textoNormalizado && item.textoNormalizado.includes(normalizada) ? 8 : 0;
      // O nome quase inteiro vale muito; uma palavra solta dele ("pai" em
      // "Glória ao Pai"), pouco — senão ela passaria na frente da intenção
      const pesoDoNome = nome >= 0.7 ? 10 : 3;
      pontos.set(item.id, { item, total: nome * pesoDoNome + doTexto + trecho, nome, motivo: null, forcaDoMotivo: 0, extras: 0 });
    });
    (situacoes || []).forEach((situacao) => {
      const nota = combinarSituacao(consulta, situacao.preparados);
      if (nota < 0.4) return;
      situacao.itens.forEach((id, posicao) => {
        const registro = pontos.get(id);
        if (!registro) return;
        const ganho = nota * 6 * Math.max(0.3, 1 - posicao * 0.15);
        // Vale a situação mais forte; as outras somam só um pouco (senão
        // uma oração que serve para tudo passaria na frente das certeiras)
        if (ganho > registro.forcaDoMotivo) {
          registro.extras += registro.forcaDoMotivo;
          registro.forcaDoMotivo = ganho;
          registro.motivo = situacao.rotulo;
        } else {
          registro.extras += ganho;
        }
      });
    });
    pontos.forEach((r) => { r.total += r.forcaDoMotivo + r.extras * 0.3; });
    return Array.from(pontos.values())
      .filter((r) => r.total >= limiteMinimo * 10)
      .sort((a, b) => b.total - a.total)
      .map((r) => ({ item: r.item, pontos: Math.round(r.total * 10) / 10, motivo: r.nome >= 0.9 ? null : r.motivo }));
  }

  // Prepara uma lista de situações (termos já normalizados)
  function prepararSituacoes(situacoes) {
    return situacoes.map((s) => Object.assign({}, s, { preparados: prepararTermos(s.termos) }));
  }

  function prepararItens(itens) {
    // No texto só contam as palavras soltas (frases ficam para as situações)
    return itens.map((i) => Object.assign({}, i, {
      textoPreparado: i.texto ? { frases: [], palavras: Array.from(new Set(palavras(i.texto))) } : null,
      textoNormalizado: i.texto ? normalizar(i.texto) : '',
    }));
  }

  return { normalizar, palavras, semelhanca, distancia, combinarNome, combinarSituacao, buscar, prepararSituacoes, prepararItens };
})();

if (typeof module !== 'undefined' && module.exports) module.exports = BuscaInteligente;
