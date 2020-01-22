import { put, takeEvery, all, call, takeLatest } from "redux-saga/effects";
import { fetchDataSuccess, fetchDataFailure } from "./actions";
function* fetchDataAsync() {
  console.log("hello i am from saga");
  try {
    const information = yield fetch(
      "http://www.mocky.io/v2/5e26ad762f00004800a4f5af"
    ).then(response => response.json());
    yield put(fetchDataSuccess(information));
  } catch (err) {
    yield put(fetchDataFailure(err.message));
  }
}

export function* fetchDataStart() {
  console.log("oiiiiiiiiiiiii");
  yield takeLatest("FETCH_DATA_START", fetchDataAsync);
}

export default function* rootSaga() {
  yield all([fetchDataStart()]);
}
