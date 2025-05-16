package org.charl.beportfolio.utils.entitymodelutils;

import org.charl.beportfolio.dataaccess.project.Project;
import org.charl.beportfolio.presentation.project.ProjectRequestModel;
import org.charl.beportfolio.presentation.project.ProjectResponseModel;
import org.springframework.beans.BeanUtils;

public class ProjectEntityModelUtil {

    // Method to convert a Project entity to a ProjectResponseModel
    public static ProjectResponseModel toProjectResponseModel(Project project) {
        ProjectResponseModel projectResponseModel = new ProjectResponseModel();
        BeanUtils.copyProperties(project, projectResponseModel);

        if (project.getProjectId() != null) {
            projectResponseModel.setProjectId(project.getProjectId());
        }
        if (project.getTitle() != null) {
            projectResponseModel.setTitle(project.getTitle());
        }
        if (project.getImageFileName() != null) {
            projectResponseModel.setImageFileName(project.getImageFileName());
        }
        if (project.getDescription_EN() != null) {
            projectResponseModel.setDescription_EN(project.getDescription_EN());
        }
        if (project.getDescription_FR() != null) {
            projectResponseModel.setDescription_FR(project.getDescription_FR());
        }
        if (project.getProgrammingLanguages() != null) {
            projectResponseModel.setProgrammingLanguages(project.getProgrammingLanguages());
        }
        if (project.getDate() != null) {
            projectResponseModel.setDate(project.getDate());
        }
        if (project.getRepositoryUrl() != null) {
            projectResponseModel.setRepositoryUrl(project.getRepositoryUrl());
        }
        if (project.getLiveDemoUrl() != null) {
            projectResponseModel.setLiveDemoUrl(project.getLiveDemoUrl());
        }
        if (project.getSkills() != null) {
            projectResponseModel.setSkills(project.getSkills());
        }

        return projectResponseModel;
    }

    // Method to map a ProjectRequestModel to a Project entity
    public static Project toProjectEntity(ProjectRequestModel projectRequestModel) {
        return Project.builder()
                .projectId(generateUUIDString()) // Generate a unique projectId
                .title(projectRequestModel.getTitle())
                .imageFileName(projectRequestModel.getImageFileName())
                .description_EN(projectRequestModel.getDescription_EN())
                .description_FR(projectRequestModel.getDescription_FR())
                .programmingLanguages(projectRequestModel.getProgrammingLanguages())
                .date(projectRequestModel.getDate())
                .repositoryUrl(projectRequestModel.getRepositoryUrl())
                .liveDemoUrl(projectRequestModel.getLiveDemoUrl())
                .skills(projectRequestModel.getSkills())
                .build();
    }

    // Utility method to generate a UUID string
    private static String generateUUIDString() {
        return java.util.UUID.randomUUID().toString();
    }
}

