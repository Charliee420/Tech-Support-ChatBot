# 💬 Tech Support Chatbot

An AI-powered tech support assistant featuring a real-time streaming interface, syntax-highlighted code blocks, and markdown support. The project is built using a modern full-stack JavaScript architecture with a Node.js/Express backend and a React/Vite/Tailwind v4 frontend.

---

## 🚀 Key Features

* **⚡ Real-time Response Streaming**: Answers stream in word-by-word using Server-Sent Events (SSE) with robust carriage return handling.
* **📝 Markdown & GFM Rendering**: Beautiful rendering of markdown tables, blockquotes, lists, and formatted code text.
* **📋 Copy Code Button**: One-click copy-to-clipboard for syntax-highlighted pre/code blocks.
* **📱 Responsive Viewport Stability**: Responsive chat layout using CSS Grid and `min-h-[100dvh]` avoiding mobile viewport address bar shifts.
* **🎨 Modern Dark Mode Design**: High-contrast, accessibility-aware cyan and zinc styling built with **Tailwind CSS v4**.
* **⚙️ Multi-Provider Support**: Compatible with OpenAI (GPT models) and Google Gemini (via OpenAI compatibility layer).

---

## 🛠️ Technology Stack

* **Frontend**: React 19, Vite 6, Tailwind CSS v4, `react-markdown`, `remark-gfm`
* **Backend**: Node.js, Express, OpenAI SDK, CORS, `dotenv`

---

## 📁 Project Structure

```text
├── backend/                  # Express API Server
│   ├── index.js              # Entrypoint & Routing
│   ├── package.json          # Server dependencies & scripts
│   └── .env.example          # Environment variables template
├── frontend/                 # React & Vite App
│   ├── dist/                 # Compiled static assets (created on build)
│   ├── src/                  # React Source Code
│   │   ├── components/       # ChatInput, ChatMessage, MarkdownRenderer
│   │   ├── App.jsx           # Main App UI & state manager
│   │   ├── main.jsx          # DOM Initializer
│   │   └── index.css         # Tailwind directives & CSS variable tokens
│   ├── package.json          # Frontend scripts & devDependencies
│   └── vite.config.js        # Vite config with dev API proxy
├── package.json              # Monorepo task script orchestrator
└── DEPLOY.md                 # Production deployment guide
```

---

## ⚙️ Local Development Quick Start

### Prerequisites
* **Node.js**: v18.x or higher
* **npm**: v9.x or higher

### 1. Install All Dependencies
Install backend, frontend, and root-level orchestrator modules simultaneously by running this command in the project root:
```bash
npm run install:all
```

### 2. Configure Environment Variables
Navigate to the `backend` folder, copy `.env.example` into a new `.env` file, and supply your API key:
```bash
cp backend/.env.example backend/.env
```
Open `backend/.env` and update:
* `LLM_API_KEY`: Your Gemini or OpenAI API Key.
* `LLM_BASE_URL`: Base URL (default is OpenAI). For Google Gemini, use `https://generativelanguage.googleapis.com/v1beta/openai/`.
* `LLM_MODEL`: The LLM engine to use (e.g. `gpt-4o-mini` or `gemini-2.0-flash`).

### 3. Run in Development Mode
You can run the frontend and backend servers together:
```bash
# In the root folder
npm run dev:backend  # Starts Express API on http://localhost:3001
npm run dev:frontend # Starts React UI on http://localhost:5173 with proxy
```
*Open `http://localhost:5173/` in your browser to chat.*

---

## 📦 Production Execution

To build the client bundle and start the server locally in production mode:
```bash
npm run prod
```
* **Builds**: The frontend React app compiles static assets into `frontend/dist/`.
* **Serves**: The Node server launches on `http://localhost:3001` and serves the static files.

*(This script is powered by `cross-env` to ensure it works seamlessly across Windows, Linux, and macOS.)*

---

## 🌐 Production Deployment

For detailed hosting guides on popular cloud hosting platforms (such as **Railway**, **Render**, or **Docker** container deployments), refer to the comprehensive [Deployment Guide (DEPLOY.md)](./DEPLOY.md).
