package org.charl.beportfolio.presentation.comment;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CommentRequestModel {
    private String userId;
    private String userName;
    private String content;
    private String timestamp;
}

