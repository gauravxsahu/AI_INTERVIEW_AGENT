export default function InterviewHeader({ candidateName }) {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-5 md:px-8">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-violet-600 to-indigo-600 text-sm font-bold text-white shadow-md shadow-violet-200">
            AI
          </div>

          <div>
            <p className="text-sm font-bold tracking-tight text-slate-900">
              AI Interview Agent
            </p>

            <p className="text-xs text-slate-500">
              Technical Interview
            </p>
          </div>
        </div>

        {/* Candidate */}
        {candidateName && (
          <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-100 text-sm">
              👤
            </div>

            <div className="hidden sm:block">
              <p className="text-[10px] font-medium uppercase tracking-wider text-slate-400">
                Candidate
              </p>

              <p className="text-sm font-semibold text-slate-800">
                {candidateName}
              </p>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}