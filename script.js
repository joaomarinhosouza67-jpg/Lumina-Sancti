// ============================================================
//  LUMINA SANCTI — Base de dados dos Santos, Beatos e Doutores
// ============================================================
// Cada entrada pode ter um campo "festa" no formato "MM-DD",
// referente à data de sua memória/festa litúrgica no calendário
// da Igreja Católica. Esse campo alimenta o recurso "Santo do
// Dia" (ver mais abaixo). Quando a celebração é móvel ou não
// tem uma data fixa única (como a Sagrada Família), o campo é
// simplesmente omitido — o santo continua normalmente no catálogo.

const santosData = [

  // ---------------- SAGRADA FAMÍLIA ----------------
  {
    id: 'sagrada-familia',
    nome: 'A Sagrada Família',
    wiki: 'Sagrada Família',
    categoria: ['sagrada-familia'],
    resumo: 'Jesus, Maria e José, o modelo supremo de amor, fé e união para todas as famílias cristãs.',
    texto: `
      <p>A Sagrada Família é o nome pelo qual a tradição cristã se refere ao núcleo familiar formado por Jesus, Maria e José, considerado um modelo de amor, fé e união para as famílias cristãs ao longo dos séculos. Sua história começa com a Anunciação: segundo o Evangelho de Lucas, o anjo Gabriel anuncia a Maria, uma jovem de Nazaré ainda noiva de José, que ela conceberia um filho por obra do Espírito Santo, e que esse filho seria chamado Jesus.</p>
      <p>José, ao descobrir a gravidez de sua noiva, vive um momento de angústia e dúvida, sendo tranquilizado por um anjo em sonho. A partir de então, protege fielmente a família, enfrentando a fuga para o Egito para escapar de Herodes e estabelecendo-se depois em Nazaré, onde vivem uma vida simples de trabalho e oração.</p>
    `
  },

  // ---------------- ARCANJOS ----------------
  {
    id: 'miguel',
    nome: 'São Miguel Arcanjo',
    wiki: 'Miguel (arcanjo)',
    categoria: ['arcanjos', 'grandes-santos'],
    festa: '09-29',
    resumo: 'O príncipe da milícia celeste e protetor da Igreja contra os ataques do mal.',
    texto: `
      <p>Segundo o livro do Apocalipse, foi Miguel quem liderou os anjos fiéis na batalha celeste contra Lúcifer e os anjos rebeldes, expulsando-os do Céu. Seu nome, que em hebraico significa "Quem como Deus?", é também seu grito de guerra contra o orgulho de quem quis se igualar ao Criador.</p>
      <p>Ao longo da história, Miguel apareceu em diversos momentos como defensor do povo de Deus — do Antigo Testamento às aparições marianas mais recentes. É invocado como protetor contra o mal em todas as suas formas, e uma antiga oração composta pelo Papa Leão XIII pede sua proteção diária contra as ciladas do demônio.</p>
    `
  },
  {
    id: 'gabriel',
    nome: 'São Gabriel Arcanjo',
    wiki: 'Gabriel (arcanjo)',
    categoria: ['arcanjos'],
    festa: '09-29',
    resumo: 'O mensageiro de Deus, que anunciou a Maria o nascimento do Salvador.',
    texto: `
      <p>Conhecido como o grande arauto das revelações divinas, São Gabriel trouxe as boas novas a Zacarias, anunciando o nascimento de João Batista, e depois a maior de todas as mensagens: a Anunciação à Virgem Maria, revelando que ela seria a mãe do Salvador.</p>
      <p>Seu nome significa "força de Deus" ou "Deus é minha força". Alguns estudiosos bíblicos também o identificam com o anjo que explicou visões proféticas ao profeta Daniel, séculos antes. É padroeiro dos mensageiros, jornalistas, radialistas e de todos que trabalham em comunicações, por ter sido o portador da mensagem mais importante já anunciada.</p>
    `
  },
  {
    id: 'rafael',
    nome: 'São Rafael Arcanjo',
    wiki: 'Rafael (arcanjo)',
    categoria: ['arcanjos'],
    festa: '09-29',
    resumo: 'O anjo da cura e guia seguro dos viajantes, conforme o Livro de Tobias.',
    texto: `
      <p>Seu nome significa "Deus cura". No Livro de Tobias, ele se apresenta disfarçado de companheiro de viagem ao jovem Tobias, guiando-o em segurança por uma jornada perigosa e ensinando-o a curar a cegueira de seu pai, Tobit, com o fel de um peixe.</p>
      <p>Somente ao fim da narrativa Rafael revela sua verdadeira identidade angélica, dizendo que apresenta as orações dos santos diante da glória de Deus. Por essa história, é invocado como protetor dos viajantes, dos médicos, dos enfermeiros e de todos que buscam cura física ou espiritual.</p>
    `
  },

  // ---------------- DOUTORES DA IGREJA ----------------
  {
    id: 'agostinho',
    nome: 'Santo Agostinho de Hipona',
    wiki: 'Agostinho de Hipona',
    categoria: ['doutores', 'grandes-santos'],
    festa: '08-28',
    resumo: 'Um dos maiores pensadores da Igreja, que encontrou a verdade após uma juventude inquieta.',
    texto: `
      <p>Depois de uma vida de excessos e buscas filosóficas incessantes, Agostinho se converteu às lágrimas através das preces de sua mãe, Santa Mônica. Tornou-se Bispo de Hipona e um dos mais influentes teólogos da história, famoso por suas "Confissões".</p>
      <p>Antes da conversão, viveu anos entregue aos prazeres e a seitas filosóficas como o maniqueísmo, sempre em busca inquieta da verdade — busca que resumiu na célebre frase "Fizeste-nos, Senhor, para Ti, e o nosso coração está inquieto enquanto não repousa em Ti". Como bispo, escreveu obras que moldaram todo o pensamento cristão ocidental, como "A Cidade de Deus", e é considerado um dos maiores teólogos de todos os tempos.</p>
    `
  },
  {
    id: 'tomas-aquino',
    nome: 'São Tomás de Aquino',
    wiki: 'Tomás de Aquino',
    categoria: ['doutores'],
    festa: '01-28',
    resumo: 'O Doutor Angélico, cuja sabedoria uniu brilhantemente a fé e a razão.',
    texto: `
      <p>Frade dominicano de intelecto inigualável, Tomás de Aquino dedicou sua vida a explicar e defender a fé cristã através da filosofia. Sua obra-prima, a "Suma Teológica", é até hoje um pilar do estudo cristão.</p>
      <p>Nascido em família nobre italiana, escandalizou os parentes ao escolher entrar para os dominicanos — uma ordem mendicante — em vez da carreira eclesiástica de prestígio planejada para ele; os irmãos chegaram a mantê-lo preso por quase um ano tentando demovê-lo da ideia. Apesar do apelido de "boi mudo" que recebeu na juventude por sua quietude, seu mestre Alberto Magno profetizou que seu mugido ainda ecoaria pelo mundo inteiro — o que se confirmou com sua vastíssima obra, estudada em seminários até hoje.</p>
    `
  },
  {
    id: 'teresa-avila',
    nome: 'Santa Teresa de Ávila',
    wiki: 'Teresa de Ávila',
    categoria: ['doutores', 'grandes-santos'],
    festa: '10-15',
    resumo: 'Mística e reformadora do Carmelo, primeira mulher a ser declarada Doutora da Igreja.',
    texto: `
      <p>Mulher de personalidade forte e vida de profunda oração mental, Santa Teresa reformou a Ordem das Carmelitas enfrentando imensas dificuldades. Escreveu tratados espirituais grandiosos, como o "Castelo Interior".</p>
      <p>Entrou para o Carmelo ainda jovem, mas só depois de anos de vida religiosa mediana viveu uma conversão mais profunda, que a lançou numa intensa vida mística marcada por êxtases e visões. Viajou pela Espanha, muitas vezes doente e em condições precárias, fundando dezessete conventos reformados sempre com bom humor — dizia que "entre os pucheiros também anda o Senhor". Foi declarada Doutora da Igreja em 1970, a primeira mulher a receber esse título.</p>
    `
  },
  {
    id: 'antonio-padua',
    nome: 'Santo Antônio de Pádua',
    wiki: 'António de Lisboa',
    categoria: ['doutores', 'grandes-santos'],
    festa: '06-13',
    resumo: 'O santo dos milagres, grande pregador franciscano e Doutor da Igreja.',
    texto: `
      <p>Nascido em Lisboa, foi um teólogo brilhante. Ingressou na Ordem Franciscana e sua pregação era tão poderosa que atraía multidões. É o santo padroeiro dos pobres e conhecido como o "Arca do Testamento".</p>
      <p>Antes de se tornar franciscano, era cônego agostiniano dedicado ao estudo; mudou de ordem após ver os corpos de frades franciscanos martirizados no Marrocos, desejando também ele o martírio missionário — o que nunca aconteceu, mas sua vida se tornou um martírio silencioso de pregação incansável. Ficou conhecido por pregar até aos peixes quando os hereges se recusavam a ouvi-lo, e por sua devoção ao Menino Jesus, com quem é frequentemente representado nos braços.</p>
    `
  },
  {
    id: 'francisco-sales',
    nome: 'São Francisco de Sales',
    wiki: 'Francisco de Sales',
    categoria: ['doutores', 'grandes-santos'],
    festa: '01-24',
    resumo: 'Bispo da doçura, patrono dos jornalistas e escritor de profunda espiritualidade.',
    texto: `
      <p>Conhecido por sua paciência inesgotável e doçura de gênio, Francisco de Sales converteu milhares de calvinistas na região de Genebra através do amor e de panfletos explicativos (o que o tornou patrono dos jornalistas). É autor da célebre obra "Introdução à Vida Devota".</p>
      <p>Nascido em família nobre francesa, renunciou a uma carreira brilhante na advocacia e na política para se tornar padre, contrariando os planos do pai. Como bispo de Genebra, insistia que a santidade não era privilégio de religiosos, mas um caminho aberto a leigos em qualquer profissão — ideia revolucionária para sua época, que o tornou um dos grandes mestres espirituais voltados à vida comum das pessoas.</p>
    `
  },
  {
    id: 'catarina-sena',
    nome: 'Santa Catarina de Sena',
    wiki: 'Catarina de Sena',
    categoria: ['doutores', 'grandes-santos'],
    festa: '04-29',
    resumo: 'Mística leiga que, com sua coragem, convenceu um Papa a voltar para Roma.',
    texto: `
      <p>Filha de um tintureiro de Sena, Catarina consagrou-se a Deus ainda jovem e viveu uma vida de intensa oração e penitência, mesmo sem entrar em um convento, como terceira ordem dominicana. Recebeu os estigmas de forma invisível e dedicou-se ao cuidado dos doentes de peste e dos prisioneiros condenados à morte.</p>
      <p>Sua coragem espiritual ficou marcada na história quando, por meio de cartas e viagens, convenceu o Papa Gregório XI a encerrar o exílio da Sé em Avinhão e retornar a Roma. Deixou como legado o "Diálogo da Divina Providência" e é, ao lado de Santa Teresa de Ávila, uma das primeiras mulheres declaradas Doutoras da Igreja.</p>
    `
  },
  {
    id: 'jeronimo',
    nome: 'São Jerônimo',
    wiki: 'Jerônimo',
    categoria: ['doutores'],
    festa: '09-30',
    resumo: 'O sábio tradutor da Bíblia para o latim, que viveu como eremita no deserto.',
    texto: `
      <p>Erudito de temperamento forte e inquieto, Jerônimo dedicou décadas de sua vida ao estudo das Escrituras, chegando a viver como eremita no deserto da Síria para se aprofundar na oração e na penitência. Aprendeu hebraico e grego com rigor incomum para sua época.</p>
      <p>Seu maior legado é a Vulgata, a tradução da Bíblia inteira para o latim a partir dos textos originais, que se tornou a versão oficial usada pela Igreja por mais de mil anos. É considerado o patrono dos tradutores, bibliotecários e estudiosos da Palavra de Deus.</p>
    `
  },
  {
    id: 'ambrosio',
    nome: 'Santo Ambrósio de Milão',
    wiki: 'Ambrósio de Milão',
    categoria: ['doutores'],
    festa: '12-07',
    resumo: 'Bispo de Milão, grande orador que batizou Santo Agostinho.',
    texto: `
      <p>Governador romano ainda catecúmeno quando foi aclamado bispo de Milão pelo povo, Ambrósio precisou aprender teologia às pressas para assumir a missão que lhe foi confiada. Tornou-se um dos maiores pregadores de seu tempo, defendendo com firmeza a fé diante até mesmo de imperadores.</p>
      <p>Foi ele quem, com sua eloquência e exemplo de vida, conduziu à conversão o jovem professor de retórica Agostinho, batizando-o na noite de Páscoa de 387. Compôs também belos hinos litúrgicos que ainda hoje ecoam na tradição musical da Igreja.</p>
    `
  },
  {
    id: 'joao-crisostomo',
    nome: 'São João Crisóstomo',
    wiki: 'João Crisóstomo',
    categoria: ['doutores'],
    festa: '09-13',
    resumo: '"Boca de Ouro", o maior pregador da Igreja antiga.',
    texto: `
      <p>Patriarca de Constantinopla, João recebeu o apelido de "Crisóstomo" — Boca de Ouro — por sua extraordinária capacidade de pregar, unindo profundidade teológica a uma linguagem simples que tocava o coração do povo. Denunciava sem medo os excessos dos poderosos e a indiferença com os pobres.</p>
      <p>Essa coragem lhe custou caro: foi exilado duas vezes por ordem da imperatriz Eudóxia, que se sentiu atingida por suas homilias. Morreu no caminho de seu segundo exílio, deixando um extenso legado de comentários bíblicos e sermões que permanecem entre os mais lidos da Antiguidade cristã.</p>
    `
  },
  {
    id: 'gregorio-magno',
    nome: 'São Gregório Magno',
    wiki: 'Papa Gregório I',
    categoria: ['doutores'],
    festa: '09-03',
    resumo: 'O Papa que se autodenominou "servo dos servos de Deus" e reformou a liturgia.',
    texto: `
      <p>Nascido em uma família nobre romana, Gregório abandonou uma carreira política promissora para se tornar monge, mas foi chamado de volta à vida pública e eleito Papa em 590, em meio a fome, peste e invasões bárbaras em Roma. Cunhou para si o título de "servo dos servos de Deus", que os pontífices usam até hoje.</p>
      <p>Reorganizou o canto litúrgico — hoje chamado de canto gregoriano em sua homenagem — e enviou monges missionários para evangelizar a Inglaterra. Sua administração sábia e sua vasta obra escrita lhe renderam o título de "Magno", o Grande.</p>
    `
  },
  {
    id: 'boaventura',
    nome: 'São Boaventura',
    wiki: 'Boaventura de Bagnoregio',
    categoria: ['doutores'],
    festa: '07-15',
    resumo: 'O Doutor Seráfico, que guiou a Ordem Franciscana com sabedoria e amor.',
    texto: `
      <p>Segundo a tradição, foi curado ainda criança por São Francisco de Assis, que ao vê-lo restabelecido teria exclamado "Ó boa ventura!" — origem de seu nome religioso. Entrou para os franciscanos e tornou-se um dos maiores teólogos místicos de seu tempo, amigo próximo de Tomás de Aquino.</p>
      <p>Como Ministro Geral da Ordem, soube unir com equilíbrio o rigor da vida espiritual franciscana às exigências do crescimento da comunidade. Escreveu obras místicas profundas, como "A Jornada da Mente para Deus", e recebeu o título de Doutor Seráfico pela doçura e ardor de sua doutrina.</p>
    `
  },
  {
    id: 'alberto-magno',
    nome: 'Santo Alberto Magno',
    wiki: 'Alberto Magno',
    categoria: ['doutores'],
    festa: '11-15',
    resumo: 'O Doutor Universal, mestre de Tomás de Aquino e pioneiro no estudo da natureza.',
    texto: `
      <p>Frade dominicano de curiosidade insaciável, Alberto dedicou-se ao estudo de praticamente todos os ramos do conhecimento de sua época: filosofia, teologia, botânica, astronomia e mineralogia, o que lhe valeu o título de Doutor Universal. Acreditava que o estudo da criação era também um caminho para conhecer o Criador.</p>
      <p>Foi professor em Paris e Colônia, onde teve como aluno um jovem chamado Tomás de Aquino, cujo gênio soube reconhecer e defender quando outros o subestimavam. Por seu pioneirismo científico dentro da fé, é considerado o patrono dos cientistas.</p>
    `
  },
  {
    id: 'joao-da-cruz',
    nome: 'São João da Cruz',
    wiki: 'João da Cruz',
    categoria: ['doutores', 'grandes-santos'],
    festa: '12-14',
    resumo: 'Poeta místico e reformador do Carmelo ao lado de Santa Teresa de Ávila.',
    texto: `
      <p>Frade carmelita de estatura pequena e alma imensa, João uniu-se a Santa Teresa de Ávila na reforma da Ordem do Carmelo, o que lhe trouxe perseguição dos próprios irmãos religiosos: chegou a ser mantido preso e maltratado em uma cela minúscula em Toledo por meses.</p>
      <p>Foi justamente nesse cativeiro que compôs alguns de seus versos mais belos. Sua poesia mística — "Noite Escura", "Cântico Espiritual", "Chama Viva de Amor" — descreve com delicadeza incomparável o caminho da alma até a união com Deus, e continua a influenciar poetas e místicos de todas as tradições.</p>
    `
  },
  {
    id: 'hildegarda',
    nome: 'Santa Hildegarda de Bingen',
    wiki: 'Hildegarda de Bingen',
    categoria: ['doutores'],
    festa: '09-17',
    resumo: 'Abadessa visionária, compositora e estudiosa da natureza na Alemanha medieval.',
    texto: `
      <p>Entregue ainda menina a um mosteiro beneditino na Alemanha, Hildegarda relatava ter visões divinas desde a infância, que só passou a registrar por escrito já adulta, com a bênção da Igreja. Tornou-se abadessa e uma das vozes espirituais mais respeitadas de seu tempo, aconselhando papas e imperadores.</p>
      <p>Foi também compositora — suas melodias sacras são cantadas até hoje — e escreveu tratados detalhados sobre plantas medicinais e o corpo humano, um feito notável para uma mulher do século XII. Foi declarada Doutora da Igreja em 2012.</p>
    `
  },
  {
    id: 'afonso-ligorio',
    nome: 'Santo Afonso Maria de Ligório',
    wiki: 'Afonso Maria de Ligório',
    categoria: ['doutores'],
    festa: '08-01',
    resumo: 'Advogado que se tornou bispo e fundador dos Redentoristas, mestre da teologia moral.',
    texto: `
      <p>Brilhante advogado napolitano, Afonso abandonou a carreira jurídica após perder uma causa por um detalhe que havia lhe escapado, entendendo o episódio como um chamado de Deus. Ordenou-se padre dedicado sobretudo à evangelização dos mais pobres e abandonados do campo.</p>
      <p>Fundou a Congregação do Santíssimo Redentor (Redentoristas) e escreveu uma vastíssima obra sobre teologia moral, buscando sempre equilibrar o rigor com a misericórdia no acompanhamento das almas. É considerado o patrono dos confessores e moralistas.</p>
    `
  },
  {
    id: 'joao-henry-newman',
    nome: 'São John Henry Newman',
    wiki: 'John Henry Newman',
    categoria: ['doutores', 'grandes-santos'],
    festa: '10-09',
    resumo: 'Cardeal inglês convertido do anglicanismo, recentemente proclamado Doutor da Igreja.',
    texto: `
      <p>Um dos maiores intelectuais ingleses do século XIX, Newman era um respeitado clérigo e professor anglicano em Oxford quando, após anos de estudo e busca sincera pela verdade, converteu-se ao catolicismo em 1845 — um gesto que lhe custou amizades e prestígio, mas que ele descreveu como entrar finalmente em "porto seguro".</p>
      <p>Ordenado padre católico e depois nomeado cardeal, fundou o Oratório na Inglaterra e escreveu obras fundamentais sobre a consciência e o desenvolvimento da doutrina cristã. Canonizado em 2019, foi proclamado Doutor da Igreja pelo Papa Leão XIV em novembro de 2025, tornando-se copadroeiro de todos os que participam da educação, junto com São Tomás de Aquino.</p>
    `
  },

  // ---------------- GRANDES SANTOS ----------------
  {
    id: 'joao-paulo-ii',
    nome: 'São João Paulo II',
    wiki: 'Papa João Paulo II',
    categoria: ['grandes-santos'],
    festa: '10-22',
    resumo: 'O Papa peregrino que viajou o mundo levando a mensagem de Cristo aos jovens e às famílias.',
    texto: `
      <p>Karol Wojtyła, nascido na Polônia, guiou a Igreja Católica em um dos pontificados mais longos e marcantes da história. Criador das Jornadas Mundiais da Juventude, foi um incansável defensor da vida, da paz e do amor humano.</p>
      <p>Viveu a juventude sob a ocupação nazista da Polônia, trabalhando em uma pedreira e uma fábrica química para escapar da deportação, e depois sob o regime comunista, formando-se secretamente para o sacerdócio. Como papa, sobreviveu a um atentado a tiros em 1981 e, anos depois, visitou pessoalmente na prisão o homem que tentou matá-lo, perdoando-o. Viajou mais que qualquer papa anterior, levando a mensagem cristã a mais de cem países, e foi canonizado em 2014.</p>
    `
  },
  {
    id: 'francisco-assis',
    nome: 'São Francisco de Assis',
    wiki: 'Francisco de Assis',
    categoria: ['grandes-santos'],
    festa: '10-04',
    resumo: 'O Poverello de Assis, que renunciou à riqueza para esposar a Senhora Pobreza e amar a criação.',
    texto: `
      <p>Nascido em Assis, abriu mão de uma vida de festas e riquezas após uma profunda conversão ao abraçar um leproso. Fundou a Ordem Franciscana e via a Deus em toda a criação, compondo o Cântico das Criaturas e recebendo os estigmas antes de falecer em 1226.</p>
      <p>Filho de um rico comerciante de tecidos, vivia entregue às diversões da juventude até que uma doença e a experiência da guerra o levaram a repensar a vida; o momento decisivo veio diante de um crucifixo na capela de São Damião, que ele ouviu lhe dizer "Francisco, reconstrói minha Igreja". Entendeu literalmente a princípio, reformando capelas com as próprias mãos, até perceber que a missão era maior. Renunciou publicamente à herança do pai, despindo-se das próprias roupas na praça da cidade, e passou a viver na mais radical pobreza, atraindo companheiros e fundando uma das maiores famílias religiosas da história da Igreja.</p>
    `
  },
  {
    id: 'jose',
    nome: 'São José',
    wiki: 'José de Nazaré',
    categoria: ['sagrada-familia', 'grandes-santos'],
    festa: '03-19',
    resumo: 'O pai adotivo de Jesus, homem justo, padroeiro da Igreja Universal e modelo de operário.',
    texto: `
      <p>Silencioso e profundamente justo, acolheu Maria e protegeu o Menino Jesus, trabalhando com as mãos em Nazaré para prover o sustento da Sagrada Família. É o exemplo perfeito de paternidade, zelo e obediência à vontade divina.</p>
      <p>Os Evangelhos não registram nenhuma palavra sua — José é o santo do silêncio e da ação, não dos discursos. Um anjo o instrui em sonhos por três vezes: para não temer receber Maria como esposa, para fugir com a família para o Egito diante da ameaça de Herodes, e para depois retornar a Nazaré. Carpinteiro de ofício, ensinou seu próprio trabalho a Jesus. A Igreja o proclama padroeiro da Igreja Universal, dos operários e da boa morte, por se acreditar que faleceu nos braços de Jesus e Maria.</p>
    `
  },
  {
    id: 'padre-pio',
    nome: 'São Padre Pio de Pietrelcina',
    wiki: 'Padre Pio de Pietrelcina',
    categoria: ['grandes-santos'],
    festa: '09-23',
    resumo: 'Frade capuchinho que carregou os estigmas de Cristo e dedicou sua vida à confissão e à oração.',
    texto: `
      <p>Francesco Forgione nasceu em 1887 na Itália. Entrou para os capuchinhos adotando o nome de Pio. Foi um homem de oração e sofrimento profundo, que recebeu visivelmente os estigmas em 1918. Dedicava horas intermináveis no confessionário para reconciliar os pecadores com Deus.</p>
      <p>Passava até dezesseis horas por dia ouvindo confissões, e relatos de sua época contam que conseguia perceber pecados escondidos dos penitentes antes mesmo que os confessassem, levando muitos a uma conversão profunda apenas pelo encontro com ele. Apesar da fama e das multidões que o procuravam, viveu décadas sob suspeita e restrições da própria Igreja, que investigou por anos os fenômenos místicos ao seu redor — obedeceu sempre, mesmo quando isso significava sofrimento. Fundou também a "Casa Alívio do Sofrimento", um grande hospital para os pobres.</p>
    `
  },
  {
    id: 'faustina',
    nome: 'Santa Faustina Kowalska',
    wiki: 'Maria Faustina Kowalska',
    categoria: ['grandes-santos'],
    festa: '10-05',
    resumo: 'A apóstola da Divina Misericórdia, que recebeu visões de Jesus misericordioso.',
    texto: `
      <p>Religiosa polonesa com uma vida mística monumental. Jesus apareceu a ela confiando-lhe a missão de espalhar a devoção à Divina Misericórdia pelo mundo inteiro, resultando no quadro de Jesus Misericordioso e no Terço da Misericórdia.</p>
      <p>Filha de camponeses pobres, teve pouca instrução formal e trabalhou como empregada doméstica antes de conseguir entrar para a vida religiosa, sendo aceita como irmã leiga na Congregação das Irmãs de Nossa Senhora da Misericórdia. Registrou suas experiências místicas por ordem do confessor num diário, hoje publicado como "Diário: A Misericórdia Divina na Minha Alma". Foi por meio dela que o Papa João Paulo II, seu compatriota polonês, instituiu a Festa da Divina Misericórdia no domingo seguinte à Páscoa.</p>
    `
  },
  {
    id: 'dulce-pobres',
    nome: 'Santa Dulce dos Pobres',
    wiki: 'Irmã Dulce',
    categoria: ['grandes-santos'],
    festa: '08-13',
    resumo: 'O "Anjo bom da Bahia", primeira mulher nascida no Brasil a ser canonizada.',
    texto: `
      <p>Maria Rita dedicou toda a sua vida ao cuidado dos doentes e miseráveis. Começou abrigando doentes no galinheiro de seu convento, o que mais tarde se transformaria no maior hospital beneficente do Brasil (Obras Sociais Irmã Dulce).</p>
      <p>Faleceu em 13 de março de 1992, em plena Quaresma — por isso a Arquidiocese de Salvador, de acordo com o Vaticano, fixou sua festa litúrgica em 13 de agosto, data em que, ainda jovem, fez seus votos religiosos e recebeu o nome de Irmã Dulce.</p>
    `
  },
  {
    id: 'teresa-calcuta',
    nome: 'Santa Teresa de Calcutá',
    wiki: 'Teresa de Calcutá',
    categoria: ['grandes-santos'],
    festa: '09-05',
    resumo: 'A "Mãe dos Pobres", que serviu os mais abandonados nas ruas de Calcutá.',
    texto: `
      <p>Nascida Anjezë Gonxhe Bojaxhiu em 1910, em Skopje, ainda jovem sentiu o chamado para a vida religiosa e partiu para a Índia, onde lecionou por anos em um colégio de meninas em Calcutá. Foi ali, em 1946, que ouviu o que chamou de "um chamado dentro do chamado": deixar tudo para servir os mais pobres entre os pobres, nas ruas.</p>
      <p>Fundou as Missionárias da Caridade, congregação que hoje atua em mais de cem países recolhendo doentes, moribundos e abandonados de quem ninguém mais cuidava. Recebeu o Prêmio Nobel da Paz em 1979, doando todo o valor aos pobres. Canonizada em 2016, sua festa foi fixada em 5 de setembro, data de sua morte em 1997.</p>
    `
  },
  {
    id: 'bernadete',
    nome: 'Santa Bernadete Soubirous',
    wiki: 'Bernadette Soubirous',
    categoria: ['santos-jovens', 'grandes-santos'],
    festa: '04-16',
    resumo: 'A jovem vidente de Lourdes, que acolheu com humildade as aparições de Nossa Senhora.',
    texto: `
      <p>Uma jovem camponesa humilde e analfabeta de Lourdes, na França, a quem a Virgem Maria apareceu 18 vezes na Gruta de Massabielle. Apesar de todos os interrogatórios e desconfianças, Bernadete manteve-se firme, serena e humilde, vivendo depois como freira na congregação de Nevers.</p>
      <p>Doente de asma desde criança e vivendo em extrema pobreza, Bernadete não sabia nem ler quando teve a primeira aparição, em 1858, o que tornou seu testemunho ainda mais notável diante de autoridades céticas que a interrogaram repetidas vezes. Foi durante uma das aparições que a Senhora pediu que cavasse no chão — surgindo ali a fonte de água que até hoje atrai milhões de peregrinos em busca de cura. Só depois Bernadete revelou que a visão se identificara dizendo "Eu sou a Imaculada Conceição".</p>
    `
  },
  {
    id: 'joana-darc',
    nome: 'Santa Joana d\'Arc',
    wiki: 'Joana d\'Arc',
    categoria: ['santos-jovens', 'grandes-santos'],
    festa: '05-30',
    resumo: 'A Donzela de Orléans, heroína nacional e guerreira guiada por vozes celestes.',
    texto: `
      <p>Camponesa francesa que, guiada pelas vozes de São Miguel, Santa Catarina e Santa Margarida, liderou o exército francês contra a dominação inglesa durante a Guerra dos Cem Anos. Foi capturada, julgada injustamente por um tribunal político e queimada viva na fogueira aos 19 anos.</p>
      <p>Começou a ouvir as vozes celestes aos treze anos, e aos dezessete convenceu o príncipe herdeiro francês, Carlos VII, a lhe confiar tropas para libertar a cidade sitiada de Orléans — vitória que mudou o rumo da guerra. Capturada pelos borguinhões e vendida aos ingleses, foi condenada por heresia principalmente por vestir roupas masculinas em batalha. Vinte e cinco anos depois de sua morte, um novo julgamento a inocentou completamente; foi canonizada em 1920 e é hoje padroeira da França.</p>
    `
  },
  {
    id: 'lourenco',
    nome: 'São Lourenço',
    wiki: 'Lourenço de Roma',
    categoria: ['grandes-santos'],
    festa: '08-10',
    resumo: 'Diácono romano e mártir, famoso por seu bom humor diante do martírio.',
    texto: `
      <p>Diácono da Igreja em Roma encarregado dos bens da diocese e da ajuda aos pobres. Quando ordenado a entregar os tesouros da Igreja ao imperador romano, Lourenço apresentou os pobres, órfãos e doentes, dizendo que aqueles eram os verdadeiros tesouros. Foi martirizado queimado numa grelha.</p>
      <p>Diante da fúria do prefeito romano ao ouvir essa resposta, Lourenço foi condenado a um martírio lento sobre uma grelha de ferro em brasas. A tradição conta que, em meio ao suplício, ainda teve ânimo para dizer aos algozes "podem virar-me, deste lado já estou assado" — episódio que o tornou, com o tempo, patrono também dos cozinheiros. Sua coragem diante da morte impressionou tanto Roma que, em poucas décadas, seu culto já rivalizava com o dos próprios apóstolos Pedro e Paulo.</p>
    `
  },
  {
    id: 'inacio-loyola',
    nome: 'Santo Inácio de Loyola',
    wiki: 'Inácio de Loyola',
    categoria: ['grandes-santos'],
    festa: '07-31',
    resumo: 'O soldado espanhol ferido em batalha que se tornou fundador dos jesuítas.',
    texto: `
      <p>Cavaleiro espanhol vaidoso e ambicioso, Inácio teve a perna estraçalhada por uma bala de canhão na defesa de Pamplona. Durante a longa e dolorosa convalescença, sem outra leitura disponível, mergulhou em livros sobre a vida de Cristo e dos santos — e sua vida mudou de rumo por completo.</p>
      <p>Fundou a Companhia de Jesus, ordem marcada pela obediência, pela disciplina espiritual e pela missão. Seus "Exercícios Espirituais", fruto de sua própria conversão, continuam sendo um dos caminhos de oração mais praticados até hoje em todo o mundo.</p>
    `
  },
  {
    id: 'francisco-xavier',
    nome: 'São Francisco Xavier',
    wiki: 'Francisco Xavier',
    categoria: ['grandes-santos'],
    festa: '12-03',
    resumo: 'O grande missionário que levou o Evangelho à Índia, ao Japão e a toda a Ásia.',
    texto: `
      <p>Companheiro de Santo Inácio de Loyola desde os tempos de estudante em Paris, Francisco Xavier tornou-se um dos primeiros e mais ardorosos missionários jesuítas, partindo para a Índia em 1541 e nunca mais voltando à Europa.</p>
      <p>Percorreu Goa, as ilhas do sudeste asiático e o Japão, aprendendo línguas e costumes locais para anunciar a fé, e batizando, segundo a tradição, uma multidão de pessoas. Morreu à beira do litoral chinês, sonhando ainda em evangelizar aquele imenso país. É considerado o maior missionário desde os tempos apostólicos.</p>
    `
  },
  {
    id: 'vicente-paulo',
    nome: 'São Vicente de Paulo',
    wiki: 'Vicente de Paulo',
    categoria: ['grandes-santos'],
    festa: '09-27',
    resumo: 'O padre francês que dedicou toda a vida ao socorro dos pobres e abandonados.',
    texto: `
      <p>Filho de camponeses franceses, Vicente teve uma trajetória sacerdotal comum até que uma série de encontros com a miséria do campo transformou seu coração e sua missão: passou a viver inteiramente para o serviço dos pobres, dos presos e dos doentes.</p>
      <p>Fundou a Congregação da Missão (Padres Lazaristas) e, ao lado de Santa Luísa de Marillac, as Filhas da Caridade, uma das primeiras ordens femininas a atuar fora da clausura, diretamente entre os necessitados. É o patrono de todas as obras de caridade cristã.</p>
    `
  },
  {
    id: 'bento-nursia',
    nome: 'São Bento de Núrsia',
    wiki: 'Bento de Núrsia',
    categoria: ['grandes-santos'],
    festa: '07-11',
    resumo: 'O pai do monaquismo ocidental, autor da Regra que ainda guia mosteiros pelo mundo.',
    texto: `
      <p>Diante da decadência moral de Roma, o jovem Bento retirou-se para viver em oração e penitência em uma gruta isolada. Aos poucos, discípulos foram se juntando a ele, e assim nasceram os primeiros mosteiros beneditinos, entre eles o célebre Monte Cassino.</p>
      <p>Escreveu a Regra de São Bento, marcada pelo lema "ora et labora" (reza e trabalha), que equilibra oração, estudo e trabalho manual com bom senso e moderação. Sua irmã gêmea, Santa Escolástica, seguiu caminho semelhante fundando o ramo feminino da vida monástica. É considerado copadroeiro da Europa.</p>
    `
  },
  {
    id: 'cecilia',
    nome: 'Santa Cecília',
    wiki: 'Cecília de Roma',
    categoria: ['grandes-santos'],
    festa: '11-22',
    resumo: 'Jovem mártir romana, padroeira dos músicos e da música sacra.',
    texto: `
      <p>Jovem de família nobre romana, Cecília havia consagrado seu coração a Deus, mas foi dada em casamento contra sua vontade. Conta a tradição que, durante a própria festa de núpcias, enquanto os instrumentos tocavam, ela cantava a Deus em seu coração — episódio que a tornou, com o tempo, padroeira dos músicos.</p>
      <p>Conseguiu converter o marido e o cunhado à fé cristã antes de todos serem martirizados durante as perseguições romanas. Seu túmulo, redescoberto séculos depois com o corpo intacto, tornou-se um dos mais visitados de Roma.</p>
    `
  },
  {
    id: 'sebastiao',
    nome: 'São Sebastião',
    wiki: 'Sebastião de Narbona',
    categoria: ['grandes-santos'],
    festa: '01-20',
    resumo: 'Soldado romano martirizado com flechas, sobrevivente que se tornou símbolo de fortaleza.',
    texto: `
      <p>Oficial do exército do imperador Diocleciano, Sebastião usava sua posição para socorrer secretamente os cristãos perseguidos, até ser descoberto e condenado a morrer amarrado a um poste e crivado de flechas pelos próprios soldados.</p>
      <p>Segundo a tradição, sobreviveu graças aos cuidados de uma piedosa mulher chamada Irene, e voltou a se apresentar diante do imperador para denunciar a perseguição — sendo então martirizado definitivamente a golpes. É invocado como protetor contra epidemias e padroeiro dos atletas e soldados.</p>
    `
  },
  {
    id: 'judas-tadeu',
    nome: 'São Judas Tadeu',
    wiki: 'Judas Tadeu',
    categoria: ['grandes-santos'],
    festa: '10-28',
    resumo: 'Apóstolo de Jesus, hoje o mais popular intercessor das causas urgentes e impossíveis.',
    texto: `
      <p>Um dos doze apóstolos escolhidos por Jesus, Judas Tadeu percorreu diversas regiões pregando o Evangelho após a Ressurreição e o Pentecostes, sendo tradicionalmente associado também à Pérsia, onde teria sido martirizado ao lado de São Simão.</p>
      <p>Por sua semelhança de nome com Judas Iscariotes, durante séculos foi um dos apóstolos menos invocados — o que, segundo a devoção popular, o tornou especialmente disposto a atender quem recorre a ele em situações desesperadoras. Hoje é um dos santos mais queridos do Brasil, invocado nas causas urgentes e impossíveis.</p>
    `
  },
  {
    id: 'jorge',
    nome: 'São Jorge',
    wiki: 'São Jorge',
    categoria: ['grandes-santos'],
    festa: '04-23',
    resumo: 'O cavaleiro mártir cuja lenda do dragão simboliza a vitória do bem sobre o mal.',
    texto: `
      <p>Soldado romano de origem grega, Jorge serviu no exército do imperador Diocleciano até que a onda de perseguição aos cristãos o obrigou a escolher entre negar a fé ou morrer. Escolheu permanecer fiel e foi torturado e decapitado no início do século IV.</p>
      <p>A famosa lenda do cavaleiro que enfrenta um dragão para salvar uma princesa surgiu séculos depois, tornando-se símbolo da coragem cristã diante do mal. É padroeiro de soldados, escoteiros e de países como a Geórgia e a Inglaterra, e uma das devoções mais fervorosas do Rio de Janeiro.</p>
    `
  },
  {
    id: 'cristovao',
    nome: 'São Cristóvão',
    wiki: 'Cristóvão da Lícia',
    categoria: ['grandes-santos'],
    festa: '07-25',
    resumo: 'O lendário gigante que carregou o Menino Jesus e se tornou padroeiro dos viajantes.',
    texto: `
      <p>Segundo a bela tradição que cerca sua história, Cristóvão era um homem de força extraordinária que decidiu colocar-se a serviço do rei mais poderoso que encontrasse. Um eremita o aconselhou a servir a Deus, carregando viajantes através de um rio perigoso.</p>
      <p>Uma noite, carregou nos ombros uma criança que, no meio da travessia, foi ficando cada vez mais pesada — era o próprio Cristo, que levava sobre si o peso do mundo. Daí seu nome, "Cristóvão" (aquele que carrega Cristo). É invocado como protetor dos viajantes e motoristas.</p>
    `
  },
  {
    id: 'cosme-damiao',
    nome: 'Santos Cosme e Damião',
    wiki: 'Cosme e Damião',
    categoria: ['grandes-santos'],
    festa: '09-26',
    resumo: 'Irmãos gêmeos médicos que curavam gratuitamente em nome de Cristo.',
    texto: `
      <p>Nascidos na Arábia, Cosme e Damião estudaram medicina e passaram a atender gratuitamente os doentes que a eles recorriam, recusando qualquer pagamento — por isso ficaram conhecidos como "anárgiros", os que curam sem receber nada em troca. Sua fama de caridade e competência se espalhou rapidamente.</p>
      <p>Foram presos e martirizados durante as perseguições do imperador Diocleciano, permanecendo fiéis até o fim. Sua festa litúrgica oficial é em 26 de setembro, mas no Brasil a devoção popular costuma distribuir doces às crianças em 27 de setembro, em memória de sua generosidade.</p>
    `
  },
  {
    id: 'rita-cassia',
    nome: 'Santa Rita de Cássia',
    wiki: 'Rita de Cássia',
    categoria: ['grandes-santos'],
    festa: '05-22',
    resumo: 'A "santa dos casos impossíveis", que atravessou um casamento difícil até a vida religiosa.',
    texto: `
      <p>Rita sonhava desde menina com a vida religiosa, mas obedeceu aos pais e casou-se ainda jovem com um homem violento e infiel. Suportou o casamento com paciência e oração por quase vinte anos, conseguindo, antes de sua morte trágica, converter o coração do marido.</p>
      <p>Viúva, tentou por três vezes entrar num convento agostiniano até ser finalmente aceita. Já religiosa, recebeu na testa uma ferida dolorosa, como se fosse um espinho da coroa de Cristo, que carregou até o fim da vida. Tornou-se a grande padroeira dos casos considerados impossíveis.</p>
    `
  },
  {
    id: 'isabel-hungria',
    nome: 'Santa Isabel da Hungria',
    wiki: 'Isabel da Hungria',
    categoria: ['grandes-santos'],
    festa: '11-17',
    resumo: 'Princesa húngara que trocou o luxo da corte pelo cuidado direto dos pobres.',
    texto: `
      <p>Filha do rei da Hungria, Isabel foi criada na corte da Turíngia, onde se casou ainda jovem por amor com o landgrave Luís. Apesar da vida de privilégios, dedicava-se pessoalmente a levar pão, roupas e cuidados aos pobres do reino, o que não era bem visto por toda a nobreza.</p>
      <p>Segundo a tradição, um dia foi surpreendida pelo marido carregando pão escondido no manto para os necessitados; ao abri-lo diante dele, os pães haviam se transformado em rosas. Ficou viúva ainda jovem e passou a viver com simplicidade franciscana, construindo um hospital onde ela mesma cuidava dos doentes.</p>
    `
  },
  {
    id: 'monica',
    nome: 'Santa Mônica',
    wiki: 'Mônica de Hipona',
    categoria: ['grandes-santos'],
    festa: '08-27',
    resumo: 'A mãe que, com décadas de lágrimas e oração, alcançou a conversão do filho Agostinho.',
    texto: `
      <p>Casada com um homem pagão de temperamento difícil, Mônica viveu sua fé com paciência e firmeza, conseguindo, com o tempo, a conversão do marido e da sogra. Sua maior batalha, porém, foi acompanhar o filho, Agostinho, em anos de vida dispersa, longe da Igreja e da verdade.</p>
      <p>Ela o seguiu de perto em várias cidades, chorando e rezando incessantemente por sua conversão, até presenciar, já em Milão, o momento em que ele finalmente se voltou para Deus, guiado por Santo Ambrósio. É a grande padroeira das mães que perseveram na oração pelos filhos.</p>
    `
  },
  {
    id: 'expedito',
    nome: 'Santo Expedito',
    wiki: 'Santo Expedito',
    categoria: ['grandes-santos'],
    festa: '04-19',
    resumo: 'O santo das causas urgentes, invocado por quem precisa de uma resposta rápida.',
    texto: `
      <p>A tradição conta que Expedito era um soldado romano que, ao decidir se converter ao cristianismo, foi tentado pelo próprio demônio, disfarçado de corvo, a adiar a decisão para o dia seguinte. Expedito teria pisado o pássaro e respondido: "Hoje mesmo serei cristão!" — e assim o fez, sem demora.</p>
      <p>Essa determinação em não adiar o que é urgente tornou-se sua marca devocional: é hoje um dos santos mais invocados no Brasil para as causas que não podem esperar, sempre representado com uma cruz onde se lê a palavra latina "Hodie" (hoje).</p>
    `
  },
  {
    id: 'barbara',
    nome: 'Santa Bárbara',
    wiki: 'Bárbara de Nicomédia',
    categoria: ['grandes-santos'],
    festa: '12-04',
    resumo: 'Jovem mártir trancada por seu próprio pai, invocada contra tempestades e perigos súbitos.',
    texto: `
      <p>Segundo a tradição, Bárbara era filha de um rico pagão que, temendo perder o controle sobre sua beleza e inteligência, a manteve trancada em uma torre. Foi lá que ela, secretamente, conheceu a fé cristã e decidiu abraçá-la, mandando abrir uma terceira janela na torre em honra à Santíssima Trindade.</p>
      <p>Ao descobrir a conversão da filha, o próprio pai a entregou às autoridades e, segundo o relato popular, foi atingido por um raio logo depois de executá-la. Por isso, Santa Bárbara é invocada como protetora contra tempestades, raios e mortes repentinas.</p>
    `
  },
  {
    id: 'jose-anchieta',
    nome: 'São José de Anchieta',
    wiki: 'José de Anchieta',
    categoria: ['grandes-santos'],
    festa: '06-09',
    resumo: 'O "Apóstolo do Brasil", missionário jesuíta que ajudou a fundar São Paulo.',
    texto: `
      <p>Nascido nas Ilhas Canárias, José de Anchieta chegou ainda jovem ao Brasil como missionário jesuíta, dedicando-se de corpo e alma à evangelização dos povos indígenas. Aprendeu a língua tupi com tanta profundidade que escreveu sua primeira gramática, além de catecismos, poemas e peças de teatro para ensinar a fé.</p>
      <p>Participou da fundação do Colégio de São Paulo de Piratininga, origem da cidade de São Paulo, e ajudou a selar a paz entre portugueses e índios tamoios, oferecendo-se como refém. Foi canonizado em 2014 pelo Papa Francisco, tornando-se um dos grandes símbolos da fé no Brasil colonial.</p>
    `
  },
  {
    id: 'madre-paulina',
    nome: 'Santa Paulina do Coração Agonizante de Jesus',
    wiki: 'Madre Paulina',
    categoria: ['grandes-santos'],
    festa: '07-09',
    resumo: 'Imigrante italiana que se tornou a primeira pessoa ligada ao Brasil a ser canonizada.',
    texto: `
      <p>Amábile Lúcia Visintainer nasceu na Itália e emigrou ainda criança para Santa Catarina, no sul do Brasil, com sua família. Desde jovem sentiu o chamado para cuidar dos mais pobres, começando a acolher doentes em um pequeno casebre ao lado de sua casa.</p>
      <p>Fundou a Congregação das Irmãzinhas da Imaculada Conceição, adotando o nome de Madre Paulina, e mais tarde expandiu sua obra para São Paulo, cuidando de doentes, órfãos e ex-escravizados. Foi canonizada em 2002, tornando-se a primeira pessoa com vínculo direto ao Brasil elevada aos altares.</p>
    `
  },
  {
    id: 'edith-stein',
    nome: 'Santa Teresa Benedita da Cruz (Edith Stein)',
    wiki: 'Edith Stein',
    categoria: ['grandes-santos'],
    festa: '08-09',
    resumo: 'Filósofa judia convertida ao catolicismo, morta em Auschwitz por ser cristã e judia.',
    texto: `
      <p>Nascida em uma família judia praticante na Alemanha, Edith Stein tornou-se uma brilhante filósofa, discípula do fenomenólogo Edmund Husserl. Após anos de busca intelectual, a leitura da autobiografia de Santa Teresa de Ávila, numa única noite, mudou completamente o rumo de sua vida: converteu-se ao catolicismo.</p>
      <p>Entrou para o Carmelo, adotando o nome de Teresa Benedita da Cruz, mas, com a perseguição nazista aos judeus, foi presa junto com sua irmã e deportada para o campo de extermínio de Auschwitz, onde morreu em 1942. É reconhecida como mártir e copadroeira da Europa.</p>
    `
  },
  {
    id: 'joao-bosco',
    nome: 'São João Bosco',
    wiki: 'João Bosco',
    categoria: ['grandes-santos'],
    festa: '01-31',
    resumo: 'O "pai e mestre da juventude", que dedicou a vida à educação dos jovens pobres.',
    texto: `
      <p>Criado em uma família humilde do Piemonte italiano, João Bosco conheceu de perto a pobreza e a falta de oportunidades dos jovens de sua época. Já padre, começou a reunir meninos de rua para brincar, estudar e rezar, num projeto que ficou conhecido como Oratório.</p>
      <p>Fundou a Sociedade Salesiana, dedicada à educação e evangelização da juventude através de um método baseado na razão, na religião e na bondade amorosa — o chamado "sistema preventivo". Foi mentor espiritual de jovens santos, como Domingos Sávio, e deixou um legado educativo presente em escolas salesianas no mundo inteiro.</p>
    `
  },
  {
    id: 'frei-galvao',
    nome: 'Santo Antônio de Sant\'Ana Galvão (Frei Galvão)',
    wiki: 'Frei Galvão',
    categoria: ['grandes-santos'],
    festa: '10-25',
    resumo: 'O primeiro santo nascido em solo brasileiro, famoso por suas pílulas de papel com orações.',
    texto: `
      <p>Nascido em Guaratinguetá, no interior de São Paulo, Frei Galvão ingressou na Ordem Franciscana e viveu a maior parte de sua vida dedicado à oração, à construção e à direção espiritual em São Paulo. Fundou o Recolhimento de Nossa Senhora da Luz, hoje o Mosteiro da Luz.</p>
      <p>Ficou conhecido por escrever à mão pequenas orações em tiras de papel, entregues aos fiéis como as célebres "pílulas de Frei Galvão", ainda hoje distribuídas e associadas a curas e graças. Canonizado em 2007, tornou-se o primeiro santo nascido em terras brasileiras.</p>
    `
  },

  // ---------------- SANTOS JOVENS ----------------
  {
    id: 'teresinha',
    nome: 'Santa Teresinha do Menino Jesus',
    wiki: 'Teresa de Lisieux',
    categoria: ['santos-jovens', 'doutores', 'grandes-santos'],
    festa: '10-01',
    resumo: 'A jovem carmelita que ensinou o mundo a alcançar o céu através da sua "Pequena Via".',
    texto: `
      <p>Entrou para o Carmelo muito jovem e desenvolveu a "Pequena Via": fazer as coisas simples do dia a dia com extraordinário amor. Faleceu em 1897 aos 24 anos, deixando sua autobiografia "História de uma Alma" e sendo depois declarada Doutora da Igreja.</p>
      <p>Caçula de nove irmãos, perdeu a mãe aos quatro anos e foi criada pelas irmãs mais velhas, que uma a uma também entraram para a vida religiosa. Obteve, com insistência extraordinária para sua idade, permissão especial do próprio Papa Leão XIII para entrar no Carmelo ainda aos quinze anos. Viveu uma vida oculta e simples dentro do convento, oferecendo cada pequeno gesto como oferta de amor a Deus, ensinando que não é preciso feitos grandiosos para alcançar a santidade. Morreu de tuberculose ainda jovem, prometendo "passar o céu fazendo o bem na terra".</p>
    `
  },
  {
    id: 'clara-assis',
    nome: 'Santa Clara de Assis',
    wiki: 'Clara de Assis',
    categoria: ['santos-jovens', 'grandes-santos'],
    festa: '08-11',
    resumo: 'A "plantinha de São Francisco" que fundou a ordem das Clarissas com radical amor à pobreza.',
    texto: `
      <p>Seguidora fiel de São Francisco, fugiu de casa para consagrar sua vida a Deus na absoluta pobreza, fundando a Ordem das Clarissas e protegendo seu convento com a imensa força espiritual do Santíssimo Sacramento.</p>
      <p>Nascida em família nobre de Assis, ouviu Francisco pregar ainda adolescente e decidiu, aos dezoito anos, fugir de casa numa noite para se juntar a ele, cortando os próprios cabelos diante do altar como sinal de consagração. Resistiu à fúria da família, que tentou arrastá-la de volta à força, e fundou o ramo feminino do movimento franciscano. Há um episódio famoso em que, com o convento cercado por soldados sarracenos, ela se ergueu à porta segurando a hóstia consagrada — e o exército, tomado de temor, recuou. Foi a primeira mulher da história a escrever uma regra religiosa para outras mulheres.</p>
    `
  },
  {
    id: 'carlo-acutis',
    nome: 'São Carlo Acutis',
    wiki: 'Carlo Acutis',
    categoria: ['santos-jovens', 'grandes-santos'],
    festa: '10-12',
    resumo: 'O jovem padroeiro da internet, apaixonado pela Eucaristia e pela tecnologia.',
    texto: `
      <h2>O Padroeiro da Internet e do Amor à Eucaristia</h2>
      <p>Desde cedo, Carlo demonstrou uma fé intensa, participando diariamente da missa. Era um garoto comum que adorava videogames e programação. Usou sua paixão pela tecnologia para criar um site catalogando milagres eucarísticos. Partiu aos 15 anos de leucemia, oferecendo seus sofrimentos à Igreja.</p>
      <p>Foi canonizado em 7 de setembro de 2025 pelo Papa Leão XIV, ao lado de São Pier Giorgio Frassati, tornando-se um dos primeiros santos nascidos na década de 1990. Sua festa, celebrada em 12 de outubro — data de sua morte —, coincide no Brasil com o dia de Nossa Senhora Aparecida, padroeira do país, uma coincidência que muitos devotos brasileiros consideram cheia de significado.</p>
    `
  },
  {
    id: 'chiara-luce',
    nome: 'Beata Chiara Luce Badano',
    wiki: 'Chiara Badano',
    categoria: ['beatos', 'santos-jovens'],
    festa: '10-29',
    resumo: 'Uma jovem radiante que transformou a dor de um câncer terminal em prova de amor a Deus.',
    texto: `
      <p>Chiara nasceu na Itália em 1971. Aos 16 anos, foi diagnosticada com um câncer ósseo agressivo. Em vez de se revoltar, acolheu a cruz com a frase: "Se é isso que Tu queres, Jesus, eu também quero". Faleceu aos 18 anos, deixando um testemunho de alegria inabalável.</p>
      <p>Antes da doença, era uma adolescente comum, apaixonada por tênis e dança, envolvida desde criança no Movimento dos Focolares. Ao sentir uma dor nas costas que revelou o tumor, recusou doses de morfina que a deixassem sonolenta, dizendo que queria viver conscientemente cada instante que lhe restava. Recebia amigos e outros jovens doentes com um sorriso constante, tornando-se conhecida por sua serenidade diante da dor. Foi beatificada em 2010, um dos rostos mais próximos de santidade para a juventude contemporânea.</p>
    `
  },
  {
    id: 'pier-giorgio',
    nome: 'São Pier Giorgio Frassati',
    wiki: 'Pier Giorgio Frassati',
    categoria: ['santos-jovens', 'grandes-santos'],
    festa: '07-04',
    resumo: 'Jovem montanhista que dedicou sua vida e recursos aos pobres e doentes de Turim.',
    texto: `
      <p>Nascido em uma família rica, Pier Giorgio destacou-se por sua enorme alegria, paixão pelo montanhismo e profundo engajamento social. Distribuía suas economias secretamente aos necessitados, até contrair poliomielite e falecer aos 24 anos.</p>
      <p>Foi canonizado em 7 de setembro de 2025 pelo Papa Leão XIV, na mesma cerimônia de São Carlo Acutis — os dois patronos da Jornada Mundial da Juventude de Lisboa 2023 elevados juntos aos altares, como modelos de santidade "da rua" para os jovens de hoje.</p>
    `
  },
  {
    id: 'domingos-savio',
    nome: 'São Domingos Sávio',
    wiki: 'Domingos Sávio',
    categoria: ['santos-jovens'],
    festa: '05-06',
    resumo: 'Aluno de Dom Bosco, um dos santos não-mártires mais jovens já canonizados.',
    texto: `
      <p>Filho de um humilde ferreiro do Piemonte italiano, Domingos foi levado ainda menino para estudar no Oratório de Dom Bosco, que logo reconheceu nele uma santidade fora do comum. Levava a sério cada gesto do dia a dia, buscando sempre alegrar os colegas e ajudar quem precisava.</p>
      <p>Fundou entre os colegas a "Companhia da Imaculada Conceição", incentivando outros jovens a viverem a fé com naturalidade e alegria. Morreu aos 14 anos, em 1857, e tornou-se um símbolo de que a santidade também é possível na infância e na adolescência.</p>
    `
  },
  {
    id: 'maria-goretti',
    nome: 'Santa Maria Goretti',
    wiki: 'Maria Goretti',
    categoria: ['santos-jovens'],
    festa: '07-06',
    resumo: 'Jovem camponesa italiana que perdoou, ainda em vida, quem atentou contra ela.',
    texto: `
      <p>Filha de camponeses muito pobres do interior da Itália, Maria cresceu ajudando a cuidar dos irmãos mais novos após a morte do pai. Aos 11 anos, resistiu bravamente a uma agressão de um vizinho, sendo golpeada várias vezes por se recusar a ceder.</p>
      <p>Antes de morrer, no hospital, perdoou explicitamente seu agressor e expressou o desejo de reencontrá-lo um dia no Céu. Anos depois, já arrependido, ele participou pessoalmente da cerimônia de canonização de Maria, em 1950. É a padroeira dos jovens e da pureza de vida.</p>
    `
  },
  {
    id: 'jose-sanchez-rio',
    nome: 'São José Sánchez del Río',
    wiki: 'José Luís Sánchez Del Río',
    categoria: ['santos-jovens'],
    festa: '02-10',
    resumo: 'O menino mexicano que preferiu morrer a negar sua fé, gritando "Viva Cristo Rei!".',
    texto: `
      <p>Durante a violenta perseguição religiosa vivida no México na década de 1920, o adolescente José pediu insistentemente para se alistar entre os cristeros, leigos que resistiam às leis que proibiam o culto católico. Capturado em combate aos 14 anos, foi torturado para que renegasse a fé e revelasse informações.</p>
      <p>Recusou-se terminantemente, respondendo aos carrascos apenas com orações e o grito "Viva Cristo Rei!". Foi morto a facadas e, por fim, a tiros, em fevereiro de 1928. Canonizado em 2016, é hoje padroeiro dos coroinhas e um símbolo da fidelidade juvenil à fé.</p>
    `
  },
  {
    id: 'kateri-tekakwitha',
    nome: 'Santa Kateri Tekakwitha',
    wiki: 'Kateri Tekakwitha',
    categoria: ['santos-jovens'],
    festa: '07-14',
    resumo: 'O "Lírio dos Mohawks", primeira indígena norte-americana canonizada.',
    texto: `
      <p>Filha de um chefe mohawk e de uma mãe algonquina cristã, Kateri sobreviveu ainda bebê a uma epidemia de varíola que a deixou com o rosto marcado e a visão fragilizada, além de matar seus pais. Cresceu entre parentes que se opunham fortemente à sua conversão ao cristianismo.</p>
      <p>Apesar da perseguição da própria comunidade, consagrou-se a Deus e dedicou-se a uma vida de intensa oração e penitência, sendo apelidada "Lírio dos Mohawks" por sua pureza. Testemunhas relataram que, ao morrer, as marcas de varíola em seu rosto desapareceram. Foi canonizada em 2012, tornando-se a primeira santa indígena da América do Norte.</p>
    `
  },
  {
    id: 'pastorinhos-fatima',
    nome: 'Francisco e Jacinta Marto',
    wiki: 'Jacinta Marto',
    categoria: ['santos-jovens'],
    festa: '02-20',
    resumo: 'Os pastorinhos de Fátima, testemunhas das aparições de Nossa Senhora em 1917.',
    texto: `
      <p>Irmãos pastores em Fátima, Portugal, Francisco e Jacinta, junto com a prima Lúcia, testemunharam em 1917 as aparições de Nossa Senhora na Cova da Iria, recebendo dela mensagens de oração, penitência e conversão que rapidamente se espalharam por Portugal e pelo mundo.</p>
      <p>Após as aparições, os dois irmãos ofereceram com generosidade seus pequenos sacrifícios diários por amor a Deus e aos pecadores, vivendo com intensa vida de oração. Morreram ainda crianças, vítimas da pandemia de gripe espanhola de 1918-1920, tornando-se, em 2017, os santos não-mártires mais jovens da história da Igreja.</p>
    `
  },
  {
    id: 'laura-vicuna',
    nome: 'Beata Laura Vicuña',
    wiki: 'Laura Vicuña',
    categoria: ['beatos', 'santos-jovens'],
    festa: '01-22',
    resumo: 'Jovem chilena que ofereceu a própria vida pela conversão de sua mãe.',
    texto: `
      <p>Nascida no Chile e criada na Argentina após a morte do pai, Laura viu de perto o sofrimento de sua mãe em um relacionamento abusivo. Educada por religiosas salesianas, tomou como modelo de vida o jovem Domingos Sávio, mesmo antes de sua canonização.</p>
      <p>Diante da impossibilidade de mudar a situação familiar por outros meios, ofereceu a Deus a própria vida em sacrifício pela conversão de sua mãe. Adoeceu gravemente e morreu aos 12 anos, tendo obtido, segundo relatos, a reconciliação de sua mãe com a fé pouco antes de partir. Foi beatificada em 1988.</p>
    `
  },

  // ---------------- BEATOS ----------------
  {
    id: 'solanus-casey',
    nome: 'Beato Solanus Casey',
    wiki: 'Solanus Casey',
    categoria: ['beatos'],
    festa: '07-30',
    resumo: 'Frade capuchinho americano, conhecido por sua simplicidade e dom de cura.',
    texto: `
      <p>Filho de imigrantes irlandeses nos Estados Unidos, Solanus teve dificuldades nos estudos e, por isso, jamais foi autorizado a pregar ou ouvir confissões como padre comum. Tornou-se então "padre porteiro" de seu convento em Detroit, recebendo os visitantes que ali chegavam.</p>
      <p>Foi justamente nessa função aparentemente simples que floresceu sua santidade: milhares de pessoas o procuravam em busca de conselho, consolo e oração pelos doentes, muitos relatando curas inexplicáveis. Abriu também uma cozinha comunitária para alimentar os mais pobres durante a Grande Depressão. Foi beatificado em 2017.</p>
    `
  },
  {
    id: 'miguel-pro',
    nome: 'Beato Miguel Pro',
    wiki: 'Miguel Pro',
    categoria: ['beatos'],
    festa: '11-23',
    resumo: 'Padre jesuíta mexicano, executado sem julgamento durante a perseguição religiosa.',
    texto: `
      <p>Ordenado padre jesuíta em meio à violenta perseguição anticlerical no México, Miguel Pro exercia seu ministério clandestinamente, disfarçando-se das mais variadas formas para celebrar missas, batizados e confissões sem ser descoberto pelas autoridades — muitas vezes com bom humor apesar do perigo constante.</p>
      <p>Acusado injustamente de um atentado que não cometeu, foi condenado à morte sem julgamento formal. Diante do pelotão de fuzilamento, recusou a venda nos olhos, abriu os braços em forma de cruz e gritou "Viva Cristo Rei!" no instante de sua morte, em 1927. Foi beatificado em 1988.</p>
    `
  }
];

