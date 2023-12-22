import { createContext, useContext, useEffect, useState } from "react";
import {
  getAllNotes,
  addNote,
  getNote,
  archiveNote,
  getActiveNotes,
  getArchivedNotes,
  unarchiveNote,
  deleteNote,
} from "../utils/local-data";
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

  const noteArchive = (id) => {
    archiveNote(id);
    setNotes(getAllNotes);
  };

  const noteUnArchive = (id) => {
    unarchiveNote(id);
    setNotes(getAllNotes);
  };

  const noteDelete = (id) => {
    deleteNote(id);
    setNotes(getAllNotes);
  };

  const getAllActiveNotes = () => {
    const activeNotes = getActiveNotes();
    return activeNotes;
  };
  const getAllArchivedNotes = () => {
    const archivedNotes = getArchivedNotes();
    return archivedNotes;
  };

  const searchNote = (title, notesObj) => {
    const foundedNote = notesObj.filter((note) =>
      note.title.toLowerCase().includes(title)
    );
    return foundedNote;
  };

  return (
    <NotesContext.Provider
      value={{
        notes,
        setNotes,
        addNewNote,
        openNote,
        noteArchive,
        getAllActiveNotes,
        getAllArchivedNotes,
        noteUnArchive,
        noteDelete,
        searchNote,
      }}
    >
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
