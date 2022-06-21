import React, { useMemo } from "react";

const AboutMeContext = React.createContext({
  userDetails: undefined,
  setUserDetails: undefined,
});

export const useAboutMe = function () {
  return React.useContext(AboutMeContext);
};

export const AboutMeProvider = function ({ children }) {
  const [userDetails, setUserDetails] = React.useState(undefined);
  const value = useMemo(() => ({
    userDetails,
    setUserDetails,
  }));
  return (
    <AboutMeContext.Provider value={value}>{children}</AboutMeContext.Provider>
  );
};
export default {
  useAboutMe,
  AboutMeProvider,
};
