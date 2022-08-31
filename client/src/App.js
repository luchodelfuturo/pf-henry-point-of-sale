import "./App.css";
import { Route } from "react-router-dom";
import Kitchen from "./Components/Kitchen";
import Store from "./Components/Store";

function App() {
  return (
    <div className="App">
      <Route exact path="/kitchen" component={Kitchen} />
      <Route exact path="/store" component={Store} />
    </div>
  );
}

export default App;
