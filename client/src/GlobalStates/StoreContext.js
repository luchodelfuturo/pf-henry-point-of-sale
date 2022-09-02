import { createContext, useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
const StoreContext = createContext();

export function StoreProvider({ children }) {

  const { products } = useSelector((state) => state.products);
  //console.log(products)
  const [cartProducts, setCartProducts] = useState([]);
  const [idProducts, setIdProducts] = useState([]);
  const [currProduct, setCurrProduct] = useState({})
  

  // const format = {
  //   qty: 0,
  //   product: {}
  // };

  //console.log(product)
  //if (product.id === products.id) console.log("igual")
  
  const itemAdder = () => {
    console.log("adder")

    // currProduct.map((e)=> {
    //   if (e.qty =)
    // })


    // setCartProducts([
    //   ...cartProducts,
    //   currProduct
    // ])
  }

  useEffect(() => {
    let aux = idProducts.map((e) => {
    let product = products.find((f) => f.id === e);
    let qty = 0

    // if (cartProducts.qty === 0){
    //   qty++;
    // }
    
    // cartProducts && cartProducts.forEach(el => {
    //   el.qty = 0 ? qty++ : 
    // });



    return {
      qty,
      product
    };

  });

  console.log({aux})
  setCurrProduct(aux)
  console.log(currProduct)




  itemAdder();
  console.log(cartProducts)

  }, [idProducts, products]);

  //useEffect(() => {
  

   



  //}, []);

  


  
  //setCartProducts(...cartProducts, currProduct)


  

  function addToCart(currProduct) {
    setIdProducts([...idProducts, currProduct]);
    console.log(idProducts)
    //setCartProducts([...idProducts, currProduct]);

    // setCartProducts([
    //          ...cartProducts,

    // ]);


  }

  return (
    <StoreContext.Provider value={{ idProducts, cartProducts, addToCart }}>
      {children}
    </StoreContext.Provider>
  );
}

export default StoreContext;
