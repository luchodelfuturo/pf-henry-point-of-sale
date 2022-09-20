import React, { useEffect } from "react";
import NavBarApp from "../NavbarApp/NavBarApp";
import BoxesCashFlow from "./BoxesCashFlow";
import { useHistory } from "react-router-dom";
import {
  getTotalCashAction,
  getTotalPaypalAction,
  getTotalIncomeAction,
  getTotalSalesAction,
  getTotalExpenseAction,
  cierreDeCaja,
  getTotalAction,
} from "../../redux/actions/cashFlowActions";
import { useDispatch, useSelector } from "react-redux";
import Modals from "./Modals";
import { useState } from "react";

export default function CashFlow() {
  const history = useHistory();
  const dispatch = useDispatch();
  const {
    totalCash,
    totalPaypal,
    totalIncome,
    totalSales,
    totalExpenses,
    cashInit,
    totalAll,
  } = useSelector((state) => state.cashFlow);

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
    //Get ULTIMO CASHFLOW 
    // dispatch(getTotalCashAction());
    // dispatch(getTotalPaypalAction());
    // dispatch(getTotalIncomeAction());
    // dispatch(getTotalExpenseAction());
    // dispatch(getTotalSalesAction());
    // dispatch(getTotalAction());
    // setCierre({
    //   initialCash: cashInit[0],
    //   cashPayment: totalCash.totalCash,
    //   paypalPayment: totalPaypal.totalPaypal,
    //   income: totalIncome.totalIncome,
    //   expenses: totalExpenses.totalExpenses,
    //   totalSales: totalSales.totalSales,
    //   totalCashRegister: totalCash.totalCash,
    //   totalAll: totalAll.totalCashRegister,
    // });
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
            <BoxesCashFlow
              title={"Inicio de Caja"}
              value={cashInit[0] ? cashInit[0] : 0}
            />
            <BoxesCashFlow
              title={"Ventas Efectivo"}
              value={totalCash.totalCash ? totalCash.totalCash : 0}
            />
            <BoxesCashFlow
              title={"Ventas Tarjeta"}
              value={totalPaypal.totalPaypal ? totalPaypal.totalPaypal : 0}
            />
            <BoxesCashFlow
              title={"Total de Ventas"}
              value={totalSales.totalSales ? totalSales.totalSales : 0}
            />
            <BoxesCashFlow
              title={"Ingresos"}
              value={totalIncome.totalIncome ? totalIncome.totalIncome : 0}
            />
            <BoxesCashFlow
              title={"Egresos"}
              value={
                totalExpenses.totalExpenses ? totalExpenses.totalExpenses : 0
              }
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

                totalAll.totalCashRegister ? totalAll.totalCashRegister : 0
              }
            />
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
            <Modals />
            <button onClick={() => history.push("/cashFlow/historialCashFlow")}>
              Historial De Cierres
            </button>
            <button onClick={() => dispatch(cierreDeCaja(cierre))}>
              Cerrar Caja
            </button>
          </div>
        </div>
      </div>
      <div>
        <NavBarApp />
      </div>
    </div>
  );
}
