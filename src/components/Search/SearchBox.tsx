import { FC, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

import { RHFInput } from "../RHFInput";
import { htmlToText } from "../../shared/utils";
import { searchKeywords } from "../../services/search";

const SearchBox: FC = () => {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const { register, handleSubmit, watch, getValues } = useForm();
  const watchSearchInput = watch("searchInput");
  const timeoutRef = useRef<any>(null);
  const navigate = useNavigate();
  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setSuggestions([]);
    if (!getValues("searchInput")) return;
    timeoutRef.current = setTimeout(async () => {
      const data = await searchKeywords(getValues("searchInput"));
      setSuggestions(data.map((item) => htmlToText(item)));
    }, 500);
  }, [watchSearchInput, getValues]);
  const handleFormSubmit = handleSubmit((data) => {
    const { searchInput } = data;
    if (searchInput) {
      navigate(`/search?q=${encodeURIComponent(searchInput)}`);
    }
  });
  return (
    <div className="relative group w-full">
      <form onSubmit={handleFormSubmit} className="relative">
        <RHFInput
          register={register}
          id="search-box-input"
          name="searchInput"
          onKeyDown={(e) => e.stopPropagation()}
          onKeyUp={(e) => e.stopPropagation()}
          onKeyPress={(e) => e.stopPropagation()}
          className="bg-transparent outline-none border border-gray-600 w-full rounded-full py-2 pl-4 pr-8"
          type="text"
          placeholder="Search..."
          autoComplete="off"
        />
        <button
          className="absolute right-2 top-1/2 -translate-y-1/2"
          type="submit"
          aria-label="Search"
        >
          <FontAwesomeIcon icon={faMagnifyingGlass} className="text-xl" />
        </button>
      </form>

      {suggestions.length > 0 && (
        <div className="absolute z-10 top-full left-0 w-full bg-dark-lighten rounded overflow-x-hidden overflow-y-auto max-h-[200px] flex-col items-stretch hidden group-focus-within:flex">
          {suggestions.map((suggestion, index) => (
            <Link key={index} to={`/search?q=${encodeURIComponent(suggestion)}`}>
              <button
                className={`text-left p-2 w-full ${
                  index !== suggestions.length - 1 ? "border-b border-gray-500" : ""
                }`}
              >
                {suggestion}
              </button>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBox;
