import { Game } from '../../../shared';

export class MicrosoftService {
  private static mockGames: Game[] = [
    {
      id: 'm1',
      title: 'Halo Infinite',
      thumbnail: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80',
      description: 'The Master Chief returns in an epic open-world adventure.',
      genre: 'First-Person Shooter',
      developer: '343 Industries',
      playUrl: 'https://www.xbox.com/en-US/games/halo-infinite'
    },
    {
      id: 'm2',
      title: 'Forza Horizon 5',
      thumbnail: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80',
      description: 'Your ultimate Horizon adventure awaits in Mexico.',
      genre: 'Racing',
      developer: 'Playground Games',
      playUrl: 'https://www.xbox.com/en-US/games/forza-horizon-5'
    }
  ];

  static async getGames(): Promise<Game[]> {
    // In a real implementation, this would call Xbox Live / Microsoft Graph APIs
    return this.mockGames;
  }
}
