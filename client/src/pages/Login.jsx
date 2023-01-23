import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import GoogleLogo from "../images/google.jpg";
import FacebookLogo from "../images/facebook.png";

import Screen from "../components/Screen";
import AuthFinder from "../apis/AuthFinder";

function Login(props) {
  const navigate = useNavigate();

  const [auth, setAuth] = useState({
    email: "",
    password: "",
  });
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loginError, setLoginError] = useState("");

  const authUrl =
    process.env.NODE_ENV === "production"
      ? "/auth"
      : "http://localhost:8800/auth";

  function google() {
    window.open(authUrl + "/google", "_self");
  }

  function facebook() {
    window.open(authUrl + "/facebook", "_self");
  }

  function handleRegister() {
    navigate("/register");
  }

  function handleChange(e) {
    setAuth((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit() {
    try {
      setEmailError("");
      setPasswordError("");
      setLoginError("");
      if (auth.email === "") {
        setEmailError("Please enter an email!");
      }
      if (auth.password === "") {
        setPasswordError("Please enter a password!");
      }
      if (auth.email === "" || auth.password === "") {
        throw Error("One or more fields are empty!");
      }

      await AuthFinder.post("/local", auth, {
        withCredentials: true,
      });
      window.location.reload();
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setLoginError("Invalid email or password");
      } else {
        console.log(err);
      }
    }
  }

  return (
    <Screen>
      <div className="loginContainer">
        <h1 className="loginTitle">Choose a Login Method</h1>
        <div className="loginFieldsWrapper">
          <div className="loginLeft">
            <div className="loginSocialButton loginGoogle" onClick={google}>
              <img src={GoogleLogo} alt="" className="loginIcon" />
              Google
            </div>
            <div className="loginSocialButton loginFacebook" onClick={facebook}>
              <img src={FacebookLogo} alt="" className="loginIcon" />
              Facebook
            </div>
          </div>

          <div className="loginCenter">
            <div className="centerLine" />
            <div className="or">OR</div>
          </div>

          <div className="loginRight">
            <small className="errorText">{loginError}</small>
            <input
              className="loginInput"
              type="email"
              placeholder="abc@gmail.com"
              onChange={handleChange}
              name="email"
            />
            <small className="errorText">{emailError}</small>
            <input
              className="loginInput"
              type="password"
              placeholder="Password"
              onChange={handleChange}
              name="password"
            />
            <small className="errorText">{passwordError}</small>
            <button className="loginButton loginSubmit" onClick={handleSubmit}>
              Login
            </button>
            <div className="horizontalLine" />
            <button
              className="loginButton loginRegister"
              onClick={handleRegister}
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </Screen>
  );
}

export default Login;
