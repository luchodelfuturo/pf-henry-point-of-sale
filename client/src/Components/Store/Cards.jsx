import React, { useContext } from "react";
import StoreContext from "../../GlobalStates/StoreContext";
import Card from "./Card";

export default function Cards({ products }) {
  const { addProductById } = useContext(StoreContext);

  function handlePickProduct(p) {
    addProductById(p);
  }

  return (
    <>
      {!products.includes("No hay productos")
        ? products.map((p, i) => (
            <div key={p.id} onClick={() => handlePickProduct(p.id)}>
              <Card
                name={p.name}
                cat={p.categories[0].name}
                image={p.image}
                price={p.price}
              />
            </div>
          ))
        : "no Hay products"}
    </>
  );
}