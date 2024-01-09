// import { useEffect } from "react";
import NotesList from "../components/Notes/NotesList";
import { useNotes } from "../hooks/useNotes";

const NotesPage = () => {
  const { notes } = useNotes();

  return (
    <NotesList notes={notes.filter((note) => note.archived)} type="archived" />
  );
};

export default NotesPage;
