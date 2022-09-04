import React from "react";
import Nav from "../NavBar";
import Orders from "../Orders";

function Counter() {
  return (
    <div>
      <div className='etapas de ordenes'>
        <div className='pedidos en preparacion'>
            <h1>Pending orders</h1>
        </div>
        <div className='pedidos listos para entregar'>
            <h1>Ready</h1>
        </div>
      </div>
      <Nav />
    </div>
  );
}

export default Counter;