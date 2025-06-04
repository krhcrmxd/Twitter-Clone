import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { getJwtConfig } from "src/auth/config/jwt.config";
import { JwtStrategy } from "src/auth/jwt.strategy";
import { PrismaService } from "src/prisma.service";
import { UserService } from "src/user/user.service";
import { PostController } from "./post.controller";
import { PostService } from "./post.service";

@Module({
    imports: [
        ConfigModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: getJwtConfig,
        }),
    ],
    controllers: [PostController],
    providers: [PostService, PrismaService, JwtStrategy, UserService],
})
export class PostModule {}
