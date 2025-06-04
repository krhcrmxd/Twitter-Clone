import {
    Body,
    Controller,
    Delete,
    Get,
    Post,
    Put,
    Query,
    Req,
    UseGuards,
    UsePipes,
    ValidationPipe,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AuthGuard } from "@nestjs/passport";
import { Request } from "express";
import errorHandler from "src/utils/errorHandler";
import { getEmailFromReq } from "src/utils/getEmailFromReq.util";
import { getUserIdFromReq } from "src/utils/getUserIdFromReq.util";
import { CreatePostDto, UpdatePostDto } from "./post.dto";
import { PostService } from "./post.service";

@Controller("post")
export class PostController {
    constructor(
        private readonly postService: PostService,
        private Jwt: JwtService,
    ) {}

    @UseGuards(AuthGuard("jwt"))
    @Post("/new")
    @UsePipes(new ValidationPipe())
    async createPost(@Body() { content }: CreatePostDto, @Req() req: Request) {
        try {
            const email = await getEmailFromReq(req, this.Jwt);

            return await this.postService.createPost(content, email);
        } catch (e) {
            errorHandler(e);
        }
    }

    @UseGuards(AuthGuard("jwt"))
    @Get("/")
    async getUserPostsById(@Req() req: Request) {
        try {
            const id = await getUserIdFromReq(req, this.Jwt);

            return await this.postService.getPostsById(id);
        } catch (e) {
            errorHandler(e);
        }
    }

    @UseGuards(AuthGuard("jwt"))
    @Delete("/")
    async deletePost(@Query("id") id: string) {
        return await this.postService.deletePost(id);
    }

    @UseGuards(AuthGuard("jwt"))
    @UsePipes(new ValidationPipe())
    @Put("/")
    async updatePost(@Body() dto: UpdatePostDto) {
        return await this.postService.updatePost(dto);
    }
}
