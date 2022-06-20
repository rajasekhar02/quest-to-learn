import React from "react";

let ProjectsContext = React.createContext({
  currentActiveProject: undefined,
  setCurrentActiveProject: undefined,
  stateForAuth: undefined,
  setStateForAuth: undefined
});
export const ProjectsProvider = function ({ children }) {
  let [currentActiveProject, setCurrentActiveProject] =
    React.useState(undefined);
  let [stateForAuth, setStateForAuth] = React.useState(undefined);
  let value = {
    currentActiveProject,
    setCurrentActiveProject,
    stateForAuth,
    setStateForAuth
  };
  return (
    <ProjectsContext.Provider value={value}>
      {children}
    </ProjectsContext.Provider>
  );
};
export const useProjectContext = function () {
  return React.useContext(ProjectsContext);
};
export default {
  ProjectsProvider,
  useProjectContext
};
