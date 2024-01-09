import { useContext, useEffect } from "react";
import { NotesContext } from "../contexts/NotesContext";
import { getActiveNotes, getArchivedNotes } from "../utils/api";

export const useNotes = () => {
  const { notes, setNotes } = useContext(NotesContext);

  const updateNotes = async () => {
    const activeNotes = await getActiveNotes();
    const archivedNotes = await getArchivedNotes();
    setNotes([...activeNotes, ...archivedNotes]);
  };

  useEffect(() => {
    updateNotes();
  }, []);
  return { notes, setNotes, updateNotes };
};
