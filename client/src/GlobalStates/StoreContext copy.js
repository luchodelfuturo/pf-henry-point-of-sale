import { createContext, useReducer, useEffect, useState } from "react";
import { useSelector } from "react-redux";

const StoreContext = createContext();
const initialState = {
  qty: 1,
  product: {}
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'INCREMENT':
      
      return {
        ...state,
        qty: state.qty + 1
      };
      
      case 'DECREMENT':
      
      return {
        ...state,
        qty: state.qty - 1
      };
      case 'ADD':
      
      return {
        ...state,
        qty: state.qty,
        product: action.payload
      };
      // case 'ERASE':
      
      // return {
        
      // };
  
    default:
      return state;
  }
}



export function StoreProvider({ children }) {

  const { products } = useSelector((state) => state.products);
  //console.log(products)
  const [cartProducts, setCartProducts] = useState([{qty: 1, product: {
    id: 0,
    name: "",
    price: 0,
    categories: "",
    active: true,
  }}]);
  const [idProducts, setIdProducts] = useState([]);
  //const [currProduct, setCurrProduct] = useState({})
  
  let aux = {}
  // const format = {
  //   qty: 0,
  //   product: {}
  // };

  //console.log(product)
  //if (product.id === products.id) console.log("igual")
  
  

  useEffect(() => {
    // let aux = idProducts.map((e) => {
    // let {id, name, price, active, categories} = products.find((f) => f.id === e);
    // let qty = 0
      
    // // if (cartProducts.qty === 0){
    // //   qty++;
    // // }
    
    // // cartProducts && cartProducts.forEach(el => {
    // //   el.qty = 0 ? qty++ : 
    // // });



    // return {
    //   qty,
    //   product: {
    //     id,
    //     name,
    //     price,
    //     active,
    //     categories: categories.map(e=> e.name).toString()
    //   }
    // };

  });

  //console.log({aux})
  // setAllProducts(aux)
  // console.log("currProduct")
  // console.log(currProduct)

  // itemAdder();
  // console.log(cartProducts)

  // }, [idProducts, products]);

  useEffect(() => {
  
    
    // setCurrProduct([...currProduct, 
    //   aux()])
  
   



  }, []);

  


  
  //setCartProducts(...cartProducts, currProduct)

  // function addToCart() {
    

    

  // }

  

  function addProductById(added) {

    aux = () =>{
      let {id, name, price, active, categories} = products.find((f) => f.id === added);
      
    return {
        id,
        name,
        price,
        active,
        categories: categories.map(e=> e.name).toString()
    }

  };





//   let setter = []
// if (cartProducts.length > 1 && cartProducts.find((f) => f.product.id === added)){
//   console.log("FOUND");

//   setter = cartProducts.map((e)=> {
//       console.log("E")
//       console.log(e)

//       let obj
//     if(e.product.id === added) {
//       console.log("ADDED")

//       obj =  {
//           ...e,
//           qty: e.qty++,
//           product: e.product
//         }
        
      
//     } else {
//       obj = {
//         ...e,
//          qty: 1,
//          product: aux()
    
//         }
//     }
//     console.log("OBJ")
//     console.log(obj)
//     return obj
//     }
// )
// console.log("SETTER del FOUND" +setter)
// itemAdder(setter)
// } else{

//   setter = [
//         ...cartProducts,{
//          qty: 1,
//          product: aux()}
    
//         ]
//         console.log("SETTER del NOTF" +setter)
//   itemAdder(setter)
// }










  console.log("cartProducts")
  console.log(cartProducts)



  }

  const itemAdder = (setter) => {
    console.log("adder")
    setCartProducts(setter)

  }



  //console.log("currProduct")
  //console.log(currProduct)

  
//     console.log("entro al foreach")
//     const auxilio = cartProducts.find((p) => p.product.id === added)
//     if (auxilio) {
//       console.log("auxilio ")
      
//        setCartProducts([
//         ...(cartProducts.filter(e => e.product.id !== added)),
//         {
//           qty: cartProducts.find((p) => p.product.id === added).qty++,
//           product: cartProducts.find((p) => p.product.id === added).product,

//         }
//   //   {
//   //   qty: auxilio.qty++,
//   //   product: auxilio.product
//   // }
// ])

//     } else {
//       console.log("PORQUE ENTRA ACA")
//        setCartProducts([
//     ...cartProducts,
//     {
//     qty: 1,
//     product: aux()
//   }])
//     }
 
    //console.log(cartProducts.length)






  // console.log("cartProductsssss")
//   console.log(cartProducts)
//   //if (cartProducts.find(e => e.product.id === added)) {
    
//   // }
//   // else {
//   //   setCartProducts([
//   //     ...cartProducts,
//   //     currProduct
//   //   ])
//   // }

//   // let add = cartProducts.map(p=> {
//   //   if (cartProducts.find(e => e.product.id === added) ) {p.qty++}
//   //   else {
//   //     setCartProducts([...cartProducts, ])
//   //   }

//   // })




    // currProduct.map((e)=> {
    //   if (e.qty =)
    // })


    // setCartProducts([
    //   ...cartProducts,
    //   currProduct
    // ])


  return (
    <StoreContext.Provider value={{ products, idProducts, cartProducts, addProductById }}>
      {children}
    </StoreContext.Provider>
  );
}

export default StoreContext;
