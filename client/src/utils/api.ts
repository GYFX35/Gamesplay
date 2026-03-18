import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

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

export const getAIAssistance = async (prompt: string) => {
  const response = await axios.post(`${API_URL}/ai/assist`, { prompt });
  return response.data;
};

export const saveProject = async (projectData: any) => {
  const response = await axios.post(`${API_URL}/projects`, projectData);
  return response.data;
};

export const getMusicTracks = async () => {
  const response = await axios.get(`${API_URL}/music`);
  return response.data;
};

export const getProducts = async () => {
  const response = await axios.get(`${API_URL}/products`);
  return response.data;
};

export const createOrder = async (orderData: { userId: string, productId: string, quantity: number }) => {
  const response = await axios.post(`${API_URL}/orders`, orderData);
  return response.data;
};
