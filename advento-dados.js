const ADVENTO_DO_ANO = {
  ano: 2026,
  inicio: '2026-11-29',
  natal: '2026-12-25',
  epifania: '2027-01-03',
  mostrarDe: '2026-11-15',
  mostrarAte: '2027-01-10',
  domingos: [0, 7, 14, 21],
};

const DIAS_DO_ADVENTO = [
  {
    peca: 'gruta', vela: 1,
    titulo: { pt: '1º Domingo do Advento: fiquem acordados', en: '1st Sunday of Advent: stay awake', es: '1.er Domingo de Adviento: estén despiertos' },
    texto: {
      pt: 'Hoje começa o Advento, as quatro semanas em que a Igreja se prepara para o Natal. No Evangelho deste domingo (Marcos 13,33-37), Jesus pede que a gente fique acordado, como quem espera um amigo muito querido chegar. Esperar Jesus não é ficar parado: é arrumar o coração.',
      en: 'Today Advent begins: the four weeks in which the Church gets ready for Christmas. In this Sunday\'s Gospel (Mark 13:33-37), Jesus asks us to stay awake, like someone waiting for a dear friend to arrive. Waiting for Jesus is not standing still: it means getting our hearts ready.',
      es: 'Hoy comienza el Adviento, las cuatro semanas en que la Iglesia se prepara para la Navidad. En el Evangelio de este domingo (Marcos 13,33-37), Jesús nos pide que estemos despiertos, como quien espera la llegada de un amigo muy querido. Esperar a Jesús no es quedarse quieto: es preparar el corazón.',
    },
    gesto: {
      pt: 'Monte um cantinho de oração em casa, ou uma coroa do Advento, e acenda a primeira vela rezando juntos.',
      en: 'Set up a little prayer corner at home, or an Advent wreath, and light the first candle while praying together.',
      es: 'Prepara un rincón de oración en casa, o una corona de Adviento, y enciende la primera vela rezando juntos.',
    },
    oracao: {
      pt: 'Senhor Jesus, quero esperar por ti de coração acordado. Ensina-me a preparar o caminho para a tua chegada. Amém.',
      en: 'Lord Jesus, I want to wait for you with a wakeful heart. Teach me to prepare the way for your coming. Amen.',
      es: 'Señor Jesús, quiero esperarte con el corazón despierto. Enséñame a preparar el camino para tu llegada. Amén.',
    },
  },
  {
    peca: 'palha', santo: 'andre-apostolo',
    titulo: { pt: 'Santo André, o primeiro a seguir Jesus', en: 'Saint Andrew, the first to follow Jesus', es: 'San Andrés, el primero en seguir a Jesús' },
    texto: {
      pt: 'André era pescador e foi um dos primeiros discípulos de Jesus. Depois de passar um dia com o Mestre, correu para contar ao irmão, Simão Pedro, e o levou até Jesus (João 1,40-42). Quem encontra Jesus quer que os outros também o conheçam.',
      en: 'Andrew was a fisherman and one of Jesus\' first disciples. After spending a day with the Master, he ran to tell his brother, Simon Peter, and brought him to Jesus (John 1:40-42). Whoever meets Jesus wants others to know him too.',
      es: 'Andrés era pescador y fue uno de los primeros discípulos de Jesús. Después de pasar un día con el Maestro, corrió a contárselo a su hermano, Simón Pedro, y lo llevó hasta Jesús (Juan 1,40-42). Quien encuentra a Jesús quiere que los demás también lo conozcan.',
    },
    gesto: {
      pt: 'Convide alguém para rezar com você hoje, ou conte para alguém algo bonito que você aprendeu sobre Jesus.',
      en: 'Invite someone to pray with you today, or tell someone something beautiful you have learned about Jesus.',
      es: 'Invita a alguien a rezar contigo hoy, o cuéntale a alguien algo bonito que hayas aprendido sobre Jesús.',
    },
    oracao: {
      pt: 'Santo André, ajuda-me a levar outras pessoas até Jesus, como você levou o seu irmão. Amém.',
      en: 'Saint Andrew, help me bring others to Jesus, as you brought your brother. Amen.',
      es: 'San Andrés, ayúdame a llevar a otros hasta Jesús, como tú llevaste a tu hermano. Amén.',
    },
  },
  {
    peca: 'lamparina', santo: 'charles-foucauld',
    titulo: { pt: 'São Carlos de Foucauld, o irmão de todos', en: 'Saint Charles de Foucauld, brother to all', es: 'San Carlos de Foucauld, hermano de todos' },
    texto: {
      pt: 'Carlos de Foucauld foi militar e explorador, se afastou da fé e depois se converteu. Foi viver no deserto do Saara, no meio de um povo muçulmano, rezando muito e servindo a todos com simplicidade. Ele queria ser um irmão para cada pessoa que encontrava.',
      en: 'Charles de Foucauld was a soldier and an explorer who drifted away from the faith and later converted. He went to live in the Sahara desert among a Muslim people, praying a great deal and serving everyone with simplicity. He wanted to be a brother to every person he met.',
      es: 'Carlos de Foucauld fue militar y explorador, se alejó de la fe y después se convirtió. Se fue a vivir al desierto del Sahara, en medio de un pueblo musulmán, rezando mucho y sirviendo a todos con sencillez. Quería ser un hermano para cada persona que encontraba.',
    },
    gesto: {
      pt: 'Faça hoje um gesto de bondade escondido, sem contar para ninguém.',
      en: 'Today, do a hidden act of kindness without telling anyone.',
      es: 'Haz hoy un gesto de bondad escondido, sin contárselo a nadie.',
    },
    oracao: {
      pt: 'Jesus, que eu seja irmão de todos, com bondade e humildade, como São Carlos de Foucauld. Amém.',
      en: 'Jesus, may I be a brother or sister to all, with kindness and humility, like Saint Charles de Foucauld. Amen.',
      es: 'Jesús, que yo sea hermano de todos, con bondad y humildad, como san Carlos de Foucauld. Amén.',
    },
  },
  {
    peca: 'manjedoura',
    titulo: { pt: 'Os profetas anunciaram o Menino', en: 'The prophets foretold the Child', es: 'Los profetas anunciaron al Niño' },
    texto: {
      pt: 'Muito antes de Jesus nascer, Deus falou por meio dos profetas. O profeta Isaías anunciou que nasceria um menino e que ele seria chamado Príncipe da Paz (Isaías 9,5). O povo esperou séculos, e Deus cumpriu a promessa. Deus sempre cumpre o que promete.',
      en: 'Long before Jesus was born, God spoke through the prophets. The prophet Isaiah announced that a child would be born and would be called Prince of Peace (Isaiah 9:6). The people waited for centuries, and God kept his promise. God always keeps his promises.',
      es: 'Mucho antes de que naciera Jesús, Dios habló por medio de los profetas. El profeta Isaías anunció que nacería un niño y que sería llamado Príncipe de la Paz (Isaías 9,5). El pueblo esperó siglos, y Dios cumplió su promesa. Dios siempre cumple lo que promete.',
    },
    gesto: {
      pt: 'Leia com calma Isaías 11,1-10 (ou peça para alguém ler para você) e escolha uma frase para guardar no coração.',
      en: 'Read Isaiah 11:1-10 slowly (or ask someone to read it to you) and choose one line to keep in your heart.',
      es: 'Lee con calma Isaías 11,1-10 (o pide que alguien te lo lea) y elige una frase para guardar en el corazón.',
    },
    oracao: {
      pt: 'Deus fiel, obrigado porque tu cumpres as tuas promessas. Aumenta a minha confiança em ti. Amém.',
      en: 'Faithful God, thank you for keeping your promises. Increase my trust in you. Amen.',
      es: 'Dios fiel, gracias porque cumples tus promesas. Aumenta mi confianza en ti. Amén.',
    },
  },
  {
    peca: 'boi', santo: 'francisco-xavier',
    titulo: { pt: 'São Francisco Xavier, o missionário', en: 'Saint Francis Xavier, the missionary', es: 'San Francisco Javier, el misionero' },
    texto: {
      pt: 'Francisco Xavier foi um dos primeiros companheiros de Santo Inácio de Loyola. Viajou de navio até a Índia e o Japão para anunciar Jesus a povos que nunca tinham ouvido falar dele. É padroeiro das missões. O Natal é uma boa notícia que precisa chegar a todos.',
      en: 'Francis Xavier was one of Saint Ignatius of Loyola\'s first companions. He sailed to India and Japan to proclaim Jesus to peoples who had never heard of him. He is the patron of the missions. Christmas is good news that needs to reach everyone.',
      es: 'Francisco Javier fue uno de los primeros compañeros de san Ignacio de Loyola. Viajó en barco hasta la India y Japón para anunciar a Jesús a pueblos que nunca habían oído hablar de él. Es patrono de las misiones. La Navidad es una buena noticia que tiene que llegar a todos.',
    },
    gesto: {
      pt: 'Reze hoje por um missionário ou por um país distante onde muita gente ainda não conhece Jesus.',
      en: 'Pray today for a missionary or for a faraway country where many people still don\'t know Jesus.',
      es: 'Reza hoy por un misionero o por un país lejano donde mucha gente todavía no conoce a Jesús.',
    },
    oracao: {
      pt: 'São Francisco Xavier, dá-me coragem para falar de Jesus com alegria, onde quer que eu esteja. Amém.',
      en: 'Saint Francis Xavier, give me courage to speak about Jesus with joy, wherever I am. Amen.',
      es: 'San Francisco Javier, dame valor para hablar de Jesús con alegría, dondequiera que esté. Amén.',
    },
  },
  {
    peca: 'burro', santo: 'barbara',
    titulo: { pt: 'Santa Bárbara, firme na fé', en: 'Saint Barbara, steadfast in faith', es: 'Santa Bárbara, firme en la fe' },
    texto: {
      pt: 'Segundo a tradição, Bárbara foi uma jovem dos primeiros séculos que preferiu Jesus a tudo, mesmo quando isso lhe custou a vida. Pouco se sabe com certeza sobre a vida dela, mas há muitos séculos os cristãos pedem a sua ajuda nos momentos de perigo.',
      en: 'According to tradition, Barbara was a young woman of the early centuries who preferred Jesus above everything, even when it cost her life. Little is known for certain about her life, but for many centuries Christians have asked for her help in times of danger.',
      es: 'Según la tradición, Bárbara fue una joven de los primeros siglos que prefirió a Jesús por encima de todo, incluso cuando eso le costó la vida. Poco se sabe con certeza sobre su vida, pero desde hace muchos siglos los cristianos piden su ayuda en los momentos de peligro.',
    },
    gesto: {
      pt: 'Reze pelas pessoas que trabalham em lugares perigosos: bombeiros, mineiros, policiais, motoristas.',
      en: 'Pray for people who work in dangerous places: firefighters, miners, police officers, drivers.',
      es: 'Reza por las personas que trabajan en lugares peligrosos: bomberos, mineros, policías, conductores.',
    },
    oracao: {
      pt: 'Senhor, dá-me uma fé firme como a de Santa Bárbara e protege quem está em perigo hoje. Amém.',
      en: 'Lord, give me a steadfast faith like Saint Barbara\'s and protect those who are in danger today. Amen.',
      es: 'Señor, dame una fe firme como la de santa Bárbara y protege a quienes están en peligro hoy. Amén.',
    },
  },
  {
    peca: 'ovelha1', acao: 'terco',
    titulo: { pt: 'Maria, a mulher que esperou', en: 'Mary, the woman who waited', es: 'María, la mujer que esperó' },
    texto: {
      pt: 'Ninguém esperou o Natal como Maria. Durante nove meses, ela carregou Jesus e guardou no coração tudo o que Deus lhe dizia. Com ela aprendemos a esperar em silêncio, com confiança e com amor.',
      en: 'No one waited for Christmas like Mary. For nine months she carried Jesus and kept in her heart everything God told her. From her we learn to wait in silence, with trust and with love.',
      es: 'Nadie esperó la Navidad como María. Durante nueve meses llevó a Jesús en su seno y guardó en el corazón todo lo que Dios le decía. Con ella aprendemos a esperar en silencio, con confianza y con amor.',
    },
    gesto: {
      pt: 'Reze hoje um terço, ou pelo menos uma dezena, pedindo a Maria que prepare o seu coração.',
      en: 'Pray a rosary today, or at least one decade, asking Mary to prepare your heart.',
      es: 'Reza hoy un rosario, o por lo menos un misterio, pidiendo a María que prepare tu corazón.',
    },
    oracao: {
      pt: 'Maria, minha Mãe, ensina-me a esperar Jesus como você esperou. Amém.',
      en: 'Mary, my Mother, teach me to wait for Jesus as you waited. Amen.',
      es: 'María, Madre mía, enséñame a esperar a Jesús como tú lo esperaste. Amén.',
    },
  },
  {
    peca: 'palmeira', vela: 2, santo: 'sao-nicolau', acao: 'exame',
    titulo: { pt: '2º Domingo do Advento: preparem o caminho', en: '2nd Sunday of Advent: prepare the way', es: '2.º Domingo de Adviento: preparen el camino' },
    texto: {
      pt: 'No Evangelho deste domingo (Marcos 1,1-8), João Batista aparece no deserto pedindo que o povo prepare o caminho do Senhor e mude de vida. Hoje também é dia de São Nicolau, bispo que, segundo a tradição, ajudava os pobres em segredo. Preparar o caminho é tirar do coração o que atrapalha a chegada de Jesus.',
      en: 'In this Sunday\'s Gospel (Mark 1:1-8), John the Baptist appears in the desert asking the people to prepare the way of the Lord and change their lives. Today is also the day of Saint Nicholas, a bishop who, according to tradition, helped the poor in secret. Preparing the way means removing from our hearts whatever blocks Jesus\' coming.',
      es: 'En el Evangelio de este domingo (Marcos 1,1-8), Juan el Bautista aparece en el desierto pidiendo al pueblo que prepare el camino del Señor y cambie de vida. Hoy también es el día de san Nicolás, obispo que, según la tradición, ayudaba a los pobres en secreto. Preparar el camino es quitar del corazón lo que estorba la llegada de Jesús.',
    },
    gesto: {
      pt: 'Acenda a segunda vela. Peça perdão a alguém que você magoou, ou prepare-se para uma boa confissão antes do Natal.',
      en: 'Light the second candle. Ask forgiveness from someone you have hurt, or prepare for a good confession before Christmas.',
      es: 'Enciende la segunda vela. Pide perdón a alguien a quien hayas herido, o prepárate para una buena confesión antes de Navidad.',
    },
    oracao: {
      pt: 'Senhor, endireita os caminhos do meu coração para que tu possas chegar. Amém.',
      en: 'Lord, make straight the paths of my heart so that you can come. Amen.',
      es: 'Señor, endereza los caminos de mi corazón para que puedas llegar. Amén.',
    },
  },
  {
    peca: 'belem', santo: 'ambrosio',
    titulo: { pt: 'Santo Ambrósio, o pastor de Milão', en: 'Saint Ambrose, shepherd of Milan', es: 'San Ambrosio, pastor de Milán' },
    texto: {
      pt: 'Ambrósio era governador em Milão quando o povo o escolheu para ser bispo, ainda antes de ele ser batizado. Tornou-se um grande pastor e doutor da Igreja, e foi ele quem batizou Santo Agostinho. Deus pode chamar a gente quando menos esperamos.',
      en: 'Ambrose was governor in Milan when the people chose him to be their bishop, even before he had been baptized. He became a great shepherd and Doctor of the Church, and it was he who baptized Saint Augustine. God can call us when we least expect it.',
      es: 'Ambrosio era gobernador en Milán cuando el pueblo lo eligió como obispo, incluso antes de ser bautizado. Se convirtió en un gran pastor y doctor de la Iglesia, y fue él quien bautizó a san Agustín. Dios puede llamarnos cuando menos lo esperamos.',
    },
    gesto: {
      pt: 'Reze pelo seu pároco, pelo seu bispo e por todos os que vão ser batizados neste Natal.',
      en: 'Pray for your parish priest, your bishop and everyone who will be baptized this Christmas.',
      es: 'Reza por tu párroco, por tu obispo y por todos los que serán bautizados en esta Navidad.',
    },
    oracao: {
      pt: 'Senhor, abençoa os pastores da tua Igreja e torna-os santos como Santo Ambrósio. Amém.',
      en: 'Lord, bless the shepherds of your Church and make them holy like Saint Ambrose. Amen.',
      es: 'Señor, bendice a los pastores de tu Iglesia y hazlos santos como san Ambrosio. Amén.',
    },
  },
  {
    peca: 'maria', santo: 'catarina-laboure',
    titulo: { pt: 'Imaculada Conceição de Maria', en: 'The Immaculate Conception of Mary', es: 'La Inmaculada Concepción de María' },
    texto: {
      pt: 'Hoje a Igreja celebra que Maria, desde o primeiro instante da sua vida, foi preservada do pecado original, porque ia ser a Mãe de Jesus. Essa verdade de fé foi proclamada pelo Papa Pio IX em 1854. Deus preparou com todo o carinho a casa onde o seu Filho ia morar.',
      en: 'Today the Church celebrates that Mary, from the very first moment of her life, was preserved from original sin, because she was to be the Mother of Jesus. This truth of faith was proclaimed by Pope Pius IX in 1854. God lovingly prepared the home where his Son would dwell.',
      es: 'Hoy la Iglesia celebra que María, desde el primer instante de su vida, fue preservada del pecado original, porque iba a ser la Madre de Jesús. Esta verdad de fe fue proclamada por el papa Pío IX en 1854. Dios preparó con todo cariño la casa donde su Hijo iba a vivir.',
    },
    gesto: {
      pt: 'Reze uma Ave-Maria bem devagar, pensando em cada palavra. Se puder, vá à Missa hoje.',
      en: 'Pray a Hail Mary very slowly, thinking about each word. If you can, go to Mass today.',
      es: 'Reza un Avemaría muy despacio, pensando en cada palabra. Si puedes, ve hoy a Misa.',
    },
    oracao: {
      pt: 'Ó Maria concebida sem pecado, rogai por nós que recorremos a vós.',
      en: 'O Mary, conceived without sin, pray for us who have recourse to thee.',
      es: 'Oh María sin pecado concebida, rogad por nosotros que recurrimos a vos.',
    },
  },
  {
    peca: 'ovelha2', santo: 'juan-diego',
    titulo: { pt: 'São Juan Diego, o mensageiro de Maria', en: 'Saint Juan Diego, Mary\'s messenger', es: 'San Juan Diego, el mensajero de María' },
    texto: {
      pt: 'Juan Diego era um indígena simples do México. Em dezembro de 1531, Nossa Senhora apareceu a ele no monte Tepeyac e o enviou ao bispo com um pedido. Ele se achava pequeno demais para a missão, mas Maria confiava nele. Deus gosta de usar os pequenos.',
      en: 'Juan Diego was a humble Indigenous man from Mexico. In December 1531, Our Lady appeared to him on Tepeyac hill and sent him to the bishop with a request. He thought he was too small for the mission, but Mary trusted him. God loves to use the little ones.',
      es: 'Juan Diego era un indígena sencillo de México. En diciembre de 1531, la Virgen se le apareció en el cerro del Tepeyac y lo envió al obispo con un pedido. Él se sentía demasiado pequeño para la misión, pero María confiaba en él. A Dios le gusta valerse de los pequeños.',
    },
    gesto: {
      pt: 'Faça uma tarefa simples de casa com muito amor, sem que ninguém precise pedir.',
      en: 'Do a simple household chore with great love, without anyone having to ask.',
      es: 'Haz una tarea sencilla de la casa con mucho amor, sin que nadie tenga que pedírtelo.',
    },
    oracao: {
      pt: 'São Juan Diego, ensina-me a dizer sim a Deus mesmo quando eu me sinto pequeno. Amém.',
      en: 'Saint Juan Diego, teach me to say yes to God even when I feel small. Amen.',
      es: 'San Juan Diego, enséñame a decirle sí a Dios aunque me sienta pequeño. Amén.',
    },
  },
  {
    peca: 'jose', santo: 'jose',
    titulo: { pt: 'São José, o homem que confiou', en: 'Saint Joseph, the man who trusted', es: 'San José, el hombre que confió' },
    texto: {
      pt: 'José também esperou o Natal. Quando não entendeu o que estava acontecendo, um anjo lhe falou em sonho, e ele acolheu Maria e o Menino (Mateus 1,18-24). A Bíblia não guardou nenhuma palavra de José, mas ele fez tudo o que Deus pediu.',
      en: 'Joseph waited for Christmas too. When he didn\'t understand what was happening, an angel spoke to him in a dream, and he took Mary and the Child into his care (Matthew 1:18-24). The Bible doesn\'t record a single word Joseph said, but he did everything God asked.',
      es: 'José también esperó la Navidad. Cuando no entendía lo que estaba pasando, un ángel le habló en sueños, y él acogió a María y al Niño (Mateo 1,18-24). La Biblia no guarda ni una palabra de José, pero él hizo todo lo que Dios le pidió.',
    },
    gesto: {
      pt: 'Ajude em casa hoje sem reclamar, com o silêncio e a disposição de São José.',
      en: 'Help at home today without complaining, with Saint Joseph\'s quiet willingness.',
      es: 'Ayuda hoy en casa sin quejarte, con el silencio y la disposición de san José.',
    },
    oracao: {
      pt: 'São José, protetor da Sagrada Família, protege a minha família e ensina-me a confiar em Deus. Amém.',
      en: 'Saint Joseph, protector of the Holy Family, protect my family and teach me to trust in God. Amen.',
      es: 'San José, protector de la Sagrada Familia, protege a mi familia y enséñame a confiar en Dios. Amén.',
    },
  },
  {
    peca: 'poco',
    titulo: { pt: 'Ninguém fica sozinho no Natal', en: 'No one is alone at Christmas', es: 'Nadie está solo en Navidad' },
    texto: {
      pt: 'Para muita gente, dezembro é um mês difícil: há quem esteja doente, sozinho, de luto ou longe da família. O Natal lembra que Deus veio morar perto de nós. Nós podemos ser esse sinal de Deus perto de alguém.',
      en: 'For many people, December is a hard month: some are sick, alone, grieving or far from their families. Christmas reminds us that God came to live close to us. We can be that sign of God\'s closeness for someone.',
      es: 'Para mucha gente, diciembre es un mes difícil: hay quien está enfermo, solo, de luto o lejos de su familia. La Navidad recuerda que Dios vino a vivir cerca de nosotros. Nosotros podemos ser esa señal de Dios cerca de alguien.',
    },
    gesto: {
      pt: 'Ligue, visite ou mande uma mensagem carinhosa para alguém que está sozinho, doente ou triste.',
      en: 'Call, visit or send a kind message to someone who is alone, sick or sad.',
      es: 'Llama, visita o manda un mensaje cariñoso a alguien que esté solo, enfermo o triste.',
    },
    oracao: {
      pt: 'Senhor, consola os que estão tristes neste tempo e faz de mim um sinal do teu amor. Amém.',
      en: 'Lord, comfort those who are sad in this season and make me a sign of your love. Amen.',
      es: 'Señor, consuela a los que están tristes en este tiempo y haz de mí una señal de tu amor. Amén.',
    },
  },
  {
    peca: 'roseira',
    titulo: { pt: 'Nossa Senhora de Guadalupe', en: 'Our Lady of Guadalupe', es: 'Nuestra Señora de Guadalupe' },
    texto: {
      pt: 'Quando o bispo pediu um sinal, Nossa Senhora mandou Juan Diego colher rosas no alto do monte, em pleno inverno. Ao abrir o manto diante do bispo, as rosas caíram e apareceu nele a imagem de Maria, que até hoje está no Santuário de Guadalupe, no México. Ela é padroeira das Américas.',
      en: 'When the bishop asked for a sign, Our Lady told Juan Diego to gather roses on the hilltop, in the middle of winter. When he opened his cloak before the bishop, the roses fell out and Mary\'s image appeared on it; it is still kept today at the Shrine of Guadalupe in Mexico. She is the patroness of the Americas.',
      es: 'Cuando el obispo pidió una señal, la Virgen mandó a Juan Diego a cortar rosas en lo alto del cerro, en pleno invierno. Al abrir su tilma delante del obispo, cayeron las rosas y apareció en ella la imagen de María, que hasta hoy se conserva en el Santuario de Guadalupe, en México. Es la patrona de América.',
    },
    gesto: {
      pt: 'Reze uma Ave-Maria pelas mães que estão esperando um bebê.',
      en: 'Pray a Hail Mary for mothers who are expecting a baby.',
      es: 'Reza un Avemaría por las madres que están esperando un bebé.',
    },
    oracao: {
      pt: 'Nossa Senhora de Guadalupe, Mãe das Américas, cuida das famílias e de cada criança que vai nascer. Amém.',
      en: 'Our Lady of Guadalupe, Mother of the Americas, watch over families and every child yet to be born. Amen.',
      es: 'Nuestra Señora de Guadalupe, Madre de América, cuida de las familias y de cada niño que va a nacer. Amén.',
    },
  },
  {
    peca: 'anjo', vela: 3, santo: 'santa-luzia',
    titulo: { pt: '3º Domingo do Advento: alegrem-se!', en: '3rd Sunday of Advent: rejoice!', es: '3.er Domingo de Adviento: ¡alégrense!' },
    texto: {
      pt: 'Este domingo se chama Gaudete, que em latim quer dizer alegrem-se, porque o Natal já está perto. Por isso a vela de hoje é cor-de-rosa. Também é dia de Santa Luzia, jovem mártir de Siracusa, cujo nome lembra a luz. No Evangelho (João 1,6-8.19-28), João Batista dá testemunho da luz que vem.',
      en: 'This Sunday is called Gaudete, which means "rejoice" in Latin, because Christmas is near. That is why today\'s candle is rose-colored. It is also the day of Saint Lucy, a young martyr of Syracuse whose name recalls light. In the Gospel (John 1:6-8, 19-28), John the Baptist bears witness to the light that is coming.',
      es: 'Este domingo se llama Gaudete, que en latín quiere decir alégrense, porque la Navidad ya está cerca. Por eso la vela de hoy es rosa. También es el día de santa Lucía, joven mártir de Siracusa, cuyo nombre recuerda la luz. En el Evangelio (Juan 1,6-8.19-28), Juan el Bautista da testimonio de la luz que viene.',
    },
    gesto: {
      pt: 'Acenda a terceira vela, a cor-de-rosa. Agradeça a Deus por três coisas boas desta semana e leve alegria para alguém.',
      en: 'Light the third candle, the rose one. Thank God for three good things from this week and bring joy to someone.',
      es: 'Enciende la tercera vela, la rosa. Da gracias a Dios por tres cosas buenas de esta semana y lleva alegría a alguien.',
    },
    oracao: {
      pt: 'Senhor, enche o meu coração da alegria de quem sabe que tu estás perto. Santa Luzia, rogai por nós. Amém.',
      en: 'Lord, fill my heart with the joy of one who knows you are near. Saint Lucy, pray for us. Amen.',
      es: 'Señor, llena mi corazón de la alegría de quien sabe que estás cerca. Santa Lucía, ruega por nosotros. Amén.',
    },
  },
  {
    peca: 'pastor', santo: 'joao-da-cruz',
    titulo: { pt: 'São João da Cruz, a luz na noite', en: 'Saint John of the Cross, light in the night', es: 'San Juan de la Cruz, la luz en la noche' },
    texto: {
      pt: 'João da Cruz foi frade carmelita e ajudou Santa Teresa d\'Ávila a renovar o Carmelo. Por causa disso, chegou a ficar preso por meses, e foi na prisão que escreveu alguns dos seus poemas mais bonitos sobre Deus. Mesmo na escuridão, ele encontrava a luz de Deus. É doutor da Igreja.',
      en: 'John of the Cross was a Carmelite friar who helped Saint Teresa of Ávila renew the Carmel. Because of this he was imprisoned for months, and it was in prison that he wrote some of his most beautiful poems about God. Even in the darkness, he found God\'s light. He is a Doctor of the Church.',
      es: 'Juan de la Cruz fue fraile carmelita y ayudó a santa Teresa de Ávila a renovar el Carmelo. Por eso llegó a estar preso durante meses, y fue en la cárcel donde escribió algunos de sus poemas más hermosos sobre Dios. Incluso en la oscuridad, encontraba la luz de Dios. Es doctor de la Iglesia.',
    },
    gesto: {
      pt: 'Fique cinco minutos em silêncio com Deus, sem celular, só dizendo que o ama.',
      en: 'Spend five minutes in silence with God, without your phone, simply telling him you love him.',
      es: 'Quédate cinco minutos en silencio con Dios, sin el celular, solo diciéndole que lo amas.',
    },
    oracao: {
      pt: 'Senhor, quando tudo estiver escuro, sê tu a minha luz. Amém.',
      en: 'Lord, when everything is dark, be my light. Amen.',
      es: 'Señor, cuando todo esté oscuro, sé tú mi luz. Amén.',
    },
  },
  {
    peca: 'cordeiro',
    titulo: { pt: 'Deus quis nascer pobre', en: 'God chose to be born poor', es: 'Dios quiso nacer pobre' },
    texto: {
      pt: 'O Filho de Deus podia ter nascido num palácio, mas escolheu uma manjedoura, num lugar de animais. Os primeiros a visitá-lo foram pastores simples. No Natal, Deus nos ensina que a verdadeira riqueza é o amor.',
      en: 'The Son of God could have been born in a palace, but he chose a manger, in a place for animals. The first to visit him were simple shepherds. At Christmas, God teaches us that true wealth is love.',
      es: 'El Hijo de Dios podía haber nacido en un palacio, pero eligió un pesebre, en un lugar de animales. Los primeros en visitarlo fueron unos pastores sencillos. En Navidad, Dios nos enseña que la verdadera riqueza es el amor.',
    },
    gesto: {
      pt: 'Separe algo em bom estado para doar: uma roupa, um brinquedo ou um alimento.',
      en: 'Set aside something in good condition to give away: clothing, a toy or some food.',
      es: 'Separa algo en buen estado para donar: una prenda, un juguete o un alimento.',
    },
    oracao: {
      pt: 'Menino Jesus, pobre e humilde, dá-me um coração simples e generoso. Amém.',
      en: 'Child Jesus, poor and humble, give me a simple and generous heart. Amen.',
      es: 'Niño Jesús, pobre y humilde, dame un corazón sencillo y generoso. Amén.',
    },
  },
  {
    peca: 'fogueira', acao: 'novena',
    titulo: { pt: 'Começa a Novena de Natal', en: 'The Christmas Novena begins', es: 'Comienza la Novena de Navidad' },
    texto: {
      pt: 'Faltam nove dias para o Natal. Em muitos lugares, as famílias se reúnem nestes dias para rezar juntas a Novena de Natal, preparando a chegada de Jesus como os primeiros discípulos esperaram o Espírito Santo: em oração.',
      en: 'Nine days remain until Christmas. In many places, families gather during these days to pray the Christmas Novena together, preparing for Jesus\' coming just as the first disciples waited for the Holy Spirit: in prayer.',
      es: 'Faltan nueve días para la Navidad. En muchos lugares, las familias se reúnen estos días para rezar juntas la Novena de Navidad, preparando la llegada de Jesús como los primeros discípulos esperaron al Espíritu Santo: en oración.',
    },
    gesto: {
      pt: 'Comece hoje a Novena de Natal, de preferência em família.',
      en: 'Begin the Christmas Novena today, ideally with your family.',
      es: 'Comienza hoy la Novena de Navidad, de preferencia en familia.',
    },
    oracao: {
      pt: 'Vem, Senhor Jesus! Encontra a minha casa e o meu coração preparados. Amém.',
      en: 'Come, Lord Jesus! Find my home and my heart ready. Amen.',
      es: '¡Ven, Señor Jesús! Encuentra mi casa y mi corazón preparados. Amén.',
    },
  },
  {
    peca: 'flautista',
    titulo: { pt: 'Ó Sabedoria', en: 'O Wisdom', es: 'Oh Sabiduría' },
    texto: {
      pt: 'A partir de hoje, a Igreja reza as antífonas do Ó: sete invocações que chamam Jesus por nomes bonitos tirados da Bíblia, uma em cada dia até 23 de dezembro. A primeira chama Jesus de Sabedoria, que vem nos ensinar o caminho da vida.',
      en: 'From today on, the Church prays the O Antiphons: seven invocations that call Jesus by beautiful names taken from the Bible, one each day until December 23. The first calls Jesus Wisdom, who comes to teach us the way of life.',
      es: 'A partir de hoy, la Iglesia reza las antífonas de la O: siete invocaciones que llaman a Jesús con nombres hermosos tomados de la Biblia, una cada día hasta el 23 de diciembre. La primera llama a Jesús Sabiduría, que viene a enseñarnos el camino de la vida.',
    },
    gesto: {
      pt: 'Peça a Deus sabedoria para uma decisão ou um problema que você está vivendo.',
      en: 'Ask God for wisdom about a decision or a problem you are facing.',
      es: 'Pide a Dios sabiduría para una decisión o un problema que estés viviendo.',
    },
    oracao: {
      pt: 'Ó Sabedoria, vem ensinar-nos o caminho da prudência. Amém.',
      en: 'O Wisdom, come and teach us the way of prudence. Amen.',
      es: 'Oh Sabiduría, ven a enseñarnos el camino de la prudencia. Amén.',
    },
  },
  {
    peca: 'cachorro',
    titulo: { pt: 'Ó Adonai', en: 'O Adonai', es: 'Oh Adonai' },
    texto: {
      pt: 'Adonai quer dizer Senhor. Esta antífona lembra o Deus que apareceu a Moisés na sarça ardente e lhe deu a Lei no monte Sinai. Jesus é esse mesmo Senhor, que vem nos libertar com o braço estendido.',
      en: 'Adonai means Lord. This antiphon recalls the God who appeared to Moses in the burning bush and gave him the Law on Mount Sinai. Jesus is that same Lord, who comes to set us free with an outstretched arm.',
      es: 'Adonai quiere decir Señor. Esta antífona recuerda al Dios que se apareció a Moisés en la zarza ardiente y le dio la Ley en el monte Sinaí. Jesús es ese mismo Señor, que viene a liberarnos con el brazo extendido.',
    },
    gesto: {
      pt: 'Cumpra hoje uma promessa que você fez e ainda não cumpriu, ou obedeça com alegria.',
      en: 'Today, keep a promise you made and haven\'t kept yet, or obey cheerfully.',
      es: 'Cumple hoy una promesa que hiciste y todavía no has cumplido, u obedece con alegría.',
    },
    oracao: {
      pt: 'Ó Adonai, vem libertar-nos com o teu braço estendido. Amém.',
      en: 'O Adonai, come and set us free with your outstretched arm. Amen.',
      es: 'Oh Adonai, ven a liberarnos con tu brazo extendido. Amén.',
    },
  },
  {
    peca: 'ovelha3',
    titulo: { pt: 'Ó Raiz de Jessé', en: 'O Root of Jesse', es: 'Oh Raíz de Jesé' },
    texto: {
      pt: 'Jessé era o pai do rei Davi. Isaías anunciou que, da família de Jessé, nasceria um broto cheio do Espírito de Deus (Isaías 11,1). Jesus nasceu dessa família: Deus entrou na história de uma família de verdade, com avós e antepassados, como a nossa.',
      en: 'Jesse was the father of King David. Isaiah foretold that from Jesse\'s family a shoot would spring up, filled with the Spirit of God (Isaiah 11:1). Jesus was born into that family: God entered the history of a real family, with grandparents and ancestors, just like ours.',
      es: 'Jesé era el padre del rey David. Isaías anunció que de la familia de Jesé brotaría un retoño lleno del Espíritu de Dios (Isaías 11,1). Jesús nació en esa familia: Dios entró en la historia de una familia de verdad, con abuelos y antepasados, como la nuestra.',
    },
    gesto: {
      pt: 'Reze pelos seus avós e pelos antepassados da sua família, vivos e falecidos.',
      en: 'Pray for your grandparents and for the ancestors of your family, living and deceased.',
      es: 'Reza por tus abuelos y por los antepasados de tu familia, vivos y difuntos.',
    },
    oracao: {
      pt: 'Ó Raiz de Jessé, vem libertar-nos, não tardes mais. Amém.',
      en: 'O Root of Jesse, come to deliver us, and delay no longer. Amen.',
      es: 'Oh Raíz de Jesé, ven a librarnos, no tardes más. Amén.',
    },
  },
  {
    peca: 'pastora', vela: 4, santo: 'gabriel',
    titulo: { pt: '4º Domingo do Advento: o sim de Maria', en: '4th Sunday of Advent: Mary\'s yes', es: '4.º Domingo de Adviento: el sí de María' },
    texto: {
      pt: 'No Evangelho deste domingo (Lucas 1,26-38), o anjo Gabriel visita Maria em Nazaré, e ela responde: Eis aqui a serva do Senhor. A antífona de hoje chama Jesus de Chave de Davi, aquele que abre as portas que ninguém consegue fechar. O sim de Maria abriu a porta do Natal.',
      en: 'In this Sunday\'s Gospel (Luke 1:26-38), the angel Gabriel visits Mary in Nazareth, and she answers: Behold, the handmaid of the Lord. Today\'s antiphon calls Jesus the Key of David, the one who opens doors that no one can shut. Mary\'s yes opened the door to Christmas.',
      es: 'En el Evangelio de este domingo (Lucas 1,26-38), el ángel Gabriel visita a María en Nazaret, y ella responde: He aquí la esclava del Señor. La antífona de hoy llama a Jesús Llave de David, el que abre las puertas que nadie puede cerrar. El sí de María abrió la puerta de la Navidad.',
    },
    gesto: {
      pt: 'Acenda a quarta vela. Diga sim a Deus em alguma coisa difícil que você vem adiando.',
      en: 'Light the fourth candle. Say yes to God in something difficult you have been putting off.',
      es: 'Enciende la cuarta vela. Dile sí a Dios en algo difícil que has ido postergando.',
    },
    oracao: {
      pt: 'Maria, ajuda-me a dizer sim a Deus como você disse. Ó Chave de Davi, vem abrir o meu coração. Amém.',
      en: 'Mary, help me say yes to God as you did. O Key of David, come and open my heart. Amen.',
      es: 'María, ayúdame a decirle sí a Dios como tú se lo dijiste. Oh Llave de David, ven a abrir mi corazón. Amén.',
    },
  },
  {
    peca: 'estrela', santo: 'pedro-canisio', acao: 'trilhas',
    titulo: { pt: 'Ó Sol nascente', en: 'O Dayspring', es: 'Oh Sol que naces' },
    texto: {
      pt: 'Hoje é o dia mais curto do ano no hemisfério norte, e a Igreja chama Jesus de Sol nascente, a luz que vem iluminar quem está na escuridão. Também é dia de São Pedro Canísio, doutor da Igreja, que escreveu catecismos para ensinar a fé de um jeito simples a crianças e adultos.',
      en: 'Today is the shortest day of the year in the Northern Hemisphere, and the Church calls Jesus the Dayspring, the light that comes to shine on those who sit in darkness. It is also the day of Saint Peter Canisius, Doctor of the Church, who wrote catechisms to teach the faith in a simple way to children and adults.',
      es: 'Hoy es el día más corto del año en el hemisferio norte, y la Iglesia llama a Jesús Sol que nace, la luz que viene a iluminar a quienes están en tinieblas. También es el día de san Pedro Canisio, doctor de la Iglesia, que escribió catecismos para enseñar la fe de manera sencilla a niños y adultos.',
    },
    gesto: {
      pt: 'Aprenda ou ensine alguma coisa da fé hoje: faça uma missão das trilhas ou conte a história de um santo para alguém.',
      en: 'Learn or teach something about the faith today: do a trail mission or tell someone the story of a saint.',
      es: 'Aprende o enseña hoy algo de la fe: haz una misión de los senderos o cuéntale a alguien la historia de un santo.',
    },
    oracao: {
      pt: 'Ó Sol nascente, vem iluminar os que estão nas trevas e na sombra da morte. Amém.',
      en: 'O Dayspring, come and shine on those who dwell in darkness and the shadow of death. Amen.',
      es: 'Oh Sol que naces, ven a iluminar a los que viven en tinieblas y en sombra de muerte. Amén.',
    },
  },
  {
    peca: 'ciprestes',
    titulo: { pt: 'Ó Rei das nações', en: 'O King of the nations', es: 'Oh Rey de las naciones' },
    texto: {
      pt: 'A antífona de hoje chama Jesus de Rei de todos os povos, a pedra angular que une o que estava separado. Nestes dias, o Evangelho lembra o cântico de Maria, o Magnificat (Lucas 1,46-55), em que ela louva a Deus que olha para os pequenos.',
      en: 'Today\'s antiphon calls Jesus King of all peoples, the cornerstone who unites what was divided. In these days the Gospel recalls Mary\'s song, the Magnificat (Luke 1:46-55), in which she praises God who looks upon the lowly.',
      es: 'La antífona de hoy llama a Jesús Rey de todos los pueblos, la piedra angular que une lo que estaba separado. En estos días, el Evangelio recuerda el cántico de María, el Magníficat (Lucas 1,46-55), en el que ella alaba a Dios que mira a los pequeños.',
    },
    gesto: {
      pt: 'Reze pela paz entre os povos e faça as pazes com alguém, se estiver brigado.',
      en: 'Pray for peace among nations, and make peace with someone if you have quarreled.',
      es: 'Reza por la paz entre los pueblos y haz las paces con alguien, si estás peleado.',
    },
    oracao: {
      pt: 'Ó Rei das nações, vem salvar o homem que formaste do barro da terra. Amém.',
      en: 'O King of the nations, come and save the man you fashioned from the dust of the earth. Amen.',
      es: 'Oh Rey de las naciones, ven a salvar al hombre que formaste del barro de la tierra. Amén.',
    },
  },
  {
    peca: 'anjosGloria', acao: 'exame',
    titulo: { pt: 'Ó Emanuel, Deus conosco', en: 'O Emmanuel, God with us', es: 'Oh Emmanuel, Dios con nosotros' },
    texto: {
      pt: 'Emanuel quer dizer Deus conosco (Mateus 1,23). É a última antífona do Ó: amanhã já é véspera de Natal. Deus não ficou longe olhando o mundo de cima: ele veio morar no meio de nós, e quer morar também no nosso coração.',
      en: 'Emmanuel means God with us (Matthew 1:23). This is the last of the O Antiphons: tomorrow is already Christmas Eve. God did not stay far away, watching the world from above: he came to dwell among us, and he wants to dwell in our hearts too.',
      es: 'Emmanuel quiere decir Dios con nosotros (Mateo 1,23). Es la última antífona de la O: mañana ya es Nochebuena. Dios no se quedó lejos mirando el mundo desde arriba: vino a vivir en medio de nosotros, y quiere vivir también en nuestro corazón.',
    },
    gesto: {
      pt: 'Se puder, confesse-se antes do Natal. Se não puder, faça um bom exame de consciência e peça perdão a Deus.',
      en: 'If you can, go to confession before Christmas. If you can\'t, make a good examination of conscience and ask God for forgiveness.',
      es: 'Si puedes, confiésate antes de Navidad. Si no puedes, haz un buen examen de conciencia y pide perdón a Dios.',
    },
    oracao: {
      pt: 'Ó Emanuel, Deus conosco, vem salvar-nos, Senhor nosso Deus. Amém.',
      en: 'O Emmanuel, God with us, come and save us, O Lord our God. Amen.',
      es: 'Oh Emmanuel, Dios con nosotros, ven a salvarnos, Señor Dios nuestro. Amén.',
    },
  },
  {
    peca: 'luz',
    titulo: { pt: 'Véspera de Natal: não havia lugar', en: 'Christmas Eve: there was no room', es: 'Nochebuena: no había lugar' },
    texto: {
      pt: 'Maria e José chegaram a Belém, mas não havia lugar para eles na hospedaria, e por isso Jesus foi deitado numa manjedoura (Lucas 2,7). Hoje à noite, a Igreja celebra a Missa do Natal. A pergunta é: há lugar para Jesus na minha casa e no meu coração?',
      en: 'Mary and Joseph arrived in Bethlehem, but there was no room for them at the inn, so Jesus was laid in a manger (Luke 2:7). Tonight the Church celebrates the Christmas Mass. The question is: is there room for Jesus in my home and in my heart?',
      es: 'María y José llegaron a Belén, pero no había lugar para ellos en la posada, y por eso Jesús fue acostado en un pesebre (Lucas 2,7). Esta noche la Iglesia celebra la Misa de Navidad. La pregunta es: ¿hay lugar para Jesús en mi casa y en mi corazón?',
    },
    gesto: {
      pt: 'Participe da Missa do Natal e, antes da ceia, rezem juntos agradecendo pelo ano e pelas pessoas à mesa.',
      en: 'Take part in the Christmas Mass and, before dinner, pray together giving thanks for the year and for the people at the table.',
      es: 'Participa en la Misa de Navidad y, antes de la cena, recen juntos dando gracias por el año y por las personas a la mesa.',
    },
    oracao: {
      pt: 'Menino Jesus, a minha casa e o meu coração são teus. Vem! Amém.',
      en: 'Child Jesus, my home and my heart are yours. Come! Amen.',
      es: 'Niño Jesús, mi casa y mi corazón son tuyos. ¡Ven! Amén.',
    },
  },
  {
    peca: 'menino', natal: true,
    titulo: { pt: 'Feliz Natal! Jesus nasceu', en: 'Merry Christmas! Jesus is born', es: '¡Feliz Navidad! Jesús ha nacido' },
    texto: {
      pt: 'Hoje nasceu o Salvador! Os anjos cantaram Glória a Deus no mais alto dos céus e paz na terra (Lucas 2,14), e os pastores correram para ver o Menino. O Filho de Deus se fez criança para que ninguém tivesse medo de chegar perto dele.',
      en: 'Today the Savior is born! The angels sang Glory to God in the highest and peace on earth (Luke 2:14), and the shepherds hurried to see the Child. The Son of God became a little child so that no one would be afraid to come close to him.',
      es: '¡Hoy nació el Salvador! Los ángeles cantaron Gloria a Dios en el cielo y paz en la tierra (Lucas 2,14), y los pastores corrieron a ver al Niño. El Hijo de Dios se hizo niño para que nadie tuviera miedo de acercarse a él.',
    },
    gesto: {
      pt: 'Vá à Missa de Natal, dê um abraço em cada pessoa da sua casa e diga: Jesus nasceu!',
      en: 'Go to Christmas Mass, hug everyone in your home and say: Jesus is born!',
      es: 'Ve a la Misa de Navidad, abraza a cada persona de tu casa y di: ¡Jesús ha nacido!',
    },
    oracao: {
      pt: 'Glória a Deus nas alturas! Menino Jesus, obrigado por ter vindo morar entre nós. Amém.',
      en: 'Glory to God in the highest! Child Jesus, thank you for coming to dwell among us. Amen.',
      es: '¡Gloria a Dios en las alturas! Niño Jesús, gracias por venir a vivir entre nosotros. Amén.',
    },
  },
];

