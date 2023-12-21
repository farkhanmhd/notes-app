import PropTypes from "prop-types";

const ControlButton = ({ onClick, children, controlState }) => {
  return (
    <button
      onClick={onClick}
      className={`flex justify-center items-center text-2xl rounded-lg p-2 duration-[250ms] ${
        !controlState ? "hover:bg-slate-200" : ""
      }`}
      disabled={controlState}
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
