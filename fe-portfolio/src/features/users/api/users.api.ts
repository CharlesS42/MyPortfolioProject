import { useAxiosInstance } from "../../../shared/axios/useAxiosInstance";
import {
    UserRequestModel,
    UserResponseModel
} from "../models/users.model";

export const useUsersApi = () => {
    const axiosInstance = useAxiosInstance();
  
    const getAllUsers = async (): Promise<UserResponseModel[]> => {
      const users: UserResponseModel[] = [];
  
      const response = await axiosInstance.get("/users", {
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
  
      return users;
    };
  
    const getUserById = async (
        userId: string
    ): Promise<UserResponseModel> => {
      const response = await axiosInstance.get<UserResponseModel>(
          `/users/${userId}`
      );
      return response.data;
    };
  
    const addUser = async (
        user: UserRequestModel
    ): Promise<UserResponseModel> => {
      const response = await axiosInstance.post<UserResponseModel>(
          "/users",
          user
      );
      return response.data;
    };
  
    const updateUser = async (
        user: UserRequestModel,
        userId: string
    ): Promise<UserResponseModel> => {
      const response = await axiosInstance.put<UserResponseModel>(
          `/users/${userId}`,
          user
      );
      return response.data;
    };
  
    const deleteUser = async (userId: string): Promise<void> => {
      await axiosInstance.delete<UserResponseModel>(
          `/users/${userId}`
      );
    };

    const getUserByEmail = async (email: string): Promise<UserResponseModel> => {
        const response = await axiosInstance.get<UserResponseModel>(
            `/users/email/${email}`
        );
        return response.data;
    }
  
    return {
      getAllUsers,
      getUserById,
      addUser,
      updateUser,
      deleteUser,
      getUserByEmail
    };
  };
  