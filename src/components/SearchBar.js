import React, { useState } from 'react';
import { Paper, InputBase, IconButton, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import styled, { keyframes } from 'styled-components';

const colors = {
  babyBlue: '#89CFF0',
  lightBlue: '#BFE6FF',
  darkBlue: '#5B8FA8',
  white: '#FFFFFF',
  black: '#333333'
};

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const SearchPaper = styled(Paper)`
  padding: 2px 4px;
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 500px;
  margin: 0 auto 20px auto;
  background: ${props => props.darkMode ? 'rgba(45, 45, 45, 0.9)' : 'rgba(255, 255, 255, 0.9)'};
  border-radius: 50px;
  transition: all 0.3s ease;
  animation: ${slideIn} 0.5s ease-out;
  border: 1px solid ${props => props.darkMode ? 'transparent' : colors.babyBlue};

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 20px ${props => props.darkMode 
      ? 'rgba(0, 0, 0, 0.2)' 
      : 'rgba(137, 207, 240, 0.2)'};
  }

  &:focus-within {
    box-shadow: 0 4px 20px ${props => props.darkMode 
      ? 'rgba(0, 0, 0, 0.3)' 
      : 'rgba(137, 207, 240, 0.3)'};
    transform: translateY(-2px);
    border-color: ${colors.babyBlue};
  }
`;

const StyledInputBase = styled(InputBase)`
  margin-left: 16px;
  flex: 1;
  font-size: 1.1rem;
  color: ${props => props.darkMode ? colors.white : colors.black};

  input {
    padding: 12px 0;
    &::placeholder {
      opacity: 0.6;
      color: ${props => props.darkMode ? colors.white : colors.black};
    }
  }
`;

const StyledIconButton = styled(IconButton)`
  padding: 12px;
  border-radius: 50%;
  margin: 4px;
  background: ${props => props.darkMode 
    ? `linear-gradient(45deg, ${colors.darkBlue}, ${colors.babyBlue})`
    : `linear-gradient(45deg, ${colors.babyBlue}, ${colors.lightBlue})`};
  color: ${props => props.darkMode ? colors.white : colors.white};
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.darkMode 
      ? `linear-gradient(45deg, ${colors.babyBlue}, ${colors.darkBlue})`
      : `linear-gradient(45deg, ${colors.lightBlue}, ${colors.babyBlue})`};
    transform: scale(1.05);
  }
`;

const LocationButton = styled(IconButton)`
  padding: 12px;
  color: ${props => props.darkMode ? colors.white : colors.darkBlue};
  transition: all 0.3s ease;

  &:hover {
    color: ${colors.babyBlue};
    transform: scale(1.05);
  }
`;

const SearchBar = ({ onSearch, darkMode }) => {
  const [city, setCity] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city.trim());
      setCity('');
    }
  };

  return (
    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
      <SearchPaper component="form" onSubmit={handleSubmit} elevation={3} darkMode={darkMode}>
        <LocationButton aria-label="use current location" darkMode={darkMode}>
          <LocationOnIcon />
        </LocationButton>
        <StyledInputBase
          placeholder="Search for a city..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          fullWidth
          darkMode={darkMode}
        />
        <StyledIconButton type="submit" aria-label="search" darkMode={darkMode}>
          <SearchIcon />
        </StyledIconButton>
      </SearchPaper>
    </Box>
  );
};

export default SearchBar; 