const version = "8939c45";
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
    "/extra/icon-192x192-thumbnail.png",
    "/extra/icon-256x256-thumbnail.png",
    "/extra/icon-384x384-thumbnail.png",
    "/extra/icon-512x512-thumbnail.png",
    "/extra/sw_template.js",
    "/feeds/all.atom.xml",
    "/finanzas/",
    "/finanzas/index.html",
    "/images/Pelican-logo-no-oficial-thumbnail.png",
    "/images/Pelican-logo-thumbnail.png",
    "/index.html",
    "/link/buscador/",
    "/link/buscador/index.html",
    "/link/sitio-personal/",
    "/link/sitio-personal/index.html",
    "/localization.ini",
    "/manifest.webmanifest",
    "/plugins-en.html",
    "/portafolio/",
    "/portafolio/index.html",
    "/posts/markdown-para-pelican/",
    "/posts/markdown-para-pelican/index.html",
    "/posts/mi-primer-articulo/",
    "/posts/mi-primer-articulo/index.html",
    "/posts/mira-mas-alla/",
    "/posts/mira-mas-alla/index.html",
    "/posts/plugins/",
    "/posts/plugins/index.html",
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
    "/theme/js/l10n.js",
    "/theme/js/lazy_loading.js",
    "/theme/js/scripts_bundled.js",
    "/theme/js/serviceWorker.js"
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
