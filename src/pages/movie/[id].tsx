import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage,
} from "next";
import Head from "next/head";
import { useRouter } from "next/router";
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
    log.error(`No params given for getStaticProps to run (page: /movie/[id]).`);
    return {
      notFound: true,
      props: {},
    };
  }
  const id = params.id as string;
  if (!id || typeof id !== "string") {
    log.error("Invalid params given to getStaticProps (page: /movie/[id]).");
    return {
      notFound: true,
      props: {},
    };
  }
  try {
    const fallbackData = await getMovieDetail(id, 0);
    log.info(`Fetched fallbackData for /movie/${id}`);
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
      } (page: /movie/${id})`
    );
    return {
      props: {},
    };
  }
};

type MovieProps = InferGetStaticPropsType<typeof getStaticProps>;

const Info: NextPage<MovieProps> = (props) => {
  const { fallbackData } = props;

  const router = useRouter();
  const { id } = router.query;

  const { data, error } = useSWR(
    `movie-${id}`,
    () => getMovieDetail(id as string, 0),
    {
      fallbackData,
    }
  );

  if (error) return <ErrorPage />;

  return (
    <>
      <Head>
        <meta
          property="og:url"
          content={`${process.env.NEXT_PUBLIC_CANONICAL_URL}/movie/${
            typeof id === "string" ? id : "8084"
          }`}
          key="og-url"
        />
        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_CANONICAL_URL}/movie/${
            typeof id === "string" ? id : "8084"
          }`}
          key="canonical-url"
        />
      </Head>
      <WatchView
        data={data?.data}
        sources={data?.sources}
        subtitles={data?.subtitles}
      />
    </>
  );
};

export default Info;
