import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useInterview } from "../InterviewContext";

import InterviewHeader from "../components/InterviewHeader";
import ProgressBar from "../components/ProgressBar";
import TopicProgress from "../components/TopicProgress";
import QuestionCard from "../components/QuestionCard";
import AnswerBox from "../components/AnswerBox";

export default function Interview() {
  const {
    candidateName,
    question,
    totalQuestions,
    topicsCovered,
    feedback,
    loading,
    error,
    answer,
    sessionId,
  } = useInterview();

  const navigate = useNavigate();

  // Guard
  useEffect(() => {
    if (!sessionId) {
      navigate("/", { replace: true });
    }
  }, [sessionId, navigate]);

  // Go to feedback when interview completes
  useEffect(() => {
    if (feedback) {
      navigate("/feedback");
    }
  }, [feedback, navigate]);

  async function handleSubmit(text) {
    await answer(text);
  }

  return (
    <div className="h-screen overflow-hidden bg-slate-50 text-slate-900">
      {/* Background decoration */}
      <div className="pointer-events-none fixed left-0 top-0 z-0 h-72 w-72 rounded-full bg-violet-200/20 blur-3xl" />

      <div className="pointer-events-none fixed bottom-0 right-0 z-0 h-72 w-72 rounded-full bg-indigo-200/20 blur-3xl" />

      {/* Header */}
      <div className="relative z-20">
        <InterviewHeader candidateName={candidateName} />
      </div>

      {/* Main */}
      <main className="relative z-10 mx-auto flex h-[calc(100vh-81px)] max-w-6xl flex-col px-5 py-3 md:px-8">
        {/* Title */}
        <div className="mb-3 flex shrink-0 items-center">
          <div>
            <div className="mb-1 inline-flex items-center gap-2 rounded-full border border-violet-200 bg-white px-2.5 py-1 text-[10px] font-semibold text-violet-600 shadow-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
              Interview in progress
            </div>

            <h1 className="text-2xl font-extrabold tracking-tight">
              Technical Interview
            </h1>

            <p className="text-xs text-slate-500">
              Think clearly and explain your approach.
            </p>
          </div>
        </div>

        {/* Progress + Topics */}
        {question && (
          <div className="mb-3 grid shrink-0 gap-3 md:grid-cols-2">
            {/* Progress */}
            <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
              <div className="mb-2 flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-violet-600">
                    Interview Progress
                  </p>

                  <p className="text-xs text-slate-500">
                    Keep going!
                  </p>
                </div>

                <div className="rounded-lg bg-violet-50 px-2.5 py-1 text-xs font-bold text-violet-700">
                  {question.number} / {totalQuestions}
                </div>
              </div>

              <ProgressBar
                current={question.number}
                total={totalQuestions}
              />
            </div>

            {/* Topics */}
            {topicsCovered && (
              <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
                <div className="mb-2 flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-violet-100 text-sm">
                    📚
                  </div>

                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-violet-600">
                      Topics Covered
                    </p>

                    <p className="text-xs text-slate-500">
                      Interview coverage
                    </p>
                  </div>
                </div>

                <TopicProgress topics={topicsCovered} />
              </div>
            )}
          </div>
        )}

        {/* Question + Answer */}
        {question && (
          <div className="grid min-h-0 flex-1 gap-4 md:grid-cols-2">
            {/* QUESTION */}
            <div className="flex min-h-0 flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg">
              {/* Header */}
              <div className="shrink-0 border-b border-slate-100 bg-linear-to-r from-violet-50 to-indigo-50 px-5 py-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-600 text-white shadow-sm">
                    🤖
                  </div>

                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-violet-600">
                      AI Interviewer
                    </p>

                    <p className="text-xs font-semibold text-slate-700">
                      Question {question.number}
                    </p>
                  </div>
                </div>
              </div>

              {/* Question Content */}
              <div className="min-h-0 flex-1 overflow-auto p-6">
                <QuestionCard question={question} />
              </div>
            </div>

            {/* ANSWER */}
            <div className="flex min-h-0 flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg">
              {/* Header */}
              <div className="shrink-0 border-b border-slate-100 bg-linear-to-r from-indigo-50 to-violet-50 px-5 py-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-100 text-sm">
                    💬
                  </div>

                  <div>
                    <h2 className="text-sm font-bold text-slate-900">
                      Your Answer
                    </h2>

                    <p className="text-[11px] text-slate-500">
                      Explain your thinking clearly.
                    </p>
                  </div>
                </div>
              </div>

              {/* Answer Content */}
              <div className="min-h-0 flex-1 p-5">
                <div className="flex h-full flex-col">
                  <AnswerBox
                    onSubmit={handleSubmit}
                    loading={loading}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Loading */}
        {loading && !question && (
          <div className="flex flex-1 items-center justify-center">
            <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-xl">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-violet-100 text-xl">
                🤖
              </div>

              <h2 className="mt-4 text-lg font-bold">
                Preparing your interview...
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Your next question is being prepared.
              </p>

              <div className="mx-auto mt-5 h-1.5 max-w-xs overflow-hidden rounded-full bg-slate-100">
                <div className="h-full w-1/2 animate-pulse rounded-full bg-violet-600" />
              </div>
            </div>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="mt-3 flex shrink-0 items-center gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100">
              ⚠️
            </div>

            <div>
              <h3 className="text-xs font-bold text-red-700">
                Something went wrong
              </h3>

              <p className="text-xs text-red-600">
                {error}
              </p>
            </div>
          </div>
        )}

        {/* Bottom tip */}
        {question && (
          <div className="mt-2 flex shrink-0 items-center justify-center gap-2 text-[10px] text-slate-400">
            <span>💡</span>

            <span>
              Explain your approach, not just the final answer.
            </span>
          </div>
        )}
      </main>
    </div>
  );
}