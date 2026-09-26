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
    wiki: 'Dom Bosco',
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
      <p>Caçula de nove irmãos, perdeu a mãe aos quatro anos e foi criada pelas irmãs mais velhas, que uma a uma também entraram para a vida religiosa. Com insistência extraordinária para sua idade, chegou a pedir pessoalmente ao Papa Leão XIII e obteve permissão especial para entrar no Carmelo ainda aos quinze anos. Viveu uma vida oculta e simples dentro do convento, oferecendo cada pequeno gesto como oferta de amor a Deus, ensinando que não é preciso feitos grandiosos para alcançar a santidade. Morreu de tuberculose ainda jovem, prometendo "passar o céu fazendo o bem na terra".</p>
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
      <p>Nascida em família nobre de Assis, ouviu Francisco pregar ainda adolescente e decidiu, aos dezoito anos, fugir de casa numa noite para se juntar a ele, tendo os cabelos cortados diante do altar como sinal de consagração. Resistiu à fúria da família, que tentou arrastá-la de volta à força, e fundou o ramo feminino do movimento franciscano. Há um episódio famoso em que, com o convento cercado por soldados sarracenos, ela se ergueu à porta segurando a hóstia consagrada — e o exército, tomado de temor, recuou. Foi a primeira mulher da história a escrever uma regra religiosa para outras mulheres.</p>
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
      <p>Antes da doença, era uma adolescente comum, apaixonada por tênis e dança, envolvida desde criança no Movimento dos Focolares. Uma dor no ombro, sentida numa partida de tênis, revelou o tumor. Durante o tratamento, recusou doses de morfina que a deixassem sonolenta, dizendo que queria viver conscientemente cada instante que lhe restava. Recebia amigos e outros jovens doentes com um sorriso constante, tornando-se conhecida por sua serenidade diante da dor. Foi beatificada em 2010, um dos rostos mais próximos de santidade para a juventude contemporânea.</p>
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
  },

  // ================================================================
  //  GRANDE EXPANSÃO DO CALENDÁRIO — para o Santo do Dia ter uma
  //  data real coberta na maior parte do ano, não só uma vez a cada
  //  tantos dias. Organizado por mês.
  // ================================================================

  // ---------------- JANEIRO ----------------
  {
    id: 'basilio-magno',
    nome: 'São Basílio Magno',
    wiki: 'Basílio de Cesareia',
    categoria: ['doutores'],
    festa: '01-02',
    resumo: 'Bispo grego que organizou a vida monástica oriental e defendeu a fé diante dos arianos.',
    texto: `<p>Um dos grandes Padres da Igreja do Oriente, Basílio organizou a vida monástica ao redor de comunidades dedicadas à oração e ao trabalho, além de fundar um enorme complexo de assistência aos pobres e doentes em Cesareia. Defendeu com firmeza a divindade de Cristo contra os arianos e é considerado Doutor da Igreja.</p>`
  },
  {
    id: 'isabel-ana-seton',
    nome: 'Santa Isabel Ana Seton',
    wiki: 'Elizabeth Ann Seton',
    categoria: ['grandes-santos'],
    festa: '01-04',
    resumo: 'Viúva americana que fundou as primeiras escolas paroquiais dos Estados Unidos.',
    texto: `<p>Nascida em uma família protestante de Nova York, converteu-se ao catolicismo após enviuvar jovem e com cinco filhos para criar. Fundou a primeira congregação de irmãs religiosas nascida nos Estados Unidos e organizou o sistema de escolas paroquiais católicas do país. Foi a primeira pessoa nascida nos Estados Unidos a ser canonizada.</p>`
  },
  {
    id: 'andre-bessette',
    nome: 'São André Bessette',
    wiki: 'André Bessette',
    categoria: ['grandes-santos'],
    festa: '01-06',
    resumo: 'Irmão leigo canadense, porteiro de convento conhecido por curas atribuídas à sua oração.',
    texto: `<p>De saúde frágil e pouca instrução, foi aceito como irmão leigo pela Congregação da Santa Cruz apenas para os serviços mais simples — passou décadas como porteiro de colégio. Sua fé simples e devoção a São José atraíam multidões em busca de cura, o que o levou a construir o Oratório de São José em Montreal, hoje um dos maiores santuários do mundo.</p>`
  },
  {
    id: 'raimundo-penafort',
    nome: 'São Raimundo de Peñafort',
    wiki: 'Raimundo de Penhafort',
    categoria: ['grandes-santos'],
    festa: '01-07',
    resumo: 'Frade dominicano espanhol que organizou o direito canônico da Igreja.',
    texto: `<p>Jurista de formação, entrou para os dominicanos já adulto e dedicou-se a organizar e sistematizar as leis da Igreja, produzindo uma coletânea de decretais que serviu de referência por séculos. Também se dedicou à conversão pacífica de muçulmanos e judeus na Espanha, incentivando o estudo de línguas para o diálogo.</p>`
  },
  {
    id: 'hilario-poitiers',
    nome: 'Santo Hilário de Poitiers',
    wiki: 'Hilário de Poitiers',
    categoria: ['doutores'],
    festa: '01-13',
    resumo: 'Bispo francês exilado por defender a divindade de Cristo contra o arianismo.',
    texto: `<p>Convertido do paganismo já adulto após estudar as Escrituras por conta própria, tornou-se bispo de Poitiers e um dos maiores defensores da fé em Cristo verdadeiro Deus, o que lhe custou anos de exílio imposto pelo imperador ariano Constâncio II. É considerado "Martelo dos Arianos" e Doutor da Igreja.</p>`
  },
  {
    id: 'antao-grande',
    nome: 'Santo Antão, o Grande',
    wiki: 'Antão, o Grande',
    categoria: ['grandes-santos'],
    festa: '01-17',
    resumo: 'O pai dos monges, que se retirou ao deserto egípcio em busca de Deus.',
    texto: `<p>Depois de ouvir na missa a passagem em que Jesus pede para vender tudo e segui-lo, Antão distribuiu toda a sua herança aos pobres e retirou-se para o deserto do Egito, vivendo décadas em solidão, oração e combate espiritual. Discípulos foram se juntando a ele, dando origem à vida monástica cristã. É invocado como protetor dos animais.</p>`
  },
  {
    id: 'ines-roma',
    nome: 'Santa Inês de Roma',
    wiki: 'Inês de Roma',
    categoria: ['santos-jovens'],
    festa: '01-21',
    resumo: 'Jovem mártir romana que preferiu a morte a trair sua consagração a Cristo.',
    texto: `<p>Ainda menina, consagrou sua virgindade a Cristo e recusou vários pretendentes de família nobre, o que a levou a ser denunciada como cristã durante as perseguições romanas. Enfrentou o martírio com serenidade impressionante para sua pouca idade, tornando-se, desde os primeiros séculos do cristianismo, um dos símbolos mais fortes de pureza e fidelidade.</p>`
  },
  {
    id: 'conversao-paulo',
    nome: 'Conversão de São Paulo Apóstolo',
    wiki: 'Paulo de Tarso',
    categoria: ['grandes-santos'],
    festa: '01-25',
    resumo: 'O perseguidor dos cristãos derrubado pela luz de Cristo no caminho de Damasco.',
    texto: `<p>Fariseu zeloso, Saulo de Tarso perseguia ferozmente os primeiros cristãos até ser derrubado por uma luz do céu no caminho de Damasco, ouvindo a voz de Cristo perguntar "por que me persegues?". Cego por três dias, foi batizado e tornou-se Paulo, o maior missionário da história do cristianismo, percorrendo o Império Romano e escrevendo boa parte do Novo Testamento.</p>`
  },
  {
    id: 'angela-merici',
    nome: 'Santa Ângela Merici',
    wiki: 'Ângela Merici',
    categoria: ['grandes-santos'],
    festa: '01-27',
    resumo: 'Fundadora da primeira ordem dedicada à educação de meninas.',
    texto: `<p>Órfã ainda jovem, Ângela dedicou-se a leigos consagrados dedicados à oração e ao ensino, fundando a Companhia de Santa Úrsula, primeira instituição voltada especificamente para a educação de meninas na Europa. Sua visão pioneira de que mulheres poderiam viver consagradas fora da clausura tradicional influenciou gerações de congregações educadoras.</p>`
  },

  // ---------------- FEVEREIRO ----------------
  {
    id: 'sao-bras',
    nome: 'São Brás',
    wiki: 'Brás de Sebaste' /* se falhar, a busca qualificada encontra */,
    categoria: ['grandes-santos'],
    festa: '02-03',
    resumo: 'Bispo e médico mártir, invocado como protetor da garganta.',
    texto: `<p>Médico antes de se tornar bispo, Brás retirou-se para viver como eremita numa gruta, onde os animais selvagens o procuravam para serem curados. Preso durante as perseguições romanas, é lembrado por ter salvado, a caminho da prisão, uma criança que engasgava com uma espinha de peixe — por isso é invocado até hoje contra males de garganta.</p>`
  },
  {
    id: 'santa-agueda',
    nome: 'Santa Águeda',
    wiki: 'Ágata da Sicília',
    categoria: ['santos-jovens'],
    festa: '02-05',
    resumo: 'Jovem siciliana martirizada por recusar as investidas de um governador romano.',
    texto: `<p>De família nobre e consagrada a Deus desde jovem, Águeda foi perseguida por um governador romano que, rejeitado por ela, a denunciou como cristã durante a perseguição de Décio. Suportou torturas terríveis sem renegar a fé. É padroeira de enfermeiras e, por seu martírio, invocada contra doenças do peito.</p>`
  },
  {
    id: 'paulo-miki',
    nome: 'São Paulo Miki e Companheiros',
    wiki: 'Paulo Miki',
    categoria: ['grandes-santos'],
    festa: '02-06',
    resumo: 'Jesuíta japonês crucificado com 25 companheiros durante a perseguição aos cristãos no Japão.',
    texto: `<p>Jovem seminarista jesuíta japonês, Paulo Miki pregava com eloquência mesmo a caminho do próprio martírio: foi crucificado em Nagasaki ao lado de outros 25 cristãos — padres, religiosos e leigos, entre eles crianças — durante a violenta perseguição ao cristianismo no Japão de 1597. Do alto da cruz, ainda pregou perdão aos seus algozes.</p>`
  },
  {
    id: 'josefina-bakhita',
    nome: 'Santa Josefina Bakhita',
    wiki: 'Josefina Bakhita',
    categoria: ['grandes-santos'],
    festa: '02-08',
    resumo: 'Sequestrada e escravizada na infância no Sudão, tornou-se freira na Itália.',
    texto: `<p>Sequestrada ainda menina no Sudão e vendida como escrava, sofreu anos de maus-tratos até ser levada à Itália, onde finalmente conheceu a liberdade e a fé cristã. Tornou-se religiosa canossiana, vivendo o resto da vida com uma serenidade que impressionava a todos, apesar do sofrimento vivido. É padroeira do Sudão e símbolo da luta contra o tráfico de pessoas.</p>`
  },
  {
    id: 'cirilo-metodio',
    nome: 'São Cirilo e São Metódio',
    wiki: 'Cirilo e Metódio',
    categoria: ['grandes-santos'],
    festa: '02-14',
    resumo: 'Irmãos missionários que evangelizaram os povos eslavos e criaram seu alfabeto.',
    texto: `<p>Irmãos gregos enviados como missionários aos povos eslavos, criaram um alfabeto próprio para traduzir a Bíblia e a liturgia à língua do povo — origem do alfabeto cirílico usado até hoje. Enfrentaram forte resistência do clero que insistia no uso exclusivo do latim, mas seu trabalho lançou as bases da fé e da cultura escrita entre os eslavos. São copadroeiros da Europa.</p>`
  },
  {
    id: 'pedro-damiao',
    nome: 'São Pedro Damião',
    wiki: 'Pedro Damião',
    categoria: ['doutores'],
    festa: '02-21',
    resumo: 'Monge e cardeal italiano que trabalhou pela reforma da vida do clero.',
    texto: `<p>Órfão criado com dureza por um irmão mais velho, encontrou na vida monástica beneditina o rigor espiritual que buscava. Tornou-se conselheiro de vários papas, empenhando-se incansavelmente na reforma da disciplina e da moral do clero de sua época, mesmo quando isso significava enfrentar bispos e cardeais poderosos. Foi declarado Doutor da Igreja.</p>`
  },
  {
    id: 'policarpo',
    nome: 'São Policarpo',
    wiki: 'Policarpo de Esmirna',
    categoria: ['grandes-santos'],
    festa: '02-23',
    resumo: 'Discípulo do apóstolo João, bispo mártir condenado à fogueira por recusar negar a Cristo aos 86 anos.',
    texto: `<p>Ainda jovem, foi discípulo direto do apóstolo João, tornando-se elo vivo entre a geração apostólica e a Igreja seguinte como bispo de Esmirna. Já idoso, foi preso durante uma perseguição e, ao ser pressionado a amaldiçoar Cristo para salvar a vida, respondeu: "Há oitenta e seis anos o sirvo, e ele nunca me fez mal algum — como posso blasfemar contra meu Rei e Salvador?" Foi condenado à fogueira.</p>`
  },

  // ---------------- MARÇO ----------------
  {
    id: 'cassimiro',
    nome: 'São Casimiro',
    wiki: 'Casimiro da Polônia',
    categoria: ['santos-jovens'],
    festa: '03-04',
    resumo: 'Príncipe polonês que recusou o trono e a guerra em nome da fé.',
    texto: `<p>Filho do rei da Polônia, recusou-se a liderar uma invasão militar que considerava injusta, preferindo a oração à ambição política. Viveu com simplicidade apesar do berço real, dedicando-se aos pobres e à devoção mariana, e morreu ainda jovem, de tuberculose. É padroeiro da Polônia e da Lituânia.</p>`
  },
  {
    id: 'perpetua-felicidade',
    nome: 'Santas Perpétua e Felicidade',
    wiki: 'Perpétua e Felicidade',
    categoria: ['grandes-santos'],
    festa: '03-07',
    resumo: 'Jovem nobre e sua escrava, martirizadas juntas na arena de Cartago.',
    texto: `<p>Perpétua, jovem mãe de família nobre, e Felicidade, sua escrava grávida, foram presas juntas em Cartago por serem cristãs e enfrentaram a arena lado a lado, recusando renegar a fé mesmo diante das súplicas do próprio pai de Perpétua. O relato de seu martírio, em parte escrito pela própria Perpétua na prisão, é um dos textos cristãos mais antigos que chegaram até hoje.</p>`
  },
  {
    id: 'joao-de-deus',
    nome: 'São João de Deus',
    wiki: 'João de Deus',
    categoria: ['grandes-santos'],
    festa: '03-08',
    resumo: 'Ex-soldado português que dedicou a vida ao cuidado dos doentes pobres.',
    texto: `<p>Depois de anos como soldado e uma vida errante, uma pregação de João de Ávila o levou a uma conversão radical. Passou a recolher e cuidar pessoalmente dos doentes mais pobres e abandonados das ruas, fundando hospitais que deram origem à Ordem Hospitaleira de São João de Deus, hoje presente em dezenas de países. É padroeiro dos hospitais e enfermeiros.</p>`
  },
  {
    id: 'francisca-romana',
    nome: 'Santa Francisca Romana',
    wiki: 'Francisca Romana',
    categoria: ['grandes-santos'],
    festa: '03-09',
    resumo: 'Nobre romana que conciliou a vida de esposa e mãe com intensa caridade e mística.',
    texto: `<p>Casada ainda adolescente contra sua vontade, tornou-se com o tempo uma esposa e mãe dedicada, sem abandonar a vida espiritual intensa: relata-se que via seu anjo da guarda constantemente. Fundou uma comunidade de mulheres leigas dedicadas à oração e à assistência aos pobres de Roma, mostrando que a santidade cabe também na vida familiar comum.</p>`
  },
  {
    id: 'sao-patricio',
    nome: 'São Patrício',
    wiki: 'Patrício da Irlanda',
    categoria: ['grandes-santos'],
    festa: '03-17',
    resumo: 'Escravizado ainda jovem na Irlanda, voltou como missionário e a converteu ao cristianismo.',
    texto: `<p>Sequestrado por piratas irlandeses aos dezesseis anos e vendido como escravo pastor de ovelhas, Patrício viveu anos de solidão que aprofundaram sua fé. Conseguiu fugir, mas anos depois sentiu o chamado de retornar como missionário à própria terra de seu cativeiro, evangelizando praticamente toda a Irlanda. É padroeiro do país e sua festa é celebrada por irlandeses no mundo inteiro.</p>`
  },
  {
    id: 'cirilo-jerusalem',
    nome: 'São Cirilo de Jerusalém',
    wiki: 'Cirilo de Jerusalém',
    categoria: ['doutores'],
    festa: '03-18',
    resumo: 'Bispo de Jerusalém, exilado três vezes por defender a fé ortodoxa contra os arianos.',
    texto: `<p>Bispo da cidade santa de Jerusalém, Cirilo dedicou-se sobretudo à instrução dos catecúmenos, deixando catequeses que são hoje fonte preciosa sobre a fé e a liturgia dos primeiros séculos. Sua fidelidade à doutrina ortodoxa lhe custou três exílios impostos por facções arianas, mas ele sempre retornou à sua sé. É Doutor da Igreja.</p>`
  },
  {
    id: 'turibio-mogrovejo',
    nome: 'São Turíbio de Mogrovejo',
    wiki: 'Turíbio de Mogrovejo',
    categoria: ['grandes-santos'],
    festa: '03-23',
    resumo: 'Bispo espanhol que percorreu a pé o Peru colonial evangelizando e defendendo os indígenas.',
    texto: `<p>Jurista leigo enviado inesperadamente como arcebispo de Lima, Turíbio percorreu a cavalo e a pé, por décadas, um território imenso do Peru colonial, aprendendo línguas indígenas e denunciando os abusos dos colonizadores contra a população nativa. Crismou, segundo a tradição, futuros santos como Rosa de Lima e Martín de Porres.</p>`
  },

  // ---------------- ABRIL ----------------
  {
    id: 'francisco-paula',
    nome: 'São Francisco de Paula',
    wiki: 'Francisco de Paula',
    categoria: ['grandes-santos'],
    festa: '04-02',
    resumo: 'Eremita italiano fundador dos Mínimos, famoso por atravessar o mar sobre a própria capa.',
    texto: `<p>Viveu ainda menino como eremita numa gruta, dando início a uma vida de austeridade radical que atraiu discípulos e deu origem à Ordem dos Mínimos. A tradição popular conta que, recusado por um barqueiro, atravessou o Estreito de Messina sobre sua própria capa estendida na água. Tornou-se conselheiro espiritual de reis franceses.</p>`
  },
  {
    id: 'isidoro-sevilha',
    nome: 'Santo Isidoro de Sevilha',
    wiki: 'Isidoro de Sevilha',
    categoria: ['doutores'],
    festa: '04-04',
    resumo: 'Bispo espanhol que compilou todo o saber de seu tempo em uma enciclopédia.',
    texto: `<p>Um dos últimos grandes eruditos do mundo antigo, Isidoro escreveu as "Etimologias", uma vasta enciclopédia que reuniu e preservou o conhecimento greco-romano durante a Idade Média, quando tantas obras antigas se perdiam. Como bispo de Sevilha, também se dedicou à organização da liturgia hispânica. É considerado, por sua obra, patrono da internet.</p>`
  },
  {
    id: 'vicente-ferrer',
    nome: 'São Vicente Ferrer',
    wiki: 'Vicente Ferrer',
    categoria: ['grandes-santos'],
    festa: '04-05',
    resumo: 'Frade dominicano espanhol, pregador itinerante que percorreu a Europa chamando à conversão.',
    texto: `<p>Dominicano de eloquência extraordinária, Vicente Ferrer passou os últimos vinte anos de vida percorrendo a pé Espanha, França, Itália e Suíça, pregando ao ar livre para multidões sobre a conversão e o juízo final. Relata-se que, apesar de pregar apenas em valenciano, era compreendido por ouvintes de línguas diferentes.</p>`
  },
  {
    id: 'joao-batista-lasalle',
    nome: 'São João Batista de La Salle',
    wiki: 'João Batista de La Salle',
    categoria: ['grandes-santos'],
    festa: '04-07',
    resumo: 'Padre francês que fundou escolas gratuitas para meninos pobres.',
    texto: `<p>Sacerdote de família nobre, renunciou a benefícios eclesiásticos e à própria fortuna para se dedicar inteiramente à educação de meninos pobres, criando um método de ensino em turmas (em vez de aulas individuais) que se tornaria padrão nas escolas. Fundou os Irmãos das Escolas Cristãs. É considerado patrono dos professores.</p>`
  },
  {
    id: 'estanislau',
    nome: 'Santo Estanislau',
    wiki: 'Estanislau de Szczepanów',
    categoria: ['grandes-santos'],
    festa: '04-11',
    resumo: 'Bispo polonês martirizado pelo próprio rei por denunciar suas injustiças.',
    texto: `<p>Bispo de Cracóvia conhecido por sua coragem em denunciar publicamente as injustiças cometidas pelo rei Boleslau II, chegando a excomungá-lo. Em represália, foi morto pelo próprio rei enquanto celebrava a missa. Tornou-se símbolo da liberdade da Igreja diante do poder político e é padroeiro da Polônia.</p>`
  },
  {
    id: 'anselmo',
    nome: 'Santo Anselmo',
    wiki: 'Anselmo de Cantuária',
    categoria: ['doutores'],
    festa: '04-21',
    resumo: 'Monge beneditino italiano, considerado o pai da filosofia escolástica.',
    texto: `<p>Monge beneditino que se tornou arcebispo de Cantuária, Anselmo é lembrado como pioneiro do método escolástico, buscando compreender racionalmente as verdades da fé — resumiu sua busca no lema "fé em busca de entendimento". Enfrentou dois exílios por defender a independência da Igreja diante dos reis ingleses.</p>`
  },
  {
    id: 'fidelis-sigmaringen',
    nome: 'São Fidélis de Sigmaringen',
    wiki: 'Fidélis de Sigmaringen',
    categoria: ['grandes-santos'],
    festa: '04-24',
    resumo: 'Advogado alemão que se tornou frade capuchinho e missionário mártir.',
    texto: `<p>Advogado brilhante e bem-sucedido, Fidélis abandonou a carreira ao perceber a corrupção que via nos tribunais, tornando-se frade capuchinho dedicado aos pobres. Enviado como missionário para reconciliar protestantes calvinistas com a Igreja na Suíça, foi emboscado e morto por um grupo hostil à sua pregação.</p>`
  },
  {
    id: 'marcos-evangelista',
    nome: 'São Marcos Evangelista',
    wiki: 'Marcos, o Evangelista',
    categoria: ['grandes-santos'],
    festa: '04-25',
    resumo: 'Autor do segundo Evangelho, discípulo de Pedro e fundador da Igreja de Alexandria.',
    texto: `<p>Companheiro de Paulo, Barnabé e, sobretudo, intérprete de Pedro em Roma, Marcos registrou por escrito as pregações do apóstolo, dando origem ao Evangelho mais antigo do Novo Testamento. Tradição forte o identifica como fundador da Igreja de Alexandria, no Egito, onde teria sido martirizado. É representado por um leão alado e é padroeiro de Veneza.</p>`
  },

  // ---------------- MAIO ----------------
  {
    id: 'jose-operario',
    nome: 'São José Operário',
    wiki: 'José de Nazaré',
    categoria: ['sagrada-familia'],
    festa: '05-01',
    resumo: 'A mesma figura de São José, celebrada nesta data como padroeiro dos trabalhadores.',
    texto: `<p>Instituída pelo Papa Pio XII em 1955, esta segunda festa de São José no calendário — no Dia do Trabalhador — celebra especificamente sua dedicação ao trabalho manual como carpinteiro em Nazaré, apresentando-o como modelo e protetor de todos os operários e trabalhadores do mundo.</p>`
  },
  {
    id: 'atanasio',
    nome: 'Santo Atanásio',
    wiki: 'Atanásio de Alexandria',
    categoria: ['doutores'],
    festa: '05-02',
    resumo: 'Bispo de Alexandria, incansável defensor da divindade de Cristo contra o arianismo.',
    texto: `<p>Ainda jovem diácono, participou do Concílio de Niceia defendendo que Cristo é verdadeiramente Deus, contra a heresia ariana que negava isso. Como bispo de Alexandria, foi exilado cinco vezes por diferentes imperadores por sua firmeza doutrinal, chegando a passar anos escondido no deserto entre monges. É um dos maiores Doutores da Igreja oriental.</p>`
  },
  {
    id: 'filipe-tiago',
    nome: 'São Filipe e São Tiago Apóstolos',
    wiki: 'Filipe, o Apóstolo',
    categoria: ['grandes-santos'],
    festa: '05-03',
    resumo: 'Dois dos doze apóstolos de Jesus, celebrados juntos desde a Antiguidade.',
    texto: `<p>Filipe foi quem apresentou Natanael a Jesus e, na Última Ceia, pediu a Cristo: "Mostra-nos o Pai, e isso nos basta" — recebendo a resposta de que quem vê Jesus vê o Pai. Tiago, chamado "o Menor", liderou a Igreja de Jerusalém e é tradicionalmente identificado como autor da Carta de Tiago. Ambos deram a vida pregando o Evangelho após o Pentecostes.</p>`
  },
  {
    id: 'matias-apostolo',
    nome: 'Santo Matias Apóstolo',
    wiki: 'Matias, o Apóstolo',
    categoria: ['grandes-santos'],
    festa: '05-14',
    resumo: 'Escolhido por sorteio para substituir Judas Iscariotes entre os doze apóstolos.',
    texto: `<p>Segundo os Atos dos Apóstolos, depois da traição e morte de Judas Iscariotes, a comunidade cristã escolheu por sorteio, entre discípulos que haviam acompanhado Jesus desde o início, quem completaria novamente o número de doze apóstolos — e a sorte recaiu sobre Matias. A tradição situa sua pregação e martírio na região da atual Geórgia.</p>`
  },
  {
    id: 'isidro-lavrador',
    nome: 'Santo Isidro Lavrador',
    wiki: 'Isidro Lavrador',
    categoria: ['grandes-santos'],
    festa: '05-15',
    resumo: 'Camponês espanhol conhecido por sua vida de oração constante enquanto trabalhava a terra.',
    texto: `<p>Trabalhador rural humilde em Madri, Isidro era conhecido por rezar continuamente enquanto lavrava a terra, e relatos populares contam que anjos o ajudavam no arado enquanto ele orava. Casado com Santa Maria da Cabeça, viveu uma vida simples de trabalho, oração e caridade com os mais pobres. É padroeiro dos agricultores.</p>`
  },
  {
    id: 'bernardino-sena',
    nome: 'São Bernardino de Sena',
    wiki: 'Bernardino de Sena',
    categoria: ['grandes-santos'],
    festa: '05-20',
    resumo: 'Frade franciscano italiano famoso por sua pregação e devoção ao nome de Jesus.',
    texto: `<p>Depois de cuidar de doentes durante uma epidemia de peste, contraiu a própria doença e, ao se recuperar, decidiu entrar para os franciscanos. Tornou-se um dos maiores pregadores populares de seu tempo, difundindo a devoção às iniciais "IHS" (nome de Jesus em grego) como símbolo de reconciliação entre famílias e cidades rivais.</p>`
  },
  {
    id: 'beda-veneravel',
    nome: 'São Beda, o Venerável',
    wiki: 'Beda, o Venerável',
    categoria: ['doutores'],
    festa: '05-25',
    resumo: 'Monge inglês que escreveu a primeira grande história da Igreja na Inglaterra.',
    texto: `<p>Entregue ainda menino a um mosteiro na Nortúmbria, Beda praticamente nunca saiu dali, dedicando a vida inteira ao estudo, ao ensino e à escrita. Sua "História Eclesiástica do Povo Inglês" é a principal fonte sobre os primeiros séculos do cristianismo na Inglaterra. Foi também um dos primeiros a popularizar a contagem de anos a partir do nascimento de Cristo.</p>`
  },
  {
    id: 'filipe-neri',
    nome: 'São Filipe Néri',
    wiki: 'Filipe Néri',
    categoria: ['grandes-santos'],
    festa: '05-26',
    resumo: 'O "santo da alegria", que evangelizava Roma com bom humor e brincadeiras.',
    texto: `<p>Conhecido por seu jeito bem-humorado e brincalhão, Filipe Néri evangelizava os jovens de Roma reunindo-os para orações, música e passeios, convencido de que a alegria era caminho para a santidade, não obstáculo. Fundou o Oratório, congregação de padres seculares dedicados à formação espiritual através de encontros informais. É padroeiro de Roma e do humor.</p>`
  },

  // ---------------- JUNHO ----------------
  {
    id: 'justino-martir',
    nome: 'São Justino Mártir',
    wiki: 'Justino, o Mártir',
    categoria: ['grandes-santos'],
    festa: '06-01',
    resumo: 'Filósofo pagão convertido, primeiro grande apologista cristão diante da cultura grega.',
    texto: `<p>Filósofo grego que peregrinou por diversas escolas de pensamento em busca da verdade, encontrou-a finalmente no cristianismo através do encontro com um ancião cristão. Continuou vestindo o manto de filósofo, agora para defender e explicar a fé cristã à cultura greco-romana em suas "Apologias". Foi decapitado em Roma por se recusar a sacrificar aos deuses pagãos.</p>`
  },
  {
    id: 'carlos-lwanga',
    nome: 'São Carlos Lwanga e Companheiros',
    wiki: 'Carlos Lwanga',
    categoria: ['santos-jovens'],
    festa: '06-03',
    resumo: 'Jovens mártires ugandenses, queimados vivos por se recusarem a abandonar a fé.',
    texto: `<p>Pajens da corte do rei de Buganda, Carlos Lwanga e um grupo de outros jovens cristãos foram condenados à morte por recusarem tanto abandonar sua fé quanto ceder às investidas do próprio rei. Muitos foram queimados vivos ainda adolescentes, enfrentando o martírio com uma coragem que impressionou toda a região e impulsionou o crescimento do cristianismo na África.</p>`
  },
  {
    id: 'bonifacio',
    nome: 'Santo Bonifácio',
    wiki: 'Bonifácio de Mogúncia',
    categoria: ['grandes-santos'],
    festa: '06-05',
    resumo: 'Monge inglês, "Apóstolo da Alemanha", martirizado já idoso evangelizando povos germânicos.',
    texto: `<p>Monge beneditino inglês que dedicou décadas a evangelizar os povos germânicos, organizando dioceses e mosteiros por toda a região. Ficou famoso por derrubar pessoalmente um carvalho sagrado dos pagãos em Geismar sem que nenhum raio divino o impedisse, provocando muitas conversões. Foi morto já idoso por um grupo hostil enquanto aguardava um grupo de catecúmenos para o crisma.</p>`
  },
  {
    id: 'barnabe-apostolo',
    nome: 'São Barnabé Apóstolo',
    wiki: 'Barnabé',
    categoria: ['grandes-santos'],
    festa: '06-11',
    resumo: 'Companheiro de Paulo nas primeiras viagens missionárias, chamado apóstolo pela tradição.',
    texto: `<p>Levita de Chipre que vendeu suas terras para colocar tudo aos pés dos apóstolos, Barnabé foi quem apresentou o recém-convertido Paulo à comunidade cristã de Jerusalém, ainda desconfiada dele. Tornou-se seu companheiro nas primeiras grandes viagens missionárias, sendo chamado de "apóstolo" mesmo sem ter feito parte do grupo original dos doze.</p>`
  },
  {
    id: 'luis-gonzaga',
    nome: 'São Luís Gonzaga',
    wiki: 'Luís Gonzaga',
    categoria: ['santos-jovens'],
    festa: '06-21',
    resumo: 'Jovem nobre italiano que renunciou ao título de marquês para servir os doentes de peste.',
    texto: `<p>Herdeiro de um marquesado italiano, Luís renunciou à sucessão e entrou para os jesuítas ainda adolescente, contra a vontade do pai. Durante uma epidemia em Roma, dedicou-se a carregar e cuidar pessoalmente de doentes moribundos recolhidos das ruas, contraindo a doença que o matou aos 23 anos. É padroeiro da juventude.</p>`
  },
  {
    id: 'tomas-more',
    nome: 'São Tomás More',
    wiki: 'Tomás Morus',
    categoria: ['grandes-santos'],
    festa: '06-22',
    resumo: 'Chanceler da Inglaterra, decapitado por Henrique VIII por não aceitar o rei como chefe da Igreja.',
    texto: `<p>Advogado, escritor e chanceler do rei Henrique VIII, Tomás More foi um dos homens mais respeitados de seu tempo. Renunciou ao cargo e depois foi preso por se recusar a jurar lealdade ao rei como novo chefe da Igreja na Inglaterra, negando validade ao divórcio real. Subiu ao cadafalso dizendo morrer "bom servo do rei, mas primeiro de Deus".</p>`
  },
  {
    id: 'nascimento-joao-batista',
    nome: 'Nascimento de São João Batista',
    wiki: 'João Batista',
    categoria: ['grandes-santos'],
    festa: '06-24',
    resumo: 'O precursor de Cristo, que "saltou de alegria" no ventre de sua mãe diante de Maria.',
    texto: `<p>Filho de Isabel e Zacarias, concebido já na velhice de seus pais como sinal do poder de Deus, João é o único santo, além de Jesus e Maria, cujo nascimento a Igreja celebra com festa própria — por ter sido santificado ainda no ventre materno, quando "saltou de alegria" ao ouvir a saudação de Maria grávida. Tornou-se o profeta que preparou o caminho do Messias.</p>`
  },
  {
    id: 'ireneu-lyon',
    nome: 'Santo Ireneu de Lyon',
    wiki: 'Ireneu de Lyon',
    categoria: ['doutores'],
    festa: '06-28',
    resumo: 'Bispo grego radicado na Gália, grande combatente das heresias gnósticas.',
    texto: `<p>Discípulo de Policarpo, que por sua vez fora discípulo do apóstolo João, Ireneu tornou-se bispo de Lyon, na Gália, e dedicou sua obra "Contra as Heresias" a refutar sistematicamente o gnosticismo, defendendo a unidade da fé transmitida pelos apóstolos. Trabalhou também pela paz entre Roma e as Igrejas do Oriente. Foi declarado Doutor da Igreja em 2022, com o título de "Doutor da Unidade".</p>`
  },
  {
    id: 'pedro-paulo-apostolos',
    nome: 'São Pedro e São Paulo Apóstolos',
    wiki: 'Pedro (apóstolo)',
    categoria: ['grandes-santos'],
    festa: '06-29',
    resumo: 'As duas maiores colunas da Igreja primitiva, celebradas juntos desde os primeiros séculos.',
    texto: `<p>Pedro, o pescador que Jesus chamou de "rocha" sobre a qual construiria sua Igreja, e Paulo, o perseguidor convertido em maior missionário, são celebrados na mesma data por serem, juntos, os dois maiores pilares da Igreja primitiva — ambos martirizados em Roma sob o imperador Nero, Pedro crucificado de cabeça para baixo por se considerar indigno de morrer como Cristo.</p>`
  },

  // ---------------- JULHO ----------------
  {
    id: 'junipero-serra',
    nome: 'São Junípero Serra',
    wiki: 'Junípero Serra',
    categoria: ['grandes-santos'],
    festa: '07-01',
    resumo: 'Frade franciscano espanhol, fundador das missões que deram origem a cidades da Califórnia.',
    texto: `<p>Professor de filosofia na Espanha, Junípero Serra deixou a vida acadêmica para se tornar missionário nas Américas, já com quase quarenta anos. Apesar de uma perna ferida que o acompanhou o resto da vida, caminhou milhares de quilômetros fundando missões na Califórnia que deram origem a cidades como San Diego e San Francisco.</p>`
  },
  {
    id: 'tome-apostolo',
    nome: 'São Tomé Apóstolo',
    wiki: 'Tomé (apóstolo)',
    categoria: ['grandes-santos'],
    festa: '07-03',
    resumo: 'O apóstolo que duvidou da ressurreição até tocar as chagas de Cristo.',
    texto: `<p>Ficou conhecido como "o incrédulo" por se recusar a acreditar no relato dos outros apóstolos sobre a ressurreição sem ver e tocar as chagas de Jesus com as próprias mãos — pedido que Cristo atendeu, levando Tomé à célebre confissão "Meu Senhor e meu Deus!". A tradição situa sua missão evangelizadora na Índia, onde teria fundado comunidades cristãs ainda existentes hoje.</p>`
  },
  {
    id: 'henrique-imperador',
    nome: 'Santo Henrique',
    wiki: 'Henrique II, Sacro Imperador Romano-Germânico',
    categoria: ['grandes-santos'],
    festa: '07-13',
    resumo: 'Imperador germânico que governou colocando a fé e a Igreja acima do poder pessoal.',
    texto: `<p>Imperador do Sacro Império Romano-Germânico, Henrique usou seu poder para fundar dioceses, mosteiros e igrejas, e é lembrado por ter vivido, junto com a esposa Santa Cunegunda, um casamento dedicado inteiramente a Deus. Empenhou-se em reformar a disciplina eclesiástica de seu tempo, sendo um raro exemplo de governante canonizado pela santidade de seu próprio governo.</p>`
  },
  {
    id: 'lourenco-brindes',
    nome: 'São Lourenço de Brindes',
    wiki: 'Lourenço de Brindes',
    categoria: ['doutores'],
    festa: '07-21',
    resumo: 'Frade capuchinho poliglota, pregador e diplomata a serviço da paz na Europa.',
    texto: `<p>Dotado de facilidade extraordinária para línguas — falava fluentemente cerca de dez idiomas —, Lourenço de Brindes pregava em cada região na própria língua do povo. Serviu como diplomata papal em várias cortes europeias, ajudando a organizar a resistência cristã contra invasões otomanas. Foi declarado Doutor da Igreja em 1959.</p>`
  },
  {
    id: 'maria-madalena',
    nome: 'Santa Maria Madalena',
    wiki: 'Maria Madalena',
    categoria: ['grandes-santos'],
    festa: '07-22',
    resumo: 'A primeira testemunha da ressurreição, chamada "apóstola dos apóstolos".',
    texto: `<p>Liberta por Jesus de um sofrimento profundo, Maria Madalena tornou-se uma de suas seguidoras mais fiéis, permanecendo ao pé da cruz quando quase todos os apóstolos haviam fugido. Foi a primeira pessoa a encontrar Jesus ressuscitado, sendo enviada por ele mesmo para anunciar a notícia aos apóstolos — por isso é chamada, desde os primeiros séculos, "apóstola dos apóstolos".</p>`
  },
  {
    id: 'brigida-suecia',
    nome: 'Santa Brígida da Suécia',
    wiki: 'Brígida da Suécia',
    categoria: ['grandes-santos'],
    festa: '07-23',
    resumo: 'Nobre e mística sueca, mãe de família que depois de viúva fundou uma nova ordem religiosa.',
    texto: `<p>Casada e mãe de oito filhos, entre eles Santa Catarina da Suécia, Brígida viveu décadas de intensa vida familiar antes de, já viúva, dedicar-se inteiramente à vida mística e fundar a Ordem do Santíssimo Salvador. Relatou numerosas revelações e visões místicas sobre a paixão de Cristo, registradas em seus escritos. É copadroeira da Europa.</p>`
  },
  {
    id: 'joaquim-ana',
    nome: 'São Joaquim e Sant\'Ana',
    wiki: 'Joaquim (pai de Maria)',
    categoria: ['sagrada-familia'],
    festa: '07-26',
    resumo: 'Os pais da Virgem Maria, avós de Jesus, segundo a tradição cristã.',
    texto: `<p>Não mencionados diretamente na Bíblia, Joaquim e Ana são conhecidos pela tradição cristã antiga como os pais de Maria, que teriam esperado longos anos por um filho antes de receberem, já idosos, o anúncio de sua chegada. São venerados como avós de Jesus e padroeiros dos avós e das famílias.</p>`
  },
  {
    id: 'marta-maria-lazaro',
    nome: 'Santas Marta, Maria e São Lázaro',
    wiki: 'Marta de Betânia',
    categoria: ['grandes-santos'],
    festa: '07-29',
    resumo: 'Os três irmãos de Betânia, amigos íntimos de Jesus, que ele ressuscitou dos mortos.',
    texto: `<p>Marta, Maria e Lázaro, de Betânia, formavam uma das famílias mais próximas de Jesus, que hospedava-se em sua casa. Marta é lembrada por seu zelo prático no serviço, Maria por sentar-se aos pés de Jesus para ouvi-lo, e Lázaro pelo maior dos milagres: foi ressuscitado por Jesus quatro dias depois de morto, diante de uma multidão.</p>`
  },

  // ---------------- AGOSTO ----------------
  {
    id: 'joao-maria-vianney',
    nome: 'São João Maria Vianney',
    wiki: 'João Maria Vianney',
    categoria: ['grandes-santos'],
    festa: '08-04',
    resumo: 'O "Cura d\'Ars", padre humilde que passava até 16 horas por dia no confessionário.',
    texto: `<p>Considerado fraco aluno no seminário, quase não foi ordenado padre, mas tornou-se um dos maiores confessores da história da Igreja. Enviado para a paróquia pobre e sem fé de Ars, na França, transformou-a por completo, atraindo mais de cem mil peregrinos por ano que vinham de toda a Europa só para se confessar com ele. É padroeiro dos padres.</p>`
  },
  {
    id: 'domingos-gusmao',
    nome: 'São Domingos de Gusmão',
    wiki: 'Domingos de Gusmão',
    categoria: ['grandes-santos'],
    festa: '08-08',
    resumo: 'Fundador da Ordem dos Pregadores (dominicanos), dedicada ao estudo e à pregação.',
    texto: `<p>Cônego espanhol que, ao encontrar-se com a heresia cátara no sul da França, percebeu que ela só seria combatida com pregação bem fundamentada e vida de pobreza radical — não com a força. Fundou a Ordem dos Pregadores, os dominicanos, unindo profundo estudo teológico à vida mendicante. É tradicionalmente associado também à difusão do Santo Rosário.</p>`
  },
  {
    id: 'maximiliano-kolbe',
    nome: 'São Maximiliano Kolbe',
    wiki: 'Maximiliano Kolbe',
    categoria: ['grandes-santos'],
    festa: '08-14',
    resumo: 'Frade franciscano polonês que se ofereceu para morrer no lugar de um pai de família em Auschwitz.',
    texto: `<p>Frade franciscano e jornalista, foi preso pelos nazistas e enviado ao campo de concentração de Auschwitz. Quando um prisioneiro foi sorteado para morrer de fome como punição por uma fuga, Kolbe se ofereceu para morrer em seu lugar, dizendo ser padre e não ter família. Sobreviveu semanas no bunker da fome e foi finalmente morto por injeção letal. É padroeiro dos jornalistas e das famílias em dificuldade.</p>`
  },
  {
    id: 'bernardo-claraval',
    nome: 'São Bernardo de Claraval',
    wiki: 'Bernardo de Claraval',
    categoria: ['doutores'],
    festa: '08-20',
    resumo: 'Monge cisterciense, "Doutor Mielado", conselheiro de papas e grande devoto de Maria.',
    texto: `<p>Entrou para o mosteiro de Cister levando consigo cerca de trinta parentes e amigos, tamanha era sua capacidade de persuasão. Fundou a abadia de Claraval, de onde se espalhariam dezenas de novos mosteiros cistercienses pela Europa. Foi conselheiro de papas e reis, e sua devoção terna à Virgem Maria lhe rendeu o apelido de "Doutor Mielado", por suas pregações tão doces quanto o mel.</p>`
  },
  {
    id: 'pio-x',
    nome: 'São Pio X',
    wiki: 'Papa Pio X',
    categoria: ['grandes-santos'],
    festa: '08-21',
    resumo: 'Papa de origem camponesa, conhecido por antecipar a idade da Primeira Comunhão das crianças.',
    texto: `<p>Nascido em família humilde de camponeses italianos, Giuseppe Sarto tornou-se papa sem nunca perder sua simplicidade de origem. É lembrado sobretudo por reduzir a idade mínima para a Primeira Comunhão, entendendo que as crianças não deveriam esperar tanto para receber a Eucaristia, e por reformar a música sacra e o catecismo da Igreja.</p>`
  },
  {
    id: 'rosa-lima',
    nome: 'Santa Rosa de Lima',
    wiki: 'Rosa de Lima',
    categoria: ['santos-jovens'],
    festa: '08-23',
    resumo: 'Primeira santa das Américas, mística peruana de vida austera dedicada aos doentes.',
    texto: `<p>De extraordinária beleza, que ela via como obstáculo à vida espiritual que desejava, Rosa viveu uma existência de intensa penitência e oração em Lima, dedicando-se ao cuidado de crianças, idosos e doentes indígenas em um pequeno quarto que construiu no jardim de casa. Foi a primeira pessoa nascida nas Américas a ser canonizada, em 1671.</p>`
  },
  {
    id: 'bartolomeu-apostolo',
    nome: 'São Bartolomeu Apóstolo',
    wiki: 'Bartolomeu (apóstolo)',
    categoria: ['grandes-santos'],
    festa: '08-24',
    resumo: 'Um dos doze apóstolos, tradicionalmente identificado com Natanael, esfolado vivo pela fé.',
    texto: `<p>Muitos estudiosos identificam Bartolomeu com Natanael, aquele que Jesus descreveu como "um israelita sem malícia" ao ser apresentado por Filipe. A tradição situa sua pregação missionária em terras distantes como a Armênia e a Índia, onde teria sido martirizado sendo esfolado vivo — martírio pelo qual é frequentemente representado nas artes, segurando a própria pele.</p>`
  },
  {
    id: 'luis-ix-franca',
    nome: 'São Luís IX da França',
    wiki: 'Luís IX de França',
    categoria: ['grandes-santos'],
    festa: '08-25',
    resumo: 'Rei da França que governou com profunda justiça e devoção cristã.',
    texto: `<p>Coroado rei ainda menino, Luís IX governou a França por décadas unindo firmeza política a uma fé profunda, ouvindo pessoalmente as queixas dos súditos mais simples debaixo de um carvalho e reformando as leis do reino em nome da justiça. Participou de cruzadas e é lembrado como modelo raro de governante que exerceu o poder a serviço do bem comum.</p>`
  },

  // ---------------- SETEMBRO ----------------
  {
    id: 'pedro-claver',
    nome: 'São Pedro Cláver',
    wiki: 'Pedro Cláver',
    categoria: ['grandes-santos'],
    festa: '09-09',
    resumo: 'Jesuíta espanhol que dedicou a vida a acolher escravizados recém-chegados à América.',
    texto: `<p>Missionário jesuíta na Colômbia colonial, Pedro Cláver subia pessoalmente a bordo dos navios negreiros assim que atracavam em Cartagena, levando água, comida e cuidados médicos aos africanos escravizados amontoados em condições desumanas. Declarou-se "escravo dos escravos para sempre", batizando e defendendo a dignidade de milhares de pessoas ao longo de quatro décadas.</p>`
  },
  {
    id: 'cornelio-cipriano',
    nome: 'São Cornélio e São Cipriano',
    wiki: 'Cipriano de Cartago',
    categoria: ['grandes-santos'],
    festa: '09-16',
    resumo: 'Papa e bispo, amigos e mártires, que enfrentaram juntos crises de perseguição e cisma.',
    texto: `<p>Cornélio, papa em Roma, e Cipriano, bispo de Cartago, mantiveram intensa correspondência e amizade enquanto lidavam juntos com uma das maiores crises da Igreja primitiva: como acolher de volta cristãos que haviam renegado a fé sob perseguição. Ambos foram martirizados por sua liderança firme e caridosa nesses tempos difíceis.</p>`
  },
  {
    id: 'sao-januario',
    nome: 'São Januário',
    wiki: 'Januário',
    categoria: ['grandes-santos'],
    festa: '09-19',
    resumo: 'Bispo napolitano mártir, cujo sangue relicário até hoje intriga cientistas ao se liquefazer.',
    texto: `<p>Bispo de Benevento, na Itália, foi decapitado durante a perseguição de Diocleciano por se recusar a renegar a fé. Ficou famoso por um fenômeno que se repete há séculos em Nápoles: uma ampola com seu sangue, guardada como relíquia, aparentemente se liquefaz em datas específicas do ano, atraindo fiéis e curiosidade científica até hoje.</p>`
  },
  {
    id: 'andre-kim-taegon',
    nome: 'São André Kim Taegon e Companheiros',
    wiki: 'Andrew Kim Taegon',
    categoria: ['grandes-santos'],
    festa: '09-20',
    resumo: 'Primeiro padre coreano, martirizado com mais de cem companheiros leigos.',
    texto: `<p>Filho de uma família convertida ao cristianismo em segredo em uma Coreia hostil à fé cristã, André Kim tornou-se o primeiro padre nascido coreano, ordenado após estudar clandestinamente no exterior. Foi decapitado aos 25 anos, alguns anos depois do martírio do próprio pai, e é celebrado ao lado de mais de cem mártires coreanos, leigos em sua maioria, que deram a vida entre os séculos XVIII e XIX.</p>`
  },
  {
    id: 'mateus-apostolo',
    nome: 'São Mateus Apóstolo',
    wiki: 'Mateus, o Evangelista',
    categoria: ['grandes-santos'],
    festa: '09-21',
    resumo: 'Cobrador de impostos que largou tudo ao ouvir Jesus chamá-lo, tornando-se apóstolo e evangelista.',
    texto: `<p>Cobrador de impostos a serviço de Roma — profissão desprezada pelos judeus de sua época por servir ao invasor —, Mateus estava sentado à sua mesa de cobrança quando Jesus simplesmente disse "Segue-me", e ele largou tudo imediatamente. Tornou-se apóstolo e autor do primeiro Evangelho, escrito especialmente para mostrar aos judeus que Jesus era o Messias prometido nas Escrituras.</p>`
  },

  // ---------------- OUTUBRO ----------------
  {
    id: 'anjos-guarda',
    nome: 'Santos Anjos da Guarda',
    wiki: 'Anjo da guarda',
    categoria: ['arcanjos'],
    festa: '10-02',
    resumo: 'A crença de que cada pessoa recebe um anjo próprio, designado por Deus para protegê-la.',
    texto: `<p>Desde os primeiros séculos, a Igreja ensina que cada pessoa recebe de Deus um anjo próprio, encarregado de guiá-la e protegê-la ao longo de toda a vida terrena. Jesus mesmo faz referência a essa crença no Evangelho, ao dizer que os anjos das crianças "sempre veem a face do Pai que está nos Céus". É costume rezar diariamente ao próprio anjo da guarda pedindo sua proteção.</p>`
  },
  {
    id: 'sao-bruno',
    nome: 'São Bruno',
    wiki: 'Bruno de Colônia',
    categoria: ['grandes-santos'],
    festa: '10-06',
    resumo: 'Professor alemão que abandonou tudo para viver em silêncio e fundar os cartuxos.',
    texto: `<p>Professor respeitado de teologia em Reims, Bruno abandonou a vida acadêmica de sucesso para se retirar, com alguns companheiros, a um vale isolado nos Alpes franceses, dando origem à Ordem dos Cartuxos — dedicada a um estilo de vida raro de silêncio quase absoluto e solidão contemplativa, combinando eremitismo com vida em comunidade.</p>`
  },
  {
    id: 'margarida-maria-alacoque',
    nome: 'Santa Margarida Maria Alacoque',
    wiki: 'Margarida Maria Alacoque',
    categoria: ['grandes-santos'],
    festa: '10-16',
    resumo: 'Freira francesa a quem Jesus revelou a devoção ao Sagrado Coração.',
    texto: `<p>Religiosa francesa da Visitação, relatou ter recebido diversas aparições de Jesus revelando seu Sagrado Coração como símbolo de seu amor infinito pela humanidade, pedindo que essa devoção fosse difundida por toda a Igreja. Enfrentou anos de desconfiança e oposição, inclusive de suas próprias superioras, antes que a devoção fosse reconhecida e se espalhasse pelo mundo.</p>`
  },
  {
    id: 'lucas-evangelista',
    nome: 'São Lucas Evangelista',
    wiki: 'Lucas (evangelista)',
    categoria: ['grandes-santos'],
    festa: '10-18',
    resumo: 'Médico grego, companheiro de Paulo, autor do terceiro Evangelho e dos Atos dos Apóstolos.',
    texto: `<p>Médico de formação grega e o único evangelista que não era judeu, Lucas acompanhou Paulo em várias de suas viagens missionárias, relatadas com riqueza de detalhes no livro dos Atos dos Apóstolos, que ele também escreveu. Seu Evangelho dá atenção especial aos pobres, às mulheres e à misericórdia de Deus. É considerado patrono dos médicos e também dos artistas, por antiga tradição de tê-lo como pintor.</p>`
  },
  {
    id: 'joao-brebeuf',
    nome: 'São João de Brébeuf e Companheiros',
    wiki: 'Jean de Brébeuf',
    categoria: ['grandes-santos'],
    festa: '10-19',
    resumo: 'Missionários jesuítas martirizados entre os povos indígenas do Canadá.',
    texto: `<p>Jesuíta francês de saúde frágil mas força de vontade extraordinária, João de Brébeuf dedicou décadas à missão entre os hurões no que é hoje o Canadá, aprendendo profundamente sua língua e costumes. Foi capturado e torturado até a morte junto com outros missionários jesuítas durante conflitos entre povos indígenas rivais. São os protomártires do Canadá.</p>`
  },
  {
    id: 'joao-capistrano',
    nome: 'São João de Capistrano',
    wiki: 'João de Capistrano',
    categoria: ['grandes-santos'],
    festa: '10-23',
    resumo: 'Frade franciscano e ex-juiz que liderou a defesa de Belgrado contra invasão otomana já idoso.',
    texto: `<p>Juiz de sucesso antes de se tornar frade franciscano, João de Capistrano se tornou pregador itinerante famoso por atrair multidões enormes. Já com 70 anos, ajudou a organizar e liderar espiritualmente a resistência cristã que defendeu a cidade de Belgrado de uma grande invasão otomana em 1456, morrendo poucos meses depois da vitória.</p>`
  },

  // ---------------- NOVEMBRO ----------------
  {
    id: 'martin-porres',
    nome: 'São Martín de Porres',
    wiki: 'Martín de Porres',
    categoria: ['grandes-santos'],
    festa: '11-03',
    resumo: 'Frade dominicano peruano, filho de escravizada, dedicado aos pobres, doentes e animais.',
    texto: `<p>Filho de um nobre espanhol e de uma mulher afroperuana liberta, Martín enfrentou o preconceito racial de sua época mesmo dentro do convento dominicano, sendo aceito inicialmente apenas como leigo auxiliar. Dedicou a vida ao cuidado dos doentes mais pobres de Lima, sem distinção de origem, e é lembrado também por seu cuidado extraordinário com animais.</p>`
  },
  {
    id: 'carlos-borromeu',
    nome: 'São Carlos Borromeu',
    wiki: 'Carlos Borromeu',
    categoria: ['grandes-santos'],
    festa: '11-04',
    resumo: 'Cardeal e arcebispo de Milão, figura central na reforma da Igreja após o Concílio de Trento.',
    texto: `<p>Sobrinho de um papa, tornou-se cardeal e arcebispo de Milão ainda jovem, mas dedicou-se com seriedade incomum à reforma da Igreja proposta pelo Concílio de Trento, criando seminários para melhor formação dos padres e reorganizando a vida pastoral da diocese. Durante uma peste em Milão, permaneceu na cidade cuidando pessoalmente dos doentes quando muitos fugiram.</p>`
  },
  {
    id: 'leao-magno',
    nome: 'São Leão Magno',
    wiki: 'Papa Leão I',
    categoria: ['doutores'],
    festa: '11-10',
    resumo: 'Papa que convenceu Átila, o Huno, a não invadir Roma, e defendeu a doutrina sobre Cristo.',
    texto: `<p>Um dos papas mais influentes da Antiguidade, Leão é lembrado por ter saído pessoalmente ao encontro de Átila, o Huno, convencendo-o a não avançar sobre Roma. Sua carta doutrinal sobre as duas naturezas de Cristo, humana e divina, foi decisiva no Concílio de Calcedônia. É Doutor da Igreja e é chamado "Magno" — o Grande.</p>`
  },
  {
    id: 'martinho-tours',
    nome: 'São Martinho de Tours',
    wiki: 'Martinho de Tours',
    categoria: ['grandes-santos'],
    festa: '11-11',
    resumo: 'Soldado romano que dividiu sua capa com um mendigo e depois se tornou bispo.',
    texto: `<p>Ainda soldado romano, Martinho cortou ao meio sua própria capa militar para dividi-la com um mendigo enregelado de frio numa noite de inverno; naquela noite, sonhou com Cristo vestindo a metade da capa que havia doado. Deixou o exército, tornou-se monge e depois bispo de Tours, sendo um dos primeiros santos venerados sem ter sido mártir.</p>`
  },
  {
    id: 'josafat',
    nome: 'São Josafat',
    wiki: 'Josafat Kuntsevych',
    categoria: ['grandes-santos'],
    festa: '11-12',
    resumo: 'Bispo ucraniano de rito oriental, martirizado por seu trabalho pela unidade da Igreja.',
    texto: `<p>Monge e depois bispo da Igreja Greco-Católica Ucraniana, Josafat dedicou-se incansavelmente a promover a comunhão entre os cristãos orientais de rito bizantino e Roma, o que gerava forte resistência de grupos contrários à união. Foi assassinado por uma multidão hostil enquanto visitava uma paróquia, tornando-se o primeiro santo oriental canonizado formalmente por Roma.</p>`
  },
  {
    id: 'frances-cabrini',
    nome: 'Santa Frances Xavier Cabrini',
    wiki: 'Francesca Xavier Cabrini',
    categoria: ['grandes-santos'],
    festa: '11-13',
    resumo: 'Freira italiana que fundou dezenas de instituições para imigrantes nos Estados Unidos.',
    texto: `<p>Apesar de ter medo de água por quase se afogar quando criança, Francesca Cabrini atravessou o oceano dezenas de vezes a serviço dos imigrantes italianos pobres nos Estados Unidos, fundando escolas, orfanatos e hospitais por todo o país. Naturalizou-se americana e foi a primeira cidadã dos Estados Unidos a ser canonizada.</p>`
  },
  {
    id: 'gertrudes',
    nome: 'Santa Gertrudes',
    wiki: 'Gertrudes, a Grande',
    categoria: ['grandes-santos'],
    festa: '11-16',
    resumo: 'Monja alemã mística, uma das grandes propagadoras da devoção ao Coração de Jesus.',
    texto: `<p>Entregue ainda criança a um mosteiro beneditino na Alemanha, Gertrudes recebeu excelente formação intelectual antes de viver, já adulta, uma profunda conversão mística que a levou a registrar por escrito suas experiências de união com Cristo. Seus escritos antecipam em séculos a devoção ao Sagrado Coração de Jesus, difundida depois por Santa Margarida Maria Alacoque.</p>`
  },
  {
    id: 'andre-dung-lac',
    nome: 'São André Dung-Lac e Companheiros',
    wiki: 'André Dũng-Lạc',
    categoria: ['grandes-santos'],
    festa: '11-24',
    resumo: 'Padre vietnamita, celebrado junto com mais de cem mártires do Vietnã.',
    texto: `<p>Padre vietnamita executado durante décadas de intensa perseguição aos cristãos no Vietnã, André Dung-Lac é celebrado ao lado de mais de cem outros mártires — padres, religiosos e leigos vietnamitas, além de missionários estrangeiros — que deram a vida entre os séculos XVII e XIX, recusando pisar sobre a cruz para provar que haviam renegado a fé.</p>`
  },
  {
    id: 'catarina-alexandria',
    nome: 'Santa Catarina de Alexandria',
    wiki: 'Catarina de Alexandria',
    categoria: ['santos-jovens'],
    festa: '11-25',
    resumo: 'Jovem erudita egípcia que debateu e converteu filósofos pagãos antes do martírio.',
    texto: `<p>Segundo a tradição, Catarina era uma jovem de extraordinária inteligência em Alexandria que, ainda adolescente, confrontou o imperador por perseguir os cristãos, debatendo e convertendo à fé um grupo de filósofos pagãos enviados para refutá-la. Recusou-se a casar com o imperador e foi martirizada. É padroeira dos estudantes, filósofos e bibliotecários.</p>`
  },
  {
    id: 'andre-apostolo',
    nome: 'Santo André Apóstolo',
    wiki: 'André (apóstolo)',
    categoria: ['grandes-santos'],
    festa: '11-30',
    resumo: 'O primeiro apóstolo chamado por Jesus, irmão de Pedro, crucificado em cruz em forma de X.',
    texto: `<p>Pescador como o irmão Simão Pedro, André foi discípulo de João Batista antes de ser um dos primeiros a seguir Jesus, sendo por isso chamado de "Protóclito" (o primeiro chamado). A tradição situa sua pregação e martírio na Grécia, crucificado numa cruz em forma de X que hoje leva seu nome. É padroeiro da Escócia, Grécia e Rússia.</p>`
  },

  // ---------------- DEZEMBRO ----------------
  {
    id: 'sao-nicolau',
    nome: 'São Nicolau',
    wiki: 'Nicolau de Myra',
    categoria: ['grandes-santos'],
    festa: '12-06',
    resumo: 'Bispo grego famoso por sua generosidade secreta, origem histórica do Papai Noel.',
    texto: `<p>Bispo de Myra, na atual Turquia, Nicolau ficou famoso por sua generosidade discreta — a tradição mais conhecida conta que jogou secretamente moedas de ouro pela janela de uma família pobre para salvar três irmãs de um destino cruel, sem querer ser reconhecido. Essa fama de doador secreto e protetor de crianças deu origem, ao longo dos séculos, à figura do Papai Noel.</p>`
  },
  {
    id: 'juan-diego',
    nome: 'São Juan Diego',
    wiki: 'Juan Diego',
    categoria: ['grandes-santos'],
    festa: '12-09',
    resumo: 'Indígena mexicano a quem Nossa Senhora de Guadalupe apareceu em 1531.',
    texto: `<p>Indígena convertido ao cristianismo no México colonial, Juan Diego foi quem recebeu as aparições de Nossa Senhora de Guadalupe na colina do Tepeyac, sendo enviado por ela para pedir ao bispo a construção de um santuário. Como sinal, sua tilma (manto) ficou impressa com a imagem de Maria, ainda venerada hoje por milhões de peregrinos. Foi o primeiro indígena das Américas canonizado.</p>`
  },
  {
    id: 'santa-luzia',
    nome: 'Santa Luzia',
    wiki: 'Luzia de Siracusa',
    categoria: ['santos-jovens'],
    festa: '12-13',
    resumo: 'Jovem siciliana mártir, invocada como protetora da visão.',
    texto: `<p>Jovem consagrada a Deus na Sicília, Luzia distribuía seu dote entre os pobres em vez de se casar, o que levou seu próprio noivo rejeitado a denunciá-la como cristã. Seu nome, ligado à palavra latina para "luz", fez com que a tradição popular a associasse à proteção dos olhos e da visão, sendo por isso uma das santas mais invocadas por quem sofre de problemas oculares.</p>`
  },
  {
    id: 'pedro-canisio',
    nome: 'São Pedro Canísio',
    wiki: 'Pedro Canísio',
    categoria: ['doutores'],
    festa: '12-21',
    resumo: 'Jesuíta holandês que escreveu catecismos decisivos na reforma católica.',
    texto: `<p>Um dos primeiros jesuítas, Pedro Canísio dedicou a vida a fortalecer a fé católica em regiões da Europa fortemente abaladas pela Reforma Protestante, sobretudo na Alemanha e na Áustria. Seus catecismos, escritos em linguagem clara e acessível, foram reeditados centenas de vezes e usados na formação de gerações de católicos. É Doutor da Igreja.</p>`
  },
  {
    id: 'estevao-protomartir',
    nome: 'Santo Estêvão, Protomártir',
    wiki: 'Estêvão (protomártir)',
    categoria: ['grandes-santos'],
    festa: '12-26',
    resumo: 'O primeiro mártir cristão, apedrejado enquanto perdoava seus algozes.',
    texto: `<p>Um dos primeiros diáconos escolhidos pela comunidade cristã de Jerusalém para cuidar dos pobres, Estêvão foi acusado de blasfêmia por seus discursos sobre Cristo e apedrejado até a morte por uma multidão enfurecida. Morreu perdoando seus algozes e orando por eles, diante de um jovem fariseu chamado Saulo que guardava as capas de quem o apedrejava — o mesmo Saulo que depois se tornaria São Paulo.</p>`
  },
  {
    id: 'joao-evangelista',
    nome: 'São João Evangelista',
    wiki: 'João, o Evangelista',
    categoria: ['grandes-santos'],
    festa: '12-27',
    resumo: 'O "discípulo amado", único apóstolo que não foi martirizado, autor do quarto Evangelho.',
    texto: `<p>Chamado de "o discípulo que Jesus amava", João foi o único apóstolo que permaneceu ao pé da cruz, recebendo de Jesus moribundo o cuidado de sua própria mãe. Autor do quarto Evangelho, de três cartas e do livro do Apocalipse, é o único entre os doze apóstolos que não foi martirizado, vivendo até idade avançada em Éfeso.</p>`
  },
  {
    id: 'tomas-becket',
    nome: 'São Tomás Becket',
    wiki: 'Thomas Becket',
    categoria: ['grandes-santos'],
    festa: '12-29',
    resumo: 'Arcebispo de Cantuária, assassinado dentro da própria catedral por defender a Igreja diante do rei.',
    texto: `<p>Amigo próximo e chanceler do rei Henrique II da Inglaterra, Tomás Becket surpreendeu a todos ao se tornar, como arcebispo de Cantuária, um firme defensor da independência da Igreja diante do poder real — o que rompeu sua amizade com o rei. Foi assassinado por cavaleiros dentro da própria catedral, tornando-se um dos símbolos mais fortes da liberdade da Igreja diante do Estado.</p>`
  },
  // ---- Santos que o aplicativo já tinha e o site ainda não (os mesmos do
  // lumina-app/content/novos-santos.json, com duas correções de fatos) ----
  {
    id: 'charbel-makhlouf',
    nome: 'São Charbel Makhlouf',
    wiki: 'Charbel Makhlouf',
    categoria: ['grandes-santos'],
    festa: '07-24',
    resumo: 'O monge eremita do Líbano, conhecido pelo silêncio, pela oração e pelas curas junto ao seu túmulo.',
    texto: `
      <p>Youssef Antoun Makhlouf nasceu no Líbano em 1828. Ainda jovem, entrou para o mosteiro maronita de São Marão, em Annaya, e recebeu o nome de Charbel. Depois de muitos anos de vida comunitária, foi autorizado a viver como eremita, em 1875, numa pequena ermida ao lado do mosteiro.</p>
      <p>Passou o resto da vida em oração, silêncio, trabalho e penitência, com grande amor à Eucaristia. Morreu em 1898, e desde então muitos fiéis relatam graças e curas junto ao seu túmulo. Foi canonizado por Paulo VI em 1977 e é venerado por cristãos de todo o Oriente e do mundo inteiro.</p>
    `
  },
  {
    id: 'gianna-molla',
    nome: 'Santa Gianna Beretta Molla',
    wiki: 'Gianna Beretta Molla',
    categoria: ['grandes-santos'],
    festa: '04-28',
    resumo: 'A médica e mãe italiana que deu a vida para que sua filha pudesse nascer.',
    texto: `
      <p>Gianna Beretta nasceu na Itália em 1922 e se formou em Medicina e Cirurgia, com especialização em pediatria. Casou-se com Pietro Molla, teve filhos e continuou a exercer a profissão com muito carinho pelos pacientes, especialmente mães e crianças.</p>
      <p>Na quarta gravidez, descobriu um tumor no útero e, com plena consciência dos riscos, pediu que a vida do bebê fosse protegida. Em abril de 1962, nasceu sua filha Gianna Emanuela, e a mãe morreu uma semana depois. Foi canonizada por João Paulo II em 2004.</p>
    `
  },
  {
    id: 'damiao-molokai',
    nome: 'São Damião de Molokai',
    wiki: 'Damião de Molokai',
    categoria: ['grandes-santos'],
    festa: '05-10',
    resumo: 'O padre belga que serviu aos doentes de hanseníase na ilha havaiana de Molokai.',
    texto: `
      <p>Jozef De Veuster nasceu na Bélgica em 1840 e entrou na Congregação dos Sagrados Corações, tomando o nome de Damião. Foi enviado como missionário ao Havaí e, em 1873, ofereceu-se para servir aos doentes de hanseníase que viviam isolados na península de Kalaupapa, na ilha de Molokai.</p>
      <p>Ali ele cuidou dos doentes, construiu casas e uma igreja, organizou a comunidade e celebrou os sacramentos. Anos depois, contraiu a própria doença e morreu em 1889. Foi canonizado por Bento XVI em 2009 e é lembrado como exemplo de caridade sem medo.</p>
    `
  },
  {
    id: 'paulo-vi',
    nome: 'São Paulo VI',
    wiki: 'Papa Paulo VI',
    categoria: ['grandes-santos'],
    festa: '05-29',
    resumo: 'O papa que conduziu a Igreja durante e depois do Concílio Vaticano II.',
    texto: `
      <p>Giovanni Battista Montini nasceu na Itália em 1897 e foi ordenado sacerdote em 1920. Trabalhou na Secretaria de Estado do Vaticano, foi arcebispo de Milão e, em 1963, foi eleito papa com o nome de Paulo VI.</p>
      <p>Deu continuidade ao Concílio Vaticano II, encerrado em 1965, e fez viagens históricas, como as que realizou à Terra Santa e à sede da ONU. Governou a Igreja até sua morte, em 1978. Foi canonizado pelo Papa Francisco em 2018.</p>
    `
  },
  {
    id: 'joao-xxiii',
    nome: 'São João XXIII',
    wiki: 'Papa João XXIII',
    categoria: ['grandes-santos'],
    festa: '10-11',
    resumo: 'O "Papa Bom", que convocou o Concílio Vaticano II.',
    texto: `
      <p>Angelo Giuseppe Roncalli nasceu em 1881, numa família camponesa do norte da Itália. Foi sacerdote, diplomata a serviço da Santa Sé e patriarca de Veneza, até ser eleito papa em 1958, com o nome de João XXIII.</p>
      <p>Conhecido pela simplicidade e pela bondade, convocou o Concílio Vaticano II, que abriu em 1962. Morreu em 1963, antes do fim do Concílio. Foi canonizado em 2014, juntamente com João Paulo II, pelo Papa Francisco.</p>
    `
  },
  {
    id: 'oscar-romero',
    nome: 'São Óscar Romero',
    wiki: 'Óscar Romero',
    categoria: ['grandes-santos'],
    festa: '03-24',
    resumo: 'O arcebispo de San Salvador que defendeu os pobres e foi morto enquanto celebrava a Missa.',
    texto: `
      <p>Óscar Arnulfo Romero nasceu em El Salvador, em 1917. Foi sacerdote, bispo e, em 1977, tornou-se arcebispo de San Salvador. Diante da violência que atingia o povo de seu país, passou a denunciar as injustiças e a defender a dignidade dos mais pobres.</p>
      <p>Em 24 de março de 1980, foi assassinado enquanto celebrava a Missa numa capela de hospital. Foi beatificado em 2015 e canonizado pelo Papa Francisco em 2018.</p>
    `
  },
  {
    id: 'josemaria-escriva',
    nome: 'São Josemaria Escrivá',
    wiki: 'Josemaria Escrivá',
    categoria: ['grandes-santos'],
    festa: '06-26',
    resumo: 'O sacerdote espanhol que ensinou que o trabalho de cada dia pode ser caminho de santidade.',
    texto: `
      <p>Josemaria Escrivá nasceu na Espanha em 1902 e foi ordenado sacerdote em 1925. Em 2 de outubro de 1928, fundou o Opus Dei, obra que promove a busca da santidade no trabalho e nas tarefas comuns da vida.</p>
      <p>Ensinou que a vida diária, feita com amor e competência, pode ser oferecida a Deus. Morreu em Roma, em 1975, e foi canonizado por João Paulo II em 2002.</p>
    `
  },
  {
    id: 'camilo-lelis',
    nome: 'São Camilo de Lellis',
    wiki: 'Camilo de Lellis',
    categoria: ['grandes-santos'],
    festa: '07-14',
    resumo: 'O soldado que se converteu e dedicou a vida ao cuidado dos doentes.',
    texto: `
      <p>Camilo de Lellis nasceu na Itália em 1550 e, na juventude, foi soldado e jogador. Depois de uma conversão profunda, passou a trabalhar num hospital em Roma, onde percebeu como os doentes eram muitas vezes maltratados.</p>
      <p>Ordenado sacerdote, fundou a Ordem dos Ministros dos Enfermos, os camilianos, dedicados ao cuidado dos doentes, inclusive em tempos de peste. Morreu em 1614 e é padroeiro dos doentes, dos hospitais e dos profissionais de saúde.</p>
    `
  },
  {
    id: 'roberto-belarmino',
    nome: 'São Roberto Belarmino',
    wiki: 'Roberto Belarmino',
    categoria: ['doutores'],
    festa: '09-17',
    resumo: 'O jesuíta e cardeal, Doutor da Igreja, autor de um famoso catecismo.',
    texto: `
      <p>Roberto Belarmino nasceu na Itália em 1542 e entrou na Companhia de Jesus. Foi professor, escritor e teólogo, e tornou-se cardeal. Seus estudos sobre a fé católica foram muito importantes numa época de grandes debates religiosos.</p>
      <p>Escreveu catecismos simples, usados para ensinar a doutrina a crianças e adultos. Morreu em 1621 e foi declarado Doutor da Igreja em 1931.</p>
    `
  },
  {
    id: 'gemma-galgani',
    nome: 'Santa Gemma Galgani',
    wiki: 'Gemma Galgani',
    categoria: ['grandes-santos', 'santos-jovens'],
    festa: '04-11',
    resumo: 'A jovem mística de Lucca, conhecida pela oração e pelo amor à Paixão de Cristo.',
    texto: `
      <p>Gemma Galgani nasceu em Lucca, na Itália, em 1878. Ficou órfã ainda jovem e passou por muitas dificuldades de saúde e de dinheiro, vividas com fé e paciência.</p>
      <p>Era conhecida pela oração intensa e pela devoção à Paixão de Cristo. Morreu em 1903, aos 25 anos, e foi canonizada em 1940.</p>
    `
  },
  {
    id: 'gerardo-majela',
    nome: 'São Gerardo Majela',
    wiki: 'Gerardo Majela',
    categoria: ['grandes-santos', 'santos-jovens'],
    festa: '10-16',
    resumo: 'O irmão redentorista, padroeiro das mães que esperam bebê.',
    texto: `
      <p>Gerardo Majela nasceu na Itália em 1726, numa família humilde, e trabalhou desde jovem como aprendiz de alfaiate. Entrou para os Redentoristas como irmão leigo, fazendo serviços simples e cuidando dos necessitados.</p>
      <p>Morreu em 1755, com 29 anos. Foi canonizado em 1904 e é invocado como padroeiro das gestantes e das mães.</p>
    `
  },
  {
    id: 'leopoldo-mandic',
    nome: 'São Leopoldo Mandić',
    wiki: 'Leopoldo Mandić',
    categoria: ['grandes-santos'],
    festa: '05-12',
    resumo: 'O pequeno frade capuchinho que passava horas no confessionário.',
    texto: `
      <p>Bogdan Ivan Mandić nasceu em 1866, numa família croata de Herceg Novi, na costa da Dalmácia (hoje Montenegro), e entrou na Ordem dos Frades Menores Capuchinhos, tomando o nome de Leopoldo. Tinha baixa estatura e saúde frágil, mas grande bondade no trato com as pessoas.</p>
      <p>Viveu muitos anos em Pádua, na Itália, onde atendia confissões durante longas horas por dia. Morreu em 1942 e foi canonizado em 1983 por João Paulo II.</p>
    `
  },
  {
    id: 'maria-mazzarello',
    nome: 'Santa Maria Domingas Mazzarello',
    wiki: 'Maria Domenica Mazzarello',
    categoria: ['grandes-santos'],
    festa: '05-13',
    resumo: 'A cofundadora das Irmãs Salesianas, dedicada à educação de meninas.',
    texto: `
      <p>Maria Domingas Mazzarello nasceu na Itália em 1837, numa família de camponeses. Ainda jovem, dedicou-se a ensinar meninas do seu povoado, com trabalhos práticos e catequese.</p>
      <p>Com o apoio de São João Bosco, fundou o Instituto das Filhas de Maria Auxiliadora, as Irmãs Salesianas, voltado à educação de jovens. Morreu em 1881 e foi canonizada em 1951.</p>
    `
  },
  {
    id: 'luis-orione',
    nome: 'São Luís Orione',
    wiki: 'Luís Orione',
    categoria: ['grandes-santos'],
    festa: '03-12',
    resumo: 'O padre italiano dos pobres, fundador da Pequena Obra da Divina Providência.',
    texto: `
      <p>Luís Orione nasceu na Itália em 1872 e conheceu São João Bosco ainda menino. Depois de ordenado sacerdote, fundou a Pequena Obra da Divina Providência, que cuida de pobres, órfãos, doentes e idosos.</p>
      <p>Enviou missionários a vários países, inclusive ao Brasil. Morreu em 1940 e foi canonizado em 2004.</p>
    `
  },
  {
    id: 'edwiges',
    nome: 'Santa Edwiges',
    wiki: 'Edviges da Silésia',
    categoria: ['grandes-santos'],
    festa: '10-16',
    resumo: 'A duquesa da Silésia que ajudou os pobres e é invocada pelos endividados.',
    texto: `
      <p>Edwiges nasceu no século XII e casou-se com o duque Henrique I da Silésia. Mesmo sendo duquesa, vivia com simplicidade, fundou um mosteiro e ajudou muitos pobres e doentes.</p>
      <p>Depois da morte do marido, retirou-se para o mosteiro, onde viveu até morrer, em 1243. Foi canonizada em 1267 e, no Brasil, é muito invocada por pessoas com dificuldades financeiras.</p>
    `
  },
  {
    id: 'zita',
    nome: 'Santa Zita',
    wiki: 'Zita de Lucca',
    categoria: ['grandes-santos'],
    festa: '04-27',
    resumo: 'A empregada doméstica de Lucca, padroeira de quem trabalha nos serviços da casa.',
    texto: `
      <p>Zita nasceu na Itália, no século XIII, numa família pobre, e começou a trabalhar como empregada doméstica ainda menina. Serviu por décadas numa mesma casa, fazendo o trabalho de cada dia com cuidado e oração.</p>
      <p>Era generosa com os pobres e paciente com quem a tratava mal. Morreu em 1272 e é padroeira dos empregados domésticos.</p>
    `
  },
  {
    id: 'teresa-dos-andes',
    nome: 'Santa Teresa dos Andes',
    wiki: 'Teresa dos Andes',
    categoria: ['grandes-santos', 'santos-jovens'],
    festa: '04-12',
    resumo: 'A jovem carmelita chilena, primeira santa do Chile.',
    texto: `
      <p>Juanita Fernández Solar nasceu em Santiago do Chile, em 1900. Desde criança era alegre, gostava de esportes e de montar a cavalo, e tinha grande vida de oração.</p>
      <p>Aos 19 anos, entrou no Carmelo de Los Andes, recebendo o nome de Teresa de Jesus. Morreu em 1920, menos de um ano depois, e foi canonizada por João Paulo II em 1993, a primeira santa chilena.</p>
    `
  },
  {
    id: 'pedro-eymard',
    nome: 'São Pedro Julião Eymard',
    wiki: 'Pedro Julião Eymard',
    categoria: ['grandes-santos'],
    festa: '08-02',
    resumo: 'O sacerdote francês conhecido como apóstolo da Eucaristia.',
    texto: `
      <p>Pedro Julião Eymard nasceu na França em 1811 e foi ordenado sacerdote em 1834. Depois de alguns anos na Sociedade de Maria, sentiu-se chamado a difundir a adoração ao Santíssimo Sacramento.</p>
      <p>Fundou a Congregação do Santíssimo Sacramento e promoveu a adoração eucarística. Morreu em 1868 e foi canonizado em 1962.</p>
    `
  },
  {
    id: 'nha-chica',
    nome: 'Beata Nhá Chica',
    wiki: 'Nhá Chica',
    categoria: ['beatos'],
    festa: '06-14',
    resumo: 'A mulher simples de Baependi (MG), conselheira dos pobres e primeira beata leiga negra do Brasil.',
    texto: `
      <p>Francisca de Paula de Jesus, conhecida como Nhá Chica, nasceu por volta de 1808 em Minas Gerais. Não estudou, mas era muito procurada por sua sabedoria, seus conselhos e sua oração.</p>
      <p>Usou os poucos recursos que tinha para ajudar os pobres e construiu uma capela em Baependi. Morreu em 1895 e foi beatificada em 2013.</p>
    `
  },
  {
    id: 'albertina-berkenbrock',
    nome: 'Beata Albertina Berkenbrock',
    wiki: 'Albertina Berkenbrock',
    categoria: ['beatos', 'santos-jovens'],
    festa: '06-15',
    resumo: 'A menina catarinense de 12 anos, beatificada como mártir da pureza.',
    texto: `
      <p>Albertina Berkenbrock nasceu em Santa Catarina, em 1919, numa família de agricultores de origem alemã. Era uma menina piedosa, que ajudava a família e ia à igreja com frequência.</p>
      <p>Foi assassinada em 1931, aos 12 anos, ao defender sua dignidade. Foi beatificada em 2007, a primeira beata catarinense.</p>
    `
  },
  {
    id: 'catarina-laboure',
    nome: 'Santa Catarina Labouré',
    wiki: 'Catarina Labouré',
    categoria: ['grandes-santos'],
    festa: '11-28',
    resumo: 'A irmã vicentina a quem foi confiada a Medalha Milagrosa.',
    texto: `
      <p>Catarina Labouré nasceu na França em 1806, numa família de camponeses. Entrou na Companhia das Filhas da Caridade, em Paris, onde viveu com simplicidade cuidando de idosos.</p>
      <p>Em 1830, relatou aparições de Nossa Senhora, que lhe pediu para cunhar a Medalha Milagrosa. Morreu em 1876 e foi canonizada em 1947.</p>
    `
  },
  {
    id: 'isabel-portugal',
    nome: 'Santa Isabel de Portugal',
    wiki: 'Isabel de Aragão, Rainha de Portugal',
    categoria: ['grandes-santos'],
    festa: '07-04',
    resumo: 'A rainha portuguesa conhecida como pacificadora.',
    texto: `
      <p>Isabel de Aragão nasceu em 1271 e casou-se com o rei Dinis de Portugal. Como rainha, ajudou os pobres, fundou hospitais e obras de caridade e trabalhou pela paz entre familiares em conflito.</p>
      <p>Depois de ficar viúva, viveu junto ao convento de Santa Clara, em Coimbra. Morreu em 1336 e foi canonizada em 1625.</p>
    `
  },
  {
    id: 'nuno-alvares',
    nome: 'São Nuno de Santa Maria',
    wiki: 'Nuno Álvares Pereira',
    categoria: ['grandes-santos'],
    festa: '11-06',
    resumo: 'O condestável de Portugal que terminou a vida como frade carmelita.',
    texto: `
      <p>Nuno Álvares Pereira nasceu em 1360 e destacou-se como militar, defendendo a independência de Portugal, com vitórias como a de Aljubarrota, em 1385.</p>
      <p>Depois de cumprir seus deveres, distribuiu seus bens e entrou no Convento do Carmo, em Lisboa, como irmão Nuno de Santa Maria. Morreu em 1431 e foi canonizado em 2009.</p>
    `
  },
  {
    id: 'joao-de-britto',
    nome: 'São João de Britto',
    wiki: 'João de Brito',
    categoria: ['grandes-santos'],
    festa: '02-04',
    resumo: 'O jesuíta português mártir na Índia.',
    texto: `
      <p>João de Britto nasceu em Lisboa, em 1647, e foi criado na corte. Entrou para a Companhia de Jesus e partiu como missionário para a Índia.</p>
      <p>Adaptou-se à cultura local, vivendo com simplicidade. Foi morto em 1693 e canonizado em 1947.</p>
    `
  },
  {
    id: 'charles-foucauld',
    nome: 'São Carlos de Foucauld',
    wiki: 'Charles de Foucauld',
    categoria: ['grandes-santos'],
    festa: '12-01',
    resumo: 'O eremita do Saara que quis viver o Evangelho no silêncio e na amizade.',
    texto: `
      <p>Charles de Foucauld nasceu na França em 1858. Após uma juventude marcada pela vida militar, teve uma profunda conversão e viveu como monge, depois como sacerdote, no Saara argelino.</p>
      <p>Ali viveu entre os tuaregues, com humildade, amizade e oração. Foi morto em 1916 e canonizado pelo Papa Francisco em 2022.</p>
    `
  },
  {
    id: 'grignion-montfort',
    nome: 'São Luís Maria Grignion de Montfort',
    wiki: 'Luís Maria Grignion de Montfort',
    categoria: ['grandes-santos'],
    festa: '04-28',
    resumo: 'O missionário francês que ensinou a verdadeira devoção a Maria.',
    texto: `
      <p>Luís Maria Grignion de Montfort nasceu na França em 1673 e foi ordenado sacerdote em 1700. Pregou missões populares por muitas regiões do país, sempre com grande amor a Nossa Senhora.</p>
      <p>Escreveu o "Tratado da Verdadeira Devoção à Santíssima Virgem". Morreu em 1716 e foi canonizado em 1947.</p>
    `
  },
  {
    id: 'tarcisio',
    nome: 'São Tarcísio',
    wiki: 'Tarcísio',
    categoria: ['santos-jovens'],
    festa: '08-15',
    resumo: 'O menino romano que protegeu a Eucaristia, padroeiro dos coroinhas.',
    texto: `
      <p>Segundo a tradição, Tarcísio era um jovem cristão que vivia em Roma nos primeiros séculos da Igreja, no tempo das perseguições. Certa vez, foi encarregado de levar a Eucaristia a cristãos presos.</p>
      <p>No caminho, foi atacado e morreu protegendo o Santíssimo Sacramento. É venerado como padroeiro dos coroinhas e dos ministros extraordinários da Comunhão.</p>
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
// ============================================================
//  SOM DE BRILHO (sintetizado, sem precisar de arquivo de áudio)
// ============================================================
// Um acorde curto e cintilante, tocado no exato momento em que a
// estrela brilha na introdução. Navegadores bloqueiam áudio
// automático até haver alguma interação da pessoa com a página —
// por isso, se a primeira tentativa for bloqueada, uma segunda
// tentativa acontece no primeiro toque/clique na tela.
let somDeBrilhoJaTocou = false;

function tocarSomDeBrilho() {
  if (somDeBrilhoJaTocou) return;
  try {
    const AudioContextClasse = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClasse) return;
    const ctx = new AudioContextClasse();

    const tocar = () => {
      const agora = ctx.currentTime;
      // Acorde brilhante (Dó maior com nona), como um sino suave
      const frequencias = [1046.5, 1318.5, 1568.0, 2093.0];
      frequencias.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const ganho = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.value = freq;
        const inicio = agora + i * 0.07;
        ganho.gain.setValueAtTime(0, inicio);
        ganho.gain.linearRampToValueAtTime(0.07, inicio + 0.04);
        ganho.gain.exponentialRampToValueAtTime(0.0001, inicio + 1.3);
        osc.connect(ganho);
        ganho.connect(ctx.destination);
        osc.start(inicio);
        osc.stop(inicio + 1.4);
      });
      somDeBrilhoJaTocou = true;
    };

    if (ctx.state === 'suspended') {
      ctx.resume().then(tocar).catch(() => {});
    } else {
      tocar();
    }
  } catch (e) {
    // Sem áudio, o site continua normalmente — é só um detalhe a mais.
  }
}

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
    const quantidade = 70;
    for (let i = 0; i < quantidade; i++) {
      const ponto = document.createElement('div');
      const sorteio = Math.random();
      ponto.className = 'intro-star-dot'
        + (sorteio < 0.22 ? ' dourada' : '')
        + (sorteio > 0.9 ? ' cintilante' : '');
      const tamanho = (sorteio > 0.9 ? Math.random() * 1.5 + 2.2 : Math.random() * 1.8 + 0.8).toFixed(1);
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

  // Toca o som bem no instante em que o clarão da estrela acontece
  setTimeout(tocarSomDeBrilho, 900);
  // Reserva: se o navegador bloqueou o som automático, toca no
  // primeiro toque/clique em qualquer lugar da página.
  document.addEventListener('click', tocarSomDeBrilho, { once: true });

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

// Antes, quando o título não batia, o site pegava o primeiro
// resultado da Wikipédia — e vinha o cantor João Bosco, o jogador
// Casemiro ou o mapa do município de São Brás. Agora cada página é
// conferida: se não parecer de um santo, a foto é recusada.
const PISTAS_DE_SANTO = [
  'santo', 'santa', 'são ', 'beat', 'mártir', 'martir', 'papa', 'bispo', 'arcebispo',
  'padre', 'sacerdote', 'freira', 'religios', 'monge', 'monja', 'abade', 'abadessa',
  'apóstol', 'apostol', 'arcanjo', 'anjo', 'virgem', 'jesuíta', 'jesuita', 'franciscan',
  'carmelit', 'beneditin', 'dominican', 'salesian', 'igreja', 'católic', 'catolic',
  'cristã', 'cristão', 'missionár', 'missionar', 'canoniz', 'venerável', 'diácono',
  'eremita', 'evangelista', 'profeta', 'teólog', 'convento', 'mosteiro', 'ordem religiosa',
  'jesus', 'cristo', 'nazaré', 'evangelho', 'bíblia', 'biblia', 'basílica', 'santuário',
  'devoção', 'devocao', 'milagre', 'relíquia', 'reliquia', 'oração', 'oracao', 'fiéis',
];
const PISTAS_ERRADAS = [
  'município', 'municipio', 'futebolista', 'jogador de futebol', 'cantor', 'cantora',
  'compositor', 'banda de', 'álbum', 'telenovela', 'freguesia', 'clube de futebol',
  'atleta', 'atriz', 'ator brasileiro', 'ator português', 'youtuber', 'humorista',
  'apresentador', 'político brasileiro', 'seleção brasileira', 'campeonato',
];

function pareceSanto(dados) {
  const texto = `${dados.title || ''} ${dados.description || ''} ${dados.extract || ''}`.toLowerCase();
  if (PISTAS_ERRADAS.some((p) => texto.includes(p))) return false;
  return PISTAS_DE_SANTO.some((p) => texto.includes(p));
}

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
    if (!dados.thumbnail) return null;
    // Melhor nenhuma foto do que a foto de outra pessoa
    if (!pareceSanto(dados)) return null;
    // Pede a versão maior da imagem (a miniatura sai pequena demais)
    return (dados.originalimage && dados.originalimage.source) || dados.thumbnail.source;
  } catch (e) {
    return null;
  }
}

// Busca na Wikipédia já dizendo que procuramos um santo — assim os
// resultados vêm do campo religioso, e não de futebol ou música.
async function titulosProximosWiki(termo) {
  if (!termo) return [];
  try {
    const consulta = `${termo} santo católico`;
    const url = `https://pt.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(consulta)}&srlimit=5&format=json&origin=*`;
    const resp = await fetch(url);
    if (!resp.ok) return [];
    const dados = await resp.json();
    const achados = dados && dados.query && dados.query.search;
    return Array.isArray(achados) ? achados.map((r) => r.title) : [];
  } catch (e) {
    return [];
  }
}

