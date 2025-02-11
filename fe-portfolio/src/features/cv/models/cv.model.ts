export interface CVResponseModel {
    cvId: string;
    fileName: string;
    fileUrl: string;
    uploadedAt: string;
}

export interface CVRequestModel {
    fileName: string;
    fileUrl: string;
    uploadedAt: string;
}