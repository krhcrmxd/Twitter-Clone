import { IsNotEmpty, IsString } from "class-validator";

export class CreatePostDto {
    @IsString()
    @IsNotEmpty()
    content: string;
}

export class UpdatePostDto extends CreatePostDto {
    @IsString()
    @IsNotEmpty()
    postId: string;
}
