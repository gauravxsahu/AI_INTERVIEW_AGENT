import React, { createContext, useContext, useState, useCallback } from "react";
import { startInterview, submitAnswer } from "./services/interviewApi";

// This context is the single source of truth for "where are we in the interview".
// Home writes to it when the interview starts, Interview reads/updates it question
// by question, and Feedback reads the final result. No prop-drilling needed.

const InterviewContext = createContext(null);

export function InterviewProvider({ children }) {
  const [sessionId, setSessionId] = useState(null);
  const [candidateName, setCandidateName] = useState("");
  const [totalQuestions, setTotalQuestions] = useState(8);
  const [question, setQuestion] = useState(null); // { number, text, day, title }
  const [topicsCovered, setTopicsCovered] = useState([]); // [{ day, title }]
  const [feedback, setFeedback] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const begin = useCallback(async (candidateId) => {
    setLoading(true);
    setError(null);
    try {
      const data = await startInterview(candidateId);
      setSessionId(data.sessionId);
      setCandidateName(data.candidateName);
      setTotalQuestions(data.totalQuestions);
      setQuestion(data.question);
      setTopicsCovered(
        data.question?.day ? [{ day: data.question.day, title: data.question.title }] : []
      );
      setFeedback(null);
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const answer = useCallback(
    async (text) => {
      if (!sessionId) return false;
      setLoading(true);
      setError(null);
      try {
        const data = await submitAnswer(sessionId, text);

        if (data.done) {
          setFeedback(data.feedback);
        } else {
          setQuestion(data.question);
          setTopicsCovered((prev) => {
            const day = data.question?.day;
            if (!day || prev.some((t) => t.day === day)) return prev;
            return [...prev, { day, title: data.question.title }];
          });
        }
        return true;
      } catch (err) {
        setError(err.message);
        return false;
      } finally {
        setLoading(false);
      }
    },
    [sessionId]
  );

  const reset = useCallback(() => {
    setSessionId(null);
    setCandidateName("");
    setQuestion(null);
    setTopicsCovered([]);
    setFeedback(null);
    setError(null);
  }, []);

  const value = {
    sessionId,
    candidateName,
    totalQuestions,
    question,
    topicsCovered,
    feedback,
    loading,
    error,
    begin,
    answer,
    reset,
  };

  return <InterviewContext.Provider value={value}>{children}</InterviewContext.Provider>;
}

export function useInterview() {
  const ctx = useContext(InterviewContext);
  if (!ctx) throw new Error("useInterview must be used inside an InterviewProvider");
  return ctx;
}
