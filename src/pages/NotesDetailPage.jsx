import { useParams, Navigate } from "react-router-dom";
import NotesDetail from "../components/Notes/NotesDetail";

const NotesDetailPage = () => {
  const { id } = useParams();

  if (!id.startsWith("notes-")) {
    return <Navigate to="/error" />;
  }

  return <NotesDetail mode="view" id={id} />;
};

export default NotesDetailPage;
