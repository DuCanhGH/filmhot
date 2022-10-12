import Head from "next/head";
import { useRouter } from "next/router";
import { FC } from "react";
import useSWR from "swr";

import Error from "@/components/Shared/Error";
import WatchView from "@/components/WatchView";
import { getMovieDetail } from "@/services/movie";

const Info: FC = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data, error } = useSWR(`movie-${id}`, () =>
    getMovieDetail(id as string, 0)
  );

  if (error) return <Error />;

  return (
    <>
      <Head>
        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_CANONICAL_URL}/movie/8084`}
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
