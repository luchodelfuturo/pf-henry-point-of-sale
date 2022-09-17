import styled from "styled-components";

export const ModalContainer = styled.div`
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  width: 100%;
  min-height: 100vh;
  background-color: black;
  color: white;
  display: none;
`;
export const ModalIsOpen = styled.article`
  display: flex;
`;
export const ModalClose = styled.button``;
