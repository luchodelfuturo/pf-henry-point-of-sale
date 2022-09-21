import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
    addExpenseAction,
    addIncomeAction,
    getLastCashFlowAction,
    addCashInitAction,
} from "../../redux/actions/cashFlowActions.js";
import { useModal } from "../Hooks/useModal";
import Modal from "./Modal";

const Modals = ({ lastCashFlow }) => {
    const dispatch = useDispatch();
    const [ingreso, setIngreso] = useState({
        amount: 0,
        comment: "",

    });
    const [egreso, setEgreso] = useState({
        amount: 0,
        comment: "",
    });
    const [iniciarButton, setIniciarButton] = useState(true)

    const [init, setInit] = useState(0);

    const [isOpenModalIncome, openModalIncome, closeModalIncome] =
        useModal(false);
    const [isOpenModalExpense, openModalExpense, closeModalExpense] =
        useModal(false);
    const [isOpenModalInit, openModalInit, closeModalInit] = useModal(false);

    const handleSubmitIncome = (e) => {
        // e.preventDefault();

        dispatch(addIncomeAction(ingreso));
        closeModalIncome();
    };
    const handleSubmitExpense = (e) => {
        // e.preventDefault();
        if (lastCashFlow.totalCashRegister - egreso.amount >= 0) {
            dispatch(addExpenseAction(egreso));
        }
        else {
            alert("no se puede xd")
        }
        // closeModalExpense();
    };

    const handleSubmitInicioDeCaja = (e) => {
        setIniciarButton(false);
        dispatch(addCashInitAction(init));


        closeModalInit();

    };

    // useEffect(() => {
    //     if (lastCashFlow && lastCashFlow.length === 0) {
    //         console.log("HOLAAAAA")
    //         setIniciarButton(true)
    //     }
    // }, [dispatch])


    return (
        <div>
            {iniciarButton && <button onClick={openModalInit}>Iniciar caja</button>}
            <Modal isOpen={isOpenModalInit} closeModal={closeModalInit}>
                <h2>Agregue un monto para su inicio de caja</h2>
                <form onSubmit={() => {
                    setIniciarButton(false)
                    handleSubmitInicioDeCaja()
                }}>
                    <label>
                        {" "}
                        Monto:
                        <input
                            type="number"
                            placeholder="monto"
                            onChange={(e) => setInit(e.target.value)}
                        />
                    </label>

                    <input type="submit" value="Inicio de caja" />
                </form>
            </Modal>
            {lastCashFlow && !lastCashFlow.closeCashFlow && <button onClick={openModalIncome}>Ingreso</button>}
            <Modal isOpen={isOpenModalIncome} closeModal={closeModalIncome}>
                <h2>Agregue un monto y motivo de ingreso</h2>
                <form onSubmit={handleSubmitIncome}>
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
            {lastCashFlow && !lastCashFlow.closeCashFlow && <button onClick={openModalExpense}>Egreso</button>}
            <Modal isOpen={isOpenModalExpense} closeModal={closeModalExpense}>
                <h2>Agregue un monto y motivo de egreso</h2>
                <form onSubmit={handleSubmitExpense}>
                    <label>
                        {" "}
                        Monto:
                        <input
                            type="number"
                            placeholder="monto"
                            onChange={(e) =>
                                setEgreso({
                                    ...egreso,
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
                                setEgreso({
                                    ...egreso,
                                    comment: e.target.value,
                                })
                            }
                        />
                    </label>
                    <input type="submit" value="Agregar egreso" />
                </form>
            </Modal>
        </div>
    );
};

export default Modals;
