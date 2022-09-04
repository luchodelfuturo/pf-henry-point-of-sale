import React from "react";
import Orders from "../Orders";
import NavBarApp from "../NavbarApp/NavBarApp";

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
      <NavBarApp/>
    </div>
  );
}

export default Counter;