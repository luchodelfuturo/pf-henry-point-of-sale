import React from "react";
import { Link } from "react-router-dom";
import "./UserNavBar.css";
import { MainButton } from "../../theme/styled-componets.js";
import {useSelector} from 'react-redux';
import axios from 'axios';


function UserNavBar () {
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
      <Link to="/" className="register-link"><img id="avatar" src={user.avatar} alt=""/> {user.name}</Link>
      <Link to="/profile" className="register-link">Profile</Link>
      <Link to="/" onClick={handleLogout} className="register-link">Logout</Link>
    </div>
  }

  return(
    <nav id="usernavbar">
      {
        isLogged
        ? userLink()
        :<div>
          <Link to="/login">
            <MainButton id="button">
              <i className="fas fa-user"></i> Log in
            </MainButton>
          </Link>
          <Link to="/register">
            <MainButton id="button">
              <i className="fas fa-user"></i> Register
          </MainButton>
          </Link>
        </div>
      }
    </nav>
  )
}

export default UserNavBar;