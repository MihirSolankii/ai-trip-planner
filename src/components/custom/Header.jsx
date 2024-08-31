import React, { useEffect,useState } from 'react';
import { Box, IconButton } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useTheme } from '@mui/material/styles';
import { useColorMode } from '../../theme/ToggleColorMode';
import { Button } from "@/components/ui/button";
import { BorderAll } from '@mui/icons-material';
import { useGoogleLogin } from '@react-oauth/google';
import { FcGoogle } from "react-icons/fc";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { googleLogout } from '@react-oauth/google';
import { Navigate,useNavigate } from 'react-router-dom';



function Header() {
  
  const theme = useTheme();
  const colorMode = useColorMode();
  const users = JSON.parse(localStorage.getItem('user')); // Fetch the user data from localStorage
  const[openDialog,setOpenDialog]=useState(false);


  useEffect(() => {
    console.log(users); // Debug: Check the user data
  }, []);

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const userInfoResponse = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: {
            Authorization: `Bearer ${tokenResponse.access_token}`,
          },
        });
        const userInfo = await userInfoResponse.json();
        localStorage.setItem("user",JSON.stringify(userInfo))
        // Save user data to backend
       
        setOpenDialog(false);
        window.location.reload();
      } catch (error) {
        console.error("Error saving user data:", error);
      }
    },
    onError: (error) => console.log("Login Failed:", error),
  });
  const handleUpgradePlan = () => {
    // Redirect to the payment page (Stripe checkout or another payment processor)
    window.location.href="/payment" // Replace with your actual payment page route
  };

  return (
    <div 
      className='p-2 shadow-sm flex justify-between items-center' 
      style={{ backgroundColor: theme.palette.background.default }}
    >
      
      {/* Left side: Logo */}
      <div onClick={()=>{window.location.href="/"}}>
      <img src='/OIP.jpg' alt='logo'  height="150px" width="150px"/>
      </div>
      {/* Right side: Buttons, profile image, and theme toggle */}
      <div className='flex items-center gap-4'>
        {users ? (
          <>
           <a href='/my-trips'>
          {theme.palette.mode === "dark" ? (
              <Button variant="outline" style={{ backgroundColor: theme.palette.background.default, color: "white"}}>My Trip</Button>
            ) : (
              <Button variant="secondary" style={{ backgroundColor: theme.palette.background.primary, borderColor: "black", // Add this line for a black border
                borderWidth: "1px", // Set the border width (optional)
                borderStyle: "solid" }}>My Trip</Button>
            )}
            </a>
          

          </>
        ) : (
          <>
            {theme.palette.mode === "dark" ? (
              <Button variant="outline" style={{ backgroundColor: theme.palette.background.default, color: "white" }} onClick={()=>setOpenDialog(true)}>Sign in</Button>
            ) : (
              <Button variant="secondary" style={{ backgroundColor: theme.palette.background.primary,
                borderColor: "black", // White border for light mode
                borderWidth: "1px",
                borderStyle: "solid"}} onClick={()=>setOpenDialog(true)}>Sign in</Button>
            )}
          </>
        )}
{theme.palette.mode === "dark" ? (
<Button onClick={handleUpgradePlan} variant="outline" style={{ backgroundColor: theme.palette.background.default, color: "white" }} >
          Upgrade Plan
        </Button>):(<Button onClick={handleUpgradePlan} variant="outline" style={{ backgroundColor: theme.palette.background.primary, borderColor: "black",borderStyle:"solid" }} >
          Upgrade Plan
        </Button>)}
        {/* Theme Toggle Button */}


        <Popover>
  <PopoverTrigger> <img 
              src="./logo.svg" // Display user profile picture
              alt="name" // Alt text should describe the image content
              className='h-[50px] w-[50px] rounded-full object-cover' // Added rounded and object-cover for better UI
            /></PopoverTrigger>
  <PopoverContent><h2 onClick={()=>{
    googleLogout();
  localStorage.clear();
  window.location.reload();

  }}>Logout</h2></PopoverContent>
</Popover>
        <Dialog open={openDialog}>
  
  <DialogContent>
    <DialogHeader>
     
      <DialogDescription>
        <img src='/logo.svg'/>
        <h2 className='font-bold text-lg mt-7'>Sign in With Google</h2>
        <p>Sing in to the app with google authentication securly</p>
        <Button onClick={login} className="w-full mt-5 flex gap-4 items-center"><FcGoogle className='h-7 w-7'/> Sign in With Google</Button>
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>

       
      </div>
    
    </div>
  );
}

export default Header;