import { FC } from "react";
import { Helmet } from "react-helmet-async";

import NavBar from "../components/Shared/NavBar";
import SearchBox from "../components/Search/SearchBox";
import SearchResult from "../components/Search/SearchResult";
import TopSearches from "../components/Home/TopSearches";
import { useQueryParams } from "../hooks/useQueryParams";

const Search: FC = () => {
  const queryParams = useQueryParams();
  const query = queryParams.get("q");

  if (!query?.trim())
    return (
      <>
        <Helmet>
          <title>Search</title>
        </Helmet>
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
      <Helmet>
        <title>{`Search for '${query}'`}</title>
      </Helmet>
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
