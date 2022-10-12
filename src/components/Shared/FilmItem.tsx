import Link from "next/link";
import { FC } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

import { resizeImage } from "@/shared/constants";

interface Props {
  item: {
    id: string;
    name: string;
    coverVerticalUrl: string;
    category: number;
  };
}

export const FilmItem: FC<Props> = (props) => {
  const { item } = props;
  const lastWatchedEp =
    typeof window === "object"
      ? localStorage.getItem(`tv-${item.id}-episode`) || 1
      : 1;
  return (
    <Link
      title={item.name}
      href={
        item.category === 0
          ? `/movie/${item.id}`
          : `/tv/${item.id}/${lastWatchedEp}`
      }
      className="relative h-0 pb-[163%] bg-dark-lighten-100 rounded overflow-hidden group"
    >
      <div className="absolute top-0 left-0 w-full h-full flex flex-col items-stretch">
        <div className="relative w-full h-0 pb-[140%] flex-shrink-0 group-hover:brightness-[80%] transition duration-300">
          <LazyLoadImage
            effect="opacity"
            className="absolute top-0 left-0 w-full h-full object-cover"
            src={resizeImage(item.coverVerticalUrl, "250")}
            alt=""
          />
        </div>

        <div className="flex-grow flex items-center">
          <h1 className="w-full whitespace-nowrap overflow-hidden text-ellipsis px-2 group-hover:text-primary transition duration-300">
            {item.name}
          </h1>
        </div>
      </div>
    </Link>
  );
};
