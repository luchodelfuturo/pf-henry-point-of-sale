import React, { useCallback, useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { ButtonCart, Select } from "../../theme/styled-componets";
import { colors } from "../../theme/variables";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PayPal from "../PayPal/PayPal";
import {
  faCommentDots,
  faDeleteLeft,
  faMoneyBill,
  faPercent,
  faRug,
} from "@fortawesome/free-solid-svg-icons";
import { faPaypal } from "@fortawesome/free-brands-svg-icons";
import Swal from "sweetalert2";
import Comments from "../Store/Comments";
import { discounts, cupons } from "../Store/vars";

const Modal = ({
  total,
  sch,
  comments,
  setComments,
  postOrder,
  setMethodPayment,
}) => {
  const [payment, setPayment] = useState("cash");
  const [cash, setCash] = useState("0");
  const [change, setChange] = useState(0);
  const [disc, setDisc] = useState(0);
  const [modalComments, setModalComments] = useState(false);
  const [cupon, setCupon] = useState(0);

  const calcChange = useCallback(
    () =>
      setChange(
        (cash - total + (total * cupon) / 100 + (total * disc) / 100).toFixed(2)
      ),
    [cash, total, disc, cupon]
  );
  //   const calcChange = useCallback(
  //     () => setChange((cash - total - (disc * total) / 100).toFixed(2)),
  //     [cash, total, disc]
  //   );

  const inputEl = useRef();

  useEffect(() => {
    if (cash === "") {
      setCash("0");
    }

    calcChange();
  }, [calcChange, cash]);

  function handlePayment(e) {
    setPayment(e.target.value);
    setMethodPayment(e.target.value);
  }

  function handleClick(e) {
    if (cash === "0") {
      setCash(e.target.value);
    } else {
      setTimeout(() => {
        setCash(cash + e.target.value);
      }, 50);
    }
  }

  function handleErase(e) {
    if (cash.length > 0 && cash > 0) {
      setCash(cash.length !== 0 ? cash.slice(0, -1) : "0");
      if (cash.length === 0) {
        setCash("0");
      }
    } else if (cash === "") {
      setCash("0");
    }
  }

  function handleClose(e) {
    if (e.target.value === "close") {
      sch(false);
    }
    if (e.target.id === "overlay") {
      sch(false);
    }
  }

  function handleComments() {
    setModalComments(true);
  }

  const postToast = () => {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });

    Toast.fire({
      icon: "success",
      title: "Order placed",
    });
  };

  function handlePost() {
    sch(false);
    postOrder();
    setTimeout(() => {
      postToast();
    }, 500);
  }

  function handleDisc(e) {
    if (e.target.value !== "none") {
      setDisc(e.target.value);
    } else {
      setDisc(0);
    }
  }

  function handleCupons(e) {
    if (e.target.value !== "none") {
      setCupon(e.target.value);
    } else {
      setCupon(0);
    }
  }

  return (
    <>
      <Overlay id="overlay" onClick={(e) => handleClose(e)}>
        {modalComments && (
          <Comments
            closeModal={setModalComments}
            comments={comments}
            setComments={setComments}
          />
        )}
        <ModalContainer>
          <ModalHeader>
            <TabBtn value="cash" onClick={(e) => handlePayment(e)}>
              <FontAwesomeIcon
                icon={faMoneyBill}
                style={{ width: 30, height: 30 }}
              />{" "}
              Cash
            </TabBtn>
            <TabBtn value="paypal" onClick={(e) => handlePayment(e)}>
              <FontAwesomeIcon
                icon={faPaypal}
                style={{ width: 30, height: 30 }}
              />{" "}
              Paypal
            </TabBtn>
          </ModalHeader>
          {payment === "cash" ? (
            <PaymentBody>
              <div className="operations">
                <div className="display-sum">
                  <Sum>
                    <div className="titles">
                      <div>Total</div>
                      <div className="cash">Cash</div>
                      <div>Cupon</div>
                      <div>Discount</div>
                      <div>Change</div>
                    </div>

                    <div className="vulues-cont">
                      <div className="signs">
                        <div>$</div>
                        <div className="cash">$</div>
                        <div className="cupon-sing">-</div>
                        <div>%</div>
                        <div>$</div>
                      </div>
                      <div className="totals">
                        <div className="total">{total.toFixed(2)}</div>
                        <div className="cash">{Number(cash).toFixed(2)}</div>

                        <Select
                          className="select"
                          defaultValue="Select"
                          id="select"
                          onClick={(e) => handleCupons(e)}
                        >
                          {/* <option
                              disabled
                              hidden
                              value="Select"
                              className="option-select"
                            >
                              Cupons
                            </option> */}
                          <option value="none" className="option-select">
                            ----
                          </option>
                          {cupons &&
                            cupons.map((b) => {
                              return (
                                <option
                                  // onClick={(e) => handleDisc(e)}
                                  className="select-items"
                                  value={b.value}
                                  key={b.name}
                                >
                                  {b.name}
                                </option>
                              );
                            })}
                        </Select>

                        <Select
                          className="select"
                          defaultValue="Select"
                          name=""
                          id="select"
                          onClick={(e) => handleDisc(e)}
                        >
                          <option value="none" className="option-select">
                            ----
                          </option>
                          {discounts &&
                            discounts.map((b) => {
                              return (
                                <option
                                  className="select-items"
                                  value={b}
                                  key={b}
                                >
                                  {b}
                                </option>
                              );
                            })}
                        </Select>

                        <div className="change">{change}</div>
                      </div>
                    </div>
                  </Sum>
                </div>
                <div>
                  <Buttons>
                    <div className="spacer">
                      <NumBtn value="1" onClick={(e) => handleClick(e)}>
                        1
                      </NumBtn>
                      <NumBtn value="2" onClick={(e) => handleClick(e)}>
                        2
                      </NumBtn>
                      <NumBtn value="3" onClick={(e) => handleClick(e)}>
                        3
                      </NumBtn>
                    </div>
                    <div className="spacer">
                      <NumBtn value="4" onClick={(e) => handleClick(e)}>
                        4
                      </NumBtn>
                      <NumBtn value="5" onClick={(e) => handleClick(e)}>
                        5
                      </NumBtn>
                      <NumBtn value="6" onClick={(e) => handleClick(e)}>
                        6
                      </NumBtn>
                    </div>
                    <div className="spacer">
                      <NumBtn value="7" onClick={(e) => handleClick(e)}>
                        7
                      </NumBtn>
                      <NumBtn value="8" onClick={(e) => handleClick(e)}>
                        8
                      </NumBtn>
                      <NumBtn value="9" onClick={(e) => handleClick(e)}>
                        9
                      </NumBtn>
                    </div>
                    <div className="spacer">
                      <NumBtn value="." onClick={(e) => handleClick(e)}>
                        .
                      </NumBtn>
                      <NumBtn value="0" onClick={(e) => handleClick(e)}>
                        0
                      </NumBtn>

                      <FontAwesomeIcon
                        className="eraser"
                        icon={faDeleteLeft}
                        style={{ width: 30, height: 30 }}
                        onClick={() => handleErase()}
                      />
                    </div>
                  </Buttons>
                </div>
              </div>

              <div className="footer-buttons">
                <ButtonCart className="desc" onClick={() => handleComments()}>
                  <FontAwesomeIcon
                    icon={faCommentDots}
                    style={{ width: 35, height: 35 }}
                  />
                </ButtonCart>

                <ButtonCart
                  className="close"
                  value="close"
                  onClick={(e) => handleClose(e)}
                >
                  Cancel
                </ButtonCart>
                <ButtonCart className="pay" onClick={() => handlePost()}>
                  PAY
                </ButtonCart>
              </div>
            </PaymentBody>
          ) : (
            <PaymentBody className="paypal-body">
              <div className="paypal-cont">
                <PayPal />
              </div>
              <div className="footer-buttons">
                <ButtonCart className="desc-relative">
                  <FontAwesomeIcon
                    onClick={() => handleComments()}
                    icon={faCommentDots}
                    style={{ width: 35, height: 35 }}
                  />
                </ButtonCart>
                <ButtonCart
                  className="close"
                  value="close"
                  onClick={(e) => handleClose(e)}
                >
                  Cancel
                </ButtonCart>
              </div>
            </PaymentBody>
          )}
        </ModalContainer>
      </Overlay>
    </>
  );
};

