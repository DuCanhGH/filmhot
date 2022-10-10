import Image from "next/future/image";
import Head from "next/head";
import Link from "next/link";
import { FC } from "react";

const NonExistentPage: FC = () => {
  return (
    <>
      <Head>
        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_CANONICAL_URL}/`}
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
