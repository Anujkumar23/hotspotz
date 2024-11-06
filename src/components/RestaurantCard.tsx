// import "../app/globals.css";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import React from "react";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: "600",
  display: "swap",
});
type Props = {
  cloudinaryImageId: string;
  name: string;
  cuisines: string[];
  area: string;
  costForTwo: string;
  avgRating: string;
  sla: any;
};

// const srcImage = (cloudinaryImageId: string) => {
//   return (
//     "https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill/" +
//     cloudinaryImageId
//   );
// };
const srcImage = (cloudinaryImageId: string) => {
  return (
    "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill/" +
    cloudinaryImageId
  );
};

const RestaurantCard: React.FC<Props> = ({
  cloudinaryImageId,
  name,
  cuisines,
  area,
  costForTwo,
  avgRating,
  sla,
}) => {
  return (
    <section className=" min-w-[200px] w-[220px]  h-[300px]  p-2  border rounded-md mt-5 mb-5 shadow-custom transition-transform hover:-translate-y-1 duration-500 ">
      <Image
        src={srcImage(cloudinaryImageId)}
        alt="restaurant-img"
        width={200}
        height={200}
        className="rounded-md"
      />
      <h3 className=" max-w-[200px] line-clamp-1 ">
        <span className={montserrat.className}>{name}</span>
      </h3>

      <h5 className="max-w-[200px] text-sm line-clamp-2 text-gray-500 ">
        {cuisines.join(", ")}
      </h5>
      <h5 className="font-medium">{area}</h5>
      <span className="grid grid-cols-[auto_1px_auto_1px_1fr]  gap-2 items-center mt-4 text-sm">
        <h4 className="flex justify-center items-center bg-green-700 px-1 rounded-sm text-white">
          <FaStar />
          {avgRating}
        </h4>
        <h4>•</h4>
        <h4 className="text-xs">{sla.lastMileTravelString}</h4>
        <h4>•</h4>
        <h4 className="text-xs">{costForTwo}</h4>
      </span>
    </section>
  );
};

export default RestaurantCard;
