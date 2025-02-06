package org.charl.beportfolio.presentation.skill;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SkillRequestModel {
    private String name;
    private String proficiencyLevel;
    private String category;
}

