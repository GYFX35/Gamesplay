import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import helmet, { contentSecurityPolicy } from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import { TencentService } from './services/tencentService';
import { NintendoService } from './services/nintendoService';
import { MicrosoftService } from './services/microsoftService';
import { EpicGamesService } from './services/epicGamesService';
import { TwitchService } from './services/twitchService';
import { Product, Order, SportsNews, SportsStream, Subscription, Donation, StreamerAnalytics, ResearchData, GameProject, VideoTrack, Coupon, Prediction, CasinoGame, Bet } from '../../shared';

dotenv.config();

const app = express();

// Centralized CSP origins
const ALLOWED_IMG_ORIGINS = ["'self'", "data:", "https://images.unsplash.com"];
const ALLOWED_FRAME_ORIGINS = ["'self'", "https://www.google.com"];

app.use(helmet());
app.use(contentSecurityPolicy({
  directives: {
    ...contentSecurityPolicy.getDefaultDirectives(),
    "img-src": ALLOWED_IMG_ORIGINS,
    "frame-src": ALLOWED_FRAME_ORIGINS, // Allow iframes for game previews
  },
}));

app.use(cors());
app.use(express.json());

const betLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 bets per window
  message: 'Too many bets from this IP, please try again after 15 minutes'
});

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// Mock Data
const games = [
  { id: '1', title: '3D Sandbox World', genre: 'Adventure', developer: 'Gamesplay Studios' },
  { id: '2', title: 'Cyber Racer', genre: 'Racing', developer: 'Neon Games' },
  { id: '3', title: 'Space Explorer', genre: 'Simulation', developer: 'Galactic Arts' },
];

const streams = [
  { id: '1', userId: 'u1', gameId: '1', title: 'Exploring the new 3D world!', viewerCount: 1250, startedAt: new Date().toISOString() },
  { id: '2', userId: 'u2', gameId: '2', title: 'Ranked racing to Top 10', viewerCount: 850, startedAt: new Date().toISOString() },
];

const projects: GameProject[] = [
  {
    id: 'p1',
    userId: 'u1',
    name: 'My First MMA Game',
    description: 'A basic MMA fighting game.',
    lastModified: new Date().toISOString(),
    assets: ['fighter.glb', 'arena.glb'],
    config: {
      physicsEngine: 'cannon',
      renderer: 'webgl',
      aiEnabled: true,
      multiplayerEnabled: false
    }
  },
];

const researchData: Record<string, ResearchData> = {
  'p1': {
    projectId: 'p1',
    metrics: [
      { label: 'Combat Fluidity', value: 8.5, unit: '/10', trend: 'up' },
      { label: 'AI Response Time', value: 120, unit: 'ms', trend: 'down' },
      { label: 'Physics Stability', value: 92, unit: '%', trend: 'neutral' }
    ],
    aiTrainingProgress: 75,
    activeExperiments: 3,
    playerRetention: [100, 85, 70, 65, 60, 58, 55]
  }
};

