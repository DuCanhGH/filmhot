import { FC } from "react";
import { FaRedoAlt } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { KeyedMutator } from "swr";

const Error: FC = () => {
  const location = useLocation();
  return (
    <div className="flex flex-col min-h-screen justify-center items-center gap-4">
      <img className="w-full max-w-[200px] h-auto" src="/error.png" alt="" />
      <p className="text-xl">Something went wrong.</p>
      <button className="text-primary" onClick={() => window.location.reload()}>
        Reload page
      </button>
      {location.pathname !== "/" && (
        <Link className="text-primary" to="/">
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
