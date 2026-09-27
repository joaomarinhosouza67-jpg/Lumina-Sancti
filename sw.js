const CACHE_NOME = 'lumina-sancti-v13';
const ARQUIVOS_ESSENCIAIS = [
  './',
  './index.html',
  './style.css',
  './busca.js',
  './liturgia.js',
  './script.js',
  './trilhas.js',
  './perfis.js',
  './mascote.js',
  './favicon.svg',
  './favicon-48.png',
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
