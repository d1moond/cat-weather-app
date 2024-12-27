import React, { useState, useEffect } from 'react';
import { Paper, Typography, Grid, Box, Button, Chip } from '@mui/material';
import styled, { keyframes } from 'styled-components';
import PetsIcon from '@mui/icons-material/Pets';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { fetchAdoptableCats } from '../services/petfinderService';

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

const Container = styled(Paper)`
  padding: 20px;
  margin: 20px 0;
  background: ${props => props.darkMode ? 'rgba(45, 45, 45, 0.9)' : 'rgba(255, 255, 255, 0.9)'};
  border-radius: 15px;
  border: 1px solid ${props => props.darkMode ? 'transparent' : colors.babyBlue};
  animation: ${fadeIn} 0.5s ease-out;
`;

const CatCard = styled(Paper)`
  padding: 15px;
  height: 100%;
  background: ${props => props.darkMode 
    ? 'rgba(45, 45, 45, 0.9)' 
    : 'rgba(137, 207, 240, 0.1)'};
  border-radius: 12px;
  transition: all 0.3s ease;
  border: 1px solid ${props => props.darkMode ? colors.darkBlue : colors.babyBlue};
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px ${props => props.darkMode 
      ? 'rgba(0, 0, 0, 0.3)' 
      : 'rgba(137, 207, 240, 0.3)'};
  }

  &:before {
    content: '🐾';
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 1rem;
    opacity: 0.5;
  }
`;

const CatImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 10px;
  border: 2px solid ${props => props.darkMode ? colors.darkBlue : colors.babyBlue};
`;

const ChipContainer = styled(Box)`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 8px 0;
`;

const AdoptButton = styled(Button)`
  margin-top: auto;
  background: ${props => props.darkMode 
    ? `linear-gradient(45deg, ${colors.darkBlue}, ${colors.babyBlue})` 
    : `linear-gradient(45deg, ${colors.babyBlue}, ${colors.lightBlue})`};
  color: ${colors.white};
  padding: 8px 16px;
  border-radius: 20px;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.05);
    background: ${props => props.darkMode 
      ? `linear-gradient(45deg, ${colors.babyBlue}, ${colors.darkBlue})` 
      : `linear-gradient(45deg, ${colors.lightBlue}, ${colors.babyBlue})`};
  }
`;

const NoResultsContainer = styled(Box)`
  text-align: center;
  padding: 40px;
  background: ${props => props.darkMode 
    ? 'rgba(45, 45, 45, 0.9)' 
    : 'rgba(137, 207, 240, 0.1)'};
  border-radius: 12px;
  border: 1px dashed ${props => props.darkMode ? colors.darkBlue : colors.babyBlue};
`;

const AdoptableCats = ({ city, darkMode }) => {
  const [cats, setCats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCats = async () => {
      try {
        setLoading(true);
        setError(null);
        const catsData = await fetchAdoptableCats(city);
        setCats(catsData);
      } catch (err) {
        setError('Unable to fetch adoptable cats at this time.');
      } finally {
        setLoading(false);
      }
    };

    if (city) {
      fetchCats();
    }
  }, [city]);

  if (loading) {
    return (
      <Container darkMode={darkMode}>
        <Typography 
          variant="h5" 
          gutterBottom
          sx={{ color: darkMode ? colors.white : colors.black }}
        >
          <PetsIcon sx={{ mr: 1 }} /> Finding Adoptable Cats...
        </Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container darkMode={darkMode}>
        <Typography 
          variant="h6" 
          color="error"
          sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
        >
          <PetsIcon /> {error}
        </Typography>
      </Container>
    );
  }

  if (!cats.length) {
    return (
      <Container darkMode={darkMode}>
        <NoResultsContainer darkMode={darkMode}>
          <Typography 
            variant="h6"
            sx={{ color: darkMode ? colors.white : colors.black }}
          >
            No adoptable cats found in {city} at the moment.
          </Typography>
          <Typography 
            variant="body1"
            sx={{ color: darkMode ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)', mt: 1 }}
          >
            Try searching in nearby areas or check back later! 🐱
          </Typography>
        </NoResultsContainer>
      </Container>
    );
  }

  return (
    <Container darkMode={darkMode}>
      <Typography 
        variant="h5" 
        gutterBottom
        sx={{ 
          color: darkMode ? colors.white : colors.black,
          display: 'flex',
          alignItems: 'center',
          gap: 1
        }}
      >
        <PetsIcon /> Adoptable Cats in {city}
      </Typography>
      
      <Grid container spacing={3}>
        {cats.map((cat) => (
          <Grid item xs={12} sm={6} md={4} key={cat.id}>
            <CatCard darkMode={darkMode}>
              <CatImage 
                src={cat.photos[0]?.medium || 'https://placekitten.com/300/300'} 
                alt={cat.name}
                darkMode={darkMode}
              />
              <Typography 
                variant="h6"
                sx={{ color: darkMode ? colors.white : colors.black }}
              >
                {cat.name}
              </Typography>
              
              <ChipContainer>
                <Chip 
                  icon={<FavoriteIcon />}
                  label={`${cat.age} ${cat.gender}`}
                  size="small"
                  sx={{ 
                    background: darkMode ? colors.darkBlue : colors.babyBlue,
                    color: colors.white
                  }}
                />
                {cat.breeds.primary && (
                  <Chip 
                    icon={<PetsIcon />}
                    label={cat.breeds.primary}
                    size="small"
                    sx={{ 
                      background: darkMode ? 'rgba(45, 45, 45, 0.9)' : 'rgba(137, 207, 240, 0.2)',
                      color: darkMode ? colors.white : colors.black
                    }}
                  />
                )}
              </ChipContainer>

              <Typography 
                variant="body2"
                sx={{ 
                  color: darkMode ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)',
                  mb: 2,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.5
                }}
              >
                <LocationOnIcon fontSize="small" />
                {cat.contact.address.city}, {cat.contact.address.state}
              </Typography>

              <AdoptButton 
                variant="contained"
                href={cat.url}
                target="_blank"
                rel="noopener noreferrer"
                darkMode={darkMode}
                endIcon={<FavoriteIcon />}
              >
                Meet {cat.name}
              </AdoptButton>
            </CatCard>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default AdoptableCats; 