export default Modal;

const Overlay = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  background: rgba(33, 33, 33, 0.88);
  backdrop-filter: blur(2px);
  display: flex;
  align-items: center;
  justify-content: center;
  //padding: 40px;
  z-index: 6;
`;

const ModalContainer = styled.div`
  width: 885px;
  height: 640px;
  background: #f6f6f6;
  box-shadow: -5px 0px 9px 2px rgba(0, 0, 0, 0.25);
  border-radius: 35px;
  font-family: "Lato";
  z-index: 7;
  /* transform: scale(0.9);
  transition: all 0.3s ease;
  &:focus {
    transform: scale(0.9);
    transition: all 0.3s ease;
  } */
`;

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 83px;

  margin-bottom: 20px;

  border-bottom: 1px solid #e8e8e8;

  h3 {
    font-weight: 500;
    font-size: 16px;
    color: black;
  }
`;

const TabBtn = styled.button`
  background-color: inherit;
  font-weight: 500;
  font-size: 32px;
  border: none;
  outline: none;
  cursor: pointer;
  //padding: 14px 16px;
  transition: 0.1s ease;
`;

const PaymentBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  width: 885px;
  height: 503px;

  .operations {
    display: flex;
    justify-content: space-between;
    padding-right: 80px;
    height: 365px;
    .display-sum {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      position: relative;
      background-color: #e1e1e1;
      box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
      width: 484px;
      height: 365px;
    }
  }

  .paypal-body {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .paypal-cont {
    margin: auto;
  }

  .desc {
    background-color: ${colors.blue};
    width: 83px;
    height: 71px;

    color: white;
  }
  .cupon {
    background-color: ${colors.orange};
    color: black;
    width: 83px;
    height: 71px;
    position: absolute;
    bottom: 10px;
    left: 110px;
  }
  .discount {
    background-color: ${colors.yellow};
    color: black;
    width: 83px;
    height: 71px;
    position: absolute;
    bottom: 10px;
    left: 215px;
  }

  .selects {
    display: flex;
    flex-direction: column;
    align-content: center;
    //align-items: center;
    width: 160px;
    //align-self: auto;
    //margin-left: 0px;
  }
  .cupon-div {
    display: flex;
    align-self: flex-end;
    font-size: 18px;
    height: 30px;
    width: 130px;
    //font-size: 32px;
    background-color: inherit;
    border: none;
    text-align: right;
    padding-bottom: 15px;
    //margin-right: 25px;
    background-color: black;
  }
  .disc-div {
    display: flex;
    align-self: flex-end;

    font-size: 18px;
    height: 30px;
    width: 130px;
    //font-size: 32px;
    background-color: inherit;
    border: none;
    text-align: right;
    padding-bottom: 15px;
    //margin-right: 25px;
  }
  .cupon-sing {
    color: #e1e1e1;
  }
  .select {
    display: flex;
    align-self: flex-start;
    border: none;
    //background-color: inherit;
    font-size: 20px;
    text-align: right;
    width: 130px;

    .select-items {
      background-color: inherit;
    }
  }

  .desc-relative {
    background-color: ${colors.blue};
    width: 83px;
    height: 71px;
    bottom: 10px;
    left: 10px;
    color: white;
  }
  .footer-buttons {
    display: flex;
    justify-content: space-evenly;
    width: 850px;
  }
  .close {
    background-color: ${colors.red};
    font-weight: 700;
    color: ${colors.dred};
    font-size: 30px;
    width: 260px;
    height: 71px;
  }
  .pay {
    background-color: ${colors.lgreen};
    font-weight: 700;
    color: ${colors.dgreen};
    font-size: 30px;
    width: 261px;
    height: 71px;
  }
`;

const Sum = styled.div`
  display: flex;
  justify-content: space-between;
  overflow-x: hidden;
  width: 484px;
  height: 365px;
  padding-top: 10px;
  color: ${colors.grey5};
  font-weight: 500;
  //background-color: aquamarine;

  .vulues-cont {
    display: flex;
    justify-content: space-between;
  }
  .totals {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;

    width: 130px;
    padding-right: 10px;
    margin-right: 10px;
    text-align: right;
    font-size: 32px;
    //height: 250px;
  }
  .titles {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    padding-left: 30px;
    font-size: 32px;
    //height: 250px;
  }
  .signs {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    font-size: 24px;
    padding-right: 40px;
  }
  .cash {
    color: black;
  }
  .total {
  }
  .change {
    border-top: 1px dashed #7c7b7b;
    width: 130px;
  }
  .discount {
    font-size: 32px;
    background-color: inherit;
    border: none;
    text-align: right;
  }
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 264px;
  height: 300px;
  margin-bottom: 140px;

  .spacer {
    display: flex;
    justify-content: space-between;
    width: 264px;
    padding-right: 40px;
  }

  .eraser {
    display: flex;
    padding: 25px 25px 25px 25px;
    margin: 15px 30px 15px 15px;
    font-weight: 500;
    cursor: pointer;
    width: 70px;
    height: 70px;
    font-size: 30px;
    align-items: center;
    border: none;
    border-radius: 50%;
    background-color: #f6f6f6;
    color: #9c9c9c;
  }
`;

const NumBtn = styled.button`
  display: flex;
  padding: 25px;
  margin: 15px 30px 15px 15px;
  font-weight: 500;
  cursor: pointer;
  width: 70px;
  height: 70px;
  font-size: 30px;
  align-items: center;
  border: none;
  border-radius: 50%;
  background-color: #f6f6f6;
  color: #9c9c9c;
  &:active {
    transition: all 0.1s ease;
    transform: scale(0.8);
    background: rgba(33, 33, 33, 0.15);
  }
`;
