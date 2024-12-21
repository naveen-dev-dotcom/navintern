import React, { useContext, useEffect, useState } from "react";
import { UserRegContext } from "../src/contexts/UserRegContext";
import axios from "axios";
// import { useNavigate } from "react-router-dom";

const Submission = () => {
  const { completeData } = useContext(UserRegContext); // Access context for user data
  const URL = import.meta.env.VITE_REGISTRATION_VERIFY_API;
  // const [submissionError, setSubmissionError] = useState(null); // State to track submission errors
  // const navigate = useNavigate();

  useEffect(() => {
    // Retrieve complete user data
    const data = completeData();

    // Validate required fields before submitting
    // if (!data.name || !data.email || !data.password || !data.plan) {
    //   setSubmissionError("Please ensure all required fields are completed.");
    //   console.error("Validation failed:", data);
    //   return;
    // }

    // Submit data to the backend
    const submitData = async () => {
      try {
        console.log("Submitting data:", data);
        const response = await axios.post(URL, data);

        // if (response.data.status === "error") {
        //   setSubmissionError(response.data.error);
        //   console.error("Backend Error:", response.data.error);
        // } else {
          console.log("Data submitted successfully:", response.data);
          // navigate("/success"); // Redirect to a success page after successful submission
        // }
      } catch (error) {
        console.error("Submission failed:", error);
        // setSubmissionError("An error occurred while submitting your data. Please try again.");
      }
    };

    submitData();
  }, [completeData]);

  return (
   <>
<h4>this page is dummy</h4>
   </>
  );
};

export default Submission;
