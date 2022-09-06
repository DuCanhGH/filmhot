import { FC, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { FaBars, FaHeart, FaExternalLinkAlt } from "react-icons/fa";
import ReactHlsPlayer from "@ducanh2912/react-hls-player";
import { InView } from "react-intersection-observer";
import InfiniteScroll from "react-infinite-scroll-component";
import useSWRInfinite from "swr/infinite";

import Sidebar from "../components/Shared/Sidebar";
import { getDiscoveryItems } from "../services/discovery";
import { resizeImage } from "../shared/constants";
import Error from "../components/Shared/Error";
import ImageFade from "../components/Shared/ImageFade";

const Discovery: FC = () => {
  const [sidebarActive, setSidebarActive] = useState(false);

  const getKey = (index: number) => `discovery-${index || 0}`;

  const { data, error, setSize } = useSWRInfinite(
    getKey,
    (key) => getDiscoveryItems(Number(key.split("-").slice(-1)[0])),
    {
      revalidateFirstPage: false,
    },
  );

  const location = useLocation();

  useEffect(() => {
    setSidebarActive(false);
  }, [location]);

  if (error) return <Error />;

  return (
    <>
      <Helmet>
        <title>Discovery</title>
        <link rel="canonical" href={`${import.meta.env.VITE_CANONICAL_URL}/discovery`} />
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

        <div className="flex-grow py-10 px-[4vw]">
          {!data && (
            <div className="h-screen w-full flex justify-center items-center">
              <div className="w-10 h-10 border-[3px] border-t-transparent border-primary rounded-full animate-spin"></div>
            </div>
          )}
          <InfiniteScroll
            dataLength={data?.length || 0}
            next={() => setSize((prev) => prev + 1)}
            hasMore={!error && data?.slice(-1)?.[0]?.length !== 0}
            loader={<></>}
          >
            <div className="flex flex-col items-center w-full gap-24">
              {data
                ?.reduce((acc, current) => [...acc, ...current], [])
                .map((item) => (
                  <div key={item.id} className="w-full max-w-[600px] flex gap-2">
                    <ImageFade
                      className="w-12 h-12 rounded-full flex-shrink-0 bg-gray-500"
                      src={resizeImage(item.upInfo.upImgUrl, "48", "48")}
                      alt="OP's profile picture"
                    />

                    <div className="flex flex-col items-stretch flex-grow gap-3">
                      <p className="font-semibold">{item.refList[0]?.name || item.name}</p>

                      <p>{item.introduction}</p>

                      <InView threshold={0.5}>
                        {({ ref, inView }) => (
                          <div ref={ref} className="h-0 relative pb-[100%]">
                            <ReactHlsPlayer
                              controls
                              muted
                              autoPlay={inView}
                              playsInline
                              src={item.mediaUrl}
                              className="absolute top-0 left-0 w-full h-full object-contain"
                            />
                          </div>
                        )}
                      </InView>
                    </div>

                    <div className="flex flex-col items-center justify-center w-20 gap-5">
                      <div className="flex flex-col items-center gap-2">
                        <div
                          className="bg-dark-lighten rounded-full h-10 w-10 flex justify-center items-center"
                          aria-label="Likes"
                          role="img"
                        >
                          <FaHeart className="text-red-500" />
                        </div>
                        <span>{item.likeCount}</span>
                      </div>

                      {item?.refList?.[0]?.id && (
                        <div className="flex flex-col items-center gap-2">
                          <Link
                            to={
                              item.refList[0].category === 0
                                ? `/movie/${item.refList[0].id}`
                                : `/tv/${item.refList[0].id}`
                            }
                            className="bg-dark-lighten rounded-full h-10 w-10 flex justify-center items-center"
                            aria-label="Visit movie / TV page for this post"
                          >
                            <FaExternalLinkAlt />
                          </Link>
                          <span>Open</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          </InfiniteScroll>
        </div>
      </div>
    </>
  );
};

export default Discovery;
