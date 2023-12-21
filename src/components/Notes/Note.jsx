import PropTypes from "prop-types";
import formattedDate from "./../../utils/formattedDate";
import { Link } from "react-router-dom";
import { useNotes } from "../../context/NotesContext";
import ControlButton from "../ControlButton";
import { FiArchive, FiTrash } from "react-icons/fi";
import { MdOutlineUnarchive } from "react-icons/md";
import parser from "html-react-parser";

const Note = ({ note, type }) => {
  const { noteArchive, noteUnArchive, noteDelete } = useNotes();

  const onArchive = (event, id) => {
    event.preventDefault();
    noteArchive(id);
  };

  const onUnArchive = (event, id) => {
    event.preventDefault();
    noteUnArchive(id);
  };

  const onDelete = (event, id) => {
    event.preventDefault();
    noteDelete(id);
  };

  return (
    <Link
      to={
        type === "active" ? `/notes/${note.id}` : `/notes/archived/${note.id}`
      }
    >
      <div className="bg-slate-100 w-full h-full rounded-3xl shadow-md hover:shadow-xl cursor-pointer duration-300 text-gray-800 py-6 px-8 overflow-hidden flex flex-col">
        <h2 className=" text-2xl mb-1 font-bold">{note.title}</h2>
        <p className="text-sm">{formattedDate(note.createdAt)}</p>
        <div className="body-text my-5 ">{parser(note.body)}</div>
        <div className="controls mt-auto flex justify-end gap-2">
          <ControlButton
            onClick={
              type === "active"
                ? (event) => onArchive(event, note.id)
                : (event) => onUnArchive(event, note.id)
            }
            controlState={!true}
          >
            {type === "active" ? <FiArchive /> : <MdOutlineUnarchive />}
          </ControlButton>
          <ControlButton
            controlState={!true}
            onClick={(event) => onDelete(event, note.id)}
          >
            <FiTrash />
          </ControlButton>
        </div>
      </div>
    </Link>
  );
};

Note.propTypes = {
  note: PropTypes.object.isRequired,
  type: PropTypes.oneOf(["active", "archived"]).isRequired,
};

export default Note;
