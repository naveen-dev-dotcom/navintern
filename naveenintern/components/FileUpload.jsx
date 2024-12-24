import React, { useState } from "react";

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const allowedFileType = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "image/jpg",
    "image/jpeg",
    "image/png",
  ];
  const maxFileSize = 5 * 1024 * 1024; // 5 MB

  const handleFileUpload = (e) => {
    const uploadedFile = e.target.files[0];
    setErrorMessage(""); // Reset error message

    if (uploadedFile) {
      // Validate file type
      if (!allowedFileType.includes(uploadedFile.type)) {
        setErrorMessage("Invalid file type. Please upload a PDF, DOC, DOCX, JPG, or PNG.");
        setFile(null);
        return;
      }

      // Validate file size
      if (uploadedFile.size > maxFileSize) {
        setErrorMessage("File size exceeds 5 MB limit.");
        setFile(null);
        return;
      }

      // If no errors, set the file
      setFile(uploadedFile);
    }
  };

  return (
    <div className="container w-50">
      <div className="card card-body shadow bg-body-tertiary-subtle">
        <div className="card-body d-flex justify-content-around align-items-center">
          {/* File Input */}
          <input
            className="form-control w-75"
            type="file"
            id="formFile"
            onChange={handleFileUpload}
          />

          {/* Upload Button */}
          <button
            type="submit"
            className="btn me-2 rounded-pill border border-primary"
            style={{ color: "#012970", backgroundColor: "#B5CFFF" }}
            disabled={!file} // Disable button if no file is selected
          >
            Upload
          </button>
        </div>

        {/* Error Message */}
        {errorMessage && (
          <div className="alert alert-danger mt-2" role="alert">
            {errorMessage}
          </div>
        )}

        {/* File Details */}
        {file && (
          <div className="mt-2">
            <strong>File Name:</strong> {file.name}
            <br />
            <strong>File Size:</strong> {Math.round(file.size / 1024)} KB
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUpload;
