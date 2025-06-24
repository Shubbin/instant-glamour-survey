import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import surveyRoutes from './backend/routes/survey.routes.js';
import adminRoutes from './backend/routes/admin.routes.js';
import { verifyToken } from './backend/middleware/auth.js';
import { getAllSurveys } from './backend/controllers/survey.controllers.js';

dotenv.config();
const app = express();

// Allow only your Vercel frontend and local dev
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:5500',
    'https://instanceglamour-lgo9lkk27-olas-projects-43189afa.vercel.app',
    'https://instanceglamour.vercel.app',
  ],
  credentials: true
}));

app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// API routes
app.use('/api/survey', surveyRoutes);
app.use('/api/admin', adminRoutes);
app.get('/api/secure/survey', verifyToken, getAllSurveys);

// Keep-alive endpoint for Render
app.get('/robot', (req, res) => {
  res.status(200).send('🤖 Beep boop! I am awake.');
});

// Self-ping every 15 minutes (900,000 ms)
if (process.env.RENDER_EXTERNAL_URL) {
  setInterval(() => {
    fetch(`${process.env.RENDER_EXTERNAL_URL}/robot`)
      .then(res => console.log('Robot pinged:', res.status))
      .catch(err => console.log('Robot ping failed:', err.message));
  }, 900000);
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));