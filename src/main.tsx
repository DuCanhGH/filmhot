import "./index.css";
import "swiper/css";
import "swiper/css/navigation";
import "react-lazy-load-image-component/src/effects/opacity.css";
import "@ducanh2912/react-tuby/css/main.css";
import "./pwa";

import { router } from "./router";

import { createRoot } from "react-dom/client";
import { SWRConfig } from "swr";
import { StrictMode } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { RouterProvider } from "react-router-dom";
import invariant from "tiny-invariant";

const container = document.getElementById("root");

invariant(container, "There's no element with id 'root' in DOM. Add one.");

createRoot(container).render(
  <StrictMode>
    <HelmetProvider>
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
        <RouterProvider router={router} />
      </SWRConfig>
    </HelmetProvider>
  </StrictMode>,
);
