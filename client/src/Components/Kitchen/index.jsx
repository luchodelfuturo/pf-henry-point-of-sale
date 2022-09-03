import React from "react";
import NavBarApp from "../NavbarApp/NavBarApp";
import Orders from "../Orders";

function Kitchen() {
  return (
    <div>
      <Orders />
      <div style={{ height: "10vh" }}>
        <NavBarApp />
      </div>
    </div>
  );
}

export default Kitchen;
