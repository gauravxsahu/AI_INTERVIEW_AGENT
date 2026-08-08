// This is the one "signature" visual of the app: as the interview
// progresses, it lights up which real curriculum days have actually
// been covered by a question. It's driven entirely by real backend
// data (question.day / question.title) — not decorative filler.

export default function TopicProgress({ topics }) {
  if (!topics.length) return null;

  return (
    <div className="mb-8 flex flex-wrap gap-2">
      {topics.map((t, i) => (
        <span
          key={t.day}
          className="animate-fadeUp rounded-full border border-primary-100 bg-primary-50 px-3 py-1 text-xs font-medium text-primary-700 dark:border-border-dark dark:bg-card-dark dark:text-primary-400"
          style={{ animationDelay: `${i * 60}ms` }}
        >
          Day {t.day} · {t.title}
        </span>
      ))}
    </div>
  );
}
