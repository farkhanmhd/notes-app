import { createContext, useState } from "react";
import PropTypes from "prop-types";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [username, setUsername] = useState("");
  return (
    <UserContext.Provider value={{ username, setUsername }}>
      {children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export { UserContext, UserProvider };
