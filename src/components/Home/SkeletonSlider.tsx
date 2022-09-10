import { Swiper, SwiperSlide } from "swiper/react";
import { FC } from "react";
import { Navigation } from "swiper";
import classNames from "classnames";

import Skeleton from "../Shared/Skeleton";

const Slider: FC = () => {
  return (
    <Swiper modules={[Navigation]} navigation slidesPerView="auto" slidesPerGroupAuto>
      {[...new Array(Math.ceil(window.innerWidth / 200))].map((_, index) => (
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
