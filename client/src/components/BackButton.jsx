import React from "react";
import { BsChevronLeft } from "react-icons/bs";

function BackButton({ onClick }) {
  return (
    <div className="backButton" onClick={onClick}>
      <BsChevronLeft className="backIcon" />
      <h4 className="backText">Back</h4>
    </div>
  );
}

export default BackButton;
