import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../redux/actions/productsActions";
import NavBarApp from "../NavbarApp/NavBarApp";
function Store() {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <div>
      <div style={{ height: "90vh", overflowY: "auto" }}>
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
      <div style={{ height: "10vh" }}>
        <NavBarApp />
      </div>
    </div>
  );
}

export default Store;
