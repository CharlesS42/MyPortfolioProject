export interface SkillResponseModel {
    skillId: string;
    name: string;
    proficiencyLevel: string;
    category: string;
}

export interface SkillRequestModel {
    name: string;
    proficiencyLevel: string;
    category: string;
}