import { Themes } from "@prisma/client";
import {
    IsAlpha,
    IsAlphanumeric,
    IsEmail,
    IsEnum,
    IsNotEmpty,
    IsOptional,
    IsString,
    MinLength,
} from "class-validator";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    @IsAlpha()
    name: string;

    @IsOptional()
    @IsAlpha()
    @IsString()
    surname: string | undefined;

    @IsString()
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsAlphanumeric()
    @IsNotEmpty()
    @MinLength(6)
    password: string;

    @IsEnum(Themes)
    theme: Themes;
}

export type UpdateUserDto = Partial<CreateUserDto>;

export class UserEmailDto {
    @IsString()
    @IsEmail()
    @IsNotEmpty()
    email: string;
}
