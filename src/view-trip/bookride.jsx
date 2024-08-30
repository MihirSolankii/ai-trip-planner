import React, { useState } from 'react';
import { Button } from '@mui/material';

function BookRideButton() {
  const [error, setError] = useState(null);

  const handleBookRide = () => {
    // Define the destination location
    const latitude = 22.2463; // Latitude for Dwarkadhish Temple
    const longitude = 70.7441; // Longitude for Dwarkadhish Temple
    const placeName = "Dwarkadhish Temple"; // Destination name
    const nickname = encodeURIComponent(placeName); // Encode place name for URL

    // Check if the Geolocation API is available
    if (navigator.geolocation) {
      // Get the user's current position
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLatitude = position.coords.latitude; // User's current latitude
          const userLongitude = position.coords.longitude; // User's current longitude

          // Construct the Ola booking URL
          const olaURL = `https://book.olacabs.com/?lat=${userLatitude}&lng=${userLongitude}&drop_lat=${latitude}&drop_lng=${longitude}&drop_name=${nickname}`;

          // Open the Ola booking URL in a new tab
          window.open(olaURL, '_blank');
        },
        (error) => {
          setError("Unable to retrieve your location. Please check your location settings."); // Handle error if location access fails
        }
      );
    } else {
      setError("Geolocation is not supported by your browser."); // Handle case where Geolocation is not available
    }
  };

  return (
    <div>
      {/* Button to trigger booking ride */}
      <Button onClick={handleBookRide}>Book a Ride with Ola</Button>
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error if any */}
    </div>
  );
}

export default BookRideButton;
