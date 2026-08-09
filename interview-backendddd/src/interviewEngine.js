import fs from "fs";
// import { ChatGoogleGenerativeAI, GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { ChatOpenAI,OpenAIEmbeddings} from "@langchain/openai";
import { MemoryVectorStore } from "@langchain/classic/vectorstores/memory";;
import { Document } from "@langchain/core/documents";
import { tool } from "@langchain/core/tools";
import { createAgent } from "langchain";
import { z } from "zod";
import dotenv from "dotenv";
dotenv.config();

const TOTAL_QUESTIONS = 2;

// =============================================================
// 1. LOAD DATA (once, at startup)
// =============================================================
const candidates = JSON.parse(fs.readFileSync("./candidates.json", "utf-8"));
const curriculum = JSON.parse(fs.readFileSync("./curriculum.json", "utf-8"));

// =============================================================
// 2. BUILD THE RAG INDEX (once, at startup — shared by every session)
// =============================================================
const documents = curriculum.days.map((day) => {
  return new Document({
    pageContent: `
Day: ${day.day}
Title: ${day.title}

Tools:
${day.tools?.join(", ") ?? "N/A"}

Objectives:
${day.objectives?.join(", ") ?? "N/A"}
`,
    metadata: { day: day.day, title: day.title },
  });
});

// const embeddings = new GoogleGenerativeAIEmbeddings({
//   model: "gemini-embedding-001",
//   apiKey: process.env.GEMINI_API_KEY,
// });
const embeddings = new OpenAIEmbeddings({
  model: "text-embedding-3-small",
  apiKey: process.env.OPENAI_API_KEY,
});

// This is created once when the server starts (see server.js), not per-request.
let vectorStorePromise = null;
export function initVectorStore() {
  if (!vectorStorePromise) {
    vectorStorePromise = MemoryVectorStore.fromDocuments(documents, embeddings);
  }
  return vectorStorePromise;
}

// =============================================================
// 3. TOOL: lets the agent search the curriculum
// =============================================================
function buildSearchTool(vectorStore) {
  return tool(
    async ({ query }) => {
      const results = await vectorStore.similaritySearch(query, 4);
      return results.map((doc) => ({
        day: doc.metadata.day,
        title: doc.metadata.title,
        content: doc.pageContent,
      }));
    },
    {
      name: "search_curriculum",
      description: "Search the AI Cohort curriculum for relevant topics, objectives and tools.",
      schema: z.object({ query: z.string() }),
    }
  );
}

// const model = new ChatGoogleGenerativeAI({
//   model: "gemini-2.5-flash",
//   apiKey: process.env.GEMINI_API_KEY,
//   temperature: 0,
// });

const model = new ChatOpenAI({
  model: "gpt-5.4-mini",
  apiKey: process.env.OPENAI_API_KEY,
  temperature: 0,
});

// =============================================================
// 4. HELPER: safely pull plain text out of the agent's reply
// =============================================================
function extractText(content) {
  if (typeof content === "string") return content;
  if (Array.isArray(content)) {
    return content
      .filter((block) => block.type === "text")
      .map((block) => block.text)
      .join("\n");
  }
  return String(content ?? "");
}

// =============================================================
// 5. HELPER: parse the JSON the model was told to return
// =============================================================
// The model sometimes wraps JSON in ```json fences even when told not to.
// This strips that safely before parsing.
function parseJsonResponse(text) {
  const cleaned = text.replace(/```json/gi, "").replace(/```/g, "").trim();
  try {
    return JSON.parse(cleaned);
  } catch (err) {
    throw new Error(`Model did not return valid JSON. Raw response: ${cleaned.slice(0, 300)}`);
  }
}

// =============================================================
// 6. FIND A CANDIDATE AND THEIR COMPLETED TOPICS
// =============================================================
function getCandidate(candidateId) {
  const candidate = candidates.candidates.find((c) => c.member.id === candidateId);
  if (!candidate) throw new Error(`Candidate ${candidateId} not found`);

  const completedTopics = candidate.missions
    .filter((m) => m.passed === true)
    .map((m) => ({ day: m.day, title: m.title }));

  if (completedTopics.length === 0) {
    throw new Error(`Candidate ${candidateId} has no completed topics to interview on`);
  }

  return { candidate, completedTopics };
}

