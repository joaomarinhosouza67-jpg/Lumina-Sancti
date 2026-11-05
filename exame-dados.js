const EXAMES_DE_CONSCIENCIA = {
  crianca: {
    nome: { pt: 'Para crianças', en: 'For children', es: 'Para niños' },
    idade: { pt: 'até 12 anos', en: 'up to age 12', es: 'hasta 12 años' },
    grupos: [
      {
        titulo: { pt: 'Com Deus', en: 'With God', es: 'Con Dios' },
        perguntas: [
          { pt: 'Rezei todos os dias?', en: 'Did I pray every day?', es: '¿Recé todos los días?' },
          { pt: 'Fui à Missa no domingo com a minha família?', en: 'Did I go to Mass on Sunday with my family?', es: '¿Fui a Misa el domingo con mi familia?' },
          { pt: 'Falei o nome de Jesus com respeito?', en: 'Did I say the name of Jesus with respect?', es: '¿Dije el nombre de Jesús con respeto?' },
          { pt: 'Fiquei bagunçando ou brincando durante a Missa?', en: 'Did I mess around or play during Mass?', es: '¿Estuve jugando o haciendo desorden durante la Misa?' },
        ],
      },
      {
        titulo: { pt: 'Com a minha família', en: 'With my family', es: 'Con mi familia' },
        perguntas: [
          { pt: 'Obedeci ao papai, à mamãe ou a quem cuida de mim?', en: 'Did I obey my dad, my mom or whoever takes care of me?', es: '¿Obedecí a papá, a mamá o a quien me cuida?' },
          { pt: 'Respondi mal ou fiz birra?', en: 'Did I talk back or throw a tantrum?', es: '¿Contesté mal o hice berrinche?' },
          { pt: 'Ajudei em casa quando me pediram?', en: 'Did I help at home when I was asked?', es: '¿Ayudé en casa cuando me lo pidieron?' },
          { pt: 'Briguei com os meus irmãos ou primos?', en: 'Did I fight with my brothers, sisters or cousins?', es: '¿Me peleé con mis hermanos o primos?' },
        ],
      },
      {
        titulo: { pt: 'Com os outros', en: 'With others', es: 'Con los demás' },
        perguntas: [
          { pt: 'Falei palavrão ou xinguei alguém?', en: 'Did I use bad words or call someone names?', es: '¿Dije groserías o insulté a alguien?' },
          { pt: 'Bati, empurrei ou machuquei alguém?', en: 'Did I hit, push or hurt someone?', es: '¿Le pegué, empujé o lastimé a alguien?' },
          { pt: 'Deixei alguém de fora da brincadeira de propósito?', en: 'Did I leave someone out of a game on purpose?', es: '¿Dejé a alguien fuera del juego a propósito?' },
          { pt: 'Peguei alguma coisa que não era minha?', en: 'Did I take something that wasn\'t mine?', es: '¿Tomé algo que no era mío?' },
          { pt: 'Contei mentira?', en: 'Did I tell a lie?', es: '¿Dije mentiras?' },
          { pt: 'Fiz fofoca ou ri de alguém para humilhar?', en: 'Did I gossip or laugh at someone to make them feel bad?', es: '¿Hice chismes o me reí de alguien para humillarlo?' },
        ],
      },
      {
        titulo: { pt: 'Comigo mesmo', en: 'With myself', es: 'Conmigo mismo' },
        perguntas: [
          { pt: 'Fui preguiçoso com as tarefas da escola?', en: 'Was I lazy with my schoolwork?', es: '¿Fui perezoso con las tareas de la escuela?' },
          { pt: 'Tive inveja dos brinquedos ou das coisas dos outros?', en: 'Was I jealous of other people\'s toys or things?', es: '¿Tuve envidia de los juguetes o las cosas de los demás?' },
          { pt: 'Respeitei o meu corpo e o corpo dos outros?', en: 'Did I respect my body and other people\'s bodies?', es: '¿Respeté mi cuerpo y el cuerpo de los demás?' },
        ],
      },
    ],
  },
  jovem: {
    nome: { pt: 'Para jovens', en: 'For teens', es: 'Para jóvenes' },
    idade: { pt: '13 a 17 anos', en: 'ages 13 to 17', es: 'de 13 a 17 años' },
    grupos: [
      {
        titulo: { pt: '1º mandamento: amar a Deus sobre todas as coisas', en: '1st commandment: love God above all things', es: '1.er mandamiento: amar a Dios sobre todas las cosas' },
        perguntas: [
          { pt: 'Rezei todos os dias, ou deixei Deus de lado?', en: 'Did I pray every day, or did I set God aside?', es: '¿Recé todos los días, o dejé a Dios de lado?' },
          { pt: 'Tive vergonha de mostrar que sou católico?', en: 'Was I ashamed to show that I am Catholic?', es: '¿Tuve vergüenza de mostrar que soy católico?' },
          { pt: 'Busquei horóscopo, tarô, simpatias ou outras superstições?', en: 'Did I turn to horoscopes, tarot, charms or other superstitions?', es: '¿Busqué horóscopos, tarot, amuletos u otras supersticiones?' },
          { pt: 'O celular, os jogos ou as redes sociais tomaram o lugar de Deus?', en: 'Did my phone, games or social media take God\'s place?', es: '¿El celular, los juegos o las redes sociales ocuparon el lugar de Dios?' },
        ],
      },
      {
        titulo: { pt: '2º mandamento: não tomar seu santo nome em vão', en: '2nd commandment: do not take his holy name in vain', es: '2.º mandamiento: no tomar su santo nombre en vano' },
        perguntas: [
          { pt: 'Usei o nome de Deus de brincadeira ou com raiva?', en: 'Did I use God\'s name as a joke or in anger?', es: '¿Usé el nombre de Dios en broma o con rabia?' },
          { pt: 'Zombei da fé ou de coisas sagradas?', en: 'Did I mock the faith or sacred things?', es: '¿Me burlé de la fe o de cosas sagradas?' },
        ],
      },
      {
        titulo: { pt: '3º mandamento: guardar domingos e festas', en: '3rd commandment: keep holy the Lord\'s Day', es: '3.er mandamiento: santificar las fiestas' },
        perguntas: [
          { pt: 'Faltei à Missa no domingo por preguiça ou por escolha minha?', en: 'Did I miss Sunday Mass out of laziness or by my own choice?', es: '¿Falté a Misa el domingo por pereza o porque quise?' },
          { pt: 'Fiquei no celular ou desatento na Missa de propósito?', en: 'Did I stay on my phone or deliberately ignore what was happening at Mass?', es: '¿Estuve en el celular o distraído a propósito en la Misa?' },
        ],
      },
      {
        titulo: { pt: '4º mandamento: honrar pai e mãe', en: '4th commandment: honor your father and mother', es: '4.º mandamiento: honrar padre y madre' },
        perguntas: [
          { pt: 'Desobedeci ou respondi mal aos meus pais?', en: 'Did I disobey or talk back to my parents?', es: '¿Desobedecí o contesté mal a mis padres?' },
          { pt: 'Menti para os meus pais ou escondi coisas importantes deles?', en: 'Did I lie to my parents or hide important things from them?', es: '¿Les mentí a mis padres o les escondí cosas importantes?' },
          { pt: 'Respeitei os professores e os mais velhos?', en: 'Did I respect my teachers and my elders?', es: '¿Respeté a los profesores y a los mayores?' },
        ],
      },
      {
        titulo: { pt: '5º mandamento: não matar', en: '5th commandment: you shall not kill', es: '5.º mandamiento: no matar' },
        perguntas: [
          { pt: 'Briguei, xinguei ou humilhei alguém, também na internet?', en: 'Did I fight with, insult or humiliate someone, including online?', es: '¿Me peleé, insulté o humillé a alguien, también en internet?' },
          { pt: 'Fiz bullying, ou ri de quem estava sofrendo bullying?', en: 'Did I bully someone, or laugh at someone being bullied?', es: '¿Hice bullying, o me reí de quien lo sufría?' },
          { pt: 'Guardei raiva e não quis perdoar?', en: 'Did I hold on to anger and refuse to forgive?', es: '¿Guardé rencor y no quise perdonar?' },
          { pt: 'Usei bebida alcoólica, cigarro, vape ou drogas?', en: 'Did I use alcohol, cigarettes, vapes or drugs?', es: '¿Consumí alcohol, cigarrillo, vapeador o drogas?' },
        ],
      },
      {
        titulo: { pt: '6º e 9º mandamentos: a pureza', en: '6th and 9th commandments: purity', es: '6.º y 9.º mandamientos: la pureza' },
        perguntas: [
          { pt: 'Olhei ou procurei de propósito conteúdos impuros (pornografia)?', en: 'Did I deliberately look at or search for impure content (pornography)?', es: '¿Miré o busqué a propósito contenidos impuros (pornografía)?' },
          { pt: 'Respeitei o meu corpo e o dos outros, também em conversas, piadas e fotos?', en: 'Did I respect my body and others\', also in conversations, jokes and photos?', es: '¿Respeté mi cuerpo y el de los demás, también en conversaciones, chistes y fotos?' },
          { pt: 'Mandei, pedi ou guardei fotos impróprias?', en: 'Did I send, ask for or keep inappropriate photos?', es: '¿Envié, pedí o guardé fotos inapropiadas?' },
        ],
      },
      {
        titulo: { pt: '7º e 10º mandamentos: não roubar e não cobiçar', en: '7th and 10th commandments: do not steal or covet', es: '7.º y 10.º mandamientos: no robar ni codiciar' },
        perguntas: [
          { pt: 'Peguei algo que não era meu, ou colei na prova?', en: 'Did I take something that wasn\'t mine, or cheat on a test?', es: '¿Tomé algo que no era mío, o copié en un examen?' },
          { pt: 'Estraguei de propósito coisas dos outros ou da escola?', en: 'Did I damage other people\'s or the school\'s things on purpose?', es: '¿Dañé a propósito cosas de otros o de la escuela?' },
          { pt: 'Tive inveja das coisas ou da vida dos outros?', en: 'Was I envious of other people\'s things or lives?', es: '¿Tuve envidia de las cosas o de la vida de los demás?' },
        ],
      },
      {
        titulo: { pt: '8º mandamento: não mentir', en: '8th commandment: do not bear false witness', es: '8.º mandamiento: no mentir' },
        perguntas: [
          { pt: 'Menti?', en: 'Did I lie?', es: '¿Mentí?' },
          { pt: 'Fiz fofoca ou espalhei boatos, também nas redes sociais?', en: 'Did I gossip or spread rumors, including on social media?', es: '¿Hice chismes o difundí rumores, también en las redes sociales?' },
          { pt: 'Falei mal de alguém pelas costas?', en: 'Did I speak badly of someone behind their back?', es: '¿Hablé mal de alguien a sus espaldas?' },
        ],
      },
      {
        titulo: { pt: 'Mandamentos da Igreja', en: 'Precepts of the Church', es: 'Mandamientos de la Iglesia' },
        perguntas: [
          { pt: 'Confessei-me pelo menos uma vez no ano?', en: 'Did I go to confession at least once this year?', es: '¿Me confesé por lo menos una vez en el año?' },
          { pt: 'Comunguei sabendo que estava em pecado grave?', en: 'Did I receive Communion knowing I was in serious sin?', es: '¿Comulgué sabiendo que estaba en pecado grave?' },
        ],
      },
    ],
  },
  adulto: {
    nome: { pt: 'Para adultos', en: 'For adults', es: 'Para adultos' },
    idade: { pt: '18 anos ou mais', en: 'ages 18 and up', es: '18 años o más' },
    grupos: [
      {
        titulo: { pt: '1º mandamento: amar a Deus sobre todas as coisas', en: '1st commandment: love God above all things', es: '1.er mandamiento: amar a Dios sobre todas las cosas' },
        perguntas: [
          { pt: 'Rezei todos os dias, ou deixei Deus de lado por semanas?', en: 'Did I pray every day, or did I set God aside for weeks?', es: '¿Recé todos los días, o dejé a Dios de lado por semanas?' },
          { pt: 'Duvidei da fé de propósito, ou tive vergonha de ser católico?', en: 'Did I deliberately doubt the faith, or was I ashamed of being Catholic?', es: '¿Dudé de la fe a propósito, o tuve vergüenza de ser católico?' },
          { pt: 'Procurei horóscopo, cartomantes, simpatias ou outras superstições?', en: 'Did I turn to horoscopes, fortune-tellers, charms or other superstitions?', es: '¿Busqué horóscopos, adivinos, amuletos u otras supersticiones?' },
          { pt: 'Coloquei o dinheiro, o trabalho, o celular ou o prazer acima de Deus?', en: 'Did I put money, work, my phone or pleasure above God?', es: '¿Puse el dinero, el trabajo, el celular o el placer por encima de Dios?' },
        ],
      },
      {
        titulo: { pt: '2º mandamento: não tomar seu santo nome em vão', en: '2nd commandment: do not take his holy name in vain', es: '2.º mandamiento: no tomar su santo nombre en vano' },
        perguntas: [
          { pt: 'Usei o nome de Deus, de Jesus, de Maria ou dos santos com raiva ou de brincadeira?', en: 'Did I use the name of God, Jesus, Mary or the saints in anger or as a joke?', es: '¿Usé el nombre de Dios, de Jesús, de María o de los santos con rabia o en broma?' },
          { pt: 'Falei contra Deus ou contra a Igreja (blasfêmia)?', en: 'Did I speak against God or the Church (blasphemy)?', es: '¿Hablé contra Dios o contra la Iglesia (blasfemia)?' },
          { pt: 'Fiz promessas a Deus e não cumpri, ou jurei em falso?', en: 'Did I make promises to God and not keep them, or swear falsely?', es: '¿Hice promesas a Dios y no las cumplí, o juré en falso?' },
        ],
      },
      {
        titulo: { pt: '3º mandamento: guardar domingos e festas', en: '3rd commandment: keep holy the Lord\'s Day', es: '3.er mandamiento: santificar las fiestas' },
        perguntas: [
          { pt: 'Faltei à Missa no domingo ou num dia santo por culpa minha?', en: 'Did I miss Mass on a Sunday or holy day through my own fault?', es: '¿Falté a Misa en domingo o en un día de precepto por mi culpa?' },
          { pt: 'Fiquei distraído de propósito na Missa, ou cheguei atrasado sem motivo?', en: 'Was I deliberately distracted at Mass, or late without reason?', es: '¿Estuve distraído a propósito en la Misa, o llegué tarde sin motivo?' },
          { pt: 'Trabalhei sem necessidade no domingo, sem deixar tempo para Deus e para a família?', en: 'Did I work unnecessarily on Sunday, leaving no time for God and my family?', es: '¿Trabajé sin necesidad el domingo, sin dejar tiempo para Dios y para la familia?' },
        ],
      },
      {
        titulo: { pt: '4º mandamento: honrar pai e mãe', en: '4th commandment: honor your father and mother', es: '4.º mandamiento: honrar padre y madre' },
        perguntas: [
          { pt: 'Tratei os meus pais com desrespeito, ou os abandonei na velhice ou na doença?', en: 'Did I treat my parents with disrespect, or neglect them in old age or sickness?', es: '¿Traté a mis padres con falta de respeto, o los abandoné en la vejez o en la enfermedad?' },
          { pt: 'Cuidei da educação dos meus filhos na fé e dei bom exemplo a eles?', en: 'Did I take care of my children\'s education in the faith and give them a good example?', es: '¿Me ocupé de la educación de mis hijos en la fe y les di buen ejemplo?' },
          { pt: 'Respeitei as autoridades legítimas e cumpri os meus deveres de cidadão?', en: 'Did I respect legitimate authorities and fulfill my duties as a citizen?', es: '¿Respeté a las autoridades legítimas y cumplí mis deberes de ciudadano?' },
        ],
      },
      {
        titulo: { pt: '5º mandamento: não matar', en: '5th commandment: you shall not kill', es: '5.º mandamiento: no matar' },
        perguntas: [
          { pt: 'Tive ódio, desejei mal ou guardei rancor de alguém?', en: 'Did I hate, wish harm on or hold a grudge against someone?', es: '¿Tuve odio, deseé el mal o guardé rencor a alguien?' },
          { pt: 'Agredi alguém com palavras ou com atos?', en: 'Did I attack someone with words or actions?', es: '¿Agredí a alguien con palabras o con actos?' },
          { pt: 'Participei, aconselhei ou ajudei em algum aborto?', en: 'Did I take part in, advise or help with an abortion?', es: '¿Participé, aconsejé o ayudé en algún aborto?' },
          { pt: 'Coloquei em risco a minha vida ou a dos outros, com bebida ao volante, drogas ou excessos?', en: 'Did I put my life or others\' at risk through drunk driving, drugs or excess?', es: '¿Puse en riesgo mi vida o la de otros, conduciendo bebido, con drogas o excesos?' },
          { pt: 'Dei mau exemplo que levou alguém a pecar?', en: 'Did I give a bad example that led someone to sin?', es: '¿Di mal ejemplo que llevó a alguien a pecar?' },
        ],
      },
      {
        titulo: { pt: '6º e 9º mandamentos: a castidade', en: '6th and 9th commandments: chastity', es: '6.º y 9.º mandamientos: la castidad' },
        perguntas: [
          { pt: 'Fui fiel ao meu marido ou à minha esposa em pensamentos e atos?', en: 'Was I faithful to my husband or wife in thought and deed?', es: '¿Fui fiel a mi esposo o a mi esposa en pensamientos y actos?' },
          { pt: 'Consumi pornografia ou alimentei pensamentos impuros de propósito?', en: 'Did I view pornography or deliberately entertain impure thoughts?', es: '¿Consumí pornografía o alimenté pensamientos impuros a propósito?' },
          { pt: 'Tive relações sexuais fora do casamento?', en: 'Did I have sexual relations outside of marriage?', es: '¿Tuve relaciones sexuales fuera del matrimonio?' },
          { pt: 'Tratei o meu corpo e o dos outros com respeito e pureza?', en: 'Did I treat my body and others\' with respect and purity?', es: '¿Traté mi cuerpo y el de los demás con respeto y pureza?' },
        ],
      },
      {
        titulo: { pt: '7º e 10º mandamentos: não roubar e não cobiçar', en: '7th and 10th commandments: do not steal or covet', es: '7.º y 10.º mandamientos: no robar ni codiciar' },
        perguntas: [
          { pt: 'Roubei ou fiquei com algo que não era meu? Devolvi?', en: 'Did I steal or keep something that wasn\'t mine? Did I give it back?', es: '¿Robé o me quedé con algo que no era mío? ¿Lo devolví?' },
          { pt: 'Fui honesto no trabalho, nos impostos e nos negócios?', en: 'Was I honest at work, with taxes and in business?', es: '¿Fui honesto en el trabajo, con los impuestos y en los negocios?' },
          { pt: 'Deixei de ajudar quem precisava, podendo ajudar?', en: 'Did I fail to help someone in need when I could have?', es: '¿Dejé de ayudar a quien lo necesitaba, pudiendo hacerlo?' },
          { pt: 'Tive inveja dos bens ou do sucesso dos outros?', en: 'Was I envious of other people\'s possessions or success?', es: '¿Tuve envidia de los bienes o del éxito de los demás?' },
        ],
      },
      {
        titulo: { pt: '8º mandamento: não levantar falso testemunho', en: '8th commandment: do not bear false witness', es: '8.º mandamiento: no dar falso testimonio' },
        perguntas: [
          { pt: 'Menti?', en: 'Did I lie?', es: '¿Mentí?' },
          { pt: 'Fiz fofoca, ou contei os defeitos dos outros sem necessidade?', en: 'Did I gossip, or reveal other people\'s faults without need?', es: '¿Hice chismes, o conté los defectos de otros sin necesidad?' },
          { pt: 'Julguei alguém sem conhecer a verdade, ou prejudiquei a boa fama de alguém?', en: 'Did I judge someone without knowing the truth, or damage someone\'s good name?', es: '¿Juzgué a alguien sin conocer la verdad, o dañé la buena fama de alguien?' },
        ],
      },
      {
        titulo: { pt: 'Mandamentos da Igreja', en: 'Precepts of the Church', es: 'Mandamientos de la Iglesia' },
        perguntas: [
          { pt: 'Confessei-me pelo menos uma vez no ano e comunguei no tempo da Páscoa?', en: 'Did I go to confession at least once a year and receive Communion during the Easter season?', es: '¿Me confesé por lo menos una vez al año y comulgué en el tiempo de Pascua?' },
          { pt: 'Comunguei estando em pecado grave?', en: 'Did I receive Communion while in serious sin?', es: '¿Comulgué estando en pecado grave?' },
          { pt: 'Guardei o jejum e a abstinência nos dias marcados pela Igreja?', en: 'Did I keep the fast and abstinence on the days set by the Church?', es: '¿Guardé el ayuno y la abstinencia en los días señalados por la Iglesia?' },
          { pt: 'Ajudei a Igreja com o meu tempo e os meus recursos, conforme as minhas possibilidades?', en: 'Did I help the Church with my time and resources, according to my means?', es: '¿Ayudé a la Iglesia con mi tiempo y mis recursos, según mis posibilidades?' },
        ],
      },
    ],
  },
};

