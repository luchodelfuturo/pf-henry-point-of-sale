import React, { useEffect, useContext } from "react";
import { useDispatch } from "react-redux";
import { getProducts } from "../../redux/actions/productsActions";
import StoreContext from "../../GlobalStates/StoreContext";
import Cards from "./Cards";
import Cart from "./Cart";
import "./index.css";


function Store() {
  const dispatch = useDispatch();
  const { state, products } = useContext(StoreContext);


  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <>
      <div className="container">
        <div className="store-component">
          <div className="clients-tabs">Clients</div>
          <div className="store-container">
            <div className="cart-container">
            
              <Cart products={state} />
            </div>
            <div className="products-container">
              <div className="search-product">
                BUSCADOR
              </div>
              <div className="category-buttons">
                CATEGORIAS
              </div>
              <div className="cards-container">
                <Cards products={products} />
              </div>
            </div>
          </div>
        </div>
        <div className="navbar">NAVBAR</div>
      </div>
    </>
  );
}

export default Store;
