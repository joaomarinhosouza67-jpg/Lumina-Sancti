// ============================================================
//  LUMINA SANCTI — Service Worker (deixa o site instalável e
//  funcionando parcialmente offline)
// ============================================================
// Guarda só os arquivos do PRÓPRIO site em cache. Fotos da
// Wikipédia e chamadas à Lumina/Supabase sempre seguem direto
// pela rede — nunca ficam presas em cache antigo.
const CACHE_NOME = 'lumina-sancti-v1';
const ARQUIVOS_ESSENCIAIS = [
  './',
  './index.html',
  './style.css',
  './script.js',
  './favicon.svg',
  './icon-192.png',
  './icon-512.png',
];

self.addEventListener('install', (evento) => {
  evento.waitUntil(
    caches.open(CACHE_NOME)
      .then((cache) => cache.addAll(ARQUIVOS_ESSENCIAIS))
      .catch(() => {}) // se algum arquivo faltar, não trava a instalação
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
  // Só GET, e só do próprio site — Wikipédia, Supabase e a
  // Anthropic seguem sempre direto pela rede, sem passar por aqui.
  if (evento.request.method !== 'GET' || url.origin !== self.location.origin) {
    return;
  }
  evento.respondWith(
    caches.match(evento.request).then((respostaCache) => {
      return respostaCache || fetch(evento.request).catch(() => caches.match('./index.html'));
    })
  );
});
