package org.charl.beportfolio.business.skill;

import org.charl.beportfolio.presentation.skill.SkillRequestModel;
import org.charl.beportfolio.presentation.skill.SkillResponseModel;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface SkillService {
    Flux<SkillResponseModel> getAllSkills();

    Mono<SkillResponseModel> getSkillById(String skillId);

    Mono<SkillResponseModel> addSkill(SkillRequestModel skillRequestModel);

    Mono<SkillResponseModel> updateSkill(String skillId, SkillRequestModel skillRequestModel);

    Mono<Void> deleteSkill(String id);
}
