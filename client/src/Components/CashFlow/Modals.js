import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addIncomeAction } from "../../redux/actions/ordersActions";
import { useModal } from "../Hooks/useModal";
import Modal from "./Modal";

const Modals = () => {
  const dispatch = useDispatch();
  const [ingreso, setIngreso] = useState({
    amount: 0,
    comment: "",
  });
  const [egreso, setEgreso] = useState({
    amount: 0,
    comment: "",
  });
  const [isOpenModalIncome, openModalIncome, closeModalIncome] =
    useModal(false);
  const [isOpenModalExpense, openModalExpense, closeModalExpense] =
    useModal(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addIncomeAction(ingreso.amount));
  };

  return (
    <div>
      <button onClick={openModalIncome}>Ingreso</button>
      <Modal isOpen={isOpenModalIncome} closeModal={closeModalIncome}>
        <h2>Agregue un monto y motivo de ingreso</h2>
        <form onSubmit={handleSubmit}>
          <label>
            {" "}
            Monto:
            <input
              type="number"
              placeholder="monto"
              onChange={(e) =>
                setIngreso({
                  ...ingreso,
                  amount: e.target.value,
                })
              }
            />
          </label>
          <label>
            {" "}
            Motivo:
            <input
              type="text"
              placeholder="motivo"
              onChange={(e) =>
                setIngreso({
                  ...ingreso,
                  comment: e.target.value,
                })
              }
            />
          </label>
          <input
            type="submit"
            value="Agregar ingreso"
            onClick={closeModalIncome}
          />
        </form>
      </Modal>
      <button onClick={openModalExpense}>Egreso</button>
      <Modal isOpen={isOpenModalExpense} closeModal={closeModalExpense}>
        <h2>Agregue un monto y motivo de egreso</h2>
        <form>
          <label>
            {" "}
            Monto:
            <input type="number" placeholder="monto" />
          </label>
          <label>
            {" "}
            Motivo:
            <input type="text" placeholder="motivo" />
          </label>
          <input type="submit" value="Agregar egreso" />
        </form>
      </Modal>
    </div>
  );
};

export default Modals;
