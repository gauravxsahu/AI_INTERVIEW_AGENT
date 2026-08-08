import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useInterview } from "../InterviewContext";
import InterviewHeader from "../components/InterviewHeader";
import ProgressBar from "../components/ProgressBar";
import TopicProgress from "../components/TopicProgress";
import QuestionCard from "../components/QuestionCard";
import AnswerBox from "../components/AnswerBox";

export default function Interview() {
  const { candidateName, question, totalQuestions, topicsCovered, feedback, loading, error, answer, sessionId } =
    useInterview();
  const navigate = useNavigate();

  // Guard: if someone lands here directly without starting an interview, send them home.
  useEffect(() => {
    if (!sessionId) navigate("/", { replace: true });
  }, [sessionId, navigate]);

  // Once feedback arrives, move to the feedback page.
  useEffect(() => {
    if (feedback) navigate("/feedback");
  }, [feedback, navigate]);

  async function handleSubmit(text) {
    await answer(text);
  }

  return (
    <div className="mx-auto min-h-screen max-w-2xl px-6">
      <InterviewHeader candidateName={candidateName} />

      {question && (
        <>
          <ProgressBar current={question.number} total={totalQuestions} />
          <TopicProgress topics={topicsCovered} />
          <QuestionCard question={question} />
          <AnswerBox onSubmit={handleSubmit} loading={loading} />
        </>
      )}

      {error && <p className="mt-4 text-sm text-red-500">{error}</p>}
    </div>
  );
}
