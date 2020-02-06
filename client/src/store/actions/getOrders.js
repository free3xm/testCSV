import axios from "../../axios/axios";
import { FETCH_START, FETCH_SUCCESS, FETCH_ERROR } from "./ActionTypes";

export default function getOrders() {
  return async dispatch => {
    dispatch(fetchStart());
    try {
      const res = await axios.get("/api/orders");
      const data = res.data;
      dispatch(fetchSuccess(data));
    } catch (err) {
      dispatch(fetchError(err));
    }
  };
}
function fetchStart() {
  return {
    type: FETCH_START
  };
}
function fetchSuccess(data) {
  return {
    type: FETCH_SUCCESS,
    data
  };
}
function fetchError(err) {
  return {
    type: FETCH_ERROR,
    err
  };
}
