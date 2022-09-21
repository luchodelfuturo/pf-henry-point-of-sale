import React, { useEffect } from "react";
import NavBarApp from "../NavbarApp/NavBarApp";
import BoxesCashFlow from "./BoxesCashFlow";
import { useHistory } from "react-router-dom";
import { getLastCashFlowAction } from "../../redux/actions/cashFlowActions";
import { useDispatch, useSelector } from "react-redux";
import Modals from "./Modals";
import { useState } from "react";

export default function CashFlow() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { lastCashFlow } = useSelector((state) => state.cashFlow);
  const [closeModal, setCloseModal] = useState(false);
  const [cierre, setCierre] = useState({
    initialCash: 0,
    cashPayment: 0,
    paypalPayment: 0,
    income: 0,
    expenses: 0,
    totalSales: 0,
    totalCashRegister: 0,
    totalAll: 0,
  });

  useEffect(() => {
    dispatch(getLastCashFlowAction());
    console.log("despachando cashflowAction");
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
            <button onClick={() => history.push("/cashFlow/historialCashFlow")}>
              Historial De Cierres
            </button>
          </div>
          {lastCashFlow && !lastCashFlow.closeCashFlow && (
            <div
              style={{
                width: "90%",
                margin: "0 auto",
                backgroundColor: "lightgray",
                height: "80%",
                border: "2px solid gray",
                borderRadius: "20px",
                display: "flex",
                flexWrap: "wrap",
                gap: "10px",
                justifyContent: "space-around",
                alignContent: "start",
                padding: "20px",
                boxSizing: "border-box",
              }}
            >
              <BoxesCashFlow
                title={"Inicio de Caja"}
                value={lastCashFlow ? lastCashFlow.initialCash : 0}
              />
              <BoxesCashFlow
                title={"Ventas Efectivo"}
                value={lastCashFlow ? lastCashFlow.cashPayment : 0}
              />
              <BoxesCashFlow
                title={"Ventas Tarjeta"}
                value={lastCashFlow ? lastCashFlow.paypalPayment : 0}
              />
              <BoxesCashFlow
                title={"Total de Ventas"}
                value={lastCashFlow ? lastCashFlow.totalSales : 0}
              />
              <BoxesCashFlow
                title={"Ingresos"}
                value={lastCashFlow ? lastCashFlow.income : 0}
              />
              <BoxesCashFlow
                title={"Egresos"}
                value={lastCashFlow ? lastCashFlow.expenses : 0}
              />
              <BoxesCashFlow
                title={"Total de Efectivo"}
                value={
                  // totalSales.totalSales +
                  //   totalIncome.totalIncome -
                  //   totalExpenses.totalExpenses !==
                  // null
                  //   ? totalSales.totalSales +
                  //     totalIncome.totalIncome -
                  //     totalExpenses.totalExpenses
                  //   : totalSales.totalSales + totalIncome.totalIncome
                  //   ? totalSales.totalSales + totalIncome.totalIncome
                  //   : totalSales.totalSales
                  //   ? totalSales.totalSales
                  //   : 0

                  lastCashFlow ? lastCashFlow.totalCashRegister : 0
                }
              />
            </div>
          )}
          <div
            style={{
              width: "90%",
              margin: "0 auto",

              height: "10%",

              display: "flex",
              flexWrap: "wrap",
              gap: "10px",
              justifyContent: "center",
              alignContent: "start",
            }}
          >
            <Modals lastCashFlow={lastCashFlow} />

            {/* <button onClick={()=> setCloseModal(true)}> Cerrar Caja </button>
             */}
            
          </div>
        </div>
      </div>
      <div>
        <NavBarApp />
      </div>
    </div>
  );
}