const PASSOS_DA_CONFISSAO = {
  crianca: [
    { pt: 'Peça ajuda a Jesus para lembrar o que você fez de errado e para ficar arrependido de verdade.', en: 'Ask Jesus to help you remember what you did wrong and to be truly sorry.', es: 'Pide ayuda a Jesús para recordar lo que hiciste mal y para arrepentirte de verdad.' },
    { pt: 'Chegando perto do padre, faça o sinal da cruz.', en: 'When you come to the priest, make the Sign of the Cross.', es: 'Al llegar junto al sacerdote, haz la señal de la cruz.' },
    { pt: 'Conte para o padre os seus pecados, com simplicidade e sem medo. Ele guarda segredo para sempre.', en: 'Tell the priest your sins simply and without fear. He keeps them secret forever.', es: 'Cuéntale al sacerdote tus pecados, con sencillez y sin miedo. Él guarda el secreto para siempre.' },
    { pt: 'Escute o conselho do padre e a penitência que ele vai pedir.', en: 'Listen to the priest\'s advice and the penance he gives you.', es: 'Escucha el consejo del sacerdote y la penitencia que te va a pedir.' },
    { pt: 'Reze o Ato de Contrição.', en: 'Pray the Act of Contrition.', es: 'Reza el Acto de Contrición.' },
    { pt: 'O padre dá o perdão de Deus. Responda: Amém. Depois, faça a penitência e agradeça a Jesus!', en: 'The priest gives you God\'s forgiveness. Answer: Amen. Then do your penance and thank Jesus!', es: 'El sacerdote te da el perdón de Dios. Responde: Amén. Después, haz la penitencia y ¡da gracias a Jesús!' },
  ],
  geral: [
    { pt: 'Antes: faça o exame de consciência com calma e peça a Deus um arrependimento sincero.', en: 'Before: make your examination of conscience calmly and ask God for sincere sorrow.', es: 'Antes: haz el examen de conciencia con calma y pide a Dios un arrepentimiento sincero.' },
    { pt: 'Faça o sinal da cruz. Se quiser, diga há quanto tempo foi a sua última confissão.', en: 'Make the Sign of the Cross. If you wish, say how long it has been since your last confession.', es: 'Haz la señal de la cruz. Si quieres, di cuánto tiempo hace de tu última confesión.' },
    { pt: 'Conte os seus pecados com simplicidade e sinceridade. Os pecados graves devem ser todos confessados, dizendo mais ou menos quantas vezes aconteceram.', en: 'Confess your sins simply and sincerely. All serious sins must be confessed, saying roughly how many times they happened.', es: 'Cuenta tus pecados con sencillez y sinceridad. Los pecados graves deben confesarse todos, diciendo más o menos cuántas veces ocurrieron.' },
    { pt: 'Ouça o conselho do padre e a penitência que ele vai dar.', en: 'Listen to the priest\'s advice and the penance he gives.', es: 'Escucha el consejo del sacerdote y la penitencia que te dará.' },
    { pt: 'Reze o Ato de Contrição.', en: 'Pray the Act of Contrition.', es: 'Reza el Acto de Contrición.' },
    { pt: 'O padre dá a absolvição: Deus perdoa os seus pecados. Responda: Amém.', en: 'The priest gives absolution: God forgives your sins. Answer: Amen.', es: 'El sacerdote da la absolución: Dios perdona tus pecados. Responde: Amén.' },
    { pt: 'Depois: cumpra a penitência o quanto antes e agradeça a Deus pela sua misericórdia.', en: 'Afterward: do your penance as soon as you can and thank God for his mercy.', es: 'Después: cumple la penitencia lo antes posible y da gracias a Dios por su misericordia.' },
  ],
};
