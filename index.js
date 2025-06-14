import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import surveyRoutes from './backend/routes/survey.routes.js';
import adminRoutes from './backend/routes/admin.routes.js';
import { verifyToken } from './backend/middleware/auth.js';
import { getAllSurveys } from './backend/controllers/survey.controllers.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

app.use('/api/survey', surveyRoutes);
app.use('/api/admin', adminRoutes);
app.get('/api/secure/survey', verifyToken, getAllSurveys);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));