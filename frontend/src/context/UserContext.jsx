import React, { createContext, useState, useContext, useMemo } from "react";
import PropTypes from "prop-types";

const UserContext = createContext(null);

export const useUser = () => useContext(UserContext);

function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  const contextValue = useMemo(() => ({ user, setUser }), [user]);

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
}

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default UserProvider;
