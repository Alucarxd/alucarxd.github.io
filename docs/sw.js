const version = "ca93884";
const currentCacheName = `ALUCARXD-${version}`;
const filesToCache = [
    "/",
    "/archivo/",
    "/archivo/index.html",
    "/author/anonimo/",
    "/author/anonimo/index.html",
    "/author/gabriel-garcia/",
    "/author/gabriel-garcia/index.html",
    "/autores/",
    "/autores/index.html",
    "/categorias/",
    "/categorias/index.html",
    "/category/curso/",
    "/category/curso/index.html",
    "/category/filosofia/",
    "/category/filosofia/index.html",
    "/category/misc/",
    "/category/misc/index.html",
    "/drafts/la-solucion.html",
    "/drafts/pages/portfolio.html",
    "/etiquetas/",
    "/etiquetas/index.html",
    "/finanzas/",
    "/finanzas/index.html",
    "/images/Pelican-logo-thumbnail.png",
    "/index.html",
    "/link/buscador/",
    "/link/buscador/index.html",
    "/link/sitio-personal/",
    "/link/sitio-personal/index.html",
    "/portafolio/",
    "/portafolio/index.html",
    "/posts/con-plugins-la-vida-es-mas-sencilla/",
    "/posts/con-plugins-la-vida-es-mas-sencilla/index.html",
    "/posts/markdown-para-pelican/",
    "/posts/markdown-para-pelican/index.html",
    "/posts/mi-primer-articulo/",
    "/posts/mi-primer-articulo/index.html",
    "/posts/mira-mas-alla/",
    "/posts/mira-mas-alla/index.html",
    "/sitemap.xml",
    "/sobre-mi/",
    "/sobre-mi/Pelican-logo-no-oficial-thumbnail.png",
    "/sobre-mi/index.html",
    "/tag/frases.html",
    "/tag/reflexion.html",
    "/theme/css/01_w3.css",
    "/theme/css/03_jqcloud.css",
    "/theme/css/03_style.css",
    "/theme/css/04_font-awesome.min.css",
    "/theme/css/05_gruvbox.css",
    "/theme/css/06_lazy_load.css",
    "/theme/css/style_bundled.css",
    "/theme/fonts/fontawesome-webfont.svg",
    "/theme/js/jqcloud.min.js",
    "/theme/js/lazy_loading.js",
    "/theme/js/scripts_bundled.js"
]

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(currentCacheName)
      .then(cache => cache.addAll(filesToCache))
      .then(self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(cacheNames => cacheNames.filter(cacheName => ! currentCacheName.includes(cacheName) ))
      .then(cachesToDelete => Promise.all(cachesToDelete.map(cacheToDelete => caches.delete(cacheToDelete))))
      .then(self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const url = event.request.url;
  const scope = self.registration.scope;
  
	if (!url.startsWith(scope)) {
		return;
  }

  event.respondWith(
    caches.open(currentCacheName)
      .then(cache => cache.match(event.request, {ignoreSearch: true}) )
      .then(response => response || fetch(event.request) )
  );
});