// Mostra a foto INTEIRA, sem cortar. As sobras das laterais são
// preenchidas por uma cópia desfocada da própria foto, então nenhum
// santo fica com a cabeça cortada.
function htmlDaFoto(url, nome, classe) {
  const endereco = String(url).replace(/"/g, '&quot;');
  const alt = String(nome).replace(/"/g, '&quot;');
  return `<img src="${endereco}" alt="" class="foto-fundo" aria-hidden="true" loading="lazy">` +
         `<img src="${endereco}" alt="${alt}" class="${classe}" loading="lazy">`;
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
// Só os filtros do catálogo (outros botões usam o mesmo visual .filter-btn,
// como o Próxima do terço e o Entrar da conta, e não podem abrir o catálogo)
const filterBtns = document.querySelectorAll('.filter-btn[data-filter]');
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

const btnShare = document.getElementById('btn-share');

// ============================================================
//  IDIOMAS (pt / en / es)
// ============================================================
// Traduz a interface do site (menus, botões, textos fixos). As
// biografias dos santos, por enquanto, continuam só em português —
// são muito extensas para traduzir todas de uma vez; um aviso
// aparece na biografia quando o idioma escolhido não é o português,
// explicando isso com transparência.
const TRADUCOES = {
  pt: {
    hero_subtitulo: 'Luz dos Santos',
    hero_citacao: '"A santidade não é o luxo de alguns, mas um chamado silencioso e ardente ao coração de todos nós, iluminando o mundo em cada época."',
    sobre_titulo: 'Sobre o Lumina Sancti',
    sobre_texto: 'O <strong>Lumina Sancti</strong> (Luz dos Santos) é um refúgio digital dedicado a preservar e compartilhar a vida, a fé e o legado daqueles que deixaram um rastro inextinguível de luz na história. Este espaço foi criado para revelar que a santidade não é algo distante, mas uma trilha bela, possível e acessível no cotidiano de qualquer época ou idade.',
    filtro_todos_curto: 'Todos',
    filtro_todos: 'Todos os Santos',
    filtro_favoritos: 'Favoritos',
    filtro_sagrada_familia: 'Sagrada Família',
    filtro_arcanjos: 'Arcanjos',
    filtro_doutores_curto: 'Doutores',
    filtro_doutores: 'Doutores da Igreja',
    filtro_grandes_santos: 'Grandes Santos',
    filtro_santos_jovens: 'Santos Jovens',
    filtro_beatos: 'Beatos',
    catalogo_titulo: 'Catálogo',
    pesquisar_titulo: 'Pesquisar Santo ou Beato',
    pesquisar_placeholder: 'Digite o nome do santo...',
    ia_titulo: 'Perguntar a uma IA',
    ia_descricao: 'Digite o nome de qualquer santo, beato, doutor da Igreja ou anjo — mesmo um que não esteja no nosso catálogo — e pergunte à IA do site. Ela só responde sobre esses temas.',
    ia_placeholder: 'Nome do santo...',
    ia_botao: 'Perguntar',
    voltar_inicio: 'Voltar para o início',
    aviso_traducao: 'Esta biografia ainda está disponível apenas em português. A tradução completa está a caminho.',
    conta_entrar: 'Entrar / Criar conta',
    conta_perfil: 'Meu perfil',
    conta_sair: 'Sair',
    conta_entrar_aba: 'Entrar',
    conta_cadastrar_aba: 'Criar conta',
    conta_email: 'E-mail',
    conta_senha: 'Senha',
    conta_nome: 'Nome',
    conta_entrar_botao: 'Entrar',
    conta_cadastrar_botao: 'Criar minha conta',
    conta_codigo_desc: 'Enviamos um código de 6 dígitos para o seu e-mail. Digite-o abaixo para confirmar sua conta.',
    conta_codigo_label: 'Código de confirmação',
    conta_codigo_botao: 'Confirmar código',
    conta_reenviar: 'Reenviar código',
    lumina_subtitulo: 'A assistente exclusiva do Lumina Sancti — só sobre santos, beatos, veneráveis, doutores e anjos.',
    lumina_precisa_login: 'Para conversar com a Lumina, entre na sua conta (é rápido e gratuito).',
    lumina_placeholder: 'Pergunte sobre um santo, beato, doutor ou anjo...',
    perfil_titulo: 'Meu perfil',
    perfil_salvar: 'Salvar alterações',
    perfil_zona_perigo: 'Excluir conta',
    perfil_excluir_aviso: 'Isso apaga sua conta e todos os dados ligados a ela, para sempre. Não tem como desfazer.',
    perfil_excluir_botao: 'Excluir minha conta',
    footer_fale_conosco: 'Fale conosco: <a href="mailto:suporte@luminasancti.com">suporte@luminasancti.com</a>',
    nav_compartilhar: 'Compartilhar o site',
    footer_compartilhe_texto: 'Ajude o Lumina Sancti a chegar a mais pessoas e iluminar a vida delas.',
    footer_compartilhe_botao: 'Compartilhar o site',
    trilhas_titulo: 'Trilhas dos Santos',
    trilhas_intro: 'Uma trilha para cada santo. Complete as missões para ganhar Fé, manter sua ofensiva e conquistar a insígnia e a medalha da virtude de cada um.',
    trilhas_insignias: 'Minhas insígnias',
    ouvir_biografia: 'Ouvir biografia',
    parar_leitura: 'Parar leitura',
    fazer_trilha: 'Fazer a trilha de {santo}',
    perguntar_lumina: 'Perguntar à Lumina sobre {santo}',
    voltar: 'Voltar',
    catalogo_interno_titulo: 'Catálogo dos Santos',
    nav_leitura: 'Leitura do dia',
    leitura_titulo: 'Leitura do dia',
    leitura_em_breve: 'Em breve estará disponível.',
  },
  en: {
    hero_subtitulo: 'Light of the Saints',
    hero_citacao: '"Holiness is not the luxury of a few, but a quiet, burning call in the heart of every one of us, lighting up the world in every age."',
    sobre_titulo: 'About Lumina Sancti',
    sobre_texto: '<strong>Lumina Sancti</strong> (Light of the Saints) is a digital refuge dedicated to preserving and sharing the life, faith and legacy of those who left an unquenchable trail of light in history. This space was created to reveal that holiness is not something distant, but a beautiful path, possible and accessible in the everyday life of any era or age.',
    filtro_todos_curto: 'All',
    filtro_todos: 'All Saints',
    filtro_favoritos: 'Favorites',
    filtro_sagrada_familia: 'Holy Family',
    filtro_arcanjos: 'Archangels',
    filtro_doutores_curto: 'Doctors',
    filtro_doutores: 'Doctors of the Church',
    filtro_grandes_santos: 'Great Saints',
    filtro_santos_jovens: 'Young Saints',
    filtro_beatos: 'Blesseds',
    catalogo_titulo: 'Catalog',
    pesquisar_titulo: 'Search Saint or Blessed',
    pesquisar_placeholder: 'Type the saint\'s name...',
    ia_titulo: 'Ask an AI',
    ia_descricao: 'Type the name of any saint, blessed, doctor of the Church or angel — even one not in our catalog — and ask the site\'s AI. It only answers about these topics.',
    ia_placeholder: 'Saint\'s name...',
    ia_botao: 'Ask',
    voltar_inicio: 'Back to home',
    aviso_traducao: 'This biography is currently available in Portuguese only. Full translation is on its way.',
    conta_entrar: 'Sign in / Create account',
    conta_perfil: 'My profile',
    conta_sair: 'Sign out',
    conta_entrar_aba: 'Sign in',
    conta_cadastrar_aba: 'Create account',
    conta_email: 'Email',
    conta_senha: 'Password',
    conta_nome: 'Name',
    conta_entrar_botao: 'Sign in',
    conta_cadastrar_botao: 'Create my account',
    conta_codigo_desc: 'We sent a 6-digit code to your email. Enter it below to confirm your account.',
    conta_codigo_label: 'Confirmation code',
    conta_codigo_botao: 'Confirm code',
    conta_reenviar: 'Resend code',
    lumina_subtitulo: "Lumina Sancti's own assistant — only about saints, blesseds, venerables, doctors and angels.",
    lumina_precisa_login: 'To talk with Lumina, sign in to your account (it\'s quick and free).',
    lumina_placeholder: 'Ask about a saint, blessed, doctor or angel...',
    perfil_titulo: 'My profile',
    perfil_salvar: 'Save changes',
    perfil_zona_perigo: 'Delete account',
    perfil_excluir_aviso: 'This permanently deletes your account and all data linked to it. This cannot be undone.',
    perfil_excluir_botao: 'Delete my account',
    footer_fale_conosco: 'Contact us: <a href="mailto:suporte@luminasancti.com">suporte@luminasancti.com</a>',
    nav_compartilhar: 'Share the site',
    footer_compartilhe_texto: 'Help Lumina Sancti reach more people and light up their lives.',
    footer_compartilhe_botao: 'Share the site',
    trilhas_titulo: 'Trails of the Saints',
    trilhas_intro: 'One trail for each saint. Complete the missions to earn Faith, keep your streak and win each saint\'s badge and virtue medal.',
    trilhas_insignias: 'My badges',
    ouvir_biografia: 'Listen to the biography',
    parar_leitura: 'Stop reading',
    fazer_trilha: 'Do the trail of {santo}',
    perguntar_lumina: 'Ask Lumina about {santo}',
    voltar: 'Back',
    catalogo_interno_titulo: 'Catalog of Saints',
    nav_leitura: 'Daily readings',
    leitura_titulo: 'Daily readings',
    leitura_em_breve: 'Coming soon.',
  },
  es: {
    hero_subtitulo: 'Luz de los Santos',
    hero_citacao: '"La santidad no es el lujo de unos pocos, sino un llamado silencioso y ardiente en el corazón de todos nosotros, iluminando el mundo en cada época."',
    sobre_titulo: 'Sobre Lumina Sancti',
    sobre_texto: '<strong>Lumina Sancti</strong> (Luz de los Santos) es un refugio digital dedicado a preservar y compartir la vida, la fe y el legado de quienes dejaron un rastro inextinguible de luz en la historia. Este espacio fue creado para revelar que la santidad no es algo distante, sino un camino bello, posible y accesible en la vida cotidiana de cualquier época o edad.',
    filtro_todos_curto: 'Todos',
    filtro_todos: 'Todos los Santos',
    filtro_favoritos: 'Favoritos',
    filtro_sagrada_familia: 'Sagrada Familia',
    filtro_arcanjos: 'Arcángeles',
    filtro_doutores_curto: 'Doctores',
    filtro_doutores: 'Doctores de la Iglesia',
    filtro_grandes_santos: 'Grandes Santos',
    filtro_santos_jovens: 'Santos Jóvenes',
    filtro_beatos: 'Beatos',
    catalogo_titulo: 'Catálogo',
    pesquisar_titulo: 'Buscar Santo o Beato',
    pesquisar_placeholder: 'Escribe el nombre del santo...',
    ia_titulo: 'Preguntar a una IA',
    ia_descricao: 'Escribe el nombre de cualquier santo, beato, doctor de la Iglesia o ángel — incluso uno que no esté en nuestro catálogo — y pregunta a la IA del sitio. Ella solo responde sobre estos temas.',
    ia_placeholder: 'Nombre del santo...',
    ia_botao: 'Preguntar',
    voltar_inicio: 'Volver al inicio',
    aviso_traducao: 'Esta biografía todavía está disponible solo en portugués. La traducción completa está en camino.',
    conta_entrar: 'Entrar / Crear cuenta',
    conta_perfil: 'Mi perfil',
    conta_sair: 'Salir',
    conta_entrar_aba: 'Entrar',
    conta_cadastrar_aba: 'Crear cuenta',
    conta_email: 'Correo electrónico',
    conta_senha: 'Contraseña',
    conta_nome: 'Nombre',
    conta_entrar_botao: 'Entrar',
    conta_cadastrar_botao: 'Crear mi cuenta',
    conta_codigo_desc: 'Enviamos un código de 6 dígitos a tu correo. Escríbelo abajo para confirmar tu cuenta.',
    conta_codigo_label: 'Código de confirmación',
    conta_codigo_botao: 'Confirmar código',
    conta_reenviar: 'Reenviar código',
    lumina_subtitulo: 'La asistente exclusiva de Lumina Sancti — solo sobre santos, beatos, venerables, doctores y ángeles.',
    lumina_precisa_login: 'Para hablar con Lumina, entra en tu cuenta (es rápido y gratis).',
    lumina_placeholder: 'Pregunta sobre un santo, beato, doctor o ángel...',
    perfil_titulo: 'Mi perfil',
    perfil_salvar: 'Guardar cambios',
    perfil_zona_perigo: 'Eliminar cuenta',
    perfil_excluir_aviso: 'Esto elimina tu cuenta y todos los datos asociados, para siempre. No se puede deshacer.',
    perfil_excluir_botao: 'Eliminar mi cuenta',
    footer_fale_conosco: 'Contáctanos: <a href="mailto:suporte@luminasancti.com">suporte@luminasancti.com</a>',
    nav_compartilhar: 'Compartir el sitio',
    footer_compartilhe_texto: 'Ayuda a Lumina Sancti a llegar a más personas e iluminar sus vidas.',
    footer_compartilhe_botao: 'Compartir el sitio',
    trilhas_titulo: 'Senderos de los Santos',
    trilhas_intro: 'Un sendero para cada santo. Completa las misiones para ganar Fe, mantener tu racha y conquistar la insignia y la medalla de la virtud de cada uno.',
    trilhas_insignias: 'Mis insignias',
    ouvir_biografia: 'Escuchar la biografía',
    parar_leitura: 'Detener la lectura',
    fazer_trilha: 'Hacer el sendero de {santo}',
    perguntar_lumina: 'Preguntar a Lumina sobre {santo}',
    voltar: 'Volver',
    catalogo_interno_titulo: 'Catálogo de los Santos',
    nav_leitura: 'Lecturas del día',
    leitura_titulo: 'Lecturas del día',
    leitura_em_breve: 'Próximamente disponible.',
  },
};

const CHAVE_IDIOMA = 'lumina-sancti-idioma';
let idiomaAtual = 'pt';

// Biografias em inglês e espanhol: ficam em biografias-en.js e
// biografias-es.js e só são baixadas quando a pessoa escolhe o
// idioma. Santo ainda sem tradução continua em português.
const biografiasCarregadas = {};

function carregarBiografiasDoIdioma(codigo) {
  if (codigo === 'pt') return Promise.resolve();
  if (biografiasCarregadas[codigo]) return biografiasCarregadas[codigo];
  biografiasCarregadas[codigo] = new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = `biografias-${codigo}.js`;
    script.onload = () => resolve();
    script.onerror = () => { delete biografiasCarregadas[codigo]; resolve(); };
    (document.head || document.body).appendChild(script);
  });
  return biografiasCarregadas[codigo];
}

// Nome, resumo e biografia do santo no idioma escolhido.
function textoDoSanto(santo) {
  const todas = typeof window !== 'undefined' ? window.BIOGRAFIAS_TRADUZIDAS : null;
  const traducao = idiomaAtual !== 'pt' && todas && todas[idiomaAtual] ? todas[idiomaAtual][santo.id] : null;
  if (!traducao) {
    return { nome: santo.nome, resumo: santo.resumo, texto: santo.texto, traduzido: idiomaAtual === 'pt' };
  }
  return {
    nome: traducao.nome || santo.nome,
    resumo: traducao.resumo || santo.resumo,
    texto: traducao.texto || santo.texto,
    traduzido: true,
  };
}

function reaplicarTextosDosSantos() {
  if (typeof cardsGrid !== 'undefined' && cardsGrid) renderGrid(filtroAtual);
  renderSantoDoDia();
  const detalhe = document.getElementById('view-detail');
  if (detalhe && detalhe.style.display === 'block' && bioArticle.dataset.santoId) showDetail(bioArticle.dataset.santoId);
}

function getIdiomaSalvo() {
  try {
    return localStorage.getItem(CHAVE_IDIOMA) || 'pt';
  } catch (e) {
    return 'pt';
  }
}

function aplicarIdioma(codigo) {
  // Se vier um idioma que não existe, não mexe em nada
  if (!codigo || !TRADUCOES[codigo]) return;
  const dicionario = TRADUCOES[codigo];
  const idiomaAnterior = idiomaAtual;
  idiomaAtual = codigo;

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const chave = el.dataset.i18n;
    if (dicionario[chave] !== undefined) {
      el.innerHTML = dicionario[chave];
    }
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const chave = el.dataset.i18nPlaceholder;
    if (dicionario[chave] !== undefined) {
      el.setAttribute('placeholder', dicionario[chave]);
    }
  });

  document.documentElement.lang = codigo === 'pt' ? 'pt-BR' : codigo;

  document.querySelectorAll('#idioma-menu .idioma-opcao').forEach(btn => {
    btn.classList.toggle('idioma-ativa', btn.dataset.lang === codigo);
  });

  try {
    localStorage.setItem(CHAVE_IDIOMA, codigo);
  } catch (e) {
    // segue sem salvar a preferência, sem quebrar o site
  }

  if (codigo !== idiomaAnterior) {
    // Biografias e trilhas do idioma novo chegam juntas; depois disso
    // a tela aberta é redesenhada já traduzida.
    const trilhasTraduzidas = typeof carregarTraducoesDasTrilhas === 'function' ? carregarTraducoesDasTrilhas(codigo) : null;
    Promise.all([carregarBiografiasDoIdioma(codigo), trilhasTraduzidas]).then(() => {
      reaplicarTextosDosSantos();
      if (typeof aoMudarIdiomaDasTrilhas === 'function') aoMudarIdiomaDasTrilhas();
    });
  }
  if (typeof atualizarSelosLiturgicos === 'function') atualizarSelosLiturgicos();
  atualizarBotaoVoltarDaBiografia();
}

