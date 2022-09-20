import React from "react";
<<<<<<< HEAD
import {Link} from "react-router-dom";
import "./Header.css";
import {useSelector} from 'react-redux';
import axios from 'axios';

function Header(){
    const auth = useSelector(state => state.auth)
    const {user, isLogged} = auth

    const handleLogout = async () => {
        try {
            await axios.get('/users/logout')
            localStorage.removeItem('firstLogin')
            window.location.href = "/";
        } catch (err) {
            window.location.href = "/";
        }
    }


    const userLink = () => {
        return <div>
            <Link to="/"><img src={user.avatar} alt=""/> {user.name}</Link>
            <Link to="/profile">Profile</Link>
            <Link to="/" onClick={handleLogout}>Logout</Link>
        </div>
    }


    return (
        <div id="contenedor">
            {
                isLogged
                ? userLink()
                :<button id="button"><Link to="/login"><i className="fas fa-user" ></i> Sign in</Link></button>
            }
=======
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
>>>>>>> f3c3bfade795fd4a80ffb7b517e7e6bd922330d8
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
