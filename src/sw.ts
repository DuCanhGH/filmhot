import {
  cleanupOutdatedCaches,
  createHandlerBoundToURL,
  precacheAndRoute,
} from "workbox-precaching";
import { clientsClaim } from "workbox-core";
import { NavigationRoute, registerRoute } from "workbox-routing";
import { StaleWhileRevalidate } from "workbox-strategies";
import { CacheableResponsePlugin } from "workbox-cacheable-response";
import { ExpirationPlugin } from "workbox-expiration";

declare let self: ServiceWorkerGlobalScope;

// self.__WB_MANIFEST is default injection point
precacheAndRoute(self.__WB_MANIFEST);

// clean old assets
cleanupOutdatedCaches();

let denylist: undefined | RegExp[];
if (import.meta.env.DEV) denylist = [/^\/manifest.webmanifest$/];

registerRoute(
  ({ url, sameOrigin }) => {
    const match = url.pathname.match(/(.*)\.(jpe?g|png|woff2?|svg|json)$/);
    return sameOrigin && match && match.length > 0;
  },
  new StaleWhileRevalidate({
    cacheName: "images-fonts-jsonfiles",
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new ExpirationPlugin({
        maxAgeSeconds: 60 * 60 * 24 * 30,
      }),
    ],
  }),
);

// to allow work offline
registerRoute(new NavigationRoute(createHandlerBoundToURL("index.html"), { denylist }));

self.skipWaiting();
clientsClaim();