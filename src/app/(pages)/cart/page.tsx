import CartComponent from "@/components/CartComponent";
import { Metadata, NextPage } from "next";

export const metadata: Metadata = {
  title: "Cart",
};

const Cart: NextPage = () => {
  return <CartComponent />;
};

export default Cart;
