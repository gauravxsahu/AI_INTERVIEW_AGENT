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
    <form onSubmit={handleSubmit} className="mt-5">
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Type your answer…"
        rows={5}
        disabled={loading}
        className="w-full resize-none rounded-xl border border-border-light bg-card-light p-4 text-sm leading-relaxed text-ink-light placeholder:text-muted-light/70 focus:border-primary-500 disabled:opacity-60 dark:border-border-dark dark:bg-card-dark dark:text-ink-dark"
      />
      <div className="mt-3 flex justify-center">
        <button
          type="submit"
          disabled={loading || !value.trim()}
          className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400 disabled:text-white"
        >
          {loading ? "Thinking…" : "Submit answer"}
        </button>
      </div>
    </form>
  );
}
