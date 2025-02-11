import { useAxiosInstance } from "../../../shared/axios/useAxiosInstance";
import {
    ProjectRequestModel,
    ProjectResponseModel
} from "../models/projects.model";

export const useProjectsApi = () => {
    const axiosInstance = useAxiosInstance();
  
    const getAllProjects = async (): Promise<ProjectResponseModel[]> => {
      const projects: ProjectResponseModel[] = [];
  
      const response = await axiosInstance.get("/projects", {
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
          `/projects/${projectId}`
      );
      return response.data;
    };
  
    const addProject = async (
        project: ProjectRequestModel
    ): Promise<ProjectResponseModel> => {
      const response = await axiosInstance.post<ProjectResponseModel>(
          "/projects",
          project
      );
      return response.data;
    };
  
    const updateProject = async (
        project: ProjectRequestModel,
        projectId: string
    ): Promise<ProjectResponseModel> => {
      const response = await axiosInstance.put<ProjectResponseModel>(
          `/projects/${projectId}`,
          project
      );
      return response.data;
    };
  
    const deleteProject = async (projectId: string): Promise<void> => {
      await axiosInstance.delete<ProjectResponseModel>(
          `/projects/${projectId}`
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
  