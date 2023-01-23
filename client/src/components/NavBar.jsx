import React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../context";

function NavBar(props) {
  const user = useContext(UserContext);

  const authUrl =
    process.env.NODE_ENV === "production"
      ? "/auth"
      : "http://localhost:8800/auth";
  function handleLogout() {
    window.open(authUrl + "/logout", "_self");
  }

  return (
    <div className="navbar">
      <span className="logo">
        <Link to="/" className="navLink">
          Wish App
        </Link>
      </span>
      {user ? (
        <ul className="navList">
          {/* <li className="listItem">
            <img src={user.profileImg} alt="" className="avatar" />
          </li> */}
          <li className="username">{user.name}</li>
          <li className="logout" onClick={handleLogout}>
            Logout
          </li>
        </ul>
      ) : (
        <Link to="/login" className="navLink">
          Login
        </Link>
      )}
    </div>
  );
}

export default NavBar;
