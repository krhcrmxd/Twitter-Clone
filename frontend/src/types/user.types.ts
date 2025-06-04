import { IPost as Post } from "./post.types";

export interface IUser {
    id: string;
    name: string;
    surname?: string;
    email: string;

    theme: Themes;

    createdAt: Date;
    updatedAt: Date;

    post?: Post[];
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface IUserUpdate extends Partial<IUser> {}

export enum Themes {
    light = "light",
    dark = "dark",
}
