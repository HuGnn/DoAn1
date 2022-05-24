import { all } from "redux-saga/effects";
import itemSaga from "./itemSaga";
import homeSaga from "./homeSaga";
import productSaga from "./productSaga";
import billSaga from "./billSaga";
import cartSaga from "./cartSaga";

export default function* rootSaga() {
  yield all([itemSaga(), homeSaga(), productSaga(), billSaga(), cartSaga()]);
}
