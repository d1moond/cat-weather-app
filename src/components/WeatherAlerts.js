import React from 'react';
import { Alert, Box, Collapse } from '@mui/material';
import styled from 'styled-components';

const AlertsContainer = styled(Box)`
  margin-bottom: 20px;
`;

const WeatherAlerts = ({ alerts }) => {
  if (!alerts || alerts.length === 0) return null;

  return (
    <AlertsContainer>
      {alerts.map((alert, index) => (
        <Collapse in={true} key={index}>
          <Alert 
            severity="warning" 
            sx={{ mb: 1 }}
          >
            <strong>{alert.title}</strong> - {alert.description}
          </Alert>
        </Collapse>
      ))}
    </AlertsContainer>
  );
};

export default WeatherAlerts; 