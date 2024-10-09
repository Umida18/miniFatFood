import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "@src/types";

export interface DataState {
  product: Product[];
  isLoadingProduct: boolean;
  isErrorProducts: boolean;
}

const initialState: DataState = {
  product: [],
  isLoadingProduct: false,
  isErrorProducts: false,
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setProduct: (state, action: PayloadAction<Product[]>) => {
      state.product = action.payload;
    },
    setIsLoadingProduct: (state, action: PayloadAction<boolean>) => {
      state.isLoadingProduct = action.payload;
    },
    setIsErrorProduct: (state, action: PayloadAction<boolean>) => {
      state.isErrorProducts = action.payload;
    },
  },
});

export const { setProduct, setIsLoadingProduct, setIsErrorProduct } =
  dataSlice.actions;
export default dataSlice.reducer;
