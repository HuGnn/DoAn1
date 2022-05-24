import { call, takeLatest, put } from "@redux-saga/core/effects";
import { actions } from "../slice/product";
import { toast } from "react-toastify";
import productApi from "../../api/productApi";

function* getProducts({ payload: { page, filter } }) {
  try {
    const res = yield call(productApi.getProducts, page, filter);
    yield put({
      type: actions.get_products_success.type,
      payload: {
        data: res?.data?.data,
        total: res?.data?.total,
      },
    });
  } catch (error) {
    yield put({ type: actions.get_products_fail.type, payload: error });
    toast.error("Hệ thống có lỗi");
  }
}

function* createProduct({ payload: { data } }) {
  try {
    yield call(productApi.createProduct, data);
    yield put({ type: actions.create_product_success.type, payload: {} });
  } catch (error) {
    yield put({ type: actions.create_product_fail.type, payload: error });
    toast.error("Hệ thống có lỗi");
  }
}

function* updateProduct({ payload: { id, data } }) {
  try {
    const res = yield call(productApi.createProduct, id, data);
    yield put({ type: actions.update_product_success.type, payload: { res } });
  } catch (error) {
    yield put({ type: actions.update_product_fail.type, payload: error });
    toast.error("Hệ thống có lỗi");
  }
}

function* deleteProduct({ payload: { id } }) {
  try {
    yield call(productApi.deleteProduct, id);
    yield put({ type: actions.delete_product_success.type, payload: {} });
  } catch (error) {
    yield put({ type: actions.delete_product_fail.type, payload: error });
    toast.error("Hệ thống có lỗi");
  }
}

export default function* homeSaga() {
  yield takeLatest(actions.get_products.type, getProducts);
  yield takeLatest(actions.create_product.type, createProduct);
  yield takeLatest(actions.update_product.type, updateProduct);
  yield takeLatest(actions.delete_product.type, deleteProduct);
}
