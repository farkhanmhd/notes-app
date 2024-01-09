import { createContext, useState } from "react";
import PropTypes from "prop-types";

const NotesContext = createContext();

const NotesProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);

  return (
    <NotesContext.Provider
      value={{
        notes,
        setNotes,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
};

NotesProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export { NotesContext, NotesProvider };
