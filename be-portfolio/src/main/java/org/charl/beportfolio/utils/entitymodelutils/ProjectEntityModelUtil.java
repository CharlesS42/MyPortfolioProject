package org.charl.beportfolio.utils.entitymodelutils;

public class ProjectEntityModelUtil {

    // Method to convert a Project entity to a ProjectResponseModel
    public static ProjectResponseModel toProjectResponseModel(Project project) {
        ProjectResponseModel projectResponseModel = new ProjectResponseModel();
        BeanUtils.copyProperties(project, projectResponseModel);

        if (project.getTitle() != null) {
            projectResponseModel.setTitle(project.getTitle());
        }
        if (project.getDescription() != null) {
            projectResponseModel.setDescription(project.getDescription());
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

        return projectResponseModel;
    }

    // Method to map a ProjectRequestModel to a Project entity
    public static Project toProjectEntity(ProjectRequestModel projectRequestModel) {
        return Project.builder()
                .id(generateUUIDString()) // Generate a unique projectId
                .title(projectRequestModel.getTitle())
                .description(projectRequestModel.getDescription())
                .programmingLanguages(projectRequestModel.getProgrammingLanguages())
                .date(projectRequestModel.getDate())
                .repositoryUrl(projectRequestModel.getRepositoryUrl())
                .liveDemoUrl(projectRequestModel.getLiveDemoUrl())
                .build();
    }

    // Utility method to generate a UUID string
    private static String generateUUIDString() {
        return java.util.UUID.randomUUID().toString();
    }
}

