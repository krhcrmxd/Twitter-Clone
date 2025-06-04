import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { UserService } from "src/user/user.service";
import errorHandler from "src/utils/errorHandler";
import { UpdatePostDto } from "./post.dto";

@Injectable()
export class PostService {
    constructor(
        private prisma: PrismaService,
        private userService: UserService,
    ) {}

    async createPost(content: string, userEmail: string) {
        try {
            const user = await this.userService.getUserByEmail(userEmail);
            return await this.prisma.post.create({
                data: {
                    content: content,
                    user: { connect: { id: user.id } },
                },
            });
        } catch (e) {
            errorHandler(e);
        }
    }

    async deletePost(PostId: string) {
        try {
            return await this.prisma.post.delete({
                where: { id: PostId },
            });
        } catch (e) {
            errorHandler(e);
        }
    }

    async updatePost(dto: UpdatePostDto) {
        try {
            return await this.prisma.post.update({
                where: { id: dto.postId },
                data: { content: dto.content },
            });
        } catch (e) {
            errorHandler(e);
        }
    }

    async getPostsById(id: string) {
        try {
            return await this.prisma.post.findMany({
                where: { userId: id },
            });
        } catch (e) {
            errorHandler(e);
        }
    }
}
