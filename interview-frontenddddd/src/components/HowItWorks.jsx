import { Link } from "react-router-dom";

export default function HowItWorks() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute -left-40 top-10 h-96 w-96 rounded-full bg-violet-200/40 blur-3xl" />

        <div className="absolute -right-40 top-10 h-96 w-96 rounded-full bg-indigo-200/40 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6 py-20">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-200 bg-white px-4 py-2 text-sm font-medium text-violet-600 shadow-sm">
              <span>⚡</span>
              How It Works
            </div>

            <h1 className="text-5xl font-extrabold leading-tight tracking-tight md:text-6xl">
              From Start to
              <span className="block bg-linear-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
                Interview Feedback
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              Our AI Interview Agent takes you through a complete technical
              interview experience — from your first question to personalized
              feedback.
            </p>
          </div>
        </div>
      </section>

      {/* Main Flow */}
      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="relative">
          {/* Connecting line */}
          <div className="absolute left-6 top-8 hidden h-[calc(100%-4rem)] w-px bg-violet-200 md:block" />

          <div className="space-y-8">
            <Step
              number="01"
              icon="👤"
              title="Enter Your Candidate ID"
              description="Start by entering your unique candidate ID. This identifies your interview session and allows the system to maintain your progress throughout the conversation."
              points={[
                "Unique interview session",
                "No complicated setup",
                "Quick and simple start",
              ]}
            />

            <Step
              number="02"
              icon="🚀"
              title="Start the Interview"
              description="Once your session begins, the AI interviewer welcomes you and starts the technical interview based on the available candidate and interview context."
              points={[
                "Interview session initialized",
                "Questions selected dynamically",
                "Conversational interview begins",
              ]}
            />

            <Step
              number="03"
              icon="🤖"
              title="AI Asks Technical Questions"
              description="The AI interviewer asks technical questions designed to evaluate your understanding of the relevant topics."
              points={[
                "Technical questions",
                "Context-aware conversation",
                "Multiple interview rounds",
              ]}
            />

            <Step
              number="04"
              icon="💬"
              title="You Answer"
              description="Submit your answer through the interview interface. The system keeps track of your conversation so the next interaction remains connected to the previous one."
              points={[
                "Answer questions naturally",
                "Conversation context is maintained",
                "Session state is preserved",
              ]}
            />

            <Step
              number="05"
              icon="🧠"
              title="AI Evaluates Your Response"
              description="Your response is analyzed to understand the quality of your answer, technical understanding, and possible knowledge gaps."
              points={[
                "Answer analysis",
                "Technical understanding",
                "Strength and gap detection",
              ]}
            />

            <Step
              number="06"
              icon="📊"
              title="Interview Continues"
              description="The process continues through multiple questions until the AI determines that the interview is complete."
              points={[
                "Multiple questions",
                "Continuous session tracking",
                "Conversational experience",
              ]}
            />

            <Step
              number="07"
              icon="🎯"
              title="Receive Final Feedback"
              description="Once the interview is complete, the system generates structured feedback to help you understand your performance."
              points={[
                "Performance summary",
                "Strengths",
                "Knowledge gaps",
                "Recommended next steps",
              ]}
            />
          </div>
        </div>
      </section>

      {/* Architecture */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-bold uppercase tracking-widest text-violet-600">
              Behind The Scenes
            </p>

            <h2 className="mt-3 text-3xl font-bold md:text-4xl">
              How the system works
            </h2>

            <p className="mt-4 leading-7 text-slate-600">
              Every interview request passes through multiple layers to keep
              the conversation consistent and intelligent.
            </p>
          </div>

          <div className="mt-12 grid items-center gap-4 md:grid-cols-5">
            <ArchitectureCard
              icon="🖥️"
              title="Frontend"
              text="Interview interface"
            />

            <Arrow />

            <ArchitectureCard
              icon="⚙️"
              title="Backend"
              text="API & session management"
            />

            <Arrow />

            <ArchitectureCard
              icon="🤖"
              title="AI / RAG"
              text="Questions & evaluation"
            />
          </div>
        </div>
      </section>

      {/* Session Flow */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="overflow-hidden rounded-3xl bg-linear-to-r from-violet-600 to-indigo-600 p-8 text-white shadow-2xl shadow-violet-200 md:p-12">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-violet-200">
                Session Management
              </p>

              <h2 className="mt-3 text-3xl font-bold md:text-4xl">
                Your interview stays connected.
              </h2>

              <p className="mt-5 leading-7 text-violet-100">
                Every request uses the same session ID. This allows the system
                to remember where you are in the interview and continue the
                conversation across multiple requests.
              </p>
            </div>

            <div className="rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-sm">
              <div className="space-y-4 text-sm">
                <SessionRow
                  label="Start"
                  value="sessionId → abc-123"
                />

                <SessionRow
                  label="Question"
                  value="AI → What is REST?"
                />

                <SessionRow
                  label="Answer"
                  value="Candidate → REST is..."
                />

                <SessionRow
                  label="Next"
                  value="AI → Explain HTTP methods"
                />

                <SessionRow
                  label="Complete"
                  value="done → true"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final Feedback */}
      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-violet-600">
            Final Result
          </p>

          <h2 className="mt-3 text-3xl font-bold md:text-4xl">
            Feedback that helps you improve
          </h2>

          <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-600">
            The interview doesn't end with a simple pass or fail. You receive
            structured insights about your performance.
          </p>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <ResultCard
              icon="📋"
              title="Summary"
              text="Overall interview performance"
            />

            <ResultCard
              icon="💪"
              title="Strengths"
              text="What you did well"
            />

            <ResultCard
              icon="🔍"
              title="Gaps"
              text="What needs improvement"
            />

            <ResultCard
              icon="🚀"
              title="Next Steps"
              text="What to learn next"
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-slate-200 bg-white py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-3xl font-bold md:text-4xl">
            Ready to experience it?
          </h2>

          <p className="mt-4 text-slate-600">
            Start your AI-powered technical interview today.
          </p>

          <Link
            to="/"
            className="mt-8 inline-flex rounded-xl bg-linear-to-r from-violet-600 to-indigo-600 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-violet-200 transition hover:from-violet-700 hover:to-indigo-700"
          >
            Start Interview →
          </Link>
        </div>
      </section>
    </div>
  );
}


