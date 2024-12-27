import axios from 'axios';

const API_KEY = 'e0a49a4c0df05e28f9606531461d55d0';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

// Enhanced weather conditions with more details
const weatherConditions = [
  { 
    main: 'Clear', 
    description: 'clear sky',
    temp: 25,
    wind: { speed: 5, deg: 120 },
    alerts: null
  },
  { 
    main: 'Clouds', 
    description: 'scattered clouds',
    temp: 20,
    wind: { speed: 8, deg: 90 },
    alerts: null
  },
  { 
    main: 'Rain', 
    description: 'light rain',
    temp: 15,
    wind: { speed: 12, deg: 180 },
    alerts: { title: 'Rain Warning', description: 'Light to moderate rain expected' }
  },
  { 
    main: 'Snow', 
    description: 'light snow',
    temp: 0,
    wind: { speed: 6, deg: 45 },
    alerts: { title: 'Snow Alert', description: 'Light snowfall expected' }
  },
  { 
    main: 'Thunderstorm', 
    description: 'thunderstorm',
    temp: 18,
    wind: { speed: 15, deg: 225 },
    alerts: { title: 'Severe Weather', description: 'Thunderstorms with possible lightning' }
  },
  {
    main: 'Mist',
    description: 'misty conditions',
    temp: 12,
    wind: { speed: 3, deg: 60 },
    alerts: { title: 'Visibility Warning', description: 'Reduced visibility due to mist' }
  }
];

const getWindDirection = (deg) => {
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  return directions[Math.round(deg / 45) % 8];
};

const getMockWeather = (city) => {
  const condition = weatherConditions[Math.floor(Math.random() * weatherConditions.length)];
  const baseTemp = condition.temp + (Math.random() * 5 - 2.5);
  const now = new Date();
  const sunrise = new Date(now.setHours(6, 30));
  const sunset = new Date(now.setHours(19, 45));

  // Generate 40 forecast entries (5 days * 8 entries per day)
  const forecastList = [];
  for (let i = 0; i < 40; i++) {
    const forecastCondition = weatherConditions[Math.floor(Math.random() * weatherConditions.length)];
    const forecastTemp = baseTemp + Math.random() * 10 - 5; // More temperature variation
    const timestamp = Math.floor(Date.now() / 1000) + (i * 3 * 3600); // 3-hour intervals

    forecastList.push({
      dt: timestamp,
      main: {
        temp: forecastTemp,
        humidity: 65 + Math.floor(Math.random() * 20),
        pressure: 1013 + Math.floor(Math.random() * 10)
      },
      weather: [{
        main: forecastCondition.main,
        description: forecastCondition.description
      }],
      wind: {
        speed: forecastCondition.wind.speed,
        deg: forecastCondition.wind.deg,
        direction: getWindDirection(forecastCondition.wind.deg)
      }
    });
  }

  return {
    current: {
      main: {
        temp: baseTemp,
        feels_like: baseTemp - 1,
        humidity: 65 + Math.floor(Math.random() * 20),
        pressure: 1013 + Math.floor(Math.random() * 10)
      },
      weather: [{
        main: condition.main,
        description: condition.description
      }],
      wind: {
        speed: condition.wind.speed,
        deg: condition.wind.deg,
        direction: getWindDirection(condition.wind.deg)
      },
      name: city,
      sys: {
        sunrise: sunrise.getTime() / 1000,
        sunset: sunset.getTime() / 1000
      },
      visibility: 10000 - (condition.main === 'Mist' ? 7000 : 0)
    },
    forecast: {
      list: forecastList
    },
    alerts: condition.alerts ? [condition.alerts] : []
  };
};

export const fetchWeather = async (city = 'London') => {
  try {
    const response = await axios.get(`${BASE_URL}/weather`, {
      params: {
        q: city,
        appid: API_KEY,
        units: 'metric'
      }
    });
    
    const forecast = await axios.get(`${BASE_URL}/forecast`, {
      params: {
        q: city,
        appid: API_KEY,
        units: 'metric'
      }
    });

    return {
      current: response.data,
      forecast: forecast.data,
      alerts: []
    };
  } catch (error) {
    console.error('Error details:', {
      status: error.response?.status,
      message: error.message,
      data: error.response?.data
    });
    console.log(`Using mock data for ${city} while API connection is unavailable...`);
    return getMockWeather(city);
  }
}; 