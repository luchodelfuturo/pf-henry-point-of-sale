import React, { useState, useEffect  } from "react";
import "./orders.css";
import FilterSort from "../Buttons/filter&sort";
import { useDispatch, useSelector } from "react-redux";
<<<<<<< HEAD
import { getOrdersAction, updateStatusAction} from "../../redux/actions/ordersActions";
=======
import {
  filterDoingAction,
  filterPendingAction,
  getOrdersAction,
  updateStatusAction,
} from "../../redux/actions/ordersActions";
import { filterDoing } from "../../redux/slices/ordersSlice";
>>>>>>> 18306386f7661c83f026ab1f2e54f53d122f87fb

function Orders() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const { orders, status, filteredOrders } = useSelector(
    (state) => state.orders
  );
  useEffect(() => {
    dispatch(getOrdersAction());
  }, [status, orders.length, dispatch]);

  useEffect(() => {
    if (orders.length > 0) setLoading(false);
    // if (filteredOrders.length < 1) setLoading(true);
  }, [orders.status, orders, orders.length, dispatch]);

  const [time, setTime] = useState("");
  setTimeout(() => {
    setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
  });

  const handleChange = (e, n) => {
    dispatch(updateStatusAction(e.target.value, n));
    if (e.target.value === "ready") alert("order sent to pedidos ready");
    // e.target.value === "doing" && filteredOrders.length > 0
    //   ? dispatch(filterDoingAction())
    //   : dispatch(filterPendingAction());
  };

  return (
    <div className="Container">
<<<<<<< HEAD
      {loading ? (
        <div id="empty">
          <h2>There are not orders !</h2>
          <button className="button" onClick={() => {window.location.reload();}}>Refresh</button>
=======
      <button
        className="button"
        onClick={() => {
          window.location.reload();
        }}
      >
        Refresh
      </button>
      <h1>{time}</h1>
      {loading ? (
        <div id="empty">
          <h2>There are not orders !</h2>
>>>>>>> 18306386f7661c83f026ab1f2e54f53d122f87fb
        </div>
      ) : (
        <>
          <FilterSort />
<<<<<<< HEAD
        <div id="grilla">
          {filteredOrders.length > 0 ? filteredOrders.map((o) => {
            return (
              <div key={o.orderNumber} className="Card">
                <p id="orderNumber"># {o.orderNumber}</p>
                <p id="time">Time: {o.timeInit}</p>
                <h4 id="title">Order:</h4>
                <p>{o.products.map((p) => p.name)}</p>
                <p>Cantidad:</p>
                <p> 1</p>
                {o.comments && <p id="comments">{o.comments}</p>}
                <label id="status">status:</label>
                <select
                  name="status"
                  id="status"
                  onChange={(e) => handleChange(e, o.orderNumber)}
                >
                      <option value="pendin">pending</option>
                      <option value="doing">doing</option>
                      <option value="ready">ready</option>
                    </select>
          
                  </div>
              
            );
          })
            : orders.map((o) => {
                return (
                  <div key={o.orderNumber} className="Card">
                    <div id="head">
                      <p id="orderNumber"># {o.orderNumber}</p>
                      <p id="time">{o.timeInit}</p>
                    </div>
                    <h4 id="title">Order:</h4>
                    <p>{o.products.map((p) => p.name)}</p>
                    <p>Cantidad</p>
                    <p> 1</p>
                    {o.comments && <p id="comments">{o.comments}</p>}
                    <label id="status">status:</label>
                    <select name="status"  id="status" onChange={(e) => handleChange(e, o.orderNumber)}>
                      <option value="pending">pending</option>
                      <option value="doing">doing</option>
                      <option value="ready">ready</option>
                    </select>
                  </div>
=======
          {filteredOrders.length > 0
            ? filteredOrders.map((o) => {
                return (
                  o.status !== "ready" && (
                    <div
                      key={o.orderNumber}
                      id={o.status === "doing" ? "doing" : "pending"}
                      className="Card"
                    >
                      <p id="orderNumber">#{o.orderNumber}</p>
                      <p id="date">{o.date}</p>
                      <ul id="time">
                        <b>time:</b>
                        <li>init:{o.timeInit}</li>
                      </ul>
                      <h4 id="title">Order:</h4>
                      <p id="products">
                        {o.products.map((p) => p.name + ", ")}
                      </p>
                      <p>Cantidad</p>
                      <p> 1</p>
                      {o.comments && <p id="comments">{o.comments}</p>}
                      <label id="status">status:</label>
                      <select
                        name="status"
                        id="status"
                        onChange={(e) => handleChange(e, o.orderNumber)}
                      >
                        <option value={o.status}>{o.status}</option>
                        {o.status !== "pending" && (
                          <option value="pending">pending</option>
                        )}
                        {o.status !== "doing" && (
                          <option value="doing">doing</option>
                        )}
                        <option value="ready">ready</option>
                      </select>
                      {/* <p id="amount">${o.products.map((p) => p.price)}</p> */}
                    </div>
                  )
                );
              })
            : orders.map((o) => {
                return (
                  o.status !== "ready" && (
                    <div
                      key={o.orderNumber}
                      id={o.status === "doing" ? "doing" : "pending"}
                      className="Card"
                    >
                      <p id="orderNumber">#{o.orderNumber}</p>
                      <p id="date">{o.date}</p>
                      <ul id="time">
                        <b>time:</b>
                        <li>init:{o.timeInit}</li>
                      </ul>
                      <h4 id="title">Order:</h4>
                      <p id="products">
                        {o.products.map((p) => p.name + ", ")}
                      </p>
                      <p>Cantidad</p>
                      <p> 1</p>
                      {o.comments && <p id="comments">{o.comments}</p>}
                      <label id="status">status:</label>
                      <select
                        name="status"
                        id="status"
                        onChange={(e) => handleChange(e, o.orderNumber)}
                      >
                        <option value={o.status}>{o.status}</option>
                        {o.status !== "pending" && (
                          <option value="pending">pending</option>
                        )}
                        {o.status !== "doing" && (
                          <option value="doing">doing</option>
                        )}
                        <option value="ready">ready</option>
                      </select>
                      {/* <p id="amount">${o.products.map((p) => p.price)}</p> */}
                    </div>
                  )
>>>>>>> 18306386f7661c83f026ab1f2e54f53d122f87fb
                );
              })}
          </div>
        </>
      )}
    </div>
  );
}

export default Orders;
