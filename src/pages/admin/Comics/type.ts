export interface MogousType {
    id:              number;
    rotation_key:    RotationKey;
    title:           string;
    slug:            string;
    description:     string;
    author:          string;
    cover:           string;
    status:          number;
    finish_status:   number;
    legal_age:       boolean;
    rating:          number;
    mogou_type:      number;
    released_year:   string;
    released_at:     string;
    created_at:      null;
    updated_at:      null;
    status_name:     MogousStatusName;
    mogou_type_name: MogouTypeName;
    finish_status_name  : string;
    categories:      Category[];
    sub_mogous:      SubMogous[];
    total_chapters:  number;
}

export type MogouChapter = {
    id:number,
    title:string,
    chapter_number:number,
    created_at:string,
    subscription_only: boolean,
    third_party_redirect: boolean,
    third_party_url?: string,
}

export interface MogouWithTotalCount extends MogousType {
    total_view_count?: number;
}

export interface MogouWithChapters extends MogousType {
    chapters: MogouChapter[];
}

export interface Category {
    id:    number;
    title: string;
    slug?: string;
}

export enum MogouTypeName {
    Manga = "Manga",
}

export enum RotationKey {
    Alpha = "alpha",
    Beta = "beta",
}

export enum MogousStatusName {
    Archived = "Archived",
    Draft = "Draft",
    Published = "Published",
}

export enum MogousStatusColor {
    Archived = "destructive",
    Draft = "gold",
    Published = "success",
}

export interface SubMogous {
    title: string;
}

export interface Link {
    url:    null | string;
    label:  string;
    active: boolean;
}

export interface IsFavoriteInterface{
    user_id: number;
    mogou_id: number;
}