// ============================================================
//  INTRODUÇÃO — "Estrela da Luz"
// ============================================================
// Sequência curta e orquestrada (brilho → estrela → raios →
// nome → clarão), que respeita quem prefere menos animação
// (prefers-reduced-motion) e pode ser pulada a qualquer
// momento com um toque na tela.
(function iniciarIntro() {
  const introScreen = document.getElementById('intro-screen');
  if (!introScreen) return;

  const prefereMenosMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let introEncerrada = false;

  if (prefereMenosMovimento) {
    introScreen.style.display = 'none';
    return;
  }

  // Céu estrelado: pontinhos de luz cintilando ao fundo, que dão
  // profundidade à cena antes da estrela nascer no centro.
  const ceu = document.getElementById('intro-sky');
  if (ceu) {
    const fragmento = document.createDocumentFragment();
    const quantidade = 26;
    for (let i = 0; i < quantidade; i++) {
      const ponto = document.createElement('div');
      ponto.className = 'intro-star-dot';
      const tamanho = (Math.random() * 1.8 + 0.8).toFixed(1);
      ponto.style.top = `${(Math.random() * 100).toFixed(1)}%`;
      ponto.style.left = `${(Math.random() * 100).toFixed(1)}%`;
      ponto.style.width = `${tamanho}px`;
      ponto.style.height = `${tamanho}px`;
      ponto.style.animationDelay = `${(Math.random() * 2.6).toFixed(2)}s`;
      ponto.style.animationDuration = `${(Math.random() * 1.6 + 1.8).toFixed(2)}s`;
      fragmento.appendChild(ponto);
    }
    ceu.appendChild(fragmento);
  }

  // Luzes convergentes: nascem espalhadas pela tela e "viajam" até
  // o centro, como se a luz dos santos se reunisse para formar a
  // estrela que guia — a ideia por trás do próprio nome do site.
  const convergencia = document.getElementById('intro-converge');
  if (convergencia) {
    const fragmento2 = document.createDocumentFragment();
    const quantidadeLuzes = 6;
    for (let i = 0; i < quantidadeLuzes; i++) {
      const angulo = (360 / quantidadeLuzes) * i + (Math.random() * 25 - 12);
      const distancia = 38 + Math.random() * 14; // % da tela a partir do centro
      const dx = (Math.cos(angulo * Math.PI / 180) * distancia).toFixed(1);
      const dy = (Math.sin(angulo * Math.PI / 180) * distancia).toFixed(1);
      const luz = document.createElement('div');
      luz.className = 'intro-converging-light';
      luz.style.setProperty('--dx', `${dx}vmin`);
      luz.style.setProperty('--dy', `${dy}vmin`);
      luz.style.animationDelay = `${(Math.random() * 0.25).toFixed(2)}s`;
      fragmento2.appendChild(luz);
    }
    convergencia.appendChild(fragmento2);
  }

  function encerrarIntro() {
    if (introEncerrada) return;
    introEncerrada = true;
    introScreen.classList.add('fade-out');
    setTimeout(() => {
      introScreen.style.display = 'none';
    }, 850);
  }

  introScreen.addEventListener('click', encerrarIntro);
  window.addEventListener('load', () => {
    setTimeout(encerrarIntro, 2900);
  });
})();

