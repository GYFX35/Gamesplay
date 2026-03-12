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
