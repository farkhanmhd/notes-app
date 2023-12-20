import { createContext, useContext, useEffect, useState } from "react";
import { getAllNotes, addNote, getNote } from "../utils/local-data";
import PropTypes from "prop-types";

const NotesContext = createContext();

const NotesProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);
  const initialNotes = getAllNotes();
  useEffect(() => {
    setNotes(initialNotes);
  }, [initialNotes]);

  const addNewNote = ({ title, body }) => {
    addNote({ title, body });
    setNotes(getAllNotes);
  };

  const openNote = (id) => {
    const note = getNote(id);
    return note;
  };

  return (
    <NotesContext.Provider value={{ notes, setNotes, addNewNote, openNote }}>
      {children}
    </NotesContext.Provider>
  );
};

NotesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

const useNotes = () => {
  return useContext(NotesContext);
};

export { NotesProvider, useNotes };
