import { useState } from "react";
import "./App.css";   // ✅ CSS add

function App() {
  const [content, setContent] = useState("");
  const [pasteId, setPasteId] = useState("");

  const createPaste = async () => {
    const res = await fetch("/api/pastes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content }),
    });

    const data = await res.json();
    setPasteId(data.id);
  };

  return (
    <div className="page">   {/* ✅ sirf class add */}
      <div className="card">
        <h1>📋 Pastebin Lite</h1>

        <textarea
          rows="10"
          cols="60"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <button onClick={createPaste}>Create Paste</button>

        {pasteId && (
          <p className="result">
            Paste URL:
            <a href={`/api/pastes/${pasteId}`} target="_blank">
              /api/pastes/{pasteId}
            </a>
          </p>
        )}
      </div>
    </div>
  );
}

export default App;
