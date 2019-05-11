import { createStore, compose, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
// import someReduxMiddleware from 'some-redux-middleware';
// import someOtherReduxMiddleware from 'some-other-redux-middleware';
import rootReducer from "./rootReducer";
import rootSaga from "./rootSaga";
import { composeWithDevTools } from "redux-devtools-extension";

const sagaMiddleware = createSagaMiddleware();

// create a redux store with our reducer above and middleware
const middlewareEnhancers = applyMiddleware(sagaMiddleware);
const composedEnhancers = composeWithDevTools(middlewareEnhancers);

let intraStore = createStore(
  rootReducer,
  composedEnhancers
  //  compose(applyMiddleware(sagaMiddleware), reduxDevTools)
);

sagaMiddleware.run(rootSaga);

export const store = intraStore;
// create a redux store with our reducer above and middleware
