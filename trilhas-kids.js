// ============================================================
//  LUMINA SANCTI — PERGUNTAS DAS CRIANÇAS
// ============================================================
// Uma versão simples de cada capítulo das trilhas, para os perfis de
// criança. As chaves são as mesmas de ATIVIDADES_EXTRAS (o "slug" de
// cada capítulo) e cada capítulo tem 10 atividades, como o de adulto:
// assim as missões e o progresso são exatamente os mesmos.
//
// Como as perguntas das crianças são escritas:
//   - frases curtas, palavras do dia a dia, no máximo duas linhas;
//   - três opções na múltipla escolha, nunca quatro;
//   - mais verdadeiro ou falso e só um "ordenar" por trilha;
//   - nada de datas, números de documentos ou palavras difíceis;
//   - o foco é o gesto bonito e simples: quem ajudou, quem perdoou,
//     quem cuidou;
//   - a explicação é carinhosa e ensina uma frase só;
//   - nada inventado: quando é uma história antiga da tradição, a
//     pergunta diz isso.
//
// "correta" é a POSIÇÃO da resposta certa (começa em 0). O site
// embaralha as opções na tela.
//
// Este arquivo só é baixado quando precisa (perfil de criança sem
// conta). Com conta, estas mesmas perguntas chegam pelo banco do app:
// o supabase/gerar-importacao.js leva todas para o público "kid".

