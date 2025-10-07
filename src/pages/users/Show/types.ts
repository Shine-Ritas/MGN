import { User } from "@/types/store/user-store-type";

export type Comment = {
    id : number,
    content?: string,
    image_path?: string,
    mogou_id?: number,
    sub_mogou_id?: number,
    parent_comment_id?: number,
    user: User,
    created_at?: string,
    updated_at?: string,
    child_comments?: Comment[],
    child_comments_count: number,
}