const musicTracks = [
  { id: 'm1', title: 'Cybernetic Pulse', artist: 'Neon Voyager', album: 'Synth Horizons', duration: '3:45', thumbnail: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=300&h=300&fit=crop', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
  { id: 'm2', title: 'Digital Dreams', artist: 'Ether Echo', album: 'Virtual Reality', duration: '4:12', thumbnail: 'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?w=300&h=300&fit=crop', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3' },
  { id: 'm3', title: 'Pixel Journey', artist: 'Bit Crusher', album: '8-Bit Adventures', duration: '2:58', thumbnail: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=300&h=300&fit=crop', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3' },
];

const videoTracks: VideoTrack[] = [
  { id: 'v1', title: 'Epic MMA Highlights 2024', creator: 'GrappleMaster', duration: '5:20', thumbnail: 'https://images.unsplash.com/photo-1595078475328-1ab05d0a6a0e?w=640&h=360&fit=crop', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', views: 12500 },
  { id: 'v2', title: 'Cyber Racer: Neon Drift Tutorial', creator: 'NeonVoyager', duration: '8:45', thumbnail: 'https://images.unsplash.com/photo-1547394765-185e1e68f34e?w=640&h=360&fit=crop', videoUrl: 'https://www.w3schools.com/html/movie.mp4', views: 8500 },
  { id: 'v3', title: '3D Sandbox World: Build Your First Arena', creator: 'Gamesplay Dev', duration: '12:15', thumbnail: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=640&h=360&fit=crop', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', views: 4200 },
];

const products: Product[] = [
  { id: 'prod1', name: 'Gamesplay Pro Controller', description: 'High-performance controller for professional gaming.', price: 59.99, category: 'Hardware', thumbnail: 'https://images.unsplash.com/photo-1600080972464-8e5f35802d3e?w=300&h=300&fit=crop', stock: 50 },
  { id: 'prod2', name: 'Ultra-HD Gaming Headset', description: 'Immersive sound quality with noise cancellation.', price: 89.99, category: 'Hardware', thumbnail: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop', stock: 30 },
  { id: 'prod3', name: 'Gamesplay T-Shirt', description: '100% cotton limited edition Gamesplay merch.', price: 24.99, category: 'Merchandise', thumbnail: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=300&h=300&fit=crop', stock: 100 },
];

const orders: Order[] = [];
const subscriptions: Subscription[] = [];
const donations: Donation[] = [];

const sportsNews: SportsNews[] = [
  { id: 'sn1', title: 'Global MMA Championship 2024: The Road to the Title', summary: 'Everything you need to know about the upcoming MMA championship.', content: 'The MMA world is buzzing with excitement as the Global Championship approaches. This year, we expect to see unprecedented talent and thrilling matches.', thumbnail: 'https://images.unsplash.com/photo-1595078475328-1ab05d0a6a0e?w=800&h=450&fit=crop', category: 'MMA', publishedAt: new Date().toISOString() },
  { id: 'sn2', title: 'Top 5 Rising Stars in Esports Racing', summary: 'Meet the newcomers who are taking the racing world by storm.', content: 'Esports racing has seen a massive surge in popularity, and these five drivers are leading the charge into the future of competitive gaming.', thumbnail: 'https://images.unsplash.com/photo-1547394765-185e1e68f34e?w=800&h=450&fit=crop', category: 'Esports', publishedAt: new Date().toISOString() },
  { id: 'sn3', title: 'Cyber Basketball League: Season Highlights', summary: 'A look back at the most incredible moments from the latest CBL season.', content: 'The Cyber Basketball League has just wrapped up its most successful season yet. Here are the dunks, steals, and game-winners that defined the year.', thumbnail: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&h=450&fit=crop', category: 'Basketball', publishedAt: new Date().toISOString() },
];

const sportsStreams: SportsStream[] = [
  { id: 'ss1', title: 'Main Event: Heavyweight Showdown', league: 'Gamesplay MMA', homeTeam: 'Striker King', awayTeam: 'Grapple Master', viewerCount: 50000, thumbnail: 'https://images.unsplash.com/photo-1509114397022-ed747cca3f65?w=400&h=225&fit=crop', isLive: true },
  { id: 'ss2', title: 'Regional Qualifiers: European Division', league: 'Cyber Football League', homeTeam: 'London Sparks', awayTeam: 'Paris Titans', viewerCount: 15000, thumbnail: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400&h=225&fit=crop', isLive: true },
  { id: 'ss3', title: 'Ultimate Tennis Masters: Quarterfinals', league: 'Pro Tennis Virtual', homeTeam: 'Ace Venturer', awayTeam: 'Racket Rocket', viewerCount: 8000, thumbnail: 'https://images.unsplash.com/photo-1595435064212-c481782144f4?w=400&h=225&fit=crop', isLive: false },
];

const coupons: Coupon[] = [
  { id: 'c1', code: 'GP50', description: '50% off on all games', discountValue: 50, discountType: 'percentage', expiryDate: '2025-12-31' },
  { id: 'c2', code: 'MMA25', description: '$25 off on MMA gear', discountValue: 25, discountType: 'fixed', minPurchase: 100, expiryDate: '2025-06-30' },
  { id: 'c3', code: 'WELCOME', description: 'Special welcome discount', discountValue: 10, discountType: 'percentage', expiryDate: '2026-01-01' },
];

const predictions: Prediction[] = [
  { id: 'p1', matchTitle: 'Striker King vs Grapple Master', league: 'Gamesplay MMA', prediction: 'Striker King to win by KO', odds: 1.85, confidence: 85, status: 'pending', startTime: new Date().toISOString() },
  { id: 'p2', matchTitle: 'London Sparks vs Paris Titans', league: 'Cyber Football League', prediction: 'Over 2.5 goals', odds: 2.10, confidence: 72, status: 'pending', startTime: new Date().toISOString() },
  { id: 'p3', matchTitle: 'Ace Venturer vs Racket Rocket', league: 'Pro Tennis Virtual', prediction: 'Ace Venturer to win 2-0', odds: 1.65, confidence: 90, status: 'pending', startTime: new Date().toISOString() },
];

const casinoGames: CasinoGame[] = [
  { id: 'cg1', title: 'Royal Slots 777', thumbnail: 'https://images.unsplash.com/photo-1596838132731-160162739563?w=400&h=300&fit=crop', category: 'Slots', gameUrl: 'https://www.google.com/search?q=slots+game+preview' },
  { id: 'cg2', title: 'Cyber Poker Masters', thumbnail: 'https://images.unsplash.com/photo-1511193311914-0346f16fea90?w=400&h=300&fit=crop', category: 'Poker', gameUrl: 'https://www.google.com/search?q=poker+game+preview' },
  { id: 'cg3', title: 'Neon Blackjack', thumbnail: 'https://images.unsplash.com/photo-1518893063132-36e46dbe2498?w=400&h=300&fit=crop', category: 'Table Games', gameUrl: 'https://www.google.com/search?q=blackjack+game+preview' },
  { id: 'cg4', title: 'Crypto Dice Roll', thumbnail: 'https://images.unsplash.com/photo-1511193311914-0346f16fea90?w=400&h=300&fit=crop', category: 'Dice', gameUrl: 'https://www.google.com/search?q=dice+game+preview' },
];

const bets: Bet[] = [];

// API Endpoints
app.get('/api/games', async (req, res) => {
  try {
    const results = await Promise.allSettled([
      TencentService.getGames(),
      NintendoService.getGames(),
      MicrosoftService.getGames(),
      EpicGamesService.getGames(),
      TwitchService.getGames()
    ]);

    const externalGames = results
      .filter((result): result is PromiseFulfilledResult<any[]> => result.status === 'fulfilled')
      .flatMap(result => result.value);

    res.json([...games, ...externalGames]);
  } catch (error) {
    console.error('Error fetching games:', error);
    res.json(games); // Fallback to local mock games
  }
});

app.get('/api/external/tencent', async (req, res) => {
  const games = await TencentService.getGames();
  res.json(games);
});

app.get('/api/external/nintendo', async (req, res) => {
  const games = await NintendoService.getGames();
  res.json(games);
});

app.get('/api/external/microsoft', async (req, res) => {
  const games = await MicrosoftService.getGames();
  res.json(games);
});

app.get('/api/external/epic', async (req, res) => {
  const games = await EpicGamesService.getGames();
  res.json(games);
});

app.get('/api/external/twitch', async (req, res) => {
  const games = await TwitchService.getGames();
  res.json(games);
});

app.get('/api/streams', (req, res) => {
  res.json(streams);
});

app.get('/api/streams/:id', (req, res) => {
  const stream = streams.find(s => s.id === req.params.id);
  if (stream) {
    res.json(stream);
  } else {
    res.status(404).json({ message: 'Stream not found' });
  }
});

app.get('/api/projects', (req, res) => {
  res.json(projects);
});

app.get('/api/projects/:id/research', (req, res) => {
  const data = researchData[req.params.id];
  if (data) {
    res.json(data);
  } else {
    res.status(404).json({ message: 'Research data not found' });
  }
});

app.get('/api/music', (req, res) => {
  res.json(musicTracks);
});

app.get('/api/videos', (req, res) => {
  res.json(videoTracks);
});

app.get('/api/products', (req, res) => {
  res.json(products);
});

app.get('/api/sports/news', (req, res) => {
  res.json(sportsNews);
});

app.get('/api/sports/streams', (req, res) => {
  res.json(sportsStreams);
});

app.get('/api/coupons', (req, res) => {
  res.json(coupons);
});

app.get('/api/predictions', (req, res) => {
  res.json(predictions);
});

app.get('/api/casino/games', (req, res) => {
  res.json(casinoGames);
});

app.post('/api/casino/bet', betLimiter, (req, res) => {
  const { gameId, amount } = req.body;
  // In a real app, userId should be retrieved from auth/session
  // const userId = req.user.id;
  const userId = req.body.userId || 'u1';

  if (typeof amount !== 'number' || isNaN(amount) || amount <= 0) {
    return res.status(400).json({ message: 'Bet amount must be a positive number' });
  }

  const MAX_BET = 10000;
  if (amount > MAX_BET) {
    return res.status(400).json({ message: `Bet amount exceeds maximum limit of $${MAX_BET}` });
  }

  const game = casinoGames.find(g => g.id === gameId);
  if (!game) {
    return res.status(404).json({ message: 'Game not found' });
  }

  // Simple random outcome logic
  const win = Math.random() > 0.6;
  const multiplier = win ? (1.5 + Math.random() * 2) : 0;

  const newBet: Bet = {
    id: `bet${bets.length + 1}`,
    userId,
    gameId,
    amount,
    outcome: win ? 'win' : 'loss',
    multiplier,
    timestamp: new Date().toISOString()
  };

  bets.push(newBet);
  res.status(201).json(newBet);
});

app.post('/api/orders', (req, res) => {
  const { userId, productId, quantity } = req.body;

  if (!quantity || quantity <= 0) {
    return res.status(400).json({ message: 'Quantity must be a positive number' });
  }

  const product = products.find(p => p.id === productId);
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }

  if (product.stock < quantity) {
    return res.status(400).json({ message: 'Insufficient stock' });
  }

  const newOrder: Order = {
    id: `ord${orders.length + 1}`,
    userId,
    productId,
    quantity,
    totalPrice: product.price * quantity,
    status: 'pending',
    createdAt: new Date().toISOString()
  };

  product.stock -= quantity;
  orders.push(newOrder);
  res.status(201).json(newOrder);
});

app.post('/api/projects', (req, res) => {
  const newProject = {
    id: `p${projects.length + 1}`,
    lastModified: new Date().toISOString(),
    ...req.body
  };
  projects.push(newProject);
  res.status(201).json(newProject);
});

app.post('/api/ai/assist', (req, res) => {
  const { prompt } = req.body;
  // Simulated AI Logic
  res.json({
    suggestion: `I've analyzed your request: "${prompt}". Based on MMA game mechanics, I suggest adding a stamina system to balance the combat.`,
    actions: ['Add Stamina Bar', 'Optimize Animations', 'Generate Sound Effects']
  });
});

app.post('/api/monetization/subscribe', (req, res) => {
  const { userId, streamerId, tier } = req.body;
  const newSub: Subscription = {
    id: `sub${subscriptions.length + 1}`,
    userId,
    streamerId,
    tier,
    status: 'active',
    expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
  };
  subscriptions.push(newSub);
  res.status(201).json(newSub);
});

app.post('/api/monetization/donate', (req, res) => {
  const { userId, streamerId, amount, message } = req.body;
  const newDonation: Donation = {
    id: `don${donations.length + 1}`,
    userId,
    streamerId,
    amount,
    message,
    timestamp: new Date().toISOString()
  };
  donations.push(newDonation);

  // Emit donation to the stream
  io.to(`stream:${streamerId}`).emit('new-donation', newDonation);

  res.status(201).json(newDonation);
});

app.get('/api/monetization/analytics/:streamerId', (req, res) => {
  const { streamerId } = req.params;
  const streamerDonations = donations.filter(d => d.streamerId === streamerId);
  const streamerSubs = subscriptions.filter(s => s.streamerId === streamerId);

  const totalRevenue = streamerDonations.reduce((sum, d) => sum + d.amount, 0) +
                       streamerSubs.reduce((sum, s) => sum + (s.tier * 4.99), 0);

  const analytics: StreamerAnalytics = {
    totalRevenue,
    subscriberCount: streamerSubs.length,
    recentDonations: streamerDonations.slice(-5).reverse(),
    revenueByMonth: [
      { month: 'Jan', amount: totalRevenue * 0.1 },
      { month: 'Feb', amount: totalRevenue * 0.15 },
      { month: 'Mar', amount: totalRevenue * 0.25 },
      { month: 'Apr', amount: totalRevenue * 0.5 }
    ]
  };
  res.json(analytics);
});

// Socket.io for Real-time features
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('join-stream', (streamId) => {
    socket.join(`stream:${streamId}`);
    console.log(`User ${socket.id} joined stream ${streamId}`);
  });

  socket.on('send-message', (data) => {
    const { streamId, message, username } = data;
    io.to(`stream:${streamId}`).emit('new-message', {
      id: Math.random().toString(36).substr(2, 9),
      userId: socket.id,
      username,
      message,
      timestamp: new Date().toISOString()
    });
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

const PORT = Number(process.env.PORT) || 3001;
const HOST = process.env.HOST || '0.0.0.0';

httpServer.listen(PORT, HOST, () => {
  console.log(`Server running on http://${HOST}:${PORT}`);
});
