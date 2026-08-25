import { useState } from "react";
import "./App.css";

function App() {
  const [notes, setNotes] = useState([]);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const addNote = (e) => {
    e.preventDefault();

    if (!title.trim() && !content.trim()) {
      return;
    }

    const newNote = {
      id: Date.now(),
      title: title.trim() || "Untitled Note",
      content: content.trim(),
      date: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
    };

    setNotes((previousNotes) => [
      newNote,
      ...previousNotes,
    ]);

    setTitle("");
    setContent("");
  };

  const deleteNote = (id) => {
    setNotes((previousNotes) =>
      previousNotes.filter((note) => note.id !== id)
    );
  };

  return (
    <div className="notes-page">

      <div className="notes-container">

        {/* Header */}

        <header className="notes-header">

          <div className="header-icon">
            📝
          </div>

          <div>
            <h1>Notes App</h1>
            <p>
              Create and organize your notes
            </p>
          </div>

        </header>

        {/* Create Note */}

        <div className="create-note-card">

          <h2>Create a New Note</h2>

          <form onSubmit={addNote}>

            <input
              type="text"
              placeholder="Note title..."
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
            />

            <textarea
              placeholder="Write your note here..."
              value={content}
              onChange={(e) =>
                setContent(e.target.value)
              }
              rows="5"
            ></textarea>

            <button
              type="submit"
              className="add-button"
            >
              + Add Note
            </button>

          </form>

        </div>

        {/* Notes Header */}

        <div className="notes-title">

          <div>
            <h2>My Notes</h2>

            <p>
              {notes.length === 0
                ? "You don't have any notes yet."
                : `${notes.length} ${
                    notes.length === 1
                      ? "note"
                      : "notes"
                  }`}
            </p>
          </div>

          <div className="notes-count">
            {notes.length}
          </div>

        </div>

        {/* Notes */}

        {notes.length === 0 ? (

          <div className="empty-state">

            <div className="empty-icon">
              📄
            </div>

            <h3>No Notes Yet</h3>

            <p>
              Create your first note using
              the form above.
            </p>

          </div>

        ) : (

          <div className="notes-grid">

            {notes.map((note) => (

              <div
                className="note-card"
                key={note.id}
              >

                <div className="note-top">

                  <div className="note-icon">
                    📌
                  </div>

                  <button
                    className="delete-button"
                    onClick={() =>
                      deleteNote(note.id)
                    }
                    aria-label="Delete note"
                  >
                    🗑️
                  </button>

                </div>

                <h3>
                  {note.title}
                </h3>

                <p className="note-content">
                  {note.content ||
                    "No content added."}
                </p>

                <div className="note-date">
                  📅 {note.date}
                </div>

              </div>

            ))}

          </div>

        )}

        <p className="footer">
          Built with React and Vite
        </p>

      </div>

    </div>
  );
}

export default App;