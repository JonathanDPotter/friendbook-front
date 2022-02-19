import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import DataDeletion from "./components/DataDeletion/DataDeletion";
// components
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Logout from "./components/Logout/Logout";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/login" element={<Login />} />
        <Route path="/deletion" element={<DataDeletion />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
