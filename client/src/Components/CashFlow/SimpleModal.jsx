import React, { useState } from "react";
import styled from "styled-components";
import { ButtonCart } from "../../theme/styled-componets";
import { colors } from "../../theme/variables";
import Swal from "sweetalert2";

export default function Comments() {
  const mensaje = () => {
    Swal.fire({
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
        <div></div>
        <div className="btns">
          <ButtonCart className="close">Cancel</ButtonCart>
          <ButtonCart className="ok">Ok</ButtonCart>
        </div>
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

  .btns {
    margin-top: 10px;
    width: 400px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding-bottom: 10px;
  }

  .close {
    background-color: ${colors.red};
    font-weight: 600;
    color: ${colors.dred};
    font-size: 16px;
    width: 150px;
    height: 40px;
  }
  .ok {
    background-color: ${colors.lgreen};
    font-weight: 600;
    color: ${colors.dgreen};
    font-size: 16px;
    width: 150px;
    height: 40px;
  }
`;
