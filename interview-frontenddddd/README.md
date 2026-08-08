# AI Cohort Interview — Frontend

Three screens: **Home → Interview → Feedback**. No extra pages, no chat bubbles,
no dashboard — just the question/answer loop your brief asked for.

## Setup

```bash
npm install
cp .env.example .env   # point VITE_API_URL at your backend
npm run dev
```

Opens at `http://localhost:5173`.

## Folder structure

```
src/
├── components/
│   ├── InterviewHeader.jsx   logo + candidate name
│   ├── QuestionCard.jsx      current question
│   ├── AnswerBox.jsx         textarea + submit
│   ├── ProgressBar.jsx       "Question X of 8"
│   └── TopicProgress.jsx     curriculum days covered so far (signature element)
├── pages/
│   ├── Home.jsx               start screen
│   ├── Interview.jsx          Q&A loop
│   └── Feedback.jsx           final structured feedback
├── services/
│   └── interviewApi.js        all fetch() calls, one place
├── InterviewContext.jsx       shared state across pages
└── App.jsx                    routes
```

## Backend contract this frontend expects

### `POST /interview/start`
Request: `{ "candidateId": "CAND-001" }`

Response:
```json
{
  "sessionId": "abc123",
  "candidateName": "Priya Sharma",
  "totalQuestions": 8,
  "question": { "number": 1, "text": "...", "day": 3, "title": "RAG basics" }
}
```

### `POST /interview/answer`
Request: `{ "sessionId": "abc123", "answer": "..." }`

Response while the interview continues:
```json
{ "done": false, "question": { "number": 2, "text": "...", "day": 5, "title": "Agents & MCP" } }
```

Response on the final question:
```json
{
  "done": true,
  "feedback": {
    "score": 7,
    "strengths": ["..."],
    "weaknesses": ["..."],
    "technicalGaps": ["..."],
    "communicationQuality": "...",
    "recommendedTopics": ["RAG evaluation", "Deployment pipelines"]
  }
}
```

This maps directly onto the `interview_agent.js` backend logic from earlier —
that script would need to be wrapped in an Express (or similar) server exposing
these two routes, with `sessionId` tracking each candidate's `conversation` array
in memory (or a DB) instead of a single global variable. Happy to build that
server next if useful.

## Tailwind version

Uses **Tailwind v4**. No `tailwind.config.js` or `postcss.config.js` — v4
plugs straight into Vite (`@tailwindcss/vite` in `vite.config.js`), and all
theme tokens (colors, radius, animations) live in `src/index.css` inside an
`@theme { ... }` block instead of a JS config file.

## Design tokens

| Token | Light | Dark |
|---|---|---|
| Background | `#F7F8FA` | `#0F1115` |
| Card | `#FFFFFF` | `#171A21` |
| Primary | `#6366F1` (indigo) | same |
| Accent | `#8B5CF6` (violet) | same |
| Font | Inter | Inter |

Dark mode follows the OS setting automatically (`prefers-color-scheme`) — no toggle needed.
