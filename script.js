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
    wiki: 'Brás de Sebaste',
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
    resumo: 'Discípulo do apóstolo João, bispo mártir queimado por recusar negar a Cristo aos 86 anos.',
    texto: `<p>Ainda jovem, foi discípulo direto do apóstolo João, tornando-se elo vivo entre a geração apostólica e a Igreja seguinte como bispo de Esmirna. Já idoso, foi preso durante uma perseguição e, ao ser pressionado a amaldiçoar Cristo para salvar a vida, respondeu: "Há oitenta e seis anos o sirvo, e ele nunca me fez mal algum — como posso blasfemar contra meu Rei e Salvador?" Foi queimado vivo.</p>`
  },

  // ---------------- MARÇO ----------------
  {
    id: 'cassimiro',
    nome: 'São Cassimiro',
    wiki: 'Cassimiro da Polônia',
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
    texto: `<p>Jurista leigo enviado inesperadamente como arcebispo de Lima, Turíbio percorreu a cavalo e a pé, por décadas, um território imenso do Peru colonial, aprendendo línguas indígenas e denunciando os abusos dos colonizadores contra a população nativa. Batizou, segundo a tradição, futuros santos como Rosa de Lima e Martín de Porres.</p>`
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
    texto: `<p>Professor de filosofia na Espanha, Junípero Serra deixou a vida acadêmica para se tornar missionário nas Américas, já com quase quarenta anos. Apesar de uma perna ferida que o acompanhou o resto da vida, caminhou milhares de quilômetros fundando missões na Califórnia que deram origem a cidades como San Francisco e Los Angeles.</p>`
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
    texto: `<p>Filho de uma família convertida ao cristianismo em segredo em uma Coreia hostil à fé cristã, André Kim tornou-se o primeiro padre nascido coreano, ordenado após estudar clandestinamente no exterior. Foi decapitado aos 25 anos junto com o pai e é celebrado ao lado de mais de cem mártires coreanos, leigos em sua maioria, que deram a vida entre os séculos XVIII e XIX.</p>`
  },
  {
    id: 'mateus-apostolo',
    nome: 'São Mateus Apóstolo',
    wiki: 'Mateus, o Evangelista',
    categoria: ['grandes-santos'],
    festa: '09-21',
    resumo: 'Cobrador de impostos que largou tudo ao ouvir Jesus chamá-lo, tornando-se apóstolo e evangelista.',
    texto: `<p>Cobrador de impostos romano — profissão desprezada pelos judeus de sua época por servir ao invasor —, Mateus estava sentado à sua mesa de cobrança quando Jesus simplesmente disse "Segue-me", e ele largou tudo imediatamente. Tornou-se apóstolo e autor do primeiro Evangelho, escrito especialmente para mostrar aos judeus que Jesus era o Messias prometido nas Escrituras.</p>`
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
    texto: `<p>Um dos papas mais influentes da Antiguidade, Leão é lembrado por ter saído pessoalmente ao encontro de Átila, o Huno, convencendo-o a não avançar sobre Roma. Sua carta doutrinal sobre as duas naturezas de Cristo, humana e divina, foi decisiva no Concílio de Calcedônia. É Doutor da Igreja e recebeu, ainda em vida, o título de "Magno" — o Grande.</p>`
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
    filtro_favoritos: '❤ Favoritos',
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
    lumina_subtitulo: 'A assistente exclusiva do Lumina Sancti — só sobre santos, beatos, veneráveis, doutores e anjos.',
    lumina_precisa_login: 'Para conversar com a Lumina, entre na sua conta (é rápido e gratuito).',
    lumina_placeholder: 'Pergunte sobre um santo, beato, doutor ou anjo...',
    perfil_titulo: 'Meu perfil',
    perfil_salvar: 'Salvar alterações',
    perfil_zona_perigo: 'Excluir conta',
    perfil_excluir_aviso: 'Isso apaga sua conta e todos os dados ligados a ela, para sempre. Não tem como desfazer.',
    perfil_excluir_botao: 'Excluir minha conta',
    footer_fale_conosco: 'Fale conosco: <a href="mailto:suporte@luminasancti.com">suporte@luminasancti.com</a>',
  },
  en: {
    hero_subtitulo: 'Light of the Saints',
    hero_citacao: '"Holiness is not the luxury of a few, but a quiet, burning call in the heart of every one of us, lighting up the world in every age."',
    sobre_titulo: 'About Lumina Sancti',
    sobre_texto: '<strong>Lumina Sancti</strong> (Light of the Saints) is a digital refuge dedicated to preserving and sharing the life, faith and legacy of those who left an unquenchable trail of light in history. This space was created to reveal that holiness is not something distant, but a beautiful path, possible and accessible in the everyday life of any era or age.',
    filtro_todos_curto: 'All',
    filtro_todos: 'All Saints',
    filtro_favoritos: '❤ Favorites',
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
    lumina_subtitulo: "Lumina Sancti's own assistant — only about saints, blesseds, venerables, doctors and angels.",
    lumina_precisa_login: 'To talk with Lumina, sign in to your account (it\'s quick and free).',
    lumina_placeholder: 'Ask about a saint, blessed, doctor or angel...',
    perfil_titulo: 'My profile',
    perfil_salvar: 'Save changes',
    perfil_zona_perigo: 'Delete account',
    perfil_excluir_aviso: 'This permanently deletes your account and all data linked to it. This cannot be undone.',
    perfil_excluir_botao: 'Delete my account',
    footer_fale_conosco: 'Contact us: <a href="mailto:suporte@luminasancti.com">suporte@luminasancti.com</a>',
  },
  es: {
    hero_subtitulo: 'Luz de los Santos',
    hero_citacao: '"La santidad no es el lujo de unos pocos, sino un llamado silencioso y ardiente en el corazón de todos nosotros, iluminando el mundo en cada época."',
    sobre_titulo: 'Sobre Lumina Sancti',
    sobre_texto: '<strong>Lumina Sancti</strong> (Luz de los Santos) es un refugio digital dedicado a preservar y compartir la vida, la fe y el legado de quienes dejaron un rastro inextinguible de luz en la historia. Este espacio fue creado para revelar que la santidad no es algo distante, sino un camino bello, posible y accesible en la vida cotidiana de cualquier época o edad.',
    filtro_todos_curto: 'Todos',
    filtro_todos: 'Todos los Santos',
    filtro_favoritos: '❤ Favoritos',
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
    lumina_subtitulo: 'La asistente exclusiva de Lumina Sancti — solo sobre santos, beatos, venerables, doctores y ángeles.',
    lumina_precisa_login: 'Para hablar con Lumina, entra en tu cuenta (es rápido y gratis).',
    lumina_placeholder: 'Pregunta sobre un santo, beato, doctor o ángel...',
    perfil_titulo: 'Mi perfil',
    perfil_salvar: 'Guardar cambios',
    perfil_zona_perigo: 'Eliminar cuenta',
    perfil_excluir_aviso: 'Esto elimina tu cuenta y todos los datos asociados, para siempre. No se puede deshacer.',
    perfil_excluir_botao: 'Eliminar mi cuenta',
    footer_fale_conosco: 'Contáctanos: <a href="mailto:suporte@luminasancti.com">suporte@luminasancti.com</a>',
  },
};

