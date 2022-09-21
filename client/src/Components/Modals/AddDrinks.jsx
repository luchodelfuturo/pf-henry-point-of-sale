import React, { useState } from "react";
import styled from "styled-components";
import { ButtonCart } from "../../theme/styled-componets";
import { colors } from "../../theme/variables";
import Swal from "sweetalert2";

export default function AddDrinks({ setModalState, setCheckout, df }) {
  // const mensaje = () => {
  //   Swal.fire({
  //     position: "center",
  //     icon: "success",
  //     title: "Cart cleared",
  //     showConfirmButton: false,
  //     timer: 1000,
  //   });
  // };

  function handleConfirmBtn() {
    df("drinks")
    setModalState(false);
    
    // mensaje();
  }
  function handleCancelBtn(e) {
    if (e.target.id === "overlay") {
      setModalState(false);
    }
  }

  function handleContinue(){
    setCheckout(true)
    setModalState(false);
  }

  return (
    <Overlay id="overlay" onClick={(e) => handleCancelBtn(e)}>
      <CommentsModal>
        <div className="message">
          <h2>You are ordering without any drink, <br /> do you want to add some?</h2>
        </div>
        <div className="btns">
          <ButtonCart
            className="close"
            value="close"
            onClick={() => handleContinue()}
          >
            No, continue
          </ButtonCart>
          <ButtonCart className="ok" onClick={() => handleConfirmBtn()}>
            Yes, please
          </ButtonCart>
        </div>
      </CommentsModal>
    </Overlay>
  );
}

const Overlay = styled.div`
  width: 100vw;
  height: 100vh;
  position: absolute;
  background: rgba(33, 33, 33, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 5;
`;

const CommentsModal = styled.div`
  width: 550px;
  height: 200px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: center;
  background-color: blue;
  flex-direction: column;
  align-items: center;
  background: #f6f6f6;
  box-shadow: -5px 0px 9px 2px rgba(0, 0, 0, 0.25);
  border-radius: 25px;
  font-family: "Lato";

  .message {
    //font-size: 22px;
    font-weight: 600;
    width: 500px;
    height: 100px;
text-align: center;
    //line-height: 200px;
  }

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
    background-color: ${colors.blue};
    font-weight: 600;
    color: ${colors.white};
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
