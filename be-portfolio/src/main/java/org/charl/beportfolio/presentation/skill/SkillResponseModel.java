package org.charl.beportfolio.presentation.skill;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SkillResponseModel {
    private String skillId;
    private String skillName;
    private String proficiencyLevel;
}

