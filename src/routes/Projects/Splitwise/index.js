import React, { useEffect, useState } from "react";
import { Outlet, Routes, Route } from "react-router-dom";
import { SplitwiseContextProvider } from "./SplitwiseContext";
import AuthHandler from "../AuthHandler";
import RedirectHandler from "./RedirectHandler";
import Dashboard from "./Dashboard";
import { useProjectContext } from "routes/Projects/ProjectsContext";

export default function Splitwise() {
  const [appName, setAppName] = useState("splitwise");
  return (
    <SplitwiseContextProvider>
      <Outlet context={{ appName: "splitwise" }}></Outlet>
    </SplitwiseContextProvider>
  );
}
