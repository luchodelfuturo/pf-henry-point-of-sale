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

  return (
    <div className="Container">
      <FilterSort />
      {data.length < 1 ? (
        <h4>There are not orders !</h4>
      ) : (
        data.jsonRecipes.results.map((o) => {
          return (
            <div key={o.id} className="Card">
              <p id="orderNumber">order number</p>
              <p id="date">date</p>
              <ul id="time">
                <b>time:</b>
                <li>init</li>
                <li>ended</li>
              </ul>
              <h4>{o.products.map((p) => p.name + " ")}</h4>
              <p id="status">status</p>
              <p id="comments"> comments</p>
              <p id="amount">Amount</p>
            </div>
          );
        })
      )}

      {/* <div className="Card">
        <h4>OrderExample</h4>
        <p id="orderNumber">order number</p>
        <p id="date">date</p>
        <ul id="time">
          <b>time:</b>
          <li>init</li>
          <li>ended</li>
        </ul>
        <h6>Products</h6>
        <ul>
          <li>product1</li>
          <li>product2</li>
          <li>product3</li>
        </ul>
        <label for="status" id="status">
          status:
        </label>
        <select name="status" id="status">
          <option value="waiting">waiting</option>
          <option value="pending">pending</option>
          <option value="ready">ready</option>
        </select>
        <p id="comments">comments</p>
        <p id="amount">Amount</p>
      </div>
    <Nav />*/}
    </div>
  );
}

export default Orders;
