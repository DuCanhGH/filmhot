import CategoryResult from "../components/Category/CategoryResult";
import Error from "../components/Shared/Error";
import NavBar from "../components/Shared/NavBar";
import { FC } from "react";
import { getSearchConfig } from "../services/explore";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import useSWR from "swr";

const Category: FC = () => {
  const { id } = useParams() as { id: string };

  const { data: searchConfig, error } = useSWR(`search-config`, () => getSearchConfig());

  if (error) return <Error />;

  if (!searchConfig)
    return (
      <div className="flex-grow flex justify-center items-center">
        <div className="w-10 h-10 border-[3px] border-t-transparent border-primary rounded-full animate-spin"></div>
      </div>
    );

  const categoryName = searchConfig[0].screeningItems
    .find((item) => item.id === 5)
    ?.items.find((item) => item.params === id)?.name;

  if (!categoryName) return <Error />;

  return (
    <>
      <Helmet>
        <link rel="canonical" href={`${import.meta.env.VITE_CANONICAL_URL}/category/1`} />
      </Helmet>
      <div>
        <div className="mx-[7vw]">
          <NavBar />
          <h1 className="my-6 text-2xl">Category: {categoryName}</h1>
        </div>
        <CategoryResult id={id} categoryName={categoryName} />
      </div>
    </>
  );
};

export default Category;