window.ATIVIDADES_KIDS = {
  // ---------------- SÃO FRANCISCO DE ASSIS ----------------
  "francisco-1": [
    {"tipo":"multipla","enunciado":"Em que cidade nasceu São Francisco?","opcoes":["Assis","Roma","Lisboa"],"correta":0,"explicacao":"Francisco nasceu em Assis, uma cidadezinha linda da Itália."},
    {"tipo":"vf","enunciado":"Quando era jovem, Francisco sonhava em ser cavaleiro.","correta":true,"explicacao":"Ele queria ser um cavaleiro famoso, mas Deus tinha um sonho ainda maior para ele."},
    {"tipo":"multipla","enunciado":"O que o pai de Francisco vendia?","opcoes":["Tecidos","Pães","Sapatos"],"correta":0,"explicacao":"O pai de Francisco vendia tecidos bonitos e era muito rico."},
    {"tipo":"vf","enunciado":"Francisco nasceu numa família pobre.","correta":false,"explicacao":"A família dele era rica; Francisco escolheu ser pobre por amor a Jesus."},
    {"tipo":"multipla","enunciado":"O que Francisco fez quando encontrou um homem muito doente na estrada?","opcoes":["Deu um abraço nele","Fugiu correndo","Fingiu que não viu"],"correta":0,"explicacao":"Francisco abraçou o doente, porque via Jesus em quem sofria."},
    {"tipo":"vf","enunciado":"Francisco devolveu ao pai até as roupas que estava usando.","correta":true,"explicacao":"Ele quis mostrar que, dali em diante, seu tesouro era só o Pai do Céu."},
    {"tipo":"multipla","enunciado":"Que tipo de vida Francisco escolheu?","opcoes":["Uma vida pobre, como Jesus","Uma vida de rei","Uma vida de soldado"],"correta":0,"explicacao":"Francisco quis viver simples e pobre, como Jesus viveu."},
    {"tipo":"vf","enunciado":"Quando era jovem, Francisco ficou preso depois de uma guerra.","correta":true,"explicacao":"Na prisão, Francisco começou a pensar mais em Deus."},
    {"tipo":"multipla","enunciado":"Depois de conhecer Jesus de verdade, Francisco ficou:","opcoes":["Muito alegre","Muito bravo","Muito triste"],"correta":0,"explicacao":"Francisco era tão alegre que cantava louvores a Deus pelos caminhos."},
    {"tipo":"vf","enunciado":"Quando nasceu, Francisco recebeu o nome de João.","correta":true,"explicacao":"A mãe o batizou de João, mas todos passaram a chamá-lo de Francisco."}
  ],
  "francisco-2": [
    {"tipo":"multipla","enunciado":"O que Jesus pediu a Francisco na igrejinha de São Damião?","opcoes":["Que cuidasse da sua Igreja","Que morasse num castelo","Que virasse soldado"],"correta":0,"explicacao":"Jesus pediu: vai e repara a minha casa, e Francisco obedeceu com alegria."},
    {"tipo":"ordenar","enunciado":"Monte o pedido que Francisco ouviu de Jesus:","blocos":["Francisco,","vai e repara","a minha casa"],"explicacao":"Jesus chamou Francisco para cuidar da sua Igreja."},
    {"tipo":"multipla","enunciado":"O que Francisco fez primeiro depois de ouvir Jesus?","opcoes":["Consertou igrejinhas com as mãos","Foi dormir","Comprou um cavalo"],"correta":0,"explicacao":"Ele carregou pedras e consertou a igrejinha de São Damião."},
    {"tipo":"vf","enunciado":"Francisco consertou a igrejinha de São Damião com as próprias mãos.","correta":true,"explicacao":"Ele carregava pedras e pedia ajuda a quem passava."},
    {"tipo":"multipla","enunciado":"Como se chamam os amigos que seguiram Francisco?","opcoes":["Franciscanos","Marinheiros","Cavaleiros"],"correta":0,"explicacao":"Os franciscanos são os frades que vivem do jeito que Francisco ensinou."},
    {"tipo":"vf","enunciado":"Francisco vivia com os amigos como irmãos.","correta":true,"explicacao":"Ele chamava os companheiros de irmãos e repartia tudo com eles."},
    {"tipo":"multipla","enunciado":"Quem aprovou o jeito de viver de Francisco e seus irmãos?","opcoes":["O Papa","Um rei","Um general"],"correta":0,"explicacao":"Francisco foi até Roma, e o Papa aprovou a vida dos frades."},
    {"tipo":"vf","enunciado":"Francisco foi padre.","correta":false,"explicacao":"Francisco nunca foi padre, mas amava muito a Missa."},
    {"tipo":"multipla","enunciado":"Como Francisco tratava os pobres?","opcoes":["Com carinho, como irmãos","Com raiva","Com desprezo"],"correta":0,"explicacao":"Francisco repartia o que tinha e tratava cada pobre como um irmão."},
    {"tipo":"vf","enunciado":"Frades menores quer dizer irmãos pequenos e humildes.","correta":true,"explicacao":"Eles queriam ser os menores de todos, para servir a todos."}
  ],
  "francisco-3": [
    {"tipo":"multipla","enunciado":"No seu cântico, Francisco agradece a Deus por quê?","opcoes":["Pelo sol, pela lua e pela natureza","Pelo dinheiro","Pelos castelos"],"correta":0,"explicacao":"É o Cântico das Criaturas: ele louva a Deus pelo irmão sol e pela irmã lua."},
    {"tipo":"vf","enunciado":"Francisco chamava o sol de irmão sol.","correta":true,"explicacao":"Para Francisco, tudo o que Deus criou era irmão."},
    {"tipo":"multipla","enunciado":"Numa história antiga, Francisco fez as pazes com qual animal bravo?","opcoes":["Um lobo","Um gato","Um coelho"],"correta":0,"explicacao":"Conta a história que o lobo de Gubbio ficou manso e virou amigo do povo."},
    {"tipo":"vf","enunciado":"Francisco montou um presépio vivo numa noite de Natal.","correta":true,"explicacao":"Ele quis que todos vissem como Jesus nasceu pobrezinho em Belém."},
    {"tipo":"multipla","enunciado":"Como era o presépio que Francisco montou?","opcoes":["Com pessoas e animais de verdade","Feito de chocolate","Feito de gelo"],"correta":0,"explicacao":"Com um boi e um burrinho de verdade, ele lembrou o nascimento de Jesus."},
    {"tipo":"vf","enunciado":"Conta a tradição que Francisco pregou até para os passarinhos.","correta":true,"explicacao":"Ele pedia que os passarinhos louvassem a Deus, e eles ficavam quietinhos ouvindo."},
    {"tipo":"multipla","enunciado":"São Francisco é padroeiro de quem?","opcoes":["Dos animais e da natureza","Dos bancos","Dos carros"],"correta":0,"explicacao":"Por isso muita gente leva os bichinhos para receber uma bênção no dia dele."},
    {"tipo":"vf","enunciado":"Francisco dizia que a lua é nossa irmã.","correta":true,"explicacao":"No seu cântico, ele louva a Deus pela irmã lua e pelas estrelas."},
    {"tipo":"multipla","enunciado":"Como Francisco chamava a água?","opcoes":["Irmã água","Coisa feia","Inimiga"],"correta":0,"explicacao":"Ele dizia que a irmã água é útil, humilde e preciosa."},
    {"tipo":"vf","enunciado":"Francisco achava que só as pessoas eram criaturas de Deus.","correta":false,"explicacao":"Francisco amava todas as criaturas: pessoas, bichos, plantas e estrelas."}
  ],

  // ---------------- SÃO JOSÉ ----------------
  "jose-1": [
    {"tipo":"multipla","enunciado":"Qual era o trabalho de São José?","opcoes":["Carpinteiro","Pescador","Pastor"],"correta":0,"explicacao":"José era carpinteiro e fazia coisas de madeira com as mãos."},
    {"tipo":"vf","enunciado":"A Bíblia não conta nenhuma palavra dita por José.","correta":true,"explicacao":"José falava pouco e fazia muito: ele obedecia a Deus em silêncio."},
    {"tipo":"multipla","enunciado":"Como a Bíblia chama José?","opcoes":["Homem justo","Homem bravo","Homem rico"],"correta":0,"explicacao":"Justo quer dizer bom e fiel a Deus."},
    {"tipo":"vf","enunciado":"José era da família do rei Davi.","correta":true,"explicacao":"Por isso Jesus também é chamado filho de Davi."},
    {"tipo":"multipla","enunciado":"Quem avisou José, em sonho, que o bebê de Maria vinha de Deus?","opcoes":["Um anjo","Um soldado","Um vizinho"],"correta":0,"explicacao":"Deus mandou um anjo para acalmar o coração de José."},
    {"tipo":"vf","enunciado":"José recebeu Maria em sua casa e cuidou dela com amor.","correta":true,"explicacao":"Ele obedeceu ao anjo e ficou ao lado de Maria."},
    {"tipo":"multipla","enunciado":"Que nome o anjo mandou dar ao menino?","opcoes":["Jesus","Pedro","Davi"],"correta":0,"explicacao":"Jesus quer dizer Deus salva."},
    {"tipo":"vf","enunciado":"José teve medo e abandonou Maria.","correta":false,"explicacao":"José foi fiel: confiou em Deus e cuidou de Maria e de Jesus."},
    {"tipo":"multipla","enunciado":"Em que cidade Jesus nasceu?","opcoes":["Belém","Roma","Lisboa"],"correta":0,"explicacao":"Jesus nasceu em Belém, e José estava lá cuidando de tudo."},
    {"tipo":"vf","enunciado":"José cuidou de Jesus desde bebê.","correta":true,"explicacao":"José foi o pai que Deus escolheu para cuidar de Jesus aqui na terra."}
  ],
  "jose-2": [
    {"tipo":"multipla","enunciado":"Como José soube que precisava fugir com a família?","opcoes":["Um anjo avisou em sonho","Recebeu uma carta","Ouviu no mercado"],"correta":0,"explicacao":"José sempre escutava a voz de Deus e obedecia na hora."},
    {"tipo":"vf","enunciado":"A Sagrada Família fugiu para proteger o menino Jesus.","correta":true,"explicacao":"O rei Herodes queria fazer mal ao menino, e José protegeu a família."},
    {"tipo":"multipla","enunciado":"Para que país a Sagrada Família fugiu?","opcoes":["Egito","Japão","Brasil"],"correta":0,"explicacao":"Eles fizeram uma viagem bem longa até o Egito."},
    {"tipo":"vf","enunciado":"José partiu com Maria e Jesus durante a noite.","correta":true,"explicacao":"Ele se levantou de noite e partiu logo, para proteger a família."},
    {"tipo":"multipla","enunciado":"Onde a Sagrada Família foi morar depois?","opcoes":["Nazaré","Paris","Roma"],"correta":0,"explicacao":"Em Nazaré, Jesus cresceu ao lado de Maria e José."},
    {"tipo":"ordenar","enunciado":"Monte o caminho da Sagrada Família:","blocos":["Jesus nasce em Belém","Fogem para o Egito","Voltam para Nazaré"],"explicacao":"José guiou a família em cada passo, com coragem."},
    {"tipo":"vf","enunciado":"Uma vez, José e Maria procuraram Jesus por três dias.","correta":true,"explicacao":"Eles o encontraram no Templo, conversando com os mestres."},
    {"tipo":"multipla","enunciado":"Onde encontraram Jesus depois de três dias?","opcoes":["No Templo","Na praia","No mercado"],"correta":0,"explicacao":"Jesus estava na casa de Deus, ouvindo e fazendo perguntas."},
    {"tipo":"vf","enunciado":"José era um pai preguiçoso.","correta":false,"explicacao":"José era trabalhador e cuidadoso: protegia a família com amor."},
    {"tipo":"multipla","enunciado":"Quem levou o bebê Jesus ao Templo junto com Maria?","opcoes":["José","Pedro","João"],"correta":0,"explicacao":"José e Maria apresentaram Jesus a Deus no Templo."}
  ],
  "jose-3": [
    {"tipo":"multipla","enunciado":"São José é o protetor de quem?","opcoes":["De toda a Igreja","Só dos reis","Só dos soldados"],"correta":0,"explicacao":"Assim como cuidou de Jesus, José cuida da Igreja inteira."},
    {"tipo":"vf","enunciado":"São José é chamado protetor da Sagrada Família.","correta":true,"explicacao":"Ele protegeu Jesus e Maria com todo o carinho."},
    {"tipo":"multipla","enunciado":"Que trabalho Jesus aprendeu com José?","opcoes":["Carpinteiro","Pintor","Cozinheiro"],"correta":0,"explicacao":"Jesus aprendeu com José a trabalhar a madeira."},
    {"tipo":"vf","enunciado":"Existe uma festa de São José Operário, que lembra o valor do trabalho.","correta":true,"explicacao":"Trabalhar com amor também é um jeito de rezar."},
    {"tipo":"multipla","enunciado":"Segundo a tradição, quem estava perto de José quando ele foi para o Céu?","opcoes":["Jesus e Maria","Os soldados","Ninguém"],"correta":0,"explicacao":"A tradição conta que José partiu nos braços de Jesus e Maria."},
    {"tipo":"vf","enunciado":"O Papa Francisco escreveu uma carta sobre São José.","correta":true,"explicacao":"A carta se chama Com coração de pai."},
    {"tipo":"multipla","enunciado":"Como é o coração de José, segundo a carta do Papa?","opcoes":["Coração de pai","Coração de pedra","Coração de gelo"],"correta":0,"explicacao":"José amou Jesus com um coração de pai, cheio de ternura."},
    {"tipo":"vf","enunciado":"Podemos pedir a São José que reze por nós.","correta":true,"explicacao":"Os santos são amigos de Deus e rezam pela gente."},
    {"tipo":"multipla","enunciado":"Complete: Jesus, Maria e...","opcoes":["José","Pedro","Paulo"],"correta":0,"explicacao":"Jesus, Maria e José formam a Sagrada Família."},
    {"tipo":"vf","enunciado":"José trabalhava para sustentar a família.","correta":true,"explicacao":"Com o seu trabalho, José garantia o pão de cada dia em casa."}
  ],

  // ---------------- SANTA TERESINHA ----------------
  "teresinha-1": [
    {"tipo":"multipla","enunciado":"Em que país Teresinha nasceu?","opcoes":["França","Brasil","Japão"],"correta":0,"explicacao":"Teresinha nasceu na França e morou numa cidade chamada Lisieux."},
    {"tipo":"vf","enunciado":"Teresinha dizia que era uma florzinha de Jesus.","correta":true,"explicacao":"Ela se via como uma florzinha simples no jardim de Deus."},
    {"tipo":"multipla","enunciado":"Como se chamavam os pais de Teresinha?","opcoes":["Luís e Zélia","Pedro e Ana","Jorge e Rosa"],"correta":0,"explicacao":"Luís e Zélia também foram declarados santos!"},
    {"tipo":"vf","enunciado":"Os pais de Teresinha também são santos.","correta":true,"explicacao":"Era uma família inteira que amava a Deus."},
    {"tipo":"multipla","enunciado":"Quantas irmãs de Teresinha também se tornaram freiras?","opcoes":["Quatro","Nenhuma","Vinte"],"correta":0,"explicacao":"Maria, Paulina, Leônia e Celina também deram a vida a Deus."},
    {"tipo":"vf","enunciado":"Teresinha pediu ao Papa para entrar cedo no convento.","correta":true,"explicacao":"Ainda mocinha, ela falou com o Papa pessoalmente, cheia de coragem."},
    {"tipo":"multipla","enunciado":"Para que Teresinha foi morar num convento?","opcoes":["Para rezar e amar Jesus","Para ficar famosa","Para ganhar dinheiro"],"correta":0,"explicacao":"No convento, ela rezava por todas as pessoas do mundo."},
    {"tipo":"vf","enunciado":"Teresinha viveu até ficar bem velhinha.","correta":false,"explicacao":"Teresinha foi para o Céu ainda jovem, mas viveu cada dia com muito amor."},
    {"tipo":"multipla","enunciado":"Que nome Teresinha ganhou no convento?","opcoes":["Teresa do Menino Jesus","Teresa do Mar","Teresa da Montanha"],"correta":0,"explicacao":"Ela quis levar no nome o Menino Jesus."},
    {"tipo":"vf","enunciado":"A família de Teresinha rezava junta.","correta":true,"explicacao":"Em casa, eles rezavam, iam à Missa e ajudavam os pobres."}
  ],
  "teresinha-2": [
    {"tipo":"multipla","enunciado":"O que é o pequeno caminho de Teresinha?","opcoes":["Fazer coisas pequenas com muito amor","Fazer só coisas enormes","Correr bem rápido"],"correta":0,"explicacao":"Até arrumar a cama pode ser um presente para Jesus, se for feito com amor."},
    {"tipo":"vf","enunciado":"Para Teresinha, um sorriso pode ser um presente para Jesus.","correta":true,"explicacao":"Ela sorria até para quem era difícil de conviver."},
    {"tipo":"multipla","enunciado":"Teresinha comparou o seu caminho com qual coisa?","opcoes":["Um elevador","Um barco","Uma bicicleta"],"correta":0,"explicacao":"Os braços de Jesus eram o elevador que a levava para o Céu."},
    {"tipo":"vf","enunciado":"Teresinha se via como uma criança nos braços de Deus.","correta":true,"explicacao":"Ela confiava em Deus como uma criança confia no pai."},
    {"tipo":"multipla","enunciado":"Teresinha prometeu mandar do Céu uma chuva de quê?","opcoes":["Rosas","Pedras","Folhas"],"correta":0,"explicacao":"As rosas são as bênçãos que ela pede a Deus por nós."},
    {"tipo":"ordenar","enunciado":"Monte a promessa de Teresinha:","blocos":["Quero passar","o meu Céu","fazendo o bem na terra"],"explicacao":"Ela prometeu continuar ajudando as pessoas lá do Céu."},
    {"tipo":"vf","enunciado":"Teresinha dizia que só coisas enormes agradam a Deus.","correta":false,"explicacao":"Para ela, o que vale é o amor, mesmo nas coisas pequeninas."},
    {"tipo":"multipla","enunciado":"O que Teresinha fazia quando alguém era difícil com ela?","opcoes":["Sorria e era gentil","Brigava","Ficava de mal"],"correta":0,"explicacao":"Ela respondia com gentileza e rezava por essa pessoa."},
    {"tipo":"vf","enunciado":"Teresinha confiava muito no amor de Deus.","correta":true,"explicacao":"Confiar é como se jogar nos braços de quem nos ama."},
    {"tipo":"multipla","enunciado":"O que está no centro do pequeno caminho?","opcoes":["O amor e a confiança","A pressa","O medo"],"correta":0,"explicacao":"Com amor e confiança, qualquer criança pode ser santa."}
  ],
  "teresinha-3": [
    {"tipo":"vf","enunciado":"Teresinha é padroeira das missões, mesmo sem ter saído do convento.","correta":true,"explicacao":"Ela ajudava os missionários rezando por eles todos os dias."},
    {"tipo":"multipla","enunciado":"Qual livro conta a história de Teresinha, escrita por ela mesma?","opcoes":["História de uma Alma","O Pequeno Príncipe","Dom Quixote"],"correta":0,"explicacao":"Ela escreveu suas lembranças, e o livro foi lido no mundo inteiro."},
    {"tipo":"multipla","enunciado":"Como Teresinha ajudava os missionários?","opcoes":["Rezando e escrevendo cartas","Viajando de navio","Construindo igrejas"],"correta":0,"explicacao":"Ela chamava dois padres missionários de irmãos e escrevia para eles."},
    {"tipo":"vf","enunciado":"Teresinha é Doutora da Igreja, que quer dizer uma grande mestra da fé.","correta":true,"explicacao":"Com o seu pequeno caminho, ela ensina a gente a amar a Deus."},
    {"tipo":"multipla","enunciado":"Teresinha é padroeira das missões junto com qual santo?","opcoes":["São Francisco Xavier","São Jorge","São Pedro"],"correta":0,"explicacao":"Francisco Xavier viajou pelo mundo; Teresinha rezou sem sair do convento."},
    {"tipo":"vf","enunciado":"Teresinha ficou muito doente, mas continuou confiando em Jesus.","correta":true,"explicacao":"Mesmo sofrendo, ela sorria e rezava."},
    {"tipo":"multipla","enunciado":"Quais foram as últimas palavras de Teresinha?","opcoes":["Meu Deus, eu vos amo","Estou com fome","Até amanhã"],"correta":0,"explicacao":"Ela partiu para o Céu dizendo que amava a Deus."},
    {"tipo":"vf","enunciado":"Teresinha queria ajudar as pessoas mesmo depois de ir para o Céu.","correta":true,"explicacao":"Por isso tanta gente pede que ela reze por nós."},
    {"tipo":"multipla","enunciado":"Onde Teresinha viveu rezando pelo mundo inteiro?","opcoes":["No convento","Num navio","Num castelo"],"correta":0,"explicacao":"No convento de Lisieux ela rezava por todos."},
    {"tipo":"vf","enunciado":"Teresinha nunca rezava pelos outros.","correta":false,"explicacao":"Teresinha rezava por todos, principalmente pelos que estavam longe de Deus."}
  ],

  // ---------------- SANTO ANTÔNIO ----------------
  "antonio-1": [
    {"tipo":"multipla","enunciado":"Em que cidade nasceu Santo Antônio?","opcoes":["Lisboa","Madri","Londres"],"correta":0,"explicacao":"Ele nasceu em Lisboa, em Portugal, e ficou famoso em Pádua, na Itália."},
    {"tipo":"vf","enunciado":"Santo Antônio virou frade franciscano, como os amigos de São Francisco.","correta":true,"explicacao":"Ele quis viver pobre e alegre, do jeito de São Francisco."},
    {"tipo":"multipla","enunciado":"Qual era o primeiro nome de Santo Antônio?","opcoes":["Fernando","Carlos","Mateus"],"correta":0,"explicacao":"Ele se chamava Fernando e ganhou o nome Antônio quando virou frade."},
    {"tipo":"vf","enunciado":"Antônio queria ser missionário na África.","correta":true,"explicacao":"Ele sonhava levar Jesus para longe, até o Marrocos."},
    {"tipo":"multipla","enunciado":"O que levou o barco de Antônio até a Itália?","opcoes":["Uma tempestade","Uma baleia","Um pirata"],"correta":0,"explicacao":"O barco se desviou, e Deus usou isso para levá-lo à Itália."},
    {"tipo":"vf","enunciado":"Antônio ficou doente na viagem para a África.","correta":true,"explicacao":"Doente, ele precisou voltar, mas o barco foi parar na Itália."},
    {"tipo":"multipla","enunciado":"Em que país Antônio viveu os últimos anos?","opcoes":["Itália","Brasil","China"],"correta":0,"explicacao":"Na Itália, ele pregou em muitas cidades, até chegar a Pádua."},
    {"tipo":"vf","enunciado":"Antônio morreu bem velhinho.","correta":false,"explicacao":"Antônio foi para o Céu ainda jovem, mas fez muito bem em pouco tempo."},
    {"tipo":"multipla","enunciado":"Falar de Jesus para muita gente é:","opcoes":["Pregar","Cozinhar","Nadar"],"correta":0,"explicacao":"Pregar é anunciar a Palavra de Deus, e Antônio fazia isso muito bem."},
    {"tipo":"vf","enunciado":"Antônio foi declarado santo bem pouco tempo depois de morrer.","correta":true,"explicacao":"Todo mundo já sabia que ele era um homem de Deus."}
  ],
  "antonio-2": [
    {"tipo":"multipla","enunciado":"Por que Santo Antônio ficou famoso?","opcoes":["Pregava muito bem","Cantava ópera","Era um rei"],"correta":0,"explicacao":"Quando ele falava de Jesus, as pessoas se emocionavam."},
    {"tipo":"vf","enunciado":"Muita gente pede a Santo Antônio ajuda para achar coisas perdidas.","correta":true,"explicacao":"Ele é lembrado como o santo das coisas perdidas."},
    {"tipo":"multipla","enunciado":"Numa história antiga, para quem Antônio pregou?","opcoes":["Para os peixes","Para as nuvens","Para as pedras"],"correta":0,"explicacao":"Conta a história que, quando o povo não quis ouvir, os peixes puseram a cabeça para fora da água para escutar."},
    {"tipo":"vf","enunciado":"Santo Antônio conhecia a Bíblia muito bem.","correta":true,"explicacao":"Ele sabia de cor muitos trechos da Palavra de Deus."},
    {"tipo":"multipla","enunciado":"Que título especial a Igreja deu a Antônio?","opcoes":["Doutor da Igreja","Capitão do mar","Rei de Portugal"],"correta":0,"explicacao":"Doutor da Igreja quer dizer um grande mestre que ensina a fé."},
    {"tipo":"vf","enunciado":"São Francisco escreveu uma carta para Antônio.","correta":true,"explicacao":"Francisco pediu que ele ensinasse os frades, sem esquecer de rezar."},
    {"tipo":"ordenar","enunciado":"Monte o pedido a Santo Antônio:","blocos":["Santo Antônio,","ajudai-me a encontrar","o que perdi"],"explicacao":"É um pedido simples que muita gente faz com fé."},
    {"tipo":"multipla","enunciado":"Qual era o livro que Antônio mais amava?","opcoes":["A Bíblia","Um livro de receitas","Um mapa"],"correta":0,"explicacao":"A Bíblia é a Palavra de Deus, e Antônio a estudava com amor."},
    {"tipo":"vf","enunciado":"Antônio desistiu de falar de Deus quando o povo não quis ouvir.","correta":false,"explicacao":"Ele não desistiu: foi até o mar e continuou falando de Deus."},
    {"tipo":"multipla","enunciado":"Por que o Papa chamou Antônio de Arca do Testamento?","opcoes":["Ele guardava a Bíblia no coração","Ele tinha um barco","Ele era carpinteiro"],"correta":0,"explicacao":"Antônio guardava a Palavra de Deus na memória e no coração."}
  ],
  "antonio-3": [
    {"tipo":"vf","enunciado":"O Pão dos Pobres é uma ajuda para quem tem fome, ligada a Santo Antônio.","correta":true,"explicacao":"Até hoje, em nome dele, muita gente reparte o pão com quem precisa."},
    {"tipo":"multipla","enunciado":"Quem Santo Antônio segura no colo nas imagens?","opcoes":["O Menino Jesus","Um cachorrinho","Uma coroa"],"correta":0,"explicacao":"A tradição conta que o Menino Jesus apareceu para ele enquanto rezava."},
    {"tipo":"multipla","enunciado":"Que flor aparece nas imagens de Santo Antônio?","opcoes":["Um lírio","Um girassol","Uma margarida"],"correta":0,"explicacao":"O lírio branco lembra um coração limpo."},
    {"tipo":"vf","enunciado":"No Brasil, muita gente pede a Santo Antônio um bom casamento.","correta":true,"explicacao":"É uma devoção alegre do povo, muito lembrada nas festas de junho."},
    {"tipo":"multipla","enunciado":"Em que festas do Brasil Santo Antônio é muito lembrado?","opcoes":["Festas juninas","Carnaval","Ano-novo"],"correta":0,"explicacao":"Nas festas juninas lembramos Santo Antônio, São João e São Pedro."},
    {"tipo":"vf","enunciado":"Santo Antônio ajudava os pobres.","correta":true,"explicacao":"Ele tinha um carinho especial por quem sofria."},
    {"tipo":"multipla","enunciado":"Quais são os três santos das festas juninas?","opcoes":["Antônio, João e Pedro","Jorge, Cosme e Damião","Francisco, Clara e Bento"],"correta":0,"explicacao":"Antônio, João e Pedro são lembrados com muita alegria em junho."},
    {"tipo":"vf","enunciado":"Santo Antônio era um frade vaidoso, que gostava de riqueza.","correta":false,"explicacao":"Ele vivia com simplicidade e repartia tudo com os pobres."},
    {"tipo":"multipla","enunciado":"Por que tanta gente ama Santo Antônio?","opcoes":["Porque ele ajuda quem precisa","Porque ele era muito rico","Porque ele era um rei"],"correta":0,"explicacao":"Ele é um amigo que reza por nós, principalmente pelos pobres."},
    {"tipo":"vf","enunciado":"Muitas igrejas do Brasil têm o nome de Santo Antônio.","correta":true,"explicacao":"Ele é um dos santos mais queridos do povo brasileiro."}
  ],

  // ---------------- SÃO PADRE PIO ----------------
  "pio-1": [
    {"tipo":"multipla","enunciado":"Que roupa Padre Pio usava?","opcoes":["Um hábito marrom de frade","Uma armadura","Uma coroa"],"correta":0,"explicacao":"Ele era frade capuchinho e usava o hábito marrom com capuz."},
    {"tipo":"vf","enunciado":"Padre Pio tinha nas mãos feridas parecidas com as de Jesus.","correta":true,"explicacao":"Ele sofreu com essas feridas por muitos anos, com paciência e amor."},
    {"tipo":"multipla","enunciado":"Qual era o nome de Padre Pio quando criança?","opcoes":["Francisco","Paulo","Tiago"],"correta":0,"explicacao":"Ele se chamava Francesco, que é Francisco em italiano."},
    {"tipo":"vf","enunciado":"Padre Pio nasceu numa cidadezinha da Itália.","correta":true,"explicacao":"Ele nasceu em Pietrelcina, numa família simples do campo."},
    {"tipo":"multipla","enunciado":"Em que país Padre Pio viveu?","opcoes":["Itália","Brasil","Estados Unidos"],"correta":0,"explicacao":"Ele passou a vida toda na Itália."},
    {"tipo":"vf","enunciado":"Padre Pio morou muitos anos no mesmo convento.","correta":true,"explicacao":"Ele ficou muitos e muitos anos no convento de San Giovanni Rotondo."},
    {"tipo":"multipla","enunciado":"O que Padre Pio mais gostava de fazer?","opcoes":["Rezar","Viajar","Jogar"],"correta":0,"explicacao":"Ele rezava o terço muitas vezes por dia."},
    {"tipo":"vf","enunciado":"Padre Pio nunca foi padre.","correta":false,"explicacao":"Ele foi padre, sim, e celebrava a Missa com muito amor."},
    {"tipo":"multipla","enunciado":"Como era Padre Pio?","opcoes":["Humilde e simples","Rico e vaidoso","Bravo e egoísta"],"correta":0,"explicacao":"Mesmo famoso, ele vivia como um frade simples."},
    {"tipo":"vf","enunciado":"Hoje Padre Pio é santo.","correta":true,"explicacao":"A Igreja declarou que ele está no Céu com Deus."}
  ],
  "pio-2": [
    {"tipo":"multipla","enunciado":"Onde pedimos perdão a Deus com a ajuda do padre?","opcoes":["Na Confissão","No almoço","Na viagem"],"correta":0,"explicacao":"Padre Pio passava horas na Confissão, onde Jesus perdoa os nossos pecados."},
    {"tipo":"ordenar","enunciado":"Monte o conselho de Padre Pio:","blocos":["Reza,","espera","e não te preocupes"],"explicacao":"Ele ensinava a confiar em Deus em tudo."},
    {"tipo":"multipla","enunciado":"Como Padre Pio chamava o terço?","opcoes":["A arma","O brinquedo","O colar"],"correta":0,"explicacao":"Para ele, o terço era uma arma de oração que vence o mal."},
    {"tipo":"vf","enunciado":"Muita gente fazia fila para se confessar com Padre Pio.","correta":true,"explicacao":"Vinham pessoas de vários países para encontrar o perdão de Deus."},
    {"tipo":"multipla","enunciado":"Padre Pio pediu que as pessoas se reunissem para quê?","opcoes":["Para rezar juntas","Para brigar","Para fazer compras"],"correta":0,"explicacao":"Os Grupos de Oração de Padre Pio existem até hoje."},
    {"tipo":"vf","enunciado":"Padre Pio dizia que a oração é muito importante.","correta":true,"explicacao":"Para ele, rezar é conversar com Deus e abrir o coração."},
    {"tipo":"multipla","enunciado":"O que Deus faz quando pedimos perdão de coração?","opcoes":["Perdoa","Fica bravo para sempre","Não escuta"],"correta":0,"explicacao":"Deus é Pai e perdoa quem se arrepende."},
    {"tipo":"vf","enunciado":"Padre Pio celebrava a Missa com muito carinho.","correta":true,"explicacao":"Muita gente se emocionava só de ver o amor dele na Missa."},
    {"tipo":"vf","enunciado":"Padre Pio achava que rezar era perda de tempo.","correta":false,"explicacao":"Ele dizia que a oração é a melhor arma que temos."},
    {"tipo":"multipla","enunciado":"Quem Padre Pio atendia no confessionário?","opcoes":["Ricos e pobres, todos iguais","Só os reis","Só os artistas"],"correta":0,"explicacao":"Ele recebia todo mundo com o mesmo carinho."}
  ],
  "pio-3": [
    {"tipo":"vf","enunciado":"Padre Pio construiu um hospital para cuidar dos doentes.","correta":true,"explicacao":"O nome do hospital quer dizer Casa Alívio do Sofrimento."},
    {"tipo":"multipla","enunciado":"Que obra Padre Pio fez para os doentes?","opcoes":["Um hospital","Um parque","Um estádio"],"correta":0,"explicacao":"Ele queria que os doentes fossem tratados com amor e bons remédios."},
    {"tipo":"multipla","enunciado":"Qual Papa declarou Padre Pio santo?","opcoes":["João Paulo II","Bento XVI","Francisco"],"correta":0,"explicacao":"O Papa João Paulo II declarou Padre Pio santo diante de uma multidão."},
    {"tipo":"vf","enunciado":"João Paulo II conheceu Padre Pio quando ainda era um jovem padre.","correta":true,"explicacao":"Anos depois, ele mesmo declarou Padre Pio santo."},
    {"tipo":"multipla","enunciado":"Onde fica o hospital de Padre Pio?","opcoes":["Perto do convento dele","Numa ilha","Em outro país"],"correta":0,"explicacao":"O hospital fica ao lado do convento onde ele viveu, na Itália."},
    {"tipo":"vf","enunciado":"Até hoje o hospital de Padre Pio cuida de muitos doentes.","correta":true,"explicacao":"É um presente de amor que continua ajudando as pessoas."},
    {"tipo":"multipla","enunciado":"Como Padre Pio queria que os doentes fossem tratados?","opcoes":["Com amor e carinho","Com pressa","Com desprezo"],"correta":0,"explicacao":"Para ele, cuidar de um doente é cuidar do próprio Jesus."},
    {"tipo":"vf","enunciado":"Muitos peregrinos visitam o lugar onde Padre Pio viveu.","correta":true,"explicacao":"Gente do mundo inteiro vai até lá para rezar."},
    {"tipo":"multipla","enunciado":"Um peregrino é alguém que:","opcoes":["Viaja para rezar num lugar santo","Vende peixes","Pinta quadros"],"correta":0,"explicacao":"Os peregrinos caminham para encontrar Deus."},
    {"tipo":"vf","enunciado":"Padre Pio só se importava com as pessoas saudáveis.","correta":false,"explicacao":"Ele tinha um carinho enorme pelos doentes e por quem sofria."}
  ],

  // ---------------- NOSSA SENHORA ----------------
  "maria-1": [
    {"tipo":"multipla","enunciado":"Qual anjo levou a mensagem de Deus para Maria?","opcoes":["Gabriel","Miguel","Rafael"],"correta":0,"explicacao":"O anjo Gabriel contou a Maria que ela seria a mãe de Jesus."},
    {"tipo":"vf","enunciado":"Maria disse sim a Deus.","correta":true,"explicacao":"Ela respondeu: eis a serva do Senhor, faça-se em mim segundo a vossa palavra."},
    {"tipo":"multipla","enunciado":"Em que cidade Maria morava quando o anjo chegou?","opcoes":["Nazaré","Belém","Roma"],"correta":0,"explicacao":"Nazaré era uma cidade pequena e simples."},
    {"tipo":"vf","enunciado":"O anjo disse a Maria: Ave, cheia de graça.","correta":true,"explicacao":"Com essas palavras começa a oração da Ave-Maria."},
    {"tipo":"multipla","enunciado":"Que nome o anjo disse que o bebê teria?","opcoes":["Jesus","Moisés","Davi"],"correta":0,"explicacao":"Jesus é o Filho de Deus que veio morar entre nós."},
    {"tipo":"vf","enunciado":"Maria ficou com medo e disse não a Deus.","correta":false,"explicacao":"Maria confiou em Deus e disse sim com todo o coração."},
    {"tipo":"multipla","enunciado":"Qual parente de Maria também esperava um bebê?","opcoes":["Isabel","Marta","Madalena"],"correta":0,"explicacao":"Isabel era prima de Maria e esperava João Batista."},
    {"tipo":"vf","enunciado":"O anjo disse que para Deus nada é impossível.","correta":true,"explicacao":"Deus faz maravilhas na vida de quem confia nele."},
    {"tipo":"multipla","enunciado":"Qual oração começa com as palavras do anjo?","opcoes":["Ave-Maria","Pai-Nosso","Glória"],"correta":0,"explicacao":"Quando rezamos a Ave-Maria, repetimos a saudação do anjo."},
    {"tipo":"vf","enunciado":"Maria é a mãe de Jesus.","correta":true,"explicacao":"E Jesus nos deu Maria para ser nossa mãe também."}
  ],
  "maria-2": [
    {"tipo":"multipla","enunciado":"Quem Maria foi visitar logo depois da visita do anjo?","opcoes":["Sua prima Isabel","O rei Herodes","Um pastor"],"correta":0,"explicacao":"Maria foi depressa ajudar Isabel, que estava esperando um bebê."},
    {"tipo":"vf","enunciado":"Quando Maria chegou, o bebê de Isabel pulou de alegria na barriga da mãe.","correta":true,"explicacao":"João Batista já se alegrava com a chegada de Jesus."},
    {"tipo":"multipla","enunciado":"Que bebê Isabel esperava?","opcoes":["João Batista","Pedro","Paulo"],"correta":0,"explicacao":"João Batista ia preparar o caminho de Jesus."},
    {"tipo":"vf","enunciado":"Isabel disse que Maria é bendita entre as mulheres.","correta":true,"explicacao":"Nós repetimos essas palavras na Ave-Maria."},
    {"tipo":"multipla","enunciado":"Maria cantou uma oração de alegria. Como ela começa?","opcoes":["A minha alma engrandece o Senhor","Pai nosso que estais no céu","Glória a Deus nas alturas"],"correta":0,"explicacao":"Esse canto de Maria se chama Magnificat."},
    {"tipo":"ordenar","enunciado":"Monte o começo do canto de Maria:","blocos":["A minha alma","engrandece","o Senhor"],"explicacao":"Maria agradece a Deus pelas coisas lindas que Ele fez."},
    {"tipo":"multipla","enunciado":"O que Maria fez na casa de Isabel?","opcoes":["Ajudou a prima","Foi passear","Foi dormir"],"correta":0,"explicacao":"Maria ficou uns três meses ajudando Isabel com muito carinho."},
    {"tipo":"vf","enunciado":"No seu canto, Maria diz que Deus olha com carinho para os humildes.","correta":true,"explicacao":"Deus ama os pequenos e os simples de coração."},
    {"tipo":"vf","enunciado":"Maria ficou orgulhosa e se achou melhor que todo mundo.","correta":false,"explicacao":"Maria era humilde e dava toda a glória a Deus."},
    {"tipo":"multipla","enunciado":"Como Maria nos ensina a ser?","opcoes":["Humildes","Orgulhosos","Egoístas"],"correta":0,"explicacao":"Quem é humilde deixa Deus fazer maravilhas na sua vida."}
  ],
  "maria-3": [
    {"tipo":"multipla","enunciado":"Na cruz, Jesus entregou Maria para ser mãe de quem?","opcoes":["Do discípulo João","De um soldado","De ninguém"],"correta":0,"explicacao":"Jesus disse a João: eis aí a tua mãe, e assim Maria é mãe de todos nós."},
    {"tipo":"vf","enunciado":"Quando rezamos o terço, lembramos a vida de Jesus e de Maria.","correta":true,"explicacao":"Cada mistério do terço conta um pedacinho dessa história."},
    {"tipo":"multipla","enunciado":"Qual é a padroeira do Brasil?","opcoes":["Nossa Senhora Aparecida","Nossa Senhora de Lourdes","Nossa Senhora de Guadalupe"],"correta":0,"explicacao":"A imagem de Aparecida foi encontrada por pescadores num rio."},
    {"tipo":"vf","enunciado":"A imagem de Nossa Senhora Aparecida foi achada por pescadores.","correta":true,"explicacao":"Eles jogaram a rede no rio e encontraram a imagem."},
    {"tipo":"multipla","enunciado":"Em Fátima, Nossa Senhora apareceu para quantas crianças?","opcoes":["Três","Uma","Dez"],"correta":0,"explicacao":"Lúcia, Francisco e Jacinta eram pastorinhos."},
    {"tipo":"vf","enunciado":"Os pastorinhos de Fátima eram adultos muito ricos.","correta":false,"explicacao":"Eles eram crianças simples que cuidavam de ovelhas."},
    {"tipo":"multipla","enunciado":"Em Lourdes, Nossa Senhora apareceu para qual menina?","opcoes":["Bernadete","Teresinha","Clara"],"correta":0,"explicacao":"Bernadete era uma menina pobre e muito sincera."},
    {"tipo":"vf","enunciado":"Maria foi levada ao Céu de corpo e alma.","correta":true,"explicacao":"Essa festa se chama Assunção de Nossa Senhora."},
    {"tipo":"multipla","enunciado":"O que Maria disse aos serventes na festa de casamento em Caná?","opcoes":["Fazei tudo o que Ele vos disser","Vão embora","Tragam mais pão"],"correta":0,"explicacao":"É o melhor conselho de Maria: fazer o que Jesus pede."},
    {"tipo":"vf","enunciado":"Maria é chamada Mãe da Igreja.","correta":true,"explicacao":"Ela cuida de todos os filhos de Deus como uma mãe cuida da família."}
  ],

  // ---------------- SÃO BENTO ----------------
  "bento-1": [
    {"tipo":"multipla","enunciado":"Qual era o lema de São Bento?","opcoes":["Reza e trabalha","Descansa e brinca","Estuda e viaja"],"correta":0,"explicacao":"Em latim se diz Ora et labora: rezar e trabalhar."},
    {"tipo":"vf","enunciado":"São Bento é o padroeiro da Europa.","correta":true,"explicacao":"Os monges dele ajudaram a levar a fé por toda a Europa."},
    {"tipo":"multipla","enunciado":"Em que país São Bento nasceu?","opcoes":["Itália","Brasil","Japão"],"correta":0,"explicacao":"Bento nasceu numa cidade da Itália chamada Núrsia."},
    {"tipo":"vf","enunciado":"Conta a tradição que São Bento tinha uma irmã gêmea, Santa Escolástica.","correta":true,"explicacao":"Os dois irmãos amavam muito a Deus."},
    {"tipo":"multipla","enunciado":"Onde Bento foi rezar sozinho quando era jovem?","opcoes":["Numa gruta","Num navio","Num castelo"],"correta":0,"explicacao":"Ele morou numa gruta, rezando em silêncio, perto de Subiaco."},
    {"tipo":"vf","enunciado":"Bento deixou a cidade grande para ficar mais perto de Deus.","correta":true,"explicacao":"Ele saiu de Roma para rezar em paz."},
    {"tipo":"multipla","enunciado":"Como se chama quem vive num mosteiro, rezando e trabalhando?","opcoes":["Monge","Marinheiro","Bombeiro"],"correta":0,"explicacao":"Os monges rezam juntos várias vezes por dia."},
    {"tipo":"vf","enunciado":"São Bento viveu há pouco tempo, na época dos celulares.","correta":false,"explicacao":"São Bento viveu há muito, muito tempo, muito antes dos nossos avós."},
    {"tipo":"multipla","enunciado":"Que casa grande Bento construiu para os monges?","opcoes":["Um mosteiro","Um palácio","Um castelo"],"correta":0,"explicacao":"O mosteiro mais famoso dele fica no Monte Cassino."},
    {"tipo":"vf","enunciado":"Bento ensinou que trabalhar também é um jeito de louvar a Deus.","correta":true,"explicacao":"Quem trabalha com amor está servindo a Deus."}
  ],
  "bento-2": [
    {"tipo":"multipla","enunciado":"São Bento escreveu um livro para os monges. Como ele se chama?","opcoes":["A Regra","O Mapa","A Receita"],"correta":0,"explicacao":"A Regra ensina a viver juntos, rezando e trabalhando."},
    {"tipo":"vf","enunciado":"Até hoje muitos mosteiros seguem a Regra de São Bento.","correta":true,"explicacao":"Faz muitos e muitos anos que ela guia monges e monjas."},
    {"tipo":"multipla","enunciado":"Qual é a primeira palavra da Regra?","opcoes":["Escuta","Corre","Dorme"],"correta":0,"explicacao":"Bento começa pedindo: escuta, filho, com o ouvido do coração."},
    {"tipo":"vf","enunciado":"Segundo a Regra, cada visitante deve ser recebido como se fosse Jesus.","correta":true,"explicacao":"Receber bem as pessoas é um jeito de amar Jesus."},
    {"tipo":"multipla","enunciado":"Como se chama o monge que cuida de todo o mosteiro?","opcoes":["Abade","Capitão","Prefeito"],"correta":0,"explicacao":"Abade quer dizer pai: ele cuida dos monges como um pai."},
    {"tipo":"ordenar","enunciado":"Monte a frase de São Bento:","blocos":["Que em tudo","Deus seja","glorificado"],"explicacao":"Tudo o que fazemos pode ser para a glória de Deus."},
    {"tipo":"vf","enunciado":"Para São Bento, a oração vem antes de tudo.","correta":true,"explicacao":"Ele ensinava: nada se coloque antes da oração."},
    {"tipo":"multipla","enunciado":"O que os monges fazem juntos várias vezes por dia?","opcoes":["Rezam","Dançam","Viajam"],"correta":0,"explicacao":"Eles cantam salmos e louvam a Deus em vários horários."},
    {"tipo":"vf","enunciado":"A Regra ensina os monges a brigar entre si.","correta":false,"explicacao":"A Regra ensina a paz, a obediência e o amor entre irmãos."},
    {"tipo":"multipla","enunciado":"Onde os monges vivem?","opcoes":["Num mosteiro","Num circo","Num barco"],"correta":0,"explicacao":"O mosteiro é a casa dos monges, onde eles rezam e trabalham."}
  ],
  "bento-3": [
    {"tipo":"vf","enunciado":"A medalha de São Bento tem uma oração para afastar o mal.","correta":true,"explicacao":"Suas letrinhas são pedidos de proteção a Deus."},
    {"tipo":"multipla","enunciado":"Onde ficava o mosteiro mais famoso de São Bento?","opcoes":["Monte Cassino","Rio de Janeiro","Paris"],"correta":0,"explicacao":"O mosteiro de Monte Cassino fica no alto de uma montanha, na Itália."},
    {"tipo":"multipla","enunciado":"O que aparece na medalha de São Bento?","opcoes":["Uma cruz","Uma âncora","Um peixe"],"correta":0,"explicacao":"A cruz lembra que Jesus venceu o mal por amor."},
    {"tipo":"vf","enunciado":"Numa história antiga, um corvo tirou de perto de Bento um pão com veneno.","correta":true,"explicacao":"Por isso o corvo aparece nas imagens de São Bento."},
    {"tipo":"multipla","enunciado":"Que ave aparece nas imagens de São Bento?","opcoes":["Um corvo","Um papagaio","Uma galinha"],"correta":0,"explicacao":"O corvo lembra como Deus protegeu Bento."},
    {"tipo":"vf","enunciado":"Na medalha está escrito: a santa cruz seja a minha luz.","correta":true,"explicacao":"Em latim: Crux sacra sit mihi lux."},
    {"tipo":"multipla","enunciado":"Quem escreveu a história de São Bento?","opcoes":["O Papa São Gregório","Um rei","Um soldado"],"correta":0,"explicacao":"O Papa Gregório contou a vida de Bento num livro."},
    {"tipo":"vf","enunciado":"A medalha de São Bento é um amuleto de sorte.","correta":false,"explicacao":"A medalha não é amuleto: ela nos lembra de rezar e confiar em Deus."},
    {"tipo":"multipla","enunciado":"Para que serve a medalha de São Bento?","opcoes":["Para lembrar de Deus e pedir proteção","Para ganhar jogos","Para ficar rico"],"correta":0,"explicacao":"Ela ajuda a gente a lembrar que Deus nos protege."},
    {"tipo":"vf","enunciado":"Quando fazemos o sinal da cruz, lembramos que Jesus nos protege.","correta":true,"explicacao":"Bento fazia o sinal da cruz com muita fé."}
  ],

  // ---------------- SANTA CLARA ----------------
  "clara-1": [
    {"tipo":"multipla","enunciado":"Quem ajudou Clara a seguir Jesus?","opcoes":["São Francisco","São Bento","Santo Antônio"],"correta":0,"explicacao":"Francisco era da mesma cidade e ensinou Clara a viver pobre, como Jesus."},
    {"tipo":"vf","enunciado":"Clara começou uma família de irmãs que rezam, as Clarissas.","correta":true,"explicacao":"As irmãs Clarissas existem até hoje no mundo inteiro."},
    {"tipo":"multipla","enunciado":"De que tipo de família Clara vinha?","opcoes":["Rica","Pobre","De pescadores"],"correta":0,"explicacao":"Clara deixou uma casa cheia de conforto para seguir Jesus."},
    {"tipo":"vf","enunciado":"Clara saiu de casa de noite para seguir Jesus.","correta":true,"explicacao":"Foi uma decisão corajosa, cheia de amor a Deus."},
    {"tipo":"multipla","enunciado":"Em que cidade Clara nasceu?","opcoes":["Assis","Lisboa","Paris"],"correta":0,"explicacao":"Clara nasceu em Assis, a mesma cidade de São Francisco."},
    {"tipo":"vf","enunciado":"Francisco cortou os cabelos de Clara para mostrar que ela era toda de Deus.","correta":true,"explicacao":"Foi o jeito de mostrar que Clara tinha escolhido Jesus."},
    {"tipo":"multipla","enunciado":"Qual irmã de Clara também foi seguir Jesus com ela?","opcoes":["Inês","Rita","Mônica"],"correta":0,"explicacao":"Inês foi atrás de Clara poucos dias depois."},
    {"tipo":"vf","enunciado":"Clara queria ficar rica e famosa.","correta":false,"explicacao":"Clara escolheu ser pobre para ter Jesus como seu tesouro."},
    {"tipo":"multipla","enunciado":"Onde Clara morou a vida toda com suas irmãs?","opcoes":["Em São Damião","Num castelo","Num navio"],"correta":0,"explicacao":"São Damião era a igrejinha que Francisco tinha consertado."},
    {"tipo":"vf","enunciado":"Clara e Francisco eram amigos na fé.","correta":true,"explicacao":"Eles se ajudavam a amar mais a Jesus."}
  ],
  "clara-2": [
    {"tipo":"multipla","enunciado":"O que Clara levou nas mãos quando soldados chegaram ao convento?","opcoes":["A hóstia, que é Jesus","Uma espada","Um escudo"],"correta":0,"explicacao":"Clara confiou em Jesus presente na hóstia."},
    {"tipo":"vf","enunciado":"Mesmo doente, Clara enfrentou os soldados com fé.","correta":true,"explicacao":"Ela não usou armas: usou a oração."},
    {"tipo":"multipla","enunciado":"O que os soldados fizeram depois que Clara rezou?","opcoes":["Foram embora","Fizeram uma festa","Ficaram morando lá"],"correta":0,"explicacao":"Conta a história que eles fugiram, e as irmãs ficaram protegidas."},
    {"tipo":"vf","enunciado":"Clara escrevia cartas com conselhos para uma princesa chamada Inês.","correta":true,"explicacao":"Inês de Praga também deixou tudo para seguir Jesus pobre."},
    {"tipo":"multipla","enunciado":"Qual era o conselho de Clara nas cartas?","opcoes":["Olhar para Jesus com amor","Comprar muitas coisas","Ficar sempre com raiva"],"correta":0,"explicacao":"Clara ensinava a olhar para Jesus com o coração."},
    {"tipo":"ordenar","enunciado":"Monte a história de Clara:","blocos":["Os soldados chegam","Clara reza com Jesus","Os soldados fogem"],"explicacao":"A oração de Clara protegeu as irmãs."},
    {"tipo":"vf","enunciado":"Clara escreveu uma regra para as irmãs viverem pobres e rezando.","correta":true,"explicacao":"O Papa aprovou a regra pouco antes de Clara ir para o Céu."},
    {"tipo":"multipla","enunciado":"O que Clara pediu ao Papa a vida inteira?","opcoes":["Poder viver pobre","Muito dinheiro","Um palácio"],"correta":0,"explicacao":"Clara queria viver só com Deus, sem guardar riquezas."},
    {"tipo":"vf","enunciado":"Clara gostava de guardar joias e dinheiro.","correta":false,"explicacao":"O tesouro de Clara era Jesus, não as riquezas."},
    {"tipo":"multipla","enunciado":"Clara amava Jesus na Eucaristia. Onde recebemos a Eucaristia?","opcoes":["Na Missa","No mercado","Na escola"],"correta":0,"explicacao":"Na Missa, Jesus se dá a nós na Comunhão."}
  ],
  "clara-3": [
    {"tipo":"vf","enunciado":"Santa Clara é a padroeira da televisão.","correta":true,"explicacao":"Doente, ela viu a Missa de longe, como se fosse numa tela."},
    {"tipo":"multipla","enunciado":"Qual era o maior tesouro de Clara?","opcoes":["Jesus","O ouro","As terras"],"correta":0,"explicacao":"Para Clara, quem tem Jesus tem tudo."},
    {"tipo":"multipla","enunciado":"Por que Clara é padroeira da televisão?","opcoes":["Viu a Missa de longe, doente na cama","Gostava de filmes","Inventou a televisão"],"correta":0,"explicacao":"Deus deixou que ela acompanhasse a Missa sem sair da cama."},
    {"tipo":"vf","enunciado":"O nome Clara lembra luz e claridade.","correta":true,"explicacao":"A vida de Clara iluminou muitas pessoas."},
    {"tipo":"multipla","enunciado":"Como se chamam as irmãs que seguem Santa Clara?","opcoes":["Clarissas","Carmelitas","Beneditinas"],"correta":0,"explicacao":"Clarissas vem do nome de Clara."},
    {"tipo":"vf","enunciado":"Clara foi declarada santa bem pouco tempo depois de morrer.","correta":true,"explicacao":"O povo já sabia que ela era santa."},
    {"tipo":"multipla","enunciado":"Como Clara vivia?","opcoes":["Com simplicidade e alegria","Com luxo e vaidade","Com raiva"],"correta":0,"explicacao":"Ela era pobre, mas muito alegre."},
    {"tipo":"vf","enunciado":"Clara ficou triste por ter deixado a riqueza.","correta":false,"explicacao":"Clara era feliz porque tinha Jesus no coração."},
    {"tipo":"multipla","enunciado":"O que Clara fazia muitas horas por dia?","opcoes":["Rezava","Dormia","Passeava"],"correta":0,"explicacao":"Clara rezava muito e cuidava das irmãs com carinho."},
    {"tipo":"vf","enunciado":"Clara servia as irmãs e cuidava das que estavam doentes.","correta":true,"explicacao":"Mesmo sendo a madre, ela lavava os pés das irmãs e servia a todas."}
  ],

  // ---------------- SÃO JOÃO PAULO II ----------------
  "jpii-1": [
    {"tipo":"multipla","enunciado":"De que país veio o Papa João Paulo II?","opcoes":["Polônia","Itália","Brasil"],"correta":0,"explicacao":"Ele nasceu na Polônia, um país da Europa."},
    {"tipo":"vf","enunciado":"O nome de João Paulo II era Karol.","correta":true,"explicacao":"Karol é o jeito polonês de dizer Carlos."},
    {"tipo":"multipla","enunciado":"Que conselho famoso João Paulo II deu a todos?","opcoes":["Não tenhais medo!","Fiquem quietos!","Vão dormir!"],"correta":0,"explicacao":"Ele queria que ninguém tivesse medo de abrir o coração para Jesus."},
    {"tipo":"vf","enunciado":"Quando jovem, Karol trabalhou quebrando pedras numa pedreira.","correta":true,"explicacao":"Ele sabia como é duro o trabalho de cada dia."},
    {"tipo":"multipla","enunciado":"O que Karol gostava de fazer quando era jovem?","opcoes":["Teatro e esportes","Brigar","Ficar parado"],"correta":0,"explicacao":"Ele fazia teatro e adorava esquiar nas montanhas."},
    {"tipo":"vf","enunciado":"João Paulo II foi Papa por muitos anos.","correta":true,"explicacao":"Ele guiou a Igreja por muito tempo, visitando o mundo inteiro."},
    {"tipo":"multipla","enunciado":"O Papa é o pastor de quem?","opcoes":["De toda a Igreja","De um país só","Só dos padres"],"correta":0,"explicacao":"O Papa cuida de todos os católicos do mundo."},
    {"tipo":"vf","enunciado":"João Paulo II nunca saiu de Roma.","correta":false,"explicacao":"Ele viajou pelo mundo inteiro levando Jesus a muitos povos."},
    {"tipo":"multipla","enunciado":"Como João Paulo II gostava de ficar perto das pessoas?","opcoes":["Viajando e visitando","Trancado em casa","Escondido"],"correta":0,"explicacao":"Ele visitou muitos, muitos países."},
    {"tipo":"vf","enunciado":"Hoje João Paulo II é santo.","correta":true,"explicacao":"A Igreja declarou que ele está no Céu, junto de Deus."}
  ],
  "jpii-2": [
    {"tipo":"vf","enunciado":"João Paulo II criou a Jornada Mundial da Juventude.","correta":true,"explicacao":"É um grande encontro de jovens do mundo inteiro com o Papa."},
    {"tipo":"multipla","enunciado":"Que oração curtinha aparece na imagem de Jesus Misericordioso?","opcoes":["Jesus, eu confio em vós","Bom dia, Jesus","Até logo, Jesus"],"correta":0,"explicacao":"É um jeito simples de dizer que confiamos no amor de Jesus."},
    {"tipo":"multipla","enunciado":"Que santa amiga de Jesus Misericordioso João Paulo II declarou santa?","opcoes":["Santa Faustina","Santa Rita","Santa Clara"],"correta":0,"explicacao":"Faustina era uma freira da Polônia, como ele."},
    {"tipo":"vf","enunciado":"João Paulo II visitou o Brasil.","correta":true,"explicacao":"Ele veio ao Brasil três vezes e foi recebido com muita alegria."},
    {"tipo":"multipla","enunciado":"Como João Paulo II chamava os jovens?","opcoes":["Sentinelas da manhã","Preguiçosos","Crianças perdidas"],"correta":0,"explicacao":"Sentinela é quem espera o sol nascer, e o sol é Jesus."},
    {"tipo":"vf","enunciado":"João Paulo II gostava muito dos jovens.","correta":true,"explicacao":"Ele dizia que os jovens são a esperança da Igreja."},
    {"tipo":"ordenar","enunciado":"Monte a frase do Papa aos jovens:","blocos":["Vós sois","a esperança","da Igreja"],"explicacao":"Ele acreditava que os jovens podem mudar o mundo com Jesus."},
    {"tipo":"multipla","enunciado":"O Papa queria que os jovens fossem amigos de quem?","opcoes":["De Jesus","Só dos famosos","De ninguém"],"correta":0,"explicacao":"Para ele, Jesus é o melhor amigo que alguém pode ter."},
    {"tipo":"vf","enunciado":"João Paulo II achava que santos só existiam antigamente.","correta":false,"explicacao":"Ele mostrou que hoje também existem santos, e que você também pode ser."},
    {"tipo":"multipla","enunciado":"Como se chama o encontro de jovens com o Papa?","opcoes":["Jornada Mundial da Juventude","Copa do Mundo","Festa junina"],"correta":0,"explicacao":"Na Jornada, jovens de muitos países rezam e cantam juntos."}
  ],
  "jpii-3": [
    {"tipo":"vf","enunciado":"João Paulo II perdoou o homem que atirou nele.","correta":true,"explicacao":"Ele foi visitar esse homem na prisão e falou com ele como um irmão."},
    {"tipo":"multipla","enunciado":"Que novos mistérios do terço João Paulo II criou?","opcoes":["Os mistérios luminosos","Os mistérios do mar","Os mistérios das estrelas"],"correta":0,"explicacao":"Eles lembram momentos da vida de Jesus, como o batismo e a festa de Caná."},
    {"tipo":"multipla","enunciado":"O que o Papa fez depois de ser atacado?","opcoes":["Perdoou","Ficou com ódio","Quis vingança"],"correta":0,"explicacao":"Perdoar é o jeito de Jesus vencer o mal."},
    {"tipo":"vf","enunciado":"João Paulo II agradeceu a Nossa Senhora por ter sido salvo.","correta":true,"explicacao":"Ele disse que Nossa Senhora o protegeu naquele dia."},
    {"tipo":"multipla","enunciado":"A qual Nossa Senhora o Papa agradeceu por ter sido salvo?","opcoes":["Nossa Senhora de Fátima","Nossa Senhora do Carmo","Nossa Senhora da Luz"],"correta":0,"explicacao":"O ataque aconteceu no dia de Nossa Senhora de Fátima."},
    {"tipo":"vf","enunciado":"Quando ficou velhinho e doente, João Paulo II continuou trabalhando.","correta":true,"explicacao":"Ele mostrou que até a doença pode ser oferecida a Deus com amor."},
    {"tipo":"multipla","enunciado":"O que o povo gritava na despedida de João Paulo II?","opcoes":["Santo já!","Vai embora!","Silêncio!"],"correta":0,"explicacao":"O povo tinha certeza de que ele era um santo."},
    {"tipo":"vf","enunciado":"João Paulo II foi declarado santo no mesmo dia que o Papa João XXIII.","correta":true,"explicacao":"Foi uma festa com dois Papas santos."},
    {"tipo":"multipla","enunciado":"Qual era a oração preferida de João Paulo II?","opcoes":["O terço","A novena de Natal","A Via-Sacra"],"correta":0,"explicacao":"Ele mesmo disse que o terço era a sua oração preferida."},
    {"tipo":"vf","enunciado":"Perdoar é guardar raiva no coração.","correta":false,"explicacao":"Perdoar é soltar a raiva e deixar Deus curar o coração."}
  ],

  // ---------------- SANTA RITA DE CÁSSIA ----------------
  "rita-1": [
    {"tipo":"multipla","enunciado":"Santa Rita é chamada a santa de quê?","opcoes":["Das causas impossíveis","Das viagens","Dos esportes"],"correta":0,"explicacao":"Quando algo parece impossível, pedimos que Rita reze por nós."},
    {"tipo":"vf","enunciado":"Rita foi casada e teve filhos antes de ser freira.","correta":true,"explicacao":"Ela foi santa como esposa, como mãe e como freira."},
    {"tipo":"multipla","enunciado":"Em que país Rita nasceu?","opcoes":["Itália","Espanha","Japão"],"correta":0,"explicacao":"Rita nasceu numa aldeia da Itália chamada Roccaporena."},
    {"tipo":"vf","enunciado":"Desde menina, Rita queria dar a vida a Deus.","correta":true,"explicacao":"Mas obedeceu aos pais, se casou e viveu com muita fé."},
    {"tipo":"multipla","enunciado":"Como era o marido de Rita no começo?","opcoes":["Bravo e difícil","Muito calmo","Muito tímido"],"correta":0,"explicacao":"Rita teve paciência e rezou muito por ele."},
    {"tipo":"vf","enunciado":"Com paciência e oração, Rita ajudou o marido a ficar mais bondoso.","correta":true,"explicacao":"O amor dela tocou o coração dele."},
    {"tipo":"multipla","enunciado":"Quantos filhos Rita teve?","opcoes":["Dois","Dez","Nenhum"],"correta":0,"explicacao":"Ela teve dois meninos e os ensinou a amar a Deus."},
    {"tipo":"vf","enunciado":"Rita gritava e brigava com todo mundo.","correta":false,"explicacao":"Rita era mansa e respondia com paciência e carinho."},
    {"tipo":"multipla","enunciado":"Qual flor lembra Santa Rita?","opcoes":["A rosa","O girassol","A margarida"],"correta":0,"explicacao":"Por causa de uma rosa que floresceu no inverno."},
    {"tipo":"vf","enunciado":"Rita rezava pela sua família.","correta":true,"explicacao":"A oração era a força de Rita em casa."}
  ],
  "rita-2": [
    {"tipo":"multipla","enunciado":"Quando o marido de Rita morreu numa briga, o que ela escolheu?","opcoes":["Perdoar","Se vingar","Fugir"],"correta":0,"explicacao":"Rita escolheu o perdão, mesmo com o coração doendo."},
    {"tipo":"vf","enunciado":"Rita perdoou quem fez mal ao marido dela.","correta":true,"explicacao":"O perdão de Rita trouxe paz para as famílias."},
    {"tipo":"multipla","enunciado":"O que Rita queria que as famílias fizessem?","opcoes":["Fizessem as pazes","Continuassem brigando","Mudassem de cidade"],"correta":0,"explicacao":"Ela rezou e trabalhou para que todos vivessem em paz."},
    {"tipo":"vf","enunciado":"Rita conseguiu que as famílias inimigas fizessem as pazes.","correta":true,"explicacao":"Conta a tradição que, depois disso, ela pôde entrar no convento."},
    {"tipo":"multipla","enunciado":"Qual é a virtude mais lembrada de Rita?","opcoes":["O perdão","A pressa","A vaidade"],"correta":0,"explicacao":"Perdoar é um presente que cura o coração."},
    {"tipo":"ordenar","enunciado":"Monte a oração a Santa Rita:","blocos":["Santa Rita,","advogada","das causas impossíveis"],"explicacao":"Advogada é quem defende a gente: Rita reza por nós diante de Deus."},
    {"tipo":"vf","enunciado":"Perdoar quer dizer que o mal não tem importância.","correta":false,"explicacao":"Perdoar não é dizer que o mal está certo: é não guardar ódio no coração."},
    {"tipo":"multipla","enunciado":"O que ajudava Rita a perdoar?","opcoes":["A oração","A raiva","O medo"],"correta":0,"explicacao":"Rezando, Rita encontrava forças para perdoar."},
    {"tipo":"vf","enunciado":"Quem perdoa fica com o coração mais leve.","correta":true,"explicacao":"O perdão tira do coração um peso muito grande."},
    {"tipo":"multipla","enunciado":"Depois que as famílias fizeram as pazes, onde Rita foi morar?","opcoes":["Num convento","Num castelo","Num navio"],"correta":0,"explicacao":"Rita virou freira no convento de Cássia."}
  ],
  "rita-3": [
    {"tipo":"vf","enunciado":"Rita recebeu na testa uma ferida, como a de um espinho da coroa de Jesus.","correta":true,"explicacao":"Ela quis sentir um pouquinho da dor de Jesus, por amor."},
    {"tipo":"multipla","enunciado":"Em que cidade fica o convento de Santa Rita?","opcoes":["Cássia","Lisboa","Paris"],"correta":0,"explicacao":"Por isso ela se chama Rita de Cássia."},
    {"tipo":"multipla","enunciado":"O que floresceu no inverno a pedido de Rita?","opcoes":["Uma rosa","Um girassol","Uma margarida"],"correta":0,"explicacao":"Conta a tradição que acharam uma rosa no jardim, em pleno inverno."},
    {"tipo":"vf","enunciado":"Conta a tradição que Rita pediu figos no inverno e eles apareceram.","correta":true,"explicacao":"Deus fez esse carinho para a sua amiga doente."},
    {"tipo":"multipla","enunciado":"Diante de quem Rita rezava quando recebeu o espinho?","opcoes":["De Jesus na cruz","De um rei","De um espelho"],"correta":0,"explicacao":"Ela rezava olhando para Jesus crucificado."},
    {"tipo":"vf","enunciado":"Muitos peregrinos visitam Santa Rita em Cássia.","correta":true,"explicacao":"Muita gente vai até lá para pedir que ela reze por nós."},
    {"tipo":"multipla","enunciado":"Por que a rosa é o símbolo de Santa Rita?","opcoes":["Floresceu no inverno, a pedido dela","Ela vendia flores","Ela só plantava rosas"],"correta":0,"explicacao":"A rosa lembra que para Deus nada é impossível."},
    {"tipo":"vf","enunciado":"Rita reclamava da ferida o tempo todo.","correta":false,"explicacao":"Rita oferecia a sua dor a Jesus, com paciência."},
    {"tipo":"multipla","enunciado":"Quando pedimos algo difícil a Deus, quem podemos chamar para rezar conosco?","opcoes":["Santa Rita","Um mágico","A sorte"],"correta":0,"explicacao":"Rita reza por nós junto de Deus."},
    {"tipo":"vf","enunciado":"Santa Rita viveu há muito tempo, mas ainda hoje é muito amada.","correta":true,"explicacao":"Em muitas igrejas há uma imagem de Santa Rita com rosas."}
  ],

  // ---------------- SÃO JUDAS TADEU ----------------
  "judas-1": [
    {"tipo":"multipla","enunciado":"Quantos apóstolos Jesus escolheu?","opcoes":["Doze","Três","Cem"],"correta":0,"explicacao":"Judas Tadeu era um dos doze amigos mais próximos de Jesus."},
    {"tipo":"vf","enunciado":"São Judas Tadeu é o mesmo Judas que traiu Jesus.","correta":false,"explicacao":"São duas pessoas diferentes: Judas Tadeu foi fiel a Jesus até o fim."},
    {"tipo":"multipla","enunciado":"Com qual apóstolo São Judas Tadeu é festejado no mesmo dia?","opcoes":["São Simão","São Jorge","São João"],"correta":0,"explicacao":"Os dois apóstolos são lembrados juntos."},
    {"tipo":"vf","enunciado":"Na Última Ceia, Judas Tadeu fez uma pergunta a Jesus.","correta":true,"explicacao":"Ele queria entender como Jesus se mostraria aos amigos."},
    {"tipo":"multipla","enunciado":"O que Jesus respondeu a Judas Tadeu?","opcoes":["Que viria morar em quem o ama","Que ia viajar","Que estava cansado"],"correta":0,"explicacao":"Jesus e o Pai fazem morada no coração de quem ama Jesus."},
    {"tipo":"vf","enunciado":"O nome Tadeu ajuda a não confundir os dois Judas.","correta":true,"explicacao":"Assim sabemos que estamos falando do apóstolo fiel."},
    {"tipo":"multipla","enunciado":"O que é um apóstolo?","opcoes":["Um amigo enviado por Jesus","Um soldado romano","Um rei"],"correta":0,"explicacao":"Apóstolo quer dizer enviado: ele leva Jesus para os outros."},
    {"tipo":"vf","enunciado":"Segundo a tradição, Judas Tadeu deu a vida por amor a Jesus.","correta":true,"explicacao":"Ele foi fiel até o fim, anunciando Jesus."},
    {"tipo":"multipla","enunciado":"Segundo a tradição, Judas Tadeu era o quê de Jesus?","opcoes":["Parente","Vizinho","Desconhecido"],"correta":0,"explicacao":"Muitos acreditam que ele era primo de Jesus."},
    {"tipo":"vf","enunciado":"Conta a tradição que Judas Tadeu anunciou Jesus em terras distantes.","correta":true,"explicacao":"Depois que Jesus subiu ao Céu, ele saiu pelo mundo falando de Deus."}
  ],
  "judas-2": [
    {"tipo":"multipla","enunciado":"Qual livro da Bíblia tem o nome de Judas?","opcoes":["A Carta de Judas","O Livro dos Salmos","O Evangelho de Marcos"],"correta":0,"explicacao":"É uma carta curtinha no Novo Testamento."},
    {"tipo":"vf","enunciado":"A Carta de Judas é bem curtinha.","correta":true,"explicacao":"Ela tem um capítulo só."},
    {"tipo":"multipla","enunciado":"Em que parte da Bíblia fica a Carta de Judas?","opcoes":["No Novo Testamento","No Antigo Testamento","No Livro dos Salmos"],"correta":0,"explicacao":"O Novo Testamento conta a vida de Jesus e dos primeiros cristãos."},
    {"tipo":"vf","enunciado":"A Carta de Judas pede que os cristãos cuidem da fé.","correta":true,"explicacao":"Ela pede que cuidemos da fé como de um tesouro."},
    {"tipo":"multipla","enunciado":"O que a carta pede que façamos com quem tem dúvidas?","opcoes":["Ter compaixão","Brigar","Rir deles"],"correta":0,"explicacao":"Compaixão é tratar o outro com carinho e paciência."},
    {"tipo":"ordenar","enunciado":"Monte o conselho da Carta de Judas:","blocos":["Conservai-vos","no amor","de Deus"],"explicacao":"Ficar no amor de Deus é o que mais importa."},
    {"tipo":"vf","enunciado":"A Carta de Judas vem logo antes do último livro da Bíblia.","correta":true,"explicacao":"O último livro da Bíblia é o Apocalipse."},
    {"tipo":"multipla","enunciado":"Como termina a Carta de Judas?","opcoes":["Com um louvor a Deus","Com uma lista de nomes","Com uma história de guerra"],"correta":0,"explicacao":"Ela termina dando glória a Deus, que nos guarda."},
    {"tipo":"vf","enunciado":"A Carta de Judas manda desprezar quem tem dúvidas.","correta":false,"explicacao":"A carta pede compaixão: ajudar com carinho quem está confuso."},
    {"tipo":"multipla","enunciado":"Por que a Carta de Judas é chamada de carta católica?","opcoes":["É para todos os cristãos","É só para padres","É um segredo"],"correta":0,"explicacao":"Católico quer dizer para todos, no mundo inteiro."}
  ],
  "judas-3": [
    {"tipo":"vf","enunciado":"São Judas Tadeu é chamado de santo das causas difíceis.","correta":true,"explicacao":"Quando tudo parece difícil, pedimos que ele reze por nós."},
    {"tipo":"multipla","enunciado":"O que aparece sobre a cabeça de São Judas nas imagens?","opcoes":["Uma chama","Um chapéu","Uma coroa"],"correta":0,"explicacao":"A chama lembra o Espírito Santo, que veio sobre os apóstolos."},
    {"tipo":"multipla","enunciado":"Que rosto São Judas leva no peito, nas imagens?","opcoes":["O rosto de Jesus","O rosto de um rei","O rosto de um anjo"],"correta":0,"explicacao":"Ele leva Jesus bem junto do coração."},
    {"tipo":"vf","enunciado":"Em São Paulo existe um santuário de São Judas Tadeu muito visitado.","correta":true,"explicacao":"Todos os dias muita gente vai lá rezar."},
    {"tipo":"multipla","enunciado":"A chama sobre São Judas lembra qual festa?","opcoes":["Pentecostes","Natal","Páscoa"],"correta":0,"explicacao":"Em Pentecostes, o Espírito Santo veio como línguas de fogo."},
    {"tipo":"vf","enunciado":"Pedir a um santo que reze por nós é trocar Deus pelo santo.","correta":false,"explicacao":"Só Deus é adorado; os santos são amigos que rezam por nós."},
    {"tipo":"multipla","enunciado":"Quando pedimos ajuda a São Judas, o que ele faz?","opcoes":["Reza a Deus por nós","Faz mágica","Nada"],"correta":0,"explicacao":"Os santos são amigos de Deus e rezam junto com a gente."},
    {"tipo":"vf","enunciado":"Os santos são amigos de Deus.","correta":true,"explicacao":"Eles viveram com muito amor e hoje estão com Deus no Céu."},
    {"tipo":"multipla","enunciado":"Qual é uma oração curtinha a São Judas?","opcoes":["São Judas Tadeu, rogai por nós","São Judas Tadeu, vamos brincar","São Judas Tadeu, até amanhã"],"correta":0,"explicacao":"Rogai por nós quer dizer: reze por nós."},
    {"tipo":"vf","enunciado":"Ter esperança é confiar que Deus cuida da gente.","correta":true,"explicacao":"São Judas é o apóstolo da esperança."}
  ],

  // ---------------- SANTA TERESA DE ÁVILA ----------------
  "avila-1": [
    {"tipo":"multipla","enunciado":"Em que país Santa Teresa de Ávila nasceu?","opcoes":["Espanha","Itália","Brasil"],"correta":0,"explicacao":"Ela nasceu na cidade de Ávila, na Espanha."},
    {"tipo":"vf","enunciado":"Quando criança, Teresa fugiu com o irmão sonhando em dar a vida por Jesus.","correta":true,"explicacao":"Um tio encontrou os dois no caminho e os levou de volta para casa."},
    {"tipo":"multipla","enunciado":"Teresa era freira carmelita. O que as carmelitas fazem muito?","opcoes":["Rezam","Correm","Viajam de avião"],"correta":0,"explicacao":"As carmelitas passam muito tempo rezando em silêncio."},
    {"tipo":"vf","enunciado":"Teresa abriu muitas casas novas para as irmãs rezarem.","correta":true,"explicacao":"Ela fundou muitos conventos pela Espanha."},
    {"tipo":"multipla","enunciado":"Como Teresa viajava pela Espanha?","opcoes":["De carroça","De trem","De carro"],"correta":0,"explicacao":"Ela viajava em carroças simples, por estradas difíceis."},
    {"tipo":"vf","enunciado":"Teresa tinha a saúde fraca, mas trabalhou muito por Deus.","correta":true,"explicacao":"Nem a doença fez Teresa desistir."},
    {"tipo":"multipla","enunciado":"Qual foi o primeiro convento que Teresa fundou?","opcoes":["São José","São Damião","Monte Cassino"],"correta":0,"explicacao":"O convento de São José fica em Ávila."},
    {"tipo":"vf","enunciado":"Teresa era sempre séria e nunca brincava.","correta":false,"explicacao":"Teresa era alegre e fazia as irmãs rirem."},
    {"tipo":"multipla","enunciado":"O que Teresa ensinava as irmãs a fazer?","opcoes":["Rezar com o coração","Ficar ricas","Brigar"],"correta":0,"explicacao":"Para Teresa, rezar é conversar com um amigo."},
    {"tipo":"vf","enunciado":"Santa Teresa é Doutora da Igreja, uma grande mestra da fé.","correta":true,"explicacao":"Ela foi a primeira mulher a receber esse título."}
  ],
  "avila-2": [
    {"tipo":"multipla","enunciado":"Teresa comparou a nossa alma com o quê?","opcoes":["Um castelo","Uma caixa","Um carro"],"correta":0,"explicacao":"Um castelo lindo, com Deus morando lá no centro."},
    {"tipo":"ordenar","enunciado":"Monte o poema de Teresa:","blocos":["Nada te perturbe,","nada te espante,","só Deus basta"],"explicacao":"Quando temos Deus, não precisamos ter medo."},
    {"tipo":"multipla","enunciado":"Quantas moradas tem o castelo de Teresa?","opcoes":["Sete","Duas","Cem"],"correta":0,"explicacao":"Cada morada é um passo para ficar mais perto de Deus."},
    {"tipo":"vf","enunciado":"Para Teresa, Deus mora no centro do castelo da alma.","correta":true,"explicacao":"Deus está dentro de nós, bem pertinho."},
    {"tipo":"multipla","enunciado":"Qual é a porta para entrar no castelo, segundo Teresa?","opcoes":["A oração","O dinheiro","A fama"],"correta":0,"explicacao":"Rezando, entramos no castelo e encontramos Deus."},
    {"tipo":"vf","enunciado":"Teresa escreveu livros para ensinar as irmãs a rezar.","correta":true,"explicacao":"Um deles se chama Caminho de Perfeição."},
    {"tipo":"vf","enunciado":"Teresa dizia que a alma é feia e escura.","correta":false,"explicacao":"Teresa dizia que a alma é linda como um castelo de cristal."},
    {"tipo":"multipla","enunciado":"De que era feito o castelo que Teresa imaginou?","opcoes":["De cristal ou diamante","De areia","De papelão"],"correta":0,"explicacao":"É um jeito de dizer que Deus nos fez muito bonitos por dentro."},
    {"tipo":"vf","enunciado":"Quem tem Deus não precisa ter medo de nada.","correta":true,"explicacao":"Teresa escreveu: quem a Deus tem, nada lhe falta."},
    {"tipo":"multipla","enunciado":"Onde podemos encontrar Deus, segundo Teresa?","opcoes":["Dentro do nosso coração","Só no céu azul","Em nenhum lugar"],"correta":0,"explicacao":"Deus está mais perto do que imaginamos."}
  ],
  "avila-3": [
    {"tipo":"multipla","enunciado":"Para Teresa, rezar é:","opcoes":["Conversar com um amigo que nos ama","Repetir palavras sem pensar","Pedir só presentes"],"correta":0,"explicacao":"Teresa dizia que rezar é conversar com Deus como amigos."},
    {"tipo":"vf","enunciado":"São João da Cruz foi amigo e ajudante de Teresa.","correta":true,"explicacao":"Os dois trabalharam juntos para renovar a vida das irmãs e dos frades carmelitas."},
    {"tipo":"multipla","enunciado":"Onde Teresa dizia que Deus também está?","opcoes":["Entre as panelas da cozinha","Só nos palácios","Longe de nós"],"correta":0,"explicacao":"Até lavando a louça podemos estar com Deus."},
    {"tipo":"vf","enunciado":"Teresa contou que um anjo tocou o seu coração com uma flecha de fogo.","correta":true,"explicacao":"Era um sinal do amor enorme de Deus por ela."},
    {"tipo":"multipla","enunciado":"Um artista fez uma estátua famosa de Teresa com quem?","opcoes":["Um anjo","Um leão","Um rei"],"correta":0,"explicacao":"A estátua mostra o anjo que tocou o coração dela com o amor de Deus."},
    {"tipo":"vf","enunciado":"Teresa estava viajando quando foi para o Céu.","correta":true,"explicacao":"Até o fim, ela trabalhou pelas irmãs com muito amor."},
    {"tipo":"multipla","enunciado":"Qual é o melhor jeito de ser amigo de Deus, segundo Teresa?","opcoes":["Conversar com Ele todos os dias","Esquecer dele","Só pedir coisas"],"correta":0,"explicacao":"Amigos conversam sempre, e Deus adora ouvir a gente."},
    {"tipo":"vf","enunciado":"Teresa achava que só dá para rezar dentro da igreja.","correta":false,"explicacao":"Podemos rezar em todo lugar: em casa, na escola e até na cozinha."},
    {"tipo":"multipla","enunciado":"Quem era o melhor amigo de Teresa?","opcoes":["Jesus","Um rei","Uma rainha"],"correta":0,"explicacao":"Teresa conversava com Jesus todos os dias."},
    {"tipo":"vf","enunciado":"Os livros de Teresa ajudam gente do mundo inteiro a rezar.","correta":true,"explicacao":"Por isso ela é chamada de mestra da oração."}
  ],
};
