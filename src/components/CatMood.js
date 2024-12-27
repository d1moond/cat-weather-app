import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import styled, { keyframes } from 'styled-components';

const colors = {
  babyBlue: '#89CFF0',
  lightBlue: '#BFE6FF',
  darkBlue: '#5B8FA8',
  white: '#FFFFFF',
  black: '#333333'
};

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const CatContainer = styled(Paper)`
  padding: 20px;
  margin-bottom: 20px;
  text-align: center;
  background: ${props => props.darkMode ? 'rgba(45, 45, 45, 0.9)' : 'rgba(255, 255, 255, 0.9)'};
  border-radius: 15px;
  overflow: hidden;
  animation: ${fadeIn} 0.5s ease-out;
  border: 1px solid ${props => props.darkMode ? 'transparent' : colors.babyBlue};
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px ${props => props.darkMode 
      ? 'rgba(0, 0, 0, 0.3)' 
      : 'rgba(137, 207, 240, 0.3)'};
  }
`;

const CatImage = styled.img`
  width: 250px;
  height: 250px;
  border-radius: 15px;
  object-fit: cover;
  margin: 10px auto;
  box-shadow: 0 4px 15px ${props => props.darkMode 
    ? 'rgba(0, 0, 0, 0.3)' 
    : 'rgba(137, 207, 240, 0.3)'};
  transition: all 0.3s ease;
  border: 3px solid ${props => props.darkMode ? colors.darkBlue : colors.babyBlue};

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 25px ${props => props.darkMode 
      ? 'rgba(0, 0, 0, 0.4)' 
      : 'rgba(137, 207, 240, 0.4)'};
  }
`;

const MessageBox = styled(Box)`
  background: ${props => props.darkMode 
    ? 'rgba(45, 45, 45, 0.9)' 
    : `rgba(137, 207, 240, 0.1)`};
  padding: 20px;
  border-radius: 10px;
  margin-top: 20px;
  box-shadow: 0 4px 15px ${props => props.darkMode 
    ? 'rgba(0, 0, 0, 0.2)' 
    : 'rgba(137, 207, 240, 0.2)'};
  border: 1px solid ${props => props.darkMode ? colors.darkBlue : colors.babyBlue};
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.darkMode 
      ? 'rgba(45, 45, 45, 0.95)' 
      : `rgba(137, 207, 240, 0.15)`};
  }
`;

// Cat images for different weather conditions
const catImages = {
  clear: {
    day: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=400', // Cat sunbathing
    message: 'Purr-fect day for sunbathing!'
  },
  clouds: {
    day: 'https://images.unsplash.com/photo-1548247416-ec66f4900b2e?w=400', // Lazy cat
    message: 'Good day for a catnap!'
  },
  rain: {
    day: 'https://images.unsplash.com/photo-1511044568932-338cba0ad803?w=400', // Cat looking out window
    message: 'Staying indoors today, it\'s too wet outside!'
  },
  snow: {
    day: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400', // Cozy cat
    message: 'Brrr! Time to curl up by the fireplace!'
  },
  thunderstorm: {
    day: 'https://images.unsplash.com/photo-1519052537078-e6302a4968d4?w=400', // Hidden cat
    message: 'Hide! The thunder is too scary!'
  },
  mist: {
    day: 'https://images.unsplash.com/photo-1495360010541-f48722b34f7d?w=400', // Mysterious cat
    message: 'Such a mysterious and misty day!'
  },
  default: {
    day: 'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?w=400', // Happy cat
    message: 'Just another purr-fect day!'
  }
};

const getCatMood = (weather) => {
  const temp = weather?.current?.main?.temp;
  const condition = weather?.current?.weather[0]?.main.toLowerCase();

  if (!temp || !condition) return catImages.default;

  // Match weather condition to cat image
  if (condition.includes('rain')) return catImages.rain;
  if (condition.includes('snow')) return catImages.snow;
  if (condition.includes('clear')) return catImages.clear;
  if (condition.includes('cloud')) return catImages.clouds;
  if (condition.includes('thunder')) return catImages.thunderstorm;
  if (condition.includes('mist') || condition.includes('fog')) return catImages.mist;

  return catImages.default;
};

const CatMood = ({ weather, darkMode }) => {
  const { day: imageUrl, message } = getCatMood(weather);

  return (
    <CatContainer elevation={3} darkMode={darkMode}>
      <CatImage 
        src={imageUrl} 
        alt="Weather Cat"
        loading="lazy"
        darkMode={darkMode}
      />
      <MessageBox darkMode={darkMode}>
        <Typography 
          variant="h6" 
          sx={{ 
            fontWeight: 500,
            color: darkMode ? colors.white : colors.black
          }}
        >
          {message}
        </Typography>
      </MessageBox>
    </CatContainer>
  );
};

export default CatMood; 