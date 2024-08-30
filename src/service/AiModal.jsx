import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GOOGLE_GEMINI_AI_API_KEY;
const genAI = new GoogleGenerativeAI("AIzaSyAxtEKdGuE4tYd7Nwh4yiionKbiO7t6NWU");

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export const chatSession = model.startChat({
  generationConfig,
  // safetySettings: Adjust safety settings
  // See https://ai.google.dev/gemini-api/docs/safety-settings
  history: [
    {
      role: "user",
      parts: [
        {
          text: '"Generate travel plan for location:Las vegas for 3 Days for Family with a cheap budget,give me Hotels Option list with HotelName,Hotel Address,price ,hotel,imageurl,geo coordinates ,rating,descriptions and suggest itinerary with placeName ,PlaceDetails,Place Image Url,Geo Coordinates ,ticket Pricing,Time Travel each of the location for 3 days with each day plan with best time to visit in JSON format',
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: '```json\n{\n  "hotelOptions": [\n    {\n      "hotelName": "Circus Circus Hotel & Casino",\n      "hotelAddress": "2880 Las Vegas Blvd S, Las Vegas, NV 89109",\n      "price": "$50 - $100 per night",\n      "imageUrl": "https://www.circuscircus.com/content/dam/MGMResorts/circuscircus/images/hotel-exterior.jpg",\n      "geoCoordinates": "36.1286,-115.1704",\n      "rating": "3.5 stars",\n      "description": "A budget-friendly option known for its carnival theme and affordable entertainment."\n    },\n    {\n      "hotelName": "The D Las Vegas",\n      "hotelAddress": "301 Fremont St, Las Vegas, NV 89101",\n      "price": "$40 - $80 per night",\n      "imageUrl": "https://www.thed.com/wp-content/uploads/2017/10/The-D-Las-Vegas-Aerial-View-Website.jpg",\n      "geoCoordinates": "36.1698,-115.1427",\n      "rating": "3.5 stars",\n      "description": "A retro-style hotel on Fremont Street with affordable rooms and a lively atmosphere."\n    },\n    {\n      "hotelName": "Golden Nugget Las Vegas",\n      "hotelAddress": "129 E Fremont St, Las Vegas, NV 89101",\n      "price": "$60 - $120 per night",\n      "imageUrl": "https://www.goldennugget.com/wp-content/uploads/2018/09/GN_Header_Hero_Image_2018_v3_Mobile.jpg",\n      "geoCoordinates": "36.1698,-115.1427",\n      "rating": "4 stars",\n      "description": "A historic hotel with a vibrant casino and the famous shark tank."\n    },\n    {\n      "hotelName": "The Strat Hotel, Casino & SkyPod",\n      "hotelAddress": "2000 S Las Vegas Blvd, Las Vegas, NV 89104",\n      "price": "$45 - $90 per night",\n      "imageUrl": "https://www.thestrat.com/content/dam/MGMResorts/thestrat/images/exterior.jpg",\n      "geoCoordinates": "36.1275,-115.1699",\n      "rating": "4 stars",\n      "description": "An affordable option offering a skypod with panoramic views and thrilling rides."\n    }\n  ],\n  "itinerary": [\n    {\n      "day": 1,\n      "theme": "Fremont Street Experience & Free Activities",\n      "plan": [\n        {\n          "placeName": "Fremont Street Experience",\n          "placeDetails": "A vibrant pedestrian mall with a canopy of lights, street performers, and free concerts.",\n          "placeImageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Fremont_Street_Experience_%281%29.jpg/1024px-Fremont_Street_Experience_%281%29.jpg",\n          "geoCoordinates": "36.1698,-115.1427",\n          "ticketPricing": "Free",\n          "timeTravel": "9:00 AM - 1:00 PM"\n        },\n        {\n          "placeName": "The Mob Museum",\n          "placeDetails": "Learn about the history of organized crime in Las Vegas.",\n          "placeImageUrl": "https://www.themobmuseum.org/media/images/Home%20Page%20Images/the-mob-museum-header-mobile.jpg",\n          "geoCoordinates": "36.1689,-115.1449",\n          "ticketPricing": "$29.95 for adults",\n          "timeTravel": "1:00 PM - 4:00 PM"\n        },\n        {\n          "placeName": "Free Shows on Fremont Street",\n          "placeDetails": "Enjoy free concerts and street performances.",\n          "placeImageUrl": "https://www.visitlasvegas.com/media/images/Attractions-Things-to-Do/Downtown-Fremont-Street/Fremont-Street-Experience-Aerial.jpg",\n          "geoCoordinates": "36.1698,-115.1427",\n          "ticketPricing": "Free",\n          "timeTravel": "4:00 PM - 6:00 PM"\n        }\n      ]\n    },\n    {\n      "day": 2,\n      "theme": "Family Fun & Affordable Entertainment",\n      "plan": [\n        {\n          "placeName": "The LINQ Promenade",\n          "placeDetails": "A lively outdoor shopping and dining area with the High Roller observation wheel.",\n          "placeImageUrl": "https://www.caesars.com/content/dam/caesars/linq/images/hero-linq-promenade-day.jpg",\n          "geoCoordinates": "36.1283,-115.1727",\n          "ticketPricing": "High Roller tickets start at $25",\n          "timeTravel": "10:00 AM - 1:00 PM"\n        },\n        {\n          "placeName": "The Venetian and The Palazzo",\n          "placeDetails": "Explore the luxurious Venetian canals and enjoy free entertainment.",\n          "placeImageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/The_Venetian_and_The_Palazzo_%282015%29.jpg/1024px-The_Venetian_and_The_Palazzo_%282015%29.jpg",\n          "geoCoordinates": "36.1317,-115.1731",\n          "ticketPricing": "Free",\n          "timeTravel": "1:00 PM - 4:00 PM"\n        },\n        {\n          "placeName": "Bellagio Fountains",\n          "placeDetails": "Watch the spectacular water and light show.",\n          "placeImageUrl": "https://www.visitlasvegas.com/media/images/Attractions-Things-to-Do/Bellagio-Fountains/Bellagio-Fountain-Show-6724-2023.jpg",\n          "geoCoordinates": "36.1194,-115.1713",\n          "ticketPricing": "Free",\n          "timeTravel": "4:00 PM - 6:00 PM"\n        }\n      ]\n    },\n    {\n      "day": 3,\n      "theme": "Nature and Adventure",\n      "plan": [\n        {\n          "placeName": "Red Rock Canyon National Conservation Area",\n          "placeDetails": "Enjoy scenic drives, hiking trails, and stunning rock formations.",\n          "placeImageUrl": "https://www.nps.gov/redr/planyourvisit/images/red-rock-canyon-wide-1.jpg",\n          "geoCoordinates": "36.1789,-115.2723",\n          "ticketPricing": "Vehicle entry fee: $15",\n          "timeTravel": "9:00 AM - 1:00 PM"\n        },\n        {\n          "placeName": "The Neon Museum",\n          "placeDetails": "Learn about the history of Las Vegas\' neon signs and see a collection of vintage signs.",\n          "placeImageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Neon_Museum_%28Las_Vegas%29.jpg/1280px-Neon_Museum_%28Las_Vegas%29.jpg",\n          "geoCoordinates": "36.1715,-115.1525",\n          "ticketPricing": "$20 for adults",\n          "timeTravel": "1:00 PM - 4:00 PM"\n        },\n        {\n          "placeName": "Springs Preserve",\n          "placeDetails": "A unique outdoor museum featuring gardens, exhibits, and a botanical garden.",\n          "placeImageUrl": "https://www.springspreserve.org/sites/default/files/images/banner-images/2023-Banner.jpg",\n          "geoCoordinates": "36.1508,-115.1382",\n          "ticketPricing": "$15 for adults",\n          "timeTravel": "4:00 PM - 6:00 PM"\n        }\n      ]\n    }\n  ]\n}\n```\n',
        },
      ],
    },
  ],
});

