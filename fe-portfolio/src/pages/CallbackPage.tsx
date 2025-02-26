/*
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const CallbackPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserInfo = async (accessToken: string) => {
      try {
        const response = await fetch(
          'https://dev-cq56s7o31sbqbig8.us.auth0.com/userinfo',
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (!response.ok) {
          if (response.status === 429) {
            console.error('Rate limit exceeded. Please try again later.');
            return;
          }
          throw new Error('Failed to fetch user info');
        }

        const userInfo = await response.json();
        const token = localStorage.getItem('access_token');
        console.log('Token:', token);
        console.log('User Info:', userInfo);

        localStorage.setItem('user_info', JSON.stringify(userInfo));

        // Get the userId directly from Auth0
        const userId = userInfo.sub || userInfo.userId;

        localStorage.setItem('user_id', userId);

        if (userId) {
          console.log('User ID:', userId);
          //await handleUserLogin(userId, accessToken); // Pass accessToken and userId here
        } else {
          console.error('User ID is missing.');
        }
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };

 /* useEffect(() => {
    const handleUserLogin = async (userId: string, accessToken: string) => {
      try {
        const encodedUserId = encodeURIComponent(userId).replace(/\|/g, '%7C');
        const backendUrl = process.env.REACT_APP_BACKEND_URL;
        await useAxiosInstance.post(
          `${backendUrl}/api/v1/users/${encodedUserId}/login`,
          {},
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              'Content-Type': 'application/json',
            },
          }
        );
        console.log('User successfully logged in or created in the backend.');
      } catch (error) {
        console.error('Error during user login:', error);
      }
    };

    const fetchUserInfo = async (accessToken: string) => {
      try {
        const response = await fetch(
          'https://dev-cq56s7o31sbqbig8.us.auth0.com/userinfo',
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error('Failed to fetch user info');
        }

        const userInfo = await response.json();
        const userId = userInfo.sub;

        if (userId) {
          // Call the /login endpoint to create the user in the backend
          await handleUserLogin(userId, accessToken);
        } else {
          console.error('User ID is missing.');
        }
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    }; */ /*

    const hash = window.location.hash;
    const params = new URLSearchParams(hash.replace('#', '?'));
    const accessToken = params.get('access_token');

    if (accessToken) {
      localStorage.setItem('access_token', accessToken);
      fetchUserInfo(accessToken); // Fetch user info and call /login endpoint
      navigate('/home'); // Redirect to profile page
    } else {
      console.error('Authentication failed.');
    }
  }, [navigate]);

  return <div>Redirecting...</div>;
};

export default CallbackPage;
*/

import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useUsersApi } from "../features/users/api/users.api";
import { AppRoutes } from "../shared/models/app.routes";

const CallbackPage: React.FC = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const { loginUser, syncUser } = useUsersApi();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const isProcessingRef = useRef(false);

  useEffect(() => {
    const saveAndSyncUser = async () => {
      if (isAuthenticated && user?.sub && !isProcessingRef.current) {
        try {
          isProcessingRef.current = true; // Set as processing to avoid multiple calls
          await loginUser(user.sub);
          await syncUser(user.sub);
          navigate(AppRoutes.Home);
        } catch (error) {
          console.error("Error during login or sync:", error);
          setError("An error occurred during login or sync. Please try again.");
          isProcessingRef.current = false; // Reset processing state on error
        }
      }
    };

    if (!isLoading && !isProcessingRef.current) {
      saveAndSyncUser();
    }
  }, [isAuthenticated, isLoading, user, loginUser, syncUser, navigate]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return <div />;
};

export default CallbackPage;