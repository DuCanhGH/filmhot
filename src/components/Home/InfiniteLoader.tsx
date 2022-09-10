import { FC, Ref } from "react";
import Skeleton from "../Shared/Skeleton";
import Slider from "./SkeletonSlider";

const InfiniteLoader: FC<{ forwardedRef: Ref<HTMLDivElement> }> = ({ forwardedRef }) => {
  return (
    <>
      <Skeleton className="my-8 h-6 w-full max-w-[200px]" />
      <div ref={forwardedRef} className="overflow-hidden">
        <Slider />
      </div>
    </>
  );
};

export default InfiniteLoader;
