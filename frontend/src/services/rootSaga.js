import { teslasSagas } from "./teslas/sagas";

import { all } from "redux-saga/effects";

export default function* rootSagas() {
  yield all([teslasSagas()]);
}
