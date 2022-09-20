import { FC, Fragment, startTransition, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { FaBars } from "react-icons/fa";
import { InView } from "react-intersection-observer";
import { Link, useLocation } from "react-router-dom";
import useSWRInfinite from "swr/infinite";

import BannerSlider from "../components/Home/BannerSlider";
import InfiniteLoader from "../components/Home/InfiniteLoader";
import SectionSlider from "../components/Home/SectionSlider";
import SkeletonSlider from "../components/Home/SkeletonSlider";
import TopSearches from "../components/Home/TopSearches";
import SearchBox from "../components/Search/SearchBox";
import Sidebar from "../components/Shared/Sidebar";
import Skeleton from "../components/Shared/Skeleton";
import { getHome } from "../services/home";
import { resizeImage } from "../shared/constants";

const Home: FC = () => {
  const getKey = (index: number) => `home-${index || 0}`;
  const {
    data: ogData,
    error,
    size,
    setSize,
  } = useSWRInfinite(getKey, (key) => getHome(Number(key.split("-").slice(-1)[0])), {
    revalidateFirstPage: false,
  });
  const data = ogData ? ogData.reduce((acc, current) => [...acc, ...current], []) : [];
  const isReachingEnd = error || ogData?.slice(-1)?.[0]?.length === 0;
  const isLoadingMore = size > 0 && ogData && typeof ogData[size - 1] === "undefined";

  const [sidebarActive, setSidebarActive] = useState(false);
  const location = useLocation();

  const loadMore = () => {
    startTransition(() => {
      setSize((prev) => prev + 1);
    });
  };

  useEffect(() => {
    setSidebarActive(false);
  }, [location]);

  return (
    <>
      <Helmet>
        <link rel="canonical" href={`${import.meta.env.VITE_CANONICAL_URL}/`} />
      </Helmet>
      <div className="flex sm:hidden justify-between px-[4vw] mt-6">
        <Link to="/" className="flex items-center gap-2">
          <img className="w-8 h-8" src="/icon.png" alt="" />
          <span className="text-xl font-medium">FilmHot</span>
        </Link>

        <button aria-label="Toggle sidebar" onClick={() => setSidebarActive(!sidebarActive)}>
          <FaBars className="text-2xl" />
        </button>
      </div>

      <div className="flex">
        <Sidebar sidebarActive={sidebarActive} setSidebarActive={setSidebarActive} />

        <div className="flex-grow px-[4vw] md:px-8 pb-8 pt-0 overflow-hidden flex flex-col items-stretch">
          {!ogData || error ? (
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
          ) : (
            <>
              {data.map((section) =>
                section.homeSectionType === "BANNER" ? (
                  <div key={section.homeSectionId} className="overflow-hidden w-full mt-8">
                    <BannerSlider
                      images={
                        (section.recommendContentVOList
                          .map((item) => {
                            const searchParams = new URLSearchParams(
                              new URL(item.jumpAddress).search,
                            );

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
            </>
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
              {({ ref }) => <InfiniteLoader forwardedRef={ref} />}
            </InView>
          )}
        </div>

        <div className="flex-shrink-0 w-[350px] p-8 sticky top-0 h-screen scrollbar overflow-hidden overflow-y-auto hidden md:block">
          <SearchBox />
          <h1 className="text-xl my-6">Top Searches</h1>
          <TopSearches />
        </div>
      </div>
    </>
  );
};

export default Home;
