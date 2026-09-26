// ============================================================
//  LUMINA SANCTI — TRILHAS DOS SANTOS (estilo Duolingo)
// ============================================================
// Uma trilha para cada santo, com lições curtas: múltipla escolha,
// verdadeiro ou falso e montar frases na ordem certa.
//
// As 12 trilhas e todas as perguntas abaixo foram copiadas
// exatamente do projeto que estava no Lovable.
//
// Nesta primeira fase, o progresso (Fé, Santidade, ofensiva e
// insígnias) fica salvo no próprio aparelho da pessoa. Na próxima
// fase ele passa a ser salvo na conta dela (Supabase), junto com os
// perfis estilo streaming e os rankings.
//
// Este arquivo precisa ser carregado DEPOIS do script.js — ele usa
// funções de lá, como mudarDeView, showDetail e buscarImagemSanto.

const TRILHAS_ORIGINAIS = [
  {"slug":"santo-francisco","santo":"São Francisco de Assis","titulo":"São Francisco de Assis","descricao":"O pobre de Assis que abraçou a criação inteira.","medalha":"Pobreza","virtude":"Pobreza",
   "licoes":[
    {"slug":"francisco-1","titulo":"O jovem de Assis","conteudo":[
      {"tipo":"multipla","enunciado":"Em que cidade da Itália nasceu São Francisco?","opcoes":["Assis","Roma","Pádua","Milão"],"correta":0,"explicacao":"Francisco nasceu em Assis, na Úmbria, por volta de 1181."},
      {"tipo":"vf","enunciado":"Antes da conversão, Francisco sonhava em ser cavaleiro.","correta":true,"explicacao":"Ele partiu para a guerra sonhando com glória militar antes de ouvir o chamado de Deus."}]},
    {"slug":"francisco-2","titulo":"Repara a minha Igreja","conteudo":[
      {"tipo":"multipla","enunciado":"O que o Crucifixo de São Damião pediu a Francisco?","opcoes":["Vai e repara a minha Igreja","Constrói um castelo","Volta para teu pai","Parte para Jerusalém"],"correta":0,"explicacao":"Francisco entendeu primeiro a pedra; depois compreendeu que era a Igreja viva."},
      {"tipo":"ordenar","enunciado":"Ordene a oração de São Francisco:","blocos":["Senhor, fazei-me","instrumento","da vossa paz"],"explicacao":"É a oração simples atribuída ao santo de Assis."}]},
    {"slug":"francisco-3","titulo":"Irmão sol, irmã lua","conteudo":[
      {"tipo":"multipla","enunciado":"Qual cântico de Francisco louva a Deus pelas criaturas?","opcoes":["Cântico das Criaturas","Te Deum","Magnificat","Salve Rainha"],"correta":0,"explicacao":"O Cântico do Irmão Sol louva Deus por sol, lua, água e terra."},
      {"tipo":"vf","enunciado":"São Francisco recebeu os estigmas no monte Alverne.","correta":true,"explicacao":"Em 1224 recebeu as chagas de Cristo no monte Alverne."}]}]},

  {"slug":"santo-jose","santo":"São José","titulo":"São José","descricao":"O guardião silencioso do Redentor.","medalha":"Fidelidade","virtude":"Fidelidade",
   "licoes":[
    {"slug":"jose-1","titulo":"O justo","conteudo":[
      {"tipo":"multipla","enunciado":"Qual era o ofício de São José?","opcoes":["Carpinteiro","Pescador","Escriba","Pastor"],"correta":0,"explicacao":"O Evangelho o chama de o carpinteiro."},
      {"tipo":"vf","enunciado":"Nenhuma palavra de São José é registrada nos Evangelhos.","correta":true,"explicacao":"José é o santo do silêncio obediente."}]},
    {"slug":"jose-2","titulo":"A fuga para o Egito","conteudo":[
      {"tipo":"multipla","enunciado":"Como José recebeu o aviso para fugir ao Egito?","opcoes":["Em sonho, por um anjo","Por uma carta","Por Maria","Por um profeta"],"correta":0,"explicacao":"O anjo do Senhor lhe apareceu em sonho."},
      {"tipo":"vf","enunciado":"A Sagrada Família fugiu por causa de Herodes.","correta":true,"explicacao":"Herodes mandou matar os meninos de Belém."}]},
    {"slug":"jose-3","titulo":"Padroeiro da Igreja","conteudo":[
      {"tipo":"multipla","enunciado":"São José é padroeiro de quê?","opcoes":["Da Igreja universal e da boa morte","Dos viajantes","Dos estudantes","Dos músicos"],"correta":0,"explicacao":"Pio IX o declarou padroeiro da Igreja universal em 1870."},
      {"tipo":"ordenar","enunciado":"Ordene a invocação:","blocos":["São José","protetor","da Sagrada Família"],"explicacao":"José guardou Jesus e Maria."}]}]},

  {"slug":"santa-teresinha","santo":"Santa Teresinha do Menino Jesus","titulo":"Santa Teresinha","descricao":"O pequeno caminho da confiança.","medalha":"Pequenez","virtude":"Confiança",
   "licoes":[
    {"slug":"teresinha-1","titulo":"A florzinha de Lisieux","conteudo":[
      {"tipo":"multipla","enunciado":"Em que cidade francesa Teresinha foi carmelita?","opcoes":["Lisieux","Lourdes","Paris","Nevers"],"correta":0,"explicacao":"Entrou no Carmelo de Lisieux aos 15 anos."},
      {"tipo":"vf","enunciado":"Teresinha morreu jovem, aos 24 anos.","correta":true,"explicacao":"Morreu de tuberculose em 1897."}]},
    {"slug":"teresinha-2","titulo":"O pequeno caminho","conteudo":[
      {"tipo":"multipla","enunciado":"Em que consiste o pequeno caminho?","opcoes":["Fazer coisas pequenas com grande amor","Fazer grandes penitências","Peregrinar muito","Estudar teologia"],"correta":0,"explicacao":"Santidade escondida no cotidiano, com confiança de criança."},
      {"tipo":"ordenar","enunciado":"Ordene a frase de Teresinha:","blocos":["Minha vocação","é o amor","no coração da Igreja"],"explicacao":"Frase da História de uma Alma."}]},
    {"slug":"teresinha-3","titulo":"Doutora e missionária","conteudo":[
      {"tipo":"vf","enunciado":"Teresinha é padroeira das missões mesmo sem nunca ter saído do convento.","correta":true,"explicacao":"Rezava e oferecia sacrifícios pelos missionários."},
      {"tipo":"multipla","enunciado":"Qual livro conta sua vida, escrito por ela?","opcoes":["História de uma Alma","Confissões","Castelo Interior","Imitação de Cristo"],"correta":0,"explicacao":"História de uma Alma foi publicada após sua morte."}]}]},

  {"slug":"santo-antonio","santo":"Santo Antônio de Pádua","titulo":"Santo Antônio de Pádua","descricao":"O martelo dos hereges e amigo dos pobres.","medalha":"Sabedoria","virtude":"Sabedoria",
   "licoes":[
    {"slug":"antonio-1","titulo":"De Lisboa a Pádua","conteudo":[
      {"tipo":"multipla","enunciado":"Onde nasceu Santo Antônio?","opcoes":["Lisboa","Pádua","Assis","Sevilha"],"correta":0,"explicacao":"Nasceu em Lisboa, Portugal, em 1195."},
      {"tipo":"vf","enunciado":"Santo Antônio entrou na ordem franciscana.","correta":true,"explicacao":"Deixou os cônegos agostinianos pelos franciscanos."}]},
    {"slug":"antonio-2","titulo":"Doutor evangélico","conteudo":[
      {"tipo":"multipla","enunciado":"Santo Antônio é lembrado sobretudo como?","opcoes":["Grande pregador","Rei","Eremita","Mártir"],"correta":0,"explicacao":"Sua pregação bíblica lhe valeu o título de Doutor Evangélico."},
      {"tipo":"ordenar","enunciado":"Ordene o pedido popular:","blocos":["Santo Antônio","ajudai-me a encontrar","o que perdi"],"explicacao":"É invocado como santo das coisas perdidas."}]},
    {"slug":"antonio-3","titulo":"Amigo dos pobres","conteudo":[
      {"tipo":"vf","enunciado":"O Pão dos Pobres é uma obra de caridade ligada a Santo Antônio.","correta":true,"explicacao":"A devoção sustenta obras para os necessitados."},
      {"tipo":"multipla","enunciado":"Como é comumente representado?","opcoes":["Com o Menino Jesus e um lírio","Com uma espada","Com uma coroa","Com um leão"],"correta":0,"explicacao":"O lírio simboliza pureza; o Menino, sua visão."}]}]},

  {"slug":"padre-pio","santo":"São Padre Pio","titulo":"São Padre Pio","descricao":"Reza, espera e não te preocupes.","medalha":"Penitência","virtude":"Penitência",
   "licoes":[
    {"slug":"pio-1","titulo":"O frade de Pietrelcina","conteudo":[
      {"tipo":"multipla","enunciado":"A que ordem pertencia Padre Pio?","opcoes":["Capuchinhos","Dominicanos","Jesuítas","Beneditinos"],"correta":0,"explicacao":"Foi frade capuchinho em San Giovanni Rotondo."},
      {"tipo":"vf","enunciado":"Padre Pio carregou os estigmas por cerca de 50 anos.","correta":true,"explicacao":"Recebeu as chagas em 1918."}]},
    {"slug":"pio-2","titulo":"O confessionário","conteudo":[
      {"tipo":"multipla","enunciado":"Que ministério marcou a vida de Padre Pio?","opcoes":["A confissão","O ensino universitário","A diplomacia","A música"],"correta":0,"explicacao":"Passava horas confessando peregrinos."},
      {"tipo":"ordenar","enunciado":"Ordene o conselho do santo:","blocos":["Reza,","espera","e não te preocupes"],"explicacao":"Frase famosa de Padre Pio."}]},
    {"slug":"pio-3","titulo":"Casa alívio do sofrimento","conteudo":[
      {"tipo":"vf","enunciado":"Padre Pio fundou um hospital para os doentes.","correta":true,"explicacao":"A Casa Sollievo della Sofferenza."},
      {"tipo":"multipla","enunciado":"Em que ano foi canonizado?","opcoes":["2002","1987","1968","2015"],"correta":0,"explicacao":"João Paulo II o canonizou em 2002."}]}]},

  {"slug":"nossa-senhora","santo":"Nossa Senhora","titulo":"Nossa Senhora","descricao":"O sim que abriu o Céu.","medalha":"Humildade","virtude":"Humildade",
   "licoes":[
    {"slug":"maria-1","titulo":"A Anunciação","conteudo":[
      {"tipo":"multipla","enunciado":"Qual anjo anunciou a Maria?","opcoes":["Gabriel","Miguel","Rafael","Uriel"],"correta":0,"explicacao":"O arcanjo Gabriel, em Nazaré."},
      {"tipo":"ordenar","enunciado":"Ordene a resposta de Maria:","blocos":["Eis a serva do Senhor,","faça-se em mim","segundo a vossa palavra"],"explicacao":"O fiat de Maria."}]},
    {"slug":"maria-2","titulo":"O Magnificat","conteudo":[
      {"tipo":"multipla","enunciado":"Onde Maria proclamou o Magnificat?","opcoes":["Na visita a Isabel","No Templo","Em Belém","No Calvário"],"correta":0,"explicacao":"Na Visitação a sua prima Isabel."},
      {"tipo":"vf","enunciado":"O Magnificat exalta os humildes e derruba os poderosos.","correta":true,"explicacao":"Deus derruba os poderosos de seus tronos e eleva os humildes."}]},
    {"slug":"maria-3","titulo":"Mãe da Igreja","conteudo":[
      {"tipo":"multipla","enunciado":"Quem Jesus entregou a Maria na cruz?","opcoes":["O discípulo amado","Pedro","Tiago","Nicodemos"],"correta":0,"explicacao":"Eis aí a tua mãe, disse a João."},
      {"tipo":"vf","enunciado":"O Rosário medita mistérios da vida de Jesus e Maria.","correta":true,"explicacao":"São quatro conjuntos de mistérios."}]}]},

  {"slug":"sao-bento","santo":"São Bento","titulo":"São Bento","descricao":"Ora et labora: ordem para a vida.","medalha":"Ordem","virtude":"Disciplina",
   "licoes":[
    {"slug":"bento-1","titulo":"Pai do monaquismo","conteudo":[
      {"tipo":"multipla","enunciado":"Qual lema resume a regra beneditina?","opcoes":["Ora et labora","Carpe diem","Sola fide","Veni vidi vici"],"correta":0,"explicacao":"Reza e trabalha."},
      {"tipo":"vf","enunciado":"São Bento é padroeiro da Europa.","correta":true,"explicacao":"Proclamado por Paulo VI em 1964."}]},
    {"slug":"bento-2","titulo":"A Regra","conteudo":[
      {"tipo":"multipla","enunciado":"O que a Regra de São Bento organiza?","opcoes":["A vida dos monges","O calendário civil","A liturgia oriental","As cruzadas"],"correta":0,"explicacao":"Oração, trabalho, leitura e hospitalidade."},
      {"tipo":"ordenar","enunciado":"Ordene a máxima beneditina:","blocos":["Que em tudo","Deus seja","glorificado"],"explicacao":"Ut in omnibus glorificetur Deus."}]},
    {"slug":"bento-3","titulo":"A medalha de São Bento","conteudo":[
      {"tipo":"vf","enunciado":"A medalha de São Bento traz uma oração de exorcismo abreviada.","correta":true,"explicacao":"As letras representam frases latinas de proteção."},
      {"tipo":"multipla","enunciado":"Onde São Bento fundou seu mosteiro principal?","opcoes":["Monte Cassino","Cluny","Assis","Subiaco Novo"],"correta":0,"explicacao":"Monte Cassino, na Itália."}]}]},

  {"slug":"santa-clara","santo":"Santa Clara de Assis","titulo":"Santa Clara de Assis","descricao":"A luz que escolheu o essencial.","medalha":"Pureza","virtude":"Pureza",
   "licoes":[
    {"slug":"clara-1","titulo":"A fuga de Assis","conteudo":[
      {"tipo":"multipla","enunciado":"Quem ajudou Clara a abraçar a vida religiosa?","opcoes":["São Francisco","São Bento","Santo Antônio","São Domingos"],"correta":0,"explicacao":"Francisco a acolheu na Porciúncula."},
      {"tipo":"vf","enunciado":"Clara fundou a ordem das Clarissas.","correta":true,"explicacao":"As Damas Pobres de São Damião."}]},
    {"slug":"clara-2","titulo":"A Eucaristia que defende","conteudo":[
      {"tipo":"multipla","enunciado":"Com o que Clara teria afastado invasores do convento?","opcoes":["O Santíssimo Sacramento","Uma espada","Um exército","Um muro novo"],"correta":0,"explicacao":"Ergueu a custódia diante dos soldados."},
      {"tipo":"ordenar","enunciado":"Ordene o conselho de Clara:","blocos":["Olha para Ele,","considera-O,","contempla-O"],"explicacao":"Carta a Santa Inês de Praga."}]},
    {"slug":"clara-3","titulo":"Padroeira","conteudo":[
      {"tipo":"vf","enunciado":"Santa Clara é padroeira da televisão.","correta":true,"explicacao":"Por ter visto à distância a missa estando doente."},
      {"tipo":"multipla","enunciado":"Qual era o tesouro de Clara?","opcoes":["A pobreza evangélica","O ouro","As terras","Os livros"],"correta":0,"explicacao":"Lutou pelo privilégio da pobreza."}]}]},

  {"slug":"joao-paulo-ii","santo":"São João Paulo II","titulo":"São João Paulo II","descricao":"Não tenhais medo!","medalha":"Coragem","virtude":"Coragem",
   "licoes":[
    {"slug":"jpii-1","titulo":"O papa polonês","conteudo":[
      {"tipo":"multipla","enunciado":"De que país veio João Paulo II?","opcoes":["Polônia","Itália","Alemanha","Argentina"],"correta":0,"explicacao":"Karol Wojtyła nasceu em Wadowice."},
      {"tipo":"ordenar","enunciado":"Ordene o convite do início do pontificado:","blocos":["Não tenhais medo!","Abri as portas","a Cristo"],"explicacao":"Homilia de 1978."}]},
    {"slug":"jpii-2","titulo":"Os jovens","conteudo":[
      {"tipo":"vf","enunciado":"João Paulo II criou a Jornada Mundial da Juventude.","correta":true,"explicacao":"A primeira JMJ internacional foi em 1987."},
      {"tipo":"multipla","enunciado":"Qual devoção ele difundiu com Santa Faustina?","opcoes":["Divina Misericórdia","Escapulário","Via Sacra","Novena do Natal"],"correta":0,"explicacao":"Instituiu o Domingo da Divina Misericórdia."}]},
    {"slug":"jpii-3","titulo":"Perdão e testemunho","conteudo":[
      {"tipo":"vf","enunciado":"Ele perdoou publicamente quem atentou contra sua vida.","correta":true,"explicacao":"Visitou Ali Ağca na prisão."},
      {"tipo":"multipla","enunciado":"Que mistérios do Rosário ele acrescentou?","opcoes":["Luminosos","Gloriosos","Dolorosos","Gozosos"],"correta":0,"explicacao":"Propostos em 2002."}]}]},

  {"slug":"santa-rita","santo":"Santa Rita de Cássia","titulo":"Santa Rita de Cássia","descricao":"A santa das causas impossíveis.","medalha":"Perseverança","virtude":"Perseverança",
   "licoes":[
    {"slug":"rita-1","titulo":"Esposa e mãe","conteudo":[
      {"tipo":"multipla","enunciado":"Santa Rita é invocada para quê?","opcoes":["Causas impossíveis","Viagens","Estudos","Colheitas"],"correta":0,"explicacao":"É a padroeira das causas difíceis."},
      {"tipo":"vf","enunciado":"Antes de ser religiosa, Rita foi casada e mãe.","correta":true,"explicacao":"Só entrou no convento após enviuvar."}]},
    {"slug":"rita-2","titulo":"O perdão","conteudo":[
      {"tipo":"multipla","enunciado":"O que Rita pediu quando o marido foi morto?","opcoes":["O perdão entre as famílias","Vingança","Dinheiro","Exílio"],"correta":0,"explicacao":"Pediu a paz e o fim da rixa."},
      {"tipo":"ordenar","enunciado":"Ordene a oração:","blocos":["Santa Rita,","advogada","das causas impossíveis"],"explicacao":"Invocação tradicional."}]},
    {"slug":"rita-3","titulo":"O espinho","conteudo":[
      {"tipo":"vf","enunciado":"Rita recebeu na testa a ferida de um espinho da coroa de Cristo.","correta":true,"explicacao":"Carregou a chaga por quinze anos."},
      {"tipo":"multipla","enunciado":"Em que ordem Rita entrou?","opcoes":["Agostinianas","Carmelitas","Clarissas","Dominicanas"],"correta":0,"explicacao":"No mosteiro agostiniano de Cássia."}]}]},

  {"slug":"sao-judas","santo":"São Judas Tadeu","titulo":"São Judas Tadeu","descricao":"Apóstolo da esperança.","medalha":"Esperança","virtude":"Esperança",
   "licoes":[
    {"slug":"judas-1","titulo":"O apóstolo","conteudo":[
      {"tipo":"multipla","enunciado":"São Judas Tadeu foi um dos quantos apóstolos?","opcoes":["Doze","Setenta","Três","Sete"],"correta":0,"explicacao":"Faz parte do colégio dos Doze."},
      {"tipo":"vf","enunciado":"Judas Tadeu é o mesmo que Judas Iscariotes.","correta":false,"explicacao":"São pessoas diferentes; Tadeu permaneceu fiel."}]},
    {"slug":"judas-2","titulo":"A carta","conteudo":[
      {"tipo":"multipla","enunciado":"Há no Novo Testamento uma carta atribuída a ele?","opcoes":["Sim, a Carta de Judas","Não","Duas cartas","Um evangelho"],"correta":0,"explicacao":"É uma das cartas católicas."},
      {"tipo":"ordenar","enunciado":"Ordene a invocação:","blocos":["São Judas Tadeu,","apóstolo","das causas difíceis"],"explicacao":"Devoção muito viva no Brasil."}]},
    {"slug":"judas-3","titulo":"Devoção","conteudo":[
      {"tipo":"vf","enunciado":"Sua festa é celebrada em 28 de outubro.","correta":true,"explicacao":"Junto com São Simão."},
      {"tipo":"multipla","enunciado":"Como é representado com frequência?","opcoes":["Com uma chama sobre a cabeça","Com uma âncora","Com um leão","Com um livro fechado"],"correta":0,"explicacao":"A chama recorda Pentecostes."}]}]},

  {"slug":"teresa-avila","santo":"Santa Teresa de Ávila","titulo":"Santa Teresa de Ávila","descricao":"Mestra da oração e do castelo interior.","medalha":"Oração","virtude":"Oração",
   "licoes":[
    {"slug":"avila-1","titulo":"A reformadora","conteudo":[
      {"tipo":"multipla","enunciado":"Qual ordem Santa Teresa reformou?","opcoes":["Carmelitas","Beneditinos","Franciscanos","Jesuítas"],"correta":0,"explicacao":"Fundou os Carmelitas Descalços."},
      {"tipo":"vf","enunciado":"Teresa de Ávila é Doutora da Igreja.","correta":true,"explicacao":"Primeira mulher declarada Doutora, em 1970."}]},
    {"slug":"avila-2","titulo":"Castelo interior","conteudo":[
      {"tipo":"multipla","enunciado":"O que é o Castelo Interior?","opcoes":["A alma com suas moradas","Um convento","Uma fortaleza real","Uma cidade"],"correta":0,"explicacao":"Sete moradas até a união com Deus."},
      {"tipo":"ordenar","enunciado":"Ordene o poema de Teresa:","blocos":["Nada te perturbe,","nada te espante,","só Deus basta"],"explicacao":"O marcador de páginas de Santa Teresa."}]},
    {"slug":"avila-3","titulo":"Amizade com Deus","conteudo":[
      {"tipo":"multipla","enunciado":"Como Teresa define a oração?","opcoes":["Tratar de amizade com quem sabemos que nos ama","Recitar fórmulas","Pedir bens","Guardar silêncio apenas"],"correta":0,"explicacao":"Definição clássica do Livro da Vida."},
      {"tipo":"vf","enunciado":"Teresa teve como discípulo São João da Cruz.","correta":true,"explicacao":"Juntos reformaram o Carmelo."}]}]}
];

