import { Link, useSearchParams } from "react-router-dom";
import Note from "./Note";
import PropTypes from "prop-types";
import SearchBar from "../Search/SearchBar";
import { useState, useEffect } from "react";
import { useLanguage } from "../../hooks/useLanguage";
import searchNote from "../../utils/util";
import { useUser } from "../../hooks/useUser";

const NotesList = ({ notes, type }) => {
  const [notesObj, setNotesObj] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const [notesLoading, setNotesLoading] = useState(true);
  const { language } = useLanguage();
  const { username } = useUser();

  useEffect(() => {
    if (notes.length > 0) {
      setTimeout(() => {
        setNotesObj(notes);
        setNotesLoading(false);
      }, 500);
    } else {
      setTimeout(() => setNotesLoading(false), 500);
    }
  }, []);

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
  }, [searchTerm, notes]);

  if (notesLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="loader"></div>
      </div>
    );
  }

  let title, emptyNotes;

  if (type === "active") {
    title =
      language === "en"
        ? `${username}'s Active Notes`
        : `Catatan Aktif ${username}`;
    emptyNotes =
      language === "en"
        ? "There are no active notes"
        : "Tidak ada catatan aktif";
  } else if (type === "archived") {
    title = language === "en" ? "Archived Notes" : "Catatan Terarsip";
    emptyNotes =
      language === "en"
        ? "There are no archived notes"
        : "Tidak ada catatan terarsip";
  }

  return (
    <div className={`w-full p-10 flex flex-col gap-10 min-h-screen`}>
      {notes.length > 0 && (
        <h2 className="text-4xl text-gray-800 font-bold dark:text-slate-200">
          {title}
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
          <h1 className="text-3xl text-gray-800 dark:text-slate-200 font-bold text-center">
            {searchTerm
              ? `${
                  language === "en"
                    ? `No results found for "${searchTerm}"`
                    : `"${searchTerm}" Tidak ditemukan`
                }`
              : emptyNotes}
          </h1>
          <Link
            to={"/notes/new"}
            className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-slate-200 dark:hover:bg-gray-700 px-5 py-2 rounded-lg duration-[250ms] hover:bg-gray-300"
          >
            {language === "en" ? "Create new note" : "Buat catatan baru"}
          </Link>
        </div>
      )}
    </div>
  );
};

const noteItemPropTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
};

NotesList.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.shape(noteItemPropTypes)).isRequired,
  type: PropTypes.oneOf(["active", "archived"]).isRequired,
};

export default NotesList;
