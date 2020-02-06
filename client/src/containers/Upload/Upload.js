import React from "react";
import cls from "./Upload.module.css";
import Button from "../../components/UI/Button/Button";
import uploadCSV from "../../store/actions/uploadCSV";
import { connect } from "react-redux";

function Upload(props) {
  function uploadHandler(event) {
    event.preventDefault();
    const file = event.target.uploadFile.files;
    if (file.length) {
      props.uploadCSV(file[0]);
      props.history.push("/");
    }
  }
  return (
    <form className={cls.form} onSubmit={uploadHandler}>
      <label htmlFor="uploadFile">Choose CSV file to upload</label>
      <input type="file" id="uploadFile" accept=".csv" />
      <Button type="submit">Upload</Button>
    </form>
  );
}
function mapDispatchToProps(dispatch) {
  return {
    uploadCSV: data => dispatch(uploadCSV(data))
  };
}
export default connect(null, mapDispatchToProps)(Upload);
