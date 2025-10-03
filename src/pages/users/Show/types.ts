export type Comment = {
    id : number,
    content?: string,
    image_path?: string,
    mogou_id?: number,
    sub_mogou_id?: number,
    parent_comment_id?: number,
    user_id?: number,
    user_profile_url?: string,
    user_name?: string,
    created_at?: string,
    updated_at?: string,
    child_comments?: Comment[],
}