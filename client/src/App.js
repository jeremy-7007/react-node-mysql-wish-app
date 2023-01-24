import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import "./App.css";
import NavBar from "./components/NavBar";
import Add from "./pages/Add";
import Update from "./pages/Update";
import Wishes from "./pages/Wishes";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

import UserContext from "./context.js";
import AuthFinder from "./apis/AuthFinder";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    function getUser() {
      // fetch("http://localhost:8800/auth/login/success", {
      //   method: "GET",
      //   credentials: "include",
      //   headers: {
      //     Accept: "application/json",
      //     "Content-Type": "application/json",
      //     "Access-Control-Allow-Credentials": true,
      //   },
      // })
      AuthFinder.get("http://localhost:8800/auth/user", {
        withCredentials: true,
      })
        .then((response) => {
          if (response.status === 200) return response;
          throw new Error("Authentication has failed");
        })
        .then((resObject) => {
          setUser(resObject.data.user);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    getUser();
  }, []);

  console.log(user);

  return (
    <UserContext.Provider value={user}>
      <BrowserRouter>
        <div>
          <NavBar user={user} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/login"
              element={user ? <Navigate to="/wishes" /> : <Login />}
            />
            <Route
              path="/register"
              element={user ? <Navigate to="/wishes" /> : <Register />}
            />
            <Route
              path="/wishes"
              element={user ? <Wishes /> : <Navigate to="/login" />}
            />
            <Route
              path="/add"
              element={user ? <Add /> : <Navigate to="/login" />}
            />
            <Route
              path="/update/:id"
              element={user ? <Update /> : <Navigate to="/login" />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
