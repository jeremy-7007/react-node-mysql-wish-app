import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Screen from "../components/Screen";

function Update(props) {
  const [originalWish, setOriginalWish] = useState({
    title: "",
    body: "",
  });
  const [wish, setWish] = useState({
    title: "",
    body: "",
  });
  const navigate = useNavigate();
  const location = useLocation();

  const wishId = location.pathname.split("/")[2];

  useEffect(() => {
    async function getPrevWish() {
      try {
        const prevWish = await axios.get(
          "http://localhost:8800/wishes/" + wishId
        );
        setOriginalWish({
          title: prevWish.data[0].title,
          body: prevWish.data[0].body,
        });
        setWish({
          title: prevWish.data[0].title,
          body: prevWish.data[0].body,
        });
      } catch (err) {
        console.log(err);
      }
    }
    getPrevWish();
  }, [wishId]);

  function handleChange(e) {
    setWish((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleClick(e) {
    e.preventDefault();
    try {
      var fixedWish = { ...wish };
      if (wish.title === "") {
        fixedWish.title = originalWish.title;
        setWish(fixedWish);
      }
      if (wish.body === "") {
        fixedWish.body = originalWish.body;
        setWish(fixedWish);
      }
      await axios.put("http://localhost:8800/wishes/" + wishId, fixedWish);
      navigate("/wishes");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Screen>
      <div className="AUWrapper">
        <h1 className="AUPageTitle">Update Your Wish</h1>
        <input
          type="text"
          placeholder="Title (optional)"
          onChange={handleChange}
          name="title"
          value={wish.title}
          className="AUWishTitle"
        />
        <textarea
          type="text"
          placeholder="Description (optional)"
          onChange={handleChange}
          name="body"
          cols="5"
          rows="10"
          value={wish.body}
          className="AUWishBody"
        />
        <button onClick={handleClick} className="AUSubmit">
          Update
        </button>
      </div>
    </Screen>
  );
}

export default Update;
