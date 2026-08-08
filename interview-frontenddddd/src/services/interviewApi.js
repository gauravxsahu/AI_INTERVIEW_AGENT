// =============================================================
// interviewApi.js
// All network calls to the backend live here — nowhere else.
// If the backend URL or shape changes, this is the only file to touch.
// =============================================================

// Set VITE_API_URL in a .env file to point at your backend.
// Falls back to localhost for local dev.
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

async function postJSON(path, body) {
  const res = await fetch(`${BASE_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Request to ${path} failed (${res.status}): ${text}`);
  }

  return res.json();
}

// ---------------------------------------------------------------
// POST /interview/start
// body:  { candidateId }
// resp:  {
//   sessionId: string,
//   candidateName: string,
//   totalQuestions: number,        // e.g. 8
//   question: {
//     number: number,              // 1
//     text: string,
//     day: number | null,          // curriculum day this question touches
//     title: string | null         // curriculum topic title
//   }
// }
// ---------------------------------------------------------------
export async function startInterview(candidateId) {
  return postJSON("/interview/start", { candidateId });
}

// ---------------------------------------------------------------
// POST /interview/answer
// body:  { sessionId, answer }
// resp (while interview continues):
// {
//   done: false,
//   question: { number, text, day, title }
// }
//
// resp (after the final question):
// {
//   done: true,
//   feedback: {
//     score: number,               // out of 10
//     strengths: string[],
//     weaknesses: string[],
//     technicalGaps: string[],
//     communicationQuality: string,
//     recommendedTopics: string[]
//   }
// }
// ---------------------------------------------------------------
export async function submitAnswer(sessionId, answer) {
  return postJSON("/interview/answer", { sessionId, answer });
}