// Texto da interface no idioma atual, trocando {marcas} pelos valores
function textoDaInterface(chave, valores) {
  const dicionario = TRADUCOES[idiomaAtual] || TRADUCOES.pt;
  const texto = dicionario[chave] !== undefined ? dicionario[chave] : TRADUCOES.pt[chave];
  if (!valores || typeof texto !== 'string') return texto;
  return texto.replace(/\{(\w+)\}/g, (marca, nome) => (valores[nome] !== undefined ? valores[nome] : marca));
}

function iniciarSeletorDeIdioma() {
  const botao = document.getElementById('idioma-btn');
  const menu = document.getElementById('idioma-menu');
  if (!botao || !menu) return;

  botao.addEventListener('click', (e) => {
    e.stopPropagation();
    const abrindo = !menu.classList.contains('aberto');
    menu.classList.toggle('aberto', abrindo);
    botao.setAttribute('aria-expanded', abrindo ? 'true' : 'false');
  });

  // Só os botões de dentro deste menu. (O menu da conta usa outra
  // classe: antes ele herdava este comportamento e, ao clicar em
  // "Entrar", o site trocava de idioma e reabria a última biografia.)
  menu.querySelectorAll('.idioma-opcao').forEach(opcao => {
    opcao.addEventListener('click', () => {
      aplicarIdioma(opcao.dataset.lang);
      menu.classList.remove('aberto');
      botao.setAttribute('aria-expanded', 'false');
      // Se houver uma biografia ABERTA, quem a atualiza é
      // reaplicarTextosDosSantos — nada é reaberto sozinho.
    });
  });

  document.addEventListener('click', () => {
    menu.classList.remove('aberto');
    botao.setAttribute('aria-expanded', 'false');
  });

  aplicarIdioma(getIdiomaSalvo());
}

