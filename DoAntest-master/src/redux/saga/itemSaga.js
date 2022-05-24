import { call, put, takeLatest, debounce } from "@redux-saga/core/effects";
import { toast } from "react-toastify";
import itemApi from "../../api/itemApi";
import {
  actionGetCater,
  actionGetCaterSuccess,
  actionGetItem,
  actionGetItemSuccess,
  actionSearch,
  actionSetCurrentPage,
  actionSetFilter,
  actionSetFilterAll,
} from "../slice/item";

function* handleGetItem({ payload }) {
  try {
    const { data } = yield call(itemApi.getAllItems, payload);
    yield put(actionGetItemSuccess(data));
  } catch (error) {
    toast.error("System have a problem");
  }
}

function* handleGetCater() {
  try {
    const { data } = yield call(itemApi.getCategory);

    yield put(actionGetCaterSuccess(data));
  } catch (error) {
    toast.error("System have a problem");
  }
}

function* handleSetFilter({ payload }) {
  try {
    const { data } = yield call(itemApi.getAllItems, { category: payload });
    yield put(actionGetItemSuccess(data));
  } catch (error) {
    toast.error("System have a problem");
  }
}

function* handleSearch({ payload: { search, type } }) {
  try {
    const { data } = yield call(itemApi.getAllItems, { search, label: type });
    yield put(actionGetItemSuccess(data));
  } catch (error) {
    toast.error("System have a problem");
  }
}

function* handleSetCurrentPage({ payload }) {
  try {
    const { data } = yield call(itemApi.getAllItems, {
      pageNumber: payload.page,
      category: payload.currentFilter,
    });
    yield put(actionGetItemSuccess(data));
  } catch (error) {
    toast.error("System have a problem");
  }
}

function* handleSetFilterAll({ payload }) {
  try {
    const { price } = payload;
    const { data } = yield call(itemApi.getAllItems, {
      sort: `price,${price}`,
    });
    yield put(actionGetItemSuccess(data));
  } catch (error) {
    toast.error("System have a problem");
  }
}

export default function* itemSaga() {
  yield takeLatest(actionGetItem.type, handleGetItem);
  yield takeLatest(actionGetCater.type, handleGetCater);
  yield takeLatest(actionSetFilter.type, handleSetFilter);
  yield debounce(1000, actionSearch.type, handleSearch);
  yield takeLatest(actionSetCurrentPage.type, handleSetCurrentPage);
  yield takeLatest(actionSetFilterAll.type, handleSetFilterAll);
}
