import Error from "../components/Error";
import { FC } from "react";
import WatchView from "../components/WatchView";
import { getMovieDetail } from "../services/movie";
import { useParams } from "react-router-dom";
import { useQueryParams } from "../hooks/useQueryParams";
import useSWR from "swr";

const TV: FC = () => {
  const { id } = useParams();

  const queryParams = useQueryParams();

  const episodeIndex = Number(queryParams.get("episode")) || 0;

  const { data, error } = useSWR(`tv-${id}-${episodeIndex}`, () =>
    getMovieDetail(id as string, 1, +episodeIndex),
  );

  if (error) return <Error />;

  return (
    <WatchView
      data={data?.data}
      sources={data?.sources}
      subtitles={data?.subtitles}
      episodeIndex={episodeIndex}
    />
  );
};

export default TV;
