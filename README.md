#  ImpactLaunch

**The AI-Powered Launchpad for Purpose-Driven Startups.**

ImpactLaunch is a full-stack platform designed to help entrepreneurs go from "Rough Idea" to "Strategic Launch Plan" in seconds. It uses advanced AI (Llama 3 via Groq) to generate go-to-market strategies, SEO tags, and viral social content, all wrapped in a stunning, dynamically themed UI.

##  Key Features

*   ** AI Growth Strategist**: Generates specific Go-To-Market strategies, Differentiators, and Keywords.
*   ** Dynamic AI Theming**: Enter a "Brand Vibe" (e.g., *Cyberpunk*, *Eco-Friendly*) and the UI adapts its colors instantly.
*   ** Growth Stack**: Auto-generates Google-optimized **SEO Titles/Descriptions** and **GA4 Analytics Event** plans.
*   ** Real-Time Automation**: Submits the full launch plan to your custom **Webhook** (Zapier, Slack, Make).
*   ** Modern UI**: Glassmorphism design, official SVG social icons, and Framer Motion animations.
*   ** Production Ready**: Built with robust error handling, mock fallbacks, and environment variable configuration.

##  Tech Stack

*   **Frontend**: React (Vite), TailwindCSS, Framer Motion, Lucide React, html2canvas.
*   **Backend**: Node.js, Express, Groq SDK (Llama 3), Axios.
*   **AI**: Llama 3.3-70b (via Groq Cloud) for lightning-fast, high-quality responses.

##  Getting Started

### Prerequisites
*   Node.js (v18+)
*   npm or yarn
*   A Groq API Key (Free)

### 1. Clone & Install
```bash
git clone https://github.com/yourusername/impactlaunch.git
cd impactlaunch
```

### 2. Setup Backend
```bash
cd server
npm install
```
Create a `.env` file in the `server` folder:
```env
PORT=3000
GROQ_API_KEY=your_groq_api_key_here
# Optional
AUTOMATION_WEBHOOK_URL=your_zapier_webhook_url
OPENAI_API_KEY=your_openai_key_(optional_fallback)
```
Start the server:
```bash
npm run dev
```

### 3. Setup Frontend
Open a new terminal:
```bash
cd client
npm install
npm run dev
```

Visit `http://localhost:5173` to launch the app!

##  Deployment

### Backend (Render/Railway)
1.  Deploy the `server` folder.
2.  Set `GROQ_API_KEY` in environment variables.

### Frontend (Vercel/Netlify)
1.  Deploy the `client` folder.
2.  Set `VITE_API_URL` environment variable to your deployed backend URL (e.g., `https://my-api.onrender.com/api`).

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---
Built with ❤️ for the **People, Planet, Profit** mission.

