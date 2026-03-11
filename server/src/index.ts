import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import dotenv from 'dotenv';
import { TencentService } from './services/tencentService';
import { NintendoService } from './services/nintendoService';
import { MicrosoftService } from './services/microsoftService';

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

// API Endpoints
app.get('/api/games', async (req, res) => {
  const tencentGames = await TencentService.getGames();
  const nintendoGames = await NintendoService.getGames();
  const microsoftGames = await MicrosoftService.getGames();

  res.json([...games, ...tencentGames, ...nintendoGames, ...microsoftGames]);
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
