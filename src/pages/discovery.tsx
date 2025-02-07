import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { startTransition, useEffect, useState } from "react";
import { FaBars, FaExternalLinkAlt, FaHeart } from "react-icons/fa";
import { InView } from "react-intersection-observer";
import useSWRInfinite from "swr/infinite";

import DiscoveryPlayer from "@/components/Discovery/Player";
import { ErrorWithRetry } from "@/components/Shared/Error";
import ImageFade from "@/components/Shared/ImageFade";
import Sidebar from "@/components/Shared/Sidebar";
import { getDiscoveryItems } from "@/services/discovery";
import { BANNED_IDS } from "@/shared/constants";
import type { DiscoveryItem } from "@/shared/types";

const Discovery: NextPage = () => {
  const [sidebarActive, setSidebarActive] = useState(false);

  const getKey = (index: number) => `discovery-${index || 0}`;

  const router = useRouter();

  const location = router.pathname;

  const {
    data: ogData,
    error,
    size,
    setSize,
    mutate,
  } = useSWRInfinite<DiscoveryItem[]>(
    getKey,
    (key) => getDiscoveryItems(Number(key.split("-").slice(-1)[0])),
    {
      revalidateFirstPage: false,
    }
  );
  const data = ogData ? ([] as DiscoveryItem[]).concat(...ogData) : [];
  const isReachingEnd = error || ogData?.slice(-1)?.[0]?.length === 0;
  const isLoadingMore =
    size > 0 && ogData && typeof ogData[size - 1] === "undefined";
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
      <Head>
        <title key="title">Discovery</title>
        <meta
          property="og:title"
          content="FilmHot - Discovery"
          key="og-title"
        />
        <meta
          property="og:url"
          content={`${process.env.NEXT_PUBLIC_CANONICAL_URL}/discovery`}
          key="og-url"
        />
        <meta
          property="twitter:title"
          content="FilmHot - Discovery"
          key="twitter-title"
        />
        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_CANONICAL_URL}/discovery`}
          key="canonical-url"
        />
      </Head>
      <div className="flex sm:hidden justify-between px-[4vw] mt-6">
        <Link href="/" className="flex items-center gap-2">
          <Image
            width={32}
            height={32}
            className="w-8 h-8"
            src="/icon.png"
            alt=""
          />
          <span className="text-xl font-medium">FilmHot</span>
        </Link>

        <button
          aria-label="Toggle sidebar"
          onClick={() => setSidebarActive(!sidebarActive)}
        >
          <FaBars className="text-2xl" />
        </button>
      </div>
      <div className="flex">
        <Sidebar
          sidebarActive={sidebarActive}
          setSidebarActive={setSidebarActive}
        />
        <div className="flex-grow py-10 px-[4vw]">
          {!ogData && !error && (
            <div className="h-screen w-full flex justify-center items-center">
              <div className="w-10 h-10 border-[3px] border-t-transparent border-primary rounded-full animate-spin"></div>
            </div>
          )}
          <div className="flex flex-col items-center w-full gap-24">
            {data.map((item) => (
              <div key={item.id} className="w-full max-w-[600px] flex gap-2">
                <ImageFade
                  className="w-12 h-12 rounded-full flex-shrink-0 bg-gray-500"
                  src={item.upInfo.upImgUrl ?? "/default-avatar.png"}
                  width={48}
                  height={48}
                  alt="OP's profile picture"
                />

                <div className="flex flex-col items-stretch flex-grow gap-3">
                  <p className="font-semibold">
                    {item.refList[0]?.name || item.name}
                  </p>
                  <p>{item.introduction}</p>
                  <div className="w-full h-full bg-black">
                    <InView threshold={0.5}>
                      {({ ref, inView }) => (
                        <DiscoveryPlayer
                          src={item.mediaUrl}
                          forwardedRef={ref}
                          forwardedInView={inView}
                        />
                      )}
                    </InView>
                  </div>
                </div>
                <div className="flex flex-col items-center justify-center w-20 gap-5">
                  <div className="flex flex-col items-center gap-2">
                    <div
                      className="bg-dark-lighten-100 rounded-full h-10 w-10 flex justify-center items-center"
                      aria-label="Likes"
                      role="img"
                    >
                      <FaHeart className="text-red-500" />
                    </div>
                    <span>{item.likeCount}</span>
                  </div>

                  {item?.refList?.[0]?.id &&
                    !BANNED_IDS.includes(+item.refList[0].id) && (
                      <div className="flex flex-col items-center gap-2">
                        <Link
                          href={
                            item.refList[0].category === 0
                              ? `/movie/${item.refList[0].id}`
                              : `/tv/${item.refList[0].id}/${
                                  typeof window === "object"
                                    ? localStorage.getItem(
                                        `tv-${item.refList[0].id}-episode`
                                      ) || 1
                                    : 1
                                }`
                          }
                          className="bg-dark-lighten-100 rounded-full h-10 w-10 flex justify-center items-center"
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
        </div>
      </div>
    </>
  );
};

export default Discovery;
