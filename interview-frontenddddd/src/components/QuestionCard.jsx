export default function QuestionCard({ question }) {
  if (!question) return null;

  return (
    <div className="animate-fadeUp flex min-h-110 flex-col rounded-2xl border border-slate-300 bg-white p-6 shadow-sm">
      {/* Topic */}
      {question.title && (
        <div className="mb-5">
          <span className="inline-flex items-center rounded-full bg-violet-50 px-3 py-1.5 text-xs font-semibold text-violet-700">
            {question.title}
          </span>
        </div>
      )}

      {/* Question */}
      <div className="flex flex-1 items-start">
        <p className="text-lg font-medium leading-8 text-slate-800">
          {question.text}
        </p>
      </div>
    </div>
  );
}