import React from "react";
import {Link} from "react-router-dom";
import "./landing.css"

function Header(){
    return (
        <div id="contenedor">
            <h2>Welcome to</h2>
            <h1>Point of Sale</h1>
            <button id="button"><Link to="/login"><i className="fas fa-user" ></i> Sign in</Link></button>
        </div>
    )
}

export default Header;