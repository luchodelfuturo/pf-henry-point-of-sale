import React from "react";
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
        </div>
    )
}

export default Header;