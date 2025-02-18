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
  