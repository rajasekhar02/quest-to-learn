import React from "react";
import SplitwiseAuth from "./Splitwise/auth";
import { useProjectContext } from "./ProjectsContext";
let AuthContext = React.createContext({
  isAuthenticated: false,
  signIn: undefined,
  signOut: undefined,
  fetchCurrentUser: undefined,
  user: undefined,
  setUser: undefined
});
let signsMapper = {
  splitwise: (projectsContext) => {
    return SplitwiseAuth.signIn(projectsContext.stateForAuth.code);
  }
};
let signOutsMapper = {
  splitwise: SplitwiseAuth.signOut
};
let authStatusMapper = {
  splitwise: SplitwiseAuth.authStatus
};
let fetchUserMapper = {
  splitwise: SplitwiseAuth.fetchCurrentUser
};
export const AuthProvider = function ({ children }) {
  let projectsContext = useProjectContext();
  const currentActiveApp = projectsContext.currentActiveProject;
  let [user, setUser] = React.useState(undefined);
  let [isAuthenticated, setIsAuthenticated] = React.useState(
    SplitwiseAuth.authStatus()
  );
  let signIn = async () => {
    await signsMapper[currentActiveApp](projectsContext);
    setIsAuthenticated(authStatusMapper[currentActiveApp]());
    return true;
  };

  let signOut = (appName) => {
    signOutsMapper[appName]();
    setIsAuthenticated(authStatusMapper[appName]());
  };

  let fetchCurrentUser = async () => {
    await fetchUserMapper[currentActiveApp](setUser);
  };

  let value = {
    isAuthenticated,
    signIn,
    signOut,
    fetchCurrentUser,
    setUser,
    user
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
export const useAuth = function () {
  return React.useContext(AuthContext);
};
export default {
  AuthProvider,
  useAuth
};
