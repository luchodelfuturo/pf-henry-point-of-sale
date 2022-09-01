import "./App.css";
import { Route } from "react-router-dom";
import Kitchen from "./Components/Kitchen";

import Store from "./Components/Store";
import AdminProducts from "./Components/AdminProducts/AdminProducts";
function App() {
  return (
    <div className="App">
      <Route exact path="/kitchen" component={Kitchen} />
      <Route exact path="/store" component={Store} />
      <Route exact path="/adminProducts" component={AdminProducts} />
    </div>
  );
}

export default App;