// ============================================================
//  BUSCA DE IMAGENS (Wikipédia em português)
// ============================================================
// Meta: nenhum santo sem foto. Em vez de confiar cegamente no
// título salvo em "wiki" (que pode estar levemente errado, ou
// cair numa página de desambiguação, como acontecia com nomes
// comuns como "São Sebastião" ou "São Cristóvão"), a busca
// tenta em até três camadas, sempre nessa ordem:
//   1) o título indicado em "wiki" (ou o nome limpo do santo);
//   2) se falhar, pergunta à própria Wikipédia qual é o título
//      mais parecido (corrige erros de digitação e redirects);
//   3) se ainda falhar, tenta de novo a partir do nome completo
//      exibido no site.
// O resultado de cada santo é guardado em cache, então cada um
// só é consultado uma vez, mesmo aparecendo em vários lugares
// (grade, Santo do Dia, busca).
const cacheImagens = {};

function nomeSemTitulo(santo) {
  return santo.nome.replace(/^(São|Santa|Santo|Beato|Beata|Papa)\s+/i, '').trim();
}

async function resumoWiki(titulo) {
  if (!titulo) return null;
  try {
    const url = `https://pt.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(titulo)}`;
    const resp = await fetch(url);
    if (!resp.ok) return null;
    const dados = await resp.json();
    if (dados.type === 'disambiguation') return null; // página de desambiguação não tem foto útil
    return dados.thumbnail ? dados.thumbnail.source : null;
  } catch (e) {
    return null;
  }
}

