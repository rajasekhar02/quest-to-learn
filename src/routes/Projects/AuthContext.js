import React from "react";
import SplitwiseAuth from "./Splitwise/auth";
let AuthContext = React.createContext({
  isAuthenticated: false,
  signIn: undefined,
  signOut: undefined,
  fetchCurrentUser: undefined,
  stateForAuth: undefined,
  setStateForAuth: undefined,
  user: undefined,
  setUser: undefined
});
let signsMapper = {
  splitwise: (projectsContext) => {
    return SplitwiseAuth.signIn(projectsContext.stateForAuth.splitwise.code);
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
  let [user, setUser] = React.useState(undefined);
  let [stateForAuth, setStateForAuth] = React.useState(undefined);
  let [isAuthenticated, setIsAuthenticated] = React.useState(
    SplitwiseAuth.authStatus()
  );
  let signIn = async (appName) => {
    await signsMapper[appName]({ stateForAuth });
    setIsAuthenticated(authStatusMapper[appName]());
    return true;
  };

  let signOut = (appName) => {
    signOutsMapper[appName]();
    setIsAuthenticated(authStatusMapper[appName]());
  };

  let fetchCurrentUser = async (appName) => {
    await fetchUserMapper[appName](setUser);
  };

  let value = {
    isAuthenticated,
    signIn,
    signOut,
    fetchCurrentUser,
    stateForAuth,
    setStateForAuth,
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
