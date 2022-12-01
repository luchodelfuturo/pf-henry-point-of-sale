import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  cleanAction,
  ordersReadyAction,
  updateStatusFinished,
} from "../../redux/actions/ordersActions";
import s from "../Counter/counter.module.css";
import Swal from "sweetalert2";

function Counter() {
  const { ordersReady, status } = useSelector((state) => state.orders);
  console.log("original", ordersReady);

  const dispatch = useDispatch();


  const postToast = () => {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });

    Toast.fire({
      icon: "success",
      title: "Order finished",
    });
  };


  const handleEnded = (e, n) => {
    // e.preventDefault();
    dispatch(updateStatusFinished(e.target.value, n));
    postToast();
    if (ordersReady.length === 1) {
      dispatch(cleanAction());
    }
  };
  useEffect(() => {
    dispatch(ordersReadyAction());
  }, [status, dispatch]);

  return (
    <div>
      <div className={s.etapas_de_ordenes}>
        {/* <div class="pedidos en preparacion">
          <h1>Pending orders</h1>
        </div> */}
        <h1>Ready</h1>
        <div className={s.container}>
          {ordersReady &&
            ordersReady.map((o) => {
              return (
                o.status !== "finished" && (
                  <div
                    key={o.orderNumber}
                    id={o.status === "doing" ? "doing" : "pending"}
                    className="Card"
                  >
                    <div id="head">
                      <p id="orderNumber">#{o.orderNumber}</p>
                      <p id="time">{o.timeInit}</p>
                    </div>

                    <div id="prodYcant">
                      <div id="prod">
                        <h4 id="title">Order:</h4>
                        {o.productsOrder.map((p) => (
                          <p id="products"> {p.nameProduct}</p>
                        ))}
                      </div>
                      <div id="cant">
                        <h4 id="cantidad">Cantidad</h4>
                        {o.productsOrder.map((p) => (
                          <p id="qty">{p.qty}</p>
                        ))}
                      </div>
                    </div>

                    {o.comments && (
                      <p id="comments">
                        Comments: <br />
                        {o.comments}
                      </p>
                    )}
                    <label id="status">status:</label>
                    <select
                      name="status"
                      onChange={(e) => handleEnded(e, o.orderNumber)}
                    >
                      <option>Select</option>
                      <option value="finished">finished</option>
                    </select>
                  </div>
                )
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default Counter;
