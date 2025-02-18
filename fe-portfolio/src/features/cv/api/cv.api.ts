import useAxiosInstance  from "../../../shared/axios/useAxiosInstance";
import {
    CVRequestModel,
    CVResponseModel
} from "../models/cv.model";

export const useCVsApi = () => {
    
    const backendUrl = process.env.REACT_APP_BACKEND_URL;
  
    const getCV = async (): Promise<CVResponseModel> => {
      const response = await useAxiosInstance.get<CVResponseModel>(
          `${backendUrl}/cv`
      );
      return response.data;
    };
  
    const updateCV = async (
        cv: CVRequestModel
    ): Promise<CVResponseModel> => {
      const response = await useAxiosInstance.put<CVResponseModel>(
          `${backendUrl}/cv`,
          cv
      );
      return response.data;
    };
  
    return {
      getCV,
      updateCV,
    };
  };
  