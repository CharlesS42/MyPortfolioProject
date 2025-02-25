import { createBrowserRouter, Navigate } from "react-router-dom";
import { AppRoutes } from "./shared/models/app.routes";
import Layout from './layouts/Layout';
import HomePage from './pages/HomePage';
//import ProtectedRoute from './components/ProtectedRoute';
import DashboardPage from './pages/DashboardPage';
import UnauthorizedPage from './pages/errors/UnauthorizedPage';
/*
import ForbiddenPage from './pages/errors/ForbiddenPage';
import RequestTimeoutPage from './pages/errors/RequestTimeoutPage';
import InternalServerErrorPage from './pages/errors/InternalServerErrorPage';
import ServiceUnavailablePage from './pages/errors/ServiceNotAvailablePage';
*/
import NotFoundPage from './pages/errors/NotFoundPage';
import CallbackPage from './pages/CallbackPage';

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
              <DashboardPage />
          ),
        },
        {
          path: AppRoutes.Unauthorized,
          element: (
            
              <UnauthorizedPage />
            
          ),
        },
        /*
        {
          path: AppRoutes.Forbidden,
          element: (
            
              <ForbiddenPage />
            
          ),
        },
        {
          path: AppRoutes.RequestTimeout,
          element: (
            
              <RequestTimeoutPage />
            
          ),
        },
        {
          path: AppRoutes.InternalServerError,
          element: (
            
              <InternalServerErrorPage />
            
          ),
        },
        {
          path: AppRoutes.ServiceUnavailable,
          element: (
            
              <ServiceUnavailablePage />
            
          ),
        },
        */
  
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
  