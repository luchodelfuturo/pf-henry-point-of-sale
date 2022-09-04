import React from "react";
import { useHistory } from "react-router-dom";

export default function NavBarApp() {
  const history = useHistory();
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        margin: "auto",
        backgroundColor: "black",
        color: "white",
        display: "flex",
      }}
    >
      <div
        style={{
          width: "60%",
          height: "100%",

          margin: "auto",

          display: "flex",
          alignContent: "center",
          justifyContent: "space-around",
          gap: "10px",
        }}
      >
        <button
          style={{
            width: "100%",
            padding: "10px 30px",
            backgroundColor: "white",
            borderRadius: "10px",
          }}
          onClick={() => history.push("/store")}
        >
          Ventas
        </button>
        <button
          style={{
            width: "100%",

            padding: "10px 30px",
            backgroundColor: "white",
            borderRadius: "10px",
          }}
          onClick={() => history.push("/kitchen")}
        >
          Cocina
        </button>
        <button
          style={{
            width: "100%",
            padding: "10px 30px",
            backgroundColor: "white",
            borderRadius: "10px",
          }}
          onClick={() => history.push("/counter")}
        >
          Pedidos Ready
        </button>
        <button
          style={{
            width: "100%",
            padding: "10px 30px",
            backgroundColor: "white",
            borderRadius: "10px",
          }}
          onClick={() => history.push("/adminProducts")}
        >
          Admin Products
        </button>
      </div>
    </div>
  );
}
