import PropTypes from "prop-types";

const NotesTitleInput = ({ onChange, title, disabled }) => {
  return (
    <input
      type="text"
      name="input-title"
      id="input-title"
      className="w-full text-3xl rounded-xl bg-slate-100 px-6 py-4 text-gray-800 outline-none shadow-md font-bold"
      placeholder="Title..."
      onChange={onChange}
      value={title}
      maxLength={50}
      disabled={disabled}
    />
  );
};

NotesTitleInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  title: PropTypes.string,
  disabled: PropTypes.bool,
};

export default NotesTitleInput;
