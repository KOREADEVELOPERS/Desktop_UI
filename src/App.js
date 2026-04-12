import React, { useState } from "react";
import "./App.css";

function App() {

  const [code, setCode] = useState(
`class Main {
    public static void main(String[] args) {
        System.out.println("Hello World in Java");
    }
}`
  );
  const [output, setOutput] = useState("");
  const [input, setInput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [activeTab, setActiveTab] = useState("output");

  const runCode = () => {
    setIsRunning(true);
    setOutput("");
    setActiveTab("output");


    fetch("http://localhost:8080/run", {
      method: "POST",
      headers: { "Content-Type": "text/plain" },
      body: code
    })
      .then(res => res.text())
      .then(data => {
        setOutput(data);
        setIsRunning(false);
      })
      .catch(() => {
        setOutput("Error: Backend server is not running.\nMake sure the Java backend is started on port 8080.");
        setIsRunning(false);
      });
  };

  const downloadApp = () => {
    window.open(
   "https://github.com/KOREADEVELOPERS/Runnercodedraft/releases/download/vb4/BackendApp.zip",
      "_blank"
    );
  };

  const clearCode = () => {
    setCode("");
    setOutput("");
    setInput("");
  };

  const copyCode = () => {
    navigator.clipboard.writeText(code);
  };

  return (
    <div className="app-container">

      {/* ── Top Navigation Bar ── */}
      <nav className="navbar">
        <div className="nav-left">
          <div className="logo">
            <span className="logo-icon">⟨/⟩</span>
            <span className="logo-text">D-Code-Runner</span>
          </div>
          <div className="nav-links">
          </div>
        </div>
        <div className="nav-right">

          <button className="download-nav-btn" onClick={downloadApp}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            <span className="btn-label">Download App</span>
          </button>
        </div>
      </nav>

      {/* ── Compiler Header ── */}
      <div className="compiler-header">
        <div className="compiler-title">
          <div className="lang-badge java-badge">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8.851 18.56s-.917.534.653.714c1.902.218 2.874.187 4.969-.211 0 0 .552.346 1.321.646-4.699 2.013-10.633-.118-6.943-1.149M8.276 15.933s-1.028.761.542.924c2.032.209 3.636.227 6.413-.308 0 0 .384.389.987.602-5.679 1.661-12.007.13-7.942-1.218M13.116 11.475c1.158 1.333-.304 2.533-.304 2.533s2.939-1.518 1.589-3.418c-1.261-1.772-2.228-2.652 3.007-5.688 0-.001-8.216 2.051-4.292 6.573M19.33 20.504s.679.559-.747.991c-2.712.822-11.288 1.069-13.669.033-.856-.373.75-.89 1.254-.998.527-.114.828-.093.828-.093-.953-.671-6.156 1.317-2.643 1.887 9.58 1.553 17.462-.7 14.977-1.82M9.292 13.21s-4.362 1.036-1.544 1.412c1.189.159 3.561.123 5.77-.062 1.806-.152 3.618-.477 3.618-.477s-.637.272-1.098.587c-4.429 1.165-12.986.623-10.522-.569 2.082-1.006 3.776-.891 3.776-.891M17.116 17.584c4.503-2.34 2.421-4.589.968-4.285-.356.074-.515.138-.515.138s.132-.207.385-.297c2.875-1.011 5.086 2.981-.928 4.562 0-.001.07-.062.09-.118"/>
            </svg>
            Java
          </div>
          <h2>Online Java Compiler</h2>
        </div>
        <div className="compiler-actions">
          <button className="action-btn" onClick={copyCode} title="Copy Code">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
            </svg>
            <span className="btn-label">Copy</span>
          </button>
          <button className="action-btn" onClick={clearCode} title="Clear">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="3 6 5 6 21 6"/>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
            </svg>
            <span className="btn-label">Clear</span>
          </button>
          <button
            className={`run-btn ${isRunning ? "running" : ""}`}
            onClick={runCode}
            disabled={isRunning}
          >
            {isRunning ? (
              <>
                <span className="spinner"></span>
                <span className="btn-label">Compiling...</span>
              </>
            ) : (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="5 3 19 12 5 21 5 3"/>
                </svg>
                <span className="btn-label">Run</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* ── Main Compiler Body ── */}
      <div className="compiler-body">

        {/* Left: Editor */}
        <div className="editor-panel">
          <div className="panel-header">
            <span className="panel-dot red"></span>
            <span className="panel-dot yellow"></span>
            <span className="panel-dot green"></span>
            <span className="panel-title">Main.java</span>
          </div>
          <div className="line-numbers">
            {code.split("\n").map((_, i) => (
              <span key={i}>{i + 1}</span>
            ))}
          </div>
          <textarea
            className="code-editor"
            spellCheck={false}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Write your Java code here..."
          />
        </div>


        <div className="result-panel">
          <div className="result-tabs">
            <button
              className={`tab-btn ${activeTab === "output" ? "active" : ""}`}
              onClick={() => setActiveTab("output")}
            >
              Output
            </button>
            <button
              className={`tab-btn ${activeTab === "input" ? "active" : ""}`}
              onClick={() => setActiveTab("input")}
            >
              Input
            </button>
          </div>

          {activeTab === "output" ? (
            <div className="output-area">
              {output ? (
                <pre className="output-text">{output}</pre>
              ) : (
                <div className="output-placeholder">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#4a5568" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="4 17 10 11 4 5"/>
                    <line x1="12" y1="19" x2="20" y2="19"/>
                  </svg>
                  <p>Click <strong>Run</strong> to see output here</p>
                </div>
              )}
            </div>
          ) : (
            <div className="input-area">
              <textarea
                className="input-editor"
                spellCheck={false}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter input for your Java program..."
              />
            </div>
          )}
        </div>
      </div>


      <div className="download-section">
        <div className="download-card">
          <div className="download-card-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
              <line x1="8" y1="21" x2="16" y2="21"/>
              <line x1="12" y1="17" x2="12" y2="21"/>
            </svg>
          </div>
          <div className="download-card-info">
            <h3>Want Offline Access?</h3>
            <p>Download the desktop app to compile Java code without internet. Supports multiple languages.</p>
          </div>
          <button className="download-main-btn" onClick={downloadApp}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            <span className="btn-label">Download Desktop App</span>
          </button>
        </div>
      </div>


      <footer className="footer">
        <p>Java Compiler — Powered by CodingShuttle</p>
      </footer>

    </div>
  );
}

export default App;
