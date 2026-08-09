import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useInterview } from "../InterviewContext";
import { Link } from "react-router-dom";

export default function Home() {
  const [candidateId, setCandidateId] = useState("CAND-001");
  const { begin, loading, error } = useInterview();
  const navigate = useNavigate();

  async function handleStart(e) {
    e.preventDefault();

    const ok = await begin(candidateId.trim());

    if (ok) navigate("/interview");
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Navbar */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-linear-to-br from-violet-600 to-indigo-600 text-lg font-bold text-white shadow-lg shadow-violet-200">
              AI
            </div>

            <div>
              <h1 className="text-lg font-bold">
                AI Interview{" "}
                <span className="text-violet-600">Agent</span>
              </h1>

              <p className="text-xs text-slate-500">
                Smart technical interviews
              </p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden items-center gap-8 text-sm font-medium text-slate-600 md:flex">
            <Link to="/" className="hover:text-violet-600">
              Home
            </Link>

            <Link to="/about" className="hover:text-violet-600">
              About
            </Link>

            <Link to="/how-it-works" className="hover:text-violet-600">
              How it Works
            </Link>

            <Link to="/features" className="hover:text-violet-600">
              Features
            </Link>

          
          </nav>

          <button className="rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-violet-200 transition hover:bg-violet-700">
            Dashboard
          </button>
        </div>
      </header>

      {/* Main */}
      <main className="relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-violet-200/40 blur-3xl" />

        <div className="absolute -right-40 top-0 h-96 w-96 rounded-full bg-indigo-200/40 blur-3xl" />

        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="grid items-center gap-14 lg:grid-cols-2">
            {/* LEFT SIDE */}
            <section>
              {/* Badge */}
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-200 bg-white px-4 py-2 text-sm font-medium text-violet-600 shadow-sm">
                <span>✦</span>
                AI-Powered Technical Interview
              </div>

              {/* Heading */}
              <h2 className="max-w-xl text-5xl font-extrabold leading-tight tracking-tight text-slate-900 md:text-6xl">
                Your AI Interview

                <span className="block bg-linear-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
                  Starts Here 🚀
                </span>
              </h2>

              <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
                Get ready for a personalized technical interview experience.
                Our AI interviewer evaluates your knowledge through carefully
                selected technical questions.
              </p>

              {/* Feature Cards */}
              <div className="mt-10 grid max-w-2xl gap-4 sm:grid-cols-2">
                <FeatureCard
                  icon="✦"
                  title="10 Questions"
                  description="Carefully selected technical questions"
                />

                <FeatureCard
                  icon="⚡"
                  title="AI Evaluation"
                  description="Intelligent analysis and detailed feedback"
                />

                <FeatureCard
                  icon="👤"
                  title="Personalized"
                  description="Based on your completed curriculum"
                />

                <FeatureCard
                  icon="▣"
                  title="Detailed Report"
                  description="Insights on strengths and improvement areas"
                />
              </div>

              {/* Quote */}
              <div className="relative mt-8 max-w-2xl overflow-hidden rounded-2xl border border-violet-100 bg-linear-to-r from-violet-50 to-indigo-50 p-6">
                <div className="absolute right-5 top-3 text-6xl text-violet-200">
                  "
                </div>

                <p className="relative max-w-lg text-base font-medium leading-7 text-slate-700">
                  "The best preparation for tomorrow is doing your best today."
                </p>

                <p className="mt-3 text-sm font-semibold text-violet-600">
                  — H. Jackson Brown, Jr.
                </p>
              </div>
            </section>

            {/* RIGHT SIDE */}
            <section>
              <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-2xl shadow-slate-200/70">
                {/* Card Header */}
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-100 text-2xl">
                    👤
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-slate-900">
                      Start Your Interview
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                      Enter your candidate ID to begin
                    </p>
                  </div>
                </div>

                {/* Interview Banner */}
                <div className="relative mt-7 h-44 overflow-hidden rounded-2xl bg-linear-to-br from-violet-700 via-indigo-700 to-purple-900">
                  <div className="absolute inset-0 opacity-20">
                    <div className="absolute left-10 top-8 h-24 w-24 rounded-full bg-white blur-2xl" />

                    <div className="absolute bottom-5 right-10 h-32 w-32 rounded-full bg-pink-300 blur-3xl" />
                  </div>

                  <div className="relative flex h-full items-center justify-center">
                    <div className="rounded-xl border border-white/20 bg-white/10 p-6 backdrop-blur-md">
                      <div className="mb-3 h-2 w-40 rounded-full bg-white/80" />

                      <div className="space-y-2">
                        <div className="h-2 w-28 rounded-full bg-white/40" />

                        <div className="h-2 w-36 rounded-full bg-white/40" />

                        <div className="h-2 w-24 rounded-full bg-white/40" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Form */}
                <form onSubmit={handleStart} className="mt-7">
                  <label
                    htmlFor="candidateId"
                    className="mb-2 block text-sm font-semibold text-slate-800"
                  >
                    Candidate ID
                  </label>

                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-violet-600">
                      👤
                    </span>

                    <input
                      id="candidateId"
                      value={candidateId}
                      onChange={(e) => setCandidateId(e.target.value)}
                      placeholder="CAND-001"
                      className="w-full rounded-xl border border-violet-300 bg-white py-3.5 pl-12 pr-4 text-sm outline-none transition focus:border-violet-600 focus:ring-4 focus:ring-violet-100"
                    />
                  </div>

                  <p className="mt-2 text-xs text-slate-500">
                    Use your unique candidate ID provided by your organization.
                  </p>

                  {/* Interview Info */}
                  <div className="mt-6 grid grid-cols-3 divide-x divide-slate-200 rounded-2xl border border-violet-100 bg-violet-50/50 p-4">
                    <InfoItem
                      icon="◉"
                      title="Difficulty"
                      value="Adaptive"
                    />

                    <InfoItem
                      icon="◷"
                      title="Duration"
                      value="30–45 min"
                    />

                    <InfoItem
                      icon="▣"
                      title="Questions"
                      value="10 Total"
                    />
                  </div>

                  {/* Error */}
                  {error && (
                    <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                      {error}
                    </div>
                  )}

                  {/* Start Button */}
                  <button
                    type="submit"
                    disabled={loading || !candidateId.trim()}
                    className="mt-6 flex w-full items-center justify-center gap-3 rounded-xl bg-linear-to-r from-violet-600 to-indigo-600 py-4 text-sm font-bold text-white shadow-lg shadow-violet-200 transition hover:from-violet-700 hover:to-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <span className="text-lg">
                      {loading ? "⏳" : "▶"}
                    </span>

                    {loading ? "Starting Interview..." : "Start Interview"}
                  </button>

                  {/* Security */}
                  <div className="mt-5 flex items-center justify-center gap-2 text-xs text-slate-500">
                    <span className="text-green-600">✓</span>
                    Your progress is saved automatically
                  </div>
                </form>
              </div>
            </section>
          </div>

         
        </div>
      </main>
    </div>
  );
}


/* ---------------- Components ---------------- */

function FeatureCard({ icon, title, description }) {
  return (
    <div className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-violet-200 hover:shadow-lg">
      <div className="flex items-start gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-lg text-violet-600">
          {icon}
        </div>

        <div>
          <h3 className="font-bold text-slate-900">{title}</h3>

          <p className="mt-1 text-sm leading-6 text-slate-500">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}


function InfoItem({ icon, title, value }) {
  return (
    <div className="px-3 first:pl-0 last:pr-0">
      <div className="mb-1 flex items-center gap-2 text-violet-600">
        <span>{icon}</span>

        <span className="text-xs font-semibold">{title}</span>
      </div>

      <p className="text-sm font-medium text-slate-800">{value}</p>
    </div>
  );
}


function BottomFeature({ icon, title, description }) {
  return (
    <div className="flex items-start gap-4">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-lg">
        {icon}
      </div>

      <div>
        <h3 className="font-bold text-slate-900">{title}</h3>

        <p className="mt-1 text-sm leading-6 text-slate-500">
          {description}
        </p>
      </div>
    </div>
  );
}