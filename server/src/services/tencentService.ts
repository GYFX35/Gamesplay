import { Game } from '../../../shared';

export class TencentService {
  private static mockGames: Game[] = [
    {
      id: 't1',
      title: 'Honor of Kings',
      thumbnail: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80',
      description: 'The worlds most played mobile MOBA.',
      genre: 'MOBA',
      developer: 'TiMi Studio Group',
      playUrl: 'https://www.honorofkings.com/'
    },
    {
      id: 't2',
      title: 'PUBG Mobile',
      thumbnail: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80',
      description: 'The original battle royale, now on mobile.',
      genre: 'Battle Royale',
      developer: 'Lightspeed & Quantum Studios',
      playUrl: 'https://www.pubgmobile.com/'
    }
  ];

  static async getGames(): Promise<Game[]> {
    // In a real implementation, this would call Tencent Cloud / Gaming APIs
    return this.mockGames;
  }
}
