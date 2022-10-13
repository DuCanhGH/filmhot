import classNames from "classnames";
import Link from "next/link";
import type { FC } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import { convertWebp, IMAGE_CARD_SIZE } from "@/shared/constants";

interface SliderProps {
  images: {
    title: string;
    image: string;
    link: string;
  }[];
  coverType: number;
}

const Slider: FC<SliderProps> = ({ images, coverType }) => {
  return (
    <Swiper
      modules={[Navigation]}
      navigation
      slidesPerView="auto"
      slidesPerGroupAuto
    >
      {images.map((item, index) => (
        <SwiperSlide
          style={{ width: IMAGE_CARD_SIZE[coverType || 1].width }}
          key={item.image}
          className={classNames({
            "!ml-[30px]": index !== 0,
          })}
        >
          <Link href={item.link} prefetch={false}>
            <div className="block rounded-lg overflow-hidden bg-dark-lighten-100 group">
              <LazyLoadImage
                style={{
                  width: IMAGE_CARD_SIZE[coverType || 1].width,
                  height: IMAGE_CARD_SIZE[coverType || 1].height,
                }}
                className="group-hover:brightness-75 transition duration-300 object-cover"
                src={convertWebp(item.image)}
                width={IMAGE_CARD_SIZE[coverType || 1].width}
                height={IMAGE_CARD_SIZE[coverType || 1].height}
                effect="opacity"
                alt=""
              />
              <h1 className="group-hover:text-primary transition duration-300 py-1 px-2 m-0 text-lg max-w-full whitespace-nowrap overflow-hidden text-ellipsis">
                {item.title}
              </h1>
            </div>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Slider;
