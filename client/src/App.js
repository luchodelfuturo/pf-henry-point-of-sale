import { Route } from "react-router-dom";
import Kitchen from "./Components/Kitchen";
import Store from "./Components/Store";
import HistorialPedidos from "./Components/HistorialPedidos/HistorialPedidos";
import Counter from "./Components/Counter/counter";
import AdminProducts from "./Components/AdminProducts/AdminProducts";
import { StoreProvider } from "./GlobalStates/StoreContext";

import WelcomePage from "./Components/Header/Header";
import Login from "./Components/auth/LogIn";
import Register from "./Components/auth/Register";
import ActivationEmail from "./Components/auth/ActivationEmail";

import GlobalStyle from "./theme/globalStyle.js";
import CashFlow from "./Components/CashFlow/CashFlow";
import HistorialsCashFlow from "./Components/CashFlow/HistorialsCashFlow";

function App() {
  const dispatch = useDispatch()
  const token = useSelector(state => state.token)
  const auth = useSelector(state => state.auth)
  const {isLogged, isAdmin} = auth

  const getToken = async () => {
    const res = await axios.post('/users/refresh_token', null)
    dispatch(dispatchGetToken(res.data.access_token))
  }
  const getUser = () => {
    dispatch(dispatchLogin())

    return fetchUser(token).then(res => {
      dispatch(dispatchGetUser(res.data))

    })
  }

  useEffect(() => {
    const firstLogin = localStorage.getItem('firstLogin')
    if(firstLogin){
      getToken()
    }
  },[auth.isLogged, dispatch])

  useEffect(() => {
    if(token){
      getUser()
    }
  },[token, dispatch])
  return (
    <div className="App">
      <GlobalStyle />

      <Route exact path="/" component={LandingPage} />

      <Route exact path="/login" component={isLogged ? NotFound : Login} />

      <Route exact path="/register" component={isLogged ? NotFound : Register} />

      <Route path="/profile" component={isLogged ? Profile : NotFound} exact />

      <Route
        exact
        path="/user/activate/:activation_token"
        component={ActivationEmail}
      />

      <Route exact path="/kitchen" component={Kitchen} />

      <StoreProvider>
        <Route exact path="/store" component={Store} />
      </StoreProvider>

      <Route exact path="/counter" component={Counter} />

      <Route exact path="/adminProducts" component={AdminProducts} />
      <Route exact path="/historialPedidos" component={HistorialPedidos} />

      {/* <Route exact path="/cashFlow" component={CashFlow} /> */}
      <Route exact path="/cashFlow" component={CashFlow} />
      {/* <Route
        exact
        path="/cashFlow/historialCashFlow"
        component={HistorialsCashFlow}
      /> */}
    </div>
  );
}

export default App;
