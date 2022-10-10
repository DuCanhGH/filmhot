if (!self.define) {
  let e,
    s = {};
  const c = (c, a) => (
    (c = new URL(c + ".js", a).href),
    s[c] ||
      new Promise((s) => {
        if ("document" in self) {
          const e = document.createElement("script");
          (e.src = c), (e.onload = s), document.head.appendChild(e);
        } else (e = c), importScripts(c), s();
      }).then(() => {
        let e = s[c];
        if (!e) throw new Error(`Module ${c} didn’t register its module`);
        return e;
      })
  );
  self.define = (a, n) => {
    const i =
      e ||
      ("document" in self ? document.currentScript.src : "") ||
      location.href;
    if (s[i]) return;
    let t = {};
    const r = (e) => c(e, i),
      f = { module: { uri: i }, exports: t, require: r };
    s[i] = Promise.all(a.map((e) => f[e] || r(e))).then((e) => (n(...e), t));
  };
}
define(["./workbox-7028bf80"], function (e) {
  "use strict";
  importScripts(),
    self.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        { url: "/404_error.png", revision: "b9c460f9802115dcfa3be2eb4f58d458" },
        {
          url: "/_next/static/EjKMb0scAv51EfNox5ud9/_buildManifest.js",
          revision: "c0c51550c7f1f421dbcdbcebe0b0b41d",
        },
        {
          url: "/_next/static/EjKMb0scAv51EfNox5ud9/_ssgManifest.js",
          revision: "b6652df95db52feb4daf4eca35380933",
        },
        {
          url: "/_next/static/chunks/138.ffb22fecf6b2198a.js",
          revision: "ffb22fecf6b2198a",
        },
        {
          url: "/_next/static/chunks/177-4a1f29f2e17fb500.js",
          revision: "4a1f29f2e17fb500",
        },
        {
          url: "/_next/static/chunks/193-68f10ac4cb587467.js",
          revision: "68f10ac4cb587467",
        },
        {
          url: "/_next/static/chunks/1c97af37-fe02f8837313d7e7.js",
          revision: "fe02f8837313d7e7",
        },
        {
          url: "/_next/static/chunks/231-cb73efa79b51f4ec.js",
          revision: "cb73efa79b51f4ec",
        },
        {
          url: "/_next/static/chunks/258-2f2e0bc54d1850ad.js",
          revision: "2f2e0bc54d1850ad",
        },
        {
          url: "/_next/static/chunks/449-ace4bfa673b83267.js",
          revision: "ace4bfa673b83267",
        },
        {
          url: "/_next/static/chunks/4f8f1367-69c077d0191fd341.js",
          revision: "69c077d0191fd341",
        },
        {
          url: "/_next/static/chunks/54-8b2315c70a0da922.js",
          revision: "8b2315c70a0da922",
        },
        {
          url: "/_next/static/chunks/631.a686cba7bd956e1f.js",
          revision: "a686cba7bd956e1f",
        },
        {
          url: "/_next/static/chunks/697-b09677b7ca2c6eff.js",
          revision: "b09677b7ca2c6eff",
        },
        {
          url: "/_next/static/chunks/762.fdf2219cf56427b5.js",
          revision: "fdf2219cf56427b5",
        },
        {
          url: "/_next/static/chunks/84-e3f9a0c6a75ccb33.js",
          revision: "e3f9a0c6a75ccb33",
        },
        {
          url: "/_next/static/chunks/95941ce4-8b32b7c96ae4e48d.js",
          revision: "8b32b7c96ae4e48d",
        },
        {
          url: "/_next/static/chunks/960-f31068c6adbdcf44.js",
          revision: "f31068c6adbdcf44",
        },
        {
          url: "/_next/static/chunks/963-54ca2315844f64a4.js",
          revision: "54ca2315844f64a4",
        },
        {
          url: "/_next/static/chunks/c4d8f51c.1757e5e73b1bb2e0.js",
          revision: "1757e5e73b1bb2e0",
        },
        {
          url: "/_next/static/chunks/framework-3fe059a9589ef1a8.js",
          revision: "3fe059a9589ef1a8",
        },
        {
          url: "/_next/static/chunks/main-21ff3e405f312085.js",
          revision: "21ff3e405f312085",
        },
        {
          url: "/_next/static/chunks/pages/404-0d79fbc4d8f31606.js",
          revision: "0d79fbc4d8f31606",
        },
        {
          url: "/_next/static/chunks/pages/_app-3d7e1810a8a79187.js",
          revision: "3d7e1810a8a79187",
        },
        {
          url: "/_next/static/chunks/pages/_error-87f31a87e7314c0f.js",
          revision: "87f31a87e7314c0f",
        },
        {
          url: "/_next/static/chunks/pages/bookmarks-04e3b11718a9d4f3.js",
          revision: "04e3b11718a9d4f3",
        },
        {
          url: "/_next/static/chunks/pages/category/%5Bid%5D-d278fd934e5daa2c.js",
          revision: "d278fd934e5daa2c",
        },
        {
          url: "/_next/static/chunks/pages/discovery-f544c94270c77ebb.js",
          revision: "f544c94270c77ebb",
        },
        {
          url: "/_next/static/chunks/pages/explore-8e33bedcd12e3363.js",
          revision: "8e33bedcd12e3363",
        },
        {
          url: "/_next/static/chunks/pages/history-585c2e6aeefc30d5.js",
          revision: "585c2e6aeefc30d5",
        },
        {
          url: "/_next/static/chunks/pages/index-b08bc24a104a85b2.js",
          revision: "b08bc24a104a85b2",
        },
        {
          url: "/_next/static/chunks/pages/movie/%5Bid%5D-e42dbc38447a7224.js",
          revision: "e42dbc38447a7224",
        },
        {
          url: "/_next/static/chunks/pages/search-bf201024c4c851de.js",
          revision: "bf201024c4c851de",
        },
        {
          url: "/_next/static/chunks/pages/sign-in-9893c42fbb7ff202.js",
          revision: "9893c42fbb7ff202",
        },
        {
          url: "/_next/static/chunks/pages/tv/%5Bid%5D-c86d525f357b2476.js",
          revision: "c86d525f357b2476",
        },
        {
          url: "/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",
          revision: "837c0df77fd5009c9e46d446188ecfd0",
        },
        {
          url: "/_next/static/chunks/webpack-bdc259a81c02074b.js",
          revision: "bdc259a81c02074b",
        },
        {
          url: "/_next/static/css/6e9464ef2cdeb53a.css",
          revision: "6e9464ef2cdeb53a",
        },
        {
          url: "/apple-touch-icon.png",
          revision: "05c5c2f205851aa658e6ee34ad747364",
        },
        { url: "/bg.png", revision: "09d8baa41b4526d79b76a49d853151d1" },
        { url: "/calendar.png", revision: "1385510243835381b092153cefb756cd" },
        { url: "/cinema.svg", revision: "fb4b53730217d4a18798a7b5d720eaa8" },
        {
          url: "/default-avatar.png",
          revision: "4a51e0b22177ebb0affdb91149199e7c",
        },
        { url: "/error.png", revision: "606e68c8e9cd92fad4b372a4322286bd" },
        { url: "/facebook.svg", revision: "aa6ca071cfd799c81b43ec2a85a51f29" },
        { url: "/google.svg", revision: "4cb9c8a0be353aec19916017addf4bc7" },
        { url: "/icon.png", revision: "dd93c5e98598cdd3f531c1898c3c28fe" },
        { url: "/pause.svg", revision: "fab4de9d54e6d95cff52d270000adaa9" },
        { url: "/play.svg", revision: "d3c0270e10c4cca9db5b76a52cb91bcb" },
        { url: "/preview.jpg", revision: "8b7cbf6713231e1fea18b2a949382cb7" },
        {
          url: "/pwa-192x192.png",
          revision: "b9e2c77570486ac450c1787d7ad71084",
        },
        {
          url: "/pwa-512x512.png",
          revision: "3423517669cf19754438eb7a3643f253",
        },
        { url: "/robots.txt", revision: "cd9cd94aaa699e0a16e692b6bb16f672" },
        { url: "/star.png", revision: "0812627fa12f0e68a2803cdb25223f8a" },
      ],
      { ignoreURLParametersMatching: [] }
    ),
    e.cleanupOutdatedCaches(),
    e.registerRoute(
      "/",
      new e.NetworkFirst({
        cacheName: "start-url",
        plugins: [
          {
            cacheWillUpdate: async ({
              request: e,
              response: s,
              event: c,
              state: a,
            }) =>
              s && "opaqueredirect" === s.type
                ? new Response(s.body, {
                    status: 200,
                    statusText: "OK",
                    headers: s.headers,
                  })
                : s,
          },
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,
      new e.CacheFirst({
        cacheName: "google-fonts-webfonts",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 31536e3 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,
      new e.StaleWhileRevalidate({
        cacheName: "google-fonts-stylesheets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-font-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-image-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\/_next\/image\?url=.+$/i,
      new e.StaleWhileRevalidate({
        cacheName: "next-image",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:mp3|wav|ogg)$/i,
      new e.CacheFirst({
        cacheName: "static-audio-assets",
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:mp4)$/i,
      new e.CacheFirst({
        cacheName: "static-video-assets",
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:js)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-js-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:css|less)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-style-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\/_next\/data\/.+\/.+\.json$/i,
      new e.StaleWhileRevalidate({
        cacheName: "next-data",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:json|xml|csv)$/i,
      new e.NetworkFirst({
        cacheName: "static-data-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1;
        const s = e.pathname;
        return !s.startsWith("/api/auth/") && !!s.startsWith("/api/");
      },
      new e.NetworkFirst({
        cacheName: "apis",
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 16, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1;
        return !e.pathname.startsWith("/api/");
      },
      new e.NetworkFirst({
        cacheName: "others",
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      ({ url: e }) => !(self.origin === e.origin),
      new e.NetworkFirst({
        cacheName: "cross-origin",
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 3600 }),
        ],
      }),
      "GET"
    );
});
