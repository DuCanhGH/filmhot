import { FC } from "react";
import { Link, useLocation } from "react-router-dom";

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

export default Error;
