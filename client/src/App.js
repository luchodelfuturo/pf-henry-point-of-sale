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
  return (
    <div className="App">
      <GlobalStyle />

      <Route exact path="/" component={WelcomePage} />

      <Route exact path="/login" component={Login} />

      <Route exact path="/register" component={Register} />

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
      <Route
        exact
        path="/cashFlow/historialCashFlow"
        component={HistorialsCashFlow}
      />
    </div>
  );
}

export default App;
