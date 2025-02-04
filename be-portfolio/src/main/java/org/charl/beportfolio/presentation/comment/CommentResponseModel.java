package org.charl.beportfolio.presentation.comment;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CommentResponseModel {
    private String commentId;
    private String userId;
    private String userName;
    private String content;
    private LocalDateTime createdAt;
}

