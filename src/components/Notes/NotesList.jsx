import { Link } from "react-router-dom";
import Note from "./Note";
import PropTypes from "prop-types";

const NotesList = ({ notes, type }) => {
  return notes.length > 0 ? (
    <>
      <h2 className="text-4xl text-gray-800 pt-10 pl-10 font-bold">
        {type === "archived" ? "Archived Notes List" : "Notes List"}
      </h2>
      <div className="grid grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] gap-10 p-10 w-[calc(100vw - 75px)] lg:w-[calc(100vw - 300px)]">
        {notes.map((note) => {
          return <Note key={note.id} note={note} type={type} />;
        })}
      </div>
    </>
  ) : (
    <div className="w-[calc(100vw - 75px)] lg:w-[calc(100vw - 300px)] h-screen flex flex-col justify-center items-center gap-5">
      <h1 className="text-3xl text-gray-800 font-bold">
        {type === "archived"
          ? "There are no archived notes"
          : "There are no active notes"}
      </h1>
      <Link
        to={"/notes/new"}
        className="bg-gray-100 text-gray-900 px-5 py-2 rounded-lg duration-[250ms] hover:bg-gray-300"
      >
        Create new note
      </Link>
    </div>
  );
};

NotesList.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.object).isRequired,
  type: PropTypes.oneOf(["active", "archived"]).isRequired,
};

export default NotesList;
