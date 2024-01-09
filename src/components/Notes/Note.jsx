import PropTypes from "prop-types";
import FormattedDate from "../FormattedDate";
import { Link } from "react-router-dom";
import ControlButton from "../ControlButton";
import { FiArchive, FiTrash } from "react-icons/fi";
import { MdOutlineUnarchive } from "react-icons/md";
import parser from "html-react-parser";
import { archiveNote, unArchiveNote, deleteNote } from "../../utils/api";
import { useNotes } from "../../hooks/useNotes";

const Note = ({ note, type }) => {
  const { updateNotes } = useNotes();
  const onArchive = async (event, id) => {
    event.preventDefault();
    await archiveNote(id);

    await updateNotes();
  };

  const onUnArchive = async (event, id) => {
    event.preventDefault();
    await unArchiveNote(id);

    await updateNotes();
  };

  const onDelete = async (event, id) => {
    event.preventDefault();
    await deleteNote(id);

    await updateNotes();
  };

  return (
    <Link
      to={type === "active" ? `/notes/${note.id}` : `/archived/${note.id}`}
      id={note.id}
      className="duration-[250ms] origin-top-left"
    >
      <div className="bg-slate-100 dark:bg-zinc-800 w-full h-full rounded-3xl shadow-md hover:shadow-xl cursor-pointer duration-300 text-gray-800 py-6 px-8 overflow-hidden flex flex-col">
        <h2 className=" text-2xl mb-1 font-bold dark:text-slate-200">
          {note.title}
        </h2>
        <FormattedDate
          date={note.createdAt}
          className={`dark:text-slate-200`}
        />
        <div className="body-text my-5 dark:text-slate-200">
          {parser(note.body)}
        </div>
        <div className="controls mt-auto flex justify-end gap-2">
          <ControlButton
            onClick={
              type === "active"
                ? (event) => onArchive(event, note.id)
                : (event) => onUnArchive(event, note.id)
            }
            controlState={false}
          >
            {type === "active" ? <FiArchive /> : <MdOutlineUnarchive />}
          </ControlButton>
          <ControlButton
            controlState={false}
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
