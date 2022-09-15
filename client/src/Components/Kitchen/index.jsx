import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getTotalCashAction,
  getTotalPaypalAction,
} from "../../redux/actions/ordersActions";
import NavBarApp from "../NavbarApp/NavBarApp";
import Orders from "../Orders";

function Kitchen() {
  const { totalCash, totalPaypal } = useSelector((state) => state.orders);
  const [income, setIncome] = useState(window.localStorage.getItem("income"));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTotalCashAction());
    dispatch(getTotalPaypalAction());
  }, [dispatch]);

  const setLocalStorage = (value) => {
    try {
      setIncome(value);
      window.localStorage.setItem("income", value);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <p>s</p>
      <br />
      <form>
        <input
          type="number"
          onChange={(e) => setLocalStorage(e.target.value)}
          value={income}
          placeholder="probando pipii"
        />
      </form>
      <p>s</p>
      <br />
      <p>total with cash: {totalCash?.totalCash}</p>
      <p>total with paypal:{totalPaypal?.totalPaypal}</p>
      <p>income:</p>
      <p>expense:</p>
      <p>total : {totalCash?.totalCash + totalPaypal?.totalPaypal}</p>
      <Orders />
      <NavBarApp />
    </div>
  );
}

export default Kitchen;
