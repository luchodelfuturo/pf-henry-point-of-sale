import { createContext, useState } from "react";

const StoreContext = createContext();

export function StoreProvider({ children }) {
  const [cartProducts, setCartProducts] = useState([]);

  function addToCart (currProduct) {
    setCartProducts([...cartProducts, currProduct]);
  };

  return (
    <StoreContext.Provider value={{ cartProducts, addToCart }}>
      {children}
    </StoreContext.Provider>
  );
}

export default StoreContext;
