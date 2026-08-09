import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useInterview } from "../InterviewContext";
import InterviewHeader from "../components/InterviewHeader";

function FeedbackSection({ label, items, icon, type = "default" }) {
  if (!items?.length) return null;

  const styles = {
    success: {
      wrapper: "border-green-100 bg-green-50/50",
      icon: "bg-green-100 text-green-600",
      bullet: "bg-green-500",
    },
    warning: {
      wrapper: "border-amber-100 bg-amber-50/50",
      icon: "bg-amber-100 text-amber-600",
      bullet: "bg-amber-500",
    },
    danger: {
      wrapper: "border-red-100 bg-red-50/50",
      icon: "bg-red-100 text-red-600",
      bullet: "bg-red-500",
    },
    default: {
      wrapper: "border-slate-200 bg-slate-50",
      icon: "bg-violet-100 text-violet-600",
      bullet: "bg-violet-500",
    },
  };

  const style = styles[type];

  return (
    <div className={`rounded-2xl border p-5 ${style.wrapper}`}>
      <div className="mb-4 flex items-center gap-3">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-xl text-lg ${style.icon}`}
        >
          {icon}
        </div>

        <div>
          <h3 className="text-sm font-bold text-slate-900">
            {label}
          </h3>

          <p className="mt-0.5 text-xs text-slate-500">
            {items.length} {items.length === 1 ? "point" : "points"}
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {items.map((item, i) => (
          <div
            key={i}
            className="flex items-start gap-3 rounded-xl bg-white p-3 shadow-sm"
          >
            <span
              className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${style.bullet}`}
            />

            <p className="text-sm leading-6 text-slate-600">
              {item}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Feedback() {
  const { candidateName, feedback, reset } = useInterview();
  const navigate = useNavigate();

  // Guard: if there is no feedback, return to home
  useEffect(() => {
    if (!feedback) {
      navigate("/", { replace: true });
    }
  }, [feedback, navigate]);

  function handleRestart() {
    reset();
    navigate("/");
  }

  if (!feedback) return null;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Background decorations */}
      <div className="pointer-events-none fixed left-0 top-0 z-0 h-96 w-96 rounded-full bg-violet-200/30 blur-3xl" />

      <div className="pointer-events-none fixed bottom-0 right-0 z-0 h-96 w-96 rounded-full bg-indigo-200/30 blur-3xl" />

      {/* Header */}
      <InterviewHeader candidateName={candidateName} />

      <main className="relative z-10 mx-auto max-w-5xl px-5 py-10 md:px-8">
        {/* Completion Header */}
        <section className="text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-green-100 text-2xl">
            ✓
          </div>

          <p className="text-sm font-semibold uppercase tracking-widest text-violet-600">
            Interview Complete
          </p>

          <h1 className="mt-3 text-3xl font-extrabold tracking-tight md:text-4xl">
            Great job, {candidateName || "Candidate"}!
          </h1>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-500">
            Your technical interview has been completed. Here's a detailed
            overview of your performance and areas to improve.
          </p>
        </section>

        {/* Score Card */}
        <section className="mt-10 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-200/60">
          <div className="bg-linear-to-r from-violet-600 to-indigo-600 px-6 py-5 text-white md:px-8">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-violet-200">
                  Overall Performance
                </p>

                <h2 className="mt-1 text-xl font-bold">
                  Interview Score
                </h2>
              </div>

              <div className="rounded-xl border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur-sm">
                Technical Interview
              </div>
            </div>
          </div>

          <div className="grid items-center gap-8 p-7 md:grid-cols-2 md:p-10">
            {/* Score Circle */}
            <div className="flex justify-center">
              <div className="relative flex h-48 w-48 items-center justify-center rounded-full bg-linear-to-br from-violet-100 to-indigo-100">
                <div className="absolute inset-3 flex items-center justify-center rounded-full bg-white shadow-inner">
                  <div className="text-center">
                    <div className="text-5xl font-extrabold text-slate-900">
                      {feedback.score}
                    </div>

                    <div className="mt-1 text-sm font-medium text-slate-400">
                      out of 10
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Score Message */}
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-violet-50 px-3 py-1.5 text-xs font-bold text-violet-700">
                <span>✦</span>
                AI Evaluation
              </div>

              <h2 className="text-2xl font-bold text-slate-900">
                Your interview has been evaluated.
              </h2>

              <p className="mt-3 leading-7 text-slate-600">
                The feedback below highlights what you handled well, where
                your technical understanding can improve, and what you should
                focus on next.
              </p>

              <div className="mt-6 grid grid-cols-3 gap-3">
                <StatCard
                  value={feedback.strengths?.length || 0}
                  label="Strengths"
                />

                <StatCard
                  value={feedback.weaknesses?.length || 0}
                  label="Weak Areas"
                />

                <StatCard
                  value={feedback.technicalGaps?.length || 0}
                  label="Tech Gaps"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Feedback Sections */}
        <section className="mt-8">
          <div className="mb-5">
            <p className="text-xs font-bold uppercase tracking-widest text-violet-600">
              Detailed Feedback
            </p>

            <h2 className="mt-1 text-2xl font-bold">
              Understand your performance
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <FeedbackSection
              label="Strong Areas"
              items={feedback.strengths}
              icon="✓"
              type="success"
            />

            <FeedbackSection
              label="Weak Areas"
              items={feedback.weaknesses}
              icon="!"
              type="warning"
            />

            <FeedbackSection
              label="Technical Gaps"
              items={feedback.technicalGaps}
              icon="⚙"
              type="danger"
            />

            {/* Communication */}
            {feedback.communicationQuality && (
              <div className="rounded-2xl border border-indigo-100 bg-indigo-50/50 p-5">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100 text-lg text-indigo-600">
                    💬
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-slate-900">
                      Communication Quality
                    </h3>

                    <p className="mt-0.5 text-xs text-slate-500">
                      How clearly you explained your thinking
                    </p>
                  </div>
                </div>

                <div className="rounded-xl bg-white p-4 shadow-sm">
                  <p className="text-sm leading-7 text-slate-600">
                    {feedback.communicationQuality}
                  </p>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Recommended Topics */}
        {feedback.recommendedTopics?.length > 0 && (
          <section className="mt-8 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg shadow-slate-200/40">
            <div className="bg-linear-to-r from-violet-50 to-indigo-50 px-6 py-5">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-100 text-xl">
                  🎯
                </div>

                <div>
                  <h2 className="font-bold text-slate-900">
                    Recommended Topics
                  </h2>

                  <p className="mt-1 text-xs text-slate-500">
                    Focus on these areas to improve your next interview
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 p-6">
              {feedback.recommendedTopics.map((topic, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-4 py-2 text-sm font-medium text-violet-700 transition hover:border-violet-300 hover:bg-violet-100"
                >
                  <span>→</span>
                  {topic}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Final CTA */}
        <section className="mt-10 overflow-hidden rounded-3xl bg-linear-to-r from-violet-600 to-indigo-600 p-8 text-center text-white shadow-2xl shadow-violet-200 md:p-10">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-2xl backdrop-blur-sm">
            🚀
          </div>

          <h2 className="mt-5 text-2xl font-bold md:text-3xl">
            Ready to improve?
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-violet-100">
            Review your recommended topics, strengthen your weak areas, and
            take another interview to measure your progress.
          </p>

          <button
            onClick={handleRestart}
            className="mt-7 rounded-xl bg-white px-7 py-3.5 text-sm font-bold text-violet-700 shadow-lg transition hover:bg-violet-50"
          >
            Start New Interview →
          </button>
        </section>

        {/* Footer tip */}
        <p className="py-8 text-center text-xs text-slate-400">
          Keep learning. Keep practicing. Keep improving. ✦
        </p>
      </main>
    </div>
  );
}


/* ---------------- Components ---------------- */

function StatCard({ value, label }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-center">
      <p className="text-xl font-bold text-violet-600">
        {value}
      </p>

      <p className="mt-1 text-[11px] font-medium text-slate-500">
        {label}
      </p>
    </div>
  );
}