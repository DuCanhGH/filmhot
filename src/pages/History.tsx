import { FC, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";

import NavBar from "../components/Shared/NavBar";
import { FilmItem } from "../components/Shared/FilmItem";
import type { HistoryType } from "../shared/types";

const getHistory = () => {
  try {
    const existing = JSON.parse(localStorage.getItem("filmhot-recent") || "[]") as HistoryType[];
    return existing;
  } catch {
    return [];
  }
};

const History: FC = () => {
  const [data, setData] = useState<HistoryType[]>(getHistory());

  const clearHistory = () => {
    localStorage.removeItem("filmhot-recent");
    setData(getHistory());
  };

  return (
    <>
      <Helmet>
        <title>Watch history</title>
        <link rel="canonical" href={`${import.meta.env.VITE_CANONICAL_URL}/history`} />
      </Helmet>
      <div className="flex flex-col items-stretch mx-[7vw] mb-8">
        <NavBar />
        <div className="flex justify-between mb-6">
          <h1 className="text-3xl">Watch history</h1>
          <button onClick={clearHistory} className="text-primary flex items-center gap-1">
            <FaTrash /> <span>Clear</span>
          </button>
        </div>
        {data.length === 0 ? (
          <div className="flex flex-col items-center my-10 gap-6">
            <img className="w-40 h-40 object-cover" src="/cinema.svg" alt="" />
            <p className="text-xl">No Watch history found</p>
            <Link className="text-xl text-primary" to="/">
              Discover more
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 grid-cols-sm md:grid-cols-lg">
            {data.map((item) => (
              <FilmItem item={item} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default History;
