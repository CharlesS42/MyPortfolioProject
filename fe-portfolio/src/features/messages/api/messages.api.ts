import { useAxiosInstance } from "../../../shared/axios/useAxiosInstance";
import {
    MessageRequestModel,
    MessageResponseModel
} from "../models/messages.model";

export const useMessagesApi = () => {
    const axiosInstance = useAxiosInstance();
    const backendUrl = process.env.REACT_APP_BACKEND_URL;
  
    const getAllMessages = async (): Promise<MessageResponseModel[]> => {
      const messages: MessageResponseModel[] = [];
  
      const response = await axiosInstance.get(`${backendUrl}/messages`, {
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
            const message = JSON.parse(trimmedLine.substring(5).trim());
            messages.push(message);
          } catch (error) {
            console.error("Error parsing line:", trimmedLine, error);
          }
        }
      }
  
      return messages;
    };
  
    const getMessageById = async (
        messageId: string
    ): Promise<MessageResponseModel> => {
      const response = await axiosInstance.get<MessageResponseModel>(
          `${backendUrl}/messages/${messageId}`
      );
      return response.data;
    };
  
    const addMessage = async (
        message: MessageRequestModel
    ): Promise<MessageResponseModel> => {
      const response = await axiosInstance.post<MessageResponseModel>(
          `${backendUrl}/messages`,
          message
      );
      return response.data;
    };
  
    const deleteMessage = async (messageId: string): Promise<void> => {
      await axiosInstance.delete<MessageResponseModel>(
          `${backendUrl}/messages/${messageId}`
      );
    };
  
    return {
      getAllMessages,
      getMessageById,
      addMessage,
      deleteMessage,
    };
  };
  