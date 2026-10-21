const CACHE_NOME = 'lumina-sancti-1.22.60';
const CACHE_DO_WIDGET = 'lumina-widget';
const ETIQUETA_DO_WIDGET = 'lumina-dia';
const ARQUIVOS_ESSENCIAIS = [
  './',
  './index.html',
  './style.css',
  './entrada.js',
  './busca.js',
  './busca-idiomas.js',
  './nomes-santos.js',
  './liturgia.js',
  './medalhas.js',
  './telas-idioma.js',
  './fotos-santos.js',
  './script.js',
  './oracoes-dados.js',
  './oracoes.js',
  './cursos.js',
  './widget.js',
  './historias.js',
  './trilhas.js',
  './perfis.js',
  './mascote.js',
  './cenaculos.js',
  './amigos.js',
  './planos.js',
  './enfeites.js',
  './enfeites-novos.js',
  './enfeites-mais.js',
  './asa-celestial.webp',
  './asa-celestial-dourada.webp',
  './comunidade.js',
  './notificacoes.js',
  './avisos.js',
  './presentes.js',
  './suporte.js',
  './santos/chiara-luce.svg',
  './santos/albertina-berkenbrock.svg',
  './favicon.svg',
  './favicon-48.png',
  './badge-estrela.png',
  './apple-touch-icon.png',
  './icon-192.png',
  './icon-512.png',
  './widgets/lumi-dia.json',
  './widgets/santos-do-ano.json',
  './widgets/lumi-feliz.png',
  './widgets/lumi-sorriso.png',
  './widgets/lumi-quase.png',
  './widgets/lumi-triste.png',
];

self.addEventListener('install', (evento) => {
  evento.waitUntil(
    caches.open(CACHE_NOME)
      .then((cache) => cache.addAll(ARQUIVOS_ESSENCIAIS))
      .catch(() => {})
  );
  self.skipWaiting();
});

