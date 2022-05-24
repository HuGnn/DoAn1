import { call, takeLatest, put } from '@redux-saga/core/effects';
import { actions } from '../slice/cart';
import { toast } from 'react-toastify';
import cartApi from '../../api/cartApi';

function* getcarts() {
	try {
		const res = yield call(cartApi.getCarts);
		yield put({
			type: actions.get_carts_success.type,
			payload: {
				data: res?.data,
			},
		});
	} catch (error) {
		yield put({ type: actions.get_carts_fail.type, payload: error });
		toast.error('Hệ thống có lỗi');
	}
}

function* updateCart({ payload: { data } }) {
	try {
		const res = yield call(cartApi.updateCart, data);
		yield put({
			type: actions.update_cart_success.type,
			payload: { ...res.data },
		});
	} catch (error) {
		yield put({ type: actions.update_cart_fail.type, payload: error });
		toast.error('Hệ thống có lỗi');
	}
}

export default function* cartSaga() {
	yield takeLatest(actions.get_carts.type, getcarts);
	yield takeLatest(actions.update_cart.type, updateCart);
}
