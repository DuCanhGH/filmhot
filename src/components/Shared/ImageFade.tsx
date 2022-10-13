import type { FC } from "react";
import {
  type LazyLoadImageProps,
  LazyLoadImage,
} from "react-lazy-load-image-component";

import { resizeImage } from "@/shared/constants";
import type { RequireFields } from "@/shared/utils_types";

const ImageFade: FC<RequireFields<LazyLoadImageProps, "src">> = ({
  src,
  width,
  height,
  ...props
}) => {
  return (
    <LazyLoadImage
      {...props}
      src={resizeImage(src, "" + width, "" + height)}
      width={width}
      height={height}
      effect="opacity"
    />
  );
};

export default ImageFade;
