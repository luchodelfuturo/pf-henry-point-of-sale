import React, { useState } from "react";
import styled from "styled-components";
import { ButtonCart } from "../../theme/styled-componets";
import Swal from "sweetalert2";

export default function Comments({ closeModal, comments, setComments }) {
  const [input, setInput] = useState("");

  
 
 


  function handleCloseComments() {
    closeModal(false);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setComments(input);
    setInput("")
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Your work has been saved',
      showConfirmButton: false,
      timer: 1500})
    //closeModal(false);
    
  }

  function handleInput(e) {
    setInput(e.target.value);

  }

  return (
    <Overlay>
      <CommentsModal>
        <form onSubmit={handleSubmit}>
          <Textarea
            placeholder="Add a comment:"
            onChange={(e) => handleInput(e)}
          ></Textarea>
          <div>Buttons</div>
          <button type="submit">Ok</button>
          <button onClick={() => handleCloseComments()}>Cancel</button>
        </form>
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

const Textarea = styled.textarea`
  min-width: 500px;
  min-height: 150px;
  max-width: 500px;
  max-height: 150px;
  margin-top: 20px;
  border-radius: 5px;
  padding: 5px;
`;
