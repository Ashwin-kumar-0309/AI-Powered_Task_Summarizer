# Smart Task Summarizer + Tagger

An AI-powered utility that transforms messy, unstructured task descriptions into organized, prioritized action items using GPT-4.

![Smart Task Summarizer](https://img.shields.io/badge/AI-Powered-blue) ![Next.js](https://img.shields.io/badge/Next.js-15-black) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue) ![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-cyan)

## ✨ Features

### 🤖 AI Processing
- **GPT-4o-mini Integration**: Uses OpenAI's GPT-4o-mini for fast, cost-effective processing
- **Smart Summarization**: Converts messy descriptions into clear, concise summaries
- **Auto-Tagging**: Automatically assigns relevant tags (#urgent, #frontend, #client, etc.)
- **Priority Scoring**: Assigns priority levels 1-5 based on task urgency and importance

### 🎯 User Interface
- **Dynamic Input**: Add/remove tasks with an intuitive interface
- **Sample Tasks**: Pre-loaded realistic examples to test the application
- **Real-time Processing**: Live feedback during AI processing
- **Responsive Design**: Works on desktop and mobile devices

### 📊 Export & Integration
- **CSV Export**: Download organized tasks for spreadsheet applications
- **JSON Export**: Export data for integration with other tools
- **Copy-Friendly Format**: Easy to copy results to project management tools

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- OpenAI API key ([Get one here](https://platform.openai.com/api-keys))

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Configure environment**
   ```bash
   cp .env.example .env.local
   ```
   Edit `.env.local` and add your OpenAI API key:
   ```
   OPENAI_API_KEY=your_actual_api_key_here
   ```

3. **Run the application**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 💡 How It Works

### 1. Input Tasks
Add messy, unstructured task descriptions from:
- Meeting notes
- Client calls  
- Email threads
- Brainstorming sessions
- Any unorganized task list

### 2. AI Processing
The application sends your tasks to GPT-4, which:
- Analyzes context and intent
- Creates clear, actionable summaries
- Assigns relevant tags from a predefined set
- Calculates priority scores based on urgency indicators

### 3. Export Results
Download your organized tasks as:
- **CSV**: For Excel, Google Sheets, or other spreadsheet tools
- **JSON**: For custom integrations or developer tools

## 🛠️ Technology Stack

### Frontend
- **Next.js 15**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first styling
- **Lucide React**: Beautiful icons

### Backend
- **Next.js API Routes**: Serverless API endpoints
- **OpenAI SDK**: GPT-4 integration
- **TypeScript**: End-to-end type safety

## 🎯 AI Prompt Engineering

The application uses carefully crafted prompts to ensure consistent, high-quality results:

### Example Processing
**Input:**
```
Need to fix the login page it keeps crashing when users try to sign in with Google OAuth and Sarah from marketing is getting frustrated because she can't access the dashboard to update the campaign metrics before the client meeting tomorrow at 3pm
```

**Output:**
- **Summary**: Fix Google OAuth login crashes preventing dashboard access for client meeting prep
- **Tags**: #urgent, #bug-fix, #frontend  
- **Priority**: 4 (High)

## 📁 Project Structure

```
spearmint/
├── src/
│   ├── app/
│   │   ├── api/process-tasks/route.ts    # API endpoint for AI processing
│   │   ├── layout.tsx                    # Root layout
│   │   └── page.tsx                      # Main application page
│   ├── components/
│   │   ├── LoadingState.tsx              # Loading animation
│   │   ├── SampleTasksLoader.tsx         # Sample data loader
│   │   ├── TaskInput.tsx                 # Task input interface
│   │   └── TaskResults.tsx               # Results display
│   ├── lib/
│   │   ├── openai.ts                     # OpenAI service
│   │   ├── sample-data.ts                # Hardcoded sample tasks
│   │   └── utils.ts                      # Utility functions
│   └── types/
│       └── index.ts                      # TypeScript interfaces
├── .env.example                          # Environment variables template
└── README.md                             # This file
```

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm run build
# Deploy to Vercel with environment variables configured
```

**Important**: Don't forget to configure your `OPENAI_API_KEY` environment variable in your deployment platform.

## 💰 API Costs

OpenAI GPT-4o-mini usage costs approximately:
- **10 tasks**: ~$0.001-0.005 per processing (60x cheaper than GPT-4!)
- **Monthly usage** (100 tasks): ~$0.01-0.05

## 🔮 Future Enhancements

### Potential Improvements
- **Integration Connectors**: Direct exports to Notion, Trello, Asana
- **Custom Tag Training**: Learn from user preferences
- **Batch Processing**: Handle larger task volumes
- **Team Collaboration**: Multi-user support

### Low-Code/No-Code Integration Ideas
- **Zapier Integration**: Trigger processing from Google Sheets updates
- **n8n Workflows**: Automate task processing pipelines
- **Discord Bots**: Process tasks shared in team channels
- **Slack Apps**: In-channel task organization

---

**Built with ❤️ for the AI Engineer Intern Task**

Transform your messy tasks into organized action items today!
