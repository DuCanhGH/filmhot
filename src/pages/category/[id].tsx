import Head from "next/head";
import { useRouter } from "next/router";
import { FC } from "react";
import useSWR from "swr";

import CategoryResult from "../../components/Category/CategoryResult";
import Error from "../../components/Shared/Error";
import NavBar from "../../components/Shared/NavBar";
import { getSearchConfig } from "../../services/explore";

const Category: FC = () => {
  const router = useRouter();
  const { id } = router.query as { id: string };

  const { data: searchConfig, error } = useSWR(`search-config`, () =>
    getSearchConfig()
  );

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
      <Head>
        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_CANONICAL_URL}/category/1`}
        />
      </Head>
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
