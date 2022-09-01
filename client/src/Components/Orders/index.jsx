import React, { useState } from "react";
import "./orders.css";
import { useEffect } from "react";
import FilterSort from "../Buttons/filter&sort";
import { useDispatch, useSelector } from "react-redux";
import { getOrdersAction } from "../../redux/actions/ordersActions";

function Orders() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const { orders } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(getOrdersAction());
    if (orders.length) setLoading(false);
  }, [dispatch, orders.length]);

  const [time, setTime] = useState("");
  setTimeout(() => {
    setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
  });
  return (
    <div className="Container">
      <h1>{time}</h1>
      {loading ? (
        <div id="empty">
          <h2>There are not orders !</h2>
          <button
            className="button"
            onClick={() => {
              window.location.reload();
            }}
          >
            Refresh
          </button>
        </div>
      ) : (
        <>
          <FilterSort />{" "}
          {orders.map((o) => {
            return (
              <div key={o.orderNumber} className="Card">
                <p id="orderNumber">#{o.orderNumber}</p>
                <p id="date">{o.date}</p>
                <ul id="time">
                  <b>time:</b>
                  <li>init:{o.timeInit}</li>
                </ul>
                <h4 id="title">Order:</h4>
                <p>Product1</p>
                <p>Cantidad</p>
                <p> 1</p>
                {o.comments && <p id="comments">{o.comments}</p>}
                <label id="status">status:</label>
                <select name="status" id="status">
                  <option value="p">pending</option>
                  <option value="d">doing</option>
                  <option value="r">ready</option>
                </select>
                <p id="amount">Amount</p>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
}

export default Orders;
