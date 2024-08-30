import React from 'react';
import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';

function Hero() {
  const theme = useTheme();

  return (
    <>
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        
        bgcolor: theme.palette.background.default,
        color: theme.palette.text.primary,
        height: '100vh',
        p: 3,
      }}
    >
    
  <div className='flex flex-col items-center mx-56 gap-9'>
  <h1 className=' font-extrabold text-[60px] text-center mt-40'><span className='text-[#f56551]'>Discover Your Next Adventure with AI:</span> Personalized Iineraries at Your Fingertips</h1>
  <span className='text-xl text-gray-500 text-center'>Your Personal trip planner and travel curator ,creating custom itineraries tailored to your interests and budget </span>

  <Link to={'/create-trip'}>
  <Button>Get Started. It's Free</Button>
  </Link>
  </div>
    </Box>
    <div className="flex items-center justify-center h-screen">
  <img
    className="w-[1000px] h-[700px]"
    src="/trip.jpg"
    alt="Trip"
  />
</div>
    </>
  );
}

export default Hero;
