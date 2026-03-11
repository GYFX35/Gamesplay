import { Game } from '../../../shared';

export class TencentService {
  private static mockGames: Game[] = [
    {
      id: 't1',
      title: 'Honor of Kings',
      thumbnail: 'https://example.com/honor-of-kings.jpg',
      description: 'The worlds most played mobile MOBA.',
      genre: 'MOBA',
      developer: 'TiMi Studio Group'
    },
    {
      id: 't2',
      title: 'PUBG Mobile',
      thumbnail: 'https://example.com/pubg-mobile.jpg',
      description: 'The original battle royale, now on mobile.',
      genre: 'Battle Royale',
      developer: 'Lightspeed & Quantum Studios'
    }
  ];

  static async getGames(): Promise<Game[]> {
    // In a real implementation, this would call Tencent Cloud / Gaming APIs
    return this.mockGames;
  }
}
