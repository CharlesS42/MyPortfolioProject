package org.charl.beportfolio.presentation.project;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProjectRequestModel {
    private String title;
    private String description;
    private String date;
    private List<String> programmingLanguages;
}
