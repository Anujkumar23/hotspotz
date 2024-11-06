import { CartItem } from "@/GlobalRedux/features";
import { UserType } from "./firebase/auth";
import { useEffect, useState } from "react";

interface User {
  displayName: string | null;
  email: string;
}

export function getcartItems(cartItems: CartItem[]) {
  return cartItems.reduce((count, cartItem) => {
    return count + cartItem.quantity;
  }, 0);
}

export const getSubTotal = (cart: CartItem[]) => {
  return cart.reduce((sum, { item, quantity }) => {
    return item.card.info.defaultPrice * quantity + sum;
  }, 0);
};

export const GetUserfromLocalStorage = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    setUser(user);
  }, []);
  return user;
};
