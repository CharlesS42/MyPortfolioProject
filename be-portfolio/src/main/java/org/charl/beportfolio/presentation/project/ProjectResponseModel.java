package org.charl.beportfolio.presentation.project;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProjectResponseModel {
    private String projectId;
    private String title;
    private String imageFileName;
    private String description_EN;
    private String description_FR;
    private List<String> programmingLanguages;
    private LocalDate date;
    private String repositoryUrl;
    private String liveDemoUrl;
}
