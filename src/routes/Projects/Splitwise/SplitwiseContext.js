import React, { useMemo } from "react";

const SplitwiseContext = React.createContext({
  groups: undefined,
  setGroups: undefined,
  indexOnUsersInGroups: undefined,
  setIndexOnUsersInGroups: undefined,
});

export const SplitwiseContextProvider = function ({ children }) {
  const [groups, setGroups] = React.useState(undefined);
  const [indexOnUsersInGroups, setIndexOnUsersInGroups] = React.useState(undefined);
  const value = useMemo(() => ({
    groups,
    setGroups,
    indexOnUsersInGroups,
    setIndexOnUsersInGroups,
  }));
  return (
    <SplitwiseContext.Provider value={value}>
      {children}
    </SplitwiseContext.Provider>
  );
};

export const useSplitwise = function () {
  return React.useContext(SplitwiseContext);
};

export default {
  SplitwiseContextProvider,
  useSplitwise,
};
