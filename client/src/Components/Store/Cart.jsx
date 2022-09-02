import React, { useContext } from "react";
import StoreContext from "../../GlobalStates/StoreContext";
import CartItem from "./CartItem";

function Cart({ products }) {
  const { idProducts } = useContext(StoreContext);

  let currCart = [];

  currCart = idProducts.map((e) => {
    let product = products.find((f) => f.id === e);


    //console.log(product)
    
    //if (product.id === products.id) console.log("igual")
    return {
      ...currCart,
      product,
    };
  });

//console.log(currCart)

  return (
    <div>
      <div className="cart-container">
        <div className="items">
          <div className="items-header"></div>
          <div className="items">
            {currCart.length > 0 ? <CartItem currCart={currCart} /> : null}
          </div>
        </div>
        <div className="checkout"></div>
      </div>
    </div>
  );
}

export default Cart;