// Atividades novas: cada missão passa de 2 para 10. As perguntas
// originais continuam intactas; estas entram depois delas.
const ATIVIDADES_EXTRAS = {
  "francisco-1": [
    {"tipo":"multipla","enunciado":"Qual era a profissão do pai de Francisco, Pietro di Bernardone?","opcoes":["Comerciante de tecidos","Ferreiro","Soldado","Agricultor"],"correta":0,"explicacao":"Pietro era um rico comerciante de tecidos de Assis."},
    {"tipo":"vf","enunciado":"Francisco ficou preso durante uma guerra entre Assis e Perúgia.","correta":true,"explicacao":"Foi prisioneiro por cerca de um ano, depois da batalha de Collestrada, em 1202."},
    {"tipo":"multipla","enunciado":"O que Francisco fez ao encontrar um leproso na estrada?","opcoes":["Abraçou-o e beijou-o","Fugiu assustado","Chamou os guardas","Jogou moedas de longe"],"correta":0,"explicacao":"Ele venceu o próprio nojo: o que era amargo se tornou doce, como contou em seu Testamento."},
    {"tipo":"ordenar","enunciado":"Ordene a vida de Francisco antes da conversão:","blocos":["Jovem rico e festeiro","Prisioneiro de guerra","Encontro com o leproso"],"explicacao":"A conversão foi acontecendo aos poucos, depois da prisão e da doença."},
    {"tipo":"vf","enunciado":"Diante do bispo de Assis, Francisco devolveu ao pai até as próprias roupas.","correta":true,"explicacao":"Renunciou à herança e disse que dali em diante só chamaria de pai o Pai do Céu."},
    {"tipo":"multipla","enunciado":"Que tipo de vida Francisco escolheu depois da conversão?","opcoes":["Pobreza total, como Jesus","Vida de nobre","Carreira militar","Comércio com o pai"],"correta":0,"explicacao":"Quis viver o Evangelho ao pé da letra, sem nada de seu."},
    {"tipo":"vf","enunciado":"Francisco nasceu numa família pobre.","correta":false,"explicacao":"Nasceu numa família rica; a pobreza foi uma escolha dele por amor a Cristo."},
    {"tipo":"multipla","enunciado":"Que nome a mãe de Francisco lhe deu no batismo?","opcoes":["Giovanni (João)","Pietro","Bernardo","Leão"],"correta":0,"explicacao":"A mãe o batizou Giovanni; o pai passou a chamá-lo de Francesco."}
  ],
  "francisco-2": [
    {"tipo":"multipla","enunciado":"O que Francisco fez primeiro depois de ouvir o Crucifixo?","opcoes":["Reconstruiu igrejinhas com as próprias mãos","Fundou uma universidade","Viajou a Roma como embaixador","Tornou-se bispo"],"correta":0,"explicacao":"Carregou pedras e restaurou São Damião e outras capelas."},
    {"tipo":"vf","enunciado":"Francisco vendeu tecidos do pai para ajudar a reconstruir São Damião.","correta":true,"explicacao":"Vendeu tecidos e um cavalo em Foligno, o que irritou muito o pai."},
    {"tipo":"multipla","enunciado":"Qual Papa aprovou a primeira regra de Francisco?","opcoes":["Inocêncio III","Gregório Magno","Leão XIII","Pio X"],"correta":0,"explicacao":"Inocêncio III aprovou a forma de vida dos frades por volta de 1209."},
    {"tipo":"vf","enunciado":"Francisco foi ordenado sacerdote.","correta":false,"explicacao":"Por humildade, permaneceu diácono a vida inteira."},
    {"tipo":"multipla","enunciado":"Como são chamados os seguidores de Francisco?","opcoes":["Franciscanos ou Frades Menores","Beneditinos","Jesuítas","Dominicanos"],"correta":0,"explicacao":"A Ordem dos Frades Menores nasceu com Francisco."},
    {"tipo":"ordenar","enunciado":"Ordene o chamado do Crucifixo:","blocos":["Francisco,","vai e repara","a minha casa"],"explicacao":"A frase continua: que, como vês, está em ruínas."},
    {"tipo":"vf","enunciado":"A pequena igreja da Porciúncula foi muito amada por Francisco.","correta":true,"explicacao":"Foi ali que a fraternidade cresceu e onde ele quis morrer."},
    {"tipo":"multipla","enunciado":"O que quer dizer Frades Menores?","opcoes":["Irmãos pequenos e humildes","Frades jovens","Frades de pouca fé","Frades de pouca altura"],"correta":0,"explicacao":"Menores porque queriam ser os últimos, a serviço de todos."}
  ],
  "francisco-3": [
    {"tipo":"multipla","enunciado":"Com que animal feroz Francisco fez as pazes na cidade de Gubbio?","opcoes":["Um lobo","Um urso","Um leão","Um javali"],"correta":0,"explicacao":"O lobo de Gubbio deixou de atacar e passou a ser alimentado pelos moradores."},
    {"tipo":"vf","enunciado":"Francisco montou o primeiro presépio vivo, em Greccio.","correta":true,"explicacao":"Foi na noite de Natal, para as pessoas verem com os olhos a humildade de Belém."},
    {"tipo":"multipla","enunciado":"Em que ano Francisco montou o presépio de Greccio?","opcoes":["1223","1098","1350","1500"],"correta":0,"explicacao":"No Natal de 1223, três anos antes de sua morte."},
    {"tipo":"vf","enunciado":"Segundo a tradição, Francisco pregou até aos pássaros.","correta":true,"explicacao":"É uma das cenas mais conhecidas de sua vida."},
    {"tipo":"multipla","enunciado":"De que Francisco é padroeiro, entre outras causas?","opcoes":["Da ecologia e dos animais","Dos banqueiros","Dos militares","Dos navegantes"],"correta":0,"explicacao":"João Paulo II o proclamou padroeiro da ecologia em 1979."},
    {"tipo":"ordenar","enunciado":"Ordene o início do Cântico das Criaturas:","blocos":["Altíssimo,","onipotente,","bom Senhor"],"explicacao":"É assim que começa o louvor do Irmão Sol."},
    {"tipo":"vf","enunciado":"Francisco chamou a morte de irmã.","correta":true,"explicacao":"No Cântico, ele louva a Deus pela irmã morte corporal."},
    {"tipo":"multipla","enunciado":"Em que ano Francisco morreu?","opcoes":["1226","1181","1300","1450"],"correta":0,"explicacao":"Morreu na Porciúncula em 3 de outubro de 1226; sua festa é no dia 4."}
  ],
  "jose-1": [
    {"tipo":"multipla","enunciado":"Como o Evangelho descreve José?","opcoes":["Homem justo","Rei poderoso","Sacerdote do Templo","Profeta"],"correta":0,"explicacao":"Mateus 1,19 o chama de homem justo."},
    {"tipo":"vf","enunciado":"José era da descendência do rei Davi.","correta":true,"explicacao":"Por isso Jesus é chamado filho de Davi."},
    {"tipo":"multipla","enunciado":"O que José pensou em fazer ao saber que Maria esperava um filho?","opcoes":["Deixá-la em segredo, sem expô-la","Denunciá-la em público","Fugir para o Egito","Procurar o sumo sacerdote"],"correta":0,"explicacao":"Justo e bondoso, não quis expô-la à vergonha."},
    {"tipo":"vf","enunciado":"Um anjo apareceu em sonho a José para explicar que o filho vinha do Espírito Santo.","correta":true,"explicacao":"É o que narra Mateus 1,20."},
    {"tipo":"multipla","enunciado":"Que nome o anjo mandou José dar ao menino?","opcoes":["Jesus","Emanuel","João","Davi"],"correta":0,"explicacao":"Jesus quer dizer Deus salva, pois ele salvaria o povo dos seus pecados."},
    {"tipo":"ordenar","enunciado":"Ordene a frase do anjo a José:","blocos":["José, filho de Davi,","não temas receber","Maria, tua esposa"],"explicacao":"Palavras de Mateus 1,20."},
    {"tipo":"vf","enunciado":"José obedeceu ao anjo e recebeu Maria em sua casa.","correta":true,"explicacao":"Mateus 1,24: fez como o anjo do Senhor havia mandado."},
    {"tipo":"multipla","enunciado":"Em que cidade Jesus nasceu, quando José e Maria foram para o recenseamento?","opcoes":["Belém","Nazaré","Jerusalém","Cafarnaum"],"correta":0,"explicacao":"Belém, a cidade de Davi."}
  ],
  "jose-2": [
    {"tipo":"multipla","enunciado":"Para que país a Sagrada Família fugiu?","opcoes":["Egito","Grécia","Pérsia","Itália"],"correta":0,"explicacao":"Fugiram para o Egito para salvar a vida do menino."},
    {"tipo":"vf","enunciado":"José só voltou do Egito depois da morte de Herodes.","correta":true,"explicacao":"O anjo avisou: já morreram os que queriam matar o menino."},
    {"tipo":"multipla","enunciado":"Em que cidade a Sagrada Família foi morar ao voltar?","opcoes":["Nazaré","Belém","Jericó","Roma"],"correta":0,"explicacao":"Foram viver em Nazaré, na Galileia."},
    {"tipo":"vf","enunciado":"Na fuga, José levou o menino e Maria durante a noite.","correta":true,"explicacao":"Mateus 2,14: levantou-se de noite e partiu."},
    {"tipo":"vf","enunciado":"José e Maria perderam o menino Jesus em Jerusalém quando ele tinha doze anos.","correta":true,"explicacao":"Lucas 2 conta que o procuraram por três dias."},
    {"tipo":"multipla","enunciado":"Onde encontraram Jesus depois de três dias?","opcoes":["No Templo, entre os doutores","No mercado","Na casa de Isabel","No deserto"],"correta":0,"explicacao":"Ele ouvia e fazia perguntas aos mestres da Lei."},
    {"tipo":"ordenar","enunciado":"Ordene os acontecimentos:","blocos":["Nascimento em Belém","Fuga para o Egito","Volta para Nazaré"],"explicacao":"José guiou a família em cada passo."},
    {"tipo":"multipla","enunciado":"Quem levou Jesus para ser apresentado no Templo, junto com Maria?","opcoes":["José","Zacarias","João Batista","Pedro"],"correta":0,"explicacao":"José e Maria o apresentaram ao Senhor, como mandava a Lei."}
  ],
  "jose-3": [
    {"tipo":"multipla","enunciado":"Em que dia a Igreja celebra a solenidade de São José?","opcoes":["19 de março","25 de dezembro","15 de agosto","1º de novembro"],"correta":0,"explicacao":"19 de março é a solenidade de São José, esposo de Maria."},
    {"tipo":"vf","enunciado":"Em 1º de maio celebramos São José Operário.","correta":true,"explicacao":"A festa lembra a dignidade do trabalho."},
    {"tipo":"multipla","enunciado":"Qual Papa criou a festa de São José Operário?","opcoes":["Pio XII","Pio IX","João XXIII","Bento XVI"],"correta":0,"explicacao":"Pio XII a instituiu em 1955."},
    {"tipo":"vf","enunciado":"São José é invocado como padroeiro da boa morte.","correta":true,"explicacao":"A tradição diz que ele morreu assistido por Jesus e Maria."},
    {"tipo":"multipla","enunciado":"Por que São José é padroeiro da boa morte?","opcoes":["A tradição diz que morreu junto de Jesus e Maria","Porque foi mártir","Porque viveu cem anos","Porque morreu em Roma"],"correta":0,"explicacao":"Não há morte mais bonita do que nos braços de Jesus e Maria."},
    {"tipo":"vf","enunciado":"O Papa Francisco escreveu a carta Com coração de pai, sobre São José.","correta":true,"explicacao":"A carta Patris corde é de 2020."},
    {"tipo":"ordenar","enunciado":"Ordene a jaculatória:","blocos":["Jesus, Maria e José,","minha alma","vossa é"],"explicacao":"Uma oração curta muito conhecida no Brasil."},
    {"tipo":"multipla","enunciado":"Que ofício, segundo o Evangelho, Jesus aprendeu em casa?","opcoes":["Carpinteiro","Pescador","Pastor","Escriba"],"correta":0,"explicacao":"Marcos 6,3 chama Jesus de o carpinteiro."}
  ],
  "teresinha-1": [
    {"tipo":"multipla","enunciado":"Qual era o nome de batismo de Santa Teresinha?","opcoes":["Marie-Françoise-Thérèse Martin","Teresa Sánchez","Marie Bernarde","Jeanne Martin"],"correta":0,"explicacao":"Nasceu Marie-Françoise-Thérèse Martin."},
    {"tipo":"vf","enunciado":"Os pais de Teresinha, Luís e Zélia Martin, também foram canonizados.","correta":true,"explicacao":"Foram proclamados santos em 2015."},
    {"tipo":"multipla","enunciado":"Em que ano nasceu Santa Teresinha?","opcoes":["1873","1800","1920","1750"],"correta":0,"explicacao":"Nasceu em 2 de janeiro de 1873."},
    {"tipo":"vf","enunciado":"Teresinha pediu ao Papa Leão XIII para entrar cedo no Carmelo.","correta":true,"explicacao":"Numa audiência em Roma, em 1887, ela fez o pedido pessoalmente."},
    {"tipo":"multipla","enunciado":"Quantas irmãs de Teresinha também se tornaram religiosas?","opcoes":["Quatro","Nenhuma","Uma","Dez"],"correta":0,"explicacao":"Marie, Pauline, Léonie e Céline: todas se consagraram a Deus."},
    {"tipo":"ordenar","enunciado":"Ordene a vida de Teresinha:","blocos":["Nasce em Alençon","Entra no Carmelo de Lisieux","Morre aos 24 anos"],"explicacao":"Uma vida curta e cheia de amor."},
    {"tipo":"vf","enunciado":"Teresinha nasceu em Alençon, na França.","correta":true,"explicacao":"Depois a família se mudou para Lisieux."},
    {"tipo":"multipla","enunciado":"Que nome religioso Teresinha recebeu no Carmelo?","opcoes":["Teresa do Menino Jesus e da Sagrada Face","Teresa de Jesus","Maria do Coração","Clara da Cruz"],"correta":0,"explicacao":"O nome une a infância de Jesus e a sua Paixão."}
  ],
  "teresinha-2": [
    {"tipo":"multipla","enunciado":"Com que invenção moderna Teresinha comparou o pequeno caminho?","opcoes":["Um elevador","Um trem","Um avião","Um relógio"],"correta":0,"explicacao":"O elevador que a levaria ao Céu eram os braços de Jesus."},
    {"tipo":"vf","enunciado":"Para Teresinha, pequenos sacrifícios oferecidos com amor agradam a Deus.","correta":true,"explicacao":"O que vale não é o tamanho do gesto, mas o amor."},
    {"tipo":"multipla","enunciado":"Como Teresinha se via diante de Deus?","opcoes":["Como uma criança nos braços do Pai","Como uma rainha","Como uma juíza","Como uma guerreira"],"correta":0,"explicacao":"A infância espiritual é confiar como uma criança."},
    {"tipo":"vf","enunciado":"Teresinha prometeu passar o seu Céu fazendo o bem na terra.","correta":true,"explicacao":"E muitos dizem receber graças por sua intercessão."},
    {"tipo":"ordenar","enunciado":"Ordene a promessa de Teresinha:","blocos":["Quero passar","o meu Céu","fazendo o bem na terra"],"explicacao":"Uma das frases mais famosas da santa."},
    {"tipo":"multipla","enunciado":"Que chuva Teresinha prometeu mandar do Céu?","opcoes":["Chuva de rosas","Chuva de estrelas","Chuva de ouro","Chuva de pão"],"correta":0,"explicacao":"As rosas simbolizam as graças que ela alcança."},
    {"tipo":"vf","enunciado":"O pequeno caminho exige fazer coisas extraordinárias.","correta":false,"explicacao":"É justamente o contrário: coisas pequenas, feitas com grande amor."},
    {"tipo":"multipla","enunciado":"Qual virtude está no centro do pequeno caminho?","opcoes":["A confiança e o amor","O medo","A fama","A riqueza"],"correta":0,"explicacao":"Confiar no amor misericordioso de Deus."}
  ],
  "teresinha-3": [
    {"tipo":"multipla","enunciado":"Qual Papa declarou Teresinha Doutora da Igreja?","opcoes":["João Paulo II","Pio X","Leão XIII","Francisco"],"correta":0,"explicacao":"Foi em 1997, cem anos depois de sua morte."},
    {"tipo":"vf","enunciado":"Teresinha é padroeira das missões junto com São Francisco Xavier.","correta":true,"explicacao":"Pio XI os proclamou padroeiros das missões em 1927."},
    {"tipo":"multipla","enunciado":"Em que ano Teresinha foi canonizada?","opcoes":["1925","1897","1965","2000"],"correta":0,"explicacao":"Pio XI a canonizou em 1925."},
    {"tipo":"vf","enunciado":"Teresinha rezava e escrevia cartas para padres missionários.","correta":true,"explicacao":"Ela os chamava de irmãos espirituais."},
    {"tipo":"multipla","enunciado":"Que doença levou Teresinha à morte?","opcoes":["Tuberculose","Gripe","Malária","Varíola"],"correta":0,"explicacao":"Sofreu muito, mas com paz e confiança."},
    {"tipo":"ordenar","enunciado":"Ordene as últimas palavras de Teresinha:","blocos":["Meu Deus,","eu vos","amo"],"explicacao":"Morreu olhando para o crucifixo, em 30 de setembro de 1897."},
    {"tipo":"vf","enunciado":"Teresinha é uma das quatro mulheres Doutoras da Igreja.","correta":true,"explicacao":"Junto com Teresa de Ávila, Catarina de Sena e Hildegarda de Bingen."},
    {"tipo":"multipla","enunciado":"Qual é a festa de Santa Teresinha?","opcoes":["1º de outubro","19 de março","13 de junho","4 de outubro"],"correta":0,"explicacao":"Celebrada em 1º de outubro."}
  ],
  "antonio-1": [
    {"tipo":"multipla","enunciado":"Qual era o nome de batismo de Santo Antônio?","opcoes":["Fernando","Francisco","Pedro","Luís"],"correta":0,"explicacao":"Chamava-se Fernando; adotou o nome Antônio ao virar franciscano."},
    {"tipo":"vf","enunciado":"Antônio decidiu ser franciscano ao ver os corpos de frades martirizados em Marrocos.","correta":true,"explicacao":"O exemplo dos cinco mártires de 1220 o marcou profundamente."},
    {"tipo":"multipla","enunciado":"Para onde Antônio partiu como missionário?","opcoes":["Marrocos","Japão","Brasil","Índia"],"correta":0,"explicacao":"Queria pregar e dar a vida por Cristo na África."},
    {"tipo":"vf","enunciado":"Uma tempestade levou o barco de Antônio até a Sicília.","correta":true,"explicacao":"Doente, voltava para casa quando o barco foi desviado para a Itália."},
    {"tipo":"multipla","enunciado":"Perto de que cidade italiana Antônio morreu?","opcoes":["Pádua","Roma","Nápoles","Veneza"],"correta":0,"explicacao":"Morreu em Arcella, junto de Pádua, em 1231."},
    {"tipo":"ordenar","enunciado":"Ordene o caminho de Antônio:","blocos":["Nasce em Lisboa","Torna-se franciscano","Morre perto de Pádua"],"explicacao":"De Portugal à Itália, sempre pregando."},
    {"tipo":"vf","enunciado":"Antônio foi canonizado menos de um ano depois de morrer.","correta":true,"explicacao":"Gregório IX o canonizou em 1232."},
    {"tipo":"multipla","enunciado":"Em que dia se celebra Santo Antônio?","opcoes":["13 de junho","24 de junho","29 de junho","8 de dezembro"],"correta":0,"explicacao":"13 de junho, abrindo as festas juninas."}
  ],
  "antonio-2": [
    {"tipo":"multipla","enunciado":"Segundo a tradição, a quem Antônio pregou quando as pessoas não quiseram ouvir?","opcoes":["Aos peixes","Às árvores","Às pedras","Aos cavalos"],"correta":0,"explicacao":"Em Rimini, os peixes teriam colocado a cabeça para fora da água para escutá-lo."},
    {"tipo":"vf","enunciado":"Antônio foi declarado Doutor da Igreja.","correta":true,"explicacao":"Pio XII o declarou Doutor em 1946."},
    {"tipo":"multipla","enunciado":"Qual o título de Antônio como Doutor da Igreja?","opcoes":["Doutor Evangélico","Doutor Angélico","Doutor Seráfico","Doutor da Graça"],"correta":0,"explicacao":"Pelo amor e conhecimento que tinha do Evangelho."},
    {"tipo":"vf","enunciado":"São Francisco pediu que Antônio ensinasse teologia aos frades.","correta":true,"explicacao":"Numa carta, Francisco o autorizou, pedindo que não apagasse o espírito de oração."},
    {"tipo":"multipla","enunciado":"Que apelido o Papa Gregório IX deu a Antônio?","opcoes":["Arca do Testamento","Martelo de Deus","Leão de Judá","Luz do Oriente"],"correta":0,"explicacao":"Porque conhecia a Bíblia quase de cor."},
    {"tipo":"ordenar","enunciado":"Ordene a pregação aos peixes:","blocos":["As pessoas não quiseram ouvir,","Antônio foi à beira do mar","e os peixes o escutaram"],"explicacao":"Uma lição sobre a dureza do coração humano."},
    {"tipo":"vf","enunciado":"Antônio sabia de memória grandes partes da Bíblia.","correta":true,"explicacao":"Sua pregação era toda tecida com a Palavra de Deus."},
    {"tipo":"multipla","enunciado":"Qual Papa declarou Antônio Doutor da Igreja?","opcoes":["Pio XII","Gregório IX","Leão XIII","João Paulo II"],"correta":0,"explicacao":"Pio XII, em 1946."}
  ],
  "antonio-3": [
    {"tipo":"multipla","enunciado":"Por que Santo Antônio é chamado de santo casamenteiro no Brasil?","opcoes":["Pela devoção popular de pedir a ele um bom casamento","Porque se casou","Porque celebrou casamentos de reis","Porque era juiz"],"correta":0,"explicacao":"É uma devoção do povo, muito viva nas festas juninas."},
    {"tipo":"vf","enunciado":"O lírio nas imagens de Santo Antônio simboliza a pureza.","correta":true,"explicacao":"Lembra sua vida casta e o coração limpo."},
    {"tipo":"multipla","enunciado":"O que a devoção popular mais pede a Santo Antônio, além de um bom casamento?","opcoes":["Encontrar objetos perdidos","Ganhar na loteria","Vencer guerras","Ficar famoso"],"correta":0,"explicacao":"É invocado como o santo das coisas perdidas."},
    {"tipo":"vf","enunciado":"Santo Antônio é muito celebrado nas festas juninas do Brasil.","correta":true,"explicacao":"Junto com São João e São Pedro."},
    {"tipo":"multipla","enunciado":"Em que mês acontecem as festas de Santo Antônio no Brasil?","opcoes":["Junho","Dezembro","Fevereiro","Abril"],"correta":0,"explicacao":"No dia 13 de junho."},
    {"tipo":"ordenar","enunciado":"Ordene os santos juninos pela data da festa:","blocos":["Santo Antônio (13)","São João (24)","São Pedro (29)"],"explicacao":"Os três grandes santos de junho."},
    {"tipo":"vf","enunciado":"O Menino Jesus nos braços de Antônio lembra uma visão que ele teve.","correta":true,"explicacao":"Segundo a tradição, o Menino apareceu a ele enquanto rezava."},
    {"tipo":"multipla","enunciado":"Em que ano Antônio morreu?","opcoes":["1231","1195","1300","1500"],"correta":0,"explicacao":"Em 13 de junho de 1231, com cerca de 36 anos."}
  ],
  "pio-1": [
    {"tipo":"multipla","enunciado":"Qual era o nome de batismo de Padre Pio?","opcoes":["Francesco Forgione","Giovanni Bosco","Pietro Martini","Angelo Roncalli"],"correta":0,"explicacao":"Nasceu Francesco Forgione, em 1887."},
    {"tipo":"vf","enunciado":"Padre Pio nasceu em Pietrelcina, no sul da Itália.","correta":true,"explicacao":"Uma pequena cidade de família camponesa."},
    {"tipo":"multipla","enunciado":"Em que ano Padre Pio recebeu os estigmas visíveis?","opcoes":["1918","1887","1950","1968"],"correta":0,"explicacao":"Em 20 de setembro de 1918."},
    {"tipo":"vf","enunciado":"Padre Pio viveu grande parte da vida em San Giovanni Rotondo.","correta":true,"explicacao":"Ali ficou por mais de cinquenta anos."},
    {"tipo":"multipla","enunciado":"Em que ano Padre Pio morreu?","opcoes":["1968","1918","1999","2002"],"correta":0,"explicacao":"Morreu em 23 de setembro de 1968."},
    {"tipo":"ordenar","enunciado":"Ordene a vida de Padre Pio:","blocos":["Nasce em Pietrelcina","Recebe os estigmas","É canonizado"],"explicacao":"De frade simples a santo do mundo inteiro."},
    {"tipo":"vf","enunciado":"Padre Pio nunca foi ordenado sacerdote.","correta":false,"explicacao":"Foi ordenado sacerdote em 1910."},
    {"tipo":"multipla","enunciado":"Qual é a festa de São Padre Pio?","opcoes":["23 de setembro","4 de outubro","25 de maio","2 de novembro"],"correta":0,"explicacao":"O dia em que ele partiu para o Céu."}
  ],
  "pio-2": [
    {"tipo":"multipla","enunciado":"Como Padre Pio chamava o Rosário?","opcoes":["A arma","O enfeite","O costume","O amuleto"],"correta":0,"explicacao":"Para ele, o Rosário era a arma do cristão."},
    {"tipo":"vf","enunciado":"Padre Pio passava muitas horas por dia atendendo confissões.","correta":true,"explicacao":"Às vezes mais de dez horas num só dia."},
    {"tipo":"multipla","enunciado":"Que grupos Padre Pio incentivou pelo mundo?","opcoes":["Grupos de Oração","Clubes de leitura","Ordens de cavalaria","Times esportivos"],"correta":0,"explicacao":"Os Grupos de Oração de Padre Pio existem até hoje em vários países."},
    {"tipo":"vf","enunciado":"Pessoas vinham de muitos países para se confessar com Padre Pio.","correta":true,"explicacao":"As filas para o confessionário eram enormes."},
    {"tipo":"multipla","enunciado":"Segundo Padre Pio, o que é a oração?","opcoes":["A melhor arma que temos","Perda de tempo","Coisa só de padres","Algo só para domingos"],"correta":0,"explicacao":"Ele dizia que a oração é a chave que abre o coração de Deus."},
    {"tipo":"ordenar","enunciado":"Ordene a frase de Padre Pio:","blocos":["A oração","é a melhor arma","que temos"],"explicacao":"Um conselho que ele repetia muitas vezes."},
    {"tipo":"vf","enunciado":"Padre Pio celebrava a Missa com grande devoção.","correta":true,"explicacao":"Muitos se emocionavam só de assistir à sua Missa."},
    {"tipo":"multipla","enunciado":"Que sacramento Padre Pio mais atendia no confessionário?","opcoes":["A Confissão","O Matrimônio","A Crisma","A Ordem"],"correta":0,"explicacao":"A Confissão, sacramento da misericórdia de Deus."}
  ],
  "pio-3": [
    {"tipo":"multipla","enunciado":"Qual Papa canonizou Padre Pio?","opcoes":["João Paulo II","Paulo VI","Bento XVI","Francisco"],"correta":0,"explicacao":"João Paulo II, em 2002."},
    {"tipo":"vf","enunciado":"A Casa Alívio do Sofrimento foi inaugurada em 1956.","correta":true,"explicacao":"O hospital foi inaugurado em 5 de maio de 1956."},
    {"tipo":"multipla","enunciado":"Onde fica a Casa Alívio do Sofrimento?","opcoes":["San Giovanni Rotondo","Roma","Assis","Pádua"],"correta":0,"explicacao":"Ao lado do convento onde Padre Pio viveu."},
    {"tipo":"vf","enunciado":"Karol Wojtyła, o futuro João Paulo II, se encontrou com Padre Pio quando era jovem padre.","correta":true,"explicacao":"Foi em 1947, quando Karol estudava em Roma."},
    {"tipo":"multipla","enunciado":"Em que ano Padre Pio foi beatificado?","opcoes":["1999","1968","1950","2010"],"correta":0,"explicacao":"Beatificado em 1999 e canonizado em 2002."},
    {"tipo":"ordenar","enunciado":"Ordene os passos até o altar:","blocos":["Morte em 1968","Beatificação em 1999","Canonização em 2002"],"explicacao":"Trinta e quatro anos depois de morrer, foi proclamado santo."},
    {"tipo":"vf","enunciado":"Peregrinos podem visitar o corpo de Padre Pio em San Giovanni Rotondo.","correta":true,"explicacao":"O santuário recebe milhões de peregrinos."},
    {"tipo":"multipla","enunciado":"Que obra de caridade Padre Pio fundou?","opcoes":["Um hospital","Uma universidade","Um banco","Um jornal"],"correta":0,"explicacao":"Para cuidar dos doentes com amor e com a melhor medicina."}
  ],
  "maria-1": [
    {"tipo":"multipla","enunciado":"Em que cidade aconteceu a Anunciação?","opcoes":["Nazaré","Belém","Jerusalém","Caná"],"correta":0,"explicacao":"Numa pequena cidade da Galileia."},
    {"tipo":"vf","enunciado":"O anjo saudou Maria dizendo: Ave, cheia de graça, o Senhor é contigo.","correta":true,"explicacao":"Lucas 1,28."},
    {"tipo":"multipla","enunciado":"Que nome o anjo disse que Maria daria ao menino?","opcoes":["Jesus","João","Davi","Moisés"],"correta":0,"explicacao":"Lucas 1,31."},
    {"tipo":"vf","enunciado":"Maria perguntou ao anjo como aquilo aconteceria.","correta":true,"explicacao":"Não por falta de fé, mas para entender e responder de coração."},
    {"tipo":"multipla","enunciado":"Qual parenta de Maria também esperava um filho?","opcoes":["Isabel","Ana","Marta","Sara"],"correta":0,"explicacao":"Isabel, que já era idosa, esperava João Batista."},
    {"tipo":"multipla","enunciado":"Em que dia a Igreja celebra a Anunciação?","opcoes":["25 de março","25 de dezembro","15 de agosto","8 de setembro"],"correta":0,"explicacao":"Nove meses antes do Natal."},
    {"tipo":"vf","enunciado":"O anjo disse a Maria que para Deus nada é impossível.","correta":true,"explicacao":"Lucas 1,37."},
    {"tipo":"ordenar","enunciado":"Ordene a saudação do anjo:","blocos":["Ave,","cheia de graça,","o Senhor é contigo"],"explicacao":"É o começo da Ave-Maria."}
  ],
  "maria-2": [
    {"tipo":"multipla","enunciado":"Como começa o cântico de Maria?","opcoes":["A minha alma engrandece o Senhor","Pai nosso que estais no céu","Glória a Deus nas alturas","Creio em Deus Pai"],"correta":0,"explicacao":"Em latim, Magnificat anima mea Dominum."},
    {"tipo":"vf","enunciado":"Ao ouvir a saudação de Maria, o menino saltou no ventre de Isabel.","correta":true,"explicacao":"João Batista já se alegrava com a chegada de Jesus."},
    {"tipo":"multipla","enunciado":"Que filho Isabel esperava?","opcoes":["João Batista","Tiago","André","Pedro"],"correta":0,"explicacao":"O precursor que prepararia o caminho de Jesus."},
    {"tipo":"vf","enunciado":"Isabel chamou Maria de bendita entre as mulheres.","correta":true,"explicacao":"Lucas 1,42."},
    {"tipo":"ordenar","enunciado":"Ordene o início do Magnificat:","blocos":["A minha alma","engrandece","o Senhor"],"explicacao":"Maria louva a Deus pelas maravilhas que fez nela."},
    {"tipo":"multipla","enunciado":"Quanto tempo Maria ficou com Isabel?","opcoes":["Cerca de três meses","Um dia","Dez anos","Uma semana"],"correta":0,"explicacao":"Lucas 1,56."},
    {"tipo":"vf","enunciado":"No Magnificat, Maria diz que todas as gerações a chamarão bem-aventurada.","correta":true,"explicacao":"Lucas 1,48."},
    {"tipo":"multipla","enunciado":"Em que dia se celebra a Visitação de Nossa Senhora?","opcoes":["31 de maio","2 de fevereiro","1º de janeiro","12 de outubro"],"correta":0,"explicacao":"Encerrando o mês de maio, dedicado a Maria."}
  ],
  "maria-3": [
    {"tipo":"multipla","enunciado":"Qual é a padroeira do Brasil?","opcoes":["Nossa Senhora Aparecida","Nossa Senhora de Fátima","Nossa Senhora de Lourdes","Nossa Senhora de Guadalupe"],"correta":0,"explicacao":"A imagem foi encontrada por pescadores no rio Paraíba do Sul."},
    {"tipo":"vf","enunciado":"A festa de Nossa Senhora Aparecida é em 12 de outubro.","correta":true,"explicacao":"É feriado nacional no Brasil."},
    {"tipo":"multipla","enunciado":"Em Fátima, Nossa Senhora apareceu a quantos pastorinhos?","opcoes":["Três","Um","Doze","Sete"],"correta":0,"explicacao":"Lúcia, Francisco e Jacinta, em 1917."},
    {"tipo":"vf","enunciado":"A Assunção ensina que Maria foi levada ao Céu de corpo e alma.","correta":true,"explicacao":"É um dogma proclamado por Pio XII em 1950."},
    {"tipo":"multipla","enunciado":"Em que dia se celebra a Assunção de Nossa Senhora?","opcoes":["15 de agosto","8 de dezembro","25 de março","1º de maio"],"correta":0,"explicacao":"No Brasil, a solenidade costuma ser no domingo seguinte."},
    {"tipo":"ordenar","enunciado":"Ordene o pedido de Maria em Caná:","blocos":["Fazei","tudo o que","Ele vos disser"],"explicacao":"João 2,5: o conselho de Maria para todos nós."},
    {"tipo":"vf","enunciado":"Em Lourdes, Nossa Senhora apareceu a Santa Bernadete.","correta":true,"explicacao":"Foram dezoito aparições, em 1858."},
    {"tipo":"multipla","enunciado":"O que celebramos em 8 de dezembro?","opcoes":["A Imaculada Conceição","A Assunção","A Anunciação","A Natividade de Maria"],"correta":0,"explicacao":"Maria foi preservada do pecado original desde a sua concepção."}
  ],
  "bento-1": [
    {"tipo":"multipla","enunciado":"Em que cidade italiana nasceu São Bento?","opcoes":["Núrsia","Assis","Milão","Nápoles"],"correta":0,"explicacao":"Núrsia, hoje Norcia, na Úmbria."},
    {"tipo":"vf","enunciado":"Segundo a tradição, Bento tinha uma irmã gêmea, Santa Escolástica.","correta":true,"explicacao":"Ela também se consagrou a Deus."},
    {"tipo":"multipla","enunciado":"Onde Bento viveu como eremita, numa gruta?","opcoes":["Subiaco","Cluny","Lisboa","Paris"],"correta":0,"explicacao":"Viveu três anos numa gruta perto de Subiaco."},
    {"tipo":"vf","enunciado":"Bento deixou os estudos em Roma para buscar a Deus na solidão.","correta":true,"explicacao":"Não quis se perder na vida desregrada da cidade."},
    {"tipo":"multipla","enunciado":"Em que século viveu São Bento?","opcoes":["Século VI","Século XIII","Século I","Século XIX"],"correta":0,"explicacao":"Viveu por volta de 480 a 547."},
    {"tipo":"ordenar","enunciado":"Ordene a vida de Bento:","blocos":["Estudos em Roma","Eremita em Subiaco","Mosteiro de Monte Cassino"],"explicacao":"Da solidão nasceu uma grande família de monges."},
    {"tipo":"vf","enunciado":"A festa de São Bento é em 11 de julho.","correta":true,"explicacao":"Celebrada em 11 de julho."},
    {"tipo":"multipla","enunciado":"Qual Papa proclamou São Bento padroeiro da Europa?","opcoes":["Paulo VI","Pio IX","João XXIII","Gregório Magno"],"correta":0,"explicacao":"Paulo VI, em 1964."}
  ],
  "bento-2": [
    {"tipo":"multipla","enunciado":"Qual é a primeira palavra da Regra de São Bento?","opcoes":["Escuta","Reza","Trabalha","Cala"],"correta":0,"explicacao":"A Regra começa com: Escuta, filho."},
    {"tipo":"vf","enunciado":"A Regra de São Bento é usada até hoje por muitos mosteiros.","correta":true,"explicacao":"Há quase 1500 anos ela guia monges e monjas."},
    {"tipo":"multipla","enunciado":"Segundo a Regra, como os hóspedes devem ser recebidos?","opcoes":["Como o próprio Cristo","Com desconfiança","Só se pagarem","Só aos domingos"],"correta":0,"explicacao":"A hospitalidade é sinal de amor a Cristo."},
    {"tipo":"vf","enunciado":"A Regra ensina que nada deve vir antes da oração, a Obra de Deus.","correta":true,"explicacao":"Nada se anteponha à Obra de Deus, diz o capítulo 43."},
    {"tipo":"multipla","enunciado":"Como se chama o superior de um mosteiro beneditino?","opcoes":["Abade","Cardeal","Bispo","Diácono"],"correta":0,"explicacao":"Abade vem de abbá, pai."},
    {"tipo":"ordenar","enunciado":"Ordene o início da Regra:","blocos":["Escuta, filho,","os preceitos","do mestre"],"explicacao":"Um convite a ouvir com o coração."},
    {"tipo":"vf","enunciado":"Os monges beneditinos fazem voto de estabilidade, ligando-se ao seu mosteiro.","correta":true,"explicacao":"Assim aprendem a buscar a Deus no mesmo lugar, com a mesma comunidade."},
    {"tipo":"multipla","enunciado":"Quantos capítulos tem a Regra de São Bento?","opcoes":["73","10","150","365"],"correta":0,"explicacao":"São 73 capítulos, com um prólogo."}
  ],
  "bento-3": [
    {"tipo":"multipla","enunciado":"O que significam as letras C.S.P.B. na medalha?","opcoes":["Cruz do Santo Pai Bento","Cristo Salva Pelo Batismo","Caridade, Santidade, Paz e Bem","Casa de São Pedro e Bento"],"correta":0,"explicacao":"Do latim Crux Sancti Patris Benedicti."},
    {"tipo":"vf","enunciado":"Na medalha está a frase latina Vade retro satana: afasta-te, satanás.","correta":true,"explicacao":"É uma antiga oração contra o mal."},
    {"tipo":"multipla","enunciado":"Segundo a tradição, como Bento escapou de um cálice envenenado?","opcoes":["Fez o sinal da cruz e o cálice se partiu","Jogou o cálice no rio","Bebeu e nada aconteceu","Um anjo levou o cálice"],"correta":0,"explicacao":"A história é contada por São Gregório Magno."},
    {"tipo":"vf","enunciado":"O corvo nas imagens de São Bento lembra a história do pão envenenado.","correta":true,"explicacao":"O corvo levou para longe o pão que tentaram lhe dar."},
    {"tipo":"multipla","enunciado":"Quem escreveu a vida de São Bento nos Diálogos?","opcoes":["São Gregório Magno","Santo Agostinho","São Jerônimo","Santo Tomás de Aquino"],"correta":0,"explicacao":"O Papa Gregório Magno, no século VI."},
    {"tipo":"ordenar","enunciado":"Ordene a frase gravada na cruz da medalha:","blocos":["A santa cruz","seja a minha","luz"],"explicacao":"Em latim: Crux sacra sit mihi lux."},
    {"tipo":"vf","enunciado":"A medalha de São Bento é um sacramental da Igreja.","correta":true,"explicacao":"Sacramentais ajudam a viver a fé, mas não são amuletos."},
    {"tipo":"multipla","enunciado":"Para que serve um sacramental como a medalha?","opcoes":["Lembrar de Deus e pedir sua proteção","Ter sorte no jogo","Adivinhar o futuro","Ficar rico"],"correta":0,"explicacao":"Ele nos leva a rezar e confiar em Deus."}
  ],
  "clara-1": [
    {"tipo":"multipla","enunciado":"De que tipo de família Clara vinha?","opcoes":["Nobre e rica","Camponesa e pobre","De pescadores","De soldados"],"correta":0,"explicacao":"Deixou uma vida de conforto para seguir Cristo pobre."},
    {"tipo":"vf","enunciado":"Clara fugiu de casa na noite do Domingo de Ramos para seguir Cristo.","correta":true,"explicacao":"Foi em 1212, com 18 anos."},
    {"tipo":"multipla","enunciado":"Em que ano Clara deixou tudo para seguir Cristo?","opcoes":["1212","1181","1300","1500"],"correta":0,"explicacao":"Na Semana Santa de 1212."},
    {"tipo":"vf","enunciado":"Francisco cortou os cabelos de Clara como sinal de consagração.","correta":true,"explicacao":"Aconteceu na Porciúncula, naquela mesma noite."},
    {"tipo":"multipla","enunciado":"Qual irmã de Clara também a seguiu na vida religiosa?","opcoes":["Santa Inês de Assis","Santa Mônica","Santa Rita","Santa Ana"],"correta":0,"explicacao":"Inês a seguiu poucos dias depois."},
    {"tipo":"ordenar","enunciado":"Ordene a noite da fuga de Clara:","blocos":["Sai de casa à noite","Encontra Francisco na Porciúncula","Consagra-se a Deus"],"explicacao":"Uma decisão corajosa por amor a Jesus."},
    {"tipo":"vf","enunciado":"Clara viveu por mais de 40 anos em São Damião.","correta":true,"explicacao":"De 1212 até a morte, em 1253."},
    {"tipo":"multipla","enunciado":"Como eram chamadas as primeiras irmãs de Clara?","opcoes":["Damas Pobres","Irmãs da Caridade","Carmelitas","Beneditinas"],"correta":0,"explicacao":"As Damas Pobres de São Damião."}
  ],
  "clara-2": [
    {"tipo":"multipla","enunciado":"Quem eram os soldados que atacaram o convento de Clara?","opcoes":["Sarracenos a serviço do imperador","Vikings","Romanos antigos","Cavaleiros franceses"],"correta":0,"explicacao":"Soldados sarracenos a serviço de Frederico II, por volta de 1240."},
    {"tipo":"vf","enunciado":"Mesmo doente, Clara enfrentou os invasores com a Eucaristia.","correta":true,"explicacao":"Confiou em Jesus presente no Santíssimo Sacramento."},
    {"tipo":"multipla","enunciado":"Com quem Clara trocava cartas cheias de conselhos espirituais?","opcoes":["Santa Inês de Praga","Santa Teresa de Ávila","Santa Mônica","Santa Joana d'Arc"],"correta":0,"explicacao":"Inês, uma princesa que também escolheu a pobreza."},
    {"tipo":"vf","enunciado":"Clara foi a primeira mulher a escrever uma regra de vida religiosa aprovada pelo Papa.","correta":true,"explicacao":"Uma regra centrada na pobreza e na oração."},
    {"tipo":"multipla","enunciado":"Que privilégio Clara defendeu a vida toda?","opcoes":["O privilégio da pobreza","O privilégio da riqueza","O privilégio de viajar","O privilégio de governar"],"correta":0,"explicacao":"O direito de viver sem posses, confiando só em Deus."},
    {"tipo":"ordenar","enunciado":"Ordene a defesa do convento:","blocos":["Soldados cercam o mosteiro","Clara ergue o Santíssimo","Os invasores fogem"],"explicacao":"Uma vitória da fé, não das armas."},
    {"tipo":"vf","enunciado":"A regra de Clara foi aprovada pouco antes de sua morte.","correta":true,"explicacao":"Aprovada em 1253, dois dias antes de ela morrer."},
    {"tipo":"multipla","enunciado":"Em que ano Santa Clara morreu?","opcoes":["1253","1226","1300","1212"],"correta":0,"explicacao":"Em 11 de agosto de 1253."}
  ],
  "clara-3": [
    {"tipo":"multipla","enunciado":"Qual Papa proclamou Santa Clara padroeira da televisão?","opcoes":["Pio XII","Pio IX","Leão XIII","João Paulo II"],"correta":0,"explicacao":"Pio XII, em 1958."},
    {"tipo":"vf","enunciado":"Santa Clara é celebrada em 11 de agosto.","correta":true,"explicacao":"O dia de sua morte."},
    {"tipo":"multipla","enunciado":"O nome Clara lembra qual palavra?","opcoes":["Luz e claridade","Força","Riqueza","Silêncio"],"correta":0,"explicacao":"Uma vida que iluminou muitas outras."},
    {"tipo":"vf","enunciado":"Clara foi canonizada apenas dois anos depois de morrer.","correta":true,"explicacao":"Canonizada em 1255."},
    {"tipo":"multipla","enunciado":"Como se chama a ordem fundada por Clara?","opcoes":["Ordem de Santa Clara, as Clarissas","Ordem dos Pregadores","Companhia de Jesus","Ordem de São Bento"],"correta":0,"explicacao":"As Clarissas estão hoje no mundo inteiro."},
    {"tipo":"ordenar","enunciado":"Ordene a vida de Clara:","blocos":["Deixa a família rica","Vive em São Damião","É proclamada santa"],"explicacao":"Pobreza, oração e alegria."},
    {"tipo":"vf","enunciado":"Clara e Francisco foram grandes amigos na fé.","correta":true,"explicacao":"Uma amizade santa, toda voltada para Deus."},
    {"tipo":"multipla","enunciado":"O que Clara via como a maior riqueza?","opcoes":["Jesus pobre e crucificado","As joias da família","Os títulos de nobreza","As terras da família"],"correta":0,"explicacao":"Para ela, quem tem Jesus tem tudo."}
  ],
  "jpii-1": [
    {"tipo":"multipla","enunciado":"Qual era o nome de batismo de João Paulo II?","opcoes":["Karol Wojtyła","Joseph Ratzinger","Angelo Roncalli","Giovanni Montini"],"correta":0,"explicacao":"Karol Józef Wojtyła."},
    {"tipo":"vf","enunciado":"Durante a guerra, Karol trabalhou numa pedreira e numa fábrica.","correta":true,"explicacao":"Conheceu de perto a vida dos operários."},
    {"tipo":"multipla","enunciado":"Em que ano ele foi eleito Papa?","opcoes":["1978","1958","2005","1963"],"correta":0,"explicacao":"Em 16 de outubro de 1978."},
    {"tipo":"vf","enunciado":"Karol gostava de teatro e de esportes como esqui e canoagem.","correta":true,"explicacao":"Foi ator na juventude e sempre amou a natureza."},
    {"tipo":"multipla","enunciado":"Qual era a sua cidade natal?","opcoes":["Wadowice","Cracóvia","Varsóvia","Roma"],"correta":0,"explicacao":"Nasceu em Wadowice, em 1920."},
    {"tipo":"ordenar","enunciado":"Ordene a vida de Karol:","blocos":["Nasce em Wadowice","Arcebispo de Cracóvia","Papa em 1978"],"explicacao":"Da Polônia para o mundo inteiro."},
    {"tipo":"vf","enunciado":"Seu pontificado foi um dos mais longos da história, com quase 27 anos.","correta":true,"explicacao":"De 1978 a 2005."},
    {"tipo":"multipla","enunciado":"Em que ano João Paulo II morreu?","opcoes":["2005","1999","2010","2014"],"correta":0,"explicacao":"Em 2 de abril de 2005, véspera do Domingo da Divina Misericórdia."}
  ],
  "jpii-2": [
    {"tipo":"multipla","enunciado":"Qual santa polonesa, ligada à Divina Misericórdia, ele canonizou?","opcoes":["Santa Faustina Kowalska","Santa Teresinha","Santa Edith Stein","Santa Hedwig"],"correta":0,"explicacao":"Canonizada no ano 2000."},
    {"tipo":"vf","enunciado":"João Paulo II visitou o Brasil mais de uma vez.","correta":true,"explicacao":"Esteve no Brasil em 1980, 1991 e 1997."},
    {"tipo":"multipla","enunciado":"Quantas vezes João Paulo II veio ao Brasil?","opcoes":["Três","Uma","Dez","Nenhuma"],"correta":0,"explicacao":"Três viagens apostólicas."},
    {"tipo":"vf","enunciado":"Ele chamou os jovens de sentinelas da manhã.","correta":true,"explicacao":"Na Jornada Mundial da Juventude do ano 2000, em Roma."},
    {"tipo":"multipla","enunciado":"Em que ano foi instituído o Domingo da Divina Misericórdia?","opcoes":["2000","1978","1987","2005"],"correta":0,"explicacao":"No mesmo dia da canonização de Santa Faustina."},
    {"tipo":"ordenar","enunciado":"Ordene a frase aos jovens:","blocos":["Vós sois","a esperança","da Igreja"],"explicacao":"Ele confiava muito na juventude."},
    {"tipo":"vf","enunciado":"João Paulo II canonizou muitos santos, mostrando que a santidade é possível hoje.","correta":true,"explicacao":"Canonizou centenas de santos de todos os continentes."},
    {"tipo":"multipla","enunciado":"Como ficou conhecido o seu ensinamento sobre o amor humano?","opcoes":["Teologia do Corpo","Suma Teológica","Confissões","Imitação de Cristo"],"correta":0,"explicacao":"Uma série de catequeses dadas entre 1979 e 1984."}
  ],
  "jpii-3": [
    {"tipo":"multipla","enunciado":"Em que ano João Paulo II sofreu o atentado na Praça São Pedro?","opcoes":["1981","1978","1995","2001"],"correta":0,"explicacao":"Em 13 de maio de 1981."},
    {"tipo":"vf","enunciado":"O atentado aconteceu em 13 de maio, dia de Nossa Senhora de Fátima.","correta":true,"explicacao":"Ele viu nisso um sinal da proteção de Maria."},
    {"tipo":"multipla","enunciado":"A quem o Papa atribuiu ter sobrevivido ao atentado?","opcoes":["A Nossa Senhora de Fátima","Só aos médicos","À sorte","A um guarda-costas"],"correta":0,"explicacao":"Disse que uma mão disparou e outra guiou a bala."},
    {"tipo":"vf","enunciado":"A bala do atentado foi colocada na coroa de Nossa Senhora de Fátima.","correta":true,"explicacao":"Ele a ofereceu ao santuário como agradecimento."},
    {"tipo":"multipla","enunciado":"Em que ano João Paulo II foi canonizado?","opcoes":["2014","2005","2011","2020"],"correta":0,"explicacao":"Em 27 de abril de 2014."},
    {"tipo":"ordenar","enunciado":"Ordene os passos até o altar:","blocos":["Morre em 2005","Beatificado em 2011","Canonizado em 2014"],"explicacao":"O povo já gritava santo súbito no seu funeral."},
    {"tipo":"vf","enunciado":"Ele foi canonizado no mesmo dia que São João XXIII.","correta":true,"explicacao":"Uma cerimônia com dois Papas santos."},
    {"tipo":"multipla","enunciado":"Qual é a festa de São João Paulo II?","opcoes":["22 de outubro","2 de abril","13 de maio","1º de novembro"],"correta":0,"explicacao":"O dia do início do seu pontificado, em 1978."}
  ],
  "rita-1": [
    {"tipo":"multipla","enunciado":"Em que país nasceu Santa Rita?","opcoes":["Itália","Espanha","Portugal","França"],"correta":0,"explicacao":"Em Roccaporena, perto de Cássia."},
    {"tipo":"vf","enunciado":"Rita queria ser religiosa desde jovem, mas seus pais arranjaram seu casamento.","correta":true,"explicacao":"Ela obedeceu e viveu o casamento com fé."},
    {"tipo":"multipla","enunciado":"Como era o marido de Rita no começo do casamento?","opcoes":["Violento e difícil","Muito calmo","Tímido","Brincalhão"],"correta":0,"explicacao":"A tradição diz que ele tinha um gênio muito forte."},
    {"tipo":"vf","enunciado":"Com paciência e oração, Rita ajudou o marido a mudar de vida.","correta":true,"explicacao":"A mansidão dela tocou o coração dele."},
    {"tipo":"multipla","enunciado":"Quantos filhos Rita teve, segundo a tradição?","opcoes":["Dois","Um","Cinco","Nenhum"],"correta":0,"explicacao":"Dois meninos, que ela educou na fé."},
    {"tipo":"ordenar","enunciado":"Ordene a vida de Rita:","blocos":["Esposa e mãe","Viúva","Religiosa agostiniana"],"explicacao":"Santa em todas as fases da vida."},
    {"tipo":"vf","enunciado":"Santa Rita é celebrada em 22 de maio.","correta":true,"explicacao":"O dia de sua morte, em 1457."},
    {"tipo":"multipla","enunciado":"Qual flor é símbolo de Santa Rita?","opcoes":["A rosa","O girassol","A tulipa","O cravo"],"correta":0,"explicacao":"Por causa da rosa que floresceu no inverno."}
  ],
  "rita-2": [
    {"tipo":"multipla","enunciado":"O que aconteceu com o marido de Rita?","opcoes":["Foi assassinado numa briga entre famílias","Tornou-se monge","Mudou-se para longe","Virou rei"],"correta":0,"explicacao":"Uma rixa entre famílias tirou a vida dele."},
    {"tipo":"vf","enunciado":"Rita perdoou os assassinos do marido.","correta":true,"explicacao":"Escolheu o perdão em vez do ódio."},
    {"tipo":"multipla","enunciado":"O que Rita pediu a Deus para que os filhos não se vingassem?","opcoes":["Que Deus os levasse antes de cometerem esse pecado","Que ficassem ricos","Que fossem para a guerra","Que esquecessem o pai"],"correta":0,"explicacao":"Segundo a tradição, os dois morreram de doença, em paz com Deus."},
    {"tipo":"vf","enunciado":"Rita conseguiu reconciliar as famílias inimigas.","correta":true,"explicacao":"A tradição diz que essa foi a condição para entrar no convento."},
    {"tipo":"multipla","enunciado":"Qual virtude é mais lembrada na vida de Rita?","opcoes":["O perdão","A vaidade","A pressa","A ambição"],"correta":0,"explicacao":"O perdão que quebra o ciclo da vingança."},
    {"tipo":"ordenar","enunciado":"Ordene o caminho do perdão:","blocos":["Rita sofre a perda,","reza e perdoa","e promove a paz"],"explicacao":"O perdão começa na oração."},
    {"tipo":"vf","enunciado":"Perdoar não significa aprovar o mal, e sim não guardar ódio no coração.","correta":true,"explicacao":"O perdão cura quem perdoa."},
    {"tipo":"multipla","enunciado":"Segundo a tradição, qual foi a condição para Rita entrar no convento?","opcoes":["Reconciliar as famílias rivais","Pagar um dote alto","Aprender latim","Esperar dez anos"],"correta":0,"explicacao":"Só depois da paz entre as famílias ela foi aceita."}
  ],
  "rita-3": [
    {"tipo":"multipla","enunciado":"Em que cidade fica o mosteiro de Santa Rita?","opcoes":["Cássia","Roma","Assis","Veneza"],"correta":0,"explicacao":"Por isso ela é chamada Rita de Cássia."},
    {"tipo":"vf","enunciado":"Segundo a tradição, uma rosa floresceu no inverno a pedido de Rita doente.","correta":true,"explicacao":"Foi encontrada no jardim da casa onde ela nasceu."},
    {"tipo":"multipla","enunciado":"Que frutos, segundo a tradição, também apareceram no inverno para Rita?","opcoes":["Figos","Uvas","Maçãs","Laranjas"],"correta":0,"explicacao":"Dois figos maduros, junto com a rosa."},
    {"tipo":"vf","enunciado":"O corpo de Santa Rita é venerado em Cássia.","correta":true,"explicacao":"No santuário construído em sua honra."},
    {"tipo":"multipla","enunciado":"Em que ano Santa Rita foi canonizada?","opcoes":["1900","1457","1600","1990"],"correta":0,"explicacao":"Em 24 de maio de 1900."},
    {"tipo":"ordenar","enunciado":"Ordene a oração de Rita diante do Crucifixo:","blocos":["Rita reza","diante de Jesus crucificado","e recebe o espinho"],"explicacao":"Ela quis participar das dores de Cristo."},
    {"tipo":"vf","enunciado":"Santa Rita viveu no século XV.","correta":true,"explicacao":"Viveu por volta de 1381 a 1457."},
    {"tipo":"multipla","enunciado":"Qual Papa canonizou Santa Rita?","opcoes":["Leão XIII","Pio X","João Paulo II","Pio XII"],"correta":0,"explicacao":"Leão XIII, no ano jubilar de 1900."}
  ],
  "judas-1": [
    {"tipo":"multipla","enunciado":"Com qual apóstolo Judas Tadeu é celebrado no mesmo dia?","opcoes":["São Simão","São Pedro","São João","São Tomé"],"correta":0,"explicacao":"Os dois são celebrados juntos em 28 de outubro."},
    {"tipo":"vf","enunciado":"Na Última Ceia, Judas Tadeu fez uma pergunta a Jesus.","correta":true,"explicacao":"João 14,22 fala de Judas, não o Iscariotes."},
    {"tipo":"multipla","enunciado":"O que Judas, não o Iscariotes, perguntou a Jesus na Última Ceia?","opcoes":["Por que se manifestaria a eles e não ao mundo","Onde seria a ceia","Quando voltaria","Quem o trairia"],"correta":0,"explicacao":"Jesus respondeu que viria morar em quem o ama."},
    {"tipo":"vf","enunciado":"O nome Tadeu ajuda a distinguir este apóstolo de Judas Iscariotes.","correta":true,"explicacao":"Assim ninguém confunde o apóstolo fiel com o traidor."},
    {"tipo":"multipla","enunciado":"Segundo a tradição, como Judas Tadeu morreu?","opcoes":["Como mártir","De velhice em Roma","Num naufrágio","Na prisão de Jerusalém"],"correta":0,"explicacao":"Deu a vida pelo Evangelho."},
    {"tipo":"ordenar","enunciado":"Ordene a pergunta da Última Ceia:","blocos":["Senhor, por que","te manifestarás a nós","e não ao mundo?"],"explicacao":"João 14,22."},
    {"tipo":"vf","enunciado":"Segundo a tradição, Judas Tadeu era parente de Jesus.","correta":true,"explicacao":"Muitos o consideram primo do Senhor."},
    {"tipo":"multipla","enunciado":"Como Lucas chama Judas Tadeu na lista dos apóstolos?","opcoes":["Judas de Tiago","Judas, o zelote","Judas de Belém","Judas, o pescador"],"correta":0,"explicacao":"Lucas 6,16: Judas de Tiago."}
  ],
  "judas-2": [
    {"tipo":"multipla","enunciado":"Quantos capítulos tem a Carta de Judas?","opcoes":["Um","Dez","Cinco","Vinte"],"correta":0,"explicacao":"É uma carta curta, de um só capítulo."},
    {"tipo":"vf","enunciado":"A Carta de Judas pede que os cristãos lutem pela fé.","correta":true,"explicacao":"Judas 3: combater pela fé transmitida aos santos."},
    {"tipo":"multipla","enunciado":"Em que parte da Bíblia está a Carta de Judas?","opcoes":["Novo Testamento","Antigo Testamento","Livro dos Salmos","Livros dos Reis"],"correta":0,"explicacao":"Entre as cartas do Novo Testamento."},
    {"tipo":"vf","enunciado":"Na Bíblia, a Carta de Judas vem logo antes do Apocalipse.","correta":true,"explicacao":"É o penúltimo livro da Bíblia."},
    {"tipo":"multipla","enunciado":"O que a Carta de Judas pede em relação aos que duvidam?","opcoes":["Ter compaixão deles","Expulsá-los","Ignorá-los","Castigá-los"],"correta":0,"explicacao":"Judas 22."},
    {"tipo":"ordenar","enunciado":"Ordene o conselho da Carta:","blocos":["Conservai-vos","no amor","de Deus"],"explicacao":"Judas 21."},
    {"tipo":"vf","enunciado":"A Carta de Judas termina com um louvor a Deus.","correta":true,"explicacao":"Um belo hino de glória a Deus."},
    {"tipo":"multipla","enunciado":"Por que algumas cartas são chamadas de cartas católicas?","opcoes":["Porque se dirigem a todos os cristãos","Porque são só para padres","Porque são só para judeus","Porque são só para romanos"],"correta":0,"explicacao":"Católico quer dizer universal."}
  ],
  "judas-3": [
    {"tipo":"multipla","enunciado":"Para que São Judas Tadeu é mais invocado?","opcoes":["Causas difíceis e desesperadas","Viagens de avião","Boas colheitas","Vitória no futebol"],"correta":0,"explicacao":"É o apóstolo da esperança."},
    {"tipo":"vf","enunciado":"Muitos fiéis visitam o Santuário de São Judas Tadeu, em São Paulo.","correta":true,"explicacao":"Um dos santuários mais visitados da cidade."},
    {"tipo":"multipla","enunciado":"Que imagem Judas Tadeu costuma levar no peito?","opcoes":["O rosto de Jesus","Uma chave","Um peixe","Um sino"],"correta":0,"explicacao":"Um medalhão com a face de Cristo."},
    {"tipo":"vf","enunciado":"A chama sobre sua cabeça lembra a vinda do Espírito Santo em Pentecostes.","correta":true,"explicacao":"Ele estava com os apóstolos no Cenáculo."},
    {"tipo":"multipla","enunciado":"Que objeto aparece com ele em muitas imagens?","opcoes":["Um machado ou alabarda","Um violino","Uma âncora","Uma balança"],"correta":0,"explicacao":"Lembra o instrumento do seu martírio."},
    {"tipo":"ordenar","enunciado":"Ordene a invocação:","blocos":["São Judas Tadeu,","rogai","por nós"],"explicacao":"Uma prece curta de confiança."},
    {"tipo":"vf","enunciado":"Ter devoção a um santo é pedir que ele interceda por nós junto a Deus.","correta":true,"explicacao":"Os santos são amigos de Deus que rezam por nós."},
    {"tipo":"multipla","enunciado":"O que significa pedir a intercessão de um santo?","opcoes":["Pedir que ele reze a Deus por nós","Adorá-lo no lugar de Deus","Fazer mágica","Trocar favores com ele"],"correta":0,"explicacao":"Só Deus é adorado; os santos rezam conosco e por nós."}
  ],
  "avila-1": [
    {"tipo":"multipla","enunciado":"Em que país nasceu Santa Teresa de Ávila?","opcoes":["Espanha","Itália","França","Portugal"],"correta":0,"explicacao":"Em Ávila, na Espanha."},
    {"tipo":"vf","enunciado":"Quando criança, Teresa fugiu com o irmão sonhando em ser mártir.","correta":true,"explicacao":"Um tio os encontrou no caminho e os levou de volta."},
    {"tipo":"multipla","enunciado":"Em que ano nasceu Santa Teresa?","opcoes":["1515","1215","1815","1415"],"correta":0,"explicacao":"Em 28 de março de 1515."},
    {"tipo":"vf","enunciado":"Teresa fundou vários mosteiros de Carmelitas Descalças.","correta":true,"explicacao":"Fundou dezessete mosteiros pela Espanha."},
    {"tipo":"multipla","enunciado":"Qual foi o primeiro mosteiro reformado que Teresa fundou?","opcoes":["São José de Ávila","Monte Cassino","São Damião","Lisieux"],"correta":0,"explicacao":"Em 1562, em Ávila."},
    {"tipo":"ordenar","enunciado":"Ordene a vida de Teresa:","blocos":["Nasce em Ávila","Funda o mosteiro de São José","É proclamada Doutora da Igreja"],"explicacao":"Da Espanha do século XVI para a Igreja inteira."},
    {"tipo":"vf","enunciado":"Teresa viajou muito pela Espanha, mesmo com a saúde frágil.","correta":true,"explicacao":"Em carroças simples, por estradas difíceis."},
    {"tipo":"multipla","enunciado":"Qual é a festa de Santa Teresa de Ávila?","opcoes":["15 de outubro","1º de outubro","19 de março","22 de maio"],"correta":0,"explicacao":"Celebrada em 15 de outubro."}
  ],
  "avila-2": [
    {"tipo":"multipla","enunciado":"Quantas moradas tem o Castelo Interior?","opcoes":["Sete","Três","Doze","Quarenta"],"correta":0,"explicacao":"Sete moradas até a união com Deus."},
    {"tipo":"vf","enunciado":"No Castelo Interior, Deus mora no centro da alma.","correta":true,"explicacao":"A vida de oração é caminhar até esse centro."},
    {"tipo":"multipla","enunciado":"Qual é a porta de entrada do castelo, segundo Teresa?","opcoes":["A oração","O dinheiro","A fama","O estudo sozinho"],"correta":0,"explicacao":"A porta para entrar no castelo é a oração."},
    {"tipo":"vf","enunciado":"Teresa escreveu o livro Caminho de Perfeição para suas irmãs.","correta":true,"explicacao":"Um guia para a vida de oração."},
    {"tipo":"multipla","enunciado":"Qual destes livros foi escrito por Santa Teresa?","opcoes":["Livro da Vida","Confissões","Suma Teológica","Filoteia"],"correta":0,"explicacao":"Nele ela conta a própria história com Deus."},
    {"tipo":"ordenar","enunciado":"Ordene o final do poema:","blocos":["Quem a Deus tem","nada lhe falta:","só Deus basta"],"explicacao":"O fim do famoso Nada te perturbe."},
    {"tipo":"vf","enunciado":"Teresa compara a alma a um castelo feito de diamante ou de cristal muito claro.","correta":true,"explicacao":"Uma imagem da beleza da alma criada por Deus."},
    {"tipo":"multipla","enunciado":"O que Teresa ensina a buscar dentro de nós?","opcoes":["A presença de Deus","O orgulho","A riqueza","O medo"],"correta":0,"explicacao":"Deus está mais perto do que imaginamos."}
  ],
  "avila-3": [
    {"tipo":"multipla","enunciado":"Que experiência de Teresa é mostrada na famosa escultura de Bernini?","opcoes":["A transverberação do coração","Os estigmas","A levitação","A bilocação"],"correta":0,"explicacao":"Ela contou que um anjo lhe atravessou o coração com um dardo de fogo."},
    {"tipo":"vf","enunciado":"Teresa dizia que Deus também anda entre as panelas da cozinha.","correta":true,"explicacao":"Deus está nas tarefas simples do dia a dia."},
    {"tipo":"multipla","enunciado":"Qual frase de Teresa lembra que Deus está no dia a dia?","opcoes":["Entre as panelas também anda o Senhor","Deus só está no templo","Deus mora longe","Deus não liga para o trabalho"],"correta":0,"explicacao":"Está no Livro das Fundações."},
    {"tipo":"vf","enunciado":"Teresa morreu em Alba de Tormes, na Espanha.","correta":true,"explicacao":"Em 1582, durante uma viagem."},
    {"tipo":"multipla","enunciado":"Em que ano Teresa morreu?","opcoes":["1582","1515","1622","1700"],"correta":0,"explicacao":"Em outubro de 1582."},
    {"tipo":"ordenar","enunciado":"Ordene a definição de oração:","blocos":["Oração é tratar de amizade","com quem sabemos","que nos ama"],"explicacao":"A definição do Livro da Vida."},
    {"tipo":"vf","enunciado":"Teresa foi canonizada em 1622.","correta":true,"explicacao":"Quarenta anos depois de morrer."},
    {"tipo":"multipla","enunciado":"Com quais santos Teresa foi canonizada no mesmo dia?","opcoes":["Inácio de Loyola e Francisco Xavier","Francisco e Clara","Pedro e Paulo","Bento e Escolástica"],"correta":0,"explicacao":"Junto também com Isidoro Lavrador e Filipe Néri."}
  ]
};

