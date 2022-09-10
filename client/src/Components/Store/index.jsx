import React, { useEffect, useContext, useState } from "react";
import { useDispatch } from "react-redux";
import {
  getProducts,
  filterByCategoryAction,
  sortProductsAction,
} from "../../redux/actions/productsActions";
import { getCategories } from "../../redux/actions/categoriesActions";
import NavBarApp from "../NavbarApp/NavBarApp";
import StoreContext from "../../GlobalStates/StoreContext";
import Cards from "./Cards";
import Cart from "./Cart";
import "./index.css";
import { colors, BtnRounded } from "../../theme/variables";


function Store() {
  const dispatch = useDispatch();
  const { state, products, categories } = useContext(StoreContext);
  


  useEffect(() => {
    dispatch(getCategories());
    dispatch(getProducts());
  }, [dispatch]);

  console.log(products)

  const filterCategory = async (category) => {
    await dispatch(filterByCategoryAction(category));
  };

  function sort (e) {
    console.log(e.target.value)
    dispatch(sortProductsAction(e.target.value))
  }

  return (
    <>
      <div className="container">
        <div className="store-component">
          {/* <div className="clients-tabs">Clients</div> */}
          <div className="store-container">
            <div className="cart-container">
              <Cart products={state} />
            </div>
            <div className="products-container">
              {/* <div className="search-product">BUSCADOR</div> */}
              <div className="category-buttons">
              <div className="sorts-container">
          <select onChange={(e) => sort(e)}>
            <option value="default">Default</option>
            <option value="valuable">Mayor precio</option>
            <option value="priceless">Menor precio</option>
            <option value="popular"> Más vendido </option>
            <option value="unpopular"> Menos vendido </option>
          </select>
        </div>
                {categories &&
                  categories.map((categ, index) => {
                    const namer = index > 0 ? categ.name : "All";
                    return (
                      <BtnRounded
                        onClick={() => {
                          filterCategory(categ.name.toLowerCase());
                        }}
                        key={index}
                        s
                      >
                        {namer}
                      </BtnRounded>
                    );
                  })}
              </div>
              <div className="cards-container">
                <Cards products={products}/>
              </div>
            </div>
          </div>
        </div>
        <div style={{ height: "10vh" }}>
          <NavBarApp />
        </div>
      </div>
    </>
  );
}

export default Store;
