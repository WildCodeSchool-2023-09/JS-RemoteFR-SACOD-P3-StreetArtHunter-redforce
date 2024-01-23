import React, { createContext, useState, useContext, useMemo } from "react";
import { redirect } from "react-router-dom";
import PropTypes from "prop-types";

const UserContext = createContext(null);

export const useUser = () => useContext(UserContext);

function UserProvider({ children }) {
  const [user, setUser] = useState();

  const contextValue = useMemo(() => ({ user, setUser }), [user, setUser]);

  if (!user) {
    return (
      <UserContext.Provider value={contextValue}>
        {children}
      </UserContext.Provider>
    );
  }
  return redirect("/home");
}

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default UserProvider;
