import React, { useState, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Box, Container, Typography, CircularProgress, Alert, IconButton, useMediaQuery } from '@mui/material';
import styled from 'styled-components';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import WeatherDisplay from './components/WeatherDisplay';
import CatMood from './components/CatMood';
import Forecast from './components/Forecast';
import SearchBar from './components/SearchBar';
import WeatherAlerts from './components/WeatherAlerts';
import { fetchWeather } from './services/weatherService';
import CatLoader from './components/CatLoader';
import AdoptableCats from './components/AdoptableCats';

// Color palette
const colors = {
  babyBlue: '#89CFF0',
  lightBlue: '#BFE6FF',
  darkBlue: '#5B8FA8',
  white: '#FFFFFF',
  black: '#333333',
  darkMode: {
    background: '#1A1A1A',
    surface: '#2D2D2D',
    text: '#FFFFFF'
  }
};

const AppWrapper = styled.div`
  min-height: 100vh;
  background: ${props => props.darkMode 
    ? `linear-gradient(135deg, ${colors.darkMode.background} 0%, ${colors.darkMode.surface} 100%)`
    : `linear-gradient(135deg, ${colors.babyBlue} 0%, ${colors.lightBlue} 100%)`};
  padding: 20px;
  transition: all 0.3s ease;
  position: relative;
  overflow-x: hidden;

  &:before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${props => props.darkMode 
      ? 'radial-gradient(circle at 50% 50%, rgba(45, 45, 45, 0.8) 0%, rgba(26, 26, 26, 0.8) 100%)'
      : `radial-gradient(circle at 50% 50%, rgba(191, 230, 255, 0.1) 0%, rgba(137, 207, 240, 0.2) 100%)`};
    pointer-events: none;
    z-index: 1;
  }
`;

const MainContainer = styled(Container)`
  background: ${props => props.darkMode 
    ? 'rgba(45, 45, 45, 0.8)'
    : 'rgba(255, 255, 255, 0.9)'};
  border-radius: 20px;
  padding: 20px;
  box-shadow: ${props => props.darkMode 
    ? '0 8px 32px rgba(0, 0, 0, 0.3)'
    : `0 8px 32px rgba(91, 143, 168, 0.2)`};
  backdrop-filter: blur(8px);
  transition: all 0.3s ease;
  position: relative;
  z-index: 2;

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${props => props.darkMode 
      ? '0 12px 40px rgba(0, 0, 0, 0.4)'
      : `0 12px 40px rgba(91, 143, 168, 0.3)`};
  }
`;

const Header = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: ${props => props.darkMode 
    ? '1px solid rgba(255, 255, 255, 0.1)'
    : `1px solid ${colors.babyBlue}`};
`;

const Title = styled(Typography)`
  font-weight: 600;
  background: ${props => props.darkMode 
    ? `linear-gradient(45deg, ${colors.babyBlue}, ${colors.lightBlue})`
    : `linear-gradient(45deg, ${colors.darkBlue}, ${colors.babyBlue})`};
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  text-shadow: ${props => props.darkMode 
    ? '0 2px 4px rgba(0, 0, 0, 0.3)'
    : '0 2px 4px rgba(91, 143, 168, 0.2)'};
`;

const LoadingContainer = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
  width: 100%;
`;

function App() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [city, setCity] = useState('London');
  const [darkMode, setDarkMode] = useState(false);
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  useEffect(() => {
    setDarkMode(prefersDarkMode);
  }, [prefersDarkMode]);

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: colors.babyBlue,
        dark: colors.darkBlue,
        light: colors.lightBlue,
      },
      secondary: {
        main: colors.darkBlue,
      },
      background: {
        default: darkMode ? colors.darkMode.background : colors.white,
        paper: darkMode ? colors.darkMode.surface : colors.white,
      },
      text: {
        primary: darkMode ? colors.white : colors.black,
      }
    },
    typography: {
      fontFamily: "'Poppins', sans-serif",
      h3: {
        fontWeight: 600,
      },
      h6: {
        fontWeight: 500,
      },
    },
    components: {
      MuiPaper: {
        styleOverrides: {
          root: {
            transition: 'all 0.3s ease',
          },
        },
      },
    },
  });

  const getWeatherData = async (searchCity) => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchWeather(searchCity);
      setWeather(data);
    } catch (err) {
      setError('Failed to fetch weather data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getWeatherData(city);
  }, [city]);

  const handleSearch = (searchCity) => {
    setCity(searchCity);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <ThemeProvider theme={theme}>
      <AppWrapper darkMode={darkMode}>
        <MainContainer maxWidth="md" darkMode={darkMode}>
          <Header darkMode={darkMode}>
            <Title 
              variant="h3" 
              darkMode={darkMode}
            >
              🐱 Purr-fect Weather
            </Title>
            <IconButton 
              onClick={toggleDarkMode} 
              color="inherit"
              sx={{ 
                background: darkMode ? 'rgba(255, 255, 255, 0.1)' : `rgba(137, 207, 240, 0.1)`,
                '&:hover': {
                  background: darkMode ? 'rgba(255, 255, 255, 0.2)' : `rgba(137, 207, 240, 0.2)`,
                }
              }}
            >
              {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
          </Header>

          <SearchBar onSearch={handleSearch} darkMode={darkMode} />
          
          {error && (
            <Alert 
              severity="error" 
              sx={{ 
                mb: 2,
                background: darkMode ? 'rgba(211, 47, 47, 0.1)' : undefined
              }}
            >
              {error}
            </Alert>
          )}

          {weather?.alerts && <WeatherAlerts alerts={weather.alerts} />}
          
          {loading ? (
            <LoadingContainer>
              <CatLoader darkMode={darkMode} />
            </LoadingContainer>
          ) : (
            <>
              <CatMood weather={weather} darkMode={darkMode} />
              <WeatherDisplay weather={weather} darkMode={darkMode} />
              <Forecast weather={weather} darkMode={darkMode} />
              <AdoptableCats city={city} darkMode={darkMode} />
            </>
          )}
        </MainContainer>
      </AppWrapper>
    </ThemeProvider>
  );
}

export default App; 