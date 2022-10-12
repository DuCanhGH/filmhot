import Head from "next/head";
import { useRouter } from "next/router";
import { FC, useEffect } from "react";
import useSWR from "swr";

import Error from "@/components/Shared/Error";
import WatchView from "@/components/WatchView";
import { getMovieDetail } from "@/services/movie";

const TV: FC = () => {
  const router = useRouter();

  const { id, episode } = router.query;

  const episodeIndex = Number(typeof episode === "string" ? episode : 0);

  useEffect(() => {
    if (!episodeIndex && router.isReady) {
      router.replace(
        `${router.asPath}?episode=${
          localStorage.getItem(`tv-${id}-episode`) || 1
        }`,
        undefined,
        {
          shallow: true,
        }
      );
    }
  }, [episodeIndex, id, router]);

  const { data, error } = useSWR(
    id && episodeIndex ? `tv-${id}-${episodeIndex}` : null,
    () => getMovieDetail(id as string, 1, +episodeIndex)
  );

  useEffect(() => {
    if (error || !data) return;
    localStorage.setItem(`tv-${id}-episode`, `${episodeIndex}`);
  }, [error, data, id, episodeIndex]);

  if (error) return <Error />;

  return (
    <>
      <Head>
        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_CANONICAL_URL}/tv/8220`}
        />
      </Head>
      <WatchView
        data={data?.data}
        sources={data?.sources}
        subtitles={data?.subtitles}
        episodeIndex={episodeIndex}
      />
    </>
  );
};

export default TV;
