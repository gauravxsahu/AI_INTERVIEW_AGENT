export default function QuestionCard({ question }) {
  if (!question) return null;

  return (
    <div className="animate-fadeUp rounded-2xl border border-border-light bg-card-light p-7 shadow-sm dark:border-border-dark dark:bg-card-dark">
      {question.title && (
        <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-primary-50 px-2.5 py-1 text-xs font-medium text-primary-700 dark:bg-primary-500/10 dark:text-primary-400">
          {question.title}
        </div>
      )}
      <p className="text-lg font-medium leading-relaxed text-ink-light dark:text-ink-dark">
        {question.text}
      </p>
    </div>
  );
}
