import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useInterview } from "../InterviewContext";

export default function Home() {
  const [candidateId, setCandidateId] = useState("CAND-001");
  const { begin, loading, error } = useInterview();
  const navigate = useNavigate();

  async function handleStart(e) {
    e.preventDefault();
    const ok = await begin(candidateId.trim());
    if (ok) navigate("/interview");
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <div className="w-full max-w-md animate-fadeUp text-center">
        <div className="mx-auto mb-6 h-12 w-12 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 animate-pulseRing" />

        <h1 className="text-2xl font-bold tracking-tight text-ink-light dark:text-ink-dark">
          Technical Interview
        </h1>
        <p className="mt-2 text-sm text-muted-light dark:text-muted-dark">
          8 questions, based on the curriculum you've already completed.
        </p>

        <form onSubmit={handleStart} className="mt-8 text-left">
          <label
            htmlFor="candidateId"
            className="mb-1.5 block text-xs font-medium text-muted-light dark:text-muted-dark"
          >
            Candidate ID
          </label>
          <input
            id="candidateId"
            value={candidateId}
            onChange={(e) => setCandidateId(e.target.value)}
            className="w-full rounded-xl border border-border-light bg-card-light px-4 py-2.5 text-sm text-ink-light focus:border-primary-500 dark:border-border-dark dark:bg-card-dark dark:text-ink-dark"
            placeholder="CAND-001"
          />

          <button
            type="submit"
            disabled={loading || !candidateId.trim()}
            className="mt-4 w-full rounded-xl bg-blue-600 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Starting…" : "Start interview"}
          </button>

          {error && <p className="mt-3 text-sm text-red-500">{error}</p>}
        </form>
      </div>
    </div>
  );
}
