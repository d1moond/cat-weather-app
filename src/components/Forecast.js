import React from 'react';
import { Paper, Typography, Grid, Box } from '@mui/material';
import styled, { keyframes } from 'styled-components';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import CloudIcon from '@mui/icons-material/Cloud';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import AirIcon from '@mui/icons-material/Air';

const colors = {
  babyBlue: '#89CFF0',
  lightBlue: '#BFE6FF',
  darkBlue: '#5B8FA8',
  white: '#FFFFFF',
  black: '#333333'
};

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-5px); }
  100% { transform: translateY(0px); }
`;

const rotate = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const ForecastCard = styled(Paper)`
  padding: 20px;
  background: ${props => props.darkMode ? 'rgba(45, 45, 45, 0.9)' : 'rgba(255, 255, 255, 0.9)'};
  border-radius: 15px;
  transition: all 0.3s ease;
  border: 1px solid ${props => props.darkMode ? 'transparent' : colors.babyBlue};
`;

const ForecastItem = styled(Box)`
  text-align: center;
  padding: 15px;
  border-radius: 12px;
  transition: all 0.3s ease;
  background: ${props => props.darkMode 
    ? 'rgba(45, 45, 45, 0.9)' 
    : 'rgba(137, 207, 240, 0.1)'};
  border: 1px solid ${props => props.darkMode ? colors.darkBlue : colors.babyBlue};
  position: relative;
  overflow: hidden;
  
  &:hover {
    transform: translateY(-5px);
    background: ${props => props.darkMode 
      ? 'rgba(45, 45, 45, 0.95)' 
      : 'rgba(137, 207, 240, 0.15)'};
    box-shadow: 0 5px 15px ${props => props.darkMode 
      ? 'rgba(0, 0, 0, 0.3)' 
      : 'rgba(137, 207, 240, 0.3)'};
  }

  &:before {
    content: '🐾';
    position: absolute;
    top: 5px;
    right: 5px;
    font-size: 0.8rem;
    opacity: 0.5;
  }

  &:after {
    content: '🐾';
    position: absolute;
    bottom: 5px;
    left: 5px;
    font-size: 0.8rem;
    opacity: 0.5;
    transform: rotate(45deg);
  }
`;

const WeatherIcon = styled(Box)`
  font-size: 2rem;
  margin-bottom: 8px;
  color: ${props => props.darkMode ? colors.lightBlue : colors.babyBlue};
  animation: ${float} 3s ease-in-out infinite;
  animation-delay: ${props => props.delay}s;

  svg {
    filter: drop-shadow(0 4px 8px ${props => props.darkMode 
      ? 'rgba(191, 230, 255, 0.3)' 
      : 'rgba(91, 143, 168, 0.3)'});
  }
`;

const WindIcon = styled(AirIcon)`
  font-size: 1.2rem;
  margin-left: 5px;
  color: ${props => props.darkMode ? colors.lightBlue : colors.babyBlue};
  animation: ${rotate} ${props => 20 / (props.speed || 1)}s linear infinite;
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

const formatDate = (timestamp) => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString('en-US', { 
    weekday: 'short', 
    month: 'short', 
    day: 'numeric' 
  });
};

const getDailyForecasts = (forecastList) => {
  const dailyForecasts = [];
  const seenDates = new Set();

  for (const forecast of forecastList) {
    const date = new Date(forecast.dt * 1000).toDateString();
    if (!seenDates.has(date)) {
      seenDates.add(date);
      dailyForecasts.push(forecast);
      if (dailyForecasts.length === 5) break;
    }
  }

  return dailyForecasts;
};

const getCatMoodForWeather = (condition, temp) => {
  const moods = {
    clear: {
      hot: "Lazy cat day, finding sunny spots for naps! 😺☀️",
      normal: "Purr-fect day for sunbathing! 😸",
      cold: "Seeking warm sunbeams! 🐱✨"
    },
    clouds: {
      hot: "Comfy cloud watching day! 😺☁️",
      normal: "Cozy napping weather! 😸💤",
      cold: "Time for blanket snuggles! 🐱🌥️"
    },
    rain: {
      hot: "Window watching the rain! 😺🌧️",
      normal: "Indoor playtime weather! 😸🎮",
      cold: "Purr-fect tea and cuddles weather! 🐱☔"
    },
    snow: {
      hot: "Rare weather for a confused kitty! 😺❄️",
      normal: "Watching snowflakes from inside! 😸⛄",
      cold: "Time to curl up by the fireplace! 🐱🔥"
    }
  };

  const getTemperatureRange = (temp) => {
    if (temp > 25) return 'hot';
    if (temp < 10) return 'cold';
    return 'normal';
  };

  const weatherKey = condition?.toLowerCase() || 'clear';
  const tempRange = getTemperatureRange(temp);
  
  return moods[weatherKey]?.[tempRange] || "Just another purr-fect day! 😺";
};

const Forecast = ({ weather, darkMode }) => {
  if (!weather?.forecast?.list) return null;

  const dailyForecasts = getDailyForecasts(weather.forecast.list);

  return (
    <ForecastCard elevation={3} darkMode={darkMode}>
      <Typography 
        variant="h6" 
        gutterBottom 
        align="center"
        sx={{ color: darkMode ? colors.white : colors.black }}
      >
        <span role="img" aria-label="cat">🐱</span> Kitty's 5-Day Forecast <span role="img" aria-label="cat">🐱</span>
      </Typography>
      <Grid container spacing={2}>
        {dailyForecasts.map((forecast, index) => (
          <Grid item xs={6} sm={4} md={2.4} key={forecast.dt}>
            <ForecastItem darkMode={darkMode}>
              <Typography 
                variant="subtitle2" 
                gutterBottom
                sx={{ color: darkMode ? colors.white : colors.black }}
              >
                {formatDate(forecast.dt)}
              </Typography>
              <WeatherIcon delay={index * 0.2} darkMode={darkMode}>
                {getWeatherIcon(forecast.weather[0].main, darkMode)}
              </WeatherIcon>
              <Typography 
                variant="h6"
                sx={{ color: darkMode ? colors.white : colors.black }}
              >
                {Math.round(forecast.main.temp)}°C
              </Typography>
              <Typography 
                variant="body2" 
                sx={{ color: darkMode ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)' }}
              >
                {forecast.weather[0].description}
              </Typography>
              <Typography 
                variant="body2"
                sx={{ 
                  color: darkMode ? colors.lightBlue : colors.babyBlue,
                  mt: 1,
                  fontStyle: 'italic',
                  fontSize: '0.85rem'
                }}
              >
                {getCatMoodForWeather(forecast.weather[0].main, forecast.main.temp)}
              </Typography>
              <Box display="flex" alignItems="center" justifyContent="center" mt={1}>
                <Typography 
                  variant="body2"
                  sx={{ color: darkMode ? colors.white : colors.black }}
                >
                  {forecast.wind.speed}m/s
                </Typography>
                <WindIcon speed={forecast.wind.speed} darkMode={darkMode} />
              </Box>
            </ForecastItem>
          </Grid>
        ))}
      </Grid>
    </ForecastCard>
  );
};

export default Forecast; 