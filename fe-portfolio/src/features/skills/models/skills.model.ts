export enum Proficiency {
    Beginner = "BEGINNER",
    Intermediate = "INTERMEDIATE",
    Advanced = "ADVANCED",
    Expert = "EXPERT",
}

export enum SkillCategory {
    programmingLanguage = "PROGRAMMING_LANGUAGE",
    tool = "TOOL",
    database = "DATABASE",
    framework = "FRAMEWORK",
    devops = "DEVOPS",
    testing = "TESTING",
    other = "OTHER",
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