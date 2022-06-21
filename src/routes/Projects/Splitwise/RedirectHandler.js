import React, { useState } from "react";
import {
  useSearchParams,
  useNavigate,
  useLocation,
  useOutletContext
} from "react-router-dom";
import { useAuth } from "../AuthContext";
export default function RedirectHandler() {
  const [searchParams, setSearchParams] = useSearchParams();
  let [loading, setLoading] = useState(true);
  let projectsContext = useOutletContext();
  // const loading = true;
  let navigate = useNavigate();
  let location = useLocation();
  let auth = useAuth();
  let from = location.state?.from?.pathname || "/projects/splitwise/dashboard";
  const getAccessToken = async () => {
    try {
      await auth.signIn(projectsContext.appName);
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
    auth.setStateForAuth({ splitwise: { code } });
  }, []);
  React.useEffect(() => {
    if (!projectsContext.appName || !auth.stateForAuth) return;
    (async () => await getAccessToken())();
  }, [projectsContext.appName, auth.stateForAuth]);
  return (
    <div>Redirect Handler {loading ? "loading ..." : "fetch access token"}</div>
  );
}
