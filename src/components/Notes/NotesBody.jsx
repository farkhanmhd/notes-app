import PropTypes from "prop-types";

const NotesBody = ({ onInput, body, editState }) => {
  return (
    <div
      id="notes-body"
      className="w-full h-full rounded-xl shadow-md hover:shadow-xl text-lg bg-slate-100 text-gray-800 px-6 py-4 outline-none empty:before:content-[attr(data-placeholder)] empty:before:text-gray-400 "
      contentEditable={editState}
      data-placeholder={"Write your notes here..."}
      onInput={onInput}
    >
      {body}
    </div>
  );
};

NotesBody.propTypes = {
  onInput: PropTypes.func.isRequired,
  body: PropTypes.node,
  editState: PropTypes.bool,
};

export default NotesBody;
