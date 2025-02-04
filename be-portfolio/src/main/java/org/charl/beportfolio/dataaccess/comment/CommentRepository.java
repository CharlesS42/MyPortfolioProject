package org.charl.beportfolio.dataaccess.comment;

import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Mono;

@Repository
public interface CommentRepository extends ReactiveMongoRepository<Comment, String> {
    Mono<Comment> findCommentByCommentId(String commentId);
}
