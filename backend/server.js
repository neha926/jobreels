import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import authRoutes from './routes/authRoutes.js';
import jobRoutes from './routes/jobRoutes.js';
import reelRoutes from './routes/reelRoutes.js';
import applicationRoutes from './routes/applicationRoutes.js';
import fraudRoutes from './routes/fraudRoutes.js';
import userProfileRoutes from './routes/userProfileRoutes.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// API Endpoints
app.use('/api/auth', authRoutes);
app.use('/api/users', userProfileRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/reels', reelRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/fraud', fraudRoutes);

app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    platform: 'Swaraj Real Estate & Job Reels Platform',
    version: '3.0.0 (Production Multi-User)',
    mode: '100% Free • Direct Buyer/Seller • Zero Brokerage',
    database: 'Neon PostgreSQL Connected',
    videoStorage: 'Cloudinary Ready',
    notifications: 'Brevo SMTP Active',
    supportedLanguages: ['en', 'hi', 'mr']
  });
});

app.listen(PORT, () => {
  console.log(`KaamReels Production Backend running at http://localhost:${PORT}`);
});