// ============================================================
//  SUPABASE — CONTAS E BANCO DE DADOS
// ============================================================
// ██████████████████████████████████████████████████████████
// ███  COLOQUE SUAS CREDENCIAIS AQUI                        ███
// ███  Vá no painel do Supabase → Project Settings → API.   ███
// ███  "Project URL" vai em SUPABASE_URL. A chave "anon" /  ███
// ███  "publishable" (a pública, NUNCA a "service_role")    ███
// ███  vai em SUPABASE_ANON_KEY. Essas duas são seguras     ███
// ███  para ficar no código do navegador — foram feitas     ███
// ███  para isso.                                            ███
// ██████████████████████████████████████████████████████████
const SUPABASE_URL = 'https://upvualhciytwypmwtpye.supabase.co'; // projeto Lumina Sancti (o mesmo do app)
const SUPABASE_ANON_KEY = 'SUA-CHAVE-ANON-OU-PUBLISHABLE-AQUI';
// ██████████████████████████████████████████████████████████

// Enquanto a chave pública não for colada acima, o site funciona
// normalmente, só sem contas (nada quebra).
const LOGIN_COM_GOOGLE_ATIVO = false; // mude para true depois de ligar o Google no painel do Supabase

const supabaseCliente = (SUPABASE_URL.includes('SEU-PROJETO') || SUPABASE_ANON_KEY.includes('SUA-CHAVE') || !window.supabase)
  ? null
  : window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

let sessaoAtual = null;

async function iniciarAutenticacao() {
  if (!supabaseCliente) return; // Supabase ainda não configurado — o site funciona normal, só sem login

  const { data } = await supabaseCliente.auth.getSession();
  sessaoAtual = data.session;
  atualizarInterfaceDeConta();
  verificarCadastroCompleto();

  supabaseCliente.auth.onAuthStateChange((_evento, sessao) => {
    sessaoAtual = sessao;
    atualizarInterfaceDeConta();
    verificarCadastroCompleto();
  });
}

// ============================================================
//  CÓDIGO DO APARELHO
// ============================================================
// O banco do app permite criar só uma conta nova por aparelho (para
// evitar contas repetidas). No site, o "aparelho" é este navegador:
// um código aleatório é criado uma vez e guardado nele.
const CHAVE_INSTALACAO = 'lumina-sancti-instalacao';

function idDaInstalacao() {
  try {
    let id = localStorage.getItem(CHAVE_INSTALACAO);
    if (!id || id.length < 16) {
      const bytes = new Uint8Array(16);
      crypto.getRandomValues(bytes);
      id = 'web-' + Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('');
      localStorage.setItem(CHAVE_INSTALACAO, id);
    }
    return id;
  } catch (e) {
    return 'web-' + Date.now().toString(16) + Math.random().toString(16).slice(2, 14);
  }
}

async function aparelhoJaTemConta(instalacao) {
  try {
    const { data, error } = await supabaseCliente.rpc('install_status', { _install_id: instalacao });
    if (error) return false; // na dúvida, deixa o banco decidir no cadastro
    return data === 'claimed';
  } catch (e) {
    return false;
  }
}

// ============================================================
//  ENTRAR COM GOOGLE — a pessoa só ESCOLHE a conta; o cadastro
//  só fica completo depois que ela digita o próprio nome.
// ============================================================
// Tudo fica salvo no Supabase (não no Lovable): a conta do Google
// vira uma conta normal do site, e o nome vai junto com ela.
async function entrarComGoogle() {
  const feedback = document.getElementById('auth-feedback');
  if (!supabaseCliente) {
    if (feedback) feedback.textContent = 'Contas ainda não configuradas neste site.';
    return;
  }
  const { error } = await supabaseCliente.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: window.location.origin + window.location.pathname,
      queryParams: { prompt: 'select_account' }, // sempre mostra a lista de contas para escolher
    },
  });
  if (error && feedback) feedback.textContent = 'Não foi possível abrir o login do Google agora.';
}

