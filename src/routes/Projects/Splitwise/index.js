import React, { useEffect } from "react";
import { Outlet, Routes, Route } from "react-router-dom";
import { SplitwiseContextProvider } from "./SplitwiseContext";
import AuthHandler from "../AuthHandler";
import RedirectHandler from "./RedirectHandler";
import Dashboard from "./Dashboard";
import { useProjectContext } from "routes/Projects/ProjectsContext";

export default function Splitwise() {
  const projectsContext = useProjectContext();
  useEffect(() => {
    console.log("1");
    projectsContext.setCurrentActiveProject("splitwise");
  }, []);
  return (
    <SplitwiseContextProvider>
      <Routes>
        <Route path="redirect" element={<RedirectHandler />}></Route>
        <Route
          path="dashboard"
          element={
            <AuthHandler>
              <Dashboard />
            </AuthHandler>
          }
        ></Route>
      </Routes>
      <Outlet></Outlet>
    </SplitwiseContextProvider>
  );
}
