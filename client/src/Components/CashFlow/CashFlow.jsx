import React, { useEffect } from "react";
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

  const colores = {
    Sales: "green",
    Income: "yellow",
    Expenses: "red",
  };

 

  useEffect(() => {
    dispatch(getLastCashFlowAction());
    console.log("despachando cashflowAction");
  }, [dispatch]);
  {
    lastCashFlow && console.log(lastCashFlow.cashFlowMoves);
  }
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
            <div>
              <div
                style={{
                  width: "90%",
                  margin: "0 auto",
                  backgroundColor: "lightgray",
                  height: "50%",
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
                  value={lastCashFlow ? lastCashFlow.totalCashRegister : 0}
                />
              </div>
              <div
                style={{
                  width: "90%",
                  margin: "0 auto",
                  backgroundColor: "lightgray",
                  height: "60%",
                  border: "2px solid gray",
                  borderRadius: "20px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "4px",
                  justifyContent: "space-around",
                  alignContent: "start",
                  padding: "20px",
                  boxSizing: "border-box",
                  overflowY: "scroll",
                }}
              >
                {lastCashFlow && lastCashFlow.cashFlowMoves
                  ? lastCashFlow.cashFlowMoves.map((move) => {
                      return (
                        <div
                          style={{
                            width: "90%",
                            margin: "0 auto",
                            padding: "0 20px",
                            justifyContent: "start",
                            alignContent: "center",
                            backgroundColor: colores[move.type],
                            border: "2px solid black",
                            borderRadius: "20px",
                            display: "grid",
                            textAlign: "center",
                            gridTemplateColumns: "20% 20% 20% 20%",
                          }}
                        >
                          <span>Hour: {move.hour}</span>
                          <span>Type: {move.type}</span>
                          <span>Amount: {move.amount}</span>
                          <span>Comment: {move.comment}</span>
                        </div>
                      );
                    })
                  : "hola"}
              </div>
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
      </div>
    </div>
  );
}
