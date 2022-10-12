import dynamic from "next/dynamic";
import { type FC, Ref, Suspense, useEffect, useRef } from "react";

const Player = dynamic(
  () =>
    import("@ducanh2912/react-tuby").then((a) => ({
      default: a.Player,
    })),
  {
    suspense: true,
  }
);
const ReactHlsPlayer = dynamic(() => import("@ducanh2912/react-hls-player"), {
  suspense: true,
});

const DiscoveryPlayer: FC<{
  forwardedRef: Ref<HTMLDivElement>;
  forwardedInView: boolean;
  src: string;
}> = (props) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { forwardedRef, forwardedInView, src } = props;
  useEffect(() => {
    if (videoRef.current) {
      if (forwardedInView) {
        videoRef.current.play();
      }
      if (!forwardedInView) {
        videoRef.current.pause();
      }
    }
  }, [forwardedInView]);
  return (
    <div ref={forwardedRef} className="overflow-hidden pt-[40%] pb-[40%]">
      <Suspense fallback={<></>}>
        <Player
          playerKey="ducanh-filmhot-discovery"
          playerRef={videoRef}
          primaryColor="#0D90F3"
          src={src}
          preserve={{
            watchTime: false,
          }}
        >
          {(ref, props) => {
            const { src, ...others } = props;
            return (
              <ReactHlsPlayer playerRef={ref} src={src} loop {...others} />
            );
          }}
        </Player>
      </Suspense>
    </div>
  );
};

export default DiscoveryPlayer;
