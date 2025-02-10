export interface ProjectResponseModel {
    projectId: string;
    title: string;
    description: string;
    programmingLanguages: string[];
    date: string;
    repositoryUrl: string;
    liveDemoUrl: string;
}

export interface ProjectRequestModel {
    title: string;
    description: string;
    programmingLanguages: string[];
    date: string;
    repositoryUrl: string;
    liveDemoUrl: string;
}