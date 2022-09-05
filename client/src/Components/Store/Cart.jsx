import React, { useContext } from "react";
import StoreContext from "../../GlobalStates/StoreContext";
import CartItem from "./CartItem";
import styled from "styled-components";
import "./cart.css";
import { postOrdersAction } from "../../redux/actions/ordersActions";
import { useDispatch } from "react-redux";

function Cart({ products }) {
  const { deleteAll, sendOrder, order } = useContext(StoreContext);

  let dispatch = useDispatch();
  let confirmMessage = "";

  const totals = products.reduce((acc, curr) => {
    return acc + curr.subTotal;
  }, 0);



  function onSubmit(e) {
    e.preventDefault();
    sendOrder();
    try {
      
      console.log(JSON.stringify(order))
      dispatch(postOrdersAction(order));
      confirmMessage = "Se ha realizado el pedido correctamente";
    } catch (error) {
      confirmMessage = "Se ha producido un error";
    }
  }

  function handleDeleteAll() {
    deleteAll();
  }

  return (
    <div>
      <div className="cart">
        <div className="items">
          <div className="items-header">
            <div className="items-header-qty">qty.</div>
            <div className="items-header-prod">Products</div>
            <div className="items-header-sub">Sub-total</div>
          </div>
          <div className="items">
            {products.length > 0 ? <CartItem AllProducts={products} /> : null}
          </div>
        </div>
        {products.length > 0 ? (
          <Checkout>
            <button className="delete-cart" onClick={() => handleDeleteAll()}>
              X
            </button>
            <div className="pay-btn">
              <button className="checkout-btn" onClick={onSubmit}>
                PAY
              </button>
              {!confirmMessage ? null : <p>{confirmMessage}</p>}
            </div>
            <div className="totals">
              <div className="total-label">Total</div>
              <div className="total-price">${totals}</div>
            </div>
          </Checkout>
        ) : null}
      </div>
    </div>
  );
}

export default Cart;

const Checkout = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  background: #eaeaea;
  box-shadow: 4px 6px 9px -4px rgba(0, 0, 0, 0.25);
  border-radius: 0px 20px 20px 0px;
  width: 600px;
  height: 100px;
  .checkout-btn {
    font-weight: 700;
    font-size: 32px;
    width: 280px;
    height: 83px;
    margin-left: 17px;
    background: #ffffff;
    border: 2px solid #000000;
    box-shadow: 4px 2px 9px -1px rgba(0, 0, 0, 0.25);
    border-radius: 36px;
  }
  .delete-cart {
    font-weight: 600;
    text-align: center;
    font-size: 28px;
    padding-top: 5px;
    color: #ff4f58;
    background-color: #eaeaea;
    width: 58px;
    height: 61px;
    border: 2px solid #ff4d57;
    box-shadow: 4px 2px 9px -1px rgba(0, 0, 0, 0.25);
    border-radius: 41px;
    margin-left: 75px;
  }

  .totals {
    display: flex;
    flex-direction: column;
  }
  .total-label {
    color: #604f4f;
    font-weight: 700;
    font-size: 20px;
  }
  .total-price {
    width: 157px;
    height: 38px;

    font-weight: 700;
    font-size: 32px;

    text-align: center;
  }
`;
