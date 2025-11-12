import { SubscribedUser } from "@/pages/admin/Users/types";

export type Comment = {
    id : number,
    content?: string,
    image_path?: string,
    mogou_id?: number,
    sub_mogou_id?: number,
    parent_comment_id?: number,
    user: SubscribedUser,
    created_at?: string,
    updated_at?: string,
    child_comments?: Comment[],
    child_comments_count: number,
}