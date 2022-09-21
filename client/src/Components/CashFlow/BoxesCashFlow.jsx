import React from "react";

export default function BoxesCashFlow({ value, title }) {
  return (
    <div
      style={{
        width: "20%",
        height: "25%",

        backgroundColor: "blueviolet",
        display: "flex",
        flexDirection: "column",
        borderRadius: "20px",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          width: "100%",
          margin: "0 auto",
          backgroundColor: "blueviolet",
          borderRadius: "20px 20px 0 0 ",
          height: "50%",
          textAlign: "center",
          display: "flex",
          alignContent: "center",
          justifyContent: "center",
        }}
      >
        <p>{title}</p>
      </div>
      <div
        style={{
          width: "100%",
          margin: "0 auto",
          backgroundColor: "white",

          borderRadius: "0 0 20px 20px",
          height: "50%",
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        {" "}
        <p>{value}</p>
      </div>
    </div>
  );
}
