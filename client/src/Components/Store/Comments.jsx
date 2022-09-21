import React, { useState } from "react";
import styled from "styled-components";
import { ButtonCart, Select } from "../../theme/styled-componets";
import { colors } from "../../theme/variables";
import { quickBtns } from "./vars";
import Swal from "sweetalert2";

export default function Comments({ closeModal, comments, setComments }) {
  const [input, setInput] = useState("");
  const [inputBtn, setInputBtn] = useState([]);

  function handleCloseComments() {
    closeModal(false);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setComments(input + " " + inputBtn.join(", "));
    setInput("");
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Comment added",
      showConfirmButton: false,
      timer: 1200,
    });
    closeModal(false);
  }

  function handleInput(e) {
    setInput(e.target.value);
  }

  function handleQuickBtns(e) {
    if (e.target.value !== "Select") {
      setInputBtn([...new Set([...inputBtn, e.target.value])]);
    }
    document.getElementById("select").value = "Select";
  }

  function handleCloseQB(e) {
    console.log(e.target.value);
    const newQBs = inputBtn.filter((q) => q !== e.target.value);
    setInputBtn(newQBs);
  }

  return (
    <Overlay>
      <CommentsModal>
        <div className="select-cont">
          <Select
            className="select"
            defaultValue="Select"
            name=""
            id="select"
            onClick={(e) => handleQuickBtns(e)}
          >
            <option disabled hidden value="Select">
              Quick comment
            </option>
            {quickBtns &&
              quickBtns.map((b) => {
                return (
                  <option value={b} key={b}>
                    {b}
                  </option>
                );
              })}
          </Select>
        </div>
        <div className="comment-section">
          <Textarea
            placeholder="Add a comment:"
            onChange={(e) => handleInput(e)}
          ></Textarea>
          <div className="quick-btns">
            {inputBtn &&
              inputBtn.map((b) => {
                return (
                  <button
                    className="quickbtn"
                    key={b}
                    value={b}
                    onClick={(e) => handleCloseQB(e)}
                  >
                    {b} x
                  </button>
                );
              })}
          </div>
        </div>
        <div className="btns">
          <ButtonCart className="close" onClick={() => handleCloseComments()}>
            Cancel
          </ButtonCart>
          <ButtonCart className="ok" onClick={(e) => handleSubmit(e)}>
            Ok
          </ButtonCart>
        </div>
      </CommentsModal>
    </Overlay>
  );
}

const Overlay = styled.div`
  width: 885px;
  height: 640px;
  position: fixed;
  background: rgba(33, 33, 33, 0.4);
  border-radius: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  //padding: 40px;
  z-index: 10;
`;

const CommentsModal = styled.div`
  width: 550px;
  height: 310px;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: center;
  background: #f6f6f6;
  box-shadow: 4px 0px 9px 3px rgba(0, 0, 0, 0.25);
  border-radius: 25px;
  font-family: "Lato";
  z-index: 11;
  .select-cont {
    display: flex;
    align-self: flex-end;
  }
  .select {
    margin-top: 20px;
    width: 145px;
  }
  .quick-btns {
    display: flex;
    justify-content: flex-start;
    width: 500px;
    min-height: 30px;
    align-items: center;
    padding-top: 10px;
  }
  .quickbtn {
    padding: 5px 8px 5px 8px;
    margin-right: 7px;
    background-color: ${colors.orange};
    border: none;
    border-radius: 5px;
    font-weight: 600;
    font-size: 14px;
    cursor: pointer;
    color: #5a4129;
  }
  .comment-section {
    display: flex;
    flex-direction: column;
    align-items: center;
  
  }
  .btns {
    margin-top: 10px;
    width: 400px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: space-around;
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

const Textarea = styled.textarea`
font-family: Lato;
  min-width: 500px;
  min-height: 90px;
  max-width: 500px;
  max-height: 150px;
  margin-top: 20px;
  border-radius: 5px;
  padding: 5px;
  font-size: 20px;
`;