// Junta as atividades novas às originais de cada missão
TRILHAS_ORIGINAIS.forEach((trilha) => {
  trilha.licoes.forEach((licao) => {
    const extras = ATIVIDADES_EXTRAS[licao.slug];
    if (extras) licao.conteudo = licao.conteudo.concat(extras);
  });
});

// Liga cada trilha à biografia do mesmo santo no catálogo do site
// (Nossa Senhora ainda não tem biografia própria no catálogo).
const BIOGRAFIA_DA_TRILHA = {
  'santo-francisco': 'francisco-assis',
  'santo-jose': 'jose',
  'santa-teresinha': 'teresinha',
  'santo-antonio': 'antonio-padua',
  'padre-pio': 'padre-pio',
  'sao-bento': 'bento-nursia',
  'santa-clara': 'clara-assis',
  'joao-paulo-ii': 'joao-paulo-ii',
  'santa-rita': 'rita-cassia',
  'sao-judas': 'judas-tadeu',
  'teresa-avila': 'teresa-avila',
};

// Santo usado para buscar a foto da trilha (o mesmo do catálogo).
// Nossa Senhora ainda não tem biografia, então a foto vem da Wikipédia.
function santoParaFotoDaTrilha(trilha) {
  if (trilha.santoId && typeof santosData !== 'undefined') {
    const santo = santosData.find((s) => s.id === trilha.santoId);
    if (santo) return santo;
  }
  if (trilha.slug === 'nossa-senhora') {
    return { id: 'trilha-nossa-senhora', nome: 'Nossa Senhora', wiki: 'Maria (mãe de Jesus)' };
  }
  return null;
}

