package org.charl.beportfolio.presentation.comment;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.charl.beportfolio.business.comment.CommentService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api/v1/comments")
@Slf4j
@RequiredArgsConstructor
public class CommentController {

    private final CommentService commentService;

    @GetMapping(produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public Flux<CommentResponseModel> getAllComments() {
        log.info("Fetching all comments");
        return commentService.getAllComments();
    }

    @GetMapping(value = "/{commentId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public Mono<ResponseEntity<CommentResponseModel>> getCommentById(@PathVariable String commentId) {
        log.info("Fetching comment with id: {}", commentId);
        return commentService.getCommentById(commentId)
                .map(ResponseEntity::ok)
                .defaultIfEmpty(ResponseEntity.notFound().build());
    }

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    public Mono<CommentResponseModel> addComment(@RequestBody CommentRequestModel commentRequestModel) {
        log.info("Adding new comment");
        return commentService.addComment(commentRequestModel);
    }

    @PutMapping(value = "/{commentId}", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public Mono<ResponseEntity<CommentResponseModel>> updateComment(@PathVariable String commentId, @RequestBody CommentRequestModel commentRequestModel) {
        log.info("Updating comment with id: {}", commentId);
        return commentService.updateComment(commentId, commentRequestModel)
                .map(ResponseEntity::ok)
                .defaultIfEmpty(ResponseEntity.notFound().build());
    }

    @DeleteMapping(value = "/{commentId}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public Mono<Void> deleteComment(@PathVariable String commentId) {
        log.info("Deleting comment with id: {}", commentId);
        return commentService.deleteComment(commentId);
    }

    @GetMapping(value = "/user/{userId}", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public Flux<CommentResponseModel> getCommentsByUserId(@PathVariable String userId) {
        log.info("Fetching comments by user with id: {}", userId);
        return commentService.getCommentsByUserId(userId);
    }
}

