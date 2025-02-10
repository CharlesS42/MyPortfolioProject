export interface UserResponseModel {
    userId: string;
    fullName: string;
    email: string;
    company: string;
    role: string;
}

export interface UserRequestModel {
    fullName: string;
    email: string;
    company: string;
    role: string;
}