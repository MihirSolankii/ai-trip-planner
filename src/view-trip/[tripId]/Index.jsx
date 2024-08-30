import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "@/service/FirebaseConfigl";
import { Button } from "@mui/material";
import { IoShareSocial } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { Box } from "@mui/material";

// Unsplash API access key
const UNSPLASH_ACCESS_KEY = "46lcGCbQRm0xxPqYFPHce497Xr0XaYSTpckwC41Scbc";

function ViewTrip() {
  const theme = useTheme();
  const { tripId } = useParams();
  const [trip, setTrip] = useState(null);
  const [images, setImages] = useState({});
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [error, setError] = useState(null);

  const handleBookRide = (geoCoordinates, placeName) => {
    // Split the geoCoordinates string into latitude and longitude
    const [latitude, longitude] = geoCoordinates
      .split(",")
      .map((coord) => parseFloat(coord.trim()));

    // Encode the place name for URL
    const nickname = encodeURIComponent(placeName); // Encode place name for URL

    // Check if the Geolocation API is available
    if (navigator.geolocation) {
      // Get the user's current position
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLatitude = position.coords.latitude; 
          const userLongitude = position.coords.longitude; 

          
          const olaURL = `https://book.olacabs.com/?lat=${userLatitude}&lng=${userLongitude}&drop_lat=${latitude}&drop_lng=${longitude}&drop_name=${nickname}`;

        
          window.open(olaURL, "_blank");
        },
        (error) => {
          setError(
            "Unable to retrieve your location. Please check your location settings."
          ); 
        }
      );
    } else {
      setError("Geolocation is not supported by your browser."); 
    }
  };

  const fetchImage = async (query) => {
    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${query}&client_id=${UNSPLASH_ACCESS_KEY}&per_page=1`
    );
    const data = await response.json();
    return data.results[0]?.urls?.full || "/default-image.jpg";
  };

  const GetTripData = async () => {
    const storedTrip = localStorage.getItem(`trip_${tripId}`);
    if (storedTrip) {
      setTrip(JSON.parse(storedTrip));
    } else {
      const docRef = doc(db, "AITrips", tripId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const tripData = docSnap.data();
        setTrip(tripData);
        localStorage.setItem(`trip_${tripId}`, JSON.stringify(tripData));
      } else {
        console.log("No such document!");
      }
    }
  };

  useEffect(() => {
    if (trip) {
      const fetchImages = async () => {
        const newImages = {};

        if (trip?.userSelection?.location) {
          newImages.location = await fetchImage(trip.userSelection.location);
        }

        if (trip?.TripData?.hotelOptions) {
          for (const hotel of trip.TripData.hotelOptions) {
            newImages[hotel.hotelName] = await fetchImage(hotel.hotelName);
          }
        }

        if (trip?.TripData?.itinerary) {
          for (const day of trip.TripData.itinerary) {
            for (const place of day.plan) {
              newImages[place.placeName] = await fetchImage(place.placeName);
            }
          }
        }

        setImages(newImages);
      };

      fetchImages();
    }
  }, [trip]);

  useEffect(() => {
    GetTripData();
  }, [tripId]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        bgcolor: theme.palette.background.default,
        color: theme.palette.text.primary,
        minHeight: "100vh",
        p: 3,
      }}
    >
      <div className="p-10 md:px-20 lg:px-44 xl:px-56">
       
        <div>
          <img
            src={images.location || "/trip.jpg"}
            className="w-full object-center rounded-xl"
            style={{ height: "800px" }}
            alt="Trip"
          />
          <div className="flex justify-between items-center">
            <div className="my-5 flex flex-col gap-2">
              <h2 className="font-bold text-2xl">
                {trip?.userSelection.location}
              </h2>
              <div className="flex gap-5">
                <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">
                  📅 {trip?.userSelection.noOfDays}
                </h2>
                <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">
                  💰 {trip?.userSelection.budget}
                </h2>
                <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">
                  🥂 No. of Traveler: {trip?.userSelection.traveler}
                </h2>
              </div>
            </div>
            <Button>
              {" "}
              <IoShareSocial />{" "}
            </Button>
          </div>
        </div>

     
        <div>
          <h2 className="font-bold text-xl mt-5">Hotel Recommendation</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {trip?.TripData?.hotelOptions.map((hotel, index) => (
              <Link
                to={`https://www.google.com/maps/search/?api=1&query=${hotel.hotelName},${hotel.hotelAddress}`}
                target="_blank"
                key={index}
              >
                <div className="cursor-pointer">
                  <img
                    src={images[hotel.hotelName] || "/trip.jpg"}
                    alt="hotelname"
                    className="rounded-xl w-40 h-40 object-cover"
                    style={{ width: "160px", height: "160px" }}
                  />
                  <div className="my-2 flex flex-col gap-2">
                    <h2 className="font-medium">{hotel.hotelName}</h2>
                    <h2 className="text-gray-500 text-xs">
                      📍 {hotel.hotelAddress}
                    </h2>
                    <h2 className="text-sm">💰 {hotel.price}</h2>
                    <p className="text-gray-500 text-sm">⭐ {hotel.rating}</p>
                    <p className="text-gray-500 text-sm mt-2">
                      {hotel.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Daily Plan */}
        <div>
          <h2 className="font-bold text-lg">Places to Visit</h2>
          <div className="cursor-pointer">
            {trip?.TripData?.itinerary?.map((dayPlan, dayIndex) => (
              <div key={dayIndex} className="mb-8">
                <h3 className="font-bold text-lg mb-4">
                  Day {dayPlan.day}: {dayPlan.theme}
                </h3>
                <div className="space-y-4 grid md:grid-cols-2 gap-5">
                  {dayPlan.plan.map((place, placeIndex) => (
                    <Link
                    to={`https://www.google.com/maps/search/?api=1&query=${place.placeName}`}
                    target="_blank"
                    key={placeIndex}
                  >
                    <div
                      key={placeIndex}
                      className="flex gap-4 items-start"
                      onClick={() => handlePlaceClick(place)}
                    >
                      <div className="w-40 h-40">
                        <img
                          src={images[place.placeName] || "/trip.jpg"}
                          alt="placename"
                          className="rounded-xl w-40 h-40 object-cover"
                          style={{ width: "160px", height: "160px" }}
                        />
                      </div>
                      <div>
                        <h4 className="font-bold text-md">{place.placeName}</h4>
                        <p className="text-gray-500 text-sm">
                          {place.timeTravel}
                        </p>
                        <p className="text-gray-500 text-sm">
                          {place.ticketPricing}
                        </p>
                        <p className="text-gray-500 text-sm">
                          {place.placeDetails}
                        </p>
                        <Button className="text-[#f56551]"
                          onClick={() =>
                            handleBookRide(
                              place.geoCoordinates,
                              place.placeName
                            )
                          }
                        >
                          <div className="text-[#f56551]">
                          Book a Ride with Ola</div>
                        </Button>
                        {error && <p style={{ color: "red" }}>{error}</p>}{" "}
                       
                      </div>
                    </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Box>
  );
}

export default ViewTrip;
