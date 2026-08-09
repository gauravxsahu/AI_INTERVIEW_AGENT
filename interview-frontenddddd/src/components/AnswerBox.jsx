import { useState } from "react";

export default function AnswerBox({ onSubmit, loading }) {
  const [value, setValue] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    const trimmed = value.trim();

    if (!trimmed || loading) return;

    onSubmit(trimmed);
    setValue("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex h-full min-h-0 flex-col"
    >
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Type your answer…"
        disabled={loading}
        className="min-h-0 flex-1 resize-none rounded-xl border border-slate-300 bg-white p-4 text-sm leading-6 text-slate-800 outline-none placeholder:text-slate-400 transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100 disabled:cursor-not-allowed disabled:opacity-60"
      />

      <div className="mt-3 flex shrink-0 justify-center">
        <button
          type="submit"
          disabled={loading || !value.trim()}
          className="rounded-xl bg-violet-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:bg-slate-400"
        >
          {loading ? "Thinking…" : "Submit answer"}
        </button>
      </div>
    </form>
  );
}