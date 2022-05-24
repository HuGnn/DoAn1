import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	loading: false,
	data: [],
	cardDetail: {},
	error: undefined,
};

const slice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		get_carts: (state) => {
			return {
				...state,
				loading: true,
			};
		},
		get_carts_success: (state, action) => {
			console.log('get_carts_success', action);
			return {
				...state,
				loading: false,
				data: action.payload.data.cart_details,
				cardDetail: action.payload.data,
			};
		},
		get_carts_fail: (state, action) => {
			return {
				...state,
				loading: false,
				error: action.payload,
			};
		},
		update_cart: (state) => {
			return {
				...state,
				loading: true,
			};
		},
		update_cart_success: (_, action) => {
			console.log(action.payload);
			return {
				loading: false,
				error: null,
				data: action.payload.cart_details,
				cardDetail: action.payload,
			};
		},
		update_cart_fail: (state, action) => {
			return {
				...state,
				loading: false,
				error: action.payload,
			};
		},
		update_data_card: (state, action) => {
			return {
				...state,
				data: action.payload.data,
			};
		},
	},
});

export const { actions, reducer } = slice;

const getTotal = (data) => {
	if (!data instanceof Array) return 0;
	let result = 0;
	data.forEach((x) => (result += Number.parseInt(x.amount)));
	return result;
};

export const getCartTotal = (state) => getTotal(state.carts.data);
export const getCardData = (state) => state.carts.data;
// export const getCardTotalPrice = (state) => state.carts.cardDetail?.total_price;
export const getCardTotalPrice = (state) => state.carts.data?.reduce((prev, cur)=> prev + cur.amount * cur.price,0);

export default reducer;
