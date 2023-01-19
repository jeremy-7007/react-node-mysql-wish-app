import axios from "axios";
import React from "react";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import UserContext from "../context";
import Screen from "../components/Screen";
import BackButton from "../components/BackButton";

function Add(props) {
  const user = useContext(UserContext);
  const [wish, setWish] = useState({
    title: "",
    body: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleChange(e) {
    setWish((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setError("");
      if (wish.title === "") {
        setError("Please enter a title for your wish!");
        throw Error("No title given");
      }

      await axios.post("http://localhost:8800/wishes/add", {
        ...wish,
        userId: user.id,
      });
      navigate("/wishes");
    } catch (err) {
      console.log(err);
    }
  }

  function handleBack() {
    navigate("/wishes");
  }

  return (
    <Screen>
      <BackButton onClick={handleBack} />
      <div className="AUWrapper">
        <h1 className="AUPageTitle">Make a New Wish</h1>
        <input
          type="text"
          placeholder="Title"
          onChange={handleChange}
          name="title"
          maxLength={45}
          className="AUWishTitle"
        />
        <small className="errorText AUError">{error}</small>
        <textarea
          type="text"
          placeholder="Description (optional)"
          onChange={handleChange}
          name="body"
          cols="5"
          rows="10"
          maxLength={500}
          className="AUWishBody"
        />
        <button onClick={handleSubmit} className="AUSubmit">
          Add
        </button>
      </div>
    </Screen>
  );
}

export default Add;
