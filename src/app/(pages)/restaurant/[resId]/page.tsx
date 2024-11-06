"use client";
import React from "react";
import { ITEM_IMG_CDN_URL } from "@/constants";
import Image from "next/image";
import UseFetch from "@/Hooks/UseRestaurant";
import { Montserrat } from "next/font/google";
import { useDispatch } from "react-redux";
import { addToCart } from "@/GlobalRedux/features/cart-slice";
import ShimmerMenu from "@/components/ShimmerMenu";
import ErrorComponent from "@/components/Error";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});
type CardType = {
  card: {
    info: {
      id: string;
      name: string;
      defaultPrice: number;
      price: number;
      description: string;
      imageId: string;
    };
  };
};

type Props = {
  params: {
    resId: string;
  };
};

const Page = ({ params }: Props) => {
  const { resId } = params;
  const dispatch = useDispatch();

  const { data, loading, error } = UseFetch(resId);

  const handleAddToCart = (item: CardType) => {
    dispatch(addToCart({ item, quantity: 1 }));
  };

  return (
    <>
      <section className={montserrat.className}>
        <section className="flex justify-center pb-4  ">
          <ul className="w-[700px] max-w-3xl">
            <h1 className="text-center">{data ? "Menu" : null}</h1>
            {loading && <ShimmerMenu />}
            {error && <ErrorComponent error={error} />}
            {!error &&
              data &&
              data?.map((item) => (
                <li key={item.card.info.id}>
                  <section className="flex justify-between items-center border-b-2 border-gray-500 p-4 xs:flex-col lg:flex-row xs:w-full">
                    <section
                      className="flex flex-col gap-1 justify-start p-2 lg:w-[60%]
                      "
                    >
                      <h3 className="font-bold">{item.card.info.name}</h3>
                      <p className="text-xs font-semibold">
                        {(item.card.info.defaultPrice || item.card.info.price) >
                        0
                          ? new Intl.NumberFormat("en-IN", {
                              style: "currency",
                              currency: "INR",
                            }).format(
                              (item.card.info.defaultPrice ||
                                item.card.info.price) / 100
                            )
                          : null}
                      </p>
                      <p className="text-xs text-gray-500">
                        {" "}
                        {item.card.info.description}
                      </p>
                    </section>
                    <section className="flex flex-col justify-center items-center gap-2 ">
                      <Image
                        alt={item.card.info.name}
                        src={ITEM_IMG_CDN_URL + item.card.info.imageId}
                        width={100}
                        height={100}
                        className="rounded-md "
                      />
                      <button
                        className="p-2 bg-red-500  rounded-md hover:bg-red-600 text-white transition-transform hover:scale-90 duration-75"
                        onClick={() => handleAddToCart(item)}
                      >
                        Add+
                      </button>
                    </section>
                  </section>
                </li>
              ))}
          </ul>
        </section>
      </section>
    </>
  );
};

export default Page;
