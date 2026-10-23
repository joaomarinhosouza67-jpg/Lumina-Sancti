self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (evento) => {
  evento.waitUntil((async () => {
    const nomes = await caches.keys();
    await Promise.all(nomes.map((nome) => caches.delete(nome)));
    await self.clients.claim();
    const janelas = await self.clients.matchAll({ type: 'window' });
    janelas.forEach((janela) => janela.navigate(janela.url).catch(() => {}));
    await self.registration.unregister();
  })());
});
self.addEventListener('fetch', (evento) => {
  evento.respondWith(fetch('/index.html', { cache: 'no-store' }));
});
