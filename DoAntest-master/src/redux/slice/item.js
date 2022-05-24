import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  items: [],
  category: [],
  currentPage: 1,
  total: 1,
  currentFilter: "",
  filter: {
    price: "",
    date: "",
  },
  currentItem: {},
  numberCart: 0,
};

const itemSlice = createSlice({
  name: "item",
  initialState,
  reducers: {
    actionGetItem: (state, action) => {
      state.loading = true;
    },
    actionGetItemSuccess: (state, action) => {
      state.loading = false;
      state.items = action.payload.content;
      state.currentPage = action.payload.number + 1;
      state.total = action.payload.totals;
    },
    actionGetCater: (state) => {
      state.loading = true;
    },
    actionGetCaterSuccess: (state, action) => {
      state.loading = false;
      state.category = action.payload;
    },
    actionSetFilter: (state, action) => {
      state.currentFilter = action.payload;
      state.filter = {
        price: "",
        date: "",
      };
    },
    actionSearch: (state, action) => {
      state.currentFilter = "";
      state.filter = {
        price: "",
        date: "",
      };
    },
    actionSetCurrentPage: (state, action) => {
      state.currentPage = action.payload.page;
      state.filter = {
        price: "",
        date: "",
      };
    },
    actionSetFilterAll: (state, action) => {
      state.filter = action.payload;
    },
    actionSetCurrentItem: (state, action) => {
      state.currentItem = action.payload;
    },
    actionSetNumberCart: (state, action) => {
      state.numberCart = action.payload;
    },
  },
});

//action
export const {
  actionGetItem,
  actionGetItemSuccess,
  actionGetCater,
  actionGetCaterSuccess,
  actionSetFilter,
  actionSearch,
  actionSetCurrentPage,
  actionSetFilterAll,
  actionSetCurrentItem,
  actionSetNumberCart,
} = itemSlice.actions;

//selector
export const getCurrentPage = (state) => state.item.currentPage;
export const getTotal = (state) => state.item.total;
export const getAllItem = (state) => state.item.items;
export const getCategory = (state) => state.item.category;
export const getCurrentFilter = (state) => state.item.currentFilter;
export const getFilter = (state) => state.item.filter;
export const getCurrentItem = (state) => state.item.currentItem;
export const getNumberCart = (state) => state.item.numberCart;
//reducer
const itemReducer = itemSlice.reducer;
export default itemReducer;
