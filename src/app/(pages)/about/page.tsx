import Image from "next/image";
import React from "react";
import { Montserrat } from "next/font/google";
import { NextPage } from "next";

export const metadata = {
  title: "About",
};

const montserrat = Montserrat({
  weight: ["700"],
  style: "normal",
  subsets: ["latin"],
});

const About: NextPage = () => {
  return (
    <section className={montserrat.className}>
      <section className="flex justify-center items-center  flex-wrap  mx-auto min-w-[400px] ">
        <section className="left  p-3 mt-7  ">
          <h1 className="text-6xl m-3 leading-normal text-center">
            Welcome to
            <br />
            The world of
            <br />
            <span className=" text-white bg-[#d97919] rounded-md  p-2  ">
              Tasty & fresh food
            </span>
          </h1>
          <h4 className="pt-2 text-xl italic text-center  ">
            Better you will feel if you eat a Hot
            <span className="text-[#d97919]">Spot</span> fresh meal
          </h4>
        </section>
        <section className="right mt-10 p-2 mx-3 mb-3">
          <Image
            src={"/burger-image.png"}
            alt="burger-image"
            width={500}
            height={500}
          />
        </section>
      </section>
    </section>
  );
};

export default About;
