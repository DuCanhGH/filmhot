import { useRouter } from "next/router";
import { useEffect } from "react";

const RedirectToEpisode = () => {
  const router = useRouter();
  const { id } = router.query;
  useEffect(() => {
    if (router.isReady) {
      router.replace(
        {
          pathname: "/tv/[id]/[episode]",
          query: {
            id: id,
            episode: localStorage.getItem(`tv-${id}-episode`) || 1,
          },
        },
        undefined,
        {
          shallow: true,
        }
      );
    }
  }, [id, router]);
  return (
    <div className="flex flex-col min-h-screen justify-center items-center gap-4">
      {/* eslint-disable @next/next/no-img-element */}
      <img className="w-full max-w-[200px] h-auto" src="/warning.png" alt="" />
      <p className="text-xl">Redirecting to last watched episode...</p>
    </div>
  );
};

export default RedirectToEpisode;
