import PropTypes from "prop-types";

const SearchBar = ({ onInput, value }) => {
  return (
    <input
      type="text"
      name="input-title"
      id="input-title"
      className="w-full text-xl rounded-xl bg-slate-100 px-6 py-3 text-gray-800 outline-none shadow-md "
      placeholder="Search a note..."
      onInput={onInput}
      maxLength={50}
      value={value}
    />
  );
};

SearchBar.propTypes = {
  onInput: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default SearchBar;
