import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../redux/actions/productsActions";

function Store() {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <div>
      {products &&
        products.map((p, i) => {
          return (
            <div key={i}>
              <p>{p.id}</p>
              <p>{p.name}</p>
            </div>
          );
        })}
    </div>
  );
}

export default Store;
