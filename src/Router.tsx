import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from "./components/Home";
import Google from "./components/Google";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/google-login" element={<Google />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
