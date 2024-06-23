import React from "react";
import { useState } from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Layout from "./components/layout/layout";
import ManagerQuiz from "./pages/Admin/ManagerQuiz/ManagerQuiz";
import ManagerStudent from "./pages/Admin/ManagerStudent/ManagerStudent";
import QuizAdd from "./pages/Admin/AddQuiz/QuizAdd";
import AnalysticStudent from "./pages/Admin/AnalysticStudent/AnalysticStudent";
import AnalysticQuiz from "./pages/Admin/AnalysticQuiz/AnalysticQuiz";
import ManagerStudentResult from "./pages/Student/ManagerResult/ManagerStudentResult";
import StudentHome from "./pages/Student/Home/StudentHome";
import StudentRegisterQuiz from "./pages/Student/ManagerRegisterQuiz/StudentRegisterQuiz";
import ChatBot from "./pages/Student/Chatbot/ChatBot";
import QuizTaking from "./pages/Student/QuizTaking/QuizTaking";
import QuizResult from "./pages/Student/QuizResult/QuizResult";
import ManagerResult from "./pages/Student/ManagerResult/ManagerStudentResult";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
function App() {
  const [isLogInSuccess, setLogInSuccess] = useState(false);
  const [isLogIn, setIsLogin] = useState(false);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/quiz_manager" element={<ManagerQuiz />} />
          <Route path="/student_manager" element={<ManagerStudent />} />
          <Route path="/add_quiz" element={<QuizAdd />} />
          <Route path="/quiz_analystic" element={<AnalysticQuiz />} />
          <Route path="/student_analystic" element={<AnalysticStudent />} />
          <Route
            path="/student_result_manager"
            element={<ManagerStudentResult />}
          />
          <Route path="/student_home" element={<StudentHome />} />
          <Route
            path="/student_register_quiz"
            element={<StudentRegisterQuiz />}
          />
          <Route
            path="/student_participant_attempt"
            element={<ManagerResult />}
          />
          <Route path="/quiz_taking" element={<QuizTaking />} />
          <Route path="/quiz_result" element={<QuizResult />} />
          <Route path="/chat_bot" element={<ChatBot />} />
        </Route>
        <Route path={"/login"} element={<Login />} />
        <Route path={"/register"} element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
