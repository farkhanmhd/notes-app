import PropTypes from "prop-types";

const Modal = ({ content, title, onClose }) => {
  return (
    <div
      id="modal"
      className="modal w-screen h-screen z-[999] fixed bg-[rgba(0,_0,_0,_0.5)] flex p-5"
      onClick={() => onClose()}
    >
      <div className="modal-box m-auto bg-slate-200 dark:bg-gray-900 pt-4 pb-6 px-4 rounded-xl dark:text-slate-200 shadow-lg flex flex-col gap-5 min-w-[auto] w-[400px] ">
        <h3 className="font-bold text-lg">{title}</h3>
        <p className="">{content}</p>
      </div>
    </div>
  );
};

Modal.propTypes = {
  content: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