// ============================================================
//  TEXTOS DAS TRILHAS NOS TRÊS IDIOMAS
// ============================================================
// Tudo o que as trilhas escrevem na tela. {nome} é trocado pelo valor
// certo na hora (o nome do santo, o número da missão...).
const TEXTOS_TRILHAS = {
  pt: {
    virtude: 'Virtude: {v}',
    conclua_trilha: 'Conclua a trilha de {santo} para abrir esta.',
    missao_rotulo: 'Missão {n}: {titulo}',
    missao_refazer: ' (concluída — refazer)',
    missao_bloqueada: ' (bloqueada)',
    comecar_balao: 'COMEÇAR',
    medalha_de: 'Medalha da {m}',
    insignia_da_trilha: 'Insígnia da trilha',
    ler_historia: 'Ler a história →',
    fe: 'Fé',
    ofensiva: 'Ofensiva',
    santidade: 'Santidade',
    conclua_missao: 'Conclua a missão anterior para desbloquear esta.',
    santidade_renovando: 'Sua Santidade está se renovando — a próxima chega em {min} min. Que tal ler a história de {santo} enquanto isso?',
    missao_de: 'Missão {n} de {total} · {titulo}',
    escolha_certa: 'Escolha a resposta certa',
    vf_titulo: 'Verdadeiro ou falso?',
    verdadeiro: 'Verdadeiro',
    falso: 'Falso',
    monte_frase: 'Monte a frase na ordem certa',
    verificar: 'Verificar',
    continuar: 'Continuar',
    quase: 'Quase!',
    resposta_certa: 'Resposta certa:',
    elogios: ['Muito bem!', 'Isso mesmo!', 'Perfeito!', 'Que beleza!', 'Excelente!', 'Graças a Deus, acertou!'],
    missao_concluida: 'Missão concluída!',
    de_fe: 'de Fé',
    de_primeira: 'de primeira',
    acertos: 'acertos',
    insignia_de: 'Insígnia de {santo}',
    ganhou_medalha: 'Você concluiu a trilha inteira e ganhou a <b>{medalha}</b>.',
    santidade_acabou: 'Sua Santidade acabou por agora',
    santidade_renova: 'Ela se renova sozinha, 1 a cada {intervalo} minutos — a próxima chega em {min} min.',
    ler_enquanto: 'Enquanto isso, ler a história de {santo}',
    voltar_trilhas: 'Voltar às trilhas',
    sair_confirmar: 'Sair agora? O progresso desta missão não será salvo.',
    insignias_titulo: 'Minhas insígnias',
    insignias_resumo: '{feitas} de {total} medalhas. Conclua todas as missões de um santo para ganhar a dele.',
    conquistada: 'Conquistada',
    missoes_feitas: '{feitas} de {total} missões',
    fechar: 'Fechar',
    erro_sem_santidade: 'Sua Santidade está se renovando. Volte daqui a pouco.',
    erro_sem_perguntas: 'Esta missão ainda não tem perguntas para este perfil.',
    erro_abrir: 'Não foi possível abrir esta missão agora. Verifique sua internet.',
    leia_antes: 'Leia antes de começar',
    comecar: 'Começar',
    verificando: 'Verificando...',
    salvando: 'Salvando...',
    erro_conferir: 'Não foi possível conferir a resposta. Verifique sua internet e tente de novo.',
    erro_salvar_titulo: 'Não foi possível salvar agora',
    erro_salvar_texto: 'Verifique sua internet e faça a missão de novo.',
    estrelas: '{n} de 3 estrelas',
    revisao: 'Revisão da trilha',
    vida_de: 'A vida de {santo}',
    faixa_ver_perfil: 'Ver meu perfil',
    faixa_ranking: 'Ranking',
    faixa_trocar: 'Trocar perfil',
    nota_conta: 'Seu progresso fica salvo na sua conta, neste perfil.',
    convite_conta: 'Entre na sua conta para salvar seu progresso, criar perfis para a família e participar do ranking.',
    entrar_ou_criar: 'Entrar ou criar conta',
    nota_sem_conta: 'Sem conta, seu progresso fica salvo só neste aparelho.',
    nota_aparelho: 'Seu progresso fica salvo neste aparelho.',
  },
  en: {
    virtude: 'Virtue: {v}',
    conclua_trilha: 'Finish the trail of {santo} to open this one.',
    missao_rotulo: 'Mission {n}: {titulo}',
    missao_refazer: ' (completed — play again)',
    missao_bloqueada: ' (locked)',
    comecar_balao: 'START',
    medalha_de: 'Medal of {m}',
    insignia_da_trilha: 'Trail badge',
    ler_historia: 'Read the story →',
    fe: 'Faith',
    ofensiva: 'Streak',
    santidade: 'Holiness',
    conclua_missao: 'Finish the previous mission to unlock this one.',
    santidade_renovando: 'Your Holiness is being renewed — the next point arrives in {min} min. How about reading the story of {santo} in the meantime?',
    missao_de: 'Mission {n} of {total} · {titulo}',
    escolha_certa: 'Choose the right answer',
    vf_titulo: 'True or false?',
    verdadeiro: 'True',
    falso: 'False',
    monte_frase: 'Put the sentence in the right order',
    verificar: 'Check',
    continuar: 'Continue',
    quase: 'Almost!',
    resposta_certa: 'Right answer:',
    elogios: ['Well done!', "That's right!", 'Perfect!', 'Beautiful!', 'Excellent!', 'Thanks be to God, you got it!'],
    missao_concluida: 'Mission complete!',
    de_fe: 'Faith',
    de_primeira: 'on the first try',
    acertos: 'correct',
    insignia_de: 'Badge of {santo}',
    ganhou_medalha: 'You finished the whole trail and won the <b>{medalha}</b>.',
    santidade_acabou: 'Your Holiness has run out for now',
    santidade_renova: 'It renews by itself, 1 point every {intervalo} minutes — the next one arrives in {min} min.',
    ler_enquanto: 'Meanwhile, read the story of {santo}',
    voltar_trilhas: 'Back to the trails',
    sair_confirmar: 'Leave now? Your progress in this mission will not be saved.',
    insignias_titulo: 'My badges',
    insignias_resumo: '{feitas} of {total} medals. Finish all the missions of a saint to earn that medal.',
    conquistada: 'Earned',
    missoes_feitas: '{feitas} of {total} missions',
    fechar: 'Close',
    erro_sem_santidade: 'Your Holiness is being renewed. Come back in a little while.',
    erro_sem_perguntas: 'This mission does not have questions for this profile yet.',
    erro_abrir: 'This mission could not be opened right now. Check your internet connection.',
    leia_antes: 'Read before you start',
    comecar: 'Start',
    verificando: 'Checking...',
    salvando: 'Saving...',
    erro_conferir: 'The answer could not be checked. Check your internet connection and try again.',
    erro_salvar_titulo: 'Could not save right now',
    erro_salvar_texto: 'Check your internet connection and do the mission again.',
    estrelas: '{n} of 3 stars',
    revisao: 'Trail review',
    vida_de: 'The life of {santo}',
    faixa_ver_perfil: 'See my profile',
    faixa_ranking: 'Ranking',
    faixa_trocar: 'Switch profile',
    nota_conta: 'Your progress is saved in your account, in this profile.',
    convite_conta: 'Sign in to save your progress, create profiles for your family and join the ranking.',
    entrar_ou_criar: 'Sign in or create an account',
    nota_sem_conta: 'Without an account, your progress is saved only on this device.',
    nota_aparelho: 'Your progress is saved on this device.',
  },
  es: {
    virtude: 'Virtud: {v}',
    conclua_trilha: 'Termina el sendero de {santo} para abrir este.',
    missao_rotulo: 'Misión {n}: {titulo}',
    missao_refazer: ' (completada — repetir)',
    missao_bloqueada: ' (bloqueada)',
    comecar_balao: 'EMPEZAR',
    medalha_de: 'Medalla de {m}',
    insignia_da_trilha: 'Insignia del sendero',
    ler_historia: 'Leer la historia →',
    fe: 'Fe',
    ofensiva: 'Racha',
    santidade: 'Santidad',
    conclua_missao: 'Termina la misión anterior para desbloquear esta.',
    santidade_renovando: 'Tu Santidad se está renovando — el próximo punto llega en {min} min. ¿Qué tal leer la historia de {santo} mientras tanto?',
    missao_de: 'Misión {n} de {total} · {titulo}',
    escolha_certa: 'Elige la respuesta correcta',
    vf_titulo: '¿Verdadero o falso?',
    verdadeiro: 'Verdadero',
    falso: 'Falso',
    monte_frase: 'Ordena la frase correctamente',
    verificar: 'Comprobar',
    continuar: 'Continuar',
    quase: '¡Casi!',
    resposta_certa: 'Respuesta correcta:',
    elogios: ['¡Muy bien!', '¡Eso es!', '¡Perfecto!', '¡Qué belleza!', '¡Excelente!', '¡Gracias a Dios, acertaste!'],
    missao_concluida: '¡Misión cumplida!',
    de_fe: 'de Fe',
    de_primeira: 'a la primera',
    acertos: 'aciertos',
    insignia_de: 'Insignia de {santo}',
    ganhou_medalha: 'Terminaste todo el sendero y ganaste la <b>{medalha}</b>.',
    santidade_acabou: 'Tu Santidad se acabó por ahora',
    santidade_renova: 'Se renueva sola, 1 punto cada {intervalo} minutos — el próximo llega en {min} min.',
    ler_enquanto: 'Mientras tanto, leer la historia de {santo}',
    voltar_trilhas: 'Volver a los senderos',
    sair_confirmar: '¿Salir ahora? El progreso de esta misión no se guardará.',
    insignias_titulo: 'Mis insignias',
    insignias_resumo: '{feitas} de {total} medallas. Termina todas las misiones de un santo para ganar su medalla.',
    conquistada: 'Conseguida',
    missoes_feitas: '{feitas} de {total} misiones',
    fechar: 'Cerrar',
    erro_sem_santidade: 'Tu Santidad se está renovando. Vuelve dentro de un rato.',
    erro_sem_perguntas: 'Esta misión todavía no tiene preguntas para este perfil.',
    erro_abrir: 'No se pudo abrir esta misión ahora. Revisa tu conexión a internet.',
    leia_antes: 'Lee antes de empezar',
    comecar: 'Empezar',
    verificando: 'Comprobando...',
    salvando: 'Guardando...',
    erro_conferir: 'No se pudo comprobar la respuesta. Revisa tu conexión e inténtalo de nuevo.',
    erro_salvar_titulo: 'No se pudo guardar ahora',
    erro_salvar_texto: 'Revisa tu conexión y haz la misión de nuevo.',
    estrelas: '{n} de 3 estrellas',
    revisao: 'Repaso del sendero',
    vida_de: 'La vida de {santo}',
    faixa_ver_perfil: 'Ver mi perfil',
    faixa_ranking: 'Ranking',
    faixa_trocar: 'Cambiar perfil',
    nota_conta: 'Tu progreso se guarda en tu cuenta, en este perfil.',
    convite_conta: 'Entra en tu cuenta para guardar tu progreso, crear perfiles para la familia y participar en el ranking.',
    entrar_ou_criar: 'Entrar o crear cuenta',
    nota_sem_conta: 'Sin cuenta, tu progreso se guarda solo en este dispositivo.',
    nota_aparelho: 'Tu progreso se guarda en este dispositivo.',
  },
};

