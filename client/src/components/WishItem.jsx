import React from "react";

function WishItem({ title, body }) {
  return (
    <div className="wishItemWrapper">
      <div className="wishItemTextBox">
        <h3>Test title</h3>
        <p>
          Test body I am very loooooooooooooooooooongggggggggggggggggg
          Tooooooooooooooooooo loooooooongggggggggggggggggggggg
        </p>
      </div>
      <div className="iconBox"></div>
    </div>
  );
}

export default WishItem;
