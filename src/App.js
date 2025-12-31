import { useState } from "react";
import "./App.css";

function App() {
  const [text, setText] = useState("");
  const [audioContent, setAudioContent] = useState(null);
  const [languageCode, setLanguageCode] = useState("en-US");
  const [gender, setGender] = useState("male");

  const handleSynthesize = async () => {
    try {
      const response = await fetch(
        "https://tts-server-by28.onrender.com/synthesize",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text, languageCode, gender }),
        }
      );
      console.log(response);
      const data = await response.json();
      if (data.audioContent) {
        setAudioContent(data.audioContent);
      }
    } catch (error) {
      console.error("Error synthesizing speech:", error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Text to Speech</h1>
        <div style={{ marginBottom: "20px" }}>
          <div style={{ marginBottom: "15px" }}>
            <label style={{ marginRight: "15px" }}>
              Language:
              <select
                value={languageCode}
                onChange={(e) => setLanguageCode(e.target.value)}
                style={{ marginLeft: "5px", padding: "5px", fontSize: "14px" }}
              >
                <option value="en-US">English (US)</option>
                <option value="bn-IN">Bengali (India)</option>
                <option value="es-ES">Spanish (Spain)</option>
              </select>
            </label>
            <label style={{ marginRight: "15px" }}>
              Gender:
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                style={{ marginLeft: "5px", padding: "5px", fontSize: "14px" }}
              >
                <option value="male">Male</option>
                <option value="Female">Female</option>
                <option value="neutral">Non-binary</option>
              </select>
            </label>
          </div>
        </div>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text to synthesize"
          rows={5}
          cols={50}
        />
        <br />
        <button
          onClick={handleSynthesize}
          style={{ padding: "10px 20px", fontSize: "16px" }}
        >
          Synthesize
        </button>
        {audioContent && (
          <div style={{ marginTop: "20px" }}>
            <audio controls src={`data:audio/mp3;base64,${audioContent}`} />
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
