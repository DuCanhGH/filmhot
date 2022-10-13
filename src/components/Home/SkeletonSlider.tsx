import classNames from "classnames";
import { type FC, useEffect, useState } from "react";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import Skeleton from "@/components/Shared/Skeleton";

const Slider: FC = () => {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    setWidth(window.innerWidth);
  }, []);
  return (
    <Swiper
      modules={[Navigation]}
      navigation
      slidesPerView="auto"
      slidesPerGroupAuto
    >
      {[...new Array(Math.ceil(width / 200))].map((_, index) => (
        <SwiperSlide
          className={classNames("!w-[175px]", {
            "!ml-[30px]": index !== 0,
          })}
          key={index}
        >
          <Skeleton className="w-[175px] h-[246px] rounded-xl" />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Slider;