self.addEventListener('activate', (evento) => {
  evento.waitUntil(
    caches.keys().then((chaves) =>
      Promise.all(chaves.filter((c) => c !== CACHE_NOME && c !== CACHE_DO_WIDGET).map((c) => caches.delete(c)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (evento) => {
  const url = new URL(evento.request.url);
  if (evento.request.method !== 'GET' || url.origin !== self.location.origin) {
    return;
  }
  if (evento.request.headers.has('range') || url.pathname.endsWith('.webm')) {
    return;
  }
  evento.respondWith(
    fetch(evento.request)
      .then((resposta) => {
        if (resposta && resposta.ok) {
          const copia = resposta.clone();
          caches.open(CACHE_NOME).then((cache) => cache.put(evento.request, copia)).catch(() => {});
        }
        return resposta;
      })
      .catch(() =>
        caches.match(evento.request).then((guardado) => guardado || caches.match('./index.html'))
      )
  );
});

self.addEventListener('push', (evento) => {
  let dados = {};
  try {
    dados = evento.data ? evento.data.json() : {};
  } catch (e) {
    dados = { texto: evento.data ? evento.data.text() : '' };
  }
  const titulo = dados.titulo || 'Lumina Sancti';
  const endereco = typeof dados.url === 'string' && dados.url.startsWith('/') ? dados.url : '/';
  const ehMensagem = typeof dados.tag === 'string' && dados.tag.startsWith('lumina-conversa-');
  evento.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((janelas) => {
      janelas.forEach((janela) => {
        try { janela.postMessage({ tipo: 'lumina-aviso', mensagem: ehMensagem, tag: dados.tag || '' }); } catch (e) {}
      });
      if (ehMensagem && self.navigator && typeof self.navigator.setAppBadge === 'function') {
        self.navigator.setAppBadge().catch(() => {});
      }
      const olhando = janelas.some((janela) => janela.focused && janela.visibilityState === 'visible');
      if (ehMensagem && olhando) return undefined;
      return self.registration.showNotification(titulo, {
        body: dados.texto || '',
        icon: './icon-192.png',
        badge: './badge-estrela.png',
        tag: dados.tag || 'lumina-sancti',
        renotify: true,
        data: { url: endereco },
      });
    })
  );
});

function abrirJanelaDoLumina(caminho) {
  const destino = new URL(caminho || '/', self.location.origin).href;
  return self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((janelas) => {
    const aberta = janelas.find((j) => new URL(j.url).origin === self.location.origin);
    if (aberta && 'navigate' in aberta) {
      return aberta.navigate(destino).then((j) => (j || aberta).focus()).catch(() => self.clients.openWindow(destino));
    }
    return self.clients.openWindow(destino);
  });
}

self.addEventListener('notificationclick', (evento) => {
  evento.notification.close();
  evento.waitUntil(abrirJanelaDoLumina((evento.notification.data && evento.notification.data.url) || '/'));
});

const TEXTOS_DO_WIDGET = {
  pt: {
    ola: 'Olá! Eu sou a Lumi',
    entre: 'Abra o Lumina Sancti para fazer a missão de hoje e conhecer o santo do dia.',
    abrir: 'Abrir o Lumina Sancti',
    feito: 'Missão de hoje feita!',
    feitoDias: (n) => `Missão feita! ${n} dias seguidos`,
    volteAmanha: 'Que alegria! Volte amanhã para continuar a sua sequência.',
    revisar: 'Ver as trilhas',
    aindaDa: (nome) => `${nome}, ainda dá tempo!`,
    naoPerca: (n) => `Faça a missão de hoje para não perder os seus ${n} dias seguidos.`,
    vamos: (nome) => `Vamos estudar hoje, ${nome}?`,
    sequencia: (n) => `Você está com ${n} ${n === 1 ? 'dia seguido' : 'dias seguidos'}. A missão de hoje está esperando.`,
    comece: 'A missão de hoje está esperando por você.',
    fazer: 'Fazer a missão',
    santoDeHoje: 'Hoje a Igreja celebra',
    santoEmDestaque: 'Santo em destaque',
  },
  en: {
    ola: 'Hi! I am Lumi',
    entre: 'Open Lumina Sancti to do today\'s mission and meet the saint of the day.',
    abrir: 'Open Lumina Sancti',
    feito: 'Today\'s mission done!',
    feitoDias: (n) => `Mission done! ${n}-day streak`,
    volteAmanha: 'Wonderful! Come back tomorrow to keep your streak going.',
    revisar: 'See the paths',
    aindaDa: (nome) => `${nome}, there is still time!`,
    naoPerca: (n) => `Do today's mission so you don't lose your ${n}-day streak.`,
    vamos: (nome) => `Shall we study today, ${nome}?`,
    sequencia: (n) => `You are on a ${n}-day streak. Today's mission is waiting.`,
    comece: 'Today\'s mission is waiting for you.',
    fazer: 'Do the mission',
    santoDeHoje: 'Today the Church celebrates',
    santoEmDestaque: 'Featured saint',
  },
  es: {
    ola: '¡Hola! Soy Lumi',
    entre: 'Abre Lumina Sancti para hacer la misión de hoy y conocer al santo del día.',
    abrir: 'Abrir Lumina Sancti',
    feito: '¡Misión de hoy hecha!',
    feitoDias: (n) => `¡Misión hecha! ${n} días de racha`,
    volteAmanha: '¡Qué alegría! Vuelve mañana para seguir con tu racha.',
    revisar: 'Ver los caminos',
    aindaDa: (nome) => `¡${nome}, todavía hay tiempo!`,
    naoPerca: (n) => `Haz la misión de hoy para no perder tus ${n} días de racha.`,
    vamos: (nome) => `¿Estudiamos hoy, ${nome}?`,
    sequencia: (n) => `Llevas ${n} ${n === 1 ? 'día' : 'días'} de racha. La misión de hoy te espera.`,
    comece: 'La misión de hoy te está esperando.',
    fazer: 'Hacer la misión',
    santoDeHoje: 'Hoy la Iglesia celebra',
    santoEmDestaque: 'Santo destacado',
  },
};

function diaDoWidget(data) {
  const d = data || new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

async function santoDoDiaDoWidget(agora) {
  const quando = agora || new Date();
  const guardada = await caches.match('./widgets/santos-do-ano.json');
  const lista = await (guardada || await fetch('./widgets/santos-do-ano.json')).json();
  const chave = `${String(quando.getMonth() + 1).padStart(2, '0')}-${String(quando.getDate()).padStart(2, '0')}`;
  let id = lista.festas[chave];
  const deHoje = !!id;
  if (!id) {
    const inicioDoAno = new Date(quando.getFullYear(), 0, 0);
    const diaDoAno = Math.floor((quando - inicioDoAno) / 86400000);
    id = lista.ordem[diaDoAno % lista.ordem.length];
  }
  const [nome, resumo, foto] = lista.santos[id] || ['', '', ''];
  return { id, nome, resumo, foto, deHoje };
}

async function meuDiaDoWidget() {
  try {
    const cache = await caches.open(CACHE_DO_WIDGET);
    const resposta = await cache.match('/widgets/meu-dia.json');
    return resposta ? await resposta.json() : null;
  } catch (e) {
    return null;
  }
}

async function dadosDoWidget(agora) {
  const quando = agora || new Date();
  const [santo, meu] = await Promise.all([santoDoDiaDoWidget(quando), meuDiaDoWidget()]);
  const t = TEXTOS_DO_WIDGET[meu && TEXTOS_DO_WIDGET[meu.idioma] ? meu.idioma : 'pt'];
  const hora = quando.getHours();
  let humor = 'sorriso';
  let titulo = t.ola;
  let mensagem = t.entre;
  let botao = t.abrir;
  if (meu && meu.nome) {
    const n = Math.max(0, Number(meu.ofensiva || 0));
    const fez = !!meu.fezHoje && meu.dia === diaDoWidget(quando);
    if (fez) {
      humor = 'feliz';
      titulo = n > 1 ? t.feitoDias(n) : t.feito;
      mensagem = t.volteAmanha;
      botao = t.revisar;
    } else if (n > 0 && hora >= 18) {
      humor = hora >= 21 ? 'triste' : 'quase';
      titulo = t.aindaDa(meu.nome);
      mensagem = t.naoPerca(n);
      botao = t.fazer;
    } else {
      titulo = t.vamos(meu.nome);
      mensagem = n > 0 ? t.sequencia(n) : t.comece;
      botao = t.fazer;
    }
  }
  return {
    lumi: new URL(`./widgets/lumi-${humor}.png`, self.location.href).href,
    humor,
    titulo,
    mensagem,
    botao,
    rotuloDoSanto: santo.deHoje ? t.santoDeHoje : t.santoEmDestaque,
    nomeDoSanto: santo.nome,
    resumoDoSanto: santo.resumo,
    fotoDoSanto: santo.foto,
    santo: santo.id,
  };
}

async function atualizarWidgetDoLumina() {
  if (!self.widgets || typeof self.widgets.updateByTag !== 'function') return;
  try {
    const widget = await self.widgets.getByTag(ETIQUETA_DO_WIDGET);
    if (!widget) return;
    const enderecoDoModelo = (widget.definition && widget.definition.msAcTemplate) || './widgets/lumi-dia.json';
    const modelo = await (await fetch(enderecoDoModelo)).text();
    const dados = JSON.stringify(await dadosDoWidget());
    await self.widgets.updateByTag(ETIQUETA_DO_WIDGET, { template: modelo, data: dados });
  } catch (e) {
  }
}

self.addEventListener('widgetinstall', (evento) => evento.waitUntil(atualizarWidgetDoLumina()));
self.addEventListener('widgetresume', (evento) => evento.waitUntil(atualizarWidgetDoLumina()));
self.addEventListener('widgetclick', (evento) => {
  if (evento.action === 'abrir-santo') {
    evento.waitUntil(santoDoDiaDoWidget().then((santo) => abrirJanelaDoLumina(`/?santo=${encodeURIComponent(santo.id)}`)));
  } else if (evento.action === 'abrir-missao') {
    evento.waitUntil(abrirJanelaDoLumina('/?abrir=trilhas'));
  }
});
self.addEventListener('periodicsync', (evento) => {
  if (evento.tag === 'lumina-widget') evento.waitUntil(atualizarWidgetDoLumina());
});
self.addEventListener('message', (evento) => {
  if (evento.data && evento.data.tipo === 'atualizar-widget') evento.waitUntil(atualizarWidgetDoLumina());
});
