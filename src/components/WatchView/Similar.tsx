import Image from "next/future/image";
import Link from "next/link";
import { FC } from "react";

import ImageFade from "@/components/Shared/ImageFade";
import Skeleton from "@/components/Shared/Skeleton";
import { BANNED_IDS, resizeImage } from "@/shared/constants";
import { DetailType } from "@/shared/types";

interface SimilarProps {
  data: DetailType | undefined;
}

const Similar: FC<SimilarProps> = ({ data }) => {
  return (
    <div className="flex-shrink-0 md:w-[300px]">
      {data ? (
        <>
          {data?.refList &&
            data.refList.filter((item) => item.id !== data.id).length > 0 && (
              <>
                <h1 className="text-2xl my-3">In the series</h1>
                <div className="max-h-[60vh] overflow-x-hidden overflow-y-auto flex flex-col items-stretch gap-2">
                  {data?.refList
                    .filter(
                      (item) =>
                        item.id !== data.id && !BANNED_IDS.includes(+item.id)
                    )
                    .map((ref) => (
                      <Link
                        key={ref.id}
                        href={`/${ref.category === 0 ? "movie" : "tv"}/${
                          ref.id
                        }`}
                        className="flex gap-3 pr-2 hover:brightness-[85%] transition duration-300"
                      >
                        <div className="flex-shrink-0 h-[100px] w-[70px]">
                          <ImageFade
                            className="h-full w-full object-cover"
                            src={resizeImage(ref.coverVerticalUrl, "", "100")}
                            alt=""
                          />
                        </div>
                        <div className="my-2 flex-grow">
                          <p>{ref.name}</p>
                        </div>
                      </Link>
                    ))}
                </div>
              </>
            )}

          {data?.likeList && data.likeList.length > 0 && (
            <>
              <h1 className="text-2xl my-3">Similar to this</h1>
              <div className="max-h-[60vh] overflow-x-hidden overflow-y-auto flex flex-col items-stretch gap-2">
                {data?.likeList
                  .filter((a) => !BANNED_IDS.includes(+a.id))
                  .map((like) => (
                    <Link
                      key={like.id}
                      href={`/${like.category === 0 ? "movie" : "tv"}/${
                        like.id
                      }`}
                      className="flex gap-3 pr-2 hover:brightness-[85%] transition duration-300"
                    >
                      <div className="flex-shrink-0 h-[100px] w-[70px]">
                        <ImageFade
                          className="h-full w-full object-cover"
                          src={resizeImage(like.coverVerticalUrl, "", "100")}
                          alt=""
                        />
                      </div>
                      <div className="my-2 flex-grow">
                        <p>{like.name}</p>

                        <div className="flex items-center gap-2">
                          <Image
                            width={16}
                            height={16}
                            className="w-4 h-4"
                            src="/star.png"
                            alt=""
                          />
                          <p>{like.score?.toFixed(1)}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
              </div>
            </>
          )}
        </>
      ) : (
        <>
          {[...new Array(2)].map((_, index) => (
            <div key={index}>
              <Skeleton className="w-[60%] h-7 my-6" />
              <div
                key={index}
                className="max-h-[60vh] overflow-x-hidden overflow-y-auto flex flex-col gap-3"
              >
                {[...new Array(10)].map((_, index) => (
                  <div key={index} className="flex gap-3 pr-2">
                    <Skeleton className="h-[100px] w-[70px] flex-shrink-0" />

                    <div className="flex-grow">
                      <Skeleton className="w-full h-4" />
                      <Skeleton className="w-[70%] h-4 mt-3" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default Similar;
