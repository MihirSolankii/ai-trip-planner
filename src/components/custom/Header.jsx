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
import axios from 'axios';
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
  const user = JSON.parse(localStorage.getItem('user')); // Fetch the user data from localStorage
  const[openDialog,setOpenDialog]=useState(false);


  useEffect(() => {
    console.log(user); // Debug: Check the user data
  }, []);

  const login = useGoogleLogin({
    onSuccess:(CodeResp)=>getUserProfile(CodeResp),
    
    onError: (error) => console.log("Login Failed:", error),
  });

  const getUserProfile = (tokenInfo) => {
    console.log("Received token info:", tokenInfo.access_token); 
  
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`, {
      headers: {
        Authorization: `Bearer ${tokenInfo?.access_token}`,
        
       
      }
    }).then((resp) => {
      console.log("User profile data:", resp);
      localStorage.setItem("user",JSON.stringify(resp.data))
      setOpenDialog(false);
      window.location.reload();
      
    }).catch((err) => {
      console.error("Error fetching user profile:", err.response ? err.response.data : err); // Log any errors
    });
  };
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
      
      <div className='flex items-center gap-4'>

      {theme.palette.mode === "dark" ? (
<Button onClick={handleUpgradePlan} variant="outline" style={{ backgroundColor: theme.palette.background.default, color: "white" }} >
          Upgrade Plan
        </Button>):(<Button onClick={handleUpgradePlan} variant="outline" style={{ backgroundColor: theme.palette.background.primary, borderColor: "black",borderStyle:"solid" }} >
          Upgrade Plan
        </Button>)}
        {user ? (
          <div className='flex items-center gap-4'>
           <a href='/my-trips'>
          <Button variant="">My Trips</Button>
          
          </a>
          <Popover>
          <PopoverTrigger>
          <img  className='h-[50px] w-[50px] rounded-full object-cover' src={user.picture} />
          </PopoverTrigger>
          <PopoverContent><h2 onClick={()=>{
    googleLogout();
  localStorage.clear();
  window.location.reload();

  }}>Logout</h2></PopoverContent>
</Popover>
          </div>
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

        {/* Theme Toggle Button */}


      
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
    
    </div>
  );
}

export default Header;