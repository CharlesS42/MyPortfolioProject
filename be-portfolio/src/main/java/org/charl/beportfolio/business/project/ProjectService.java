package org.charl.beportfolio.business.project;

import org.charl.beportfolio.presentation.project.ProjectRequestModel;
import org.charl.beportfolio.presentation.project.ProjectResponseModel;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface ProjectService {
    Flux<ProjectResponseModel> getAllProjects();

    Mono<ProjectResponseModel> getProjectById(String projectId);

    Mono<ProjectResponseModel> addProject(ProjectRequestModel projectRequestModel);

    Mono<ProjectResponseModel> updateProject(String id, ProjectRequestModel projectRequestModel);

    Mono<Void> deleteProject(String projectId);
}

