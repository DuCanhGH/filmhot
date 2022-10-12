import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";

import TopSearches from "@/components/Home/TopSearches";
import SearchBox from "@/components/Search/SearchBox";
import SearchResult from "@/components/Search/SearchResult";
import NavBar from "@/components/Shared/NavBar";

const Search: NextPage = () => {
  const router = useRouter();
  const { q: query } = router.query;

  if (!query || typeof query !== "string")
    return (
      <>
        <Head>
          <title key="title">Search</title>
          <meta property="og:title" content="Filmhot - Search" key="og-title" />
          <meta
            property="og:url"
            content={`${process.env.NEXT_PUBLIC_CANONICAL_URL}/search`}
            key="og-url"
          />
          <meta
            property="twitter:title"
            content="FilmHot - Search"
            key="twitter-title"
          />
          <link
            rel="canonical"
            href={`${process.env.NEXT_PUBLIC_CANONICAL_URL}/search`}
            key="canonical-url"
          />
        </Head>
        <div className="flex justify-center my-[100px] mx-6">
          <div className="w-full max-w-[400px] flex flex-col items-center gap-4">
            <div className="flex flex-col items-stretch gap-3">
              <h1 className="text-2xl">Search for your favorite movies</h1>
              <SearchBox />
            </div>

            <div className="mt-8 w-full">
              <h1 className="text-lg mb-3">Popular Searches</h1>
              <TopSearches />
            </div>
          </div>
        </div>
      </>
    );

  return (
    <>
      <Head>
        <title key="title">{`Search for '${query}'`}</title>
        <meta property="og:title" content={`Filmhot - Search for '${query}'`} />
        <meta
          property="og:url"
          content={`${process.env.NEXT_PUBLIC_CANONICAL_URL}/search`}
        />
        <meta
          property="twitter:title"
          content={`Filmhot - Search for '${query}'`}
          key="twitter-title"
        />
        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_CANONICAL_URL}/search`}
        />
      </Head>
      <div className="flex flex-col items-stretch mx-[7vw] mb-8">
        <NavBar />
        <div>
          <h1 className="mb-6 text-3xl">Search result for {`'${query}'`}</h1>
        </div>
        <SearchResult query={query} />
      </div>
    </>
  );
};

export default Search;
