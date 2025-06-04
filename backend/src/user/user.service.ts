import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { type DataForPostRender } from "src/types/allPosts.types";
import errorHandler from "src/utils/errorHandler";
import { type CreateUserDto, type UpdateUserDto } from "./user.dto";

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) {}

    async getUserById(userId: string) {
        try {
            return await this.prisma.user.findUnique({
                where: { id: userId },
                include: { Post: true },
            });
        } catch (e) {
            errorHandler(e);
        }
    }

    async getUserByEmail(email: string) {
        try {
            return await this.prisma.user.findUnique({
                where: { email: email },
                include: { Post: true },
            });
        } catch (e) {
            errorHandler(e);
        }
    }

    async createUser(user: CreateUserDto) {
        try {
            return await this.prisma.user.create({
                data: {
                    name: user.name,
                    surname: user.surname,
                    email: user.email,
                    password: user.password,
                    theme: user.theme,
                },
            });
        } catch (e) {
            errorHandler(e);
        }
    }

    async deleteUser(email: string) {
        try {
            console.log(email);
            return await this.prisma.user.delete({
                where: { email: email },
            });
        } catch (e) {
            errorHandler(e);
        }
    }

    async updateUser(updatedUser: UpdateUserDto, email: string) {
        try {
            return await this.prisma.user.update({
                where: { email: email },
                data: {
                    name: updatedUser.name,
                    surname: updatedUser.surname,
                    email: updatedUser.email,
                    theme: updatedUser.theme,
                    password: updatedUser.password,
                },
            });
        } catch (e) {
            errorHandler(e);
        }
    }

    async getDataForPostRender() {
        try {
            const data = await this.prisma.user.findMany({
                include: { Post: true },
            });

            const returnArr: DataForPostRender[] = [];

            data.forEach((user) => {
                user.Post.forEach((post) => {
                    returnArr.push({
                        name: user.name,
                        surname: user.surname,
                        createdAt: post.createdAt,
                        content: post.content,
                        postId: post.id,
                    });
                });
            });

            return returnArr;
        } catch (e) {
            errorHandler(e);
        }
    }

    async getDataForPostRenderUniqueUser(userEmail: string) {
        try {
            const user = await this.prisma.user.findUnique({
                where: { email: userEmail },
                include: { Post: true },
            });

            const returnArr: DataForPostRender[] = [];

            user.Post.forEach((post) => {
                returnArr.push({
                    name: user.name,
                    surname: user.surname,
                    createdAt: post.createdAt,
                    content: post.content,
                    postId: post.id,
                });
            });

            return returnArr;
        } catch (e) {
            errorHandler(e);
        }
    }
}
