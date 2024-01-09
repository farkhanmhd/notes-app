const searchNote = (searchTerm, notes) => {
  return notes.filter((note) =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
};

export default searchNote;