// Idioma escolhido no site (o script.js guarda em idiomaAtual)
function idiomaDasTrilhas() {
  return typeof idiomaAtual !== 'undefined' && TEXTOS_TRILHAS[idiomaAtual] ? idiomaAtual : 'pt';
}

// Busca um texto das trilhas no idioma atual (ou no idioma pedido) e
// troca as marcas {assim} pelos valores.
function tt(chave, valores, idioma) {
  const dicionario = TEXTOS_TRILHAS[idioma || idiomaDasTrilhas()] || TEXTOS_TRILHAS.pt;
  const texto = dicionario[chave] !== undefined ? dicionario[chave] : TEXTOS_TRILHAS.pt[chave];
  if (typeof texto !== 'string' || !valores) return texto;
  return texto.replace(/\{(\w+)\}/g, (marca, nome) => (valores[nome] !== undefined ? valores[nome] : marca));
}

// "Medalha da Pobreza", "Medal of Poverty", "Medalla de la Pobreza"
function nomeDaMedalha(trilha) {
  return trilha.medalhaCompleta || tt('medalha_de', { m: trilha.medalha });
}

// Cada santo tem 3 capítulos de 10 atividades. Em vez de 3 missões
// longas, a trilha vira 10 missões curtas: três por capítulo (3
// atividades cada) e uma missão final de revisão, com a atividade
// que sobrou de cada capítulo.
function expandirEmMissoes(trilha, idioma) {
  const missoes = [];
  const revisao = [];
  trilha.licoes.forEach((capitulo) => {
    const atividades = capitulo.conteudo;
    for (let parte = 0; parte < 3; parte++) {
      const trecho = atividades.slice(parte * 3, parte * 3 + 3);
      if (trecho.length === 0) continue;
      missoes.push({
        slug: `${trilha.slug}-m${missoes.length + 1}`,
        titulo: `${capitulo.titulo} · ${parte + 1}`,
        conteudo: trecho,
      });
    }
    revisao.push(...atividades.slice(9));
  });
  if (revisao.length > 0) {
    missoes.push({ slug: `${trilha.slug}-m${missoes.length + 1}`, titulo: tt('revisao', null, idioma || 'pt'), conteudo: revisao });
  }
  return Object.assign({}, trilha, { licoes: missoes });
}

