import "dotenv/config";
import express from "express";
import cors from "cors";
import { startInterview, submitAnswer } from "./interviewEngine.js";
import { createSessionId, saveSession, getSession, deleteSession } from "./sessionStore.js";

const app = express();
app.use(cors({ origin: process.env.CORS_ORIGIN || "http://localhost:5173" }));
app.use(express.json());

// -----------------------------------------------------------
// POST /interview/start
// body: { candidateId }
// -----------------------------------------------------------
app.post("/interview/start", async (req, res) => {
  try {
    const { candidateId } = req.body;
    if (!candidateId) {
      return res.status(400).json({ error: "candidateId is required" });
    }

    const result = await startInterview(candidateId);
    const sessionId = createSessionId();
    saveSession(sessionId, result.session);

    res.json({
      sessionId,
      candidateName: result.candidateName,
      totalQuestions: result.totalQuestions,
      question: result.question,
    });
  } catch (err) {
    console.error("Error in /interview/start:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// -----------------------------------------------------------
// POST /interview/answer
// body: { sessionId, answer }
// -----------------------------------------------------------
app.post("/interview/answer", async (req, res) => {
  try {
    const { sessionId, answer } = req.body;
    if (!sessionId || !answer) {
      return res.status(400).json({ error: "sessionId and answer are required" });
    }

    const session = getSession(sessionId);
    const result = await submitAnswer(session, answer);

    if (result.done) {
      deleteSession(sessionId); // interview is over, free the memory
    }

    res.json(result);
  } catch (err) {
    console.error("Error in /interview/answer:", err.message);
    res.status(500).json({ error: err.message });
  }
});

app.get("/health", (req, res) => res.json({ ok: true }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Interview backend running on http://localhost:${PORT}`);
});
