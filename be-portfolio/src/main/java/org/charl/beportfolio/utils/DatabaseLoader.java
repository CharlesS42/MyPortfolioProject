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
                        .description_EN("TravelTrove is a travel agency web application that my team and I have developed in recent months to " +
                                "allow customers to explore and book various tours for themselves and their families. It is built using Java and " +
                                "Spring Boot for the backend, with a TypeScript-based frontend, and it leverages MongoDB as " +
                                "the database. " +
                                "\n\n" +
                                "The platform enables customers to browse a wide selection of tours, view detailed itineraries, and make " +
                                "secure payments for their bookings. Users can manage their reservations and track their booking history " +
                                "effortlessly. " +
                                "\n\n" +
                                "Administrators and employees have access to a comprehensive management panel, allowing them to " +
                                "modify and control every detail of the available tours. They can monitor customer bookings, analyze " +
                                "payment statistics, and assess tour popularity through insightful data visualization tools. " +
                                "\n\n" +
                                "The application is secured using Auth0-based authentication, ensuring a safe and streamlined access " +
                                "experience for both customers and administrative users. " +
                                "\n\n" +
                                "With its intuitive interface and seamless functionality, TravelTrove enhances the experience of both travelers " +
                                "and travel agencies by providing a powerful and user-friendly platform for tour management and booking. " +
                                "The system is designed to be efficient, scalable, and accessible across various devices. " +
                                "\n\n" +
                                "By combining a robust backend, a dynamic frontend, and secure authentication, TravelTrove represents " +
                                "our expertise in building modern, full-stack web applications tailored for the travel industry. ")
                        .description_FR("TravelTrove est une application web d'agence de voyage que mon équipe et moi avons développée ces derniers mois pour " +
                                "permettre aux clients d'explorer et de réserver divers circuits pour eux-mêmes et leur famille. Elle est construite en utilisant Java et " +
                                "Spring Boot pour le backend, avec un frontend basé sur TypeScript, et elle exploite MongoDB comme " +
                                "base de données. " +
                                "\n\n" +
                                "La plateforme permet aux clients de parcourir une large sélection de circuits, de consulter des itinéraires détaillés et de " +
                                "effectuer des paiements sécurisés pour leurs réservations. Les utilisateurs peuvent gérer leurs réservations et suivre leur historique de réservation " +
                                "sans effort. " +
                                "\n\n" +
                                "Les administrateurs et les employés ont accès à un panneau de gestion complet, leur permettant de " +
                                "modifier et de contrôler chaque détail des circuits disponibles. Ils peuvent surveiller les réservations des clients, analyser " +
                                "les statistiques de paiement et évaluer la popularité des circuits grâce à des outils de visualisation de données perspicaces. " +
                                "\n\n" +
                                "L'application est sécurisée grâce à l'authentification basée sur Auth0, garantissant un accès sûr et simplifié " +
                                "pour les clients et les utilisateurs administratifs. " +
                                "\n\n" +
                                "Avec son interface intuitive et ses fonctionnalités fluides, TravelTrove améliore l'expérience des voyageurs " +
                                "et des agences de voyage en fournissant une plateforme puissante et conviviale pour la gestion et la réservation de circuits. " +
                                "Le système est conçu pour être efficace, évolutif et accessible sur divers appareils. " +
                                "\n\n" +
                                "En combinant un backend robuste, un frontend dynamique et une authentification sécurisée, TravelTrove représente " +
                                "notre expertise dans la construction d'applications web modernes et full-stack adaptées à l'industrie du voyage.")
                        .programmingLanguages(List.of("Java", "Typescript"))
                        .date(LocalDate.of(2025, 2, 7))
                        .repositoryUrl("https://github.com/Hares-2088/TravelTrove")
                        .liveDemoUrl("https://sea-lion-app-36zpz.ondigitalocean.app/home")
                        .build(),
                Project.builder()
                        .id(null)
                        .projectId("29541870-e708-11ef-a423-325096b39f47")
                        .title("MDExplorer")
                        .imageFileName("MDExplorer")
                        .description_EN("MDExplorer is a database exploration and management tool that I develop " +
                                "in recent months using the Delphi programming language. It allows to " +
                                "register multiple Interbase or Firebird databases and presents all the " +
                                "structures elements in a comprehensive tree to browse DDL elements " +
                                "(tables, fields, triggers, stored procedures, indexes, foreign keys, " +
                                "primary keys). " +
                                "\n\n" +
                                "It also allows to run SQL statements to modify the structure or to query " +
                                "or manipulate data from the database. It offers a SQL Plan Analyser, a " +
                                "multi-format BLOB viewer. It supports multiple views in a docking " +
                                "environment. It features data exportation features. It also offers a " +
                                "powerful metadata search feature. " +
                                "\n\n" +
                                "It is the only known Interbase and Firebase compatible tool that " +
                                "seamlessly recovers from connection losses resulting of a server restart.")
                        .description_FR("MDExplorer est un outil d'exploration et de gestion de bases de données " +
                                        "que j'ai développé au cours des derniers mois en langage Delphi. Il " +
                                        "permet d'enregistrer plusieurs bases de données Interbase ou Firebird et " +
                                        "présente tous les éléments structurels sous forme d’arborescence " +
                                        "complète pour naviguer dans les éléments DDL (tables, champs, " +
                                        "déclencheurs, procédures stockées, index, clés étrangères, clés " +
                                        "primaires). Il permet également d'exécuter des requêtes SQL afin de " +
                                        "modifier la structure, d’interroger ou de manipuler les données de la base. " +
                                        "\n\n" +
                                        "Il offre un analyseur de plan SQL, un visualiseur de BLOB multi-format " +
                                        "et prend en charge plusieurs vues dans un environnement à fenêtres " +
                                        "ancrables. Il dispose de fonctionnalités d’exportation de données. Il " +
                                        "offre aussi une fonctionnalité de recherche des métadonnées très puissante. " +
                                        "\n\n" +
                                        "C'est le seul outil connu compatible avec Interbase et Firebird capable " +
                                        "de se résister de façon transparente à une perte de connexion due à un " +
                                        "redémarrage du serveur.")
                        .programmingLanguages(List.of("Delphi"))
                        .date(LocalDate.of(2025, 2, 8))
                        .repositoryUrl("")
                        .liveDemoUrl("")
                        .build(),
                Project.builder()
                        .id(null)
                        .projectId("0ed6c33a-e708-11ef-9d1c-325096b39f47")
                        .title("MyPortfolioProject")
                        .imageFileName("MyPortfolioProject")
                        .description_EN("MyPortfolioProject is a personal portfolio application that I have developed in recent months to  " +
                                        "showcase my programming skills and the projects I have worked on. It is built using Java and  " +
                                        "Spring Boot for the backend, with a TypeScript-based frontend, and it leverages MongoDB as  " +
                                        "the database.  "+
                                        "\n\n" +
                                        "The platform allows me to present my projects in a structured and visually appealing way,  " +
                                        "enabling visitors to explore my work through various filters such as programming languages  " +
                                        "and project timelines. It also features a dynamic comment section, where users can leave  " +
                                        "feedback, and a contact form for inquiries.  "+
                                        "\n\n" +
                                        "The application is secured using Auth0-based authentication, ensuring a seamless and safe  " +
                                        "login experience. It supports internationalization (i18n) through i18next, allowing users to  " +
                                        "switch between multiple languages effortlessly.  "+
                                        "\n\n" +
                                        "Additionally, MyPortfolioProject enables the storage and retrieval of important documents, such  "
                                            +  "as my CV, which is hosted securely on AWS S3. The system is designed for a smooth user   " +
                                        "experience, ensuring accessibility across devices.  "+
                                        "\n\n" +
                                        "With a clean and intuitive interface, MyPortfolioProject serves as both a professional showcase  " +
                                        "and an interactive platform, reflecting my expertise in full-stack development, security, and  " +
                                        "multilingual applications.")
                        .description_FR("MyPortfolioProject est une application de portfolio personnel que j'ai développée ces derniers mois pour  " +
                                        "présenter mes compétences en programmation et les projets sur lesquels j'ai travaillé. Elle est construite en utilisant Java et  " +
                                        "Spring Boot pour le backend, avec un frontend basé sur TypeScript, et elle exploite MongoDB comme  " +
                                        "base de données.  "+
                                        "\n\n" +
                                        "La plateforme me permet de présenter mes projets de manière structurée et visuellement attrayante,  " +
                                        "permettant aux visiteurs d'explorer mon travail à travers divers filtres tels que les langages de programmation  " +
                                        "et les périodes de réalisation des projets. Elle comprend également une section de commentaires dynamique, où les utilisateurs peuvent laisser  " +
                                        "des avis, ainsi qu'un formulaire de contact pour les demandes d'informations.  "+
                                        "\n\n" +
                                        "L'application est sécurisée grâce à l'authentification basée sur Auth0, garantissant une expérience de connexion  " +
                                        "fluide et sécurisée. Elle prend en charge l'internationalisation (i18n) via i18next, permettant aux utilisateurs de  " +
                                        "changer de langue facilement.  "+
                                        "\n\n" +
                                        "De plus, MyPortfolioProject permet le stockage et la récupération de documents importants, tels  "
                                        +  "que mon CV, qui est hébergé en toute sécurité sur AWS S3. Le système est conçu pour offrir une expérience utilisateur  " +
                                        "optimale, assurant une accessibilité sur tous les appareils.  "+
                                        "\n\n" +
                                        "Avec une interface propre et intuitive, MyPortfolioProject sert à la fois de vitrine professionnelle  " +
                                        "et de plateforme interactive, reflétant mon expertise en développement full-stack, sécurité et  " +
                                        "applications multilingues.")
                        .programmingLanguages(List.of("Java", "Typescript"))
                        .date(LocalDate.of(2025, 2, 9))
                        .repositoryUrl("https://github.com/CharlesS42/MyPortfolioProject")
                        .liveDemoUrl("here")
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
