import React, { useState, useRef, useEffect } from "react";

const FileAnswer = () => {
  const [answers, setAnswers] = useState(["AIAnswer"]);
  const answerBoxRef = useRef(null);

  const handleQuery = () => {
    setAnswers((prevAnswers) => [
      ...prevAnswers,
      `Answer ${prevAnswers.length + 1}`,
    ]);
  };

  useEffect(() => {
    if (answerBoxRef.current) {
      answerBoxRef.current.scrollTop = answerBoxRef.current.scrollHeight;
    }
  }, [answers]);

  return (
    <div className="container mt-3 mb-3 w-50">
      <div className="card shadow bg-body-tertiary-subtle">
        <div className="card-body p-2">
          {/* Answer Display Box */}
          <div
            className="border border-primary overflow-auto p-2"
            style={{
              height: "100px",
              backgroundColor: "#B5CFFF",
              borderRadius: "5px",
            }}
            ref={answerBoxRef}
          >
            {answers.map((answer, index) => (
              <p key={index} className="m-0">
                {answer}
              </p>
            ))}
          </div>
          {/* Submit Button */}
          <button
            className="btn mt-3 rounded-pill border border-primary"
            style={{ color: "#012970", backgroundColor: "#B5CFFF" }}
            onClick={handleQuery}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default FileAnswer;
