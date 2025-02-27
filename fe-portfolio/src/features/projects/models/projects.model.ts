export interface ProjectResponseModel {
    projectId: string;
    title: string;
    imageFileName: string;
    description_EN: string;
    description_FR: string;
    programmingLanguages: string[];
    date: string;
    repositoryUrl: string;
    liveDemoUrl: string;
}

export interface ProjectRequestModel {
    title: string;
    imageFileName: string;
    description_EN: string;
    description_FR: string;
    programmingLanguages: string[];
    date: string;
    repositoryUrl: string;
    liveDemoUrl: string;
}