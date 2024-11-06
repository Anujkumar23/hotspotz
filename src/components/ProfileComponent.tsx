"use-client";
import { UseAuthProvider } from "@/firebase/auth";
import { GetUserfromLocalStorage } from "@/utils";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

const ProfileComponent: React.FC = () => {
  const user = GetUserfromLocalStorage();
  const { signOutUser } = UseAuthProvider();
  const router = useRouter();
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const dropDownDivRef = useRef<HTMLDivElement | null>(null);
  const timerId = useRef<ReturnType<typeof setInterval> | null>(null);

  const handleLogin = () => {
    router.push("/login");
  };

  const handleSignOut = async () => {
    await signOutUser();
    router.push("/login");
  };

  const onMenuEnter = () => {
    if (timerId.current) {
      clearTimeout(timerId.current);
    }
    setShowProfileMenu(true);
  };
  const onMenuLeave = () => {
    timerId.current = setTimeout(() => {
      setShowProfileMenu(false);
    }, 500);
  };

  useEffect(() => {
    const DivRef = dropDownDivRef.current;
    if (DivRef) {
      DivRef.addEventListener("mouseenter", onMenuEnter);
      DivRef.addEventListener("mouseleave", onMenuLeave);
    }

    return () => {
      if (DivRef) {
        DivRef.removeEventListener("mouseenter", onMenuEnter);
        DivRef.removeEventListener("mouseleave", onMenuLeave);
      }
    };
  });

  return (
    <>
      {user && user.email ? (
        <div ref={dropDownDivRef} className="flex ">
          <button
            id="dropdownDefaultButton"
            data-dropdown-toggle="dropdown"
            className="text-white  font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center relative"
            type="button"
          >
            {user.displayName ?? user.email}
            <svg
              className="w-4 h-4 ml-2"
              aria-hidden="true"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
          </button>
          {showProfileMenu ? (
            <div
              id="dropdown"
              className="z-10  bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 absolute top-20 right-3"
            >
              <ul
                className="py-2 text-sm text-gray-700 dark:text-gray-200"
                aria-labelledby="dropdownDefaultButton"
              >
                <li>
                  <button className="block px-4 py-2 w-full hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                    Settings
                  </button>
                </li>
                <hr />

                <li>
                  <button
                    onClick={handleSignOut}
                    className="block px-4 py-2 hover:bg-gray-100 w-full dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Sign out
                  </button>
                </li>
              </ul>
            </div>
          ) : null}
        </div>
      ) : (
        <div>
          <button
            onClick={handleLogin}
            className="md:px-3 md:py-2 md:text-base border lg:px-3 lg:py-2 lg:text-lg border-red-500   rounded-md shadow-md shadow-red-500/20 hover:bg-red-600 sm:px-2 sm:py-2 sm:text-sm xs:px-1 xs:py-1 xs:text-xs "
          >
            Login
          </button>
        </div>
      )}
    </>
  );
};
export default ProfileComponent;
