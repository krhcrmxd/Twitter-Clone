import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { getJwtConfig } from "src/auth/config/jwt.config";
import { JwtStrategy } from "src/auth/jwt.strategy";
import { PrismaService } from "src/prisma.service";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";

@Module({
    imports: [
        ConfigModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: getJwtConfig,
        }),
    ],
    controllers: [UserController],
    providers: [UserService, PrismaService, JwtStrategy],
})
export class UserModule {}
