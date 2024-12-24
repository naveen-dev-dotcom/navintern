import React from "react";

const FileQuery = () => {
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
          />
          {/* Submit Button */}
          <div className="d-grid">
            <button
              className="btn rounded-pill border border-primary"
              style={{ color: "#012970", backgroundColor: "#B5CFFF" }}
              type="button"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileQuery;
