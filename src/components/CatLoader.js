import React from 'react';
import { Box } from '@mui/material';
import styled, { keyframes } from 'styled-components';

const colors = {
  babyBlue: '#89CFF0',
  lightBlue: '#BFE6FF',
  darkBlue: '#5B8FA8',
  white: '#FFFFFF',
  black: '#333333'
};

const bounce = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
`;

const walk = keyframes`
  0% { transform: translateX(-50px); }
  50% { transform: translateX(50px); }
  100% { transform: translateX(-50px); }
`;

const tail = keyframes`
  0%, 100% { transform: rotate(-5deg); }
  50% { transform: rotate(5deg); }
`;

const LoaderContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 200px;
  position: relative;
  overflow: hidden;
`;

const CatContainer = styled(Box)`
  position: relative;
  animation: ${walk} 3s infinite ease-in-out;
`;

const Cat = styled(Box)`
  width: 80px;
  height: 80px;
  position: relative;
  animation: ${bounce} 1s infinite ease-in-out;
`;

const CatBody = styled(Box)`
  width: 50px;
  height: 30px;
  background: ${props => props.darkMode ? colors.lightBlue : colors.babyBlue};
  border-radius: 20px;
  position: absolute;
  top: 30px;
  left: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const CatHead = styled(Box)`
  width: 35px;
  height: 35px;
  background: ${props => props.darkMode ? colors.lightBlue : colors.babyBlue};
  border-radius: 50%;
  position: absolute;
  top: 15px;
  left: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  &:before, &:after {
    content: '';
    position: absolute;
    background: ${props => props.darkMode ? colors.lightBlue : colors.babyBlue};
    width: 15px;
    height: 15px;
    border-radius: 50% 50% 0 0;
    top: -8px;
  }

  &:before {
    left: 0;
    transform: rotate(-30deg);
  }

  &:after {
    right: 0;
    transform: rotate(30deg);
  }
`;

const CatTail = styled(Box)`
  width: 12px;
  height: 35px;
  background: ${props => props.darkMode ? colors.lightBlue : colors.babyBlue};
  position: absolute;
  right: 0;
  top: 35px;
  border-radius: 6px;
  transform-origin: top center;
  animation: ${tail} 2s infinite ease-in-out;
`;

const LoadingText = styled(Box)`
  margin-top: 40px;
  font-size: 1.2rem;
  color: ${props => props.darkMode ? colors.white : colors.black};
  text-align: center;
  opacity: 0.8;
  font-family: 'Poppins', sans-serif;

  span {
    display: inline-block;
    animation: ${bounce} 1s infinite ease-in-out;
    animation-delay: ${props => props.delay || 0}s;
  }
`;

const Paw = styled(Box)`
  position: absolute;
  font-size: 1.2rem;
  opacity: 0.6;
  animation: ${bounce} 0.5s infinite ease-in-out;
  animation-delay: ${props => props.delay}s;
  bottom: 20px;
  left: ${props => props.left}%;
`;

const CatLoader = ({ darkMode }) => {
  const loadingText = "Loading Purr-fect Weather";

  return (
    <LoaderContainer>
      <CatContainer>
        <Cat>
          <CatHead darkMode={darkMode} />
          <CatBody darkMode={darkMode} />
          <CatTail darkMode={darkMode} />
        </Cat>
      </CatContainer>
      
      <LoadingText darkMode={darkMode}>
        {loadingText.split('').map((letter, index) => (
          <span key={index} style={{ animationDelay: `${index * 0.1}s` }}>
            {letter}
          </span>
        ))}
      </LoadingText>

      {[...Array(5)].map((_, i) => (
        <Paw 
          key={i} 
          delay={i * 0.2} 
          left={20 + i * 15}
        >
          🐾
        </Paw>
      ))}
    </LoaderContainer>
  );
};

export default CatLoader; 