import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./redux/store";
import { BrowserRouter } from "react-router-dom";

import axios from "axios";
import dotenv from "dotenv";
dotenv.config();
//para vercel
axios.defaults.baseURL = "https://henrybar-pointofsale.herokuapp.com" || "http://localhost:3001";
ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);
