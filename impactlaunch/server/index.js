import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { OpenAI } from 'openai';

import aiRoutes from './routes/ai.js';
import automationRoutes from './routes/automation.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('ImpactLaunch API is Running');
});

app.use('/api', aiRoutes);
app.use('/api', automationRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
