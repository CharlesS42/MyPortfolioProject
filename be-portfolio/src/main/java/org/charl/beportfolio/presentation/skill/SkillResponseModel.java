package org.charl.beportfolio.presentation.skill;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.charl.beportfolio.dataaccess.skill.Proficiency;
import org.charl.beportfolio.dataaccess.skill.SkillCategory;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SkillResponseModel {
    private String skillId;
    private String name;
    private Proficiency proficiencyLevel;
    private SkillCategory category;
}

