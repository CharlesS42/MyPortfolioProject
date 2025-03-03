import { useAxiosInstance } from "../../../shared/axios/useAxiosInstance";
import {
    SkillRequestModel,
    SkillResponseModel
} from "../models/skills.model";

export const useSkillsApi = () => {
    const axiosInstance = useAxiosInstance();
  
    const getAllSkills = async (): Promise<SkillResponseModel[]> => {
      const skills: SkillResponseModel[] = [];
  
      const response = await axiosInstance.get(`/skills/get`, {
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
            const skill = JSON.parse(trimmedLine.substring(5).trim());
            skills.push(skill);
          } catch (error) {
            console.error("Error parsing line:", trimmedLine, error);
          }
        }
      }
  
      return skills;
    };
  
    const getSkillById = async (
        skillId: string
    ): Promise<SkillResponseModel> => {
      const response = await axiosInstance.get<SkillResponseModel>(
          `/skills/${skillId}`
      );
      return response.data;
    };
  
    const addSkill = async (
        skill: SkillRequestModel
    ): Promise<SkillResponseModel> => {
      const response = await axiosInstance.post<SkillResponseModel>(
          `/skills`,
          skill
      );
      return response.data;
    };
  
    const updateSkill = async (
        skill: SkillRequestModel,
        skillId: string
    ): Promise<SkillResponseModel> => {
      const response = await axiosInstance.put<SkillResponseModel>(
          `/skills/${skillId}`,
          skill
      );
      return response.data;
    };
  
    const deleteSkill = async (skillId: string): Promise<void> => {
      await axiosInstance.delete<SkillResponseModel>(
          `/skills/${skillId}`
      );
    };
  
    return {
      getAllSkills,
      getSkillById,
      addSkill,
      updateSkill,
      deleteSkill,
    };
  };
  