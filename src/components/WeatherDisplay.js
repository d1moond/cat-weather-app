import React, { useState } from 'react';
import { Paper, Typography, Grid, Switch, Box } from '@mui/material';
import styled, { keyframes } from 'styled-components';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import CloudIcon from '@mui/icons-material/Cloud';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import AirIcon from '@mui/icons-material/Air';
import WbTwilightIcon from '@mui/icons-material/WbTwilight';
import CompressIcon from '@mui/icons-material/Compress';
import VisibilityIcon from '@mui/icons-material/Visibility';

const colors = {
  babyBlue: '#89CFF0',
  lightBlue: '#BFE6FF',
  darkBlue: '#5B8FA8',
  white: '#FFFFFF',
  black: '#333333'
};

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const rotate = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const WeatherCard = styled(Paper)`
  padding: 20px;
  margin-bottom: 20px;
  background: ${props => props.darkMode ? 'rgba(45, 45, 45, 0.9)' : 'rgba(255, 255, 255, 0.9)'};
  border-radius: 15px;
  transition: all 0.3s ease;
  border: 1px solid ${props => props.darkMode ? 'transparent' : colors.babyBlue};
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 20px ${props => props.darkMode 
      ? 'rgba(0, 0, 0, 0.3)' 
      : 'rgba(137, 207, 240, 0.3)'};
  }

  &:before {
    content: '🐾';
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 1.2rem;
    opacity: 0.5;
  }

  &:after {
    content: '🐾';
    position: absolute;
    bottom: 10px;
    left: 10px;
    font-size: 1.2rem;
    opacity: 0.5;
    transform: rotate(45deg);
  }
`;

const WeatherIcon = styled(Box)`
  font-size: 3rem;
  margin-bottom: 10px;
  color: ${props => props.darkMode ? colors.lightBlue : colors.babyBlue};
  animation: ${float} 3s ease-in-out infinite;
  
  svg {
    filter: drop-shadow(0 4px 8px ${props => props.darkMode 
      ? 'rgba(191, 230, 255, 0.3)' 
      : 'rgba(91, 143, 168, 0.3)'});
  }
`;

const WindIcon = styled(AirIcon)`
  animation: ${rotate} ${props => 20 / (props.speed || 1)}s linear infinite;
  color: ${props => props.darkMode ? colors.lightBlue : colors.babyBlue};
`;

const DetailBox = styled(Box)`
  padding: 15px;
  border-radius: 12px;
  background: ${props => props.darkMode 
    ? 'rgba(45, 45, 45, 0.9)' 
    : 'rgba(137, 207, 240, 0.1)'};
  margin: 8px 0;
  display: flex;
  align-items: center;
  gap: 12px;
  transition: all 0.3s ease;
  border: 1px solid ${props => props.darkMode ? colors.darkBlue : colors.babyBlue};

  svg {
    color: ${props => props.darkMode ? colors.lightBlue : colors.babyBlue};
    font-size: 1.5rem;
  }

  &:hover {
    background: ${props => props.darkMode 
      ? 'rgba(45, 45, 45, 0.95)' 
      : 'rgba(137, 207, 240, 0.15)'};
    transform: translateX(5px);
  }
`;

const StyledWeatherIcon = styled(Box)`
  color: ${props => props.darkMode ? colors.lightBlue : colors.babyBlue};
  font-size: inherit;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const getWeatherIcon = (condition, darkMode) => {
  const iconProps = {
    fontSize: "inherit",
    sx: { color: 'inherit' }
  };

  switch (condition?.toLowerCase()) {
    case 'clear':
      return (
        <StyledWeatherIcon darkMode={darkMode}>
          <WbSunnyIcon {...iconProps} />
        </StyledWeatherIcon>
      );
    case 'snow':
      return (
        <StyledWeatherIcon darkMode={darkMode}>
          <AcUnitIcon {...iconProps} />
        </StyledWeatherIcon>
      );
    case 'rain':
      return (
        <StyledWeatherIcon darkMode={darkMode}>
          <BeachAccessIcon {...iconProps} />
        </StyledWeatherIcon>
      );
    case 'clouds':
      return (
        <StyledWeatherIcon darkMode={darkMode}>
          <CloudIcon {...iconProps} />
        </StyledWeatherIcon>
      );
    default:
      return (
        <StyledWeatherIcon darkMode={darkMode}>
          <WbSunnyIcon {...iconProps} />
        </StyledWeatherIcon>
      );
  }
};

const celsiusToFahrenheit = (celsius) => (celsius * 9/5) + 32;

const formatTime = (timestamp) => {
  return new Date(timestamp * 1000).toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit' 
  });
};

const getCatAdvice = (condition, temp, time) => {
  const isNight = time && (new Date(time * 1000).getHours() < 6 || new Date(time * 1000).getHours() > 20);
  
  const advice = {
    clear: {
      day: {
        hot: "Find a cool spot in the shade, and don't forget to drink water! 🐱💧",
        normal: "Perfect weather for a catnap in the sunbeam! 😺☀️",
        cold: "Find that sunny windowsill and soak up the warmth! 😸✨"
      },
      night: {
        hot: "Night prowling weather! Keep hydrated! 🐱🌙",
        normal: "Purr-fect night for stargazing! 😺⭐",
        cold: "Time to snuggle under the blankets! 😸🛏️"
      }
    },
    clouds: {
      day: {
        hot: "Good day for a lazy indoor stretch! 🐱🧘‍♂️",
        normal: "Ideal weather for window bird watching! 😺🐦",
        cold: "Time to find a warm lap to sit on! 😸💝"
      },
      night: {
        hot: "Nice evening for roof adventures! 🐱🏠",
        normal: "Cozy night for indoor zoomies! 😺🏃‍♂️",
        cold: "Cuddle up in your favorite blanket! 😸🛋️"
      }
    },
    rain: {
      day: {
        hot: "Watch the rain from your favorite windowsill! 🐱🌧️",
        normal: "Perfect day for indoor acrobatics! 😺🎪",
        cold: "Time for a warm radiator nap! 😸🔥"
      },
      night: {
        hot: "Stay dry and watch the lightning show! 🐱⚡",
        normal: "Cozy night for purring under covers! 😺🛏️",
        cold: "Extra snuggles required tonight! 😸❤️"
      }
    }
  };

  const getTemperatureRange = (temp) => {
    if (temp > 25) return 'hot';
    if (temp < 10) return 'cold';
    return 'normal';
  };

  const timeOfDay = isNight ? 'night' : 'day';
  const tempRange = getTemperatureRange(temp);
  const weatherKey = condition?.toLowerCase() || 'clear';

  return advice[weatherKey]?.[timeOfDay]?.[tempRange] || 
    "Whatever the weather, it's always time for a cat nap! 😺💤";
};

const CatAdviceBox = styled(Box)`
  margin-top: 20px;
  padding: 15px;
  border-radius: 12px;
  background: ${props => props.darkMode 
    ? 'rgba(45, 45, 45, 0.9)' 
    : 'rgba(137, 207, 240, 0.1)'};
  border: 1px solid ${props => props.darkMode ? colors.darkBlue : colors.babyBlue};
  transition: all 0.3s ease;

  &:hover {
    transform: translateX(5px);
    background: ${props => props.darkMode 
      ? 'rgba(45, 45, 45, 0.95)' 
      : 'rgba(137, 207, 240, 0.15)'};
  }
