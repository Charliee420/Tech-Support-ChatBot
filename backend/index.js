import "dotenv/config";
import express from "express";
import cors from "cors";
import OpenAI from "openai";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
const corsOptions = {
  origin:
    process.env.NODE_ENV === "production"
      ? false
      : ["http://localhost:5173", "http://127.0.0.1:5173"],
};
app.use(cors(corsOptions));
app.use(express.json({ limit: "2mb" }));

const apiKey = process.env.LLM_API_KEY;
const baseURL = process.env.LLM_BASE_URL;

if (!apiKey) {
  console.error("Missing LLM_API_KEY in environment. Create backend/.env from .env.example");
  process.exit(1);
}

const openai = new OpenAI({
  apiKey,
  baseURL: baseURL || undefined,
});

const SYSTEM_PROMPT =
  process.env.SYSTEM_PROMPT ||
  "You are an expert tech support assistant specializing in software solutions and critical problem-solving. Provide clear, actionable answers. Use code examples where relevant.";

app.post("/api/chat", async (req, res) => {
  try {
    const { messages } = req.body;
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "messages array required" });
    }

    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    // 🛡️ Sentinel: Input validation to prevent DoS via excessive input
    if (messages.length > 100) {
      return res.status(400).json({ error: "Too many messages" });
    }

    const apiMessages = [
      { role: "system", content: SYSTEM_PROMPT },
      ...messages.map((m) => {
        let safeContent = typeof m.content === "string" ? m.content : String(m.content || "");
        if (safeContent.length > 4000) {
          safeContent = safeContent.slice(0, 4000);
        }
        return {
          role: m.role === "assistant" ? "assistant" : "user",
          content: safeContent,
        };
      }),
    ];

    const stream = await openai.chat.completions.create({
      model: process.env.LLM_MODEL || "gpt-4o-mini",
      messages: apiMessages,
      stream: true,
    });

    for await (const chunk of stream) {
      const text = chunk.choices?.[0]?.delta?.content || "";
      if (text) {
        res.write(`data: ${JSON.stringify({ content: text })}\n\n`);
      }
    }

    res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
    res.end();
  } catch (err) {
    // 🛡️ Sentinel: Fail securely - don't expose error details to client
    console.error("Chat error:", err);
    if (!res.headersSent) {
      res.status(500).json({ error: "Internal server error" });
    } else {
      res.write(`data: ${JSON.stringify({ error: "An error occurred during chat generation" })}\n\n`);
      res.end();
    }
  }
});

const frontendDist = path.join(__dirname, "..", "frontend", "dist");
if (process.env.NODE_ENV === "production" || fs.existsSync(frontendDist)) {
  app.use(express.static(frontendDist));
  app.get("*", (_req, res) => {
    res.sendFile(path.join(frontendDist, "index.html"));
  });
}

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Chatbot backend running on http://localhost:${PORT}`);
});
