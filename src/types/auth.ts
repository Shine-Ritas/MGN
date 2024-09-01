
interface BasicUserInfo {
    name: string,
    code : string,
    email: string,
}

export interface AdminType extends BasicUserInfo {}

export interface UserType extends BasicUserInfo {}