import type { AuthProvider } from "firebase/auth";
import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

import Navigate from "@/components/Shared/Navigate";
import { auth } from "@/shared/firebase";
import { useStore } from "@/store";

const SignIn: NextPage = () => {
  const currentUser = useStore((state) => state.currentUser);

  const router = useRouter();
  const { redirect } = router.query;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignIn = (provider: AuthProvider) => {
    setLoading(true);

    signInWithPopup(auth, provider)
      .then((res) => {
        console.log(res.user);
      })
      .catch((err) => {
        setError(`Error: ${err.code}`);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  if (currentUser)
    return <Navigate to={typeof redirect === "string" ? redirect : "/"} />;

  return (
    <>
      <Head>
        <title key="title">Sign in</title>
        <meta property="og:title" content="FilmHot - Sign in" key="og-title" />
        <meta
          property="og:url"
          content={`${process.env.NEXT_PUBLIC_CANONICAL_URL}/sign-in`}
          key="og-url"
        />
        <meta
          property="twitter:title"
          content="FilmHot - Sign in"
          key="twitter-title"
        />
        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_CANONICAL_URL}/sign-in`}
          key="canonical-url"
        />
      </Head>
      <div className="min-h-screen w-screen bg-[url('/bg.png')] bg-no-repeat bg-cover bg-center">
        <div className="w-full min-h-screen flex justify-center items-center bg-[#00000056]">
          <div className="w-[90vw] max-w-[350px] bg-black p-10 flex flex-col items-center gap-6 rounded-xl">
            <h1 className="text-3xl font-semibold">Sign in</h1>

            {error && (
              <div className="p-3 bg-red-200 text-red-600 border border-red-400 w-full rounded">
                {error}
              </div>
            )}

            <button
              disabled={loading}
              onClick={() => handleSignIn(new GoogleAuthProvider())}
              className="flex items-center bg-white text-black p-3 gap-3 rounded-md cursor-pointer hover:brightness-90 disabled:!brightness-75 disabled:!cursor-default transition duration-300 w-full"
            >
              <Image
                width={24}
                height={24}
                className="w-6 h-6"
                src="/google.svg"
                alt=""
              />

              <span>Sign in with Google</span>
            </button>

            <button
              disabled={loading}
              onClick={() => handleSignIn(new FacebookAuthProvider())}
              className="flex items-center bg-primary text-white p-3 gap-3 rounded-md cursor-pointer hover:brightness-90 disabled:!brightness-75 disabled:!cursor-default transition duration-300 w-full"
            >
              <Image
                width={24}
                height={24}
                className="w-6 h-6"
                src="/facebook.svg"
                alt=""
              />

              <span>Sign in with Facebook</span>
            </button>
            <Link className="text-primary" href="/">
              Return home
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
