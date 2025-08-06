import React, { useState } from "react";

const FileQuery = ({ queryText, setQueryText, fileAnalysisResult, setAiResponse }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async () => {
    if (!queryText.trim()) {
      setErrorMessage("Please enter a question.");
      return;
    }

    setIsLoading(true);
    setErrorMessage("");
    setAiResponse(null); // Reset previous result

     const payload = {
      text: queryText,
      file_data: fileAnalysisResult || null
    };


  console.log("Payload being sent to /ai:");
  console.log(JSON.stringify(payload, null, 2)); 
  
        try {
      const response = await fetch("http://localhost:7000/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error("Failed to get AI response");
      }

      const result = await response.json();
      console.log("AI Response:", result);
      setAiResponse(result); // Pass back to DashBoard
    } catch (err) {
      console.error(err);
      setErrorMessage("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };



  return (
    <div className="container mt-3 w-50">
      <div className="card shadow bg-body-tertiary-subtle">
        <div className="card-body">
          {/* Input Field */}
          <input
            type="text"
            className="form-control rounded-pill mb-2"
            id="questionInput"
            placeholder="Ask your questions..."
            value={queryText}
            onChange={(e) => setQueryText(e.target.value)}
            disabled={isLoading}
          />
          {/* Submit Button */}
          <div className="d-grid">
            <button
              className="btn rounded-pill border border-primary"
              style={{ color: "#012970", backgroundColor: "#B5CFFF" }}
              type="button"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? "Processing..." : "Submit"}
            </button>
          </div>
          {/* Error */}
          {errorMessage && (
            <div className="alert alert-danger mt-2" role="alert">
              {errorMessage}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default FileQuery;
