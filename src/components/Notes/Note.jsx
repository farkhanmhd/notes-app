import PropTypes from "prop-types";
import formattedDate from "./../../utils/formattedDate";
import { Link } from "react-router-dom";

const Note = ({ id, title, date, body }) => {
  return (
    <Link to={`/notes/${id}`}>
      <div className="bg-slate-100 w-full h-full rounded-3xl shadow-md hover:shadow-xl cursor-pointer duration-300 text-gray-800 py-6 px-8 overflow-hidden self-start">
        <h2 className=" text-2xl mb-1 font-bold">{title}</h2>
        <p className="text-sm">{formattedDate(date)}</p>
        <div className="body-text mt-5 ">{body}</div>
      </div>
    </Link>
  );
};

Note.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  body: PropTypes.any.isRequired,
};

export default Note;
