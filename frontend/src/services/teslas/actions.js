import { TESLAS_REQUEST, SELECTED_TESLA } from "./constants";

export const teslasRequest = payload => {
  return {
    type: TESLAS_REQUEST,
    payload
  };
};

export const selectTesla = payload => {
  return {
    type: SELECTED_TESLA,
    payload
  };
};