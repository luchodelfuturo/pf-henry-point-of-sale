import React from "react";
import CartItem from "./CartItem";
import styled from "styled-components";
import "./cart.css";

function Cart({ products }) {
  const totals = products.reduce((acc, curr) => {
    return acc + curr.subTotal;
  }, 0);


  return (
    <div>
      <div className="cart">
        <div className="items">
          <div className="items-header"></div>
          <div className="items">
            {products.length > 0 ? <CartItem AllProducts={products} /> : null}
          </div>
        </div>
        <Checkout>
          <div className="delete-cart">X</div>
          <div className="pay-btn">
            <button>PAY</button>
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