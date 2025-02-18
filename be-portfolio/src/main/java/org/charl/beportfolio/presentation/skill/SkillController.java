package org.charl.beportfolio.presentation.skill;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.charl.beportfolio.business.skill.SkillService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api/v1/skills")
@Slf4j
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class SkillController {

    private final SkillService skillService;

    @GetMapping(produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public Flux<SkillResponseModel> getAllSkills() {
        log.info("Fetching all skills");
        return skillService.getAllSkills();
    }

    @GetMapping(value = "/{skillId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public Mono<ResponseEntity<SkillResponseModel>> getSkillById(@PathVariable String skillId) {
        log.info("Fetching skill with id: {}", skillId);
        return skillService.getSkillById(skillId)
                .map(ResponseEntity::ok)
                .defaultIfEmpty(ResponseEntity.notFound().build());
    }

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    public Mono<SkillResponseModel> addSkill(@RequestBody SkillRequestModel skillRequestModel) {
        log.info("Adding new skill");
        return skillService.addSkill(skillRequestModel);
    }

    @PutMapping(value = "/{skillId}", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public Mono<ResponseEntity<SkillResponseModel>> updateSkill(@PathVariable String skillId, @RequestBody SkillRequestModel skillRequestModel) {
        log.info("Updating skill with id: {}", skillId);
        return skillService.updateSkill(skillId, skillRequestModel)
                .map(ResponseEntity::ok)
                .defaultIfEmpty(ResponseEntity.notFound().build());
    }

    @DeleteMapping(value = "/{skillId}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public Mono<Void> deleteSkill(@PathVariable String skillId) {
        log.info("Deleting skill with id: {}", skillId);
        return skillService.deleteSkill(skillId);
    }
}

