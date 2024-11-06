import React from "react";

const ShimmerMenu: React.FC = () => {
  return (
    <>
      {new Array(5).fill(0).map((item, index) => (
        <section
          key={index.toString()}
          className="flex justify-center items-center "
        >
          <section className=" w-[100%]  border-b-2  flex justify-between m-2  xs:flex-col lg:flex-row   ">
            <section className="left flex flex-col w-[100%]   p-2">
              <div className="title h-4 w-[30%]  m-1 bg-gray-400 rounded-md bg-gradient-ltr bg-x-y animate-animate-ltr"></div>
              <div className="price h-4 w-[20%]  m-1  bg-gray-400 rounded-md bg-gradient-ltr bg-x-y animate-animate-ltr"></div>
              <div className="des h-4 w-[40%]  m-1  bg-gray-400 rounded-md bg-gradient-ltr bg-x-y animate-animate-ltr"></div>
            </section>
            <section className="right flex flex-col justify-center items-center p-2 ">
              <section className="img w-[100px] h-[100px] bg-gray-400 p-2 rounded-md bg-gradient-ltr bg-x-y animate-animate-ltr "></section>
              <section className="button h-7  w-10 bg-gray-400 m-2 p-2 rounded-md bg-gradient-ltr bg-x-y animate-animate-ltr "></section>
            </section>
          </section>
        </section>
      ))}
    </>
  );
};

export default ShimmerMenu;
