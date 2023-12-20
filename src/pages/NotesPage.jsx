import Note from "../components/Notes/Note";
import { useNotes } from "../context/NotesContext";
import parser from "html-react-parser";
import { Link } from "react-router-dom";

const NotesPage = () => {
  const { notes } = useNotes();
  return notes.filter((note) => !note.archived).length > 0 ? (
    <>
      <h2 className="text-4xl text-gray-800 pt-10 pl-10 font-bold">
        Active Notes List
      </h2>
      <div className="grid grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] gap-10 p-10 w-[calc(100vw - 75px)] lg:w-[calc(100vw - 300px)]">
        {notes
          .filter((note) => !note.archived)
          .map((note) => {
            return (
              <Note
                key={note.id}
                id={note.id}
                title={note.title}
                date={note.createdAt}
                body={parser(note.body)}
              />
            );
          })}
      </div>
    </>
  ) : (
    <div className="w-[calc(100vw - 75px)] lg:w-[calc(100vw - 300px)] h-screen flex flex-col justify-center items-center gap-5">
      <h1 className="text-2xl text-gray-800">There are no notes</h1>
      <Link
        to={"/notes/new"}
        className="bg-gray-100 text-gray-900 px-5 py-2 rounded-lg duration-[250ms] hover:bg-gray-300"
      >
        Create new note
      </Link>
    </div>
  );
};

export default NotesPage;
