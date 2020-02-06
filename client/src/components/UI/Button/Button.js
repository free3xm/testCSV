import React from "react";
import cls from "./Button.module.css";

export default function Button(props) {
  return (
    <>
      <button
        onClick={props.clickHandler}
        className={cls.Button}
        type={props.type}
      >
        {props.children}
      </button>
    </>
  );
}
