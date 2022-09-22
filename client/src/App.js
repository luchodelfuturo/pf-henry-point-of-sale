import { Route } from "react-router-dom";
import React, { useEffect } from "react"
import Kitchen from "./Components/Kitchen";
import Store from "./Components/Store";
import HistorialPedidos from "./Components/HistorialPedidos/HistorialPedidos";
import Counter from "./Components/Counter/counter";
import AdminProducts from "./Components/AdminProducts/AdminProducts";
import { StoreProvider } from "./GlobalStates/StoreContext";
import WelcomePage from "./Components/WelcomePage/WelcomePage";
import Login from "./Components/auth/LogIn";
import Register from "./Components/auth/Register";
import ActivationEmail from "./Components/auth/ActivationEmail";
import GlobalStyle from "./theme/globalStyle.js";
import CashFlow from "./Components/CashFlow/CashFlow";
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios';
import { dispatchGetToken } from "./redux/slices/tokenSlice";
import { dispatchLogin, fetchUser, dispatchGetUser } from "./redux/slices/authSlice";
import NotFound from './Components/Utils/NotFound/NotFound';
import Profile from "./Components/Profile/Profile";
import EditUser from "./Components/Profile/EditUser";
import UserNavBar from "./Components/UserNavbar/UserNavBar.jsx";
import HistorialsCashFlow from "./Components/CashFlow/HistorialsCashFlow.jsx"
import NavBarApp from "./Components/NavbarApp/NavBarApp.jsx";



function App() {

  const dispatch = useDispatch()
  const token = useSelector(state => state.token)
  const auth = useSelector(state => state.auth)
  const { isLogged, isAdmin } = auth

  const getToken = async () => {
    //const res = 
    await axios.post('/users/refresh_token')
      .then(res => dispatch(dispatchGetToken(res.data.access_token)))
      .catch(err => console.log("error:", err));

  }

  const getUser = () => {
    dispatch(dispatchLogin())

    return fetchUser(token).then(res => {
      dispatch(dispatchGetUser(res.data))

    })
  }

  useEffect(() => {
    const firstLogin = localStorage.getItem('firstLogin')
    if (firstLogin) {
      getToken()
    }
  }, [auth.isLogged, dispatch])

  useEffect(() => {

    if (token) {
      getUser()
    }
  }, [token, dispatch])

  return (
    <div className="App">
      <GlobalStyle />

      {!isLogged ? <UserNavBar /> : <NavBarApp />}

      <Route exact path="/" component={WelcomePage} />

      <Route exact path="/login" component={isLogged ? NotFound : Login} />

      <Route exact path="/register" component={isLogged ? NotFound : Register} />

      <Route exact path="/profile" component={isLogged ? Profile : WelcomePage} />

      <Route exact path="/user/activate/:activation_token" component={ActivationEmail} />

      <Route exact path="/edit_user/:id" component={isAdmin ? EditUser : NotFound} />

      <Route exact path="/kitchen" component={Kitchen} />

      <StoreProvider>
        <Route path="/store" component={Store} />
      </StoreProvider>

      <Route exact path="/counter" component={Counter} />

      <Route exact path="/adminProducts" component={AdminProducts} />

      <Route exact path="/historialPedidos" component={HistorialPedidos} />

      <Route exact path="/cashFlow/historialCashFlow" component={HistorialsCashFlow} />
      <Route exact path="/cashFlow" component={CashFlow} />

    </div>
  );
}

export default App;
