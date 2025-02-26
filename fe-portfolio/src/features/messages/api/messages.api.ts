import { useAxiosInstance } from "../../../shared/axios/useAxiosInstance";
import {
    MessageRequestModel,
    MessageResponseModel
} from "../models/messages.model";

export const useMessagesApi = () => {
    
    const axiosInstance = useAxiosInstance();
  
    const getAllMessages = async (): Promise<MessageResponseModel[]> => {
      const messages: MessageResponseModel[] = [];
  
      const response = await axiosInstance.get(`/messages/get`, {
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
          `/messages/${messageId}/get`
      );
      return response.data;
    };
  
    const addMessage = async (
        message: MessageRequestModel
    ): Promise<MessageResponseModel> => {
      const response = await axiosInstance.post<MessageResponseModel>(
          `/messages`,
          message
      );
      return response.data;
    };
  
    const deleteMessage = async (messageId: string): Promise<void> => {
      await axiosInstance.delete<MessageResponseModel>(
          `/messages/${messageId}`
      );
    };

    const sendMessage = async (message: MessageRequestModel): Promise<MessageResponseModel> => {
        const response = await axiosInstance.post<MessageResponseModel>(
            `/messages/send`,
            message
        );
        return response.data;
    };
  
    return {
      getAllMessages,
      getMessageById,
      addMessage,
      deleteMessage,
      sendMessage,
    };
  };
  