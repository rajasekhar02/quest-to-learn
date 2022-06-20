import React, { useState } from "react";
import { useSearchParams, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { useProjectContext } from "../ProjectsContext";
export default function RedirectHandler() {
  const [searchParams, setSearchParams] = useSearchParams();
  let [loading, setLoading] = useState(true);
  let projectsContext = useProjectContext();
  // const loading = true;
  let navigate = useNavigate();
  let location = useLocation();
  let auth = useAuth();
  let from = location.state?.from?.pathname || "/projects/splitwise/dashboard";
  const getAccessToken = async () => {
    try {
      if (!projectsContext.currentActiveProject) return;
      await auth.signIn();
      setLoading(false);
      navigate(from, { replace: true });
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };
  React.useEffect(() => {
    const code = searchParams.get("code") || "invalid";
    if (code === "invalid") {
      navigate("/projects", { replace: true });
    }
    projectsContext.setStateForAuth({ code });
  }, []);
  React.useEffect(() => {
    (async () => await getAccessToken())();
  }, [projectsContext.currentActiveProject]);
  return (
    <div>Redirect Handler {loading ? "loading ..." : "fetch access token"}</div>
  );
}
