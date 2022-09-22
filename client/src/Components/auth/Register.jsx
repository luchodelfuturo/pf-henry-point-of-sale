import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Textinput, MainButton } from "../../theme/styled-componets";
import {
  showErrMsg,
  showSuccessMsg,
} from "../Utils/Notifications/Notifications.jsx";
import {
  isEmpty,
  isEmail,
  isLength,
  isMatch,
} from "../Utils/Validations/Validations";

const initialState = {
  name: "",
  email: "",
  password: "",
  cf_password: "",
  err: "",
  success: "",
};

function Register() {
  const [user, setUser] = useState(initialState);

  const { name, email, password, cf_password, err, success } = user;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value, err: "", success: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEmpty(name) || isEmpty(password))
      return setUser({
        ...user,
        err: "Please fill in all fields.",
        success: "",
      });

    if (!isEmail(email))
      return setUser({ ...user, err: "Invalid emails.", success: "" });

    if (isLength(password))
      return setUser({
        ...user,
        err: "Password must be at least 6 characters.",
        success: "",
      });

    if (!isMatch(password, cf_password))
      return setUser({ ...user, err: "Password did not match.", success: "" });

    try {
      const res = await axios.post("/users/register", {
        name,
        email,
        password,
      });

      setUser({ ...user, err: "", success: res.data.msg });
    } catch (err) {
      err.response.data.msg &&
        setUser({ ...user, err: err.response.data.msg, success: "" });
    }
  };

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
        <div className="register_page">
          <h2>Register</h2>
          {err && showErrMsg(err)}
          {success && showSuccessMsg(success)}

          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name">Name</label>
              <Textinput
                type="text"
                placeholder="Henry"
                id="name"
                value={name}
                name="name"
                onChange={handleChangeInput}
              />
            </div>

            <div>
              <label htmlFor="email">Email Address</label>
              <Textinput
                type="text"
                placeholder="example@henrybar.com"
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
                placeholder="******"
                id="password"
                value={password}
                name="password"
                onChange={handleChangeInput}
              />
            </div>

            <div>
              <label htmlFor="cf_password">Confirm Password</label>
              <Textinput
                type="password"
                placeholder="******"
                id="cf_password"
                value={cf_password}
                name="cf_password"
                onChange={handleChangeInput}
              />
            </div>

            <div className="row">
              <MainButton type="submit">Register</MainButton>
            </div>
          </form>
        </div>
      </div>
      <div className="login">
        Already an account?{" "}
        <Link className="login-link" to="/login">
          Login
        </Link>
      </div>
    </div>
  );
}

export default Register;
