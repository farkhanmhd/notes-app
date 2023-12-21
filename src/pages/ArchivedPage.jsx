import { useNotes } from "../context/NotesContext";
import NotesList from "../components/Notes/NotesList";

const ArchivedPage = () => {
  const { getAllArchivedNotes } = useNotes();

  return <NotesList notes={getAllArchivedNotes()} type="archived" />;
};

export default ArchivedPage;
