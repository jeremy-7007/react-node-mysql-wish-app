import React from "react";
import { useNavigate } from "react-router-dom";

import Screen from "../components/Screen";

function Home(props) {
  const navigate = useNavigate();
  function handleClick() {
    navigate("/wishes");
  }

  return (
    <Screen>
      <div className="homeContainer">
        <h1 className="homeText">
          Wishes come true when you work towards them
        </h1>
        <h3 className="homeText homeSecondary">
          It can't hurt to write them all down
        </h3>
        <button className="startButton" onClick={handleClick}>
          Make a wish
        </button>
      </div>
    </Screen>
  );
}

export default Home;
