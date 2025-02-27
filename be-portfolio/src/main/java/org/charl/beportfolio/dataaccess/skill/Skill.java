package org.charl.beportfolio.dataaccess.skill;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "skills")
public class Skill {
    @Id
    private String id;

    private String skillId;
    private String name;
    private Proficiency proficiencyLevel;
    private SkillCategory category;
}

