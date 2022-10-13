import { useRouter } from "next/router";
import type { FC } from "react";
import { useEffect } from "react";

interface NavigateProps {
  to: string;
}

const Navigate: FC<NavigateProps> = ({ to }) => {
  const router = useRouter();

  useEffect(() => {
    router.push(to);
  }, [router, to]);

  return <></>;
};

export default Navigate;
