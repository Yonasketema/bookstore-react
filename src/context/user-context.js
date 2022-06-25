import React from "react";

const UserContext = React.createContext();

function UserProvider(props) {
  const [user, setUser] = React.useState(null);
  const value = [user, setUser];

  return <UserContext.Provider value={value} {...props} />;
}

function useUser() {
  const context = React.useContext(UserContext);

  return context;
}

export { UserContext, UserProvider, useUser };
