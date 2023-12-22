import { Link, useSearchParams } from "react-router-dom";
import Note from "./Note";
import PropTypes from "prop-types";
import SearchBar from "../Search/SearchBar";
import { useState, useEffect } from "react";
import { useNotes } from "../../context/NotesContext";

const NotesList = ({ notes, type }) => {
  const [notesObj, setNotesObj] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const { searchNote } = useNotes();

  useEffect(() => {
    setNotesObj(notes);
  }, [notes]);

  useEffect(() => {
    const titleParam = searchParams.get("title");
    if (titleParam) {
      setSearchTerm(titleParam);
    }
  }, [searchParams]);

  const changeSearchParams = (keyword) => {
    setSearchParams({ title: keyword });
  };

  const onSearch = (event) => {
    event.preventDefault();
    const keyword = event.target.value;
    setSearchTerm(keyword);
    changeSearchParams(keyword);
  };

  useEffect(() => {
    const searchResult = searchNote(searchTerm, notes);
    setNotesObj(searchResult);
  }, [searchTerm, notes, searchNote]);

  return (
    <div className={`w-full p-10 flex flex-col gap-10 min-h-screen`}>
      {notes.length > 0 && (
        <h2 className="text-4xl text-gray-800 font-bold">
          {type === "archived" ? "Archived Notes List" : "Notes List"}
        </h2>
      )}

      {notes.length > 0 && <SearchBar value={searchTerm} onInput={onSearch} />}
      {notesObj.length > 0 ? (
        <div className="grid grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] gap-10 w-[calc(100vw - 75px)] lg:w-[calc(100vw - 300px)]h-full">
          {notesObj.map((note) => (
            <Note key={note.id} note={note} type={type} />
          ))}
        </div>
      ) : (
        <div
          className={`w-full flex flex-col gap-5 items-center justify-center ${
            searchTerm ? "" : "m-auto"
          }`}
        >
          <h1 className="text-3xl text-gray-800 font-bold text-center">
            {searchTerm
              ? `No results found for "${searchTerm}"`
              : type === "archived"
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
      )}
    </div>
  );
};
NotesList.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.object).isRequired,
  type: PropTypes.oneOf(["active", "archived"]).isRequired,
};

export default NotesList;
