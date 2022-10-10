import "@/index.css";
import "swiper/css";
import "swiper/css/navigation";
import "react-lazy-load-image-component/src/effects/opacity.css";
import "@ducanh2912/react-tuby/css/main.css";

import type { AppProps, NextWebVitalsMetric } from "next/app";
import Head from "next/head";
import { SWRConfig } from "swr";

export function reportWebVitals(metrics: NextWebVitalsMetric) {
  if (process.env.NODE_ENV !== "production") {
    console.debug(metrics);
  }
}

export default function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>FilmHot - AdFree Movie / Anime Watching Website</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#191A1F" />
        <meta
          name="title"
          content="FilmHot - AdFree Movie / Anime Watching Website"
        />
        <meta
          name="description"
          content="Watch free movies, animes, TVs without any ADs"
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="FilmHot - AdFree Movie / Anime Watching Website"
        />
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
        <meta name="referrer" content="no-referrer" />
        <link rel="shortcut icon" href="/icon.png" type="image/x-icon" />
        <link
          rel="apple-touch-icon"
          href="/apple-touch-icon.png"
          sizes="180x180"
        />
        <link rel="mask-icon" href="/icon.png" color="#191A1F" />
        <link rel="preconnect" href="https://apis.google.com" />
        <link rel="preconnect" href="https://images.weserv.nl" />
      </Head>
      <SWRConfig
        value={{
          revalidateOnFocus: false,
          shouldRetryOnError: false,
        }}
      >
        <Component {...pageProps} />
      </SWRConfig>
    </>
  );
}
