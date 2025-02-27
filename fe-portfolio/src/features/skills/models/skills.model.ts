export enum Proficiency {
    Beginner = "Beginner",
    Intermediate = "Intermediate",
    Advanced = "Advanced",
    Expert = "Expert",
}

export enum SkillCategory {
    programmingLanguage = "Programming Language",
    tool = "Tool",
    database = "Database",
    framework = "Framework",
    devops = "DevOps",
    testing = "Testing",
    other = "Other",
}

export interface SkillResponseModel {
    skillId: string;
    name: string;
    proficiencyLevel: Proficiency;
    category: SkillCategory;
}

export interface SkillRequestModel {
    name: string;
    proficiencyLevel: Proficiency;
    category: SkillCategory;
}