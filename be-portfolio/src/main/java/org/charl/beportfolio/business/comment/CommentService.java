package org.charl.beportfolio.business.comment;

import org.charl.beportfolio.presentation.comment.CommentRequestModel;
import org.charl.beportfolio.presentation.comment.CommentResponseModel;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface CommentService {
    Flux<CommentResponseModel> getAllComments();

    Mono<CommentResponseModel> getCommentById(String commentId);

    Mono<CommentResponseModel> addComment(CommentRequestModel commentRequestModel);

    Mono<CommentResponseModel> updateComment(String commentId, CommentRequestModel commentRequestModel);

    Mono<Void> deleteComment(String id);

    Flux<CommentResponseModel> getCommentsByUserId(String userId);
}

