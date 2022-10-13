import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

const NonExistentPage: NextPage = () => {
  return (
    <>
      <Head>
        <meta
          property="og:title"
          content="FilmHot - Not found"
          key="og-title"
        />
        <meta
          property="og:url"
          content={`${process.env.NEXT_PUBLIC_CANONICAL_URL}/`}
          key="og-url"
        />
        <meta
          property="twitter:title"
          content="FilmHot - Not found"
          key="twitter-title"
        />
        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_CANONICAL_URL}/`}
          key="canonical-url"
        />
      </Head>
      <div className="flex flex-col min-h-screen justify-center items-center gap-4">
        {/* eslint-disable @next/next/no-img-element */}
        <img
          className="w-full max-w-[200px] h-auto"
          src="/404_error.png"
          alt=""
        />
        <p className="text-xl">This page does not exist.</p>
        <Link className="text-primary" href="/">
          Return home
        </Link>
      </div>
    </>
  );
};

export default NonExistentPage;
