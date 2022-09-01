import React from "react";
import styled from "styled-components";

const CartItem = ({ currCart }) => {
  return (
    <>
      {currCart &&
        currCart.map((p, i) => (
          <Item key={i}>
            <div className="div-container">
              <div className="qty">1</div>
              <div className="product-info">
                <div className="cat">{p.product.cat}</div>
                <div className="name">{p.product.name}</div>
              </div>
              <div className="qty-changer">
                <button className="btn-decr">{"<"}</button>
                <button className="btn-incr">{">"}</button>
              </div>
              <div className="price">$2700</div>
              <div className="delete-item">X</div>
            </div>
          </Item>
        ))}
    </>
  );
};

export default CartItem;

const Item = styled.div`
  display: flex;
  flex-direction: column;
  color: white;
  background-color: blue;
  .div-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 83px;
  }
  .qty {
    width: 57px;
    text-align: center;
  }
  .product-info {
    text-align: start;
    min-width: 157px;
  }
  .qty-changer {
    width: 166px;
    .btn-decr{
        width: 83px;
        height: 83px;
    }
    .btn-incr{
        width: 83px;
        height: 83px;
    }
  }
  .price {
    width: 112px;
    text-align: center;
  }
  .delete-item{
    width: 50px;
    text-align: center;
  }
`;
