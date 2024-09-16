import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import LoginPage from "../pages/LoginPage";
import PageLayout from "../layout/PageLayout";
import PSCExam from "../pages/PSCExam";
import AdminAuthHOC from "../utils/hoc/AdminAuth";

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
