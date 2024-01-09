import PropTypes from "prop-types";

const ControlButton = ({ onClick, children, controlState }) => {
  return (
    <button
      onClick={onClick}
      className={`flex justify-center items-center text-2xl dark:text-slate-200 rounded-lg p-2 duration-[250ms] ${
        window.location.pathname.startsWith("/archived/notes-")
          ? ""
          : !controlState
          ? "hover:bg-slate-300 dark:hover:bg-gray-700"
          : ""
      }`}
      disabled={
        window.location.pathname.startsWith("/archived/notes-")
          ? true
          : controlState
      }
    >
      {children}
    </button>
  );
};

ControlButton.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
  controlState: PropTypes.bool.isRequired,
};

export default ControlButton;
