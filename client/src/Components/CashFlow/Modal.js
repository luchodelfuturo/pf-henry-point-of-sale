// import Swal from "sweetalert2";
// import React from "react";

// export default function Modal() {
//   const openComments = async () => {
//     await Swal.fire({
//       //   input: "numberarea",
//       //   inputLabel: "Income",
//       //   inputPlaceholder: "Ingreso...",
//       input: "textarea",
//       inputLabel: "Message",
//       inputPlaceholder: "Type your message here...",
//       inputAttributes: {
//         "aria-label": "Type your message here",
//       },
//       showCancelButton: true,
//       confirmButtonColor: "#31d159",
//     });
//   };
//   const openComments2 = () => {
//     prompt("Enter something<br>...smart :)");
//     function pepe(value) {
//       alert(value);
//     }
//   };
//   const pepe = () => {
//     openComments2();
//   };
//   return (
//     <div>
//       <button onClick={pepe}>Ingreso</button>
//       <button onClick={pepe}>Egreso</button>
//     </div>
//   );
// }
// import { ModalIsOpen, ModalContainer, ModalClose } from "./styledModal";
import "./Modal.css";

const Modal = ({ children, isOpen, closeModal }) => {
  const handleModalContainerClick = (e) => e.stopPropagation();
  return (
    // <ModalIsOpen>
    //   <ModalContainer>
    //     <ModalClose>X</ModalClose>
    //     {children}
    //   </ModalContainer>
    // </ModalIsOpen>

    <article className={`modal ${isOpen && "is-open"}`} onClick={closeModal}>
      <div className="modal-container" onClick={handleModalContainerClick}>
        <button className="modal-close" onClick={closeModal}>
          X
        </button>
        {children}
      </div>
    </article>
  );
};

export default Modal;
