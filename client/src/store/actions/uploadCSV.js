import axios from "../../axios/axios";

export default function uploadCSV(data) {
  return async dispatch => {
    console.log(data);
    const fd = new FormData();
    fd.append("file", data)
    axios.post("/api/upload", fd);
  };
}
