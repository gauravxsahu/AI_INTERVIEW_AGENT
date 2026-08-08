export default function ProgressBar({ current, total }) {
  const pct = Math.min(100, Math.round((current / total) * 100));

  return (
    <div className="mb-8">
      <div className="mb-2 flex items-center justify-between text-xs font-medium text-muted-light dark:text-muted-dark">
        <span>
          Question {current} of {total}
        </span>
        <span>{pct}%</span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-border-light dark:bg-border-dark">
        <div
          className="h-full rounded-full bg-gradient-to-r from-primary-500 to-accent-500 transition-all duration-500 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
