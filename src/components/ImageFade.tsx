import { FC, HTMLProps, useState } from "react";

const ImageFade: FC<HTMLProps<HTMLImageElement>> = (props) => {
  const { className, onLoad, crossOrigin, ...others } = props;
  const [loaded, setLoaded] = useState(false);

  return (
    <img
      className={`${loaded ? "opacity-100" : "opacity-0"} transition duration-300 ${className}`}
      onLoad={(e) => {
        setLoaded(true);
        onLoad && onLoad(e);
      }}
      {...others}
    />
  );
};

export default ImageFade;
