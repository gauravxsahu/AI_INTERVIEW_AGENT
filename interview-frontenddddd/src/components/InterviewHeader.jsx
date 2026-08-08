export default function InterviewHeader({ candidateName }) {
  return (
    <header className="flex items-center justify-between py-6">
      <div className="flex items-center gap-2.5">
        <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500" />
        <span className="text-sm font-semibold tracking-tight text-ink-light dark:text-ink-dark">
          AI Cohort Interview
        </span>
      </div>
      {candidateName && (
        <span className="text-sm text-muted-light dark:text-muted-dark">{candidateName}</span>
      )}
    </header>
  );
}
