import React, { useState } from "react";
import PropTypes from "prop-types";


const FileUpload = ({ setFileAnalysisResult }) => {
  const [file, setFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  


  const allowedFileType = [
    "image/jpg",
    "image/jpeg",
    "image/png",
    "video/mp4",
    "audio/mpeg",
    "audio/wav"
  ];
  const maxFileSize = 5 * 1024 * 1024; // 5 MB

  const handleFileUpload = (e) => {
    const uploadedFile = e.target.files[0];
    setErrorMessage(""); // Reset error message
       setFile(null);
    setFileAnalysisResult(null); // Reset previous result

    if (uploadedFile) {
      // Validate file type
      if (!allowedFileType.includes(uploadedFile.type)) {
        setErrorMessage("Invalid file type. Please upload  an image, video or audio.");
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

    const uploadFileToBackend = async () => {
    if (!file) return;
    setIsUploading(true);
    setErrorMessage("");
    setSuccessMessage("");

  const isImage = file.type.startsWith("image/");
  const formData = new FormData();
  formData.append(isImage ? "image" : "video", file);
    

  const endpoint = isImage
    ? "http://localhost:5000/analyze-image"
    : "http://localhost:5000/analyze";

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Failed to upload file");
    }

    const result = await response.json();
    console.log("File Analysis Result:", result);
    setSuccessMessage("File uploaded successfully!");
    setFileAnalysisResult(result);
  } catch (err) {
    console.error(err);
    setErrorMessage("Upload failed. Try again.");
    setSuccessMessage("");
  } finally {
    setIsUploading(false);
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
            disabled={!file || isUploading}
            onClick={uploadFileToBackend}
          >
            {isUploading ? "Uploading..." : "Upload"}
          </button>
        {/* Success Message */}
        {successMessage && (
          <div className="alert alert-success mt-3" role="alert">
            {successMessage}
          </div>
        )}

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
            <br />
            <strong>Type:</strong> {file.type}
          </div>
        )}
      </div>
    </div>
  );
};
  FileUpload.propTypes = {
  setFileAnalysisResult: PropTypes.func.isRequired,
};

export default FileUpload;
