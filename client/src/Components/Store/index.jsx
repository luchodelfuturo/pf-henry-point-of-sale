import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../redux/actions/productsActions";
import SearchBar from "../SearchBar";

function Store() {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <div>
      <SearchBar/>
      {products &&
        products.map((p, i) => {
          return (
            <div key={i}>
              <p>{p.price}</p>
              <p>{p.name}</p>
            </div>
          );
        })}
    </div>
  );
}

export default Store;
