import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage,
} from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import useSWR from "swr";
import { v4 as uuidv4 } from "uuid";

import ErrorPage from "@/components/Shared/Error";
import WatchView from "@/components/WatchView";
import { getMovieDetail } from "@/services/movie";
import { logger } from "@/shared/logger";

interface GSProps {
  fallbackData?: Awaited<ReturnType<typeof getMovieDetail>>;
}

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<GSProps> = async ({ params }) => {
  const log = logger.child({
    requestId: uuidv4(),
  });
  if (!params) {
    log.error(
      "No params given for getStaticProps to run (page: /tv/[id]/[episode])."
    );
    return {
      notFound: true,
      props: {},
    };
  }
  const id = params.id as string;
  const episodeIndex = params.episode as string;
  if (
    !id ||
    typeof id !== "string" ||
    (episodeIndex &&
      (typeof episodeIndex !== "string" || Number.isNaN(episodeIndex)))
  ) {
    log.error(
      "Invalid params given to getStaticProps (page: /tv/[id]/[episode])."
    );
    return {
      notFound: true,
      props: {},
    };
  }
  try {
    const fallbackData = await getMovieDetail(id, 1, +episodeIndex);
    log.info(`Fetched fallbackData for /tv/${id}/${episodeIndex}`);
    return {
      props: {
        fallbackData,
      },
      revalidate: 43200,
    };
  } catch (err) {
    log.error(
      `${
        err instanceof Error ? err.message : "Unknown error."
      } (page: /tv/${id}/${episodeIndex})`
    );
    return {
      props: {},
    };
  }
};

type TVProps = InferGetStaticPropsType<typeof getStaticProps>;

const TV: NextPage<TVProps> = (props) => {
  const { fallbackData } = props;

  const router = useRouter();
  const { id, episode } = router.query;

  const episodeIndex = Number(typeof episode === "string" ? episode : 0);

  const { data, error } = useSWR(
    id && episodeIndex ? `tv-${id}-${episodeIndex}` : null,
    () => getMovieDetail(id as string, 1, +episodeIndex),
    {
      fallbackData,
    }
  );

  useEffect(() => {
    if (error || !data) return;
    localStorage.setItem(`tv-${id}-episode`, `${episodeIndex}`);
  }, [error, data, id, episodeIndex]);

  if (error) return <ErrorPage />;

  return (
    <>
      <Head>
        <meta
          property="og:url"
          content={`${process.env.NEXT_PUBLIC_CANONICAL_URL}/tv/${
            typeof id === "string" ? id : "14337"
          }/1`}
          key="og-url"
        />
        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_CANONICAL_URL}/tv/${
            typeof id === "string" ? id : "14337"
          }/1`}
          key="canonical-url"
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
