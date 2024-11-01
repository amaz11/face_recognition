import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import LoginPage from "../pages/LoginPage";
import PageLayout from "../layout/PageLayout";
import PSCExam from "../pages/PSCExam";
import AdminAuthHOC from "../utils/hoc/AdminAuth";
import Exams from "../pages/Exams/Exams";
import ExamTypes from "../pages/ExamTypes/ExamTypes";
import ExamLogs from "../pages/ExamLogs/ExamLogs";
import Students from "../pages/Students/Students";
import Teacher from "../pages/Teacher/Teacher";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AdminAuthHOC><PageLayout /></AdminAuthHOC>,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/exam-types",
        element: <ExamTypes />,
      },
      {
        path: "/exams",
        element: <Exams />,
      },
      {
        path: "/exam-logs",
        element: <ExamLogs />,
      },
      {
        path: "/psc-exam",
        element: <PSCExam />,
      },
      {
        path: "/students/:examId/:exam",
        element: <Students />,
      },
      {
        path: "/teacher/:examId",
        element: <Teacher />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
]);
