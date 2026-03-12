const CACHE = 'fretboard-v4';
const PRECACHE = [
  './', './index.html', './manifest.json',
  './songs/index.json',
  './songs/black_hole_sun.json',
  './songs/fell_on_black_days.json',
  './songs/axis_bold_as_love.json',
  './songs/bold_as_love_mayer.json',
  './songs/paranoid_android.json',
  './songs/something.json',
  './songs/down_in_a_hole.json',
  'https://unpkg.com/react@18/umd/react.production.min.js',
  'https://unpkg.com/react-dom@18/umd/react-dom.production.min.js',
  'https://unpkg.com/@babel/standalone/babel.min.js',
];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(PRECACHE)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
  ).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  e.respondWith(caches.match(e.request).then(cached => {
    if (cached) return cached;
    return fetch(e.request).then(resp => {
      if (!resp || resp.status !== 200) return resp;
      const clone = resp.clone();
      caches.open(CACHE).then(c => c.put(e.request, clone));
      return resp;
    }).catch(() => { if (e.request.mode === 'navigate') return caches.match('./index.html'); });
  }));
});
