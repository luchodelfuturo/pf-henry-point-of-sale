import React, { useState } from "react";
import "./orders.css";
import { useEffect } from "react";
import FilterSort from "../Buttons/filter&sort";
import { useDispatch, useSelector } from "react-redux";
import {
  getOrdersAction,
  updateStatusAction,
} from "../../redux/actions/ordersActions";

function Orders() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const { orders, status, filteredOrders } = useSelector(
    (state) => state.orders
  );
  useEffect(() => {
    dispatch(getOrdersAction());
  }, [status, dispatch]);

  useEffect(() => {
    if (orders.length) setLoading(false);
  }, [orders.status, orders.length, dispatch]);

  const [time, setTime] = useState("");
  setTimeout(() => {
    setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
  });

  const handleChange = (e, n) => {
    dispatch(updateStatusAction(e.target.value, n));
  };

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
          <FilterSort />
          {filteredOrders.length > 0
            ? filteredOrders.map((o) => {
                return (
                  <div key={o.orderNumber} className="Card">
                    <p id="orderNumber">#{o.orderNumber}</p>
                    <p id="date">{o.date}</p>
                    <ul id="time">
                      <b>time:</b>
                      <li>init:{o.timeInit}</li>
                    </ul>
                    <h4 id="title">Order:</h4>
                    <p>{o.products.map((p) => p.name)}</p>
                    <p>Cantidad</p>
                    <p> 1</p>
                    {o.comments && <p id="comments">{o.comments}</p>}
                    <label id="status">status:</label>
                    <select
                      name="status"
                      id="status"
                      onChange={(e) => handleChange(e, o.orderNumber)}
                    >
                      <option value="p">pending</option>
                      <option value="d">doing</option>
                      <option value="r">ready</option>
                    </select>
                    <p id="amount">${o.products.map((p) => p.price)}</p>
                  </div>
                );
              })
            : orders.map((o) => {
                return (
                  <div key={o.orderNumber} className="Card">
                    <p id="orderNumber">#{o.orderNumber}</p>
                    <p id="date">{o.date}</p>
                    <ul id="time">
                      <b>time:</b>
                      <li>init:{o.timeInit}</li>
                    </ul>
                    <h4 id="title">Order:</h4>
                    <p>{o.products.map((p) => p.name)}</p>
                    <p>Cantidad</p>
                    <p> 1</p>
                    {o.comments && <p id="comments">{o.comments}</p>}
                    <label id="status">status:</label>
                    <select
                      name="status"
                      id="status"
                      onChange={(e) => handleChange(e, o.orderNumber)}
                    >
                      <option value="p">pending</option>
                      <option value="d">doing</option>
                      <option value="r">ready</option>
                    </select>
                    <p id="amount">${o.products.map((p) => p.price)}</p>
                  </div>
                );
              })}
        </>
      )}
    </div>
  );
}

export default Orders;
