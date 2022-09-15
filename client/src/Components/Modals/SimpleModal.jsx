import React, { useState } from "react";
import styled from "styled-components";
import { ButtonCart } from "../../theme/styled-componets";
import Swal from "sweetalert2";

export default function Comments() {
  const mensaje = () => {
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Your work has been saved",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  function handleConfirmBtn() {
    // Acciones para el boton OK

    // Opcional -- Mensaje luego de confirm
    mensaje();
  }
  function handleCancelBtn() {
    // Acciones para el boton OK
  }

  return (
    <Overlay>
      <CommentsModal>
        
      </CommentsModal>
    </Overlay>
  );
}

const Overlay = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  background: rgba(33, 33, 33, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
`;

const CommentsModal = styled.div`
  width: 550px;
  height: 400px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
  background: #f6f6f6;
  box-shadow: -5px 0px 9px 2px rgba(0, 0, 0, 0.25);
  border-radius: 25px;
  font-family: "Lato";
`;

