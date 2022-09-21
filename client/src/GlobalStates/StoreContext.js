import { createContext, useEffect, useReducer, useState } from "react";
import { useSelector } from "react-redux";

const StoreContext = createContext();

let prev = [];
let exists = {};
//let section = "";
const initialState = [];
function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case "INIT":
      return action.payload;
    case "INCREMENT":
      prev = state.filter((e) => e.product.id !== action.payload);
      exists = state.find((e) => e.product.id === action.payload);

      let inc = exists.qty;
      return [
        ...prev,
        {
          qty: inc + 1,
          product: exists.product,
          subTotal: (inc + 1) * exists.product.price,
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
        },
      ];
    case "ADD":
      return [
        ...state,
        {
          qty: 1,
          subTotal: action.payload.price,
          product: action.payload,
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

  const [state, dispatch] = useReducer(reducer, reducer());
  const [comments, setComments] = useState("");
  const [methodPayment, setMethodPayment] = useState("cash");
  const [discounts, setDiscounts] = useState(0);

  console.log("%cStoreContext.js line:71 state", "color: #007acc;", state);

  function qtyIncr(id) {
    dispatch({ type: "INCREMENT", payload: id });
  }
  function qtyDecr(id) {
    dispatch({ type: "DECREMENT", payload: id });
  }
  function itemDelete(id) {
    dispatch({ type: "DELETE", payload: id });
    if (state.length === 1) {
      window.localStorage.removeItem("items");
    }
  }
  function deleteAll(id) {
    dispatch({ type: "DELETE_ALL" });
    window.localStorage.removeItem("items");
  }

  let aux = {};

  function addProductById(added) {
    if (state.find((e) => e.product.id === added)) {
      dispatch({ type: "INCREMENT", payload: added });
    } else {
      aux = () => {
        let { id, name, price, active, categories, stock } = products.find(
          (f) => f.id === added
        );

        return {
          id,
          name,
          price,
          active,
          categories: categories.map((e) => e.name).toString(),
          stock,
        };
      };

      dispatch({ type: "ADD", payload: aux() });
    }
  }

  const totals = state.reduce((acc, curr) => {
    return acc + curr.subTotal;
  }, 0);

  let productsOrder = {};

  function sendOrder() {
    productsOrder = state.map((p) => {
      return { qty: p.qty, nameProduct: p.product.name };
    });
  }
  sendOrder();

  let order = {
    comments: comments,
    productsOrder: productsOrder,
    totalOrder: totals - discounts,
    methodPayment: methodPayment,
  };

  const ls = JSON.parse(window.localStorage.getItem("items"));
  useEffect(() => {
    if (state.length > 0) {
      window.localStorage.setItem("items", JSON.stringify(state));
    } else {
      if (ls && ls.length > 0) {
        dispatch({
          type: "INIT",
          payload: JSON.parse(window.localStorage.getItem("items")),
        });
      }
    }
  }, [state.length, ls]);

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
        totals,
        setComments,
        methodPayment,
        setMethodPayment,
        setDiscounts,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export default StoreContext;
