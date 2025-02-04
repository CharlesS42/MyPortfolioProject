package org.charl.beportfolio.dataaccess.cv;

import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Mono;

@Repository
public interface CVRepository extends ReactiveMongoRepository<CV, String> {
    Mono<CV> findCVByCvId(String cvId);
}