// =============================================================
// 7. BUILD THE SYSTEM PROMPT FOR A SESSION
// =============================================================
function buildSystemPrompt(candidate, completedTopics) {
  return `
You are a professional technical interviewer.

You are interviewing:
Name: ${candidate.member.name}
Role: ${candidate.member.jobRole}
Experience: ${candidate.member.yearsExperience} years

Completed curriculum topics (day and title):
${completedTopics.map((x) => `Day ${x.day}: ${x.title}`).join("\n")}

Important rules:
1. Conduct a realistic technical interview.
2. Ask ONE question at a time.
3. Use the search_curriculum tool to retrieve relevant curriculum information before asking.
4. Every question must be based on one of the completed topics listed above.
5. Cover at least 4 different curriculum days across the whole interview.
6. Ask exactly ${TOTAL_QUESTIONS} questions in total.
7. Follow-up questions must depend on the candidate's previous answer.
8. Do not ask the same question twice.
9. Difficulty should adapt to the candidate's answers.
10. Do not reveal the correct answer during the interview.

OUTPUT FORMAT — critical:
Respond with ONLY a raw JSON object, no markdown fences, no extra text.

When asking a question, respond with exactly:
{"type":"question","number":<question number>,"text":"<the question>","day":<day number from the completed topics list>,"title":"<matching title from the completed topics list>"}

When asked for final feedback (after all ${TOTAL_QUESTIONS} questions), respond with exactly:
{"type":"feedback","score":<integer 0-10>,"strengths":["..."],"weaknesses":["..."],"technicalGaps":["..."],"communicationQuality":"<one sentence>","recommendedTopics":["..."]}
`;
}

// =============================================================
// 8. SEND A MESSAGE TO THE AGENT AND GET A PARSED JSON REPLY
// =============================================================
async function askAgent(session, userMessage) {
  session.conversation.push({ role: "user", content: userMessage });

  const agent = createAgent({
    model,
    tools: [buildSearchTool(session.vectorStore)],
  });

  const response = await agent.invoke({
    messages: [{ role: "system", content: session.systemPrompt }, ...session.conversation],
  });

  const rawContent = response.messages.at(-1).content;
  const answerText = extractText(rawContent);

  session.conversation.push({ role: "assistant", content: answerText });

  return parseJsonResponse(answerText);
}

// =============================================================
// 9. PUBLIC API: start a new interview
// =============================================================
export async function startInterview(candidateId) {
  const { candidate, completedTopics } = getCandidate(candidateId);
  const vectorStore = await initVectorStore();

  const session = {
    candidateName: candidate.member.name,
    systemPrompt: buildSystemPrompt(candidate, completedTopics),
    conversation: [],
    vectorStore,
    questionNumber: 1,
  };

  const question = await askAgent(session, "Start the interview. Ask question 1.");

  return {
    session,
    candidateName: session.candidateName,
    totalQuestions: TOTAL_QUESTIONS,
    question: {
      number: question.number ?? 1,
      text: question.text,
      day: question.day ?? null,
      title: question.title ?? null,
    },
  };
}

// =============================================================
// 10. PUBLIC API: submit an answer, get the next question or feedback
// =============================================================
export async function submitAnswer(session, answerText) {
  if (session.questionNumber >= TOTAL_QUESTIONS) {
    const feedback = await askAgent(
      session,
      `The candidate's answer to question ${session.questionNumber} was: "${answerText}"

The candidate has now completed ${TOTAL_QUESTIONS} interview questions.
Provide the final feedback JSON now.`
    );

    return {
      done: true,
      feedback: {
        score: feedback.score,
        strengths: feedback.strengths ?? [],
        weaknesses: feedback.weaknesses ?? [],
        technicalGaps: feedback.technicalGaps ?? [],
        communicationQuality: feedback.communicationQuality ?? "",
        recommendedTopics: feedback.recommendedTopics ?? [],
      },
    };
  }

  session.questionNumber++;

  const question = await askAgent(
    session,
    `The candidate's answer to the previous question was: "${answerText}"

Analyze the answer internally. Use the search_curriculum tool if useful.
Now ask question ${session.questionNumber} as the JSON question object.
Make it a relevant follow-up, or move to another completed curriculum topic.
Remember: at least 4 different curriculum days must be covered overall, and do not repeat previous questions.`
  );

  return {
    done: false,
    question: {
      number: question.number ?? session.questionNumber,
      text: question.text,
      day: question.day ?? null,
      title: question.title ?? null,
    },
  };
}
