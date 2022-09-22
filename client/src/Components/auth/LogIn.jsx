import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import {
  showErrMsg,
  showSuccessMsg,
} from "../Utils/Notifications/Notifications.jsx";
import "./auth.css";
import { dispatchLogin } from "../../redux/slices/authSlice";
import { useDispatch } from "react-redux";
import { Textinput, MainButton } from "../../theme/styled-componets";
import jwt_decode from "jwt-decode";

const client_id =
  "58357792722-mar8g19eknd6f1cp4tkpmq37gcn231d7.apps.googleusercontent.com";

const initialState = {
  name: "",
  avatar: "",
  email: "",
  password: "",
  err: "",
  success: "",
};

function Login() {
  const [user, setUser] = useState(initialState);
  const { name, email, password, avatar, err, success } = user;
  const dispatch = useDispatch();
  const history = useHistory();

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value, err: "", success: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/users/login", { email, password });
      setUser({ ...user, err: "", success: res.data.msg });

      localStorage.setItem("firstLogin", true);

      dispatch(dispatchLogin());
      history.push("/store");
    } catch (err) {
      err.response.data.msg &&
        setUser({ ...user, err: err.response.data.msg, success: "" });
    }
  };

  const responseGoogle = async (response) => {
    try {
      console.log("Encoded JWT ID token: " + response.credential);
      var userObject = jwt_decode(response.credential);
      console.log(userObject);
      // const res = await axios.post('/users/google_login', {tokenId: response.id_token})

      setUser(userObject);
      localStorage.setItem("firstLogin", true);

      dispatch(dispatchLogin());
      history.push("/store");
    } catch (err) {
      err.response.data.msg &&
        setUser({ ...user, err: err.response.data.msg, success: "" });
    }
  };

  // const responseGoogle = async (response) => {
  //   try {
  //     console.log("Encoded JWT ID token: " + response.credential);
  //     var googleUser = jwt_decode(response.credential);
  //     console.log(googleUser);

  //     const res = await axios.post("/users/register", {
  //       name: googleUser.name,
  //       email: googleUser.email,
  //       avatar: googleUser.picture
  //     });

  //     setUser({ ...user, err: "", success: res.data.msg });
  //     localStorage.setItem('firstLogin', true)

  //     dispatch(dispatchLogin())
  //     history.push('/store')
  //   } catch (err) {
  //     err.response.data.msg &&
  //     setUser({...user, err: err.response.data.msg, success: ''})
  //   }
  // }

  useEffect(() => {
    /*global google*/
    google.accounts.id.initialize({
      client_id: client_id,
      callback: responseGoogle,
    });
    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "outline",
      size: "large",
    });
  }, []);

  return (
    <div id="contenedor">
      <div id="left-cont">
        <div id="effect">
          <div id="wrapper-login">
            <div id="welcome-login">
              <div id="welcome-to-login">Welcome to</div>
              <div>
                <div id="henry-login">HENRY</div>
                <div id="bar-login">BAR</div>
              </div>
              <div id="pos-login">Point of sale</div>
            </div>
          </div>
        </div>
      </div>

      <div id="right-cont">
        <div className="login_page">
          <h2>Log In</h2>
          {err && showErrMsg(err)}
          {success && showSuccessMsg(success)}
          <form className="form" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email">Email Address</label>
              <Textinput
                type="text"
                placeholder="Enter email address"
                id="email"
                value={email}
                name="email"
                onChange={handleChangeInput}
              />
            </div>

            <div>
              <label htmlFor="password">Password</label>
              <Textinput
                type="password"
                placeholder="Enter password"
                id="password"
                value={password}
                name="password"
                onChange={handleChangeInput}
              />
            </div>
            <div id="forgot">
              <Link to="/forgot_password">Forgot your password?</Link>
            </div>
            <div className="row">
              <div id="signInDiv" className="social"></div>
              <MainButton type="submit">Log in</MainButton>
            </div>
          </form>
        </div>
      </div>
      <div className="register">
        New to Point of Sale?{" "}
        <Link className="register-link" to="/register">
          Register
        </Link>
      </div>
    </div>
  );
}

export default Login;
