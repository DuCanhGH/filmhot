import classNames from "classnames";
import { capitalize } from "radash";
import { FC, Fragment, lazy, RefCallback, Suspense, useCallback, useEffect, useState } from "react";
import { FaBookmark, FaDownload, FaRedoAlt, FaRegBookmark } from "react-icons/fa";
import { Link } from "react-router-dom";

import { useDownloadVideo } from "../../hooks/useDownloadVideo";
import type { BookmarkType, DetailType } from "../../shared/types";
import Skeleton from "../Shared/Skeleton";

const Download = lazy(() => import("./Download"));

interface MetaDataProps {
  data?: DetailType;
  episodeIndex: number | undefined;
  sources:
    | {
        quality: number;
        url: string;
      }[]
    | undefined;
}

const MetaData: FC<MetaDataProps> = ({ data, episodeIndex, sources }) => {
  const [showLoadMoreButton, setShowLoadMoreButton] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMovieBookmarked, setIsMovieBookmarked] = useState(false);
  const {
    data: playlistData,
    segments,
    setSegments,
    proxy,
    playListSource,
    disabled,
    loading,
    downloadVideo,
  } = useDownloadVideo(sources ? sources[0].url : "");
  const lastEpisodeRef: RefCallback<HTMLAnchorElement> = useCallback((node) => {
    if (node != null) {
      if (node.offsetTop > 0) {
        setShowLoadMoreButton(true);
      }
    }
  }, []);

  useEffect(() => {
    setIsExpanded(false);
  }, [episodeIndex]);

  useEffect(() => {
    if (!data) return;
    const existing = JSON.parse(
      localStorage.getItem("filmhot-favorites") || "[]",
    ) as BookmarkType[];
    if (!Array.isArray(existing)) return;
    if (existing.some((a) => a.id === data.id)) {
      setIsMovieBookmarked(true);
    } else {
      setIsMovieBookmarked(false);
    }
  }, [data]);

  const bookmarkMovie = () => {
    if (!data) return;
    let existing = JSON.parse(localStorage.getItem("filmhot-favorites") || "[]") as BookmarkType[];
    if (!Array.isArray(existing)) return;
    existing = existing.filter((item) => item.id !== data.id);
    if (!isMovieBookmarked) {
      existing.unshift({
        id: data.id,
        category: data.category,
        coverVerticalUrl: data.coverVerticalUrl,
        name: data.name,
      });
    }
    setIsMovieBookmarked(!isMovieBookmarked);
    localStorage.setItem("filmhot-favorites", JSON.stringify(existing));
  };

  return (
    <>
      {data ? (
        <div className="flex flex-col gap-[10px]">
          <h1 className="text-3xl mt-5">{data?.name}</h1>

          <div className="flex gap-4">
            <div className="flex items-center gap-1">
              <img className="w-4 h-4" src="/star.png" alt="" />
              <p>{data?.score?.toFixed(1)}</p>
            </div>
            <div className="flex items-center gap-1">
              <img className="w-4 h-4" src="/calendar.png" alt="" />
              <p>{data?.year}</p>
            </div>
          </div>

          <div className="flex gap-3 flex-wrap">
            {data.tagList.map((tag) => (
              <Link
                to={`/category/${tag.id}`}
                key={tag.id}
                className="bg-dark-lighten rounded-full px-3 py-1 hover:brightness-125 transition duration-300"
              >
                {tag.name}
              </Link>
            ))}
          </div>
          <button
            className="text-primary w-fit h-fit flex items-center gap-2"
            onClick={bookmarkMovie}
          >
            {isMovieBookmarked ? (
              <>
                <FaBookmark aria-hidden className="text-xl w-[24px]" />
                <p className="block">Movie bookmarked!</p>
              </>
            ) : (
              <>
                <FaRegBookmark aria-hidden className="text-xl w-[24px]" />
                <p className="block">Bookmark movie</p>
              </>
            )}
          </button>
          <button
            className="text-primary w-fit h-fit flex items-center gap-2"
            onClick={() => {
              window.location.reload();
            }}
          >
            <FaRedoAlt aria-hidden className="text-xl w-[24px]" />
            <p className="block">Refresh the page if the movie fails to load</p>
          </button>
          <button
            type="button"
            className="text-primary w-fit h-fit flex items-center gap-2 disabled:text-secondary"
            disabled={disabled || !!playlistData}
            onClick={downloadVideo}
          >
            {loading ? (
              <div className="rounded-full h-5 w-5 border-2 border-primary border-t-transparent animate-spin"></div>
            ) : (
              <FaDownload aria-hidden className="text-xl w-[24px]" />
            )}
            <span>Download</span>
          </button>
          {segments.length > 0 ? (
            <Suspense fallback={<></>}>
              <Download segments={segments} proxy={proxy} />
            </Suspense>
          ) : (
            <>
              {playlistData && (
                <>
                  {playlistData?.playlists?.length ? (
                    <div className="w-full flex flex-col items-stretch gap-3">
                      <h2 className="text-2xl mt-3 mb-1">Choose a resolution</h2>
                      {playlistData.playlists.map((playlist: any, index: number) => (
                        <p key={playlist.uri}>
                          <span className="font-semibold">{playlist.uri}: </span>
                          <span>
                            {Object.entries(playlist.attributes).map(
                              ([key, value]: [key: any, value: any], index) => (
                                <Fragment key={key}>
                                  {index !== 0 && <span>, </span>}
                                  <span>
                                    <>
                                      {capitalize(key)}:{" "}
                                      <span className="text-gray-500">
                                        {typeof value !== "object"
                                          ? value
                                          : Object.entries(value)
                                              .map(([key, value]) => `${key}: ${value}`)
                                              .join(",")}
                                      </span>
                                    </>
                                  </span>
                                </Fragment>
                              ),
                            )}
                          </span>
                          <span> </span>
                          <button
                            onClick={() => setSegments(playListSource[index])}
                            className="text-blue-500"
                          >
                            Download
                          </button>
                        </p>
                      ))}
                    </div>
                  ) : (
                    <h3>Failed to parse</h3>
                  )}
                </>
              )}
            </>
          )}
          <p>{data.introduction}</p>

          {data.episodeVo > 1 && (
            <>
              <h1 className="text-xl my-3">Episodes</h1>
              <div
                className={classNames("flex flex-wrap gap-3 relative", {
                  "before:absolute before:bg-gradient-to-b before:from-[#00000000] before:to-dark before:top-10 before:w-full before:left-0 before:h-8 max-h-[68px] overflow-hidden":
                    showLoadMoreButton && !isExpanded,
                })}
              >
                {new Array(data.episodeVo).fill("").map((_, index) => (
                  <Link
                    to={`/tv/${data.id}?episode=${index + 1}`}
                    key={index}
                    {...(index === data.episodeVo - 1 ? { ref: lastEpisodeRef } : {})}
                    className={classNames(
                      "px-4 h-[42px] flex items-center bg-dark-lighten rounded hover:brightness-125 transition duration-300",
                      {
                        "!bg-primary text-white": episodeIndex && index === episodeIndex - 1,
                      },
                    )}
                  >
                    {index + 1}
                  </Link>
                ))}
              </div>
              {showLoadMoreButton && (
                <div>
                  <button className="text-primary" onClick={() => setIsExpanded(!isExpanded)}>
                    {isExpanded ? "Show less" : "Show more"}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      ) : (
        <>
          <Skeleton className="w-[70%] h-8 mt-6" />
          <Skeleton className="w-[60%] h-8 mt-6" />
        </>
      )}
    </>
  );
};

export default MetaData;