const DIA_DA_EPIFANIA = {
  peca: 'magos', epifania: true,
  titulo: { pt: 'Epifania: os Reis Magos chegaram', en: 'Epiphany: the Magi have arrived', es: 'Epifanía: llegaron los Reyes Magos' },
  texto: {
    pt: 'Guiados por uma estrela, Magos vindos do Oriente chegaram para adorar o Menino e lhe ofereceram ouro, incenso e mirra (Mateus 2,1-12). Jesus veio para todos os povos da terra.',
    en: 'Guided by a star, Magi from the East came to worship the Child and offered him gold, frankincense and myrrh (Matthew 2:1-12). Jesus came for all the peoples of the earth.',
    es: 'Guiados por una estrella, unos Magos venidos de Oriente llegaron para adorar al Niño y le ofrecieron oro, incienso y mirra (Mateo 2,1-12). Jesús vino para todos los pueblos de la tierra.',
  },
  gesto: {
    pt: 'Ofereça a Jesus um presente do coração: uma oração, um sacrifício ou uma boa ação.',
    en: 'Offer Jesus a gift from the heart: a prayer, a sacrifice or a good deed.',
    es: 'Ofrece a Jesús un regalo del corazón: una oración, un sacrificio o una buena acción.',
  },
  oracao: {
    pt: 'Jesus, como os Magos, eu também quero te adorar e te dar o melhor de mim. Amém.',
    en: 'Jesus, like the Magi, I too want to worship you and give you the best of myself. Amen.',
    es: 'Jesús, como los Magos, yo también quiero adorarte y darte lo mejor de mí. Amén.',
  },
};

