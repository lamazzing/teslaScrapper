import { takeLatest, call, put, select } from "redux-saga/effects";
import axios from "axios";
import config from "../api/config";

// watcher saga: watches for actions dispatched to the store, starts worker saga
const endPoints = {
  offers: "/offers"
};

// function that makes the api request and returns a Promise for response
function fetchTeslas(data) {
  console.log(data);
  console.log(config.url);
  //const AuthStr = 'Bearer '.concat(data);
  return axios.get(`${config.url}${endPoints.offers}`);
}

// worker saga: makes the api call when watcher saga sees the action
function* workerSaga(action) {
  try {
    const response = yield call(fetchTeslas, action.payload);
    console.log(response);
    const teslas = response.data;
    // dispatch a success action to the store with the new dog
    yield put({ type: "TESLAS_SUCCESS", teslas });
    //NavigatorService.navigate('PropertyHome');
  } catch (error) {
    console.log(error);
    // dispatch a failure action to the store with the error
    yield put({ type: "TESLAS_FAILURE", error });
  }
}

export function* teslasSagas() {
  yield takeLatest("TESLAS_REQUEST", workerSaga);
}
