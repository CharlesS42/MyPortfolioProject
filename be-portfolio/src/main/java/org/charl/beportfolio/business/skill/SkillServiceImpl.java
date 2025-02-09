package org.charl.beportfolio.business.skill;

import lombok.extern.slf4j.Slf4j;
import org.charl.beportfolio.dataaccess.skill.SkillRepository;
import org.charl.beportfolio.presentation.skill.SkillRequestModel;
import org.charl.beportfolio.presentation.skill.SkillResponseModel;
import org.charl.beportfolio.utils.entitymodelutils.SkillEntityModelUtil;
import org.charl.beportfolio.utils.exceptions.NotFoundException;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
@Slf4j
public class SkillServiceImpl implements SkillService {

    private final SkillRepository skillRepository;

    public SkillServiceImpl(SkillRepository skillRepository) {
        this.skillRepository = skillRepository;
    }

    @Override
    public Flux<SkillResponseModel> getAllSkills() {
        return skillRepository.findAll()
                .map(SkillEntityModelUtil::toSkillResponseModel);
    }

    @Override
    public Mono<SkillResponseModel> getSkillById(String skillId) {
        return skillRepository.findSkillBySkillId(skillId)
                .switchIfEmpty(Mono.error(new NotFoundException("Skill skillId not found: " + skillId)))
                .map(SkillEntityModelUtil::toSkillResponseModel);
    }

    @Override
    public Mono<SkillResponseModel> addSkill(SkillRequestModel skillRequestModel) {
        return skillRepository.save(SkillEntityModelUtil.toSkillEntity(skillRequestModel))
                .doOnSuccess(savedSkill -> log.info("Saved skill: {}", savedSkill))
                .map(SkillEntityModelUtil::toSkillResponseModel);
    }

    @Override
    public Mono<SkillResponseModel> updateSkill(String skillId, SkillRequestModel skillRequestModel) {
        return skillRepository.findSkillBySkillId(skillId)
                .switchIfEmpty(Mono.error(new NotFoundException("Skill skillId not found: " + skillId)))
                .flatMap(foundSkill -> {
                    foundSkill.setName(skillRequestModel.getName());
                    foundSkill.setCategory(skillRequestModel.getCategory());
                    foundSkill.setProficiencyLevel(skillRequestModel.getProficiencyLevel());
                    return skillRepository.save(foundSkill);
                })
                .doOnSuccess(updatedSkill -> log.info("Updated skill: {}", updatedSkill))
                .map(SkillEntityModelUtil::toSkillResponseModel);
    }

    @Override
    public Mono<Void> deleteSkill(String skillId) {
        return skillRepository.findSkillBySkillId(skillId)
                .switchIfEmpty(Mono.error(new NotFoundException("Skill skillId not found: " + skillId)))
                .flatMap(skillRepository::delete)
                .doOnSuccess(deletedSkill -> log.info("Deleted skill: {}", deletedSkill));
    }
}
