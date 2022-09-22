import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  searchDateCashFlowAction,
  getAllCashFlowAction,
} from "../../redux/actions/cashFlowActions";

export default function HistorialsCashFlow() {
  const { allCashFlow } = useSelector((state) => state.cashFlow);
  const dispatch = useDispatch();

  const handleSearchDate = (e) => {
    e.preventDefault();
    dispatch(searchDateCashFlowAction(e.target.value));
  };

  useEffect(() => {
    dispatch(getAllCashFlowAction());
  }, [dispatch]);
  console.log(allCashFlow);
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
        <label>Buscar por Fecha:</label>
        <input
          type="date"
          name="from"
          onChange={(e) => {
            handleSearchDate(e);
          }}
        />

        <label>Filtrar por Estrella:</label>

        <select name="" id="">
          <option value="All Orders">All Orders</option>
          <option value="pending">1 Estrella</option>
          <option value="doing">2 Estrellas</option>
          <option value="ready">3 Estrellas</option>
          <option value="finished">4 Estrellas</option>
          <option value="finished">5 Estrellas</option>
        </select>
      </div>
      {/* CashFlow List */}
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
          {allCashFlow.length > 0 ? (
            allCashFlow.map((cashFlowBox) => {
              //setTotalSuma(...totalSuma, totalSuma + order.totalOrder);

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
                      gridTemplateColumns: "5% 10% 10% 10% 10% 10% 10%",
                    }}
                  >
                    <span>Id: {cashFlowBox.id}</span>
                    <span>Date: {cashFlowBox.date}</span>
                    <span>Initial Cash: {cashFlowBox.initialCash}</span>

                    <span>Total Sales: {cashFlowBox.totalSales}</span>
                    <span>Incomes: {cashFlowBox.income}</span>
                    <span>Expenses: {cashFlowBox.expenses}</span>
                    <span>
                      Estado:{" "}
                      {cashFlowBox.closeCashFlow
                        ? "Caja Cerrada"
                        : "caja Abierta"}
                    </span>
                  </div>
                  {/* <button
                    onClick={() => {
                      //   setOrderEdit(order);
                      //   setMostrarForm(true);
                    }}
                  >
                    Edit
                  </button> */}
                </div>
              );
            })
          ) : (
            <span
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
              }}
            >
              NO CASH FLOW FOR THIS DATE
            </span>
          )}
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
          {/* Total: ${totalSuma} */}
        </div>
      </div>
      {/* navbar */}
      <div style={{ width: "100%", height: "10vh" }}>
      </div>
    </div>
  );
}
