package org.charl.beportfolio.business.project;

import lombok.extern.slf4j.Slf4j;
import org.charl.beportfolio.dataaccess.project.ProjectRepository;
import org.charl.beportfolio.presentation.project.ProjectRequestModel;
import org.charl.beportfolio.presentation.project.ProjectResponseModel;
import org.charl.beportfolio.utils.entitymodelutils.ProjectEntityModelUtil;
import org.charl.beportfolio.utils.exceptions.NotFoundException;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
@Slf4j
public class ProjectServiceImpl implements ProjectService {

    private final ProjectRepository projectRepository;

    public ProjectServiceImpl(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    @Override
    public Flux<ProjectResponseModel> getAllProjects() {
        return projectRepository.findAll()
                .map(ProjectEntityModelUtil::toProjectResponseModel);
    }

    @Override
    public Mono<ProjectResponseModel> getProjectById(String projectId) {
        return projectRepository.findProjectByProjectId(projectId)
                .switchIfEmpty(Mono.error(new NotFoundException("Project id not found: " + projectId)))
                .map(ProjectEntityModelUtil::toProjectResponseModel);
    }

    @Override
    public Mono<ProjectResponseModel> addProject(ProjectRequestModel projectRequestModel) {
        return projectRepository.save(ProjectEntityModelUtil.toProjectEntity(projectRequestModel))
                .map(ProjectEntityModelUtil::toProjectResponseModel);
    }

    @Override
    public Mono<ProjectResponseModel> updateProject(String projectId, ProjectRequestModel projectRequestModel) {
        return projectRepository.findProjectByProjectId(projectId)
                .switchIfEmpty(Mono.error(new NotFoundException("Project id not found: " + projectId)))
                .flatMap(foundProject -> {
                    foundProject.setTitle(projectRequestModel.getTitle());
                    foundProject.setDescription_EN(projectRequestModel.getDescription_EN());
                    foundProject.setDescription_FR(projectRequestModel.getDescription_FR());
                    foundProject.setProgrammingLanguages(projectRequestModel.getProgrammingLanguages());
                    foundProject.setDate(projectRequestModel.getDate());
                    foundProject.setRepositoryUrl(projectRequestModel.getRepositoryUrl());
                    foundProject.setLiveDemoUrl(projectRequestModel.getLiveDemoUrl());
                    foundProject.setSkills(projectRequestModel.getSkills());
                    return projectRepository.save(foundProject);
                })
                .map(ProjectEntityModelUtil::toProjectResponseModel);
    }
    
    @Override
    public Mono<Void> deleteProject(String projectId) {
        return projectRepository.findProjectByProjectId(projectId)
                .switchIfEmpty(Mono.error(new NotFoundException("Project id not found: " + projectId)))
                .flatMap(projectRepository::delete)
                .doOnSuccess(unused -> log.info("Deleted project with id: {}", projectId));
    }
}
