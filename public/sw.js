// Service Worker mínimo — habilita PWA installability
self.addEventListener('install', () => self.skipWaiting())
self.addEventListener('activate', () => self.clients.claim())

// Passthrough: não faz cache (conteúdo sempre atualizado da rede)
self.addEventListener('fetch', (e) => {
  e.respondWith(fetch(e.request))
})
