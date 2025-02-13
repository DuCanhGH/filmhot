import { signOut } from "firebase/auth";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import type { FC } from "react";
import type { IconType } from "react-icons";
import {
  FaBookmark,
  FaCompass,
  FaDesktop,
  FaHistory,
  FaHome,
  FaSearch,
  FaSignInAlt,
  FaSignOutAlt,
} from "react-icons/fa";

import { resizeImage } from "@/shared/constants";
import { auth } from "@/shared/firebase";
import { useStore } from "@/store";

interface SidebarProps {
  sidebarActive: boolean;
  setSidebarActive: (state: boolean) => void;
}

interface SidebarLinkType {
  label: string;
  link: string;
  icon_class: IconType;
}

const sidebar_links: SidebarLinkType[] = [
  {
    label: "Home",
    link: "/",
    icon_class: FaHome,
  },
  {
    label: "Discovery",
    link: "/discovery",
    icon_class: FaCompass,
  },
  {
    label: "Explore",
    link: "/explore",
    icon_class: FaDesktop,
  },
  {
    label: "History",
    link: "/history",
    icon_class: FaHistory,
  },
  {
    label: "Bookmarks",
    link: "/bookmarks",
    icon_class: FaBookmark,
  },
];

const Sidebar: FC<SidebarProps> = ({ sidebarActive, setSidebarActive }) => {
  const router = useRouter();

  const currentUser = useStore((state) => state.currentUser);

  const handleSignOut = () => {
    signOut(auth);
  };

  return (
    <>
      <div
        className={`flex-shrink-0 sm:sticky left-auto right-full sm:!right-0 sm:!left-0 fixed top-0 flex flex-col items-stretch py-10 pl-5 xl:pl-10 pr-0 w-[90vw] max-w-[288px] sm:max-w-none sm:w-16 xl:w-72 border-r border-gray-800 h-screen overflow-y-auto z-10 bg-dark sm:bg-transparent sm:!translate-x-0 transition-all duration-500 ${
          sidebarActive ? "translate-x-full" : "translate-x-0"
        }`}
      >
        <Link href="/" className="flex gap-2 items-center" aria-label="Filmhot">
          <Image
            width={24}
            height={24}
            className="w-6 h-6"
            src="/icon.png"
            alt=""
          />
          <p
            className="font-semibold text-xl block sm:hidden xl:block"
            aria-hidden
          >
            FilmHot
          </p>
        </Link>

        <div className="mt-0 sm:mt-4 xl:mt-0 block sm:flex flex-col gap-0 sm:gap-4 xl:block xl:gap-0">
          <p className="text-gray-400 uppercase mt-10 mb-4 block sm:hidden xl:block">
            Menu
          </p>

          <div className="flex flex-col items-stretch gap-3">
            {sidebar_links.map((link) => {
              const Component = link.icon_class;
              return (
                <Link
                  href={link.link}
                  className={`flex items-center gap-2 transition ${
                    router.pathname === link.link
                      ? "text-primary border-r-4 border-primary hover:brightness-125"
                      : "text-gray-400 hover:text-gray-300"
                  }`}
                  aria-label={link.label}
                  key={`${link.label}-link-sidebar-component`}
                >
                  <Component className="text-xl w-[24px]" />
                  <p className="block sm:hidden xl:block" aria-hidden>
                    {link.label}
                  </p>
                </Link>
              );
            })}
            <Link
              href="/search"
              className={`md:!hidden flex items-center gap-2 transition ${
                router.pathname === "/search"
                  ? "text-primary border-r-4 border-primary hover:brightness-125"
                  : "text-gray-400 hover:text-gray-300"
              }`}
              aria-label="Search"
            >
              <FaSearch className="text-xl w-[24px]" />
              <p className="block sm:hidden xl:block" aria-hidden>
                Search
              </p>
            </Link>
          </div>

          <p className="text-gray-400 uppercase mt-10 mb-4 block sm:hidden xl:block">
            Personal
          </p>

          {!currentUser ? (
            <Link
              href={`/sign-in?redirect=${encodeURIComponent(router.pathname)}`}
              className="flex items-center cursor-pointer gap-2 transition text-gray-400 hover:text-gray-300"
              aria-label="Sign in"
            >
              <FaSignInAlt className="text-xl w-[24px]" />
              <p className="block sm:hidden xl:block" aria-hidden>
                Sign in
              </p>
            </Link>
          ) : (
            <div className="flex flex-col items-stretch gap-3">
              <div className="flex gap-2 items-center">
                <Image
                  width={24}
                  height={24}
                  className="w-[24px] h-[24px] rounded-full"
                  src={resizeImage(currentUser.photoURL, "24", "24")}
                  alt=""
                />

                <p className="text-gray-400 block sm:hidden xl:block">
                  {currentUser.displayName}
                </p>
              </div>
              <button
                onClick={handleSignOut}
                className="flex items-center cursor-pointer gap-2 transition text-gray-400 hover:text-gray-300"
              >
                <FaSignOutAlt className="text-xl w-[24px]" />
                <p className="block sm:hidden xl:block">Sign out</p>
              </button>
            </div>
          )}
        </div>
      </div>
      <button
        onClick={() => setSidebarActive(false)}
        aria-label="Close sidebar"
        className={`bg-[#00000080] z-[5] fixed top-0 left-0 w-full h-full transition-all duration-500 sm:!opacity-0 ${
          sidebarActive ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      />
    </>
  );
};

export default Sidebar;
