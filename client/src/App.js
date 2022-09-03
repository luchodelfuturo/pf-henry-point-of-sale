import "./App.css";
import { Route } from "react-router-dom";
import Kitchen from "./Components/Kitchen";
import Store from "./Components/Store";
import AdminProducts from "./Components/AdminProducts/AdminProducts";
import { StoreProvider } from "./GlobalStates/StoreContext";


function App() {

  return (
    <div className="App">
      <Route exact path="/kitchen" component={Kitchen} />

      <StoreProvider>
        <Route exact path="/store" component={Store} />
      </StoreProvider>

      <Route exact path="/counter" component={Counter} />

      <Route exact path="/adminProducts" component={AdminProducts} />
    </div>
  );
}

export default App;
