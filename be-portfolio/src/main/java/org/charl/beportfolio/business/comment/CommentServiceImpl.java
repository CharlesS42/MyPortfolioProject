package org.charl.beportfolio.business.comment;

import lombok.extern.slf4j.Slf4j;
import org.charl.beportfolio.dataaccess.comment.CommentRepository;
import org.charl.beportfolio.presentation.comment.CommentRequestModel;
import org.charl.beportfolio.presentation.comment.CommentResponseModel;
import org.charl.beportfolio.utils.entitymodelutils.CommentEntityModelUtil;
import org.charl.beportfolio.utils.exceptions.NotFoundException;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
@Slf4j
public class CommentServiceImpl implements CommentService {

    private final CommentRepository commentRepository;

    public CommentServiceImpl(CommentRepository commentRepository) {
        this.commentRepository = commentRepository;
    }

    @Override
    public Flux<CommentResponseModel> getAllComments() {
        return commentRepository.findAll()
                .map(CommentEntityModelUtil::toCommentResponseModel);
    }

    @Override
    public Mono<CommentResponseModel> getCommentById(String commentId) {
        return commentRepository.findCommentByCommentId(commentId)
                .switchIfEmpty(Mono.error(new NotFoundException("Comment id not found: " + commentId)))
                .map(CommentEntityModelUtil::toCommentResponseModel);
    }

    @Override
    public Mono<CommentResponseModel> addComment(CommentRequestModel commentRequestModel) {
        return commentRepository.save(CommentEntityModelUtil.toCommentEntity(commentRequestModel))
                .map(CommentEntityModelUtil::toCommentResponseModel);
    }

    @Override
    public Mono<CommentResponseModel> updateComment(String commentId, CommentRequestModel commentRequestModel) {
        return commentRepository.findCommentByCommentId(commentId)
                .switchIfEmpty(Mono.error(new NotFoundException("Comment id not found: " + commentId)))
                .flatMap(foundComment -> {
                    foundComment.setUserId(commentRequestModel.getUserId());
                    foundComment.setContent(commentRequestModel.getContent());
                    foundComment.setUserName(commentRequestModel.getUserName());
                    foundComment.setCreatedAt(commentRequestModel.getCreatedAt());
                    return commentRepository.save(foundComment);
                })
                .map(CommentEntityModelUtil::toCommentResponseModel);
    }

    @Override
    public Mono<Void> deleteComment(String commentId) {
        return commentRepository.findCommentByCommentId(commentId)
                .switchIfEmpty(Mono.error(new NotFoundException("Comment id not found: " + commentId)))
                .flatMap(commentRepository::delete);
    }

    @Override
    public Flux<CommentResponseModel> getCommentsByUserId(String userId) {
        return commentRepository.findCommentsByUserId(userId)
                .map(CommentEntityModelUtil::toCommentResponseModel);
    }

    @Override
    public Flux<CommentResponseModel> getCommentsByApproved(Boolean approved) {
        return commentRepository.findCommentsByApproved(approved)
                .map(CommentEntityModelUtil::toCommentResponseModel);
    }

    @Override
    public Mono<Void> approveComment(String commentId) {
        return commentRepository.findCommentByCommentId(commentId)
                .switchIfEmpty(Mono.error(new NotFoundException("Comment id not found: " + commentId)))
                .flatMap(comment -> {
                    comment.setApproved(!comment.getApproved());    // Switch the approved status
                    return commentRepository.save(comment);
                })
                .then();
    }
}
