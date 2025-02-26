export interface CommentResponseModel {
    commentId: string;
    userId: string;
    userName: string;
    content: string;
    createdAt: string;
    approved: boolean;
}

export interface CommentRequestModel {
    userId: string;
    userName: string;
    content: string;
    createdAt: string;
}
