import React, { useState } from "react";
import "./orders.css";
import axios from "axios";
import { useEffect } from "react";
import FilterSort from "../Buttons/filter&sort";

function Orders() {
  const [data, setData] = useState("");
  useEffect(() => {
    // momentaneamente uso axios acá hasta definir si usar redux toolkit
    axios.get(`http://localhost:3001/orders/`).then((res) => {
      setData(res.data);
    });
  }, []);

  const [time, setTime] = useState("");
  setTimeout(() => {
    setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
  });
  return (
    <div className="Container">
      <h1>{time}</h1>
      {data.length < 1 ? (
        <div id="empty">
          <h4>There are not orders !</h4>
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
        <FilterSort /> &&
        data.map((o) => {
          return (
            <div key={o.orderNumber} className="Card">
              <p id="orderNumber">#{o.orderNumber}</p>
              <p id="date">{o.date}</p>
              <ul id="time">
                <b>time:</b>
                <li>init:{o.timeInit}</li>
              </ul>
              {/* <h4>{o.products.map((p) => p.name + " ")}</h4> */}
              <p id="comments"> comments</p>
              <label for="status" id="status">
                status:
              </label>
              <select name="status" id="status">
                <option value="p">pending</option>
                <option value="d">doing</option>
                <option value="r">ready</option>
              </select>
              <p id="amount">Amount</p>
            </div>
          );
        })
      )}
    </div>
  );
}

export default Orders;
