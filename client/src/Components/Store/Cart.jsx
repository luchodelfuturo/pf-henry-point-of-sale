import React from "react";
import CartItem from "./CartItem";
import styled from "styled-components";
import "./cart.css";
import { postOrdersAction } from "../../redux/actions/ordersActions";
import { useDispatch } from "react-redux";

function Cart({ products }) {
  let dispatch = useDispatch()
  let confirmMessage = ''
  const totals = products.reduce((acc, curr) => {
    return acc + curr.subTotal;
  }, 0);

  function onSubmit(e) {
    e.preventDefault()
    try{
    dispatch(postOrdersAction(products))
    confirmMessage = 'Se ha realizado el pedido correctamente'
    } catch(error) {
      confirmMessage = 'Se ha producido un error'
    }
  }

  return (
    <div>
      <div className="cart">
        <div className="items">
          <div className="items-header"></div>
          <div className="items">
            {products.length > 0 ? <CartItem AllProducts={products}/> : null}
          </div>
        </div>
        <Checkout>
          <div className="delete-cart">X</div>
          <div className="pay-btn">
            <button onClick={onSubmit}>PAY</button>
            {!confirmMessage ? null : <p>{confirmMessage}</p>}
          </div>
          <div className="totals">
            <div className="total-label">Total</div>
            <div className="total-price">{totals}</div>
          </div>
        </Checkout>
      </div>
    </div>
  );
}

export default Cart;

const Checkout = styled.div`
display: flex;
justify-content: space-between;
align-items: center;

width: 600px;
height: 100px;
`