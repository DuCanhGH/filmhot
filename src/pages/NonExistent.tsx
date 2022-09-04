import { FC } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const NonExistentPage: FC = () => {
  return (
    <>
      <Helmet>
        <link rel="canonical" href={`${import.meta.env.VITE_CANONICAL_URL}/`} />
      </Helmet>
      <div className="flex flex-col min-h-screen justify-center items-center gap-4">
        <img className="w-full max-w-[200px] h-auto" src="/404_error.png" alt="" />
        <p className="text-xl">This page does not exist.</p>
        <Link className="text-primary" to="/">
          Return home
        </Link>
      </div>
    </>
  );
};

export default NonExistentPage;
