import { createBrowserRouter } from 'react-router';
import Layout from './pages/Layout';
import HomePage from './pages/HomePage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [{ path: '', element: <HomePage /> }],
  },
]);

export default router;
