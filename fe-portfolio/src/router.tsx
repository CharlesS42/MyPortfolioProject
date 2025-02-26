import { createBrowserRouter, Navigate } from "react-router-dom";
import { AppRoutes } from "./shared/models/app.routes";
import Layout from './layouts/Layout';
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import UnauthorizedPage from './pages/errors/UnauthorizedPage';
import NotFoundPage from './pages/errors/NotFoundPage';
import CallbackPage from './pages/CallbackPage';
import ContactUsPage from "./pages/ContactUsPage";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from 'react';
import { useUsersApi } from './features/users/api/users.api';
import { UserResponseModel } from './features/users/models/users.model';

const ProtectedRoute = ({ element }: { element: JSX.Element }) => {
  const { isAuthenticated, getAccessTokenSilently, isLoading } = useAuth0();
  const { getUserById } = useUsersApi();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('useEffect triggered');
    const fetchUserData = async () => {
      try {
        console.log('Fetching user data...');
        const userId = localStorage.getItem('user_id');

        if (userId) {
          const userData: UserResponseModel = await getUserById(userId);
          if (userData.roles.includes('admin')) {
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (localStorage.getItem('user_id') !== "") {
      fetchUserData();
    } else {
      setLoading(false);
    }
  }, [isAuthenticated, getAccessTokenSilently, getUserById, !isLoading]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? element : <Navigate to={AppRoutes.Home} />;
};

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: AppRoutes.Home,
        element: <HomePage />,
      },
      {
        path: AppRoutes.Dashboard,
        element: (
          <ProtectedRoute element={<DashboardPage />} />
        ),
      },
      {
        path: AppRoutes.Unauthorized,
        element: (
          <UnauthorizedPage />
        ),
      },
      {
        path: AppRoutes.ContactUs,
        element: (
          <ContactUsPage />
        ),
      },
      {
        path: AppRoutes.Default,
        element: <Navigate to={AppRoutes.Home} replace />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
  {
    path: AppRoutes.Callback,
    element: (
      <CallbackPage />
    ),
  },
]);

export default router;