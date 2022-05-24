import { call, takeLatest, put } from '@redux-saga/core/effects';
import { actions } from '../slice/bill';
import { toast } from 'react-toastify';
import billApi from '../../api/billApi';

function* getBills({ payload: { page } }) {
	try {
		const res = yield call(billApi.getBills, page);
		yield put({
			type: actions.get_bills_success.type,
			payload: {
				data: res?.data?.data,
				total: res?.data?.total,
			},
		});
	} catch (error) {
		yield put({ type: actions.get_bills_fail.type, payload: error });
		toast.error('Hệ thống có lỗi');
	}
}

export default function* homeSaga() {
	yield takeLatest(actions.get_bills.type, getBills);
}
