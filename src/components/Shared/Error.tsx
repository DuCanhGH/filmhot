import Link from "next/link";
import { useRouter } from "next/router";
import { FC } from "react";
import { FaRedoAlt } from "react-icons/fa";
import { KeyedMutator } from "swr";

const Error: FC = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col min-h-screen justify-center items-center gap-4">
      {/* eslint-disable @next/next/no-img-element */}
      <img className="w-full max-w-[200px] h-auto" src="/error.png" alt="" />
      <p className="text-xl">Something went wrong.</p>
      <button className="text-primary" onClick={() => window.location.reload()}>
        Reload page
      </button>
      {router.pathname !== "/" && (
        <Link className="text-primary" href="/">
          Return home
        </Link>
      )}
    </div>
  );
};

interface EWRProps<T = unknown> {
  mutate: KeyedMutator<T>;
}

type EWRFCType<T = any> = FC<EWRProps<T>>;

export const ErrorWithRetry: EWRFCType = (props) => {
  const { mutate } = props;
  return (
    <div className="flex justify-center w-full gap-2">
      <p className="text-center text-red-600">An error occurred</p>
      <button
        className="text-primary w-fit h-fit flex items-center"
        onClick={() => {
          mutate();
        }}
      >
        <FaRedoAlt aria-hidden className="text-xl w-[24px]" />
        <p className="block">Retry</p>
      </button>
    </div>
  );
};

export default Error;
