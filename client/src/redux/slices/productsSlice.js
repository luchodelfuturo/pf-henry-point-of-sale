import { createSlice } from "@reduxjs/toolkit";

export const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    unsortedProducts: [],
    allProducts: [],
    detail: {},
    category: "",
    sort: ""
  },
  reducers: {
    getAllProducts: (state, action) => {
      state.products = action.payload.filter(prod => prod.active === true)
      state.unsortedProducts = action.payload.filter(prod => prod.active === true)
      state.allProducts = action.payload.filter(prod => prod.active === true)
      console.log("all products reducer,", state.allProducts)
    },
    getProdById: (state, action) => {
      state.detail = action.payload;
    },
    filterByCategory: (state, action) => {
      if(action.payload !== "all categories"){
        state.category = action.payload
      } else{ //no tiene mucho sentido este else pero sin él, se producen errores
        state.category = ""
      }
      const filterProducts = state.category === 'all categories' ? state.allProducts : state.allProducts.filter(prod => prod.categories[0].name.toLowerCase().includes(state.category))
      !filterProducts.length > 0 ? state.products = 'No hay productos' : state.products = filterProducts;

      let sortedProducts = []
      if(state.products !== 'No hay productos'){
        switch(state.sort){
          case "valuable":
            sortedProducts = state.products.sort(function (a,b) {
              if(a.price < b.price){
                return 1
              }
              if(a.price > b.price){
                return -1
              }
              return 0
            })
            break;
          case "priceless":
            sortedProducts = state.products.sort(function (a,b) {
              if(a.price < b.price){
                return -1
              }
              if(a.price > b.price){
                return 1
              }
              return 0
            })
            break;
          case "popular":
            sortedProducts = state.products.sort(function (a,b) {
              if(a.sellCount < b.sellCount){
                return 1
              }
              if(a.sellCount > b.sellCount){
                return -1
              }
              return 0
            })
            break;
          case "unpopular":
            sortedProducts = state.products.sort(function (a,b) {
              if(a.sellCount < b.sellCount){
                return -1
              }
              if(a.sellCount > b.sellCount){
                return 1
              }
              return 0
            })
            break;
          default:
            sortedProducts = filterProducts
        }
      }
      state.products = sortedProducts
    },
    sortProducts: (state, action) => {
      state.sort = action.payload

      const filterProducts = state.category === 'all categories' ? state.allProducts : state.allProducts.filter(prod => prod.categories[0].name.toLowerCase().includes(state.category))
      !filterProducts.length > 0 ? state.products = 'No hay productos' : state.products = filterProducts;

      let sortedProducts = []
      if(state.products !== 'No hay productos'){
        switch(state.sort){
          case "valuable":
            sortedProducts = state.products.sort(function (a,b) {
              if(a.price < b.price){
                return 1
              }
              if(a.price > b.price){
                return -1
              }
              return 0
            })
            break;
          case "priceless":
            sortedProducts = state.products.sort(function (a,b) {
              if(a.price < b.price){
                return -1
              }
              if(a.price > b.price){
                return 1
              }
              return 0
            })
            break;
          case "popular":
            sortedProducts = state.products.sort(function (a,b) {
              if(a.sellCount < b.sellCount){
                return 1
              }
              if(a.sellCount > b.sellCount){
                return -1
              }
              return 0
            })
            break;
          case "unpopular":
            sortedProducts = state.products.sort(function (a,b) {
              if(a.sellCount < b.sellCount){
                return -1
              }
              if(a.sellCount > b.sellCount){
                return 1
              }
              return 0
            })
            break;
          default:
            sortedProducts = filterProducts
        }
      }
      state.products = sortedProducts
    },
    disableProduct: (state, action) => {
      state.products.map(el => {
        if(el.id === action.payload){
          el.active = false
        }
      })
      state.allProducts.map(el => {
        if(el.id === action.payload){
          el.active = false
        }
      })
      console.log("Product disabled")
    }
  },
});

export const { getAllProducts, getProdById, filterByCategory, sortProducts, disableProduct } = productsSlice.actions;

export default productsSlice.reducer;