import axios from 'axios';
import { Game } from '../../../shared';

export class TwitchService {
  private static readonly CLIENT_ID = process.env.TWITCH_CLIENT_ID;
  private static readonly CLIENT_SECRET = process.env.TWITCH_CLIENT_SECRET;

  private static mockGames: Game[] = [
    {
      id: 'tw1',
      title: 'Just Chatting',
      thumbnail: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80',
      description: 'The most popular category on Twitch.',
      genre: 'IRL',
      developer: 'Twitch',
      playUrl: 'https://www.twitch.tv/directory/game/Just%20Chatting'
    },
    {
      id: 'tw2',
      title: 'League of Legends',
      thumbnail: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80',
      description: 'A team-based strategy game where two teams of five powerful champions face off.',
      genre: 'MOBA',
      developer: 'Riot Games',
      playUrl: 'https://www.leagueoflegends.com/'
    }
  ];

  static async getGames(): Promise<Game[]> {
    try {
      if (!this.CLIENT_ID || this.CLIENT_ID === 'your_twitch_client_id' ||
          !this.CLIENT_SECRET || this.CLIENT_SECRET === 'your_twitch_client_secret') {
        console.warn('Twitch credentials not configured, returning mock data.');
        return this.mockGames;
      }

      // 1. Get OAuth Token
      const authResponse = await axios.post('https://id.twitch.tv/oauth2/token', null, {
        params: {
          client_id: this.CLIENT_ID,
          client_secret: this.CLIENT_SECRET,
          grant_type: 'client_credentials'
        },
        timeout: 5000
      });
      const accessToken = authResponse.data.access_token;

      // 2. Fetch Top Games
      const response = await axios.get('https://api.twitch.tv/helix/games/top', {
        headers: {
          'Client-ID': this.CLIENT_ID,
          'Authorization': `Bearer ${accessToken}`
        },
        timeout: 5000
      });

      if (response.data && response.data.data) {
        return response.data.data.map((g: any) => this.mapToGame(g));
      }

      return this.mockGames;
    } catch (error) {
      console.error('Error fetching Twitch games:', error instanceof Error ? error.message : error);
      return this.mockGames;
    }
  }

  private static mapToGame(data: any): Game {
    return {
      id: data.id || Math.random().toString(36).substr(2, 9),
      title: data.name || 'Unknown',
      thumbnail: data.box_art_url ? data.box_art_url.replace('{width}', '300').replace('{height}', '400') : 'https://example.com/default-game.jpg',
      description: `Top game on Twitch: ${data.name}`,
      genre: 'Gaming',
      developer: 'Multiple'
    };
  }
}
