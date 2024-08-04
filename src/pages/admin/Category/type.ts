export type Category = {
    id?: number;
    title: string;
    slug?:string;
    mogous_count?: number;
    created_at?: string;
    updated_at?: string;
}

// take id and title from Category
export type ComicCategory =  Pick<Category, 'id' | 'title' | "mogous_count">;