import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ordersReadyAction,
  updateStatusFinished,
} from "../../redux/actions/ordersActions";
import NavBarApp from "../NavbarApp/NavBarApp";
import s from "../Counter/counter.module.css";
function Counter() {
  const { ordersReady, status } = useSelector((state) => state.orders);
  console.log("original", ordersReady);

  const dispatch = useDispatch();

  const handleEnded = (e, n) => {
    e.preventDefault();
    dispatch(updateStatusFinished(e.target.value, n));
  };
  useEffect(() => {
    dispatch(ordersReadyAction());
  }, [status, dispatch]);

  return (
    <div>
      {/* <div className={s.etapas_de_ordenes}>
        <div class="pedidos en preparacion">
          <h1>Pending orders</h1>
        </div>
        <div className="pedidos listos para entregar">
          <h1>Ready</h1>
          <div className={s.container}>
            {ordersReady.length > 0 &&
              ordersReady.map((o) => {
                return (
                  o.status !== "f" && (
                    <div key={o.orderNumber} className={s.card}>
                      <span id="orderNumber">Order #{o.orderNumber}</span>{" "}
                      &nbsp; &nbsp;
                      <span>{o.date}</span> &nbsp; &nbsp;
                      <span>{o.timeInit}</span>
                      <select
                        name="status"
                        onChange={(e) => handleEnded(e, o.orderNumber)}
                      >
                        <option>Select</option>
                        <option value="f">finished</option>
                      </select>
                    </div>
                  )
                );
              })}
          </div>
        </div>
      </div> */}
      <NavBarApp />
    </div>
  );
}

export default Counter;
