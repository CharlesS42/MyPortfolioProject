/*
import useAxiosInstance from "../../../shared/axios/useAxiosInstance";
import {
    UserRequestModel,
    UserResponseModel
} from "../models/users.model";

export const useUsersApi = () => {
    
    const backendUrl = process.env.REACT_APP_BACKEND_URL;
  
    const getAllUsers = async (): Promise<UserResponseModel[]> => {
      const users: UserResponseModel[] = [];
  
      const response = await useAxiosInstance.get(`${backendUrl}/users`, {
        responseType: "text",
        headers: {
          Accept: "text/event-stream",
        },
      });
  
      const lines = response.data.split("\n");
      for (const line of lines) {
        const trimmedLine = line.trim();
        if (trimmedLine.startsWith("data:")) {
          try {
            const user = JSON.parse(trimmedLine.substring(5).trim());
            users.push(user);
          } catch (error) {
            console.error("Error parsing line:", trimmedLine, error);
          }
        }
      }
  
      console.log("API response users:", users);
      return users;
    };
  
    const getUserById = async (
        userId: string
    ): Promise<UserResponseModel> => {
      const response = await useAxiosInstance.get<UserResponseModel>(
          `${backendUrl}/users/${userId}`
      );
      return response.data;
    };
  
    const addUser = async (
        user: UserRequestModel
    ): Promise<UserResponseModel> => {
      const response = await useAxiosInstance.post<UserResponseModel>(
          `${backendUrl}/users`,
          user
      );
      return response.data;
    };
  
    const updateUser = async (
        user: UserRequestModel,
        userId: string
    ): Promise<UserResponseModel> => {
      const response = await useAxiosInstance.put<UserResponseModel>(
          `${backendUrl}/users/${userId}`,
          user
      );
      return response.data;
    };
  
    const deleteUser = async (userId: string): Promise<void> => {
      await useAxiosInstance.delete<UserResponseModel>(
          `${backendUrl}/users/${userId}`
      );
    };

    const getUserByEmail = async (email: string): Promise<UserResponseModel> => {
        const response = await useAxiosInstance.get<UserResponseModel>(
            `${backendUrl}/users/email/${email}`
        );
        return response.data;
    };
  
    return {
      getAllUsers,
      getUserById,
      addUser,
      updateUser,
      deleteUser,
      getUserByEmail
    };
  };
  
*/
import axios from "axios";
import useAxiosInstance from "../../../shared/axios/useAxiosInstance";
import { UserRequestModel, UserResponseModel } from "../models/users.model";

// Utility function to parse event-stream data
const parseEventStream = (data: string): UserResponseModel[] => {
  const lines = data.split("\n");
  const tours: UserResponseModel[] = [];

  for (const line of lines) {
    const trimmedLine = line.trim();
    if (trimmedLine.startsWith("data:")) {
      try {
        const tour = JSON.parse(trimmedLine.substring(5).trim());
        tours.push(tour);
      } catch (error) {
        console.error("Error parsing line:", trimmedLine, error);
      }
    }
  }

  return tours;
};

export const useUsersApi = () => {

  const getUser = async (userId: string): Promise<UserResponseModel | null> => {
    const encodedUserId = encodeURIComponent(userId);

    try {
      const response = await useAxiosInstance.get<UserResponseModel>(
        `/users/${encodedUserId}`
      );
      return response.data;
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 404) {
          console.log(`User with ID ${userId} not found (404).`);
          return null; // Return null to indicate user not found
        }
      }
      console.error(`Error fetching user with ID ${userId}:`, error);
      throw error; // Re-throw error for unexpected cases
    }
  };

  const loginUser = async (userId: string): Promise<UserResponseModel> => {
    const encodedUserId = encodeURIComponent(userId);
    const response = await useAxiosInstance.post<UserResponseModel>(
      `/users/${encodedUserId}/login`                                                                                         // Here using login
    );
    return response.data;
  };

  // Kinda wonky, this can be improved by using Token Claims to sync instead of fetching from Auth0 each time
  const syncUser = async (userId: string): Promise<UserResponseModel> => {
    const encodedUserId = encodeURIComponent(userId);
    const response = await useAxiosInstance.put<UserResponseModel>(
      `/users/${encodedUserId}/sync`                                                                                         // Here using sync
    );
    return response.data;
  };

  //get all users
  const getAllUsers = async (): Promise<UserResponseModel[]> => {
    const response = await useAxiosInstance.get("/users", {
      responseType: "text",
      headers: {
        Accept: "text/event-stream",
      },
    });
    return parseEventStream(response.data);
  };

  // get user by Id
  const getUserById = async (userId: string): Promise<UserResponseModel> => {
    const encodedUserId = encodeURIComponent(userId);
    const response = await useAxiosInstance.get<UserResponseModel>(
      `/users/${encodedUserId}`
    );
    return response.data;
  };

  const updateUser = async (
    userId: string,
    userData: Partial<UserRequestModel>  
  ): Promise<UserResponseModel> => {
    const encodedUserId = encodeURIComponent(userId);
    try {
      const response = await useAxiosInstance.put<UserResponseModel>(
        `/users/${encodedUserId}`,
        userData
      );
      return response.data;
    } catch (error) {
      console.error(`Error updating user ${userId}:`, error);
      throw error;
    }
  };
  
  const updateUserRole = async (userId: string, roleIds: string[]): Promise<void> => {
    const encodedUserId = encodeURIComponent(userId);
    try {
      await useAxiosInstance.post(`/users/${encodedUserId}/roles`, {                                                          // Here using sync
        roles: roleIds, 
      });
    } catch (error) {
      console.error(`Error updating roles for user ${userId}:`, error);
      throw error;
    }
  };

  return {
    getUser,
    loginUser,
    syncUser,
    getUserById,
    getAllUsers,
    updateUser,
    updateUserRole,
  };
};
