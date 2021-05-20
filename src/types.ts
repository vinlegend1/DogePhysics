export type ContentType = "mission" | "chapter" | "inactive";
export interface Metadata {
    title: string;
    description: string;
    keywords: string[];
    date: Date;
    chapterName: string;
    levelName: string;
}
export interface MissionType {
    title: string;
    chapterNumber: string;
    chapterName: string;
    shortDescription: string;
    longDescription: string;
    hint: string;
    checkCondition: string;
}