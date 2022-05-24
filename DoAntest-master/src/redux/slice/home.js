import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	popularItem: [],
	newItem: [],
	sellItem: [],
	itemShow: [],
	currentFilter: 'bestseller',
	isLogin: false,
	isAdmin: false,
	dataReceipt: [],
	currentReceipt: {},
	user: {},
	token: null,
};

const homeSlice = createSlice({
	name: 'home',
	initialState,
	reducers: {
		actionGetTop: (state, action) => {
			state.loading = true;
		},
		actionGetTopSuccess: (state, action) => {
			state.newItem = action.payload.topNew;
			state.popularItem = action.payload.popular;
			state.sellItem = action.payload.seller;
			state.itemShow = action.payload.seller;
		},
		actioneSetHomeFilter: (state, action) => {
			state.currentFilter = action.payload.filter;
			state.itemShow = action.payload.item;
			console.log('ac', action.payload);
		},
		actionSetLogin: (state, action) => {
			state.isLogin = action.payload instanceof Object;
			state.isAdmin = action.payload?.user?.role === 'admin';
			state.user = action.payload.user;
			state.token = action.payload.token;
		},
		actionGetReceipt: (state, action) => {},
		actionGetReceiptSuccess: (state, action) => {
			state.dataReceipt = action.payload.data;
		},
		actionGetBillDetail: (state, action) => {
			state.loading = true;
		},
		actionGetBillDetailSuccess: (state, action) => {
			state.currentReceipt = action.payload;
		},
		actionSetCurrentReceipt: (state, action) => {
			state.currentReceipt = action.payload;
		},
	},
});

//action
export const {
	actionGetTop,
	actionGetTopSuccess,
	actioneSetHomeFilter,
	actionSetLogin,
	actionGetReceipt,
	actionGetReceiptSuccess,
	actionSetCurrentReceipt,
	actionGetBillDetail,
	actionGetBillDetailSuccess,
} = homeSlice.actions;

//selector
export const getNew = (state) => state.home.newItem;
export const getBestSell = (state) => state.home.sellItem;
export const getPopular = (state) => state.home.popularItem;
export const getItemShow = (state) => state.home.itemShow;
export const getHomeCurrentFilter = (state) => state.home.currentFilter;
export const checkLogin = (state) => state.home.isLogin;
export const checkIsAdmin = (state) => state.home.isAdmin;
export const getUserInfo = (state) => state.home.user;
export const getUserToken = (state) => state.home.token;
export const getReceipt = (state) => state.home.dataReceipt;
export const getCurrentReceipt = (state) => state.home.currentReceipt;
//reducer
const homeReducer = homeSlice.reducer;
export default homeReducer;
