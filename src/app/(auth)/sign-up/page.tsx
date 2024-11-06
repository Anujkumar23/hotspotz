"use client";
import Link from "next/link";
import React from "react";
import { useState } from "react";
import { FaLock } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { UseAuthProvider } from "@/firebase/auth";
import ErrorComponent from "../../../components/Error";

const SignUp = () => {
  const router = useRouter();
  const { signUp } = UseAuthProvider();
  const [error, setError] = useState<Error | null>(null);
  const { signInWithGoogle } = UseAuthProvider();

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const displayName = formData.get("username") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    try {
      await signUp(email, password, displayName);
      router.push("/login");
    } catch (e) {
      if (e instanceof Error) {
        setError(e);
      }
    }
  };

  const handleSigninWithGoogle = async () => {
    try {
      await signInWithGoogle();
      router.push("/");
    } catch (e) {
      if (e instanceof Error) {
        setError(e);
      }
    }
  };
  if (error) {
    return <ErrorComponent error={error} />;
  }

  return (
    // <section className=" flex justify-center items-center flex-col  mt-5 min-w-[400px]">
    //   <h1 className="font-bold text-3xl mb-2">Signup</h1>
    //   <div className="bg-blue-500 p-4 rounded-[100%] ">
    //     <FaLock style={{ fontSize: "40px" }} />
    //   </div>

    //   <section className=" grid w-2/5  xs:justify-center    ">
    //     <form
    //       action=""
    //       onSubmit={(e) => handleSignup(e)}
    //       className="grid gap-2 "
    //     >
    //       <label htmlFor="email" className="font-semibold">
    //         Username
    //       </label>
    //       <input
    //         className="p-2 border border-gray-600 rounded"
    //         type="text"
    //         name="username"
    //         id="text"
    //         placeholder="Enter Username"
    //         autoComplete="off"
    //         required
    //       />
    //       <label htmlFor="email" className="font-semibold">
    //         Email
    //       </label>
    //       <input
    //         className="p-2 border border-gray-600 rounded"
    //         type="email"
    //         name="email"
    //         id="email"
    //         placeholder="Enter Email"
    //         autoComplete="off"
    //         required
    //       />

    //       <label htmlFor="password">Password</label>
    //       <input
    //         className="p-2 border border-gray-600 rounded "
    //         type="password"
    //         name="password"
    //         id="password"
    //         placeholder="Enter Password"
    //         autoComplete="off"
    //         required
    //       />
    //       <button
    //         className="p-2 text-white bg-blue-500 hover:bg-blue-600 rounded-md mt-2"
    //         type="submit"
    //       >
    //         SIGNUP
    //       </button>
    //       <p className="mb-0 mt-2 pt-1 text-sm font-semibold">
    //         Already registered?
    //         <Link href="/login" className="text-blue-500">
    //           login
    //         </Link>
    //       </p>
    //     </form>
    //   </section>
    // </section>

    <section className=" flex justify-center items-center flex-col  mt-5 min-w-[400px">
      <h1 className="font-bold text-3xl mb-2">Signup</h1>
      <div className="bg-blue-500 p-4 rounded-[100%] ">
        <FaLock style={{ fontSize: "40px" }} />
      </div>

      <section className=" grid w-2/5 xs:justify-center   ">
        <form
          action=""
          onSubmit={(e) => handleSignup(e)}
          className="grid gap-2  "
        >
          <label htmlFor="username" className="font-semibold">
            Username
          </label>
          <input
            className="p-2 border border-gray-600 rounded"
            type="text"
            name="username"
            id="text"
            placeholder="Enter Username"
            autoComplete="off"
            required
          />
          <label htmlFor="email" className="font-semibold">
            Email
          </label>
          <input
            className="p-2 border border-gray-600 rounded "
            type="email"
            name="email"
            id="email"
            placeholder="Enter Email"
            autoComplete="off"
            required
          />

          <label htmlFor="password">Password</label>
          <input
            className="p-2 border border-gray-600 rounded  "
            type="password"
            name="password"
            id="password"
            placeholder="Enter Password"
            autoComplete="off"
            required
          />
          <button
            className="p-2 text-white bg-blue-500 hover:bg-blue-600 rounded-md mt-2"
            type="submit"
          >
            SIGNUP
          </button>
        </form>
        <section className="grid grid-cols-3 text-gray-500 mt-5 items-center  xs:w-[70vw] xs:justify-center ">
          <hr className="border-gray-500 " />
          <p className="text-center text-sm">OR</p>
          <hr className="border-gray-500" />
        </section>

        <button
          className="py-2  bg-white my-5  text-[#002D74] lg:w-full rounded-xl border xs:w-[70vw]"
          onClick={handleSigninWithGoogle}
        >
          <section className="flex justify-center items-center text-sm  xs:  ">
            <svg
              className="mr-3"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              width="25px"
            >
              <path
                fill="#FFC107"
                d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.Name373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
              />
              <path
                fill="#FF3D00"
                d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
              />
              <path
                fill="#4CAF50"
                d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
              />
              <path
                fill="#1976D2"
                d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
              />
            </svg>
            <h1 className="">login with google</h1>
          </section>
        </button>
        <p className="mb-0 mt-2 pt-1 text-sm font-semibold">
          Already registered?
          <Link href="/login" className="text-blue-500">
            login
          </Link>
        </p>
      </section>
    </section>
  );
};

export default SignUp;
