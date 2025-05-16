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
import org.charl.beportfolio.dataaccess.skill.Proficiency;
import org.charl.beportfolio.dataaccess.skill.Skill;
import org.charl.beportfolio.dataaccess.skill.SkillCategory;
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
                        .userId("auth0|67b4c5dc10012cb49ffc5deb")
                        .firstName("Charles")
                        .lastName("Seguin")
                        .email("charles@moi.com")
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
                        .content("Welcome to the comment section! Feel free to leave a comment below with your thoughts on this project.")
                        .createdAt(LocalDateTime.of(2025, 2, 9, 12, 0))
                        .approved(true)
                        .build(),
                Comment.builder()
                        .id(null)
                        .commentId("185cd124-e708-11ef-9d03-325096b39f47")
                        .userId("60e7d254-e703-11ef-89be-325096b39f47")
                        .userName("John Doe")
                        .content("This comment is awaiting approval.")
                        .createdAt(LocalDateTime.of(2025, 2, 7, 12, 0))
                        .approved(false)
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
                        .skillId("6c3eab8a-e728-11ef-8028-325096b39f47")
                        .name("Delphi")
                        .proficiencyLevel(Proficiency.ADVANCED)
                        .category(SkillCategory.PROGRAMMING_LANGUAGE)
                        .build(),
                Skill.builder()
                        .id(null)
                        .skillId("0ed6c33a-e708-11ef-9d1c-325096b39f47")
                        .name("GitHub")
                        .proficiencyLevel(Proficiency.ADVANCED)
                        .category(SkillCategory.TOOL)
                        .build(),
                Skill.builder()
                        .id(null)
                        .skillId("185cd124-e708-11ef-9d03-325096b39f48")
                        .name("Java")
                        .proficiencyLevel(Proficiency.INTERMEDIATE)
                        .category(SkillCategory.PROGRAMMING_LANGUAGE)
                        .build(),
                Skill.builder()
                        .id(null)
                        .skillId("185cd124-e708-11ef-9d03-325096b39f49")
                        .name("C#")
                        .proficiencyLevel(Proficiency.INTERMEDIATE)
                        .category(SkillCategory.PROGRAMMING_LANGUAGE)
                        .build(),
                Skill.builder()
                        .id(null)
                        .skillId("29541870-e708-11ef-a423-325096b39f48")
                        .name("MySQL")
                        .proficiencyLevel(Proficiency.INTERMEDIATE)
                        .category(SkillCategory.DATABASE)
                        .build(),
                Skill.builder()
                        .id(null)
                        .skillId("185cd124-e708-11ef-9d03-325096b39f47")
                        .name("Python")
                        .proficiencyLevel(Proficiency.INTERMEDIATE)
                        .category(SkillCategory.PROGRAMMING_LANGUAGE)
                        .build(),
                Skill.builder()
                        .id(null)
                        .skillId("29541870-e708-11ef-a423-325096b39f47")
                        .name("JavaScript")
                        .proficiencyLevel(Proficiency.BEGINNER)
                        .category(SkillCategory.PROGRAMMING_LANGUAGE)
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
                        .projectId("185cd124-e708-11ef-9d03-325096b39f47")
                        .title("Travel Trove")
                        .imageFileName("TravelTrove")
                        .description_EN("TravelTrove is a full-stack travel agency web application developed by my team and me, " +
                                        "using Java and Spring Boot for the backend, TypeScript for the frontend, and MongoDB for data storage. " +
                                        "It enables customers to browse tours, view itineraries, make secure bookings, and manage their reservations. " +
                                        "Administrators and employees have access to a management panel to oversee tours, analyze statistics, and monitor bookings. " +
                                        "With Auth0-based authentication and a responsive design, TravelTrove delivers a secure, scalable, " +
                                        "and user-friendly platform tailored to the travel industry.")
                        .description_FR("TravelTrove est une application web full-stack d’agence de voyage que mon équipe et moi avons développée en utilisant " +
                                        "Java et Spring Boot pour le backend, TypeScript pour le frontend, et MongoDB pour la base de données. " +
                                        "Elle permet aux clients de parcourir des circuits, consulter des itinéraires, effectuer des réservations sécurisées et gérer leurs historiques. " +
                                        "Les administrateurs disposent d’un panneau de gestion pour suivre les réservations, analyser les statistiques et gérer les circuits. " +
                                        "Grâce à l’authentification Auth0 et une conception responsive, TravelTrove offre une plateforme sécurisée, évolutive et conviviale adaptée au secteur du voyage.")
                        .programmingLanguages(List.of("Java", "Typescript"))
                        .date(LocalDate.of(2025, 2, 7))
                        .repositoryUrl("https://github.com/Hares-2088/TravelTrove")
                        .liveDemoUrl("https://sea-lion-app-36zpz.ondigitalocean.app/home")
                        .skills(List.of("GitHub", "Authentication", "MongoDB", "Spring Boot", "Java", "Typescript", "Deployment"))
                        .build(),
                Project.builder()
                        .id(null)
                        .projectId("29541870-e708-11ef-a423-325096b39f47")
                        .title("MDExplorer")
                        .imageFileName("MDExplorer")
                        .description_EN("MDExplorer is a Delphi-based tool I developed for exploring and managing Interbase and Firebird databases. " +
                                        "It supports registering multiple databases, displaying structural elements (tables, fields, triggers, procedures, keys, etc.) " +
                                        "in a navigable tree. Users can execute SQL statements, analyze query plans, view BLOBs in multiple formats, and work within a multi-view docking environment. " +
                                        "It includes features like metadata search and data export, and uniquely offers seamless recovery from connection losses after server restarts—making it a robust " +
                                        "and versatile solution for database administrators.")
                        .description_FR("MDExplorer est un outil développé en Delphi pour l’exploration et la gestion de bases de données Interbase et Firebird. " +
                                        "Il permet d’enregistrer plusieurs bases, d’afficher les éléments structurels (tables, champs, déclencheurs, procédures, clés, etc.) " +
                                        "dans un arbre de navigation clair. Les utilisateurs peuvent exécuter des requêtes SQL, analyser les plans d’exécution, " +
                                        "visualiser les BLOBs sous plusieurs formats et travailler dans un environnement à vues multiples avec ancrage. " +
                                        "Il offre des fonctions de recherche de métadonnées, d’exportation de données, et se distingue par sa capacité unique " +
                                        "à se reconnecter automatiquement après une perte de connexion due au redémarrage du serveur.")
                        .programmingLanguages(List.of("Delphi"))
                        .date(LocalDate.of(2025, 2, 8))
                        .repositoryUrl("")
                        .liveDemoUrl("")
                        .skills(List.of("GitHub", "Delphi", "Interbase", "Firebird", "SQL", "Database Management"))
                        .build(),
                Project.builder()
                        .id(null)
                        .projectId("0ed6c33a-e708-11ef-9d1c-325096b39f47")
                        .title("MyPortfolioProject")
                        .imageFileName("MyPortfolioProject")
                        .description_EN("MyPortfolioProject is a personal portfolio web application I developed to showcase my programming skills and past projects. " +
                                        "Built with Java and Spring Boot for the backend, a TypeScript frontend, and MongoDB for data storage, it features project filtering, " +
                                        "a dynamic comment section, and a contact form. The platform uses Auth0 for secure authentication, supports internationalization with i18next, " +
                                        "and allows users to access documents like my CV, securely stored on AWS S3. With a responsive, user-friendly design, " +
                                        "it highlights my full-stack development skills, focus on security, and ability to build multilingual applications.")
                        .description_FR("MyPortfolioProject est une application web de portfolio personnel que j’ai développée pour présenter mes compétences " +
                                        "en programmation et les projets sur lesquels j’ai travaillé. Conçue avec Java et Spring Boot pour le backend, un frontend en TypeScript, " +
                                        "et MongoDB comme base de données, elle propose des filtres de recherche de projets, une section de commentaires dynamique, " +
                                        "et un formulaire de contact. L’authentification sécurisée est assurée par Auth0, la prise en charge multilingue est assurée par i18next, " +
                                        "et mon CV est hébergé en toute sécurité sur AWS S3. Grâce à une interface réactive et intuitive, cette plateforme reflète mon expertise " +
                                        "en développement full-stack, sécurité et applications multilingues.")
                        .programmingLanguages(List.of("Java", "Typescript"))
                        .date(LocalDate.of(2025, 2, 9))
                        .repositoryUrl("https://github.com/CharlesS42/MyPortfolioProject")
                        .liveDemoUrl("here")
                        .skills(List.of("GitHub", "Authentication", "MongoDB", "Spring Boot", "Java", "Typescript", "Deployment", "AWS S3"))
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
                        .firstName("Charles")
                        .lastName("Seguin")
                        .email("charles.seg42@gmail.com")
                        .subject("Welcome to the message section!")
                        .message("This section is meant to be a placeholder for messages from visitors. When the contact me page is called, " +
                                "the form data will be sent here and saved in the database. This is a test message.")
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
