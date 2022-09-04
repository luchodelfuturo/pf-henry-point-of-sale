import React, { useState}  from "react";
import { useHistory } from "react-router-dom";
import {NavBar, Button, Time} from '../Styled-Components/styled-componets' 


export default function NavBarApp() {

  const history = useHistory();
  const [time, setTime] = useState("");
  setTimeout(() => {
    setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
  });

  return (
    <NavBar>
      <Button onClick={() => history.push("/store")}>Ventas</Button>
      <Button onClick={() => history.push("/kitchen")}>Kitchen</Button>
      <Button onClick={() => history.push("/counter")}>Pedidos Ready</Button>
      <Button onClick={() => history.push("/adminProducts")}>Products</Button>
      <Time>{time}</Time>
    </NavBar>
  );
}
