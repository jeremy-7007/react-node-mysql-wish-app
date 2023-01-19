import React from "react";
import { BsFillPencilFill, BsFillTrashFill } from "react-icons/bs";

function WishItem({ id, title, body, onEdit, onDelete }) {
  return (
    <li className="wishItemWrapper" key={id}>
      <div className="wishItemTextBox">
        <h3>{title}</h3>
        <p>{body}</p>
      </div>
      <div className="iconBox">
        <BsFillPencilFill className="wishItemIcon" onClick={onEdit} />
        <BsFillTrashFill className="wishItemIcon" onClick={onDelete} />
      </div>
    </li>
  );
}

export default WishItem;
