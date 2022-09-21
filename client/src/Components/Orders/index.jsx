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
import { NavBarSup } from "../../theme/styled-componets";
import Swal from "sweetalert2";

function Orders() {
  const dispatch = useDispatch();
  const { orders, status, filteredOrders } = useSelector(
    (state) => state.orders
  );
  useEffect(() => {
    dispatch(getOrdersAction());
  }, [status, orders.length, dispatch]);

  const [delay, setDelay] = useState(new Date().getMinutes());

  setInterval(() => {
    setDelay(
      new Date()
        .toLocaleTimeString("en-US", { hour12: false })
        .slice(0, 5)
        .split(":")
        .join("")
    );
  }, 1000);

  let z = 1;
  setInterval(() => {
    z++;
    console.log("minutes:" + z);
  }, 60000);

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
      title: "Order sent to pedidos ready",
    });
  };

  const handleChange = (e, n) => {
    dispatch(updateStatusAction(e.target.value, n));
    dispatch(cleanAction());
    if (e.target.value === "ready") postToast();
    // e.target.value === "doing" && filteredOrders.length > 0
    //   ? dispatch(filterDoingAction())
    //   : dispatch(filterPendingAction());
  };

  return (
    <div className="Container">
      {/* <NavBarSup> */}
      {/* <button
          className="button"
          onClick={() => {
            window.location.reload();
          }}
        >
          Refresh
        </button> */}
      <FilterSort />
      {/* </NavBarSup> */}
      <div className="orders-cont">
        {orders.length < 1 ||
        !orders.filter((o) => o.status !== "finished").length ? (
          <div id="empty">
            <h2>There are not orders!</h2>
          </div>
        ) : (
          <>
            <FilterSort />
            <div className="grilla-container">
              <div id="grilla">
                {filteredOrders.length > 0
                  ? filteredOrders.map((o) => {
                      return o.status === "ready" ||
                        o.status === "finished" ? null : (
                        <div
                          Key={o.orderNumber}
                          id={o.status === "doing" ? "doing" : "pending"}
                          className="Card"
                        >
                          <div id="head">
                            <div className="order-header">
                              <div id="orderNumber">#{o.orderNumber}</div>
                              <div id="time">{o.timeInit}</div>
                            </div>
                            <div className="order-delay">
                              <div>
                                {delay - o.timeInit.split(":").join("") > 59
                                  ? "Over 1 hour!"
                                  : "delay: "}
                              </div>
                              <div>
                                {delay - o.timeInit.split(":").join("") > 59 ? (
                                  <div className="hurry">
                                    PLEASE HURRY UP, THE CLIENT IS WAITING
                                  </div>
                                ) : (
                                  delay -
                                  o.timeInit.split(":").join("") +
                                  " minutes"
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="list-cont" id="prodYcant">
                            <div id="prod">
                              <div id="title">Order:</div>
                              {o.productsOrder.map((p) => (
                                <div id="products"> {p.nameProduct}</div>
                              ))}
                            </div>
                            <div id="cant">
                              <div id="cantidad">Qty</div>
                              {o.productsOrder.map((p) => (
                                <div id="qty">{p.qty}</div>
                              ))}
                            </div>
                          </div>{" "}
                          {o.comments && (
                            <div className="comments" id="comments">
                              {o.comments && (
                                <div>
                                  Comments: <br />
                                  {o.comments}
                                </div>
                              )}
                            </div>
                          )}
                          <div className="select-cont">
                            <select
                              className="status-select"
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
                        </div>
                      );
                    })
                  : orders &&
                    orders.map((o) => {
                      return o.status === "ready" ||
                        o.status === "finished" ? null : (
                        <div
                          key={o.orderNumber}
                          id={o.status === "doing" ? "doing" : "pending"}
                          className="Card"
                        >
                          <div id="head">
                            <div className="order-header">
                              <div id="orderNumber">#{o.orderNumber}</div>
                              <div id="time">{o.timeInit}</div>
                            </div>
                            <div className="order-delay">
                              <div>
                                {delay - o.timeInit.split(":").join("") > 59
                                  ? "Over 1 hour!"
                                  : "Delay: "}
                              </div>
                              <div>
                                {delay - o.timeInit.split(":").join("") > 59 ? (
                                  <div className="hurry">
                                    PLEASE HURRY UP, THE CLIENT IS WAITING
                                  </div>
                                ) : (
                                  delay -
                                  o.timeInit.split(":").join("") +
                                  " minutes"
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="list-cont" id="prodYcant">
                            <div id="prod">
                              <div id="title">Order:</div>
                              {o.productsOrder &&
                                o.productsOrder.map((p) => (
                                  <div id="products"> {p.nameProduct}</div>
                                ))}
                            </div>
                            <div id="cant">
                              <div id="cantidad">Qty</div>
                              {o.productsOrder &&
                                o.productsOrder.map((p) => (
                                  <div id="qty">{p.qty}</div>
                                ))}
                            </div>
                          </div>
                          <div>
                            {" "}
                            {o.comments && (
                              <div className="comments" id="comments">
                                {o.comments && (
                                  <div>
                                    Comments: <br />
                                    {o.comments}
                                  </div>
                                )}
                              </div>
                            )}
                          </div>

                          <div className="select-cont">
                            <select
                              className="status-select"
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
                        </div>
                      );
                    })}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Orders;
