export interface UserResponseModel {
    userId: string;
    fullName: string;
    email: string;
    company: string;
    roles: string[];
}

export interface UserRequestModel {
    fullName: string;
    email: string;
    company: string;
    roles: string[];
}