// Se o Google devolver um erro (por exemplo, este aparelho já ter
// outra conta), mostra uma mensagem clara na tela de entrar.
function avisarErroDoGoogle() {
  const endereco = `${window.location.search || ''}&${(window.location.hash || '').replace(/^#/, '')}`;
  if (!/error_description=|error=/.test(endereco)) return;
  if (typeof irParaLogin === 'function') irParaLogin();
  const feedback = document.getElementById('auth-feedback');
  if (feedback) {
    feedback.textContent = 'Não foi possível entrar com o Google agora. Crie sua conta com e-mail e senha, ou tente de novo mais tarde.';
  }
  try { history.replaceState(null, '', window.location.pathname); } catch (e) { /* sem problema */ }
}

function cadastroCompleto(usuario) {
  if (!usuario) return true;
  const dados = usuario.user_metadata || {};
  if (dados.cadastro_completo === true) return true;
  // Contas criadas por e-mail antes desta versão já têm o nome
  const provedor = usuario.app_metadata && usuario.app_metadata.provider;
  return provedor === 'email' && !!dados.nome;
}

function verificarCadastroCompleto() {
  if (!sessaoAtual || cadastroCompleto(sessaoAtual.user)) return;
  const campo = document.getElementById('completar-nome');
  const feedback = document.getElementById('completar-feedback');
  if (campo) campo.value = '';
  if (feedback) feedback.textContent = '';
  mudarDeView('view-completar');
}

async function concluirCadastro(evento) {
  evento.preventDefault();
  const nome = document.getElementById('completar-nome').value.trim();
  const feedback = document.getElementById('completar-feedback');
  if (nome.length < 2) {
    feedback.textContent = 'Digite o seu nome.';
    return;
  }
  feedback.textContent = 'Salvando...';
  const { error } = await supabaseCliente.auth.updateUser({ data: { nome, cadastro_completo: true } });
  if (error) {
    feedback.textContent = 'Não foi possível salvar agora. Tente de novo.';
    return;
  }
  feedback.textContent = '';
  irDepoisDeEntrar();
}

async function usarOutraConta() {
  if (supabaseCliente) await supabaseCliente.auth.signOut();
  irParaLogin();
}

function atualizarInterfaceDeConta() {
  const logado = !!sessaoAtual;
  const btnEntrar = document.getElementById('conta-menu-entrar');
  const btnPerfil = document.getElementById('conta-menu-perfil');
  const btnSair = document.getElementById('conta-menu-sair');
  if (btnEntrar) btnEntrar.style.display = logado ? 'none' : 'block';
  if (btnPerfil) btnPerfil.style.display = logado ? 'block' : 'none';
  if (btnSair) btnSair.style.display = logado ? 'block' : 'none';
  const btnPerfis = document.getElementById('conta-menu-perfis');
  if (btnPerfis) btnPerfis.style.display = logado ? 'block' : 'none';

  const precisaLogin = document.getElementById('lumina-precisa-login');
  const chatArea = document.getElementById('lumina-chat-area');
  if (precisaLogin && chatArea) {
    precisaLogin.style.display = logado ? 'none' : 'block';
    chatArea.style.display = logado ? 'block' : 'none';
  }
}

// ============================================================
//  NAVEGAÇÃO ENTRE PÁGINAS (home, biografia, Lumina, conta, perfil)
// ============================================================
// opcoes.catalogoInterno: abre o início só com o catálogo (sem a tela de
// entrada), herdando a cor da página de onde a pessoa veio.
function mudarDeView(idNovaView, opcoes) {
  const todasAsViews = ['view-home', 'view-detail', 'view-ia', 'view-auth', 'view-perfil', 'view-oracoes', 'view-leitura', 'view-terco', 'view-padroeiro', 'view-trilhas', 'view-licao', 'view-perfis', 'view-ranking', 'view-planos', 'view-completar'];
  const viewAtual = todasAsViews.map(id => document.getElementById(id)).find(v => v && v.classList.contains('active'));
  // Saindo da lição, a voz da Lumi (modo infantil) não segue falando
  if (idNovaView !== 'view-licao' && typeof pararVozInfantil === 'function') pararVozInfantil(false);
  const catalogoInterno = idNovaView === 'view-home' && Boolean(opcoes && opcoes.catalogoInterno);

  const trocar = () => {
    todasAsViews.forEach(id => {
      const v = document.getElementById(id);
      if (v) v.style.display = 'none';
    });
    // A cor muda junto com a página, depois que a anterior saiu de cena
    document.body.classList.toggle('catalogo-interno', catalogoInterno);
    if (typeof aplicarTemaDaPagina === 'function') aplicarTemaDaPagina(idNovaView);
    const proxima = document.getElementById(idNovaView);
    if (proxima) {
      proxima.style.display = 'block';
      setTimeout(() => proxima.classList.add('active'), 20);
    }
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  if (viewAtual) {
    viewAtual.classList.remove('active');
    setTimeout(trocar, 250);
  } else {
    trocar();
  }
}

// ============================================================
//  ENTRAR / CRIAR CONTA
// ============================================================
function irParaLogin() {
  mudarDeView('view-auth');
}

// Confirma o código de 6 dígitos que chegou por e-mail. O Supabase
// aceita esse código como tipo 'email' (forma atual); se o projeto
// só aceitar o tipo antigo 'signup', tenta de novo desse jeito.
async function confirmarCodigoDeCadastro(email, codigo) {
  let { error } = await supabaseCliente.auth.verifyOtp({ email, token: codigo, type: 'email' });
  if (error) {
    ({ error } = await supabaseCliente.auth.verifyOtp({ email, token: codigo, type: 'signup' }));
  }
  return error;
}

// Pede ao servidor o e-mail fraterno de boas-vindas. Ele só sai uma
// vez por conta (o servidor garante isso), e qualquer falha aqui é
// silenciosa — a pessoa entra no site normalmente de qualquer jeito.
async function enviarEmailDeBoasVindas() {
  try {
    if (!supabaseCliente) return;
    const { data } = await supabaseCliente.auth.getSession();
    const token = data.session && data.session.access_token;
    if (!token) return;
    await fetch(`${SUPABASE_URL}/functions/v1/enviar-boas-vindas`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
    });
  } catch (e) {
    // sem boas-vindas por e-mail agora; nada quebra no site
  }
}

// Depois de entrar na conta, mostra a escolha de perfis (estilo
// streaming). Se o perfis.js não estiver carregado, vai pro início.
function irDepoisDeEntrar() {
  if (typeof aposEntrarNaConta === 'function') aposEntrarNaConta();
  else mudarDeView('view-home');
}

let emailAguardandoConfirmacao = '';

function iniciarPaginaDeAutenticacao() {
  const abaEntrar = document.getElementById('auth-tab-entrar');
  const abaCadastrar = document.getElementById('auth-tab-cadastrar');
  const formEntrar = document.getElementById('auth-form-entrar');
  const formCadastrar = document.getElementById('auth-form-cadastrar');
  const formCodigo = document.getElementById('auth-form-codigo');
  const feedback = document.getElementById('auth-feedback');
  if (!abaEntrar) return;

  function mostrarAbaEntrar() {
    abaEntrar.classList.add('active');
    abaCadastrar.classList.remove('active');
    formEntrar.style.display = 'flex';
    formCadastrar.style.display = 'none';
    formCodigo.style.display = 'none';
    feedback.textContent = '';
  }

  abaEntrar.addEventListener('click', mostrarAbaEntrar);
  abaCadastrar.addEventListener('click', () => {
    abaCadastrar.classList.add('active');
    abaEntrar.classList.remove('active');
    formCadastrar.style.display = 'flex';
    formEntrar.style.display = 'none';
    formCodigo.style.display = 'none';
    feedback.textContent = '';
  });

  formEntrar.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!supabaseCliente) { feedback.textContent = 'Contas ainda não configuradas neste site.'; return; }
    feedback.textContent = 'Entrando...';
    const email = document.getElementById('entrar-email').value.trim();
    const senha = document.getElementById('entrar-senha').value;
    const { error } = await supabaseCliente.auth.signInWithPassword({ email, password: senha });
    if (error) {
      feedback.textContent = 'E-mail ou senha incorretos.';
      return;
    }
    feedback.textContent = '';
    irDepoisDeEntrar();
  });

  formCadastrar.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!supabaseCliente) { feedback.textContent = 'Contas ainda não configuradas neste site.'; return; }
    feedback.textContent = 'Criando sua conta...';
    const nome = document.getElementById('cadastrar-nome').value.trim();
    const email = document.getElementById('cadastrar-email').value.trim();
    const senha = document.getElementById('cadastrar-senha').value;
    const instalacao = idDaInstalacao();
    if (await aparelhoJaTemConta(instalacao)) {
      feedback.textContent = 'Este aparelho já tem uma conta do Lumina Sancti. Entre com ela na aba Entrar.';
      return;
    }
    const { data, error } = await supabaseCliente.auth.signUp({
      email,
      password: senha,
      options: { data: { nome, cadastro_completo: true, install_id: instalacao, locale: 'pt-BR' } },
    });
    if (error) {
      const mensagem = String(error.message || '');
      feedback.textContent = mensagem.includes('already registered')
        ? 'Esse e-mail já tem uma conta.'
        : mensagem.includes('Database error')
          ? 'Não foi possível criar a conta neste aparelho. Se você já tem uma conta, entre com ela na aba Entrar.'
          : 'Não foi possível criar a conta. Tente de novo.';
      return;
    }
    if (data.session) {
      // Confirmação de e-mail desligada no projeto: já entra direto
      feedback.textContent = '';
      enviarEmailDeBoasVindas();
      irDepoisDeEntrar();
    } else {
      // Fluxo normal: mostra a tela pra digitar o código de 6 dígitos
      // que chegou por e-mail.
      emailAguardandoConfirmacao = email;
      formCadastrar.style.display = 'none';
      formCodigo.style.display = 'flex';
      document.getElementById('codigo-confirmacao').value = '';
      feedback.textContent = `Enviamos um código para ${email}. Confira sua caixa de entrada (e o spam, só por garantia).`;
    }
  });

  formCodigo.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!supabaseCliente || !emailAguardandoConfirmacao) return;
    const codigo = document.getElementById('codigo-confirmacao').value.trim();
    feedback.textContent = 'Confirmando...';
    const erro = await confirmarCodigoDeCadastro(emailAguardandoConfirmacao, codigo);
    if (erro) {
      feedback.textContent = 'Código incorreto ou expirado. Confira e tente de novo, ou peça um novo código.';
      return;
    }
    feedback.textContent = '';
    emailAguardandoConfirmacao = '';
    enviarEmailDeBoasVindas(); // sai em segundo plano, sem travar a tela
    irDepoisDeEntrar();
  });

  const btnReenviar = document.getElementById('reenviar-codigo-btn');
  if (btnReenviar) {
    btnReenviar.addEventListener('click', async () => {
      if (!emailAguardandoConfirmacao) return;
      feedback.textContent = 'Enviando novo código...';
      const { error } = await supabaseCliente.auth.resend({ type: 'signup', email: emailAguardandoConfirmacao });
      feedback.textContent = error ? 'Não foi possível reenviar agora. Tente novamente em instantes.' : 'Novo código enviado!';
    });
  }
}

// ============================================================
//  PERFIL E EXCLUSÃO DE CONTA
// ============================================================
async function carregarPaginaDePerfil() {
  const feedback = document.getElementById('perfil-feedback');
  if (!supabaseCliente || !sessaoAtual) { mudarDeView('view-auth'); return; }

  document.getElementById('perfil-email').textContent = sessaoAtual.user.email;
  const dadosDaConta = sessaoAtual.user.user_metadata || {};
  document.getElementById('perfil-nome').value = dadosDaConta.nome || dadosDaConta.full_name || '';
  if (feedback) feedback.textContent = '';
}

function iniciarPaginaDePerfil() {
  const form = document.getElementById('perfil-form');
  const feedback = document.getElementById('perfil-feedback');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const novoNome = document.getElementById('perfil-nome').value.trim();
    const { error } = await supabaseCliente.auth.updateUser({ data: { nome: novoNome } });
    feedback.textContent = error ? 'Não foi possível salvar agora.' : 'Salvo!';
  });

  // Excluir conta: exige duas confirmações separadas, de propósito,
  // pra ninguém apagar a conta sem querer.
  document.getElementById('perfil-excluir-btn').addEventListener('click', async () => {
    const primeira = confirm('Tem certeza que quer excluir sua conta do Lumina Sancti? Essa ação não pode ser desfeita.');
    if (!primeira) return;
    const segunda = confirm('Só para confirmar de novo: excluir sua conta APAGA TUDO para sempre. Continuar mesmo assim?');
    if (!segunda) return;

    feedback.textContent = 'Excluindo sua conta...';
    try {
      const { data: sessaoDados } = await supabaseCliente.auth.getSession();
      const token = sessaoDados.session?.access_token;
      const resp = await fetch(`${SUPABASE_URL}/functions/v1/excluir-conta`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      });
      const dados = await resp.json().catch(() => null);
      if (!resp.ok || !dados?.sucesso) throw new Error('falha');
      await supabaseCliente.auth.signOut();
      mudarDeView('view-home');
    } catch (e) {
      feedback.textContent = 'Não foi possível excluir a conta agora. Tente novamente.';
    }
  });
}

// ============================================================
//  PÁGINA DA LUMINA — a IA exclusiva do Lumina Sancti
// ============================================================
// Ela roda "por fora" do código do site: quem responde é uma
// Edge Function do Supabase, que guarda a chave da IA em segredo
// no servidor (nunca no navegador da pessoa), exige login e só
// aceita perguntas sobre santos, beatos, doutores da Igreja e
// anjos — qualquer outro assunto é recusado pela própria Lumina,
// por instrução no "system prompt" dela.
const AI_FUNCTION_URL = () => `${SUPABASE_URL}/functions/v1/perguntar-sobre-santo`;

function criarIndicadorPensando() {
  const div = document.getElementById('lumina-pensando');
  if (div) div.style.display = 'flex';
}
function esconderIndicadorPensando() {
  const div = document.getElementById('lumina-pensando');
  if (div) div.style.display = 'none';
}

// Efeito "máquina de escrever": o texto aparece caractere por
// caractere, de forma fluida, até fixar na tela por completo.
function efeitoMaquinaDeEscrever(elemento, textoCompleto, velocidadeMs = 18) {
  return new Promise((resolve) => {
    elemento.textContent = '';
    elemento.classList.add('cursor-digitando');
    let i = 0;
    function proximaLetra() {
      if (i < textoCompleto.length) {
        elemento.textContent += textoCompleto.charAt(i);
        i++;
        setTimeout(proximaLetra, velocidadeMs);
      } else {
        elemento.classList.remove('cursor-digitando');
        resolve();
      }
    }
    proximaLetra();
  });
}

async function enviarPerguntaLumina() {
  const input = document.getElementById('lumina-input');
  const botaoEnviar = document.getElementById('lumina-enviar');
  const areaResposta = document.getElementById('lumina-resposta-area');
  const erroEl = document.getElementById('lumina-erro');
  const restantesEl = document.getElementById('lumina-restantes');

  const pergunta = input.value.trim();
  if (!pergunta) { input.focus(); return; }
  if (!sessaoAtual) { irParaLogin(); return; }

  erroEl.textContent = '';
  input.value = '';
  input.disabled = true;
  botaoEnviar.disabled = true;

  const blocoPergunta = document.createElement('div');
  blocoPergunta.className = 'lumina-mensagem lumina-mensagem-pergunta';
  blocoPergunta.textContent = pergunta;
  areaResposta.appendChild(blocoPergunta);
  areaResposta.scrollTop = areaResposta.scrollHeight;

  criarIndicadorPensando();

  try {
    const token = sessaoAtual.access_token;
    const resp = await fetch(AI_FUNCTION_URL(), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify({ pergunta }),
    });
    const dados = await resp.json().catch(() => null);

    esconderIndicadorPensando();

    if (!resp.ok || !dados?.resposta) {
      if (dados?.precisaLogin) {
        await supabaseCliente.auth.signOut();
        irParaLogin();
        return;
      }
      erroEl.textContent = dados?.erro || 'Não consegui falar com a Lumina agora. Tente de novo em instantes.';
      return;
    }

    const blocoResposta = document.createElement('div');
    blocoResposta.className = 'lumina-mensagem';
    areaResposta.appendChild(blocoResposta);
    await efeitoMaquinaDeEscrever(blocoResposta, dados.resposta);
    areaResposta.scrollTop = areaResposta.scrollHeight;

    if (typeof dados.perguntasRestantesHoje === 'number') {
      restantesEl.textContent = `${dados.perguntasRestantesHoje} pergunta(s) restante(s) hoje`;
    }
  } catch (e) {
    esconderIndicadorPensando();
    erroEl.textContent = 'Não consegui falar com a Lumina agora. Verifique sua internet e tente de novo.';
  } finally {
    input.disabled = false;
    botaoEnviar.disabled = false;
    input.focus();
  }
}

function iniciarPaginaDaLumina() {
  const enviar = document.getElementById('lumina-enviar');
  const input = document.getElementById('lumina-input');
  const irLogin = document.getElementById('lumina-ir-login');
  if (!enviar) return;

  enviar.addEventListener('click', enviarPerguntaLumina);
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') enviarPerguntaLumina();
  });
  irLogin.addEventListener('click', irParaLogin);
}

// ============================================================
//  BOTÕES DA BARRA DE NAVEGAÇÃO (Lumina, Conta, voltar)
// ============================================================
function iniciarNavegacaoDeContas() {
  const luminaBtn = document.getElementById('lumina-btn');
  if (luminaBtn) luminaBtn.addEventListener('click', () => mudarDeView('view-ia'));

  const contaBtn = document.getElementById('conta-btn');
  const contaMenu = document.getElementById('conta-menu');
  if (contaBtn) {
    contaBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const abrindo = !contaMenu.classList.contains('aberto');
      contaMenu.classList.toggle('aberto', abrindo);
      contaBtn.setAttribute('aria-expanded', abrindo ? 'true' : 'false');
    });
    document.addEventListener('click', () => contaMenu.classList.remove('aberto'));
  }

  const menuEntrar = document.getElementById('conta-menu-entrar');
  const menuPerfil = document.getElementById('conta-menu-perfil');
  const menuSair = document.getElementById('conta-menu-sair');
  if (menuEntrar) menuEntrar.addEventListener('click', irParaLogin);
  if (menuPerfil) menuPerfil.addEventListener('click', () => { mudarDeView('view-perfil'); carregarPaginaDePerfil(); });
  if (menuSair) menuSair.addEventListener('click', async () => {
    if (supabaseCliente) await supabaseCliente.auth.signOut();
    mudarDeView('view-home');
  });

  ['btn-back-lumina', 'btn-back-auth', 'btn-back-perfil'].forEach(id => {
    const btn = document.getElementById(id);
    if (btn) btn.addEventListener('click', () => mudarDeView('view-home'));
  });

  iniciarPaginaDeAutenticacao();
  iniciarPaginaDePerfil();
  iniciarPaginaDaLumina();
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

  // Numa chuva de meteoros de verdade, todos parecem vir do mesmo
  // ponto do céu. Por isso a inclinação é quase a mesma para todos
  // (uns poucos graus de diferença), e não um sorteio solto.
  const INCLINACAO = 27;   // graus, descendo para a direita
  const VARIACAO = 2.5;    // quanto cada meteoro pode fugir disso
  const MAXIMO_NA_TELA = 22;
  const COMECO = performance.now();
  let vivos = 0;

  // A chuva nunca para: o que muda é a intensidade, que sobe e desce
  // devagar, em ondas (momentos mais fracos e momentos mais fortes).
  function meteorosPorSegundo() {
    const t = (performance.now() - COMECO) / 1000;
    const onda = 0.5 + 0.5 * Math.sin(t / 7.5) * Math.sin(t / 19 + 1.1);
    return 2 + onda * 3.5; // de 2 a 5,5 meteoros por segundo
  }

  function criarMeteoro() {
    if (vivos >= MAXIMO_NA_TELA || document.hidden) return;

    const largura = window.innerWidth;
    const altura = window.innerHeight;
    // profundidade: 0 = bem longe (fino, apagado, devagar),
    //               1 = mais perto (grosso, brilhante, rápido)
    const profundidade = Math.random();

    const angulo = (INCLINACAO + (Math.random() * 2 - 1) * VARIACAO).toFixed(2);
    const comprimento = Math.round(150 + profundidade * 260);
    const espessura = (2 + profundidade * 1.9).toFixed(2);
    const luz = (0.55 + profundidade * 0.45).toFixed(2);
    const distancia = Math.round((largura + altura) * (0.55 + Math.random() * 0.3));
    const duracao = (2.4 - profundidade * 1.1 + Math.random() * 0.4).toFixed(2);

    // Nasce FORA da tela e entra riscando — nenhum meteoro aparece
    // do nada no meio do céu. Uns entram pela borda de cima, outros
    // pela da esquerda, para a chuva cobrir o céu inteiro.
    let x;
    let y;
    if (Math.random() < 0.62) {
      // entra pela borda de cima
      x = Math.round((-0.4 + Math.random() * 1.4) * largura);
      y = Math.round(-(0.05 + Math.random() * 0.22) * altura);
    } else {
      // entra pela borda da esquerda
      x = Math.round(-(0.05 + Math.random() * 0.28) * largura);
      y = Math.round(Math.random() * altura * 0.65);
    }

    const meteoro = document.createElement('div');
    meteoro.className = 'meteor';
    meteoro.style.setProperty('--x', `${x}px`);
    meteoro.style.setProperty('--y', `${y}px`);
    meteoro.style.setProperty('--ang', `${angulo}deg`);

    const risco = document.createElement('i');
    risco.style.setProperty('--comp', `${comprimento}px`);
    risco.style.setProperty('--esp', `${espessura}px`);
    risco.style.setProperty('--dist', `${distancia}px`);
    risco.style.setProperty('--luz', luz);
    risco.style.animationDuration = `${duracao}s`;
    risco.addEventListener('animationend', () => {
      meteoro.remove();
      vivos -= 1;
    });

    meteoro.appendChild(risco);
    camada.appendChild(meteoro);
    vivos += 1;
  }

  function agendarProximoMeteoro() {
    const intervalo = 1000 / meteorosPorSegundo();
    const espera = intervalo * (0.75 + Math.random() * 0.5);
    setTimeout(() => {
      criarMeteoro();
      if (Math.random() < 0.12) setTimeout(criarMeteoro, 120 + Math.random() * 160);
      agendarProximoMeteoro();
    }, espera);
  }

  agendarProximoMeteoro();
}

// ============================================================
//  SANTO DO DIA
// ============================================================
// Duas coisas DIFERENTES, mostradas separadamente pra não gerar
// confusão (por exemplo: Carlo Acutis aparecendo destacado num
// dia que não é o dia de festa dele de verdade):
//
//   • "Santo de Hoje" — só aparece nos dias em que algum santo
//     do catálogo tem a festa litúrgica batendo com a data real
//     de hoje. Some nos outros dias, pra nunca afirmar algo que
//     não é verdade.
//
//   • "Santo em Destaque" — aparece TODO santo dia, girando pelo
//     catálogo (baseado no dia do ano), só pra convidar a
//     descobrir uma nova história. Nunca repete o mesmo santo que
//     já está no "Santo de Hoje", quando os dois aparecem juntos.
function getSantoDeHoje() {
  const hoje = new Date();
  const mm = String(hoje.getMonth() + 1).padStart(2, '0');
  const dd = String(hoje.getDate()).padStart(2, '0');
  const chaveHoje = `${mm}-${dd}`;
  return santosData.find(s => s.festa === chaveHoje) || null;
}

function getSantoEmDestaque(idParaEvitar) {
  const hoje = new Date();
  const inicioDoAno = new Date(hoje.getFullYear(), 0, 0);
  const diaDoAno = Math.floor((hoje - inicioDoAno) / 86400000);
  let indice = diaDoAno % santosData.length;
  let santo = santosData[indice];
  if (idParaEvitar && santo.id === idParaEvitar) {
    indice = (indice + 1) % santosData.length;
    santo = santosData[indice];
  }
  return santo;
}

function montarCartaoSantoDoDia(santo, rotulo, idBase) {
  const textos = textoDoSanto(santo);
  return `
    <div class="sdd-card" id="${idBase}-card" role="button" tabindex="0" aria-label="Ver a história de ${textos.nome}">
      <div class="sdd-topo">
        <span class="sdd-label">${rotulo}</span>
        <button class="btn-compartilhar-sdd" id="${idBase}-compartilhar" aria-label="Baixar cartão para compartilhar">
          <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
        </button>
      </div>
      <div class="sdd-body">
        <div class="sdd-img-wrapper" id="${idBase}-img-wrapper">
          <svg class="card-img-placeholder" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><use href="#icon-aureola"></use></svg>
        </div>
        <div class="sdd-info">
          <h3 class="sdd-nome">${textos.nome}</h3>
          <p class="sdd-resumo">${textos.resumo}</p>
          <span class="sdd-cta">Conhecer a história →</span>
        </div>
      </div>
    </div>
  `;
}

// ============================================================
//  CARTÃO DE COMPARTILHAMENTO (gerado na hora, com Canvas)
// ============================================================
function carregarImagemComCors(url) {
  return new Promise((resolve) => {
    if (!url) { resolve(null); return; }
    const img = new Image();
    img.crossOrigin = 'anonymous'; // necessário pra depois poder exportar o canvas
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null); // sem foto: o cartão sai só com a estrela
    img.src = url;
  });
}

function quebrarTexto(ctx, texto, larguraMax) {
  const palavras = texto.split(' ');
  const linhas = [];
  let linhaAtual = '';
  palavras.forEach((palavra) => {
    const tentativa = linhaAtual ? `${linhaAtual} ${palavra}` : palavra;
    if (ctx.measureText(tentativa).width > larguraMax && linhaAtual) {
      linhas.push(linhaAtual);
      linhaAtual = palavra;
    } else {
      linhaAtual = tentativa;
    }
  });
  if (linhaAtual) linhas.push(linhaAtual);
  return linhas;
}

async function gerarCartaoDeCompartilhamento(santo) {
  const T = 1080;
  const canvas = document.createElement('canvas');
  canvas.width = T;
  canvas.height = T;
  const ctx = canvas.getContext('2d');

  // Fundo escuro com um leve gradiente radial, igual ao site
  const gradiente = ctx.createRadialGradient(T / 2, T * 0.38, T * 0.05, T / 2, T * 0.38, T * 0.75);
  gradiente.addColorStop(0, '#1a2338');
  gradiente.addColorStop(1, '#0f172a');
  ctx.fillStyle = gradiente;
  ctx.fillRect(0, 0, T, T);

  // Foto do santo (se carregar), em círculo
  const imgUrl = await buscarImagemSanto(santo);
  const img = await carregarImagemComCors(imgUrl);
  const raioFoto = T * 0.20;
  const centroX = T / 2;
  const centroY = T * 0.33;

  ctx.save();
  ctx.beginPath();
  ctx.arc(centroX, centroY, raioFoto, 0, Math.PI * 2);
  ctx.closePath();
  ctx.fillStyle = '#334155';
  ctx.fill();
  if (img) {
    ctx.clip();
    const lado = Math.min(img.width, img.height);
    ctx.drawImage(
      img,
      (img.width - lado) / 2, (img.height - lado) / 2, lado, lado,
      centroX - raioFoto, centroY - raioFoto, raioFoto * 2, raioFoto * 2
    );
  }
  ctx.restore();

  ctx.strokeStyle = '#d4af37';
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.arc(centroX, centroY, raioFoto, 0, Math.PI * 2);
  ctx.stroke();

  // Nome do santo
  ctx.fillStyle = '#d4af37';
  ctx.textAlign = 'center';
  ctx.font = 'bold 54px Georgia, serif';
  const linhasNome = quebrarTexto(ctx, textoDoSanto(santo).nome, T * 0.85);
  let y = centroY + raioFoto + 80;
  linhasNome.forEach((linha) => { ctx.fillText(linha, centroX, y); y += 62; });

  // Resumo
  ctx.fillStyle = '#cbd5e1';
  ctx.font = '30px Georgia, serif';
  y += 20;
  const linhasResumo = quebrarTexto(ctx, textoDoSanto(santo).resumo, T * 0.78);
  linhasResumo.forEach((linha) => { ctx.fillText(linha, centroX, y); y += 42; });

  // Marca do site, no rodapé do cartão
  ctx.fillStyle = '#d4af37';
  ctx.font = 'bold 32px Georgia, serif';
  ctx.fillText('LUMINA SANCTI', centroX, T - 90);
  ctx.fillStyle = '#64748b';
  ctx.font = '22px Georgia, serif';
  ctx.fillText('luminasancti.com', centroX, T - 55);

  return canvas;
}

