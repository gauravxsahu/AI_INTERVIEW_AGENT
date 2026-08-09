import { randomUUID } from "crypto";
import InterviewSession from "./models/Interviewsession.js";

export function createSessionId() {
  return randomUUID();
}

// session object (from interviewEngine.js) has a `vectorStore` field —
// that's a runtime-only object (embeddings client, functions) and can't
// be stored in MongoDB. Strip it out before saving.
function stripVectorStore(session) {
  const { vectorStore, ...rest } = session;
  return rest;
}

export async function saveSession(sessionId, session) {
  const data = stripVectorStore(session);

  await InterviewSession.findOneAndUpdate(
    { sessionId },
    {
      sessionId,
      candidateName: data.candidateName,
      systemPrompt: data.systemPrompt,
      conversation: data.conversation,
      questionNumber: data.questionNumber,
    },
   { upsert: true, returnDocument: "after" }
  );
}

export async function getSession(sessionId) {
  const doc = await InterviewSession.findOne({ sessionId }).lean();

  if (!doc) {
    throw new Error(
      `No interview session found for sessionId "${sessionId}". It may have expired or the server restarted.`
    );
  }

  // vectorStore yaha nahi hai — caller (server.js) ko ye re-attach karna
  // hoga using initVectorStore() before passing to submitAnswer().
  return {
    candidateName: doc.candidateName,
    systemPrompt: doc.systemPrompt,
    conversation: doc.conversation,
    questionNumber: doc.questionNumber,
  };
}

export async function deleteSession(sessionId) {
  await InterviewSession.deleteOne({ sessionId });
}