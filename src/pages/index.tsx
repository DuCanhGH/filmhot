import Image from "next/future/image";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC, Fragment, Suspense, useEffect, useState } from "react";
import { FaBars } from "react-icons/fa";

import MainSection from "@/components/Home/MainSection";
import SkeletonSlider from "@/components/Home/SkeletonSlider";
import TopSearches from "@/components/Home/TopSearches";
import SearchBox from "@/components/Search/SearchBox";
import Sidebar from "@/components/Shared/Sidebar";
import Skeleton from "@/components/Shared/Skeleton";

const Home: FC = () => {
  const [sidebarActive, setSidebarActive] = useState(false);
  const router = useRouter();

  const location = router.pathname;

  useEffect(() => {
    setSidebarActive(false);
  }, [location]);

  return (
    <>
      <Head>
        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_CANONICAL_URL}/`}
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

        <div className="flex-grow px-[4vw] md:px-8 pb-8 pt-0 overflow-hidden flex flex-col items-stretch">
          <Suspense
            fallback={
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
            }
          >
            <MainSection />
          </Suspense>
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
