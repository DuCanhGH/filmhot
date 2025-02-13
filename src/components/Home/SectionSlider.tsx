import Link from "next/link";
import type { FC } from "react";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import ImageFade from "@/components/Shared/ImageFade";
import { IMAGE_CARD_SIZE } from "@/shared/constants";

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
      spaceBetween={30}
    >
      {images.map((item) => (
        <SwiperSlide
          style={{ width: IMAGE_CARD_SIZE[coverType || 1].width }}
          key={item.image}
        >
          <Link href={item.link} prefetch={false}>
            <div className="rounded-lg overflow-hidden bg-dark-lighten-100 group">
              <ImageFade
                style={{
                  width: IMAGE_CARD_SIZE[coverType || 1].width,
                  height: IMAGE_CARD_SIZE[coverType || 1].height,
                }}
                className="group-hover:brightness-75 transition duration-300 object-cover"
                src={item.image}
                width={IMAGE_CARD_SIZE[coverType || 1].width}
                height={IMAGE_CARD_SIZE[coverType || 1].height}
                alt=""
              />
              <h1 className="group-hover:text-primary transition duration-300 pb-1 px-2 m-0 text-lg max-w-full whitespace-nowrap overflow-hidden text-ellipsis">
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
