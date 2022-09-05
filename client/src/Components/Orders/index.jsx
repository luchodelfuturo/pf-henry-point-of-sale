import React, { useState } from "react";
import "./orders.css";
import { useEffect } from "react";
import FilterSort from "../Buttons/filter&sort";
import { useDispatch, useSelector } from "react-redux";
import {
  cleanAction,
  getOrdersAction,
  updateStatusAction,
} from "../../redux/actions/ordersActions";

function Orders() {
  const dispatch = useDispatch();
  const { orders, status, filteredOrders } = useSelector(
    (state) => state.orders
  );
  useEffect(() => {
    dispatch(getOrdersAction());
  }, [status, orders.length, dispatch]);

  useEffect(() => {
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
    dispatch(cleanAction());
    if (e.target.value === "ready") alert("order sent to pedidos ready");
    // e.target.value === "doing" && filteredOrders.length > 0
    //   ? dispatch(filterDoingAction())
    //   : dispatch(filterPendingAction());
  };

  return (
    <div className="Container">
      <button
        className="button"
        onClick={() => {
          window.location.reload();
        }}
      > Refresh</button>
      {orders.length < 1 ? (
        <div id="empty">
          <h2>There are not orders !</h2>
        </div>
      ) : (
        <>
          <FilterSort />
          <div id="grilla">
          {filteredOrders.length > 0
            ? filteredOrders.map((o) => {
                return (
                  
                  o.status !== "ready" && (
                    <div
                      key={o.orderNumber}
                      id={o.status === "doing" ? "doing" : "pending"}
                      className="Card"
                    >
                      <div id="head">
                        <p id="orderNumber">#{o.orderNumber}</p>
                        <p id="time">{o.timeInit}</p>
                      </div>
                      <h4 id="title">Order:</h4>

                      {o.productsOrder.map((p) => (
                        <p id="products"> {p.nameProduct}</p>
                      ))}

                      <p id="cantidad">Cantidad</p>
                      {o.productsOrder.map((p) => (
                        <p id="qty">{p.qty}</p>
                      ))}
                      {o.comments && (
                        <p id="comments">
                          Comments: <br />
                          {o.comments}
                        </p>
                      )}
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
                      <div id="head">
                        <p id="orderNumber">#{o.orderNumber}</p>
                        <p id="time">{o.timeInit}</p>
                      </div>
                      <h4 id="title">Order:</h4>

                      {o.productsOrder.map((p) => (
                        <p id="products"> {p.nameProduct}</p>
                      ))}

                      <p id="cantidad">Cantidad</p>
                      {o.productsOrder.map((p) => (
                        <p id="qty">{p.qty}</p>
                      ))}
                      {o.comments && (
                        <p id="comments">
                          Comments: <br />
                          {o.comments}
                        </p>
                      )}
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
                    </div>
                  )
                  
                );
              })}
          </div>
        </>
      )}
    </div>
  );
}

export default Orders;