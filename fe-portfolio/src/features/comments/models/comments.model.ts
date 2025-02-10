export interface CommentResponseModel {
    commentId: string;
    userId: string;
    userName: string;
    content: string;
    createdAt: string;
}

export interface CommentRequestModel {
    userId: string;
    userName: string;
    content: string;
    createdAt: string;
}
