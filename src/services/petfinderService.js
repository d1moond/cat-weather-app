import axios from 'axios';

const PETFINDER_API_KEY = process.env.REACT_APP_PETFINDER_API_KEY;
const PETFINDER_SECRET = process.env.REACT_APP_PETFINDER_SECRET;
const BASE_URL = 'https://api.petfinder.com/v2';

let tokenData = {
  token: null,
  expiresAt: null
};

const getToken = async () => {
  if (tokenData.token && tokenData.expiresAt > Date.now()) {
    return tokenData.token;
  }

  try {
    const response = await axios.post(`${BASE_URL}/oauth2/token`, {
      grant_type: 'client_credentials',
      client_id: PETFINDER_API_KEY,
      client_secret: PETFINDER_SECRET
    });

    tokenData = {
      token: response.data.access_token,
      expiresAt: Date.now() + (response.data.expires_in * 1000)
    };

    return tokenData.token;
  } catch (error) {
    console.error('Error getting Petfinder token:', error);
    throw error;
  }
};

export const fetchAdoptableCats = async (location) => {
  try {
    const token = await getToken();
    
    const response = await axios.get(`${BASE_URL}/animals`, {
      headers: {
        'Authorization': `Bearer ${token}`
      },
      params: {
        type: 'cat',
        location: location,
        sort: 'distance',
        limit: 6,
        status: 'adoptable'
      }
    });

    return response.data.animals;
  } catch (error) {
    console.error('Error fetching adoptable cats:', error);
    throw error;
  }
}; 