const CACHE_NOME = 'lumina-sancti-1.22.43';
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
      Promise.all(chaves.filter((c) => c !== CACHE_NOME).map((c) => caches.delete(c)))
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

self.addEventListener('notificationclick', (evento) => {
  evento.notification.close();
  const destino = new URL((evento.notification.data && evento.notification.data.url) || '/', self.location.origin).href;
  evento.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((janelas) => {
      const aberta = janelas.find((j) => new URL(j.url).origin === self.location.origin);
      if (aberta && 'navigate' in aberta) {
        return aberta.navigate(destino).then((j) => (j || aberta).focus()).catch(() => self.clients.openWindow(destino));
      }
      return self.clients.openWindow(destino);
    })
  );
});
