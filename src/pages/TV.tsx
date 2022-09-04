import { FC } from "react";
import useSWR from "swr";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import { useQueryParams } from "../hooks/useQueryParams";
import WatchView from "../components/WatchView";
import { getMovieDetail } from "../services/movie";
import Error from "../components/Shared/Error";

const TV: FC = () => {
  const { id } = useParams();

  const queryParams = useQueryParams();

  const episodeIndex = Number(queryParams.get("episode")) || 0;

  const { data, error } = useSWR(`tv-${id}-${episodeIndex}`, () =>
    getMovieDetail(id as string, 1, +episodeIndex),
  );

  if (error) return <Error />;

  return (
    <>
      <Helmet>
        <link rel="canonical" href={`${import.meta.env.VITE_CANONICAL_URL}/tv/8220`} />
      </Helmet>
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
