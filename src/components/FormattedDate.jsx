import { useLanguage } from "../hooks/useLanguage";
import PropTypes from "prop-types";

const FormattedDate = ({ date, className }) => {
  const { language } = useLanguage();
  const newDate = new Date(date);
  const options = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  };
  return (
    <p className={className}>{`${newDate.toLocaleDateString(
      language === "en" ? "en-UK" : "id-ID",
      options
    )}`}</p>
  );
};

FormattedDate.propTypes = {
  date: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default FormattedDate;
