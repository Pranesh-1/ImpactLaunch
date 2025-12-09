import express from 'express';
import Groq from 'groq-sdk';
import OpenAI from 'openai';

const router = express.Router();

// Mock generation for demo if no API key
const mockGeneration = (idea) => ({
    headlines: [
        `Unlock the Future of ${idea}: Sustainable, Scalable, Smart.`,
        `The First AI-Driven Platform for ${idea} That Actually Works.`,
        `Redefining ${idea} for a Cleaner, Greener Tomorrow.`
    ],
    blogTitles: [
        `Why the World Needs ${idea} Right Now (And How We're Building It)`,
        `The Hidden Cost of Ignoring ${idea}: A Deep Dive`,
        `From Concept to Impact: The Journey of Scaling ${idea}`
    ],
    socialCaptions: [
        `🚀 We're changing the game. Say hello to the future of #${idea.replace(/\s+/g, '')}. Join the waitlist today!`,
        `💡 Did you know? ${idea} is the key to sustainable growth. See how we're making it happen. 👇`,
        `✨ Impact starts with a single idea. Ours is ${idea}. What's yours? #meaningfulgrowth`
    ],
    cta: `Start Your ${idea} Journey Now`,
    strategy: [
        "Launch on Product Hunt with a 'Building in Public' angle.",
        "Partner with 5 key micro-influencers in the niche.",
        "Create a viral 'Impact Calculator' lead magnet."
    ],
    differentiators: [
        "AI-Powered Automation",
        "Sustainability First Approach",
        "Community-Driven Growth Model"
    ],
    keywords: ["Growth", "Sustainability", "Innovation"],
    design: {
        primaryColor: "#059669",
        accentColor: "#10B981",
        explanation: "Green gradients to symbolize growth and sustainability."
    },
    seo: {
        title: `${idea} | Sustainable Growth Platform`,
        description: `Join the revolution with ${idea}. Scalable, smart, and sustainable solutions for a better tomorrow. Join the waitlist.`
    },
    analytics: {
        events: ["click_waitlist", "download_guide", "view_demo"],
        goal: "User Sign Up > Activation"
    }
});

router.post('/generate', async (req, res) => {
    const { idea, mission, audience, tone, vibe } = req.body;

    console.log('Generate Request received for:', idea);

    if (!idea) {
        return res.status(400).json({ error: 'Startup idea is required' });
    }

    const promptSystem = `You are a world-class growth strategist and brand designer. 
  Target Audience: ${audience || 'General Market'}
  Tone: ${tone || 'Professional'}
  Brand Vibe: ${vibe || 'Modern & Trusted'}
  
  Analyze the startup idea and return a JSON object with this EXACT schema:
  {
    "headlines": ["string", "string", "string"],
    "blogTitles": ["string", "string", "string"],
    "socialCaptions": ["string", "string", "string"],
    "cta": "string",
    "strategy": ["string (bullet point)", "string", "string"],
    "differentiators": ["string", "string", "string"],
    "keywords": ["string", "string", "string"],
    "design": {
        "primaryColor": "hex code (e.g. #10B981)",
        "accentColor": "hex code (e.g. #3B82F6)",
        "explanation": "short reason for color choice"
    },
    "seo": {
        "title": "SEO Optimized Title (max 60 chars)",
        "description": "SEO Meta Description (max 160 chars)"
    },
    "analytics": {
        "events": ["event_name_1 (e.g. download_plan)", "event_name_2"],
        "goal": "Primary conversion goal description"
    }
  }`;

    const promptUser = `Startup Idea: "${idea}"
  Mission: "${mission}"
  
  Generate the Launch Kit JSON.`;

    // 1. Try Groq (Fastest + Free Tier)
    if (process.env.GROQ_API_KEY) {
        console.log('Using Groq (Llama 3)...');
        try {
            const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
            const completion = await groq.chat.completions.create({
                messages: [
                    { role: "system", content: promptSystem },
                    { role: "user", content: promptUser }
                ],
                model: "llama-3.3-70b-versatile",
                response_format: { type: "json_object" },
            });

            const result = JSON.parse(completion.choices[0].message.content);
            return res.json(result);
        } catch (error) {
            console.error('Groq Error:', error.message);
        }
    }

    // 2. Try OpenAI
    if (process.env.OPENAI_API_KEY) {
        console.log('Using OpenAI...');
        try {
            const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
            const completion = await openai.chat.completions.create({
                model: "gpt-3.5-turbo",
                messages: [
                    { role: "system", content: promptSystem },
                    { role: "user", content: promptUser }
                ]
            });
            const result = JSON.parse(completion.choices[0].message.content);
            return res.json(result);
        } catch (error) {
            console.error('OpenAI Error:', error.message);
        }
    }

    console.log('Falling back to Mock Response.');
    res.json(mockGeneration(idea));
});

export default router;
