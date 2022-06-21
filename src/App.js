import React from "react";
import "./style.scss";
import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";

export default function App() {
  return (
    <div className="my-resume">
      <NavBar />
      <Outlet />
    </div>
  );
}
