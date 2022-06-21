import React, { useMemo } from "react";

const ProjectsContext = React.createContext({
  currentActiveProject: undefined,
  setCurrentActiveProject: undefined,
  stateForAuth: undefined,
  setStateForAuth: undefined,
});
export const ProjectsProvider = function ({ children }) {
  const [currentActiveProject, setCurrentActiveProject] = React.useState(undefined);
  const [stateForAuth, setStateForAuth] = React.useState(undefined);
  const value = useMemo(() => ({
    currentActiveProject,
    setCurrentActiveProject,
    stateForAuth,
    setStateForAuth,
  }));
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
  useProjectContext,
};
