export interface MessageResponseModel {
    contactMessageId: string;
    firstName: string;
    lastName: string;
    email: string;
    subject: string;
    message: string;
    sentAt: string; 
}

export interface MessageRequestModel {
    firstName: string;
    lastName: string;
    email: string;
    subject: string;
    message: string;
    sentAt: string;
}