const NOMES_DAS_PECAS_DO_PRESEPIO = {
  gruta: { pt: 'O estábulo', en: 'The stable', es: 'El establo' },
  palha: { pt: 'A palha', en: 'The straw', es: 'La paja' },
  lamparina: { pt: 'A lamparina', en: 'The lamp', es: 'El farol' },
  manjedoura: { pt: 'A manjedoura', en: 'The manger', es: 'El pesebre' },
  boi: { pt: 'O boi', en: 'The ox', es: 'El buey' },
  burro: { pt: 'O burrinho', en: 'The donkey', es: 'El burrito' },
  ovelha1: { pt: 'Uma ovelha', en: 'A sheep', es: 'Una oveja' },
  palmeira: { pt: 'A palmeira', en: 'The palm tree', es: 'La palmera' },
  belem: { pt: 'A cidade de Belém', en: 'The town of Bethlehem', es: 'La ciudad de Belén' },
  maria: { pt: 'Maria', en: 'Mary', es: 'María' },
  ovelha2: { pt: 'Outra ovelha', en: 'Another sheep', es: 'Otra oveja' },
  jose: { pt: 'São José', en: 'Saint Joseph', es: 'San José' },
  poco: { pt: 'O poço', en: 'The well', es: 'El pozo' },
  roseira: { pt: 'As rosas de Guadalupe', en: 'The roses of Guadalupe', es: 'Las rosas de Guadalupe' },
  anjo: { pt: 'O anjo', en: 'The angel', es: 'El ángel' },
  pastor: { pt: 'O pastor', en: 'The shepherd', es: 'El pastor' },
  cordeiro: { pt: 'O cordeirinho', en: 'The little lamb', es: 'El corderito' },
  fogueira: { pt: 'A fogueira dos pastores', en: 'The shepherds\' fire', es: 'La fogata de los pastores' },
  flautista: { pt: 'O pastorzinho da flauta', en: 'The little shepherd with a flute', es: 'El pastorcito de la flauta' },
  cachorro: { pt: 'O cão do pastor', en: 'The shepherd\'s dog', es: 'El perro del pastor' },
  ovelha3: { pt: 'Mais uma ovelha', en: 'One more sheep', es: 'Una oveja más' },
  pastora: { pt: 'A pastora', en: 'The shepherdess', es: 'La pastora' },
  estrela: { pt: 'A estrela de Belém', en: 'The Star of Bethlehem', es: 'La estrella de Belén' },
  ciprestes: { pt: 'Os ciprestes', en: 'The cypress trees', es: 'Los cipreses' },
  anjosGloria: { pt: 'Os anjos do Glória', en: 'The Gloria angels', es: 'Los ángeles del Gloria' },
  luz: { pt: 'A luz de Natal', en: 'The Christmas light', es: 'La luz de Navidad' },
  menino: { pt: 'O Menino Jesus', en: 'The Child Jesus', es: 'El Niño Jesús' },
  magos: { pt: 'Os Reis Magos', en: 'The Magi', es: 'Los Reyes Magos' },
};
