import { useNotes } from "../context/NotesContext";
import NotesList from "../components/Notes/NotesList";

const NotesPage = () => {
  const { getAllActiveNotes } = useNotes();

  return <NotesList notes={getAllActiveNotes()} type="active" />;
};

export default NotesPage;
