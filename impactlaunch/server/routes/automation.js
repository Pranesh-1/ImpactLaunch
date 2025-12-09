import express from 'express';
import axios from 'axios';

const router = express.Router();

router.post('/submit', async (req, res) => {
    const { name, email, idea, mission, aiResult } = req.body;

    if (!name || !email) {
        return res.status(400).json({ error: 'Name and Email are required' });
    }

    const payload = {
        timestamp: new Date().toISOString(),
        name,
        email,
        idea,
        mission,
        source: 'ImpactLaunch Platform',
        strategy: aiResult // Full AI Growth Plan
    };

    console.log('Received Submission:', payload);

    // Webhook integration (Automation)
    const webhookUrl = process.env.AUTOMATION_WEBHOOK_URL;
    if (webhookUrl) {
        try {
            await axios.post(webhookUrl, payload);
            console.log('Sent to automation webhook');
        } catch (error) {
            console.error('Webhook failed:', error.message);
        }
    } else {
        console.log('No automation webhook configured. Skipping.');
    }

    res.json({ success: true, message: 'Startup submitted successfully!' });
});

export default router;
