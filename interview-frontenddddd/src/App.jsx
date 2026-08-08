import { Routes, Route } from "react-router-dom";
import { InterviewProvider } from "./InterviewContext";
import Home from "./pages/Home";
import Interview from "./pages/Interview";
import Feedback from "./pages/Feedback";

export default function App() {
  return (
    <InterviewProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/interview" element={<Interview />} />
        <Route path="/feedback" element={<Feedback />} />
      </Routes>
    </InterviewProvider>
  );
}
