import React, { useContext } from "react";
import StoreContext from "../../GlobalStates/StoreContext";
import Card from "./Card";

export default function Cards({ products }) {
  const { addProductById } = useContext(StoreContext);

  function handlePickProduct(p) {
    //e.preventDefault();
    addProductById(p);
  }
  
  return (
    <>
      {products &&
        products.map((p, i) => (
          <div key={p.id} onClick={() => handlePickProduct(p.id)}>
           <Card name={p.name} cat={p.cat} image={p.image}/>
          </div>
        ))}
    </>
  );
}
