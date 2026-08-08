# AI Cohort Interview — Backend

Wraps the RAG + agent interview logic in an Express server, exposing
the two routes `interview-frontend` expects.

## Setup

```bash
npm install
cp .env.example .env   # add your GEMINI_API_KEY
npm start
```

Runs on `http://localhost:3000` by default.

## How it connects to the frontend

1. Start this backend first (`npm start` in this folder, port 3000).
2. In the frontend folder, set `VITE_API_URL=http://localhost:3000` in its `.env`.
3. Start the frontend (`npm run dev`, port 5173).
4. Open `http://localhost:5173` — Home page's "Start interview" button now
   calls this backend's `/interview/start`, and each "Submit answer" calls
   `/interview/answer`.

`CORS_ORIGIN` in this backend's `.env` must match the frontend's URL
(defaults to `http://localhost:5173`, which is Vite's default port).

## Routes

| Route | Body | Returns |
|---|---|---|
| `POST /interview/start` | `{ candidateId }` | `{ sessionId, candidateName, totalQuestions, question }` |
| `POST /interview/answer` | `{ sessionId, answer }` | `{ done: false, question }` or `{ done: true, feedback }` |

## Files

```
src/
├── server.js            Express routes — the HTTP layer only
├── interviewEngine.js   RAG setup + agent conversation logic (the "brain")
└── sessionStore.js      In-memory map of sessionId -> conversation state
candidates.json           Sample candidate + completed missions
curriculum.json           Sample curriculum days (used to build the RAG index)
```

## Notes

- Sessions live in memory (`sessionStore.js`) — they reset if the server
  restarts. For real use, swap that file for Redis or a database.
- The model is instructed to always reply with raw JSON (question or
  feedback shape) so the frontend can render it directly — no more parsing
  plain English out of the model's reply.
- Replace `candidates.json` / `curriculum.json` with your real data — just
  keep the same field names (`member.id`, `missions[].day/title/passed`,
  `days[].day/title/tools/objectives`).
