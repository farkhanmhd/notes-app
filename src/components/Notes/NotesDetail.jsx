import { useEffect, useState } from "react";
import NotesTitleInput from "./NotesTitleInput";
import NotesControl from "./NotesControl";
import NotesBody from "./NotesBody";
import { useNotes } from "../../context/NotesContext";
import { useNavigate } from "react-router-dom";
import parser from "html-react-parser";
import PropTypes from "prop-types";

const NotesDetail = ({ mode, id = "" }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const { addNewNote, openNote } = useNotes();
  const navigate = useNavigate();

  useEffect(() => {
    if (mode === "view") {
      const note = openNote(id);
      if (!note) {
        navigate("/error");
        return;
      }
      setTitle(note.title);
      setBody(note.body);
      document.getElementById("notes-body").innerHTML = note.body;
    }
  }, [id, mode, openNote, navigate]);

  const titleChange = (event) => {
    setTitle(event.target.value);
  };
  const bodyChange = (event) => {
    setBody(event.target.innerHTML);
  };

  const onSave = () => {
    addNewNote({ title, body });
    navigate("/notes");
  };

  const textFormatter = (format) => {
    const currentValue = document.queryCommandValue(format);
    document.execCommand("styleWithCSS", false, true);
    if (currentValue !== "") {
      document.execCommand("removeFormat", false, null);
    } else {
      if (
        format === "Left" ||
        format === "Right" ||
        format === "Center" ||
        format === "Full"
      ) {
        document.execCommand("justify" + format, false, null);
      } else document.execCommand(format, false, null);
    }
    setBody(document.getElementById("notes-body").innerHTML);
  };

  const onBold = () => textFormatter("bold");
  const onItalic = () => textFormatter("italic");
  const onUnderline = () => textFormatter("underline");
  const onLeftAlign = () => textFormatter("Left");
  const onCenterAlign = () => textFormatter("Center");
  const onRightAlign = () => textFormatter("Right");
  const onJustifyAlign = () => textFormatter("Full");

  return (
    <div className="new-note p-6 w-[calc(100vw - 75px)] lg:w-[calc(100vw - 300px)] h-screen flex flex-col gap-5">
      <NotesTitleInput
        onChange={titleChange}
        title={title}
        disabled={mode === "edit" ? false : true}
      />
      <NotesControl
        onSave={onSave}
        onBold={onBold}
        onItalic={onItalic}
        onUnderLine={onUnderline}
        onLeftAlign={onLeftAlign}
        onCenterAlgin={onCenterAlign}
        onRightAlign={onRightAlign}
        onJustifyAlign={onJustifyAlign}
        controlState={mode === "edit" ? false : true}
      />
      <NotesBody
        onInput={bodyChange}
        editState={mode === "edit" ? true : false}
      >
        {parser(body)}
      </NotesBody>
    </div>
  );
};

NotesDetail.propTypes = {
  mode: PropTypes.oneOf(["edit", "view"]).isRequired,
  id: PropTypes.string,
};

export default NotesDetail;
