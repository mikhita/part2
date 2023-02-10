import { useEffect, useState } from "react";
import Note from "./Note";
import noteServises from "../services/notes";

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    console.log("effect");
    noteServises.getAll().then((response) => {
      console.log("promise fulfilled");
      setNotes(response.data);
    });
  }, []);
  console.log("render", notes.length, "notes");

  const notesToShow = showAll
    ? notes
    : notes.filter((note) => note.important === true);

  const addNote = (event) => {
    event.preventDefault();
    const noteObject = {
      content: newNote,
      important: Math.random() > 0.5,
      id: notes.length + 1,
    };

    noteServises.create(noteObject).then((response) => {
      if (noteObject.content.length > 2) {
        setNotes(notes.concat(response.data));
        setNewNote("");
        setErrorMessage(`${noteObject.content} was added to notes`);
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
      }
    });
  };

  const handleNoteChange = (event) => {
    console.log(event.target.value);
    setNewNote(event.target.value);
  };

  const toggleImportanceOf = (id) => {
    const note = notes.find((n) => n.id === id);
    const changeNote = { ...note, important: !note.important };

    noteServises
      .update(id, changeNote)
      .then((returnedNote) => {
        setNotes(notes.map((note) => (note.id !== id ? note : returnedNote)));
      })
      .catch((error) => {
        setErrorMessage(
          `Note '${note.content}' was already removed from server`
        );
        setNotes(notes.filter((n) => n.id !== id));
      });
  };
  const Notification = ({ message }) => {
    const errorMessageStyle = {
      color: "green",
      fontStyle: "bold",
      fontSize: 26,
      padding: 10,
      backgroundColor: "#D3D3D3",
      border: "2px solid green",
      width: "70%",
    };
    if (message === null) {
      return null;
    }

    return (
      <div className="error" style={errorMessageStyle}>
        {message}
      </div>
    );
  };

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? "important" : "all"}
        </button>
      </div>
      <ul>
        {notesToShow.map((note) => (
          <Note
            key={note.id}
            note={note}
            toggleImportant={() => toggleImportanceOf(note.id)}
          />
        ))}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">save</button>
      </form>
    </div>
  );
};

export default Notes;
