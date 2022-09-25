import { startTransition } from "react";
import { InView } from "react-intersection-observer";
import useSWRInfinite from "swr/infinite";

import { getHome } from "../../services/home";
import { resizeImage } from "../../shared/constants";
import type { HomeSection } from "../../shared/types";
import BannerSlider from "./BannerSlider";
import InfiniteLoader from "./InfiniteLoader";
import SectionSlider from "./SectionSlider";

const MainSection = () => {
  const getKey = (index: number) => `home-${index || 0}`;
  const {
    data: ogData,
    error,
    size,
    setSize,
  } = useSWRInfinite(getKey, (key) => getHome(Number(key.split("-").slice(-1)[0])), {
    revalidateFirstPage: false,
    suspense: true,
  });
  const data = ogData ? ([] as HomeSection[]).concat(...ogData) : [];
  const isReachingEnd = !!error || ogData?.slice(-1)?.[0]?.length === 0;
  const isLoadingMore = size > 0 && ogData && typeof ogData[size - 1] === "undefined";
  const loadMore = () => {
    startTransition(() => {
      setSize((prev) => prev + 1);
    });
  };
  return (
    <>
      {data.map((section) =>
        section.homeSectionType === "BANNER" ? (
          <div key={section.homeSectionId} className="overflow-hidden w-full mt-8">
            <BannerSlider
              images={
                (section.recommendContentVOList
                  .map((item) => {
                    const searchParams = new URLSearchParams(new URL(item.jumpAddress).search);

                    if (!searchParams.get("id")) return null;

                    return {
                      title: item.title,
                      image: item.imageUrl,
                      link:
                        searchParams.get("type") === "0"
                          ? `/movie/${searchParams.get("id")}`
                          : `/tv/${searchParams.get("id")}`,
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
              images={section.recommendContentVOList.map((item) => {
                const searchParams = new URLSearchParams(new URL(item.jumpAddress).search);
                return {
                  title: item.title,
                  image: resizeImage(item.imageUrl, "200"),
                  link:
                    searchParams.get("type") === "0"
                      ? `/movie/${searchParams.get("id")}`
                      : `/tv/${searchParams.get("id")}`,
                };
              })}
              coverType={section.coverType}
            />
          </div>
        ),
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
