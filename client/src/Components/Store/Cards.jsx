import React, { useContext } from "react";
import StoreContext from "../../GlobalStates/StoreContext";
import Card from "./Card";
import Swal from "sweetalert2";

export default function Cards({ products }) {
  const { addProductById } = useContext(StoreContext);

  function handlePickProduct(p) {
    addProductById(p);
  }

  function outOfStock() {
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: 'Out of stock',
      showConfirmButton: false,
      timer: 1500
    })
  }

  return (
    <>
      {!products.includes("No hay productos")
        ? products.map((p, i) => (
            <div key={p.id} onClick={p.stock ? () => handlePickProduct(p.id) : outOfStock}>
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