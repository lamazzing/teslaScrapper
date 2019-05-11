import {
  TESLAS_REQUEST,
  TESLAS_FAILURE,
  TESLAS_SUCCESS,
  SELECTED_TESLA,
} from "./constants";

const initialState = {
  fetching: false,
  teslas: null,
  selectedTesla: null,
  error: null
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case TESLAS_REQUEST:
      return { ...state, fetching: true };
    case TESLAS_FAILURE:
      return { ...state, fetching: false, error: action.error };
    case TESLAS_SUCCESS:
      return { ...state, fetching: false, teslas: action.teslas };
    case SELECTED_TESLA:
      return { ...state, selectedTesla: action.payload };
    default:
      return state;
  }
}