`;

const WeatherDisplay = ({ weather, darkMode }) => {
  const [isCelsius, setIsCelsius] = useState(true);
  
  if (!weather?.current) return null;

  const {
    main: { temp, feels_like, pressure },
    weather: [{ main: condition, description }],
    wind,
    sys: { sunrise, sunset },
    visibility,
    dt
  } = weather.current;

  const temperature = isCelsius ? temp : celsiusToFahrenheit(temp);
  const feelsLike = isCelsius ? feels_like : celsiusToFahrenheit(feels_like);

  return (
    <WeatherCard elevation={3} darkMode={darkMode}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <WeatherIcon darkMode={darkMode}>
            {getWeatherIcon(condition, darkMode)}
          </WeatherIcon>
          <Typography 
            variant="h4" 
            gutterBottom
            sx={{ color: darkMode ? colors.white : colors.black }}
          >
            {Math.round(temperature)}°{isCelsius ? 'C' : 'F'}
          </Typography>
          <Typography 
            variant="subtitle1" 
            sx={{ color: darkMode ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)' }} 
            gutterBottom
          >
            Feels like: {Math.round(feelsLike)}°{isCelsius ? 'C' : 'F'}
          </Typography>
          <Box mt={2}>
            <Typography 
              component="span" 
              variant="body2"
              sx={{ color: darkMode ? colors.white : colors.black }}
            >
              °C
            </Typography>
            <Switch
              checked={!isCelsius}
              onChange={() => setIsCelsius(!isCelsius)}
              color="primary"
            />
            <Typography 
              component="span" 
              variant="body2"
              sx={{ color: darkMode ? colors.white : colors.black }}
            >
              °F
            </Typography>
          </Box>
          
          <CatAdviceBox darkMode={darkMode}>
            <Typography 
              variant="body1"
              sx={{ 
                color: darkMode ? colors.lightBlue : colors.babyBlue,
                fontStyle: 'italic'
              }}
            >
              Kitty's Advice:
            </Typography>
            <Typography 
              variant="body2"
              sx={{ 
                color: darkMode ? colors.white : colors.black,
                mt: 1
              }}
            >
              {getCatAdvice(condition, temp, dt)}
            </Typography>
          </CatAdviceBox>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Typography 
            variant="h6" 
            gutterBottom
            sx={{ color: darkMode ? colors.white : colors.black }}
          >
            {description.charAt(0).toUpperCase() + description.slice(1)}
          </Typography>
          
          <DetailBox darkMode={darkMode}>
            <WindIcon speed={wind.speed} darkMode={darkMode} />
            <Typography sx={{ color: darkMode ? colors.white : colors.black }}>
              Wind: {wind.speed} m/s {wind.speed > 5 ? "🙀 Too windy for my whiskers!" : "😺 Purr-fect breeze!"}
            </Typography>
          </DetailBox>

          <DetailBox darkMode={darkMode}>
            <CompressIcon />
            <Typography sx={{ color: darkMode ? colors.white : colors.black }}>
              Pressure: {pressure} hPa {pressure > 1015 ? "😺 Good for cat naps!" : "😸 Time for zoomies!"}
            </Typography>
          </DetailBox>

          <DetailBox darkMode={darkMode}>
            <WbTwilightIcon />
            <Typography sx={{ color: darkMode ? colors.white : colors.black }}>
              Sunrise: {formatTime(sunrise)} 😺 | Sunset: {formatTime(sunset)} 😴
            </Typography>
          </DetailBox>

          <DetailBox darkMode={darkMode}>
            <VisibilityIcon />
            <Typography sx={{ color: darkMode ? colors.white : colors.black }}>
              Visibility: {(visibility / 1000).toFixed(1)} km {visibility > 8000 ? "😺 Perfect for bird watching!" : "😸 Nap time!"}
            </Typography>
          </DetailBox>
        </Grid>
      </Grid>
    </WeatherCard>
  );
};

export default WeatherDisplay; 