async function titulosProximosWiki(termo) {
  if (!termo) return [];
  try {
    const url = `https://pt.wikipedia.org/w/api.php?action=opensearch&search=${encodeURIComponent(termo)}&limit=3&namespace=0&format=json&origin=*`;
    const resp = await fetch(url);
    if (!resp.ok) return [];
    const dados = await resp.json();
    return Array.isArray(dados[1]) ? dados[1] : [];
  } catch (e) {
    return [];
  }
}

async function buscarImagemSanto(santo) {
  if (santo.imgUrl) return santo.imgUrl;
  if (cacheImagens[santo.id] !== undefined) return cacheImagens[santo.id];

  const termoPrincipal = santo.wiki || nomeSemTitulo(santo);
  const nomeLimpo = nomeSemTitulo(santo);
  let imagem = null;

  // 1) tentativa direta com o título indicado
  imagem = await resumoWiki(termoPrincipal);

  // 2) pergunta à Wikipédia quais são os títulos mais parecidos
  //    e tenta cada um deles (corrige redirects, desambiguação
  //    e pequenos erros de digitação sozinho)
  if (!imagem) {
    const candidatos = await titulosProximosWiki(termoPrincipal);
    for (const candidato of candidatos) {
      if (candidato && candidato !== termoPrincipal) {
        imagem = await resumoWiki(candidato);
        if (imagem) break;
      }
    }
  }

  // 3) última tentativa, a partir do nome completo exibido no site
  if (!imagem && nomeLimpo && nomeLimpo !== termoPrincipal) {
    const candidatos2 = await titulosProximosWiki(nomeLimpo);
    for (const candidato of candidatos2) {
      if (candidato) {
        imagem = await resumoWiki(candidato);
        if (imagem) break;
      }
    }
  }

  cacheImagens[santo.id] = imagem;
  return imagem;
}

