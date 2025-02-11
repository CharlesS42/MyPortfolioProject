import { useAxiosInstance } from "../../../shared/axios/useAxiosInstance";
import {
    CommentRequestModel,
    CommentResponseModel
} from "../models/comments.model";

export const useCommentsApi = () => {
    const axiosInstance = useAxiosInstance();
  
    const getAllComments = async (): Promise<CommentResponseModel[]> => {
      const comments: CommentResponseModel[] = [];
  
      const response = await axiosInstance.get("/comments", {
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
            const comment = JSON.parse(trimmedLine.substring(5).trim());
            comments.push(comment);
          } catch (error) {
            console.error("Error parsing line:", trimmedLine, error);
          }
        }
      }
  
      return comments;
    };
  
    const getCommentById = async (
        commentId: string
    ): Promise<CommentResponseModel> => {
      const response = await axiosInstance.get<CommentResponseModel>(
          `/comments/${commentId}`
      );
      return response.data;
    };
  
    const addComment = async (
        comment: CommentRequestModel
    ): Promise<CommentResponseModel> => {
      const response = await axiosInstance.post<CommentResponseModel>(
          "/comments",
          comment
      );
      return response.data;
    };
  
    const updateComment = async (
        comment: CommentRequestModel,
        commentId: string
    ): Promise<CommentResponseModel> => {
      const response = await axiosInstance.put<CommentResponseModel>(
          `/comments/${commentId}`,
          comment
      );
      return response.data;
    };
  
    const deleteComment = async (commentId: string): Promise<void> => {
      await axiosInstance.delete<CommentResponseModel>(
          `/comments/${commentId}`
      );
    };
  
    return {
      getAllComments,
      getCommentById,
      addComment,
      updateComment,
      deleteComment,
    };
  };
  