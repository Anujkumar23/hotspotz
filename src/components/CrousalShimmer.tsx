import React from "react";
const CrousalShimmer: React.FC = () => {
  return (
    <section className="flex justify-center gap-4 ">
      {new Array(4).fill(0).map((item, index) => (
        <div
          key={index.toString()}
          className="img flex w-[200px] h-[150px] bg-gray-300 rounded-md bg-gradient-ltr bg-x-y animate-animate-ltr overflow-x-auto scroll-smooth"
        ></div>
      ))}
    </section>
  );
};

export default CrousalShimmer;