async function compartilharSantoDoDia(santo, botao) {
  const rotuloOriginal = botao.innerHTML;
  botao.disabled = true;
  botao.innerHTML = '<span class="mini-carregando" aria-label="Gerando"></span>';
  try {
    const canvas = await gerarCartaoDeCompartilhamento(santo);
    canvas.toBlob(async (blob) => {
      if (!blob) return;
      const arquivo = new File([blob], `lumina-sancti-${santo.id}.png`, { type: 'image/png' });

      if (navigator.share && navigator.canShare && navigator.canShare({ files: [arquivo] })) {
        try {
          await navigator.share({ files: [arquivo], title: santo.nome, text: `Conheça ${santo.nome} — Lumina Sancti` });
        } catch (e) { /* pessoa cancelou o compartilhamento — tudo bem */ }
      } else {
        // Sem suporte a compartilhar arquivos: baixa a imagem direto
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `lumina-sancti-${santo.id}.png`;
        link.click();
        URL.revokeObjectURL(link.href);
      }
    }, 'image/png');
  } catch (e) {
    console.error('Não foi possível gerar o cartão:', e);
  } finally {
    botao.disabled = false;
    botao.innerHTML = rotuloOriginal;
  }
}

function ligarCartaoSantoDoDia(idBase, santo) {
  const card = document.getElementById(`${idBase}-card`);
  if (!card) return;
  card.addEventListener('click', () => showDetail(santo.id));
  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      showDetail(santo.id);
    }
  });

  const btnCompartilhar = document.getElementById(`${idBase}-compartilhar`);
  if (btnCompartilhar) {
    btnCompartilhar.addEventListener('click', (e) => {
      e.stopPropagation();
      compartilharSantoDoDia(santo, btnCompartilhar);
    });
  }

  buscarImagemSanto(santo).then(imgUrl => {
    const wrapper = document.getElementById(`${idBase}-img-wrapper`);
    if (imgUrl && wrapper) {
      // aqui a moldura é um círculo pequeno: o corte redondo é o certo
      wrapper.innerHTML = `<img src="${imgUrl}" alt="${santo.nome}" class="card-img" loading="lazy">`;
    }
  });
}

function renderSantoDoDia() {
  const container = document.getElementById('santo-do-dia');
  if (!container) return;

  const dataFormatada = new Date().toLocaleDateString('pt-BR', { day: 'numeric', month: 'long' });
  const santoDeHoje = getSantoDeHoje();
  const santoDestaque = getSantoEmDestaque(santoDeHoje ? santoDeHoje.id : null);

  let html = '';
  if (santoDeHoje) {
    html += montarCartaoSantoDoDia(santoDeHoje, `Hoje, ${dataFormatada}, a Igreja celebra`, 'sdd-hoje');
  }
  html += montarCartaoSantoDoDia(santoDestaque, 'Santo em destaque', 'sdd-destaque');

  container.innerHTML = html;

  if (santoDeHoje) ligarCartaoSantoDoDia('sdd-hoje', santoDeHoje);
  ligarCartaoSantoDoDia('sdd-destaque', santoDestaque);
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
// ============================================================
//  FAVORITOS
// ============================================================
// Guardados só no navegador da própria pessoa (localStorage) —
// cada visitante tem sua própria listinha, sem precisar de login.
const CHAVE_FAVORITOS = 'lumina-sancti-favoritos';

function getFavoritos() {
  try {
    const salvos = localStorage.getItem(CHAVE_FAVORITOS);
    return salvos ? JSON.parse(salvos) : [];
  } catch (e) {
    return [];
  }
}

function ehFavorito(id) {
  return getFavoritos().includes(id);
}

function toggleFavorito(id) {
  const favoritos = getFavoritos();
  const indice = favoritos.indexOf(id);
  if (indice >= 0) {
    favoritos.splice(indice, 1);
  } else {
    favoritos.push(id);
  }
  try {
    localStorage.setItem(CHAVE_FAVORITOS, JSON.stringify(favoritos));
  } catch (e) {
    // Se o navegador bloquear localStorage (modo privado, por exemplo),
    // o favorito simplesmente não persiste — sem quebrar o site.
  }
  return favoritos.includes(id);
}

function iconeCoracao(preenchido) {
  return preenchido
    ? `<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" stroke="currentColor" stroke-width="2"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z"/></svg>`
    : `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z"/></svg>`;
}

function ligarBotaoFavorito(botao, id) {
  function atualizarAparencia() {
    const ativo = ehFavorito(id);
    botao.innerHTML = iconeCoracao(ativo);
    botao.classList.toggle('favorito-ativo', ativo);
    botao.setAttribute('aria-label', ativo ? 'Remover dos favoritos' : 'Adicionar aos favoritos');
    botao.setAttribute('aria-pressed', ativo ? 'true' : 'false');
  }
  atualizarAparencia();
  botao.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleFavorito(id);
    atualizarAparencia();
    if (botao.classList.contains('favorito-ativo')) {
      botao.classList.remove('batendo');
      void botao.offsetWidth; // reinicia a animação
      botao.classList.add('batendo');
    }
    // Se estivermos filtrando só os favoritos, o cartão precisa sumir
    // assim que deixar de ser favorito.
    if (filtroAtual === 'favoritos') {
      renderGrid('favoritos');
    }
  });
}

let filtroAtual = 'todos';

// ============================================================
//  CATÁLOGO (GRADE DE CARTÕES)
// ============================================================
function renderGrid(filter = 'todos') {
  filtroAtual = filter;
  cardsGrid.innerHTML = '';

  const filtrados = santosData.filter(s => {
    if (filter === 'todos') return true;
    if (filter === 'favoritos') return ehFavorito(s.id);
    return s.categoria.includes(filter);
  });

  if (filter === 'favoritos' && filtrados.length === 0) {
    cardsGrid.innerHTML = `<p class="not-found-msg" style="grid-column: 1 / -1;">Você ainda não tem santos favoritos. Toque no coração de um cartão para guardá-lo aqui.</p>`;
    return;
  }

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
      <button class="btn-favorito" aria-label="Adicionar aos favoritos" aria-pressed="false"></button>
      <div class="card-content">
        <h3 class="card-title">
          <svg class="card-icon" viewBox="0 0 24 24"><use href="#icon-aureola"></use></svg>
          ${textoDoSanto(santo).nome}
        </h3>
        <p class="card-desc">${textoDoSanto(santo).resumo}</p>
      </div>
    `;

    cardsGrid.appendChild(card);
    ligarBotaoFavorito(card.querySelector('.btn-favorito'), santo.id);

    buscarImagemSanto(santo).then(imgUrl => {
      const wrapper = document.getElementById(`img-wrapper-${santo.id}`);
      if (imgUrl && wrapper) {
        wrapper.innerHTML = htmlDaFoto(imgUrl, santo.nome, 'card-img');
      }
    });
  });
}

// ============================================================
//  OUVIR BIOGRAFIA (voz nativa do navegador, sem arquivo de áudio)
// ============================================================
function pararLeituraDeBiografia() {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}

function textoLimpo(html) {
  return html
    .replace(/<[^>]+>/g, ' ') // remove as tags HTML
    .replace(/\s+/g, ' ')
    .trim();
}

function ligarBotaoOuvir(santo) {
  const botao = document.getElementById('btn-ouvir-bio');
  const rotulo = document.getElementById('btn-ouvir-texto');
  if (!botao) return;

  if (!('speechSynthesis' in window)) {
    botao.style.display = 'none'; // navegador sem suporte: some, sem quebrar nada
    return;
  }

  botao.addEventListener('click', () => {
    if (window.speechSynthesis.speaking) {
      pararLeituraDeBiografia();
      rotulo.textContent = textoDaInterface('ouvir_biografia');
      botao.classList.remove('ouvindo');
      return;
    }

    const textos = textoDoSanto(santo);
    const texto = `${textos.nome}. ${textoLimpo(textos.texto)}`;
    const fala = new SpeechSynthesisUtterance(texto);
    fala.lang = (!textos.traduzido || idiomaAtual === 'pt') ? 'pt-BR' : (idiomaAtual === 'en' ? 'en-US' : 'es-ES');
    fala.rate = 0.95;

    fala.onend = () => {
      rotulo.textContent = textoDaInterface('ouvir_biografia');
      botao.classList.remove('ouvindo');
    };
    fala.onerror = () => {
      rotulo.textContent = textoDaInterface('ouvir_biografia');
      botao.classList.remove('ouvindo');
    };

    window.speechSynthesis.speak(fala);
    rotulo.textContent = textoDaInterface('parar_leitura');
    botao.classList.add('ouvindo');
  });
}

// Páginas para onde o "Voltar" da biografia (e do catálogo aberto pelo
// menu) consegue voltar. A lição volta para a trilha.
const PAGINAS_PARA_VOLTAR = {
  'view-trilhas': 'view-trilhas',
  'view-licao': 'view-trilhas',
  'view-ranking': 'view-ranking',
  'view-terco': 'view-terco',
  'view-ia': 'view-ia',
  'view-padroeiro': 'view-padroeiro',
  'view-oracoes': 'view-oracoes',
  'view-leitura': 'view-leitura',
  'view-planos': 'view-planos',
};
let origemDaBiografia = null;

function idDaPaginaVisivel() {
  const ativa = document.querySelector('.view.active');
  if (ativa) return ativa.id;
  const aberta = Array.from(document.querySelectorAll('.view')).find(v => v.style.display === 'block');
  return aberta ? aberta.id : null;
}

// "Voltar" ou "Voltar para o início", conforme o destino
function atualizarBotaoVoltarDaBiografia() {
  const rotulo = btnBack ? btnBack.querySelector('span') : null;
  if (!rotulo) return;
  const voltaParaOutraPagina = Boolean(PAGINAS_PARA_VOLTAR[origemDaBiografia]) || origemDaBiografia === 'catalogo-interno';
  const chave = voltaParaOutraPagina ? 'voltar' : 'voltar_inicio';
  rotulo.dataset.i18n = chave;
  rotulo.textContent = textoDaInterface(chave);
}

function showDetail(id) {
  const santo = santosData.find(s => s.id === id);
  if (!santo) return;

  // De onde a pessoa veio (a biografia herda a cor dessa página)
  const deOnde = idDaPaginaVisivel();
  if (deOnde && deOnde !== 'view-detail') {
    origemDaBiografia = deOnde === 'view-home' && document.body.classList.contains('catalogo-interno') ? 'catalogo-interno' : deOnde;
  }
  atualizarBotaoVoltarDaBiografia();

  pararLeituraDeBiografia();
  closeSidebar();
  closeSearch();
  bioContainer.classList.remove('animate-in');
  bioArticle.dataset.santoId = santo.id;

  // Esconde qualquer outra página aberta (início, trilhas, padroeiro,
  // lição...), não só o início — senão duas páginas ficavam na tela.
  document.querySelectorAll('.view').forEach(v => {
    if (v !== viewDetail) v.classList.remove('active');
  });
  setTimeout(() => {
    document.querySelectorAll('.view').forEach(v => {
      if (v !== viewDetail) v.style.display = 'none';
    });
    viewDetail.style.display = 'block';

    const textos = textoDoSanto(santo);
    const avisoTraducao = (!textos.traduzido)
      ? `<p class="bio-aviso-traducao" data-i18n="aviso_traducao">${(TRADUCOES[idiomaAtual] || {}).aviso_traducao || ''}</p>`
      : '';

    const trilhaDoSanto = (typeof trilhasLocais === 'function') ? trilhasLocais().find(t => t.santoId === santo.id)
      : ((typeof TRILHAS !== 'undefined') ? TRILHAS.find(t => t.santoId === santo.id) : null);

    bioArticle.innerHTML = `
      <div class="bio-header">
        <h2 class="bio-title">
          <svg viewBox="0 0 24 24" width="30" height="30" style="vertical-align: middle; margin-right:8px;"><use href="#icon-aureola"></use></svg>
          ${textos.nome}
        </h2>
      </div>
      <div class="bio-img-wrapper" id="bio-img-wrapper"></div>
      ${avisoTraducao}
      <button class="btn-ouvir" id="btn-ouvir-bio">
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 5L6 9H2v6h4l5 4V5z"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>
        <span id="btn-ouvir-texto">${textoDaInterface('ouvir_biografia')}</span>
      </button>
      <div class="bio-text">
        ${textos.texto}
      </div>
      ${trilhaDoSanto ? `
      <button class="btn-ask-ai btn-fazer-trilha" id="btn-fazer-trilha">
        <svg class="icone" viewBox="0 0 24 24" aria-hidden="true"><use href="#icone-trilha"></use></svg>
        ${textoDaInterface('fazer_trilha', { santo: trilhaDoSanto.santo })}
      </button>` : ''}
      <button class="btn-ask-ai" id="btn-ask-ai-santo">
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3v4M12 17v4M3 12h4M17 12h4M6.34 6.34l2.83 2.83M14.83 14.83l2.83 2.83M17.66 6.34l-2.83 2.83M9.17 14.83l-2.83 2.83"/><circle cx="12" cy="12" r="2.2" fill="currentColor" stroke="none"/></svg>
        ${textoDaInterface('perguntar_lumina', { santo: textos.nome })}
      </button>
    `;

    ligarBotaoOuvir(santo);

    const btnFazerTrilha = document.getElementById('btn-fazer-trilha');
    if (btnFazerTrilha && trilhaDoSanto) {
      btnFazerTrilha.addEventListener('click', () => {
        pararLeituraDeBiografia();
        abrirTrilhas(trilhaDoSanto.slug);
      });
    }

    const btnAskAiSanto = document.getElementById('btn-ask-ai-santo');
    if (btnAskAiSanto) {
      btnAskAiSanto.addEventListener('click', () => {
        mudarDeView('view-ia');
        setTimeout(() => {
          const luminaInput = document.getElementById('lumina-input');
          if (luminaInput) {
            luminaInput.value = `Me conte sobre ${santo.nome}.`;
            luminaInput.focus();
          }
        }, 300);
      });
    }

    buscarImagemSanto(santo).then(imgUrl => {
      const bioImgWrapper = document.getElementById('bio-img-wrapper');
      if (imgUrl) {
        bioImgWrapper.innerHTML = htmlDaFoto(imgUrl, santo.nome, 'bio-img');
      } else {
        bioImgWrapper.style.display = 'none';
      }
    });

    btnShare.onclick = () => {
      const shareData = {
        title: `Lumina Sancti - ${textoDoSanto(santo).nome}`,
        text: `Leia a inspiradora história de ${textoDoSanto(santo).nome} no Lumina Sancti!`,
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

// O "Voltar" da biografia leva de volta para a página de onde a pessoa
// veio (Trilhas, Terço, Lumina, Padroeiro...). Vindo do início, volta
// para o catálogo do início, como sempre foi.
btnBack.addEventListener('click', () => {
  pararLeituraDeBiografia();
  const destino = PAGINAS_PARA_VOLTAR[origemDaBiografia];
  if (destino) {
    bioContainer.classList.remove('animate-in');
    mudarDeView(destino);
    return;
  }
  const catalogoInterno = origemDaBiografia === 'catalogo-interno';
  viewDetail.classList.remove('active');
  bioContainer.classList.remove('animate-in');
  setTimeout(() => {
    viewDetail.style.display = 'none';
    document.body.classList.toggle('catalogo-interno', catalogoInterno);
    if (typeof aplicarTemaDaPagina === 'function') aplicarTemaDaPagina('view-home');
    viewHome.style.display = 'block';

    setTimeout(() => {
      viewHome.classList.add('active');
      document.getElementById('materias').scrollIntoView({ behavior: 'smooth' });
    }, 50);
  }, 400);
});

// Os filtros do menu lateral ("Catálogo") abrem o catálogo de qualquer
// página. Vindo de uma página na cor litúrgica (qualquer uma menos o
// início), abre o catálogo sozinho, sem a tela de entrada, e ele herda
// essa cor. Vindo de uma biografia dourada, abre o início, no catálogo.
let origemDoCatalogo = null;

function abrirCatalogo() {
  const atual = idDaPaginaVisivel();
  if (atual === 'view-home') return false;
  const interno = typeof temaDoSite !== 'undefined' && temaDoSite === 'liturgico';
  if (interno) {
    if (atual === 'view-detail') {
      if (origemDaBiografia !== 'catalogo-interno') origemDoCatalogo = PAGINAS_PARA_VOLTAR[origemDaBiografia] || null;
    } else {
      origemDoCatalogo = PAGINAS_PARA_VOLTAR[atual] || null;
    }
  }
  closeSidebar();
  mudarDeView('view-home', { catalogoInterno: interno });
  if (!interno) setTimeout(() => document.getElementById('materias').scrollIntoView({ behavior: 'smooth' }), 400);
  return true;
}

filterBtns.forEach(btn => {
  btn.addEventListener('click', (e) => {
    const filter = btn.dataset.filter;

    filterBtns.forEach(b => b.classList.remove('active'));

    document.querySelectorAll(`[data-filter="${filter}"]`).forEach(b => {
      b.classList.add('active');
    });

    if (window.innerWidth < 768) {
      closeSidebar();
    }

    // Em outra página, primeiro abre o catálogo (antes o clique não
    // mostrava nada, porque o catálogo estava escondido)
    if (!abrirCatalogo()) document.getElementById('materias').scrollIntoView({ behavior: 'smooth' });

    setTimeout(() => {
      renderGrid(filter);
    }, 100);
  });
});

const btnVoltarDoCatalogo = document.getElementById('btn-voltar-catalogo');
if (btnVoltarDoCatalogo) {
  btnVoltarDoCatalogo.addEventListener('click', () => mudarDeView(origemDoCatalogo || 'view-home'));
}

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

  const match = santosData.filter(s => {
    const t = textoDoSanto(s);
    return s.nome.toLowerCase().includes(query) || t.nome.toLowerCase().includes(query) || t.resumo.toLowerCase().includes(query);
  });

  if (match.length === 0) {
    searchResults.innerHTML = '<div class="not-found-msg">Nenhum santo ou beato encontrado.</div>';
    return;
  }

  match.forEach((santo, index) => {
    const item = document.createElement('div');
    item.className = 'search-result-item';
    item.style.animationDelay = `${index * 0.05}s`;
    item.innerHTML = `
      <div class="search-result-title">${textoDoSanto(santo).nome}</div>
      <div class="search-result-desc">${textoDoSanto(santo).resumo.substring(0, 70)}...</div>
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

// Cada parte roda isolada das outras: se uma falhar por algum
// motivo inesperado, isso é registrado no console, mas não impede
// as demais de funcionar normalmente.
function rodarComSeguranca(nome, funcao) {
  try {
    funcao();
  } catch (erro) {
    console.error(`Lumina Sancti — falha ao iniciar "${nome}":`, erro);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  rodarComSeguranca('grade de santos', renderGrid);
  rodarComSeguranca('santo do dia', renderSantoDoDia);
  rodarComSeguranca('chuva de meteoros', iniciarChuvaDeMeteoros);
  rodarComSeguranca('seletor de idioma', iniciarSeletorDeIdioma);
  rodarComSeguranca('navegação de contas', iniciarNavegacaoDeContas);
  rodarComSeguranca('autenticação', iniciarAutenticacao);
  rodarComSeguranca('página de orações', iniciarPaginaDeOracoes);
  rodarComSeguranca('página do terço', iniciarPaginaDoTerco);
  rodarComSeguranca('página de padroeiro', iniciarPaginaDePadroeiro);
  rodarComSeguranca('menu lateral (novas páginas)', iniciarNavegacaoDoMenuLateral);
  rodarComSeguranca('compartilhar site', iniciarCompartilharSite);
  rodarComSeguranca('google, planos e instalar o app', iniciarContaGooglePlanosEApp);
});

// ============================================================
//  ORAÇÕES DO DIA A DIA
// ============================================================
// As dez primeiras ficam nesta ordem porque o terço usa as posições
// (ORACOES[0] = Sinal da Cruz, [1] = Pai Nosso, [2] = Ave Maria,
// [3] = Glória, [4] = Credo, [5] = Salve Rainha). As novas entram
// depois.
//
// "nomes" são outros jeitos de chamar a mesma oração (inclusive em
// latim, inglês e espanhol), para a busca achar pelo nome. As
// situações de cada oração ficam em SITUACOES_DE_ORACAO, logo abaixo.
const ORACOES = [
  { id: 'sinal-da-cruz', titulo: 'Sinal da Cruz', nomes: ['persignar', 'benzer-se', 'persignação'], texto: 'Em nome do Pai, e do Filho, e do Espírito Santo. Amém.' },
  { id: 'pai-nosso', titulo: 'Pai Nosso', nomes: ['Oração do Senhor', 'Our Father', 'Padre Nuestro'], texto: 'Pai Nosso que estais nos Céus,\nsantificado seja o Vosso nome,\nvenha a nós o Vosso reino,\nseja feita a Vossa vontade,\nassim na terra como no Céu.\nO pão nosso de cada dia nos dai hoje,\nperdoai-nos as nossas ofensas,\nassim como nós perdoamos a quem nos tem ofendido,\ne não nos deixeis cair em tentação,\nmas livrai-nos do mal.\nAmém.' },
  { id: 'ave-maria', titulo: 'Ave Maria', nomes: ['Saudação angélica', 'Hail Mary', 'Dios te salve, María'], texto: 'Ave Maria, cheia de graça, o Senhor é convosco,\nbendita sois vós entre as mulheres,\ne bendito é o fruto do vosso ventre, Jesus.\nSanta Maria, Mãe de Deus,\nrogai por nós, pecadores,\nagora e na hora da nossa morte.\nAmém.' },
  { id: 'gloria', titulo: 'Glória ao Pai', nomes: ['Glória', 'Doxologia', 'Glory Be', 'Gloria al Padre'], texto: 'Glória ao Pai, e ao Filho, e ao Espírito Santo,\ncomo era no princípio, agora e sempre.\nAmém.' },
  { id: 'credo', titulo: 'Credo dos Apóstolos', nomes: ['Creio', 'Símbolo dos Apóstolos', 'Profissão de fé', 'Creed', 'Credo'], texto: 'Creio em Deus Pai todo-poderoso, Criador do Céu e da Terra;\ne em Jesus Cristo, Seu único Filho, nosso Senhor,\nque foi concebido pelo poder do Espírito Santo,\nnasceu da Virgem Maria,\npadeceu sob Pôncio Pilatos, foi crucificado, morto e sepultado,\ndesceu à mansão dos mortos,\nressuscitou ao terceiro dia,\nsubiu aos Céus,\nestá sentado à direita de Deus Pai todo-poderoso,\ndonde há de vir a julgar os vivos e os mortos.\nCreio no Espírito Santo,\nna Santa Igreja Católica,\nna comunhão dos Santos,\nna remissão dos pecados,\nna ressurreição da carne,\nna vida eterna.\nAmém.' },
  { id: 'salve-rainha', titulo: 'Salve Rainha', nomes: ['Salve Regina', 'Hail Holy Queen', 'Dios te salve, Reina y Madre'], texto: 'Salve, Rainha, Mãe de misericórdia,\nvida, doçura e esperança nossa, salve!\nA vós bradamos, os degredados filhos de Eva.\nA vós suspiramos, gemendo e chorando\nneste vale de lágrimas.\nEia, pois, advogada nossa,\nesses vossos olhos misericordiosos a nós volvei.\nE depois deste desterro, mostrai-nos Jesus,\nbendito fruto do vosso ventre, ó clemente, ó piedosa,\nó doce sempre Virgem Maria.\nRogai por nós, Santa Mãe de Deus,\npara que sejamos dignos das promessas de Cristo.\nAmém.' },
  { id: 'anjo-da-guarda', titulo: 'Anjo da Guarda', nomes: ['Angele Dei', 'Anjo guardião', 'Guardian Angel', 'Ángel de la Guarda'], texto: 'Anjo do Senhor, meu zeloso guarda,\npois a bondade divina me confiou a vós,\neu vos agradeço e vos peço que me assistais e defendais\nem todos os perigos, e me alcanceis o perdão de Deus.\nAmém.' },
  { id: 'ato-de-contricao', titulo: 'Ato de Contrição', nomes: ['Contrição', 'Act of Contrition', 'Acto de contrición'], texto: 'Meu Deus, eu me arrependo de todo o coração de todos os meus pecados,\ne os detesto porque, pecando, mereci Vossos castigos,\ne, sobretudo, porque Vos ofendi a Vós, que sois infinitamente bom e digno de ser amado sobre todas as coisas.\nProponho firmemente, com o auxílio da Vossa graça,\nnão mais pecar e evitar as ocasiões de pecado.\nAmém.' },
  { id: 'angelus', titulo: 'Angelus (O Anjo do Senhor)', nomes: ['Angelus', 'O Anjo do Senhor', 'Ângelus'], texto: 'O Anjo do Senhor anunciou a Maria, e ela concebeu do Espírito Santo. Ave Maria...\nEis aqui a serva do Senhor. Faça-se em mim segundo a Vossa palavra. Ave Maria...\nE o Verbo se fez carne. E habitou entre nós. Ave Maria...\nRogai por nós, Santa Mãe de Deus, para que sejamos dignos das promessas de Cristo.\nOremos: Infundi, Senhor, a Vossa graça em nossas almas, para que nós, que pela anunciação do Anjo conhecemos a encarnação de Vosso Filho, pela Sua paixão e cruz sejamos conduzidos à glória da ressurreição. Por Cristo, Senhor Nosso. Amém.' },
  { id: 'sao-miguel', titulo: 'Oração a São Miguel Arcanjo', nomes: ['São Miguel', 'Miguel Arcanjo', 'Saint Michael', 'San Miguel'], texto: 'São Miguel Arcanjo, defendei-nos no combate,\nsede o nosso refúgio contra as maldades e ciladas do demônio.\nOrdene-lhe Deus, instantemente o pedimos,\ne vós, príncipe da milícia celeste,\ncom o poder que Deus vos conferiu,\nprecipitai no inferno a Satanás\ne a todos os espíritos malignos,\nque andam pelo mundo para perder as almas.\nAmém.' },
  { id: 'santo-anjo', titulo: 'Santo Anjo do Senhor', nomes: ['Santo Anjo', 'Anjo da guarda (versão curta)'], texto: 'Santo Anjo do Senhor,\nmeu zeloso guardador,\nse a ti me confiou a piedade divina,\nsempre me rege, me guarda,\nme governa e me ilumina.\nAmém.' },
  { id: 'vinde-espirito-santo', titulo: 'Vinde, Espírito Santo', nomes: ['Veni Sancte Spiritus', 'Oração ao Espírito Santo', 'Ven, Espíritu Santo'], texto: 'Vinde, Espírito Santo, enchei os corações dos vossos fiéis\ne acendei neles o fogo do vosso amor.\nEnviai o vosso Espírito e tudo será criado,\ne renovareis a face da terra.\n\nOremos: Ó Deus, que instruístes os corações dos vossos fiéis com a luz do Espírito Santo, fazei que apreciemos retamente todas as coisas segundo o mesmo Espírito e gozemos sempre da sua consolação. Por Cristo, Senhor nosso.\nAmém.' },
  { id: 'lembrai-vos', titulo: 'Lembrai-vos (Memorare)', nomes: ['Memorare', 'Lembrai-vos', 'Acordaos'], texto: 'Lembrai-vos, ó piíssima Virgem Maria,\nque nunca se ouviu dizer que algum daqueles que têm recorrido à vossa proteção,\nimplorado a vossa assistência e reclamado o vosso socorro,\nfosse por vós desamparado.\nAnimado eu, pois, com igual confiança,\na vós, ó Virgem entre todas singular, como a Mãe recorro,\nde vós me valho e, gemendo sob o peso dos meus pecados,\nme prostro a vossos pés.\nNão desprezeis as minhas súplicas, ó Mãe do Verbo de Deus humanado,\nmas dignai-vos de as ouvir propícia e de me alcançar o que vos rogo.\nAmém.' },
  { id: 'oracao-pela-paz', titulo: 'Oração pela paz (de São Francisco)', nomes: ['Oração de São Francisco', 'Instrumento de vossa paz'], nota: 'É tradicionalmente atribuída a São Francisco de Assis e combina com o espírito dele, mas o texto que conhecemos foi publicado só no começo do século XX.', texto: 'Senhor, fazei de mim um instrumento de vossa paz.\nOnde houver ódio, que eu leve o amor;\nonde houver ofensa, que eu leve o perdão;\nonde houver discórdia, que eu leve a união;\nonde houver dúvida, que eu leve a fé;\nonde houver erro, que eu leve a verdade;\nonde houver desespero, que eu leve a esperança;\nonde houver tristeza, que eu leve a alegria;\nonde houver trevas, que eu leve a luz.\nÓ Mestre, fazei que eu procure mais\nconsolar que ser consolado;\ncompreender que ser compreendido;\namar que ser amado.\nPois é dando que se recebe,\né perdoando que se é perdoado,\ne é morrendo que se vive para a vida eterna.' },
  { id: 'alma-de-cristo', titulo: 'Alma de Cristo', nomes: ['Anima Christi', 'Oração depois da Comunhão'], texto: 'Alma de Cristo, santificai-me.\nCorpo de Cristo, salvai-me.\nSangue de Cristo, inebriai-me.\nÁgua do lado de Cristo, lavai-me.\nPaixão de Cristo, confortai-me.\nÓ bom Jesus, ouvi-me.\nDentro de vossas chagas, escondei-me.\nNão permitais que eu me separe de vós.\nDo espírito maligno, defendei-me.\nNa hora da minha morte, chamai-me,\ne mandai-me ir para vós,\npara que com os vossos santos vos louve\npor todos os séculos dos séculos.\nAmém.' },
  { id: 'antes-das-refeicoes', titulo: 'Bênção antes das refeições', nomes: ['Bênção da mesa', 'Oração antes de comer', 'Benedic Domine'], texto: 'Abençoai-nos, Senhor,\na nós e a estes dons\nque da vossa bondade vamos receber.\nPor Cristo, Senhor nosso.\nAmém.' },
  { id: 'descanso-eterno', titulo: 'Pelos falecidos (Descanso eterno)', nomes: ['Requiem aeternam', 'Oração pelos mortos', 'Descanso eterno'], nota: 'Para uma só pessoa: "Dai-lhe, Senhor, o eterno descanso, e a luz perpétua o (a) ilumine. Descanse em paz. Amém."', texto: 'Dai-lhes, Senhor, o eterno descanso,\ne a luz perpétua os ilumine.\nDescansem em paz.\nAmém.' },
  { id: 'consagracao-nossa-senhora', titulo: 'Consagração a Nossa Senhora', nomes: ['Consagração a Maria'], texto: 'Ó minha Senhora e também minha Mãe,\neu me ofereço inteiramente todo a vós,\ne em prova da minha devoção\neu vos dou neste dia meus olhos, meus ouvidos, minha boca, meu coração\ne inteiramente todo o meu ser.\nE porque assim sou vosso, ó incomparável Mãe,\nguardai-me e defendei-me como coisa e propriedade vossa.\nAmém.' },
  { id: 'terco-da-misericordia', titulo: 'Terço da Misericórdia', nomes: ['Terço da Divina Misericórdia', 'Coroinha da Misericórdia', 'Chaplet of Divine Mercy', 'Coronilla de la Misericordia', 'Eterno Pai'], acao: 'misericordia', texto: 'Jesus o ensinou a Santa Faustina Kowalska. Reza-se com as contas do terço comum, de preferência às três da tarde, a Hora da Misericórdia.\n\nNas contas grandes: Eterno Pai, eu Vos ofereço o Corpo e o Sangue, a Alma e a Divindade de Vosso diletíssimo Filho, Nosso Senhor Jesus Cristo, em expiação dos nossos pecados e dos do mundo inteiro.\n\nNas contas pequenas: Pela Sua dolorosa Paixão, tende misericórdia de nós e do mundo inteiro.\n\nNo fim, três vezes: Deus Santo, Deus Forte, Deus Imortal, tende piedade de nós e do mundo inteiro.' },
  { id: 'terco-mariano', titulo: 'Terço (Rosário)', nomes: ['Terço', 'Rosário', 'Santo Terço', 'Rezar o terço', 'Rosary', 'Rosario'], acao: 'terco', texto: 'Cinco dezenas, uma para cada mistério da vida de Jesus e de Maria: em cada uma, um Pai Nosso, dez Ave-Marias e um Glória. O site sugere os mistérios do dia e reza com você, passo a passo.' },
];

// Situações da vida e as orações que mais combinam com cada uma, da
// mais indicada para a menos. As palavras são as que as pessoas
// costumam digitar; acentos e maiúsculas não importam.
const SITUACOES_DE_ORACAO = [
  { rotulo: 'Medo e proteção', termos: ['medo', 'assustado', 'assustada', 'susto', 'pavor', 'pânico', 'perigo', 'proteção', 'proteger', 'protege', 'defesa', 'defender', 'livrar', 'livramento', 'maldade', 'mal', 'inimigo', 'demônio', 'diabo', 'satanás', 'tentação', 'batalha espiritual', 'combate', 'inveja', 'olho gordo', 'mau-olhado', 'assalto', 'violência', 'ameaça'], itens: ['sao-miguel', 'santo-anjo', 'anjo-da-guarda'] },
  { rotulo: 'Antes de dormir', termos: ['dormir', 'noite', 'sono', 'insônia', 'deitar', 'cama', 'pesadelo', 'boa noite', 'antes de dormir'], itens: ['santo-anjo', 'anjo-da-guarda', 'ato-de-contricao'] },
  { rotulo: 'Começar o dia', termos: ['manhã', 'acordar', 'acordei', 'levantar', 'bom dia', 'começar o dia', 'início do dia', 'oferecer o dia'], itens: ['sinal-da-cruz', 'consagracao-nossa-senhora', 'pai-nosso'] },
  { rotulo: 'Pedir perdão', termos: ['perdão', 'pecado', 'pecados', 'pequei', 'arrependimento', 'arrependido', 'arrependida', 'culpa', 'culpado', 'culpada', 'errei', 'confissão', 'confessar', 'remorso', 'contrição'], itens: ['ato-de-contricao', 'pai-nosso', 'terco-da-misericordia'] },
  { rotulo: 'Paz e perdoar alguém', termos: ['paz', 'briga', 'brigas', 'brigamos', 'discussão', 'raiva', 'ódio', 'rancor', 'mágoa', 'magoado', 'magoada', 'ofensa', 'perdoar', 'reconciliação', 'conflito', 'guerra', 'discórdia', 'vingança', 'inimizade'], itens: ['oracao-pela-paz', 'pai-nosso'] },
  { rotulo: 'Agradecer', termos: ['obrigado', 'obrigada', 'agradecer', 'agradecimento', 'gratidão', 'grato', 'grata', 'louvor', 'louvar', 'graça alcançada', 'graça recebida'], itens: ['gloria', 'consagracao-nossa-senhora', 'pai-nosso'] },
  { rotulo: 'Fé e dúvidas', termos: ['fé', 'dúvida', 'dúvidas', 'crer', 'acreditar', 'creio', 'descrença', 'incrédulo'], itens: ['credo', 'vinde-espirito-santo'] },
  { rotulo: 'Nossa Senhora', termos: ['nossa senhora', 'maria', 'virgem', 'mãe de deus', 'mãe do céu', 'mariana', 'mãezinha do céu'], itens: ['ave-maria', 'salve-rainha', 'lembrai-vos', 'consagracao-nossa-senhora', 'terco-mariano', 'angelus'] },
  { rotulo: 'Causas difíceis e urgentes', termos: ['difícil', 'impossível', 'causa impossível', 'causa difícil', 'urgente', 'urgência', 'desespero', 'desesperado', 'desesperada', 'socorro', 'ajuda', 'milagre', 'graça', 'súplica', 'pedido'], itens: ['lembrai-vos', 'terco-da-misericordia', 'pai-nosso'] },
  { rotulo: 'Tristeza e consolo', termos: ['triste', 'tristeza', 'chorar', 'choro', 'chorando', 'lágrimas', 'sofrimento', 'sofrendo', 'dor', 'consolo', 'consolação', 'depressão', 'deprimido', 'deprimida', 'solidão', 'sozinho', 'sozinha', 'abandono', 'desânimo', 'desanimado', 'desanimada'], itens: ['salve-rainha', 'lembrai-vos', 'terco-da-misericordia'] },
  { rotulo: 'Ansiedade e confiança', termos: ['ansiedade', 'ansioso', 'ansiosa', 'preocupação', 'preocupado', 'preocupada', 'nervoso', 'nervosa', 'estresse', 'angústia', 'angustiado', 'aflição', 'aflito', 'aflita', 'insegurança', 'confiança', 'confiar', 'entregar'], itens: ['terco-da-misericordia', 'lembrai-vos', 'pai-nosso'] },
  { rotulo: 'Pelos doentes', termos: ['doente', 'doença', 'enfermo', 'enferma', 'enfermidade', 'hospital', 'internado', 'internada', 'cirurgia', 'operação', 'cura', 'curar', 'saúde', 'câncer', 'tratamento', 'exame médico'], itens: ['terco-da-misericordia', 'lembrai-vos', 'ave-maria'] },
  { rotulo: 'Falecidos e luto', termos: ['morte', 'morrer', 'morreu', 'morreram', 'faleceu', 'falecimento', 'falecido', 'falecida', 'defunto', 'finado', 'finados', 'luto', 'velório', 'enterro', 'sepultamento', 'alma', 'almas', 'purgatório', 'missa de sétimo dia', 'agonia', 'hora da morte', 'moribundo'], itens: ['descanso-eterno', 'terco-da-misericordia', 'ave-maria'] },
  { rotulo: 'Antes das refeições', termos: ['comida', 'comer', 'refeição', 'refeições', 'almoço', 'almoçar', 'jantar', 'janta', 'café da manhã', 'alimento', 'alimentos', 'mesa', 'antes de comer'], itens: ['antes-das-refeicoes', 'pai-nosso'] },
  { rotulo: 'Estudos e decisões', termos: ['estudo', 'estudar', 'estudos', 'prova', 'provas', 'exame', 'vestibular', 'enem', 'concurso', 'faculdade', 'escola', 'entrevista', 'decisão', 'decidir', 'escolha', 'discernimento', 'sabedoria', 'inteligência', 'iluminar', 'luz'], itens: ['vinde-espirito-santo'] },
  { rotulo: 'Missa e Comunhão', termos: ['comunhão', 'comungar', 'eucaristia', 'missa', 'hóstia', 'depois da comunhão', 'adoração', 'santíssimo'], itens: ['alma-de-cristo', 'angelus'] },
  { rotulo: 'Espírito Santo', termos: ['espírito santo', 'pentecostes', 'dons', 'vinde espírito'], itens: ['vinde-espirito-santo'] },
  { rotulo: 'Hora da Misericórdia (15h)', termos: ['misericórdia', 'divina misericórdia', 'três da tarde', '3 da tarde', '15h', '15 horas', '15 00', 'hora da misericórdia', 'jesus eu confio', 'confio em vós', 'faustina'], itens: ['terco-da-misericordia'] },
  { rotulo: 'Ângelus (6h, 12h e 18h)', termos: ['meio dia', 'meio-dia', '12h', '18h', '6h', 'seis da tarde', 'seis da manhã', 'anunciação', 'encarnação'], itens: ['angelus'] },
  { rotulo: 'Viagem', termos: ['viagem', 'viajar', 'viajando', 'estrada', 'carro', 'ônibus', 'avião', 'dirigir', 'motorista', 'trânsito'], itens: ['santo-anjo', 'anjo-da-guarda', 'sao-miguel'] },
  { rotulo: 'Crianças e família', termos: ['criança', 'crianças', 'filho', 'filhos', 'filha', 'filhas', 'bebê', 'neto', 'neta', 'netos', 'família'], itens: ['anjo-da-guarda', 'santo-anjo', 'consagracao-nossa-senhora'] },
  { rotulo: 'Trabalho e sustento', termos: ['trabalho', 'emprego', 'desempregado', 'desempregada', 'desemprego', 'dinheiro', 'dívida', 'dívidas', 'contas', 'sustento', 'necessidade', 'fome', 'pão'], itens: ['pai-nosso', 'lembrai-vos'] },
  { rotulo: 'Santíssima Trindade', termos: ['trindade', 'santíssima trindade', 'deus pai', 'pai filho e espírito santo'], itens: ['gloria', 'sinal-da-cruz', 'credo'] },
];

// Atalhos que aparecem embaixo da caixa de busca
const SUGESTOES_DE_BUSCA_DE_ORACAO = ['Estou com medo', 'Para dormir', 'Pedir perdão', 'Agradecer', 'Alguém doente', 'Ansiedade', 'Pelos falecidos', 'Antes de comer', 'Prova ou decisão', 'Nossa Senhora'];

let itensDeOracaoParaBusca = null;
let situacoesDeOracaoParaBusca = null;

// Lista das orações da mais indicada para a menos (no máximo "limite")
function buscarOracoes(consulta, limite) {
  if (typeof BuscaInteligente === 'undefined') return [];
  if (!itensDeOracaoParaBusca) {
    itensDeOracaoParaBusca = BuscaInteligente.prepararItens(ORACOES.map((o) => ({
      id: o.id, nomes: [o.titulo].concat(o.nomes || []), texto: o.texto, oracao: o,
    })));
    situacoesDeOracaoParaBusca = BuscaInteligente.prepararSituacoes(SITUACOES_DE_ORACAO);
  }
  return BuscaInteligente.buscar(consulta, itensDeOracaoParaBusca, situacoesDeOracaoParaBusca)
    .slice(0, limite || 4)
    .map((r) => ({ oracao: r.item.oracao, motivo: r.motivo, pontos: r.pontos }));
}

function escaparTextoDeOracao(texto) {
  return String(texto).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

function botaoDaAcaoDaOracao(oracao) {
  if (oracao.acao === 'misericordia') return '<button type="button" class="filter-btn active oracao-acao" data-acao="misericordia">Rezar passo a passo</button>';
  if (oracao.acao === 'terco') return '<button type="button" class="filter-btn active oracao-acao" data-acao="terco">Rezar o terço passo a passo</button>';
  return '';
}

function htmlDaOracao(oracao, indice, extra) {
  const motivo = extra && extra.motivo ? `<span class="oracao-motivo">Para: ${escaparTextoDeOracao(extra.motivo)}</span>` : '';
  const selo = extra && extra.melhor ? '<span class="oracao-selo">Mais indicada</span>' : '';
  return `
    <div class="oracao-item${extra && extra.aberta ? ' aberta' : ''}${extra && extra.melhor ? ' oracao-destaque' : ''}" data-oracao="${oracao.id}" ${indice !== null ? `id="oracao-${indice}"` : ''}>
      <button class="oracao-pergunta" aria-expanded="${extra && extra.aberta ? 'true' : 'false'}">
        <span class="oracao-titulo-linha">${selo}<span>${escaparTextoDeOracao(oracao.titulo)}</span>${motivo}</span>
        <svg class="oracao-seta" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
      </button>
      <div class="oracao-corpo">
        <p class="oracao-texto">${escaparTextoDeOracao(oracao.texto)}</p>
        ${oracao.nota ? `<p class="oracao-nota">${escaparTextoDeOracao(oracao.nota)}</p>` : ''}
        ${botaoDaAcaoDaOracao(oracao)}
      </div>
    </div>`;
}

function ligarItensDeOracao(container) {
  container.querySelectorAll('.oracao-item').forEach(item => {
    const botao = item.querySelector('.oracao-pergunta');
    botao.addEventListener('click', () => {
      const aberta = item.classList.toggle('aberta');
      botao.setAttribute('aria-expanded', aberta ? 'true' : 'false');
    });
  });
  container.querySelectorAll('.oracao-acao').forEach(botao => {
    botao.addEventListener('click', () => {
      if (botao.dataset.acao === 'misericordia') abrirTerco('misericordia');
      else abrirTerco(null);
    });
  });
}

function mostrarResultadoDaBuscaDeOracao(consulta) {
  const area = document.getElementById('oracao-resultado');
  if (!area) return;
  const texto = consulta.trim();
  if (!texto) { area.innerHTML = ''; return; }
  const achadas = buscarOracoes(texto, 4);
  if (!achadas.length) {
    area.innerHTML = `
      <div class="oracao-sem-resultado">
        <p>Não encontrei uma oração para "${escaparTextoDeOracao(texto)}". Tente contar com outras palavras (por exemplo: "medo", "doença", "agradecer") ou pergunte à Lumina.</p>
        <button type="button" class="btn-ask-ai" id="oracao-perguntar-lumina">Perguntar à Lumina</button>
      </div>`;
    const botao = document.getElementById('oracao-perguntar-lumina');
    if (botao) botao.addEventListener('click', () => {
      mudarDeView('view-ia');
      setTimeout(() => {
        const campo = document.getElementById('lumina-input');
        if (campo) { campo.value = `Que oração posso rezar para: ${texto}?`; campo.focus(); }
      }, 300);
    });
    return;
  }
  const [melhor, ...outras] = achadas;
  area.innerHTML = `
    ${htmlDaOracao(melhor.oracao, null, { melhor: true, aberta: true, motivo: melhor.motivo })}
    ${outras.length ? `<p class="oracao-outras-titulo">Também podem ajudar</p>${outras.map(r => htmlDaOracao(r.oracao, null, { motivo: r.motivo })).join('')}` : ''}`;
  ligarItensDeOracao(area);
}

function iniciarPaginaDeOracoes() {
  const container = document.getElementById('lista-oracoes');
  if (!container) return;

  container.innerHTML = ORACOES.map((o, i) => htmlDaOracao(o, i, null)).join('');
  ligarItensDeOracao(container);

  const campo = document.getElementById('oracao-busca');
  const sugestoes = document.getElementById('oracao-sugestoes');
  if (campo) {
    let espera = null;
    campo.addEventListener('input', () => {
      clearTimeout(espera);
      espera = setTimeout(() => mostrarResultadoDaBuscaDeOracao(campo.value), 150);
    });
    campo.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') { clearTimeout(espera); mostrarResultadoDaBuscaDeOracao(campo.value); }
    });
  }
  if (sugestoes && campo) {
    sugestoes.innerHTML = SUGESTOES_DE_BUSCA_DE_ORACAO.map(s => `<button type="button" class="busca-atalho">${s}</button>`).join('');
    sugestoes.querySelectorAll('.busca-atalho').forEach(botao => {
      botao.addEventListener('click', () => {
        campo.value = botao.textContent;
        mostrarResultadoDaBuscaDeOracao(campo.value);
      });
    });
  }

  const btnVoltar = document.getElementById('btn-back-oracoes');
  if (btnVoltar) btnVoltar.addEventListener('click', () => mudarDeView('view-home'));
}

