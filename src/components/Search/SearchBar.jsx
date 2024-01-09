import PropTypes from "prop-types";
import { useLanguage } from "../../hooks/useLanguage";

const SearchBar = ({ onInput, value }) => {
  const { language } = useLanguage();
  return (
    <input
      type="text"
      name="input-title"
      id="input-title"
      className="w-full text-xl rounded-xl bg-slate-100 px-6 py-3 text-gray-800 outline-none shadow-md dark:bg-zinc-800 dark:text-slate-200"
      placeholder={
        language === "en" ? "Search by title..." : "Cari berdasarkan judul..."
      }
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
