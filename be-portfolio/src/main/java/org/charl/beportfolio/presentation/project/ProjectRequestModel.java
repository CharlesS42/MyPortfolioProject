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
public class ProjectRequestModel {
    private String title;
    private String description;
    private List<String> programmingLanguages;
    private LocalDate date;
    private String repositoryUrl;
    private String liveDemoUrl;
}
