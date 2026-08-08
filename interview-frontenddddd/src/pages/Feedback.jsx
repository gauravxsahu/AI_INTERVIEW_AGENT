import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useInterview } from "../InterviewContext";
import InterviewHeader from "../components/InterviewHeader";

function FeedbackSection({ label, items }) {
  if (!items?.length) return null;
  return (
    <div className="border-t border-border-light py-5 first:border-t-0 first:pt-0 dark:border-border-dark">
      <h3 className="mb-2 text-sm font-semibold text-ink-light dark:text-ink-dark">{label}</h3>
      <ul className="space-y-1.5">
        {items.map((item, i) => (
          <li
            key={i}
            className="flex gap-2 text-sm leading-relaxed text-muted-light dark:text-muted-dark"
          >
            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary-500" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Feedback() {
  const { candidateName, feedback, reset } = useInterview();
  const navigate = useNavigate();

  useEffect(() => {
    if (!feedback) navigate("/", { replace: true });
  }, [feedback, navigate]);

  function handleRestart() {
    reset();
    navigate("/");
  }

  if (!feedback) return null;

  return (
    <div className="mx-auto min-h-screen max-w-2xl px-6 pb-16">
      <InterviewHeader candidateName={candidateName} />

      <div className="animate-fadeUp text-center">
        <p className="text-sm font-medium text-muted-light dark:text-muted-dark">
          Interview complete
        </p>

        <div className="mx-auto my-6 flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-primary-500 to-accent-500">
          <span className="text-3xl font-bold text-white">{feedback.score}</span>
          <span className="mb-1 self-end text-sm font-medium text-white/80">/10</span>
        </div>

        <h1 className="text-xl font-bold tracking-tight text-ink-light dark:text-ink-dark">
          {candidateName}
        </h1>
      </div>

      <div className="mt-8 rounded-2xl border border-border-light bg-card-light p-7 shadow-sm dark:border-border-dark dark:bg-card-dark">
        <FeedbackSection label="Strong areas" items={feedback.strengths} />
        <FeedbackSection label="Weak areas" items={feedback.weaknesses} />
        <FeedbackSection label="Technical gaps" items={feedback.technicalGaps} />

        {feedback.communicationQuality && (
          <div className="border-t border-border-light py-5 dark:border-border-dark">
            <h3 className="mb-2 text-sm font-semibold text-ink-light dark:text-ink-dark">
              Communication quality
            </h3>
            <p className="text-sm leading-relaxed text-muted-light dark:text-muted-dark">
              {feedback.communicationQuality}
            </p>
          </div>
        )}

        {feedback.recommendedTopics?.length > 0 && (
          <div className="border-t border-border-light pt-5 dark:border-border-dark">
            <h3 className="mb-3 text-sm font-semibold text-ink-light dark:text-ink-dark">
              Recommended topics to study
            </h3>
            <div className="flex flex-wrap gap-2">
              {feedback.recommendedTopics.map((topic, i) => (
                <span
                  key={i}
                  className="rounded-full border border-primary-100 bg-primary-50 px-3 py-1 text-xs font-medium text-primary-700 dark:border-border-dark dark:bg-primary-500/10 dark:text-primary-400"
                >
                  {topic}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      <button
        onClick={handleRestart}
        className="mx-auto mt-8 block rounded-xl bg-primary-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-primary-600"
      >
        Start new interview
      </button>
    </div>
  );
}
