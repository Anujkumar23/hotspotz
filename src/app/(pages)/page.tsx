"use client";
import { NextPage } from "next";
import Link from "next/link";
import { useState, useEffect } from "react";
import { SWIGGY_API_URL } from "@/constants";
import Shimmer from "@/components/Shimmer";
import RestaurantCard from "@/components/RestaurantCard";
import ErrorComponent from "@/components/Error";
import CrousalComponent from "@/components/CrousalComponent";

export type restaurantType = {
  type: string;
  info: {
    id: string;
    name: string;

    city: string;
    area: string;
    totalRatingsString: string;
    cloudinaryImageId: string;
    cuisines: string[];
    tags: any[];
    costForTwo: number;
    costForTwoString: string;
    deliveryTime: number;
    minDeliveryTime: number;
    maxDeliveryTime: number;
    slaString: string;
    lastMileTravel: number;
    slugs: {
      restaurant: string;
      city: string;
    };
    cityState: string;
    address: string;
    locality: string;
    veg: boolean;

    sla: {
      restaurantId: string;
      deliveryTime: number;
      minDeliveryTime: number;
      maxDeliveryTime: number;
      lastMileTravel: number;
      lastMileDistance: number;
      lastMileTravelString: string;
    };

    avgRating: string;
    totalRatings: number;
  };
};
export type restaurantListType = Array<restaurantType>;
export interface CrousalType {
  imageId: string;
  id: string;
  action: {
    text: string;
  };
}

export const dynamic = "force-static";

const Home: NextPage = () => {
  const [searchText, setSearchText] = useState("");
  const [restaurants, setRestaurants] = useState<restaurantListType>([]);
  const [filteredRestaurants, setFilteredRestaurants] =
    useState<restaurantListType>([]);
  const [crousalData, setCrousalData] = useState<CrousalType[]>([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async () => {
    try {
      const res = await fetch(SWIGGY_API_URL);
      if (!res.ok) {
        if (res.status === 404) throw new Error("Data not found");
      } else if (res.status === 400) {
        throw new Error("invalid Request");
      } else if (res.status === 500) {
        throw new Error("Internal Server Error");
      }
      const data = await res.json();

      setRestaurants(
        data.data.cards[4]["card"]["card"]["gridElements"]["infoWithStyle"][
          "restaurants"
        ]
      );
      setFilteredRestaurants(
        data.data.cards[4]["card"]["card"]["gridElements"]["infoWithStyle"][
          "restaurants"
        ]
      );
      setCrousalData(
        data.data.cards[0].card.card["gridElements"]["infoWithStyle"].info
      );
    } catch (error) {
      if (error instanceof Error) {
        setError(error);
      }
    }
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.currentTarget.value);
  };

  const handleOnSearch = (
    searchText: string,
    restaurants: restaurantListType
  ) => {
    if (searchText !== "") {
      const filterData: restaurantListType = restaurants.filter((restaurant) =>
        restaurant.info.name.toLowerCase().includes(searchText.toLowerCase())
      );

      setErrorMsg("");
      setFilteredRestaurants(filterData);
      if (filterData.length === 0) {
        setErrorMsg("Match not found");
      }
    } else {
      setErrorMsg("");
      setFilteredRestaurants(restaurants);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  if (!restaurants) {
    return null;
  }

  return (
    <section className=" min-h-screen">
      <section className="flex justify-center items-center mt-9 mb-9    ">
        <input
          type="text"
          placeholder="Search for restaurant..."
          className="p-2 rounded-l-md border border-slate-800 w-[40%] outline-none text-sm box-border shadow-custom"
          value={searchText}
          onChange={handleOnChange}
        />
        <button
          onClick={() => handleOnSearch(searchText, restaurants)}
          className="rounded-r-md bg-blue-500 text-white p-2  ml-[-5px] hover:bg-green-800 border-none outline-none  shadow-custom "
        >
          Search
        </button>
      </section>
      <CrousalComponent data={crousalData} />
      {errorMsg && <p className="text-center">{errorMsg}</p>}
      {/* {error && <ErrorComponent error={error} />} */}
      {restaurants.length === 0 && !error ? (
        <Shimmer />
      ) : (
        <section className="flex xs:justify-center lg:justify-start flex-wrap gap-5  mx-10 ">
          {filteredRestaurants.map((restaurant) => (
            <Link
              href={`/restaurant/${restaurant.info.id}`}
              key={restaurant.info.id}
            >
              <RestaurantCard {...(restaurant.info as any)} />
            </Link>
          ))}
        </section>
      )}
    </section>
  );
};
export default Home;
//
