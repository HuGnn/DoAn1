import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	loading: false,
	data: [],
	total: 0,
	error: undefined,
};

const slice = createSlice({
	name: 'bills',
	initialState,
	reducers: {
		get_bills: (state) => {
			return {
				...state,
				loading: true,
			};
		},
		get_bills_success: (state, action) => {
			return {
				...state,
				loading: false,
				data: action.payload.data,
				total: action.payload.total,
			};
		},
		get_bills_fail: (state, action) => {
			return {
				...state,
				loading: false,
				error: action.payload,
			};
		},
	},
});

export const { actions, reducer } = slice;

export const getBillData = (state) => state.bills.data;
export const getBillTotal = (state) => state.bills.total;

export default reducer;
