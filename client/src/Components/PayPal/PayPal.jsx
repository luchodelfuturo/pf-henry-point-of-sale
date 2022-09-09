import React from "react";
import { useDispatch } from "react-redux";
import { postOrderPaypal } from "../../redux/actions/ordersActions";
import ReactDOM from "react-dom"
const PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });
export default function PayPal (){

  const dispatch = useDispatch()
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
    return actions.order.capture().then(data=>console.log(data));
  }

  function onSubmitPayPal(e){
    // e.preventDefault();
    dispatch(postOrderPaypal())
  }
    return (
    <div style={{width: "2rem"}}>
      <PayPalButton
        createOrder={(data, actions) => createOrder(data, actions)}
        onApprove={(data, actions) => onApprove(data, actions)}
        style={{
          layout: 'vertical',
          color:  'gold',
          shape:  'rect',
          tagline: false,
          shape: "pill",
          height: 40,
        }}
        onClick={onSubmitPayPal}
        
      /></div>
    );
}
