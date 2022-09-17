import React, { useEffect, useState } from "react";
import NavBarApp from "../NavbarApp/NavBarApp";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrdersAction,
  filterFromDateAction,
  filterToDateAction,
  disableOrderAction,
  filterStatusAction,
} from "../../redux/actions/ordersActions";

export default function HistorialPedidos() {
  const { allOrders } = useSelector((state) => state.orders);
  const dispatch = useDispatch();
  //   const orderAllOrders = allOrders.sort((a, b) => {
  //     return a.date - b.date;
  //   });

  const [mostrarForm, setMostrarForm] = useState(false);
  const [orderEdit, setOrderEdit] = useState({});
  const colores = {
    ready: "green",
    finished: "red",
    doing: "yellow",
    pending: "gray",
  };

  const [fromToFilter, setFromToFilter] = useState({
    from: "",
    to: "",
  });
  var totalSuma = 0;

  const handleChangeFromDate = (e) => {
    setFromToFilter({
      ...fromToFilter,
      [e.target.name]: e.target.value,
    });
    dispatch(filterFromDateAction(fromToFilter));
  };

  const desactivateOrder = (orderEdit) => {
    dispatch(disableOrderAction(orderEdit.orderNumber));
    dispatch(getAllOrdersAction());
    setMostrarForm(false);
  };
  const handleChangeToDate = (e) => {
    setFromToFilter({
      ...fromToFilter,
      [e.target.name]: e.target.value,
    });
    dispatch(filterFromDateAction(fromToFilter));

    // Action filter From
  };
  const handleChangeFilter = (e) => {
    e.preventDefault();

    dispatch(filterStatusAction(e.target.value));
  };

  const desactivateOrder = (orderEdit) => {
    dispatch(disableOrderAction(orderEdit.orderNumber));
    setMostrarForm(false);
  };

  useEffect(() => {
    dispatch(getAllOrdersAction());
  }, [dispatch, mostrarForm]);
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        position: "relative",
        overflowY: "hidden",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
    >
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
            handleChangeToDate(e);
          }}
        />
        <label>Filtrar por estado:</label>

        <select name="" id="" onChange={(e) => handleChangeFilter(e)}>
          <option value="All Orders">All Orders</option>
          <option value="pending">Pending</option>
          <option value="doing">Doing</option>
          <option value="ready">Ready</option>
          <option value="finished">Finished</option>
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
            display: "flex",
            flexDirection: "column",
            boxSizing: "border-box",
            padding: "20px 0px",

            gap: "10px",
            overflowY: "scroll",
          }}
        >
          {allOrders &&
            allOrders.map((order) => {
              //setTotalSuma(...totalSuma, totalSuma + order.totalOrder);
              totalSuma += order.totalOrder;
              return (
                <div
                  style={{
                    width: "100%",
                    height: "60px",
                    margin: "0 auto",
                    display: "flex",
                    padding: "0 8px",
                    boxSizing: "border-box",
                  }}
                >
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
                      gridTemplateColumns: "10% 20% 20% 20% 10% ",
                    }}
                  >
                    <span>N°: {order.orderNumber}</span>
                    <span>Fecha: {order.date + "-" + order.timeEnd}</span>
                    <span style={{ backgroundColor: colores[order.status] }}>
                      {" "}
                      {order.status.toUpperCase()}
                    </span>
                    <select name="" id="">
                      <option value="">Ver Productos</option>
                      {order.productsOrder &&
                        order.productsOrder.map((product) => {
                          return (
                            <option value="">
                              {product.qty + ". " + product.nameProduct}
                            </option>
                          );
                        })}
                    </select>
                    <span>Total $ {order.totalOrder}</span>
                  </div>
                  <button
                    onClick={() => {
                      setOrderEdit(order);
                      setMostrarForm(true);
                    }}
                  >
                    Edit
                  </button>
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
          Total: ${totalSuma}
        </div>
      </div>
      {/* navbar */}
      <div style={{ width: "100%", height: "10vh" }}>
        <NavBarApp />
      </div>

      {/*Modal Editar   */}
      {mostrarForm && (
        <div
          style={{
            position: "absolute",
            top: "0",
            left: "0",
            right: "0",
            bottom: "0",
            margin: "auto",
            zIndex: "20",
            width: "100%",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.8)",

            display: "flex",
          }}
        >
          <div
            style={{
              top: "0",
              left: "0",
              right: "0",
              bottom: "0",
              margin: "auto",
              zIndex: "30",
              width: "80%",
              height: "80%",
              backgroundColor: "lightblue",
              borderRadius: "20px",
              border: "2px solid black",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                height: "10%",
                padding: "20px 40px",
                borderRadius: "20px 20px 0 0 ",
                boxSizing: "border-box",

                backgroundColor: colores[orderEdit.status],
              }}
            >
              <span>N°:{orderEdit.orderNumber} </span>
              <span>Estado: {orderEdit.status.toUpperCase()}</span>

              <span>Fecha: {orderEdit.date}</span>
              <button onClick={() => setMostrarForm(false)}>X</button>
            </div>
            <div
              style={{
                width: "90%",
                margin: "0 auto",
                backgroundColor: "white",
                height: "50%",
                borderRadius: "20px",
                padding: "20px",
                boxSizing: "border-box",
              }}
            >
              <span>
                Cant de Productos:{" "}
                {orderEdit.productsOrder && orderEdit.productsOrder.length}{" "}
              </span>
              <div
                style={{
                  width: "100%",
                  margin: "0 auto",

                  height: "90%",
                  display: "grid",
                  padding: "4px",
                  boxSizing: "border-box",
                  gridTemplateColumns: "1fr 1fr",
                  gridTemplateRows: "1fr 1fr 1fr 1fr",
                  overflowY: "scroll",
                  gap: "5px",
                }}
              >
                {orderEdit.productsOrder &&
                  orderEdit.productsOrder.map((product) => {
                    return (
                      <div
                        style={{
                          border: "2px solid black",
                          borderRadius: "20px",
                          padding: "10px",
                          boxSizing: "border-box",
                          textAlign: "center",
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <span>{product.nameProduct}</span>
                        <span> qty: {product.qty}</span>
                      </div>
                    );
                  })}
              </div>
            </div>
            <div
              style={{
                width: "90%",
                margin: "0 auto",
                height: "10%",
                padding: "10px",
                boxSizing: "border-box",
                borderRadius: "20px",
                backgroundColor: "white",
              }}
            >
              Descripcion:
              {orderEdit.comments}
            </div>
            <div
              style={{
                width: "90%",
                margin: "0 auto",
                height: "12%",
                padding: "10px",
                boxSizing: "border-box",
                display: "flex",
                alignItems: "center",
                gap: "20px",
                justifyContent: "end",
              }}
            >
              <span>Medio de Pago:{orderEdit.methodPayment}</span>

              <span>Total:</span>

              <div
                style={{
                  width: "40%",
                  margin: "",
                  height: "100%",
                  padding: "10px",
                  boxSizing: "border-box",
                  borderRadius: "20px",
                  backgroundColor: "white",
                }}
              >
                {" "}
                {orderEdit.totalOrder}
              </div>
            </div>
            <div
              style={{
                width: "80%",
                margin: "0 auto",
                height: "12%",
                padding: "10px",
                boxSizing: "border-box",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "20px",
              }}
            >
              <button
                onClick={() => {
                  desactivateOrder(orderEdit);
                }}
              >
                Borrar
              </button>
              {/* <button>Guardar</button> */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