// ============================================================
//  REFERÊNCIAS DO DOM
// ============================================================
const cardsGrid = document.getElementById('cards-grid');
const filterBtns = document.querySelectorAll('.filter-btn');
const viewHome = document.getElementById('view-home');
const viewDetail = document.getElementById('view-detail');
const bioArticle = document.getElementById('bio-article');
const btnBack = document.getElementById('btn-back');
const navbar = document.getElementById('navbar');
const overlay = document.getElementById('overlay');

const menuBtn = document.getElementById('menu-btn');
const closeMenuBtn = document.getElementById('close-menu-btn');
const sidebar = document.getElementById('sidebar');

const searchBtn = document.getElementById('search-btn');
const searchModal = document.getElementById('search-modal');
const closeSearchBtn = document.getElementById('close-search-btn');
const searchInput = document.getElementById('search-input');
const searchResults = document.getElementById('search-results');
const bioContainer = document.getElementById('bio-container');

const themeBtn = document.getElementById('theme-btn');
const btnShare = document.getElementById('btn-share');

const aiBtn = document.getElementById('ai-btn');
const aiModal = document.getElementById('ai-modal');
const closeAiBtn = document.getElementById('close-ai-btn');
const aiInput = document.getElementById('ai-input');
const aiCopyBtn = document.getElementById('ai-copy-btn');
const aiFeedback = document.getElementById('ai-feedback');
const aiResposta = document.getElementById('ai-resposta');

themeBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});

// ============================================================
//  PERGUNTAR A UMA IA
// ============================================================
// A IA roda "por fora" do código do site: quem responde é uma
// Edge Function do Supabase, que guarda a chave da IA em
// segredo no servidor (nunca no navegador da pessoa) e só
// aceita perguntas sobre santos, beatos, doutores da Igreja e
// anjos — qualquer outro assunto é recusado pela própria IA,
// por instrução no "system prompt" dela.
//
// Enquanto a linha abaixo não estiver configurada — ou se a
// função cair por qualquer motivo — o site cai sozinho no modo
// seguro: copia a pergunta para colar em qualquer IA que a
// pessoa já usa.
//
// ██████████████████████████████████████████████████████████
// ███  COLOQUE SUAS CREDENCIAIS AQUI (só esta linha)       ███
// ███  Troque pela URL real da SUA Edge Function do        ███
// ███  Supabase — você a encontra no painel do Supabase em ███
// ███  Edge Functions → perguntar-sobre-santo, algo como:  ███
// ███  https://abcdefgh.supabase.co/functions/v1/...       ███
// ███  (A chave da Anthropic NÃO entra aqui — ela vai como ███
// ███  "Secret" dentro do próprio Supabase, nunca em um     ███
// ███  arquivo do site. Veja o passo a passo completo em    ███
// ███  CONFIGURAR-IA.md)                                    ███
// ██████████████████████████████████████████████████████████
const AI_FUNCTION_URL = '';
// ██████████████████████████████████████████████████████████

