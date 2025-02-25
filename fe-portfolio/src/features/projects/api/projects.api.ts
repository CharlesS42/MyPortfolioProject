import useAxiosInstance  from "../../../shared/axios/useAxiosInstance";
import {
    ProjectRequestModel,
    ProjectResponseModel
} from "../models/projects.model";

export const useProjectsApi = () => {
    
    const backendUrl = process.env.REACT_APP_BACKEND_URL;
  
    const getAllProjects = async (): Promise<ProjectResponseModel[]> => {
      console.log(localStorage.getItem('access_token'));
      
      const projects: ProjectResponseModel[] = [];
      const response = await useAxiosInstance.get(`${backendUrl}/projects/get`, {
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
      const response = await useAxiosInstance.get<ProjectResponseModel>(
          `${backendUrl}/projects/${projectId}`
      );
      return response.data;
    };
  
    const addProject = async (
        project: ProjectRequestModel
    ): Promise<ProjectResponseModel> => {
      const response = await useAxiosInstance.post<ProjectResponseModel>(
          `${backendUrl}/projects`,
          project
      );
      return response.data;
    };
  
    const updateProject = async (
        project: ProjectRequestModel,
        projectId: string
    ): Promise<ProjectResponseModel> => {
      const response = await useAxiosInstance.put<ProjectResponseModel>(
          `${backendUrl}/projects/${projectId}`,
          project
      );
      return response.data;
    };
  
    const deleteProject = async (projectId: string): Promise<void> => {
      await useAxiosInstance.delete<ProjectResponseModel>(
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
  