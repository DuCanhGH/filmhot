import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";

const RedirectToEpisode = () => {
  const router = useRouter();
  const { id } = router.query;
  useEffect(() => {
    if (id) {
      router.replace({
        pathname: "/tv/[id]/[episode]",
        query: {
          id: id,
          episode: localStorage.getItem(`tv-${id}-episode`) || 1,
        },
      });
    }
  }, [id, router]);
  return (
    <>
      <Head>
        <meta
          property="og:title"
          content="FilmHot - Redirecting to last watched episode..."
          key="og-title"
        />
        <meta
          property="og:url"
          content={`${process.env.NEXT_PUBLIC_CANONICAL_URL}/tv/${
            typeof id === "string" ? id : "14337"
          }/0`}
          key="og-url"
        />
        <meta
          property="twitter:title"
          content="FilmHot - Redirecting to last watched episode..."
          key="twitter-title"
        />
        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_CANONICAL_URL}/tv/${
            typeof id === "string" ? id : "14337"
          }/0`}
          key="canonical-url"
        />
      </Head>
      <div className="flex flex-col min-h-screen justify-center items-center gap-4">
        {/* eslint-disable @next/next/no-img-element */}
        <img
          className="w-full max-w-[200px] h-auto"
          src="/warning.png"
          alt=""
        />
        <p className="text-xl">Redirecting to last watched episode...</p>
      </div>
    </>
  );
};

export default RedirectToEpisode;
