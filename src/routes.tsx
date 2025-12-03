import { createBrowserRouter } from 'react-router';
import Layout from './pages/Layout';
import HomePage from './pages/HomePage';
import ComplaintDetailsPage from './pages/ComplaintDetailsPage';
import Newspage from './pages/Newspage';
import NewsDetailsPage from './pages/NewsDetailspage';
import UserComplaintsPage from './pages/UserComplaintsPage';
import ProjectsPage from './pages/ProjectsPage';
import ProjectDetailsPage from './pages/ProjectDetailsPage';
import AddNewsPage from './pages/AddNewsPage';
import AddProjectPage from './pages/AddProjectPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '', element: <HomePage /> },
      { path: '/complaints', element: <UserComplaintsPage /> },
      { path: '/complaints/:id', element: <ComplaintDetailsPage /> },
      { path: '/news', element: <Newspage /> },
      { path: '/news/:id', element: <NewsDetailsPage /> },
      { path: '/projects', element: <ProjectsPage /> },
      { path: '/projects/:id', element: <ProjectDetailsPage /> },
      { path: '/news/add', element: <AddNewsPage /> },
      { path: '/projects/add', element: <AddProjectPage /> },
    ],
  },
]);

export default router;
