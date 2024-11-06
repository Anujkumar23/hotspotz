import React from "react";
const Shimmer: React.FC = () => {
  return (
    <section className="flex justify-center gap-4 flex-wrap">
      {new Array(8).fill(0).map((item, index) => (
        <section
          key={index.toString()}
          className="card  w-[220px] h-[300px]  p-2  border rounded-md mt-5 mb-5 shadow-custom   "
        >
          <div className="img w-[200px] h-[150px] bg-gray-300 rounded-md bg-gradient-ltr bg-x-y animate-animate-ltr"></div>

          <section className="title w-[50%] h-5 bg-gray-300 m-2 rounded-md bg-gradient-ltr bg-x-y animate-animate-ltr"></section>
          <section className="description w-[70%] h-5 bg-gray-300 m-2 rounded-md bg-gradient-ltr bg-x-y animate-animate-ltr"></section>
          <section className="area w-[40%] h-5 bg-gray-300 m-2 rounded-md bg-gradient-ltr bg-x-y animate-animate-ltr"></section>
        </section>
      ))}
    </section>
  );
};

export default Shimmer;
