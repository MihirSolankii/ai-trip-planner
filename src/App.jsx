import React from 'react';
import { Box, IconButton } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useTheme } from '@mui/material/styles';
import { useColorMode } from './theme/ToggleColorMode';
import { Button } from "@/components/ui/button";
import Hero from './components/custom/Hero';
import Hello from './components/custom/Hello';

function App() {
  const theme = useTheme();
  const colorMode = useColorMode();

  return (
    <>
    
    <Hero/>
    
    </>
  );
}

export default App;
