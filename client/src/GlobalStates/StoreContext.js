import { createContext, useReducer } from "react";
import { useSelector } from "react-redux";

const StoreContext = createContext();

let prev = [];
let exists = {};
let section = "";
const initialState = [];
function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case "INCREMENT":
      prev = state.filter((e) => e.product.id !== action.payload);
      exists = state.find((e) => e.product.id === action.payload);

      return [
        ...prev,
        {
          qty: exists.qty++,
          product: exists.product,
          subTotal: exists.qty * exists.product.price - exists.product.price,
          section: exists.section,
        },
      ];

    case "DECREMENT":
      prev = state.filter((e) => e.product.id !== action.payload);
      exists = state.find((e) => e.product.id === action.payload);
      let dec = exists.qty;
      exists.qty > 1 ? dec-- : (dec = 1);

      return [
        ...prev,
        {
          qty: dec,
          product: exists.product,
          subTotal: dec * exists.product.price,
          section: exists.section,
        },
      ];
    case "ADD":
      //exists = state.find((e) => e.product.id === action.payload);

      console.log(state);

      return [
        ...state,
        {
          qty: 1,
          subTotal: action.payload.price,
          product: action.payload,
          section: action.payload.section,
        },
      ];
    case "DELETE":
      prev = state.filter((e) => e.product.id !== action.payload);

      return [...prev];
    case "DELETE_ALL":
      return [];

    default:
      return state;
  }
}

export function StoreProvider({ children }) {
  const { products } = useSelector((state) => state.products);
  const { categories } = useSelector((state) => state.categories);

  console.log("CATEGORIES");

  console.log(categories);

  console.log("PRODUCTS");

  console.log(products);

  const [state, dispatch] = useReducer(reducer, reducer());
  //console.log(products)

  function qtyIncr(id) {
    dispatch({ type: "INCREMENT", payload: id });
  }
  function qtyDecr(id) {
    dispatch({ type: "DECREMENT", payload: id });
  }
  function itemDelete(id) {
    dispatch({ type: "DELETE", payload: id });
  }
  function deleteAll(id) {
    dispatch({ type: "DELETE_ALL" });
  }

  let aux = {};

  function addProductById(added) {
    console.log("added = " + added);

    if (state.find((e) => e.product.id === added)) {
      dispatch({ type: "INCREMENT", payload: added });
    } else {
      aux = () => {
        let { id, name, price, active, categories } = products.find(
          (f) => f.id === added
        );

        return {
          id,
          name,
          price,
          active,
          categories: categories.map((e) => e.name).toString(),
          section: categories.map((e) => e.section).toString(),
        };
      };

      dispatch({ type: "ADD", payload: aux() });
    }
  }

  let productsOrder = {};

  function sendOrder() {
    productsOrder = state.map((p) => {
      return { qty: p.qty, nameProduct: p.product.name, section: p.section };
    });
  }
  sendOrder()

  let order = {
    status: "p",
    comments: "",
    productsOrder: productsOrder,
  };

  

  return (
    <StoreContext.Provider
      value={{
        state,
        products,
        categories,
        addProductById,
        qtyIncr,
        qtyDecr,
        itemDelete,
        deleteAll,
        sendOrder,
        order,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export default StoreContext;
