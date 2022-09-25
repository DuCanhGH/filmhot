import { type FC, lazy, Suspense, useEffect } from "react";
import { Helmet } from "react-helmet-async";

import { subtitleProxy } from "../../shared/constants";
import type { DetailType, HistoryType } from "../../shared/types";
import NavBar from "../Shared/NavBar";
import Skeleton from "../Shared/Skeleton";
import Comment from "./Comment";
import MetaData from "./MetaData";
import Similar from "./Similar";

const Player = lazy(() =>
  import("@ducanh2912/react-tuby").then((a) => ({
    default: a.Player,
  })),
);

const ReactHlsPlayer = lazy(() => import("@ducanh2912/react-hls-player"));

interface WatchViewProps {
  data?: DetailType;
  sources:
    | {
        quality: number;
        url: string;
      }[]
    | undefined;
  subtitles?:
    | {
        language: string;
        url: string;
        lang: string;
      }[]
    | undefined;
  episodeIndex?: number;
}

const WatchView: FC<WatchViewProps> = ({ data, sources, subtitles, episodeIndex }) => {
  const mediaType = typeof episodeIndex === "undefined" ? "movie" : "tv";
  const playerKey = `ducanh-filmhot-${mediaType}-${data?.id}${
    episodeIndex ? `-${episodeIndex}` : ""
  }`;

  useEffect(() => {
    if (!data) return;
    let existing = JSON.parse(localStorage.getItem("filmhot-recent") || "[]") as HistoryType[];

    if (!Array.isArray(existing)) return;

    existing = existing.filter((item) => item.id !== data.id);

    existing.unshift({
      id: data.id,
      category: data.category,
      coverVerticalUrl: data.coverVerticalUrl,
      name: data.name,
    });

    localStorage.setItem("filmhot-recent", JSON.stringify(existing));
  }, [data]);

  return (
    <>
      {data && (
        <Helmet>
          <title>{`Watch ${data.name}${
            typeof episodeIndex !== "undefined" ? ` - Episode ${episodeIndex}` : ""
          }`}</title>
        </Helmet>
      )}
      <div className="flex justify-center">
        <div className="mx-[4vw] lg:mx-[6vw] flex-1">
          <NavBar />
          <div className="flex flex-col md:flex-row gap-10 my-7">
            <div className="flex flex-col items-stretch flex-grow">
              <div className="w-full h-0 pb-[56.25%] relative">
                <div className="absolute inset-0 w-full h-full bg-black">
                  {data && sources && subtitles ? (
                    <Suspense fallback={<></>}>
                      <Player
                        playerKey={playerKey}
                        primaryColor="#0D90F3"
                        src={sources}
                        subtitles={
                          subtitles?.map((subtitle) => ({
                            ...subtitle,
                            url: subtitleProxy(subtitle.url),
                          })) || []
                        }
                      >
                        {(ref, props) => {
                          const { src, ...others } = props;
                          return <ReactHlsPlayer playerRef={ref} src={src} {...others} />;
                        }}
                      </Player>
                    </Suspense>
                  ) : (
                    <div className="w-full h-0 pb-[56.25%] relative">
                      <Skeleton className="absolute top-0 left-0 w-full h-full" />
                    </div>
                  )}
                </div>
              </div>

              <MetaData data={data} episodeIndex={episodeIndex} />

              {data && <Comment data={data} episodeIndex={episodeIndex} />}
            </div>

            <Similar data={data} />
          </div>
        </div>
      </div>
    </>
  );
};

export default WatchView;