// ============================================================
//  TERÇO GUIADO
// ============================================================
const MISTERIOS_DO_TERCO = {
  gozosos: {
    nome: 'Mistérios Gozosos',
    dias: 'Segunda-feira e Sábado',
    lista: [
      { titulo: '1º Mistério Gozoso — A Anunciação', texto: 'O anjo Gabriel anuncia a Maria que ela será a mãe do Salvador, e ela responde com um "sim" total: "Eis aqui a serva do Senhor". Peçamos a graça da humildade.' },
      { titulo: '2º Mistério Gozoso — A Visitação', texto: 'Maria visita sua prima Isabel, grávida de João Batista, e a criança salta de alegria no ventre. Peçamos a graça da caridade com o próximo.' },
      { titulo: '3º Mistério Gozoso — A Natividade', texto: 'Jesus nasce em Belém, numa manjedoura, na mais simples pobreza. Peçamos a graça do desapego e da simplicidade de coração.' },
      { titulo: '4º Mistério Gozoso — A Apresentação no Templo', texto: 'Maria e José apresentam o Menino Jesus no Templo, cumprindo a Lei, e o ancião Simeão o reconhece como o Salvador. Peçamos a graça da obediência.' },
      { titulo: '5º Mistério Gozoso — O Encontro de Jesus no Templo', texto: 'Depois de perdê-lo por três dias, Maria e José encontram o Menino Jesus ensinando os doutores no Templo. Peçamos a graça de buscar sempre a Deus.' },
    ],
  },
  dolorosos: {
    nome: 'Mistérios Dolorosos',
    dias: 'Terça-feira e Sexta-feira',
    lista: [
      { titulo: '1º Mistério Doloroso — A Agonia no Horto', texto: 'Jesus, no Horto das Oliveiras, sua sangue diante da angústia da paixão que se aproxima, mas se entrega à vontade do Pai. Peçamos a graça da confiança em Deus.' },
      { titulo: '2º Mistério Doloroso — A Flagelação', texto: 'Jesus é açoitado cruelmente por ordem de Pilatos. Peçamos a graça da pureza e do domínio dos sentidos.' },
      { titulo: '3º Mistério Doloroso — A Coroação de Espinhos', texto: 'Os soldados zombam de Jesus, coroando-o de espinhos como "rei dos judeus". Peçamos a graça de suportar as humilhações com paciência.' },
      { titulo: '4º Mistério Doloroso — Jesus Carrega a Cruz', texto: 'Jesus carrega a cruz pesada até o Calvário, caindo e se levantando. Peçamos a graça da paciência nas provações da vida.' },
      { titulo: '5º Mistério Doloroso — A Crucificação e Morte de Jesus', texto: 'Jesus morre na cruz por amor a cada um de nós, perdoando até seus algozes. Peçamos a graça de saber perdoar como Ele perdoou.' },
    ],
  },
  gloriosos: {
    nome: 'Mistérios Gloriosos',
    dias: 'Quarta-feira e Domingo',
    lista: [
      { titulo: '1º Mistério Glorioso — A Ressurreição', texto: 'Jesus ressuscita ao terceiro dia, vencendo definitivamente a morte. Peçamos a graça da fé viva.' },
      { titulo: '2º Mistério Glorioso — A Ascensão', texto: 'Jesus sobe aos Céus diante dos apóstolos, prometendo enviar o Espírito Santo. Peçamos a graça da esperança na vida eterna.' },
      { titulo: '3º Mistério Glorioso — A Descida do Espírito Santo', texto: 'O Espírito Santo desce sobre Maria e os apóstolos em Pentecostes, dando início à missão da Igreja. Peçamos os dons do Espírito Santo.' },
      { titulo: '4º Mistério Glorioso — A Assunção de Nossa Senhora', texto: 'Maria é levada, de corpo e alma, à glória do Céu. Peçamos a graça de uma vida voltada para as coisas do alto.' },
      { titulo: '5º Mistério Glorioso — A Coroação de Nossa Senhora', texto: 'Maria é coroada Rainha do Céu e da Terra. Peçamos a graça de sermos fiéis a Cristo até o fim, como ela foi.' },
    ],
  },
  luminosos: {
    nome: 'Mistérios Luminosos',
    dias: 'Quinta-feira',
    lista: [
      { titulo: '1º Mistério Luminoso — O Batismo de Jesus no Jordão', texto: 'Jesus é batizado por João Batista, e o Pai o proclama "Filho amado" enquanto o Espírito desce como pomba. Peçamos a graça de viver o nosso próprio batismo.' },
      { titulo: '2º Mistério Luminoso — As Bodas de Caná', texto: 'Jesus realiza seu primeiro milagre a pedido de Maria, transformando água em vinho. Peçamos a graça de confiar na intercessão de Maria.' },
      { titulo: '3º Mistério Luminoso — O Anúncio do Reino de Deus', texto: 'Jesus anuncia o Reino de Deus e chama todos à conversão e à misericórdia. Peçamos a graça de uma conversão sincera.' },
      { titulo: '4º Mistério Luminoso — A Transfiguração', texto: 'Jesus se transfigura diante de Pedro, Tiago e João, revelando sua glória divina. Peçamos a graça de reconhecer a presença de Deus em nossa vida.' },
      { titulo: '5º Mistério Luminoso — A Instituição da Eucaristia', texto: 'Na Última Ceia, Jesus institui a Eucaristia, entregando-se como pão e vinho. Peçamos a graça de amar cada vez mais a Eucaristia.' },
    ],
  },
};

// Terço da Misericórdia, como Jesus o ensinou a Santa Faustina
// (Diário, 476): reza-se com as contas do terço comum. Um Pai Nosso,
// uma Ave Maria e o Credo; nas contas grandes, "Eterno Pai..."; nas
// pequenas, "Pela Sua dolorosa Paixão..."; no fim, três vezes "Deus
// Santo...". As orações de abertura (Diário, 1319 e 187) e a final
// (Diário, 950) são costume de muitos grupos e vêm marcadas como
// opcionais.
const TERCO_DA_MISERICORDIA = {
  nome: 'Terço da Misericórdia',
  dias: 'Hora da Misericórdia · 15h',
  descricao: 'Ensinado por Jesus a Santa Faustina. Reza-se com as contas do terço comum.',
  oracoes: {
    expirastes: 'Expirastes, Jesus, mas a fonte de vida jorrou para as almas, e o oceano de misericórdia se abriu para o mundo inteiro. Ó fonte de vida, insondável misericórdia divina, envolvei o mundo inteiro e derramai-Vos sobre nós.',
    sangueEAgua: 'Ó Sangue e Água, que jorrastes do Coração de Jesus como fonte de misericórdia para nós, eu confio em Vós!',
    eternoPai: 'Eterno Pai, eu Vos ofereço o Corpo e o Sangue, a Alma e a Divindade de Vosso diletíssimo Filho, Nosso Senhor Jesus Cristo, em expiação dos nossos pecados e dos do mundo inteiro.',
    dolorosaPaixao: 'Pela Sua dolorosa Paixão, tende misericórdia de nós e do mundo inteiro.',
    deusSanto: 'Deus Santo, Deus Forte, Deus Imortal, tende piedade de nós e do mundo inteiro.',
    oracaoFinal: 'Ó Deus Eterno, em quem a misericórdia é infinita e o tesouro da compaixão inesgotável, olhai-nos com bondade e aumentai em nós a Vossa misericórdia, para que nos momentos difíceis não desesperemos nem desanimemos, mas, com grande confiança, nos submetamos à Vossa santa vontade, que é o próprio Amor e Misericórdia.',
  },
};

function misterioSugeridoHoje() {
  const diaSemana = new Date().getDay(); // 0=domingo ... 6=sábado
  if (diaSemana === 1 || diaSemana === 6) return 'gozosos';
  if (diaSemana === 2 || diaSemana === 5) return 'dolorosos';
  if (diaSemana === 4) return 'luminosos';
  return 'gloriosos'; // quarta e domingo
}

// "contas": quantas vezes a oração do passo se repete (o site mostra
// as bolinhas para a pessoa ir marcando)
function montarPassosDoTerco(chaveMisterio) {
  if (chaveMisterio === 'misericordia') return montarPassosDoTercoDaMisericordia();
  const conjunto = MISTERIOS_DO_TERCO[chaveMisterio];
  const passos = [
    { titulo: 'Sinal da Cruz', texto: ORACOES[0].texto },
    { titulo: 'Credo dos Apóstolos', texto: ORACOES[4].texto },
    { titulo: 'Pai Nosso', texto: ORACOES[1].texto },
    { titulo: '3 Ave-Marias (fé, esperança e caridade)', texto: ORACOES[2].texto, contas: 3 },
    { titulo: 'Glória ao Pai', texto: ORACOES[3].texto },
  ];

  conjunto.lista.forEach((misterio) => {
    passos.push({ titulo: misterio.titulo, texto: misterio.texto });
    passos.push({ titulo: 'Pai Nosso', texto: ORACOES[1].texto });
    passos.push({ titulo: '10 Ave-Marias', texto: ORACOES[2].texto, contas: 10 });
    passos.push({ titulo: 'Glória ao Pai + Jaculatória', texto: `${ORACOES[3].texto}\n\nÓ meu Jesus, perdoai-nos, livrai-nos do fogo do inferno, levai as almas todas para o Céu, principalmente as que mais precisarem.` });
  });

  passos.push({ titulo: 'Salve Rainha', texto: ORACOES[5].texto });
  passos.push({ titulo: 'Para encerrar', texto: 'Em nome do Pai, e do Filho, e do Espírito Santo. Amém.\n\nQue Nossa Senhora abençoe o seu dia.' });

  return passos;
}

function montarPassosDoTercoDaMisericordia() {
  const o = TERCO_DA_MISERICORDIA.oracoes;
  const passos = [
    { titulo: 'Sinal da Cruz', texto: ORACOES[0].texto },
    { titulo: 'Oração inicial (opcional)', texto: o.expirastes },
    { titulo: 'Ó Sangue e Água (três vezes, opcional)', texto: o.sangueEAgua, contas: 3 },
    { titulo: 'Pai Nosso', texto: ORACOES[1].texto },
    { titulo: 'Ave Maria', texto: ORACOES[2].texto },
    { titulo: 'Credo dos Apóstolos', texto: ORACOES[4].texto },
  ];
  for (let dezena = 1; dezena <= 5; dezena++) {
    passos.push({ titulo: `${dezena}ª dezena — conta grande`, texto: o.eternoPai });
    passos.push({ titulo: `${dezena}ª dezena — dez contas pequenas`, texto: o.dolorosaPaixao, contas: 10 });
  }
  passos.push({ titulo: 'Para concluir (três vezes)', texto: o.deusSanto, contas: 3 });
  passos.push({ titulo: 'Oração final (opcional)', texto: o.oracaoFinal });
  passos.push({ titulo: 'Jesus, eu confio em Vós!', texto: 'Jesus, eu confio em Vós!\n\nEm nome do Pai, e do Filho, e do Espírito Santo. Amém.' });
  return passos;
}

let passosTercoAtual = [];
let indicePassoTerco = 0;
let contasMarcadas = 0;

