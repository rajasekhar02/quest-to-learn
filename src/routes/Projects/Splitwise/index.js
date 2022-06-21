import React, { useEffect } from "react";
import { Outlet, Routes, Route } from "react-router-dom";
import { useProjectContext } from "routes/Projects/ProjectsContext";
import SideNav from "./SideNav";
import { SplitwiseContextProvider } from "./SplitwiseContext";
import AuthHandler from "../AuthHandler";
import RedirectHandler from "./RedirectHandler";
import Dashboard from "./Dashboard";

export default function Splitwise() {
  const projectsContext = useProjectContext();
  useEffect(() => {
    projectsContext.setCurrentActiveProject("splitwise");
  }, []);
  return (
    <div className="d-flex">
      <SplitwiseContextProvider>
        <Routes>
          <Route path="redirect" element={<RedirectHandler />} />
          <Route
            path="dashboard"
            element={(
              <AuthHandler>
                <Dashboard />
              </AuthHandler>
            )}
          />
        </Routes>
        <aside>
          <SideNav />
        </aside>
        <main className="border-primary border-end border-opacity-25 m-2 ">
          <Outlet />
        </main>
      </SplitwiseContextProvider>
    </div>
  );
}
