import React, { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { postOrdersAction } from "../../redux/actions/ordersActions";
import StoreContext from "../../GlobalStates/StoreContext";
import Swal from "sweetalert2";
import ReactDOM from "react-dom";
import { icon } from "@fortawesome/fontawesome-svg-core";
import axios from "axios";
const PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });
export default function PayPal() {
  const { order, totals } = useContext(StoreContext);

  const [dolarBlue, setDolarBlue] = useState();
  const dispatch = useDispatch();

  // const llamadaDolar = async () => {
  //   const valorDolar = await axios
  //     .get("https://api-dolar-argentina.herokuapp.com/api/dolarblue")
  //     .then((res) => console.log("dolar api:", res.data));
  // };

  function getAllRequest() {
    axios
      .get("https://api.bluelytics.com.ar/v2/latest")
      .then(function (response) {
        const dolarBlue = parseInt(response.data.blue.value_buy);
        setDolarBlue(dolarBlue);
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {});
  }

  useEffect(() => {
    getAllRequest();
  }, []);
  const cambioDolar = Math.round(totals / (dolarBlue ? dolarBlue : 280));

  function createOrder(data, actions) {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: cambioDolar, //aqui el valor total de la orden
          },
        },
      ],
    });
  }
  function onApprove(data, actions) {
    actions.order.capture().then(() => modal());
    // actions.redirect('http://localhost:3000/store');
  }

  function onSubmitPayPal(e) {
    // e.preventDefault();
    dispatch(postOrdersAction(order)); //la misma action que se usa en el componente Cart
  }
  function modal() {
    Swal.fire({
      icon: "success",
      title: "Successful Payment",
    });
  }
  return (
    <div>
      <PayPalButton
        createOrder={(data, actions) => createOrder(data, actions)}
        onApprove={(data, actions) => {
          onApprove(data, actions);
          onSubmitPayPal();
        }}
        style={{
          layout: "vertical",
          color: "gold",
          shape: "rect",
          tagline: false,
          shape: "pill",
          height: 40,
        }}
      />
    </div>
  );
}

//apKey =VVDC4yWz15iNQItZFesTcy55QHjLs6AP
