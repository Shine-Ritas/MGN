
interface BasicUserInfo {
    name: string,
    email: string,

}

export interface AdminType extends BasicUserInfo {}

export interface UserType extends BasicUserInfo {}