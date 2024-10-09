import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "./slices/productSlice";
import categoryReducer from "./slices/categorySlice";

// @ts-ignore
const store = configureStore({
  reducer: {
    data: dataReducer,
    dataCategory: categoryReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
