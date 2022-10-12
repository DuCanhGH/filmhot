import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

const CustomError: NextPage = () => {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>An error occurred.</title>
        <meta
          property="og:title"
          content="FilmHot - An error occurred"
          key="og-title"
        />
        <meta
          property="og:url"
          content={`${process.env.NEXT_PUBLIC_CANONICAL_URL}/`}
          key="og-url"
        />
        <meta
          property="twitter:title"
          content="FilmHot - An error occurred"
          key="twitter-title"
        />
        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_CANONICAL_URL}/`}
        />
      </Head>
      <div className="flex flex-col min-h-screen justify-center items-center gap-4">
        {/* eslint-disable @next/next/no-img-element */}
        <img className="w-full max-w-[200px] h-auto" src="/error.png" alt="" />
        <p className="text-xl">Something went wrong.</p>
        <button
          className="text-primary"
          onClick={() => window.location.reload()}
        >
          Reload page
        </button>
        {router.pathname !== "/" && (
          <Link className="text-primary" href="/">
            Return home
          </Link>
        )}
      </div>
    </>
  );
};

CustomError.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default CustomError;
