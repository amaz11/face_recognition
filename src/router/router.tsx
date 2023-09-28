import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import LoginPage from "../pages/LoginPage";
import PageLayout from "../layout/PageLayout";
import PSCExam from "../pages/PSCExam";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <PageLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/psc-exam",
        element: <PSCExam />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
]);
