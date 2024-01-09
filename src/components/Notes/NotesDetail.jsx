import { useEffect, useState } from "react";
import NotesTitleInput from "./NotesTitleInput";
import NotesControl from "./NotesControl";
import NotesBody from "./NotesBody";
import { useNavigate } from "react-router-dom";
import parser from "html-react-parser";
import PropTypes from "prop-types";
import { getSingleNote, saveNote, deleteNote } from "../../utils/api";
import { useNotes } from "../../hooks/useNotes";

const NotesDetail = ({ mode, id = "" }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const navigate = useNavigate();
  const [editState, setEditState] = useState(false);
  const { updateNotes } = useNotes();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getNote = async () => {
      try {
        if (mode === "view") {
          const note = await getSingleNote(id);
          if (!note) {
            navigate("/error");
            return;
          }
          setTitle(note.title);
          setBody(note.body);
          setEditState(false);
          setTimeout(() => {
            setLoading(false);
            document.getElementById("notes-body").innerHTML = note.body;
          }, 500);
        } else if (mode === "edit") {
          setTimeout(() => setLoading(false), 500);
        }
      } catch {
        console.error("Failed to get note");
      }
    };
    getNote();
  }, [id, mode, navigate]);

  useEffect(() => {
    if (mode === "edit") {
      setEditState(true);
    }
  }, [mode]);

  const titleChange = (event) => {
    setTitle(event.target.value);
  };
  const bodyChange = (event) => {
    setBody(event.target.innerHTML);
  };

  const onSave = async (id) => {
    if (mode === "view") {
      await saveNote({ title, body });
      await deleteNote(id);
      await updateNotes();
      setEditState(false);
      return;
    }
    await saveNote({ title, body });
    await updateNotes();
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

  const editNote = () => {
    if (window.location.pathname.startsWith("/archived")) {
      return;
    }
    setEditState(true);
  };

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className="new-note p-6 w-[calc(100vw - 75px)] lg:w-[calc(100vw - 300px)] h-screen flex flex-col gap-5">
      <NotesTitleInput
        onChange={titleChange}
        title={title}
        disabled={editState ? false : true}
      />
      <NotesControl
        onSave={() => onSave(id)}
        onBold={onBold}
        onItalic={onItalic}
        onUnderLine={onUnderline}
        onLeftAlign={onLeftAlign}
        onCenterAlgin={onCenterAlign}
        onRightAlign={onRightAlign}
        onJustifyAlign={onJustifyAlign}
        editNote={editNote}
        controlState={
          !editState
            ? true
            : window.location.pathname.startsWith("/archived")
            ? true
            : false
        }
      />
      <NotesBody onInput={bodyChange} editState={editState ? true : false}>
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
