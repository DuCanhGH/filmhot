import Link from "next/link";
import type { FC } from "react";
import { startTransition } from "react";
import { InView } from "react-intersection-observer";
import { LazyLoadImage } from "react-lazy-load-image-component";
import useSWRInfinite from "swr/infinite";

import { ErrorWithRetry } from "@/components/Shared/Error";
import { advanceSearch } from "@/services/explore";
import { BANNED_IDS, resizeImage } from "@/shared/constants";
import type { AdvanceSearchItem } from "@/shared/types";

interface ExploreResultProps {
  params: string;
  configs: {
    [key: string]: any;
  };
  sectionIndex: number;
}

const ExploreResult: FC<ExploreResultProps> = ({
  params,
  configs,
  sectionIndex,
}) => {
  const getKey = (_: unknown, previousPageData: any) => {
    if (previousPageData && previousPageData.length === 0) return null;

    return `explore-${sectionIndex}-${JSON.stringify(configs)}-${
      previousPageData?.slice(-1)?.[0]?.sort || ""
    }`;
  };

  const {
    data: ogData,
    error,
    size,
    setSize,
    mutate,
  } = useSWRInfinite<AdvanceSearchItem[]>(
    getKey,
    (key) => advanceSearch(params, configs, key.split("-").slice(-1)[0]),
    {
      revalidateFirstPage: false,
    }
  );
  const data = ogData ? ([] as AdvanceSearchItem[]).concat(...ogData) : [];
  const isReachingEnd = error || ogData?.slice(-1)?.[0]?.length === 0;
  const isLoadingMore =
    size > 0 && ogData && typeof ogData[size - 1] === "undefined";
  const loadMore = () => {
    startTransition(() => {
      setSize((prev) => prev + 1);
    });
  };

  return (
    <>
      <div className="w-full grid grid-cols-sm md:grid-cols-lg gap-6">
        {data
          .filter((a) => !BANNED_IDS.includes(+a.id))
          .map((item) => (
            <Link
              title={item.name}
              href={
                item.domainType === 0
                  ? `/movie/${item.id}`
                  : `/tv/${item.id}/${
                      typeof window === "object"
                        ? localStorage.getItem(`tv-${item.id}-episode`) || 1
                        : 1
                    }`
              }
              key={item.id}
              className="relative h-0 pb-[163%] bg-dark-lighten-100 rounded overflow-hidden group"
            >
              <div className="absolute top-0 left-0 w-full h-full flex flex-col items-stretch">
                <div className="relative w-full h-0 pb-[140%] flex-shrink-0 group-hover:brightness-[80%] transition duration-300">
                  <LazyLoadImage
                    effect="opacity"
                    className="absolute top-0 left-0 w-full h-full object-cover"
                    src={resizeImage(item.coverVerticalUrl, "250")}
                    alt=""
                  />
                </div>

                <div className="flex-grow flex items-center">
                  <h1 className="w-full whitespace-nowrap overflow-hidden text-ellipsis px-2 group-hover:text-primary transition duration-300">
                    {item.name}
                  </h1>
                </div>
              </div>
            </Link>
          ))}
      </div>
      {!isReachingEnd ? (
        <InView
          onChange={(inView) => {
            if (
              inView &&
              typeof isLoadingMore !== "undefined" &&
              typeof isReachingEnd !== "undefined" &&
              !isLoadingMore &&
              !isReachingEnd
            ) {
              loadMore();
            }
          }}
          rootMargin="0px 0px 1000px 0px"
          threshold={[0, 0.25, 0.5, 0.75, 1]}
        >
          {({ ref }) => (
            <div ref={ref} className="overflow-hidden">
              <div className="flex justify-center w-full">
                <div className="w-10 h-10 border-[3px] border-primary border-t-transparent rounded-full animate-spin my-10"></div>
              </div>
            </div>
          )}
        </InView>
      ) : (
        <p className="text-center mt-6 mb-6">Nothing more to see</p>
      )}
      {error && <ErrorWithRetry mutate={mutate} />}
    </>
  );
};

export default ExploreResult;
