
# 🌍 AI Travel Planner App
An AI-driven travel planner using Firebase and Google Gemini API for intelligent travel planning and data management.

## Description

**AI Travel Planner App** is a modern, AI-powered travel planning application designed to assist users in creating personalized itineraries based on their preferences, budget, and duration of travel. Leveraging Firebase for data storage and Google’s Gemini API for generating intelligent travel insights, this app aims to make trip planning effortless, organized, and enjoyable.

Key features include real-time data storage, intelligent travel suggestions, and an intuitive user interface optimized for desktop and mobile devices. Ideal for travelers looking for a streamlined way to plan their trips, the **AI Travel Planner App** is a reliable, innovative tool that brings together the best of AI and cloud technologies to enhance travel experiences.

**Technologies Used**: Firebase, Google Gemini API, React




## Installation

Follow these steps to set up and run the AI Travel Planner App locally.

### Prerequisites
- **Node.js** (v14 or above) - [Download here](https://nodejs.org/)
- **npm** (Node Package Manager) - Comes with Node.js installation
- **Firebase Project** - Set up a Firebase project to get your configuration details
- **Google Gemini API Key** - Obtain an API key for Google Gemini from the [Google Developers Console](https://console.developers.google.com/)

### Step 1: Clone the Repository
Clone this repository to your local machine:

git clone https://github.com/MihirSolankii/ai-trip-planner.git

cd ai-travel-planner-app 

### Step-2 :Install Dependencies
Run the following command to install the necessary dependencies:
npm install

### Step 3: Configure Firebase and Google Gemini API
Firebase Configuration:

Create a Firebase project and set up Firestore in the Firebase Console.
Download the google-services.json file (for Android apps) or use Firebase SDK (for web apps).
Add the necessary Firebase configuration keys to your .env file.
Google Gemini API Key:

Go to the Google Developers Console.
Create a new project, enable the Google Gemini API, and generate an API key.
Add your API key to the .env file:
**GOOGLE_GEMINI_API_KEY**=your-api-key
### Step 4: Set Up the Environment Variable
Create a .env file in the root directory of the project and add the following Firebase and Google Gemini configuration variables:

**REACT_APP_FIREBASE_API_KEY**=your-firebase-api-key
**REACT_APP_FIREBASE_AUTH_DOMAIN**=your-auth-domain
**REACT_APP_FIREBASE_PROJECT_ID**=your-project-id
**REACT_APP_FIREBASE_STORAGE_BUCKET**=your-storage-bucket
**REACT_APP_FIREBASE_MESSAGING_SENDER_ID**=your id
**REACT_APP_FIREBASE_APP_ID**=your-app-id
**GOOGLE_GEMINI_API_KEY**=your-google-gemini-api-key
### Step 5: Run the Development Server
Start the development server with the following command:
npm start
### Live Demo
Access a live version of the app here: [AI Travel Planner App - Live Demo](https://ai-trip-planner-vert.vercel.app/)



## Appendix

### Additional Resources
- [Firebase Documentation](https://firebase.google.com/docs): Comprehensive guides and API references for Firebase setup and features.
- [Google Gemini API Documentation](https://developers.google.com/): Information on integrating the Google Gemini API for AI-driven insights.
- [React Documentation](https://react.dev/): Official React documentation for understanding components, hooks, and state management.



### Related Projects
If you’re interested in similar projects or would like to explore other travel-related applications, here are some recommendations:
- **TripItinerary** - An app for generating itineraries based on location preferences.
- **BudgetTravelPlanner** - A budgeting tool for cost-effective travel planning.
- **MyTravelDiary** - A personal travel log and memory keeper.

### Authors and Acknowledgments
This project was developed by [mihir solanki] with the OpenAI  api and firebase storage.

### License
This project is licensed under the MIT License. See the LICENSE file for more details.

---

This Appendix covers extra resources, troubleshooting tips, related projects, and important legal or author acknowledgments. It enhances the documentation, making it easier for new users and contributors to find everything they need in one place.
