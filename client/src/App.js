import "./App.css";
import { Route } from "react-router-dom";
import Kitchen from "./Components/Kitchen";
import Store from "./Components/Store";
import AdminProducts from "./Components/AdminProducts/AdminProducts";
<<<<<<< HEAD
import { StoreProvider } from "./GlobalStates/StoreContext";
=======
>>>>>>> develop

function App() {
  return (
    <div className="App">
      <Route exact path="/kitchen" component={Kitchen} />
      <StoreProvider>
        <Route exact path="/store" component={Store} />
      </StoreProvider>
      <Route exact path="/adminProducts" component={AdminProducts} />
    </div>
  );
}

export default App;
