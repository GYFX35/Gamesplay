import axios from 'axios';
import { Game } from '../../../shared';

export class EpicGamesService {
  private static readonly API_URL = 'https://api.epicgames.dev/store/v1/catalog';

  private static mockGames: Game[] = [
    {
      id: 'e1',
      title: 'Fortnite',
      thumbnail: 'https://example.com/fortnite.jpg',
      description: 'The ultimate battle royale experience.',
      genre: 'Battle Royale',
      developer: 'Epic Games',
      category: 'Video Games'
    },
    {
      id: 'e2',
      title: 'Rocket League',
      thumbnail: 'https://example.com/rocket-league.jpg',
      description: 'High-powered hybrid of arcade-style soccer and vehicular mayhem.',
      genre: 'Sports',
      developer: 'Psyonix',
      category: 'Video Games'
    }
  ];

  static async getGames(): Promise<Game[]> {
    try {
      const apiKey = process.env.EPIC_GAMES_API_KEY;
      if (!apiKey || apiKey === 'your_epic_games_api_key') {
        console.warn('EPIC_GAMES_API_KEY not configured, returning mock data.');
        return this.mockGames;
      }

      const response = await axios.get(this.API_URL, {
        headers: { 'Authorization': `Bearer ${apiKey}` },
        timeout: 5000
      });

      if (response.data && Array.isArray(response.data)) {
        return response.data.map((g: any) => this.mapToGame(g));
      }

      return this.mockGames;
    } catch (error) {
      console.error('Error fetching Epic Games:', error instanceof Error ? error.message : error);
      return this.mockGames;
    }
  }

  private static mapToGame(data: any): Game {
    return {
      id: data.id || Math.random().toString(36).substr(2, 9),
      title: data.title || 'Unknown Title',
      thumbnail: data.keyImages?.[0]?.url || 'https://example.com/default-game.jpg',
      description: data.description || '',
      genre: data.categories?.[0]?.name || 'Unknown',
      developer: data.seller?.name || 'Unknown',
      category: 'Video Games'
    };
  }
}
