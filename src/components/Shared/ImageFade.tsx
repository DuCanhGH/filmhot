import classNames from "classnames";
import { FC, HTMLProps, useState } from "react";

const ImageFade: FC<HTMLProps<HTMLImageElement>> = (props) => {
  const { className, onLoad, onLoadCapture, crossOrigin, alt, ...others } = props;
  const [loaded, setLoaded] = useState(false);
  return (
    <img
      className={classNames(
        className,
        {
          "opacity-100": loaded,
          "opacity-0": !loaded,
        },
        "transition duration-200",
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