function gerarPerguntaIA(nomeSanto) {
  return `Me conte sobre ${nomeSanto}: sua vida, sua fé, seus milagres (se houver) e sua importância para a Igreja Católica.`;
}

function abrirModalIA(nomePreenchido) {
  aiInput.value = nomePreenchido || '';
  aiFeedback.textContent = '';
  aiResposta.style.display = 'none';
  aiResposta.textContent = '';
  aiModal.classList.add('active');
  setTimeout(() => aiInput.focus(), 100);
}

function fecharModalIA() {
  aiModal.classList.remove('active');
}

async function copiarComoReserva(pergunta, motivo) {
  try {
    await navigator.clipboard.writeText(pergunta);
    aiFeedback.textContent = `${motivo} Copiei a pergunta — cole na sua IA favorita.`;
  } catch (e) {
    aiFeedback.textContent = pergunta;
  }
}

async function perguntarIA() {
  const nome = aiInput.value.trim();
  if (!nome) {
    aiFeedback.textContent = 'Digite o nome de um santo primeiro.';
    aiInput.focus();
    return;
  }

  const pergunta = gerarPerguntaIA(nome);
  aiFeedback.textContent = '';
  aiResposta.style.display = 'none';
  aiResposta.textContent = '';

  // Ainda não configurado: nem tenta, já usa o modo seguro
  if (!AI_FUNCTION_URL || AI_FUNCTION_URL.includes('SEU-PROJETO')) {
    await copiarComoReserva(pergunta, 'A IA embutida ainda não foi configurada.');
    return;
  }

  aiCopyBtn.disabled = true;
  const textoOriginalBtn = aiCopyBtn.textContent;
  aiCopyBtn.textContent = 'Perguntando...';

  try {
    const resp = await fetch(AI_FUNCTION_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pergunta }),
    });

    const dados = await resp.json().catch(() => null);

    if (!resp.ok || !dados || !dados.resposta) {
      const mensagemErro = dados && dados.erro ? dados.erro : null;
      if (mensagemErro) {
        aiFeedback.textContent = mensagemErro;
      } else {
        await copiarComoReserva(pergunta, 'Não consegui falar com a IA agora.');
      }
      return;
    }

    aiResposta.textContent = dados.resposta;
    aiResposta.style.display = 'block';
  } catch (e) {
    await copiarComoReserva(pergunta, 'Não consegui falar com a IA agora.');
  } finally {
    aiCopyBtn.disabled = false;
    aiCopyBtn.textContent = textoOriginalBtn;
  }
}

if (aiBtn) {
  aiBtn.addEventListener('click', () => abrirModalIA());
  closeAiBtn.addEventListener('click', fecharModalIA);
  aiCopyBtn.addEventListener('click', perguntarIA);
  aiInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') perguntarIA();
  });
}

