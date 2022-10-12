import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import useSWR from "swr";

import ExploreConfig from "@/components/Explore/ExploreConfig";
import Error from "@/components/Shared/Error";
import NavBar from "@/components/Shared/NavBar";
import { getSearchConfig } from "@/services/explore";

const Explore: NextPage = () => {
  const { data: searchConfig, error } = useSWR("search-config", () =>
    getSearchConfig()
  );

  const [sectionIndex, setSectionIndex] = useState(0);

  if (error) return <Error />;

  return (
    <>
      <Head>
        <title>Explore</title>
        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_CANONICAL_URL}/explore`}
        />
      </Head>
      <div className="flex flex-col items-stretch min-h-screen mx-[7vw]">
        <NavBar />

        {!searchConfig ? (
          <div className="flex-grow flex justify-center items-center">
            <div className="w-10 h-10 border-[3px] border-t-transparent border-primary rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="mb-6">
            <div className="flex gap-3">
              {searchConfig.map((config, index) => (
                <button
                  key={index}
                  className={`transition relative after:absolute after:top-[110%] after:left-0 after:w-full after:h-[2px] after:bg-transparent after:rounded after:transition hover:text-primary hover:after:bg-primary ${
                    sectionIndex === index
                      ? "text-primary after:bg-primary"
                      : ""
                  }`}
                  onClick={() => {
                    setSectionIndex(index);
                  }}
                >
                  {config.name}
                </button>
              ))}
            </div>
            <ExploreConfig
              config={searchConfig[sectionIndex]}
              sectionIndex={sectionIndex}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default Explore;
