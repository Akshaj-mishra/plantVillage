import React, { useState } from "react";
import { Search } from "lucide-react";

function Result() {
  const [prompt, setPrompt] = useState("");
  const [textResponse, setTextResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  // --- Send prompt to backend (CNN / text generation) ---
  const handleGenerateText = async () => {
    if (!prompt.trim()) {
      alert("Please enter a prompt");
      return;
    }

    setLoading(true);
    setTextResponse(null);

    try {
      const response = await fetch("http://127.0.0.1:8000/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error: ${errorText}`);
      }

      const data = await response.json();
      setTextResponse(data.response);
    } catch (error) {
      alert(error?.message || "Text generation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      {/* Input + Button */}
      <div className="mb-4 flex items-center space-x-2">
        <input
          type="text"
          placeholder="Enter prompt..."
          className="flex-1 p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleGenerateText();
          }}
        />
        <button
          onClick={handleGenerateText}
          disabled={loading}
          className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition disabled:opacity-50"
        >
          <Search className="mr-2 w-4 h-4" />
          Submit
        </button>
      </div>

      {/* Output */}
      <div className="flex justify-center mt-7">
        {loading && <p className="text-black text-xl">Processing...</p>}

        {!loading && textResponse && (
          <div className="max-w-2xl p-4 border rounded-lg shadow-md bg-gray-50 text-black">
            <h2 className="font-bold mb-2">Model Response:</h2>
            <p>{textResponse}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Result;
