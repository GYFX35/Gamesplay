import { Game } from '../../../shared';

export class MicrosoftService {
  private static mockGames: Game[] = [
    {
      id: 'm1',
      title: 'Halo Infinite',
      thumbnail: 'https://example.com/halo.jpg',
      description: 'The Master Chief returns in an epic open-world adventure.',
      genre: 'First-Person Shooter',
      developer: '343 Industries', category: 'Video Games'
    },
    {
      id: 'm2',
      title: 'Forza Horizon 5',
      thumbnail: 'https://example.com/forza.jpg',
      description: 'Your ultimate Horizon adventure awaits in Mexico.',
      genre: 'Racing',
      developer: 'Playground Games', category: 'Video Games'
    }
  ];

  static async getGames(): Promise<Game[]> {
    // In a real implementation, this would call Xbox Live / Microsoft Graph APIs
    return this.mockGames;
  }
}
