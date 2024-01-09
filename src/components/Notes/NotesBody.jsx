import PropTypes from "prop-types";
import { useLanguage } from "../../hooks/useLanguage";

const NotesBody = ({ onInput, body, editState }) => {
  const { language } = useLanguage();
  return (
    <div
      id="notes-body"
      className="w-full h-full rounded-xl shadow-md hover:shadow-xl text-lg bg-slate-100 dark:bg-zinc-800 text-gray-800 dark:text-slate-200 px-6 py-4 outline-none empty:before:content-[attr(data-placeholder)] empty:before:text-gray-400 "
      contentEditable={editState}
      data-placeholder={
        language === "en"
          ? "Write your note here..."
          : "Tulis catatan kamu disini..."
      }
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
