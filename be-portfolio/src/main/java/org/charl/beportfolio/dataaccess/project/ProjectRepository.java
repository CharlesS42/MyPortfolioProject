package org.charl.beportfolio.dataaccess.project;

import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Mono;

@Repository
public interface ProjectRepository extends ReactiveMongoRepository<Project, String> {
    Mono<Project> findProjectByProjectId(String projectId);
}