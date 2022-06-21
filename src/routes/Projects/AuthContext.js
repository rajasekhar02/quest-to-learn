import React, { useMemo } from "react";
import SplitwiseAuth from "./Splitwise/auth";
import { useProjectContext } from "./ProjectsContext";

const AuthContext = React.createContext({
  isAuthenticated: false,
  signIn: undefined,
  signOut: undefined,
  fetchCurrentUser: undefined,
  user: undefined,
  setUser: undefined,
});
const signsMapper = {
  splitwise: (projectsContext) => SplitwiseAuth.signIn(projectsContext.stateForAuth.code),
};
const signOutsMapper = {
  splitwise: SplitwiseAuth.signOut,
};
const authStatusMapper = {
  splitwise: SplitwiseAuth.authStatus,
};
const fetchUserMapper = {
  splitwise: SplitwiseAuth.fetchCurrentUser,
};
export const AuthProvider = function ({ children }) {
  const projectsContext = useProjectContext();
  const currentActiveApp = projectsContext.currentActiveProject;
  const [user, setUser] = React.useState(undefined);
  const [isAuthenticated, setIsAuthenticated] = React.useState(
    SplitwiseAuth.authStatus()
  );
  const signIn = async () => {
    await signsMapper[currentActiveApp](projectsContext);
    setIsAuthenticated(authStatusMapper[currentActiveApp]());
    return true;
  };

  const signOut = (appName) => {
    signOutsMapper[appName]();
    setIsAuthenticated(authStatusMapper[appName]());
  };

  const fetchCurrentUser = async () => {
    await fetchUserMapper[currentActiveApp](setUser);
  };

  const value = useMemo(() => ({
    isAuthenticated,
    signIn,
    signOut,
    fetchCurrentUser,
    setUser,
    user,
  }));

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
export const useAuth = function () {
  return React.useContext(AuthContext);
};
export default {
  AuthProvider,
  useAuth,
};
