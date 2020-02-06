import axios from "../../axios/axios";
import { fetchStart, fetchSuccess, fetchError } from "./getOrders";

export default function uploadCSV(file) {
  return async dispatch => {
    dispatch(fetchStart());
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await axios.post("/api/upload", fd);
      const data = res.data;
      dispatch(fetchSuccess(data));
    } catch (err) {
      dispatch(fetchError(err));
    }
  };
}
