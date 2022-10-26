import Image from "next/image";
import Link from "next/link";
import type { FC } from "react";
import { FaSearch } from "react-icons/fa";

import SearchBox from "@/components/Search/SearchBox";

const NavBar: FC = () => {
  return (
    <div className="flex justify-between items-center my-7">
      <Link href="/" className="flex items-center gap-2">
        <Image
          width={32}
          height={32}
          className="w-8 h-8"
          src="/icon.png"
          alt=""
        />
        <span className="text-xl font-medium">FilmHot</span>
      </Link>

      <Link className="block md:hidden" href="/search">
        <FaSearch className="text-2xl" />
      </Link>

      <div className="max-w-[500px] hidden md:block">
        <SearchBox />
      </div>
    </div>
  );
};

export default NavBar;
