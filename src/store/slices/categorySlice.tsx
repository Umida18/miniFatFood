import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICategory } from "@src/types";

export interface DataCategoryState {
  category: ICategory[];
  isLoadingCategory: boolean;
  isErrorCategory: boolean;
}

const initialState: DataCategoryState = {
  category: [],
  isLoadingCategory: false,
  isErrorCategory: false,
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<ICategory[]>) => {
      state.category = action.payload;
      console.log("setCategory called with:", action.payload);
    },
    setIsLoadingCategory: (state, action: PayloadAction<boolean>) => {
      state.isLoadingCategory = action.payload;
    },
    setIsErrorCategory: (state, action: PayloadAction<boolean>) => {
      state.isErrorCategory = action.payload;
    },
  },
});

export const { setCategory, setIsLoadingCategory, setIsErrorCategory } =
  categorySlice.actions;

export default categorySlice.reducer;
