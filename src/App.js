import "./App.css";
import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Container } from "@mui/material";

import Navbar from "./Components/Navbar/Navbar";
import Home from "./Components/Home/Home";
import Auth from "./Components/Auth/Auth";
import PostDetails from "./Components/PostDetails/PostDetails";
import CreatorOrTag from "./Components/CreatorOrTag/CreatorOrTag";

function App() {
  // const user = JSON.parse(localStorage.getItem("profile"));

  const [mode, togglemode] = useState("Light");
  const changemode = () => {
    if (mode === "Light") {
      document.body.style.backgroundColor = "#272727";
      togglemode("Dark");
    } else {
      togglemode("Light");
      document.body.style.backgroundColor = "#e8e8e8";
    }
  };

  return (
    <BrowserRouter>
      <Navbar mode={mode} changemode={changemode} />
      <Container maxWidth="xl">
        <Routes>
          <Route
            exact
            path="/"
            element={<Navigate replace to="/posts" />}
          ></Route>
          <Route exact path="/posts" element={<Home mode={mode} />}></Route>
          <Route exact path="/posts/search" element={<Home />}></Route>
          <Route exact path="/posts/:id" element={<PostDetails />}></Route>
          <Route
            exact
            path="/auth"
            // element={!user ? <Auth /> : <Navigate replace to="/posts" />}
            element={<Auth mode={mode} />}
          ></Route>
          <Route
            path={"/creator/:name"|| "/tags/:name"}
            element={<CreatorOrTag />}
          ></Route>
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
