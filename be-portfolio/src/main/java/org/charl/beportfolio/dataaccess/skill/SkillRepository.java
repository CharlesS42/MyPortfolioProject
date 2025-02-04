package org.charl.beportfolio.dataaccess.skill;

import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Mono;

@Repository
public interface SkillRepository extends ReactiveMongoRepository<Skill, String> {
    Mono<Skill> findSkillBySkillId(String skillId);
}
