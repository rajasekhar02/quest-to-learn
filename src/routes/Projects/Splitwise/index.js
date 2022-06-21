import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useProjectContext } from "routes/Projects/ProjectsContext";
import SideNav from "./SideNav";
import { SplitwiseContextProvider } from "./SplitwiseContext";

export default function Splitwise() {
  const projectsContext = useProjectContext();
  useEffect(() => {
    projectsContext.setCurrentActiveProject("splitwise");
  }, []);
  return (
    <section className="d-flex">
      <SplitwiseContextProvider>
        <aside className="ms-n3 mt-n3 mb-auto">
          <SideNav />
        </aside>
        <main className="ms-3">
          <Outlet />
        </main>
      </SplitwiseContextProvider>
    </section>
  );
}
