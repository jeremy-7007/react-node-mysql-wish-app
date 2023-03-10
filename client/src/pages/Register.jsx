import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import Screen from "../components/Screen";
import BackButton from "../components/BackButton";
import WishFinder from "../apis/WishFinder";
import AuthFinder from "../apis/AuthFinder";

function Register(props) {
  const navigate = useNavigate();
  const [reg, setReg] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  function handleChange(e) {
    setReg((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleRegister(e) {
    e.preventDefault();
    try {
      setNameError("");
      setEmailError("");
      setPasswordError("");
      if (reg.name === "") setNameError("Please enter a name!");
      if (reg.email === "") setEmailError("Please enter an email!");
      if (reg.password === "") setPasswordError("Please enter a password!");
      if (reg.name === "" || reg.email === "" || reg.password === "") {
        throw Error("One or more fields are empty!");
      }

      await WishFinder.post("/register", reg);
      // Login with given credentials
      await AuthFinder.post(
        "/local",
        {
          email: reg.email,
          password: reg.password,
        },
        {
          withCredentials: true,
        }
      );
      window.location.reload();
    } catch (err) {
      if (err.response && err.response.status === 400) {
        setEmailError("Email already exists!");
      } else {
        console.log(err);
      }
    }
  }

  function handleBack() {
    navigate("/login");
  }

  return (
    <Screen>
      <BackButton onClick={handleBack} />
      <div className="registerWrapper">
        <h1 className="registerTitle">Register new account</h1>
        <input
          className="registerInput"
          type="text"
          placeholder="John Doe"
          onChange={handleChange}
          name="name"
        />
        <small className="errorText registerError">{nameError}</small>
        <input
          className="registerInput"
          type="email"
          placeholder="abc@gmail.com"
          onChange={handleChange}
          name="email"
        />
        <small className="errorText registerError">{emailError}</small>
        <input
          className="registerInput"
          type="password"
          placeholder="password"
          onChange={handleChange}
          name="password"
        />
        <small className="errorText registerError">{passwordError}</small>
        <button className="registerSubmit" onClick={handleRegister}>
          Register
        </button>
      </div>
    </Screen>
  );
}

export default Register;
