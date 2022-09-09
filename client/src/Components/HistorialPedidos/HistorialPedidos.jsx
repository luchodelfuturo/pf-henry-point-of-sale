import React, { useEffect, useState } from "react";
import NavBarApp from "../NavbarApp/NavBarApp";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrdersAction,
  filterFromDateAction,
  filterToDateAction,
} from "../../redux/actions/ordersActions";

export default function HistorialPedidos() {
  const { allOrders } = useSelector((state) => state.orders);
  const dispatch = useDispatch();
  //   const orderAllOrders = allOrders.sort((a, b) => {
  //     return a.date - b.date;
  //   });
  const [fromToFilter, setFromToFilter] = useState({
    from: new Date(),
    to: new Date(),
  });
  useEffect(() => {
    dispatch(getAllOrdersAction());
  }, [dispatch]);

  const handleChangeFromDate = (e) => {
    e.preventDefault();
    dispatch(filterFromDateAction(e.target.value));
  };

  const handleChangeToDate = (e) => {
    e.preventDefault();

    dispatch(filterToDateAction(e.target.value));

    // Action filter From
  };

  useEffect(() => {
    dispatch(getAllOrdersAction());
  }, [dispatch]);
  return (
    <div style={{ width: "100%", height: "100vh" }}>
      {/* filtros Orders */}
      <div
        style={{
          width: "100%",
          height: "10vh",
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          gap: "20px",
          boxSizing: "border-bos",
          padding: "10px",
        }}
      >
        <label>Desde:</label>
        <input
          type="date"
          name="from"
          
          
          value={fromToFilter.from}
          onChange={(e) => {
            setFromToFilter({
              ...fromToFilter,
              [e.target.name]: e.target.value,
            });

            handleChangeFromDate(e);
          }}
        />
        <label>Hasta:</label>
        <input
        min={fromToFilter.from}
          type="date"
          name="to"
          value={fromToFilter.to}
          onChange={(e) => {
            setFromToFilter({
              ...fromToFilter,
              [e.target.name]: e.target.value,
            });

            handleChangeToDate(e);
          }}
        />
        <label>Filtrar por estado:</label>
        <select name="" id="">
          <option value=""></option>
          <option value=""></option>
          <option value=""></option>
        </select>
      </div>
      {/* Pedidos List */}
      <div style={{ width: "100%", height: "80vh", backgroundColor: "gray" }}>
        <div
          style={{
            width: "90%",
            margin: "0 auto",
            border: "2px solid black",
            backgroundColor: "lightgray",
            borderRadius: "20px 20px 0px 0px",
            height: "90%",
            display: "grid",
            boxSizing: "border-box",
            padding: "20px 0px",

            flexDirection: "column",
            gap: "10px",
            overflowY: "scroll",
          }}
        >
          {allOrders &&
            allOrders.map((order) => {
              return (
                <div
                  style={{
                    width: "90%",
                    margin: "0 auto",
                    height: "60px",
                    padding: "0 20px",
                    justifyContent: "space-around",
                    alignContent: "center",
                    backgroundColor: "white",
                    border: "2px solid black",
                    borderRadius: "20px",

                    display: "grid",
                    textAlign: "center",

                    gridTemplateColumns: "10% 20% 20% 20% 10%",
                  }}
                >
                  <span>N°: {order.orderNumber}</span>
                  <span>Fecha: {order.date + "-" + order.timeEnd}</span>

                  <span>Estado: {order.status.toUpperCase()}</span>
                  <select name="" id="">
                    <option value="">Ver Productos</option>
                    {order.productsOrder &&
                      order.productsOrder.map((product) => {
                        return (
                          <option value="">
                            {product.qty + "-" + product.nameProduct}
                          </option>
                        );
                      })}
                  </select>
                  <span>Total</span>
                </div>
              );
            })}
        </div>
        <div
          style={{
            width: "90%",
            margin: "0 auto",
            height: "10%",
            fontSize: "120%",
            textAlign: "end",
            backgroundColor: "white",
            borderRadius: "0 0 20px 20px",
            display: "flex",
            border: " 2px solid black",
            justifyContent: "end",
            alignItems: "center",
            padding: "0px 40px 40px 0px",
            boxSizing: "border-box",
          }}
        >
          Total: $
        </div>
      </div>
      {/* navbar */}
      <div style={{ width: "100%", height: "10vh" }}>
        <NavBarApp />
      </div>
    </div>
  );
}
