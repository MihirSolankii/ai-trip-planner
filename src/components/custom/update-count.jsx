import React from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
function Checkout() {
  const sessionId = localStorage.getItem("sessionid");
  console.log("sessionId:", sessionId);
const navigate=useNavigate();
  const verifyPayment = async () => {
    try {
      // Pass the sessionId in the query string
      const response = await axios.get(`http://localhost:5000/update-trip-count?session_id=${sessionId}`);
      
      console.log(response.data);
    //   Additional logic for handling the response
    //   For example, navigating to a dashboard or home page
      if (response.data.success) {
        navigate("/create-trip");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.log("Error:", error.message); // Log the error message
      // Handle the error, e.g., navigate to the home page
      // navigate("/");
    }
  };

  useEffect(() => {
    verifyPayment();
  }, []);

  return (
    <div className='verify'>
      <div className='spinner'>Loading.....</div>
    </div>
  );
}

export default Checkout;
