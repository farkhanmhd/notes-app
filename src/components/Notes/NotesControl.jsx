import ControlButton from "../ControlButton";
import {
  FiSave,
  FiBold,
  FiUnderline,
  FiItalic,
  FiAlignLeft,
  FiAlignCenter,
  FiAlignRight,
  FiAlignJustify,
} from "react-icons/fi";
import PropTypes from "prop-types";

const NotesControl = ({
  onSave,
  onBold,
  onUnderLine,
  onItalic,
  onLeftAlign,
  onCenterAlgin,
  onRightAlign,
  onJustifyAlign,
  controlState,
}) => {
  return (
    <div
      className={`control flex items-center flex-wrap gap-x-2 w-full px-6 py-4 bg-slate-100 rounded-xl ${
        !controlState ? "text-slate-800" : "text-slate-500"
      } shadow-md`}
    >
      <ControlButton onClick={onSave} controlState={controlState}>
        <FiSave />
      </ControlButton>
      <ControlButton onClick={onBold} controlState={controlState}>
        <FiBold />
      </ControlButton>
      <ControlButton onClick={onUnderLine} controlState={controlState}>
        <FiUnderline />
      </ControlButton>
      <ControlButton onClick={onItalic} controlState={controlState}>
        <FiItalic />
      </ControlButton>
      <ControlButton onClick={onLeftAlign} controlState={controlState}>
        <FiAlignLeft />
      </ControlButton>
      <ControlButton onClick={onCenterAlgin} controlState={controlState}>
        <FiAlignCenter />
      </ControlButton>
      <ControlButton onClick={onRightAlign} controlState={controlState}>
        <FiAlignRight />
      </ControlButton>
      <ControlButton onClick={onJustifyAlign} controlState={controlState}>
        <FiAlignJustify />
      </ControlButton>
    </div>
  );
};

NotesControl.propTypes = {
  onSave: PropTypes.func.isRequired,
  onBold: PropTypes.func,
  onUnderLine: PropTypes.func,
  onItalic: PropTypes.func,
  onLeftAlign: PropTypes.func,
  onCenterAlgin: PropTypes.func,
  onRightAlign: PropTypes.func,
  onJustifyAlign: PropTypes.func,
  controlState: PropTypes.bool.isRequired,
};

export default NotesControl;
