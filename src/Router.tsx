import React from "react";
import { Route, Routes, BrowserRouter} from "react-router-dom";
import DataDeletion from "./components/DataDeletion/DataDeletion";
// components
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Logout from "./components/Logout/Logout";
import NavBar from "./components/NavBar/NavBar";

const Router = () => {

  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/login" element={<Login />} />
        <Route path="/deletion" element={<DataDeletion />} />
        <Route path="*" element={<h1>404 not found</h1>} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
