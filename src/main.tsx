import "./index.css";
import "swiper/css";
import "swiper/css/navigation";
import "react-lazy-load-image-component/src/effects/opacity.css";
import "react-tuby/css/main.css";
import "./pwa";

import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { SWRConfig } from "swr";
import { StrictMode } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <SWRConfig
          value={{
            revalidateOnFocus: false,
            shouldRetryOnError: false,
          }}
        >
          <Helmet
            defaultTitle="FilmHot - AdFree Movie / Anime Watching Website"
            titleTemplate="%s - Filmhot"
            prioritizeSeoTags
          >
            <meta charSet="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta name="theme-color" content="#191A1F" />
            <meta name="title" content="FilmHot - AdFree Movie / Anime Watching Website" />
            <meta name="description" content="Watch free movies, animes, TVs without any ADs" />
            <meta property="og:type" content="website" />
            <meta property="og:title" content="FilmHot - AdFree Movie / Anime Watching Website" />
            <meta
              property="og:description"
              content="Watch free movies, animes, TVs without any ADs"
            />
            <meta property="og:image" content="/preview.jpg" />
            <meta property="twitter:card" content="summary_large_image" />
            <meta
              property="twitter:title"
              content="FilmHot - AdFree Movie / Anime Watching Website"
            />
            <meta
              property="twitter:description"
              content="Watch free movies, animes, TVs without any ADs"
            />
            <meta property="twitter:image" content="/preview.jpg" />
            <link
              rel="stylesheet"
              href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
            />
            <link rel="shortcut icon" href="/icon.png" type="image/x-icon" />
            <link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180" />
            <link rel="mask-icon" href="/icon.png" color="#191A1F" />
          </Helmet>
          <App />
        </SWRConfig>
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>,
);
