import React, { useContext, useEffect } from "react";
import StoreContext from "../../GlobalStates/StoreContext";
import Card from "./Card";

export default function Cards({ products, allProducts }) {
  const { addProductById } = useContext(StoreContext);

  function handlePickProduct(p) {
    let incr = products.find((e) => e.id === p);
    let incrQty = allProducts.find((e) => e.product.id === p);

    if (incrQty) {
      if (incr.id === incrQty.product.id) {
        if (incr.stock > incrQty.qty) {
          addProductById(p);
        }
      }
    } else {
      addProductById(p);
    }
  }

  return (
    <>
      {!products.includes("No hay productos")
        ? products.map((p, i) => (
            <div
              key={p.id}
              onClick={p.stock > 0 ? () => handlePickProduct(p.id) : null}
            >
              <Card
                name={p.name}
                cat={p.categories[0].name}
                image={p.image}
                price={p.price}
                stock={p.stock}
              />
            </div>
          ))
        : "no Hay products"}
    </>
  );
}
