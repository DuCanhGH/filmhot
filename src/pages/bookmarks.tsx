import type { NextPage } from "next";
import Image from "next/future/image";
import Head from "next/head";
import Link from "next/link";
import { FC, useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";

import { FilmItem } from "@/components/Shared/FilmItem";
import NavBar from "@/components/Shared/NavBar";
import type { BookmarkType } from "@/shared/types";

const getBookmarks = () => {
  try {
    const existing = JSON.parse(
      localStorage.getItem("filmhot-favorites") || "[]"
    ) as BookmarkType[];
    return existing;
  } catch {
    return [];
  }
};

const Bookmarks: NextPage = () => {
  const [data, setData] = useState<BookmarkType[]>([]);

  useEffect(() => {
    setData(getBookmarks());
  }, []);

  const clearFavorites = () => {
    localStorage.removeItem("filmhot-favorites");
    setData(getBookmarks());
  };

  return (
    <>
      <Head>
        <title>Bookmarks</title>
        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_CANONICAL_URL}/bookmarks`}
        />
      </Head>
      <div className="flex flex-col items-stretch mx-[7vw] mb-8">
        <NavBar />
        <div className="flex justify-between mb-6">
          <h1 className="text-3xl">Bookmarks</h1>
          <button
            onClick={clearFavorites}
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
            <p className="text-xl">No Bookmarks found</p>
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

export default Bookmarks;
