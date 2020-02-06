import React from "react";
import cls from "./Loader.module.css";

export default function Loader() {
  return (
    <div className={cls.Loader}>
      <div className={cls.LoaderElement}>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
