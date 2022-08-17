import { FC } from "react";
import { Link } from "react-router-dom";
import SearchBox from "../Search/SearchBox";
import { FaSearch } from "react-icons/fa";

const NavBar: FC = () => {
  return (
    <div className="flex justify-between items-center my-7">
      <Link to="/" className="flex items-center gap-2">
        <img className="w-8 h-8" src="/icon.png" alt="" />
        <span className="text-xl font-medium">FilmHot</span>
      </Link>

      <Link className="block md:hidden" to="/search">
        <FaSearch className="text-2xl" />
      </Link>

      <div className="max-w-[500px] hidden md:block">
        <SearchBox />
      </div>
    </div>
  );
};

export default NavBar;
