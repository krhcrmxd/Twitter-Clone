import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { PrismaService } from "src/prisma.service";
import { UserService } from "src/user/user.service";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { getJwtConfig } from "./config/jwt.config";
import { JwtStrategy } from "./jwt.strategy";

@Module({
    imports: [
        ConfigModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: getJwtConfig,
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, UserService, PrismaService, JwtStrategy],
})
export class AuthModule {}
