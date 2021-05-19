export type ContentType = "mission" | "chapter" | "inactive";
export interface Metadata {
    title: string;
    description: string;
    keywords: string[];
    date: Date;
    chapterName: string;
    levelname: string;
}