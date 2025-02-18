package org.charl.beportfolio.utils;

import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.charl.beportfolio.dataaccess.comment.Comment;
import org.charl.beportfolio.dataaccess.comment.CommentRepository;
import org.charl.beportfolio.dataaccess.contactmessage.ContactMessage;
import org.charl.beportfolio.dataaccess.contactmessage.ContactMessageRepository;
import org.charl.beportfolio.dataaccess.cv.CV;
import org.charl.beportfolio.dataaccess.cv.CVRepository;
import org.charl.beportfolio.dataaccess.project.Project;
import org.charl.beportfolio.dataaccess.project.ProjectRepository;
import org.charl.beportfolio.dataaccess.skill.Skill;
import org.charl.beportfolio.dataaccess.skill.SkillRepository;
import org.charl.beportfolio.dataaccess.user.User;
import org.charl.beportfolio.dataaccess.user.UserRepository;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class DatabaseLoader {

    private final UserRepository userRepository;

    @PostConstruct
    public void loadUsers() {
        List<User> sampleUsers = List.of(
                User.builder()
                        .id(null)
                        .userId("94fbe4c0-e705-11ef-a7ad-325096b39f47")
                        .firstName("Admin")
                        .lastName("istrator")
                        .email("admin@presentation.com")
                        .roles(List.of("ROLE_ADMIN"))
                        .permissions(List.of("read:users", "write:users"))
                        .build()
        );

        userRepository.deleteAll()
                .thenMany(Flux.fromIterable(sampleUsers))
                .flatMap(userRepository::save)
                .doOnNext(user -> log.info("User saved: {}", user))
                .subscribe(
                        success -> log.info("User saved successfully."),
                        error -> log.error("Error saving users: {}", error.getMessage())
                );
    }

    private final CommentRepository commentRepository;

    @PostConstruct
    public void loadComments() {
        List<Comment> sampleComments = List.of(
                Comment.builder()
                        .id(null)
                        .commentId("0ed6c33a-e708-11ef-9d1c-325096b39f47")
                        .userId("94fbe4c0-e705-11ef-a7ad-325096b39f47")
                        .userName("Charles Séguin")
                        .content("This is a great project!")
                        .createdAt(LocalDateTime.of(2025, 2, 9, 12, 0))
                        .build(),
                Comment.builder()
                        .id(null)
                        .commentId("185cd124-e708-11ef-9d03-325096b39f47")
                        .userId("60e7d254-e703-11ef-89be-325096b39f47")
                        .userName("John Doe")
                        .content("This is a great project!")
                        .createdAt(LocalDateTime.of(2025, 2, 7, 12, 0))
                        .build(),
                Comment.builder()
                        .id(null)
                        .commentId("29541870-e708-11ef-a423-325096b39f47")
                        .userId("8f54b5f6-e705-11ef-8152-325096b39f47")
                        .userName("Jane Doe")
                        .content("This is a great project!")
                        .createdAt(LocalDateTime.of(2025, 2, 8, 12, 0))
                        .build()
        );

        commentRepository.deleteAll()
                .thenMany(Flux.fromIterable(sampleComments))
                .flatMap(commentRepository::save)
                .doOnNext(comment -> log.info("Comment saved: {}", comment))
                .subscribe(
                        success -> log.info("Comment saved successfully."),
                        error -> log.error("Error saving comments: {}", error.getMessage())
                );
    }

    private final SkillRepository skillRepository;

    @PostConstruct
    public void loadSkills() {
        List<Skill> sampleSkills = List.of(
                Skill.builder()
                        .id(null)
                        .skillId("0ed6c33a-e708-11ef-9d1c-325096b39f47")
                        .name("Java")
                        .proficiencyLevel("Intermediate")
                        .category("Programming Language")
                        .build(),
                Skill.builder()
                        .id(null)
                        .skillId("185cd124-e708-11ef-9d03-325096b39f47")
                        .name("Python")
                        .proficiencyLevel("Intermediate")
                        .category("Programming Language")
                        .build(),
                Skill.builder()
                        .id(null)
                        .skillId("29541870-e708-11ef-a423-325096b39f47")
                        .name("JavaScript")
                        .proficiencyLevel("Intermediate")
                        .category("Programming Language")
                        .build()
        );

        skillRepository.deleteAll()
                .thenMany(Flux.fromIterable(sampleSkills))
                .flatMap(skillRepository::save)
                .doOnNext(skill -> log.info("Skill saved: {}", skill))
                .subscribe(
                        success -> log.info("Skill saved successfully."),
                        error -> log.error("Error saving skills: {}", error.getMessage())
                );
    }

    private final ProjectRepository projectRepository;

    @PostConstruct
    public void loadProjects() {
        List<Project> sampleProjects = List.of(
                Project.builder()
                        .id(null)
                        .projectId("0ed6c33a-e708-11ef-9d1c-325096b39f47")
                        .title("My Portfolio Project")
                        .description("This is a project description.")
                        .programmingLanguages(List.of("Java", "Python"))
                        .date(LocalDate.of(2025, 2, 9))
                        .repositoryUrl("https://github.com/CharlesS42/MyPortfolioProject")
                        .liveDemoUrl("https://charlesseg42.github.io/MyPortfolioProject/")
                        .build(),
                Project.builder()
                        .id(null)
                        .projectId("185cd124-e708-11ef-9d03-325096b39f47")
                        .title("Travel Trove")
                        .description("This is a project description.")
                        .programmingLanguages(List.of("Java", "Python"))
                        .date(LocalDate.of(2025, 2, 7))
                        .repositoryUrl("https://github.com/Hares-2088/TravelTrove")
                        .liveDemoUrl("https://sea-lion-app-36zpz.ondigitalocean.app/home")
                        .build(),
                Project.builder()
                        .id(null)
                        .projectId("29541870-e708-11ef-a423-325096b39f47")
                        .title("My Portfolio Project")
                        .description("This is a project description.")
                        .programmingLanguages(List.of("Java", "Python"))
                        .date(LocalDate.of(2025, 2, 8))
                        .repositoryUrl("https://github.com/CharlesS42/MovieApp")
                        .liveDemoUrl("None")
                        .build()
        );

        projectRepository.deleteAll()
                .thenMany(Flux.fromIterable(sampleProjects))
                .flatMap(projectRepository::save)
                .doOnNext(project -> log.info("Project saved: {}", project))
                .subscribe(
                        success -> log.info("Project saved successfully."),
                        error -> log.error("Error saving projects: {}", error.getMessage())
                );
    }

    private final ContactMessageRepository contactMessageRepository;

    @PostConstruct
    public void loadContactMessages() {
        List<ContactMessage> sampleContactMessages = List.of(
                ContactMessage.builder()
                        .id(null)
                        .contactMessageId("6c3eab8a-e728-11ef-8028-325096b39f47")
                        .name("Charles Séguin")
                        .email("charles.seg42@gmail.com")
                        .message("Hello, we are interested in hiring you!")
                        .sentAt(LocalDateTime.of(2025, 2, 9, 12, 0))
                        .build(),
                ContactMessage.builder()
                        .id(null)
                        .contactMessageId("0ed6c33a-e708-11ef-9d1c-325096b39f47")
                        .name("John Doe")
                        .email("john.doe@example.com")
                        .message("Hello, we are interested in hiring you!")
                        .sentAt(LocalDateTime.of(2025, 2, 9, 12, 0))
                        .build(),
                ContactMessage.builder()
                        .id(null)
                        .contactMessageId("185cd124-e708-11ef-9d03-325096b39f47")
                        .name("Jane Doe")
                        .email("jane.doe@example.com")
                        .message("Hello, we are interested in hiring you!")
                        .sentAt(LocalDateTime.of(2025, 2, 9, 12, 0))
                        .build()
        );

        contactMessageRepository.deleteAll()
                .thenMany(Flux.fromIterable(sampleContactMessages))
                .flatMap(contactMessageRepository::save)
                .doOnNext(contactMessage -> log.info("Contact message saved: {}", contactMessage))
                .subscribe(
                        success -> log.info("Contact message saved successfully."),
                        error -> log.error("Error saving contact messages: {}", error.getMessage())
                );
    }

    private final CVRepository cvRepository;

    @PostConstruct
    public void loadCVs() {
        List<CV> sampleCVs = List.of(
                CV.builder()
                        .id(null)
                        .cvId("24e7857a-e72a-11ef-bf0d-325096b39f47")
                        .fileName("Charles_Seguin_CV.pdf")
                        .fileUrl("https://example.com/Charles_Seguin_CV.pdf")
                        .uploadedAt(LocalDate.of(2025, 2, 9))
                        .build()
        );

        cvRepository.deleteAll()
                .thenMany(Flux.fromIterable(sampleCVs))
                .flatMap(cvRepository::save)
                .doOnNext(cv -> log.info("CV saved: {}", cv))
                .subscribe(
                        success -> log.info("CV saved successfully."),
                        error -> log.error("Error saving CVs: {}", error.getMessage())
                );
    }
}
