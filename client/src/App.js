import "./App.css";
import { Route } from "react-router-dom";
import Kitchen from "./Components/Kitchen";

function App() {
  return (
    <div className="App">
      <Route exact path="/kitchen" component={Kitchen} />
    </div>
  );
}

export default App;
