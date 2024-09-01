import React, { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { AI_PROMPT, SelectBudgetOptions, SelectTravelsList } from '@/constants/option';
import { Button } from '@/components/ui/button';
import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast"
import './abc.css';
import { chatSession } from '@/service/AiModal';
import { FcGoogle } from "react-icons/fc";
import { doc, setDoc } from "firebase/firestore";
import { db } from '@/service/FirebaseConfigl';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { getDoc } from 'firebase/firestore';
import { updateDoc } from 'firebase/firestore';
import axios from 'axios';
import gif from "../imges/1488.gif"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useGoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import ReactGoogleAutocomplete from 'react-google-autocomplete';


function CreateTrip() {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';
  const [formData, setFormData] = useState({});
  const[openDialog,setOpenDialog]=useState(false);
  const[Loading,setLoading]=useState(false)
  const [tripCount, setTripCount] = useState(4);
  const route=useNavigate();
  const { toast } = useToast();

  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);
  useEffect(() => {
    const fetchTripCount = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        
        if (!user || !user.email) {
          return; // Exit if user is not logged in or email is missing
        }
  
        const userRef = doc(db, 'users', user.email);
        const userSnap = await getDoc(userRef);
  
        if (userSnap.exists()) {
          const userData = userSnap.data();
          setTripCount(userData.tripCount ?? 4);   // Set tripCount from the user data or default to 0
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching trip count: ", error);
      }
    };
  
    fetchTripCount();
  }, []);
  const login = useGoogleLogin({
    // onSuccess: async (tokenResponse) => {
    //   try {
    //     const userInfoResponse = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
    //       headers: {
    //         Authorization: `Bearer ${tokenResponse.access_token}`,
    //       },
    //     });
    //     const userInfo = await userInfoResponse.json();
    //     localStorage.setItem("user",JSON.stringify(userInfo))

    
       
  
    //     setOpenDialog(false);
    //     onGenerateTrip();
    //   } catch (error) {
    //     console.error("Error saving user data:", error);
    //   }
    // },
    onSuccess:(CodeResp)=>getUserProfile(CodeResp),
    
    onError: (error) => console.log("Login Failed:", error),
  });
 
  const onGenerateTrip =async (e) => {
    
     const user=localStorage.getItem("user");

     if(!user){
      setOpenDialog(true)
      return;
     }
     if (tripCount === 0) {
      alert("You have reached the maximum limit of three free trips. Please upgrade your plan to create more trips.");
      return;  // Exit function if the user has reached the trip limit
    }
    if (formData?.noOfDays > 5) {
      
      toast({
        title: "Uh oh! Something went wrong.",
        description: "Do not Enter no of Days greater than 5 days ",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
      return;
    }
    if(!formData?.noOfDays ||!formData?.location ||!formData.budget ||!formData?.traveler){
      toast({
        
        description: "Please Fill all the details",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
      return
    }
    setLoading(true)
    console.log(formData);
    const FINAL_PROMPT=AI_PROMPT.replace('{location}',formData.location)
    .replace('{totalDays}',formData.noOfDays)
    .replace('{budget}',formData.budget)
    .replace('{traveler}',formData.traveler)
    .replace('{totalDays}',formData.noOfDays)
    console.log(FINAL_PROMPT);

    const result=await chatSession.sendMessage(FINAL_PROMPT)
    console.log(result.response?.text());
    SaveAiTrip(result?.response?.text())
   
setLoading(false)

  };

  const SaveAiTrip= async(TripData)=>{
    setLoading(true)
    const user=JSON.parse(localStorage.getItem("user"));
    const docId=Date.now().toString();
    await setDoc(doc(db, "AITrips",docId), {
      userSelection:formData,
      TripData:JSON.parse(TripData),
       userEmail:user?.email,
       id:docId

    });
    await incrementUserTripCount();
  setLoading(false)

   route("/view-trip/"+docId)
  }

  const incrementUserTripCount = async () => {
    try {
      // Retrieve the user from local storage
      const user = JSON.parse(localStorage.getItem("user"));
      
      // Check if the user is valid
      if (!user ) {
        throw new Error("User not found or googleId is undefined.");
      }
  
      // Reference to the user's document in Firestore using googleId
      const userRef = doc(db, "users", user.email);
      const userDoc = await getDoc(userRef);
  
      if (userDoc.exists()) {
        // If the user document exists, increment the trip count
        const currentCount = userDoc.data().tripCount ?? 4;
  
        // Update the trip count in Firestore
        await updateDoc(userRef, {
          tripCount: currentCount - 1,
        });
  
        // Update local state with the new trip count
        setTripCount(currentCount - 1);
      } else {
        // If the user document doesn't exist, create it with a tripCount of 1
        await setDoc(userRef, { tripCount: 4 });
  
        // Update local state with the new trip count

      }
    } catch (error) {
     
      console.error("Error incrementing trip count:", error.message);
  
   
      if (error.message.includes('indexOf')) {
        console.error("Check the localStorage user object and Firestore document reference.");
      }
    }
  };
  
  
  const getUserProfile = (tokenInfo) => {
    console.log("Received token info:", tokenInfo.access_token); 
  
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`, {
      headers: {
        Authorization: `Bearer ${tokenInfo?.access_token}`, 
      }
    }).then((resp) => {
      console.log("User profile data:", resp.data);
      localStorage.setItem("user",JSON.stringify(resp.data))
      setOpenDialog(false);
           onGenerateTrip();
    }).catch((err) => {
      console.error("Error fetching user profile:", err.response ? err.response.data : err); // Log any errors
    });
  };
  
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        bgcolor: theme.palette.background.default,
        color: theme.palette.text.primary,
        minHeight: '100vh',
        p: 3,
      }}
    >
      <div className='flex justify-center px-4'>
        <div className='max-w-screen-lg w-full'>
          <h2 className='font-bold text-3xl text-[#f56551]'>Tell us your Travel Preference🏕️🌴</h2>
          <p className='mt-3 text-gray-500 text-xl'>
            Just provide some basic information and our trip planner generates optimized itineraries based on your preferences.
          </p>

          <div className='mt-20 flex flex-col gap-9'>
            <div>
              <h2 className='text-xl my-3 font-medium'>What is your destination choice?</h2>
              <Input 
                placeholder="Ex. Goa" 
                type="text" 
                onChange={(e) => handleInputChange("location", e.target.value)}
                style={{
                  color: isDarkMode ? 'white' : 'black',
                  backgroundColor: isDarkMode ? '#333' : '#fff',
                }}
              
              />
            </div>
            <div>
              <h2 className='text-xl my-3 font-medium'>How many days are you planning for the trip?</h2>
              <Input 
                placeholder="Ex. 3" 
                type="text"
                onChange={(e) => handleInputChange("noOfDays", e.target.value)} 
                style={{
                  color: isDarkMode ? 'white' : 'black',
                  backgroundColor: isDarkMode ? '#333' : '#fff',
                }}
              />
            </div>
            <div>
              <h2 className='font-bold text-3xl'>What is Your Budget?</h2>
              <p className='mt-3 text-gray-500 text-xl'>
                The budget is exclusively allocated for activities and dining purposes.
              </p>
              <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-5'>
                {SelectBudgetOptions.map((item, index) => (
                  <div 
                    key={index} 
                    className={`p-4 border cursor-pointer rounded-lg ${formData?.budget === item.title && 'shadow-lg border-black'}`} 
                    style={{
                      backgroundColor: isDarkMode ? '#444' : '#f9f9f9',
                      color: isDarkMode ? '#fff' : '#000',
                    }}
                    onMouseEnter={(e) => {
                      isDarkMode ?
                        e.currentTarget.style.boxShadow = "0 4px 8px rgba(240, 240, 0, 1)" : 
                        e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.3)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                    onClick={() => { handleInputChange('budget', item.title) }}
                  >
                    <h2 className='text-4xl'>{item.icon}</h2>
                    <h3 className='font-bold text-lg'>{item.title}</h3>
                    {item.desc && <p className='text-sm text-gray-500'>{item.desc}</p>}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className='font-bold text-3xl'>Who Do You Plan on Travelling With on Your Next Adventure?</h2>
              <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-5'>
                {SelectTravelsList.map((item, index) => (
                  <div 
                    key={index} 
                    className={`p-4 border cursor-pointer rounded-lg ${formData?.traveler === item.people && 'shadow-lg border-black'}`} 
                    onClick={() => { handleInputChange('traveler', item.people) }} 
                    style={{
                      backgroundColor: isDarkMode ? '#444' : '#f9f9f9',
                      color: isDarkMode ? '#fff' : '#000',
                    }}
                    onMouseEnter={(e) => {
                      isDarkMode ?
                        e.currentTarget.style.boxShadow = "0 4px 8px rgba(240, 240, 0, 1)" : 
                        e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.3)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <h2 className='text-4xl'>{item.icon}</h2>
                    <h3 className='font-bold text-lg'>{item.title}</h3>
                    {item.desc && <p className='text-sm text-gray-500'>{item.desc}</p>}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className='my-10 flex justify-end '>
            <Button className="text-[#f56551]" variant="secondary" style={{backgroundColor: theme.palette.background.primary, borderColor: "black", borderWidth: "1px", // Set the border width (optional)
                borderStyle: "solid"}} disabled={Loading} onClick={onGenerateTrip}
          >  {Loading ?<img src={gif} width="50%" height="50%"/>:"Generate Trip"} </Button>
          </div>
        </div>

        <Dialog open={openDialog}>
  
  <DialogContent>
    <DialogHeader>
     
      <DialogDescription>
        <img src='/logo.svg'/>
        <h2 className='font-bold text-lg mt-7'>Sign in With Google</h2>
        <p>Sign in to the app with google authentication securly</p>
        <Button onClick={login} className="w-full mt-5 flex gap-4 items-center"><FcGoogle className='h-7 w-7'/> Sign in With Google</Button>
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>

      </div>
    </Box>
  );
}

export default CreateTrip;