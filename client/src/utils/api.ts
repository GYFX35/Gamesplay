import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export const getGames = async () => {
  const response = await axios.get(`${API_URL}/games`);
  return response.data;
};

export const submitGame = async (gameData: any) => {
  const response = await axios.post(`${API_URL}/games`, gameData);
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

export type AIContentType = 'description' | 'social-media' | 'title';

export const generateAIContent = async (prompt: string, contentType: AIContentType | string) => {
  const response = await axios.post(`${API_URL}/ai/generate-content`, { prompt, contentType });
  return response.data;
};

export const saveProject = async (projectData: any) => {
  const response = await axios.post(`${API_URL}/projects`, projectData);
  return response.data;
};

export const getProjectResearch = async (projectId: string) => {
  const response = await axios.get(`${API_URL}/projects/${projectId}/research`);
  return response.data;
};

export const getMusicTracks = async () => {
  const response = await axios.get(`${API_URL}/music`);
  return response.data;
};

export const getVideoTracks = async () => {
  const response = await axios.get(`${API_URL}/videos`);
  return response.data;
};

export const getProducts = async () => {
  const response = await axios.get(`${API_URL}/products`);
  return response.data;
};

export const getSportsNews = async () => {
  const response = await axios.get(`${API_URL}/sports/news`);
  return response.data;
};

export const getSportsStreams = async () => {
  const response = await axios.get(`${API_URL}/sports/streams`);
  return response.data;
};

export const getCoupons = async () => {
  const response = await axios.get(`${API_URL}/coupons`);
  return response.data;
};

export const getPredictions = async () => {
  const response = await axios.get(`${API_URL}/predictions`);
  return response.data;
};

export const createOrder = async (orderData: { userId: string, productId: string, quantity: number }) => {
  const response = await axios.post(`${API_URL}/orders`, orderData);
  return response.data;
};

export const subscribeToStreamer = async (subData: { userId: string, streamerId: string, tier: number }) => {
  const response = await axios.post(`${API_URL}/monetization/subscribe`, subData);
  return response.data;
};

export const donateToStreamer = async (donationData: { userId: string, streamerId: string, amount: number, message?: string }) => {
  const response = await axios.post(`${API_URL}/monetization/donate`, donationData);
  return response.data;
};

export const getStreamerAnalytics = async (streamerId: string) => {
  const response = await axios.get(`${API_URL}/monetization/analytics/${streamerId}`);
  return response.data;
};

export const getCasinoGames = async () => {
  const response = await axios.get(`${API_URL}/casino/games`);
  return response.data;
};

export const placeBet = async (betData: { userId: string, gameId: string, amount: number }) => {
  const response = await axios.post(`${API_URL}/casino/bet`, betData);
  return response.data;
};
