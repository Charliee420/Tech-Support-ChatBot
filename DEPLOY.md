# Deployment Guide

This guide explains how to deploy the Tech Support Chatbot in production. The project is structured as a Node.js Express backend and a React/Vite frontend.

---

## 📋 Table of Contents
1. [Required Environment Variables](#1-required-environment-variables)
2. [Deployment Option A: Monorepo Deployment (Recommended)](#2-deployment-option-a-monorepo-deployment-recommended)
   - [Railway](#railway)
   - [Render](#render)
3. [Deployment Option B: Separated Frontend & Backend](#3-deployment-option-b-separated-frontend--backend)
4. [Deployment Option C: Docker Containerization](#4-deployment-option-c-docker-containerization)

---

## 1. Required Environment Variables

Regardless of how or where you deploy, the backend server requires the following configuration:

| Variable Name | Type | Description |
|---|---|---|
| `LLM_API_KEY` | **Required** | Your OpenAI or Google Gemini API Key. |
| `LLM_BASE_URL` | *Optional* | Base URL for OpenAI-compatible APIs. Set to `https://generativelanguage.googleapis.com/v1beta/openai/` for Google Gemini. |
| `LLM_MODEL` | *Optional* | Target LLM model name. Defaults to `gpt-4o-mini` for OpenAI, or `gemini-2.0-flash` for Gemini. |
| `SYSTEM_PROMPT` | *Optional* | Overrides the default system prompt of the tech support chatbot. |
| `PORT` | *Optional* | The port the backend server listens on. Defaults to `3001` in code but is often auto-assigned by hosting providers (e.g. Render/Railway). |
| `NODE_ENV` | *Optional* | Set to `production` to activate production configuration. |

---

## 2. Deployment Option A: Monorepo Deployment (Recommended)

In this approach, the Express server serves both the API endpoints and the compiled static frontend files (`frontend/dist`) from a single service instance.

### Railway

Railway is the fastest option for deploying fullstack Node applications:

1. Sign up or log into [Railway.app](https://railway.app).
2. Click **New Project** -> **Deploy from GitHub repo** and select your repository.
3. Railway will auto-detect the root project.
4. Go to the **Variables** tab of the service and add your `LLM_API_KEY` (and `LLM_BASE_URL` or `LLM_MODEL` if you're using Gemini).
5. Add `NODE_ENV=production` as a variable.
6. Under **Settings** -> **Build & Deploy**:
   - Set **Build Command**: `npm run install:all && npm run build`
   - Set **Start Command**: `npm run prod`
7. Click Deploy. Railway will build the frontend, launch the server, and provide an HTTPS domain.

### Render

To deploy as a single service on Render:

1. Sign up or log into [Render.com](https://render.com).
2. Click **New** -> **Web Service**.
3. Connect your GitHub repository.
4. Set the following configuration:
   - **Environment**: `Node`
   - **Region**: Choose the closest region to your users.
   - **Branch**: `main` (or your default branch)
   - **Build Command**: `npm run install:all && npm run build`
   - **Start Command**: `npm run prod`
5. Click **Advanced** and add your environment variables:
   - `LLM_API_KEY` = `your-key-here`
   - `NODE_ENV` = `production`
   - (Optional) `LLM_BASE_URL` / `LLM_MODEL`
6. Click **Create Web Service**.

---

## 3. Deployment Option B: Separated Frontend & Backend

You can separate the frontend and backend to optimize performance and hosting costs (e.g., hosting the frontend for free on Vercel/Netlify, and the backend on Render/Railway).

### Step 1: Deploy the Backend
Deploy the `backend` folder to a service like Render, Railway, or Fly.io.
- **Root Directory**: `backend` (or set `Build Command` to `npm install` and `Start Command` to `node index.js`).
- Configure env variables (`LLM_API_KEY`, etc.).
- Obtain the deployed backend API URL (e.g., `https://your-chatbot-backend.onrender.com`).

### Step 2: Configure and Deploy the Frontend
1. Open `frontend/vite.config.js`. Remove or adjust the development proxy settings if needed, or configure the frontend to target the backend URL.
2. In `frontend/src/App.jsx`, update the `fetch("/api/chat", ...)` path to point to your deployed backend url:
   ```javascript
   // Change from relative to absolute URL:
   const res = await fetch("https://your-chatbot-backend.onrender.com/api/chat", { ... })
   ```
3. Deploy the `frontend` folder to Vercel, Netlify, or GitHub Pages.
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

---

## 4. Deployment Option C: Docker Containerization

If you use AWS, GCP, Azure, or self-host on a VPS, you can containerize the application using Docker.

A basic container setup involves building the frontend, copying the built asset folder into the backend workspace, and exposing the Express server.

### Creating the Dockerfile

You can place this `Dockerfile` at the root of the project:

```dockerfile
# Build Stage for Frontend
FROM node:20-alpine AS frontend-builder
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ ./
RUN npm run build

# Production Stage
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
COPY backend/package*.json ./backend/
RUN npm install --omit=dev
RUN npm --prefix backend install --omit=dev

COPY backend/ ./backend
COPY --from=frontend-builder /app/frontend/dist ./frontend/dist

ENV NODE_ENV=production
ENV PORT=3001
EXPOSE 3001

CMD ["node", "backend/index.js"]
```

### Running the Docker Container

1. Build the image:
   ```bash
   docker build -t tech-support-chatbot .
   ```
2. Run the container:
   ```bash
   docker run -d \
     -p 3001:3001 \
     -e LLM_API_KEY="your-api-key-here" \
     -e LLM_MODEL="gemini-2.0-flash" \
     -e LLM_BASE_URL="https://generativelanguage.googleapis.com/v1beta/openai/" \
     --name support-bot \
     tech-support-chatbot
   ```
