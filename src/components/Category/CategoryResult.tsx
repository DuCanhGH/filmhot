import Head from "next/head";
import Link from "next/link";
import { FC, startTransition } from "react";
import { InView } from "react-intersection-observer";
import { LazyLoadImage } from "react-lazy-load-image-component";
import useInfiniteSWR from "swr/infinite";

import { ErrorWithRetry } from "@/components/Shared/Error";
import { getCategoryItems } from "@/services/category";
import { BANNED_IDS, resizeImage } from "@/shared/constants";

interface CategoryResultProps {
  id: string;
  categoryName: string;
}

interface DataType {
  id: string;
  name: string;
  coverVerticalUrl: string;
  domainType: number;
}

const CategoryResult: FC<CategoryResultProps> = ({ id, categoryName }) => {
  const getKey = (_: unknown, previousPageData: any) => {
    if (previousPageData && previousPageData.length === 0) return null;

    return `${id}-${previousPageData?.slice(-1)?.[0]?.sort || ""}`;
  };

  const {
    data: ogData,
    error,
    size,
    setSize,
    mutate,
  } = useInfiniteSWR<DataType[]>(getKey, (limit) =>
    getCategoryItems(id, limit.split("-").slice(-1)[0])
  );
  const data = ogData ? ([] as DataType[]).concat(...ogData) : [];
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
      <Head>
        <title>{`Category: ${categoryName}`}</title>
      </Head>
      <div className="flex justify-center mx-[7vw]">
        <div className="w-full grid grid-cols-sm md:grid-cols-lg gap-6">
          {data
            .filter((a) => !BANNED_IDS.includes(+a.id))
            .map((item) => (
              <Link
                title={item.name}
                href={
                  item.domainType === 0 ? `/movie/${item.id}` : `/tv/${item.id}`
                }
                key={item.id}
                className="relative h-0 pb-[163%] bg-dark-lighten hover:bg-dark-lighten-hover active:bg-dark-lighten-hover transition-colors rounded overflow-hidden group"
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

export default CategoryResult;
