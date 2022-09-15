import Swal from "sweetalert2";
import React from "react";

export default function Modal() {
  const openComments = async () => {
    await Swal.fire({
      //   input: "numberarea",
      //   inputLabel: "Income",
      //   inputPlaceholder: "Ingreso...",
      input: "textarea",
      inputLabel: "Message",
      inputPlaceholder: "Type your message here...",
      inputAttributes: {
        "aria-label": "Type your message here",
      },
      showCancelButton: true,
      confirmButtonColor: "#31d159",
    });
  };
  return (
    <div>
      <button onClick={openComments}>Ingreso</button>
      <button onClick={openComments}>Egreso</button>
    </div>
  );
}
