import { randomUUID } from "crypto";

// In-memory store: { sessionId -> session object from interviewEngine.js }
// Good enough for a demo/hackathon. For production, swap this for Redis
// or a database keyed by sessionId, since this resets on server restart.
const sessions = new Map();

export function createSessionId() {
  return randomUUID();
}

export function saveSession(sessionId, session) {
  sessions.set(sessionId, session);
}

export function getSession(sessionId) {
  const session = sessions.get(sessionId);
  if (!session) {
    throw new Error(`No interview session found for sessionId "${sessionId}". It may have expired or the server restarted.`);
  }
  return session;
}

export function deleteSession(sessionId) {
  sessions.delete(sessionId);
}
