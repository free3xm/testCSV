import React from "react";
import cls from "./Error.module.css";
import Button from "../UI/Button/Button";

export default function Error(props) {
  return (
    <div className={cls.Error}>
      <p>{props.children}</p>
      <Button clickHandler={props.clickHandler}>OK</Button>
    </div>
  );
}
