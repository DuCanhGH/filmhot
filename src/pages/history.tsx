import type { NextPage } from "next";
import Image from "next/future/image";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";

import { FilmItem } from "@/components/Shared/FilmItem";
import NavBar from "@/components/Shared/NavBar";
import type { HistoryType } from "@/shared/types";

const getHistory = () => {
  try {
    const existing = JSON.parse(
      localStorage.getItem("filmhot-recent") || "[]"
    ) as HistoryType[];
    return existing;
  } catch {
    return [];
  }
};

const History: NextPage = () => {
  const [data, setData] = useState<HistoryType[]>([]);

  useEffect(() => {
    setData(getHistory());
  }, []);

  const clearHistory = () => {
    localStorage.removeItem("filmhot-recent");
    setData(getHistory());
  };

  return (
    <>
      <Head>
        <title>Watch history</title>
        <meta
          property="og:title"
          content="FilmHot - Watch history"
          key="og-title"
        />
        <meta
          property="og:url"
          content={`${process.env.NEXT_PUBLIC_CANONICAL_URL}/history`}
          key="og-url"
        />
        <meta
          property="twitter:title"
          content="FilmHot - Watch history"
          key="twitter-title"
        />
        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_CANONICAL_URL}/history`}
          key="canonical-url"
        />
      </Head>
      <div className="flex flex-col items-stretch mx-[7vw] mb-8">
        <NavBar />
        <div className="flex justify-between mb-6">
          <h1 className="text-3xl">Watch history</h1>
          <button
            onClick={clearHistory}
            className="text-primary flex items-center gap-1"
          >
            <FaTrash /> <span>Clear</span>
          </button>
        </div>
        {data.length === 0 ? (
          <div className="flex flex-col items-center my-10 gap-6">
            <Image
              width={160}
              height={160}
              className="w-40 h-40 object-cover"
              src="/cinema.svg"
              alt=""
            />
            <p className="text-xl">No Watch history found</p>
            <Link className="text-xl text-primary" href="/">
              Discover more
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 grid-cols-sm md:grid-cols-lg">
            {data.map((item) => (
              <FilmItem key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default History;
