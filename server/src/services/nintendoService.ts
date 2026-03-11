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
    // In a real implementation, this would call Nintendo Developer Portal APIs
    return this.mockGames;
  }
}
