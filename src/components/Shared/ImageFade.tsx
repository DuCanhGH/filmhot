import classNames from "classnames";
import { FC, HTMLProps, useState } from "react";

const ImageFade: FC<
  Omit<HTMLProps<HTMLImageElement>, "placeholder" | "src"> & {
    src: string;
    placeholder?: "blur" | "empty";
  }
> = (props) => {
  const { className, onLoad, onLoadCapture, crossOrigin, alt, ...others } =
    props;
  const [loaded, setLoaded] = useState(false);
  return (
    /* eslint-disable @next/next/no-img-element */
    <img
      className={classNames(
        className,
        {
          "opacity-100": loaded,
          "opacity-0": !loaded,
        },
        "transition duration-200"
      )}
      onLoad={(e) => {
        setLoaded(true);
        onLoad && onLoad(e);
      }}
      onLoadCapture={(e) => {
        setLoaded(true);
        onLoadCapture && onLoadCapture(e);
      }}
      alt={alt ?? "An image."}
      {...others}
    />
  );
};

export default ImageFade;
