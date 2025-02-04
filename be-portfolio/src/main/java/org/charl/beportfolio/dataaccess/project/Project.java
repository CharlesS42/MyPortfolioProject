package org.charl.beportfolio.dataaccess.project;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "projects")
public class Project {
    @Id
    private String id;

    private String projectId;
    private String title;
    private String description;
    private List<String> programmingLanguages;
    private LocalDate date;
    private String repositoryUrl;
    private String liveDemoUrl;
}