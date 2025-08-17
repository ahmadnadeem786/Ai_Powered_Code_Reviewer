import { useState } from "react";
import "prismjs/themes/prism-tomorrow.css";
import Editor from "react-simple-code-editor";
import Prism from "prismjs";
import "./App.css";
import axios from "axios";
import Markdown from "react-markdown";

function App() {
  const [review, setReview] = useState("");
  const [code, setCode] = useState(`function sum() {\n  return 1 + 1;\n}`);
  const [loading, setLoading] = useState(false);

  async function reviewCode() {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:3001/ai/get-review", { code });
      setReview(response.data);
    } catch (error) {
      console.error("Error fetching review:", error);
      setReview("❌ Error: Could not fetch review.");
    }
    setLoading(false);
  }

  return (
    <div id="main">
      <div id="left">
        <div id="code">
          <Editor
            value={code}
            onValueChange={setCode}
            highlight={(code) => Prism.highlight(code, Prism.languages.javascript, "javascript")}
            padding={10}
            style={{
              fontFamily: '"Fira Code", monospace',
              fontSize: 16,
              height: "100%",
              width: "100%",
              backgroundColor: "#2d2d2d",
              color: "#f8f8f2",
            }}
          />
        </div>
        <button onClick={reviewCode} id="review" disabled={loading}>
          {loading ? "Reviewing..." : "Review"}
        </button>
      </div>
      <div id="right">
        <Markdown>{review || "Click 'Review' to analyze the code."}</Markdown>
      </div>
    </div>
  );
}

export default App;
