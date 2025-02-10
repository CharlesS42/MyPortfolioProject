export interface MessageResponseModel {
    contactMessageId: string;
    name: string;
    email: string;
    message: string;
    sentAt: string;
}

export interface MessageRequestModel {
    name: string;
    email: string;
    message: string;
    sentAt: string;
}