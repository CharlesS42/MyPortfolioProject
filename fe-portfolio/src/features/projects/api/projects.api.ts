import { useAxiosInstance } from "../../../shared/axios/useAxiosInstance";
import {
    ProjectRequestModel,
    ProjectResponseModel
} from "../models/projects.model";

export const useProjectsApi = () => {
    const axiosInstance = useAxiosInstance();
    const backendUrl = process.env.REACT_APP_BACKEND_URL;
  
    const getAllProjects = async (): Promise<ProjectResponseModel[]> => {
      const projects: ProjectResponseModel[] = [];
      const response = await axiosInstance.get(`${backendUrl}/projects`, {
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
            const project = JSON.parse(trimmedLine.substring(5).trim());
            projects.push(project);
          } catch (error) {
            console.error("Error parsing line:", trimmedLine, error);
          }
        }
      }
  
      return projects;
    };
  
    const getProjectById = async (
        projectId: string
    ): Promise<ProjectResponseModel> => {
      const response = await axiosInstance.get<ProjectResponseModel>(
          `${backendUrl}/projects/${projectId}`
      );
      return response.data;
    };
  
    const addProject = async (
        project: ProjectRequestModel
    ): Promise<ProjectResponseModel> => {
      const response = await axiosInstance.post<ProjectResponseModel>(
          `${backendUrl}/projects`,
          project
      );
      return response.data;
    };
  
    const updateProject = async (
        project: ProjectRequestModel,
        projectId: string
    ): Promise<ProjectResponseModel> => {
      const response = await axiosInstance.put<ProjectResponseModel>(
          `${backendUrl}/projects/${projectId}`,
          project
      );
      return response.data;
    };
  
    const deleteProject = async (projectId: string): Promise<void> => {
      await axiosInstance.delete<ProjectResponseModel>(
          `${backendUrl}/projects/${projectId}`
      );
    };
  
    return {
      getAllProjects,
      getProjectById,
      addProject,
      updateProject,
      deleteProject,
    };
  };
  