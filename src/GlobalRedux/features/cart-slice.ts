import { createSlice, PayloadAction } from "@reduxjs/toolkit";
type CartItemType = {
  card: {
    info: {
      id: string;
      name: string;
      defaultPrice: number;
      description: string;
      imageId: string;
    };
  };
};

export type CartItem = {
  item: CartItemType;
  quantity: number;
};

type CartType = {
  value: CartItem[];
};

const initialState: CartType = {
  value: [],
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state: CartType, action: PayloadAction<CartItem>) => {
      const { item: product, quantity } = action.payload;
      const existingItem = state.value.find(({ item }) => {
        return item.card.info.id === product.card.info.id;
      });
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.value.push(action.payload);
      }
    },
    removeFromCart: (state: CartType, action: PayloadAction<CartItem>) => {
      const { item: product, quantity } = action.payload;
      const ItemIndex = state.value.findIndex(({ item, quantity }) => {
        return item.card.info.id === product.card.info.id;
      });
      if (ItemIndex > -1) {
        const existingItem = state.value[ItemIndex];
        if (existingItem.quantity === 1) {
          state.value.splice(ItemIndex, 1);
        } else {
          existingItem.quantity -= quantity;
        }
      }
    },
    clearCart: (state: CartType) => {
      state.value = [];
    },
  },
});
export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
