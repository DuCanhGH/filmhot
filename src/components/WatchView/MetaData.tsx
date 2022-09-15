import classNames from "classnames";
import { FC, useState, useCallback, RefCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaRedoAlt, FaBookmark, FaRegBookmark } from "react-icons/fa";

import Skeleton from "../Shared/Skeleton";
import type { DetailType, BookmarkType } from "../../shared/types";

interface MetaDataProps {
  data?: DetailType;
  episodeIndex: number | undefined;
}

const MetaData: FC<MetaDataProps> = ({ data, episodeIndex }) => {
  const [showLoadMoreButton, setShowLoadMoreButton] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMovieBookmarked, setIsMovieBookmarked] = useState(false);
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
