const TERMOS_DE_BUSCA_POR_IDIOMA = {
  oracoes: {
    'Medo e proteção': {
      en: ['fear', 'afraid', 'scared', 'frightened', 'panic', 'danger', 'protection', 'protect', 'safety', 'safe', 'defend', 'defense', 'evil', 'enemy', 'enemies', 'devil', 'demon', 'satan', 'temptation', 'spiritual warfare', 'spiritual battle', 'envy', 'evil eye', 'violence', 'threat', 'robbery', 'deliver me'],
      es: ['miedo', 'asustado', 'asustada', 'susto', 'pánico', 'pavor', 'peligro', 'protección', 'proteger', 'protégeme', 'defensa', 'defender', 'librar', 'maldad', 'mal', 'enemigo', 'enemigos', 'demonio', 'diablo', 'satanás', 'tentación', 'batalla espiritual', 'combate espiritual', 'envidia', 'mal de ojo', 'violencia', 'amenaza', 'asalto'],
    },
    'Antes de dormir': {
      en: ['sleep', 'sleeping', 'asleep', 'fall asleep', 'bed', 'bedtime', 'night', 'tonight', 'insomnia', 'nightmare', 'nightmares', 'good night', 'before sleep', 'before bed'],
      es: ['dormir', 'noche', 'sueño', 'insomnio', 'acostarme', 'cama', 'pesadilla', 'pesadillas', 'buenas noches', 'antes de dormir'],
    },
    'Começar o dia': {
      en: ['morning', 'wake', 'awake', 'wake up', 'woke up', 'get up', 'start the day', 'start my day', 'good morning', 'beginning of the day', 'offer the day', 'morning offering'],
      es: ['por la mañana', 'en la mañana', 'despertar', 'desperté', 'levantarme', 'buenos días', 'empezar el día', 'comenzar el día', 'inicio del día', 'ofrecer el día', 'ofrecimiento'],
    },
    'Pedir perdão': {
      en: ['forgiveness', 'forgive me', 'forgive us', 'ask for forgiveness', 'sin', 'sins', 'sinned', 'sinner', 'repent', 'repentance', 'sorry', 'guilt', 'guilty', 'mistake', 'confession', 'confess', 'remorse', 'contrition'],
      es: ['perdón', 'perdóname', 'pecado', 'pecados', 'pequé', 'pecador', 'arrepentimiento', 'arrepentido', 'arrepentida', 'culpa', 'culpable', 'me equivoqué', 'confesión', 'confesar', 'confesarme', 'remordimiento', 'contrición'],
    },
    'Paz e perdoar alguém': {
      en: ['peace', 'fight', 'fighting', 'argument', 'quarrel', 'anger', 'angry', 'hatred', 'hate', 'grudge', 'resentment', 'hurt', 'offended', 'forgive someone', 'forgive others', 'forgive him', 'forgive her', 'forgive them', 'forgive my', 'reconciliation', 'reconcile', 'conflict', 'war', 'discord', 'revenge'],
      es: ['paz', 'pelea', 'peleas', 'peleamos', 'discusión', 'rabia', 'enojo', 'ira', 'odio', 'rencor', 'herida', 'herido', 'ofensa', 'ofendido', 'perdonar a', 'perdonarlo', 'perdonarla', 'reconciliación', 'reconciliarme', 'conflicto', 'guerra', 'discordia', 'venganza', 'enemistad'],
    },
    'Agradecer': {
      en: ['thank', 'thanks', 'thank you', 'give thanks', 'thankful', 'grateful', 'gratitude', 'thanksgiving', 'praise', 'blessing received', 'grace received', 'answered prayer'],
      es: ['gracias', 'dar gracias', 'agradecer', 'agradecido', 'agradecida', 'agradecimiento', 'gratitud', 'alabanza', 'alabar', 'gracia recibida', 'gracia alcanzada'],
    },
    'Fé e dúvidas': {
      en: ['faith', 'doubt', 'doubts', 'believe', 'belief', 'unbelief', 'creed'],
      es: ['fe', 'duda', 'dudas', 'creer', 'creo', 'incredulidad', 'incrédulo'],
    },
    'Nossa Senhora': {
      en: ['our lady', 'mary', 'virgin', 'virgin mary', 'blessed virgin', 'mother of god', 'blessed mother', 'marian', 'hail mary', 'mother in heaven'],
      es: ['nuestra señora', 'maría', 'virgen', 'virgen maría', 'madre de dios', 'mariana', 'madre del cielo', 'santísima virgen'],
    },
    'Causas difíceis e urgentes': {
      en: ['difficult', 'hard', 'impossible', 'impossible cause', 'hopeless', 'urgent', 'emergency', 'despair', 'desperate', 'help', 'help me', 'miracle', 'plea', 'request', 'petition'],
      es: ['difícil', 'imposible', 'causa imposible', 'causa difícil', 'urgente', 'urgencia', 'desesperación', 'desesperado', 'desesperada', 'socorro', 'ayuda', 'ayúdame', 'milagro', 'súplica', 'petición'],
    },
    'Tristeza e consolo': {
      en: ['sad', 'sadness', 'cry', 'crying', 'tears', 'suffering', 'pain', 'comfort', 'consolation', 'depression', 'depressed', 'lonely', 'loneliness', 'alone', 'abandoned', 'discouraged', 'heartbroken', 'broken heart'],
      es: ['triste', 'tristeza', 'llorar', 'llanto', 'llorando', 'lágrimas', 'sufrimiento', 'sufriendo', 'dolor', 'consuelo', 'consolación', 'depresión', 'deprimido', 'deprimida', 'soledad', 'solo', 'sola', 'abandono', 'desánimo', 'desanimado', 'desanimada'],
    },
    'Ansiedade e confiança': {
      en: ['anxiety', 'anxious', 'worry', 'worried', 'worries', 'nervous', 'stress', 'stressed', 'anguish', 'distress', 'insecure', 'insecurity', 'trust', 'confidence', 'surrender', 'let go', 'panic attack'],
      es: ['ansiedad', 'ansioso', 'ansiosa', 'preocupación', 'preocupado', 'preocupada', 'nervioso', 'nerviosa', 'estrés', 'estresado', 'angustia', 'angustiado', 'aflicción', 'afligido', 'inseguridad', 'confianza', 'confiar', 'entregar', 'abandono en dios'],
    },
    'Pelos doentes': {
      en: ['sick', 'sickness', 'ill', 'illness', 'disease', 'hospital', 'hospitalized', 'surgery', 'operation', 'healing', 'heal', 'cure', 'health', 'cancer', 'treatment', 'medical test', 'patient', 'someone sick'],
      es: ['enfermo', 'enferma', 'enfermedad', 'hospital', 'internado', 'hospitalizado', 'cirugía', 'operación', 'sanación', 'sanar', 'curación', 'curar', 'salud', 'cáncer', 'tratamiento', 'examen médico'],
    },
    'Falecidos e luto': {
      en: ['death', 'die', 'dying', 'died', 'dead', 'deceased', 'passed away', 'funeral', 'burial', 'grief', 'grieving', 'mourning', 'loss', 'soul', 'souls', 'purgatory', 'requiem', 'eternal rest', 'agony', 'hour of death'],
      es: ['muerte', 'morir', 'murió', 'murieron', 'falleció', 'fallecimiento', 'fallecido', 'fallecida', 'difunto', 'difuntos', 'luto', 'duelo', 'velorio', 'entierro', 'funeral', 'alma', 'almas', 'purgatorio', 'descanso eterno', 'agonía', 'hora de la muerte', 'moribundo'],
    },
    'Antes das refeições': {
      en: ['food', 'eat', 'eating', 'meal', 'meals', 'lunch', 'dinner', 'supper', 'breakfast', 'grace before meals', 'before eating', 'table', 'bless the food'],
      es: ['comida', 'comidas', 'comer', 'almuerzo', 'almorzar', 'cena', 'cenar', 'desayuno', 'alimento', 'alimentos', 'mesa', 'antes de comer', 'bendecir la mesa'],
    },
    'Estudos e decisões': {
      en: ['study', 'studying', 'studies', 'test', 'exam', 'exams', 'school', 'college', 'university', 'interview', 'job interview', 'decision', 'decide', 'choice', 'choose', 'discernment', 'wisdom', 'intelligence', 'guidance', 'light'],
      es: ['estudio', 'estudiar', 'estudios', 'prueba', 'examen', 'exámenes', 'escuela', 'colegio', 'universidad', 'facultad', 'entrevista', 'decisión', 'decidir', 'elección', 'elegir', 'discernimiento', 'sabiduría', 'inteligencia', 'iluminar', 'luz'],
    },
    'Missa e Comunhão': {
      en: ['communion', 'holy communion', 'eucharist', 'mass', 'host', 'after communion', 'adoration', 'blessed sacrament'],
      es: ['comunión', 'comulgar', 'eucaristía', 'misa', 'hostia', 'después de comulgar', 'adoración', 'santísimo'],
    },
    'Espírito Santo': {
      en: ['spirit', 'holy spirit', 'holy ghost', 'pentecost', 'gifts of the spirit', 'come holy spirit'],
      es: ['espíritu', 'espíritu santo', 'pentecostés', 'dones', 'ven espíritu santo'],
    },
    'Hora da Misericórdia (15h)': {
      en: ['mercy', 'divine mercy', 'three o clock', '3 pm', '3pm', 'hour of mercy', 'jesus i trust in you', 'faustina', 'chaplet'],
      es: ['misericordia', 'divina misericordia', 'tres de la tarde', '3 de la tarde', 'hora de la misericordia', 'jesús en ti confío', 'en ti confío', 'faustina', 'coronilla'],
    },
    'Ângelus (6h, 12h e 18h)': {
      en: ['noon', 'midday', '12pm', '6pm', '6am', 'six o clock', 'annunciation', 'incarnation'],
      es: ['mediodía', 'medio día', 'seis de la tarde', 'seis de la mañana', 'anunciación', 'encarnación'],
    },
    'Viagem': {
      en: ['travel', 'trip', 'traveling', 'journey', 'road', 'car', 'bus', 'plane', 'flight', 'flying', 'driving', 'drive', 'driver', 'traffic'],
      es: ['viaje', 'viajar', 'viajando', 'carretera', 'camino', 'coche', 'carro', 'auto', 'autobús', 'avión', 'vuelo', 'manejar', 'conducir', 'conductor', 'tráfico'],
    },
    'Crianças e família': {
      en: ['child', 'children', 'kid', 'kids', 'son', 'sons', 'daughter', 'daughters', 'baby', 'grandchild', 'grandson', 'granddaughter', 'grandchildren', 'family'],
      es: ['niño', 'niña', 'niños', 'hijo', 'hijos', 'hija', 'hijas', 'bebé', 'nieto', 'nieta', 'nietos', 'familia'],
    },
    'Trabalho e sustento': {
      en: ['work', 'job', 'jobs', 'unemployed', 'unemployment', 'money', 'debt', 'debts', 'bills', 'livelihood', 'hunger', 'bread', 'provision'],
      es: ['trabajo', 'empleo', 'desempleado', 'desempleada', 'desempleo', 'dinero', 'deuda', 'deudas', 'cuentas', 'sustento', 'necesidad', 'hambre', 'pan'],
    },
    'Santíssima Trindade': {
      en: ['trinity', 'holy trinity', 'god the father', 'father son and holy spirit'],
      es: ['trinidad', 'santísima trinidad', 'dios padre', 'padre hijo y espíritu santo'],
    },
  },
  padroeiros: {
    'Viagens e estradas': {
      en: ['travel', 'travels', 'traveler', 'traveller', 'trip', 'journey', 'road', 'roads', 'driver', 'drivers', 'traffic', 'car', 'truck driver', 'bus', 'plane', 'tourist', 'driving'],
      es: ['viaje', 'viajes', 'viajar', 'viajero', 'carretera', 'carreteras', 'conductor', 'chofer', 'tráfico', 'coche', 'carro', 'camionero', 'autobús', 'avión', 'turista', 'manejar', 'conducir'],
    },
    'Saúde e doentes': {
      en: ['health', 'sickness', 'illness', 'sick', 'ill', 'disease', 'healing', 'cure', 'hospital', 'nurse', 'nurses', 'nursing', 'doctor', 'doctors', 'physician', 'surgery', 'treatment', 'cancer'],
      es: ['salud', 'enfermedad', 'enfermo', 'enferma', 'enfermos', 'curación', 'curar', 'sanación', 'hospital', 'enfermera', 'enfermero', 'enfermería', 'médico', 'médica', 'cirugía', 'tratamiento', 'cáncer'],
    },
    'Gravidez e parto': {
      en: ['pregnancy', 'pregnant', 'expecting', 'childbirth', 'birth', 'labor', 'get pregnant', 'fertility', 'baby', 'newborn'],
      es: ['embarazo', 'embarazada', 'gestante', 'gestación', 'parto', 'quedar embarazada', 'fertilidad', 'bebé', 'nacimiento'],
    },
    'Trabalho e emprego': {
      en: ['work', 'job', 'jobs', 'employment', 'unemployment', 'unemployed', 'worker', 'workers', 'laborer', 'job interview', 'career', 'profession'],
      es: ['trabajo', 'empleo', 'desempleo', 'desempleado', 'obrero', 'trabajador', 'trabajadores', 'entrevista de trabajo', 'profesión'],
    },
    'Dívidas e dificuldades financeiras': {
      en: ['debt', 'debts', 'in debt', 'money', 'bills', 'poverty', 'rent', 'bankruptcy', 'financial problems', 'finances'],
      es: ['deuda', 'deudas', 'endeudado', 'endeudada', 'dinero', 'cuentas', 'pobreza', 'alquiler', 'quiebra', 'problemas económicos'],
    },
    'Estudos e provas': {
      en: ['student', 'students', 'study', 'studying', 'test', 'tests', 'exam', 'exams', 'school', 'university', 'college', 'entrance exam'],
      es: ['estudiante', 'estudiantes', 'estudio', 'estudiar', 'examen', 'exámenes', 'prueba', 'escuela', 'colegio', 'universidad', 'facultad', 'oposiciones'],
    },
    'Causas impossíveis e urgentes': {
      en: ['impossible cause', 'impossible causes', 'impossible', 'lost cause', 'lost causes', 'hopeless', 'hopeless cases', 'desperate', 'despair', 'urgent', 'emergency'],
      es: ['causa imposible', 'causas imposibles', 'imposible', 'causa perdida', 'causas perdidas', 'causa difícil', 'desesperación', 'desesperado', 'desesperada', 'urgente', 'urgencia'],
    },
    'Família, mães e filhos': {
      en: ['family', 'families', 'mother', 'mothers', 'mom', 'father', 'fathers', 'dad', 'children', 'child', 'son', 'daughter', 'marriage', 'home', 'husband', 'wife'],
      es: ['familia', 'familias', 'madre', 'madres', 'mamá', 'papá', 'hijos', 'hijo', 'hija', 'matrimonio', 'hogar', 'marido', 'esposo', 'esposa'],
    },
    'Internet e tecnologia': {
      en: ['internet', 'technology', 'tech', 'programmer', 'programming', 'computer', 'computers', 'phone', 'cell phone', 'web'],
      es: ['internet', 'tecnología', 'programador', 'programación', 'computadora', 'ordenador', 'celular', 'móvil', 'informática'],
    },
    'Música e canto': {
      en: ['musician', 'musicians', 'music', 'singer', 'singers', 'choir', 'singing', 'song', 'instrument'],
      es: ['músico', 'músicos', 'música', 'cantante', 'coro', 'canto', 'cantar', 'instrumento'],
    },
    'Jornalismo e comunicação': {
      en: ['journalist', 'journalists', 'journalism', 'writer', 'writers', 'communication', 'press', 'radio', 'media', 'television'],
      es: ['periodista', 'periodistas', 'periodismo', 'escritor', 'escritora', 'comunicación', 'prensa', 'radio', 'medios', 'televisión'],
    },
    'Medo e proteção': {
      en: ['fear', 'afraid', 'scared', 'protection', 'protect', 'danger', 'defense', 'violence', 'robbery', 'enemy', 'enemies', 'evil'],
      es: ['miedo', 'protección', 'proteger', 'peligro', 'defensa', 'violencia', 'asalto', 'robo', 'enemigo', 'enemigos', 'mal'],
    },
    'Coisas perdidas': {
      en: ['lost', 'lost things', 'lost items', 'lost objects', 'lost something', 'find', 'finding', 'missing', 'misplaced', 'keys', 'key', 'wallet', 'glasses'],
      es: ['perdido', 'perdida', 'perdí', 'objetos perdidos', 'cosas perdidas', 'encontrar', 'hallar', 'desaparecido', 'llaves', 'llave', 'cartera', 'billetera', 'gafas'],
    },
    'Jovens': {
      en: ['youth', 'young', 'young people', 'teen', 'teens', 'teenager', 'teenagers', 'adolescent'],
      es: ['juventud', 'joven', 'jóvenes', 'adolescente', 'adolescentes'],
    },
    'Artistas': {
      en: ['artist', 'artists', 'painter', 'painters', 'sculptor', 'art', 'drawing'],
      es: ['artista', 'artistas', 'pintor', 'pintora', 'escultor', 'arte', 'dibujo'],
    },
    'Justiça e advogados': {
      en: ['lawyer', 'lawyers', 'attorney', 'justice', 'judge', 'judges', 'lawsuit', 'court', 'trial', 'injustice'],
      es: ['abogado', 'abogada', 'abogados', 'justicia', 'juez', 'jueza', 'juicio', 'tribunal', 'injusticia', 'proceso'],
    },
    'Professores e educação': {
      en: ['teacher', 'teachers', 'educator', 'educators', 'teaching', 'education', 'catechist', 'catechists', 'catechesis'],
      es: ['profesor', 'profesora', 'maestro', 'maestra', 'educador', 'educadora', 'enseñanza', 'educación', 'catequista', 'catequesis'],
    },
    'Pobres e caridade': {
      en: ['poor', 'the poor', 'poverty', 'charity', 'alms', 'beggar', 'homeless', 'hunger', 'volunteer', 'volunteers'],
      es: ['pobres', 'caridad', 'limosna', 'mendigo', 'sin techo', 'indigente', 'hambre', 'voluntario', 'voluntarios'],
    },
    'Animais': {
      en: ['animals', 'animal', 'pets', 'pet', 'dog', 'dogs', 'cat', 'cats'],
      es: ['animales', 'animal', 'mascotas', 'mascota', 'perro', 'perros', 'gato', 'gatos'],
    },
    'Empregadas domésticas': {
      en: ['maid', 'maids', 'housekeeper', 'domestic worker', 'domestic workers', 'cleaner', 'housework', 'servants'],
      es: ['empleada doméstica', 'empleadas domésticas', 'trabajadora del hogar', 'limpieza', 'sirvienta', 'servicio doméstico'],
    },
    'Eucaristia e coroinhas': {
      en: ['eucharist', 'communion', 'first communion', 'altar server', 'altar servers', 'altar boy', 'adoration', 'mass', 'eucharistic minister'],
      es: ['eucaristía', 'comunión', 'primera comunión', 'monaguillo', 'monaguillos', 'acólito', 'adoración', 'misa', 'ministro de la eucaristía'],
    },
    'Paz e reconciliação': {
      en: ['peace', 'fight', 'conflict', 'war', 'reconciliation', 'discord', 'hostility', 'feud'],
      es: ['paz', 'pelea', 'conflicto', 'guerra', 'reconciliación', 'discordia', 'enemistad'],
    },
    'Hanseníase': {
      en: ['leprosy', 'leper', 'lepers', 'hansen s disease'],
      es: ['lepra', 'leproso', 'leprosos'],
    },
    'Pureza': {
      en: ['purity', 'chastity', 'pure'],
      es: ['pureza', 'castidad'],
    },
    'Olhos e visão': {
      en: ['eyes', 'eye', 'vision', 'sight', 'eyesight', 'blindness', 'blind', 'eye doctor', 'optometrist'],
      es: ['ojos', 'ojo', 'visión', 'vista', 'ceguera', 'ciego', 'oculista'],
    },
    'Garganta': {
      en: ['throat', 'sore throat', 'choking'],
      es: ['garganta', 'dolor de garganta', 'atragantamiento'],
    },
    'Tempestades e raios': {
      en: ['storm', 'storms', 'lightning', 'thunder', 'heavy rain', 'thunderstorm'],
      es: ['tormenta', 'tormentas', 'rayo', 'rayos', 'trueno', 'lluvia fuerte', 'tempestad'],
    },
    'Soldados e atletas': {
      en: ['soldier', 'soldiers', 'military', 'army', 'police', 'police officer', 'athlete', 'athletes', 'sports', 'sport'],
      es: ['soldado', 'soldados', 'militar', 'ejército', 'policía', 'atleta', 'atletas', 'deporte', 'deportista'],
    },
    'Padres e confissão': {
      en: ['priest', 'priests', 'pastor', 'parish priest', 'confessor', 'confession', 'clergy'],
      es: ['sacerdote', 'sacerdotes', 'párroco', 'confesor', 'confesión'],
    },
  },
};

if (typeof module !== 'undefined' && module.exports) module.exports = TERMOS_DE_BUSCA_POR_IDIOMA;
