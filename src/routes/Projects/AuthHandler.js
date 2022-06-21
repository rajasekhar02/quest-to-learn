import React, { useEffect } from "react";
import { useLocation, Navigate, useOutletContext } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { useProjectContext } from "./ProjectsContext";
export default function AuthHandler({ children, props }) {
  let auth = useAuth();
  let location = useLocation();
  let projectsContext = useOutletContext();
  if (!auth.isAuthenticated) {
    auth.signOut(projectsContext.appName);
    return <Navigate to="/projects" state={{ from: location }} replace />;
  }
  useEffect(() => {
    if (!projectsContext.appName) return;
    (async () => await auth.fetchCurrentUser(projectsContext.appName))();
  }, [projectsContext.appName]);
  return children;
}
