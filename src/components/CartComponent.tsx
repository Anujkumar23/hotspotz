"use client";
import React from "react";
import { RootState } from "@/GlobalRedux/store";
import { useSelector } from "react-redux";
import Image from "next/image";
import { ITEM_IMG_CDN_URL } from "../constants";
import Link from "next/link";
import {
  CartItem,
  addToCart,
  clearCart,
  removeFromCart,
} from "@/GlobalRedux/features/cart-slice";
import { useDispatch } from "react-redux";
import { getSubTotal } from "../utils";
import { Roboto_Mono } from "next/font/google";

const roboto = Roboto_Mono({
  subsets: ["latin"],
  display: "swap",
  weight: "500",
});

const CartComponent: React.FC = () => {
  const cartItems = useSelector((state: RootState) => state.cart.value);
  const dispatch = useDispatch();

  const handleQuantityChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    { item, quantity }: CartItem
  ) => {
    const updatedQuantity = e.target.valueAsNumber;
    if (updatedQuantity < quantity) {
      dispatch(removeFromCart({ item, quantity: 1 }));
    } else {
      dispatch(addToCart({ item, quantity: 1 }));
    }
  };

  const DeleteCartItems = () => {
    dispatch(clearCart());
  };

  return (
    <section className="flex justify-center  flex-col min-w-[400px] min-h-[67vh]  ">
      <h1
        className={roboto.className}
        style={{ fontSize: "40px", textAlign: "center" }}
      >
        Cart
      </h1>
      <section className="lg:grid ld:grid-rows-[1fr_1fr]  lg:gap-2   ">
        <section className="">
          {cartItems.length ? (
            cartItems.map(({ item, quantity }) => {
              const { description, id, imageId, name } = item?.card?.info;
              return (
                <section
                  key={id}
                  className="grid  lg:grid-cols-[100px_1fr_auto]   justify-center items-center "
                >
                  <section className="py-4 flex flex-col gap-2 px-4   sm:w-[100px] lg:w-[150px] ">
                    <Image
                      className="rounded"
                      src={ITEM_IMG_CDN_URL + imageId}
                      alt={name}
                      width={100}
                      height={100}
                    />
                    <label htmlFor="quantity">Quantity</label>
                    <input
                      className="border-2 sm:w-[100px] lg:w-[150px] "
                      type="number"
                      name="quantity"
                      id="quantity"
                      value={quantity}
                      onChange={(e) => {
                        handleQuantityChange(e, { item, quantity });
                      }}
                    />
                  </section>
                  <section className=" flex sm:ml-4 lg:ml-20">
                    <section className="flex flex-col p-4 sm:text-xs">
                      <h1 className={roboto.className}>{name}</h1>
                      <p className="text-gray-400  line-clamp-3 lg:w-[40vw]">
                        {description}
                      </p>
                      <section className="py-4">
                        <h1 className={roboto.className}>Price</h1>
                        <p>
                          {getSubTotal([{ item, quantity }]) > 0
                            ? new Intl.NumberFormat("en-IN", {
                                style: "currency",
                                currency: "INR",
                              }).format(getSubTotal([{ item, quantity }]) / 100)
                            : 0.0}
                        </p>
                      </section>
                    </section>
                  </section>
                </section>
              );
            })
          ) : (
            <section className="flex flex-col justify-center items-center">
              <Image
                src="/burger-image.png"
                alt="burger-image"
                width={150}
                height={150}
              />
              <h1 className="text-3xl text-center">
                Make me happy by adding item to cart
              </h1>
              <Link
                href="/"
                className="border-2 mt-3  border-blue-400 p-2 rounded-md hover:bg-blue-400 hover:text-white"
              >
                Eat with Hotspot
              </Link>
            </section>
          )}
        </section>
        <section className="subtotal mx-5   ">
          <section className="flex  justify-around items-center ">
            <h1 className="font-semibold   md:text-base   lg:text-2xl">
              Total Amount
            </h1>
            <p>
              {getSubTotal(cartItems) > 0
                ? new Intl.NumberFormat("en-IN", {
                    style: "currency",
                    currency: "INR",
                  }).format(getSubTotal(cartItems) / 100)
                : (0.0).toFixed(1)}
            </p>
          </section>
          {cartItems.length > 0 ? (
            <section className="text-center mt-5">
              <button
                className="p-4 bg-red-400 hover:bg-red-500 text-white rounded-lg"
                onClick={DeleteCartItems}
              >
                Clear Cart
              </button>
            </section>
          ) : null}
        </section>
      </section>
    </section>
  );
};

export default CartComponent;
