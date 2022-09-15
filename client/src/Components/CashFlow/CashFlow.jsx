import React, { useEffect } from "react";
import NavBarApp from "../NavbarApp/NavBarApp";
import BoxesCashFlow from "./BoxesCashFlow";
import { useHistory } from "react-router-dom";
import {
  getTotalCashAction,
  getTotalPaypalAction,
} from "../../redux/actions/ordersActions";
import { useDispatch, useSelector } from "react-redux";
import Modal from "./Modal";

export default function CashFlow() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { totalCash, totalPaypal } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(getTotalCashAction());
    dispatch(getTotalPaypalAction());
  }, [dispatch]);

  return (
    <div style={{ width: "100%", height: "100vh", backgroundColor: "gray" }}>
      <div style={{ height: "90vh", backgroundColor: "white", width: "100%" }}>
        <div
          style={{ height: "100%", padding: "20px", boxSizing: "border-box" }}
        >
          <div
            style={{
              width: "50%",
              margin: "0 auto",
              textAlign: "center",
              height: "80px",
              backgroundColor: "violet",
            }}
          >
            Resumen de Caja{" "}
          </div>
          <div
            style={{
              width: "90%",
              margin: "0 auto",

              height: "80%",
              backgroundColor: "pink",
              display: "flex",
              flexWrap: "wrap",
              gap: "4px",
              justifyContent: "space-around",
              alignContent: "space-around",
              padding: "4px",
              boxSizing: "border-box",
            }}
          >
            <BoxesCashFlow title={"Inicio de Caja"} value={0} />
            <BoxesCashFlow
              title={"Ventas Efectivo"}
              value={totalCash.totalCash}
            />
            <BoxesCashFlow
              title={"Ventas Tarjeta"}
              value={totalPaypal.totalPaypal}
            />
            <BoxesCashFlow
              title={"Total de Ventas"}
              value={totalCash.totalCash + totalPaypal.totalPaypal}
            />
            <BoxesCashFlow title={"Ingresos"} value={0} />
            <BoxesCashFlow title={"Egresos"} value={0} />
            <BoxesCashFlow title={"Total de Efectivo"} value={0} />
          </div>
          <div
            style={{
              width: "90%",
              margin: "0 auto",

              height: "10%",
              backgroundColor: "blue",
              display: "flex",
              flexWrap: "wrap",
              gap: "10px",
              justifyContent: "center",
              alignContent: "start",
            }}
          >
            <Modal />
            <button onClick={() => history.push("/cashFlow/historialCashFlow")}>
              Historial De Cierres
            </button>
            <button>Cerrar Caja</button>
          </div>
        </div>
      </div>
      <div>
        <NavBarApp />
      </div>
    </div>
  );
}
