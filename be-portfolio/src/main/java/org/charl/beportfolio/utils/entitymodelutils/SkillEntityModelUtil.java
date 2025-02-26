package org.charl.beportfolio.utils.entitymodelutils;

import org.charl.beportfolio.dataaccess.skill.Skill;
import org.charl.beportfolio.presentation.skill.SkillRequestModel;
import org.charl.beportfolio.presentation.skill.SkillResponseModel;
import org.springframework.beans.BeanUtils;

public class SkillEntityModelUtil {

    // Method to convert a Skill entity to a SkillResponseModel
    public static SkillResponseModel toSkillResponseModel(Skill skill) {
        SkillResponseModel skillResponseModel = new SkillResponseModel();
        BeanUtils.copyProperties(skill, skillResponseModel);

        if (skill.getName() != null) {
            skillResponseModel.setName(skill.getName());
        }
        if (skill.getProficiencyLevel() != null) {
            skillResponseModel.setProficiencyLevel(skill.getProficiencyLevel());
        }
        if (skill.getCategory() != null) {
            skillResponseModel.setCategory(skill.getCategory());
        }

        return skillResponseModel;
    }

    // Method to map a SkillRequestModel to a Skill entity
    public static Skill toSkillEntity(SkillRequestModel skillRequestModel) {
        return Skill.builder()
                .skillId(generateUUIDString()) // Generate a unique skillId
                .name(skillRequestModel.getName())
                .proficiencyLevel(skillRequestModel.getProficiencyLevel())
                .category(skillRequestModel.getCategory())
                .build();
    }

    // Utility method to generate a UUID string
    private static String generateUUIDString() {
        return java.util.UUID.randomUUID().toString();
    }
}

