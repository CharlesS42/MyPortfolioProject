import { useAxiosInstance } from "../../../shared/axios/useAxiosInstance";
import {
    CVRequestModel,
    CVResponseModel
} from "../models/cv.model";

export const useCVsApi = () => {
    const axiosInstance = useAxiosInstance();
  
    const getCV = async (): Promise<CVResponseModel> => {
      const response = await axiosInstance.get<CVResponseModel>(
          `/cv`
      );
      return response.data;
    };
  
    const updateCV = async (
        cv: CVRequestModel
    ): Promise<CVResponseModel> => {
      const response = await axiosInstance.put<CVResponseModel>(
          `/cv`,
          cv
      );
      return response.data;
    };
  
    return {
      getCV,
      updateCV,
    };
  };
  