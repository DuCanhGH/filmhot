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
import invariant from "tiny-invariant";

const container = document.getElementById("root");

invariant(container, "There's no element with id 'root' in DOM. Add one.");

createRoot(container).render(
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
          />
          <App />
        </SWRConfig>
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>,
);
