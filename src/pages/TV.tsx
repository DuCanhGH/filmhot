import { FC, useEffect } from "react";
import useSWR from "swr";
import { useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import { useQueryParams } from "../hooks/useQueryParams";
import WatchView from "../components/WatchView";
import { getMovieDetail } from "../services/movie";
import Error from "../components/Shared/Error";

const TV: FC = () => {
  const { id } = useParams();

  const queryParams = useQueryParams();

  const navigate = useNavigate();

  const episodeIndex = Number(queryParams.get("episode"));

  useEffect(() => {
    if (!episodeIndex) {
      navigate(`?episode=${localStorage.getItem(`tv-${id}-episode`) || 1}`, {
        relative: "path",
        replace: true,
      });
    }
  }, [episodeIndex, id, navigate]);

  const { data, error } = useSWR(episodeIndex ? `tv-${id}-${episodeIndex}` : null, () =>
    getMovieDetail(id as string, 1, +episodeIndex),
  );

  useEffect(() => {
    if (error || !data) return;
    localStorage.setItem(`tv-${id}-episode`, `${episodeIndex}`);
  }, [error, data, id, episodeIndex]);

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
