import React from "react";

let AboutMeContext = React.createContext({
  userDetails: undefined,
  setUserDetails: undefined,
});

export const useAboutMe = function () {
  return React.useContext(AboutMeContext);
};

export const AboutMeProvider = function ({ children }) {
  let [userDetails, setUserDetails] = React.useState(undefined);
  let value = {
    userDetails,
    setUserDetails,
  };
  return (
    <AboutMeContext.Provider value={value}>{children}</AboutMeContext.Provider>
  );
};
export default {
  useAboutMe,
  AboutMeProvider,
};
