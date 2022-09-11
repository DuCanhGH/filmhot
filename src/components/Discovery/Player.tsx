import { FC, Ref, useRef, useEffect } from "react";
import ReactHlsPlayer from "@ducanh2912/react-hls-player";
import { Player } from "@ducanh2912/react-tuby";

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
          return <ReactHlsPlayer playerRef={ref} src={src} loop {...others} />;
        }}
      </Player>
    </div>
  );
};

export default DiscoveryPlayer;
