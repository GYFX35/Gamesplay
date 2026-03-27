export interface User {
  id: string;
  username: string;
  avatarUrl?: string;
}

export interface Game {
  id: string;
  title: string;
  thumbnail: string;
  description: string;
  genre: string;
  developer: string;
}

export interface Stream {
  id: string;
  userId: string;
  gameId: string;
  title: string;
  viewerCount: number;
  startedAt: string;
  thumbnail: string;
}

export interface ChatMessage {
  id: string;
  userId: string;
  username: string;
  message: string;
  timestamp: string;
}

export interface AIAgentMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  suggestions?: string[];
}

export interface GameProject {
  id: string;
  userId: string;
  name: string;
  description: string;
  lastModified: string;
  assets: string[];
  config?: GameProjectConfig;
}

export interface GameProjectConfig {
  physicsEngine: 'cannon' | 'ammo' | 'physx';
  renderer: 'webgl' | 'webgpu';
  aiEnabled: boolean;
  multiplayerEnabled: boolean;
}

export interface ResearchMetric {
  label: string;
  value: number;
  unit: string;
  trend: 'up' | 'down' | 'neutral';
}

export interface ResearchData {
  projectId: string;
  metrics: ResearchMetric[];
  aiTrainingProgress: number;
  activeExperiments: number;
  playerRetention: number[];
}

export interface MusicTrack {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: string;
  thumbnail: string;
  audioUrl: string;
}

export interface VideoTrack {
  id: string;
  title: string;
  creator: string;
  duration: string;
  thumbnail: string;
  videoUrl: string;
  views: number;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  thumbnail: string;
  stock: number;
}

export interface Order {
  id: string;
  userId: string;
  productId: string;
  quantity: number;
  totalPrice: number;
  status: 'pending' | 'shipped' | 'delivered';
  createdAt: string;
}

export interface SportsNews {
  id: string;
  title: string;
  summary: string;
  content: string;
  thumbnail: string;
  category: string;
  publishedAt: string;
}

export interface SportsStream {
  id: string;
  title: string;
  league: string;
  homeTeam: string;
  awayTeam: string;
  viewerCount: number;
  thumbnail: string;
  isLive: boolean;
}

export interface Subscription {
  id: string;
  userId: string;
  streamerId: string;
  tier: 1 | 2 | 3;
  status: 'active' | 'cancelled' | 'expired';
  expiresAt: string;
}

export interface Donation {
  id: string;
  userId: string;
  streamerId: string;
  amount: number;
  message?: string;
  timestamp: string;
}

export interface StreamerAnalytics {
  totalRevenue: number;
  subscriberCount: number;
  recentDonations: Donation[];
  revenueByMonth: { month: string, amount: number }[];
}

export interface CasinoGame {
  id: string;
  title: string;
  thumbnail: string;
  category: 'Slots' | 'Table Games' | 'Poker' | 'Dice';
  gameUrl: string;
}

export interface Bet {
  id: string;
  userId: string;
  gameId: string;
  amount: number;
  outcome?: 'win' | 'loss' | 'pending';
  multiplier?: number;
  timestamp: string;
}
