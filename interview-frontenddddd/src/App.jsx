import { Routes, Route } from "react-router-dom";
import { InterviewProvider } from "./InterviewContext";
import Home from "./pages/Home";
import Interview from "./pages/Interview";
import Feedback from "./pages/Feedback";
import About from "./components/About";
import HowItWorks from "./components/HowItWorks";
import Features from "./components/Features";


export default function App() {
  return (
    <InterviewProvider>
      <Routes>
        /* Main pages */
        <Route path="/" element={<Home />} />
        <Route path="/interview" element={<Interview />} />
        <Route path="/feedback" element={<Feedback />} />

        /* Navbar pages */
        <Route path="/about" element={<About />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/features" element={<Features />} />
        

      </Routes>
    </InterviewProvider>
  );
}
