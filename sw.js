/* Service Worker do Desafio Python Code.
   - Pré-cacheia o documento inicial
   - Cache em runtime (cache-first) de tudo do próprio domínio e do Pyodide (CDN)
   Funciona em dev (Vite) e em produção (assets com hash).
*/

const VERSAO_CACHE = 'desafio-python-code-v1';
const APPSHELL = ['./'];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(VERSAO_CACHE).then((c) => c.addAll(APPSHELL)).catch(() => {}),
  );
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches
      .keys()
      .then((chaves) =>
        Promise.all(chaves.filter((c) => c !== VERSAO_CACHE).map((c) => caches.delete(c))),
      ),
  );
  self.clients.claim();
});

function respostaCacheOuRede(requisicao) {
  return caches.match(requisicao).then((emCache) => {
    if (emCache) return emCache;
    return fetch(requisicao).then((resposta) => {
      if (resposta && resposta.ok && requisicao.method === 'GET') {
        const copia = resposta.clone();
        caches.open(VERSAO_CACHE).then((c) => c.put(requisicao, copia));
      }
      return resposta;
    });
  });
}

self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);
  if (e.request.method !== 'GET') return;

  // Shell do aplicativo (mesmo domínio): cache-first
  if (url.origin === self.location.origin) {
    e.respondWith(respostaCacheOuRede(e.request));
    return;
  }

  // Pyodide (CDN): tentar cache; caso contrário buscar e guardar no cache
  if (url.hostname.includes('cdn.jsdelivr.net') && url.href.includes('pyodide')) {
    e.respondWith(respostaCacheOuRede(e.request));
  }
});