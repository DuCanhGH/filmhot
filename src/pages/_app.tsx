import "@/index.css";
import "swiper/css";
import "swiper/css/navigation";
import "react-lazy-load-image-component/src/effects/opacity.css";
import "@ducanh2912/react-tuby/css/main.css";

import type { AppProps, NextWebVitalsMetric } from "next/app";
import Head from "next/head";
import { useEffect } from "react";
import { SWRConfig } from "swr";

export function reportWebVitals(metrics: NextWebVitalsMetric) {
  if (process.env.NODE_ENV !== "production") {
    console.debug(metrics);
  }
}

export default function CustomApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    if (
      !process.env.NEXT_PUBLIC_CANONICAL_URL &&
      process.env.NODE_ENV !== "production"
    ) {
      console.warn(
        `You haven't supplied a canonical url, which means that canonical tags will show an undefined url. Please add NEXT_PUBLIC_CANONICAL_URL to an .env file.`
      );
    }
  }, []);
  return (
    <>
      <Head>
        <title key="title">
          FilmHot - AdFree Movie / Anime Watching Website
        </title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#191A1F" />
        <meta
          name="description"
          content="Watch free movies, animes, TVs without any ADs"
          key="description"
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="FilmHot - AdFree Movie / Anime Watching Website"
          key="og-title"
        />
        <meta
          property="og:description"
          content="Watch free movies, animes, TVs without any ads"
          key="og-des"
        />
        <meta property="og:image" content="/preview.jpg" key="og-image" />
        <meta
          property="twitter:card"
          content="summary_large_image"
          key="twitter-card"
        />
        <meta
          property="twitter:title"
          content="FilmHot - AdFree Movie / Anime Watching Website"
          key="twitter-title"
        />
        <meta
          property="twitter:description"
          content="Watch free movies, animes, TVs without any ads"
          key="twitter-des"
        />
        <meta
          property="twitter:image"
          content="/preview.jpg"
          key="twitter-image"
        />
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
