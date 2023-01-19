import axios from "axios";
import React from "react";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import UserContext from "../context";
import Screen from "../components/Screen";

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

  async function handleClick(e) {
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

  return (
    <Screen>
      <div className="AUWrapper">
        <h1 className="AUPageTitle">Make a New Wish</h1>
        <input
          type="text"
          placeholder="Title"
          onChange={handleChange}
          name="title"
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
          className="AUWishBody"
        />
        <button onClick={handleClick} className="AUSubmit">
          Add
        </button>
      </div>
    </Screen>
  );
}

export default Add;
