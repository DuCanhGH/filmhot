import Link from "next/link";
import { useRouter } from "next/router";
import { type FC, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { FaSearch } from "react-icons/fa";

import { RHFInput } from "@/components/Shared/RHFInput";
import { searchKeywords } from "@/services/search";
import { htmlToText } from "@/shared/utils";

const SearchBox: FC = () => {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const { register, handleSubmit, watch, getValues } = useForm();
  const watchSearchInput = watch("searchInput");
  const timeoutRef = useRef<any>(null);
  const router = useRouter();
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
      router.push(`/search?q=${encodeURIComponent(searchInput)}`);
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
          <FaSearch className="text-xl" />
        </button>
      </form>

      {suggestions.length > 0 && (
        <div className="absolute z-10 top-full left-0 w-full rounded overflow-x-hidden overflow-y-auto max-h-[200px] flex-col items-stretch hidden group-focus-within:flex">
          {suggestions.map((suggestion, index) => (
            <Link
              key={index}
              href={`/search?q=${encodeURIComponent(suggestion)}`}
              className="bg-dark-lighten-100 hover:bg-dark-lighten-200 active:bg-dark-lighten-200 transition-colors"
            >
              <button
                className={`text-left p-2 w-full ${
                  index !== suggestions.length - 1
                    ? "border-b border-gray-500"
                    : ""
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
