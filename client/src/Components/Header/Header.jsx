import React from "react";
import { Link } from "react-router-dom";
import { MainButton } from "../../theme/styled-componets.js";
import "./landing.css";

function Header() {
  return (
    <div id="contenedor">
      <div id="wrapper">
        <div id="welcome">
          <div id="welcome-to">Welcome to</div>
          <div>
            <div id="henry">HENRY</div>
            <div id="bar">BAR</div>
          </div>
          <div id="pos">Point of sale</div>
        </div>
        <div>
          <div>
            <Link to="/register">
              <div id="register-link">
                <i></i> Register
              </div>
            </Link>

            <Link to="/login">
              <MainButton id="button">
                <i className="fas fa-user"></i> Sign in
              </MainButton>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
