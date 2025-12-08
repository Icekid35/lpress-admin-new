import { createBrowserRouter } from "react-router";
import Layout from "./pages/Layout";
import HomePage from "./pages/HomePage";
import ComplaintDetailsPage from "./pages/ComplaintDetailsPage";
import Newspage from "./pages/Newspage";
import NewsDetailsPage from "./pages/NewsDetailspage";
import UserComplaintsPage from "./pages/UserComplaintsPage";
import ProjectsPage from "./pages/ProjectsPage";
import ProjectDetailsPage from "./pages/ProjectDetailsPage";
import AddNewsPage from "./pages/AddNewsPage";
import AddProjectPage from "./pages/AddProjectPage";
import SendNewsletterPage from "./pages/SendNewsletterPage";
import NotFoundPage from "./pages/NotFoundPage";
import LoginPage from "./pages/LoginPage";
import { ProtectedRoute } from "./components/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      { path: "", element: <HomePage /> },
      { path: "/complaints", element: <UserComplaintsPage /> },
      { path: "/complaints/:id", element: <ComplaintDetailsPage /> },
      { path: "/news", element: <Newspage /> },
      { path: "/news/:id", element: <NewsDetailsPage /> },
      { path: "/news/add", element: <AddNewsPage /> },
      { path: "/projects", element: <ProjectsPage /> },
      { path: "/projects/:id", element: <ProjectDetailsPage /> },
      { path: "/projects/add", element: <AddProjectPage /> },
      { path: "/newsletter/send", element: <SendNewsletterPage /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);

export default router;