function renderizarContasDoPasso(passo) {
  const area = document.getElementById('terco-contas');
  if (!area) return;
  contasMarcadas = 0;
  if (!passo.contas) {
    area.hidden = true;
    area.innerHTML = '';
    return;
  }
  area.hidden = false;
  area.innerHTML = `
    <div class="terco-contas-fila">${Array.from({ length: passo.contas }, (_, i) => `<button type="button" class="terco-conta" data-conta="${i}" aria-label="Conta ${i + 1} de ${passo.contas}"></button>`).join('')}</div>
    <p class="terco-contas-dica" aria-live="polite">Toque numa conta a cada oração (0 de ${passo.contas})</p>`;
  const atualizar = () => {
    area.querySelectorAll('.terco-conta').forEach((conta, i) => conta.classList.toggle('marcada', i < contasMarcadas));
    area.querySelector('.terco-contas-dica').textContent = contasMarcadas >= passo.contas
      ? `Pronto: ${passo.contas} de ${passo.contas}`
      : `Toque numa conta a cada oração (${contasMarcadas} de ${passo.contas})`;
  };
  area.querySelectorAll('.terco-conta').forEach((conta) => {
    conta.addEventListener('click', () => {
      const numero = Number(conta.dataset.conta) + 1;
      contasMarcadas = contasMarcadas === numero ? numero - 1 : numero;
      atualizar();
    });
  });
}

function renderizarPassoDoTerco() {
  const passo = passosTercoAtual[indicePassoTerco];
  document.getElementById('terco-passo-atual').textContent = indicePassoTerco + 1;
  document.getElementById('terco-passo-total').textContent = passosTercoAtual.length;
  document.getElementById('terco-titulo-passo').textContent = passo.titulo;
  document.getElementById('terco-texto-passo').textContent = passo.texto;
  renderizarContasDoPasso(passo);

  const btnAnterior = document.getElementById('terco-anterior');
  const btnProximo = document.getElementById('terco-proximo');
  btnAnterior.disabled = indicePassoTerco === 0;
  btnProximo.textContent = (indicePassoTerco === passosTercoAtual.length - 1) ? 'Concluir' : 'Próxima →';
}

function iniciarTerco(chaveMisterio) {
  passosTercoAtual = montarPassosDoTerco(chaveMisterio);
  indicePassoTerco = 0;
  const nome = chaveMisterio === 'misericordia' ? TERCO_DA_MISERICORDIA.nome : MISTERIOS_DO_TERCO[chaveMisterio].nome;
  const titulo = document.getElementById('terco-nome-rezando');
  if (titulo) titulo.textContent = nome;
  document.getElementById('terco-escolha').style.display = 'none';
  document.getElementById('terco-rezando').style.display = 'block';
  renderizarPassoDoTerco();
}

function voltarParaEscolhaDoTerco() {
  document.getElementById('terco-rezando').style.display = 'none';
  document.getElementById('terco-escolha').style.display = 'block';
}

// Abre a página do terço (vinda das Orações, por exemplo); com
// "misericordia", já começa o Terço da Misericórdia
function abrirTerco(chave) {
  voltarParaEscolhaDoTerco();
  mudarDeView('view-terco');
  if (chave) setTimeout(() => iniciarTerco(chave), 300);
}

function iniciarPaginaDoTerco() {
  const containerBotoes = document.getElementById('terco-botoes-misterio');
  if (!containerBotoes) return;

  const sugerido = misterioSugeridoHoje();
  containerBotoes.innerHTML = Object.entries(MISTERIOS_DO_TERCO).map(([chave, conjunto]) => `
    <button class="terco-btn-misterio ${chave === sugerido ? 'sugerido' : ''}" data-misterio="${chave}">
      <div class="nome">${conjunto.nome}</div>
      <div class="tag">${chave === sugerido ? 'Sugerido para hoje · ' : ''}${conjunto.dias}</div>
    </button>
  `).join('');

  const outros = document.getElementById('terco-outros');
  if (outros) {
    const agoraEhHoraDaMisericordia = new Date().getHours() === 15;
    outros.innerHTML = `
      <button class="terco-btn-misterio terco-btn-misericordia ${agoraEhHoraDaMisericordia ? 'sugerido' : ''}" data-misterio="misericordia">
        <div class="nome">${TERCO_DA_MISERICORDIA.nome}</div>
        <div class="descricao">${TERCO_DA_MISERICORDIA.descricao}</div>
        <div class="tag">${agoraEhHoraDaMisericordia ? 'Agora é a Hora da Misericórdia' : TERCO_DA_MISERICORDIA.dias}</div>
      </button>`;
  }

  document.querySelectorAll('#terco-escolha .terco-btn-misterio').forEach(btn => {
    btn.addEventListener('click', () => iniciarTerco(btn.dataset.misterio));
  });

  document.getElementById('terco-anterior').addEventListener('click', () => {
    if (indicePassoTerco > 0) { indicePassoTerco--; renderizarPassoDoTerco(); }
  });
  document.getElementById('terco-proximo').addEventListener('click', () => {
    if (indicePassoTerco < passosTercoAtual.length - 1) {
      indicePassoTerco++;
      renderizarPassoDoTerco();
    } else {
      voltarParaEscolhaDoTerco();
    }
  });
  document.getElementById('terco-sair').addEventListener('click', voltarParaEscolhaDoTerco);

  const btnVoltar = document.getElementById('btn-back-terco');
  if (btnVoltar) btnVoltar.addEventListener('click', () => {
    voltarParaEscolhaDoTerco();
    mudarDeView('view-home');
  });
}

// ============================================================
//  PADROEIRO DE... (buscar santo por necessidade/causa)
// ============================================================
// Cada tema junta as palavras que as pessoas usam para aquela
// necessidade e os santos do catálogo tradicionalmente invocados
// para ela (do mais conhecido para o menos). A busca entende erros de
// digitação e frases inteiras ("vou viajar amanhã"), e também acha um
// santo pelo nome.
const PADROEIROS = [
  { rotulo: 'Viagens e estradas', termos: ['viagem', 'viajar', 'viajante', 'estrada', 'motorista', 'trânsito', 'carro', 'caminhoneiro', 'ônibus', 'avião', 'turista', 'dirigir'], santos: ['cristovao', 'rafael'] },
  { rotulo: 'Saúde e doentes', termos: ['saúde', 'doença', 'doente', 'cura', 'curar', 'hospital', 'enfermeira', 'enfermeiro', 'enfermagem', 'médico', 'médica', 'cirurgia', 'internado', 'tratamento', 'câncer'], santos: ['rafael', 'camilo-lelis', 'joao-de-deus', 'cosme-damiao', 'charbel-makhlouf', 'bernadete'] },
  { rotulo: 'Gravidez e parto', termos: ['gravidez', 'grávida', 'gestante', 'gestação', 'parto', 'engravidar', 'bebê', 'nascimento', 'filho a caminho'], santos: ['gerardo-majela', 'gianna-molla', 'joaquim-ana'] },
  { rotulo: 'Trabalho e emprego', termos: ['trabalho', 'emprego', 'desemprego', 'desempregado', 'operário', 'trabalhador', 'serviço', 'entrevista de emprego', 'profissão'], santos: ['jose', 'jose-operario', 'josemaria-escriva'] },
  { rotulo: 'Dívidas e dificuldades financeiras', termos: ['dívida', 'dívidas', 'endividado', 'endividada', 'dinheiro', 'contas', 'pobreza', 'aluguel', 'falência'], santos: ['edwiges'] },
  { rotulo: 'Estudos e provas', termos: ['estudante', 'estudo', 'estudar', 'prova', 'provas', 'escola', 'universidade', 'faculdade', 'vestibular', 'enem', 'concurso'], santos: ['tomas-aquino', 'catarina-alexandria', 'alberto-magno'] },
  { rotulo: 'Causas impossíveis e urgentes', termos: ['causa impossível', 'impossível', 'causa difícil', 'desespero', 'urgente', 'urgência', 'desesperado', 'desesperada'], santos: ['judas-tadeu', 'rita-cassia', 'expedito'] },
  { rotulo: 'Família, mães e filhos', termos: ['família', 'mãe', 'mães', 'pai', 'filhos', 'filho', 'filha', 'casamento', 'lar', 'marido', 'esposa'], santos: ['sagrada-familia', 'jose', 'monica', 'gianna-molla'] },
  { rotulo: 'Internet e tecnologia', termos: ['internet', 'tecnologia', 'programador', 'computador', 'celular', 'informática'], santos: ['carlo-acutis', 'isidoro-sevilha'] },
  { rotulo: 'Música e canto', termos: ['músico', 'música', 'cantor', 'cantora', 'coral', 'canto', 'instrumento'], santos: ['cecilia'] },
  { rotulo: 'Jornalismo e comunicação', termos: ['jornalista', 'escritor', 'escritora', 'comunicação', 'imprensa', 'rádio'], santos: ['francisco-sales', 'gabriel', 'maximiliano-kolbe'] },
  { rotulo: 'Medo e proteção', termos: ['medo', 'proteção', 'perigo', 'proteger', 'defesa', 'violência', 'assalto', 'inimigo'], santos: ['miguel', 'jorge'] },
  { rotulo: 'Coisas perdidas', termos: ['perda de objeto', 'objeto perdido', 'perdi', 'perdido', 'achar', 'encontrar', 'sumiu'], santos: ['antonio-padua'] },
  { rotulo: 'Jovens', termos: ['juventude', 'jovem', 'jovens', 'adolescente', 'adolescentes'], santos: ['luis-gonzaga', 'domingos-savio', 'maria-goretti', 'teresa-dos-andes'] },
  { rotulo: 'Artistas', termos: ['artista', 'pintor', 'pintora', 'escultor', 'arte', 'desenho'], santos: ['lucas-evangelista'] },
  { rotulo: 'Justiça e advogados', termos: ['advogado', 'advogada', 'justiça', 'juiz', 'juíza', 'processo', 'tribunal', 'injustiça'], santos: ['tomas-more', 'raimundo-penafort'] },
  { rotulo: 'Professores e educação', termos: ['professor', 'professora', 'educador', 'educadora', 'ensino', 'educação', 'catequista', 'catequese'], santos: ['joao-batista-lasalle', 'joao-bosco', 'maria-mazzarello', 'roberto-belarmino'] },
  { rotulo: 'Pobres e caridade', termos: ['pobres', 'caridade', 'esmola', 'mendigo', 'morador de rua', 'fome', 'voluntário'], santos: ['vicente-paulo', 'dulce-pobres', 'martin-porres', 'teresa-calcuta', 'nha-chica', 'luis-orione'] },
  { rotulo: 'Animais', termos: ['animais', 'animal', 'bichos', 'pets', 'cachorro', 'gato'], santos: ['antao-grande', 'francisco-assis'] },
  { rotulo: 'Empregadas domésticas', termos: ['empregada doméstica', 'doméstica', 'diarista', 'faxineira', 'serviço doméstico'], santos: ['zita'] },
  { rotulo: 'Eucaristia e coroinhas', termos: ['eucaristia', 'comunhão', 'primeira comunhão', 'coroinha', 'coroinhas', 'adoração', 'missa', 'ministro da eucaristia'], santos: ['tarcisio', 'pedro-eymard', 'carlo-acutis'] },
  { rotulo: 'Paz e reconciliação', termos: ['paz', 'briga', 'conflito', 'guerra', 'reconciliação', 'discórdia', 'inimizade'], santos: ['isabel-portugal', 'francisco-assis'] },
  { rotulo: 'Hanseníase', termos: ['hanseníase', 'lepra', 'leproso'], santos: ['damiao-molokai'] },
  { rotulo: 'Pureza', termos: ['pureza', 'castidade'], santos: ['maria-goretti', 'albertina-berkenbrock'] },
  { rotulo: 'Olhos e visão', termos: ['olhos', 'olho', 'visão', 'vista', 'cegueira', 'cego', 'oculista'], santos: ['santa-luzia'] },
  { rotulo: 'Garganta', termos: ['garganta', 'dor de garganta', 'engasgo'], santos: ['sao-bras'] },
  { rotulo: 'Tempestades e raios', termos: ['tempestade', 'raio', 'raios', 'trovão', 'chuva forte'], santos: ['barbara'] },
  { rotulo: 'Soldados e atletas', termos: ['soldado', 'militar', 'policial', 'atleta', 'esporte', 'esportista'], santos: ['sebastiao', 'jorge'] },
  { rotulo: 'Padres e confissão', termos: ['padre', 'padres', 'sacerdote', 'pároco', 'confessor', 'confissão'], santos: ['joao-maria-vianney', 'leopoldo-mandic'] },
];

// Temas que aparecem como atalhos quando a busca está vazia
const TEMAS_EM_DESTAQUE_DO_PADROEIRO = ['Saúde e doentes', 'Viagens e estradas', 'Trabalho e emprego', 'Família, mães e filhos', 'Estudos e provas', 'Causas impossíveis e urgentes', 'Gravidez e parto', 'Dívidas e dificuldades financeiras', 'Coisas perdidas', 'Medo e proteção', 'Olhos e visão', 'Animais'];

const NOMES_DOS_MESES = {
  pt: ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'],
  en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  es: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],
};

function festaPorExtenso(festa) {
  if (!festa || !/^\d{2}-\d{2}$/.test(festa)) return '';
  const [mes, dia] = festa.split('-').map(Number);
  const meses = NOMES_DOS_MESES[idiomaAtual] || NOMES_DOS_MESES.pt;
  if (idiomaAtual === 'en') return `${meses[mes - 1]} ${dia}`;
  return `${dia} de ${meses[mes - 1]}`;
}

let temasDoPadroeiroParaBusca = null;

// Temas (com seus santos) do mais parecido com a busca para o menos
function buscarPadroeiro(termo) {
  const texto = String(termo || '').trim();
  if (!texto || typeof BuscaInteligente === 'undefined') return [];
  if (!temasDoPadroeiroParaBusca) {
    temasDoPadroeiroParaBusca = BuscaInteligente.prepararSituacoes(PADROEIROS.map((t) => ({ rotulo: t.rotulo, termos: t.termos.concat([t.rotulo]), itens: [t.rotulo], tema: t })));
  }
  const temas = temasDoPadroeiroParaBusca
    .map((t) => ({ tema: t.tema, nota: BuscaInteligente.combinarSituacao(texto, t.preparados) }))
    .filter((t) => t.nota >= 0.5)
    .sort((a, b) => b.nota - a.nota)
    .slice(0, 3)
    .map((t) => ({ rotulo: t.tema.rotulo, santos: t.tema.santos.map((id) => santosData.find((s) => s.id === id)).filter(Boolean) }));

  // Também pelo nome do santo ("Antônio", "Santa Rita", "Luzia"...): todas
  // as palavras digitadas precisam estar no nome, e pelo menos uma que
  // não seja só "São", "Santa"...
  const TITULOS = ['sao', 'santo', 'santa', 'santos', 'beato', 'beata', 'saint', 'blessed', 'san'];
  const doPedido = BuscaInteligente.palavras(texto);
  const temNomeDeVerdade = doPedido.some((p) => !TITULOS.includes(p));
  // Nome igual vem antes de parecido ("José" antes de "Josefina"), e o
  // nome que começa com a palavra antes do que a tem no meio
  const porNome = !temNomeDeVerdade || doPedido.length > 4 ? [] : santosData.map((s) => {
    const doNome = BuscaInteligente.palavras(`${s.nome} ${textoDoSanto(s).nome}`).filter((w) => !TITULOS.includes(w));
    let nota = 0;
    let posicao = 0;
    for (const p of doPedido) {
      if (TITULOS.includes(p)) continue;
      const notas = doNome.map((w) => BuscaInteligente.semelhanca(p, w));
      const melhor = Math.max(0, ...notas);
      if (melhor < 0.85) return null;
      nota += melhor;
      posicao += notas.indexOf(melhor);
    }
    return { santo: s, nota, posicao };
  }).filter(Boolean).sort((a, b) => (b.nota - a.nota) || (a.posicao - b.posicao)).map((r) => r.santo);
  if (porNome.length) temas.unshift({ rotulo: 'Pelo nome', santos: porNome.slice(0, 6) });
  return temas;
}

function cartaoDePadroeiro(santo, prefixo) {
  const textos = textoDoSanto(santo);
  const festa = festaPorExtenso(santo.festa);
  return `
    <button type="button" class="padroeiro-cartao" data-santo="${santo.id}">
      <span class="padroeiro-foto" id="${prefixo}-${santo.id}">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><use href="#icon-aureola"></use></svg>
      </span>
      <span class="padroeiro-textos">
        <span class="padroeiro-nome">${textos.nome}</span>
        <span class="padroeiro-resumo">${textos.resumo}</span>
        ${festa ? `<span class="padroeiro-festa">Festa: ${festa}</span>` : ''}
      </span>
    </button>`;
}

function mostrarTemasDoPadroeiro(input) {
  const area = document.getElementById('padroeiro-temas');
  if (!area) return;
  area.innerHTML = TEMAS_EM_DESTAQUE_DO_PADROEIRO.map((rotulo) => {
    const tema = PADROEIROS.find((t) => t.rotulo === rotulo);
    if (!tema) return '';
    const nomes = tema.santos.map((id) => santosData.find((s) => s.id === id)).filter(Boolean).slice(0, 2).map((s) => textoDoSanto(s).nome);
    return `<button type="button" class="padroeiro-tema" data-tema="${rotulo}">
      <span class="padroeiro-tema-nome">${rotulo}</span>
      <span class="padroeiro-tema-santos">${nomes.join(', ')}</span>
    </button>`;
  }).join('');
  area.querySelectorAll('.padroeiro-tema').forEach((botao) => {
    botao.addEventListener('click', () => {
      input.value = botao.dataset.tema;
      mostrarResultadosDoPadroeiro(input.value);
      const resultados = document.getElementById('padroeiro-resultados');
      if (resultados) resultados.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

function mostrarResultadosDoPadroeiro(valor) {
  const resultados = document.getElementById('padroeiro-resultados');
  const temas = document.getElementById('padroeiro-temas');
  if (!resultados) return;
  const texto = String(valor || '').trim();
  if (temas) temas.hidden = Boolean(texto);
  if (!texto) { resultados.innerHTML = ''; return; }

  const grupos = buscarPadroeiro(texto);
  if (!grupos.length) {
    resultados.innerHTML = `
      <div class="padroeiro-vazio">
        <p>Não encontrei um santo do nosso catálogo ligado a "${escaparTextoDeOracao(texto)}". Tente outra palavra (por exemplo: saúde, viagem, trabalho, família) ou pergunte à Lumina.</p>
        <button type="button" class="btn-ask-ai" id="padroeiro-perguntar-lumina">Perguntar à Lumina</button>
        <button type="button" class="padroeiro-limpar" id="padroeiro-ver-temas">Ver todos os temas</button>
      </div>`;
    document.getElementById('padroeiro-perguntar-lumina').addEventListener('click', () => {
      mudarDeView('view-ia');
      setTimeout(() => {
        const campo = document.getElementById('lumina-input');
        if (campo) { campo.value = `Qual santo é padroeiro de: ${texto}?`; campo.focus(); }
      }, 300);
    });
    document.getElementById('padroeiro-ver-temas').addEventListener('click', () => {
      const input = document.getElementById('padroeiro-input');
      if (input) input.value = '';
      mostrarResultadosDoPadroeiro('');
    });
    return;
  }

  resultados.innerHTML = grupos.map((grupo, g) => `
    <section class="padroeiro-grupo">
      <h3 class="padroeiro-grupo-titulo">${grupo.rotulo}</h3>
      <div class="padroeiro-lista">${grupo.santos.map((santo) => cartaoDePadroeiro(santo, `padroeiro-foto-${g}`)).join('')}</div>
    </section>`).join('');

  resultados.querySelectorAll('.padroeiro-cartao').forEach((cartao) => {
    cartao.addEventListener('click', () => showDetail(cartao.dataset.santo));
  });
  grupos.forEach((grupo, g) => grupo.santos.forEach((santo) => {
    buscarImagemSanto(santo).then((imgUrl) => {
      const foto = document.getElementById(`padroeiro-foto-${g}-${santo.id}`);
      if (imgUrl && foto) foto.innerHTML = htmlDaFoto(imgUrl, santo.nome, 'padroeiro-img');
    });
  }));
}

function iniciarPaginaDePadroeiro() {
  const input = document.getElementById('padroeiro-input');
  if (!input) return;

  mostrarTemasDoPadroeiro(input);
  let espera = null;
  input.addEventListener('input', () => {
    clearTimeout(espera);
    espera = setTimeout(() => mostrarResultadosDoPadroeiro(input.value), 150);
  });

  const btnVoltar = document.getElementById('btn-back-padroeiro');
  if (btnVoltar) btnVoltar.addEventListener('click', () => mudarDeView('view-home'));
}

// ============================================================
//  COMPARTILHAR O SITE
// ============================================================
async function compartilharSite() {
  const dados = {
    title: 'Lumina Sancti — Luz dos Santos',
    text: 'Descubra a vida, a fé e o legado dos santos, beatos, doutores da Igreja e anjos no Lumina Sancti.',
    url: window.location.origin + window.location.pathname,
  };
  if (navigator.share) {
    try { await navigator.share(dados); } catch (e) { /* pessoa cancelou — tudo bem */ }
    return;
  }
  try {
    await navigator.clipboard.writeText(dados.url);
    alert('Link copiado! Agora é só colar e compartilhar com quem você ama.');
  } catch (e) {
    alert(dados.url);
  }
}

function iniciarCompartilharSite() {
  const btnRodape = document.getElementById('footer-compartilhar-btn');
  const btnMenu = document.getElementById('nav-compartilhar-site');
  if (btnRodape) btnRodape.addEventListener('click', compartilharSite);
  if (btnMenu) btnMenu.addEventListener('click', () => { closeSidebar(); compartilharSite(); });
}

// ============================================================
//  LIGAÇÕES DO MENU LATERAL COM AS NOVAS PÁGINAS
// ============================================================
function iniciarNavegacaoDoMenuLateral() {
  const navOracoes = document.getElementById('nav-oracoes');
  const navTerco = document.getElementById('nav-terco');
  const navPadroeiro = document.getElementById('nav-padroeiro');
  const navLeitura = document.getElementById('nav-leitura');
  const voltarDaLeitura = document.getElementById('btn-back-leitura');

  if (navOracoes) navOracoes.addEventListener('click', () => { closeSidebar(); mudarDeView('view-oracoes'); });
  if (navTerco) navTerco.addEventListener('click', () => { closeSidebar(); mudarDeView('view-terco'); });
  if (navPadroeiro) navPadroeiro.addEventListener('click', () => { closeSidebar(); mudarDeView('view-padroeiro'); });
  if (navLeitura) navLeitura.addEventListener('click', () => { closeSidebar(); mudarDeView('view-leitura'); });
  if (voltarDaLeitura) voltarDaLeitura.addEventListener('click', () => mudarDeView('view-home'));
}

// ============================================================
//  INSTALAR O APP (no celular ou no computador)
// ============================================================
let pedidoDeInstalacao = null;

function appJaInstalado() {
  const standalone = window.matchMedia && window.matchMedia('(display-mode: standalone)').matches;
  return !!standalone || (typeof navigator !== 'undefined' && navigator.standalone === true);
}

function aparelhoApple() {
  const agente = (navigator && navigator.userAgent) || '';
  return /iphone|ipad|ipod/i.test(agente) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
}

function atualizarBotoesDeInstalar() {
  const mostrar = !appJaInstalado();
  ['nav-instalar', 'footer-instalar'].forEach((id) => {
    const botao = document.getElementById(id);
    if (botao) botao.hidden = !mostrar;
  });
}

async function instalarApp() {
  if (typeof closeSidebar === 'function') closeSidebar();
  // Android e computador: o próprio navegador abre a janela de instalar
  if (pedidoDeInstalacao) {
    pedidoDeInstalacao.prompt();
    try { await pedidoDeInstalacao.userChoice; } catch (e) { /* pessoa fechou */ }
    pedidoDeInstalacao = null;
    atualizarBotoesDeInstalar();
    return;
  }
  // iPhone (ou navegador sem instalação automática): passo a passo
  const janela = document.getElementById('instalar-modal');
  const instrucoes = document.getElementById('instalar-instrucoes');
  if (!janela || !instrucoes) return;
  instrucoes.innerHTML = aparelhoApple()
    ? `<ol class="instalar-passos">
         <li>Abra o site no <b>Safari</b>.</li>
         <li>Toque no botão <b>Compartilhar</b> (o quadrado com a seta para cima).</li>
         <li>Escolha <b>Adicionar à Tela de Início</b> e confirme.</li>
       </ol>`
    : `<ol class="instalar-passos">
         <li>Abra o menu do navegador (os três pontinhos).</li>
         <li>Toque em <b>Instalar app</b> ou <b>Adicionar à tela inicial</b>.</li>
         <li>Pronto: a estrela do Lumina Sancti aparece junto dos seus apps.</li>
       </ol>`;
  janela.classList.add('active');
}

function iniciarInstalacaoDoApp() {
  window.addEventListener('beforeinstallprompt', (evento) => {
    evento.preventDefault();
    pedidoDeInstalacao = evento;
    atualizarBotoesDeInstalar();
  });
  window.addEventListener('appinstalled', () => {
    pedidoDeInstalacao = null;
    atualizarBotoesDeInstalar();
  });
  ['nav-instalar', 'footer-instalar'].forEach((id) => {
    const botao = document.getElementById(id);
    if (botao) botao.addEventListener('click', instalarApp);
  });
  const janela = document.getElementById('instalar-modal');
  const fechar = document.getElementById('instalar-fechar');
  if (fechar) fechar.addEventListener('click', () => janela.classList.remove('active'));
  if (janela) janela.addEventListener('click', (e) => { if (e.target === janela) janela.classList.remove('active'); });
  atualizarBotoesDeInstalar();
}

// ============================================================
//  PLANOS (vitrine — ainda sem cobrança)
// ============================================================
// Quando os preços forem definidos, é só preencher "preco" (por
// exemplo 'R$ 9,90/mês'). Enquanto estiver null, aparece "Em breve".
const PLANOS = [
  { id: 'gratuito', nome: 'Gratuito', preco: 'Grátis', perfis: '1 perfil', destaque: false,
    itens: ['Todas as biografias dos santos', 'Santo do Dia, orações e terço guiado', 'Trilhas dos Santos', 'Lumina: 5 perguntas por dia'] },
  { id: 'individual', nome: 'Individual', preco: null, perfis: '1 perfil', destaque: false,
    itens: ['Tudo do plano Gratuito', 'Quiz dos Santos criado por IA', 'Narração com voz natural', 'Mais perguntas à Lumina'] },
  { id: 'duo', nome: 'Duo', preco: null, perfis: '2 perfis', destaque: false,
    itens: ['Tudo do plano Individual', 'Para duas pessoas', 'Ranking entre vocês dois'] },
  { id: 'familia', nome: 'Família', preco: null, perfis: 'Até 6 perfis', destaque: true,
    itens: ['Tudo do plano Individual', 'Perfis de adultos e crianças', 'Modo Kids', 'Ranking da família'] },
];

function renderizarPlanos() {
  const grade = document.getElementById('planos-grade');
  if (!grade) return;
  grade.innerHTML = PLANOS.map((plano) => `
    <div class="plano-cartao${plano.destaque ? ' destaque' : ''}">
      ${plano.destaque ? '<span class="plano-selo">Mais completo</span>' : ''}
      <h3 class="plano-nome">${plano.nome}</h3>
      <p class="plano-perfis">${plano.perfis}</p>
      <p class="plano-preco">${plano.preco || 'Em breve'}</p>
      <ul class="plano-itens">
        ${plano.itens.map((item) => `<li>${icone('check')}<span>${item}</span></li>`).join('')}
      </ul>
      <button class="plano-botao" disabled>${plano.id === 'gratuito' ? 'Plano atual' : 'Em breve'}</button>
    </div>`).join('');
}

function abrirPlanos() {
  if (typeof closeSidebar === 'function') closeSidebar();
  mudarDeView('view-planos');
  renderizarPlanos();
}

function iniciarContaGooglePlanosEApp() {
  const google = document.getElementById('auth-google');
  const divisor = document.getElementById('auth-divisor');
  if (google) {
    google.hidden = !LOGIN_COM_GOOGLE_ATIVO;
    if (divisor) divisor.hidden = !LOGIN_COM_GOOGLE_ATIVO;
    google.addEventListener('click', entrarComGoogle);
  }
  avisarErroDoGoogle();
  const completar = document.getElementById('completar-form');
  if (completar) completar.addEventListener('submit', concluirCadastro);
  const outraConta = document.getElementById('completar-outra-conta');
  if (outraConta) outraConta.addEventListener('click', usarOutraConta);

  const planos = document.getElementById('nav-planos');
  if (planos) planos.addEventListener('click', abrirPlanos);
  const voltarPlanos = document.getElementById('btn-back-planos');
  if (voltarPlanos) voltarPlanos.addEventListener('click', () => mudarDeView('view-home'));

  iniciarInstalacaoDoApp();
}

// PWA: registra o service worker, que deixa o site instalável e
// funcionando parcialmente offline. Se o navegador não suportar,
// ou o arquivo não existir ainda no servidor, o site continua
// funcionando normalmente do mesmo jeito.
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch(() => {});
  });
}