// ============================================================
//  REVELAÇÃO SUAVE AO ROLAR A PÁGINA
// ============================================================
function iniciarRevelacaoAoRolar() {
  const prefereMenosMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const alvos = document.querySelectorAll('.reveal-on-scroll');

  if (prefereMenosMovimento || !('IntersectionObserver' in window)) {
    alvos.forEach(el => el.classList.add('revealed'));
    return;
  }

  const observador = new IntersectionObserver((entradas) => {
    entradas.forEach(entrada => {
      if (entrada.isIntersecting) {
        entrada.target.classList.add('revealed');
        observador.unobserve(entrada.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  alvos.forEach(el => observador.observe(el));
}

// ============================================================
//  CHUVA DE METEOROS (efeito ambiente de fundo)
// ============================================================
// Estrelas cadentes brancas ou douradas cruzando o fundo do site
// inteiro, de tempos em tempos, atrás de todo o conteúdo. Some
// sozinho para quem prefere menos movimento na tela.
function iniciarChuvaDeMeteoros() {
  const camada = document.getElementById('meteor-layer');
  if (!camada) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  function criarMeteoro() {
    const meteoro = document.createElement('div');
    const cor = Math.random() < 0.65 ? 'gold' : 'white'; // predomina dourado, combinando com o site
    meteoro.className = `meteor ${cor}`;

    const inicioX = (Math.random() * 90).toFixed(1);   // vw — nasce em qualquer ponto horizontal
    const inicioY = (Math.random() * 45).toFixed(1);   // vh — principalmente no terço/metade de cima
    const angulo = (20 + Math.random() * 25).toFixed(1); // graus — sempre descendo pra direita
    const distancia = (60 + Math.random() * 40).toFixed(0); // vmax percorridos até sumir

    meteoro.style.left = `${inicioX}vw`;
    meteoro.style.top = `${inicioY}vh`;
    meteoro.style.setProperty('--ang', `${angulo}deg`);
    meteoro.style.setProperty('--dist', `${distancia}vmax`);

    const duracao = (1.4 + Math.random() * 1.3).toFixed(2);
    meteoro.style.animationDuration = `${duracao}s`;

    camada.appendChild(meteoro);
    setTimeout(() => meteoro.remove(), duracao * 1000 + 200);
  }

  function agendarProximoMeteoro() {
    const espera = 1800 + Math.random() * 4200; // entre 1.8s e 6s
    setTimeout(() => {
      criarMeteoro();
      // De vez em quando, dois quase juntos, como numa chuva de verdade
      if (Math.random() < 0.25) {
        setTimeout(criarMeteoro, 250 + Math.random() * 400);
      }
      agendarProximoMeteoro();
    }, espera);
  }

  agendarProximoMeteoro();
}

// ============================================================
//  SANTO DO DIA
// ============================================================
// Verifica se algum santo do catálogo tem festa litúrgica
// hoje — usando o dia e o mês do relógio LOCAL de quem está
// vendo a página (por isso o site já sabe, sozinho, se hoje é
// dia 26 ou qualquer outro dia, sem depender de fuso horário
// de servidor). Se houver um santo com festa exata, ele é
// destacado. Se não houver nenhum na data exata, a seção nunca
// fica vazia: um santo é destacado de forma rotativa (baseada
// no dia do ano), para sempre convidar à descoberta de uma nova
// história.
function getSantoDoDia() {
  const hoje = new Date();
  const mm = String(hoje.getMonth() + 1).padStart(2, '0');
  const dd = String(hoje.getDate()).padStart(2, '0');
  const chaveHoje = `${mm}-${dd}`;

  const celebradosHoje = santosData.filter(s => s.festa === chaveHoje);
  if (celebradosHoje.length > 0) {
    return { santo: celebradosHoje[0], oficial: true };
  }

  const inicioDoAno = new Date(hoje.getFullYear(), 0, 0);
  const diaDoAno = Math.floor((hoje - inicioDoAno) / 86400000);
  const indice = diaDoAno % santosData.length;
  return { santo: santosData[indice], oficial: false };
}

function renderSantoDoDia() {
  const container = document.getElementById('santo-do-dia');
  if (!container) return;

  const { santo, oficial } = getSantoDoDia();
  const dataFormatada = new Date().toLocaleDateString('pt-BR', { day: 'numeric', month: 'long' });
  const rotulo = oficial ? `Hoje, ${dataFormatada}, a Igreja celebra` : 'Santo em destaque hoje';

  container.innerHTML = `
    <div class="sdd-card" id="sdd-card" role="button" tabindex="0" aria-label="Ver a história de ${santo.nome}">
      <span class="sdd-label">${rotulo}</span>
      <div class="sdd-body">
        <div class="sdd-img-wrapper" id="sdd-img-wrapper">
          <svg class="card-img-placeholder" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><use href="#icon-aureola"></use></svg>
        </div>
        <div class="sdd-info">
          <h3 class="sdd-nome">${santo.nome}</h3>
          <p class="sdd-resumo">${santo.resumo}</p>
          <span class="sdd-cta">Conhecer a história →</span>
        </div>
      </div>
    </div>
  `;

  const card = document.getElementById('sdd-card');
  card.addEventListener('click', () => showDetail(santo.id));
  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      showDetail(santo.id);
    }
  });

  buscarImagemSanto(santo).then(imgUrl => {
    const wrapper = document.getElementById('sdd-img-wrapper');
    if (imgUrl && wrapper) {
      wrapper.innerHTML = `<img src="${imgUrl}" alt="${santo.nome}" class="card-img" loading="lazy">`;
    }
  });
}

// Calendário inteligente: o Santo do Dia se atualiza sozinho
// quando a data muda, sem precisar recarregar a página — sempre
// respeitando o relógio de 24 horas de quem está vendo o site
// (o horário LOCAL do aparelho da pessoa, não um horário fixo de
// servidor). Isso garante que a virada aconteça exatamente à
// meia-noite local, seja em qual fuso horário for.
//
// Duas camadas trabalham juntas:
//   1) um alarme exato, agendado para o instante preciso da
//      próxima meia-noite local, que troca o santo na hora certa
//      e já se reagenda para a meia-noite seguinte;
//   2) uma checagem simples a cada minuto, mais o retorno à aba
//      depois de um tempo em segundo plano — uma rede de segurança
//      caso o navegador atrase o alarme (o que pode acontecer com
//      abas em segundo plano por muito tempo).
let ultimoDiaExibido = new Date().toDateString();

function verificarViradaDoDia() {
  const diaAgora = new Date().toDateString();
  if (diaAgora !== ultimoDiaExibido) {
    ultimoDiaExibido = diaAgora;
    renderSantoDoDia();
  }
}

function agendarProximaMeiaNoite() {
  const agora = new Date();
  const proximaMeiaNoite = new Date(
    agora.getFullYear(), agora.getMonth(), agora.getDate() + 1,
    0, 0, 1, 0 // 00:00:01 — um segundo de folga para já estar no dia novo
  );
  const esperaMs = proximaMeiaNoite - agora;

  setTimeout(() => {
    verificarViradaDoDia();
    agendarProximaMeiaNoite(); // reagenda para a meia-noite seguinte
  }, esperaMs);
}

agendarProximaMeiaNoite();
setInterval(verificarViradaDoDia, 60 * 1000);

document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible') {
    verificarViradaDoDia();
  }
});

// ============================================================
//  CATÁLOGO (GRADE DE CARTÕES)
// ============================================================
function renderGrid(filter = 'todos') {
  cardsGrid.innerHTML = '';

  const filtrados = santosData.filter(s => {
    if (filter === 'todos') return true;
    return s.categoria.includes(filter);
  });

  filtrados.forEach((santo, index) => {
    const card = document.createElement('div');
    card.className = 'card animate-card';
    card.style.animationDelay = `${index * 0.05}s`;
    card.onclick = () => showDetail(santo.id);

    card.innerHTML = `
      <div class="card-img-wrapper" id="img-wrapper-${santo.id}">
        <svg class="card-img-placeholder" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <use href="#icon-aureola"></use>
        </svg>
      </div>
      <div class="card-content">
        <h3 class="card-title">
          <svg class="card-icon" viewBox="0 0 24 24"><use href="#icon-aureola"></use></svg>
          ${santo.nome}
        </h3>
        <p class="card-desc">${santo.resumo}</p>
      </div>
    `;

    cardsGrid.appendChild(card);

    buscarImagemSanto(santo).then(imgUrl => {
      const wrapper = document.getElementById(`img-wrapper-${santo.id}`);
      if (imgUrl && wrapper) {
        wrapper.innerHTML = `<img src="${imgUrl}" alt="${santo.nome}" class="card-img" loading="lazy">`;
      }
    });
  });
}

function showDetail(id) {
  const santo = santosData.find(s => s.id === id);
  if (!santo) return;

  closeSidebar();
  closeSearch();
  bioContainer.classList.remove('animate-in');

  viewHome.classList.remove('active');
  setTimeout(() => {
    viewHome.style.display = 'none';
    viewDetail.style.display = 'block';

    bioArticle.innerHTML = `
      <div class="bio-header">
        <h2 class="bio-title">
          <svg viewBox="0 0 24 24" width="30" height="30" style="vertical-align: middle; margin-right:8px;"><use href="#icon-aureola"></use></svg>
          ${santo.nome}
        </h2>
      </div>
      <div class="bio-img-wrapper" id="bio-img-wrapper"></div>
      <div class="bio-text">
        ${santo.texto}
      </div>
      <button class="btn-ask-ai" id="btn-ask-ai-santo">
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3v4M12 17v4M3 12h4M17 12h4M6.34 6.34l2.83 2.83M14.83 14.83l2.83 2.83M17.66 6.34l-2.83 2.83M9.17 14.83l-2.83 2.83"/><circle cx="12" cy="12" r="2.2" fill="currentColor" stroke="none"/></svg>
        Perguntar mais a uma IA sobre ${santo.nome}
      </button>
    `;

    const btnAskAiSanto = document.getElementById('btn-ask-ai-santo');
    if (btnAskAiSanto) {
      btnAskAiSanto.addEventListener('click', () => abrirModalIA(santo.nome));
    }

    buscarImagemSanto(santo).then(imgUrl => {
      const bioImgWrapper = document.getElementById('bio-img-wrapper');
      if (imgUrl) {
        bioImgWrapper.innerHTML = `<img src="${imgUrl}" alt="${santo.nome}" class="bio-img">`;
      } else {
        bioImgWrapper.style.display = 'none';
      }
    });

    btnShare.onclick = () => {
      const shareData = {
        title: `Lumina Sancti - ${santo.nome}`,
        text: `Leia a inspiradora história de ${santo.nome} no Lumina Sancti!`,
        url: window.location.href,
      };
      if (navigator.share) {
        navigator.share(shareData).catch(console.error);
      } else {
        navigator.clipboard.writeText(`${shareData.title}: ${shareData.url}`);
        alert('Link copiado para a área de transferência!');
      }
    };

    setTimeout(() => {
      viewDetail.classList.add('active');
      bioContainer.classList.add('animate-in');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 50);

  }, 400);
}

btnBack.addEventListener('click', () => {
  viewDetail.classList.remove('active');
  bioContainer.classList.remove('animate-in');
  setTimeout(() => {
    viewDetail.style.display = 'none';
    viewHome.style.display = 'block';

    setTimeout(() => {
      viewHome.classList.add('active');
      document.getElementById('materias').scrollIntoView({ behavior: 'smooth' });
    }, 50);
  }, 400);
});

filterBtns.forEach(btn => {
  btn.addEventListener('click', (e) => {
    const filter = e.target.dataset.filter;

    filterBtns.forEach(b => b.classList.remove('active'));

    document.querySelectorAll(`[data-filter="${filter}"]`).forEach(b => {
      b.classList.add('active');
    });

    if (window.innerWidth < 768) {
      closeSidebar();
    }

    document.getElementById('materias').scrollIntoView({ behavior: 'smooth' });

    setTimeout(() => {
      renderGrid(filter);
    }, 100);
  });
});

function openSidebar() {
  sidebar.classList.add('open');
  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeSidebar() {
  sidebar.classList.remove('open');
  overlay.classList.remove('active');
  document.body.style.overflow = '';
}

menuBtn.addEventListener('click', openSidebar);
closeMenuBtn.addEventListener('click', closeSidebar);
overlay.addEventListener('click', () => {
  closeSidebar();
  closeSearch();
});

function openSearch() {
  searchModal.classList.add('active');
  searchInput.value = '';
  searchResults.innerHTML = '';
  setTimeout(() => searchInput.focus(), 100);
}

function closeSearch() {
  searchModal.classList.remove('active');
}

searchBtn.addEventListener('click', openSearch);
closeSearchBtn.addEventListener('click', closeSearch);

searchInput.addEventListener('input', (e) => {
  const query = e.target.value.toLowerCase().trim();
  searchResults.innerHTML = '';

  if (query.length < 2) return;

  const match = santosData.filter(s =>
    s.nome.toLowerCase().includes(query) || s.resumo.toLowerCase().includes(query)
  );

  if (match.length === 0) {
    searchResults.innerHTML = '<div class="not-found-msg">Nenhum santo ou beato encontrado.</div>';
    return;
  }

  match.forEach((santo, index) => {
    const item = document.createElement('div');
    item.className = 'search-result-item';
    item.style.animationDelay = `${index * 0.05}s`;
    item.innerHTML = `
      <div class="search-result-title">${santo.nome}</div>
      <div class="search-result-desc">${santo.resumo.substring(0, 70)}...</div>
    `;
    item.onclick = () => showDetail(santo.id);
    searchResults.appendChild(item);
  });
});

let lastScroll = 0;
window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  if (currentScroll > lastScroll && currentScroll > 80) {
    navbar.classList.add('hidden');
  } else {
    navbar.classList.remove('hidden');
  }
  lastScroll = currentScroll;
});

document.addEventListener('DOMContentLoaded', () => {
  renderGrid();
  renderSantoDoDia();
  iniciarRevelacaoAoRolar();
  iniciarChuvaDeMeteoros();
});