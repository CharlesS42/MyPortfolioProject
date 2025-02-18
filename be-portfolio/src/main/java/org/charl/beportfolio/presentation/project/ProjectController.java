package org.charl.beportfolio.presentation.project;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.charl.beportfolio.business.project.ProjectService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api/v1/projects")
@Slf4j
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class ProjectController {

    private final ProjectService projectService;

    @GetMapping(produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public Flux<ProjectResponseModel> getAllProjects() {
        log.info("Fetching all projects");
        return projectService.getAllProjects();
    }

    @GetMapping(value = "/{projectId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public Mono<ResponseEntity<ProjectResponseModel>> getProjectById(@PathVariable String projectId) {
        log.info("Fetching project with id: {}", projectId);
        return projectService.getProjectById(projectId)
                .map(ResponseEntity::ok)
                .defaultIfEmpty(ResponseEntity.notFound().build());
    }

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    public Mono<ProjectResponseModel> addProject(@RequestBody ProjectRequestModel projectRequestModel) {
        log.info("Adding new project: {}", projectRequestModel.getTitle());
        return projectService.addProject(projectRequestModel);
    }

    @PutMapping(value = "/{projectId}", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public Mono<ResponseEntity<ProjectResponseModel>> updateProject(@PathVariable String projectId, @RequestBody ProjectRequestModel projectRequestModel) {
        log.info("Updating project with id: {}", projectId);
        return projectService.updateProject(projectId, projectRequestModel)
                .map(ResponseEntity::ok)
                .defaultIfEmpty(ResponseEntity.notFound().build());
    }

    @DeleteMapping(value = "/{projectId}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public Mono<Void> deleteProject(@PathVariable String projectId) {
        log.info("Deleting project with id: {}", projectId);
        return projectService.deleteProject(projectId);
    }
}

