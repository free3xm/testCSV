import React, { useEffect, useState } from "react";
import cls from "./Orders.module.css";
import { connect } from "react-redux";
import Loader from "../../components/UI/Loader/Loader";
import Order from "../../components/Order/Order";
import getOrders from "../../store/actions/getOrders";
import closeErr from "../../store/actions/closeErr";
import Error from "../../components/Error/Error";

function Orders(props) {
  const [orders, setOrders] = useState([]);
  const [sortType, setSortType] = useState(["num", ""]);
  useEffect(() => {
    props.getOrders();
  }, []);
  useEffect(() => {
    setOrders(props.orders);
  }, [props.orders]);

  const data = [
    ["num", "№"],
    ["user_email", "User email"],
    ["date", "date"],
    ["value", "value"],
    ["currency", "currency"],
    ["status", "status"]
  ];

  function sort(type) {
    const newOrders = [...orders];
    if (sortType[0] === type) {
      newOrders.sort((a, b) => a[type] < b[type]);
      setSortType(["", type]);
    } else {
      newOrders.sort((a, b) => a[type] > b[type]);
      setSortType([type, ""]);
    }
    setOrders(newOrders);
  }

  return (
    <div className={cls.Orders}>
      {props.err ? (
        <Error clickHandler={props.closeErr}>{props.err}</Error>
      ) : null}
      <h2>Orders</h2>
      {props.loading ? (
        <Loader />
      ) : (
        <table className={cls.tOrder}>
          <thead>
            <tr>
              {data.map(e => (
                <th
                  key={Math.random()}
                  onClick={() => sort(e[0])}
                  className={cls.thead}
                >
                  {e[1]}
                  {sortType[0] === e[0] ? (
                    <i className="fas fa-angle-down"></i>
                  ) : sortType[1] === e[0] ? (
                    <i className="fas fa-angle-up"></i>
                  ) : null}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {orders.map((order, i) => (
              <Order
                key={order._id}
                number={order.num + 1}
                user={order.user_email}
                date={order.date}
                value={order.value}
                currency={order.currency}
                status={order.status}
              />
            ))}
          </tbody>
        </table>
      )}
      <a
        className={cls.downloadLink}
        href={`${process.env.REACT_APP_API_URL}/api/download`}
      >
        Download
      </a>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    orders: state.orders,
    loading: state.loading,
    err: state.err
  };
}
function mapDispatchToProps(dispatch) {
  return {
    getOrders: () => dispatch(getOrders()),
    closeErr: () => dispatch(closeErr())
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Orders);
