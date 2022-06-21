import React from "react";
let SplitwiseContext = React.createContext({
  groups: undefined,
  setGroups: undefined,
  indexOnUsersInGroups: undefined,
  setIndexOnUsersInGroups: undefined,
});

export const SplitwiseContextProvider = function ({ children }) {
  let [groups, setGroups] = React.useState(undefined);
  let [indexOnUsersInGroups, setIndexOnUsersInGroups] =
    React.useState(undefined);
  let value = {
    groups,
    setGroups,
    indexOnUsersInGroups,
    setIndexOnUsersInGroups,
  };
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