// ============================================================
//  TRADUÇÕES E PERGUNTAS DAS CRIANÇAS
// ============================================================
// As trilhas em inglês e espanhol ficam em trilhas-en.js e
// trilhas-es.js; as perguntas fáceis das crianças ficam em
// trilhas-kids.js (e trilhas-kids-en.js / trilhas-kids-es.js). Esses
// arquivos só são baixados quando precisam.
//
// Com conta, quem entrega as perguntas é o banco do app: o perfil de
// criança recebe as do público "kid" (o supabase/gerar-importacao.js
// leva as perguntas fáceis para lá). Sem conta, o site monta tudo
// daqui, e um perfil infantil no aparelho (se um dia existir) também
// recebe as perguntas fáceis.
//
// As missões têm os mesmos nomes internos em qualquer idioma e para
// adulto ou criança: o progresso é um só.

function traducaoDaTrilha(slug, idioma) {
  if (!idioma || idioma === 'pt' || typeof window === 'undefined') return null;
  const todas = window.TRILHAS_TRADUZIDAS && window.TRILHAS_TRADUZIDAS[idioma];
  return todas ? todas[slug] || null : null;
}

// Junta uma atividade em português com a sua tradução. A estrutura
// (tipo, resposta certa, quantidade de opções e de blocos) vem sempre
// do português; da tradução vêm só os textos. Se a tradução não
// combinar, fica o português — nunca uma pergunta quebrada.
function juntarAtividadeTraduzida(original, traduzida) {
  if (!traduzida || traduzida.tipo !== original.tipo) return original;
  const junta = Object.assign({}, original, {
    enunciado: traduzida.enunciado || original.enunciado,
    explicacao: traduzida.explicacao || original.explicacao,
  });
  if (original.tipo === 'multipla') {
    if (!Array.isArray(traduzida.opcoes) || traduzida.opcoes.length !== original.opcoes.length) return original;
    junta.opcoes = traduzida.opcoes;
  }
  if (original.tipo === 'ordenar') {
    // Os blocos traduzidos já vêm na ordem certa da frase no outro idioma
    if (!Array.isArray(traduzida.blocos) || traduzida.blocos.length !== original.blocos.length) return original;
    junta.blocos = traduzida.blocos;
  }
  return junta;
}

function juntarListaTraduzida(originais, traduzidas) {
  if (!Array.isArray(traduzidas) || traduzidas.length !== originais.length) return originais;
  return originais.map((atividade, i) => juntarAtividadeTraduzida(atividade, traduzidas[i]));
}

function atividadesKidsDoCapitulo(capitulo, idioma, conteudoAdulto) {
  const todas = typeof window !== 'undefined' ? window.ATIVIDADES_KIDS : null;
  const kids = todas ? todas[capitulo.slug] : null;
  // Capítulo ainda sem versão infantil: fica a de adulto
  if (!Array.isArray(kids) || kids.length === 0) return conteudoAdulto;
  const traducoes = idioma !== 'pt' && typeof window !== 'undefined' && window.ATIVIDADES_KIDS_TRADUZIDAS
    ? (window.ATIVIDADES_KIDS_TRADUZIDAS[idioma] || {})[capitulo.slug]
    : null;
  return juntarListaTraduzida(kids, traducoes);
}

// Monta uma trilha pronta para a tela, no idioma pedido, para adulto
// ou para criança, já dividida em missões.
function montarTrilha(original, idioma, kids) {
  const traducao = traducaoDaTrilha(original.slug, idioma);
  const capitulos = original.licoes.map((capitulo) => {
    const capituloTraduzido = traducao && traducao.licoes ? traducao.licoes[capitulo.slug] : null;
    const adulto = juntarListaTraduzida(capitulo.conteudo, capituloTraduzido && capituloTraduzido.conteudo);
    return {
      slug: capitulo.slug,
      titulo: (capituloTraduzido && capituloTraduzido.titulo) || capitulo.titulo,
      conteudo: kids ? atividadesKidsDoCapitulo(capitulo, idioma, adulto) : adulto,
    };
  });
  const montada = Object.assign({}, original, {
    santo: (traducao && traducao.santo) || original.santo,
    titulo: (traducao && traducao.titulo) || original.titulo,
    descricao: (traducao && traducao.descricao) || original.descricao,
    medalha: (traducao && traducao.medalha) || original.medalha,
    virtude: (traducao && traducao.virtude) || original.virtude,
    medalhaCompleta: (traducao && traducao.medalhaCompleta) || null,
    santoId: BIOGRAFIA_DA_TRILHA[original.slug] || null,
    licoes: capitulos,
  });
  return expandirEmMissoes(montada, idioma);
}

// A base de sempre: português, adulto (usada também pelo gerador do SQL)
const TRILHAS = TRILHAS_ORIGINAIS.map((trilha) => montarTrilha(trilha, 'pt', false));

// O mapa guarda uma cópia pronta por idioma (e para criança), para não
// remontar tudo a cada toque.
let cacheDeTrilhasLocais = {};

function perfilDeCrianca() {
  return typeof document !== 'undefined' && !!document.body && !!document.body.classList
    && document.body.classList.contains('modo-kids');
}

function conteudoKidsPronto(idioma) {
  if (typeof window === 'undefined' || !window.ATIVIDADES_KIDS) return false;
  if (idioma === 'pt') return true;
  return !!(window.ATIVIDADES_KIDS_TRADUZIDAS && window.ATIVIDADES_KIDS_TRADUZIDAS[idioma]);
}

function trilhasLocais() {
  const idioma = idiomaDasTrilhas();
  const kids = perfilDeCrianca() && typeof window !== 'undefined' && !!window.ATIVIDADES_KIDS;
  const chave = `${idioma}${kids ? '-kids' : ''}`;
  if (!cacheDeTrilhasLocais[chave]) {
    cacheDeTrilhasLocais[chave] = idioma === 'pt' && !kids
      ? TRILHAS
      : TRILHAS_ORIGINAIS.map((trilha) => montarTrilha(trilha, idioma, kids));
  }
  return cacheDeTrilhasLocais[chave];
}

// Baixa um arquivo de conteúdo das trilhas uma vez só
const arquivosDasTrilhas = {};

function carregarArquivoDasTrilhas(nome) {
  if (arquivosDasTrilhas[nome]) return arquivosDasTrilhas[nome];
  arquivosDasTrilhas[nome] = new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = nome;
    script.onload = () => {
      // Conteúdo novo: as trilhas prontas precisam ser remontadas
      cacheDeTrilhasLocais = {};
      idiomaDasTrilhasDoServidor = null;
      resolve(true);
    };
    script.onerror = () => {
      delete arquivosDasTrilhas[nome];
      resolve(false); // sem o arquivo, fica o português
    };
    (document.head || document.body).appendChild(script);
  });
  return arquivosDasTrilhas[nome];
}

// Chamado pelo script.js quando a pessoa troca de idioma
function carregarTraducoesDasTrilhas(codigo) {
  const arquivos = [];
  if (codigo === 'en' || codigo === 'es') {
    arquivos.push(`trilhas-${codigo}.js`);
    if (perfilDeCrianca() && !modoConta()) arquivos.push(`trilhas-kids-${codigo}.js`);
  }
  return Promise.all(arquivos.map(carregarArquivoDasTrilhas));
}

function carregarAtividadesKids() {
  const idioma = idiomaDasTrilhas();
  const arquivos = ['trilhas-kids.js'];
  if (idioma !== 'pt') arquivos.push(`trilhas-kids-${idioma}.js`);
  return Promise.all(arquivos.map(carregarArquivoDasTrilhas));
}

// Depois de trocar de idioma: redesenha o mapa se ele estiver aberto
function aoMudarIdiomaDasTrilhas() {
  const mapa = document.getElementById('view-trilhas');
  if (mapa && mapa.style.display === 'block') renderizarTrilhas();
}

// ============================================================
//  TRILHAS DO BANCO DO APP (quando há conta logada)
// ============================================================
// Com conta, as trilhas vêm do mesmo banco do app — as mesmas no
// site e no celular, e as respostas são conferidas pelo banco.
// Sem conta, valem as trilhas deste arquivo (progresso no aparelho).
let dadosDasTrilhasDoServidor = null; // como vieram do banco
let trilhasDoServidor = null;          // já prontas no idioma abaixo
let idiomaDasTrilhasDoServidor = null;

// Virtude e medalha das trilhas que só existem no banco do app
const TRILHAS_EXTRAS_DO_APP = {
  'carlo-acutis': {
    pt: {
      virtude: 'Amor à Eucaristia',
      medalha: 'Eucaristia',
      descricao: 'O jovem que chamava a Eucaristia de sua autoestrada para o Céu.',
    },
    en: {
      virtude: 'Love for the Eucharist',
      medalha: 'Eucharist',
      medalhaCompleta: 'Medal of the Eucharist',
      descricao: 'The young man who called the Eucharist his highway to Heaven.',
    },
    es: {
      virtude: 'Amor a la Eucaristía',
      medalha: 'Eucaristía',
      medalhaCompleta: 'Medalla de la Eucaristía',
      descricao: 'El joven que llamaba a la Eucaristía su autopista hacia el Cielo.',
    },
  },
};

function escaparHtmlDaTrilha(texto) {
  return String(texto == null ? '' : texto).replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  }[c]));
}

// Os textos do banco vêm por idioma, com os mesmos códigos que o app
// usa: { "pt-BR": "...", "en-US": "...", "es": "..." }. Usa o idioma
// do site; se faltar, fica o português.
const CODIGOS_DO_IDIOMA_NO_BANCO = { pt: ['pt-BR', 'pt'], en: ['en-US', 'en'], es: ['es', 'es-ES'] };

function valorNoIdioma(campo) {
  const codigos = CODIGOS_DO_IDIOMA_NO_BANCO[idiomaDasTrilhas()].concat(CODIGOS_DO_IDIOMA_NO_BANCO.pt);
  const achado = codigos.find((codigo) => campo[codigo] != null && campo[codigo] !== '');
  return achado ? campo[achado] : Object.values(campo)[0];
}

function textoNoIdioma(campo) {
  if (campo == null) return '';
  if (typeof campo === 'string') return campo;
  return valorNoIdioma(campo) || '';
}

function listaNoIdioma(campo) {
  if (!campo) return [];
  if (Array.isArray(campo)) return campo;
  return valorNoIdioma(campo) || [];
}

// Nome do santo no idioma do site, quando a biografia já foi traduzida
function nomeDoSantoNoIdioma(santo) {
  return typeof textoDoSanto === 'function' ? textoDoSanto(santo).nome : santo.nome;
}

function converterTrilhaDoServidor(trilhaDoBanco) {
  const tarefas = (trilhaDoBanco.tasks || []).slice().sort((a, b) => a.sort - b.sort);
  const licoes = [];
  tarefas.forEach((tarefa) => {
    (tarefa.lessons || []).slice().sort((a, b) => a.sort - b.sort).forEach((licao) => {
      licoes.push({ slug: licao.id, id: licao.id, titulo: escaparHtmlDaTrilha(textoNoIdioma(licao.title)) });
    });
  });
  const slugDoSanto = trilhaDoBanco.saint_slug;
  const santo = typeof santosData !== 'undefined' ? santosData.find((s) => s.id === slugDoSanto) : null;
  const doSite = trilhasLocais().find((t) => t.santoId === slugDoSanto);
  const extras = TRILHAS_EXTRAS_DO_APP[slugDoSanto] || {};
  const extra = extras[idiomaDasTrilhas()] || extras.pt || {};
  const tituloDaTarefa = tarefas[0] ? textoNoIdioma(tarefas[0].title) : '';
  const nome = santo ? nomeDoSantoNoIdioma(santo)
    : doSite ? doSite.santo
      : (tituloDaTarefa.replace(/^(A vida de|The life of|La vida de)\s+/i, '') || slugDoSanto);
  return {
    slug: slugDoSanto,
    santo: escaparHtmlDaTrilha(nome),
    titulo: escaparHtmlDaTrilha(nome),
    descricao: doSite ? doSite.descricao : escaparHtmlDaTrilha(extra.descricao || tituloDaTarefa),
    medalha: doSite ? doSite.medalha : (extra.medalha || tt('santidade')),
    virtude: doSite ? doSite.virtude : (extra.virtude || tt('santidade')),
    medalhaCompleta: doSite ? doSite.medalhaCompleta : (extra.medalhaCompleta || null),
    santoId: santo ? santo.id : null,
    cor: trilhaDoBanco.color,
    servidor: true,
    licoes,
  };
}

// As trilhas do banco prontas no idioma atual
function trilhasDoServidorNoIdioma() {
  if (!dadosDasTrilhasDoServidor) return null;
  const idioma = idiomaDasTrilhas();
  if (!trilhasDoServidor || idiomaDasTrilhasDoServidor !== idioma) {
    trilhasDoServidor = dadosDasTrilhasDoServidor.map(converterTrilhaDoServidor).filter((t) => t.licoes.length > 0);
    idiomaDasTrilhasDoServidor = idioma;
  }
  return trilhasDoServidor;
}

// Busca as trilhas publicadas (uma vez por visita)
async function carregarConteudoDoServidor(forcar) {
  if (dadosDasTrilhasDoServidor && !forcar) return trilhasDoServidorNoIdioma();
  const { data, error } = await supabaseCliente
    .from('trails')
    .select('id, saint_slug, sort, color, tasks(id, sort, title, lessons(id, slug, sort, title))')
    .eq('published', true)
    .order('sort', { ascending: true });
  if (error) throw error;
  dadosDasTrilhasDoServidor = data || [];
  trilhasDoServidor = null;
  return trilhasDoServidorNoIdioma();
}

function trilhasEmUso() {
  return modoConta() && dadosDasTrilhasDoServidor ? trilhasDoServidorNoIdioma() : trilhasLocais();
}

// Avisa a Lumi (a estrelinha do modo infantil, no mascote.js) do que
// acontece na lição. No perfil adulto ela não faz nada.
function avisarMascote(evento, dados) {
  if (typeof mascoteReage !== 'function') return null;
  try {
    return mascoteReage(evento, dados);
  } catch (erro) {
    console.error('Lumina Sancti — falha no mascote:', erro);
    return null;
  }
}

// Desenha um dos ícones do site (definidos no index.html) — o site
// não usa emojis.
function icone(nome, classeExtra) {
  return `<svg class="icone${classeExtra ? ' ' + classeExtra : ''}" viewBox="0 0 24 24" aria-hidden="true"><use href="#icone-${nome}"></use></svg>`;
}

// ============================================================
//  REGRAS DO JOGO
// ============================================================
const SANTIDADE_MAXIMA = 15;             // "vidas" do app
const MINUTOS_PARA_RENOVAR_SANTIDADE = 30; // +1 de Santidade a cada 30 min
const FE_BASE_LICAO = 10;                 // Fé por concluir uma lição
const FE_POR_ACERTO_DE_PRIMEIRA = 5;      // bônus por acertar de primeira
const FE_REVISAO = 5;                     // Fé ao refazer lição já concluída
const CHAVE_PROGRESSO_TRILHAS = 'lumina-sancti-trilhas-v1';

// No sistema do app, a regra de Santidade vale para todos os perfis,
// inclusive os de criança (quem confere é o próprio banco). Por isso
// nenhum perfil tem Santidade infinita.
function perfilEhInfantil() {
  return false;
}

// ============================================================
//  PROGRESSO (salvo no aparelho nesta fase)
// ============================================================
function estadoInicialTrilhas() {
  return {
    fe: 0,
    santidade: SANTIDADE_MAXIMA,
    santidadeMarcadaEm: Date.now(),
    ofensiva: 0,
    ultimoAcesso: null,
    licoes: {},
    insignias: {},
  };
}

// Com um perfil da conta escolhido, o progresso vem do banco (o
// perfis.js preenche esta variável); sem conta, fica no aparelho.
let estadoEmMemoriaDaConta = null;

function modoConta() {
  return !!estadoEmMemoriaDaConta;
}

function carregarProgressoTrilhas() {
  if (modoConta()) return estadoEmMemoriaDaConta;
  try {
    const salvo = localStorage.getItem(CHAVE_PROGRESSO_TRILHAS);
    if (!salvo) return estadoInicialTrilhas();
    return Object.assign(estadoInicialTrilhas(), JSON.parse(salvo));
  } catch (e) {
    return estadoInicialTrilhas();
  }
}

function salvarProgressoTrilhas(estado) {
  if (modoConta()) {
    estadoEmMemoriaDaConta = estado; // o banco é atualizado pelas funções do perfis.js
    return;
  }
  try {
    localStorage.setItem(CHAVE_PROGRESSO_TRILHAS, JSON.stringify(estado));
  } catch (e) {
    // modo privado ou armazenamento cheio: o jogo continua, só não salva
  }
}

