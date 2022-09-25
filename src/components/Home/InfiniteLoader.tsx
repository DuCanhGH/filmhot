import { forwardRef } from "react";

import Skeleton from "../Shared/Skeleton";
import Slider from "./SkeletonSlider";

const InfiniteLoader = forwardRef<HTMLDivElement>((_props, ref) => {
  return (
    <>
      <Skeleton className="my-8 h-6 w-full max-w-[200px]" />
      <div ref={ref} className="overflow-hidden">
        <Slider />
      </div>
    </>
  );
});

export default InfiniteLoader;
