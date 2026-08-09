import mongoose from "mongoose";

// Ek conversation message: { role: "user" | "assistant" | "system", content: "..." }
const messageSchema = new mongoose.Schema(
  {
    role: { type: String, required: true },
    content: { type: String, required: true },
  },
  { _id: false }
);

const interviewSessionSchema = new mongoose.Schema(
  {
    sessionId: { type: String, required: true, unique: true, index: true },
    candidateName: { type: String, required: true },
    systemPrompt: { type: String, required: true },
    conversation: { type: [messageSchema], default: [] },
    questionNumber: { type: Number, default: 1 },
  },
  { timestamps: true }
);

// Note: `vectorStore` is intentionally NOT part of this schema.
// It's a shared, in-memory, non-serializable object (embeddings, functions)
// built once at server startup via initVectorStore() in interviewEngine.js.
// It gets re-attached to the session object at runtime, never persisted.

export default mongoose.model("InterviewSession", interviewSessionSchema);