import React from "react";
import cls from "./Order.module.css";

export default function Order(props) {
  return (
    <tr className={cls.Order}>
      <th>{props.number}</th>
      <th>{props.user}</th>
      <th>{props.date}</th>
      <th>{props.value}</th>
      <th>{props.currency}</th>
      <th>{props.status}</th>
    </tr>
  );
}
