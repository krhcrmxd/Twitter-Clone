import { Themes } from "./user.types";

export interface ILogin {
    email: string;
    password: string;
}

export interface IRegister {
    name: string;
    email: string;
    password: string;
    theme: Themes;

    surname?: string;
}
