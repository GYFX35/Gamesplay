import axios from 'axios';
import { Game } from '../../../shared';

export class NintendoService {
  private static mockGames: Game[] = [
    {
      id: 'n1',
      title: 'The Legend of Zelda: Breath of the Wild',
      thumbnail: 'https://example.com/zelda.jpg',
      description: 'Explore the vast kingdom of Hyrule.',
      genre: 'Action-Adventure',
      developer: 'Nintendo EPD'
    },
    {
      id: 'n2',
      title: 'Super Mario Odyssey',
      thumbnail: 'https://example.com/mario.jpg',
      description: 'A globetrotting 3D Mario adventure.',
      genre: 'Platformer',
      developer: 'Nintendo EPD'
    }
  ];

  static async getGames(): Promise<Game[]> {
    try {
      const apiKey = process.env.NINTENDO_API_KEY;
      if (!apiKey || apiKey === 'your_nintendo_api_key') {
        // Fallback to mock data since Nintendo doesn't have a simple public games API
        return this.mockGames;
      }

      // Placeholder for actual Nintendo Developer Portal API call if/when available
      // const response = await axios.get('https://api.nintendo.com/v1/games', {
      //   headers: { 'X-API-KEY': apiKey },
      //   timeout: 5000
      // });
      // return response.data.map((g: any) => this.mapToGame(g));

      return this.mockGames;
    } catch (error) {
      console.error('Error fetching Nintendo games:', error instanceof Error ? error.message : error);
      return this.mockGames;
    }
  }

  private static mapToGame(data: any): Game {
    return {
      id: data.id || Math.random().toString(36).substr(2, 9),
      title: data.name || 'Unknown',
      thumbnail: data.image_url || 'https://example.com/default-game.jpg',
      description: data.summary || '',
      genre: data.genres?.[0] || 'Unknown',
      developer: 'Nintendo'
    };
  }
}
