import React, { useState } from "react";

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const allowedFileType = [
    "application/pdf",
    "application/doc",
    "application/docx",
    "image/jpg",
    "image/png",
  ];
  const maxFileSize = 5 * 1024 * 1024;
  const handleFileUpload = (e) => {
    const uploadedFile = e.target.files[0];
    console.log(uploadedFile);
    console.log(uploadedFile.type);
    if (uploadedFile) {
      if (!allowedFileType.includes(uploadedFile.type)) {
        console.log("not a valid File");
      }
      if (uploadedFile.size > maxFileSize) {
        console.log("File size exceed");
      }
    }
    setFile(uploadedFile);
  };
  return (
    <div className="container w-50">
      <div className="card card-body shadow bg-body-tertiary-subtle">
        <div className="card-body d-flex justify-content-around align-items-center">
          <input
            className="form-control w-75"
            type="file"
            id="formFile"
            onChange={handleFileUpload}
          />
          <button
            type="submit"
            className="btn me-2 rounded-pill border border-primary"
            style={{ color: "#012970", backgroundColor: "#B5CFFF" }}
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
