import { createBrowserRouter } from 'react-router';
import Layout from './pages/Layout';
import HomePage from './pages/HomePage';
import ComplaintDetailsPage from './pages/ComplaintDetailsPage';
import Newspage from './pages/Newspage';
import NewsDetailsPage from './pages/NewsDetailspage';
import UserComplaintsPage from './pages/UserComplaintsPage';

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
    ],
  },
]);

export default router;
