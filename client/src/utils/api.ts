import axios from 'axios';

const API_URL = 'http://localhost:3001/api';

export const getGames = async () => {
  const response = await axios.get(`${API_URL}/games`);
  return response.data;
};

export const getStreams = async () => {
  const response = await axios.get(`${API_URL}/streams`);
  return response.data;
};

export const getStreamById = async (id: string) => {
  const response = await axios.get(`${API_URL}/streams/${id}`);
  return response.data;
};
