package org.charl.beportfolio.utils.entitymodelutils;

import org.charl.beportfolio.dataaccess.comment.Comment;
import org.charl.beportfolio.presentation.comment.CommentRequestModel;
import org.charl.beportfolio.presentation.comment.CommentResponseModel;
import org.springframework.beans.BeanUtils;

import java.time.LocalDateTime;

public class CommentEntityModelUtil {

    // Method to convert a Comment entity to a CommentResponseModel
    public static CommentResponseModel toCommentResponseModel(Comment comment) {
        CommentResponseModel commentResponseModel = new CommentResponseModel();
        BeanUtils.copyProperties(comment, commentResponseModel);

        if (comment.getUserId() != null) {
            commentResponseModel.setUserId(comment.getUserId());
        }
        if (comment.getUserName() != null) {
            commentResponseModel.setUserName(comment.getUserName());
        }
        if (comment.getContent() != null) {
            commentResponseModel.setContent(comment.getContent());
        }
        if (comment.getCreatedAt() != null) {
            commentResponseModel.setCreatedAt(comment.getCreatedAt());
        }

        return commentResponseModel;
    }

    // Method to map a CommentRequestModel to a Comment entity
    public static Comment toCommentEntity(CommentRequestModel commentRequestModel) {
        return Comment.builder()
                .id(generateUUIDString()) // Generate a unique commentId
                .userId(commentRequestModel.getUserId())
                .userName(commentRequestModel.getUserName())
                .content(commentRequestModel.getContent())
                .createdAt(LocalDateTime.now())
                .build();
    }

    // Utility method to generate a UUID string
    private static String generateUUIDString() {
        return java.util.UUID.randomUUID().toString();
    }
}