function dataLocalISO(data) {
  const d = data || new Date();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${d.getFullYear()}-${mm}-${dd}`;
}

// Ofensiva: dias seguidos acessando as trilhas (pelo relógio do
// próprio aparelho, igual ao Santo do Dia).
function registrarAcessoTrilhas(estado, agora) {
  const hoje = agora || new Date();
  const chaveHoje = dataLocalISO(hoje);
  if (estado.ultimoAcesso === chaveHoje) return false;
  const ontem = new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate() - 1);
  estado.ofensiva = (estado.ultimoAcesso === dataLocalISO(ontem)) ? estado.ofensiva + 1 : 1;
  estado.ultimoAcesso = chaveHoje;
  return true;
}

// A Santidade volta sozinha com o tempo, até o máximo.
function renovarSantidade(estado, agoraMs) {
  const agora = agoraMs || Date.now();
  const passo = MINUTOS_PARA_RENOVAR_SANTIDADE * 60 * 1000;
  if (estado.santidade >= SANTIDADE_MAXIMA) {
    estado.santidade = SANTIDADE_MAXIMA;
    estado.santidadeMarcadaEm = agora;
    return;
  }
  const ganhos = Math.floor((agora - estado.santidadeMarcadaEm) / passo);
  if (ganhos > 0) {
    estado.santidade = Math.min(SANTIDADE_MAXIMA, estado.santidade + ganhos);
    estado.santidadeMarcadaEm = estado.santidade >= SANTIDADE_MAXIMA
      ? agora
      : estado.santidadeMarcadaEm + ganhos * passo;
  }
}

function minutosParaProximaSantidade(estado, agoraMs) {
  const agora = agoraMs || Date.now();
  const passo = MINUTOS_PARA_RENOVAR_SANTIDADE * 60 * 1000;
  const restante = passo - ((agora - estado.santidadeMarcadaEm) % passo);
  return Math.max(1, Math.ceil(restante / 60000));
}

function perderSantidade(estado, agoraMs) {
  if (estado.santidade >= SANTIDADE_MAXIMA) estado.santidadeMarcadaEm = agoraMs || Date.now();
  estado.santidade = Math.max(0, estado.santidade - 1);
}

function licaoDesbloqueada(trilha, indice, estado) {
  if (indice === 0) return true;
  return !!estado.licoes[trilha.licoes[indice - 1].slug];
}

function trilhaConcluida(trilha, estado) {
  return trilha.licoes.every((licao) => !!estado.licoes[licao.slug]);
}

// ============================================================
//  PEQUENOS DETALHES: aviso na tela e sons da lição
// ============================================================
let temporizadorAvisoTrilhas = null;

function mostrarAvisoTrilhas(texto) {
  let aviso = document.getElementById('lumina-toast');
  if (!aviso) {
    aviso = document.createElement('div');
    aviso.id = 'lumina-toast';
    aviso.className = 'lumina-toast';
    aviso.setAttribute('role', 'status');
    document.body.appendChild(aviso);
  }
  aviso.textContent = texto;
  aviso.classList.add('mostrar');
  clearTimeout(temporizadorAvisoTrilhas);
  temporizadorAvisoTrilhas = setTimeout(() => aviso.classList.remove('mostrar'), 3500);
}

let contextoSomDaLicao = null;

function somDaLicao(tipo) {
  try {
    const Classe = window.AudioContext || window.webkitAudioContext;
    if (!Classe) return;
    if (!contextoSomDaLicao) contextoSomDaLicao = new Classe();
    const ctx = contextoSomDaLicao;
    const inicio = ctx.currentTime;
    const notas = tipo === 'certo' ? [880, 1318.5]
      : tipo === 'fim' ? [784, 988, 1175, 1568]
      : [233, 196];
    notas.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const ganho = ctx.createGain();
      osc.type = tipo === 'errado' ? 'triangle' : 'sine';
      osc.frequency.value = freq;
      const t = inicio + i * 0.09;
      ganho.gain.setValueAtTime(0, t);
      ganho.gain.linearRampToValueAtTime(0.08, t + 0.02);
      ganho.gain.exponentialRampToValueAtTime(0.0001, t + 0.35);
      osc.connect(ganho);
      ganho.connect(ctx.destination);
      osc.start(t);
      osc.stop(t + 0.4);
    });
  } catch (e) {
    // sem som, a lição segue normalmente
  }
}

// ============================================================
//  MAPA DAS TRILHAS
// ============================================================
function abrirTrilhas(slugParaMostrar) {
  // Com conta logada, o perfis.js escolhe o perfil e carrega o
  // progresso do banco antes de mostrar as trilhas.
  if (typeof prepararTrilhasDaConta === 'function' && prepararTrilhasDaConta(slugParaMostrar)) return;
  exibirTrilhas(slugParaMostrar);
}

function exibirTrilhas(slugParaMostrar) {
  if (typeof closeSidebar === 'function') closeSidebar();
  mudarDeView('view-trilhas');
  renderizarTrilhas();
  if (slugParaMostrar) {
    setTimeout(() => {
      const bloco = document.getElementById(`trilha-${slugParaMostrar}`);
      if (bloco && bloco.scrollIntoView) bloco.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 400);
  }
}

function renderizarTrilhas() {
  const lista = document.getElementById('lista-trilhas');
  const painel = document.getElementById('trilhas-stats');
  if (!lista || !painel) return;

  const estado = carregarProgressoTrilhas();
  renovarSantidade(estado);
  // Com conta, a ofensiva é contada pelo banco do app (ao concluir missões)
  if (!modoConta()) registrarAcessoTrilhas(estado);
  salvarProgressoTrilhas(estado);

  renderizarPlacarDasTrilhas(estado);
  const trilhas = trilhasEmUso();

  // Caminho em zigue-zague, como no Duolingo
  const deslocamentos = ['desloc-0', 'desloc-d', 'desloc-0', 'desloc-e'];

  lista.innerHTML = trilhas.map((trilha, posicao) => {
    const concluida = trilhaConcluida(trilha, estado);
    const anterior = posicao > 0 ? trilhas[posicao - 1] : null;
    const liberada = !anterior || trilhaConcluida(anterior, estado);

    // Trilha ainda trancada: mostra o santo, mas sem o caminho
    if (!liberada) {
      return `
      <section class="trilha-bloco trilha-trancada" id="trilha-${trilha.slug}">
        <div class="trilha-banner">
          <div class="trilha-foto" id="trilha-foto-${trilha.slug}"><svg class="card-img-placeholder" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><use href="#icon-aureola"></use></svg></div>
          <div class="trilha-info">
            <span class="trilha-virtude">${tt('virtude', { v: trilha.virtude })}</span>
            <h3>${trilha.titulo}</h3>
            <p class="trilha-aviso-trancada">${icone('cadeado')} ${tt('conclua_trilha', { santo: anterior.santo })}</p>
          </div>
        </div>
      </section>`;
    }

    const nos = trilha.licoes.map((licao, i) => {
      const feita = !!estado.licoes[licao.slug];
      const liberada = licaoDesbloqueada(trilha, i, estado);
      const classe = feita ? 'concluida' : (liberada ? 'atual' : 'bloqueada');
      const simbolo = feita ? icone('check', 'icone-no') : (liberada ? icone('estrela', 'icone-no') : icone('cadeado', 'icone-no'));
      const rotuloAcessivel = tt('missao_rotulo', { n: i + 1, titulo: licao.titulo })
        + (feita ? tt('missao_refazer') : (liberada ? '' : tt('missao_bloqueada')));
      return `
        <div class="no-wrapper ${deslocamentos[i % deslocamentos.length]}">
          <button class="no-licao ${classe}" data-trilha="${trilha.slug}" data-indice="${i}" aria-label="${rotuloAcessivel}">
            ${classe === 'atual' ? `<span class="no-balao">${tt('comecar_balao')}</span>` : ''}
            <span class="no-circulo">${simbolo}</span>
            <span class="no-rotulo">${licao.titulo}</span>
          </button>
        </div>`;
    }).join('');

    const posicaoInsignia = deslocamentos[trilha.licoes.length % deslocamentos.length];
    const noInsignia = `
      <div class="no-wrapper ${posicaoInsignia}">
        <div class="no-insignia ${concluida ? 'conquistada' : ''}">
          <span class="no-circulo">${icone('medalha', 'icone-no')}</span>
          <span class="no-rotulo">${concluida ? nomeDaMedalha(trilha) : tt('insignia_da_trilha')}</span>
        </div>
      </div>`;

    return `
      <section class="trilha-bloco" id="trilha-${trilha.slug}">
        <div class="trilha-banner ${concluida ? 'concluida' : ''}">
          <div class="trilha-foto" id="trilha-foto-${trilha.slug}"><svg class="card-img-placeholder" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><use href="#icon-aureola"></use></svg></div>
          <div class="trilha-info">
            <span class="trilha-virtude">${tt('virtude', { v: trilha.virtude })}</span>
            <h3>${trilha.titulo}</h3>
            <p>${trilha.descricao}</p>
            ${trilha.santoId ? `<button class="trilha-ler" data-santo="${trilha.santoId}">${tt('ler_historia')}</button>` : ''}
          </div>
        </div>
        <div class="trilha-caminho">${nos}${noInsignia}</div>
      </section>`;
  }).join('');

  lista.querySelectorAll('.no-licao').forEach((botao) => {
    botao.addEventListener('click', () => abrirNoDaTrilha(botao.dataset.trilha, Number(botao.dataset.indice)));
  });
  lista.querySelectorAll('.trilha-ler').forEach((botao) => {
    botao.addEventListener('click', () => showDetail(botao.dataset.santo));
  });

  // Foto de cada santo (a mesma do catálogo), no lugar do emoji
  trilhas.forEach((trilha) => {
    const santo = santoParaFotoDaTrilha(trilha);
    if (!santo || typeof buscarImagemSanto !== 'function') return;
    buscarImagemSanto(santo).then((url) => {
      const alvo = document.getElementById(`trilha-foto-${trilha.slug}`);
      if (url && alvo) alvo.innerHTML = `<img src="${url}" alt="${trilha.santo}" loading="lazy">`;
    });
  });

  // Faixa do perfil (ou convite para entrar), desenhada pelo perfis.js
  if (typeof renderizarFaixaDaConta === 'function') renderizarFaixaDaConta();

  // A Lumi aparece no mapa só para crianças (dorme se a Santidade acabou)
  avisarMascote('mapa', { santidade: estado.santidade });
}

function renderizarPlacarDasTrilhas(estado) {
  const painel = document.getElementById('trilhas-stats');
  if (!painel) return;
  const santidadeTexto = perfilEhInfantil() ? '∞' : `${estado.santidade}/${SANTIDADE_MAXIMA}`;
  painel.innerHTML = `
    <div class="stat stat-fe"><span>${icone('estrela')}${estado.fe}</span><small>${tt('fe')}</small></div>
    <div class="stat stat-ofensiva"><span>${icone('chama')}${estado.ofensiva}</span><small>${tt('ofensiva')}</small></div>
    <div class="stat stat-santidade"><span>${icone('pomba')}${santidadeTexto}</span><small>${tt('santidade')}</small></div>
  `;
}

function abrirNoDaTrilha(slugTrilha, indice) {
  const listaDeTrilhas = trilhasEmUso();
  const posicaoDaTrilha = listaDeTrilhas.findIndex((t) => t.slug === slugTrilha);
  const trilha = listaDeTrilhas[posicaoDaTrilha];
  if (!trilha || !trilha.licoes[indice]) return;
  const anteriorDaLista = posicaoDaTrilha > 0 ? listaDeTrilhas[posicaoDaTrilha - 1] : null;
  if (anteriorDaLista && !trilhaConcluida(anteriorDaLista, carregarProgressoTrilhas())) {
    mostrarAvisoTrilhas(tt('conclua_trilha', { santo: anteriorDaLista.santo }));
    return;
  }

  const estado = carregarProgressoTrilhas();
  renovarSantidade(estado);
  salvarProgressoTrilhas(estado);

  if (!licaoDesbloqueada(trilha, indice, estado)) {
    mostrarAvisoTrilhas(tt('conclua_missao'));
    return;
  }
  if (!perfilEhInfantil() && estado.santidade <= 0) {
    mostrarAvisoTrilhas(tt('santidade_renovando', { min: minutosParaProximaSantidade(estado), santo: trilha.santo }));
    return;
  }
  if (modoConta() && trilha.servidor) {
    iniciarLicaoDoServidor(trilha, indice);
    return;
  }
  // Criança sem conta: primeiro baixa as perguntas fáceis
  const idioma = idiomaDasTrilhas();
  if (perfilDeCrianca() && !conteudoKidsPronto(idioma)) {
    carregarAtividadesKids().then(() => {
      const pronta = trilhasLocais().find((t) => t.slug === trilha.slug) || trilha;
      iniciarLicao(pronta, indice);
    });
    return;
  }
  iniciarLicao(trilha, indice);
}

// ============================================================
//  LIÇÃO (tela cheia)
// ============================================================
let licaoAtual = null;

function embaralhar(lista) {
  const copia = lista.slice();
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
}

function perguntaAtual() {
  return licaoAtual.licao.conteudo[licaoAtual.fila[0]];
}

function iniciarLicao(trilha, indice) {
  const licao = trilha.licoes[indice];
  licaoAtual = {
    trilha,
    indice,
    licao,
    fila: licao.conteudo.map((_, i) => i), // perguntas que faltam acertar
    total: licao.conteudo.length,
    corretas: 0,
    primeiraTentativa: {},                  // índice -> acertou de primeira?
    selecao: null,
    montagem: null,
    verificada: false,
    acertouAtual: false,
    santidadeAcabou: false,
    finalizada: false,
  };
  mudarDeView('view-licao');
  renderizarCabecalhoDaMissao(trilha, indice, licao);
  avisarMascote('licao');
  renderizarPerguntaAtual();
}

function renderizarCabecalhoDaMissao(trilha, indice, licao) {
  const cabecalho = document.getElementById('licao-santo');
  if (!cabecalho) return;
  cabecalho.innerHTML = `
    <span class="licao-santo-foto" id="licao-santo-foto"><svg class="card-img-placeholder" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><use href="#icon-aureola"></use></svg></span>
    <span class="licao-santo-textos">
      <strong>${trilha.santo}</strong>
      <small>${tt('missao_de', { n: indice + 1, total: trilha.licoes.length, titulo: licao.titulo })}</small>
    </span>`;
  const santo = santoParaFotoDaTrilha(trilha);
  if (santo && typeof buscarImagemSanto === 'function') {
    buscarImagemSanto(santo).then((url) => {
      const alvo = document.getElementById('licao-santo-foto');
      if (url && alvo) alvo.innerHTML = `<img src="${url}" alt="${trilha.santo}">`;
    });
  }
}

function atualizarTopoDaLicao() {
  const barra = document.getElementById('licao-barra-preenchida');
  const santidadeEl = document.getElementById('licao-santidade');
  if (barra && licaoAtual) {
    const feitas = licaoAtual.servidor
      ? licaoAtual.servidor.respondidas + (licaoAtual.verificada ? 1 : 0)
      : licaoAtual.corretas + (licaoAtual.verificada && licaoAtual.acertouAtual ? 1 : 0);
    barra.style.width = `${Math.round((feitas / licaoAtual.total) * 100)}%`;
  }
  if (santidadeEl) {
    if (perfilEhInfantil()) {
      santidadeEl.textContent = '∞';
    } else {
      const estado = carregarProgressoTrilhas();
      renovarSantidade(estado);
      santidadeEl.textContent = `${estado.santidade}`;
    }
  }
}

function prepararRodapeDaLicao(textoBotao, habilitado, classeExtra) {
  const feedback = document.getElementById('licao-feedback');
  const botao = document.getElementById('licao-botao');
  if (feedback) { feedback.className = 'licao-feedback'; feedback.innerHTML = ''; }
  if (botao) {
    botao.className = `licao-botao${classeExtra ? ' ' + classeExtra : ''}`;
    botao.textContent = textoBotao;
    botao.disabled = !habilitado;
  }
}

function renderizarPerguntaAtual() {
  const corpo = document.getElementById('licao-corpo');
  if (!corpo || !licaoAtual) return;

  licaoAtual.selecao = null;
  licaoAtual.verificada = false;
  licaoAtual.acertouAtual = false;
  prepararRodapeDaLicao(tt('verificar'), false);
  atualizarTopoDaLicao();

  const p = perguntaAtual();

  if (p.tipo === 'multipla') {
    // As opções são embaralhadas a cada vez — a certa nunca fica
    // sempre no mesmo lugar.
    const opcoes = embaralhar(p.opcoes.map((texto, i) => ({ texto, correta: i === p.correta, original: i })));
    licaoAtual.montagem = { opcoes };
    corpo.innerHTML = `
      <p class="licao-tipo">${tt('escolha_certa')}</p>
      <h2 class="licao-enunciado">${p.enunciado}</h2>
      <div class="licao-opcoes">
        ${opcoes.map((o, i) => `<button class="licao-opcao" data-opcao="${i}">${o.texto}</button>`).join('')}
      </div>`;
    // A Lumi lê as opções na mesma ordem em que aparecem na tela
    avisarMascote('pergunta', { tipo: p.tipo, enunciado: p.enunciado, opcoes: opcoes.map((o) => o.texto) });
  } else if (p.tipo === 'vf') {
    licaoAtual.montagem = {};
    corpo.innerHTML = `
      <p class="licao-tipo">${tt('vf_titulo')}</p>
      <h2 class="licao-enunciado">${p.enunciado}</h2>
      <div class="licao-opcoes licao-vf">
        <button class="licao-opcao" data-vf="true">${tt('verdadeiro')}</button>
        <button class="licao-opcao" data-vf="false">${tt('falso')}</button>
      </div>`;
    avisarMascote('pergunta', { tipo: p.tipo, enunciado: p.enunciado });
  } else {
    let ordem = embaralhar(p.blocos.map((_, i) => i));
    // Nunca começa já na ordem certa
    if (ordem.length > 1 && ordem.every((v, i) => v === i)) ordem = ordem.slice(1).concat(ordem[0]);
    licaoAtual.montagem = { ordem };
    licaoAtual.selecao = [];
    corpo.innerHTML = `
      <p class="licao-tipo">${tt('monte_frase')}</p>
      <h2 class="licao-enunciado">${p.enunciado}</h2>
      <div class="ordenar-resposta" id="ordenar-resposta"></div>
      <div class="ordenar-banco" id="ordenar-banco"></div>`;
    renderizarOrdenar();
    avisarMascote('pergunta', { tipo: p.tipo, enunciado: p.enunciado, opcoes: ordem.map((i) => p.blocos[i]) });
    return;
  }

  corpo.querySelectorAll('.licao-opcao').forEach((botao) => {
    botao.addEventListener('click', () => {
      if (licaoAtual.verificada) return;
      corpo.querySelectorAll('.licao-opcao').forEach((b) => b.classList.remove('selecionada'));
      botao.classList.add('selecionada');
      if (botao.dataset.opcao !== undefined) selecionarResposta(Number(botao.dataset.opcao));
      else selecionarResposta(botao.dataset.vf === 'true');
    });
  });
}

function selecionarResposta(valor) {
  if (!licaoAtual || licaoAtual.verificada) return;
  licaoAtual.selecao = valor;
  const botao = document.getElementById('licao-botao');
  if (botao) botao.disabled = false;
}

function renderizarOrdenar() {
  const p = perguntaAtual();
  const resposta = document.getElementById('ordenar-resposta');
  const banco = document.getElementById('ordenar-banco');
  if (!resposta || !banco) return;
  const escolhidos = licaoAtual.selecao;

  resposta.innerHTML = escolhidos
    .map((original, pos) => `<button class="ordenar-bloco" data-pos="${pos}">${p.blocos[original]}</button>`)
    .join('');
  banco.innerHTML = licaoAtual.montagem.ordem
    .map((original) => {
      const usado = escolhidos.includes(original);
      return `<button class="ordenar-bloco${usado ? ' usado' : ''}" data-original="${original}"${usado ? ' disabled' : ''}>${p.blocos[original]}</button>`;
    })
    .join('');

  resposta.querySelectorAll('.ordenar-bloco').forEach((b) => {
    b.addEventListener('click', () => removerBlocoOrdenar(Number(b.dataset.pos)));
  });
  banco.querySelectorAll('.ordenar-bloco').forEach((b) => {
    b.addEventListener('click', () => adicionarBlocoOrdenar(Number(b.dataset.original)));
  });

  const botao = document.getElementById('licao-botao');
  if (botao) botao.disabled = escolhidos.length !== p.blocos.length;
}

function adicionarBlocoOrdenar(original) {
  if (!licaoAtual || licaoAtual.verificada || licaoAtual.selecao.includes(original)) return;
  licaoAtual.selecao.push(original);
  renderizarOrdenar();
}

function removerBlocoOrdenar(pos) {
  if (!licaoAtual || licaoAtual.verificada) return;
  licaoAtual.selecao.splice(pos, 1);
  renderizarOrdenar();
}

function respostaEstaCerta() {
  const p = perguntaAtual();
  if (p.tipo === 'multipla') return !!licaoAtual.montagem.opcoes[licaoAtual.selecao].correta;
  if (p.tipo === 'vf') return licaoAtual.selecao === p.correta;
  return licaoAtual.selecao.length === p.blocos.length && licaoAtual.selecao.every((v, i) => v === i);
}

function textoDaRespostaCerta(p) {
  if (p.tipo === 'multipla') return p.opcoes[p.correta];
  if (p.tipo === 'vf') return p.correta ? tt('verdadeiro') : tt('falso');
  if (p.ordemCerta) return p.ordemCerta.map((i) => p.blocos[i]).join(' ');
  return p.blocos.join(' ');
}

function marcarRespostasNaTela(certo) {
  const corpo = document.getElementById('licao-corpo');
  if (!corpo) return;
  const p = perguntaAtual();
  if (p.tipo === 'ordenar') {
    const resposta = document.getElementById('ordenar-resposta');
    if (resposta) resposta.classList.add(certo ? 'certa' : 'errada');
    return;
  }
  corpo.querySelectorAll('.licao-opcao').forEach((botao) => {
    const ehCerta = p.tipo === 'multipla'
      ? licaoAtual.montagem.opcoes[Number(botao.dataset.opcao)].correta
      : (botao.dataset.vf === 'true') === p.correta;
    if (ehCerta) botao.classList.add('certa');
    else if (botao.classList.contains('selecionada')) botao.classList.add('errada');
    botao.disabled = true;
  });
}

function verificarRespostaAtual() {
  if (!licaoAtual || licaoAtual.verificada) return;
  const p = perguntaAtual();
  if (licaoAtual.selecao === null) return;
  if (p.tipo === 'ordenar' && licaoAtual.selecao.length !== p.blocos.length) return;

  // Com conta, quem confere a resposta é o banco do app
  if (licaoAtual.servidor) {
    verificarRespostaNoServidor();
    return;
  }

  const certo = respostaEstaCerta();

  // Errou: perde 1 de Santidade
  if (!certo) {
    const estado = carregarProgressoTrilhas();
    renovarSantidade(estado);
    perderSantidade(estado);
    salvarProgressoTrilhas(estado);
    licaoAtual.santidadeAcabou = estado.santidade <= 0;
  }
  mostrarResultadoDaResposta(certo);
}

// Mostra na tela se acertou ou errou (igual com ou sem conta)
function mostrarResultadoDaResposta(certo) {
  const p = perguntaAtual();
  const indice = licaoAtual.fila[0];
  licaoAtual.verificada = true;
  licaoAtual.acertouAtual = certo;
  if (licaoAtual.primeiraTentativa[indice] === undefined) licaoAtual.primeiraTentativa[indice] = certo;

  atualizarTopoDaLicao();
  marcarRespostasNaTela(certo);

  // Com criança, a Lumi reage e a tela mostra a mesma frase que ela fala
  const fraseDaLumi = avisarMascote('resposta', {
    certo,
    explicacao: p.explicacao,
    respostaCerta: certo ? null : textoDaRespostaCerta(p),
    semRepetir: !!licaoAtual.servidor, // com conta, a pergunta não volta no fim
  });

  const feedback = document.getElementById('licao-feedback');
  const botao = document.getElementById('licao-botao');
  if (feedback) {
    const elogios = tt('elogios');
    feedback.className = `licao-feedback mostrar ${certo ? 'certo' : 'errado'}`;
    feedback.innerHTML = certo
      ? `<strong>${fraseDaLumi || elogios[Math.floor(Math.random() * elogios.length)]}</strong><p>${p.explicacao}</p>`
      : `<strong>${fraseDaLumi || tt('quase')}</strong><p><b>${tt('resposta_certa')}</b> ${textoDaRespostaCerta(p)}</p><p>${p.explicacao}</p>`;
  }
  if (botao) {
    botao.className = `licao-botao ${certo ? 'certo' : 'errado'}`;
    botao.textContent = tt('continuar');
    botao.disabled = false;
  }
  somDaLicao(certo ? 'certo' : 'errado');
}

function continuarLicao() {
  if (!licaoAtual) return;
  if (licaoAtual.santidadeAcabou) {
    mostrarFimSemSantidade();
    return;
  }
  if (licaoAtual.servidor) {
    // Regra do app: cada pergunta é respondida uma vez por tentativa
    if (licaoAtual.acertouAtual) licaoAtual.corretas += 1;
    licaoAtual.servidor.respondidas += 1;
    licaoAtual.fila.shift();
    if (licaoAtual.fila.length === 0) finalizarLicaoNoServidor();
    else renderizarPerguntaAtual();
    return;
  }
  if (licaoAtual.acertouAtual) {
    licaoAtual.fila.shift();
    licaoAtual.corretas += 1;
  } else {
    // Como no Duolingo: a pergunta errada volta no fim da lição
    licaoAtual.fila.push(licaoAtual.fila.shift());
  }
  if (licaoAtual.fila.length === 0) {
    finalizarLicao();
    return;
  }
  renderizarPerguntaAtual();
}

function finalizarLicao() {
  const { trilha, licao, total } = licaoAtual;
  const acertosDePrimeira = Object.values(licaoAtual.primeiraTentativa).filter(Boolean).length;

  const estado = carregarProgressoTrilhas();
  const anterior = estado.licoes[licao.slug];
  const feGanha = anterior ? FE_REVISAO : FE_BASE_LICAO + FE_POR_ACERTO_DE_PRIMEIRA * acertosDePrimeira;
  estado.fe += feGanha;
  estado.licoes[licao.slug] = {
    concluidaEm: new Date().toISOString(),
    melhorAcertos: Math.max(anterior ? anterior.melhorAcertos : 0, acertosDePrimeira),
    total,
  };

  let insigniaNova = false;
  if (trilhaConcluida(trilha, estado) && !estado.insignias[trilha.slug]) {
    estado.insignias[trilha.slug] = new Date().toISOString();
    insigniaNova = true;
  }
  salvarProgressoTrilhas(estado);

  licaoAtual.finalizada = true;
  licaoAtual.corretas = total;
  atualizarTopoDaLicao();
  somDaLicao('fim');

  const corpo = document.getElementById('licao-corpo');
  if (corpo) {
    corpo.innerHTML = `
      <div class="licao-fim">
        <div class="licao-fim-icone">${insigniaNova ? icone('medalha') : icone('estrela')}</div>
        <h2>${tt('missao_concluida')}</h2>
        <p class="licao-fim-sub">${licao.titulo} · ${trilha.titulo}</p>
        <div class="licao-fim-dados">
          <div class="licao-fim-dado"><strong id="licao-fe-ganha">+${feGanha}</strong><span>${tt('de_fe')}</span></div>
          <div class="licao-fim-dado"><strong>${acertosDePrimeira}/${total}</strong><span>${tt('de_primeira')}</span></div>
        </div>
        ${insigniaNova ? `
        <div class="insignia-conquistada">
          <div class="insignia-icone">${icone('medalha')}</div>
          <h3>${tt('insignia_de', { santo: trilha.santo })}</h3>
          <p>${tt('ganhou_medalha', { medalha: nomeDaMedalha(trilha) })}</p>
        </div>` : ''}
      </div>`;
  }
  avisarMascote('concluiu', { medalha: insigniaNova });
  prepararRodapeDaLicao(tt('continuar'), true);
}

function mostrarFimSemSantidade() {
  const { trilha } = licaoAtual;
  const estado = carregarProgressoTrilhas();
  renovarSantidade(estado);
  licaoAtual.finalizada = true;

  const corpo = document.getElementById('licao-corpo');
  if (corpo) {
    corpo.innerHTML = `
      <div class="licao-fim">
        <div class="licao-fim-icone">${icone('pomba')}</div>
        <h2>${tt('santidade_acabou')}</h2>
        <p class="licao-fim-sub">${tt('santidade_renova', { intervalo: MINUTOS_PARA_RENOVAR_SANTIDADE, min: minutosParaProximaSantidade(estado) })}</p>
        ${trilha.santoId ? `<button class="btn-ask-ai" id="licao-ler-historia">${tt('ler_enquanto', { santo: trilha.santo })}</button>` : ''}
      </div>`;
    const lerHistoria = document.getElementById('licao-ler-historia');
    if (lerHistoria) {
      lerHistoria.addEventListener('click', () => {
        licaoAtual = null;
        avisarMascote('saiu');
        showDetail(trilha.santoId);
      });
    }
  }
  // A Lumi senta e cochila, esperando a Santidade voltar
  avisarMascote('semSantidade');
  prepararRodapeDaLicao(tt('voltar_trilhas'), true);
}

function sairDaLicao(perguntarAntes) {
  if (perguntarAntes && licaoAtual && !licaoAtual.finalizada) {
    const confirmou = confirm(tt('sair_confirmar'));
    if (!confirmou) return;
  }
  // Saiu da lição: a voz da Lumi para na hora
  avisarMascote('saiu');
  const slug = licaoAtual ? licaoAtual.trilha.slug : null;
  licaoAtual = null;
  abrirTrilhas(slug);
}

function aoClicarBotaoDaLicao() {
  if (!licaoAtual) return;
  if (licaoAtual.servidor && licaoAtual.servidor.enviando) return;
  if (licaoAtual.lendoHistoria) {
    licaoAtual.lendoHistoria = false;
    renderizarPerguntaAtual();
    return;
  }
  if (licaoAtual.finalizada) sairDaLicao(false);
  else if (!licaoAtual.verificada) verificarRespostaAtual();
  else continuarLicao();
}

// ============================================================
//  MINHAS INSÍGNIAS
// ============================================================
// Mostra todas as medalhas: as conquistadas e as que ainda faltam.
// Funciona com ou sem conta.
function abrirInsignias() {
  const estado = carregarProgressoTrilhas();
  const trilhas = trilhasEmUso();
  const conquistadas = trilhas.filter((t) => trilhaConcluida(t, estado));

  let modal = document.getElementById('insignias-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'insignias-modal';
    modal.className = 'insignias-modal';
    modal.innerHTML = '<div class="insignias-caixa"><button class="insignias-fechar">&times;</button><h2></h2><p class="insignias-resumo"></p><div class="insignias-grade"></div></div>';
    document.body.appendChild(modal);
    modal.addEventListener('click', (e) => {
      if (e.target === modal || e.target.classList.contains('insignias-fechar')) modal.classList.remove('aberto');
    });
  }

  // Os textos são escritos a cada abertura: seguem o idioma do momento
  modal.querySelector('.insignias-fechar').setAttribute('aria-label', tt('fechar'));
  modal.querySelector('h2').textContent = tt('insignias_titulo');
  modal.querySelector('.insignias-resumo').textContent =
    tt('insignias_resumo', { feitas: conquistadas.length, total: trilhas.length });
  modal.querySelector('.insignias-grade').innerHTML = trilhas.map((trilha) => {
    const tem = trilhaConcluida(trilha, estado);
    const feitas = trilha.licoes.filter((l) => estado.licoes[l.slug]).length;
    return `
      <div class="insignia-item ${tem ? 'conquistada' : ''}">
        <span class="insignia-medalha">${icone(tem ? 'medalha' : 'cadeado')}</span>
        <strong>${tem ? nomeDaMedalha(trilha) : trilha.medalha}</strong>
        <span class="insignia-santo">${trilha.santo}</span>
        <span class="insignia-progresso">${tem ? tt('conquistada') : tt('missoes_feitas', { feitas, total: trilha.licoes.length })}</span>
      </div>`;
  }).join('');
  modal.classList.add('aberto');
}

// ============================================================
//  LIÇÃO COM CONTA — o banco do app entrega as perguntas (sem as
//  respostas), confere cada resposta e registra a Fé no final.
// ============================================================
function converterPerguntaDoServidor(q) {
  const base = { idServidor: q.id, enunciado: escaparHtmlDaTrilha(textoNoIdioma(q.prompt)), explicacao: '' };
  const opcoes = listaNoIdioma(q.options).map(escaparHtmlDaTrilha);
  if (q.qtype === 'single') return Object.assign(base, { tipo: 'multipla', opcoes, correta: null });
  if (q.qtype === 'truefalse') return Object.assign(base, { tipo: 'vf', correta: null });
  return Object.assign(base, { tipo: 'ordenar', blocos: opcoes, ordemCerta: null });
}

function mensagemDeErroDaLicao(erro) {
  const texto = String((erro && erro.message) || '');
  if (texto.includes('no_santidade')) return tt('erro_sem_santidade');
  if (texto.includes('lesson_locked')) return tt('conclua_missao');
  if (texto.includes('lesson_empty')) return tt('erro_sem_perguntas');
  return tt('erro_abrir');
}

async function iniciarLicaoDoServidor(trilha, indice) {
  const resumo = trilha.licoes[indice];
  const membro = typeof obterMembroAtivo === 'function' ? obterMembroAtivo() : null;
  if (!membro || !resumo) return;

  let dados;
  try {
    const { data, error } = await supabaseCliente.rpc('start_lesson', { _pid: membro.id, _lid: resumo.id });
    if (error) throw error;
    dados = data;
  } catch (erro) {
    mostrarAvisoTrilhas(mensagemDeErroDaLicao(erro));
    return;
  }

  const conteudo = (dados.questions || []).map(converterPerguntaDoServidor);
  if (conteudo.length === 0) {
    mostrarAvisoTrilhas(tt('erro_sem_perguntas'));
    return;
  }
  const licao = { slug: resumo.slug, id: resumo.id, titulo: resumo.titulo, conteudo };
  licaoAtual = {
    trilha,
    indice,
    licao,
    fila: conteudo.map((_, i) => i),
    total: conteudo.length,
    corretas: 0,
    primeiraTentativa: {},
    selecao: null,
    montagem: null,
    verificada: false,
    acertouAtual: false,
    santidadeAcabou: false,
    finalizada: false,
    lendoHistoria: false,
    servidor: { tentativa: dados.attempt_id, respondidas: 0, enviando: false },
  };
  if (typeof dados.santidade === 'number' && estadoEmMemoriaDaConta) estadoEmMemoriaDaConta.santidade = dados.santidade;

  mudarDeView('view-licao');
  renderizarCabecalhoDaMissao(trilha, indice, licao);
  avisarMascote('licao');
  const historia = textoNoIdioma(dados.story);
  if (historia) mostrarHistoriaDaLicao(historia);
  else renderizarPerguntaAtual();
}

// Algumas lições do app começam com uma leitura curta
function mostrarHistoriaDaLicao(texto) {
  const corpo = document.getElementById('licao-corpo');
  if (!corpo || !licaoAtual) return;
  licaoAtual.lendoHistoria = true;
  atualizarTopoDaLicao();
  corpo.innerHTML = `
    <p class="licao-tipo">${tt('leia_antes')}</p>
    <div class="licao-historia">${escaparHtmlDaTrilha(texto)}</div>`;
  prepararRodapeDaLicao(tt('comecar'), true);
  // Para a criança que ainda não lê, a Lumi conta a historinha
  avisarMascote('historia', { texto });
}

async function verificarRespostaNoServidor() {
  const p = perguntaAtual();
  const servidor = licaoAtual.servidor;
  if (servidor.enviando) return;

  let resposta;
  if (p.tipo === 'multipla') resposta = { index: licaoAtual.montagem.opcoes[licaoAtual.selecao].original };
  else if (p.tipo === 'vf') resposta = { value: licaoAtual.selecao === true };
  else resposta = { order: licaoAtual.selecao.slice() };

  servidor.enviando = true;
  const botao = document.getElementById('licao-botao');
  if (botao) { botao.disabled = true; botao.textContent = tt('verificando'); }

  let resultado;
  try {
    const { data, error } = await supabaseCliente.rpc('submit_answer', {
      _attempt: servidor.tentativa,
      _qid: p.idServidor,
      _answer: resposta,
    });
    if (error) throw error;
    resultado = data;
  } catch (erro) {
    servidor.enviando = false;
    if (botao) { botao.disabled = false; botao.textContent = tt('verificar'); }
    mostrarAvisoTrilhas(tt('erro_conferir'));
    return;
  }
  servidor.enviando = false;

  // Agora o banco contou qual era a resposta certa: completa a
  // pergunta para marcar certo/errado na tela.
  const chave = resultado.answer || {};
  if (p.tipo === 'multipla') {
    p.correta = chave.index;
    licaoAtual.montagem.opcoes.forEach((o) => { o.correta = o.original === chave.index; });
  } else if (p.tipo === 'vf') {
    p.correta = chave.value === true;
  } else {
    p.ordemCerta = Array.isArray(chave.order) ? chave.order : null;
  }
  p.explicacao = escaparHtmlDaTrilha(textoNoIdioma(resultado.explanation));

  if (typeof resultado.santidade === 'number' && estadoEmMemoriaDaConta) {
    const estado = estadoEmMemoriaDaConta;
    if (estado.santidade >= SANTIDADE_MAXIMA && resultado.santidade < SANTIDADE_MAXIMA) estado.santidadeMarcadaEm = Date.now();
    estado.santidade = resultado.santidade;
  }
  licaoAtual.santidadeAcabou = !!resultado.failed;
  mostrarResultadoDaResposta(!!resultado.correct);
}

function estrelasDaMissao(quantas) {
  return [1, 2, 3].map((n) => icone('estrela', n <= quantas ? 'estrela-acesa' : 'estrela-apagada')).join('');
}

async function finalizarLicaoNoServidor() {
  const { trilha, licao, total } = licaoAtual;
  licaoAtual.finalizada = true;
  licaoAtual.servidor.respondidas = total;
  atualizarTopoDaLicao();
  prepararRodapeDaLicao(tt('salvando'), false);
  const corpo = document.getElementById('licao-corpo');

  let r;
  try {
    const { data, error } = await supabaseCliente.rpc('finish_lesson', { _attempt: licaoAtual.servidor.tentativa });
    if (error) throw error;
    r = data;
  } catch (erro) {
    if (corpo) corpo.innerHTML = `<div class="licao-fim"><h2>${tt('erro_salvar_titulo')}</h2><p class="licao-fim-sub">${tt('erro_salvar_texto')}</p></div>`;
    prepararRodapeDaLicao(tt('voltar_trilhas'), true);
    return;
  }
  if (r.status === 'failed') {
    mostrarFimSemSantidade();
    return;
  }

  // Números oficiais do banco
  const estado = estadoEmMemoriaDaConta;
  const jaTinhaInsignia = estado ? trilhaConcluida(trilha, estado) : true;
  if (estado) {
    estado.fe = r.faith_total;
    estado.ofensiva = r.streak;
    if (typeof r.santidade === 'number') estado.santidade = r.santidade;
    estado.licoes[licao.slug] = { concluidaEm: new Date().toISOString(), estrelas: r.stars };
  }
  const insigniaNova = !!estado && !jaTinhaInsignia && trilhaConcluida(trilha, estado);
  if (insigniaNova) estado.insignias[trilha.slug] = new Date().toISOString();
  const membro = typeof obterMembroAtivo === 'function' ? obterMembroAtivo() : null;
  if (membro) Object.assign(membro, { fe: r.faith_total, ofensiva: r.streak, santidade: r.santidade });

  somDaLicao('fim');
  if (corpo) {
    corpo.innerHTML = `
      <div class="licao-fim">
        <div class="licao-fim-icone">${insigniaNova ? icone('medalha') : icone('estrela')}</div>
        <h2>${tt('missao_concluida')}</h2>
        <p class="licao-fim-sub">${licao.titulo} · ${trilha.titulo}</p>
        <div class="licao-estrelas" aria-label="${tt('estrelas', { n: r.stars })}">${estrelasDaMissao(r.stars)}</div>
        <div class="licao-fim-dados">
          <div class="licao-fim-dado"><strong id="licao-fe-ganha">+${r.faith_awarded}</strong><span>${tt('de_fe')}</span></div>
          <div class="licao-fim-dado"><strong>${r.correct}/${r.total}</strong><span>${tt('acertos')}</span></div>
        </div>
        ${insigniaNova ? `
        <div class="insignia-conquistada">
          <div class="insignia-icone">${icone('medalha')}</div>
          <h3>${tt('insignia_de', { santo: trilha.santo })}</h3>
          <p>${tt('ganhou_medalha', { medalha: nomeDaMedalha(trilha) })}</p>
        </div>` : ''}
      </div>`;
  }
  avisarMascote('concluiu', { medalha: insigniaNova });
  prepararRodapeDaLicao(tt('continuar'), true);
}

// ============================================================
//  INICIALIZAÇÃO
// ============================================================
function iniciarTrilhas() {
  const botaoInsignias = document.getElementById('trilhas-abrir-insignias');
  if (botaoInsignias) botaoInsignias.addEventListener('click', abrirInsignias);
  const atalho = document.getElementById('nav-trilhas');
  if (atalho) atalho.addEventListener('click', () => abrirTrilhas());

  const voltar = document.getElementById('btn-back-trilhas');
  if (voltar) voltar.addEventListener('click', () => mudarDeView('view-home'));

  const fechar = document.getElementById('licao-fechar');
  if (fechar) fechar.addEventListener('click', () => sairDaLicao(true));

  const botao = document.getElementById('licao-botao');
  if (botao) botao.addEventListener('click', aoClicarBotaoDaLicao);
}

document.addEventListener('DOMContentLoaded', () => {
  if (typeof rodarComSeguranca === 'function') rodarComSeguranca('trilhas dos santos', iniciarTrilhas);
  else iniciarTrilhas();
});
