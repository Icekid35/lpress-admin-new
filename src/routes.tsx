import { createBrowserRouter } from 'react-router';
import Layout from './pages/Layout';
import HomePage from './pages/HomePage';
import UserComplaintsPage from './pages/UserComplaintspage';
import ComplaintDetailsPage from './pages/ComplaintDetailsPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '', element: <HomePage /> },
      { path: '/complaints', element: <UserComplaintsPage /> },
      { path: '/complaints/:id', element: <ComplaintDetailsPage /> },
    ],
  },
]);

export default router;
