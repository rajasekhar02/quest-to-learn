import React, { useEffect } from "react";
import { useLocation, Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { useProjectContext } from "./ProjectsContext";
export default function AuthHandler({ children, props }) {
  let auth = useAuth();
  let location = useLocation();
  let projectsContext = useProjectContext();
  if (!auth.isAuthenticated) {
    auth.signOut();
    return <Navigate to="/projects" state={{ from: location }} replace />;
  }
  useEffect(() => {
    if (props.appName) (async () => await auth.fetchCurrentUser())();
  }, [props.appName]);
  return children;
}
