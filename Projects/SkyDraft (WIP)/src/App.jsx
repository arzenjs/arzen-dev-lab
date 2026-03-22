import './App.css'

function App() {
  return (
    <div className="app">
      
      {/* Header */}
      <header className="header">
        <h1>SkyDraft</h1>
        <div className="header-buttons">
          <button className="toggle-btn">Toggle Dark</button>
          <button className="add-btn">+ Add Note</button>
        </div>
      </header>

      {/* Add Note Form (static for now) */}
      <div className="note-form">
        <input type="text" placeholder="Note Title" />
        <textarea placeholder="Write your note here..."></textarea>
        <div className="form-buttons">
          <button className="save-btn">Save</button>
          <button className="cancel-btn">Cancel</button>
        </div>
      </div>

      {/* Notes Grid */}
      <div className="notes-grid">
        <div className="note-card">
          <h3>Sample Note</h3>
          <p>This is a preview of the note content...</p>
          <div className="card-buttons">
            <button>Edit</button>
            <button>Delete</button>
          </div>
        </div>

        <div className="note-card">
          <h3>Another Note</h3>
          <p>Notes will appear here once created.</p>
          <div className="card-buttons">
            <button>Edit</button>
            <button>Delete</button>
          </div>
        </div>
      </div>

    </div>
  )
}

export default App
