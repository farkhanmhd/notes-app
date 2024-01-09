// import { useEffect } from "react";
import NotesList from "../components/Notes/NotesList";
import { useNotes } from "../hooks/useNotes";

const NotesPage = () => {
  const { notes } = useNotes();

  return (
    <NotesList
      notes={notes
        .filter((note) => !note.archived)
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))}
      type="active"
    />
  );
};

export default NotesPage;