/* ---------------- Components ---------------- */

function Step({ number, icon, title, description, points }) {
  return (
    <div className="relative flex gap-5 md:gap-8">
      {/* Number */}
      <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-violet-600 text-sm font-bold text-white shadow-lg shadow-violet-200">
        {number}
      </div>

      {/* Content */}
      <div className="flex-1 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-violet-200 hover:shadow-lg md:p-7">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-2xl">
            {icon}
          </div>

          <div>
            <h3 className="text-xl font-bold">{title}</h3>

            <p className="mt-2 leading-7 text-slate-600">
              {description}
            </p>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {points.map((point) => (
            <span
              key={point}
              className="rounded-full bg-violet-50 px-3 py-1.5 text-xs font-medium text-violet-700"
            >
              ✓ {point}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}


function ArchitectureCard({ icon, title, text }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-center transition hover:-translate-y-1 hover:border-violet-200 hover:shadow-lg">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-100 text-2xl">
        {icon}
      </div>

      <h3 className="mt-4 font-bold">{title}</h3>

      <p className="mt-2 text-sm text-slate-500">{text}</p>
    </div>
  );
}


function Arrow() {
  return (
    <div className="hidden text-center text-2xl font-bold text-violet-400 md:block">
      →
    </div>
  );
}


function SessionRow({ label, value }) {
  return (
    <div className="flex items-center justify-between rounded-xl bg-white/10 px-4 py-3">
      <span className="font-semibold">{label}</span>

      <span className="text-right text-violet-100">{value}</span>
    </div>
  );
}


function ResultCard({ icon, title, text }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-violet-200 hover:shadow-lg">
      <div className="text-3xl">{icon}</div>

      <h3 className="mt-4 font-bold">{title}</h3>

      <p className="mt-2 text-sm leading-6 text-slate-500">{text}</p>
    </div>
  );
}