import React, { useContext } from "react";
import { useDispatch } from "react-redux";
import { postOrdersAction } from "../../redux/actions/ordersActions";
import StoreContext from "../../GlobalStates/StoreContext";
import ReactDOM from "react-dom";
const PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });
export default function PayPal() {
  const { order } = useContext(StoreContext);
  const dispatch = useDispatch();
  function createOrder(data, actions) {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: "50", //aqui el valor total de la orden
          },
        },
      ],
    });
  }
  function onApprove(data, actions) {
    return actions.order.capture().then((data) => console.log(data));
  }

  function onSubmitPayPal(e) {
    // e.preventDefault();
    dispatch(postOrdersAction(order)); //la misma action que se usa en el componente Cart
  }
  return (
    <div>
      <PayPalButton
        createOrder={(data, actions) => createOrder(data, actions)}
        onApprove={(data, actions) => onApprove(data, actions)}
        style={{
          layout: "vertical",
          color: "gold",
          shape: "rect",
          tagline: false,
          shape: "pill",
          height: 40,
        }}
        onClick={onSubmitPayPal}
      />
    </div>
  );
}
