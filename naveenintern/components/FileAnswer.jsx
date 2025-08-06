import React, { useState, useRef, useEffect } from "react";

const FileAnswer = ({ aiResponse }) => {
  const [answers, setAnswers] = useState([]);
  const answerBoxRef = useRef(null);

  // When new aiResponse comes in, add it to answers list
  useEffect(() => {
    if (aiResponse && aiResponse.ai_message) {
      setAnswers((prevAnswers) => [...prevAnswers, { text: aiResponse.ai_message, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), }]);
    }
  }, [aiResponse]);

  // Auto scroll to latest message
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
            {answers.length === 0 ? (
              <p className="text-muted m-0">No answers yet.</p>
            ) : (
              answers.map((answer, index) => (
                <div key={index} className="m-0">
                  <p className="mb-1">
                    <strong>{answer.time}</strong> — {answer.text}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileAnswer;
