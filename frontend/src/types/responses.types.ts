import { IUser } from "./user.types";

export interface ILoginRes extends IUser {
    accessToken: string;
}
export interface INewTokens {
    accessToken: string;
}
