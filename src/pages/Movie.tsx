import { FC } from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import useSWR from "swr";

import Error from "../components/Shared/Error";
import WatchView from "../components/WatchView";
import { getMovieDetail } from "../services/movie";

const Info: FC = () => {
  const { id } = useParams();

  const { data, error } = useSWR(`movie-${id}`, () => getMovieDetail(id as string, 0));

  if (error) return <Error />;

  return (
    <>
      <Helmet>
        <link rel="canonical" href={`${import.meta.env.VITE_CANONICAL_URL}/movie/8084`} />
      </Helmet>
      <WatchView data={data?.data} sources={data?.sources} subtitles={data?.subtitles} />
    </>
  );
};

export default Info;
