import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import dotenv from 'dotenv';
import { TencentService } from './services/tencentService';
import { NintendoService } from './services/nintendoService';
import { MicrosoftService } from './services/microsoftService';
import { EpicGamesService } from './services/epicGamesService';
import { TwitchService } from './services/twitchService';
import { Product, Order } from '../../shared';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

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

const projects = [
  { id: 'p1', userId: 'u1', name: 'My First MMA Game', description: 'A basic MMA fighting game.', lastModified: new Date().toISOString(), assets: ['fighter.glb', 'arena.glb'] },
];

const musicTracks = [
  { id: 'm1', title: 'Cybernetic Pulse', artist: 'Neon Voyager', album: 'Synth Horizons', duration: '3:45', thumbnail: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=300&h=300&fit=crop', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
  { id: 'm2', title: 'Digital Dreams', artist: 'Ether Echo', album: 'Virtual Reality', duration: '4:12', thumbnail: 'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?w=300&h=300&fit=crop', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3' },
  { id: 'm3', title: 'Pixel Journey', artist: 'Bit Crusher', album: '8-Bit Adventures', duration: '2:58', thumbnail: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=300&h=300&fit=crop', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3' },
];

const products: Product[] = [
  { id: 'prod1', name: 'Gamesplay Pro Controller', description: 'High-performance controller for professional gaming.', price: 59.99, category: 'Hardware', thumbnail: 'https://images.unsplash.com/photo-1600080972464-8e5f35802d3e?w=300&h=300&fit=crop', stock: 50 },
  { id: 'prod2', name: 'Ultra-HD Gaming Headset', description: 'Immersive sound quality with noise cancellation.', price: 89.99, category: 'Hardware', thumbnail: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop', stock: 30 },
  { id: 'prod3', name: 'Gamesplay T-Shirt', description: '100% cotton limited edition Gamesplay merch.', price: 24.99, category: 'Merchandise', thumbnail: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=300&h=300&fit=crop', stock: 100 },
];

const orders: Order[] = [];

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

app.get('/api/music', (req, res) => {
  res.json(musicTracks);
});

app.get('/api/products', (req, res) => {
  res.json(products);
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
