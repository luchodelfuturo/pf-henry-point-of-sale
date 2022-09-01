import React, { useContext } from "react";
import StoreContext from "../../GlobalStates/StoreContext";
import Card from "./Card";

export default function Cards({ products }) {
  const { addToCart } = useContext(StoreContext);

  function handlePickProduct(p) {
    //e.preventDefault();
    addToCart(p);
  }
  
  return (
    <>
      {products &&
        products.map((p, i) => (
          <div key={p.id} onClick={(e) => handlePickProduct(p.id)}>
           <Card name={p.name} cat={p.cat}/>
          </div>
        ))}
    </>
  );
}
