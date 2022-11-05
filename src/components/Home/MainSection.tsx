import { Fragment, startTransition } from "react";
import { InView } from "react-intersection-observer";
import useSWRInfinite from "swr/infinite";

import Skeleton from "@/components/Shared/Skeleton";
import { getHome } from "@/services/home";
import { BANNED_IDS } from "@/shared/constants";
import type { HomeSection } from "@/shared/types";

import BannerSlider from "./BannerSlider";
import InfiniteLoader from "./InfiniteLoader";
import SectionSlider from "./SectionSlider";
import SkeletonSlider from "./SkeletonSlider";

const MainSection = () => {
  const getKey = (index: number) => `home-${index || 0}`;
  const {
    data: ogData,
    error,
    size,
    setSize,
  } = useSWRInfinite(
    getKey,
    (key) => getHome(Number(key.split("-").slice(-1)[0])),
    {
      revalidateFirstPage: false,
    }
  );
  const data = ogData
    ? ([] as HomeSection[])
        .concat(...ogData)
        .filter(
          (value, index, self) =>
            self.findIndex((v) => v.homeSectionId === value.homeSectionId) ===
            index
        )
    : [];
  const isReachingEnd = !!error || ogData?.slice(-1)?.[0]?.length === 0;
  const isLoadingMore =
    size > 0 && ogData && typeof ogData[size - 1] === "undefined";
  const loadMore = () => {
    startTransition(() => {
      setSize((prev) => prev + 1);
    });
  };
  if (!ogData || error) {
    return (
      <>
        <div className="relative h-0 pb-[42%] mt-8">
          <Skeleton className="absolute top-0 left-0 w-full h-full rounded-2xl" />
        </div>
        {[...new Array(2)].map((_, index) => (
          <Fragment key={index}>
            <Skeleton className="my-8 h-6 w-full max-w-[200px]" />
            <div className="overflow-hidden">
              <SkeletonSlider />
            </div>
          </Fragment>
        ))}
      </>
    );
  }
  return (
    <>
      {data.map((section) =>
        section.homeSectionType === "BANNER" ? (
          <div
            key={section.homeSectionId}
            className="overflow-hidden w-full mt-8"
          >
            <BannerSlider
              images={
                (section.recommendContentVOList
                  .filter((a) => !BANNED_IDS.includes(a.id))
                  .map((item) => {
                    const searchParams = new URLSearchParams(
                      new URL(item.jumpAddress).search
                    );

                    if (!searchParams.get("id")) return null;

                    return {
                      title: item.title,
                      image: item.imageUrl,
                      link:
                        searchParams.get("type") === "0"
                          ? `/movie/${searchParams.get("id")}`
                          : `/tv/${searchParams.get("id")}/${
                              typeof window === "object"
                                ? localStorage.getItem(
                                    `tv-${searchParams.get("id")}-episode`
                                  ) || 1
                                : 1
                            }`,
                    };
                  })
                  .filter(Boolean) as {
                  title: string;
                  image: string;
                  link: string;
                }[]) || []
              }
            />
          </div>
        ) : (
          <div key={section.homeSectionId}>
            <h1 className="text-2xl mb-3 mt-8">
              {section.homeSectionName.replace("on Loklok", "")}
            </h1>

            <SectionSlider
              images={section.recommendContentVOList
                .filter((a) => !BANNED_IDS.includes(a.id))
                .map((item) => {
                  const searchParams = new URLSearchParams(
                    new URL(item.jumpAddress).search
                  );
                  return {
                    title: item.title,
                    image: item.imageUrl,
                    link:
                      searchParams.get("type") === "0"
                        ? `/movie/${searchParams.get("id")}`
                        : `/tv/${searchParams.get("id")}/${
                            typeof window === "object"
                              ? localStorage.getItem(
                                  `tv-${searchParams.get("id")}-episode`
                                ) || 1
                              : 1
                          }`,
                  };
                })}
              coverType={section.coverType}
            />
          </div>
        )
      )}
      {!isReachingEnd && (
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
          {({ ref }) => <InfiniteLoader ref={ref} />}
        </InView>
      )}
    </>
  );
};

export default MainSection;
