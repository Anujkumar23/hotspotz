"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { FaShoppingCart, FaHamburger } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { RootState } from "../GlobalRedux/store";
import { useSelector } from "react-redux";
import { GetUserfromLocalStorage, getcartItems } from "@/utils";
import { useRouter } from "next/navigation";
import { UseAuthProvider } from "@/firebase/auth";
import ProfileComponent from "./ProfileComponent";

const Title: React.FC = () => {
  return (
    <Link href="/">
      <Image
        src="/logo.png"
        alt="app-logo"
        width={100}
        height={1000}
        className="xs:w-[80px] xs:h-[80px] lg:w-[100px] lg:h-[100px]"
      />
    </Link>
  );
};

const Header: React.FC = () => {
  const user = GetUserfromLocalStorage();
  const { signOutUser } = UseAuthProvider();
  const router = useRouter();
  const cartItems = useSelector((state: RootState) => state.cart.value);
  const cartItemsLength = getcartItems(cartItems);
  const [showMenu, setShowMenu] = useState(false);

  const handleCart = () => {
    router.push("/cart");
    setShowMenu(false);
  };
  const handleContact = () => {
    router.push("/contact");
    setShowMenu(false);
  };
  const handleAbout = () => {
    router.push("/about");
    setShowMenu(false);
  };
  const handleHome = () => {
    router.push("/");
    setShowMenu(false);
  };

  const handleMenuClick = () => {
    setShowMenu(true);
  };
  const handleCloseMenu = () => {
    setShowMenu(false);
  };

  const handleSignOut = async () => {
    await signOutUser();
    router.push("/login");
  };

  return (
    <>
      <header className="flex  justify-between  bg-[#1b1b1b] shadow-header xs:w-full sm:py-2 sticky top-0 z-20 min-h-[100px]">
        <Title />

        <section className="px-10 xs:hidden lg:flex">
          <ul className="flex items-center gap-10 sm:gap-6 text-white lg:text-lg md:text-base sm:text-sm xs:text-xs ">
            <li className="hover:text-blue-500 hover:underline active:underline ">
              <Link href="/">Home</Link>
            </li>
            <li className="hover:text-blue-500 hover:underline active:text-blue-500">
              <Link href="/about">About</Link>
            </li>
            <li className="hover:text-blue-500 hover:underline active:underline">
              <Link href="/contact">Contact</Link>
            </li>
            <li className="hover:text-blue-500 ">
              <Link href="/cart">
                <span className="relative inline-block">
                  <FaShoppingCart className="sm:text-xs md:text-sm lg:text-lg" />
                  <path
                    d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z"
                    clipRule="evenodd"
                    fillRule="evenodd"
                  ></path>
                  {cartItemsLength > 0 ? (
                    <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                      {cartItemsLength}
                    </span>
                  ) : null}
                </span>
              </Link>
            </li>

            {user && <ProfileComponent />}
          </ul>
        </section>

        <section className="xs:flex lg:hidden  mr-6 text-white sm:text-2xl items-center justify-end">
          <button onClick={handleMenuClick}>
            <FaHamburger />
          </button>
        </section>
        {showMenu ? (
          <div
            className={` bg-white top-0  right-0 z-10 ${
              showMenu ? "w-full animate-transition-width  " : "w-0 h-full"
            } min-h-screen  overflow-hidden  flex justify-between  fixed  `}
          >
            <button
              onClick={handleCloseMenu}
              className="absolute top-4 right-4"
            >
              <MdCancel />
            </button>
            <ul className="py-2 text-lg text-gray-700 dark:text-gray-200  divide-y divide-gray-100 rounded-lg shadow w-full mt-10">
              <li className="block px-4 py-2 hover:bg-gray-100 w-full dark:hover:bg-gray-600 dark:hover:text-white">
                <button onClick={handleHome}>Home</button>
              </li>
              <li className=" block px-4 py-2 hover:bg-gray-100 w-full dark:hover:bg-gray-600 dark:hover:text-white">
                <button onClick={handleAbout}>About</button>
              </li>
              <li className=" block px-4 py-2 hover:bg-gray-100 w-full dark:hover:bg-gray-600 dark:hover:text-white">
                <button onClick={handleContact}>Contact</button>
              </li>
              <li className=" block px-4 py-2 hover:bg-gray-100 w-full dark:hover:bg-gray-600 dark:hover:text-white">
                <button onClick={handleCart}>Cart</button>
              </li>
              <li className="block px-4 py-2 hover:bg-gray-100 w-full dark:hover:bg-gray-600 dark:hover:text-white">
                {user ? (
                  <button onClick={handleSignOut}>Sign out</button>
                ) : (
                  <button
                    onClick={() => {
                      router.push("/login");
                    }}
                  >
                    Login
                  </button>
                )}
              </li>
            </ul>
          </div>
        ) : null}
      </header>

      {/* <header className="sm:flex  justify-between items-center  bg-[#1b1b1b] shadow-header min-w-[420px] sm:py-2 md:hidden lg:hidden xl:hidden">
        <Title />
        <section className="  mr-6 text-white sm:text-2xl">
          <button onClick={handleMenuClick}>
            <FaHamburger />
          </button>
        </section>
        
      </header> */}
    </>
  );
};

export default Header;
