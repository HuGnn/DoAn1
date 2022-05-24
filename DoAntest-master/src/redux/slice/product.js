import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  data: [],
  total: 0,
  error: undefined,
};

const slice = createSlice({
  name: "product",
  initialState,
  reducers: {
    get_products: (state) => {
      return {
        ...state,
        loading: true,
      };
    },
    get_products_success: (state, action) => {
      return {
        ...state,
        loading: false,
        data: action.payload.data,
        total: action.payload.total,
      };
    },
    get_products_fail: (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    create_product: (state, action) => {
      return {
        ...state,
        loading: true,
      };
    },
    create_product_success: (state, action) => {
      return {
        ...state,
        loading: false,
      };
    },
    create_product_fail: (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    update_product: (state) => {
      return {
        ...state,
        loading: true,
      };
    },
    update_product_success: (state) => {
      return {
        ...state,
        loading: false,
      };
    },
    update_product_fail: (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    delete_product: (state) => {
      return {
        ...state,
        loading: true,
      };
    },
    delete_product_success: (state) => {
      return {
        ...state,
        loading: false,
      };
    },
    delete_product_fail: (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
  },
});

export const { actions, reducer } = slice;

export default reducer;
