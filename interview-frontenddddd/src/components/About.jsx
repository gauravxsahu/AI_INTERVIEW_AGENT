import { Link } from "react-router-dom";

export default function About() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute -left-40 top-10 h-96 w-96 rounded-full bg-violet-200/40 blur-3xl" />

        <div className="absolute -right-40 top-20 h-96 w-96 rounded-full bg-indigo-200/40 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6 py-20">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-200 bg-white px-4 py-2 text-sm font-medium text-violet-600 shadow-sm">
              <span>✦</span>
              About AI Interview Agent
            </div>

            <h1 className="text-5xl font-extrabold leading-tight tracking-tight md:text-6xl">
              Prepare Smarter.
              <span className="block bg-linear-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
                Interview Better.
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              AI Interview Agent is an intelligent technical interview
              platform designed to help candidates practice, evaluate their
              knowledge, and understand where they can improve.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                to="/"
                className="rounded-xl bg-linear-to-r from-violet-600 to-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-200 transition hover:from-violet-700 hover:to-indigo-700"
              >
                Start an Interview
              </Link>

              <Link
                to="/how-it-works"
                className="rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-violet-300 hover:text-violet-600"
              >
                See How It Works
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-violet-600">
              What We Do
            </p>

            <h2 className="mt-3 text-3xl font-bold md:text-4xl">
              A smarter way to practice technical interviews.
            </h2>

            <p className="mt-5 leading-7 text-slate-600">
              Traditional interview preparation often means searching for
              random questions and practicing without knowing whether your
              answers are actually strong enough.
            </p>

            <p className="mt-4 leading-7 text-slate-600">
              AI Interview Agent changes that by creating a conversational
              interview experience where candidates answer questions,
              receive intelligent evaluation, and get actionable feedback at
              the end.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-xl shadow-slate-200/60">
            <div className="grid gap-4 sm:grid-cols-2">
              <AboutCard
                icon="🤖"
                title="AI Interviewer"
                text="An AI-powered interviewer conducts the technical conversation."
              />

              <AboutCard
                icon="🧠"
                title="Context Aware"
                text="Questions can be personalized around the candidate's background."
              />

              <AboutCard
                icon="📊"
                title="Smart Evaluation"
                text="Answers are analyzed to identify strengths and knowledge gaps."
              />

              <AboutCard
                icon="🎯"
                title="Actionable Feedback"
                text="Candidates receive clear suggestions for what to improve next."
              />
            </div>
          </div>
        </div>
      </section>

      {/* How AI Helps */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-bold uppercase tracking-widest text-violet-600">
              Why AI?
            </p>

            <h2 className="mt-3 text-3xl font-bold md:text-4xl">
              More than just a list of questions.
            </h2>

            <p className="mt-4 leading-7 text-slate-600">
              The goal is to simulate a real technical interview instead of
              simply showing predefined questions.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <ProcessCard
              number="01"
              title="Understand"
              text="The system uses candidate information and interview context to understand what should be evaluated."
            />

            <ProcessCard
              number="02"
              title="Interview"
              text="Candidates interact with the AI interviewer through a conversational question-and-answer flow."
            />

            <ProcessCard
              number="03"
              title="Evaluate"
              text="The interview concludes with a structured summary of strengths, gaps, and recommended next steps."
            />
          </div>
        </div>
      </section>

      {/* What You Get */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="rounded-3xl bg-linear-to-r from-violet-600 to-indigo-600 p-8 text-white shadow-2xl shadow-violet-200 md:p-12">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-violet-200">
                At The End
              </p>

              <h2 className="mt-3 text-3xl font-bold md:text-4xl">
                Know exactly where you stand.
              </h2>

              <p className="mt-5 max-w-xl leading-7 text-violet-100">
                Instead of finishing an interview and wondering how you did,
                receive structured feedback that highlights what you already
                know and what you should focus on next.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <FeedbackCard
                title="Summary"
                text="Overall interview performance"
              />

              <FeedbackCard
                title="Strengths"
                text="Topics you handled well"
              />

              <FeedbackCard
                title="Knowledge Gaps"
                text="Areas that need improvement"
              />

              <FeedbackCard
                title="Next Steps"
                text="Actionable learning suggestions"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-4xl px-6 py-20 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-100 text-3xl">
            🚀
          </div>

          <h2 className="mt-6 text-3xl font-bold md:text-4xl">
            Ready to test your skills?
          </h2>

          <p className="mx-auto mt-4 max-w-xl leading-7 text-slate-600">
            Start a technical interview and discover your strengths,
            knowledge gaps, and next areas to improve.
          </p>

          <Link
            to="/"
            className="mt-8 inline-flex rounded-xl bg-linear-to-r from-violet-600 to-indigo-600 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-violet-200 transition hover:from-violet-700 hover:to-indigo-700"
          >
            Start Your Interview →
          </Link>
        </div>
      </section>
    </div>
  );
}


/* ---------------- Components ---------------- */

function AboutCard({ icon, title, text }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:-translate-y-1 hover:border-violet-200 hover:shadow-md">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-100 text-xl">
        {icon}
      </div>

      <h3 className="mt-4 font-bold text-slate-900">{title}</h3>

      <p className="mt-2 text-sm leading-6 text-slate-500">{text}</p>
    </div>
  );
}


function ProcessCard({ number, title, text }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-7 transition hover:-translate-y-1 hover:border-violet-200 hover:shadow-lg">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-600 text-sm font-bold text-white">
        {number}
      </div>

      <h3 className="mt-5 text-xl font-bold">{title}</h3>

      <p className="mt-3 text-sm leading-7 text-slate-600">{text}</p>
    </div>
  );
}


function FeedbackCard({ title, text }) {
  return (
    <div className="rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur-sm">
      <h3 className="font-bold">{title}</h3>

      <p className="mt-2 text-sm leading-6 text-violet-100">{text}</p>
    </div>
  );
}