const CHAVE_IDIOMA = 'lumina-sancti-idioma';
let idiomaAtual = 'pt';

function getIdiomaSalvo() {
  try {
    return localStorage.getItem(CHAVE_IDIOMA) || 'pt';
  } catch (e) {
    return 'pt';
  }
}

function aplicarIdioma(codigo) {
  const dicionario = TRADUCOES[codigo] || TRADUCOES.pt;
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

  document.querySelectorAll('.idioma-opcao').forEach(btn => {
    btn.classList.toggle('idioma-ativa', btn.dataset.lang === codigo);
  });

  try {
    localStorage.setItem(CHAVE_IDIOMA, codigo);
  } catch (e) {
    // segue sem salvar a preferência, sem quebrar o site
  }
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

  document.querySelectorAll('.idioma-opcao').forEach(opcao => {
    opcao.addEventListener('click', () => {
      aplicarIdioma(opcao.dataset.lang);
      menu.classList.remove('aberto');
      botao.setAttribute('aria-expanded', 'false');
      // Se a pessoa estiver vendo a biografia de um santo, atualiza
      // o aviso de tradução na hora, sem precisar voltar e entrar de novo.
      const idAtual = bioArticle && bioArticle.dataset.santoId;
      if (idAtual) showDetail(idAtual);
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
const SUPABASE_URL = 'https://SEU-PROJETO.supabase.co';
const SUPABASE_ANON_KEY = 'SUA-CHAVE-ANON-OU-PUBLISHABLE-AQUI';
// ██████████████████████████████████████████████████████████

const supabaseCliente = (SUPABASE_URL.includes('SEU-PROJETO') || !window.supabase)
  ? null
  : window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

let sessaoAtual = null;

async function iniciarAutenticacao() {
  if (!supabaseCliente) return; // Supabase ainda não configurado — o site funciona normal, só sem login

  const { data } = await supabaseCliente.auth.getSession();
  sessaoAtual = data.session;
  atualizarInterfaceDeConta();

  supabaseCliente.auth.onAuthStateChange((_evento, sessao) => {
    sessaoAtual = sessao;
    atualizarInterfaceDeConta();
  });
}

function atualizarInterfaceDeConta() {
  const logado = !!sessaoAtual;
  const btnEntrar = document.getElementById('conta-menu-entrar');
  const btnPerfil = document.getElementById('conta-menu-perfil');
  const btnSair = document.getElementById('conta-menu-sair');
  if (btnEntrar) btnEntrar.style.display = logado ? 'none' : 'block';
  if (btnPerfil) btnPerfil.style.display = logado ? 'block' : 'none';
  if (btnSair) btnSair.style.display = logado ? 'block' : 'none';

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
function mudarDeView(idNovaView) {
  const todasAsViews = ['view-home', 'view-detail', 'view-ia', 'view-auth', 'view-perfil'];
  const viewAtual = todasAsViews.map(id => document.getElementById(id)).find(v => v && v.classList.contains('active'));

  const trocar = () => {
    todasAsViews.forEach(id => {
      const v = document.getElementById(id);
      if (v) v.style.display = 'none';
    });
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

function iniciarPaginaDeAutenticacao() {
  const abaEntrar = document.getElementById('auth-tab-entrar');
  const abaCadastrar = document.getElementById('auth-tab-cadastrar');
  const formEntrar = document.getElementById('auth-form-entrar');
  const formCadastrar = document.getElementById('auth-form-cadastrar');
  const feedback = document.getElementById('auth-feedback');
  if (!abaEntrar) return;

  abaEntrar.addEventListener('click', () => {
    abaEntrar.classList.add('active');
    abaCadastrar.classList.remove('active');
    formEntrar.style.display = 'flex';
    formCadastrar.style.display = 'none';
    feedback.textContent = '';
  });
  abaCadastrar.addEventListener('click', () => {
    abaCadastrar.classList.add('active');
    abaEntrar.classList.remove('active');
    formCadastrar.style.display = 'flex';
    formEntrar.style.display = 'none';
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
    mudarDeView('view-home');
  });

  formCadastrar.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!supabaseCliente) { feedback.textContent = 'Contas ainda não configuradas neste site.'; return; }
    feedback.textContent = 'Criando sua conta...';
    const nome = document.getElementById('cadastrar-nome').value.trim();
    const email = document.getElementById('cadastrar-email').value.trim();
    const senha = document.getElementById('cadastrar-senha').value;
    const { data, error } = await supabaseCliente.auth.signUp({
      email,
      password: senha,
      options: { data: { nome } },
    });
    if (error) {
      feedback.textContent = error.message.includes('already registered')
        ? 'Esse e-mail já tem uma conta.'
        : 'Não foi possível criar a conta. Tente de novo.';
      return;
    }
    if (data.session) {
      // Confirmação de e-mail desligada no projeto: já entra direto
      feedback.textContent = '';
      mudarDeView('view-home');
    } else {
      feedback.textContent = 'Quase lá! Enviamos um e-mail de confirmação — verifique sua caixa de entrada.';
    }
  });
}

// ============================================================
//  PERFIL E EXCLUSÃO DE CONTA
// ============================================================
async function carregarPaginaDePerfil() {
  const feedback = document.getElementById('perfil-feedback');
  if (!supabaseCliente || !sessaoAtual) { mudarDeView('view-auth'); return; }

  document.getElementById('perfil-email').textContent = sessaoAtual.user.email;
  const { data: perfil } = await supabaseCliente
    .from('perfis')
    .select('nome')
    .eq('id', sessaoAtual.user.id)
    .maybeSingle();
  document.getElementById('perfil-nome').value = perfil?.nome || '';
  if (feedback) feedback.textContent = '';
}

function iniciarPaginaDePerfil() {
  const form = document.getElementById('perfil-form');
  const feedback = document.getElementById('perfil-feedback');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const novoNome = document.getElementById('perfil-nome').value.trim();
    const { error } = await supabaseCliente
      .from('perfis')
      .update({ nome: novoNome })
      .eq('id', sessaoAtual.user.id);
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

  function criarMeteoro() {
    const meteoro = document.createElement('div');
    meteoro.className = 'meteor gold'; // todos dourados

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

  // Fluxo contínuo, sem pausas longas: um meteoro novo a cada
  // fração de segundo, sempre havendo vários cruzando a tela ao
  // mesmo tempo (já que cada um dura de 1,4 a 2,7s na tela).
  function agendarProximoMeteoro() {
    const espera = 220 + Math.random() * 380; // entre 0.22s e 0.6s
    setTimeout(() => {
      criarMeteoro();
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
  return `
    <div class="sdd-card" id="${idBase}-card" role="button" tabindex="0" aria-label="Ver a história de ${santo.nome}">
      <span class="sdd-label">${rotulo}</span>
      <div class="sdd-body">
        <div class="sdd-img-wrapper" id="${idBase}-img-wrapper">
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
  buscarImagemSanto(santo).then(imgUrl => {
    const wrapper = document.getElementById(`${idBase}-img-wrapper`);
    if (imgUrl && wrapper) {
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
          ${santo.nome}
        </h3>
        <p class="card-desc">${santo.resumo}</p>
      </div>
    `;

    cardsGrid.appendChild(card);
    ligarBotaoFavorito(card.querySelector('.btn-favorito'), santo.id);

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
  bioArticle.dataset.santoId = santo.id;

  viewHome.classList.remove('active');
  setTimeout(() => {
    viewHome.style.display = 'none';
    viewDetail.style.display = 'block';

    const avisoTraducao = (typeof idiomaAtual !== 'undefined' && idiomaAtual !== 'pt')
      ? `<p class="bio-aviso-traducao" data-i18n="aviso_traducao">${(TRADUCOES[idiomaAtual] || {}).aviso_traducao || ''}</p>`
      : '';

    bioArticle.innerHTML = `
      <div class="bio-header">
        <h2 class="bio-title">
          <svg viewBox="0 0 24 24" width="30" height="30" style="vertical-align: middle; margin-right:8px;"><use href="#icon-aureola"></use></svg>
          ${santo.nome}
        </h2>
      </div>
      <div class="bio-img-wrapper" id="bio-img-wrapper"></div>
      ${avisoTraducao}
      <div class="bio-text">
        ${santo.texto}
      </div>
      <button class="btn-ask-ai" id="btn-ask-ai-santo">
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3v4M12 17v4M3 12h4M17 12h4M6.34 6.34l2.83 2.83M14.83 14.83l2.83 2.83M17.66 6.34l-2.83 2.83M9.17 14.83l-2.83 2.83"/><circle cx="12" cy="12" r="2.2" fill="currentColor" stroke="none"/></svg>
        Perguntar à Lumina sobre ${santo.nome}
      </button>
    `;

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
});